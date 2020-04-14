<template>
  <div>
    <h1>Create an event</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        placeholder="Add an event new category"
        :options="categories"
        class="field"
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        label="New title"
        v-model="event.title"
        type="text"
        placeholder="Add an event new title"
        class="field"
      />

      <BaseInput
        label="New description"
        v-model="event.description"
        type="text"
        placeholder="Add an event new desription"
        class="field"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        label="New Location"
        v-model="event.location"
        type="text"
        placeholder="Add an event new location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        v-model="event.time"
        label="Select a time"
        placeholder="Add an event new time"
        :options="times"
        class="field"
      />

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times
    }
  },
  computed: mapState(['categories']),
  methods: {
    // ...mapActions('event', ['createEvent']),
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },

    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'events.show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {})
        .finally(() => NProgress.done())
    }
  },
  components: {
    Datepicker,

    BaseInput
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
