<template>
<div class="mainRouteBox">
	<div class="login_mainBackBox">
		<div class="login_bigTitle">{{'旅行社'}}</div>
		<div class="login_smallTitle">团队预定系统</div>
	</div>
	<div class="login_formBox">
		<um-row class="login_row_borderBottom">
			<row-left class="login_icon" width="13">&#xe67f;</row-left>
			<row-right width="87">
				<um-input width="16" placeholder="请输入用户名/手机号" v-model="userName"></um-input>
			</row-right>
		</um-row>
		<um-row class="login_row_borderBottom">
			<row-left class="login_icon" width="13">&#xe62b;</row-left>
			<row-right width="87">
				<um-input type="password" width="16" placeholder="请输入密码" v-model="password"></um-input>
			</row-right>
		</um-row>
		<um-row class="login_row_borderBottom">
			<row-left class="login_icon" width="13">&#xe656;</row-left>
			<row-middle width="37">
				<um-input width="6.75" placeholder="请输入验证码" v-model="checkCode"></um-input>
			</row-middle>
			<row-right width="50">
				<img class="login_codeImage" src="/admin/api/checkCode" :key="key" @click="toGeiCode">
			</row-right>
		</um-row>
		<div class="login_forgetPwd">
			<div class="login_btn_forgetPwd" @click="toForgetPwd">忘记密码</div>
		</div>
		<um-button style="width:20.5rem; margin-top:3rem" @click="toLogin">登录</um-button>
	</div>
</div>
</template>

<script>
let isback=false;
export default {
	data(){
		return {
			first:true, // 是否首次加载
			userName:'',
			password:'',
			checkCode:'',
			key:0 // 用于强制重渲染验证码图片
		}
	},
	methods:{
		toGeiCode(){
			this.key+=1;
		},
		toLogin(){
			this.umax.post('/admin/userDistributor/signIn', {  // 登陆
				userName:this.userName,
				password:_transcoding(this.password),
				checkCode:this.checkCode
			}).then(data=>{
				if(data.status==200){
					let json={
						id:data.data.id,
				        corpCode:data.data.corpCode,
				        name:data.data.name,
				        realName:data.data.realName,
				        sessionId:data.data.sessionId
					};
					_Storage.set('userInfo', JSON.stringify(json));
					this.$router.push({path:'/home'}).catch(()=>{});
				}else{
					if(!this.first){
						this.$Alert(data.message);
					}else{
						this.first=false;
					};
				};
			}).catch(err=>{
				this.$Alert('网络错误!');
			});
		},
		toForgetPwd(){
			this.$router.push({path:'/forgetPwd'}).catch(()=>{});
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
		if(this.DS.loginInfo.userName && this.DS.loginInfo.password){  // 修改密码成功后返回到该页面, 从内存中取出用户信息并赋值到该页面
			this.userName=this.DS.loginInfo.userName;
			this.password=this.DS.loginInfo.password;
			this.DS.loginInfo={userName:null, password:null};
		}else if(isback || this.$route.query.back){ // 当从忘记密码页面点击返回键返回时或者点击个人中心的退出登录按钮返回时, 不做自动登录处理
			isback=false;
		}else{
			this.$Loading.run();
			setTimeout(()=>{
				this.toLogin();
			}, 1000);
		};
	},
	beforeRouteEnter(to, from, next){
		if(from.path==='/forgetPwd')isback=true; // 判断是否从忘记密码页面点击返回键返回, 如果是, 则不做自动登录处理
		next();
	}
}
</script>

<style>
.login_mainBackBox {width:100%; height:15rem; padding-top:5rem; text-align:center; color:white; background-image:linear-gradient(to right, #10bafb, #4486ec);}
.login_bigTitle {line-height:3rem; font-size:2.2rem;}
.login_smallTitle {font-size:1.2rem;}
.login_formBox {width:calc(100% - 7rem); height:22rem; padding:1.5rem 2rem; background:white; box-shadow:0 0 1rem rgba(0,0,0,.2); border-radius:.5rem; position:absolute; left:1.5rem; top:13rem;}
.login_icon {font-size:1.6rem; color:#999999;}
.login_row_borderBottom {border-bottom:1px solid #eeeeee;}
.login_codeImage {height:2.6rem; display:inline-block; position:absolute; right:0; top:-0.2rem;}
.login_forgetPwd {width:100%; height:2rem; color:#666666; text-align:right;}
.login_btn_forgetPwd {display:inline-block; font-size:.8rem; line-height:2rem;}
</style>