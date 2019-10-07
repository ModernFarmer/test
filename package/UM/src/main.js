import Vue from 'vue'
import App from './App.vue'
import UMUI from '../libs/_libsOut'
import router from './router'
import store from './store'

require('../libs/UMCSS.css')     //引入UMUI插件所有CSS样式

Vue.config.productionTip = false; // 阻止开发环境启用生产信息

Vue.use(UMUI);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
