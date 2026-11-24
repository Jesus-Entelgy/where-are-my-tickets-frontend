import axios from "axios";

const ticketingApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// * Interceptores
ticketingApi.interceptors.request.use((config) => {
    // extraemos el token del almacenamiento
    const token = localStorage.getItem("token");
    console.log("token en la peticion: ", { token })

    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export {ticketingApi};