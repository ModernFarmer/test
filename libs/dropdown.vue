<template>
<div :class="{um__dropdown__class:true, [`um__dropdown__size_${plugSize}`]:true, um__dropdown__animationAble:!first_frame}" @mouseenter.once="first_frame=false">
	<div class="um__dropdown__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div :class="{um__dropdown__input:true, 
		[`um__dropdown_lineH_${plugSize}`]:true,
		um__dropdown__input_on:pullDownObj && pullDownObj.now && !alarmBefore, 
		um__dropdown__input_alarm_on:pullDownObj && pullDownObj.now && alarmBefore && !isAlarm, 
		um__dropdown__input_off:pullDownObj && !pullDownObj.now && !alarmBefore && !first && !isAlarm, 
		um__dropdown__input_alarm:isAlarm && nowBefore, 
		um__dropdown__input_blur_alarm:isAlarm && !nowBefore}" 
		:id="'caption'+num" @click="toJudge">
		<div :class="{um__dropdown__show:true, um__dropdown__show__placeholder:empty}">{{text}}</div>
		<div :class="{icon:true, um__dropdown__icon:true, um__dropdown__icon_down:now===false && !first, um__dropdown__icon_up:now===true}">&#xe629;</div>
	</div>
	<div :class="{um__dropdown__container_down:!unfoldUp, um__dropdown__container_up:unfoldUp}" :id="'down'+num">
		<div class="um__dropdown__scrollClassName" :id="'scroll'+num"></div>
		<div class="um__dropdown__contentbox" :id="'contentbox'+num">
			<div class="um__dropdown__search" v-if="searchable!==undefined" @click.stop @mousedown.stop="toStopFnDown" @mouseup="toStopFnUp($event)">
				<input class="um__dropdown__searchInput" type="text" v-model="searchKey" @input="toSearch">
				<div class="icon um__dropdown__searchIcon">&#xe651;</div>
			</div>
			<div class="um__dropdown__option__placeholder" v-if="clearable!==undefined" @click="toClearSelecter">{{placeholder?placeholder:'请选择 ...'}}</div>
			<div class="um__dropdown__option_box" v-for="(val, index) in showList" :key="'key'+num+'_'+index" @click="toSelect(val, index)">
				<div class="um__dropdown__option__cover" v-show="!_rule(val)" @click.stop></div>
				<div :class="{um__dropdown__option:true, um__dropdown__option__chooded:index==index_now}">{{optionList[index]}}</div>
			</div>
		</div>
	</div>
	<div :class="{um__dropdown_textAlarm:true, um__dropdown__text_showAnimation:isAlarm, um__dropdown__text_hideAnimation:!isAlarm && !first}">{{alarmWord}}</div>
	<span :class="`um__dropdown_align_${plugSize}`">0</span>   <!-- 对齐用; 本组件内其它元素都是绝对定位, 组件本身的display是inline-block, 如果不加一个合适line-height的文字内容则无法和有文字内容的其它inline-block元素对齐 -->
</div>
</template>

