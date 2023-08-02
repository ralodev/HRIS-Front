<template>
    <div class="container-fluid surface-0 pt-3" style="height: 50vh;">
        <div v-if="error==false" class="grid mt-5 align-items-center justify-content-center">
            <p class="text-3xl transition-all transition-duration-500">
                {{ verified!=true ? 'Verificado su correo electrónico' : 'Correo electrónico verificado, puede iniciar sesión' }}
            </p>
            <div class="flex col-12 align-items-center justify-content-center">
                <svg id="check" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100" xml:space="preserve">
                    <circle id="circle" cx="50" cy="50" r="46" fill="transparent" />
                    <polyline id="tick" points="25,55 45,70 75,33" fill="transparent" />
                </svg>
            </div>
        </div>
        <div v-if="error==true" class="grid mt-5 align-items-center justify-content-center">
            <p class="text-3xl transition-all transition-duration-500">
                El enlace ha expirado o no es válido.
            </p>
            <div class="flex col-12 align-items-center justify-content-center">
                <svg id="check" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100" xml:space="preserve">
                    <circle id="circle-red" cx="50" cy="50" r="46" fill="transparent" />
                    <polyline id="cross" points="30,30 70,70 50,50 30,70 50,50 70,30" fill="transparent" />
                </svg>
            </div>
        </div>
    </div>
    <footer>
        <div class="row mx-0 justify-content-center mb-0 pt-5 pb-0 row-2 px-3">
            <div class="col-12">
                <div class="row row-2">
                    <div class="col-sm-4 my-sm-0">
                        <ul class="list-unstyled">
                            <li class="mt-0 fw-bold">Dirección</li>
                            <li>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030</li>
                            <li class="mt-3 fw-bold">Contacto</li>
                            <li>Email: <a href="mailto:jefatura.humanos@oaxaca.tecnm.mx"
                                    style="color: #fff;">jefatura.humanos@oaxaca.tecnm.mx</a></li>
                            <li>Tel: (951) 501 50 16 Ext. 1055</li>
                        </ul>
                    </div>

                    <div class="col-sm-4 my-sm-0">
                        <ul class="list-unstyled">
                            <li class="mt-0 fw-bold">Enlaces</li>
                            <li class="mt-1"><a href="www.oaxaca.tecnm.mx"
                                    style="color: #fff; text-decoration: none;">Instituto
                                    Tecnológico de Oaxaca</a></li>
                            <li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/"
                                    style="color: #fff; text-decoration: none;">Sistema de Gestión de la Calidad</a></li>
                            <li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio"
                                    style="color: #fff; text-decoration: none;">Directorio</a></li>
                        </ul>
                    </div>

                    <div class="col-sm-3 text-md-center">
                        <h5>
                            <span> <i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto
                                tecnológico de
                                Oaxaca</b>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2">
            <div class="col-12">
                <div class="row mx-0 my-1 row-1 no-gutters">
                    <div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos
                        reservados.
                    </div>
                    <div class="col-md-3 col-auto"></div>
                    <div class="col-md-3 col-auto"></div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '@/stores/usuarioStore';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
    name: 'Reset',
    setup() {
        const store = useStore();
        const router = useRouter();
        const verified = ref(false);
        const error = ref(false);

        onMounted(() => {
            const svg = document.getElementById('check')
            svg.classList.add('progress')

            const token = router.currentRoute.value.query.token;

            if (token) {
                setTimeout(() => {
                    store.verificarToken(token)
                    .then((response) => {
                        if (response.status == 200) {
                            verificationSuccessful()
                        } else {
                            verificationFailed()
                        }
                    })
                    .catch((error) => {
                        verificationFailed()
                    })
                }, 3000);
            }
        });

        const verificationFailed = (() => {
            error.value = true
        });

        const verificationSuccessful = (() => {
            const svg = document.getElementById('check')
            svg.classList.toggle('progress')
            svg.classList.toggle('failed')
            verified.value = !verified.value

            setTimeout(() => {
                router.push({ name: 'login' })
            }, 2000);
        });

        return {
            verified,
            error,
        }
    }
}
</script>

<style>
.login-container {
    height: 700px !important;
    /* Set the height to 100% of the viewport height */

}

.progress{
    background: #fff;
}

.v-center {
    margin: auto;

}

#cross {
    stroke: #bc0701;
    stroke-width: 6;
    transition: all 1s;
}

#tick {
    stroke: #63bc01;
    stroke-width: 6;
    transition: all 2s;
}

#circle {
    stroke: #63bc01;
    stroke-width: 6;
    transform-origin: 50px 50px 0;
    transition: all 2s;
}

#circle-red {
    stroke: #bc0701;
    stroke-width: 6;
    transform-origin: 50px 50px 0;
    transition: all 2s;
}

.progress #tick {
    opacity: 0;
}

.ready #tick {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 2s ease-out forwards;
}

.progress #circle {
    stroke: #4c4c4c;
    stroke-dasharray: 314;
    stroke-dashoffset: 1000;
    animation: spin 2s linear infinite;
}

.ready #circle {
    stroke-dasharray: 1000;
    stroke-dashoffset: 314;
    stroke: #63bc01;
}

#circle {
    stroke-dasharray: 500;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
        stroke-dashoffset: 66;
    }

    50% {
        transform: rotate(540deg);
        stroke-dashoffset: 314;
    }

    100% {
        transform: rotate(1080deg);
        stroke-dashoffset: 66;
    }
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

#check {
    width: 100px;
    height: 100px;
}
</style>