<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="(topic, index) in helpTopics" 
        :key="index" 
        class="hover:shadow-lg transition-shadow"
      >
        <template #header>
          <h2 class="text-xl font-semibold">{{ topic.title }}</h2>
        </template>
        <p class="text-gray-600 mb-4">{{ topic.description }}</p>
        <router-link 
          :to="topic.path" 
          class="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {{ topic.action }} →
        </router-link>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/ui/Card.vue'
import { getAllHelpTopics } from '../services/helpService'

const helpTopics = ref([])
const loading = ref(true)

// Map help topics to card format
const mapTopicsToCards = (topics) => {
  return [
    {
      title: 'Place an order',
      description: 'Learn how to browse products and place your first order.',
      path: '/help/place-order',
      action: 'View guide'
    },
    {
      title: 'Payment options',
      description: 'Discover all the payment methods we support.',
      path: '/help/payment-options',
      action: 'View options'
    },
    {
      title: 'Track an order',
      description: 'Find out how to track your order status and delivery.',
      path: '/help/track-order',
      action: 'Track now'
    },
    {
      title: 'Cancel an order',
      description: 'Learn how to cancel your order before it ships.',
      path: '/help/cancel-order',
      action: 'Learn more'
    },
    {
      title: 'Returns & Refunds',
      description: 'Understand our return policy and refund process.',
      path: '/help/returns-refunds',
      action: 'Read policy'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our customer support team in real-time.',
      path: '/live-chat',
      action: 'Start chat'
    }
  ]
}

onMounted(async () => {
  try {
    // In a real application, we would fetch from the service
    // const topics = await getAllHelpTopics()
    // helpTopics.value = mapTopicsToCards(topics)
    
    // For now, use static mapping
    helpTopics.value = mapTopicsToCards()
    loading.value = false
  } catch (error) {
    console.error('Failed to load help topics:', error)
    // Fallback to static data
    helpTopics.value = mapTopicsToCards()
    loading.value = false
  }
})
</script>