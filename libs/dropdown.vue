<template>
<div class="um__dropdown__class">
	<div class="um__dropdown__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div :class="{um__dropdown__input:true, um__dropdown__input_on:pullDownObj && pullDownObj.now, um__dropdown__input_off:pullDownObj && !pullDownObj.now && !first}" :id="'caption'+num" @click="toJudge" @click.once="toUnfirst">
		<span :class="{um__dropdown__show__placeholder:empty}">{{text}}</span>
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
</div>
</template>

<script>
export default {
	props:['list', 'searchable', 'closeSearchClear', 'selected', 'model', 'maxHeight', 'view', 'option', 'disabled', 'clearable', 'placeholder', 'enabled'],
	data(){
		return {
			first:true, // 是否首次加载
			showList:[...this.list], // 展示用数据
			pullDownObj:null, // 下拉插件对象
			movingScrollObj:null, // 自定义滚动条插件对象
			index_now:null, // 当前选中的选项的索引
			text:this.placeholder?this.placeholder:'请选择 ...', // caption展示的内容
			empty:true, // caption展示是否为空
			unfoldUp:false, // 是否向上展开
			searchKey:'', // 搜索关键字
			downHeight:220 // 最大下拉框高度
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
			if(this.disabled=='' || this.disabled=='true' || this.disabled===true){
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
		}
	},
	watch:{
		list:function(arr){ // 当列表发生变化时, 自适应滚动条长度 *列表发生变化不包括列表的某一内容发生变化, 如: list[0].name=value
			if(this.pullDownObj.now)this.movingScrollObj.adaptive(500);
			this.searchKey='';
			this.showList=[...arr];
			this.toClearSelecter();
			this.$nextTick(function(){
				this.pullDownObj.reBind();
			});
		}
	},
	methods:{
		toUnfirst(){
			this.first=false;
		},
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
			this.index_now=index;
			this.empty=false;
			this.text=this.toFilterOption(val, this.view);
			this.$emit('input', this.toFilterOption(val, this.model));
			this.$emit('change', val, index);
		},
		toClearSelecter(){
			if(this.empty)return;
			this.index_now=null;
			this.empty=true;
			this.text=this.placeholder?this.placeholder:'请选择 ...';
			this.$emit('input', null);
			this.$emit('change', null, null);
		},
		toFilterOption(item, pointer){
			if(pointer){
				let result='item';
				let arr=pointer.split('.');
				arr.forEach(val=>{
					result+=`['${val}']`;
				});
				return eval(result);
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
				return false;
			}else{
				return eval(`item${this.enabledRule.attr}`)===(this.enabledRule.value?this.enabledRule.value:true);
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
			}, this.movingScrollObj);
			if(/px$/.test(maxHeight)){
				this.downHeight=Math.ceil(maxHeight.replace(/px$/, ''));
			}else if(/rem$/.test(maxHeight)){
				this.downHeight=Math.ceil(_(document.getElementsByTagName('html')[0]).getStyle('fontSize').replace(/px$/, ''))*Number(maxHeight.replace(/rem$/, ''));
			}else if(/em$/.test(maxHeight)){
				this.downHeight=Math.ceil(_(eval(`caption${this.num}`).parentNode).getStyle('fontSize').replace(/px$/, ''))*Number(maxHeight.replace(/em$/, ''))
			}else{
				throw `um-dropdown插件的maxHeight属性只支持三种单位: 'px', 'em', 'rem'`;
			};
		});
		if(this.selected!==undefined){
			let index=Math.ceil(this.selected);
			if(index==this.selected){
				this.$emit('input', this.toFilterOption(this.list[index], this.model));
				this.text=this.toFilterOption(this.list[index], this.view);
				this.index_now=index;
			}else{
				this.$emit('input', null);
				this.text=this.placeholder?this.placeholder:'请选择 ...';
			};
		}else{
			this.$emit('input', null);
			this.text=this.placeholder?this.placeholder:'请选择 ...';
		};
	}
}
</script>

