<template>
<div :class="'UM_title_dropDown_plugIn_Box3_'+num">
	<slot name="title"></slot>		<!-- 标题 -->
	<div :class="'UM_title_dropDown_plugIn_captionBox_public3 UM_title_dropDown_plugIn_captionBox3_'+num">
		<slot name="caption"></slot>      <!-- 选择的选项 -->
		<div class="UM_title_dropDown_plugIn_arrow3"></div>    <!-- 向下箭头 -->
		<div :class="'UM_title_dropDown_optionBox_public3 UM_title_dropDown_optionBox3_'+num">      <!-- 下拉框 -->
			<slot name="content"></slot>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:['maxHeight'],
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	mounted:function(){
		_('.UM_title_dropDown_plugIn_Box3_'+this.num).setH('.UM_title_dropDown_plugIn_Box3_'+this.num, {lineHeight:.95});

		_PullDown({
		    caption:_('.UM_title_dropDown_plugIn_captionBox3_'+this.num, 0),　　　//　标题选择器　　selector
		    down:_('.UM_title_dropDown_optionBox3_'+this.num, 0),　　　//　下拉内容选择器　　selector
		    speed:.2,　　　//　速度(在几秒内完成过渡)
		    maxHeight:this.maxHeight?this.maxHeight:null
		}, '1a');
	},
	updated:function(){
		_('.UM_title_dropDown_plugIn_Box3_'+this.num).setH('.UM_title_dropDown_plugIn_Box3_'+this.num, {lineHeight:.95});

		_PullDown({
		    caption:_('.UM_title_dropDown_plugIn_captionBox3_'+this.num, 0),　　　//　标题选择器　　selector
		    down:_('.UM_title_dropDown_optionBox3_'+this.num, 0),　　　//　下拉内容选择器　　selector
		    speed:.2,　　　//　速度(在几秒内完成过渡)
		    maxHeight:this.maxHeight?this.maxHeight:null
		}, '1a');
	}
}
</script>