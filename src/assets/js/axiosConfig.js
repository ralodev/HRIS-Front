import axios from "axios";

export function setAuthorizationHeader(token) {
    if (token !== null && token !== undefined && token !== "") {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log('Token set');
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
        console.log('Token deleted');
    }
}