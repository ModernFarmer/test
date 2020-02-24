function _clientSize() {     //获取可视区宽度和高度,返回对象
	var W=null, H=null;
	if (window.innerWidth && window.innerHeight) {
		W=parseInt(window.innerWidth);
		H=parseInt(window.innerHeight);
	} else if (document.body.clientWidth && document.body.clientHeight) {
		W=parseInt(document.body.clientWidth);
		H=parseInt(document.body.clientHeight);
	}

	if (document.documentElement.clientHeight && document.documentElement.clientWidth) {
		W=parseInt(document.documentElement.clientWidth);
		H=parseInt(document.documentElement.clientHeight);
	}

	return {'w':W, 'h':H};
};

//_clientSize().w;   可视区宽度,是一个数值
//_clientSize().h;   可视区高度,是一个数值

function _scrollDistance(){     //获取滚动条已滚动的距离
	return {x:document.documentElement.scrollLeft||document.body.scrollLeft, y:document.documentElement.scrollTop||document.body.scrollTop};
};

//_scrollDistance().x  横向滚动条已滚动的距离
//_scrollDistance().y  竖向滚动条已滚动的距离

function _preventDefault(event){
	if(document.all){
		window.event.returnValue=false;
	}else {
		event.preventDefault();
	}
}    //---------调用   _preventDefault(event)  取消默认事件（必须在事件函数内传递一个事件对象event）

function _stopPropagation(event){
	if('cancelBubble' in event){
		event.cancelBubble=true;
	}else {
		event.stopPropagation();
	}
}           //---------调用   _stopPropagation(event)   取消事件冒泡（必须在事件函数内传递一个事件对象event）

function _isIE(){
    var info=window.navigator.userAgent;
    if(info.indexOf('Trident')==-1)return null;
    if(info.indexOf('MSIE 7')>0)return 7;
    if(info.indexOf('MSIE 8')>0)return 8;
    if(info.indexOf('MSIE 9')>0)return 9;
    if(info.indexOf('MSIE 10')>0)return 10;
    if(info.indexOf('rv:11'))return 11;
};          //---------调用   _isIE()      获取IE版本, 如果不是IE, 则返回null

function _getFileUrl(fileDom, index){        //获取type="file"的input表单的本地文件地址
    var UM_fileUrl=null;
    var _i=index || 0;
    if(window.createObjectURL!=undefined){
        UM_fileUrl=window.createObjectURL(fileDom.files[_i]);          //basic
    }else if(window.URL!=undefined){
        UM_fileUrl=window.URL.createObjectURL(fileDom.files[_i]);      //firefox
    }else if(window.webkitURL!=undefined){
        UM_fileUrl=window.webkitURL.createObjectURL(fileDom.files[_i]);   //chrome
    }
    return UM_fileUrl;
};

function  _amountToWords(num) {    //将数字或者数字字符串转换成中文大写金额
    if(!/^(0|[1-9]\d*)(\.\d+)?$/.test(num))return "数据非法";

    var unit="千百拾亿千百拾万千百拾元角分";
    var result='';

    num+='00';

    if(num.replace(/0+/, 0)==0)return '零元整';

    var index=num.indexOf('.');

    if (index>=0)num=num.substring(0, index)+num.substr(index+1, 2);

    unit=unit.substr(unit.length-num.length);

    for (var i=0; i<num.length; i++){
        result+='零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i))+unit.charAt(i);
    };

    return result.replace(/零(?:千|百|拾|角)/g, '零').replace(/零+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/亿万/g, '亿').replace(/^元零*?|零分/g, '').replace(/元$/g, '元整');
};

function _isArray(obj) {           //判断一个对象是否为数组,返回布尔值
  return Object.prototype.toString.call(obj) === '[object Array]';
};

function _isJson(obj){             //判断一个对象是否为json对象,返回布尔值
	var boolean_isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	return boolean_isjson;
};

function _isImg(dom, i){              //判断一个<input type="file">的files[0].type字符串是否为图片类型的src字符串
	if(!i)i=0;
	var str=dom.files[i].type;
    var re=/^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    if(re.test(str)){
        return true;
    }else if(!re.test(str)){
        return false;
    }
};

