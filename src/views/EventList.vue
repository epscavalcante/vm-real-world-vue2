<template>
  <div>
    <h1>Event list</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'events.list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'events.list', query: { page: page + 1 } }"
    >Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'

function getEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getEvents(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.eventsPerPage
    },
    ...mapState(['event'])
  },
  components: {
    EventCard
  }
}
</script>

<style></style>
