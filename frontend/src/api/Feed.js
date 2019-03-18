import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/feed'

export const GET_EVENT = async () => {
    const res = await axios.get(API_URL+'/event')
    return await res.data
}

export const GET_ANNOUCEMENT = async () => {
    const res = await axios.get(API_URL+'/annoucement')
    return await res.data
}

export const GET_COMPANY = async () => {
    const res = await axios.get(API_URL+'/company')
    return await res.data
}