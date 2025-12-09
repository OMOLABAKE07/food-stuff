import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router/index.js'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(router)
app.use(createPinia())

app.mount('#app')