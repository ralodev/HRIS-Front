import{_ as N,g as A,a as b,b as n,c as l,d as e,Q as E,e as v,w as _,q as C,u as V,r,o as $,G as f,i as B}from"./index-e51a670a.js";import{u as P}from"./usuarioStore-5e306862.js";const L=A({name:"opciones",setup(){const a=P(),o=B();V();const s=r({contrasenaActual:"",contrasenaNueva:"",confirmarNueva:""}),d=r(!1),m=r(!1),p=r(!1),c=r(!1),u=r(!1),h=r(!1),t=r(!1),y=()=>{console.log("pass changed"),s.value.contrasenaNueva!==""&&s.value.contrasenaNueva!==null&&s.value.contrasenaNueva!==void 0?(d.value=/[A-Z]/.test(s.value.contrasenaNueva),m.value=/[a-z]/.test(s.value.contrasenaNueva),p.value=/[0-9]/.test(s.value.contrasenaNueva),c.value=/.*[!#$%&*+-.?@_]/.test(s.value.contrasenaNueva),u.value=/^.{8,20}$/.test(s.value.contrasenaNueva),h.value=d.value&&m.value&&p.value&&c.value&&u.value,t.value=h.value&&s.value.contrasenaNueva===s.value.confirmarNueva&&s.value.contrasenaActual!==""&&s.value.contrasenaActual!==null&&s.value.contrasenaActual!==void 0,t.value?document.getElementById("subPass").classList.remove("p-disabled"):document.getElementById("subPass").classList.add("p-disabled")):(d.value=!1,m.value=!1,p.value=!1,c.value=!1,u.value=!1)},g=async()=>{if(t.value){let i=!1;o.showLoading("Actualizando contraseña"),setTimeout(()=>{i||(o.closeLoading(),o.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3);let w={contrasenaActual:s.value.contrasenaActual,contrasenaNueva:s.value.contrasenaNueva};await a.changePassword(w).then(()=>{o.closeLoading(),i=!0,o.showSuccessAlert("Éxito","Contraseña actualizada correctamente")}).catch(k=>{k.code==="ERR_NETWORK"?o.showErrorAlert("Error","No se pudo conectar con el servidor"):o.showErrorAlert("Error","Ocurrió un error inesperado"),i=!0})}};return $(()=>{document.querySelectorAll('input[type="password"]').forEach(i=>{i.setAttribute("maxlength",20),i.classList.add("w-100")}),document.getElementById("current").setAttribute("autocomplete","current-password"),document.getElementById("new1").setAttribute("autocomplete","new-password"),document.getElementById("new2").setAttribute("autocomplete","new-password")}),{data:s,tieneMayuscula:d,tieneMinuscula:m,tieneNumero:p,tieneSimbolo:c,passChange:y,tamanoOk:u,cambiarContrasena:g}}}),M={class:"container-lg pt-4 my-3"},R={class:"card shadow-5 border-round-2xl overflow-hidden mx-auto",style:{"max-width":"500px"}},I=e("div",{class:"d-flex card-header py-0 pe-0"},[e("span",{class:"flex text-center"},[e("i",{class:"bi bi-key-fill fw-bold h1 my-0"}),e("span",{class:"fw-bold h4 align-self-center ms-3 my-0"}," Cambiar contraseña ")])],-1),K={class:"card-body table-responsive"},O={class:"grid mb-2"},S={class:"col-12 flex"},x=e("label",null,"Contraseña actual",-1),z=e("label",null,"Escribe una nueva contraseña",-1),q=e("h6",null,"Seguridad de la contraseña",-1),T=e("p",{class:"mt-2"},"La contraseña debe tener:",-1),U={class:"pl-2 ml-2 mt-0 list-none",style:{"line-height":"1.5"}},Z={key:0,class:"pi pi-check-circle text-success"},D={key:1,class:"pi pi-circle"},G={key:0,class:"pi pi-check-circle text-success"},Q={key:1,class:"pi pi-circle"},W={key:0,class:"pi pi-check-circle text-success"},Y={key:1,class:"pi pi-circle"},j={key:0,class:"pi pi-check-circle text-success"},F={key:1,class:"pi pi-circle"},H={key:0,class:"pi pi-check-circle text-success"},J={key:1,class:"pi pi-circle"},X=e("label",null,"Repite tu nueva contraseña",-1),ee=e("div",{class:"col-12 lg:col-6"},null,-1);function ae(a,o,s,d,m,p){const c=b("Password"),u=b("Divider"),h=b("Button");return n(),l("div",M,[e("div",R,[I,e("div",K,[e("div",O,[e("div",S,[e("form",{onSubmit:o[3]||(o[3]=E((...t)=>a.cambiarContrasena&&a.cambiarContrasena(...t),["prevent"]))},[x,v(c,{modelValue:a.data.contrasenaActual,"onUpdate:modelValue":o[0]||(o[0]=t=>a.data.contrasenaActual=t),class:"w-100 mb-3",feedback:!1,toggleMask:"",onKeyup:a.passChange,inputId:"current"},null,8,["modelValue","onKeyup"]),z,v(c,{modelValue:a.data.contrasenaNueva,"onUpdate:modelValue":o[1]||(o[1]=t=>a.data.contrasenaNueva=t),toggleMask:"",class:"w-100 mb-3",onKeyup:a.passChange,mediumRegex:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&*+-.?@_]).{6,20}$",strongRegex:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&*+-.?@_]).{8,20}$",weakLabel:"No cumple con los requisitos mínimos de seguridad",mediumLabel:"Ya casi tienes una contraseña segura",inputId:"new1"},{header:_(()=>[q]),footer:_(()=>[v(u),T,e("ul",U,[e("li",null,[a.tieneMayuscula?(n(),l("i",Z)):(n(),l("i",D)),f(" Por lo menos una mayúscula ")]),e("li",null,[a.tieneMinuscula?(n(),l("i",G)):(n(),l("i",Q)),f(" Por lo menos una minúscula ")]),e("li",null,[a.tieneNumero?(n(),l("i",W)):(n(),l("i",Y)),f(" Por lo menos un número ")]),e("li",null,[a.tieneSimbolo?(n(),l("i",j)):(n(),l("i",F)),f(" Por lo menos un símbolo (!#$%&*+-.?@_) ")]),e("li",null,[a.tamanoOk?(n(),l("i",H)):(n(),l("i",J)),f(" Entre 8 y 20 caracteres ")])])]),_:1},8,["modelValue","onKeyup","mediumRegex","strongRegex"]),X,v(c,{modelValue:a.data.confirmarNueva,"onUpdate:modelValue":o[2]||(o[2]=t=>a.data.confirmarNueva=t),class:C([[{"p-invalid":a.data.contrasenaNueva!==a.data.confirmarNueva}],"w-100 mb-3"]),feedback:!1,toggleMask:"",onKeyup:a.passChange,inputId:"new2"},null,8,["modelValue","class","onKeyup"]),v(h,{type:"submit",id:"subPass",label:"Cambiar contraseña",icon:"pi pi-check",class:"float-end p-disabled",raised:""})],32)]),ee])])])])}const te=N(L,[["render",ae]]);export{te as default};
