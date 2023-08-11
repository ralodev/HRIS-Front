<template>
  <div class="container-lg py-5">
    <!-- List of cards with links to features -->
    <div class="card text-center shadow-4 mt-3 pt-4 border-round-2xl">
      <div class="text-700 text-center" id="welcome">
        <img src="@/assets/icon0.png" alt="Logo SGIP" class="mx-auto" style="height: 200px;">
        <div class="text-900 text-color font-medium text-2xl">¡Bievenido!</div>
        <div class="text-900 text-color font-medium text-2xl mb-3">Sistema de Gestión de Información de Personal</div>
      </div>
      <div class="grid pt-3">
        <div v-if="isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/usuarios">
            <span
            class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-orange-500 hover:border-0 transition-all transition-duration-500">
            <i class="pi pi-shield text-4xl "></i>
          </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Editar usuarios</div>
        </div>

        <div v-if="isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/configuracion">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-orange-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-wrench text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Configuración del sistema</div>
        </div>

        <div v-if="isHR || isAdmin || isAsistente" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/plazas">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-briefcase text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Editar plazas</div>
        </div>

        <div v-if="isHR || isAdmin || isAsistente" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/empleados">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-users text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Editar empleados</div>
        </div>

        <div v-if="isHR || isAdmin " class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/departamentos">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-building text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Editar departamentos</div>
        </div>

        <div v-if="isHR || isAdmin || isPlaneacion" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/consulta">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-search text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Búsqueda avanzada</div>
        </div>

        <div v-if="isHR || isAdmin || isPlaneacion" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/reportes">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-file-pdf text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Generar reportes</div>
        </div>

        <div v-if="isEmployee" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/empleados/expediente/pre">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-book text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Consultar expediente</div>
        </div>

        <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/preferencias">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-cog text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Preferencias</div>
        </div>

        <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/cambiar-contrasena">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-key text-4xl "></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Cambiar contraseña</div>
        </div>

        <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <RouterLink to="/manual">
            <span
              class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500">
              <i class="pi pi-question-circle text-4xl text-blue"></i>
            </span>
          </RouterLink>
          <div class="text-900 text-xl mb-3 font-medium">Manual de usuario</div>
        </div>

        <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <span
            class="p-3 mb-3 border-2 border-300 inline-block text-color surface-100 border-round-xl
            hover:surface-card hover:shadow-5 hover:text-blue-500 hover:border-0 transition-all transition-duration-500 cursor-pointer"
            @click="logout">
            <i class="pi pi-power-off text-4xl "></i>
          </span>
          <div class="text-900 text-xl mb-3 font-medium">Cerrar sesión</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore as authStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useAlerts } from '@/components/useAlerts';
import jsCookie from 'js-cookie';
import { useRouter } from 'vue-router';


export default {

  setup() {
    const rol = ref('');
    const router = useRouter();

    const isAdmin = ref(false);
    const isHR = ref(false);
    const isPlaneacion = ref(false);
    const isEmployee = ref(false);
    const AuthStore = authStore();
    const alerts = useAlerts();
    const isAsistente = ref(false);


    onMounted(() => {
      rol.value = jsCookie.get('rol');
      if (rol.value == '[ROLE_ADMIN]') {
        isAdmin.value = true;
      } else if (rol.value == '[ROLE_EMPLEADO_HR]'){
        isHR.value = true;
      } else if (rol.value == '[ROLE_ASISTENTE_HR]'){
        isAsistente.value = true;
      } else if (rol.value == '[ROLE_PLANEACION]') {
        isPlaneacion.value = true;
      } else if (rol.value == '[ROLE_EMPLEADO]') {
        isEmployee.value = true;
      }

      setTimeout(() => {
        var element = document.getElementById('welcome');
        element.classList.add('slideup');
        element.classList.add('closed');
        element.addEventListener('transitionend', function () {
          element.style.display = 'none';
        });
      }, 15000);
    });

    return {
      rol,
      isAdmin,
      isHR,
      isEmployee,
      isPlaneacion,
      isAsistente,
      logout() {
        var dummyTimeout = window.setTimeout(function () { }, 0);
        while (dummyTimeout--) {
          window.clearTimeout(dummyTimeout);
        }
        AuthStore.logout();
        alerts.showLogoutSuccessToast();
        router.push({ name: 'login' });
      }
    }
  }
}
</script>

<style>
.slideup {
  overflow: hidden;
  max-height: 1000px;
  /* Ajusta la altura máxima según tu contenido */
  transition: max-height 5s ease-out;
}

.slideup.closed {
  max-height: 0;
  padding: 0;
  border: none;
  transition: max-height 5s ease-in;
}</style>