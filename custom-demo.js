function _MovingScroll(obj){                          //滚动条插件
    var UM_MovingScroll={
        box:obj.box,
        contentBox:obj.contentBox,
        scrollBox:obj.scrollBox,
        speed:obj.speed,
        position:obj.position || null,
        watch_keyup:obj.watch_keyup || false,
        watch_mouseup:obj.watch_mouseup || false,
        watch_el:obj.watch_el || false,
        height_box:function(){
            return parseInt(this.box.getStyle('height'));
        },
        height_content:function(){
            return parseInt(this.contentBox.el.offsetHeight);
        },
        height_scroll:function(){
            return this.height_content()<=this.height_box()?0:Math.ceil((this.height_box()/this.height_content())*this.height_box());
        }
    };

    UM_MovingScroll.contentBox.transition('.5s ease-out');
    setTimeout(function(){
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'cursor':'pointer'});       //初始化滚动条高度，必要时需要加定时器
    },500);
    UM_MovingScroll.box.mousewheel(function(){
        _stopPropagation(event);
        var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
        if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
        var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
    }, function(){
        _stopPropagation(event);
        var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) - UM_MovingScroll.speed;
        if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box()))top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
        if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
        var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
    });

    UM_MovingScroll.box.BD('mouseenter', function(){
        UM_MovingScroll.scrollBox.transition('1s ease-out').css({opacity:1});
    }).BD('mouseleave', function(){
        UM_MovingScroll.scrollBox.transition('1s ease-out').css({opacity:.3});
    }).BD('click', function(){                                    //默认当点击容器盒子时，执行滚动条盒子的高度自动变化
        setTimeout(function(){
            var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top'));
            if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                top_contentBox=0;
            }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
            }
            if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
            UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
            var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
            UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        }, 500);
    });

    if(UM_MovingScroll.watch_keyup===true){                  //当页面上按键抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('keyup', function(){
            setTimeout(function() {
                var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
                if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                    top_contentBox=0;
                }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                    top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
                }
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
                UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
                var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
            }, 500);
        });
    }
    if(UM_MovingScroll.watch_mouseup===true){                  //当页面上鼠标抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('mouseup', function(){
            setTimeout(function() {
                var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
                if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                    top_contentBox=0;
                }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                    top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
                }
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
                UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
                var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
            }, 500);
        });
    }
    if(UM_MovingScroll.watch_el){
        UM_MovingScroll.watch_el.el.BD('click', function(){
            setTimeout(function() {
                var top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
                if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                    top_contentBox=0;
                }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                    top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
                }
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
                UM_MovingScroll.contentBox.transition('.1s ease-out').css({top:top_contentBox+'px'});
                var top_scrollBox=-Math.ceil(top_contentBox / (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()) * (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()));
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
            }, UM_MovingScroll.watch_el.timeout);
        });
    }
    UM_MovingScroll.scrollBox.BD('mousedown', function(event){
        _stopPropagation(event);
        _preventDefault(event);
        var cursor_original=_scrollDistance().y+event.clientY;
        var L=cursor_original-parseInt(UM_MovingScroll.scrollBox.getStyle('top'));
        var ___runner=function(event){
            var cursor=_scrollDistance().y+event.clientY;
            var s=cursor-L;
            if(s<0)s=0;
            if(s>parseInt(UM_MovingScroll.box.getStyle('height'))-parseInt(UM_MovingScroll.scrollBox.getStyle('height')))s=parseInt(UM_MovingScroll.box.getStyle('height'))-parseInt(UM_MovingScroll.scrollBox.getStyle('height'));
            var S=-Math.floor(s / (UM_MovingScroll.height_box() - UM_MovingScroll.height_scroll()) * (UM_MovingScroll.height_content() - UM_MovingScroll.height_box()));
            UM_MovingScroll.scrollBox.transition('').css({top:s+'px'});
            UM_MovingScroll.contentBox.transition('').css({top:S+'px'});
        };
        var ___stopRun=function(){
            _(document).unBD('mousemove', ___runner).unBD('mouseup', ___stopRun);
        };
        _(document).BD('mousemove', ___runner);
        _(document).BD('mouseup', ___stopRun);
    });
    if(_isArray(UM_MovingScroll.position) && UM_MovingScroll.position.length>0){
        for(var i=0; i<UM_MovingScroll.position.length; i++){
            UM_MovingScroll.position[i].clickObj.el.setAttribute('UM_MovingScrollPlugIn', i);
            UM_MovingScroll.position[i].clickObj.BD('click', function(){
                var mark= UM_MovingScroll.position[this.getAttribute('UM_MovingScrollPlugIn')].targetObj.el.offsetTop>(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())?-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box()):-(UM_MovingScroll.position[this.getAttribute('UM_MovingScrollPlugIn')].targetObj.el.offsetTop);
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())mark=0;
                UM_MovingScroll.contentBox.transition('.5s ease-out').css({top:mark+'px'});
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css({top:Math.ceil(-mark*UM_MovingScroll.height_scroll()/UM_MovingScroll.height_box())+'px'});
            });
        };
    }
};




