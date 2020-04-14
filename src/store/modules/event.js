import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
  eventsPerPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.eventsPerPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        dispatch(
          'notification/createNotification',
          {
            type: 'error',
            text: 'There was an error in fecth events. ' + error.message
          },
          { root: true }
        )
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  },
  createEvent({ commit, dispatch }, event) {
    return EventService.createEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        dispatch(
          'notification/createNotification',
          {
            type: 'success',
            text: 'Your event has been created!'
          },
          { root: true }
        )
      })
      .catch(error => {
        dispatch(
          'notification/createNotification',
          {
            type: 'error',
            text: 'There was an problem create an event ' + error.message
          },
          { root: true }
        )
        throw error
      })
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
