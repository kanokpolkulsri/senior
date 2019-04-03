import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL + "/assignment_admin"

export const GET_ADMIN = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const POST_NEW = async (params) => {
    const res = await axios.post(API_URL, params)
    return await res.data
}

export const POST_DELETE = async (params) => {
    const res = await axios.post(API_URL + "/delete", params)
    return await res.data
}