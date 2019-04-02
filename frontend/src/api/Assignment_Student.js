import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL + "/assignment_student"

export const GET_STUDENT = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const POST_STUDENT = async (params) => {
    const res = await axios.post(API_URL + "/student", params)
    return await res.data
}

export const POST_UPDATE = async (params) => {
    const res = await axios.post(API_URL + "/update", params)
    return await res.data
}