import { createRouter, createWebHistory } from 'vue-router'
import empleados from '../views/empleados/empleados.vue'
import editarEmpleado from '../views/empleados/editarEmpleado.vue'
import departamentos from '../views/departamentos/departamentos.vue'
import editarDepartamento from '../views/departamentos/editarDepartamento.vue'
import puestos from '../views/puestos/puestos.vue'
import editarPuesto from '../views/puestos/editarPuesto.vue'
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
      name: 'editarEmpleado',
      component: editarEmpleado,
      meta: {
        breadcrumb: 'Editar Empleado'
      }
    },
    {
      path: '/puestos',
      name: 'puestos',
      component: puestos,
      meta: {
        breadcrumb: 'Puestos'
      }
    },
    {
      path: '/puestos/editar/:id',
      name: 'editarPuesto',
      component: editarPuesto,
      meta: {
        breadcrumb: 'Editar Empleado'
      }
    },
    {
      path: '/departamentos',
      name: 'departamentos',
      component: departamentos,
      meta: {
        breadcrumb: 'Departamentos'
      }
    },
    {
      path: '/departamentos/editar/:id',
      name: 'editarDepartamento',
      component: editarDepartamento,
      meta: {
        breadcrumb: 'Editar Departamento'
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
