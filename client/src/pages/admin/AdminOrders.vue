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
    
    <!-- Filters -->
    <div class="mb-6 bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            type="text" 
            id="search" 
            placeholder="Order ID, customer..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            id="status" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            type="date" 
            id="date-from" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
        </div>
        <div>
          <label for="date-to" class="block text-sm font-medium text-gray-700 mb-1">Date To</label>
          <input 
            type="date" 
            id="date-to" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
        </div>
        <div class="flex items-end">
          <button class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
    
    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
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
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#ORD-001</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">John Doe</div>
                <div class="text-sm text-gray-500">john@example.com</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 10, 2025</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦12,500</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select 
                  class="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  @change="updateOrderStatus('ORD-001', $event.target.value)"
                >
                  <option value="pending">Pending</option>
                  <option value="processing" selected>Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewOrderDetails('ORD-001')" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#ORD-002</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Jane Smith</div>
                <div class="text-sm text-gray-500">jane@example.com</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 9, 2025</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦8,750</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select 
                  class="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  @change="updateOrderStatus('ORD-002', $event.target.value)"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped" selected>Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewOrderDetails('ORD-002')" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
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
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">42</span> results
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
                <p class="text-sm text-gray-600">John Doe</p>
                <p class="text-sm text-gray-600">123 Main Street</p>
                <p class="text-sm text-gray-600">Lagos, Nigeria</p>
                <p class="text-sm text-gray-600">john@example.com</p>
                <p class="text-sm text-gray-600">+234 801 234 5678</p>
              </div>
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-2">Order Information</h4>
                <p class="text-sm text-gray-600"><span class="font-medium">Order Date:</span> Dec 10, 2025</p>
                <p class="text-sm text-gray-600"><span class="font-medium">Status:</span> 
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                </p>
                <p class="text-sm text-gray-600"><span class="font-medium">Payment Method:</span> Credit Card</p>
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
                  <tr>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Organic Apples</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">2</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦1,200</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦2,400</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Atlantic Salmon</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">1</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦3,500</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">₦3,500</td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                    <td class="px-4 py-2 text-sm text-gray-900">₦5,900</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Shipping</td>
                    <td class="px-4 py-2 text-sm text-gray-900">₦1,500</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">Total</td>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">₦7,400</td>
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
import { ref } from 'vue'

const showOrderModal = ref(false)
const selectedOrder = ref({})

const viewOrderDetails = (orderId) => {
  selectedOrder.value = { id: orderId }
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
}

const updateOrderStatus = (orderId, status) => {
  // Update order status logic would go here
  console.log(`Updating order ${orderId} to status ${status}`)
}
</script>