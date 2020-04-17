<template>
<div :class="{um__input__class_simple:true, [`um__input__lineH_${plugSize}`]:true, um__input__animationAble:!hoverFirse}" @mouseenter="hoverFirse=false">
	<div class="um__input__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div :class="`icon um__input__simpleIcon um__input__Icon_${plugSize}`" :style="{[iconObj.position]:'1px', cursor:haveIconClick?'pointer':'default'}" v-if="icon" v-html="iconObj.value" @click="toClickIcon"></div>
	<input :id="id" type="text" 
		:class="{[`um__input__fontSize_${plugSize}`]:true,
				um__input__input_noIcon:iconObj.noIcon===true, 
				um__input__input_iconRight:iconObj.position!=='left' && iconObj.noIcon===false, 
				um__input__input_iconLeft:iconObj.position==='left' && iconObj.noIcon===false, 
				um__input__input_on:!isBlur && !isAlarm && !alarmBefore, 
				um__input__input_alarm_on:!isBlur && !isAlarm && alarmBefore, 
				um__input__input_off:isBlur && !first && !isAlarm && !alarmBefore, 
				um__input__input_alarm:isAlarm && !blurBefore, 
				um__input__input_blur_alarm:isAlarm && blurBefore}" 
				@blur="toBlur" @focus="toFocus" @focus.once="first=false" v-bind="$attrs" v-on="inputEvent">
	<div :class="{um__input__input_textAlarm:true, um__input__input_text_showAnimation:isAlarm, um__input__input_text_hideAnimation:!isAlarm && !first}">{{alarmWord}}</div>
	<span :class="`um__input__align_${plugSize}`">0</span>   <!-- 对齐用; 本组件内其它元素都是绝对定位, 组件本身的display是inline-block, 如果不加一个合适line-height的文字内容则无法和有文字内容的其它inline-block元素对齐 -->
</div>
</template>

<script>
export default {
	// this._$UMSTORE
	props:['icon', 'disabled', 'rules', 'validateField', 'size'],
	data(){
		return {
			first:true, // 是否首次加载
			hoverFirse:true, // 是否首次鼠标移入
			blurBefore:true, // 标红之前的获取焦点状态, 用于优化展示动画
			alarmBefore:false, // 失去或获取焦点之前的标红状态, 用于优化展示动画
			isBlur:true, // 是否失去焦点状态
			isAlarm:false, // 是否标红
			alarmWord:'', // 验证失败的说明文字
			sizeArr:['default', 'big', 'small'] // 大小规格size数组, 用于检测size是否正确
		}
	},
	computed:{
		id:function(){
			return '_um_input_'+Math.ceil(Math.random()*100000000);
		},
		inputEvent:function(){ // 所有组件上绑定的事件
			return Object.assign({}, this.$listeners, {
				input:function(event){
					this.$emit('input', event.target.value);
				}.bind(this)
			});
		},
		isCover:function(){ // 是否显示禁用遮罩
			if(this.disabled==='' || this.disabled==='true' || this.disabled===true){
				return true;
			}else{
				return false;
			};
		},
		iconObj:function(){ // icon的值和位置
			if(this.icon){
				let arr=this.icon.split('|');
				if(arr.length>1){
					return {value:arr[0], position:arr[1], noIcon:false};
				}else{
					return {value:arr[0], position:'right', noIcon:false}
				};
			}else{
				return {value:'',position:'right', noIcon:true};
			};
		},
		haveIconClick:function(){ // 组件是否含有icon的点击事件, 用于判断鼠标移入icon的时候是否要变换鼠标样式
			return 'clickIcon' in this.$listeners;
		},
		verifying:function(){
			return this.rules!==undefined && this.validateField!==undefined && this.rules[this.validateField]!==undefined;
		},
		plugSize:function(){
			if(this.size===undefined){
				return 'default';
			}else{
				if(this.sizeArr.indexOf((this.size+'').replace(/\s+/g, ''))===-1){
					return 'default';
				}else{
					return (this.size+'').replace(/\s+/g, '');
				};
			};
		}
	},
	methods:{
		toBlur(){ // 失去焦点
			this.blurBefore=this.isBlur;
			this.isBlur=true;
			if(this.verifying){
				this.toVerifySimple();
			}else{
				this.toNomal();
			};
		},
		toFocus(){ // 获取焦点
			this.blurBefore=this.isBlur;
			this.isBlur=false;
			this.toNomal();
		},
		toClickIcon(){ // 点击icon时触发的函数
			this.$emit('clickIcon', this.$attrs.value);
		},
		toRed(){ // 框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=true;
		},
		toNomal(){ // 取消框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=false;
		},
		toVerifySimple(){
			if(!this.verifying)return;
			let success=true;
			for(let i=0; i<this.rules[this.validateField].length; i++){
				let res=this._$UMSTORE.rules[this.rules[this.validateField][i].split('|')[0]](eval(this.id).value);
				if(!res){
					success=false;
					this.alarmWord=this.rules[this.validateField][i].split('|')[1];
					break;
				}
			};
			if(success){
				this.toNomal();
			}else{
				this.toRed();
			};
		}
	},
	mounted:function(){
		if(this.verifying){
			this.$watch(function(){
				return this.rules[__umVerify];
			}, function(){
				if(this.rules[__umVerifyResult][this.validateField].success){
					this.toNomal();
				}else{
					this.alarmWord=this.rules[__umVerifyResult][this.validateField].value;
					this.toRed();
				};
			});
		}
	}
}
</script>

