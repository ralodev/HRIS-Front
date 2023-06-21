import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useStore = defineStore('autenticar', {
    state: () => ({
        //apiURL: 'http://localhost:8080/api/v1/autenticar',
        apiURL: 'https://sgip-api-0fe230af7558.herokuapp.com/api/v1/autenticar',
        message: '',
        error: '',
        data: ([]),
    }),
    actions: {
        async login(payload) {
            this.error = '';
            try {
                const response = await axios.post(`${this.apiURL}`, payload, {
                    headers: {
                        'Authorization': ''
                    }
                });
                this.data = response.data;
                this.message = response.message;
                Cookies.set('token', response.data.access_token, { expires: 1 / 3, sameSite: 'strict' });
                Cookies.set('nombre', response.data.nombre, { expires: 1 / 3, sameSite: 'strict' });
                Cookies.set('apellidos', response.data.apellidos, { expires: 1 / 3, sameSite: 'strict' });
                Cookies.set('rol', response.data.rol, { expires: 1 / 3, sameSite: 'strict' });
                Cookies.set('email', response.data.email, { expires: 1 / 3, sameSite: 'strict' });
                return response;
            } catch (err) {
                this.error = err.response.message || err.message;
                return err;
            }
        },
        logout() {
            Cookies.remove('token', { sameSite: 'strict' });
            Cookies.remove('nombre', { sameSite: 'strict' });
            Cookies.remove('apellidos', { sameSite: 'strict' });
            Cookies.remove('rol', { sameSite: 'strict' });
            Cookies.remove('email', { sameSite: 'strict' });
            console.log('Logged out');
            return 'Logged out';
        },
        isLoggedIn() {
            if (Cookies.get('token') && Cookies.get('email') && Cookies.get('rol') && Cookies.get('nombre') && Cookies.get('apellidos')) {
                return true;
            }
            return false;
        }
    }
});
