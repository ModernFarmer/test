<template>
<div :class="'UM_input_plugIn_Box_'+num">
	<slot></slot>
	<input type="text" class="UM_titleInput_plugIn_input3" v-bind="$attrs" v-on="inputEvent">
</div>
</template>

<script>
export default {
	inheritAttrs:false,
	computed:{
		inputEvent:function(){
			// `Object.assign` 将所有的对象合并为一个新对象
			return Object.assign(
				{},
				//从父级添加所有的监听器
				this.$listeners,
				// 然后我们添加自定义监听器,
				// 或覆写一些监听器的行为
				{
				// 这里确保组件配合 `v-model` 的工作
					input:function(event) {
						this.$emit('input', event.target.value);
					}.bind(this)
				}
			);
		},
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	mounted:function(){
		_(this.$el).setH(`.UM_input_plugIn_Box_${this.num}`, {lineHeight:1});
	}
}
</script>