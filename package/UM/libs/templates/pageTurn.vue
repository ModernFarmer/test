<template>
<div class="UM_pageTurn_ajax_OutBigBox">
	<div :class="'UM_pageTurn_ajax_ContentBox_'+num">
		<div :class="'UM_pageTurn_ajax_ContentScroll UM_pageTurn_ajax_ContentScroll_'+num"></div>
		<div :class="'UM_pageTurn_ajax_scrollContentBox_'+num">
			<slot></slot>
		</div>
	</div>
	<div :class="'UM_pageTurn_ajax_functionBox_'+num">
		<div class="UM_pageTurn_ajax_functionButtonBox">
			<div class="UM_pageTurn_ajax_up" @click="UM_pageTurn_ajax_turnTo('up')">上一页</div>
			<div class="UM_pageTurn_ajax_pageBox">
				<div :class="{UM_pageTurn_ajax_pageF:true, UM_pageTurn_ajax_now_bk:now==1}" @click="UM_pageTurn_ajax_turnTo(1)">            <!-- 页数按钮_前面第一个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">1</span>
				</div>
			
				<div :class="{UM_pageTurn_ajax_pageF2:true, UM_pageTurn_ajax_now_bk:now==2}" v-if="view==4&&pageSum>1" @click="UM_pageTurn_ajax_turnTo(2)">   <!-- 页数按钮_前面第二个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">2</span>
				</div>          
				<div class="UM_pageTurn_ajax_pointF" v-if="pageSum>3 && view>4"><span class="UM_pageTurn_ajax_pageText">......</span></div>
				 
				<div :class="{UM_pageTurn_ajax_pageM1:true, UM_pageTurn_ajax_now_bk:now==view-1}" v-if="pageSum>2" @click="UM_pageTurn_ajax_turnTo(3)">        <!-- 页数按钮_中间第一个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">{{view-1}}</span>
				</div>
				<div :class="{UM_pageTurn_ajax_pageM2:true, UM_pageTurn_ajax_now_bk:now==view}" v-if="pageSum>3" @click="UM_pageTurn_ajax_turnTo(4)">          <!-- 页数按钮_中间第二个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">{{view}}</span>
				</div>
				<div :class="{UM_pageTurn_ajax_pageM3:true, UM_pageTurn_ajax_now_bk:now==view+1}" v-if="pageSum>4" @click="UM_pageTurn_ajax_turnTo(5)">        <!-- 页数按钮_中间第三个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">{{view+1}}</span>
				</div>
				<div :class="{UM_pageTurn_ajax_pageN2:true, UM_pageTurn_ajax_now_bk:(pageSum==6 && now==pageSum) || (pageSum>6 && now==pageSum-1)}" v-if="pageSum>5&&(pageSum==6||pageSum==7||((pageSum-view)==3))" @click="UM_pageTurn_ajax_turnTo(6)">            <!-- 页数按钮_倒数第二个按钮 -->
					<span class="UM_pageTurn_ajax_pageText">{{view+2}}</span>
				</div>          
				<div class="UM_pageTurn_ajax_pointN" v-if="pageSum>7 && (pageSum-view)>3"><span class="UM_pageTurn_ajax_pageText">......</span></div>
			
				<div :class="{UM_pageTurn_ajax_pageN:true, UM_pageTurn_ajax_now_bk:now==pageSum}" v-if="pageSum>6" @click="UM_pageTurn_ajax_turnTo(7)">            <!-- 页数按钮_尾页按钮 -->
					<span class="UM_pageTurn_ajax_pageText" v-text="pageSum"></span>
				</div>       
			</div>
			<div class="UM_pageTurn_ajax_down" @click="UM_pageTurn_ajax_turnTo('down')">下一页</div>
			<div class="UM_pageTurn_ajax_turnBox">
				<span class="UM_pageTurn_ajax_turnText">跳转到第</span>
				<input type="text" class="UM_pageTurn_ajax_turnIpt" title="请输入正整数" @input="UM_pageTurn_ajax_mustBeNum_goto" v-model="goTo">
				<span class="UM_pageTurn_ajax_turnText">页</span>
				<div class="UM_pageTurn_ajax_turnGo" @click="UM_pageTurn_ajax_turnTo('goTo')">确定</div>
			</div>
		</div>
		<div class="UM_pageTurn_ajax_showTotalNow">第<span class="UM_pageTurn_ajax_showTotal_num">{{now}}</span>页&nbsp;/&nbsp;共<span class="UM_pageTurn_ajax_showTotal_num">{{pageSum}}</span>页</div>
		<div class="UM_pageTurn_ajax_limitTotal">
			<span class="UM_pageTurn_ajax_limitTotalText">每页显示</span>
			<input type="text" class="UM_pageTurn_ajax_limitTotalInput" v-model="showingNum" @input="UM_pageTurn_ajax_mustBeNum_showNum" @blur="UM_pageTurn_ajax_showNum">
			<span class="UM_pageTurn_ajax_limitTotalText">条</span>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			now:1,                 //当前第几页             -可以手动设置-
			goTo:null,             //直接跳转到哪一页       !!!!!!这个属性绝对不能手动设置!!!!!!
			customHeight:false,    //是否自适应每条数据的高度       !!!!!!这个属性绝对不能手动设置!!!!!!
			resultLength:0,          //翻页数据的总条数, 用于计算总页数
			showingNum:0,           //储存在本组件的当前每页数据显示条数
			showingNum_now:0,       //当前每页显示条数
			queryCondition:{}       //储存在本组件的查询条件
		}
	},
	computed:{
		view:function(){     //最中间按钮显示的数字
			if(this.now<5 || this.pageSum<=7)return 4;
			if(this.now>=this.pageSum-3)return this.pageSum-3;
			return this.now;
		},
		pageSum:function(){     //总页数
			return Math.ceil(this.resultLength/this.showingNum_now);
		},
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	props:['pageContent'],
	methods:{
		UM_pageTurn_ajax_turnTo(index){
			let UM_nowValue=null;
			switch (index){
				case 1:
					UM_nowValue=1;
					break;
				case 2:
					UM_nowValue=2;
					break;
				case 3:
					if(this.now<=3){
						UM_nowValue=3;
					}else if(this.now==this.view){
						UM_nowValue=this.now-1;
					}else{
						if(this.pageSum<8){
							UM_nowValue=3;
						}else{
							UM_nowValue=this.pageSum-4;
						};
					};
					break;
				case 4:
					if(this.now<this.view){
						UM_nowValue=4;
					}else if(this.now>this.view){
						if(this.pageSum==5){
							UM_nowValue=4;
						}else if(this.pageSum==6){
							UM_nowValue=4;
						}else{
							UM_nowValue=this.pageSum-3;
						};
					}
					break;
				case 5:
					if(this.pageSum==5){
						UM_nowValue=5;
					}else if(this.pageSum==6){
						UM_nowValue=5;
					}else{
						if(this.now>=this.pageSum-3){
							UM_nowValue=this.pageSum-2;
						}else if(this.now==this.view){
							UM_nowValue=this.now+1;
						}else{
							UM_nowValue=5;
						};
					};
					break;
				case 6:
					if(this.pageSum==6){
						UM_nowValue=this.pageSum;
					}else{
						UM_nowValue=this.pageSum-1;
					};
					break;
				case 7:
					UM_nowValue=this.pageSum;
					break;
				case 'up':
					if(this.now>1){
						UM_nowValue=this.now-1;
					}else{
						UM_nowValue=this.now;
					};
					break;
				case 'down':
					if(this.now<this.pageSum){
						UM_nowValue=this.now+1;
					}else{
						UM_nowValue=this.now;
					};
					break;
				case 'goTo':
					if(this.goTo && !isNaN(this.goTo)){
						if(this.goTo>this.pageSum){
							UM_nowValue=this.now;
							alert('输入的数字超过总页数,请输入小于或等于 '+this.pageSum+' 的正整数');
							this.goTo=null;
						}else{
							UM_nowValue=parseInt(this.goTo);
							this.goTo=null;
						};
					}else{
						UM_nowValue=this.now;
					};
					break;
			};

			if(UM_nowValue==this.now)return;

			let UM_pageTurnCondition=JSON.parse(JSON.stringify(this.queryCondition));

			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageNumberName]=UM_nowValue;
			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageSizeName]=this.showingNum_now;

			if(this.pageContent.required){
				let required=this.pageContent.required();
				for(let key in required){
					UM_pageTurnCondition[key]=required[key];
				};
			}

			_ajax({
				url:this.pageContent.url(),
				method:'post',
				data:UM_pageTurnCondition,
				success:data=>{
					let need=this.pageContent.getNeedData(data);
					this.now=UM_nowValue;
					this.resultLength=need.total;
					this.pageContent.result=need.result;

					if(!this.customHeight){
						window['timer_pageTurn_ajax2_'+this.num]=setInterval(()=>{
							if(_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children.length>0){
								clearInterval(window['timer_pageTurn_ajax2_'+this.num]);
								delete window['timer_pageTurn_ajax2_'+this.num];
								for(let i=0; i<this.pageContent.result.length; i++){
									_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children[i].className+=' UM_pageTurn_ajax_ContentList_'+this.num+'_'+i;
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentBox_'+this.num, {height:1/this.pageContent.pageSize}); //自适应内容列表容器高度
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i, {lineHeight:1});
								};
							}
						});
					}
				}
			});
		},
		UM_pageTurn_ajax_mustBeNum_goto(){
			if(!(/^[0-9]+$/.test(this.goTo)) || this.goTo==0)this.goTo=null;         //防止非数字、小数和负数输入到输入框
		},
		UM_pageTurn_ajax_mustBeNum_showNum(){
			if(!(/^[0-9]+$/.test(this.showingNum)) || this.showingNum==0)this.showingNum=this.showingNum_now;         //防止非数字、小数和负数输入到输入框
		},
		UM_pageTurn_ajax_showNum(){
			if(this.showingNum==this.showingNum_now)return;

			this.showingNum_now=this.showingNum;

			let UM_pageTurnCondition=JSON.parse(JSON.stringify(this.queryCondition));

			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageNumberName]=1;
			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageSizeName]=this.showingNum;

			if(this.pageContent.required){
				let required=this.pageContent.required();
				for(let key in required){
					UM_pageTurnCondition[key]=required[key];
				};
			}

			_ajax({
				url:this.pageContent.url(),
				method:'post',
				data:UM_pageTurnCondition,
				success:data=>{
					let need=this.pageContent.getNeedData(data);
					this.now=1;
					this.resultLength=need.total;
					this.pageContent.result=need.result;
					this.pageContent.pageSize=this.showingNum_now;

					if(!this.customHeight){
						window['timer_pageTurn_ajax3_'+this.num]=setInterval(()=>{
							if(_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children.length>0){
								clearInterval(window['timer_pageTurn_ajax3_'+this.num]);
								delete window['timer_pageTurn_ajax3_'+this.num];
								for(let i=0; i<this.pageContent.result.length; i++){
									_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children[i].className+=' UM_pageTurn_ajax_ContentList_'+this.num+'_'+i;
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentBox_'+this.num, {height:1/this.pageContent.pageSize}); //自适应内容列表容器高度
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i, {lineHeight:1});
								};
							}
						});
					}
				}
			});
		}
	},
	watch:{
		'pageContent.query.run':function(a,b){
			let UM_pageTurnCondition=JSON.parse(JSON.stringify(this.pageContent.query.condition));

			for(let key in UM_pageTurnCondition){     //删除值为空的字段
				if((typeof UM_pageTurnCondition[key]==='string' && UM_pageTurnCondition[key].replace(/\s/g, '')==='') || !UM_pageTurnCondition[key])delete UM_pageTurnCondition[key];
			};

			this.queryCondition=JSON.parse(JSON.stringify(UM_pageTurnCondition));

			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageNumberName]=1;
			UM_pageTurnCondition[this.pageContent.setPageTurnName.pageSizeName]=this.showingNum_now;

			if(this.pageContent.required){
				let required=this.pageContent.required();
				for(let key in required){
					UM_pageTurnCondition[key]=required[key];
				};
			}

			_ajax({
				url:this.pageContent.url(),
				method:'post',
				data:UM_pageTurnCondition,
				success:data=>{
					let need=this.pageContent.getNeedData(data);
					this.now=1;
					this.resultLength=need.total;
					this.pageContent.result=need.result;

					if(!this.customHeight){
						window['timer_pageTurn_ajax4_'+this.num]=setInterval(()=>{
							if(_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children.length>0){
								clearInterval(window['timer_pageTurn_ajax4_'+this.num]);
								delete window['timer_pageTurn_ajax4_'+this.num];
								for(let i=0; i<this.pageContent.result.length; i++){
									_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children[i].className+=' UM_pageTurn_ajax_ContentList_'+this.num+'_'+i;
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentBox_'+this.num, {height:1/this.pageContent.pageSize}); //自适应内容列表容器高度
									_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i, {lineHeight:1});
								};
							}
						});
					}

					if(this.pageContent.query.success)this.pageContent.query.success(need.result);
				}
			});
		}
	},
	mounted:function(){
		if(this.pageContent.customHeight)this.customHeight=this.pageContent.customHeight;

		_('.UM_pageTurn_ajax_ContentBox_'+this.num).css({width:'100%', height:'calc(100% - 45px)', overflow:'hidden', position:'absolute', left:'0', top:'0'});

		if(this.pageContent.scrollStyle)_('.UM_pageTurn_ajax_ContentScroll_'+this.num).css(this.pageContent.scrollStyle);

		_('.UM_pageTurn_ajax_scrollContentBox_'+this.num).css({width:'100%', position:'absolute', left:'0', top:'0'});

		_('.UM_pageTurn_ajax_functionBox_'+this.num).css({width:'100%', height:'45px', position:'absolute', left:'0', bottom:'0', zIndex:10});

		_('.UM_pageTurn_ajax_functionButtonBox').choosable();

		this.showingNum=this.showingNum_now=this.pageContent.pageSize;

		let UM_pageTurnCondition={
			[this.pageContent.setPageTurnName.pageNumberName]:1,
			[this.pageContent.setPageTurnName.pageSizeName]:this.pageContent.pageSize
		};

		if(this.pageContent.required){
			let required=this.pageContent.required();
			for(let key in required){
				UM_pageTurnCondition[key]=required[key];
			};
		}

		_MovingScroll({
		    box:_('.UM_pageTurn_ajax_ContentBox_'+this.num, 0),
		    contentBox:_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0),
		    scrollBox:_('.UM_pageTurn_ajax_ContentScroll_'+this.num, 0),
		    speed:this.pageContent.scrollSpeed?this.pageContent.scrollSpeed:200,
		    watch_keyup:true,
		    watch_mouseup:true
		});

		_ajax({
			url:this.pageContent.url(),
			method:'post',
			data:UM_pageTurnCondition,
			success:data=>{
				let need=this.pageContent.getNeedData(data);
				this.resultLength=need.total;
				this.pageContent.result=need.result;

				if(!this.customHeight){
					window['timer_pageTurn_ajax1_'+this.num]=setInterval(()=>{
						if(_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children.length>0){
							clearInterval(window['timer_pageTurn_ajax1_'+this.num]);
							delete window['timer_pageTurn_ajax1_'+this.num];
							for(let i=0; i<this.pageContent.result.length; i++){
								_('.UM_pageTurn_ajax_scrollContentBox_'+this.num, 0).el.children[i].className+=' UM_pageTurn_ajax_ContentList_'+this.num+'_'+i;
								_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentBox_'+this.num, {height:1/this.pageContent.pageSize}); //自适应内容列表容器高度
								_('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i).setH('.UM_pageTurn_ajax_ContentList_'+this.num+'_'+i, {lineHeight:1});
							};
						}
					});
				}
			}
		});
	}
}
</script>