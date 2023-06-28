<template>
  <div class="container-fluid surface-0">

    <div class="surface-card w-full md:w-8 lg:w-6 mx-auto v-center"
      style="max-width: 500px; padding-top: 3rem; padding-bottom: 8rem;">
      <div class="text-center mb-2">
        <div class="text-900 text-4xl pb-3 font-medium">¿Olvidaste tu contraseña?</div>
      </div>

      <div>
        <form id="login" @submit.prevent="onSubmit" class="px-5">
          <label for="email1" class="block text-900 fs-5 font-medium mb-2">Correo electrónico</label>
          <InputText id="email1" v-model="data.email" type="text" class="w-full mb-3 " autocomplete="email" required />

          <span class="block font-normal">Si el correo electrónico coincide con el de tu cuenta, te enviaremos
            un correo con un enlace para restablecer tu contraseña.</span>
          <span class="block font-medium my-2">Esta acción solo se puede realizar una vez cada 30 minutos.</span>
          <Button type="submit" :label="!loading ? 'Enviar email' : null" icon="pi pi-envelope"
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
import { useStore } from '@/stores/usuarioStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
  name: 'Reset',
  setup() {
    const rememberMe = ref(null);
    const store = useStore();
    const router = useRouter();
    const alertas = useAlerts();
    const loading = ref(false);
    const resetLocked = ref(false);
    const lockedUntil = ref(null);

    const data = ref({
      email: '',
      password: ''
    });

    onMounted(() => {
      document.querySelector('input[type="text"]').focus();

      let isResetLocked = Cookies.get('resetLocked');

      if (isResetLocked) {
        resetLocked.value = true;
        lockedUntil.value = Cookies.get('lockedUntil');
      }
    });

    const onSubmit = () => {
      loading.value = true;

      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(data.value.email)) {
        alertas.showErrorToast('El correo electrónico no es válido');
        loading.value = false;
        return;
      }

      Swal.fire({
        title: 'Se requiere confirmación',
        text: 'Esta función puede realizarse una vez cada 30 minutos, por favor, verifique que la dirección de correo electrónico sea correcta.',
        icon: 'warning',
        iconColor: '#f6811e',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder: 'He verificado la dirección de correo electrónico',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#f6811e',
        cancelButtonText: 'Cancelar</i>',
        showCancelButton: true,
        inputValidator: (result) => {
          return !result && 'Debes confirmar que has verificado la dirección de correo electrónico';
        },
      }).then((result) => {
        if (result.value) {
          store.resetRequest(data.value.email)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Listo!',
                text: 'Se ha enviado un correo electrónico a la dirección proporcionada, por favor, verifique su bandeja de entrada y spam. (El correo puede tardar unos minutos en llegar)',
              })
            })
            .catch((error) => {
              showToast('error', 'Ocurrió un error al enviar el correo electrónico, por favor, intente de nuevo más tarde.');
            });
        }
      });
      loading.value = false;
    }

    return {
      onSubmit,
      data,
      loading
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

}
</style>