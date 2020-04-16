<template>
  <div id="app">
    <Navbar />
    <NotificationContainer />
    <div>
      <router-view :key="$route.fullPath" class="page" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  components: {
    Navbar,
    NotificationContainer
  }
}
</script>

<style>
@import './assets/style.scss';
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
