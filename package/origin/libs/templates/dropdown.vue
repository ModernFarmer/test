<template>
<div :class="'UM_dropDown_plugIn_Box UM_dropDown_plugIn_Box_'+num">
	<slot name="caption"></slot>
	<div :class="'UM_dropDown_plugIn_contentBox_public UM_dropDown_plugIn_contentBox_'+num">
		<slot name="content"></slot>
	</div>
</div>
</template>

<script>
export default {
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	props:['maxHeight'],
	mounted:function(){
		_('.UM_dropDown_plugIn_Box_'+this.num).setH('.UM_dropDown_plugIn_Box_'+this.num, {lineHeight:.98});

		_PullDown({
		    caption:_('.UM_dropDown_plugIn_Box_'+this.num, 0),　　　//　标题选择器　　selector
		    down:_('.UM_dropDown_plugIn_contentBox_'+this.num, 0),　　　//　下拉内容选择器　　selector
		    speed:.2,　　　//　速度(在几秒内完成过渡)
		    maxHeight:this.maxHeight?this.maxHeight:null
		}, '1a');
	},
	updated:function(){
		_('.UM_dropDown_plugIn_Box_'+this.num).setH('.UM_dropDown_plugIn_Box_'+this.num, {lineHeight:.98});
		
		_PullDown({
		    caption:_('.UM_dropDown_plugIn_Box_'+this.num, 0),　　　//　标题选择器　　selector
		    down:_('.UM_dropDown_plugIn_contentBox_'+this.num, 0),　　　//　下拉内容选择器　　selector
		    speed:.2,　　　//　速度(在几秒内完成过渡)
		    maxHeight:this.maxHeight?this.maxHeight:null
		}, '2b');
	}
}
</script>