<template>
  <div id="nav">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="brand">VueJs Example</router-link>
      <nav>
        <router-link :to="{ name: 'home' }">Home</router-link>|
        <router-link :to="{ name: 'events.list' }">Events</router-link>|
        <router-link :to="{ name: 'events.create' }">Logout</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#nav {
  width: 100%;
  background: linear-gradient(to right, #16c0b0, #84cf6a);

  .container {
    min-height: 50px;
    margin: 0 auto;
    max-width: 650px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .brand {
      font-size: 1.5em;
    }

    &.nav-welcome {
      // margin-left: auto;
      // margin-right: 1rem;
      color: white;
    }
    a {
      font-weight: bold;
      color: #2c3e50;
      margin: auto 0.8em auto 0.4em;
      text-decoration: none;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
    }
    .router-link-exact-active {
      color: white;
      border-bottom: 2px solid #fff;
    }
  }
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;
  &.router-link-active {
    color: #2c3e50;
  }
}
.logoutButton {
  cursor: pointer;
}
.nav-welcome + button {
  margin-left: 0;
}
</style>
