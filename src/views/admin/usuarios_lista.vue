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
          <div class="col-12 lg:col-6 md:col-8">
            <div class="p-inputgroup">
              <InputText placeholder="Buscar usuario" id="searchInput" @keyup.enter="search" v-model="searchText"
                type="search" autocomplete="none" />
              <Button icon="pi pi-search" severity="primary" @click="search" />
            </div>
          </div>
          <div class="col-12 lg:col-6 md:col-4">
            <Button type="button" label="Registrar usuario" icon="pi pi-user-plus" @click="registrar" class="float-end"
              raised />
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
      order: [[1, 'asc']],
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
        data: null, title: 'Correo electrónico', class: 'all no-wrap text-nowrap', render: function (data, row) {
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
      },
      {
        data: null, title: 'Nombre', class: 'min-tablet-l', render: function (data) {
          return data.nombre + " " + data.apellidos;
        }
      },
      {
        data: 'rol', title: 'Rol', class: 'min-tablet-l', render: function (data) {
          let num = data == 'ROLE_ADMIN' ? 1 : data == 'ROLE_EMPLEADO_HR' ? 2 : data == 'ROLE_ASISTENTE_HR' ? 3 : 4
          let rol = data.replaceAll("_", " ").replaceAll("ROLE", "");
          return "<span class='d-none'>" + num + "</span>" + rol;
        }
      },

      {
        data: 'estado', class: 'text-nowrap  acciones justify-content-center all ', width: '10%', title: 'Acciones', orderable: false, wrap: true, render: function (data) {
          let buttons =
            '<a title="Ver empleado" class="details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none"><i class="pi pi-user-edit"></i></a> ';
          if (data == 'BLOQUEADO') {
            buttons +=
              '<a title="Desbloquear" class="unlock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-success bg-green-600 p-button-raised text-decoration-none"><i class="pi pi-lock-open"></i></a> ';
          } else {
            buttons +=
            '<a title="Bloquear" class="lock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-danger p-button-raised text-decoration-none"><i class="pi pi-lock"></i></a> ';
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
      await store.getUsuarios().then(() => {
        //for testing purposes, duplicate data 3 times to test the scroll
        data.value = store.data;
        // if data.value.locked == false, then data.value.estado = 'BLOQUEADO', else if data.value.enabled == false, then data.value.estado = 'INACTIVO', else data.value.estado = 'ACTIVO'
        data.value.forEach((item) => {
          if (item.locked == true) {
            item.estado = 'BLOQUEADO';
          } else if (item.enabled == false) {
            item.estado = 'INACTIVO';
          } else {
            item.estado = 'ACTIVO';
          }
        });

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
      const email = Cookies.get('email');

      detailsButt.forEach((butt) => {
        if (butt.parentElement.parentElement.firstChild.innerText.split('\n')[0] == email){
          butt.nextElementSibling.classList.add('p-disabled');
          butt.nextElementSibling.classList.remove('p-button-danger');
          butt.nextElementSibling.classList.add('p-button-secondary');
          butt.nextElementSibling.title = 'No puedes bloquear tu propia cuenta';
          butt.classList.add('p-disabled');
          butt.classList.remove('p-button-primary');
          butt.classList.add('p-button-secondary');
          butt.title = 'No puedes editar tu propia cuenta';
          if (butt.parentElement.parentElement.firstChild.firstChild.classList.contains('not-edited')){
            butt.parentElement.parentElement.firstChild.innerHTML += "<span class='float-end me-1 p-tag p-component p-tag-info' title='Esta es tu cuenta' style='cursor: help !important;'>Tú</span>"
            butt.parentElement.parentElement.firstChild.firstChild.classList.remove('not-edited');
          }
        }
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          router.push({
            name: 'usuarios_editar', params: {
              id: butt.closest('tr').cells[0].firstChild.innerHTML
            }
          });
        });
      });
      lockButt.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          bloquearUsuario(butt.closest('tr').cells[0].innerText.split('\n')[0]);
        });
      });
      unlockButt.forEach((butt) => {
        butt.parentElement.classList.add('flex');
        butt.addEventListener('click', () => {
          desbloquearUsuario(butt.closest('tr').cells[0].innerText.split('\n')[0]);
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
      registrar: () => {
        router.push({ name: 'usuarios_registrar' });
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
}</style>