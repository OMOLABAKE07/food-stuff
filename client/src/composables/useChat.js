import { ref, onMounted, onUnmounted } from 'vue'
import { getChatMessages, sendMessage, markMessagesAsRead } from '../services/chatService'

// Composable to manage chat functionality
export function useChat() {
  const messages = ref([])
  const loading = ref(false)
  const error = ref(null)
  const newMessage = ref('')
  const isAgentTyping = ref(false)
  
  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      loading.value = true
      error.value = null
      
      const chatMessages = await getChatMessages()
      messages.value = chatMessages
      
      // Mark messages as read
      await markMessagesAsRead()
    } catch (err) {
      error.value = 'Failed to load chat messages'
      console.error('Error fetching chat messages:', err)
    } finally {
      loading.value = false
    }
  }
  
  // Send a new message
  const sendNewMessage = async () => {
    if (!newMessage.value.trim()) return
    
    try {
      const messageText = newMessage.value.trim()
      newMessage.value = ''
      
      // Add temporary message to UI immediately
      const tempMessage = {
        id: Date.now(),
        message: messageText,
        sender_type: 'user',
        created_at: new Date().toISOString(),
        is_temporary: true
      }
      
      messages.value.push(tempMessage)
      
      // Show typing indicator
      isAgentTyping.value = true
      
      // Send message to backend
      const response = await sendMessage(messageText)
      
      // Remove temporary message and add real message
      messages.value = messages.value.filter(msg => !msg.is_temporary)
      messages.value.push(response)
      
      // Simulate agent response delay
      setTimeout(() => {
        isAgentTyping.value = false
        fetchMessages() // Refresh to get agent's response
      }, 2000)
      
    } catch (err) {
      error.value = 'Failed to send message'
      console.error('Error sending message:', err)
      
      // Remove temporary message on error
      messages.value = messages.value.filter(msg => !msg.is_temporary)
    }
  }
  
  // Initialize the composable
  onMounted(() => {
    fetchMessages()
  })
  
  return {
    messages,
    loading,
    error,
    newMessage,
    isAgentTyping,
    fetchMessages,
    sendNewMessage
  }
}