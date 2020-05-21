/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-20 23:45:23
* @Email:   1742759884@qq.com
*/
'use strict';

var _mm                   = require('util/mm.js');
var _cities               = require('util/cities/index.js');
var _address              = require('service/address-service.js');
var templateAddressModal  = require('./address-modal.string');

var addressModal = {
	show : function(option){
		//option的绑定
		this.option      = option;
		this.$modalWrap  = $('.modal-wrap');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	loadModal : function(){
		var addressModalHtml = _mm.renderHtml(templateAddressModal,{
			isUpdate : this.option.isUpdate,
			data     : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		if (this.option.isUpdate) {
			var provinceName = this.option.data.receiverProvince,
			    cityName     = this.option.data.receiverCity;
		  	_cities.updateCitiesData(provinceName,cityName);
		}
		else{
			//加载所在城市
		_cities.loadCitiesData();
		}
		
	},
	bindEvent : function(){
		var _this = this;
		// var _id = this.option.data.id;
		//添加收货地址
		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo    = _this.getReceiverInfo(),
				isUpdate        = _this.option.isUpdate;
			//使用新地址，并验证通过
			if (!isUpdate && receiverInfo.status) {
				_address.saveAddress(receiverInfo.data,function(res){
					_mm.successTips('地址添加成功！');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg || '好像哪里不对了');
				});
			}
			//更新收件人,并验证通过
			else  if (isUpdate && receiverInfo.status) {
				console.log(receiverInfo);
				_address.updateAddress(receiverInfo.data,function(res){
					_mm.successTips('更新地址成功！');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg || '好像哪里不对了');
				});
			}
			//验证不通过
			else{
				_mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
			}
		});
		//关闭 符号 x 或者蒙版 关闭添加窗口
		$(document).on('click','.close',function(){
			_this.hide();
		});
		//解决点击内容区时关闭弹窗的问题，原理：不让冒泡向上一级传递
		$(document).on('click','.modal-container',function(e){
			e.stopPropagation();
		});
	},
	//获取表单里的收件人信息，并做验证
	getReceiverInfo : function(){
		var receiverInfo = {},
			result       = {
				status : false
			};
		receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());/*用trim是因为是一个输入框*/
		receiverInfo.receiverProvince = $('.provinceTarget').val();
		receiverInfo.receiverCity     = $('.cityTarget').val();
		receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());
		if (this.option.isUpdate) {
			receiverInfo.id           = $('.shippingId').data('id');
		}
		if (!receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名';
		}else if(receiverInfo.receiverProvince === '省份') {
			result.errMsg = '请选择收件人所在地省份和城市';
		}
		else if(!receiverInfo.receiverAddress) {
			result.errMsg = '请输入收件人详细地址，具体到门牌号';
		}else if(!receiverInfo.receiverPhone) {
			result.errMsg = '请输入收件人手机号码';
		}
		//所有验证都通过了
		else{
			result.status = true;
			result.data = receiverInfo;
		}
		console.log(receiverInfo);
		return result;

	},
	//关闭弹出窗口
	hide : function(){
		this.$modalWrap.empty();
	}
	
};


module.exports = addressModal;