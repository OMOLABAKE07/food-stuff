<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <router-link to="/products" class="text-2xl font-bold text-indigo-600">
              FoodStuff
            </router-link>
          </div>
          
          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <router-link 
              to="/products" 
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              Products
            </router-link>
            <router-link 
              to="/orders" 
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              My Orders
            </router-link>
          </nav>
          
          <!-- Right side icons -->
          <div class="flex items-center space-x-4">
            <!-- Cart Icon -->
            <router-link 
              to="/cart" 
              class="text-gray-700 hover:text-indigo-600 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartStore.itemCount }}
              </span>
            </router-link>
            
            <!-- Help Dropdown -->
            <div class="relative" ref="helpMenuRef">
              <button 
                @click="toggleHelpMenu" 
                class="text-gray-700 hover:text-indigo-600 focus:outline-none flex items-center"
                type="button"
              >
                <span class="mr-1">Help</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div v-if="helpMenuOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-20">
                <div class="px-4 py-2 border-b border-gray-100">
                  <h3 class="text-sm font-medium text-gray-900">Help Center</h3>
                </div>
                <template v-for="(item, index) in helpMenuItems" :key="index">
                  <router-link 
                    v-if="!item.isDivider"
                    :to="item.path" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="helpMenuOpen = false"
                  >
                    {{ item.label }}
                  </router-link>
                  <div v-else class="border-t border-gray-100"></div>
                </template>
              </div>
            </div>
            
            <!-- User Menu -->
            <div v-if="authStore.user" class="relative" ref="userMenuRef">
              <button 
                @click="toggleUserMenu" 
                class="flex items-center text-gray-700 hover:text-indigo-600 focus:outline-none"
                type="button"
              >
                <span class="mr-1">{{ authStore.user.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button 
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
            
            <router-link 
              v-else
              to="/login" 
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>
    
    <!-- Footer -->
    <footer class="bg-white border-t mt-8">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-500 text-sm">
          &copy; 2025 FoodStuff. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/Stores/auth'
import { useCart } from '@/Stores/cart'
import { useHelpMenu } from '@/composables/useHelpMenu'

const router = useRouter()
const authStore = useAuth()
const cartStore = useCart()
const { helpMenuItems } = useHelpMenu()

const userMenuOpen = ref(false)
const helpMenuOpen = ref(false)
const userMenuRef = ref(null)
const helpMenuRef = ref(null)

// Load cart data when component initializes
onMounted(() => {
  cartStore.loadCart()
  
  // Add event listener to close menus when clicking outside
  document.addEventListener('click', handleClickOutside)
})

// Clean up event listener
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  // Close user menu if clicked outside
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
  
  // Close help menu if clicked outside
  if (helpMenuRef.value && !helpMenuRef.value.contains(event.target)) {
    helpMenuOpen.value = false
  }
}

const toggleUserMenu = (event) => {
  // Prevent the click from propagating to the document listener
  event.stopPropagation()
  // Close help menu if open
  helpMenuOpen.value = false
  userMenuOpen.value = !userMenuOpen.value
}

const toggleHelpMenu = (event) => {
  // Prevent the click from propagating to the document listener
  event.stopPropagation()
  // Close user menu if open
  userMenuOpen.value = false
  helpMenuOpen.value = !helpMenuOpen.value
}

const logout = async () => {
  try {
    await authStore.logout()
    userMenuOpen.value = false
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>