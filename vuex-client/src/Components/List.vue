<style>

.item.done .product {
  text-decoration: line-through !important;
}
</style>
<template>

  <div>
    <div class="ui fluid vertical menu">
      <div class="item active" v-show="getProducts.length">
        <div class="ui input fluid">
          <input v-model="search" placeholder="Search.."/>
        </div>
      </div>

      <div :class="classIsDone(product)" v-for="product in getProducts | filterBy search in 'name'">
        <div class="ui middle aligned grid equal columns">
          <div class="column twelve wide">
            <span v-show="!product.editing" @click="editSingleProduct(product, $index)" class="product">{{product.name}}</span>
            <div v-show="product.editing" class="ui input field">
              <input v-el:product_field v-model="selected_product_name" @keyup.escape="cancelEditProduct($index)" @keyup.enter="updateSingleProduct(product)"/>
            </div>
            <button v-show="product.editing" class="circular ui button basic tiny" @click="cancelEditProduct(product)">Cancel</button>

          </div>

          <div class="column three wide center aligned">
            <button class="circular ui button fluid tiny" v-show="product.done" @click="activeProduct(product)">Set As Active</button>
            <button class="circular ui button fluid tiny" v-show="!product.done" @click="completeProduct(product)">Set As Complete</button>
          </div>

          <div class="column one wide right right aligned">
            <button class="circular ui icon button tiny red basic" @click="removeProduct(product)">
              <i class="ui icon minus"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="item right aligned ">
        <adder></adder>
      </div>
    </div>
  </div>
</template>

<script>
  import adder from './Adder.vue'

  import  {
    activeProduct,
    completeProduct,
    removeProduct,
    editProduct,
    cancelEditProduct,
    cancelEditProductAll,
    updateProduct
  } from '../vuex/Modules/Products/actions.js'

  import {
    getProducts
  } from '../vuex/Modules/Products/getters.js'

  export default {

    components : {
      adder
    },

    data () {
      return {
        search : '',
        selected_product_name : ''
      }
    },

    methods : {
      editSingleProduct(product, index) {
        this.cancelEditProductAll()
        this.editProduct(index)
        this.selected_product_index = index
        this.selected_product_name = product.name
        this.$nextTick(()=>{
          this.$els.product_field.focus()
        })

      },
      updateSingleProduct(product) {
        this.updateProduct(product, this.selected_product_name)
      },
      classIsDone(product) {
        let className = ['item']
        if (product.done) className.push('done')
        return className.join(' ')
      }
    },
    vuex: {
      actions: {
        removeProduct,
        completeProduct,
        activeProduct,
        editProduct,
        cancelEditProduct,
        cancelEditProductAll,
        updateProduct
      },
      getters: {
        getProducts
      }
     }
  }

</script>
