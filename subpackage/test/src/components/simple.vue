<template>
<div class="dropdown_simple">
	<!-- <b-date size="big"></b-date>
	<div style="margin-top:400px"></div>
	<b-date range align="right"></b-date> -->
	<b-select style="z-index:100" 
		:list="list" 
		:rules="inputRulesObj" 
		validateField="selectValue1" 
		enabled="value.a|cc" 
		clearable 
		closeSearchClear 
		searchable 
		option="id.a" 
		view="id.a" 
		v-model="selectValue1" 
		model="value.product.name" 
		@change="abc">
	</b-select>
	<div style="height:260px"></div>
	{{selectValue1}}
</div>
</template>

<script>
export default {
	data(){
		return {
			selectValue1:'',
			list:[
				{id:{a:'id_a'}, value:{a:'aa', product:{name:'aaa', id:1, unit:'km'}}},
				{id:{a:'id_b'}, value:{a:'cc', product:{name:'bbb', id:2, unit:'km'}}},
				{id:{a:'id_c'}, value:{a:'cc', product:{name:'ccc', id:3, unit:'km'}}},
				{id:{a:'id_d'}, value:{a:'aa', product:{name:'ddd', id:4, unit:'km'}}},
				{id:{a:'id_i'}, value:{a:'cc', product:{name:'iii', id:5, unit:'km'}}},
				{id:{a:'id_e'}, value:{a:'cc', product:{name:'eee', id:6, unit:'km'}}},
				{id:{a:'id_f'}, value:{a:'cc', product:{name:'fff', id:7, unit:'km'}}},
				{id:{a:'id_g'}, value:{a:'cc', product:{name:'ggg', id:8, unit:'km'}}},
				{id:{a:'id_h'}, value:{a:'cc', product:{name:'hhh', id:9, unit:'km'}}}
			],
			inputRulesObj:{
				'selectValue1':['required|不能为空(下拉框测试1)']
			},
		}
	},
	methods:{
		abc(data, index){
			console.log(data, index)
		},
	},
	mounted:function(){
		
	}
}
</script>

<style>
.dropdown_simple {width:75%; padding:50px; background:#FAFAFA; position:absolute; left:10%; top:20px;}
</style>