import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { Icon } from '@iconify/vue'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.component('Icon', Icon)
app.mount('#app')
