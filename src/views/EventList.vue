<template>
  <div>
    <h1>Event list</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '../services/EventService'

export default {
  created() {
    EventService.getEvents().then(response => (this.events = response.data))
  },
  data() {
    return {
      events: []
    }
  },
  components: {
    EventCard
  }
}
</script>

<style></style>
