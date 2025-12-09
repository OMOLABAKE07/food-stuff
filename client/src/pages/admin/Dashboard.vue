<template>
  <AdminLayout title="Dashboard">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card class="border-l-4 border-blue-500">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Total Revenue</h3>
        </template>
        <div class="text-3xl font-bold text-gray-900">₦0</div>
        <p class="text-sm text-gray-500 mt-1">+0% from last month</p>
      </Card>
      
      <Card class="border-l-4 border-green-500">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Orders</h3>
        </template>
        <div class="text-3xl font-bold text-gray-900">0</div>
        <p class="text-sm text-gray-500 mt-1">+0% from last month</p>
      </Card>
      
      <Card class="border-l-4 border-yellow-500">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Products</h3>
        </template>
        <div class="text-3xl font-bold text-gray-900">0</div>
        <p class="text-sm text-gray-500 mt-1">+0% from last month</p>
      </Card>
    </div>
    
    <Card>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
      </template>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                No recent orders
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../components/ui/AdminLayout.vue'
import Card from '../../components/ui/Card.vue'
</script>