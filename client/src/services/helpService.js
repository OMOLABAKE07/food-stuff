import api from './api'

/**
 * Get help menu items
 * @returns {Promise<Array>}
 */
export const getHelpMenu = async () => {
  try {
    const response = await api.get('/help/menu')
    return response.data
  } catch (error) {
    console.error('Error fetching help menu:', error)
    throw error
  }
}

/**
 * Get all help topics
 * @returns {Promise<Object>}
 */
export const getAllHelpTopics = async () => {
  try {
    const response = await api.get('/help/topics')
    return response.data
  } catch (error) {
    console.error('Error fetching help topics:', error)
    throw error
  }
}

/**
 * Get help categories with topics
 * @returns {Promise<Array>}
 */
export const getHelpCategories = async () => {
  try {
    const response = await api.get('/help/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching help categories:', error)
    throw error
  }
}

/**
 * Get specific help topic with articles
 * @param {string} topicSlug - The slug of the topic to fetch
 * @returns {Promise<Object>}
 */
export const getHelpTopic = async (topicSlug) => {
  try {
    const response = await api.get(`/help/topics/${topicSlug}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching help topic ${topicSlug}:`, error)
    throw error
  }
}

/**
 * Search help articles
 * @param {string} query - The search query
 * @returns {Promise<Array>}
 */
export const searchHelpArticles = async (query) => {
  try {
    const response = await api.get('/help/search', {
      params: { q: query }
    })
    return response.data
  } catch (error) {
    console.error('Error searching help articles:', error)
    throw error
  }
}

/**
 * Submit feedback for a help article
 * @param {Object} feedbackData - The feedback data
 * @returns {Promise<Object>}
 */
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/help/feedback', feedbackData)
    return response.data
  } catch (error) {
    console.error('Error submitting feedback:', error)
    throw error
  }
}

/**
 * Get popular help topics
 * @returns {Promise<Array>}
 */
export const getPopularTopics = async () => {
  try {
    // For now, we'll get all topics and sort by popularity
    // In a real implementation, this would be a separate endpoint
    const response = await api.get('/help/topics')
    const topics = Object.values(response.data)
    // Sort by some popularity metric (in a real app, this would be based on views/ratings)
    return topics.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  } catch (error) {
    console.error('Error fetching popular topics:', error)
    throw error
  }
}