function ___constructor_MovingScroll(obj){                          //滚动条插件
    this.boxStr=obj.box;
    this.contentBoxStr=obj.contentBox;
    this.scrollSBoxtr=obj.scrollBox;
    this.id=parseInt(Math.random()*100000000);

    this.box=_(obj.box, 0);
    this.contentBox=_(obj.contentBox, 0);
    this.scrollBox=_(obj.scrollBox, 0);
    this.speed=obj.speed || 150;
    this.navigation=obj.navigation || null;

    this._m_todo();
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

___constructor_MovingScroll.prototype._m_todo=function(){
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
    }.bind(this));

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

    if(this.navigation)this.setNav(this.navigation);
};

___constructor_MovingScroll.prototype.setNav=function(Navigation){  // 可以手动修改锚记导航设置
    Navigation=Navigation || null;
    if(_isArray(Navigation) && Navigation.length>0){  // 锚记导航, 根据需要添加该选项
        this.navigation=Navigation;
        for(var i=0; i<Navigation.length; i++){
            (function(a){
                _(Navigation[a].clickSelector, 0).BD('click', function(){
                    _stopPropagation(event);
                    var h_content=this._m_h_content();
                    var h_box=this._m_h_box();
                    if(h_content<h_box)return;
                    var mark=_(Navigation[a].targetSelector, 0).el.offsetTop>(h_content-h_box)?-(h_content-h_box):-(_(Navigation[a].targetSelector, 0).el.offsetTop);
                    this.contentBox.transition('.5s ease-out').css({top:mark+'px'});
                    this.scrollBox.transition('.5s ease-out').css({top:-(this._m_h_scroll()*mark/h_box)+'px'});
                }.bind(this)).BD('mouseup', function(){
                    _stopPropagation(event);
                }).BD('mousedown', function(){
                    _stopPropagation(event);
                });
            }.bind(this))(i);
        };
    }else{
        throw '参数错误: _MovingScroll().setNav(arg)的参数arg必须是一个长度大于0的数组!'
    };
};

___constructor_MovingScroll.prototype.adaptive=function(ms, condition){
    if(condition!==undefined && !condition){
        if(window['UM_MS_watchEl_'+this.id]){
            clearTimeout(window['UM_MS_watchEl_'+this.id]);
            delete window['UM_MS_watchEl_'+this.id];
        }
    }else{
        if(window['UM_MS_watchEl_'+this.id])clearTimeout(window['UM_MS_watchEl_'+this.id]);
        window['UM_MS_watchEl_'+this.id]=setTimeout(function() {
            var top_contentBox=parseFloat(this.contentBox.getStyle('top'));
            var h_scroll=this._m_h_scroll();
            var top_scrollBox=-(h_scroll*top_contentBox/this._m_h_box());
            this.scrollBox.transition('.5s ease-out').css({'height':h_scroll+'px', 'top':top_scrollBox+'px'});
            delete window['UM_MS_watchEl_'+this.id];
        }.bind(this), ms);
    };
};

