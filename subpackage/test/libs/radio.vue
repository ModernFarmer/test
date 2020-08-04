<template>
<div class="um__radio__class" @mouseenter="toEnter" @mouseleave="toLeave" @click="toSlectOption">
	<div class="um__radio__cover" v-if="isDisabled"></div>
	<div :class="{um__radio__frame:true, um__radio__borderAnimation_out:!isMouseOn && !first_border, um__radio__borderAnimation_hover:isMouseOn}">
		<div :class="{icon:true, um__radio__alert:!isDisabled, um__radio__desAlert:isDisabled, um__radio__alertAnimation0:!isOn && !first_alert, um__radio__alertAnimation1:isOn}">
			<div :class="{um__radio__pointe:!isDisabled, um__radio__desPointe:isDisabled}"></div>
			<span class="um__radio__position">&#xe8dd;</span>
		</div>
	</div>
	<span class="um__radio__defaultText" v-if="!isHideOption">0</span>
	<span :class="{um__radio__disabled:isDisabled}" style="font-size:14px">
		<slot></slot>
	</span>
	<span class="um__radio__defaultText" v-if="!isHideOption">0</span>
</div>
</template>

<script>
export default {
	props:['value', 'disabled', 'clearable', 'option', 'value', 'model', 'keyword'],
	data(){
		return {
			first_border:true, // 是否首次加载
			first_alert:true, // 是否首次加载
			textDefaultShow:false, // 是否渲染对齐用透明字体
			isMouseOn:false, // 鼠标是否在组件内
			isOn:false, // 是否选中状态
			isWatching:true // 是否监听本组件value变化
		}
	},
	computed:{
		isHideOption(){
			return Object.keys(this.$slots).length===0;
		},
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
		},
		isClearable:function(){
			return this.clearable==='' || this.clearable==='true' || this.clearable===true;
		}
	},
	watch:{
		value:function(val){
			if(!this.isWatching)return;
			if(val===null)return;

			let obj=this.__getItem();
			if(!obj.keyword.path){
				if(obj.model.value===val){
					if(this.first_border)this.first_border=false;
					if(this.first_alert)this.first_alert=false;
					if(!this.isOn)this.isOn=true;
				}else{
					if(this.isOn)this.isOn=false;
				};
			}else{
				let realPath='';
				if(typeof obj.model.value==='string' || typeof obj.model.value==='number'){
					realPath=obj.model.path;
				}else{
					if(obj.model.path){
						let re=new RegExp(`^${obj.model.path.replace(/\./g, '\\.')}`);
						realPath=obj.keyword.path.replace(re, '');
					}else{
						realPath=obj.keyword.path;
					};
				};

				if(obj.keyword.value===eval(`val${realPath}`)){
					if(this.first_border)this.first_border=false;
					if(this.first_alert)this.first_alert=false;
					if(!this.isOn)this.isOn=true;
				}else{
					if(this.isOn)this.isOn=false;
				};
			};
		}
	},
	methods:{
		toEnter(){
			if(this.isDisabled)return;
			if(this.first_border)this.first_border=false;
			this.isMouseOn=true;
		},
		toLeave(){
			this.isMouseOn=false;
		},
		toSlectOption(){
			if(this.isDisabled)return;
			if(this.first_alert)this.first_alert=false;
			if(this.isOn && !this.isClearable)return;
			this.isWatching=false;
			this.isOn=!this.isOn;

			if(this.isOn){
				let result=this.__getItem('model').value;
				this.$emit('input', result);
				this.$emit('change', result, this.option);
			}else{
				this.$emit('input', null);
				this.$emit('change', null, this.option);
			};

			setTimeout(()=>{this.isWatching=true;});
		},
		__getItem(val){
			if(typeof this.option==='string' || typeof this.option==='number'){
				return {model:{value:this.option, path:null}, keyword:{value:this.option, path:null}}
			}else{
				let modelPath=this.model;
				let keywordPath=this.keyword;
				let modelObj={};
				let keywordObj={};
				if(typeof modelPath==='string' && modelPath.replace(/\s+/g, '').length>0){
					modelPath='.'+modelPath;
				}else{
					modelPath=null;
				};
				if(modelPath){
					modelObj={value:eval(`this.option${modelPath}`), path:modelPath};
				}else{
					modelObj={value:this.option, path:null};
				};
				if(val==='model')return modelObj;
				if(typeof modelObj.value==='string' || typeof modelObj.value==='number'){
					keywordObj={value:null, path:null};
				}else{
					if(typeof keywordPath==='string' && keywordPath.replace(/\s+/g, '').length>0){
						keywordPath='.'+keywordPath;
						let _value=eval(`this.option${keywordPath}`);
						if(typeof _value==='string' || typeof _value==='number'){
							keywordObj={value:_value, path:keywordPath};
						}else{
							throw '请正确设置um-radio组件的keyword!';
						};
					}else{
						throw '请正确设置um-radio组件的keyword!';
					};
				};
				return {model:modelObj, keyword:keywordObj};
			};
		},
	},
	mounted:function(){
		if(Object.keys(this.$slots).length!==0)this.textDefaultShow=true;
	}
}
</script>

<style>
.um__radio__class {display:inline-block; line-height:28px; cursor:pointer; color:#606266; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none; position:relative;}
.um__radio__cover {width:100%; height:100%; cursor:not-allowed; position:absolute; left:0; top:0; z-index:5;}
.um__radio__frame {width:18px; height:18px; line-height:17px; text-align:center; border:1px solid #c0c4cc; border-radius:50%; display:inline-block;}
.um__radio__borderAnimation_out {animation:UM_SELECT_OUT .5s forwards; -webkit-animation:UM_SELECT_OUT .5s forwards; -o-animation:UM_SELECT_OUT .5s forwards; -moz-animation:UM_SELECT_OUT .5s forwards; -ms-animation:UM_SELECT_OUT .5s forwards;}
.um__radio__borderAnimation_hover {animation:UM_SELECT_HOVER .5s forwards; -webkit-animation:UM_SELECT_HOVER .5s forwards; -o-animation:UM_SELECT_HOVER .5s forwards; -moz-animation:UM_SELECT_HOVER .5s forwards; -ms-animation:UM_SELECT_HOVER .5s forwards;}
.um__radio__alert {width:18px; height:18px; border-radius:50%; border:1px solid #3F79F1; font-size:14px; display:inline-block; line-height:17px; position:relative; top:-1px; left:-1px; opacity:0;}
.um__radio__desAlert {width:18px; height:18px; border-radius:50%; border:1px solid #acb0b7; font-size:14px; display:inline-block; line-height:17px; position:relative; top:-1px; left:-1px; opacity:0;}
.um__radio__pointe {width:14px; height:14px; background:#3F79F1; border-radius:50%; position:absolute; left:2px; top:2px;}
.um__radio__desPointe {width:14px; height:14px; background:#acb0b7; border-radius:50%; position:absolute; left:2px; top:2px;}
.um__radio__alertAnimation0 {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__radio__alertAnimation1 {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__radio__position {opacity:0;}
.um__radio__defaultText {opacity:0;}
.um__radio__disabled {color:#acb0b7;}
</style>