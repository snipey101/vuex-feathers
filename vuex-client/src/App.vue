

<template>

<div>
    <div class="ui segment basic">
        <h1>Task List <span v-show="getProducts.length > 0">({{getCompletedProducts.length}} of {{getProducts.length}} completed)</span></h1>
        <list></list>
    </div>
</div>

</template>

<script>

import list from './Components/List.vue'

import {
    getProducts, getActiveProducts, getCompletedProducts
}
from './vuex/modules/Products/getters.js'

import  {
    loadProductFromServer
} from './vuex/Modules/Products/actions.js'

export default {

    components: {
        list
    },

    vuex: {
        actions : {
            loadProductFromServer
        },
        getters: {
            getProducts,
            getActiveProducts,
            getCompletedProducts
        }
    },

    ready () {
        this.loadProductFromServer();
    }
}

</script>
