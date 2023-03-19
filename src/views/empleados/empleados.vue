<template>
  <DataTable :columns="columns" :data="data" class="display cell-border" width="100%" :options="options" />
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
import { useEmpleadoStore } from '@/stores/empleadoStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
DataTablesLib.Buttons.jszip(JsZip);
DataTable.use(DataTablesLib, Buttons, ButtonsHtml5, pdfMake, pdfFonts, JsZip, print);

export default defineComponent({
  name: 'TablaEmpleados',
  components: { DataTable },
  setup() {
    const store = useEmpleadoStore();
    const alertas = useAlerts();
    const router = useRouter();
    const data = ref([]);
    const options = {
      responsive: true,
      autoWidth: true,
      dom: 'ptr',
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
      { data: 'name', title: 'Name', width: '40%', className: 'dt-body-left', },
      { data: 'email', title: 'Email' },
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

    const getUsers = async () => {
      alertas.showLoading('Cargando datos');
      await store.getEmpleados().then(() => {
        data.value = store.empleados;
        alertas.closeLoading();
      });
    };

    const editItem = (index) => {
      router.push({ name: 'editar-empleado', params: { id: index } });
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
            store.deleteEmpleado(id).then(() => {
                alertas.showSuccessAlert('Registro eliminado').then((isConfirmed) => {
                  getUsers();
                });
              }).catch((error) => {
                alertas.showErrorAlert('Error', `No se pudo eliminar el registro. ${error}`);
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
