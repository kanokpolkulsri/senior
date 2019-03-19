import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL

export const GET_EVENT = async () => {
    const res = await axios.get(API_URL+'/event')
    return await res.data
}