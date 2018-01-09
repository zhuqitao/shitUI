
$(function() {
	iesInit()
	// 首页初始化
	function iesInit() {
		themeInit() // 主题初始化
		themeSetListener() // 主题设置监听器
		$(".menu-item ul a").tab();
		$.addTabFixed('pages/sys-menu/sys-menu.html', '首页')
//		if(window === top) {
//			var iframe = document.getElementById("tab-iframe");
//			if( /*@cc_on!@*/ 0) { // IE浏览器
//				iframe.attachEvent("onload", function() { // IE  
//					alert("Local iframe is now loaded");
//				});
//			} else {
//				iframe.onload = function() { // 非IE  
//					$('#tab-iframe').contents().find("html").css( "padding", "10px" );
//				};
//			}
//		}
		//		iframe.src = "http://www.baidu.com";

	}
	// 主题初始化
	function themeInit() {
		var menuPosition = localStorage.getItem('menuPosition') || 'left' // 菜单位置是否靠右  默认为靠左
		var menuSuspend = localStorage.getItem('menuSuspend') || ' ' // 菜单是否悬浮 默认为非悬浮
		var fixedWidth = localStorage.getItem('fixedWidth') || ' ' // 是否固定宽度  默认为非固定宽度

		/*菜单与导航栏主题颜色以及相关的深色     默认蓝色*/
		var themeColor = localStorage.getItem('themeColor') || '#3CA2E0'
		var themeDeep1Color = localStorage.getItem('themeDeep1Color') || '#2D93D1'
		var themeDeep2Color = localStorage.getItem('themeDeep2Color') || '#1E84C2'
		var themeDeep3Color = localStorage.getItem('themeDeep3Color') || '#0F75B3'
		// 菜单的位置为右  设置菜单位置选项的滑动按钮设为选中
		if(menuPosition === 'right') {
			$('.switch-slide #menu-right').prop('checked', true)
		}
		// 菜单悬浮    设置菜单悬浮选项的滑动按钮设为选中
		if(menuSuspend === 'suspend') {
			$('.switch-slide #menu-suspend').prop('checked', true)
		}
		// 固定宽度     设置固定宽度选项的滑动按钮设为选中
		if(fixedWidth === 'fixedWidth') {
			$('.switch-slide #fixed-width').prop('checked', true)
		}
		// 设置选择颜色按钮的颜色  头部、菜单、菜单列表、导航栏背景色
		$('#colorPick').css('background-color', themeColor || '#3CA2E0')
		// 头部背景色
		$('.head').css('background-color', themeDeep1Color)
		$('.head .tool>div').css('background-color', themeDeep1Color)
		$('.head .tool>div').mouseenter(function() {
			$(this).css('background-color', themeDeep3Color)
		}).mouseleave(function() {
			$(this).css('background-color', themeDeep1Color)
		})
		// 菜单列表背景色
		$('.menu').css('background-color', themeDeep2Color)
		$('.menu-head').css('background-color', themeColor)
		$('.menu-item ul').css('background-color', themeDeep3Color)
		$('.menu-item>a').css('background-color', themeDeep2Color)
		$('.menu-item a').click(function(e) {
			$(".menu-item>a").css('background-color', themeDeep2Color)
			$(".menu-item>a.active").css('background-color', themeColor)
		})
		$('.menu-item a.super-menu').mouseenter(function() {
			$(this).css('background-color', themeColor)
		}).mouseleave(function() {
			$(this).css('background-color', localStorage.getItem('themeDeep2Color'))
		})
		$('.menu-item a.junior-menu').css('background', themeDeep3Color)
		$('.menu-item a.junior-menu').mouseenter(function() {
			$(this).css('background-color', themeColor)
		}).mouseleave(function() {
			$(this).css('background-color', localStorage.getItem('themeDeep3Color'))
		})
		// 导航栏颜色
		$('#page-tab #menu-list a.active').css('background-color', themeColor)
		$('.nav').css('border-bottom', themeColor + ' solid 2px')

		$('.menu').removeClass('menu-left')
		$('.menu').removeClass('menu-right')
		$('.menu').addClass('menu-' + menuPosition)
		$('.menu').removeClass('suspend')
		$('.menu').addClass(menuSuspend)
		$('.body').removeClass('fixedWidth')
		$('.body').addClass(fixedWidth)

		// 主题颜色选择器
		$('#colorPick').colpick({
			color: localStorage.getItem('themeColor') || '#3CA2E0',
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).colpickHide()
				$(el).css('background-color', 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')')
				localStorage.setItem('themeColor', 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')')
				localStorage.setItem('themeDeep1Color', 'rgb(' + (rgb.r - 15) + ',' + (rgb.g - 15) + ',' + (rgb.b - 15) + ')')
				localStorage.setItem('themeDeep2Color', 'rgb(' + (rgb.r - 30) + ',' + (rgb.g - 30) + ',' + (rgb.b - 30) + ')')
				localStorage.setItem('themeDeep3Color', 'rgb(' + (rgb.r - 45) + ',' + (rgb.g - 45) + ',' + (rgb.b - 45) + ')')
				themeInit()
			}
		})

	}
	// 主题设置监听器
	function themeSetListener() {
		$('body').on('click', '.head .tool .set a', function(e) {
			e.stopPropagation()
			$(this).nextAll('ul').slideToggle(300)
			$(document).one('click', function() {
				//				if ($(this).attr('class'))
				$('.head .tool>div.set ul').hide()
			})
		})
		$('.head .tool>div.set ul').on('click', function(e) {
			e.stopPropagation()
		})

		$('.switch-slide #menu-right').on('click', function() {
			localStorage.setItem('menuPosition', $(this).prop('checked') ? 'right' : 'left')
			themeInit()
		})
		$('.switch-slide #menu-suspend').on('click', function() {
			localStorage.setItem('menuSuspend', $(this).prop('checked') ? 'suspend' : ' ')
			themeInit()
		})
		$('.switch-slide #fixed-width').on('click', function() {
			localStorage.setItem('fixedWidth', $(this).prop('checked') ? 'fixedWidth' : ' ')
			themeInit()
		})

	}

	// 树形结构初始化

})

