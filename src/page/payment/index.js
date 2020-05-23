/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-23 13:06:24
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');
var page = {
	data : {
   		orderNo : _mm.getUrlParam('orderNo')
    },
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadPayment();
	},
	loadPayment : function(){
		var _this        = this,
			paymentHtml  = '',
			$pageWrap    = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNo,function(res){
			_this.listenOrderStatus();
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
		});
	},
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNo,function(res){
				if (res == true) {
					window.location.href = ('./result.html?type=payment&orderNo='+_this.data.orderNo);
				}
			});
		},5e3);//每5s监听一次
	}

	
};


// 初始化页面
$(function(){
	page.init();
});