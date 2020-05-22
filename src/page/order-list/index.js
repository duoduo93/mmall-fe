/*
* @Author: Wang XianPeng
* @Date:   2020-05-10 08:37:44
* @Last Modified by:   Wang XianPeng
* @Last Modified time: 2020-05-22 08:46:32
* @Email:   1742759884@qq.com
*/
'use strict';
//引入外部文件部分
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide       = require('page/common/nav-side/index.js');/*侧边导航*/
var _mm           = require('util/mm.js');
var Pagination    = require('util/pagination/index.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');


var page = {
	//缓存分页参数
	data : {
		listParam : {
			pageNum   : 1,
			pageSize  : 3
		}
	},
	init : function(){
		this.onLoad();
		
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		this.loadOrderList();
	},
	//加载订单列表
	loadOrderList : function(){
		var _this         = this,
			orderListHtml = '',
			$listCon      = $('.order-list-con');/*获取容器对象并转化成jquery对象*/
		_order.getOrderList(_this.data.listParam,function(res){
			// console.log(_this.data.listParam);
			//处理数据
			// _this.dataFilter(res);
			orderListHtml = _mm.renderHtml(templateIndex,res);
			//渲染Html
			$listCon.html(orderListHtml);
			//加载分页信息
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
			});
		},function(errMsg){
			// _mm.errorTips(errMsg);  
			//加载失败提示信息
			$listCon.html('<p class="err-tip">加载订单信息失败，请刷新试试</p>');
		});
	},
	//数据处理  
	// dataFilter : function(data){
	// 	data.isEmpty = !data.list.length;/*data.list.length取不到的话 表示data是空的*/

	// },
	//分页处理
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());/*如果有分页的话，不做处理，如果没有分页，新建分页*/
		this.pagination.render($.extend({},pageInfo,{
			container    :$('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;/*修改页数的信息*/
				_this.loadOrderList();/*重新加载订单列表*/
			}
		}));
	}
	
};


// 初始化页面
$(function(){
	page.init();
});