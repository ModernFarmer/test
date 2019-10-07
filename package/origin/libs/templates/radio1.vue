<template>
<div :class="'UM_radio_plugIn_Box UM_radio_plugIn_Box1_'+num" @click="toChange">
	<div class="UM_radio_plugIn_Box_cover" v-on="$listeners"></div>
	<div class="UM_radio_plugIn_radioBox_public1">      <!-- 自定义radio外框 -->
		<div class="UM_radio_plugIn_radioBox_checked_public1" v-show="isChecked"></div>      <!-- 自定义radio被选中标记 -->
	</div>
	<div :class="'UM_radio_plugIn_describe_public1 UM_radio_plugIn_describe_public1_'+num" v-show="isShowValue">     <!-- 选项名称框 -->
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			inputValue:'',
			isChecked:false,
			isShowValue:true
		}
	},
	props:['result'],
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	methods:{
		toChange(event){
			this.$emit('update:result', this.inputValue);
		}
	},
	mounted:function(){
		_('.UM_radio_plugIn_Box1_'+this.num).setH('.UM_radio_plugIn_Box1_'+this.num, {lineHeight:1});

		this.inputValue=_('.UM_radio_plugIn_describe_public1_'+this.num, 0).el.textContent;

		if(this.$attrs.hiddenContent!=undefined){
			this.isShowValue=false;
		}
		if(this.$attrs.checked!=undefined){
			this.isChecked=true;
			this.$emit('update:result', this.inputValue);
		}else{
			if(this.result==this.inputValue){
				this.isChecked=true;
			}else{
				this.isChecked=false;
			};
		};
	},
	updated:function(){
		this.inputValue=_('.UM_radio_plugIn_describe_public1_'+this.num, 0).el.textContent;

		if(this.result==this.inputValue){
			this.isChecked=true;
		}else{
			this.isChecked=false;
		};
	}
}
</script>