function ___constructor_MovingScroll(obj){                          //滚动条插件
    this.id=parseInt(Math.random()*100000000);

    this.box=obj.box;
    this.contentBox=obj.contentBox;
    this.scrollBox=obj.scrollBox;
    this.speed=obj.speed || 150;
    this.position=obj.position || null;
    this.watch_keyup=obj.watch_keyup || false;
    this.watch_mouseup=obj.watch_mouseup || false;
    this.watch_el=obj.watch_el || false;

    this.todo();
};

___constructor_MovingScroll.prototype._m_h_box=function(){
    return this.box.el.offsetHeight-parseInt(this.box.getStyle('borderTopWidth'))-parseInt(this.box.getStyle('borderBottomWidth'));
};

___constructor_MovingScroll.prototype._m_h_content=function(){
    return this.contentBox.el.offsetHeight+parseInt(this.box.getStyle('paddingTop'))+parseInt(this.box.getStyle('paddingBottom'));
};

___constructor_MovingScroll.prototype._m_h_scroll=function(){
    var h_box=this._m_h_box();
    var h_content=this._m_h_content();
    return h_content<=h_box?0:h_box*h_box/h_content;
};

___constructor_MovingScroll.prototype.todo=function(){
    this.contentBox.transition('.5s ease-out');
    setTimeout(function(){
        this.scrollBox.transition('.5s ease-out').css({'height':this._m_h_scroll()+'px', 'cursor':'pointer'});       //初始化滚动条高度，必要时需要加定时器
    }.bind(this),500);
    this.box.css({overflow:'hidden'}).mousewheel(function(){
        var _top=parseFloat(this.contentBox.getStyle('top'));
        if(_top==0)return;
        var h_content=this._m_h_content();
        var h_box=this._m_h_box();
        if(h_content<h_box)return;
        var h_scroll=this._m_h_scroll();
        var top_contentBox=_top + this.speed;
        if(top_contentBox>0)top_contentBox=0;
        this.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
        var top_scrollBox=-(h_scroll*top_contentBox/h_box);
        this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
    }.bind(this), function(){
        var _top=parseFloat(this.contentBox.getStyle('top'));
        var h_content=this._m_h_content();
        var h_box=this._m_h_box();
        if(_top==-(h_content-h_box))return;
        if(h_content<h_box)return;
        var h_scroll=this._m_h_scroll();
        var top_contentBox=_top - this.speed;
        if(top_contentBox<-(h_content-h_box))top_contentBox=-(h_content-h_box);
        this.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
        var top_scrollBox=-(h_scroll*top_contentBox/h_box);
        this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
    }.bind(this));

    this.box.BD('mouseenter', function(){
        this.scrollBox.transition('1s ease-out').css({opacity:1});
    }.bind(this)).BD('mouseleave', function(){
        this.scrollBox.transition('1s ease-out').css({opacity:.4});
    }.bind(this)).BD('mousedown', function(){                                    //默认当点击容器盒子时，执行滚动条盒子的高度自动变化
        if(window['UM_MS_default_'+this.id])clearTimeout(window['UM_MS_default_'+this.id]);
        window['UM_MS_default_'+this.id]=setTimeout(function(){
            var top_contentBox=parseFloat(this.contentBox.getStyle('top'));
            var h_scroll=this._m_h_scroll();
            var top_scrollBox=-(h_scroll*top_contentBox/this._m_h_box());
            this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
            delete window['UM_MS_default_'+this.id];
        }.bind(this), 500);
    }.bind(this));

    if(this.watch_keyup===true){                  //当页面上按键抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('keyup', function(){
            if(!this.contentBox.el)return;
            if(window['UM_MS_keyup_'+this.id])clearTimeout(window['UM_MS_keyup_'+this.id]);
            window['UM_MS_keyup_'+this.id]=setTimeout(function(){
                var top_contentBox=parseFloat(this.contentBox.getStyle('top'));
                var h_scroll=this._m_h_scroll();
                var top_scrollBox=-(h_scroll*top_contentBox/this._m_h_box());
                this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
                delete window['UM_MS_keyup_'+this.id];
            }.bind(this), 500);
        }.bind(this));
    }

    if(this.watch_mouseup===true){                  //当页面上鼠标抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('mouseup', function(){
            if(!this.contentBox.el)return;
            if(window['UM_MS_mouseup_'+this.id])clearTimeout(window['UM_MS_mouseup_'+this.id]);
            window['UM_MS_mouseup_'+this.id]=setTimeout(function() {
                var top_contentBox=parseFloat(this.contentBox.getStyle('top'));
                var h_scroll=this._m_h_scroll();
                var top_scrollBox=-(h_scroll*top_contentBox/this._m_h_box());
                this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
                delete window['UM_MS_mouseup_'+this.id];
            }.bind(this), 500);
        }.bind(this));
    }

    this.scrollBox.BD('click', function(){
        _stopPropagation(event);
    }.bind(this)).BD('mousedown', function(event){
        _stopPropagation(event);
        _preventDefault(event);
        var cursor_original=_scrollDistance().y+event.clientY;
        var L=cursor_original-parseFloat(this.scrollBox.getStyle('top'));
        var ___runner=function(event){
            var cursor=_scrollDistance().y+event.clientY;
            var s=cursor-L;
            var h_box=this._m_h_box();
            var h_scroll=this._m_h_scroll();
            var top_scroll_now=parseFloat(this.scrollBox.getStyle('top'));
            if((top_scroll_now==0 && s<0) || (top_scroll_now==Math.round((h_box-h_scroll)*1000)/1000 && s>h_box-h_scroll))return;
            if(s<0)s=0;
            if(s>h_box-h_scroll)s=h_box-h_scroll;
            var S=-(h_box*s/h_scroll);
            this.scrollBox.transition('').css({top:s+'px'});
            this.contentBox.transition('').css({top:S+'px'});
        }.bind(this);
        var ___stopRun=function(){
            _(document).unBD('mousemove', ___runner).unBD('mouseup', ___stopRun);
        }.bind(this);
        _(document).BD('mousemove', ___runner);
        _(document).BD('mouseup', ___stopRun);
    }.bind(this));

    if(_isArray(this.position) && this.position.length>0){  // 锚记导航, 根据需要添加该选项
        for(var i=0; i<this.position.length; i++){
            (function(a){
                this.position[a].clickObj.BD('click', function(){
                    _stopPropagation(event);
                    var h_content=this._m_h_content();
                    var h_box=this._m_h_box();
                    if(h_content<h_box)return;
                    var mark=this.position[a].targetObj.el.offsetTop>(h_content-h_box)?-(h_content-h_box):-(this.position[a].targetObj.el.offsetTop);
                    console.log(mark)
                    console.log(-(this._m_h_scroll()*mark/h_box)+'px')
                    this.contentBox.transition('.5s ease-out').css({top:mark+'px'});
                    this.scrollBox.transition('.5s ease-out').css({top:-(this._m_h_scroll()*mark/h_box)+'px'});
                }.bind(this)).BD('mouseup', function(){
                    _stopPropagation(event);
                }).BD('mousedown', function(){
                    _stopPropagation(event);
                });
            }.bind(this))(i);
        };
    }
};

