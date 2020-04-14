<template>
  <div>
    <h1>Ooops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>

    <router-link :to="{ name: 'events.list' }">List events</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'page'
    }
  }
}
</script>

<style lang="scss" scoped></style>
