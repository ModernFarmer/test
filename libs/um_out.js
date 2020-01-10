import Dropdown from './dropdown.vue'
import Input from './input.vue'

window.__verify=Symbol('verify');


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

let setRule=function(name, fn){
	if(name in this._$UMSTORE.rules)console.log(`umWarn: ---> 验证规则 ${name} 已被覆写 !`);
	this._$UMSTORE.rules[name]=fn;
};

export default {
	install:function(Vue){
		Vue.component('um-dropdown', Dropdown);
		Vue.component('um-input', Input);

		Vue.prototype._$UMSTORE=umJson;
		Vue.prototype.setRule=setRule;
	}
}