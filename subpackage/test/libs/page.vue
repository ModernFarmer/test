<template>
<div class="um__page__class">
	<div :class="{icon:true, um__page__arrowSimple_simple:true, [`um__page__arrowLineH_${plugSize}`]:now!==1, um__page__arrowLeft:!first_left && now!==1 && showAnimation, um__page__arrow_disabled_simple:now===1, [`um__page__arrow_disabled_lineH_${plugSize}`]:now===1}" style="margin-right:10px" @mouseenter="toAbleShow" @mouseenter.once="first_left=false" @click="toPageUp"><span class="um__page__displacement">&#xe7e3;</span></div>  <!-- 上一页 -->


	<div :class="{icon:true, um__page__marginRight:true, um__simplePage__simple:true, [`um__page__simple_${plugSize}`]:true, um__page__hoverOrNot:!first_l && now!==1, um__page__choosed:now==1}" @mouseenter.once="first_l=false" @click="toPageFirst"><span class="um__page__displacement">1</span></div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simplePoints:true, [`um__page__points_${plugSize}`]:true}" v-show="view>3">...</div>


	<div :class="{icon:true, um__page__marginRight:true, um__simplePage__simple:true, [`um__page__simple_${plugSize}`]:true, um__page__hoverOrNot:!first_ml && now!==view-1, um__page__choosed:now===view-1}" v-show="maxPage>=2" @mouseenter.once="first_ml=false" @click="toPage(view-1)"><span class="um__page__displacement">{{view-1}}</span></div>


	<div :class="{icon:true, um__page__marginRight:true, um__simplePage__simple:true, [`um__page__simple_${plugSize}`]:true, um__page__hoverOrNot:!first_m && now!==view, um__page__choosed:now===view}" v-show="maxPage>=3" @mouseenter.once="first_m=false" @click="toPage(view)"><span class="um__page__displacement">{{view}}</span></div>


	<div :class="{icon:true, um__page__marginRight:true, um__simplePage__simple:true, [`um__page__simple_${plugSize}`]:true, um__page__hoverOrNot:!first_mr && now!==view+1, um__page__choosed:now===view+1}" v-show="maxPage>=4" @mouseenter.once="first_mr=false" @click="toPage(view+1)"><span class="um__page__displacement">{{view+1}}</span></div>


	<div :class="{icon:true, um__page__marginRight:true, um__page__simplePoints:true, [`um__page__points_${plugSize}`]:true}" v-show="view<maxPage-2">...</div>


	<div :class="{icon:true, um__page__marginRight:true, um__simplePage__simple:true, [`um__page__simple_${plugSize}`]:true, um__page__hoverOrNot:!first_r && now!==maxPage, um__page__choosed:now==maxPage}" v-show="maxPage>=5" @mouseenter.once="first_r=false" @click="toPageLast"><span class="um__page__displacement">{{maxPage}}</span></div>


	<div :class="{icon:true, um__page__arrowSimple_simple:true, [`um__page__arrowLineH_${plugSize}`]:now!==maxPage, um__page__arrowRight:!first_right && now!==maxPage && showAnimation, um__page__arrow_disabled_simple:now===maxPage, [`um__page__arrow_disabled_lineH_${plugSize}`]:now===maxPage}" style="margin-left:5px" @mouseenter="toAbleShow" @mouseenter.once="first_right=false" @click="toPageDown"><span class="um__page__displacement">&#xe7e4;</span></div>  <!-- 下一页 -->

	<div :class="`um__page__simpleFnBox um__page__fnBox_${plugSize}`" v-show="sizeable!==undefined"><span class="um__page__displacement">每页&nbsp;</span><b-input class="um__page_fn_umInput" :size="plugSize" ref="um__page__inputIn1" v-model="sizeShow" @blur="toBlurSize"></b-input><span class="um__page__displacement">&nbsp;条</span></div>

	<div :class="`um__page__simpleFnBox um__page__fnBox_${plugSize}`" v-show="skipable!==undefined"><span class="um__page__displacement">跳转到&nbsp;</span><b-input class="um__page_fn_umInput" :size="plugSize" ref="um__page__inputIn2" v-model="nowShow" @blur="toBlurSkip"></b-input><span class="um__page__displacement">&nbsp;页</span></div>
</div>
</template>