function _ifDom(str){            //判断是否存在str元素
	if(typeof str==='string'){
		return document.querySelector(str)?true:false;
	}else{
		if(str instanceof HTMLElement || str instanceof HTMLCollection || (str instanceof NodeList && str[0] instanceof HTMLElement))return true;
		return false;
	};
};

function _dateFormat(dateValue, string){          //格式化日期
	var dateObj=dateValue==='now'?new Date():new Date(dateValue);
	var json_inf = {
		'Y+':dateObj.getFullYear(),
		'M+':dateObj.getMonth()+1>9?dateObj.getMonth()+1:'0'+(dateObj.getMonth()+1),
		'D+':dateObj.getDate()>9?dateObj.getDate():'0'+dateObj.getDate(),
		'h+':dateObj.getHours()>9?dateObj.getHours():'0'+dateObj.getHours(),
		'm+':dateObj.getMinutes()>9?dateObj.getMinutes():'0'+dateObj.getMinutes(),
		's+':dateObj.getSeconds()>9?dateObj.getSeconds():'0'+dateObj.getSeconds(),
		'q+':Math.floor((dateObj.getMonth() + 3) / 3),
		'w+':dateObj.getDay(),
		'S+':function(){
			if(dateObj.getMilliseconds()<10){
				return '00'+dateObj.getMilliseconds();
			}else if(dateObj.getMilliseconds()>9 && dateObj.getMilliseconds()<100){
				return '0'+dateObj.getMilliseconds();
			}else{
				return dateObj.getMilliseconds();
			}
		}
	};
	for(var key in json_inf) {
		var re=new RegExp(key);
		if(re.test(string)) {
			string = string.replace(re, (json_inf[key]));
		}
	}
	return string;
};

function _getPastMonth(n){        //获取前n个月的日期,格式:'年-月',类型:字符串
	var y=new Date().getFullYear();
	var m=new Date().getMonth()+1;

	if(m<=n%12){
		var month=12-(n%12-m)>10?12-(n%12-m):'0'+(12-(n%12-m));
		return (y-1-parseInt(n/12))+'-'+month;
	}else{
		var month=m-n%12>10?m-n%12:'0'+(m-n%12);
		return (y-1-parseInt(n/12))+'-'+month;
	};
};

function _getPastWeek(n){                      //获取前n周的日期,格式:'年-月-日,年-月-日',类型:字符串
	var weekDay=new Date().getDay();
	var timeChuo=new Date().getTime();

	if(weekDay==0){
		var date_from=new Date(timeChuo-(13+7*(n-1))*24*60*60*1000);
		var date_to=new Date(timeChuo-(7+7*(n-1))*24*60*60*1000);
		var Month_from=(date_from.getMonth()+1)>9?date_from.getMonth()+1:'0'+(date_from.getMonth()+1);
		var Day_from=date_from.getDate()>9?date_from.getDate():'0'+date_from.getDate();
		var Month_to=(date_to.getMonth()+1)>9?date_to.getMonth()+1:'0'+(date_to.getMonth()+1);
		var Day_to=date_to.getDate()>9?date_to.getDate():'0'+date_to.getDate();
		return date_from.getFullYear()+'-'+Month_from+'-'+Day_from+','+date_to.getFullYear()+'-'+Month_to+'-'+Day_to;
	}else{
		var date_from=new Date(timeChuo-(weekDay+6+7*(n-1))*24*60*60*1000);
		var date_to=new Date(timeChuo-(weekDay+7*(n-1))*24*60*60*1000);
		var Month_from=(date_from.getMonth()+1)>9?date_from.getMonth()+1:'0'+(date_from.getMonth()+1);
		var Day_from=date_from.getDate()>9?date_from.getDate():'0'+date_from.getDate();
		var Month_to=(date_to.getMonth()+1)>9?date_to.getMonth()+1:'0'+(date_to.getMonth()+1);
		var Day_to=date_to.getDate()>9?date_to.getDate():'0'+date_to.getDate();
		return date_from.getFullYear()+'-'+Month_from+'-'+Day_from+','+date_to.getFullYear()+'-'+Month_to+'-'+Day_to;
	};
};

