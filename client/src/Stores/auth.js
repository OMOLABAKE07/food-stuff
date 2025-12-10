import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuth = defineStore('auth', {
  state: () => ({ user: null }),

  actions: {
    async login(email, password) {
      try {
        const res = await api.post('/login', { email, password })
        this.user = res.data.user
        return res.data
      } catch (error) {
        throw error
      }
    },
    async logout() {
      try {
        await api.post('/logout')
        this.user = null
      } catch (error) {
        throw error
      }
    },
  }
})