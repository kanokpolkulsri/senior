import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/register'

export const GET_DATA = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const POST_LOGIN = async (params) => {
    const res = await axios.post(API_URL+'/login', params)
    return await res.data
}

export const POST_ADD = async (params) => {
    const res = await axios.post(API_URL+'/add', params)
    return await res.data
}

export const GET_SESSION = async () => {
    const res = await axios.get(Config.API_URL)
    return await res.data
}