<template>
<div class="appClass_main">
	<div class="navigate_main">
		{{navigate.title}}
		<div class="icon navigate_arrow" @click="toBack">&#xe7e3;</div>
	</div>
	<div class="mainContent">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
export default {
    data(){
        return {
        	navigate:this.DS.navigate
        }
    },
    methods:{
    	toBack(){
    		this.$router.go(-1);
    	}
    }
}
</script>

<style>
.appClass_main {width:100%; height:100%; color:#333333;}
.navigate_main {width:100%; height:3rem; line-height:3rem; background:#eff2f6; text-align:center; font-weight:600; font-size:1.4rem; position:relative; left:0; top:0;}
.navigate_arrow {width:3rem; height:3rem; line-height:3.2rem; font-size:1.8rem; overflow:hidden; position:absolute; left:0; top:0;}
.mainContent {width:100%; height:calc(100% - 3rem); background:#eff2f6; position:relative; left:0; top:0;}

/* 以下为一些本项目常用样式名称 */
.mainRouteBox {width:100%; height:100%; position:relative;}
</style>
