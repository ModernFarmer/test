<template>
<div class="mainRouteBox">
	<um-row class="editPwd_line_row">
		<row-left width="25" class="editPwd_smalFont">验证码</row-left>
		<row-left width="45">
			<um-input placeholder="请输入验证码" width="12" v-model="checkCode" @focus="toNomal('alarm_checkCode.empty')"></um-input>
		</row-left>
		<row-right width="30">
			<um-button class="editPwd_divBtn" size="small" @click="toGetCode">获取验证码</um-button>
			<div class="editPwd_alarm" v-show="alarm_checkCode.empty">验证码不能为空</div>
		</row-right>
	</um-row>
	<div class="editPwd_explain" v-if="phone">系统将往手机号&nbsp;<span class="editPwd_phone_explain">{{phone}}</span>&nbsp;发送验证码</div>
	<div class="editPwd_explain" v-if="!phone">手机号获取失败, 请重新登录!</div>
	<um-row class="editPwd_line_row">
		<row-left width="25" class="editPwd_smalFont">新密码</row-left>
		<row-left width="45">
			<um-input placeholder="请输入新支付密码" width="12" v-model="newPwd" @focus="toNomal('alarm_newPwd.empty', 'alarm_newPwd.same', 'alarm_newPwdAgain.same')"></um-input>
		</row-left>
		<row-right class="editPwd_alarm" width="30">
			<span v-show="alarm_newPwd.empty">新密码不能为空</span>
			<span v-show="alarm_newPwd.same">密码不一致</span>
		</row-right>
	</um-row>
	<um-row class="editPwd_row">
		<row-left width="25" class="editPwd_smalFont">确认新密码</row-left>
		<row-left width="45">
			<um-input placeholder="确认原支付密码" width="12" v-model="newPwdAgain" @focus="toNomal('alarm_newPwdAgain.empty', 'alarm_newPwd.same', 'alarm_newPwdAgain.same')"></um-input>
		</row-left>
		<row-right class="editPwd_alarm" width="30">
			<span v-show="alarm_newPwdAgain.empty">新密码不能为空</span>
			<span v-show="alarm_newPwdAgain.same">密码不一致</span>
		</row-right>
	</um-row>
	<um-button class="editPwd_btn" @click="toSubmit">确认修改</um-button>
</div>
</template>

<script>
export default {
	data(){
		return {
			phone:_Storage.get('userInfo')?_Storage.get('userInfo').name:'',
			checkCode:'',
			newPwd:'',
			newPwdAgain:'',
			alarm_checkCode:{
				empty:false
			},
			alarm_newPwd:{
				empty:false,
				same:false
			},
			alarm_newPwdAgain:{
				empty:false,
				same:false
			}
		}
	},
	methods:{
		toNomal(...arg){
			let _this=this;
			arg.forEach(val=>{
				eval(`_this.${val}=false`);
			});
		},
		toGetCode(){
			if(!this.phone){
				this.$Alert('手机号获取失败, 请重新登录!');
				return;
			}
			this.umax.post('/admin/api/storeUser/sendCheckCode', {
				mobile:this.phone,
				sendType:'payPwd'
			}).then(data=>{
				if(data.status==200)this.$Alert(data.message);
			}).catch(err=>{
				if(err && err.status===400){
					this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
				}else{
					this.$Alert('网络错误!');
				};
			});
		},
		toSubmit(){
			let ok=true;
			if(_isEmpty(this.checkCode)){
				ok=false;
				this.alarm_checkCode.empty=true;
			}
			if(_isEmpty(this.newPwd)){
				ok=false;
				this.alarm_newPwd.empty=true;
			}
			if(_isEmpty(this.newPwdAgain)){
				ok=false;
				this.alarm_newPwdAgain.empty=true;
			}
			if(!ok){
				this.$Alert('资料填写不完整!');
				return;
			}
			if(newPwd!==newPwdAgain){
				this.alarm_newPwd.same=true;
				this.alarm_newPwdAgain.same=true;
				this.$Alert('两次新密码不一致!');
				return;
			}

			this.umax.post('/admin/userExtConfig/updatePayWord', {
				payPass:_transcoding(this.newPwd),
				payPassWord:_transcoding(this.newPwdAgain),
				checkCode:this.checkCode
			}).then(data=>{
				if(data.status==200)this.$router.push({path:'/posonInfo'});
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
	}
}
</script>

<style>
.editPwd_row {background:white;}
.editPwd_line_row {background:white; border-bottom:1px solid #eeeeee;}
.editPwd_btn {width:23.5rem; position:fixed; left:2rem; bottom:2rem;}
.editPwd_alarm {font-size:.8rem; color:red;}
.editPwd_smalFont {font-size:.8rem;}
.editPwd_divBtn {font-size:.9rem;}
.editPwd_explain {padding-left:7rem; line-height:2rem; font-size:.8rem; color:#aeb4ba;}
.editPwd_phone_explain {color:#6e7071;}
</style>