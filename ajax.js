class ___UM_ajax{
	constructor(){
		/*this.config={  // ajax的全局配置
			baseUrl:'http://localhost:8888', // *必须 [string] 设置基础访问地址
			timeout:null, // [number] 设置超时时间
			ontimeout:null,  // [function] 设置超时执行函数  自带固定参数: XMLHttpRequest对象
			responseType:'', // [string] 设置返回的数据类型
			headers:null, // [json] 设置请求头
			onprogress:null  // [function] 设置下载进度执行函数  自带固定参数: ProgressEvent对象, 它的.loaded属性代表已经完成发送部分的文件大小[number], 它的.total属性代表整个文件大小[number]
		};*/

		this.config=null;

		this.temporary=null;  // 存放单次临时数据的对象

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

		this.init=function(json){
			let result={};
			result.baseUrl=json.baseUrl || null;
			result.timeout=json.timeout || null;
			result.ontimeout=json.ontimeout || null;
			result.responseType=json.responseType || null;
			result.headers=json.headers || null;
			result.onprogress=json.onprogress || null;

			if(typeof result.baseUrl==='string' && /^https?\:\/\//.test(result.baseUrl)){
                this.config=result;
                delete this.init;
			}else{
				throw ' -> ajax初始化失败!';
			};
		};
	}
	onceConfig(){
		// todo ...
		return this;
	}
	get(url, json){
		if(!this.config)throw ' -> ajax对象未初始化, 请先执行.init()方法初始化ajax对象!';
		return new Promise(async (resolve, reject)=>{
			let temporary=null;
			if(this.temporary){
				temporary=Object.assign({}, this.temporary);
			}
			this.temporary=null;
			let trueConfig=null;
	        if(this.beforeRequest)trueConfig=await this.__before(this.beforeRequest, this.config);
	        if(!trueConfig)trueConfig=this.config;
	        if(temporary){
				if(temporary.baseUrl)trueConfig.baseUrl=temporary.baseUrl;
				if(temporary.timeout)trueConfig.timeout=temporary.timeout;
				if(temporary.ontimeout)trueConfig.ontimeout=temporary.ontimeout;
				if(temporary.responseType)trueConfig.responseType=temporary.responseType;
				if(temporary.headers)trueConfig.headers=temporary.headers;
				if(temporary.onprogress)trueConfig.onprogress=temporary.onprogress;
	        }

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

	        ajaxObj.onreadystatechange=()=>{
	            if(ajaxObj.readyState==4){
	            	let data=ajaxObj.response;
	            	if(this.responsed)this.__after(this.responsed, data, ajaxObj);
            		if(typeof data==='string'){
            			try{
            				let r=JSON.parse(data);
            				resolve(r);
            			}catch{
            				resolve(data);
            			}
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
				encoded:item
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
		if(fn){
			if(typeof result==='string'){
				try{
					let r=JSON.parse(result);
					fn(r, XMLObj);
				}catch{
					fn(result, XMLObj);
				}
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
