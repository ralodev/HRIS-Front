<template>
  <!-- Puestos -->
  <div class="container-fluid pt-4">
    <!-- Title -->
    <Panel :collapsed="true" class="text-xl" header="Panel de búsqueda avanzada" toggleable>

      <div class="grid text-sm" id="searchFields">
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <InputText type="text" label="Nombre" v-model="searchNombre" class="w-full" />
            <label for="searchNombre">Nombre</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3 mb-3">
          <div class="p-float-label">
            <InputText type="text" label="RFC" v-model="searchRFC" class="w-full" />
            <label for="searchRfc">RFC</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <Dropdown label="Rango de edad" v-model="searchEdad" :options="opcEdad" optionValue="value"
              optionLabel="nombre" class="w-full" showClear />
            <label for="searchEdad">Rango de edad</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <Dropdown label="Sexo" v-model="searchSexo" :options="opcSexo" class="w-full" showClear optionValue="nombre"
              optionLabel="nombre" />
            <label for="searchSexo">Sexo</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <Dropdown label="Nivel académico" v-model="searchNivelAcademico" :options="opcNivelAcademico"
              optionValue="value" optionLabel="nombre" class="w-full" showClear filter />
            <label for="searchNivelAcademico">Nivel académico</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <InputText type="text" label="Clave presupuestal" v-model="searchClavePresupuestal" class="w-full" />
            <label for="searchClavePresupuestal">Clave presupuestal</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <InputText type="text" label="Plaza" v-model="searchPlaza" class="w-full" />
            <label for="searchPlaza">Plaza</label>
          </div>
        </div>
        <div class="col-6 md:col-4 lg:col-3 mb-3">
          <div class="p-float-label">
            <Dropdown label="Estado" v-model="searchEstado" :options="opcEstado" class="w-full" showClear
              optionValue="nombre" optionLabel="nombre" />
            <label for="searchEstado">Estado</label>
          </div>
        </div>
        <div class="col-12 py-0">
          <Button type="button" label="Limpiar" severity="secondary" icon="pi pi-times" class="float-end me-2"
            @click="clear" />
          <Button type="button" label="Buscar" icon="pi pi-search" class="float-end me-2" @click="search" />
        </div>
      </div>
    </Panel>

    <!-- Card -->
    <div class="card thicker-glass my-3 shadow-5">
      <div class="card-body table-responsive">
        <!-- Table -->
        <DataTable :columns="columns" :data="data" class="text-nowrap header-border cell-border" width="100%"
          :options="options" ref="table" />
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
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons';
import jszip from 'jszip';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Responsive from 'datatables.net-responsive';
import { useStore } from '@/stores/consultaStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-select';
import { optionsSexo, optionsEdad, optionsNivelAcademico, optionsEstado } from '@/assets/js/options.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
DataTablesCore.Buttons.jszip(jszip);

DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

DataTablesCore.Buttons.jszip(jszip);
DataTablesCore.Buttons.pdfMake(pdfmake);

