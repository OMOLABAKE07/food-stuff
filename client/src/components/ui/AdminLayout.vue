<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white">
      <div class="p-4 border-b border-gray-700">
        <h1 class="text-xl font-bold">Admin Panel {{ props.title }}</h1>
      </div>
      
      <nav class="mt-4">
        <router-link 
          to="/admin" 
          class="block py-2 px-4 hover:bg-gray-700 transition-colors"
          active-class="bg-gray-900"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/admin/products" 
          class="block py-2 px-4 hover:bg-gray-700 transition-colors"
          active-class="bg-gray-900"
        >
          Products
        </router-link>
        <router-link 
          to="/admin/orders" 
          class="block py-2 px-4 hover:bg-gray-700 transition-colors"
          active-class="bg-gray-900"
        >
          Orders
        </router-link>
      </nav>
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="flex justify-between items-center p-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ props.title }}</h2>
          <div class="flex items-center space-x-4">
            <button 
              @click="logout"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../Stores/auth'

const props = defineProps({
  title: [String]
})


const router = useRouter()
const authStore = useAuth()

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>