function _maxDate(str){     //获取某个月的最大天数.  参数的格式必须为'年-月'或者'年-月-......'
	if(typeof str!=='string' || str.indexOf('-')==-1)throw 'UM库_maxDate()方法错误: _maxDate()方法的参数必须是 [ 字符串 ], 格式必须为 [ 年-月 ] 或者 [ 年-月-... ]!';
	var _y=str.split('-')[0];
	var _m=str.split('-')[1];
    return new Date(parseInt(_y), parseInt(_m), 0).getDate();
};

function _transposition(arr,i,j) {        //数组内元素换位
    var _value=arr[i];
    arr[i]=arr[j];
    arr[j]=_value;
};

function _ajax(json){
    if(!_isJson(json))throw 'UM库_ajax()方法错误: _ajax()方法的参数必须是一个json对象!';
    if(!json.url)throw 'UM库_ajax()方法错误: 缺少 [ url ] 参数!';
    json.data=json.data || {};
    json.headers=json.headers || null;
    json.method=json.method || 'get';
    json.FormData=json.FormData || null;
    json.FormData_More=json.FormData_More || null;
    json.async=json.async || true;
    json.overtime=json.overtime || null;
    json.success=json.success || null;
    json.error=json.error || null;
    json.UPpercent=json.UPpercent || null;

    var dataStr='';

    if(typeof json.data=='string'){
    	dataStr=json.data;
    }else if(JSON.stringify(json.data)!=='{}'){   //将json数据转换成a='xxx'&b='xxx'&c='xxx'形式的字符串
	    var arr=[];
	    for(var name in json.data){
	        arr.push(name+'='+json.data[name]);
	    };
	    dataStr=arr.join('&');
    }

    if(!json.FormData && !json.FormData_More){
        if(window.XMLHttpRequest){
            var ajaxObj=new XMLHttpRequest();
        }else{
            var ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
        };

        if(json.method.toLowerCase()==='get'){
            ajaxObj.open('GET',json.url+'?'+dataStr, json.async);
            if(json.headers){
            	for(var name in json.headers){
            		ajaxObj.setRequestHeader(name, json.headers[name]);
            	};
            }
            ajaxObj.send();
        }else if(json.method.toLowerCase()==='post'){
            ajaxObj.open('POST',json.url, json.async);
            if(json.headers){
            	for(var name in json.headers){
            		ajaxObj.setRequestHeader(name, json.headers[name]);
            	};
            }else{
            	ajaxObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            };
            ajaxObj.send(dataStr);
        }

        if(json.overtime){
            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
                ajaxObj.abort();
                console.log(json.overtime.msg);
            }, json.overtime.time);
        }

        ajaxObj.onreadystatechange=function(){
            if(ajaxObj.readyState==4){
                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
                    json.success && json.success(JSON.parse(ajaxObj.responseText));
                }else{
                    json.error && json.error(ajaxObj.status);
                };
            }
        };
    }else if(json.FormData_More && _isJson(json.FormData_More)){
        if(window.XMLHttpRequest){
            var ajaxObj=new XMLHttpRequest();
        }else{
            var ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
        };
        ajaxObj.open('POST',json.url, json.async);
        if(json.headers){
        	for(var name in json.headers){
        		ajaxObj.setRequestHeader(name, json.headers[name]);
        	};
        }
        var formObj=new FormData();

        for(var i=0; i<json.FormData_More.inputs.length; i++){
        	if(json.FormData_More.inputs[i].files && json.FormData_More.inputs[i].files.length>0){
	        	for(var k=0; k<json.FormData_More.inputs[i].files; k++){
		            formObj.append(json.FormData_More.name+i+'_'+k, json.FormData_More.inputs[i].files[k]);
		            formObj.append('fileObj', json.FormData_More.name+i+'_'+k);
	        	};
        	}else if(!json.FormData_More.inputs[i].files){
        		throw '目标元素数组inputs参数内含有非文本域元素!';
        		return;
        	}
        };

        if(json.FormData_More.encoded){
            for(var name in json.FormData_More.encoded){
                formObj.append(name, json.FormData_More.encoded[name]);
            };

	        if(json.overtime){
	            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
	                ajaxObj.abort();
	                console.log(json.overtime.msg);
	            }, json.overtime.time);
	        }

            if(json.UPpercent && (typeof json.UPpercent==='function') ){
		        ajaxObj.upload.onprogress=function(event){
		            var percent=event.loaded/event.total*100+'%';
		            json.UPpercent(percent);
		        };
            }
	        ajaxObj.onreadystatechange=function(){
	            if(ajaxObj.readyState==4){
	                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
	                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
	                    json.success && json.success(JSON.parse(ajaxObj.responseText));
	                }else{
	                    json.error && json.error(ajaxObj.status);
	                };
	            }
	        };

            ajaxObj.send(formObj);
        }else{
            if(json.UPpercent && (typeof json.UPpercent==='function')){
		        ajaxObj.upload.onprogress=function(event){
		            var percent=event.loaded/event.total*100+'%';
		            json.UPpercent(percent);
		        };
            }
	        ajaxObj.onreadystatechange=function(){
	            if(ajaxObj.readyState==4){
	                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
	                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
	                    json.success && json.success(JSON.parse(ajaxObj.responseText));
	                }else{
	                    json.error && json.error(ajaxObj.status);
	                };
	            }
	        };

            ajaxObj.send(formObj);
        };
    }else if(json.FormData && _isJson(json.FormData)){
        if(window.XMLHttpRequest){
            var ajaxObj=new XMLHttpRequest();
        }else{
            var ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
        };

        ajaxObj.open('POST',json.url, json.async);
        if(json.headers){
        	for(var name in json.headers){
        		ajaxObj.setRequestHeader(name, json.headers[name]);
        	};
        }
        if(json.FormData.input instanceof HTMLElement){
            var formObj=new FormData();
            if(json.FormData.input.files && json.FormData.input.files.length>0){
                for(var i=0; i<json.FormData.input.files.length; i++){
                    formObj.append(json.FormData.name+i, json.FormData.input.files[i]);
                    formObj.append('fileObj', json.FormData.name+i);
                };
                if(json.FormData.encoded){
                    for(var name in json.FormData.encoded){
                        formObj.append(name, json.FormData.encoded[name]);
                    };

			        if(json.overtime){
			            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
			                ajaxObj.abort();
			                console.log(json.overtime.msg);
			            }, json.overtime.time);
			        }

                    if(json.UPpercent && (typeof json.UPpercent==='function') ){
				        ajaxObj.upload.onprogress=function(event){
				            var percent=event.loaded/event.total*100+'%';
				            json.UPpercent(percent);
				        };
                    }
			        ajaxObj.onreadystatechange=function(){
			            if(ajaxObj.readyState==4){
			                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
			                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
			                    json.success && json.success(JSON.parse(ajaxObj.responseText));
			                }else{
			                    json.error && json.error(ajaxObj.status);
			                };
			            }
			        };

                    ajaxObj.send(formObj);
                }else{
                    if(json.UPpercent && (typeof json.UPpercent==='function') ){
				        ajaxObj.upload.onprogress=function(event){
				            var percent=event.loaded/event.total*100+'%';
				            json.UPpercent(percent);
				        };
                    }
			        ajaxObj.onreadystatechange=function(){
			            if(ajaxObj.readyState==4){
			                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
			                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
			                    json.success && json.success(JSON.parse(ajaxObj.responseText));
			                }else{
			                    json.error && json.error(ajaxObj.status);
			                };
			            }
			        };

                    ajaxObj.send(formObj);
                };
            }else if(json.FormData.input.files && json.FormData.input.files.length==0 && json.FormData.encoded){
                for(var name in json.FormData.encoded){
                    formObj.append(name, json.FormData.encoded[name]);
                };

		        if(json.overtime){
		            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
		                ajaxObj.abort();
		                console.log(json.overtime.msg);
		            }, json.overtime.time);
		        }

                if(json.UPpercent && (typeof json.UPpercent==='function') ){
			        ajaxObj.upload.onprogress=function(event){
			            var percent=event.loaded/event.total*100+'%';
			            json.UPpercent(percent);
			        };
                }
		        ajaxObj.onreadystatechange=function(){
		            if(ajaxObj.readyState==4){
		                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
		                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
		                    json.success && json.success(JSON.parse(ajaxObj.responseText));
		                }else{
		                    json.error && json.error(ajaxObj.status);
		                };
		            }
		        };

                ajaxObj.send(formObj);
            }else if(!json.FormData.input.files){
                throw '目标元素input参数不是文本域元素!';
                return;
            }else{
                throw '_ajax()方法未发送任何内容,请确认!';
                return;
            };
        }else if(_isArray(json.FormData.input)){
            var formObj=new FormData();
            if(json.FormData.input.length>0){
                for(var i=0; i<json.FormData.input.length; i++){
                    formObj.append(json.FormData.name+i, json.FormData.input[i]);
                    formObj.append('fileObj', json.FormData.name+i);
                };
                if(json.FormData.encoded){
                    for(var name in json.FormData.encoded){
                        formObj.append(name, json.FormData.encoded[name]);
                    };

			        if(json.overtime){
			            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
			                ajaxObj.abort();
			                console.log(json.overtime.msg);
			            }, json.overtime.time);
			        }

                    if(json.UPpercent && (typeof json.UPpercent==='function') ){
				        ajaxObj.upload.onprogress=function(event){
				            var percent=event.loaded/event.total*100+'%';
				            json.UPpercent(percent);
				        };
                    }
			        ajaxObj.onreadystatechange=function(){
			            if(ajaxObj.readyState==4){
			                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
			                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
			                    json.success && json.success(JSON.parse(ajaxObj.responseText));
			                }else{
			                    json.error && json.error(ajaxObj.status);
			                };
			            }
			        };

                    ajaxObj.send(formObj);
                }else{
                    if(json.UPpercent && (typeof json.UPpercent==='function') ){
				        ajaxObj.upload.onprogress=function(event){
				            var percent=event.loaded/event.total*100+'%';
				            json.UPpercent(percent);
				        };
                    }
			        ajaxObj.onreadystatechange=function(){
			            if(ajaxObj.readyState==4){
			                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
			                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
			                    json.success && json.success(JSON.parse(ajaxObj.responseText));
			                }else{
			                    json.error && json.error(ajaxObj.status);
			                };
			            }
			        };

                    ajaxObj.send(formObj);
                };
            }else if(json.FormData.input.length==0 && json.FormData.encoded){
                for(var name in json.FormData.encoded){
                    formObj.append(name, json.FormData.encoded[name]);
                };

		        if(json.overtime){
		            window['UM_ajax__'+json.overtime.name]=setTimeout(function(){
		                ajaxObj.abort();
		                console.log(json.overtime.msg);
		            }, json.overtime.time);
		        }

                if(json.UPpercent && (typeof json.UPpercent==='function') ){
			        ajaxObj.upload.onprogress=function(event){
			            var percent=event.loaded/event.total*100+'%';
			            json.UPpercent(percent);
			        };
                }
		        ajaxObj.onreadystatechange=function(){
		            if(ajaxObj.readyState==4){
		                if(json.overtime)clearTimeout(window['UM_ajax__'+json.overtime.name]);              //如果超时器规定时间内服务器读取完成,则关闭超时器
		                if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
		                    json.success && json.success(JSON.parse(ajaxObj.responseText));
		                }else{
		                    json.error && json.error(ajaxObj.status);
		                };
		            }
		        };

                ajaxObj.send(formObj);
            }else{
                throw '_ajax()方法未发送任何内容,请确认!';
                return;
            };
        }else{
            throw 'UM库_ajax()方法错误: FormData模式下的表单元素 [ #'+json.FormData.input+' ] 不存在 或者 [ #'+json.FormData.input+' ] 不是一个装着file的数组!';
        };
    }
};

