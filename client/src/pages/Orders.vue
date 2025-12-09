<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 class="mt-4 text-xl font-medium text-gray-900">No orders yet</h3>
      <p class="mt-2 text-gray-500">You haven't placed any orders yet.</p>
      <router-link to="/products" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Browse Products
      </router-link>
    </div>
    
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <ul class="divide-y divide-gray-200">
        <li v-for="order in orders" :key="order.id" class="p-6 hover:bg-gray-50">
          <div class="flex justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Order #{{ order.id }}</h3>
              <p class="text-sm text-gray-500 mt-1">
                Placed on {{ formatDate(order.created_at) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-lg font-medium text-gray-900">₦{{ order.total_amount }}</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ order.status }}
              </span>
            </div>
          </div>
          
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-900">Items:</h4>
            <ul class="mt-2 space-y-2">
              <li v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-gray-600">{{ item.quantity }} × {{ item.product.name }}</span>
                <span>₦{{ item.product.price * item.quantity }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const loading = ref(false)
const error = ref('')

const fetchOrders = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.get('/orders')
    orders.value = response.data
  } catch (err) {
    error.value = 'Failed to load orders'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  fetchOrders()
})
</script>