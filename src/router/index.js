import { createRouter, createWebHistory } from 'vue-router'
import CreateTicketView from '@/views/system/CreateTicketView.vue'
import TrackTicketView from '@/views/system/TrackTicketView.vue'
import AdminView from '@/views/system/AdminView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/create-ticket',
      name: 'create-ticket',
      component: CreateTicketView,
    },
    {
      path: '/track/:code',
      name: 'track-ticket',
      component: TrackTicketView,
      props: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
  ],
})

export default router
