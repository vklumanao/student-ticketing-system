import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/system/HomeView.vue'
import CreateTicketView from '@/views/system/CreateTicketView.vue'
import TrackTicketView from '@/views/system/TrackTicketView.vue'
import AdminView from '@/views/system/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/create-ticket',
      component: CreateTicketView,
    },
    {
      path: '/track/:code',
      component: TrackTicketView,
      props: true,
    },
    {
      path: '/admin',
      component: AdminView,
    },
  ],
})

export default router
