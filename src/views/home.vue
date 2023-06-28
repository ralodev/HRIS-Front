<template>
  <div class="container-lg py-5">
    <!-- List of cards with links to features -->
    <div class="card text-center shadow-4 mt-3 pt-4 border-round-2xl">
      <div class="text-700 text-center d-block">
        <img src="@/assets/icon0.png" alt="Logo SGIP" class="mx-auto" style="height: 200px;">
        <div class="text-900 text-color font-medium text-4xl">¡Bievenido!</div>
        <div class="text-900 text-color font-medium text-4xl mb-3">Sistema de Gestión de Información de Personal</div>
      </div>
      <div class="mb-6 font-bold text-2xl">
        <span class="text-blue-600">¿Qué desea hacer?</span>
      </div>
      <div class="grid">
          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/plazas">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
                <i class="pi pi-briefcase text-4xl text-blue-500"></i>
              </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Administrar plazas</div>
          </div>

          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/empleados">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-users text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Administrar empleados</div>
          </div>

          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/consulta">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-search text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Consultar datos</div>
          </div>

          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/reportes">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="bi bi-clipboard-data text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Generar reportes</div>
          </div>

          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/dashboard">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-chart-bar text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Ver estadísticas</div>
          </div>

          <div v-if="isHR || isAdmin" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/manual">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-question-circle text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Ver el manual de usuario</div>
          </div>

          <div v-if="isEmployee" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/empleados/expediente/pre">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-book text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Consultar mi expediente</div>
          </div>

          <div v-if="isEmployee" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/opciones">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-key text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Actualizar mi contraseña</div>
          </div>

          <div v-if="isEmployee" class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-power-off text-4xl text-blue-500"></i>
            </span>
            <div class="text-900 text-xl mb-3 font-medium">Cerrar sesión</div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import jsCookie from 'js-cookie';


export default {

  setup() {
    const rol = ref('');
    const isAdmin = ref(false);
    const isHR = ref(false);
    const isEmployee = ref(false);

    onMounted(() => {
      rol.value = jsCookie.get('rol');
      if (rol.value == '[ROLE_ADMIN]') {
        isAdmin.value = true;
      } else if (rol.value == '[ROLE_EMPLEADO_HR]' || rol.value == '[ROLE_ASISTENTE_HR]') {
        isHR.value = true;
      } else if (rol.value == '[ROLE_EMPLEADO]') {
        isEmployee.value = true;
      }
    });

    return {
      rol,
      isAdmin,
      isHR,
      isEmployee
    }
  }
}
</script>

<style>
</style>