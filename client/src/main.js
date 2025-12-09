import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router/index.js'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8004';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const app = createApp(App);

app.use(router)
app.use(createPinia())

app.mount('#app')