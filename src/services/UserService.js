import Service from './Service'

export default {
  register(data) {
    return Service.post('/register', data)
  },

  login(data) {
    return Service.post('/login', data)
  }
}
