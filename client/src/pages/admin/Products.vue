<template>
  <AdminLayout>
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
            ₦{{ item.price }}
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
            <input v-model="productForm.name" type="text" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="productForm.description" rows="3"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
              <input v-model="productForm.price" type="number" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input v-model="productForm.stock" type="number" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <ImageUploader ref="imageUploader" v-model:images="productImages" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="productForm.is_active"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
        </div>
      </form>

      <template #footer>
        <Button type="button" variant="outline" @click="showModal = false">
          Cancel
        </Button>
        <Button type="submit" :disabled="saving">
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
import Input from '../../components/ui/Input.vue'
import AdminTable from '../../components/ui/AdminTable.vue'
import ImageUploader from '../../components/ImageUploader.vue'
import axios from 'axios'

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

const columns = [
  { key: 'name', label: 'Product' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'is_active', label: 'Status' }
]

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await axios.get('/admin/products')
    products.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
  }
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
  showModal.value = true
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = { ...product }
  productImages.value = []
  showModal.value = true
}

const saveProduct = async () => {
  saving.value = true
  try {
    const formData = new FormData()

    // Append form data
    Object.keys(productForm.value).forEach(key => {
      formData.append(key, productForm.value[key])
    })

    // Append images
    productImages.value.forEach((image, index) => {
      formData.append(`images[${index}]`, image)
    })

    if (editingProduct.value) {
      // Update existing product
      await axios.post(`/admin/products/${editingProduct.value.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      // Create new product
      await axios.post('/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }

    showModal.value = false
    fetchProducts()
  } catch (error) {
    console.error('Failed to save product:', error)
  } finally {
    saving.value = false
  }
}

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await axios.delete(`/admin/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }
}

onMounted(() => {
  fetchProducts()
})
</script>