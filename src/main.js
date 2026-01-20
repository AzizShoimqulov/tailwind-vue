import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { Icon } from '@iconify/vue'
import i18n from './i18n'
import router from './router'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.component('Icon', Icon)
app.mount('#app')
