import helpMenuConfig from '../config/helpMenu';
import api from './api';

// Help service to manage help menu items and content dynamically

// Function to get help menu items
export function getHelpMenuItems() {
  return api.get('/help/menu')
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch help menu items:', error);
      // Fallback to static data
      return [
        { label: 'Place an order', path: '/help/place-order' },
        { label: 'Payment options', path: '/help/payment-options' },
        { label: 'Track an order', path: '/help/track-order' },
        { label: 'Cancel an order', path: '/help/cancel-order' },
        { label: 'Returns & Refunds', path: '/help/returns-refunds' },
        { isDivider: true },
        { label: 'Live Chat', path: '/live-chat' }
      ];
    });
}

// Function to get help topic content
export function getHelpTopic(topicId) {
  return api.get(`/help/topics/${topicId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch help topic ${topicId}:`, error);
      // Return null if topic not found
      return null;
    });
}

// Function to get all help topics
export function getAllHelpTopics() {
  return api.get('/help/topics')
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch help topics:', error);
      // Fallback to static data
      return {
        'place-order': {
          title: 'Place an order',
          description: 'Learn how to browse products and place your first order.',
          path: '/help/place-order',
          action: 'View guide'
        },
        'payment-options': {
          title: 'Payment options',
          description: 'Discover all the payment methods we support.',
          path: '/help/payment-options',
          action: 'View options'
        },
        'track-order': {
          title: 'Track an order',
          description: 'Find out how to track your order status and delivery.',
          path: '/help/track-order',
          action: 'Track now'
        },
        'cancel-order': {
          title: 'Cancel an order',
          description: 'Learn how to cancel your order before it ships.',
          path: '/help/cancel-order',
          action: 'Learn more'
        },
        'returns-refunds': {
          title: 'Returns & Refunds',
          description: 'Understand our return policy and refund process.',
          path: '/help/returns-refunds',
          action: 'Read policy'
        },
        'live-chat': {
          title: 'Live Chat',
          description: 'Chat with our customer support team in real-time.',
          path: '/live-chat',
          action: 'Start chat'
        }
      };
    });
}

// Function to update help menu configuration (for admin use)
export function updateHelpMenuConfig(newConfig) {
  // In a real application, this would make an API call to update the configuration
  console.log('Updating help menu configuration:', newConfig);
  return Promise.resolve({ success: true });
}

export default {
  getHelpMenuItems,
  getHelpTopic,
  getAllHelpTopics,
  updateHelpMenuConfig
};