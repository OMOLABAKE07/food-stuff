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
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Payment Options</span>
          </div>
        </li>
      </ol>
    </nav>
    
    <div class="flex flex-col lg:flex-row gap-8">
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
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 block"
              >
                Payment Options
              </router-link>
            </li>
            <li>
              <router-link 
                to="/help/track-order" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 block"
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ topicData.title }}</h1>
              <p class="text-gray-600">{{ topicData.description }}</p>
            </div>
          </div>
          
          <div class="prose max-w-none">
            <div v-html="topicData.content" class="mb-8"></div>
            
            <!-- Payment Methods -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Available Payment Methods</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-center mb-4">
                    <div class="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-medium text-gray-900">Credit/Debit Cards</h3>
                  </div>
                  <p class="text-gray-600 mb-4">Pay with Visa, Mastercard, or other major credit/debit cards. All transactions are secured with SSL encryption.</p>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">Visa</div>
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">Mastercard</div>
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">American Express</div>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-center mb-4">
                    <div class="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-medium text-gray-900">Bank Transfer</h3>
                  </div>
                  <p class="text-gray-600 mb-4">Transfer directly from your bank account. Instructions will be provided during checkout.</p>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">All Major Banks</div>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-center mb-4">
                    <div class="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-medium text-gray-900">Mobile Money</h3>
                  </div>
                  <p class="text-gray-600 mb-4">Pay using your mobile money wallet. Supported providers include MTN Mobile Money and Airtel Money.</p>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">MTN Mobile Money</div>
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">Airtel Money</div>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-center mb-4">
                    <div class="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-medium text-gray-900">Cash on Delivery</h3>
                  </div>
                  <p class="text-gray-600 mb-4">Pay in cash when your order is delivered. Available for select locations only.</p>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-gray-100 px-3 py-1 rounded text-sm">Major Cities</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Security Info -->
            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-green-700">
                    <strong>Security:</strong> All payment transactions are encrypted and securely processed. We do not store your payment information.
                  </p>
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
                    <span class="font-medium text-gray-900">Is my payment information secure?</span>
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
                      Yes, all payment transactions are encrypted using industry-standard SSL technology. 
                      We do not store your payment information on our servers. All payment processing is 
                      handled by trusted third-party payment processors.
                    </p>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg">
                  <button 
                    @click="toggleFaq(1)"
                    class="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span class="font-medium text-gray-900">What should I do if my payment fails?</span>
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
                      If your payment fails, first check that your payment information is correct and 
                      that you have sufficient funds. If the issue persists, try a different payment method 
                      or contact our support team for assistance.
                    </p>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg">
                  <button 
                    @click="toggleFaq(2)"
                    class="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span class="font-medium text-gray-900">Can I change my payment method after placing an order?</span>
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
                      You can change your payment method only if your order is still in the "Processing" status. 
                      Once an order has been confirmed, payment method changes are not possible. 
                      Please contact our support team for assistance.
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
                to="/help/place-order" 
                class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <svg class="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Place an Order</span>
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
import toastr from '../../utils/toastr'

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
  
  // Show confirmation with Toastr
  if (isHelpful) {
    toastr.success('Thank you for your feedback!')
  } else {
    toastr.info('Thank you for your feedback! We\'ll work to improve this article.')
  }
}

onMounted(async () => {
  try {
    const data = await getHelpTopic('payment-options')
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