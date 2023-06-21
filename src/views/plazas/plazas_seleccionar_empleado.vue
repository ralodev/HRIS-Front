<template>
    <!-- Puestos -->
    <div class="container-lg pt-4 my-3">
      <!-- Card -->
      <div class="card shadow-5 border-round-2xl overflow-hidden">

        <div class="d-flex card-header py-0 pe-0">
          <span class="flex text-center">
            <i class="bi bi-person-fill-check fw-bold h1 my-0"></i>
            <span class="fw-bold h4 align-self-center ms-3 my-0">
              Seleccionar Empleado
            </span>
          </span>
          <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
                    class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px;">
          </Button>
        </div>
        <div class="card-body table-responsive">
          <!-- Buttons -->
          <div class="grid mb-2">
            <div class="col-12 lg:col-6 md:col-8">
                <label for="searchInput">Filtrar empleados</label>
              <div class="p-inputgroup">
                <InputText placeholder="Escribe un número de tarjeta, nombre o rfc" title="Introduce un Número de tarjeta, Nombre o RFC" id="searchInput" class="w-full" @keyup.enter="search" v-model="searchText" />
                <Button icon="pi pi-filter" severity="primary" @click="search" />
              </div>
            </div>
          </div>
          <!-- Table -->
          <DataTable :columns="columns" :data="data" class="responsive text-nowrap hover row-border border order-column"
            width="100%" :options="options" ref="table"  />
        </div>
      </div>
    </div>
  </template>

  <script>
  import { defineComponent, ref, nextTick, onMounted } from 'vue';
  import $ from 'jquery';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import Buttons from 'datatables.net-buttons-bs5';
  import Responsive from 'datatables.net-responsive';
  //import pdfMake, { NONE } from 'pdfmake/build/pdfmake';
  //import * as pdfFonts from 'pdfmake/build/vfs_fonts';
  //import JsZip from 'jszip';
  //import print from 'datatables.net-buttons/js/buttons.print';
  //import { useDataStore } from '@/stores/dataStore';
  import { useStore } from '@/stores/empleadoStore';
  import { useRouter } from 'vue-router';
  import { useAlerts } from '@/components/useAlerts';
  import spanish from '@/assets/datatable/spanish.json';
  import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'

  //pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //DataTablesCore.Buttons.jszip(JsZip);
  DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

  export default defineComponent({
    name: 'seleccionar_empleado',
    components: { DataTable },
    setup() {
      const searchText = ref('');
      let dt;
      const table = ref();
      //const store = useDataStore();
      const store = useStore();
      const alertas = useAlerts();
      const router = useRouter();
      const data = ref([]);
      const options = {
        responsive: true,
        autoWidth: true,
        dom: 'trip',
        paging: true,
        pagingType: 'simple_numbers',
        language: spanish,
        pageLength: 10,
        order: [[0, 'asc']],
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
        { data: 'numeroTarjeta', title: 'Número de tarjeta', width: '20%'},
        { data: 'rfc', title: 'RFC', width: '20%', className: 'all' },
        { data: 'nombre', title: 'Nombre' , width: '20%'},
        {
          data: 'departamento.nombre', title: 'Departamento', width: '30%',
          render: function (data, type, row) {
            if (data == null) {
              return 'Sin departamento';
            } else {
              return data;
            }
          }
        },
        { data: 'estado', title: 'Estado' , className: 'never'},
        //Action column
        {
          data: null, className: 'text-nowrap acciones all justify-content-center', width: '10%', title: 'Seleccionar', wrap: true, render: function () {
            let buttons =
              '<a https="#" title="Seleccionar" class="action-select mx-auto p-button-sm p-button p-component p-button-icon-only p-button-success p-button-raised me-1"><i class="bi bi bi-check-lg"></i></a> ';
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
        await store.getEmpleados().then(() => {
          //for testing purposes, duplicate data 3 times to test the scroll
          data.value = store.data;
          //data.value = store.data;
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

      const selectEmpleado = (index) => {
        router.push({ name: 'plazas_registrar', params: { id: index } });
      };

      const addButtEvList = () => {
        const selectButts = document.querySelectorAll('.action-select');
        selectButts.forEach((butt) => {
            butt.parentElement.classList.add('flex');
          if (butt.parentElement.previousSibling.innerHTML !== 'ACTIVO') {
            butt.disabled = true;
            butt.classList.remove('p-button-success');
            butt.classList.add('p-button-secondary');
            butt.classList.add('p-disabled');
            butt.parentElement.title = 'Empleado inactivo o no disponible';
            butt.parentElement.parentElement.classList.add('surface-100');
          }
          butt.addEventListener('click', () => {
            selectEmpleado(butt.closest('tr').cells[0].innerHTML);
          });
        });
      };

      const search = () => {
        dt.search(searchText.value).draw();
      };

      onMounted(() => {
        getAll();
        dt = table.value.dt;
      });

      function format(api, rowIdx, columns) {
        var data = $.map(columns, function (col, i) {
          return col.hidden ?
            '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
            '<td><b>' + col.title + '</b></td> ' +
            '<td>' + col.data + '</td>' +
            '</tr>' :
            '';
        }).join('');
        return data ? '<div class="slider"><table>' + data + '</table></div>' : undefined;
      }

      return {
        columns,
        data,
        options,
        search,
        searchText,
        table,
        goBack : () => {
          router.push({ name: 'plazas' });
        }
      };
    },
  });
  </script>
