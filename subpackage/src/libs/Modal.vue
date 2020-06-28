<template>
<div :class="{icon:true, um__modalInside__class:true, um__modalInside__ennte:showAnimation, um__modalInside__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal" @click="toCloseModal">
	<div :class="{um__modalInside__mainBox:true, um__modalInside_main__ennte:showAnimation, um__modalInside_main__leave:!showAnimation}" @click.stop>
		<slot></slot>
	</div>
	<div :class="{um__modalInside__textBtn:true, um__modalInside_close__ennte:showAnimation, um__modalInside_close__leave:!showAnimation}" v-if="closeDisabled!==false" @click="closeModal">&times;</div>
</div>
</template>

<script>
export default {
	props:['value', 'back-disabled', 'close-disabled'],
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
		},
		toCloseModal(){
			if(this.backDisabled!==undefined && this.backDisabled!==false)return;
			this.closeModal();
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__modalInside__class {width:100%; height:100%; background:rgba(0,0,0,.3); position:absolute; left:0; top:0;}
.um__modalInside__mainBox {width:100%; height:60%; overflow-x:hidden; overflow-y:auto; background:white; border-radius:1rem 1rem 0 0; box-shadow:0px 0px 10px gray; position:absolute; left:0; bottom:-60%;}
.um__modalInside__mainBox::-webkit-scrollbar {display:none;}
.um__modalInside__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modalInside__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modalInside_main__ennte {animation:UM_SWITCH_BOTTOM_ON .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_ON .5s forwards;}
.um__modalInside_main__leave {animation:UM_SWITCH_BOTTOM_OFF .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_OFF .5s forwards;}
.um__modalInside_close__ennte {animation:UM_SWITCH_CLOSE_ON .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_ON .5s forwards;}
.um__modalInside_close__leave {animation:UM_SWITCH_CLOSE_OFF .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_OFF .5s forwards;}
.um__modalInside__textBtn {width:2rem; font-size:2rem; text-align:center; line-height:2.2rem; font-weight:900; overflow:hidden; color:#373737; position:absolute; right:-2rem; top:calc(40% - 2.3rem); z-index:1000000;}
</style>