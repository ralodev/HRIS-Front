<template>
  <div class="container-fluid px-0 " id="app-content">

    <div id="scroll-container">

      <div v-if="!showNavbar" class="nav-tec">
        <ul>
          <li><a href=""></a></li>
        </ul>
      </div>

      <div v-if="!showNavbar" class="surface-0 text-color text-center fs-3">
        <img src="./assets/icon.jpg" alt="logo" height="150" class="d-inline-block align-text-top" />
      </div>

      <Menubar :model="items" class="surface-card shadow-2" v-show="showNavbar">
        <template #start>
          <img alt="logo" src="./assets/icon_orig.png" height="50" />
        </template>
        <template #end>
          <span class="py-2 user-info-container border-round-2xl hover:bg-gray-200" type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
            <div class="ps-2 me-2 text-nowrap">
              <span class="user-info user-info-item fw-semibold text-end">{{ nombre_usuario }}</span>
            </div>
            <Avatar class="me-2 bg-primary-600 hover:bg-orange-600 transition-colors transition-duration-500 text-0" shape="circle" :label="inicial_usuario" />
          </span>
          <Menu ref="menuRef" class="text-nowrap" id="overlay_menu" :model="userMenu" :popup="true" />
          <Toast />
        </template>
      </Menubar>

      <div v-if="!showNavbar" class="nav-tec">
        <ul>
          <li>
            <RouterLink to="/" :class="{ active: route.path === '/' }"><i class="pi pi-home"></i> Inicio</RouterLink>
          </li>
          <li>
            <RouterLink to="/inicio"><i class="pi pi-book"></i> Consultar expediente</RouterLink>
          </li>
          <li>
            <RouterLink to="/registro"><i class="pi pi-user-plus"></i> Registrarme</RouterLink>
          </li>
          <li v-if="isLoggedIn" style="float:right">
            <RouterLink to="/inicio" class="blink"><i class="pi pi-lock-open"></i> Ingresar (sesión activa)</RouterLink>
          </li>
          <li v-else style="float:right">
            <RouterLink to="/login" :class="{ active: route.path === '/login' }"><i class="pi pi-lock"></i> Iniciar sesión</RouterLink>
          </li>
        </ul>
      </div>


      <RouterView/>

    </div>


  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore as authStore } from '@/stores/authStore';
import Cookies from 'js-cookie';
import { useAlerts } from '@/components/useAlerts';

export default {
  name: 'App',
  setup() {
    const AuthStore = authStore();
    const route = useRoute();
    const router = useRouter();
    const showNavbar = ref(!route.path.includes('login'));
    const breadcrumbs = [];
    const alerts = useAlerts();
    const appContainer = ref(null);

    const nombre_usuario = ref('');
    const inicial_usuario = ref('');
    const rol_usuario = ref('');
    const isLoggedIn = ref('');

    router.beforeEach((to, from, next) => {
      isLoggedIn.value = AuthStore.isLoggedIn();

      if (isLoggedIn.value) {
        let nombre = Cookies.get('nombre');
        let apellidos = Cookies.get('apellidos').split(' ')[0];
        let nombreCompleto = nombre + ' ' + apellidos;

        if (nombreCompleto.length > 20) {
          nombreCompleto = nombreCompleto.split(' ');
          if (nombreCompleto[0].length + nombreCompleto[1].length > 20) {
            nombreCompleto = nombreCompleto[0] + ' ' + nombreCompleto[1].charAt(0) + '.';
          }
        }

        nombre_usuario.value = nombreCompleto;
        inicial_usuario.value = Cookies.get('nombre').charAt(0);
        rol_usuario.value = Cookies.get('rol');
      }

      showNavbar.value = to.matched.some(record => record.meta.requiresAuth) && isLoggedIn.value;
      //Si está logueado y quiere ir a login, redirigir a inicio
      if (to.path === '/login' && isLoggedIn.value) {
        alerts.showToast('info', 'Ya has iniciado sesión', "bottom-end", 3000);
        showNavbar.value = true;
        router.push('/inicio');
      }
      //Si no está logueado y quiere ir a una ruta protegida, redirigir a login
      if (to.matched.some(record => record.meta.requiresAuth && !isLoggedIn.value)) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
        alerts.showToast('error', 'Necesitas iniciar sesión', "bottom-end", 3000);
        //showNavbar.value = false;
      } else {
        next();
      }
    });

    const items = [
      { label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/inicio' },
      {
        label: 'Administrador',
        icon: 'pi pi-spin pi-cog',
        items: [
          { label: 'Usuarios', icon: 'pi pi-fw pi-users', to: '/usuarios' },
          { label: 'Respaldos', icon: 'pi pi-fw pi-cloud-download', to: '/respaldos' },
        ],
      },
      {
        label: 'Datos',
        icon: 'pi pi-fw pi-database',
        items: [
          { label: 'Empleados', icon: 'pi pi-fw pi-users', to: '/empleados' },
          { label: 'Plazas', icon: 'pi pi-fw pi-briefcase', to: '/plazas' },
          { label: 'Departamentos', icon: 'pi pi-fw pi-building', to: '/departamentos' },
          { separator: true },
          { label: 'Búsqueda avanzada', icon: 'pi pi-fw pi-search', to: '/consulta' },
        ],
      },
      {
        label: 'Estadística',
        icon: 'pi pi-fw pi-chart-bar',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-chart-pie', to: '/dashboard' },
          { label: 'Reportes', icon: 'pi pi-fw pi-book', to: '/reportes' },
        ],
      },
    ];

    const userMenu = [
      {
        label: 'Cambiar contraseña',
        icon: 'pi pi-fw pi-key',
        to: '/opciones',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off',
        command: logout,
      },
    ];

    function logout() {
      AuthStore.logout();
      alerts.showLogoutSuccessToast();
      router.push('/');
    }

    onMounted(() => {
      setTimeout(() => {
        document.getElementById('app-content').classList.add('application-background')
      }, 1000)
    });

    const menuRef = ref(null);

    function toggle(event) {
      if (menuRef.value) {
        menuRef.value.toggle(event);
      }
    }

    return {
      isLoggedIn,
      nombre_usuario,
      inicial_usuario,
      rol_usuario,
      route,
      showNavbar,
      breadcrumbs,
      items,
      userMenu,
      logout,
      toggle,
      menuRef,
      appContainer,
    };
  },
};

