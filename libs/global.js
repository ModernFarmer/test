export default {
    PUBLICDATA:{}, // -------------------> 公用数据对象
    CACHE:{ // -------------------> 缓存对象
        self: window.localStorage, // 获取当前所有缓存
        get(name) { // 读取指定缓存
            try {
                return JSON.parse(window.localStorage.getItem(name));
            } catch {
                return window.localStorage.getItem(name);
            }
        },
        set(name, item) { // 设置指定缓存
            if (typeof item === 'string') {
                window.localStorage.setItem(name, item);
            } else if (_isJson(item) || _isArray(item)) {
                window.localStorage.setItem(name, JSON.stringify(item));
            } else {
                throw new Error('CACHE.set()方法的第二个参数的类型只能是 string、json 或者 array !');
            }
        },
        remove(name) { // 移除指定缓存
            window.localStorage.removeItem(name);
        },
    },
    _isJson:function(obj){
        return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
    },
    _isArray:function(obj){
        if (!Array.isArray) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        return Array.isArray(obj);
    },
    _dom:function(str){ // 根据str字符串获取dom, ellint中,直接使用h5标签上的id获取dom会报错, 故全局添加_dom方法
        if(/^[\.\#]/.test(str)){
            return document.querySelector(str);
        }else{
            return document.querySelector(`#${str}`);
        };
    },
    _preventDefault:function(event){
        if(document.all){
            window.event.returnValue=false;
        }else{
            event.preventDefault();
        };
    },
    _stopPropagation:function(event){
        if(event.cancelBubble){
            event.cancelBubble=true;
        }else {
            event.stopPropagation();
        };
    },
    _BD:function(target, eventName, fn){      // 给指定元素绑定事件
        if(target.addEventListener){
            target.addEventListener(eventName, fn, false);
        }else if(target.attachEvent){
            target.attachEvent('on'+eventName,fn);
        }else{
            target['on'+eventName]=fn;
        };
    },
    _unBD:function(target, eventName, fn){      // 给指定元素解除绑定事件
        if(target.attachEvent){
            target.detachEvent('on'+eventName,fn);
        }else{
            target.removeEventListener(eventName,fn,false);
        };
    },
    _getStyle:function(dom, styleName){
        if(!dom.length){
            if(window.getComputedStyle){
                return getComputedStyle(dom,false)[styleName];
            }else{
                return dom.currentStyle[styleName];
            };
        }else{
            console.error('_getStyle()方法只能获取 一个 dom元素的计算后的样式值');
        };
    }
}