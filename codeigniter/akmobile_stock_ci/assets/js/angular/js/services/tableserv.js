angular.module("akamaiposApp")
.factory("TableData", function TableDataFactory($http, $q){
    return {
        GetHeaderInfo: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/menu-header-info'
            })
        },
        GetTables: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/tables/get-tables',
			})
		},
        GetSectionList: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/tables/get-tables-section',
			})
		},
        SelectSectionTable: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/tables/select-section-table',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
        SelectTableWithoutCustomerNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/tables/select-table-without-no-of-customer',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
        SelectTableWithCustomerNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/tables/select-table-with-no-of-customer',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
        OpenReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/tables/open-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		ClearAll: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/tables/clear',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		CheckTableEditing: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/cashier/tables/check-table-editing',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		CheckUserSecurity: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/tables/check-user-security',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		TimeClockCheck: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/timeclock/punch/check',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TableNumberManualCheck: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-no-manual-check',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        OrderTypePopupList: function(){
            return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/order-type-list-selection'
			})
        },
        CheckUserManager: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/check-user-manager',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        GetLoggedUserInfo: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/get-user-info'
            })
        },
        CashOutDisabled: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cash-in-check/cashier',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CheckMultipleCashIn: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/check-multiple-cashin'
            })
        },
    } 
})