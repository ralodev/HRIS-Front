<template>
  <div class="container-fluid px-0 surface-0">

    <div class="container text-700 text-center d-block" style="padding-top: 3rem; padding-bottom: 3rem;">

      <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true"
        containerStyle="max-width: 1300px; margin-top: 50px;" :showItemNavigators="true" :showThumbnails="false"
        :showItemNavigatorsOnHover="false" :showIndicators="true" :autoPlay="true" :transitionInterval="3000"
        >
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block; padding-bottom: 62px;" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
        </template>
        <template #caption="slotProps">
        <span class="text-sm md:text-xl mb-0 font-bold"><a :href="slotProps.item.alt" target="_blank" class="text-white no-underline">{{ slotProps.item.title }}</a></span>
    </template>
      </Galleria>


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
              <li class="mt-1"><a href="www.oaxaca.tecnm.mx" style="color: #fff; text-decoration: none;">Instituto
                  Tecnológico de Oaxaca</a></li>
              <li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/"
                  style="color: #fff; text-decoration: none;">Sistema de Gestión de la Calidad</a></li>
              <li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio"
                  style="color: #fff; text-decoration: none;">Directorio</a></li>
            </ul>
          </div>

          <div class="col-sm-3 text-md-center">
            <h5>
              <span> <i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto tecnológico de
                Oaxaca</b>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2">
      <div class="col-12">
        <div class="row mx-0 my-1 row-1 no-gutters">
          <div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos reservados.
          </div>
          <div class="col-md-3 col-auto"></div>
          <div class="col-md-3 col-auto"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
import { PhotoService } from '@/assets/js/PhotoService';
import { ref, onMounted } from 'vue';

export default {
  data() {

    const images = ref();
    const responsiveOptions = ref([
      {
        breakpoint: '991px',
        numVisible: 4
      },
      {
        breakpoint: '767px',
        numVisible: 3
      },
      {
        breakpoint: '575px',
        numVisible: 1
      }
    ]);

    onMounted(() => {
      PhotoService.getImages().then((data) => (images.value = data));
    });
    return {
      images,
      responsiveOptions
    }
  },
}
</script>