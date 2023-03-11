<template>
    <main>
        Lorem, ipsum.
        {{ empleados }}
    </main>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useEmpleadoStore } from '@/stores/empleadoStore'
export default defineComponent({
    data() {
        return {
            empleados: []
        }
    },
    setup() {
        const empleadoStore = useEmpleadoStore()

        onMounted(() => {
            empleadoStore.getEmpleados();
        })

        return {
            empleados: empleadoStore.empleados
        }
    }
})
</script>
