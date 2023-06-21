<template>
  <!-- Departamentos -->
  <div class="container-lg pt-4">
    <!-- Title -->

    <div class="card">
    <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-buildings-fill fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0">
            Departamentos
          </span>
        </span>
      </div>
    <!-- Card -->
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar departamento" id="searchInput" @keyup.enter="search" v-model="searchText" type="search" autocomplete="none"/>
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Nuevo" icon="pi pi-plus" @click="registrar" class="float-end" raised/>
          </div>
        </div>
        <!-- Table -->
        <DataTable :columns="columns" :data="data" class="responsive text-nowrap compact hover row-border order-column" width="100%" :options="options" ref="table" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import $ from 'jquery';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import Buttons from 'datatables.net-buttons';
import Responsive from 'datatables.net-responsive';
//import pdfMake, { NONE } from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import JsZip from 'jszip';
//import print from 'datatables.net-buttons/js/buttons.print';
import { useDataStore } from '@/stores/dataStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'

//pdfMake.vfs = pdfFonts.pdfMake.vfs;
//DataTablesCore.Buttons.jszip(JsZip);
DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

export default defineComponent({
  name: 'TablaDepartamentos',
  components: { DataTable },
  setup() {
    const searchText = ref('');
    let dt;
    const table = ref();
    const store = useDataStore();
    const alertas = useAlerts();
    const router = useRouter();
    const data = ref([]);
    const options = {
      responsive: true,
      autoWidth: true,
      dom: 'trip',
      pageLength: 10,
      paging: true,
      pagingType: 'numbers',
      language: spanish,
      order: [[0, 'desc']],
      initComplete: function () {
        this.on('draw.dt', function () {
          nextTick(() => {
            addButtEvList();
            dt.responsive.recalc();
          });
        });
      },
    };
    const columns = [
      { data: 'id', title: 'ID' },
      { data: 'nombre', title: 'Nombre del departamento' },
      { data: 'empleados', title: 'Empleados'},
      {
        data: null, title: 'Action', wrap: true, render: function () {
          let buttons =
          '<a https="#" class="edit ms-2 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> ';
          return buttons;
        }
      }
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
      await store.getDepartamentos().then(() => {
        data.value = store.departamentos;
        alertas.closeLoading();
        done = true;
      }).catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
        } else {
          alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
        done = true;
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
          'warning',
          'Sí, eliminar',
          'Cancelar'
        )
        .then((isConfirmed) => {
          if (isConfirmed) {
            store.deleteEmpleado(id).then(() => {
              alertas.showSuccessAlert('Registro eliminado').then((isConfirmed) => {
                getAll();
              });
            }).catch((error) => {
              console.log(error.response.data.message)
              alertas.showErrorAlert('Error', error.response.data.message);
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

    const search = () => {
      console.log(searchText.value);
      dt.search(searchText.value).draw();
    };

    onMounted(() => {
      getAll();
      dt = table.value.dt;
    });

    return {
      columns,
      data,
      options,
      registrar: () => {
        router.push({ name: 'registrarDepartamento' });
      },
      search,
      searchText,
      table,
    };
  },
});
</script>
