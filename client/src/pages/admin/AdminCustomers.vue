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
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Phone</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Address</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Registered</th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.id">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ customer.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ customer.email }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ customer.phone || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ customer.address || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(customer.created_at) }}
              </td>
              <td class="px-6 py-4 text-sm font-medium">
                <button
                  @click="editCustomer(customer)"
                  class="mr-3 text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  @click="deleteCustomer(customer)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div v-if="showCustomerModal">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"></div>

      <!-- Modal -->
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

          <div
            class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}
              </h3>

              <form class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    v-model="customerForm.name"
                    type="text"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    v-model="customerForm.email"
                    type="email"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    v-model="customerForm.phone"
                    type="text"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    v-model="customerForm.address"
                    rows="3"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              </form>
            </div>

            <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="saveCustomer"
                class="inline-flex justify-center w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                @click="closeCustomerModal"
                class="inline-flex justify-center w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
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
      const response = await api.get('/admin/users')
      this.customers = response.data.filter(user => user.role === 'customer')
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    openAddCustomerModal() {
      this.editingCustomer = null
      this.customerForm = { name: '', email: '', phone: '', address: '' }
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
      if (this.editingCustomer) {
        await api.put(`/admin/users/${this.editingCustomer.id}`, this.customerForm)
      } else {
        await api.post('/admin/users', {
          ...this.customerForm,
          password: 'password123',
          password_confirmation: 'password123'
        })
      }
      this.closeCustomerModal()
      await this.fetchCustomers()
    },
    async deleteCustomer(customer) {
      if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
        await api.delete(`/admin/users/${customer.id}`)
        await this.fetchCustomers()
      }
    }
  }
}
</script>
