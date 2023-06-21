<template>
  <!-- Puestos -->
  <div class="container-lg pt-4 my-3">
    <!-- Card -->
    <div class="card shadow-5 border-round-2xl overflow-hidden">
      <div class="d-flex card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-clock-history fw-bold text-color h1 my-0"></i>
          <span class="fw-bold text-color h4 align-self-center ms-3 my-0"> Historial de empleado </span>
        </span>
        <Button icon="pi pi-times" severity="danger" size="small" @click="goBack" class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px"> </Button>
      </div>
      <div class="card-body table-responsive">
        <div class="grid" v-if="hasHistory">
          <table class="table table-hover table-responsive">
            <thead>
              <tr>
                <th>
                  <span class="fw-bold text-color text-lg">Campo </span>
                </th>
                <th>
                  <span class="fw-bold text-color text-lg"
                    >Versión actual
                    <span class="block small fw-normal" style="line-height: 0.7rem">{{ fechaUltimoCambio }}</span>
                  </span>
                </th>
                <th>
                  <span class="fw-bold text-color text-lg"
                    >Versión anterior
                    <span class="block small fw-normal" style="line-height: 0.7rem">{{ fechaCambioAnterior || 'Valor original (al crearse)' }}</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody class="text-muted fw-semibold">
              <tr>
                <td>
                  <span class="fw-bold text-color text-color">Nombre</span>
                </td>
                <td>
                  {{ empleado.nombre }}
                </td>
                <td :class="empleado.nombre != respaldoActual.nombre ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.nombre }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">RFC</span>
                </td>
                <td>
                  {{ empleado.rfc }}
                </td>
                <td :class="empleado.rfc != respaldoActual.rfc ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.rfc }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">CURP</span>
                </td>
                <td>
                  {{ empleado.curp }}
                </td>
                <td :class="empleado.curp != respaldoActual.curp ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.curp }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Sexo</span>
                </td>
                <td>
                  {{ empleado.sexo }}
                </td>
                <td :class="empleado.sexo != respaldoActual.sexo ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.sexo }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Nivel académico</span>
                </td>
                <td>
                  {{ empleado.nivelAcademico }}
                </td>
                <td :class="empleado.nivelAcademico != respaldoActual.nivelAcademico ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.nivelAcademico }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Correo electrónico</span>
                </td>
                <td>
                  {{ empleado.correoInstitucional }}
                </td>
                <td :class="empleado.correoInstitucional != respaldoActual.correoInstitucional ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.correoInstitucional }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Profesión</span>
                </td>
                <td>
                  {{ empleado.profesion }}
                </td>
                <td :class="empleado.profesion != respaldoActual.profesion ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.profesion }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Lenguas</span>
                </td>
                <td>
                  {{ empleado.lenguas }}
                </td>
                <td :class="empleado.lenguas != respaldoActual.lenguas ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.lenguas }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Discapacidades</span>
                </td>
                <td>
                  {{ empleado.discapacidades }}
                </td>
                <td :class="empleado.discapacidades != respaldoActual.discapacidades ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.discapacidades }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Numero de tarjeta</span>
                </td>
                <td>
                  {{ empleado.numeroTarjeta }}
                </td>
                <td :class="empleado.numeroTarjeta != respaldoActual.numeroTarjeta ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.numeroTarjeta }}
                </td>
              </tr>

              <tr v-if="empleado.departamento && respaldoActual.departamento">
                <td>
                  <span class="fw-bold text-color text-muted">Departamento</span>
                </td>
                <td>
                  {{ empleado.departamento.nombre }}
                </td>
                <td :class="empleado.departamento.nombre != respaldoActual.departamento.nombre ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.departamento.nombre }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Tipo de movimiento</span>
                </td>
                <td>
                  {{ empleado.tipoMovimiento }}
                </td>
                <td :class="empleado.tipoMovimiento != respaldoActual.tipoMovimiento ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.tipoMovimiento }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Fecha de ingreso</span>
                </td>
                <td>
                  {{ empleado.fechaIngreso }}
                </td>
                <td :class="empleado.fechaIngreso != respaldoActual.fechaIngreso ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.fechaIngreso }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Estado</span>
                </td>
                <td>
                  {{ empleado.estado }}
                </td>
                <td :class="empleado.estado != respaldoActual.estado ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.estado }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Departamento</span>
                </td>
                <td>
                  {{ empleado.departamento.nombre }}
                </td>
                <td :class="empleado.departamento.nombre != respaldoActual.departamento.nombre ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.departamento.nombre }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Fecha de baja </span>
                </td>
                <td>
                  {{ empleado.fechaBaja || 'Sin fecha' }}
                </td>
                <td :class="empleado.fechaBaja != respaldoActual.fechaBaja ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.fechaBaja || 'Sin fecha' }}
                </td>
              </tr>

              <tr>
                <td>
                  <span class="fw-bold text-color text-muted">Comentarios </span>
                </td>
                <td>
                  {{ empleado.comentarios || 'Sin comentarios' }}
                </td>
                <td :class="empleado.comentarios != respaldoActual.comentarios ? 'text-danger' : 'text-success'">
                  {{ respaldoActual.comentarios || 'Sin comentarios' }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="justify-content-center flex w-full">
            <Button
              icon="pi pi-arrow-left"
              class="ms-2 pointer-events-auto"
              severity="secondary"
              size="small"
              @click="anterior"
              :disabled="!tieneAnterior"
              :title="tieneAnterior ? 'No hay versiones anteriores' : 'Anterior'" />
            <Button icon="pi pi-check-circle" class="ms-2 pointer-events-auto" severity="primary" size="small" label="Restaurar" @click="restaurarRespaldo" title="Restaurar esta versión" />
            <Button
              icon="pi pi-arrow-right"
              class="ms-2 pointer-events-auto"
              severity="secondary"
              size="small"
              @click="siguiente"
              :disabled="!tieneSiguiente"
              :title="tieneSiguiente ? 'No hay versiones posteriores' : 'Siguiente'" />
          </div>
        </div>
        <div v-else>
          <p class="text-4xl">No hay versiones anteriores</p>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <Button icon="pi pi-times" class="ms-2" severity="secondary" label="Volver" @click="goBack" />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, nextTick, onMounted } from 'vue';
  import { useStore } from '@/stores/empleadoStore';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { useAlerts } from '@/components/useAlerts';

  export default defineComponent({
    name: 'seleccionar_empleado',
    setup() {
      const store = useStore();
      const alertas = useAlerts();
      const router = useRouter();
      const route = useRoute();
      const empleado = ref([]);
      const respaldos = ref([]);
      const respaldoActual = ref([]);
      const fechaUltimoCambio = ref([]);
      const fechaCambioAnterior = ref([]);
      const fechaRespaldoActual = ref([]);
      const hasHistory = ref(false);
      const numberOfVersions = ref(0);
      const currentVersion = ref(0);
      const idEmpleado = ref(route.params.id);
      const tieneSiguiente = ref(false);
      const tieneAnterior = ref(false);

      const getHistorial = async () => {
        var done = false;
        alertas.showLoading('Cargando datos');
        setTimeout(() => {
          if (!done) {
            alertas.closeLoading();
            alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
          }
        }, 5000);
        await store
          .getHistorial(idEmpleado.value)
          .then((data) => {
            if (store.data.length >= 1) {
              hasHistory.value = true;
              empleado.value = store.data[0].empleado;

              if (empleado.value.lenguas.length == 0) {
                empleado.value.lenguas = 'Sin lenguas';
              } else {
                empleado.value.lenguas = empleado.value.lenguas
                  .map((lengua) => {
                    return lengua.nombre;
                  })
                  .join(', ');
              }
              if (empleado.value.discapacidades.length == 0) {
                empleado.value.discapacidades = 'Sin discapacidades';
              } else {
                empleado.value.discapacidades = empleado.value.discapacidades
                  .map((discapacidad) => {
                    return discapacidad.nombre;
                  })
                  .join(', ');
              }

              for (let i = store.data.length - 1; i >= 0; i--) {
                const element = store.data[i];

                if (element.respaldo.lenguas.length === 0) {
                  element.respaldo.lenguas = 'Sin lenguas';
                } else {
                  element.respaldo.lenguas = element.respaldo.lenguas
                    .map((lengua) => {
                      return lengua.nombre;
                    })
                    .join(', ');
                }

                if (element.respaldo.discapacidades.length === 0) {
                  element.respaldo.discapacidades = 'Sin discapacidades';
                } else {
                  element.respaldo.discapacidades = element.respaldo.discapacidades
                    .map((discapacidad) => {
                      return discapacidad.nombre;
                    })
                    .join(', ');
                }

                element.respaldo.id = element.id;

                respaldos.value.push(element);
              }

              numberOfVersions.value = respaldos.value.length;

              currentVersion.value = 0;
              respaldoActual.value = respaldos.value[currentVersion.value].respaldo;

              fechaRespaldoActual.value = respaldos.value[currentVersion.value].fecha;
              fechaRespaldoActual.value = new Date(fechaRespaldoActual.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });

              fechaUltimoCambio.value = respaldos.value[0].fecha;
              fechaUltimoCambio.value = new Date(fechaUltimoCambio.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });

              if (currentVersion.value + 1 >= numberOfVersions.value) {
                fechaCambioAnterior.value = 'Original';
              } else {
                fechaCambioAnterior.value = respaldos.value[currentVersion.value + 1].fecha;
                fechaCambioAnterior.value = new Date(fechaCambioAnterior.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
              }
              tieneSiguiente.value = numberOfVersions.value > 1;

              tieneAnterior.value = false;
            } else {
              hasHistory.value = false;
            }
            alertas.closeLoading();
            done = true;
          })
          .catch((error) => {
            if (error.code === 'ERR_NETWORK') {
              alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
            } else {
              alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
            }
            done = true;
          });
      };

      const anterior = () => {
        if (currentVersion.value > 0) {
          currentVersion.value--;
          respaldoActual.value = respaldos.value[currentVersion.value].respaldo;
          fechaRespaldoActual.value = respaldos.value[currentVersion.value].fecha;
          fechaRespaldoActual.value = new Date(fechaRespaldoActual.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          fechaCambioAnterior.value = respaldos.value[currentVersion.value + 1].fecha;
          fechaCambioAnterior.value = new Date(fechaCambioAnterior.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          tieneAnterior.value = currentVersion.value > 0;
          tieneSiguiente.value = true;
        }
      };

      const siguiente = () => {
        if (currentVersion.value < numberOfVersions.value - 1) {
          currentVersion.value++;
          respaldoActual.value = respaldos.value[currentVersion.value].respaldo;
          fechaRespaldoActual.value = respaldos.value[currentVersion.value].fecha;
          fechaRespaldoActual.value = new Date(fechaRespaldoActual.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          if (currentVersion.value == numberOfVersions.value - 1) {
            fechaCambioAnterior.value = 'versión original';
          } else {
            fechaCambioAnterior.value = respaldos.value[currentVersion.value + 1].fecha;
            fechaCambioAnterior.value = new Date(fechaCambioAnterior.value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          }

          tieneSiguiente.value = currentVersion.value < numberOfVersions.value - 1;
          tieneAnterior.value = true;
        }
      };

      onMounted(() => {
        idEmpleado.value = route.params.id;
        getHistorial();
      });

      const restaurarRespaldo = () => {
        //ask for confirmation
        alertas.showQuestionAlert('Restaurar', '¿Está seguro de que desea restaurar este respaldo?', 'Sí, restaurar', 'Cancelar').then((result) => {
          if (result) {
            //Wait for response
            alertas.showLoading('Restaurando respaldo');
            //Restaurar
            store
              .restaurarRespaldo(respaldoActual.value.id)
              .then((data) => {
                setTimeout(() => {
                  alertas.closeLoading();
                  alertas.showSuccessAlert('Éxito', 'Se ha restaurado el respaldo').then(() => {
                    router.go(-1);
                  });
                }, 2000);
              })
              .catch((error) => {
                setTimeout(() => {
                  alertas.closeLoading();
                  if (error.code === 'ERR_NETWORK') {
                    alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
                  } else {
                    alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
                  }
                }, 2000);
              });
          }
        });
      };

      return {
        hasHistory,
        empleado,
        respaldos,
        currentVersion,
        numberOfVersions,
        tieneSiguiente,
        tieneAnterior,
        siguiente,
        anterior,
        restaurarRespaldo,
        respaldoActual,
        fechaRespaldoActual,
        fechaUltimoCambio,
        fechaCambioAnterior,
        goBack: () => {
          router.go(-1);
        },
      };
    },
  });
</script>
