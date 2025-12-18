<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
      <button
        @click="openAddCustomerModal"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Customer
      </button>
    </div>

    <!-- Customers Table -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Customer List</h3>
        <p class="mt-1 text-sm text-gray-500">List of all registered customers</p>
      </div>
      <div class="border-t border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Address</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Registered</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ customer.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ customer.phone || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ customer.address || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(customer.created_at) }}</div>
              </td>
              <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button @click="deleteCustomer(customer)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div v-if="showCustomerModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}
            </h3>
            <form @submit.prevent="saveCustomer" class="mt-4 space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input
                  v-model="customerForm.name"
                  type="text"
                  id="name"
                  required
                  class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="customerForm.email"
                  type="email"
                  id="email"
                  required
                  class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  v-model="customerForm.phone"
                  type="text"
                  id="phone"
                  class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  v-model="customerForm.address"
                  id="address"
                  rows="3"
                  class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="saveCustomer"
              type="button"
              class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              @click="closeCustomerModal"
              type="button"
              class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  name: 'AdminCustomers',
  data() {
    return {
      customers: [],
      showCustomerModal: false,
      editingCustomer: null,
      customerForm: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  async mounted() {
    await this.fetchCustomers()
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await api.get('/users')
        this.customers = response.data.filter(user => user.role === 'customer')
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    openAddCustomerModal() {
      this.editingCustomer = null
      this.customerForm = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
      this.showCustomerModal = true
    },
    closeCustomerModal() {
      this.showCustomerModal = false
    },
    editCustomer(customer) {
      this.editingCustomer = customer
      this.customerForm = { ...customer }
      this.showCustomerModal = true
    },
    async saveCustomer() {
      try {
        if (this.editingCustomer) {
          // Update existing customer
          await api.put(`/users/${this.editingCustomer.id}`, this.customerForm)
        } else {
          // Create new customer
          await api.post('/register', {
            ...this.customerForm,
            password: 'password123', // Default password for new customers
            password_confirmation: 'password123'
          })
        }
        this.closeCustomerModal()
        await this.fetchCustomers()
      } catch (error) {
        console.error('Error saving customer:', error)
      }
    },
    async deleteCustomer(customer) {
      if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
        try {
          await api.delete(`/users/${customer.id}`)
          await this.fetchCustomers()
        } catch (error) {
          console.error('Error deleting customer:', error)
        }
      }
    }
  }
}
</script>