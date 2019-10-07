import PageTurn from './templates/pageTurn.vue'
import PageTurnLocal from './templates/pageTurn-local.vue'
import DropDown from './templates/dropdown.vue'
import DropDown1 from './templates/dropdown1.vue'
import DropDown2 from './templates/dropdown2.vue'
import DropDown3 from './templates/dropdown3.vue'
import DropDown4 from './templates/dropdown4.vue'
import TitleDropDown from './templates/titleDropdown.vue'
import TitleDropDown1 from './templates/titleDropdown1.vue'
import TitleDropDown2 from './templates/titleDropdown2.vue'
import TitleDropDown3 from './templates/titleDropdown3.vue'
import TitleDropDown4 from './templates/titleDropdown4.vue'
import Loading from './templates/loading.vue'
import RadioUm from './templates/radio.vue'
import RadioUm1 from './templates/radio1.vue'
import RadioUm2 from './templates/radio2.vue'
import RadioUm3 from './templates/radio3.vue'
import RadioUm4 from './templates/radio4.vue'
import CheckboxUm from './templates/checkbox.vue'
import ShowImages from './templates/showImages.vue'
import ButtonUM from './templates/button.vue'
import ButtonUM1 from './templates/button1.vue'
import ButtonUM2 from './templates/button2.vue'
import ButtonUM3 from './templates/button3.vue'
import ButtonUM4 from './templates/button4.vue'
import ButtonUM5 from './templates/button5.vue'
import ButtonUM6 from './templates/button6.vue'
import ButtonUM7 from './templates/button7.vue'
import ButtonUM8 from './templates/button8.vue'
import ButtonUM9 from './templates/button9.vue'
import TitleInputUM from './templates/titleInput.vue'
import TitleInputUM1 from './templates/titleInput1.vue'
import TitleInputUM2 from './templates/titleInput2.vue'
import TitleInputUM3 from './templates/titleInput3.vue'
import TitleInputUM4 from './templates/titleInput4.vue'
import DateSimple from './templates/dateSimple.vue'
import AlertFrame from './templates/alert.vue'
import AlertFrame1 from './templates/alert1.vue'
import AlertFrame2 from './templates/alert2.vue'
import AlertFrame3 from './templates/alert3.vue'
import AlertFrame4 from './templates/alert4.vue'

import _shrink from './js/_shrink.js'

export default {
	install:function(Vue){
		Vue.component('um-pageturn', PageTurn);
		Vue.component('um-pageturn-local', PageTurnLocal);
		Vue.component('um-dropdown', DropDown);
		Vue.component('um-dropdown1', DropDown1);
		Vue.component('um-dropdown2', DropDown2);
		Vue.component('um-dropdown3', DropDown3);
		Vue.component('um-dropdown4', DropDown4);
		Vue.component('um-title-dropdown', TitleDropDown);
		Vue.component('um-title-dropdown1', TitleDropDown1);
		Vue.component('um-title-dropdown2', TitleDropDown2);
		Vue.component('um-title-dropdown3', TitleDropDown3);
		Vue.component('um-title-dropdown4', TitleDropDown4);
		Vue.component('um-loading', Loading);
		Vue.component('um-radio', RadioUm);
		Vue.component('um-radio1', RadioUm1);
		Vue.component('um-radio2', RadioUm2);
		Vue.component('um-radio3', RadioUm3);
		Vue.component('um-radio4', RadioUm4);
		Vue.component('um-checkbox', CheckboxUm);
		Vue.component('um-showImages', ShowImages);
		Vue.component('um-button', ButtonUM);
		Vue.component('um-button1', ButtonUM1);
		Vue.component('um-button2', ButtonUM2);
		Vue.component('um-button3', ButtonUM3);
		Vue.component('um-button4', ButtonUM4);
		Vue.component('um-button5', ButtonUM5);
		Vue.component('um-button6', ButtonUM6);
		Vue.component('um-button7', ButtonUM7);
		Vue.component('um-button8', ButtonUM8);
		Vue.component('um-button9', ButtonUM9);
		Vue.component('um-title-input', TitleInputUM);
		Vue.component('um-title-input1', TitleInputUM1);
		Vue.component('um-title-input2', TitleInputUM2);
		Vue.component('um-title-input3', TitleInputUM3);
		Vue.component('um-title-input4', TitleInputUM4);
		Vue.component('um-date-simple', DateSimple);
		Vue.component('um-alert', AlertFrame);
		Vue.component('um-alert1', AlertFrame1);
		Vue.component('um-alert2', AlertFrame2);
		Vue.component('um-alert3', AlertFrame3);
		Vue.component('um-alert4', AlertFrame4);

		Vue.prototype._shrink=_shrink;
	}
}