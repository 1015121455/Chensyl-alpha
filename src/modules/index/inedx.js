import Vue from 'vue';
// import VueRouter from 'vue-router';
// import routes from './routes'
import store from './store';
import shop from './components';
// import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
import 'babel-polyfill';

let vm = new Vue({
    el: '#chen',
    store,
    render: h => h(shop)
});



