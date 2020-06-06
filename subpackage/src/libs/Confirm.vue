<template>
<div :class="{icon:true, um__confirm__class:true, um__confirm__ennte:showAnimation, um__confirm__leave:!showAnimation}" v-if="!first" v-show="showModal" @click="closeModal">
	<div :class="{um__confirm__mainBox:true, um__confirm_main__ennte:showAnimation, um__confirm_main__leave:!showAnimation}" @click.stop>
		<div class="um__confirm__contentBox" :style="styleObj">
			<slot></slot>
		</div>
		<div class="um__confirm__btnBox">
			<um-button class="um__confirm__button1" type="gray" size="small" @click="toDo">确定</um-button>
			<um-button class="um__confirm__button2" type="gray" size="small" @click="closeModal">取消</um-button>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:['value', 'align', 'closelose'],
	data(){
		return {
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			showAnimation:false // 显示入场或出场动画
		}
	},
	computed:{
		styleObj:function(){
			if(this.align==='left' || this.align==='right'){
				return {textAlign:this.align};
			}else{
				return {textAlign:'center'};
			};
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
		toDo(){
			this.$emit('confirm');
			if(this.closelose===undefined)this.closeModal();
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__confirm__class {width:100%; height:100%; background:rgba(0,0,0,.3); position:fixed; left:0; top:0; z-index:9999999;}
.um__confirm__mainBox {width:70%; background:white; border-radius:.5rem; box-shadow:0 0 3rem gray; position:absolute; left:15%; top:30%; transform:translate(0, -30%); -webkit-transform:translate(0, -30%);}
.um__confirm__contentBox {width:calc(100% - 2rem); max-height:27.5rem; padding:1.5rem 1rem; font-size:1.2rem; line-height:1.8rem; position:relative;}
.um__confirm__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__confirm__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__confirm_main__ennte {animation:UM_SWITCH_CONFIRM_ON .5s forwards; -webkit-animation:UM_SWITCH_CONFIRM_ON .5s forwards;}
.um__confirm_main__leave {animation:UM_SWITCH_CONFIRM_OFF .5s forwards; -webkit-animation:UM_SWITCH_CONFIRM_OFF .5s forwards;}
.um__confirm__btnBox {width:100%; height:3rem; line-height:3rem; text-align:center;}
.um__confirm__button1 {width:7.5rem; font-size:.8rem; margin-right:1rem;}
.um__confirm__button2 {width:7.5rem; font-size:.8rem;}
</style>