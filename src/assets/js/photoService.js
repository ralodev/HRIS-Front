export const PhotoService = {
        getData() {
            return [
                /*
                {
                    itemImageSrc: 'https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/Convocatoria-P-NO-D23.jpg',
                    alt: "http://www.oaxaca.tecnm.mx/storage/app/media/files/2023/Convocatoria_2023.pdf",
                    title: 'CONVOCATORIAS CERRADAS NO DOCENTES 2023'
                },
                {
                    itemImageSrc: 'https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/Convocatoria-PD23.jpg',
                    alt: 'http://www.oaxaca.tecnm.mx/storage/app/media/files/2023/Convocatoria_2023.pdf',
                    title: 'CONVOCATORIAS CERRADAS DOCENTES 2023'
                },
                {
                    itemImageSrc: 'https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/banner-convocatoria-23.jpg',
                    alt: 'http://www.oaxaca.tecnm.mx/storage/app/media/CONVOCATORIAS/2023/CONVOCATORIA%20DOCENTE%20CERRADA%202023_compressed.pdf',
                    title: 'CONVOCATORIA DE PROYECTO PROMOCIONAL 2023'
                },*/
                {
                    itemImageSrc: 'https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/slider%20VILLA.jpg',
                    alt: 'http://www.oaxaca.tecnm.mx/',
                    title: '2023 AÑO DE FRANCISCO VILLA'
                },
                {
                    itemImageSrc: '/slider.jpg',
                    alt: 'http://www.oaxaca.tecnm.mx/',
                    title: '9 ANIVERSARIO DE EXCELENCIA EN EDUCACIÓN TECNOLÓGICA'
                }
            ];
        },

        getImages() {
            return Promise.resolve(this.getData());
        }
    };

