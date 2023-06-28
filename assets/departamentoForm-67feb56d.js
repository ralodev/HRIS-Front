import{u as F}from"./departamentoStore-f38a2fc4.js";import{P as S,D as _,g as R,_ as P,r as u,k as L,u as $,o as I,n as O,l as G,a as y,b as i,c as m,d as e,t as d,e as v,q as U,p as k,j as H,w as M,F as W,H as J,i as K,s as Q,S as x,G as A}from"./index-3f82f31b.js";S.use(_,_,_,_);const X=R({name:"DepartamentoForm",watch:{},props:{isEdit:{type:Boolean,default:!1}},components:{DataTable:S},setup(a){const p=u(a.isEdit),N=L(),h=$(),r=F(),g=u(!1),n=u(!1),f=u({}),t=u({}),o=u(null),b=u({}),{showToast:c,showSuccessAlert:T,showConfirmAlert:C,showErrorAlert:D,showLoading:V,closeLoading:j}=K(),q={responsive:!0,autoWidth:!0,dom:"trip",paging:!0,language:Q},z=[{data:null,className:"dt-control",orderable:!1,defaultContent:"",width:"1%",class:""},{data:"numeroTarjeta",title:"Tarjeta",width:"5%",class:""},{data:"rfc",title:"RFC",class:""},{data:"curp",title:"CURP",class:""},{data:"nombre",title:"Nombre",class:""},{data:"estado",title:"Estado",className:"estado none"},{data:"edad",title:"Edad",className:"never"},{data:"nivelAcademico",title:"Nivel académico",className:"none"}];I(()=>{p.value&&(V(),o.value=N.params.id,r.getDepartamento(o.value).then(()=>{t.value=r.data,b.value=r.data.empleados?r.data.empleados:[],console.log(t.value),console.log(b.value),O(()=>{g.value=!0,E(),j()})}))});const E=()=>{if(g.value=!0,n.value=!0,t.value.nombre==null||t.value.nombre==null||t.value.nombre==""?(f.value.nombre="El nombre es obligatorio",n.value=!1):f.value.nombre="",!n.value){c("error","Verifique los campos marcados en rojo");return}};return{options:q,empleados:b,columns:z,data:t,validate:E,submit:()=>{E();let l={...t.value};if(p.value){var B=t.value.email;C("¿Estás seguro?","Se actualizarán los datos del departamento","warning","Sí, actualizar","No, cancelar").then(w=>{w?r.putDepartamento(l,B).then(s=>{console.log(s),s.status==200?T("¡Éxito!","El departamento se ha actualizado correctamente","success","Aceptar").then(()=>{c("info","Será redirigido a la lista de departamentos"),setTimeout(()=>{h.push({name:"departamentos"})},3e3)}):D("Error",s.response.data.mensaje,"error","Aceptar")}).catch(s=>{c("error","Ocurrió un error al actualizar el departamento")}):c("info","No se actualizaron los datos")})}else C("¿Estás seguro?","Se registrara el departamento","warning","Sí, registrar","No, cancelar").then(w=>{w?r.postDepartamento(l).then(s=>{console.log(s),s.status==201?T("¡Éxito!","El departamento se ha registrado correctamente","success","Aceptar").then(()=>{h.push({name:"departamentos"})}):D("Error",s.response.data.message,"error","Aceptar")}).catch(s=>{console.log(s),c("error","Ocurrió un error al registrar el departamento")}):c("info","No se registraron los datos")})},cancelar:()=>{C("¿Deseas cancelar?","Los cambios no guardados se perderán","question","Sí, cancelar","No, regresar").then(l=>{l&&h.push({name:"departamentos"})})},error:f,validated:g,isEdit:p,eliminar:()=>{x.fire({title:"Se requiere confirmación",text:"Esta acción eliminará al departamento de forma permanente y todos los empleados adscritos se quedarán sin departamento asignado. Esta acción solo la puede realizar el Administrador.",icon:"warning",iconColor:"#dc3545",input:"checkbox",inputValue:0,inputPlaceholder:"Entiendo, quiero continuar",confirmButtonText:'Continuar <i class="bi bi-shield-exclamation"></i>',confirmButtonColor:"#dc3545",cancelButtonText:"Cancelar</i>",showCancelButton:!0,inputValidator:l=>!l&&"Debes confirmar que entiendes las consecuencias de esta acción"}).then(l=>{l.value&&r.deleteDepartamento(t.value.id).then(()=>{x.fire({icon:"success",title:"¡Éxito!",text:"El departamento ha sido eliminado de forma permanente"}).then(()=>{h.push({name:"departamentos"})})}).catch(B=>{c("error","Ocurrió un error al eliminar el departamento")})})},goBack:()=>h.go(-1)}},components:{InputText:G}}),Y={class:"container-lg pt-4 my-3"},Z={class:"card shadow-5 border-round-2xl overflow-hidden"},ee={class:"d-flex relative card-header py-0 pe-0"},ae={class:"flex text-center"},te={key:0,class:"bi bi-person-fill-gear fw-bold h1 my-0"},oe={key:1,class:"bi bi-person-fill-add fw-bold h1 my-0"},se={class:"fw-bold h4 align-self-center ms-3 my-0"},re={id:"form"},ne={class:"card-body"},le={class:"grid"},ie={class:"col-12 md:col-offset-3 md:col-6"},de=e("label",{for:"curp",class:"form-label"},[A("Nombre del departamento"),e("b",{class:"p-error"},"*")],-1),ce={key:0,class:"p-error"},ue=e("small",null,[e("b",{class:"text-danger"},"*"),A(" Campos obligatorios")],-1),me={class:"card-footer d-flex"},pe={class:"card mt-5 border-round-2xl overflow-hidden shadow-5"},he={class:"container table-responsive"},fe={key:0,class:"table table-hover",id:"empleados"},be=e("thead",null,[e("tr",null,[e("th"),e("th",null,"Tarjeta"),e("th",null,"RFC"),e("th",null,"Nombre"),e("th",null,"Estado"),e("th",null,"Edad"),e("th",null,"Nivel académico")])],-1),ve=e("td",null,null,-1);function ge(a,p,N,h,r,g){const n=y("Button"),f=y("InputText"),t=y("Panel");return i(),m("div",Y,[e("div",Z,[e("div",ee,[e("span",ae,[a.isEdit?(i(),m("i",te)):(i(),m("i",oe)),e("span",se,d(a.isEdit?" Editar":"Registrar")+" Departamento ",1)]),v(n,{icon:"pi pi-times",severity:"danger",size:"small",onClick:a.goBack,class:"ms-auto border-noround float-end hover:bg-red-500 hover:text-white",text:"",style:{height:"48px"}},null,8,["onClick"])]),e("form",re,[e("div",ne,[e("div",le,[e("div",ie,[de,v(f,{modelValue:a.data.nombre,"onUpdate:modelValue":p[0]||(p[0]=o=>a.data.nombre=o),placeholder:"Nombre sin el prefijo 'Departamento'",class:U(["w-full",{"p-invalid":a.error.nombre&&a.validated}]),id:"nombre",autocomplete:"off",required:""},null,8,["modelValue","class"]),a.validated?(i(),m("small",ce,d(a.error.nombre||""),1)):k("",!0)])]),ue]),e("div",me,[a.isEdit?(i(),H(n,{key:0,icon:"pi pi-trash",class:"me-2",label:"Eliminar",onClick:a.eliminar,severity:"danger"},null,8,["onClick"])):k("",!0),v(n,{icon:"pi pi-check",id:"submitButton",class:"me-2 ms-auto",label:"Guardar",onClick:a.submit},null,8,["onClick"]),v(n,{icon:"pi pi-times",class:"ms-2 float-end",severity:"secondary",label:"Cancelar",onClick:a.cancelar},null,8,["onClick"])])])]),e("div",pe,[v(t,{header:"Tabla de empleados",toggleable:""},{default:M(()=>[e("div",he,[a.empleados&&a.empleados.length>0?(i(),m("table",fe,[be,e("tbody",null,[(i(!0),m(W,null,J(a.empleados,(o,b)=>(i(),m("tr",{key:b},[ve,e("td",null,d(o.numeroTarjeta),1),e("td",null,d(o.rfc),1),e("td",null,d(o.nombre),1),e("td",null,d(o.estado),1),e("td",null,d(o.edad),1),e("td",null,d(o.nivelAcademico),1)]))),128))])])):k("",!0)])]),_:1})])])}const ke=P(X,[["render",ge]]);export{ke as D};
