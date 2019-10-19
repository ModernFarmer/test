const express=require('express');
const bodyParser=require('body-parser');
const multiparty=require('multiparty');
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

let xing=['张', '李', '宋', '郑', '章', '詹', '周', '赖', '林', '凌', '申', '杜', '王'];
let text=['津','韵','诚','斌','广','成','峰','健','英','功','冬','锦','立','正','禾','平','旭','豪','源','安','顺','帆','向','雄','希','风','林','奇','易','咏','岩','启','坤','昊','朋','纪','艺','昭','威','奎','帅','星','章','高','伦','庭','蔚','益','牧','钊','洲','家','迎','景','珂','策','皓','栋','越','盛','钧','亿','基','纶','维','齐','毅','贤','卫','臻','儒','霖','隆','远','聪','耀','誉','继','哲','舜','钦','琛','金','彰','亭','泓','蒙','祥','意','鑫','朗','晟','晔','融','谋','宪','励','璟','骏','垒','尚','镇','济','韬','议','曦','奕','泰','泊','跃','韦','骁','俊','沣','骅','歌','畅'];
let sex=[1,2];
let age=[];
for(let i=18, i<50; i++){
    age.push(i);
};

for(let i=0; i<100; i++){
    let baseNum=Math.random();
    let index_xing=Math.floor(baseNum*xing.length);
    let index_text=Math.floor(baseNum*text.length);
    let index_sex=Math.floor(baseNum*sex.length);
    let index_age=Math.floor(baseNum*age.length);
    let json={
        name:xing[index_xing]+text[index_text],
        sex:sex[index_sex],
        age:age[index_age]
    };
}

app.get('/demo', async (req, res)=>{
	
});
app.post('/demo', async (req, res)=>{
	
});
