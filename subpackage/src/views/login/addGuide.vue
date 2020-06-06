<template>
<div class="mainRouteBox">
	<div class="addGuide_mainBox">
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">
				<span class="addGuide_required">*</span>
				<span>导游姓名</span>
			</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入导游姓名" v-model="guideInfo.name"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">
				<span class="addGuide_required">*</span>
				<span>手机号码</span>
			</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入手机号码" v-model="guideInfo.phone"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">
				<span class="addGuide_required">*</span>
				<span>证件号码</span>
			</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入身份证号码" v-model="guideInfo.idNo"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">公司名称</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入公司名称" v-model="guideInfo.corpName"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">导游证号</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入导游证号" v-model="guideInfo.guideNo"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row" @click="toShowGuide">
			<row-left class="addGuide_name" width="25">等级</row-left>
			<row-left width="65">
				<span class="addGuide_name">{{levelText}}</span>
				<span class="addGuide_select" v-show="!levelText">请选择导游等级</span>
			</row-left>
			<row-right class="addGuide_arrow" width="10">&#xe7e4;</row-right>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_alignTop_name" width="25">导游照片</row-left>
			<row-left width="75">
				<div class="addGuide_chooseImgBox">
					<input id="um_dom_guideFileInput" type="file" capture="camera" @change="toChooseImg">
					<div class="addGuide_addIcon">+</div>
					<img class="addGuide_image" :src="guideInfo.guideImg" alt v-if="guideInfo.guideImg">
				</div>
				<span class="addGuide_explain">建议上传小于1M, 宽750px, 高560px</span><br>
				<span class="addGuide_explain">的JPG/PNG格式的图片</span>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row" @click="toShowArea">
			<row-left class="addGuide_name" width="25">地区</row-left>
			<row-left width="65">
				<span class="addGuide_name">{{guideInfo.locationName}}</span>
				<span class="addGuide_select" v-show="!guideInfo.locationName">请选择导地区</span>
			</row-left>
			<row-right class="addGuide_arrow" width="10">&#xe7e4;</row-right>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_name" width="25">详细地址</row-left>
			<row-left width="75">
				<um-input width="18" placeholder="请输入详细地址" v-model="guideInfo.address"></um-input>
			</row-left>
		</um-row>
		<um-row class="addGuide_line_row">
			<row-left class="addGuide_alignTop_name" width="25">备注</row-left>
			<row-left width="75">
				<div class="addGuide_div_select" v-show="!guideInfo.remark">请输入备注</div>
				<div contenteditable id="um_dom_guideRemark" @input="toInputRemark"></div>
			</row-left>
		</um-row>
		<div style="width:100%; height:1rem"></div>
	</div>
	<div class="addGuide_btnBox">
		<um-button class="addGuide_btnBtn" @click="toSubmit">确定</um-button>
	</div>

	<um-modal ref="guideModal" v-model="showGuide">
		<div style="width:100%; height:2rem"></div>
		<div :class="{addGuide_guideItem:true, addGuide_guideItem_choosed:guideInfo.level===val.key}" v-for="(val, index) in levelArr" @click="toChooseGuide(val)">{{val.value}}</div>
	</um-modal>

	<um-area ref="areaModal" :show.sync="showArea" v-model="areaResult"></um-area>
</div>
</template>

