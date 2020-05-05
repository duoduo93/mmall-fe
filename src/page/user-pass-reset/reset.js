/*
* @Author: WangXianPeng
* @Date:   2020-04-08 17:26:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-02 12:01:32
* @Email:   1742759884@qq.com
*/
require('../common/layout.css');
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
		$('.error-item').hide().find('.err-msg').text('');
	}

};

// page逻辑部分
var page ={
	data : {
		username : '',
		question : '',
		answer   : '',
		token    : '',
		username1 : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad    : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名的按钮点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//用户名存在
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				}

				);
			}
			//用户名不存在
			else{
				formError.show('请输入用户名');

			}
			
		});
		//输入提示问题答案的按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			//密码提示问题答案存在
			if (answer) {
				//检查密码提示问题答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token  = res;

					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				}

				);
			}
			//用户名不存在
			else{
				formError.show('请输入密码提示问题答案');
			}
			
		});
			//输入新密码后的按钮点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			//密码是否为空
			if (password  && password.length >= 6) {
				//检查新密码并提交
				_user.resetPassword({
					username      : _this.data.username,
					passwordNew   : password,
					forgetToken   : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				}

				);
			}
			//密码不存在
			else{
				formError.show('请输入不少于6位的新密码');
			}
			
		});

	
	},
	
	//加载输入用户名的一步
	loadStepUsername : function(){
		//清除错误提示
		$('.step-username').show();
		
	},

	//加载输入问题的一步
	loadStepQuestion : function(){
		formError.hide();//将错误信息隐藏
		//做容器的切换
		$('.step-username').hide().siblings('.step-question')
		.show().find('.question').text(this.data.question);

	},
	//加载输入密码的一步
	loadStepPassword : function(){
		formError.hide();//将错误信息隐藏
		//做容器的切换
		$('.step-question').hide().siblings('.step-password')
		.show();

	}

};

$(function(){
	page.init();
});