<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="register">
      <BaseInput v-model="name" type="text" name="name" label="Name" class="field" />
      <BaseInput v-model="email" type="text" name="email" label="Email:" class="field" />
      <BaseInput v-model="password" type="password" name="password" label="Password" class="field" />
      <BaseButton type="submit" buttonClass="-fill-gradient">Create account</BaseButton>
      <p>
        <router-link to="/login">Already have an account? Login.</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      NProgress.start()
      this.$store
        .dispatch('user/register', {
          name: this.email,
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
