<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <button @click="deleteNotification(this.notification)">
      <BaseIcon name="x"></BaseIcon>
    </button>
    <p>{{ notification.text }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.timeout = setTimeout(
      () => this.deleteNotification(this.notification),
      2000
    )
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  methods: mapActions('notification', ['deleteNotification']),
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  display: flex;
  align-items: center;
}

.notification-bar button {
  margin: 0 10px;
  background-color: lightgray;
  background: lightgray;
  color: red;
}
</style>
