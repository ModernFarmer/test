<template>
<div class="icon um__scrollLoad__class" :style="heightObj" @scroll="toScrollLoad($event)">
	<slot></slot>
</div>
</template>

<script>
export default {
	props:['height', 'value'],
	data(){
		return {
			isScenicBottom:false
		}
	},
	computed:{
		id:function(){
			return 'scrollLoad_'+Math.ceil(Math.random()*1000000);
		},
		heightObj:function(){
			if(this.height!==undefined){
				return {height:this.height}
			}else{
				return {height:'100%'}
			};
		}
	},
	methods:{
		toScrollLoad(e){
			let dom=e.target;
			let 滚动条总高度=dom.scrollHeight,
				滚动条到顶端距离=dom.scrollTop,
				滚动容器视图高度=dom.clientHeight;
			if(滚动容器视图高度+滚动条到顶端距离==滚动条总高度-1 || 滚动容器视图高度+滚动条到顶端距离==滚动条总高度){
				if(this.value){
					clearTimeout(window[`um_timer_bottom_${this.id}`]); // 防止重复触发滚动事件
					window[`um_timer_bottom_${this.id}`]=setTimeout(()=>{
						this.$Alert('已经到底了!');
					}, 300);
				}else{
					clearTimeout(window[`um_timer_load_${this.id}`]); // 防止重复触发滚动事件
					window[`um_timer_load_${this.id}`]=setTimeout(()=>{
						this.$emit('load');
					}, 300);
				};
			}
		}
	}
}
</script>

<style>
.um__scrollLoad__class {width:100%; overflow-y:auto; position:relative;}
.um__scrollLoad__class::-webkit-scrollbar {display:none;}
</style>