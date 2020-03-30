<template>
<div class="um__checkall__class" @mouseenter="toEnter" @mouseleave="toLeave" @click="toSlectOption">
	<div :class="{um__checkall__frame:true, um__checkall__borderAnimation_out:!isMouseOn && !first_border, um__checkall__borderAnimation_hover:isMouseOn}">
		<div :class="{icon:true, um__checkall__alert:true, um__checkall__alertAnimation0:isZero && !first_alert, um__checkall__alertAnimation1:!isZero}">
			<span :class="{um__checkall__position:true, um__checkall__alertAnimation1:isBetween}" v-show="isBetween">&#xe725;</span>
			<span :class="{um__checkall__position:true, um__checkall__alertAnimation1:!isBetween}" v-show="isMax">&#xe65d;</span>
			<span class="um__checkall__position" style="opacity:0" v-show="isZero">0</span>
		</div>
	</div>
	<span class="um__checkall__defaultText" v-if="!isHideOption">0</span>
	<span style="font-size:14px" v-show="!isHideOption">
		<slot></slot>
	</span>
	<span class="um__checkall__defaultText" v-if="!isHideOption">0</span>
</div>
</template>

<script>
export default {
	props:['options', 'model', 'value'],
	data(){
		return {
			first_border:true, // 是否首次加载
			first_alert:true, // 是否首次加载
			isMouseOn:false // 鼠标是否在组件内
		}
	},
	computed:{
		isHideOption:function(){
			return Object.keys(this.$slots).length===0;
		},
		maxData:function(){
			if(!this.model){
				return JSON.stringify(this.options);
			}else if(this.model && typeof this.model==='string'){
				let arr=this.options.map(val=>{
					return eval(`val.${this.model}`);
				});
				return JSON.stringify(arr);
			}else{
				throw 'b-checkbox组件的keyword属性只能是一个字符串 !';
			};
		},
		isZero:function(){
			if(this.value.length==0)return true;
			return false;
		},
		isBetween:function(){
			if(this.first_alert)this.first_alert=false;
			let l=this.value.length;
			if(l>0 && l<this.options.length)return true;
			return false;
		},
		isMax:function(){
			if(this.first_alert)this.first_alert=false;
			if(this.value.length===this.options.length)return true;
			return false;
		}
	},
	methods:{
		toEnter(){
			if(this.first_border)this.first_border=false;
			this.isMouseOn=true;
		},
		toLeave(){
			this.isMouseOn=false;
		},
		toSlectOption(){
			if(this.first_alert)this.first_alert=false;
			if(this.isMax){
				this.$emit('input', []);
			}else{
				this.$emit('input', JSON.parse(this.maxData));
			};
		}
	}
}
</script>

<style>
.um__checkall__class {display:inline-block; line-height:28px; cursor:pointer; color:#606266; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none; position:relative;}
.um__checkall__frame {width:18px; height:18px; line-height:17px; text-align:center; border:1px solid #c0c4cc; border-radius:3px; display:inline-block;}
.um__checkall__borderAnimation_out {animation:UM_SELECT_OUT .5s forwards; -webkit-animation:UM_SELECT_OUT .5s forwards; -o-animation:UM_SELECT_OUT .5s forwards; -moz-animation:UM_SELECT_OUT .5s forwards; -ms-animation:UM_SELECT_OUT .5s forwards;}
.um__checkall__borderAnimation_hover {animation:UM_SELECT_HOVER .5s forwards; -webkit-animation:UM_SELECT_HOVER .5s forwards; -o-animation:UM_SELECT_HOVER .5s forwards; -moz-animation:UM_SELECT_HOVER .5s forwards; -ms-animation:UM_SELECT_HOVER .5s forwards;}
.um__checkall__alert {width:18px; height:18px; border-radius:3px; border:1px solid #3F79F1; background:#3F79F1; font-weight:900; font-size:14px; color:white; display:inline-block; line-height:17px; position:relative; top:-1px; left:-1px; opacity:0;}
.um__checkall__alertAnimation0 {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__checkall__alertAnimation1 {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__checkall__position {position:relative; top:1px;}
.um__checkall__defaultText {opacity:0;}
</style>