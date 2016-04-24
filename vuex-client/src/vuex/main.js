import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

import products from './modules/Products'
import base from './modules/Base'

export default new Vuex.Store({
  modules : {
    products,
    base
  }
})
