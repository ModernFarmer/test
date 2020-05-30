module.exports={
	publicPath:'/',  // 根路径
	outputDir:'dist', // 输出目录
	assetsDir:'static',  // 静态资源目录
	indexPath:'index.html', // 打包时index.html生成的目录(相对于outputDir)
	devServer:{ // 开发环境配置
		open:true,  // npm run serve时是否自动打开浏览器, 默认false(不打开)
		host:'127.0.0.1',  // 主机名字
		port:8384, // 端口号
		proxy:{
			'^/':{
				target:'http://devwww.lotsmall.cn',
				ws:false, // 是否要代理websocket
				changeOrigin:true, // true:可跨域
				pathRewrite:{
					'^/':'/'
				}
			}
		}
	}
}