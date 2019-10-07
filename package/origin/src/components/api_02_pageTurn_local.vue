<template>
<div class="pageTurnLocal_Box">
	<um-pageturn-local :pageContent="pageContent" class="pageTurnLocal_class">    <!-- 必须为插件设置class, 必须设置宽度和高度 -->
		<div class="pageTurnLocalList" v-for="(val, index) in pageContent.result">
			&nbsp;&nbsp;&nbsp;&nbsp;{{index | toShowNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;name :&nbsp;{{val.name}}
			&nbsp;&nbsp;&nbsp;age :&nbsp;{{val.age}}
			&nbsp;&nbsp;&nbsp;high :&nbsp;{{val.high}}
		</div>
	</um-pageturn-local>
</div>
</template>

<script>
export default {
	data(){
		return {
			pageContent:{
				scrollStyle:{   //插件滚动条的样式      [可选]  json
					width:'3px',
					background:'#999999',
					borderRadius:'2px'
				},
				customHeight:false, // 是否自动根据每一页展示数据的条数来自适应每条数据的高度  (默认false: 自适应高度)  [可选]   boolean
				pageSize:8,    //每一页展示的数据条数       *必须*    number
				data:[    //需要分页的总数据      *必须*    array  ***当改变该值时, 页面将同步刷新且回到第一页
					{name:'A', age:36, high:178},
					{name:'B', age:35, high:177},
					{name:'C', age:34, high:176},
					{name:'D', age:33, high:175},
					{name:'E', age:32, high:174},
					{name:'F', age:31, high:173},
					{name:'G', age:36, high:172},
					{name:'H', age:35, high:171},
					{name:'I', age:34, high:172},
					{name:'G', age:33, high:173},
					{name:'K', age:32, high:174},
					{name:'L', age:31, high:175}
				],
				result:[]   //展示的数据      *必须*    array    **只要将初始值设置为空数组即可
			}
		}
	},
	filters:{
		toShowNum:function(input){
			if(input<10)return '0'+(input+1);
			return input+1;
		}
	},
	mounted:function(){
		setTimeout(()=>{  // 模拟改变pageContent.data
			this.pageContent.data.push({name:'MMM', age:31, high:175});
		}, 3000);
	}
}
</script>

<style>
.pageTurnLocal_Box {width:100%; height:100%; outline:3px solid #FF8000; position:absolute; left:0; top:0;}

.pageTurnLocal_class {width:60%; height:60%; border:2px solid #717171; position:absolute; left:10%; top:10%;}
.pageTurnLocalList {box-shadow:inset 0px -1px #e4e4e4;}
.pageTurnLocalList:hover {background:#f9f9f9;}
</style>