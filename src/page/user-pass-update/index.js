/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:54:19
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-05 16:55:29
* @Email:   1742759884@qq.com
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
// var templateIndex = require('./index.string');
require('../common/layout.css');
// alert(module.text);

var _mm = require('util/mm.js');
require('node_modules/font-awesome/css/font-awesome.min.css');


//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);

			
			if (validateResult.status) {
				//更改用户密码
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res){
					_mm.successTips(res.msg);
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	onLoad  : function(){

		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});

	},

//表单字段的验证方法
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		
		//验证原密码是否为空
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码长度
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度不能小于6位';
			return result;
		}
		//验证两次密码是否一致
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次密码不一致';
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