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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ topicData.title }}</h1>
              <p class="text-gray-600">{{ topicData.description }}</p>
            </div>
          </div>
          
          <div class="prose max-w-none">
            <div v-html="topicData.content" class="mb-8"></div>
            
            <!-- Tracking Steps -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">How to Track Your Order</h2>
              
              <div class="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Order Status Explained</h3>
                <div class="space-y-4">
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Order Placed</h4>
                      <p class="text-gray-600 text-sm">Your order has been successfully placed and is being processed.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Processing</h4>
                      <p class="text-gray-600 text-sm">We are preparing your order for shipment.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Shipped</h4>
                      <p class="text-gray-600 text-sm">Your order has been shipped and is on its way to you.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Out for Delivery</h4>
                      <p class="text-gray-600 text-sm">Your order is out for delivery and will arrive soon.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">Delivered</h4>
                      <p class="text-gray-600 text-sm">Your order has been successfully delivered.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Track via Account</h3>
                  <ol class="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Sign in to your account</li>
                    <li>Go to "My Orders" section</li>
                    <li>Select the order you want to track</li>
                    <li>View real-time status updates</li>
                  </ol>
                  <router-link 
                    to="/orders" 
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View My Orders
                  </router-link>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Track via Order Number</h3>
                  <ol class="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Find your order confirmation email</li>
                    <li>Copy your order number</li>
                    <li>Enter it in the tracking form below</li>
                    <li>View delivery status</li>
                  </ol>
                  <div class="mt-4">
                    <label for="orderNumber" class="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                    <div class="flex">
                      <input 
                        type="text" 
                        id="orderNumber" 
                        placeholder="Enter your order number" 
                        class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                      <button class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700">
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Delivery Timeline -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Delivery Timeline</h2>
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex justify-between mb-4">
                  <div class="text-center">
                    <div class="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-900">Order Placed</p>
                    <p class="text-xs text-gray-500">Today</p>
                  </div>
                  
                  <div class="flex-1 relative">
                    <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -z-10"></div>
                    <div class="absolute top-1/2 left-0 w-1/2 h-0.5 bg-indigo-600 -z-10"></div>
                  </div>
                  
                  <div class="text-center">
                    <div class="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-900">Processing</p>
                    <p class="text-xs text-gray-500">1-2 days</p>
                  </div>
                  
                  <div class="flex-1 relative">
                    <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                  </div>
                  
                  <div class="text-center">
                    <div class="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-900">Shipped</p>
                    <p class="text-xs text-gray-500">2-3 days</p>
                  </div>
                  
                  <div class="flex-1 relative">
                    <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                  </div>
                  
                  <div class="text-center">
                    <div class="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-900">Delivered</p>
                    <p class="text-xs text-gray-500">3-5 days</p>
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
                      If your order status hasn't updated for more than 48 hours, please contact our support team.
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
                      Once an order has been shipped, delivery address changes are not possible. 
                      Please contact our support team immediately for assistance.
                    </p>
                  </div>
                </div>
                
                <div class="border border-gray-200 rounded-lg">
                  <button 
                    @click="toggleFaq(2)"
                    class="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span class="font-medium text-gray-900">What should I do if I'm not home when delivery arrives?</span>
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
                      If you're not home when delivery arrives, our delivery partner will attempt to 
                      contact you via phone or leave a notice. You can reschedule delivery or arrange 
                      for pickup at our nearest facility. For security reasons, we do not leave packages 
                      unattended.
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
                to="/help/payment-options" 
                class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <svg class="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2zm8 0V7a4 4 0 00-8 0v2h8z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Payment Options</span>
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