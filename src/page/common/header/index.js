/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 09:32:26
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-03 11:02:08
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在，则会填入输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});

	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword 正常跳转到list页
		if (keyword) {
			window.locaiton.href="./list.html?keyword="+keyword;
		}
		//如果keyword为空 直接返回首页
		else{
			_mm.goHome();
		}
	}
};

header.init();