import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
	routes:[
		{
			path:'*',
			redirect:'/simple',
			component:()=>import('./components/simple.vue')
		},
		{
			path:'/simple',
			component:()=>import('./components/simple.vue')
		},
		{
			path:'/demo',
			component:()=>import('./components/demo.vue')
		}
	]
});