<script>
export default {
	props:['list', 'searchable', 'closeSearchClear', 'model', 'maxHeight', 'view', 'option', 'disabled', 'clearable', 'placeholder', 'enabled', 'rules', 'validateField', 'size', 'value', 'keyword'],
	data(){
		return {
			first_frame:true, // 左箭头是否首次加载, 用于优化展示动画
			first:true, // 下拉插件否首次加载, 用于优化展示动画
			showList:[...this.list], // 展示用数据
			pullDownObj:null, // 下拉插件对象
			movingScrollObj:null, // 自定义滚动条插件对象
			index_now:null, // 当前选中的选项的索引
			text:this.placeholder?this.placeholder:'请选择 ...', // caption展示的内容
			empty:true, // caption展示是否为空
			unfoldUp:false, // 是否向上展开
			searchKey:'', // 搜索关键字
			downHeight:220, // 最大下拉框高度
			isAlarm:false, // 是否标红
			nowBefore:false, // 验证之前的下拉状态, 用于优化展示动画
			alarmBefore:false, // 验证之前的标红状态, 用于优化展示动画
			alarmWord:'', // 验证失败的说明文字
			verifyContent:null, // 被验证的数据
			sizeArr:['default', 'big', 'small'] // 大小规格size数组, 用于检测size是否正确
		}
	},
	computed:{
		num:function(){
			return '_um_dropdown_'+Math.ceil(Math.random()*100000000);
		},
		now:function(){
			return this.pullDownObj?this.pullDownObj.now:'origin';
		},
		isCover:function(){
			if(this.disabled==='' || this.disabled==='true' || this.disabled===true){
				return true;
			}else{
				return false;
			};
		},
		optionList:function(){
			return this.showList.map(item=>{
				return this.toFilterOption(item, this.option);
			});
		},
		textList:function(){
			return this.showList.map(item=>{
				return this.toFilterOption(item, this.view);
			});
		},
		enabledRule:function(){
			if(this.enabled===undefined){
				return null;
			}else{
				let arr=this.enabled.replace(/\s+/g, '').split('|');
				let attr=arr[0];
				let value=null;
				if(arr.length>1)value=arr[1];

				let result='';
				let arr_str=attr.split('.');
				arr_str.forEach(val=>{
					result+=`['${val}']`;
				});

				return {attr:result, value};
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
	watch:{
		list:function(arr){ // 当列表发生变化时, 自适应滚动条长度 *列表发生变化不包括列表的某一内容发生变化, 如: list[0].name=value
			let _watchFn=()=>{
				if(this.pullDownObj){
					if(this.pullDownObj.now)this.movingScrollObj.adaptive(500);
					this.searchKey='';
					this.showList=[...arr];
					this.toClearSelecter();
					this.$nextTick(function(){
						this.pullDownObj.reBind();
					});
				}else{
					setTimeout(()=>{
						_watchFn();
					}, 50);
				};
			};
			_watchFn();
		},
		value:function(item){
			if(this._$UMSTORE.isModuleEvent_dropdown || !item)return;
			let modelPath=this.model;
			if(typeof modelPath==='string' && modelPath.replace(/\s+/g, '').length>0){
				modelPath='.'+modelPath;
			}else{
				modelPath='';
			};
			if(typeof item==='string' || typeof item==='number'){
				let ok=false;
				for(let i=0; i<this.showList.length; i++){
					let k=i;
					if(eval(`this.showList[k]${modelPath}`)===item){
						this.index_now=i;
						this.empty=false;
						this.text=this.toFilterOption(this.showList[k], this.view);
						this.verifyContent=this.toFilterOption(this.showList[k], this.model);
						ok=true;
						break;
					}
				};
				if(!ok){
					this.index_now=null;
					this.empty=true;
					this.verifyContent=null;
					this.text=this.placeholder?this.placeholder:'请选择 ...';
					this.$emit('input', null);
				}
			}else{
				if(typeof this.keyword!=='string' || this.keyword.replace(/\s+/g, '').length===0){
					this.index_now=null;
					this.empty=true;
					this.verifyContent=null;
					this.text=this.placeholder?this.placeholder:'请选择 ...';
					this.$emit('input', null);
					return;
				}else{
					let keyPath='.'+this.keyword.replace(/\s+/g, '');
					let realPath='';

					if(modelPath!==''){
						let re=new RegExp(`^${modelPath.replace('.', '\\.')}`);
						realPath=keyPath.replace(re, '');
					}else{
						realPath=keyPath;
					};

					let ok=false;
					for(let i=0; i<this.showList.length; i++){
						let _i=i;
						if(eval(`this.showList[_i]${keyPath}`)===eval(`item${realPath}`)){
							this.index_now=_i;
							this.empty=false;
							this.text=this.toFilterOption(this.showList[_i], this.view);
							this.verifyContent=this.toFilterOption(this.showList[_i], this.model);
							ok=true;
							break;
						}
					};
					if(!ok){
						this.index_now=null;
						this.empty=true;
						this.verifyContent=null;
						this.text=this.placeholder?this.placeholder:'请选择 ...';
						this.$emit('input', null);
					}
				};
			};
		}
	},
	methods:{
		toSearch(){
			if(window[`dropD_${this.num}`]){
				this.movingScrollObj.adaptive(500, false);
				clearTimeout(window[`dropD_${this.num}`]);
				delete window[`dropD_${this.num}`];
			}
			window[`dropD_${this.num}`]=setTimeout(()=>{
				if(this.searchKey.replace(/\s/g, '')!==''){
					this.showList=this.list.filter(val=>{
						return this.toFilterOption(val, this.option).indexOf(this.searchKey.replace(/^\s*|\s*$/g, ''))!=-1;
					});
				}else{
					this.showList=[...this.list];
				};
				this.movingScrollObj.adaptive(500);
				delete window[`dropD_${this.num}`];
			}, 500);
		},
		toJudge(event){
			if(this.searchable!==undefined && this.closeSearchClear===undefined && !this.pullDownObj.now){ // 每次下拉初始化搜索数据
				this.searchKey='';
				this.showList=[...this.list];
				this.index_now=this.textList.indexOf(this.text);
			}
			if(!this.pullDownObj.now){ // 判断向上还是向下展开
				let offsetY=event.offsetY;
				let clientY=event.clientY;
				let cH=_clientSize().h;
				let h=eval(`caption${this.num}`).offsetHeight;
				let dH=parseFloat(this.pullDownObj._m_height());
				dH=dH<this.downHeight?dH:this.downHeight;
				if(cH-h-clientY+offsetY-5<dH && clientY-offsetY-5>dH){
					this.unfoldUp=true;
				}else{
					this.unfoldUp=false;
				};
			}
		},
		toSelect(val, index){
			if(this.index_now===index)return;
			this._$UMSTORE.isModuleEvent_dropdown=true;
			this.index_now=index;
			this.empty=false;
			this.text=this.toFilterOption(val, this.view);
			this.verifyContent=this.toFilterOption(val, this.model);
			this.$emit('input', this.verifyContent);
			this.$emit('change', val, index);
			setTimeout(()=>{this._$UMSTORE.isModuleEvent_dropdown=false;});
		},
		toClearSelecter(){
			if(this.empty)return;
			this.index_now=null;
			this.empty=true;
			this.text=this.placeholder?this.placeholder:'请选择 ...';
			this.verifyContent=null;
			this.$emit('input', null);
			this.$emit('change', null, null);
		},
		toFilterOption(item, pointer){
			if(pointer){
				return eval('item.'+pointer);
			}else{
				return item;
			};
		},
		toStopFnDown(){ // 点击搜索div时合理改变_PullDown插件内部的downHidden值, 使它被点击时不会隐藏下拉框
			this.pullDownObj.downHidden=false;
		},
		toStopFnUp(){ // 点击搜索div时合理改变_PullDown插件内部的downHidden值, 使它被点击时不会隐藏下拉框
			this.pullDownObj.downHidden=true;
		},
		_rule(item){
			if(!this.enabledRule){
				return true;
			}else{
				return eval(`item${this.enabledRule.attr}`)===(this.enabledRule.value?this.enabledRule.value:true);
			};
		},
		toNomal(){ // 取消框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=false;
		},
		toRed(){ // 框体标红
			this.alarmBefore=this.isAlarm;
			this.isAlarm=true;
		},
		toVerifySimple(){
			if(!this.verifying)return;
			let success=true;
			for(let i=0; i<this.rules[this.validateField].length; i++){
				if(!this.verifyContent){
					success=false;
					this.alarmWord=this.rules[this.validateField][i].split('|')[1];
					break;
				}else if(typeof this.verifyContent==='string'){
					let res=this._$UMSTORE.rules[this.rules[this.validateField][i].split('|')[0]](this.verifyContent);
					if(!res){
						success=false;
						this.alarmWord=this.rules[this.validateField][i].split('|')[1];
						break;
					}
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
		this.$nextTick(function(){
			let maxHeight=this.maxHeight || '220px';
			maxHeight=maxHeight.replace(/\s+/g, '');
			_(`#down${this.num}`).css({maxHeight});
			this.movingScrollObj=_MovingScroll({
				box:`#down${this.num}`,
				contentBox:`#contentbox${this.num}`,
				scrollBox:`#scroll${this.num}`,
				speed:150
			});
			this.pullDownObj=_PullDown({
			    caption:`#caption${this.num}`,
			    down:`#down${this.num}`,
			    speed:.2
			}, this.movingScrollObj, function(dropdownObj){
				this.first=false;
				delete dropdownObj.fn;
			}.bind(this));
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
				this.$watch('pullDownObj.now', function(val, old){
					this.nowBefore=old;
					if(val===false){
						this.toVerifySimple();
					}else{
						this.toNomal();
					};
				});
			}
			if(/px$/.test(maxHeight)){
				this.downHeight=Math.ceil(maxHeight.replace(/px$/, ''));
			}else if(/rem$/.test(maxHeight)){
				this.downHeight=Math.ceil(_(document.getElementsByTagName('html')[0]).getStyle('fontSize').replace(/px$/, ''))*Number(maxHeight.replace(/rem$/, ''));
			}else if(/em$/.test(maxHeight)){
				this.downHeight=Math.ceil(_(eval(`caption${this.num}`).parentNode).getStyle('fontSize').replace(/px$/, ''))*Number(maxHeight.replace(/em$/, ''))
			}else{
				throw `um-dropdown组件的maxHeight属性只支持三种单位: 'px', 'em', 'rem'`;
			};
		});
	}
}
</script>

<style>
.um__dropdown__class {width:180px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; display:inline-block; position:relative;}
.um__dropdown__size_default {height:26px;}
.um__dropdown__size_big {height:32px;}
.um__dropdown__size_small {height:20px;}

.um__dropdown__animationAble {animation:UM_BORDERFRAME_OUT .5s forwards; -webkit-animation:UM_BORDERFRAME_OUT .5s forwards; -o-animation:UM_BORDERFRAME_OUT .5s forwards; -moz-animation:UM_BORDERFRAME_OUT .5s forwards; -ms-animation:UM_BORDERFRAME_OUT .5s forwards;}
.um__dropdown__animationAble:hover {animation:UM_BORDERFRAME_HOVER .5s forwards; -webkit-animation:UM_BORDERFRAME_HOVER .5s forwards; -o-animation:UM_BORDERFRAME_HOVER .5s forwards; -moz-animation:UM_BORDERFRAME_HOVER .5s forwards; -ms-animation:UM_BORDERFRAME_HOVER .5s forwards;}
.um__dropdown__input_on {animation:UM_BORDERFRAME_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_CHOOSED .5s forwards;}
.um__dropdown__input_off {animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_UNCHOOSED .5s forwards;}
.um__dropdown__input_alarm {animation:UM_BORDERFRAME_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM .5s forwards;}
.um__dropdown__input_alarm_on {animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -webkit-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -o-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -moz-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards; -ms-animation:UM_BORDERFRAME_ALARM_CHOOSED .5s forwards;}
.um__dropdown__input_blur_alarm {animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -webkit-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -o-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -moz-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards; -ms-animation:UM_BORDERFRAME_BLUR_ALARM .5s forwards;}
.um__dropdown__disabled {width:calc(100% + 2px); height:calc(100% + 2px); background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:-1px; top:-1px; z-index:10;}
.um__dropdown__input {width:calc(100% - 5px); height:100%; font-size:14px; background:transparent; padding-left:5px; border-radius:3px; border:1px solid transparent; position:absolute; left:-1px; top:-1px;}
.um__dropdown_lineH_default {line-height:26px; font-size:12px;}
.um__dropdown_lineH_big {line-height:32px; font-size:14px;}
.um__dropdown_lineH_small {line-height:20px; font-size:10px;}

.um__dropdown__show {width:calc(100% - 26px); height:100%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
.um__dropdown__show__placeholder {color:#c0c4cc;}
.um__dropdown__icon {width:26px; color:#c0c4cc; text-align:center; position:absolute; right:2px; top:0; z-index:5;}

.um__dropdown__container_up {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; bottom:calc(100% + 5px);}
.um__dropdown__container_down {width:calc(100% + 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:-2px; top:calc(100% + 5px);}
.um__dropdown__search {width:100%; height:40px; position:relative;}
.um__dropdown__searchInput {width:calc(100% - 54px); height:24px; padding-left:5px; padding-right:24px; outline-color:#ceddef; background:transparent; border:1px solid #e4e7ed; border-radius:3px; position:absolute; left:10px; top:7px;}
.um__dropdown__searchIcon {width:24px; height:24px; line-height:24px; color:#c0c4cc; font-size:12px; text-align:center; -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none; position:absolute; left:calc(100% - 39px); top:9px; z-index:5;}
.um__dropdown__option__placeholder {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer; color:#c0c4cc;}
.um__dropdown__option__placeholder:hover {background:#f0f3f7;}
.um__dropdown__option_box {width:100%; line-height:26px; font-size:14px; cursor:pointer; position:relative;}
.um__dropdown__option__cover {width:calc(100% - 10px); height:100%; padding-left:10px; background:rgba(255,255,255,.7); cursor:not-allowed; position:absolute; left:0; top:0; z-index:90}
.um__dropdown__option {width:calc(100% - 10px); height:100%; padding-left:10px;}
.um__dropdown__option:hover {background:#f0f3f7;}
.um__dropdown__option__chooded {color:#409eff; font-weight:900;}
.um__dropdown__scrollClassName {width:5px; height:0; border-radius:3px; background:#e1e6ec; position:absolute; right:1px; top:0; z-index:100;} /*滚动条样式*/
.um__dropdown__contentbox {width:100%; overflow:hidden; position:relative;}
.um__dropdown__icon_down {animation:UM_DROPDOWN_DOWN .5s forwards; -webkit-animation:UM_DROPDOWN_DOWN .5s forwards; -o-animation:UM_DROPDOWN_DOWN .5s forwards; -moz-animation:UM_DROPDOWN_DOWN .5s forwards; -ms-animation:UM_DROPDOWN_DOWN .5s forwards;}
.um__dropdown__icon_up {animation:UM_DROPDOWN_UP .5s forwards; -webkit-animation:UM_DROPDOWN_UP .5s forwards; -o-animation:UM_DROPDOWN_UP .5s forwards; -moz-animation:UM_DROPDOWN_UP .5s forwards; -ms-animation:UM_DROPDOWN_UP .5s forwards;}
.um__dropdown_textAlarm {width:calc(100% - 5px); line-height:18px; font-size:10px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:red; position:absolute; left:5px; top:100%;}
.um__dropdown__text_showAnimation {animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_SHOWALARMTEXT .5s forwards;}
.um__dropdown__text_hideAnimation {animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -webkit-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -o-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -moz-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards; -ms-animation:UM_BORDERFRAME_HIDEALARMTEXT .5s forwards;}

.um__dropdown_align_default {line-height:26px; opacity:0}
.um__dropdown_align_big {line-height:32px; opacity:0}
.um__dropdown_align_small {line-height:20px; opacity:0}
</style>