<template>
<div class="icon um__button_class">
	<div class="um__button_circelClass" v-if="isDisabled"></div>
	<div :class="{um__button__class__simple:true, um__button_disabled:isDisabled, [`um__button_circel_${typeObj.size}`]:isCircle, [`um__button__class__lineH_${typeObj.size}`]:true, [`um__button__simple__${typeObj.type}`]:true, [`um__button__class__${typeObj.type}`]:!first && !down, [`um__button__mousedown__${typeObj.type}`]:down}" :style="{padding:isCircle?'0':'0 10px'}" v-on="listeners">
		<slot></slot>
		<span class="um__button__defaultText" v-if="textDefaultShow">0</span>   <!-- 对齐用; 本组件内其它元素都是绝对定位, 组件本身的display是inline-block, 如果不加一个合适line-height的文字内容则无法和有文字内容的其它inline-block元素对齐 -->
	</div>
</div>
</template>

<script>
export default {
	props:['type', 'disabled', 'circle'],
	data(){
		return {
			first:true, // 是否首次加载
			textDefaultShow:false, // 是否渲染对齐用透明字体
			down:false, // 按钮是否为按下状态
			typeArr:['1', '2', '3', '4', '5', '6', '7', '8', '9'], // type数组, 用于检测type是否正确
			sizeArr:['default', 'big', 'small'] // size数组, 用于检测size是否正确
		}
	},
	computed:{
		isDisabled:function(){
			return this.disabled==='' || this.disabled==='true' || this.disabled===true;
		},
		isCircle:function(){
			return this.circle==='' || this.circle==='true' || this.circle===true;
		},
		listeners:function(){
			return Object.assign({
				mousedown:function(){ // 鼠标按下状态回调
					if(!this.isDisabled)this.down=true;
				}.bind(this),
				'~mouseenter':function(){ // 取消首次加载状态
					this.first=false;
				}.bind(this)
			}, this.$listeners);
		},
		typeObj:function(){
			if(this.type===undefined){
				return {
					type:'1',
					size:'default'
				};
			}else{
				let str=(this.type+'').replace(/\s+/g, '');
				let arr=str.split('|');
				if(arr.length==1){
					let result={type:arr[0], size:'default'};
					if(this.typeArr.indexOf(arr[0])===-1)result.type='1';
					return result;
				}else{
					let result={type:arr[0], size:arr[1]};
					if(this.typeArr.indexOf(arr[0])===-1)result.type='1';
					if(this.sizeArr.indexOf(arr[1])===-1)result.size='default';
					return result;
				};
			};
		}
	},
	methods:{
		toMouseup(){ // 鼠标抬起状态回调
			this.down=false;
		}
	},
	mounted:function(){
		if(Object.keys(this.$slots).length===0)this.textDefaultShow=true;
		_(document).BD('mouseup', this.toMouseup);
	},
	beforeDestroy:function(){
		_(document).unBD('mouseup', this.toMouseup);
	}
}
</script>

<style>
.um__button_class {display:inline-block; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none; position:relative;}
.um__button__class__simple {text-align:center; border-radius:3px; cursor:pointer;}
.um__button__class__lineH_default {height:26px; line-height:28px; font-size:12px;}
.um__button__class__lineH_big {height:32px; line-height:32px; font-size:14px;}
.um__button__class__lineH_small {height:20px; line-height:22px; font-size:10px;}

.um__button_circelClass {width:calc(100% + 2px); height:calc(100% + 2px); cursor:not-allowed; position:absolute; top:-1px; left:-1px; z-index:5;}

.um__button_circel_default {width:26px; border-radius:13px;}
.um__button_circel_big {width:32px; border-radius:16px;}
.um__button_circel_small {width:20px; border-radius:10px;}

.um__button__defaultText {opacity:0;}

