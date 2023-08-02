<template>
    <div class="container-lg  pt-4 my-3">
        <div class="card shadow-5 border-round-2xl overflow-hidden">
            <div class="d-flex relative card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-person-fill-gear fw-bold h1 my-0" v-if="isEdit"></i>
                    <i class="bi bi-person-fill-add fw-bold h1 my-0" v-else></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        {{ isEdit ? ' Editar' : 'Registrar' }} empleado
                    </span>
                </span>
                <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
                    class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px;">
                </Button>
            </div>
            <form id="form">
                <div class="card-body">
                    <div class="grid">
                        <div class="col-12">
                            <span class="fs-5 fw-bold">Datos personales</span>
                            <Button v-if="isEdit" icon="pi pi-history"
                                class="float-end"
                                @click="verHistorial" label="Historial" size="small" severity="secondary" />
                            <Button v-if="isEdit" icon="pi pi-book"
                                class="float-end me-2"
                                @click="verExpediente" label="Expediente" size="small" severity="help" />
                        </div>
                        <!-- Input nombre-->
                        <div class="col-12 lg:col-6">
                            <label for="nombre" class="form-label">Nombre completo<b class="p-error">*</b></label>
                            <InputText v-model="data.nombre" placeholder="Nombre completo, incluyendo apellidos"
                                :class="['w-full', { 'p-invalid': error.nombre && validated }]" id="nombre"
                                @input="vNombre" />
                            <small v-if="validated" class="p-error">{{ error.nombre || '' }}</small>
                        </div>
                        <!-- Input RFC -->
                        <div class="col-12 md:col-4 lg:col-3">
                            <label for="rfc" class="form-label">RFC<b class="p-error">*</b></label>
                            <InputText v-model="data.rfc" placeholder="RFC con homoclave"
                                :class="['w-full', { 'p-invalid': error.rfc && validated },]" id="rfc" minlength="13"
                                maxlength="13" autocomplete="off" @input="vRfc" />
                            <small v-if="validated" class="p-error">{{ error.rfc || '' }}</small>
                        </div>
                        <!-- Input CURP -->
                        <div class="col-12 md:col-4 lg:col-3">
                            <label for="curp" class="form-label">CURP<b class="p-error">*</b></label>
                            <InputText v-model="data.curp" placeholder="CURP (18 caracteres)"
                                :class="['w-full', { 'p-invalid': error.curp && validated },]" id="curp" minlength="18"
                                maxlength="18" autocomplete="off" @input="vCurp" />
                            <small v-if="validated" class="p-error">{{ error.curp || '' }}</small>
                        </div>
                        <!-- Input edad (disabled)-->
                        <div v-if="isEdit" class="col-4 md:col-4 lg:col-3">
                            <label for="edad" class="form-label">Edad</label>
                            <InputText v-tooltip.top="'Calculado automáticamente'" v-model="data.edad" class="w-full"
                                :readonly="isEdit" />
                        </div>
                        <!-- Dropdown sexo -->
                        <div :class="[{'col-8 md:col-6': !isEdit},{'col-12 md:col-6 lg:col-3': isEdit}]">
                            <label for="genero" class="form-label">Sexo<b class="text-danger">*</b></label>
                            <Dropdown v-model="data.sexo" :options="opcSexo" optionLabel="nombre" optionValue="nombre"
                                placeholder="Seleccione el sexo"
                                :class="['w-full', { 'p-invalid': error.sexo && validated }]" showClear @change="vSexo" />
                            <small v-if="validated" class="p-error">{{ error.sexo || '' }}</small>
                        </div>
                        <!-- Dropdown nivel académico -->
                        <div class="col-12 md:col-6">
                            <label for="nivelAcademico" class="form-label">Nivel Académico<b
                                    class="text-danger">*</b></label>
                            <Dropdown v-model="data.nivelAcademico" :options="opcNivelAcademico" optionLabel="nombre"
                                inputId="nivelAcademico" optionValue="nombre" placeholder="Seleccione el nivel académico"
                                showClear :class="['w-full', { 'p-invalid': error.nivelAcademico && validated },]"
                                @change="vNivelAcademico" />
                            <small v-if="validated" class="p-error">{{ error.nivelAcademico || '' }}</small>
                        </div>
                        <!-- Input correo -->
                        <div class="col-12 md:col-6">
                            <label for="inputCorreo" class="form-label">Correo electrónico</label>
                            <InputText v-model="data.correoInstitucional" placeholder="Correo (institucional)"
                                :class="['w-full', { 'p-invalid': error.correoInstitucional && validated }]" id="correo"
                                @Input="vCorreoInstitucional" required />
                            <small v-if="validated" class="p-error">{{ error.correoInstitucional || '' }}</small>
                        </div>
                        <!-- Input profesion -->
                        <div class="col-12 md:col-6">
                            <label for="profesion" class="form-label">Profesión</label>
                            <InputText v-model="data.profesion" placeholder="Profesión" :class="['w-full',]"
                                id="profesion" />
                        </div>
                        <!-- Input Lengua indígena -->
                        <div class="col-12 md:col-6 lg:col-6">
                            <label for="genero" class="form-label">Lenguas indígenas</label>
                            <MultiSelect v-model="data.lenguas" :options="opcLenguas" optionLabel="nombre"
                                placeholder="Puede dejar este campo en blanco"
                                :selectedItemsLabel="'{0} discapacidades seleccionadas'" :maxSelectedLabels="3"
                                :selectionLimit="5" class="w-full" filter :showToggleAll="false"
                                :key="opcDiscapacidades.length" />
                        </div>
                        <!-- Dropdown discapacidad -->
                        <div class="col-12 md:col-6 lg:col-6">
                            <label for="genero" class="form-label">Discapacidades</label>
                            <MultiSelect v-model="data.discapacidades" :options="opcDiscapacidades" optionLabel="nombre"
                                placeholder="Puede dejar este campo en blanco"
                                :selectedItemsLabel="'{0} discapacidades seleccionadas'" :maxSelectedLabels="3"
                                :selectionLimit="5" class="w-full" filter :showToggleAll="false"
                                :key="opcDiscapacidades.length" />
                        </div>
                        <div class="col-12">
                            <span class="fs-5 fw-bold">Datos laborales</span>
                        </div>
                        <!-- Input número de tarjeta -->
                        <div class="col-6 md:col-6 lg:col-4">
                            <label for="tarjeta" class="form-label">Número de tarjeta<b class="text-danger">*</b></label>
                            <InputText v-model="data.numeroTarjeta" placeholder="Número de tarjeta" type="number"
                                :class="['w-full', { 'p-invalid': error.numeroTarjeta && validated, },]" id="tarjeta"
                                @input="vNumeroTarjeta" />
                            <small v-if="validated" class="p-error">{{ error.numeroTarjeta || '' }}</small>
                        </div>
                        <!-- Dropdown departamento -->
                        <div class="col-12 md:col-6 lg:col-4">
                            <label for="inputDepartamento" class="form-label">Departamento de adscripción<b
                                    class="text-danger">*</b></label>
                            <Dropdown v-model="data.departamento" :options="opcDepartamento" optionLabel="nombre"
                                placeholder="Seleccione el departamento" showClear
                                :class="['w-full', { 'p-invalid': error.departamento && validated },]"
                                @change="vDepartamento" />
                            <small v-if="validated" class="p-error">{{ error.departamento || '' }}</small>
                        </div>
                        <!-- Dropdown tipo de movimiento -->
                        <div class="col-6 md:col-6 lg:col-4">
                            <label for="inputTipoMovimiento" class="form-label">Tipo de movimiento<b
                                    class="text-danger">*</b></label>
                            <Dropdown v-model="data.tipoMovimiento" :options="opcTipoMovimiento" optionLabel="nombre"
                                optionValue="nombre" placeholder="Seleccione el tipo de movimiento" showClear
                                :class="['w-full', { 'p-invalid': error.tipoMovimiento && validated },]"
                                @change="vTipoMovimiento" />
                            <small v-if="validated" class="p-error">{{ error.tipoMovimiento || '' }}</small>
                        </div>
                        <!-- Input fecha de ingreso -->
                        <div class="col-6 md:col-4">
                            <label for="fechaIngreso" class="form-label">Fecha de ingreso<b
                                    class="text-danger">*</b></label>
                            <input v-model="data.fechaIngreso" type="date" placeholder="dd/mm/aaaa" class="form-control"
                                id="fechaIngreso" @change="vFechaIngreso" />
                            <small v-if="validated" class="p-error">{{ error.fechaIngreso || '' }}</small>
                        </div>
                        <!-- Dropdown estado -->
                        <div class="col-6 md:col-4">
                            <label for="inputEstado" class="form-label">Estado del empleado<b
                                    class="text-danger">*</b></label>
                            <Dropdown v-model="data.estado" :options="opcEstado" optionLabel="nombre" optionValue="nombre"
                                placeholder="Seleccione el estado" showClear
                                :class="['w-full', { 'p-invalid': error.estado && validated },
                                        { 'bg-red-50': data.estado === 'BAJA' }, { 'bg-yellow-50': data.estado === 'INACTIVO' }, { 'bg-green-50': data.estado === 'ACTIVO' },]"
                                @change="vEstado" required />
                            <small v-if="validated" class="p-error">{{ error.estado || '' }}</small>
                        </div>
                        <!-- Input fecha de baja -->
                        <div class="col-6 md:col-4" v-if="data.estado === 'BAJA'">
                            <label for="fechaBaja" class="form-label">Fecha de baja</label>
                            <input v-model="data.fechaBaja" type="date" placeholder="dd/mm/aaaa"
                                class="form-control p-invalid" id="fechaBaja" />
                            <small v-if="validated" class="p-error">{{ error.fechaBaja || '' }}</small>
                        </div>
                        <!-- Input comentarios -->
                        <div class="col-12 md:col-12">
                            <label for="inputComentario" class="form-label">Comentarios</label>
                            <TextArea v-model="data.comentarios" placeholder="Comentario o descripción (opcional)"
                                :class="['w-full',]" id="comentarios" rows="1" autoResize />
                        </div>
                    </div>
                    <small><b class="text-danger">*</b> Campos obligatorios</small>
                </div>
                <div class="card-footer d-flex">
                    <Button v-if="isEdit" icon="pi pi-trash" class="me-2" label="Eliminar" @click="eliminar"
                        severity="danger" />
                    <Button icon="pi pi-check" id="submitButton" class="me-2 ms-auto" label="Guardar" @click="submit" />
                    <Button icon="pi pi-times" class="ms-2 float-end" severity="secondary" label="Cancelar"
                        @click="cancelar" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue';
