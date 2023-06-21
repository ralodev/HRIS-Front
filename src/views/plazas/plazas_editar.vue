<template>
  <plaza-form :isEdit="true" id=id />
</template>

<script>
import PlazaForm from '@/components/plazaForm.vue';
import { useRoute } from 'vue-router';

export default {
name: "editarPlaza",
components: {
  PlazaForm,
},
  setup() {
      const isEdit = true;
      const route = useRoute();
      const id = route.params.id;

      return {
      isEdit,
      id,
      };
  },
};
</script>