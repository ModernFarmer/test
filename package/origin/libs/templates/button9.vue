<template>
<div :class="'UM_button_plugIn_Box_9 UM_button_plugIn_Box_9_'+num" v-on="$listeners">
	<slot></slot>
</div>
</template>

<script>
export default {
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	mounted:function(){
		_(this.$el).setH(`.UM_button_plugIn_Box_9_${this.num}`, {lineHeight:1}).choosable();
	}
}
</script>