<template>
    <div class="container-md  pt-4 my-3">
        <div class="card shadow-5 border-round-2xl overflow-hidden">
            <div class="d-flex relative card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-briefcase-fill fw-bold h1 my-0" v-if="isEdit"></i>
                    <i class="bi bi-briefcase-fill fw-bold h1 my-0" v-else></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        {{ isEdit ? ' Editar' : ' Registrar' }} plaza
                    </span>
                </span>
                <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
                    class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px;">
                </Button>
            </div>
            <form id="form" class="needs-validation" novalidate>
                <div class="card-body">
                    <div class="grid" v-if="data.empleado">
                        <div class="col-12 pb-0">
                            <span class="fs-5 fw-bold">Datos del empleado</span>
                            <Button v-if="!isEdit" icon="bi bi-arrow-repeat" class="float-end" @click="selectEmpleado" label="Cambiar"
                                size="small" severity="secondary" />
                        </div>
                        <div class="col-fixed pt-0">
                            <span class="my-auto ms-auto">
                                <i class="text-muted bi bi-person-square text-7xl"></i>
                            </span>
                        </div>
                        <div class="col-auto my-auto text-muted pt-0">
                            <span class="block text-lg"><span class="fw-bold text-lg">Nombre: </span>
                                {{ data.empleado.nombre }}</span>
                            <span class="block text-lg"><span class="fw-bold text-lg">RFC: </span> {{ data.empleado.rfc
                            }}</span>
                            <span class="block text-lg"><span class="fw-bold text-lg">Número de tarjeta: </span>
                                {{ data.empleado.numeroTarjeta }}</span>
                        </div>
                    </div>
                    <p class="fs-5 fw-bold my-3 d-block">Datos de la plaza</p>
                    <div class="grid">
                        <!-- Select nombramiento -->
                        <div class="col-12 xl:col-6">
                            <label for="clave" class="form-label">Nombramiento</label>
                            <Dropdown v-model="data.nombramiento" :options="opcNombramiento" optionLabel="nombre"
                                optionValue="nombre" placeholder="Seleccione el nombramiento"
                                :class="['w-full', { 'p-invalid': !data.nombramiento },]" />
                            <small class="p-error">{{ data.nombramiento ? '' : 'Debes elegir un valor' }}</small>
                        </div>
                        <!-- Input Clave Presupuestal -->
                        <div class="col-12 xl:col-6" v-if="data.nombramiento && data.nombramiento == 'DOCENTE'">
                            <label for="clave" class="form-label">Clave presupuestal<b class="p-error">*</b></label>
                            <InputMask v-model="data.clavePresupuestal" mask="9999 a999999.9999999" :autoClear="false"
                                placeholder="0000 X000000.000000"
                                :class="['w-full', { 'p-invalid': error.clavePresupuestal && validated },]"
                                @keyup="validarClave" />
                            <small v-if="validated" class="p-error">{{ error.clavePresupuestal || '' }}</small>
                        </div>
                        <div class="col-12 xl:col-6" v-if="data.nombramiento && data.nombramiento == 'ADMINISTRATIVO'">
                            <label for="clave" class="form-label">Clave presupuestal<b class="p-error">*</b></label>
                            <InputMask v-model="data.clavePresupuestal" mask="9999 aa9999999.9999999" :autoClear="false"
                                placeholder="0000 XX0000000.0000000"
                                :class="['w-full', { 'p-invalid': error.clavePresupuestal && validated },]"
                                @keyup="validarClave" />
                            <small v-if="validated" class="p-error">{{ error.clavePresupuestal || '' }}</small>
                        </div>
                        <!-- Input Tipo Plaza -->
                        <div class="col-12 xl:col-6">
                            <label for="clave" class="form-label">Tipo de plaza</label>
                            <Dropdown v-model="data.tipoPlaza" :options="opcTipoPlaza" optionLabel="value"
                                optionValue="value" placeholder="Seleccione la categoría" showClear
                                :class="['w-full', { 'p-invalid': error.tipoPlaza && validated },]" @change="vTipoPlaza" />
                        </div>
                        <!-- Dropdown categoria -->
                        <div class="col-12 md:col-7 lg:col-6">
                            <label for="inputTipoMovimiento" class="form-label">Categoría<b
                                    class="text-danger">*</b></label>
                            <Dropdown v-model="data.categoria" :options="opcCategoria" optionLabel="nombre"
                                optionValue="nombre" placeholder="Seleccione la categoría" showClear
                                :class="['w-full', { 'p-invalid': error.categoria && validated },]" @change="vCategoria" />
                            <small v-if="validated" class="p-error">{{ error.categoria || '' }}</small>
                        </div>
                        <!-- Input Horas nombramiento -->
                        <div class="col-12 lg:col-6">
                            <label for="horas" class="form-label">Horas de nombramiento<b class="p-error">*</b></label>
                            <InputText v-model="data.numeroHorasNombramiento" placeholder="Horas de nombramiento"
                                :class="['w-full', { 'p-invalid': error.numeroHorasNombramiento && validated },]" id="horas"
                                minlength="18" maxlength="50" @input="vNumeroHorasNombramiento" />
                            <small v-if="validated" class="p-error">{{ error.numeroHorasNombramiento || '' }}</small>
                        </div>
                        <!-- Input puesto -->
                        <div class="col-12 md:col-6">
                            <label for="puesto" class="form-label">Función que desempeña<b class="p-error">*</b></label>
                            <Dropdown v-model="data.funcion" :options="opcPuesto" optionLabel="nombre" optionValue="nombre"
                                placeholder="Seleccione la función que desempeña" showClear
                                :class="['w-full', { 'p-invalid': error.funcion && validated },]" @change="vFuncion" />
                            <small v-if="validated" class="p-error">{{ error.funcion || '' }}</small>
                        </div>
                        <!-- Input fecha inicio -->
                        <div class="col-6 md:col-4">
                            <label for="clave" class="form-label">Fecha de inicio
                                <i class="pi pi-question-circle ms-auto"
                                    v-tooltip="'Fecha en la que el empleado empezó a desempeñar el puesto'"></i>
                            </label>
                            <InputMask v-model="data.fechaInicio" mask="99/99/9999" :autoClear="true"
                                placeholder="dd/mm/aaaa" @keyup="vFechaInicio"
                                :class="['w-full', { 'p-invalid': error.fechaInicio && validated },]" />
                            <small v-if="validated" class="p-error">{{ error.fechaInicio || '' }}</small>
                        </div>
                        <!-- Dropdown estado -->
                        <div class="col-6 md:col-4">
                            <label for="inputEstado" class="form-label">Estado<b class="text-danger">*</b></label>
                            <Dropdown v-model="data.activo" :options="opcEstado" optionLabel="nombre" optionValue="value"
                                placeholder="Seleccione el estado" :class="['w-full', { 'p-invalid': error.estado && validated },
                                        { 'bg-red-50': !data.activo }, { 'bg-green-50': data.estado },]" required @change="vActivo" />
                            <small v-if="validated" class="p-error">{{ error.activo || '' }}</small>
                        </div>
                        <!-- Input fecha fin -->
                        <div class="col-6 md:col-4" v-if="!data.activo">
                            <label for="clave" class="form-label">Fecha de término
                                <i class="pi pi-question-circle"
                                    v-tooltip="'Fecha en la que el empleado dejó de desempeñar el puesto'"></i>
                                <b class="p-error"> *</b>
                            </label>
                            <InputMask v-model="data.fechaFin" mask="99/99/9999" :autoClear="true" placeholder="dd/mm/aaaa"
                                @keyup="vFechaFin" :class="['w-full', { 'p-invalid': error.fechaFin && validated },]" />
                            <small v-if="validated" class="p-error">{{ error.fechaFin || '' }}</small>
                        </div>
                        <div class="col-12" v-if="!data.activo">
                            <p class="text-red-500">
                                <b>Advertencia:</b> Una plaza con estado inactivo es una plaza que ya no se encuentra en
                                uso.
                                Su función es únicamente para fines históricos.
                                Una plaza inactiva no es tomada en cuenta para la creación de reportes.
                            </p>
                        </div>
                    </div>
                    <small><b class="text-danger">*</b> Campos obligatorios</small>
                </div>
                <div class="card-footer d-flex">
                    <Button v-if="isEdit" icon="pi pi-trash" class="me-2" label="Eliminar" @click="eliminar"
                        severity="danger" />
                    <Button icon="pi pi-check" id="submitButton" class="me-2 ms-auto" label="Guardar" @click="validate" />
                    <Button icon="pi pi-times" class="ms-2 float-end" severity="secondary" label="Cancelar"
                        @click="cancelar" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { optionsCategoria, optionsPuesto, optionsNombramiento, optionsSexo, optionsTipoMovimiento, optionsNivelAcademico, optionsEstadoPlaza, optionsLengua } from '@/assets/js/options';
