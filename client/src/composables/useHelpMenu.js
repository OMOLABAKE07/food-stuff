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
      
      const items = await getHelpMenuItems()
      helpMenuItems.value = items
    } catch (err) {
      error.value = 'Failed to load help menu items'
      console.error('Error fetching help menu items:', err)
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