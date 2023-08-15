<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">

      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-clock-history fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0">
            Historial de cambios de usuarios
          </span>
        </span>
      </div>
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar cambio por usuario" id="searchInput" @keyup.enter="search"
                v-model="searchText" type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Volver a usuarios" icon="pi pi-undo" @click="usuarios" class="float-end me-2"
              severity="secondary" raised />
          </div>
        </div>
        <!-- Table -->
        <DataTable :columns="columns" :data="data"
          class="table-responsive text-nowrap hover row-border border order-column" width="100%" :options="options"
          ref="table" />
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
import { useStore } from '@/stores/adminStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'
import Cookies from 'js-cookie';

//pdfMake.vfs = pdfFonts.pdfMake.vfs;
//DataTablesCore.Buttons.jszip(JsZip);
DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

export default defineComponent({
  name: 'TablaEmpleados',
  components: { DataTable },
  setup() {
    const searchText = ref('');
    const current_user_email = Cookies.get('email');
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
      pagingType: 'numbers',
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
      {
        data: 'id', title: '#', class: 'all', width: '20%'
      },
      {
        data: 'tipo', title: 'Tipo', width: '10%', class: 'min-tablet-l'
      },
      {
        data: 'descripcion', title: 'Descripción', class: 'min-desktop no-wrap text-nowrap email-col', width: '10%'
      },
      {
        data: null, title: 'Fecha', class: 'all no-wrap text-nowrap email-col', width: '10%', render: function (data) {
          let fecha = new Date(data.fecha);
          let dia = fecha.getDate();
          let mes = fecha.getMonth() + 1;
          let año = fecha.getFullYear();
          let horas = fecha.getHours();
          let minutos = fecha.getMinutes();
          return dia + '/' + mes + '/' + año + ' a las ' + horas + ':' + minutos+' hs';

        },
      },
      {
        data: null, title: 'Usuario', class: 'min-tablet-l no-wrap text-nowrap email-col', width: '10%', render: function (data) {
          return data.usuario.email;
        },
      },
      {
        data: null, class: 'text-nowrap  acciones justify-content-center all ', width: '10%', title: 'Acciones', orderable: false, wrap: true, render: function (data) {
          let buttons =
            "<a title='Ver usuario' name='" + data.usuario.id + "' class='details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none'><i class='pi pi-eye'></i></a> ";
          return data.usuario.email == "Sistema" ? "" : buttons;
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
      await store.getHistorial().then(() => {
        data.value = store.data;

        data.value.forEach((element) => {
          if (element.usuario.email === "18161160@itoaxaca.edu.mx") {
            element.usuario.email = "Sistema";
          }
        });

        console.log(data.value);
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

    const addButtEvList = () => {
      const detailsButt = document.querySelectorAll('.details-btn');

      detailsButt.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          router.push({
            name: 'usuarios_editar', params: {
              id: butt.attributes.name.value
            }
          });
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

    const bloquearUsuario = (id) => {
      alertas.showLoading('Bloqueando usuario');
      setTimeout(() => {
        alertas.closeLoading();
      }, 5000);
      store.bloquearUsuario(id).then(() => {
        alertas.closeLoading();
        alertas.showSuccessAlert('Éxito', 'Usuario bloqueado');
        getAll();
      }).catch((error) => {
        alertas.closeLoading();
        if (error.code === "ERR_NETWORK") {
          alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
        } else {
          alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
      })
    };

    const desbloquearUsuario = (id) => {

      alertas.showLoading('Desbloqueando usuario');
      store.desbloquearUsuario(id).then(() => {
        alertas.closeLoading();
        alertas.showSuccessAlert('Éxito', 'Usuario desbloqueado');
        getAll();
      }).catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
        } else {
          alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
      });
    };

    return {
      columns,
      data,
      options,
      usuarios: () => {
        router.push({ name: 'usuarios' });
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