<template>
<div class="um__input__class">
	<input :class="{um__input__input:icon===undefined}" type="text">
</div>
</template>

<script>
export default {
	props:['icon'],
	data(){
		return {
			first:false, // 是否首次加载
			isBlur:true, // 是否失去焦点状态
			isFocus:false, // 是否获取焦点状态
		}
	},
	methods:{

	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__input__class {width:220px; height:30px; border:1px solid #c0c4cc; border-radius:3px; background:white; position:relative;}
.um__input__input {width:calc(100% - 10px); height:calc(100% - 2px); padding-left:5px; padding-right:5px; outline:none; color:#606266; border:1px solid #c0c4cc; border-radius:3px; position:absolute; left:-1px; top:-1px;}
</style>