/* type: ---- 1 */
.um__button__simple__1 {color:#606266; border:1px solid #c0c4cc; background:white;}
.um__button__class__1 {animation:UM_BUTTON_LEAVE_1 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_1 .5s forwards; -o-animation:UM_BUTTON_LEAVE_1 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_1 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_1 .5s forwards;}
.um__button__class__1:hover {animation:UM_BUTTON_ENTER_1 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_1 .5s forwards; -o-animation:UM_BUTTON_ENTER_1 .5s forwards; -moz-animation:UM_BUTTON_ENTER_1 .5s forwards; -ms-animation:UM_BUTTON_ENTER_1 .5s forwards;}
.um__button__mousedown__1 {background:#c0c4cc; color:white;}

/* type: ---- 2 */
.um__button__simple__2 {color:white; border:1px solid #3F79F1; background:#3F79F1;}
.um__button__class__2 {animation:UM_BUTTON_LEAVE_2 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_2 .5s forwards; -o-animation:UM_BUTTON_LEAVE_2 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_2 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_2 .5s forwards;}
.um__button__class__2:hover {animation:UM_BUTTON_ENTER_2 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_2 .5s forwards; -o-animation:UM_BUTTON_ENTER_2 .5s forwards; -moz-animation:UM_BUTTON_ENTER_2 .5s forwards; -ms-animation:UM_BUTTON_ENTER_2 .5s forwards;}
.um__button__mousedown__2 {background:#c0c4cc; border:1px solid #c0c4cc;}

/* type: ---- 3 */
.um__button__simple__3 {color:#898c91; border:1px solid #c0c4cc; background:#f7f7f7;}
.um__button__class__3 {animation:UM_BUTTON_LEAVE_3 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_3 .5s forwards; -o-animation:UM_BUTTON_LEAVE_3 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_3 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_3 .5s forwards;}
.um__button__class__3:hover {animation:UM_BUTTON_ENTER_3 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_3 .5s forwards; -o-animation:UM_BUTTON_ENTER_3 .5s forwards; -moz-animation:UM_BUTTON_ENTER_3 .5s forwards; -ms-animation:UM_BUTTON_ENTER_3 .5s forwards;}
.um__button__mousedown__3 {background:#c0c4cc; color:white;}

/* type: ---- 4 */
.um__button__simple__4 {color:#3F79F1; border:1px solid transparent;}
.um__button__class__4 {animation:UM_BUTTON_LEAVE_4 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_4 .5s forwards; -o-animation:UM_BUTTON_LEAVE_4 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_4 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_4 .5s forwards;}
.um__button__class__4:hover {animation:UM_BUTTON_ENTER_4 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_4 .5s forwards; -o-animation:UM_BUTTON_ENTER_4 .5s forwards; -moz-animation:UM_BUTTON_ENTER_4 .5s forwards; -ms-animation:UM_BUTTON_ENTER_4 .5s forwards;}
.um__button__mousedown__4 {color:#3F79F1; background:#FBFBFB;}

/* type: ---- 5 */
.um__button__simple__5 {color:white; border:1px solid #41c0f9; background:#41c0f9;}
.um__button__class__5 {animation:UM_BUTTON_LEAVE_5 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_5 .5s forwards; -o-animation:UM_BUTTON_LEAVE_5 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_5 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_5 .5s forwards;}
.um__button__class__5:hover {animation:UM_BUTTON_ENTER_5 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_5 .5s forwards; -o-animation:UM_BUTTON_ENTER_5 .5s forwards; -moz-animation:UM_BUTTON_ENTER_5 .5s forwards; -ms-animation:UM_BUTTON_ENTER_5 .5s forwards;}
.um__button__mousedown__5 {border:1px solid #149bd7; background:#149bd7;}

/* type: ---- 6 */
.um__button__simple__6 {color:white; border:1px solid #00cc1d; background:#00cc1d;}
.um__button__class__6 {animation:UM_BUTTON_LEAVE_6 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_6 .5s forwards; -o-animation:UM_BUTTON_LEAVE_6 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_6 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_6 .5s forwards;}
.um__button__class__6:hover {animation:UM_BUTTON_ENTER_6 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_6 .5s forwards; -o-animation:UM_BUTTON_ENTER_6 .5s forwards; -moz-animation:UM_BUTTON_ENTER_6 .5s forwards; -ms-animation:UM_BUTTON_ENTER_6 .5s forwards;}
.um__button__mousedown__6 {border:1px solid #019f18; background:#019f18;}

/* type: ---- 7 */
.um__button__simple__7 {color:white; border:1px solid #ff9900; background:#ff9900;}
.um__button__class__7 {animation:UM_BUTTON_LEAVE_7 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_7 .5s forwards; -o-animation:UM_BUTTON_LEAVE_7 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_7 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_7 .5s forwards;}
.um__button__class__7:hover {animation:UM_BUTTON_ENTER_7 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_7 .5s forwards; -o-animation:UM_BUTTON_ENTER_7 .5s forwards; -moz-animation:UM_BUTTON_ENTER_7 .5s forwards; -ms-animation:UM_BUTTON_ENTER_7 .5s forwards;}
.um__button__mousedown__7 {border:1px solid #ec8e00; background:#ec8e00;}

/* type: ---- 8 */
.um__button__simple__8 {color:white; border:1px solid #ff3300; background:#ff3300;}
.um__button__class__8 {animation:UM_BUTTON_LEAVE_8 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_8 .5s forwards; -o-animation:UM_BUTTON_LEAVE_8 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_8 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_8 .5s forwards;}
.um__button__class__8:hover {animation:UM_BUTTON_ENTER_8 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_8 .5s forwards; -o-animation:UM_BUTTON_ENTER_8 .5s forwards; -moz-animation:UM_BUTTON_ENTER_8 .5s forwards; -ms-animation:UM_BUTTON_ENTER_8 .5s forwards;}
.um__button__mousedown__8 {border:1px solid #e12d00; background:#e12d00;}

/* type: ---- 9 */
.um__button__simple__9 {color:#898c91; border:1px solid transparent;}
.um__button__class__9 {animation:UM_BUTTON_LEAVE_9 .5s forwards; -webkit-animation:UM_BUTTON_LEAVE_9 .5s forwards; -o-animation:UM_BUTTON_LEAVE_9 .5s forwards; -moz-animation:UM_BUTTON_LEAVE_9 .5s forwards; -ms-animation:UM_BUTTON_LEAVE_9 .5s forwards;}
.um__button__class__9:hover {animation:UM_BUTTON_ENTER_9 .5s forwards; -webkit-animation:UM_BUTTON_ENTER_9 .5s forwards; -o-animation:UM_BUTTON_ENTER_9 .5s forwards; -moz-animation:UM_BUTTON_ENTER_9 .5s forwards; -ms-animation:UM_BUTTON_ENTER_9 .5s forwards;}
.um__button__mousedown__9 {color:#606266;}

.um__button_disabled {background:#e5e5e5; border:1px solid #e5e5e5; color:#acb0b7;}
</style>