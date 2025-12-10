<template>
  <div class="container mx-auto px-4 py-8">
    <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Help Center
    </router-link>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Live Chat Support</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="flex items-center mb-6">
        <div class="flex-shrink-0">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        </div>
        <div class="ml-4">
          <h2 class="text-xl font-medium text-gray-900">Chat with our Support Team</h2>
          <p class="text-gray-600">We're online and ready to help you with any questions or concerns.</p>
        </div>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="flex items-center text-sm text-gray-500 mb-2">
          <div class="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
          <span>Support Agent Online</span>
        </div>
        <p class="text-gray-600">Typically responds in a few minutes</p>
      </div>
      
      <div class="space-y-4 mb-6">
        <div class="flex justify-end">
          <div class="bg-indigo-100 rounded-lg p-4 max-w-xs md:max-w-md">
            <p class="text-gray-800">Hello! How can I help you today?</p>
            <p class="text-xs text-gray-500 mt-1">10:00 AM</p>
          </div>
        </div>
        
        <div class="flex justify-start">
          <div class="bg-gray-100 rounded-lg p-4 max-w-xs md:max-w-md">
            <p class="text-gray-800">Hi, I have a question about my order #12345.</p>
            <p class="text-xs text-gray-500 mt-1">10:01 AM</p>
          </div>
        </div>
      </div>
      
      <div class="flex">
        <input 
          type="text" 
          placeholder="Type your message here..." 
          class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Send
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Contact Information</h3>
        </template>
        <div class="space-y-3">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span class="text-gray-600">+1 (555) 123-4567</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span class="text-gray-600">support@foodstuff.com</span>
          </div>
        </div>
      </Card>
      
      <Card>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Business Hours</h3>
        </template>
        <div class="space-y-2 text-gray-600">
          <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
          <p>Saturday: 9:00 AM - 6:00 PM</p>
          <p>Sunday: 10:00 AM - 4:00 PM</p>
        </div>
      </Card>
      
      <Card>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">FAQ</h3>
        </template>
        <p class="text-gray-600 mb-4">Check our FAQ section for quick answers to common questions.</p>
        <router-link to="/help" class="text-indigo-600 hover:text-indigo-800 font-medium">
          Visit FAQ →
        </router-link>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '../components/ui/Card.vue'
</script>