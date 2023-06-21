<template>
    <!-- Puestos -->
    <div class="container-lg pt-4 my-3">

        <!-- Card -->
        <div class="card shadow-5 border-round-2xl overflow-hidden mx-auto" style="max-width: 500px;">
            <div class="d-flex card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-cloud-arrow-down-fill fw-bold h1 my-0"></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        Descargar respaldo
                    </span>
                </span>
            </div>
            <div class="card-body table-responsive">

                <div class="grid mb-2">
                    <div class="col-12 flex">

                        <form @submit.prevent="descargarDB">

                            <p class="fs-3">Este proceso puede tardar varios minutos</p>
                            <p class="fs-5">Se sugiere llevar a cabo esta operación una vez finalizada la jornada laboral, ya que el rendimiento del sistema podría verse afectado y el tiempo de respuesta prolongarse.</p>
                            <p class="fs-6">Se generará un archivo con extensión ".sql" que contendrá una copia de seguridad de la base de datos. Procura guardarla en un lugar seguro.</p>

                            <Button type="submit" label="Descargar respaldo" icon="pi pi-shield" class="ms-auto" raised />
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
import { useStore } from '@/stores/adminStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';

export default defineComponent({
    name: 'opciones',
    setup() {

        const store = useStore();
        const alertas = useAlerts();
        const router = useRouter();

        const descargarDB = async () => {

                let done = false;
                alertas.showLoading('Generando respaldo. Espere, por favor...');

                setTimeout(() => {
                    if (!done) {
                        alertas.closeLoading();
                        alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
                    }
                }, 30000);

                await store.respaldo().then(() => {
                    alertas.closeLoading();
                    done = true;
                    alertas.showSuccessAlert('Éxito', 'Se ha generado el respaldo de la base de datos');
                }).catch((error) => {
                    if (error.code === "ERR_NETWORK") {
                        alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
                    } else {
                        alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
                    }
                    done = true;
                });
        };

        onMounted(() => {
        });


        return {
            descargarDB,
        };
    },
});
</script>
