/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-06-01 01:17:25
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _cart = {

	//获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/get_cart_product_count.do'),
			success : resolve,
			error   :reject
		});
	},
	//获取购物车列表
	getCartList : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/list.do'),
			success : resolve,
			error   :reject
		});
	},
	selectProductId : function(productId,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/select.do'),
			data    :{
				productId : productId
			},
			success : resolve,
			error   :reject
		});
	},
	unselectProductId : function(productId,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/un_select.do'),
			data    :{
				productId : productId,
			},
			success : resolve,
			error   :reject
		});
	},
	selectAllProduct : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/select_all.do'),
			success : resolve,
			error   :reject
		});
	},
	unselectAllProduct : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/un_select_all.do'),
			success : resolve,
			error   :reject
		});
	},
	//更新商品的数量
	productUpdate : function(productInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/update.do'),
			data    : productInfo,
			success : resolve,
			error   :reject
		});
	},
	deleteProductIds : function(productIds,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/delete_product.do'),
			data    : {
				productIds :productIds
			},
			success : resolve,
			error   :reject
		});
	},
	//添加到购物车
	addCart : function(productInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/cart/add.do'),
			data    : productInfo,
			success : resolve,
			error   :reject
		});
	},


};

module.exports = _cart;