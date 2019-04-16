import axios from 'axios'
const Config = require('../Config')
const API_URL = Config.API_URL+'/feed'

/* feed/event */
export const GET_EVENT = async () => {
    const res = await axios.get(API_URL+'/event')
    return await res.data    
}

export const POST_ADD_EVENT = async (params) => {
    const res = await axios.post(API_URL+'/event/new', params)
    return await res.data
}

export const POST_UPDATE_EVENT = async (params) => {
    const res = await axios.post(API_URL+'/event/update', params)
    return await res.data
}

export const POST_DELETE_EVENT = async (params) => {
    const res = await axios.post(API_URL+'/event/delete', params)
    return await res.data
}

/* feed/annoucement */
export const GET_ANNOUNCEMENT = async () => {
    const res = await axios.get(API_URL+'/announcement')
    return await res.data
}

export const POST_ADD_ANNOUNCEMENT= async (params) => {
    const res = await axios.post(API_URL+'/announcement/new', params)
    return await res.data
}

export const POST_UPDATE_ANNOUNCEMENT = async (params) => {
    const res = await axios.post(API_URL+'/announcement/update', params)
    return await res.data
}

export const POST_DELETE_ANNOUNCEMENT = async (params) => {
    const res = await axios.post(API_URL+'/announcement/delete', params)
    return await res.data
}

/* feed/company */
export const GET_COMPANY = async () => {
    const res = await axios.get(API_URL+'/company')
    return await res.data
}

export const POST_ADD_COMPANY= async (params) => {
    const res = await axios.post(API_URL+'/company/new', params)
    return await res.data
}

export const POST_UPDATE_COMPANY = async (params) => {
    const res = await axios.post(API_URL+'/company/update', params)
    return await res.data
}

export const POST_DELETE_COMPANY = async (params) => {
    const res = await axios.post(API_URL+'/company/delete', params)
    return await res.data
}