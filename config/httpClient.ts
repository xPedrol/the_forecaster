import axios from "axios";

const instance = axios.create({
    timeout: 7000
});


export default instance;