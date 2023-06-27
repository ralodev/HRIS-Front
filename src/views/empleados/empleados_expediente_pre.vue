<template>
  <!-- Puestos -->
  <div class="container-lg text-center pt-4 my-3">

    <div class="grid">
      <div class="col-12 md:col-6 lg:col-6 col-offset-0 md:col-offset-3 lg:col-offset-3">
        <div class="card border-round-2xl mt-5 pb-3 flex-wrap">

          <div class="text-3xl text-nowrap flex-wrap text-center vertical-align-middle text-color font-medium">
            <p class="text-5xl">
              Espere un momento
            </p>

            <div class="spinner-border text-color text-2xl" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import { useStore as usePlazaStore } from '@/stores/plazaStore';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import { useStore as useEmpleadoStore } from '@/stores/empleadoStore';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'seleccionar_empleado',
  setup() {
    const empleadoStore = useEmpleadoStore();
    const alertas = useAlerts();
    const router = useRouter();
    const route = useRoute();
    const data = ref({});

    const getData = async () => {
      let email = Cookies.get('email');
      setTimeout(() => {

        empleadoStore.getEmpleadoByEmail(email).then(() => {
          data.value = empleadoStore.data;

          if (data.value.id == null) {
            alertas.showErrorAlert('Error', 'No pudimos encontrarte en la base de datos, probablemente sea un problema con tu correo electrónico, por favor acude a la oficina de recursos humanos.');
            return;
          } else {
            alertas.showSuccessToast('Te encontramos! redirigiendo...');
            setTimeout(() => {
              router.push({ name: 'empleados_expediente', params: { id: data.value.id } });
            }, 2000);
          }
        })
      }, 300);
    };

    onMounted(() => {
      getData();
    });

    return {
      data,
    };
  },
});
</script>

<style></style>
