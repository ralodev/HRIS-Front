import{_ as x,P as _,D as u,g as A,a as b,b as k,c as O,d as a,e as m,h as C,r as g,u as R,o as q,s as B,n as N,O as D,i as S}from"./index-5511196e.js";import{u as U}from"./adminStore-34e3d2e9.js";_.use(u,u,u,u);const I=A({name:"TablaEmpleados",components:{DataTable:_},setup(){const n=g("");let l;const h=g(),i=U(),t=S(),E=R(),c=g([]),p={responsive:!0,autoWidth:!0,dom:"trip",paging:!0,pagingType:"simple_numbers",language:B,pageLength:10,order:[[1,"asc"]],initComplete:function(){this.on("draw.dt",function(){N(()=>{v(),l.responsive.recalc()})})}},f=[{data:null,title:"Correo electrónico",class:"all no-wrap text-nowrap",render:function(e,s){let r;return e.estado=="ACTIVO"?r="<span class='float-end p-tag p-component p-tag-success' title='Esta cuenta opera normalmente' style='cursor: help !important;'>A<span class='d-lg-block d-none'>ctivo</span></span>":e.estado=="BLOQUEADO"?r="<span class='float-end p-tag p-component p-tag-danger' title='Este usuario está bloqueado teporalmente' style='cursor: help !important;'>B<span class='d-lg-block d-none'>loqueado</span></span>":r="<span class='float-end p-tag p-component p-tag-warning' title='Este usuario no ha confirmado su correo electrónico' style='cursor: help !important;'>P<span class='d-lg-block d-none'>endiente</span>","<span class='not-edited'>"+e.email+"</span> "+r}},{data:null,title:"Nombre",class:"min-tablet-l",render:function(e){return e.nombre+" "+e.apellidos}},{data:"rol",title:"Rol",class:"min-tablet-l",render:function(e){let s=e=="ROLE_ADMIN"?1:e=="ROLE_EMPLEADO_HR"?2:e=="ROLE_ASISTENTE_HR"?3:4,r=e.replaceAll("_"," ").replaceAll("ROLE","");return"<span class='d-none'>"+s+"</span>"+r}},{data:"estado",class:"text-nowrap  acciones justify-content-center all ",width:"10%",title:"Acciones",orderable:!1,wrap:!0,render:function(e){let s='<a title="Ver empleado" class="details-btn me-1 px-3 p-button-sm p-button p-component p-button-icon-only p-button-primary p-button-raised text-decoration-none"><i class="pi pi-user-edit"></i></a> ';return e=="BLOQUEADO"?s+='<a title="Desbloquear" class="unlock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-success bg-green-600 p-button-raised text-decoration-none"><i class="pi pi-lock-open"></i></a> ':s+='<a title="Bloquear" class="lock-btn px-3 p-button-sm p-button p-component p-button-icon-only p-button-danger p-button-raised text-decoration-none"><i class="pi pi-lock"></i></a> ',s}},{data:"estado",title:"Estado",class:"never"}],d=async()=>{var e=!1;t.showLoading("Cargando datos"),setTimeout(()=>{e||(t.closeLoading(),t.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await i.getUsuarios().then(()=>{c.value=i.data,c.value.forEach(s=>{s.locked==!0?s.estado="BLOQUEADO":s.enabled==!1?s.estado="INACTIVO":s.estado="ACTIVO"}),t.closeLoading(),e=!0}).catch(s=>{s.code==="ERR_NETWORK"?t.showErrorAlert("Error","No se pudo conectar con el servidor"):t.showErrorAlert("Error","Ocurrió un error inesperado"),e=!0})},v=()=>{const e=document.querySelectorAll(".details-btn"),s=document.querySelectorAll(".lock-btn"),r=document.querySelectorAll(".unlock-btn"),T=D.get("email");e.forEach(o=>{o.parentElement.parentElement.firstChild.innerText.split(`
`)[0]==T&&(o.nextElementSibling.classList.add("p-disabled"),o.nextElementSibling.classList.remove("p-button-danger"),o.nextElementSibling.classList.add("p-button-secondary"),o.nextElementSibling.title="No puedes bloquear tu propia cuenta",o.classList.add("p-disabled"),o.classList.remove("p-button-primary"),o.classList.add("p-button-secondary"),o.title="No puedes editar tu propia cuenta",o.parentElement.parentElement.firstChild.firstChild.classList.contains("not-edited")&&(o.parentElement.parentElement.firstChild.innerHTML+="<span class='float-end me-1 p-tag p-component p-tag-info' title='Esta es tu cuenta' style='cursor: help !important;'>Tú</span>",o.parentElement.parentElement.firstChild.firstChild.classList.remove("not-edited"))),o.parentElement.classList.add("flex"),o.addEventListener("click",()=>{E.push({name:"usuarios_editar",params:{id:o.closest("tr").cells[0].firstChild.innerHTML}})})}),s.forEach(o=>{o.parentElement.classList.add("flex"),o.addEventListener("click",()=>{y(o.closest("tr").cells[0].innerText.split(`
`)[0])})}),r.forEach(o=>{o.parentElement.classList.add("flex"),o.addEventListener("click",()=>{w(o.closest("tr").cells[0].innerText.split(`
`)[0])})})},L=()=>{l.search(n.value).draw()};q(()=>{d(),l=h.value.dt});const y=e=>{t.showLoading("Bloqueando usuario"),setTimeout(()=>{t.closeLoading()},5e3),i.bloquearUsuario(e).then(()=>{t.closeLoading(),t.showSuccessAlert("Éxito","Usuario bloqueado"),d()}).catch(s=>{t.closeLoading(),s.code==="ERR_NETWORK"?t.showErrorAlert("Error","No se pudo conectar con el servidor"):t.showErrorAlert("Error","Ocurrió un error inesperado")})},w=e=>{t.showLoading("Desbloqueando usuario"),i.desbloquearUsuario(e).then(()=>{t.closeLoading(),t.showSuccessAlert("Éxito","Usuario desbloqueado"),d()}).catch(s=>{s.code==="ERR_NETWORK"?t.showErrorAlert("Error","No se pudo conectar con el servidor"):t.showErrorAlert("Error","Ocurrió un error inesperado")})};return{columns:f,data:c,options:p,registrar:()=>{E.push({name:"usuarios_registrar"})},search:L,searchText:n,table:h}}}),V={class:"container-lg pt-4 my-3"},K={class:"card shadow-5 border-round-2xl overflow-hidden"},M=a("div",{class:"d-flex card-header py-0 pe-0"},[a("span",{class:"flex text-center"},[a("i",{class:"bi bi-person-vcard-fill fw-bold h1 my-0"}),a("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Usuarios registrados ")])],-1),H={class:"card-body table-responsive"},W={class:"grid mb-2"},$={class:"col-12 lg:col-6 md:col-8"},P={class:"p-inputgroup"},Q={class:"col-12 lg:col-6 md:col-4"};function j(n,l,h,i,t,E){const c=b("InputText"),p=b("Button"),f=b("DataTable");return k(),O("div",V,[a("div",K,[M,a("div",H,[a("div",W,[a("div",$,[a("div",P,[m(c,{placeholder:"Buscar usuario",id:"searchInput",onKeyup:C(n.search,["enter"]),modelValue:n.searchText,"onUpdate:modelValue":l[0]||(l[0]=d=>n.searchText=d),type:"search",autocomplete:"none"},null,8,["onKeyup","modelValue"]),m(p,{icon:"pi pi-search",severity:"primary",onClick:n.search},null,8,["onClick"])])]),a("div",Q,[m(p,{type:"button",label:"Registrar usuario",icon:"pi pi-user-plus",onClick:n.registrar,class:"float-end",raised:""},null,8,["onClick"])])]),m(f,{columns:n.columns,data:n.data,class:"table-responsive text-nowrap hover row-border border order-column",width:"100%",options:n.options,ref:"table"},null,8,["columns","data","options"])])])])}const G=x(I,[["render",j]]);export{G as default};
