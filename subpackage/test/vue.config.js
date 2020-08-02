module.exports={
	publicPath:'/',  // 根路径
	outputDir:'dist', // 输出目录
	assetsDir:'static',  // 静态资源目录
	indexPath:'index.html', // 打包时index.html生成的目录(相对于outputDir)
	devServer:{ // 开发环境配置
		open:true,  // npm run serve时是否自动打开浏览器, 默认false(不打开)
		host:'127.0.0.1',  // 主机名字
		port:8080, // 端口号
		https:false, // 是否使用https协议, 默认false(不使用)
		hotOnly:false, // 是否启用热更新, 默认false(不启用), webpack已经提供热更新, 所以这里直接false就好
		/*proxy:{ // 代理设置
			'^/':{
				target:'http://127.0.0.1:8888',
				ws:false, // 是否要代理websocket
				changeOrigin:true, // true:可跨域
				pathRewrite:{
					'^/':'/'
				}
			}
		}*/
	},
	lintOnSave: false, // true: 打开eslint验证    false: 取消eslint验证
	// transpileDependencies: [/(?:[/\\]node_modules[/\\].?umax@.*[/\\])|(?:[/\\]node_modules[/\\]umax[/\\])/]
}