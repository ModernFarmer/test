import AppData from './App.js'

// module 列表
import PageTurnList from './components/p01_pageTurnList/p1.vue';

// Template API 列表
import PageTurn from './components/api_01_pageTurn.vue';
import PageTurnLocal from './components/api_02_pageTurn_local.vue';
import Dropdown from './components/api_03_dropdown.vue';
import TitleDropdown from './components/api_04_title_dropdown.vue';
import Loading from './components/api_05_loading.vue';
import RadioVue from './components/api_06_radio.vue';
import CheckboxVue from './components/api_07_checkbox.vue';
import ShowImages from './components/api_08_showImages.vue';
import ButtonVue from './components/api_09_button.vue';
import TitleInput from './components/api_10_title_input.vue';
import DateSimple from './components/api_11_date_simple.vue';
import AlertVue from './components/api_12_alert.vue'

// Method API 列表
import _Shrink from './components/method_01_shrink.vue'

export default function(obj, fn){
	if(AppData.showType=='Modules' && obj.turnTo==AppData.list[0])return fn(PageTurnList);

	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[0])return fn(PageTurn);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[1])return fn(PageTurnLocal);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[2])return fn(Dropdown);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[3])return fn(TitleDropdown);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[4])return fn(Loading);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[5])return fn(RadioVue);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[6])return fn(CheckboxVue);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[7])return fn(ShowImages);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[8])return fn(ButtonVue);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[9])return fn(TitleInput);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[10])return fn(DateSimple);
	if(AppData.showType=='TemplateAPI' && obj.turnTo==AppData.list[11])return fn(AlertVue);

	if(AppData.showType=='MethodAPI' && obj.turnTo==AppData.list[0])return fn(_Shrink);
}