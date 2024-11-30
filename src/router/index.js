import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomeView.vue'
import HealthCheck from '@/components/HealthCheck.vue'
import DashboardView from '@/components/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/health',
    name: 'health',
    component: HealthCheck
  },
  {
    path: '/dashboards',
    name: 'dashboards',
    component: DashboardView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
