import{_ as x,P as w,D as p,g as B,a as g,b as k,c as A,d as o,e as m,h as I,r as y,u as L,o as N,$ as n,s as V,n as $,i as K}from"./index-89966047.js";import{u as R}from"./departamentoStore-3a3f036f.js";w.use(p,p,p,p);const W=B({name:"TablaDepartamentos",components:{DataTable:w},setup(){const t=y("");let r;const h=y(),f=R(),a=K(),v=L(),c=y([]),u={responsive:{details:{renderer:function(e,s,l){var d=D(e,s,l);return d||!1},display:function(e,s,l){if(console.log(s),s){if(n(e.node()).hasClass("parent"))return e.child(l(),"child").show(),n("div.slider",e.child()).slideDown(0),!0}else return e.child.isShown()?(n("div.slider",e.child()).slideUp(function(){e.child(!1),n(e.node()).removeClass("parent shown")}),!1):(e.child(l(),"child").show(),n(e.node()).addClass("parent shown"),n("div.slider",e.child()).slideDown(),!0)}}},autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:V,pageLength:10,order:[[2,"asc"]],initComplete:function(){this.on("draw.dt",function(){$(()=>{E(),r.responsive.recalc()})})}},b=[{data:"id",title:"ID",class:"never"},{data:"nombre",title:"Nombre del departamento",class:"all"},{data:"empleados",title:"Número de empleados"},{data:null,title:"Acciones",width:"5%",orderable:!1,wrap:!0,class:"all",render:function(){return'<a https="#" class="edit my-1 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> '}}],_=async()=>{var e=!1;a.showLoading("Cargando datos"),setTimeout(()=>{e||(a.closeLoading(),a.showWarningAlert("Oops!","El servidor está tardando demasiado en responder")),setTimeout(()=>{e||(a.closeWarning(),a.showErrorAlert("Error","No se pudo conectar con el servidor"))},1e4)},5e3),await f.getDepartamentos().then(()=>{c.value=f.data}).catch(s=>{s.code==="ERR_NETWORK"?a.showErrorAlert("Error","No se pudo conectar con el servidor"):a.showErrorAlert("Error","Ocurrió un error inesperado")}).finally(()=>{e=!0,a.closeLoading()})},T=e=>{v.push({name:"departamentos_editar",params:{id:e}})},E=()=>{document.querySelectorAll(".edit").forEach(s=>{s.parentElement.classList.add("d-flex","justify-content-center"),s.addEventListener("click",()=>{T(s.closest("tr").cells[0].innerHTML)})})},C=()=>{console.log(t.value),r.search(t.value).draw()};N(()=>{_(),r=h.value.dt});function D(e,s,l){var d=n.map(l,function(i,F){return i.hidden?'<tr data-dt-row="'+i.rowIndex+'" data-dt-column="'+i.columnIndex+'"><td><b>'+i.title+"</b></td> <td>"+i.data+"</td></tr>":""}).join("");return d?'<div class="slider"><table>'+d+"</table></div>":void 0}return{columns:b,data:c,options:u,registrar:()=>{v.push({name:"departamentos_registrar"})},search:C,searchText:t,table:h}}}),O={class:"container-lg pt-4 my-3"},S={class:"card shadow-5 border-round-2xl overflow-hidden"},j=o("div",{class:"d-flex card-header py-0 pe-0"},[o("span",{class:"flex text-center"},[o("i",{class:"bi bi-buildings-fill fw-bold h1 my-0"}),o("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Departamentos ")])],-1),M={class:"card-body table-responsive"},U={class:"grid mb-2"},q={class:"col-12 lg:col-6 md:col-8"},H={class:"p-inputgroup"},P={class:"col-12 lg:col-6 md:col-4"};function z(t,r,h,f,a,v){const c=g("InputText"),u=g("Button"),b=g("DataTable");return k(),A("div",O,[o("div",S,[j,o("div",M,[o("div",U,[o("div",q,[o("div",H,[m(c,{placeholder:"Buscar departamento",id:"searchInput",onKeyup:I(t.search,["enter"]),modelValue:t.searchText,"onUpdate:modelValue":r[0]||(r[0]=_=>t.searchText=_),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),m(u,{icon:"pi pi-search",severity:"primary",onClick:t.search},null,8,["onClick"])])]),o("div",P,[m(u,{type:"button",label:"Nuevo",icon:"pi pi-plus",onClick:t.registrar,class:"float-end",raised:""},null,8,["onClick"])])]),m(b,{columns:t.columns,data:t.data,class:"responsive hover row-border border order-column",width:"100%",options:t.options,ref:"table"},null,8,["columns","data","options"])])])])}const Q=x(W,[["render",z]]);export{Q as default};
