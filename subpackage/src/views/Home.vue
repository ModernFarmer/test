<template>
<div class="mainRouteBox">
	<um-row style="background:white">
		<row-left width="90">
			<div class="mainList_searchBox">
				<div class="mainList_searchTitle" @click="toChooseListType">
					<div class="mainList_stLeft">{{businessList[businessNow].value}}</div>
					<div class="mainList_stRight">&#xe629;</div>
				</div>
				<um-input style="margin-left:1rem" width="12" placeholder="请输入搜索词" v-model="searchWord"></um-input>
				<div class="mainList_searchIcon" @click="toSearch">&#xe651;</div>
			</div>
		</row-left>
		<row-right class="mainList_icon" width="10" @click="toPesonCenter">&#xe67f;</row-right>
	</um-row>

	<um-row style="margin-top:1rem">
		<row-middle :class="{mainList_rowClass:true, mainList_rowChoosed:businessNow===index}" width="20" v-for="(val, index) in businessList" :key="index" @click="toChooseType(index)">
			<span>{{val.value}}</span>
			<div class="mainList_sign" v-show="businessNow===index"></div>
		</row-middle>
	</um-row>

	<div class="mainList_mainContentBox" v-if="businessNow===0">   <!-- 门票主要内容 -->
		<um-row class="mainList_barBox">
			<row-left width="80">
				<span>游玩日期</span><br>
				<span class="mainList_datetime">{{playDate}}</span>
			</row-left>
			<row-right width="20" @click="toShowDateModal">
				<span class="mainList_dateIcon">&#xe808;</span>
			</row-right>
		</um-row>

		<um-scroll-load class="mainList_scrollLoadBox" height="calc(100% - 5.9rem)" v-model="isScenicBottom" @load="toScrollLoad">
			<div class="mainList_ticketContentBox">
				<div class="mainList_ticketListBox" v-for="(item, k) in scenicList" :key="k">
					<um-row @click="toFoldOrUnfold(item, k)">
						<row-left width="60">
							<div class="mainList_ticket_subArrow">
								<div :class="{mainList_ticket_arrSign:true, mainList_ticket_fold:item._fold, mainList_ticket_unfold:!item._fold}">&#xe630;</div>
							</div>
							<div class="mainList_ticket_space"></div>
							<div class="mainList_ticket_mainBox">
								<span class="mainList_ticket_cienName">{{'青海湖景区-青海湖景区-青海湖景区'}}</span><br>
								<span class="mainList_ticket_subCienName">{{'杭州市西湖区'}}</span>
							</div>
						</row-left>
						<row-right width="40">
							<span class="mainList_ticket_subPriceS">¥</span>&nbsp;
							<span class="mainList_ticket_cienPrice">{{358}}</span>&nbsp;
							<span class="mainList_ticket_subPriceT">起</span>
							<br>
							<span class="mainList_ticket_subCienName">{{199}}人已购买</span>
						</row-right>
					</um-row>
					<div :id="idKey+'_ticket_'+k" class="mainList_ticket_xingBox" :style="{height:item._height}">
						<div class="icon mainList_ticket_itemBox" v-for="(val, index) in [1,2,3]" :key="index">
							<um-row>
								<row-left class="mainList_ticket_itemName" width="45">
									{{'宋城湘湖景区成人票-名字一定要长'}}
									<div class="mainList_ticket_itemIcon" v-if="true">&nbsp;&#xe674;</div>
								</row-left>
								<row-middle class="mainList_ticket_itemName" width="20">¥{{150}}</row-middle>
								<row-right width="35">
									<um-number-picker min="0"></um-number-picker>
								</row-right>
							</um-row>
							<div class="mainList_ticket_timeBox">
								<div :class="{mainList_ticket_timeItem:true, mainList_ticket_timeChooesed:j===1}" v-for="(t, j) in [1,2,3,4]" :key="j">{{'10:00 - 12:00'}}</div>
							</div>
						</div>
						<um-row v-if="true">
							<row-left width="60">
								<span class="mainList_ticket_subPriceZ">总计&nbsp;</span>
								<span class="mainList_ticket_subPriceS">¥&nbsp;</span>
								<span class="mainList_ticket_cienPrice">{{150}}</span>
							</row-left>
							<row-right width="40">
								<um-button style="font-size:1rem" type="orange" size="small">立即购买</um-button>
							</row-right>
						</um-row>
					</div>
				</div>
			</div>
		</um-scroll-load>
	</div>

	<div class="mainList_mainContentBox" v-if="businessNow===1">
		<div style="width:100%; font-size:1.4rem; color:gray; text-align:center; line-height:16rem;">酒店建设中, 敬请期待 ...</div>
	</div>

	<div class="mainList_mainContentBox" v-if="businessNow===2">
		<div style="width:100%; font-size:1.4rem; color:gray; text-align:center; line-height:16rem;">餐饮建设中, 敬请期待 ...</div>
	</div>

	<div class="mainList_mainContentBox" v-if="businessNow===3">
		<div style="width:100%; font-size:1.4rem; color:gray; text-align:center; line-height:16rem;">商品建设中, 敬请期待 ...</div>
	</div>

	<div class="mainList_mainContentBox" v-if="businessNow===4">
		<div style="width:100%; font-size:1.4rem; color:gray; text-align:center; line-height:16rem;">跟团游建设中, 敬请期待 ...</div>
	</div>

	<um-modal v-model="selectType" ref="typeModal">
		<div class="mainList_scrollBox">
			<um-row class="mainList_option" v-for="(val, index) in businessList" :key="index" @click="toChooseType(index)">
				<row-middle :class="{mainList_select:true, mainList_choosed:businessNow===index}" width="100">{{val.value}}</row-middle>
			</um-row>
		</div>
	</um-modal>
	<um-date ref="dateModal" :show.sync="showDate" v-model="playDate"></um-date>
