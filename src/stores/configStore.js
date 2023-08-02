import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('config', {
  state: () => ({
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/configuration',
    message: '',
    error: '',
    data: ([]),
  }),
  actions: {
    async getConfig() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}`);
        this.data = response.data;
        this.message = response.data;
        return response;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async getRegistrationStatus() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/check/registration`);
        this.data = response.data;
        this.message = response.message;
        return response;
      } catch (err) {
        return err;
      }
    },

    async getLoginStatus() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/check/login`);
        this.data = response.data;
        this.message = response.message;
        return response;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async getDomainFilterStatus() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/check/domain-filter`);
        this.data = response.data;
        this.message = response.message;
        return response;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async enableRegistration() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/enable/registration`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async disableRegistration() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/disable/registration`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async enableLogin() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/enable/login`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async disableLogin() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/disable/login`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async enableDomainFilter() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/enable/domain-filter`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async disableDomainFilter() {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/disable/domain-filter`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },



  }
});
