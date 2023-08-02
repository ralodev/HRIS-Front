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
        this.data = response.data;
      } catch (err) {
        this.error = err.response.data || err.data;
      }
    },

    async getDepartamento(id) {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/id/${id}`);
        this.data = response.data;
        this.message = response.message;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async postDepartamento(newDepartamento) {
        this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/`, newDepartamento);
        this.data = response.data;
        this.message = response.message;
        return response;
      } catch (err) {
        this.error = err.response.message || err.message;
        return err;
      }
    },

    async putDepartamento(updatedDepartamento, id) {
        this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/${id}`, updatedDepartamento);
        this.data = response.data;
        return response;
      } catch (err) {
        this.error = err.response.message || err.message;
        return err;
      }
    },

    async deleteDepartamento(id) {
        this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/${id}`);
        this.data = response.data;
        this.message = response.message;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },
  },
});
