
var webpack = require('webpack');
//__dirname是node.js中的一个全局变量，它指向当前执行脚本的所在目录
module.exports = {
	entry:__dirname+"/src/main.js",//唯一入口文件
	output:{//输出目录
		path: __dirname+'/build',//打包后的js文件存放的地方
		filename:'bundle.js'//打包后输出的js文件名
	},
	//webpack-dev-server配置
	devServer: {
		contentBase:'./build',//默认webpack-dev-server会为根文件夹提供本地服务器，自定义目录为./build
		historyApiFallback:true,//在开发单页应用的时候非常有用，它依赖于HTML6 historyAPI 如果设置为true,所有的跳转都执行index.html
		port:80//设置默认端口号，如果省略，默认为8080
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()//热模块替换插件
	]

};