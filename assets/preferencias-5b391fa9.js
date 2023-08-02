import{_,g as h,a as v,b as i,c,d as e,Q as g,F as x,H as w,p as y,e as f,q as k,t as b,r,o as E,I as t,f as C}from"./index-1eadb02e.js";import{u as V}from"./configStore-da2d9a8f.js";const N="/blank.svg",S=h({name:"opciones",setup(){V();const o=r({contrasenaActual:"",contrasenaNueva:"",confirmarNueva:""}),n=r([]),d=r(!0);E(()=>{n.value=[{url:"/blank.svg",name:"Sin fondo",enabled:!1},{url:"/waves0.svg",name:"Ondas",enabled:!0},{url:"/nubes.svg",name:"Nubes",enabled:!1},{url:"/horizon.svg",name:"Horizonte",enabled:!1}];let a=t.get("wallpaper");n.value.forEach(s=>{s.url==a?s.enabled=!0:s.enabled=!1}),a=="none"&&(n.value[0].enabled=!0),d.value=t.get("animationsEnabled")=="true"});const m=()=>{d.value==!0?t.set("animationsEnabled","true"):t.set("animationsEnabled","false")},u=a=>{let s=a.name;n.value.forEach(l=>{l.name==a.name?l.enabled=!0:l.enabled=!1}),s=="Sin fondo"?t.set("wallpaper","none"):s=="Ondas"?t.set("wallpaper",a.url):s=="Nubes"?t.set("wallpaper",a.url):s=="Horizonte"&&t.set("wallpaper",a.url),p()};function p(){if(t.get("wallpaper")=="none"){let a=document.getElementById("app-content");a.style.backgroundImage="none"}else{let a=document.getElementById("app-content");a.style.backgroundImage="url("+t.get("wallpaper")+")"}}return{data:o,wallpapers:n,switchWallpaper:u,animationsEnabled:d,switchAnimations:m}}}),I={class:"container-lg pt-4 my-3"},z={class:"card shadow-5 border-round-2xl overflow-hidden mx-auto"},B=e("div",{class:"d-flex card-header py-0 pe-0"},[e("span",{class:"flex text-center"},[e("i",{class:"bi bi-gear-fill fw-bold h1 my-0"}),e("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Preferencias ")])],-1),$={class:"card-body table-responsive"},A={class:"grid mb-2"},H={class:"col-12 flex"},W=e("small",{class:"block text-muted"},"Los cambios realizados solo se guardarán en este dispositivo.",-1),j={class:"my-3"},F=e("span",{class:"fw-medium text-xl"},"Fondo de pantalla",-1),U=e("small",{class:"block text-muted"},"Selecciona un fondo de pantalla para la plataforma.",-1),D={class:"grid"},L={class:"col-12"},M={class:"flex flex-wrap"},O={class:"card border-round-2xl overflow-hidden shadow-5"},q={class:"card-body p-0"},P=["src"],Q={class:"card-footer p-2"},G={class:"flex"},J={class:"flex-grow-1"},K={class:"fw-bold"},R={class:"flex-shrink-0"},T={key:0,class:"col-12"},X=C('<div class="card border-round-2xl shadow-5"><div class="card-body p-0"><img src="'+N+'" class="w-100 border-round-2xl" style="height:150px;object-fit:cover;"></div><div class="card-footer p-2"><div class="flex"><div class="flex-grow-1"><span class="fw-bold">No hay fondos de pantalla disponibles</span></div></div></div></div>',1),Y=[X],Z={class:"my-3"},ee=e("span",{class:"fw-medium text-xl"},"Animaciones",-1),se=e("small",{class:"block text-muted"},"Cuando está habilitado, la plataforma muestra animaciones en ciertas secciones.",-1),ae=e("small",{class:"block text-muted"},"Cuando está deshabilitado, las animaciones se reducen considerablemente (recomendado para dispositivos con bajo rendimiento).",-1),oe={class:"flex pt-1"},ne=e("div",{class:"col-12 lg:col-6"},null,-1);function te(o,n,d,m,u,p){const a=v("InputSwitch");return i(),c("div",I,[e("div",z,[B,e("div",$,[e("div",A,[e("div",H,[e("form",{onSubmit:n[1]||(n[1]=g((...s)=>o.cambiarContrasena&&o.cambiarContrasena(...s),["prevent"]))},[W,e("div",j,[F,U,e("div",D,[e("div",L,[e("div",M,[(i(!0),c(x,null,w(o.wallpapers,s=>(i(),c("div",{class:"col-6 col-md-4 col-lg-3 p-2",key:s.id},[e("div",O,[e("div",q,[e("img",{src:s.url,class:"w-100",style:{height:"150px","object-fit":"cover"}},null,8,P)]),e("div",Q,[e("div",G,[e("div",J,[e("span",K,b(s.name),1)]),e("div",R,[f(a,{modelValue:s.enabled,"onUpdate:modelValue":l=>s.enabled=l,onChange:l=>o.switchWallpaper(s)},null,8,["modelValue","onUpdate:modelValue","onChange"])])])])])]))),128))])]),o.wallpapers.length==0?(i(),c("div",T,Y)):y("",!0)])]),e("div",Z,[ee,se,ae,e("div",oe,[f(a,{modelValue:o.animationsEnabled,"onUpdate:modelValue":n[0]||(n[0]=s=>o.animationsEnabled=s),onChange:o.switchAnimations},null,8,["modelValue","onChange"]),e("span",{class:k(["v-100 ps-3",o.animationsEnabled==!0?"text-blue-700":"text-muted"])},b(o.animationsEnabled==!0?"Habilitado":"Deshabilitado"),3)])])],32)]),ne])])])])}const ie=_(S,[["render",te]]);export{ie as default};
