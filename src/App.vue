<template>
  <body class="light container-fluid d-block px-0">
  <nav class="navbar navbar-expand-md navbar-light bg-light px-3">
    <RouterLink to="/">
      <img class="me-3" src="./assets/icon.png" height="40" alt="ITO Logo" loading="lazy" />
    </RouterLink>
    <button
      type="button"
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarCollapse" class="navbar-collapse justify-content-start collapse">
      <div class="navbar-nav">
        <div class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle role-mod" data-bs-toggle="dropdown"
            ><b>A</b>dministrador</a
          >
          <div class="dropdown-menu">
            <RouterLink to="/empleados" class="dropdown-item">Crear Usuario</RouterLink>
          </div>
        </div>
        <div class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
            ><b>C</b>onsultar</a
          >
          <div class="dropdown-menu">
            <RouterLink to="/empleados" class="dropdown-item">Empleados</RouterLink>
            <li><hr class="dropdown-divider role-mod" /></li>
            <RouterLink to="/verDepartamentos" class="dropdown-item">Departamentos</RouterLink>
            <li><hr class="dropdown-divider role-mod" /></li>
            <RouterLink to="/verPlazas" class="dropdown-item">Plazas</RouterLink>
          </div>
        </div>
        <div class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle role-mod" data-bs-toggle="dropdown"
            ><b>D</b>escargar</a
          >
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item disabled">Trabajadores</a>
            <a href="#" class="dropdown-item disabled">Plazas</a>
            <a href="reporte.html" class="dropdown-item disabled">Reporte</a>
          </div>
        </div>
        <div class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle role-mod" data-bs-toggle="dropdown"
            ><b>R</b>egistrar</a
          >
          <div class="dropdown-menu">
            <a href="../registro/nuevo.html" class="dropdown-item disabled"
              >Trabajador (datos personales)</a
            >
            <a href="../registro/nueva-plaza.html" class="dropdown-item"
              >Plaza (con trabajador existente)</a
            >
            <div href="../registro/nuevo.html" class="dropdown-item">Trabajador y Plaza</div>
          </div>
        </div>
      </div>
      <div class="navbar-nav ms-auto">
        <div class="nav-item dropdown">
          <a data-bs-toggle="dropdown" class="nav-link dropdown-toggle user-action">
            <i class="bi bi-person-circle"></i>&nbsp;&nbsp;<strong id="nombreUsuario"></strong
            >&nbsp;
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <a href="../usuario/configuracion.html" class="dropdown-item"
              ><i class="bi bi-wrench-adjustable"></i> Configuración</a
            >
            <div class="dropdown-divider"></div>
            <a type="button" class="dropdown-item" id="logout"
              ><i class="bi bi-door-open"></i> Cerrar sesión</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="container container-xl card-light mt-4 py-3 rounded">

    <router-view />
  </div>
  </body>
</template>

