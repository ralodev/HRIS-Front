import{_ as k,P as f,D as i,g as B,a as b,b as C,c as D,d as a,e as c,h as A,r as _,I as L,u as V,o as I,s as K,n as N,i as R}from"./index-73aa4d39.js";import{u as $}from"./adminStore-e739ab68.js";f.use(i,i,i,i);const H=B({name:"TablaEmpleados",components:{DataTable:f},setup(){const t=_("");L.get("email");let n;const d=_(),u=$(),s=R(),p=V(),r=_([]),l={responsive:!0,autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:K,pageLength:10,order:[[0,"asc"]],initComplete:function(){this.on("draw.dt",function(){N(()=>{w(),n.responsive.recalc()})})}},m=[{data:"id",title:"#",class:"all",width:"20%"},{data:"tipo",title:"Tipo",width:"10%",class:"min-tablet-l"},{data:"descripcion",title:"Descripción",class:"min-desktop no-wrap text-nowrap email-col",width:"10%"},{data:null,title:"Fecha",class:"all no-wrap text-nowrap email-col",width:"10%",render:function(o){let e=new Date(o.fecha),v=e.getDate(),y=e.getMonth()+1,T=e.getFullYear(),x=e.getHours(),E=e.getMinutes();return v+"/"+y+"/"+T+" a las "+x+":"+E+" hs"}},{data:null,title:"Usuario",class:"min-tablet-l no-wrap text-nowrap email-col",width:"10%",render:function(o){return o.usuario.email}},{data:null,class:"text-nowrap  acciones justify-content-center all ",width:"10%",title:"Acciones",orderable:!1,wrap:!0,render:function(o){return"<a title='Ver usuario' name='"+o.usuario.id+"' class='details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none'><i class='pi pi-eye'></i></a> "}}],h=async()=>{var o=!1;s.showLoading("Cargando datos"),setTimeout(()=>{o||(s.closeLoading(),s.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await u.getHistorial().then(()=>{r.value=u.data,console.log(r.value),s.closeLoading(),o=!0}).catch(e=>{e.code==="ERR_NETWORK"?s.showErrorAlert("Error","No se pudo conectar con el servidor"):s.showErrorAlert("Error","Ocurrió un error inesperado"),o=!0})},w=()=>{document.querySelectorAll(".details-btn").forEach(e=>{e.parentElement.classList.add("flex"),e.addEventListener("click",()=>{p.push({name:"usuarios_editar",params:{id:e.attributes.name.value}})})})},g=()=>{n.search(t.value).draw()};return I(()=>{h(),n=d.value.dt}),{columns:m,data:r,options:l,usuarios:()=>{p.push({name:"usuarios"})},search:g,searchText:t,table:d}}}),M={class:"container-lg pt-4 my-3"},O={class:"card shadow-5 border-round-2xl overflow-hidden"},F=a("div",{class:"d-flex card-header py-0 pe-0"},[a("span",{class:"flex text-center"},[a("i",{class:"bi bi-clock-history fw-bold h1 my-0"}),a("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Historial de cambios de usuarios ")])],-1),S={class:"card-body table-responsive"},U={class:"grid mb-2"},W={class:"col-12 lg:col-6 md:col-8"},j={class:"p-inputgroup"},q={class:"col-12 lg:col-6 md:col-4"};function P(t,n,d,u,s,p){const r=b("InputText"),l=b("Button"),m=b("DataTable");return C(),D("div",M,[a("div",O,[F,a("div",S,[a("div",U,[a("div",W,[a("div",j,[c(r,{placeholder:"Buscar cambio por usuario",id:"searchInput",onKeyup:A(t.search,["enter"]),modelValue:t.searchText,"onUpdate:modelValue":n[0]||(n[0]=h=>t.searchText=h),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),c(l,{icon:"pi pi-search",severity:"primary",onClick:t.search},null,8,["onClick"])])]),a("div",q,[c(l,{type:"button",label:"Volver a usuarios",icon:"pi pi-undo",onClick:t.usuarios,class:"float-end me-2",severity:"secondary",raised:""},null,8,["onClick"])])]),c(m,{columns:t.columns,data:t.data,class:"table-responsive text-nowrap hover row-border border order-column",width:"100%",options:t.options,ref:"table"},null,8,["columns","data","options"])])])])}const G=k(H,[["render",P]]);export{G as default};
