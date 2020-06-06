<template>
<div :class="{icon:true, um__modalArea__class:true, um__modalArea__ennte:showAnimation, um__modalArea__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal" @click="toCloseModal">
	<div :class="{um__modalArea_date__mainBox:true, um__modalArea_main__ennte:showAnimation, um__modalArea_main__leave:!showAnimation}" @click.stop>
		<div class="um__modalArea__mainBigBox">
			<div id="um__area__sheng" class="um__modalArea__mainBox_sheng" style="z-index:10" @scroll="_toGetSheng" @touchstart="_toTouchStart('touch_sheng')">  <!-- 省 -->
				<div class="um__modalArea__mainBox_space"></div>
				<div class="um__modalArea__contentBox">
					<div class="um__modalArea__item" v-for="(name, code, index) in areaData['0']" :key="index">{{name}}</div>
				</div>
				<div class="um__modalArea__mainBox_space"></div>
			</div>
			<div id="um__area__shi" class="um__modalArea__mainBox_shi" style="z-index:10" @scroll="_toGetShi" @touchstart="_toTouchStart('touch_shi')">  <!-- 市 -->
				<div class="um__modalArea__mainBox_space"></div>
				<div class="um__modalArea__contentBox">
					<div class="um__modalArea__item" v-for="(name, code, index) in areaData[`0,${now_sheng.code}`]" :key="index">{{name}}</div>
				</div>
				<div class="um__modalArea__mainBox_space"></div>
			</div>
			<div id="um__area__qu" class="um__modalArea__mainBox_qu" style="z-index:10" @scroll="_toGetQu" @touchstart="_toTouchStart('touch_qu')">  <!-- 区 -->
				<div class="um__modalArea__mainBox_space"></div>
				<div class="um__modalArea__contentBox">
					<div class="um__modalArea__item" v-for="(name, code, index) in areaData[`0,${now_sheng.code},${now_shi.code}`]" :key="index">{{name}}</div>
				</div>
				<div class="um__modalArea__mainBox_space"></div>
			</div>
		</div>
		<div class="um__modalArea__cover_mainBox">
			<div id="um__area__ruler" class="um__modalArea__filter"></div>
		</div>
		<um-button class="um__modalArea__btn" type="gray" @click="toSubmit">确定</um-button>
	</div>
	<div :class="{um__modalArea_date__textBtn:true, um__modalArea_close__ennte:showAnimation, um__modalArea_close__leave:!showAnimation}" v-if="closeDisabled!==false" @click="closeModal">&times;</div>
</div>
</template>

