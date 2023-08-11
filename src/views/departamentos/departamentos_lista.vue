<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">

      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-buildings-fill fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0">
            Departamentos
          </span>
        </span>
      </div>
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar departamento" id="searchInput" @keyup.enter="search" v-model="searchText"
                type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Nuevo" icon="pi pi-plus" @click="registrar" class="float-end" raised />
          </div>
        </div>
        <!-- Table -->
        <DataTable :columns="columns" :data="data" class="responsive hover row-border border order-column"
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
import Buttons from 'datatables.net-buttons-bs5';
import Responsive from 'datatables.net-responsive';
import { useStore } from '@/stores/departamentoStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'

DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

export default defineComponent({
  name: 'TablaDepartamentos',
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
      pageLength: 10,
      order: [[2, 'asc']],
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
      { data: 'id', title: 'ID', class: 'never' },
      { data: 'nombre', title: 'Nombre del departamento', class: 'all' },
      { data: 'empleados', title: 'Número de empleados'},
      {
        data: null, title: 'Acciones', width:'5%', orderable:false,  wrap: true, class: 'all', render: function () {
          let buttons =
          '<a https="#" class="edit my-1 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> ';
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
          alertas.showWarningAlert('Oops!', 'El servidor está tardando demasiado en responder');
        }
        setTimeout(() => {
          if (!done) {
            alertas.closeWarning();
            alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
          }
        }, 10000);
      }, 5000);
      await store.getDepartamentos().then(() => {
        data.value = store.data;
      }).catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
        } else {
          alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
      }).finally(() => {
        done = true;
        alertas.closeLoading();
      });
    };

    const editItem = (index) => {
      router.push({ name: 'departamentos_editar', params: { id: index } });
    };

    const addButtEvList = () => {
      const editButts = document.querySelectorAll('.edit');
      editButts.forEach((butt) => {
        butt.parentElement.classList.add('d-flex', 'justify-content-center');
        butt.addEventListener('click', () => {
          editItem(butt.closest('tr').cells[0].innerHTML);
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
      registrar: () => {
        router.push({ name: 'departamentos_registrar' });
      },
      search,
      searchText,
      table,
    };
  },
});
</script>

<style>
tbody tr td {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.acciones {
  padding-top: 3px !important;
  padding-bottom: 3px !important;
}

tr td a {
  height: 35px !important;
  width: 20px !important;
  box-shadow: inset 1px 1px 3px 0px #ffffff7a !important;
}
</style>