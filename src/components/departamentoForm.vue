<template>
    <div class="container-lg pt-4 my-3">
        <div class="card shadow-5 border-round-2xl overflow-hidden">
            <div class="d-flex relative card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-person-fill-gear fw-bold h1 my-0" v-if="isEdit"></i>
                    <i class="bi bi-person-fill-add fw-bold h1 my-0" v-else></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0"> {{ isEdit ? ' Editar' : 'Registrar' }}
                        Departamento </span>
                </span>
                <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
                    class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px">
                </Button>
            </div>
            <form id="form">
                <div class="card-body">
                    <div class="grid">
                        <!-- Input correo -->
                        <div class="col-12 md:col-offset-3 md:col-6">
                            <label for="curp" class="form-label">Nombre del departamento<b class="p-error">*</b></label>
                            <InputText v-model="data.nombre"
                                placeholder="Direccion de correo electrónico, ej: nombre@ejemplo.com"
                                :class="['w-full', { 'p-invalid': error.nombre && validated }]" id="nombre"
                                autocomplete="off" @input="vCurp" />
                            <small v-if="validated" class="p-error">{{ error.nombre || '' }}</small>
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


        <div class="card mt-5 border-round-2xl overflow-hidden shadow-5">
            <Panel header="Tabla de empleados" toggleable>
                <div class="container table-responsive">
                    <table v-if="empleados.length > 0" class="table table-hover" id="empleados">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tarjeta</th>
                            <th>RFC</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Edad</th>
                            <th>Nivel académico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(empleado, index) in empleados" :key="index">
                            <td></td>
                            <td>{{ empleado.numeroTarjeta }}</td>
                            <td>{{ empleado.rfc }}</td>
                            <td>{{ empleado.nombre }}</td>
                            <td>{{ empleado.estado }}</td>
                            <td>{{ empleado.edad }}</td>
                            <td>{{ empleado.nivelAcademico }}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

            </Panel>
        </div>


    </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue';
import { useStore } from '@/stores/departamentoStore';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import Buttons from 'datatables.net-buttons-bs5';
import Responsive from 'datatables.net-responsive';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import InputText from 'primevue/inputtext';
import spanish from '@/assets/datatable/spanish.json';
import neutralise from 'datatables.net-plugins/filtering/type-based/accent-neutralise.mjs'

DataTable.use(DataTablesCore, Buttons, neutralise, Responsive);

