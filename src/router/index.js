import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../assets/about.vue'
import ErrorPage from '../assets/error.vue'
import menyu from '../assets/menyu.vue' 
import stol from '../assets/stol.vue'
import AdminPanel from '../assets/AdminPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menyu',
    name: 'Menyu',
    component: menyu
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: () => import('../assets/Menu.vue')
  },
  {
    path: '/menyu/:id',
    name: 'Meal',
    component: () => import('../pages/menyu/id.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ErrorPage
  },
  {
    path: '/stol',
    name: 'Stol',
    component: () => import('../assets/stol.vue')
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router