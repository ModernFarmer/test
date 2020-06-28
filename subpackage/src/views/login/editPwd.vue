<template>
<div class="mainRouteBox">
	<um-row class="editPwd_line_row">
		<row-left width="25" class="editPwd_smalFont">原密码</row-left>
		<row-left width="45">
			<um-input placeholder="请输入原账户密码" width="12" v-model="originPwd" @focus="toNomal('alarm_originPwd.empty', 'alarm_originPwd.wrong')"></um-input>
		</row-left>
		<row-right class="editPwd_alarm" width="30">
			<span v-show="alarm_originPwd.empty">原密码不能为空</span>
			<span v-show="alarm_originPwd.wrong">原密码错误</span>
		</row-right>
	</um-row>
	<um-row class="editPwd_line_row">
		<row-left width="25" class="editPwd_smalFont">新密码</row-left>
		<row-left width="45">
			<um-input placeholder="请输入新账户密码" width="12" v-model="newPwd" @focus="toNomal('alarm_newPwd.empty', 'alarm_newPwd.same', 'alarm_newPwdAgain.same')"></um-input>
		</row-left>
		<row-right class="editPwd_alarm" width="30">
			<span v-show="alarm_newPwd.empty">新密码不能为空</span>
			<span v-show="alarm_newPwd.same">密码不一致</span>
		</row-right>
	</um-row>
	<um-row class="editPwd_row">
		<row-left width="25" class="editPwd_smalFont">确认新密码</row-left>
		<row-left width="45">
			<um-input placeholder="确认新账户密码" width="12" v-model="newPwdAgain" @focus="toNomal('alarm_newPwdAgain.empty', 'alarm_newPwd.same', 'alarm_newPwdAgain.same')"></um-input>
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
			originPwd:'',
			newPwd:'',
			newPwdAgain:'',
			alarm_originPwd:{
				empty:false,
				wrong:false
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
		toSubmit(){
			let ok=true;
			if(_isEmpty(this.originPwd)){
				ok=false;
				this.alarm_originPwd.empty=true;
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

			this.umax.post('/admin/changpwd', {
				oldpass:_transcoding(this.originPwd),
				newpass:_transcoding(this.newPwd),
				repeatnewpass:_transcoding(this.newPwdAgain)
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
</style>