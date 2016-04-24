<template>
  <div>
    <div v-show="!add_product" class="ui right aligned">
      <button @click="add_product=true" class="circular ui button tiny blue icon">
        <i class="ui icon plus"></i>
      </button>
    </div>

    <div v-show="add_product">
      <div class="ui input">
        <input v-el:product_name v-model="product_name" placeholder="add product name.." @keyup.enter="saveNewProduct" />
      </div>

      <button @click="saveNewProduct" class="circular ui button tiny blue basic ">Save</button>
      <button @click="cancelNewProduct" class="circular ui button tiny red basic ">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>

  import  * as actions from '../vuex/Modules/Products/actions.js'
  import { getProducts } from '../vuex/Modules/Products/getters.js'

  export default {

    data() {
      return {
        add_product : false,
        product_name : '',
      }
    },

    watch : {
      'add_product' : function(value) {
        if (value) {
            this.$els.product_name.focus()
        }
      }
    },

    methods : {
      cancelNewProduct() {
        this.product_name = ''
        this.add_product = false
      },
      saveNewProduct() {
        if (!this.product_name) return
        this.addProduct({
          name : this.product_name,
          done : false,
          editing : false
        })
        this.cancelNewProduct()
      },
      markProductAsDone(product) {
        this.completeProduct(product)
      }
    },

    vuex: {
      actions,
      getters: {
        products :  getProducts
      }
     }
  }

</script>
