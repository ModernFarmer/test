<template>
<div :class="{icon:true, um__modalInside__class:true, um__modalInside__ennte:showAnimation, um__modalInside__leave:!showAnimation}" :style="{zIndex:index_z}" v-if="!first" v-show="showModal" @click="toCloseModal">
	<div :class="{um__modalInside_date__mainBox:true, um__modalInside_main__ennte:showAnimation, um__modalInside_main__leave:!showAnimation}" @click.stop>
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
					<div class="um__date__fnBtnB" @click="toMinYear">&#xe633;</div>
					<div class="um__date__fnBtnA" @click="toMinMonth">&#xe7e3;</div>
					<div class="um__date__ymShow">{{`${nowPageInfo.fullYear}年${nowPageInfo.monthStr}月`}}</div>
					<div class="um__date__fnBtnA" @click="toAddMonth">&#xe7e4;</div>
					<div class="um__date__fnBtnB" @click="toAddYear">&#xe631;</div>
				</div>
			</div>
			<div class=um__date__contentBox>
				<div :class="{um__date__dateItem:true, um__date__rgStart:val.throughStart, um__date__rgEnd:val.throughEnd, um__date__dateThrough:val.isThrough}" v-for="(val, index) in dateList" :key="index">
					<div class="um__date__limitCover" v-if="val.disabled"></div>
					<div :class="{um__date__dateMain:true, um__date__dateChoosed:!isRange && val.isChoosed}" @click="toChooseDate(val, index)">
						<span>{{val.dayExp}}</span>
						<span class="um__date__onlyShow" v-if="!val.dayExp">0</span>
						<br>
						<span class="um__date__textDate">{{val.dateStr?val.dateStr:''}}</span><br>
						<span>{{val.explain}}</span>
						<span class="um__date__onlyShow" v-if="!val.explain">0</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div :class="{um__modalInside_date__textBtn:true, um__modalInside_close__ennte:showAnimation, um__modalInside_close__leave:!showAnimation}" v-if="closeDisabled!==false" @click="closeModal">&times;</div>
</div>
</template>