export default defineComponent({
  name: 'TablaEmpleados',
  components: { DataTable },
  setup() {
    const searchNombre = ref('');
    const searchRFC = ref('');
    const searchEdad = ref('');
    const searchSexo = ref('');
    const searchNivelAcademico = ref('');
    const searchClavePresupuestal = ref('');
    const searchPlaza = ref('');
    const searchEstado = ref('');
    const opcEdad = ref(optionsEdad);
    const opcSexo = ref(optionsSexo);
    const opcNivelAcademico = ref(optionsNivelAcademico);
    const opcEstado = ref(optionsEstado);
    let dt;
    const table = ref();
    const store = useStore();
    const alertas = useAlerts();
    const router = useRouter();
    const data = ref([]);
    const temporalData = ref([]);
    const options = {
      dom: 'Brtip',
      responsive: false,
      select: false,
      autoWidth: true,
      paging: true,
      buttons: [
        {
          extend: 'excel',
          text: 'Excel',
          exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        },
        {
          extend: 'pdf',
          text: 'PDF',
          orientation: 'landscape',
          exportOptions: {
            columns: [0, 1, 3, 7, 12, 9, 10],

          },
        },
        'copy',
        'csv',
        'colvis'
      ],
      pagingType: 'numbers',
      language: spanish,
      order: [[1, 'desc']],
      columnDefs: [
        { responsivePriority: 1, targets: [0, 2, 10] },//Details,Name,Actions
        { responsivePriority: 2, targets: [4] },//RFC
      ],
      initComplete: function () {
        this.on('draw.dt', function () {
          nextTick(() => {
            dt.responsive.recalc();
          });
        });
      },

    };
    const columns = [
      { data: 'numeroTarjeta', title: 'Tarjeta', width: '5%', class: 'cell-bordered' },
      { data: 'rfc', title: 'RFC' },
      { data: 'curp', title: 'CURP' },
      { data: 'nombre', title: 'Nombre' },
      { data: 'nivelAcademico', title: 'Nivel académico' },
      { data: 'activo', title: 'Estado',
        render: function (data, type, row) {
          if (data == false) {
            return 'INACTIVO';
          } else {
            return "ACTIVO";
          }
        } },
      { data: 'sexo', title: 'Sexo' },
      { data: 'edad', title: 'Edad' },
      { data: 'lenguas', title: 'Hablante de lenguas' },
      { data: 'discapacidades', title: 'Tiene discapacidades' },
      { data: 'profesion', title: 'Profesión' },
      { data: 'fechaIngreso', title: 'Fecha de ingreso' },
      { data: 'antiguedad', title: 'Antiguedad' },
      { data: 'departamento', title: 'Departamento' },
      { data: 'estado', title: 'Estado' },
      { data: 'tipoMovimiento', title: 'Tipo de movimiento' },
      //{ data: 'puesto', title: 'Puesto' },
      { data: 'nombramiento', title: 'Nombramiento' },
      { data: 'numeroHorasNombramiento', title: 'Horas de nombramiento' },
      { data: 'categoria', title: 'Categoría' },
      { data: 'correoInstitucional', title: 'Correo' },
      { data: 'clavePresupuestal', title: 'Clave presupuestal' },
      { data: 'tipoPlaza', title: 'Tipo de plaza' },
      { data: 'fechaBaja', title: 'Fecha de baja' },
      { data: 'comentarios', title: 'Notas' },

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
      await store.getAll().then(() => {
        data.value = store.data;
        data.value.forEach((element) => {
          element.discapacidades = element.discapacidades ? 'Si' : 'No';
          element.lenguas = element.lenguas ? 'Si' : 'No';
          element.departamento = element.departamento ? element.departamento : '';
        });
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
      router.push({ name: 'empleados_editar', params: { id: index } });
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
              alertas.showErrorAlert('Error', error.response.data.message);
            });
          }
        });
    };

    const clear = () => {
      searchNombre.value = '';
      searchRFC.value = '';
      searchEdad.value = '';
      searchSexo.value = '';
      searchEstado.value = '';
      searchNivelAcademico.value = '';
      searchClavePresupuestal.value = '';
      searchPlaza.value = '';
    };

    const search = () => {
      alertas.showLoading('Buscando');
      let params = {
        nombre: searchNombre.value !== '' ? searchNombre.value : null,
        rfc: searchRFC.value !== '' ? searchRFC.value : null,
        edadMinima: searchEdad.value !== null && searchEdad.value !== '' ? searchEdad.value[0] : null,
        edadMaxima: searchEdad.value !== null && searchEdad.value !== '' ? searchEdad.value[1] : null,
        sexo: searchSexo.value !== '' ? searchSexo.value : null,
        estado: searchEstado.value !== '' ? searchEstado.value : null,
        nivelAcademico: searchNivelAcademico.value !== '' ? searchNivelAcademico.value : null,
        clavePresupuestal: searchClavePresupuestal.value !== '' ? searchClavePresupuestal.value : null,
        plaza: searchPlaza.value !== '' ? searchPlaza.value : null,
      }

      store.search(params).then(() => {
        alertas.closeLoading();
        if (store.queryData == '' || store.queryData == null) {
          alertas.showInfoAlert('No se encontraron resultados');
        } else {
          temporalData.value = store.queryData;
          temporalData.value.forEach((element) => {
            element.discapacidades = element.discapacidades ? 'Si' : 'No';
            element.lenguas = element.lenguas ? 'Si' : 'No';
            element.departamento = element.departamento ? element.departamento : '';
          });
          data.value = temporalData.value;
        }
      })
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
        router.push({ name: 'empleados_registrar' });
      },
      search,
      searchText: searchRFC,
      table,
      searchNombre,
      searchRFC,
      searchEdad,
      searchSexo,
      searchEstado,
      searchNivelAcademico,
      searchClavePresupuestal,
      searchPlaza,
      opcEdad,
      opcSexo,
      opcEstado,
      opcNivelAcademico,
      clear
    };
  },
});
</script>

<style>
@import 'datatables.net-bs5';
@import 'datatables.net-responsive-bs5';
@import 'datatables.net-buttons-bs5';

table.header-border th {
  border-top: 1px solid #dddddd !important;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}

table.header-border th:first-child {
  border-left: 1px solid #dddddd;
}</style>