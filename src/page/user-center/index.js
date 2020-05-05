/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:54:19
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-05 11:46:40
* @Email:   1742759884@qq.com
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');

var templateIndex = require('./index.string');
require('../common/layout.css');
// alert(module.text);

var _ss = require('util/mm.js');
require('node_modules/font-awesome/css/font-awesome.min.css');


//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
	},
	onLoad  : function(){

		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});

		//加载用户个人信息
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		_user.getUesrInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},

		function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};
$(function(){
	page.init();
});