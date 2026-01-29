import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Menyu from '../assets/menyu.vue'
import About from '../assets/about.vue'
import ErrorPage from '../assets/error.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menyu', name: 'Menyu', component: Menyu },
  { path: '/about', name: 'About', component: About },
  // catch-all 404 route
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
