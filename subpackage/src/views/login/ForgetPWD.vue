<template>
<div class="mainRouteBox">
	<div class="forget_mainBackBox">
		<div class="forget_bigTitle">{{'旅行社'}}</div>
		<div class="forget_smallTitle">团队预定系统</div>
	</div>
	<div class="forget_formBox">
		<um-row class="forget_row_borderBottom">
			<row-left class="forget_icon" width="13">&#xe67f;</row-left>
			<row-right width="47">
				<um-input width="8.7" placeholder="请输入手机号" v-model="loginName"></um-input>
			</row-right>
			<row-right width="40">
				<um-button class="forget_divBtn" size="small" @click="toGetCode">获取验证码</um-button>
			</row-right>
		</um-row>
		<um-row class="forget_row_borderBottom">
			<row-left class="forget_icon" width="13">&#xe656;</row-left>
			<row-right width="87">
				<um-input width="16" placeholder="请输入验证码" v-model="password"></um-input>
			</row-right>
		</um-row>
		<um-row class="forget_row_borderBottom">
			<row-left class="forget_icon" width="13">&#xe62b;</row-left>
			<row-right width="87">
				<um-input type="password" width="16" placeholder="请输入新密码" v-model="checkCode"></um-input>
			</row-right>
		</um-row>
		<div class="forget_forgetPwd"></div>
		<um-button style="width:20.5rem; margin-top:3rem" @click="toReset">确认修改</um-button>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			loginName:'',
			password:'',
			checkCode:''
		}
	},
	methods:{
		toGetCode(){
			this.umax.post('/admin/api/storeUser/sendCheckCode', {
				mobile:this.loginName,
				sendType:'pwd'
			}).then(data=>{
				if(data.status==200)this.$Alert(data.message);
			}).catch(err=>{
				this.$Alert('网络错误!');
			});
		},
		toReset(){
	// ------------------------------------------------  这里少修改密码接口  
			/*this.umax.post('', {
				loginName:this.loginName,
				password:this.password,
				checkCode:this.checkCode
			}).then(data=>{
				if(data.status==200){
					this.DS.loginInfo={
						userName:this.loginName,
						password:this.password
					};
					this.$Alert(data.message);
					this.$router.push({path:'/login'}).catch(()=>{});
				}
			}).catch(err=>{
				this.$Alert('网络错误!');
			});*/
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
	}
}
</script>

<style>
.forget_mainBackBox {width:100%; height:15rem; padding-top:5rem; text-align:center; color:white; background-image:linear-gradient(to right, #10bafb, #4486ec);}
.forget_bigTitle {line-height:3rem; font-size:2.2rem;}
.forget_smallTitle {font-size:1.2rem;}
.forget_formBox {width:calc(100% - 7rem); height:22rem; padding:1.5rem 2rem; background:white; box-shadow:0 0 1rem rgba(0,0,0,.2); border-radius:.5rem; position:absolute; left:1.5rem; top:13rem;}
.forget_icon {font-size:1.6rem; color:#999999;}
.forget_row_borderBottom {border-bottom:1px solid #eeeeee;}
.forget_divBtn {font-size:.9rem;}
.forget_forgetPwd {width:100%; height:2rem; color:#666666; text-align:right;}
</style>