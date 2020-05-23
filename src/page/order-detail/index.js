/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-23 12:24:47
* @Email:   1742759884@qq.com
*/
'use strict';
//引入外部文件部分
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide       = require('page/common/nav-side/index.js');/*侧边导航*/
var _mm           = require('util/mm.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');


var page = {
	data : {
		orderNo : _mm.getUrlParam('orderNo')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.cancel-btn',function(){
			_this.cancelOrder();
		});
		$(document).on('click','.pay-btn',function(){
			var status = $('.pay-status').data('status'),
				orderNo = _this.data.orderNo;
			console.log(status);
			if (status === 20) {
				alert('您已支付过订单，请不要重复支付，稍后页面会跳转到订单页面');
				window.location.href= "./order-list.html";
			}else{
				window.location.href= "./payment.html?orderNo="+orderNo;
			}
			
		});
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		this.loadDetail();
	},
	loadDetail : function(){
		var  _this          = this,
			orderDetailHtml = '',
			$content        = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(_this.data.orderNo,function(res){
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);
		},function(errMsg){
			$content.html('<p class="err-tip">'+errMsg+'</p>')
		});
	},
	//取消订单
	cancelOrder : function(){
		var _this = this,
			orderNo = this.data.orderNo;
		_order.cancelOrder(orderNo,function(res){
			_mm.successTips(res);
			_this.loadDetail();
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
	
};


// 初始化页面
$(function(){
	page.init();
});