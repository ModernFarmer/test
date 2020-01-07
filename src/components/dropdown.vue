<template>
<div class="dropdown_view">
	<um-dropdown :list="list" enabled="value.a|cc" clearable closeSearchClear searchable option="value.a" view="id.a" v-model="dropdownValue" @change="abc"></um-dropdown>
	<!-- <br>
	<br> -->
	<um-input icon="&#xe651;|left" rulesGroup v-model="inputValue" @clickIcon="toClick"></um-input>{{inputValue}}
</div>
</template>

<script>
//  ----------------- dropdown --------------------------
// list: 下拉插件的列表数据  必须  [array]
// option: 如果下拉列表数据数组的值是json, 而且你要下拉选项展示的是这些json内某个字段的值, 比如list是这样一个数组:[{a:{value:'ohyear~'}, b:'bbb'},{a:{value:'ohyear_1~'}, b:'bbb_1'}], 你想要下拉选项展示的是list[i].a.value的值, 那么你可以设置option为'a.value'; 如果不设置option, 那么下拉选项展示的是list[i]   [string]
// view: 同option, 它表示的是展示在下拉插件头里面的值, 如果不设置, 则展示list[i]    [string]
// v-model: 选中的选项绑定到使用环境的值, 即list[i]     [变量名]
// model: 配合v-model使用, 可以指定绑定v-model所抛出的值的属性. 比如说你选择的选项的绑定值为{key:'a', value:{v1:'aaa', v2:'bbb'}, name:'c'}, 但是你只想得到这个json的value里面的v1的值, 那么你可以设置model为'value.v1', 那么你就可以方便地得到你想要地值, 而不用自己通过@change的自定义方法去处理数据    [string]
// @change: 当选项发生变化时调用的函数, 该函数自带2个回调参数: 1: 当前选择的选项的完整值(如果选择空选项, 则返回null), 2: 当前选择的选项的索引(如果选择空选项, 则返回null)     [方法名]
// clearable: 如果有该属性, 则可以选择空选项, 空选项的值可以通过placeholder属性来设置
// placeholder: 当未选择任何选项时所展示的灰色字体    [string]
// searchable: 如果有该属性, 则可以本地搜索下拉选项
// closeSearchClear: 关闭本地搜索的清除功能; 当插件有searchable属性时, 如果收起下拉框, 默认会清楚搜索框内的搜索关键字, 如果有closeSearchClear属性, 则不会清除
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则插件禁用
// selected: 初始被选中的选项在list中的索引   [number]  *由于插件v-model返回的可能是一个对象, 所以如果有初始选项, 那你需要自己去获得初始选项的索引并把它赋值到selected属性上...
// maxHeight: 下拉框体的最大高度, 默认'220px'   [string]   *必须带单位, 只支持 px, em, rem
// enabled: 选项禁选规则  [string]   如果含有该属性, 则启用禁选过滤, 该值将会以'|'拆分, 拆分后如果有2部分, 则第一部分为选项值属性描述, 第二部分为判断选项是否禁选的值; 拆分后如果只有1部分, 则该部分为选项值属性描述. 比如:enabled="value.a|T", 这里以json表示选项的值, 则当jaon.value.a==='T'时, 选项可选; 再比如:enabled="value.a", 则当json.value.a===true时, 选项可选




//  ----------------- input --------------------------
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则插件禁用
// icon: 输入框图标  [string]   如果含有该属性, 则启用输入框图标, 该值将会以'|'拆分, 拆分后如果有2部分, 则第一部分为图标的Unicode代码, 第二部分为图标的位置; 拆分后如果只有1部分, 则该部分为图标的Unicode代码. 比如:icon="&#xe651;|left", 这里以json表示选项的值, 则输入框内展示Unicode代码为'&#xe651;'的图标, 图标的位置在左边  *位置只支持'left'和'right', 分别代表左边和右边, 默认为'right'
// @clickIcon: 当点击icon时调用的函数, 该函数自带回调参数: input框内绑定的值     [方法名]


export default {
	data(){
		return {
            list:[{id:{a:'id_a'}, value:{a:'aa'}},{id:{a:'id_b'}, value:{a:'bb'}},{id:{a:'id_c'}, value:{a:'cc'}},{id:{a:'id_d'}, value:{a:'dd'}},{id:{a:'id_e'}, value:{a:'ee'}},{id:{a:'id_f'}, value:{a:'ff'}},{id:{a:'id_gg'}, value:{a:'gg'}},{id:{a:'id_hh'}, value:{a:'hh'}},{id:{a:'id_ii'}, value:{a:'ii'}},{id:{a:'id_jj'}, value:{a:'jj'}},{id:{a:'id_kk'}, value:{a:'kk'}},{id:{a:'id_ll'}, value:{a:'ll'}}],
            dropdownValue:'',

            inputValue:'1234',
		}
	},
	methods:{
		abc(data, index){
			console.log(data, index)
		},
		toClick(val){
			console.log(val);
		},
		bbb(){
			console.log('bbb')
		}
	},
	mounted:function(){
		console.log(this._$UMOBJECT$_)
	}
}
</script>

<style>
.dropdown_view {margin-top:30px; margin-left:50px;}
</style>