___constructor_MovingScroll.prototype.adaptive=function(ms){
    if(window['UM_MS_watchEl_'+this.id])clearTimeout(window['UM_MS_watchEl_'+this.id]);
    window['UM_MS_watchEl_'+this.id]=setTimeout(function() {
        var top_contentBox=parseFloat(this.contentBox.getStyle('top'));
        var h_scroll=this._m_h_scroll();
        var top_scrollBox=-(h_scroll*top_contentBox/this._m_h_box());
        this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
        delete window['UM_MS_watchEl_'+this.id];
    }.bind(this), ms);
};

function _MovingScroll(obj){
    return new ___constructor_MovingScroll(obj);
};


function ___constructor_PullDown(obj){             //下拉内容过渡插件-构造函数
    this.caption=obj.caption;
    this.down=obj.down;
    this.speed=obj.speed || .5;
    this.select=obj.select  || false;
    this.D_click=obj.D_click || false;
    this.choosable=obj.choosable || false;
    this.within=obj.within || null;
    this.maxHeight=obj.maxHeight || null;
    this.scrollClassName=obj.scrollClassName || 'UM_PullDown_scrollClassName';

    this.downHidden=true; // 用于判断执行一些特定事件时是否要隐藏下拉框
    this.selectHidden=true; // 用于判断点击下拉框背景时是否要折叠下拉框

    this.id='UM_PullDown_'+Math.ceil(Math.random()*100000000);
    this.now=obj.now || false;
    this.MSobj=null;

    // this.down_arguments=

    this._m_todo();
};