<style>
.um__dropdown__class {width:220px; height:30px; color:#606266; border:1px solid #c0c4cc; border-radius:3px; background:white; position:relative;}
.um__dropdown__class:hover {animation:UM_DROPDOWN_HOVER .5s forwards; -webkit-animation:UM_DROPDOWN_HOVER .5s forwards; -o-animation:UM_DROPDOWN_HOVER .5s forwards; -moz-animation:UM_DROPDOWN_HOVER .5s forwards; -ms-animation:UM_DROPDOWN_HOVER .5s forwards;}
.um__dropdown__input_on {animation:UM_DROPDOWN_CHOOSED .5s forwards; -webkit-animation:UM_DROPDOWN_CHOOSED .5s forwards; -o-animation:UM_DROPDOWN_CHOOSED .5s forwards; -moz-animation:UM_DROPDOWN_CHOOSED .5s forwards; -ms-animation:UM_DROPDOWN_CHOOSED .5s forwards;}
.um__dropdown__input_off {animation:UM_DROPDOWN_UNCHOOSED .5s forwards; -webkit-animation:UM_DROPDOWN_UNCHOOSED .5s forwards; -o-animation:UM_DROPDOWN_UNCHOOSED .5s forwards; -moz-animation:UM_DROPDOWN_UNCHOOSED .5s forwards; -ms-animation:UM_DROPDOWN_UNCHOOSED .5s forwards;}
.um__dropdown__disabled {width:100%; height:100%; background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:0; top:0; z-index:10;}
.um__dropdown__show__placeholder {color:#c0c4cc;}
.um__dropdown__input {width:calc(100% - 5px); height:100%; font-size:14px; line-height:30px; background:transparent; overflow:hidden; padding-left:5px; border-radius:3px; border:1px solid transparent; position:absolute; left:-1px; top:-1px;}
.um__dropdown__icon {width:26px; height:26px; line-height:26px; color:#c0c4cc; text-align:center; position:absolute; right:2px; top:2px; z-index:5;}
.um__dropdown__container_up {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; bottom:calc(100% + 5px);}
.um__dropdown__container_down {width:calc(100% + 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:-2px; top:calc(100% + 5px);}
.um__dropdown__search {width:100%; height:40px; position:relative;}
.um__dropdown__searchInput {width:calc(100% - 54px); height:24px; padding-left:5px; padding-right:24px; outline-color:#ceddef; background:transparent; border:1px solid #e4e7ed; border-radius:3px; position:absolute; left:10px; top:7px;}
.um__dropdown__searchIcon {width:24px; height:24px; line-height:24px; color:#c0c4cc; font-size:12px; text-align:center; position:absolute; left:calc(100% - 39px); top:9px; z-index:5;}
.um__dropdown__option__placeholder {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer; color:#c0c4cc;}
.um__dropdown__option__placeholder:hover {background:#f0f3f7;}
.um__dropdown__option__cover {width:100%; height:100%; background:transparent; cursor:not-allowed; position:absolute; left:0; top:0; z-index:100}
.um__dropdown__option_box {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer; position:relative;}
.um__dropdown__option {width:100%; height:100%;}
.um__dropdown__option:hover {background:#f0f3f7;}
.um__dropdown__option__chooded {color:#409eff; font-weight:900;}
.um__dropdown__scrollClassName {width:5px; height:0; border-radius:3px; background:#e1e6ec; position:absolute; right:1px; top:0; z-index:100;} /*滚动条样式*/
.um__dropdown__contentbox {width:100%; overflow:hidden; position:relative;}
.um__dropdown__icon_down {animation:UM_DROPDOWN_DOWN .5s forwards; -webkit-animation:UM_DROPDOWN_DOWN .5s forwards; -o-animation:UM_DROPDOWN_DOWN .5s forwards; -moz-animation:UM_DROPDOWN_DOWN .5s forwards; -ms-animation:UM_DROPDOWN_DOWN .5s forwards;}
.um__dropdown__icon_up {animation:UM_DROPDOWN_UP .5s forwards; -webkit-animation:UM_DROPDOWN_UP .5s forwards; -o-animation:UM_DROPDOWN_UP .5s forwards; -moz-animation:UM_DROPDOWN_UP .5s forwards; -ms-animation:UM_DROPDOWN_UP .5s forwards;}

@keyframes UM_DROPDOWN_DOWN {
	from {transform:rotate(-180deg);}
	to {transform:rotate(0deg);}
}
@-webkit-keyframes UM_DROPDOWN_DOWN {
	from {transform:rotate(-180deg);}
	to {transform:rotate(0deg);}
}
@-o-keyframes UM_DROPDOWN_DOWN {
	from {transform:rotate(-180deg);}
	to {transform:rotate(0deg);}
}
@-moz-keyframes UM_DROPDOWN_DOWN {
	from {transform:rotate(-180deg);}
	to {transform:rotate(0deg);}
}
@-ms-keyframes UM_DROPDOWN_DOWN {
	from {transform:rotate(-180deg);}
	to {transform:rotate(0deg);}
}
@keyframes UM_DROPDOWN_UP {
	from {transform:rotate(0deg);}
	to {transform:rotate(-180deg);}
}
@-webkit-keyframes UM_DROPDOWN_UP {
	from {transform:rotate(0deg);}
	to {transform:rotate(-180deg);}
}
@-o-keyframes UM_DROPDOWN_UP {
	from {transform:rotate(0deg);}
	to {transform:rotate(-180deg);}
}
@-moz-keyframes UM_DROPDOWN_UP {
	from {transform:rotate(0deg);}
	to {transform:rotate(-180deg);}
}
@-ms-keyframes UM_DROPDOWN_UP {
	from {transform:rotate(0deg);}
	to {transform:rotate(-180deg);}
}

@keyframes UM_DROPDOWN_HOVER {
	from {border:1px solid #c0c4cc;}
	to {border:1px solid #A3A3A3;}
}
@-webkit-keyframes UM_DROPDOWN_HOVER {
	from {border:1px solid #c0c4cc;}
	to {border:1px solid #A3A3A3;}
}
@-o-keyframes UM_DROPDOWN_HOVER {
	from {border:1px solid #c0c4cc;}
	to {border:1px solid #A3A3A3;}
}
@-moz-keyframes UM_DROPDOWN_HOVER {
	from {border:1px solid #c0c4cc;}
	to {border:1px solid #A3A3A3;}
}
@-ms-keyframes UM_DROPDOWN_HOVER {
	from {border:1px solid #c0c4cc;}
	to {border:1px solid #A3A3A3;}
}

@keyframes UM_DROPDOWN_CHOOSED {
	from {border:1px solid transparent;}
	to {border:1px solid #3F79F1;}
}
@-webkit-keyframes UM_DROPDOWN_CHOOSED {
	from {border:1px solid transparent;}
	to {border:1px solid #3F79F1;}
}
@-o-keyframes UM_DROPDOWN_CHOOSED {
	from {border:1px solid transparent;}
	to {border:1px solid #3F79F1;}
}
@-moz-keyframes UM_DROPDOWN_CHOOSED {
	from {border:1px solid transparent;}
	to {border:1px solid #3F79F1;}
}
@-ms-keyframes UM_DROPDOWN_CHOOSED {
	from {border:1px solid transparent;}
	to {border:1px solid #3F79F1;}
}

@keyframes UM_DROPDOWN_UNCHOOSED {
	from {border:1px solid #3F79F1;}
	to {border:1px solid transparent;}
}
@-webkit-keyframes UM_DROPDOWN_UNCHOOSED {
	from {border:1px solid #3F79F1;}
	to {border:1px solid transparent;}
}
@-o-keyframes UM_DROPDOWN_UNCHOOSED {
	from {border:1px solid #3F79F1;}
	to {border:1px solid transparent;}
}
@-moz-keyframes UM_DROPDOWN_UNCHOOSED {
	from {border:1px solid #3F79F1;}
	to {border:1px solid transparent;}
}
@-ms-keyframes UM_DROPDOWN_UNCHOOSED {
	from {border:1px solid #3F79F1;}
	to {border:1px solid transparent;}
}
</style>