function ___UM_getDom(str, i){                             //构造函数
	if(typeof str==='string'){
		if(i || i===0){
			this.el=document.querySelectorAll(str)[i];
		}else{
			this.el=document.querySelectorAll(str);
		};
	}else if(str instanceof HTMLElement){
		this.el=str;
	}else if(str instanceof HTMLCollection || (str instanceof NodeList && str[0] instanceof HTMLElement)){
		if(i || i===0){
			this.el=str[i];
		}else{
			this.el=str;
		};
	}else if(str===document || str===window){
		this.el=str;
	}

	this.arguments=arguments;
	if(this.el && this.el.length){
		this.length=this.el.length;
	}else if(this.el===window || this.el===document){
		this.length=null;
	}else if(!this.el){
		this.length=0;
	}else{
		this.length=1;
	};
};

function _(str, i){                                      //实例化构造函数对象
	return new ___UM_getDom(str, i);
};

___UM_getDom.prototype.css=function(json, fn){              //原型: .css()方法
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .css() 方法错误: window和document不能有.css()方法!';
	if(!this.el.length){
		for(name in json){
    		this.el.style[name]=json[name];
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(name in json){
	    		this.el[i].style[name]=json[name];
			};
		};
	};
	if(fn){
		setTimeout(function(){
			fn(this)
		}.bind(this));
	}
	return this;
};

