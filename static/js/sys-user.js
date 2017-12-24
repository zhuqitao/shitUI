$(function(){
	var vue = new Vue({
		el: '#sys-user',
		data: function() {
			return {
				userList:[]
			}
		},
		created: function(){
			var _this = this
			$.getJSON('/IESlab/static/static-data/user-data.json').then(function(res){
				_this.userList = res.userList
			})
			$.getJSON('/IESlab/static/static-data/responsibility.json').then(function(res) {
				zTreeObj = $.fn.zTree.init($("#treeDemo"), {}, res.responsibilityList);
			})
		},
		methods:{
			
		}

	})
	
})
