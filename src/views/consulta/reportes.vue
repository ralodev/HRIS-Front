<template>
    <!-- Ask to turn to landscape -->
    <div class="container d-block d-md-none text-center bg-surface-100 " style="width:350px;">
      <div class="text-blue-900 font-bold text-5xl">Oops!</div>
      <div class="text-900 font-bold text-3xl">Gira tu dispositivo</div>
      <div class="container d-flex justify-content-center my-3">
        <div class="phone">
          <div class="screen"></div>
        </div>
      </div>
      <div class="text-900 font-semibold text-muted">Debido a la gran cantidad de datos, esta página solo puede
        visualizarse
        en pantallas grandes, gira tu dispositivo o cambia el tamaño de la ventana :)</div>
    </div>
    <!-- Reporte -->
    <div class="container-lg p-4 d-none d-md-block" id="911Content" style="height:6658px;">
      <!-- Title -->
      <div class="d-block">
        <Button type="button" :label="exportando ? '' :'Descargar en PDF'" icon="pi pi-download" @click="exportar" class="float-end px-3" raised
          :loading="exportando" />
      </div>
      <div class="pb-3 toExport">
        <div class="text-900 font-bold text-5xl text-to-export">Reporte 911.9 y 911.10</div>
      </div>

      <!-- Sección 1 -->
      <div class="card shadow-7 table-responsive border-round-xl border-none print-container">

        <div class="py-3 bg-primary-800 text-white text-center">
          <span class="fw-bold h4 text-to-export" style="text-transform:uppercase">1. Personal de la institución</span>
        </div>

        <!-- ///// SECCIÓN 1 ///// -->
        <div class="py-3 ps-3 bg-primary-700 text-white text-center shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.1 Personal por función</span>
        </div>
        <div class="card-body toExport">
          <p class="text-to-export"><span class="fw-bold">1. </span>De acuerdo con la función que desempeña el personal
            que
            labora en la faculta o
            escuela, es decir, que pertenezcan a la estructura orgánica y operativo de la escuela, desglóselos por sexo,
            con
            discapacidad y hablantes de lengua indígena</p>
          <p class="text-to-export"><span class="fw-bold">Nota: </span>Si una persona desempeña dos o más funciones,
            anótela
            en la que
            dedique más tiempo. Registre a todas las personas que laboran en la facultad o escuela incluido el
            subcontratado
            por terceros, asegúrese de que los datos no se dupliquen.</p>
          <!-- Tabla 1 -->
          <table v-if="data.directivos" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Personal</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Directivos</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Docentes</td>
                <td class="text-center vertical-align-middle">{{ data.docentes.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.docentes.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.docentes.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.docentes.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.docentes.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Docente investigador y Docente Auxiliar de investigador</td>
                <td class="text-center vertical-align-middle">{{ data.docente_investigador.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.docente_investigador.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.docente_investigador.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.docente_investigador.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.docente_investigador.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Investigador</td>
                <td class="text-center vertical-align-middle">{{ data.investigador.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.investigador.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.investigador.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.investigador.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.investigador.habla_lenguas }}</td>
              </tr>
              <!-- Auxiliar de investigador -->
              <tr>
                <td>Auxiliar de investigador (No incluye servicio social y prácticas profesionales)</td>
                <td class="text-center vertical-align-middle">{{ data.auxiliar.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.auxiliar.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.auxiliar.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.auxiliar.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.auxiliar.habla_lenguas }}</td>
              </tr>
              <!-- Administrativo -->
              <tr>
                <td>Administrativo</td>
                <td class="text-center vertical-align-middle">{{ data.administrativo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.administrativo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.administrativo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.administrativo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.administrativo.habla_lenguas }}</td>
              </tr>
              <!-- Otros -->
              <tr>
                <td>Otros (choferes, personal de limpieza, serivicos generales, etc)</td>
                <td class="text-center vertical-align-middle">{{ data.otros.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.otros.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.otros.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.otros.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.otros.habla_lenguas }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.hombres + data.docentes.hombres +
                  data.docente_investigador.hombres + data.investigador.hombres + data.auxiliar.hombres +
                  data.administrativo.hombres + data.otros.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.mujeres + data.docentes.mujeres +
                  data.docente_investigador.mujeres + data.investigador.mujeres + data.auxiliar.mujeres +
                  data.administrativo.mujeres + data.otros.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.total + data.docentes.total +
                  data.docente_investigador.total + data.investigador.total + data.auxiliar.total +
                  data.administrativo.total + data.otros.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.discapacitados +
                  data.docentes.discapacitados + data.docente_investigador.discapacitados +
                  data.investigador.discapacitados
                  + data.auxiliar.discapacitados + data.administrativo.discapacitados + data.otros.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.habla_lenguas +
                  data.docentes.habla_lenguas
                  + data.docente_investigador.habla_lenguas + data.investigador.habla_lenguas +
                  data.auxiliar.habla_lenguas
                  + data.administrativo.habla_lenguas + data.otros.habla_lenguas }}</td>
              </tr>

            </tbody>
          </table>

        </div>
        <!-- ///// SECCIÓN 2 ///// -->
        <div class="py-3 text-center bg-primary-700 text-white shadow-4 ">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.2 Personal docente por nivel de
            estudios</span>
        </div>

        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">2. </span>Del total personal docente, docente investigador y
            docente-auxiliar de investigador que laboran en la facultad o escuela, desglose por nivel de estudios, sexo,
            con
            discapacidad y hablantes de lengua indígena.</p>
          <!-- Tabla 2 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Nivel de estudios</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subespecialidad médica</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Doctorado</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Especialidad médica</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad_medica.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad_medica.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad_medica.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad_medica.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad_medica.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Maestría</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Especialidad</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Licenciatura</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Técnico superior*</td>
                <td class="text-center vertical-align-middle">{{ data.tecnico_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tecnico_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tecnico_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.tecnico_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.tecnico_superior.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Educación media superior o menos</td>
                <td class="text-center vertical-align-middle">{{ data.media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.media_superior.habla_lenguas }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.hombres + data.doctorado.hombres +
                  data.especialidad_medica.hombres + data.maestria.hombres + data.especialidad.hombres +
                  data.licenciatura.hombres + data.tecnico_superior.hombres + data.media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.mujeres + data.doctorado.mujeres +
                  data.especialidad_medica.mujeres + data.maestria.mujeres + data.especialidad.mujeres +
                  data.licenciatura.mujeres + data.tecnico_superior.mujeres + data.media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.total + data.doctorado.total +
                  data.especialidad_medica.total + data.maestria.total + data.especialidad.total + data.licenciatura.total
                  +
                  data.tecnico_superior.total + data.media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.discapacitados +
                  data.doctorado.discapacitados + data.especialidad_medica.discapacitados + data.maestria.discapacitados +
                  data.especialidad.discapacitados + data.licenciatura.discapacitados +
                  data.tecnico_superior.discapacitados
                  + data.media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.subespecialidad.habla_lenguas +
                  data.doctorado.habla_lenguas + data.especialidad_medica.habla_lenguas + data.maestria.habla_lenguas +
                  data.especialidad.habla_lenguas + data.licenciatura.habla_lenguas + data.tecnico_superior.habla_lenguas
                  +
                  data.media_superior.habla_lenguas }}</td>
              </tr>
            </tbody>
          </table>
          <small class=" text-to-export">* Incluye técnico superior universitario, profesional asociado y licencia
            profesional.</small>
        </div>

        <!-- ///// SECCIÓN 3 ///// -->
        <div class="py-3 text-center bg-primary-700 text-white  shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.3 Personal docente por tiempo de
            dedicación</span>
        </div>

        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">3. </span>Desglose al total del personal docente sin importar
            la
            modalidad que imparta por tiempo de dedicación, sexo y con discapacidad (considere al personal docente,
            docente-investigador y docente-auxiliar de investigador); así como si son titulados o no titulados por nivel
            de
            estudios.</p>
          <p class=" text-to-export"><span class="fw-bold">Nota: </span>Contabilice sólo una vez a cada docente.</p>
          <!-- Tabla 3 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Personal por tiempo de dedicación</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal de tiempo completo</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Personal de tres cuartos de tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Personal de medio tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.habla_lenguas }}</td>
              </tr>
              <tr>
                <td>Personal por hora o asignatura</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.habla_lenguas }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.hombres +
                  data.tres_cuartos_tiempo.hombres + data.medio_tiempo.hombres + data.horas_asignatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.mujeres +
                  data.tres_cuartos_tiempo.mujeres + data.medio_tiempo.mujeres + data.horas_asignatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.total +
                  data.tres_cuartos_tiempo.total
                  + data.medio_tiempo.total + data.horas_asignatura.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.discapacitados +
                  data.tres_cuartos_tiempo.discapacitados + data.medio_tiempo.discapacitados +
                  data.horas_asignatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.habla_lenguas +
                  data.tres_cuartos_tiempo.habla_lenguas + data.medio_tiempo.habla_lenguas +
                  data.horas_asignatura.habla_lenguas }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">3.2 </span>Personal docente por tiempo de dedicación y nivel de
            estudios.</p>
          <!-- Tabla 3.1 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Personal por tiempo de dedicación</th>
                <th class="text-center vertical-align-middle px-4">Técnico Superior</th>
                <th class="text-center vertical-align-middle px-4">Licenciatura</th>
                <th class="text-center vertical-align-middle px-4">Especialidad</th>
                <th class="text-center vertical-align-middle">Maestría*</th>
                <th class="text-center vertical-align-middle">Doctorado**</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal de tiempo completo</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.tecnico }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.licenciatura }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.especialidad }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.maestria }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.doctorado }}</td>
              </tr>
              <tr>
                <td>Personal de tres cuartos de tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.tecnico }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.licenciatura }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.especialidad }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.maestria }}</td>
                <td class="text-center vertical-align-middle">{{ data.tres_cuartos_tiempo.doctorado }}</td>
              </tr>
              <tr>
                <td>Personal de medio tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.tecnico }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.licenciatura }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.especialidad }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.maestria }}</td>
                <td class="text-center vertical-align-middle">{{ data.medio_tiempo.doctorado }}</td>
              </tr>
              <tr>
                <td>Personal por hora o asignatura</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.tecnico }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.licenciatura }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.especialidad }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.maestria }}</td>
                <td class="text-center vertical-align-middle">{{ data.horas_asignatura.doctorado }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.tecnico +
                  data.tres_cuartos_tiempo.tecnico + data.medio_tiempo.tecnico + data.horas_asignatura.tecnico }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.licenciatura +
                  data.tres_cuartos_tiempo.licenciatura + data.medio_tiempo.licenciatura +
                  data.horas_asignatura.licenciatura }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.especialidad +
                  data.tres_cuartos_tiempo.especialidad + data.medio_tiempo.especialidad +
                  data.horas_asignatura.especialidad }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.maestria +
                  data.tres_cuartos_tiempo.maestria + data.medio_tiempo.maestria + data.horas_asignatura.maestria }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.doctorado +
                  data.tres_cuartos_tiempo.doctorado + data.medio_tiempo.doctorado + data.horas_asignatura.doctorado }}
                </td>
              </tr>
            </tbody>
          </table>
          <small>* Incluye las especialidades médicas.</small>
          <small>** Incluye las subespecialidades médicas.</small>
        </div>

        <!-- ///// SECCIÓN 4 ///// -->

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.4 Personal docente por nivel que
            imparten</span>
        </div>
        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">4. </span>Total de personal docente, docente investigador,
            docente-auxiliar de
            investigador sin importar la modalidad por nivel de estudios, de acuerdo con el nivel que imparten.</p>
          <p class=" text-to-export"><span class="fw-bold">Nota: </span>Repórtelos en tantos niveles como imparta.</p>
          <!-- Tabla 5 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th rowspan="2 vertical-align-middle">Nivel de estudio</th>
                <th class="text-center vertical-align-middle px-4" colspan="3">Técnico Superior*</th>
                <th class="text-center vertical-align-middle px-4" colspan="3">Licenciatura</th>
                <th class="text-center vertical-align-middle px-4" colspan="3">Posgrado</th>
              </tr>
              <tr>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Técnico Superior</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
              </tr>
              <tr>
                <td>Licenciatura</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.total }}</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
              </tr>
              <tr>
                <td>Especialidad</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.especialidad.total }}</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
              </tr>
              <tr>
                <td>Maestría</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle">{{ data.maestria.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.total }}</td>
              </tr>
              <tr>
                <td>Doctorado</td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle"> 0 </td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.doctorado.total }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">0</td>
                <td class="text-center vertical-align-middle">0</td>
                <td class="text-center vertical-align-middle">0</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.hombres + data.especialidad.hombres +
                  data.maestria.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.mujeres + data.especialidad.mujeres +
                  data.maestria.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.licenciatura.total + data.especialidad.total +
                  data.maestria.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.hombres + data.doctorado.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.mujeres + data.doctorado.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.maestria.total + data.doctorado.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ///// SECCIÓN 5 ///// -->

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.5 Personal docente por grupo de
            edad y
            sexo</span>
        </div>
        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">5. </span>Total de personal docente, docente investigador,
            docente-auxiliar de
            investigador que laboran en la facultad o escuela por grupo de edad y sexo.</p>
          <!-- Tabla 5 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th class="vertical-align-middle px-4">Grupos de Edad</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Menos de 20 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_menos.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_menos.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_menos.total }} </td>
              </tr>
              <tr>
                <td>De 20 a 24 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_24.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_24.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_20_24.total }} </td>
              </tr>
              <tr>
                <td>De 25 a 29 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_25_29.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_25_29.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_25_29.total }} </td>
              </tr>
              <tr>
                <td>De 30 a 34 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_30_34.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_30_34.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_30_34.total }} </td>
              </tr>
              <tr>
                <td>De 35 a 39 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_35_39.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_35_39.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_35_39.total }} </td>
              </tr>
              <tr>
                <td>De 40 a 44 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_40_44.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_40_44.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_40_44.total }} </td>
              </tr>
              <tr>
                <td>De 45 a 49 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_45_49.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_45_49.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_45_49.total }} </td>
              </tr>
              <tr>
                <td>De 50 a 54 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_50_54.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_50_54.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_50_54.total }} </td>
              </tr>
              <tr>
                <td>De 55 a 59 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_55_59.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_55_59.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_55_59.total }} </td>
              </tr>
              <tr>
                <td>De 60 a 64 años</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_60_64.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_60_64.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_60_64.total }} </td>
              </tr>
              <tr>
                <td>De 65 años o más</td>
                <td class="text-center vertical-align-middle"> {{ data.edad_65_mas.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_65_mas.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.edad_65_mas.total }} </td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.hombres +
                  data.tres_cuartos_tiempo.hombres + data.medio_tiempo.hombres + data.horas_asignatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.mujeres +
                  data.tres_cuartos_tiempo.mujeres + data.medio_tiempo.mujeres + data.horas_asignatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.total +
                  data.tres_cuartos_tiempo.total
                  + data.medio_tiempo.total + data.horas_asignatura.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ///// SECCIÓN 1.6 ///// -->

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">1.6 Personal docente por grupo de
            antigüedad y
            sexo</span>
        </div>
        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">6. </span>Total de personal docente, docente investigador,
            docente-auxiliar de
            investigador que laboran en la facultad o escuela por rango de antigüedad y sexo.</p>
          <!-- Tabla 6 -->

          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th class="vertical-align-middle px-4">Antigüedad</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Menos de 20 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_0_4.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_0_4.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_0_4.total }} </td>
              </tr>
              <tr>
                <td>De 20 a 24 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_5_9.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_5_9.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_5_9.total }} </td>
              </tr>
              <tr>
                <td>De 25 a 29 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_10_14.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_10_14.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_10_14.total }} </td>
              </tr>
              <tr>
                <td>De 30 a 34 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_15_19.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_15_19.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_15_19.total }} </td>
              </tr>
              <tr>
                <td>De 35 a 39 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_20_24.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_20_24.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_20_24.total }} </td>
              </tr>
              <tr>
                <td>De 40 a 44 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_25_29.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_25_29.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_25_29.total }} </td>
              </tr>
              <tr>
                <td>De 45 a 49 años</td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_30_mas.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_30_mas.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.antiguedad_30_mas.total }} </td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.hombres +
                  data.tres_cuartos_tiempo.hombres + data.medio_tiempo.hombres + data.horas_asignatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.mujeres +
                  data.tres_cuartos_tiempo.mujeres + data.medio_tiempo.mujeres + data.horas_asignatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.tiempo_completo.total +
                  data.tres_cuartos_tiempo.total
                  + data.medio_tiempo.total + data.horas_asignatura.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ///// SECCIÓN 911.10 2 ///// -->
        <div class="py-3 bg-primary-800 text-white text-center">
          <span class="fw-bold h4 text-to-export" style="text-transform:uppercase">2. Personal en áreas centrales</span>
        </div>

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">2.1 Personal por función que
            desempeña</span>
        </div>
        <div class="card-body toExport">
          <p class=" text-to-export"><span class="fw-bold">1. </span>De acuerdo con la función que desempeña, marque el
            número de personas que
            laboran el as láreas centrales de la insitutción (trectoría, oficinas, administrativas, centrales, etc),
            desglóselo por sexo, con discapacidadd y cuántos son hablantes de lenguas indígenas.</p>
          <p class=" text-to-export"><span class="fw-bold">Nota: </span>Si una persona desempeña dos o más funciones,
            anótela en la que dedique más
            tiempo.</p>
          <!-- Tabla 6 -->

          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th class="vertical-align-middle px-4">Funciones</th>
                <th class="text-center vertical-align-middle px-4">Hombres</th>
                <th class="text-center vertical-align-middle px-4">Mujeres</th>
                <th class="text-center vertical-align-middle px-4">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Directivo</td>
                <td class="text-center vertical-align-middle"> {{ data.directivos.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.directivos.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.directivos.total }} </td>
                <td class="text-center vertical-align-middle"> {{ data.directivos.discapacitados }} </td>
                <td class="text-center vertical-align-middle"> {{ data.directivos.habla_lenguas }} </td>
              </tr>
              <tr>
                <td>Administrativo</td>
                <td class="text-center vertical-align-middle"> {{ data.administrativo.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.administrativo.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.administrativo.total }} </td>
                <td class="text-center vertical-align-middle"> {{ data.administrativo.discapacitados }} </td>
                <td class="text-center vertical-align-middle"> {{ data.administrativo.habla_lenguas }} </td>
              </tr>
              <tr>
                <td>Otros</td>
                <td class="text-center vertical-align-middle"> {{ data.otros.hombres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.otros.mujeres }} </td>
                <td class="text-center vertical-align-middle"> {{ data.otros.total }} </td>
                <td class="text-center vertical-align-middle"> {{ data.otros.discapacitados }} </td>
                <td class="text-center vertical-align-middle"> {{ data.otros.habla_lenguas }} </td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.hombres + data.administrativo.hombres +
                  data.otros.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.mujeres + data.administrativo.mujeres +
                  data.otros.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.total + data.administrativo.total +
                  data.otros.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.discapacitados +
                  data.administrativo.discapacitados + data.otros.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.directivos.habla_lenguas +
                  data.administrativo.habla_lenguas + data.otros.habla_lenguas }}</td>
              </tr>
            </tbody>
          </table>

        </div>

        <!-- ///// SECCIÓN 911.10 - 4///// -->

        <div class="py-3 bg-primary-800 text-white text-center">
          <span class="fw-bold h4 text-to-export" style="text-transform:uppercase">4. Investigadores</span>
        </div>

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">4.1 Investigadores por tipo de
            contrato.</span>
        </div>
        <div class="card-body table-responsive toExport">
          <!-- Tabla 6 -->
          <p class=" text-to-export"><span class="fw-bold">1. </span>.1 Número de investigadores, por tipo de contrato y
            nivel de estudio,
            desglóselo por sexo, con discapacidad y hablantes del engua indígena.</p>

          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Tipo de contrato</th>
                <th class="text-center vertical-align-middle">Investigador</th>
                <th class="text-center vertical-align-middle">Auxiliar de investigador**</th>
                <th class="text-center vertical-align-middle">Docente investigador</th>
                <th class="text-center vertical-align-middle">Hombres</th>
                <th class="text-center vertical-align-middle">Mujeres</th>
                <th class="text-center vertical-align-middle">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiempo completo</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Tres cuartos de tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tres_cuartos_tiempo.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Medio tiempo</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_medio_tiempo.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Por hora o asignatura</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_horas_asignatura.habla_lengua }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.investigador +
                  data.inv_tres_cuartos_tiempo.investigador + data.inv_medio_tiempo.investigador +
                  data.inv_horas_asignatura.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.auxiliar +
                  data.inv_tres_cuartos_tiempo.auxiliar + data.inv_medio_tiempo.auxiliar +
                  data.inv_horas_asignatura.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.docente_investigador +
                  data.inv_tres_cuartos_tiempo.docente_investigador + data.inv_medio_tiempo.docente_investigador +
                  data.inv_horas_asignatura.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.hombres +
                  data.inv_tres_cuartos_tiempo.hombres + data.inv_medio_tiempo.hombres + data.inv_horas_asignatura.hombres
                }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.mujeres +
                  data.inv_tres_cuartos_tiempo.mujeres + data.inv_medio_tiempo.mujeres + data.inv_horas_asignatura.mujeres
                }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.total +
                  data.inv_tres_cuartos_tiempo.total + data.inv_medio_tiempo.total + data.inv_horas_asignatura.total }}
                </td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.discapacitados +
                  data.inv_tres_cuartos_tiempo.discapacitados + data.inv_medio_tiempo.discapacitados +
                  data.inv_horas_asignatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tiempo_completo.habla_lengua +
                  data.inv_tres_cuartos_tiempo.habla_lengua + data.inv_medio_tiempo.habla_lengua +
                  data.inv_horas_asignatura.habla_lengua }}</td>
              </tr>
            </tbody>
          </table>

        </div>

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">4.2 Investigadores por nivel de
            estudios</span>
        </div>
        <div class="card-body toExport">
          <!-- Tabla 6 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Nivel de estudios</th>
                <th class="text-center vertical-align-middle">Investigador</th>
                <th class="text-center vertical-align-middle">Auxiliar de investigador</th>
                <th class="text-center vertical-align-middle">Docente investigador</th>
                <th class="text-center vertical-align-middle">Hombres</th>
                <th class="text-center vertical-align-middle">Mujeres</th>
                <th class="text-center vertical-align-middle">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subespecialidad médica</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Doctorado</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_doctorado.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Especialidad médica</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad_medica.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Maestría</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_maestria.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Especialidad</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_especialidad.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Licenciatura</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_licenciatura.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Técnico superior*</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_tecnico_superior.habla_lengua }}</td>
              </tr>
              <tr>
                <td>Educación media superior o menos</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_media_superior.habla_lengua }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.investigador +
                  data.inv_doctorado.investigador + data.inv_especialidad_medica.investigador +
                  data.inv_maestria.investigador + data.inv_especialidad.investigador + data.inv_licenciatura.investigador
                  +
                  data.inv_tecnico_superior.investigador + data.inv_media_superior.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.auxiliar +
                  data.inv_doctorado.auxiliar + data.inv_especialidad_medica.auxiliar + data.inv_maestria.auxiliar +
                  data.inv_especialidad.auxiliar + data.inv_licenciatura.auxiliar + data.inv_tecnico_superior.auxiliar +
                  data.inv_media_superior.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.docente_investigador +
                  data.inv_doctorado.docente_investigador + data.inv_especialidad_medica.docente_investigador +
                  data.inv_maestria.docente_investigador + data.inv_especialidad.docente_investigador +
                  data.inv_licenciatura.docente_investigador + data.inv_tecnico_superior.docente_investigador +
                  data.inv_media_superior.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.hombres +
                  data.inv_doctorado.hombres + data.inv_especialidad_medica.hombres + data.inv_maestria.hombres +
                  data.inv_especialidad.hombres + data.inv_licenciatura.hombres + data.inv_tecnico_superior.hombres +
                  data.inv_media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.mujeres +
                  data.inv_doctorado.mujeres + data.inv_especialidad_medica.mujeres + data.inv_maestria.mujeres +
                  data.inv_especialidad.mujeres + data.inv_licenciatura.mujeres + data.inv_tecnico_superior.mujeres +
                  data.inv_media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.total + data.inv_doctorado.total
                  +
                  data.inv_especialidad_medica.total + data.inv_maestria.total + data.inv_especialidad.total +
                  data.inv_licenciatura.total + data.inv_tecnico_superior.total + data.inv_media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.discapacitados +
                  data.inv_doctorado.discapacitados + data.inv_especialidad_medica.discapacitados +
                  data.inv_maestria.discapacitados + data.inv_especialidad.discapacitados +
                  data.inv_licenciatura.discapacitados + data.inv_tecnico_superior.discapacitados +
                  data.inv_media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.habla_lengua +
                  data.inv_doctorado.habla_lengua + data.inv_especialidad_medica.habla_lengua +
                  data.inv_maestria.habla_lengua + data.inv_especialidad.habla_lengua + data.inv_licenciatura.habla_lengua
                  +
                  data.inv_tecnico_superior.habla_lengua + data.inv_media_superior.habla_lengua }}</td>
              </tr>
            </tbody>
          </table>
          <small>* Incluye técnioco superior universitario y profesiona asociado.</small>
          <small>** No incliye servicio social y/o prácticas profesionales.</small>
        </div>

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">4.3 Investigadores por
            antigüedad</span>
        </div>
        <div class="card-body toExport">
          <!-- Tabla 6 -->
          <table v-if="data.doctorado" class="table table-to-export  table-bordered table-striped">
            <thead>
              <tr>
                <th>Antigüedad</th>
                <th class="text-center vertical-align-middle">Investigador</th>
                <th class="text-center vertical-align-middle">Auxiliar de investigador</th>
                <th class="text-center vertical-align-middle">Docente investigador</th>
                <th class="text-center vertical-align-middle">Hombres</th>
                <th class="text-center vertical-align-middle">Mujeres</th>
                <th class="text-center vertical-align-middle">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>De 0 a 4 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_0_4.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 5 a 9 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_5_9.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 10 a 14 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_10_14.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 15 a 19 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_15_19.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 20 a 24 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_20_24.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 25 a 29 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_25_29.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 30 años o más</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_antiguedad_30_mas.habla_lengua }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.investigador +
                  data.inv_doctorado.investigador + data.inv_especialidad_medica.investigador +
                  data.inv_maestria.investigador + data.inv_especialidad.investigador + data.inv_licenciatura.investigador
                  +
                  data.inv_tecnico_superior.investigador + data.inv_media_superior.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.auxiliar +
                  data.inv_doctorado.auxiliar + data.inv_especialidad_medica.auxiliar + data.inv_maestria.auxiliar +
                  data.inv_especialidad.auxiliar + data.inv_licenciatura.auxiliar + data.inv_tecnico_superior.auxiliar +
                  data.inv_media_superior.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.docente_investigador +
                  data.inv_doctorado.docente_investigador + data.inv_especialidad_medica.docente_investigador +
                  data.inv_maestria.docente_investigador + data.inv_especialidad.docente_investigador +
                  data.inv_licenciatura.docente_investigador + data.inv_tecnico_superior.docente_investigador +
                  data.inv_media_superior.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.hombres +
                  data.inv_doctorado.hombres + data.inv_especialidad_medica.hombres + data.inv_maestria.hombres +
                  data.inv_especialidad.hombres + data.inv_licenciatura.hombres + data.inv_tecnico_superior.hombres +
                  data.inv_media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.mujeres +
                  data.inv_doctorado.mujeres + data.inv_especialidad_medica.mujeres + data.inv_maestria.mujeres +
                  data.inv_especialidad.mujeres + data.inv_licenciatura.mujeres + data.inv_tecnico_superior.mujeres +
                  data.inv_media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.total + data.inv_doctorado.total
                  +
                  data.inv_especialidad_medica.total + data.inv_maestria.total + data.inv_especialidad.total +
                  data.inv_licenciatura.total + data.inv_tecnico_superior.total + data.inv_media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.discapacitados +
                  data.inv_doctorado.discapacitados + data.inv_especialidad_medica.discapacitados +
                  data.inv_maestria.discapacitados + data.inv_especialidad.discapacitados +
                  data.inv_licenciatura.discapacitados + data.inv_tecnico_superior.discapacitados +
                  data.inv_media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.habla_lengua +
                  data.inv_doctorado.habla_lengua + data.inv_especialidad_medica.habla_lengua +
                  data.inv_maestria.habla_lengua + data.inv_especialidad.habla_lengua + data.inv_licenciatura.habla_lengua
                  +
                  data.inv_tecnico_superior.habla_lengua + data.inv_media_superior.habla_lengua }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="py-3 text-center bg-primary-700 text-white shadow-4">
          <span class="font-regular h5 text-to-export" style="text-transform:uppercase">4.4 Investigadores por grupos de
            edad</span>
        </div>
        <div class="card-body toExport">
          <!-- Tabla 6 -->
          <table v-if="data.doctorado"
            class="table table-to-export  table-to-export table-bordered table-striped table-sm table-hover">
            <thead>
              <tr>
                <th>Grupos de edad</th>
                <th class="text-center vertical-align-middle">Investigador</th>
                <th class="text-center vertical-align-middle">Auxiliar de investigador</th>
                <th class="text-center vertical-align-middle">Docente investigador</th>
                <th class="text-center vertical-align-middle">Hombres</th>
                <th class="text-center vertical-align-middle">Mujeres</th>
                <th class="text-center vertical-align-middle">Total</th>
                <th class="text-center vertical-align-middle">Con discapacidad</th>
                <th class="text-center vertical-align-middle">Hablantes de lenguas indígenas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Menos de 20 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_menos.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 20 a 24 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_20_24.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 25 a 29 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_25_29.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 30 a 34 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_30_34.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 35 a 39 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_35_39.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 40 a 44 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_40_44.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 45 a 49 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_45_49.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 50 a 54 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_50_54.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 55 a 59 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_55_59.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 60 a 64 años</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_60_64.habla_lengua }}</td>
              </tr>
              <tr>
                <td>De 65 años o más</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_edad_65_mas.habla_lengua }}</td>
              </tr>
              <!-- Total -->
              <tr class="last-row">
                <td>Total</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.investigador +
                  data.inv_doctorado.investigador + data.inv_especialidad_medica.investigador +
                  data.inv_maestria.investigador + data.inv_especialidad.investigador + data.inv_licenciatura.investigador
                  +
                  data.inv_tecnico_superior.investigador + data.inv_media_superior.investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.auxiliar +
                  data.inv_doctorado.auxiliar + data.inv_especialidad_medica.auxiliar + data.inv_maestria.auxiliar +
                  data.inv_especialidad.auxiliar + data.inv_licenciatura.auxiliar + data.inv_tecnico_superior.auxiliar +
                  data.inv_media_superior.auxiliar }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.docente_investigador +
                  data.inv_doctorado.docente_investigador + data.inv_especialidad_medica.docente_investigador +
                  data.inv_maestria.docente_investigador + data.inv_especialidad.docente_investigador +
                  data.inv_licenciatura.docente_investigador + data.inv_tecnico_superior.docente_investigador +
                  data.inv_media_superior.docente_investigador }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.hombres +
                  data.inv_doctorado.hombres + data.inv_especialidad_medica.hombres + data.inv_maestria.hombres +
                  data.inv_especialidad.hombres + data.inv_licenciatura.hombres + data.inv_tecnico_superior.hombres +
                  data.inv_media_superior.hombres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.mujeres +
                  data.inv_doctorado.mujeres + data.inv_especialidad_medica.mujeres + data.inv_maestria.mujeres +
                  data.inv_especialidad.mujeres + data.inv_licenciatura.mujeres + data.inv_tecnico_superior.mujeres +
                  data.inv_media_superior.mujeres }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.total + data.inv_doctorado.total
                  +
                  data.inv_especialidad_medica.total + data.inv_maestria.total + data.inv_especialidad.total +
                  data.inv_licenciatura.total + data.inv_tecnico_superior.total + data.inv_media_superior.total }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.discapacitados +
                  data.inv_doctorado.discapacitados + data.inv_especialidad_medica.discapacitados +
                  data.inv_maestria.discapacitados + data.inv_especialidad.discapacitados +
                  data.inv_licenciatura.discapacitados + data.inv_tecnico_superior.discapacitados +
                  data.inv_media_superior.discapacitados }}</td>
                <td class="text-center vertical-align-middle">{{ data.inv_subespecialidad.habla_lengua +
                  data.inv_doctorado.habla_lengua + data.inv_especialidad_medica.habla_lengua +
                  data.inv_maestria.habla_lengua + data.inv_especialidad.habla_lengua + data.inv_licenciatura.habla_lengua
                  +
                  data.inv_tecnico_superior.habla_lengua + data.inv_media_superior.habla_lengua }}</td>
              </tr>
            </tbody>
          </table>
          <small class=" text-to-export">* No incliye servicio social y/o prácticas profesionales.</small>
        </div>

      </div>
    </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import { useStore } from '@/stores/consultaStore';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';


