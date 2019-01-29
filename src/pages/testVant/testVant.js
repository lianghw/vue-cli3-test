// require('../../mock')
import '@babel/polyfill'

import Vue from 'vue'

import 'vant/lib/index.css';

import 'lib-flexible/flexible'

import testVant from './testVant.vue'

import '@/assets/css/base.scss'

import store from './store/index'


import { Button } from 'vant';
Vue.use(Button);

import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);

import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);
import { Picker } from 'vant';

Vue.use(Picker);

import { RadioGroup, Radio } from 'vant';

Vue.use(RadioGroup);
Vue.use(Radio);

import { Circle } from 'vant';
Vue.use(Circle);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { testVant },
  template: '<testVant/>',
  store
})
