import"./plazaStore-4fc19e7a.js";import{_ as l,g as i,b as d,c as u,u as p,k as m,r as f,o as x,I as _,i as v,d as e}from"./index-8df1458c.js";import{u as g}from"./empleadoStore-db1687c0.js";const h=i({name:"seleccionar_empleado",setup(){const a=g(),r=v(),t=p();m();const o=f({}),c=async()=>{let n=_.get("email");setTimeout(()=>{a.getEmpleadoByEmail(n).then(s=>{o.value=s.data,s.status!=200?(r.showErrorAlert("Error","No pudimos encontrar datos vinculados a tu correo electrónico, si crees que es un error, por favor acude a la oficina de recursos humanos."),setTimeout(()=>{t.push({name:"inicio"})},2e3)):setTimeout(()=>{t.push({name:"empleados_expediente",params:{id:s.value.id}})},500)})},300)};return x(()=>{c()}),{data:o}}}),E={class:"container-lg text-center pt-4 my-3"},b=e("div",{class:"grid"},[e("div",{class:"col-12 md:col-6 lg:col-6 col-offset-0 md:col-offset-3 lg:col-offset-3"},[e("div",{class:"card border-round-2xl mt-5 pb-3 flex-wrap"},[e("div",{class:"text-3xl text-nowrap flex-wrap text-center vertical-align-middle text-color font-medium"},[e("p",{class:"text-5xl"}," Espere un momento "),e("div",{class:"spinner-border text-color text-2xl",role:"status"},[e("span",{class:"visually-hidden"},"Loading...")])])])])],-1),w=[b];function y(a,r,t,o,c,n){return d(),u("div",E,w)}const T=l(h,[["render",y]]);export{T as default};
