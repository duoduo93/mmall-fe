/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-06-03 10:39:37
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _payment = {

	//获取订单列表
	getPaymentInfo : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/order/pay.do'),
			data    : {
				orderNo : orderNo
			},
			success : resolve,
			error   :reject
		});
	},
	//获取订单状态  5s一次发起请求
	getPaymentStatus : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/api/order/query_order_pay_status.do'),
			data    : {
				orderNo : orderNo
			},
			success : resolve,
			error   :reject
		});
	}

};

module.exports = _payment;