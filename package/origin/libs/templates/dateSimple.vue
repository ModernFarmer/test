<template>
<div class="UM_date_simple_Box">
	<div class="UM_date_simple_year_month">
		<div class="UM_date_simple_year_month_arrow1">&#171;</div>
		<div class="UM_date_simple_year_month_arrow2">&#139;</div>
		<div class=""></div>
		<div class="UM_date_simple_year_month_arrow3">&#155;</div>
		<div class="UM_date_simple_year_month_arrow4">&#187;</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {

		}
	},
	computed:{
		num:function(){
			return Math.ceil(Math.random()*100000000);
		}
	},
	mounted:function(){
		
	}
}
</script>

<style>
.UM_date_simple_Box {border-radius:5px; box-shadow:0px 0px 5px #808080;}
.UM_date_simple_year_month {width:100%; height:39px; border-bottom:1px solid #C0C0C0; position:absolute; left:0; top:0;}
.UM_date_simple_year_month_arrow1 {width:20px; height:39px; line-height:36px; cursor:pointer; text-align:center; position:absolute; left:0; top:0;}
.UM_date_simple_year_month_arrow2 {width:20px; height:39px; line-height:36px; cursor:pointer; text-align:center; position:absolute; left:20px; top:0;}
.UM_date_simple_year_month_arrow3 {width:20px; height:39px; line-height:36px; cursor:pointer; text-align:center; position:absolute; right:20px; top:0;}
.UM_date_simple_year_month_arrow4 {width:20px; height:39px; line-height:36px; cursor:pointer; text-align:center; position:absolute; right:0; top:0;}

.UM_date_simple_year_month_arrow1:hover,.UM_date_simple_year_month_arrow2:hover,.UM_date_simple_year_month_arrow3:hover,.UM_date_simple_year_month_arrow4:hover {}
</style>