//var base_url = "/app/";
//var api_url = "http://ak1.akamaipos.com:1337/";
//var api_url =  "http://akamaipos:1337/";

angular.module("akamaiposApp")
.factory("posData", ["$http", "$q", function posDataFactory($http, $q){
	return {
        EnterPassCode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/checkpasscode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        EnterPassCodeCashOut: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/checkpasscode/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SaveAmount: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/amount',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SaveAmountCashIn: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/amount/cashin',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SaveAmountCashOut: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/amount/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashOutDisabled: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cash-in-check/cashier'
            })
        },
        AmountCheck: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cash-in-check'
            })
        },
        AmountCheckCashIn: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cash-in-check/cashin'
            })
        },
        PrinterCheck: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/printer-check/cashier',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        PrintReceipt: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/print-receipt',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetHeaderInfo: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/menu-header-info'
            })
        },
        TimeClockPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/get/user',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TimeClockCashInPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/get/user/cashin',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        getLoggedInformation: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/logged-info/cashier',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        getLoggedInformationCashIn: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/logged-info/cashin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        getLoggedInformationCashOut: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/logged-info/cashout',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        getLoggedInformationAuthMan: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/logged-info/authman',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        getLoggedInformationTimeClock: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/logged-info/timeclock',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TimeClockSave: function(postdata){
            return $http({
                method: 'POST',
                url: base_url  + 'pos/cashier/timeclock/punch/save',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
        TimeClockUpdate: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/timeclock/punch/update',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        printTimeClock: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/print-time-clock',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        PrinterCheckTimeClock: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/printer-check-timeclock',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CheckUser: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/check-user',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CheckUserCashIn: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/check-user/cashin',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CheckUserCashier: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/check-user/cashier',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CheckUserCashierCashIn: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/check-user/cashin',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CashInCheck: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin-check',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CheckPasscode: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'GET',
                url: api_url + 'config_users?'+postdata,
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        RestrictionPasscode: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/cashier',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },

        RestrictionPasscodeAuthMan: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/authman',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },

        RestrictionPasscodePayout: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/payout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },

        RestrictionPasscodeCashDrawer: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/cashdrawer',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },

        RestrictionPasscodeTimeClock: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/cashier',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },

        RestrictionPasscodeRecall: function(postdata){
            var deferred = $q.defer();
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/recall',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        RestrictionPasscodeReports: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-restrict/passcode/reports',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        CashCount: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashout/cash-count',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
    
        UpdateCashCounted: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url+ 'pos/cashier/cash-count/update',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        
        TableOrderNoInject: function(postdata){
            return $http({
                method: 'post',
                data: postdata,
                url: base_url+ 'pos/cashier/table-no',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        
        GetColumnCount: function(){
            return $http({
                method: 'get',
                url: base_url+ 'pos/cashier/column-count'
            })
        },
        
        GetConfigTables: function(postdata){
            return $http({
                method: 'post',
                data: postdata,
                url: base_url+ 'pos/cashier/tables',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TableAssign: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: base_url + 'pos/pointofsale/table-assignment'
            })
        },
        /*
        OpenReceipt: function(postData){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/open-receipt',
                data: postData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        */
        InsertConfigPayments: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'backoffice/cashier/insert-station-cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        InsertConfigPaymentsCashOut: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/insert-station-cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ClearDBCache: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/clear-db-cache'			
            })
        },
        PayOut: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/payout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })	
        },
        CreateReceipt: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/new-sale',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashDrawerOption: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/cash-drawer-option'			
            })
        },
        CashDrawerOptionCashIn: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/cash-drawer-option/cashin'			
            })
        },
        CashDrawerOptionPayOut: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cash-drawer-option/payout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashDrawerOptionDrawer: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cash-drawer-option',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
        },
        SelectedCashDrawer: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/selected-cash-drawer',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SelectedCashDrawerCashIn: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/selected-cash-drawer',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SelectedCashDrawerPayOut: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/selected-cash-drawer/payout',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CheckCashDrawerMutiple: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/check/cash-drawer-setting'			
            })
        },
        CheckCashDrawerMutipleCashIn: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/check/cash-drawer-setting/cashin'			
            })
        },
        CheckCashDrawerMutiplePayOut: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/check/cash-drawer-setting/payout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
        },
        UnsetCashDrawer: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/unset-cash-drawer-setting'			
            })
        },
        UnsetCashDrawerCashOut: function(postdata){
            return $http({ 
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/unset-cash-drawer-setting',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}	
            }) 
        },
        UnsetCashDrawerByStation: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/cashout/unset-cash-darwer-setting-station'
            })
        },
        SaveTimeClockComment: function(postdata){ 
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/timeclock/comment/save',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CheckCache: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/timeclock/check-cache'			
            }) 
        },
        PayoutSelectionList: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/payout-selection-list'
            })
        },
        CashOutConvertPDF: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashout/convert-pdf',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashOutSendEMail: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashout/send-email',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        LoadPayments: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/load_payments'
            })
        },
        LoadCashierSale: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/cashier_sale'
            })
        },

        GetItemsOnHoldSale: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/recall/get-items-onhold-sale',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
            })
        },

        QuickSaleTotal: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/cashier/recall/quicksale-total',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
        RePrintReceipt: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/cashier/recall/reprint-receipt',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        RePrintReceipt2: function(ReceiptHeaderUnique){
            return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall/reprint-receipt/print/'+ReceiptHeaderUnique,
			})
        },

        RecallFilter: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/recall/filter'
			})
        },
        RecallFilterSearch: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/cashier/recall/filter/search',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        QRRecallFilterSearch: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/recall/filter/search',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        OpenReceipt: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/cashier/recall/open_receipt',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        RecallCreateReceipt: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/recall/new_sale'
			})
        },
        GetOnHoldSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/onhold-sale-column'
            })
        },
        GetCompletedSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/completed-sale-column'
            })
        },
        GetCashSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/cash-sale-column'
            })
        },
        GetCreditCardSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/creditcard-sale-column'
            })
        },
        GetGiftCardSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/giftcard-sale-column'
            })
        },
        GetCheckSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/check-sale-column'
            })
        },
        GetVoidedSaleColumns: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/void-sale-column'
            })   
        },
        RecallCashierPayment: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/cashier/recall/payment',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        LoadSaleByTab: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/recall/load-sale-by-tab',
                headers: {'Content-type': 'application/x-www-form-urlencoded'}
            })
        },
        ViewReceipt: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/recall/view-receipt',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
        EditReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/cashier/recall/edit-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
        RecallPrinterCheck: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/recall/printer-check'
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
        /*
        |--------------------------------------------------------------------|
        | Cash In by individual server
        |--------------------------------------------------------------------|
        */
        CashInServerEnterPasscode: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/cashin-server/passcode',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        CashInServerCheckCashIn: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/cashin-server/cashin-server-check',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        SaveServerCashInAmount: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/cashin-server/save-cashin-amount',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        PrinterCashInServerCheck: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/cashin-server/printer-check',
                data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        /*
        |--------------------------------------------------------------------|
        | Cash Out by individual server
        |--------------------------------------------------------------------|
        */
        CashOutServerCheckCashIn: function(postdata){
            return $http({
				method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashout-server/cashin-server-check',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        CashOutServerEnterPasscode: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/cashout-server/passcode',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        SaveAmountCashOutServer: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-server/amount/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        PrinterCashOutServerCheck: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/cashout-server/printer-check',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        /*
        |----------------------------------------------------------------------
        | Cash In by Station
        |----------------------------------------------------------------------
        */
        CheckUserPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin-station/check-user-passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashInStationCheck: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashin-station/cashin-check',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})        
        },
        SaveAmountCashInStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin-station/save-amount',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        PrinterCashInStationCheck: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashin-station/printer-check',
			})
        },
        CheckCashDrawerMutipleCashInStation: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashin-station/cash-drawer-setting',		
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} 	
            })
        },
        CheckCashDrawerMutipleCashInServer: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashin-server/cash-drawer-setting',		
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} 	
            })
        },
        CashDrawerOptionCashInStation: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashin-station/cash-drawer-option'	,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
            })
        },
        CashDrawerOptionCashInServer: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashin-station/cash-drawer-option'	,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
            })
        },
        /*
        |----------------------------------------------------------------------
        | Cash Out by Station
        |----------------------------------------------------------------------
        */
        CashOutStationPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashInStationCheckCashOut: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/cashout-station/cashin-check'			
            })
        },
        SaveAmountCashOutStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerSaveAmountCashOutStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/cashout-station/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        PrinterCashOutStationCheck: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/printer-check',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        EnterPassCodeCashserver: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin-server/passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CreateReceiptCashInServer: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin-server/new-sale',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        LoadConfigReportReceipt: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ReceiptReportEnterPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        LoadStationClosing: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/receipt/report/tip-by-server',
			})
        },
        PrintTipByServer: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/print-tip-by-sever',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        PrintClosingReport: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/print-closing-report',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        },
        UpdateStationClosing: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/receipt/report/end-of-day',
			})
        },
        PrintCashOut: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cash-out/print',
			})
        },
        ListCashInServer: function(postdata){
            return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/cashier/cashout-server/server-cashin-list',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        CheckUserSecurity: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-server/check-user-security',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ListCashInByStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/server-cashin-list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        CheckUserSecurityByStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/check-user-security',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashOutStationCheckCashIn: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/cashin-check2',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashOutStationCheckCashInHistory: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout-station/cashin-check2-history',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        OpenCashDrawer: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashdrawer/open_cash_drawer',
                async: false
			})
        },
        GetLocation: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/load-location',
			})
        },
        CashOutSearch: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receiptreport/cashout-search',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashOutReportPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receiptreport/cashout-reprint',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetCashInAmount: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/get-cashin-amount',
			})
        },
        CashInServerCheckByUserId: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashin-server/check-cashin-server-by-userid',
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
        CheckUserManagerCookie: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-user-manager-cookie',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: postdata,
			})
		},
        CashInStationCheckByUserId: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashin-station/check-cashin-server-by-userid',
			})
        },
        DenominationForm: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashout/denomination/form',
			})
        },
        DenominationByStationCashierUniqueAndPaymentUnique: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/denomination',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        UpdateDenomination: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/denomination/update',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        DenominationPrintReceipt: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/denomination/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        UpdateTheme: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/theme/update',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        ThemeList: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/theme/list',
			})
        },
        CashOutTimeClockSearch: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/timeclock',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        TimeclockReportPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/receipt/report/timeclock/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        UpdateCashOutBankDeposit: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashout/update/bank-deposit',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        CashInDenomination: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cashin/denomination',
			})
        },
        DrawerManagerGrid: function(postdata){
            return $http({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: postdata,
                url: base_url + 'pos/cashier/drawer-manager-denomination'
            })
        },
        CashInDenominationSave: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin/denomination/save',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        CashInDenominationPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashin/denomination/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        CashDrawerCashInDenominationPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager-cashin/denomination/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        CashOutEmployeeSearch: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/report/employee-sales/search',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        CashOutEmployeePrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/report/employee-sales/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }) 
        },
        DynamicTypesColumns: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/dynamic/grid/type-columns',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        DailySalesReport: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/receipt-report/daily-sales',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        DailySalesSummaryReportPrint: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/receipt-report/daily-sales/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        ItemTransferSetCookie: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/item-transfer-set-point',
			})
        },
        EmployeeSalesSummary: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/receipt-report/employee/sales-summary',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        EmployeeSalesSummaryPrint: function(postdata){
            return $http({
				method: 'POST',
                url: base_url + 'pos/cashier/receipt-report/employee/sales-summary/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        CashOutClearCache: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cash-out/clearcache',
			})
        },
        TestServer: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/cashier/cash-out/test-service',
			})
        },
        GetOnHoldSale: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/get-onhold-sale'
			})
        },
        LoadOnHoldSale: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointosale/load-all-onhold-sale'
			})
        },
        QReOrder: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/re-order',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        POSQuickSaleTotal: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/quicksale-total',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        
        QuickRecallRemoveItemCheck: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/remove-item-check',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        QuickRecallRemoveItem: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/remove',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        QuickRecallLoadReasonList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/quick-recall/reason-list',
			})
        },
        QuickRecallRemoveItemReason: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/remove-item-reason',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        QuickLoadDiscountList: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/quick-recall/discount-list'			
            })
        },
        QuickRecallDiscountProceed: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/apply-discount',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        RePrintReceipt2: function(ReceiptHeaderUnique){
            return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall/reprint-receipt/print/'+ReceiptHeaderUnique,
			})
        },
        OnHoldPrinterCheck: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/quick-recall/printer-check'
            })
        },
        EnterPassCodeQuickRecallAssign: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/assign-user',
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
        QuickRecallUpdateReceiptsServer: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/update-server',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        KitchenPrintReceipt: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/kitchen/print',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        AllTables: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/all-tables'			
            })
        },
        SelectTableManualWithCustomerNo: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/tables/select/customer-no',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
        SelectTableManualWithOutCustomerNo: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/cashier/tables/select/no-customer',
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
        GetTablesInUse: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/get-table-inuse',
			})
        },
        TableManualCheckReceiptStatus: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/check-receipt-status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
        TableManualPreviousReceiptSetStatus: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table-manual/receipt-set-status',
			})
        },
        TableManualOpenReceipt: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/open-receipt',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TableManualPreviousReceiptOnHold: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table-manual/on-hold',
			})
        },
        TableManualPreviousReceiptCompleted: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table-manual/receipt-complete',
			})
        },
        RecallCustomerNoCreateReceipt: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/recall/new_sale',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        QRCheckReceiptStatus: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/check-receipt-status',
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
        GetAllOnHoldReceiptsInfo: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/onhold-receipts',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        TipByServerSearch: function(postdata){
            return $http({
                 method: 'POST',
                url: base_url + 'pos/cashier/receiptreports/tipbyserver-search',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        SaveMenuSettings: function(postdata){
            return $http({
                method: 'POST',
               url: base_url + 'pos/cashier/menu-setting-save',
               data: postdata,
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               }
           })
        },
        EnterPassCodeDeleteReceipt: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/delete_receipt_passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DeleteReceiptConfirmed: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/quick-recall/delete_receipt_confirmed',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetManagerDrawerLocationList: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/cashier/drawer-manager-location-list',
            })
        },
        DrawerDenominationSave: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager-denomination/save',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerListCashInByStation: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/cashout/server-cashin-list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerSaveCount: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/save-count',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetStationCashOutDenomination: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/cashout-denomination',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CashDrawerCountDenominationPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/count-denomination-print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        EnterUserPasscode: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/user-passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        MenuSecurityCheck: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/position-security',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetManagerDrawerHistoryList: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager-history-list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        EditDrawerManagerHistory: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/edit-drawer-manager-history',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerPrintCurrent: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager-print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerCashInDenomination: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/cashin',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DrawerManagerCashInDenominationPrint: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/drawer-manager/cashin-print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }, 
        SetupCashedIn: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/setup-cashed-in-id',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetCashInInfo: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashed-in-info',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
    }
}]);
