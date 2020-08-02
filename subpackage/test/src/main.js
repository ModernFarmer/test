import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import BaseUI from '../libs/um_out.js'

Vue.config.productionTip = false;
Vue.use(BaseUI);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
