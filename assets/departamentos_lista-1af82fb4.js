import{_ as x,P as w,D as p,g as B,a as g,b as k,c as I,d as a,e as m,h as L,r as y,u as A,o as N,$ as n,s as V,n as $,i as K}from"./index-e51a670a.js";import{u as R}from"./departamentoStore-285d8c00.js";w.use(p,p,p,p);const O=B({name:"TablaDepartamentos",components:{DataTable:w},setup(){const t=y("");let r;const h=y(),f=R(),o=K(),b=A(),c=y([]),u={responsive:{details:{renderer:function(e,s,l){var d=D(e,s,l);return d||!1},display:function(e,s,l){if(console.log(s),s){if(n(e.node()).hasClass("parent"))return e.child(l(),"child").show(),n("div.slider",e.child()).slideDown(0),!0}else return e.child.isShown()?(n("div.slider",e.child()).slideUp(function(){e.child(!1),n(e.node()).removeClass("parent shown")}),!1):(e.child(l(),"child").show(),n(e.node()).addClass("parent shown"),n("div.slider",e.child()).slideDown(),!0)}}},autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:V,pageLength:10,order:[[2,"asc"]],initComplete:function(){this.on("draw.dt",function(){$(()=>{E(),r.responsive.recalc()})})}},v=[{data:"id",title:"ID",class:"never"},{data:"nombre",title:"Nombre del departamento",class:"all"},{data:"empleados",title:"Número de empleados"},{data:null,title:"Acciones",width:"5%",orderable:!1,wrap:!0,class:"all",render:function(){return'<a https="#" class="edit my-1 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> '}}],_=async()=>{var e=!1;o.showLoading("Cargando datos"),setTimeout(()=>{e||(o.closeLoading(),o.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await f.getDepartamentos().then(()=>{c.value=f.data,o.closeLoading(),e=!0}).catch(s=>{s.code==="ERR_NETWORK"?o.showErrorAlert("Error","No se pudo conectar con el servidor"):o.showErrorAlert("Error","Ocurrió un error inesperado"),e=!0})},T=e=>{b.push({name:"departamentos_editar",params:{id:e}})},E=()=>{document.querySelectorAll(".edit").forEach(s=>{s.parentElement.classList.add("d-flex","justify-content-center"),s.addEventListener("click",()=>{T(s.closest("tr").cells[0].innerHTML)})})},C=()=>{console.log(t.value),r.search(t.value).draw()};N(()=>{_(),r=h.value.dt});function D(e,s,l){var d=n.map(l,function(i,F){return i.hidden?'<tr data-dt-row="'+i.rowIndex+'" data-dt-column="'+i.columnIndex+'"><td><b>'+i.title+"</b></td> <td>"+i.data+"</td></tr>":""}).join("");return d?'<div class="slider"><table>'+d+"</table></div>":void 0}return{columns:v,data:c,options:u,registrar:()=>{b.push({name:"departamentos_registrar"})},search:C,searchText:t,table:h}}}),S={class:"container-lg pt-4 my-3"},j={class:"card shadow-5 border-round-2xl overflow-hidden"},M=a("div",{class:"d-flex card-header py-0 pe-0"},[a("span",{class:"flex text-center"},[a("i",{class:"bi bi-buildings-fill fw-bold h1 my-0"}),a("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Departamentos ")])],-1),U={class:"card-body table-responsive"},W={class:"grid mb-2"},q={class:"col-12 lg:col-6 md:col-8"},H={class:"p-inputgroup"},P={class:"col-12 lg:col-6 md:col-4"};function z(t,r,h,f,o,b){const c=g("InputText"),u=g("Button"),v=g("DataTable");return k(),I("div",S,[a("div",j,[M,a("div",U,[a("div",W,[a("div",q,[a("div",H,[m(c,{placeholder:"Buscar departamento",id:"searchInput",onKeyup:L(t.search,["enter"]),modelValue:t.searchText,"onUpdate:modelValue":r[0]||(r[0]=_=>t.searchText=_),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),m(u,{icon:"pi pi-search",severity:"primary",onClick:t.search},null,8,["onClick"])])]),a("div",P,[m(u,{type:"button",label:"Nuevo",icon:"pi pi-plus",onClick:t.registrar,class:"float-end",raised:""},null,8,["onClick"])])]),m(v,{columns:t.columns,data:t.data,class:"responsive hover row-border border order-column",width:"100%",options:t.options,ref:"table"},null,8,["columns","data","options"])])])])}const Q=x(O,[["render",z]]);export{Q as default};
