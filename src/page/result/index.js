/*
* @Author: Rosen
* @Date:   2017-05-19 21:52:46
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-23 13:03:58
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
        if(type === 'payment'){
        	var orderNo  =  _mm.getUrlParam('orderNo'),
        		$orderNo = $element.find('.orderNo');
        	$orderNo.attr('href',$orderNo.attr('href')+orderNo);
        }
    // 显示对应的提示元素
    $element.show();
})