<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Order Management</h1>
      <div class="flex space-x-3">
        <button class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Export
        </button>
      </div>
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
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            v-model="filters.search"
            type="text" 
            id="search" 
            placeholder="Order ID, customer..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @input="applyFilters"
          >
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label for="date-from" class="block text-sm font-medium text-gray-700 mb-1">Date From</label>
          <input 
            v-model="filters.dateFrom"
            type="date" 
            id="date-from" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @change="applyFilters"
          >
        </div>
        <div>
          <label for="date-to" class="block text-sm font-medium text-gray-700 mb-1">Date To</label>
          <input 
            v-model="filters.dateTo"
            type="date" 
            id="date-to" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @change="applyFilters"
          >
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
    
    <!-- Orders Table -->
    <div v-if="!loading && !error" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.user?.name || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ order.user?.email || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ formatPrice(order.total) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select 
                  :value="order.status"
                  class="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  @change="updateOrderStatus(order.id, $event.target.value)"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewOrderDetails(order)" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                No orders found
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
              Showing <span class="font-medium">{{ filteredOrders.length > 0 ? 1 : 0 }}</span> to <span class="font-medium">{{ filteredOrders.length }}</span> of <span class="font-medium">{{ filteredOrders.length }}</span> results
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
    
    <!-- Order Details Modal -->
    <div v-if="showOrderModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Order Details - #{{ selectedOrder.id }}</h3>
            <button @click="closeOrderModal" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-2">Customer Information</h4>
                <p class="text-sm text-gray-600">{{ selectedOrder.user?.name || 'N/A' }}</p>
                <p class="text-sm text-gray-600">{{ selectedOrder.shipping_address?.address || 'N/A' }}</p>
                <p class="text-sm text-gray-600">{{ selectedOrder.shipping_address?.city || 'N/A' }}, {{ selectedOrder.shipping_address?.state || 'N/A' }}</p>
                <p class="text-sm text-gray-600">{{ selectedOrder.user?.email || 'N/A' }}</p>
                <p class="text-sm text-gray-600">{{ selectedOrder.user?.phone || 'N/A' }}</p>
              </div>
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-2">Order Information</h4>
                <p class="text-sm text-gray-600"><span class="font-medium">Order Date:</span> {{ formatDate(selectedOrder.created_at) }}</p>
                <p class="text-sm text-gray-600"><span class="font-medium">Status:</span> 
                  <span 
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getOrderStatusClass(selectedOrder.status)
                    ]"
                  >
                    {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
                  </span>
                </p>
                <p class="text-sm text-gray-600"><span class="font-medium">Payment Method:</span> {{ selectedOrder.payment_method || 'N/A' }}</p>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-md font-medium text-gray-900 mb-2">Order Items</h4>
            <div class="border rounded-md">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in selectedOrder.items" :key="item.id">
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ item.product?.name || 'N/A' }}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{ item.quantity }}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦{{ formatPrice(item.price) }}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦{{ formatPrice(item.price * item.quantity) }}</td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                    <td class="px-4 py-2 text-sm text-gray-900">₦{{ formatPrice(selectedOrder.subtotal || 0) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Shipping</td>
                    <td class="px-4 py-2 text-sm text-gray-900">₦{{ formatPrice(selectedOrder.delivery_fee || 0) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Tax</td>
                    <td class="px-4 py-2 text-sm text-gray-900">₦{{ formatPrice(selectedOrder.tax || 0) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Total</td>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">₦{{ formatPrice(selectedOrder.total || 0) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button 
              @click="closeOrderModal"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAdminOrders, updateOrderStatus } from '../../services/adminService'

const orders = ref([])
const loading = ref(false)
const error = ref('')
const showOrderModal = ref(false)
const selectedOrder = ref({})

// Filters
const filters = ref({
  search: '',
  status: '',
  dateFrom: '',
  dateTo: ''
})

// Computed properties
const filteredOrders = computed(() => {
  let result = [...orders.value]
  
  // Apply search filter
  if (filters.value.search) {
    const query = filters.value.search.toLowerCase()
    result = result.filter(order => 
      order.id.toString().includes(query) || 
      (order.user?.name && order.user.name.toLowerCase().includes(query)) ||
      (order.user?.email && order.user.email.toLowerCase().includes(query))
    )
  }
  
  // Apply status filter
  if (filters.value.status) {
    result = result.filter(order => order.status === filters.value.status)
  }
  
  // Apply date filters
  if (filters.value.dateFrom) {
    const fromDate = new Date(filters.value.dateFrom)
    result = result.filter(order => new Date(order.created_at) >= fromDate)
  }
  
  if (filters.value.dateTo) {
    const toDate = new Date(filters.value.dateTo)
    toDate.setHours(23, 59, 59, 999) // End of day
    result = result.filter(order => new Date(order.created_at) <= toDate)
  }
  
  return result
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-NG')
}

const getOrderStatusClass = (status) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const fetchOrders = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const data = await getAdminOrders()
    orders.value = data
  } catch (err) {
    console.error('Failed to load orders:', err)
    error.value = 'Failed to load orders. Please try again later.'
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  // Filtering is handled by computed property
}

const resetFilters = () => {
  filters.value.search = ''
  filters.value.status = ''
  filters.value.dateFrom = ''
  filters.value.dateTo = ''
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
}

const updateOrderStatusHandler = async (orderId, status) => {
  try {
    const updatedOrder = await updateOrderStatus(orderId, status)
    
    // Update the order in the list
    const orderIndex = orders.value.findIndex(order => order.id === orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex] = updatedOrder
    }
    
    // If we're viewing this order in the modal, update it there too
    if (selectedOrder.value.id === orderId) {
      selectedOrder.value = updatedOrder
    }
  } catch (error) {
    console.error('Failed to update order status:', error)
    alert('Failed to update order status: ' + (error.response?.data?.message || error.message))
  }
}

// Lifecycle
onMounted(() => {
  fetchOrders()
})
</script>