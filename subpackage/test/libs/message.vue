<template>
<div :id="id" :class="{um_message_globleClass:true, [`um_message_type_${messageType}`]:true}">
	<div class="icon um_message_icon" v-if="icon!==undefined" v-html="icon"></div>
	<div :class="{um_message_value:true, um_message_haveIcon:icon!==undefined}" v-html="value"></div>
</div>
</template>

<script>
export default {
	props:['value', 'type', 'icon'],
	data(){
		return {
			typeArr:['default', 'success', 'warning', 'error']
		}
	},
	computed:{
		id:function(){
			return '_um_message_'+Math.ceil(Math.random()*100000000);
		},
		messageType:function(){
			if(this.type===undefined){
				return 'default';
			}else{
				if(this.typeArr.indexOf((this.type+'').replace(/\s+/g, ''))===-1){
					return 'default';
				}else{
					return (this.type+'').replace(/\s+/g, '');
				};
			};
		}
	},
	mounted:function(){
		um__message__container_id.style.zIndex=99999998;
		setTimeout(()=>{
			um__message__container_id.removeChild(eval(this.id));
			if(um__message__container_id.children.length===0)um__message__container_id.style.zIndex=-1;
		}, 2500);
	}
}
</script>

<style>
.um_message_globleClass {display:table; min-width:240px; margin-bottom:20px; border-radius:5px; padding:20px 25px; font-size:14px; overflow:hidden; position:relative; left:50%; transform:translate(-50%, 0); -webkit-transform:translate(-50%, 0); -o-transform:translate(-50%, 0); -moz-transform:translate(-50%, 0); -ms-transform:translate(-50%, 0); animation:UM_MESSAGE 2.5s forwards; -webkit-animation:UM_MESSAGE 2.5s forwards; -o-animation:UM_MESSAGE 2.5s forwards; -moz-animation:UM_MESSAGE 2.5s forwards; -ms-animation:UM_MESSAGE 2.5s forwards;}

.um_message_type_default {color:white; background:#A0A0A0; box-shadow:3px 3px 7px rgba(0,0,0,.4);}
.um_message_type_success {color:#67c23a; background:#f0f9eb; box-shadow:3px 3px 5px #cee2c4;}
.um_message_type_warning {color:#e6a23c; background:#fdf6ec; box-shadow:3px 3px 5px #e7e4df;}
.um_message_type_error {color:#f56c6c; background:#fef0f0; box-shadow:3px 3px 5px #f0d6d6;}

.um_message_icon {padding-right:20px; display:table-cell; vertical-align:middle; font-size:14px;}
.um_message_value {display:table-cell; vertical-align:middle; white-space:pre-wrap; word-break:break-all; word-wrap:break-word;}
.um_message_haveIcon {text-align:left;}
</style>