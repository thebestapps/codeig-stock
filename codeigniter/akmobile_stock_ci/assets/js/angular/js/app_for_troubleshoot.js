(function() {
	//-->Global Variable
	var GlobalItemUnique = {};
	var svc = {};
	var DiscountVal = {};
	var numbers;
	var GlobalCustomer = null;
	var GlobalCustomerName = null;
	var SelZipcode, SelCity, SelState, SelIsland, SelCountry = null;
	var dataAdapter;
	var newCustomerCreated = null;
	var editCustomerSelected = null;
	var TempItem = [];
	var TempAddItem = [];
	var TempItemReference = [];

	//var base_url = "http://192.168.0.110:82/";
	//var base_url = "/app/";
	//var api_url = "http://ak1.akamaipos.com:1337/";
	//var api_url =  "http://akamaipos:1337/";

	$('#passcode').attr('autocomplete', 'off');

	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter) {

		var dialog;
		var dialogreceiptnote;
		var dialogitemnote;
		var dialogsearchinventory;
		var Quedialog;
		var Alertdialog;
		var PasscodeDialog;
		var AlertProcessdialog;
		var NewSaleQuedialog;
		var PriceLeveldialog;
		var AllPriceLeveldialog;
		var dialogQuantityChangeForm;
		var dialogDiscountItemForm;
		var dialogDiscountReceiptForm;
		var dialogCustomerForm;
		var dialogquestion;
		var KeyPadDialog;
		var KeyPadPasswordDialog;
		var AlertYesNodialog;
		var Keyboarddialog;
		var KitchenNumPadDialog;

		$scope.EditCustomerSaveDisabled = true;
		$scope.AddCustomerSaveDisabled = true;
		$scope.EditCustomerDefaultButtons = true;
		$scope.EditCustomerWhenCloseSaveChanges = false;
		$scope.EditCustomerWhenDelete = false;
		$scope.EditCustomerWhenClose = '';
		$scope.BtnCheckPrintWhen = true;

		$("#barcode_search").focus();
		//Customer Part
		setTimeout(function(){
			$("#customer-list").on('keydown', function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$("#customer-list").jqxComboBox('clearSelection');
					GlobalCustomer = null;
					//$("#add_save").prop('disabled', false);
				}
			})
		}, 100);
		
		$scope.CustomerEditWhen = true;
		$scope.CustomerOkWhen = true;
		//Customer End
		
		$scope.customer = {
			selected: 'Guest'
		}
		
		$scope.BtnItemsWhen = false; //Added: 01/08/2016 Note: remove this when working the item buttons.

		$scope.dateInputFromstring = 'MM/dd/yyyy';
		$scope.dateInputTostring = 'MM/dd/yyyy';

		$scope.dateInputSettingsFrom =
		{
			width: 105,
			height: 30
		}

		$scope.dateInputSettingsTo =
		{
			width: 105,
			height: 30
		}

		$scope.date = {
			from: $filter('date')(new Date(), 'MM/dd/yyyy'),
			to: $filter('date')(new Date(), 'MM/dd/yyyy')
		}

		$scope.StationselectedValue = '';
		$scope.CashInselectedValue = '';
		$scope.StatStationName = '';
		$scope.StatCashIn = '';

		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = false;

		$scope.gridSettingsOnHold = {}
		$scope.gridSettings = {}
		$scope.gridSettingsCash = {}
		$scope.gridSettingsCreditCard ={}

		$scope.StationcomboBoxSettings = {
			source: '', itemHeight: 25, height: 25, width: 80,
		}
		$scope.CashIncomboBoxSettings = {
			source: '', itemHeight: 25, height: 25, width: 120,
		};

		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = true;
		$scope.gridSettingsWhen = false;
		$scope.tabsSettings = {};
		$scope.thetabsadd = 'darkblue';
		$scope.selectedItem = 0;
		//$scope.selectedValue = "";

		$scope.searchItemwidth = "98%";

		$scope.drawer = {
			passcode: ''
		};
		
		
		/*Light Plugin Create*/
		/*@Alert*/
		/*
		@param string form_name
		@param string msg
		*/
		var populateNumpadAlert = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#alert-msg-popup").html('');
				$("#alert-msg-popup").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
					'<h4>'+msg+'</h4>'+
					'<br/>'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		/*Window Alert Properties*/
		
		var populateNumpadItemSubMenu = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-sub-menu").append('<div id="QuestionView" style="background: #144766; color:#EEE;" />');
				$("#QuestionView").html('');
				def.resolve();
			},100);
			return def.promise();
		}
		
		/*
		@param string header_text
		*/
		/*Popup Alert*/
		var WindowPopupAlert = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-alert").jqxWindow({
					height: 245,
					minWidth: 350,
					//title: header_text,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false,
					draggable: false
				});
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/*Popup Alert Yes or No*/
		var WindowPopupAlertYesNo = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-alert").jqxWindow({
					height: 265,
					minWidth: 350,
					//title: header_text,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false,
					draggable: false
				});
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/*Popup Sub Menu*/
		var WindowPopupSubMenu = function(header_text, form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-sub-menu").jqxWindow({
					height: 480,
					minWidth: '98%',
					//title: header_text,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false,
					draggable: false
				});
				$("#QuestionView").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="test_input" style="display:none;">'+
					'<div id="keyboard_submenu"></div>'+
				'</form>');
				$('#keyboard_submenu').hdkeyboard({
				  layout: "item_sub_menu",
				  input: $("#test_input")
				});
				setTimeout(function(){
					$('#dialog-numpad-sub-menu').jqxWindow('setTitle', header_text);
					$('#dialog-numpad-sub-menu').jqxWindow('open');
					def.resolve();	
				},100);
			})
			return def.promise();
		}
		
		/*Popup Keyboard*/
		var populateNumpadKeyboard = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
				$("#custom_item_keyboard").html('');
				if(form_name == 'receipt_note_form'){
					$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">Enter Receipt Note</h4>'+
					'');
				}else if (form_name == 'item_note_form'){
					$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">Enter Item Note</h4>'+
					'');
				}else if(form_name == 'kitchen_note_form'){
					$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">Enter Kitchen Note</h4>'+
					'');
				}else{
					$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">Enter Item Description</h4>'+
					'');
				}
				$("#custom_item_keyboard").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="search_field" maxlength="25" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupKeyboard = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-keyboard").jqxWindow({
					height: 430,
					minWidth: '80%',
					//title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
				});
				$('#dialog-numpad-keyboard').jqxWindow('setTitle', header_title);
				$('#dialog-numpad-keyboard').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadKeyboard = function(form_name){
			var def = $.Deferred();
			populateNumpadKeyboard(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "english",
				  input: $('#search_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		/*End Keyboard*/
		
		/*Popup Quantity*/
		var populateNumpadQuantity = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-quantity").append('<div id="quantity_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#quantity_numpad").html('');
				$("#quantity_numpad").append('<h4 style="text-align:center;">Enter New Quantity</h4>');
				$("#quantity_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" maxlength="25" style="color:#000;">'+
					'<div id="keyboard"></div>'+
				'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupQuantity = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-quantity").jqxWindow({
					height: 390,
					minWidth: 300,
					title: "Quantity Change",
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				$('#dialog-numpad-quantity').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadQuantity = function(){
			var def = $.Deferred();
			populateNumpadQuantity('quantity_form')
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numeric",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		/*End Quantity*/
		
		/*Alert Setup*/
		/*
		@param string form
		@param string msg
		*/
		var NumpadAlertYesNo = function(form, msg){
			var def = $.Deferred();
			populateNumpadAlert(form, msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_yes_no",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var NumpadAlertClose = function(form, msg){
			var def = $.Deferred();
			populateNumpadAlert(form, msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var NumpadItemSubMenu = function(form){
			var def = $.Deferred();
			populateNumpadItemSubMenu(form)
			.then(function(){
				def.resolve();
			});
			return def.promise();
		}
	
		/* Dynamic Plugin Commands */
		$(document).on('click', '.exit', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			console.log(elemRemove);
			temp_open_item = [];
		});
		
		$(document).on('click', '.alert_no', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
		})
		
		$(document).on('click', '.alert_close', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
		})
		
		$("#dialog-numpad-keyboard").on('close', function(event){
			$("#custom_item_keyboard").remove();
		})
		/* End */
	

		/* Inventory popup*/
		$scope.searchinventoryitemdialogSettings = {
			created: function(args)
			{
				dialogsearchinventory = args.instance;
			},
			resizable: false,
			width: "100%", height: 400,
			autoOpen: false,
			theme: 'darkblue',
			isModal: true,
			keyboardCloseKey: 'none',
			showCloseButton: false,
			keyboardCloseKey: 'none',
		};
		/* End */
		
		$scope.RedirectDashboard = function(){
			posData.NewSaleQue()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleqshowModal = !$scope.newsaleqshowModal;
				}else if(data.success == false){
					posData.EmptyTransaction()
					.success(function(data){
						if(data.success == true){
							$window.location.href = 'cashier';
						}
					})
				}
			})
		};
		
		var PoleDisplayTotal = function(){
		   var def = $.Deferred();
		   posData.PoleDisplayTotal()
		   .success(function(data){
			 def.resolve(); 
		   })
		   return def.promise();	 
	    }
		
	    var PoleDisplayReset = function(){
			var def = $.Deferred();
			posData.PoleDisplayReset()
			.success(function(data){
				def.resolve();
			})
			return def.promise();
		}
		
		var PoleDisplay = function(unique){
			var def = $.Deferred();
			var postdata="receipt_details_unique="+unique;
			posData.PoleDisplay(postdata)
			.success(function(data){
				def.resolve();
			})
			return def.promise();
		}
		

		var LoadStationCashIn = function(){
			var def = new $.Deferred();
			
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/station-cashier/info'
			}).success(function(data){
				var source =
				{
					datatype: "json",
					datafields: [
						{ name: 'station_cashier_unique' },
						{ name: 'CashInNumber' }
					],
					localdata: data
				};
				$scope.CashIncomboBoxSettings = {
					source: source, displayMember: "CashInNumber", valueMember: "station_cashier_unique", itemHeight: 25, height: 25, width: 150
				};
				def.resolve();
			})
			return def.promise();
		}

		var LoadStationData = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/station/info'
			}).success(function(data){
				var source =
				{
					datatype: "json",
					datafields: [
						{ name: 'Unique' },
						{ name: 'Name' }
					],
					localdata: data
				};
				$scope.StationcomboBoxSettings = {
					source: source, autoComplete: true, displayMember: "Name", valueMember: "Unique", itemHeight: 25, height: 25, width: 80
				};
				$scope.selectHandlerStation = function (event) {
					if (event.args) {
						var item = event.args.item;
						if (item) {
							$scope.StatStationName = item.value
						}
					}
				};
				def.resolve();
			})
			return def.promise();
		}
		
		/* Get Header information such like;
	    *  Receipt Number, Station Name, Location Name and Cashier Name.
		*/
		var LoadHeaderInfo = function(){
			var def = new $.Deferred(); 
			posData.GetHeaderInfo()
			.success(function(data){
				$("#receiptn").text(data.receipt_number);
				$("#station").text(data.station_name);
				//$("#cashin").text(data.cashin);
				//$("#store_name").text(data.store_name);
				$("#user_name").text(data.user_name);
				$("#tableno").text(data.tableno);
				$scope.StatStationName = data.station_number;
				$scope.StatCashIn = data.cashin;
				$scope.TempStationName = data.station_number;
				$scope.TempCashIn = data.cashin;
				
				def.resolve();
			})
			return def.promise();
		};
		/* End */

		//--> Load Categories Button
		var LoadCategories = function(){
			var def = new $.Deferred();
			posData.Category()
			.success(function(data){
				$scope.categories = data;
				def.resolve();
			});
			return def.promise();
		}//End Load Categories Button

		//-->Load	Item Button List Default Category 1
		var LoadItemButtonListDefault = function(){
			var def = new $.Deferred();
			posData.ItemButtonDefault()
			.success(function(data){
				$scope.items = data;
				def.resolve();
			});
			return def.promise();
		}// End Load Item Button List Default

		//-->On Load Ordered Item List
		var LoadOrderedItemList = function(){
			var def = new $.Deferred();
			posData.OrderedItemList()
			.success(function(data){
				$scope.ordereditemlist = data;
				def.resolve();
			});
			return def.promise();
		};
		// End Load Ordered Item List

		//-->Totals
		var LoadTotals = function(){
			var def = new $.Deferred();
			posData.WhenTotals()
			.success(function(data){
				if(data.success == true){
					posData.Totals()
					.success(function(data){
						$scope.totals = data;
						//$scope.SubTotal = data.SubTotal;
						//$scope.Total = data.Total;
					});
				}else{
					$scope.totals = 0;
				}
				def.resolve();
			})
			return def.promise();
		};
		// End Load Totals

		//-->Tax
		var LoadTax = function(){
			var def = new $.Deferred();
			posData.Tax()
			.success(function(data){
				$scope.ShowTax = data;
				def.resolve();
			})
			return def.promise();
		};
		// End Load Tax

		//-->Load Discount
		var LoadDiscount = function(){
			var def = new $.Deferred();
			posData.Discounts()
			.success(function(data){
				if(data.success == true){
					$scope.TotalDiscountShow = false;
					$scope.TotalDiscountHide = true;
					$scope.Discount = data;
				}else{
					$scope.TotalDiscountShow = true;
					$scope.TotalDiscountHide = false;
				}
				def.resolve();
			});
			return def.promise();
		}// End Load Discount
		
		var LoadEBT = function(){
			var def = new $.Deferred();
			posData.EBT()
			.success(function(data){
				if(data.success == true){
					$scope.EBTShow = false;
					$scope.EBT = data;
				}else{
					$scope.EBTShow = true;
				}
			})
			return def.promise();
		}
		
		//-->Load Payments
		var scrollTotalDown = function(){
		  setTimeout(function() {
			 var n = 1000;
    		 $('#payments').animate({ scrollTop: n }, 50);
			//alert(n);
		  }, 1000); 
	    }
		
		var LoadPayments = function(){
			var def = new $.Deferred();
			posData.POSPayments()
			.success(function(data){
				$scope.AllPayments = data;
			}).then(function(){
				scrollTotalDown();
				def.resolve();
			})
			return def.promise();
		}//End Load Payments

		//-->Load Change
		var LoadChange = function(){
			var def = new $.Deferred();
			posData.POSChange()
			.success(function(data){
				$scope.poschange = data;
				def.resolve();
			});
			return def.promise();
		}// End Load Change

		//-->Get Selected Customer
		var GetSelectedCustomer = function(){
			var def = new $.Deferred();
			posData.SelectCustomer()
			.success(function(data){
				 var CustomerId = data.CustomerId;
				 if(CustomerId){
					$scope.customer = {
						selected: data.CustomerFirstName + " " + data.CustomerLastName,
						id: data.CustomerId
					}
					$scope.RemoveCustomerWhen = true;
					GlobalCustomer = data.CustomerId;
				 }else{
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					$scope.RemoveCustomerWhen = false;
					GlobalCustomer = null;	
				 }
				 def.resolve();
			});
			return def.promise();
		}//End Get Selected Customer
		
		var GetSelectedCustomerViewType = function(){
			var def = new $.Deferred();
			posData.SelectCustomer()
			.success(function(data){
				 var CustomerId = data.CustomerId;
				 if(CustomerId){
					$scope.customer = {
						selected: data.CustomerFirstName + " " + data.CustomerLastName,
						id: data.CustomerId
					}
					GlobalCustomer = data.CustomerId;
				 }else{
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					GlobalCustomer = null;	
				 }
				 def.resolve();
			});
			return def.promise();
		}//End Get Selected Customer
		
		var GetCustomerSave = function(){
			var def = new $.Deferred();
			setTimeout(function(){
				var Default = $scope.DefaultCustomer;
				if(Default > 0){
					var postdata="CustomerUnique="+Default;
					posData.GetCustomerProfile(postdata)
					.success(function(data){
						var postData="selcustomervalue="+Default;
						postData+="&selcustomerlabel="+data.fname +" "+data.lname;
						posData.TransCustomer(postData);
					})
				}
				 def.resolve();
			},100);
			return def.promise();
		}
		
		//-->Enable/Disable Payment
		var EnableDisablePayment = function(){
			var def = new $.Deferred();
			posData.EDPayment()
			.success(function(data){
				if(data.success == true){
					$scope.BtnPaymentWhen = false;
				}else if(data.success == false){
					$scope.BtnPaymentWhen = true;
				}
				def.resolve();
			});
			return def.promise();
		}//End Enable / Disable Payment

		//-->Receipt tax checker
		var ReceiptTaxChecker = function(){
			var def = new $.Deferred();
			posData.ReceiptTaxChecker()
			.success(function(data){
				if(data.success == true){
					$scope.ReceiptNoTaxHide = false;
					$scope.ReceiptTaxHide = true;
				}else if(data.success == false){
					$scope.ReceiptNoTaxHide = true;
					$scope.ReceiptTaxHide = false;
				}
				def.resolve();
			});
			return def.promise();
		}//End Receipt tax cherker

		var CheckReceiptStatus = function(){
			var def = new $.Deferred();
			posData.CheckReceiptStatus()
			.success(function(data){
				var status = data.status;
				var orders = data.orders;

				if(status == 1 && orders == false){
					NewSaleButtons();
				}else if (status == 1 && orders == true){
					EnableButtonsWhenItemAdded();
				}else if (status == 4){
					CompletedSale();
				}else if (status == null){
					OtherButtons();
				}
				def.resolve();
			});
			return def.promise();
		};

		var OpenCashDrawer = function(){
			posData.OpenDrawer()
			.success(function(data){
				if(data.success  == true){
					$scope.alert = {
						message:"Cash Drawer opened."
					};
					Alertdialog.setTitle("Cash Drawer");
	        		Alertdialog.open();
				}else if(data.success == false){
					$scope.alert = {
						message:"No Cash Drawer installed."
					};
					Alertdialog.setTitle("Cash Drawer Error");
	        		Alertdialog.open();
				}
			})
		};

	//--> Printer Check Connection
	var PrinterCheck = function(Unique){
		var def = $.Deferred();
		var postdata ="receipt_header_unique="+Unique;
		posData.PrinterCheckRecall(postdata)
		.success(function(data){
			if(data.success == true){
				if(data.print == true){
					/* do nothing */
					def.resolve();
				}else{
					var msg="Printer error, please check <br/>";
					msg+="1. Printer is turned on. <br/>";
					msg+="2. Check printer paper. <br/>";
					msg+="3. Restart printer.";
					$scope.alert = {
						message: msg
					};
					Alertdialog.setTitle("Printer problem");
					Alertdialog.open();
					def.resolve();
				}
			}
		})
		return def.promise();
	};
	//--> End Printer Check Connection

	var ConfigStation = function(){
		var def = new $.Deferred();
		posData.ConfigStation()
		.success(function(data){
			$scope.print_receipt = data.print_receipt;
			def.resolve();
		})
		return def.promise();
	};

	var check_email = function(val){
		if(!val.match(/\S+@\S+\.\S+/)){
			return false;
		}
		if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
			return false;
		}
		return true;
	}
	
	var PrinterCheckSetting = function(formname){
		var def = $.Deferred();
		var Status = false;
		var printers = 0;
		var printerStatus = [];
		posData.PrinterCheckAll()
		.success(function(data){
			if(data.success == true){
				if(data.print == true){
					printers = data.printer;
					var msg="Printer Status<br/>";
					var count = 1;
					var statusName = '';
					$.each(printers, function(index, value){
						if(value[0] == false){
							statusName = "Poor";
						}else if(value[0] == true){
							statusName = "Good";
						}
						printerStatus.push(value[0]);
						msg+=count+". "+value[1]+" "+statusName+"<br/>";
						count++;
					})
					var resPrintStatus = printerStatus.indexOf(false);
					if(resPrintStatus >= 0){
						msg+="<br/>";
						msg+="Do you wish to continue? <br/><br/>";
						NumpadAlertYesNo(formname, msg)
						.then(function(){
							WindowPopupAlertYesNo('Printer problem')
							.then(function(){
								$(".alert_yes").focus();
							})
						})
					}else{
						Status = true;
					}
				}else{
					Status = false;
				}
			}else{
				Status = false;
			}
			def.resolve(Status);
		})
		return def.promise();
	}
	
	var KitchenPrintReceipt = function(formname){
		var def = $.Deferred();
		var KitchenPrintStatus = $scope.KitchenPrinter;
		if(KitchenPrintStatus){
			$("body").block({message: 'Checking printer connection...'});
			PrinterCheckSetting(formname)
			.done(function(Status){
				if(Status == true){
					posData.GetCurrentReceiptHeader()
					.success(function(jsondata){
						var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
						posData.KitchenPrintReceipt(postdata)
						.success(function(data){
							$("#dialog-numpad-alert").jqxWindow('close');
						})
					})
					def.resolve();
				}
				$("body").unblock();
			})
		}else{
			def.resolve();
		} 
		return def.promise();
	}
	
    $(document).on("submit",'#OnHoldPrinterStatus',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Printing receipt Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OnHold()
				.done(function(){
					$("body").unblock();
				});
				$("#dialog-numpad-alert").jqxWindow('close');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit",'#PutOnHoldPrinterStatus',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Printing receipt Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				PutOnHoldReceipt()
				.done(function(){
					$("body").unblock();
				});
				$("#dialog-numpad-alert").jqxWindow('close');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit", "#RowOnHold", function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Printing receipt Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OpenOnHoldReceipt($scope.rowReceiptHeader.Unique);
				ProcessDialog('',false,'');
				AlertQyesAndno("Printer Status", false, '', '');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit", "#RecallView", function(e){
		var def = $.Deferred();
		$("body").block({message: 'Printing receipt Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OpenViewReceipt($scope.RecallCompletedReceiptUnique);
				$("body").unblock();
				$("#dialog-numpad-alert").jqxWindow('close');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit", "#EditReceipt", function(e){
		var def = $.Deferred();
		$("body").block({message: 'Printing receipt Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				EditViewReceipt($scope.RecallCompletedReceiptUnique);
				$("body").unblock();
				$("#dialog-numpad-alert").jqxWindow('close');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	var OnHold = function(){
		var def = new $.Deferred();
		setTimeout(function(){
			 posData.OnHold()
			 .success(function(data){
				if(data.success == true){
					PoleDisplayReset();
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					ReceiptTaxChecker();
					EnableDisablePayment();
					OnHoldClicked();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id:''
					}
					$scope.RemoveCustomerWhen = false;
				}else{
					var msg="Cannot Put On Hold because Amount Due is 0. <br/>";
						msg+="Please use New Sale instead.";
					NumpadAlertClose('onhold_amount_alert', msg)
					.then(function(){
						WindowPopupAlert("On Hold Alert")
						.then(function(){
							$(".alert_close").focus();
						})
					})
				}
				 def.resolve();
			 });
		 },1000); 
		 return def.promise();
	}
	
	var PutOnHoldReceipt = function(){
		var def = new $.Deferred();
		setTimeout(function(){
		var postData="ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
			posData.PutOnHold(postData)
			.success(function(data){
				if(data.success == true){
					PoleDisplayReset();
					$scope.newsaleqshowModal = false;
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					ReceiptTaxChecker();
					EnableDisablePayment();
					OnHoldClicked();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					$scope.RemoveCustomerWhen = false;
					def.resolve();
				}
			})
		},1000);
		return def.promise();
	}
	
	LoadCategories()
	LoadItemButtonListDefault()
	LoadHeaderInfo()
	LoadStationData()
	LoadOrderedItemList()
	LoadTotals()
	LoadTax();		
	LoadEBT();	
	LoadDiscount();								
	LoadPayments();								
	LoadChange();
	GetSelectedCustomer();											
	EnableDisablePayment();											
	ReceiptTaxChecker();												
	CheckReceiptStatus();														
	ConfigStation();
	
	
	var PurchaseHistory = function(){
		$scope.purchase_history = {
			//width: "100%",
			height: 340,
			altRows: true,
			theme: 'bootstrap',
			theme: 'darkblue',
			pageable: true,
			pagerMode: 'advanced',
			columnsResize: true,
			filterable: true,
			filterMode: 'simple',
			showAggregates: true,
			source:  {
				dataType: "json",
				dataFields: [
					{ name: 'Unique', type: 'int' },
					{ name: 'TransDate', type: 'date'},
					{ name: 'ReceiptNumber', type: 'string' },
					{ name: 'Description', type: 'string' },
					{ name: 'Quantity', type: 'int' },
					{ name: 'SellPrice', type: 'string' },
					{ name: 'Total', type: 'string'},
				],
				localdata: {}
			},
			columns: [
				{ text: 'Unique', dataField: 'Unique', hidden: true},
				{ text: 'Date', dataField: 'TransDate', width: '150px'},
				{ text: 'Receipt#', dataField: 'ReceiptNumber', width: '90px' },
				{ text: 'Description', dataField: 'Description', width: '250px' },
				{ text: 'Price', dataField: 'SellPrice', width: '80px', align:'right', cellsalign: 'right'},
				{ text: 'Qty', dataField: 'Quantity', width: '70px', align:'right', cellsalign: 'right',
					aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
					aggregatesRenderer: function (aggregates, column, element) {
						var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
						var Total=parseFloat(0).toFixed(2);
						if(aggregates.Total){
							Total = aggregates.Total;
						}
						renderString +=  Total + "</div>";
						return renderString;
					}
				},
				{ text: 'Total', dataField: 'Total', width: '80px', align:'right', cellsalign: 'right',
					aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
					aggregatesRenderer: function (aggregates, column, element) {
						var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
						var Total=parseFloat(0).toFixed(2);
						if(aggregates.Total){
							Total = aggregates.Total;
						}
						renderString +=  Total + "</div>";
						return renderString;
					}
				}
			]
		}
	}
	PurchaseHistory();														
													
//##############################################################################################//

		//-->Load Item Button based on Category ID
		$scope.getItems = function(catid){
			var postDataLoadButtonItem="catid="+catid;
			posData.SelectButtonByCategory(postDataLoadButtonItem)
			.success(function(data){
				$scope.items = data;
			})
			.error(function(data, status, headers, config){
				alert(status);
			});
		};

		//-->Add Item
		$scope.addItem = function(itemid){
			$("#price_numpad").html('');
			$("#custom_item_keyboard").html();
			var ItemUnique = itemid;
			var postdata="ItemUnique="+ItemUnique;
			CheckPrompt(postdata, ItemUnique, 1)
			.then(function(){
				posData.CheckItemQuestion(postdata)
				.success(function(item_question_data){
					if(item_question_data.success == true){
						$("#Question").text(item_question_data.Question);
						Question('', true, '', item_question_data);	
					}else{
						var postDataAddItem="ItemId="+itemid;
						posData.AddItem(postDataAddItem)
						.success(function(data){
							$scope.desc = data;
							$("#receiptn").text(data.ReceiptNumber);
							PoleDisplay(data.ReceiptDetailsUnique);
						}).then(function(){
							LoadOrderedItemList();
							LoadTotals();
							LoadTax();
							LoadEBT();
							LoadDiscount();
							LoadPayments();
							LoadChange();
							ReceiptTaxChecker();
							CheckReceiptStatus();
							GetCustomerSave();
							$scope.BtnPaymentWhen = false;
						});
					}
				});
			})
		};

		//-->Set Select Item
		$scope.setSelected = function(ReceiptDestailsUnique, ItemUnique) {
		   if ($scope.lastSelected) {
			 	$scope.lastSelected.selected = '';
		   }
		   $scope.ItemUnique = ItemUnique;
		   $scope.ReceiptDetailsUnique = ReceiptDestailsUnique;
		   this.selected = 'selected';
		   $scope.lastSelected = this;
		   GlobalItemUnique.Unique = ReceiptDestailsUnique;
		   var postData = "Unique="+ReceiptDestailsUnique;
		   posData.TaxChecker(postData)
		   .success(function(data){
			   if(data.success == true){
			   	  //alert(data.msg);
				  //-->Show Button No Item Tax
				  $scope.ItemNoTaxHide = false;
				  $scope.ItemTaxHide = true;
				 }else{
				  //-->Show Button Item Tax
				  $scope.ItemTaxHide = false;
				  $scope.ItemNoTaxHide = true;
			   	  //alert(data.msg);
			   }
		   })
		};

		$scope.showModal = false;
		$scope.showModalDiscountItem = false;
		$scope.itemdiscfield = "";
		$scope.showModalDiscountReceipt = false;
		$scope.showModalPriceChange = false;
		$scope.showModalQuantityChange = false;
		$scope.showModalRecallSale = false;
		$scope.itemDiscount = 0.00;
		$scope.ItemNoTaxHide = false;
		$scope.ItemTaxHide = true;
		$scope.ReceiptNoTaxHide = false;
		$scope.ReceiptTaxHide = true;

		$scope.toggleModal = function(){
			posData.NewSaleQue()
			.success(function(data){
				if(data.success == true){
					$scope.QueReceiptHeaderUnique = data.ReceiptHeaderUnique;
					$scope.newsaleqshowModal = !$scope.newsaleqshowModal;
				}else if(data.success == false){
					$scope.showModal = !$scope.showModal;
				}
			})
		};

		$scope.CancelReceipt = function(){
			var postData = "ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
			posData.CancelReceipt(postData)
			.success(function(data){
				if(data.success == true){
					$scope.newsaleqshowModal = false;
					//NewSaleQuedialog.close();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					ReceiptTaxChecker();
					EnableDisablePayment();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
				}else if (data.success == false){
					$scope.alert = {
						message: "Please void payments first."
					};
					Alertdialog.setTitle("Cancel Receipt");
					Alertdialog.open();
				}
			})
		};

		$scope.PutOnHold = function(){
			$scope.newsaleqshowModal = false;
			KitchenPrintReceipt("PutOnHoldPrinterStatus")
			.then(function(){
				PutOnHoldReceipt();
			});
		};

		$scope.ReturnDisplay = function(){
			$scope.newsaleqshowModal = false;
			//NewSaleQuedialog.close();
		};

		$scope.yes = function(){
			//-->SaleType = 1
			var postDataSaleType="saletype=1";
			posData.NewSale(postDataSaleType)
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;
					$scope.showModal = false;
				}
			 }).then(function(){
				 	PoleDisplayReset();
				 	GetCustomerSave();
				 	LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					ReceiptTaxChecker();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					CheckReceiptStatus();
					setTimeout(function(){
						GetSelectedCustomer();
					},500)
				  $("#barcode_search").focus();
			});
		};

		$scope.no = function(){
			$scope.showModal = false;
		};
		
		//Discount
		var populateNumpadDiscount = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-discount").append('<div id="discount_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#discount_numpad").html('');
				if(form_name == 'item_discount_percent_form' || form_name == 'item_discount_dollar_form'){
					$("#discount_numpad").append(''+
					'<div class="discount-item-info" style="margin-bottom: 5px;">'+
						'<div class="" style="font-weight:bold;">Item: '+$scope.itemno+'</div>'+
						'<div class="" style="font-weight:bold;">Description: '+$scope.itemdesc+'</div>'+
					'</div>'+
					'');
				}
				if(form_name == 'item_discount_percent_form' || form_name == 'receipt_discount_percent_form'){
					$("#discount_numpad").append('<h4 style="text-align:center;">Enter % Discount</h4>');
				}else if(form_name == 'item_discount_dollar_form' || form_name == 'receipt_discount_dollar_form'){
					$("#discount_numpad").append('<h4 style="text-align:center;">Enter $ Discount</h4>');
				}
				
				$("#discount_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" maxlength="25" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupDiscount = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-discount").jqxWindow({
					height: 440,
					minWidth: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false
				});
				$('#dialog-numpad-discount').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadDiscount = function(discount_type){
			var def = $.Deferred();
			populateNumpadDiscount(discount_type)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numeric",
				  input: $('#number_field')
				});
				setTimeout(function(){
					$("#number_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		//-->Discount Item;
		$scope.DiscountItemPercent = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			if(SelectedItem){
				var postDataItemInfo="Unique="+SelectedItem;
				posData.ItemInfo(postDataItemInfo)
				.success(function(data){
					$scope.iteminfo = data;
					$scope.itemno = data.Item;
					$scope.itemdesc = data.Description;
					NumpadDiscount('item_discount_percent_form')
					.then(function(){
						WindowPopupDiscount('Discount Item Percent')
					    .then(function(){
							$('#number_field').val('0.00');
							$('#number_field').focus();
							setTimeout(function(){
								$('#number_field').select();
							},100);
						})
					})
				})
			}else{
				var msg = "Please select item first.";
				NumpadAlertClose('discount_item_percent_alert', msg)
				.then(function(){
					WindowPopupAlert('Discount Item Percent')
				});
			}
		};
		
		$(document).on('submit', '#item_discount_percent_form', function(e){
			e.preventDefault();
			var Unique = GlobalItemUnique.Unique;
			var DiscountAmount = $("#number_field").val();
			var postDataDiscountSave="optiondiscount="+1;
				postDataDiscountSave+="&discountamount="+DiscountAmount;
				postDataDiscountSave+="&unique="+Unique;
			posData.DiscountItem(postDataDiscountSave)
			.success(function(data){
				if(data.success == true){
					PoleDisplay(Unique);
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#dialog-numpad-discount").jqxWindow('close');
					GlobalItemUnique = {};
				 }else{
					 
					$scope.alert = {
						message: "Discount must be less than the item amount"
					};
					Alertdialog.setTitle("Discount Item");
					Alertdialog.open();
					
				 }
			})
		})
		
		$scope.DiscountItemDollar = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			if(SelectedItem){
				var postDataItemInfo = "Unique="+SelectedItem;
				posData.ItemInfo(postDataItemInfo)
				.success(function(data){
					$scope.iteminfo = data;
					$scope.itemno = data.Item;
					$scope.itemdesc = data.Description;
					NumpadDiscount('item_discount_dollar_form')
					.then(function(){
						WindowPopupDiscount('Discount Item Dollar')
					    .then(function(){
							$('#number_field').val('0.00');
							$('#number_field').focus();
							setTimeout(function(){
								$('#number_field').select();
							},100);
						})
					})
				})
			}else{
				var msg = "Please select item first.";
				NumpadAlertClose('discount_item_percent_alert', msg)
				.then(function(){
					WindowPopupAlert('Discount Item Percent')
				});
			}
		};
		
		$(document).on('submit', '#item_discount_dollar_form', function(e){
			e.preventDefault();
			var Unique = GlobalItemUnique.Unique;
			var DiscountAmount = $("#number_field").val();
			var postDataDiscountSave="optiondiscount="+2;
				postDataDiscountSave+="&discountamount="+DiscountAmount;
				postDataDiscountSave+="&unique="+Unique;
			posData.DiscountItem(postDataDiscountSave)
			.success(function(data){
				if(data.success == true){
					PoleDisplay(Unique);
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#dialog-numpad-discount").jqxWindow('close');
					GlobalItemUnique = {};
				 }else{
					$scope.alert = {
						message: "Discount must be less than the item amount"
					};
					Alertdialog.setTitle("Discount Item");
					Alertdialog.open();
				 }
			})
		})

		$scope.DiscountItemno = function(){
			//$scope.showModalDiscountItem = false;
			dialogDiscountItemForm.close();
			$scope.discountItem = {
				amount: 0
			};
		};
		
		$scope.ReCall = function(){
			$window.location = base_url + "pos/pointofsale/recall-sale";	
		}
		
		
		//-->Payment
		$scope.Payment = function(){
			window.location.href = base_url + 'pos/pointofsale/payment';
		};
		//-->RemoveItem
		$scope.RemoveItem = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			if(SelectedItem){
				/*Check Item if exists to item question table*/
				var postDataRemoveItem="Unique="+SelectedItem;
				posData.RemoveItem(postDataRemoveItem)
				.success(function(data){
					if(data.success == true){
						if(data.remove == true){
							after_remove_item()
							.done(function(){
								PoleDisplayReset();
								LoadOrderedItemList();
								LoadTotals();
								LoadTax();
								LoadEBT();
								LoadDiscount();
								LoadPayments();
								LoadChange();
								CheckReceiptStatus();
								GlobalItemUnique = {};
							})
						}else if(data.remove == false){
							var msg = "Unable to remove the item, please return item instead.";
							 NumpadAlertClose ('item_printed_alert', msg)
							 .then(function(){
								WindowPopupAlert ('Remove Item Alert')	
							 }) 
						}
					}
				});
				
			}else{
				var msg = "Please select item first.";
				 NumpadAlertClose ('item_printed_alert', msg)
				 .then(function(){
					WindowPopupAlert ('Remove Item Alert')	
				 })
			}
		};
		
		
		var after_remove_item = function(){
			var def = $.Deferred();
			var postDataRemoveItem="Unique="+$scope.ItemUnique;
			posData.CheckItemQuestion(postDataRemoveItem)
			.success(function(check_item_question_data){
				if(check_item_question_data.success == true){
					posData.RemoveMultipleItem(postDataRemoveItem)
					.success(function(data){
						def.resolve();
					})
				}else{
					def.resolve();
				}
			})
			return def.promise();
		}
		
		
		//-->Cancel Sale
		$scope.CancelSale = function(){
			 var msg = 'Cancel Sale cannot be reversed. <br/><br/>';
			 	 msg+= 'Are you sure?'	
			NumpadAlertYesNo('cancel_sale_form', msg)
			.then(function(){
				WindowPopupAlertYesNo('Cancel Sale');
			})
		};
		
		$(document).on('submit', '#cancel_sale_form', function(e){
			e.preventDefault();
			posData.CancelSale()
			 .success(function(data){
				if(data.success == true){
					PoleDisplayReset();
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadPayments();
					LoadChange();
					EnableDisablePayment();
					CancelSaleClicked();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
				}else if (data.success == false){
					var msg = "Please void payments first.";
					NumpadAlertClose('cancel_sale_void_alert', msg)
					.then(function(){
						WindowPopupAlert('Cancel Sale Alert')
					})
				}
			 }).then(function(){
				$("#dialog-numpad-alert").jqxWindow('close');
			 })
		})
		
		$scope.AlertNo = function(){
			$scope.alert = {
			 	cancelsalemessage: ''
			}
			AlertYesNodialog.close(); 
		}
		
		//-->Receipt Discount
		var validateFloatKeyPress = function(el, evt) {
			var charCode = (evt.which) ? evt.which : event.keyCode;
			var number = el.value.split('.');
			if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			//just one dot
			if(number.length>1 && charCode == 46){
				return false;
			}
			//get the carat position
			var caratPos = getSelectionStart(el);
			var dotPos = el.value.indexOf(".");
			if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
				return false;
			}
			return true;
		}

		var  getSelectionStart = function(o) {
			if (o.createTextRange) {
				var r = document.selection.createRange().duplicate()
				r.moveEnd('character', o.value.length)
				if (r.text == '') return o.value.length
				return o.value.lastIndexOf(r.text)
			} else return o.selectionStart
		}
		
 		$scope.ReceiptDiscountPercent = function(){
			NumpadDiscount('receipt_discount_percent_form')
			.then(function(){
				WindowPopupDiscount('Discount Percent')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		};
		
		$(document).on('submit', '#receipt_discount_percent_form', function(e){
			e.preventDefault();
			var DiscountAmount = $("#number_field").val();
			var postDataReceiptDiscount="optiondiscount="+1;
			postDataReceiptDiscount+="&discountamount="+DiscountAmount;
			posData.ReceiptDiscount(postDataReceiptDiscount)
			.success(function(data){
				if(data.success == true){
					PoleDisplayTotal();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
					$("#dialog-numpad-discount").jqxWindow('close');
				 }else{
					var msg = "Discount must be less than the total amount";
					NumpadAlertClose('discount_receipt_alert', msg)
					.then(function(){
						WindowPopupAlert('Receipt Discount Alert');
					})
				 }
			});
		})
		
		
		$scope.ReceiptDiscountDollar = function(){
			NumpadDiscount('receipt_discount_dollar_form')
			.then(function(){
				WindowPopupDiscount('Discount Dollar')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		}
		
		$(document).on('submit', '#receipt_discount_dollar_form', function(e){
			e.preventDefault();
			var DiscountAmount = $("#number_field").val();
			var postDataReceiptDiscount="optiondiscount="+2;
			postDataReceiptDiscount+="&discountamount="+DiscountAmount;
			posData.ReceiptDiscount(postDataReceiptDiscount)
			.success(function(data){
				if(data.success == true){
					PoleDisplayTotal();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
					$("#dialog-numpad-discount").jqxWindow('close');
				 }else{
					var msg = "Discount must be less than the total amount";
					NumpadAlertClose('discount_receipt_alert', msg)
					.then(function(){
						WindowPopupAlert('Receipt Discount Alert');
					})
				 }
			});
		})
		
	
		//Discount
		var populateNumpadPriceChange = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-change-price").append('<div id="price_change_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#price_change_numpad").html('');
				$("#price_change_numpad").append(''+
				'<div style="margin-bottom: 5px;">'+
					'<div class="" style="font-weight:bold;">Item: '+$scope.price_change_itemno+'</div>'+
					'<div class="" style="font-weight:bold;">Description: '+$scope.price_change_desc+'</div>'+
                '</div>'+
				'<h4 style="text-align:center;">Enter New Price</h4>'+
				'');
				$("#price_change_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" maxlength="25" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupPriceChange = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-change-price").jqxWindow({
					height: 490,
					minWidth: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false
				});
				$('#dialog-numpad-change-price').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPriceChange = function(form_name){
			var def = $.Deferred();
			populateNumpadPriceChange(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numeric",
				  input: $('#number_field')//jqxNumberInput({ width: '250px', height: '25px', inputMode: 'simple', spinButtons: false}),
				});
				setTimeout(function(){
					$("#number_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		
		//-->Price Change;
		$scope.PriceChange = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			var postDataPriceChangeInfo = "Unique="+SelectedItem;
			$("#dialog-numpad-all-price").jqxWindow('close');
			posData.ItemInfo(postDataPriceChangeInfo)
			.success(function(data) {
				$scope.price_change_itemno = data.Item;
				$scope.price_change_desc = data.Description;
				NumpadPriceChange('price_change_form')
				.then(function(){
					WindowPopupPriceChange('Price Change')
					.then(function(){
						$("#number_field").val(data.SellPrice);
						$("#number_field").focus();
						setTimeout(function(){
							$("#number_field").select();
						},100);
					})
				})
			})
		};
		
		$(document).on('submit', '#price_change_form', function(e){
			e.preventDefault();
			var Price = $("#number_field").val();
			var Unique = GlobalItemUnique.Unique;
			var postDataPriceChange="Unique="+Unique;
				postDataPriceChange+="&NewPrice="+Price;
			if(Price){
				posData.PriceChange(postDataPriceChange)
				.success(function(data){
						PoleDisplay(Unique);
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$("#dialog-numpad-change-price").jqxWindow('close');
				})
			}else{
				$("#dialog-numpad-change-price").jqxWindow('close');
			}
		})
		

		//Quantity Change
		$scope.Quantity = function(){
			$("#quantity_numpad").html('');
			var SelectedItem = GlobalItemUnique.Unique;
			var postDataQuantityChangeInfo="Unique="+SelectedItem;
			if(SelectedItem){
				var KitchenPrinterStatus = $scope.KitchenPrinter;
				var Process = false;
				if(KitchenPrinterStatus){
					var ItemStat = function() {
						var def = $.Deferred();
						var postdata="ReceiptDetailsUnique="+SelectedItem;
						posData.KitchenPrintProcessed(postdata)
						.success(function(data){
							if(data.success == true){
								Process = true;
							}else if(data.success == false){
								Process = false;
							}
							def.resolve(Process);
						});
						return def.promise();
				    }
				}else{
					Process = true;
					var ItemStat = function() {
						var def = $.Deferred();
						def.resolve(Process);
						return def.promise();	
					}
				}
				
				ItemStat().done(function(status){
					if(status){
						posData.TransCheck(postDataQuantityChangeInfo)
						.success(function(data){
							if(data.qtychange == true){
								posData.ItemInfo(postDataQuantityChangeInfo)
								.success(function(data){
									$scope.iteminfo = data;
								})
								.then(function(success){
									posData.QuantityTotal(postDataQuantityChangeInfo)
									.success(function(data) {
										NumpadQuantity()
										.then(function(){
											WindowPopupQuantity()
											.then(function(){
												$("#number_field").val(data.Quantity);
												$("#number_field").focus();
												setTimeout(function(){
													$("#number_field").select();
												},100);
											})
										})
									})
								});
							 }else if(data.qtychange == false){
								 var msg = "Can't change the item Quantity, please add item instead.";
								 NumpadAlertClose ('quantity_cannot_change_alert', msg)
								 .then(function(){
									WindowPopupAlert ('Quantity Change Alert');	
								 }) 
							 }
						})
						
					}else{
						  var msg="Product is already printed. <br/>";
							  msg+="Please add new product instead.";
						  NumpadAlertClose ('item_printed_alert', msg)
						 .then(function(){
							WindowPopupAlert ('Quantity Change Alert')	
						 }) 
					}
				})
				
			}else{
				 var msg = "Please select item first.";
				 NumpadAlertClose ('item_printed_alert', msg)
				 .then(function(){
					WindowPopupAlert ('Quantity Change Alert')	
				 }) 
			}
		};
		
		$(document).on('submit','#quantity_form', function(e){
			e.preventDefault();
			var Quantity = $("#number_field").val();
			var Unique = GlobalItemUnique.Unique;
			var postDataQuantityChange="Unique="+Unique;
				postDataQuantityChange+="&NewQuantity="+Quantity;
			if(Quantity){
				posData.QuantityChange(postDataQuantityChange)
				.success(function(data){
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#quantity_numpad").html('');
					$("#dialog-numpad-quantity").jqxWindow('close');
				});
			}else{
				$("#dialog-numpad-quantity").jqxWindow('close');
			}
		})


		$scope.ClearDiscountItem = function (){
			$scope.itemdiscfield = '';
		};

		//-->On Hold Sale;
		$scope.OnHold = function(){
			 KitchenPrintReceipt("OnHoldPrinterStatus")
			 .then(function(){
				OnHold();
			 })
		};

		$scope.NoItemTax = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			var postDataItemtaxInfo="Unique="+SelectedItem;
			if(SelectedItem){
				posData.CheckNoItemTax(postDataItemtaxInfo)
				.success(function(data){
					if(data.success == true){
						PoleDisplay(SelectedItem);
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT
						LoadDiscount();
						LoadPayments();
						LoadChange();

						$scope.ItemNoTaxHide = false;
						$scope.ItemTaxHide = true;
					}else if(data.success == false){
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ItemNoTaxHide = true;
						$scope.ItemTaxHide = false;
					}
					ReceiptTaxChecker();
					GlobalItemUnique = {};
				});
			}else{
				var msg = "Please select item first.";
				 NumpadAlertClose ('item_printed_alert', msg)
				 .then(function(){
					WindowPopupAlert ('No Item Tax Alert')	
				 }) 
			}
		};

		$scope.ItemTax = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			var postDataItemtaxInfo="Unique="+SelectedItem;
			if(SelectedItem){
				posData.CheckItemTax(postDataItemtaxInfo)
				.success(function(data){
					if(data.success == true){
						PoleDisplay(SelectedItem);
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ItemNoTaxHide = false;
						$scope.ItemTaxHide = true;
					}else if(data.success == false){
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ItemNoTaxHide = true;
						$scope.ItemTaxHide = false;
					}
					ReceiptTaxChecker();
					GlobalItemUnique = {};
				});
			}else{
				var msg = "Please select item first.";
				 NumpadAlertClose ('item_printed_alert', msg)
				 .then(function(){
					WindowPopupAlert ('Item Tax Alert')	
				 }) 
			}
		};

		$scope.NoReceiptTax = function(){
			posData.OrderedItemList()
			.success(function(data){
				if(data && data !=""){
					posData.UpdateNoReceiptTax()
					.success(function(data){
						PoleDisplayTotal();
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ReceiptNoTaxHide = true;
						$scope.ReceiptTaxHide = false;
					})
				}else{
					$scope.alert = {
						message: "Add Item without holding tax."
					};
					Alertdialog.setTitle("No Receipt Tax");
					Alertdialog.open();
				}
			})
		};

		$scope.ReceiptTax = function(){
			posData.ReceiptTax()
			.success(function(data){
				if(data.success == true){
					PoleDisplayTotal();
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$scope.ReceiptNoTaxHide = false;
					$scope.ReceiptTaxHide = true;
				}
			})
		};

	$scope.recalldialogSettings = {
        created: function(args)
        {
            recalldialog = args.instance;
        },
		resizable: false,
		position: { left:  "0.5%", top: 50 },
		width: "100%", height: 650,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		draggable: false,
		keyboardCloseKey: 'none',
		showCloseButton: false
    };

	$scope.AskQuedialogSettings = {
		created: function(args)
		{
			Quedialog = args.instance;
		},
		resizable: false,
		//position: { left:  380, top: 250 },
		width: 265, height: 100,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		draggable: false,
		keyboardCloseKey: 'none',
		showCloseButton: false
	};
	
	$scope.searchCustomergridSettings = {
		width: "100%",
		height: 420,
		altRows: true,
		theme: 'bootstrap',
		pageable: true,
		pagerMode: 'default',
		columnsResize: true,
		filterable: true,
		filterMode: 'simple',
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'FirstName', type: 'string' },
				{ name: 'LastName', type: 'string' },
				{ name: 'Company', type: 'string' },
				{ name: 'Address1', type: 'string' },
				{ name: 'Phone1', type: 'string'},
				{ name: 'Phone2', type: 'string'},
				{ name: 'Email', type: 'string'},
			],
			localdata: {}
		},
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'First Name', dataField: 'FirstName', width: '15%' },
			{ text: 'Last Name', dataField: 'LastName', width: '15%' },
			{ text: 'Company', dataField: 'Company', width: '15%' },
			{ text: 'Address', dataField: 'Address', width: '20%' },
			{ text: 'Phone1', dataField: 'Phone1', width: '10%' },
			{ text: 'Phone2', dataField: 'Phone2', width: '10%'},
			{ text: 'Email', dataField: 'Email', width: '15%'}
		]
	}


	var NewSaleButtons = function(){
		$scope.BtnPaymentWhen = true;
		$scope.BtnRecallWhen = false;
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = false;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.BtnReceiptNoteWhen = false;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnItemsWhen = false; 
		$scope.DropdownWhen = false;
		$scope.BtnAddCustWhen = false;
		$scope.BtnEditWhen = false;
		$scope.TxtSearchWhen = false;
		$scope.BtnSearchWhen = false;
		$scope.CustomerFormWhen = false;
		$scope.CustomerLinkWhen = false;
	};

	var CompletedSale = function(){
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = true;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.BtnReceiptNoteWhen = true;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnItemsWhen = true;
		$scope.DropdownWhen = true;
		$scope.BtnAddCustWhen = true;
		$scope.BtnEditWhen = true;
		$scope.TxtSearchWhen = true;
		$scope.BtnSearchWhen = true;
		$scope.RemoveCustomerWhen = false;
		$scope.CustomerFormWhen = true;
		$scope.CustomerLinkWhen = true;
	};

	var OnHoldClicked = function(){
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = true;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.BtnReceiptNoteWhen = true;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnCheckPrintWhen = true;
	}
	
	var CancelSaleClicked = function(){
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = true;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.BtnReceiptNoteWhen = true;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnCheckPrintWhen = true;
	}

	var EnableButtonsWhenItemAdded = function(){
		$scope.BtnPaymentWhen = false;
		$scope.BtnOnHoldWhen = false;
		$scope.BtnRemoveItemWhen = false;
		$scope.BtnCancelSaleWhen = false;
		$scope.BtnDiscountItemWhen = false;
		$scope.BtnReceiptDiscountWhen = false;
		$scope.BtnPriceChangeWhen = false;
		$scope.BtnReturnWhen = false;
		$scope.BtnQuantityWhen = false;
		$scope.BtnItemTaxWhen = false;
		$scope.BtnReceiptNoTaxWhen = false;
		$scope.BtnReceiptTaxWhen = false;
		$scope.BtnReceiptNoteWhen = false;
		$scope.BtnItemNoteWhen = false;
		$scope.BtnItemsWhen = false;
		$scope.DropdownWhen = false;
		$scope.BtnAddCustWhen = false;
		$scope.BtnEditWhen = false;
		$scope.TxtSearchWhen = false;
		$scope.BtnSearchWhen = false;
		$scope.CustomerFormWhen = false;
		$scope.CustomerLinkWhen = false;
		$scope.BtnCheckPrintWhen = false;
	};

	var OtherButtons = function(){
		$scope.BtnPaymentWhen = true;
		$scope.BtnRecallWhen = false;
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = true;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.BtnReceiptNoteWhen = true;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnItemsWhen = false;
		$scope.DropdownWhen = false;
		$scope.BtnAddCustWhen = false;
		$scope.BtnEditWhen = false;
		$scope.TxtSearchWhen = false;
		$scope.BtnSearchWhen = false;
	};
	
	$scope.dialogReceiptNote ={
		created: function(args){
			dialogreceiptnote = args.instance;
		},
		resizable: false,
		width: "100%", height: 300,
		autoOpen: false,
		theme: 'darkblue'
	};
		
	var ReceiptNoteId;
	$scope.ReceiptNote = function(){
		$("#custom_item_keyboard").html('');
		var type = 7;
		NumpadKeyboard('receipt_note_form')
		.then(function(){
			posData.CheckReceiptNote()
			.success(function(data){
				WindowPopupKeyboard('Receipt Note | Receipt# '+data.ReceiptNo)
				.then(function(){
					setTimeout(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val(data.RNotes).length * 2;
						searchInput.focus();
						searchInput[0].setSelectionRange(strLength, strLength);
					},100);
				})
			})
		})
	};
	
	$(document).on('submit', '#receipt_note_form', function(e){
		e.preventDefault();
		var postData="receiptnotemsg=" + $("#search_field").val();
		posData.SaveRNoteMsg(postData)
		.success(function(data){
			if(data.success == true){
				$("#dialog-numpad-keyboard").jqxWindow('close');
				$("#price_numpad").html('');
				$("#custom_item_keyboard").html('');
			}
		})
	})
	
	/*
	$scope.SaveReceiptNote = function(){
		var postData="receiptnotemsg="+this.receiptnotemsg;

		posData.SaveRNoteMsg(postData)
		.success(function(data){
			if(data.success == true){
				//alert("New Receipt Note Saved.");
				$scope.receiptnotemsg = '';
				dialogreceiptnote.close();
			}else{
				alert(data.msg);
			}
		}).then(function(){
			posData.CheckReceiptNote()
			.success(function(data){
				if(data.success == true){
					$scope.SaveReceiptNoteHide = true;
					$scope.UpdateReceiptNoteHide = false;
					$scope.DeleteReceiptNoteHide = false;
				}else{
					$scope.SaveReceiptNoteHide = false;
					$scope.UpdateReceiptNoteHide = true;
					$scope.DeleteReceiptNoteHide = true;
				}
			})
		})
	};

	$scope.EditReceiptNote = function(){
		var postData="ReceiptNoteMessage="+this.receiptnotemsg;
			  postData+="&ReceiptNoteUnique="+ReceiptNoteId;
		posData.UpdateRNoteMsg(postData)
		.success(function(data){
				if(data.success == true){
					 dialogreceiptnote.close();
					 $scope.receiptnotemsg = '';
				}
		})
		.then(function(){
			posData.CheckReceiptNote()
			.success(function(data){
					if(data.success == true){
						$scope.SaveReceiptNoteHide = true;
						$scope.UpdateReceiptNoteHide = false;
						$scope.DeleteReceiptNoteHide = false;
					}else{
						$scope.SaveReceiptNoteHide = false;
						$scope.UpdateReceiptNoteHide = true;
						$scope.DeleteReceiptNoteHide = true;
					}
			})
		})
	};

	$scope.DeleteReceiptNote = function(){
	  var postData="ReceiptNoteMessage="+this.receiptnotemsg;
	  postData+="&ReceiptNoteUnique="+ReceiptNoteId;
		posData.DeleteRNoteMsg(postData)
		.success(function(data){
			if(data.success == true){
				 dialogreceiptnote.close();
				 $scope.receiptnotemsg = '';
			}
		})
		.then(function(){
			posData.CheckReceiptNote()
			.success(function(data){
				if(data.success == true){
					$scope.SaveReceiptNoteHide = true;
					$scope.UpdateReceiptNoteHide = false;
					$scope.DeleteReceiptNoteHide = false;
				}else{
					$scope.SaveReceiptNoteHide = false;
					$scope.UpdateReceiptNoteHide = true;
					$scope.DeleteReceiptNoteHide = true;
				}
			})
		})
	};

	$scope.CancelReceiptNote = function(){
		dialogreceiptnote.close();
		$scope.receiptnotemsg = '';
		//this.receiptnotefocus = true;
	};

	$scope.dialogItemNote = {
		created: function(args){
			dialogitemnote = args.instance;
		},
		resizable: false,
		width: "100%", height: 300,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		keyboardCloseKey: 'none'
	};
	*/
	
	var CheckNotes = function(detailsUnique, type){
		var def = $.Deferred();
		var postdata="receipt_details_unique="+detailsUnique;
			postdata+="&type="+type;
		posData.CheckNote(postdata)
		.success(function(data){
			$("#search_field").val(data.Notes);
			def.resolve();
		})
		return def.promise();	
	}
	
	$scope.ItemNote = function(){
		var type = 9;
		var RDUnique = GlobalItemUnique.Unique;
		if(RDUnique){
			var postdata="ReceiptDetailsUnique="+RDUnique;
			posData.GetInfoByReceiptDetails(postdata)
			.success(function(data){
				NumpadKeyboard('item_note_form')
				.then(function(){
					CheckNotes(RDUnique, type)
					.then(function(){
						WindowPopupKeyboard('Item Note | ID '+data.ItemUnique+' | '+data.Description)
						.then(function(){
							setTimeout(function(){
								var searchInput = $('#search_field');
								var strLength = searchInput.val().length * 2;
								searchInput.focus();
								searchInput[0].setSelectionRange(strLength, strLength);
							},100);
						})
					})
				})
				$scope.CustomReceiptDetailsUnique = RDUnique;
			})
		}else{
			var msg = "Please select Item first.";
			NumpadAlertClose('item_note_alert', msg)
			.then(function(){
				WindowPopupAlert('Item Note Alert')
			});
		}
	};
	
	$(document).on("submit", "#item_note_form", function(e){
		e.preventDefault();
		var postdata="ItemRDetailsUnique="+$scope.CustomReceiptDetailsUnique;
			postdata+="&ItemNote="+encodeURIComponent($.trim($('#search_field').val()).toString());
			postdata+="&type="+9;
		posData.ItemNoteSave(postdata)
		.success(function(data){
			if(data.success == true){
				$("#custom_item_keyboard").html('');
				$("#dialog-numpad-keyboard").jqxWindow('close');
			}
		})
	})
	

	//--> Edit Item note
	$scope.EditItemNote = function(){
		var SelectedItem = GlobalItemUnique.Unique;
		var postDataitemNote="Unique="+SelectedItem;
		postDataitemNote+="&ItemNotes="+this.itemnotemsg;
		posData.EditItemNotes(postDataitemNote)
		.success(function(data){
			if(data.success == true){
				//alert("Item Note updated.");
				dialogitemnote.close();
			}
		})
	};

	//-->Delete Item Note
	$scope.DeleteItemNote = function(){
		var SelectedItem = GlobalItemUnique.Unique;
		var postDataitemNote="Unique="+SelectedItem;
		posData.DeleteItemNotes(postDataitemNote)
		.success(function(data){
			if(data.success == true){
				//alert("Item Note Deleted.");
				$scope.itemnotemsg = '';
				dialogitemnote.close();
			}
		})
	};

	$scope.CancelItemNote = function(){
		dialogitemnote.close();
		$scope.itemnotemsg = '';
		GlobalItemUnique.Unique = '';
	};

	$scope.Return = function(){
		var SelectedItem = GlobalItemUnique.Unique;
		if(SelectedItem){
			var postData = "Unique="+SelectedItem;
			posData.ReturnItem(postData)
			.success(function(data){
				if(data.success == true){
					PoleDisplay(SelectedItem);
					LoadOrderedItemList();
					LoadTotals();
					LoadTax();
					ReceiptTaxChecker();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
				}
			})
		}else{
			$scope.alert = {
				message:"Please select Item first."
			};
			Alertdialog.setTitle("Return Item");
			Alertdialog.open();
		}
	};

	//-->Inventory List
	$scope.searchinventorygridSettings = {
		width: "100%",
		height: 500,
		columnsResize: true,
		theme: 'arctic',
		sortable: true,
		pageable: true,
		pageSize: 13,
		pagerMode: 'default',
		altRows: true,
		filterable: true,
		filterMode: 'simple',
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type : 'int' },
				{ name: 'Item', type: 'string'},
				{ name: 'Part', type: 'string' },
				{ name: 'Description', type: 'string'},
				{ name: 'BarcodeUnique', type: 'int'},
				{ name: 'Barcode', type: 'string'},
				{ name: 'Size', type: 'string'},
				{ name: 'Color', type: 'string'},
				{ name: 'Other', type: 'string'},
				{ name: 'SupplierId', type: 'int'},
				{ name: 'Supplier', type: 'string'},
				{ name: 'SupplierPart', type: 'string'},
				{ name: 'BrandId', type: 'int'},
				{ name: 'Brand', type: 'string'},
				{ name: 'CatMainId', type: 'int'},
				{ name: 'Category', type: 'string'},
				{ name: 'SubCategory', type: 'int'},
				{ name: 'Cost', type: 'string'},
				{ name: 'CostExtra', type: 'string'},
				{ name: 'CostFreight', type: 'string'},
				{ name: 'CostDuty', type: 'string'},
				{ name: 'CostLanded', type: 'string'},
				{ name: 'ListPrice', type: 'string'},
				{ name: 'Price', type: 'string'},
				{ name: 'price2', type: 'string'},
				{ name: 'price3', type: 'string'},
				{ name: 'price4', type: 'string'},
				{ name: 'price5', type: 'string'},
				{ name: 'Quantity', type: 'string'}
			],
			localdata: {}
		},
		columnsResize: true,
		columns: [
			{ text: 'ID', dataField: 'Unique', width: "6%"},
			{ text: 'Item Number', dataField: 'Item', width: "8%"},
			{ text: 'Barcode', dataField: 'Part', width: "7%", hidden: false },
			{ text: 'Description', dataField: 'Description', width: '30%' },
			//{ text: 'Barcode Unique', dataField: 'BarcodeUnique', hidden: true},
			//{ text: 'Barcode', dataField: 'Barcode', width: '12%'},
			{ text: 'Size', dataField: 'Size', width: '7%', hidden: true}, //Hidden column
			{ text: 'Color', dataField: 'Color', width: '7%', hidden: true}, //Hidden column
			{ text: 'Other', dataField: 'Other', width: '7%', hidden: true}, //Hidden column
			{ text: 'SupplierID', dataField: 'SupplierId', hidden: true}, //Hidden column
			{ text: 'Supplier', dataField: 'Supplier', width: '11%'},
			{ text: 'Supplier Part', dataField: 'SupplierPart', hidden: true },
			{ text: 'BrandID', dataField: 'BrandId', hidden: true}, //Hidden column
			{ text: 'Brand', dataField: 'Brand', width: '11%' },
			{ text: 'CatMainId', dataField: 'CatMainId', hidden: true}, //Hidden column
			{ text: 'Category', dataField: 'Category', width: '10%'},
			{ text: 'SubCat', dataField: 'SubCategory', hidden: true}, //Hidden column
			{ text: 'Cost', dataField: 'Cost', width: '5%', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostExtra', dataField: 'CostExtra', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostFreight', dataField: 'CostFreight', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostDuty', dataField: 'CostDuty', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'Cost', dataField: 'CostLanded', cellsalign: 'right', width:'7%', hidden: true},
			{ text: 'Price', dataField: 'Price', width: '10%', cellsalign: 'right', cellsFormat: 'F2'},
			{ text: 'ListPrice', dataField: 'ListPrice', hidden: true}, //Hidden column
			{ text: 'Price2', dataField: 'price2', hidden: true}, //Hidden column
			{ text: 'Price3', dataField: 'price3', hidden: true}, //Hidden column
			{ text: 'Price4', dataField: 'price4', hidden: true}, //Hidden column
			{ text: 'Price5', dataField: 'price5', hidden: true}, //Hidden column
			{ text: 'Quantity', dataField: 'Quantity', width: '7%', cellsalign: 'center'}
		]
	};

		$scope.EnterItemSearch = function(){
			if($scope.ItemSearch == null){

			}else{
				var ItemSearch = $scope.ItemSearch;
				var postData ="SearchItem="+ItemSearch;
				posData.SearchInventoryItem(postData)
				.success(function(data){
					console.log(data.Count);
					if(data.Count > 1){
						$http({
							method: 'post',
							url: base_url+'pos/pointofsale/search-load-inventory',
							data: postData,
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}).success(function(invdata){
							$scope.searchinventorygridSettings = {
								source: {
									dataType: "json",
									localdata: invdata
								}
							};
						}).then(function(){
							$scope.ItemSearch = null;
							dialogsearchinventory.setTitle("Inventory");
							dialogsearchinventory.open();
							setTimeout(function(){
								$("#inventory-search input.jqx-input").focus();
								console.log("focus");
							}, 500);
						})
					}else if(data.Count == 1){
							var postDataAddItem="ItemId="+data.Unique;
							posData.AddItem(postDataAddItem)
							.success(function(data){
								$scope.desc = data;
								$("#receiptn").text(data.ReceiptNumber);
								$scope.ItemSearch = null;
							}).then(function(){
								GetCustomerSave();
								LoadOrderedItemList();
								LoadTotals();
								LoadTax();
								LoadEBT();
								LoadDiscount();
								LoadPayments();
								LoadChange();
								ReceiptTaxChecker();
								CheckReceiptStatus();
								setTimeout(function(){
									GetSelectedCustomer();
								},500)
								$scope.BtnPaymentWhen = false;
								$scope.ItemSearch = null;
							});
						}else{
							$scope.searchinventorygridSettings = {
								filterable: true,
								source:  {
									dataType: "json",
									url: base_url + "pos/pointofsale/load-all-inventory"
								}
							};
						}//-->End if
					})
				}//-->End if Item Search is empty.
			$scope.searchinventorygridSettings = {
				source: {
					localdata: {}
				}
			};
		};

		/* All Inventory */
		$scope.SearchItemButton = function(){
			if($scope.ItemSearch == null){
				$http({
					method: 'get', 
					url: base_url + "pos/pointofsale/load-all-inventory"
				}).success(function(data){
					$scope.searchinventorygridSettings = {
						width: "100%",
						height: 500,
						columnsResize: true,
						theme: 'arctic',
						sortable: true,
						pageable: true,
						pageSize: 13,
						pagerMode: 'default',
						altRows: true,
						filterable: true,
						filterMode: 'simple',
						source:  {
							dataType: "json",
							dataFields: [
								{ name: 'Unique', type : 'int' },
								{ name: 'Item', type: 'string'},
								{ name: 'Part', type: 'string' },
								{ name: 'Description', type: 'string'},
								{ name: 'BarcodeUnique', type: 'int'},
								{ name: 'Barcode', type: 'string'},
								{ name: 'Size', type: 'string'},
								{ name: 'Color', type: 'string'},
								{ name: 'Other', type: 'string'},
								{ name: 'SupplierId', type: 'int'},
								{ name: 'Supplier', type: 'string'},
								{ name: 'SupplierPart', type: 'string'},
								{ name: 'BrandId', type: 'int'},
								{ name: 'Brand', type: 'string'},
								{ name: 'CatMainId', type: 'int'},
								{ name: 'Category', type: 'string'},
								{ name: 'SubCategory', type: 'int'},
								{ name: 'Cost', type: 'string'},
								{ name: 'CostExtra', type: 'string'},
								{ name: 'CostFreight', type: 'string'},
								{ name: 'CostDuty', type: 'string'},
								{ name: 'CostLanded', type: 'string'},
								{ name: 'ListPrice', type: 'string'},
								{ name: 'Price', type: 'string'},
								{ name: 'price2', type: 'string'},
								{ name: 'price3', type: 'string'},
								{ name: 'price4', type: 'string'},
								{ name: 'price5', type: 'string'},
								{ name: 'Quantity', type: 'string'}
							],
							localdata: data
						},
						columnsResize: true,
						columns: [
							{ text: 'ID', dataField: 'Unique', width: "6%"},
							{ text: 'Item Number', dataField: 'Item', width: "8%"},
							{ text: 'Barcode', dataField: 'Part', width: "7%", hidden: false },
							{ text: 'Description', dataField: 'Description', width: '30%' },
							{ text: 'Size', dataField: 'Size', width: '7%', hidden: true}, //Hidden column
							{ text: 'Color', dataField: 'Color', width: '7%', hidden: true}, //Hidden column
							{ text: 'Other', dataField: 'Other', width: '7%', hidden: true}, //Hidden column
							{ text: 'SupplierID', dataField: 'SupplierId', hidden: true}, //Hidden column
							{ text: 'Supplier', dataField: 'Supplier', width: '11%'},
							{ text: 'Supplier Part', dataField: 'SupplierPart', hidden: true },
							{ text: 'BrandID', dataField: 'BrandId', hidden: true}, //Hidden column
							{ text: 'Brand', dataField: 'Brand', width: '11%' },
							{ text: 'CatMainId', dataField: 'CatMainId', hidden: true}, //Hidden column
							{ text: 'Category', dataField: 'Category', width: '10%'},
							{ text: 'SubCat', dataField: 'SubCategory', hidden: true}, //Hidden column
							{ text: 'Cost', dataField: 'Cost', width: '5%', cellsalign: 'right', hidden: true}, //Hidden column
							{ text: 'CostExtra', dataField: 'CostExtra', cellsalign: 'right', hidden: true}, //Hidden column
							{ text: 'CostFreight', dataField: 'CostFreight', cellsalign: 'right', hidden: true}, //Hidden column
							{ text: 'CostDuty', dataField: 'CostDuty', cellsalign: 'right', hidden: true}, //Hidden column
							{ text: 'Cost', dataField: 'CostLanded', cellsalign: 'right', width:'7%', hidden: true},
							{ text: 'Price', dataField: 'Price', width: '10%', cellsalign: 'right', cellsFormat: 'F2'},
							{ text: 'ListPrice', dataField: 'ListPrice', hidden: true}, //Hidden column
							{ text: 'Price2', dataField: 'price2', hidden: true}, //Hidden column
							{ text: 'Price3', dataField: 'price3', hidden: true}, //Hidden column
							{ text: 'Price4', dataField: 'price4', hidden: true}, //Hidden column
							{ text: 'Price5', dataField: 'price5', hidden: true}, //Hidden column
							{ text: 'Quantity', dataField: 'Quantity', width: '7%', cellsalign: 'center'}
						]
					};
				}).then(function(){
					dialogsearchinventory.setTitle("Inventory");
					dialogsearchinventory.open();
					setTimeout(function(){
						$("#inventory-search input.jqx-input").focus();
						console.log("focus");
					}, 500);
				})
				
			}else{
					var ItemSearch = $scope.ItemSearch;
					var postData ="SearchItem="+ItemSearch;
					posData.SearchInventoryItem(postData)
					.success(function(data){
						if(data.Count > 1){
							$http({
								method: 'post',
								url: base_url+'pos/pointofsale/search-load-inventory',
								data: postData,
								headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).success(function(invdata){
								$scope.searchinventorygridSettings = {
									filterable: true,
									source: {
										dataType: "json",
										localdata: invdata
									}
								};
							})
							dialogsearchinventory.setTitle("Inventory");
							dialogsearchinventory.open();
							setTimeout(function(){
							  $(".focusme").focus();
								$(".focusme").val($scope.ItemSearch);
								$scope.ItemSearch = null;
							}, 3000);

						}else if(data.Count == 1){
								var postDataAddItem="ItemId="+data.Unique;
								posData.AddItem(postDataAddItem)
								.success(function(data){
									$scope.desc = data;
									$("#receiptn").text(data.ReceiptNumber);
								})
								.then(function(){
									LoadOrderedItemList();
									LoadTotals();
									LoadTax();
									LoadEBT();
									LoadDiscount();
									LoadPayments();
									LoadChange();
									ReceiptTaxChecker();
									CheckReceiptStatus();
									$scope.BtnPaymentWhen = false;
								});
							}else{
								$scope.searchinventorygridSettings = {
									filterable: true,
									source:  {
											dataType: "json",
											url: base_url + "pos/pointofsale/load-all-inventory"
									}
								};
								dialogsearchinventory.setTitle("Inventory");
								dialogsearchinventory.open();
								setTimeout(function(){
								  $(".focusme").focus();
									$(".focusme").val($scope.ItemSearch);
									$scope.ItemSearch = null;
								}, 3000);
							}//-->End if
					})
				}//-->End if Item Search is empty.
		};
		/* End All Inventory*/


		$scope.searchinventoryrowDoubleClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			editRow = index;
			var postdata="ItemUnique="+row.Unique;
			CheckPrompt(postdata, row.Unique, 1)
			.then(function(){
				posData.CheckItemQuestion(postdata)
				.success(function(item_question_data){
					if(item_question_data.success == true){
						Question('', true, '', item_question_data);
					}else{
						var postDataAddItem="ItemId="+row.Unique;
						postDataAddItem+="&BarcodeUnique="+row.BarcodeUnique;
						posData.AddItem(postDataAddItem)
						.success(function(data){
							$scope.desc = data;
							$("#receiptn").text(data.ReceiptNumber);
						})
						.then(function(){
							GetCustomerSave();
							LoadOrderedItemList();
							LoadTotals();
							LoadTax();
							LoadEBT();
							LoadDiscount();
							LoadPayments();
							LoadChange();
							ReceiptTaxChecker();
							CheckReceiptStatus();
							GetSelectedCustomer();						
						});
					}
					$scope.BtnPaymentWhen = false;
					$("#inventory-search").jqxDataTable('clearFilters');
				})
			});
			dialogsearchinventory.close();
		};

		$scope.searchinventoryrowClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			$scope.search_item = {
				id: row.Unique
			}
			$scope.barcode_item = {
				id: row.BarcodeUnique
			}
		}
		
		var populateKeyboard = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_item_keyboard").html('');
				$("#custom_item_keyboard").append(''+
				'<form id="'+form_name+'">'+
				'<input type="text" id="search_field" maxlength="25">'+
				'<div id="keyboard"></div>'+
				'</form');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var populateNumpadPrice = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-price").append('<div id="price_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#price_numpad").html('');
				$("#price_numpad").append(''+
					'<div style="margin-bottom: 5px;">'+
						'<div class="" style="font-weight:bold;">Item: '+$scope.price_itemno+'</div>'+
						'<div class="" style="font-weight:bold;">Description: '+$scope.price_desc+'</div>'+
					'</div>'+
				'');	
				$("#price_numpad").append(''+
					'<h4 style="text-align:center;">Enter Item Price</h4>'+
				'');
				$("#price_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" maxlength="25" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupPrice = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-price").jqxWindow({
					height: 440,
					minWidth: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false
				});
				$('#dialog-numpad-price').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPrice = function(form_name){
			var def = $.Deferred();
			populateNumpadPrice(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numeric",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var CheckPrompt = function(post, item_unique, process){
			var def = $.Deferred();
			var KitchenPrintStatus = $scope.KitchenPrinter;
			posData.Prompt(post)
			.success(function(data){
				if(data.success == true){
					if(process == 1){ //Process 1 Enter new Description
						if(data.PromptDesc == 1){
							$scope.CustomItemUnique = item_unique;
							NumpadKeyboard('custom_item_form')		
							.then(function(){
								WindowPopupKeyboard('ID '+item_unique+" | "+data.Description)
								.then(function(){
									$("#search_field").focus();
									setTimeout(function(){
										$("#search_field").select();
									},100);
								})
							})				
						}else{
							if(data.PromptPrice == 1){
								$scope.CustomItemUnique = item_unique;
								$scope.price_itemno = data.ItemNo;
								$scope.price_desc = data.Description;
								NumpadPrice('OpenItemPrice')
								.then(function(){
									WindowPopupPrice('Item Price')
									.then(function(){
										$("#number_field").val('0.00');
										$("#number_field").focus();
										setTimeout(function(){
											$("#number_field").select();
										},100);
									})
								})
							}else{
								def.resolve();
							}
						}
					}else if(process == 2){ //Process 2 Enter new Price
						if(data.PromptPrice == 1){
							$scope.CustomItemUnique = item_unique;
							def.resolve(true);
						}else{
							def.resolve(false);
						}
					}
				}else if(data.success == false){
					def.resolve();
				}
			})
			return def.promise();
		}
			
		$scope.SelectItemSearch = function(){
			var ItemUnique = $scope.search_item.id;
			var postdata="ItemUnique="+ItemUnique;
			CheckPrompt(postdata, ItemUnique, 1)
			.then(function(){
				posData.CheckItemQuestion(postdata)
				.success(function(item_question_data){
					if(item_question_data.success == true){
						$("#Question").text(item_question_data.Question);
						Question('', true, '', item_question_data);	
					}else{
						var postDataAddItem="ItemId="+ItemUnique;
						postDataAddItem+="&BarcodeUnique="+$scope.barcode_item.id;
						posData.AddItem(postDataAddItem)
						.success(function(data){
							$scope.desc = data;
							$("#receiptn").text(data.ReceiptNumber);
							PoleDisplay(data.ReceiptDetailsUnique);
						}).then(function(){
							GetCustomerSave();
							LoadOrderedItemList();
							LoadTotals();
							LoadTax();
							LoadEBT();
							LoadDiscount();
							LoadPayments();
							LoadChange();
							ReceiptTaxChecker();
							CheckReceiptStatus();
							setTimeout(function(){
								GetSelectedCustomer();
							},500);
							$scope.BtnPaymentWhen = false;
							$("#inventory-search").jqxDataTable('clearFilters');
						});
					}
				});
			});	
			dialogsearchinventory.close();
		}
		
		var AfterSaveKitchenNote = function(){
			var def = $.Deferred();
			var ItemUnique = $scope.search_item.id;
			var postdata="ItemUnique="+ItemUnique;
			posData.CheckItemQuestion(postdata)
			.success(function(item_question_data){
				if(item_question_data.success == true){
					$("#Question").text(item_question_data.Question);
					Question('', true, '', item_question_data);	
					def.resolve();
				}else{
					var postDataAddItem="ItemId="+ItemUnique;
					postDataAddItem+="&BarcodeUnique="+$scope.barcode_item.id;
					posData.AddItem(postDataAddItem)
					.success(function(data){
						$scope.desc = data;
						$("#receiptn").text(data.ReceiptNumber);
					}).then(function(){
						GetCustomerSave();
						LoadOrderedItemList();
						LoadTotals();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						ReceiptTaxChecker();
						CheckReceiptStatus();
						setTimeout(function(){
							GetSelectedCustomer();
						},500);
						$scope.BtnPaymentWhen = false;
						$("#inventory-search").jqxDataTable('clearFilters');
						def.resolve();
					});
				}
			});
			return def.promise();
		}
		
		
		var temp_open_item = [];
		$(document).on("submit",'#custom_item_form',function(e){
			e.preventDefault();
			if($("#search_field").val() != ''){
				var ItemUnique = $scope.CustomItemUnique;
				var postdata="ItemUnique="+ItemUnique;
				CheckPrompt(postdata, ItemUnique, 2)
				.then(function(ans){
					temp_open_item.push(ItemUnique, $("#search_field").val());
					if(ans == true){
						$("#dialog-numpad-keyboard").jqxWindow('close');
						$("#price_numpad").html('');
						$("#custom_item_keyboard").html('');
						NumpadPrice('OpenItemPrice')
						.then(function(){
							WindowPopupPrice('Item Price')
							.then(function(){
								$("#number_field").val('0.00');
								$("#number_field").focus();
								setTimeout(function(){
									$("#number_field").select();
								},100);
							})
						})
					}else{
						var postdata="OpenItemInfo="+JSON.stringify(temp_open_item);
						posData.AddOpenItem(postdata)
						.success(function(data){
							PoleDisplay(data.ReceiptDetailsUnique);
							temp_open_item = [];
							GetCustomerSave();
							LoadOrderedItemList();
							LoadTotals();
							LoadTax();
							LoadEBT();
							LoadDiscount();
							LoadPayments();
							LoadChange();
							ReceiptTaxChecker();
							CheckReceiptStatus();
							setTimeout(function(){
								GetSelectedCustomer();
							},500);
							$scope.BtnPaymentWhen = false;
							$("#inventory-search").jqxDataTable('clearFilters');
							$("#price_numpad").html('');
							$("#custom_item_keyboard").html('');
							$("#dialog-numpad-keyboard").jqxWindow('close');
						})
					}
				})
			}
		});
		
		$(document).on('submit','#OpenItemPrice',function(e){
			e.preventDefault();
			if(temp_open_item.length == 2){
				temp_open_item.push($("#number_field").val());
			}else{
				temp_open_item.push($scope.CustomItemUnique, '', $("#number_field").val());
			}
			var postdata="OpenItemInfo="+JSON.stringify(temp_open_item);
			posData.AddOpenItem(postdata)
			.success(function(data){
				temp_open_item = [];
				GetCustomerSave();
				LoadOrderedItemList();
				LoadTotals();
				PoleDisplay(data.ReceiptDetailsUnique);
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				ReceiptTaxChecker();
				CheckReceiptStatus();
				setTimeout(function(){
					GetSelectedCustomer();
				},500);
				$scope.BtnPaymentWhen = false;
				$("#inventory-search").jqxDataTable('clearFilters');
				$("#price_numpad").html('');
				$("#dialog-numpad-price").jqxWindow('close');
			})
		})
	
		var checkKitchenNote = function(detailsUnique){
			var def = $.Deferred();
			var postdata="receipt_details_unique="+detailsUnique;
			posData.checkKitchenNote(postdata)
			.success(function(data){
				$("#search_field").val(data.Notes);
				def.resolve();
			})
			return def.promise();	
		}
	
		/*Kitchen Note*/
		$scope.KitchenNote = function(){
			var type = 19;
			var RDUnique = GlobalItemUnique.Unique;
			if(RDUnique){
				var postdata="ReceiptDetailsUnique="+RDUnique;
				posData.GetInfoByReceiptDetails(postdata)
				.success(function(data){
					NumpadKeyboard('kitchen_note_form')
						.then(function(){
							CheckNotes(RDUnique, type)
							.then(function(){
								WindowPopupKeyboard('Kitchen Note | ID '+data.ItemUnique+' | '+data.Description)
								.then(function(){
									setTimeout(function(){
										var searchInput = $('#search_field');
										var strLength = searchInput.val().length * 2;
										searchInput.focus();
										searchInput[0].setSelectionRange(strLength, strLength);
									},100);
								})
						})
					})
					$scope.CustomReceiptDetailsUnique = RDUnique;
				})
			}else{
				var msg = "Please select Item first.";
				NumpadAlertClose('kitchen_note_form', msg)
				.then(function(){
					WindowPopupAlert('Kitchen Note Alert');
				})
			}
		}

		$(document).on("submit",'#kitchen_note_form',function(e){
			e.preventDefault();
			var postdata="ItemRDetailsUnique="+$scope.CustomReceiptDetailsUnique;
				postdata+="&ItemNote="+encodeURIComponent($.trim($('#search_field').val()).toString());
				postdata+="&type="+19;
			posData.KitchenNote(postdata)
			.success(function(data){
				if(data.success == true){
					$("#custom_item_keyboard").html('');
					$("#dialog-numpad-keyboard").jqxWindow('close');
				}
			})
		})
		
		$scope.CloseInventorySearch = function(){
			$("#inventory-search").jqxDataTable('clearFilters');
			dialogsearchinventory.close();
		};

		//Passcode
		var populateNumpadPasscode = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#passcode_numpad").html('');
				$("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
				$("#passcode_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<input type="password" id="number_field" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupPasscode = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-passcode").jqxWindow({
					height: 450,
					minWidth: 300,
					//title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false
				});
				$('#dialog-numpad-passcode').jqxWindow('setTitle', header_title);
				$('#dialog-numpad-passcode').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPasscode = function(form_name){
			var def = $.Deferred();
			populateNumpadPasscode(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numbers",
				  input: $('#number_field')
				});
				setTimeout(function(){
					$("#number_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		$scope.OpenDrawer = function(){
			NumpadPasscode('open_cash_drawer')
			.then(function(){
				WindowPopupPasscode('Open Cash Drawer')
				.then(function(){
					$("#number_field").focus();
				})
			})
		};
		
		$(document).on('submit', '#open_cash_drawer', function(e){
			e.preventDefault();
		  	var passcode = $("#number_field").val();
		  	var hashpasscode = CryptoJS.MD5(passcode);
		  	var postdata="passcode="+hashpasscode;
		  	posData.EnterPassCode(postdata)
		  	.success(function(data){
				if(data.success == true){
					$('body').block({ message: 'Checking Printer connection...' });
					$("#dialog-numpad-passcode").jqxWindow('close');
					posData.CashDrawerPrinterCheck()
					.success(function(data){
						if(data.success == true){
							if(data.print != true){
								var msg="Printer error, please check <br/>";
									msg+="1. Printer is turned on. <br/>";
									msg+="2. Check printer paper. <br/>";
									msg+="3. Restart printer.";
								
								NumpadAlertClose('open_cash_drawer', msg)
								.then(function(){
									WindowPopupAlert('Printer problem');
								})
							}
							$('body').unblock();
						}else{
							$("#dialog-numpad-passcode").jqxWindow('close');
						}
					})
				}else{
					$("#dialog-numpad-passcode").jqxWindow('close');
					var msg = "Sorry, your passcode is not incorrect.";
					NumpadAlertClose('open_cash_drawer', msg)
					.then(function(){
						WindowPopupAlert('Passcode Error');
					})
				}
		  	})
		})

		$scope.RecallPrint = function(){
			try {
				$scope.rowReceiptHeader.Unique
				var ReceiptHeaderUnique = true;
			}catch(err) {
				var ReceiptHeaderUnique = false;
			}
		
			if(ReceiptHeaderUnique){
				var ReceiptHeaderUnique = $scope.rowReceiptHeader.Unique;
				$scope.fn = {
					val: 6
				};
				var postdata="userid=0";
					postdata+="&position_unique="+6;
				posData.UsersSettings(postdata)
				.success(function (data) {
					var LEFT_POSITION_LEVEL = data.left_position_level;
					var RIGHT_POSITION_LEVEL = data.right_position_level;
		
					if (LEFT_POSITION_LEVEL >= RIGHT_POSITION_LEVEL) {
						PrinterCheck(ReceiptHeaderUnique);
						console.log("No Security Code");
					} else if (LEFT_POSITION_LEVEL <= RIGHT_POSITION_LEVEL) {
						$scope.useby = {
							val: 'recall'
						};
						PasscodeDialog.setTitle("Print Receipt | Enter Passcode");
						PasscodeDialog.open();
						console.log("Enter Security Code");
					}
				})
			}else{
				var msg="Please select the Receipt that you want to print.";
					$scope.alert = {
					  message: msg
					};
				Alertdialog.setTitle("Recall Print Receipt");
				Alertdialog.open();
			}
		};
	
		$scope.CheckPrint = function(){
			posData.GetCurrentReceiptHeader()
			.success(function(data){
				PrinterCheck(data.ReceiptHeaderUnique);
			})
		}
		
		var AllPriceWindow = function(){
			$("#dialog-numpad-all-price").jqxWindow({
				height: 260,
				minWidth: 230,
				title: 'Price Level',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false
			});
			$('#dialog-numpad-all-price').jqxWindow('open');
		}
		
		$scope.orderedItem = function(Unique, ItemUnique){
			$http({
				method: 'get',
				url: api_url+'item-price-level/'+ItemUnique
			}).success(function(data){
				$scope.item_price_level = data.rows[0];
				$scope.ordered_item_rdunique = Unique;
				$scope.ordered_item_unique = ItemUnique;
				AllPriceWindow();
			})
		}
		
		$scope.item_price1 = function(){
			var RDUnique = $scope.ordered_item_rdunique;
			var ItemUnique = $scope.ordered_item_unique;
			var postDataPriceChange="Unique="+RDUnique;
			postDataPriceChange+="&NewPrice="+$scope.item_price_level.price1;
			posData.PriceChange(postDataPriceChange)
			.success(function(data) {
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
			})
		}

		$scope.item_price2 = function(){
			var RDUnique = $scope.ordered_item_rdunique;
			var ItemUnique = $scope.ordered_item_unique;
			var postDataPriceChange="Unique="+RDUnique;
			postDataPriceChange+="&NewPrice="+$scope.item_price_level.price2;
			posData.PriceChange(postDataPriceChange)
			.success(function(data) {
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
			})
		}

		$scope.item_price3 = function(){
			var RDUnique = $scope.ordered_item_rdunique;
			var ItemUnique = $scope.ordered_item_unique;
			var postDataPriceChange="Unique="+RDUnique;
			postDataPriceChange+="&NewPrice="+$scope.item_price_level.price3;
			posData.PriceChange(postDataPriceChange)
			.success(function(data) {
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
			})
		}

		$scope.item_price4 = function(){
			var RDUnique = $scope.ordered_item_rdunique;
			var ItemUnique = $scope.ordered_item_unique;
			var postDataPriceChange="Unique="+RDUnique;
			postDataPriceChange+="&NewPrice="+$scope.item_price_level.price4;
			posData.PriceChange(postDataPriceChange)
			.success(function(data) {
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
			})
		}

		$scope.item_price5 = function(){
			var RDUnique = $scope.ordered_item_rdunique;
			var ItemUnique = $scope.ordered_item_unique;
			var postDataPriceChange="Unique="+RDUnique;
			postDataPriceChange+="&NewPrice="+$scope.item_price_level.price5;
			posData.PriceChange(postDataPriceChange)
			.success(function(data) {
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
			})
		}

		$scope.PriceLevel = function(){
			AllPriceLeveldialog.setTitle("Price Level");
			AllPriceLeveldialog.open();
		}

		$scope.all_item_price1 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				AllPriceLeveldialog.close();
			})
		}

		$scope.all_item_price2 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				AllPriceLeveldialog.close();
			})
		}

		$scope.all_item_price3 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				AllPriceLeveldialog.close();
			})
		}

		$scope.all_item_price4 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				AllPriceLeveldialog.close();
			})
		}

		$scope.all_item_price5 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				AllPriceLeveldialog.close();
			})
		}

		$scope.AkamaiPOSRefresh = function(){
			$window.location.href = '';
		}

		$scope.EnabledEditButton = function(){
			$scope.EditCustomerSaveDisabled = false;
			$scope.EditCustomerWhenClose = 1;
		}

		$scope.EditConfirmSaveCancel = function(){
			$scope.EditCustomerSaveDisabled = false;
			$scope.EditCustomerDefaultButtons = true;
			$scope.EditCustomerWhenCloseSaveChanges = false;
			$scope.EditCustomerWhenDelete = false;
			$('#editTabs').jqxTabs({ selectedItem: 0 });
			$('#tab1').unblock();
			$('#tab2').unblock();
			$('#tab3').unblock();
		}

		$scope.EnableAddCustomerSaveButton = function(){
			$scope.AddCustomerSaveDisabled = false;
			$scope.AddCustomerWhenClose = 1;
		}
		
		$scope.CustomerForm = function(){
			/*
			$http({
				method:'get',
				url: api_url+'customer/list'
			}).success(function(data){
				$scope.searchCustomergridSettings = {
					source: {
						localdata: data.rows
					}
				}
			}).then(function(){
				//dialogCustomerForm.setTitle("Customer");
				//dialogCustomerForm.open();
				$("#CustomerList-Modal").modal('show');
				setTimeout(function(){
					$("#customer-search input.jqx-input").focus();
				}, 100);
			})
			*/
			$window.location = base_url + "pos/pointofsale/customer";
		}
		
		$scope.searchCustomerRowClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
		}
		
		$scope.searchCustomerRowDoubleClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			
			posData.InstantNewSale()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;	
				}
			 }).then(function(){
			 	var postData="selcustomervalue="+row.Unique;;
				postData+="&selcustomerlabel="+row.FirstName + " " + row.LastName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer();
					$scope.CustomerOkWhen = true;
					$scope.CustomerEditWhen = true;
					$("#customer-search").jqxDataTable('clearFilters');
					dialogCustomerForm.close();
				})
			 })
		}
		
		$scope.SelectCustomer = function(){
			posData.InstantNewSale()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;	
				}
			 }).then(function(){
				var postData="selcustomervalue="+GlobalCustomer;
				postData+="&selcustomerlabel="+GlobalCustomerName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer();
					$scope.CustomerOkWhen = true;
					$scope.CustomerEditWhen = true;
					$("#customer-search").jqxDataTable('clearFilters');
					dialogCustomerForm.close();
				})	
			 })
		}
		
		$scope.CustomerFormClose = function(){
			$scope.CustomerOkWhen = true;
			$scope.CustomerEditWhen = true;
			GlobalCustomer = null;
			$("#customer-search").jqxDataTable('clearFilters');
			dialogCustomerForm.close();
		}
		
		$scope.RemoveCustomer = function(){
			$http({
				method: 'post',
				url: base_url+"pos/pointofsale/remove-customer"
			}).success(function(data){
				if(data.success == true){
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					GlobalCustomer = null;
					GlobalCustomerName = '';
					$scope.RemoveCustomerWhen = false;
				}else{
					alert("Sorry, we encountered a technical difficulties\nPlease try again later.");
				}
			})
		}

		var CustomerPurchases = function(id){
			var def = $.Deferred();
			var postdata="customerid="+id;
			posData.CustomerPurchases(postdata)
			.success(function(data){
				$scope.purchase_history = {
					source: {
						localdata: data
					}
				}
				def.resolve();
			})
			return def.resolve();
		}
		
		
		$scope.CustomerLink = function(){
			var result = $scope.customer.id;
			$window.location = base_url + 'pos/pointofsale/customer';
		}
		
		
		/*
		*@param string title
		*@param boolean method
		*@param string info
		*@param array data
		*/
		var Question = function(title, method, info, data){
			 var Title = '';
			 var ItemUnique = data.ItemUnique;
			 TempItem.push(ItemUnique);
			 TempAddItem.push(ItemUnique);
			 TempAddItemCompare.push(ItemUnique);
			 NumpadItemSubMenu()
			 .then(function(){
				 var postdata="ItemUnique="+ItemUnique;
				 posData.LoadQuestions(postdata)
				 .success(function(load_question){
					 var Question = load_question.Question;
					 Title = load_question.ItemTitle;
						$.each(Question, function(index, value){
							var QuestionUnique = value.Unique;
								$("#QuestionView").append(""+
							"<div style='width:100%; overflow:auto;'>"+
								"<div class='QuestionCat"+value.Unique+"' style='width: 10%px; float:left; margin-bottom:3px;'>"+
									"<button id='QuestionCat."+QuestionUnique+"' class='btn_question'>"+value.QuestionName+"</button>"+
								"</div>"+
								"<div class='SubQuestion"+value.Unique+" inventory-item-question' style='width: 75%; float:left;'>");
										var posdata2="QuestionUnique="+QuestionUnique;
										posData.LoadQuestionItems(posdata2)
										.success(function(load_items){
											$.each(load_items, function(index2, value2){
												$(".SubQuestion"+value.Unique).append("<button id='SubQuestionCat."+value2.ItemUnique+"' class='btnitems_question'>"+value2.Description+"</button></div>");
											})
										})
								$("#QuestionView").append(""+
							"</div>");
						})
						
					}).then(function(){
						WindowPopupSubMenu(Title, 'item_sub_menu_form');
					})
			 	})
		}
		
		var $this;
		var TempAddItemCompare = [];
		var CheckPrompt_submenu = function(post, item_unique, process){
			var def = $.Deferred();
			posData.Prompt(post)
			.success(function(data){
				if(data.success == true){
					if(process == 1){ //Process 1 Enter new Description
						if(data.PromptDesc == 1){
							var index = TempAddItemCompare.indexOf(item_unique);
							if (index > -1) {
								TempAddItem.splice(index, 1);
								TempAddItemCompare.splice(index, 1);
								$this.toggleClass('btnitems_question_disabled');
							}else{
								$scope.CustomItemUnique = item_unique;
								NumpadKeyboard('custom_item_submenu_form')
								.then(function(){
									WindowPopupKeyboard("ID "+item_unique+" | "+data.Description)
									.then(function(){
										setTimeout(function(){
											$("#search_field").focus();
										},100);
									})
								})
							}							
						}else{
							if(data.PromptPrice == 1){
								var index = TempAddItemCompare.indexOf(item_unique);
								if (index > -1) {
									TempAddItem.splice(index, 1);
									TempAddItemCompare.splice(index, 1);
									$this.toggleClass('btnitems_question_disabled');
								}else{
									$scope.CustomItemUnique = item_unique;
									$scope.price_itemno = data.ItemNo;
									$scope.price_desc = data.Description;
									NumpadPrice('SubMenuItemPrice')
									.then(function(){
										WindowPopupPrice('Item Price')
										.then(function(){
											$("#number_field").val('0.00');
											$("#number_field").focus();
											setTimeout(function(){
												$("#number_field").select();
											},100);
										})
									})
								}
							}else{
								def.resolve();
							}
						}
					}else if(process == 2){ //Process 2 Enter new Price
						if(data.PromptPrice == 1){
							$scope.CustomItemUnique = item_unique;
							$scope.price_itemno = data.ItemNo;
							$scope.price_desc = data.Description;
							NumpadPrice('SubMenuKeyboardItemPrice')
							.then(function(){
								WindowPopupPrice('Item Price')
								.then(function(){
									$("#number_field").val('0.00');
									$("#number_field").focus();
									setTimeout(function(){
										$("#number_field").select();
									},100);
								})
							})
							def.resolve(true);
						}else{
							def.resolve(false);
						}
					}
				}else if(data.success == false){
					def.resolve(false);
				}
			})
			return def.promise();
		}
		
		$(document).on('click', '#QuestionView button', function(){
			var MethodUnique = $(this).attr('id');
			var Method = MethodUnique.split('.')[0];
			var Unique = MethodUnique.split('.')[1];
			if(Method == 'QuestionCat'){
    			$(this).toggleClass('btnitems_question');
			}else if(Method == 'SubQuestionCat'){
				$this = $(this);
				var process = false;
				var postdata="ItemUnique="+Unique;
				CheckPrompt_submenu(postdata, Unique, 1)
				.then(function(status){
					if(status == false){
						$this.toggleClass('btnitems_question_disabled');
						var index = TempAddItem.indexOf(Unique);
						if (index > -1) {
							TempAddItem.splice(index, 1);
							TempAddItemCompare.splice(index, 1);
						}else{
							TempAddItem.push(Unique);
							TempAddItemCompare.push(Unique);
						}
					}
				});
			}
		})
		
		$(document).on("submit", "#custom_item_submenu_form", function(e){
			e.preventDefault();
			var ItemUnique = $scope.CustomItemUnique;
			var ItemNote = $("#search_field").val();
			var postdata="ItemUnique="+ItemUnique;
			TempAddItem.push(ItemUnique+"="+ItemNote);
			TempAddItemCompare.push(ItemUnique);
			CheckPrompt_submenu(postdata, ItemUnique, 2)
			.then(function(ans){
				if(ans == true){
					//Popup Numpad Price'
					TempItemReference.push(ItemUnique+"="+ItemNote);
				}else{
					$this.toggleClass('btnitems_question_disabled');
				}
			})
			$("#price_numpad").html('');
			$("#custom_item_keyboard").html('');
			$("#dialog-numpad-keyboard").jqxWindow('close');
		})
		
		var RemoveTempAddItemProcess = function(ItemUnique){
			var def = $.Deferred();
			var index = TempAddItemCompare.indexOf(ItemUnique);
			if (index > -1) {
				var newTempAdd = TempAddItem[index];
				TempAddItem.splice(index, 1);
				TempAddItemCompare.splice(index, 1);
				def.resolve(newTempAdd);
			}else{
				var newTempAdd = '#'+ItemUnique;
				def.resolve(newTempAdd);
			}
			return def.promise();
		}
		
		$(document).on('submit', '#SubMenuItemPrice', function(e){
			e.preventDefault();
			var ItemUnique = $scope.CustomItemUnique;
			RemoveTempAddItemProcess(ItemUnique)
			.then(function(data){
				var PriceVal = $("#number_field").val();
				TempAddItem.push(data+"="+PriceVal);
				TempAddItemCompare.push(ItemUnique);
				$("#price_numpad").html('');
				$this.toggleClass('btnitems_question_disabled');
			})
			$("#dialog-numpad-price").jqxWindow('close');
		})
		
		$(document).on('submit', '#SubMenuKeyboardItemPrice', function(e){
			e.preventDefault();
			var ItemUnique = $scope.CustomItemUnique;
			var PriceVal = $("#number_field").val();
			var index = TempAddItemCompare.indexOf(ItemUnique);
			if (index > -1) {
				var newTempAdd = TempAddItem[TempItemReference];
				TempAddItem.splice(index, 1);
				TempAddItem.push(TempItemReference+"="+PriceVal);
			}
			$("#price_numpad").html('');
			$("#dialog-numpad-price").jqxWindow('close');
			$this.toggleClass('btnitems_question_disabled');
		})
		
		$(document).on('click', '.button_proceed', function(e){
			e.preventDefault();
			var postdata="SelectedItems="+JSON.stringify(TempAddItem);
			posData.SaveSelectedItems(postdata)
			.success(function(data){
				if(data.success == true){
					TempAddItem = [];
					TempAddItemCompare = [];
					$("#QuestionView").html('');
					$("#price_numpad").html('');
					$("#dialog-numpad-sub-menu").jqxWindow('close');
				}
			}).then(function(){
				PoleDisplayTotal();
				GetCustomerSave();
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				ReceiptTaxChecker();
				CheckReceiptStatus();
				setTimeout(function(){
					GetSelectedCustomer();
				},500);
				$scope.BtnPaymentWhen = false;
			})
		})
		
		$(document).on('click', '.button_q_cancel', function(e){
			e.preventDefault();
			$("#QuestionView").html('');
			$("#price_numpad").html('');
			$("#custom_item_keyboard").html('');
			$("#dialog-numpad-sub-menu").jqxWindow('close');
			TempAddItem = [];
			TempAddItemCompare = [];
		})
	
		//Table Order
		var populateNumpadTable = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-table").append('<div id="table_order_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#table_order_numpad").html('');
				$("#table_order_numpad").append(''+
				'<form id="'+form_name+'">'+
					'<h4 style="text-align:center;">Enter Table#</h4>'+
					'<input type="text" id="number_field" maxlength="25" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupTable = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-table").jqxWindow({
					height: 390,
					minWidth: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false
				});
				$('#dialog-numpad-table').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadTable = function(form_name){
			var def = $.Deferred();
			populateNumpadTable(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numpad_numbers",
				  input: $('#number_field')
				});
				setTimeout(function(){
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		$(".table-order").click(function(){
			NumpadTable('table_order_form')
			.then(function(){
				WindowPopupTable('Move Table')
				.then(function(){
					$("#number_field").val(0);
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					})
				})
			})
		});
		
		$(document).on('submit','#table_order_form',function(e){
			e.preventDefault();
			var tableno = $("#number_field").val();
			var postdata="tableno="+tableno;
			posData.TableAssign(postdata)
			.success(function(data){
				if(data.success == true){
					if(data.taken == false){
						LoadHeaderInfo()
						.then(function(){
							$("#table_order_numpad").html('');
							$("#dialog-numpad-table").jqxWindow('close');
						});
					}else{
						$("#dialog-numpad-table").jqxWindow('close');
						var msg = "Table "+tableno+" is not available.";
						NumpadAlertYesNo ('tabler_order_not_valid_form', msg)
						.then(function(){
							WindowPopupAlert("Table Status");
						})
					}
				}else{
					$("#dialog-numpad-table").jqxWindow('close');
					var msg = "Table "+tableno+" does not exist.";
					NumpadAlertClose ('tabler_order_not_valid_form', msg)
					.then(function(){
						WindowPopupAlert("Table Status");
					})
				}
			})
		})
		
		$("#user_name").click(function(){
			NumpadPasscode('change_cashier_form')
			.then(function(){
				WindowPopupPasscode('Change Cashier')
				.then(function(){
					$("#number_field").focus();
				})
			})
		})
	
		$(document).on('submit','#change_cashier_form',function(e){
			e.preventDefault();
			var password = $("#number_field").val();
			var hashpasscode = CryptoJS.MD5(password);
			var postdata="passcode="+hashpasscode;
			posData.EnterPassCode(postdata)
			.success(function(data){
				if(data.success == true){
					$("#passcode_numpad").html('');
					$("#dialog-numpad-passcode").jqxWindow("close");
					LoadHeaderInfo();
				}else{
					$("#dialog-numpad-passcode").jqxWindow("close");
					var msg = "Sorry, your passcode is incorrect.";
					NumpadAlertClose('cashier_change_error_form', msg)
					.then(function(){
						WindowPopupAlert('Invalid Passcode');
					})
				}
			});
		})
		/* End */
	}])

	.directive('focusMe', function() {
		return {
			link: function(scope, element, attrs) {
				scope.$watch(attrs.focusMe, function(value) {
					if(value === true) {
						console.log('value=',value);
						element[0].focus();
						scope[attrs.focusMe] = false;
					}
				});
			}
		};
	})

	.directive('focusOn', function() {
		return function(scope, elem, attr) {
			scope.$on(attr.focusOn, function(e) {
				elem[0].focus();
			});
		};
	})

	.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
							scope.$eval(attrs.ngEnter);
					});
					event.preventDefault();
				}
			});
		};
	 })
	 
	 /*
	.directive('numPad', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/module/numpad'
		}
	})
	
	
	
	.directive('numPadPwd', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/module/numpad-pwd'
		}
	})
	
	
	
	.directive('numPadKitchen', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/module/kitchen-numpad'
		}
	})
	
	
	
	.directive('alertQYesNo', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/alert/q-yes-no'
		}
	})
	
	
	/*
	.directive('newSale', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/new-sale-view'
		}
	})
	*/

	/*
	.directive('itemDiscounts', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/item-discount'
		};
	})

	.directive('receiptDiscounts', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/receipt-discount'
		};
	})

	.directive('priceChange', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/price-change'
		}
	})

	.directive('quantityChange', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/quantity-change'
		}
	})
	 */
	
	/*
	.directive('recallSale', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/recall-sale'
		};
	})
	*/

	/*
	.directive('newCustomer', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/new-customer'
		};
	})
	*/
	
	/*
	.directive('editCustomer', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/edit-customer'
		};
	})
	*/
	/*
	.directive('customerForm', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/customer-form'
		};
	})

	.directive('receiptNote', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/receipt-note'
		}
	})

	.directive('recallTransaction', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/recall-sale'
		};
	})

	.directive('itemNotes', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/item-note'
		}
	})
	*/
	
	/*
	.directive('newsaleQue', function(){
		return{
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/new-sale-que-page'
		}
	})
	*/

	/*
	.directive('searchInventory', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/search-inventory-page'
		};
	})

	.directive('recallQue', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/recall-que'
		};
	})

	.directive('dialogAlert', function(){
		return {
			retrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/dialog-alert'
		};
	})

	.directive('passCode', function(){
		return {
			retrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/passcode'
		};
	})


	.directive('dialogProcess', function(){
	   return {
	    retrict: 'E',
	      templateUrl: base_url + 'pos/alerts/process'
	   };
	})
	
	*/
	
	/*
	.directive('newsaleLogoque', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/new-sale-logo-que'
		};
	})
	*/

	/*
	.directive('priceLevel', function(){
		return {
			restrict: 'E',
			templateUrl: base_url + 'pos/pointofsale/price-level'
		};
	})

	.directive('allpriceLevel', function(){
		return {
			restrict: 'E',
			templateUrl: base_url+'pos/pointofsale/all-price-level'
		}
	})

	.directive('priceChangeForm', function(){
		return {
			restrict: 'E',
			templateUrl: base_url+'pos/pointofsale/price-change-form'
		}
	})

	.directive('quantityChangeForm', function(){
		return {
			restrict: 'E',
			templateUrl: base_url+'pos/pointofsale/quantity-change-form'
		}
	})

	.directive('discountItemForm', function(){
		return {
			restrict: 'E',
			templateUrl: base_url+'pos/pointofsale/discount-item-form'
		}
	})

	.directive('discountReceiptForm', function(){
		return {
			restrict: 'E',
			templateUrl: base_url+'pos/pointofsale/discount-receipt-form'
		}
	})
	*/

	.directive('selectOnClick', ['$window', function ($window) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.on('click', function () {
					if (!$window.getSelection().toString()) {
						// Required for mobile Safari
						this.setSelectionRange(0, this.value.length)
					}
				});
			}
		};
	}])

	.directive('detectChange', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				scope.$watch(attrs.ngModel, function (v) {
					//console.log('value changed, new value is: ' + v);
					alert('value change:');
				});
			}
		};
	})

	.directive('modalfit', function () {
		return {
		  template: '<div class="modal fade">' +
			  '<div class="modal-dialog modaldiscitem">' +
				'<div class="modal-content">' +
				  '<div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'<h4 class="modal-title">{{ title }}</h4>' +
				  '</div>' +
				  '<div class="modal-body" ng-transclude></div>' +
				'</div>' +
			  '</div>' +
			'</div>',
		  restrict: 'E',
		  transclude: true,
		  replace:true,
		  scope:true,
		  link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$watch(attrs.visible, function(value){
			  if(value == true)
				$(element).modal('show');
			  else
				$(element).modal('hide');
			});

			$(element).on('shown.bs.modal', function(){
			  scope.$apply(function(){
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function(){
			  scope.$apply(function(){
					scope.$parent[attrs.visible] = false;
			  });
			});
		  }
		};
	})

	/*
	.directive('firstName', function(){
		return {
			restrict: 'E',
			template: '<input type="text" ' +
						'class="form-control customer" ' +
						'placeholder="First Name" '+
						'ng-model="FirstName">',
			controllerAs: 'pos'
		}
	})
	*/

	.directive('modalwide', function () {
		return {
		  template: '<div class="modal fade">' +
			  '<div class="modal-dialog modalwide">' +
				'<div class="modal-content">' +
				  '<div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'<h4 class="modal-title">{{ title }}</h4>' +
				  '</div>' +
				  '<div class="modal-body" ng-transclude></div>' +
				'</div>' +
			  '</div>' +
			'</div>',
		  restrict: 'E',
		  transclude: true,
		  replace:true,
		  scope:true,
		  link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$watch(attrs.visible, function(value){
			  if(value == true)
				$(element).modal('show');
			  else
				$(element).modal('hide');
			});

			$(element).on('shown.bs.modal', function(){
			  scope.$apply(function(){
				scope.$parent[attrs.visible] = true;
			  });
			});

			$(element).on('hidden.bs.modal', function(){
			  scope.$apply(function(){
				scope.$parent[attrs.visible] = false;
			  });
			});
		  }
		};
	})

	.directive('modalmedium', function () {
		return {
		  template: '<div class="modal fade">' +
			  '<div class="modal-dialog modalmedium">' +
				'<div class="modal-content">' +
				  '<div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'<h4 class="modal-title">{{ title }}</h4>' +
				  '</div>' +
				  '<div class="modal-body" ng-transclude></div>' +
				'</div>' +
			  '</div>' +
			'</div>',
		  restrict: 'E',
		  transclude: true,
		  replace:true,
		  scope:true,
		  link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$watch(attrs.visible, function(value){
			  if(value == true)
				$(element).modal('show');
			  else
				$(element).modal('hide');
			});

			$(element).on('shown.bs.modal', function(){
			  scope.$apply(function(){
				scope.$parent[attrs.visible] = true;
			  });
			});

			$(element).on('hidden.bs.modal', function(){
			  scope.$apply(function(){
				scope.$parent[attrs.visible] = false;
			  });
			});
		  }
		};
	})

	.directive('bootstrapSwitch', [
        function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();

                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(state);
								DiscountVal.discountitemoption = state;
                            });
                        }
                    });

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
	]);
})();
