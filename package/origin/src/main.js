import Vue from 'vue'
import App from './App.vue'
import UMUI from '../libs/_libsOut'

require('../libs/UMCSS.css')     //引入插件所有CSS样式

Vue.use(UMUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
