<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
    
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-green-600">₦{{ product.price }}</span>
        <Button 
          @click="$emit('add-to-cart', product)"
          variant="default"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from './ui/Button.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>