<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Order Management</h1>
      <button
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Export
      </button>
    </div>

    <!-- Filters -->
    <div class="mb-6 bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search order or customer"
          class="rounded-md border-gray-300"
        />

        <select v-model="filters.status" class="rounded-md border-gray-300">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input v-model="filters.dateFrom" type="date" class="rounded-md border-gray-300" />
        <input v-model="filters.dateTo" type="date" class="rounded-md border-gray-300" />

        <button
          @click="resetFilters"
          class="bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow-md overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in filteredOrders" :key="order.id">
            <td class="px-6 py-4 font-medium">#{{ order.id }}</td>

            <td class="px-6 py-4">
              <div>{{ order.user.name }}</div>
              <div class="text-sm text-gray-500">{{ order.user.email }}</div>
            </td>

            <td class="px-6 py-4 text-sm">{{ formatDate(order.created_at) }}</td>

            <td class="px-6 py-4 font-medium">
              ₦{{ formatPrice(order.total) }}
            </td>

            <td class="px-6 py-4">
              <select
                v-model="order.status"
                class="rounded-md border-gray-300 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>

            <td class="px-6 py-4">
              <button
                @click="viewOrderDetails(order)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                View
              </button>
            </td>
          </tr>

          <tr v-if="filteredOrders.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-500">
              No orders found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showOrderModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
        <div class="flex justify-between mb-4">
          <h2 class="text-lg font-bold">Order #{{ selectedOrder.id }}</h2>
          <button @click="showOrderModal = false">✕</button>
        </div>

        <p><strong>Customer:</strong> {{ selectedOrder.user.name }}</p>
        <p><strong>Email:</strong> {{ selectedOrder.user.email }}</p>
        <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
        <p class="mt-2"><strong>Total:</strong> ₦{{ formatPrice(selectedOrder.total) }}</p>

        <h3 class="mt-4 font-semibold">Items</h3>
        <ul class="list-disc ml-6">
          <li v-for="item in selectedOrder.items" :key="item.id">
            {{ item.product.name }} × {{ item.quantity }} — ₦{{ formatPrice(item.price) }}
          </li>
        </ul>

        <div class="text-right mt-6">
          <button
            @click="showOrderModal = false"
            class="px-4 py-2 border rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* =========================
   HARD-CODED DATA
========================= */
const orders = ref([
  {
    id: 1001,
    created_at: '2024-11-20',
    status: 'pending',
    total: 45000,
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    items: [
      { id: 1, quantity: 2, price: 15000, product: { name: 'Headset' } }
    ]
  },
  {
    id: 1002,
    created_at: '2024-11-18',
    status: 'delivered',
    total: 30000,
    user: {
      name: 'Mary Johnson',
      email: 'mary@example.com'
    },
    items: [
      { id: 2, quantity: 1, price: 30000, product: { name: 'Speaker' } }
    ]
  },
  {
    id: 1003,
    created_at: '2024-11-15',
    status: 'processing',
    total: 75000,
    user: {
      name: 'Samuel Ade',
      email: 'samuel@example.com'
    },
    items: [
      { id: 3, quantity: 3, price: 25000, product: { name: 'Smart Watch' } }
    ]
  }
])

const showOrderModal = ref(false)
const selectedOrder = ref({})

const filters = ref({
  search: '',
  status: '',
  dateFrom: '',
  dateTo: ''
})

/* =========================
   COMPUTED
========================= */
const filteredOrders = computed(() => {
  let result = [...orders.value]

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()
    result = result.filter(o =>
      o.id.toString().includes(q) ||
      o.user.name.toLowerCase().includes(q)
    )
  }

  if (filters.value.status) {
    result = result.filter(o => o.status === filters.value.status)
  }

  if (filters.value.dateFrom) {
    result = result.filter(o => new Date(o.created_at) >= new Date(filters.value.dateFrom))
  }

  if (filters.value.dateTo) {
    result = result.filter(o => new Date(o.created_at) <= new Date(filters.value.dateTo))
  }

  return result
})

/* =========================
   METHODS
========================= */
const resetFilters = () => {
  filters.value = { search: '', status: '', dateFrom: '', dateTo: '' }
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG').format(price)

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-NG')
</script>
