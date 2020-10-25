//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";

angular.module("akamaiposApp")
.factory("posData", function posDataFactory($http, $q){
	return {
		GetHeaderInfo: function(){
			return $http({
				method: 'POST',
				url: base_url + 'backoffice/reports/header-info'
	    	})
		},
		InventoryData: function(location, daterange){
			return $http({
				method: 'GET',
				url: api_url+'inventory/valuation/'+location+'/'+daterange
			})
		},
		ExportInventory: function(postdata){
			return $http({
				method: 'POST',
				url: base_url+'backoffice/inventory/valuation/export',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		}
	}
	
})
