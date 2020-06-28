<template>
<div class="mainRouteBox">
	<um-row class="posonInfo_line_row">
		<row-left width="30">用户名</row-left>
		<row-left width="50">{{18856965693}}</row-left>
		<row-right width="20"></row-right>
	</um-row>
	<um-row class="posonInfo_row" @click="toEdit('/editName')">
		<row-left width="30">姓名</row-left>
		<row-left width="50">{{'姓名'}}</row-left>
		<row-right width="20">&#xe7e4;</row-right>
	</um-row>
	<um-row class="posonInfo_margin_row" @click="toEdit('/editPwd')">
		<row-left width="80">修改账户密码</row-left>
		<row-right width="20">&#xe7e4;</row-right>
	</um-row>
	<um-row class="posonInfo_margin_row" @click="toEdit('/editPayPwd')">
		<row-left width="80">修改分销市场支付密码</row-left>
		<row-right width="20">&#xe7e4;</row-right>
	</um-row>
</div>
</template>

<script>
export default {
	data(){
		return {

		}
	},
	methods:{
		toEdit(path){
			this.$router.push({path}).catch(()=>{});
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
	}
}
</script>

<style>
.posonInfo_line_row {background:white; border-bottom:1px solid #eeeeee;}
.posonInfo_row {background:white;}
.posonInfo_margin_row {background:white; margin-top:1rem;}
</style>