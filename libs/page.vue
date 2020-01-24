<template>
<div class="um__page__class">
	<div :class="{icon:true, um__page__arrowSimple:now!==1, um__page__arrowLeft:!first_left && now!==1 && showAnimation, um__page__arrow_disabled:now===1}" style="margin-right:10px" @mouseenter="toAbleShow" @mouseenter.once="first_left=false" @click="toPageUp">&#xe7e3;</div>  <!-- 上一页 -->


	<div :class="{icon:true, um__page__marginRight:true, um__page__simple:true, um__page__hoverOrNot:!first_l && now!==1, um__page__choosed:now==1}" @mouseenter.once="first_l=false" @click="toPageFirst">1</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__points:true}" v-show="view>3">...</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simple:true, um__page__hoverOrNot:!first_ml && now!==view-1, um__page__choosed:now===view-1}" v-show="maxPage>=2" @mouseenter.once="first_ml=false" @click="toPage(view-1)">{{view-1}}</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simple:true, um__page__hoverOrNot:!first_m && now!==view, um__page__choosed:now===view}" v-show="maxPage>=3" @mouseenter.once="first_m=false" @click="toPage(view)">{{view}}</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simple:true, um__page__hoverOrNot:!first_mr && now!==view+1, um__page__choosed:now===view+1}" v-show="maxPage>=4" @mouseenter.once="first_mr=false" @click="toPage(view+1)">{{view+1}}</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__points:true}" v-show="view<maxPage-2">...</div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simple:true, um__page__hoverOrNot:!first_r && now!==maxPage, um__page__choosed:now==maxPage}" v-show="maxPage>=5" @mouseenter.once="first_r=false" @click="toPageLast">{{maxPage}}</div>


	<div :class="{icon:true, um__page__arrowSimple:now!==maxPage, um__page__arrowRight:!first_right && now!==maxPage && showAnimation, um__page__arrow_disabled:now===maxPage}" style="margin-left:5px" @mouseenter="toAbleShow" @mouseenter.once="first_right=false" @click="toPageDown">&#xe7e4;</div>  <!-- 下一页 -->

	<div class="um__page__fnBox" v-show="sizeable!==undefined">每页&nbsp;<um-input style="width:40px" ref="um__page__inputIn1" v-model="sizeShow" @blur="toBlurSize"></um-input>&nbsp;条</div>

	<div class="um__page__fnBox" v-show="skipable!==undefined">跳转到&nbsp;<um-input style="width:40px" ref="um__page__inputIn2" v-model="nowShow" @blur="toBlurSkip"></um-input>&nbsp;页</div>
</div>
</template>

<script>
let vm=null;
let input1=null;
let input2=null;

let um__keyEnter1=function(event){
	if(input1===document.activeElement && event.keyCode==13){
		if(Number(vm.sizeShow)===0)return;
		if(Math.ceil(vm.sizeShow)===Math.floor(vm.sizeShow) && Math.ceil(vm.sizeShow)!==vm.realSize){
			vm.sizeNow=vm.sizeShow;
			vm.now=1;
			vm.$emit('sizeChange', {now:1, size:vm.realSize});
			input1.blur();
		}else if(Math.ceil(vm.sizeShow)===Math.floor(vm.sizeShow) && Math.ceil(vm.sizeShow)===vm.realSize){
			return;
		}else{
			vm.sizeShow=vm.sizeNow;
		};
	}
};
let um__keyEnter2=function(event){
	if(input2===document.activeElement && event.keyCode==13){
		if(Number(vm.nowShow)===0)return;
		if(Math.ceil(vm.nowShow)===Math.floor(vm.nowShow) && Math.ceil(vm.nowShow)<=vm.maxPage && Math.ceil(vm.nowShow)!==vm.now){
			let from=vm.now;
			vm.now=Math.ceil(vm.nowShow);
			vm.$emit('change', {from, now:vm.now, size:vm.realSize});
			input2.blur();
		}else if(Math.ceil(vm.nowShow)===Math.floor(vm.nowShow) && Math.ceil(vm.nowShow)===vm.now){
			return;
		}else{
			vm.nowShow=vm.now;
		};
	}
};

