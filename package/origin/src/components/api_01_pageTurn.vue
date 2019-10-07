<template>
<div class="pageTurn_Box">
	<input type="text" placeholder="搜索列表id" class="pageTurn_searchInput1" v-model="pageContent.query.condition.query" @input="toSearch">
	<input type="text" placeholder="要显示的value1标题" class="pageTurn_searchInput2" v-model="pageContent.query.condition.valueName" @input="toSearch">
	<div class="pageTurn_headBox">
		<div class="pageTurn_title1">序号</div>
		<div class="pageTurn_title2">value1</div>
		<div class="pageTurn_title3">value2</div>
		<div class="pageTurn_title4">value3</div>
		<div class="pageTurn_title5">value4</div>
	</div>
	<um-pageturn :pageContent="pageContent" class="pageTurn_class">    <!-- 必须为插件设置class, 必须设置宽度和高度 -->
		<div class="pageTurnList" v-for="(val, index) in pageContent.result" :key="'pageTurn'+val.value4">
			<div class="pageTurn_option1">{{index | showIndex}}</div>
			<div class="pageTurn_option2">{{val.value1}}</div>
			<div class="pageTurn_option3">{{val.value2}}</div>
			<div class="pageTurn_option4">{{val.value3}}</div>
			<div class="pageTurn_option5">{{val.value4}}</div>
		</div>
	</um-pageturn>
</div>
</template>

<script>
import DataPublic from '../Data_Public.js'

export default {
	data(){
		return {
			pageContent:{
				scrollStyle:{   //插件滚动条的样式      [可选]  json
					width:'3px',
					background:'#999999',
					borderRadius:'2px'
				},
				scrollSpeed:200,  //滚动条速度         [可选]   number
				customHeight:false, // 是否自动根据每一页展示数据的条数来自适应每条数据的高度  (默认false: 自适应高度)  [可选]   boolean
				url(){    //后台接口地址      *必须*      function
					return DataPublic.url+'/list';
				},
				pageSize:20,    //每一页展示的数据条数       *必须*    number
				setPageTurnName:{     //设置发送给后台的翻页页码和每页展示条数的数据名     *必须*   json
					pageNumberName:'pageNow',    //页码名称
					pageSizeName:'onePage'     //每页展示条数名称
				},
				required(){     //原始必填参数     [可选]   json
					return {
						// [原始必填参数1]:[值1],
						// [原始必填参数2]:[值2]
					};
				},
				getNeedData:function(data){     //从请求回调函数的原始回调数据中提取所需求的数据(getNeedData方法的第一个参数即为原始数据)     *必须*   function
					return {
						total:data.total,     //从原始数据中提取数据总条数的逻辑
						result:data.data     //从原始数据中提取要展示的数据的逻辑
					};
				},
				result:[],    //展示的数据      *必须*    array     **只要将初始值设置为空数组即可
				query:{      //查询功能      [可选]     json
					condition:{       //查询条件      *必须*   json
						query:'',   //条件查询的查询字段1
						valueName:'',   //条件查询的查询字段1
					},
					run:0,       //监听执行查询     *必须*    anything     **如果要执行查询, 只需要改变该值即可
					success:data=>{      //插件查询成功后附加执行的函数     [可选]     function    默认null
										//参数data代表结果数据, 与pageContent.result的内容相同
						console.log(data);
						console.log('Oh! Year~');
					}
				}
			}
		}
	},
	filters:{
		showIndex:function(input){
			if(input>98)return input+1;
			if(input>8)return '0'+(input+1);
			return '00'+(input+1);
		}
	},
	methods:{
		toSearch(){
			if(window.timer_Pageturn)clearTimeout(window.timer_Pageturn);
			window.timer_Pageturn=setTimeout(()=>{
				/*当this.pageContent.query.run的值发生变化时, 插件会根据this.pageContent里面的
				相关参数调取接口, 达到根据条件查询结果的目的*/
				this.pageContent.query.run+=1;
			}, 500);
		}
	},
	beforeDestroy:function(){
		this.pageContent.query.condition={query:'', valueName:''};
	}
}
</script>

<style>
.pageTurn_Box {width:calc(100% - 4px); height:calc(100% - 4px); position:absolute; left:2px; top:2px;}

.pageTurn_searchInput1 {width:160px; height:22px; padding-left:5px; border:1px solid #717171; position:absolute; left:0; top:6px;}
.pageTurn_searchInput2 {width:160px; height:22px; padding-left:5px; border:1px solid #717171; position:absolute; left:175px; top:6px;}

.pageTurn_headBox {width:calc(100% - 2px); height:39px; line-height:39px; text-align:center; border-top:1px solid #717171; border-left:1px solid #717171; border-right:1px solid #717171; background:#d2d2d2; position:absolute; left:0; top:40px;}
.pageTurn_title1 {width:10%; height:100%; float:left;}
.pageTurn_title2 {width:30%; height:100%; float:left;}
.pageTurn_title3 {width:20%; height:100%; float:left;}
.pageTurn_title4 {width:20%; height:100%; float:left;}
.pageTurn_title5 {width:20%; height:100%; float:left;}

.pageTurn_class {width:calc(100% - 2px); height:calc(100% - 82px); border:1px solid #717171; text-align:center; position:absolute; left:0; top:80px;}
.pageTurn_option1 {width:10%; height:100%; float:left;}
.pageTurn_option2 {width:30%; height:100%; float:left;}
.pageTurn_option3 {width:20%; height:100%; float:left;}
.pageTurn_option4 {width:20%; height:100%; float:left;}
.pageTurn_option5 {width:20%; height:100%; float:left;}

.pageTurnList {font-size:14px; min-height:40px; box-shadow:inset 0px -1px #e4e4e4;}    /*这里可以设置列表项的最小高度, 当选项过多时, 将会产出滚动条*/
.pageTurnList:hover {background:#f9f9f9;}
</style>