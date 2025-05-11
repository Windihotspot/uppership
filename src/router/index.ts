import { createRouter, createWebHistory } from 'vue-router'
import VerifiedEmail from '@/views/VerifiiedEmail.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Wallet from '@/views/Wallet.vue'
import Settings from '@/views/Settings.vue'
import Analysis from '@/views/Analysis.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import HomeView from '@/views/HomePage.vue'
import HomePage from '@/views/HomePage.vue'
import TrackingPage from '@/views/TrackingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/verified',
      name: 'verified',
      component: VerifiedEmail
    },

    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: Analysis
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/statement-analysis/:id',
      name: 'StatementAnalysis',
      component: () => import('@/views/StatementAnalysis.vue'),
      props: true
    },
    
    { path: '/track/:trackingNumber', name: 'Track', component: TrackingPage }
    
  ]
})

export default router
