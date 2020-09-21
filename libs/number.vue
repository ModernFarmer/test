<template>
<div class="um__number_class">
    <div class="um__number_min icon um__number_disabled" v-if="!minVerify || minusDisabled || isDisabled">&#xe725;</div>
    <div :class="{
        um__number_min:true, 
        icon:true, 
        um__number_hoverOn_ninus:!first_minus && alive_minus && !down_minus,
        um__number_down:down_minus
    }" v-else @mouseenter="toUnFirst_minus" @mousedown="toMDown_minus" @click="toMinus">&#xe725;</div>
    <div class="um__number_add icon um__number_disabled" v-if="!maxVerify || plusDisabled || isDisabled">&#xe725;</div>
    <div :class="{
        um__number_add:true, 
        icon:true, 
        um__number_hoverOn_plus:!first_plus && alive_plus && !down_plus,
        um__number_down:down_plus
    }" v-else @mouseenter="toUnFirst_plus" @mousedown="toMDown_plus" @click="toPlus">&#xe725;</div>
    <div class="um__number_numberBox">{{value}}</div>
    <div class="um__number_position">0</div>
</div>
</template>

<script>
export default {
    props:['min', 'max', 'disabled', 'plus-disabled', 'minus-disabled', 'value'],
    data(){
        return {
            first_minus: true,
            first_plus: true,
            down_minus: false,
            down_plus: false,
            alive_minus: true,
            alive_plus: true
        }
    },
    computed:{
        minNum:function(){
            if(Number(this.min) || Number(this.min)===0)return Math.ceil(this.min);
            return null;
        },
        maxNum:function(){
            if(Number(this.max) || Number(this.max)===0)return Math.ceil(this.max);
            return null;
        },
        minVerify:function(){
            if(this.minNum===null || (this.minNum!==null && this.num>this.minNum))return true;
            this.alive_minus=false;
            return false;
        },
        maxVerify:function(){
            if(this.maxNum===null || (this.maxNum!==null && this.num<this.maxNum))return true;
            this.alive_plus=false;
            return false;
        },
        isDisabled:function(){
            return this.disabled==='' || this.disabled==='true' || this.disabled===true;
        },
        num:function(){
            let nb=Number(this.value);
            return nb?nb:0;
        }
    },
    methods:{
        toUnFirst_minus(){
            this.alive_minus=true;
            this.first_minus=false;
        },
        toUnFirst_plus(){
            this.alive_plus=true;
            this.first_plus=false;
        },
        toMDown_minus(){
            this.down_minus=true;
        }, 
        toMDown_plus(){
            this.down_plus=true;
        },
        toMinus(){
            this.$emit('input', this.num-1);
        },
        toPlus(){
            this.$emit('input', this.num+1);
        },
        toMouseup(){
            this.down_minus=false;
            this.down_plus=false;
        }
    },
    mounted(){
        _BD(document, 'mouseup', this.toMouseup);
    },
    beforeDestroy(){
        _unBD(document, 'mouseup', this.toMouseup);
    },
}
</script>

<style>
.um__number_class {width:102px; height:30px; line-height:30px; text-align:center; border:1px solid #eaeaea; -webkit-user-select:none; -moz-user-select:none; -o-user-select:none; user-select:none; border-radius:15px; display:inline-block; position:relative;}
.um__number_min {width:26px; height:26px; color:white; font-size:20px; border-radius:50%; border:1px solid transparent; background:#f7d655; line-height:26px; cursor:pointer; position:absolute; left:1px; top:1px;}
.um__number_add {width:26px; height:26px; color:white; font-size:20px; border-radius:50%; border:1px solid transparent; background:#f7d655; line-height:26px; cursor:pointer; position:absolute; right:1px; top:1px;}
.um__number_hoverOn_ninus, .um__number_hoverOn_plus {animation:UM_NUMBER_LEAVE .5s forwards; -webkit-animation:UM_NUMBER_LEAVE .5s forwards; -o-animation:UM_NUMBER_LEAVE .5s forwards; -moz-animation:UM_NUMBER_LEAVE .5s forwards; -ms-animation:UM_NUMBER_LEAVE .5s forwards;}
.um__number_hoverOn_ninus:hover, .um__number_hoverOn_plus:hover {animation:UM_NUMBER_ENTER .5s forwards; -webkit-animation:UM_NUMBER_ENTER .5s forwards; -o-animation:UM_NUMBER_ENTER .5s forwards; -moz-animation:UM_NUMBER_ENTER .5s forwards; -ms-animation:UM_NUMBER_ENTER .5s forwards;}
.um__number_down {background:#de9806 !important;}
.um__number_disabled {background:#d4dde6; cursor:not-allowed;}
.um__number_numberBox {width:40px; height:30px; line-height:31px; position:absolute; left:31px; top:0; font-size:16px;}
.um__number_position {opacity:0; position:relative; z-index:-1;}
</style>