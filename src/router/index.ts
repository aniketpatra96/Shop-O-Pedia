import HomePage from '@/views/Home/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import AccessDenied from '@/views/auth/AccessDenied.vue'
import NotFound from '@/views/auth/NotFound.vue'
import ContactUs from '@/views/Home/ContactUs.vue'
import ProductList from '@/views/Product/ProductList.vue'
import ProductUpsert from '@/views/Product/ProductUpsert.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: HomePage,
    },
    {
      path: '/sign-in',
      name: APP_ROUTE_NAMES.SIGN_IN,
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: APP_ROUTE_NAMES.SIGN_UP,
      component: SignUp,
    },
    {
      path: '/access-denied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/not-found',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/contact-us',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/product-list',
      name: APP_ROUTE_NAMES.PRODUCT_LIST,
      component: ProductList,
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-create',
      name: APP_ROUTE_NAMES.PRODUCT_CREATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-update/:id',
      name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
      component: ProductUpsert,
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
