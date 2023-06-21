<template>
    <departamento-form :isEdit="true"/>
</template>

<script>
import DepartamentoForm from '@/components/departamentoForm.vue';

export default {
  name: "departamentos_editar",
  components: {
    DepartamentoForm,
  },
};
</script>
