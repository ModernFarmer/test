/*  */

class ___UM_ajax{
	constructor(){
		this.config={  // ajax的全局配置
			baseUrl:'',
			timeout:null,
			ontimeout:null,  // [function]  自带固定参数: XMLHttpRequest对象
			responseType:'',
			headers:null,
			onprogress:null  // [function]  自带固定参数: ProgressEvent对象, 它的.loaded属性代表已经完成发送部分的文件大小[number], 它的.total属性代表整个文件大小[number]
		};

		this.beforeRequest=function(config){  // [function]  自带固定参数: config对象, 代表ajax的*全局*配置
			// todo ...
			return config;
		};

		this.beforeRequest=null;  // [null/function]
		this.responsed=null; // [null/function]


	}
	async get(url, json){
        let trueConfig=await this.__before(this.beforeRequest, this.config);
        if(!trueConfig)trueConfig=this.config;
		let dataStr=await __toBeEncoded(json);
		let ajaxObj=null;
        if(window.XMLHttpRequest){
            ajaxObj=new XMLHttpRequest();
        }else{
            ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
        };

        ajaxObj.open('GET',trueConfig.baseUrl+url+'?'+dataStr, true);

        if(trueConfig.responseType)ajaxObj.responseType=trueConfig.responseType;

        if(trueConfig.headers){
        	for(let name in trueConfig.headers){
        		ajaxObj.setRequestHeader(name, trueConfig.headers[name]);
        	};
        }

        if(trueConfig.onprogress && typeof trueConfig.onprogress==='function'){
        	ajaxObj.onprogress=function(eventObj){
        		trueConfig.onprogress(eventObj);
        	};
        }

        if(trueConfig.timeout){
        	ajaxObj.timeout=trueConfig.timeout;
        	if(trueConfig.ontimeout && typeof trueConfig.ontimeout==='function'){
        		ajaxObj.ontimeout=function(ajaxObj){
        			trueConfig.ontimeout(ajaxObj);
        		};
        	}
        }

        ajaxObj.send();

        ajaxObj.onreadystatechange=()=>{
            if(ajaxObj.readyState==4){
                
            }
        };
	}
	post(){

	}
	jsonPost(){

	}
	form(){

	}
	forms(){

	}
	put(){

	}
	delete(){

	}
	__toBeEncoded(item){
		if(typeof item=='string'){
			return new Promise((resolve, reject)=>{
				resolve({
					header:'application/json',
					encoded:JSON.stringify(item)
				});
			});
		}else{
		    let arr=[];
		    for(let name in item){
		        arr.push(name+'='+item[name]);
		    };
		    return new Promise((resolve, reject)=>{
		    	resolve({
					header:'application/x-www-form-urlencoded',
					encoded:arr.join('&')
			    });
		    });
		};
	}
	__before(fn, config){
		if(!fn){
			return new Promise((resolve, reject)=>{
				resolve(null);
			});
		}else{
			return new Promise((resolve, reject)=>{
				resolve(fn(Object.assign({}, config)));
			});
		};
	}
	__next(ajaxObj, json){
        if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
            json.success && json.success(JSON.parse(ajaxObj.responseText));
        }else{
            json.error && json.error(ajaxObj.status);
        };
	}
}

let ajax=new ___UM_ajax();

ajax.json='abc';

console.log(ajax)