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
        <li class="inline-flex items-center">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <router-link to="/help" class="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2">
              Help Center
            </router-link>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Search Results</span>
          </div>
        </li>
      </ol>
    </nav>
    
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
        <p class="text-gray-600">Results for "{{ searchTerm }}"</p>
      </div>
      
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-700">{{ error }}</p>
      </div>
      
      <div v-else>
        <!-- Topics Results -->
        <div v-if="results.topics && results.topics.length > 0" class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Topics ({{ results.topics.length }})</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              v-for="topic in results.topics" 
              :key="topic.id" 
              class="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
              @click="goToTopic(topic.slug)"
            >
              <template #header>
                <div class="flex items-center mb-2">
                  <div class="bg-indigo-100 p-2 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-indigo-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
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
        
        <!-- Articles Results -->
        <div v-if="results.articles && results.articles.length > 0">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Articles ({{ results.articles.length }})</h2>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul class="divide-y divide-gray-200">
              <li 
                v-for="article in results.articles" 
                :key="article.id"
                class="hover:bg-gray-50 cursor-pointer"
                @click="goToArticle(article.topic.slug, article.id)"
              >
                <div class="p-4">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">{{ article.title }}</h3>
                  <p class="text-gray-600 text-sm mb-2">{{ article.topic.title }}</p>
                  <div class="text-gray-500 text-sm" v-html="truncateContent(article.content, 150)"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- No Results -->
        <div v-if="(!results.topics || results.topics.length === 0) && (!results.articles || results.articles.length === 0)" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">No results found</h3>
          <p class="mt-1 text-gray-500">Try different keywords or browse our help center.</p>
          <div class="mt-6">
            <router-link 
              to="/help" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Help Center
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '../../components/ui/Card.vue'
import { searchHelpArticles } from '../../services/helpService'

const route = useRoute()
const router = useRouter()

const searchTerm = ref('')
const results = ref({ topics: [], articles: [] })
const loading = ref(true)
const error = ref(null)

// Truncate content and strip HTML tags
const truncateContent = (content, length) => {
  if (!content) return ''
  
  // Strip HTML tags
  const stripped = content.replace(/<[^>]*>/g, '')
  
  // Truncate
  if (stripped.length <= length) return stripped
  return stripped.substring(0, length) + '...'
}

const goToTopic = (slug) => {
  router.push(`/help/${slug}`)
}

const goToArticle = (topicSlug, articleId) => {
  // In a real implementation, you might want to scroll to the specific article
  router.push(`/help/${topicSlug}`)
}

onMounted(async () => {
  searchTerm.value = route.query.q || ''
  
  if (!searchTerm.value) {
    router.push('/help')
    return
  }
  
  try {
    const data = await searchHelpArticles(searchTerm.value)
    results.value = data
    loading.value = false
  } catch (err) {
    console.error('Failed to search help articles:', err)
    error.value = 'Failed to load search results. Please try again later.'
    loading.value = false
  }
})
</script>