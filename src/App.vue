<template>
<div id="app">
<um-dropdown class="aaaaa" :data="list1" :option="'value'" :view="'id'" v-model="a"></um-dropdown>
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
        	a:'23124'
        }
    },
    mounted:function(){
        
    }
}
</script>

<style>
#app {width:100%; height:100%; background:#EDEDED; padding-left:10%; padding-top:10%;}
.aaaaa {}
</style>
