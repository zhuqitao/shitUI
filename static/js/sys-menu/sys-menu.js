$(function() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;

		//执行一个laydate实例
		laydate.render({
			elem: '#date1' //指定元素
		});
		laydate.render({
			elem: '#date2' //指定元素
		});
		laydate.render({
			elem: '#date3', //指定元素
			range: true
		});
	});
	layui.use('form', function() {
		var form = layui.form;
		// 点击选择全部
		form.on('checkbox(choseAll)', function(data) {
			if(data.elem.checked) {
				vue.menuList.map(function(item, index) {
					vue.checkboxModel.push(item.id)
					if(item.children) {
						item.children.map(function(v, i) {
							vue.checkboxModel.push(v.id)
						})
					}
				})
			} else {
				vue.checkboxModel = []
			}
			Vue.nextTick(function() {
				form.render()
			})
		});
		// 点击表格某行复选框
		form.on('checkbox(choseItem)', function(data) {
			index = vue.checkboxModel.indexOf($(data.elem).attr('value'))
			if(data.elem.checked) {
				// 判断点击元素的value 是否在checkboxModel中
				if(index > -1) {
					return
				} else {
					vue.checkboxModel.push($(data.elem).attr('value'))
				}
			} else {
				vue.$nextTick(function(){
					vue.$refs.choseAll.checked = false
				})
				if(index > -1) {
					vue.checkboxModel.splice(index, 1)
				} else {
					return
				}
			}
			Vue.nextTick(function() {
				form.render()
			})
		});
	});
	var a = 'asd'
	var vue = new Vue({
		el: '#sys-menu',
		data: function() {
			return {
				menuList: [],
				mainMenuID: '',
				checkboxModel: []
			}
		},
		created: function() {
			console.log(a)
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

			},
			// 添加菜单
			addMenu: function() {
				layui.use('layer', function() {
					var layer = layui.layer
					layer.open({
						title: '添加菜单',
						type: 2,
						content: '/IESlab/pages/sys-menu/sys-menu-form.html',
						area: ['800px', '500px'],
						btn: ['确认', '关闭'],
						yes: function(index, layero) {
							layer.msg('添加成功')
							layer.close(index)
						},
						btn2: function(index, layero) {}
					});
				})
			},
			// 修改菜单
			editMenu: function() {
				layui.use('layer', function() {
					var layer = layui.layer
					layer.open({
						title: '修改菜单',
						type: 2,
						content: '/IESlab/pages/sys-menu/sys-menu-form.html',
						area: ['800px', '500px'],
						btn: ['确认', '关闭'],
						yes: function(index, layero) {
							layer.msg('修改成功')
							layer.close(index)
						},
						btn2: function(index, layero) {}
					})
				})
			},
			// 删除菜单
			delMenu: function() {
				if(this.checkboxModel.length>0) {
					layui.use('layer', function() {
						var layer = layui.layer
						layer.confirm('确认要彻底删除数据吗?', {
							icon: 3,
							title: '系统提示'
						}, function(index) {
							layer.msg('删除成功')
							layer.close(index);
						});
					})
				}
				else{
					layui.use('layer', function() {
						var layer = layui.layer
						layer.confirm('请选择一条数据?', {
							icon: 3,
							title: '系统提示'
						});
					})
				}
			},
			// 勾选表格复选框
			choseItem: function(event) {
				alert()
			}
		}

	})

})