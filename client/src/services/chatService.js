import api from './api'

/**
 * Get chat messages for the current user
 * @returns {Promise<Array>}
 */
export const getChatMessages = async () => {
  try {
    const response = await api.get('/chat/messages')
    return response.data
  } catch (error) {
    console.error('Error fetching chat messages:', error)
    throw error
  }
}

/**
 * Send a new message
 * @param {string} message - The message to send
 * @returns {Promise<Object>}
 */
export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat/send', { message })
    return response.data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

/**
 * Mark messages as read
 * @returns {Promise<Object>}
 */
export const markMessagesAsRead = async () => {
  try {
    const response = await api.post('/chat/mark-as-read')
    return response.data
  } catch (error) {
    console.error('Error marking messages as read:', error)
    throw error
  }
}

export default {
  getChatMessages,
  sendMessage,
  markMessagesAsRead
}