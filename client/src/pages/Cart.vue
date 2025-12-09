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
          <ul class="divide-y divide-gray-200">
            <li v-for="item in cartStore.items" :key="item.id" class="p-4 flex">
              <div class="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
              </div>
              
              <div class="ml-4 flex-1 flex flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>{{ item.name }}</h3>
                    <p class="ml-4">₦{{ item.price * item.qty }}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                </div>
                
                <div class="flex-1 flex items-end justify-between text-sm">
                  <div class="flex items-center">
                    <button 
                      @click="decreaseQty(item.id)"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    
                    <span class="mx-2 text-gray-700">{{ item.qty }}</span>
                    
                    <button 
                      @click="increaseQty(item.id)"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <button 
                    @click="removeItem(item.id)"
                    type="button" 
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="bg-white shadow rounded-lg p-6 h-fit">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-medium">₦{{ subtotal }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Delivery</span>
            <span class="font-medium">₦{{ deliveryFee }}</span>
          </div>
          
          <div class="flex justify-between border-t border-gray-200 pt-4">
            <span class="text-base font-medium text-gray-900">Total</span>
            <span class="text-base font-medium text-gray-900">₦{{ total }}</span>
          </div>
        </div>
        
        <router-link 
          to="/checkout" 
          class="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '../Stores/cart'

const cartStore = useCart()

const deliveryFee = 1000

const subtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

const total = computed(() => {
  return subtotal.value + deliveryFee
})

const increaseQty = (id) => {
  const item = cartStore.items.find(item => item.id === id)
  if (item) item.qty++
}

const decreaseQty = (id) => {
  const item = cartStore.items.find(item => item.id === id)
  if (item && item.qty > 1) {
    item.qty--
  } else {
    removeItem(id)
  }
}

const removeItem = (id) => {
  cartStore.remove(id)
}
</script>