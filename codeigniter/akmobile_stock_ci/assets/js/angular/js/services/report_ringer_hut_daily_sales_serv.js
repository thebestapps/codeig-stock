angular.module("ReportRingerHutDailySalesApp")
.factory("RingerHutDailySalesData", function RingerHutDailySalesDataFactory($http, $q){
	return {
        DailySales: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'backoffice/reports/dailysales_ringerhut/data',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        DailySalesDownloadCSV: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'backoffice/reports/dailysales_ringerhut/download-csv',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		DailySalesEmailCSV: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'backoffice/reports/dailysales_ringerhut/email-csv',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		}
    }
})