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
    }
    if(UM_MovingScroll.watch_mouseup===true){                  //当页面上鼠标抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('mouseup', function(){
            setTimeout(function() {
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
    }
    if(UM_MovingScroll.watch_el){
        UM_MovingScroll.watch_el.el.BD('click', function(){
            setTimeout(function() {
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullDown(obj){                           //下拉内容过渡插件
    var UM_PullDown={
        caption:obj.caption,
        down:obj.down,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || false,
        choosable:obj.choosable || false,
        within:obj.within || null,
        maxHeight:obj.maxHeight || null,
        getStyleInf:function(dom, typeName){
            if(window.getComputedStyle){
                return parseInt(getComputedStyle(dom,false)[typeName]);
            }else{
                return parseInt(dom.currentStyle[typeName]);
            };
        },
        height:function(){
            var result=0;
            for(var i=0; i<UM_PullDown.down.el.children.length; i++){
                result=result+UM_PullDown.down.el.children[i].offsetHeight+UM_PullDown.getStyleInf(UM_PullDown.down.el.children[i], 'marginTop')+UM_PullDown.getStyleInf(UM_PullDown.down.el.children[i], 'marginBottom');
            };
            return result+'px';
        },
        padding_top:function(){
            return this.down.getStyle('paddingTop');
        },
        padding_bottom:function(){
            return this.down.getStyle('paddingBottom');
        },
        margin_top:function(){
            return this.down.getStyle('marginTop');
        },
        margin_bottom:function(){
            return this.down.getStyle('marginBottom');
        }
    };

    var top_p=UM_PullDown.padding_top();
    var bottom_p=UM_PullDown.padding_bottom();
    var top_m=UM_PullDown.margin_top();
    var bottom_m=UM_PullDown.margin_bottom();

    if(UM_PullDown.now===true){
        if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!=''){
            UM_PullDown.down.css({opacity:1, height:UM_PullDown.height(), maxHeight:UM_PullDown.maxHeight, overflowX:'hidden'});
        }else{
            UM_PullDown.down.css({opacity:1, height:UM_PullDown.height(), overflowX:'hidden'});
        };
    }
    if(UM_PullDown.now===false){
        if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!=''){
            UM_PullDown.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, maxHeight:UM_PullDown.maxHeight, overflowX:'hidden'});
        }else{
            UM_PullDown.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, overflowX:'hidden'});
        };
    }
    if(UM_PullDown.choosable===false)UM_PullDown.caption.choosable(false);
    UM_PullDown.caption.css({cursor:'pointer'});
    UM_PullDown.caption.BD('click', function(event){
        _stopPropagation(event);
        if(UM_PullDown.down.el.style.height!=='auto'){
            if(UM_PullDown.within){
                if(!isNaN(parseInt(UM_PullDown.within.getStyle('maxHeight'))) && UM_PullDown.within.el.offsetHeight+parseInt(UM_PullDown.height())>parseInt(UM_PullDown.within.getStyle('maxHeight'))){
                    UM_PullDown.within.css({overflowY:'auto'});
                }else{
                    UM_PullDown.within.css({overflowY:'hidden'});
                };

                UM_PullDown.within.css({height:'auto'});
            }
            if(UM_PullDown.now===false){
                if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!='' && parseInt(UM_PullDown.height())>parseInt(UM_PullDown.maxHeight)){
                    UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'auto', opacity:1, height:UM_PullDown.height(), paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
                }else{
                    UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'hidden', opacity:1, height:UM_PullDown.height(), paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
                };
            }else{
                if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!='' && parseInt(UM_PullDown.height())>parseInt(UM_PullDown.maxHeight)){
                    UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'auto', opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                }else{
                    UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'hidden', opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                };
            };
            UM_PullDown.now=!UM_PullDown.now;
        }else{
            UM_PullDown.down.css({height:UM_PullDown.down.getStyle('height')});
            setTimeout(function(){
                if(UM_PullDown.within){
                    if(!isNaN(parseInt(UM_PullDown.within.getStyle('maxHeight'))) && UM_PullDown.within.el.offsetHeight+parseInt(UM_PullDown.height())>parseInt(UM_PullDown.within.getStyle('maxHeight'))){
                        UM_PullDown.within.css({overflowY:'auto'});
                    }else{
                        UM_PullDown.within.css({overflowY:'hidden'});
                    };

                    UM_PullDown.within.css({height:'auto'});
                }
                if(UM_PullDown.now===false){
                    if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!='' && parseInt(UM_PullDown.height())>parseInt(UM_PullDown.maxHeight)){
                        UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'auto', opacity:1, height:UM_PullDown.height(), paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
                    }else{
                        UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'hidden', opacity:1, height:UM_PullDown.height(), paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
                    };
                }else{
                    if(UM_PullDown.maxHeight && UM_PullDown.maxHeight.replace(/\s/g, '')!='' && parseInt(UM_PullDown.height())>parseInt(UM_PullDown.maxHeight)){
                        UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'auto', opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                    }else{
                        UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({overflowY:'hidden', opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                    };
                };
                UM_PullDown.now=!UM_PullDown.now;
            }, 1);
        };
    });
    _(window).BD('resize', function(){
        if(UM_PullDown.caption.el){
            UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            UM_PullDown.now=false;
        }
    });
    if(UM_PullDown.D_click===false){
        _(document).BD('click', function(){
            if(UM_PullDown.down.el.style.height==='auto')UM_PullDown.down.css({height:UM_PullDown.down.getStyle('height')});
            if(!UM_PullDown.within){
                setTimeout(function(){
                    UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
                    UM_PullDown.now=false;
                }, 1)
            }
        });
    }
    if(UM_PullDown.select===false){
        UM_PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            if(UM_PullDown.within)UM_PullDown.within.css({height:'auto'});
            UM_PullDown.down.transition(UM_PullDown.speed+'s linear').transformOrigin('CENTER TOP').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            UM_PullDown.now=false;
        });
    }
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
    _(window).BD('resize', function(){
        if(UM_PullLeft.caption.el){
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s linear').transformOrigin('LEFT CENTER').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            UM_PullLeft.now=false;
        }
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
