/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-22 08:10:56
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _order = {

	//获取订单列表
	getOrderList : function(PageInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/list.do'),
			data    : PageInfo,
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
	

};

module.exports = _order;