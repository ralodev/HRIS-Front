import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useEmpleadoStore = defineStore('empleado', () => {
    const apiURL = 'http://localhost:8080/api/v1/empleados/'

    const empleados = ref([])
    const empleado = ref({})

    const getEmpleados = async () => {
        try {
            const response = await axios.get(apiURL)
            empleados.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const getEmpleado = async (id) => {
        try {
            const response = await axios.get(`${apiURL}tarjeta/${id}`)
            console.log(response.data.data)
            empleado.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const addEmpleado = async (newEmpleado) => {
        try {
            await axios.post(apiURL, newEmpleado)
        } catch (error) {
            console.error(error)
        }
    }

    const updateEmpleado = async (updatedEmpleado) => {
        try {
            await axios.put(
                `${apiURL}${updatedEmpleado.id}`,
                updatedEmpleado
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmpleado = async (id) => {
        apiURL+'id/'+id
            await axios.delete(`${apiURL}tarjeta/${id}`)
    }

    return {
        empleados,
        empleado,
        getEmpleados,
        getEmpleado,
        addEmpleado,
        updateEmpleado,
        deleteEmpleado
    }
})
