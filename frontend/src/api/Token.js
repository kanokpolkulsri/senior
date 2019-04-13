import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/token'

export const POST_CHECK_TOKEN = async (params) => {
    const res = await axios.post(API_URL+'/', params)
    return await res.data
}