<template>
<div class="select_view">
	<b-select style="z-index:100" disabled :list="list" :rules="inputRulesObj" validateField="selectValue1" enabled="value.a|cc" clearable closeSearchClear searchable option="id.a" view="id.a" v-model="selectValue1" model="value.product.name" @change="abc"></b-select>{{selectValue1}}&nbsp;
	<b-select style="z-index:100" size="big" :list="list" :rules="inputRulesObj" validateField="selectValue2" enabled="value.a|cc" clearable closeSearchClear searchable option="id.a" view="id.a" v-model="selectValue2" model="value.product.name" @change="abc"></b-select>{{selectValue2}}&nbsp; <b-button type="|small">的地方</b-button>
	<b-select style="z-index:100" size="small" :list="list" :rules="inputRulesObj" validateField="selectValue3" enabled="value.a|cc" clearable closeSearchClear searchable option="value.product.name" view="value.product.id" v-model="selectValue3" model="value.product" keyword="value.product.name" @change="abc"></b-select>{{selectValue3}}

	<br><br><br>

	<b-input icon="&#xe651;|left" :rules="inputRulesObj" validateField="obj.inputValue" v-model="obj.inputValue" @clickIcon="toClick"></b-input>&nbsp;
	<b-input size="big" disabled icon="&#xe651;|left" :rules="inputRulesObj" validateField="obj.inputValue" v-model="obj.inputValue" @clickIcon="toClick"></b-input>&nbsp;
	<b-input size="small" icon="&#xe651;|left" :rules="inputRulesObj" validateField="obj.inputValue" v-model="obj.inputValue" @clickIcon="toClick"></b-input>

	<br><br><br>

	<b-page total="1000" pageSize="10" sizeable skipable @change="pageChange" @sizeChange="sizeChange"></b-page><br><br>
	<b-page total="1000" pageSize="10" size="big" sizeable skipable @change="pageChange" @sizeChange="sizeChange"></b-page><br><br>
	<b-page total="1000" pageSize="10" size="small" sizeable skipable @change="pageChange" @sizeChange="sizeChange"></b-page>

	<br><br><br>

	<b-button @click="buttonClick('default | type1')">default | type1</b-button>&nbsp;
	<b-button type="2" @click="buttonClick('type2')">type2</b-button>&nbsp;
	<b-button type="3" @click="buttonClick('type3')">type3</b-button>&nbsp;
	<b-button type="4" @click="buttonClick('type4')">type4</b-button>&nbsp;
	<b-button type="5" @click="buttonClick('type5')">type5</b-button>&nbsp;
	<b-button type="6" @click="buttonClick('type6')">type6</b-button>&nbsp;
	<b-button type="7" @click="buttonClick('type7')">type7</b-button>&nbsp;
	<b-button type="8" @click="buttonClick('type8')">type8</b-button>&nbsp;
	<b-button type="8|big" @click="buttonClick('type8|big')">type8|big</b-button>&nbsp;
	<b-button type="8|small" @click="buttonClick('type8|small')">type8|small</b-button>&nbsp;
	<b-button disabled type="8|small" @click="buttonClick('type8|small')">type8|small</b-button>&nbsp;
	<b-button type="9" @click="buttonClick('type9')">type9</b-button>&nbsp;
	<b-button circle @click="buttonClick('type1-circle')">&#xe651;</b-button>&nbsp;
	<b-button circle type="2|big" @click="buttonClick('type2|big-circle')">&#xe651;</b-button>&nbsp;
	<b-button circle type="6|small" @click="buttonClick('type6|small-circle')">&#xe651;</b-button>

	<br><br><br>

	第一个组件绑定值: <span style="color:salmon; margin-right:20px">{{switchValue}}</span>
	<b-switch text="on|off" @change="switchEvent" v-model="switchValue" model="T|F"></b-switch>&nbsp;
	<b-switch text="开|关" @change="switchEvent" size="big"></b-switch>&nbsp;
	<b-switch text="开放中|关闭" @change="switchEvent" size="small"></b-switch>&nbsp;
	<b-switch disabled></b-switch>

	<br><br><br>

	<b-button @click="toAlertMessage_default">弹框按钮-default</b-button>&nbsp;
	<b-button @click="toAlertMessage_success">弹框按钮-success</b-button>&nbsp;
	<b-button @click="toAlertMessage_warning">弹框按钮-warning</b-button>&nbsp;
	<b-button @click="toAlertMessage_error">弹框按钮-error</b-button>&nbsp;

	<br><br><br>

	<b-button @click="toShowModal">模态框按钮</b-button>
	<b-modalInside v-model="modalInside" width="80%" @close="isCloseModal">
		<div style="width:100%; text-align:center; font-size:30px; font-weight:900; margin-top:50px">我是 modalInside</div>
	</b-modalInside>

	<br><br><br>

	<b-button @click="toShowLoading">loading按钮</b-button>

	<br><br><br>

	<b-checkall :options="checkboxOptions" v-model="checkboxResult" model="id.upId">全选</b-checkall>

	<br><br><br>

	<b-checkbox v-for="option in checkboxOptions" :result="checkboxResult" :option="option" model="id.upId">{{option.value}}</b-checkbox>
	<br><br>
	结果: {{checkboxResult}}

	<br><br><br>

	<b-radio v-for="(option, index) in radioOptions" v-model="radioResult" model="value" keyword="value.id" :disabled="index===0?true:false" :option="option">{{option.name}}</b-radio>
	<br><br>
	结果: {{radioResult}}

	<br><br><br>

	
