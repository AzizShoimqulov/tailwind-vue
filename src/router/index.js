import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import menyu from '../assets/menyu.vue'
import Menu from '../assets/Menu.vue'
import About from '../assets/about.vue'
import ErrorPage from '../assets/error.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Menu', name: 'Menu', component: () => import('../assets/Menu.vue') },
  { path: '/menyu', name: 'Menyu', component: menyu },
  { path: '/menyu/:id', name: 'Meal', component: () => import('../pages/menyu/[id].vue'), props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
