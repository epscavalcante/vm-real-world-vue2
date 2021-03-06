import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'events.list',
    component: EventList,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/events/create',
    name: 'events.create',
    meta: { requiresAuth: true },
    component: () => import('../views/EventCreate.vue')
  },
  {
    path: '/events/:id',
    name: 'events.show',
    meta: { requiresAuth: true },
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status === 404)
            next({ name: 'notfound', params: { resource: 'event' } })
          else next({ name: 'network', params: { resource: 'event' } })
        })
    }
  },
  {
    path: '/errors/not-found',
    name: 'notfound',
    component: () => import('../views/NotFound.vue'),
    props: true
  },
  {
    path: '/errors/network-issue',
    name: 'network',
    component: () => import('../views/NetworkIssue.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'notfound'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('user')
  if (routeTo.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
