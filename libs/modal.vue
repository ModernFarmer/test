<template>
<div id="rrdd" :class="{um__modal__class:true, um__modal__ennte:showAnimation, um__modal__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal" @click="toCloseModal">
	<div class="um__modal__mainBox" :style="widthObj" @click.stop>
		<um-button class="um__modal__button" type="9" circle v-if="closeDisabled!==false" @click="closeModal">
			<span class="um__modal__textBtn">&times;</span>
		</um-button>
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	props:['value', 'back-disabled', 'close-disabled', 'width'],
	data(){
		return {
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			index_z:9999999, // 组件的层级
			showAnimation:false // 显示入场或出场动画
		}
	},
	computed:{
		widthObj:function(){
			if(this.width===undefined)return {};
			return {width:this.width};
		}
	},
	watch:{
		value:function(val){
			this.index_z+=1;
			if(val===true){
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
.um__modal__class {width:100%; height:100%; background:rgba(0,0,0,.1); position:absolute; left:0; top:0;}
.um__modal__mainBox {min-width:40%; max-width:98%; min-height:40%; max-height:98%; background:white; border-radius:5px; box-shadow:0px 0px 10px gray; position:absolute; left:50%; top:25%; transform:translate(-50%, -25%); -webkit-transform:translate(-50%, -25%); -o-transform:translate(-50%, -25%); -moz-transform:translate(-50%, -25%); -ms-transform:translate(-50%, -25%);}
.um__modal__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modal__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modal__button {position:absolute; right:0; top:0; z-index:10;}
.um__modal__textBtn {font-size:18px; font-weight:900; line-height:18px;}
</style>