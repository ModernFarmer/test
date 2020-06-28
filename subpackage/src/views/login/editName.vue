<template>
<div class="mainRouteBox">
	<um-row class="editName_row">
		<row-left width="25">姓名</row-left>
		<row-left width="50">
			<um-input placeholder="请输入您的姓名" width="12.5" v-model="name" @focus="toNomal('alarm_name')"></um-input>
		</row-left>
		<row-right class="editName_alarm" width="25">
			<span v-show="alarm_name">姓名不能为空</span>
		</row-right>
	</um-row>
	<um-button class="editName_btn" @click="toSubmit">确认修改</um-button>
</div>
</template>

<script>
export default {
	data(){
		return {
			name:'',
			alarm_name:false
		}
	},
	methods:{
		toNomal(val){
			this[val]=false;
		},
		toSubmit(){
			if(_isEmpty(this.name)){
				this.alarm_name=true;
				this.$Alert('姓名不能为空!');
			}else{
				this.umax.post('/admin/userInfo/updateUserRealName', {
					realName:this.name
				}).then(data=>{
					if(data.status==200){
						let json=_Storage.get('userInfo');
						json.realName=this.name;
						_Storage.set('userInfo', JSON.stringify(json));
						this.$router.push({path:'/posonInfo'});
					}
				}).catch(err=>{
					if(err && err.status===400){
						this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
					}else{
						this.$Alert('网络错误!');
					};
				});
			};
		}
	},
	mounted:function(){
		this.DS.navigate.title=this.$route.meta.title;   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
	}
}
</script>

<style>
.editName_row {background:white;}
.editName_btn {width:23.5rem; position:fixed; left:2rem; bottom:2rem;}
.editName_alarm {font-size:.8rem; color:red;}
</style>