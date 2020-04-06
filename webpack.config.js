var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
// 	entry :'./src/page/index/index.js',
// 	output:{
// 		path:path.resolve(__dirname,'./dist'),
// 		filename:'app.js'
// 	}
// };

// var webpack = require('webpack');
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
			template :'./src/view/'+'.html',
			filename:'view/'+name+'.html',
			inject:true,
			hash:true,
			trunks:['common',name]
	}
};
var config = {
	entry:{
		'index':['./src/page/index/index.js'],
		'login':['./src/page/login/login.js']
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		// filename:'app.js'
		// filename:'[name].js'//打包成原文件名.js
		filename:'js/[name].js'//指定打包文件输出路径
	},
	externals:{
		'jquery':'window.jQuery'
	},
	// plugins: [
	// 	new webpack.optimization.splitChunks({
	// 		name : 'commons',
	// 		filename : 'js/base.js'
	// 	})
	// ]
	// 独立打包通用模块
	optimization:{
		splitChunks:{
			cacheGroups:{
				commons:{
					name:'commons',
					chunks:'initial',
					minChunks:2
					// filename:'js/base.js'
				}
			}
		}
	},
	plugins:[
		//把css单独打包到文件里
		new ExtractTextPlugin('css/[name].css'),
		//html模板的处理
		// new HtmlWebpackPlugin({
		// 	template :'./src/view/index.html',
		// 	filename:'view/index.html',
		// 	inject:true,
		// 	hash:true,
		// 	trunks:['common','index']
		// }) 

	]
	
		
	
};
module.exports = config;
