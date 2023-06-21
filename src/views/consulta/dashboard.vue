<template>
    <!-- Dashboard -->
    <div class="container-lg p-4">
        <!-- Title -->

        <div class="grid">
            <!-- Boxes with count of employees by gender -->
            <div class="col-6 md:col-4 sm:col-4">
                <div class="card surface-section shadow-4 p-3 text-center">
                    <div class="text-900 h4 font-medium text-center">Número de empleados</div>
                    <i class="bi bi-people-fill" style="
                        font-size: 50px;
                        color: #0079AF;
                        margin: 0 auto;
                        display: block;
                    "> 456</i>
                </div>
            </div>
            <div class="col-6 md:col-4 sm:col-4">
                <div class="card surface-section shadow-4 p-3 text-center">
                    <div class="text-900 h4 font-medium text-center">Número de plazas</div>
                    <i class="bi bi-briefcase-fill" style="
                        font-size: 50px;
                        color: #0079AF;
                        margin: 0 auto;
                        display: block;
                    "> 504</i>
                </div>
            </div>
            <div class="col-6 md:col-4 sm:col-4 d-none d-md-block">
                <div class="card surface-section shadow-4 p-3 text-center">
                    <div class="text-900 h4 font-medium text-center">Número de usuarios</div>
                    <i class="bi bi-person-fill-check" style="
                        font-size: 50px;
                        color: #0079AF;
                        margin: 0 auto;
                        display: block;
                    "> 1</i>
                </div>
            </div>
            <div class="col-12 md:col-5 lg:col-4">
                <div class="card surface-section shadow-4 p-3 h-100">
                    <div class="text-900 text-xl mb-3 font-medium text-center">Empleados por sexo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <PieChart :chartData="sexo" :options="options" :height='200' />
                </div>
            </div>
            <div class="col-12 md:col-5 lg:col-4">
                <div class="card surface-section shadow-4 p-3 h-100">
                    <div class="text-900 text-xl mb-3 font-medium text-center">Empleados por tiempo de dedicación</div>
                    <DoughnutChart :chartData="edadSexo" :options="options" :height='200' />
                </div>
            </div>
            <div class="col-12 md:col-5 lg:col-4">
                <div class="card surface-section shadow-4 p-3 h-100">
                    <div class="text-900 text-xl mb-3 font-medium text-center">Empleados por tipo de nombramiento</div>
                    <DoughnutChart :chartData="docentesAdmin" :options="options" :height='200' />
                </div>
            </div>
            <div class="col-12 md:col-8 lg:col-6">
                <div class="card surface-section shadow-4 p-3">
                    <div class="text-900 text-xl mb-3 font-medium text-center">Empleados por nivel academico</div>
                    <BarChart :chartData="nivelAcademico" :options="options" :height='400' />
                </div>
            </div>
            <div class="col-12 md:col-8 lg:col-6">
                <div class="card surface-section shadow-4 p-3">
                    <div class="text-900 text-xl mb-3 font-medium text-center">Personal por funciones</div>
                    <BarChart :chartData="personal" :options="options" :height='400' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import { useStore } from '@/stores/dashboardStore';
