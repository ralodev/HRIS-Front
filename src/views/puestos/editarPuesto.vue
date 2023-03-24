<template>
    <div class="container">
        <div class="card mt-4">
            <div class="card-header">
                <h4>Editar puesto</h4>
            </div>
            <form id="formEdit" class="needs-validation" novalidate>
                <div class="card-body">
                    <div class="row ms-0 mx-0">
                        <p class="text-muted h5">Datos del empleado</p>
                        <!-- Input número de tarjeta -->
                        <div class="col-md-3 my-2">
                            <label for="inputNumeroTarjeta" class="form-label">Número de tarjeta<b class="text-danger">*</b></label>
                            <div class="input-group">
                                <input v-model="data.empleado.numeroTarjeta" type="number" placeholder="000"
                                    class="form-control" id="numeroTarjeta" required/>
                                <button class="btn btn-secondary" type="button" id="button-addon2"
                                    @click="buscarEmpleado">Buscar</button>
                            </div>
                        </div>
                        <!-- Input nombre -->
                        <div class="col-md-6 my-2">
                            <label for="inputNombre" class="form-label">Nombre del empleado
                                <abbr class="initialism"
                                    title="Se completa automáticamente al buscar"><i
                                        class="bi bi-question-circle-fill"></i></abbr>
                            </label>
                            <input v-model="data.empleado.nombre" type="text" placeholder="Introduzca su nombre" class="form-control"
                                id="nombre" required disabled/>
                            <div class="valid-feedback">El empleado existe.</div>
                        </div>
                        <hr class="border border-2 border-dark mt-3" />
                        <p class="text-muted h5">Datos del puesto</p>
                        <!-- Input clavePresupuestal-->
                        <div class="col-md-6 my-2">
                            <label for="inputNombre" class="form-label">Clave Presupuestal<b class="text-danger">*</b></label>
                            <input v-model="data.clavePresupuestal" type="text" placeholder="Clave presupuestal, excluyendo 11300"
                                class="form-control" id="nombre" required />
                            <div class="invalid-feedback">Por favor introduzca una clave presupuestal válida</div>
                        </div>

                        <!-- Input tipoPlaza -->
                        <div class="col-md-6 my-2">
                            <label for="inputRFC" class="form-label">Tipo de plaza<b class="text-danger">*</b></label>
                            <input v-model="data.tipoPlaza" type="text" placeholder="Introduzca su RFC" class="form-control"
                                id="rfc" minlength="13" maxlength="13" required />
                            <div class="invalid-feedback">Por favor introduzca un RFC válido.</div>
                        </div>
                        <!-- Input categoria -->
                        <div class="col-md-4 my-2">
                            <label for="inputCURP" class="form-label">Categoría<b class="text-danger">*</b></label>
                            <input v-model="data.categoria" type="text" placeholder="Introduzca su CURP" class="form-control"
                                id="curp" maxlength="18" />
                            <div class="invalid-feedback">introduzca una CURP válida.</div>
                        </div>
                        <!-- Input numeroHorasNombramiento -->
                        <div class="col-3 col-md-6 my-2">
                            <label for="genero" class="form-label">Horas de nombramiento<b class="text-danger">*</b></label>
                            <input type="number" v-model="data.numeroHorasNombramiento" class="form-control" id="genero" name="selectSexo" required/>
                            <div class="invalid-feedback">Por favor seleccione un sexo.</div>
                        </div>
                    </div>
                </div>
                <div class="card-footer pb-4">
                    <span>
                        <b class="text-danger">*</b> Campos obligatorios
                    </span>
                    <button ref="submitButton" type="submit" class="btn btn-primary float-end me-1">Guardar</button>
                    <button type="button" class="btn btn-secondary float-end me-2" @click="cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { useDataStore } from '@/stores/dataStore'
import Swal from 'sweetalert2'
import { useRoute } from "vue-router";
import $ from "jquery";

export default defineComponent({
    name: "FormEmpleado",
    setup() {
        const store = useDataStore();
        const route = useRoute();
        const data = ref({
            empleado: "",
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
            clavePresupuestal: "",
            tipoPlaza: "",
            categoria: "",
            numeroHorasNombramiento: "",
        });
        const form = ref(null);
        const submitButton = ref(null);
        const isEdit = ref(false);
        const id = ref(null);

        onMounted(() => {
            if (route.params.id) {
                isEdit.value = true;
                id.value = route.params.id;
                store.getPuesto(id.value).then(() => {
                    data.value = store.puesto;
                    console.log(data.value)
                    nextTick(() => {
                        $(form.value).addClass("was-validated");
                    });
                });
            }
            console.log('data',data.value)
        });

        const submit = () => {
            if (form.value.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                if (isEdit.value) {
                    store.updateEmpleado(id.value, data.value).then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Empleado actualizado correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
                } else {
                    store.createEmpleado(data.value).then((res) => {
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
                    window.location.href = "/puestos";
                }
            });
        };

        return {
            data,
            form,
            submitButton,
            submit,
            cancelar,
        };
    },
});
</script>