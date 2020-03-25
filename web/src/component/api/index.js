import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const getBisection = () => api.get(`/showBisection`)
export const getFlaseposition = () => api.get(`/showFlaseposition`)
export const getOnepointiteration = () => api.get(`/showOnepointiteration`)
export const getNewtonraphson = () => api.get(`/showNewtonraphson`)
export const getSecant  = () => api.get(`/showSecant`)
export const getCramerrule  = () => api.get(`/showCramerrule`)
export const getForward = () => api.get(`/showForward`)



// export const getBisection = () => api.get(`/showBisection`)

const apis = {
    getFlaseposition,
    getBisection,
    getOnepointiteration,
    getNewtonraphson,
    getSecant,
    getCramerrule,
    getForward
}

export default apis
