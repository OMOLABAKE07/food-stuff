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
    
    <div class="flex flex-col lg:flex-row gap-8">
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
                Returns & Refunds
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
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-red-700">{{ error }}</p>
        </div>
        
        <div v-else-if="topicData" class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center mb-6">
            <div class="bg-indigo-100 p-3 rounded-lg mr-4">
              <svg class="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ topicData.title }}</h1>
              <p class="text-gray-600">{{ topicData.description }}</p>
            </div>
          </div>
          
          <div class="prose max-w-none">
            <div v-html="topicData.content" class="mb-8"></div>
            
            <!-- Return Policy -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Return Policy</h2>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-blue-700">
                      <strong>Policy:</strong> We offer a 30-day return period for most items. Items must be 
                      in new, unused condition with all original packaging.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Eligible for Return</h3>
                  <ul class="list-disc list-inside space-y-2 text-gray-600">
                    <li>Items received damaged or defective</li>
                    <li>Items not as described</li>
                    <li>Wrong item delivered</li>
                    <li>Unopened items within 30 days</li>
                  </ul>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Not Eligible for Return</h3>
                  <ul class="list-disc list-inside space-y-2 text-gray-600">
                    <li>Perishable goods (fresh produce, dairy)</li>
                    <li>Opened personal care items</li>
                    <li>Digital downloads or services</li>
                    <li>Custom or personalized items</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- How to Return -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">How to Return an Item</h2>
              
              <div class="space-y-6">
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                    <span class="text-indigo-800 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Contact Customer Service</h3>
                    <p class="text-gray-600">Reach out to our support team to initiate your return request.</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                    <span class="text-indigo-800 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Receive Return Authorization</h3>
                    <p class="text-gray-600">You'll receive a Return Merchandise Authorization (RMA) number and instructions.</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                    <span class="text-indigo-800 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Package Your Item</h3>
                    <p class="text-gray-600">Securely package your item with all original packaging and accessories.</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                    <span class="text-indigo-800 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Ship the Package</h3>
                    <p class="text-gray-600">Drop off your package at the designated carrier location or schedule a pickup.</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                    <span class="text-indigo-800 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Receive Refund</h3>
                    <p class="text-gray-600">Once we receive and inspect your return, we'll process your refund.</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <router-link 
                  to="/live-chat" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Contact Support
                </router-link>
              </div>
            </div>
            
            <!-- Refund Information -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Refund Information</h2>
              
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Refund Timeline</h3>
                <div class="space-y-4">
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Return Processing</h4>
                      <p class="text-gray-600 text-sm">3-5 business days for initial inspection</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Refund Approval</h4>
                      <p class="text-gray-600 text-sm">1-2 business days after inspection</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Refund Completion</h4>
                      <p class="text-gray-600 text-sm">3-7 business days depending on payment method</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p class="text-sm text-blue-700">
                    <strong>Note:</strong> Refunds will be processed to the original payment method used for the purchase.
                  </p>
                </div>
              </div>
              
              <div class="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                      <strong>Important:</strong> Original shipping fees are non-refundable unless the return 
                      is due to our error (damaged, defective, or wrong item).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- FAQ Section -->
            <div class="mt-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
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
                      Customers are responsible for return shipping costs unless the return is due to our 
                      error (received damaged, defective, or wrong item). In such cases, we will reimburse 
                      the return shipping cost.
                    </p>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg">
                  <button 
                    @click="toggleFaq(1)"
                    class="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span class="font-medium text-gray-900">How do I track my return?</span>
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
                      Once your return package is shipped, you'll receive a tracking number via email. 
                      You can use this number to track your return on the carrier's website.
                    </p>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg">
                  <button 
                    @click="toggleFaq(2)"
                    class="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span class="font-medium text-gray-900">What happens if my return is rejected?</span>
                    <svg 
                      class="h-5 w-5 text-gray-500 transform transition-transform" 
                      :class="{ 'rotate-180': openFaqs[2] }"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <div v-show="openFaqs[2]" class="p-4 pt-0 border-t border-gray-200">
                    <p class="text-gray-600">
                      If your return is rejected due to not meeting our return policy requirements, 
                      we'll notify you via email explaining the reason. The item will be shipped back 
                      to you, and you'll be responsible for the return shipping cost.
                    </p>
                  </div>
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
          
          <!-- Related articles -->
          <div class="mt-12">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Related Articles</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <router-link 
                to="/help/cancel-order" 
                class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <svg class="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Cancel an Order</span>
              </router-link>
              <router-link 
                to="/help/track-order" 
                class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <svg class="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Track an Order</span>
              </router-link>
            </div>
          </div>
        </div>
        
        <div v-else class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p class="text-yellow-700">Help content not available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getHelpTopic } from '../../services/helpService'

const topicData = ref(null)
const loading = ref(true)
const error = ref(null)
const openFaqs = reactive([false, false, false])

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