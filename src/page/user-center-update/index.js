/*
* @Author: WangXianPeng
* @Date:   2020-04-08 16:54:19
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-05 15:21:11
* @Email:   1742759884@qq.com
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
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
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			//成功  给一个成功提示信息 然后跳转到user-center页面
			if (validateResult.status) {
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg);
					window.location.href = "./user-center.html";
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
			name : 'user-center'
		});

		//加载用户个人信息
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},

		function(errMsg){
			_mm.errorTips(errMsg);
		});
	},

//表单字段的验证方法
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		
		//验证手机号不能为空
		if (!_mm.validate(formData.phone,'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		//验证邮箱格式是否正确
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