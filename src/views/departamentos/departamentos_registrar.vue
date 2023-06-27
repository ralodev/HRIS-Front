<template>
    <departamento-form :isEdit="false"/>
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
