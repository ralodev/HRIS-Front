<template>
    <!-- Puestos -->
    <div class="container-lg pt-4 my-3">

        <!-- Card -->
        <div class="card shadow-5 border-round-2xl overflow-hidden mx-auto" style="max-width: 500px;">
            <div class="d-flex card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-key-fill fw-bold h1 my-0"></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        Cambiar contraseña
                    </span>
                </span>
            </div>
            <div class="card-body table-responsive">

                <div class="grid mb-2">
                    <div class="col-12 flex">

                        <form @submit.prevent="cambiarContrasena">
                            <label>Contraseña actual</label>
                            <Password v-model="data.contrasenaActual" class="w-100 mb-3" :feedback="false" toggleMask
                                @keyup="passChange" inputId="current"/>


                            <label>Escribe una nueva contraseña</label>
                            <Password v-model="data.contrasenaNueva" toggleMask class="w-100 mb-3" @keyup="passChange"
                                :mediumRegex="'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&*+-.?@_]).{6,20}$'"
                                :strongRegex="'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&*+-.?@_]).{8,20}$'"
                                :weakLabel="'No cumple con los requisitos mínimos de seguridad'"
                                :mediumLabel="'Ya casi tienes una contraseña segura'" inputId="new1">
                                <template #header>
                                    <h6>Seguridad de la contraseña</h6>
                                </template>
                                <template #footer>
                                    <Divider />
                                    <p class="mt-2">La contraseña debe tener:</p>
                                    <ul class="pl-2 ml-2 mt-0 list-none" style="line-height: 1.5">
                                        <li>
                                            <i v-if="tieneMayuscula" class="pi pi-check-circle text-success"></i>
                                            <i v-else class="pi pi-circle"></i>
                                            Por lo menos una mayúscula
                                        </li>
                                        <li>
                                            <i v-if="tieneMinuscula" class="pi pi-check-circle text-success"></i>
                                            <i v-else class="pi pi-circle"></i>
                                            Por lo menos una minúscula

                                        </li>
                                        <li>
                                            <i v-if="tieneNumero" class="pi pi-check-circle text-success"></i>
                                            <i v-else class="pi pi-circle"></i>
                                            Por lo menos un número
                                        </li>
                                        <li>
                                            <i v-if="tieneSimbolo" class="pi pi-check-circle text-success"></i>
                                            <i v-else class="pi pi-circle"></i>
                                            Por lo menos un símbolo (!#$%&*+-.?@_)
                                        </li>
                                        <li>
                                            <i v-if="tamanoOk" class="pi pi-check-circle text-success"></i>
                                            <i v-else class="pi pi-circle"></i>
                                            Entre 8 y 20 caracteres
                                        </li>
                                    </ul>
                                </template>
                            </Password>
                            <label>Repite tu nueva contraseña</label>
                            <Password v-model="data.confirmarNueva"
                                :class="[{ 'p-invalid': data.contrasenaNueva !== data.confirmarNueva }]" class="w-100 mb-3"
                                :feedback="false" toggleMask @keyup="passChange" inputId="new2" />
                            <Button type="submit" id="subPass" label="Cambiar contraseña" icon="pi pi-check"
                                class="float-end p-disabled" raised />
                        </form>

                    </div>
                    <div class="col-12 lg:col-6">

                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted } from 'vue';
import { useStore } from '@/stores/usuarioStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';

export default defineComponent({
    name: 'opciones',
    setup() {

        const store = useStore();
        const alertas = useAlerts();
        const router = useRouter();
        const data = ref({
            contrasenaActual: '',
            contrasenaNueva: '',
            confirmarNueva: '',
        });
        const tieneMayuscula = ref(false);
        const tieneMinuscula = ref(false);
        const tieneNumero = ref(false);
        const tieneSimbolo = ref(false);
        const tamanoOk = ref(false);
        const nuevaContrasenaOk = ref(false);
        const todoOk = ref(false);

        const passChange = () => {
            console.log('pass changed')
            if (data.value.contrasenaNueva !== '' && data.value.contrasenaNueva !== null && data.value.contrasenaNueva !== undefined) {
                tieneMayuscula.value = /[A-Z]/.test(data.value.contrasenaNueva);
                tieneMinuscula.value = /[a-z]/.test(data.value.contrasenaNueva);
                tieneNumero.value = /[0-9]/.test(data.value.contrasenaNueva);
                tieneSimbolo.value = /.*[!#$%&*+-.?@_]/.test(data.value.contrasenaNueva);
                tamanoOk.value = /^.{8,20}$/.test(data.value.contrasenaNueva);
                nuevaContrasenaOk.value = tieneMayuscula.value && tieneMinuscula.value && tieneNumero.value && tieneSimbolo.value && tamanoOk.value;
                todoOk.value = nuevaContrasenaOk.value && data.value.contrasenaNueva === data.value.confirmarNueva && data.value.contrasenaActual !== '' && data.value.contrasenaActual !== null && data.value.contrasenaActual !== undefined;
                if (todoOk.value) {
                    document.getElementById('subPass').classList.remove('p-disabled');
                } else {
                    document.getElementById('subPass').classList.add('p-disabled');
                }
            } else {
                tieneMayuscula.value = false;
                tieneMinuscula.value = false;
                tieneNumero.value = false;
                tieneSimbolo.value = false;
                tamanoOk.value = false;
            }
        };

        const cambiarContrasena = async () => {
            if (todoOk.value) {
                let done = false;
                alertas.showLoading('Actualizando contraseña');

                setTimeout(() => {
                    if (!done) {
                        alertas.closeLoading();
                        alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
                    }
                }, 5000);

                let payload = {
                    contrasenaActual: data.value.contrasenaActual,
                    contrasenaNueva: data.value.contrasenaNueva,
                };

                await store.changePassword(payload).then(() => {
                    alertas.closeLoading();
                    done = true;
                    alertas.showSuccessAlert('Éxito', 'Contraseña actualizada correctamente');
                }).catch((error) => {
                    if (error.code === "ERR_NETWORK") {
                        alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
                    } else {
                        alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
                    }
                    done = true;
                });
            }


        };

        onMounted(() => {
            document.querySelectorAll('input[type="password"]').forEach((input) => {
                input.setAttribute('maxlength', 20);
                input.classList.add('w-100');
            });
            document.getElementById('current').setAttribute('autocomplete', 'current-password');
            document.getElementById('new1').setAttribute('autocomplete', 'new-password');
            document.getElementById('new2').setAttribute('autocomplete', 'new-password');
        });


        return {
            data,
            tieneMayuscula,
            tieneMinuscula,
            tieneNumero,
            tieneSimbolo,
            passChange,
            tamanoOk,
            cambiarContrasena,
        };
    },
});
</script>
