<template>
  <empleado-form :isEdit="isEdit" />
</template>

<script>
  import EmpleadoForm from '@/components/empleadoForm.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'empleados_registrar',
    components: {
      EmpleadoForm,
    },
    setup() {
      const isEdit = false;

      return {
        isEdit,
      };
    },
  });
</script>