___constructor_PullDown.prototype._m_todo=function(){
    this.top_p=(function(){
        return this.down.getStyle('paddingTop');
    }.bind(this))();
    this.bottom_p=(function(){
        return this.down.getStyle('paddingBottom');
    }.bind(this))();
    this.top_m=(function(){
        return this.down.getStyle('marginTop');
    }.bind(this))();
    this.bottom_m=(function(){
        return this.down.getStyle('marginBottom');
    }.bind(this))();

    this.down.css({overflow:'hidden', maxHeight:this.maxHeight?this.maxHeight:'none'}).BD('click', function(){
        _stopPropagation(event);
        this.downHidden=true;
        if(this.selectHidden)return;
        if(this.down.el.style.height!=='auto'){
            if(this.within)this.within.down.css({height:'auto'});
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }else{
            this.down.css({height:this.down.getStyle('height')});
            setTimeout(function(){
                if(this.within)this.within.down.css({height:'auto'});
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                this.now=false;
            }.bind(this));
        };
        this.selectHidden=true;
    }.bind(this)).BD('mousedown', function(){
        _stopPropagation(event);
        this.downHidden=false;
    }.bind(this));

    if(this.maxHeight){
        var _html=this.down.el.innerHTML;
        this.down.el.innerHTML='';
        var dom_content=document.createElement('div'), dom_scroll=document.createElement('div');
        dom_content.id=this.id;
        dom_content.innerHTML=_html;
        dom_content.style.width='calc(100% - 2px)';
        dom_content.style.position='relative';
        dom_content.style.top='0';
        dom_content.style.left='0';
        dom_content.style.zIndex='5';
        dom_content.style.border='1px solid transparent'; // 防止滚动条插件的内容盒子里面的选项元素含有margin-top或者margin-bottom选项时内容盒子高度不包括第一个选项元素的margin-top和最后一个选项元素的margin-bottom

        dom_scroll.style.height='0';
        dom_scroll.style.position='absolute';
        dom_scroll.style.top='0';
        dom_scroll.style.right='2px';
        dom_scroll.style.zIndex='10';
        dom_scroll.className=this.scrollClassName;
        _(dom_scroll).BD('mousedown', function(){
            _stopPropagation(event);
            this.downHidden=false;
        }.bind(this)).BD('mouseup', function(){
            this.downHidden=true;
        }.bind(this));

        this.down.el.appendChild(dom_content);
        this.down.el.appendChild(dom_scroll);
        if(this.select===false){
            for(var i=0; i<_('#'+this.id, 0).el.children.length; i++){
                if(_('#'+this.id, 0).el.children[i].getAttribute('isUmCaption')===null)_(_('#'+this.id, 0).el.children[i]).BD('click', function(){
                    this.selectHidden=false;
                }.bind(this));
            };
        }
        this.MSobj=_MovingScroll({  // 滚动条插件
            box:this.down,　　//　容器盒子选择器
            contentBox:_(dom_content),　　//　滚动内容盒子选择器
            scrollBox:_(dom_scroll),　　//　滚动条盒子选择器
            speed:100
        });
    }

    if(this.now===true){  // 设置初始状态为显示时的下拉框体样式
        this.down.css({opacity:1, height:this._m_height()});
    }else if(this.now===false){  // 设置初始状态为隐藏时的下拉框体样式
        this.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
    }
    if(this.choosable===false)this.caption.choosable(false);  // 标题字体内容是否可被选中
    this.caption.css({cursor:'pointer'});  // 设置标题的cursor样式

    this.caption.BD('click', function(){
        _stopPropagation(event);
        if(this.MSobj && this.now===false){
            this.MSobj.adaptive(500);  // 自适应滚动条高度
        }
        if(this.within && this.within.maxHeight){  // 嵌套插件点击caption时, 自适应滚动条高度
            this.within.MSobj.adaptive(500);
        }
        if(this.down.el.style.height!=='auto'){
            if(this.within)this.within.down.css({height:'auto'});
            if(this.now===false){
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
            }else{
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            };
            this.now=!this.now;
        }else{
            this.down.css({height:this.down.getStyle('height')});
            setTimeout(function(){
                if(this.within)this.within.down.css({height:'auto'});
                if(this.now===false){
                    this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
                }else{
                    this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                };
                this.now=!this.now;
            }.bind(this));
        };
    }.bind(this)).BD('mousedown', function(){
        // _stopPropagation(event);
    }.bind(this));

    if(!this.within && this.D_click===false)_(document).BD('click', function(){  // 当点击背景时, 折叠下拉框
        if(!this.downHidden){
            this.downHidden=true;
            return;
        }
        if(this.down.el.style.height==='auto')this.down.css({height:this.down.getStyle('height')});  // 为了使动画正常过渡, 需要设置height(当height的值为auto时, 改变height值不会显示动效)
        if(!this.within){
            setTimeout(function(){
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                this.now=false;
            }.bind(this));
        }
    }.bind(this));

    if(this.select===false && !this.maxHeight){  // 当点击选项时, 折叠下拉框
        for(var i=0; i<this.down.el.children.length; i++){
            if(this.down.el.children[i].getAttribute('isUmCaption')===null)_(this.down.el.children[i]).BD('click', function(){
                this.selectHidden=false;
            }.bind(this));
        };
    }
};

