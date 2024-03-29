import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/blogs'

let token = null

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}



export default { getAll, setToken, create, update, deleteBlog }