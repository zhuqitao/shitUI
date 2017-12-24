(function() {
    var scrollSetp = 500,
    operationWidth = 150,
    leftOperationWidth = 0,
    animatSpeed = 150,
    navDom = '',
    linkframe = function(url, value) {
        $("#menu-list a.active").removeClass("active");
        $("#menu-list a[data-url='" + url + "'][data-value='" + value + "']").addClass("active");
		$('.section iframe').attr('src',url)
        $("#menu-all-ul li.active").removeClass("active");
        $("#menu-all-ul li[data-url='" + url + "'][data-value='" + value + "']").addClass("active")
        $("#menu-list a").css('background-color', '#fff')
        $("#menu-list a.active").css('background-color', localStorage.getItem('themeColor') || '#3CA2E0')
    },
    createNavDom = function(linkUrl,linkHtml) {
    	navDom = $("<a>", {
                    "href": "javascript:void(0);",
                    "data-url": linkUrl,
                    "data-value": linkHtml
                }).bind("click",
                function() {
                    var jthis = $(this);
                    linkframe(jthis.data("url"), jthis.data("value"))
                }).bind("dblclick",function(e){  // 绑定双击事件
                	$('.section iframe').attr('src',$(_this).attr('data-url'))
                }).bind("contextmenu",    //绑定右击事件
                function(e){
                	e.preventDefault()
                	var _this = this
                	$(_this).parents('#menu-list').children('a').find('ul').remove()
                	var contextmenuList = $("<ul>",{"class": "context-menu"})
                	contextmenuList.css({
                		'left':e.pageX+'px',
                		'top':e.pageY+'px'
                	})
                	
                	// 添加关闭当前标签菜单
                	$("<li>",{
                		"class": "close-menu",
                		"html": "关闭标签"
                	}).bind('click',function(e){
                		$(_this).find('i.menu-close').click()// 关闭当前标签
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	// 添加关闭其他标签菜单
                	$("<li>",{
                		"class": "close-other-menu",
                		"html": "关闭其他标签"
                	}).bind('click',function(){
                		$(_this).siblings().find('i.menu-close').click() // 关闭其他标签
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	// 添加刷新标签菜单
                	$("<li>",{
                		"class": "update-menu",
                		"html": "刷新"
                	}).bind('click',function(){
                		move($(_this))
                		$('.section iframe').attr('src',$(_this).attr('data-url'))
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	// 添加关闭左侧标签菜单
                	$("<li>",{
                		"class": "close-left-menu",
                		"html": "关闭左侧标签"
                	}).bind('click',function(e){
                		var activeMenu = $(_this).parents('#menu-list').find('a.active')
                		if(activeMenu.index() <= $(_this).index()){
                			/*激活的标签在被点击标签的左侧或者被点击的标签就是激活标签*/
                			$(_this).prevAll().find('i.menu-close').click()
                			$(_this).click()
                		}else {
                			$(_this).prevAll().find('i.menu-close').click()
                			activeMenu.click()
                		}
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	// 添加关闭右侧标签菜单
                	$("<li>",{
                		"class": "close-left-menu",
                		"html": "关闭右侧标签"
                	}).bind('click',function(e){
                		var activeMenu = $(_this).parents('#menu-list').find('a.active')
                		if(activeMenu.index() >= $(_this).index()){
                			/*激活的标签在被点击标签的右侧或者被点击的标签就是激活标签*/
                			$(_this).nextAll().find('i.menu-close').click()
                			$(_this).click()
                		}else {
                			$(_this).nextAll().find('i.menu-close').click()
                			activeMenu.click()
                		}
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	// 添加关闭所有标签菜单
                	$("<li>",{
                		"class": "close-left-menu",
                		"html": "关闭所有标签"
                	}).bind('click',function(e){
                		$(_this).parents('#menu-list').find('a i.menu-close').click()
                		$(_this).find('ul').remove()
                	}).appendTo(contextmenuList)
                	
                	
                	contextmenuList.appendTo($(_this))
                	$(document).one('click',function(e){
                		$('.context-menu').hide()
                	})
                })
    },
    move = function(selDom) {
        var nav = $("#menu-list");
        var releft = selDom.offset().left;
        var wwidth = parseInt($("#page-tab").width());
        var navLeft = $("#page-tab-box").offset().left;
        var left = parseInt(nav.css("margin-left"));
        if (releft < navLeft && releft <= wwidth) {
            nav.animate({
                "margin-left": (left +navLeft - releft + leftOperationWidth) + "px"
            },
            animatSpeed)
        } else {
            if (releft + selDom.width() - navLeft > wwidth - operationWidth) {
                nav.animate({
                    "margin-left": (left +navLeft - releft + wwidth - selDom.width() - operationWidth) + "px"
                },
                animatSpeed)
            }
        }
    },
    createmove = function() {
        var nav = $("#menu-list");
        var wwidth = parseInt($("#page-tab").width());
        var navwidth = parseInt(nav.width());
        if (wwidth - operationWidth < navwidth) {
            nav.animate({
                "margin-left": "-" + (navwidth - wwidth + operationWidth) + "px"
            },
            animatSpeed)
        }
    },
    closemenu = function() {
        $(this.parentElement).animate({
            "width": "0",
            "padding": "0"
        },
        0,
        function() {
            var jthis = $(this);
            if (jthis.hasClass("active")) {
                var linext = jthis.next();
                if (linext.length > 0) {
                    linext.click();
                    move(linext)
                } else {
                    var liprev = jthis.prev();
                    if (liprev.length > 0) {
                        liprev.click();
                        move(liprev)
                    }
                }
            }
            this.remove();
            $("#page-content .iframe-content[data-url='" + jthis.data("url") + "'][data-value='" + jthis.data("value") + "']").remove()
        });
        event.stopPropagation()
    },
    init = function() {
        $("#page-prev").bind("click",
        function() {
            var nav = $("#menu-list");
            var left = parseInt(nav.css("margin-left"));
            if (left !== 0) {
                nav.animate({
                    "margin-left": (left + scrollSetp > 0 ? 0 : (left + scrollSetp)) + "px"
                },
                animatSpeed)
            }
        });
        $("#page-next").bind("click",
        function() {
            var nav = $("#menu-list");
            var left = parseInt(nav.css("margin-left"));
            var wwidth = parseInt($("#page-tab").width());
            var navwidth = parseInt(nav.width());
            var allshowleft = -(navwidth - wwidth + operationWidth);
            if (allshowleft !== left && navwidth > wwidth - operationWidth) {
                var temp = (left - scrollSetp);
                nav.animate({
                    "margin-left": (temp < allshowleft ? allshowleft: temp) + "px"
                },
                animatSpeed)
            }
        });
        $("#page-operation").bind("click",
        function() {
            var menuall = $("#menu-all");
            if (menuall.is(":visible")) {
                menuall.hide()
            } else {
                menuall.show()
            }
        });
        $("body").bind("mousedown",
        function(event) {
            if (! (event.target.id === "menu-all" || event.target.id === "menu-all-ul" || event.target.id === "page-operation" || event.target.id === "page-operation" || event.target.parentElement.id === "menu-all-ul")) {
                $("#menu-all").hide()
            }
        })
    };
    $.fn.tab = function() {
        init();
        this.bind("click",

        function() {
            var linkUrl = this.href;
            var linkHtml = this.text.trim();
            var selDom = $("#menu-list a[data-url='" + linkUrl + "'][data-value='" + linkHtml + "']");
            if (selDom.length === 0) {
                var iel = $("<i>", {
                    "class": "menu-close fa fa-times-circle"
                }).bind("click", closemenu);
                var menuName = $('<div>',{
                	"html":linkHtml,
                	'class': 'menu-name'
                })
                createNavDom(linkUrl,linkHtml)
                navDom.append(menuName).append(iel).appendTo('#menu-list')
//              navDom = $("<a>", {
//                  "href": "javascript:void(0);",
//                  "data-url": linkUrl,
//                  "data-value": linkHtml
//              }).bind("click",
//              function() {
//                  var jthis = $(this);
//                  linkframe(jthis.data("url"), jthis.data("value"))
//              }).bind("dblclick",function(e){  // 绑定双击事件
//              	$('.section iframe').attr('src',$(_this).attr('data-url'))
//              }).bind("contextmenu",    //绑定右击事件
//              function(e){
//              	e.preventDefault()
//              	var _this = this
//              	$(_this).parents('#menu-list').children('a').find('ul').remove()
//              	var contextmenuList = $("<ul>",{"class": "context-menu"})
//              	contextmenuList.css({
//              		'left':e.pageX+'px',
//              		'top':e.pageY+'px'
//              	})
//              	
//              	// 添加关闭当前标签菜单
//              	$("<li>",{
//              		"class": "close-menu",
//              		"html": "关闭标签"
//              	}).bind('click',function(e){
//              		$(_this).find('i.menu-close').click()// 关闭当前标签
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	// 添加关闭其他标签菜单
//              	$("<li>",{
//              		"class": "close-other-menu",
//              		"html": "关闭其他标签"
//              	}).bind('click',function(){
//              		$(_this).siblings().find('i.menu-close').click() // 关闭其他标签
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	// 添加刷新标签菜单
//              	$("<li>",{
//              		"class": "update-menu",
//              		"html": "刷新"
//              	}).bind('click',function(){
//              		move($(_this))
//              		$('.section iframe').attr('src',$(_this).attr('data-url'))
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	// 添加关闭左侧标签菜单
//              	$("<li>",{
//              		"class": "close-left-menu",
//              		"html": "关闭左侧标签"
//              	}).bind('click',function(e){
//              		var activeMenu = $(_this).parents('#menu-list').find('a.active')
//              		if(activeMenu.index() <= $(_this).index()){
//              			/*激活的标签在被点击标签的左侧或者被点击的标签就是激活标签*/
//              			$(_this).prevAll().find('i.menu-close').click()
//              			$(_this).click()
//              		}else {
//              			$(_this).prevAll().find('i.menu-close').click()
//              			activeMenu.click()
//              		}
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	// 添加关闭右侧标签菜单
//              	$("<li>",{
//              		"class": "close-left-menu",
//              		"html": "关闭右侧标签"
//              	}).bind('click',function(e){
//              		var activeMenu = $(_this).parents('#menu-list').find('a.active')
//              		if(activeMenu.index() >= $(_this).index()){
//              			/*激活的标签在被点击标签的右侧或者被点击的标签就是激活标签*/
//              			$(_this).nextAll().find('i.menu-close').click()
//              			$(_this).click()
//              		}else {
//              			$(_this).nextAll().find('i.menu-close').click()
//              			activeMenu.click()
//              		}
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	// 添加关闭所有标签菜单
//              	$("<li>",{
//              		"class": "close-left-menu",
//              		"html": "关闭所有标签"
//              	}).bind('click',function(e){
//              		$(_this).parents('#menu-list').find('a i.menu-close').click()
//              		$(_this).find('ul').remove()
//              	}).appendTo(contextmenuList)
//              	
//              	
//              	contextmenuList.appendTo($(_this))
//              }).append(menuName).append(iel).appendTo("#menu-list");
                
                createmove()
            } else {
                move(selDom)
            }
            linkframe(linkUrl, linkHtml);
            return false
        });
        return this
    }
    $.addTab = function(linkUrl,linkHtml){
        var selDom = $("#menu-list a[data-url='" + linkUrl + "'][data-value='" + linkHtml + "']");
        if (selDom.length === 0) {
            var iel = $("<i>", {
                "class": "menu-close fa fa-times-circle"
            }).bind("click", closemenu);
            var menuName = $('<div>',{
            	"html":linkHtml,
            	'class': 'menu-name'
            })
            createNavDom(linkUrl,linkHtml)
            navDom.append(menuName).append(iel).appendTo('#menu-list')
            createmove()
        }
        else{
        	move(selDom)
        }
        linkframe(linkUrl,linkHtml)
    }
    $.addTabFixed = function(linkUrl,linkHtml){
        var selDom = $("#menu-list a[data-url='" + linkUrl + "'][data-value='" + linkHtml + "']");
        if (selDom.length === 0) {
            var menuName = $('<div>',{
            	"html":linkHtml,
            	'class': 'menu-name'
            })
            createNavDom(linkUrl,linkHtml)
            navDom.append(menuName).appendTo('#menu-list')
            createmove()
        }
        else{
        	move(selDom)
        }
        linkframe(linkUrl,linkHtml)
    }
})();