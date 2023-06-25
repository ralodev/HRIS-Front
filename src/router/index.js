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
        requiresAuth: true
      }
    },
    {
      path: '/empleados/editar/:id',
      name: 'empleados_editar',
      component: () => import('../views/empleados/empleados_editar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/empleados/registrar/',
      name: 'empleados_registrar',
      component: () => import('../views/empleados/empleados_registrar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/empleados/empleados_historial/:id',
      name: 'empleados_historial',
      component: () => import('../views/empleados/empleados_historial.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/plazas',
      name: 'plazas',
      component: () => import('../views/plazas/plazas_lista.vue'),
      meta: {
        breadcrumb: 'Puestos',
        requiresAuth: true
      }
    },
    {
      path: '/plazas/editar/:id',
      name: 'plazas_editar',
      component: () => import('../views/plazas/plazas_editar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/plazas/seleccionar-empleado/',
      name: 'seleccionar_empleado',
      component: () => import('../views/plazas/plazas_seleccionar_empleado.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/plazas/registrar/:id',
      name: 'plazas_registrar',
      component: () => import('../views/plazas/plazas_registrar.vue'),
      meta: {
        breadcrumb: 'Editar Empleado',
        requiresAuth: true
      }
    },
    {
      path: '/departamentos',
      name: 'departamentos',
      component: () => import('../views/departamentos/departamentos_lista.vue'),
      meta: {
        breadcrumb: 'Departamentos',
        requiresAuth: true
      }
    },
    {
      path: '/departamentos/editar/:id',
      name: 'departamentos_editar',
      component: () => import('../views/departamentos/departamentos_editar.vue'),
      meta: {
        breadcrumb: 'Editar Departamento',
        requiresAuth: true
      }
    },
    {
      path: '/consulta',
      name: 'consulta',
      component: consulta,
      meta: {
        breadcrumb: 'Consulta',
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        breadcrumb: 'Dashboard',
        requiresAuth: true
      }
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: reportes,
      meta: {
        breadcrumb: 'Reportes',
        requiresAuth: true
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/admin/usuarios_lista.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true
      }
    },
    {
      path: '/usuarios/historial/',
      name: 'usuarios_historial',
      component: () => import('../views/admin/usuarios_historial.vue'),
      meta: {
        breadcrumb: 'Historial',
        requiresAuth: true
      }
    },
    {
      path: '/usuarios/registrar/',
      name: 'usuarios_registrar',
      component: () => import('../views/admin/usuarios_registrar.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true
      }
    },
    {
      path: '/usuarios/editar/:id',
      name: 'usuarios_editar',
      component: () => import('../views/admin/usuarios_editar.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: true
      }
    },
    {
      path: '/respaldos',
      name: 'respaldos',
      component: () => import('../views/admin/respaldo.vue'),
      meta: {
        breadcrumb: 'Respaldos',
        requiresAuth: true
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
      name: 'Iniciar sesión',
      component: () => import('../views/auth/login.vue'),
      meta: {
        breadcrumb: 'Iniciar sesión',
        requiresAuth: false
      }
    },
    {
      path: '/restablecer-contrasena',
      name: 'Restablecer contraseña',
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
        requiresAuth: true
      }
    },
    {
      path: '/opciones',
      name: 'opciones',
      component: () => import('../views/usuarios/opciones.vue'),
      meta: {
        breadcrumb: 'Opciones',
        requiresAuth: true
      }
    }
  ]
})

export default router
