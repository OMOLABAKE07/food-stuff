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
                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                <Input
                  id="first-name"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="mt-1"
                />
              </div>
              
              <div>
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                <Input
                  id="last-name"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="mt-1"
                />
              </div>
            </div>
            
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <Input
                id="address"
                v-model="form.address"
                type="text"
                required
                class="mt-1"
              />
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <Input
                  id="city"
                  v-model="form.city"
                  type="text"
                  required
                  class="mt-1"
                />
              </div>
              
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                <Input
                  id="state"
                  v-model="form.state"
                  type="text"
                  required
                  class="mt-1"
                />
              </div>
              
              <div>
                <label for="zip" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                <Input
                  id="zip"
                  v-model="form.zip"
                  type="text"
                  required
                  class="mt-1"
                />
              </div>
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
              <Input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="mt-1"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="mt-1"
              />
            </div>
            
            <div class="pt-4">
              <Button
                type="submit"
                :disabled="loading"
                class="w-full"
              >
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
            <span class="font-medium">₦{{ item.price * item.qty }}</span>
          </div>
          
          <div class="flex justify-between pt-4 border-t border-gray-200">
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
    
    <div v-if="error" class="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-if="success && !orderCreated" class="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
      <p class="text-green-700">Order placed successfully! Your order ID is {{ orderId }}</p>
    </div>
    
    <div v-if="paymentSuccess" class="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
      <p class="text-green-700">Payment successful! Your order is now being processed.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../Stores/cart'
import { useAuth } from '../Stores/auth'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import PaystackButton from '../components/PaystackButton.vue'
import api from '../services/api'

const router = useRouter()
const cartStore = useCart()
const authStore = useAuth()

const deliveryFee = 1000

const form = ref({
  firstName: '',
  lastName: '',
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
  return cartStore.items.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

const total = computed(() => {
  return subtotal.value + deliveryFee
})

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
        first_name: form.value.firstName,
        last_name: form.value.lastName,
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
    
    // Don't clear cart yet, wait for payment
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to place order'
  } finally {
    loading.value = false
  }
}

const handlePaymentSuccess = (data) => {
  paymentSuccess.value = true
  cartStore.items = []
  
  // Redirect to orders page after a delay
  setTimeout(() => {
    router.push('/orders')
  }, 2000)
}

const handlePaymentError = (error) => {
  console.error('Payment error:', error)
}
</script>