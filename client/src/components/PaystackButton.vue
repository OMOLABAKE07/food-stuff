<template>
  <div>
    <button 
      @click="initializePayment"
      :disabled="loading"
      class="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      {{ loading ? 'Processing...' : 'Pay with Paystack' }}
    </button>
    
    <div ref="paystackEmbedContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['payment-success', 'payment-error'])

const loading = ref(false)
const paystackEmbedContainer = ref(null)

// Load Paystack script
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://js.paystack.co/v1/inline.js'
  document.head.appendChild(script)
})

const initializePayment = async () => {
  loading.value = true
  
  try {
    await api.get('/sanctum/csrf-cookie')
    const response = await api.post('/payment/initialize', {
      order_id: props.orderId
    })
    
    const paymentData = response.data.paystack_data
    
    // Initialize Paystack popup
    if (typeof window.PaystackPop !== 'undefined') {
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_key_here',
        email: paymentData.email,
        amount: paymentData.amount,
        ref: paymentData.reference,
        currency: paymentData.currency,
        callback: function(response) {
          // Verify payment
          verifyPayment(paymentData.reference)
        },
        onClose: function() {
          loading.value = false
        }
      })
      
      handler.openIframe()
    } else {
      throw new Error('Paystack script not loaded')
    }
  } catch (error) {
    console.error('Payment initialization failed:', error)
    emit('payment-error', error)
    loading.value = false
  }
}

const verifyPayment = async (reference) => {
  try {
    const response = await api.get(`/payment/verify/${reference}`)
    emit('payment-success', response.data)
    loading.value = false
  } catch (error) {
    console.error('Payment verification failed:', error)
    emit('payment-error', error)
    loading.value = false
  }
}
</script>