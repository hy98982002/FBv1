import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/course/:id',
      name: 'CourseDetails',
      component: () => import('../views/CourseDetails.vue')
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: () => import('../views/ShoppingCart.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order/:id?',
      name: 'Order',
      component: () => import('../views/Order.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'PersonalCenter',
      component: () => import('../views/PersonalCenter.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// 全局前置守卫，处理需要登录的路由
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 如果需要登录且用户未登录，重定向到登录页
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 在实际项目中，这里应该重定向到登录页，并携带回调地址
    // 但由于我们要支持F12虚拟登录，所以这里直接放行
    console.log('需要登录才能访问此页面，但由于支持F12虚拟登录，所以放行')
    next()
  } else {
    next()
  }
})

export default router