</script>

<style>
.dataTables_wrapper .dataTables_paginate .paginate_button {
  padding: 0 0 !important;
}

.paginate_button.page-item, .paginate_button.page-item:hover, .paginate_button.page-item.active:focus, .paginate_button.page-item.active:active  {
  border: none !important;
  background: none !important;
}

.paginate_button.page-item.active:hover a:hover{
  cursor: default !important;
}

.pagination:hover {
  display: inline-block !important;
}

.pagination {
  display: inline-block !important;
  margin-left: 1px !important;
  margin-right: 1px !important;
  margin-bottom: 0 !important;
}

ul>li.paginate_button.page-item.active {
  background-color: var(--primary-color) !important;
}

ul>li.paginate_button.page-item.active>a {
  background-color: var(--primary-color) !important;
}

ul>li.paginate_button.page-item.active>a:focus {
  box-shadow: none !important;
}

#scroll-container {
  overflow-y: scroll;
  height: 100vh;
}

div.user-info-container {
  display: flex;
  flex-direction: column;
}

span.user-info-container {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.user-info-item {
  margin-right: 2px;
}

.sidebarlogo {
  position: relative;
  right: 100%;
  align-self: center;
}

label select.form-select {
  min-width: 80px;
}

div.dt-buttons.btn-group {
  position: relative;
  display: flex;
}
@media (min-width: 768px) {
  div.dt-buttons.btn-group {
    display: block;
  }
}

#app-content {
  min-height: 100vh;
}

div.p-panel-content {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

div.p-menubar {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.thicker-glass {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

ul.p-submenu-list {
  background-color: rgba(255, 255, 255, 0.98) !important;
  z-index: 5000 !important;
}

div.card {
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px) !important;
  z-index: 2 !important;
}



.application-background {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/svg/waves0.svg');
  background-size: cover;
  background-repeat: repeat-y;
  background-position: 0 -700px;
  background-color: #FFF;
}

li .dtr-title {
  font-weight: bold !important;
}

td.dtr-control::before {
  background-color: #5472d4 !important;
}

tr.dt-hasChild td.dt-control:before {
  background-color: #ecb500 !important;
}

html {
  height: 100%;
}

div.slider {
  display: none;
}

td.child {
  padding: 0 !important;
}

td.child table {
  background-color: #f8f8f8;
  border: #dadada 1px solid;
  width: 100%;
}

input:read-only {
  background-color: #f3f3f3;
  cursor: not-allowed;
}

.swal2-checkbox input {
  cursor: pointer !important;
}

footer {
  background-color: #1B396A;
  color: #FFF;

}

.nav-tec {
  background-color: #1B396A;
  color: #FFF;
}

.nav-tec ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1B396A;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}

.nav-tec li {
  float: left;
}

.nav-tec li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.nav-tec li a:hover:not(.active) {
  background-color: #112342;
  box-shadow: inset 0 0 10px #254e91;
}

.nav-tec li a.blink i {
  animation: trembling 3s ease-in-out infinite;
}

@keyframes trembling {
  35% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  40% {
    transform: translate(-2px, 0px) rotate(-5deg);
  }

  45% {
    transform: translate(2px, 0px) rotate(5deg);
  }

  50% {
    transform: translate(-2px, 0px) rotate(-5deg);
  }

  55% {
    transform: translate(2px, 0px) rotate(5deg);
  }

  60% {
    transform: translate(0px, 0px) rotate(0deg);
  }
}

.nav-tec .active {
  background-color: #e4771f;
}

div.card-header i.bi.fw-bold {
  font-size: 2.5rem;
}

.bi{
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}
</style>