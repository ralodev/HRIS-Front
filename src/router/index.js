import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import empleados from '../views/empleados/empleados.vue'
import editarEmpleados from '../views/empleados/editar-empleado.vue'
import VerDepartamentos from '../views/VerDepartamentos.vue'
import VerPlazas from '../views/VerPlazas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: empleados
    },
    {
      path: '/editar-empleados',
      name: 'editarEmpleados',
      component: editarEmpleados
    },
    {
      path: '/verDepartamentos',
      name: 'verDepartamentos',
      component: VerDepartamentos
    },
    {
      path: '/verPlazas',
      name: 'verPlazas',
      component: VerPlazas
    }
  ]
})

export default router
