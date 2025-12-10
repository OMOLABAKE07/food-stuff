import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../Stores/auth";

// Import pages
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Products from "../pages/Products.vue";
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Orders from "../pages/Orders.vue";
import AdminDashboard from "../pages/admin/Dashboard.vue";
import AdminProducts from "../pages/admin/Products.vue";
import AdminOrders from "../pages/admin/Orders.vue";
import ForbiddenPage from "../components/Forbidden/ForbiddenPage.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", component: Products },
  { path: '/products/:id', component: ProductDetails },
  
  // Customer routes (protected)
  { path: "/cart", component: Cart, meta: { requiresAuth: true } },
  { path: "/checkout", component: Checkout, meta: { requiresAuth: true } },
  { path: "/orders", component: Orders, meta: { requiresAuth: true } },
  
  // Admin routes (protected)
  {
    path: "/",
    component: AdminDashboard,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/admin/products",
    component: AdminProducts,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/orders",
    component: AdminOrders,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/403",
    name: "forbidden",
    component: ForbiddenPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuth();
  const isAuthenticated = !!authStore.user;
  const isAdmin = isAuthenticated && authStore.user?.is_admin;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    if (to.path !== "/login") return next("/login");
  }
  
  if (to.meta.requiresAdmin && !isAdmin) {
    if (to.path !== "/403") return next("/403");
  }
  
  next();
});

export default router;