import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/events',
    name: 'events.list',
    component: EventList
  },
  {
    path: '/events/create',
    name: 'events.create',
    component: () => import('../views/EventCreate.vue')
  },
  {
    path: '/events/:id',
    name: 'events.show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      // Nprogress.start()
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        // Nprogress.done()
        routeTo.params.event = event
        next()
      })
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
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
