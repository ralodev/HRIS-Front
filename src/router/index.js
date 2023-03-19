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
      component: Home
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: empleados
    },
    {
      path: '/editar-empleado/:id',
      name: 'editar-empleado',
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
