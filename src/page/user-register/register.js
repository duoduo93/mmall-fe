/*
* @Author: Wang XianPeng
* @Date:   2020-04-26 16:03:12
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-04-30 11:03:40
* @Email:   1742759884@qq.com
*/
'use strict';


require('../common/layout.css');
// alert(module.text);
require('./index.css');
require('node_modules/font-awesome/css/font-awesome.css');
// require('font-awesome-webpack');

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
		//验证username
		$('#username').blur(function(){
			//this指的是$('#username')  val()  取值
			var username = $.trim($(this).val());

			if(!username){
				return ;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username,function(res){
				//验证成功，隐藏掉错误
				formError.hide();
			},function(errMsg){
				//失败 ，显示错误
				formError.show(errMsg);
			}
			);
		});
		//注册按钮点击
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
			username            : $.trim($('#username').val()),
			password            : $.trim($('#password').val()),
			passwordConfirm     : $.trim($('#password-confirm').val()),
			phone               : $.trim($('#phone').val()),
			email               : $.trim($('#email').val()),
			question            : $.trim($('#question').val()),
			answer              : $.trim($('#answer').val())

			},
			validataResult = this.formValidate(formData);
		if (validataResult.status){
			//提交
			_user.register(formData,function(res){
					window.location.href = './result.html?type=register';
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
		//验证用户名是否为空
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		//验证密码是否为空
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码长度是否小于6位
		if (formData.password.length < 6) {
			result.msg = '密码长度不能少于6位';
			return result;
		}
		//验证两次输入的密码石佛一致
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		//验证手机号不能为空
		if (!_mm.validate(formData.phone,'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		//验证邮箱不能为空
		if (!_mm.validate(formData.email,'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		//验证密码提示问题不能为空
		if (!_mm.validate(formData.question,'require')) {
			result.msg = '密码问题不能为空';
			return result;
		}
		//验证密码提示问题答案不能为空
		if (!_mm.validate(formData.answer,'require')) {
			result.msg = '提示问题答案不能为空';
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