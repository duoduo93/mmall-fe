/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:45:10
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-04-22 13:16:37
* @Email:   1742759884@qq.com
*/

//打包前删除掉dist目录
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const path = require('path');
//处理公用的js
const webpack = require('webpack');
//加载css打包插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//处理html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
			template : './src/view/'+name+'.html',
			filename : 'view/'+name+'.[hash:8].html',
			inject   : true,
			hash     :true,
			chunks   :[name,'commons']
	};
};




//webpack config
var config = module.exports = {
	// entry : './src/page/index/index.js',//单一入口
	entry: {
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/login.js']
	},
	output: {
		path:path.resolve(__dirname,'dist'),
		filename: 'js/[name].[hash:8].js',
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

		//热更新插件
		new webpack.HotModuleReplacementPlugin(),
		//抽取css文件
		new ExtractTextPlugin("css/[name].[hash:8].css"),

		//通过方法处理多个html页面
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		//清楚dist文件夹
		// new CleanWebpackPlugin(),
				
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
				test :/\.(png|jpg|jpeg|gif)$/,
				// loader :"style-loader!css-loader"//加载顺序从右往左
				// loader: 'file-loader',
				loader: 'url-loader',
				options: {
					name:'images/[name].[ext]',
					limit: 8192
				}

			},
		
		],
		
	},

	optimization: {
        splitChunks: {
            cacheGroups: {
                //打包公共模块
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        }
    },
    // watch = true




};

module.exports = config;