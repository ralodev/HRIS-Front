import{_ as x,P as E,D as m,g as A,a as _,b as N,c as I,d as s,e as h,h as B,r as y,u as S,o as k,$ as l,s as D,n as V,i as R}from"./index-3f82f31b.js";import{u as M}from"./empleadoStore-545435cb.js";E.use(m,m,m,m);const H=A({name:"TablaEmpleados",components:{DataTable:E},setup(){const a=y("");let i;const f=y(),v=M(),r=R(),c=S(),p=y([]),u={responsive:{details:{renderer:function(e,o,n){var t=C(e,o,n);return t||!1},display:function(e,o,n){if(o){if(l(e.node()).hasClass("parent"))return e.child(n(),"child").show(),l("div.slider",e.child()).slideDown(0),!0}else return e.child.isShown()?(l("div.slider",e.child()).slideUp(function(){e.child(!1),l(e.node()).removeClass("parent shown")}),!1):(e.child(n(),"child").show(),l(e.node()).addClass("parent shown"),l("div.slider",e.child()).slideDown(),!0)}}},autoWidth:!0,dom:"trip",paging:!0,pagingType:"numbers",language:D,pageLength:10,order:[[2,"asc"]],columnDefs:[{responsivePriority:1,targets:[0,2,10]},{responsivePriority:2,targets:[4]}],initComplete:function(){this.on("draw.dt",function(){V(()=>{T(),i.responsive.recalc()})})}},b=[{data:null,className:"dt-control",orderable:!1,defaultContent:"",width:"1%",class:""},{data:"numeroTarjeta",title:"Tarjeta",width:"5%",class:""},{data:"rfc",title:"RFC",class:""},{data:"curp",title:"CURP",class:""},{data:"nombre",title:"Nombre",class:""},{data:"departamento.nombre",title:"Departamento",class:"",render:function(e,o,n){return e??"Sin departamento"}},{data:"estado",title:"Estado",className:"estado none"},{data:"correoInstitucional",title:"Correo",className:"none"},{data:"edad",title:"Edad",className:"never"},{data:"nivelAcademico",title:"Nivel académico",className:"none"},{data:null,orderable:!1,class:"text-nowrap  acciones justify-content-center",width:"5%",title:"Acciones",wrap:!0,render:function(){let e='<a title="Ver empleado" class="edit me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none"><i class="pi pi-eye"></i></a> ';return e+='<a title="Agregar plaza" class="acciones-plaza px-3 p-button-sm p-button p-component p-button-icon-only p-button-info p-button-raised text-decoration-none"><i class="pi pi-briefcase"></i></a>',e}}],g=async()=>{var e=!1;r.showLoading("Cargando datos"),setTimeout(()=>{e||(r.closeLoading(),r.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await v.getEmpleados().then(()=>{p.value=v.data,r.closeLoading(),e=!0}).catch(o=>{o.code==="ERR_NETWORK"?r.showErrorAlert("Error","No se pudo conectar con el servidor"):r.showErrorAlert("Error","Ocurrió un error inesperado"),e=!0})},w=e=>{c.push({name:"empleados_editar",params:{id:e}})},T=()=>{const e=document.querySelectorAll(".edit"),o=document.querySelectorAll(".acciones-plaza"),n=document.querySelectorAll(".estado");e.forEach(t=>{t.addEventListener("click",()=>{w(t.closest("tr").cells[1].innerHTML)})}),o.forEach(t=>{t.parentElement.classList.add("flex"),t.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML!=="ACTIVO"&&(t.disabled=!0,t.classList.remove("p-button-help"),t.classList.add("p-button-secondary"),t.classList.add("p-disabled"),t.parentElement.title="Empleado inactivo o no disponible"),t.addEventListener("click",()=>{c.push({name:"plazas_registrar",params:{id:t.closest("tr").cells[1].innerHTML}})})}),n.forEach(t=>{t.innerHTML=="INACTIVO"?t.parentElement.classList.add("bg-yellow-100"):t.innerHTML=="BAJA"&&t.parentElement.classList.add("bg-red-100")})},L=()=>{i.search(a.value).draw()};k(()=>{g(),i=f.value.dt});function C(e,o,n){var t=l.map(n,function(d,F){return d.hidden?'<tr data-dt-row="'+d.rowIndex+'" data-dt-column="'+d.columnIndex+'"><td><b>'+d.title+"</b></td> <td>"+d.data+"</td></tr>":""}).join("");return t?'<div class="slider"><table>'+t+"</table></div>":void 0}return{columns:b,data:p,options:u,registrar:()=>{c.push({name:"empleados_registrar"})},search:L,searchText:a,table:f}}}),O={class:"container-lg pt-4 my-3"},$={class:"card shadow-5 border-round-2xl overflow-hidden"},j=s("div",{class:"d-flex card-header py-0 pe-0"},[s("span",{class:"flex text-center"},[s("i",{class:"bi bi-people-fill fw-bold h1 my-0"}),s("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Empleados ")])],-1),z={class:"card-body table-responsive"},K={class:"grid mb-2"},P={class:"col-12 lg:col-6 md:col-8"},q={class:"p-inputgroup"},U={class:"col-12 lg:col-6 md:col-4"};function W(a,i,f,v,r,c){const p=_("InputText"),u=_("Button"),b=_("DataTable");return N(),I("div",O,[s("div",$,[j,s("div",z,[s("div",K,[s("div",P,[s("div",q,[h(p,{placeholder:"Buscar empleado",id:"searchInput",onKeyup:B(a.search,["enter"]),modelValue:a.searchText,"onUpdate:modelValue":i[0]||(i[0]=g=>a.searchText=g),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),h(u,{icon:"pi pi-search",severity:"primary",onClick:a.search},null,8,["onClick"])])]),s("div",U,[h(u,{type:"button",label:"Nuevo",icon:"pi pi-plus",onClick:a.registrar,class:"float-end",raised:""},null,8,["onClick"])])]),h(b,{columns:a.columns,data:a.data,class:"responsive text-nowrap hover row-border border order-column",width:"100%",options:a.options,ref:"table"},null,8,["columns","data","options"])])])])}const Q=x(H,[["render",W]]);export{Q as default};
