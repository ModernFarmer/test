import Vue from 'vue'
import App from './App.vue'
import Um from '../libs/um_out.js'

require('../libs/um_css.css')

Vue.config.productionTip = false
Vue.use(Um);

new Vue({
  render: h => h(App),
}).$mount('#app')