</div>
</template>

<script>
export default {
	data(){
		return {
            list:[
            	{id:{a:'id_a'}, value:{a:'aa', product:{name:'aaa', id:1, unit:'km'}}},
            	{id:{a:'id_b'}, value:{a:'cc', product:{name:'bbb', id:2, unit:'km'}}},
            	{id:{a:'id_c'}, value:{a:'cc', product:{name:'ccc', id:3, unit:'km'}}},
            	{id:{a:'id_d'}, value:{a:'aa', product:{name:'ddd', id:4, unit:'km'}}}
            ],
            selectValue1:'',
            selectValue2:'',
            selectValue3:'',
            obj:{
            	inputValue:''
            },
            inputRulesObj:{
            	'obj.inputValue':['required|不能为空(测试)', 'isMail|邮箱格式错误!'],
            	'selectValue1':['required|不能为空(下拉框测试1)'],
            	'selectValue2':['required|不能为空(下拉框测试2)'],
            	'selectValue3':['required|不能为空(下拉框测试3)']
            },
            switchValue:'T',
            modalInside:false,
            checkboxOptions:[{value:'选项一', id:{upId:'1', downId:'11'}},{value:'选项二', id:{upId:'2', downId:'22'}},{value:'选项三', id:{upId:'3', downId:'33'}},{value:'选项四', id:{upId:'4', downId:'44'}}],
            checkboxResult:[],
            radioOptions:[{name:'单选1', value:{id:1, age:32}},{name:'单选2', value:{id:2, age:33}},{name:'单选3', value:{id:3, age:30}},{name:'单选4', value:{id:4, age:34}}],
            radioResult:null
		}
	},
	methods:{
		abc(data, index){
			console.log(data, index)
		},
		toClick(val){
			console.log(val);
		},
		pageChange(page){
			console.log(page)
		},
		sizeChange(page){
			console.log(page)
		},
		buttonClick(val){
			console.log(val);
		},
		switchEvent(val){
			console.log(val);
		},
		toAlertMessage_default(){
			this.$Message({
				icon:'<span style="color:#DAF8FF; font-weight:900">&#xe651;</span>',
				value:'我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!我是弹框信息!'
			})
		},
		toAlertMessage_success(){
			this.$Message({
				type:'success',
				value:'我是弹框信息'
			})
		},
		toAlertMessage_warning(){
			this.$Message({
				type:'warning',
				value:'<span style="font-weight:900">我是弹框信息</span>'
			})
		},
		toAlertMessage_error(){
			this.$Message({
				type:'error',
				value:'我是弹框信息'
			})
		},
		toShowModal(){
			this.modalInside=true;
		},
		isCloseModal(){
			console.log('modal关闭了!');
		},
		toShowLoading(){
			this.$Loading.run();
			setTimeout(()=>{
				this.$Loading.stop();
			}, 3000);
		}
	},
	mounted:function(){
		setTimeout(()=>{
			this.checkboxResult.push('1');
			this.selectValue2='ccc';
			this.selectValue3={name:'bbb', id:1, unit:'km'};
			this.radioResult={id:1, age:33};
		}, 2000);
	}
}


