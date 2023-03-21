<template>
    <form id="formEdit" class="needs-validation" novalidate>
        <p class="h4 p-3">Datos del trabajador</p>
        <div class="row ms-0 mx-0">
            <!-- Input nombre-->
            <div class="col-md-12 my-2">
                <label for="inputNombre" class="form-label">Nombre completo<b class="text-danger">*</b></label>
                <input v-model="data.nombre" type="text" placeholder="Nombre completo, incluyendo apellidos"
                    class="form-control" id="nombre" required />
                <div class="invalid-feedback">Por favor introduzca el nombre.</div>
            </div>

            <!-- Input RFC -->
            <div class="col-md-4 my-2">
                <label for="inputRFC" class="form-label">RFC con homoclave<b class="text-danger">*</b></label>
                <input v-model="data.rfc" type="text" placeholder="Introduzca su RFC" class="form-control" id="rfc"
                    minlength="13" maxlength="13" required />
                <div class="invalid-feedback">Por favor introduzca un RFC válido.</div>
            </div>
            <!-- Input CURP -->
            <div class="col-md-5 my-2">
                <label for="inputCURP" class="form-label">CURP<b class="text-danger">*</b></label>
                <input v-model="data.curp" type="text" placeholder="Introduzca su CURP" class="form-control" id="curp"
                    maxlength="18" />
                <div class="invalid-feedback">introduzca una CURP válida.</div>
            </div>
            <!-- Input edad (disabled)-->
            <div class="col-5 col-md-3 my-2">
                <label for="inputNombre" class="form-label">Edad <abbr class="initialism"
                        title="Se calcula a partir de la CURP"><i class="bi bi-question-circle-fill"></i></abbr></label>
                <input type="text" placeholder="Sin calcular" class="form-control-plaintext" id="edad" readonly />
            </div>
            <!-- Input sexo (radio button) -->
            <div class="col-7 col-md-6 my-2">
                <label for="genero" class="form-label">Sexo<b class="text-danger">*</b></label>
                <select v-model="data.sexo" class="form-select" id="genero" name="selectSexo" required>
                    <option value="" selected hidden>...</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                </select>
                <div class="invalid-feedback">Por favor seleccione un sexo.</div>
            </div>
            <!-- Input discapacidad -->
            <div class="col-md-6 my-2">
                <label for="personalDiscapacidad" class="form-label">Discapacidad<b class="text-danger">*</b></label>
                <select v-model="data.discapacidad" class="form-select" id="personalDiscapacidad" name="selectDiscapacidad"
                    required>
                    <option value="" selected hidden class="text-muted">...</option>
                    <option value="NINGUNA">Ninguna</option>
                    <option value="MOTRIZ">Motriz</option>
                    <option value="MENTAL">Mental</option>
                    <option value="VISUAL">Visual</option>
                    <option value="AUDITIVA">Auditiva</option>
                    <option value="DEL HABLA">Del habla</option>
                    <option value="MÚLTIPLE">Múltiple</option>
                    <option value="FISICA">Fisica</option>
                    <option value="OTRA">Otra (no listada)</option>
                </select>
                <div class="invalid-feedback">Por favor seleccione una opción.</div>
            </div>
            <div class="col-md-6 my-2">
                <!-- Input nivel académico (Select) -->
                <label for="nivelAcademico" class="form-label">Nivel Académico<b class="text-danger">*</b></label>
                <select v-model="data.nivelAcademico" class="form-select" id="nivelAcademico" name="selectNA" required>
                    <option value="" selected hidden class="text-muted">...</option>
                    <option value="SUBESPECIALIDAD MEDICA">
                        Subespecialidad médica
                    </option>
                    <option value="DOCTORADO">Doctorado</option>
                    <option value="ESPECIALIDAD MEDICA">Especialidad médica</option>
                    <option value="MAESTRIA">Maestría</option>
                    <option value="ESPECIALIDAD">Especialidad</option>
                    <option value="LICENCIATURA">Licenciatura</option>
                    <option value="PASANTE">Pasante</option>
                    <option value="TECNICO SUPERIOR">Técnico superior</option>
                    <option value="BACHILLERATO">Bachillerato</option>
                    <option value="SECUNDARIA">Secundaria</option>
                    <option value="PRIMARIA">Primaria</option>
                </select>
                <div class="invalid-feedback">Por favor seleccione un nivel académico.</div>
            </div>
            <div class="col-md-6 my-2">
                <!-- Input correo -->
                <label for="inputCorreo" class="form-label">Correo institucional</label>
                <input v-model="data.correoInstitucional" type="email" placeholder="Correo @itoaxaca/@oaxaca.tecnm"
                    class="form-control" id="correo" pattern=".+@.+\..+" />
                <div class="invalid-feedback">Por favor introduzca un correo electrónico válido.</div>
            </div>

            <div class="col-md-12 my-2">
                <!-- Input profesion -->
                <label for="inputProfesion" class="form-label">Profesión</label>
                <input v-model="data.profesion" type="text" placeholder="Profesión" class="form-control" id="profesion" />
                <div class="invalid-feedback">Por favor introduzca la profesión.</div>
            </div>
            <!-- Input número de tarjeta -->
            <div class="col-md-5 my-2">
                <label for="inputNumeroTarjeta" class="form-label">Número de tarjeta<b class="text-danger">*</b></label>
                <input v-model="data.numeroTarjeta" type="number" placeholder="Número de tarjeta" class="form-control"
                    id="tarjeta" />
                <div class="invalid-feedback">Por favor introduzca un número de tarjeta válido.</div>
            </div>
            <div class="col-md-12 my-2">
                <!-- Input departamento -->
                <label for="inputDepartamento" class="form-label">Departamento de adscripción<b class="text-danger">*</b></label>
                <input v-model="data.departamento.nombre" type="text" placeholder="Seleccione el departamento"
                    class="form-control" id="departamento" />
                <div class="invalid-feedback">Por favor introduzca un departamento válido.</div>
            </div>

            <!-- Select tipo de movimiento with "BASE" "INTERINO" & "PREJUBILACION" -->
            <div class="col-md-6 my-2">
                <label for="inputTipoMovimiento" class="form-label">Tipo de movimiento<b class="text-danger">*</b></label>
                <select v-model="data.tipoMovimiento" class="form-select" id="tipoMovimiento" required>
                    <option value="" selected disabled hidden>...</option>
                    <option value="BASE">Base</option>
                    <option value="INTERINATO">Interinato</option>
                    <option value="PREJUBILACION">Prejubilación</option>
                </select>
                <div class="invalid-feedback">Por favor seleccione un tipo de movimiento.</div>
            </div>
            <div class="col-md-6 my-2">
                <!-- Input fecha de ingreso -->
                <label for="inputFechaIngreso" class="form-label">Fecha de ingreso<b class="text-danger">*</b></label>
                <input v-model="data.fechaIngreso" type="date" placeholder="31/12/1999" class="form-control"
                    id="fechaIngreso" required />
                <div class="invalid-feedback">Por favor introduzca una fecha de ingreso válida.</div>
            </div>
            <hr class="border border-secondary border-2 opacity-50 my-2">
            <div class="col-md-12">
                <!-- Input motivo de baja -->
                <label for="inputComentario" class="form-label">Comentarios</label>
                <input v-model="data.comentarios" type="text"
                    placeholder="Puedes escribir un comentario o descripción (opcional)" class="form-control"
                    id="inputComentario" />
                <div class="invalid-feedback">Por favor introduzca un comentario válido.</div>
            </div>
        </div>
        <div class="row mx-2 mt-3" name="bottom-row">
            <div class="col-7">
                <small class="text-muted">
                    Los campos marcados con <span class="text-danger fw-bold">*</span> son obligatorios.
                </small>
            </div>
            <div class="col-5 text-center d-flex align-items-center justify-content-end">
                <button type="button" class="btn btn-primary" id="submitButton">
                    Guardar
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { useEmpleadoStore } from '@/stores/empleadoStore'
import Swal from 'sweetalert2'
import { useRoute } from "vue-router";
import $ from "jquery";

