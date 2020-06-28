# LOTS商城团队预定移动端

## um全局组件    (代码文件夹位置: @/libs)
```
- um-modal 模态框
	- v-model: 是否展示组件  boolean  双向数据绑定
	- back-disabled: 如果有该属性, 则点击遮罩不关闭模态框
	- close-disabled: 如果有该属性, 则模态框没有关闭按钮
	- @close: 模态框关闭回调方法  function
	- $refs[name].closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模态框

- um-modal-page 全屏模态框
	- v-model: 是否展示组件  boolean  双向数据绑定
	- close-disabled: 如果有该属性, 则模态框没有关闭按钮
	- @close: 模态框关闭回调方法  function
	- $ref.closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模态框

- um-button 按钮
	- **该组件可以直接在组件上绑定h5的原生事件而不用加.native修饰符
	- **该组件可以直接使用框架提供的icon, 比如: <b-button>&#xe651;</b-button>, 具体icon请双击/public/font/demo_index.html文件
	- disabled: 如果有该属性, 且该属性的值是''、'true'、true时, 则组件禁用
	- circle: 是否圆形按钮
	- type: 'default'|'gray'|'orange' 蓝色渐变按钮|灰色按钮|橙色按钮 默认'default'
	- size: 'nomal'|'small' 正常按钮(高度3rem)|小号按钮(高度2rem)  默认'nomal'

- um-number-picker 数字选择器
	- v-model: 选择的数字绑定到使用环境的值  number  双向数据绑定
	- max: 可选择的最大值  number|string  *如果最大值设置得小于最小值, 则默认最大值=最小值
	- min: 可选择的最小值  number|string
	- disabled: 是否禁用组件  string|boolean  当有该属性, 或者该属性的值为'true'或者true时, 禁用组件
	- @change: 数字改变时的回调方法  function * 自带回调参数: 当前数字, 变化之前的数字

- um-input 输入框
	- v-model: 输入文字绑定到使用环境的值  string  双向数据绑定
	- type: 原生input标签的type  *仅支持password和text
	- width: 输入框组件的宽度  number|string  *仅支持rem单位, 默认15rem

- um-row 横列块级组件
	- 可以配合row-left, row-middle, row-right组件来横排布局, 支持绑定原生事件
	- row-left: 横列左边块, 可以在标签上写'width'属性来定义块的宽度, width的类型为number|string(不能写单位)
	- row-middle: 横列左边块, 可以在标签上写'width'属性来定义块的宽度, width的类型为number|string(不能写单位)
	- row-right: 横列左边块, 可以在标签上写'width'属性来定义块的宽度, width的类型为number|string(不能写单位)
	- *默认横列块元素width宽度规则:
		-row-left组件默认width为: 60, 支持绑定原生事件
		-row-middle组件默认width为: 20, 支持绑定原生事件
		-row-right组件默认width为: 20, 支持绑定原生事件
		-宽度规则与css中display:table-cell的宽度规则一致

- um-date 日期组件
	- show.sync: 是否展示组件  boolean  ***必须加上.sync修饰符才能实现双向数据绑定
	- range: 如果有该属性, 则可以选择时间范围
	- v-model: 当前所选日期绑定到使用环境的值  string|array  双向数据绑定   * 普通模式下是string, range模式下是array:[开始时间字符串, 结束时间字符串]
	- back-disabled: 如果有该属性, 则点击遮罩不关闭模态框
	- close-disabled: 如果有该属性, 则模态框没有关闭按钮
	- @close: 模态框关闭回调方法  function
	- @change: 日期改变时的回调方法  function * 自带回调参数: 日期json数据
	- $refs[name].closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模态框
	- limit: 禁用某些日期的规则  json  * json内的有效属性有3个: max(最大有效日期, json), min(最小有效日期, json), range(被禁用的日期数组, array)
		- max: 模板: {date:'2020-06-06', explain:'无票'}
			- date: 日期字符串  string  必须   * 必须是'2020-06-06'形式(比如2020年6月6日, 必须是'2020-06-06', 不能是如: '2020-6-6')
			- explain: 禁用说明  string  可选
		- min: 模板: {date:'2020-06-06', explain:'无票'}
		- range: 模板: [{date:'2020-06-06', explain:'无票'}, {date:'2020-06-08', explain:'无票'}]

- um-scroll-load 滚动加载组件
	- v-model: 是否已加载完毕  boolean  * 必须必须必须设置成boolean, 当该值恒等于true时, 表示已经加载完毕, 将不再调取@load回调, 直到该值重新变成false
	- height: 组件的高度  string  * 如果设置, 必须必须必须带单位!! 如果不存在该属性, 则默认高度为'100%'
	- @load: 当滚动条到底部且v-model的值为false时的回调函数

- um-area 省市区选择组件
	- show.sync: 是否展示组件  boolean  ***必须加上.sync修饰符才能实现双向数据绑定
	- v-model: 当前所选日期绑定到使用环境的值  array  双向数据绑定   * [{name:省名,code:省编码}, {name:市名,code:市编码}, {name:区名,code:区编码}]
	- back-disabled: 如果有该属性, 则点击遮罩不关闭模态框
	- close-disabled: 如果有该属性, 则模态框没有关闭按钮
	- @close: 模态框关闭回调方法  function
	- @submit: 点击组件确定按钮后的回调方法  function * 自带回调参数: 同v-model绑定的数据
	- $refs[name].closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模态框

- um-confirm 二次确认弹框组件
	- v-model: 是否展示组件  boolean  双向数据绑定
	- align: 弹框的字体对齐方式  string  默认'center', 有效值:'left', 'right'
	- closelose: 如果有该属性, 则组件的'确认'按钮被点击时不会关闭弹框
	- @confirm: 点击'确认'按钮时的回调函数
	- $refs[name].closeModal: 组件内部提供关闭模态框的方法, 可以在父组件直接调用this.$refs.[模态框组件名].closeModal()方法来强制关闭模弹框

- loading 加载中
	- this.$Loading.run()  全局调出loading方法
	- this.$Loading.stop()  全局停止loading方法

- alert 消息弹框
	- this.$Alert(str)  全局调用弹框方法: 参数类型为string, 支持innerHTML
```


