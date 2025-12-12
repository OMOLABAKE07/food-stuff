<template>
  <AdminLayout title="Products">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Products</h2>
      <Button @click="openCreateModal" variant="default">
        Add Product
      </Button>
    </div>

    <Card>
      <div class="overflow-x-auto">
        <AdminTable :columns="columns" :data="products" :actions="true">
          <template #cell-name="{ item }">
            <div class="flex items-center">
              <div v-if="item.main_image" class="w-10 h-10 mr-3 rounded-md overflow-hidden">
                <img :src="item.main_image" :alt="item.name" class="w-full h-full object-cover">
              </div>
              <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
              <span>{{ item.name }}</span>
            </div>
          </template>

          <template #cell-price="{ item }">
            ₦{{ formatPrice(item.price) }}
          </template>

          <template #cell-stock="{ item }">
            <span :class="item.stock > 0 ? 'text-green-600' : 'text-red-600'">
              {{ item.stock }}
            </span>
          </template>

          <template #cell-is_active="{ item }">
            <span :class="item.is_active ? 'text-green-600' : 'text-red-600'">
              {{ item.is_active ? 'Active' : 'Inactive' }}
            </span>
          </template>

          <template #actions="{ item }">
            <Button @click="editProduct(item)" variant="outline" size="sm" class="mr-2">
              Edit
            </Button>
            <Button @click="deleteProduct(item.id)" variant="destructive" size="sm">
              Delete
            </Button>
          </template>
        </AdminTable>
      </div>
    </Card>

    <!-- Create/Edit Product Modal -->
    <Modal v-model="showModal" :title="editingProduct ? 'Edit Product' : 'Create Product'" modal-class="max-w-2xl">
      <form @submit.prevent="saveProduct">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              v-model="productForm.name" 
              type="text" 
              required 
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="productForm.description" 
              rows="3"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
              <input 
                v-model.number="productForm.price" 
                type="number" 
                min="1" 
                required 
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                :class="{ 'border-red-500': errors.price }"
              />
              <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input 
                v-model.number="productForm.stock" 
                type="number" 
                min="0" 
                required 
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                :class="{ 'border-red-500': errors.stock }"
              />
              <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <ImageUploader ref="imageUploader" v-model:images="productImages" />
            <p v-if="errors.images" class="mt-1 text-sm text-red-600">{{ errors.images }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              v-model="productForm.is_active"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
        </div>
      </form>

      <div v-if="formError" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
        {{ formError }}
      </div>

      <template #footer>
        <Button type="button" variant="outline" @click="showModal = false">
          Cancel
        </Button>
        <Button @click="saveProduct" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </Button>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/ui/AdminLayout.vue'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import Modal from '../../components/ui/Modal.vue'
import AdminTable from '../../components/ui/AdminTable.vue'
import ImageUploader from '../../components/ImageUploader.vue'
import api from '../../services/api'
import toastr from '../../utils/toastr'

const products = ref([])
const loading = ref(false)
const showModal = ref(false)
const saving = ref(false)
const editingProduct = ref(null)
const productImages = ref([])
const imageUploader = ref(null)

const productForm = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  is_active: true
})

const errors = ref({})
const formError = ref('')

const columns = [
  { key: 'name', label: 'Product' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'is_active', label: 'Status' }
]

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await api.get('/admin/products')
    products.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

const validateForm = () => {
  const newErrors = {}
  
  // Reset errors
  errors.value = {}
  
  // Validate name
  if (!productForm.value.name || productForm.value.name.trim() === '') {
    newErrors.name = 'Product name is required'
  } else if (productForm.value.name.length < 3) {
    newErrors.name = 'Product name must be at least 3 characters'
  }
  
  // Validate price
  if (!productForm.value.price || productForm.value.price <= 0) {
    newErrors.price = 'Price must be greater than 0'
  }
  
  // Validate stock
  if (productForm.value.stock === null || productForm.value.stock < 0) {
    newErrors.stock = 'Stock must be 0 or greater'
  }
  
  // Validate description
  if (productForm.value.description && productForm.value.description.length > 1000) {
    newErrors.description = 'Description must be less than 1000 characters'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const openCreateModal = () => {
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    is_active: true
  }
  productImages.value = []
  errors.value = {}
  formError.value = ''
  showModal.value = true
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = { 
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    is_active: product.is_active
  }
  productImages.value = []
  errors.value = {}
  formError.value = ''
  showModal.value = true
}

const saveProduct = async () => {
  // Validate form before submitting
  if (!validateForm()) {
    return
  }
  
  saving.value = true
  formError.value = ''
  
  try {
    const formData = new FormData()

    // Append form data
    formData.append('name', productForm.value.name)
    formData.append('description', productForm.value.description)
    formData.append('price', productForm.value.price)
    formData.append('stock', productForm.value.stock)
    formData.append('is_active', productForm.value.is_active)

    // Append images correctly as an array
    productImages.value.forEach((image) => {
      formData.append('images[]', image)
    })

    let response
    if (editingProduct.value) {
      // Update existing product
      response = await api.post(`/admin/products/${editingProduct.value.id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      // Create new product
      response = await api.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }

    showModal.value = false
    await fetchProducts()
    
    // Show success message
    if (editingProduct.value) {
      toastr.success('Product updated successfully!')
    } else {
      toastr.success('Product created successfully!')
    }
    
    // Reset form
    resetForm()
  } catch (error) {
    console.error('Failed to save product:', error)
    
    // Handle validation errors from backend
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors || {}
      const formattedErrors = {}
      
      // Map backend validation errors to frontend fields
      Object.keys(validationErrors).forEach(key => {
        formattedErrors[key] = validationErrors[key][0]
      })
      
      errors.value = formattedErrors
      formError.value = 'Please correct the errors below'
    } else {
      formError.value = error.response?.data?.message || 'Failed to save product. Please try again.'
    }
  } finally {
    saving.value = false
  }
}

const resetForm = () => {
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    is_active: true
  }
  productImages.value = []
  errors.value = {}
  formError.value = ''
  showModal.value = false
}

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    try {
      await api.delete(`/admin/products/${id}`)
      await fetchProducts()
      toastr.success('Product deleted successfully!')
    } catch (error) {
      console.error('Failed to delete product:', error)
      toastr.error('Failed to delete product: ' + (error.response?.data?.message || error.message))
    }
  }
}

onMounted(() => {
  fetchProducts()
})
</script>