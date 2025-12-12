<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Product Management</h1>
      <button 
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Add Product
      </button>
    </div>
    
    <!-- Loading indicator -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <!-- Error message -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <!-- Filters -->
    <div v-else class="mb-6 bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            v-model="filters.search"
            type="text" 
            id="search" 
            placeholder="Product name..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @input="applyFilters"
          >
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            v-model="filters.category"
            id="category" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @change="applyFilters"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            v-model="filters.status"
            id="status" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @change="applyFilters"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
    
    <!-- Products Table -->
    <div v-if="!loading && !error" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div v-if="product.main_image" class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3">
                    <img :src="product.main_image" :alt="product.name" class="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">SKU: {{ product.sku || 'N/A' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.category?.category_name || 'Uncategorized' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ formatPrice(product.price) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.stock }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="openEditModal(product)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                No products found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
          <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ filteredProducts.length > 0 ? 1 : 0 }}</span> to <span class="font-medium">{{ filteredProducts.length }}</span> of <span class="font-medium">{{ filteredProducts.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"> 1 </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"> 2 </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"> 3 </a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create/Edit Product Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="saveProduct">
            <div v-if="formError" class="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
              <p class="text-red-700 text-sm">{{ formError }}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  v-model="productForm.name"
                  type="text" 
                  id="name" 
                  required
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.name ? 'border-red-300' : ''
                  ]"
                >
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>
              <div>
                <label for="sku" class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input 
                  v-model="productForm.sku"
                  type="text" 
                  id="sku" 
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.sku ? 'border-red-300' : ''
                  ]"
                >
                <p v-if="errors.sku" class="mt-1 text-sm text-red-600">{{ errors.sku }}</p>
              </div>
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                <input 
                  v-model.number="productForm.price"
                  type="number" 
                  id="price" 
                  min="0" 
                  step="0.01"
                  required
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.price ? 'border-red-300' : ''
                  ]"
                >
                <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
              </div>
              <div>
                <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input 
                  v-model.number="productForm.stock"
                  type="number" 
                  id="stock" 
                  min="0" 
                  required
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.stock ? 'border-red-300' : ''
                  ]"
                >
                <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
              </div>
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  v-model="productForm.category_id"
                  id="category" 
                  required
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.category_id ? 'border-red-300' : ''
                  ]"
                >
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.category_name }}
                  </option>
                </select>
                <p v-if="errors.category_id" class="mt-1 text-sm text-red-600">{{ errors.category_id }}</p>
              </div>
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  v-model="productForm.is_active"
                  id="status" 
                  required
                  :class="[
                    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                    errors.is_active ? 'border-red-300' : ''
                  ]"
                >
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
                <p v-if="errors.is_active" class="mt-1 text-sm text-red-600">{{ errors.is_active }}</p>
              </div>
            </div>
            
            <div class="mb-6">
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="productForm.description"
                id="description" 
                rows="3"
                :class="[
                  'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                  errors.description ? 'border-red-300' : ''
                ]"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input type="file" class="sr-only">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                @click="closeModal"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                :disabled="saving"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <span v-if="saving">Saving...</span>
                <span v-else>{{ isEditing ? 'Update Product' : 'Add Product' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAdminProducts, createProduct, updateProduct, deleteProduct } from '../../services/adminService'
import api from '../../services/api'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const formError = ref('')
const errors = ref({})
const showModal = ref(false)
const isEditing = ref(false)
const editingProductId = ref(null)

// Filters
const filters = ref({
  search: '',
  category: '',
  status: ''
})

// Product form
const productForm = ref({
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  category_id: '',
  is_active: true,
  description: ''
})

// Computed properties
const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Apply search filter
  if (filters.value.search) {
    const query = filters.value.search.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      (product.sku && product.sku.toLowerCase().includes(query))
    )
  }
  
  // Apply category filter
  if (filters.value.category) {
    result = result.filter(product => product.category_id == filters.value.category)
  }
  
  // Apply status filter
  if (filters.value.status) {
    const isActive = filters.value.status === 'active'
    result = result.filter(product => product.is_active === isActive)
  }
  
  return result
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

const fetchProducts = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const data = await getAdminProducts()
    products.value = data
    
    // Extract unique categories
    const uniqueCategories = [...new Map(data.map(item => [item.category?.id, item.category])).values()].filter(Boolean)
    categories.value = uniqueCategories
  } catch (err) {
    console.error('Failed to load products:', err)
    error.value = 'Failed to load products. Please try again later.'
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

const applyFilters = () => {
  // Filtering is handled by computed property
}

const resetFilters = () => {
  filters.value.search = ''
  filters.value.category = ''
  filters.value.status = ''
}

const openCreateModal = () => {
  isEditing.value = false
  editingProductId.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (product) => {
  isEditing.value = true
  editingProductId.value = product.id
  productForm.value = {
    name: product.name,
    sku: product.sku || '',
    price: product.price,
    stock: product.stock,
    category_id: product.category_id,
    is_active: product.is_active,
    description: product.description || ''
  }
  errors.value = {}
  formError.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const resetForm = () => {
  productForm.value = {
    name: '',
    sku: '',
    price: 0,
    stock: 0,
    category_id: '',
    is_active: true,
    description: ''
  }
  errors.value = {}
  formError.value = ''
}

const saveProduct = async () => {
  saving.value = true
  formError.value = ''
  errors.value = {}
  
  try {
    if (isEditing.value) {
      // Update existing product
      await updateProduct(editingProductId.value, productForm.value)
    } else {
      // Create new product
      await createProduct(productForm.value)
    }
    
    // Close modal and refresh products
    closeModal()
    await fetchProducts()
  } catch (err) {
    console.error('Failed to save product:', err)
    
    // Handle validation errors from backend
    if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors || {}
      const formattedErrors = {}
      
      // Map backend validation errors to frontend fields
      Object.keys(validationErrors).forEach(key => {
        formattedErrors[key] = validationErrors[key][0]
      })
      
      errors.value = formattedErrors
      formError.value = 'Please correct the errors below'
    } else {
      formError.value = err.response?.data?.message || 'Failed to save product. Please try again.'
    }
  } finally {
    saving.value = false
  }
}

const deleteProductHandler = async (id) => {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    try {
      await deleteProduct(id)
      await fetchProducts()
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('Failed to delete product: ' + (error.response?.data?.message || error.message))
    }
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>