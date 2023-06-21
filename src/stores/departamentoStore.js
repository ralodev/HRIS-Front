import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('departamentos', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/departamentos',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/departamentos',
    message: '',
    error: '',
    data: [],
  }),
  actions: {
    async getDepartamentos() {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/`);
        this.data = response.data.data;
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },

    async getDepartamento(id) {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/id/${id}`);
        this.data = response.data.data;
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },

    async postDepartamento(newDepartamento) {
        this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/`, newDepartamento);
        this.data = response.data.data;
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },

    async putDepartamento(updatedDepartamento, id) {
        this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/${id}`, updatedDepartamento);
        this.data = response.data.data;
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },

    async deleteDepartamento(id) {
        this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/${id}`);
        this.data = response.data.data;
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
  },
});
