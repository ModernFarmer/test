<template>
<div class="UM_alert_plugIn_Box1">
	<div :class="'UM_alert_plugIn_mainOutBox_public1 UM_alert_plugIn_mainOutBox1_'+num">
		<div :class="'UM_alert_plugIn_titleText_public1 UM_alert_plugIn_titleText1_'+num">&nbsp;&nbsp;{{title}}</div>
		<div class="UM_alert_plugIn_contentTextContainer_public1">
			<div :class="'UM_alert_plugIn_contentText_public1 UM_alert_plugIn_contentText1_'+num" v-html="html"></div>
		</div>
		<div class="UM_alert_plugIn_submitBtn_public1" v-show="isShowBtn" @click="toSubmit">确定</div>
		<div class="UM_alert_plugIn_cancelBtn_public1" v-show="isShowBtn" @click="toCancel">取消</div>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			isShowBtn:false
		}
	},
	props:['title', 'html'],
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	methods:{
		toSubmit(){
			this.$emit('resulted', true);
		},
		toCancel(){
			this.$emit('resulted', false);
		}
	},
	mounted:function(){
		if(this.$attrs.haveButton!==undefined)this.isShowBtn=true;
		_('.UM_alert_plugIn_titleText1_'+this.num).choosable();
		_Drag({
		    mousedownBox:_('.UM_alert_plugIn_titleText1_'+this.num, 0),
		    dragBox:_('.UM_alert_plugIn_mainOutBox1_'+this.num, 0)
		});
		_('.UM_alert_plugIn_contentText1_'+this.num, 0).center();
	}
}
</script>