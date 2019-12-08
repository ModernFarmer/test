import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
	routes:[
		{
			path:'*',
			redirect:'/um-dropdown',
			component:()=>import('./components/dropdown.vue')
		},
		{
			path:'/um-dropdown',
			component:()=>import('./components/dropdown.vue')
		},
		{
			path:'/um-input',
			component:()=>import('./components/input.vue')
		}
	]
});