<template>
<div :class="'UM_dropDown_plugIn_Box UM_dropDown_plugIn_Box_'+num">
	
</div>
</template>

<script>
export default {
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	props:['maxHeight'],
	mounted:function(){
		
	}
}
</script>

<style>
.UM_dropDown_plugIn_Box {width:200px; height:30px; background:red;}
</style>