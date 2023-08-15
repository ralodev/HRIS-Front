import{u as k}from"./plazaStore-e447d125.js";import{_ as S,g as T,a as B,b as r,c as l,d as e,e as w,F as b,H as g,w as L,r as h,u as P,k as I,o as C,I as M,t as i,i as N}from"./index-cbda56a0.js";import{u as O}from"./empleadoStore-ba9482ec.js";const F=T({name:"seleccionar_empleado",setup(){const s=k();h("");const p=O(),n=N(),v=h(!1),x=P(),D=I(),u=h(D.params.id),t=h({}),o=h([]),y=["nombre","rfc","curp","fechaDeNacimiento","edad","sexo","nivelAcademico","profesion","discapacidades","lenguas"],m=["numeroDeTarjeta","estado","fechaDeIngreso","fechaDeBaja","motivoDeBaja","tipoDeMovimiento","departamento","fechaDeNacimiento","edad","sexo","correoInstitucional"],j=async()=>{var d=!1;n.showLoading("Cargando datos"),setTimeout(()=>{d||(n.closeLoading(),n.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),p.getEmpleadoById(u.value).then(c=>{c.status==200?(t.value=p.data,t.value.fechaDeBaja=t.value.fechaBaja,t.value.motivoDeBaja=t.value.motivoBaja,t.value.fechaDeIngreso=t.value.fechaIngreso,t.value.numeroDeTarjeta=t.value.numeroTarjeta,t.value.tipoDeMovimiento=t.value.tipoMovimiento,t.value.departamento=t.value.departamento.nombre,t.value.fechaDeNacimiento=t.value.fechaNacimiento,delete t.value.id,delete t.value.fechaBaja,delete t.value.motivoBaja,delete t.value.comentarios,delete t.value.fechaIngreso,delete t.value.numeroTarjeta,delete t.value.tipoMovimiento,delete t.value.fechaNacimiento,t.value.lenguas=t.value.lenguas.map(a=>a.nombre).join(", "),t.value.discapacidades=t.value.discapacidades.map(a=>a.nombre).join(", "),console.log(t.value),s.getHistorialByRfc(t.value.rfc).then(()=>{o.value=s.data,console.log(o.value),o.value.forEach(a=>{a.tipoDePlaza=a.tipoPlaza,a.fechaDeInicio=a.fechaInicio,a.fechaDeFin=a.fechaFin,a.tiempoDeServicio=E(a.fechaDeInicio,a.fechaDeFin),delete a.empleado,delete a.id,delete a.tipoPlaza,delete a.fechaInicio,delete a.fechaFin}),console.log(o.value)})):n.showErrorAlert("Error",c.response.data)}).finally(()=>{d=!0,n.closeLoading()})},E=(d,c)=>{d=new Date(d),c=new Date(c);var a=c.getTime()-d.getTime(),A=Math.floor(a/(1e3*60*60*24*365.25));a-=A*(1e3*60*60*24*365.25);var f=Math.floor(a/(1e3*60*60*24*30.4375));a-=f*(1e3*60*60*24*30.4375);var _=Math.floor(a/(1e3*60*60*24));return a-=_*(1e3*60*60*24),A>0?A+" años, "+f+" meses, "+_+" días":f>0?f+" meses, "+_+" días":_+" días"};return C(()=>{u.value=D.params.id,j(),v.value=M.get("rol")!="[ROLE_EMPLEADO]"}),{data:t,dataHistorial:o,ordenAtributosPersonales:y,ordenAtributosTrabajador:m,canGoBack:v,goBack:()=>{v.value?x.go(-1):x.push({name:"inicio"})}}},methods:{formatearAtributo(s){const n=s.split(/(?=[A-Z])/).join(" ");return n.charAt(0).toUpperCase()+n.slice(1)}}}),R={class:"container-lg pt-4 my-3"},H={class:"card shadow-5 border-round-2xl overflow-hidden"},$={class:"d-flex card-header py-0 pe-0"},z=e("span",{class:"flex text-center"},[e("i",{class:"bi bi-journal-text fw-bold text-color h1 my-0"}),e("span",{class:"fw-bold text-color h4 align-self-center ms-3 my-0"}," Expediente ")],-1),V={class:"card-body table-responsive"},Z={key:0,class:"grid"},G={class:"table table-hover text-color"},U=e("thead",null,[e("tr",null,[e("th",{colspan:"2"},[e("div",{class:"w-100 text-xl text-center"},"DATOS PERSONALES")])])],-1),q={class:"font-bold w-1 text-nowrap",style:{"text-transform":"uppercase"}},J={class:"font-medium"},K={class:"table table-hover table-responsive text-color"},Q=e("thead",null,[e("tr",null,[e("th",{colspan:"2 text-center"},[e("div",{class:"w-100 text-xl text-center"},"DATOS LABORALES")])])],-1),W={class:"font-bold w-1 text-nowrap",style:{"text-transform":"uppercase"}},X={class:"font-medium"},Y={key:1},ee=e("p",{class:"text-4xl"},"No hay versiones anteriores",-1),te=[ee],ae={class:"card-footer d-flex justify-content-end"},oe={class:"card mt-5 border-round-2xl overflow-hidden shadow-5"},se={class:"container table-responsive text-base"},re={class:"table table-hover text-color"},le=e("thead",null,[e("tr",null,[e("th",{colspan:"2 text-center"},[e("div",{class:"w-100 text-xl text-center"},"DATOS DE LA PLAZA")])])],-1),ne={class:"font-bold w-1 text-nowrap"},ie={class:"font-medium"},de=e("hr",{class:"border-5 my-5"},null,-1);function ce(s,p,n,v,x,D){const u=B("Button"),t=B("Panel");return r(),l("div",R,[e("div",H,[e("div",$,[z,w(u,{icon:"pi pi-times",severity:"danger",size:"small",onClick:s.goBack,class:"ms-auto border-noround float-end hover:bg-red-500 hover:text-white",text:"",style:{height:"48px"}},null,8,["onClick"])]),e("div",V,[s.data?(r(),l("div",Z,[e("table",G,[U,e("tbody",null,[(r(!0),l(b,null,g(s.ordenAtributosPersonales,o=>(r(),l("tr",{key:o},[e("td",q,i(s.formatearAtributo(o)),1),e("td",J,i(s.data[o]),1)]))),128))])]),e("table",K,[Q,e("tbody",null,[(r(!0),l(b,null,g(s.ordenAtributosTrabajador,o=>(r(),l("tr",{key:o},[e("td",W,i(s.formatearAtributo(o)),1),e("td",X,i(s.data[o]),1)]))),128))])])])):(r(),l("div",Y,te))]),e("div",ae,[w(u,{icon:"pi pi-times",class:"ms-2",severity:"secondary",label:"Volver",onClick:s.goBack},null,8,["onClick"])])]),e("div",oe,[w(t,{header:"Historial de plazas",class:"text-xl",toggleable:""},{default:L(()=>[e("div",se,[(r(!0),l(b,null,g(s.dataHistorial,o=>(r(),l("div",{key:o.id,class:"uppercase mb-5"},[e("h3",null,i(o.tipoDePlaza.split("(")[0])+" DE "+i(o.fechaDeInicio.split("-")[0])+" A "+i(o.fechaDeFin.split("-")[0]),1),e("table",re,[le,e("tbody",null,[(r(!0),l(b,null,g(o,(y,m)=>(r(),l("tr",{key:m},[e("td",ne,i(s.formatearAtributo(m)),1),e("td",ie,i(y),1)]))),128))])]),de]))),128))])]),_:1})])])}const ve=S(F,[["render",ce]]);export{ve as default};
