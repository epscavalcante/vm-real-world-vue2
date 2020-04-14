<template>
  <div>
    <h1>Event list to {{ user.user.name }}</h1>
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
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.perPage = 3

    this.fetchEvents({
      perPage: this.perPage,
      page: this.page
    })
  },
  methods: mapActions('event', ['fetchEvents']),
  computed: {
    page() {
      // What page we're currently on
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user'])
  },
  components: {
    EventCard
  }
}
</script>

<style></style>