function ___constructor_PullDown(obj){             //下拉内容过渡插件-构造函数
    this.UM_PullDown={
        caption:obj.caption,
        down:obj.down,
        speed:obj.speed || 0.5,
        select:obj.select || false,
        D_click:obj.D_click || false,
        choosable:obj.choosable || false,
        within:obj.within || null,
        maxHeight:obj.maxHeight || null,
        scrollClassName:obj.scrollClassName || 'scrollClassName'
    };

    this.id='UM_PullDown_'+Math.ceil(Math.random()*100000000);
    this.now=obj.now || false;

    this.top_p=(function(){
        return this.UM_PullDown.down.getStyle('paddingTop');
    }.bind(this))();
    this.bottom_p=(function(){
        return this.UM_PullDown.down.getStyle('paddingBottom');
    }.bind(this))();
    this.top_m=(function(){
        return this.UM_PullDown.down.getStyle('marginTop');
    }.bind(this))();
    this.bottom_m=(function(){
        return this.UM_PullDown.down.getStyle('marginBottom');
    }.bind(this))();

    this.UM_PullDown.down.css({overflow:'hidden', maxHeight:this.UM_PullDown.maxHeight?this.UM_PullDown.maxHeight:'none'});

    if(this.UM_PullDown.maxHeight){
        var _html=this.UM_PullDown.down.el.innerHTML;
        this.UM_PullDown.down.el.innerHTML='';
        var dom_content=document.createElement('div'), dom_scroll=document.createElement('div');
        dom_content.id=this.id;
        dom_content.innerHTML=_html;
        dom_content.style.width='100%';
        dom_content.style.position='relative';
        dom_content.style.top='0';
        dom_content.style.left='0';
        dom_content.style.zIndex='5';

        dom_scroll.style.height='0';
        dom_scroll.style.position='absolute';
        dom_scroll.style.top='0';
        dom_scroll.style.right='2px';
        dom_scroll.style.zIndex='10';
        dom_scroll.className='UM_pullDown_'+this.UM_PullDown.scrollClassName;

        this.UM_PullDown.down.el.appendChild(dom_content);
        this.UM_PullDown.down.el.appendChild(dom_scroll);
        _MovingScroll({
            box:this.UM_PullDown.down,　　//　容器盒子选择器
            contentBox:_(dom_content),　　//　滚动内容盒子选择器
            scrollBox:_(dom_scroll),　　//　滚动条盒子选择器
            speed:50
        });
    }

    if(this.now===true){  // 设置初始状态为显示时的下拉框体样式
        this.UM_PullDown.down.css({opacity:1, height:this._m_height()});
    }else if(this.now===false){  // 设置初始状态为隐藏时的下拉框体样式
        this.UM_PullDown.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
    }
    if(this.UM_PullDown.choosable===false)this.UM_PullDown.caption.choosable(false);  // 标题字体内容是否可被选中
    this.UM_PullDown.caption.css({cursor:'pointer'});  // 设置标题的cursor样式

    this.UM_PullDown.caption.BD('click', function(event){
        _stopPropagation(event);
        if(this.UM_PullDown.down.el.style.height!=='auto'){
            if(this.UM_PullDown.within)this.UM_PullDown.within.css({height:'auto'});

            if(this.now===false){
                this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
            }else{
                this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            };
            this.now=!this.now;
        }else{
            this.UM_PullDown.down.css({height:this.UM_PullDown.down.getStyle('height')});
            setTimeout(function(){
                if(this.UM_PullDown.within)this.UM_PullDown.within.css({height:'auto'});
                if(this.now===false){
                    this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
                }else{
                    this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                };
                this.now=!this.now;
            }.bind(this));
        };
    }.bind(this));

    if(this.UM_PullDown.D_click===false){  // 当点击背景时, 折叠下拉框
        _(document).BD('click', function(){
            if(this.UM_PullDown.down.el.style.height==='auto')this.UM_PullDown.down.css({height:this.UM_PullDown.down.getStyle('height')});  // 为了使动画正常过渡, 需要设置height(当height的值为auto时, 改变height值不会显示动效)
            if(!this.UM_PullDown.within){
                setTimeout(function(){
                    this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                    this.now=false;
                }.bind(this));
            }
        }.bind(this));
    }

    if(this.UM_PullDown.select===false){  // 当点击选项时, 折叠下拉框
        this.UM_PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            if(this.UM_PullDown.within)this.UM_PullDown.within.css({height:'auto'});  // 当本插件为子嵌套插件时, 点击选项, 使父插件的down元素的height改成auto, 以使父插件的下拉框可以正确显示动效
            this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }.bind(this));
    }
};

