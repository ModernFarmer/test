import Dropdown from './dropdown.vue'
import Input from './input.vue'

window.__verify=Symbol('verify');
window.__verifyResult=Symbol('verifyResult');

let umJson={
	rulesGroup:{},
	rules:{
		required(val){ // 是否为非空
			if(val===null || val===undefined)return false;
			return !((val+'').replace(/\s+/g, '')==='');
		},
		isNumber(val){ // 是否数字
			return (Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, '')) || Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''))===0)?true:false;
		},
		isMail(val){ // 是否邮箱字符串
			return /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
		},
		isPhone(val){ // 是否手机号码
			return /^1\d{10}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
		},
		isIdcard(val){ // 是否身份证号码
			return true; // --------------------------
		}
	},
};

let setRule=function(name, fn){ // 添加验证规则 返回vue对象本身  nanme:规则名称,如果该名称的规则已存在,则覆写该名称的规则; fn:规则方法
	if(name in this._$UMSTORE.rules)console.log(`Um-Warn: ---> 验证规则 ${name} 已被覆写 !`);
	this._$UMSTORE.rules[name]=fn;
	return this;
};

let verify=function(obj){ // 验证的方法  obj:需要验证的对象
	if(!_isJson(obj)){
		console.log(`Um-Warn: ---> 验证对象必须是一个 json !`);
		return false;
	}
	obj[__verifyResult]={};
	for(let key in obj){
		for(let i=0; i<obj[key].length; i++){
			let success=eval(`this._$UMSTORE.rules.${obj[key][i].split('|')[0]}(${'this.'+key})`);
			if(success){
				obj[__verifyResult][key]={success};
			}else{
				obj[__verifyResult][key]={
					success,
					value:obj[key][i].split('|')[1]?obj[key][i].split('|')[1]:''
				};
				break;
			};
		};
	};
	this.$set(obj, __verify, obj[__verify]?obj[__verify]+1:1); // 触发需要验证插件的监听机制
	let result=true;
	for(let key in obj[__verifyResult]){
		if(!obj[__verifyResult][key].success){
			result=false;
			break;
		}
	};
	return result;
};

export default {
	install:function(Vue){
		Vue.component('um-dropdown', Dropdown);
		Vue.component('um-input', Input);

		Vue.prototype._$UMSTORE=umJson;
		Vue.prototype._setRule=setRule;
		Vue.prototype._verify=verify;
	}
}