//  ----------------- select --------------------------
// list: 下拉组件的列表数据  必须  [array]
// option: 如果下拉列表数据数组的值是json, 而且你要下拉选项展示的是这些json内某个字段的值, 比如list是这样一个数组:[{a:{value:'ohyear~'}, b:'bbb'},{a:{value:'ohyear_1~'}, b:'bbb_1'}], 你想要下拉选项展示的是list[i].a.value的值, 那么你可以设置option为'a.value'; 如果不设置option, 那么下拉选项展示的是list[i]   [string]  *只支持以点分隔的路径, 不支持方括号分隔的属性路径, 如:支持attr1.attr2,不支持attr1[attr2]
// size 组件的高度规格 [string] 一共有3个规格, 分别为'default'、'big'和'small', 默认为'default'
// view: 同option, 它表示的是展示在下拉组件头里面的值, 如果不设置, 则展示list[i]    [string]
// v-model: 选中的选项绑定到使用环境的值, 即list[i]     [变量名]  *!!!注: 此组件的v-model是单向绑定, 只能由组件来改变绑定值, 不支持由使用环境来改变组件内部数据(因为我们绑定的可能是一个对象)
// model: 配合v-model使用, 可以指定绑定v-model所抛出的值的属性. 比如说你选择的选项的绑定值为{key:'a', value:{v1:'aaa', v2:'bbb'}, name:'c'}, 但是你只想得到这个json的value里面的v1的值, 那么你可以设置model为'value.v1', 那么你就可以方便地得到你想要地值, 而不用自己通过@change的自定义方法去处理数据    [string]   *只支持以点分隔的路径, 不支持方括号分隔的属性路径, 如:支持attr1.attr2,不支持attr1[attr2]
// @change: 当选项发生变化时调用的函数, 该函数自带2个回调参数: 1: 当前选择的选项的完整值(如果选择空选项, 则返回null), 2: 当前选择的选项的索引(如果选择空选项, 则返回null)     [方法名]   *注意: 通过改变v-model监听而产生的选项变化不会触发该函数
// clearable: 如果有该属性, 则可以选择空选项, 空选项的值可以通过placeholder属性来设置
// placeholder: 当未选择任何选项时所展示的灰色字体    [string]
// searchable: 如果有该属性, 则可以本地搜索下拉选项
// closeSearchClear: 关闭本地搜索的清除功能; 当组件有searchable属性时, 如果收起下拉框, 默认会清除搜索框内的搜索关键字, 如果有closeSearchClear属性, 则不会清除
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则组件禁用
// maxHeight: 下拉框体的最大高度, 默认'220px'   [string]   *支持带单位, 只支持 px, em, rem; 如果不带单位则默认px
// enabled: 选项禁选规则  [string]   如果含有该属性, 则启用禁选过滤, 该值将会以'|'拆分, 拆分后如果有2部分, 则第一部分为选项值属性描述, 第二部分为判断选项是否禁选的值; 拆分后如果只有1部分, 则该部分为选项值属性描述. 比如:enabled="value.a|T", 这里以json表示选项的值, 则当jaon.value.a==='T'时, 选项可选; 再比如:enabled="value.a", 则当json.value.a===true时, 选项可选
// validateField: 验证关键字 [string] 该关键字是以属性路径的形式来展现, 具体请看'rules'属性的说明  **只支持以点分隔的路径, 不支持方括号分隔的属性路径, 如:支持attr1.attr2,不支持attr1[attr2]
// rules: 验证规则对象 [json] 对象格式为: {validateField: array, validateField: array, ...}, 其中validateField为验证关键字, array为验证'规则名称|验证失败提示语'. 比如:{'form.obj.phone': ['required|电话不能为空!', 'isPhone|电话号码格式错误!', 'form.obj.name': ['required|姓名不能为空!']}, 组件将会验证 this.form.obj.phone字段和 this.form.obj.name字段, 以 this.form.obj.phone为例, 组件会根据'form.obj.phone'的键值(是一个数组)的每一个值的顺序来验证this.form.obj.phone字段. 比如:'required|电话不能为空!'规则验证, 组件会先以'|'分割该字符串, 得到规则名称和验证失败提示语, 然后会验证'required'规则, 如果验证通过, 则进入下一个规则(如果有的话)的验证; 如果验证失败, 则直接停止验证(不会继续下一个规则的验证), 然后将页面上input框体标红且显示验证失败提示语, 如果未设置提示语(如: ['required', 'isPhone|']), 则只是input框体标红, 不显示提示语  *规则验证耦合性强, 会验证对象里面所有的关键字, 所以不需要的验证关键字不要写入验证规则对象, 否则会判定为验证未通过  ** select组件的有效规则只有一个, 即'required'(判断是否已选择)
// toVerifySimple(): vue子组件对象上的单个验证方法  [function]  *可以在父组件上通过this.$refs[子组件ref名称]来主动调用单体验证
// keyword  监听关键字 *该组件支持输出结果双向绑定  如果输出结果数组内的值是json, 则需要设置keyword, 比如:option的值是{id:'a', attr:{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}}, model的值是'attr', 那么result的值为[{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}, ...], 如果要实现当result改变的时候, 组件的选择状态跟随result的结果改变, 则必须设置keyword, 它表示判断组件选择状态改变的关键字, 比如这里我们设置keyword="attr.value.sex", 那么组件将以json.attr.value.sex的值为标准, (这里用item表示result数组内的值), 当json.attr.value.sex===[item对应的值](这里的'item对应的值'组件会根据model属性和keyword属性自动计算)时, 则判定组件的选择状态为true, 组件为选中状态, 否则组件则为未选中状态  ***特别注意: keyword设置的对象路径所指向的结果类型必须是string或者number! 用这个例子打个比方: 如果json.attr.value.sex的结果是一个json, 则不能实现组件的监听功能




