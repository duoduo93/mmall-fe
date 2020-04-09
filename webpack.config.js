/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:45:10
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-04-09 02:48:28
* @Email:   1742759884@qq.com
*/

//打包前删除掉dist目录
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");

//处理公用的js
var webpack = require('webpack');
//加载css打包插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//处理html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
			template : './src/view/'+name+'.html',
			filename : 'view/'+name+'.html',
			inject   : true,
			hash     :true,
			chunks   :['common',name]
	};
};



//webpack config
var config = module.exports = {
	// entry : './src/page/index/index.js',//单一入口
	entry: {
		'index' : ['./src/page/index/index.js'],
		'loign' : ['./src/page/login/login.js']
	},
	output: {
		path:__dirname+ '/dist',
		filename: 'js/[name].js',
		// publicPath : '/',
		// chunkFilename: '[name].js'
		// hash:true
	},
	//加载外部模块
	externals: {
		'jquery' :'window.jQuery'
	},
	devServer : {
		historyApiFallback: true,
		inline : true,
	},
	plugins: [
		//抽取公共js
		//已经过时了，替换成splitChunks里执行
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name : 'commons',
		// 	filename : 'js/base.js'
		// })
		
		//热更新插件
		new webpack.HotModuleReplacementPlugin(),
		//抽取css文件
		new ExtractTextPlugin("css/[name].css"),

		//通过方法处理多个html页面
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		//清楚dist文件夹
		// new CleanWebpackPlugin(),
		
		// new HtmlWebpackPlugin({
		// 	template : './src/view/index.html',
		// 	filename : 'view/index.html',
		// 	inject   : true,
		// 	hash     :true,
		// 	chunks   :['common','index']
		// }),
	],
	module :{
		rules: [
			{   //css打包
				test :/\.css$/,
				// loader :"style-loader!css-loader"//加载顺序从右往左
				use: ExtractTextPlugin.extract({
					fallback :"style-loader",
					use:"css-loader"
				})
			},
			{   //图片打包
				test :/\.png|jpg|jpeg|gif$/,
				// loader :"style-loader!css-loader"//加载顺序从右往左
				use: [
					{
						loader:"url-loader",
						options: {
							name :"[name]-[hash:5].min.[ext]",
							limit:20000,//size<=20kb
							publicPath: "static/",
							outputPath: "static/"

						}
					},
					{	//图片压缩
						loader:"img-loader",
						options: {
							plugins : [
								require("imagemin-pngquant")({
									quality: "80" //the quality of zip
								})
							]
						}
					},
				]
			}
		],
		// plugins:[ExtractTextPlugin]
	},

	 optimization: {
	    splitChunks: {
	      chunks:'initial',//只对入口文件处理
	      cacheGroups: {
	            commons: {
	            	test:/common\//,
		          name: 'commons',//打包后的文件名
		          chunks: 'initial',
		          minChunks: 2,//重复2次才能打包到此模块
		     	}
		     	// commons: {
		      //     name: 'commons',//打包后的文件名
		      //     chunks: 'initial',
		      //     minChunks: 2,//重复2次才能打包到此模块
		     	// },
        		

      	  }

	    }
	 }




};

module.exports = config;