
import _ from 'underscore'

export const getProducts = (state) => {
  return state.products.all
}

export const getCompletedProducts = (state) => {
  return _.filter(state.products.all, (product) => {
      return product.done
  })
}

export const getActiveProducts = (state) => {
  return _.filter(state.products.all, (product) => {
      return !product.done
  })
}
