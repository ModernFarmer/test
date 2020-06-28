import Vue from 'vue'
import App from './App.vue'
import router from './router'
import umax from 'umax'
import UM from './libs/um.js'
import DataStore from './DataStore.js'
import Vconsole from 'vconsole';
import GlobleMethod from './common/index.js'

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

window._isJson=GlobleMethod._isJson;  //判断一个对象是否为json对象,返回布尔值
window._isArray=GlobleMethod._isArray; //判断一个对象是否为数组,返回布尔值
window._dateFormat=GlobleMethod._dateFormat; //格式化日期时间
window._transcoding=GlobleMethod._transcoding; // 密码转码
window._BD=GlobleMethod._BD; // 给指定元素绑定事件
window._unBD=GlobleMethod._unBD; // 给指定元素解除绑定事件
window._Storage=GlobleMethod._Storage; // -------------------> 缓存对象
window._isIdCard=GlobleMethod._isIdCard; // 判断字符串的值是否为国内身份证号码
window._isPhone=GlobleMethod._isPhone; // 判断字符串的值是否为国内手机号码
window._isEmpty=GlobleMethod._isEmpty;  // 判断字符串的值是否为空
window._isMail=GlobleMethod._isMail;  // 判断字符串的值是否为邮箱
window._isNumber=GlobleMethod._isNumber;  // 判断字符串的值是否为数字

const vm=new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

umax.beforeRequest=function(config){  // http请求执行之前全局拦截
	vm.$Loading.run();
    return config;
};

umax.responsed=function(res, xmlObj){  // http请求执行之后全局拦截
	let bl=true;
	// 某些接口的错误信息不需要拦截, 比如登录接口(它的错误拦截写在自己的.then方法和.catch方法里面)
	console.log(xmlObj._url)
	let checkArr=['/admin/api/ui/uplode', '/admin/userDistributor/signIn'];
	if(checkArr.indexOf(xmlObj._url)!==-1)bl=false;

	if(bl && res.status!=500){
		if(res.message)vm.$Alert(res.message);
	}else if(res.status==500){
		vm.$Alert('系统异常: 500');
	}
	vm.$Loading.stop();
};
