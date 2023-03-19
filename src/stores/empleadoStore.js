import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useEmpleadoStore = defineStore('empleado', () => {
    const apiURL = 'http://localhost:8080/api/v1/empleados/'

    const empleados = ref([])
    const empleado = ref({})

    const getEmpleados = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
            //response.data = an array of objects, so response.data.data = the objects
            empleados.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const getEmpleado = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/empleados/id/${id}`)
            console.log(response.data.data)
            empleado.value = response.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const addEmpleado = async (newEmpleado) => {
        try {
            await axios.post('http://localhost:8080/api/v1/empleados', newEmpleado)
        } catch (error) {
            console.error(error)
        }
    }

    const updateEmpleado = async (updatedEmpleado) => {
        try {
            await axios.put(
                `http://localhost:8080/api/v1/empleados/${updatedEmpleado.id}`,
                updatedEmpleado
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmpleado = async (id) => {
        // try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        // } catch (error) {
        //     console.error("Ha habido un error:", error)
        // }
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
