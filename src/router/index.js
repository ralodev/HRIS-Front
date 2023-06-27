import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import consulta from '../views/consulta/consulta.vue'
import dashboard from '../views/consulta/dashboard.vue'
import reportes from '../views/consulta/reportes.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/landing.vue'),
      meta: {
        breadcrumb: 'Principal',
        requiresAuth: false,
      }
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/empleados/empleados_lista.vue'),
      meta: {
        breadcrumb: 'Empleados',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/empleados/editar/:id',
      name: 'empleados_editar',
      component: () => import('../views/empleados/empleados_editar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/empleados/registrar/',
      name: 'empleados_registrar',
      component: () => import('../views/empleados/empleados_registrar.vue'),
      meta: {
        breadcrumb: 'Registrar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/empleados/historial/:id',
      name: 'empleados_historial',
      component: () => import('../views/empleados/empleados_historial.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/empleados/expediente/:id',
      name: 'empleados_expediente',
      component: () => import('../views/empleados/empleados_expediente.vue'),
      meta: {
        breadcrumb: 'Expediente',
        requiresAuth: true,
        authLevel: 1
      }
    },
    {
      path: '/empleados/expediente/pre',
      name: 'empleados_expediente_pre',
      component: () => import('../views/empleados/empleados_expediente_pre.vue'),
      meta: {
        requiresAuth: true,
        authLevel: 1
      }
    },
    {
      path: '/plazas',
      name: 'plazas',
      component: () => import('../views/plazas/plazas_lista.vue'),
      meta: {
        breadcrumb: 'Puestos',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/plazas/editar/:id',
      name: 'plazas_editar',
      component: () => import('../views/plazas/plazas_editar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/plazas/seleccionar-empleado/',
      name: 'seleccionar_empleado',
      component: () => import('../views/plazas/plazas_seleccionar_empleado.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/plazas/registrar/:id',
      name: 'plazas_registrar',
      component: () => import('../views/plazas/plazas_registrar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true,
        authLevel: 2
      }
    },
    {
      path: '/departamentos',
      name: 'departamentos',
      component: () => import('../views/departamentos/departamentos_lista.vue'),
      meta: {
        breadcrumb: 'Departamentos',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/departamentos/registrar/',
      name: 'departamentos_registrar',
      component: () => import('../views/departamentos/departamentos_registrar.vue'),
      meta: {
        breadcrumb: 'Departamentos',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/departamentos/editar/:id',
      name: 'departamentos_editar',
      component: () => import('../views/departamentos/departamentos_editar.vue'),
      meta: {
        breadcrumb: 'Editar Departamento',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/consulta',
      name: 'consulta',
      component: consulta,
      meta: {
        breadcrumb: 'Consulta',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        breadcrumb: 'Dashboard',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: reportes,
      meta: {
        breadcrumb: 'Reportes',
        requiresAuth: true,
        authLevel: 3
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/admin/usuarios_lista.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true,
        authLevel: 4
      }
    },
    {
      path: '/usuarios/historial/',
      name: 'usuarios_historial',
      component: () => import('../views/admin/usuarios_historial.vue'),
      meta: {
        breadcrumb: 'Historial',
        requiresAuth: true,
        authLevel: 4
      }
    },
    {
      path: '/usuarios/registrar/',
      name: 'usuarios_registrar',
      component: () => import('../views/admin/usuarios_registrar.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true,
        authLevel: 4
      }
    },
    {
      path: '/usuarios/editar/:id',
      name: 'usuarios_editar',
      component: () => import('../views/admin/usuarios_editar.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true,
        authLevel: 4
      }
    },
    {
      path: '/respaldos',
      name: 'respaldos',
      component: () => import('../views/admin/respaldo.vue'),
      meta: {
        breadcrumb: 'Respaldos',
        requiresAuth: true,
        authLevel: 4
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue'),
      meta: {
        breadcrumb: '404',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
      meta: {
        breadcrumb: 'Iniciar sesión',
        requiresAuth: false
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/auth/register.vue'),
      meta: {
        breadcrumb: 'Registro',
        requiresAuth: false
      }
    },
    {
      path: '/restablecer-contrasena',
      name: 'restablecer-contrasena',
      component: () => import('../views/auth/reset.vue'),
      meta: {
        breadcrumb: 'Restablecer contraseña',
        requiresAuth: false
      }
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('../views/home.vue'),
      meta: {
        breadcrumb: 'Inicio',
        requiresAuth: true,
        authLevel: 1
      }
    },
    {
      path: '/opciones',
      name: 'opciones',
      component: () => import('../views/usuarios/opciones.vue'),
      meta: {
        breadcrumb: 'Opciones',
        requiresAuth: true,
        authLevel: 1
      }
    }
  ]
})

export default router
