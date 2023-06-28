import{N as r,O as s}from"./index-3f82f31b.js";const o=r("empleados",{state:()=>({apiURL:"https://sgip-api-0fe230af7558.herokuapp.com/api/v1/empleados",message:"",error:"",data:[]}),actions:{async getEmpleados(){this.error="";try{const e=await s.get(`${this.apiURL}/`);this.data=e.data.data,this.message=e.data.message}catch(e){this.error=e.response.data.message||e.message}},async getEmpleado(e){this.error="";try{const a=await s.get(`${this.apiURL}/tarjeta/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async getEmpleadoById(e){this.error="";try{const a=await s.get(`${this.apiURL}/id/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async getEmpleadoByEmail(e){this.error="";try{const a=await s.get(`${this.apiURL}/email/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async postEmpleado(e){this.error="";try{const a=await s.post(`${this.apiURL}/`,e);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async putEmpleado(e,a){this.error="";try{const t=await s.put(`${this.apiURL}/id/${a}`,e);return this.data=t.data.data,this.message=t.data.message,t}catch(t){return this.error=t.response.data.message||t.message,t}},async deleteEmpleado(e){this.error="";try{const a=await s.delete(`${this.apiURL}/id/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async getHistorial(e){this.error="";try{const a=await s.get(`${this.apiURL}/historial/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async restaurarRespaldo(e){this.error="";try{const a=await s.post(`${this.apiURL}/historial/restaurar/${e}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}}}});export{o as u};