</div>
</template>

<script>
export default {
	data(){
		return {
			selectType: false,
			showDate: false,
			businessList: [{key:'1', value:'门票'}, {key:'2', value:'酒店'}, {key:'1', value:'餐饮'}, {key:'1', value:'商品'}, {key:'1', value:'跟团游'}],
			searchWord: '',  // 搜索关键字
			businessNow: 0,
			playDate: '',
			scenicList: [{_height:0, _fold:true}, {_height:0, _fold:true}], // 景区列表数据
			isScenicBottom: false // 门票是否已加载完毕
		}
	},
	computed:{
		idKey:function(){
			return 'umMainList'+Math.ceil(Math.random()*100000);
		}
	},
	methods:{
		toPesonCenter(){ // 个人中心
			this.$router.push({path:'/posonCenter'}).catch(()=>{});
		},
		toFoldOrUnfold(item, k){
			if(item._fold){
				this.scenicList[k]._fold=false;
				this.scenicList[k]._height=this.computHeight(this.idKey+'_ticket_'+k)+'px';
			}else{
				this.scenicList[k]._fold=true;
				this.scenicList[k]._height=0;
			};
		},
		toScrollLoad(){ // 滚动条滚动到底部时加载数据
			console.log(123123)
		},
		toChooseListType(){ // 呼出选择业态弹框
			this.selectType=true;
		},
		toChooseType(index){ // 选择业态
			this.businessNow=index;
			this.$refs.typeModal.closeModal();
		},
		toSearch(){ // 头部搜索

		},
		toShowDateModal(){ // 显示日期弹框
			this.showDate=true;
		},

		computHeight(id){
			let h=0, dom=eval(id);
			for(let i=0; i<dom.children.length; i++){
				h+=dom.children[i].offsetHeight;
			};
			return h;
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
		this.playDate=_dateFormat(new Date(), 'Y-M-D');
	}
}
</script>

<style>
.mainList_icon {font-size:2rem;}
.mainList_searchBox {width:100%; height:3rem; line-height:3rem; border-radius:1.5rem; background:#f2f5f8;}
.mainList_searchTitle {width:6rem; height:2rem; padding-left:1rem; line-height:2rem; display:inline-block; border-right:1px solid #d0d5da; position:relative;}
.mainList_searchIcon {width:1.5rem; height:2rem; text-align:center; line-height:2rem; display:inline-block; margin-left:.4rem; position:relative; top:1px;}
.mainList_stLeft {width:4rem; font-size:1rem; text-align:center; display:inline-block;}
.mainList_stRight {width:2rem; text-align:center; display:inline-block; position:relative; top:1px;}
.mainList_scrollBox {padding:2rem;}
.mainList_option {border-bottom:1px solid #eeeeee;}
.mainList_select {text-align:center !important;}
.mainList_choosed {color:#3baaff; font-weight:700;}
.mainList_sign {width:2rem; height:2px; background-image:linear-gradient(to right, #10bafb, #4486ec); border-radius:1px; position:absolute; left:calc(50% - 1rem); bottom:-1rem;}
.mainList_rowClass {text-align:center !important; font-size:1.2rem;}
.mainList_rowChoosed {font-size:1.3rem; font-weight:700;}
.mainList_mainContentBox {width:calc(100% - 2rem); height:calc(100% - 11rem); margin-top:1rem; position:relative; left:1rem;}
.mainList_barBox {background-image:linear-gradient(to right, #10bafb, #4486ec); font-size:1rem; border-radius:.5rem; color:white;}
.mainList_datetime {font-size:1.2rem; line-height:2rem; font-weight:700;}
.mainList_dateIcon {color:white; font-size:3rem; margin-right:.5rem; text-shadow:0 0 .5rem rgba(0,0,0,.3);}
.mainList_scrollLoadBox {margin-top:.6rem}
.mainList_ticketContentBox {width:100%; position:relative;}
.mainList_ticketListBox {width:100%; margin-bottom:.6rem; border-radius:.5rem; box-shadow:0 0 .5rem rgba(0,0,0,.1); background:white; position:relative;}
.mainList_ticket_subArrow {display:table-cell; vertical-align:middle;}
.mainList_ticket_arrSign {width:1.4rem; height:1.4rem; color:#3baaff; line-height:1.4rem; text-align:center;}
.mainList_ticket_mainBox {width:calc(100% - 1.8rem); display:table-cell;}
.mainList_ticket_space {width:.4rem; display:table-cell;}
.mainList_ticket_cienName {font-size:1.2rem; font-weight:700;}
.mainList_ticket_subCienName {font-size:.8rem; color:#aeb4ba;}
.mainList_ticket_fold {animation:MAINLIST_FOLD .5s forwards; -webkit-animation:MAINLIST_FOLD .5s forwards;}
.mainList_ticket_unfold {animation:MAINLIST_UNFOLD .5s forwards; -webkit-animation:MAINLIST_UNFOLD .5s forwards;}
.mainList_ticket_cienPrice {font-size:1.4rem; font-weight:700; color:#ff7200;}
.mainList_ticket_subPriceS {font-size:.8rem; color:#ff7200;}
.mainList_ticket_subPriceT {font-size:.8rem; color:#aeb4ba;}
.mainList_ticket_subPriceZ {font-size:.8rem;}
.mainList_ticket_xingBox {width:100%; position:relative; overflow:hidden; transition:.5s; -webkit-transition:.5s;}
.mainList_ticket_itemBox {width:100%; position:relative;}
.mainList_ticket_itemName {font-size:1rem; font-weight:700;}
.mainList_ticket_itemIcon {height:1.4rem; line-height:1.4rem; display:inline-block; color:#ff7200; font-size:1.2rem; position:relative; top:1px;}
.mainList_ticket_timeBox {width:calc(100% - 2rem); padding:0 1rem;}
.mainList_ticket_timeItem {width:30%; line-height:2.4rem; font-size:.8rem; border-radius:.5rem; border:1px solid transparent; display:inline-block; text-align:center; margin-right:2%; margin-bottom:.5rem;}
.mainList_ticket_timeChooesed {background:#f1f9ff; border:1px solid #3baaff; color:#3baaff;}

@keyframes MAINLIST_FOLD {
	from {transform:rotate(315deg); -webkit-transform:rotate(315deg);}
	to {transform:rotate(0deg); -webkit-transform:rotate(0deg);}
}
@-webkit-keyframes MAINLIST_FOLD {
	from {transform:rotate(315deg); -webkit-transform:rotate(315deg);}
	to {transform:rotate(0deg); -webkit-transform:rotate(0deg);}
}
@keyframes MAINLIST_UNFOLD {
	from {transform:rotate(0deg); -webkit-transform:rotate(0deg);}
	to {transform:rotate(315deg); -webkit-transform:rotate(315deg);}
}
@-webkit-keyframes MAINLIST_UNFOLD {
	from {transform:rotate(0deg); -webkit-transform:rotate(0deg);}
	to {transform:rotate(315deg); -webkit-transform:rotate(315deg);}
}
</style>