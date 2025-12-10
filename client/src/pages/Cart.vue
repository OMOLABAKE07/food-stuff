<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
      <p class="mt-2 text-gray-500">Start adding some delicious products to your cart!</p>
      <router-link to="/products" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Browse Products
      </router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">
              Cart ({{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'item' : 'items' }})
            </h2>
          </div>
          
          <ul class="divide-y divide-gray-200">
            <li v-for="item in cartStore.items" :key="item.id" class="p-4 flex">
              <!-- Product Image -->
              <div class="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                <div v-if="item.main_image" class="w-full h-full">
                  <img :src="item.main_image" :alt="item.name" class="w-full h-full object-cover">
                </div>
                <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                  <span class="text-xs text-gray-500">No image</span>
                </div>
              </div>
              
              <div class="ml-4 flex-1 flex flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <router-link :to="`/products/${item.id}`" class="hover:text-indigo-600">
                        {{ item.name }}
                      </router-link>
                    </h3>
                    <p class="ml-4">₦{{ formatPrice(item.addedPrice || item.price) }}</p>
                  </div>
                  <p v-if="item.description" class="mt-1 text-sm text-gray-500 line-clamp-1">{{ item.description }}</p>
                </div>
                
                <div class="flex-1 flex items-end justify-between text-sm mt-2">
                  <!-- Quantity Controls -->
                  <div class="flex items-center">
                    <span class="mr-2 text-gray-500">Qty:</span>
                    <div class="flex items-center border border-gray-300 rounded-md">
                      <button 
                        @click="decreaseQty(item.id)"
                        class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        :disabled="item.qty <= 1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      
                      <span class="px-2 py-1 text-gray-700">{{ item.qty }}</span>
                      
                      <button 
                        @click="increaseQty(item.id)"
                        class="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Item Total Price -->
                  <div class="flex items-center">
                    <span class="font-medium mr-3">₦{{ formatPrice((item.addedPrice || item.price) * item.qty) }}</span>
                    <button 
                      @click="removeItem(item.id)"
                      type="button" 
                      class="font-medium text-red-600 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <button 
              @click="clearCart"
              class="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="bg-white shadow rounded-lg p-6 h-fit">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal ({{ cartStore.itemCount }} items)</span>
            <span class="font-medium">₦{{ formatPrice(cartStore.subtotal) }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Delivery Fee</span>
            <span class="font-medium">₦{{ formatPrice(deliveryFee) }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Tax</span>
            <span class="font-medium">₦{{ formatPrice(tax) }}</span>
          </div>
          
          <div class="flex justify-between border-t border-gray-200 pt-4">
            <span class="text-base font-medium text-gray-900">Total</span>
            <span class="text-base font-medium text-gray-900">₦{{ formatPrice(total) }}</span>
          </div>
        </div>
        
        <router-link 
          to="/checkout" 
          class="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center block"
        >
          Proceed to Checkout
        </router-link>
        
        <div class="mt-4 text-center">
          <router-link to="/products" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '../Stores/cart'

const cartStore = useCart()

const deliveryFee = 1000
const taxRate = 0.075 // 7.5% tax

const tax = computed(() => {
  return Math.round(cartStore.subtotal * taxRate)
})

const total = computed(() => {
  return cartStore.subtotal + deliveryFee + tax.value
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

const increaseQty = (id) => {
  const item = cartStore.items.find(item => item.id === id)
  if (item) {
    cartStore.updateQuantity(id, item.qty + 1)
  }
}

const decreaseQty = (id) => {
  const item = cartStore.items.find(item => item.id === id)
  if (item) {
    cartStore.updateQuantity(id, item.qty - 1)
  }
}

const removeItem = (id) => {
  cartStore.remove(id)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clear()
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>