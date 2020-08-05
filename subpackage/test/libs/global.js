export default {
    _isJson:function(obj){             //判断一个对象是否为json对象,返回布尔值
        let boolean_isjson=typeof(obj)=="object" && Object.prototype.toString.call(obj).toLowerCase()=="[object object]" && !obj.length;
        return boolean_isjson;
    },
    _isArray:function(obj){           //判断一个对象是否为数组,返回布尔值
        return Object.prototype.toString.call(obj)==='[object Array]';
    },
    _getKeyData:function(obj, key){
        let arr=key.split('.');
        let result=null;
        arr.forEach(val=>{
            if(result===null){
                result=obj[val];
            }else{
                result=result[val];
            };
        });
        return result;
    },
    _dateFormat:function(dateValue, string){          //格式化日期时间
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
    },
    _BD:function(target, eventName, fn){      // 给指定元素绑定事件
        if(target.addEventListener){
            target.addEventListener(eventName, fn, false);
        }else if(target.attachEvent){
            target.attachEvent('on'+eventName, fn);
        }else{
            target['on'+eventName]=fn;
        };
    },
    _unBD:function(target, eventName, fn){      // 给指定元素解除绑定事件
        if(target.attachEvent){
            target.detachEvent('on'+eventName, fn);
        }else{
            target.removeEventListener(eventName, fn, false);
        };
    },
    _Storage:{  // -------------------> 缓存对象
        self:window.localStorage,   // 获取当前所有缓存
        get(name){                  // 读取指定缓存
            try{
                return JSON.parse(window.localStorage.getItem(name));
            }catch{
                return window.localStorage.getItem(name);
            };
        },
        set(name, item){            // 设置指定缓存
            if(typeof item==='string'){
                window.localStorage.setItem(name, item);
            }else if(_isJson(item) || _isArray(item)){
                window.localStorage.setItem(name, JSON.stringify(item));
            }else{
                throw 'CACHE.set()方法的第二个参数的类型只能是 string、json 或者 array !';
            };
        },
        remove(name){               // 移除指定缓存
            window.localStorage.removeItem(name);
        }
    },
    _isIdCard:function(code){ // 判断字符串的值是否为国内身份证号码
        let city={ 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
 
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code))return false; // 格式是否错误
 
        if(!city[code.substr(0, 2)])return false; // 地址编码是否错误

        if(code.length===18) {
            let sBirthday=`${code.substr(6, 4)}-${Number(code.substr(10, 2))}-${Number(code.substr(12, 2))}`;
            let d=new Date(sBirthday.replace(/-/g, "/"));
            if(sBirthday!==`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`)return false; // 是否非法生日
        }

        if(code.length===18) { // 验证最后一位校验位
            code=code.split('');
            //∑(ai×Wi)(mod 11)
            let factor=[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
            let parity=[1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验位
            let sum=0;
            for(let i=0; i<17; i++){
                let ai=code[i], wi=factor[i];
                sum+=ai*wi;
            }
            if(parity[sum%11]!=code[17])return false; // 校验位错误
 
        }
        return true;
    },
    _isPhone:function(val){ // 判断字符串或数字的值是否为国内手机号码
        return /^1\d{10}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
    },
    _isNotEmpty:function(val){ // 判断字符串的值是否为非空
        if(val===null || val===undefined)return false;
        return (val+'').replace(/\s+/g, '')!=='';
    },
    _isMail:function(val){ // 判断字符串的值是否为邮箱
        return /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
    },
    _isNumber:function(val){ // 判断字符串的值是否为数字
        return (Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, '')) || Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''))===0)?true:false;
    },
    _preventDefault(event){ // 取消默认事件（必须在事件函数内传递一个事件对象event
		if(document.all){
			window.event.returnValue=false;
		}else {
			event.preventDefault();
		}
	},
	_stopPropagation(event){ // 取消事件冒泡（必须在事件函数内传递一个事件对象event
		if(event.cancelBubble){
			event.cancelBubble=true;
		}else {
			event.stopPropagation();
		}
	}
};