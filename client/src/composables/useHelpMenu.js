import { ref, onMounted } from 'vue'
import { getHelpMenuItems } from '../services/helpService'

// Composable to manage help menu state
export function useHelpMenu() {
  const helpMenuItems = ref([])
  const loading = ref(true)
  const error = ref(null)

  // Fetch help menu items
  const fetchHelpMenuItems = async () => {
    try {
      loading.value = true
      error.value = null
      
      // In a real application, this would fetch from an API
      const items = await getHelpMenuItems()
      helpMenuItems.value = items
    } catch (err) {
      error.value = 'Failed to load help menu items'
      console.error('Error fetching help menu items:', err)
      
      // Fallback to default items
      helpMenuItems.value = [
        { label: 'Place an order', path: '/help/place-order' },
        { label: 'Payment options', path: '/help/payment-options' },
        { label: 'Track an order', path: '/help/track-order' },
        { label: 'Cancel an order', path: '/help/cancel-order' },
        { label: 'Returns & Refunds', path: '/help/returns-refunds' },
        { isDivider: true },
        { label: 'Live Chat', path: '/live-chat' }
      ]
    } finally {
      loading.value = false
    }
  }

  // Initialize the composable
  onMounted(() => {
    fetchHelpMenuItems()
  })

  return {
    helpMenuItems,
    loading,
    error,
    fetchHelpMenuItems
  }
}