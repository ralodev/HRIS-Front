import{_ as r,r as l,o as m,a as d,b as p,c as x,d as a,e as u,w as s,F as v,f as w,t as h}from"./index-1eadb02e.js";const f={getData(){return[{itemImageSrc:"https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/Convocatoria-P-NO-D23.jpg",alt:"http://www.oaxaca.tecnm.mx/storage/app/media/files/2023/Convocatoria_2023.pdf",title:"CONVOCATORIAS CERRADAS NO DOCENTES 2023"},{itemImageSrc:"https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/Convocatoria-PD23.jpg",alt:"http://www.oaxaca.tecnm.mx/storage/app/media/files/2023/Convocatoria_2023.pdf",title:"CONVOCATORIAS CERRADAS DOCENTES 2023"},{itemImageSrc:"https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/banner-convocatoria-23.jpg",alt:"http://www.oaxaca.tecnm.mx/storage/app/media/CONVOCATORIAS/2023/CONVOCATORIA%20DOCENTE%20CERRADA%202023_compressed.pdf",title:"CONVOCATORIA DE PROYECTO PROMOCIONAL 2023"},{itemImageSrc:"https://www.oaxaca.tecnm.mx/themes/tecoaxaca/assets/images/banners/slider%20VILLA.jpg",alt:"http://www.oaxaca.tecnm.mx/",title:"2023 AÑO DE FRANCISCO VILLA"}]},getImages(){return Promise.resolve(this.getData())}},g={data(){const e=l(),o=l([{breakpoint:"991px",numVisible:4},{breakpoint:"767px",numVisible:3},{breakpoint:"575px",numVisible:1}]);return m(()=>{f.getImages().then(i=>e.value=i)}),{images:e,responsiveOptions:o}}},_={class:"container-fluid px-0 surface-0"},O={class:"container text-700 text-center d-block",style:{"padding-top":"3rem","padding-bottom":"3rem"}},b=["src","alt"],C=["src","alt"],I={class:"text-sm md:text-xl mb-0 font-bold"},A=["href"],y=w('<footer><div class="row mx-0 justify-content-center mb-0 pt-5 pb-0 row-2 px-3"><div class="col-12"><div class="row row-2"><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Dirección</li><li>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030</li><li class="mt-3 fw-bold">Contacto</li><li>Email: <a href="mailto:jefatura.humanos@oaxaca.tecnm.mx" style="color:#fff;">jefatura.humanos@oaxaca.tecnm.mx</a></li><li>Tel: (951) 501 50 16 Ext. 1055</li></ul></div><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Enlaces</li><li class="mt-1"><a href="www.oaxaca.tecnm.mx" style="color:#fff;text-decoration:none;">Instituto Tecnológico de Oaxaca</a></li><li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/" style="color:#fff;text-decoration:none;">Sistema de Gestión de la Calidad</a></li><li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio" style="color:#fff;text-decoration:none;">Directorio</a></li></ul></div><div class="col-sm-3 text-md-center"><h5><span><i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto tecnológico de Oaxaca</b></h5></div></div></div></div><div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2"><div class="col-12"><div class="row mx-0 my-1 row-1 no-gutters"><div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos reservados. </div><div class="col-md-3 col-auto"></div><div class="col-md-3 col-auto"></div></div></div></div></footer>',1);function S(e,o,i,N,c,E){const n=d("Galleria");return p(),x(v,null,[a("div",_,[a("div",O,[u(n,{value:c.images,responsiveOptions:c.responsiveOptions,numVisible:5,circular:!0,containerStyle:"max-width: 1300px; margin-top: 50px;",showItemNavigators:!0,showThumbnails:!1,showItemNavigatorsOnHover:!1,showIndicators:!0,autoPlay:!0,transitionInterval:3e3},{item:s(t=>[a("img",{src:t.item.itemImageSrc,alt:t.item.alt,style:{width:"100%",display:"block","padding-bottom":"62px"}},null,8,b)]),thumbnail:s(t=>[a("img",{src:t.item.thumbnailImageSrc,alt:t.item.alt,style:{display:"block"}},null,8,C)]),caption:s(t=>[a("span",I,[a("a",{href:t.item.alt,target:"_blank",class:"text-white no-underline"},h(t.item.title),9,A)])]),_:1},8,["value","responsiveOptions"])])]),y],64)}const R=r(g,[["render",S]]);export{R as default};