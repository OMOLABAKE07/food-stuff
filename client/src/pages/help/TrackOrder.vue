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
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Track an Order</span>
          </div>
        </li>
      </ol>
    </nav>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-else-if="topicData" class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <div class="lg:w-1/4">
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Ordering & Purchasing</h2>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/help/place-order" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 block"
              >
                Place an Order
              </router-link>
            </li>
            <li>
              <router-link 
                to="/help/payment-options" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 block"
              >
                Payment Options
              </router-link>
            </li>
            <li>
              <router-link 
                to="/help/track-order" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 block"
              >
                Track an Order
              </router-link>
            </li>
            <li>
              <router-link 
                to="/help/cancel-order" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 block"
              >
                Cancel an Order
              </router-link>
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
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ topicData.title }}</h1>
          
          <div class="prose max-w-none">
            <p class="text-gray-600 mb-8">{{ topicData.description }}</p>
            
            <!-- Order tracking simulation -->
            <div class="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Track Your Order</h3>
              <div class="flex">
                <input 
                  type="text" 
                  placeholder="Enter your order number" 
                  class="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                <button class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700">
                  Track
                </button>
              </div>
              <p class="mt-2 text-sm text-gray-500">Enter your order number to track your shipment status.</p>
            </div>
            
            <!-- Order status timeline -->
            <div class="mb-12">
              <h3 class="text-lg font-medium text-gray-900 mb-6">Order Status Timeline</h3>
              <div class="relative">
                <!-- Vertical line -->
                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <!-- Status items -->
                <div 
                  v-for="(status, index) in topicData.statuses" 
                  :key="index"
                  class="relative pl-12 pb-8"
                >
                  <!-- Status dot -->
                  <div 
                    class="absolute left-2 top-1 w-4 h-4 rounded-full border-4 border-white"
                    :class="`bg-${status.color}-500`"
                  ></div>
                  
                  <!-- Status content -->
                  <div>
                    <h4 class="font-medium text-gray-900">{{ status.title }}</h4>
                    <p class="text-gray-600 mt-1">{{ status.description }}</p>
                    <p class="text-sm text-gray-500 mt-2">Estimated: 2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Steps -->
            <ol class="space-y-8">
              <li 
                v-for="step in topicData.steps" 
                :key="step.number" 
                class="flex"
              >
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span class="text-indigo-800 font-bold">{{ step.number }}</span>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">{{ step.title }}</h3>
                  <p class="text-gray-600">{{ step.content }}</p>
                </div>
              </li>
            </ol>
          </div>
          
          <!-- FAQ section -->
          <div class="mt-12">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg">
                <button 
                  @click="toggleFaq(0)"
                  class="flex justify-between items-center w-full p-4 text-left"
                >
                  <span class="font-medium text-gray-900">Why is my order status not updating?</span>
                  <svg 
                    class="h-5 w-5 text-gray-500 transform transition-transform" 
                    :class="{ 'rotate-180': openFaqs[0] }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-show="openFaqs[0]" class="p-4 pt-0 border-t border-gray-200">
                  <p class="text-gray-600">
                    Order status updates may take up to 24 hours to reflect in our system. 
                    If your order status hasn't updated after 48 hours, please contact our support team with your order number.
                  </p>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg">
                <button 
                  @click="toggleFaq(1)"
                  class="flex justify-between items-center w-full p-4 text-left"
                >
                  <span class="font-medium text-gray-900">Can I change the delivery address after placing an order?</span>
                  <svg 
                    class="h-5 w-5 text-gray-500 transform transition-transform" 
                    :class="{ 'rotate-180': openFaqs[1] }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-show="openFaqs[1]" class="p-4 pt-0 border-t border-gray-200">
                  <p class="text-gray-600">
                    You can change the delivery address only if your order is still in the "Processing" status. 
                    Once an order has been shipped, the delivery address cannot be changed. 
                    Please contact our support team immediately for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Feedback section -->
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Was this helpful?</h3>
            <div class="flex items-center space-x-4">
              <button 
                @click="rateHelpful(true)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg class="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Yes
              </button>
              <button 
                @click="rateHelpful(false)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg class="h-5 w-5 text-red-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
      <p class="text-yellow-700">Help content not available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getHelpTopic } from '../../services/helpService'

const topicData = ref(null)
const loading = ref(true)
const error = ref(null)
const openFaqs = reactive([false, false])

const toggleFaq = (index) => {
  openFaqs[index] = !openFaqs[index]
}

const rateHelpful = (isHelpful) => {
  // In a real application, this would send feedback to the backend
  console.log('User rated article as helpful:', isHelpful)
  
  // Show confirmation
  alert(isHelpful 
    ? 'Thank you for your feedback!' 
    : 'Thank you for your feedback! We\'ll work to improve this article.')
}

onMounted(async () => {
  try {
    const data = await getHelpTopic('track-order')
    if (data) {
      topicData.value = data
    } else {
      error.value = 'Help content not found.'
    }
    loading.value = false
  } catch (err) {
    console.error('Failed to load help topic:', err)
    error.value = 'Failed to load help content. Please try again later.'
    loading.value = false
  }
})
</script>