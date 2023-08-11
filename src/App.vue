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
          <span class="py-2 user-info-container border-round-2xl hover:bg-gray-200" type="button" label="Toggle"
            @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" @mouseenter="hovered"
            @mouseleave="unhovered">
            <div class="ps-2 me-2 text-nowrap">
              <span class="user-info user-info-item fw-semibold text-end">{{ nombre_usuario }}</span>
            </div>
            <Avatar class="me-2 bg-primary-600 transition-colors transition-duration-500 text-0" shape="circle"
              id="avatar" :label="inicial_usuario" />
          </span>
          <Menu ref="menuRef" class="text-nowrap" id="overlay_menu" :model="userMenu" :popup="true" />
          <Toast />
        </template>
      </Menubar>

      <div v-if="!showNavbar" class="nav-tec">
        <ul>
          <li>
            <RouterLink to="/" class="px-3" :class="{ active: route.path === '/' }"><i class="pi pi-home"></i> Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/registro" :class="{ active: route.path === '/registro' }"><i class="pi pi-user-plus"></i>
              Registrarme</RouterLink>
          </li>
          <li v-if="isLoggedIn" style="float:right">
            <RouterLink to="/inicio" class="blink"><i class="pi pi-lock-open"></i> Ingresar (sesión activa)</RouterLink>
          </li>
          <li v-else style="float:right">
            <RouterLink to="/login" :class="{ active: route.path === '/login' }"><i class="pi pi-lock"></i> Iniciar sesión
            </RouterLink>
          </li>
        </ul>
      </div>


      <RouterView />

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
    const user_authLevel = ref(0);
    const inicial_usuario = ref('');
    const rol_usuario = ref(Cookies.get('rol'));
    const isLoggedIn = ref('');

    const show_auth1 = ref(false);
    const show_auth2 = ref(false);
    const show_auth3 = ref(false);
    const show_auth3_1 = ref(false);
    const show_auth4 = ref(false);

    router.beforeEach((to) => {
      isLoggedIn.value = AuthStore.isLoggedIn();
      showNavbar.value = to.matched.some(record => record.meta.requiresAuth) && isLoggedIn.value;

      if (isLoggedIn.value) {
        if (!nombre_usuario.value || !inicial_usuario.value || !rol_usuario.value || user_authLevel.value === 0) {
          const nombre = Cookies.get('nombre');
          const apellidos = Cookies.get('apellidos').split(' ')[0];
          let nombreCompleto = `${nombre} ${apellidos}`;
          rol_usuario.value = Cookies.get('rol');

          if (nombreCompleto.length > 25) {
            const [nombreParte1, nombreParte2] = nombreCompleto.split(' ');
            nombreCompleto = `${nombreParte1} ${nombreParte2.length + nombreParte1.length > 25 ? nombreParte2.charAt(0) + '.' : nombreParte2}`;
          }

          nombre_usuario.value = nombreCompleto;
          inicial_usuario.value = nombre.charAt(0).toUpperCase();
          user_authLevel.value = rol_usuario.value.includes('ADMIN') ? 4 : rol_usuario.value.includes('EMPLEADO_HR') || rol_usuario.value.includes('PLANEACION') ? 3 : rol_usuario.value.includes('ASISTENTE') ? 2 : 1;
        }

        if (to.path === '/login') {
          console.log('Ya has iniciado sesión');
          alerts.showToast('info', 'Ya has iniciado sesión', "bottom-end", 3000);
          showNavbar.value = true;
          router.push('/inicio');
          return false;
        } else if (to.meta.requiresAuth && to.meta.authLevel > user_authLevel.value) {
          alerts.showToast('error', 'No tienes permisos para acceder a esta página', "bottom-end", 3000);
          return false;
        } else {
          return true;
        }
      } else {
        nombre_usuario.value = '';
        user_authLevel.value = 0;
        inicial_usuario.value = '';
        rol_usuario.value = '';

        if (to.matched.some(record => record.meta.requiresAuth)) {
          alerts.showToast('error', 'Necesitas iniciar sesión', "bottom-end", 3000);
          return { name: 'Login' };
        } else {
          return true;
        }
      }
    });

    router.afterEach((to) => {
      if (isLoggedIn.value) {
        const userRole = Cookies.get('rol');
        const isAdmin = userRole.includes('ADMIN');
        const isHrOrAdmin = userRole.includes('HR') || isAdmin;
        const isPlaneacion = userRole.includes('PLANEACION');
        const isEmployeeHrOrAdmin = userRole.includes('EMPLEADO_HR') || isAdmin || isPlaneacion;
        const isEmployeeNotHrOrAdmin = userRole.includes('EMPLEADO') && !isHrOrAdmin;

        show_auth1.value = ref(isEmployeeNotHrOrAdmin);
        show_auth2.value = ref(isHrOrAdmin);
        show_auth3.value = ref(isEmployeeHrOrAdmin);
        show_auth4.value = ref(isAdmin);

        items.value = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/inicio' },
          { label: 'Consultar expediente', icon: 'pi pi-fw pi-book', to: '/empleados/expediente/pre', visible: show_auth1.value },
          {
            label: 'Administrador',
            icon: 'pi pi-fw pi-shield',
            visible: show_auth4.value,
            class: 'req_auth_4',
            items: [
              { label: 'Usuarios', icon: 'pi pi-fw pi-users', to: '/usuarios' },
              { label: 'Configuración', icon: 'pi pi-fw pi-wrench', to: '/configuracion' },
              { label: 'Respaldos', visible:false, icon: 'pi pi-fw pi-cloud-download', to: '/respaldos' },
            ],
          },
          {
            label: 'Datos',
            icon: 'pi pi-fw pi-database',
            visible: show_auth2.value,
            class: 'req_auth_2',
            items: [
              { label: 'Empleados', icon: 'pi pi-fw pi-users', to: '/empleados' },
              { label: 'Plazas', icon: 'pi pi-fw pi-briefcase', to: '/plazas' },
              { label: 'Departamentos', visible:show_auth3.value, icon: 'pi pi-fw pi-building', to: '/departamentos' },
              { separator: true },
              {
                label: 'Búsqueda avanzada', icon: 'pi pi-fw pi-search',
                visible: show_auth3.value,
                to: '/consulta'
              },
            ],
          },
          {
            label: 'Estadística',
            icon: 'pi pi-fw pi-chart-bar',
            visible: show_auth3.value,
            items: [
              { label: 'Dashboard', visible:false, icon: 'pi pi-fw pi-chart-pie', to: '/dashboard' },
              { label: 'Reportes', icon: 'pi pi-fw pi-book', to: '/reportes' },
              {
                label: 'Búsqueda avanzada', icon: 'pi pi-fw pi-search',
                to: '/consulta'
              },
            ],
          },
        ];
      }
    });


    const items = ref();

    const userMenu = [
      {
        label: 'Preferencias',
        icon: 'pi pi-fw pi-cog',
        to: '/preferencias',
      },
      {
        label: 'Cambiar contraseña',
        icon: 'pi pi-fw pi-key',
        to: '/cambiar-contrasena',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off',
        command: logout,
      },
    ];

    function logout() {
      var dummyTimeout = window.setTimeout(function () { }, 0);
      while (dummyTimeout--) {
        window.clearTimeout(dummyTimeout);
      }
      AuthStore.logout();
      alerts.showLogoutSuccessToast();
      router.push('/');
    }

    onMounted(() => {
      setTimeout(() => {
        setWallpaper()
      }, 1000)
    });

    function setWallpaper() {
      if (Cookies.get("wallpaper") == 'none') {
        let bg_container = document.getElementById('app-content')
        bg_container.style.backgroundImage = 'none'
      } else {
        let bg_container = document.getElementById('app-content')
        bg_container.style.backgroundImage = 'url(' + Cookies.get("wallpaper") + ')'
      }
    }

    const menuRef = ref(null);

    function toggle(event) {
      if (menuRef.value) {
        menuRef.value.toggle(event);
      }
    }

    const hovered = () => {
      let avatar = document.getElementById("avatar");
      avatar.classList.add("bg-orange-600")
      avatar.classList.remove("bg-primary-600")
    }

    const unhovered = () => {
      let avatar = document.getElementById("avatar");
      avatar.classList.remove("bg-orange-600")
      avatar.classList.add("bg-primary-600")
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
      user_authLevel,
      hovered,
      unhovered
    };
  },
};

</script>

<style>
.dataTables_wrapper .dataTables_paginate .paginate_button {
  padding: 0 0 !important;
}

.paginate_button.page-item,
.paginate_button.page-item:hover,
.paginate_button.page-item.active:focus,
.paginate_button.page-item.active:active {
  border: none !important;
  background: none !important;
}

.paginate_button.page-item.active:hover a:hover {
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
  background-color: rgba(255, 255, 255, 0.0) !important;
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
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px) !important;
  z-index: 2 !important;
}

#app-content {
  background-size: cover !important;
  background-color: #ebebeb;
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
  max-width: 1400px;
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

.trembling-animation {
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

.bi {
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}
</style>