import Dropdown from './dropdown.vue'
import Input from './input.vue'

export default {
	install:function(Vue){
		Vue.component('um-dropdown', Dropdown);
		Vue.component('um-input', Input);
	}
}