//  ----------------- input --------------------------
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则组件禁用
// icon: 输入框图标  [string]   如果含有该属性, 则启用输入框图标, 该值将会以'|'拆分, 拆分后如果有2部分, 则第一部分为图标的Unicode代码, 第二部分为图标的位置; 拆分后如果只有1部分, 则该部分为图标的Unicode代码. 比如:icon="&#xe651;|left", 这里以json表示选项的值, 则输入框内展示Unicode代码为'&#xe651;'的图标, 图标的位置在左边  *位置只支持'left'和'right', 分别代表左边和右边, 默认为'right'
// size 组件的高度规格 [string] 一共有3个规格, 分别为'default'、'big'和'small', 默认为'default'
// @clickIcon: 当点击icon时调用的函数, 该函数自带回调参数: input框内绑定的值     [方法名]
// validateField: 验证关键字 [string] 该关键字是以属性路径的形式来展现, 具体请看'rules'属性的说明  **只支持以点分隔的路径, 不支持方括号分隔的属性路径, 如:支持attr1.attr2,不支持attr1[attr2]
// rules: 验证规则对象 [json] 对象格式为: {validateField: array, validateField: array, ...}, 其中validateField为验证关键字, array为验证'规则名称|验证失败提示语'. 比如:{'form.obj.phone': ['required|电话不能为空!', 'isPhone|电话号码格式错误!', 'form.obj.name': ['required|姓名不能为空!']}, 组件将会验证 this.form.obj.phone字段和 this.form.obj.name字段, 以 this.form.obj.phone为例, 组件会根据'form.obj.phone'的键值(是一个数组)的每一个值的顺序来验证this.form.obj.phone字段. 比如:'required|电话不能为空!'规则验证, 组件会先以'|'分割该字符串, 得到规则名称和验证失败提示语, 然后会验证'required'规则, 如果验证通过, 则进入下一个规则(如果有的话)的验证; 如果验证失败, 则直接停止验证(不会继续下一个规则的验证), 然后将页面上input框体标红且显示验证失败提示语, 如果未设置提示语(如: ['required', 'isPhone|']), 则只是input框体标红, 不显示提示语  *规则验证耦合性强, 会验证对象里面所有的关键字, 所以不需要的验证关键字不要写入验证规则对象, 否则会判定为验证未通过
// toVerifySimple(): vue子组件对象上的单个验证方法  [function]  *可以在父组件上通过this.$refs[子组件ref名称]来主动调用单体验证



