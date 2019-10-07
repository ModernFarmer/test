<template>
<div class="UM_alert_plugIn_Box">
	<div :class="'UM_alert_plugIn_mainOutBox_public UM_alert_plugIn_mainOutBox_'+num">
		<div :class="'UM_alert_plugIn_titleText_public UM_alert_plugIn_titleText_'+num">&nbsp;&nbsp;{{title}}</div>
		<div class="UM_alert_plugIn_contentTextContainer_public">
			<div :class="'UM_alert_plugIn_contentText_public UM_alert_plugIn_contentText_'+num" v-html="html"></div>
		</div>
		<div class="UM_alert_plugIn_submitBtn_public" v-show="isShowBtn" @click="toSubmit">确定</div>
		<div class="UM_alert_plugIn_cancelBtn_public" v-show="isShowBtn" @click="toCancel">取消</div>
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
		_('.UM_alert_plugIn_titleText_'+this.num).choosable();
		_Drag({
		    mousedownBox:_('.UM_alert_plugIn_titleText_'+this.num, 0),
		    dragBox:_('.UM_alert_plugIn_mainOutBox_'+this.num, 0)
		});
		_('.UM_alert_plugIn_contentText_'+this.num, 0).center();
	}
}
</script>