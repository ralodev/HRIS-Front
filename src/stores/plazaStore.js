import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('plazas', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/plazas',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/plazas',
    message: '',
    error: '',
    data: [],
  }),
  actions: {
    async getPlazas() {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async getPlaza(id) {
        this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/id/${id}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async postPlaza(newPuesto) {
        this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/`, newPuesto);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async putPlaza(updatedPuesto, id) {
        this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/${id}`, updatedPuesto);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async deletePlaza(id) {
        this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/${id}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },
  },
});