import { tipoPlaza } from '@/assets/js/tipoPlaza';
import { useAlerts } from "@/components/useAlerts";
import { useStore as usePlazaStore } from "@/stores/plazaStore";
import { useStore as useEmpleadoStore } from "@/stores/empleadoStore";
import Swal from 'sweetalert2'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import $ from "jquery";

export default defineComponent({
    name: "PlazaForm",
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        //prop to define if form is in edit mode or create mode
        const isEdit = ref(props.isEdit);
        const numeroTarjeta = ref(props.id);
        const opcEstado = ref(optionsEstadoPlaza);
        // const options from options.js
        const opcCategoria = ref(optionsCategoria);
        const error = ref({});
        const opcTipoPlaza = ref(tipoPlaza);
        const opcNombramiento = ref(optionsNombramiento);
        const opcPuesto = ref(optionsPuesto);
        //const store = useDataStore();
        const plazaStore = usePlazaStore();
        const empleadoStore = useEmpleadoStore();
        const route = useRoute();
        const router = useRouter();
        const data = ref({
            id: '',
            empleado: ref({
                id: '',
                persona: ref({
                    id: '',
                    nombre: '',
                    rfc: '',
                    curp: '',
                    tipoMovimiento: '',
                    departamento: ref({
                        id: '',
                        nombre: ref(''),
                    })
                })
            }),
            clavePresupuestal: '',
            tipoPlaza: '',
            categoria: '',
            numeroHorasNombramiento: '',
            nombramiento: 'DOCENTE',
        });
        const form = ref(null);
        const id = ref(null);
        const validated = ref(false);
        const isValid = ref(false);
        const { showToast, showSuccessAlert, showConfirmAlert, showErrorAlert, showLoading, closeLoading } = useAlerts();

        onMounted(() => {
            id.value = route.params.id;
            if (isEdit.value) {
                plazaStore.getPlaza(id.value).then((response) => {
                    data.value = response.data;
                    data.value.fechaInicio = data.value.fechaInicio ? convertirFechaString(data.value.fechaInicio) : null;
                    data.value.fechaFin = data.value.fechaFin ? convertirFechaString(data.value.fechaFin) : null;
                });
            } else {
                empleadoStore.getEmpleado(id.value).then((response) => {
                    data.value.empleado = response.data;
                });
                data.value = {
                    id: '',
                    clavePresupuestal: '',
                    tipoPlaza: '',
                    categoria: '',
                    numeroHorasNombramiento: '',
                    nombramiento: 'DOCENTE',
                    activo: true,
                }
            }
        });

        const submit = () => {
            let newData = {
                "activo": data.value.activo,
                "categoria": data.value.categoria,
                "clavePresupuestal": data.value.clavePresupuestal,
                "fechaInicio": (data.value.fechaInicio == null || data.value.fechaInicio.replaceAll("_", "").replaceAll("/", "").length == 0) ? null : convertirFecha(data.value.fechaInicio),
                "fechaFin": (data.value.fechaFin == null || data.value.fechaFin.replaceAll("_", "").replaceAll("/", "").length == 0) ? null : convertirFecha(data.value.fechaFin),
                "nombramiento": data.value.nombramiento,
                "numeroHorasNombramiento": data.value.numeroHorasNombramiento,
                "funcion": data.value.funcion,
                "tipoPlaza": data.value.tipoPlaza,
                "empleado": data.value.empleado.id,
            };
            var descripcion = isEdit.value ? "Se actualizarán los datos de la plaza" : "Se creará una nueva plaza";
            var aceptar_text = isEdit.value ? "Sí, actualizar" : "Sí, crear";

            showConfirmAlert("¿Estás seguro?", descripcion, "warning", aceptar_text, "No, cancelar").then((isConfirmed) => {
                if (isEdit.value) {
                    if (!isConfirmed) {
                        showToast("info", "No se actualizaron los datos");
                        return;
                    }
                    plazaStore.putPlaza(newData, id.value).then((response) => {
                        console.log(response);
                        if (response.status == 200){
                            Swal.fire({
                                title: "¡Éxito!",
                                text: "Plaza actualizada correctamente",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Aceptar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                   router.push({ name: "plazas" });
                                }
                            });
                        } else {
                            showErrorAlert("Error", response.response.data.message);
                            return;
                        }
                    }).catch((error) => {
                        showErrorAlert("Error", error.response.data.message)
                    });
                } else {
                    if (!isConfirmed) {
                        showToast("info", "No se ha creado la plaza");
                        return;
                    }
                    plazaStore.postPlaza(newData).then((response) => {
                        if (response.status == 200){
                            Swal.fire({
                                title: "¡Éxito!",
                                text: "Plaza creada correctamente",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Aceptar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                   router.push({ name: "plazas" });
                                }
                            });
                        } else {
                            showErrorAlert("Error", response.response.data.message);
                            return;
                        }
                    });
                }
            });
        };

        const cancelar = () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "No se guardarán los cambios",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No, regresar",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push({ name: "plazas" });
                }
            });
        };

        function convertirFecha(fechaString) {
            if (fechaString == null || fechaString.length == 0) {
                return null;
            } else if (fechaString.length == 10) {
                var partesFecha = fechaString.split('/');
                var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
                try {
                    return fecha.toISOString().slice(0, 10);
                } catch (error) {
                    return null;
                }
            }
        }

        function convertirFechaString(fecha) {
            if (fecha == null || fecha.length == 0) {
                return null;
            } else {
                var partesFecha = fecha.split('-');
                var fechaString = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];
                return fechaString;
            }
        }

        const validarClave = () => {

            var clave = data.value.clavePresupuestal;

            if (clave == null || clave.length == 0) {
                error.value.clavePresupuestal = "La clave presupuestal es obligatoria";
                return;
            }

            if (clave.length > 5) {

                let parte_dos = clave.split(" ")[1].replaceAll("_", "").replaceAll(".", "")
                let caracter = parte_dos.charAt(0);
                let codigoPlaza = null;

                if (caracter == "E" && parte_dos.length >= 5) {
                    codigoPlaza = parte_dos.substring(0, 5);
                } else if (caracter == "I" && parte_dos.length >= 7) {
                    codigoPlaza = parte_dos.substring(0, 7);
                } else {
                    error.value.clavePresupuestal = "La clave presupuestal no es válida";
                    codigoPlaza = null;
                }

                // Buscar el código en el arreglo de opciones de tipo de plaza
                if (codigoPlaza != null) {
                    var tipo_plaza = opcTipoPlaza.value.find((tipo) => tipo.nombre == codigoPlaza) || null;

                    if (tipo_plaza == null) {
                        error.value.clavePresupuestal = "La clave presupuestal no coincide con ningún tipo de plaza";
                        return;
                    }
                    data.value.tipoPlaza = tipo_plaza.value;
                    vTipoPlaza();
                    //verificar si tipo_plaza contiene en la cadena TIEMPO COMPLETO, MEDIO TIEMPO o TRES CUARTOS DE TIEMPO
                    if (tipo_plaza.value.includes("TIEMPO COMPLETO")) {
                        data.value.categoria = "TIEMPO COMPLETO";
                    } else if (data.value.nombramiento == "ADMINISTRATIVO" && parte_dos.charAt(0) == "I") {
                        data.value.categoria = "TIEMPO COMPLETO";
                        data.value.numeroHorasNombramiento = 40;
                    } else if (tipo_plaza.value.includes("1/2 TIEMPO")) {
                        data.value.categoria = "MEDIO TIEMPO";
                    } else if (tipo_plaza.value.includes("3/4 DE TIEMPO")) {
                        data.value.categoria = "TRES CUARTOS DE TIEMPO";
                    } else if (tipo_plaza.value.includes("ASIGNATURA")) {
                        data.value.categoria = "HORAS DE ASIGNATURA";
                    }
                    vCategoria();
                }

            }
            vClavePresupuestal()
        };

        const vNombramiento = () => {
            if (!data.value.nombramiento) {
                error.value.nombre = "El nombramiento es obligatorio";
                isValid.value = false;
            } else {
                error.value.nombre = "";
            }
        };

        const vFuncion = () => {
            if (!data.value.funcion || data.value.funcion.length == 0 || data.value.funcion == null || data.value.funcion == undefined) {
                error.value.funcion = "La función es obligatoria";
                isValid.value = false;
            } else {
                error.value.funcion = "";
            }
        };

        const vFechaInicio = () => {

            if (data.value.fechaInicio == null || data.value.fechaInicio.replaceAll("_", "").replaceAll("/", "").length == 0) {
                error.value.fechaInicio = "";
                isValid.value = true;
                return;
            }

            if (data.value.fechaInicio.replaceAll("_", "").replaceAll("/", "").length != 8) {
                error.value.fechaInicio = "La fecha de ingreso no es válida";
                isValid.value = false;
                return;
            }


            let [dia, mes, anio] = data.value.fechaInicio.split("/");
            if (dia < 1 || dia > 31) {
                error.value.fechaInicio = "El día no es válido";
                isValid.value = false;
                return;
            } else if (mes < 1 || mes > 12) {
                error.value.fechaInicio = "El mes no es válido";
                isValid.value = false;
                return;
            } else if (anio < 1950) {
                error.value.fechaInicio = "El año no es válido";
                isValid.value = false;
                return;
            } else {
                error.value.fechaInicio = "";
            }


            let fecha_de_ingreso = convertirFecha(data.value.fechaInicio);
            if (!data.value.fechaInicio) {
                error.value.fechaInicio = "La fecha de ingreso es obligatoria";
                isValid.value = false;
                return;
            } else if (fecha_de_ingreso == null) {
                error.value.fechaInicio = "La fecha de ingreso no es válida";
                isValid.value = false;
                return;
            } else if (new Date(fecha_de_ingreso).getFullYear() > new Date().getFullYear() + 1) {
                error.value.fechaInicio = "La fecha de ingreso no puede ser mayor a 1 año a partir de la fecha actual";
                isValid.value = false;
                return;
            } else if (new Date(fecha_de_ingreso).getFullYear() < 1950) {
                error.value.fechaInicio = "La fecha de ingreso no puede ser menor a 1950";
                isValid.value = false;
                return;
            } else {
                error.value.fechaInicio = "";
            }
        };

        const vFechaFin = () => {

            if (data.value.fechaFin == null || data.value.fechaFin.replaceAll("_", "").replaceAll("/", "").length == 0) {
                error.value.fechaFin = "";
                isValid.value = true;
                return;
            }

            var fecha_de_fin = convertirFecha(data.value.fechaFin);
            var fecha_de_ingreso = convertirFecha(data.value.fechaInicio);
            if (!data.value.activo) {
                if (!data.value.fechaFin) {
                    error.value.fechaFin = "La fecha de fin es obligatoria";
                    isValid.value = false;
                } else if (fecha_de_fin == null) {
                    error.value.fechaFin = "La fecha de fin no es válida";
                    isValid.value = false;
                } else if (new Date(fecha_de_fin).getTime() < new Date(fecha_de_ingreso).getTime()) {
                    error.value.fechaFin = "La fecha de fin no puede ser menor a la fecha de ingreso";
                    isValid.value = false;
                } else {
                    error.value.fechaFin = "";
                }
            }
        };

        const vActivo = () => {
            if (data.value.activo == null) {
                error.value.activo = "El campo activo es obligatorio";
                isValid.value = false;
            } else {
                error.value.activo = "";
            }
        };

        const vNumeroHorasNombramiento = () => {
            if (!data.value.numeroHorasNombramiento) {
                error.value.numeroHorasNombramiento = "El número de horas es obligatorio";
                isValid.value = false;
            } else if (data.value.numeroHorasNombramiento < 0) {
                error.value.numeroHorasNombramiento = "El número de horas debe ser mayor a 0";
                isValid.value = false;
            } else if (data.value.categoria == "TIEMPO COMPLETO" && (data.value.numeroHorasNombramiento < 36 || data.value.numeroHorasNombramiento > 44)) {
                error.value.numeroHorasNombramiento = "El número de horas debe ser 40 (+/-) 4";
                isValid.value = false;
            } else if (data.value.categoria == "MEDIO TIEMPO" && (data.value.numeroHorasNombramiento < 18 || data.value.numeroHorasNombramiento > 22)) {
                error.value.numeroHorasNombramiento = "El número de horas debe ser 20 (+/-) 2";
                isValid.value = false;
            } else if (data.value.categoria == "TRES CUARTOS DE TIEMPO" && (data.value.numeroHorasNombramiento < 28 || data.value.numeroHorasNombramiento > 32)) {
                error.value.numeroHorasNombramiento = "El número de horas debe ser 30 (+/-) 2";
                isValid.value = false;
            } else if (data.value.categoria == "HORAS DE ASIGNATURA" && (data.value.numeroHorasNombramiento < 1 || data.value.numeroHorasNombramiento > 19)) {
                error.value.numeroHorasNombramiento = "No se puede asignar más de 19 horas de asignatura";
                isValid.value = false;
            } else {
                error.value.numeroHorasNombramiento = "";
            }
        };

        const vClavePresupuestal = () => {

            let clave = data.value.clavePresupuestal.replaceAll("_", "").replaceAll(".", "");

            if (!data.value.clavePresupuestal) {
                error.value.clavePresupuestal = "La clave presupuestal es obligatoria";
                isValid.value = false;
                return;
            }

            if (clave.length != 19 && clave.length != 21) {
                error.value.clavePresupuestal = "La clave presupuestal no es válida";
                isValid.value = false;
                return;
            }

            if (clave.charAt(5) == "E" && data.value.nombramiento != "DOCENTE") {
                error.value.clavePresupuestal = "La clave presupuestal corresponde a un docente";
                isValid.value = false;
                return;
            }

            if (clave.charAt(5) == "I" && data.value.nombramiento != "ADMINISTRATIVO") {
                error.value.clavePresupuestal = "La clave presupuestal corresponde a un administrativo";
                isValid.value = false;
                return;
            }

            if (clave.charAt(5) != "E" && clave.charAt(5) != "I") {
                error.value.clavePresupuestal = "La clave presupuestal no es válida";
                isValid.value = false;
                return;
            } else {
                error.value.clavePresupuestal = "";
            }
        }

        const vTipoPlaza = () => {
            if (!data.value.tipoPlaza) {
                error.value.tipoPlaza = "El tipo de plaza es obligatorio";
                isValid.value = false;
            } else {
                error.value.tipoPlaza = "";
            }
        };

        const vCategoria = () => {
            if (!data.value.categoria) {
                error.value.categoria = "La categoría es obligatoria";
                isValid.value = false;
            } else {
                error.value.categoria = "";
            }
        };

        const validate = () => {
            //Set validated to true to display the errors if any
            validated.value = true;
            //Reset isValid to true
            isValid.value = true;
            //run all the validations, if any fails, isValid will be false
            vFechaInicio();
            vFechaFin();
            validarClave();
            vNombramiento();
            vFuncion();
            vActivo();
            vNumeroHorasNombramiento();
            vClavePresupuestal();
            vTipoPlaza();
            vCategoria();
            //if there are no errors, isValid will be true, then submit the form
            if (isValid.value === true) {
                submit();
            }
            else {
                //send swal toast
                showToast("error", "Verifique los campos marcados en rojo");
            }
        };

        const eliminar = () => {
            Swal.fire({
                title: 'Se requiere confirmación',
                text: "Esta acción eliminará la plaza de forma permanente y no se puede revertir, se recomienda marcar la plaza como inactiva, en lugar de eliminarla. El administrador del sitio será notificado de esta acción.",
                icon: 'warning',
                iconColor: '#dc3545',
                input: 'checkbox',
                inputValue: 0,
                inputPlaceholder:
                    'Entiendo, quiero continuar',
                confirmButtonText:
                    'Continuar <i class="bi bi-shield-exclamation"></i>',
                confirmButtonColor: '#dc3545',
                cancelButtonText:
                    'Cancelar</i>',
                showCancelButton: true,
                inputValidator: (result) => {
                    return !result && 'Debes confirmar que entiendes las consecuencias de esta acción'
                }
            }).then((result) => {
                if (result.value) {
                    plazaStore.deletePlaza(data.value.id).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: 'La plaza ha sido eliminada de forma permanente',
                        }).then(() => {
                            router.push({ name: "plazas" });
                        })
                    }).catch((error) => {
                        showToast("error", "Ocurrió un error al eliminar la plaza");
                    });
                }
            })

        }

        return {
            isEdit,
            validate,
            validated,
            data,
            form,
            opcPuesto,
            cancelar,
            error,
            opcCategoria,
            opcEstado,
            opcTipoPlaza,
            opcNombramiento,
            validarClave,
            validarClave,
            vNombramiento,
            vFuncion,
            vFechaInicio,
            vFechaFin,
            vActivo,
            vNumeroHorasNombramiento,
            vClavePresupuestal,
            vTipoPlaza,
            vCategoria,
            eliminar,
            goBack: () => router.go(-1),
            selectEmpleado: () => router.push({ name: "seleccionar_empleado" }),
        };
    },
});
</script>