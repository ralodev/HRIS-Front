<template>
  <div class="container-lg py-5">
    <!-- List of cards with links to features -->
    <div class="card text-center shadow-4 mt-5 pt-4 border-round-2xl">
      <div class="text-700 text-center d-block">
        <div class="text-900 font-bold text-5xl mb-3">Sistema de Gestión de Información de Personal</div>
        <div class="text-700 text-2xl mb-5">Bienvenido</div>
      </div>
      <div class="mb-6 font-bold text-3xl">
        <span class="text-blue-600">¿Qué desea hacer hoy?</span>
      </div>
      <div class="grid">
          <div class="col-4 md:col-4 mb-4 px-5">
            <RouterLink to="/plazas">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
                <i class="pi pi-briefcase text-4xl text-blue-500"></i>
              </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Administrar plazas</div>
          </div>
          <div class="col-4 md:col-4 mb-4 px-5">
            <RouterLink to="/empleados">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-users text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Administrar empleados</div>
          </div>

          <div class="col-12 md:col-4 mb-4 px-5">
            <RouterLink to="/puestos">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-search text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Consultar datos</div>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <RouterLink to="/reportes">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="bi bi-clipboard-data text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Generar reportes</div>
          </div>
          <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <RouterLink to="/estadisticas">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-chart-bar text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Ver estadísticas</div>
          </div>
          <div class="col-4 md:col-4 mb-4 px-5">
            <RouterLink to="/departamentos">
            <span class="p-3 shadow-2 mb-3 inline-block surface-card border-round-xl">
              <i class="pi pi-question-circle text-4xl text-blue-500"></i>
            </span>
            </RouterLink>
            <div class="text-900 text-xl mb-3 font-medium">Ver el manual de usuario</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Home',
  props: {
    nombre_usuario: {
      type: String,
      required: true
    }
  },
  data() {
    const nombre_usuario = this.nombre_usuario;
    return {
      nombre_usuario
    }
  },
}
</script>

<style>
.bi {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  speak-as: none;
}
</style>