import { useStore as useEmpleadoStore } from '@/stores/empleadoStore';
import { useStore as useDepartamentoStore } from '@/stores/departamentoStore';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { optionsDiscapacidades, optionsSexo, optionsTipoMovimiento, optionsNivelAcademico, optionsEstado, optionsLengua } from '@/assets/js/options';
import { useAlerts } from '@/components/useAlerts';
import InputText from 'primevue/inputtext';

export default defineComponent({
    name: "EmpleadoForm",
    watch: {
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        //prop to define if form is in edit mode or create mode
        const isEdit = ref(props.isEdit);
        // const options from options.js
        const opcSexo = ref(optionsSexo);
        const opcLenguas = ref(optionsLengua);
        const opcTipoMovimiento = ref(optionsTipoMovimiento);
        const opcEstado = ref(optionsEstado);
        const opcDiscapacidades = ref(optionsDiscapacidades);
        const opcNivelAcademico = ref(optionsNivelAcademico);
        const route = useRoute();
        const router = useRouter();
        const empleadoStore = useEmpleadoStore();
        const departamentoStore = useDepartamentoStore();
        const opcDepartamento = ref([]);
        const validated = ref(false);
        const isValid = ref(false);
        const error = ref({});
        const data = ref({});
        const id = ref(null);
        const alertas = useAlerts();
        const { showToast, showSuccessAlert, showConfirmAlert, showErrorAlert, showLoading, closeLoading } = useAlerts();
        onMounted(() => {
            //PREPARE DATA
            alertas.showLoading('Cargando datos...');
            //Fetch departamentos to fill dropdown list
            departamentoStore.getDepartamentos().then(() => {
                opcDepartamento.value = departamentoStore.data;
                opcDepartamento.value.forEach((element) => {
                    delete element.empleados;
                });


                //If is edit, fetch data of the employee
                if (isEdit.value) {
                    empleadoStore.getEmpleado(route.params.id).then(() => {
                        data.value = empleadoStore.data;
                        nextTick(() => {
                            alertas.closeLoading();
                            validated.value = true;
                            validate();
                            closeLoading();
                        });
                    });
                }else {
                    alertas.closeLoading();

                    data.value = {
                        nombre: "RAUL LOPEZ CRUZ",
                        rfc: "LOCR960727HOC",
                        curp: "LOCR960727HOCPRL03",
                        sexo: "MASCULINO",
                        discapacidades: "",
                        lenguas: "",
                        nivelAcademico: "LICENCIATURA",
                        correoInstitucional: "LOPEZ.CRUZ@CORREO.MAIL",
                        profesion: "PROFESOR",
                        numeroTarjeta: Number("69420"),
                        departamento: null,
                        tipoMovimiento: "PREJUBILACION",
                        fechaIngreso: "",
                        estado: "ACTIVO",
                        fechaBaja: "",
                        comentarios: "ESTO ES UNA PRUEBA",
                    };

                }
            });

        });
        function vNombre() {
            if (!data.value.nombre) {
                error.value.nombre = "El nombre es obligatorio";
                isValid.value = false;
            }
            else {
                error.value.nombre = "";
            }
        }
        function vRfc() {
            if (!data.value.rfc) {
                error.value.rfc = "El RFC es obligatorio";
                isValid.value = false;
                document.getElementById("rfc").focus();
            }
            else {
                if (!/^[A-Z]{4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{3}$/.test(data.value.rfc)) {
                    error.value.rfc = "El RFC no tiene un formato válido";
                    isValid.value = false;
                    document.getElementById("rfc").focus();
                }
                else {
                    error.value.rfc = "";
                    vCurp();
                }
            }
        }
        function vCurp() {

            if (!data.value.curp) {
                error.value.curp = "La CURP es obligatoria";
                isValid.value = false;
                document.getElementById("curp").focus();
            }
            else if (!/^[A-Z]{4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CH|CL|CM|CS|DF|DG|GR|GT|HG|JC|MC|MN|MS|NE|NL|NT|OC|PL|QT|QR|SP|SL|SR|TC|TL|TS|VZ|YN|ZS)[A-Z]{3}[0-9A-Z]{2}$/.test(data.value.curp)) {
                error.value.curp = "La CURP no tiene un formato válido";
                isValid.value = false;
                document.getElementById("curp").focus();
            }
            else {
                if (data.value.rfc.substring(0, 10) != data.value.curp.substring(0, 10)) {
                    error.value.curp = "La CURP no coincide con el RFC";
                    isValid.value = false;
                    document.getElementById("curp").focus();
                }
                else {
                    error.value.curp = "";
                    vSexo();
                }
            }
        }
        function vSexo() {
            if (!data.value.sexo) {
                error.value.sexo = "El sexo es obligatorio";
                isValid.value = false;
            }
            else if (data.value.sexo == "MASCULINO" && data.value.curp.substring(10, 11) != "H" || data.value.sexo == "FEMENINO" && data.value.curp.substring(10, 11) != "M") {
                error.value.sexo = "El sexo no coincide con la CURP";
                isValid.value = false;
            }
            else {
                error.value.sexo = "";
            }
        }
        function vNivelAcademico() {
            if (!data.value.nivelAcademico) {
                error.value.nivelAcademico = "El nivel académico es obligatorio";
                isValid.value = false;
                document.getElementById("nivelAcademico").focus();
            }
            else {
                error.value.nivelAcademico = "";
            }
        }
        function vCorreoInstitucional() {
            if (!data.value.correoInstitucional) {
                error.value.correoInstitucional = "El correo institucional es obligatorio";
                isValid.value = false;
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.value.correoInstitucional)) {
                error.value.correoInstitucional = "El correo no tiene un formato válido";
                isValid.value = false;
            }
            else {
                error.value.correoInstitucional = "";
            }
        }
        function vNumeroTarjeta() {
            if (!data.value.numeroTarjeta) {
                error.value.numeroTarjeta = "El número de tarjeta es obligatorio";
                isValid.value = false;
            }
            else {
                error.value.numeroTarjeta = "";
            }
        }
        function vDepartamento() {
            if (!data.value.departamento) {
                error.value.departamento = "Debe seleccionar un departamento";
                isValid.value = false;
            }
            else {
                error.value.departamento = "";
            }
        }
        function vTipoMovimiento() {
            if (!data.value.tipoMovimiento) {
                error.value.tipoMovimiento = "Debe seleccionar el tipo de movimiento";
                isValid.value = false;
            }
            else {
                error.value.tipoMovimiento = "";
            }
        }
        function vFechaIngreso() {
            var currentYear = new Date().getFullYear();
            if (!data.value.fechaIngreso) {
                error.value.fechaIngreso = "La fecha de ingreso es obligatoria";
                isValid.value = false;
                //else check if the date is valid (year>1950 and year<current year)
            }
            else if (data.value.fechaIngreso.substring(0, 4) < 1900 || data.value.fechaIngreso.substring(0, 4) > currentYear) {
                error.value.fechaIngreso = "La fecha de ingreso no es válida";
                isValid.value = false;
            }
            else {
                error.value.fechaIngreso = "";
            }
        }
        function vEstado() {
            if (!data.value.estado) {
                error.value.estado = "El estado es obligatorio";
                isValid.value = false;
            }
            else if (data.value.estado == "BAJA" && !data.value.fechaBaja) {
                error.value.fechaBaja = "Debe ingresar la fecha de baja";
                isValid.value = false;
            }
            else {
                error.value.fechaBaja = "";
                error.value.estado = "";
            }
        }
        const validate = async () => {
            //Set validated to true to display the errors if any
            validated.value = true;
            //Reset isValid to true
            isValid.value = true;
            //run all the validations, if any fails, isValid will be false
            vNombre();
            vRfc();
            vCurp();
            vSexo();
            vNivelAcademico();
            vCorreoInstitucional();
            vNumeroTarjeta();
            vDepartamento();
            vTipoMovimiento();
            vEstado();
            vFechaIngreso();
            //if there are no errors, isValid will be true, then submit the form
            if (isValid.value) {
                return true;
            } else {
                return false;
            }
        };
        const submit = () => {

            validate().then((response) => {
                if (!response) {
                    console.log(response);
                    showToast("error", "Verifique los campos marcados en rojo");
                    return;
                }
            });

            let payload = { ...data.value };

            if (data.value.discapacidades == null || data.value.discapacidades == undefined || data.value.discapacidades == "") {
                payload.discapacidades = [];
            }
            if (data.value.lenguas == null || data.value.lenguas == undefined || data.value.lenguas == "") {
                payload.lenguas = [];
            }


            if (isEdit.value) {
                var idPersona = data.value.id; //WILL FAIL ON PURPOSE
                //Ask for confirmation
                showConfirmAlert("¿Estás seguro?", "Se actualizarán los datos del empleado", "warning", "Sí, actualizar", "No, cancelar").then((isConfirmed) => {
                    //If the user confirms, try to update the employee
                    if (isConfirmed) {
                        empleadoStore.putEmpleado(payload, idPersona).then((response) => {
                            if (response.status == 200) {
                                showSuccessAlert("¡Éxito!", "El empleado se ha actualizado correctamente", "success", "Aceptar").then(() => {

                                        router.push({ name: "empleados" });
                                });
                            } else {
                                showErrorAlert("Error", response.response.data.mensaje, "error", "Aceptar");
                            }
                        }).catch((error) => {
                            //If there is an error, show an error alert
                            showToast("error", "Ocurrió un error al actualizar el empleado");
                        });
                    }
                    else {
                        //If the user cancels, show a toast
                        showToast("info", "No se actualizaron los datos");
                    }
                });
            }
            else {
                //Ask for confirmation
                showConfirmAlert("¿Estás seguro?", "Se registrarán los datos del empleado", "warning", "Sí, registrar", "No, cancelar").then((isConfirmed) => {
                    //If the user confirms, try to add the employee

                    //transform data.value to JSON

                    if (isConfirmed) {
                        empleadoStore.postEmpleado(payload).then((response) => {
                            if (response.status == 200) {
                                //If the employee is added, show a success alert and redirect to the employees list
                                showSuccessAlert("¡Éxito!", "El empleado se ha registrado correctamente", "success", "Aceptar").then(() => {
                                    router.push({ name: "empleados" });
                                });
                            } else {
                                showErrorAlert("Error", response.response.data.mensaje, "error", "Aceptar");
                            }
                        }).catch((error) => {
                            //If there is an error, show an error alert
                            showToast("error", "Ocurrió un error al registrar el empleado");
                        });
                    }
                    else {
                        //If the user cancels, show a toast
                        showToast("info", "No se registraron los datos");
                    }
                });
            }
        };
        const cancelar = () => {
            showConfirmAlert("¿Deseas cancelar?", "Los cambios no guardados se perderán", "question", "Sí, cancelar", "No, regresar").then((isConfirmed) => {
                if (isConfirmed) {
                    router.push({ name: "empleados" });
                }
            });
        };
        const eliminar = () => {
            Swal.fire({
                title: 'Se requiere confirmación',
                text: "Esta acción eliminará al empleado de forma permanente y no se puede revertir, se recomienda dar de baja al empleado en lugar de eliminarlo. El administrador del sitio será notificado de esta acción.",
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
                    empleadoStore.deleteEmpleado(data.value.id).then((response) => {
                        if(response.status == 200 || response.status == 204){
                            Swal.fire({
                                icon: 'success',
                                title: '¡Éxito!',
                                text: 'El empleado ha sido eliminado de forma permanente',
                            }).then(() => {
                                router.push({ name: "empleados" });
                            })
                        } else {
                            showErrorAlert("Error", response.response.data.mensaje, "error", "Aceptar");
                        }
                    }).catch((error) => {
                        console.log(error)
                        showToast("error", "Ocurrió un error al eliminar el empleado");
                    });

                }
            })

        }
        return {
            data,
            validate,
            submit,
            cancelar,
            opcDiscapacidades,
            opcSexo,
            opcNivelAcademico,
            error,
            validated,
            isEdit,
            opcDepartamento,
            opcTipoMovimiento,
            opcEstado,
            opcLenguas,
            vNombre,
            vRfc,
            vCurp,
            vSexo,
            vNivelAcademico,
            vCorreoInstitucional,
            vNumeroTarjeta,
            vDepartamento,
            vTipoMovimiento,
            vFechaIngreso,
            vEstado,
            eliminar,
            verExpediente: () => router.push({ name: "empleados_expediente", params: { id: data.value.id } }),
            goBack: () => router.go(-1),
            verHistorial: () => router.push({ name: "empleados_historial", params: { id: data.value.id } }),
        };
    },
    components: { InputText }
});
</script>

<style>
.form-control {
    padding: 12px !important
}
</style>