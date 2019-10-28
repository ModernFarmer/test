const express=require('express');
const bodyParser=require('body-parser');
const async4mysql=require('async4mysql');
const multiparty=require('multiparty');
const fs=require('fs');

const app=express();
const port=8888;
app.listen(port, function(){
    console.log('---------------- > node服务已开启, 接口: '+port+' !');
});

app.all('*',function (req, res, next) {                   //使服务可被跨域请求
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH, HEAD');
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    };
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const db=new async4mysql({
    host:'localhost',
    user:'root',
    port:3306,
    password:'123456',
    database:'demo'
});

app.get('/demo', async (req, res)=>{
    console.log(req.query)
    let sql=`SELECT * FROM baseInfo WHERE id<10`;

    db.select(sql).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({ok:false, msg:'Oh, no!'});
    });
});

app.post('/demo', async (req, res)=>{
    console.log(req.body)
    let sql=`SELECT * FROM baseInfo WHERE id>10 AND id<20`;

    db.select(sql).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({ok:false, msg:'Oh, no!'});
    });
});

app.post('/file', async (req, res)=>{
    let form=new multiparty.Form({
        encoding:'utf-8',           //定义编码, 默认为utf-8
        uploadDir:'./upload',       //定义文件上传到服务器的文件夹路径 *必须在服务器手动添加路径,multiparty不会自动生成相应路径
        maxFilesSize:20*1024*1024,   //限定单个文件的大小, 默认为无穷大
        maxFields:1000,             //限定最大文件数, 默认为1000
        maxFieldsSize:2*1024*1024   //限定所有文件上传时所占用的内存, 默认为2M
    });

    form.parse(req, function(err, fields, files){     //上传完成后执行        fields:字段信息     files:文件信息
        if(err){
            res.json({ok:'失败!'});
        }else{
            console.log(fields)
            console.log(files)

            res.json({ok:true});
            /*fs.rename(oldPath, newPath);            //重命名接收到的文件
            res.json({ok:'成功!'});*/
        };
    });
});

app.put('/put/:id', async (req, res)=>{
    console.log(req.params)
    res.json({msg:'sdfsdfsdf'});
});

app.patch('/patch', async (req, res)=>{
    console.log(req.query)
    console.log(req.body)
    res.json('Oh! Year~');
});

app.delete('/delete', async (req, res)=>{
    console.log(req.body)
    res.json('Oh! Year~');
})
