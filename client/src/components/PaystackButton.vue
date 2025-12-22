<template>
  <div>
    <button 
      @click="handleInitializePayment"
      :disabled="loading"
      class="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
    >
      {{ loading ? 'Processing...' : 'Pay with Paystack' }}
    </button>
    
    <div v-if="errorMessage" class="mt-2 text-red-600 text-sm">
      {{ errorMessage }}
    </div>
    
    <div ref="paystackEmbedContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { initializePayment, verifyPayment } from '../services/paystackService'

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['payment-success', 'payment-error'])

const loading = ref(false)
const errorMessage = ref('')
const paystackEmbedContainer = ref(null)

// Load Paystack script
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://js.paystack.co/v1/inline.js'
  script.onload = () => {
    console.log('Paystack script loaded successfully')
  }
  script.onerror = () => {
    errorMessage.value = 'Failed to load payment processor. Please try again.'
  }
  document.head.appendChild(script)
})

const handleInitializePayment = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    // Ensure CSRF cookie is set
    await api.get('/sanctum/csrf-cookie')
    const response = await initializePayment(props.orderId)
    
    const paymentData = response.paystack_data
    
    // Validate required data
    if (!paymentData || !paymentData.reference) {
      throw new Error('Invalid payment data received')
    }
    
    // Log payment data for debugging
      console.log('Paystack payment data:', paymentData);
      
      // Validate required fields
      if (!paymentData.email || !paymentData.amount || !paymentData.reference) {
        throw new Error('Missing required payment information');
      }
      
      // Initialize Paystack popup
      if (typeof window.PaystackPop !== 'undefined') {
        const handler = window.PaystackPop.setup({
          key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_key_here',
          email: paymentData.email,
          amount: paymentData.amount,
          ref: paymentData.reference,
          currency: paymentData.currency || 'NGN',
          callback: function(response) {
            console.log('Paystack callback response:', response);
            // Verify payment
            handleVerifyPayment(paymentData.reference)
          },
          onClose: function() {
            console.log('Paystack popup closed');
            loading.value = false
          },
          onError: function(error) {
            console.error('Paystack error:', error);
            errorMessage.value = 'Payment processing error. Please try again.';
            loading.value = false;
          }
        })
        
        handler.openIframe()
      } else {
        throw new Error('Paystack script not loaded. Please refresh the page and try again.')
      }
  } catch (error) {
    console.error('Payment initialization failed:', error)
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to initialize payment. Please try again.'
    emit('payment-error', error)
    loading.value = false
  }
}

const handleVerifyPayment = async (reference) => {
  try {
    const response = await verifyPayment(reference)
    
    if (response.payment.status === 'successful') {
      emit('payment-success', response)
    } else {
      throw new Error('Payment was not successful')
    }
    
    loading.value = false
  } catch (error) {
    console.error('Payment verification failed:', error)
    errorMessage.value = error.response?.data?.message || 'Payment verification failed. Please contact support.'
    emit('payment-error', error)
    loading.value = false
  }
}
</script>