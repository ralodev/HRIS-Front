<template>
  <body class="light container-fluid d-block px-0 pb-4">
    <!-- Navbar -->
    <nav class="navbar navbar-collapse navbar-light bg-light px-3">
      <RouterLink to="/" style="text-decoration: none; color: #000;">
        <img class="me-3" src="./assets/icon.png" height="50" alt="ITO Logo" loading="lazy" />
      </RouterLink>
      <!-- User dropdown -->
      <div class="navbar-nav ms-auto">
        <span class="user-info-container" type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
          <div class="user-info-container me-2">
            <span class="user-info user-info-item fw-semibold text-end"
            >Raúl López</span>
            <span class="user-info user-info-item small text-muted text-end" >Administrador del sitio</span>
          </div>
          <Avatar icon="pi pi-user" class="me-2" shape="circle" />
        </span>
        <Menu ref="menu" id="overlay_menu" :model="userMenu" :popup="true" />
        <Toast />
      </div>
    </nav>
    <!-- End Navbar -->

    <!-- Sidenav button -->
    <button name="sidebar-toggle" class="btn rounded-pill btn-primary" id="nav-toggle-button" @click="visible = true">
        <i class="pi pi-angle-double-right"></i> Mostrar menú
    </button>

    <Sidebar v-model:visible="visible" close-icon="pi pi-angle-double-left">
      <template #header>
        <img class="sidebarlogo" src="./assets/icon.png" height="70" alt="ITO Logo" loading="lazy" />
      </template>
      <template #default="{ visible }">
        <PanelMenu :model="items" />
      </template>
    </Sidebar>

    <router-view />

  </body>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'App',
  mounted() {
    $('#nav-toggle-button').click(function () {
      $('#navbarCollapse').toggleClass('collapse')
    })
    this.$router.afterEach(() => {
     this.visible = false
    })
  },
  data() {
    return {
      visible: false,
      home: { icon: 'pi pi-home', to: '/' },
      breadcrumbs: [],
      items: [
        { label: 'Página principal', icon: 'pi pi-fw pi-home', to: '/' },
        {
          label: 'Administrador', icon: 'pi pi-fw pi-shield', items:
            [
              { label: 'Ver usuarios', icon: 'pi pi-fw pi-users', to: '/usuarios' },
              { label: 'Registrar usuario', icon: 'pi pi-fw pi-user-plus', to: '/usuarios/registrar' },
              { label: 'Centro de respaldos', icon: 'pi pi-fw pi-cloud-upload', to: '/respaldos' },
            ]
        },
        {
          label: 'Empleados', icon: 'pi pi-fw pi-user', items:
            [
              { label: 'Ver empleados', icon: 'pi pi-fw pi-users', to: '/empleados' },
              { label: 'Registrar empleado', icon: 'pi pi-fw pi-user-plus', to: '/empleados/registrar' },
            ]
        },
        {
          label: 'Plazas', icon: 'pi pi-fw pi-briefcase', items:
            [
              { label: 'Ver plazas', icon: 'pi pi-fw pi-users', to: '/puestos' },
              { label: 'Registrar plaza', icon: 'pi pi-fw pi-user-plus', to: '/puestos/registrar' },
              { label: 'Reporte de plazas', icon: 'pi pi-fw pi-file', to: '/puestos/reporte' },
            ]
        },
        {
          label: 'Departamentos', icon: 'pi pi-fw pi-building', items:
            [
              { label: 'Ver departamentos', icon: 'pi pi-fw pi-users', to: '/departamentos' },
              { label: 'Registrar departamento', icon: 'pi pi-fw pi-user-plus', to: '/departamentos/registrar' },
            ]
        },
        {
          label: 'Información', icon: 'pi pi-fw pi-search', items:
            [
              { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/dashboard' },
              { label: 'Reporte 9.11', icon: 'pi pi-fw pi-file', to: '/reporte' },
            ]
        },
      ],
      userMenu: [
        {
          label: 'Perfil',
          icon: 'pi pi-fw pi-user',
          to: '/'
        },
        {
          label: 'Opciones',
          icon: 'pi pi-fw pi-cog',
          to: '/'
        },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.logout()
          }
        }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    toggle(event) {
      this.$refs.menu.toggle(event)
    }
  }
}
</script>

<style>

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

#nav-toggle-button {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 1rem;
  z-index: 1000;
}
</style>