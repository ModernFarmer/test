<template>
<div class="icon um__button__class">
	<div :class="{[`um__button_disableClass_${btnSize}`]:true, um__button_circel:isCircle}" :style="{padding:isCircle?'0':'0 1rem'}" v-if="isDisabled">
		<slot></slot>
		<span class="um__button__defaultText" v-if="textDefaultShow">0</span>
	</div>
	<div :class="{[`um__button__class__simple_${fontType}`]:true, [`um__button__class__size_${btnSize}`]:true, [`um__button_disable_${btnSize}`]:true, um__button_circel:isCircle, [`um__button__class__down_${fontType}`]:down}" :style="{padding:isCircle?'0':'0 1rem'}" v-on="listeners">
		<slot></slot>
		<span class="um__button__defaultText" v-if="textDefaultShow">0</span>
	</div>
</div>
</template>

<script>
export default {
	props:['disabled', 'circle', 'type', 'size'],
	data(){
		return {
			down:false,
			textDefaultShow:false
		}
	},
	computed:{
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
		},
		isCircle:function(){
			return this.circle==='' || this.circle==='true' || this.circle===true;
		},
		listeners:function(){
			return Object.assign({
				touchstart:function(){ // 鼠标按下状态回调
					if(!this.isDisabled)this.down=true;
				}.bind(this),
				'~mouseenter':function(){ // 取消首次加载状态
					this.first=false;
				}.bind(this)
			}, this.$listeners);
		},
		fontType:function(){
			if(this.type==='gray')return 'gray';
			if(this.type==='orange')return 'orange';
			return 'default';
		},
		btnSize:function(){
			if(this.size==='small')return 'small';
			return 'nomal';
		}
	},
	methods:{
		toMouseup(){ // 鼠标抬起状态回调
			this.down=false;
		}
	},
	mounted:function(){
		if(Object.keys(this.$slots).length===0)this.textDefaultShow=true;
		_BD('touchend', this.toMouseup, document);
	},
	beforeDestroy:function(){
		_unBD('touchend', this.toMouseup, document);
	}
}
</script>

<style>
.um__button__class {display:inline-block; -webkit-user-select:none; user-select:none; position:relative;}
.um__button_disableClass_nomal {height:3rem; line-height:3rem; background:#d7d7d7; color:white; border-radius:1.4rem; position:absolute; top:0; left:0; z-index:5;}
.um__button_disableClass_small {height:2rem; line-height:2rem; background:#d7d7d7; color:white; border-radius:0.9rem; position:absolute; top:0; left:0; z-index:5;}
.um__button__class__simple_default {text-align:center; color:white; border:1px solid #10bafb; background-image:linear-gradient(to right, #10bafb, #4486ec);}
.um__button__class__simple_orange {text-align:center; color:white; border:1px solid #ffa801; background-image:linear-gradient(to right, #ffa801, #ff9343);}
.um__button__class__simple_gray {text-align:center; color:#686868; border:1px solid #aeb4ba; background:white;}
.um__button__class__size_nomal {height:calc(3rem - 2px); line-height:calc(3rem - 1px); border-radius:1.5rem;}
.um__button__class__size_small {height:calc(2rem - 2px); line-height:calc(2rem - 1px); border-radius:1rem;}
.um__button__class__down_default {background-image:linear-gradient(to right, #4486ec, #10bafb);}
.um__button__class__down_orange {background-image:linear-gradient(to right, #ff9343, #ffa801);}
.um__button__class__down_gray {background:#686868; color:white;}
.um__button_circel {width:3rem !important;}
.um__button__defaultText {opacity:0;}
</style>