<script>
import areaData from './SSQ.js'
export default {
	props:['value', 'back-disabled', 'close-disabled', 'show'],
	data(){
		return {
			areaData,
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			index_z:9999999, // 组件的层级
			showAnimation:false, // 显示入场或出场动画

			size:_remSize*3, // 
			now_sheng:{name:'北京', code:'110000', index:0},
			now_shi:{name:'北京市', code:'110100', index:0},
			now_qu:{name:'东城区', code:'110101', index:0},

			touch_sheng:false,
			touch_shi:false,
			touch_qu:false,
			st_sheng:0,
			st_shi:0,
			st_qu:0,

			last_sheng:false,
			last_shi:false,
			last_qu:false,

			isEmit:false,

			isInit_sheng:false,
			isInit_shi:false,
			isInit_qu:false
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
				this._areaInit();
			}
		},
		value:function(arr){
			if(this.isEmit)return;
			this._areaInit(arr);
		}
	},
	methods:{
		toSubmit(){
			this.isEmit=true;
			let result=[
				{
					name:this.now_sheng.name,
					code:this.now_sheng.code
				},
				{
					name:this.now_shi.name,
					code:this.now_shi.code
				},
				{
					name:this.now_qu.name,
					code:this.now_qu.code
				}
			];
			this.$emit('input', result);
			this.$emit('submit', result);
			setTimeout(()=>{
				this.isEmit=false;
			});
			this.closeModal();
		},
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
		},
		_toTouchStart(val){
			eval(`this.${val}=true`);
		},
		_toTouchEnd(){
			this.touch_sheng=false;
			this.touch_shi=false;
			this.touch_qu=false;
		},
		_toGetSheng(e){
			if(this.last_sheng)return;
			clearTimeout(window.__um__timer__area__sheng);
			window.__um__timer__area__sheng=setTimeout(this._isEed_sheng, 100);
			this.st_sheng=e.target.scrollTop;
		},
		_toGetShi(e){
			if(this.last_shi)return;
			clearTimeout(window.__um__timer__area__shi);
			window.__um__timer__area__shi=setTimeout(this._isEed_shi, 100);
			this.st_shi=e.target.scrollTop;
		},
		_toGetQu(e){
			if(this.last_qu)return;
			clearTimeout(window.__um__timer__area__qu);
			window.__um__timer__area__qu=setTimeout(this._isEed_qu, 100);
			this.st_qu=e.target.scrollTop;
		},
		_isEed_sheng(){
			if(this.touch_sheng){
				clearTimeout(window.__um__timer__area__sheng);
				window.__um__timer__area__sheng=setTimeout(this._isEed_sheng, 200);
			}else{
				this._toMove('sheng', '__um__timer__area__sheng');
			};
		},
		_isEed_shi(){
			if(this.touch_sheng){
				clearTimeout(window.__um__timer__area__shi);
				window.__um__timer__area__shi=setTimeout(this._isEed_shi, 200);
			}else{
				this._toMove('shi', '__um__timer__area__shi');
			};
		},
		_isEed_qu(){
			if(this.touch_sheng){
				clearTimeout(window.__um__timer__area__qu);
				window.__um__timer__area__qu=setTimeout(this._isEed_qu, 200);
			}else{
				this._toMove('qu', '__um__timer__area__qu');
			};
		},
		_toMove(areaStr, timerStr){
			let residue=this[`st_${areaStr}`]%this.size;
			let index=Math.floor(this[`st_${areaStr}`]/this.size);
			if(residue>=Math.ceil(this.size/2)){
				index++
				this._move_add(areaStr, index, this);
			}else{
				this._move_min(areaStr, index, this);
			};
			delete window[timerStr];
		},
		_move_add(val, index, _this){
			window[`__um_timer1_${val}`]=setTimeout(()=>{
				let dom=eval(`um__area__${val}`);
				dom.scrollTop=dom.scrollTop+2;
				if(dom.scrollTop>=Math.floor(_this.size*index)){
					clearTimeout(window[`__um_timer1_last_${val}`]);
					eval(`_this.last_${val}=true`);
					dom.scrollTop=Math.floor(_this.size*index);
					this._setEmit(val, index);
					window[`__um_timer1_last_${val}`]=setTimeout(()=>{
						eval(`_this.last_${val}=false`);
					}, 30);
					clearTimeout(window[`__um_timer1_${val}`]);
					delete window[`__um_timer1_${val}`];
				}else{
					this._move_add(val, index, _this);
				};
			}, 30);
		},
		_move_min(val, index, _this){
			window[`__um_timer2_${val}`]=setTimeout(()=>{
				let dom=eval(`um__area__${val}`);
				dom.scrollTop=dom.scrollTop-2;
				if(dom.scrollTop<=Math.ceil(_this.size*index)){
					clearTimeout(window[`__um_timer2_last_${val}`]);
					eval(`_this.last_${val}=true`);
					dom.scrollTop=Math.ceil(_this.size*index);
					this._setEmit(val, index);
					window[`__um_timer2_last_${val}`]=setTimeout(()=>{
						eval(`_this.last_${val}=false`);
					}, 30);
					clearTimeout(window[`__um_timer2_${val}`]);
					delete window[`__um_timer2_${val}`];
				}else{
					this._move_min(val, index, _this);
				};
			}, 30);
		},
		_setEmit(val, index){
			if(val==='sheng'){
				if(this.isInit_sheng)return;
				let json_sheng=this.areaData['0'];
				let arr_sheng=Object.keys(json_sheng);
				this.now_sheng={name:json_sheng[arr_sheng[index]], code:arr_sheng[index], index};

				let json_shi=this.areaData[`0,${this.now_sheng.code}`];
				let arr_shi=Object.keys(json_shi);
				this.now_shi={name:json_shi[arr_shi[0]], code:arr_shi[0], index:0};

				let json_qu=this.areaData[`0,${this.now_sheng.code},${this.now_shi.code}`];
				let arr_qu=Object.keys(json_qu);
				this.now_qu={name:json_qu[arr_qu[0]], code:arr_qu[0], index:0};

				um__area__shi.scrollTop=0;
				um__area__qu.scrollTop=0;
			}else if(val==='shi'){
				if(this.isInit_shi)return;
				let json_shi=this.areaData[`0,${this.now_sheng.code}`];
				let arr_shi=Object.keys(json_shi);
				this.now_shi={name:json_shi[arr_shi[index]], code:arr_shi[index], index};

				let json_qu=this.areaData[`0,${this.now_sheng.code},${this.now_shi.code}`];
				let arr_qu=Object.keys(json_qu);
				this.now_qu={name:json_qu[arr_qu[0]], code:arr_qu[0], index:0};

				um__area__qu.scrollTop=0;
			}else{
				if(this.isInit_qu)return;
				let json_qu=this.areaData[`0,${this.now_sheng.code},${this.now_shi.code}`];
				let arr_qu=Object.keys(json_qu);
				this.now_qu={name:json_qu[arr_qu[index]], code:arr_qu[index], index};
			};
		},
		_areaInit(_arr){
			let arr=_arr || this.value;
			let bl=false;
			if(this.first || !_isArray(arr))return;
			if(arr.length===2 && arr[0].code && arr[1].code){
				arr.push({code:undefined, name:undefined});
				bl=true;
			}else if(arr.length===3 && arr[0].code && arr[1].code && arr[2].code){
				bl=true;
			}

			if(bl){
				if(_arr)this.$Loading.run();
				this.isInit_sheng=true;
				this.isInit_shi=true;
				this.isInit_qu=true;

				let code_sheng=arr[0].code,
					name_sheng=arr[0].name,
					code_shi=arr[1].code,
					name_shi=arr[1].name,
					code_qu=arr[2].code,
					name_qu=arr[2].name;
				let _shengArr=Object.keys(this.areaData['0']);
				let index_sheng=0;
				_shengArr.some((val, i)=>{
					index_sheng=i;
					return val===code_sheng;
				});

				let _shiArr=Object.keys(this.areaData[`0,${code_sheng}`]);
				let index_shi=0;
				_shiArr.some((val, i)=>{
					index_shi=i;
					return val===code_shi;
				});

				let _quArr=Object.keys(this.areaData[`0,${code_sheng},${code_shi}`]);
				let index_qu=0;
				_quArr.some((val, i)=>{
					index_qu=i;
					return val===code_qu;
				});

				this.now_sheng={name:name_sheng, code:code_sheng, index:index_sheng};
				this.now_shi={name:name_shi, code:code_shi, index:index_shi};
				this.now_qu={name:name_qu, code:code_qu, index:index_qu};

				this.$nextTick(function(){
					um__area__sheng.scrollTop=index_sheng*this.size;
					um__area__shi.scrollTop=index_shi*this.size;
					um__area__qu.scrollTop=index_qu*this.size;

					setTimeout(()=>{
						this.isInit_sheng=false;
						this.isInit_shi=false;
						this.isInit_qu=false;
						this.$Loading.stop();
					}, 200);
				});
			}
		}
	},
	mounted:function(){
		_BD('touchend', this._toTouchEnd, document);
	},
	beforeDestroy:function(){
		_unBD('touchend', this._toTouchEnd, document);
	}
}
</script>

