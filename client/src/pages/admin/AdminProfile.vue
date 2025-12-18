<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
      <p class="mt-1 text-sm text-gray-500">Manage your admin profile information</p>
    </div>

    <!-- Profile Card -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
        <p class="mt-1 text-sm text-gray-500">Update your personal details here</p>
      </div>
      <div class="border-t border-gray-200">
        <form @submit.prevent="updateProfile" class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                v-model="profileForm.name"
                type="text"
                id="name"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                v-model="profileForm.email"
                type="email"
                id="email"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                v-model="profileForm.phone"
                type="tel"
                id="phone"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <input
                v-model="profileForm.address"
                type="text"
                id="address"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <input
                v-model="profileForm.city"
                type="text"
                id="city"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">State</label>
              <input
                v-model="profileForm.state"
                type="text"
                id="state"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="zip" class="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                v-model="profileForm.zip"
                type="text"
                id="zip"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
        <p class="mt-1 text-sm text-gray-500">Update your password regularly for security</p>
      </div>
      <div class="border-t border-gray-200">
        <form @submit.prevent="changePassword" class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label for="current_password" class="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                v-model="passwordForm.current_password"
                type="password"
                id="current_password"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="new_password" class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="passwordForm.new_password"
                type="password"
                id="new_password"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="new_password_confirmation" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                v-model="passwordForm.new_password_confirmation"
                type="password"
                id="new_password_confirmation"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import { useAuth } from '../../Stores/auth'

export default {
  name: 'AdminProfile',
  data() {
    return {
      profileForm: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      passwordForm: {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    }
  },
  async mounted() {
    await this.loadProfile()
  },
  methods: {
    async loadProfile() {
      try {
        const authStore = useAuth()
        const user = authStore.user
        
        this.profileForm = {
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          zip: user.zip || ''
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    },
    async updateProfile() {
      try {
        const response = await api.put('/user/profile', this.profileForm)
        const authStore = useAuth()
        authStore.setUser(response.data.user)
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Error updating profile. Please try again.')
      }
    },
    async changePassword() {
      // In a real application, you would implement password change functionality
      // This is a simplified version for demonstration
      alert('Password change functionality would be implemented here.')
      this.passwordForm = {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    }
  }
}
</script>