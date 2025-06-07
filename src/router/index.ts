import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import HomePage from '@/views/HomePage.vue'
import TrackingPage from '@/views/TrackingPage.vue'
import AddTrack from '@/views/AddTrack.vue'
import GetQuote from '@/views/GetQuote.vue'
import About from '@/views/About.vue'
import ShipmentPage from '@/views/ShipmentPage.vue'
import FraudAwareness from '@/views/FraudAwareness.vue'
import LegalNotice from '@/views/LegalNotice.vue'
import TermsOfUse from '@/views/TermsOfUse.vue'
import Privacy from '@/views/Privacy.vue'
import Support from '@/views/Support.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/quote',
      name: 'quote',
      component: GetQuote
    },
    
    {
      path: '/shipment',
      name: 'shipment',
      component: ShipmentPage
    },
    
    {
      path: '/legal-notice',
      name: 'legal-notice',
      component: LegalNotice
    },
    
    {
      path: '/fraud-awareness',
      name: 'fraud-awareness',
      component: FraudAwareness
    },
    {
      path: '/terms',
      name: 'terms-of-use',
      component: TermsOfUse
    },
    
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    

    {
      path: '/about',
      name: 'about',
      component: About
    },

    { path: '/track/:trackingNumber', name: 'Track', component: TrackingPage },
    {
      path: '/addshipment',
      name: 'AddTrack',
      component: AddTrack,
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
