import _ from 'underscore'

export const LOAD_PRODUCTS = (state, products) => {
  state.all = products
};

export const ADD_PRODUCT = (state, product) => {
  state.all.push(product)
};

export const EDIT_PRODUCT = (state, index) => {
  state.all[index].editing = true
};

export const CANCEL_EDIT_PRODUCT = (state, index) => {
  state.all[index].editing = false
};

export const CANCEL_EDIT_PRODUCT_ALL = (state) => {
  _.forEach(state.all, (product)=>{
    product.editing = false
  })
};

export const UPDATE_PRODUCT = (state, product, name) => {
  _.find(state.all, function(prod){
    if (product._id === prod._id) {
      prod.name = product.name
      prod.done = product.done
      prod.editing = false
    }
  })
};

export const REMOVE_PRODUCT = (state, product) => {
  state.all = _.reject(state.all, function(prod){
    return product._id === prod._id
  })
};

export const PRODUCT_STATUS = (state, product, status) => {
  _.find(state.all, function(prod){
    if (product._id === prod._id) {
      prod.done = status
    }
  })
};
