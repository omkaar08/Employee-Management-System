import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:5001'

const api = axios.create({
  baseURL: `${API_BASE}/api/employees`,
  headers: { 'Content-Type': 'application/json' }
})

export const getEmployees = () => api.get('/')
export const getEmployee = (id) => api.get(`/${id}`)
export const createEmployee = (data) => api.post('/', data)
export const updateEmployee = (id, data) => api.put(`/${id}`, data)
export const deleteEmployee = (id) => api.delete(`/${id}`)
export const searchEmployees = (keyword) => api.get(`/search?keyword=${encodeURIComponent(keyword)}`)

export default api
