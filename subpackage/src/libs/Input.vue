<template>
<div class="icon um__input__class" :style="widthObj">
	<input :type="inputType" class="um__input__inputClass" v-bind="$attrs" v-on="inputEvent">
	<span style="opacity:0">0</span>  <!-- 这里是为了适应display-inline-bloc的line-height -->
</div>
</template>

<script>
export default {
	props:['type', 'width'],
	data(){
		return {
			down:false,
			textDefaultShow:false
		}
	},
	computed:{
		widthObj:function(){
			if(Number(this.width)){
				return {width:this.width+'rem'};
			}else{
				return {}
			};
		},
		inputType:function(){
			if(this.type==='password')return 'password';
			return 'text';
		},
		inputEvent:function(){
			return Object.assign({}, this.$listeners, {
				input:function(event){
					this.$emit('input', event.target.value);
				}.bind(this)
			});
		}
	}
}
</script>

<style>
.um__input__class {width:15rem; height:2rem; line-height:calc(2rem + 2px); font-size:1rem; display:inline-block; position:relative;}
.um__input__inputClass {width:100%; height:calc(100% - 2px); border:none; outline:none; background:transparent; position:absolute; left:0; top:0;}
.um__input__inputClass::-webkit-input-placeholder {color: #bebebe;}
</style>