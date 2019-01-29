// require('../../mock')

import Vue from 'vue'
import 'vant/lib/index.css'
import 'lib-flexible/flexible'
import '@/assets/css/base.scss'

import index from './index.vue'
import store from './store/index'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { index },
  template: '<index/>',
  store
})
