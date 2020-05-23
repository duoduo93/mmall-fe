/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:45:10
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-22 19:26:35
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
			filename : 'view/'+name+'.html',
			inject   : true,
			hash     :true,
			chunks   :[name,'commons']
	};
};




//webpack config
var config = module.exports = {
	// entry : './src/page/index/index.js',//单一入口
	entry: {
		'common'             : ['./src/page/common/index.js'],
		'index'              : ['./src/page/index/index.js'],
		'result'             : ['./src/page/result/index.js'],
		'user-login'         : ['./src/page/user-login/login.js'],
		'user-register'      : ['./src/page/user-register/register.js'],
		'user-pass-reset'    : ['./src/page/user-pass-reset/reset.js'],
		'user-center'        : ['./src/page/user-center/index.js'],
		'user-center-update' : ['./src/page/user-center-update/index.js'],
		'user-pass-update'   : ['./src/page/user-pass-update/index.js'],
		'list'               : ['./src/page/list/index.js'],
		'detail'             : ['./src/page/detail/index.js'],
		'cart'               : ['./src/page/cart/index.js'],
		'order-confirm'            : ['./src/page/order-confirm/index.js'],
		'order-list'         : ['./src/page/order-list/index.js'],
		'order-detail'         : ['./src/page/order-detail/index.js'],
		'payment'         : ['./src/page/payment/index.js']


	},
	output: {
		path:path.resolve(__dirname,'dist'),
		filename: 'js/[name].[hash:8].js',
		


		// filename: 'bundle.js',
		// publicPath : '/',
		// chunkFilename: '[name].js'
		// hash:true
	},
	devtool : 'inline-source-map', //加载对应配置
	//加载外部模块
	externals: {
		'jquery' :'window.jQuery'
	},
	devServer : {
		historyApiFallback: true,
		inline : true,
		hot : true,
		port : 8080,
	},
	plugins: [

		//热更新插件
		 new webpack.HotModuleReplacementPlugin(),
		//抽取css文件
		new ExtractTextPlugin("css/[name].[hash:8].css"),

		//通过方法处理多个html页面
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center','用户个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人信息更新')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
		new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页面')),
		new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
		
		
		
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
					limit: 50000
				}

			},
			{
				test: /\.(svg|ttf|eot|woff|woff2)\??.*$/,
				loader: 'file-loader?name=/dist/fonts/[name].[ext]',
			},
			{ test: /\.string$/, loader:'html-loader'}

			// {
			// 	test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
			//  	loader: 'url-loader?limit=50000&name=[path][name].[ext]'
			//  	// loader: 'url-loader?limit=50000&name=/dist/fonts/[name].[ext]'

			// }
		
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
    //配置别名
    resolve : {
    	alias : {
    		util    : __dirname +"/src/util",
    		page    : __dirname +"/src/page",
    		images  : __dirname +"/src/images",
    		service : __dirname +"/src/service",
    		node_modules   : __dirname +"/node_modules",
    	}
    },
    // watch = true




};

module.exports = config;