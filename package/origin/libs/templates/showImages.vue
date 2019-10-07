<template>
<div>
	<div :class="imageContent.name+'_UM_showImages_plugIn_opationBox UM_showImages_plugIn_opationBox'" :key="imageContent.name+'__'+index" v-for="(val, index) in imageContent.urlArr">
		<div :class="imageContent.name+'_UM_showImages_plugIn_fnCloose UM_showImages_plugIn_fnCloose'" @click="UM_toDeleteImg(index)">&times;</div>
		<img :src="val" :class="imageContent.name+'_UM_showImages_plugIn_imageClass'">
		<div :class="imageContent.name+'_UM_showImages_plugIn_preview UM_showImages_plugIn_preview'" @click="toPreview(val)">预览</div>
	</div>
	<div :class="imageContent.name+'_UM_UM_showImages_plugIn_showImg UM_showImages_plugIn_showImg'" v-show="isShow">
		<div :class="imageContent.name+'_UM_showImages_plugIn_preview_fnCloose UM_showImages_plugIn_preview_fnCloose'" @click="UM_toClosePreview">&times;</div>
		<img :class="imageContent.name+'_UM_showImages_plugIn_previewImage'">
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			isShow:false
		}
	},
	props:['imageContent', 'detialImgData'],
	methods:{
		UM_toDeleteImg(index){
			this.imageContent.urlArr.splice(index, 1);
			this.$emit('update:imageContent');
			if(this.detialImgData){
				this.detialImgData.splice(index, 1);
				this.$emit('update:detialImgData');
			}
		},
		UM_toClosePreview(){
			this.isShow=false;
			_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.src='';
		},
		toPreview(val){
			this.isShow=true;
			if(this.imageContent.showImgStyle)_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg').css(this.imageContent.showImgStyle);
			if(this.imageContent.previewTimesStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_preview_fnCloose').css(this.imageContent.previewTimesStyle).setH('.'+this.imageContent.name+'_UM_showImages_plugIn_preview_fnCloose', {lineHeight:1});
			_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.src=val;
			_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.onload=function(){
	            _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).css({opacity:0});
	            _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).center();
	            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.offsetWidth;
	            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.offsetHeight;
	            if(parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))<w/h){
	                _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
	            }else if(parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))>=w/h){
	                _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))*.98+'px', opacity:1});
	            }

	            _(window).BD('resize', ()=>{
	            	if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])clearTimeout(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]);
	            		window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]=setTimeout(()=>{
			            _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).center();
			            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.offsetWidth;
			            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).el.offsetHeight;
			            if(parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))<w/h){
			                _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
			            }else if(parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))>=w/h){
			                _('.'+this.imageContent.name+'_UM_showImages_plugIn_previewImage', 0).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_UM_showImages_plugIn_showImg', 0).getStyle('height'))*.98+'px', opacity:1});
			            }
			            if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])delete window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i];
	            	}, 500);
	            });
			}.bind(this);
		}
	},
	mounted:function(){
		if(_ifDom('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox')){
			if(this.imageContent.imageBoxStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox').css(this.imageContent.imageBoxStyle);
			if(this.imageContent.timesStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_fnCloose').css(this.imageContent.timesStyle).setH('.'+this.imageContent.name+'_UM_showImages_plugIn_fnCloose', {lineHeight:1});
			if(this.imageContent.previewBtnStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_preview').css(this.imageContent.previewBtnStyle);
			_('.UM_showImages_plugIn_fnCloose').choosable();
			_('.UM_showImages_plugIn_preview').setH('.UM_showImages_plugIn_preview', {lineHeight:1});

            for(let i=0; i<this.imageContent.urlArr.length; i++){
            	_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.onload=function(){
		            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).css({opacity:0});
		            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).center();
		            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetWidth;
		            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetHeight;
		            if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))<w/h){
		                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
		            }else if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))>=w/h){
		                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98+'px', opacity:1});
		            }

		            _(window).BD('resize', ()=>{
		            	if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])clearTimeout(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]);
		            		window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]=setTimeout(()=>{
				            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).center();
				            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetWidth;
				            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetHeight;
				            if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))<w/h){
				                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
				            }else if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))>=w/h){
				                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98+'px', opacity:1});
				            }
				            if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])delete window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i];
		            	}, 500);
		            });
		        }.bind(this);
            };
		}
	},
	updated:function(){
		if(_ifDom('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox')){
			if(this.imageContent.imageBoxStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox').css(this.imageContent.imageBoxStyle);
			if(this.imageContent.timesStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_fnCloose').css(this.imageContent.timesStyle).setH('.'+this.imageContent.name+'_UM_showImages_plugIn_fnCloose', {lineHeight:1});
			if(this.imageContent.previewBtnStyle)_('.'+this.imageContent.name+'_UM_showImages_plugIn_preview').css(this.imageContent.previewBtnStyle);
			_('.UM_showImages_plugIn_fnCloose').choosable();
			_('.UM_showImages_plugIn_preview').setH('.UM_showImages_plugIn_preview', {lineHeight:1});

            for(let i=0; i<this.imageContent.urlArr.length; i++){
            	_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.onload=function(){
		            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).css({opacity:0});
		            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).center();
		            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetWidth;
		            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetHeight;
		            if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))<w/h){
		                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
		            }else if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))>=w/h){
		                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98+'px', opacity:1});
		            }

		            _(window).BD('resize', ()=>{
		            	if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])clearTimeout(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]);
		            		window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i]=setTimeout(()=>{
				            _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).center();
				            let w=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetWidth;
				            let h=_('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).el.offsetHeight;
				            if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))<w/h){
				                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))*.98*h/w+'px', opacity:1});
				            }else if(parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('width'))/parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))>=w/h){
				                _('.'+this.imageContent.name+'_UM_showImages_plugIn_imageClass', i).transition('.2s ease').css({width:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98*w/h+'px', height:parseInt(_('.'+this.imageContent.name+'_UM_showImages_plugIn_opationBox', 0).getStyle('height'))*.98+'px', opacity:1});
				            }
				            if(window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i])delete window[this.imageContent.name+'_timerName_UM_showImages_plugIn_'+i];
		            	}, 500);
		            });
		        }.bind(this);
            };
		}
	}
}
</script>