<script>
export default {
	props:['value', 'back-disabled', 'close-disabled', 'show', 'range', 'limit'],
	data(){
		return {
			first:true, // 是否首次加载
			showModal:false, // 是否显示模态框
			index_z:9999999, // 组件的层级
			showAnimation:false, // 显示入场或出场动画
			dateList:[
				/*{  // 无效数据
					dateStr:false
				},
				{  // 有效数据
					fullYear:2020,
					month:5,
					monthStr:'05',
					date:5,
					dateStr:'05',
					week:0,
					weekStr:'日',
					isToday:false,
					isChoosed:false,
					isThrough:false,
					throughStart:false,
					throughEnd:false,
					disabled:false,
					dayExp:'',
					explain:'',
					fullStr:''
				}*/
			],
			weekObj:{'0':'日', '1':'一', '2':'二', '3':'三', '4':'四', '5':'五', '6':'六'},
			todayInfo:{ // 今天的数据
				/*fullYear:2020,
				month:5,
				monthStr:'05',
				date:5,
				dateStr:'05',
				week:0,
				weekStr:'日',
				fullStr:''*/
			},
			nowPageInfo:{ // 当月的数据
				/*fullYear:2020,
				month:5,
				monthStr:'05'*/
			},
			startInfo:{
				isTake:false,
				fullYear:2020,
				month:5,
				monthStr:'05',
				date:5,
				dateStr:'05',
				week:0,
				weekStr:'日',
				fullStr:''
			},
			endInfo:{
				isTake:false,
				fullYear:2020,
				month:5,
				monthStr:'05',
				date:5,
				dateStr:'05',
				week:0,
				weekStr:'日',
				fullStr:''
			}
		}
	},
	computed:{
		isRange:function(){
			return this.range!==undefined;
		},
		disabledInfo:function(){
			if(this.limit && _isJson(this.limit)){
				/*limit格式: {
					min:{
						date:'',
						explain:''
					},
					max:{
						date:'',
						explain:''
					},
					range:[{date:'', explain:''}]
				}*/
				let result=JSON.parse(JSON.stringify(this.limit));
				if(result.range){
					let arr=result.range.map(val=>{
						return val.date;
					});
					result.checkArr=arr;
				}
				return result;
			}else{
				return null;
			};
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
		},
		value:function(_d){
			this.dateList.some((val, i, arr)=>{
				if(val.fullStr===_d)arr[i].isChoosed=true;
				return val.fullStr===_d;
			});
		}
	},
	methods:{
		toChooseDate(obj, index){
			if(this.isRange){
				// 时间范围逻辑
			}else{
				if(obj.isChoosed)return;
				let em={
					date: obj.date,
					dateStr: obj.dateStr,
					explain: obj.explain,
					fullStr: obj.fullStr,
					fullYear: obj.fullYear,
					month: obj.month,
					monthStr: obj.monthStr,
					week: obj.week,
					weekStr: obj.weekStr
				};
				this.dateList.forEach((val, i, arr)=>{
					arr[i].isChoosed=false;
				});
				this.dateList[index].isChoosed=true;
				this.$emit('input', obj.fullStr);
				this.$emit('change', obj.fullStr, em);
				this.closeModal();
			};
		},
		toAddMonth(){
			let date=new Date(this.nowPageInfo.fullYear, this.nowPageInfo.month, 1);
			let y=date.getFullYear(),
				m=date.getMonth()+1;
			let mStr=m>9?''+m:'0'+m;
			this.nowPageInfo={fullYear:y, month:m, monthStr:mStr};
			this.getDateList([y, m]);
		},
		toMinMonth(){
			let date=new Date(this.nowPageInfo.fullYear, this.nowPageInfo.month-2, 1);
			let y=date.getFullYear(),
				m=date.getMonth()+1;
			let mStr=m>9?''+m:'0'+m;
			this.nowPageInfo={fullYear:y, month:m, monthStr:mStr};
			this.getDateList([y, m]);
		},
		toAddYear(){
			let date=new Date(this.nowPageInfo.fullYear+1, this.nowPageInfo.month-1, 1);
			let y=date.getFullYear(),
				m=date.getMonth()+1;
			let mStr=m>9?''+m:'0'+m;
			this.nowPageInfo={fullYear:y, month:m, monthStr:mStr};
			this.getDateList([y, m]);
		},
		toMinYear(){
			let date=new Date(this.nowPageInfo.fullYear-1, this.nowPageInfo.month-1, 1);
			let y=date.getFullYear(),
				m=date.getMonth()+1;
			let mStr=m>9?''+m:'0'+m;
			this.nowPageInfo={fullYear:y, month:m, monthStr:mStr};
			this.getDateList([y, m]);
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
		getDateList(infoArr){
			if(!this.todayInfo.fullStr)this.getTodayInfo();
			let maxDay=null, _y=null, _m=null;
			if(infoArr){
				_y=infoArr[0];
				_m=infoArr[1];
				maxDay=new Date(_y, _m, 0).getDate();
			}else{
				_y=this.todayInfo.fullYear;
				_m=this.todayInfo.month;
				maxDay=new Date(_y, _m, 0).getDate();
			};
			let result=[];
			let rg=false, min=null, max=null;
			if(this.isRange && this.startInfo.isTake && this.endInfo.isTake){
				rg=true;
				min=new Date(this.startInfo.fullYear, this.startInfo.month-1, this.startInfo.date).getTime();
				max=new Date(this.endInfo.fullYear, this.endInfo.month-1, this.endInfo.date).getTime();
			}
			let empty=0;
			for(let i=1; i<maxDay+1; i++){
				let date=new Date(_y, _m-1, i);
				let y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate(), week=date.getDay();
				let mStr=m>9?''+m:'0'+m, dStr=d>9?''+d:'0'+d;
				let fStr=`${y}-${mStr}-${dStr}`;
				let isThrough=false, throughStart=false, throughEnd=false, disabled=false, explain='';
				if(i===1)empty=week;
				if(rg){
					let my=date.getTime();
					if(my>=min && my<=max)isThrough=true;
					if(this.startInfo.fullStr===fStr)throughStart=true;
					if(this.endInfo.fullStr===fStr)throughEnd=true;
				}
				if(this.disabledInfo){
					if(this.disabledInfo.max && this.disabledInfo.max.date && new Date(fStr).getTime()>new Date(this.disabledInfo.max.date).getTime()){
						disabled=true;
						if(this.disabledInfo.max.explain)explain=this.disabledInfo.max.explain;
					}else if(this.disabledInfo.min && this.disabledInfo.min.date && new Date(fStr).getTime()<new Date(this.disabledInfo.min.date).getTime()){
						disabled=true;
						if(this.disabledInfo.min.explain)explain=this.disabledInfo.min.explain;
					}else if(this.disabledInfo.checkArr){
						let j=this.disabledInfo.checkArr.indexOf(fStr);
						if(j!==-1){
							disabled=true;
							if(this.disabledInfo.range[j].explain)explain=this.disabledInfo.range[j].explain;
						}
					}
				}
				result.push({
					fullYear:y,
					month:m,
					monthStr:mStr,
					date:d,
					dateStr:dStr,
					week,
					weekStr:this.weekObj[week+''],
					isToday:this.todayInfo.fullStr===fStr,
					isChoosed:this.value===fStr,
					isThrough,
					throughStart,
					throughEnd,
					disabled,
					dayExp:this.todayInfo.fullStr===fStr?'今日':'',
					explain,
					fullStr:fStr
				});
			};
			if(empty>0){
				for(let i=0; i<empty; i++){
					result.unshift({dateStr:false});
				};
			}
			this.dateList=result;
		},
		getTodayInfo(){ // 获取今天数据
			let date=new Date();
			let y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate();
			let mStr=m>9?''+m:'0'+m, dStr=d>9?''+d:'0'+d;
			this.todayInfo={
				fullYear:y,
				month:m,
				monthStr:mStr,
				date:d,
				dateStr:dStr,
				week:date.getDay(),
				weekStr:this.weekObj[date.getDay()+''],
				fullStr:`${y}-${mStr}-${dStr}`
			};
			this.nowPageInfo={
				fullYear:y,
				month:m,
				monthStr:mStr
			};
		}
	},
	created:function(){
		this.getDateList();
	}
}
</script>

<style>
.um__modalInside__class {width:100%; height:100%; background:rgba(0,0,0,.3); position:absolute; left:0; top:0;}
.um__modalInside_date__mainBox {width:100%; height:70%; overflow-x:hidden; overflow-y:auto; background:white; border-radius:1rem 1rem 0 0; box-shadow:0px 0px 10px gray; position:absolute; left:0; bottom:-70%;}
.um__modalInside_date__mainBox::-webkit-scrollbar {display:none;}
.um__modalInside__ennte {animation:UM_SWITCH_OPACITY1 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY1 .5s forwards;}
.um__modalInside__leave {animation:UM_SWITCH_OPACITY0 .5s forwards; -webkit-animation:UM_SWITCH_OPACITY0 .5s forwards;}
.um__modalInside_main__ennte {animation:UM_SWITCH_BOTTOM_DATE_ON .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_DATE_ON .5s forwards;}
.um__modalInside_main__leave {animation:UM_SWITCH_BOTTOM_DATE_OFF .5s forwards; -webkit-animation:UM_SWITCH_BOTTOM_DATE_OFF .5s forwards;}
.um__modalInside_close__ennte {animation:UM_SWITCH_CLOSE_ON .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_ON .5s forwards;}
.um__modalInside_close__leave {animation:UM_SWITCH_CLOSE_OFF .5s forwards; -webkit-animation:UM_SWITCH_CLOSE_OFF .5s forwards;}
.um__modalInside_date__textBtn {width:2rem; font-size:2rem; text-align:center; line-height:2.2rem; font-weight:900; overflow:hidden; color:#373737; position:absolute; right:-2rem; top:calc(30% - 2.3rem); z-index:1000000;}

.um__date__box {width:100%; text-align:center;}
.um__date__upBox {width:calc(100% - 4rem); padding:.5rem 2rem 0 2rem; position:relative; box-shadow:0 0 1rem rgba(0,0,0,.1);}
.um__date__text {font-size:1.2rem; line-height:4rem; font-weight:700;}
.um__date__weekBox {width:100%; height:2rem; line-height:2rem; font-size:1rem; text-align:center; position:relative;}
.um__date__weekItem {width:14.28%; display:inline-block; color:#999999;}
.um__date__weekDay {color:#3baaff;}
.um__date__showYearMonth {width:100%; height:3rem; line-height:3rem; text-align:center; position:relative;}
.um__date__fnBtnA {width:2rem; display:inline-block;}
.um__date__fnBtnB {width:2rem; font-size:.8rem; display:inline-block; position:relative; top:-1px;}
.um__date__ymShow {width:calc(100% - 8rem); display:inline-block;}
.um__date__contentBox {width:calc(100% - 4rem); padding:1rem 2rem; text-align:left; background:white; position:relative; margin-top:.6rem;}
.um__date__dateItem {width:14.28%; height:3.6rem; line-height:1.2rem; text-align:center; font-size:.8rem; display:inline-block; color:#999999; position:relative;}
.um__date__limitCover {width:100%; height:3.6rem; border-radius:.6rem; background:rgba(0,0,0,.1); position:absolute; left:0; top:0; z-index:10;}
.um__date__rgStart {border-radius:.6rem 0 0 .6rem; overflow:hidden;}
.um__date__rgEnd {border-radius:0 .6rem .6rem 0; overflow:hidden;}
.um__date__dateThrough {background:#e1f0ff;}
.um__date__dateMain {width:100%; height:3.6rem; border-radius:.6rem; line-height:1.2rem; font-size:.8rem; display:inline-block; color:#999999;}
.um__date__dateChoosed {background:#3399ff; color:white;}
.um__date__textDate {font-size:1.1rem; font-weight:700;}
.um__date__onlyShow {opacity:0;}
</style>