<template>
<div :id="id" class="icon um_menu_Box" v-html="msg"></div>
</template>

<script>
export default {
	props:['msg', 'id'],
	data(){
		return {
			className:'um_menu_Box um_menu_Box_show'
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			eval(this.id).className=this.className;
		});
	}
}
</script>

<style>
.um_menu_Box {max-width:70%; max-height:80%; background:#535353; border-radius:.3rem; color:white; line-height:1.2rem; white-space:pre-wrap; word-wrap:break-word; word-wrap:break-all; text-align:center; padding:1rem; position:absolute; left:50%; top:30%; transform:translate(-50%, 0); -webkit-transform:translate(-50%, 0); z-index:-1;}
.um_menu_Box_show {animation:Message 2s forwards; -webkit-animation:Message 2s forwards;}
</style>