<template>
<div class="mainRouteBox">
	<div class="center_topBox">
		<um-row>
			<row-left class="center_name" width="60">{{realName}}</row-left>
			<row-right width="40">
				<um-button class="center_outLogin" type="gray" @click="toSignOut">退出登录</um-button>
			</row-right>
		</um-row>
	</div>
	<div class="center_mainTopBox">
		<um-row>
			<row-left style="font-weight:700" width="60">我的订单</row-left>
			<row-right style="font-size:1rem" width="40" @click="toAllOrder">全部订单&nbsp;&#xe7e4;</row-right>
		</um-row>
		<um-row>
			<row-middle class="center_fnImg" width="20" @click="toGoOrder('/path')">
				<img class="center_imgImg" src="/image/center_1.png" alt><br>
				<span class="center_imgText">门票</span>
			</row-middle>
			<row-middle class="center_fnImg" width="20" @click="toGoOrder('/path')">
				<img class="center_imgImg" src="/image/center_1.png" alt><br>
				<span class="center_imgText">酒店</span>
			</row-middle>
			<row-middle class="center_fnImg" width="20" @click="toGoOrder('/path')">
				<img class="center_imgImg" src="/image/center_1.png" alt><br>
				<span class="center_imgText">餐饮</span>
			</row-middle>
			<row-middle class="center_fnImg" width="20" @click="toGoOrder('/path')">
				<img class="center_imgImg" src="/image/center_1.png" alt><br>
				<span class="center_imgText">商品</span>
			</row-middle>
			<row-middle class="center_fnImg" width="20" @click="toGoOrder('/path')">
				<img class="center_imgImg" src="/image/center_1.png" alt><br>
				<span class="center_imgText">跟团游</span>
			</row-middle>
		</um-row>
	</div>
	<um-row class="center_rowBox" style="margin-top:7rem" @click="toGotoPath('/posonInfo')">
		<row-left>
			<span class="center_sign">&#xe67f;</span>
			&nbsp;
			<div class="center_fnTitle">个人信息</div>
		</row-left>
		<row-right class="center_sign">&#xe7e4;</row-right>
	</um-row>
	<um-row class="center_rowBox" @click="toGotoPath('/guideInfo')">
		<row-left>
			<span class="center_sign">&#xe615;</span>
			&nbsp;
			<div class="center_fnTitle">导游信息</div>
		</row-left>
		<row-right class="center_sign">&#xe7e4;</row-right>
	</um-row>
</div>
</template>

<script>
export default {
	data(){
		return {
			realName:_Storage.get('userInfo')?_Storage.get('userInfo').realName:'--'
		}
	},
	methods:{
		toGotoPath(val){
			this.$router.push({path:val}).catch(()=>{});
		},
		toAllOrder(){
			// this.$router.push({path:''}).catch(()=>{});
		},
		toGoOrder(path){
			// this.$router.push({path}).catch(()=>{});
		},
		toSignOut(){
			this.umax.post('/admin/userDistributor/signOut').then(date=>{
				_Storage.remove('userInfo');
				this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
			}).catch(err=>{
				this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
			});
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
	}
}
</script>

<style>
.center_topBox {width:100%; height:10.5rem; padding-top:1.5rem; background-image:linear-gradient(to right, #10bafb, #4486ec); position:relative; left:0; top:0;}
.center_name {color:white; font-size:1.6rem; font-weight:700;}
.center_outLogin {font-size:1.1rem; width:7rem; font-weight:700;}
.center_mainTopBox {width:calc(100% - 2rem); height:11rem; border-radius:.5rem; box-shadow:0 0 .5rem rgba(0,0,0,.1); background:white; position:absolute; left:1rem; top:7rem;}
.center_rowBox {background:white; border-bottom:1px solid #e4e4e4;}
.center_sign {font-size:2rem;}
.center_fnTitle {line-height:2.3rem; font-size:1.2rem; font-weight:700; position:absolute; left:2.5rem; top:0;}
.center_fnImg {text-align:center !important;}
.center_imgImg {display:inline-block; width:60%;}
.center_imgText {font-weight:700; font-size:1rem; line-height:2rem;}
</style>