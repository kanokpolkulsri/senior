import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL

export const GET_DATA = async () => {
    const res = await axios.get(API_URL+'/register')
    return await res.data
}

export const LOGIN = async (params) => {
    const res = await axios.post(API_URL+'/register/login', params)
    return await res.data
}

export const ADD = async (params) => {
    const res = await axios.post(API_URL+'/register/add', params)
    return await res.data
}