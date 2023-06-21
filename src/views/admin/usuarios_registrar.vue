<template>
    <empleado-form :isEdit="false"/>
</template>

<script>
import EmpleadoForm from '@/components/usuarioForm.vue';

export default {
  name: "empleados_editar",
  components: {
    EmpleadoForm,
  },
};
</script>
