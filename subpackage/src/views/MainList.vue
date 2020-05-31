<template>
<div class="mainRouteBox">
	<um-row style="background:white">
		<row-left width="90">
			<div class="mainList_searchBox">
				<div class="mainList_searchTitle" @click="toChooseListType">
					<div class="mainList_stLeft">{{businessList[businessNow].value}}</div>
					<div class="mainList_stRight">&#xe629;</div>
				</div>
				<um-input style="margin-left:1rem" width="11" placeholder="请输入搜索词" v-model="searchWord"></um-input>
				<div class="mainList_searchIcon" @click="toSearch">&#xe651;</div>
			</div>
		</row-left>
		<row-right class="mainList_icon" width="10" @click="toPesonCenter">&#xe67f;</row-right>
	</um-row>

	<um-row style="margin-top:1rem">
		<row-middle :class="{mainList_rowClass:true, mainList_rowChoosed:businessNow===index}" width="20" v-for="(val, index) in businessList" @click="toChooseType(index)">
			<span>{{val.value}}</span>
			<div class="mainList_sign" v-show="businessNow===index"></div>
		</row-middle>
	</um-row>

	<div class="mainList_mainContentBox" v-if="businessNow===0">   <!-- 门票主要内容 -->
		<um-row class="mainList_barBox">
			<row-left width="80">
				<span>游玩日期</span><br>
				<span class="mainList_datetime">{{'2020-10-01'}}</span>
			</row-left>
			<row-right width="20" @click="toShowDateModal">
				<span class="mainList_dateIcon">&#xe808;</span>
			</row-right>
		</um-row>
	</div>

	<um-modal v-model="selectType" ref="typeModal">
		<div class="mainList_scrollBox">
			<um-row class="mainList_option" v-for="(val, index) in businessList" :key="index" @click="toChooseType(index)">
				<row-middle :class="{mainList_select:true, mainList_choosed:businessNow===index}" width="100">{{val.value}}</row-middle>
			</um-row>
		</div>
	</um-modal>
	<um-modal-page v-model="dateModal" ref="dateModal">
		
	</um-modal-page>
	<um-date ref="dateModal" :show.sync="showDate" v-model="playDate">
		
	</um-date>
</div>
</template>

<script>
export default {
	data(){
		return {
			selectType: false,
			dateModal: false,
			showDate: false,
			businessList: [{key:'1', value:'门票'}, {key:'2', value:'酒店'}, {key:'1', value:'餐饮'}, {key:'1', value:'商品'}, {key:'1', value:'跟团游'}],
			searchWord: '',  // 搜索关键字
			businessNow: 0,
			playDate: ''
		}
	},
	methods:{
		toPesonCenter(){ // 个人中心
			
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
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
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
.mainList_mainContentBox {width:calc(100% - 2rem); margin-top:1rem; position:relative; left:1rem;}
.mainList_barBox {background-image:linear-gradient(to right, #10bafb, #4486ec); font-size:1rem; border-radius:.5rem; color:white;}
.mainList_datetime {font-size:1.2rem; line-height:2rem; font-weight:700;}
.mainList_dateIcon {color:white; font-size:3rem; margin-right:.5rem; text-shadow:0 0 .5rem rgba(0,0,0,.3);}
</style>