import{_ as c,g as l,a as i,b as p,c as u,d as e,Q as _,e as f,u as h,o as m,i as g}from"./index-73aa4d39.js";import{u as v}from"./adminStore-e739ab68.js";const b=l({name:"opciones",setup(){const o=v(),s=g();h();const a=async()=>{let r=!1;s.showLoading("Generando respaldo. Espere, por favor..."),setTimeout(()=>{r||(s.closeLoading(),s.showErrorAlert("Error","Ocurrió un error inesperado"))},3e4),await o.respaldo().then(()=>{s.closeLoading(),r=!0,s.showSuccessAlert("Éxito","Se ha generado el respaldo de la base de datos")}).catch(t=>{t.code==="ERR_NETWORK"?s.showErrorAlert("Error","No se pudo conectar con el servidor"):s.showErrorAlert("Error","Ocurrió un error inesperado"),r=!0})};return m(()=>{}),{descargarDB:a}}}),w={class:"container-lg pt-4 my-3"},x={class:"card shadow-5 border-round-2xl overflow-hidden mx-auto",style:{"max-width":"500px"}},E=e("div",{class:"d-flex card-header py-0 pe-0"},[e("span",{class:"flex text-center"},[e("i",{class:"bi bi-cloud-arrow-down-fill fw-bold h1 my-0"}),e("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Descargar respaldo ")])],-1),y={class:"card-body table-responsive"},B={class:"grid mb-2"},S={class:"col-12 flex"},A=e("p",{class:"fs-3"},"Este proceso puede tardar varios minutos",-1),D=e("p",{class:"fs-5"},"Se sugiere llevar a cabo esta operación una vez finalizada la jornada laboral, ya que el rendimiento del sistema podría verse afectado y el tiempo de respuesta prolongarse.",-1),N=e("p",{class:"fs-6"},'Se generará un archivo con extensión ".sql" que contendrá una copia de seguridad de la base de datos. Procura guardarla en un lugar seguro.',-1),R=e("div",{class:"col-12 lg:col-6"},null,-1);function $(o,s,a,r,t,q){const n=i("Button");return p(),u("div",w,[e("div",x,[E,e("div",y,[e("div",B,[e("div",S,[e("form",{onSubmit:s[0]||(s[0]=_((...d)=>o.descargarDB&&o.descargarDB(...d),["prevent"]))},[A,D,N,f(n,{type:"submit",label:"Descargar respaldo",icon:"pi pi-shield",class:"ms-auto",raised:""})],32)]),R])])])])}const k=c(b,[["render",$]]);export{k as default};
