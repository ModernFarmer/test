<template>
<div class="UM_alert_plugIn_Box4">
	<div :class="'UM_alert_plugIn_mainOutBox_public4 UM_alert_plugIn_mainOutBox4_'+num">
		<div :class="'UM_alert_plugIn_titleText_public4 UM_alert_plugIn_titleText4_'+num">&nbsp;&nbsp;{{title}}</div>
		<div class="UM_alert_plugIn_contentTextContainer_public4">
			<div :class="'UM_alert_plugIn_contentText_public4 UM_alert_plugIn_contentText4_'+num" v-html="html"></div>
		</div>
		<div class="UM_alert_plugIn_submitBtn_public4" v-show="isShowBtn" @click="toSubmit">确定</div>
		<div class="UM_alert_plugIn_cancelBtn_public4" v-show="isShowBtn" @click="toCancel">取消</div>
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
		_('.UM_alert_plugIn_titleText4_'+this.num).choosable();
		_Drag({
		    mousedownBox:_('.UM_alert_plugIn_titleText4_'+this.num, 0),
		    dragBox:_('.UM_alert_plugIn_mainOutBox4_'+this.num, 0)
		});
		_('.UM_alert_plugIn_contentText4_'+this.num, 0).center();
	}
}
</script>