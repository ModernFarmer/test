<template>
<div class="um__dropdown__class">
	<div class="um__dropdown__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div class="um__dropdown__input" :id="'caption'+num" @click="toJudge">
		<span :class="{um__dropdown__show__placeholder:empty}">{{text}}</span>
		<div class="um__dropdown__icon"></div>
	</div>
	<div :class="{um__dropdown__container_down:!unfoldUp, um__dropdown__container_up:unfoldUp}" :id="'down'+num">
		<div class="um__dropdown__scrollClassName" :id="'scroll'+num"></div>
		<div class="um__dropdown__contentbox" :id="'contentbox'+num">
			<div class="um__dropdown__search" v-if="searchable!==undefined" @click.stop @mousedown.stop="toStopFnDown" @mouseup="toStopFnUp($event)">
				<input class="um__dropdown__searchInput" type="text" v-model="searchKey" @input="toSearch">
			</div>
			<div class="um__dropdown__option__placeholder" v-if="clearable!==undefined" @click="toClearSelecter">{{placeholder?placeholder:'请选择 ...'}}</div>
			<div :class="{um__dropdown__option:true, um__dropdown__option__chooded:index==index_now}" v-for="(val, index) in showList" :key="'key'+num+'_'+index" @click="toSelect(val, index)">{{optionList[index]}}</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:['list', 'value', 'icon', 'searchable', 'selected', 'model', 'maxHeight', 'view', 'option', 'disabled', 'clearable', 'placeholder'],
	data(){
		return {
			showList:[...this.list], // 展示用数据
			pullDownObj:null, // 下拉插件对象
			movingScrollObj:null, // 自定义滚动条插件对象
			index_now:null, // 当前选中的选项的索引
			text:this.placeholder?this.placeholder:'请选择 ...', // caption展示的内容
			empty:true, // caption展示是否为空
			unfoldUp:false, // 是否向上展开
			searchKey:'' // 搜索关键字
		}
	},
	computed:{
		num:function(){
			return '_um_dropdown_'+Math.ceil(Math.random()*100000000);
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
		}
	},
	watch:{
		list:function(arr){ // 当列表发生变化时, 自适应滚动条长度
			if(this.pullDownObj.now)this.movingScrollObj.adaptive(500);
			this.searchKey='';
			this.showList=[...arr];
			this.toClearSelecter();
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
			if(this.searchable!==undefined && !this.pullDownObj.now){ // 每次下拉初始化搜索数据
				this.searchKey='';
				this.showList=[...this.list];
				this.index_now=this.textList.indexOf(this.text);
			}
			if(!this.pullDownObj.now){ // 判断向上还是向下展开
				let offsetY=event.offsetY, clientY=event.clientY, cH=_clientSize().h, h=eval(`caption${this.num}`).offsetHeight, dH=parseFloat(this.pullDownObj._m_height());
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
				let arr=pointer.split('\.');
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
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			let maxHeight=this.maxHeight || '220px';
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
.um__dropdown__class {width:220px; height:30px; color:#606266; position:relative;}
.um__dropdown__disabled {width:100%; height:100%; background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:0; top:0; z-index:10;}
.um__dropdown__show__placeholder {color:#c0c4cc;}
.um__dropdown__input {width:calc(100% - 7px); height:calc(100% - 2px); font-size:14px; line-height:28px; background:white; overflow:hidden; padding-left:5px; border-radius:3px; border:1px solid #c0c4cc;}
.um__dropdown__icon {width:26px; height:calc(100% - 4px); background:white; position:absolute; right:2px; top:2px; z-index:5;}
.um__dropdown__container_up {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; bottom:calc(100% + 5px);}
.um__dropdown__container_down {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; top:calc(100% + 5px);}
.um__dropdown__search {width:100%; height:40px; position:relative;}
.um__dropdown__searchInput {width:calc(100% - 30px); height:24px; padding-left:5px; outline-color:#ceddef; background:transparent; border:1px solid #e4e7ed; border-radius:3px; position:absolute; left:10px; top:7px;}
.um__dropdown__option__placeholder {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer; color:#c0c4cc;}
.um__dropdown__option__placeholder:hover {background:#f0f3f7;}
.um__dropdown__option {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer;}
.um__dropdown__option:hover {background:#f0f3f7;}
.um__dropdown__option__chooded {color:#409eff; font-weight:900;}
.um__dropdown__scrollClassName {width:5px; height:0; border-radius:3px; background:#e1e6ec; position:absolute; right:1px; top:0; z-index:100;} /*滚动条样式*/
.um__dropdown__contentbox {width:100%; overflow:hidden; position:relative;}
</style>