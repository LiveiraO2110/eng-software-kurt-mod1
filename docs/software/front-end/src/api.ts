import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const authString = localStorage.getItem("auth");

    if (authString) {
      const auth = JSON.parse(authString);

      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }

    return config;
});