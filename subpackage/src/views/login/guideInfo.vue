<template>
<div class="mainRouteBox">
	<um-scroll-load class="guideInfo_mainBox" height="calc(100% - 6rem)" v-model="isScenicBottom" @load="toScrollLoad">
		<um-row class="guideInfo_row" v-for="(val, index) in guideList">
			<row-left width="70">
				<div class="guideInfo_name">{{val.name}}</div>
				<div class="guideInfo_phone">手机号码: {{val.phone}}</div>
			</row-left>
			<row-right width="30">
				<div class="guideInfo_caozuo" @click="toEdit(val)">编辑</div>
				<div class="guideInfo_caozuo" @click="toDelete(val, index)">删除</div>
			</row-right>
		</um-row>
		<div style="width:100%; height:1rem"></div>
	</um-scroll-load>
	<div class="guideInfo_btnBox">
		<um-button class="guideInfo_btnBtn" @click="toAdd">新增导游信息</um-button>
	</div>
	<um-confirm closelose ref="confirmTemp" v-model="showConfirm" @confirm="toRealDelete(guide_now.id, guide_now.index)">
		确定要删除 <span class="guideInfo_realDelText">{{guide_now.name}}</span> 吗?
	</um-confirm>
</div>
</template>

<script>
export default {
	data(){
		return {
			guide_now:{},
			showConfirm:false,
			guideList:[],
			num:1,
			isScenicBottom:false
		}
	},
	methods:{
		toEdit(val){
			this.$router.push({path:'/addGuide', query:{data:JSON.stringify(val)}}).catch(()=>{});
		},
		toAdd(){
			this.$router.push({path:'/addGuide'}).catch(()=>{});
		},
		toDelete(val, index){
			val.index=index;
			this.guide_now=val;
			this.showConfirm=true;
		},
		toRealDelete(id, index){
			this.umax.get('/admin/webapi/guide/delete', {id}).then(data=>{
				if(data.status==200)this.guideList.splice(index, 1);
				this.$refs.confirmTemp.closeModal();
			}).catch(err=>{
				if(err && err.status===400){
					this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
				}else{
					this.$Alert('网络错误!');
				};
				this.$refs.confirmTemp.closeModal();
			});
		},
		toScrollLoad(){
			this._toGetGuide(this.num);
		},
		_toGetGuide(num){
			this.umax.post('/admin/webapi/guide/grid', {
				page:num,
				limit:10,
				sort:'createTime',
				order:'desc'
			}).then(data=>{
				if(data.status==200){
					if(data.data.rows.length<10)this.isScenicBottom=true;
					this.num++;
					this.guideList=this.guideList.concat(data.data.rows);
				}
			}).catch(err=>{
				if(err && err.status===400){
					this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
				}else{
					this.$Alert('网络错误!');
				};
			});
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
		this._toGetGuide(this.num);
	}
}
</script>

<style>
.guideInfo_row {background:white; margin-top:.6rem;}

.guideInfo_mainBox {width:100%; height:calc(100% - 6rem); overflow-y:auto; position:relative;}
.guideInfo_mainBox::-webkit-scrollbar {display:none;}

.guideInfo_btnBox {width:100%; height:6rem; background:white;}
.guideInfo_btnBtn {width:23.5rem; margin-left:2rem; margin-top:1rem;}
.guideInfo_name {font-size:1.2rem; font-weight:700;}
.guideInfo_phone {font-size:1rem;}
.guideInfo_caozuo {width:3.5rem; font-size:1rem; line-height:2rem; display:inline-block; text-align:center;}
.guideInfo_realDelText {color:red;}
</style>