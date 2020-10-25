angular.module("BackofficeSchedulerApp")
.factory("schedulerData", function schedulerDataFactory($http, $q){
	return {
        getTimeClockData: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/scheduler/timeclock-data',
                async: false
			});
        }
    }
})