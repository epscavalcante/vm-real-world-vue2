<template>
  <div>
    <h1>Enter your account</h1>
    <form @submit.prevent="login">
      <BaseInput v-model="email" type="text" name="email" label="Email:" class="field" />
      <BaseInput v-model="password" type="password" name="password" label="Password" class="field" />
      <BaseButton type="submit" buttonClass="-fill-gradient">LogIn</BaseButton>
      <p>
        <router-link to="/register">Don't have an account? Register.</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      NProgress.start()
      this.$store
        .dispatch('user/login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({
            name: 'events.list'
          })
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => NProgress.done())
    }
  }
}
</script>

<style>
.field {
  margin-bottom: 24px;
}
</style>
