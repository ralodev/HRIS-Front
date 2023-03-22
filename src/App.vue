<template>
  <body class="light container-fluid d-block px-0 pb-4">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-light px-3">
      <RouterLink to="/">
        <img class="me-3" src="./assets/icon.png" height="40" alt="ITO Logo" loading="lazy" />
      </RouterLink>
      <a id="nav-toggle-button" role="button" class="btn navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </a>
      <div id="navbarCollapse" class="navbar-collapse justify-content-start collapse">
        <div class="navbar-nav">
          <!-- Dropdown Administrador -->
          <div class="nav-item dropdown">
            <span role="button" class="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" >Administrador</span>
            <div class="dropdown-menu">
              <RouterLink to="/" class="dropdown-item">Ver usuarios</RouterLink>
              <RouterLink to="/" class="dropdown-item">Registrar usuario</RouterLink>
              <RouterLink to="/" class="dropdown-item">Centro de respaldos</RouterLink>
            </div>
          </div>
          <!-- Dropdown Empleados -->
          <div class="nav-item dropdown">
            <span role="button" class="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" >Empleados</span>
            <div class="dropdown-menu">
              <RouterLink to="/empleados" class="dropdown-item">Ver empleados</RouterLink>
              <RouterLink to="/" class="dropdown-item">Registrar empleado</RouterLink>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <RouterLink to="/" class="dropdown-item">Reporte de empleados</RouterLink>
            </div>
          </div>
          <!-- Dropdown Plazas -->
          <div class="nav-item dropdown">
            <span role="button" class="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" >Plazas</span>
            <div class="dropdown-menu">
              <RouterLink to="/puestos" class="dropdown-item">Ver plazas</RouterLink>
              <RouterLink to="/" class="dropdown-item">Registrar plaza</RouterLink>
              <RouterLink to="/" class="dropdown-item">Reporte de plazas</RouterLink>
            </div>
          </div>
          <!-- Dropdown Departamentos -->
          <div class="nav-item dropdown">
            <span role="button" class="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" >Departamentos</span>
            <div class="dropdown-menu">
              <RouterLink to="/departamentos" class="dropdown-item">Ver departamentos</RouterLink>
              <RouterLink to="/" class="dropdown-item">Registrar departamento</RouterLink>
            </div>
          </div>
          <!-- Dropdown Información -->
          <div class="nav-item dropdown">
            <span role="button" class="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" >Información</span>
            <div class="dropdown-menu">
              <RouterLink to="/" class="dropdown-item">Dashboard</RouterLink>
              <RouterLink to="/" class="dropdown-item">Reporte 9.11</RouterLink>
            </div>
          </div>
        </div>
        <!-- Right side of navbar -->
        <div class="navbar-nav ms-auto">
          <!-- User dropdown -->
          <div class="nav-item dropdown">
            <a data-bs-toggle="dropdown" class="nav-link dropdown-toggle user-action">
              <i class="bi bi-person-circle"></i>&nbsp;&nbsp;<strong id="nombreUsuario"></strong>&nbsp;
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a href="../usuario/configuracion.html" class="dropdown-item"><i class="bi bi-wrench-adjustable"></i>
                Configuración</a>
              <div class="dropdown-divider"></div>
              <a type="button" class="dropdown-item" id="logout"><i class="bi bi-door-open"></i> Cerrar sesión</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->

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
  }
}
</script>