<template>
  <div class="container-fluid surface-0">

    <div class="surface-card w-full md:w-8 lg:w-6 mx-auto v-center"
      style="max-width: 500px; padding-top: 3rem; padding-bottom: 8rem;">
      <div class="text-center mb-2">
        <div class="text-900 text-4xl pb-3 font-medium">Ingresa tus datos</div>
      </div>

      <div>
        <form id="login" @submit.prevent="onSubmit" class="px-5">
          <label for="email1" class="block text-900 fs-5 font-medium mb-2">Correo electrónico</label>
          <InputText id="email1" v-model="data.email" type="text" class="w-full mb-3 " autocomplete="email" required
          :class="{'border-red-600 border-2 border-round-lg': wrongCredentials}"
          />

          <label for="password1" class="block text-900 fs-5 font-medium mb-2">Contraseña</label>
          <Password id="password1" v-model="data.password" class="w-full mb-3" autocomplete="current-password" required :feedback="false" toggleMask
          :class="{'border-red-600 border-2 border-round-lg': wrongCredentials}"
          />

          <div class="flex align-items-center justify-content-between mb-6">
            <div class="flex align-items-center">
              <Checkbox id="rememberme1" :binary="true" v-model="rememberMe" class="mr-2"></Checkbox>
              <label for="rememberme1">Recordarme</label>
            </div>
            <a class="font-medium no-underline ml-2 text-primary-700 hover:text-primary-600 text-right cursor-pointer ">Olvidé
              mi
              contraseña</a>
            </div>
            <span class="text-center block font-medium text-red-600 mb-1" v-if="wrongCredentials">Credenciales incorrectas</span>

          <Button type="submit" :label="!loading?'Iniciar sesión':null" icon="pi pi-user"
            class="w-full hover:shadow-3 bg-primary-700 hover:bg-primary-600" :loading="loading"></Button>
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
import { useStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import { setAuthorizationHeader } from '@/assets/js/axiosConfig';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  setup() {
    const rememberMe = ref(null);
    const store = useStore();
    const router = useRouter();
    const alertas = useAlerts();
    const loading = ref(false);
    const wrongCredentials = ref(false);

    const data = ref({
      email: '',
      password: ''
    });

    onMounted(() => {
      document.querySelector('input[type="text"]').focus();
      let pwdInput = document.querySelector('input[type="password"]');
      pwdInput.classList.add('w-100');
      pwdInput.setAttribute('autocomplete', 'current-password');

      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        data.value.email = storedUsername;
        rememberMe.value = true;
        pwdInput.focus();
      }
    });

    const onSubmit = () => {
      loading.value = true;
      wrongCredentials.value = false;
      if (rememberMe.value) {
        localStorage.setItem('username', data.value.email);
      } else {
        localStorage.removeItem('username');
      }
      setTimeout(() => {

      store.login(data.value).then((r) => {
        loading.value = false;
        if (r.status === 200) {
          router.push({ path: '/inicio' });
          setAuthorizationHeader(r.data.access_token);
          alertas.closeLoading();
        } else {
          wrongCredentials.value = true;
          alertas.showLoginErrorToast();
        }
      }).catch((e) => {
        alertas.closeLoading();
        alertas.showErrorAlert(e);
      });
      }, 1000);
    }

    return {
      rememberMe,
      onSubmit,
      data,
      loading,
      wrongCredentials
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