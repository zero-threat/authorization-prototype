import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home';
import LogPage from './LogPage';
import CardEditPage from './CardEditPage';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: LogPage
  },
  {
    name: "edit",
    path: '/edit/:id',
    component: CardEditPage
  },
  {
    name: "create",
    path: '/create',
    component: CardEditPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