___UM_getDom.prototype.getStyle=function(typeName){           //原型: .getStyle()方法    获取计算后的样式
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .getStyle() 方法错误: window和document不能有.getStyle()方法!';
	if(!this.el.length){
		if(window.getComputedStyle){
			return getComputedStyle(this.el,false)[typeName];
		}else{
			return this.el.currentStyle[typeName];
		};
	}else{
		throw 'UM库 .getStyle() 方法错误: .getStyle()方法只能获取一个元素的样式的值, 当前未指定元素的索引值!';
	};
};

___UM_getDom.prototype.offset=function(val){           //原型: .offset()方法    获取一个元素的边到浏览器的距离
	if(!this.el.length){
		val=val || '';
		if(val.toLowerCase()==='left'){
			var distance=this.el.offsetLeft;
			var par=this.el.offsetParent;
			while(par!=null){
				distance+=par.offsetLeft;
				par=par.offsetParent;
			};
			return distance;
		}else if(val.toLowerCase()==='top'){
			var distance=this.el.offsetTop;
			var par=this.el.offsetParent;
			while(par!=null){
				distance+=par.offsetTop;
				par=par.offsetParent;
			};
			return distance;
		}else{
			return undefined;
		};
	}else{
		throw 'UM库 .offset() 方法错误: .offset()方法只能获取一个元素的边到浏览器的距离!';
	}
};

