<template>
  <div class="container-fluid surface-0">

    <div class="surface-card w-full md:w-8 lg:w-6 mx-auto v-center"
      style="max-width: 500px; padding-top: 3rem; padding-bottom: 8rem;">
      <div class="text-center mb-2">
        <div class="text-900 text-4xl pb-5 font-medium">Regístrate</div>
      </div>

      <div>
        <form id="login" @submit.prevent="onSubmit" class="px-5">

          <label for="email" class="block text-900 text-lg font-medium mb-2">Correo electrónico institucional</label>
          <div class="p-inputgroup">
            <InputText placeholder="Introduce tu correo electrónico" id="searchInput" @keyup.enter="verifyEmail"
              v-model="data.email" autocomplete="email" required @keypress="found_to_null" />
            <Button class="transition-all transition-duration-500" icon="pi pi-search" :label="see ? 'Verificar' : null"
              severity="primary" @click="verifyEmail" @mouseover="seeTrue" @mouseout="seeFalse" />
          </div>

          <span class="block text-justify text-color mb-3">Introduce tu correo institucional y verifica que se encuentre
            en la base de datos.</span>

          <span class="block text-justify text-danger mb-3" v-if="found == false">No hubo coincidencias. Si ese es tu correo
            institucional y eres trabajador del instituto, debes acudir al departamento de Recursos Humanos para
            actualizar el que se tiene en tu registro.</span>

          <span class="block text-justify text-success mb-3" v-if="found == true">Haz click en el botón de abajo para
            registrarte y en unos minutos recibirás un correo electrónico con instrucciones.</span>

          <Button type="submit" :label="!loading ? 'Registrarme' : null" :icon="found ? 'pi pi-check' : 'pi pi-times'"
            :class="found ? 'bg-primary-700' : 'bg-gray-700 border-gray-700'"
            class="w-full hover:shadow-3 hover:bg-primary-600" :loading="loading" :disabled="!found"></Button>
        </form>
      </div>
    </div>
  </div>

  <footer>
    <div class="row mx-0 justify-content-center mb-0 pt-5 pb-0 row-2 px-3">
      <div class="col-12">
        <div class="row row-2">
          <div class="col-sm-4 my-sm-0">
            <ul class="list-unstyled">
              <li class="mt-0 fw-bold">Dirección</li>
              <li>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030</li>
              <li class="mt-3 fw-bold">Contacto</li>
              <li>Email: <a href="mailto:jefatura.humanos@oaxaca.tecnm.mx"
                  style="color: #fff;">jefatura.humanos@oaxaca.tecnm.mx</a></li>
              <li>Tel: (951) 501 50 16 Ext. 1055</li>
            </ul>
          </div>

          <div class="col-sm-4 my-sm-0">
            <ul class="list-unstyled">
              <li class="mt-0 fw-bold">Enlaces</li>
              <li class="mt-1"><a href="www.oaxaca.tecnm.mx" style="color: #fff; text-decoration: none;">Instituto
                  Tecnológico de Oaxaca</a></li>
              <li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/"
                  style="color: #fff; text-decoration: none;">Sistema de Gestión de la Calidad</a></li>
              <li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio"
                  style="color: #fff; text-decoration: none;">Directorio</a></li>
            </ul>
          </div>

          <div class="col-sm-3 text-md-center">
            <h5>
              <span> <i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto tecnológico de
                Oaxaca</b>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2">
      <div class="col-12">
        <div class="row mx-0 my-1 row-1 no-gutters">
          <div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos reservados.
          </div>
          <div class="col-md-3 col-auto"></div>
          <div class="col-md-3 col-auto"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '@/stores/usuarioStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import { setAuthorizationHeader } from '@/assets/js/axiosConfig';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const alertas = useAlerts();
    const loading = ref(false);
    const wrongCredentials = ref(false);
    const see = ref(false);
    const found = ref(null);

    const data = ref({
      email: '',
      nombre: '',
      apellidos: '',
      rol: 'EMPLEADO',
    });

    onMounted(() => {
      document.querySelector('input').focus();
    });

    const onSubmit = () => {
      loading.value = true;
      wrongCredentials.value = false;

      //Regex para validar el correo con el dominio @itoaxaca.edu.mx o @oaxaca.tecnm.mx
      const regex = new RegExp('^[a-zA-Z0-9._%+-]+@(itoaxaca.edu.mx|oaxaca.tecnm.mx)$');
      if (!regex.test(data.value.email)) {
        alertas.showWarningToast('Correo no válido');
        loading.value = false;
        return;
      }

      alertas.showLoading();

      store.registrar(data.value.email).then((r) => {
        alertas.closeLoading();
        loading.value = false;
        if (r.status === 200) {
          alertas.showSuccessAlert('Registro exitoso', 'Se ha enviado un correo de confirmación a tu correo electrónico');
          found.value = null;
        } else {
          wrongCredentials.value = true;
          alertas.showErrorAlert('Error', r.response.data);
        }
      }).catch((e) => {
        alertas.closeLoading();
        alertas.showErrorAlert(e);
      });
    }

    const verifyEmail = () => {
      const regex = new RegExp('^[a-zA-Z0-9._%+-]+@(itoaxaca.edu.mx|oaxaca.tecnm.mx)$');
      if (!regex.test(data.value.email)) {
        alertas.showErrorToast('Correo no válido');
        loading.value = false;
        return;
      }
      store.verificarCorreo(data.value.email).then((r) => {
        if (r.status === 200) {
          found.value = true;
          alertas.showSuccessToast('Correo encontrado');
        } else {
          found.value = false;
          alertas.showErrorToast('Correo no encontrado');
        }
      }).catch((e) => {
        found.value = null;
        alertas.showErrorToast('Ocurrió un error al verificar el correo');
      });
    }

    return {
      onSubmit,
      data,
      loading,
      wrongCredentials,
      see,
      verifyEmail,
      found,
      found_to_null() {
        found.value = null;
      },
      seeTrue() {
        see.value = true;
      },
      seeFalse() {
        see.value = false;
      },

    }
  }
}
</script>

<style>
.login-container {
  height: 700px !important;
  /* Set the height to 100% of the viewport height */

}

.v-center {
  margin: auto;

}</style>