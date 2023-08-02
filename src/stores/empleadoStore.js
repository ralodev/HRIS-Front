import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('empleados', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/empleados',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/empleados',
    message: '',
    error: '',
    data: ([]),
  }),
  actions: {
    async getEmpleados() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/`);
        this.data = response.data;
        this.message = response.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },

    async getEmpleado(id) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/id/${id}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async getEmpleadoById(id) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/id/${id}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async getEmpleadoByEmail(email) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/email/${email}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async postEmpleado(newEmpleado) {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/`, newEmpleado);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async putEmpleado(updatedEmpleado, id) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/id/${id}`, updatedEmpleado);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async deleteEmpleado(id) {
      this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/id/${id}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async getHistorial(id) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/historial/${id}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },

    async restaurarRespaldo(id) {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/historial/restaurar/${id}`);
        this.data = response.data;
        return response;
      } catch (err) {
        return err;
      }
    },
  }
});
