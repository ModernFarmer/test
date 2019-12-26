<template>
<div>
	<input type="text" id="id1" ruleGroup="grp" rule="rule1, rule2" v-model="value1">
	<input type="text" id="id2" ruleGroup="grp" rule="rule2" v-model="value2">
	<input type="text" id="id3" ruleGroup="grp" rule="rule1" v-model="value3">
	<input type="text" id="id4" ruleGroup="grp" rule="rule1, rule3" v-model="value4">
	<input type="text" id="id5" ruleGroup="grp" rule="rule1, rule4" v-model="value5">
</div>
</template>

<script>
let rules={
	rule1(val){ // 空
		if(val===null || val===undefined)return false;
		return !((val+'').replace(/\s+/g, '')==='');
	},
	rule2(val){ // 数字
		return (Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, '')) || Number((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''))===0)?true:false;
	},
	rule3(val){ // 邮箱
		return /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
	},
	rule4(val){ // 手机
		return /^1\d{10}$/.test((val+'').replace(/(?:^\s+)|(?:\s+$)/g, ''));
	}
};

let ruleResults={
	grp:{
		results:[true, true, false, false, true],
		result(){
			let result=true;
			for(let i=0; i<this.results.length; i++){
				if(!this.results[i]){
					result=false;
					break;
				}
			};
			return result;
		}
	},
	grp2:{
		results:[true, true, true, true, true],
		result(){
			let result=true;
			for(let i=0; i<this.results.length; i++){
				if(!this.results[i]){
					result=false;
					break;
				}
			};
			return result;
		}
	}
};

export default {
	data(){
		return {
			value1:'',
			value2:'',
			value3:'',
			value4:'',
			value5:''
		}
	},
	methods:{
		verify(val1, val2){
			let arr=[];
			for(let i=0; i<arguments.length; i++){
				arr.push(ruleResults[arguments[i]].result);
			};
			let ok=true;
			for(let i=0; i<arr.length; i++){
				if(!arr[i]){
					ok=false;
					break;
				}
			};
			return ok;
		}
	},

		/*--------------------------------------  libs  --------------------------------------------*/

	props:[],
	data(){
		return {
			
		};
	},
	methods:{

	},
	mounted:function(){

	}
}
</script>