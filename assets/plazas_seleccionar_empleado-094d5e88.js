import{_ as E,P as v,D as l,g as y,a as f,b as T,c as L,d as s,e as c,h as k,r as b,u as x,o as C,s as N,n as B,i as A}from"./index-5511196e.js";import{u as S}from"./empleadoStore-0e53ab8e.js";v.use(l,l,l,l);const D=y({name:"seleccionar_empleado",components:{DataTable:v},setup(){const t=b("");let n;const i=b(),d=S(),a=A(),p=x(),r=b([]),u={responsive:!0,autoWidth:!0,dom:"trip",paging:!0,pagingType:"simple_numbers",language:N,pageLength:10,order:[[0,"asc"]],initComplete:function(){this.on("draw.dt",function(){B(()=>{g(),n.responsive.recalc()})})}},m=[{data:"numeroTarjeta",title:"Número de tarjeta",width:"20%"},{data:"rfc",title:"RFC",width:"20%",className:"all"},{data:"nombre",title:"Nombre",width:"20%"},{data:"departamento.nombre",title:"Departamento",width:"30%",render:function(o,e,H){return o??"Sin departamento"}},{data:"estado",title:"Estado",className:"never"},{data:null,className:"text-nowrap acciones all justify-content-center",width:"10%",title:"Seleccionar",wrap:!0,render:function(){return'<a https="#" title="Seleccionar" class="action-select mx-auto p-button-sm p-button p-component p-button-icon-only p-button-success p-button-raised me-1"><i class="bi bi bi-check-lg"></i></a> '}}],h=async()=>{var o=!1;a.showLoading("Cargando datos"),setTimeout(()=>{o||(a.closeLoading(),a.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await d.getEmpleados().then(()=>{r.value=d.data,a.closeLoading(),o=!0}).catch(e=>{e.code==="ERR_NETWORK"?a.showErrorAlert("Error","No se pudo conectar con el servidor"):a.showErrorAlert("Error","Ocurrió un error inesperado"),o=!0})},_=o=>{p.push({name:"plazas_registrar",params:{id:o}})},g=()=>{document.querySelectorAll(".action-select").forEach(e=>{e.parentElement.classList.add("flex"),e.parentElement.previousSibling.innerHTML!=="ACTIVO"&&(e.disabled=!0,e.classList.remove("p-button-success"),e.classList.add("p-button-secondary"),e.classList.add("p-disabled"),e.parentElement.title="Empleado inactivo o no disponible",e.parentElement.parentElement.classList.add("surface-100")),e.addEventListener("click",()=>{_(e.closest("tr").cells[0].innerHTML)})})},w=()=>{n.search(t.value).draw()};return C(()=>{h(),n=i.value.dt}),{columns:m,data:r,options:u,search:w,searchText:t,table:i,goBack:()=>{p.push({name:"plazas"})}}}}),I={class:"container-lg pt-4 my-3"},R={class:"card shadow-5 border-round-2xl overflow-hidden"},V={class:"d-flex card-header py-0 pe-0"},j=s("span",{class:"flex text-center"},[s("i",{class:"bi bi-person-fill-check fw-bold h1 my-0"}),s("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Seleccionar Empleado ")],-1),z={class:"card-body table-responsive"},K={class:"grid mb-2"},O={class:"col-12 lg:col-6 md:col-8"},$=s("label",{for:"searchInput"},"Filtrar empleados",-1),F={class:"p-inputgroup"};function M(t,n,i,d,a,p){const r=f("Button"),u=f("InputText"),m=f("DataTable");return T(),L("div",I,[s("div",R,[s("div",V,[j,c(r,{icon:"pi pi-times",severity:"danger",size:"small",onClick:t.goBack,class:"ms-auto border-noround float-end hover:bg-red-500 hover:text-white",text:"",style:{height:"48px"}},null,8,["onClick"])]),s("div",z,[s("div",K,[s("div",O,[$,s("div",F,[c(u,{placeholder:"Escribe un número de tarjeta, nombre o rfc",title:"Introduce un Número de tarjeta, Nombre o RFC",id:"searchInput",class:"w-full",onKeyup:k(t.search,["enter"]),modelValue:t.searchText,"onUpdate:modelValue":n[0]||(n[0]=h=>t.searchText=h)},null,8,["onKeyup","modelValue"]),c(r,{icon:"pi pi-filter",severity:"primary",onClick:t.search},null,8,["onClick"])])])]),c(m,{columns:t.columns,data:t.data,class:"responsive text-nowrap hover row-border border order-column",width:"100%",options:t.options,ref:"table"},null,8,["columns","data","options"])])])])}const P=E(D,[["render",M]]);export{P as default};
