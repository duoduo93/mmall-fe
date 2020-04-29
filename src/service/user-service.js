/*
* @Author: Wang XianPeng
* @Date:   2020-04-23 19:24:47
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-04-29 17:10:13
* @Email:   1742759884@qq.com
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
	//用户登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/login.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		}); 
	},

	//登出
		logout : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/logout.do'),
			method  : 'POST',
			success : resolve,
			error   : reject
		}); 
	},

	//检查用户名
		checkUsername : function(username,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/check_valid.do'),
			data    : {
				type  : 'username',
				str   : username
			},
			method  : 'POST',
			success : resolve,
			error   : reject
		}); 
	},

	//用户注册
	register : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/register.do'),
			data    : userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		}); 
	},
	

}
module.exports = _user;