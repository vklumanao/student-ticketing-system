import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue' // <- use this AppLayout
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import CreateTicketView from '@/views/system/CreateTicketView.vue'
import TrackTicketView from '@/views/system/TrackTicketView.vue'
import AdminView from '@/views/system/AdminView.vue'

const routes = [
  // auth pages (no app layout) — optional: use separate AuthLayout if you have one
  { path: '/', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // pages wrapped by AppLayout
  {
    path: '/app',
    component: AppLayout,
    children: [
      { path: '/create-ticket', name: 'create-ticket', component: CreateTicketView },
      { path: '/track', name: 'track', component: TrackTicketView }, // search view at /app/track
      { path: '/track/:code', name: 'track-ticket', component: TrackTicketView, props: true }, // deep link
      { path: '/admin', name: 'admin', component: AdminView },
      { path: '', redirect: { name: 'create-ticket' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
