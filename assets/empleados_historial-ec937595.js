import{u as B}from"./empleadoStore-4e6b9fcc.js";import{_ as M,g as T,a as V,b as y,c as C,d as e,e as g,G as j,t as l,q as t,p as I,u as O,k as X,r as d,o as z,i as H}from"./index-1eadb02e.js";const _=T({name:"seleccionar_empleado",setup(){const a=B(),s=H(),S=O(),k=X(),i=d([]),r=d([]),u=d([]),b=d([]),n=d([]),p=d([]),R=d(!1),m=d(0),o=d(0),E=d(k.params.id),A=d(!1),w=d(!1),x=async()=>{var v=!1;s.showLoading("Cargando datos"),setTimeout(()=>{v||(s.closeLoading(),s.showErrorAlert("Error","Ocurrió un error inesperado"))},5e3),await a.getHistorial(E.value).then(f=>{if(a.data.length>=1){R.value=!0,i.value=a.data[0].empleado,i.value.lenguas.length==0?i.value.lenguas="Sin lenguas":i.value.lenguas=i.value.lenguas.map(h=>h.nombre).join(", "),i.value.discapacidades.length==0?i.value.discapacidades="Sin discapacidades":i.value.discapacidades=i.value.discapacidades.map(h=>h.nombre).join(", ");for(let h=a.data.length-1;h>=0;h--){const c=a.data[h];c.respaldo.lenguas.length===0?c.respaldo.lenguas="Sin lenguas":c.respaldo.lenguas=c.respaldo.lenguas.map(D=>D.nombre).join(", "),c.respaldo.discapacidades.length===0?c.respaldo.discapacidades="Sin discapacidades":c.respaldo.discapacidades=c.respaldo.discapacidades.map(D=>D.nombre).join(", "),c.respaldo.id=c.id,r.value.push(c)}m.value=r.value.length,o.value=0,u.value=r.value[o.value].respaldo,p.value=r.value[o.value].fecha,p.value=new Date(p.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),b.value=r.value[0].fecha,b.value=new Date(b.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),o.value+1>=m.value?n.value="Original":(n.value=r.value[o.value+1].fecha,n.value=new Date(n.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})),A.value=m.value>1,w.value=!1}else R.value=!1;s.closeLoading(),v=!0}).catch(f=>{f.code==="ERR_NETWORK"?s.showErrorAlert("Error","No se pudo conectar con el servidor"):s.showErrorAlert("Error","Ocurrió un error inesperado"),v=!0})},L=()=>{o.value>0&&(o.value--,u.value=r.value[o.value].respaldo,p.value=r.value[o.value].fecha,p.value=new Date(p.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),n.value=r.value[o.value+1].fecha,n.value=new Date(n.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),w.value=o.value>0,A.value=!0)},N=()=>{o.value<m.value-1&&(o.value++,u.value=r.value[o.value].respaldo,p.value=r.value[o.value].fecha,p.value=new Date(p.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),o.value==m.value-1?n.value="versión original":(n.value=r.value[o.value+1].fecha,n.value=new Date(n.value).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})),A.value=o.value<m.value-1,w.value=!0)};return z(()=>{E.value=k.params.id,x()}),{hasHistory:R,empleado:i,respaldos:r,currentVersion:o,numberOfVersions:m,tieneSiguiente:A,tieneAnterior:w,siguiente:N,anterior:L,restaurarRespaldo:()=>{s.showQuestionAlert("Restaurar","¿Está seguro de que desea restaurar este respaldo?","Sí, restaurar","Cancelar").then(v=>{v&&(s.showLoading("Restaurando respaldo"),a.restaurarRespaldo(u.value.id).then(f=>{setTimeout(()=>{s.closeLoading(),s.showSuccessAlert("Éxito","Se ha restaurado el respaldo").then(()=>{S.go(-1)})},2e3)}).catch(f=>{setTimeout(()=>{s.closeLoading(),f.code==="ERR_NETWORK"?s.showErrorAlert("Error","No se pudo conectar con el servidor"):s.showErrorAlert("Error","Ocurrió un error inesperado")},2e3)}))})},respaldoActual:u,fechaRespaldoActual:p,fechaUltimoCambio:b,fechaCambioAnterior:n,goBack:()=>{S.go(-1)}}}}),$={class:"container-lg pt-4 my-3"},F={class:"card shadow-5 border-round-2xl overflow-hidden"},U={class:"d-flex card-header py-0 pe-0"},q=e("span",{class:"flex text-center"},[e("i",{class:"bi bi-clock-history fw-bold text-color h1 my-0"}),e("span",{class:"fw-bold text-color h4 align-self-center ms-3 my-0"}," Historial de empleado ")],-1),K={class:"card-body table-responsive"},P={key:0,class:"grid"},W={class:"table table-hover table-responsive"},G=e("th",null,[e("span",{class:"fw-bold text-color text-lg"},"Campo ")],-1),Q={class:"fw-bold text-color text-lg"},J={class:"block small fw-normal",style:{"line-height":"0.7rem"}},Y={class:"fw-bold text-color text-lg"},Z={class:"block small fw-normal",style:{"line-height":"0.7rem"}},ee={class:"text-muted fw-semibold"},ae=e("td",null,[e("span",{class:"fw-bold text-color text-color"},"Nombre")],-1),le=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"RFC")],-1),oe=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"CURP")],-1),te=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Sexo")],-1),se=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Nivel académico")],-1),re=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Correo electrónico")],-1),ne=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Profesión")],-1),de=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Lenguas")],-1),ie=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Discapacidades")],-1),ue=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Numero de tarjeta")],-1),ce={key:0},pe=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Departamento")],-1),me=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Tipo de movimiento")],-1),he=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Fecha de ingreso")],-1),ve=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Estado")],-1),fe=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Departamento")],-1),ge=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Fecha de baja ")],-1),be=e("td",null,[e("span",{class:"fw-bold text-color text-muted"},"Comentarios ")],-1),Ae={class:"justify-content-center flex w-full"},we={key:1},ye=e("p",{class:"text-4xl"},"No hay versiones anteriores",-1),Ce=[ye],Se={class:"card-footer d-flex justify-content-end"};function ke(a,s,S,k,i,r){const u=V("Button");return y(),C("div",$,[e("div",F,[e("div",U,[q,g(u,{icon:"pi pi-times",severity:"danger",size:"small",onClick:a.goBack,class:"ms-auto border-noround float-end hover:bg-red-500 hover:text-white",text:"",style:{height:"48px"}},null,8,["onClick"])]),e("div",K,[a.hasHistory?(y(),C("div",P,[e("table",W,[e("thead",null,[e("tr",null,[G,e("th",null,[e("span",Q,[j("Versión actual "),e("span",J,l(a.fechaUltimoCambio),1)])]),e("th",null,[e("span",Y,[j("Versión anterior "),e("span",Z,l(a.fechaCambioAnterior||"Valor original (al crearse)"),1)])])])]),e("tbody",ee,[e("tr",null,[ae,e("td",null,l(a.empleado.nombre),1),e("td",{class:t(a.empleado.nombre!=a.respaldoActual.nombre?"text-danger":"text-success")},l(a.respaldoActual.nombre),3)]),e("tr",null,[le,e("td",null,l(a.empleado.rfc),1),e("td",{class:t(a.empleado.rfc!=a.respaldoActual.rfc?"text-danger":"text-success")},l(a.respaldoActual.rfc),3)]),e("tr",null,[oe,e("td",null,l(a.empleado.curp),1),e("td",{class:t(a.empleado.curp!=a.respaldoActual.curp?"text-danger":"text-success")},l(a.respaldoActual.curp),3)]),e("tr",null,[te,e("td",null,l(a.empleado.sexo),1),e("td",{class:t(a.empleado.sexo!=a.respaldoActual.sexo?"text-danger":"text-success")},l(a.respaldoActual.sexo),3)]),e("tr",null,[se,e("td",null,l(a.empleado.nivelAcademico),1),e("td",{class:t(a.empleado.nivelAcademico!=a.respaldoActual.nivelAcademico?"text-danger":"text-success")},l(a.respaldoActual.nivelAcademico),3)]),e("tr",null,[re,e("td",null,l(a.empleado.correoInstitucional),1),e("td",{class:t(a.empleado.correoInstitucional!=a.respaldoActual.correoInstitucional?"text-danger":"text-success")},l(a.respaldoActual.correoInstitucional),3)]),e("tr",null,[ne,e("td",null,l(a.empleado.profesion),1),e("td",{class:t(a.empleado.profesion!=a.respaldoActual.profesion?"text-danger":"text-success")},l(a.respaldoActual.profesion),3)]),e("tr",null,[de,e("td",null,l(a.empleado.lenguas),1),e("td",{class:t(a.empleado.lenguas!=a.respaldoActual.lenguas?"text-danger":"text-success")},l(a.respaldoActual.lenguas),3)]),e("tr",null,[ie,e("td",null,l(a.empleado.discapacidades),1),e("td",{class:t(a.empleado.discapacidades!=a.respaldoActual.discapacidades?"text-danger":"text-success")},l(a.respaldoActual.discapacidades),3)]),e("tr",null,[ue,e("td",null,l(a.empleado.numeroTarjeta),1),e("td",{class:t(a.empleado.numeroTarjeta!=a.respaldoActual.numeroTarjeta?"text-danger":"text-success")},l(a.respaldoActual.numeroTarjeta),3)]),a.empleado.departamento&&a.respaldoActual.departamento?(y(),C("tr",ce,[pe,e("td",null,l(a.empleado.departamento.nombre),1),e("td",{class:t(a.empleado.departamento.nombre!=a.respaldoActual.departamento.nombre?"text-danger":"text-success")},l(a.respaldoActual.departamento.nombre),3)])):I("",!0),e("tr",null,[me,e("td",null,l(a.empleado.tipoMovimiento),1),e("td",{class:t(a.empleado.tipoMovimiento!=a.respaldoActual.tipoMovimiento?"text-danger":"text-success")},l(a.respaldoActual.tipoMovimiento),3)]),e("tr",null,[he,e("td",null,l(a.empleado.fechaIngreso),1),e("td",{class:t(a.empleado.fechaIngreso!=a.respaldoActual.fechaIngreso?"text-danger":"text-success")},l(a.respaldoActual.fechaIngreso),3)]),e("tr",null,[ve,e("td",null,l(a.empleado.estado),1),e("td",{class:t(a.empleado.estado!=a.respaldoActual.estado?"text-danger":"text-success")},l(a.respaldoActual.estado),3)]),e("tr",null,[fe,e("td",null,l(a.empleado.departamento.nombre),1),e("td",{class:t(a.empleado.departamento.nombre!=a.respaldoActual.departamento.nombre?"text-danger":"text-success")},l(a.respaldoActual.departamento.nombre),3)]),e("tr",null,[ge,e("td",null,l(a.empleado.fechaBaja||"Sin fecha"),1),e("td",{class:t(a.empleado.fechaBaja!=a.respaldoActual.fechaBaja?"text-danger":"text-success")},l(a.respaldoActual.fechaBaja||"Sin fecha"),3)]),e("tr",null,[be,e("td",null,l(a.empleado.comentarios||"Sin comentarios"),1),e("td",{class:t(a.empleado.comentarios!=a.respaldoActual.comentarios?"text-danger":"text-success")},l(a.respaldoActual.comentarios||"Sin comentarios"),3)])])]),e("div",Ae,[g(u,{icon:"pi pi-arrow-left",class:"ms-2 pointer-events-auto",severity:"secondary",size:"small",onClick:a.anterior,disabled:!a.tieneAnterior,title:a.tieneAnterior?"No hay versiones anteriores":"Anterior"},null,8,["onClick","disabled","title"]),g(u,{icon:"pi pi-check-circle",class:"ms-2 pointer-events-auto",severity:"primary",size:"small",label:"Restaurar",onClick:a.restaurarRespaldo,title:"Restaurar esta versión"},null,8,["onClick"]),g(u,{icon:"pi pi-arrow-right",class:"ms-2 pointer-events-auto",severity:"secondary",size:"small",onClick:a.siguiente,disabled:!a.tieneSiguiente,title:a.tieneSiguiente?"No hay versiones posteriores":"Siguiente"},null,8,["onClick","disabled","title"])])])):(y(),C("div",we,Ce))]),e("div",Se,[g(u,{icon:"pi pi-times",class:"ms-2",severity:"secondary",label:"Volver",onClick:a.goBack},null,8,["onClick"])])])])}const je=M(_,[["render",ke]]);export{je as default};
