<template>
  <AdminLayout title="Orders">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Orders</h2>
    </div>
    
    <Card>
      <div class="overflow-x-auto">
        <AdminTable 
          :columns="columns" 
          :data="orders" 
          :actions="true"
        >
          <template #cell-id="{ item }">
            #{{ item.id }}
          </template>
          
          <template #cell-total_amount="{ item }">
            ₦{{ item.total_amount }}
          </template>
          
          <template #cell-status="{ item }">
            <span :class="getStatusClass(item.status)">
              {{ item.status }}
            </span>
          </template>
          
          <template #cell-created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>
          
          <template #actions="{ item }">
            <select 
              :value="item.status" 
              @change="updateOrderStatus(item.id, $event.target.value)"
              class="rounded-md border border-input bg-background px-2 py-1 text-sm mr-2"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </template>
        </AdminTable>
      </div>
    </Card>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/ui/AdminLayout.vue'
import Card from '../../components/ui/Card.vue'
import AdminTable from '../../components/ui/AdminTable.vue'
import api from '../../services/api'

const orders = ref([])
const loading = ref(false)

const columns = [
  { key: 'id', label: 'Order #' },
  { key: 'total_amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Date' }
]

const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await api.get('/admin/orders')
    orders.value = response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}

const updateOrderStatus = async (orderId, status) => {
  try {
    await api.put(`/admin/orders/${orderId}/status`, { status })
    fetchOrders()
  } catch (error) {
    console.error('Failed to update order status:', error)
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
    case 'shipped':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
    case 'delivered':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    case 'cancelled':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  fetchOrders()
})
</script>