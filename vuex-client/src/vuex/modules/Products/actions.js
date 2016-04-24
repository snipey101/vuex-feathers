import _ from 'underscore'
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')
const app = feathers().configure(socketio(socket))
const service = app.service('tasks')

export const completeProduct = ({dispatch, state}, product) => {
  let newProduct = _.clone(product)
  newProduct.done = true
  service.update(product._id, newProduct).then(result => {
  })
}

export const activeProduct = ({dispatch, state}, product) => {
  let newProduct = _.clone(product)
  newProduct.done = false
  service.update(product._id, newProduct).then(result => {
  })
}

export const addProduct = ({dispatch, state}, product) => {
  service.create(product).then(result => {
 })
}

export const removeProduct = ({dispatch, state}, product) => {
  service.remove(product._id, product).then(result => {
 })
}

export const editProduct = ({dispatch, state}, index, callback) => {
  dispatch('EDIT_PRODUCT', index)

  if (callback && typeof callback == 'function') {
    callback.call()
  }
}

export const cancelEditProduct = ({dispatch, state}, index) => {
  dispatch('CANCEL_EDIT_PRODUCT', index)
}

export const cancelEditProductAll = ({dispatch, state}) => {
  dispatch('CANCEL_EDIT_PRODUCT_ALL')
}

export const updateProduct = ({dispatch, state}, product, name) => {
  let newProduct = _.clone(product)
  newProduct.name = name
  newProduct.editing = false
  service.update(product._id, newProduct).then(result => {
  })
}

export const loadProductFromServer = ({dispatch, state}) => {

  service.find({}).then(result => {
    dispatch('LOAD_PRODUCTS', result.data)
  })

  service.on('created', function(result) {
    dispatch('ADD_PRODUCT', result)
  });

  service.on('removed', function(result) {
    dispatch('REMOVE_PRODUCT', result)
  })

  service.on('updated', function(result) {
    // if (result.done) {
    //   dispatch('PRODUCT_STATUS', result, result.done)
    // }

    if (result.name) {
      dispatch('UPDATE_PRODUCT', result)
    }
  })

}
