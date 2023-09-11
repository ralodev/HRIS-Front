import{_ as k,P as _,D as l,g as B,a as b,b as C,c as D,d as o,e as c,h as A,r as f,I as L,u as V,o as I,s as K,n as N,i as R}from"./index-1e54ce22.js";import{u as S}from"./adminStore-14d578d3.js";_.use(l,l,l,l);const $=B({name:"TablaEmpleados",components:{DataTable:_},setup(){const t=f("");L.get("email");let n;const u=f(),d=S(),s=R(),p=V(),r=f([]),i={responsive:!0,autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:K,pageLength:10,order:[[0,"asc"]],initComplete:function(){this.on("draw.dt",function(){N(()=>{v(),n.responsive.recalc()})})}},m=[{data:"id",title:"#",class:"all",width:"20%"},{data:"tipo",title:"Tipo",width:"10%",class:"min-tablet-l"},{data:"descripcion",title:"Descripción",class:"min-desktop no-wrap text-nowrap email-col",width:"10%"},{data:null,title:"Fecha",class:"all no-wrap text-nowrap email-col",width:"10%",render:function(a){let e=new Date(a.fecha),g=e.getDate(),y=e.getMonth()+1,x=e.getFullYear(),E=e.getHours(),T=e.getMinutes();return g+"/"+y+"/"+x+" a las "+E+":"+T+" hs"}},{data:null,title:"Usuario",class:"min-tablet-l no-wrap text-nowrap email-col",width:"10%",render:function(a){return a.usuario.email}},{data:null,class:"text-nowrap  acciones justify-content-center all ",width:"10%",title:"Acciones",orderable:!1,wrap:!0,render:function(a){let e="<a title='Ver usuario' name='"+a.usuario.id+"' class='details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none'><i class='pi pi-eye'></i></a> ";return a.usuario.email=="Sistema"?"":e}}],h=async()=>{var a=!1;s.showLoading("Cargando datos"),setTimeout(()=>{a||(s.closeLoading(),s.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await d.getHistorial().then(()=>{r.value=d.data,r.value.forEach(e=>{e.usuario.email==="18161160@itoaxaca.edu.mx"&&(e.usuario.email="Sistema")}),console.log(r.value),s.closeLoading(),a=!0}).catch(e=>{e.code==="ERR_NETWORK"?s.showErrorAlert("Error","No se pudo conectar con el servidor"):s.showErrorAlert("Error","Ocurrió un error inesperado"),a=!0})},v=()=>{document.querySelectorAll(".details-btn").forEach(e=>{e.parentElement.classList.add("flex"),e.addEventListener("click",()=>{p.push({name:"usuarios_editar",params:{id:e.attributes.name.value}})})})},w=()=>{n.search(t.value).draw()};return I(()=>{h(),n=u.value.dt}),{columns:m,data:r,options:i,usuarios:()=>{p.push({name:"usuarios"})},search:w,searchText:t,table:u}}}),H={class:"container-lg pt-4 my-3"},M={class:"card shadow-5 border-round-2xl overflow-hidden"},O=o("div",{class:"d-flex card-header py-0 pe-0"},[o("span",{class:"flex text-center"},[o("i",{class:"bi bi-clock-history fw-bold h1 my-0"}),o("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Historial de cambios de usuarios ")])],-1),F={class:"card-body table-responsive"},U={class:"grid mb-2"},W={class:"col-12 lg:col-6 md:col-8"},j={class:"p-inputgroup"},q={class:"col-12 lg:col-6 md:col-4"};function P(t,n,u,d,s,p){const r=b("InputText"),i=b("Button"),m=b("DataTable");return C(),D("div",H,[o("div",M,[O,o("div",F,[o("div",U,[o("div",W,[o("div",j,[c(r,{placeholder:"Buscar cambio por usuario",id:"searchInput",onKeyup:A(t.search,["enter"]),modelValue:t.searchText,"onUpdate:modelValue":n[0]||(n[0]=h=>t.searchText=h),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),c(i,{icon:"pi pi-search",severity:"primary",onClick:t.search},null,8,["onClick"])])]),o("div",q,[c(i,{type:"button",label:"Volver a usuarios",icon:"pi pi-undo",onClick:t.usuarios,class:"float-end me-2",severity:"secondary",raised:""},null,8,["onClick"])])]),c(m,{columns:t.columns,data:t.data,class:"table-responsive text-nowrap hover row-border border order-column",width:"100%",options:t.options,ref:"table"},null,8,["columns","data","options"])])])])}const G=k($,[["render",P]]);export{G as default};