export default defineComponent({
  setup() {
    const store = useStore();
    const alertas = useAlerts();
    const router = useRouter();
    const route = useRoute();
    const pdf = ref(null);
    const exportando = ref(false);
    const data = ref([]);
    const tables_data = {
      directivos: ref([]),
      docentes: ref([]),
      docente_investigador: ref([]),
      investigador: ref([]),
      auxiliar: ref([]),
      administrativo: ref([]),
      otros: ref([]),

      subespecialidad: ref([]),
      doctorado: ref([]),
      especialidad_medica: ref([]),
      maestria: ref([]),
      especialidad: ref([]),
      licenciatura: ref([]),
      tecnico_superior: ref([]),
      media_superior: ref([]),

      tiempo_completo: ref([]),
      tres_cuartos_tiempo: ref([]),
      medio_tiempo: ref([]),
      horas_asignatura: ref([]),

      edad_20_menos: ref([]),
      edad_20_24: ref([]),
      edad_25_29: ref([]),
      edad_30_34: ref([]),
      edad_35_39: ref([]),
      edad_40_44: ref([]),
      edad_45_49: ref([]),
      edad_50_54: ref([]),
      edad_55_59: ref([]),
      edad_60_64: ref([]),
      edad_65_mas: ref([]),

      antiguedad_0_4: ref([]),
      antiguedad_5_9: ref([]),
      antiguedad_10_14: ref([]),
      antiguedad_15_19: ref([]),
      antiguedad_20_24: ref([]),
      antiguedad_25_29: ref([]),
      antiguedad_30_mas: ref([]),

      inv_tiempo_completo: ref([]),
      inv_tres_cuartos_tiempo: ref([]),
      inv_medio_tiempo: ref([]),
      inv_horas_asignatura: ref([]),

      inv_subespecialidad: ref([]),
      inv_doctorado: ref([]),
      inv_especialidad_medica: ref([]),
      inv_maestria: ref([]),
      inv_especialidad: ref([]),
      inv_licenciatura: ref([]),
      inv_tecnico_superior: ref([]),
      inv_media_superior: ref([]),

      inv_antiguedad_0_4: ref([]),
      inv_antiguedad_5_9: ref([]),
      inv_antiguedad_10_14: ref([]),
      inv_antiguedad_15_19: ref([]),
      inv_antiguedad_20_24: ref([]),
      inv_antiguedad_25_29: ref([]),
      inv_antiguedad_30_mas: ref([]),

      inv_edad_20_menos: ref([]),
      inv_edad_20_24: ref([]),
      inv_edad_25_29: ref([]),
      inv_edad_30_34: ref([]),
      inv_edad_35_39: ref([]),
      inv_edad_40_44: ref([]),
      inv_edad_45_49: ref([]),
      inv_edad_50_54: ref([]),
      inv_edad_55_59: ref([]),
      inv_edad_60_64: ref([]),
      inv_edad_65_mas: ref([]),

    };

    onMounted(() => {
      exportando.value = true;
      let requestSuccess = true;
      alertas.showLoading('Cargando datos...');
      store.getAll().then((r) => {
        if (r.status == 200){
        data.value = store.data;


        data.value.forEach((element) => {
          element.discapacidades = element.discapacidades == true ? 'SI' : 'NO';
          element.lenguas = element.lenguas == true ? 'SI' : 'NO';
          //element.departamento = element.departamento ? element.departamento : '';
          if (element.nombre == "MARIANA SÁNCHEZ") console.log(element);
        });

        //Tabla 1
        tables_data.directivos = {
          'total': data.value.filter((el) => el.funcion === 'DIRECTIVO O JEFE DE DEPARTAMENTO').length,
          'hombres': data.value.filter((el) => el.funcion === 'DIRECTIVO O JEFE DE DEPARTAMENTO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'DIRECTIVO O JEFE DE DEPARTAMENTO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'DIRECTIVO O JEFE DE DEPARTAMENTO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'DIRECTIVO O JEFE DE DEPARTAMENTO' && el.lenguas === 'SI').length,
        }
        tables_data.docentes = {
          'total': data.value.filter((el) => el.funcion === 'DOCENTE').length,
          'hombres': data.value.filter((el) => el.funcion === 'DOCENTE' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'DOCENTE' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'DOCENTE' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'DOCENTE' && el.lenguas === 'SI').length,
        }
        tables_data.docente_investigador = {
          'total': data.value.filter((el) => el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR' && el.lenguas === 'SI').length,
        }
        tables_data.investigador = {
          'total': data.value.filter((el) => el.funcion === 'INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.funcion === 'INVESTIGADOR' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'INVESTIGADOR' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'INVESTIGADOR' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'INVESTIGADOR' && el.lenguas === 'SI').length,
        }
        tables_data.auxiliar = {
          'total': data.value.filter((el) => el.funcion === 'AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.funcion === 'AUXILIAR DE INVESTIGADOR' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'AUXILIAR DE INVESTIGADOR' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'AUXILIAR DE INVESTIGADOR' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'AUXILIAR DE INVESTIGADOR' && el.lenguas === 'SI').length,
        }
        tables_data.administrativo = {
          'total': data.value.filter((el) => el.funcion === 'ADMINISTRATIVO').length,
          'hombres': data.value.filter((el) => el.funcion === 'ADMINISTRATIVO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'ADMINISTRATIVO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'ADMINISTRATIVO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'ADMINISTRATIVO' && el.lenguas === 'SI').length,
        }
        tables_data.otros = {
          'total': data.value.filter((el) => el.funcion === 'OTROS (SERVICIOS GENERALES)').length,
          'hombres': data.value.filter((el) => el.funcion === 'OTROS (SERVICIOS GENERALES)' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.funcion === 'OTROS (SERVICIOS GENERALES)' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.funcion === 'OTROS (SERVICIOS GENERALES)' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.funcion === 'OTROS (SERVICIOS GENERALES)' && el.lenguas === 'SI').length,
        }

        tables_data.subespecialidad = {
          'total': data.value.filter((el) => el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'hombres': data.value.filter((el) => el.subespecialidad === 'SUBESPECIALIDAD MEDICA' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.subespecialidad === 'SUBESPECIALIDAD MEDICA' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.subespecialidad === 'SUBESPECIALIDAD MEDICA' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.subespecialidad === 'SUBESPECIALIDAD MEDICA' && el.lenguas === 'SI').length,
        }
        // Nivel Academico Doctorado
        tables_data.doctorado = {
          'total': data.value.filter((el) => el.nivelAcademico === 'DOCTORADO').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'DOCTORADO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'DOCTORADO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'DOCTORADO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'DOCTORADO' && el.lenguas === 'SI').length,
        }
        // Nivel Academico especialidad medica
        tables_data.especialidad_medica = {
          'total': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD MEDICA' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD MEDICA' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD MEDICA' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD MEDICA' && el.lenguas === 'SI').length,
        }
        // Nivel Academico Maestria
        tables_data.maestria = {
          'total': data.value.filter((el) => el.nivelAcademico === 'MAESTRIA').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'MAESTRIA' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'MAESTRIA' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'MAESTRIA' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'MAESTRIA' && el.lenguas === 'SI').length,
        }
        // Nivel Academico especialidad
        tables_data.especialidad = {
          'total': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'ESPECIALIDAD' && el.lenguas === 'SI').length,
        }
        // Nivel Academico Licenciatura
        tables_data.licenciatura = {
          'total': data.value.filter((el) => el.nivelAcademico === 'LICENCIATURA').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'LICENCIATURA' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'LICENCIATURA' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'LICENCIATURA' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'LICENCIATURA' && el.lenguas === 'SI').length,
        }
        // Nivel Academico Tecnico Superior
        tables_data.tecnico_superior = {
          'total': data.value.filter((el) => el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'hombres': data.value.filter((el) => el.nivelAcademico === 'TECNICO SUPERIOR' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.nivelAcademico === 'TECNICO SUPERIOR' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.nivelAcademico === 'TECNICO SUPERIOR' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.nivelAcademico === 'TECNICO SUPERIOR' && el.lenguas === 'SI').length,
        }
        // Nivel Academico media superior
        tables_data.media_superior = {
          'total': data.value.filter((el) => el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA').length,
          'hombres': data.value.filter((el) => (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA') && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA') && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA') && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA') && el.lenguas === 'SI').length,
        }


        tables_data.tiempo_completo = {
          'total': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO').length,
          'hombres': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.lenguas === 'SI').length,
          'tecnico': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'licenciatura': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'LICENCIATURA').length,
          'especialidad': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'ESPECIALIDAD').length,
          'maestria': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'MAESTRIA' ||
            el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'doctorado': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'DOCTORADO' ||
            el.categoria === 'TIEMPO COMPLETO' && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
        }
        // Categoria tres cuartos de tiempo
        tables_data.tres_cuartos_tiempo = {
          'total': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO').length,
          'hombres': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.lenguas === 'SI').length,
          'tecnico': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'licenciatura': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'LICENCIATURA').length,
          'especialidad': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'ESPECIALIDAD').length,
          'maestria': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'MAESTRIA' || el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'doctorado': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'DOCTORADO' || el.categoria === 'TRES CUARTOS DE TIEMPO' && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
        }
        // Categoria medio tiempo
        tables_data.medio_tiempo = {
          'total': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO').length,
          'hombres': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.lenguas === 'SI').length,
          'tecnico': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'licenciatura': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'LICENCIATURA').length,
          'especialidad': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'ESPECIALIDAD').length,
          'maestria': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'MAESTRIA' || el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'doctorado': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'DOCTORADO' || el.categoria === 'MEDIO TIEMPO' && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
        }
        // Categoria horas de asignatura
        tables_data.horas_asignatura = {
          'total': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA').length,
          'hombres': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.sexo === 'MASCULINO').length,
          'mujeres': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.sexo === 'FEMENINO').length,
          'discapacitados': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.discapacidades === 'SI').length,
          'habla_lenguas': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.lenguas === 'SI').length,
          'tecnico': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'licenciatura': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'LICENCIATURA').length,
          'especialidad': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'ESPECIALIDAD').length,
          'maestria': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'MAESTRIA' || el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'doctorado': data.value.filter((el) => el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'DOCTORADO' || el.categoria === 'HORAS DE ASIGNATURA' && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
        }
        tables_data.edad_20_menos = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad < 20).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad < 20).length,
          'total': data.value.filter((e) => e.edad < 20).length,
        }
        tables_data.edad_20_24 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 20 && e.edad <= 24).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 20 && e.edad <= 24).length,
          'total': data.value.filter((e) => e.edad >= 20 && e.edad <= 24).length,
        }
        tables_data.edad_25_29 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 25 && e.edad <= 29).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 25 && e.edad <= 29).length,
          'total': data.value.filter((e) => e.edad >= 25 && e.edad <= 29).length,
        }
        tables_data.edad_30_34 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 30 && e.edad <= 34).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 30 && e.edad <= 34).length,
          'total': data.value.filter((e) => e.edad >= 30 && e.edad <= 34).length,
        }
        tables_data.edad_35_39 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 35 && e.edad <= 39).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 35 && e.edad <= 39).length,
          'total': data.value.filter((e) => e.edad >= 35 && e.edad <= 39).length,
        }
        tables_data.edad_40_44 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 40 && e.edad <= 44).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 40 && e.edad <= 44).length,
          'total': data.value.filter((e) => e.edad >= 40 && e.edad <= 44).length,
        }
        tables_data.edad_45_49 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 45 && e.edad <= 49).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 45 && e.edad <= 49).length,
          'total': data.value.filter((e) => e.edad >= 45 && e.edad <= 49).length,
        }
        tables_data.edad_50_54 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 50 && e.edad <= 54).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 50 && e.edad <= 54).length,
          'total': data.value.filter((e) => e.edad >= 50 && e.edad <= 54).length,
        }
        tables_data.edad_55_59 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 55 && e.edad <= 59).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 55 && e.edad <= 59).length,
          'total': data.value.filter((e) => e.edad >= 55 && e.edad <= 59).length,
        }
        tables_data.edad_60_64 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 60 && e.edad <= 64).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 60 && e.edad <= 64).length,
          'total': data.value.filter((e) => e.edad >= 60 && e.edad <= 64).length,
        }
        tables_data.edad_65_mas = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 65).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 65).length,
          'total': data.value.filter((e) => e.edad >= 65).length,
        }

        tables_data.antiguedad_0_4 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 0 && e.antiguedad <= 4).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 0 && e.antiguedad <= 4).length,
          'total': data.value.filter((e) => e.antiguedad >= 0 && e.antiguedad <= 4).length,
        }
        tables_data.antiguedad_5_9 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 5 && e.antiguedad <= 9).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 5 && e.antiguedad <= 9).length,
          'total': data.value.filter((e) => e.antiguedad >= 5 && e.antiguedad <= 9).length,
        }
        tables_data.antiguedad_10_14 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 10 && e.antiguedad <= 14).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 10 && e.antiguedad <= 14).length,
          'total': data.value.filter((e) => e.antiguedad >= 10 && e.antiguedad <= 14).length,
        }
        tables_data.antiguedad_15_19 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 15 && e.antiguedad <= 19).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 15 && e.antiguedad <= 19).length,
          'total': data.value.filter((e) => e.antiguedad >= 15 && e.antiguedad <= 19).length,
        }
        tables_data.antiguedad_20_24 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 20 && e.antiguedad <= 24).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 20 && e.antiguedad <= 24).length,
          'total': data.value.filter((e) => e.antiguedad >= 20 && e.antiguedad <= 24).length,
        }
        tables_data.antiguedad_25_29 = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 25 && e.antiguedad <= 29).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 25 && e.antiguedad <= 29).length,
          'total': data.value.filter((e) => e.antiguedad >= 25 && e.antiguedad <= 29).length,
        }
        tables_data.antiguedad_30_mas = {
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 30).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 30).length,
          'total': data.value.filter((e) => e.antiguedad >= 30).length,
        }


        tables_data.inv_tiempo_completo = {
          'investigador': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.funcion === 'INVESTIGADOR').length,
          'auxiliar': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.funcion === 'AUXILIAR DE INVESTIGADOR').length,
          'docente_investigador': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((el) => el.categoria === 'TIEMPO COMPLETO' && el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_tres_cuartos_tiempo = {
          'investigador': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.funcion === 'INVESTIGADOR').length,
          'auxiliar': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.funcion === 'AUXILIAR DE INVESTIGADOR').length,
          'docente_investigador': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((el) => el.categoria === 'TRES CUARTOS DE TIEMPO' && el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_medio_tiempo = {
          'investigador': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.funcion === 'INVESTIGADOR').length,
          'auxiliar': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.funcion === 'AUXILIAR DE INVESTIGADOR').length,
          'docente_investigador': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((el) => el.categoria === 'MEDIO TIEMPO' && el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_horas_asignatura = {
          'investigador': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.funcion === 'INVESTIGADOR').length,
          'auxiliar': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.funcion === 'AUXILIAR DE INVESTIGADOR').length,
          'docente_investigador': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR').length,
          'hombres': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((el) => el.categoria === 'HORAS ASIGNATURA' && el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }


        tables_data.inv_subespecialidad = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'SUBESPECIALIDAD MEDICA').length,
        }

        tables_data.inv_doctorado = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'DOCTORADO').length,
        }
        tables_data.inv_especialidad_medica = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD MEDICA').length,
        }
        tables_data.inv_maestria = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'MAESTRIA').length,
        }
        tables_data.inv_especialidad = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'ESPECIALIDAD').length,
        }
        tables_data.inv_licenciatura = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'LICENCIATURA').length,
        }
        tables_data.inv_tecnico_superior = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && el.nivelAcademico === 'TECNICO SUPERIOR').length,
        }
        tables_data.inv_media_superior = {
          'investigador': data.value.filter((el) => (el.funcion === 'INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'auxiliar': data.value.filter((el) => (el.funcion === 'AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'docente_investigador': data.value.filter((el) => (el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'hombres': data.value.filter((el) => el.sexo === 'MASCULINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'mujeres': data.value.filter((el) => el.sexo === 'FEMENINO' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'total': data.value.filter((el) => (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'discapacitados': data.value.filter((el) => el.discapacidad === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
          'habla_lengua': data.value.filter((el) => el.habla_lengua_indigena === 'SI' && (el.funcion === 'INVESTIGADOR' || el.funcion === 'AUXILIAR DE INVESTIGADOR' || el.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR') && (el.nivelAcademico === 'BACHILLERATO' || el.nivelAcademico === 'PRIMARIA' || el.nivelAcademico === 'SECUNDARIA')).length,
        }

        tables_data.inv_antiguedad_0_4 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 0 && e.antiguedad <= 4 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_5_9 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 5 && e.antiguedad <= 9 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_10_14 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 10 && e.antiguedad <= 14 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_15_19 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 15 && e.antiguedad <= 19 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_20_24 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 20 && e.antiguedad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_25_29 = {
          'investigador': data.value.filter((e) => e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 25 && e.antiguedad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_antiguedad_30_mas = {
          'investigador': data.value.filter((e) => e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.antiguedad >= 30 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.antiguedad >= 30 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.antiguedad >= 30 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_20_menos = {
          'investigador': data.value.filter((e) => e.edad < 20 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad < 20 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad < 20 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad < 20 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad < 20 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad < 20 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad < 20 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad < 20 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_20_24 = {
          'investigador': data.value.filter((e) => e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 20 && e.edad <= 24 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 20 && e.edad <= 24 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 20 && e.edad <= 24 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_25_29 = {
          'investigador': data.value.filter((e) => e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 25 && e.edad <= 29 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 25 && e.edad <= 29 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 25 && e.edad <= 29 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_30_34 = {
          'investigador': data.value.filter((e) => e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 30 && e.edad <= 34 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 30 && e.edad <= 34 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 30 && e.edad <= 34 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_35_39 = {
          'investigador': data.value.filter((e) => e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 35 && e.edad <= 39 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 35 && e.edad <= 39 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 35 && e.edad <= 39 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_40_44 = {
          'investigador': data.value.filter((e) => e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 40 && e.edad <= 44 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 40 && e.edad <= 44 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 40 && e.edad <= 44 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_45_49 = {
          'investigador': data.value.filter((e) => e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 45 && e.edad <= 49 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 45 && e.edad <= 49 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 45 && e.edad <= 49 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_50_54 = {
          'investigador': data.value.filter((e) => e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 50 && e.edad <= 54 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 50 && e.edad <= 54 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 50 && e.edad <= 54 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_55_59 = {
          'investigador': data.value.filter((e) => e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 55 && e.edad <= 59 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 55 && e.edad <= 59 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 55 && e.edad <= 59 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_60_64 = {
          'investigador': data.value.filter((e) => e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 60 && e.edad <= 64 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 60 && e.edad <= 64 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 60 && e.edad <= 64 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }
        tables_data.inv_edad_65_mas = {
          'investigador': data.value.filter((e) => e.edad >= 65 && (e.funcion === 'INVESTIGADOR')).length,
          'auxiliar': data.value.filter((e) => e.edad >= 65 && (e.funcion === 'AUXILIAR DE INVESTIGADOR')).length,
          'docente_investigador': data.value.filter((e) => e.edad >= 65 && (e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'hombres': data.value.filter((e) => e.sexo === 'MASCULINO' && e.edad >= 65 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'mujeres': data.value.filter((e) => e.sexo === 'FEMENINO' && e.edad >= 65 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'total': data.value.filter((e) => e.edad >= 65 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'discapacitados': data.value.filter((e) => e.discapacidad === 'SI' && e.edad >= 65 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
          'habla_lengua': data.value.filter((e) => e.habla_lengua_indigena === 'SI' && e.edad >= 65 && (e.funcion === 'INVESTIGADOR' || e.funcion === 'AUXILIAR DE INVESTIGADOR' || e.funcion === 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR')).length,
        }

      }else{
        requestSuccess = false;
        alertas.closeLoading();
        alertas.showErrorAlert('Error al obtener los datos','Intente nuevamente en unos segundos, si el error persiste contacte al administrador');
      }
      }).then(() => {
        if (requestSuccess){
          data.value = tables_data;
          setTimeout(() => {
            alertas.closeLoading();
            exportando.value = false;
          }, 2000);
        }
      });



      nextTick(() => {
        pdf.value = new jsPDF();
      });

      /*
        document.querySelectorAll('.opacity-0').forEach((el) => {
          el.classList.remove('opacity-0');
        });
        document.querySelectorAll('.p-skeleton').forEach((el) => {
          el.classList.remove('p-skeleton');
        });
      */

    });

    const exportar = () => {
      exportando.value = true;
      // Obtener los elementos deseados por la clase
      const content = document.querySelectorAll('.toExport');

      const options = {
        margin: 10,
        filename: 'reporte.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: [216, 330], orientation: 'landscape', compressPDF: true },
        pagebreak: { mode: 'avoid-all', avoid: '.avoid-pagebreak' },
      };

      const container = document.createElement('div');
      content.forEach(el => container.appendChild(el.cloneNode(true)));

      html2pdf().from(container).set(options).save().then(() => {
        exportando.value = false;
      });
    }

    return {
      exportar,
      exportando,
      data,
      tables_data,
      directivos: tables_data.directivos,
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