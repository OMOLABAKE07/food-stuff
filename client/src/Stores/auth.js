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
    init() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.token = token
        // You might want to fetch user data here if needed
      }
    }
  }
})