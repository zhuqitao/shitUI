$(function(){
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
		form.on('checkbox(choseAll)', function(data) {
			if(data.elem.checked) {
				vue.roleList.map(function(item, index) {
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
	var vue = new Vue({
		el: '#sys-role',
		data: function() {
			return {
				roleList:[],
				checkboxModel:[]
			}
		},
		created: function(){
			var _this = this
			$.getJSON('/IESlab/static/static-data/role-data.json').then(function(res){
				_this.roleList = res.roleList
			})
		},
		methods: {
			// 添加角色
			addRole: function() {
				layui.use('layer', function() {
					var layer = layui.layer
					layer.open({
						title: '添加角色',
						type: 2,
						content: '/IESlab/pages/sys-role/sys-role-form.html',
						area: ['800px', '510px'],
						btn: ['确认', '关闭'],
						yes: function(index, layero) {
							layer.msg('添加成功')
							layer.close(index)
						},
						btn2: function(index, layero) {}
					});
				})
			},
			// 修改角色
			editRole: function() {
				layui.use('layer', function() {
					var layer = layui.layer
					layer.open({
						title: '修改角色',
						type: 2,
						content: '/IESlab/pages/sys-role/sys-role-form.html',
						area: ['800px', '510px'],
						btn: ['确认', '关闭'],
						yes: function(index, layero) {
							layer.msg('修改成功')
							layer.close(index)
						},
						btn2: function(index, layero) {}
					})
				})
			},
			// 删除角色
			delRole: function() {
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
			}
		}

	})
	
	$('checkbox').click(function(){
		if($(this).attr('checked')){
			$('checkbox').attr('checked',false)
			$(this).attr('checked',true)
		} else {
			$('checkbox').attr('checked',true)
			$(this).attr('checked',false)
		}
	})
	
	
})