function _MovingScroll(obj){
    return new ___constructor_MovingScroll(obj);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function ___constructor_PullDown(obj){             //下拉内容过渡插件-构造函数
    this.captionStr=obj.caption;
    this.downStr=obj.down;
    this.id='UM_PullDown_'+Math.ceil(Math.random()*100000000);

    this.caption=_(obj.caption, 0);
    this.down=_(obj.down, 0);
    this.speed=obj.speed && (obj.speed<.5 || obj.speed==.5)?obj.speed:.5;
    this.select=obj.select  || false;
    this.D_click=obj.D_click || false;
    this.choosable=obj.choosable || false;
    this.root=obj.root || null;
    this.maxHeight=obj.maxHeight || null;
    this.scrollClassName=obj.scrollClassName || 'UM_PullDown_scrollClassName';

    this.top_p=0;
    this.bottom_p=0;

    this.downHidden=true; // 用于判断执行一些特定事件时是否要隐藏下拉框
    this.selectHidden=false; // 用于判断点击下拉框背景时是否要折叠下拉框

    this.now=obj.now || false;
    this.MSobj=null;

    this._m_todo();
};

___constructor_PullDown.prototype._m_todo=function(){
    this.top_p=(function(){
        return this.down.getStyle('paddingTop');
    }.bind(this))();
    this.bottom_p=(function(){
        return this.down.getStyle('paddingBottom');
    }.bind(this))();

    this.down.css({overflow:'hidden', maxHeight:this.maxHeight?this.maxHeight:'none'}).BD('click', function(){
        _stopPropagation(event);
        this.downHidden=true;
        if(!this.selectHidden)return;
        this.selectHidden=false;

        this.down.css({height:this.down.getStyle('height')}, function(){
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }.bind(this));
    }.bind(this)).BD('mousedown', function(){
        _stopPropagation(event);
        this.downHidden=false;
    }.bind(this));

    if(this.maxHeight){
        var dom_content=document.createElement('div'), dom_scroll=document.createElement('div');
        while(this.down.el.children.length>0){
            dom_content.appendChild(this.down.el.children[0]);
        };
        dom_content.id=this.id+'_content';
        dom_content.style.width='calc(100% - 2px)';
        dom_content.style.position='relative';
        dom_content.style.top='0';
        dom_content.style.left='0';
        dom_content.style.zIndex='5';
        dom_content.style.border='1px solid transparent'; // 防止滚动条插件的内容盒子里面的选项元素含有margin-top或者margin-bottom选项时内容盒子高度不包括第一个选项元素的margin-top和最后一个选项元素的margin-bottom

        dom_scroll.id=this.id+'_scroll';
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
            for(var i=0; i<_('#'+this.id+'_content', 0).el.children.length; i++){
                if(_('#'+this.id+'_content', 0).el.children[i].getAttribute('isUmCaption')!=='on')_(_('#'+this.id+'_content', 0).el.children[i]).BD('click', function(){
                    this.selectHidden=true;
                    if(this.root && this.root.maxHeight)this.root.MSobj.adaptive(500);
                }.bind(this));
            };
        }
        this.MSobj=_MovingScroll({  // 滚动条插件
            box:this.downStr,　　//　容器盒子选择器
            contentBox:'#'+this.id+'_content',　　//　滚动内容盒子选择器
            scrollBox:'#'+this.id+'_scroll',　　//　滚动条盒子选择器
            speed:100
        });
    }

    if(this.now===true){  // 设置初始状态为显示时的下拉框体样式
        this.down.css({opacity:1, height:'auto'});
    }else if(this.now===false){  // 设置初始状态为隐藏时的下拉框体样式
        this.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
    }
    this.caption.css({cursor:'pointer'});  // 设置标题的cursor样式

    this.caption.BD('click', function(){
        // 尼玛, user-select属性有bug, 如果直接设置this.caption的user-select:none, 那么当页面刚刷新且还没有对this.caption元素进行任何事件时的情况下直接this.caption进行事件处理, 那么页面上的有些元素将不能正常地进行动画过渡(chrome), 这个bug查了好久, 特此标注, 2019-10-16 00:41:00
        // 由于以上原因, 这里给this.caption注册一个一次性事件, 通过这个事件来设置this.caption的user-select属性
        if(this.choosable===false)this.caption.choosable(false);  // 标题字体内容是否可被选中
    }.bind(this), {once:true}).BD('click', function(){
        _stopPropagation(event);
        this.downHidden=true;
        if(this.MSobj && !this.now){
            this.MSobj.adaptive(500);  // 自适应滚动条高度
        }else if(this.MSobj){
            this.MSobj.adaptive(500, false);  // 清除.adaptive()方法内部的定时器
        }
        if(this.root && this.root.maxHeight)this.root.MSobj.adaptive(500);  // 嵌套插件点击caption时, 自适应根插件滚动条高度

        this.down.css({height:this.down.getStyle('height')}, function(){
            if(window[this.id+'_mainCaption'])clearTimeout(window[this.id+'_mainCaption']);
            if(this.now===false){
                this.now=true;
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p}, function(){
                    window[this.id+'_mainCaption']=setTimeout(function(){
                        if(document.querySelector(this.downStr) && this.now)this.down.css({height:'auto'});
                    }.bind(this), this.speed*1000);
                }.bind(this));
            }else{
                this.now=false;
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            };
        }.bind(this));
    }.bind(this)).BD('mouseup', function(){
        if(this.root)this.root.downHidden=true;
    }.bind(this));

    if(!this.root && this.D_click===false)_(document).BD('click', function(){  // 当点击背景时, 折叠下拉框
        if(document.querySelector(this.downStr) && this.now){
            if(!this.downHidden){
                this.downHidden=true;
                return;
            }
            this.down.css({height:this.down.getStyle('height')}, function(){  // 为了使动画正常过渡, 需要设置height(当height的值为auto时, 改变height值不会显示动效)
                this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                this.now=false;
            }.bind(this));
        }
    }.bind(this));

    if(this.select===false && !this.maxHeight){  // 当点击选项时, 折叠下拉框
        for(var i=0; i<this.down.el.children.length; i++){
            if(this.down.el.children[i].getAttribute('isUmCaption')!=='on')_(this.down.el.children[i]).BD('click', function(){
                this.selectHidden=true;
                if(this.root && this.root.maxHeight)this.root.MSobj.adaptive(500);
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
        for(var i=0; i<_('#'+this.id+'_content', 0).el.children.length; i++){
            result=result+_('#'+this.id+'_content', 0).el.children[i].offsetHeight+this._m_getStyleInf(_('#'+this.id+'_content', 0).el.children[i], 'marginTop')+this._m_getStyleInf(_('#'+this.id+'_content', 0).el.children[i], 'marginBottom')+this._m_getStyleInf(_('#'+this.id+'_content', 0).el.children[i], 'paddingTop')+this._m_getStyleInf(_('#'+this.id+'_content', 0).el.children[i], 'paddingBottom');
        };
    }else{
        for(var i=0; i<this.down.el.children.length; i++){
            result=result+this.down.el.children[i].offsetHeight+this._m_getStyleInf(this.down.el.children[i], 'marginTop')+this._m_getStyleInf(this.down.el.children[i], 'marginBottom')+this._m_getStyleInf(this.down.el.children[i], 'paddingTop')+this._m_getStyleInf(this.down.el.children[i], 'paddingBottom');
        };
    };
    return result+'px';
};

___constructor_PullDown.prototype.unfold=function(){
    if(document.querySelector(this.downStr) && !this.now){
        if(this.MSobj)this.MSobj.adaptive(500);  // 自适应滚动条高度
        if(this.root && this.root.now && this.root.maxHeight){  // 自适应根插件滚动条高度
            this.root.MSobj.adaptive(500);
        }
        this.down.css({height:this.down.getStyle('height')}, function(){
            if(window[this.id+'_outButton'])clearTimeout(window[this.id+'_outButton']);
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p});
            this.now=true;
            window[this.id+'_outButton']=setTimeout(function(){
                this.down.css({height:'auto'});
            }.bind(this), this.speed*1000);
        }.bind(this));
    }
};

