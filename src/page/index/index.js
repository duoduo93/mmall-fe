/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:54:19
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-29 23:15:55
* @Email:   1742759884@qq.com
*/
// var cats = require('./cats.js');
// 'use strict';
// var $$ = require('jquery');

// console.log('hello index');
// $$('body').html('index hello333');
// console.log($);


// var module = require('../common/module.js');
require('../common/index.js');
require('../common/nav/index.js');
require('./index.css');
require('util/slider/index.js');

var templeBannder = require('./banner.string');
var _mm           = require('util/mm.js');

$(function() {
	var bannerHtml = _mm.renderHtml(templeBannder);
	$('.banner-con').html(bannerHtml);
    $('.banner').unslider();
});

