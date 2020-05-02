const store = new Vuex.Store({
  state: {
    count: {{ .Site.Params }}
  },
  mutations: {
    increment (state) {
      // state.count
    }
  }
})
