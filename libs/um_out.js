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
	        val = val+'';
	        let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
	        let tip = "";
	        let pass = true;
	 
	        if (!val || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)) {
	            tip = "身份证号格式错误";
	            pass = false;
	        }
	 
	        if (!city[val.substr(0, 2)]) {
	            tip = "地址编码错误";
	            pass = false;
	        }
	        if (val.length == 18) {
	            let sBirthday = val.substr(6, 4) + "-" + Number(val.substr(10, 2)) + "-" + Number(val.substr(12, 2));
	            let d = new Date(sBirthday.replace(/-/g, "/"))
	            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
	                //alert("非法生日");
	                pass = false;
	            }
	        }
	        //18位身份证需要验证最后一位校验位
	        if (val.length == 18) {
	            val = val.split('');
	            //∑(ai×Wi)(mod 11)
	            //加权因子
	            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	            //校验位
	            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
	            let sum = 0;
	            let ai = 0;
	            let wi = 0;
	            for (let i = 0; i < 17; i++) {
	                ai = val[i];
	                wi = factor[i];
	                sum += ai * wi;
	            }
	            let last = parity[sum % 11];
	            if (parity[sum % 11] != val[17]) {
	                tip = "校验位错误";
	                pass = false;
	            }
	 
	        }
	        return pass;
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
		_(dom_loading).BD('mousewheel', event=>{
			_preventDefault(event);
		}).BD('DOMMouseScroll', event=>{
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