<script>
export default {
	data(){
		return {
			showGuide:false,
			showArea:false,
			levelArr:[{key:1, value:'初级导游'}, {key:2, value:'中级导游'}, {key:3, value:'高级导游'}, {key:4, value:'特级导游'}],
			levelText:'',
			areaResult:[],
			guideInfo:{
				name:'',
				phone:'',
				idNo:'',
				corpName:'',
				guideNo:'',
				guideImg:'',
				level:'',
				locationCode:'',
				locationName:'',
				address:'',
				remark:''
			}
		}
	},
	computed:{
		isEdit:function(){
			return this.$route.query.data!==undefined;
		}
	},
	watch:{
		areaResult:function(arr){
			if(arr.length){
				let locationCodeArr=[], locationNameArr=[];
				arr.forEach(val=>{
					if(val.code){
						locationCodeArr.push(val.code);
						locationNameArr.push(val.name);
					}
				});
				this.guideInfo.locationCode=locationCodeArr.join('-');
				this.guideInfo.locationName=locationNameArr.join('-');
			}else{
				this.guideInfo.locationCode='';
				this.guideInfo.locationName='';
			};
		}
	},
	methods:{
		toInputRemark(){
			this.guideInfo.remark=um_dom_guideRemark.textContent;
		},
		toChooseImg(){
			let files=um_dom_guideFileInput.files;
			if(!files[0])return;
			let file=files[0];
			let type=file.type;
			let re=/^(?:image\/jpeg|image\/png)$/i;
			if(re.test(type)){
				this.umax.form('/admin/api/ui/uplode', {
					fieldName:'file',
					files:file
				}).then(data=>{
					if(data.status==200){
						this.guideInfo.guideImg=data.message;
						this.$Alert('上传成功!');
					}else{
						this.$Alert('上传失败!');
					};
				}).catch(err=>{
					if(err && err.status===400){
						this.$router.push({path:'/login', query:{back:'back'}}).catch(()=>{});
					}else{
						this.$Alert('网络错误!');
					};
				});
			}else{
				this.$Alert('只支持上传jpeg和png格式的图片文件!');
			};
		},
		toShowGuide(){
			this.showGuide=true;
		},
		toShowArea(){
			this.showArea=true;
		},
		toChooseGuide(val){
			this.levelText=val.value;
			this.guideInfo.level=val.key;
			this.$refs.guideModal.closeModal();
		},
		toSubmit(){
			if(_isEmpty(this.guideInfo.name)){
				this.$Alert('导游姓名不能为空!');
				return;
			}
			if(_isEmpty(this.guideInfo.phone)){
				this.$Alert('手机号码不能为空!');
				return;
			}
			if(!_isPhone(this.guideInfo.phone)){
				this.$Alert('手机号码格式不正确!');
				return;
			}
			if(_isEmpty(this.guideInfo.idNo)){
				this.$Alert('证件号码不能为空!');
				return;
			}
			if(!_isIdCard(this.guideInfo.idNo)){
				this.$Alert('身份证号码格式错误!');
				return;
			}

			let url=this.isEdit?'/admin/webapi/guide/update':'/admin/webapi/guide/save';
			this.umax.post(url, this.guideInfo).then(data=>{
				if(data.status==200)this.$router.push({path:'/guideInfo'}).catch(()=>{});
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
		this.DS.navigate.title=this.isEdit?'编辑导游':'添加导游';   // 每次进入路由的时候更新页面头部导航的title(导航位置:@/App.vue)
		if(this.isEdit){
			let json=JSON.parse(this.$route.query.data);
			console.log(json)
			this.guideInfo={
				id:json.id,
				name:json.name,
				phone:json.phone,
				idNo:json.idNo,
				corpName:json.corpName,
				guideNo:json.guideNo,
				guideImg:json.guideImg,
				level:json.level,
				locationCode:'',
				locationName:'',
				address:json.address,
				remark:json.remark
			};
			if(json.level){ // 导游等级回显
				this.levelArr.some(val=>{
					this.levelText=val.value;
					return val.key==json.level;
				});
			}
			this.$nextTick(function(){
				um_dom_guideRemark.textContent=this.guideInfo.remark; // 备注回显
			});
			if(json.locationCode && json.locationName){ // 地区组件回显
				let locationCodeArr=json.locationCode.split('-'), locationNameArr=json.locationName.split('-');
				let arr=[];
				locationCodeArr.forEach((val, i)=>{
					arr.push({code:val, name:locationNameArr[i]});
				});
				this.areaResult=arr;
			}
		}
	}
}
</script>

<style>
.addGuide_line_row {background:white; border-bottom:1px solid #eeeeee;}
.addGuide_required {color:red;}
.addGuide_mainBox {width:100%; height:calc(100% - 6rem); overflow-y:auto; position:relative;}
.addGuide_mainBox::-webkit-scrollbar {display:none;}
.addGuide_btnBox {width:100%; height:6rem; box-shadow:0 0 1rem rgba(0,0,0,.2); background:white; position:relative; z-index:10;}
.addGuide_btnBtn {width:23.5rem; margin-left:2rem; margin-top:1rem;}
.addGuide_name {font-size:1rem;}
.addGuide_alignTop_name {font-size:1rem; vertical-align:top !important;}
.addGuide_select {font-size:1rem; color:#aeb4ba;}
.addGuide_explain {font-size:.8rem; color:#aeb4ba;}
.addGuide_arrow {font-size:2rem; color:gray;}
#um_dom_guideRemark {outline:none; font-size:1rem;}
.addGuide_div_select {font-size:1rem; color:#aeb4ba; position:absolute; left:0; top:0;}
.addGuide_chooseImgBox {width:6rem; height:4rem; border-radius:.5rem; border:1px dashed #aeb4ba; overflow:hidden; margin-bottom:1rem; position:relative;}
.addGuide_image {width:6rem; height:4rem; position:absolute; left:0; top:0; z-index:2;}
.addGuide_addIcon {width:100%; height:100%; text-align:center; font-size:4rem; line-height:3.7rem; color:#d3d8dd; position:absolute; left:0; top:0; z-index:1;}
#um_dom_guideFileInput {width:6rem; height:4rem; opacity:0; position:absolute; left:0; top:0; z-index:3;}
.addGuide_guideItem {width:100%; line-height:4rem; font-size:1.2rem; border-bottom:1px solid #eeeeee; text-align:center;}
.addGuide_guideItem_choosed {font-weight:700; color:#3baaff;}
</style>