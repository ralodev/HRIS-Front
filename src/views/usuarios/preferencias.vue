<template>
    <!-- Puestos -->
    <div class="container-lg pt-4 my-3">

        <!-- Card -->
        <div class="card shadow-5 border-round-2xl overflow-hidden mx-auto">
            <div class="d-flex card-header py-0 pe-0">
                <span class="flex text-center">
                    <i class="bi bi-gear-fill fw-bold h1 my-0"></i>
                    <span class="fw-bold h4 align-self-center ms-3 my-0">
                        Preferencias
                    </span>
                </span>
            </div>
            <div class="card-body table-responsive">
                <div class="grid mb-2">
                    <div class="col-12 flex">
                        <form @submit.prevent="cambiarContrasena">
                            <small class="block text-muted">Los cambios realizados solo se guardarán en este dispositivo.</small>
                            <div class="my-3">
                                <span class="fw-medium text-xl">Fondo de pantalla</span>
                                <small class="block text-muted">Selecciona un fondo de pantalla para la plataforma.</small>
                                <div class="grid">
                                    <div class="col-12">
                                        <div class="flex flex-wrap">
                                            <div class="col-6 col-md-4 col-lg-3 p-2" v-for="wallpaper in wallpapers" :key="wallpaper.id">
                                                <div class="card border-round-2xl overflow-hidden shadow-5">
                                                    <div class="card-body p-0">
                                                        <img :src="wallpaper.url" class="w-100" style="height: 150px; object-fit: cover;"/>
                                                    </div>
                                                    <div class="card-footer p-2">
                                                        <div class="flex">
                                                            <div class="flex-grow-1">
                                                                <span class="fw-bold">{{ wallpaper.name }}</span>
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <InputSwitch v-model="wallpaper.enabled" @change="switchWallpaper(wallpaper)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="wallpapers.length == 0" class="col-12">
                                        <div class="card border-round-2xl shadow-5">
                                            <div class="card-body p-0">
                                                <img src="src/assets/svg/blank.svg" class="w-100 border-round-2xl" style="height: 150px; object-fit: cover;"/>
                                            </div>
                                            <div class="card-footer p-2">
                                                <div class="flex">
                                                    <div class="flex-grow-1">
                                                        <span class="fw-bold">No hay fondos de pantalla disponibles</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="my-3">
                                <span class="fw-medium text-xl">Animaciones</span>
                                <small class="block text-muted">Cuando está habilitado, la plataforma muestra animaciones en ciertas secciones.</small>
                                <small class="block text-muted">Cuando está deshabilitado, las animaciones se reducen considerablemente (recomendado para dispositivos con bajo rendimiento).</small>
                                <div class="flex pt-1">
                                    <InputSwitch v-model="animationsEnabled" @change="switchAnimations"/>
                                    <span class="v-100 ps-3" :class="animationsEnabled == true ? 'text-blue-700' : 'text-muted'"
                                    >{{ animationsEnabled == true ? 'Habilitado' : 'Deshabilitado' }}</span>
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
import Cookies from 'js-cookie';

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
        const wallpapers = ref([]);
        const animationsEnabled = ref(true);

        onMounted(() => {

            wallpapers.value = [
                {url: 'src/assets/svg/blank.svg', name: 'Sin fondo', enabled: false},
                {url: 'src/assets/svg/waves0.svg', name: 'Ondas', enabled: true},
                {url: 'src/assets/svg/nubes.svg', name: 'Nubes', enabled: false},
                {url: 'src/assets/svg/horizon.svg', name: 'Horizonte', enabled: false},
            ]
            let currentWallpaper = Cookies.get('wallpaper');
            wallpapers.value.forEach((wp) => {
                    if (wp.url == currentWallpaper){
                        wp.enabled = true;
                    } else {
                        wp.enabled = false;
                    }
                });
                if (currentWallpaper == 'none') {
                    wallpapers.value[0].enabled = true;
                }
            animationsEnabled.value = Cookies.get('animationsEnabled') == 'true' ? true : false;
        });

        const switchAnimations = () => {
            if (animationsEnabled.value == true){
                Cookies.set('animationsEnabled', 'true');
            } else {
                Cookies.set('animationsEnabled', 'false');
            }
        };


        const switchWallpaper = (wallpaper) => {
            let name = wallpaper.name;
            wallpapers.value.forEach((wp) => {
                    if (wp.name == wallpaper.name){
                        wp.enabled = true;
                    } else {
                        wp.enabled = false;
                    }
                });
            if (name == 'Sin fondo'){
                Cookies.set('wallpaper', 'none');
            } else if (name == 'Ondas'){
                Cookies.set('wallpaper', wallpaper.url);
            } else if (name == 'Nubes'){
                Cookies.set('wallpaper', wallpaper.url);
            } else if (name == 'Horizonte'){
                Cookies.set('wallpaper', wallpaper.url);
            }
            setWallpaper();
        };

        function setWallpaper(){
            if (Cookies.get("wallpaper") == 'none'){
                let bg_container = document.getElementById('app-content')
                bg_container.style.backgroundImage = 'none'
            } else {
                let bg_container = document.getElementById('app-content')
                bg_container.style.backgroundImage = 'url(' + Cookies.get("wallpaper") + ')'
            }
        }

        return {
            data,
            wallpapers,
            switchWallpaper,
            animationsEnabled,
            switchAnimations,
        };
    },
});
</script>
