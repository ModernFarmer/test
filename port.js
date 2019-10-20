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

app.get('/demo', async (req, res)=>{
    let sql=`SELECT * FROM baseInfo WHERE id<10`;

    db.select(sql).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({ok:false, msg:'Oh, no!'});
    });
});

app.post('/demo', async (req, res)=>{
    let sql=`SELECT * FROM baseInfo WHERE id>10 AND id<20`;

    db.select(sql).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({ok:false, msg:'Oh, no!'});
    });
});