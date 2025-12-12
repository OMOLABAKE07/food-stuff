<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2">
        <Card>
          <template #header>
            <h2 class="text-xl font-semibold">Shipping Information</h2>
          </template>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
                <Input id="name" v-model="form.name" type="text" required class="mt-1" />
              </div>
              
               <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
              <Input id="phone" v-model="form.phone" type="tel" required class="mt-1" />
            </div>
            </div>
            
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <Input id="address" v-model="form.address" type="text" required class="mt-1" />
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <Input id="city" v-model="form.city" type="text" required class="mt-1" />
              </div>
              
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                <Input id="state" v-model="form.state" type="text" required class="mt-1" />
              </div>
              
              <div>
                <label for="zip" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                <Input id="zip" v-model="form.zip" type="text" required class="mt-1" />
              </div>
            </div>
         
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <Input id="email" v-model="form.email" type="email" required class="mt-1" />
            </div>
            
            <div class="pt-4">
              <Button type="submit" :disabled="loading" class="w-full">
                {{ loading ? 'Processing...' : 'Place Order' }}
              </Button>
            </div>
          </form>
        </Card>
      </div>
      
      <!-- Order Summary -->
      <div class="bg-white shadow rounded-lg p-6 h-fit">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        <div class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between">
            <span class="text-gray-600">{{ item.name }} × {{ item.qty }}</span>
            <span class="font-medium">₦{{ formatPrice((item.addedPrice || item.price) * item.qty) }}</span>
          </div>
          
          <div class="flex justify-between pt-4 border-t border-gray-200">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-medium">₦{{ formatPrice(subtotal) }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Delivery</span>
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
        
        <!-- Payment Section -->
        <div v-if="orderCreated" class="mt-6 pt-6 border-t border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Payment</h3>
          
          <PaystackButton 
            v-if="orderId"
            :order-id="orderId"
            @payment-success="handlePaymentSuccess"
            @payment-error="handlePaymentError"
          />
        </div>
      </div>
    </div>
    
    <div v-if="error" class="mt-6 bg-red-50 border red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-if="success && !orderCreated" class="mt-6 bg-green-50 border green-200 rounded-md p-4">
      <p class="text-green-700">Order placed successfully! Your order ID is {{ orderId }}</p>
    </div>
    
    <div v-if="paymentSuccess" class="mt-6 bg-green-50 border green-200 rounded-md p-4">
      <p class="text-green-700">Payment successful! Your order is now being processed.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCart } from '../Stores/cart'
import { useAuth } from '../Stores/auth'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import PaystackButton from '../components/PaystackButton.vue'
import api from '../services/api'

const router = useRouter()
const route = useRoute()
const cartStore = useCart()
const authStore = useAuth()

// Initialize form with user data if available
onMounted(() => {
  if (authStore.user) {
    form.value.name = authStore.user.name || ''
    form.value.email = authStore.user.email || ''
    form.value.phone = authStore.user.phone || ''
    form.value.address = authStore.user.address || ''
    form.value.city = authStore.user.city || ''
    form.value.state = authStore.user.state || ''
    form.value.zip = authStore.user.zip || ''
  }
  
  // Check if we were redirected from login
  if (route.query.redirect) {
    // Could show a message to the user that they've been redirected
    console.log('Redirected from login')
  }
})

const deliveryFee = 1000
const taxRate = 0.075 // 7.5% tax

const form = ref({
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const orderCreated = ref(false)
const orderId = ref(null)
const paymentSuccess = ref(false)

const subtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => sum + (item.addedPrice || item.price) * item.qty, 0)
})

const tax = computed(() => {
  return Math.round(subtotal.value * taxRate)
})

const total = computed(() => subtotal.value + deliveryFee + tax.value)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    const response = await api.post('/orders', {
      items: cartStore.items.map(item => ({
        product_id: item.id,
        quantity: item.qty
      })),
      shipping_address: {
        name: form.value.name,
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        zip: form.value.zip,
        phone: form.value.phone,
        email: form.value.email
      },
      total_amount: total.value
    })
    
    orderId.value = response.data.order.id
    success.value = true
    orderCreated.value = true

    // Reset form after successful order
    form.value = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      email: ''
    }

  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to place order'
  } finally {
    loading.value = false
  }
}

const handlePaymentSuccess = () => {
  paymentSuccess.value = true
  cartStore.items = []
  
  setTimeout(() => {
    router.push('/orders')
  }, 2000)
}

const handlePaymentError = (error) => {
  console.error('Payment error:', error)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

</script>