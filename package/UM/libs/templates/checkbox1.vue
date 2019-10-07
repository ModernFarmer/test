<template>
<div :class="'UM_checkbox_plugIn_Box UM_checkbox_plugIn_Box1_'+num" @click="toChange">
	<div class="UM_checkbox_plugIn_Box_cover" v-on="$listeners"></div>
	<div class="UM_checkbox_plugIn_radioBox_public1">      <!-- 自定义radio外框 -->
		<div class="UM_checkbox_plugIn_checkboxBox_checked_public1" v-show="isChecked"></div>      <!-- 自定义radio被选中标记 -->
	</div>
	<div :class="{UM_checkbox_plugIn_describe_public:isShowValue, UM_checkbox_plugIn_describe_hidden_public:!isShowValue, ['UM_checkbox_plugIn_describe_public1_'+num]:true}">     <!-- 选项名称框 -->
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			value:'',
			isChecked:false,
			isShowValue:true
		}
	},
	props:['choose', 'result'],
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	watch:{
		'choose':function(_boolean){
			if(_boolean){
				if(!this.isChecked)this.result.push(this.value);
			}else{
				this.result.splice(this.result.indexOf(this.value), 1);
			};
		}
	},
	methods:{
		toChange(){
			if(this.isChecked){
				this.result.splice(this.result.indexOf(this.value), 1);
			}else{
				this.result.push(this.value);
			};
		}
	},
	mounted:function(){
		_('.UM_checkbox_plugIn_Box1_'+this.num).setH('.UM_checkbox_plugIn_Box1_'+this.num, {lineHeight:1});

		this.value=_('.UM_checkbox_plugIn_describe_public1_'+this.num, 0).el.textContent;

		if(this.$attrs.hiddenContent!=undefined){
			this.isShowValue=false;
		}

		if(this.$attrs.checked!=undefined){
			if(this.result.indexOf(this.value)==-1)this.result.push(this.value);
		}

		if(this.result.indexOf(this.value)!=-1){
			this.isChecked=true;
		}else{
			this.isChecked=false;
		};
	},
	updated:function(){
		this.value=_('.UM_checkbox_plugIn_describe_public1_'+this.num, 0).el.textContent;

		if(this.result.indexOf(this.value)!=-1){
			this.isChecked=true;
		}else{
			this.isChecked=false;
		};
	}
}
</script>