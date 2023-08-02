<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">
      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-people-fill fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0"> Empleados </span>
        </span>
      </div>
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar empleado" id="searchInput" @keyup.enter="search" v-model="searchText" type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Nuevo" icon="pi pi-plus" @click="registrar" class="float-end" raised />
          </div>
        </div>
        <!-- Table -->
        <DataTable :columns="columns" :data="data" class="responsive text-nowrap hover row-border border order-column" width="100%" :options="options" ref="table" />
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
  import { useStore } from '@/stores/empleadoStore';
  import { useRouter } from 'vue-router';
  import { useAlerts } from '@/components/useAlerts';
  import spanish from '@/assets/datatable/spanish.json';
  import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs';

  DataTable.use(DataTablesCore, Buttons, neutralise, Responsive);

  export default defineComponent({
    name: 'TablaEmpleados',
    components: { DataTable },
    setup() {
      const searchText = ref('');
      let dt;
      const table = ref();
      const store = useStore();
      const alertas = useAlerts();
      const router = useRouter();
      const data = ref([]);
      const options = {
        responsive: {
          details: {
            renderer: function (api, rowIdx, columns) {
              var data = format(api, rowIdx, columns);
              return data ? data : false;
            },
            display: function (row, update, render) {
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
            },
          },
        },
        autoWidth: true,
        dom: 'trip',
        paging: true,
        pagingType: 'numbers',
        language: spanish,
        pageLength: 10,
        order: [[2, 'asc']],
        columnDefs: [
          { responsivePriority: 1, targets: [0, 2, 10] },
          { responsivePriority: 2, targets: [4] },
        ],
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
        { data: null, className: 'dt-control', orderable: false, defaultContent: '', width: '1%', class: '' },
        { data: 'numeroTarjeta', title: 'Tarjeta', width: '5%', class: '' },
        { data: 'rfc', title: 'RFC', class: '' },
        { data: 'curp', title: 'CURP', class: '' },
        { data: 'nombre', title: 'Nombre', class: '' },
        {
          data: 'departamento.nombre',
          title: 'Departamento',
          class: '',
          render: function (data, type, row) {
            if (data == null) {
              return 'Sin departamento';
            } else {
              return data;
            }
          },
        },
        //Hidden columns for details
        { data: 'estado', title: 'Estado', className: 'estado none' },
        { data: 'correoInstitucional', title: 'Correo', className: 'none' },
        { data: 'edad', title: 'Edad', className: 'never' },
        { data: 'nivelAcademico', title: 'Nivel académico', className: 'none' },
        //Action column
        {
          data: null,
          orderable: false,
          class: 'text-nowrap  acciones justify-content-center',
          width: '5%',
          title: 'Acciones',
          wrap: true,
          render: function (data) {
            let buttons =
              '<a title="Ver empleado" name="'+data.id+'" class="edit me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none"><i class="pi pi-pencil"></i></a> ';
            //buttons +=
            //  '<a title="Agregar plaza" name="'+data.id+'" class="acciones-plaza px-3 p-button-sm p-button p-component p-button-icon-only p-button-info p-button-raised text-decoration-none"><i class="pi pi-briefcase"></i></a>';
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
        await store
          .getEmpleados()
          .then(() => {
            data.value = store.data;
            alertas.closeLoading();
            done = true;
          })
          .catch((error) => {
            if (error.code === 'ERR_NETWORK') {
              alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
            } else {
              alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
            }
            done = true;
          });
      };

      const editItem = (index) => {
        router.push({ name: 'empleados_editar', params: { id: index } });
      };

      const addButtEvList = () => {
        const editButts = document.querySelectorAll('.edit');
        const addButts = document.querySelectorAll('.acciones-plaza');
        const statusRow = document.querySelectorAll('.estado');
        editButts.forEach((butt) => {
          butt.addEventListener('click', () => {
            editItem(butt.attributes.name.value);
          });
        });
        addButts.forEach((butt) => {
          butt.parentElement.classList.add('flex');
          if (butt.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML !== 'ACTIVO') {
            butt.disabled = true;
            butt.classList.remove('p-button-help');
            butt.classList.add('p-button-secondary');
            butt.classList.add('p-disabled');
            butt.parentElement.title = 'Empleado inactivo o no disponible';
          }

          butt.addEventListener('click', () => {
            router.push({ name: 'plazas_registrar', params: { id: butt.attributes.name.value } });
          });
        });

        statusRow.forEach((cell) => {
          if (cell.innerHTML == 'INACTIVO') {
            cell.parentElement.classList.add('bg-yellow-100');
          } else if (cell.innerHTML == 'BAJA') {
            cell.parentElement.classList.add('bg-red-100');
          }
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
          return col.hidden ? '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' + '<td><b>' + col.title + '</b></td> ' + '<td>' + col.data + '</td>' + '</tr>' : '';
        }).join('');
        return data ? '<div class="slider"><table>' + data + '</table></div>' : undefined;
      }

      return {
        columns,
        data,
        options,
        registrar: () => {
          router.push({ name: 'empleados_registrar' });
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
