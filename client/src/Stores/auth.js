import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuth = defineStore('auth', {
  state: () => ({ user: null }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('/login', { email, password }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        this.user = res.data.user
        return res.data
      } catch (error) {
        throw error
      }
    },
    async logout() {
      try {
        await axios.post('/logout', {}, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        this.user = null
      } catch (error) {
        throw error
      }
    },
  }
})
