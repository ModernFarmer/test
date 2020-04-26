import Dropdown from './dropdown.vue'
import Input from './input.vue'
import Page from './page.vue'
import Button from './button.vue'
import Switch from './switch.vue'
import Message from './message.vue'
import Modal from './modal.vue'
import Loading from './loading.vue'
import _Checkbox from './checkbox.vue'
import Radio from './radio.vue'
import Checkall from './checkall.vue'
import _Date from './date.vue'
import Calendar from './calendar.vue'
import _Time from './time.vue'

window.__umVerify=Symbol('verify');
window.__umVerifyResult=Symbol('verifyResult');

let umJson={
	rules:{ // 校验规则
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
	_uobj_dropdown:{  // dropdown组件状态
		nowConditionId_dropdown:null,  // 上一次_PullDown对象id, 用于判断是否点击同一组件
		nowConditionObj_dropdown:null,  // 上一次_PullDown对象, 用于当点击新dropdown组件时折叠上一次下拉组件
		isModuleEvent_dropdown:false, // 是否dropdown组件触发的事件, 用于判断dropdown组件是否监听v-model绑定值的改变
	},
	_uobj_date:{  // date组件状态
		nowConditionId_date:null,  // 上一次date组件对象id, 用于判断是否点击同一组件
		nowConditionObj_date:null  // 上一次date组件对象, 用于当点击新date组件时折叠上一次日期组件
	},
	isModuleEvent_checkbox:false // 是否checkbox组件触发的事件, 用于判断checkbox组件是否监听result的改变
};

let setRule=function(name, fn){ // 添加验证规则 返回vue对象本身  nanme:规则名称,如果该名称的规则已存在,则覆写该名称的规则; fn:规则方法
	if(name in this._$UMSTORE.rules)console.log(`b-Warn: ---> 验证规则 ${name} 将被覆写 !`);
	this._$UMSTORE.rules[name]=fn;
	return this;
};

let verify=function(obj){ // 验证的方法  obj:需要验证的对象
	if(!_isJson(obj)){
		console.log(`b-Warn: ---> 验证对象必须是一个 json !`);
		return false;
	}
	obj[__umVerifyResult]={};
	for(let key in obj){
		for(let i=0; i<obj[key].length; i++){
			if(typeof eval(`this.${key}`)!=='string'){
				if(eval(`this.${key}`)===null){
					obj[__umVerifyResult][key]={
						success:false,
						value:obj[key][i].split('|')[1]?obj[key][i].split('|')[1]:''
					};
					break;
				}else{
					obj[__umVerifyResult][key]={success:true};
					break;
				};
			}else{
				let success=eval(`this._$UMSTORE.rules.${obj[key][i].split('|')[0]}(this.${key})`);
				if(success){
					obj[__umVerifyResult][key]={success};
				}else{
					obj[__umVerifyResult][key]={
						success,
						value:obj[key][i].split('|')[1]?obj[key][i].split('|')[1]:''
					};
					break;
				};
			};
		};
	};
	this.$set(obj, __umVerify, obj[__umVerify]?obj[__umVerify]+1:1); // 触发需要验证插件的监听机制
	let result=true;
	for(let key in obj[__umVerifyResult]){
		if(!obj[__umVerifyResult][key].success){
			result=false;
			break;
		}
	};
	return result;
};

export default {
	install:function(Vue){
		require('../libs/um_css.css');
		Vue.component('b-dropdown', Dropdown);
		Vue.component('b-input', Input);
		Vue.component('b-page', Page);
		Vue.component('b-button', Button);
		Vue.component('b-switch', Switch);
		Vue.component('b-modal', Modal);
		Vue.component('b-checkbox', _Checkbox);
		Vue.component('b-radio', Radio);
		Vue.component('b-checkall', Checkall);
		Vue.component('b-date', _Date);
		Vue.component('b-calendar', Calendar);
		Vue.component('b-time', _Time);

		let MSG=Vue.extend(Message);

		Vue.prototype._$UMSTORE=umJson;
		Vue.prototype._setRule=setRule;
		Vue.prototype._verify=verify;
		Vue.prototype.$Message=function(arg){
			let dom=document.createElement('div');
			um__message__container_id.appendChild(dom);
			let json={};
			if(typeof arg==='string'){
				json={value:arg};
			}else if(_isJson(arg)){
				json=arg;
			}else{
				return;
			};
			new MSG({
				el:dom,
				propsData:json
			});
		};
		Vue.prototype.$Loading={
			run(){
				um__loading__container_id.style.opacity=1;
				um__loading__container_id.style.zIndex=99999999;
			},
			stop(){
				um__loading__container_id.style.opacity=0;
				um__loading__container_id.style.zIndex=-2;
			}
		};

		let dom_message=document.createElement('div');
		dom_message.id='um__message__container_id';
		let dom_loading=document.createElement('div');
		dom_loading.id='um__loading__container_id';
		document.body.appendChild(dom_message); // 添加全局message组件的外框元素节点
		document.body.appendChild(dom_loading); // 添加全局loading组件的外框元素节点

		let LD=Vue.extend(Loading);
		let dom_replace_loading=document.createElement('div');
		um__loading__container_id.appendChild(dom_replace_loading);
		new LD({el:dom_replace_loading});
	}
}