<style>
.um__input__class_simple {width:180px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; display:inline-block; position:relative;}
.um__input__lineH_default {height:26px;}
.um__input__lineH_big {height:32px;}
.um__input__lineH_small {height:20px;}

.um__input__animationAble {animation:UM_BORDERFRAME_OUT .5s forwards; -webkit-animation:UM_BORDERFRAME_OUT .5s forwards; -o-animation:UM_BORDERFRAME_OUT .5s forwards; -moz-animation:UM_BORDERFRAME_OUT .5s forwards; -ms-animation:UM_BORDERFRAME_OUT .5s forwards;}
.um__input__animationAble:hover {animation:UM_BORDERFRAME_HOVER .5s forwards; -webkit-animation:UM_BORDERFRAME_HOVER .5s forwards; -o-animation:UM_BORDERFRAME_HOVER .5s forwards; -moz-animation:UM_BORDERFRAME_HOVER .5s forwards; -ms-animation:UM_BORDERFRAME_HOVER .5s forwards;}
.um__input__input_noIcon {width:calc(100% - 10px); height:calc(100% - 2px); padding-left:5px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__input__input_iconRight {width:calc(100% - 34px); height:calc(100% - 2px); padding-left:5px; padding-right:29px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__input__input_iconLeft {width:calc(100% - 34px); height:calc(100% - 2px); padding-left:29px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__input__input_on {animation:UM_BORDERFRAME_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_CHOOSED .5s forwards;}
.um__input__input_alarm_on {animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards;}
.um__input__input_off {animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards;}
.um__input__input_alarm {animation:UM_BORDERFRAME_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM .5s forwards;}
.um__input__input_blur_alarm {animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards;}
.um__input__disabled {width:calc(100% + 2px); height:calc(100% + 2px); background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:-1px; top:-1px; z-index:10;}

.um__input__simpleIcon {width:24px; color:#c0c4cc; text-align:center; -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none; position:absolute; top:1px; z-index:5;}
.um__input__Icon_default {height:24px; line-height:24px; font-size:12px;}
.um__input__Icon_big {height:30px; line-height:30px; font-size:14px;}
.um__input__Icon_small {height:19px; line-height:19px; font-size:10px;}

.um__input__fontSize_default {font-size:12px;}
.um__input__fontSize_big {font-size:14px;}
.um__input__fontSize_small {font-size:10px;}

.um__input__input_textAlarm {width:calc(100% - 5px); line-height:18px; font-size:10px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:red; position:absolute; left:5px; top:100%;}

.um__input__input_text_showAnimation {animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards;}
.um__input__input_text_hideAnimation {animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards;}

.um__input__align_default {line-height:26px; opacity:0}
.um__input__align_big {line-height:32px; opacity:0}
.um__input__align_small {line-height:20px; opacity:0}
</style>