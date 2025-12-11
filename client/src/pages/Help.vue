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
    
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-12 text-white text-center">
      <h1 class="text-4xl font-bold mb-4">How can we help you?</h1>
      <p class="text-xl mb-6">Find answers to your questions or contact our support team</p>
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="Search for help articles..." 
            @keyup.enter="performSearch"
          >
          <button 
            @click="performSearch"
            class="absolute right-2.5 bottom-2.5 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    
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
          
          <!-- Featured Topics -->
          <div v-if="featuredTopics.length > 0" class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                v-for="(topic, index) in featuredTopics" 
                :key="index" 
                class="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                @click="goToTopic(topic.path)"
              >
                <template #header>
                  <div class="flex items-center mb-2">
                    <div class="bg-indigo-100 p-2 rounded-lg mr-3">
                      <svg v-if="topic.icon" class="w-5 h-5 text-indigo-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <svg v-else class="w-5 h-5 text-indigo-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.3 4.1a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4-1.4l1.9-1.9-1.9-1.9a1 1 0 0 1 0-1.4Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.7 15.9a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 1.4l-1.9 1.9 1.9 1.9a1 1 0 0 1 0 1.4Z"/>
                      </svg>
                    </div>
                    <h2 class="text-lg font-semibold">{{ topic.title }}</h2>
                  </div>
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
          </div>
          
          <!-- All Topics -->
          <div v-if="filteredTopics.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul class="divide-y divide-gray-200">
                <li 
                  v-for="(topic, index) in filteredTopics" 
                  :key="index"
                  class="hover:bg-gray-50 cursor-pointer"
                  @click="goToTopic(topic.path)"
                >
                  <div class="p-4 flex items-center">
                    <div class="bg-gray-100 p-2 rounded-lg mr-4">
                      <svg v-if="topic.icon" class="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <svg v-else class="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.3 4.1a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4-1.4l1.9-1.9-1.9-1.9a1 1 0 0 1 0-1.4Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.7 15.9a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 1.4l-1.9 1.9 1.9 1.9a1 1 0 0 1 0 1.4Z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-lg font-medium text-gray-900">{{ topic.title }}</h3>
                      <p class="text-gray-600 text-sm">{{ topic.description }}</p>
                    </div>
                    <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- No Results -->
          <div v-else-if="searchQuery" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
            <p class="mt-1 text-gray-500">Try different keywords or browse our categories.</p>
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
import { getAllHelpTopics, getHelpCategories } from '../services/helpService'

const router = useRouter()

// State
const helpCategories = ref([])
const selectedCategory = ref('ordering')
const searchQuery = ref('')
const allTopics = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch categories and topics on mount
onMounted(async () => {
  try {
    // Fetch categories
    const categories = await getHelpCategories()
    helpCategories.value = categories.map(category => ({
      id: category.slug,
      name: category.name,
      description: category.description
    }))
    
    // Set default selected category
    if (categories.length > 0) {
      selectedCategory.value = categories[0].slug
    }
    
    // Fetch topics
    const topicsObj = await getAllHelpTopics()
    // Convert object to array and add is_featured property
    allTopics.value = Object.keys(topicsObj).map(key => ({
      id: key,
      ...topicsObj[key],
      is_featured: ['place-order', 'payment-options', 'track-order', 'returns-refunds'].includes(key)
    }))
    
    loading.value = false
  } catch (err) {
    console.error('Failed to load help data:', err)
    error.value = 'Failed to load help content. Please try again later.'
    loading.value = false
  }
})

// Computed properties
const currentCategory = computed(() => {
  return helpCategories.value.find(cat => cat.id === selectedCategory.value) || helpCategories.value[0]
})

const filteredTopics = computed(() => {
  let topics = allTopics.value
  
  // Filter by category
  topics = topics.filter(topic => {
    // Map topic category to our category slugs
    const categoryMap = {
      'Ordering & Purchasing': 'ordering-purchasing',
      'Account & Profile': 'account-profile',
      'Returns & Refunds': 'returns-refunds',
      'Delivery & Shipping': 'delivery-shipping'
    }
    
    const topicCategorySlug = categoryMap[topic.category] || topic.category
    return topicCategorySlug === selectedCategory.value
  })
  
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

const featuredTopics = computed(() => {
  // Return featured topics (first 4)
  return allTopics.value.filter(topic => topic.is_featured).slice(0, 4)
})

// Methods
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  searchQuery.value = '' // Clear search when changing category
}

const goToTopic = (path) => {
  router.push(path)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'HelpSearch',
      query: { q: searchQuery.value.trim() }
    })
  }
}
</script>