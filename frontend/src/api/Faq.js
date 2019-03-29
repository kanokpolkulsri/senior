import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/faq'

export const GET_FAQ = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const POST_ADD= async (params) => {
    const res = await axios.post(API_URL+'/add', params)
    return await res.data
}

export const POST_UPDATE = async (params) => {
    const res = await axios.post(API_URL+'/update', params)
    return await res.data
}

export const POST_DELETE = async (params) => {
    const res = await axios.post(API_URL+'/delete', params)
    return await res.data
}