import{N as r,O as t}from"./index-73aa4d39.js";const o=r("plazas",{state:()=>({apiURL:"https://sgip-api-0fe230af7558.herokuapp.com/api/v1/plazas",message:"",error:"",data:[]}),actions:{async getPlazas(){this.error="";try{const s=await t.get(`${this.apiURL}/`);return this.data=s.data.data,this.message=s.data.message,s}catch(s){return this.error=s.response.data.message||s.message,s}},async getPlaza(s){this.error="";try{const a=await t.get(`${this.apiURL}/id/${s}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async postPlaza(s){this.error="";try{const a=await t.post(`${this.apiURL}/`,s);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async putPlaza(s,a){this.error="";try{const e=await t.put(`${this.apiURL}/${a}`,s);return this.data=e.data.data,this.message=e.data.message,e}catch(e){return this.error=e.response.data.message||e.message,e}},async deletePlaza(s){this.error="";try{const a=await t.delete(`${this.apiURL}/${s}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}},async getHistorialByRfc(s){this.error="";try{const a=await t.get(`${this.apiURL}/historial/rfc/${s}`);return this.data=a.data.data,this.message=a.data.message,a}catch(a){return this.error=a.response.data.message||a.message,a}}}});export{o as u};
