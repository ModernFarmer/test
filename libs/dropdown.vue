<template>
<div class="um__dropdown__class">
	<div class="um__dropdown__input" :id="'caption'+num">{{text}}</div>
	<div class="um__dropdown__icon"></div>
	<div class="um___dropdown__container" :id="'down'+num">
		<div class="um__dropdown__option" v-for="(val, index) in data" :key="'key'+num+'_'+index" @click="toSelect(val, index)">{{option?val[option]:val}}</div>
	</div>
</div>
</template>

<script>
export default {
	props:['data', 'icon', 'maxHeight', 'view', 'option', 'disabled', 'clearable', 'change'],
	data(){
		return {
			index_now:null,
			text:''
		}
	},
	computed:{
		num:function(){
			return '_um_dropdown_'+Math.ceil(Math.random()*100000000);
		}
	},
	methods:{
		toSelect(val, index){
			if(this.index_now===index)return;
			this.index_now=index;
			if(this.view){
				this.text=this.data[index][this.view];
				this.$emit('input', this.data[index][this.view]);
			}else{
				this.text=this.data[index];
				this.$emit('input', this.data[index]);
			};
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			let json={
			    caption:`#caption${this.num}`,
			    down:`#down${this.num}`,
			    speed:.2
			};
			if(this.maxHeight)json.maxHeight=this.maxHeight;
			_PullDown(json);
		});
	}
}
</script>

<style>
.um__dropdown__class {width:220px; height:30px; position:relative;}
.um__dropdown__input {width:calc(100% - 7px); height:calc(100% - 2px); line-height:30px; background:white; overflow:hidden; padding-left:5px; border-radius:3px; border:1px solid #c0c4cc;}
.um__dropdown__icon {width:30px; height:calc(100% - 4px); background:red; position:absolute; right:2px; top:2px; z-index:5;}
.um___dropdown__container {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; top:calc(100% + 5px);}
.um__dropdown__option {width:calc(100% - 10px); line-height:26px; padding-left:10px; cursor:pointer;}
.um__dropdown__option:hover {background:#f0f3f7;}
</style>