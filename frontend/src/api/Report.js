import axios from 'axios'
const Config = require('../Config')
const API_URL_SCHEDULE = Config.API_URL+'/schedule'
// const API_URL_REPORT = Config.API_URL+'/report'

export const GET_SCHEDULE = async () => {
    const res = await axios.get(API_URL_SCHEDULE)
    return await res.data
}
