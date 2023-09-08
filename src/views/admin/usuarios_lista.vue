<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">

      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-person-vcard-fill fw-bold h1 my-0"></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0">
            Usuarios registrados
          </span>
        </span>
      </div>
      <div class="card-body table-responsive">
        <!-- Buttons -->
        <div class="grid mb-2">
          <div class="col-12 lg:col-6 md:col-6">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar usuario" id="searchInput" @keyup.enter="search" v-model="searchText"
                type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-6">
            <Button type="button" label="Registrar usuario" icon="pi pi-user-plus" @click="registrar" class="float-end"
              raised />
            <Button type="button" label="Historial" icon="pi pi-history" @click="historial" class="float-end me-2"
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
    /*
        , render: function (data, row) {
              let tag;
              if (data.estado == 'ACTIVO') {
                tag = "<span class='float-end p-tag p-component p-tag-success' title='Esta cuenta opera normalmente' style='cursor: help !important;'>A<span class='d-lg-block d-none'>ctivo</span></span>"
              } else if (data.estado == 'BLOQUEADO') {
                tag = "<span class='float-end p-tag p-component p-tag-danger' title='Este usuario está bloqueado teporalmente' style='cursor: help !important;'>B<span class='d-lg-block d-none'>loqueado</span></span>"
              } else {
                tag = "<span class='float-end p-tag p-component p-tag-warning' title='Este usuario no ha confirmado su correo electrónico' style='cursor: help !important;'>P<span class='d-lg-block d-none'>endiente</span>"
              }
              return "<span class='not-edited'>" + data.email + "</span>" + ' ' + tag;
            }
    */
    const columns = [
      {
        data: null, title: 'Nombre', class: 'all', width: '20%', render: function (data) {
          let tag;
          if (data.estado == 'ACTIVO') {
            tag = "<span class='float-end p-tag p-component p-tag-success' title='Este usuario está habilitado' style='cursor: help !important;'>H<span class='d-lg-block d-none'>abilitado</span></span>"
          } else if (data.estado == 'BLOQUEADO') {
            tag = "<span class='float-end p-tag p-component p-tag-danger' title='Este usuario se encuentra bloqueado' style='cursor: help !important;'>B<span class='d-lg-block d-none'>loqueado</span></span>"
          } else {
            tag = "<span class='float-end p-tag p-component p-tag-warning' title='Este usuario no ha confirmado su correo electrónico' style='cursor: help !important;'>P<span class='d-lg-block d-none'>endiente</span>"
          }
          return data.nombre + " " + data.apellidos + ' ' + tag;
        }
      },
      {
        data: 'rol', title: 'Rol', width: '10%', class: 'min-tablet-l', render: function (data) {
          let num = data == 'ROLE_ADMIN' ? 1 : data == 'ROLE_EMPLEADO_HR' ? 2 : data == 'ROLE_PLANEACION' ? 3 : data == 'ROLE_ASISTENTE_HR' ? 4 : 5
          let rol = data.replaceAll("_", " ").replaceAll("ROLE", "");
          return "<span class='d-none'>" + num + "</span>" + rol;
        }
      },
      {
        data: 'email', title: 'Correo electrónico', class: 'min-tablet-l no-wrap text-nowrap email-col', width: '10%'
      },
      {
        data: null, class: 'text-nowrap  acciones justify-content-center all ', width: '10%', title: 'Acciones', orderable: false, wrap: true, render: function (data) {
          let buttons =
            "<a title='Ver empleado' name='" + data.id + "' class='details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none'><i class='pi pi-user-edit'></i></a> ";
          if (data.estado == 'BLOQUEADO') {
            buttons +=
              "<a title='Desbloquear' name='" + data.id + "' class='unlock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-success bg-green-600 p-button-raised text-decoration-none'><i class='pi pi-lock-open'></i></a>";
          } else {
            buttons +=
              "<a title='Bloquear' name='" + data.id + "' class='lock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-danger p-button-raised text-decoration-none'><i class='pi pi-lock'></i></a>";
          }
          return buttons;
        },
      },
      { data: 'estado', title: 'Estado', class: 'never' },
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
      await store.getUsuarios().then((res) => {
        let storeData = res.data;

        storeData = storeData.filter((item) => {
          if (item.locked) {
            item.estado = 'BLOQUEADO';
          } else if (!item.enabled) {
            item.estado = 'INACTIVO';
          } else {
            item.estado = 'ACTIVO';
          }

          return item.email !== '18161160@itoaxaca.edu.mx';
        });

        data.value = storeData;

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

    const addButtEvList = () => {
      const detailsButt = document.querySelectorAll('.details-btn');
      const lockButt = document.querySelectorAll('.lock-btn');
      const unlockButt = document.querySelectorAll('.unlock-btn');
      const email_cols = document.querySelectorAll('.email-col');
      const email = Cookies.get('email');

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
      lockButt.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          bloquearUsuario(butt.attributes.name.value);
        });
      });
      unlockButt.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          desbloquearUsuario(butt.attributes.name.value);
        });
      });
      email_cols.forEach((email_col) => {
        if (email_col.innerText == email) {
          email_col.closest('tr').children[3].title = 'No puedes bloquear tu propio usuario';
          let detail_button = email_col.closest('tr').children[3].children[0];
          // detail_button.classList.add('p-disabled');
          // detail_button.classList.add('p-button-secondary');
          // detail_button.classList.remove('p-button-primary');
          detail_button.nextElementSibling.classList.add('p-disabled');
          detail_button.nextElementSibling.classList.add('p-button-secondary');
          detail_button.nextElementSibling.classList.remove('p-button-danger');
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
      registrar: () => {
        router.push({ name: 'usuarios_registrar' });
      },
      historial: () => {
        router.push({ name: 'usuarios_historial' });
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