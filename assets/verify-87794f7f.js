import{u as v}from"./usuarioStore-9f7aaeea.js";import{_ as x,u as p,r as u,o as h,b as a,c as l,d as e,t as g,p as f,F as w,f as _}from"./index-6fc40b30.js";const y={name:"Reset",setup(){const n=v(),o=p(),s=u(!1),t=u(!1);h(()=>{document.getElementById("check").classList.add("progress");const d=o.currentRoute.value.query.token;d&&setTimeout(()=>{n.verificarToken(d).then(m=>{m.status==200?r():i()}).catch(m=>{i()})},3e3)});const i=()=>{t.value=!0},r=()=>{const c=document.getElementById("check");c.classList.toggle("progress"),c.classList.toggle("failed"),s.value=!s.value,setTimeout(()=>{o.push({name:"login"})},2e3)};return{verified:s,error:t}}},k={class:"container-fluid surface-0 pt-3",style:{height:"50vh"}},b={key:0,class:"grid mt-5 align-items-center justify-content-center"},j={class:"text-3xl transition-all transition-duration-500"},B=e("div",{class:"flex col-12 align-items-center justify-content-center"},[e("svg",{id:"check",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 100 100","xml:space":"preserve"},[e("circle",{id:"circle",cx:"50",cy:"50",r:"46",fill:"transparent"}),e("polyline",{id:"tick",points:"25,55 45,70 75,33",fill:"transparent"})])],-1),E={key:1,class:"grid mt-5 align-items-center justify-content-center"},T=e("p",{class:"text-3xl transition-all transition-duration-500"}," El enlace ha expirado o no es válido. ",-1),C=e("div",{class:"flex col-12 align-items-center justify-content-center"},[e("svg",{id:"check",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 100 100","xml:space":"preserve"},[e("circle",{id:"circle-red",cx:"50",cy:"50",r:"46",fill:"transparent"}),e("polyline",{id:"cross",points:"30,30 70,70 50,50 30,70 50,50 70,30",fill:"transparent"})])],-1),I=[T,C],S=_('<footer><div class="row mx-0 justify-content-center mb-0 pt-5 pb-0 row-2 px-3"><div class="col-12"><div class="row row-2"><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Dirección</li><li>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030</li><li class="mt-3 fw-bold">Contacto</li><li>Email: <a href="mailto:jefatura.humanos@oaxaca.tecnm.mx" style="color:#fff;">jefatura.humanos@oaxaca.tecnm.mx</a></li><li>Tel: (951) 501 50 16 Ext. 1055</li></ul></div><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Enlaces</li><li class="mt-1"><a href="www.oaxaca.tecnm.mx" style="color:#fff;text-decoration:none;">Instituto Tecnológico de Oaxaca</a></li><li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/" style="color:#fff;text-decoration:none;">Sistema de Gestión de la Calidad</a></li><li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio" style="color:#fff;text-decoration:none;">Directorio</a></li></ul></div><div class="col-sm-3 text-md-center"><h5><span><i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto tecnológico de Oaxaca</b></h5></div></div></div></div><div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2"><div class="col-12"><div class="row mx-0 my-1 row-1 no-gutters"><div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos reservados. </div><div class="col-md-3 col-auto"></div><div class="col-md-3 col-auto"></div></div></div></div></footer>',1);function V(n,o,s,t,i,r){return a(),l(w,null,[e("div",k,[t.error==!1?(a(),l("div",b,[e("p",j,g(t.verified!=!0?"Verificado su correo electrónico":"Correo electrónico verificado, puede iniciar sesión"),1),B])):f("",!0),t.error==!0?(a(),l("div",E,I)):f("",!0)]),S],64)}const R=x(y,[["render",V]]);export{R as default};
