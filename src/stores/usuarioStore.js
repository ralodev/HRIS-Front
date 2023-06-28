import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('usuarios', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/usuarios/',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/usuarios/',
    message: '',
    error: '',
    data: [],
  }),
  actions: {

    async get() {
      this.error = '';
    try {
      const response = await axios.get(`${this.apiURL}`);
      this.data = response.data.data;
      this.message = response.data.message;
      return response;
    } catch (err) {
      this.error = err.response.data.message || err.message;
      return err;
    }
  },

    async changePassword(payload) {
        this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}contrasena`, payload);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async datos(payload) {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}datos?nombre=${payload.nombre}&apellidos=${payload.apellidos}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async resetRequest(email) {
      this.error = '';
    try {
      const response = await axios.post(`${this.apiURL}publico/reset-request/${email}`);
      this.data = response.data.data;
      this.message = response.data.message;
      return response;
    } catch (err) {
      this.error = err.response.data.message || err.message;
      return err;
    }
  },

  async verificarCorreo(email) {
    this.error = '';
  try {
    const response = await axios.get(`${this.apiURL}publico/verificar/${email}`);
    this.data = response.data;
    this.message = response.message;
    return response;
  } catch (err) {
    this.error = err.response.data.message || err.message;
    return err;
  }
},

async registrar(email) {
  this.error = '';
try {
  const response = await axios.post(`${this.apiURL}publico/registrar/${email}`);
  this.data = response.data;
  this.message = response.message;
  return response;
} catch (err) {
  this.error = err.response.data.message || err.message;
  return err;
}
},

  },
});