//$.fn.treeInit = function(obj) {
//	// 遍历数据生成树形DOM结构
//	var _this = this
//	var treeData = obj.data
//	var checkDom = ''
//	var checkedData = []
//	var radioName = 'tree'
//	var loopTree = function(dom, loopData, parentData) {
//		parentData = parentData || {} // 上一级循环的数据  首次循环不传该参数
//		radioName += '-radio'
//		for(var i = 0; i < loopData.length; i++) {
//			var liDom = $('<li></li>')
//			var treeItemDom = $('<div>', {
//				"class": "ies-tree-item",
//				"html": loopData[i].name,
//				"data-params": JSON.stringify(loopData[i])
//			})
//			// 添加复选框
//			if(obj.check === 'checkbox') {
//				checkDom = $("<label>", {
//					"class": "ies-check small"
//				})
//				checkDom.append($('<input>', {
//					"id": "tree-checkbox" + loopData[i].id,
//					"type": "checkbox",
//					"hidden": true,
//					"data-params": JSON.stringify(loopData[i])
//				}))
//				checkDom.append($("<label>", {
//					"for": "tree-checkbox" + loopData[i].id
//				}))
//			}
//			// 添加单选框
//			else if(obj.check === 'radio'){
//				checkDom = $('<label>',{
//					"class": "ies-radio small"
//				})
//				checkDom.append($('<input>',{
//					"id":"tree-radio" + loopData[i].id,
//					"type": "radio",
//					"hidden": true,
//					"data-params": JSON.stringify(loopData[i]),
//					"name": radioName + parentData.id
//				}))
//				checkDom.append($('<label>',{
//					"for": "tree-radio" + loopData[i].id
//				}))
//			}
//			treeItemDom.prepend(checkDom)
//			liDom.append(treeItemDom)
//			if(loopData[i].children && loopData[i].children.length != 0) {
//				var ulDom = $('<ul>')
//				loopTree(ulDom, loopData[i].children, loopData[i])
//				liDom.append(ulDom)
//				// 定义展开和收缩 加号 按钮
//				var openTreeDom = $('<i>',{
//					"class": "open-tree-btn fa fa-plus-square-o close",
//				}).bind('click',function(e){
//					openOrCloseTree(e)
//				})
//				liDom.prepend(openTreeDom)
//				radioName = radioName.slice(0,radioName.length-6)
//			}
//			dom.append(liDom)
//		}
//		//		dom.append($('<div>aaa</div>'))
//	}
//	loopTree($(_this), treeData)
//	// 绑定展开按钮点击事件
//	var openOrCloseTree = function(e) {
//		if($(e.target).hasClass('close')) { // 判断是否为未展开状态
//			$(e.target).removeClass('fa-plus-square-o close').addClass('fa-minus-square-o open')
//			$(e.target).parent().children('ul').show(200)
//		} else {
//			$(e.target).removeClass('fa-minus-square-o open').addClass('fa-plus-square-o close')
//			$(e.target).parent().children('ul').hide(200)
//		}
//	}
//	console.log($(_this).attr('id'))
//	$(document).on('click', '#'+$(_this).attr('id')+' .ies-tree .ies-check input', function(e) {
//		if(e.target.checked) {
//			for(var i = 0; i < checkedData.length; i++) {
//				if(checkedData[i].id === $(e.target).data('params').id) {
//					checkedData.splice(i,1)
//				}
//			}
//			checkedData.push($(e.target).data('params'))
//		}
//		else{
//			for(var i = 0; i < checkedData.length; i++) {
//				if(checkedData[i].id === $(e.target).data('params').id) {
//					checkedData.splice(i,1)
//				}
//			}
//		}
//	})
//	return {
//		getCheckedData: function() {
//			return checkedData
//		}
//	}
//}