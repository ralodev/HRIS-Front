import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useStore = defineStore('consulta',() => {
    //const apiURL = 'http://localhost:8080/api/v1/'
    const apiURL = 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/consulta/'
    const response = ref({})
    const data = ref([])
    const queryData = ref({})

    const getAll = async () => {
        const response = await axios.get(`${apiURL}consulta/all`)
        data.value = response.data.data
        response.value = response
    }

    const getUnique = async () => {
        const response = await axios.get(`${apiURL}consulta/unique`)
        data.value = response.data.data
        response.value = response
    }

    const search = async (params) => {
        const response = await axios.get(`${apiURL}plazas/search`, { params })
        queryData.value = response.data.data
        response.value = response
    }

    return {
        response,
        data,
        queryData,
        search,
        getAll,
        getUnique
    }
})
