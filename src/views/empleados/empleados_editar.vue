<template>
  <empleado-form :isEdit="true" />
</template>

<script>
  import EmpleadoForm from '@/components/empleadoForm.vue';

  export default {
    name: 'empleados_editar',
    components: {
      EmpleadoForm,
    },
  };
</script>
