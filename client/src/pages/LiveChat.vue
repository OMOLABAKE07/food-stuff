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
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Live Chat</span>
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
            <li>
              <router-link 
                to="/help/returns-refunds" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 block"
              >
                Returns & Refunds
              </router-link>
            </li>
            <li>
              <router-link 
                to="/live-chat" 
                class="w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 block"
              >
                Live Chat
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">Phone</p>
                <p class="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">Email</p>
                <p class="text-sm text-gray-600">support@foodstuff.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">Office</p>
                <p class="text-sm text-gray-600">123 Food Street, Culinary City, FC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="lg:w-3/4">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Live Chat</h1>
            <div class="flex items-center">
              <div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span class="text-sm font-medium text-green-700">Online</span>
            </div>
          </div>
          
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  <strong>Operating Hours:</strong> Monday - Friday: 8:00 AM - 8:00 PM, Saturday - Sunday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
          
          <!-- Chat Container -->
          <div class="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[500px]">
            <!-- Chat Header -->
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-indigo-800 font-bold">S</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">Support Agent</p>
                  <p class="text-xs text-gray-500">Typically replies in a few minutes</p>
                </div>
              </div>
            </div>
            
            <!-- Chat Messages -->
            <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div class="space-y-4">
                <!-- System Message -->
                <div class="text-center">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                    Today, 10:30 AM
                  </span>
                </div>
                
                <!-- Agent Message -->
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span class="text-indigo-800 font-bold text-xs">S</span>
                  </div>
                  <div class="bg-white rounded-lg p-4 max-w-xs md:max-w-md">
                    <p class="text-gray-800">Hello! Welcome to FoodStuff customer support. How can I help you today?</p>
                    <p class="text-xs text-gray-500 mt-1">10:30 AM</p>
                  </div>
                </div>
                
                <!-- User Message -->
                <div class="flex justify-end">
                  <div class="bg-indigo-500 rounded-lg p-4 max-w-xs md:max-w-md text-white">
                    <p>Hi there! I have a question about my recent order.</p>
                    <p class="text-xs text-indigo-200 mt-1">10:31 AM</p>
                  </div>
                </div>
                
                <!-- Agent Message -->
                <div class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span class="text-indigo-800 font-bold text-xs">S</span>
                  </div>
                  <div class="bg-white rounded-lg p-4 max-w-xs md:max-w-md">
                    <p class="text-gray-800">Sure, I'd be happy to help. Could you please provide your order number?</p>
                    <p class="text-xs text-gray-500 mt-1">10:32 AM</p>
                  </div>
                </div>
                
                <!-- Typing Indicator -->
                <div v-if="isAgentTyping" class="flex">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span class="text-indigo-800 font-bold text-xs">S</span>
                  </div>
                  <div class="bg-white rounded-lg p-4 max-w-xs md:max-w-md">
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Chat Input -->
            <div class="border-t border-gray-200 p-4 bg-white">
              <div class="flex">
                <input 
                  v-model="newMessage"
                  type="text" 
                  placeholder="Type your message here..." 
                  class="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                  @keyup.enter="sendMessage"
                >
                <button 
                  @click="sendMessage"
                  class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 disabled:opacity-50"
                  :disabled="!newMessage.trim()"
                >
                  Send
                </button>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                Press Enter to send
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                @click="quickAction('order_status')"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="h-8 w-8 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Order Status</span>
              </button>
              <button 
                @click="quickAction('return_request')"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="h-8 w-8 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Return Request</span>
              </button>
              <button 
                @click="quickAction('payment_issue')"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="h-8 w-8 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Payment Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const newMessage = ref('')
const isAgentTyping = ref(false)
const chatContainer = ref(null)

// Scroll to bottom of chat container
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Send message
const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  // Add user message to chat (in a real app, this would be sent to backend)
  console.log('Sending message:', newMessage.value)
  
  // Clear input
  newMessage.value = ''
  
  // Show typing indicator
  isAgentTyping.value = true
  
  // Simulate agent response after delay
  setTimeout(() => {
    isAgentTyping.value = false
    scrollToBottom()
  }, 2000)
  
  scrollToBottom()
}

const quickAction = (action) => {
  let message = ''
  switch(action) {
    case 'order_status':
      message = 'I would like to check the status of my order.'
      break
    case 'return_request':
      message = 'I would like to initiate a return request.'
      break
    case 'payment_issue':
      message = 'I am having an issue with my payment.'
      break
    default:
      message = 'I need help with my account.'
  }
  
  newMessage.value = message
  sendMessage()
}

// Scroll to bottom when component mounts
onMounted(() => {
  scrollToBottom()
})
</script>