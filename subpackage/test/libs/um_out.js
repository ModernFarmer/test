import Select from './select.vue'
import Input from './input.vue'
import Page from './page.vue'
import Button from './button.vue'
import Switch from './switch.vue'
import Message from './message.vue'
import ModalInside from './modalInside.vue'
import Loading from './loading.vue'
import _Checkbox from './checkbox.vue'
import Radio from './radio.vue'
import Checkall from './checkall.vue'
import _Date from './date.vue'
import Calendar from './calendar.vue'
import _Time from './time.vue'

import GlobalMethods from './global.js'

for(let key in GlobalMethods){
	window[key]=GlobalMethods[key];
};

window.__umVerify=Symbol('verify');
window.__umVerifyResult=Symbol('verifyResult');

let umJson={
	rules:{ // 校验规则
		required:{
			explain:'验证目标是否为非空.',
			handle(val){
				return _isNotEmpty(val);
			}
		},
		isNumber:{
			explain:'验证目标是否为数字(*注: 数字字符串将被认为是数字)',
			handle(val){
				return _isNumber(val);
			}
		},
		isMail:{
			explain:'验证目标格式是否为邮箱',
			handle(val){
				return _isMail(val);
			}
		},
		isPhone:{
			explain:'验证目标格式是否为国内手机号码',
			handle(val){
				return _isPhone(val);
			}
		},
		isIdcard:{
			explain:'验证目标格式是否为国内身份证号码',
			handle(val){
				return _isIdCard(val);
			}
		}
	},
	_uobj_select:{  // select组件状态
		nowConditionId_select:null,  // 上一次_PullDown对象id, 用于判断是否点击同一组件
		nowConditionObj_select:null,  // 上一次_PullDown对象, 用于当点击新select组件时折叠上一次下拉组件
		isModuleEvent_select:false, // 是否select组件触发的事件, 用于判断select组件是否监听v-model绑定值的改变
	},
	_uobj_date:{  // date组件状态
		nowConditionId_date:null,  // 上一次date组件对象id, 用于判断是否点击同一组件
		nowConditionObj_date:null  // 上一次date组件对象, 用于当点击新date组件时折叠上一次日期组件
	},
	isModuleEvent_checkbox:false, // 是否checkbox组件触发的事件, 用于判断checkbox组件是否监听result的改变
	_uobj_zIndex_modalInside:9999999  // modalInside组件的z-index公共层级, 随着调用组件次数的增加递增
};

let setRule=function(name, fn, explain){ // 添加验证规则  nanme:规则名称,如果该名称的规则已存在,则覆写该名称的规则; fn:规则方法; explain:规则说明
	if(name in this._$UMSTORE.rules)console.log(`b-Warn: ---> 验证规则 ${name} 已被覆写 !`);
	this._$UMSTORE.rules[name]={
		explain,
		handle:fn
	};
};

let getRules=function(){ // 打印出当前所有验证规则说明
	let json={};
	for(let key in this._$UMSTORE.rules){
		json[key]=this._$UMSTORE.rules[key].explain;
	};
	console.log(json);
};

let verify=function(obj){ // 验证的方法  obj:需要验证的对象
	if(!_isJson(obj)){
		console.log(`b-Warn: ---> 验证对象必须是一个 json !`);
		return false;
	}
	obj[__umVerifyResult]={};
	for(let key in obj){
		for(let i=0; i<obj[key].length; i++){
			if(typeof _getKeyData(this, key)!=='string'){
				if(_getKeyData(this, key)===null){
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
				let success=this._$UMSTORE.rules[obj[key][i].split('|')[0]].handle(_getKeyData(this, key));
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
		Vue.component('b-select', Select);
		Vue.component('b-input', Input);
		Vue.component('b-page', Page);
		Vue.component('b-button', Button);
		Vue.component('b-switch', Switch);
		Vue.component('b-modalInside', ModalInside);
		Vue.component('b-checkbox', _Checkbox);
		Vue.component('b-radio', Radio);
		Vue.component('b-checkall', Checkall);
		Vue.component('b-date', _Date);
		Vue.component('b-calendar', Calendar);
		Vue.component('b-time', _Time);

		let MSG=Vue.extend(Message);

		Vue.prototype._$UMSTORE=umJson;
		Vue.prototype._setRule=setRule;
		Vue.prototype._getRules=getRules;
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
		_BD(dom_loading, 'mousewheel', event=>{
			_preventDefault(event);
		});
		_BD(dom_loading, 'DOMMouseScroll', event=>{
			_preventDefault(event);
		});
		dom_loading.id='um__loading__container_id';
		document.body.appendChild(dom_message); // 添加全局message组件的外框元素节点
		document.body.appendChild(dom_loading); // 添加全局loading组件的外框元素节点

		let LD=Vue.extend(Loading);
		let dom_replace_loading=document.createElement('div');
		um__loading__container_id.appendChild(dom_replace_loading);
		new LD({el:dom_replace_loading});
	}
}