export default defineComponent({
    name: "FormEmpleado",
    setup() {
        const empleadoStore = useEmpleadoStore();
        const route = useRoute();
        const data = ref({
            comentarios: "",
            departamento: "",
            fechaIngreso: "",
            nombre: "",
            numeroTarjeta: "",
            profesion: "",
            tipoMovimiento: "",
            correoInstitucional: "",
            curp: "",
            rfc: "",
            estado: "",
            motivoBaja: "",
            nivelAcademico: "",
            sexo: "",
        });
        const form = ref(null);
        const submitButton = ref(null);
        const isEdit = ref(false);
        const id = ref(null);

        onMounted(() => {
            if (route.params.id) {
                isEdit.value = true;
                id.value = route.params.id;
                empleadoStore.getEmpleado(id.value).then(() => {
                    data.value = empleadoStore.empleado;
                    console.log(data.value)
                    nextTick(() => {
                        $(form.value).addClass("was-validated");
                    });
                });
            }
        });

        const submit = () => {
            if (form.value.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                if (isEdit.value) {
                    empleadoStore.updateEmpleado(id.value, data.value).then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Empleado actualizado correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
                } else {
                    empleadoStore.createEmpleado(data.value).then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Empleado creado correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
                }
            }
            $(form.value).addClass("was-validated");
        };

        return {
            data,
            form,
            submitButton,
            submit,
        };
    },
});
</script>