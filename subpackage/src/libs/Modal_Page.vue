<template>
<div :class="{um__modalPage__class:true, um__modalPage__ennte:showAnimation, um__modalPage__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal">
	<slot></slot>
	<div :class="{um__modalPage__textBtn:true, um__modalPage_close__ennte:showAnimation, um__modalPage_close__leave:!showAnimation}" v-if="closeDisabled!==false" @click="closeModal">&times;</div>
</div>
</template>

<script>
export default {
	props:['value', 'close-disabled'],
	data(){
		return {
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			index_z:9999999, // 组件的层级
			showAnimation:false // 显示入场或出场动画
		}
	},
	watch:{
		value:function(val){
			if(val===true){
				this._$UMSTORE._uobj_zIndex_selectInside++;
				this.index_z=this._$UMSTORE._uobj_zIndex_selectInside;
				this.showModal=true;
				this.showAnimation=true;
				if(this.first)this.first=false;
			}
		}
	},
	methods:{
		closeModal(){
			this.showAnimation=false;
			this.$emit('close');
			this.$emit('input', false);
			setTimeout(()=>{
				this.showModal=false;
			}, 500);
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__modalPage__class {width:100%; height:100%; background:white; overflow-x:hidden; overflow-y:auto; box-shadow:0 0 .5rem rgba(0,0,0,.05); position:absolute; left:100%; top:0;}
.um__modalPage__ennte {animation:UM_SWITCH_PAGEENTER .5s forwards; -webkit-animation:UM_SWITCH_PAGEENTER .5s forwards;}
.um__modalPage__leave {animation:UM_SWITCH_PAGELEAVE .5s forwards; -webkit-animation:UM_SWITCH_PAGELEAVE .5s forwards;}
.um__modalPage_close__ennte {animation:UM_SWITCH_CLOSE_ON .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_ON .5s forwards;}
.um__modalPage_close__leave {animation:UM_SWITCH_CLOSE_OFF .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_OFF .5s forwards;}
.um__modalPage__textBtn {width:2rem; height:2rem; font-size:2rem; text-align:center; line-height:2rem; font-weight:900; overflow:hidden; color:#959595; position:absolute; right:-2rem; top:0; z-index:1000000;}
</style>