import axios from 'axios'
import UserService from '@/services/UserService'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  LOGIN(state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  },
  LOGOUT() {
    localStorage.removeItem('user')
    axios.defaults.headers.common['Authorization'] = null
  },
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  register({ commit }, credentials) {
    return UserService.register(credentials).then(({ data }) => {
      commit('SET_USER', data)
      commit('LOGIN', data)
    })
  },
  login({ commit }, credentials) {
    return UserService.login(credentials).then(({ data }) => {
      commit('SET_USER', data)
      commit('LOGIN', data)
    })
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('LOGOUT')
    location.reload()

    // return UserService.logout().then(() => commit('LOGOUT'))
  }
}

export const getters = {
  loggedIn(state) {
    console.log(state.user)
    return !!state.user
  }
}
