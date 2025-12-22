<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Paystack Integration Test</h1>
    
    <div class="bg-white shadow rounded-lg p-6">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Test Paystack Integration</h2>
        <p class="text-gray-600 mb-4">This page helps test the Paystack integration with detailed logging.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
            <input 
              v-model="orderId" 
              type="number" 
              placeholder="Enter order ID"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
          </div>
          
          <button 
            @click="testPayment"
            :disabled="loading"
            class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ loading ? 'Testing...' : 'Test Payment' }}
          </button>
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-2">Debug Information</h3>
          <div class="bg-gray-50 p-4 rounded-md">
            <pre class="text-sm text-gray-700 overflow-auto max-h-64">{{ debugInfo }}</pre>
          </div>
        </div>
      </div>
      
      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-700">{{ error }}</p>
      </div>
      
      <div v-if="success" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
        <p class="text-green-700">{{ success }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { initializePayment } from '../services/paystackService'

const orderId = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const debugInfo = ref('No test performed yet.')

const testPayment = async () => {
  if (!orderId.value) {
    error.value = 'Please enter an order ID'
    return
  }
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    debugInfo.value = 'Starting payment initialization...'
    
    const response = await initializePayment(parseInt(orderId.value))
    
    debugInfo.value = JSON.stringify(response, null, 2)
    
    success.value = 'Payment initialized successfully! Check console for details.'
    
    // Log the full response to console
    console.log('Full payment response:', response)
    
    // Check if we have the required data
    if (response.paystack_data) {
      console.log('Paystack data:', response.paystack_data)
      if (response.paystack_data.email && response.paystack_data.amount && response.paystack_data.reference) {
        success.value += ' All required Paystack fields are present.'
      } else {
        error.value = 'Missing required Paystack fields. Check console for details.'
      }
    }
  } catch (err) {
    console.error('Test payment error:', err)
    error.value = err.message
    debugInfo.value = `Error: ${err.message}\nStack: ${err.stack}`
  } finally {
    loading.value = false
  }
}
</script>