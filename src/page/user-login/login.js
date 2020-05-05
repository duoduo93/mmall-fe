/*
* @Author: WangXianPeng
* @Date:   2020-04-08 17:26:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-05 11:08:28
* @Email:   1742759884@qq.com
*/
require('../common/layout.css');
// require('../common/header/header.css');
// alert(module.text);
require('./index.css');
require('node_modules/font-awesome/css/font-awesome.min.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误信息
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('error-item').hide().find('.err-msg').text('');
	}

};

// page逻辑部分
var page ={
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//登录按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车键 也会进行提交
		$('#user-content').keyup(function(e){
			//keyCode === 13 表示回车键
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val()),
			},
			//表单验证结果
			validataResult = this.formValidate(formData);
		//验证成功
		if (validataResult.status){
			//提交
			_user.login(formData,function(res){
					window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},
			function(errMsg){
				formError.show(errMsg);
			}
			);

		}
		//验证失败
		else{
			//错误提示
			formError.show(validataResult.msg);
		}

	},
	//表单字段的验证方法
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});