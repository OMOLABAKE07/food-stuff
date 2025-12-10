import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8004/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

// Add CSRF token handling
api.interceptors.request.use(async (config) => {
    // For POST, PUT, PATCH, DELETE requests, get CSRF cookie first
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        try {
            await axios.get('http://localhost:8004/sanctum/csrf-cookie', {
                withCredentials: true
            })
        } catch (error) {
            console.error('Failed to get CSRF cookie:', error)
        }
    }
    
    return config
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api