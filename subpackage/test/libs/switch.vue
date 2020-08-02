<template>
<div class="um__switch__boxClass">
	<div v-if="isDisabled" class="um__switch__cover"></div>
	<div :class="{um__switch__class:true, [`um__switch__size_${plugSize}`]:true, um__switch_disabled_bk:isDisabled, um__switch__on:isOn, um__switch__off:!isOn && !first}" @click.once="first=false" @click="toChangeSwitch">
		<span v-if="!textObj.have" :class="`um__switch__align_${plugSize}`">0</span>
		<div v-if="textObj.have" :class="{um__switch_simpleText:true, [`um__switch_textLeft_${plugSize}`]:true, [`um__switch_isFloatLeft_${plugSize}`]:textObj.floatLeft, um__switch_opacity0:!isOn && !first, um__switch_opacity1:isOn}">{{textObj.left}}</div>
		<div v-if="textObj.have" :class="{um__switch_simpleText:true, [`um__switch_textRight_${plugSize}`]:true, [`um__switch_isFloatRight_${plugSize}`]:textObj.floatRight, um__switch_opacity0:isOn && !first, um__switch_opacity1:!isOn}">{{textObj.right}}</div>
		<div :class="{um__switch__button:true, [`um__switch__btnSize_${plugSize}`]:true, um__switch_disabled_btn:isDisabled, um__switch__btn_on:isOn, um__switch__btn_off:!isOn && !first}"></div>
	</div>
</div>
</template>

<script>
export default {
	props:['size', 'value', 'disabled', 'text', 'model'],
	data(){
		return {
			first:true, // 是否首次加载
			isOn:false,
			textDefaultShow:false,
			sizeArr:['default', 'big', 'small'] // 大小规格size数组, 用于检测size是否正确
		}
	},
	computed:{
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
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
		},
		textObj:function(){
			if(this.text===undefined){
				return {have:false, left:'',right:'', floatLeft:true, floatRight:true};
			}else{
				let arr=this.text.split('|');
				if(arr.length===2){
					if(arr[0].length>=arr[1].length){
						return {have:true, left:arr[0],right:arr[1], floatLeft:false, floatRight:true};
					}else{
						return {have:true, left:arr[0],right:arr[1], floatLeft:true, floatRight:false};
					};
				}else{
					return {have:false, left:'',right:'', floatLeft:true, floatRight:true};
				};
			};
			return false;
		},
		modelObj:function(){
			if(this.model===undefined){
				return {res:true, rej:false};
			}else{
				let arr=this.model.split('|');
				if(arr.length===2){
					return {res:arr[0], rej:arr[1]}
				}else{
					return {res:true, rej:false};
				};
			};
		}
	},
	watch:{
		value:function(val){
			if(val===this.modelObj.res){
				this.isOn=true;
			}else if(val===this.modelObj.res){
				this.isOn=false;
			}
		}
	},
	methods:{
		toChangeSwitch(){
			this.isOn=!this.isOn;
			this.$emit('input', this.isOn?this.modelObj.res:this.modelObj.rej);
			this.$emit('change', this.isOn?this.modelObj.res:this.modelObj.rej);
		}
	},
	mounted:function(){
		if(Object.keys(this.$slots).length===0)this.textDefaultShow=true;
		if(this.value===this.modelObj.res){
			this.isOn=true;
		}else if(this.value===this.modelObj.res){
			this.isOn=false;
		}
	}
}
</script>

<style>
.um__switch__boxClass {display:inline-block; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none; position:relative; position:relative;}
.um__switch__cover {width:100%; height:100%; cursor:not-allowed; position:absolute; left:0; top:0; z-index:5;}

.um__switch__size_default {min-width:41px; height:22px; line-height:21px;}
.um__switch__size_big {min-width:50px; height:28px; line-height:27px;}
.um__switch__size_small {min-width:27px; height:16px; line-height:15px;}

.um__switch_simpleText {display:inline-block; opacity:0;}

.um__switch_textLeft_default {min-width:15px; font-size:12px; padding-left:5px; padding-right:22px;}
.um__switch_textLeft_big {min-width:17px; font-size:14px; padding-left:8px; padding-right:30px;}
.um__switch_textLeft_small {min-width:11px; font-size:10px; padding-left:3px; padding-right:15px;}

.um__switch_textRight_default {min-width:15px; font-size:12px; padding-left:22px; padding-right:5px;}
.um__switch_textRight_big {min-width:17px; font-size:14px; padding-left:30px; padding-right:8px;}
.um__switch_textRight_small {min-width:11px; font-size:10px; padding-left:15px; padding-right:3px;}

.um__switch__class {padding:0 2px; color:white; background:#cccccc; cursor:pointer; border-radius:14px; position:relative;}
.um__switch__button {border-radius:50%; background:white; position:absolute; left:2px; top:2px}
.um__switch_disabled_bk {background:#e5e5e5;}
.um__switch_disabled_btn {background:#cccccc;}
.um__switch_isFloatLeft_default {position:absolute; left:2px; top:1px;}
.um__switch_isFloatLeft_big {position:absolute; left:2px; top:0;}
.um__switch_isFloatLeft_small {position:absolute; left:2px; top:1px;}
.um__switch_isFloatRight_default {position:absolute; right:2px; top:1px;}
.um__switch_isFloatRight_big {position:absolute; right:2px; top:0;}
.um__switch_isFloatRight_small {position:absolute; right:2px; top:1px;}

.um__switch__btnSize_default {width:18px; height:18px;}
.um__switch__btnSize_big {width:24px; height:24px;}
.um__switch__btnSize_small {width:12px; height:12px;}

.um__switch_opacity0 {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__switch_opacity1 {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}

.um__switch__on {animation:UM_SWITCH_ON .5s forwards; -webkit-animation:UM_SWITCH_ON .5s forwards; -o-animation:UM_SWITCH_ON .5s forwards; -moz-animation:UM_SWITCH_ON .5s forwards; -ms-animation:UM_SWITCH_ON .5s forwards;}
.um__switch__off {animation:UM_SWITCH_OFF .5s forwards; -webkit-animation:UM_SWITCH_OFF .5s forwards; -o-animation:UM_SWITCH_OFF .5s forwards; -moz-animation:UM_SWITCH_OFF .5s forwards; -ms-animation:UM_SWITCH_OFF .5s forwards;}
.um__switch__btn_on {animation:UM_SWITCH_BTN_ON .5s forwards; -webkit-animation:UM_SWITCH_BTN_ON .5s forwards; -o-animation:UM_SWITCH_BTN_ON .5s forwards; -moz-animation:UM_SWITCH_BTN_ON .5s forwards; -ms-animation:UM_SWITCH_BTN_ON .5s forwards;}
.um__switch__btn_off {animation:UM_SWITCH_BTN_OFF .5s forwards; -webkit-animation:UM_SWITCH_BTN_OFF .5s forwards; -o-animation:UM_SWITCH_BTN_OFF .5s forwards; -moz-animation:UM_SWITCH_BTN_OFF .5s forwards; -ms-animation:UM_SWITCH_BTN_OFF .5s forwards;}

.um__switch__align_default {line-height:21px; opacity:0;}
.um__switch__align_big {line-height:27px; opacity:0;}
.um__switch__align_small {line-height:15px; opacity:0;}
</style>