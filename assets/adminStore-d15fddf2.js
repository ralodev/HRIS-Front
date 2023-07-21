import{N as o,O as e}from"./index-e51a670a.js";const h=o("admin",{state:()=>({apiURL:"https://sgip-api-0fe230af7558.herokuapp.com/api/v1/admin",message:"",error:"",data:[]}),actions:{async getUsuario(a){this.error="";try{const s=await e.get(`${this.apiURL}/usuarios/${a}`,null,{headers:{Authorization:`Bearer ${this.token}`}});this.data=s.data,this.message=s.message}catch(s){this.error=s.response.message||s.message}},async getUsuarios(){this.error="";try{const a=await e.get(`${this.apiURL}/usuarios`);this.data=a.data,this.message=a.message}catch(a){this.error=a.response.message||a.message}},async registrarUsuario(a){this.error="";try{const s=await e.post(`${this.apiURL}/usuarios`,a);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async editarUsuario(a,s){this.error="";try{const t=await e.put(`${this.apiURL}/usuarios/${a}`,s);return this.data=t.data.data,this.message=t.data.message,t}catch(t){return this.error=t.response.data.message||t.message,t}},async bloquearUsuario(a){this.error="";try{const s=await e.post(`${this.apiURL}/usuarios/${a}/bloquear`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async desbloquearUsuario(a){this.error="";try{const s=await e.post(`${this.apiURL}/usuarios/${a}/desbloquear`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async eliminarUsuario(a){this.error="";try{const s=await e.delete(`${this.apiURL}/usuarios/${a}`);return this.data=s.data.data,this.message=s.data.message,s.status}catch(s){return this.error=s.response.data.message||s.message,s}},async restablecerContrasena(a){this.error="";try{const s=await e.put(`${this.apiURL}/usuarios/${a}/restablecer`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async getHistorial(){this.error="";try{const a=await e.get(`${this.apiURL}/historial`);return this.data=a.data,this.message=a.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async getHistorialUsuario(a){this.error="";try{const s=await e.get(`${this.apiURL}/historial/usuario/${a}`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async respaldo(){this.error="";try{const a=await e({method:"get",url:`${this.apiURL}/respaldo`,responseType:"blob"}).then(s=>{if(s.status===200){const t=window.URL.createObjectURL(new Blob([s.data])),r=document.createElement("a");r.href=t;const i=s.headers["content-disposition"].split("filename=")[1].trim().replaceAll('"',"");r.setAttribute("download",i),document.body.appendChild(r),r.click()}else throw new Error("Error al descargar el respaldo");return this.data=s.data.data,this.message=s.data.message,s})}catch(a){return this.error=a.response.data.message||a.message,a}}}});export{h as u};