___constructor_PullDown.prototype._m_getStyleInf=function(dom, typeName){
    if(window.getComputedStyle){
        return parseFloat(getComputedStyle(dom,false)[typeName]);
    }else{
        return parseFloat(dom.currentStyle[typeName]);
    };
};

___constructor_PullDown.prototype._m_height=function(){
    var result=0;
    if(this.maxHeight){
        for(var i=0; i<_('#'+this.id, 0).el.children.length; i++){
            result=result+_('#'+this.id, 0).el.children[i].offsetHeight+this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginTop')+this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginBottom');
        };
    }else{
        for(var i=0; i<this.down.el.children.length; i++){
            result=result+this.down.el.children[i].offsetHeight+this._m_getStyleInf(this.down.el.children[i], 'marginTop')+this._m_getStyleInf(this.down.el.children[i], 'marginBottom');
        };
    };
    return result+'px';
};

___constructor_PullDown.prototype.unfold=function(){
    if(this.down.el.style.height!=='auto'){
        if(this.within && this.within.down.getStyle('opacity')!=0)this.within.down.css({height:'auto'});
        this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
        this.now=true;
    }else{
        this.down.css({height:this.down.getStyle('height')});
        setTimeout(function(){
            if(this.within && this.within.down.getStyle('opacity')!=0)this.within.down.css({height:'auto'});
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
            this.now=true;
        }.bind(this));
    };
};

___constructor_PullDown.prototype.fold=function(){
    if(this.down.el.style.height!=='auto'){
        if(this.within && this.within.down.getStyle('opacity')!=0)this.within.down.css({height:'auto'});
        this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        this.now=false;
    }else{
        this.down.css({height:this.down.getStyle('height')});
        setTimeout(function(){
            if(this.within && this.within.down.getStyle('opacity')!=0)this.within.down.css({height:'auto'});
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }.bind(this));
    };
};

function _PullDown(obj){             //下拉内容过渡插件
    return new ___constructor_PullDown(obj);
};