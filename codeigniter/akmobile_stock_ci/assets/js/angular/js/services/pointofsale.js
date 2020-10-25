//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";
//var api_url = "http://ak1.akamaipos.com:1337/";

angular.module("akamaiposApp")
.factory("posData", function posDataFactory($http, $q){
	return {
		Category: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/category'
		    });
		},
		OrderedItemList: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/ordered-item-list'
			});
		},
		OrderedItemListSplit: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/ordered-item-list-split'
			});
		},
		Totals: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/sold-totals'
			});
		},
		Tax: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/tax'
			});
		},
		ItemButtonDefault: function(){
			var postDataDefaultCategory="catid=1";
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/item-selection-list',
				data: postDataDefaultCategory,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},
		SelectButtonByCategory: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/item-selection-list',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AddItem: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/add-item',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				async: false
			})
		},
		NewSale: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/new-sale'
			})
		},
		
		InstantNewSale: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/instant-new-sale'
			})
		},

		InstantNewSaleCustomer: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/instant-new-sale/customer'
			})
		},
		
		ItemInfo: function(postData){
			return 	$http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/discount-item',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		DiscountItem: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/discount-item-computation',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ReceiptDiscount: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/receipt-discount-computation',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PriceChange: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/price-change-computation',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		PriceChangeAll: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/price-change-computation-allitem',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		QuantityChange: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/new-quantity',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		   });
		},
		OnHold: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/on-hold-sale',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		RemoveItem: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/remove-item',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CancelSale: function(){
			return $http({
				method: 'POST',
				url:base_url + 'pos/pointofsale/cancel-sale'
			})
		},
		QuantityTotal: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/item-information',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckNoItemTax: function(postData){
			return $http({
						method: 'POST',
						url: base_url + 'pos/pointofsale/check-no-item-tax',
						data: postData,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				   });
		},
		CheckItemTax: function(postData){
			return $http({
						method: 'POST',
						url: base_url + 'pos/pointofsale/check-item-tax',
						data: postData,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				   });
		},
		TaxChecker: function(postData){
			return $http({
						method: 'POST',
						url: base_url + 'pos/pointofsale/tax-checker',
						data: postData,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				   });
		},
		UpdateNoReceiptTax: function(postData){
			return $http({
						method: 'POST',
						url: base_url + 'pos/pointofsale/no-receipt-tax',
						data: postData,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				   });
		},
		ReceiptTaxChecker: function(){
			return $http({
						method: 'GET',
						url: base_url + 'pos/pointofsale/receipt-tax-checker'
				   });
		},
		AddReceiptTaxChecker: function(){
			return $http({
					 	method: 'GET',
					 	url: base_url + 'pos/pointofsale/add-receipt-tax-checker'
				   });
		},
		ReceiptTax: function(){
			return $http({
						method: 'GET',
						url: base_url + 'pos/pointofsale/receipt-tax'
				   });
		},
		Customers: function(){
			return $http({
					method: 'GET',
					url: base_url + 'pos/pointofsale/load-customers'
		    });
		},
		AddCustomer: function(postData){
			return $http({
					method: 'POST',
					url: base_url + 'pos/pointofsale/add-customer',
					data: postData,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 });
		},
		ZipCodes: function(){
 			return 	$http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/zip-codes'
			})
		},
		Cities: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/cities-list'
			})
		},
		Island: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/island-list'
			})
		},
		States: function(){
			return $http({
				method: 'GET',
				url: base_url + 'akamapos/pointofsale/states-list'
			})
		},
		Countries: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/country-list'
			})
		},
		SaveRNoteMsg: function(postData){
			return $http({
					method: 'POST',
					url: base_url + 'pos/pointofsale/save-new-receipt-note',
					data: postData,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		UpdateRNoteMsg: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/update-receipt-note',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckReceiptNote: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-receipt-note'
			});
		},
		DeleteRNoteMsg: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/delete-receipt-note',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckItemNote: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-item-note',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ItemNoteSave: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/item-note-save',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EditItemNotes: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/edit-item-note',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			 })
		},
		DeleteItemNotes: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/delete-item-note',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		FindCity: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/zip-codes',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SaveNewCustomer: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/save-new-customer',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GetCustomerProfile: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/get-customer-profile',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EditCustomerProfileSave: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/edit-customer-save',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		DeleteCustomer: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/delete-customer',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CustomerGridPrepare: function(){
			return $http({
				method: 'get',
				url: base_url + 'pos/pointofsale/customer/grid-cols'
			})
		},
		AddNewCustomerWindow: function(){
			return $http({
				method: 'get',
				url: base_url + 'pos/pointofsale/customer/add-new'
			})
		},
		EditCustomerWindow: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/customer/edit',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		OpenReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/open-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		CombineOrOpenReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/combine-or-open-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		CombineReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/combine-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		TransCustomer: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/trans-customer',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		ReturnItem: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/return-item',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		Discounts: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/discount-total'
			 })
		},
		NewSaleQue: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/new-sale-que'
			 })
		},
		CancelReceipt: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/cancel-receipt',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		PutOnHold: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/put-on-hold',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		PutOnHoldLogo:function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/put-on-hold-logo',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		SearchInventoryItem: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/search-inventory-item',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		SelectCustomer: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/customer-selected'
			 })
		},
		POSTotal:  function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/pos-total'
			 })
		},
		PaymentType: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/load-payment-types'
			 })
		},
		ApplyPayment: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/set-button-payment'
			 })
		},
		TransPayment: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment-apply',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		POSPayments: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/pos-payments'
			 })
		},
		POSChange: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/pos-change'
			 })
		},
		DisplayAllPayments: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/display-payments'
			 })
		},
		VoidPayment: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/void-payment',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		VoidCardPayment: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/void-card-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EDPayment: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/ed-button-payment'
			})
		},
		ViewReceipt: function(postData){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/view-receipt',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		CheckReceiptStatus: function(){
			 return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-receipt-status'
			 })
		},
		EditReceipt: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/edit-receipt',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckBalance: function(){
			return $http({
				 method: 'POST',
				 url: base_url + 'pos/pointofsale/check-balance'
			})
		},
		Print: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/print'
			})
		},
		OpenDrawer: function(){
		  return $http({
			method: 'POST',
			url: base_url + 'pos/cashier/open-drawer'
		  })
		},
		GetHeaderInfo: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/header-info'
	    	})
		},
		GetHeaderInfoCompleted: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/header-info-completed'
	    	})
		},
		GetHeaderInfoCustomer: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/header-info/customer'
	    	})
		},
		EnterPassCode: function(postdata){
		  	return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-passcode',
				data: postdata,
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
		PrinterCheckRecall: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/payment/printer-check-recall',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PrinterCheckRecallVoid: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/payment/printer-check-recall-void',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CashDrawerPrinterCheck: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/printer-check',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		TransCheck: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/trans-check'
			})
		},
		CheckStatusPayment: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/payment-check-status'
			})
		},
		WhenTotals: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/when-totals'
			})
		},

		PaymentCardProcess: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/card-process'
			})
		},

		CardApprovePayment: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/card-payment-approved'
			})
		},

		RowPayment: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/get-row-payment'
			})
		},

		UsersSettings: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/user-settings'
			})
		},

		ConfigStation: function(){
			return $http({
				method: 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/config-station'
			})
		},

		EmptyTransaction: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/empty-transaction',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		EmptyTransactionCompleted: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/empty-transaction-completed',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		ProcessCreditCard: function(postdata){
			return $http({
				url: base_url + 'pos/pointofsale/device/devicecreditsale',
				method: 'POST',
				data: postdata,
				async : true,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			})
		},

		CreditCardProcessSave: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/creditcard/process/save'
			})
		},

		CheckIfVoid: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/check-voided'
			})
		},

		Tips: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/tips'
			})
		},

		AdjustTip: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/no-device/adjust/tip'
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

		KitchenPrintReceipt: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/kitchen/print',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		PrinterCheckAll: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/printer/check'
			})
		},

		KitchenPrintProcessed: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/item-print-status'
			})
		},

		CheckItemQuestion: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/check-item-question'
			})
		},

		LoadQuestions: function(postdata){
			return $http({
				url: base_url + 'pos/pointofsale/load-questions',
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			})
		},

		LoadQuestionsByItem: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/load-questions-by-item'
			})
		},

		LoadQuestionItems: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/load-question-items'
			})
		},

		SaveSelectedItems:function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/save-selected-items'
			})
		},

		SaveSelectedItemsList: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/save-selected-items-list'
			})	
		},

		SaveEditSelectedItems: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/save-edit-selected-items'
			})
		},

		RemoveMultipleItem: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/remove-multiple-item'
			})
		},

		LoadZipCodes: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/geocity/zipcodes'
			})
		},

		LoadNestedbyZip: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/geocity/nested-by-zipcode'
			})
		},

		GetCurrentReceiptHeader: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/current-receipt'
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

		EnterPassCodeCashier: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/change-server'
			})
		},

		Prompt: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/prompt'
			})
		},

		KitchenNote: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/kitchen-comments'
			})
		},

		AddOpenItem: function(postdata){
			return $http({
				url: base_url + 'pos/pointofsale/add-open-item',
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		GetInfoByReceiptDetails: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/details'
			})
		},

		checkKitchenNote: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/kitchen-note'
			})
		},
		
		CheckNote: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/check-note'
			})
		},

		CustomerPurchases: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/customer/purchases'
			})
		},

		PoleDisplayReset: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/poledisplay/reset'
			}) 
		},

		PoleDisplay: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/poledisplay'
			})
		},
		PoleDisplayTotal: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/poledisplay/total'
			}) 
		},
		PoleDispPayment: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/poledisplay/payment'
			})
		},
		EBT: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/ebt-total'
			})
		},
		CalculateEBTPayment: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/calculate-ebt-payment'
			})
		},
		EBTCalculate: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/ebt-tax-calculate'
			})
		},
		RecallLocationRequest: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/recall-page-request'
			})
		},
		BacktoRequestPage: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall_request_call_page'
			})
		},
		RecallFirstCheck: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall-first-check'
			})
		},
		RecallSecondCheck: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall-second-check'
			})
		},
		ConfigMenuItemByRowColumn:function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/config-menu-item-by-row-column'
			})
		},
		
		TableOrderNoInject: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url+ 'pos/pointofsale/table-no',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		},
		OpenReceiptTable: function(postData){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/open-receipt-table',
				data: postData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ClearDBCache: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/cashier/clear-db-cache'			
			})
		},
		CheckItemAddedOnList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-added-item'			
			})
		},
		
		QuickAddSale : function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/add-new-sale'
			})
		},
		UpdateReceiptDetailsUnique: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/update-receipt-details-unique',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		QuickSale: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/quick-sale'			
			})
		},
		AddItemGiftCard: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/add-item-gift-card',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GetGiftCardBalance: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment/get-gift-card-balance',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PaymentGiftCard: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/gift-card-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ValidateAmountBalance: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/giftcard-validate-amount-balance',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ValidateGiftCard : function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/giftcard-validate',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		VoidGiftCardPayment: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/void-giftcard-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GiftCardReload: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/reload-gift-card',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GiftCardBalancePOSMain: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/get-gift-card-balance',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GiftCardCheckTotal: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/gift-card-check-total'
			})
		},
		RefundPaymentGiftCard: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/gift-card-refund-payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SelCategoryMenuItems: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/select-category-menu-items',
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
		CheckQuantity: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-item-quantity',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EBTBalance: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/ebt-balance',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EBTCheck: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/check-ebt',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		SelectUser: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/item-cashier',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		GetCurrentSalesPerson: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/get-current-sales-person',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		Locations: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/locations'
			})
		},
		GetOnHoldSale: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/get-onhold-sale'
			})
		},
		GetItemsOnHoldSale: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/get-items-onhold-sale',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		CheckReturnReason: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-return-reason'
			})
		},
		RemoveItemCheckReasons: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/remove-check-item-reason'
			})
		},
		LoadReasonList: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/load-reason-list',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		LoadReasonListCancelSale: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/load-reason-list-cancel-sale',
			})
		},
		QuickRecallLoadReasonList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/quick-recall/reason-list',
			})
		},
		ReasonUpdate: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/reason-update',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		RemoveItemReason: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/remove-item-reason',	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		LoadDiscountList: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/get-discount-list',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		SaveItemDiscount: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/save-item-discount',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		SaveReceiptDiscount: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/save_receipt_discount',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		CheckSettingRequiredLabel: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-required-label'
			})
		},
		QuickOnHold: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/quick-onhold',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		TableQuickOnHold: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/table/quick-onhold',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})	
		},
		CustomerList: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/customer-list',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CardHistory: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/card-history',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CardPaymentOnTheGo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/card-payment-on-the-go',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CustomerProfile: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/customer-profile',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SaveCustomerProfile: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/save-customer-profile',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AuthZero: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/zero-auth',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CancelSaleReason: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/cancel-sale-reason',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		DeleteCardOnFile: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/delete-card-on-file',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		EditReceiptSecurity: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/edit-receipt-security',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		
		CheckUserManager: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/check-user-manager',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},

		OrderTypeList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/order-type-list'
			})
		},

		GetOrderNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/get-order-number',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		OrderTypePopupList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/order-type-list-selection'
			})
		},
		QuickSaleTotal: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/quicksale-total',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EmailReceiptForm: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/email/form'
			})
		},
		SendEmail: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/email/send-email',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				async: false
			})
		},
		CreateFile: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/email/receipt-pdf'
			})
		},
		UpdateCustomerProfile: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/email/customer-edit-profile',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PaymentCheckAccountForm: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/payment/check-account-form'
			})
		},
		CheckAccountProceed: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/payment/check-account-proceed',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckAccountRoutingValidation: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/payment/check-account-validation',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckCompleted: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/item-check-completed',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GiftCardIssue: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/giftcard/issue',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GiftCardBalance: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/balance'
			})
		},
		GiftCardPaymentSale: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/sale'
			})
		},
		GiftCardPaymentRefund: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/return-sale'
			})
		},
		GiftCardDatacapReload: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/reload'
			})
		},
		VoidGiftCardPaymentAPI: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/void-sale'
			})
		},
		ReturnVoidGiftCardPaymentAPI: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/void-return'
			})
		},
		GiftCardVoidIssue: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/void-issue'
			})
		},
		GiftCardVoidReload: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/void-reload'
			})
		},
		GiftCardReturn: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/return-item'
			})
		},
		ReturnGiftCardApproved: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/return-approved'
			})
		},
		GiftCardRefund: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/refund'
			})
		},
		GiftCardVoidReturn: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/void-return-non-payment'
			})
		},
		GCOption: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/options'
			})
		},
		AcctDefault: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/giftcard/account-default'
			})
		},
		CustomerAddCardInfo: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/customer-add-card-info'
			})
		},
		GiftCardPrintBalance: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url: base_url + 'pos/pointofsale/giftcard/print-balance'
			})
		},
		QuickAddReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split-check/add-new-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SplitOpenReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split-open-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		SplitLoadFrom: function(postdata){
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split/reload-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise;
		},
		SplitLoadTo: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split/load-new-receipt',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SplitAddItem: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split/add-item',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		CloseAllEmptyReceipt: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/customer-add-card-info'
			})
		},
		SplitCheckUpdateRemove: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/split/update-info'
			})
		},
		UpdateOrderNo: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/ordertype/update-ordertype',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		OpenDrawerReason: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/open-drawer/reason'
			})
		},
		CashDrawerReasonSave: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/open-drawer/save-reason',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		POSMenu: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/pos-menu/menu-list'
			})
		},
		UpdatePOSMenu: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/pos-menu/update-menu',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		TaxList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/tax-list'
			})
		},
		RemoveTaxSelectedList: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/tax/remove-tax-selected',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
		},
		ShowPaymentView: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/payment/view'
			})
		},
		GetOnHoldSaleColumns: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/quick-recall/onhold-sale-column'
            })
		},
		OnHoldPrinterCheck: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/quick-recall/printer-check'
            })
        },
		RePrintReceipt: function(ReceiptHeaderUnique){
            return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/recall/reprint-receipt/'+ReceiptHeaderUnique,
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
                url: base_url + 'pos/pointofsale/recall/filter'
			})
        },
		RecallFilterSearch: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/recall/filter/search',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
        },
		LoadOnHoldSale: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointosale/load-all-onhold-sale'
			})
		},
		GetPrinterDefault: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/get-printer-default'
			})
		},
		CheckPrinterStatus: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/check-printer-status',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		PrintReceipt: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/print-receipt-single',
			})
		},
		GetTables: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/tables/get-tables',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GetSectionList: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/tables/get-tables-section',
			})
		},
		SelectSectionTable: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/select-section-table',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		RefreshTables: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/tables/refresh-tables',
			})
		},
		SelectTableWithoutCustomerNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/select-table-without-no-of-customer',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SelectTableWithCustomerNo: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/select-table-with-no-of-customer',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		TransferTableWithoutNoOfCustomer: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/transfer-table-without-no-of-customer',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		CheckReceiptTableExist: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/check-receipt-table-exist',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ReceiptForTableCheck: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/tables/receipt_for_table_check',
			})
		},
		ReceiptForItemCheck: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/tables/receipt_for_item_check',
			})
		},
		PaymentMethodSecurity: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/payment-method-security',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		TableQform: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
                url: base_url + 'pos/pointofsale/tables/table-question-form',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GetReceiptHeaderCurrentStatus: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/tables/get-receipt-current-status',
			})
		},
		PayoutSelectionList: function(){
            return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/payout-selection-list'
            })
        },
		RestrictionPasscodePayout: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/passcode/payout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		CashOutDisabled: function(){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/cash-in-check/cashier'
            })
        },
		CheckCashDrawerMutiplePayOut: function(postdata){
            return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/check/cash-drawer-setting/payout',	
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
		PayOut: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/payout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })	
        },
		PrintPayOutReceipt: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/payout/print-receipt',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })	
		},
		CheckTableEditing: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/tables/check-table-editing',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		createCustomerWindow: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/form-search',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		ClearAll: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/tables/clear',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		RecallCheckPrevReceiptStatus: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/check/previous-receipt-status'			
            })
		},
		CustomerPurchasedPrint: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/purchases/print',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		CustomerCreditCardCheck: function(postdata){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/customer/credit-card/check'			
            })
		},
		FindSelectedCustomerById: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/select',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		SwipeCreateCustomer: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/swipe/create-customer',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		ReOrderItem: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/re-order',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
		ServerCashIn: function(){
			return $http({ 
                method: 'GET',
                url: base_url + 'pos/pointofsale/server-cashin-list'			
            })
		},
		EnterPassCodeShowCashedIn: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/cashier/passcode',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		AssignServer: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/assign-server',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		AssignServer2: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/assign-server-wo-cashin',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
		GetWeigh: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/weightscale/get-weight'			
            })
		},
		UpdateReceiptsServer: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/sale-update-server',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		GetPoints: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/get-points'			
            })
		},
		RewardsByCustomerPoints: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/rewards'			
            })
		},
		SaveReward: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/save-reward',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		LoadEverything: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/load-everything'			
            })
		},
		PrintInitializeCheckIntegratedTwo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/datacap/check-print-receipt',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		ReloadInformation: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/load-everything'			
            })
		},
		ServerAll: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/list-all-server'			
            })
		},
		CheckCustomerRestriction: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/security',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		CustomerPurchaseGrid: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/customer/purchase-grid'			
            })
		},
		CustomerPointsRewardGrid: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/customer/points-grid'			
            })
		},
		PrintRewardByCustomer: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/print-reward',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		PrintRewardByOnDisplay: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/reward/print-reward'		
            })
		}, 
		PrintPromoByOnDisplay: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/reward/print-promo'
			})
		},
		SetOrderType: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/set-order-type',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		TableCancelSale: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/table-cancel-sale'		
            })
		},
		DownloadPDFReceipt: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/email/download-receipt',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		PrintGiftReceipt: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/giftreceipt/print',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}	
            })
		},
		RemoveMultipleItemList: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/remove-multiple-item/page'		
            })
		},
		RemoveMultiItemCheck: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/remove-multiple-item/check',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		RemoveMultipleItemProcess: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/remove-multiple-item/remove',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		LoadAfterRemoveMultipleItem: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/remove-multiple-item/load'		
            })
		},
		ReduceMultipleItemProcess: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/remove-multiple-item/reduce',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
            })
		},
		SellBelowCostPage: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/sellbelowcost',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}					
            })
		},
		DiscountBelowCostPage: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/discountbelowcost',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}					
            })
		},
		DiscountReceiptBelowCostPage: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/discount-receipt-belowcost',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}	
            })
		},
		PosChangeScreenWindow: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/change-screen-page'		
            })
		},
		DiscountBelowCostPage2: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/discountbelowcost/page2',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}					
            })
		},
		AddRemoveItemTaxSelectedList: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/item-tax-list/add-remove-tax',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}					
            })
		},
		ItemTaxList: function(postdata){
			return $http({
                method: 'POST',
				url: base_url + 'pos/pointofsale/item-tax-list/get-tax',
				data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}					
            })
		},
		CashDrawerOptionPayOut: function(postdata){
			return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/pointofsale/cash-drawer-option/payout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		SelectedCashDrawerPayOut: function(postdata){
			return $http({
                method: 'POST',
                data: postdata,
                url: base_url + 'pos/pointofsale/selected-cash-drawer/payout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
		},
		GetDefaultTab: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/recall/get-default-tab'		
            })
		},
		GetInventorySearchColumns: function(){
			return $http({
                method: 'GET',
                url: base_url + 'pos/pointofsale/inventory-search/get-inventory-columns'		
            })
		},
		ItemPriceLevelChange: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/item-price-level',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		EnterVerifyAge: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/enter-age-verify',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SetAgeVerified: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/set-age-verified'
			})
		},
		CheckAgeVerifyCode: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-age-verified-code'
			})
		},
		DiscountReceiptLineBelowCost: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/discount-receipt-line-below-cost',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ItemCheckList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/item-check-list'
			})
		},
		ReceiptGiftItemStatus: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/receipt-gift-item-status'
			})
		},
		PriceChangeReason: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/price-change-reason',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SwipeCardForm: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/swipe-card-form'
			})
		},
		ProcessCreditCardSwipe: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/device/swipe/devicecreditsale',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ChangeScreenUpdateStatus: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/change-screen/update-receipt-status'
			})
		},
		CashInServerCheckByUserId: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/cashin-check-by-userid'
			})
		},
		StoreCreditCheck: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment/store-credit/form',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		StoreCreditPayment: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment/store-credit/payment',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		StoreCreditPrintBalance: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment/storecredit/balance/print',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ItemSearchOptionList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/item-search-option'
			})
		},
		UpdateCustomerQuantity: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/customer/quantity',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SearchInventoryItemArray: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/item/search',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SearchReceiptNumber: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/search-receipt-number',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		AcceptReturnDynaminCols: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/accept-return-columns'
			})
		},
		AcceptReturnDynamicSelectedCols: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/accept-return-selected-columns'
			})
		},
		AcceptReturnReceiptSelected: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/accept-return-item-selected',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ReturnItemsSelectedSave: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/accept-return-item-save',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		ReturnReceiptCheck: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/accept-return-check'
			})
		},
		SalesPersonDynaminCols: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/sales-person-columns'
			})
		},
		SalesPersonList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/users/list'
			})
		},
		ServerCashedIn: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/server/all-cashed-in/list'
			})
		},
		ALLServerList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/server/all/list'
			})
		},
		GetCurrentAssigned: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/current-assign-user'
			})
		},
		AssignList: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/assign-list'
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
            return $http({
                method: 'POST',
                url: base_url + 'pos/cashier/timeclock/punch/check',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		CheckTableLogin: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-table-login'
			})
		},
		SplitChecksCount: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split/count-check',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			})
		},
		SplitPrintReceipt:function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/split/print-receipt',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			})
		},
		PrintCustomerCard: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/customer/print/card',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			})
		},
		ProcessCreditCardSwipeAuth: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/credit-card/authorization/api',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			})
		},
		CardPaymentOnTheGoAPI: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/credit-card/card-on-file/sale/api',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
		LoadHeader: function(){
            return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table-manual-header',
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
		SelectTableManualUpdateWithCustomerNo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/update-table',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		SelectTableManualUpdateWithOutCustomerNo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/update-table',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		SelectTableManualOnHoldWithOutCustomerNo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/onhold',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		SelectTableManualOnHoldWithCustomerNo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/onhold',
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
		TableManualPreviousReceiptCompleted: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table-manual/receipt-complete',
			})
		},
		TableManualCombineTables: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/table-manual/combine-tables',
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
		UpdateOrderType: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/receipt/ordertype',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		AssignReceiptUniqueToTable: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/tables/assign-new-receipt-to-table',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		EmailAddressForm: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/customer/email-options',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		GetCardFileInfo: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/credit-card/info',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		SaveCustomerCardOnFile: function(postdata){
			return $http({
                method: 'POST',
                url: base_url + 'pos/pointofsale/card-on-file/save',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
		},
		TableUpdateReceiptStatus: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/table/receipt-status-reset',
			})
		},
		ReprintCreditCardReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/credit-card/reprint-receipt',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
			})
		},
		ReprintReceiptReturnExchange: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/reprint-receipt',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				async: false
			})
		},
		SplitCheckReceipts: function(){
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/split/get-all-receipts',
			})
		},
		ScanPromoBarcode: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/scan-promo-barcode',
				data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				async: false
			})
		},
		SavePromoDiscount: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/save-promo-discount',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
			})
		},
		DiscountPromoBelowCost: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/discount-promo-belowcost',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		GetPromoList: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/promo',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		SplitCheckDeleteEmptyChecks: function(){	
			return $http({
				method: 'GET',
                url: base_url + 'pos/pointofsale/split/delete-empty-checks',
			})
		},
		ReturnByRecordNumber: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/return_by_record_number',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		},
		RemoveMultipleItemFunction: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/remove-multiple-item/remove-multiple-item-function',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})	
		},
		ReasonRemoveMultipleItemList: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/load-reason-list-remove-multiple-items',
			})
		},
		RemoveMultipleItemReasonFunction: function(postdata){
			return $http({
				method: 'POST',
				data: postdata,
				url: base_url + 'pos/pointofsale/remove-multiple-item/remove-multiple-item-reason',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})	
		},
		GetPaymentListForm: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/get-receipt-payment-form',
			})
		},
		CheckReceiptCompleted: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-receipt-completed',
			})
		},
		ReloadItemZeroAuth: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/reload-item-zero-auth',
			})
		},
		CheckReceiptOpen: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/check-receipt-open',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: postdata,
				async: true
			})
		},
		AssignCheckReceipt: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/recall-assign-receipt-check',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: postdata,
			})
		},
		getDiscountReceiptApplied: function(){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/get-discount-receipt',
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
		CheckUserPositionCookie: function(){
			return $http({
				method: 'GET',
				url: base_url + 'pos/pointofsale/check-user-position-cookie',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			})
		},
		UserSecurityLevel: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/user-security-level',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: postdata,
			})
		},
		PaymentRefundSecurity: function(postdata){
			return $http({
				method: 'POST',
				url: base_url + 'pos/pointofsale/payment-refund-security',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: postdata,
			})
		}
	}
});