<style>
.um__modalArea__class {width:100%; height:100%; background:rgba(0,0,0,.3); position:absolute; left:0; top:0;}
.um__modalArea_date__mainBox {width:100%; height:29rem; overflow-x:hidden; overflow-y:auto; background:white; border-radius:1rem 1rem 0 0; box-shadow:0px 0px 10px gray; position:absolute; left:0; bottom:-29rem;}
.um__modalArea_date__mainBox::-webkit-scrollbar {display:none;}
.um__modalArea__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modalArea__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modalArea_main__ennte {animation:UM_SWITCH_BOTTOM_AREA_ON .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_AREA_ON .5s forwards;}
.um__modalArea_main__leave {animation:UM_SWITCH_BOTTOM_AREA_OFF .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_AREA_OFF .5s forwards;}
.um__modalArea_close__ennte {animation:UM_SWITCH_CLOSE_ON .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_ON .5s forwards;}
.um__modalArea_close__leave {animation:UM_SWITCH_CLOSE_OFF .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_OFF .5s forwards;}
.um__modalArea_date__textBtn {width:2rem; font-size:2rem; text-align:center; line-height:2.2rem; font-weight:900; overflow:hidden; color:#373737; position:absolute; right:-2rem; bottom:29.3rem; z-index:1000000;}

.um__modalArea__mainBigBox {width:80%; height:21rem; position:relative; left:10%; top:2rem; background:transparent;}
.um__modalArea__mainBox_sheng {width:31%; height:21rem; position:absolute; left:0; top:0; overflow-y:auto; background:transparent;}
.um__modalArea__mainBox_sheng::-webkit-scrollbar {display:none;}
.um__modalArea__mainBox_shi {width:31%; height:21rem; position:absolute; left:34.5%; top:0; overflow-y:auto; background:transparent;}
.um__modalArea__mainBox_shi::-webkit-scrollbar {display:none;}
.um__modalArea__mainBox_qu {width:31%; height:21rem; position:absolute; left:69%; top:0; overflow-y:auto; background:transparent;}
.um__modalArea__mainBox_qu::-webkit-scrollbar {display:none;}
.um__modalArea__cover_mainBox {width:80%; height:21rem; position:absolute; left:10%; top:2rem; overflow-y:auto; background:transparent;}
.um__modalArea__contentBox {width:100%; position:relative; background:transparent;}
.um__modalArea__item {width:100%; height:3rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; line-height:3rem; font-size:1rem; text-align:center;}
.um__modalArea__mainBox_space {width:100%; height:9rem; background:transparent;}
.um__modalArea__filter {width:100%; height:3rem; border-top:1px solid #d2d6db; border-bottom:1px solid #d2d6db; position:absolute; left:0; top:calc(9rem - 1px);}
.um__modalArea__btn {width:15.5rem; position:absolute; left:6rem; bottom:1rem;}
</style>