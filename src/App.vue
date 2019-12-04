<template>
<div id="app" style="font-size:13px">
    <um-input></um-input>
    <um-dropdown class="dropdown" :list="list2" clearable closeSearchClear searchable option="value.a" view="id.a" v-model="dropdownValue" @change="abc"></um-dropdown>
</div>
</template>

<script>
export default {
    data(){
        return {
        	list:[1,2,3,4,5,6,7],
            list1:[{id:1, value:11},{id:2, value:22},{id:3, value:33},{id:4, value:44},{id:5, value:55},{id:6, value:66}],
            list2:[{id:{a:'id_a'}, value:{a:'aa'}},{id:{a:'id_b'}, value:{a:'bb'}},{id:{a:'id_c'}, value:{a:'cc'}},{id:{a:'id_d'}, value:{a:'dd'}},{id:{a:'id_e'}, value:{a:'ee'}},{id:{a:'id_f'}, value:{a:'ff'}},{id:{a:'id_gg'}, value:{a:'gg'}},{id:{a:'id_hh'}, value:{a:'hh'}},{id:{a:'id_ii'}, value:{a:'ii'}},{id:{a:'id_jj'}, value:{a:'jj'}},{id:{a:'id_kk'}, value:{a:'kk'}},{id:{a:'id_ll'}, value:{a:'ll'}}],
            dropdownValue:'sdfsdfsdf'
        }
    },
    methods:{
    	abc(val, index){
    		
    	}
    },
    mounted:function(){

    }
}
</script>

<style>
#app {width:calc(100% - 30px); height:calc(100% - 30px); background:#EDEDED; padding-left:30px; padding-top:30px;}
.dropdown {margin-top:30px;}
</style>
