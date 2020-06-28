import Message from './Message.vue';
import Loading from './Loading.vue';
import Button from './Button.vue'
import Modal from './Modal.vue'
import NumberPicker from './NumberPicker.vue'
import Input from './Input.vue'
import Row from './Row.vue'
import RowLeft from './RowLeft.vue'
import RowMiddle from './RowMiddle.vue'
import RowRight from './RowRight.vue'
import DateVue from './Date.vue'
import Area from './Area.vue'
import ScrollLoad from './ScrollLoad.vue'
import Confirm from './Confirm.vue'

let umJson={
	_uobj_zIndex_selectInside:9999999  // um-select组件的z-index公共层级, 随着调用组件次数的增加递增
};

export default {
	install:function(Vue){
		require('./um_css.css');  // 引入全局组件的公用样式

		Vue.component('um-button', Button);
		Vue.component('um-modal', Modal);
		Vue.component('um-number-picker', NumberPicker);
		Vue.component('um-input', Input);
		Vue.component('um-row', Row);
		Vue.component('row-left', RowLeft);
		Vue.component('row-middle', RowMiddle);
		Vue.component('row-right', RowRight);
		Vue.component('um-date', DateVue);
		Vue.component('um-area', Area);
		Vue.component('um-scroll-load', ScrollLoad);
		Vue.component('um-confirm', Confirm);

		Vue.prototype._$UMSTORE=umJson;

		let obj=Vue.extend(Message);
		Vue.prototype.$Alert=function(msg){
			let id='___um_menu_Box'+Math.ceil(Math.random()*100000000);
			let dom=document.createElement('div');
			document.body.appendChild(dom);
			let vm=new obj({
				propsData:{msg, id}
			}).$mount(dom);
			setTimeout(()=>{
				document.body.removeChild(eval(id));
			}, 2100);
		};
		Vue.prototype.$Loading={
			run(){
				um__loading__container_id.style.opacity=1;
				um__loading__container_id.style.zIndex=99999999;
			},
			stop(){
				um__loading__container_id.style.opacity=0;
				um__loading__container_id.style.zIndex=-2;
			}
		};

		let dom_loading=document.createElement('div');
		dom_loading.id='um__loading__container_id';
		document.body.appendChild(dom_loading); // 添加全局loading组件的外框元素节点

		let LD=Vue.extend(Loading);
		let dom_replace_loading=document.createElement('div');
		um__loading__container_id.appendChild(dom_replace_loading);
		new LD({el:dom_replace_loading});
	}
}