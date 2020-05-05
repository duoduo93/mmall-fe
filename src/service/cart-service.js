/*
* @Author: Wang XianPeng
* @Date:   2020-05-03 11:36:09
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-05 10:39:04
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm = require('util/mm.js');

var _cart = {

	//获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error   :reject
		});
	}

};

module.exports = _cart;