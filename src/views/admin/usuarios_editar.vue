<template>
    <empleado-form :isEdit="true"/>
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
