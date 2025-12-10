import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/Stores/auth";

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

// Import layouts
import MainLayout from "../components/ui/MainLayout.vue";
import AdminLayout from "../components/ui/AdminLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", redirect: "/products" },
      { path: "products", component: Products },
      { path: 'products/:id', component: ProductDetails },
      { path: "cart", component: Cart },
      { path: "checkout", component: Checkout, meta: { requiresAuth: true } },
      { path: "orders", component: Orders, meta: { requiresAuth: true } },
      { path: "login", component: Login },
      { path: "register", component: Register },
    ]
  },
  
  // Admin routes (protected)
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: "", component: AdminDashboard },
      { path: "products", component: AdminProducts },
      { path: "orders", component: AdminOrders },
    ]
  },
  
  {
    path: "/403",
    name: "forbidden",
    component: ForbiddenPage,
  },
  
  // Catch-all route
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/products' 
  }
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