import { BarChart, DoughnutChart, PieChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { XdataPersonal, XdataDocenteEstudios, XdataDocenteTiempo, XdataDocenteTiempoEstudiosTitulo, XdataDocenteTiempoEstudiosSinTitulo, XdataDocenteEdadSexo, XdataDocenteAntiguedadSexo, XcolumnsPersonal, XcolumnsDocenteEstudios, XcolumnsDocenteTiempo, XcolumnsDocenteTiempoEstudios, XcolumnsDocenteEdadSexo, XcolumnsDocenteAntiguedadSexo } from '@/assets/js/repData.js';
Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart, PieChart, BarChart, LineChart },
  setup() {
    const store = useStore();
    const data = ref([]);
    const alertas = useAlerts();
    const nivelAcademico = ref([]);
    const edadSexo = ref([]);
    const personal = ref([]);
    const sexo = ref([]);
    const docentesAdmin = ref([]);
    const testData = {
      labels: ['Tiempo completo', '3/4 de tiempo', 'Medio tiempo', 'Horas de asignatura'],
      datasets: [
        {
          data: [30, 40, 60, 70],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4'],
        },
      ],
    };
    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
        title: {
          display: false,
          text: 'Empleados por tiempo de trabajo',
        },
      },
    });

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      var done = false;
      alertas.showLoading('Cargando datos');
      setTimeout(() => {
        if (!done) {
          alertas.closeLoading();
          //alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
      }, 5000);
      setNivelAcademico();
        setSexo();
        setPersonal();
        setEdadSexo();
        setDocentesAdmin();
      await store.getData().then(() => {
        //Set local copy of data
        data.value = store.data;
        //Set data for chart

        console.log('👹',nivelAcademico.value);
        alertas.closeLoading();
        done = true;
      }).catch((error) => {
        if (error.code === "ERR_NETWORK") {
          //alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
        } else {
          //alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
        }
        alertas.closeLoading();
        done = true;
      });
    };

    const setNivelAcademico = () => {
        let temporal = XdataDocenteEstudios;
        let labels = [];
        let hombres = [];
        let mujeres = [];
        let data = [];

        temporal.forEach((element) => {
          if (element.total == '0' || element.nombre == 'Total') {
            return;
          }
          hombres.push(element.hombres);
          mujeres.push(element.mujeres);
          data.push(element.total);
          if (!labels.includes(element.nombre)) {
            // push element.nombre but if its too long, cut it
            labels.push(element.nombre.length > 20 ? element.nombre.substring(0, 30) + '...' : element.nombre);
          }
        });

        nivelAcademico.value = {
          labels: labels,
          datasets: [
            {
              label: 'Hombres',
              data: hombres,
              backgroundColor: '#77CEFF',
            },
            {
              label: 'Mujeres',
              data: mujeres,
              backgroundColor: '#0079AF',
            },
          ],
        };
    };

    const setPersonal = () => {
        let temporal = XdataPersonal;
        let labels = [];
        let hombres = [];
        let mujeres = [];
        let data = [];

        temporal.forEach((element) => {
          if (element.total == '0' || element.nombre == 'Total de personal') {
            return;
          }
          hombres.push(element.hombres);
          mujeres.push(element.mujeres);
          data.push(element.total);
          if (!labels.includes(element.nombre)) {
            // push element.nombre but if its too long, cut it
            labels.push(element.nombre.length > 20 ? element.nombre.substring(0, 30) + '...' : element.nombre);
          }
        });
        console.log('👹',temporal);
        personal.value = {
          labels: labels,
          datasets: [
            {
              label: 'Hombres',
              data: hombres,
              backgroundColor: '#77CEFF',
            },
            {
              label: 'Mujeres',
              data: mujeres,
              backgroundColor: '#0079AF',
            },
            {
              label: 'Total',
              data: data,
              backgroundColor: '#123E6B',
            },
          ],
        };
        console.log('👹',personal.value);
    };

    const setEdadSexo = () => {
      let temporal = XdataDocenteTiempo;
        let labels = ['Tiempo completo', '3/4 de tiempo', 'Medio tiempo', 'Horas de asignatura']
        let data = [];

        temporal.forEach((element) => {
          if (element.total == '0' || element.nombre == 'Total') {
            return;
          }
          data.push(element.total);
        });

        edadSexo.value = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#77CEFF', '#0079AF'],
            },
          ],
        };
        sexo.value.total = data.reduce((a, b) => a + b, 0);
    };

    const setDocentesAdmin = () => {
      let temporal = XdataPersonal;
        let labels = ['Docentes', 'Administrativos']
        let data = [0,0];

        temporal.forEach((element) => {
          if (element.total == '0' || element.nombre == 'Total') {
            return;
          }
          // if temporal.nombre includes 'Docente' then add to docentes
          if (element.nombre.includes('Docente')) {
            data[0] += parseInt(element.total);
          } else {
            data[1] += parseInt(element.total);
          }

        });

        docentesAdmin.value = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#77CEFF', '#0079AF'],
            },
          ],
        };
        sexo.value.total = data.reduce((a, b) => a + b, 0);
    };

    const setSexo = () => {
        let temporal = XdataDocenteEdadSexo;
        let labels = [];
        let data = [0,0]; // [hombres, mujeres]

        temporal.forEach((element) => {
          if (element.total == '0' || element.nombre == 'Total') {
            return;
          }
          data[0] += parseInt(element.hombres);
          data[1] += parseInt(element.mujeres);
        });

        sexo.value = {
          labels: ['Hombres', 'Mujeres'],
          datasets: [
            {
              data: data,
              backgroundColor: ['#77CEFF', '#0079AF'],
            },
          ],
        };
        sexo.value.total = data.reduce((a, b) => a + b, 0);
    };

    return {
        testData,
        options,
        nivelAcademico,
        sexo,
        personal,
        edadSexo,
        docentesAdmin,
     };
  },
});
</script>

<style></style>