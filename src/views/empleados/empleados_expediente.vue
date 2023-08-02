<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">
      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-journal-text fw-bold text-color h1 my-0"></i>
          <span class="fw-bold text-color h4 align-self-center ms-3 my-0"> Expediente </span>
        </span>
        <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
          class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px"> </Button>
      </div>
      <div class="card-body table-responsive">

        <div class="grid" v-if="data">
          <table class="table table-hover text-color">
            <thead>
              <tr>
                <th colspan="2">
                  <div class="w-100 text-xl text-center">DATOS PERSONALES</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="atributo in ordenAtributosPersonales" :key="atributo">
                <td class="font-bold w-1 text-nowrap" style="text-transform: uppercase;">{{ formatearAtributo(atributo) }}</td>
                <td class="font-medium">{{ data[atributo] }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-hover table-responsive text-color">
            <thead>
              <tr>
                <th colspan="2 text-center">
                  <div class="w-100 text-xl text-center">DATOS LABORALES</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="atributo in ordenAtributosTrabajador" :key="atributo">
                <td class="font-bold w-1 text-nowrap" style="text-transform: uppercase;">{{ formatearAtributo(atributo) }}</td>
                <td class="font-medium">{{ data[atributo] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p class="text-4xl">No hay versiones anteriores</p>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <Button icon="pi pi-times" class="ms-2" severity="secondary" label="Volver" @click="goBack" />
      </div>
    </div>
    <div class="card mt-5 border-round-2xl overflow-hidden shadow-5">
      <Panel header="Historial de plazas" class="text-xl" toggleable>
        <div class="container table-responsive text-base">
          <div v-for="plaza in dataHistorial" :key="plaza.id" class="uppercase mb-5">
            <h3>{{ plaza.tipoDePlaza.split("(")[0] }} DE {{ plaza.fechaDeInicio.split("-")[0] }} A {{ plaza.fechaDeFin.split("-")[0] }}</h3>
            <table class="table table-hover text-color">
              <thead>
                <tr>
                  <th colspan="2 text-center">
                    <div class="w-100 text-xl text-center">DATOS DE LA PLAZA</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in plaza" :key="key">
                  <td class="font-bold w-1 text-nowrap">{{ formatearAtributo(key) }}</td>
                  <td class="font-medium">{{ value }}</td>
                </tr>
              </tbody>
            </table>
            <hr class="border-5 my-5"/>
          </div>
        </div>
      </Panel>
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
    const plazaStore = usePlazaStore();
    const empleadoRFC = ref('');
    const empleadoStore = useEmpleadoStore();
    const alertas = useAlerts();
    const canGoBack = ref(false);
    const router = useRouter();
    const route = useRoute();
    const idEmpleado = ref(route.params.id);
    const data = ref({});
    const dataHistorial = ref([]);
    const ordenAtributosPersonales = ['nombre', 'rfc', 'curp', 'fechaDeNacimiento', 'edad', 'sexo', 'nivelAcademico', 'profesion', 'discapacidades', 'lenguas']
    const ordenAtributosTrabajador = ['numeroDeTarjeta', 'estado', 'fechaDeIngreso', 'fechaDeBaja', 'motivoDeBaja', 'tipoDeMovimiento', 'departamento', 'fechaDeNacimiento', 'edad', 'sexo', 'correoInstitucional']

    const getData = async () => {
      var done = false;

      alertas.showLoading('Cargando datos');
      setTimeout(() => {
        if (!done) {
          alertas.closeLoading();
          alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
      }, 5000);

      empleadoStore.getEmpleadoById(idEmpleado.value).then((res) => {
        if(res.status == 200){
        data.value = empleadoStore.data;
        data.value.fechaDeBaja = data.value.fechaBaja;
        data.value.motivoDeBaja = data.value.motivoBaja;
        data.value.fechaDeIngreso = data.value.fechaIngreso;
        data.value.numeroDeTarjeta = data.value.numeroTarjeta;
        data.value.tipoDeMovimiento = data.value.tipoMovimiento;
        data.value.departamento = data.value.departamento.nombre;
        data.value.fechaDeNacimiento = data.value.fechaNacimiento;
        delete data.value.id;
        delete data.value.fechaBaja;
        delete data.value.motivoBaja;
        delete data.value.comentarios;
        delete data.value.fechaIngreso;
        delete data.value.numeroTarjeta;
        delete data.value.tipoMovimiento;
        delete data.value.fechaNacimiento;

        data.value.lenguas = data.value.lenguas
          .map((lengua) => {
            return lengua.nombre;
          })
          .join(', ');
        data.value.discapacidades = data.value.discapacidades
          .map((discapacidad) => {
            return discapacidad.nombre;
          })
          .join(', ');
        console.log(data.value);

        plazaStore.getHistorialByRfc(data.value.rfc).then(() => {
          dataHistorial.value = plazaStore.data;
          console.log(dataHistorial.value);
          dataHistorial.value.forEach((element) => {
            element.tipoDePlaza = element.tipoPlaza;
            element.fechaDeInicio = element.fechaInicio;
            element.fechaDeFin = element.fechaFin;
            element.tiempoDeServicio = obtenerTiempoServicio(element.fechaDeInicio, element.fechaDeFin);
            delete element.empleado;
            delete element.id;
            delete element.tipoPlaza;
            delete element.fechaInicio;
            delete element.fechaFin;
          });
          console.log(dataHistorial.value);
        });

      }else{
        alertas.showErrorAlert('Error', res.response.data);
      }
      })

      done = true;
      alertas.closeLoading();

    };

    const obtenerTiempoServicio = (fechaInicio, fechaFin) => {
      fechaInicio = new Date(fechaInicio);
      fechaFin = new Date(fechaFin);
      var diff = fechaFin.getTime() - fechaInicio.getTime();
      var anios = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      diff -= anios * (1000 * 60 * 60 * 24 * 365.25);
      var meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
      diff -= meses * (1000 * 60 * 60 * 24 * 30.4375);
      var dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= dias * (1000 * 60 * 60 * 24);

      if (anios > 0) {
        return anios + ' años, ' + meses + ' meses, ' + dias + ' días';
      } else if (meses > 0) {
        return meses + ' meses, ' + dias + ' días';
      } else {
        return dias + ' días';
      }
    };

    onMounted(() => {
      idEmpleado.value = route.params.id;
      getData();
      canGoBack.value = Cookies.get('rol') != '[ROLE_EMPLEADO]'
    });

    return {
      data,
      dataHistorial,
      ordenAtributosPersonales,
      ordenAtributosTrabajador,
      canGoBack,
      goBack: () => {
        if (canGoBack.value)
        router.go(-1);
        else
        router.push({ name: 'inicio' });
      },
    };
  },
  methods: {
    formatearAtributo(atributo) {
      // Lógica para convertir el nombre del atributo en el formato deseado
      const palabras = atributo.split(/(?=[A-Z])/);
      const atributoFormateado = palabras.join(' ');

      return atributoFormateado.charAt(0).toUpperCase() + atributoFormateado.slice(1);
    }
  }
});
</script>

<style>

</style>
