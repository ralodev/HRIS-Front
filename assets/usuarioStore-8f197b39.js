import{N as r,O as a}from"./index-3f82f31b.js";const i=r("usuarios",{state:()=>({apiURL:"https://sgip-api-0fe230af7558.herokuapp.com/api/v1/usuarios/",message:"",error:"",data:[]}),actions:{async get(){this.error="";try{const e=await a.get(`${this.apiURL}`);return this.data=e.data.data,this.message=e.data.message,e}catch(e){return this.error=e.response.data.message||e.message,e}},async changePassword(e){this.error="";try{const s=await a.put(`${this.apiURL}contrasena`,e);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async datos(e){this.error="";try{const s=await a.get(`${this.apiURL}datos?nombre=${e.nombre}&apellidos=${e.apellidos}`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async resetRequest(e){this.error="";try{const s=await a.post(`${this.apiURL}publico/reset-request/${e}`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async verificarCorreo(e){this.error="";try{const s=await a.get(`${this.apiURL}publico/verificar/${e}`);return this.data=s.data,this.message=s.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async registrar(e){this.error="";try{const s=await a.post(`${this.apiURL}publico/registrar/${e}`);return this.data=s.data,this.message=s.message,s}catch(s){return this.error=s.response.data.message||s.message,s}}}});export{i as u};