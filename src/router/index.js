import { createWebHistory, createRouter } from 'vue-router'
import UserLogin from '../pages/auth/user/userLogin.vue'
import adminLogin from '../pages/auth/admin/adminLogin.vue'
import Dashboard from '../pages/dashboard.vue'
import Home from '../pages/home.vue'



const routes = [
  { path: '/', component: Dashboard , beforeEnter: [authRequired],},
  { path: '/user/login', component: UserLogin },
  { path: '/admin/login', component: adminLogin },
  { path: '/dashboard', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
function authRequired(to, from, next) {
  if (localStorage.getItem('authToken')) {
    next()
  } else {
    next('/dashboard')
  }
}

export default router