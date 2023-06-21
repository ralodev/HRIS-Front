<template>
    <plaza-form :isEdit="false" id=id />
</template>

<script>
import PlazaForm from '@/components/plazaForm.vue';
import { useRoute } from 'vue-router';

export default {
  name: "empleados_editar",
  components: {
    PlazaForm,
  },
    setup() {
        const isEdit = false;
        const route = useRoute();
        const id = route.params.id;

        return {
        isEdit,
        id,
        };
    },
};
</script>