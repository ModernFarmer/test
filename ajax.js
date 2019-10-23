class ___UM_ajax{
	constructor(){
		this.config={  // ajax的全局配置
			baseUrl:'http://localhost:8888',
			timeout:null,
			ontimeout:null,  // [function]  自带固定参数: XMLHttpRequest对象
			responseType:'',
			headers:null,
			onprogress:null  // [function]  自带固定参数: ProgressEvent对象, 它的.loaded属性代表已经完成发送部分的文件大小[number], 它的.total属性代表整个文件大小[number]
		};

		this.temporary={};  // 存放单次临时数据的对象

		this.beforeRequest=function(config){  // 请求发送前触发 [function]  默认null  自带固定参数: config对象; 代表ajax的*全局*配置
			// 如果beforeRequest里面有异步函数, 则必须返回一个Promise
			// 比如:
			/*return new Promise((resolve, reject)=>{
				setTimeout(()=>{
					// todo ...
					resolve(config);
				}, 2000);
			});*/
			// todo ...
			return config;  // 必须返回config
		};

		this.responsed=function(result, XMLObj){  // 接收请求数据后立即触发 [function]  默认null  自带固定参数: 1:接收到的数据, 2:XMLHttpRequest对象; 代表ajax的*全局*配置
			// todo
		};

		// this.beforeRequest=null;  // [null/function]
		// this.responsed=null; // [null/function]
	}
	get(url, json){
		return new Promise(async (resolve, reject)=>{
			let trueConfig=null;
	        if(this.beforeRequest)trueConfig=await this.__before(this.beforeRequest, this.config);
	        if(!trueConfig)trueConfig=this.config;
	        let dataObj=null;
			if(json)dataObj=this.__toBeEncoded(json);
			let ajaxObj=null;
	        if(window.XMLHttpRequest){
	            ajaxObj=new XMLHttpRequest();
	        }else{
	            ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
	        };

	        let trueUrl=dataObj?trueConfig.baseUrl+url+'?'+dataObj.encoded:trueConfig.baseUrl+url;

	        ajaxObj.open('GET',trueUrl, true);

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

	        ajaxObj.onreadystatechange=async ()=>{
	            if(ajaxObj.readyState==4){
	            	let data=ajaxObj.response;
	            	if(this.responsed)this.__after(this.responsed, data, ajaxObj);
            		if(typeof data==='string'){
            			resolve(JSON.parse(data));
            		}else{
            			resolve(data);
            		};
	            }
	        };
		});
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
			return {
				header:'application/json',
				encoded:JSON.stringify(item)
			};
		}else{
		    let arr=[];
		    for(let name in item){
		        arr.push(name+'='+item[name]);
		    };
	    	return {
				header:'application/x-www-form-urlencoded',
				encoded:arr.join('&')
		    };
		};
	}
	__before(fn, config){
		return new Promise((resolve, reject)=>{
			if(!fn){
				resolve(null);
			}else{
				resolve(fn(Object.assign({}, config)));
			};
		});
	}
	__after(fn, result, XMLObj){
		if(fn && typeof fn==='function'){
			if(typeof result==='string'){
				fn(JSON.parse(result), XMLObj);
			}else{
				fn(result, XMLObj);
			};
		};
	}
}

let ajax=new ___UM_ajax();

ajax.get('/demo').then(data=>{
	console.log(data);
})
