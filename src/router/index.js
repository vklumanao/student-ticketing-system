import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTicketView from '@/views/CreateTicketView.vue'
import TrackTicketView from '@/views/TrackTicketView.vue'
import AdminView from '@/views/AdminView.vue'

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