export default defineComponent({
    name: 'DepartamentoForm',
    watch: {},
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    components: { DataTable },
    setup(props) {
        //prop to define if form is in edit mode or create mode
        const isEdit = ref(props.isEdit);
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const validated = ref(false);
        const isValid = ref(false);
        const error = ref({});
        const data = ref({});
        const id = ref(null);
        const empleados = ref({});
        const { showToast, showSuccessAlert, showConfirmAlert, showErrorAlert, showLoading, closeLoading } = useAlerts();
        const options = {
            responsive: true,
            autoWidth: true,
            dom: 'trip',
            paging: true,
            language: spanish
        };
        const columns = [
            { data: null, className: 'dt-control', orderable: false, defaultContent: '', width: '1%', class: '' },
            { data: 'numeroTarjeta', title: 'Tarjeta', width: '5%', class: '' },
            { data: 'rfc', title: 'RFC', class: '' },
            { data: 'curp', title: 'CURP', class: '' },
            { data: 'nombre', title: 'Nombre', class: '' },
            { data: 'estado', title: 'Estado', className: 'estado none' },
            { data: 'edad', title: 'Edad', className: 'never' },
            { data: 'nivelAcademico', title: 'Nivel académico', className: 'none' },
        ];

        onMounted(() => {
            if (isEdit.value) {
                showLoading();
                id.value = route.params.id;
                store.getDepartamento(id.value).then(() => {
                    data.value = store.data;
                    empleados.value = store.data.empleados;
                    console.log(data.value);
                    console.log(empleados.value);
                    nextTick(() => {
                        validated.value = true;
                        validate();
                        closeLoading();
                    });
                });
            }
        });

        const validate = () => {
            //Set validated to true to display the errors if any
            validated.value = true;
            //Reset isValid to true
            isValid.value = true;
            //run all the validations, if any fails, isValid will be false

            if (data.value.nombre == null || data.value.nombre == undefined || data.value.nombre == '') {
                error.value.nombre = 'El nombre es obligatorio';
                isValid.value = false;
            } else {
                error.value.nombre = '';
            }

            //if there are no errors, isValid will be true, then submit the form
            if (!isValid.value) {
                showToast('error', 'Verifique los campos marcados en rojo');
                return;
            }
        };
        const submit = () => {
            validate();

            let payload = { ...data.value };

            if (isEdit.value) {
                var email = data.value.email;
                //Ask for confirmation
                showConfirmAlert('¿Estás seguro?', 'Se actualizarán los datos del departamento', 'warning', 'Sí, actualizar', 'No, cancelar').then((isConfirmed) => {
                    //If the user confirms, try to update the employee
                    if (isConfirmed) {
                        store.putDepartamento(payload, email)
                            .then((response) => {
                                console.log(response);
                                if (response.status == 200) {
                                    showSuccessAlert('¡Éxito!', 'El departamento se ha actualizado correctamente', 'success', 'Aceptar').then(() => {
                                        showToast('info', 'Será redirigido a la lista de departamentos');
                                        setTimeout(() => {
                                            router.push({ name: 'departamentos' });
                                        }, 3000);
                                    });
                                } else {
                                    showErrorAlert('Error', response.response.data.mensaje, 'error', 'Aceptar');
                                }
                            })
                            .catch((error) => {
                                //If there is an error, show an error alert
                                showToast('error', 'Ocurrió un error al actualizar el departamento');
                            });
                    } else {
                        //If the user cancels, show a toast
                        showToast('info', 'No se actualizaron los datos');
                    }
                });
            } else {
                //Ask for confirmation
                showConfirmAlert('¿Estás seguro?', 'Se registrarán los datos del departamento', 'warning', 'Sí, registrar', 'No, cancelar').then((isConfirmed) => {
                    //If the user confirms, try to add the employee

                    //transform data.value to JSON

                    if (isConfirmed) {
                        store
                            .postDepartamento(payload)
                            .then((response) => {
                                if (response.status == 200) {
                                    //If the employee is added, show a success alert and redirect to the employees list
                                    showSuccessAlert('¡Éxito!', 'El departamento se ha registrado correctamente', 'success', 'Aceptar').then(() => {
                                        router.push({ name: 'departamento' });
                                    });
                                } else {
                                    showErrorAlert('Error', response.response.data.mensaje, 'error', 'Aceptar');
                                }
                            })
                            .catch((error) => {
                                //If there is an error, show an error alert
                                showToast('error', 'Ocurrió un error al registrar el departamento');
                            });
                    } else {
                        //If the user cancels, show a toast
                        showToast('info', 'No se registraron los datos');
                    }
                });
            }
        };

        const cancelar = () => {
            showConfirmAlert('¿Deseas cancelar?', 'Los cambios no guardados se perderán', 'question', 'Sí, cancelar', 'No, regresar').then((isConfirmed) => {
                if (isConfirmed) {
                    router.push({ name: 'departamentos' });
                }
            });
        };

        const eliminar = () => {
            Swal.fire({
                title: 'Se requiere confirmación',
                text: 'Esta acción eliminará al departamento de forma permanente y todos los empleados adscritos se quedarán sin departamento asignado. Esta acción solo la puede realizar el Administrador.',
                icon: 'warning',
                iconColor: '#dc3545',
                input: 'checkbox',
                inputValue: 0,
                inputPlaceholder: 'Entiendo, quiero continuar',
                confirmButtonText: 'Continuar <i class="bi bi-shield-exclamation"></i>',
                confirmButtonColor: '#dc3545',
                cancelButtonText: 'Cancelar</i>',
                showCancelButton: true,
                inputValidator: (result) => {
                    return !result && 'Debes confirmar que entiendes las consecuencias de esta acción';
                },
            }).then((result) => {
                if (result.value) {
                    store
                        .deleteDepartamento(data.value.email)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Éxito!',
                                text: 'El departamento ha sido eliminado de forma permanente',
                            }).then(() => {
                                router.push({ name: 'departamentos' });
                            });
                        })
                        .catch((error) => {
                            showToast('error', 'Ocurrió un error al eliminar el departamento');
                        });
                }
            });
        };

        return {
            options,
            empleados,
            columns,
            data,
            validate,
            submit,
            cancelar,
            error,
            validated,
            isEdit,
            eliminar,
            goBack: () => router.go(-1),
        };
    },
    components: { InputText },
});
</script>

<style>
.form-control {
    padding: 12px !important;
}
</style>
