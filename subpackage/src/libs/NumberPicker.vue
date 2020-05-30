<template>
<div class="um__numberpicker__class">
	<div class="um__numberpicker__disabled" v-if="isDisabled"></div>
	<div :class="{um__numberpicker__btnLeft:true, um__numberpicker__down:this.down_min, um__numberpicker__btnDisabled:isDisabled}" @touchstart="toDown_min" @click="toMin">-</div>
	<div :class="{um__numberpicker__btnRight:true, um__numberpicker__down:this.down_add, um__numberpicker__btnDisabled:isDisabled}" @touchstart="toDown_add" @click="toAdd">+</div>
	<div class="um__numberpicker__value">{{num}}</div>
</div>
</template>

<script>
export default {
	props:['min', 'max', 'value', 'disabled'],
	data(){
		return {
			num:0,
			down_add:false,
			down_min:false,
		}
	},
	computed:{
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
		},
		minNum:function(){
			if(Math.ceil(this.min)===Math.floor(this.min))return Math.ceil(this.min);
			return null;
		},
		maxNum:function(){
			if(Math.ceil(this.max)===Math.floor(this.max)){
				if(this.minNum!==null && Math.ceil(this.max)<this.minNum)return this.minNum;
				return Math.ceil(this.max);
			}
			return null;
		}
	},
	watch:{
		value:function(val){
			this.toWatch();
		}
	},
	methods:{
		toMin(){
			if(this.minNum!==null){
				if(this.num>=this.minNum+1){
					this.num--;
					this.$emit('input', this.num);
				}
			}else{
				this.num--;
				this.$emit('input', this.num);
			};
		},
		toAdd(){
			if(this.maxNum!==null){
				if(this.num<=this.maxNum-1){
					this.num++;
					this.$emit('input', this.num);
				}
			}else{
				this.num++;
				this.$emit('input', this.num);
			};
		},
		toWatch(){
			if(this.num==this.value)return;
			let val=Math.ceil(this.value), val1=Math.floor(this.value);
			if(val===val1){
				if(this.minNum!==null && val<=this.minNum)val=this.minNum;
				if(this.maxNum!==null && val>=this.maxNum)val=this.maxNum;
				this.num=val;
			}else{
				this.num=0;
			};
		},
		toDown_min(){
			this.down_min=true;
		},
		toDown_add(){
			this.down_add=true;
		},
		toUp(){
			this.down_add=false;
			this.down_min=false;
		},
		BD(eventName, fn, target){
			if(target.addEventListener){
				target.addEventListener(eventName, fn, false);
			}else if(target.attachEvent){
				target.attachEvent('on'+eventName,fn);
			}else{
				target['on'+eventName]=fn;
			};
		},
		unBD(eventName, fn, target){
			if(target.attachEvent){
				target.detachEvent('on'+eventName,fn);
			}else{
				target.removeEventListener(eventName,fn,false);
			};
		}
	},
	mounted:function(){
		this.toWatch();
		this.BD('touchend', this.toUp, document);
	},
	beforeDestroy:function(){
		this.unBD('touchend', this.toUp, document);
	}
}
</script>

<style>
.um__numberpicker__class {width:7.4rem; height:2.2rem; line-height:2.2rem; text-align:center; position:relative;}
.um__numberpicker__disabled {width:100%; height:100%; border-radius:1.1rem; background:rgba(0,0,0,.1); position:absolute; left:0; top:0; z-index:10;}
.um__numberpicker__btnLeft {width:2.2rem; height:2.2rem; background-image:linear-gradient(to right, #10bafb, #4486ec); border-radius:50%; position:absolute; left:0; top:0;}
.um__numberpicker__btnRight {width:2.2rem; height:2.2rem; background-image:linear-gradient(to right, #10bafb, #4486ec); border-radius:50%; position:absolute; right:0; top:0;}
.um__numberpicker__down {background-image:linear-gradient(to right, #4486ec, #10bafb);}
.um__numberpicker__btnDisabled {background:#d5d5d5;}
.um__numberpicker__value {width:3rem; height:2.2rem; position:absolute; left:2.2rem; top:0;}
</style>