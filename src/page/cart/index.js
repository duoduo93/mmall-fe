/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-15 16:51:33
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');
var page = {
	data : {
		
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		//商品的选中/取消
		//click点击事件 告诉后来cartSelect的变化
			$(document).on('click','.cart-select',function(){
			var $this = $(this),//缓存this
				productId = $this.parents('.cart-table').data('product-id');//.parent从父级元素中取值  parents从祖先中找到元素
			//选中
			if($this.is(':checked')){
				_cart.selectProductId(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消选中
			else{
				_cart.unselectProductId(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
		});

		//商品的全选/ 反选
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);//缓存this
			// productId = $this.parent('.cart-table').data('productId');//.parent从祖先中取值 全选不需要传入productId
			//全选
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消全选
			else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res); 
				},function(errMsg){
					_this.showCartError();
				});
			}
		});

		//商品数量的绑定
		$(document).on('click','.count-btn',function(){
			var $this        = $(this),
				$pCount      = $this.siblings('.count-input'),
				// currentCount = $('#count-input').val(),
				currentCount = $pCount.val(),
				type         = $this.hasClass('plus') ? 'plus': 'minus',
				productId    = $this.parents('.cart-table').data('product-id'),
				minCount     = 1,
				maxCount     = $pCount.data('max'),
				// maxCount     = $('#count-input').data('max'),
				newCount     = 0;//要提交的变量 实际上的数量
				if (type === 'plus') {
					if (currentCount>= maxCount) {
						_mm.errorTips('该商品数量已达到上限');
						return;
					}
					newCount = +currentCount + 1;
				}else if(type === 'minus'){
					if (currentCount<= minCount) {
						return;
					}
					newCount = +currentCount - 1;
				}
				//更新购物车的商品数量
				_cart.productUpdate({
					productId : productId,
					count     : newCount
				},function(res){
					_this.renderCart(res); 
				},function(errMsg){
					_this.showCartError();
				});


		});
		//删除单个商品
		$(document).on('click','.cart-delete',function(){
				//提示是否要删除，防止误操作
			if (window.confirm('提示： 确定要删除该商品吗？')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteProductIds(productId);
			}

		});
		//删除选中的商品
		$(document).on('click','.delete-selected',function(){
				//提示是否要删除，防止误操作
			if (window.confirm('提示： 确定要删除选中的商品吗？')) {
				// 定义一个数组变量，用来存放找到的productId
				// 通过checked来选中元素标签，然后根据元素标签找到productId
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');
				
				for(var i = 0,iLength=$selectedItem.length;i<iLength;i++){
					//$代表jquery对象，arrProductIds。push（）只能传入对象
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				//验证下数组元素合法性，然后将数组用逗号分隔符转成字符串
				if (arrProductIds.length) {
					_this.deleteProductIds(arrProductIds.join(','));	
				}
				else{
					_mm.errorTips('您还没有选择要删除的商品');
				}
				
			}

		});
		//提交购物车
		$(document).on('click','btn-submit',function(){
			//总价大于0 提交
			if (this.data.cartInfo && this.data.cartInfo.total > 0) {
				window.location.href('./confirm.html');
			}
			else{
				_mm.errorTips('您还没有选择要提交的商品');
			}
		});

		
		
	},
	deleteProductIds : function(productIds){
		var _this = this;
		_cart.deleteProductIds(productIds,function(res){
			_this.renderCart(res); 
		},function(errMsg){
			_this.showCartError();
		}
		);
	},
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下试试吧！</p>');
	}
	,
	// 加载商品详情信息
	loadCart : function(){
		
		var _this = this;
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	},
	//渲染购物车
	renderCart : function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成HTML
		var cartHtml = _mm.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
	},
	//数据匹配
	filter: function(data){
		data.notEmpty = !!data.cartProductVoList.length;/*!! 强转成boolean类型*/
	},
};


// 初始化页面
$(function(){
	page.init();
});