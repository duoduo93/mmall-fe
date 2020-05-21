/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-20 23:29:35
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _cart = {

	//获取收货地址
	getAddressList : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/shipping/list.do'),
			data    :{
				pageSize : 50
			},
			success : resolve,
			error   :reject
		});
	},
	//获取单个收获地址
	getAddress : function(shippingId,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/shipping/select.do'),
			data    :{
				shippingId  : shippingId
			},
			success : resolve,
			error   :reject
		});
	},
	//保存收货地址
	saveAddress : function(addressInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/shipping/add.do'),
			data    :addressInfo,
			success : resolve,
			error   :reject
		});
	},
	updateAddress : function(addressInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/shipping/update.do'),
			data    :addressInfo,
			success : resolve,
			error   :reject
		});
	},
	deleteAddress : function(shippingId,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/shipping/delete.do'),
			data    :{
				shippingId : shippingId
			},
			success : resolve,
			error   :reject
		});
	}
	

};

module.exports = _cart;