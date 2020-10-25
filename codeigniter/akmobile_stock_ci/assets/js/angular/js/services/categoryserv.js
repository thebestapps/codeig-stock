//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";
angular.module("akamaiposApp")
.factory("posData", ["$http", "$q", function posDataFactory($http, $q){
	return {
		GetHeaderInfo: function () {
			return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/menu-header-info'
			})
		},
		LoadCategory: function(){
			return $http({
				method: 'GET',
				url: api_url+"category/list"
			})
		},
		AddCategory: function(postdata){
			return $http({
				method: 'POST',	
				url: api_url+'category/create',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		UpdateCategory: function(unique, postdata){
			return $http({
				method: 'PUT',	
				url: api_url+'category/update/'+unique,
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		LoadSubCategory: function(){
			return $http({
				method: 'GET',	
				url: api_url+'sub/category/list'
			})
		},
		AddSubCategory: function(postdata){
			return $http({
				method: 'POST',	
				url: api_url+'sub/category/create',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		UpdateSubCategory: function(unique, postdata){
			return $http({
				method: 'PUT',	
				url: api_url+'sub/category/update/'+unique,
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		}
	}

}])
