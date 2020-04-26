<template>
<div :class="{um__date__class_simple:!isRange, um__date__class_simple_range:isRange, [`um__date__lineH_${plugSize}`]:true, um__date__animationAble:!hoverFirse}" @mouseenter="hoverFirse=false" @click.once="first=false" @click.stop="toFocus">
	<div class="um__date__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div :class="`icon um__date__simpleIcon um__date__Icon_${plugSize}`" :style="{[iconObj.position]:'1px'}" v-html="iconObj.value"></div>
	<input :id="id" type="text" v-if="!isRange"
		:class="{[`um__date__fontSize_${plugSize}`]:true, 
				[`um__date__input_iconRight_${plugSize}`]:iconObj.position!=='left', 
				[`um__date__input_iconLeft_${plugSize}`]:iconObj.position==='left', 
				um__date__input_on:!isBlur && !isAlarm && !alarmBefore, 
				um__date__input_alarm_on:!isBlur && !isAlarm && alarmBefore, 
				um__date__input_off:isBlur && !first && !isAlarm && !alarmBefore, 
				um__date__input_alarm:isAlarm && !blurBefore, 
				um__date__input_blur_alarm:isAlarm && blurBefore}" 
				v-model="timeItem" @compositionstart="importing=true" @compositionend="importing=false">
	<div :class="{[`um__date__fontSize_${plugSize}`]:true, um__date__input_placeholder_right:!isRange && iconObj.position!=='left', um__date__input_placeholder_left:!isRange && iconObj.position==='left'}" v-show="!isRange && timeItem==='' && !importing">选择日期</div>
	<div :id="id" type="text" v-if="isRange"
		:class="{[`um__date__fontSize_${plugSize}`]:true, 
				um__date__input_long_iconRight:iconObj.position!=='left', 
				um__date__input_long_iconLeft:iconObj.position==='left', 
				um__date__input_on:!isBlur && !isAlarm && !alarmBefore, 
				um__date__input_alarm_on:!isBlur && !isAlarm && alarmBefore, 
				um__date__input_off:isBlur && !first && !isAlarm && !alarmBefore, 
				um__date__input_alarm:isAlarm && !blurBefore, 
				um__date__input_blur_alarm:isAlarm && blurBefore}">
		<input :class="`um__date__fontSize_${plugSize} um__date__rgInput_icon_${plugSize}`" type="text" v-model="startItem" @compositionstart="importing=true" @compositionend="importing=false">
		<div :class="{um__date__input_placeholder1_long_right:iconObj.position!=='left', um__date__input_placeholder1_long_left:iconObj.position==='left'}" v-show="startItem==='' && !importing">开始时间</div>
		<div class="um__date__class_split"><span class="um__date__class_position_split">-</span></div>
		<input :class="`um__date__fontSize_${plugSize} um__date__rgInput_icon_${plugSize}`" type="text" v-model="endItem" @compositionstart="importing=true" @compositionend="importing=false">
		<div :class="{um__date__input_placeholder2_long_right:iconObj.position!=='left', um__date__input_placeholder2_long_left:iconObj.position==='left'}" v-show="endItem==='' && !importing">结束时间</div>
	</div>
	<div :class="{um__date__input_textAlarm:true, um__date__input_text_showAnimation:isAlarm, um__date__input_text_hideAnimation:!isAlarm && !first}">{{alarmWord}}</div>
	<span :class="`um__date__align_${plugSize}`">0</span>   <!-- 对齐用; 本组件内其它元素都是绝对定位, 组件本身的display是inline-block, 如果不加一个合适line-height的文字内容则无法和有文字内容的其它inline-block元素对齐 -->
</div>
</template>

