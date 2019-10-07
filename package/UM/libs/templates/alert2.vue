<template>
<div class="UM_alert_plugIn_Box2">
	<div :class="'UM_alert_plugIn_mainOutBox_public2 UM_alert_plugIn_mainOutBox2_'+num">
		<div :class="'UM_alert_plugIn_titleText_public2 UM_alert_plugIn_titleText2_'+num">&nbsp;&nbsp;{{title}}</div>
		<div class="UM_alert_plugIn_contentTextContainer_public2">
			<div :class="'UM_alert_plugIn_contentText_public2 UM_alert_plugIn_contentText2_'+num" v-html="html"></div>
		</div>
		<div class="UM_alert_plugIn_submitBtn_public2" v-show="isShowBtn" @click="toSubmit">确定</div>
		<div class="UM_alert_plugIn_cancelBtn_public2" v-show="isShowBtn" @click="toCancel">取消</div>
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
		_('.UM_alert_plugIn_titleText2_'+this.num).choosable();
		_Drag({
		    mousedownBox:_('.UM_alert_plugIn_titleText2_'+this.num, 0),
		    dragBox:_('.UM_alert_plugIn_mainOutBox2_'+this.num, 0)
		});
		_('.UM_alert_plugIn_contentText2_'+this.num, 0).center();
	}
}
</script>