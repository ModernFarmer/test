<template>
<div id="app" style="font-size:13px">
<um-dropdown class="aaaaa" :list="list2" closeSearchClear searchable option="value.a" view="id.a" v-model="a" @change="abc"></um-dropdown>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
{{a}}
</div>
</template>

<script>
export default {
    data(){
        return {
        	list:[1,2,3,4,5,6,7],
            list1:[{id:1, value:11},{id:2, value:22},{id:3, value:33},{id:4, value:44},{id:5, value:55},{id:6, value:66}],
            list2:[{id:{a:'id_a'}, value:{a:'aa'}},{id:{a:'id_b'}, value:{a:'bb'}},{id:{a:'id_c'}, value:{a:'cc'}},{id:{a:'id_d'}, value:{a:'dd'}},{id:{a:'id_e'}, value:{a:'ee'}},{id:{a:'id_f'}, value:{a:'ff'}},{id:{a:'id_gg'}, value:{a:'gg'}},{id:{a:'id_hh'}, value:{a:'hh'}},{id:{a:'id_ii'}, value:{a:'ii'}},{id:{a:'id_jj'}, value:{a:'jj'}},{id:{a:'id_kk'}, value:{a:'kk'}},{id:{a:'id_ll'}, value:{a:'ll'}}],
        	a:'23124'
        }
    },
    methods:{
    	abc(val, index){
    		
    	}
    },
    mounted:function(){
        setTimeout(()=>{
            this.list2=[{id:{a:'id_m'}, value:{a:'mm'}},{id:{a:'id_n'}, value:{a:'nn'}},{id:{a:'id_a'}, value:{a:'aa'}},{id:{a:'id_b'}, value:{a:'bb'}},{id:{a:'id_c'}, value:{a:'cc'}},{id:{a:'id_d'}, value:{a:'dd'}},{id:{a:'id_e'}, value:{a:'ee'}},{id:{a:'id_f'}, value:{a:'ff'}},{id:{a:'id_gg'}, value:{a:'gg'}},{id:{a:'id_hh'}, value:{a:'hh'}},{id:{a:'id_ii'}, value:{a:'ii'}},{id:{a:'id_jj'}, value:{a:'jj'}},{id:{a:'id_kk'}, value:{a:'kk'}},{id:{a:'id_ll'}, value:{a:'ll'}}];
        }, 2000);
        



        // ----------------- 巨大的BUG 改变list时, 如果list的length变长, 不会监听下拉对象的选项点击事件
    }
}
</script>

<style>
#app {width:100%; height:100%; background:#EDEDED; padding-left:10%; padding-top:80%;}
.aaaaa {}
</style>
