<template>
    <!-- Puestos -->
    <div class="container-lg pt-4 my-3">

        <!-- Card -->
        <div class="card shadow-5 border-round-2xl overflow-hidden mx-auto">
            <div class="d-flex card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-tools fw-bold h1 my-0"></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        Configuración
                    </span>
                </span>
            </div>
            <div class="card-body table-responsive">

                <div class="grid mb-2">
                    <div class="col-12 flex">
                        <form @submit.prevent="cambiarContrasena">
                            <small class="block text-muted">Los cambios realizados aquí surten efecto inmediatamente.</small>
                            <div class="my-3">
                                <span class="fw-medium text-xl">Registro de usuarios</span>
                                <small class="block text-muted">Cuando está habilitado, los empleados con un correo institucional válido y existente en la base de datos, pueden registrarse.</small>
                                <small class="block text-muted">Cuando está deshabilitado, solo el administrador puede registrar usuarios.</small>
                                <div class="flex pt-1">
                                    <InputSwitch v-model="registrationEnabled" @change="switchRegistration"/>
                                    <span class="v-100 ps-3" :class="registrationEnabled == true ? 'text-blue-700' : 'text-muted'"
                                    >{{ registrationEnabled == true ? 'Habilitado' : 'Deshabilitado' }}</span>
                                </div>
                            </div>

                            <div class="my-3">
                                <span class="fw-medium text-xl">Inicio de sesión</span>
                                <small class="block text-muted">Cuando está habilitado, todos los usuarios registrados y válidos (habilitados y no bloqueados) pueden ingresar a la plataforma.</small>
                                <small class="block text-muted">Cuando está deshabilitado, solo los usuarios con el rol Administrador pueden ingresar a la plataforma.</small>
                                <div class="flex pt-1">
                                    <InputSwitch v-model="loginEnabled" @change="switchLogin"/>
                                    <span class="v-100 ps-3" :class="loginEnabled == true ? 'text-blue-700' : 'text-muted'"
                                    >{{ loginEnabled == true ? 'Habilitado' : 'Deshabilitado' }}</span>
                                </div>
                            </div>

                            <div class="my-3">
                                <span class="fw-medium text-xl">Filtrar dominio de correo</span>
                                <small class="block text-muted">Cuando está habilitado, el administrador solo puede registrar usuarios con correos electrónicos institucionales.</small>
                                <small class="block text-muted">Cuando está deshabilitado, el administrador puede registrar usuarios con correos de cualquier dominio (ej. Gmail, Outlook, etc.).</small>
                                <div class="flex pt-1">
                                    <InputSwitch v-model="domainFilterEnabled" @change="switchDomainFilter"/>
                                    <span class="v-100 ps-3" :class="domainFilterEnabled == true ? 'text-blue-700' : 'text-muted'"
                                    >{{ domainFilterEnabled == true ? 'Habilitado' : 'Deshabilitado' }}</span>
                                </div>
                            </div>
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
import { useStore } from '@/stores/configStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';

export default defineComponent({
    name: 'opciones',
    setup() {

        const alertas = useAlerts();
        const store = useStore();
        const data = ref({
            contrasenaActual: '',
            contrasenaNueva: '',
            confirmarNueva: '',
        });
        const registrationEnabled = ref(false);
        const loginEnabled = ref(false);
        const domainFilterEnabled = ref(false);

        onMounted(() => {
            store.getConfig().then((res) => {
                if (res.status == 200){
                    console.log('res ', res);
                    console.log('registrationEnabled ', res.data.registrationEnabled);
                    registrationEnabled.value = res.data.registrationEnabled;
                    loginEnabled.value = res.data.loginEnabled;
                    domainFilterEnabled.value = res.data.domainFilterEnabled;
                } else {
                    alertas.showErrorAlert('Error', 'No se pudo obtener la configuración actual.');
                }
            });
        });

        const switchLogin = () => {
            if (loginEnabled.value == true){
                store.enableLogin().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Inicio de sesión habilitado.');
                        loginEnabled.value = true;
                    } else {
                        alertas.showErrorAlert('No se pudo habilitar el inicio de sesión.');
                        loginEnabled.value = false;
                    }
                });
            } else {
                store.disableLogin().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Inicio de sesión deshabilitado.');
                        loginEnabled.value = false;
                    } else {
                        alertas.showErrorAlert('No se pudo deshabilitar el inicio de sesión.');
                        loginEnabled.value = true;
                    }
                });
            }
        };

        const switchRegistration = () => {
            if (registrationEnabled.value == true){
                store.enableRegistration().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Registro de usuarios habilitado.');
                        registrationEnabled.value = true;
                    } else {
                        alertas.showErrorAlert('No se pudo habilitar el registro de usuarios.');
                        registrationEnabled.value = false;
                    }
                });
            } else {
                store.disableRegistration().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Registro de usuarios deshabilitado.');
                        registrationEnabled.value = false;
                    } else {
                        alertas.showErrorAlert('No se pudo deshabilitar el registro de usuarios.');
                        registrationEnabled.value = true;
                    }
                });
            }
        };

        const switchDomainFilter = () => {
            if (domainFilterEnabled.value == true){
                store.enableDomainFilter().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Filtro de dominio habilitado.');
                        domainFilterEnabled.value = true;
                    } else {
                        alertas.showErrorAlert('No se pudo habilitar el filtro de dominio.');
                        domainFilterEnabled.value = false;
                    }
                });
            } else {
                store.disableDomainFilter().then((res) => {
                    if (res.status == 200){
                        alertas.showSuccessToast('Filtro de dominio deshabilitado.');
                        domainFilterEnabled.value = false;
                    } else {
                        alertas.showErrorAlert('No se pudo deshabilitar el filtro de dominio.');
                        domainFilterEnabled.value = true;
                    }
                });
            }
        };

        return {
            data,
            loginEnabled,
            domainFilterEnabled,
            registrationEnabled,
            switchLogin,
            switchDomainFilter,
            switchRegistration,
        };
    },
});
</script>
