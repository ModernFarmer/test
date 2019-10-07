<template>
	<img :src="img" :class="'UM_loading_plugIn_image_'+num">
</template>

<script>
export default {
	props:['name', 'img'],
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	mounted:function(){
		_('.UM_loading_plugIn_image_'+this.num).animation('UM_loading_plugIn_animationName 1s infinite linear');
	}
}
</script>