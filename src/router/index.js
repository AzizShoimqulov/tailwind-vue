import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Menyu from '../assets/menyu.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menyu', name: 'Menyu', component: Menyu },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