<script>
export default {
	props:['total', 'pageSize', 'sizeable', 'skipable', 'size'],
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
			sizeShow:'0', // 当前展示的每页条数
			sizeArr:['default', 'big', 'small'], // 大小规格size数组, 用于检测size是否正确
			input1:null, // 每页显示条数功能的输入框(如果有)
			input2:null // 当前展示页码功能的输入框(如果有)
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
			return Number(this.total) || 1;
		},
		realSize:function(){ // 数字类型的size
			return Number(this.sizeNow) || 10;
		},
		maxPage:function(){ // 最大页数
			return Math.ceil(this.realTotal/this.realSize);
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
		},
		um__keyEnter1(event){
			if(this.input1===document.activeElement && event.keyCode==13){
				if(Number(this.sizeShow)===0)return;
				if(Math.ceil(this.sizeShow)===Math.floor(this.sizeShow) && Math.ceil(this.sizeShow)!==this.realSize){
					this.sizeNow=this.sizeShow;
					this.now=1;
					this.$emit('sizeChange', {now:1, size:this.realSize});
					this.input1.blur();
				}else if(Math.ceil(this.sizeShow)===Math.floor(this.sizeShow) && Math.ceil(this.sizeShow)===this.realSize){
					return;
				}else{
					this.sizeShow=this.sizeNow;
				};
			}
		},
		um__keyEnter2(event){
			if(this.input2===document.activeElement && event.keyCode==13){
				if(Number(this.nowShow)===0)return;
				if(Math.ceil(this.nowShow)===Math.floor(this.nowShow) && Math.ceil(this.nowShow)<=this.maxPage && Math.ceil(this.nowShow)!==this.now){
					let from=this.now;
					this.now=Math.ceil(this.nowShow);
					this.$emit('change', {from, now:this.now, size:this.realSize});
					this.input2.blur();
				}else if(Math.ceil(this.nowShow)===Math.floor(this.nowShow) && Math.ceil(this.nowShow)===this.now){
					return;
				}else{
					this.nowShow=this.now;
				};
			}
		}
	},
	mounted:function(){
		this.sizeNow=this.sizeShow=this.pageSize;
		this.$nextTick(function(){
			if(this.sizeable!==undefined){
				this.input1=eval(this.$refs.um__page__inputIn1.id);
				this.input1.style.textAlign='right';
				_BD(document, 'keydown', this.um__keyEnter1);
			}
			if(this.skipable!==undefined){
				this.input2=eval(this.$refs.um__page__inputIn2.id);
				this.input2.style.textAlign='right';
				_BD(document, 'keydown', this.um__keyEnter2);
			}
		});
	},
	beforeDestroy:function(){
		if(this.sizeable!==undefined)_unBD(document, 'keydown', this.um__keyEnter1);
		if(this.skipable!==undefined)_unBD(document, 'keydown', this.um__keyEnter2);
	}
}
</script>

<style>
.um__page__class {display:inline-block; position:relative; -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; -o-user-select:none; user-select:none;}
.um__page__displacement {position:relative; top:1px;}

.um__page__arrowSimple_simple {width:40px; background:white; font-size:12px; font-weight:900; color:#606266; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid #A3A3A3;}
.um__page__arrowLineH_default {height:26px; line-height:26px;}
.um__page__arrowLineH_big {height:32px; line-height:32px;}
.um__page__arrowLineH_small {height:20px; line-height:19px;}

.um__page__arrowLeft {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowRight {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowLeft:hover, .um__page__arrowRight:hover, .um__page__hoverOrNot:hover, .um__page__choosed {animation:UM_MOUSEENTER .5s forwards; -webkit-animation:UM_MOUSEENTER .5s forwards; -o-animation:UM_MOUSEENTER .5s forwards; -moz-animation:UM_MOUSEENTER .5s forwards; -ms-animation:UM_MOUSEENTER .5s forwards;}

.um__page__arrow_disabled_simple {width:40px; background:white; font-size:12px; font-weight:900; text-align:center; border-radius:3px; display:inline-block; cursor:not-allowed; border:1px solid #cfcfcf; color:#cfcfcf;}
.um__page__arrow_disabled_lineH_default {height:26px; line-height:26px;}
.um__page__arrow_disabled_lineH_big {height:32px; line-height:32px;}
.um__page__arrow_disabled_lineH_small {height:20px; line-height:19px;}

.um__page__marginRight {margin-right:5px;}

.um__simplePage__simple {min-width:15px; background:white; padding:0 5px; font-size:12px; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid #A3A3A3; color:#606266;}
.um__page__simple_default {height:26px; line-height:26px;}
.um__page__simple_big {height:32px; line-height:32px;}
.um__page__simple_small {height:20px; line-height:19px;}

.um__page__hoverOrNot {animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}

.um__page__simplePoints {min-width:15px; font-size:12px; color:#606266; text-align:center; border-radius:3px; cursor:default; display:inline-block; border:1px solid transparent; position:relative; top:3px;}
.um__page__points_default {height:20px; line-height:20px;}
.um__page__points_big {height:26px; line-height:26px;}
.um__page__points_small {height:14px; line-height:19px;}

.um__page__simpleFnBox {display:inline-block; margin-left:15px; font-size:10px; color:#A3A3A3;}
.um__page__fnBox_default {height:26px; line-height:26px;}
.um__page__fnBox_big {height:32px; line-height:32px;}
.um__page__fnBox_small {height:20px; line-height:19px;}

.um__page_fn_umInput {width:40px;}
</style>