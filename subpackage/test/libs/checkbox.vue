<template>
<div class="um__checkbox__class" @mouseenter="toEnter" @mouseleave="toLeave" @click="toSlectOption">
	<div class="um__checkbox__cover" v-if="isDisabled"></div>
	<div :class="{um__checkbox__frame:true, um__checkbox__borderAnimation_out:!isMouseOn && !first_border, um__checkbox__borderAnimation_hover:isMouseOn}">
		<div :class="{icon:true, um__checkbox__alert:!isDisabled, um__checkbox__desAlert:isDisabled, um__checkbox__alertAnimation0:!isOn && !first_alert, um__checkbox__alertAnimation1:isOn}"><span class="um__checkbox__position">&#xe65d;</span></div>
	</div>
	<span class="um__checkbox__defaultText" v-if="!isHideOption">0</span>
	<span :class="{um__checkbox__disabled:isDisabled}" style="font-size:14px" v-show="!isHideOption">
		<slot></slot>
	</span>
	<span class="um__checkbox__defaultText" v-if="!isHideOption">0</span>
</div>
</template>

<script>
export default {
	props:['result', 'disabled', 'option', 'model', 'keyword'],
	data(){
		return {
			first_border:true, // 是否首次加载
			first_alert:true, // 是否首次加载
			isMouseOn:false, // 鼠标是否在组件内
			isOn:false // 是否选中状态
		}
	},
	computed:{
		isHideOption:function(){
			return Object.keys(this.$slots).length===0;
		},
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
		}
	},
	watch:{
		result:function(){
			if(this._$UMSTORE.isModuleEvent_checkbox)return;
			this.__watch();
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
			this._$UMSTORE.isModuleEvent_checkbox=true;
			if(this.first_alert)this.first_alert=false;
			this.isOn=!this.isOn;

			let obj=this.__getItem();

			if(!obj.keyword.path){
				let index=this.result.indexOf(obj.model.value);
				if(index===-1){
					if(this.isOn)this.result.push(obj.model.value);
				}else{
					if(!this.isOn)this.result.splice(index, 1);
				};
			}else{
				let index=null;
				let have=false;

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

				for(let i=0; i<this.result.length; i++){
					let k=i;
					if(obj.keyword.value===eval(`this.result[k]${realPath}`)){
						have=true;
						index=k;
						break;
					}
				};
				if(!have){
					if(this.isOn)this.result.push(obj.model.value);
				}else{
					if(!this.isOn)this.result.splice(index, 1);
				};
			};
			this.$emit('change', this.result, this.option);
			setTimeout(()=>{this._$UMSTORE.isModuleEvent_checkbox=false;});
		},
		__watch(){
			let obj=this.__getItem();
			if(!obj.keyword.path){
				if(this.result.indexOf(obj.model.value)===-1){
					if(this.isOn)this.isOn=false;
				}else{
					if(this.first_border)this.first_border=false;
					if(this.first_alert)this.first_alert=false;
					if(!this.isOn)this.isOn=true;
				};
			}else{
				let realPath='';
				if(typeof obj.model.value==='string' || typeof obj.model.value==='number'){
					realPath=obj.model.path;
				}else{
					if(obj.model.path){
						let re=new RegExp(`^${obj.model.path.replace('.', '\\.')}`);
						realPath=obj.keyword.path.replace(re, '');
					}else{
						realPath=obj.keyword.path;
					};
				};

				let have=this.result.some(val=>{
					return obj.keyword.value===eval(`val${realPath}`);
				});
				if(!have){
					if(this.isOn)this.isOn=false;
				}else{
					if(this.first_border)this.first_border=false;
					if(this.first_alert)this.first_alert=false;
					if(!this.isOn)this.isOn=true;
				};
			};
		},
		__getItem(){
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
				if(typeof modelObj.value==='string' || typeof modelObj.value==='number'){
					keywordObj={value:null, path:null};
				}else{
					if(typeof keywordPath==='string' && keywordPath.replace(/\s+/g, '').length>0){
						keywordPath='.'+keywordPath;
						let _value=eval(`this.option${keywordPath}`);
						if(typeof _value==='string' || typeof _value==='number'){
							keywordObj={value:_value, path:keywordPath};
						}else{
							throw '请正确设置b-checkbox组件的keyword!';
						};
					}else{
						throw '请正确设置b-checkbox组件的keyword!';
					};
				};
				return {model:modelObj, keyword:keywordObj};
			};
		}
	},
	mounted:function(){
		this.__watch();
	}
}
</script>

<style>
.um__checkbox__class {display:inline-block; line-height:28px; cursor:pointer; color:#606266; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none; position:relative;}
.um__checkbox__cover {width:100%; height:100%; cursor:not-allowed; position:absolute; left:0; top:0; z-index:5;}
.um__checkbox__frame {width:18px; height:18px; line-height:17px; text-align:center; border:1px solid #c0c4cc; border-radius:3px; display:inline-block;}
.um__checkbox__borderAnimation_out {animation:UM_SELECT_OUT .5s forwards; -webkit-animation:UM_SELECT_OUT .5s forwards; -o-animation:UM_SELECT_OUT .5s forwards; -moz-animation:UM_SELECT_OUT .5s forwards; -ms-animation:UM_SELECT_OUT .5s forwards;}
.um__checkbox__borderAnimation_hover {animation:UM_SELECT_HOVER .5s forwards; -webkit-animation:UM_SELECT_HOVER .5s forwards; -o-animation:UM_SELECT_HOVER .5s forwards; -moz-animation:UM_SELECT_HOVER .5s forwards; -ms-animation:UM_SELECT_HOVER .5s forwards;}
.um__checkbox__alert {width:18px; height:18px; border-radius:3px; border:1px solid #3F79F1; background:#3F79F1; font-weight:900; font-size:14px; color:white; display:inline-block; line-height:17px; position:relative; top:-1px; left:-1px; opacity:0;}
.um__checkbox__desAlert {width:18px; height:18px; border-radius:3px; border:1px solid #acb0b7; background:#acb0b7; font-weight:900; font-size:14px; color:white; display:inline-block; line-height:17px; position:relative; top:-1px; left:-1px; opacity:0;}
.um__checkbox__alertAnimation0 {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards; -o-animation:UM_SWITCH_OPACITY0 .5s forwards; -moz-animation:UM_SWITCH_OPACITY0 .5s forwards; -ms-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__checkbox__alertAnimation1 {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards; -o-animation:UM_SWITCH_OPACITY1 .5s forwards; -moz-animation:UM_SWITCH_OPACITY1 .5s forwards; -ms-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__checkbox__position {position:relative; top:1px;}
.um__checkbox__defaultText {opacity:0;}
.um__checkbox__disabled {color:#acb0b7;}
</style>