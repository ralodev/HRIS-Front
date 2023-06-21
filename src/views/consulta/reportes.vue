<template>
  <!-- Ask to turn to landscape -->
  <div class="container d-block d-md-none text-center bg-surface-100 mt-5" style="width:350px;">
    <div class="text-blue-900 font-bold text-5xl">Oops!</div>
    <div class="text-900 font-bold text-3xl">Gira tu dispositivo</div>
    <div class="container d-flex justify-content-center my-3">
      <div class="phone">
        <div class="screen"></div>
      </div>
    </div>
    <div class="text-900 font-semibold text-muted">Debido a la gran cantidad de datos, esta página solo puede visualizarse
      en pantallas grandes, gira tu dispositivo o cambia el tamaño de la ventana :)</div>
  </div>
  <!-- Dashboard -->
  <div class="container-lg p-4 d-none d-md-block" id="911Content">
    <!-- Title -->
    <div class="d-block">
      <Button type="button" label="Exportar" icon="pi pi-download" @click="exportar" class="float-end" raised :loading="exportando" />
    </div>
    <div class="pb-3 toExport">
      <div class="text-900 font-bold text-5xl">Reporte 911.9</div>
    </div>

    <!-- Sección 1 -->
    <div class="card surface-section shadow-4 table-responsive">
      <!-- ///// SECCIÓN 1 ///// -->
      <div class="py-3 text-center bg-primary-800 text-white"
        style="border-top-left-radius: .4rem; border-top-right-radius: 0.4rem;">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal de la institución</span>
      </div>
      <div class="card-body toExport">
        <p><span class="fw-bold">1. </span>De acuerdo con la función que desempeña el personal que
          labora en la faculta o
          escuela, es decir, que pertenezcan a la estructura orgánica y operativo de la escuela, desglóselos por sexo, con
          discapacidad y hablantes de lengua indígena</p>
        <p><span class="fw-bold">Nota: </span>Si una persona desempeña dos o más funciones, anótela en la que
          dedique más tiempo. Registre a todas las personas que laboran en la facultad o escuela incluido el subcontratado
          por terceros, asegúrese de que los datos no se dupliquen.</p>
        <!-- Tabla 1 -->
        <DataTable :columns="columnsPersonal" :data="dataPersonal" class="px-3 reporte hover compact stripe p-skeleton"
          :options="options" />
      </div>

      <!-- ///// SECCIÓN 2 ///// -->
      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por nivel de estudios</span>
      </div>

      <div class="card-body toExport">
        <p><span class="fw-bold">2. </span>Del total personal docente, docente investigador y
          docente-auxiliar de investigador que laboran en la facultad o escuela, desglose por nivel de estudios, sexo, con
          discapacidad y hablantes de lengua indígena.</p>
        <!-- Tabla 2 -->
        <DataTable :columns="columnsDocenteEstudios" :data="dataDocenteEstudios"
          class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options" />
        <small>* Incluye técnico superior universitario, profesional asociado y licencia profesional.</small>
      </div>

      <!-- ///// SECCIÓN 3 ///// -->
      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por tiempo de dedicación</span>
      </div>

      <div class="card-body toExport">
        <p><span class="fw-bold">3. </span>Desglose al total del personal docente sin importar la
          modalidad que imparta por tiempo de dedicación, sexo y con discapacidad (considere al personal docente,
          docente-investigador y docente-auxiliar de investigador); así como si son titulados o no titulados por nivel de
          estudios.</p>
        <p><span class="fw-bold">Nota: </span>Contabilice sólo una vez a cada docente.</p>
        <!-- Tabla 3 -->
        <DataTable :columns="columnsDocenteTiempo" :data="dataDocenteTiempo"
          class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options" />
      </div>

      <!-- ///// SECCIÓN 3.1 ///// -->
      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por nivel de estudios con
          título/grado</span>
      </div>

      <div class="card-body toExport">
        <!-- Tabla 3.1 -->
        <DataTable class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options"
          :data="dataDocenteTiempoEstudiosTitulo" :columns="columnsDocenteTiempoEstudios" />
      </div>

      <!-- ///// SECCIÓN 3.2 ///// -->

      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por nivel de estudios sin
          título/grado</span>
      </div>
      <div class="card-body toExport">
        <!-- Tabla 3.2 -->
        <DataTable class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options"
          :data="dataDocenteTiempoEstudiosSinTitulo" :columns="columnsDocenteTiempoEstudios" />
      </div>

      <!-- ///// SECCIÓN 4 ///// -->

      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por nivel que imparten</span>
      </div>
      <div class="card-body toExport">
        <p><span class="fw-bold">4. </span>Total de personal docente, docente investigador, docente-auxiliar de
          investigador sin importar la modalidad por nivel de estudios, de acuerdo con el nivel que imparten.</p>
        <p><span class="fw-bold">Nota: </span>Repórtelos en tantos niveles como imparta.</p>
        <!-- Tabla 5 -->
        <DataTable class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options"
          :data="dataDocenteEdadSexo" :columns="columnsDocenteEdadSexo" />
      </div>

      <!-- ///// SECCIÓN 5 ///// -->

      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por grupo de edad y sexo</span>
      </div>
      <div class="card-body toExport">
        <p><span class="fw-bold">5. </span>Total de personal docente, docente investigador, docente-auxiliar de
          investigador que laboran en la facultad o escuela por grupo de edad y sexo.</p>
        <!-- Tabla 5 -->
        <DataTable class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options"
          :data="dataDocenteEdadSexo" :columns="columnsDocenteEdadSexo" />
      </div>

      <!-- ///// SECCIÓN 6 ///// -->

      <div class="py-3 text-center bg-primary-800 text-white mt-5">
        <span class="fw-bold h5" style="text-transform:uppercase">Personal docente por grupo de antigüedad y sexo</span>
      </div>
      <div class="card-body toExport">
        <p><span class="fw-bold">6. </span>Total de personal docente, docente investigador, docente-auxiliar de
          investigador que laboran en la facultad o escuela por rango de antigüedad y sexo.</p>
        <!-- Tabla 6 -->
        <DataTable class="px-3 reporte hover compact stripe p-skeleton" width="100%" :options="options"
          :data="dataDocenteAntiguedadSexo" :columns="columnsDocenteAntiguedadSexo" />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import Buttons from 'datatables.net-buttons';