<script>
export default {
	props:['icon', 'disabled', 'rules', 'validateField', 'size', 'range'],
	data(){
		return {
			first:true, // 是否首次加载
			hoverFirse:true, // 是否首次鼠标移入
			blurBefore:true, // 标红之前的获取焦点状态, 用于优化展示动画
			alarmBefore:false, // 失去或获取焦点之前的标红状态, 用于优化展示动画
			isBlur:true, // 是否失去焦点状态
			isAlarm:false, // 是否标红
			alarmWord:'', // 验证失败的说明文字
			sizeArr:['default', 'big', 'small'], // 大小规格size数组, 用于检测size是否正确
			importing:false, // 是否中文输入法时的输入中状态

			timeItem:'', // 选择日期输入框绑定值
			startItem:'', // 开始时间输入框绑定值
			endItem:'',  // 结束时间输入框绑定值
		}
	},
	computed:{
		id:function(){
			return '_um_input_'+Math.ceil(Math.random()*100000000);
		},
		isCover:function(){ // 是否显示禁用遮罩
			if(this.disabled==='' || this.disabled==='true' || this.disabled===true){
				return true;
			}else{
				return false;
			};
		},
		isRange:function(){
			if(this.range==='' || this.range==='true' || this.range===true){
				return true;
			}else{
				return false;
			};
		},
		iconObj:function(){ // icon的值和位置
			if(this.icon){
				let arr=this.icon.split('|');
				if(arr[0].replace(/\s+/g, '')==='')arr[0]='&#xe600;';
				if(arr.length>1){
					return {value:arr[0], position:arr[1]};
				}else{
					return {value:arr[0], position:'right'}
				};
			}else{
				return {value:'&#xe600;',position:'right'};
			};
		},
		verifying:function(){
			return this.rules!==undefined && this.validateField!==undefined && this.rules[this.validateField]!==undefined;
		},
		plugSize:function(){
			if(this.size===undefined){
				return 'default';
			}else{
				if(this.sizeArr.indexOf((this.size+'').replace(/\s+/g, ''))===-1){
					return 'default';
				}else{
					return (this.size+'').replace(/\s+/g, '');
				};
			};
		}
	},
	methods:{
		toBlur(){ // 失去焦点
			if(this){
				this.blurBefore=this.isBlur;
				this.isBlur=true;
				if(this.verifying){
					this.toVerifySimple();
				}else{
					this.toNomal();
				};
			}
		},
		toFocus(){ // 获取焦点
			if(this._$UMSTORE._uobj_date.nowConditionId_date!==null && this._$UMSTORE._uobj_date.nowConditionId_date!==this.id && this._$UMSTORE._uobj_date.nowConditionObj_date!==null)this._$UMSTORE._uobj_date.nowConditionObj_date.toBlur();
			this.blurBefore=this.isBlur;
			this.isBlur=false;
			this.toNomal();
			this._$UMSTORE._uobj_date.nowConditionId_date=this.id;
			this._$UMSTORE._uobj_date.nowConditionObj_date=this;
		},
		toRed(){ // 框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=true;
		},
		toNomal(){ // 取消框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=false;
		},
		toVerifySimple(){
			if(!this.verifying)return;
			let success=true;
			for(let i=0; i<this.rules[this.validateField].length; i++){
				let res=this._$UMSTORE.rules[this.rules[this.validateField][i].split('|')[0]](eval(this.id).value);
				if(!res){
					success=false;
					this.alarmWord=this.rules[this.validateField][i].split('|')[1];
					break;
				}
			};
			if(success){
				this.toNomal();
			}else{
				this.toRed();
			};
		}
	},
	mounted:function(){
		_(document).BD('click', this.toBlur);
		if(this.verifying){
			this.$watch(function(){
				return this.rules[__umVerify];
			}, function(){
				if(this.rules[__umVerifyResult][this.validateField].success){
					this.toNomal();
				}else{
					this.alarmWord=this.rules[__umVerifyResult][this.validateField].value;
					this.toRed();
				};
			});
		}
	},
	beforeDestroy(){
		_(document).unBD('click', this.toBlur);
	}
}
</script>

