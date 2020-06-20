/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:15
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-30 21:13:36
* @Email:   1742759884@qq.com
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm           = require('util/mm.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination    = require('util/pagination/index.js');

//页面对象 json格式
var page = {
	//缓存后端传来的数据，没有的为空
	data : {
		listParam : {
			keyword    : _mm.getUrlParam('keyword')    || '',
			categoryId : _mm.getUrlParam('categoryId') || '',
			orderBy    : _mm.getUrlParam('orderBy')    || 'default',
			pageNum    : _mm.getUrlParam('pageNum')    || '1',
			pageSize   : _mm.getUrlParam('pageSize')   || '10'
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad    : function(){
		this.loadList();

	},
	bindEvent : function(){
		var _this = this;
		//排序的点击事情
		$('.sort-item').click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			//点击默认排序
			if($this.data('type') === 'default'){
				//已经是active样式
				if ($this.hasClass('active')) {
					return;
				}
				//其他
				else{
					$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc ');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if($this.data('type') ==='price'){
				//active class的处理
					$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc ');
				//升序、降序的处理
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		});
	},
	//加载list数据
	loadList  : function(){
		var listParam = this.data.listParam,
			listHtml  = '',
			$pListCon = $('.p-list-con'),
			_this     = this;

		$pListCon.html('<div class="loading"></div>');
		//删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		//请求接口
		_product.getProductList(listParam,function(res){
			listHtml  = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			//将listHtml放入容器
			$pListCon.html(listHtml);
			//加载分页容器
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
			});
		},function(errMsg){	
			_mm.errorTips(errMsg);
		});
	},
   // 加载分页信息
    loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());/*实例化一个pagination对象，如果已经存在就创建，理解为单例模式*/
		this.pagination.render($.extend({},pageInfo,{
			container    :$('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;/*修改页数的信息*/
				_this.loadList();/*重新加载订单列表*/
			}
		}));
		// console.log($('.pagination'));
		console.log(_this.loadList);
	}
};

$(function(){
	page.init();
});