const state = {
  count: 4
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    if (state.count >= 1)
      state.count--
  }
}

export default {
  state,
  mutations
}
