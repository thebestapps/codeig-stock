angular.module("ReportDepositWorkSheetApp")
.factory("DepositWorkSheetData", function DepositWorkSheetDataFactory($http, $q){
	return {
        GridData: function(postdata){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: base_url + 'backoffice/reports/deposit_worksheet/data',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                deferred.resolve(data);
            })
            return deferred.promise;
        },
        ViewData: function(postdata){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: base_url + 'backoffice/reports/deposit_worksheet/view-data',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        }
    }
})