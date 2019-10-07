<template>
<div class="dropdown_Box">
	<um-dropdown maxHeight="200px" class="dropdown_class">      <!-- 必须为插件设置class, 必须设置宽度和高度,可以定位(默认为绝对定位) -->
		<div slot="caption">     <!-- 这里必须设置slot="caption", 它代表标题插槽 -->
			我是标题
		</div>
		<div slot="content" :class="{dropdown_opations:true, dropdown_opations_bk:index%2!=0}" v-for="(val, index) in [1,2,3,4,5]" @click="toCheckOpation(val)">     <!-- 这里必须设置slot="caption", 它代表下拉框内的内容插槽 -->
			{{val}}
		</div>
	</um-dropdown>
	<!-- 一共提供5个下拉插件, 分别是: um-dropdown,um-dropdown1,um-dropdown2,um-dropdown3,um-dropdown4, 可在UMCSS.css里面设置每个按钮的默认公用样式 -->
</div>
</template>

<script>
import DataPublic from '../Data_Public.js'

export default {
	data(){
		return {
			public:DataPublic
		}
	},
	methods:{
		toCheckOpation(val){
			alert(val);
		}
	},
	mounted:function(){

	}
}
</script>

<style>
.dropdown_Box {width:50%; height:50%; background:#FFFFD7; position:absolute; left:25%; top:15%;}

.dropdown_class {width:40%; height:10%; background:#9F9F9F; position:absolute; left:30%; top:20%;}

.dropdown_opations:hover {background:#A6D2FF;}
.dropdown_opations_bk {background:#93C496;}
</style>