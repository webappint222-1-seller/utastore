import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Team from '../views/Team.vue'
import NotFound from '../views/NotFound.vue'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import BillPage from '../views/BillPage.vue'
import accountPage from '../views/accountPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/registerpage',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/billpage',
    name: 'BillPage',
    component: BillPage
  },
  {
    path: '/accountpage',
    name: 'accpuntPage',
    component: accountPage
  },
  {
    path: '/:catchNotMatchPath(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router