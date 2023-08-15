import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useStore = defineStore('consulta', () => {
    //const apiURL = 'http://localhost:8080/api/v1/'
    const apiURL = 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/'
    const response = ref({})
    const data = ref([])
    const queryData = ref({})

    const getAll = async () => {
        try {
            const response = await axios.get(`${apiURL}consulta/all`)
            data.value = response.data
            response.value = response
            return response
        } catch (err) {
            console.log(err)
            return err
        }
    }

    const getUnique = async () => {
        try {
            const response = await axios.get(`${apiURL}consulta/unique`)
            data.value = response.data
            response.value = response
            return response
        } catch (err) {
            console.log(err)
            return err
        }
    }

    const getUniqueActives = async () => {
        try {
            const response = await axios.get(`${apiURL}consulta/unique-actives`)
            data.value = response.data
            response.value = response
            return response
        } catch (err) {
            console.log(err)
            return err
        }
    }

    const search = async (filter) => {
        try {
            const response = await axios.post(`${apiURL}plazas/search`, filter);
            queryData.value = response.data;
            response.value = response;
            return response;
          } catch (error) {
            // Handle any errors
            console.error(error);
            return error;
          }
    }

    return {
        response,
        data,
        queryData,
        search,
        getAll,
        getUnique,
        getUniqueActives
    }
})