___constructor_PullDown.prototype.fold=function(){
    if(document.querySelector(this.downStr) && this.now){
        if(this.MSobj)this.MSobj.adaptive(500, false);  // 清除.adaptive()方法内部的定时器
        if(this.root && this.root.now && this.root.maxHeight){  // 自适应根插件滚动条高度
            this.root.MSobj.adaptive(500);
        }
        this.down.css({height:this.down.getStyle('height')}, function(){
            this.down.transition(this.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }.bind(this));
    }
};

function _PullDown(obj){             //下拉内容过渡插件
    return new ___constructor_PullDown(obj);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullLeft(obj){                           //左拉内容过渡插件
    var UM_PullLeft={
        caption:obj.caption,
        left:obj.left,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || true,
        choosable:obj.choosable || false,
        getStyleInf:function(dom, typeName){
            if(window.getComputedStyle){
                return parseInt(getComputedStyle(dom,false)[typeName]);
            }else{
                return parseInt(dom.currentStyle[typeName]);
            };
        },
        width:function(){
            var result=0;
            for(var i=0; i<UM_PullLeft.left.el.children.length; i++){
                result=result+UM_PullLeft.left.el.children[i].offsetWidth+UM_PullLeft.getStyleInf(UM_PullLeft.left.el.children[i], 'marginLeft')+UM_PullLeft.getStyleInf(UM_PullLeft.left.el.children[i], 'marginRight');
            };
            return result+'px';
        },
        padding_left:function(){
            return this.left.getStyle('paddingLeft');
        },
        padding_right:function(){
            return this.left.getStyle('paddingRight');
        },
        margin_left:function(){
            return this.left.getStyle('marginLeft');
        },
        margin_right:function(){
            return this.left.getStyle('marginRight');
        }
    };
    var left_p=UM_PullLeft.padding_left();
    var right_p=UM_PullLeft.padding_right();
    var left_m=UM_PullLeft.margin_left();
    var right_m=UM_PullLeft.margin_right();
    if(UM_PullLeft.now===true)UM_PullLeft.left.css({opacity:1, width:UM_PullLeft.width(), overflow:'hidden'});
    if(UM_PullLeft.now===false)UM_PullLeft.left.css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0, overflow:'hidden'});
    if(UM_PullLeft.choosable===false)UM_PullLeft.caption.choosable(false);
    UM_PullLeft.caption.css({cursor:'pointer'});
    UM_PullLeft.caption.BD('click', function(event){
        _stopPropagation(event);
        if(UM_PullLeft.now===false){
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s linear').transformOrigin('LEFT CENTER').css({opacity:1, width:UM_PullLeft.width(), paddingLeft:left_p, paddingRight:right_p, marginLeft:left_m, marginRight:right_m});
        }else{
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s linear').transformOrigin('LEFT CENTER').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
        };
        UM_PullLeft.now=!UM_PullLeft.now;
    });
    if(UM_PullLeft.D_click===true){
        _(document).BD('click', function(){
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s linear').transformOrigin('LEFT CENTER').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            UM_PullLeft.now=false;
        });
    }
    if(UM_PullLeft.select===true){
        UM_PullLeft.left.BD('click', function(event){
            _stopPropagation(event);
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s linear').transformOrigin('LEFT CENTER').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            UM_PullLeft.now=false;
        });
    }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _Drag(obj){                        //拖拽插件
    var UM_Drag={
        mousedownBox:obj.mousedownBox,
        dragBox:obj.dragBox || obj.mousedownBox,
        axis:obj.axis || false
    };

    UM_Drag.dragBox.choosable();

    var _parent=UM_Drag.dragBox.el.offsetParent;

    if(UM_Drag.axis && UM_Drag.axis=='x'){
        UM_Drag.mousedownBox.BD('mousedown', function(event){
            _stopPropagation(event);
            var Drag_S_left=_scrollDistance().x+event.clientX-UM_Drag.dragBox.el.offsetLeft;

            var _mousemove=function(event){
                _preventDefault(event);
                var Drag_left=_scrollDistance().x+event.clientX-Drag_S_left;
                if(Drag_left<0){
                    Drag_left=0;
                }else if(Drag_left>(_parent.offsetWidth-UM_Drag.dragBox.el.offsetWidth)){
                    Drag_left=_parent.offsetWidth-UM_Drag.dragBox.el.offsetWidth;
                }
                UM_Drag.dragBox.el.style.left=Drag_left+'px';
            };

            var _mouseup=function(){
                _(document).unBD('mousemove', _mousemove).unBD('mouseup', _mouseup);
            };

            _(document).BD('mousemove', _mousemove);
            _(document).BD('mouseup', _mouseup);
        });
    }else if(UM_Drag.axis && UM_Drag.axis=='y'){
        UM_Drag.mousedownBox.BD('mousedown', function(event){
            _stopPropagation(event);
            var Drag_S_top=_scrollDistance().y+event.clientY-UM_Drag.dragBox.el.offsetTop;

            var _mousemove=function(event){
                _preventDefault(event);
                var Drag_top=_scrollDistance().y+event.clientY-Drag_S_top;
                if(Drag_top<0){
                    Drag_top=0;
                }else if(Drag_top>(_parent.offsetHeight-UM_Drag.dragBox.el.offsetHeight)){
                    Drag_top=_parent.offsetHeight-UM_Drag.dragBox.el.offsetHeight;
                }
                UM_Drag.dragBox.el.style.top=Drag_top+'px';
            };

            var _mouseup=function(){
                _(document).unBD('mousemove', _mousemove).unBD('mouseup', _mouseup);
            };

            _(document).BD('mousemove', _mousemove);
            _(document).BD('mouseup', _mouseup);
        });
    }else{
        UM_Drag.mousedownBox.BD('mousedown', function(event){
            _stopPropagation(event);
            var Drag_S_left=_scrollDistance().x+event.clientX-UM_Drag.dragBox.el.offsetLeft;
            var Drag_S_top=_scrollDistance().y+event.clientY-UM_Drag.dragBox.el.offsetTop;

            var _mousemove=function(event){
                _preventDefault(event);
                var Drag_left=_scrollDistance().x+event.clientX-Drag_S_left;
                var Drag_top=_scrollDistance().y+event.clientY-Drag_S_top;
                if(Drag_left<0){
                    Drag_left=0;
                }else if(Drag_left>(_parent.offsetWidth-UM_Drag.dragBox.el.offsetWidth)){
                    Drag_left=_parent.offsetWidth-UM_Drag.dragBox.el.offsetWidth;
                }
                if(Drag_top<0){
                    Drag_top=0;
                }else if(Drag_top>(_parent.offsetHeight-UM_Drag.dragBox.el.offsetHeight)){
                    Drag_top=_parent.offsetHeight-UM_Drag.dragBox.el.offsetHeight;
                }
                UM_Drag.dragBox.el.style.left=Drag_left+'px';
                UM_Drag.dragBox.el.style.top=Drag_top+'px';
            };

            var _mouseup=function(){
                _(document).unBD('mousemove', _mousemove).unBD('mouseup', _mouseup);
            };

            _(document).BD('mousemove', _mousemove);
            _(document).BD('mouseup', _mouseup);
        });
    };
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _showInputImg(json){                       //显示文本域表单所选择的图片到指定的元素上
    var UM_ShowInputImg={
        frame:json.frame,
        imgBox:json.imgBox,
        isNotImg:json.isNotImg || null
    };

    var _str=''+Math.random();
    _str=_str.split('.')[1];
    var UM_ShowInputImg_className='custom_UM_showInputImg_classname_'+_str;
    var _castom=true;
    var _timerName='timer_'+UM_ShowInputImg_className;

    UM_ShowInputImg.frame.BD('change', function(){
        UM_ShowInputImg.imgBox.el.innerHTML='';
        var file=UM_ShowInputImg.frame.el.files;
        if(!file[0])return;
        var imgObj=new Image();
        imgObj.className=UM_ShowInputImg_className;
        if(!_isImg(UM_ShowInputImg.frame.el)){      //判断所选文件是否为图片文件
            if(UM_ShowInputImg.isNotImg){
                UM_ShowInputImg.isNotImg();
            }
            return;
        };
        var UM_ShowInputImg_url=null;
        if(window.createObjectURL!=undefined){
            UM_ShowInputImg_url=window.createObjectURL(file[0]);          //basic
        }else if(window.URL!=undefined){
            UM_ShowInputImg_url=window.URL.createObjectURL(file[0]);      //firefox
        }else if(window.webkitURL!=undefined){
            UM_ShowInputImg_url=window.webkitURL.createObjectURL(file[0]);   //chrome
        }
        imgObj.src=UM_ShowInputImg_url;

        imgObj.onload=function(){
            UM_ShowInputImg.imgBox.el.appendChild(imgObj);
            if(_ifDom('.'+UM_ShowInputImg_className)){
                _('.'+UM_ShowInputImg_className, 0).transition('.2s ease').css({opacity:0});
                _('.'+UM_ShowInputImg_className, 0).center();
                var w=_('.'+UM_ShowInputImg_className, 0).el.offsetWidth;
                var h=_('.'+UM_ShowInputImg_className, 0).el.offsetHeight;
                if(parseInt(UM_ShowInputImg.imgBox.getStyle('width'))/parseInt(UM_ShowInputImg.imgBox.getStyle('height'))<w/h){
                    _('.'+UM_ShowInputImg_className, 0).css({width:parseInt(UM_ShowInputImg.imgBox.getStyle('width'))*.98+'px', height:parseInt(UM_ShowInputImg.imgBox.getStyle('width'))*.98*h/w+'px', opacity:1});
                }else if(parseInt(UM_ShowInputImg.imgBox.getStyle('width'))/parseInt(UM_ShowInputImg.imgBox.getStyle('height'))>=w/h){
                    _('.'+UM_ShowInputImg_className, 0).css({width:parseInt(UM_ShowInputImg.imgBox.getStyle('height'))*.98*w/h+'px', height:parseInt(UM_ShowInputImg.imgBox.getStyle('height'))*.98+'px', opacity:1});
                }
            }

            _(window).BD('resize', function(){
                if(window[_timerName])clearTimeout(window[_timerName]);
                window[_timerName]=setTimeout(function(){
                    if(_ifDom('.'+UM_ShowInputImg_className)){
                        _('.'+UM_ShowInputImg_className, 0).center();
                        var w=_('.'+UM_ShowInputImg_className, 0).el.offsetWidth;
                        var h=_('.'+UM_ShowInputImg_className, 0).el.offsetHeight;
                        if(parseInt(UM_ShowInputImg.imgBox.getStyle('width'))/parseInt(UM_ShowInputImg.imgBox.getStyle('height'))<w/h){
                            _('.'+UM_ShowInputImg_className, 0).css({width:parseInt(UM_ShowInputImg.imgBox.getStyle('width'))*.98+'px', height:parseInt(UM_ShowInputImg.imgBox.getStyle('width'))*.98*h/w+'px', opacity:1});
                        }else if(parseInt(UM_ShowInputImg.imgBox.getStyle('width'))/parseInt(UM_ShowInputImg.imgBox.getStyle('height'))>=w/h){
                            _('.'+UM_ShowInputImg_className, 0).css({width:parseInt(UM_ShowInputImg.imgBox.getStyle('height'))*.98*w/h+'px', height:parseInt(UM_ShowInputImg.imgBox.getStyle('height'))*.98+'px', opacity:1});
                        }
                        if(window[_timerName])window[_timerName]=null;
                    }
                }, 500);
            });
        };
    });
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _showingImg(_selector, url){                       //按比例显示图片
    var UM_showingImg_um=_selector;
    var UM_showingImg_dom=_selector.el;
    var UM_showingImg_str=''+Math.random();
    UM_showingImg_str=UM_showingImg_str.split('.')[1];
    var UM_showingImg_name_class='custom_UM_showingImg_classname_'+UM_showingImg_str;
    var _timerName_interval='timerInterval_'+UM_showingImg_name_class;
    var _timerName='timer_'+UM_showingImg_name_class;
    UM_showingImg_um.css({overflow:'hidden'});
    UM_showingImg_dom.innerHTML='';
    var imgObj=new Image();
    imgObj.className=UM_showingImg_name_class;
    imgObj.src=url;
    imgObj.onload=function(){
        UM_showingImg_dom.appendChild(imgObj);
        window[_timerName_interval]=setInterval(function(){
            if(_ifDom('.'+UM_showingImg_name_class)){
                _('.'+UM_showingImg_name_class, 0).transition('none').css({opacity:0}).center();
                var UM_showingImg_w=_('.'+UM_showingImg_name_class, 0).el.offsetWidth;
                var UM_showingImg_h=_('.'+UM_showingImg_name_class, 0).el.offsetHeight;
                if(UM_showingImg_w>0){
                    if(parseInt(UM_showingImg_um.getStyle('width'))/parseInt(UM_showingImg_um.getStyle('height'))<UM_showingImg_w/UM_showingImg_h){
                        _('.'+UM_showingImg_name_class, 0).transition('.2s ease').css({width:parseInt(UM_showingImg_um.getStyle('width'))*.98+'px', height:parseInt(UM_showingImg_um.getStyle('width'))*.98*UM_showingImg_h/UM_showingImg_w+'px', opacity:1});
                    }else if(parseInt(UM_showingImg_um.getStyle('width'))/parseInt(UM_showingImg_um.getStyle('height'))>=UM_showingImg_w/UM_showingImg_h){
                        _('.'+UM_showingImg_name_class, 0).transition('.2s ease').css({width:parseInt(UM_showingImg_um.getStyle('height'))*.98*UM_showingImg_w/UM_showingImg_h+'px', height:parseInt(UM_showingImg_um.getStyle('height'))*.98+'px', opacity:1});
                    }
                    clearInterval(window[_timerName_interval]);
                    delete window[_timerName_interval];
                }
            }
        });

        _(window).BD('resize', function(){
            if(window[_timerName])clearTimeout(window[_timerName]);
            window[_timerName]=setTimeout(function(){
                if(_ifDom('.'+UM_showingImg_name_class)){
                    _('.'+UM_showingImg_name_class, 0).center();
                    var UM_showingImg_w=_('.'+UM_showingImg_name_class, 0).el.offsetWidth;
                    var UM_showingImg_h=_('.'+UM_showingImg_name_class, 0).el.offsetHeight;
                    if(parseInt(UM_showingImg_um.getStyle('width'))/parseInt(UM_showingImg_um.getStyle('height'))<UM_showingImg_w/UM_showingImg_h){
                        _('.'+UM_showingImg_name_class, 0).css({width:parseInt(UM_showingImg_um.getStyle('width'))*.98+'px', height:parseInt(UM_showingImg_um.getStyle('width'))*.98*UM_showingImg_h/UM_showingImg_w+'px', opacity:1});
                    }else if(parseInt(UM_showingImg_um.getStyle('width'))/parseInt(UM_showingImg_um.getStyle('height'))>=UM_showingImg_w/UM_showingImg_h){
                        _('.'+UM_showingImg_name_class, 0).css({width:parseInt(UM_showingImg_um.getStyle('height'))*.98*UM_showingImg_w/UM_showingImg_h+'px', height:parseInt(UM_showingImg_um.getStyle('height'))*.98+'px', opacity:1});
                    }
                    delete window[_timerName];
                }
            }, 500);
        });
    };
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _clickCopy(entry, target, method){      // 通过点击拷贝一个元素内的内容
    var _target=target || entry, _method=method || 'textContent';
    if(_method!='textContent' && _method!='innerHTML' && _method!='outerHTML')_method='textContent';
    _(entry, 0).BD('click', function(){
        document.execCommand('copy');
    }).BD('copy', function(event){
        if(_isIE()){
            if(window.clipboardData)window.clipboardData.setData("Text", _(_target, 0).el[_method].replace(/\s+/g, ' '));
        }else{
            event.preventDefault();
            if(event.clipboardData)event.clipboardData.setData("text/plain", _(_target, 0).el[_method].replace(/\s+/g, ' '));
        };
    });
};