import { createApp } from 'vue'
import App from './App.vue'
import TOdo from './todolist.vue'
import './assets/index.css'
import { Icon } from "@iconify/vue";

createApp(App).component(Icon).mount('#app')
