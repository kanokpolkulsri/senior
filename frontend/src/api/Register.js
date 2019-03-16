import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL
const header = {'cache-control': 'no-cache', 'Content-Type': 'application/json'}

export const GET_DATA = async () => {
    const res = await axios.get(API_URL+'/register')
    return await res.data
}

export const LOGIN = async (params) => {
    const res = await axios.post(API_URL+'/register/login', params)
    return await res.data
}