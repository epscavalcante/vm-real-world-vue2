import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'

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
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