import Responsive from 'datatables.net-responsive';
//import pdfMake, { NONE } from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//import print from 'datatables.net-buttons/js/buttons.print';
import { useDataStore } from '@/stores/dataStore';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'
import { XdataPersonal, XdataDocenteEstudios, XdataDocenteTiempo, XdataDocenteTiempoEstudiosTitulo, XdataDocenteTiempoEstudiosSinTitulo, XdataDocenteEdadSexo, XdataDocenteAntiguedadSexo, XcolumnsPersonal, XcolumnsDocenteEstudios, XcolumnsDocenteTiempo, XcolumnsDocenteTiempoEstudios, XcolumnsDocenteEdadSexo, XcolumnsDocenteAntiguedadSexo } from '@/assets/js/repData.js';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';



//pdfMake.vfs = pdfFonts.pdfMake.vfs;
//DataTablesCore.Buttons.jszip(JsZip);
DataTable.use(DataTablesCore, Buttons, /*pdfMake, JsZip, print,*/neutralise, Responsive);

export default defineComponent({
  name: 'TablaDepartamentos',
  components: { DataTable },
  setup() {
    const contentLoaded = ref(false);
    const store = useDataStore();
    const alertas = useAlerts();
    const router = useRouter();
    const route = useRoute();
    const pdf = ref(null);
    const exportando = ref(false);

    //Table options
    const options = {
      dom: 'tr',
      language: spanish,
      paging: false,
      ordering: false,
      info: false,
    };
    //Table data
    const dataPersonal = ref(XdataPersonal);
    const dataDocenteEstudios = ref(XdataDocenteEstudios);
    const dataDocenteTiempo = ref(XdataDocenteTiempo);
    const dataDocenteTiempoEstudiosTitulo = ref(XdataDocenteTiempoEstudiosTitulo);
    const dataDocenteTiempoEstudiosSinTitulo = ref(XdataDocenteTiempoEstudiosSinTitulo);
    const dataDocenteEdadSexo = ref(XdataDocenteEdadSexo);
    const dataDocenteAntiguedadSexo = ref(XdataDocenteAntiguedadSexo);
    //Column data
    const columnsPersonal = ref(XcolumnsPersonal);
    const columnsDocenteEstudios = ref(XcolumnsDocenteEstudios);
    const columnsDocenteTiempo = ref(XcolumnsDocenteTiempo);
    const columnsDocenteTiempoEstudios = ref(XcolumnsDocenteTiempoEstudios);
    const columnsDocenteEdadSexo = ref(XcolumnsDocenteEdadSexo);
    const columnsDocenteAntiguedadSexo = ref(XcolumnsDocenteAntiguedadSexo);

    onMounted(() => {
      nextTick(() => {
        pdf.value = new jsPDF();
        document.querySelectorAll('tbody tr:last-child').forEach((el) => {
          el.classList.add('last-row');
        });
      });

      alertas.showLoadingToast('Cargando datos...');

      let randtime = 1000 + Math.random() * (3000);
      console.log("🚀 ~ file: reportes.vue:200 ~ onMounted ~ randtime:", randtime)
      setTimeout(() => {
        alertas.closeLoading();
        document.querySelectorAll('.opacity-0').forEach((el) => {
          el.classList.remove('opacity-0');
        });
        document.querySelectorAll('.p-skeleton').forEach((el) => {
          el.classList.remove('p-skeleton');
        });
      }, randtime);

    });

    const exportar = () => {
      exportando.value = true;
      // Obtener los elementos deseados por la clase
      const content = document.querySelectorAll('.toExport');

      // Crear un objeto options para html2pdf
      const options = {
        margin: 10,
        filename: 'reporte.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all', avoid: '.avoid-pagebreak' },
      };

      // Crear un elemento html contenedor del contenido a exportar
      const container = document.createElement('div');
      content.forEach(el => container.appendChild(el.cloneNode(true)));

      // Utilizar html2pdf para crear el PDF y descargarlo
      html2pdf().from(container).set(options).save().then(() => {
        exportando.value = false;
        console.log('PDF creado');
      });
    }

    return {
      columnsPersonal,
      columnsDocenteEstudios,
      columnsDocenteTiempo,
      dataPersonal,
      dataDocenteEstudios,
      dataDocenteTiempo,
      dataDocenteEdadSexo,
      dataDocenteAntiguedadSexo,
      dataDocenteTiempoEstudiosTitulo,
      dataDocenteTiempoEstudiosSinTitulo,
      columnsDocenteTiempoEstudios,
      columnsDocenteEdadSexo,
      columnsDocenteAntiguedadSexo,
      options,
      columns: null,
      data: null,
      contentLoaded,
      exportar,
      exportando
    };
  },
});
</script>

<style>
table.reporte {
  border-bottom: none !important;
}

.last-row td {
  border-top: 1px solid #949494 !important;
  font-weight: 700;
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

/* font appropiate for numbers*/
table.reporte td.no-sort.text-center {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5rem;
  text-align: end !important;
  padding-right: 2rem !important;
}

.roman-number {
  font-family: 'Times New Roman', Times, serif;
  font-weight: 600;
}

.phone {
  position: relative;
  height: 200px;
  width: 100px;
  border: 3px solid #204887;
  border-radius: 10px;
  animation: rotate 1.5s ease-in-out infinite alternate;
  /* display: none; */
}

.screen {
  position: inherit;
  height: 175px;
  width: 90px;
  border: 3px solid #204887;
  margin-left: 2px;
  margin-top: 5px;
  border-radius: 1px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }

  50% {
    transform: rotate(-90deg)
  }

  100% {
    transform: rotate(-90deg)
  }
}

@media only screen and (max-device-width: 812px) and (orientation: landscape) {

  .phone,
  .message {
    display: block;
  }
}
</style>