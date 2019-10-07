export default function(json){      // 压缩图片
	var file=json.file;
	var maxWidth=json.maxWidth || null;
	var maxHeight=json.maxHeight || null;
	var quality=json.quality || null;
	var type=json.type || 'image/jpeg';

	if(!HTMLCanvasElement.prototype.toBlob){    // 如果canvas对象没有toBlob方法原型, 则加上(即兼容低版本浏览器)
	    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
	        value: function(callback, type, quality){
	            var _this=this;
	            setTimeout(function(){
	                var binStr=atob(_this.toDataURL(type, quality).split(',')[1]);
	                var len=binStr.length;
	                var arr=new Uint8Array(len);

	                for(var i=0; i<len; i++){
	                    arr[i]=binStr.charCodeAt(i);
	                };

	                callback(new Blob([arr], {type:type || 'image/jpeg'}));
	            });
	        }
	    });
	}

	if(_isArray(file)){    // 判断file是否是一个数组
		var um_imgArr=[];
		var um_promiseArr=[];

		file.forEach(val=>{
			var um_json={};

			um_json.file=val;
			um_json.img=new Image();
			um_json.reader=new FileReader();
			um_json.canvas=document.createElement('canvas'); 
			um_json.context=um_json.canvas.getContext('2d');
			um_json.target_width=0;
			um_json.target_height=0;

			um_imgArr.push(um_json);
		});

		um_imgArr.forEach((val, i)=>{
			var promiseObj=new Promise((resolve, reject)=>{
				val.img.onload=function(){
				    // 图片原始尺寸
				    var originWidth = this.width;
				    var originHeight = this.height;

				    if((maxWidth && maxWidth>0) && (maxHeight && maxHeight>0)){
					    if(originWidth>maxWidth || originHeight>maxHeight){
					    	if(originWidth/originHeight>maxWidth/maxHeight){
					    		val.target_width=maxWidth;
					    		val.target_height=Math.ceil(maxWidth*(originHeight/originWidth));
					    	}else{
					    		val.target_width=Math.ceil(maxHeight*(originWidth/originHeight));
					    		val.target_height=maxHeight;
					    	};
					    }else{
					    	val.target_width=originWidth;
					    	val.target_height=originHeight;
					    };
				    }else if((maxWidth && maxWidth>0) && !maxHeight){
			    		val.target_width=maxWidth;
			    		val.target_height=Math.ceil(maxWidth*(originHeight/originWidth));
				    }else if(!maxWidth && (maxHeight && maxHeight>0)){
			    		val.target_width=Math.ceil(maxHeight*(originWidth/originHeight));
			    		val.target_height=maxHeight;
				    }else if(!maxWidth && !maxHeight){
				    	val.target_width=originWidth;
				    	val.target_height=originHeight;
				    };
				    // 指定画布大小
				    val.canvas.width=val.target_width;
				    val.canvas.height=val.target_height;
				    // 画布生成画面
				    val.context.drawImage(val.img, 0, 0, val.target_width, val.target_height);

				    if(quality){
					    val.canvas.toBlob(blob=>{
					    	resolve({_index:i, _file:blob});
					    }, 'image/jpeg', quality);
				    }else{
					    val.canvas.toBlob(blob=>{
					    	resolve({_index:i, _file:blob});
					    }, type);
				    };
				};

				val.reader.onload=function(){
				    val.img.src=this.result;
				};

				val.reader.readAsDataURL(val.file);
			});

			um_promiseArr.push(promiseObj);
		});
		
		return new Promise((resolve, reject)=>{
			Promise.all(um_promiseArr).then(data=>{
				data.sort((obj1, obj2)=>{
					var n1=obj1._index;
					var n2=obj2._index;
					return n1-n2;
				});
				data.forEach((val, i, arr)=>{
					arr[i]=val._file;
				});
				resolve(data);
			}).catch(err=>{
				reject(err);
			});
		});
	}else{
		return new Promise((resolve, reject)=>{
			var reader=new FileReader();
			var img=new Image();

			var canvas=document.createElement('canvas');
			var context=canvas.getContext('2d');

			var target_width=0;
			var target_height=0;

			img.onload=function(){
			    // 图片原始尺寸
			    var originWidth = this.width;
			    var originHeight = this.height;

			    if((maxWidth && maxWidth>0) && (maxHeight && maxHeight>0)){
				    if(originWidth>maxWidth || originHeight>maxHeight){
				    	if(originWidth/originHeight>maxWidth/maxHeight){
				    		target_width=maxWidth;
				    		target_height=Math.ceil(maxWidth*(originHeight/originWidth));
				    	}else{
				    		target_width=Math.ceil(maxHeight*(originWidth/originHeight));
				    		target_height=maxHeight;
				    	};
				    }else{
				    	target_width=originWidth;
				    	target_height=originHeight;
				    };
			    }else if((maxWidth && maxWidth>0) && !maxHeight){
		    		target_width=maxWidth;
		    		target_height=Math.ceil(maxWidth*(originHeight/originWidth));
			    }else if(!maxWidth && (maxHeight && maxHeight>0)){
		    		target_width=Math.ceil(maxHeight*(originWidth/originHeight));
		    		target_height=maxHeight;
			    }else if(!maxWidth && !maxHeight){
			    	target_width=originWidth;
			    	target_height=originHeight;
			    };
			    // 指定画布大小
			    canvas.width=target_width;
			    canvas.height=target_height;
			    // 画布生成画面
			    context.drawImage(img, 0, 0, target_width, target_height);

			    if(quality){
		    		canvas.toBlob(blob=>{
		    			resolve(blob);
		    		}, 'image/jpeg', quality);
			    }else{
		    		canvas.toBlob(blob=>{
		    			resolve(blob);
		    		}, type);
			    };
			};

			reader.onload=function(){
			    img.src=this.result;
			};

			reader.readAsDataURL(file);
		});
	};
};