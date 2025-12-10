import axios from 'axios'
import { useAuth } from '../Stores/auth'

const api = axios.create({
    baseURL: 'http://localhost:8004/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add Bearer token to requests if available
api.interceptors.request.use((config) => {
    const authStore = useAuth()
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
})

export default api