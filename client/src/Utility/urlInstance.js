import axios from 'axios'

let axiosInstance = axios.create({
    baseURL:"http://localhost:7500"
    
})
export {axiosInstance}