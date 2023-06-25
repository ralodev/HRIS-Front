import{_ as p,r as i,u as x,o as b,O as d,a as u,b as h,c as w,d as e,Q as _,e as m,F as g,S as f,f as y}from"./index-818cca80.js";import{u as S}from"./usuarioStore-652609a8.js";const k={name:"Reset",setup(){i(null);const c=S();x();const o=i(!1),n=i(!1),t=i(null),l=i({email:"",password:""});return b(()=>{document.querySelector('input[type="text"]').focus(),d.get("resetLocked")&&(n.value=!0,t.value=d.get("lockedUntil"))}),{onSubmit:()=>{o.value=!0,f.fire({title:"Se requiere confirmación",text:"Esta función puede realizarse una vez cada 30 minutos, por favor, verifique que la dirección de correo electrónico sea correcta.",icon:"warning",iconColor:"#f6811e",input:"checkbox",inputValue:0,inputPlaceholder:"He verificado la dirección de correo electrónico",confirmButtonText:"Continuar",confirmButtonColor:"#f6811e",cancelButtonText:"Cancelar</i>",showCancelButton:!0,inputValidator:a=>!a&&"Debes confirmar que has verificado la dirección de correo electrónico"}).then(a=>{a.value&&c.resetRequest(l.value.email).then(()=>{f.fire({icon:"success",title:"Listo!",text:"Se ha enviado un correo electrónico a la dirección proporcionada, por favor, verifique su bandeja de entrada y spam. (El correo puede tardar unos minutos en llegar)"})}).catch(r=>{showToast("error","Ocurrió un error al enviar el correo electrónico, por favor, intente de nuevo más tarde.")})}),o.value=!1},data:l,loading:o}}},C={class:"container-fluid surface-0"},B={class:"surface-card w-full md:w-8 lg:w-6 mx-auto v-center",style:{"max-width":"500px","padding-top":"3rem","padding-bottom":"8rem"}},T=e("div",{class:"text-center mb-2"},[e("div",{class:"text-900 text-4xl pb-3 font-medium"},"¿Olvidaste tu contraseña?")],-1),q=e("label",{for:"email1",class:"block text-900 fs-5 font-medium mb-2"},"Correo electrónico",-1),E=e("span",{class:"block font-normal"},"Si el correo electrónico coincide con el de tu cuenta, te enviaremos un correo con un enlace para restablecer tu contraseña.",-1),V=e("span",{class:"block font-medium my-2"},"Esta acción solo se puede realizar una vez cada 30 minutos.",-1),O=y('<footer><div class="row mx-0 justify-content-center mb-0 pt-5 pb-0 row-2 px-3"><div class="col-12"><div class="row row-2"><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Dirección</li><li>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030</li><li class="mt-3 fw-bold">Contacto</li><li>Email: <a href="mailto:jefatura.humanos@oaxaca.tecnm.mx" style="color:#fff;">jefatura.humanos@oaxaca.tecnm.mx</a></li><li>Tel: (951) 501 50 16 Ext. 1055</li></ul></div><div class="col-sm-4 my-sm-0"><ul class="list-unstyled"><li class="mt-0 fw-bold">Enlaces</li><li class="mt-1"><a href="www.oaxaca.tecnm.mx" style="color:#fff;text-decoration:none;">Instituto Tecnológico de Oaxaca</a></li><li class="mt-1"><a href="https://it.sgwebcualli.com/Oaxaca/" style="color:#fff;text-decoration:none;">Sistema de Gestión de la Calidad</a></li><li class="mt-1"><a href="http://www.oaxaca.tecnm.mx/directorio" style="color:#fff;text-decoration:none;">Directorio</a></li></ul></div><div class="col-sm-3 text-md-center"><h5><span><i class="fa fa-firefox text-light" aria-hidden="true"></i></span><b> Instituto tecnológico de Oaxaca</b></h5></div></div></div></div><div class="row mx-0 justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2"><div class="col-12"><div class="row mx-0 my-1 row-1 no-gutters"><div class="text-center">Recursos Humanos © 2023 Instituto Tecnológico de Oaxaca. Todos los derechos reservados. </div><div class="col-md-3 col-auto"></div><div class="col-md-3 col-auto"></div></div></div></div></footer>',1);function j(c,o,n,t,l,v){const a=u("InputText"),r=u("Button");return h(),w(g,null,[e("div",C,[e("div",B,[T,e("div",null,[e("form",{id:"login",onSubmit:o[1]||(o[1]=_((...s)=>t.onSubmit&&t.onSubmit(...s),["prevent"])),class:"px-5"},[q,m(a,{id:"email1",modelValue:t.data.email,"onUpdate:modelValue":o[0]||(o[0]=s=>t.data.email=s),type:"text",class:"w-full mb-3",autocomplete:"email",required:""},null,8,["modelValue"]),E,V,m(r,{type:"submit",label:t.loading?null:"Enviar email",icon:"pi pi-envelope",class:"w-full hover:shadow-3 bg-primary-700 hover:bg-primary-600",loading:t.loading},null,8,["label","loading"])],32)])])]),O],64)}const z=p(k,[["render",j]]);export{z as default};