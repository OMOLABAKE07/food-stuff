<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div v-if="product.main_image" class="bg-gray-200 w-full h-48 overflow-hidden">
      <img :src="product.main_image" :alt="product.name" class="w-full h-full object-cover">
    </div>
    <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
      <span class="text-gray-500">No image</span>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-1 truncate">
        <router-link :to="`/products/${product.id}`" class="hover:text-indigo-600">
          {{ product.name }}
        </router-link>
      </h3>
      <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      
      <div class="flex items-center justify-between mt-3">
        <span class="text-lg font-bold text-green-600">₦{{ formatPrice(product.price) }}</span>
        <Button 
          @click="$emit('add-to-cart', product)"
          variant="default"
          size="sm"
          class="transition-colors hover:bg-indigo-700 text-white"
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG').format(price)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>