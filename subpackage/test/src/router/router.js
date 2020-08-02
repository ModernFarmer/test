import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
	routes:[
		/*{
			path:'*',
			component:()=>import('./components/block1/block1.vue'),  // 路由懒加载, 需要依赖 babel-plugin-syntax-dynamic-import 模块, 如果是vue-cli2,则需在.babelrc里面需要设置 "plugins": ["syntax-dynamic-import"]
			redirect:'/home/block1',  // 重定向
			meta:{   //路由元信息, 嵌套路由最底层的元信息将会放到$route.meta里, 其它的都是放在$route.matched数组里面
				value:'主页'
			}
		}*/
		{
			path:'*',
			component:()=>import('../components/simple.vue'),
			redirect:'/simple'
		},
		{
			path:'/simple',
			component:()=>import('../components/simple.vue')

		},
		{
			path:'/demo',
			component:()=>import('../components/demo.vue')
		}
	]
});