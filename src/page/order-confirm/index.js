/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-30 22:41:15
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm              = require('util/mm.js');
var _order           = require('service/order-service.js');
var _address         = require('service/address-service.js');
var _product         = require('service/product-service.js');
var templateAddress  = require('./address-list.string');
var templateProduct  = require('./product-list.string');
var addressModal     = require('./address-modal.js');
var page = {
	data : {
		selectedAddressId : null
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadAdderssList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		//地址选择
		//思路:document on()
		$(document).on('click','.address-item',function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			//将选择的地址存下来
			_this.data.selectedAddressId = $(this).data('id');
		});
		//订单的提交
		$(document).on('click','.order-submit',function(){
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId : shippingId
				},function(res){
					window.location.href= ('./payment.html?orderNo='+res.orderNo);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips('请选择地址后，然后再提交！！');
			}
		});
		//添加新地址
		$(document).on('click','.address-add',function(){
			addressModal.show({
				isUpdate : false,/*是否是更新*/
				onSuccess: function(){/*成功后的回调函数*/
					_this.loadAdderssList();
				}
			});
		});
		//编辑收货地址
		$(document).on('click','.address-update',function(){
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				addressModal.show({
						isUpdate : true,/*是否是更新*/
						data     : res,
						onSuccess: function(){/*成功后的回调函数*/
							_this.loadAdderssList();
						}
				});
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
		$(document).on('click','.address-delete',function(){
			var shippingId = $(this).parents('.address-item').data('id');
			// console.log(shippingId);
 			_address.deleteAddress(shippingId,function(res){
 				_mm.successTips('删除地址成功！')
 				_this.loadAdderssList();

			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});



	},
	//加载地址列表
	loadAdderssList : function(){
		var _this = this;//缓存当前对象，方便嵌套中调用父对象
		//获取地址列表
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var AddressHtml = _mm.renderHtml(templateAddress,res);
			//放到html容器中
			$('.address-con').html(AddressHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新再试试！！<p/>');
		});

	},
	//处理地址的选中状态
	addressFilter : function(data){
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;
			for(var i = 0,length= data.list.length;i<length;i++){
				if (data.list[i].id === this.data.selectedAddressId) {
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
				//如果之前选中的地址不在列表里，将其删除
				if(!selectedAddressIdFlag){
					this.data.selectedAddressId = null;
				}
			}
		}
	}
	,
	//加载商品列表
	loadProductList : function(){
		var _this = this;//缓存当前对象，方便嵌套中调用父对象
		$('.product-con').html('<div class="loading"></div>');
		//获取地址列表
		_product.getProductList2(function(res){
			var ProductHtml = _mm.renderHtml(templateProduct,res);
			//放到html容器中
			$('.product-con').html(ProductHtml);
		},function(errMsg){
			$('.product-con').html('<p class="err-tip">商品列表好像丢失了，请刷新再试试！！<p/>');
		});

	}
};


// 初始化页面
$(function(){
	page.init();
});