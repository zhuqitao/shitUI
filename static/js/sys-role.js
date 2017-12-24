$(function(){
	var vue = new Vue({
		el: '#sys-role',
		data: function() {
			return {
				roleList:[]
			}
		},
		created: function(){
			var _this = this
			$.getJSON('/IESlab/static/static-data/role-data.json').then(function(res){
				_this.roleList = res.roleList
			})
		},
		methods:{
			
		}

	})
	
})
