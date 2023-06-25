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
        const response = await axios.get(`${this.apiURL}/usuarios/id/${id}`, null, {
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

    async editarUsuario(email, newUsuario) {
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

    async bloquearUsuario(id) {
      this.error = '';
      try {
        const response = await axios.put(`${this.apiURL}/bloquear/id/${id}`);
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
        const response = await axios.put(`${this.apiURL}/desbloquear/id/${id}`);
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
        const response = await axios.delete(`${this.apiURL}/eliminar/id/${id}`);
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
        const response = await axios.put(`${this.apiURL}/restablecer/id/${id}`);
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