___UM_getDom.prototype.transform=function(val){              //原型: .transform()方法    设置2d或3d变换
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transform() 方法错误: window和document不能有.transform()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Transform']=val;
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(var j=0; j<mould.length; j++){
				this.el[i].style[mould[j]+'Transform']=val;
			}
		};
	};
	return this;
};

___UM_getDom.prototype.transformOrigin=function(val){        //原型: .transformOrigin()方法    设置2d或3d变换的[变形原点]
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformOrigin() 方法错误: window和document不能有.transformOrigin()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'TransformOrigin']=val;
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(var j=0; j<mould.length; j++){
				this.el[i].style[mould[j]+'TransformOrigin']=val;
			};
		};
	};
	return this;
};

___UM_getDom.prototype.transition=function(val){            //原型: .transition()方法    设置2d和3d变换的[transition动画]
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transition() 方法错误: window和document不能有.transition()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Transition']=val;
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(var j=0; j<mould.length; j++){
				this.el[i].style[mould[j]+'Transition']=val;
			};
		};
	};
	return this;
};

___UM_getDom.prototype.animation=function(val){           //原型: .animation()方法    设置2d和3d变换的[animation动画]
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .animation() 方法错误: window和document不能有.animation()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Animation']=val;
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(var j=0; j<mould.length; j++){
				this.el[i].style[mould[j]+'Animation']=val;
			};
		};
	};
	return this;
};

___UM_getDom.prototype.perspective=function(val1, val2){                   //原型: .perspective()方法    设置3d变换的[透视距离]和[透视原点]
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .perspective() 方法错误: window和document不能有.perspective()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Perspective']=val1;
			if(val2)this.el.style[mould[j]+'PerspectiveOrigin']=val2;
		};
	}else{
		throw 'UM库 .perspective() 方法错误: .perspective()方法只能设置一个元素的[透视距离]和[透视原点], 当前未指定元素的索引值!';
	};
	return this;
};

___UM_getDom.prototype.transformStyle=function(val1, val2){              //原型: .perspective()方法    设置3d变换的[变形风格]和[背面是否可见]属性
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o',''];
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'TransformStyle']=val1;
			if(val2)this.el.style[mould[j]+'BackfaceVisibility']=val2;
		};
	}else{
		for(var i=0; i<this.el.length; i++){
			for(var j=0; j<mould.length; j++){
				this.el[i].style[mould[j]+'TransformStyle']=val1;
				if(val2)this.el[i].style[mould[j]+'BackfaceVisibility']=val2;
			};
		};
	};
	return this;
};

