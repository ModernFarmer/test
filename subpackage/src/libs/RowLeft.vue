<template>
<div left :style="styleObj" v-on="$listeners">
	<slot></slot>
</div>
</template>

<script>
export default {
	props:['width'],
	computed:{
		styleObj:function(){
			if(Number(this.width) && Number(this.width)>0){
				return {width:`${this.width}%`}
			}else{
				return {};
			};
		}
	}
}
</script>