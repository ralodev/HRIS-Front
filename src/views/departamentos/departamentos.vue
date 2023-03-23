<template>
  <!-- Departamentos -->
  <div class="container-lg pt-4">
    <div class="card">
      <div class="card-header h4">
        <i class="bi bi-buildings-fill"></i> Departamentos
      </div>
      <div class="card-body table-responsive">
        <DataTable :columns="columns" :data="data" class="display cell-border" width="100%" :options="options" />
      </div>
    </div>
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
  name: 'TablaEmpleados',
  components: { DataTable },
  setup() {
    const store = useDataStore();
    const alertas = useAlerts();
    const router = useRouter();
    const data = ref([]);
    const options = {
      responsive: true,
      autoWidth: true,
      dom: 'tr',
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
      { data: 'id', title: 'ID' },
      { data: 'nombre', title: 'Nombre del departamento' },
      {
        data: 'empleados', title: 'Empleados', render: function (data, type, row) {
          return data.length;
        }
      },
      {
        data: null, title: 'Action', wrap: true, render: function () {
          let buttons =
            '<a https="#" class="edit btn btn-warning btn-xs btn-flat"><i class="bi bi-pencil-fill"></i></a> ';
          buttons +=
            '<a https="#" class="delete btn btn-danger btn-xs btn-flat"><i class="bi bi-trash3-fill"></i></a>';
          return buttons;
        }
      }
    ];

    const getUsers = async () => {
      alertas.showLoading('Cargando datos');
      await store.getDepartamentos().then(() => {
        data.value = store.departamentos;
        alertas.closeLoading();
      });
    };

    const editItem = (index) => {
      router.push({ name: 'editarDepartamento', params: { id: index } });
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
            store.deleteDepartamento(id).then(() => {
              alertas.showSuccessAlert('Registro eliminado').then((isConfirmed) => {
                getUsers();
              });
            }).catch((error) => {
              console.log(error.response.data.message)
              alertas.showErrorAlert('Error', error.response.data.message);
            });
          } else {
            alertas.showInfoAlert('Cancelado', 'El registro no fue eliminado');
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
      getUsers();
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
