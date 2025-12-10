<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
            Home
          </router-link>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Help Center</span>
          </div>
        </li>
      </ol>
    </nav>
    
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <div class="lg:w-1/4">
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Help Center</h2>
          <ul class="space-y-2">
            <li v-for="category in helpCategories" :key="category.id">
              <button 
                @click="selectCategory(category.id)"
                :class="[
                  'w-full text-left px-4 py-2 rounded-md text-sm font-medium',
                  selectedCategory === category.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Need More Help?</h3>
          <p class="text-gray-600 text-sm mb-4">Can't find the answer you're looking for?</p>
          <router-link 
            to="/live-chat" 
            class="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Chat with Support
          </router-link>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-red-700">{{ error }}</p>
        </div>
        
        <div v-else>
          <!-- Category Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ currentCategory.name }}</h1>
            <p class="text-gray-600">{{ currentCategory.description }}</p>
          </div>
          
          <!-- Search Bar -->
          <div class="mb-8">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                v-model="searchQuery"
                type="text" 
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Search for help articles..." 
              >
            </div>
          </div>
          
          <!-- Topics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              v-for="(topic, index) in filteredTopics" 
              :key="index" 
              class="hover:shadow-lg transition-shadow cursor-pointer"
              @click="goToTopic(topic.path)"
            >
              <template #header>
                <h2 class="text-lg font-semibold">{{ topic.title }}</h2>
              </template>
              <p class="text-gray-600 text-sm mb-4">{{ topic.description }}</p>
              <div class="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                <span>Read more</span>
                <svg class="w-4 h-4 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </div>
            </Card>
          </div>
          
          <!-- Popular Topics -->
          <div v-if="popularTopics.length > 0" class="mt-12">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Popular Topics</h3>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <ul class="space-y-3">
                <li v-for="(topic, index) in popularTopics" :key="index">
                  <router-link 
                    :to="topic.path" 
                    class="flex items-center text-gray-700 hover:text-indigo-600"
                  >
                    <svg class="w-4 h-4 mr-2 text-indigo-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span>{{ topic.title }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/ui/Card.vue'
import { getAllHelpTopics } from '../services/helpService'

const router = useRouter()

// Help categories
const helpCategories = ref([
  {
    id: 'ordering',
    name: 'Ordering & Purchasing',
    description: 'Learn how to place orders, make payments, and track your deliveries'
  },
  {
    id: 'account',
    name: 'Account & Profile',
    description: 'Manage your account settings, profile information, and preferences'
  },
  {
    id: 'returns',
    name: 'Returns & Refunds',
    description: 'Understand our return policy and refund process'
  },
  {
    id: 'delivery',
    name: 'Delivery & Shipping',
    description: 'Information about delivery times, shipping options, and tracking'
  }
])

const selectedCategory = ref('ordering')
const searchQuery = ref('')
const allTopics = ref([])
const loading = ref(true)
const error = ref(null)

// Computed properties
const currentCategory = computed(() => {
  return helpCategories.value.find(cat => cat.id === selectedCategory.value) || helpCategories.value[0]
})

const filteredTopics = computed(() => {
  let topics = allTopics.value
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    topics = topics.filter(topic => 
      topic.title.toLowerCase().includes(query) || 
      topic.description.toLowerCase().includes(query)
    )
  }
  
  return topics
})

const popularTopics = computed(() => {
  // Return first 5 topics as popular
  return allTopics.value.slice(0, 5)
})

// Methods
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const goToTopic = (path) => {
  router.push(path)
}

// Fetch topics on mount
onMounted(async () => {
  try {
    const topicsObj = await getAllHelpTopics()
    // Convert object to array
    allTopics.value = Object.keys(topicsObj).map(key => ({
      id: key,
      ...topicsObj[key]
    }))
    loading.value = false
  } catch (err) {
    console.error('Failed to load help topics:', err)
    error.value = 'Failed to load help topics. Please try again later.'
    loading.value = false
  }
})
</script>