___UM_getDom.prototype.BD=function(eventName, fn, option){          //原型: .BD()方法    给一个元素绑定事件
	if(!this.el.length || this.arguments[0]===document || this.arguments[0]===window){
		if(this.el.addEventListener){
			this.el.addEventListener(eventName, fn, option);
		}else if(this.el.attachEvent){
			this.el.attachEvent('on'+eventName,fn);
		}else{
			this.el['on'+eventName]=fn;
		};
	}else{
		throw 'UM库 .BD() 方法错误: .BD()方法只能给一个元素[绑定事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.unBD=function(eventName, fn){      //原型: .unBD()方法    给一个元素解除绑定事件
	if(!this.el.length || this.arguments[0]===document || this.arguments[0]===window){
		if(this.el.removeEventListener){
			this.el.removeEventListener(eventName,fn,false);
		}else if(this.el.detachEvent){
			this.el.detachEvent('on'+eventName,fn);
		};
	}else{
		throw 'UM库 .unBD() 方法错误: .unBD()方法只能给一个元素[解除绑定事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.BD_transitionend=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.BD('transitionend', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'TransitionEnd';
			this.BD(eventName, fn);
		};
	}else{
		throw 'UM库 .BD_transitionend() 方法错误: .BD_transitionend()方法只能给一个元素[绑定transitionend事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.unBD_transitionend=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.unBD('transitionend', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'TransitionEnd';
			this.unBD(eventName, fn);
		};
	}else{
		throw 'UM库 .unBD_transitionend() 方法错误: .unBD_transitionend()方法只能给一个元素[解除绑定transitionend事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.BD_animationstart=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.BD('animationstart', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'AnimationStart';
			this.BD(eventName, fn);
		};
	}else{
		throw 'UM库 .BD_animationstart() 方法错误: .BD_animationstart()方法只能给一个元素[绑定animationstart事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.unBD_animationstart=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.unBD('animationstart', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'AnimationStart';
			this.unBD(eventName, fn);
		};
	}else{
		throw 'UM库 .unBD_animationstart() 方法错误: .unBD_animationstart()方法只能给一个元素[解除绑定animationstart事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.BD_animationiteration=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.BD('animationiteration', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'Animationiteration';
			this.BD(eventName, fn);
		};
	}else{
		throw 'UM库 .unBD_animationstart() 方法错误: .unBD_animationstart()方法只能给一个元素[解除绑定animationstart事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.unBD_animationiteration=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	if(!this.el.length){
		this.unBD('animationiteration', fn);
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'Animationiteration';
			this.unBD(eventName, fn);
		};
	}else{
		throw 'UM库 .unBD_animationstart() 方法错误: .unBD_animationstart()方法只能给一个元素[解除绑定animationstart事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.BD_animationend=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	this.BD('animationend', fn);
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'AnimationEnd';
			this.BD(eventName, fn);
		};
	}else{
		throw 'UM库 .BD_animationend() 方法错误: .BD_animationend()方法只能给一个元素[绑定animationend事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.unBD_animationend=function(fn){
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .transformStyle() 方法错误: window和document不能有.transformStyle()方法!';
	var mould=['ms','moz','webkit','o'];
	this.unBD('animationend', fn);
	if(!this.el.length){
		for(var j=0; j<mould.length; j++){
			var eventName=mould[j]+'AnimationEnd';
			this.unBD(eventName, fn);
		};
	}else{
		throw 'UM库 .unBD_animationend() 方法错误: .unBD_animationend()方法只能给一个元素[解除绑定animationend事件], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.setW=function(cssName, json){        //原型: .setW()方法    设置元素 [ 宽度相关 ] 的 [ 数值型 ] CSS属性
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .setW() 方法错误: window和document不能有.setW()方法!';
	var __jsonX={};
	for(name in json){
		__jsonX[name]=parseInt(_(cssName, 0).getStyle('width'))*json[name]+'px';
	};
	this.css(__jsonX);
	_(window).BD('resize', function(){
		if(_ifDom(cssName)){
			var __jsonX_resize={};
			for(name in json){
				__jsonX_resize[name]=parseInt(_(cssName, 0).getStyle('width'))*json[name]+'px';
			};
			this.css(__jsonX_resize);
		}
	}.bind(this));

	return this;
};

___UM_getDom.prototype.setH=function(cssName, json){        //原型: .setH()方法    设置元素 [ 高度相关 ] 的 [ 数值型 ] CSS属性
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .setH() 方法错误: window和document不能有.setH()方法!';
	var __jsonX={};
	for(name in json){
		__jsonX[name]=parseInt(_(cssName, 0).getStyle('height'))*json[name]+'px';
	};
	this.css(__jsonX);
	_(window).BD('resize', function(){
		if(_ifDom(cssName)){
			var __jsonX_resize={};
			for(name in json){
				__jsonX_resize[name]=parseInt(_(cssName, 0).getStyle('height'))*json[name]+'px';
			};
			this.css(__jsonX_resize);
		}
	}.bind(this));

	return this;
};
___UM_getDom.prototype.setMW=function(cssName, json){        //原型: .setMW()方法    设置 [ 移动端 ] 元素 [ 宽度相关 ] 的 [ 数值型 ] CSS属性
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .setMW() 方法错误: window和document不能有.setMW()方法!';
	var __jsonX={};
	for(name in json){
		__jsonX[name]=parseInt(_(cssName, 0).getStyle('width'))*json[name]+'px';
	};
	this.css(__jsonX);

	return this;
};

___UM_getDom.prototype.setMH=function(cssName, json){        //原型: .setMH()方法    设置 [ 移动端 ] 元素 [ 宽度相关 ] 的 [ 数值型 ] CSS属性
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .setMH() 方法错误: window和document不能有.setMH()方法!';
	var __jsonX={};
	for(name in json){
		__jsonX[name]=parseInt(_(cssName, 0).getStyle('height'))*json[name]+'px';
	};
	this.css(__jsonX);

	return this;
};

___UM_getDom.prototype.mousewheel=function(upFn, downFn){        //原型: .mousewheel()方法    设置 [ 鼠标滚轮事件 ]
	if(!this.el.length || this.arguments[0]===document || this.arguments[0]===window){
		this.BD('mousewheel', function(event){
			_stopPropagation(event);
			_preventDefault(event);
			var up=event.wheelDelta>0?true:false;
			if(up){
				upFn();
			}else{
				downFn();
			};
		}).BD('DOMMouseScroll', function(event){
			_stopPropagation(event);
			_preventDefault(event);
			var up=event.detail<0?true:false;
			if(up){
				upFn();
			}else{
				downFn();
			};
		});
	}else{
		throw 'UM库 .mousewheel() 方法错误: .mousewheel()方法只能给一个元素设置 [ 鼠标滚轮事件 ], 当前未指定元素的索引值!';
		return;
	};
	return this;
};

___UM_getDom.prototype.choosable=function(val){        //原型: .choosable()方法    设置元素的文字 [ 是否可被选中 ]
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .choosable() 方法错误: window和document不能有.choosable()方法!';
	var mould=['ms','moz','webkit',''];
	if(!this.el.length){
		if(val && val===true){
			for(var j=0; j<mould.length; j++){
				this.el.style[mould[j]+'UserSelect']='';
			};
		}else{
			for(var j=0; j<mould.length; j++){
				this.el.style[mould[j]+'UserSelect']='none';
			};
		};
	}else{
		if(val && val===true){
			for(var i=0; i<this.el.length; i++){
				for(var j=0; j<mould.length; j++){
					this.el[i].style[mould[j]+'UserSelect']='';
				};
			};
		}else{
			for(var i=0; i<this.el.length; i++){
				for(var j=0; j<mould.length; j++){
					this.el[i].style[mould[j]+'UserSelect']='none';
				};
			};
		};
	};
	return this;
};

___UM_getDom.prototype.center=function(val){        //原型: .center()方法    设置元素居中
	if(this.arguments[0]===window || this.arguments[0]===document)throw 'UM库 .center() 方法错误: window和document不能有.center()方法!';
	if(val && val==='w'){
		this.css({position:'absolute',left:'50%'}).transform('translate(-50%,0)');
		return this;
	}else if(val && val==='h'){
		this.css({position:'absolute',top:'50%'}).transform('translate(0,-50%)');
		return this;
	}else{
		this.css({position:'absolute',left:'50%',top:'50%'}).transform('translate(-50%,-50%)');
		return this;
	};
};
