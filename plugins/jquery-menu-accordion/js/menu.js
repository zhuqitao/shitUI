$(function(){
    // menu收缩展开
    $('.menu-item>a').on('click',function(){
        if (!$('.menu').hasClass('menu-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
//              $('.menu-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('menu-show').siblings('li').removeClass('menu-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.menu-item.menu-show').removeClass('menu-show');
            }
        }
    });
    $('.menu-item a').on('click',function(){
        $('.menu-item a').removeClass('active')
		$(this).addClass('active')
    });
    //menu-mini切换
    $('#menu-togger').on('click',function(){
        if (!$('.menu').hasClass('menu-mini')) {
            $('.menu-item.menu-show').removeClass('menu-show');
            $('.menu-item').children('ul').removeAttr('style');
            $('.menu').addClass('menu-mini');
        }else{
            $('.menu').removeClass('menu-mini');
        }
    });
    // 点击用户名弹出下拉框
    $('.menu-user-name').on('click',function(){
    	if($('.menu-user-list').css('display') == 'none'){
    		$('.menu-user-list').slideDown(300)
    	}
    	else {
    		$('.menu-user-list').slideUp(300)
    	}
    })
});