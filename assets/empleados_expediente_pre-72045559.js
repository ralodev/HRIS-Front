import"./plazaStore-4fbc4f73.js";import{_ as l,g as c,b as d,c as i,u as p,k as u,r as m,o as f,I as x,i as _,d as e}from"./index-e51a670a.js";import{u as v}from"./empleadoStore-c41ec60f.js";const g=c({name:"seleccionar_empleado",setup(){const t=v(),s=_(),a=p();u();const o=m({}),r=async()=>{let n=x.get("email");setTimeout(()=>{t.getEmpleadoByEmail(n).then(()=>{if(o.value=t.data,o.value.id==null){s.showErrorAlert("Error","No pudimos encontrarte en la base de datos, probablemente sea un problema con tu correo electrónico, por favor acude a la oficina de recursos humanos.");return}else s.showSuccessToast("Te encontramos! redirigiendo..."),setTimeout(()=>{a.push({name:"empleados_expediente",params:{id:o.value.id}})},2e3)})},300)};return f(()=>{r()}),{data:o}}}),h={class:"container-lg text-center pt-4 my-3"},b=e("div",{class:"grid"},[e("div",{class:"col-12 md:col-6 lg:col-6 col-offset-0 md:col-offset-3 lg:col-offset-3"},[e("div",{class:"card border-round-2xl mt-5 pb-3 flex-wrap"},[e("div",{class:"text-3xl text-nowrap flex-wrap text-center vertical-align-middle text-color font-medium"},[e("p",{class:"text-5xl"}," Espere un momento "),e("div",{class:"spinner-border text-color text-2xl",role:"status"},[e("span",{class:"visually-hidden"},"Loading...")])])])])],-1),E=[b];function w(t,s,a,o,r,n){return d(),i("div",h,E)}const $=l(g,[["render",w]]);export{$ as default};
