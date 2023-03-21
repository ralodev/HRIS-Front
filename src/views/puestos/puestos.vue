<template>
  <div class="container-lg table-responsive card-light p-3 mt-4">
    <DataTable :columns="columns" :data="data" class="table display text-nowrap" width="100%" :options="options" />
  </div>
  </template>

  <script>
  import { defineComponent, ref, nextTick, onMounted } from 'vue';
  import DataTable from 'datatables.net-vue3';
  import DataTablesLib from 'datatables.net-bs5';
  import Buttons from 'datatables.net-buttons-bs5';
  import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  import JsZip from 'jszip';
  import print from 'datatables.net-buttons/js/buttons.print';
  import { useDataStore } from '@/stores/dataStore';
  import { useRouter } from 'vue-router';
  import { useAlerts } from '@/components/useAlerts';

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  DataTablesLib.Buttons.jszip(JsZip);
  DataTable.use(DataTablesLib, Buttons, ButtonsHtml5, pdfMake, pdfFonts, JsZip, print);

  export default defineComponent({
    name: 'TablaPuestos',
    components: { DataTable },
    setup() {
      const store = useDataStore();
      const alertas = useAlerts();
      const router = useRouter();
      const data = ref([]);
      const options = {
        responsive: false,
        autoWidth: false,
        dom: 'ptr', //p: pagination, t: table, r: processing
        paging: true,
        pagingType: 'numbers',
        initComplete: function () {
          this.on('draw.dt', function () {
            nextTick(() => {
              addButtEvList();
            });
          });
        },
      };
      const columns = [
        { data: 'clavePresupuestal', title: 'Clave Presupuestal' },
        { data: 'tipoPlaza', title: 'Tipo de plaza' },
        { data: ('categoria').replace('_', " "), title: 'Categoría' },
        { data: 'empleado.nombre', title: 'Nombre' },
        { data: 'empleado.rfc', title: 'RFC' },
        {
          data: null, title: 'Action', wrap: true, render: function () {
            let buttons =
              '<a https="#" class="edit btn btn-warning btn-xs btn-flat"><i class="bi bi-pencil-fill"></i></a> ';
            buttons +=
              '<a https="#" class="delete btn btn-danger btn-xs btn-flat"><i class="bi bi-trash3-fill"></i></a>';
            return buttons;
          },
        },
      ];

      const getAll = async () => {
        var done = false;
        alertas.showLoading('Cargando datos');
        setTimeout(() => {
          if (!done) {
            alertas.closeLoading();
            alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
          }
        }, 5000);
        await store.getPuestos().then(() => {
          data.value = store.puestos;
          alertas.closeLoading();
          done = true;
        }).catch((error) => {
          alertas.showErrorAlert('Error', `No se pudieron cargar los datos. ${error}`);
          done = true;
        });
      };

      const editItem = (index) => {
        router.push({ name: 'editarPuesto', params: { id: index } });
      };

      const deleteItem = (id) => {
        alertas
          .showConfirmAlert(
            '¿Estas seguro de eliminar este registro?',
            'Esta acción no se puede revertir',
            'Sí, eliminar',
            'Cancelar'
          )
          .then((isConfirmed) => {
            if (isConfirmed) {
              store.deletePuesto(id).then(() => {
                  alertas.showSuccessAlert('Registro eliminado').then((isConfirmed) => {
                    getAll();
                  });
                }).catch((error) => {
                  alertas.showErrorAlert('Error', `No se pudo eliminar el registro. ${error}`);
                });
            }
          });
      };

      const addButtEvList = () => {
        const editButts = document.querySelectorAll('.edit');
        const deleteButts = document.querySelectorAll('.delete');
        editButts.forEach((butt) => {
          butt.addEventListener('click', () => {
            editItem(butt.closest('tr').cells[0].innerHTML);
          });
        });
        deleteButts.forEach((butt) => {
          butt.addEventListener('click', () => {
            deleteItem(butt.closest('tr').cells[0].innerHTML);
          });
        });
      };

      onMounted(() => {
        getAll();
      });

      return {
        data,
        options,
        columns,
      };
    },
  });
  </script>

  <style>
  @import './../../assets/main.css';
  </style>
