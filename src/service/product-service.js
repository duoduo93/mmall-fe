/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-17 17:45:28
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    //获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;