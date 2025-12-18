<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Product Management</h1>
      <button 
        @click="openCreateModal"
        class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    <div v-else class="mb-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            v-model="filters.search"
            type="text" 
            id="search" 
            placeholder="Product name..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            @input="applyFilters"
          >
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            v-model="filters.category"
            id="category" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
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
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            @change="applyFilters"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 text-sm">
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
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Price</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Stock</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="px-4 py-4">
                <div class="flex items-center">
                  <div v-if="product.main_image" class="flex-shrink-0 w-12 h-12 mr-3">
                    <img :src="product.main_image" :alt="product.name" class="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div v-else class="flex-shrink-0 bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                  <div class="min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">SKU: {{ product.sku || 'N/A' }}</div>
                    
                    <!-- Mobile-only extra details -->
                    <div class="mt-2 text-xs text-gray-600 md:hidden">
                      <div>{{ product.category?.category_name || 'Uncategorized' }}</div>
                      <div class="mt-1">₦{{ formatPrice(product.price) }} • Stock: {{ product.stock }}</div>
                      <div class="mt-2">
                        <span 
                          :class="[
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                            product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          ]"
                        >
                          {{ product.is_active ? 'Active' : 'Inactive' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
                {{ product.category?.category_name || 'Uncategorized' }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">₦{{ formatPrice(product.price) }}</td>
              <td class="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">{{ product.stock }}</td>
              <td class="px-4 py-4 hidden sm:table-cell">
                <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-4 text-sm font-medium text-right">
                <button @click="openEditModal(product)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button @click="deleteProductHandler(product.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">
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
    
    <!-- Modal - Fixed iOS Select Picker Issue -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div 
        class="w-full max-w-lg md:max-w-2xl bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh]"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveProduct" class="space-y-6">
            <div v-if="formError" class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-red-700 text-sm">{{ formError }}</p>
            </div>

            <!-- Form Fields Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input 
                  v-model="productForm.name" 
                  type="text" 
                  id="name" 
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  :class="{ 'border-red-300': errors.name }"
                >
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label for="sku" class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input 
                  v-model="productForm.sku" 
                  type="text" 
                  id="sku"
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  :class="{ 'border-red-300': errors.sku }"
                >
                <p v-if="errors.sku" class="mt-1 text-sm text-red-600">{{ errors.sku }}</p>
              </div>

              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
                <input 
                  v-model.number="productForm.price" 
                  type="number" 
                  id="price" 
                  min="0" 
                  step="0.01" 
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  :class="{ 'border-red-300': errors.price }"
                >
                <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
              </div>

              <div>
                <label for="stock" class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input 
                  v-model.number="productForm.stock" 
                  type="number" 
                  id="stock" 
                  min="0" 
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  :class="{ 'border-red-300': errors.stock }"
                >
                <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
              </div>

              <!-- Category Select - iOS Fix -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  v-model="productForm.category_id" 
                  id="category" 
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white"
                  :class="{ 'border-red-300': errors.category_id }"
                  onchange="this.blur()"
                >
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.category_name }}
                  </option>
                </select>
                <p v-if="errors.category_id" class="mt-1 text-sm text-red-600">{{ errors.category_id }}</p>
              </div>

              <!-- Status Select - iOS Fix -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  v-model="productForm.is_active" 
                  id="status" 
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white"
                  :class="{ 'border-red-300': errors.is_active }"
                  onchange="this.blur()"
                >
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
                <p v-if="errors.is_active" class="mt-1 text-sm text-red-600">{{ errors.is_active }}</p>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                v-model="productForm.description" 
                id="description" 
                rows="4"
                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                :class="{ 'border-red-300': errors.description }"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" class="sr-only" accept="image/*">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row-reverse gap-3 pt-4">
              <button 
                type="submit" 
                :disabled="saving"
                class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="saving">Saving...</span>
                <span v-else>{{ isEditing ? 'Update Product' : 'Add Product' }}</span>
              </button>
              <button 
                type="button" 
                @click="closeModal"
                class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
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
  
  if (filters.value.search) {
    const query = filters.value.search.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      (product.sku && product.sku.toLowerCase().includes(query))
    )
  }
  
  if (filters.value.category) {
    result = result.filter(product => product.category_id == filters.value.category)
  }
  
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

const applyFilters = () => {}

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
      await updateProduct(editingProductId.value, productForm.value)
    } else {
      await createProduct(productForm.value)
    }
    
    closeModal()
    await fetchProducts()
  } catch (err) {
    console.error('Failed to save product:', err)
    
    if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors || {}
      const formattedErrors = {}
      
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

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
/* Prevent iOS zoom on input focus and reduce picker jump */
input, select, textarea {
  font-size: 16px !important;
}
</style>