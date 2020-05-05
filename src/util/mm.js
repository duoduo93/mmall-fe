/*
* @Author: Wang XianPeng
* @Date:   2020-04-23 04:51:05
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-04 15:46:15
* @Email:   1742759884@qq.com
*/
'use strict';

var Hogan = require('hogan.js');
var conf = {
	serverHost :''
};
var _mm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type: param.method || 'get',
			url : param.url    || '',
			dataType: param.type || 'json',
			data    : param.data || '',
			//请求成功
			success : function(res){
				if (0 === res.status) {
					typeof param.success === 'function'  && param.success(res.data,res.msg);

				}
				//没有登陆，需要强制登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				else if(1 === res.status){
						typeof param.error === 'function'  && param.error(res.msg);

				}
			},
			error : function(err){
					typeof param.error === 'function'  && param.error(err.statusText);
	
			}

		});

	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	//decodeURIComponent 解码
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)'+name+ '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//成功提示
	successTips  : function(msg){
		alert(msg || '操作成功');
	},
	//失败提示
	errorTips  : function(msg){
		alert(msg || '操作失败');
	},
	//    支持非空 手机 邮箱的判断
	validate : function(value ,type){
		//除去空字符
		var value = $.trim(value);
		//非空验证
		if ('require' === type) {
			return !! value;
		}
		//手机号验证
		if ('phone' === type) {
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if ('email' === type) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value);
		}

	},
	//统一登陆处理
	doLogin : function(){
		//封装doLogin
		//完全编码  encodeURIComponent
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);

	},
	goHome : function(){
		window.location.href = './index.html';
	},
// 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    }


};

module.exports = _mm;