<template>
<div class="dropdown_simple">
	<b-date></b-date>
	<div style="margin-top:20px"></div>
	<b-date range></b-date>
<br>
	<b-dropdown style="z-index:101; margin-top:800px" :list="list" enabled="value.a|cc" clearable closeSearchClear searchable option="id.a" view="id.a" v-model="dropdownValue1" model="value.product.name"></b-dropdown><br>
	<b-dropdown style="z-index:100;" :list="list" enabled="value.a|cc" clearable closeSearchClear searchable option="id.a" view="id.a" v-model="dropdownValue1" model="value.product.name"></b-dropdown>
<div style="width:30px; height:900px"></div>
</div>
</template>

<script>
export default {
	data(){
		return {
            list:[
            	{id:{a:'id_a'}, value:{a:'aa', product:{name:'aaa', id:1, unit:'km'}}},
            	{id:{a:'id_b'}, value:{a:'cc', product:{name:'bbb', id:2, unit:'km'}}},
            	{id:{a:'id_c'}, value:{a:'cc', product:{name:'ccc', id:3, unit:'km'}}},
            	{id:{a:'id_d'}, value:{a:'aa', product:{name:'ddd', id:4, unit:'km'}}}
            ],
            dropdownValue1:''
		}
	},
	mounted:function(){

	}
}
</script>

<style>
.dropdown_simple {width:75%; padding:5%; background:#FAFAFA; position:absolute; left:10%; top:20px;}
</style>