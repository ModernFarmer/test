//Used in the latest version of 'vue-cli'

export default {
	data(){
		return {
			arr:[1,2,3,4,5];
		}
	},
	watch:{
		arr:function(newData, oldData){
                         console.log(`newData : ${newData} , newData : ${oldData}`);
                      //When the 'ClickAnElement' method is executed, the print result is: newData : [1,2,3,4,5,6] , oldData : [1,2,3,4,5,6]
                                       //Not the intended result newData : [1,2,3,4,5,6] , oldData : [1,2,3,4,5]
                }
	},
	methods:{
		ClickAnElement:function(){
                         this.arr.push(6);
                }
	}
};
