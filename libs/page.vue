<template>
<div class="um__page__class">
	<div :class="{icon:true, um__page__arrowLeft:true, um__page__arrow_disabled:false}" style="margin-right:10px">&#xe7e3;</div>

	<div :class="{icon:true, um__page__marginRight:true, um__page__number:true}">1</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__points:true}">...</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__number:true}">2</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__number:true}">3</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__number:true}">4</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__points:true}">...</div>
	<div :class="{icon:true, um__page__marginRight:true, um__page__number:true}">5</div>

	<div :class="{icon:true, um__page__arrowRight:false, um__page__arrow_disabled:true}" style="margin-left:5px">&#xe7e4;</div>
</div>
</template>

<script>
export default {
	props:[],
	data(){
		return {

		}
	}
}
</script>

<style>
.um__page__class {height:28px; display:inline-block; position:relative;}
.um__page__arrowLeft {width:40px; height:26px; font-size:12px; font-weight:900; line-height:26px; color:#A3A3A3; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowRight {width:40px; height:26px; font-size:12px; font-weight:900; line-height:26px; color:#A3A3A3; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; animation:UM_MOUSELEAVE .5s forwards; -webkit-animation:UM_MOUSELEAVE .5s forwards; -o-animation:UM_MOUSELEAVE .5s forwards; -moz-animation:UM_MOUSELEAVE .5s forwards; -ms-animation:UM_MOUSELEAVE .5s forwards;}
.um__page__arrowLeft:hover, .um__page__arrowRight:hover {animation:UM_MOUSEENTER .5s forwards; -webkit-animation:UM_MOUSEENTER .5s forwards; -o-animation:UM_MOUSEENTER .5s forwards; -moz-animation:UM_MOUSEENTER .5s forwards; -ms-animation:UM_MOUSEENTER .5s forwards;}
.um__page__arrow_disabled {width:40px; height:26px; font-size:12px; font-weight:900; line-height:26px; text-align:center; border-radius:3px; display:inline-block; cursor:not-allowed; border:1px solid #cfcfcf; color:#cfcfcf;}
.um__page__marginRight {margin-right:5px;}

.um__page__number {min-width:15px; height:26px; line-height:26px; font-size:12px; color:#A3A3A3; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid #A3A3A3; padding:0 5px;}
.um__page__points {min-width:15px; height:20px; line-height:20px; font-size:12px; color:#A3A3A3; text-align:center; border-radius:3px; cursor:pointer; display:inline-block; border:1px solid transparent; position:relative; top:3px;}
</style>