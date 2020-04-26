import Vue from 'vue'
import App from './App.vue'
import Um from '../libs/um_out.js'
import router from './router.js'

Vue.config.productionTip = false
Vue.use(Um);

new Vue({
	router,
 	render: h => h(App),
}).$mount('#app')