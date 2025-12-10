import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state: () => ({ 
    items: []
  }),

  actions: {
    add(product) {
      const item = this.items.find(i => i.id === product.id)
      if (item) {
        item.qty++
      } else {
        // Add product with all necessary properties
        this.items.push({ 
          ...product, 
          qty: 1,
          // Store the price at time of adding to cart to prevent price changes after adding
          addedPrice: product.price 
        })
      }
      this.saveCart()
    },
    
    remove(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.saveCart()
    },
    
    updateQuantity(id, qty) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        if (qty <= 0) {
          this.remove(id)
        } else {
          item.qty = qty
        }
        this.saveCart()
      }
    },
    
    clear() {
      this.items = []
      this.saveCart()
    },
    
    saveCart() {
      // Save to localStorage
      try {
        localStorage.setItem('cart', JSON.stringify(this.items))
      } catch (e) {
        console.error('Failed to save cart to localStorage', e)
      }
    },
    
    loadCart() {
      // Load from localStorage
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          this.items = JSON.parse(savedCart)
        }
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
        this.items = []
      }
    }
  },
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.qty, 0)
    },
    
    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + (item.addedPrice || item.price) * item.qty, 0)
    },
    
    totalItems: (state) => {
      return state.items.length
    }
  }
})