//  ----------------- page --------------------------
// total 数据总条数  必须  [number]
// pageSize 每页条数  必须  [number]
// sizeable 是否有改变分页size功能 如果有该功能, 在输入框输入每页条数后, 在输入框获取焦点的状态下按下回车键即可改变每页条数
// size 组件的高度规格 [string] 一共有3个规格, 分别为'default'、'big'和'small', 默认为'default'
// skipable 是否有输入跳转页码功能 如果有该功能, 在输入框输入页码后, 在输入框获取焦点的状态下按下回车键即可实现页码跳转
// @change 页码改变时的回调函数, 该函数自带回调参数: 页码对象, 对象格式为: {from:1, now:2, size:10}, 其中from表示跳转前的页码, now表示跳转后的页码, size表示当前每页展示条数
// @sizeChange 每页条数改变时的回调参数, 该函数自带回调参数: 页码对象, 对象格式为: {now:2, size:10}, 其中now表示跳转后的页码, size表示当前每页展示条数



//  ----------------- button --------------------------
// **该组件可以直接在组件上绑定h5的原生事件而不用加.native修饰符
// **该组件可以直接使用框架提供的icon, 比如: <b-button>&#xe651;</b-button>
// type 组件的样式和规格 [string] 该值将会以'|'拆分, 拆分后如果有2部分, 则第一部分为按钮样式, 第二部分为按钮规格; 拆分后如果只有1部分, 则该部分为按钮样式. 其中,按钮样式有8种, 分别为1、2、3、4、5、6、7、8, 默认为1; 按钮规格有3种, 分别为'default'、'big'和'small', 默认为'default'; 比如:type="2|big", 则表示样式为2规格为'big'的按钮, type="3"则表示样式为3规格为'default'的按钮, type="|small"则表示样式为1规格为'small'的按钮
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则组件禁用
// circle: 是否圆形按钮



//  ----------------- switch --------------------------
// v-model: 选中的选项绑定到使用环境的值, 支持双向绑定
// model: 配合v-model使用, 可以指定绑定v-model所抛出的值的属性, 本组件默认抛出布尔值, 如果需要抛出其它值则可以设置model属性  [string]  该值将会以'|'拆分, 拆分后如果不是2部分, 则视为无效值; 拆分后如果是2部分, 则第一部分表示开关为开状态时的抛出值, 第二部分表示开关状态为关时的抛出值. 比如: 设置: v-model="switchValue" model="T|F", 则当开关状态变为true时, this.switchValue的值会被设置为'T', 当开关状态变为false时, this.switchValue的值会被设置为'F'
// size 组件的高度规格 [string] 一共有3个规格, 分别为'default'、'big'和'small', 默认为'default'
// text 组件开关状态的文字描述  [string]  该值将会以'|'拆分, 拆分后如果不是2部分, 则视为无效值; 拆分后如果是2部分, 则第一部分表示开关为开状态时的描述, 第二部分表示开关状态为关时的描述. 比如: 设置: text="状态on|状态off", 则当开关状态变为true时, 组件将展示'状态on', 当开关状态变为false时, 组件将展示'状态off'
// disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则组件禁用
// @change 组件状态改变时的回调函数, 该函数自带回调参数: 组件的状态返回值, 如果组件设置过model属性, 则返回model属性设置的抛出值



//  ----------------- message --------------------------
// this.$Message(json)  全局调用弹框方法: 参数为一个json或者string
/*参数: 如果是json:{
		  type:'default', // 弹框类型  string  [可选] 默认default  共提供4种类型:default, success, warning, error
		  icon:'', // 弹框图标  string  [可选] 默认undefined
		  value:'' // 弹框内容, 支持innerHTML  string  [必须]
	   }

	   如果是string: // 弹框内容, 支持innerHTML  string
*/



//  ----------------- modalInside --------------------------
// v-model: 是否展示模态框  boolean  双向数据绑定
// back-disabled: 如果有该属性, 则点击遮罩不关闭模态框
// close-disabled: 如果有该属性, 则模态框没有关闭按钮
// width: 模态框宽度  string  *注: 必须要写单位, 否则无效
// @close: 模态框关闭回调方法  function
// $ref.closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模态框



//  ----------------- loading --------------------------
// this.$Loading.run()  全局调出loading方法
// this.$Loading.stop()  全局停止loading方法



