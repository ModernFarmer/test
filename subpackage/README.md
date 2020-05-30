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
	- type: 'default'|'gray' 蓝色渐变按钮|灰色按钮 默认'default'
	- size: 'nomal'|'small' 正常按钮(高度3rem)|小号按钮(高度2rem)  默认'nomal'

- um-number-picker 数字选择器
	- v-model: 选择的数字绑定到使用环境的值  number  双向数据绑定
	- max: 可选择的最大值  number|string  *如果最大值设置得小于最小值, 则默认最大值=最小值
	- min: 可选择的最小值  number|string
	- disabled: 是否禁用组件  string|boolean  当有该属性, 或者该属性的值为'true'或者true时, 禁用组件

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