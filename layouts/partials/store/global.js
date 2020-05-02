const store = new Vuex.Store({
  state: {
    count: 5
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
