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
	}
}