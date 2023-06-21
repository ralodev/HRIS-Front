<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">

    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">
      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-briefcase-fill fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0">
            Plazas
          </span>
        </span>
      </div>
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar plaza por tipo, clave o empleado" id="searchInput" @keyup.enter="search"
                v-model="searchText" type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Nuevo" icon="pi pi-plus" @click="registrar" class="float-end" raised />
          </div>
        </div>
        <!-- Table -->
        <DataTable :columns="columns" :data="data" class="responsive text-nowrap hover row-border border order-column"
          width="100%" :options="options" ref="table" />
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
import { useStore } from '@/stores/plazaStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'

//pdfMake.vfs = pdfFonts.pdfMake.vfs;
//DataTablesCore.Buttons.jszip(JsZip);
DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

export default defineComponent({
  name: 'TablaPuestos',
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
      responsive: {
        details: {
          renderer: function (api, rowIdx, columns) {
            var data = format(api, rowIdx, columns);
            return data ?
              data :
              false;
          },
          display: function (row, update, render) {
            console.log(update);
            if (update) {
              if ($(row.node()).hasClass('parent')) {
                row.child(render(), 'child').show();
                $('div.slider', row.child()).slideDown(0);
                return true;
              }
            } else {
              if (!row.child.isShown()) {
                row.child(render(), 'child').show();
                $(row.node()).addClass('parent shown');
                $('div.slider', row.child()).slideDown();

                return true;
              } else {
                $('div.slider', row.child()).slideUp(function () {
                  row.child(false);
                  $(row.node()).removeClass('parent shown');
                });

                return false;
              }
            }
          }
        }
      },
      autoWidth: true,
      dom: 'trip',
      paging: true,
      pagingType: 'numbers',
      language: spanish,
      order: [[1, 'desc']],
      columnDefs: [
        { responsivePriority: 1, targets: [0, 1, 8] },//Details,Clave,Acciones
        { responsivePriority: 2, targets: [5] },//Nombre (empleado)
      ],
      initComplete: function () {
        this.on('draw.dt', function () {
          nextTick(() => {
            addButtEvList(); // Add event listeners to buttons
            dt.responsive.recalc(); // Recalculate responsive columns if page was loaded with a small screen
          });
        });
      },
    };
    const columns = [
      { data: null, className: 'dt-control', orderable: false, defaultContent: '', width: '1%' },
      { data: null, title: 'Clave Presupuestal', render: function (data){
        return data.clavePresupuestal + ' '
        + (data.fechaInicio == null || data.funcion == null
        ? "<span class='float-end p-tag p-component p-tag-warning p-tag-rounded mr-0' title='Faltan datos' style='cursor: help !important;'><span class='p-tag-icon pi pi-question me-0'></span></span>"
        : '' )
      } },
      { data: 'tipoPlaza', title: 'Tipo de plaza' },
      { data: 'categoria', title: 'Categoría', class: ' none' },
      { data: 'nombramiento', title: 'Nombramiento' },
      { data: 'empleado.tipoMovimiento', title: 'Movimiento', className: 'none' },
      { data: 'empleado.nombre', title: 'Nombre del empleado', class: ' none' },
      { data: 'empleado.rfc', title: 'RFC del empleado' },
      {
        data: null, class: 'text-nowrap acciones', width: '5%', title: 'Editar', orderable: false, render: function () {
          let buttons =
            '<a https="#" title="Editar" class="edit p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> ';
          //buttons +=
          //  '<a https="#" class="delete me-2 p-button-sm p-button p-component p-button-icon-only p-button-secondary p-button-raised me-1"><i class="bi bi-trash3-fill"></i></a>';
          return buttons;
        },
      },
      //Hidden columns for details (className:'none')
      { data: 'numeroHorasNombramiento', title: 'Horas de nombramiento', className: 'none' },
      { data: 'id', title: 'ID', className: 'never' },

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
      await store.getPlazas().then(() => {
        //for testing purposes, append the data 5 times
        data.value = store.data;
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
      router.push({ name: 'plazas_editar', params: { id: index } });
    };

    const addButtEvList = () => {
      const editButts = document.querySelectorAll('.edit');
      editButts.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          editItem(butt.closest('tr').lastChild.textContent);
        });
      });
    };

    const search = () => {
      dt.search(searchText.value).draw();
    };

    onMounted(() => {
      getAll();
      dt = table.value.dt;
      nextTick(() => {
        dt.responsive.rebuild();
        dt.responsive.recalc();
      });
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
      data,
      options,
      columns,
      table,
      searchText,
      search,
      registrar: () => {
        router.push({ name: 'seleccionar_empleado' });
      },
    };
  },
});
</script>
