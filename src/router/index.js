import { createRouter, createWebHistory } from 'vue-router'
import empleados from '../views/empleados/empleados.vue'
import editarEmpleados from '../views/empleados/editar-empleado.vue'
import VerDepartamentos from '../views/VerDepartamentos.vue'
import VerPlazas from '../views/VerPlazas.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        breadcrumb: 'Principal'
      }
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: empleados,
      meta: {
        breadcrumb: 'Empleados'
      }
    },
    {
      path: '/empleados/editar/:id',
      name: 'editar-empleado',
      component: editarEmpleados,
      meta: {
        breadcrumb: 'Editar Empleado'
      }
    },
    {
      path: '/verDepartamentos',
      name: 'verDepartamentos',
      component: VerDepartamentos,
      meta: {
        breadcrumb: 'Departamentos'
      }
    },
    {
      path: '/verPlazas',
      name: 'verPlazas',
      component: VerPlazas,
      meta: {
        breadcrumb: 'Plazas'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

export default router
