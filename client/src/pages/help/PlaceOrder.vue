<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else>
      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ topicData.title }}</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <p class="text-gray-600 mb-6">{{ topicData.description }}</p>
        
        <ol class="space-y-6">
          <li 
            v-for="step in topicData.steps" 
            :key="step.number" 
            class="flex"
          >
            <div class="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <span class="text-indigo-800 font-bold">{{ step.number }}</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.content }}</p>
            </div>
          </li>
        </ol>
      </div>
      
      <div class="bg-blue-50 rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Need More Help?</h3>
        <p class="text-gray-600 mb-4">If you're having trouble placing an order, our customer support team is ready to assist you.</p>
        <router-link to="/live-chat" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Chat with Support
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHelpTopic } from '../../services/helpService'

const topicData = ref({})
const loading = ref(true)

onMounted(async () => {
  try {
    // In a real application, we would fetch from the service
    // const data = await getHelpTopic('place-order')
    // topicData.value = data
    
    // For now, use static data
    topicData.value = {
      title: 'How to Place an Order',
      description: 'Learn how to browse products and place your first order.',
      steps: [
        {
          number: 1,
          title: 'Browse Products',
          content: 'Visit our products page to browse through our wide selection of food items. You can use the search bar or filter by category to find what you\'re looking for.'
        },
        {
          number: 2,
          title: 'Add to Cart',
          content: 'Click the "Add to Cart" button on any product you wish to purchase. You can adjust quantities in your cart before checkout.'
        },
        {
          number: 3,
          title: 'Proceed to Checkout',
          content: 'Click the cart icon in the top right corner and select "Checkout" to proceed with your order.'
        },
        {
          number: 4,
          title: 'Enter Shipping Information',
          content: 'Fill in your shipping address and contact details. Make sure all information is accurate to ensure timely delivery.'
        },
        {
          number: 5,
          title: 'Complete Payment',
          content: 'Review your order summary and select your preferred payment method to complete the purchase.'
        }
      ]
    }
    loading.value = false
  } catch (error) {
    console.error('Failed to load help topic:', error)
    // Fallback to static data
    topicData.value = {
      title: 'How to Place an Order',
      description: 'Learn how to browse products and place your first order.',
      steps: [
        {
          number: 1,
          title: 'Browse Products',
          content: 'Visit our products page to browse through our wide selection of food items. You can use the search bar or filter by category to find what you\'re looking for.'
        },
        {
          number: 2,
          title: 'Add to Cart',
          content: 'Click the "Add to Cart" button on any product you wish to purchase. You can adjust quantities in your cart before checkout.'
        },
        {
          number: 3,
          title: 'Proceed to Checkout',
          content: 'Click the cart icon in the top right corner and select "Checkout" to proceed with your order.'
        },
        {
          number: 4,
          title: 'Enter Shipping Information',
          content: 'Fill in your shipping address and contact details. Make sure all information is accurate to ensure timely delivery.'
        },
        {
          number: 5,
          title: 'Complete Payment',
          content: 'Review your order summary and select your preferred payment method to complete the purchase.'
        }
      ]
    }
    loading.value = false
  }
})
</script>