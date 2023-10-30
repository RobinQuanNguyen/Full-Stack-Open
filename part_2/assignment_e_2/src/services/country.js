import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"
const Url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    return axios.get(Url)
}


const find = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

export default {
    find: find,
    getAll: getAll
}