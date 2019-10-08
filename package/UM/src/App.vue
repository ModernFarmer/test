<template>
<div id="app">
    <div class="app_headerBox">
        <div class="app_headerImgBox">
            <img src="/static/image/h_pic.png" class="app_headerImage">
        </div>
        <div class="app_headerTitle">Modules For Vue - <span style="color:#FFF3CE">UncleMao</span></div>

        <div class="app_fnBtnBox">
            <div :class="{app_functionBtn:true, app_typeNow:showType=='TemplateAPI'}" @click="toChangeShowType('TemplateAPI')">Template API</div>
            <div :class="{app_functionBtn:true, app_typeNow:showType=='MethodAPI'}" @click="toChangeShowType('MethodAPI')">Method API</div>
            <div :class="{app_functionBtn:true, app_typeNow:showType=='Modules'}" style="border-right:none" @click="toChangeShowType('Modules')">Modules</div>
        </div>
    </div>

    <div class="app_leftBox">
        <div :class="{app_leftOption:true, app_leftOption_first:index==0, app_leftOption_last:index==list.length-1, app_leftOption_choosed:now==val}" v-for="(val, index) in list" @click="toTurn(val)">{{val}}</div>
    </div>

    <div class="app_mainBox">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            now:'pageturn',
			list:[],
            showType:'TemplateAPI', // 当前显示类型  Modules | TemplateAPI | MethodAPI
            TemplateAPI:'["pageturn", "dropdown", "loading", "radio", "checkbox", "button", "input", "date", "alert"]', // 显示类型为TemplateAPI时的菜单列表数据
			MethodAPI:'["_shrink()"]', // 显示类型为TemplateAPI时的菜单列表数据
            Modules:'["翻页列表模板"]' // 显示类型为module时的菜单列表数据
		}
    },
    methods:{
        toTurn(val){
            this.now=val;
            this.$router.push(`/${this.showType}/${val}`);
        },
        toChangeShowType(val){
            this.showType=val;
            this.list=JSON.parse(this[val]);
            this.now=this.list[0];
        }
    },
    mounted:function(){
    	this.list=JSON.parse(this.TemplateAPI);
    }
}
</script>

<style>
#app {width:100%; height:100%; min-width:1000px; min-height:600px; position:relative;}

.app_headerBox {width:100%; height:60px; background:#404040; position:absolute; left:0; top:0; z-index:10000;}
.app_headerImgBox {width:40px; height:40px; border-radius:5px; border:1px solid #FFFFEC; overflow:hidden; position:absolute; left:10px; top:9px;}
.app_headerImage {width:40px; height:40px;}
.app_headerTitle {line-height:42px; font-size:16px; font-weight:900; color:white; position:absolute; left:70px; top:9px;}
.app_fnBtnBox {height:25px; border-left:1px solid #FFFFEC; border-top:1px solid #FFFFEC; border-right:1px solid #FFFFEC; border-radius:3px 3px 0px 0px; overflow:hidden; position:absolute; right:2px; bottom:0;}
.app_functionBtn {width:100px; height:100%; line-height:25px; border-right:1px solid #FDC542; text-align:center; cursor:pointer; color:#FFF3CE; float:left;}
.app_functionBtn:hover {font-weight:900; color:#dbf993;}
.app_typeNow {background:#2f47a2; color:#FFF3CE; font-weight:900;}

.app_leftBox {width:240px; height:calc(100% - 66px); overflow-y:auto; overflow-x:hidden; background:#717171; border:1px solid #404040; position:absolute; left:2px; top:62px;}
.app_leftOption {width:calc(100% - 26px); line-height:26px; padding-left:20px; font-weight:900; font-size:14px; color:#F4F4F4; cursor:pointer; border-radius:3px; border:1px solid transparent; margin-bottom:3px; margin-left:2px;}
.app_leftOption:hover {border:1px solid #FFFFEC;}
.app_leftOption_first {margin-top:10px;}
.app_leftOption_last {margin-bottom:10px;}
.app_leftOption_choosed {border:1px solid #FDC542; color:#A6FFFF; background:#404040;}

.app_mainBox {width:calc(100% - 250px); height:calc(100% - 66px); overflow:hidden; border:1px solid #404040; position:absolute; left:246px; top:62px;}
</style>
