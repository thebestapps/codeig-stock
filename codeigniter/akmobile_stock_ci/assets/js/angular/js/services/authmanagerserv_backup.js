//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";

angular.module("akamaiposApp")
.factory("posData", function posDataFactory($http, $q){
	return {
		GetHeaderInfo: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/header-info'
	    	})
		},
		
		ApprovedPayments: function(){
			return $http({
				method: 'GET',
				url: api_url + 'batch/sales/Approved'
			})
		},
		
		DeclinedPayments: function(){
			return $http({
				method: 'GET',
				url: api_url + 'batch/sales/Declined'
			})
		},
		
		AllChargesPayments: function(){
			return $http({
				method: 'GET',
				url: api_url + 'batch/sales'
			})
		},
		BatchSummary: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/device/batch/summary'
			})
		},
		BatchClose: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/device/batch/close'
			})
		},
		PrinterCheck: function(postData){
		    return $http({
				method: 'POST',
				url: base_url + 'pos/payment/printer-check',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SearchReceiptPaymentCard: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/check-id',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		}
	}
})