//  ----------------- checkbox --------------------------
// *该组件根据slot的内容来展示选项
// disabled  禁用组件  [boolean]  如果存在该属性,则禁用组件
// result  绑定的结果  [array]  必须
// option  绑定的选项值  [string|json]  必须  *checkbox组件支持输出json结果, 不仅仅是string
// model  输出选项的路径, 可以指定绑定结果result属性所抛出的值的属性  [string]  比如该组件的option属性绑定的是一个json, 如:option="{id:1, value:{name:'um', high:180, sex:'m'}}", 如果你不需要option的id, 只想要option的value结果, 那么你可以设置model="value", 那样的话result输出的是json.value, 如:[{name:'um', high:180, sex:'m'}, ...]; 如果你只想要option的value.name结果, 那么你可以设置model="value.name", 那样的话result输出的是json.value.name, 如:['um', ...]
// keyword  监听关键字 *该组件支持输出结果双向绑定  如果输出结果数组内的值是json, 则需要设置keyword, 比如:option的值是{id:'a', attr:{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}}, model的值是'attr', 那么result的值为[{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}, ...], 如果要实现当result改变的时候, 组件的选择状态跟随result的结果改变, 则必须设置keyword, 它表示判断组件选择状态改变的关键字, 比如这里我们设置keyword="attr.value.sex", 那么组件将以json.attr.value.sex的值为标准, (这里用item表示result数组内的值), 当json.attr.value.sex===[item对应的值](这里的'item对应的值'组件会根据model属性和keyword属性自动计算)时, 则判定组件的选择状态为true, 组件为选中状态, 否则组件则为未选中状态  ***特别注意: keyword设置的对象路径所指向的结果类型必须是string或者number! 用这个例子打个比方: 如果json.attr.value.sex的结果是一个json, 则不能实现组件的监听功能
// @change 组件状态改变时的回调函数, 该函数自带2个回调参数: 1:组件的结果数组, 2:组件的选项值  *注意, 通过改变result监听而改变组件状态的时候不会触发该函数



//  ----------------- checkall --------------------------
// *该组件根据slot的内容来展示选项内容
// options  所有选项数据  [array]  必须
// v-model  checkbox组件的结果绑定数据  [array]  必须
// model  同checkbox组件的model属性
// @input  点击组件时的回调方法, 该函数自带1个回调参数: v-model当前绑定的值(即checkbox组件的结果数组)



//  ----------------- radio --------------------------
// *该组件根据slot的内容来展示选项
// disabled  禁用组件  [boolean]  如果存在该属性,则禁用组件
// v-model: 选中的选项绑定到使用环境的值, 支持双向绑定
// option  绑定的选项值  [string|json]  必须  *radio组件支持输出json结果, 不仅仅是string
// model  输出选项的路径, 可以指定绑定v-model所抛出的值的属性  [string]  比如该组件的option属性绑定的是一个json, 如:option="{id:1, value:{name:'um', high:180, sex:'m'}}", 如果你不需要option的id, 只想要option的value结果, 那么你可以设置model="value", 那样的话result输出的是json.value, 如:{name:'um', high:180, sex:'m'}; 如果你只想要option的value.name结果, 那么你可以设置model="value.name", 那样的话result输出的是json.value.name, 如:'um', ...
// keyword  监听关键字 *该组件支持输出结果双向绑定  如果输出结果数组内的值是json, 则需要设置keyword, 比如:option的值是{id:'a', attr:{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}}, model的值是'attr', 那么v-model绑定值的值为{main:'b', name:'c', value:{age:34, high:180, sex:'m'}}, 如果要实现当v-model绑定值改变的时候, 组件的选择状态跟随v-model绑定值的结果改变, 则必须设置keyword, 它表示判断组件选择状态改变的关键字, 比如这里我们设置keyword="attr.value.sex", 那么组件将以json.attr.value.sex的值为标准, (这里用item表示v-model绑定值数组内的值), 当json.attr.value.sex===[item对应的值](这里的'item对应的值'组件会根据model属性和keyword属性自动计算)时, 则判定组件的选择状态为true, 组件为选中状态, 否则组件则为未选中状态  ***特别注意: keyword设置的对象路径所指向的结果类型必须是string或者number! 用这个例子打个比方: 如果json.attr.value.sex的结果是一个json, 则不能实现组件的监听功能
// clearable: 是否可以全部不选  [string|boolean]  如果存在该属性, 则组件可以全部不选
// @change 组件状态改变时的回调函数, 该函数自带2个回调参数: 1:组件的结果数组, 2:组件的选项值  *注意, 通过改变v-model绑定值监听而改变组件状态的时候不会触发该函数



</script>

<style>
.select_view {width:75%; padding:5%; background:#FAFAFA; position:absolute; left:10%; top:20px;}
</style>