export default {
	props:['total', 'size', 'sizeable', 'skipable'],
	data(){
		return {
			showAnimation:false, // 是否显示箭头动画
			first_left:true, // 左箭头是否首次加载, 用于优化展示动画
			first_right:true, // 右箭头是否首次加载, 用于优化展示动画
			first_l:true, // 左边数字按钮是否首次加载, 用于优化展示动画
			first_ml:true, // 中间左边数字按钮是否首次加载, 用于优化展示动画
			first_m:true, // 中间数字按钮是否首次加载, 用于优化展示动画
			first_mr:true, // 中间右边数字按钮是否首次加载, 用于优化展示动画
			first_r:true, // 右边数字按钮是否首次加载, 用于优化展示动画
			now:1, // 当前实际页码
			nowShow:1, // 当前展示的页码
			sizeNow:'0', // 当前实际每页条数
			sizeShow:'0' // 当前展示的每页条数
		}
	},
	computed:{
		view:function(){ // 中间展示的页码
			if(this.maxPage<=5)return 3;
			if(this.maxPage==6){
				if(this.now>3)return 4;
				return 3;
			}
			if(this.maxPage>6){
				if(this.now>3 && this.now<this.maxPage-1)return this.now;
				if(this.now<=3)return 3;
				if(this.now>=this.maxPage-1)return this.maxPage-2;
			}
		},
		realTotal:function(){ // 数字类型的total
			return Number(this.total);
		},
		realSize:function(){ // 数字类型的size
			return Number(this.sizeNow);
		},
		maxPage:function(){ // 最大页数
			return Math.ceil(this.realTotal/this.realSize);
		}
	},
	methods:{
		toAbleShow(){
			this.showAnimation=true;
		},
		toBlurSize(){
			if(Math.ceil(this.sizeShow)!==Math.floor(this.sizeShow) || Number(this.sizeShow)===0)this.sizeShow=this.realSize;
		},
		toBlurSkip(){
			if(Math.ceil(this.nowShow)!==Math.floor(this.nowShow) || Number(this.nowShow)===0){
				this.nowShow=this.now;
			}else if(Math.ceil(this.nowShow)<=this.maxPage){
				this.nowShow=this.now;
			}
		},
		toPageUp(){
			if(this.now===1)return;
			let from=this.now;
			this.now--;
			this.$emit('change', {from, now:this.now, size:this.realSize});
		},
		toPageDown(){
			if(this.now===this.maxPage)return;
			let from=this.now;
			this.now++;
			this.$emit('change', {from, now:this.now, size:this.realSize});
		},
		toPageFirst(){
			this.showAnimation=false;
			let from=this.now;
			this.now=1;
			this.$emit('change', {from, now:this.now, size:this.realSize});
		},
		toPage(num){
			if(this.now==num)return;
			let from=this.now;
			this.now=num;
			this.$emit('change', {from, now:this.now, size:this.realSize});
		},
		toPageLast(){
			this.showAnimation=false;
			let from=this.now;
			this.now=this.maxPage;
			this.$emit('change', {from, now:this.now, size:this.realSize});
		}
	},
	mounted:function(){
		this.sizeNow=this.sizeShow=this.size;
		this.$nextTick(function(){
			if(this.sizeable!==undefined || this.skipable!==undefined)vm=this;
			if(this.sizeable!==undefined){
				input1=eval(this.$refs.um__page__inputIn1.id);
				input1.style.textAlign='right';
				_(document).BD('keydown', um__keyEnter1);
			}
			if(this.skipable!==undefined){
				input2=eval(this.$refs.um__page__inputIn2.id);
				input2.style.textAlign='right';
				_(document).BD('keydown', um__keyEnter2);
			}
		});
	},
	beforeDestroy:function(){
		if(this.sizeable!==undefined)_(document).unBD('keydown', um__keyEnter1);
		if(this.skipable!==undefined)_(document).unBD('keydown', um__keyEnter2);
	}
}
</script>

<style>
.um__page__class {height:28px; display:inline-block; position:relative; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none;}
.um__page__arrowSimple {width:40px; height:26px; font-size:12px; font-weight:900; line-height:26px; color:#606266; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid #A3A3A3;}
.um__page__arrowLeft {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowRight {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowLeft:hover, .um__page__arrowRight:hover, .um__page__hoverOrNot:hover, .um__page__choosed {animation:UM_MOUSEENTER .5s forwards; -webkit-animation:UM_MOUSEENTER .5s forwards; -o-animation:UM_MOUSEENTER .5s forwards; -moz-animation:UM_MOUSEENTER .5s forwards; -ms-animation:UM_MOUSEENTER .5s forwards;}
.um__page__arrow_disabled {width:40px; height:26px; font-size:12px; font-weight:900; line-height:26px; text-align:center; border-radius:3px; display:inline-block; cursor:not-allowed; border:1px solid #cfcfcf; color:#cfcfcf;}
.um__page__marginRight {margin-right:5px;}

.um__page__simple {min-width:15px; height:26px; padding:0 5px; line-height:26px; font-size:12px; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid #A3A3A3; color:#606266;}
.um__page__hoverOrNot {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__points {min-width:15px; height:20px; line-height:20px; font-size:12px; color:#606266; text-align:center; border-radius:3px; cursor:default; display:inline-block; border:1px solid transparent; position:relative; top:3px;}

.um__page__fnBox {height:26px; line-height:24px; display:inline-block; margin-left:15px; font-size:10px; color:#A3A3A3;}
</style>