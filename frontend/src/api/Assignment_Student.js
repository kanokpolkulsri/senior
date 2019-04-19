import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL + "/assignment_student"

export const GET_STUDENT = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}

export const POST_STUDENT_YEAR = async (year) => {
    let params = {year: year}
    const res = await axios.post(API_URL + "/student_year", params)
    return await res.data
}

export const POST_STUDENT = async (username) => {
    let params = {username: username}
    const res = await axios.post(API_URL + "/student", params)
    return await res.data
}

export const POST_UPDATE = async (params) => {
    const res = await axios.post(API_URL + "/update", params)
    return await res.data
}

export const POST_ID = async (username, id) => {
    let params = {username: username, id: id}
    const res = await axios.post(API_URL + "/id", params)
    return await res.data
}