import { createRouter, createWebHistory } from 'vue-router'
import DorfromantikView from '@/views/DorfromantikView.vue'
import WingspanView from '@/views/WingspanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dorfromantik',
      component: DorfromantikView,
    },
    {
      path: '/fluegelschlag',
      name: 'fluegelschlag',
      component: WingspanView,
    },
  ],
})

export default router
