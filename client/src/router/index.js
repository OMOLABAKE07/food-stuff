import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Orders from '../pages/Orders.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Help from '../pages/Help.vue'
import HelpSearch from '../pages/help/SearchResults.vue'
import PlaceOrder from '../pages/help/PlaceOrder.vue'
import PaymentOptions from '../pages/help/PaymentOptions.vue'
import TrackOrder from '../pages/help/TrackOrder.vue'
import CancelOrder from '../pages/help/CancelOrder.vue'
import ReturnsRefunds from '../pages/help/ReturnsRefunds.vue'
import LiveChat from '../pages/LiveChat.vue'
import MainLayout from '../components/ui/MainLayout.vue'
import { useAuth } from '../Stores/auth'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: '/products', name: 'Products', component: Products },
      { path: '/products/:id', name: 'ProductDetails', component: ProductDetails, props: true },
      { path: '/cart', name: 'Cart', component: Cart },
      { path: '/checkout', name: 'Checkout', component: Checkout },
      { path: '/orders', name: 'Orders', component: Orders },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
      { path: '/help', name: 'Help', component: Help },
      { path: '/help/search', name: 'HelpSearch', component: HelpSearch },
      { path: '/help/place-order', name: 'PlaceOrder', component: PlaceOrder },
      { path: '/help/payment-options', name: 'PaymentOptions', component: PaymentOptions },
      { path: '/help/track-order', name: 'TrackOrder', component: TrackOrder },
      { path: '/help/cancel-order', name: 'CancelOrder', component: CancelOrder },
      { path: '/help/returns-refunds', name: 'ReturnsRefunds', component: ReturnsRefunds },
      { path: '/live-chat', name: 'LiveChat', component: LiveChat }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  // Define routes that require authentication
  const protectedRoutes = ['/checkout', '/orders']
  
  // Check if the route requires authentication
  if (protectedRoutes.includes(to.path)) {
    const authStore = useAuth()
    
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      // Redirect to login page with return url
      next({ 
        path: '/login', 
        query: { redirect: to.fullPath } 
      })
      return
    }
  }
  
  // Allow navigation to proceed
  next()
})

export default router