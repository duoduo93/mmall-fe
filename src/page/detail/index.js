/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-30 22:11:18
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');
var page = {
	data : {
		productId : _mm.getUrlParam('productId') || '',
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//如果没有传productId  自动跳转到首页
		if (!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent : function(){
		var _this   = this,
			$pCount = 1;
		//增加
		$(document).on('click','.plus',function(){
			//当前数量，然后+1
			$pCount = parseInt($('.p-count').val())+1;
			$('.p-count').val($pCount);

		});
		//减少
		$(document).on('click','.minus',function(){
			//当前数量，然后+1
			if ($pCount>1) {
				$pCount = $('.p-count').val()-1;
			}
			$('.p-count').val($pCount);

		});
		//加入到购物车
		$(document).on('click','.cart-add',function(){
			var productInfo = {
				count     : $('.p-count').val(),
				productId : _this.data.productId
			};
			_cart.addCart(productInfo,function(res){
				 window.location.href = './result.html?type=cart-add';
			},function(errMsg){
				_mm.errorTips(errMsg);
			});

		});


	},
	// 加载商品详情信息
	loadDetail : function(){
		
		var _this = this,
			html = '',
			pageWrap = $('.page-wrap');
		pageWrap.html('<div class="loading"></div>');
		//请求Detail信息
		_product.getProductDetail(this.data.productId,function(res){
			_this.filter(res);
			html = _mm.renderHtml(templateIndex,res);
			pageWrap.html(html);
		},function(errMsg){
			pageWrap.html('<p class="err-tip">出错了，商品不见了！</p>');
		});
	},
	//数据匹配
	filter: function(data){
		data.subImages = data.subImages.split(',');
	},
};


// 初始化页面
$(function(){
	page.init();
});