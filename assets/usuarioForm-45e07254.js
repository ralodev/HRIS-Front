import{u as T}from"./adminStore-46d858cb.js";import{g as I,_ as G,r as f,k as H,u as j,o as F,l as $,a as w,m as K,b as c,c as o,d as e,t as E,e as h,v as W,j as P,q as g,p as d,w as J,I as Q,S as z,G as x,i as U,f as v}from"./index-cbda56a0.js";const X=I({name:"UsuarioForm",watch:{},props:{isEdit:{type:Boolean,default:!1}},setup(s){const r=f(s.isEdit),S=H(),k=j(),u=T(),_=f(!1),t=f(!1),l=f({}),i=f({}),C=f(null),y=f(!1),a=U(),O=f(!1),{showToast:b,showSuccessAlert:N,showConfirmAlert:A,showErrorAlert:M,showLoading:V,closeLoading:q}=U(),B=[{nombre:"ADMINISTRADOR",value:"ROLE_ADMIN"},{nombre:"EMPLEADO DE RECURSOS HUMANOS",value:"ROLE_EMPLEADO_HR"},{nombre:"ASISTENTE DE RECURSOS HUMANOS",value:"ROLE_ASISTENTE_HR"},{nombre:"EMPLEADO DE PLANEACIÓN",value:"ROLE_PLANEACION"},{nombre:"EMPLEADO GENERAL",value:"ROLE_EMPLEADO"}],R=async()=>{C.value=S.params.id,V(),u.getUsuario(C.value).then(()=>{i.value=u.data,_.value=!0,y.value=i.value.locked,O.value=i.value.email==Q.get("email"),D(),q()})};F(()=>{r.value&&R()});const D=()=>(_.value=!0,t.value=!0,i.value.nombre==null||i.value.nombre==null||i.value.nombre==""?(l.value.nombre="El nombre es obligatorio",t.value=!1):l.value.nombre="",i.value.apellidos==null||i.value.apellidos==null||i.value.apellidos==""?(l.value.apellidos="Los apellidos son obligatorios",t.value=!1):l.value.apellidos="",i.value.email==null||i.value.email==null||i.value.email==""?(l.value.email="El correo electrónico es obligatorio",t.value=!1):i.value.email.includes("@")?l.value.email="":(l.value.email="El correo electrónico debe ser válido",t.value=!1),i.value.rol==null||i.value.rol==null||i.value.rol==""?(l.value.rol="El rol es obligatorio",t.value=!1):l.value.rol="",t.value);return{data:i,validate:D,submit:()=>{if(D()==!1){b("error","Verifique los campos marcados en rojo");return}let n={...i.value};if(r.value){var m=i.value.id;A("¿Estás seguro?","Se actualizarán los datos del usuario","warning","Sí, actualizar","No, cancelar").then(L=>{L?u.editarUsuario(m,n).then(p=>{console.log(p),p.status==200?N("¡Éxito!","El usuario se ha actualizado correctamente","success","Aceptar").then(()=>{k.push({name:"usuarios"})}):M("Error",p.response.data,"error","Aceptar")}).catch(p=>{b("error","Ocurrió un error al actualizar el usuario")}):b("info","No se actualizaron los datos")})}else A("¿Estás seguro?","Se registrarán los datos del usuario","warning","Sí, registrar","No, cancelar").then(L=>{L?u.registrarUsuario(n).then(p=>{console.log(p),p.status==200?N("¡Registro exitoso!","El usuario recibirá un correo en unos minutos, revise su bandeja de entrada y su bandeja de spam","success","Aceptar").then(()=>{k.push({name:"usuarios"})}):M("Error",p.response.data,"error","Aceptar")}).catch(p=>{b("error","Ocurrió un error al registrar el usuario")}):b("info","No se registraron los datos")})},cancelar:()=>{A("¿Deseas cancelar?","Los cambios no guardados se perderán","question","Sí, cancelar","No, regresar").then(n=>{n&&k.push({name:"usuarios"})})},error:l,validated:_,isEdit:r,eliminar:()=>{z.fire({title:"Se requiere confirmación",text:"Esta acción eliminará al usuario de forma permanente y no se puede revertir, puedes bloquear al usuario en su lugar y reactivarlo cuando lo desees.",icon:"warning",iconColor:"#dc3545",input:"checkbox",inputValue:0,inputPlaceholder:"Entiendo, quiero continuar",confirmButtonText:'Continuar <i class="bi bi-shield-exclamation"></i>',confirmButtonColor:"#dc3545",cancelButtonText:"Cancelar</i>",showCancelButton:!0,inputValidator:n=>!n&&"Debes confirmar que entiendes las consecuencias de esta acción"}).then(n=>{n.value&&(console.log(i.value.id),u.eliminarUsuario(i.value.id).then(m=>{m==200?z.fire({icon:"success",title:"¡Éxito!",text:"El usuario ha sido eliminado de forma permanente"}).then(()=>{k.push({name:"usuarios"})}):M("Error","Ocurrió un error al eliminar el usuario","error","Aceptar")}).catch(m=>{b("error","Ocurrió un error al eliminar el usuario")}))})},roles:B,isLocked:y,lock_unlock:()=>{let n=i.value.id;i.value.locked==!0?(a.showLoading("Desbloqueando usuario"),u.desbloquearUsuario(n).then(()=>{a.closeLoading(),a.showSuccessAlert("Éxito","Usuario desbloqueado"),R()}).catch(m=>{m.code==="ERR_NETWORK"?a.showErrorAlert("Error","No se pudo conectar con el servidor"):a.showErrorAlert("Error","Ocurrió un error inesperado")})):(a.showLoading("Bloqueando usuario"),u.bloquearUsuario(n).then(()=>{a.closeLoading(),a.showSuccessAlert("Éxito","Usuario bloqueado"),R()}).catch(m=>{a.closeLoading(),m.code==="ERR_NETWORK"?a.showErrorAlert("Error","No se pudo conectar con el servidor"):a.showErrorAlert("Error","Ocurrió un error inesperado")}))},editingSelf:O,goBack:()=>k.go(-1)}},components:{InputText:$}}),Y={class:"container-lg pt-4 my-3"},Z={class:"card shadow-5 border-round-2xl overflow-hidden"},ee={class:"d-flex relative card-header py-0 pe-0"},se={class:"flex text-center"},ie={key:0,class:"bi bi-person-fill-gear fw-bold h1 my-0"},ae={key:1,class:"bi bi-person-fill-add fw-bold h1 my-0"},le={class:"fw-bold h4 align-self-center ms-3 my-0"},ce={id:"form"},te={class:"card-body"},re={class:"grid"},oe={class:"col-12"},ne={class:"col-12 md:col-offset-3 md:col-6"},de=e("label",{for:"curp",class:"form-label"},[x("Correo electrónico"),e("b",{class:"p-error"},"*")],-1),pe={key:0,class:"p-error"},ue={class:"col-12 md:col-offset-3 md:col-6"},me=e("label",{for:"nombre",class:"form-label"},[x("Nombre(s)"),e("b",{class:"p-error"},"*")],-1),fe={key:0,class:"p-error"},he={class:"col-12 md:col-offset-3 md:col-6"},ke=e("label",{for:"rfc",class:"form-label"},[x("Apellidos"),e("b",{class:"p-error"},"*")],-1),be={key:0,class:"p-error"},ge={class:"col-12 md:col-offset-3 md:col-6"},xe=e("label",{for:"genero",class:"form-label"},[x("Rol"),e("b",{class:"text-danger"},"*")],-1),Ee={key:0,class:"p-error"},ve=e("section",{class:"col-12"},[e("small",null,[e("b",{class:"text-danger"},"*"),x(" Campos obligatorios")])],-1),_e={key:0,class:"col-12"},Ce=v('<strong class="text-color">Permisos del rol:</strong><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Modificar configuraciones de la plataforma</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Usuarios</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Plazas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Departamentos</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>',11),ye=[Ce],we={key:1,class:"col-12"},Ae=v('<strong class="text-color">Permisos del rol:</strong><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Usuarios</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Plazas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar Departamentos</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>',11),Me=[Ae],Re={key:2,class:"col-12"},De=v('<strong class="text-color">Permisos del rol:</strong><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Usuarios</span><span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Empleados</span><span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Plazas</span><span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Departamentos</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>',11),Le=[De],Se={key:3,class:"col-12"},Oe=v('<strong class="text-color">Permisos del rol:</strong><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Usuarios</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Empleados</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Plazas</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Departamentos</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Consultar expedientes de Empleados</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>',11),Ne=[Oe],Pe={key:4,class:"col-12"},ze=v('<strong class="text-color">Permisos del rol:</strong><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Usuarios</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Empleados</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Plazas</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar Departamentos</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Realizar consultas avanzadas</span><span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Generar reportes</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expediente (propio)</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span><span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>',11),Ue=[ze],Ve={class:"card-footer d-flex"},qe={class:"card mt-5 border-round-2xl overflow-hidden shadow-5"},Be=e("div",{class:"container table-responsive"},[e("table",{class:"table table-hover table-sm table-bordered",id:"empleados"},[e("thead",null,[e("tr",{class:"text-center vertical-align-middle"},[e("th",{colspan:"2"}),e("th",{colspan:"5"},"Rol de usuario")]),e("tr",{class:"text-center vertical-align-middle"},[e("th",{colspan:"2"},"Función"),e("th",{scope:"col"},"Administrador"),e("th",{scope:"col"},"Empleado de RH"),e("th",{scope:"col"},"Auxiliar de RH"),e("th",{scope:"col"},"Empleado de Planeación"),e("th",{scope:"col"},"Empleado General")])]),e("tbody",{class:"text-center vertical-align-middle table-group-divider"},[e("tr",null,[e("th",{scope:"row",colspan:"2"},"Configuración de la plataforma"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",rowspan:"4"},"Usuarios")]),e("tr",null,[e("td",{class:"text-left"},"Crear"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Modificar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Eliminar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",rowspan:"4"},"Empleados")]),e("tr",null,[e("td",{class:"text-left"},"Crear"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Modificar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Eliminar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",rowspan:"4"},"Plazas")]),e("tr",null,[e("td",{class:"text-left"},"Crear"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Modificar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Eliminar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",rowspan:"4"},"Departamentos")]),e("tr",null,[e("td",{class:"text-left"},"Crear"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Modificar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("td",{class:"text-left"},"Eliminar"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",colspan:"2"},"Consulta avanzada"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",colspan:"2"},"Reportes"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})])]),e("tr",null,[e("th",{scope:"row",colspan:"2"},"Preferencias"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})])]),e("tr",null,[e("th",{scope:"row",colspan:"2"},"Cambiar contraseña"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})])]),e("tr",null,[e("th",{scope:"row",colspan:"2"},"Consultar expedientes"),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-green-700"},[e("i",{class:"pi pi-check-circle"})]),e("td",{class:"text-300"},[e("i",{class:"pi pi-minus"})]),e("td",{class:"text-yellow-700"},[e("i",{class:"pi pi-check-circle"})])])])])],-1),Te=e("a",{class:"btn btn-light",href:"/misc/roles.pdf",target:"_blank",download:""},[e("i",{class:"bi bi-download"}),x(" Descargar tabla ")],-1);function Ie(s,r,S,k,u,_){const t=w("Button"),l=w("InputText"),i=w("Dropdown"),C=w("Panel"),y=K("tooltip");return c(),o("div",Y,[e("div",Z,[e("div",ee,[e("span",se,[s.isEdit?(c(),o("i",ie)):(c(),o("i",ae)),e("span",le,E(s.isEdit?" Editar":"Registrar")+" Usuario ",1)]),h(t,{icon:"pi pi-times",severity:"danger",size:"small",onClick:s.goBack,class:"ms-auto border-noround float-end hover:bg-red-500 hover:text-white",text:"",style:{height:"48px"}},null,8,["onClick"])]),e("form",ce,[e("div",te,[e("div",re,[e("div",oe,[s.isEdit?W((c(),P(t,{key:0,icon:s.data.locked?"pi pi-lock-open":"pi pi-lock",class:g(["float-end border-none me-2",s.editingSelf==!0?"bg-gray-700 border-none":s.data.locked?"bg-green-700":"bg-red-700"]),onClick:s.lock_unlock,label:s.data.locked?"Desbloquear":"Bloquear",disabled:s.editingSelf==!0},null,8,["icon","onClick","label","class","disabled"])),[[y,s.data.locked?"Desbloquear al usuario permitirá que pueda iniciar sesión en el sistema":"Bloquear al usuario evitará que pueda iniciar sesión en el sistema, pero no eliminará sus datos",void 0,{top:!0}]]):d("",!0)]),e("div",ne,[de,h(l,{modelValue:s.data.email,"onUpdate:modelValue":r[0]||(r[0]=a=>s.data.email=a),autocomplete:"none",placeholder:"Direccion de correo electrónico",class:g(["w-full",{"p-invalid":s.error.email&&s.validated}]),disabled:s.isEdit},null,8,["modelValue","class","disabled"]),s.validated?(c(),o("small",pe,E(s.error.email||""),1)):d("",!0)]),e("div",ue,[me,h(l,{modelValue:s.data.nombre,"onUpdate:modelValue":r[1]||(r[1]=a=>s.data.nombre=a),placeholder:"Nombre de la persona, ej: Juan",class:g(["w-full",{"p-invalid":s.error.nombre&&s.validated}]),id:"nombre"},null,8,["modelValue","class"]),s.validated?(c(),o("small",fe,E(s.error.nombre||""),1)):d("",!0)]),e("div",he,[ke,h(l,{modelValue:s.data.apellidos,"onUpdate:modelValue":r[2]||(r[2]=a=>s.data.apellidos=a),placeholder:"Apellidos de la persona, ej: Perez Lopez",class:g(["w-full",{"p-invalid":s.error.apellidos&&s.validated}])},null,8,["modelValue","class"]),s.validated?(c(),o("small",be,E(s.error.apellidos||""),1)):d("",!0)]),e("div",ge,[xe,h(i,{modelValue:s.data.rol,"onUpdate:modelValue":r[3]||(r[3]=a=>s.data.rol=a),options:s.roles,optionLabel:"nombre",optionValue:"value",placeholder:"Elija el rol cuidadosamente",class:g(["w-full",{"p-invalid":s.error.rol&&s.validated}]),showClear:"",disabled:s.editingSelf},null,8,["modelValue","options","class","disabled"]),s.validated?(c(),o("small",Ee,E(s.error.rol||""),1)):d("",!0)]),ve,s.data.rol=="ROLE_ADMIN"?(c(),o("div",_e,ye)):d("",!0),s.data.rol=="ROLE_EMPLEADO_HR"?(c(),o("div",we,Me)):d("",!0),s.data.rol=="ROLE_ASISTENTE_HR"?(c(),o("div",Re,Le)):d("",!0),s.data.rol=="ROLE_PLANEACION"?(c(),o("div",Se,Ne)):d("",!0),s.data.rol=="ROLE_EMPLEADO"?(c(),o("div",Pe,Ue)):d("",!0)])]),e("div",Ve,[s.isEdit?(c(),P(t,{key:0,icon:"pi pi-trash",class:g(["me-2",s.editingSelf==!0?"bg-gray-700 border-none":"bg-red-700"]),label:"Eliminar",onClick:s.eliminar,severity:"danger",disabled:s.editingSelf==!0},null,8,["onClick","disabled","class"])):d("",!0),h(t,{icon:"pi pi-check",id:"submitButton",class:"me-2 ms-auto",label:"Guardar",onClick:s.submit},null,8,["onClick"]),h(t,{icon:"pi pi-times",class:"ms-2 float-end",severity:"secondary",label:"Cancelar",onClick:s.cancelar},null,8,["onClick"])])])]),e("div",qe,[h(C,{header:"Tabla de roles y permisos",toggleable:"",collapsed:""},{default:J(()=>[Be,Te]),_:1})])])}const We=G(X,[["render",Ie]]);export{We as E};
