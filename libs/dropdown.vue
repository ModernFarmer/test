<template>
<div class="um__dropdown__class">
	<div class="um__dropdown__disabled" v-if="disabled!==undefined"></div>   <!-- 禁用遮罩 -->
	<div class="um__dropdown__input" :id="'caption'+num">
		<span>{{text}}</span>
		<div class="um__dropdown__icon"></div>
	</div>
	<div class="um___dropdown__container" :id="'down'+num">
		<div :class="{um__dropdown__option:true, um__dropdown__option__placeholder:index===0}" v-for="(val, index) in list" :key="'key'+num+'_'+index" @click="toSelect(val, index)">{{option?val[option]:val}}</div>
	</div>
</div>
</template>

<script>
export default {
	props:['list', 'icon', 'maxHeight', 'view', 'option', 'disabled', 'placeholder'],
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
				this.text=this.list[index][this.view];
				this.$emit('input', this.list[index][this.view]);
			}else{
				this.text=this.list[index];
				this.$emit('input', this.list[index]);
			};
			this.$emit('change', val, index);
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
.um__dropdown__class {width:220px; height:30px; color:#606266; position:relative;}
.um__dropdown__disabled {width:100%; height:100%; background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:0; top:0; z-index:10;}
.um__dropdown__input {width:calc(100% - 7px); height:calc(100% - 2px); font-size:14px; line-height:28px; background:white; overflow:hidden; padding-left:5px; border-radius:3px; border:1px solid #c0c4cc;}
.um__dropdown__icon {width:26px; height:calc(100% - 4px); background:white; position:absolute; right:2px; top:2px; z-index:5;}
.um___dropdown__container {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; top:calc(100% + 5px);}
.um__dropdown__option {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer;}
.um__dropdown__option:hover {background:#f0f3f7;}
.um__dropdown__option__placeholder {color:#c0c4cc;}
</style>