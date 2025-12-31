import { createRouter, createWebHistory } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: () => import('@/views/Home/HomePage.vue'),
    },
    {
      path: '/sign-in',
      name: APP_ROUTE_NAMES.SIGN_IN,
      component: () => import('@/views/auth/SignIn.vue'),
    },
    {
      path: '/sign-up',
      name: APP_ROUTE_NAMES.SIGN_UP,
      component: () => import('@/views/auth/SignUp.vue'),
    },
    {
      path: '/access-denied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: () => import('@/views/auth/AccessDenied.vue'),
    },
    {
      path: '/not-found',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: () => import('@/views/auth/NotFound.vue'),
    },
    {
      path: '/contact-us',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: () => import('@/views/Home/ContactUs.vue'),
    },
    {
      path: '/product-list',
      name: APP_ROUTE_NAMES.PRODUCT_LIST,
      component: () => import('@/views/Product/ProductList.vue'),
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-create',
      name: APP_ROUTE_NAMES.PRODUCT_CREATE,
      component: () => import('@/views/Product/ProductUpsert.vue'),
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-update/:id',
      name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
      component: () => import('@/views/Product/ProductUpsert.vue'),
      props: true,
      beforeEnter: [isAdmin],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: APP_ROUTE_NAMES.NOT_FOUND },
    },
  ],
  linkActiveClass: 'active',
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.initialized) await authStore.initializeAuth()
  next()
})

function isAdmin() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated)
    return authStore.isAdmin ? true : { name: APP_ROUTE_NAMES.ACCESS_DENIED }
  else return { name: APP_ROUTE_NAMES.SIGN_IN }
}

function isAuthenticated() {
  const authStore = useAuthStore()
  return authStore.isAuthenticated ? true : { name: APP_ROUTE_NAMES.SIGN_IN }
}

export default router
