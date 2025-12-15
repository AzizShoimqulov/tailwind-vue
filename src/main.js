import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { Icon } from '@iconify/vue'

const app = createApp(App)
// register Icon component globally as 'Icon'
app.component('Icon', Icon)
app.mount('#app')
