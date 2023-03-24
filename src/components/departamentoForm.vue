<template>
    <div class="container">
        <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">Editar departamento</h4>
            </div>
            <form id="formEdit" class="needs-validation" novalidate>
            <div class="card-body">
                <div class="row ms-0 mx-0">
                    <!-- Input nombre-->
                    <div class="col-md-12 my-2">
                        <label for="inputNombre" class="form-label">Nombre<b class="text-danger">*</b></label>
                        <input v-model="data.nombre" type="text"
                            placeholder="Nombre del departamento, excluyendo 'Departamento de' o 'Dpto.' "
                            class="form-control" id="nombre" required />
                        <div class="invalid-feedback">Por favor introduzca el nombre.</div>
                    </div>
                    <!-- Select jefe -->
                    <div class="col-md-6 my-2">
                        <label for="inputJefe" class="form-label">Jefe del departamento</label>
                        <select v-model="data.jefe" class="form-select" id="jefe" required>
                            <option value="" selected>Seleccione un jefe</option>
                            <option v-for="jefe in jefes" :value="jefe.id">{{ jefe.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">Por favor seleccione un jefe.</div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button ref="submitButton" type="submit" class="btn btn-primary me-2" @click="submit">Guardar</button>
                <button type="button" class="btn btn-secondary" id="cancel-btn">Cancelar</button>
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
        const jefes = ref([]);

        onMounted(() => {
            if (route.params.id) {
                console.log(route.params.id)
                isEdit.value = true;
                id.value = route.params.id;
                store.getEmpleado(id.value).then(() => {
                    data.value = store.departamento;
                    console.log(data.value)
                    nextTick(() => {
                        $(form.value).addClass("was-validated");
                    });
                });
            }
            $("#cancel-btn").on("click", cancel);
        });

        const cancel = () => {
            window.history.back();
        };

        const submit = () => {
            if (form.value.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                if (isEdit.value) {
                    store.updateDepartamento(id.value, data.value).then((res) => {
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

        return {
            data,
            form,
            submitButton,
            submit,
        };
    },
});
</script>