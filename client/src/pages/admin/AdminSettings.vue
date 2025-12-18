<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="mt-1 text-sm text-gray-500">Manage your application settings</p>
    </div>

    <!-- General Settings -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
        <p class="mt-1 text-sm text-gray-500">Configure general application settings</p>
      </div>
      <div class="border-t border-gray-200">
        <form @submit.prevent="saveGeneralSettings" class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="site_name" class="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                v-model="generalSettings.site_name"
                type="text"
                id="site_name"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="site_email" class="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                v-model="generalSettings.site_email"
                type="email"
                id="site_email"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="sm:col-span-2">
              <label for="site_description" class="block text-sm font-medium text-gray-700">Site Description</label>
              <textarea
                v-model="generalSettings.site_description"
                id="site_description"
                rows="3"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end mt-4">
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

    <!-- Payment Settings -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Payment Settings</h3>
        <p class="mt-1 text-sm text-gray-500">Configure payment gateway settings</p>
      </div>
      <div class="border-t border-gray-200">
        <form @submit.prevent="savePaymentSettings" class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="paystack_public_key" class="block text-sm font-medium text-gray-700">Paystack Public Key</label>
              <input
                v-model="paymentSettings.paystack_public_key"
                type="text"
                id="paystack_public_key"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="paystack_secret_key" class="block text-sm font-medium text-gray-700">Paystack Secret Key</label>
              <input
                v-model="paymentSettings.paystack_secret_key"
                type="password"
                id="paystack_secret_key"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="flex justify-end mt-4">
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

    <!-- Notification Settings -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
        <p class="mt-1 text-sm text-gray-500">Configure notification preferences</p>
      </div>
      <div class="border-t border-gray-200">
        <form @submit.prevent="saveNotificationSettings" class="px-4 py-5 sm:p-6">
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                v-model="notificationSettings.email_notifications"
                type="checkbox"
                id="email_notifications"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="email_notifications" class="block ml-2 text-sm text-gray-700">
                Enable email notifications
              </label>
            </div>
            <div class="flex items-center">
              <input
                v-model="notificationSettings.order_notifications"
                type="checkbox"
                id="order_notifications"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="order_notifications" class="block ml-2 text-sm text-gray-700">
                Send order confirmation emails
              </label>
            </div>
            <div class="flex items-center">
              <input
                v-model="notificationSettings.admin_notifications"
                type="checkbox"
                id="admin_notifications"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="admin_notifications" class="block ml-2 text-sm text-gray-700">
                Send admin notifications for new orders
              </label>
            </div>
          </div>
          <div class="flex justify-end mt-4">
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
  </div>
</template>

<script>
export default {
  name: 'AdminSettings',
  data() {
    return {
      generalSettings: {
        site_name: 'Foodie',
        site_email: 'admin@foodie.com',
        site_description: 'Online food delivery service'
      },
      paymentSettings: {
        paystack_public_key: '',
        paystack_secret_key: ''
      },
      notificationSettings: {
        email_notifications: true,
        order_notifications: true,
        admin_notifications: true
      }
    }
  },
  methods: {
    saveGeneralSettings() {
      // In a real application, you would save these settings to the backend
      alert('General settings saved successfully!')
    },
    savePaymentSettings() {
      // In a real application, you would save these settings to the backend
      alert('Payment settings saved successfully!')
    },
    saveNotificationSettings() {
      // In a real application, you would save these settings to the backend
      alert('Notification settings saved successfully!')
    }
  }
}
</script>