import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/review'

export const GET_DATA = async () => {
    const res = await axios.get(API_URL)
    return await res.data
}
