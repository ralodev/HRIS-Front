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
    async getUsuario(id) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/usuarios/${id}`, null, {
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
        const response = await axios.post(`${this.apiURL}/usuarios`, newUsuario);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async editarUsuario(id, newUsuario) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/usuarios/${id}`, newUsuario);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async bloquearUsuario(id) {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/usuarios/${id}/bloquear`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async desbloquearUsuario(id) {
      this.error = '';
      try {
        const response = await axios.post(`${this.apiURL}/usuarios/${id}/desbloquear`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async eliminarUsuario(id) {
      this.error = '';
      try {
        const response = await axios.delete(`${this.apiURL}/usuarios/${id}`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response.status;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async restablecerContrasena(id) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/usuarios/${id}/restablecer`);
        this.data = response.data.data;
        this.message = response.data.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async getHistorial() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/historial`);
        this.data = response.data;
        this.message = response.message;
        return response;
      } catch (err) {
        this.error = err.response.data.message || err.message;
        return err;
      }
    },

    async getHistorialUsuario(id) {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}/historial/usuario/${id}`);
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
          if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileName = response.headers['content-disposition'].split('filename=')[1].trim().replaceAll('"', '');
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
          } else {
            throw new Error('Error al descargar el respaldo');
          }
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
