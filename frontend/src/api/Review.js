import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/review'

export const GET_DATA = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const GET_DATA_ID_COMPANY = async (id) => {
    const res = await axios.get(API_URL+"/"+id)
    return await res.data
}

export const GET_SEARCH_NAME_COMPANY = async (id) => {
    const res = await axios.get(API_URL+"/search")
    return await res.data
}
