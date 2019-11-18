<template>
<div class="um__dropdown__class">
	<div class="um__dropdown__disabled" v-if="isCover"></div>   <!-- 禁用遮罩 -->
	<div class="um__dropdown__input" :id="'caption'+num">
		<span :class="{um__dropdown__show__placeholder:empty}">{{text}}</span>
		<div class="um__dropdown__icon"></div>
	</div>
	<div class="um___dropdown__container" :id="'down'+num">
		<div class="um___dropdown__search" @click.stop>
			<input class="um___dropdown__searchInput" type="text">
		</div>
		<div class="um__dropdown__option__placeholder" v-if="clearable!==undefined" @click="toClearSelecter">{{placeholder?placeholder:'请选择 ...'}}</div>
		<div :class="{um__dropdown__option:true, um__dropdown__option__chooded:index==index_now}" v-for="(val, index) in list" :key="'key'+num+'_'+index" @click="toSelect(val, index)">{{optionList[index]}}</div>
	</div>
</div>
</template>

<script>
export default {
	props:['list', 'value', 'icon', 'selected', 'model', 'maxHeight', 'view', 'option', 'disabled', 'clearable', 'placeholder'],
	data(){
		return {
			pullDownObj:null,
			index_now:null,
			text:this.placeholder?this.placeholder:'请选择 ...',
			empty:false
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
			return this.list.map(item=>{
				return this.toFilterOption(item, this.option);
			});
		}
	},
	watch:{
		list:function(){
			console.log(123)
		}
	},
	methods:{
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
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.pullDownObj=_PullDown({
			    caption:`#caption${this.num}`,
			    down:`#down${this.num}`,
			    maxHeight:this.maxHeight || '220px',
			    speed:.2
			});
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
		document.onclick=function(){
			console.log(123)
		}
	}
}
</script>

<style>
.um__dropdown__class {width:220px; height:30px; color:#606266; position:relative;}
.um__dropdown__disabled {width:100%; height:100%; background:rgba(0,0,0,.1); cursor:not-allowed; border-radius:3px; position:absolute; left:0; top:0; z-index:10;}
.um__dropdown__show__placeholder {color:#c0c4cc;}
.um__dropdown__input {width:calc(100% - 7px); height:calc(100% - 2px); font-size:14px; line-height:28px; background:white; overflow:hidden; padding-left:5px; border-radius:3px; border:1px solid #c0c4cc;}
.um__dropdown__icon {width:26px; height:calc(100% - 4px); background:white; position:absolute; right:2px; top:2px; z-index:5;}
.um___dropdown__container {width:calc(100% - 2px); overflow:hidden; padding:5px 0; background:white; border-radius:3px; border:1px solid #e4e7ed; box-shadow:0 0 5px #e4e7ed; position:absolute; left:0; top:calc(100% + 5px);}
.um___dropdown__search {width:100%; height:40px; position:relative;}
.um___dropdown__searchInput {width:calc(100% - 30px); height:24px; padding-left:5px; background:transparent; border:1px solid #e4e7ed; border-radius:3px; position:absolute; left:10px; top:7px;}
.um__dropdown__option__placeholder {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer; color:#c0c4cc;}
.um__dropdown__option__placeholder:hover {background:#f0f3f7;}
.um__dropdown__option {width:calc(100% - 10px); line-height:28px; font-size:14px; padding-left:10px; cursor:pointer;}
.um__dropdown__option:hover {background:#f0f3f7;}
.um__dropdown__option__chooded {color:#409eff; font-weight:900;}
.UM_PullDown_scrollClassName {width:5px; border-radius:3px; background:#e1e6ec;} /*滚动条样式*/
</style>