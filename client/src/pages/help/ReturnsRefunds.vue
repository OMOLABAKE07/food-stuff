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
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Returns & Refunds</span>
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
          <h2 class="text-xl font-bold text-gray-900 mb-4">Returns & Refunds</h2>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/help/returns-refunds" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 block"
              >
                Returns & Refunds Policy
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
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-700">
                    <strong>Note:</strong> All returns must be initiated within 7 days of delivery. 
                    Items must be in their original packaging and condition.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Eligibility -->
            <div class="mb-12">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Eligibility for Returns</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in topicData.eligibility" 
                  :key="index"
                  class="flex items-start p-4 bg-green-50 rounded-lg"
                >
                  <svg class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ item }}</span>
                </div>
              </div>
            </div>
            
            <!-- Non-returnable items -->
            <div class="mb-12">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Non-Returnable Items</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in topicData.nonReturnable" 
                  :key="index"
                  class="flex items-start p-4 bg-red-50 rounded-lg"
                >
                  <svg class="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ item }}</span>
                </div>
              </div>
            </div>
            
            <!-- Return Process -->
            <div class="mb-12">
              <h3 class="text-xl font-medium text-gray-900 mb-6">Return Process</h3>
              <ol class="space-y-8">
                <li 
                  v-for="step in topicData.process" 
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
            
            <!-- Refund Information -->
            <div class="mb-12">
              <h3 class="text-xl font-medium text-gray-900 mb-6">Refund Information</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Refund Time
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="(info, index) in topicData.refundInfo" 
                      :key="index"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ info.method }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ info.time }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                  <span class="font-medium text-gray-900">Who pays for return shipping?</span>
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
                    Return shipping costs are covered by us if the return is due to our error 
                    (wrong item sent, damaged item, etc.). For other returns, the customer is 
                    responsible for return shipping costs.
                  </p>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg">
                <button 
                  @click="toggleFaq(1)"
                  class="flex justify-between items-center w-full p-4 text-left"
                >
                  <span class="font-medium text-gray-900">Can I exchange an item instead of returning it?</span>
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
                    Yes, you can exchange an item for a different size or color. 
                    Please initiate a return for the original item and place a new order 
                    for the item you'd like to exchange it with.
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
    const data = await getHelpTopic('returns-refunds')
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