<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <router-link to="/products" class="text-indigo-600 hover:text-indigo-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Products
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <div v-else-if="product" class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Product Images Carousel -->
      <div class="relative">
        <div v-if="product.images && product.images.length > 0" class="h-96 overflow-hidden">
          <img 
            :src="currentImage" 
            :alt="product.name" 
            class="w-full h-full object-contain"
          >
        </div>
        <div v-else class="h-96 bg-gray-200 border-2 border-dashed rounded-xl w-full flex items-center justify-center">
          <span class="text-gray-500">No image available</span>
        </div>

        <!-- Image Navigation -->
        <div v-if="product.images && product.images.length > 1" class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'w-3 h-3 rounded-full',
              currentImageIndex === index ? 'bg-white' : 'bg-gray-300'
            ]"
          ></button>
        </div>
      </div>

      <div class="p-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="text-3xl font-bold text-green-600">₦{{ formatPrice(product.price) }}</div>
            <div class="mt-2">
              <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <button
            v-if="product.stock > 0"
            @click="addToCart"
            class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Cart
          </button>
          <button
            v-else
            disabled
            class="w-full md:w-auto px-6 py-3 bg-gray-400 text-white font-medium rounded-md cursor-not-allowed"
          >
            Out of Stock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../Stores/cart'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const cartStore = useCart()

const product = ref(null)
const loading = ref(false)
const error = ref('')
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  if (product.value && product.value.images && product.value.images.length > 0) {
    return product.value.images[currentImageIndex.value]
  }
  return null
})

const fetchProduct = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await api.get(`/products/${route.params.id}`)
    product.value = response.data
  } catch (err) {
    error.value = 'Failed to load product'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

const addToCart = () => {
  if (product.value) {
    cartStore.add(product.value)
    // Show a success message or animation
    alert(`${product.value.name} added to cart!`)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>