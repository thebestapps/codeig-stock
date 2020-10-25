//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";

angular.module("akamaiposApp")
.factory("posData", function posDataFactory($http, $q){
	return {
		GetHeaderInfo: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/header-info/authman'
	    	})
		},
		
		PaymentsByBatchType: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/sales/batchtype',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		BatchTypePaymentsByDateRange: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/sales/daterange/batchtype',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		AllChargesPayments: function(datefrom, dateto){
			return $http({
				method: 'GET',
				url: base_url + 'pos/batch/sales'
			})
		},

		BatchChargesPayments: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/batchsales/daterange',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		AllChargesPaymentsDateRange: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/allbatch/sales/daterange',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		BatchSummary: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/device/batch/summary',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		BatchClose: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/device/batch/close',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
		},
		/*
		BatchList: function(){
			return $http({
				method: 'GET',
				url: api_url + 'batch/list',
			})
		},
		*/
		
		BatchList: function(){
			return $http({
				method: 'GET',
				url: base_url+'pos/batch/list'
			})
		},
		
		/*
		ApprovedPaymentsByBatchNo: function(batchtype, batchno){
			return $http({
				method: 'GET',
				url: api_url + 'batch/batchno/'+batchtype+'/'+batchno,
			})
		},
		*/
		ApprovedPaymentsByBatchNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batch/batchno',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})	
		},
		/*
		DeclinedPaymentsByBatchNo: function(batchtype, batchno){
			return $http({
				method: 'GET',
				url: api_url + 'batch/batchno/'+batchtype+'/'+batchno,
			})
		},
		*/
		DeclinedPaymentsByBatchNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batch/batchno',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		/*
		AllChargesPaymentsByBatchNo: function(batchno){
			return $http({
				method: 'GET',
				url: api_url + 'batch/allsales/batchno/sales/'+batchno,
			})
		},
		*/
		AllChargesPaymentsByBatchNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batch/allsales/batchno',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		/*
		SecureDevices: function(){
			return $http({
				method: 'GET',
				url: api_url + 'batch/secure-device'
			})
		},
		*/
		
		SecureDevices: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/batch/secure-device'
			})
		},
		
		CheckDeviceConnection: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batch-device-connection',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		LocationList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/batch/location/list'
			})
		},
		ApprovedPaymentsByLocation: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batchsales/by/location',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		DeclinedPaymentsByLocation: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batchsales/by/location',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AllChargesPaymentsByLocation: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/batchsales/by/location',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AdjustTips: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/device/adjust-tip'
			})
		},
		PrintCheck: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/payment/printer-check-recall',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		VoidPayment: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/auth-manager/void-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		VoidCardPayment: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/auth-manager/void-card-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ClearSignature: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/clear-signature',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})	
		},
		PaymentsByBatchTypePreAuth: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/sales/batchtype/pre-auth',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PaymentsByBatchTypeZeroAuth: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/batch/sales/batchtype/zero-auth',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AdjustView: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/authmanager/adjust/view',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PrintBatch: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/authmanager/batch/print',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckUserManager: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/authmanager/checkusermanager',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
		},
		CheckUserPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/authmanager/checkuserpasscode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		QuickRecallServerCashIn: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/quick-recall/server-cashin-list'			
            })
		},
		AuthUpdateReceiptServer: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/authmanager/auth_update_receipt_server',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
	}
})
