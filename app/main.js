import Vue from 'vue';
import Vuex from 'vuex';
import elementui from 'element-ui';

import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';

Vue.use(elementui);
Vue.use(Vuex);
 
new Vue({
    'el': '#app',
    render(h){
        return h(App);
    },
    router,
    store: new Vuex.Store(store)
})