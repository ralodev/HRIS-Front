import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('admin', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/admin',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/admin',
    message: '',
    error: '',
    data: ([]),
  }),
  actions: {
    async getUsuario(email) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/usuarios/${email}`, null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.data = response.data;
        this.message = response.message;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async getUsuarios() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/usuarios`);
        this.data = response.data;
        this.message = response.message;
      } catch (err) {
        this.error = err.response.message || err.message;
      }
    },

    async registrarUsuario(newUsuario) {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/registrar`, newUsuario);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async editarUsuario(email,newUsuario) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/actualizar/${email}`, newUsuario);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async bloquearUsuario(email) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/bloquear/${email}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async desbloquearUsuario(email) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/desbloquear/${email}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async eliminarUsuario(email) {
      this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/eliminar/${email}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async restablecerContrasena(email) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/restablecer/${email}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async respaldo() {
      this.error = '';
      try {
        const response = await axios({
          method: 'get',
          url: `${this.apiURL}/respaldo`,
          responseType: 'blob',  // Indica que la respuesta será un blob (archivo binario)
        }).then((response) => {

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileName = response.headers['content-disposition'].split('filename=')[1].trim().replaceAll('"', '');
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        this.data = response.data.data;
        this.message = response.data.message;
        return response;
        });
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    }
  }
});
