<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Our Products</h1>
        <p class="text-gray-600 mt-2">Discover our delicious food items</p>
      </div>
    </div>
    
    <!-- Search and Filter Section -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              @input="handleSearch"
            >
            <div class="absolute right-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-else>
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '../Stores/auth'
import { useCart } from '../Stores/cart'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api'

const authStore = useAuth()
const cartStore = useCart()

const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('')

const fetchProducts = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await api.get('/products')
    products.value = response.data
  } catch (err) {
    error.value = 'Failed to load products'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    categories.value = response.data
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(product => product.category_id == selectedCategory.value)
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      (product.description && product.description.toLowerCase().includes(query))
    )
  }
  
  // Apply sorting
  if (sortBy.value) {
    switch (sortBy.value) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
    }
  }
  
  return result
})

const handleSearch = () => {
  // Debounced search can be implemented here if needed
}

const addToCart = (product) => {
  cartStore.add(product)
  // Show a brief notification
  showNotification(`${product.name} added to cart!`)
}

const showNotification = (message) => {
  // Simple notification - in a real app you might use a toast library
  alert(message)
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>