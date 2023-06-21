import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useDataStore = defineStore('datax', () => {
    //const apiURL = 'http://localhost:8080/api/v1/'
    const apiURL = 'http://localhost:8080/api/v1/'
    const message = ref('')
    const empleados = ref([])
    const empleado = ref({})
    const puestos = ref([])
    const puesto = ref({})
    const departamentos = ref([])
    const departamento = ref({})

    const getEmpleados = async () => {
        try {
            const response = await axios.get(`${apiURL}empleados/`)
            empleados.value = response.data.data
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getEmpleado = async (id) => {
        try {
            const response = await axios.get(`${apiURL}empleados/tarjeta/${id}`)
            empleado.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const addEmpleado = async (newEmpleado) => {
        try {
            const response = await axios.post(`${apiURL}empleados/`, newEmpleado)
                return response
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    const updateEmpleado = async (updatedEmpleado, id) => {
        try {
            const response = await axios.put(
                `${apiURL}empleados/id/${id}`,
                updatedEmpleado
            )
                return response
        } catch (error) {
            console.error(error)
            return error;
        }
    }

    const deleteEmpleado = async (id) => {
        await axios.delete(`${apiURL}empleados/tarjeta/${id}`)
    }

    const getPuestos = async () => {
        const response = await axios.get(`${apiURL}puestos/`)
        puestos.value = response.data.data
    }

    const getPuesto = async (id) => {
        try {
            const response = await axios.get(`${apiURL}puestos/clave/${id}`)
            puesto.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const addPuesto = async (newPuesto) => {
        try {
            await axios.post(`${apiURL}puestos/`, newPuesto)
        } catch (error) {
            console.error(error)
        }
    }

    const updatePuesto = async (updatedPuesto,id) => {
        try {
            await axios.put(
                `${apiURL}puestos/id/${id}`,
                updatedPuesto
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deletePuesto = async (id) => {
        await axios.delete(`${apiURL}puestos/clave/${id}`)
    }

    const getDepartamentos = async () => {
        const response = await axios.get(`${apiURL}departamentos/`)
        departamentos.value = response.data.data
    }

    const getDepartamento = async (id) => {
        try {
            const response = await axios.get(`${apiURL}departamentos/clave/${id}`)
            console.log(response.data.data)
            departamento.value = response.data.data
        } catch (error) {
            console.error(error)
        }

    }

    const addDepartamento = async (newDepartamento) => {
        try {
            await axios.post(`${apiURL}departamentos/`, newDepartamento)
        } catch (error) {
            console.error(error)
        }
    }

    const updateDepartamento = async (updatedDepartamento) => {
        try {
            await axios.put(
                `${apiURL}departamentos/${updatedDepartamento.id}`,
                updatedDepartamento
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deleteDepartamento = async (id) => {
        await axios.delete(`${apiURL}departamentos/${id}`)
    }



    return {
        message,
        empleados,
        empleado,
        getEmpleados,
        getEmpleado,
        addEmpleado,
        updateEmpleado,
        deleteEmpleado,
        puestos,
        puesto,
        getPuestos,
        getPuesto,
        addPuesto,
        updatePuesto,
        deletePuesto,
        departamentos,
        departamento,
        getDepartamentos,
        getDepartamento,
        addDepartamento,
        updateDepartamento,
        deleteDepartamento
    }
})
