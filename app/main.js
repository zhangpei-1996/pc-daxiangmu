import Vue from 'vue';
import elementui from 'element-ui';

import App from './App.vue';
import router from './router/router.js';

Vue.use(elementui);
 
new Vue({
    'el': '#app',
    render(h){
        return h(App);
    },
    router
})