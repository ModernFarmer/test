<template>
<div class="um__input__class">
	<div class="um__input__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<input type="text" :class="{um__input__input:true, um__input__input_on:!isBlur && !first, um__input__input_off:isBlur && !first}" @blur="toBlur" @focus="toFocus" @focus.once="toUnfirst">
</div>
</template>

<script>
export default {
	props:['icon', 'disabled'],
	data(){
		return {
			first:true, // 是否首次加载
			isBlur:true, // 是否失去焦点状态
		}
	},
	computed:{
		isCover:function(){ // 是否显示禁用遮罩
			if(this.disabled=='' || this.disabled=='true' || this.disabled===true){
				return true;
			}else{
				return false;
			};
		}
	},
	methods:{
		toUnfirst(){
			this.first=false;
		},
		toBlur(){
			this.isBlur=true;
		},
		toFocus(){
			this.isBlur=false;
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__input__class {width:180px; height:26px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; display:inline-block; position:relative; animation:UM_BORDERFRAME_OUT .5s forwards; -webkit-animation:UM_BORDERFRAME_OUT .5s forwards; -o-animation:UM_BORDERFRAME_OUT .5s forwards; -moz-animation:UM_BORDERFRAME_OUT .5s forwards; -ms-animation:UM_BORDERFRAME_OUT .5s forwards;}
.um__input__class:hover {animation:UM_BORDERFRAME_HOVER .5s forwards; -webkit-animation:UM_BORDERFRAME_HOVER .5s forwards; -o-animation:UM_BORDERFRAME_HOVER .5s forwards; -moz-animation:UM_BORDERFRAME_HOVER .5s forwards; -ms-animation:UM_BORDERFRAME_HOVER .5s forwards;}
.um__input__input {width:calc(100% - 10px); height:calc(100% - 2px); padding-left:5px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__input__input_on {animation:UM_BORDERFRAME_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_CHOOSED .5s forwards;}
.um__input__input_off {animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards;}
.um__input__disabled {width:calc(100% + 2px); height:calc(100% + 2px); background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:-1px; top:-1px; z-index:10;}

</style>