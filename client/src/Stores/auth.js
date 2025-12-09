import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuth = defineStore('auth', {
  state: () => ({ user: null }),

  actions: {
    async login(email, password) {
      await axios.get('/sanctum/csrf-cookie')
      const res = await axios.post('/login', { email, password })
      this.user = res.data.user
    },
    async logout() {
      await axios.post('/logout')
      this.user = null
    },
  }
})
