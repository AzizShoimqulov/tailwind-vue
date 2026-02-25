import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { Icon } from '@iconify/vue'
import i18n from './i18n'
import router from './router'
import About from './assets/about.vue'
import * as firebase from './firebase'

const app = createApp(App)

app.config.globalProperties.$firebase = firebase.default || firebase
app.config.globalProperties.$db = firebase.db
app.config.globalProperties.$auth = firebase.auth
app.config.globalProperties.$storage = firebase.storage
app.config.globalProperties.$rtdb = firebase.rtdb

app.use(i18n)
app.use(router)
app.component('Icon', Icon)
app.mount('#app')
