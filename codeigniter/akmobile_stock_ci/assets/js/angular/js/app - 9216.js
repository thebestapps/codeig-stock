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
	var TableID = '';
	var Qquestion = 0;

	$('#passcode').attr('autocomplete', 'off');

	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize', 'ngPayments'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', '$compile', '$payments',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile, $payments) {
	angular.expandAkamaiposController($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile, $payments)

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
		
		$scope.ItemSearch = null;

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
				$("#alert-msg-popup").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
					'<h4>'+msg+'</h4>'+
					'<br/>'+
					'<div id="keyboard"></div>'+
					'<input type="hidden" id="use_value" />'+
					'<input type="hidden" id="use_value2"/>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		/*Window Alert Properties*/
		
		var populateNumpadItemSubMenu = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-sub-menu").append('<div id="QuestionView" style="background: #144766; color:#EEE;"></div>');
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
					showCloseButton: true,
					resizable: false,
					draggable: false
				});
				setTimeout(function(){
					$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
					$('#dialog-numpad-alert').jqxWindow('open');
					$(".alert_okay").focus();
				},100);
				
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
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
					draggable: false
				});
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				setTimeout(function(){
					$('#dialog-numpad-alert').jqxWindow('open');
					$('#dialog-numpad-alert').jqxWindow('focus');
				},200);
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/*Popup Sub Menu*/
		var WindowPopupSubMenu = function(header_text, form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-sub-menu").jqxWindow({
					minHeight: '100%',
					minWidth: '100%',
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
					draggable: false
				});
				$("#QuestionView").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="test_input" class="hdfield" style="display:none;">'+
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
					'<input type="text" id="search_field" maxlength="'+KeyboardInputLimit+'" style="color:#000">'+
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
				$('#keyboard').jkeyboard({
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
					'<input type="text" id="quantity_field" class="hdfield" maxlength="'+QuantityInputLimit+'" style="color:#000;">'+
					'<div id="keyboard"></div>'+
				'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		/*EBT Balance Inquiry*/
		var WindowPopupBalanceInquiry = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#diloag-balance-inquiry").jqxWindow({
					height: 150,
					width: 250,
					title: 'EBT Balance Inquiry',
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true
				});
				$("#diloag-balance-inquiry").jqxWindow('open');
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
					showCloseButton: true
				});
				$('#dialog-numpad-quantity').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadQuantity = function(form_name = false){
			var def = $.Deferred();
			if(form_name == false){
				form_name = 'quantity_form';
			}
			populateNumpadQuantity(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numeric",
				  input: $('#quantity_field')
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
		
		var NumpadAlertOk = function(form, msg){
			var def = $.Deferred();
			populateNumpadAlert(form, msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_ok",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var NumpadAlertOkPrinterProblem = function(form, msg){
			var def = $.Deferred();
			populateNumpadAlert(form, msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_ok_submit",
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
				$('#keyboard').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		$scope.ParseCardInfo = function(){
		 	var CreditCardInfo = $(".cardinfos").val();
		 	ParseParserObj();
	    };
		
		var cardvalidate  = function(newValue, oldValue) {
			var card, length, upperLength, ccVerified;
			upperLength = 16;
			ccVerified = false;
			if(newValue) {
				card = $payments.cardFromNumber(newValue);
				//if(card && card.type) { $scope.creditCard.type = card.type; }
				if (card) {
					upperLength = card.length[card.length.length - 1];
				}
				length = newValue.replace(/\D/g, '').length;
				if(length == upperLength) {
					ccVerified = $("#gift_card_number").val().valid = $payments.luhnCheck(newValue.replace(/\D/g, ''));
				}
				if(ccVerified && length != upperLength) {
					ccVerified = ("#gift_card_number").val().valid = false;
				}
			}
		};
		
		var cc_format = function(value) {
			var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
			var matches = v.match(/\d{4,16}/g);
			var match = matches && matches[0] || '';
			var parts = [];
			for (i=0, len=match.length; i<len; i+=4) {
			  parts.push(match.substring(i, i+4))
			}
			if (parts.length) {
			  return parts.join(' ')
			} else {
			  return value
			}
  		};

  		var GetCardType = function(number) {
			// visa
			var re = new RegExp("^4");
			if (number.match(re) != null)
			  return "Visa";
		
			// Mastercard
			re = new RegExp("^5[1-5]");
			if (number.match(re) != null)
			  return "Mastercard";
		
			// AMEX
			re = new RegExp("^3[47]");
			if (number.match(re) != null)
			  return "AMEX";
		
			// Discover
			re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
			if (number.match(re) != null)
			  return "Discover";
		
			// Diners
			re = new RegExp("^36");
			if (number.match(re) != null)
			  return "Diners";
		
			// Diners - Carte Blanche
			re = new RegExp("^30[0-5]");
			if (number.match(re) != null)
			  return "Diners - Carte Blanche";
		
			// JCB
			re = new RegExp("^35(2[89]|[3-8][0-9])");
			if (number.match(re) != null)
			  return "JCB";
		
			// Visa Electron
			re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
			if (number.match(re) != null)
			  return "Visa Electron";
		
			return "";
	  	};
		
		$scope.verified = function () {
			return $payments.verified();
		};
		
		var GiftCardBalance = function(card){
			var def = $.Deferred();
			var postdata="giftcard="+card;
			posData.GiftCardBalancePOSMain(postdata)
			.success(function(data){
				if(data.success == true){
					$("#gift_card_balance").text("Balance "+data.Balance);
				}else if(data.success == false){
					$("#gift_card_balance").text('Balance 0.00');
				}
				def.resolve(data.Balance);
			})
			return def.promise();
		}
		
		var ParseParserObj = function(){
			if($("#gift_card_number").val() != ''){
				var p = new SwipeParserObj( document.getElementById('gift_card_number').value );
				if( p.hasTrack1 ){
					p.account_name;
					p.surname;
					p.firstname;
					p.account;
					p.exp_month + "/" + p.exp_year;
					
					var convert_card = cc_format(p.account);
					var cardtype = GetCardType(p.account);
					$("#gift_card_number").val(convert_card);
					$("#gift_card_balance").text('Processing please wait...');
					GiftCardBalance(convert_card);
					cardvalidate(p.account,"");
				}else{
					var giftcard = document.getElementById('gift_card_number').value;
					$("#gift_card_number").val(giftcard);
					$("#gift_card_balance").text('Processing please wait...');
					GiftCardBalance(giftcard);
				}
			}else{
				var msg = "Please swipe or type Gift Card Number";
				NumpadAlertClose ('gift_card_number_required', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				});	
			}
		}

		var populateGiftCardForm = function(form_name, ItemUnique, Price){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-gift-card").append('<div class="main_gc_container" style="background: #144766; color:#EEE;"></div>');
				$(".main_gc_container").html('');
				$(".main_gc_container").append($compile(''+
				'<form id="'+form_name+'">'+
					'<div class="gc_container" style="float:left;">'+
						'<h3 align="center" style="font-weight:bolder;">Sell Gift Card</h3>'+	
						'<div class="sel_amount">'+
							'<div style="float:left; width:110px;">'+
								'<div style="position:relative; width: 90px; height: 200px;">'+
									'<div style="border: 3px solid #ffffff; position: absolute; width: 95px; height: 90px; left: 10px ;  top:70px;">'+
										'<button style="height:85px; width: 90px; font-weight: bold; font-size: 15px; color: #000;" disabled="disabled">Gift Card<br/>Amount</button>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div style="float: left; width:340px; padding-bottom:5px;">'+
								'<div style="float:left; width:270px; padding:5px;" align="right"><h5 style="font-weight:bold;">Select Amount</h5></div>'+
								'<div style="float:left; width:125px; padding:5px;"><button type="button" id="gift_card_manual_enter_amount"  class="btn-enter-amount-gc">Enter Amount</button></div>'+
								'<div style="float:left; width:155px; padding-top:20px;" align="right"><span class="gift_card_amt" id="gift_card_amount">'+parseFloat(Price).toFixed(2)+'</span></div>'+
								'<div style="float:left; witdh:100%; padding-top:5px; padding-bottom:5px;">'+
									'<button type="button" class="btn-sel-amount-gc">10</button>'+
									'<button type="button" class="btn-sel-amount-gc">20</button>'+
									'<button type="button" class="btn-sel-amount-gc">25</button>'+
									'<button type="button" class="btn-sel-amount-gc">50</button>'+
									'<button type="button" class="btn-sel-amount-gc">100</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'</br>'+
					'<div class="sel_amount" style="float:left;">'+
						'<div style="float:left; width:110px;">'+
							'<div style="position:relative; width: 90px; height: 130px;">'+
								'<div style="border: 3px solid #ffffff; position: absolute; width: 95px; height: 90px; left: 10px ; top:15px;">'+
									'<button type="button" style="height:85px; width: 90px; font-size: 15px; color: #000; font-weight: bold" disabled="disabled">Gift Card<br/>Number</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div style="float: left; width:320px; padding-top:10px;">'+
							'<input type="text" class="form-control cardinfos" id="gift_card_number" ng-enter="ParseCardInfo()" ng-model="card.ccinfo">'+
							'<div style="float:left; width:138px; padding:5px;"><button type="button" class="btn-enter-amount-gc manual-giftcard">Manual Enter</button></div>'+
							'<div style="float:left; font-size: 24px;">OR</div>'+
							'<div style="float:left; width:125px; font-size:24px; color:#000000; padding:5px;"><button type="button" id="swipe_card" class="btn-swipe-gc">Swipe Card</button></div>'+
						'</div>'+
					'</div>'+
					'<div class="sel_amount" style="float:left;">'+
						'<div style="float:left; width:110px;">'+
							'<div style="position:relative; width: 90px; height: 130px;">'+
								'<div style="border: 3px solid #ffffff; position: absolute; width: 95px; height: 90px; left: 10px ; top:15px;">'+
									'<button type="button" style="height:85px; width: 90px; font-size: 15px; color: #000; font-weight: bold" disabled="disabled">Current<br/>Balance</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div style="float: left; width:320px; padding-top:30px;">'+
							'<div style="float:left; width:320px; padding-top:20px;" align="left"><span class="gift_card_bal" id="gift_card_balance">Please swipe the Gift Card.</span></div>'+
						'</div>'+
					'</div>'+
					'<input type="text" id="gift_card_field" class="hdfield" value="'+ItemUnique+'" style="display:none;"/>'+
					'<div style="float:left; width: 450px;" id="functions" align="right"></div>'+
				'</form>'+
				'')($scope));
				def.resolve();
			},100);
			return def.promise();
		}
		
		/*Gift Card Window popup*/
		var WindowPopupGiftCardForm = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-gift-card").jqxWindow({
					height: 700,
					width: 480,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
					draggable: false
				});
				$('#dialog-gift-card').jqxWindow('setTitle', header_text);
				$('#dialog-gift-card').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var GiftCardForm = function(form, ItemUnique, Price){
			var def = $.Deferred();
			populateGiftCardForm(form, ItemUnique, Price)
			.then(function(){
				$('#functions').hdgiftcard({
				  layout: "giftcard_function",
				  input: $("#gift_card_field")
				});
				def.resolve();
			});
			return def.promise();
		}
		
		//-->Gift Card Enter Amount Window Popup
		var populateNumpadPriceGC = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-gift-price").append('<div id="price_numpad_gc" style="background: #144766; color:#EEE;"></div>');
				$("#price_numpad_gc").html('');
				$("#price_numpad_gc").append(''+
				'<h4 style="text-align:center;">Enter Amount</h4>');
				$("#price_numpad_gc").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupPriceGC = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-gift-price").jqxWindow({
					height: 490,
					width: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false
				});
				$('#dialog-numpad-gift-price').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPriceGC = function(form_name){
			var def = $.Deferred();
			populateNumpadPriceGC(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numeric",
				  input: $('#number_field')
				});
				setTimeout(function(){
					$("#number_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		//--> Gift Card Manual Enter Card Window Popup
		var populateNumpadGiftCard = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-gift-card").append('<div id="numpad_gc" style="background: #144766; color:#EEE;"></div>');
				$("#numpad_gc").html('');
				$("#numpad_gc").append(''+
				'<h4 style="text-align:center;">Enter Card Number</h4>');
				$("#numpad_gc").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="card_field" class="hdfield" style="color:#000">'+
					'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupGiftCard = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-gift-card").jqxWindow({
					height: 490,
					width: 300,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false
				});
				$('#dialog-numpad-gift-card').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadGiftCard = function(form_name){
			var def = $.Deferred();
			populateNumpadGiftCard(form_name)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numbers_only",
				  input: $('#card_field')
				});
				setTimeout(function(){
					$("#card_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		
		var populateAllItemPriceLevel = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#all_item_price_level").append('<div id="all_item_price" style="background: #144766; color:#EEE;"></div>');
				$("#all_item_price").html('');
				$("#all_item_price").append($compile(''+
				'<div class="container-fluid">'+
				'<div style="float: left;">'+
                    '<button class="btn btn-primary btn-lg itempricebutton" ng-click="all_item_price1(\'price1\')">Sell<br/>Price</button>'+
                '</div>'+
				'<div style="float: left;">'+
					'<button class="btn btn-info btn-lg itempricebutton" ng-click="all_item_price2(\'price2\')">Price2</button>'+
				'</div>'+
				'<div style="float: left;">'+
					'<button class="btn btn-success btn-lg itempricebutton" ng-click="all_item_price3(\'price3\')">Price3</button>'+
				'</div>'+
				'<div style="float: left;">'+
					'<button class="btn btn-warning btn-lg itempricebutton" ng-click="all_item_price4(\'price4\')">Price4</button>'+
				'</div>'+
				'<div style="float: left;">'+
					'<button class="btn btn-danger btn-lg itempricebutton" ng-click="all_item_price5(\'price5\')">Price5</button>'+
				'</div>'+
				'')($scope));
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupAllItemPriceLevel = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#all_item_price_level").jqxWindow({
					width: 230, 
					height: 250,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false
				});
				$('#all_item_price_level').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadAllItemPriceLevel = function(){
			var def = $.Deferred();
			populateAllItemPriceLevel()
			.then(function(){
				setTimeout(function(){
					def.resolve();
				},100);
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
			temp_open_item = [];
		});
		
		$(document).on('click', '.alert_no', function(e){
			e.preventDefault();
			$("#barcode_search").attr("disabled", false);
			$("#barcode_search").focus();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			$('#display-payments').unblock();
		})
		
		$(document).on('click', '.alert_close', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
		})
		
		$(document).on('click', '.alert_okay', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			$('#display-payments').unblock();
			$('body').unblock();
		})
		
		$("#dialog-numpad-alert").on('close', function(event){
			$("#alert-msg-popup").html('');
		})
		
		$("#dialog-numpad-keyboard").on('close', function(event){
			$("#custom_item_keyboard").html('');
			$("#barcode_search").attr("disabled", false);
			$("#barcode_search").focus();
		})
		
		$("#dialog-numpad-quantity").on('close', function(event){
			$("#quantity_numpad").html('');
		})
		
		$("#dialog-numpad-passcode").on('close', function(event){
			$("#passcode_numpad").html('');
		})
		
		$("#dialog-numpad-table").on('close', function(event){
			$("#table_order_numpad").html('');
		})
		
		$("#dialog-numpad-all-price").on('close', function(event){
			$("#price_change_numpad").html('');
		})
		
		$("#dialog-numpad-change-price").on('close', function(event){
			$("#price_change_numpad").html('');
		})
		
		$("#dialog-numpad-sub-menu").on('close', function(event){
			$("#QuestionView").html('');
			Qquestion = 0;
		})
		
		$("#dialog-numpad-price").on('close', function(event){
			$("#price_numpad").html('');
		})
		
		$("#dialog-numpad-discount").on('close', function(event){
			$("#discount_numpad").html('');
		})
		
		$("#dialog-numpad-gift-price").on('close', function(event){
			$("#price_numpad_gc").html('');
		})
		
		$("#dialog-numpad-gift-card").on('close', function(event){
			$("#numpad_gc").html('');
		})
		/* End */
		
		var ItemsCategoryView = function(){
			$("#item-category-container").show();
			$("#payment-view").hide();
			$scope.BtnPaymentView = true;
			$scope.BtnItemsCategoryView = false;
		}
		
		var PaymentView = function(){
			$("#item-category-container").hide();
			$("#payment-view").show();
			$scope.BtnPaymentView = false;
			$scope.BtnItemsCategoryView = true;
		}
	

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
			showCloseButton: true,
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
		   var PoleDisplayActivate = $("#PoleDisplay").val();
		   if(PoleDisplayActivate == '1'){
			   posData.PoleDisplayTotal()
			   .success(function(data){
				 def.resolve(); 
			   })
		   }else{
			  def.resolve();  
		   }
		   return def.promise();	 
	    }
		
	    var PoleDisplayReset = function(){
			var def = $.Deferred();
			var PoleDisplayActivate = $("#PoleDisplay").val();
		    if(PoleDisplayActivate == '1'){
				posData.PoleDisplayReset()
				.success(function(data){
					def.resolve();
				})
			}else{
				def.resolve();
			}
			return def.promise();
		}
		
		var PoleDisplay = function(unique){
			var def = $.Deferred();
			var PoleDisplayActivate = $("#PoleDisplay").val();
		    if(PoleDisplayActivate == '1'){
				var postdata="receipt_details_unique="+unique;
				posData.PoleDisplay(postdata)
				.success(function(data){
					def.resolve();
				})
			}else{
				def.resolve();
			}
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


		var scrollOrderListDown = function(){
		  setTimeout(function() {
			 var n = 1000;
			 $('.orderedlist').animate({ scrollTop: n }, 50);
			console.log(n);
		  }, 100); 
	    }

		//-->On Load Ordered Item List
		var LoadOrderedItemList = function(){
			var def = new $.Deferred();
			posData.OrderedItemList()
			.success(function(data){
				$scope.ordereditemlist = data;
				if($("#PoleDisplay").val() == 2){
					conn.send(JSON.stringify(["CustomerDisplay", $scope.station_un]));
					conn.send(JSON.stringify(["ItemList", data, $scope.station_un]));
				}
				def.resolve(data);
			}).then(function(){
				scrollOrderListDown();
				def.resolve();
			})
			
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
						if($("#PoleDisplay").val() == 2){
							conn.send(JSON.stringify(['Totals',data, $scope.station_un]));
						}
						def.resolve();
					});
				}else{
					if($("#PoleDisplay").val() == 2){
						conn.send(JSON.stringify(['Totals','',$scope.station_un]));
					}
					$scope.totals = 0;
					def.resolve();
				}
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
				if($("#PoleDisplay").val() == 2){
					conn.send(JSON.stringify(['Tax',data, $scope.station_un]));
				}
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
					if($("#PoleDisplay").val() == 2){
						conn.send(JSON.stringify(['Discount', data, $scope.station_un]));
					}
				}else{
					if($("#PoleDisplay").val() == 2){
						conn.send(JSON.stringify(['Discount', '', $scope.station_un]));
					}
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
					$scope.EBTShow = false; //show
					$scope.NonEBTShow = false; //show
					$scope.EBT = data;
					$scope.NonEBT = data;
					if($("#PoleDisplay").val() == 2){
						conn.send(JSON.stringify(['EBT', data, $scope.station_un]));
					}
				}else{
					if($("#PoleDisplay").val() == 2){
						conn.send(JSON.stringify(['EBT', '', $scope.station_un]));
					}
					$scope.EBTShow = true; //hide
					$scope.NonEBTShow = true; //hide
				}
			})
			return def.promise();
		}
		
		//-->Load Payments
		
		var scrollTotalDown = function(){
		  setTimeout(function() {
			 var n = 1000;
    		 $('#payments').animate({ scrollTop: n }, 50);
		  }, 1000); 
	    }
		
		var LoadPayments = function(){
			var def = new $.Deferred();
			posData.POSPayments()
			.success(function(data){
				$scope.AllPayments = data;
				if($("#PoleDisplay").val() == 2){
					conn.send(JSON.stringify(['Payments', data, $scope.station_un]));
				}
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
				if($("#PoleDisplay").val() == 2){
					conn.send(JSON.stringify(['Change', data, $scope.station_un]));
				}
				def.resolve();
			});
			return def.promise();
		}// End Load Change


		//-->reload payments
	  	var DisplayAllPayments = function(){
			var def = new $.Deferred();  
			posData.DisplayAllPayments()
			.success(function(data){
		 		$scope.allpayments = data;
		  		$scope.payment_list_grid = {
					source:  {
						localdata: data,
					}
				};
		  		def.resolve();
			})
			return def.promise();
	  	};
		
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
	
	var PrinterProblemDefaultMessage = function(form_name){
		$("#dialog-numpad-alert").jqxWindow('close');
		$("#alert-msg-popup").html('');
		
		var msg="Printer error, please check <br/>";
			msg+="1. Printer is turned on. <br/>";
			msg+="2. Check printer paper. <br/>";
			msg+="3. Restart printer.";
		NumpadAlertClose(form_name, msg)
		.then(function(){
			WindowPopupAlert('Printer problem');
		})
	}	

	//--> Printer Check Connection
	var PrinterCheck = function(Unique){
		var def = $.Deferred();
		var postdata ="receipt_header_unique="+Unique;
		posData.PrinterCheckRecall(postdata)
		.success(function(data){
			if(data.success == true){
				if(data.print == true){
					def.resolve();
				}else{
					PrinterProblemDefaultMessage('printer_check');
					$('body').unblock();
				}
			}
		})
		return def.promise();
	};
	//--> End Printer Check Connection
	
	//-->Load POS Total
  	var POSTotal = function(){
		var def = new $.Deferred(); 
		posData.POSTotal()
		.success(function(data){
		  	$scope.amountdue = data;
		  	$scope.backcolor = data.color;
			if($("#PoleDisplay").val() == 2){
				conn.send(JSON.stringify(["DisplayTotal",data, $scope.station_un]));
				conn.send(JSON.stringify(["ClearNumber",'', $scope.station_un]));
			}
		  	def.resolve();
		});
		return def.promise();
	};
	
	$(document).on('submit','#printer_check',function(e){
		e.preventDefault();
		$('#dialog-numpad-alert').jqxWindow('close');
		KitchenPrintReceipt('IntegratedZero');	 
	})
	
	$(document).on("submit",'#IntegratedZero',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$('#dialog-numpad-alert').jqxWindow('close');
		$('body').block({message: 'Printing to other printer please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				$('body').unblock();
				def.resolve();
			})
		})
		return def.promise();
	})

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
						msg+="Do you wish to continue? <br/>";
						NumpadAlertYesNo(formname, msg)
						.then(function(){
							WindowPopupAlertYesNo('Printer problem | ID '+data.ReceiptHeaderUnique+" | Receipt#"+data.ReceiptNo)
							.then(function(){
								$(".alert_yes").focus();
							})
						})
					}else{
						Status = true;
					}
				}else{
					Status = true;
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
			//$("body").block({message: 'Checking Kitchen printer connection...'});
			PrinterCheckSetting(formname)
			.done(function(Status){
				if(Status == true){
					posData.GetCurrentReceiptHeader()
					.success(function(jsondata){
						var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
						posData.KitchenPrintReceipt(postdata)
						.success(function(data){
							$("#dialog-numpad-alert").jqxWindow('close');
							if(formname == 'PutOnHoldPrinterStatus'){
								setTimeout(function(){
									//Redirecting to Cashier page
									//$window.location = base_url + 'pos/cashier';
								},100);
							}
						})
					})
					def.resolve();
				}
				//$("body").unblock();
			})
		}else{
			def.resolve();
		} 
		return def.promise();
	}
	
    $(document).on("submit",'#OnHoldPrinterStatus',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Find working printer please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OnHold()
				.done(function(){
					if(TableID > 0){
						TableAssign(TableID)
						.then(function(){
							$("body").unblock();
							$window.location = base_url + "pos/pointofsale";
						})
					}else{
						posData.QuickSale()
						.success(function(){
							$("body").unblock();
							$window.location = base_url + "pos/pointofsale";
						})
					}
				});
				def.resolve();
			})
		})
		$("#dialog-numpad-alert").jqxWindow('close');
		return def.promise();
	});
	
	$(document).on('submit', '#RecallOnHoldPrinterStatus', function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Find working printer Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				$("body").unblock();
				var recall_location="recall_location=pos/pointofsale"
				posData.RecallLocationRequest(recall_location)
				.success(function(data){
					if(data.success == true)
					$window.location = base_url + "pos/pointofsale/recall-sale";
				})
				def.resolve();
			})
		})
		$("#dialog-numpad-alert").jqxWindow('close');
		return def.promise();
	})
	
	$(document).on("submit",'#PutOnHoldPrinterStatus',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Find working printer Please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				PutOnHoldReceipt()
				.done(function(){
					$("body").unblock();
					//$window.location = base_url + "pos/pointofsale";
				});
				def.resolve();
			})
			$("#dialog-numpad-alert").jqxWindow('close');
		})
		return def.promise();
	});
		
	var OnHold = function(){
		$("body").block({message: 'On Hold process please wait...'})
		var def = new $.Deferred();
		setTimeout(function(){
			 posData.OnHold()
			 .success(function(data){
				if(data.success == true){
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					ReceiptTaxChecker();
					OnHoldClicked();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id:''
					}
					$scope.RemoveCustomerWhen = false;
					$scope.BtnPaymentWhen = true;
					$scope.KitchenNoteDisabled = true;
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayReset();
						});
					});
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
				 $("body").unblock(); 	
				 def.resolve();
			 });
		 },100); 
		 return def.promise();
	}
	
	var PutOnHoldReceipt = function(){
		var def = new $.Deferred();
		setTimeout(function(){
		var postData="ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
			posData.PutOnHold(postData)
			.success(function(data){
				if(data.success == true){
					$scope.newsaleqshowModal = false;
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					ReceiptTaxChecker();
					OnHoldClicked();
					GlobalCustomer = null;
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					$scope.RemoveCustomerWhen = false;
					//$window.location = base_url + "pos/cashier";
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayReset();
						});
					});
					def.resolve();
				}
			})
		},100);
		return def.promise();
	}
	
	//LoadCategories()
	//LoadItemButtonListDefault()
	//LoadHeaderInfo()
	var itemslist;
	LoadStationData()
	LoadOrderedItemList()
	LoadTotals();
	/*
	.done(function(data1){
		 itemslist = data1;
		LoadTotals()
		.done(function(data2){
			var data = itemslist.concat(data2);
			conn.send(JSON.stringify(data));
		})
	})
	*/
	
	LoadTax();		
	LoadEBT();	
	LoadDiscount();								
	LoadPayments();								
	LoadChange();
	POSTotal();
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
			//var postDataLoadButtonItem="catid="+catid;
			var postdata = "CatID="+catid;
			/*
			posData.SelCategoryMenuItems(postdata)
			.success(function(value){
				$(".inventory-item").html(value);
			})
			*/
			
			 $.ajax({
				url: base_url + 'pos/pointofsale/select-category-menu-items',
				data: postdata,
				type: "POST",
				dataType: "html",
				success: function (data) {
					$(".inventory-item").html($compile(data)($scope));
				}
			})
				
			/*
			posData.SelectButtonByCategory(postDataLoadButtonItem)
			.success(function(data){
				//$scope.items = data;
				$(".inventory-item").html('');
				$.each(data, function(index, value){
					if(value.Label == null){
						$(".inventory-item").append($compile('<button type="button" class="btnitems" ng-click="addItem('+value.ItemUnique+', '+value.GiftCard+', '+value.price1+')" ng-disabled="BtnItemsWhen">&nbsp;</button>')($scope));	
					}else{
						var NewLabel = value.Label.substr(0, 28);
						$(".inventory-item").append($compile('<button type="button" class="btnitems" ng-click="addItem('+value.ItemUnique+', '+value.GiftCard+', '+value.price1+')" ng-disabled="BtnItemsWhen">'+NewLabel+'</button>')($scope));	
					}
				})
			});
			*/
		};
		
		//-->Add Item
		$scope.addItem = function(itemid, giftcard, price, question, promptdesc, promptprice, item, part, description){
			$("#price_numpad").html('');
			$("#custom_item_keyboard").html();
			var ItemUnique = itemid;
			var postdata="ItemUnique="+ItemUnique;
			if(giftcard > 0){
				GiftCardForm('sell_gift_card', ItemUnique, price)
				.then(function(){
					WindowPopupGiftCardForm('Gift Card')
					.then(function(){
						$("#gift_card_number").focus();
					})
				})
			}else{
				var postDataAddItem="ItemId="+itemid;
				if($scope.WarningStock == 1){
					posData.CheckQuantity(postDataAddItem)
					.success(function(CheckQty){
						if(CheckQty.Qty > 0){
							ProcessAddItemMenu(ItemUnique, promptdesc, promptprice, item, part, description);
						}else{
							PlaySound();
							$scope.ItemSearch = null;
							$("#barcode_search").attr("disabled", true);
							var msg = CheckQty.Description+"<br/>";
								msg+= "Quantity "+parseFloat(CheckQty.Qty)+"<br/>";
								msg+= "Do you still want to Sell?";
							NumpadAlertYesNo('add_item_without_stock_menu', msg)
							.then(function(){
								 $("#use_value").val(itemid);
								 $("#use_value2").val(CheckQty.Question);
								 WindowPopupAlertYesNo('Add New Item');
							})
						}
					});
				}else{
					setTimeout(function(){
						Qquestion = question;
						ProcessAddItemMenu(ItemUnique, promptdesc, promptprice, item, part, description);
					},100);	
				}
			}
		};
		
		var ProcessAddItemMenu = function(ItemUnique, PromptDesc, PropmtPrice, item, part, description){
			var def = $.Deferred();
			var question = 0;
			if($("#use_value2").val()){
				 question = $("#use_value2").val();
			}else{
				 question = Qquestion;
			}
			var postdata="ItemUnique="+ItemUnique;
			CheckPrompt(postdata, ItemUnique, 1, PromptDesc, PropmtPrice, item, part, description)
			.then(function(){
				if(question == 1){
					Question('', true, '', ItemUnique);	
				}else{
					var postDataAddItem="ItemId="+ItemUnique;
					posData.AddItem(postDataAddItem)
					.success(function(data){
						$scope.desc = data;
						$("#receiptn").text(data.ReceiptNumber);
						LoadOrderedItemList();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						ReceiptTaxChecker();
						CheckReceiptStatus();
						GetCustomerSave();
						$scope.BtnPaymentWhen = false;
						LoadTotals()
						.then(function(){
							POSTotal()
							.then(function(){
								PoleDisplay(data.ReceiptDetailsUnique);
							});
						})
						$("#barcode_search").attr("disabled", false);
						$("#barcode_search").focus();
					});
				}
				$scope.ItemSearch = null;
				def.resolve();
			})
			return def.promise();
		}
		
		$(document).on('submit', '#add_item_without_stock_menu', function(e){
			e.preventDefault();
			var ItemUnique = $("#use_value").val();
			ProcessAddItemMenu(ItemUnique);
			//$("#barcode_search").attr("disabled", false);
			//$("#barcode_search").focus();
			$("#dialog-numpad-alert").jqxWindow('close');
		})

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
					var postDataSaleType="saletype=1";
						posData.NewSale(postDataSaleType)
						.success(function(data){
							if(data.success == true){
								$scope.newsaleid = data.NewSaleId;
								$scope.showModal = false;
							}
						 }).then(function(){
							GetCustomerSave();
							LoadHeaderInfo();
							LoadOrderedItemList();
							LoadTax();
							POSTotal();
							LoadTotals()
							.then(function(){
								POSTotal()
								.then(function(){
									PoleDisplayReset();
								})
							})
							LoadEBT();
							LoadDiscount();
							LoadPayments();
							LoadChange();
							ReceiptTaxChecker();
							CheckReceiptStatus();
							setTimeout(function(){
								GetSelectedCustomer();
							},500)
							$("#barcode_search").focus();
							ItemsCategoryView();
						});
					//$scope.showModal = !$scope.showModal;
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
					LoadTotals()
					.then(function(){
						POSTotal();
					})
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
				PutOnHoldReceipt()
				.then(function(){
					 //$window.location = base_url+ 'pos/pointofsale';
					 ItemsCategoryView();
				})
			});
		};

		$scope.ReturnDisplay = function(){
			$scope.newsaleqshowModal = false;
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
				GetCustomerSave();
				LoadHeaderInfo();
				LoadOrderedItemList();
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
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayReset();
					})
				})
			  	$("#barcode_search").focus();
			  	ItemsCategoryView();
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
					'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
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
					showCloseButton: true,
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
				  layout: "numeric",
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
			var EnterDiscountAmount = $("#number_field").val();
			if(EnterDiscountAmount == ''){
				EnterDiscountAmount = 0.00;
			}
			var DiscountAmount = EnterDiscountAmount
			var postDataDiscountSave="optiondiscount="+1;
				postDataDiscountSave+="&discountamount="+DiscountAmount;
				postDataDiscountSave+="&unique="+Unique;
			posData.DiscountItem(postDataDiscountSave)
			.success(function(data){
				if(data.success == true){
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#dialog-numpad-discount").jqxWindow('close');
					GlobalItemUnique = {};
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplay(Unique);
						});
					});
				 }else{
					$("#dialog-numpad-discount").jqxWindow('close'); 
					var msg = "Discount must be less than the item amount";
					NumpadAlertClose('discount_item_percent_alert', msg)
					.then(function(){
						WindowPopupAlert('Discount Item Percent')
					});
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
					WindowPopupAlert('Discount Item Dollar')
				});
			}
		};
		
		$(document).on('submit', '#item_discount_dollar_form', function(e){
			e.preventDefault();
			var Unique = GlobalItemUnique.Unique;
			var EnterDiscountAmount = $("#number_field").val();
			if(EnterDiscountAmount == ''){
				EnterDiscountAmount = 0.00;
			}
			var DiscountAmount = EnterDiscountAmount;
			var postDataDiscountSave="optiondiscount="+2;
				postDataDiscountSave+="&discountamount="+DiscountAmount;
				postDataDiscountSave+="&unique="+Unique;
			posData.DiscountItem(postDataDiscountSave)
			.success(function(data){
				if(data.success == true){
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#dialog-numpad-discount").jqxWindow('close');
					GlobalItemUnique = {};
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplay(Unique);
						});
					});
				 }else{
					$("#dialog-numpad-discount").jqxWindow('close');
					var msg = "Discount must be less than the item amount";
					NumpadAlertClose('discount_item_dollar_alert', msg)
					.then(function(){
						WindowPopupAlert('Discount Item Dollar')
					});
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
		
		
		var LocationRequest = function(){
			var recall_location="recall_location=pos/pointofsale"
			posData.RecallLocationRequest(recall_location)
			.success(function(data){
				if(data.success == true)
				$window.location = base_url + "pos/pointofsale/recall-sale";
			})
		}
		
		$scope.ReCall = function(){
			posData.RecallFirstCheck()
			.success(function(firstdata){
				if(firstdata.success == true){
					posData.RecallSecondCheck()
					.success(function(seconddata){
						if(seconddata.success == true){
							KitchenPrintReceipt("RecallOnHoldPrinterStatus")
							.then(function(){
								setTimeout(function(){
									LocationRequest();
								},100);
							})
						}else{
							LocationRequest();
						}
					})
				}else{
					LocationRequest();
				}
			})
		}
		
		//-->Payment
		$scope.Payment = function(){
			//var PaymentPage = $scope.PaymentPageDisplay;
			//if(PaymentPage == 1){
				
			//}else{
				window.location.href = base_url + 'pos/pointofsale/payment';
			//}
		};
		
		/*End Payment Plugin*/
		
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
								LoadOrderedItemList();
								LoadTax();
								LoadEBT();
								LoadDiscount();
								LoadPayments();
								LoadChange();
								CheckReceiptStatus();
								GlobalItemUnique = {};
								LoadTotals()
								.then(function(){
									POSTotal()
									.then(function(){
										PoleDisplayReset();
									});
								});
							})
						}else if(data.remove == false){
							var msg = "Item already sold, please return item instead.";
							 NumpadAlertOk('item_printed_alert', msg)
							 .then(function(){
								WindowPopupAlert ('Remove Item Alert')	
							 }) 
						}
					}
				});
				
			}else{
				var msg = "Please select item first.";
				 NumpadAlertOk ('item_printed_alert', msg)
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
					LoadHeaderInfo();
					LoadOrderedItemList();
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
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayReset();
						});
					});
					$scope.RemoveCustomerWhen = false;
					ItemsCategoryView();
				}else if (data.success == false){
					var msg = "Cannot cancel sale with payment.  Please refund instead.";
					NumpadAlertClose('cancel_sale_void_alert', msg)
					.then(function(){
						WindowPopupAlert('Cancel Sale Alert')
					})
				}
			 }).then(function(){
				$("#dialog-numpad-alert").jqxWindow('close');
				//$window.location = base_url + "pos/pointofsale";
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
			if(DiscountAmount == ''){
				DiscountAmount = 0.00;
			}
			var postDataReceiptDiscount="optiondiscount="+1;
			postDataReceiptDiscount+="&discountamount="+DiscountAmount;
			posData.ReceiptDiscount(postDataReceiptDiscount)
			.success(function(data){
				if(data.success == true){
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
					$("#dialog-numpad-discount").jqxWindow('close');
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayTotal();
						});
					});
				 }else{
					$("#dialog-numpad-discount").jqxWindow('close'); 
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
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
					$("#dialog-numpad-discount").jqxWindow('close');
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayTotal();
						});
					});
				 }else{
					 $("#dialog-numpad-discount").jqxWindow('close'); 
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
					'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
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
					showCloseButton: true,
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
				  layout: "numeric",
				  input: $('#number_field')
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
					LoadTotals()
					.then(function(){
						POSTotal();
					})
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$("#dialog-numpad-change-price").jqxWindow('close');
					GlobalItemUnique = {};
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
												$("#quantity_field").val(data.Quantity);
												$("#quantity_field").focus();
												setTimeout(function(){
													$("#quantity_field").select();
												},100);
											})
										})
									})
								});
							 }else if(data.qtychange == false){
								 var msg = "Can't change the item Quantity, please add item instead.";
								 NumpadAlertClose ('quantity_cannot_change_alert', msg)
								 .then(function(){
									WindowPopupAlert ('Quantity Change Alert')
									.then(function(){
										
									})	
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
			var Quantity = $("#quantity_field").val();
			var Unique = GlobalItemUnique.Unique;
			var postDataQuantityChange="Unique="+Unique;
				postDataQuantityChange+="&NewQuantity="+Quantity;
			if(Quantity){
				posData.QuantityChange(postDataQuantityChange)
				.success(function(data){
					if(data.success == true){
						LoadOrderedItemList();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$("#quantity_numpad").html('');
						$("#dialog-numpad-quantity").jqxWindow('close');
						GlobalItemUnique = {};
						LoadTotals()
						.then(function(){
							POSTotal()
							.then(function(){
								PoleDisplayTotal();
							})
						});
					}else{
						$("#dialog-numpad-quantity").jqxWindow('close');
						var msg = "Gift Card Quantity cannot be changed, please sell or return gift card instead."
						NumpadAlertOk('item_note_alert', msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
						});
					}
				});
			}else{
				$("#quantity_numpad").html('');
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
				OnHold()
				.then(function(){
					ItemsCategoryView();
				})
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
						LoadTotals()
						.then(function(){
							POSTotal();
						})
						LoadTax();
						LoadEBT
						LoadDiscount();
						LoadPayments();
						LoadChange();

						$scope.ItemNoTaxHide = false;
						$scope.ItemTaxHide = true;
					}else if(data.success == false){
						LoadOrderedItemList();
						LoadTotals()
						.then(function(){
							POSTotal();
						})
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
						LoadTotals()
						.then(function(){
							POSTotal();
						})
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ItemNoTaxHide = false;
						$scope.ItemTaxHide = true;
					}else if(data.success == false){
						LoadOrderedItemList();
						LoadTotals()
						.then(function(){
							POSTotal();
						})
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
						LoadOrderedItemList();
						LoadTax();
						LoadEBT();
						LoadDiscount();
						LoadPayments();
						LoadChange();
						$scope.ReceiptNoTaxHide = true;
						$scope.ReceiptTaxHide = false;
						LoadTotals()
						.then(function(){
							POSTotal()
							.then(function(){
								PoleDisplayTotal();
							});
						});
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
					LoadOrderedItemList();
					LoadTax();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					$scope.ReceiptNoTaxHide = false;
					$scope.ReceiptTaxHide = true;
					LoadTotals()
					.then(function(){
						POSTotal()
						.then(function(){
							PoleDisplayTotal();
						});
					});
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
		$scope.BtnApplyPaymentWhen = false;
		$scope.KitchenNoteDisabled = true;
		$scope.BtnEBTCalulateWhen = true;
		var orderlist = $scope.ordereditemlist;
		if(orderlist.length == 0){
			$scope.BtnApplyPaymentWhen = true;
			ItemsCategoryView();
		}
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
		$scope.KitchenNoteDisabled = true;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnApplyPaymentWhen = true;
	};

	var OnHoldClicked = function(){
		$scope.BtnPaymentWhen = true;
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
		$scope.KitchenNoteDisabled = true;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnApplyPaymentWhen = true;
	}
	
	var CancelSaleClicked = function(){
		$scope.BtnPaymentWhen = true;
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
		$scope.KitchenNoteDisabled = true;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnApplyPaymentWhen = true;
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
		$scope.KitchenNoteDisabled = false;
		$scope.BtnEBTCalulateWhen = false;
		$scope.BtnApplyPaymentWhen = false;
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
		$scope.KitchenNoteDisabled = true;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnApplyPaymentWhen = false;
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
			NumpadAlertOk('item_note_alert', msg)
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
					LoadTotals()
					.then(function(){
						POSTotal();
					})
					LoadTax();
					ReceiptTaxChecker();
					LoadEBT();
					LoadDiscount();
					LoadPayments();
					LoadChange();
					GlobalItemUnique = {};
				}else{
					var msg = "To return gift card, please use gift card function and put negative amount.";
					NumpadAlertOk('gift_card_cannot_return', msg)
					.then(function(){
						WindowPopupAlert('Return Item');
					})
				}
			})
		}else{
			var msg = "Please select item first";
			NumpadAlertOk('select_item_first', msg)
			.then(function(){
				WindowPopupAlert('Return Item');
			})
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
		pageSize: 12,
		pagerMode: 'advance',
		altRows: true,
		showfilterrow: true,
        filterable: true,
		//filterMode: 'simple', //use for jqxdata table
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
				{ name: 'Quantity', type: 'string'},
				{ name: 'Question', type: 'int'},
			],
			localdata: {}
		},
		columnsResize: true,
		columns: [
			{ text: 'ID', dataField: 'Unique', width: "6%"},
			{ text: 'Item Number', dataField: 'Item', width: "8%", filtertype: 'input'},
			{ text: 'Barcode', dataField: 'Part', width: "7%", hidden: false, filtertype: 'input' },
			{ text: 'Description', dataField: 'Description', width: '30%', filtertype: 'input' },
			//{ text: 'Barcode Unique', dataField: 'BarcodeUnique', hidden: true},
			//{ text: 'Barcode', dataField: 'Barcode', width: '12%'},
			{ text: 'Size', dataField: 'Size', width: '7%', hidden: true}, //Hidden column
			{ text: 'Color', dataField: 'Color', width: '7%', hidden: true}, //Hidden column
			{ text: 'Other', dataField: 'Other', width: '7%', hidden: true}, //Hidden column
			{ text: 'SupplierID', dataField: 'SupplierId', hidden: true}, //Hidden column
			{ text: 'Supplier', dataField: 'Supplier', width: '11%', filtertype: 'input'},
			{ text: 'Supplier Part', dataField: 'SupplierPart', hidden: true },
			{ text: 'BrandID', dataField: 'BrandId', hidden: true}, //Hidden column
			{ text: 'Brand', dataField: 'Brand', width: '11%', filtertype: 'input' },
			{ text: 'CatMainId', dataField: 'CatMainId', hidden: true}, //Hidden column
			{ text: 'Category', dataField: 'Category', width: '10%', filtertype: 'input'},
			{ text: 'SubCat', dataField: 'SubCategory', hidden: true}, //Hidden column
			{ text: 'Cost', dataField: 'Cost', width: '5%', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostExtra', dataField: 'CostExtra', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostFreight', dataField: 'CostFreight', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'CostDuty', dataField: 'CostDuty', cellsalign: 'right', hidden: true}, //Hidden column
			{ text: 'Cost', dataField: 'CostLanded', cellsalign: 'right', width:'7%', hidden: true},
			{ text: 'Price', dataField: 'Price', width: '10%', cellsalign: 'right', cellsFormat: 'F2', filtertype: 'input'},
			{ text: 'ListPrice', dataField: 'ListPrice', hidden: true}, //Hidden column
			{ text: 'Price2', dataField: 'price2', hidden: true}, //Hidden column
			{ text: 'Price3', dataField: 'price3', hidden: true}, //Hidden column
			{ text: 'Price4', dataField: 'price4', hidden: true}, //Hidden column
			{ text: 'Price5', dataField: 'price5', hidden: true}, //Hidden column
			{ text: 'Quantity', dataField: 'Quantity', width: '7%', cellsalign: 'center', filtertype: 'input'},
			{ text: 'Question', dataField: 'Question', hidden: true}, //Hidden column
		]
	};
		
		var PlaySound = function(){
			var sound = document.getElementById("audio");
          	sound.play();
			setTimeout(function(){
				sound.pause();
				sound.currentTime = 0;
			},400);
		}

		$scope.EnterItemSearch = function(){
			if($scope.ItemSearch == null){
				PlaySound();
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
								source: {
									dataType: "json",
									localdata: invdata
								}
							};
							
						}).then(function(){
							$scope.ItemSearch = null;
							WindowPopupItemInventory();
						})
					}else if(data.Count == 1){
							var postDataAddItem="ItemId="+data.Unique;
							if($scope.WarningStock == 1){
								//Check Quantity if Item has stock
								posData.CheckQuantity(postDataAddItem)
								.success(function(CheckQty){
									if(CheckQty.Qty > 0){
										ProcessAddItemMenu(data.Unique);
									}else{
										PlaySound();
										$scope.ItemSearch = null;
										$("#barcode_search").attr("disabled", true);
										var msg = CheckQty.Description+"<br/>";
											msg+= "Quantity "+parseFloat(CheckQty.Qty)+"<br/>";
											msg+= "Do you still want to Sell?";
										NumpadAlertYesNo('add_item_without_stock', msg)
										.then(function(){
											 $("#use_value").val(data.Unique);
											 $("#use_value2").val(CheckQty.Question);
											 WindowPopupAlertYesNo('Add New Item')
										})
									}
								});
							}else{
								ProcessAddItemMenu(data.Unique);
							}
						}else{
							PlaySound();
							$scope.ItemSearch = '';
						}//-->End if
					})
				}//-->End if Item Search is empty.
		};
		
		var WindowPopupItemInventory = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#search-inventory-item-dialog").jqxWindow({
					height: '100%',
					width: 1000,
					title: "Inventory",
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true
				});
				$('#search-inventory-item-dialog').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/* All Inventory */ //
		$scope.SearchItemButton = function(){
			if($scope.ItemSearch == null){
				$http({
					method: 'get', 
					url: base_url + "pos/pointofsale/load-all-inventory"
				}).success(function(data){
					$scope.searchinventorygridSettings = {
						source:  {
							localdata: data
						}
					};
					WindowPopupItemInventory();
					$scope.ItemSearch = null;
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
								source: {
									dataType: "json",
									localdata: invdata
								}
							};
							
							WindowPopupItemInventory();
							setTimeout(function(){
							  $(".focusme").focus();
								$(".focusme").val($scope.ItemSearch);
								$scope.ItemSearch = null;
							}, 3000);
						})
					}else if(data.Count == 1){
							var process = false;
							//Check Quantity
							var postDataAddItem="ItemId="+data.Unique;
							if($scope.WarningStock == 1){
								posData.CheckQuantity(postDataAddItem)
								.success(function(CheckQty){
									if(CheckQty.Qty > 0){
										ProcessAddItemMenu(data.Unique);
									}else{
										PlaySound();
										$scope.ItemSearch = null;
										$("#barcode_search").attr("disabled", true);
										var msg = CheckQty.Description+"<br/>";
											msg+= "Quantity "+parseFloat(CheckQty.Qty)+"<br/>";
											msg+= "Do you still want to Sell?";
										NumpadAlertYesNo('add_item_without_stock', msg)
										.then(function(){
											 $("#use_value").val(data.Unique);
											  $("#use_value2").val(CheckQty.Question);
											 WindowPopupAlertYesNo('Add New Item')
											 $("#SearchItemButton").removeAttr("selected");
										})
									}
								});
							}else{
								ProcessAddItemMenu(data.Unique);
							}
					}else{
						PlaySound();
						$scope.ItemSearch = null;
						/*
							$scope.searchinventorygridSettings = {
								source:  {
									dataType: "json",
									url: base_url + "pos/pointofsale/load-all-inventory"
								}
							};
							setTimeout(function(){
							  $(".focusme").focus();
								$(".focusme").val($scope.ItemSearch);
								$scope.ItemSearch = '';
							}, 3000);
						*/
							
					}//-->End if
				})
			}//-->End if Item Search is empty.
		};
		/* End All Inventory*/

		$("#inventory-search").on('rowclick', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			
			$scope.search_item = {
				id: row.Unique
			}
			$scope.barcode_item = {
				id: row.BarcodeUnique
			}
		})
		
		$("#inventory-search").on('rowdoubleclick', function(event){
			var index = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', index);
			editRow = index;
			var postdata="ItemUnique="+row.Unique;
			
			var process = false;
			if($scope.WarningStock == 1){
				if(row.Quantity > 0){
					ProcessAddItemMenu(row.Unique);
				}else{
					PlaySound(row.Unique);
					$("#barcode_search").attr("disabled", true);
					var msg = row.Description+"<br/>";
						msg+= "Quantity "+parseFloat(row.Quantity)+"<br/>";
						msg+= "Do you still want to Sell?";
					NumpadAlertYesNo('add_item_without_stock', msg)
					.then(function(){
						$("#use_value").val(row.Unique);
						$("#use_value2").val(row.Question);
						WindowPopupAlertYesNo ('Add New Item');
					})
				}
			}else{
				ProcessAddItemMenu(row.Unique);
			}
			$("#search-inventory-item-dialog").jqxWindow('close');
		})
		
		
		var populateKeyboard = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_item_keyboard").html('');
				$("#custom_item_keyboard").append(''+
				'<form id="'+form_name+'">'+
				'<input type="text" id="search_field" maxlength="'+KeyboardInputLimit+'">'+
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
					'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
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
				  layout: "numeric",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var StatPromptDesc = 0;
		var StatPromptPrice = 0;
		var StatItem = '';
		var StatPart = '';
		var StatDescription = '';
		var CheckPrompt = function(post, item_unique, process, promptdesc, promptprice, ItemNo, Part, Description){
			var def = $.Deferred();
			var KitchenPrintStatus = $scope.KitchenPrinter;
			//posData.Prompt(post)
			//.success(function(data){
				//if(data.success == true){
				//if(promptdesc == 1 || promptprice == 1){
					if(process == 1){ //Process 1 Enter new Description
						if(promptdesc == 1){
							$scope.CustomItemUnique = item_unique;
							NumpadKeyboard('custom_item_form')		
							.then(function(){
								StatPromptDesc = promptdesc;
								StatPromptPrice = promptprice;
								StatItem = ItemNo;
								StatPart = Part;
								StatDescription = Description;
								WindowPopupKeyboard('ID '+item_unique+" | "+ Description)
								.then(function(){
									$("#search_field").focus();
									setTimeout(function(){
										$("#search_field").select();
									},100);
								})
							})				
						}else{
							if(promptprice == 1){
								$scope.CustomItemUnique = item_unique;
								$scope.price_itemno = ItemNo;
								$scope.price_desc = Description;
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
						if(promptprice == 1){
							$scope.CustomItemUnique = item_unique;
							def.resolve(true);
						}else{
							def.resolve(false);
						}
					}
				//}else if(data.success == false){
				//	def.resolve();
				//}
			//})
			return def.promise();
		}
			
		$scope.SelectItemSearch = function(){
			var ItemUnique = $scope.search_item.id;
			var postdata="ItemUnique="+ItemUnique;
			
			var process = false;
			var postDataAddItem="ItemId="+ItemUnique;
			if($scope.WarningStock == 1){
				posData.CheckQuantity(postDataAddItem)
				.success(function(CheckQty){
					if(CheckQty.Qty > 0){
						ProcessAddItemMenu(ItemUnique);
					}else{
						PlaySound();
						$scope.ItemSearch = null;
						$("#barcode_search").attr("disabled", true);
						var msg = CheckQty.Description+"<br/>";
							msg+= "Quantity "+parseFloat(CheckQty.Qty)+"<br/>";
							msg+= "Do you still want to Sell?";
						NumpadAlertYesNo('add_item_without_stock', msg)
						.then(function(){
							 $("#use_value").val(ItemUnique);
							 $("#use_value2").val(CheckQty.Question);
							 WindowPopupAlertYesNo('Add New Item')
						})
					}
				});
			}else{
				ProcessAddItemMenu(ItemUnique);
			}
			$("#search-inventory-item-dialog").jqxWindow("close");
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
						LoadTotals()
						.then(function(){
							POSTotal();
						})
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
						//$("#inventory-search").jqxDataTable('clearFilters');
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

				CheckPrompt(postdata, ItemUnique, 2, StatPromptDesc, StatPromptPrice, StatItem, StatPart, StatDescription)
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
							temp_open_item = [];
							GetCustomerSave();
							LoadOrderedItemList();
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
							LoadTotals()
							.then(function(){
								POSTotal()
								.then(function(){
									PoleDisplay(data.ReceiptDetailsUnique);
								});
							});
						})
					}
					StatPromptDesc = 0;
					StatPromptPrice = 0;
					StatItem = '';
					StatPart = '';
					StatDescription = '';
				})
			}
		});
		
		$(document).on('submit','#OpenItemPrice',function(e){
			e.preventDefault();
			var inputPrice = $("#number_field").val();
			if(inputPrice == ''){
				$("#number_field").val('0.00');
			}
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
				$("#barcode_search").attr("disabled", false);
				$("#barcode_search").focus();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplay(data.ReceiptDetailsUnique);
					});
				});
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
			//$("#inventory-search").jqxDataTable('clearFilters');
			$("#search-inventory-item-dialog").jqxWindow('close');
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
					'<input type="password" class="hdfield" id="number_field" autocomplete="off" style="color:#000">'+
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
				  layout: "numbers_only",
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
								PrinterProblemDefaultMessage('open_cash_drawer');
							}
							$('body').unblock();
						}else{
							$("#dialog-numpad-passcode").jqxWindow('close');
						}
					})
				}else{
					$("#dialog-numpad-passcode").jqxWindow('close');
					var msg = "Invalid Password";
					NumpadAlertOk('open_cash_drawer', msg)
					.then(function(){
						WindowPopupAlert('Passcode Error');
					})
				}
				$("#passcode_numpad").html('');
		  	})
		})
	
		$scope.CheckPrint = function(){
			//$("body").block({message: 'Printing receipt please wait...'});
			posData.GetCurrentReceiptHeader()
			.success(function(data){
				PrinterCheck(data.ReceiptHeaderUnique)
				.then(function(){
					//$("body").unblock();
					if($scope.CheckPrintKitchen == 1){
						KitchenPrintReceipt("CheckPrintKitchen");
					}
				})
			})
		}
		
		$(document).on('submit', '#CheckPrintKitchen', function(e){
			e.preventDefault();
			$("body").block({message: 'Find working printer Please wait...'});
			posData.GetCurrentReceiptHeader()
			.success(function(jsondata){
				var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
				posData.KitchenPrintReceipt(postdata)
				.success(function(data){
					$("body").unblock();	
				})
			})
			$("#dialog-numpad-alert").jqxWindow("close");
		})
		
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
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
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
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
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
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
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
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
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
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$('#dialog-numpad-all-price').jqxWindow('close');
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
			})
		}

		$scope.PriceLevel = function(){
			NumpadAllItemPriceLevel()
			.then(function(){
				WindowPopupAllItemPriceLevel('Price level for all items');
			})
		}

		$scope.all_item_price1 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$("#all_item_price_level").jqxWindow("close");
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
			})
		}

		$scope.all_item_price2 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTax();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$("#all_item_price_level").jqxWindow("close");
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
			})
		}

		$scope.all_item_price3 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$("#all_item_price_level").jqxWindow("close");
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
			})
		}

		$scope.all_item_price4 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$("#all_item_price_level").jqxWindow("close");
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
			})
		}

		$scope.all_item_price5 = function(price){
			var postdata="newprice="+price;
			posData.PriceChangeAll(postdata)
			.success(function(){
				LoadOrderedItemList();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				$("#all_item_price_level").jqxWindow("close");
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
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
		
		/*
		$scope.searchCustomerRowClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
			
			alert("test");
		}
		*/
		
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

		var CatArray = [];
		var ItemHoldArray = [];
		var TempAddItemList = [];
		var SubMenuItemSource = {
			datatype: "json",
			datafields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'Description', type: 'string' },
				{ name: 'Quantity', type: 'string'},
				{ name: 'QuestionUnique', type: 'int'},
			], 
			localdata: TempAddItemList
		};
		var dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);

		/*
		*@param string title
		*@param boolean method
		*@param string info
		*@param array data
		*/
		var Question = function(title, method, info, ItemUnique){
			 var Title = '';
			 TempItem.push(ItemUnique);
			 TempAddItem.push(ItemUnique);
			 TempAddItemCompare.push(ItemUnique);
			 NumpadItemSubMenu()
			 .then(function(){
				 var postdata="ItemUnique="+ItemUnique;
				 posData.LoadQuestions(postdata)
				 .success(function(load_question){
					Title = "ID:"+ItemUnique+" | "+load_question.ItemTitle;
					
					for(var i = 0; i < load_question.arrcat.length; i++){
						CatArray.push({"QuestionUnique":load_question.arrcat[i].QuestionUnique, "Min":load_question.arrcat[i].Min, "Max": load_question.arrcat[i].Max, "Count": 0, "QuestionName": load_question.arrcat[i].QuestionName});
					}

				 	$("#QuestionView").append(load_question.html);
					$("#QuestionView").append("<div style='margin-top: 10px; overflow:auto; width: 100%; float:left;'>"+
													"<div style='float:left; width:250px; height:300px;'>"+
														"<div id='jqxlistbox'></div>"+
													"</div>"+
													"<div style='float:left; width:200px; height:300px;'>"+
														"<input type='button' id='ClearAllItem' class='btn-sub-menu-clear-all' value='Clear All' style='height:80px; width:80px; color:#000; margin: 10px 0 10px 60px;' />"+
														"<input type='button' id='SubMenuQuantity' class='btn-sub-menu-clear-all' value='Quantity' style='height:80px; width:80px; color:#000; margin: 10px 0 10px 60px;' />"+
														"<textarea id='AddingItems' rows='10' cols='40' style='color:#000; display:block;'></textarea>"+
													"</div>"+
											  "</div>");
					TempItemListRef.push({"Unique":ItemUnique, "Description":load_question.ItemTitle, "Price": load_question.ItemPrice, "Quantity": 1});
					ItemHoldArray = [];//Clear array first
					ItemHoldArray.push({"Unique":ItemUnique, "Description":load_question.ItemTitle, "Price": load_question.ItemPrice, "Quantity": 1});
					$("#AddingItems").val(JSON.stringify(TempItemListRef));	
				 }).then(function(){
					 	$("#jqxlistbox").jqxGrid({
							width: 240,
							height: 290,
							source: dataAdapterSubMenu,
							showstatusbar: true,
							statusbarheight: 30,
							showAggregates: true,
							columnsresize: true,
							columns: [
								{ text: 'Unique', datafield: 'Unique', hidden: true },
								{ text: 'Qty', datafield: 'Quantity', width: 40, cellsalign: 'right',
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
										var Total=parseFloat(0).toFixed(0);
										if(aggregates.Total){
											Total = aggregates.Total;
										}
										renderString +=  Total + "</div>";
										return renderString;
									}
								},
								{ text: 'Description', datafield: 'Description', width: 200},
								{ text: 'QuestionUnique', datafield: 'QuestionUnique', hidden: true },
							]
						});
					 
					 $("#jqxlistbox").on('rowclick', function (event) {
							var args = event.args;
							// row's bound index.
							var boundIndex = args.rowindex;
							// row's visible index.
							var visibleIndex = args.visibleindex;
							// right click.
							var rightclick = args.rightclick; 
							// original event.
							var ev = args.originalEvent;   
							
							var qty = 0;
							var newqty = 0;
							qty = TempAddItemList[boundIndex]['Quantity'];
							newqty = (qty-1);
							if(newqty >= 1){
								TempItemListRef[(boundIndex+1)]['Quantity'] = (qty-1);
								TempAddItemList[boundIndex]['Quantity'] = (qty-1);
							}else if(newqty == 0){
								console.log('removed');
								TempItemListRef.splice((boundIndex+1), 1);
								TempAddItemList.splice(boundIndex, 1);
							}
							
							var row = $(this).jqxGrid('getrowdata', boundIndex);
							var QUnique = row.QuestionUnique;
							var newcount = 0;
							for(var i = 0; i < CatArray.length; i++){
								if(CatArray[i].QuestionUnique == QUnique){//Compare Question Unique from Array to Listbox
									var ActQty = CatArray[i].Count; //Get Actual Count from Array
									if(ActQty >= 1){ //If Actual Qty is greater than or equal to 1
										CatArray[i].Count = (ActQty - 1); //Subtract Count to Actual Qty
										if(CatArray[i].Max != 0){
											var calculation = (CatArray[i].Min - CatArray[i].Count);
											if(calculation > 0){
												$("."+CatArray[i].QuestionUnique).text("Remain "+ (CatArray[i].Min - CatArray[i].Count));
											}else{
												$("."+CatArray[i].QuestionUnique).text("Remain "+ 0);
											}

											var calculation2 = 	(CatArray[i].Max - CatArray[i].Count);
											if(calculation2 > 0){
												$(".Cur"+CatArray[i].QuestionUnique).text("Current "+ (CatArray[i].Max - CatArray[i].Count));
											}else{
												$(".Cur"+CatArray[i].QuestionUnique).text("Current "+ 0);
											}
										}

									}else{
										CatArray[i].Count = 0; //Else set Count to 0
										$("."+CatArray[i].QuestionUnique).text("Remain "+ CatArray[i].Min);
									}	
								}
							}
							
							$("#AddingItems").val(JSON.stringify(TempItemListRef));	
							SubMenuItemSource = {
								localdata: TempAddItemList
							}
							dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);	
							$("#jqxlistbox").jqxGrid({
								source: dataAdapterSubMenu
							});
					});
					WindowPopupSubMenu(Title, 'item_sub_menu_form');
				 })
			 })
		}

		
		$(document).on("click", "#SubMenuQuantity", function(e){
			e.preventDefault();
			NumpadQuantity('submenu_quantity')
			.then(function(){
				WindowPopupQuantity()
				.then(function(){
					$("#quantity_field").val(0);
					$("#quantity_field").focus();
					setTimeout(function(){
						$("#quantity_field").select();
					},100);
				})
			})
		})

		var QtyBuffer = Array({"Quantity": 0});
		$(document).on('submit', "#submenu_quantity", function(e){
			e.preventDefault();
			QtyBuffer = [];
			QtyBuffer.push({"Quantity": $("#quantity_field").val()});
			$("#quantity_numpad").html('');
			$("#dialog-numpad-quantity").jqxWindow('close');
			alert(JSON.stringify(QtyBuffer));
		})
		
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

		var findWithAttr = function(array, attr, value) {
			for(var i = 0; i < array.length; i += 1) {
				if(array[i][attr] === value) {
					return i;
				}
			}
			return -1;
		}

		var MasterReferenceArray = [];
		var TempItemListRef = [];
		$(document).on('click', '#QuestionView button', function(){
			var MethodUnique 	= $(this).attr('id');
			var Method 			= MethodUnique.split('=')[0];
			var Unique 			= MethodUnique.split('=')[1];
			var Desc   			= MethodUnique.split('=')[2];
			var Price  			= MethodUnique.split('=')[3];
			var PromptP			= MethodUnique.split('=')[4];
			var PromptD			= MethodUnique.split('=')[5];
			var Min	   			= MethodUnique.split('=')[6];
			var Max	   			= MethodUnique.split('=')[7];
			var CatUnique		= MethodUnique.split('=')[8];
			var ItemCounted		= MethodUnique.split('=')[9];
			
			if(Method == 'QuestionCat'){
    			$(this).toggleClass('btnitems_question');
			}else if(Method == 'SubQuestionCat'){
				for(var i = 0; i < CatArray.length; i++){
					if(CatArray[i].QuestionUnique == CatUnique){
						var SelCount = CatArray[i].Count;
						var inputQty = QtyBuffer[0].Quantity; //Input Quantity
						var setQty = 0;
						var Remaining = 0;
						var MaxCompute = 0;
						if(inputQty > 0){
							setQty = (inputQty - Max); // Input Quantity - Max = useQty
							if(setQty > 0){ //If Greater than setQty then use Max value.
								CatArray[i].Count = (Max);
							}else if(setQty <= 0){ // If 0 or less than setQty then use inputQty
								CatArray[i].Count = (inputQty);
							}
						}else{ // If InputQty = 0 then use SelCount
							CatArray[i].Count = parseInt(SelCount) + 1;
						}
						
						var countdown = Min;
						var xcount = 0;
						
						var curCount = 0;
						if(CatArray[i].Count > Max && CatArray[i].Max != 0){//If Count > Max and Max != 0
							CatArray[i].Count = Max;						//Update Count value to Max value
							$("."+CatUnique).text("Remain "+ 0);			//Reamin set to 0
						}else{
							//This portion is calculating the Remaining Qty, Question required
							if(CatArray[i].Max != 0){//Max from Array != 0
								if(inputQty > 0){//If InputQty greater than to zero
									newcount = (countdown -  CatArray[i].Count); //Min - Count(from array) = newcount
									if(newcount > 0){
										$("."+CatUnique).text("Remain "+ newcount);
									}else if(newcount <= 0){
										$("."+CatUnique).text("Remain "+ 0);
									}

									if(increasecount == 0){
										xcount = 1;
										increasecount.push({"Unique":CatUnique, "Count": xcount})
										$(".Cur"+CatUnique).text("Current " + increasecount);
									}else{
										curCount = increasecount[i]["Count"]; //Get Current Count from array
										$(".Cur"+CatUnique).text("Current "+ parseInt(curCount) + 1);
										increasecount[i]["Count"] = curCount + 1; //Update Count from array
									}

								}else{//inputQty not set or 0
									if(SelCount > 0){ //Greater than 0
										newcount = (countdown -  CatArray[i].Count);
										if(newcount > 0){
											$("."+CatUnique).text("Remain "+ newcount);
										}else{
											$("."+CatUnique).text("Remain "+ 0);
										}

									}else{//Less than zero
										$(".Cur"+CatUnique).text("Current "+ 1);
										increasecount.push({"Unique": CatUnique, "Count":1});
										alert(JSON.stringify(increasecount));
										if(countdown > 0){
											$("."+CatUnique).text("Remain "+ (countdown -1));
										}else{
											$("."+CatUnique).text("Remain "+ 0);
										}
									}
								}
							}
							
							var postdata="ItemUnique="+Unique;
							CheckPrompt_submenu(postdata, Unique, 1)
							.then(function(status){
								if(status == false){
									var Exist = false;
									var qty = 0;
									var AddQty = 0;
									var totalQty = 0;
									var value_use = 0;
									//TotalQuantity in Array
									for(var i = 0; i < TempAddItemList.length; i++){
										totalQty += parseInt(TempAddItemList[i]['Quantity']);
									}
					
									for(var i = 0; i < TempItemListRef.length; i++){
										if(TempItemListRef[i]['Unique'] == Unique){ //Matching Unique from array and to Unique set value
											if(Max > 0){
												if(totalQty != Max){
													if(inputQty > 0){
														qty = TempItemListRef[i]['Quantity']; //Qty from array Quantity
														Remaining = parseInt(Max) - parseInt(totalQty);//Get remaining total ex: 2, Max = 5
														setQty = parseInt(inputQty) + parseInt(qty);
														alert(Remaining);
														if(setQty == Max){
															TempItemListRef[i]['Quantity'] = (setQty);
														}else if(setQty > Max){
															TempItemListRef[i]['Quantity'] = (Max);
														}else if(setQty < Max){
															TempItemListRef[i]['Quantity'] = (setQty);
														}
													}else{
														qty = TempItemListRef[i]['Quantity']; //Qty from array Quantity
														TempItemListRef[i]['Quantity'] = parseInt(qty) + 1;
													}
												}
											}else{
												if(inputQty > 0){
													qty = TempItemListRef[i]['Quantity']; //Qty from array Quantity
													setQty = parseInt(inputQty) + parseInt(qty);
													TempItemListRef[i]['Quantity'] = setQty;
												}else{
													qty = TempItemListRef[i]['Quantity']; //Qty from array Quantity
													TempItemListRef[i]['Quantity'] = parseInt(qty) + 1;
												}
											}
											Exist = true;
										}else{
											if(Max > 0){
												if(totalQty != Max){
													if(inputQty > 0){
														setQty = parseInt(inputQty) + parseInt(totalQty);
														alert(setQty);
														if(setQty == Max){
															value_use = setQty;
														}else if(setQty > Max){
															value_use = Max
														}else if(setQty < Max){
															value_use = setQty
														}
													}else{
														value_use = 1;
													}
												}else{
													Exist = true;
												}
											}else{
												if(inputQty > 0){
													TempItemListRef[i]['Quantity'] = inputQty;
												}else{
													TempItemListRef[i]['Quantity'] = 1;
												}
											}
										}
									}
									
									qty = 0 //reset
									for(var i = 0; i < TempAddItemList.length; i++){
										if(TempAddItemList[i]['Unique'] == Unique){
											if(Max > 0){
												if(totalQty != Max){
													if(inputQty > 0){
														qty = TempAddItemList[i]['Quantity']; //Qty from array Quantity
														Remaining = parseInt(Max) - parseInt(totalQty);//Get remaining total ex: 2, Max = 5
														setQty = parseInt(inputQty) + parseInt(qty);

														if(setQty == Max){
															TempAddItemList[i]['Quantity'] = (setQty);
														}else if(setQty > Max){
															TempAddItemList[i]['Quantity'] = (Max);
														}else if(setQty < Max){
															TempAddItemList[i]['Quantity'] = (setQty);
														}
													}else{
														qty = TempAddItemList[i]['Quantity'];
														TempAddItemList[i]['Quantity'] = parseInt(qty) + 1;
													}
												}
											}else{
												if(inputQty > 0){
													qty = TempAddItemList[i]['Quantity']; //Qty from array Quantity
													setQty = parseInt(inputQty) + parseInt(qty);
													TempAddItemList[i]['Quantity'] = (setQty);
												}else{
													qty = TempAddItemList[i]['Quantity'];
													TempAddItemList[i]['Quantity'] = parseInt(qty) + 1;
												}
											}				
											Exist = true;
										}else{
											if(Max > 0){
												if(totalQty != Max){
													if(inputQty > 0){
														setQty = parseInt(inputQty) + parseInt(totalQty);
														if(setQty == Max){
															value_use = setQty;
														}else if(setQty > Max){
															value_use = Max
														}else if(setQty < Max){
															value_use = setQty
														}
													}else{
														value_use = 1;
													}
												}else{
													Exist = true;
												}
											}else{
												if(inputQty > 0){
													TempAddItemList[i]['Quantity'] = inputQty;
												}else{
													TempAddItemList[i]['Quantity'] = 1;
												}
											}
										}
									}

									if(Exist == false){
										TempAddItemList.push({"Unique": Unique, "Description" : Desc, "Quantity": value_use, "QuestionUnique": CatUnique});
										TempItemListRef.push({"Unique": Unique, "Description" : Desc, "Price": Price, "Quantity": value_use});
									}else{
										//do nothing for now.
									}

									$("#AddingItems").val(JSON.stringify(TempItemListRef));	
									
									SubMenuItemSource = {
										localdata: TempAddItemList
									}
									dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);
									$("#jqxlistbox").jqxGrid({
										source: dataAdapterSubMenu
									});
								
								}
								QtyBuffer = Array({"Quantity": 0});
								
							});
						}
					}	
				}
				
				
				
			}
		})

		$(document).on("submit", "#custom_item_submenu_form", function(e){
			e.preventDefault();
			var ItemUnique = $scope.CustomItemUnique;
			var ItemNote = $("#search_field").val();
			var postdata="ItemUnique="+ItemUnique;
			if(ItemNote == ''){
				
			}else{
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
			}		
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
				//TempAddItemList.push({});
				alert(JSON.stringify(TempAddItem));
			}
			$("#price_numpad").html('');
			$("#dialog-numpad-price").jqxWindow('close');
			$this.toggleClass('btnitems_question_disabled');
		})

		$(document).on('click', '.button_proceed', function(e){
			e.preventDefault();
			var tempholdsave = [];
			var count = 1;
			var array_length = CatArray.length;
			var questions_required = [];
			for(var i = 0; i < CatArray.length; i++){
				if(CatArray[i].Count >= CatArray[i].Min){
					tempholdsave.push(CatArray[i].QuestionUnique);
				}else{
					questions_required.push(CatArray[i].QuestionName);
				}

				if(array_length == count){
					if(tempholdsave.length == CatArray.length){
						SaveSubMenuItems();
					}else{
						var counter = 1;
						var items_req = '';
						var msg = "";
						for(var y = 0; y < questions_required.length; y++){
							items_req += counter+". "+questions_required[y]+"<br/>";
							if(counter > 1){
								msg = "Please complete and select the Item(s) from Questions:"+"<br/><br/>";
							}else{
								msg = "Please complete and select the Item(s) from Question:"+"<br/><br/>";
							}
							counter++;
						}

						msg+= items_req;
						NumpadAlertClose ('menu_incomplete_items', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}
				}
				count++;
			}
		})

		var SaveSubMenuItems = function(){
			var postdata="SelectedItems="+encodeURIComponent(JSON.stringify(TempItemListRef));
			posData.SaveSelectedItemsList(postdata)
			.success(function(data){
				if(data.success == true){
					TempAddItem = [];
					TempAddItemCompare = [];
					TempItemReference = [];
					TempAddItemList = [];
					TempItemListRef = [];
					CatArray = [];
					QtyBuffer = Array({"Quantity": 0});
					SubMenuItemSource = {
						localdata: []
					}
					dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);
					$("#jqxlistbox").jqxGrid({
						source: dataAdapterSubMenu
					});
					$("#AddingItems").val(JSON.stringify(TempItemListRef));
					$("#QuestionView").html('');
					$("#price_numpad").html('');
					$("#barcode_search").attr("disabled", false);
					$("#barcode_search").focus();
					$("#dialog-numpad-sub-menu").jqxWindow('close');
				}
			}).then(function(){
				GetCustomerSave();
				LoadOrderedItemList();
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
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					});
				});
				Qquestion = 0;
			})
		}

		
		$(document).on('click', '.button_q_cancel', function(e){
			e.preventDefault();
			$("#QuestionView").html('');
			$("#price_numpad").html('');
			$("#custom_item_keyboard").html('');
			$("#dialog-numpad-sub-menu").jqxWindow('close');
			$("#barcode_search").attr("disabled", false);
			$("#barcode_search").focus();
			Qquestion = 0;
			TempAddItem = [];
			TempAddItemCompare = [];
			TempAddItemList = [];
			TempItemListRef = [];
			CatArray = [];
			QtyBuffer = Array({"Quantity": 0});
			SubMenuItemSource = {
				localdata: []
			}
			dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);
		})

		$(document).on('click', '#ClearAllItem', function(e){
			e.preventDefault();
			TempAddItem = [];
			TempAddItemCompare = [];
			TempAddItemList = [];
			TempItemListRef = [];
			SubMenuItemSource = {
				localdata: []
			}
			for(i = 0; i < CatArray.length; i++){
				CatArray[i].Count = 0;
				$("."+CatArray[i].QuestionUnique).text("Remain "+CatArray[i].Min);
				$(".Cur"+CatArray[i].QuestionUnique).text("Current "+CatArray[i].Max);
			}
			dataAdapterSubMenu = new $.jqx.dataAdapter(SubMenuItemSource);
			$("#jqxlistbox").jqxGrid({
				source: dataAdapterSubMenu
			});
			TempItemListRef.push(ItemHoldArray[0]);
			$("#AddingItems").val(JSON.stringify(ItemHoldArray));
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
					'<input type="text" class="hdfield" id="number_field" maxlength="3" style="color:#000">'+
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
				  layout: "numbers_only",
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
							$window.location = base_url + "pos/pointofsale"
						});
					}else{
						$("#dialog-numpad-table").jqxWindow('close');
						var msg = "Table "+tableno+" is not available.";
						NumpadAlertOk('tabler_order_not_valid_form', msg)
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
		
		/*HDCheck*/
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
			posData.EnterPassCodeCashier(postdata)
			.success(function(data){
				if(data.success == true){
					$("#dialog-numpad-passcode").jqxWindow("close");
					LoadHeaderInfo();
				}else{
					$("#dialog-numpad-passcode").jqxWindow("close");
					var msg = "Invalid Password";
					NumpadAlertOk('cashier_change_error_form', msg)
					.then(function(){
						WindowPopupAlert('Invalid Passcode');
					})
				}
			});
			$("#passcode_numpad").html('');
		})
		
		var WindowPopupTableOrder = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-table-order").jqxWindow({
					height: '100%',
					width: 600,
					title: "Table Order",
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true
				});
				$('#dialog-numpad-table-order').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		$scope.POSDineIn = function(){
			WindowPopupTableOrder();
		}
		
		$scope.TableOrderCancel = function(){
			$('#dialog-numpad-table-order').jqxWindow('close');
		}
		
		var ClearDBCache = function(){
			var def = $.Deferred();
			//posData.ClearDBCache()
			//.success(function(){
			setTimeout(function(){	
				def.resolve();	
			},100);	
			//})	
			return def.promise(); 
		}	
		
		var RefreshAfterTableOrder = function(){
			$window.location = base_url + "pos/pointofsale";
		}
		
		//Table available color blue
		$scope.TableOrder = function(id){
			$('body').block({message: 'Loading...'});
			TableID = id; //Global variable see declaration on the top.
			posData.RecallFirstCheck() //Check receipt details based on receipt header unique and status.
			.success(function(firstdata){
				if(firstdata.success == true){
					posData.RecallSecondCheck() //Check receipt print based on receipt header unique and status.
					.success(function(seconddata){
						if(seconddata.success == true){
							KitchenPrintReceipt("OnHoldPrinterStatus")
							.then(function(){
								OnHoldTableOrder()
								.then(function(){
									TableAssign(id)
									.then(function(){
										RefreshAfterTableOrder()
									})
								})
							})
						}else{
							OnHoldTableOrder()
							.then(function(){
								TableAssign(id)
								.then(function(){
									RefreshAfterTableOrder()
								})
							})
						}
					})
				}else{
					console.log("OnHold table order");
					OnHoldTableOrder()
					.then(function(){
						TableAssign(id)
						.then(function(){
							RefreshAfterTableOrder()
						})
					})
				}
				$('#dialog-numpad-table-order').jqxWindow('close');
			})
		}
		//Table available then assign to Receipt
		var TableAssign = function(id){
			var def = $.Deferred();
			$scope.TableNo = id;
			var tabledata="TableNo="+id;
			posData.TableOrderNoInject(tabledata)
			.success(function(injected){
				if(injected.success == true){
					PoleDisplayReset();
				 	GetCustomerSave();
				 	LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals()
					.then(function(){
						POSTotal();
					})
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
					//$('#dialog-numpad-table-order').jqxWindow('close');
					$('body').unblock();
				}
				def.resolve();
			})
			return def.promise();
		}
		
		var TableReceiptOpen = function(unique){
			var postData="receiptunique="+unique;
			posData.OpenReceiptTable(postData)
			.success(function(data){
				if(data.success == true){
					PoleDisplayReset();
					GetCustomerSave();
					LoadHeaderInfo();
					LoadOrderedItemList();
					LoadTotals()
					.then(function(){
						POSTotal();
					})
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
					$('#dialog-numpad-table-order').jqxWindow('close');
				}
			})
		}
		
		//Table in used color red
		$scope.TableOpen = function(id, unique, type){
			 posData.RecallFirstCheck()
			 .success(function(firstdata){ //Check receipt details based on receipt header unique and status.
				if(firstdata.success == true){
					posData.RecallSecondCheck()
					.success(function(seconddata){ //Check receipt print based on receipt header unique and status.
						if(seconddata.success == true){
							KitchenPrintReceipt("OnHoldPrinterStatus")
							.then(function(){
								OnHoldTableOrder()
								.then(function(){
									TableReceiptOpen(unique);
								})
							})
						}else{
							OnHoldTableOrder()
							.then(function(){
								TableReceiptOpen(unique);
							})
						}
					})
				}else{
					if(firstdata.table){
						var msg = "Table "+firstdata.table+" is empty, please add item first or choose available table or click New Sale instead.";
						NumpadAlertOk('table_empty_alert', msg)
						.then(function(){
							WindowPopupAlert('Open Table');
						})
					}else{
						OnHoldTableOrder()
						.then(function(){
							TableReceiptOpen(unique);
						})
					}
				}
			 })
		}
		
		var OnHoldTableOrder = function(){
			var def = new $.Deferred();
			setTimeout(function(){
				 posData.OnHold()
				 .success(function(data){
					if(data.success == true){
						PoleDisplayReset();
						LoadHeaderInfo();
						LoadOrderedItemList();
						LoadTotals()
						.then(function(){
							POSTotal();
						})
						LoadTax();
						LoadEBT();
						LoadDiscount();
						ReceiptTaxChecker();
						OnHoldClicked();
						GlobalCustomer = null;
						$scope.customer = {
							selected: 'Guest',
							id:''
						}
					}
					 def.resolve();
				 });
			 },100); 
			return def.promise();
		}
		
		$scope.SplitCheck = function(){
			posData.CheckItemAddedOnList()
			.success(function(data){
				if(data.success == true){
					posData.QuickAddSale()
					.then(function(data){
						$window.location = base_url + "pos/pointofsale/split-check";
					})
				}else if(data.success == false){
					var msg = "Please add Item(s) first";
					NumpadAlertOk('no_item_added_yet', msg)
					.then(function(){
						WindowPopupAlert("Split Check Alert");
					})
				}
			});
		}
		
		$scope.TwentyPercentDiscount = function(discount){
			var DiscountAmount = discount;
			var postDataReceiptDiscount="optiondiscount="+1;
			postDataReceiptDiscount+="&discountamount="+DiscountAmount;
			posData.ReceiptDiscount(postDataReceiptDiscount)
			.success(function(data){
				if(data.success == true){
					PoleDisplayTotal();
					LoadOrderedItemList();
					LoadTotals()
					.then(function(){
						POSTotal();
					})
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
		}
		
		
		$(document).on('click', '.btn-sel-amount-gc', function(e){
			e.preventDefault();
			var gc_amount = $(this).text();
			var gc_amount_decimal = parseFloat(gc_amount).toFixed(2);
			$("#gift_card_amount").text(gc_amount_decimal);
			setTimeout(function(){
				$("#gift_card_number").focus();
			},100);
		})
		
		$(document).on('click', '#gift_card_manual_enter_amount', function(e){
			e.preventDefault();
			NumpadPriceGC('gift_card_manual_amount')
			.then(function(){
				WindowPopupPriceGC('Gift Card')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		})
		
		$(document).on("submit", "#gift_card_manual_amount", function(e){
			e.preventDefault();
			var manual_amount = $("#number_field").val();
			/*
			if(manual_amount > 0){
				$("#gift_card_amount").text(parseFloat(manual_amount).toFixed(2));
				setTimeout(function(){
					$("#gift_card_number").focus();
				},100);
			}else{
				var msg = "Gift Card Amount Must Be Greater Than 0";
				NumpadAlertOk('gift_card_amount_zero', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})
			}
			*/
			if(manual_amount == ''){
				manual_amount = 0.00;
			}
			$("#gift_card_amount").text(parseFloat(manual_amount).toFixed(2));
			setTimeout(function(){
				$("#gift_card_number").focus();
			},100);
			
			$("#dialog-numpad-gift-price").jqxWindow('close');
		})
		
		$(document).on('click', '.manual-giftcard', function(e){
			e.preventDefault();
			NumpadGiftCard('gift_card_manual_card')
			.then(function(){
				WindowPopupGiftCard('Gift Card')
				.then(function(){
					$("#card_field").val('');
					$("#card_field").focus();
					setTimeout(function(){
						$("#card_field").select();
					},100);
				})
			})
		})
		
		
		$(document).on('input','#gift_card_number', function() {
			//ParseParserObj();
		})
		
	 	$(document).on('submit', '#gift_card_manual_card', function(e){
			e.preventDefault();
			$("#gift_card_number").val('');
			var manual_card = $("#card_field").val();
			var p = new SwipeParserObj( manual_card );
			if( p.hasTrack1 ){
			  	p.account_name;
			 	p.surname;
			  	p.firstname;
			  	p.account;
			  	p.exp_month + "/" + p.exp_year;
				
				var convert_card = cc_format(p.account);
				var cardtype = GetCardType(p.account);
				$("#gift_card_number").val(convert_card);
				setTimeout(function(){
					$("#gift_card_number").focus();
				},100);
			}else{
				$("#gift_card_number").val(manual_card);
				ParseParserObj();
				setTimeout(function(){
					$("#gift_card_number").focus();
				},100);
			}
			
			$("#dialog-numpad-gift-card").jqxWindow('close');
		})
		
		var ValidateGiftCardNumber = function(cardno){
			var def = $.Deferred();
			var postdata = "GiftCard="+cardno;
			posData.ValidateGiftCard(postdata)
			.success(function(data){
				def.resolve(data.success);
			})
			return def.promise();
		}
		
		
		$(document).on('submit', '#sell_gift_card', function(e){
			e.preventDefault();
			var GiftCardItemUnique 	= $("#gift_card_item_unique").val();
			var GiftCardAmount 		= $("#gift_card_amount").text();
			var GiftCard			= $("#gift_card_number").val();	
			var ItemUnique 			= $("#gift_card_field").val();		
			var GiftCardBal			= $("#gift_card_balance").text();
			var ConvertGCBal		= GiftCardBal.replace("Balance ", '');
			var NewBalance 			= parseFloat(ConvertGCBal) + parseFloat(GiftCardAmount); //Output should be greater than or equal to 0;
			
			if(GiftCardAmount == 0){
				var msg = "Gift Card Amount Cannot Be 0";
				NumpadAlertOk('gift_card_amount_zero', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})
			}else{
				if($("#gift_card_number").val() == '' || $("#gift_card_number").val() == null){
					var msg = "Please swipe or type Gift Card Number";
					NumpadAlertClose('gift_card_number_required', msg)
					.then(function(){
						WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
					})
				}else{
					ValidateGiftCardNumber(GiftCard)
					.then(function(GCresponse){
						if(GCresponse == true){ //Validate Gift Card
							if(NewBalance >= 0){
								var postdata="ItemUnique="+ItemUnique;
									postdata+="&Amount="+GiftCardAmount;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&CustomerUnique="+GlobalCustomer;
								posData.AddItemGiftCard(postdata)
								.success(function(data){
									if(data.success == true){
										$scope.desc = data;
										$("#receiptn").text(data.ReceiptNumber);
										LoadOrderedItemList();
										LoadTax();
										LoadEBT();
										LoadDiscount();
										LoadPayments();
										LoadChange();
										ReceiptTaxChecker();
										CheckReceiptStatus();
										GetCustomerSave();
										$scope.BtnPaymentWhen = false;
										$('#dialog-gift-card').jqxWindow("close");
										LoadTotals()
										.then(function(){
											POSTotal()
											.then(function(){
												PoleDisplay(data.ReceiptDetailsUnique);
											});
										});
									}else{
										var msg = "Gift Card is already issued, do you want to add "+GiftCardAmount+" amount to this Gift Card?";
										NumpadAlertYesNo('gift_card_reload', msg)
										.then(function(){
												WindowPopupAlert ('Gift Card')	
										})
									}
								});
							}else{
								var msg = "Gift Card Return Amount Cannot Bring Balance Below 0.";
								NumpadAlertOk('gift_card_amount_zero', msg)
								.then(function(){
									WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
								})
							}
						}else{
							if(GiftCardAmount > 0){
								var postdata="ItemUnique="+ItemUnique;
									postdata+="&Amount="+GiftCardAmount;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&CustomerUnique="+GlobalCustomer;
								posData.AddItemGiftCard(postdata)
								.success(function(data){
									if(data.success == true){
										$scope.desc = data;
										$("#receiptn").text(data.ReceiptNumber);
										PoleDisplay(data.ReceiptDetailsUnique);
										LoadOrderedItemList();
										LoadTotals()
										.then(function(){
											POSTotal();
										})
										LoadTax();
										LoadEBT();
										LoadDiscount();
										LoadPayments();
										LoadChange();
										ReceiptTaxChecker();
										CheckReceiptStatus();
										GetCustomerSave();
										$scope.BtnPaymentWhen = false;
										$('#dialog-gift-card').jqxWindow("close");
									}else{
										var msg = "Gift Card is already issued, do you want to add "+GiftCardAmount+" amount to this Gift Card?";
										NumpadAlertYesNo('gift_card_reload', msg)
										.then(function(){
											WindowPopupAlert ('Gift Card')	
										})
									}
								});
							}else if(GiftCardAmount < 0){
								var postdata ="&Amount="+GiftCardAmount;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&ReceiptPaymentUnique=null";
									postdata+="&process=4";
								posData.PaymentGiftCard(postdata)
								.success(function(data){
									var msg = "Unable to refund, Invalid Gift Card";
									NumpadAlertOk('gift_card_amount_zero', msg)
									.then(function(){
										WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
									})
								});
							}
						}//GCResponse
					})
				}	
			}
		})
		
		$(document).on('click', '#swipe_card', function(e){
			e.preventDefault();
			$("#gift_card_number").val('');
			setTimeout(function(){
				$("#gift_card_number").focus();
			},100);
		})
		
		$(document).on('submit', '#gift_card_reload', function(e){
			e.preventDefault();
			$("#dialog-numpad-alert").jqxWindow("close");
			var postdata = "GiftCard="+$("#gift_card_number").val();
				postdata+= "&Amount="+$("#gift_card_amount").text();
				postdata+= "&CustomerUnique="+GlobalCustomer;
				postdata+= "&ItemUnique="+$("#gift_card_field").val();	
			posData.GiftCardReload(postdata)
			.success(function(data){
				$scope.desc = data;
				$("#receiptn").text(data.ReceiptNumber);
				LoadOrderedItemList();
				LoadTax();
				LoadEBT();
				LoadDiscount();
				LoadPayments();
				LoadChange();
				ReceiptTaxChecker();
				CheckReceiptStatus();
				GetCustomerSave();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplay(data.ReceiptDetailsUnique);
					})
				})
				$scope.BtnPaymentWhen = false;
				$('#dialog-gift-card').jqxWindow("close");
			})	
		})
		
		$(document).on('click', '#gift_card_invalid', function(){
			$("#gift_card_balance").text("Please swipe the Gift Card.");
		})
		
		ItemsCategoryView();
		
		$scope.PaymentView = function(){
			PoleDisplayTotal();
			PaymentView();
		}
		
		$scope.BackToItemCategory = function(){
			ItemsCategoryView();
		} 
		
		$(document).on('submit', '#add_item_without_stock', function(e){
			e.preventDefault();
			var ItemUnique = $("#use_value").val();
			var question = $("#use_value2").val();
			var postDataAddItem="ItemId="+ItemUnique
				var postdata="ItemUnique="+ItemUnique;
				CheckPrompt(postdata, ItemUnique, 1)
				.then(function(){
					if(question == 1){
						Question('', true, '', ItemUnique);	
					}else{
						posData.AddItem(postDataAddItem)
						.success(function(data){
							$scope.desc = data;
							$("#receiptn").text(data.ReceiptNumber);
							$scope.ItemSearch = '';
							GetCustomerSave();
							LoadOrderedItemList();
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
							$scope.ItemSearch = null;
							LoadTotals()
							.then(function(){
								POSTotal()
								.then(function(){
									PoleDisplay(data.ReceiptDetailsUnique);
								});
							});
						});
						$("#barcode_search").attr("disabled", false);
						$("#barcode_search").focus();
					}
				})
				$("#dialog-numpad-alert").jqxWindow('close');
		})
		
		
		/*From Payment Page*/
		$scope.TipDollar = function(){
			NumpadPrice('TipDollar')
			.then(function(){
				WindowPopupPrice('Tip Dollar')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		}
		
		$(document).on('submit', '#TipDollar', function(e){
			e.preventDefault();
			var tipdollar = $("#number_field").val();
			var postdata ="tipamount="+tipdollar;
				postdata+="&tiptype=1";
			posData.Tips(postdata)
			.success(function(data){
				if(data.success == true){
					LoadTotals();
					POSTotal();
					LoadPayments();
					LoadChange();
					CheckReceiptStatus();
					DisplayAllPayments();
				}
			}).then(function(){
				$("#dialog-numpad-price").jqxWindow('close');
			})
		})
		
		$scope.TipPercent = function(){
			NumpadPrice('TipPercent')
			.then(function(){
				WindowPopupPrice('Tip Percent')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		}
		
		$(document).on('submit', '#TipPercent', function(e){
			e.preventDefault();
			var tippercent = $("#number_field").val();
			var postdata ="tipamount="+tippercent;
				postdata+="&tiptype=2";
			posData.Tips(postdata)
			.success(function(data){
				if(data.success == true){
					LoadTotals();
					POSTotal();
					LoadPayments();
					LoadChange();
					CheckReceiptStatus();
					DisplayAllPayments();
				}
			}).then(function(){
				$("#dialog-numpad-price").jqxWindow('close');
			})
		})
		
		$scope.AdjustTip = function(){
			NumpadPrice('AdjustTip')
			.then(function(){
				WindowPopupPrice('Adjust Tip')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		}
		
		$(document).on('submit', '#AdjustTip', function(e){
			e.preventDefault();
			var integrated = $scope.list_integrated;
			$('#payment-list-container').block({message: 'Adjusting Tip please wait...'});
			var tipdollar = $("#number_field").val();
			var PaymentUnique = $scope.paymentid;
			var postdata="tipamount="+tipdollar;
				postdata+="&receipt_payment_unique="+PaymentUnique;
			$("#dialog-numpad-price").jqxWindow('close');	
			if(integrated == 0){
				posData.AdjustTip(postdata)
				.success(function(data){
					$('body').unblock();
					if(data.success == true){
						LoadPayments();
						LoadChange();
						CheckReceiptStatus();
						DisplayAllPayments();
						LoadTotals()
						.then(function(){
							POSTotal()
							.then(function(){
								PoleDisplayReset();
							})
						})
						var msg = 'Tip Adjusted';
						NumpadAlertOk('adjust_tip', msg)
						.then(function(){
							WindowPopupAlert('Adjust Tip');
						})
					}
				})
			}else if(integrated == 1){
				//No integrated 1 yet.
			}else if(integrated == 2){
				posData.AdjustTips(postdata)
				.success(function(data){
					$('#payment-list-container').unblock();
					if(data.success == true){
						LoadPayments();
						LoadChange();
						CheckReceiptStatus();
						DisplayAllPayments();
						
						LoadTotals()
						.then(function(){
							POSTotal()
							.then(function(){
								PoleDisplayReset();
							});
						});
						var msg = data.TextResponse;
						NumpadAlertOk('adjust_tip', msg)
						.then(function(){
							WindowPopupAlert('Adjust Tip');
						})
					}
				})
			}
		})
		
		$scope.EBTBalance = function(){
			WindowPopupBalanceInquiry();
		}
		
		$scope.EBTBalanceBtn = function(Unique, Name, TranType, InvokeControl, MerchantID, SecureDevice, Comport, ReceiptPrint, AcctNo, CardType){
			$('body').block({message: 'Processing please wait...'});
			var postdata = "TranType="+TranType;
				postdata+= "&InvokeControl="+InvokeControl;
				postdata+= "&MerchantID="+MerchantID;
				postdata+= "&AcctNo="+AcctNo;
				postdata+= "&SecureDevice="+SecureDevice;
				postdata+= "&ComPort="+Comport;
				postdata+= "&ReceiptPrint="+ReceiptPrint;
				postdata+= "&CardType="+CardType;
				
			
			posData.EBTBalance(postdata)
			.success(function(data){
				if(data.success == true){
					var msg = data.Status+"<br/>";
						msg+= data.CardType+"<br/>";
						msg+= data.AcctNo+"<br/>";
						msg+= data.Balance;
					NumpadAlertClose('ebt_balance_close', msg)
					.then(function(){
						WindowPopupAlert("EBT Balance")
						.then(function(){
							$(".alert_close").focus();
						})
					})
				}else{
					var msg = JSON.stringify(data.result);
					NumpadAlertClose('ebt_balance_error', msg)
					.then(function(){
						WindowPopupAlert("Alert")
						.then(function(){
							$(".alert_close").focus();
						})
					})
				}
				$('body').unblock();
			})
			$("#diloag-balance-inquiry").jqxWindow('close');	
		}
		
		var WindowPopupCashierList = function(){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-cashier-list").jqxWindow({
					height: 180,
					width: 210,
					title: "Change Sales Person",
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true
				});
				$('#dialog-cashier-list').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		$scope.CashierList = function(){
			var SelectedItem = GlobalItemUnique.Unique;
			if(SelectedItem){
				WindowPopupCashierList();
				var postdata = "ReceiptDetailsUnique="+SelectedItem;
				posData.GetCurrentSalesPerson(postdata)
				.success(function(data){
					$("#current_sales_person").text(data.SalesPerson);
				})
			}else{
				var msg = 'Please select Item first';
				NumpadAlertClose('no_item_selected', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
					.then(function(){
						$(".alert_close").focus();
					})
				})
			}
		}
		
		$scope.SelectUser = function(){
			var CashierID = $("#cashier_list").val();
			
			if(CashierID == 0){
				var msg = 'Select Sale Person';
				NumpadAlertClose('sale_person_error', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
					.then(function(){
						$(".alert_close").focus();
					})
				})
			}else{
				var postdata = "CashierID="+CashierID;
					postdata += "&ReceiptDetailsUnique="+GlobalItemUnique.Unique;
				posData.SelectUser(postdata)
				.success(function(data){
					if(data.success == true){
						$('#dialog-cashier-list').jqxWindow('close');
						$("#cashier_list").val(0);
					}
				})
			}
		}
		
		$scope.CancelSelectUser = function(){
			$('#dialog-cashier-list').jqxWindow('close');
			$("#cashier_list").val(0);
		}
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
