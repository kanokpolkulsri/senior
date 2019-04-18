import axios from 'axios'
const Config = require('../Config')
const API_URL_SCHEDULE = Config.API_URL + '/schedule'

export const GET_SCHEDULE = async () => {
    const res = await axios.get(API_URL_SCHEDULE)
    return await res.data
}

export const POST_ADD = async (params) => {
    const res = await axios.post(API_URL_SCHEDULE + '/add', params)
    return await res.data
}

export const POST_UPDATE = async (params) => {
    const res = await axios.post(API_URL_SCHEDULE + '/update', params)
    return await res.data
}

export const POST_DELETE = async (params) => {
    const res = await axios.post(API_URL_SCHEDULE + '/delete', params)
    return await res.data
}
