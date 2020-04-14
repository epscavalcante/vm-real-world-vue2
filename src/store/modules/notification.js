export const namespaced = true

let id = 1

export const state = {
  notifications: []
}

export const mutations = {
  PUSH_NOTIFICATION(state, notiication) {
    state.notifications.push({
      ...notiication,
      id: id++
    })
  },
  DELETE_NOTIFICATION(state, notificationToRemove) {
    state.notifications = state.notifications.filter(notification => {
      notification.id !== notificationToRemove.id
    })
  }
}

export const actions = {
  createNotification({ commit }, notiication) {
    commit('PUSH_NOTIFICATION', notiication)
  },

  deleteNotification({ commit }, notiication) {
    commit('DELETE_NOTIFICATION', notiication)
  }
}