<style>
.um__date__class_simple {width:180px; min-width:100px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; display:inline-block; cursor:pointer; position:relative;}
.um__date__class_simple_range {width:320px; min-width:200px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; display:inline-block; cursor:pointer; position:relative;}
.um__date__lineH_default {height:26px; line-height:26px;}
.um__date__lineH_big {height:32px; line-height:32px;}
.um__date__lineH_small {height:20px; line-height:20px;}
.um__date__animationAble {animation:UM_BORDERFRAME_OUT .5s forwards; -webkit-animation:UM_BORDERFRAME_OUT .5s forwards; -o-animation:UM_BORDERFRAME_OUT .5s forwards; -moz-animation:UM_BORDERFRAME_OUT .5s forwards; -ms-animation:UM_BORDERFRAME_OUT .5s forwards;}
.um__date__animationAble:hover {animation:UM_BORDERFRAME_HOVER .5s forwards; -webkit-animation:UM_BORDERFRAME_HOVER .5s forwards; -o-animation:UM_BORDERFRAME_HOVER .5s forwards; -moz-animation:UM_BORDERFRAME_HOVER .5s forwards; -ms-animation:UM_BORDERFRAME_HOVER .5s forwards;}
.um__date__input_iconRight_default {width:calc(100% - 34px); height:24px; line-height:24px; padding-left:5px; padding-right:29px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_iconRight_big {width:calc(100% - 34px); height:30px; line-height:30px; padding-left:5px; padding-right:29px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_iconRight_small {width:calc(100% - 34px); height:18px; line-height:18px; padding-left:5px; padding-right:29px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_long_iconRight {width:calc(100% - 34px); height:100%; padding-left:5px; padding-right:29px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_iconLeft_default {width:calc(100% - 34px); height:24px; line-height:24px; padding-left:29px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_iconLeft_big {width:calc(100% - 34px); height:30px; line-height:30px; padding-left:29px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_iconLeft_small {width:calc(100% - 34px); height:18px; line-height:18px; padding-left:29px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__rgInput_icon_default {width:calc(50% - 12px); height:24px; line-height:24px; text-align:center; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:relative; top:-1px; z-index:5;}
.um__date__rgInput_icon_big {width:calc(50% - 12px); height:30px; line-height:30px; text-align:center; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:relative; top:-1px; z-index:5;}
.um__date__rgInput_icon_small {width:calc(50% - 12px); height:18px; line-height:18px; text-align:center; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; cursor:pointer; background:transparent; position:relative; top:-1px; z-index:5;}
.um__date__input_placeholder_right {height:100%; color:#c0c4cc; cursor:pointer; position:absolute; left:5px; top:0;}
.um__date__input_placeholder_left {height:100%; color:#c0c4cc; cursor:pointer; position:absolute; left:29px; top:0;}
.um__date__input_placeholder1_long_right {width:calc(50% - 27px); height:100%; text-align:center; outline:none; color:#c0c4cc; cursor:pointer; position:absolute; left:5px; top:0;}
.um__date__input_placeholder2_long_right {width:calc(50% - 27px); height:100%; text-align:center; outline:none; color:#c0c4cc; cursor:pointer; position:absolute; left:calc(50% - 2px); top:0;}
.um__date__input_placeholder1_long_left {width:calc(50% - 27px); height:100%; text-align:center; outline:none; color:#c0c4cc; cursor:pointer; position:absolute; left:30px; top:0;}
.um__date__input_placeholder2_long_left {width:calc(50% - 27px); height:100%; text-align:center; outline:none; color:#c0c4cc; cursor:pointer; position:absolute; left:calc(50% + 22px); top:0;}
.um__date__input_long_iconLeft {width:calc(100% - 34px); height:100%; padding-left:29px; padding-right:5px; outline:none; color:#606266; border:1px solid transparent; border-radius:3px; background:transparent; position:absolute; left:-1px; top:-1px;}
.um__date__input_on {animation:UM_BORDERFRAME_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_CHOOSED .5s forwards;}
.um__date__input_alarm_on {animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards;}
.um__date__input_off {animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards;}
.um__date__input_alarm {animation:UM_BORDERFRAME_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM .5s forwards;}
.um__date__input_blur_alarm {animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards;}
.um__date__class_split {width:20px; display:inline-block; text-align:center;}
.um__date__class_position_split {position:relative; top:-2px;}
.um__date__disabled {width:calc(100% + 2px); height:calc(100% + 2px); background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:-1px; top:-1px; z-index:10;}
.um__date__simpleIcon {width:24px; color:#c0c4cc; text-align:center; -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none; position:absolute; top:1px; z-index:5;}
.um__date__Icon_default {height:24px; line-height:26px; font-size:14px;}
.um__date__Icon_big {height:30px; line-height:31px; font-size:16px;}
.um__date__Icon_small {height:19px; line-height:20px; font-size:12px;}
.um__date__fontSize_default {font-size:12px;}
.um__date__fontSize_big {font-size:14px;}
.um__date__fontSize_small {font-size:10px;}
.um__date__input_textAlarm {width:calc(100% - 5px); line-height:18px; font-size:10px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:red; position:absolute; left:5px; top:100%;}
.um__date__input_text_showAnimation {animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards;}
.um__date__input_text_hideAnimation {animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards;}
.um__date__align_default {line-height:26px; opacity:0}
.um__date__align_big {line-height:32px; opacity:0}
.um__date__align_small {line-height:20px; opacity:0}
</style>