import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('dashboard', {
  state: () => ({
    //apiURL: 'http://localhost:8080/api/v1/dashboard/',
    apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/dashboard/',
    EmpleadosPorSexo: {},
    EmpleadosPorEdad: {},
    EmpleadosPorTiempo: {},
    EmpleadosPorAntiguedad: {},
    EmpleadosPorNombramiento: {},
    EmpleadosPorNivelAcademico: {},
    EmpleadosPorFunciones: {},
    horaActualizacion: null,
    error: '',
  }),
  actions: {
    async getData() {
      try {
        await Promise.all([
          this.getEmpleadosPorSexo(),
          this.getEmpleadosPorEdad(),
          this.getEmpleadosPorTiempo(),
          this.getEmpleadosPorAntiguedad(),
          this.getEmpleadosPorNombramiento(),
          this.getEmpleadosPorNivelAcademico(),
          this.getEmpleadosPorFunciones(),
        ]);
        this.horaActualizacion = new Date().getTime();
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorSexo() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/sexo`);
        this.EmpleadosPorSexo = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorEdad() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/edad`);
        this.EmpleadosPorEdad = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorTiempo() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/tiempo`);
        this.EmpleadosPorTiempo = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorAntiguedad() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/antiguedad`);
        this.EmpleadosPorAntiguedad = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorNombramiento() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/nombramiento`);
        this.EmpleadosPorNombramiento = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorNivelAcademico() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/nivel-academico`);
        this.EmpleadosPorNivelAcademico = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
    async getEmpleadosPorFunciones() {
      this.error = '';
      try {
        const response = await axios.get(`${this.apiURL}empleados/funciones`);
        this.EmpleadosPorFunciones = response.data.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
    },
  },
});
