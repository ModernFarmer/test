import Vue from 'vue'
import App from './App.vue'
import router from './router'
import umax from 'umax'
import UM from './libs/um.js'
import DataStore from './DataStore.js'
import Vconsole from 'vconsole';

Vue.config.productionTip = false

if(process.env.NODE_ENV!=='production'){  // 非生产环境下, 调用vConsole测试插件
	const vConsole = new Vconsole();
	Vue.use(vConsole);
}

umax.init({  // umax模块: 用于处理http请求, API地址:https://www.npmjs.com/package/umax
	baseUrl:process.env.VUE_APP_BASEURL,
	timeout:10000
});

Vue.use(UM);

Vue.prototype.umax=umax;
Vue.prototype.DS=DataStore;  // -------------------> 公用数据对象

window._isJson=function(obj){             //判断一个对象是否为json对象,返回布尔值
	var boolean_isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	return boolean_isjson;
};

window._isArray=function(obj) {           //判断一个对象是否为数组,返回布尔值
	return Object.prototype.toString.call(obj) === '[object Array]';
};

window._Storage={  // -------------------> 缓存对象
	self:window.localStorage,   // 获取当前所有缓存
	get(name){                  // 读取指定缓存
		try{
			return JSON.parse(window.localStorage.getItem(name));
		}catch{
			return window.localStorage.getItem(name);
		};
	},
	set(name, item){            // 设置指定缓存
		if(typeof item==='string'){
			window.localStorage.setItem(name, item);
		}else if(_isJson(item) || _isArray(item)){
			window.localStorage.setItem(name, JSON.stringify(item));
		}else{
			throw 'CACHE.set()方法的第二个参数的类型只能是 string、json 或者 array !';
		};
	},
	remove(name){               // 移除指定缓存
		window.localStorage.removeItem(name);
	}
};

Vue.mixin({  // 全局混入
	
})

const vm=new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

umax.beforeRequest=function(config){  // http请求执行之前全局拦截
	vm.$Loading.run();
    return config;
};

umax.responsed=function(res, xmlObj){  // http请求执行之后全局拦截
	let bl=true;  // 某些接口的错误信息不需要拦截, 比如登录接口(它的错误拦截写在自己的.then方法和.catch方法里面)

	if(xmlObj._url==='/admin/userDistributor/signIn')bl=false;

	if(bl){
		if(res.status!=200){
			vm.$Alert(res.message);
		}
	}
	vm.$Loading.stop();
};
