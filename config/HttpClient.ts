import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_WEATHER_URL,
    timeout: 1000
});
instance.interceptors.request.use(function (config) {
    // Faz alguma coisa antes da requisição ser enviada
    config.params = {
        ...config.params,
        appid: process.env.API_TOKEN
    };
    return config;
}, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
});

export default instance;