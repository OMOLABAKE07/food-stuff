import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuth = defineStore('auth', {
  state: () => ({ 
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  },

  actions: {
    async login(email, password) {
      try {
        const res = await api.post('/login', { email, password })
        this.user = res.data.user
        this.token = res.data.token
        // Store token in localStorage for persistence
        if (this.token) {
          localStorage.setItem('authToken', this.token)
        }
        return res.data
      } catch (error) {
        throw error
      }
    },
    
    async logout() {
      try {
        await api.post('/logout')
        this.user = null
        this.token = null
        // Remove token from localStorage
        localStorage.removeItem('authToken')
      } catch (error) {
        // Even if logout fails, clear local state
        this.user = null
        this.token = null
        localStorage.removeItem('authToken')
        throw error
      }
    },
    
    // Initialize auth state from localStorage
    async init() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.token = token
        // Fetch user data to ensure we have current information
        try {
          const response = await api.get('/user')
          this.user = response.data
        } catch (error) {
          // If we can't fetch user data, the token might be invalid
          console.error('Failed to fetch user data:', error)
          this.user = null
          this.token = null
          localStorage.removeItem('authToken')
        }
      }
    }
  }
})