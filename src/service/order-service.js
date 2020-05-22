/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-22 18:27:43
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _order = {

	//获取订单列表
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/list.do'),
			data    : listParam,
			success : resolve,
			error   :reject
		});
	},
	//提交订单
	createOrder : function(orderInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/create.do'),
			data    : orderInfo,
			success : resolve,
			error   :reject
		});
	},
	getOrderDetail : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/detail.do'),
			data    : {
				orderNo : orderNo
			},
			success : resolve,
			error   :reject
		});
	},
	cancelOrder : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/cancel.do'),
			data    : {
				orderNo : orderNo
			},
			success : resolve,
			error   :reject
		});
	}
	
	

};

module.exports = _order;