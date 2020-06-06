export default {
    _isJson:function(obj){             //判断一个对象是否为json对象,返回布尔值
        let boolean_isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return boolean_isjson;
    },
    _isArray:function(obj) {           //判断一个对象是否为数组,返回布尔值
        return Object.prototype.toString.call(obj) === '[object Array]';
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
    _transcoding:function(input) {        // 密码转码
        let keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
        + "wxyz0123456789+/" + "=";
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
    
        return output;
    },
    _BD:function(eventName, fn, target){      // 给指定元素绑定事件
        if(target.addEventListener){
            target.addEventListener(eventName, fn, false);
        }else if(target.attachEvent){
            target.attachEvent('on'+eventName,fn);
        }else{
            target['on'+eventName]=fn;
        };
    },
    _unBD:function(eventName, fn, target){      // 给指定元素解除绑定事件
        if(target.attachEvent){
            target.detachEvent('on'+eventName,fn);
        }else{
            target.removeEventListener(eventName,fn,false);
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
    _isIdCard:function(code){ // 判断字符串或数字的值是否为国内身份证号码
        code = code+'';
        let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        let tip = "";
        let pass = true;
 
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }
 
        if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        if (code.length == 18) {
            let sBirthday = code.substr(6, 4) + "-" + Number(code.substr(10, 2)) + "-" + Number(code.substr(12, 2));
            let d = new Date(sBirthday.replace(/-/g, "/"))
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
                //alert("非法生日");
                pass = false;
            }
        }
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            let last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
 
        }
        return pass;
    },
    _isPhone:function(val){ // 判断字符串或数字的值是否为国内手机号码
        return /^1\d{10}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
    },
    _isEmpty:function(val){ // 判断字符串的值是否为空
        if(val===null || val===undefined)return true;
        return (val+'').replace(/\s+/g, '')==='';
    },
    _isMail:function(val){ // 判断字符串的值是否为邮箱
        return /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
    },
    _isNumber:function(val){ // 判断字符串的值是否为数字
        return (Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, '')) || Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''))===0)?true:false;
    }
};