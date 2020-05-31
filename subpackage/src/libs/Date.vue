<template>
<div :class="{um__modalInside__class:true, um__modalInside__ennte:showAnimation, um__modalInside__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal" @click="toCloseModal">
	<div :class="{um__modalInside__mainBox:true, um__modalInside_main__ennte:showAnimation, um__modalInside_main__leave:!showAnimation}" @click.stop>
		<div class="um__date__box">
			<div class="um__date__upBox">
				<span class="um__date__text">请选择日期</span>
				<div class="um__date__weekBox">
					<div class="um__date__weekItem um__date__weekDay">日</div>
					<div class="um__date__weekItem">一</div>
					<div class="um__date__weekItem">二</div>
					<div class="um__date__weekItem">三</div>
					<div class="um__date__weekItem">四</div>
					<div class="um__date__weekItem">五</div>
					<div class="um__date__weekItem um__date__weekDay">六</div>
				</div>
				<div class="icon um__date__showYearMonth">
					<div class="um__date__fnBtn">&#xe7e3;</div>
					<div class="um__date__fnBtn">&#xe7e3;</div>
					<div class="um__date__ymShow">{{'2020年4月'}}</div>
					<div class="um__date__fnBtn">&#xe7e4;</div>
					<div class="um__date__fnBtn">&#xe7e4;</div>
				</div>
			</div>

		</div>
	</div>
	<div :class="{um__modalInside__textBtn:true, um__modalInside_close__ennte:showAnimation, um__modalInside_close__leave:!showAnimation}" v-if="closeDisabled!==false" @click="closeModal">&times;</div>
</div>
</template>

<script>
export default {
	props:['value', 'back-disabled', 'close-disabled', 'show'],
	data(){
		return {
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			index_z:9999999, // 组件的层级
			showAnimation:false // 显示入场或出场动画
		}
	},
	watch:{
		show:function(val){
			if(val===true){
				this._$UMSTORE._uobj_zIndex_selectInside++;
				this.index_z=this._$UMSTORE._uobj_zIndex_selectInside;
				this.showModal=true;
				this.showAnimation=true;
				if(this.first)this.first=false;
			}
		}
	},
	methods:{
		closeModal(){
			this.showAnimation=false;
			this.$emit('close');
			this.$emit('update:show', false);
			setTimeout(()=>{
				this.showModal=false;
			}, 500);
		},
		toCloseModal(){
			if(this.backDisabled!==undefined && this.backDisabled!==false)return;
			this.closeModal();
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.um__modalInside__class {width:100%; height:100%; background:rgba(0,0,0,.3); position:absolute; left:0; top:0;}
.um__modalInside__mainBox {width:100%; height:60%; overflow-x:hidden; overflow-y:auto; background:white; border-radius:1rem 1rem 0 0; box-shadow:0px 0px 10px gray; position:absolute; left:0; bottom:-60%;}
.um__modalInside__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modalInside__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modalInside_main__ennte {animation:UM_SWITCH_BOTTOM_ON .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_ON .5s forwards;}
.um__modalInside_main__leave {animation:UM_SWITCH_BOTTOM_OFF .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_OFF .5s forwards;}
.um__modalInside_close__ennte {animation:UM_SWITCH_CLOSE_ON .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_ON .5s forwards;}
.um__modalInside_close__leave {animation:UM_SWITCH_CLOSE_OFF .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_OFF .5s forwards;}
.um__modalInside__textBtn {width:2rem; font-size:2rem; text-align:center; line-height:2.2rem; font-weight:900; overflow:hidden; color:#373737; position:absolute; right:-2rem; top:calc(40% - 2.3rem); z-index:1000000;}

.um__date__box {width:100%; text-align:center;}
.um__date__upBox {width:calc(100% - 4rem); padding:0 2rem; position:relative; box-shadow:0 0 1rem rgba(0,0,0,.1);}
.um__date__text {font-size:1.2rem; line-height:4rem; font-weight:700;}
.um__date__weekBox {width:100%; height:2rem; line-height:2rem; font-size:1.2rem; text-align:center; position:relative;}
.um__date__weekItem {width:14.28%; display:inline-block; color:#999999;}
.um__date__weekDay {color:#3baaff;}
.um__date__showYearMonth {width:100%; height:3rem; line-height:3rem; text-align:center; position:relative;}
.um__date__fnBtn {width:2rem; display:inline-block;}
.um__date__ymShow {width:calc(100% - 8rem); display:inline-block;}
</style>