## 项目自定义组件    (代码文件夹位置: @/components)
```
- navigate 头部导航组件
	- 引用: import navigate from '@/components/navigate.vue'

	- v-model: 是否展示组件  boolean  双向数据绑定


```

## 主要vue文件位置    (代码文件夹位置: @/viwes)
```
- navigate 头部导航组件
	- login: 登录及个人中心
	- hotel: 酒店模块相关
	- ticket: 门票模块相关
	- order: 订单相关

```

## 绑定到window上的全局方法    (代码文件夹位置: @/main.js)
```
- _isJson(val)   判断参数是否为json   val:anything

- _isArray(val)  判断参数是否为json   val:anything

- _dateFormat(date, formatStr)   格式化日期
	- date: 所有Date对象支持的日期字符串或者日期对象
	- formatStr: 
		- Y: 年
		- M: 月
		- D: 日
		- h: 时
		- m: 分
		- s: 秒
		- q: 季度  ->  1:春季; 2:夏季; 3:秋季; 4:冬季
		- w: 星期  ->  0:周日; 1:周一; 2:周二; 3:周三; 4:周四; 5:周五; 6:周六
		- S: 毫秒
	- *例: _dateFormat(new Date(), 'Y-M-D h:m:s S毫秒')  ->  '2020-06-08 15:20:30 560毫秒'

- _transcoding(str)   将字符串转码(登陆、支付等密码转码用)
	- str: 需要转码的字符串   string  必须

- _BD(eventName, fn, target)   给指定dom绑定事件
	- eventName: 事件名(不带on) string
	- fn: 事件函数 function
	- target: 绑定事件的元素 element

- _unBD(eventName, fn, target)   给指定dom解除绑定事件
	- eventName: 事件名(不带on) string
	- fn: 事件函数 function
	- target: 解除绑定事件的元素 element

- _Storage 处理缓存的对象
	- _Storage.get(name): 获取名为[name]的缓存  * 如果获取到的缓存是json字符串, 则自动转换成json对象; 如果不是, 则返回字符串
	- _Storage.set(name, item): 设置名为[name]的缓存  * 参数item必须是字符串, 如果要缓存json, 须先把josn转换成json字符串
	- _Storage.remove(name): 移除名为[name]的缓存

- _isIdCard(str) 判断字符串或数字的值是否为国内身份证号码
	- str: 被判断的字符串  string|number  必须

- _isPhone(str) 判断字符串或数字的值是否为国内手机号码
	- str: 被判断的字符串  string|number  必须

- _isEmpty(str) 判断字符串的值是否为空
	- str: 被判断的字符串  string  必须

- _isMail(str) 判断字符串的值是否为邮箱
	- str: 被判断的字符串  string  必须

- _isNumber(str) 判断字符串的值是否为数字
	- str: 被判断的字符串  string  必须
```