___constructor_PullDown.prototype._m_getStyleInf=function(dom, typeName){
    if(window.getComputedStyle){
        return parseInt(getComputedStyle(dom,false)[typeName]);
    }else{
        return parseInt(dom.currentStyle[typeName]);
    };
};

___constructor_PullDown.prototype._m_height=function(){
    var result=0;
    if(this.UM_PullDown.maxHeight){
        for(var i=0; i<_('#'+this.id, 0).el.children.length; i++){
            result=result+_('#'+this.id, 0).el.children[i].offsetHeight+this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginTop')+this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginBottom');
        console.log(_('#'+this.id, 0).el.children[i].offsetHeight)
        console.log(this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginTop'))
        console.log(this._m_getStyleInf(_('#'+this.id, 0).el.children[i], 'marginBottom'))
        console.log(result)
        console.log('-------------------------------------')
        };
    }else{
        for(var i=0; i<this.UM_PullDown.down.el.children.length; i++){
            result=result+this.UM_PullDown.down.el.children[i].offsetHeight+this._m_getStyleInf(this.UM_PullDown.down.el.children[i], 'marginTop')+this._m_getStyleInf(this.UM_PullDown.down.el.children[i], 'marginBottom');
        };
    };
    return result+'px';
};

___constructor_PullDown.prototype.unfold=function(){
    if(this.UM_PullDown.down.el.style.height!=='auto'){
        if(this.UM_PullDown.within && this.UM_PullDown.within.getStyle('opacity')!=0)this.UM_PullDown.within.css({height:'auto'});
        this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
        this.now=true;
    }else{
        this.UM_PullDown.down.css({height:this.UM_PullDown.down.getStyle('height')});
        setTimeout(function(){
            if(this.UM_PullDown.within && this.UM_PullDown.within.getStyle('opacity')!=0)this.UM_PullDown.within.css({height:'auto'});
            this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:1, height:this._m_height(), paddingTop:this.top_p, paddingBottom:this.bottom_p, marginTop:this.top_m, marginBottom:this.bottom_m});
            this.now=true;
        }.bind(this));
    };
};

___constructor_PullDown.prototype.fold=function(){
    if(this.UM_PullDown.down.el.style.height!=='auto'){
        if(this.UM_PullDown.within && this.UM_PullDown.within.getStyle('opacity')!=0)this.UM_PullDown.within.css({height:'auto'});
        this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        this.now=false;
    }else{
        this.UM_PullDown.down.css({height:this.UM_PullDown.down.getStyle('height')});
        setTimeout(function(){
            if(this.UM_PullDown.within && this.UM_PullDown.within.getStyle('opacity')!=0)this.UM_PullDown.within.css({height:'auto'});
            this.UM_PullDown.down.transition(this.UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            this.now=false;
        }.bind(this));
    };
};

function _PullDown(obj){             //下拉内容过渡插件
    return new ___constructor_PullDown(obj);
};