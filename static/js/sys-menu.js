$(function() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;

		//执行一个laydate实例
		laydate.render({
			elem: '#date1' //指定元素
		});
	});
	layui.use('form', function() {
		var form = layui.form;
		form.render()

		//各种基于事件的操作，下面会有进一步介绍
	});
	var vue = new Vue({
		el: '#sys-menu',
		data: function() {
			return {
				menuList: [],
				mainMenuID: ''
			}
		},
		created: function() {
			var _this = this
			$.getJSON('/IESlab/static/static-data/menu-data.json').then(function(res) {
				_this.menuList = res.menuList
			})
		},
		methods: {
			openChildMenu: function(mainMenuID, event) {
				var _this = this
				_this.$nextTick(function() {
					if($(event.target).hasClass('active')) {
						$(event.target).removeClass('active')
						_this.mainMenuID = ''
					} else {
						$('.open-list').removeClass('active')
						$(event.target).addClass('active')
						_this.mainMenuID = mainMenuID
					}
				})

			}
		}

	})

})