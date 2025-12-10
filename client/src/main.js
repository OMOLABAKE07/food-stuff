import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router/index.js'
import { useAuth } from './Stores/auth'

const app = createApp(App);

app.use(router)
app.use(createPinia())

// Initialize auth state
const authStore = useAuth()
authStore.init()

app.mount('#app')