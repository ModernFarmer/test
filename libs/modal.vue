<template>
<div :class="{
	um__modalInside__class:true,
	um__modalInside__ennte:showAnimation,
	um__modalInside__leave:!showAnimation
}" :style="{position, zIndex:index_z}" v-if="!first" v-show="showModal" @click="toExit">
	<div class="um__modalInside__mainBox" :style="widthObj" @click.stop>
		<b-button class="um__modalInside__button" type="9" circle v-if="closeDisabled!==false" @click="close">
			<span class="um__modalInside__textBtn">&times;</span>
		</b-button>
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	props:['value', 'back-disabled', 'close-disabled', 'width', 'inside'],
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
		},
		position:function(){
			if(this.inside!==undefined)return 'absolute';
			return 'fixed';
		}
	},
	watch:{
		value:function(val){
			if(val===true){
				this._$UMSTORE._uobj_zIndex_modalInside++;
				this.index_z=this._$UMSTORE._uobj_zIndex_modalInside;
				this.showModal=true;
				this.showAnimation=true;
				if(this.first)this.first=false;
			}else{
				this.showAnimation=false;
				this.$emit('close');
				setTimeout(()=>{
					this.showModal=false;
				}, 500);
			};
		}
	},
	methods:{
		close(){
			this.$emit('input', false);
		},
		toExit(){
			if(this.backDisabled!==undefined && this.backDisabled!==false)return;
			this.close();
		}
	}
}
</script>

<style>
.um__modalInside__class {width:100%; height:100%; background:rgba(0,0,0,.1); left:0; top:0;}
.um__modalInside__mainBox {min-width:40%; max-width:98%; min-height:40%; max-height:98%; background:white; border-radius:5px; box-shadow:0px 0px 10px gray; position:absolute; left:50%; top:25%; transform:translate(-50%, -25%); -webkit-transform:translate(-50%, -25%); -o-transform:translate(-50%, -25%); -moz-transform:translate(-50%, -25%); -ms-transform:translate(-50%, -25%);}
.um__modalInside__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modalInside__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modalInside__button {position:absolute; right:0; top:0; z-index:10;}
.um__modalInside__textBtn {font-size:18px; font-weight:900; line-height:18px;}
</style>