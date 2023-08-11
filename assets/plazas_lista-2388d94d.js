import{_ as B,P as E,D as u,g as D,a as g,b as I,c as P,d as s,e as m,h as k,r as _,u as A,o as L,n as y,$ as r,s as z,i as R}from"./index-89966047.js";import{u as V}from"./plazaStore-13a4aa32.js";E.use(u,u,u,u);const $=D({name:"TablaPuestos",components:{DataTable:E},setup(){const a=_("");let n;const h=_(),w=V(),o=R(),f=A(),c=_([]),p={responsive:{details:{renderer:function(e,t,l){var i=x(e,t,l);return i||!1},display:function(e,t,l){if(console.log(t),t){if(r(e.node()).hasClass("parent"))return e.child(l(),"child").show(),r("div.slider",e.child()).slideDown(0),!0}else return e.child.isShown()?(r("div.slider",e.child()).slideUp(function(){e.child(!1),r(e.node()).removeClass("parent shown")}),!1):(e.child(l(),"child").show(),r(e.node()).addClass("parent shown"),r("div.slider",e.child()).slideDown(),!0)}}},autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:z,order:[[1,"desc"]],columnDefs:[{responsivePriority:1,targets:[0,1,8]},{responsivePriority:2,targets:[5]}],initComplete:function(){this.on("draw.dt",function(){y(()=>{T(),n.responsive.recalc()})})}},v=[{data:null,className:"dt-control",orderable:!1,defaultContent:"",width:"1%"},{data:null,title:"Clave Presupuestal",render:function(e){return e.clavePresupuestal+" "+(e.fechaInicio==null||e.funcion==null?"<span class='float-end p-tag p-component p-tag-warning p-tag-rounded mr-0' title='Faltan datos' style='cursor: help !important;'><span class='p-tag-icon pi pi-question me-0'></span></span>":"")}},{data:"tipoPlaza",title:"Tipo de plaza"},{data:"categoria",title:"Categoría",class:" none"},{data:"nombramiento",title:"Nombramiento"},{data:"empleado.tipoMovimiento",title:"Movimiento",className:"none"},{data:"empleado.nombre",title:"Nombre del empleado",class:" none"},{data:"empleado.rfc",title:"RFC del empleado"},{data:null,class:"text-nowrap acciones",width:"5%",title:"Editar",orderable:!1,render:function(){return'<a https="#" title="Editar" class="edit p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised me-1"><i class="bi bi-pencil-fill"></i></a> '}},{data:"numeroHorasNombramiento",title:"Horas de nombramiento",className:"none"},{data:"id",title:"ID",className:"never"}],b=async()=>{var e=!1;o.showLoading("Cargando datos"),setTimeout(()=>{e||(o.closeLoading(),o.showWarningAlert("Oops!","El servidor está tardando demasiado en responder")),setTimeout(()=>{e||(o.closeLoading(),o.showErrorAlert("Error","No se pudo conectar con el servidor"))},1e4)},5e3),await w.getPlazas().then(t=>{t.status==200?(c.value=t.data,o.closeLoading(),e=!0):(o.closeLoading(),o.showErrorAlert("Error","Ocurrió un error inesperado"),e=!0)}).catch(t=>{t.code==="ERR_NETWORK"?o.showErrorAlert("Error","No se pudo conectar con el servidor"):o.showErrorAlert("Error","Ocurrió un error inesperado"),e=!0}).finally(()=>{e=!0})},C=e=>{f.push({name:"plazas_editar",params:{id:e}})},T=()=>{document.querySelectorAll(".edit").forEach(t=>{t.parentElement.classList.add("flex"),t.addEventListener("click",()=>{C(t.closest("tr").lastChild.textContent)})})},N=()=>{n.search(a.value).draw()};L(()=>{b(),n=h.value.dt,y(()=>{n.responsive.rebuild(),n.responsive.recalc()})});function x(e,t,l){var i=r.map(l,function(d,j){return d.hidden?'<tr data-dt-row="'+d.rowIndex+'" data-dt-column="'+d.columnIndex+'"><td><b>'+d.title+"</b></td> <td>"+d.data+"</td></tr>":""}).join("");return i?'<div class="slider"><table>'+i+"</table></div>":void 0}return{data:c,options:p,columns:v,table:h,searchText:a,search:N,registrar:()=>{f.push({name:"seleccionar_empleado"})}}}}),K={class:"container-lg pt-4 my-3"},O={class:"card shadow-5 border-round-2xl overflow-hidden"},M=s("div",{class:"d-flex card-header py-0 pe-0"},[s("span",{class:"flex text-center"},[s("i",{class:"bi bi-briefcase-fill fw-bold h1 my-0"}),s("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Plazas ")])],-1),S={class:"card-body table-responsive"},W={class:"grid mb-2"},q={class:"col-12 lg:col-6 md:col-8"},F={class:"p-inputgroup"},H={class:"col-12 lg:col-6 md:col-4"};function U(a,n,h,w,o,f){const c=g("InputText"),p=g("Button"),v=g("DataTable");return I(),P("div",K,[s("div",O,[M,s("div",S,[s("div",W,[s("div",q,[s("div",F,[m(c,{placeholder:"Buscar plaza por tipo, clave o empleado",id:"searchInput",onKeyup:k(a.search,["enter"]),modelValue:a.searchText,"onUpdate:modelValue":n[0]||(n[0]=b=>a.searchText=b),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),m(p,{icon:"pi pi-search",severity:"primary",onClick:a.search},null,8,["onClick"])])]),s("div",H,[m(p,{type:"button",label:"Nuevo",icon:"pi pi-plus",onClick:a.registrar,class:"float-end",raised:""},null,8,["onClick"])])]),m(v,{columns:a.columns,data:a.data,class:"responsive text-nowrap hover row-border border order-column",width:"100%",options:a.options,ref:"table"},null,8,["columns","data","options"])])])])}const Q=B($,[["render",U]]);export{Q as default};
