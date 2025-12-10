import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/ui/MainLayout.vue'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Orders from '../pages/Orders.vue'
import Help from '../pages/Help.vue'
import PlaceOrder from '../pages/help/PlaceOrder.vue'
import PaymentOptions from '../pages/help/PaymentOptions.vue'
import TrackOrder from '../pages/help/TrackOrder.vue'
import CancelOrder from '../pages/help/CancelOrder.vue'
import ReturnsRefunds from '../pages/help/ReturnsRefunds.vue'
import LiveChat from '../pages/LiveChat.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import AdminLogin from '../pages/admin/AdminLogin.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import AdminProducts from '../pages/admin/AdminProducts.vue'
import AdminOrders from '../pages/admin/AdminOrders.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'products', component: Products },
      { path: 'products/:id', component: ProductDetails, props: true },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout },
      { path: 'orders', component: Orders },
      { path: 'help', component: Help },
      { path: 'help/place-order', component: PlaceOrder },
      { path: 'help/payment-options', component: PaymentOptions },
      { path: 'help/track-order', component: TrackOrder },
      { path: 'help/cancel-order', component: CancelOrder },
      { path: 'help/returns-refunds', component: ReturnsRefunds },
      { path: 'live-chat', component: LiveChat },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  {
    path: '/admin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/products',
    component: AdminProducts
  },
  {
    path: '/admin/orders',
    component: AdminOrders
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router