const express=require('express');
const bodyParser=require('body-parser');
const async4mysql=require('async4mysql');

const app=express();
const port=8888;
app.listen(port, function(){
	console.log('---------------- > node服务已开启, 接口: '+port+' !');
});

app.all('*',function (req, res, next) {                   //使服务可被跨域请求
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    };
});

app.use(bodyParser.urlencoded({extended:false}));

const db=new async4mysql({
	host:'localhost',
	user:'root',
	port:3306,
	password:'123456',
	database:'demo'
});

app.post('/list', async (req, res)=>{
	// 所需参数: valueName(模拟的值的名称, 可选, [anything]); query(查询id条件, 可选, [anything]); onePage(每页条数, 必选, [number|numberString]); pageNow(当前页数, 必选, [number|numberString])
	let valueName=req.body.valueName?req.body.valueName:null;  // 模拟的值的名称
	let onePage=req.body.onePage?req.body.onePage:null;  // 翻页:每页数据量
	let pageNow=req.body.pageNow?req.body.pageNow:null;  // 翻页:第几页
	let query=req.body.query?`AND id='${req.body.query}'`:'';  // 搜索条件

	let result_f={ok:true, data:''};

	if(!onePage || !pageNow){
		result_f.ok=false;
		result_f.data='缺少翻页参数!';
		res.json(result_f);
	}else if(!/^[1-9][0-9]?$/.test(onePage) || !/^[1-9][0-9]?$/.test(pageNow)){
		result_f.ok=false;
		result_f.data='翻页参数错误!';
		res.json(result_f);
	}else{
		let sql='';
		let result=[];

		// 获取所有需要的查询语句, 并整理成{sql:'...'}的格式, 配合async4mysl模块的.entire()方法使用
		let sql_joinArr=`SELECT CONCAT('SELECT * FROM text_list_value WHERE listId=', id, ' ORDER BY id+0 ASC') AS 'sql' FROM text_list WHERE TRUE ${query} ORDER BY id+0 ASC LIMIT ${Math.ceil(onePage)*(Math.ceil(pageNow)-1)},${Math.ceil(onePage)}`;

		let sqlArr=await db.select(sql_joinArr).catch(err=>{
			console.log('ERROR=====> 接口: \'/list\', sql: '+sql_joinArr+' !');
		});

		if(!sqlArr){
			result_f={ok:false, data:'无法连接数据库!'};
			res.json(result_f);
		}else{
			// 将主列表语句整理成{sql:'...'}的格式并添加到sqlArr中
			if(valueName){
				sqlArr.push({sql:`SELECT CONCAT('${valueName} : ', value1) AS value1,value2,value3,value4 FROM text_list WHERE TRUE ${query} ORDER BY id+0 ASC LIMIT ${Math.ceil(onePage)*(Math.ceil(pageNow)-1)},${Math.ceil(onePage)}`});
				sqlArr.push({sql:`SELECT COUNT(*) AS total FROM text_list`});
			}else{
				sqlArr.push({sql:`SELECT * FROM text_list WHERE TRUE ${query} ORDER BY id+0 ASC LIMIT ${Math.ceil(onePage)*(Math.ceil(pageNow)-1)},${Math.ceil(onePage)}`});
				sqlArr.push({sql:`SELECT COUNT(*) AS total FROM text_list`});
			};

			// 通过async4mysql模块的.entire()方法异步执行查询sqlArr中的所有语句
			let listArr=await db.entire(...sqlArr).catch(err=>{
				console.log('ERROR=====> 接口: \'/list\', sql: '+JSON.stringify(sqlArr)+' !');
			});

			let total=listArr.pop()[0].total;
			result=listArr.pop();

			// 添加list数据到主列表数据中
			result.forEach((val, i, arr)=>{
				arr[i].list=listArr[i];
			});

			result_f.total=total;
			result_f.data=result;
			res.json(result_f);
		};
	};
});