var GlobalCustomerArray = [];
var CustomerProfileArray = [];
angular.expandAkamaiposController = function($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile, $payments, $rootScope){
  	//-->Global Variable
	var GlobalItemUnique = {};
  	var svc = {};
  	var DiscountVal = {};
  	var numbers;
  	var GlobalCustomer = null;
  	var SelZipcode, SelCity, SelState, SelIsland, SelCountry = "";
	var dataAdapter;
	var GridTheme = $("#GridTheme").val(); 
	var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
	
	$("#amountdue_total").jqxNumberInput({enableMouseWheel: false, spinButtons: true});
	
	
	var TableEnabled = $("#TableOrder").val();  
	var POSPaymentNumpad = $("#POSPaymentNumpad").val();
	if(POSPaymentNumpad == 1 || POSPaymentNumpad == 2){
		$("#amount_payment").maskMoney('mask','0.00');
	}else{
		$("#amount_payment").jqxNumberInput({enableMouseWheel: false});
	}


	if($("#TableOrder").val() == 1){
		if($("#PoleDisplay").val() == 2){
			if(ConnectionPoleDisplay){
				var tableconn = new WebSocket(table_synchronize);
				tableconn.onopen = function(e) {}
			}
		}
	}  

  	$scope.payment = 0;
  	$scope.amount = 0;
  	$scope.totalchange = 0;
  	$scope.amountdue = 0;

  	var Quedialog;
  	var Alertdialog;
  	var dialog;
  	var AlertProcessdialog;
  	var dialogpaymentcreditcard;
  	var PasscodeDialog;
  	var dialogCardProcessResponse;
  	var NewSaleQuedialog;
  	var CreditCardProcessdialog;
  	var dialogTipDollarForm;
  	var dialogTipPercentForm;	
  	var dialogAdjustTipForm;
  	var KeyPadDialog;
  	var KeyPadPasswordDialog;
	var PrintReceiptBySignatureAmount = false;
  
  	$scope.BtnApplyPaymentWhen = true;
	
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

  	$scope.drawer = {
    	passcode: ''
  	};
	
	var WindowPopupShowDuration = $("#WindowPopupShowDuration").val();
	var WindowPopupCloseDuration= $("#WindowPopupCloseDuration").val();

  	var ParseParserObj = function(){
		var p = new SwipeParserObj( document.getElementById('cardinfo').value );
		if( p.hasTrack1 ){
		  p.account_name;
		  p.surname;
		  p.firstname;
		  p.account;
		  p.exp_month + "/" + p.exp_year;
		}
		var convert_card = cc_format(p.account);
		var cardtype = GetCardType(p.account);
		$scope.creditCard = {
		   number: convert_card,
		   holder: p.account_name,
		   expirydate: p.exp_month +"/"+ p.exp_year,
		   type: cardtype
		};
	
		cardvalidate(p.account,"");
		document.getElementById('security_code').focus();
  	};

  	var cardvalidate  = function(newValue, oldValue) {
        var card, length, upperLength, ccVerified;
        upperLength = 16;
        ccVerified = false;
        if(newValue) {
            card = $payments.cardFromNumber(newValue);
            if(card && card.type) { $scope.creditCard.type = card.type; }
            if (card) {
                upperLength = card.length[card.length.length - 1];
            }
            length = newValue.replace(/\D/g, '').length;
            if(length == upperLength) {
                ccVerified = $scope.creditCard.valid = $payments.luhnCheck(newValue.replace(/\D/g, ''));
            }
            if(ccVerified && length != upperLength) {
                ccVerified = $scope.creditCard.valid = false;
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

  	var  GetCardType = function(number) {
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


	$scope.ParseCardInfo4 = function(){
		var CreditCardInfo = $(".cardinfos2").val();
		ParseParserObj4();
	};

	var ParseParserObj4 = function(){
		if($("#card_field").val() != ''){
			var p = new SwipeParserObj( document.getElementById('card_field').value );
			if( p.hasTrack1 ){
				p.account_name;
				p.surname;
				p.firstname;
				p.account;
				p.exp_month + "/" + p.exp_year;
				
				var convert_card = p.account;
				var cardtype = GetCardType(p.account);
				$("#card_field").val(convert_card);
				$("#"+FormName).submit();
			}else if(p.hasTrack2){	
				p.account_name;
				p.surname;
				p.firstname;
				p.account;
				p.exp_month + "/" + p.exp_year;
				
				var convert_card = p.account;
				var cardtype = GetCardType(p.account);
				$("#card_field").val(convert_card);
				$("#"+FormName).submit();
			}else{
				var giftcard = document.getElementById('card_field').value;
				$("#card_field").val(giftcard);
				$("#"+FormName).submit();
			}
		}else{
			var msg = "Please swipe or type Gift Card Number";
			NumpadAlertClose ('gift_card_number_required', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});	
		}
	}  
  
   	/*Light Plugin Create*/
	/*@Alert*/
	/*
	@param string form_name
	@param string msg
	*/
	var populateNumpadAlert = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
			$("#alert-msg-popup").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#alert-msg-popup").append(html);
			def.resolve();
		},100);
		return def.promise();
	}
	
	var populateNumpadPaymentAlert = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard"></div>'+
						'</form>'
			$("#alert-payment-msg-popup").append(html);
			def.resolve();
		},100);
		return def.promise();
	}
  	/*Window Alert Properties*/
  
  	/*
  	@param string header_text
  	*/
  	/*Popup Alert*/
	var WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#wrapper").width();
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#dialog-numpad-alert").jqxWindow({
				height: 245,
				minWidth: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
	
	/*Popup Payment Alert*/
	var WindowPopupPaymentAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#wrapper").width();
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#dialog-numpad-payment-alert").jqxWindow({
				//height: 245,
				//minWidth: 350,
				height: 285,
				minWidth: 370,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			setTimeout(function(){
				$('#dialog-numpad-payment-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-payment-alert').jqxWindow('open');
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
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
			$('#dialog-numpad-alert').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	/*Numpad Alert Ok Button Only*/
	var NumpadAlertOk = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlert(form, msg)
		.then(function(){
			$('#keyboard').hdkeyboard({
			  layout: "alert_ok"
			});
			def.resolve();
		});
		return def.promise();
	}
	
	var NumpadPaymentAlertOk = function(form, msg){
		var def = $.Deferred();
		populateNumpadPaymentAlert(form, msg)
		.then(function(){
			$('#keyboard').hdkeyboard({
			  layout: "alert_ok"
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on('close', '#pos_dispenser', function(e){
		e.preventDefault();
		$("#pos_dispenser_cointainer").html('');
	})

	var populateNumpadAlertCoinDispenser = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#pos_dispenser").append('<div id="pos_dispenser_cointainer" style="background: #144766; color:#EEE;"></div>');
			$("#pos_dispenser_cointainer").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard_coin_dispenser"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#pos_dispenser_cointainer").append(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var NumpadAlertOkCoinDispenser = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertCoinDispenser(form, msg)
		.then(function(){
			$('#keyboard_coin_dispenser').hdkeyboard({
			  layout: "alert_ok"
			});
			def.resolve();
		});
		return def.promise();
	}


	var WindowPopupAlertCoinDispenser = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#wrapper").width();
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#pos_dispenser").jqxWindow({
				height: 305,
				minWidth: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			setTimeout(function(){
				$('#pos_dispenser').jqxWindow('setTitle', header_text);
				$('#pos_dispenser').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
	
	$(document).on('close', '#pos_poledisplay', function(e){
		e.preventDefault();
		$("#pos_poledisplay_container").html('');
	})

	var populateNumpadAlertPoleDisplay = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#pos_poledisplay").append('<div id="pos_poledisplay_container" style="background: #144766; color:#EEE;"></div>');
			$("#pos_poledisplay_container").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard_pole_display"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#pos_poledisplay_container").append(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var NumpadAlertOkPoleDisplay = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertPoleDisplay(form, msg)
		.then(function(){
			$('#keyboard_pole_display').hdkeyboard({
			  layout: "alert_ok"
			});
			def.resolve();
		});
		return def.promise();
	}

	var WindowPopupAlertPoleDisplay = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#wrapper").width();
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#pos_poledisplay").jqxWindow({
				height: 285,
				minWidth: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			setTimeout(function(){
				$('#pos_poledisplay').jqxWindow('setTitle', header_text);
				$('#pos_poledisplay').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}

	
	/*Alert Setup*/
	/*
	@param string form
	@param string msg
	*/
	var populateNumpadAlertYesNoPayment = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
			$("#alert-msg-popup").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard_alertyesno_payment"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#alert-msg-popup").append(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var NumpadAlertYesNoPayment = function(form, msg, custom){
		var def = $.Deferred();
		populateNumpadAlertYesNoPayment(form, msg, custom)
		.then(function(){
			$('#keyboard_alertyesno_payment').hdkeyboard({
			  layout: "alert_yes_no",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	var populateNumpadAlertYesOnlyPayment = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
			$("#alert-msg-popup").html('');
			$("#alert-msg-popup").append(
				'<form id="'+form_name+'">'+
					'<h4>'+msg+'</h4>'+
					'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
					'<br/>'+
					'<div id="keyboard_alertyesonly_payment"></div>'+
					'<input type="hidden" id="custom_value" value="'+custom+'"/>'+
				'</form>'
			);
			def.resolve();
		},100);
		return def.promise();
	}
	var NumpadAlertYesOnly = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertYesOnlyPayment(form, msg)
		.then(function(){
			$('#keyboard_alertyesonly_payment').hdkeyboard({
				layout: "alert_yes_ok",
				input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	
	var populateNumpadAlertClosePayment = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
			$("#alert-msg-popup").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard_alertclose_payment"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#alert-msg-popup").append(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var NumpadAlertClose = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertClosePayment(form, msg)
		.then(function(){
			$('#keyboard_alertclose_payment').hdkeyboard({
			  layout: "alert_close",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	
	var populateNumpadAlertPrinterProblem = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
			$("#alert-msg-popup").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="printer_assign_button"></div>'+
							'<input type="hidden" id="custom_value" value="'+custom+'"/>'
						'</form>'
			$("#alert-msg-popup").append(html);
			def.resolve();
		},100);
		return def.promise();
	}
	
	
	var NumpadAlertOkPrinterProblem = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertPrinterProblem(form, msg)
		.then(function(){
			$('#printer_assign_button').hdkeyboard({
			  layout: "alert_close",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	//Passcode
	var populateNumpadPasscode = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#passcode_numpad").html('');
			$("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
			$("#passcode_numpad").append(''+
			'<form id="'+form_name+'">'+
				'<input type="password" class="hdfield" id="number_field" style="color:#000">'+
				'<div id="keyboard"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupPasscode = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#dialog-numpad-passcode").jqxWindow({
				height: 450,
				minWidth: 300,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
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
			$('#keyboard').numeric_numpad({
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
	
	var populateNumpadCustom = function(form_name, header){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-custom").append('<div id="numpad_custom" style="background: #144766; color:#EEE;"></div>');
			$("#numpad_custom").html('');
			$("#numpad_custom").append(''+
			'<form id="'+form_name+'">'+
				'<h2 align="center">'+header+'</h2>'+
				'<input type="text" class="hdfield" id="number_field" maxlength="25" style="color:#000">'+
				'<div id="keyboard_custom"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupNumpadCustom = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-custom").jqxWindow({
				height: 440,
				width: 300,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});

			$("#dialog-numpad-custom").jqxWindow('setTitle', header_title);
			$('#dialog-numpad-custom').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadCustom = function(form_name, header){
		var def = $.Deferred();
		populateNumpadCustom(form_name, header)
		.then(function(){
			$('#keyboard_custom').hdkeyboard({
			  layout: "numbers_only",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	
	var populateNumpadNumeric = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-price").append('<div id="price_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#price_numpad").html('');
			$("#price_numpad").append(''+
				'<h4 style="text-align:center;">Enter Value</h4>'+
			'');
			$("#price_numpad").append(
				'<form id="'+form_name+'">'+
					//'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
					'<div id="open_numpad_price" class="hdfield"></div>'+
					'<div id="numpad_open_price_keyboard"></div>'+
				'</form>'
			);
			
			$("#open_numpad_price").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val() });
			$('#open_numpad_price').on('change', function (event) 
			{
				var value = event.args.value;
				var type = event.args.type;
				myNumber = myNumber + ' ' +value;
			}); 

			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupNumpadNumeric = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-price").jqxWindow({
				/*
				height: 440,
				minWidth: 300,
				*/
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-price').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadNumeric = function(form_name){
		var def = $.Deferred();
		populateNumpadNumeric(form_name)
		.then(function(){
			$('#numpad_open_price_keyboard').numeric_numpad({
				  layout: "numeric",
				  input: $('#open_numpad_price')
			});
			def.resolve();
		});
		return def.promise();
	}
	
	$scope.ParseGiftCardInfo = function(){
		var CreditCardInfo = $(".payment_cardinfos").val();
		ParseParserObjGiftCard();
	}
	
	var GiftCardBalance = function(card){
		var def = $.Deferred();
		var postdata="giftcard="+card;
		posData.GetGiftCardBalance(postdata)
		.success(function(data){
			if(data.success == true){
				$("#payment_gift_card_balance").text("Balance "+data.Balance);
				$("#akgcbalance3").val(data.Balance);
				$("#gcbalprint3").show();
			}else if(data.success == false){
				var msg = "Gift Card Number is not valid";
				NumpadAlertOk('gift_card_invalid', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})
				$("#gcbalprint3").hide();
				$("#payment_gift_card_balance").text('Balance 0.00');
				$("#akgcbalance3").val(0.00);
			}
			def.resolve(data.Balance);
		})
		return def.promise();
	}

	function getNumbers(inputString){
		var obj = inputString.split(";");
		var regex=/\d+\.\d+|\.\d+|\d+/g, 
			results = [],
			n;
	
		while(n = regex.exec(obj[1])) {
			results.push(parseFloat(n[0]));
		}
	
		return results;
	}
	
	var ParseParserObjGiftCard = function(){
		var cardVal = document.getElementById('payment_gift_card_number').value;
		var p = new SwipeParserObj( document.getElementById('payment_gift_card_number').value );
		if( p.hasTrack1 ){
			p.account_name;
			p.surname;
			p.firstname;
			p.account;
			p.exp_month + "/" + p.exp_year;
			var account = p.account;
			if(p.account == null){
				var parserCard = getNumbers(cardVal);
				account = parserCard;
				$("#payment_gift_card_number").val(account);
				$("#payment_gift_card_number").text('Processing please wait...');
				GiftCardBalance(account);
			}else{
				var convert_card = cc_format(p.account);
				var cardtype = GetCardType(p.account);
				$("#payment_gift_card_number").val(p.account);
				giftcardvalidate(p.account,"");
				$("#payment_gift_card_balance").text('Processing please wait...');
				GiftCardBalance(p.account);
			}
		}else{
			var giftcard = document.getElementById('payment_gift_card_number').value;
			var parse_giftcard = giftcard.replace(/[?=;]/g, "");
			$("#payment_gift_card_number").val(parse_giftcard);
			$("#payment_gift_card_balance").text('Processing please wait...');
			GiftCardBalance(parse_giftcard);
		}
	}
	
	var giftcardvalidate  = function(newValue, oldValue) {
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
				ccVerified = $("#payment_gift_card_number").val().valid = $payments.luhnCheck(newValue.replace(/\D/g, ''));
			}
			if(ccVerified && length != upperLength) {
				ccVerified = ("#payment_gift_card_number").val().valid = false;
			}
		}
	};
	
	$(document).on('click', '#gift_card_invalid', function(){
		$("#payment_gift_card_balance").text("Please swipe the Gift Card.");
	})
	
	
	var KeyPress = function(e){
		var evtobj = window.event? event : e;
		if (evtobj.keyCode == 66 && evtobj.ctrlKey) $("#barcode_search").focus();
		document.onkeydown = KeyPress;  	
	}

	var populateStoreCredit = function(form_name, Price, Unique, label){
		var def = $.Deferred();
		var CustomerRequired = $scope.customer.id;
		$("#pos_store_credit").append('<div id="pos_store_credit_container" style="background: #144766; color:#EEE; padding:0; margin:0;"></div>');
		$("#pos_store_credit_container").html('');
		var postdata ="Form="+form_name;
			postdata+="&Price="+Price;
			postdata+="&PaymentUnique="+Unique;
			postdata+="&Label="+label;
			postdata+="&CustomerUnique="+CustomerRequired;
		posData.StoreCreditCheck(postdata)
		.success(function(data){
			$("#pos_store_credit_container").append(data.html);
			def.resolve();
		})
		return def.promise();
	}

	/*Gift Card Window popup*/
	var WindowPopupStoreCreditPayment = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth 	= ($(".orderedlist").width() + 3);
			$("#pos_store_credit").jqxWindow({
				height: 565,
				width: 460,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			$('#pos_store_credit').jqxWindow('setTitle', header_text);
			$('#pos_store_credit').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var StoreCreditFormPayment = function(form, Price, PaymentUnique, PaymentName){
		var def = $.Deferred();
		populateStoreCredit(form, Price, PaymentUnique, PaymentName)
		.then(function(){
			$('#sc_keyboard').hdgiftcard({
			  layout: "giftcard_function",
			  input: $("#payment_sc_field")
			});
			def.resolve();
		});
		return def.promise();
	}

	//End Store Credit


	var populateGiftCardFormPayment = function(form_name, Price, PaymentUnique, PaymentName){
		var def = $.Deferred();
		setTimeout(function(){
			$("body").append(
			'<div id="dialog-gift-card-payment" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;"><div class="main_gc_container_payment" style="background: #144766; color:#EEE; padding:0; margin:0;"></div></div>');
			$(".main_gc_container_payment").html('');
			$(".main_gc_container_payment").append($compile(''+
			'<script type="text/javascript">'+
				'function KeyPress(e) {'+
					'var evtobj = window.event? event : e;'+
					'if (evtobj.keyCode == 66 && evtobj.ctrlKey) $("#payment_gift_card_number").focus()'+
				'}'+
				'document.onkeydown = KeyPress;'+
			'</script>'+
			'<form id="'+form_name+'">'+
				'<div class="gc_container" style="float:left;">'+
					'<h3 align="center" style="font-weight:bolder;">Gift Card</h3>'+	
					'<div class="sel_amount">'+
						'<div style="float:left; width:110px;">'+
							'<div style="position:relative; width: 110px; height: 130px;">'+
								'<div style="border: 3px solid #ffffff; position: absolute; width: 95px; height: 90px; left: 10px ;  top:20px;">'+
									'<button style="height:85px; width: 90px; font-weight: bold; font-size: 15px; color: #000;" disabled="disabled">Gift Card<br/>Amount</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div style="float: left; width:340px; padding-bottom:5px;">'+
							'<div style="float:left; width:270px; padding:5px;" align="right"><h5 style="font-weight:bold;">Select Amount</h5></div>'+
							'<div style="float:left; width:125px; padding:5px;"><button type="button" id="gift_card_manual_enter_amount-payment"  class="btn-enter-amount-gc">Enter Amount</button></div>'+
							'<div style="float:left; width:155px; padding-top:20px;" align="right"><span class="gift_card_amt" id="payment_gift_card_amount">'+parseFloat(Price).toFixed(2)+'</span></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'</br>'+
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
						'<input type="text" class="form-control payment_cardinfos" id="payment_gift_card_number" ng-enter="ParseGiftCardInfo()">'+
						'<div style="float:left; width:138px; padding:5px;"><button type="button" class="btn-enter-amount-gc manual-giftcard-payment">Manual Enter</button></div>'+
						'<div style="float:left; font-size: 24px;">OR</div>'+
						'<div style="float:left; width:125px; font-size:24px; color:#000000; padding:5px;"><button type="button" id="swipe_card" class="btn-swipe-gc">Swipe Card</button></div>'+
					'</div>'+
				'</div>'+
				'</br>'+
				'</br>'+
				'<div class="sel_amount" style="float:left;">'+
					'<div style="float:left; width:110px;">'+
						'<div style="position:relative; width: 90px; height: 130px;">'+
							'<div style="border: 3px solid #ffffff; position: absolute; width: 95px; height: 90px; left: 10px ; top:15px;">'+
								'<button type="button" style="height:85px; width: 90px; font-size: 15px; color: #000; font-weight: bold" disabled="disabled">Current<br/>Balance</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div style="float: left; width:320px; padding-top:30px;">'+
						'<div style="float:left; width:320px; padding-top:20px;" align="left"><span class="gift_card_bal" id="payment_gift_card_balance">Please swipe the Gift Card.</span><button class="btn btn-warning btn-lg" id="gcbalprint3" style="display:none;">Print</button></div>'+
					'</div>'+
				'</div>'+
				'<input type="text" id="paymen_gift_card_field" class="hdfield" style="display:none;"/>'+
				// '<div style="float:left; width: 450px;" id="functions_key" align="right"></div>'+
				'<div style="float:left; width: 100%; text-align: center;">'+
					'<button type="submit" class="btn btn-primary btn-lg" id="gc_ok">Ok</button>&nbsp;&nbsp;'+
					'<button type="button" class="btn btn-primary btn-lg" id="gc_cancel">Cancel</button>'+
				'</div>'+
				'<input type="hidden" id="gc_payment_unique" value="'+PaymentUnique+'">'+
				'<input type="hidden" id="gc_payment_name" value="'+PaymentName+'">'+
				'<input type="hidden" id="akgcbalance3" />'+
			'</form>'+
			'')($scope));

			$("#gc_cancel").on('click', function(e){
				e.preventDefault();
				$("#dialog-gift-card-payment").jqxWindow('close');
			})

			$("#dialog-gift-card-payment").on('close', function(event){
				$("#dialog-gift-card-payment").remove();
				KeyPress(event);
			})

			def.resolve();
		},100);
		return def.promise();
	}
		
	/*Gift Card Window popup*/
	var WindowPopupGiftCardFormPayment = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#dialog-gift-card-payment").jqxWindow({
				height: 565,
				width: 460,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }	
			});
			$('#dialog-gift-card-payment').jqxWindow('setTitle', header_text);
			$('#dialog-gift-card-payment').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var GiftCardFormPayment = function(form, Price, PaymentUnique, PaymentName){
		var def = $.Deferred();
		populateGiftCardFormPayment(form, Price, PaymentUnique, PaymentName)
		.then(function(){
			$('#functions_key').hdgiftcard({
			  layout: "giftcard_function",
			  input: $("#paymen_gift_card_field")
			});
			def.resolve();
		});
		return def.promise();
	}
		
	//-->Gift Card Enter Amount Window Popup
	var populateNumpadPriceGCPayment = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-gift-price-payment").append('<div id="price_numpad_gc_payment" style="background: #144766; color:#EEE;"></div>');
			$("#price_numpad_gc_payment").html('');
			$("#price_numpad_gc_payment").append(''+
			'<h4 style="text-align:center;">Enter Amount</h4>');
			$("#price_numpad_gc_payment").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
				'<div id="gc_numpad_amount"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupPriceGCPayment = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-gift-price-payment").jqxWindow({
				height: 490,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-gift-price-payment').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadPriceGCPayment = function(form_name){
		var def = $.Deferred();
		populateNumpadPriceGCPayment(form_name)
		.then(function(){
			$('#gc_numpad_amount').hdkeyboard({
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
				//'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
				'<div id="gc_enter_amount" class="hdfield"></div>'+
				'<div id="gc_sell_keyboard"></div>'+
			'</form>');
			$("#gc_enter_amount").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val()})
			$('#gc_enter_amount').on('change', function (event) {
				var value = event.args.value;
				var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
				myNumber = value;
			}); 
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupPriceGC = function(header_title){
		var def = $.Deferred();
		var OrderListWidth = ($(".orderedlist").width() + 3);
		setTimeout(function(){
			$("#dialog-numpad-gift-price").jqxWindow({
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }	
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
			$('#gc_sell_keyboard').numeric_numpad({
			  layout: "numeric",
			  input: $('#gc_enter_amount')
			});
			def.resolve();
		});
		return def.promise();
	}

	//-->Store Credit Enter Amount Window Popup
	var populateNumpadPriceSCPayment = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#pos_store_credit_numpad").append('<div id="pos_store_credit_numpad_container" style="background: #144766; color:#EEE;"></div>');
			$("#pos_store_credit_numpad_container").html('');
			$("#pos_store_credit_numpad_container").append(''+
			'<h4 style="text-align:center;">Enter Amount</h4>');
			$("#pos_store_credit_numpad_container").append(''+
			'<form id="'+form_name+'">'+
				'<div id="open_numpad_price" class="hdfield"></div>'+
				'<div id="sc_numpad_amount"></div>'+
			'</form>');

			$("#open_numpad_price").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val() });
			$('#open_numpad_price').on('change', function (event) {
				var value = event.args.value;
				var type = event.args.type;
				myNumber = myNumber + ' ' +value;
			}); 
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupPriceSCPayment = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth 	= ($(".orderedlist").width() + 3);
			$("#pos_store_credit_numpad").jqxWindow({
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			$('#pos_store_credit_numpad').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadPriceSCPayment = function(form_name){
		var def = $.Deferred();
		populateNumpadPriceSCPayment(form_name)
		.then(function(){
			$('#sc_numpad_amount').numeric_numpad({
			  layout: "numeric",
			  input: $('#open_numpad_price')
			});
			setTimeout(function(){
				def.resolve();
			},100);
		});
		return def.promise();
	}

	$('#dialog-numpad-gift-card-payment').on('close', function(e){
		e.preventDefault();
		$("#numpad_gc_payment").html('');	
	})

	
	var FormName = '';
	//--> Gift Card Manual Enter Card Window Popup
	var populateNumpadGiftCardPayment = function(form_name){
		var def = $.Deferred();
		FormName = form_name;
		setTimeout(function(){
			$("#dialog-numpad-gift-card-payment").append('<div id="numpad_gc_payment" style="background: #144766; color:#EEE;"></div>');
			$("#numpad_gc_payment").html('');
			$("#numpad_gc_payment").append(''+
			'<h4 style="text-align:center;">Enter Card Number</h4>');
			$("#numpad_gc_payment").append($compile(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="card_field" class="hdfield" ng-enter="ParseCardInfo4()" style="color:#000">'+
				'<div id="keyboard_gc"></div>'+
			'</form>')($scope));
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupGiftCardPayment = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-gift-card-payment").jqxWindow({
				height: 490,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-gift-card-payment').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
		
	var NumpadGiftCardPayment = function(form_name){
		var def = $.Deferred();
		populateNumpadGiftCardPayment(form_name)
		.then(function(){
			$('#keyboard_gc').hdkeyboard({
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


	var populateNumpadCustomerCard = function(form_name, header){
		var def = $.Deferred();
		FormName = form_name;
		setTimeout(function(){
			$("#dialog-numpad-customer-card").append('<div id="numpad_cc_container" style="background: #144766; color:#EEE;"></div>');
			$("#numpad_cc_container").html('');
			$("#numpad_cc_container").append(''+
			'<h4 style="text-align:center;">'+header+'</h4>');
			$("#numpad_cc_container").append($compile(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="customer_card_field" class="hdfield" style="color:#000">'+
				'<div id="keyboard_cc"></div>'+
			'</form>')($scope));
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupCustomerCard = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-customer-card").jqxWindow({
				height: 490,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-customer-card').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
		
	var NumpadCustomerCard = function(form_name, header){
		var def = $.Deferred();
		populateNumpadCustomerCard(form_name, header)
		.then(function(){
			$('#keyboard_cc').hdkeyboard({
			  layout: "numbers_only",
			  input: $('#customer_card_field')
			});
			setTimeout(function(){
				$("#customer_card_field").focus();
				def.resolve();
			},100);
		});
		return def.promise();
	}

	$scope.Signature_type = '';
	$scope.SignatureReceiptPaymentUnique = '';
		
	var populateSignature = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-signature").append('<div id="signature_form" style="background: #144766; color:#EEE;"></div>');
			$("#signature_form").html('');
			$("#signature_form").append('<h4 style="text-align:center;">Signature</h4>');
			$("#signature_form").append(''+
			'<form id="'+form_name+'">'+
				'<div id="signature_view" align="center" style="background-color: #fff;"><img id="signature" /></div>'+
				'<div id="signature_message_view" style="display:none;">'+
					'<h1 id="signature_message">Please Sign on the device</h1>'+
					'<div id="signature_msg_container" style="width: 100%; text-align: center;"></div>'+
				'</div>'+
				'<div id="signpadbutton"></div>'+
				'<input type="hidden" id="signature_receipt_payment_unique" />'+
				'<input type="hidden" id="signature_unique" />'+
				'<input type="hidden" id="signature_status" />'+
				'<input type="hidden" id="signature_amount" />'+
				'<input type="hidden" id="signature_typePayment" />'+
				'<input type="hidden" id="signature_amountdue" />'+
				'<input type="hidden" id="signature_type" />'+
				'<input type="hidden" id="signature_receipt_header_unique" />'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupSignature = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-signature").jqxWindow({
				height: 450,
				minWidth: 300,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-signature').jqxWindow('setTitle', header_title);
			$('#dialog-signature').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadSignature = function(form_name){
		var def = $.Deferred();
		populateSignature(form_name)
		.then(function(){
			$('#signpadbutton').hdsignpad({
			  	layout: "signature_function"
			});
			def.resolve();
		});
		return def.promise();
	}

	//HDOrderType
	var populateOrderType = function(form_name, types){
		var def = $.Deferred();
		setTimeout(function(){
			$("#ordertype-popup").append('<div id="ordertype-popup-container" style="background: #144766; color:#EEE;"></div>');
			$("#ordertype-popup-container").html('');
			$("#ordertype-popup-container").append(types);
			$("#ordertype-popup-container").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="ordertype_input" class="hdfield" style="color:#000; display:none;">'+
				'<div id="keyboard_order_type"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupOrderType = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#ordertype-popup").jqxWindow({
				height: 320,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }	
			});
			$('#ordertype-popup').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
		
	var OrderTypeWindow = function(form_name, types){
		var def = $.Deferred();
		populateOrderType(form_name, types)
		.then(function(){
			$('#keyboard_order_type').hdkeyboard({
			  layout: "alert_yes_ok",
			  input: $('#ordertype_input')
			});
			def.resolve();
		})
		return def.promise();
	}

	/*
	|------------------------------------------------------------------|
	| Process Alert
	|------------------------------------------------------------------|
	*/
	$("#dialog-process").on("close", function(){
		$("#process_container").html('');
	})
	var populateAlertProcess = function(form_name, msg){
		var def = new $.Deferred();
		setTimeout(function(){
			$("#dialog-process").append('<div id="process_container" style="background: #144766; color:#EEE;"></div>')
			$("#process_container").html('');
			$("#process_container").append(''+
				'<form id="'+form_name+'">'+
					'<h4 id="alert-msg">'+msg+'</h4>'+
				'</form>'+
			'');
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupAlertProcess = function(title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-process").jqxWindow({
				height: 245,
				width: 350,
				title: title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
			});
			$('#dialog-process').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var NumpadPromptAlertProcess = function(form, msg){ 
		var def = $.Deferred();
		populateAlertProcess(form, msg)
		.then(function(){
			def.resolve();
		});
		return def.resolve();
	}

	/* Dynamic Plugin Commands */
	$("#dialog-numpad-alert").on('close', function(event){
		//$("#alert-msg-popup").html('');
		$("#alert-msg-popup").html('');

		if($("#confirm_payment_v2").length > 0 ){
			if(POSPaymentNumpad == 1){
				$("#confirm_payment_currency").focus();
			}else{
				if( $("#confirm_payment_currency").length > 0 ){
					$("#confirm_payment_currency").jqxNumberInput('focus');
					$("#confirm_payment_currency").jqxNumberInput('focus');
					var input = $('#confirm_payment_currency input')[0];
					input.setSelectionRange(0, 0);
				}
			}
		}
	})
	
	$("#dialog-numpad-keyboard").on('close', function(event){
		$("#custom_item_keyboard").html('');
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
	})
	
	$("#dialog-numpad-price").on('close', function(event){
		$("#price_numpad").html('');
	})
	
	$("#dialog-numpad-discount").on('close', function(event){
		$("#discount_numpad").html('');
	})
	
	$("#dialog-numpad-gift-price-payment").on('close', function(event){
		$("#price_numpad_gc_payment").html('');
	})
	
	$("#dialog-signature").on('close', function(event){
		$("#signature_form").html('');
	})

	$("#dialog-customer-list").on('close', function(event){
	  	$("#customer-list-container").html('');
   	})

  	$("#dialog-customer-form").on('close', function(event){
	 	$("#customer-form-container").html('');
  	})

	$("#alert-customer-msg-popup").on("close", function(event){
		$("#alert-customer-list-container").html('');
	})

	$("#dialog-customer-edit-form").on('close', function(event){
	 	$("#customer-edit-form-container").html('');
  	})

	$("#check_payment_popup").on('close', function(event){
		$("#check_payment_popup_container").html('');
	})

	$("#dialog-numpad-custom").on('close', function(event){
		$("#numpad_custom").html('');
	})

	$("#dialog-customer-add-card").on('close', function(event){
		event.preventDefault();
		$('#customer-add-card-container').html('');
	})

	$("#dialog-numpad-customer-card").on("close", function(event){
		event.preventDefault();
		$("#numpad_cc_container").html('');
	})
  
  	/* Payment Credit Card Popup 
  	$scope.dialogPaymentCard = {
		created: function(args){
		  dialogpaymentcreditcard = args.instance;
		},
		resizable: false,
		width: '100%', height: 470,
		//position: { left:  1, top: 50 },
		autoOpen: false,
		theme: 'darkblue',
		isModal: true
	  };
	*/

  	/* Payment Credit Card Popup Response*/
  	$scope.dialogCardResponse = {
	  	created: function(args){
		  dialogCardProcessResponse = args.instance;
	  	},
	  	resizable: false,
	  	width: '100%', height: 170,
	  	//position: { left:  1, top: 50 },
	  	autoOpen: false,
	  	theme: 'darkblue',
	  	isModal: true
  	};

  	/* Alert Process Popup*/
  	$scope.dialogNewSaleQ = {
    	created: function(args){
      		NewSaleQuedialog = args.instance;
    	},
    	resizable: false,
    	width: "20%", height: 120,
    	position: { left:  45, top: 35 },
    	autoOpen: false,
    	theme: 'darkblue',
    	isModal: true,
    	showCloseButton: false,
		showAnimationDuration: 0,
		closeAnimationDuration: 0
  	};
 	 /* End */
  
  	/* Alert CC Process Popup*/
  	$scope.dialogCreditCardProcess = {
    	created: function(args){
      		CreditCardProcessdialog = args.instance;
    	},
    	resizable: false,
    	width: 320, height: 220,
    	autoOpen: false,
    	theme: 'darkblue',
    	isModal: true,
   	 	showCloseButton: false,
		showAnimationDuration: 0,
		closeAnimationDuration: 0
  	};
	
   $("#dialogPayments").on('close', function(e){
	   e.preventDefault();
	  // $("#paymentlist").remove();
   })

   $(document).on('click', '#payment_list_close', function(e){
	   e.preventDefault();
	   $("#dialogPayments").jqxWindow('close');
   })

   /* End */
	var populateDialogPayments = function(){
		var def = $.Deferred();
		$("#dialogPayments").append('<div id="paymentlist" style="background: #144766; color:#EEE; overflow: hidden"></div>');
		$("#paymentlist").html('');
		posData.GetPaymentListForm()
		.success(function(data){
			$("#paymentlist").append($compile(data.html)($scope))
			setTimeout(function(){
				def.resolve();
			},100);
		})
		return def.promise();
	}
  
	/* Payment List */
	var POSView = $(".pos-view").width();
	var POSQuantityPanel = ( $('.QuantityPanel').length > 0 ? $('.QuantityPanel').width() : 0 );
	var ActualWidthPaymentList = parseInt(POSView + POSQuantityPanel);
	var PaymentDialog = function(){
		var def = $.Deferred();
		$("#dialogPayments").jqxWindow({
			height: 470,
			width: ActualWidthPaymentList,
			position: { left:  0.1, top: 50 },
			autoOpen: false,
			theme: 'darkblue',
			title: '<button id="payment_list_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;Payments',
			keyboardCloseKey: 'none',
			showCloseButton: false,
			draggable: false,
			isModal: true,
			showAnimationDuration: 0,
			closeAnimationDuration: 0
		})
		setTimeout(function(){
			$("#dialogPayments").jqxWindow('open');
			def.resolve();
		},100);
		return def.promise();
	}
	// $scope.dialogPayments = {
	// 	created: function(args){
	// 		dialogpayments = args.instance;
	// 	},
	// 	resizable: false,
	// 	minWidth: ActualWidthPaymentList,   
	// 	width: ActualWidthPaymentList,//570, 
	// 	height: 470,
	// 	position: { left:  0.1, top: 50 },
	// 	autoOpen: false,
	// 	theme: 'darkblue',
	// 	keyboardCloseKey: 'none',
	// 	showCloseButton: false,
	// 	draggable: false,
	// 	isModal: true,
	// 	showAnimationDuration: 0,
	// 	closeAnimationDuration: 0
	// };
	/* End */
	  
	var DefaultPrinterStatus = 0;
  	var PrinterProblemDefaultMessage = function(form_name){
		$("#dialog-numpad-alert").jqxWindow('close');
		$("#alert-msg-popup").html('');
		DefaultPrinterStatus = 0;
		var msg="Printer error, please check <br/>";
			msg+="1. Printer is turned on. <br/>";
			msg+="2. Check printer paper. <br/>";
			msg+="3. Restart printer.";
		NumpadAlertOkPrinterProblem(form_name, msg)
		.then(function(){
			WindowPopupAlert('Printer problem');
		})
 	}	
  
  	var PrinterCheck = function(Unique, id, status){
		var def = $.Deferred();  
    	var postdata="PaymentTypeUnique="+Unique;
        	postdata+="&responseid="+id;
        	postdata+="&payment_status="+status;
			postdata+="&customer_receipt_only=false";
			postdata+="&OrderType="+ $("#OrderType").val();
		if($scope.pressprint > 0){
			postdata+="&payments_print="+$scope.pressprint;
		}else{
			postdata+="&payments_print=null";
		}
    	posData.PrinterCheck(postdata)
    	.success(function(data){
			setTimeout($.unblockUI, 100); 
			if(data.success == true){
				if(data.print == true){
					/* do nothing */
					DefaultPrinterStatus = 1;
				}else{
					DefaultPrinterStatus = 0;
					if(status == 13){	
						PrinterProblemDefaultMessage('no_check');	
					}else{
						PrinterProblemDefaultMessage('printer_check');
						$('#display-payments').unblock();	
					}
				}
			}
			def.resolve();
    	}).then(function(){
			$scope.pressprint = null;
		})
		return def.promise();
    };

	var PrintCustomerReceipt = function(Unique, id, status){
		var def = $.Deferred();  
    	var postdata="PaymentTypeUnique="+Unique;
        	postdata+="&responseid="+id;
        	postdata+="&payment_status="+status;
			postdata+="&customer_receipt_only=true";
			postdata+="&OrderType="+$("#OrderType").val();
		if($scope.pressprint > 0){
			postdata+="&payments_print="+$scope.pressprint;
		}else{
			postdata+="&payments_print=null";
		}
    	posData.PrinterCheck(postdata)
    	.success(function(data){
			//$('body').unblock();
			setTimeout($.unblockUI, 100); 
			if(data.success == true){
				if(data.print == true){
					/* do nothing */
					def.resolve();
				}else{
					if(status == 13){	
						PrinterProblemDefaultMessage('no_check');	
					}else{
						PrinterProblemDefaultMessage('printer_check');
						$('#display-payments').unblock();	
					}
				}
			}
    	}).then(function(){
			$scope.pressprint = null;
		})
		return def.promise();
	}

    var CashDrawerCheck = function(){
		//$('body').block({message: 'Checking printer connection'});  
		$.blockUI({ css: { 
            border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: 'Checking printer connection'});
    
		posData.CashDrawerPrinterCheck()
    	.success(function(data){
			setTimeout($.unblockUI, 100);
			if(data.success == true){
				if(data.print == true){
					//do nothing;
					DefaultPrinterStatus = 1;
				}else{
					DefaultPrinterStatus = 0;
					PrinterProblemDefaultMessage('cash_drawer');  
				}
			}
		})
  };

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
			source: source, autoComplete: true, displayMember: "CashInNumber", valueMember: "station_cashier_unique", itemHeight: 25, height: 25, width: 150
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
  
  var LoadHeaderInfo2 = function(){
		var def = new $.Deferred(); 
		posData.GetHeaderInfo()
		.success(function(data){
			$("#receiptn").text(data.receipt_number);
			$("#station").text(data.station_name);
			$("#user_name").text(data.user_name);
			$("#tableno").text(data.tableno);
			$scope.StatStationName = data.station_number;
			$scope.StatCashIn = data.cashin;
			$scope.TempStationName = data.station_number;
			$scope.TempCashIn = data.cashin;
			$("#receiptlabel").text(data.LabelNote);
			var resOrderNo = data.OrderNo;
			if(resOrderNo !== null){
				$("#OrderNoDisplayLine").show();
				$("#OrderNoDisplay").text(data.OrderNo);
			}else{
				$("#OrderNoDisplayLine").hide();
			}
			
			def.resolve();
		})
		return def.promise();
	};
  /* End */


  var GetOrderNo = function(){
	  var def = new $.Deferred();
	  var postdata ="OrderType="+$("#OrderType").val();
	  posData.GetOrderNo(postdata)
	  .success(function(data){
		 if(data.OrderNo != 0){
			$("#OrderNoDisplayLine").show();
			$("#OrderNoDisplay").text(data.OrderNo);
		 }else{
			$("#OrderNoDisplayLine").hide();
		 } 
	  }).then(function(){
		  def.resolve(); 
	  });
	  return def.promise();
  }

  //-->Back to main
  $scope.BackPOS = function(){
    window.location.href = base_url + 'pos/pointofsale';
  };
	
  	
  var PoleDisplayTotal = function(){
  	  var def = $.Deferred();
	  var PoleDisplayActivate = $("#PoleDisplay").val();
	  if(PoleDisplayActivate == '1' || PoleDisplayActivate == '3'){
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
	  if(PoleDisplayActivate == '1' || PoleDisplayActivate == '3'){
		  posData.PoleDisplayReset()
		  .success(function(data){
			def.resolve();
		  })
	  }else{
		 def.resolve(); 
	  }
	  return def.promise();
  }	
	
  //--> On Load Ordered Item List
  /*
  var LoadOrderedItemList = function(){
	var def = new $.Deferred();  
    var PoleDisplayActivate = $("#PoleDisplay").val();
	if(PoleDisplayActivate == '1'){
		posData.OrderedItemList()
		.success(function(data){
		  $scope.ordereditemlist = data;
		  def.resolve();
		});
	}else{
		def.resolve();
	}
	return def.promise();
  };
  */

  //--> Totals
  
  var LoadTotals = function(){
		var def = new $.Deferred();
			posData.Totals()
			.success(function(data){
				$scope.totals = data;
			ItemCount2();
			def.resolve();
			});
		return def.promise();
  };
  
  var ItemCount2 = function(){
		setTimeout(function(){
			var sum = 0;
			$('.countQty').each(function(){
				// sum += parseFloat($(this).text());

				if($(this).text() < 0){
							
				}else{
					if( $(this).hasClass('W1') ){
						sum += 1;
					}else{
						sum += parseInt($(this).text());
					}
				}
			})

			if(sum > 0){
				$scope.ItemCountShow = false;
				$("#ItemCountQty").text(sum);
				if($("#PoleDisplay").val() == 2){
					if(ConnectionPoleDisplay){
						conn.send(JSON.stringify(['Count', sum, $scope.station_un]));
					}
				}
			}else{
				$scope.ItemCountShow = true;
				if($("#PoleDisplay").val() == 2){
					if(ConnectionPoleDisplay){
						conn.send(JSON.stringify(['Count', '', $scope.station_un]));
					}
				}
			}
		},100);
  }

  //--> Tax
  var LoadTax = function() {
	var def = new $.Deferred(); 
    posData.Tax()
    .success(function(data){
      $scope.ShowTax = data;
	  def.resolve();
    })
	return def.promise();
  };

  //--> Discount
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
    })
	return def.promise();
  };
  
  var LoadEBT = function(){
	var def = new $.Deferred();
	posData.EBT()
	.success(function(data){
		if(data.success == true){
			$scope.EBTShow = false;
			$scope.NonEBTShow = false;
			$scope.EBT = data;
			$scope.NonEBT = data;
		}else{
			$scope.EBTShow = true;
			$scope.NonEBTShow = true;
		}
	})
	return def.promise();
  }
  
  //-->Load POS Total
  var POSTotal = function(){
		var def = new $.Deferred(); 
		posData.POSTotal()
		.success(function(data){
			$scope.amountdue = data;
			$scope.backcolor = data.color;
	
			if($("#PoleDisplay").val() == 2){
				if(ConnectionPoleDisplay){
					conn.send(JSON.stringify(["DisplayTotal",data, $scope.station_un]));
					conn.send(JSON.stringify(["ClearNumber",'', $scope.station_un]));
				}
			}
			def.resolve();
		});
		return def.promise();
  };
  
  var scrollTotalDown = function(){
	  setTimeout(function() {
		  /*
		  var elem = document.getElementById('payments');
		  elem.scrollTop = elem.scrollHeight;
		  */
		  var n = 1000;
    	  $('#payments').animate({ scrollTop: n }, 50);
	  }, 100); 
  }
  
  //-->Payments
  var LoadPayments = function(){
	var def = new $.Deferred();  
    posData.POSPayments()
    .success(function(data){
      $scope.AllPayments = data;
	  if($("#PoleDisplay").val() == 2){
		  if(ConnectionPoleDisplay){
			  conn.send(JSON.stringify(['Payments', data, $scope.station_un]));
		  }
	  }
    }).then(function(){
		def.resolve();
	})
	return def.promise();
  };

	//-->Load Change
	var LoadChange = function(){
		var def = new $.Deferred();  
		posData.POSChange()
		.success(function(data){
			$scope.poschange = data;
			if($("#PoleDisplay").val() == 2){
				if(ConnectionPoleDisplay){
					conn.send(JSON.stringify(['Change',data, $scope.station_un]));
				}
			}
			def.resolve();
		})
		return def.promise();
	};

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
  };//End Receipt tax cherker

  //-->Payment Types
  var PaymentType = function(){
	var def = new $.Deferred();
    posData.PaymentType()
    .success(function(data){
      $scope.paymenttypes = data;
	  def.resolve();
    })
	return def.promise();
  };

  var CheckReceiptStatus = function(){
	var def = new $.Deferred();  
    posData.CheckReceiptStatus()
    .success(function(data){
      var status = data.status;
      var orders = data.orders;
	  var balance = data.current_balance;
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

  //-->Apply Payment
  var ApplyPayement = function(){
	var def = new $.Deferred();  
    posData.ApplyPayment()
    .success(function(data){
       $scope.ApplyPayment = data;
	   def.resolve();
    })
	return def.promise();
  };

  //-->reload payments
  var DisplayAllPayments = function(){
	var def = new $.Deferred();  
    posData.DisplayAllPayments()
    .success(function(data){
     	$scope.allpayments = data;
	//   $scope.payment_list_grid = {
	// 	source:  {
	// 		localdata: data,
	// 	}
	//   };
		gridPaymentsList(data);
		def.resolve();
    })
	return def.promise();
  };

  var CheckBalance = function(){
	var def = new $.Deferred();  
    posData.CheckBalance()
    .success(function(data){
      if(data.balance == true){
        $scope.BtnApplyPaymentWhen = false;
      }else if(data.balance == false){
        $scope.BtnApplyPaymentWhen = true;
      }
	  def.resolve();
    })
	return def.promise();
  };
	/*
	POSTotal()
	.then(function(){
		CheckBalance();
	})
	*/

	var OnPrintCheckBalance = function(){
		var def = new $.Deferred();  
		posData.CheckBalance()
		.success(function(data){
		if(data.balance == true){
			$scope.BtnApplyPaymentWhen = false;
		}else if(data.balance == false){
			$scope.BtnApplyPaymentWhen = true;
			//PrintReceipt();
		}
		def.resolve();
		})
		return def.promise();
	};

	//Get Customer
	/*
	var GetSelectedCustomer = function(){
		var def = new $.Deferred();  
		posData.SelectCustomer()
		.success(function(data){
		var CustomerId = data.CustomerId;
		if(CustomerId){
			//$scope.comboboxSettings.apply('selectItem', CustomerId);
		}
		def.resolve();
		})
		return def.promise();
	};
	*/

  	//-->Get Selected Customer on selecting customer
  	var AccountNumber;
  	var GetSelectedCustomer = function(){
		var def = new $.Deferred();
		posData.SelectCustomer()
		.success(function(data){
			var CustomerId = data.CustomerId;
			if(CustomerId){
				$scope.customer = {
					selected: data.SelectedCustomer,
					id: data.CustomerId
				}

				$scope.RemoveCustomerWhen = true;
				GlobalCustomer = data.CustomerId;
				$("#CustomerSelectedUnique").val(data.CustomerId);
				$("#AccountStatus").val(data.AccountStatus);
				$("#CreditLimit").val(data.CreditLimit);
				AccountNumber = data.AccountNumber;
			}else{
				$scope.customer = {
					selected: 'Guest',
					id: ''
				}
				$scope.RemoveCustomerWhen = false;
				GlobalCustomer = null;
				$("#CustomerSelectedUnique").val(null);
			}
			def.resolve();
		});
		return def.promise();
   }//End Get Selected Customer


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

  var PrintReceipt = function(){
	  var def = new $.Deferred();
      posData.Print()
      .success(function(data){
        if(data.success == true){
          $scope.alert = {
  					message:"Receipt Printed."
  				};
  				Alertdialog.setTitle("Payment");
          Alertdialog.open();
        }
		def.resolve();
      });
	  return def.promise();
  };

  var OpenCashDrawer = function(){
	var def = new $.Deferred();  
    posData.OpenDrawer()
    .success(function(data){
	  def.resolve();
    })
	return def.promise();
  };

  //-->Load Customer List
  var LoadCustomerList = function() {
	var def = new $.Deferred();
	
	setTimeout(function(){  
		var url = base_url +"pos/pointofsale/load-customers";
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Unique' },
				{ name: 'Name' }
			],
			url: url,
			async: false
		};
		// Create a ngxComboBox
		$scope.comboboxSettings = { source:  source, searchMode: 'contains', displayMember: "Name", valueMember: "Unique", width: "90%", height: 30 };
		// trigger the select event.
		$scope.selectHandler = function (event) {
			if (event.args) {
				var item = event.args.item;
				if (item) {
					GlobalCustomer = item.value;
					var postData="selcustomervalue="+item.value;
						postData+="&selcustomerlabel="+item.label;
					posData.TransCustomer(postData)
				}
			}
		};
		def.resolve();
	},100);
	return def.promise();
  };
  
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
					var msg="Cannot print to:<br/>";
					var count = 1;
					var statusName = '';
					$.each(printers, function(index, value){
						if(value[0] == false){
							statusName = "";
						}else if(value[0] == true){
							statusName = "";
						}
						printerStatus.push(value[0]);
						msg+=count+". "+value[1]+" "+statusName+"<br/>";
						count++;
					})
					var resPrintStatus = printerStatus.indexOf(false);
	
					if(resPrintStatus >= 0){
						msg+="<br/>";
						msg+="Receipt will print to your station. <br/>";
						NumpadAlertYesOnly(formname, msg, '')
						.then(function(){
							WindowPopupAlertYesNo('Printer problem | ID '+data.ReceiptHeaderUnique+" | Receipt#"+data.ReceiptNo)
							.then(function(){
								$(".alert_yes").focus();
							})
						})
					}else{
						DefaultPrinterStatus = 1;
						Status = true;
					}
					/*
					if(DefaultPrinterStatus == 0){
						var msg ="Receipt cannot print because both printers are not working. <br/>";
						NumpadAlertYesOnly(formname, msg, '')
						.then(function(){
							WindowPopupAlertYesNo('Printer problem | ID '+data.ReceiptHeaderUnique+" | Receipt#"+data.ReceiptNo)
							.then(function(){
								$(".alert_yes").focus();
							})
						})
					}
					*/
					
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
			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Processing please wait...' }); 
			PrinterCheckSetting(formname)
			.done(function(Status){
				if(Status == true){
					
				}
				setTimeout($.unblockUI, 100); 
				posData.GetCurrentReceiptHeader()
				.success(function(jsondata){
					var postdata ="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
						postdata+="&OrderType="+$("#OrderType").val();
					posData.KitchenPrintReceipt(postdata)
					.success(function(data){
						LoadHeaderInfo2();
					})
				})
				def.resolve();
			})
		}else{
			def.resolve();
		} 
		return def.promise();
	}

	$(document).on("submit",'#IntegratedZero',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$('#dialog-numpad-alert').jqxWindow('close');
		return def.promise();
	})
	
	/*
	var PutOnHoldReceipt = function(){
		var postData = "ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
		posData.PutOnHold(postData)
		.success(function(data){
			if(data.success == true){
				PoleDisplayReset();
				var url= base_url +"pos/pointofsale";
				window.location = url; 
			}
		})
	}
	
	var OpenOnHoldReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
			var postdata="receiptunique="+unique;
			posData.OpenReceipt(postdata)
			.success(function(data){
				if(data.success == true){
					recalldialog.close();
				}else{
					Quedialog.setTitle("Receipt No. "+data.receiptno);
					Quedialog.open();
					$scope.RecallCompletedReceiptUnique = row.Unique;
				}
			}).then(function(){
				posData.OrderedItemList()
				.success(function(data){
					var RestrictPayment = data.SellPrice;
					$scope.ordereditemlist = data;
					if(RestrictPayment){
						$scope.BtnPaymentWhen = false;
					}else{
						$scope.BtnPaymentWhen = true;
					}
				});
				
				LoadHeaderInfo2();
				LoadTax();
				LoadPayments();
				LoadChange();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					})
				})
				def.resolve();
				
			})
		},1000);
		return def.promise();
	}
	*/
	
	var OpenViewReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
			var postdata = "ReceiptHeaderUnique="+unique;
			posData.ViewReceipt(postdata)
			.success(function(data){
			  if(data.success == true){
				Quedialog.close();
				recalldialog.close();
			  }
			}).then(function(){
				posData.OrderedItemList()
				.success(function(data){
					var RestrictPayment = data.SellPrice;
					$scope.ordereditemlist = data;
					if(RestrictPayment){
						$scope.BtnPaymentWhen = false;
					}else{
						$scope.BtnPaymentWhen = true;
					}
				});
				LoadHeaderInfo2();
				LoadTax();
				LoadPayments();
				LoadChange();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayReset();
					})
				})
				def.resolve();
			})
		},1000);
		return def.promise();
	}
	
	var EditViewReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
			var postData = "ReceiptHeaderUnique="+unique;
			posData.EditReceipt(postData)
			.success(function(data){
			  if(data.success == true){
				Quedialog.close();
				recalldialog.close();
			  }
			}).then(function(){
				 posData.OrderedItemList()
				 .success(function(data){
					 var RestrictPayment = data.SellPrice;
					 $scope.ordereditemlist = data;
					 if(RestrictPayment){
						$scope.BtnPaymentWhen = false;
					 }else{
						$scope.BtnPaymentWhen = true;
					 }
				});
				LoadHeaderInfo2();
				LoadTax();
				LoadPayments();
				LoadChange();
				LoadEBT();
				LoadDiscount();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
				CheckReceiptStatus();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayReset();
					});
				});
				def.resolve();
    		})
		},1000);
		return def.promise();
	}

	
	//-->Set Select Item
	$scope.setSelected = function(ReceiptDestailsUnique) {
		if ($scope.lastSelected) {
			$scope.lastSelected.selected = '';
		}
		this.selected = 'selected';
		$scope.lastSelected = this;
		GlobalItemUnique.Unique = ReceiptDestailsUnique;
		var postData = "Unique="+ReceiptDestailsUnique;
		posData.TaxChecker(postData)
		.success(function(data){
			if(data.success == true){
				//-->Show Button No Item Tax
				$scope.ItemNoTaxHide = false;
				$scope.ItemTaxHide = true;
			}else{
				//-->Show Button Item Tax
				$scope.ItemTaxHide = false;
				$scope.ItemNoTaxHide = true;
			}
		})
	};


    //--> Printer Check Connection
    var PrinterRecallCheck = function(Unique){
	  var def = new $.Deferred();		
      var postdata ="receipt_header_unique="+Unique;
      posData.PrinterCheckRecall(postdata)
          .success(function(data){
            if(data.success == true){
              if(data.print == true){
                /* do nothing */
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
              }
			  
            }else{
              /* Disabled 11/18/2015
               var msg="Printer is disabled in settings.";
               $scope.alert = {
               message: msg
               };
               Alertdialog.setTitle("Printer not ready");
               Alertdialog.open();
               */
            }
			def.resolve();
          })
		  return def.promise();
    };
    //--> End Printer Check Connection

    var ConfigStation = function(){
	  var def = new $.Deferred();	
      posData.ConfigStation()
      .success(function(data){
        $scope.print_receipt = data.print_receipt;
		$scope.adjust_tip_button = data.adjust_tip;
		def.resolve();
      })
	  return def.promise();
	};
	
	$rootScope.$on('CallGridPaymentList', function(event, data){
		$scope.setGridPaymentList(data);
	})

	$scope.setGridPaymentList = function(data){
		gridPaymentsList(data);
	}
	
	var gridPaymentsList = function(data){
		if( $("#payment_list_grid").length -1 ){
			return false;
		}

		var def = $.Deferred();
		var source =  {
			dataType: "json",
			dataFields: [
				{ name: 'unique', type : 'int' },
				{ name: 'payments', type: 'string'},
				{ name: 'amount', type: 'string' },
				{ name: 'paid', type: 'string'},
				{ name: 'change', type: 'string'},
				{ name: 'cashier', type: 'string'},
				{ name: 'date', type: 'string'},
				{ name: 'status', type: 'string'},
				{ name: 'trantype', type: 'string'},
				{ name: 'payment_unique', type: 'int'},
				{ name: 'integrated', type: 'int'},
				{ name: 'cardno', type: 'string'},
				{ name: 'ResponseOrigin', type: 'string'},
				{ name: 'DSIXReturnCode', type: 'string'},
				{ name: 'CmdStatus', type: 'string'},
				{ name: 'TextResponse', type: 'string'},
				{ name: 'MerchantID', type: 'string'},
				{ name: 'AcctNo', type: 'string'},
				{ name: 'ExpDate', type: 'string'},
				{ name: 'CardType', type: 'string'},
				{ name: 'TranCode', type: 'string'},
				{ name: 'AuthCode', type: 'string'},
				{ name: 'CaptureStatus', type: 'string'},
				{ name: 'RefNo', type: 'string'},
				{ name: 'InvoiceNo', type: 'string'},
				{ name: 'Memo', type: 'string'},
				{ name: 'Purchase', type: 'string'},
				{ name: 'Authorize', type: 'string'},
				{ name: 'Balance', type: 'string'},
				{ name: 'AcqRefData', type: 'string'},
				{ name: 'ProcessData', type: 'string'},
				{ name: 'Location', type: 'string'},
				{ name: 'Station', type: 'string'},
				{ name: 'TipAmount', type: 'string'},
				{ name: 'Batch', type: 'int'},
				{ name: 'canvoid', type: 'string'},
				{ name: 'CardHolderName', type: 'string'},
				{ name: 'voided', type: 'string'}
				//-->GiftCard Table
			],
			localdata: data,
		}
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#payment_list_grid").jqxDataTable({
			source: dataAdapter,
			width: '100%',
			height: 350,
			pageable: false,
			sortable: true,
			altRows: true,
			theme: 'darkblue',
			rowDetails: true,
			initRowDetails: function (id, row, element, rowinfo) {
				var tabsdiv = null;
				var information = null;
				var Memo = null;
				rowinfo.detailsHeight = 185;

				if(row.integrated == 0){
					element.append($("<div style='margin: 10px;'>"+
										"<ul style='margin-left: 30px;'>"+
											"<li>Info</li>"+
										"</ul>"+
										"<div class='infos'>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>Receipt Number: <span>"+row.receipt_number+"</span></div>"+
												"<div>Payment: <span>"+row.payment_name+"</span></div>"+
												"<div>Cashier: <span>"+row.cashier+"</span></div>"+
												"<div>Cash In: <span>"+row.station_cashier_unique+"</span></div>"+
											"</div>"+
										"</div>"+
									  "</div>"));
				}else if(row.integrated == 2){
					element.append($("<div style='margin: 10px;'>"+
										"<ul style='margin-left: 30px;'>"+
											"<li>Response</li>"+
											"<li>Other</li>"+
										"</ul>"+
										"<div class='infos'>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>ResponseOrigin: <span>"+row.ResponseOrigin+"</span></div>"+
												"<div>DSIXReturnCode: <span>"+row.DSIXReturnCode+"</span></div>"+
												"<div>CmdStatus: <span>"+row.CmdStatus+"</span></div>"+
												"<div>TextResponse: <span>"+row.TextResponse+"</span></div>"+
												"<div>MerchantID: <span>"+row.MerchantID+"</span></div>"+
												"<div>AcctNo: <span>"+row.AcctNo+"</span></div>"+
												"<div>ExpDate: <span>"+row.ExpDate+"</span></div>"+
												"<div>CardType: <span>"+row.CardType+"</span></div>"+
											"</div>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>TranCode: <span>"+row.TranCode+"</span></div>"+
												"<div>AuthCode: <span>"+row.AuthCode+"</span></div>"+
												"<div>CaptureStatus: <span>"+row.CaptureStatus+"</span></div>"+	
												"<div>RefNo: <span>"+row.RefNo+"</span></div>"+
												"<div>InvoiceNo: <span>"+row.InvoiceNo+"</span></div>"+
												"<div>Purchase: <span>"+row.Purchase+"</span></div>"+
												"<div>Authorize: <span>"+row.Authorize+"</span></div>"+
												"<div>Memo: <span>"+row.Memo+"</span></div>"+
											"</div>"+
										"</div>"+
										"<div class='other'>"+
											"<div>AcqRefData: <span>"+row.AcqRefData+"</span></div>"+
											"<div>ProcessData: <span>"+row.ProcessData+"</span></div>"+
											"<div>Location: <span>"+row.Location+"</span></div>"+
											"<div>Station: <span>"+row.Station+"</span></div>"+
										"</div>"+
									  "</div>")
									);
				}else if(row.integrated == 6){
					element.append($("<div style='margin: 10px;'>"+
										"<ul style='margin-left: 30px;'>"+
											"<li>Info</li>"+
											"<li>Comment</li>"+
										"</ul>"+
										"<div class='infos'>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>Receipt Number: <span>"+row.receipt_number+"</span></div>"+
												"<div>Check No: <span>"+row.CheckNo+"</span></div>"+
												"<div>Bank Name: <span>"+row.BankName+"</span></div>"+
												"<div>Routing No: <span>"+row.RoutingNo+"</span></div>"+
												"<div>Check Name: <span>"+row.CheckName+"</span></div>"+
												"<div>Account No: <span>"+row.AccountNo+"</span></div>"+
											"</div>"+
										"</div>"+
										"<div class='comment'>"+
											"<div>"+row.Comment+"</div>"+
										"</div>"+
									  "</div>"));
				}else if(row.integrated == 5){
					element.append($("<div style='margin: 10px;'>"+
										"<ul style='margin-left: 30px;'>"+
											"<li>Response</li>"+
											"<li>Other</li>"+
										"</ul>"+
										"<div class='infos'>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>ResponseOrigin: <span>"+row.ResponseOrigin+"</span></div>"+
												"<div>DSIXReturnCode: <span>"+row.DSIXReturnCode+"</span></div>"+
												"<div>CmdStatus: <span>"+row.CmdStatus+"</span></div>"+
												"<div>TextResponse: <span>"+row.TextResponse+"</span></div>"+
												"<div>MerchantID: <span>"+row.MerchantID+"</span></div>"+
												"<div>AcctNo: <span>"+row.AcctNo+"</span></div>"+
												"<div>ExpDate: <span>"+row.ExpDate+"</span></div>"+
												"<div>CardType: <span>"+row.CardType+"</span></div>"+
											"</div>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>TranCode: <span>"+row.TranCode+"</span></div>"+
												"<div>AuthCode: <span>"+row.AuthCode+"</span></div>"+
												"<div>CaptureStatus: <span>"+row.CaptureStatus+"</span></div>"+	
												"<div>RefNo: <span>"+row.RefNo+"</span></div>"+
												"<div>InvoiceNo: <span>"+row.InvoiceNo+"</span></div>"+
												"<div>Purchase: <span>"+row.Purchase+"</span></div>"+
												"<div>Authorize: <span>"+row.Authorize+"</span></div>"+
												"<div>Memo: <span>"+row.Memo+"</span></div>"+
											"</div>"+
										"</div>"+
										"<div class='other'>"+
											"<div>AcqRefData: <span>"+row.AcqRefData+"</span></div>"+
											"<div>ProcessData: <span>"+row.ProcessData+"</span></div>"+
											"<div>Location: <span>"+row.Location+"</span></div>"+
											"<div>Station: <span>"+row.Station+"</span></div>"+
										"</div>"+
									  "</div>")
									);
				}else if(row.integrated == 7){
					element.append($("<div style='margin: 10px;'>"+
										"<ul style='margin-left: 30px;'>"+
											"<li>Response</li>"+
											"<li>Comment</li>"+
										"</ul>"+
										"<div class='infos'>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>Gift Card Number: <span>"+row.GCGiftCardNo+"</span></div>"+
												"<div>Operation: <span>"+row.Operation+"</span></div>"+
												"<div>Amount: <span>"+row.Amount+"</span></div>"+
												"<div>Response: <span>"+row.Response+"</span></div>"+
												"<div>MerchantID: <span>"+row.GCMerchantID+"</span></div>"+
												"<div>AcctNo: <span>"+row.GCAcctNo+"</span></div>"+
												"<div>TranCode: <span>"+row.GCTranCode+"</span></div>"+
											"</div>"+
											"<div style='width: 50%; float:left;'>"+
												"<div>TranType: <span>"+row.GCTranType+"</span></div>"+
												"<div>AuthCode: <span>"+row.GCAuthCode+"</span></div>"+
												"<div>RefNo: <span>"+row.GCRefNo+"</span></div>"+
												"<div>InvoiceNo: <span>"+row.GCInvoiceNo+"</span></div>"+
												"<div>Purchase: <span>"+row.GCPurchase+"</span></div>"+
												"<div>Authorize: <span>"+row.GCAuthorize+"</span></div>"+
												"<div>Balance: <span>"+row.GCBalance+"</span></div>"+
											"</div>"+
										"</div>"+
										"<div class='Comment'>"+row.Comment+"</div>"+
									  "</div>"));
				}
				tabsdiv = $(element.children()[0]);
				if (tabsdiv != null) {
					infos = tabsdiv.find('.infos');
					memo = tabsdiv.find('.memo');
					other = tabsdiv.find('.other');

					var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
					var	memocontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
					var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
					
					$(infos).append(infocontainer);
					$(memo).append(memocontainer);
					$(other).append(othercontainer);

					var tabs = new jqxTabs(tabsdiv, {width: "95%", height: 170});
				}
			},
			ready: function () {
				// expand the first details.
				//$("#payment_list_grid").jqxDataTable('showDetails', 0);
			},
			columns: [
				{ text: 'Unique', dataField: 'unique', hidden: true},
				{ text: 'Pay', dataField: 'payments', width: '10%', align: 'center', cellsalign: 'center'},
				{ text: 'Tendered', dataField: 'amount', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				{ text: 'Applied', dataField: 'paid', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				{ text: 'Change', dataField: 'change', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				{ text: 'Adjust', dataField: 'TipAmount', width: '10%',align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				{ text: 'Date', dataField: 'date', width: '15%', align: 'center', cellsalign: 'center'},
				{ text: 'Status', dataField: 'status', width: '10%', align: 'center', cellsalign: 'center'},
				{ text: 'Customer', dataField: 'CardHolderName', width: '25%'}
			]
		})


		// $scope.payment_list_grid = {
		// 	width: '100%',
		// 	height: 350,
		// 	pageable: false,
		// 	sortable: true,
		// 	altRows: true,
		// 	theme: 'darkblue',
		// 	rowDetails: true,
		// 	initRowDetails: function (id, row, element, rowinfo) {
		// 		var tabsdiv = null;
		// 		var information = null;
		// 		var Memo = null;
		// 		rowinfo.detailsHeight = 185;
		// 		if(row.integrated == 0){
		// 			element.append($("<div style='margin: 10px;'>"+
		// 								"<ul style='margin-left: 30px;'>"+
		// 									"<li>Info</li>"+
		// 								"</ul>"+
		// 								"<div class='infos'>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>Receipt Number: <span>"+row.receipt_number+"</span></div>"+
		// 										"<div>Payment: <span>"+row.payment_name+"</span></div>"+
		// 										"<div>Cashier: <span>"+row.cashier+"</span></div>"+
		// 										"<div>Cash In: <span>"+row.station_cashier_unique+"</span></div>"+
		// 									"</div>"+
		// 								"</div>"+
		// 							  "</div>"));
		// 		}else if(row.integrated == 2){
		// 			element.append($("<div style='margin: 10px;'>"+
		// 								"<ul style='margin-left: 30px;'>"+
		// 									"<li>Response</li>"+
		// 									"<li>Other</li>"+
		// 								"</ul>"+
		// 								"<div class='infos'>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>ResponseOrigin: <span>"+row.ResponseOrigin+"</span></div>"+
		// 										"<div>DSIXReturnCode: <span>"+row.DSIXReturnCode+"</span></div>"+
		// 										"<div>CmdStatus: <span>"+row.CmdStatus+"</span></div>"+
		// 										"<div>TextResponse: <span>"+row.TextResponse+"</span></div>"+
		// 										"<div>MerchantID: <span>"+row.MerchantID+"</span></div>"+
		// 										"<div>AcctNo: <span>"+row.AcctNo+"</span></div>"+
		// 										"<div>ExpDate: <span>"+row.ExpDate+"</span></div>"+
		// 										"<div>CardType: <span>"+row.CardType+"</span></div>"+
		// 									"</div>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>TranCode: <span>"+row.TranCode+"</span></div>"+
		// 										"<div>AuthCode: <span>"+row.AuthCode+"</span></div>"+
		// 										"<div>CaptureStatus: <span>"+row.CaptureStatus+"</span></div>"+	
		// 										"<div>RefNo: <span>"+row.RefNo+"</span></div>"+
		// 										"<div>InvoiceNo: <span>"+row.InvoiceNo+"</span></div>"+
		// 										"<div>Purchase: <span>"+row.Purchase+"</span></div>"+
		// 										"<div>Authorize: <span>"+row.Authorize+"</span></div>"+
		// 										"<div>Memo: <span>"+row.Memo+"</span></div>"+
		// 									"</div>"+
		// 								"</div>"+
		// 								"<div class='other'>"+
		// 									"<div>AcqRefData: <span>"+row.AcqRefData+"</span></div>"+
		// 									"<div>ProcessData: <span>"+row.ProcessData+"</span></div>"+
		// 									"<div>Location: <span>"+row.Location+"</span></div>"+
		// 									"<div>Station: <span>"+row.Station+"</span></div>"+
		// 								"</div>"+
		// 							  "</div>"));

		// 		}else if(row.integrated == 6){
		// 			element.append($("<div style='margin: 10px;'>"+
		// 								"<ul style='margin-left: 30px;'>"+
		// 									"<li>Info</li>"+
		// 									"<li>Comment</li>"+
		// 								"</ul>"+
		// 								"<div class='infos'>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>Receipt Number: <span>"+row.receipt_number+"</span></div>"+
		// 										"<div>Check No: <span>"+row.CheckNo+"</span></div>"+
		// 										"<div>Bank Name: <span>"+row.BankName+"</span></div>"+
		// 										"<div>Routing No: <span>"+row.RoutingNo+"</span></div>"+
		// 										"<div>Check Name: <span>"+row.CheckName+"</span></div>"+
		// 										"<div>Account No: <span>"+row.AccountNo+"</span></div>"+
		// 									"</div>"+
		// 								"</div>"+
		// 								"<div class='comment'>"+
		// 									"<div>"+row.Comment+"</div>"+
		// 								"</div>"+
		// 							  "</div>"));
		// 		}else if(row.integrated == 7){
		// 			element.append($("<div style='margin: 10px;'>"+
		// 								"<ul style='margin-left: 30px;'>"+
		// 									"<li>Response</li>"+
		// 									"<li>Comment</li>"+
		// 								"</ul>"+
		// 								"<div class='infos'>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>Gift Card Number: <span>"+row.GCGiftCardNo+"</span></div>"+
		// 										"<div>Operation: <span>"+row.Operation+"</span></div>"+
		// 										"<div>Amount: <span>"+row.Amount+"</span></div>"+
		// 										"<div>Response: <span>"+row.Response+"</span></div>"+
		// 										"<div>MerchantID: <span>"+row.GCMerchantID+"</span></div>"+
		// 										"<div>AcctNo: <span>"+row.GCAcctNo+"</span></div>"+
		// 										"<div>TranCode: <span>"+row.GCTranCode+"</span></div>"+
		// 									"</div>"+
		// 									"<div style='width: 50%; float:left;'>"+
		// 										"<div>TranType: <span>"+row.GCTranType+"</span></div>"+
		// 										"<div>AuthCode: <span>"+row.GCAuthCode+"</span></div>"+
		// 										"<div>RefNo: <span>"+row.GCRefNo+"</span></div>"+
		// 										"<div>InvoiceNo: <span>"+row.GCInvoiceNo+"</span></div>"+
		// 										"<div>Purchase: <span>"+row.GCPurchase+"</span></div>"+
		// 										"<div>Authorize: <span>"+row.GCAuthorize+"</span></div>"+
		// 										"<div>Balance: <span>"+row.GCBalance+"</span></div>"+
		// 									"</div>"+
		// 								"</div>"+
		// 								"<div class='Comment'>"+row.Comment+"</div>"+
		// 							  "</div>"));
		// 		}
		// 		tabsdiv = $(element.children()[0]);
		// 		if (tabsdiv != null) {
		// 			infos = tabsdiv.find('.infos');
		// 			memo = tabsdiv.find('.memo');
		// 			other = tabsdiv.find('.other');
		// 			var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
		// 			var	memocontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
		// 			var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
		// 			$(infos).append(infocontainer);
		// 			$(memo).append(memocontainer);
		// 			$(other).append(othercontainer);
		// 			var tabs = new jqxTabs(tabsdiv, {width: "95%", height: 170});
		// 		}
		// 	},
		// 	ready: function () {
		// 		// expand the first details.
		// 		//$("#payment_list_grid").jqxDataTable('showDetails', 0);
				
		// 	},
		// 	source:  {
		// 		dataType: "json",
		// 		dataFields: [
		// 			{ name: 'unique', type : 'int' },
		// 			{ name: 'payments', type: 'string'},
		// 			{ name: 'amount', type: 'string' },
		// 			{ name: 'paid', type: 'string'},
		// 			{ name: 'change', type: 'string'},
		// 			{ name: 'cashier', type: 'string'},
		// 			{ name: 'date', type: 'string'},
		// 			{ name: 'status', type: 'string'},
		// 			{ name: 'trantype', type: 'string'},
		// 			{ name: 'payment_unique', type: 'int'},
		// 			{ name: 'integrated', type: 'int'},
		// 			{ name: 'cardno', type: 'string'},
		// 			{ name: 'ResponseOrigin', type: 'string'},
		// 			{ name: 'DSIXReturnCode', type: 'string'},
		// 			{ name: 'CmdStatus', type: 'string'},
		// 			{ name: 'TextResponse', type: 'string'},
		// 			{ name: 'MerchantID', type: 'string'},
		// 			{ name: 'AcctNo', type: 'string'},
		// 			{ name: 'ExpDate', type: 'string'},
		// 			{ name: 'CardType', type: 'string'},
		// 			{ name: 'TranCode', type: 'string'},
		// 			{ name: 'AuthCode', type: 'string'},
		// 			{ name: 'CaptureStatus', type: 'string'},
		// 			{ name: 'RefNo', type: 'string'},
		// 			{ name: 'InvoiceNo', type: 'string'},
		// 			{ name: 'Memo', type: 'string'},
		// 			{ name: 'Purchase', type: 'string'},
		// 			{ name: 'Authorize', type: 'string'},
		// 			{ name: 'Balance', type: 'string'},
		// 			{ name: 'AcqRefData', type: 'string'},
		// 			{ name: 'ProcessData', type: 'string'},
		// 			{ name: 'Location', type: 'string'},
		// 			{ name: 'Station', type: 'string'},
		// 			{ name: 'TipAmount', type: 'string'},
		// 			{ name: 'Batch', type: 'int'},
		// 			{ name: 'canvoid', type: 'string'}
		// 			//-->GiftCard Table
		// 		],
		// 		localdata: data,
		// 	},
		// 	columns: [
		// 		  { text: 'Unique', dataField: 'unique', hidden: true},
		// 		  { text: 'Pay', dataField: 'payments', width: '10%', align: 'center', cellsalign: 'center'},
		// 		  { text: 'Tendered', dataField: 'amount', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
		// 		  { text: 'Applied', dataField: 'paid', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
		// 		  { text: 'Change', dataField: 'change', width: '10%', align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
		// 		  { text: 'Adjust', dataField: 'TipAmount', width: '10%',align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
		// 		  { text: 'Date', dataField: 'date', width: '15%', align: 'center', cellsalign: 'center'},
		// 		  { text: 'Status', dataField: 'status', width: '10%', align: 'center', cellsalign: 'center'},
		// 		  { text: 'Customer', datafield: 'CardHolderName', width: '25%'}
		// 	]
		// }

		setTimeout(function(){
			def.resolve();
		},100);
		return def.promise();
	}			
	

	$scope.paymentClick = function(event){
		var args = event.args;
		var index = args.index;
		var row = args.row;
		$scope.lastSelected = this;
		$scope.paymentid = row.unique;
		$scope.trantype = row.trantype;
		$scope.list_integrated = row.integrated;
		var postdata="receipt_payment_unique="+row.unique;
		posData.CheckIfVoid(postdata)
		.success(function(data){
			if(data.voided == "yes"){
				$scope.BtnDisableWhen = true;	
				if(row.trantype == 'GC'){
				  $scope.BtnPrintDisableWhen = true;
				}else{
				  $scope.BtnPrintDisableWhen = false;	
				}
			}else{
				if(row.status == "V" || row.status == "D"){
				  $scope.BtnDisableWhen = true;
				  //$scope.BtnPrintDisableWhen = true;
				}else{
				  $scope.BtnDisableWhen = false;
				  $scope.BtnPrintDisableWhen = false;	
				} 
				
				if(row.trantype == 'GC'){ // trantype from config_payments
				  $scope.BtnPrintDisableWhen = true;	
				}else{
				  $scope.BtnPrintDisableWhen = false;	
				}
			}
		})
	}
									  
  //ReceiptTaxChecker();
  //GetSelectedCustomer();
  //LoadCustomerList();
  //#################################################################################//

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


  $scope.EasyPayment = function(Payment){
		$scope.payment = 0;
		if(POSPaymentNumpad > 0){
			$("#amount_payment").maskMoney('mask', Payment.toString())
			$("#amount_payment").focus();
			return;
		}
			
		$scope.payment = Payment;
		$("#amount_payment").focus();
  };

  $scope.NextPayment = function() {
		var num = $scope.amountdue.Total;
		var newamount;
		if(num < 0){
			newamount = parseInt(num).toFixed(0) * -1;
		}else{
			newamount = parseInt(num).toFixed(0);
		}
		var checkdecimal = (num - Math.floor(num)) != 0;

		if(checkdecimal){
			if(POSPaymentNumpad > 0){
				newamount = parseInt(newamount) + 1;
				$("#amount_payment").maskMoney('mask', newamount.toString())
				$("#amount_payment").focus();
				return;
			}
			$scope.payment = parseInt(newamount) + 1;
			setTimeout(function(){
				$("#amount_payment").jqxNumberInput('focus');
			},100)
		}else{
			if(POSPaymentNumpad > 0){
				$("#amount_payment").maskMoney('mask', newamount.toString())
				$("#amount_payment").focus()
				return;
			}
			$scope.payment = parseInt(newamount);
			setTimeout(function(){
				$("#amount_payment").jqxNumberInput('focus');
			},100)
		}
  };

  var populateCustomerList = function(form_name, html){
	  var def = $.Deferred();
	  setTimeout(function(){
			$("#dialog-customer-list").append('<div id="customer-list-container" style="background: #144766; color: #fff;"></div>');
			$("#customer-list-container").html('');
			$("#customer-list-container").append(
			'<div style="width:100%; float:left;">'+
			'	<div style="width: 25%; margin-bottom:10px; /*padding: 20px 0 20px 0;*/ float:left;">'+
			'		<span style="float: left; margin-right: 4px; font-size: 20px;">Search: </span>'+
          	'		<input class="jqx-input" placeholder="Type Name, Email or Phone" id="searchField" type="text" style="height: 23px; width: 80%; font-size: 16px;" />'+ 
        	'	</div>'+
			'	<form id="'+form_name+'" style="width: 55%; float: left;">'+
			'		<input type="text" id="number_field" class="hdfield" style="display:none;">'+
			'		<div id="keyboard_customer_list"></div>'+
			'	</form>'+
			'</div>'+
			'<hr style="display: block; margin-top: 0.5em; margin-bottom: 0.5em; margin-left: auto; margin-right: auto; border-style: inset; border-width: 1px;">'+
			"<div style='float:left;'>"+
			"	<div style='width:100%; margin: 0 5px 0 0;'>"+
			"		<div style='width:100%; margin-bottom:14px;'><h4 style='margin:0px;'>&nbsp;</h4></div>"+
			"		<div id='CustomerListName'></div>"+
			"	</div>"+
			"</div>");

			$("#customer-list-container").append(""+
			"<div style='float:left; width:34%; margin: 0 5px 0 0;'>"+
			"	<div style='overflow: hidden;' id='ContentPanel'>"+
			"		<div style='width:100%; margin-bottom:14px;'><h4 style='margin:0px;'>Customer Profile</h4></div>"+
			"		<div id='ContentPanelContainer' style='background: #fff; color: #000; height: 550px;'></div>"+
			"	</div>"+
			"</div>");

			$("#customer-list-container").append(""+
			"<div style='float:left; width:36%;'>"+
			"	<div style='width: 100%; margin-bottom:10px;'>"+
          	"		<div style='width:100%; margin-bottom:14px;' align='center'><h4 style='margin:0px;'>Card on File</h4></div>"+
        	"	</div>"+
			"	<div style='border: 5px solid #01304a; height:550px;'>"+
			"		<div id='load_card' style='background:#fff; color:#000;'></div>"+
			"	</div>"+
			"</div>");

			// $("#customer-list-container").append(''+
			// '<div style="width:100%; float:left;">'+
			// '	<form id="'+form_name+'">'+
			// '		<input type="text" id="number_field" class="hdfield" style="display:none;">'+
			// '		<div id="keyboard_customer_list"></div>'+
			// '	</form>'+
			// '</div>');
			def.resolve();
	  })
	  return def.promise();
  }

	var WindowPopupCustomerList = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-list").jqxWindow({
				height: 500,
				width: '100%',
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-customer-list').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var CustomerListView = function(form_name, html){
		var def = $.Deferred();
		populateCustomerList(form_name, html)
		.then(function(){
			$('#keyboard_customer_list').hdkeyboard({
				layout: "custom3",
				input: $('#number_field')
			});
			setTimeout(function(){
				$("#number_field").focus();
				def.resolve();
			},100);
		});
		return def.promise();
	}

	//Customer Card Add Card Info
	var populateCustomerAddCardInfo = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-add-card").append('<div id="customer-add-card-container" style="background: #144766; color: #fff;"></div>');
			$("#customer-add-card-container").html('');
			$("#customer-add-card-container").append(
				"<div style='margin: 10px;'><b>Last 4 digit:</b> <input type='text' class='form-control' id='ccflastfourdigit' maxlength='4' /></div>"+
				"<div style='margin: 10px;'><b>Address:</b> <input type='text' class='form-control' id='ccfaddress' /></div>"+
				"<div style='margin: 10px;'><b>Zip:</b> <input type='text' class='form-control' id='ccfzip' /></div>"+
				"<div style='margin: 10px;'><b>CVV:</b> <input type='text' class='form-control' id='ccfcvv' /></div>"+
				"<div style='margin: 10px;'><b>EXP:</b> <input type='text' class='form-control' id='ccfexp' /></div>"+
				"<div style='margin: 10px;'><b>Label:</b> <input type='text' class='form-control' id='label' /></div>"
			);
			$("#customer-add-card-container").append(''+
				'<div style="width:100%; float:left;">'+
				'	<form id="'+form_name+'">'+
				'		<div id="keyboard_customer_add_card"></div>'+
				'	</form>'+
				'</div>');
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupCustomerAddCardInfo = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-add-card").jqxWindow({
				height: 480,
				width: 380,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-customer-add-card').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var CustomerAddCardFormView = function(form_name){
		var def = $.Deferred();
		populateCustomerAddCardInfo(form_name)
		.then(function(){
			$('#keyboard_customer_add_card').hdkeyboard({
				layout: "customer_card_on_file",
				input: $('#customer_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on('click', '#select_customer .button_cancel', function(e){
		e.preventDefault();
		$('#dialog-customer-list').jqxWindow('close');
		SaleOnTheGoArray = [];
		CustomerUnique = '';
		CardId = '';
	})

	var CustomerEmailAddressSelection = function(html){
		var def = $.Deferred();
		setTimeout(function(){	
			$("#email_customer_selection").append('<div id="email_customer_selection_container" style="background: #144766; color:#EEE; padding: 0; margin: 0;"></div>');
			$("#email_customer_selection_container").html(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var CustomerEmailWindowPopup = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#email_customer_selection").jqxWindow({
				height: 400,
				width: 600,
				isModal: true,
				title: 'Email Address Option',
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			})
			$('#email_customer_selection').jqxWindow('open');
			def.resolve();
		},100);
		return def.promise();
	}

	$("#email_customer_selection").on('close', function(e){
		e.preventDefault();
		$("#email_customer_selection_container").html('');
	})
 
 	//-->Select Customer ListBox
	var CustomerUnique = '';
	
	$(document).on('select', '#CustomerListName', function (event) {
		GlobalCustomerArray = [];
		CustomerProfileArray = [];
		var args = event.args;
		if (args) {
			var index = args.index;
			var item = args.item;
			var originalEvent = args.originalEvent;
			// get item's label and value.
			var label = item.label;
			var value = item.value;
			var type = args.type; // keyboard, mouse or null depending on how the item was selected.
		
			CustomerUnique = value;
			var postdata ="CustomerUnique="+value;
			$("#load_card").html('');
			$("#ContentPanelContainer").html('');
			posData.CustomerProfile(postdata)
			.success(function(profile){
				CustomerProfileArray.push(value, profile.First, profile.Last, profile.Phone, profile.Email, profile.Company, profile.Email2, profile.Email3, profile.Email4);
				$("#ContentPanelContainer").append(
					"<div style='margin: 10px;'><b>Company:</b> "+profile.Company+"</div>"+
					"<div style='margin: 10px;'><b>First Name:</b> "+profile.First+"</div>"+
					"<div style='margin: 10px;'><b>Last Name:</b> " + profile.Last + "</div>"+
					"<div style='margin: 10px;'><b>Address:</b> " + profile.Address + "</div>"+
					"<div style='margin: 10px;'><b>City:</b> " + profile.City + "</div>"+
					"<div style='margin: 10px;'><b>State:</b> " + profile.State + "</div>"+
					"<div style='margin: 10px;'><b>Country:</b> " + profile.Country + "</div>"+
					"<div style='margin: 10px;'><b>Phone:</b> " + profile.Phone + "</div>"+
					"<div style='margin: 10px;'><b>Email:</b> " + profile.Email + "</div>"+
					"<div style='margin: 10px;'><b>Email2:</b> " + profile.Email2 + "</div>"+
					"<div style='margin: 10px;'><b>Email3:</b> " + profile.Email3 + "</div>"+
					"<div style='margin: 10px;'><b>Email4:</b> " + profile.Email4 + "</div>"
				);
				GlobalCustomerArray.push(profile.Email, profile.First+' '+profile.Last);
			}).then(function(){
				posData.CardHistory(postdata)
				.success(function(data){
					$("#load_card").append(data.html);
				})

				if($scope.FromEmailReceipt){
					var posdata ="CustomerUnique="+value;
					posData.EmailAddressForm(posdata)
					.success(function(data){
						if(data.success){
							CustomerEmailAddressSelection(data.email_option)
							.then(function(){
								CustomerEmailWindowPopup();
							})
						}
					})
				}
			})
		}
	});

	$(document).on('click', '#select_email', function(e){
		e.preventDefault();
		email_list = [];
		$('input.email_checked:checked').each(function() {
			email_list.push( $(this).attr('id') )
		})
		$("#emailTo").val(email_list);
		$("#dialog-customer-list").jqxWindow('close');
		$("#email_customer_selection").jqxWindow('close');
	})

	$(document).on('click', '#select_email_close', function(e){
		e.preventDefault();
		$("#email_customer_selection").jqxWindow('close');
	})

	var populateCustomerForm = function(form_name, html){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-form").append('<div id="customer-form-container" style="background: #144766; color: #fff;"></div>');
			$("#customer-form-container").html('');
			$("#customer-form-container").append(
			"<div style='margin: 10px;'><b>First Name:</b> <input type='text' class='form-control' id='firstname' /></div>"+
			"<div style='margin: 10px;'><b>Last Name:</b> <input type='text' class='form-control' id='lastname' /></div>"+
			"<div style='margin: 10px;'><b>Company:</b> <input type='text' class='form-control' id='company' /></div>"+
			"<div style='margin: 10px;'><b>Phone:</b> <input type='text' class='form-control' id='phone' /></div>"+
			"<div style='margin: 10px;'><b>Email:</b> <input type='text' class='form-control' id='email' /></div>"+
			"<div style='margin: 10px; font-size: 18px;'><b>Email2:</b> <input type='text' class='form-control' id='email2' /></div>"+
			"<div style='margin: 10px; font-size: 18px;'><b>Email3:</b> <input type='text' class='form-control' id='email3' /></div>"+
			"<div style='margin: 10px; font-size: 18px;'><b>Email4:</b> <input type='text' class='form-control' id='email4' /></div>"
			);
			$("#customer-form-container").append(''+
				'<div style="width:100%; float:left;">'+
				'	<form id="'+form_name+'">'+
				'		<div id="keyboard_customer_form"></div>'+
				'	</form>'+
				'</div>');
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupCustomerForm = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-form").jqxWindow({
				height: 650,
				width: 380,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-customer-form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var CustomerFormView = function(form_name, html){
		var def = $.Deferred();
		populateCustomerForm(form_name, html)
		.then(function(){
			$('#keyboard_customer_form').hdkeyboard({
				layout: "custom4",
				input: $('#customer_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on("click", "#select_customer .create_form", function(e){
		e.preventDefault();
		CustomerFormView('new_customer', '')
		.then(function(){
			WindowPopupCustomerForm('New Customer')
			.then(function(){
				if( $("#POSVirtualKeyboard").val() == 1 ){
					NumpadKeyboard('enter_firstname', 'Enter First Name')
					.then(function(){
						WindowPopupKeyboard('Create Customer')
						.then(function(){
							$("#search_field").focus();
						})
					})
				}
			})
		})
	})
	
	
	$(document).on('click', '#searchField', function(e){
		e.preventDefault();
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_search', 'Type Customer Name')
			.then(function(){
				WindowPopupKeyboard('Search Customer')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#searchField").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		}else{
			$(this).on("keypress", function(e){
				var source = {
					datatype: "jsonp",
					datafields: [
						{ name: 'Unique' },
						{ name: 'name' },
					],
					url: base_url + "pos/pointofsale/customer-list",
					data: {
						featureClass: "P",
						style: "full",
						maxRows: 20,
						username: "customerdata"
					}
				};
				var CustomerdataAdapter = new $.jqx.dataAdapter(source,
					{
						formatData: function (data) {
							data.name_startsWith = $("#searchField").val();
							return data;
						}
					}
				);
				
				$("#CustomerListName").jqxListBox({
					width: 290,
					height: 550,
					source: CustomerdataAdapter,
					displayMember: "name",
					valueMember: "Unique",
					renderer: function (index, label, value){
						var item = CustomerdataAdapter.records[index];
						if (item != null) {
							var label = item.name;
							return label;
						}
						return "";
					}
				})
		
				var me = this;
				if (me.timer) clearTimeout(me.timer);
					me.timer = setTimeout(function () {
						CustomerdataAdapter.dataBind();
						setTimeout(function(){
							$("#CustomerListName").jqxListBox({selectedIndex: 0});
						},500);
					}, 300);
			})
		}
	})
	

	$(document).on('submit', '#enter_search', function(e){
		e.preventDefault();
		$("#ContentPanelContainer").html('');
		var search_customer = $("#search_field").val();
		$("#searchField").val(search_customer);
		var source = {
			datatype: "jsonp",
			datafields: [
				{ name: 'Unique' },
				{ name: 'name' },
			],
			url: base_url + "pos/pointofsale/customer-list",
			data: {
				featureClass: "P",
				style: "full",
				maxRows: 20,
				username: "customerdata"
			}
		};
		var CustomerdataAdapter = new $.jqx.dataAdapter(source,
			{
				formatData: function (data) {
					data.name_startsWith = $("#searchField").val();
					return data;
				}
			}
		);
		
		$("#CustomerListName").jqxListBox({
			width: 290,
			height: 550,
			source: CustomerdataAdapter,
			displayMember: "name",
			valueMember: "Unique",
			renderer: function (index, label, value){
				var item = CustomerdataAdapter.records[index];
				if (item != null) {
					var label = item.name;
					return label;
				}
				return "";
			}
		})

		var me = this;
		if (me.timer) clearTimeout(me.timer);
			me.timer = setTimeout(function () {
				CustomerdataAdapter.dataBind();
				setTimeout(function(){
					$("#CustomerListName").jqxListBox({selectedIndex: 0});
				},500);
			}, 300);
		$('#dialog-numpad-keyboard').jqxWindow('close');
	})

 	/*Popup Keyboard*/
	var populateNumpadKeyboard = function(form_name, title){
		var def = $.Deferred();
		setTimeout(function(){
			KeyboardInputLimit = 1000;
			$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
			$("#custom_item_keyboard").html('');
			$("#custom_item_keyboard").append(''+
			'<h4 style="text-align:center;">'+title+'</h4>'+
			'');
			$("#custom_item_keyboard").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="search_field" maxlength="'+KeyboardInputLimit+'" style="color:#000;" />'+
				'<div id="hd_keyboard"></div>'+
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
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-keyboard').jqxWindow('setTitle', header_title);
			$('#dialog-numpad-keyboard').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var NumpadKeyboard = function(form_name, title){
		var def = $.Deferred();
		populateNumpadKeyboard(form_name, title)
		.then(function(){
			$('#hd_keyboard').jkeyboard({
				layout: "english",
				input: $('#search_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	/*End Keyboard*/


	/*Keyboard Password*/
	var populateNumpadKeyboardPassword = function(form_name, title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
			$("#custom_item_keyboard").html('');
			$("#custom_item_keyboard").append(''+
			'<h4 style="text-align:center;">'+title+'</h4>'+
			'');
			$("#custom_item_keyboard").append(''+
			'<form id="'+form_name+'">'+
				'<input type="password" id="search_field" maxlength="'+KeyboardInputLimit+'" style="color:#000;" />'+
				'<div id="hd_keyboard_password"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupKeyboardPassword = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-keyboard").jqxWindow({
				height: 430,
				minWidth: '80%',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-keyboard').jqxWindow('setTitle', header_title);
			$('#dialog-numpad-keyboard').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var NumpadKeyboardPassword = function(form_name, title){
		var def = $.Deferred();
		populateNumpadKeyboardPassword(form_name, title)
		.then(function(){
			$('#hd_keyboard_password').jkeyboard({
				layout: "english",
				input: $('#search_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	/*End Keyboard Password*/

	var AddNewCustomerVirtualKeyboard = function(){
		if($("#POSVirtualKeyboard").val() == 1){
			$(document).on('click', '.keyboard', function(e){
				e.preventDefault();
				var elemId = $(this).attr('id');
				
			})
		}
	}

	$(document).on('change', '#POSCustomerPhone1', function(e){
		$scope.$apply($scope.AddCustomerSaveDisabled = false);
	})

	$(document).on('change', '#POSCustomerPhone2', function(e){
		$scope.$apply($scope.AddCustomerSaveDisabled = false);
	})

	$(document).on('change', '#POSCustomerPhone3', function(e){
		$scope.$apply($scope.AddCustomerSaveDisabled = false);
	})

	$(document).on('change', '#POSCustomerFax', function(e){
		$scope.$apply($scope.AddCustomerSaveDisabled = false);
	})


	$(document).on('change', '#POSCustomereditPhone1', function(e){
		$scope.$apply($scope.EnabledEditButton());
	})

	$(document).on('change', '#POSCustomereditPhone2', function(e){
		$scope.$apply($scope.EnabledEditButton());
	})

	$(document).on('change', '#POSCustomereditPhone3', function(e){
		$scope.$apply($scope.EnabledEditButton());
	})

	$(document).on('change', '#POSCustomereditFax', function(e){
		$scope.$apply($scope.EnabledEditButton());
	})

	var EmailReceiptVirtualKeyboard = function(){

		if( $("#POSVirtualKeyboard").val() == 1 ){
			$(document).on('click', '#POSCustomerCompany', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_company', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCompany").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCompany', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcompany', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCompany").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerFirstName', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_firstname', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerFirstName").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditFirstName', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editfirstname', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditFirstName").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerLastName', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_lastname', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerLastName").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditLastName', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editlastname', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditLastName").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerPhone', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_phone', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerPhone").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerPhone1', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_phone1', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerPhone1").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditPhone1', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editphone1', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditPhone1").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerPhone2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_phone2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerPhone2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditPhone2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editphone2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditPhone2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerPhone3', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_phone3', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerPhone3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditPhone3', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editphone3', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditPhone3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerFax', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_fax', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerFax").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditFax', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editfax', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditFax").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerEmail', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadCustomEmail('enter_email', 'Enter '+TextField, true)
				.then(function(){
					WindowPopupCustomKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerEmail").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})


			$(document).on('click', '#POSCustomereditEmail', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadCustomEmail('enter_editemail', 'Enter '+TextField, true)
				.then(function(){
					WindowPopupCustomKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditEmail").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditEmail2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadCustomEmail('enter_editemail2', 'Enter '+TextField, true)
				.then(function(){
					WindowPopupCustomKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditEmail2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditEmail3', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadCustomEmail('enter_editemail3', 'Enter '+TextField, true)
				.then(function(){
					WindowPopupCustomKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditEmail3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditEmail4', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadCustomEmail('enter_editemail4', 'Enter '+TextField, true)
				.then(function(){
					WindowPopupCustomKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditEmail4").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})


			$(document).on('click', '#POSCustomerAddress1', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_address1', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerAddress1").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditAddress1', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editaddress1', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditAddress1").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerAddress2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_address2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerAddress2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditAddress2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editaddress2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditAddress2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerCity', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_city', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCity").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCity', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcity', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCity").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerState', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_state', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerState").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})


			$(document).on('click', '#POSCustomereditState', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editstate', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditState").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerZipcode', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_zipcode', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerZipcode").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditZipcode', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editzipcode', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditZipcode").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerCounty', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_county', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCounty").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCounty', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcounty', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCounty").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerCountry', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_country', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCountry").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCountry', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcountry', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCountry").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerNote', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_note', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerNote").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditNote', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editnote', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditNote").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerAccountNo', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_accountno', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerAccountNo").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})
			
			$(document).on('click', '#POSCustomereditAccountNo', function(e){
				e.preventDefault();
				if($("#POSCustomereditAccountNo").val()){
					var postdata ="FunctionButton=CustomerAccountEdit";
					posData.CheckUserManagerCookie(postdata)
					.success(function(data){
						if(data.prompt){
							NumpadPasscode('restrict_input')
							.then(function(){
								var WindowPopupName = $(".editrestrict").text();
								WindowPopupPasscode(WindowPopupName)
								.then(function(){
									$("#number_field").focus();
								})
							})
						}else{
							var ElemType = $('#POSCustomereditAccountNo').attr("type");
							if(ElemType == 'restrict'){
								var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
								NumpadKeyboardPassword('enter_editaccountno', 'Enter '+TextField)
								.then(function(){
									WindowPopupKeyboardPassword('Edit Customer')
									.then(function(){
										var searchInput = $('#search_field');
										var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
										searchInput[0].setSelectionRange(strLength, strLength);
										setTimeout(function(){
											searchInput.focus();
										},100)
									})
								})
							}else{
								var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
								NumpadKeyboard('enter_editaccountno', 'Enter '+TextField)
								.then(function(){
									WindowPopupKeyboard('Edit Customer')
									.then(function(){
										var searchInput = $('#search_field');
										var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
										searchInput[0].setSelectionRange(strLength, strLength);
										setTimeout(function(){
											searchInput.focus();
										},100)
									})
								})
							}
						}
					})
				}else{
					var ElemType = $('#POSCustomereditAccountNo').attr("type");
					if(ElemType == 'restrict'){
						var TextField = $(this).attr('placeholder');
						NumpadKeyboardPassword('enter_editaccountno', 'Enter '+TextField)
						.then(function(){
							WindowPopupKeyboardPassword('Edit Customer')
							.then(function(){
								var searchInput = $('#search_field');
								var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
								searchInput[0].setSelectionRange(strLength, strLength);
								setTimeout(function(){
									searchInput.focus();
								},100)
								$("#dialog-numpad-passcode").jqxWindow("close");
							})
						})
					}else{
						var TextField = $(this).attr('placeholder');
						NumpadKeyboard('enter_editaccountno', 'Enter '+TextField)
						.then(function(){
							WindowPopupKeyboard('Edit Customer')
							.then(function(){
								var searchInput = $('#search_field');
								var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
								searchInput[0].setSelectionRange(strLength, strLength);
								setTimeout(function(){
									searchInput.focus();
								},100)
							})
						})
					}
				}
			})

			$(document).on('submit', '#restrict_input', function(e){
				e.preventDefault();
				var passcode = $("#number_field").val();
				var hashpasscode = CryptoJS.MD5(passcode);
				var postdata ="passcode="+hashpasscode;
					postdata+="&FunctionButton=CustomerAccountEdit";
				posData.EnterPassCode(postdata)
				.success(function(data){
					if(data.success){
						if(data.login){
							var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
							NumpadKeyboard('enter_editaccountno', 'Enter '+TextField)
							.then(function(){
								WindowPopupKeyboard('Edit Customer')
								.then(function(){
									var searchInput = $('#search_field');
									var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
									searchInput[0].setSelectionRange(strLength, strLength);
									setTimeout(function(){
										searchInput.focus();
									},100)
									$("#dialog-numpad-passcode").jqxWindow("close");
								})
							})
						}else{
							$("#dialog-numpad-passcode").jqxWindow('close');
							NumpadAlertOk('restrict_invalid_code', data.msg)
							.then(function(){
								WindowPopupAlert('Info');
							})
						}
					}else{
						$("#dialog-numpad-passcode").jqxWindow('close');
						NumpadAlertOk('restrict_invalid_code', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				})
			})

			$(document).on('click', '#POSCustomerWebsite', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_website', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerWebsite").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditWebsite', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editwebsite', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditWebsite").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})
			
			$(document).on('click', '#POSCustomerCustom1', function(e){
				e.preventDefault();
				if( $("#POSCustomerCustom1").hasClass('jqx-combobox') ){
					//do nothing
				}else{
					var TextField = $(this).closest('.form-group').find('label').text();//$(this).attr('placeholder');
					NumpadKeyboard('enter_custom1', 'Enter '+TextField)
					.then(function(){
						WindowPopupKeyboard('Create Customer')
						.then(function(){
							var searchInput = $('#search_field');
							var strLength = searchInput.val($("#POSCustomerCustom1").val()).length * 25;
							searchInput[0].setSelectionRange(strLength, strLength);
							setTimeout(function(){
								searchInput.focus();
							},100)
						})
					})
				}
			})


			$(document).on('click', '#POSCustomereditCustom1', function(e){
				e.preventDefault();
				if( $("#POSCustomereditCustom1").hasClass('jqx-combobox') ){
					//do nothing
				}else{
					var TextField = $(this).closest('.form-group').find('label').text();//$(this).attr('placeholder');
					NumpadKeyboard('enter_editcustom1', TextField)
					.then(function(){
						WindowPopupKeyboard('Edit Customer')
						.then(function(){
							var searchInput = $('#search_field');
							var strLength = searchInput.val($("#POSCustomereditCustom1").val()).length * 25;
							searchInput[0].setSelectionRange(strLength, strLength);
							setTimeout(function(){
								searchInput.focus();
							},100)
						})
					})
				}
			})

			$(document).on('click', '#POSCustomerCustom2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom2', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom2', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomerCustom3', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom3', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom3', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom3', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			//Custom4
			$(document).on('click', '#POSCustomerCustom4', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom4', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom4").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom4', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom4', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom4").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			//Custom5
			$(document).on('click', '#POSCustomerCustom5', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom5', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom5").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom5', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom5', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom5").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			//Custom6
			$(document).on('click', '#POSCustomerCustom6', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom6', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom6").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom6', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom6', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom6").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			//Custom7
			$(document).on('click', '#POSCustomerCustom7', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_custom7', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Create Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomerCustom7").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})

			$(document).on('click', '#POSCustomereditCustom7', function(e){
				e.preventDefault();
				var TextField = $(this).attr('placeholder');
				NumpadKeyboard('enter_editcustom7', 'Enter '+TextField)
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#POSCustomereditCustom7").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						setTimeout(function(){
							searchInput.focus();
						},100)
					})
				})
			})


			$(document).on('click', '#POSCustomerCreditLimit', function(e){
				e.preventDefault();
				NumpadNumeric('enter_creditlimit')
				.then(function(){
					WindowPopupNumpadNumeric('Create Customer')
					.then(function(){
						setTimeout(function(){
							var input = $('#open_numpad_price input')[0];
							if('selectionStart' in input) {
								input.setSelectionRange(0, 0);
							}else{
								var range = input.createTextRange();
								range.collapse(true);
								range.moveEnd('character', 0);
								range.moveStart('character', 0);
								range.select();
							}
							$("#open_numpad_price input").select();
						},100)
					})
				})
			})

			$(document).on('submit', '#enter_creditlimit', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCreditLimit").val(), $("#open_numpad_price").val());
				var credit_limit = $("#open_numpad_price").val();
				$("#POSCustomerCreditLimit").val(parseFloat(credit_limit).toFixed(2));
				$('#dialog-numpad-price').jqxWindow('close');
			})

			$(document).on('click', '#POSCustomereditCreditLimit', function(e){
				e.preventDefault();
				NumpadNumeric('enter_editcreditlimit')
				.then(function(){
					WindowPopupNumpadNumeric('Edit Customer')
					.then(function(){
						setTimeout(function(){
							var input = $('#open_numpad_price input')[0];
							if('selectionStart' in input) {
								input.setSelectionRange(0, 0);
							}else{
								var range = input.createTextRange();
								range.collapse(true);
								range.moveEnd('character', 0);
								range.moveStart('character', 0);
								range.select();
							}
							$("#open_numpad_price input").select();
						},100)
					})
				})
			})

			$(document).on('submit', '#enter_editcreditlimit', function(e){
				EditDetectChanges($("#POSCustomereditCreditLimit").val(), $("#open_numpad_price").val());
				var credit_limit = $("#open_numpad_price").val();
				$("#POSCustomereditCreditLimit").val(parseFloat(credit_limit).toFixed(2));
				$('#dialog-numpad-price').jqxWindow('close');
			})

			$(document).on("click", "#customer_search_text", function(){
				NumpadKeyboard('enter_search_customer', 'Enter Customer Information')
				.then(function(){
					WindowPopupKeyboard('Customer Search')
					.then(function(){
						setTimeout(function(){
							var searchInput = $('#search_field');
							var strLength = searchInput.val($("#customer_search_text").val()).length * 100;
							searchInput.focus();
							searchInput[0].setSelectionRange(strLength, strLength);
						},100);
					})
				})
			})


			$(document).on('submit', '#enter_company', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCompany").val(), $("#search_field").val());
				var company = $("#search_field").val();
				$("#POSCustomerCompany").val(company);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcompany', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCompany").val(), $("#search_field").val());
				var company = $("#search_field").val();
				$("#POSCustomereditCompany").val(company);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_email', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerEmail").val(), $("#search_field").val());
				var email = $("#search_field").val();
				$("#POSCustomerEmail").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editemail', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditEmail").val(), $("#search_field").val());
				var email = $("#search_field").val();
				$("#POSCustomereditEmail").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editemail2', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditEmail2").val(), $("#search_field").val());
				var email = $("#search_field").val();
				$("#POSCustomereditEmail2").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editemail3', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditEmail3").val(), $("#search_field").val());
				var email = $("#search_field").val();
				$("#POSCustomereditEmail3").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editemail4', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditEmail").val(), $("#search_field").val());
				var email = $("#search_field").val();
				$("#POSCustomereditEmail4").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_firstname', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerFirstName").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerFirstName").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editfirstname', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditFirstName").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditFirstName").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			}) 

			$(document).on('submit', '#enter_lastname', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerLastName").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerLastName").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editlastname', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditLastName").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditLastName").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			}) 

			$(document).on('submit', '#enter_phone', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerPhone").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerPhone").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_phone1', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerPhone1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerPhone1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editphone1', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditPhone1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditPhone1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_phone2', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerPhone2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerPhone2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editphone2', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditPhone2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditPhone2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_phone3', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerPhone3").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerPhone3").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editphone3', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditPhone3").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditPhone3").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_address1', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerAddress1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerAddress1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editaddress1', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditAddress1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditAddress1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_address2', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerAddress2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerAddress2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editaddress2', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditAddress2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditAddress2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_city', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCity").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCity").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcity', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCity").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCity").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_state', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerState").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerState").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editstate', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditState").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditState").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_zipcode', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerZipcode").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerZipcode").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editzipcode', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditZipcode").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditZipcode").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_county', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCounty").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCounty").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcounty', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCounty").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCounty").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_country', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCountry").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCountry").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcountry', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCountry").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCountry").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_county', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCounty").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCounty").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcounty', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCounty").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCounty").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_fax', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerFax").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerFax").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editfax', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditFax").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditFax").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_note', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerNote").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerNote").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editnote', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditNote").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditNote").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_accountno', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerAccountno").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerAccountNo").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editaccountno', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditAccountNo").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditAccountNo").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})
			
			$(document).on('submit', '#enter_website', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerWebsite").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerWebsite").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editwebsite', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditWebsite").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditWebsite").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_custom1', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom1', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom1").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom1").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_custom2', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom2', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom2").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom2").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_custom3', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom3").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom3").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom3', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom3").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom3").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			//Custom4
			$(document).on('submit', '#enter_custom4', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom4").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom4").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom4', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom4").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom4").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			//Custom5
			$(document).on('submit', '#enter_custom5', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom5").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom5").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom5', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom5").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom5").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			//Custom6
			$(document).on('submit', '#enter_custom6', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom6").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom6").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom6', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom6").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom6").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			//Custom7
			$(document).on('submit', '#enter_custom7', function(e){
				e.preventDefault();
				AddDetectChanges($("#POSCustomerCustom7").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomerCustom7").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_editcustom7', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditCustom7").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditCustom7").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on("submit", "#enter_search_customer", function(e){
				e.preventDefault();
				var search = $("#search_field").val();
				Customer_data(search);
				$("#customer_search_text").val('');
				$('#dialog-numpad-keyboard').jqxWindow('close');
				$("#customer_search_text").focus();
			})

			//-->Customer New Customer Company
			$(document).on('click', '#company', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_add_customer_company', 'Enter Company')
				.then(function(){
					WindowPopupKeyboard('Add Company')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#company").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('submit', '#enter_add_customer_company', function(e){
				e.preventDefault();
				$("#company").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('click', '#edit_company', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_edit_company', 'Enter Company')
				.then(function(){
					WindowPopupKeyboard('Edit Company')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_company").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			//-->Customer New Customer First Name
			$(document).on('click', '#firstname', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_add_customer_firstname', 'Enter First Name')
				.then(function(){
					WindowPopupKeyboard('Add First Name')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#firstname").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('submit', '#enter_add_customer_firstname', function(e){
				e.preventDefault();
				$("#firstname").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('click', '#edit_firstname', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_edit_firstname', 'Enter First Name')
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_firstname").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			//-->Customer New Customer Last Name
			$(document).on('click', '#lastname', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_add_customer_lastname', 'Enter Last Name')
				.then(function(){
					WindowPopupKeyboard('Add Last Name')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#lastname").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('submit', '#enter_add_customer_lastname', function(e){
				e.preventDefault();
				$("#lastname").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('click', '#edit_lastname', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_edit_lastname', 'Enter Last Name')
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_lastname").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			//-->Customer New Customer Phone
			$(document).on('click', '#phone', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_add_customer_phone', 'Enter Phone Number')
				.then(function(){
					WindowPopupKeyboard('Add Phone Number')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#phone").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('submit', '#enter_add_customer_phone', function(e){
				e.preventDefault();
				$("#phone").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('click', '#edit_phone', function(e){
				e.preventDefault();
				NumpadKeyboard('enter_edit_phone', 'Enter Phone Number')
				.then(function(){
					WindowPopupKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_phone").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			var populateCustomNumpadKeyboard = function(form_name, title, maxlength){
				var def = $.Deferred();
				var maxtext = '';
				if(maxlength){
					maxtext = 'maxlength="'+KeyboardInputLimit+'"';
				}
				setTimeout(function(){
					$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
					$("#custom_item_keyboard").html('');
					$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">'+title+'</h4>'+
					'');
					$("#custom_item_keyboard").append(''+
					'<form id="'+form_name+'">'+
						'<input type="text" id="search_field" '+maxtext+' style="color:#000">'+
						'<div id="hd_keyboard"></div>'+
					'</form>');
					def.resolve();
				},100);
				return def.promise();
			}

			var NumpadCustomEmail = function(form_name, title, maxlength = true){
				var def = $.Deferred();
				populateCustomNumpadKeyboard(form_name, title, maxlength)
				.then(function(){
					$('#hd_keyboard').jkeyboard({
					  layout: "email",
					  input: $('#search_field')
					});
					def.resolve();
				});
				return def.promise();
			}

			var WindowPopupCustomKeyboard = function(header_title){
				var def = $.Deferred();
				setTimeout(function(){
					$("#dialog-numpad-keyboard").jqxWindow({
						height: 520,
						minWidth: '80%',
						isModal: true,
						theme: 'darkblue',
						showCloseButton: true,
						resizable: false,
						showAnimationDuration: 0,
						closeAnimationDuration: 0
					});
					$('#dialog-numpad-keyboard').jqxWindow('setTitle', header_title);
					$('#dialog-numpad-keyboard').jqxWindow('open');
					def.resolve();	
				},100);
				return def.promise();
			}

			$(document).on('click', '#edit_email', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_edit_email', 'Enter Email')
				.then(function(){
					WindowPopupCustomKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_email").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			//-->Customer New Customer Email
			$(document).on('click', '#email', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_add_customer_email', 'Enter Email')
				.then(function(){
					WindowPopupCustomKeyboard('Add Email')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#email").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#email2', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_add_customer_email2', 'Enter Email2')
				.then(function(){
					WindowPopupCustomKeyboard('Add Email2')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#email2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#edit_email2', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_edit_email2', 'Enter Email2')
				.then(function(){
					WindowPopupCustomKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_email2").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#email3', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_add_customer_email3', 'Enter Email3')
				.then(function(){
					WindowPopupCustomKeyboard('Add Email3')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#email3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#edit_email3', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_edit_email3', 'Enter Email')
				.then(function(){
					WindowPopupCustomKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_email3").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#email4', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_add_customer_email4', 'Enter Email4')
				.then(function(){
					WindowPopupCustomKeyboard('Add Email4')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#email4").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('click', '#edit_email4', function(e){
				e.preventDefault();
				NumpadCustomEmail('enter_edit_email4', 'Enter Email')
				.then(function(){
					WindowPopupCustomKeyboard('Edit Customer')
					.then(function(){
						var searchInput = $('#search_field');
						var strLength = searchInput.val($("#edit_email4").val()).length * 25;
						searchInput[0].setSelectionRange(strLength, strLength);
						searchInput.focus();
					})
				})
			})

			$(document).on('submit', '#enter_add_customer_email', function(e){
				e.preventDefault();
				$("#email").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_add_customer_email3', function(e){
				e.preventDefault();
				$("#email3").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_add_customer_email4', function(e){
				e.preventDefault();
				$("#email4").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_edit_email2', function(e){
				e.preventDefault();
				$("#edit_email2").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_edit_email3', function(e){
				e.preventDefault();
				$("#edit_email3").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_edit_email4', function(e){
				e.preventDefault();
				$("#edit_email4").val($("#search_field").val());
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})


			$(document).on('submit', '#enter_edit_email', function(e){
				e.preventDefault();
				var email = $("#search_field").val();
				$("#edit_email").val(email);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

			$(document).on('submit', '#enter_edit_company', function(e){
				e.preventDefault();
				var first = $("#search_field").val();
				$("#edit_company").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			}) 

			$(document).on('submit', '#enter_edit_firstname', function(e){
				e.preventDefault();
				var first = $("#search_field").val();
				$("#edit_firstname").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			}) 

			$(document).on('submit', '#enter_edit_lastname', function(e){
				e.preventDefault();
				var first = $("#search_field").val();
				$("#edit_lastname").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			}) 

			$(document).on('submit', '#enter_edit_phone', function(e){
				e.preventDefault();
				var first = $("#search_field").val();
				$("#edit_phone").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})

		}else{
			$(document).on('click', '#POSCustomereditAccountNo', function(e){
				e.preventDefault();
				if($("#POSCustomereditAccountNo").val()){
					var postdata ="FunctionButton=CustomerAccountEdit";
					posData.CheckUserManagerCookie(postdata)
					.success(function(data){
						if(data.prompt){
							NumpadPasscode('restrict_input')
							.then(function(){
								var WindowPopupName = $(".editrestrict").text();
								WindowPopupPasscode(WindowPopupName)
								.then(function(){
									$("#number_field").focus();
								})
							})
						}else{
							var ElemType = $("#POSCustomereditAccountNo").attr("type");
							if(ElementType == 'password'){
								var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
								NumpadKeyboardPassword('enter_editaccountno', 'Enter '+TextField)
								.then(function(){
									WindowPopupKeyboardPassword('Edit Customer')
									.then(function(){
										var searchInput = $('#search_field');
										var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
										searchInput[0].setSelectionRange(strLength, strLength);
										searchInput.focus();
									})
								})
							}
						}
					})
				}else{
					var ElemType = $("#POSCustomereditAccountNo").attr("type");
					if(ElemType == 'password'){
						var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
						NumpadKeyboardPassword('enter_editaccountno', 'Enter '+TextField)
						.then(function(){
							WindowPopupKeyboardPassword('Edit Customer')
							.then(function(){
								var searchInput = $('#search_field');
								var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
								searchInput[0].setSelectionRange(strLength, strLength);
								searchInput.focus();
								$("#dialog-numpad-passcode").jqxWindow("close");
							})
						})
					}
				}
			})

			$(document).on('submit', '#restrict_input', function(e){
				e.preventDefault();
				var passcode = $("#number_field").val();
				var hashpasscode = CryptoJS.MD5(passcode);
				var postdata ="passcode="+hashpasscode;
					postdata+="&FunctionButton=CustomerAccountEdit";
				posData.EnterPassCode(postdata)
				.success(function(data){
					if(data.success){
						if(data.login){
							var TextField = $("#POSCustomereditAccountNo").attr('placeholder');
							NumpadKeyboard('enter_editaccountno', 'Enter '+TextField)
							.then(function(){
								WindowPopupKeyboard('Create Customer')
								.then(function(){
									var searchInput = $('#search_field');
									var strLength = searchInput.val($("#POSCustomereditAccountNo").val()).length * 25;
									searchInput[0].setSelectionRange(strLength, strLength);
									searchInput.focus();
									$("#dialog-numpad-passcode").jqxWindow("close");
								})
							})
						}else{
							$("#dialog-numpad-passcode").jqxWindow('close');
							NumpadAlertOk('restrict_invalid_code', data.msg)
							.then(function(){
								WindowPopupAlert('Info');
							})
						}
					}else{
						$("#dialog-numpad-passcode").jqxWindow('close');
						NumpadAlertOk('restrict_invalid_code', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				})
			})

			$(document).on('submit', '#enter_editaccountno', function(e){
				e.preventDefault();
				EditDetectChanges($("#POSCustomereditAccountNo").val(), $("#search_field").val());
				var first = $("#search_field").val();
				$("#POSCustomereditAccountNo").val(first);
				$('#dialog-numpad-keyboard').jqxWindow('close');
			})
		}
	}
	EmailReceiptVirtualKeyboard();

	$(document).on('input propertychange paste', '.addcustomer', function(){
		$("#add_save").prop("disabled", false);
	})


	var AddDetectChanges = function(text1, text2){
		if(text1 != text2){
			//$("#EditBtnUpdate").prop("disabled", false);
			//$scope.$apply($scope.EnableAddCustomerSaveButton());
			$("#add_save").prop("disabled", false);
		}
	}

	var EditDetectChanges = function(text1, text2){
		if(text1 != text2){
			//$("#EditBtnUpdate").prop("disabled", false);
			$scope.$apply($scope.EnabledEditButton());
		}
	}

	$(document).on("click", '#new_customer .button_cancel', function(e){
		e.preventDefault();
		$('#dialog-customer-form').jqxWindow('close');
	})

	var CustomerSaveThenSelect = function(){
		var def = $.Deferred();
		setTimeout(function(){
			var source = {
				datatype: "jsonp",
				datafields: [
					{ name: 'Unique' },
					{ name: 'name' },
				],
				url: base_url + "pos/pointofsale/customer-list",
				data: {
					featureClass: "P",
					style: "full",
					maxRows: 20,
					username: "customerdata"
				}
			};

			var CustomerdataAdapter = new $.jqx.dataAdapter(source,
				{
					formatData: function (data) {
						data.name_startsWith = $("#searchField").val();
						return data;
					}
				}
			);

			$("#CustomerListName").jqxListBox({
				width: 290,
				height: 550,
				source: CustomerdataAdapter, 
				//selectedIndex: 0,
				displayMember: "name",
				valueMember: "Unique",
				renderer: function (index, label, value) {
					var item = CustomerdataAdapter.records[index];
					if (item != null) {
						var label = item.name;
						return label;
					}
					return "";
				}
			})
			
			var me = this;
			$("#searchField").on('keyup', function (event) {
				if (me.timer) clearTimeout(me.timer);
				me.timer = setTimeout(function () {
					CustomerdataAdapter.dataBind();
				}, 300);
			});
			def.resolve();
		},100);
		return def.promise();
	}

	var CustomerSelectByUnique = function(unique){
		var def = $.Deferred();
		var postdata ="CustomerUnique="+unique;
		posData.FindSelectedCustomerById(postdata)
		.success(function(data){
			var source = {
				datatype: "json",
				datafields: [
					{ name: 'Unique' },
					{ name: 'name' },
				],
				localdata:data
			};
			var CustomerdataAdapter = new $.jqx.dataAdapter(source);

			$("#CustomerListName").jqxListBox({
				width: 290,
				height: 550,
				source: CustomerdataAdapter,
				displayMember: "name",
				valueMember: "Unique"
			})
			def.resolve();
		})
		return def.promise();
	}

	//-->Create Customer
	$(document).on("click", "#new_customer .save_form", function(e){
		e.preventDefault();
		CustomerUnique 	= '';
		CardId 			= '';
		var company 	= $("#company").val();
		var firstname 	= $("#firstname").val();
		var lastname 	= $("#lastname").val();
		var phone 		= $("#phone").val();
		var email 		= $("#email").val();
		var email2  	= $("#email2").val();
		var email3 		= $("#email3").val();
		var email4		= $("#email4").val();
		var fullname 	= (firstname + ' ' + lastname);
		if($("#firstname").val() !== ''){
			$("#searchField").val(fullname);
			var postdata ="FirstName="+firstname;
				postdata+="&LastName="+lastname;
				postdata+="&phone="+phone;
				postdata+="&email="+email;
				postdata+="&email2="+email2;
				postdata+="&email3="+email3;
				postdata+="&email4="+email4;
				postdata+="&company="+company;
			posData.SaveCustomerProfile(postdata)
			.success(function(savedata){
				if(savedata.success == true){
					$("#ContentPanelContainer").html('');
					$("#load_card").html('');
					CustomerUnique = savedata.CustomerUnique;
					$('#dialog-customer-form').jqxWindow('close');

					CustomerSaveThenSelect();
				}
			}).then(function(){
				setTimeout(function(){
					$("#CustomerListName").jqxListBox({selectedIndex: 0 }); 
				},500);
			})
		}else{
			var msg = 'First name is required field';
			NumpadAlertOk('customer_firstname_required', msg)
			.then(function(){
				WindowPopupAlert('Failed to continue');
			});
		}
	})

	var WithCustomerSelected = function(data){
		var def = $.Deferred();
		CustomerListView('select_customer', data.html)
		.then(function(){
			WindowPopupCustomerList('Customer List')
			.then(function(){
				$('#dialog-customer-form').jqxWindow('close');

				var source = {
					datatype: "jsonp",
					datafields: [
						{ name: 'Unique' },
						{ name: 'name' },
					],
					url: base_url + "pos/pointofsale/customer-list",
					data: {
						featureClass: "P",
						style: "full",
						maxRows: 20,
						username: "customerdata"
					}
				};
				var CustomerdataAdapter = new $.jqx.dataAdapter(source,
					{
						formatData: function (data) {
							data.name_startsWith = $("#searchField").val();
							return data;
						}
					}
				);
			
				$("#CustomerListName").jqxListBox({
					width: 290,
					height: 550,
					source: CustomerdataAdapter, 
					//selectedIndex: 0,
					displayMember: "name",
					valueMember: "Unique",
					renderer: function (index, label, value) {
						var item = CustomerdataAdapter.records[index];
						if (item != null) {
							var label = item.name;
							return label;
						}
						return "";
					}
				})
				
				var me = this;
				$("#searchField").on('keyup', function (event) {
					if (me.timer) clearTimeout(me.timer);
					me.timer = setTimeout(function () {
						CustomerdataAdapter.dataBind();
					}, 300);
				});
			})
			def.resolve();
		})
		return def.promise();
	}

	var WithCustomerSelected2 = function(data){
		var def = $.Deferred();
		CustomerListView('select_customer', data.html)
		.then(function(){
			WindowPopupCustomerList('Customer List');
			def.resolve();
		})
		return def.promise();
	}

	$(document).on("click", "#select_customer .swipe_card", function(){
		var TypeName = SaleOnTheGoArray[1];
		if(CustomerUnique !== ''){
			if(CheckInvokeControl == 'MSRAUTH'){
				SwipeCardFrom('swipecard_auth')
				.then(function(){
					WindowSwipeCardForm()
					.then(function(){
						setTimeout(function(){
							$("#credit_card_number").focus();
						},100);
					});
				})
			}else{
				CustomerAddCardFormView('customer_add_card_info')
				.then(function(){
					WindowPopupCustomerAddCardInfo('Card Info')
					.then(function(){
						$("#ccflastfourdigit").focus();
					})
				})
			}
		}else{
			var msg = "Please select customer first.";
			NumpadPaymentAlertOk('payment_process', msg)
			.then(function(){
				WindowPopupPaymentAlert(TypeName + ' Payment');
			});
		}
	})

	$(document).on('click', "#ccflastfourdigit", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_ccflastfourdigit', 'Last 4 Digit')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#ccflastfourdigit").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})
	
	$(document).on('click', "#ccfaddress", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_ccfaddress', 'Type Address')
			.then(function(){
				WindowPopupKeyboard('Customer Card Info')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#ccfaddress").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		}
	})

	$(document).on('click', "#ccfzip", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_ccfzip', 'Zipcode')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#ccfzip").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})

	$(document).on('click', "#ccfcvv", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_ccfcvv', 'CVV')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#ccfcvv").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})

	$(document).on('click', "#ccfexp", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_ccfexp', 'Expiration Date')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#ccfexp").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})

	$(document).on('click', "#label", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_label', 'Type Label')
			.then(function(){
				WindowPopupKeyboard('Customer Card Info')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#label").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		}
	})
	
	// --> Card Number
	$(document).on('click', '#credit_card_number', function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_card_number', 'Card Number')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#credit_card_number").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
					$("#swipecard_number_field").val( $("#customer_card_field").val() );
			})
		}
	})

	// --> Expiration Month
	$(document).on('click', '#credit_card_number_month', function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_card_exp_month', 'Card Exp Month')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#credit_card_number_month").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})
	// --> Expiration Year
	$(document).on('click', '#credit_card_number_year', function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_card_exp_year', 'Card Exp Year')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#credit_card_number_year").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})
	// --> Credit Card Holder Name
	$(document).on('click', "#credit_card_name", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_card_holder_name', 'Type Card Holder Name')
			.then(function(){
				WindowPopupKeyboard('Customer Card Info')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#credit_card_name").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
					$("#swipecard_account_name").val( $("#search_field").val() );
				})
			})
		}
	})
	// --> Credit Card Street
	$(document).on('click', "#credit_card_number_street", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_card_number_street', 'Type Card Street Number')
			.then(function(){
				WindowPopupKeyboard('Customer Card Info')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#credit_card_number_street").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		}
	})
	// --> Credit Card Zip code
	$(document).on('click', "#credit_card_number_zipcode", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_card_zipcode', 'Card Zip Code')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#credit_card_number_zipcode").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})
	// --> Credit Card CVV
	$(document).on('click', "#credit_card_number_cvv", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadCustomerCard('enter_card_cvv', 'Card CVV')
			WindowPopupCustomerCard('Customer Card Info')
			.then(function(){
				var searchInput = $('#customer_card_field');
					var strLength = searchInput.val($("#credit_card_number_cvv").val()).length * 4;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
			})
		}
	})
	// --> Credit Card Label
	$(document).on('click', "#credit_card_label", function(){
		if( $("#POSVirtualKeyboard").val() == 1 ){
			NumpadKeyboard('enter_card_label', 'Type Label')
			.then(function(){
				WindowPopupKeyboard('Customer Card Info')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#credit_card_label").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		}
	})

	// --> Submit Enter Card Number
	$(document).on('submit', '#enter_card_number', function(e){
		e.preventDefault();
		$("#credit_card_number").val($("#customer_card_field").val());
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})
	// --> Submit Card Expiration Month
	$(document).on('submit', '#enter_card_exp_month', function(e){
		e.preventDefault();
		$("#credit_card_number_month").val( $("#customer_card_field").val() );
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})
	// Submit Card Expiration Year
	$(document).on('submit', '#enter_card_exp_year', function(e){
		e.preventDefault();
		$("#credit_card_number_year").val( $("#customer_card_field").val() );
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})
	// Submit Card Holder Name
	$(document).on('submit', '#enter_card_holder_name', function(e){
		e.preventDefault();
		$("#credit_card_name").val( $("#search_field").val() );
		$("#dialog-numpad-keyboard").jqxWindow('close');
	})
	// Submit Card Holder Label
	$(document).on('submit', '#enter_card_label', function(e){
		e.preventDefault();
		$("#credit_card_label").val( $("#search_field").val() );
		$("#dialog-numpad-keyboard").jqxWindow('close');
	})
	// Submit Card Street Number
	$(document).on('submit', '#enter_card_number_street', function(e){
		e.preventDefault();
		$("#credit_card_number_street").val( $("#search_field").val() );
		$("#dialog-numpad-keyboard").jqxWindow('close');
	})
	// Submit Card ZipCode 
	$(document).on('submit', '#enter_card_zipcode', function(e){
		e.preventDefault();
		$("#credit_card_number_zipcode").val( $("#customer_card_field").val() );
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})
	// Submit Card CVV
	$(document).on('submit', '#enter_card_cvv', function(e){
		e.preventDefault();
		$("#credit_card_number_cvv").val( $("#customer_card_field").val() );
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})


	$(document).on("submit", "#enter_ccflastfourdigit", function(e){
		e.preventDefault();
		$("#ccflastfourdigit").val($("#customer_card_field").val());
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})

	$(document).on("submit", "#enter_ccfaddress", function(e){
		e.preventDefault();
		$("#ccfaddress").val($("#search_field").val());
		$("#dialog-numpad-keyboard").jqxWindow('close');
	})
	
	$(document).on("submit", "#enter_ccfzip", function(e){
		e.preventDefault();
		$("#ccfzip").val($("#customer_card_field").val());
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})

	$(document).on("submit", '#enter_ccfcvv', function(e){
		e.preventDefault();
		$("#ccfcvv").val($("#customer_card_field").val());
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})

	$(document).on("submit", '#enter_ccfexp', function(e){
		e.preventDefault();
		$("#ccfexp").val($("#customer_card_field").val());
		$("#dialog-numpad-customer-card").jqxWindow('close');
	})

	$(document).on('submit', '#enter_label', function(e){
		$("#label").val($("#search_field").val());
		$("#dialog-numpad-keyboard").jqxWindow('close');
	})
	
	$(document).on("click", "#customer_add_card_info .customer_card_prompt", function(){
		$('#dialog-customer-list').block({message: 'Please swipe the card'});

		var typed_payment = $("#amount_payment").val();
		var amountdue = $("#amountdue_total").val();

		var Type = SaleOnTheGoArray[13];
		var TypeName = SaleOnTheGoArray[1];
		var Unique = SaleOnTheGoArray[0];
		var SignatureAmount = SaleOnTheGoArray[6];
		var postdata ="CustomerUnique="+CustomerUnique; 
			postdata+="&PaymentUnique="+SaleOnTheGoArray[0];
			postdata+="&AmountDue="+amountdue;
			postdata+="&AmountEntered="+typed_payment;
			postdata+="&TypeName="+SaleOnTheGoArray[1];
			postdata+="&TranType="+SaleOnTheGoArray[2];
			postdata+="&InvokeControl="+SaleOnTheGoArray[3];
			postdata+="&MerchantID="+SaleOnTheGoArray[4];
			postdata+="&Type="+SaleOnTheGoArray[5];
			postdata+="&SignatureAmount="+SaleOnTheGoArray[6];
			postdata+="&SecureDevice="+SaleOnTheGoArray[7];
			postdata+="&ComPort="+SaleOnTheGoArray[8];
			postdata+="&Signature="+SaleOnTheGoArray[9];
			postdata+="&ReceiptPrint="+SaleOnTheGoArray[10];
			postdata+="&PaymentID="+SaleOnTheGoArray[11];
			postdata+="&Integrated="+SaleOnTheGoArray[12];
			postdata+="&LastFourDigit="+$("#ccflastfourdigit").val();
			postdata+="&Address="+$("#ccfaddress").val();
			postdata+="&Zip="+$("#ccfzip").val();
			postdata+="&CVV="+$("#ccfcvv").val();
			postdata+="&EXP="+$("#ccfexp").val();
			postdata+="&Label="+$("#label").val();
			postdata+="&AcctNo=Prompt";
		posData.AuthZero(postdata)
		.success(function(data){
			load_data2(data);
			var ResponseArray = [data.TextResponse, data.AmountApproved]; 
			var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
			$('#dialog-customer-list').unblock();
			if(data.AmountApproved){
				var msg = data.TextResponse+'<br/>';
				msg+= data.AmountApproved;
			}else{
				var msg= data.TextResponse;
			}
			
			NumpadPaymentAlertOk('payment_process', msg)
			.then(function(){
				WindowPopupPaymentAlert(TypeName + ' Payment');
			});

			setTimeout(function(){
				posData.ReloadItemZeroAuth()
				.success(function(idata){
					$scope.ordereditemlist = idata.ItemList;
				})
			},1000);
		}).then(function(){
			$("#load_card").html('');
			var postdata ="CustomerUnique="+CustomerUnique; 
			posData.CardHistory(postdata)
			.success(function(data){
				$("#load_card").append(data.html);
			})
		})

		$("#dialog-customer-add-card").jqxWindow("close");
	})

	$(document).on("click", "#customer_add_card_info .customer_card_swipe", function(){
		$('#dialog-customer-list').block({message: 'Please swipe the card'});

		var typed_payment = $("#amount_payment").val();
		var amountdue = $("#amountdue_total").val();
		
		var Type = SaleOnTheGoArray[13];
		var TypeName = SaleOnTheGoArray[1];
		var Unique = SaleOnTheGoArray[0];
		var SignatureAmount = SaleOnTheGoArray[6];
		var postdata ="CustomerUnique="+CustomerUnique; 
			postdata+="&PaymentUnique="+SaleOnTheGoArray[0];
			postdata+="&AmountDue="+amountdue;
			postdata+="&AmountEntered="+typed_payment;
			postdata+="&TypeName="+SaleOnTheGoArray[1];
			postdata+="&TranType="+SaleOnTheGoArray[2];
			postdata+="&InvokeControl="+SaleOnTheGoArray[3];
			postdata+="&MerchantID="+SaleOnTheGoArray[4];
			postdata+="&Type="+SaleOnTheGoArray[5];
			postdata+="&SignatureAmount="+SaleOnTheGoArray[6];
			postdata+="&SecureDevice="+SaleOnTheGoArray[7];
			postdata+="&ComPort="+SaleOnTheGoArray[8];
			postdata+="&Signature="+SaleOnTheGoArray[9];
			postdata+="&ReceiptPrint="+SaleOnTheGoArray[10];
			postdata+="&PaymentID="+SaleOnTheGoArray[11];
			postdata+="&Integrated="+SaleOnTheGoArray[12];
			postdata+="&LastFourDigit="+$("#ccflastfourdigit").val();
			postdata+="&Address="+$("#ccfaddress").val();
			postdata+="&Zip="+$("#ccfzip").val();
			postdata+="&CVV="+$("#ccfcvv").val();
			postdata+="&EXP="+$("#ccfexp").val();
			postdata+="&Label="+$("#label").val();
			postdata+="&AcctNo=SecureDevice";
		posData.AuthZero(postdata)
		.success(function(data){
			
			load_data2(data);
			var ResponseArray = [data.TextResponse, data.AmountApproved]; 
			var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
			$('#dialog-customer-list').unblock();
			if(data.AmountApproved){
				var msg = data.TextResponse+'<br/>';
				msg+= data.AmountApproved;
			}else{
				var msg= data.TextResponse;
			}
			
			NumpadPaymentAlertOk('payment_process', msg)
			.then(function(){
				WindowPopupPaymentAlert(TypeName + ' Payment');
			});
			
			setTimeout(function(){
				posData.ReloadItemZeroAuth()
				.success(function(idata){
					$scope.ordereditemlist = idata.ItemList;
				})
			},1000);
		}).then(function(){
			$("#load_card").html('');
			var postdata ="CustomerUnique="+CustomerUnique; 
			posData.CardHistory(postdata)
			.success(function(data){
				$("#load_card").append(data.html);
			})
		})

		$("#dialog-customer-add-card").jqxWindow("close");
	})
	

	$(document).on('click', "#customer_add_card_info .button_cancel", function(){
		$("#dialog-customer-add-card").jqxWindow("close");	
	})

	/*Light Plugin Create*/
	/*@Alert*/
	/*
	@param string form_name
	@param string msg
	*/
	var populateNumpadAlertCustomer = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#alert-customer-msg-popup").append('<div id="alert-customer-list-container" style="background: #144766; color:#EEE;"></div>');
			$("#alert-customer-list-container").html('');
			var html = '<form id="'+form_name+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="keyboard_customer_card_on_file"></div>'+
							'<input type="hidden" id="customer_card_onfile_input"/>'
						'</form>'
			$("#alert-customer-list-container").append(html);
			def.resolve();
		},100);
		return def.promise();
	}
	/*Popup Alert Yes or No*/
	var WindowPopupAlertYesNoCustomer = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#alert-customer-msg-popup").jqxWindow({
				height: 265,
				minWidth: 350,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#alert-customer-msg-popup').jqxWindow('setTitle', header_text);
			$('#alert-customer-msg-popup').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	/*Alert Setup*/
	/*
	@param string form
	@param string msg
	*/
	var NumpadAlertYesNoCustomer = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertCustomer(form, msg)
		.then(function(){
			$('#keyboard_customer_card_on_file').hdkeyboard({
			  layout: "custom5",
			  input: $('#customer_card_onfile_input')
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on("click", "#select_customer .delete_card", function(e){
		e.preventDefault();
		var optionid = $('input[type=radio][name=group_card_history]:checked').attr('id');
		if(optionid !== ''){
			var msg = 'Card on file will deleted permanently<br/>Are you sure?';
			NumpadAlertYesNoCustomer('card_on_file_delete', msg)
			.then(function(){
				WindowPopupAlertYesNoCustomer('Delete Card on File')
				.then(function(){

				})
			})
		}else{
			var msg = "Please select Card on File.";
			NumpadAlertOk('delete_cardonfile_process', msg)
			.then(function(){
				WindowPopupAlert("Delete Card On File Info");
			});
		}
	})

	$(document).on('click', "#card_on_file_delete .button_yes", function(e){
		e.preventDefault();
		var postdata = "CardOnFile="+CardId;
		posData.DeleteCardOnFile(postdata)
		.success(function(data){
			if(data.success == true){
				var postdata ="CustomerUnique="+CustomerUnique;
				posData.CardHistory(postdata)
				.success(function(data){
					$("#load_card").html('');
					$("#load_card").append(data.html);
					CardId = '';
				})
			}
			$('#alert-customer-msg-popup').jqxWindow('close');
		})
	})

	$(document).on('click', "#card_on_file_delete .button_no", function(e){
		e.preventDefault();
		$('#alert-customer-msg-popup').jqxWindow('close');
	})

	var SaleOnTheGoArray = [];
	var CardId = '';
	$(document).on('click', '.radio_card_history', function(){
		var id = $('input[type=radio][name=group_card_history]:checked').attr('id');
		CardId = id;
	});
 
 	$(document).on("click", "#select_customer .authorize_card", function(e){
		e.preventDefault();
		CardId = $('input[type=radio][name=group_card_history]:checked').attr('id');
		var typed_payment = $("#amount_payment").val();
		var amountdue = $("#amountdue_total").val();
		var Type = SaleOnTheGoArray[13];
		var TypeName = SaleOnTheGoArray[1];
		var Unique = SaleOnTheGoArray[0];
		var SignatureAmount = SaleOnTheGoArray[6];

		if(!CardId){
			var msg = 'Please select Customer Card';
			NumpadPaymentAlertOk('payment_process', msg)
			.then(function(){
				WindowPopupPaymentAlert(TypeName + ' Payment');
			});
			return false;
		}

		if(amountdue == 0){
			var msg = 'Cannot charge 0 amount to card on file.';
			NumpadPaymentAlertOk('payment_process', msg)
			.then(function(){
				WindowPopupPaymentAlert(TypeName + ' Payment');
			});
			return false;
		}

		// return false;
		if(CardId !== ''){
			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Processing please wait...' });
			$('#dialog-customer-list').jqxWindow('close');
			var postdata ="CustomerCardId="+CardId; //Customer_Card Unique
				postdata+="&PaymentUnique="+SaleOnTheGoArray[0]; //Config PaymentUnique;
				postdata+="&AmountDue="+amountdue;
				postdata+="&AmountEntered="+typed_payment;
				postdata+="&TypeName="+SaleOnTheGoArray[1];
				postdata+="&TranType="+SaleOnTheGoArray[2];
				postdata+="&InvokeControl="+SaleOnTheGoArray[3];
				postdata+="&MerchantID="+SaleOnTheGoArray[4];
				postdata+="&Type="+SaleOnTheGoArray[5];
				postdata+="&SignatureAmount="+SaleOnTheGoArray[6];
				postdata+="&SecureDevice="+SaleOnTheGoArray[7];
				postdata+="&ComPort="+SaleOnTheGoArray[8];
				postdata+="&Signature="+SaleOnTheGoArray[9];
				postdata+="&ReceiptPrint="+SaleOnTheGoArray[10];
				postdata+="&PaymentID="+SaleOnTheGoArray[11];
				postdata+="&Integrated="+SaleOnTheGoArray[12];
				postdata+="&CustomerUnique="+CustomerUnique; 

			if(CheckInvokeControl == 'MSRAUTH'){
				posData.CardPaymentOnTheGoAPI(postdata)
				.success(function(data){
					var msg = data.TextResponse;
					
					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						WindowPopupPaymentAlert(TypeName + ' Payment');
					});
					setTimeout($.unblockUI, 100); 
				})

			}else{
				posData.CardPaymentOnTheGo(postdata)
				.success(function(data){
					var ResponseArray = [data.TextResponse, data.AmountApproved]; 
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					//$('body').unblock();
					setTimeout($.unblockUI, 100); 
					if(data.AmountApproved){
						var msg = data.TextResponse+'<br/>';
							msg+= data.AmountApproved;
					}else{
						var msg ='';
							if(data.error_msg){
								msg+= data.error_msg+"<br/>";
							}
							msg+= data.TextResponse;
					}
					
					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						WindowPopupPaymentAlert(TypeName + ' Payment');
					});
					
					if(data.CmdStatus !== "Error"){
						$scope.payment = 0;
						load_data2(data);
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
							$("#amount_payment").focus();
						}
						GetSelectedCustomer();
						DisplayAllPayments();
						if(data.status == 13){
							if(typed_payment > 0){
								if(typed_payment >= SignatureAmount){
									setTimeout(function(){
										PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
										.done(function(){})
									},1000);
								}else{
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.payment_status);
								}
							}else{
								setTimeout(function(){
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){})
								},1000);
							}
						}
					}
					SaleOnTheGoArray = [];
					CardId = '';
					CustomerUnique = '';
				})
			}
		
		}else{
			var msg = 'Please select card first';
			NumpadAlertOk('customer_card_required', msg)
			.then(function(){
				WindowPopupAlert('Failed to continue');
			});
		}
 	})

	 var populateEditCustomerForm = function(form_name, data){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-edit-form").append('<div id="customer-edit-form-container" style="background: #144766; color: #fff;"></div>');
			$("#customer-edit-form-container").html('');
			$("#customer-edit-form-container").append(
			'<div style="width: 100%; overflow:hidden;">'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><span>First Name:</span> <input type="text" class="form-control" id="edit_firstname" value="'+data[1]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Last Name:</b> <input type="text" class="form-control" id="edit_lastname" value="'+data[2]+'" /></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Company:</b> <input type="text" class="form-control" id="edit_company" value="'+data[5]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Phone:</b> <input type="text" class="form-control" id="edit_phone" value="'+data[3]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Email:</b> <input type="text" class="form-control" id="edit_email" value="'+data[4]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Email2:</b> <input type="text" class="form-control" id="edit_email2" value="'+data[5]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Email3:</b> <input type="text" class="form-control" id="edit_email3" value="'+data[6]+'"/></div>'+
			'<div style="margin: 10px; width: 100%; font-size: 18px;"><b>Email4:</b> <input type="text" class="form-control" id="edit_email4" value="'+data[7]+'"/></div>'+
			'</div>'
			)
			$("#customer-edit-form-container").append(''+
				'<div style="width:100%; float:left;">'+
				'	<form id="'+form_name+'">'+
				'		<div id="keyboard_edit_customer_form"></div>'+
				'	</form>'+
				'</div>');
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupEditCustomerForm = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-customer-edit-form").jqxWindow({
				/*
				height: 450,
				width: 380,
				*/
				isModal: true,
				title: 'Edit Customer',
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-customer-edit-form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var EditCustomerFormView = function(form_name, data){
		var def = $.Deferred();
		populateEditCustomerForm(form_name, data)
		.then(function(){
			$('#keyboard_edit_customer_form').hdkeyboard({
				layout: "custom4",
				input: $('#customer_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on("click", "#select_customer .edit_form", function(){
		var data = CustomerProfileArray;
		if(data[0]){
			EditCustomerFormView('edit_customer', data)
			.then(function(){
				WindowPopupEditCustomerForm()
				.then(function(){
					$("#firstname").focus();
				})
			})
		}else{
			var msg = 'Select Customer first';
			NumpadAlertOk('select_customer_failed', msg)
			.then(function(){
				WindowPopupAlert('Failed to continue');
			});
		}
	})

	$(document).on('click', '#edit_customer .save_form', function(e){
		e.preventDefault();
		var data = CustomerProfileArray;
		var postdata ="FirstName="+$("#edit_firstname").val();
			postdata+="&LastName="+$("#edit_lastname").val();
			postdata+="&Phone="+$("#edit_phone").val();
			postdata+="&Email="+$("#edit_email").val();
			postdata+="&CustomerUnique="+data[0];
		var fullname = ($("#edit_firstname").val() + ' ' + $("#edit_lastname").val());
		if($("#edit_firstname").val() !== ''){
			$("#searchField").val(fullname);
			posData.UpdateCustomerProfile(postdata)
			.success(function(data){
				if(data.success){
					$(".save_form").text('');
					$(".save_form").append('<img src="'+base_url+'assets/img/symbol_check.png'+'" height="50" width="50" />');
					$(".save_form").removeClass('save_form');
					$("#ContentPanelContainer").html('');
					CustomerSaveThenSelect();
					setTimeout(function(){
						$("#dialog-customer-edit-form").jqxWindow('close');
					},1000);
				}
			}).then(function(){
				setTimeout(function(){
					$("#CustomerListName").jqxListBox({selectedIndex: 0 }); 
				},500);
			})
		}else{
			var msg = 'First name is required field';
			NumpadAlertOk('customer_firstname_required', msg)
			.then(function(){
				WindowPopupAlert('Failed to continue');
			});
		}
	})

	$(document).on("click", "#edit_customer .button_cancel", function(){
		$("#dialog-customer-edit-form").jqxWindow('close');
	})
 
	/*
	*@param string title - Header Name of popup window
	*@param boolean method - Open or Close state
	*@param string info - Message
	*/
	var AlertDialog = function(title, method, info){
		$scope.alert = {
		message: info
		};
		AlertProcessdialog.setTitle(title);
		if(method){
			AlertProcessdialog.open();
		}else{
			AlertProcessdialog.close();
		}
	}
  
	var CheckBalanceAfterPayment = function(){
		var def = $.Deferred();
		posData.CheckBalance()
		.success(function (data) {
			if(data.balance == false) {
				def.resolve();
			}
		}); 
		return def.promise();
	}

	var index = 0,
	ordertypelist = [],
	ordertypeid = [],
	ordertyperef = [],
	OrderTypeDefault = '';
	var ordertype2 = function(){
		var def = $.Deferred();
		ordertypelist = [];
		ordertypeid = [];
		ordertyperef = [];
		
		posData.OrderTypeList()
		.success(function(data){
			$.each(data, function(index, value){
				ordertypelist.push(value.Type);
				ordertypeid.push(value.Unique);
				ordertyperef.push(value.Description);
				if(value.Default == 1){
					if(value.CurrentType == null){
						OrderTypeDefault = value.Type;
					}else{
						OrderTypeDefault = value.CurrentType;
					}
				}
			})
			def.resolve(data);
		}).then(function(){
			var ordertypelistIndex = ordertypelist.indexOf(OrderTypeDefault);
			var SelectedOrderType = ordertypeid[ordertypelistIndex];
			var ordertypeRef = ordertyperef.indexOf(OrderTypeDefault);
			$("#OrderType").val(SelectedOrderType);
			$("#OrderType").text(OrderTypeDefault);
			$("#OrderTypeName").val(ordertypeRef);
			ordertypeSel =  ordertypeid[ordertypelistIndex];
			ordertypeSelName = ordertyperef.indexOf(OrderTypeDefault);
		})
		return def.promise();
	}

	var OrderTypeID = '';
	$(document).on('click', '.radio_ordertype', function(){
		var id = $('input[type=radio][name=group1]:checked').attr('id');
		OrderTypeID = id;
	});

	$(document).on("submit", "#OrderTypePopup", function(e){
		e.preventDefault();
		if(OrderTypeID > 0){
			DisableNumpadEasyButtons(true);
			$("#OrderType").val(OrderTypeID);
			var postdata ="OrderType="+OrderTypeID;
			posData.UpdateOrderNo(postdata)
			.success(function(data){
				ordertype2();
			});
			$("#ordertype-popup").jqxWindow('close');
			setTimeout(function(){
				TransPayment(OrderTypeArray[0], OrderTypeArray[1], OrderTypeArray[2],OrderTypeArray[3],OrderTypeArray[4],OrderTypeArray[5],OrderTypeArray[6],OrderTypeArray[7],OrderTypeArray[8], OrderTypeArray[9], OrderTypeArray[10],OrderTypeArray[11],OrderTypeArray[12],OrderTypeArray[13],OrderTypeArray[14],OrderTypeArray[15], OrderTypeArray[16], OrderTypeArray[17], OrderTypeArray[18], OrderTypeArray[19], OrderTypeArray[20], OrderTypeArray[21], OrderTypeArray[22], OrderTypeArray[23], OrderTypeArray[24]);
				OrderTypeArray = [];
			},500);
		}else{
			var msg = "Select Order Type";
			NumpadAlertClose('ordertype_options', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});
		}
	})

	var PaymentTypeFunction = function(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip){
		var OrderTypePopup = $("#POSOrderTypeRequired").val();
		var $this = $(".btnpayment"); 
		$this.attr({"disabled": true});
		if(TranType == 'EBT' && $scope.EnforceEBT == 1){
			var postdata ="EnterAmount=" + $("#amount_payment").val();
				postdata+="&AmountDue=" + $("#amountdue_total").val();
			posData.EBTCheck(postdata)
			.success(function(data){
				if(data.success == true){
					if(data.process == true){
						//Process to remove tax
						if(OrderTypePopup > 0){
							if($("#OrderTypeName").val() <= 0){
								OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								posData.OrderTypePopupList()
								.success(function(data){
									if(data.OrderType == null || data.OrderType == ''){
										OrderTypeID = data.Default;
										OrderTypeWindow('OrderTypePopup', data.html)
										.then(function(){
											WindowPopupOrderType('Order type')
											$(".keypad-buttons").attr("disabled", false);
										})
										setTimeout(function(){
											$(".btnpayment").attr({"disabled": false});
										},1000);
									}else{
										TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
									}
								})
							}else{
								TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							}
						}else{
							TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					}else{
						var msg = data.msg;
						NumpadAlertClose ('no_ebt_cannot_process', msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						});	
					}
				}else{
					var msg = data.msg;
					NumpadAlertClose('no_ebt_item_found', msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					});
				}	 
			})
		}else{
			if(OrderTypePopup > 0){
				if($("#OrderTypeName").val() <= 0){
					OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					posData.OrderTypePopupList()
					.success(function(data){
						if(data.OrderType == null || data.OrderType == ''){
							OrderTypeID = data.Default;
							OrderTypeWindow('OrderTypePopup', data.html)
							.then(function(){
								WindowPopupOrderType('Order type')
								DisableNumpadEasyButtons(false);
							})
							setTimeout(function(){
								$(".btnpayment").attr({"disabled": false});
							},1000);
						}else{
							TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					})
				}else{
					TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
				}
			}else{
				TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
			}
		}
	}

	var DisableNumpadEasyButtons = function(status){
		$(".easy-payment-button").attr("disabled", status);
		$(".keypad-buttons").attr("disabled", status);
		$(".easy-payment-round-up").attr("disabled", status);
	}

	$scope.FunctionButton 		 = ''; 
	var OrderTypeArray 		 = [];
	var payment_method_array = [];
	var CheckInvokeControl   = '';
	$scope.CustomerType = '';
	var DisableDoubleClickPayment = false;
  	$scope.PaymentType = function(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip){
		OrderTypeArray 		 = [];
		payment_method_array = [];
		payment_method_array.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
		
		if(DisableDoubleClickPayment){
			return;
		}

		DisableDoubleClickPayment = true;

		setTimeout(function(){
			DisableDoubleClickPayment = false;
		},2000)

		$scope.CustomerType = CustomerType;
		CheckInvokeControl = InvokeControl;
		DisableNumpadEasyButtons(true);
		
		if(SecurityLevel == 1){ //Payment Method SecurityLevel
			var TotalAmountState = $("#amountdue_total").val();
			
			// Required Customer
			if(Customerfield == 1){
				if($scope.customer.id == null || $scope.customer.id == ''){
					CallCustomerWindowPopup();
					DisableNumpadEasyButtons(false);

					return false;
				}else{
					if($("#AccountStatus").val() == 'Active' || $("#AccountStatus").val() == 'On Account' || $("#AccountStatus").val() == ''){
						
						var postdata ="FunctionButton=PaymentMethod";
						posData.CheckUserManagerCookie(postdata)
						.success(function(data){
							if(data.prompt){
								NumpadPasscode('payment_method_security')
								.then(function(){
									WindowPopupPasscode('Payment Method Security')
									.then(function(){
										$("#number_field").focus();
									})
								})
							}else{
								if(TotalAmountState < 0){ //Refund Amount
									var postdata ="FunctionButton=PaymentMethodRefund";
									posData.CheckUserManagerCookie(postdata)
									.success(function(data){
										if(data.Limit != 0){
											// Check Total amount due if greater than to Limit value. 
											if(( parseFloat(TotalAmountState) *-1) >= parseFloat(data.Limit)){
												NumpadPasscode('refund_payment_security')
												.then(function(){
													WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
													.then(function(){
														$("#number_field").focus();
													})
												})
		
												return;
											}else{
												PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
											}
										}else{
											PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);	
										}
									})
								}else{
									PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);	
								}
							}
						})
					}else{
						var msg = "Payment requires customer to be "+$("#AccountStatus").val();
						NumpadAlertClose ('account_status_not_valid', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}
				}

			// Required Customer
			}else if(Customerfield == 2){
				if($scope.customer.id == null || $scope.customer.id == ''){
					CallCustomerWindowPopup();
					DisableNumpadEasyButtons(false);
				}else{
					if($("#AccountStatus").val() == 'On Account' || $("#AccountStatus").val() == ''){
						var postdata ="FunctionButton=PaymentMethod";
						posData.CheckUserManagerCookie(postdata)
						.success(function(data){
							if(data.prompt){
								NumpadPasscode('payment_method_security')
								.then(function(){
									WindowPopupPasscode('Payment Method Security')
									.then(function(){
										$("#number_field").focus();
									})
								})
							}else{
								if(TotalAmountState < 0){ //Refund Amount
									var postdata ="FunctionButton=PaymentMethodRefund";
									posData.CheckUserManagerCookie(postdata)
									.success(function(data){
										if(data.Limit != 0){
											// Check Total amount due if greater than to Limit value. 
											if(( parseFloat(TotalAmountState) *-1) >= parseFloat(data.Limit)){
												NumpadPasscode('refund_payment_security')
												.then(function(){
													WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
													.then(function(){
														$("#number_field").focus();
													})
												})
		
												return;
											}else{
												PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
											}
										}else{
											PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);	
										}
									})
								}else{
									PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);	
								}
							}
						})
					}else{
						var msg = "Customer is <b>"+ $("#AccountStatus").val()+"</b><br/><br/>"; 
							msg+= "Active or On Account status required"+"<br/><br/>";
							msg+= "Please update status or pick different payment";	
						NumpadAlertClose ('account_status_not_valid', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}
				}
			}else{

				var postdata ="FunctionButton=PaymentMethod";
				posData.CheckUserManagerCookie(postdata)
				.success(function(data){
					if(data.prompt){
						NumpadPasscode('payment_method_security')
						.then(function(){
							WindowPopupPasscode('Payment Method Security')
							.then(function(){
								$("#number_field").focus();
							})
						})
					}else{
						PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					}
				})
			}
		}else{ //SecurityLevel End
			
			if(Customerfield == 1){
				if($scope.customer.id == null || $scope.customer.id == ''){
					CallCustomerWindowPopup();
					DisableNumpadEasyButtons(false);
				}else{
					if( $("#AccountStatus").val() == 'Active' || $("#AccountStatus").val() == 'On Account ' || $("#AccountStatus").val() == ''){
						var TotalAmountState = $("#amountdue_total").val();
						if(TotalAmountState < 0){
							payment_method_array = [];
							payment_method_array.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							// Check payment security for Refund due amount.
							// Checking here if prompt = 1 or Limit is >= Refund due amount then
							// security will prompt automatically.
							var postdata ="FunctionButton=PaymentMethodRefund";
							posData.CheckUserManagerCookie(postdata)
							.success(function(data){
								if(data.prompt || (TotalAmountState *-1) >= parseFloat(data.Limit) && parseFloat(data.Limit) != 0){
									$scope.FunctionButton = 'PaymentMethodRefund';
									NumpadPasscode('refund_payment_security')
									.then(function(){
										WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit )
										.then(function(){
											$("#number_field").focus();
										})
									})
								}else{
									PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								}	
							})
							return;
						}else{
							PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					}else{
						var msg = "Customer is <b>"+ $("#AccountStatus").val()+"</b><br/><br/>"; 
							msg+= "Active or On Account status required"+"<br/><br/>";
							msg+= "Please update status or pick different payment";
						NumpadAlertClose ('account_status_not_valid', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}
				}
			}else if(Customerfield == 2){
				if($scope.customer.id == null || $scope.customer.id == ''){
					console.log("popup here customer2");
					CallCustomerWindowPopup();
					DisableNumpadEasyButtons(false);
				}else{
					if($("#AccountStatus").val() == 'On Account' || $("#AccountStatus").val() == ''){
						var TotalAmountState = $("#amountdue_total").val();
						if(TotalAmountState < 0){
							payment_method_array = [];
							payment_method_array.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							// Check payment security for Refund due amount.
							// Checking here if prompt = 1 or Limit is >= Refund due amount then
							// security will prompt automatically.
							var postdata ="FunctionButton=PaymentMethodRefund";
							posData.CheckUserManagerCookie(postdata)
							.success(function(data){
								if(data.prompt || (TotalAmountState *-1) >= parseFloat(data.Limit) && parseFloat(data.Limit) != 0){
									$scope.FunctionButton = 'PaymentMethodRefund';
									NumpadPasscode('refund_payment_security')
									.then(function(){
										WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
										.then(function(){
											$("#number_field").focus();
										})
									})
								}else{
									PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								}	
							})
							return;
						}else{
							PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					}else{
						var msg = "Customer is <b>"+ $("#AccountStatus").val()+"</b><br/><br/>"; 
							msg+= "On Account status required"+"<br/><br/>";
							msg+= "Please update status or pick different payment";
						NumpadAlertClose ('account_status_not_valid', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}
				}
			// No Customer
			}else{
				var TotalAmountState = $("#amountdue_total").val();
				if(TotalAmountState < 0){

					payment_method_array = [];
					payment_method_array.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					// Check payment security for Refund due amount.
					// Checking here if prompt = 1 or Limit is >= Refund due amount then
					// security will prompt automatically.
					var postdata ="FunctionButton=PaymentMethodRefund";
					posData.CheckUserManagerCookie(postdata)
					.success(function(data){
						if(data.prompt || (TotalAmountState *-1) >= parseFloat(data.Limit) && parseFloat(data.Limit) != 0){
							$scope.FunctionButton = 'PaymentMethodRefund';
							NumpadPasscode('refund_payment_security')
							.then(function(){
								WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
								.then(function(){
									$("#number_field").focus();
								})
							})
						}else{
							RefundSecurityCheck(payment_method_array);
						}	
					})
					return;
				}
				

				var OrderTypePopup = $("#POSOrderTypeRequired").val();
				var $this = $(".btnpayment"); 
				$this.attr({"disabled": true});
				if(TranType == 'EBT' && $scope.EnforceEBT == 1){
					var postdata ="EnterAmount="+$("#amount_payment").val();
						postdata+="&AmountDue="+$("#amountdue_total").val();
					posData.EBTCheck(postdata)
					.success(function(data){
						if(data.success == true){
							if(data.process == true){
								//Process to remove tax
								if(OrderTypePopup > 0){
									if($("#OrderTypeName").val() <= 0){
										OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
										posData.OrderTypePopupList()
										.success(function(data){
											if(data.OrderType == null || data.OrderType == ''){
												OrderTypeID = data.Default;
												OrderTypeWindow('OrderTypePopup', data.html)
												.then(function(){
														WindowPopupOrderType('Order type')
												})
												setTimeout(function(){
														$(".btnpayment").attr({"disabled": false});
														$(".keypad-buttons").attr("disabled", false);
												},1000);
											}else{
												TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
											}
										})
									}else{
										TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
									}
								}else{
									TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								}
							}else{
								var msg = data.msg;
								NumpadAlertClose ('no_ebt_cannot_process', msg)
								.then(function(){
										WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								});	
								$(".keypad-buttons").attr("disabled", false);
							}
						}else{
							var msg = data.msg;
							NumpadAlertClose('no_ebt_item_found', msg)
							.then(function(){
									WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							});
							$(".keypad-buttons").attr("disabled", false);
						}	 
					})
				}else{
					if(OrderTypePopup > 0){
						if($("#OrderTypeName").val() <= 0){
							OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							posData.OrderTypePopupList()
							.success(function(data){
								if(data.OrderType == null || data.OrderType == ''){
									OrderTypeID = data.Default;
									OrderTypeWindow('OrderTypePopup', data.html)
									.then(function(){
										WindowPopupOrderType('Order type')
									})
									setTimeout(function(){
										$(".btnpayment").attr({"disabled": false});
										DisableNumpadEasyButtons(false);
									},1000);
								}else{
									TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								}
							})
						}else{
							TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					}else{
						TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					}
				}
			}//Customerfield
		}	
	};

	var PaymentSecurityLevel = () => {
		var Id = payment_method_array[0];
		var Name = payment_method_array[1];
		var Integrate = payment_method_array[2];
		var TranType = payment_method_array[3];
		var InvokeControl = payment_method_array[4];
		var MerchantID = payment_method_array[5];
		var EBT = payment_method_array[6];
		var Type = payment_method_array[7];
		var SignatureAmount = payment_method_array[8];
		var SecureDevice = payment_method_array[9];
		var ComPort = payment_method_array[10];
		var Signature = payment_method_array[11];
		var ReceiptPrint = payment_method_array[12];
		var CardType = payment_method_array[13];
		var ConfaymentUnique = payment_method_array[14];
		var Demand = payment_method_array[15];
		var SupressAmount = payment_method_array[16];
		var SecurityLevel = payment_method_array[17];
		var Customerfield = payment_method_array[18];
		var Gratuity = payment_method_array[19];
		var ConfirmPayment = payment_method_array[20];
		var CustomerType = payment_method_array[21];
		var SurgechargePercent = payment_method_array[22];
		var SignatureAmountChip = payment_method_array[23];
		var TotalAmountState = $("#amountdue_total").val();
		if(Customerfield == 1){
			if($scope.customer.id == null || $scope.customer.id == ''){
				CallCustomerWindowPopup();
				DisableNumpadEasyButtons(false);
			}else{
				if($("#AccountStatus").val() == 'Active' || $("#AccountStatus").val() == 'On Account' || $("#AccountStatus").val() == ''){
					var postdata ="FunctionButton=PaymentMethodRefund";
					posData.CheckUserManagerCookie(postdata)
					.success(function(data){
						if(data.Limit != 0){
							if(( parseFloat(TotalAmountState) *-1) >= parseFloat(data.Limit)){
								NumpadPasscode('refund_payment_security')
								.then(function(){
									WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
									.then(function(){
										$("#number_field").focus();
									})
								})

								return;
							}else{
								PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							}
						}else{
							PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					})

				}else{
					var msg = "Payment requires customer to be "+$("#AccountStatus").val();
					NumpadAlertClose ('account_status_not_valid', msg)
					.then(function(){
						WindowPopupAlert("Info");
					})
				}
			}
		}else if(Customerfield == 2){
			if($scope.customer.id == null || $scope.customer.id == ''){
				CallCustomerWindowPopup();
				DisableNumpadEasyButtons(false);
			}else{
				if($("#AccountStatus").val() == 'On Account' || $("#AccountStatus").val() == ''){
					var postdata ="FunctionButton=PaymentMethodRefund";
					posData.CheckUserManagerCookie(postdata)
					.success(function(data){
						if(data.Limit != 0){
							if(( parseFloat(TotalAmountState) *-1) >= parseFloat(data.Limit)){
								NumpadPasscode('refund_payment_security')
								.then(function(){
									WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
									.then(function(){
										$("#number_field").focus();
									})
								})

								return;
							}else{
								PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							}
						}else{
							PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					})
				}else{
					var msg = "Customer is <b>"+ $("#AccountStatus").val()+"</b><br/><br/>"; 
						msg+= "Active or On Account status required"+"<br/><br/>";
						msg+= "Please update status or pick different payment";	
					NumpadAlertClose ('account_status_not_valid', msg)
					.then(function(){
						WindowPopupAlert("Info");
					})
				}
			}
		}else{
			var postdata ="FunctionButton=PaymentMethodRefund";
			posData.CheckUserManagerCookie(postdata)
			.success(function(data){
				if(data.Limit != 0){
					if(( parseFloat(TotalAmountState) *-1) >= parseFloat(data.Limit)){
						NumpadPasscode('refund_payment_security')
						.then(function(){
							WindowPopupPasscode('Payment Method Refund Security | Limit '+ data.Limit)
							.then(function(){
								$("#number_field").focus();
							})
						})

						return;
					}else{
						PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					}
				}else{
					PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
				}
			})
		}
	}

	$(document).on('submit', '#payment_method_security', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
			var passcode = CRP.converted;
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+$scope.FunctionButton;
			posData.UserSecurityLevel(postdata)
			.success(function(data){
				if(data.success){
					if(data.authorize_manager){
						PaymentSecurityLevel();
					}else{
						NumpadAlertClose('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				}else{
					NumpadAlertClose('payment_method_security_invalid',data.msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					});
				}
				$("#dialog-numpad-passcode").jqxWindow('close');
			})
		}else{
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('payment_method_security_invalid', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});
			$("#dialog-numpad-passcode").jqxWindow('close');
		}
	})

	$(document).on('submit', '#security_level_position', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
			var passcode = CRP.converted;//$("#number_field").val();
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+$scope.FunctionButton;
			posData.UserSecurityLevel(postdata)
			.success(function(data){
				if(data.success){
					if(data.authorize_manager){
						var Id = payment_method_array[0];
						var Name = payment_method_array[1];
						var Integrate = payment_method_array[2];
						var TranType = payment_method_array[3];
						var InvokeControl = payment_method_array[4];
						var MerchantID = payment_method_array[5];
						var EBT = payment_method_array[6];
						var Type = payment_method_array[7];
						var SignatureAmount = payment_method_array[8];
						var SecureDevice = payment_method_array[9];
						var ComPort = payment_method_array[10];
						var Signature = payment_method_array[11];
						var ReceiptPrint = payment_method_array[12];
						var CardType = payment_method_array[13];
						var ConfaymentUnique = payment_method_array[14];
						var Demand = payment_method_array[15];
						var SupressAmount = payment_method_array[16];
						var SecurityLevel = payment_method_array[17];
						var Customerfield = payment_method_array[18];
						var Gratuity = payment_method_array[19];
						var ConfirmPayment = payment_method_array[20];
						var CustomerType = payment_method_array[21];
						var SurgechargePercent = payment_method_array[22];
						var SignatureAmountChip = payment_method_array[23];

						PaymentTypeFunction(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					}else{
						NumpadAlertClose('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				}else{
					NumpadAlertClose('payment_method_security_invalid',data.msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					});
				}
				$("#dialog-numpad-passcode").jqxWindow('close');
			})
		}else{
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('payment_method_security_invalid', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});
			$("#dialog-numpad-passcode").jqxWindow('close');
		}
	})

	$(document).on('submit', '#refund_payment_security', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
			var passcode = CRP.converted;//$("#number_field").val();
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+$scope.FunctionButton;
			posData.PaymentRefundSecurity(postdata)
			.success(function(data){
				if(data.success){
					if(data.authorize_manager){
						RefundSecurityCheck(payment_method_array);
					}else{
						NumpadAlertClose('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				}else{
					NumpadAlertClose('payment_method_security_invalid',data.msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					});
				}
				$("#dialog-numpad-passcode").jqxWindow('close');
			})
		}else{
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('payment_method_security_invalid', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});
			$("#dialog-numpad-passcode").jqxWindow('close');
		}
	})
	  
	var RefundSecurityCheck = (arrdata) => {
		var Id = arrdata[0];
		var Name = arrdata[1];
		var Integrate = arrdata[2];
		var TranType = arrdata[3];
		var InvokeControl = arrdata[4];
		var MerchantID = arrdata[5];
		var EBT = arrdata[6];
		var Type = arrdata[7];
		var SignatureAmount = arrdata[8];
		var SecureDevice = arrdata[9];
		var ComPort = arrdata[10];
		var Signature = arrdata[11];
		var ReceiptPrint = arrdata[12];
		var CardType = arrdata[13];
		var ConfaymentUnique = arrdata[14];
		var Demand = arrdata[15];
		var SupressAmount = arrdata[16];
		var SecurityLevel = arrdata[17];
		var Customerfield = arrdata[18];
		var Gratuity = arrdata[19];
		var ConfirmPayment = arrdata[20];
		var CustomerType = arrdata[21];
		var SurgechargePercent = arrdata[22];
		var SignatureAmountChip = arrdata[23];
 		var OrderTypePopup = $("#POSOrderTypeRequired").val();
		var $this = $(".btnpayment"); 
		$this.attr({"disabled": true});
		if(TranType == 'EBT' && $scope.EnforceEBT == 1){
			var postdata ="EnterAmount="+$("#amount_payment").val();
				postdata+="&AmountDue="+$("#amountdue_total").val();
			posData.EBTCheck(postdata)
			.success(function(data){
				if(data.success == true){
					if(data.process == true){
						//Process to remove tax
						if(OrderTypePopup > 0){
							if($("#OrderTypeName").val() <= 0){
								OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
								posData.OrderTypePopupList()
								.success(function(data){
									if(data.OrderType == null || data.OrderType == ''){
										OrderTypeID = data.Default;
										OrderTypeWindow('OrderTypePopup', data.html)
										.then(function(){
											WindowPopupOrderType('Order type')
										})
										setTimeout(function(){
											$(".btnpayment").attr({"disabled": false});
											$(".keypad-buttons").attr("disabled", false);
										},1000);
									}else{
										TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
									}
								})
							}else{
								TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
							}
						}else{
							TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					}else{
						var msg = data.msg;
						NumpadAlertClose ('no_ebt_cannot_process', msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						});	
						$(".keypad-buttons").attr("disabled", false);
					}
				}else{
					var msg = data.msg;
					NumpadAlertClose('no_ebt_item_found', msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					});
					$(".keypad-buttons").attr("disabled", false);
				}	 
			})
		}else{
			if(OrderTypePopup > 0){
				if($("#OrderTypeName").val() <= 0){
					OrderTypeArray.push(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
					posData.OrderTypePopupList()
					.success(function(data){
						if(data.OrderType == null || data.OrderType == ''){
							OrderTypeID = data.Default;
							OrderTypeWindow('OrderTypePopup', data.html)
							.then(function(){
									WindowPopupOrderType('Order type')
							})
							setTimeout(function(){
									$(".btnpayment").attr({"disabled": false});
									DisableNumpadEasyButtons(false);
							},1000);
						}else{
							TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
						}
					})
				}else{
					TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
				}
			}else{
				TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
			}
		}
	}

	$(document).on("click", "#payment_method_security_invalid .alert_close", function(){
		$("#number_field").val('');
		setTimeout(function(){
			$("#number_field").focus();
		},100);
	}) 

	/*
	*@param string title - Header Name of the popup window
	*@param boolean method - Open and Close state
	*@param string info - Message
	*@param boolean btndisplay - Button Display
	*/
	var DisplayCreditCardProcess = function(title, method, info, btndisplay){
		var allinfo='';
		var info1 = info[0]; 
		if(info[1]){
			var info2 = info[1];
			allinfo = info2+"<br/><br/>";
			allinfo+= info1;
		}else{
			allinfo = info1;
		}
			
		$scope.creditcardprocess = {
			message: allinfo 
		} 
		$scope.BtnCreditCardOkWhen = btndisplay;
		CreditCardProcessdialog.setTitle(title);
		if(method){
			CreditCardProcessdialog.open();	
		}else{
			CreditCardProcessdialog.close();		
		}
	}
	
	var PoleDisplayPaymentMethod = function(id){
		var def = $.Deferred();
		var postdata="receipt_payment_unique="+id;
		posData.PoleDispPayment(postdata)
		.success(function(data){
			if(data.pole_display == false){
				NumpadAlertOkPoleDisplay('pole_display_error', data.pole_display_msg)
				.then(function(){
					WindowPopupAlertPoleDisplay('Pole Display Warning');
				})
			}
			def.resolve();
		})
		return def.promise();	
	}

	var SwipeCardFormArray = [];
  var TransPayment = function(Unique, TypeName, Integrated, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip){
		SwipeCardFormArray.push(Unique, TypeName, Integrated, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, CardType, ConfaymentUnique, Demand, SupressAmount, SecurityLevel, Customerfield, Gratuity, ConfirmPayment, CustomerType, SurgechargePercent, SignatureAmountChip);
		if(Integrated == 1){
			SwipeCardFrom('swipecard_form')
			.then(function(){
				WindowSwipeCardForm()
				.then(function(){
					setTimeout(function(){
						$("#credit_card_number").focus();
					},100);
				});
			})
		}else if(Integrated == 2){
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $("#amountdue_total").val();
			var amountdue = $("#amountdue_total").val();
			var process = true;
			
			if(amountdue < 0){
				var newAmountDue = amountdue * -1; //For computation use only
				if(typed_payment > newAmountDue){
					var msg = "Payment amount cannot exceed Refund amount.";
					NumpadAlertOk('item_note_alert', msg)
					.then(function(){
						WindowPopupAlert('Refund')
					});

					process = false;
				}else{
					process = true;
				}	 
			}else if(amountdue > 0){
				if(typed_payment > amountdue){
					var msg = "Payment amount cannot exceed Total amount.";
					NumpadAlertOk('item_note_alert', msg)
					.then(function(){
						WindowPopupAlert('Payment')
					});
					process = false;
				}else{
					process = true;
				}
			}
		
			if(typed_payment > 0){
				if(typed_payment >= SignatureAmount){
					PrintReceiptBySignatureAmount = true;
				}else if(amountdue < 0){
					PrintReceiptBySignatureAmount = true;
				}
			}else{
				if(amountdue >= SignatureAmount){
					PrintReceiptBySignatureAmount = true;
				}else if(amountdue < 0){
					PrintReceiptBySignatureAmount = true;
				}
			}
		
			if(process == true){ 
				SignatureData = null;
				var ProcessArray = ['Processing Please wait...'];	
				$.blockUI({ css: { 
					border: '2px solid #fff',
					padding: '15px', 
					backgroundColor: '#210e66', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					opacity: 1, 
					color: '#fff',
					fontSize: '20px' 
				}, message: 'Processing please wait...' }); 

				$(".btnpayment").attr({"disabled": false});

				var postdata  = "PaymentUnique="+Unique;
					postdata += "&AmountDue="+amountdue;
					postdata += "&AmountEntered="+typed_payment;
					postdata += "&TypeName="+TypeName;
					postdata += "&TranType="+TranType;
					postdata += "&InvokeControl="+InvokeControl;
					postdata += "&MerchantID="+MerchantID;
					postdata += "&Integrated="+Integrated;
					postdata += "&SecureDevice="+SecureDevice;
					postdata += "&ComPort="+ComPort;
					postdata += "&Signature="+Signature;
					postdata += "&SignatureAmount="+SignatureAmount;
					postdata += "&CardType="+CardType;
					postdata += "&PaymentID="+ConfaymentUnique;
					postdata += "&Demand="+Demand;
					postdata += "&SupressAmount="+SupressAmount;
					postdata += "&OrderType="+$("#OrderType").val();
					postdata += "&Gratuity="+Gratuity;
					postdata += "&SurgechargePercent="+SurgechargePercent;
					postdata += "&SignatureAmountChip="+SignatureAmountChip;

				posData.ProcessCreditCard(postdata)
				.success(function(data){
					var ResponseArray = [data.TextResponse, data.AmountApproved]; 
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					setTimeout($.unblockUI, 100); 
					if(data.AmountApproved){
						var include_message = '';
						if(data.CardHolderName != ''){
							include_message = '<br><br><span style="font-weight: bold;">'+data.CardHolderName+'</span>';
						}

						var msg ='<span style="font-weight: bold;">'+data.TextResponse+'</span><br/>';
							msg+=data.AmountApproved;
							msg+=include_message;
					}else{
						var msg = '<span style="font-weight: bold; color: yellow;">'+data.CmdStatus+'</span><br><br>';
							msg+= data.TextResponse;
					}

					$scope.Signature_type = data.signature_type;
					$scope.SignatureReceiptPaymentUnique = data.ReceiptPaymentUnique;

					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						if(data.CmdStatus !== 'Error'){
							$("#keyboard").html('');
							$("#keyboard").append(
								'<div style="position:absolute; bottom: 0; width: 98%; text-align:right;">'+
									'<button class="btn btn-success btn-lg glyphicon glyphicon-print paymentReprintButton" id="'+data.ReceiptPaymentUnique+'='+Unique+'"></button>&nbsp;&nbsp;'+
									'<button class="btn btn-danger btn-lg glyphicon glyphicon-remove" id="paymentCloseButton"></button>'+
								'</div>'
							)
						}
						WindowPopupPaymentAlert(TypeName + ' Payment');
					});
					
					if(data.CmdStatus !== "Error"){
						$scope.payment = 0;
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
							$("#amount_payment").focus();
						}
						DisableNumpadEasyButtons(false);
						load_data2(data);
						SignatureData = data;
						// DisplayAllPayments();
						if(amountdue < 0){
							typed_payment = typed_payment * -1;
							amountdue = amountdue * -1;
						}
						
						if(data.status == 12){
							if(typed_payment > 0){
								if(typed_payment >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
									setTimeout(function(){
										if(data.signature && data.signature_type == 1){
											NumpadSignature('signature_ok')
											.then(function(){
												WindowPopupSignature('Signature')
												.then(function(){
													$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
													$("#signature_unique").val(Unique);
													$("#signature_status").val(data.status);
													$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
													$("#signature_amount").val(SignatureAmount);
													$("#signature_typePayment").val(typed_payment);
													$("#signature_amountdue").val( $("#amount_payment").val() );
													$("#signature_data").val(data);
													$("#signature_type").val(1);
												})
											})
										}else if(data.signature && data.signature_type == 2){
											conn.send(JSON.stringify(["Signature", data.ReceiptPaymentUnique, $scope.station_un, data.receipt_header_unique]));
											NumpadSignature('signature_ok')
											.then(function(){
												WindowPopupSignature('Signature')
												.then(function(){
													$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
													$("#signature_unique").val(Unique);
													$("#signature_status").val(data.status);
													// $("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
													$("#signature").attr({"src": base_url+"assets/img/hourglass.gif?"+Math.random(), "width":"48", "height":"48"});
													$("#signature_message_view").show();
													$("#signature_message").text("Ask customer to sign.");
													$(".signature_clear").hide();
													$(".signature_accept").hide();
													$("#signature_amount").val(SignatureAmount);
													$("#signature_typePayment").val(typed_payment);
													$("#signature_amountdue").val( $("#amount_payment").val() );
													$("#signature_type").val(2);
													$("#signature_receipt_header_unique").val(data.receipt_header_unique);
												})
											})
										}else{
											//Typed Payment with Signature amount no Signature capture"
											setTimeout($.unblockUI, 100); 
											ordertype2();
											if($("#TableOrder").val() == 1){
												if($("#PoleDisplay").val() == 2){
													if(ConnectionPoleDisplay){
														tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
													}
												}
											}
										}
									},1000);
								}else{
									//Typed Payment Without Signature Amount and no Signature Capture
									setTimeout($.unblockUI, 100); 
									ordertype2();
									if($("#TableOrder").val() == 1){
										if($("#PoleDisplay").val() == 2){
											if(ConnectionPoleDisplay){
												tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
											}
										}
									}
								}
							}else{
								if(amountdue >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
									setTimeout(function(){ //e.g 11.00 >= 10.00 = true then print the receipt.
										if(data.signature && data.signature_type == 1){
											NumpadSignature('signature_ok')
											.then(function(){
												WindowPopupSignature('Signature')
												.then(function(){
													$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
													$("#signature_unique").val(Unique);
													$("#signature_status").val(data.status);
													$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
													$("#signature_amount").val(SignatureAmount);
													$("#signature_typePayment").val(typed_payment);
													$("#signature_amountdue").val( $("#amount_payment").val() );
												})
											})
										}else if(data.signature && data.signature_type == 2){
											conn.send(JSON.stringify(["Signature", data.ReceiptPaymentUnique, $scope.station_un, data.receipt_header_unique]));
											NumpadSignature('signature_ok')
											.then(function(){
												WindowPopupSignature('Signature')
												.then(function(){
													$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
													$("#signature_unique").val(Unique);
													$("#signature_status").val(data.status);
													// $("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
													$("#signature").attr({"src": base_url+"assets/img/hourglass.gif?"+Math.random(), "width":"48", "height":"48"});
													$("#signature_message_view").show();
													$("#signature_message").text("Ask customer to sign.");
													$(".signature_clear").hide();
													$(".signature_accept").hide();
													$("#signature_amount").val(SignatureAmount);
													$("#signature_typePayment").val(typed_payment);
													$("#signature_amountdue").val( $("#amount_payment").val() );
													$("#signature_type").val(2);
													$("#signature_receipt_header_unique").val(data.receipt_header_unique);
												})
											})
										}else{
											//No Typed Amount With Signature Amount and No Signature Capture")
											setTimeout($.unblockUI, 100); 
											ordertype2();
											if($("#TableOrder").val() == 1){
												if($("#PoleDisplay").val() == 2){
													if(ConnectionPoleDisplay){
														tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
													}
												}
											}
										}
									},1000);
								}else{
									//No Typed Amount without Signature Amount and No Signature Capture;
									setTimeout($.unblockUI, 100); 
									ordertype2();
									if($("#TableOrder").val() == 1){
										if($("#PoleDisplay").val() == 2){
											if(ConnectionPoleDisplay){
												tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
											}
										}
									}
								}
							}
						}else if(data.status == 13){
							if(typed_payment > 0){
								if(typed_payment >= SignatureAmount){
									setTimeout(function(){
										PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
										.done(function(){})
									},1000);
								}
							}else{
								setTimeout(function(){
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){})
								},1000);
							}
						}else{
						
						}	
					}else{
						DisableNumpadEasyButtons(false);
					}
					setTimeout(function(){
						$("#ccprocess").focus();
					},100);
				})
			}else{
				$(".btnpayment").attr({"disabled": false});
				DisableNumpadEasyButtons(false);
			}
		
		}else if(Integrated == 3){
			var Price = $("#amount_payment").val(); 
			if(Price == 0){
				Price = $("#amountdue_total").val();
			}
			GiftCardFormPayment('apply_gift_card', Price, Unique, TypeName)
			.then(function(){
				WindowPopupGiftCardFormPayment('Gift Card')
				.then(function(){
					$("#payment_gift_card_number").focus();
					$(".btnpayment").attr({"disabled": false});
				})
			})
			DisableNumpadEasyButtons(false);	

		}else if(Integrated == 4){
			posData.EBTBalance()
			.success(function(data){
				$(".btnpayment").attr({"disabled": false});
			})
			DisableNumpadEasyButtons(false);
		}else if(Integrated == 5){
			posData.SelectCustomer()
			.success(function(data){
				var CustomerId = data.CustomerId;
				if(CustomerId){
					SaleOnTheGoArray.push(Unique, TypeName, TranType, InvokeControl, MerchantID, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, ConfaymentUnique, Integrated);
					var CustomerName = data.CustomerFirstName + ' ' + data.CustomerLastName;;
					WithCustomerSelected2(data)
					.then(function(){
						$("#ContentPanelContainer").html('');
						$("#load_card").html('');
						CustomerUnique = data.CustomerId;
						$('#dialog-customer-form').jqxWindow('close');
						//$("#searchField").val(CustomerName);
						/*
						CustomerSaveThenSelect()
						.then(function(){
							setTimeout(function(){
								$("#CustomerListName").jqxListBox({selectedIndex: 0 }); 
							},500);
						})	
						*/
						CustomerSelectByUnique(CustomerId)
						.then(function(){
							$("#CustomerListName").jqxListBox({selectedIndex: 0 }); 
							$(".btnpayment").attr({"disabled": false});
						})
					});
				}else{
					SaleOnTheGoArray.push(Unique, TypeName, TranType, InvokeControl, MerchantID, Type, SignatureAmount, SecureDevice, ComPort, Signature, ReceiptPrint, ConfaymentUnique, Integrated);
					CustomerListView('select_customer', data.html)
					.then(function(){
						WindowPopupCustomerList('Customer List')
						.then(function(){
							var source = {
								datatype: "jsonp",
								datafields: [
									{ name: 'Unique' },
									{ name: 'name' },
								],
								url: base_url + "pos/pointofsale/customer-list",
								data: {
									featureClass: "P",
									style: "full",
									maxRows: 20,
									username: "customerdata"
								}
							};
							var CustomerdataAdapter = new $.jqx.dataAdapter(source,
								{
									formatData: function (data) {
										data.name_startsWith = $("#searchField").val();
										return data;
									}
								}
							);
						
							$("#CustomerListName").jqxListBox({
								width: 290,
								height: 550,
								source: CustomerdataAdapter, 
								displayMember: "name",
								valueMember: "Unique",
								renderer: function (index, label, value) {
									var item = CustomerdataAdapter.records[index];
									if (item != null) {
										var label = item.name;
										return label;
									}
									return "";
								}
							})
							
							var me = this;
							$("#searchField").on('keyup', function (event) {
								if (me.timer) clearTimeout(me.timer);
								me.timer = setTimeout(function () {
									CustomerdataAdapter.dataBind();
								}, 300);
							});
							$(".btnpayment").attr({"disabled": false});
							$("#searchField").focus();
						})
					})
				}
				DisableNumpadEasyButtons(false);
			});	
		
		}else if(Integrated == 6){
			ConfirmPaymentCheck = ConfirmPayment;
			confirmPaymentTypeName = TypeName;
			confirmPaymentUnique = Unique; 
			$(".btnpayment").attr({"disabled": true});
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $("#amountdue_total").val();
			var amountdue = $("#amountdue_total").val();
			posData.PaymentCheckAccountForm()
			.success(function(data){
				CheckPaymentForm(data.html)
				.then(function(){
					WindowCheckPaymentForm()
					.then(function(){
						$("#check-account-paymentunique").val(Unique);
						$("#check-account-amountdue").val(amountdue);
						$("#check-account-amountentered").val(typed_payment);
						$("#check-account-typename").val(TypeName);
						$("#CheckNoInput").numeric();
						$("#RoutingNoInput").numeric();
						$("#AccountNoInput").numeric();
						$("#CheckNoInput").focus();
					})
				})
			})
			setTimeout(function(){
				$(".btnpayment").attr({"disabled": false});
				DisableNumpadEasyButtons(false);
			},1000);
		}else if (Integrated == 7){
			DisableNumpadEasyButtons(true);
			GCBalOptionID = 'gcdefault';
			GiftCardArray = [];
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $("#amountdue_total").val();
			var amountdue = $("#amountdue_total").val();
			GiftCardArray.push(Unique, amountdue, typed_payment, TypeName, TranType, InvokeControl, MerchantID, Integrated, SecureDevice, ComPort, Signature, SignatureAmount, ConfaymentUnique);
			GiftCardBalOption('gift_card_payment')
			.then(function(){
				WindowPopupGiftCardBalOption('Gift Card Payment');
			})	
		}else if (Integrated == 8){
			var Price = $("#amount_payment").val(); 
			if(Price == 0){
				Price = $("#amountdue_total").val();
			}
			var CustomerRequired = $scope.customer.id;
			if(CustomerRequired > 0){
				StoreCreditFormPayment('apply_store_credit', Price, Unique, TypeName)
				.then(function(){
					WindowPopupStoreCreditPayment(TypeName)
					.then(function(){
						$(".btnpayment").attr({"disabled": false});
					})
				})
			}else{
				var msg = "Select Customer first.";
				NumpadAlertOk('error_customer', msg)
				.then(function(){
					WindowPopupAlert('Info');
					$(".btnpayment").attr({"disabled": false});
				})
			}
			DisableNumpadEasyButtons(false);
		}else{ //--> Integrated 0	
			if(EBT == 1){
				var EBT_Payment_Total = 0; 
				var Amount_Entered = 0;
				var process = false;
				if($("#amount_payment").val() == 0){ 
				//if($("#amount_payment").val() == 0){
					//Check if there is EBT Total
					$(".btnpayment").attr({"disabled": false}); 
					posData.CalculateEBTPayment()
					.success(function(data){
						if(data.success == true){
							EBT_Payment_Total = data.ebt_total;
						}
					}).then(function(){
						if(EBT_Payment_Total >= $scope.EBT.EBTtotal){
							Amount_Entered = $("#amount_payment").val();
							process = true;
						}else{
							var remaining_ebt_total = $scope.EBT.EBTtotal - EBT_Payment_Total;
							Amount_Entered = remaining_ebt_total;
							process = true;
						}
					});		 	
				}else{
					Amount_Entered = $("#amount_payment").val();
					process = true;
				}
				DisableNumpadEasyButtons(false);
			}else{
				Amount_Entered = $("#amount_payment").val(); 
				process = true;
			}



			if(ConfirmPayment == 1 && $("#amount_payment").val() == 0){
				NumpadConfirmPaymentV2('CashPayment_ready', 'Confirm Payment');
				confirmPaymentTypeName = TypeName;
				confirmPaymentUnique = Unique;


				// NumpadConfirmPayment('CashPayment')
				// .then(function(){
				// 	confirmPaymentTypeName = TypeName;
				// 	confirmPaymentUnique = Unique;
				// 	WindowPopupConfirmPayment('Cash')
				// 	.then(function(){
				// 		var AmountDueTotal = $("#amountdue_total").val();
				// 		if(AmountDueTotal < 0){
				// 			AmountDueTotal = AmountDueTotal *-1;
				// 		}
				// 		$("#confirm_payment_amount").val(AmountDueTotal);
				// 		$("#confirm_payment_amount").jqxNumberInput('focus');
				// 		var input = $('#confirm_payment_amount input')[0];
				// 		if('selectionStart' in input) {
				// 			input.setSelectionRange(0, 0);
				// 		}else{
				// 			var range = input.createTextRange();
				// 			range.collapse(true);
				// 			range.moveEnd('character', 0);
				// 			range.moveStart('character', 0);
				// 			range.select();
				// 		}
				// 		setTimeout(function(){
				// 			$("#confirm_payment_amount input").select();
				// 		},100)
				// 	})
				// })
			}else{
				//-->Cash Payment
				if(process){
					
					$.blockUI({ css: { 
						border: '2px solid #fff',
						padding: '15px', 
						backgroundColor: '#210e66', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: 1, 
						color: '#fff',
						fontSize: '20px' 
					}, message: 'Payment Processing please wait...' });

					var postData = "PaymentUnique=" + Unique;
						postData+= "&AmountDue=" + $scope.amountdue.Total;
						postData+= "&AmountEntered=" + $("#amount_payment").val();
						postData+= "&TypeName=" + TypeName;
						postData+= "&OrderType="+ $("#OrderType").val();
					posData.TransPayment(postData)
					.success(function(data){
						var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
						var ReceiptPaymentUnique = data.ReceiptPaymentId;
						if(data.success == true){
							$scope.payment = 0;
							if(POSPaymentNumpad == 1){
								$("#amount_payment").maskMoney('mask', '0.00');
							}
							load_data2(data);
							DisableNumpadEasyButtons(false);
							//PoleDisplayPaymentMethod(ReceiptPaymentUnique);
							// DisplayAllPayments();
						}else{
							if(data.CheckBalance){
								if(data.CheckBalance.balance == true){
									$scope.BtnApplyPaymentWhen = false;
									$(".btnpayment").attr({"disabled": false});
								}else if (data.CheckBalance.balance == false){
									$scope.BtnApplyPaymentWhen = true;
								}
							}
							DisableNumpadEasyButtons(false);
							var msg = data.msg;
							NumpadAlertOk('cash_payment', msg)
							.then(function(){
								WindowPopupAlert('Payment Notification')
							});
						}
						setTimeout($.unblockUI, 100); 
					}).then(function(){
						if(POSPaymentNumpad == 1){
							$('#amount_payment').focus();
						}else{
							setTimeout(function(){
								var input = $('#amount_payment input')[0];
								input.setSelectionRange(0, 0);
								$("#amount_payment input").focus();
							},100);
						}
					})
				}
			}
		}
	}

	var load_data2 = function(data){
		if(data.ItemList){
			$scope.ordereditemlist = data.ItemList;
		}

		if(data.POSTotal){
			$scope.amountdue = data.POSTotal;
			$scope.backcolor = data.POSTotal.color;
			if($("#PoleDisplay").val() == 2){
				if(ConnectionPoleDisplay){
					conn.send(JSON.stringify(["DisplayTotal",data.POSTotal, $scope.station_un]));
					conn.send(JSON.stringify(["ClearNumber",'', $scope.station_un]));
				}
			}
		}

		if(data.POSPayments){
			$scope.AllPayments = data.POSPayments;
			scrollTotalDown();
			if($("#PoleDisplay").val() == 2){
				if(ConnectionPoleDisplay){
					conn.send(JSON.stringify(['Payments', data.POSPayments, $scope.station_un]));
				}
			}
			if(data.POSChange){
				$scope.poschange = data.POSChange;
				if($("#PoleDisplay").val() == 2){
					if(ConnectionPoleDisplay){
						conn.send(JSON.stringify(['Change',data.POSChange, $scope.station_un]));
					}
				}
				if(data.POSChange.coin_dispenser == false){
					NumpadAlertOkCoinDispenser('coin_dispenser_error', data.POSChange.coin_dispenser_msg)
					.then(function(){
						WindowPopupAlertCoinDispenser ('Coin Dispenser Warning')	
					})
				}
			}
		}

		if(data.ReceiptCheckStatus){
			var status = data.ReceiptCheckStatus.status;
			var orders = data.ReceiptCheckStatus.orders;
			var balance = data.ReceiptCheckStatus.current_balance;
			if(status == 1 && orders == false){
				NewSaleButtons();
			}else if (status == 1 && orders == true){
				EnableButtonsWhenItemAdded();
			}else if (status == 4){
				CompletedSale();
			}else if (status == null){
				OtherButtons();
			}
		}

		if(data.ReceiptStatusCheck){
			var status = data.ReceiptStatusCheck.status;
			var orders = data.ReceiptStatusCheck.orders;
			var balance = data.ReceiptStatusCheck.current_balance;
			if(status == 1 && orders == false){
				NewSaleButtons();
			}else if (status == 1 && orders == true){
				EnableButtonsWhenItemAdded();
			}else if (status == 4){
				CompletedSale();
			}else if (status == null){
				OtherButtons();
			}
		}

		if(data.GetHeaderInfo){
			$("#receiptn").text(data.GetHeaderInfo.receipt_number);
			$("#station").text(data.GetHeaderInfo.station_name);
			$("#user_name").text(data.GetHeaderInfo.user_name);
			$("#tableno").text(data.GetHeaderInfo.tableno);
			$scope.StatStationName = data.GetHeaderInfo.station_number;
			$scope.StatCashIn = data.GetHeaderInfo.cashin;
			$scope.TempStationName = data.GetHeaderInfo.station_number;
			$scope.TempCashIn = data.GetHeaderInfo.cashin;
			$("#receiptlabel").text(data.GetHeaderInfo.LabelNote);
			var resOrderNo = data.GetHeaderInfo.OrderNo;
			if(resOrderNo !== null){
				$("#OrderNoDisplayLine").show();
				$("#OrderNoDisplay").text(data.GetHeaderInfo.OrderNo);
			}else{
				$("#OrderNoDisplayLine").hide();
			}
		}
		
		if(data.TotalSoldDisplay){
			$scope.totals = data.TotalSoldDisplay;
			var PoleDisplayShow = $("#PoleDisplay").val();
			if(PoleDisplayShow == 1){
				PoleDisplayPaymentMethod(data.ReceiptPaymentUnique);

			}else if(PoleDisplayShow == 2){
				conn.send(JSON.stringify(["TotalSoldDisplay",data.TotalSoldDisplay, $scope.totals]));
			}
			ItemCount2();
		}

		/*
		|---------------------------------------------------------------------|
		| Display Points
		|---------------------------------------------------------------------|
		*/
		if(data.ByCustomerPoints){	
			if(data.ByCustomerPoints.Points > 0){
				if(data.ByCustomerPoints.CustomerPoints > 0){
					$("#points").text('Pts '+data.ByCustomerPoints.Points);
					$("#points").append(' | ');
					$("#points").append(data.ByCustomerPoints.CustomerPoints);
				}else{
					$("#points").text('Pts '+data.ByCustomerPoints.Points);
				}
			}else{
				$("#points").text('');
			}
		}

		if(data.PrinterError){
			//PrinterProblemDefaultMessage('printer_check');
		}


		/*
		|--------------------------------------------------------|
		| Reward Notification
		|--------------------------------------------------------|
		
		if(data.reward > 0){
			RewardsNotify(data.reward_data)
			.then(function(){
				WindowRewardNotify();
			})
		}
		*/

		/*
		|---------------------------------------------------------|
		| POS Show Change Screen
		|---------------------------------------------------------|
		*/
		$(document).on('click', '#pos_email_receipt', function(e){
			e.preventDefault();
			$(this).attr('disabled', true);
			$("#EmailReceiptfunction").trigger('click');
			setTimeout(function(){
				$(this).attr('disabled', false);
			},1000);
			$("#pos_change_screen").jqxWindow('close');
		})

		if(data.ShowChangeScreen){
			var ChangeScreenPopup = $("#POSChangeScreen").val();
			if(ChangeScreenPopup > 1){
				$scope.ChangeScreenShow = true;

				populatePosChangeScreen()
				.then(function(){
					if($("#EmailReceiptfunction").length > 0){
						$("#pos_email_receipt").show();
					}
					var ParseChangeLabel = JSON.stringify(data.POSChange.changedesc);
					var ParseChangeAmount = JSON.stringify(data.POSChange.totalchange);
					$('#ChangeDisplay').append('<h4>'+ParseChangeLabel.replace(/["']/g, "")+'</h4>');
					$('#ChangeDisplay').append('<h2>'+parseFloat(ParseChangeAmount.replace(/["']/g, "") * -1).toFixed(2)+'</h2>');
					if(data.reward > 0){
						$('#ChangeDisplay').append(
							'<br>'+
							'<div style="background: #fff; color: #000; max-height: 220px; overflow:hidden;">'+
							'	<span style="font-size:21px; margin-right:10px;"><b>'+data.reward_data.customer+' has earned the following reward(s)</b></span>'+
							'	<br>'+
							'	<br>'+
							'	<div style="max-height:80px; overflow:auto;">'+
							'		<ul style="font-size:20px; list-style: none; padding-left:0;">'+data.reward_data.reward_info+'</ul>'+
							'	</div>'+
							'	<br>'+
							'	<button id="reward_notify_print" class="btn btn-warning btn-lg">Print</button>'+
							'</div>'
						);
					}
					console.log(data.promo, data.promo_data);
					if(data.promo){
						$('#ChangeDisplay').append(
							'<br>'+
							'<div style="background: #fff; color: #000; max-height: 220px; overflow:hidden;">'+
							'	<span style="font-size:21px; margin-right:10px;"><b>Customer has earned the following promo</b></span>'+
							'	<br>'+
							'	<br>'+
							'	<div style="max-height:80px; overflow:auto;">'+
							'		<ul style="font-size:20px; list-style: none; padding-left:0;">'+data.promo_data.info+'</ul>'+
							'	</div>'+
							'	<br>'+
							'	<button id="reward_notify_print_promo" class="btn btn-warning btn-lg">Print</button>'+
							'</div>'
						);
					}

					if($("#GiftReceiptfunction").length == 0){
						$("#pos_gift_receipt").hide();
					}else{
						$("#pos_gift_receipt").show();
					}
					WindowPosChangeScreen('Change')
					.then(function(){
						var OrderListHeight= ($("#pos_change_screen").height() - 31);
						var OrderListWidth = ($(".orderedlist").width() + 3);
						$('#pos_change_screen').jqxWindow({ position: { x: OrderListWidth, y: 50 }});
						$('#dialog-numpad-payment-alert').jqxWindow('bringToFront');
						setTimeout(function(){
							
							PosChangeCounter();
						},1000);
					})
				})
			}
		}

		/*
		|--------------------------------------------------------|
		| Printer not working
		|--------------------------------------------------------|
		*/
		if(data.PrinterNotWorking){
			var msg = data.PrinterNotWorking;
			PrinterStatusWindow('no_customer_selected', msg)
			.then(function(){
				WindowPopupPrinterStatus('Printer Status');
			})
		}

		/*
		|--------------------------------------------------------|
		| Receipt Header Status
		|--------------------------------------------------------|
		$scope.BtnGiftReceiptWhen = true;
		if(data.ReceiptHeaderStatus){
			if(data.ReceiptHeaderStatus.Status == 4){
				$scope.BtnGiftReceiptWhen = false;
			}
		}
		*/

		if(data.CheckBalance){
			if(data.CheckBalance.balance == true){
				$scope.BtnApplyPaymentWhen = false;
				$scope.BtnPrintWhen = true;
				$scope.BtnAddCustWhen = false;
				$(".btnpayment").attr({"disabled": false});
			}else if (data.CheckBalance.balance == false){
				$(".btnpayment").attr({"disabled": true});
				$scope.BtnApplyPaymentWhen = true;
				$scope.BtnPrintWhen = false;
				$scope.BtnEditWhen = true;
				$scope.TxtSearchWhen = true;
				$scope.BtnSearchWhen = true;
				$scope.CustomerFormWhen = true;
				$scope.CustomerLinkWhen = true;
				CompletedSale();
				ordertype2();
				if($("#TableOrder").val() == 1){
					if($("#PoleDisplay").val() == 2){
						if(ConnectionPoleDisplay){
							tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
						}
					}
				}
			}
		}

		/*
		|--------------------------------------------------------|
		| Receipt PDF
		|--------------------------------------------------------|
		*/
		if(data.PDFReceipt){
			var PathReceiptPDF = base_url + data.PDFReceipt;
			testpdf_receipt(PathReceiptPDF);
		}

	}

	function testpdf_receipt (pathToPdf) {
		const frame = document.createElement('iframe')
		frame.src = pathToPdf.trim()
		frame.style = "display:none;";
		const container = document.getElementsByTagName('body') //this will return a NodeList
		container[0].appendChild(frame)
		frame.contentWindow.print()
	}

	$("#printer_status_window").on("close", function(e){
		e.preventDefault();
		$("#printer_status_window_container").html('');
	})

	var populatePrinterStatus = function(form, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#printer_status_window").append('<div id="printer_status_window_container" style="background: #144766; color:#EEE;"></div>');
			$("#printer_status_window_container").html('');
			var html = '<form id="'+form+'">'+
							'<h4>'+msg+'</h4>'+
							'<input type="text" class="hdfield" id="number_field" style="display:none;" />'+
							'<br/>'+
							'<div id="printer_status"></div>'+
						'</form>'
			$("#printer_status_window_container").append(html);
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowPopupPrinterStatus = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#printer_status_window").jqxWindow({
				height: 300,
				minWidth: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			setTimeout(function(){
				$('#printer_status_window').jqxWindow('setTitle', header_text);
				$('#printer_status_window').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}

	var PrinterStatusWindow = function(form, msg){
		var def = $.Deferred();
		populatePrinterStatus(form, msg)
		.then(function(){
			$('#printer_status').hdkeyboard({
			  layout: "alert_close",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	/*
	|-------------------------------------------------------------------------------------------------
	| Customer popup window
	|-------------------------------------------------------------------------------------------------
	*/
	var GlobalCustomerName = null;

	$("#pos_customer_search").on("close", function(e){
		e.preventDefault();
		$scope.CustomerOkWhen = true;
		$scope.CustomerEditWhen = true;
		$("#CustomerSelectedUnique").val('');
		$("#pos_customer_search_container").remove();
		CustomerPurchaseUnique = null;
		$("#pos_customer_search_container").html('');
		GetSelectedCustomer();
		InventoryScan = false;
		KeyPress(event);
	})

	$("#add-customer-form").on("close", function(e){
		e.preventDefault();
		$("#add-customer-form-container").html('');
	})

	var populateAddCustomerWindow = function(){
		var def = $.Deferred();
		$("#add-customer-form").append('<div id="add-customer-form-container" style="overflow:hidden;"></div>');
		$("#add-customer-form-container").html('');
		posData.AddNewCustomerWindow()
		.success(function(data){
			$("#add-customer-form-container").append($compile(data.html)($scope));
			def.resolve();
		})
		return def.promise();
	}

	var WindowAddCustomerWindow = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#add-customer-form").jqxWindow({
				minHeight: '100%',
				minWidth: '100%',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#add-customer-form').jqxWindow('setTitle', header_text);
			$('#add-customer-form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var AddCustomerWindow = function(){
		var def = $.Deferred();
		populateAddCustomerWindow()
		.then(function(){
			def.resolve();
		});
		return def.promise();
	}

	var populateEditCustomerWindow = function(customer){
		var def = $.Deferred();
		$("#edit-customer-form").append('<div id="edit-customer-form-container" style="overflow:hidden;"></div>');
		$("#edit-customer-form-container").html('');
		var postdata ="CustomerUnique="+customer;
		posData.EditCustomerWindow(postdata)
		.success(function(data){
			$("#edit-customer-form-container").append($compile(data.html)($scope));
			def.resolve(data);
		})
		return def.promise();
	}

	var WindowEditCustomerWindow = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#edit-customer-form").jqxWindow({
				minHeight: '100%',
				minWidth: '100%',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#edit-customer-form').jqxWindow('setTitle', header_text);
			$('#edit-customer-form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var EditCustomerWindow = function(customer){
		var def = $.Deferred();
		populateEditCustomerWindow(customer)
		.then(function(data){
			def.resolve(data);
		});
		return def.promise();
	}

	var CustomerPurchases = function(id){
		var def = $.Deferred();
		var postdata="customerid="+id;
		posData.CustomerPurchases(postdata)
		.success(function(data){
			setTimeout(function(){
				CustomerPurchaseGrid(data);
			},500);
			def.resolve();
		})
		return def.promise();
	}

	var customergridcolumns = [];
	var gridtypes = '';
	var customergridtype = [];
	var PrepareGrid = function(){
		var def = $.Deferred();
		posData.CustomerGridPrepare()
		.success(function(data){
			$.each(data.gridcols, function(index, value){
				if(value.aggregates == 1){
					customergridcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
							'Total': function (aggregatedValue, currentValue, column, record){
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
					})
				}else{
					customergridcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align})
				}
			})
			customergridtype.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
	}
	PrepareGrid();
	
	var GridRowHeight = 40;
	var Customer_grid = function(types, data){
		var def = $.Deferred();
		var ResoWidth 	        = $("#fakeheight").width();
		var ResoHeight 	        = $("#fakeheight").height();
		var ComputeHeight		= ResoHeight - 50;
		var CustomerSearch 		= ComputeHeight - 40;
		var UseHeight			= CustomerSearch;
		var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		var source = {
			dataType: "json",
			dataFields: gridtypes,
			localdata: data
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#customer-search").jqxGrid({
			width: "100%",
			height: UseHeight,
			pagesize: ComputeDisplayRow,
			scrollbarsize: GridScrollBarSize,
			altRows: true,
			theme: GridTheme,
			pageable: false,
			pagerMode: 'advanced',
			sortable: true,
			columnsResize: true,
			showfilterrow: true,
			filterable: true,
			source: dataAdapter,
			rowsheight: GridRowHeight,
			columns: customergridcolumns
		});

		var CustomerPointsType = 0;
		$("#customer-search").on("rowselect", function(event) {
			var row = event.args.rowindex;
			var datafield = event.args.datafield;
			var datarow = $("#customer-search").jqxGrid('getrowdata', row);
			console.log(datarow);
			if(datarow){
				setTimeout(function(){
					$scope.CustomerOkWhen = false;
					$scope.CustomerEditWhen = false;
					$("#CustomerSelectedUnique").val(datarow.Unique)
					GlobalCustomerName = datarow.FirstName + " " + datarow.LastName;
					CustomerPointsType = datarow.Points;
					
					$scope.customer = {
						id: datarow.Unique,
						selected: datarow.FirstName + " " + datarow.LastName
					}
					$scope.$apply(datarow.Points);
				},100);
			}
			
		});

		$("#customer-search").on("rowclick", function(event) {
			var row = event.args.rowindex;
			var datafield = event.args.datafield;
			var datarow = $("#customer-search").jqxGrid('getrowdata', row);
			$("#CustomerSelectedUnique").val(datarow.Unique)
			GlobalCustomerName = datarow.FirstName + " " + datarow.LastName;
			CustomerPointsType = datarow.Points;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
			$scope.customer = {
				id: datarow.Unique,
				selected: datarow.FirstName + " " + datarow.LastName
			}
			$scope.$apply(datarow.Points);
		});

		$scope.SelectCustomer = function(){
			
			var getselectedrowindex = $('#customer-search').jqxGrid('getselectedrowindex');
			var selectedRowData = $('#customer-search').jqxGrid('getrowdata', getselectedrowindex);
			var CustomerDiscount = selectedRowData.Discount;
			console.log("Discount", CustomerDiscount);
			// console.log("CustomerPointsType",selectedRowData);
			// return false;
			var CustomerSelectedUnique = JSON.stringify(selectedRowData.Unique);
			if(CustomerSelectedUnique){
				var CustomerPointsType = (JSON.stringify(selectedRowData.Points) ? JSON.stringify(selectedRowData.Points) : null);
				
				var postdata ="selcustomervalue="+CustomerSelectedUnique;
					postdata+="&selcustomerlabel="+GlobalCustomerName;
					postdata+="&CustomerPointsType="+ CustomerPointsType;
					postdata+="&Discount="+CustomerDiscount;
				posData.TransCustomer(postdata)
				.success(function(data){
					if(data.success){
						GetSelectedCustomer();
						$rootScope.$emit('CallReloadEverything');
						$scope.CustomerOkWhen = true;
						$scope.CustomerEditWhen = true;
						$("#customer-search").jqxGrid('clearFilters');
						$("#pos_customer_search").jqxWindow('close');
						posData.GetPoints()
						.success(function(data){
							if(data.Points > 0){
								if(data.CustomerPoints > 0){
									$("#points").text('Pts '+data.Points);
									$("#points").append(' | ');
									$("#points").append(data.CustomerPoints);
								}else{
									$("#points").text('Pts '+data.Points);
								}
							}else{
								$("#points").text('');
							}
						})
						CheckRewardsByCustomerPoints();
					}else{
						GetSelectedCustomer();
						$("#pos_customer_search").jqxWindow('close');
						if(data.alert){
							var msg = data.msg;
							NumpadAlertClose('customer_added_reward', msg)
							.then(function(){
								WindowPopupAlert('Alert message');
							})
						}
					}
				})
			}else{
				var msg = "Please select customer";
				NumpadAlertClose('no_customer_selected', msg)
				.then(function(){
					WindowPopupAlert('Alert message');
				})
			}
		}

		$('#customer-search').on('rowdoubleclick', function (event) {
			// event.args.rowindex is a bound index.
			var row = event.args.rowindex;
			var datafield = event.args.datafield;
			var datarow = $("#customer-search").jqxGrid('getrowdata', row);
			var getselectedrowindex = $('#customer-search').jqxGrid('getselectedrowindex');
			GlobalCustomerName = datarow.FirstName + " " + datarow.LastName;
			CustomerId = datarow.Unique;
			var selectedRowData = $('#customer-search').jqxGrid('getrowdata', getselectedrowindex);
			var CustomerSelectedUnique = JSON.stringify(selectedRowData.Unique);

			var postdata ="selcustomervalue="+CustomerSelectedUnique;
				postdata+="&selcustomerlabel="+GlobalCustomerName;
				postdata+="&CustomerPointsType="+ (selectedRowData.Points ? JSON.stringify(selectedRowData.Points) : null);
			posData.TransCustomer(postdata)
			.success(function(data){
				GetSelectedCustomer();
				$rootScope.$emit('CallReloadEverything');
				$scope.CustomerOkWhen = true;
				$scope.CustomerEditWhen = true;
				$("#customer-search").jqxDataTable('clearFilters');
				$("#pos_customer_search").jqxWindow('close');
				posData.GetPoints()
				.success(function(data){
					if(data.Points > 0){
						if(data.CustomerPoints > 0){
							$("#points").text('Pts '+data.Points);
							$("#points").append(' | ');
							$("#points").append(data.CustomerPoints);
						}else{
							$("#points").text('Pts '+data.Points);
						}
					}else{
						$("#points").text('');
					}
				})
			})
			CheckRewardsByCustomerPoints();
		});

		if($scope.customer.id){
			Customer_created_reload($scope.customer.id);
		}

		setTimeout(function(){
			if(data.length > 0){
				$('#customer-search').jqxGrid('selectrow', 0);
			}
			$("#customer_search_text").focus();
			def.resolve();
		},200);
		return def.promise();
	}

	$(document).on("click", "#CustomerFormClose", function(){
		$("#pos_customer_search").jqxWindow('close');
		CustomerPurchaseUnique = null;
		$("#pos_customer_search_container").html('');
		GetSelectedCustomer();
	})

	$(document).on('click', '#NewCustomer', function(e){
		e.preventDefault();
		$scope.phone_mask_format = {
			mask: "(###)###-####",
			height: 30,
			width: "50%"
		} 
		var postdata ="FunctionButton=CustomerNew";
		posData.CheckUserManagerCookie(postdata)
		.success(function(data){
			if(data.prompt){
				NumpadPasscode('CreateNewCustomerAccount')
				.then(function(){
					WindowPopupPasscode("New Customer Account")
					.then(function(){
						$("#number_field").focus();
					})
				})
			}else{
				AddCustomerWindow()
				.then(function(){
					WindowAddCustomerWindow('Add New Customer')
					.then(function(){
						ClearCustomerForm();
						var ResoWidth 			= $("#add-customer-form").width();
						var ResoHeight 			= $("#add-customer-form").height();
						var SearchBtn 			= $(".jqx-tabs-header").height();
						var ComputeHeight		= ResoHeight - 80;
						var UseHeight			= ComputeHeight - SearchBtn;
						var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

						$(".addcustomer").each(function(){
							if($(this).attr("autofocus")){
								$(this).focus();
							}
						})

						$("#CustomerAccountStatus").on('change', function(){
							$("#add_save").prop("disabled", false);
						})

						$('#add_customer_credit_limit').on('textchanged', function (event){
							var text = event.args.text;
							$("#add_save").prop("disabled", false);
						}); 
						$('#add-tabs').jqxTabs({height:UseHeight,selectedItem: 0});
						if( $("#POSCustomerAccountExpiration").length ){
							var expdate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
							$("#POSCustomerAccountExpiration").jqxDateTimeInput({ formatString: 'MM/dd/yyyy', value: expdate });
						}

						if( $("#POSCustomerBirthday").length > 0){
							console.log("test");
							var expdate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
							$("#POSCustomerBirthday").jqxDateTimeInput({ formatString: 'MM/dd', value: null, "showCalendarButton": false, "width" : 60 });
						}

						$("#POSCustomerFirstName").focus();
					})
				})
			}
		})
	})
	
	$(document).on('submit', '#CreateNewCustomerAccount', function(e){
		e.preventDefault();
		var passcode = $("#number_field").val();
		var hashpasscode = CryptoJS.MD5(passcode);
		var postdata ="passcode="+hashpasscode;
			postdata+="&FunctionButton=CustomerNew";
		posData.EnterPassCode(postdata)
		.success(function(data){
			if(data.success){
				if(data.login){
					AddCustomerWindow()
					.then(function(){
						WindowAddCustomerWindow('Add New Customer')
						.then(function(){
							ClearCustomerForm();
							var ResoWidth 			= $("#add-customer-form").width();
							var ResoHeight 			= $("#add-customer-form").height();
							var SearchBtn 			= $(".jqx-tabs-header").height();
							var ComputeHeight		= ResoHeight - 80;
							var UseHeight			= ComputeHeight - SearchBtn;
							var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
							
							$('#add-tabs').jqxTabs({height:UseHeight, selectedItem: 0});
								
							$(".addcustomer").each(function(){
								if($(this).attr("autofocus")){
									$(this).focus();
								}
							})

							$("#CustomerAccountStatus").on('change', function(){
								$("#add_save").prop("disabled", false);
							})

							$('#add_customer_credit_limit').on('textchanged', function (event){
								var text = event.args.text;
								$("#add_save").prop("disabled", false);
							}); 

							$("#dialog-numpad-passcode").jqxWindow("close");
						})
					})
				}else{
					$("#dialog-numpad-passcode").jqxWindow('close');
					NumpadAlertOk('edit_customer_invalid_code', data.msg)
					.then(function(){
						WindowPopupAlert('Info');
					})
				}
			}else{
				$("#dialog-numpad-passcode").jqxWindow('close');
				NumpadAlertOk('edit_customer_invalid_code', data.msg)
				.then(function(){
					WindowPopupAlert('Info');
				})
			}
		})
	})

	/*--------------------------------------------------------------
	* Customer Purchases
	*--------------------------------------------------------------*/
	var CustomerPurchaseGridColumns = [];
	var customerpurchasegridtype = [];
	var PreparePurchaseCustomerGrid = function(){
		var def = $.Deferred();
		posData.CustomerPurchaseGrid()
		.success(function(data){
			$.each(data.gridcols, function(index, value){
				if(value.aggregates == 1){
					CustomerPurchaseGridColumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
							renderString += Total + "</div>";
							return renderString;
						} 
					})
				}else{
					CustomerPurchaseGridColumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align})
				}
			})
			customerpurchasegridtype.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
	}
	PreparePurchaseCustomerGrid();

	var CustomerPurchaseGrid = function(data){
		var def = $.Deferred();
		var ResoWidth 	        = $("#edit-customer-form").width();
		var ResoHeight 	        = $("#edit-customer-form").height();
		var ComputeHeight		= ResoHeight - 200;
		var UseHeight			= ComputeHeight;
		var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		var source = {
			dataType: "json",
			dataFields: customerpurchasegridtype[0],
			localdata: data
		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#purchase_history").jqxGrid({
			width: '100%',
			height: UseHeight,
			columnsresize: true,
			altRows: true,
			scrollbarsize: 25,
			rowsheight: 40,
			theme: 'darkblue',
			pagesize: ComputeDisplayRow,
			sortable: true,
			showfilterrow: true,      
			filterable: true,
			showstatusbar: true,
			statusbarheight: 40,
			showaggregates: true,
			source: dataAdapter,
			columns: CustomerPurchaseGridColumns
		})
		setTimeout(function(){
			def.resolve();
		},100);
		return def.promise();
	}

	/*
	|------------------------------------------------------------------------
	| Edit Customer Points Reward
	|------------------------------------------------------------------------
	*/
	var CustomerPointsGridColumns = [];
	var CustomerPointsGridType = [];
	var PreparePointsCustomerRewardGrid = function(){
		var def = $.Deferred();
		posData.CustomerPointsRewardGrid()
		.success(function(data){
			$.each(data.gridcols, function(index, value){
				if(value.aggregates == 1){
					CustomerPointsGridColumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
							renderString += Total + "</div>";
							return renderString;
						} 
					})
				}else{
					CustomerPointsGridColumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align})
				}
			})
			CustomerPointsGridType.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
	}
	PreparePointsCustomerRewardGrid();

	var RewardsUnique = 0;
	var CustomerPointsRewards = function(data){
		if(data.PointsSetup){
			var ResoWidth 	        = $("#edit-customer-form").width();
			var ResoHeight 	        = $("#edit-customer-form").height();
			var ComputeHeight		= ResoHeight - 200;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			var source = {
				dataType: "json",
				dataFields: CustomerPointsGridType[0],
				localdata: JSON.stringify(data.RewardsData)
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#customer_earned_rewards").jqxGrid({
				width: '99%',
				height: 150,
				columnsresize: true,
				altRows: true,
				theme: 'darkblue',
				sortable: true,     
				filterable: true,
				source: dataAdapter,
				columns: CustomerPointsGridColumns
			})

			$("#customer_earned_rewards").on("rowclick", function(event) {
				var row = event.args.rowindex;
				var datafield = event.args.datafield;
				var datarow = $("#customer_earned_rewards").jqxGrid('getrowdata', row);
				RewardsUnique = datarow.Unique;
			});
		}
	}

	$(document).on('click', '#customer_print_card_pdf', function(e){
		e.preventDefault();
		var required_count = 0;
		$("#EditBtnUpdate").trigger('click');
		$(".editcustomer").each(function(){
			var required  = $(this).prop("required");
			if(required){
				if($(this).val() == ''){
					$(this).css({border: '1px solid #ff0000'});
					required_count++;
				}else{
					$(this).css({border: '1px solid #ccc'});
				}
			}
		});	
		if(required_count > 0){

		}else{
			setTimeout(function(){
				var postdata ="CustomerUnique="+CustomerUniqueId;
				posData.PrintCustomerCard(postdata)
				.success(function(data){
					if(data.print_card){
						var PathReceiptPDF = base_url + data.filename;
						testpdf_receipt(PathReceiptPDF);
					}else{
						var msg = "Customer Account Number is not set";
						NumpadAlertClose('select_customer', msg)
						.then(function(){
							WindowPopupAlert('Alert message');
						})
					}
				})
			},1000);
		}
	})

	var CustomerPurchaseUnique = null;
	/*
	|------------------------------------------------------------------------
	| Edit Customer Tab 1 - Profile, Tab 2 - Purchases
	|------------------------------------------------------------------------
	*/
	var PreloadEditCustomerAccountExp = '';
	var PreloadEditCustomerBirthday = '';
	var CustomerUniqueId;
	$(document).on("click", "#EditCustomer", function(){
		$scope.edit_phone_mask_format = {
			mask: "(###)###-####",
			height: 30,
			width: "50%"
		} 

		var customerid = $scope.customer.id;
		if(customerid == null){
			var msg = "Please select customer first.";
			NumpadAlertClose('select_customer', msg)
			.then(function(){
				WindowPopupAlert('Alert message');
			})
		}else{
			var postdata ="FunctionButton=CustomerEdit";
			posData.CheckUserManagerCookie(postdata)
			.success(function(data){
				if(data.prompt){
					NumpadPasscode('EditCustomerAccount')
					.then(function(){
						WindowPopupPasscode("Edit Customer Account")
						.then(function(){
							$("#number_field").focus();
						})
					})
				}else{
					EditCustomerWindow(customerid)
					.then(function(rewardsdata){
						CustomerUniqueId = customerid;
						CustomerPurchases(customerid)
						.then(function(){
							CustomerPointsRewards(rewardsdata);
							//.then(function(){
								var postData ="CustomerUnique="+customerid;
								posData.GetCustomerProfile(postData)
								.success(function(data){
									ClearEditCustomerFields();
									WindowEditCustomerWindow('Edit Customer ' + customerid + " | " + data.fname+ " " + data.lname)
									.then(function(){
										if( $("#POSCustomereditAccountExpiration").length ){
											$("#POSCustomereditAccountExpiration").jqxDateTimeInput({ formatString: 'MM/dd/yyyy' });
										}
										$("#POSCustomereditFirstName").val(data.fname);
										$("#POSCustomereditLastName").val(data.lname);
										$("#POSCustomereditMiddleName").val(data.mname);
										$("#POSCustomereditCompany").val(data.company);
										$("#POSCustomereditAddress1").val(data.addr1);
										$("#POSCustomereditAddress2").val(data.addr2);
										$("#POSCustomereditPhone1").val(data.p1);
										$("#POSCustomereditPhone2").val(data.p2);
										$("#POSCustomereditPhone3").val(data.p3);
										$("#POSCustomereditFax").val(data.fax); 		
										$("#POSCustomereditEmail").val(data.email);
										$("#POSCustomereditEmail2").val(data.email2);
										$("#POSCustomereditEmail3").val(data.email3);
										$("#POSCustomereditEmail4").val(data.email4);
										$("#POSCustomereditWebsite").val(data.website);
										$("#POSCustomereditCustom1").val(data.cust1);
										$("#POSCustomereditCustom2").val(data.cust2);
										$("#POSCustomereditCustom3").val(data.cust3);
										$("#POSCustomereditCustom4").val(data.cust4);
										$("#POSCustomereditCustom5").val(data.cust5);
										$("#POSCustomereditCustom6").val(data.cust6);
										$("#POSCustomereditCustom7").val(data.cust7);
										$("#POSCustomereditNote").val(data.note);
										$("#POSCustomereditZipcode").val(data.zip);
										$("#POSCustomereditCity").val(data.city);
										$("#POSCustomereditState").val(data.state);
										$("#POSCustomereditCounty").val(data.county);
										$("#POSCustomereditCountry").val(data.country);
										$("#POSCustomereditAccountStatus").val(data.AccountStatus);
										$("#POSCustomereditCreditLimit").val(data.CreditLimit);
										$("#POSCustomereditAccountNo").val(data.AccountNumber);
										$("#POSCustomereditPoints").val(data.Points);
										
										// /$("#POSCustomereditAccountExpiration").jqxDateTimeInput({clearString : 'Clear'})
										
										if(data.AccountExpiration != '' || data.AccountExpiration != null){
											$("#POSCustomereditAccountExpiration").val(data.AccountExpiration);
											PreloadEditCustomerAccountExp = data.AccountExpiration;
										}else{
											$("#POSCustomereditAccountExpiration").jqxDateTimeInput({clearString : 'Clear'})
										}

										if(data.Birthday != '' || data.Birthday != null){
											if($("#POSCustomereditBirthday").length > 0){
												var expdate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
												$("#POSCustomereditBirthday").jqxDateTimeInput({ formatString: 'MM/dd', value: expdate, "showCalendarButton": false, "width" : 60 });
												$("#POSCustomereditBirthday").val(data.Birthday);
												// EditDetectChanges($("#POSCustomereditBirthday").val(), data.Birthday);
												PreloadEditCustomerBirthday = data.Birthday;
											}
										}

										var ResoWidth 			= $("#edit-customer-form").width();
										var ResoHeight 			= $("#edit-customer-form").height();
										var SearchBtn 			= $(".jqx-tabs-header").height();
										var ComputeHeight		= ResoHeight - 80;
										var UseHeight			= ComputeHeight - SearchBtn;
										var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

										if(rewardsdata.PointsSetup){
											$("#jqxExpander").jqxExpander({ width: '100%', theme: 'dark'});
										}
			
										$('#editTabs').jqxTabs({height:UseHeight, selectedItem: 0});

										$('#editTabs').on('tabclick', function (event){ 
											var clickedItem = event.args.item;
											if(clickedItem == 1){
												$("#customer_purchases_print").show();
											}else{
												$("#customer_purchases_print").hide();
											} 
										}); 

										$(".editcustomer").each(function(){
											if($(this).attr("autofocus")){
												$(this).focus();
											}
										})

										$("#editCustomerAccountStatus").on('change', function(){
											$scope.EnabledEditButton();
										})

										$(".datalist").on('change', function(){
											$scope.EnabledEditButton();
										})

										$('#editCustomerCreditLimit').on('textchanged', function (event){
											var text = event.args.text;
											$scope.EnabledEditButton();
										}); 

										$("#purchase_history").on('rowselect', function (event){
											var rowindex = event.args.rowindex;
											var datafield = event.args.datafield;
											var row = $(this).jqxGrid('getrowdata', rowindex);
											CustomerPurchaseUnique = row.Unique;
										});

										$(document).on('change', '#POSCustomereditBirthday', function(event){
											var jsDate = event.args.date; 
											var type = event.args.type;
											EditDetectChanges($("#POSCustomereditBirthday").val(), data.Birthday);
										})
										
									})
								})
							//})
						})
					})
				}
			})
		}
	})

	$(document).on('click', "#POSCustomereditAccountExpiration", function (event) {
		$(this).on('change', function (event) {
			var jsDate = event.args.date; 
			var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
			var date = $(this).jqxDateTimeInput('getDate');
			var formattedDate = $.jqx.dataFormat.formatdate(date, 'd');
			EditDetectChanges(formattedDate, PreloadEditCustomerAccountExp);
		})
	}); 

	$(document).on('submit', '#EditCustomerAccount', function(e){
		e.preventDefault();
		var passcode = $("#number_field").val();
		var hashpasscode = CryptoJS.MD5(passcode);
		var postdata ="passcode="+hashpasscode;
			postdata+="&FunctionButton=CustomerEdit";
		posData.EnterPassCode(postdata)
		.success(function(data){
			if(data.success){
				if(data.login){
					var customerid = $scope.customer.id;
					EditCustomerWindow(customerid)
					.then(function(rewardsdata){
						CustomerPurchases(customerid)
						.then(function(){
							CustomerPointsRewards(rewardsdata);
							var postData ="CustomerUnique="+customerid;
							posData.GetCustomerProfile(postData)
							.success(function(data){
								ClearEditCustomerFields();
								WindowEditCustomerWindow('Edit Customer ' + customerid + " | " + data.fname+ " " + data.lname)
								.then(function(){
									$("#POSCustomereditAccountExpiration").jqxDateTimeInput({formatString: 'd'});
									$("#POSCustomereditFirstName").val(data.fname);
									$("#POSCustomereditLastName").val(data.lname);
									$("#POSCustomereditCompany").val(data.company);
									$("#POSCustomereditAddress1").val(data.addr1);
									$("#POSCustomereditAddress2").val(data.addr2);
									$("#POSCustomereditPhone1").val(data.p1);
									$("#POSCustomereditPhone2").val(data.p2);
									$("#POSCustomereditPhone3").val(data.p3);
									$("#POSCustomereditFax").val(data.fax); 		
									$("#POSCustomereditEmail").val(data.email);
									$("#POSCustomereditEmail2").val(data.email2);
									$("#POSCustomereditEmail3").val(data.email3);
									$("#POSCustomereditEmail4").val(data.email4);
									$("#POSCustomereditWebsite").val(data.website);
									$("#POSCustomereditCustom1").val(data.cust1);
									$("#POSCustomereditCustom2").val(data.cust2);
									$("#POSCustomereditCustom3").val(data.cust3);
									$("#POSCustomereditCustom4").val(data.cust4);
									$("#POSCustomereditCustom5").val(data.cust5);
									$("#POSCustomereditCustom6").val(data.cust6);
									$("#POSCustomereditCustom7").val(data.cust7);
									$("#POSCustomereditNote").val(data.note);
									$("#POSCustomereditZipcode").val(data.zip);
									$("#POSCustomereditCity").val(data.city);
									$("#POSCustomereditState").val(data.state);
									$("#POSCustomereditCounty").val(data.county);
									$("#POSCustomereditCountry").val(data.country);
									$("#POSCustomereditAccountStatus").val(data.AccountStatus);
									$("#POSCustomereditCreditLimit").val(data.CreditLimit);
									$("#POSCustomereditAccountNo").val(data.AccountNumber);
									var ResoWidth 			= $("#edit-customer-form").width();
									var ResoHeight 			= $("#edit-customer-form").height();
									var SearchBtn 			= $(".jqx-tabs-header").height();
									var ComputeHeight		= ResoHeight - 80;
									var UseHeight			= ComputeHeight - SearchBtn;
									var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		
									if(rewardsdata.PointsSetup){
										$("#jqxExpander").jqxExpander({ width: '460px', theme: 'dark'});
									}

									$('#editTabs').jqxTabs({height:UseHeight, selectedItem: 0});

									$('#editTabs').on('tabclick', function (event){ 
										var clickedItem = event.args.item;
										if(clickedItem == 1){
											$("#customer_purchases_print").show();
										}else{
											$("#customer_purchases_print").hide();
										} 
									}); 

									$(".editcustomer").each(function(){
										if($(this).attr("autofocus")){
											$(this).focus();
										}
									})

									$("#editCustomerAccountStatus").on('change', function(){
										$scope.EnabledEditButton();
									})

									$(".datalist").on('change', function(){
										$scope.EnabledEditButton();
									})

									$('#editCustomerCreditLimit').on('textchanged', function (event){
										var text = event.args.text;
										$scope.EnabledEditButton();
									}); 

									$("#purchase_history").on('rowselect', function (event){
										var rowindex = event.args.rowindex;
										var datafield = event.args.datafield;
										var row = $(this).jqxGrid('getrowdata', rowindex);
										CustomerPurchaseUnique = row.Unique;
									});
								})
							})
						})
						$("#dialog-numpad-passcode").jqxWindow('close');
					})
				}else{
					$("#dialog-numpad-passcode").jqxWindow('close');
					NumpadAlertOk('edit_customer_invalid_code', data.msg)
					.then(function(){
						WindowPopupAlert('Info');
					})
				}
			}else{
				$("#dialog-numpad-passcode").jqxWindow('close');
				NumpadAlertOk('edit_customer_invalid_code', data.msg)
				.then(function(){
					WindowPopupAlert('Info');
				})
			}
		})
	})

	$(document).on("click", "#customer_purchases_print", function(){
		if(CustomerPurchaseUnique != null){
			var postdata ="ReceiptDetailsUnique="+CustomerPurchaseUnique;
			posData.CustomerPurchasedPrint(postdata)
			.success(function(data){
				if(data.success){
					if(data.print){
						var msg = "Receipt printed";
						NumpadAlertClose ('purchased_print', msg)
						.then(function(){
							WindowPopupAlert("Info");
						})
					}else{
						var msg ="Sorry, cannot print due to printer error.</br>";
							msg+="Please check your printer.";
						NumpadAlertClose ('purchased_no_data', msg)
						.then(function(){
							WindowPopupAlert("Warning");
						})
					}
				}else{
					var msg = "No Data";
					NumpadAlertClose ('purchased_no_data', msg)
					.then(function(){
						WindowPopupAlert("Warning");
					})
				}
			})
		}else{
			var msg = "Please select receipt to print";
			NumpadAlertClose ('purchased_id_invalid', msg)
			.then(function(){
				WindowPopupAlert("Info");
			})
		}
	})

	$scope.EditConfirmSaveCancel = function(){
		$scope.EditCustomerSaveDisabled = false;
		$scope.EditCustomerDefaultButtons = true;
		$scope.EditCustomerWhenCloseSaveChanges = false;
		$scope.EditCustomerWhenDelete = false;
		$("#customer_purchases_print").hide();
		$('#editTabs').jqxTabs({ selectedItem: 0 });
		$('#tab1').unblock();
		$('#tab2').unblock();
	} 

	/*
	|-------------------------------------------------------------------------
	| Email Validation
	|-------------------------------------------------------------------------
	*/
	var check_email = function(val){
		if(!val.match(/\S+@\S+\.\S+/)){
			return false;
		}
		if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
			return false;
		}
		return true;
	}
	
	/*
	|-------------------------------------------------------------------------
	| Customer Add new profile
	|-------------------------------------------------------------------------
	*/
	$(document).on('click', "#add_save", function(e){
		e.preventDefault();
	
		var required_count = 0;
		var postData="fname="+ ($("#POSCustomerFirstName").val() ? encodeURIComponent($("#POSCustomerFirstName").val()) : '');
			postData+="&lname="+ ($("#POSCustomerLastName").val() ? encodeURIComponent($("#POSCustomerLastName").val()) : '');
			postData+="&mname="+ ($("#POSCustomerMiddleName").val() ? encodeURIComponent($("#POSCustomerMiddleName").val()) : '');
			postData+="&company="+ ($("#POSCustomerCompany").val() ? encodeURIComponent($("#POSCustomerCompany").val()) : '') ;
			postData+="&address1="+ ($("#POSCustomerAddress1").val() ? encodeURIComponent($("#POSCustomerAddress1").val()) : '');
			postData+="&address2="+ ($("#POSCustomerAddress2").val() ? encodeURIComponent($("#POSCustomerAddress2").val()) : '');
			postData+="&phone1="+ ($("#POSCustomerPhone1").val() ? $("#POSCustomerPhone1").val() : '');
			postData+="&phone2="+ ($("#POSCustomerPhone2").val() ? $("#POSCustomerPhone2").val() : '');
			postData+="&phone3="+ ($("#POSCustomerPhone3").val() ? $("#POSCustomerPhone3").val(): '');
			postData+="&fax="+ ($("#POSCustomerFax").val() ? $("#POSCustomerFax").val() : '');
			postData+="&email="+ ($("#POSCustomerEmail").val() ? $("#POSCustomerEmail").val() : '');
			postData+="&website="+ ($("#POSCustomerWebsite").val() ? $("#POSCustomerWebsite").val() : '');
			postData+="&custom1="+ ($("#POSCustomerCustom1").val() ? encodeURIComponent($("#POSCustomerCustom1").val()) : '');
			postData+="&custom2="+ ($("#POSCustomerCustom2").val() ? encodeURIComponent($("#POSCustomerCustom2").val()) : '');
			postData+="&custom3="+ ($("#POSCustomerCustom3").val() ? encodeURIComponent($("#POSCustomerCustom3").val()) : '');
			postData+="&custom4="+ ($("#POSCustomerCustom4").val() ? encodeURIComponent($("#POSCustomerCustom4").val()) : '');
			postData+="&custom5="+ ($("#POSCustomerCustom5").val() ? encodeURIComponent($("#POSCustomerCustom5").val()) : '');
			postData+="&custom6="+ ($("#POSCustomerCustom6").val() ? encodeURIComponent($("#POSCustomerCustom6").val()) : '');
			postData+="&custom7="+ ($("#POSCustomerCustom7").val() ? encodeURIComponent($("#POSCustomerCustom7").val()) : '');
			postData+="&customnote="+ ($("#POSCustomerNote").val() ? encodeURIComponent($("#POSCustomerNote").val()) : '');
			postData+="&zipcode="+ ($("#POSCustomerZipcode").val() ? $("#POSCustomerZipcode").val() : '');
			postData+="&city="+ ($("#POSCustomerCity").val() ? $("#POSCustomerCity").val() : '');
			postData+="&state="+ ($("#POSCustomerState").val() ? $("#POSCustomerState").val() : '');
			postData+="&county="+ ($("#POSCustomerCounty").val() ? $("#POSCustomerCounty").val() : '');
			postData+="&country="+ ($("#POSCustomerCountry").val() ? $("#POSCustomerCountry").val() : '');
			postData+="&AccountStatus="+ ($("#POSCustomerAccountStatus").val() ? $("#POSCustomerAccountStatus").val() : '');
			postData+="&CreditLimit="+ ($("#POSCustomerCreditLimit").val() ? $("#POSCustomerCreditLimit").val() : 0);
			postData+="&AccountNo="+ ($("#POSCustomerAccountNo").val() ? $("#POSCustomerAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomerPoints").val() ? $("#POSCustomerPoints").val() : null);
			postData+="&AccountExpiration="+ ($("#POSCustomerAccountExpiration").val() ? $("#POSCustomerAccountExpiration").val() : '');
			postData+="&AccountNo="+$("#POSCustomerAccountNo").val();
			postData+="&birthday="+ ($("#POSCustomerBirthday").val() ? $("#POSCustomerBirthday").val() : '');


		var strCountPhone1 = $("#POSCustomerPhone1").val();
			strCountPhone1 = strCountPhone1.replace(/[- )(]/g,'');
		
		if( (strCountPhone1.length > 0 && strCountPhone1.length < 7) || strCountPhone1.length > 10 || (strCountPhone1.length > 7 && strCountPhone1.length < 10) ){
			var msg = "Invalid Phone number please try again.";
			NumpadAlertClose('invalid_email', msg)
			.then(function(){
				WindowPopupAlert('Alert message');
			})
			return false;
		}

		$(".addcustomer").each(function(){
			var required  = $(this).prop("required");
			if(required){
				if($(this).val() == ''){
					$(this).css({border: '1px solid #ff0000'});
					required_count++;
				}else{
					$(this).css({border: '1px solid #ccc'});
				}
			}
		});	

		if(required_count > 0){
			
		}else{
			if(document.getElementById('POSCustomerEmail')){
				if($("#POSCustomerEmail").val() != ''){
					if(check_email($("#POSCustomerEmail").val())){
						
						posData.SaveNewCustomer(postData)
						.success(function(data){
							if(data.success == true){
								newCustomerCreated = data.newcustomerId;
								Customer_created_reload(newCustomerCreated);
								setTimeout(function(){
									$('#addtab1').unblock();
									ClearCustomerForm();
								},100);
								
								setTimeout( () => {
									$("#add-customer-form").jqxWindow('close');
								},100)
							}else{
								// var msg = "Possible duplicate customer<br>";
								// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
								// 	msg+="Do you still want to create this customer?";
								var msg = "Do you still want to create this customer?";
								MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
								.then(function(){
									MessageWindowAlertYesNo('Message info');
								})
							}
						})
					}else{
						var msg = "Please type a valid email address.";
						NumpadAlertClose('invalid_email', msg)
						.then(function(){
							WindowPopupAlert('Alert message');
						})
					}
				}else{
					posData.SaveNewCustomer(postData)
					.success(function(data){
						if(data.success == true){
							newCustomerCreated = data.newcustomerId;
							Customer_created_reload(newCustomerCreated);
							ClearCustomerForm();

							setTimeout(function(){
								$('#addtab1').unblock();
								$scope.AddCustomerWhenClose = '';
							})

							setTimeout( () => {
								$("#add-customer-form").jqxWindow('close');
							},100)
						}else{
							// var msg = "Possible duplicate customer<br>";
							// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
							// 	msg+="Do you still want to create this customer?";
							var msg = "Do you still want to create this customer?";
							MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
							.then(function(){
								MessageWindowAlertYesNo('Message info');
							})
						}
					})

				}
			}else{
				posData.SaveNewCustomer(postData)
				.success(function(data){
					if(data.success == true){
						newCustomerCreated = data.newcustomerId;
						Customer_created_reload(newCustomerCreated);
						ClearCustomerForm();

						setTimeout(function(){
							$('#addtab1').unblock();
							$scope.AddCustomerWhenClose = '';
						})

						setTimeout( () => {
							$("#add-customer-form").jqxWindow('close');
						},100)
					}else{
						// var msg = "Possible duplicate customer<br>";
						// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
						// 	msg+="Do you still want to create this customer?";
						var msg = "Do you still want to create this customer?";
						MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
						.then(function(){
							MessageWindowAlertYesNo('Message info');
						})
					}
				})
			}
		}
	})

	//-->Not using this function
	$(document).on('click', '#NewCustomerSave', function(e){
		e.preventDefault();
		var required_count = 0;
		var postData="fname="+ ($("#POSCustomerFirstName").val() ? $("#POSCustomerFirstName").val() : '');
			postData+="&lname="+ ($("#POSCustomerLastName").val() ? $("#POSCustomerLastName").val() : '');
			postData+="&mname="+($("#POSCustomerMiddleName").val() ? $("#POSCustomerMiddleName").val() : '');
			postData+="&company="+ ($("#POSCustomerCompany").val() ? $("#POSCustomerCompany").val() : '') ;
			postData+="&address1="+ ($("#POSCustomerAddress1").val() ? $("#POSCustomerAddress1").val() : '');
			postData+="&address2="+ ($("#POSCustomerAddress2").val() ? $("#POSCustomerAddress2").val() : '');
			postData+="&phone1="+ ($("#POSCustomerPhone1").val() ? $("#POSCustomerPhone1").val() : '');
			postData+="&phone2="+ ($("#POSCustomerPhone2").val() ? $("#POSCustomerPhone2").val() : '');
			postData+="&phone3="+ ($("#POSCustomerPhone3").val() ? $("#POSCustomerPhone3").val(): '');
			postData+="&fax="+ ($("#POSCustomerFax").val() ? $("#POSCustomerFax").val() : '');
			postData+="&email="+ ($("#POSCustomerEmail").val() ? $("#POSCustomerEmail").val() : '');
			postData+="&website="+ ($("#POSCustomerWebsite").val() ? $("#POSCustomerWebsite").val() : '');
			postData+="&custom1="+ ($("#POSCustomerCustom1").val() ? $("#POSCustomerCustom1").val() : '');
			postData+="&custom2="+ ($("#POSCustomerCustom2").val() ? $("#POSCustomerCustom2").val() : '');
			postData+="&custom3="+ ($("#POSCustomerCustom3").val() ? $("#POSCustomerCustom3").val() : '');
			postData+="&custom4="+ ($("#POSCustomerCustom5").val() ? $("#POSCustomerCustom4").val() : '');
			postData+="&custom5="+ ($("#POSCustomerCustom6").val() ? $("#POSCustomerCustom5").val() : '');
			postData+="&custom6="+ ($("#POSCustomerCustom7").val() ? $("#POSCustomerCustom6").val() : '');
			postData+="&custom7="+ ($("#POSCustomerCustom8").val() ? $("#POSCustomerCustom7").val() : '');
			postData+="&customnote="+ ($("#POSCustomerNote").val() ? $("#POSCustomerNote").val() : '');
			postData+="&zipcode="+ ($("#POSCustomerZipcode").val() ? $("#POSCustomerZipcode").val() : '');
			postData+="&city="+ ($("#POSCustomerCity").val() ? $("#POSCustomerCity").val() : '');
			postData+="&state="+ ($("#POSCustomerState").val() ? $("#POSCustomerState").val() : '');
			postData+="&county="+ ($("#POSCustomerCounty").val() ? $("#POSCustomerCounty").val() : '');
			postData+="&country="+ ($("#POSCustomerCountry").val() ? $("#POSCustomerCountry").val() : '');
			postData+="&AccountStatus="+ ($("#POSCustomerAccountStatus").val() ? $("#POSCustomerAccountStatus").val() : '');
			postData+="&CreditLimit="+ ($("#POSCustomerCreditLimit").val() ? $("#POSCustomerCreditLimit").val() : 0);
			postData+="&AccountNo="+ ($("#POSCustomerAccountNo").val() ? $("#POSCustomerAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomerPoints").val() ? $("#POSCustomerPoints").val() : null);
			postData+="&AccountExpiration="+ ($("#POSCustomerAccountExpiration").val() ? $("#POSCustomerAccountExpiration").val() : '');
			postData+="&birthday="+ ($("#POSCustomerBirthday").val() ? $("#POSCustomerBirthday").val() : '');

		var strCountPhone1 = $("#POSCustomerPhone1").val();
		strCountPhone1 = strCountPhone1.replace(/[- )(]/g,'');
	
		if( (strCountPhone1.length > 0 && strCountPhone1.length < 7) || strCountPhone1.length > 10 || (strCountPhone1.length > 7 && strCountPhone1.length < 10) ){
			var msg = "Invalid Phone number please try again.";
			NumpadAlertClose('invalid_email', msg)
			.then(function(){
				WindowPopupAlert('Alert message');
			})
			return false;
		}


		$(".addcustomer").each(function(){
			var required  = $(this).prop("required");
			if(required){
				if($(this).val() == ''){
					$(this).css({border: '1px solid #ff0000'});
					required_count++;
				}else{
					$(this).css({border: '1px solid #ccc'});
				}
			}
		});	

		if(required_count > 0){
			
		}else{
			if(document.getElementById('POSCustomerEmail')){
				if($("#POSCustomerEmail").val() != ''){
					if(check_email($("#POSCustomerEmail").val())){
						posData.SaveNewCustomer(postData)
						.success(function(data){
							if(data.success == true){
								newCustomerCreated = data.newcustomerId;
								Customer_created_reload(newCustomerCreated);

								setTimeout(function(){
									$('#addtab1').unblock();
									ClearCustomerForm();
								},100)

								setTimeout( () => {
									$("#add-customer-form").jqxWindow('close');
								},100)
							}else{
								// var msg = "Possible duplicate customer<br>";
								// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
								var msg = "Do you still want to create this customer?";
								MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
								.then(function(){
									MessageWindowAlertYesNo('Message info');
								})
							}
						})
					}else{
						var msg = "Please type a valid email address.";
						NumpadAlertClose('invalid_email', msg)
						.then(function(){
							WindowPopupAlert('Alert message');
						})
					}
				}else{
					posData.SaveNewCustomer(postData)
					.success(function(data){
						if(data.success == true){
							newCustomerCreated = data.newcustomerId;
							Customer_created_reload(newCustomerCreated);
							ClearCustomerForm();

							setTimeout(function(){
								$('#addtab1').unblock();
								$scope.AddCustomerWhenClose = '';
							},100)

							setTimeout( () => {
								$("#add-customer-form").jqxWindow('close');
							},100)
						}else{
							// var msg = "Possible duplicate customer<br>";
							// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
							var msg = "Do you still want to create this customer?";
							MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
							.then(function(){
								MessageWindowAlertYesNo('Message info');
							})
						}
					})
				}
			}else{
				posData.SaveNewCustomer(postData)
				.success(function(data){
					if(data.success == true){
						newCustomerCreated = data.newcustomerId;
						Customer_created_reload(newCustomerCreated);
						ClearCustomerForm();

						setTimeout(function(){
							$('#addtab1').unblock();
							$scope.AddCustomerWhenClose = '';
						},100)

						setTimeout( () => {
							$("#add-customer-form").jqxWindow('close');
						},100)
					}else{
						// var msg = "Possible duplicate customer<br>";
						// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
						var msg = "Do you still want to create this customer?";
						MessageAlertYesNo('customer_duplicate_save_yes_no', data, msg)
						.then(function(){
							MessageWindowAlertYesNo('Message info');
						})
					}
				})
			}
		}
	})

	$(document).on('submit', '#customer_duplicate_save_yes_no, #customer_duplicate_save', function(e){
		e.preventDefault();
		var postData="fname="+ ($("#POSCustomerFirstName").val() ? $("#POSCustomerFirstName").val() : '');
			postData+="&lname="+ ($("#POSCustomerLastName").val() ? $("#POSCustomerLastName").val() : '');
			postData+="&mname="+($("#POSCustomerMiddleName").val() ? $("#POSCustomerMiddleName").val() : '');
			postData+="&company="+ ($("#POSCustomerCompany").val() ? $("#POSCustomerCompany").val() : '') ;
			postData+="&address1="+ ($("#POSCustomerAddress1").val() ? $("#POSCustomerAddress1").val() : '');
			postData+="&address2="+ ($("#POSCustomerAddress2").val() ? $("#POSCustomerAddress2").val() : '');
			postData+="&phone1="+ ($("#POSCustomerPhone1").val() ? $("#POSCustomerPhone1").val() : '');
			postData+="&phone2="+ ($("#POSCustomerPhone2").val() ? $("#POSCustomerPhone2").val() : '');
			postData+="&phone3="+ ($("#POSCustomerPhone3").val() ? $("#POSCustomerPhone3").val(): '');
			postData+="&fax="+ ($("#POSCustomerFax").val() ? $("#POSCustomerFax").val() : '');
			postData+="&email="+ ($("#POSCustomerEmail").val() ? $("#POSCustomerEmail").val() : '');
			postData+="&website="+ ($("#POSCustomerWebsite").val() ? $("#POSCustomerWebsite").val() : '');
			postData+="&custom1="+ ($("#POSCustomerCustom1").val() ? $("#POSCustomerCustom1").val() : '');
			postData+="&custom2="+ ($("#POSCustomerCustom2").val() ? $("#POSCustomerCustom2").val() : '');
			postData+="&custom3="+ ($("#POSCustomerCustom3").val() ? $("#POSCustomerCustom3").val() : '');
			postData+="&custom4="+ ($("#POSCustomerCustom5").val() ? $("#POSCustomerCustom4").val() : '');
			postData+="&custom5="+ ($("#POSCustomerCustom6").val() ? $("#POSCustomerCustom5").val() : '');
			postData+="&custom6="+ ($("#POSCustomerCustom7").val() ? $("#POSCustomerCustom6").val() : '');
			postData+="&custom7="+ ($("#POSCustomerCustom8").val() ? $("#POSCustomerCustom7").val() : '');
			postData+="&customnote="+ ($("#POSCustomerNote").val() ? $("#POSCustomerNote").val() : '');
			postData+="&zipcode="+ ($("#POSCustomerZipcode").val() ? $("#POSCustomerZipcode").val() : '');
			postData+="&city="+ ($("#POSCustomerCity").val() ? $("#POSCustomerCity").val() : '');
			postData+="&state="+ ($("#POSCustomerState").val() ? $("#POSCustomerState").val() : '');
			postData+="&county="+ ($("#POSCustomerCounty").val() ? $("#POSCustomerCounty").val() : '');
			postData+="&country="+ ($("#POSCustomerCountry").val() ? $("#POSCustomerCountry").val() : '');
			postData+="&AccountStatus="+ ($("#POSCustomerAccountStatus").val() ? $("#POSCustomerAccountStatus").val() : '');
			postData+="&CreditLimit="+ ($("#POSCustomerCreditLimit").val() ? $("#POSCustomerCreditLimit").val() : 0);
			postData+="&AccountNo="+ ($("#POSCustomerAccountNo").val() ? $("#POSCustomerAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomerPoints").val() ? $("#POSCustomerPoints").val() : null);
			postData+="&AccountExpiration="+ ($("#POSCustomerAccountExpiration").val() ? $("#POSCustomerAccountExpiration").val() : '');
			postData+="&birthday="+ ($("#POSCustomerBirthday").val() ? $("#POSCustomerBirthday").val() : '');
			postData+="&DuplicateSave=1";

		posData.SaveNewCustomer(postData)
		.success(function(data){
			if(data.success == true){
				newCustomerCreated = data.newcustomerId;
				Customer_created_reload(newCustomerCreated);

				setTimeout(function(){
					$('#addtab1').unblock();
					ClearCustomerForm();
				},100)

				setTimeout( () => {
					$("#add-customer-form").jqxWindow('close');
				},100)
			}
		})

		setTimeout( () => {
			$("#add-customer-form").jqxWindow('close');

		},100)

		$("#customer_duplicate_message").jqxWindow('close');
		$("#edit-customer-form").jqxWindow('close');
	})

	$(document).on('click', '#customer_duplicate_no', function(e){
		e.preventDefault();

		setTimeout( () => {
			$("#add-customer-form").jqxWindow('close');
		},100)

		$("#customer_duplicate_message").jqxWindow('close');
	})

	$(document).on('click', "#customer_duplicate_cancel", function(e){
		e.preventDefault();
		$("#POSCustomerFirstName").focus();
		$("#customer_duplicate_message").jqxWindow('close');
	})


	/* Exit Add Customer Form */
	$scope.ExitNewCustomer = function(){
		var addButtonSave = $("#add_save").attr("disabled");
		if(addButtonSave){
			$("#add-customer-form").jqxWindow('close');
			$("#customer_search_text").focus();
		}else{
			$scope.primary_buttons = false;
			$scope.secondary_buttons = true;
		}
	}

	$scope.ExitNewCustomerNo = function(){
		$('#addtab1').unblock();
		$scope.AddCustomerWhenClose = '';
		ClearCustomerForm();
		$("#add-customer-form").jqxWindow('close');
		$("#customer_search_text").focus();
	};

	$scope.CancelNewCustomerNo = function(){
		$scope.primary_buttons = true;
		$scope.secondary_buttons = false;
		$('#addtab1').unblock();
		$("#firstname").focus();
	}

	var populateCustomerWindow = function(){
		var def = $.Deferred();
		$("#pos_customer_search").append('<div id="pos_customer_search_container" style="background: #144766; overflow:hidden;"></div>');
		$("#pos_customer_search_container").html('');
		var postdata ="CustomerUnique=" + $scope.customer.id;
			postdata+="&CustomerType=" + $scope.CustomerType;
		posData.createCustomerWindow(postdata)
		.success(function(data){
			/*
			var CustomerSearchContainer = getElementById('pos_customer_search_container');
			var script= document.createElement('script');
				script.type= 'text/javascript';
				script.id= 'customer_keypress_script';
				script.textContent = 'function KeyPress(e) {}';
				CustomerSearchContainer.appendChild(script);
			*/
			
			$("#pos_customer_search_container").append(
				'<div id="customer_keypress_script" onkeydown="KeyPress(event)"></div>'+
				'<script type="text/javascript" id="customer_keypress_script">'+
					'var BarcodeScanner = false;'+
					'function KeyPress(e) {'+
						'var evtobj = window.event? event : e;'+
						'if (evtobj.keyCode == 66 && evtobj.ctrlKey) {'+
							'$("#customer_search_text").focus();'+
							'BarcodeScanner = true'+
						'}'+
					'}'+
					'document.onkeydown = KeyPress;'+
				'</script>'
			);
		
			$("#pos_customer_search_container").append($compile(data.html)($scope));
			def.resolve(data.customers);
		})
		return def.promise();
	}

	var WindowCustomerWindow = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#pos_customer_search").jqxWindow({
				minHeight: '100%',
				minWidth: '100%',
				isModal: true,
				theme: 'darkblue',
				title: '<button id="pos_customer_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;'+header_text,
				showCloseButton: false,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#pos_customer_search').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var CustomerWindow = function(){
		var def = $.Deferred();
		populateCustomerWindow()
		.then(function(data){
			def.resolve(data);
		});
		return def.promise();
	}

	var CallCustomerWindowPopup = function(){
		CustomerWindow()
		.then(function(data){
			WindowCustomerWindow('Customer')
			.then(function(){
				Customer_grid(customergridtype[0], data);
				$("#customer_search_text").focus();
				bindButton();
			})
		})
	}

	/*
	|-----------------------------------------------------------------------------
	| Customer Search function
	|-----------------------------------------------------------------------------
	*/
	$(document).on("submit", "#customer_search_form", function(){
		var search = $("#customer_search_text").val();
		Customer_data(search);
		$("#customer_search_text").val('');
	})

	/*
	|-----------------------------------------------------------------------------
	| Customer list on search
	|-----------------------------------------------------------------------------
	*/
	var Customer_data = function(search){
		var def = $.Deferred();
		var postdata ="Search="+search;
			postdata+="&ScanningSearch="+BarcodeScanner;
		$http({
			url: base_url + 'pos/pointofsale/customer/search',
			method: 'post',
			data: postdata,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var source = {
				localdata: data.result
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#customer-search").jqxGrid({
				source: dataAdapter,
			});
			BarcodeScanner = false;
		}).then(function(){
			setTimeout(function(){
				$('#customer-search').jqxGrid('selectrow', 0);
				$("#customer_search_text").focus();
			},100);
			def.resolve();
		})
		return def.promise();
	}

	/*
	|-----------------------------------------------------------------------------
	| Customer list reload after create new 
	|-----------------------------------------------------------------------------
	*/
	var Customer_created_reload = function(unique){
		var ResoWidth 	        = $("#fakeheight").width();
		var ResoHeight 	        = $("#fakeheight").height();
		var ComputeHeight		= ResoHeight - 70;
		var CustomerSearch 		= ComputeHeight - 40;
		var UseHeight			= CustomerSearch;
		var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		var def = $.Deferred();
		var postdata ="CustomerUnique="+unique;
		$http({
			method: 'post',
			url: base_url + 'pos/pointofsale/customer/get-new-customer',
			data: postdata,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var source = {
				localdata: data.result
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#customer-search").jqxGrid({
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				source: dataAdapter,
				rowsheight: GridRowHeight
			});
		}).then(function(){
			setTimeout(function(){
				$('#customer-search').jqxGrid('selectrow', 0);
				$("#customer_search_text").focus();
			},1000);
			def.resolve();
		})
		return def.promise();
	}

	/*
	|-----------------------------------------------------------------------------
	| Customer load list
	|-----------------------------------------------------------------------------
	*/
	var Customer_data_reload = function(){
		var ResoWidth 	        = $("#fakeheight").width();
		var ResoHeight 	        = $("#fakeheight").height();
		var ComputeHeight		= ResoHeight - 70;
		var CustomerSearch 		= ComputeHeight - 40;
		var UseHeight			= CustomerSearch;
		var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		var def = $.Deferred();
		$http({
			url: base_url + 'pos/pointofsale/customer/reload/changes',
			method: 'get'
		}).success(function(data){
			var source = {
				localdata: data.result
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#customer-search").jqxGrid({
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				source: dataAdapter,
				rowsheight: GridRowHeight
			});

		}).then(function(){
			setTimeout(function(){
				$('#customer-search').jqxGrid('selectrow', 0);
				$("#customer_search_text").focus();
			},1000);
			def.resolve();
		})
		return def.promise();
	}

	/*
	|-----------------------------------------------------------------------------
	| Clear Add Customer fields
	|-----------------------------------------------------------------------------
	*/
	var ClearCustomerForm = function(){
		$("#POSCustomerFirstName").val('');
		$("#POSCustomerLastName").val('');
		$("#POSCustomerCompany").val('');
		$("#POSCustomerAddress1").val('');
		$("#POSCustomerAddress2").val('');
		$("#POSCustomerPhone1").val('');
		$("#POSCustomerPhone2").val('');
		$("#POSCustomerPhone3").val('');
		$("#POSCustomerEmail").val('');
		$("#POSCustomerFax").val('');
		$("#POSCustomerWebsite").val('');
		$("#POSCustomerCustom1").val('');
		$("#POSCustomerCustom2").val('');
		$("#POSCustomerCustom3").val('');
		$("#POSCustomerCustom4").val('');
		$("#POSCustomerCustom5").val('');
		$("#POSCustomerCustom6").val('');
		$("#POSCustomerCustom7").val('');
		$("#POSCustomerNote").val('');
		$("#POSCustomerState").val('');
		$("#POSCustomerZipcode").val('');
		$("#POSCustomerCity").val('');
		$("#POSCustomerCounty").val('');
		$("#POSCustomerCountry").val('');
		//$("#CustomerAccountStatus").val('Active');
		$("#POSCustomerCreditLimit").val(0);
		$("#POSCustomerAccountNo").val('');
		//$("#POSCustomerPoints").val(0);
		$scope.AddCustomerSaveDisabled 	= true;
		$scope.primary_buttons = true;
		$scope.secondary_buttons = false;
		
	};

	/*
	|----------------------------------------------------------------------------
	| Clear Edit Customer fields
	|----------------------------------------------------------------------------
	*/
	var ClearEditCustomerFields = function(){
		$("#POSCustomereditFirstName").val('');
		$("#POSCustomereditLastName").val('');
		$("#POSCustomereditCompany").val('');
		$("#POSCustomereditAddress1").val('');
		$("#POSCustomereditAddress2").val('');
		$("#POSCustomereditPhone1").val('');
		$("#POSCustomereditPhone2").val('');
		$("#POSCustomereditPhone3").val('');
		$("#POSCustomereditEmail").val('');
		$("#POSCustomereditFax").val('');
		$("#POSCustomereditWebsite").val('');
		$("#POSCustomereditCustom1").val('');
		$("#POSCustomereditCustom2").val('');
		$("#POSCustomereditCustom3").val('');
		$("#POSCustomereditCustom4").val('');
		$("#POSCustomereditCustom5").val('');
		$("#POSCustomereditCustom6").val('');
		$("#POSCustomereditCustom7").val('');
		$("#POSCustomereditNote").val('');
		$("#POSCustomereditZipcode").val('');
		$("#POSCustomereditCity").val('');
		$("#POSCustomereditState").val('');
		$("#POSCustomereditCounty").val('');
		$("#POSCustomereditCountry").val('');
		$("#POSCustomereditAccountNo").val('');
		$("#POSCustomereditCreditLimit").val(0);
		$("#POSCustomereditPoints").val(0);
		//$("#editCustomerAccountStatus").val('Active');
	}

	/*
	|----------------------------------------------------------------------------
	| Update Customer profile
	|----------------------------------------------------------------------------
	*/
	$(document).on('click', '#EditBtnUpdate', function(e){
		e.preventDefault();
		var required_count = 0;
		var $this = $("#EditBtnUpdate"); 
		$this.attr({"disabled": true});
		setTimeout(function(){
			$this.attr({"disabled": false});
		},1000);
		var customerid = $scope.customer.id;
		var postData ="customerid="+customerid;
			postData+="&fname="+ ($("#POSCustomereditFirstName").val() ? encodeURIComponent($("#POSCustomereditFirstName").val()) : '');
			postData+="&lname="+($("#POSCustomereditLastName").val() ? encodeURIComponent($("#POSCustomereditLastName").val()) : ''); 
			postData+="&mname="+($("#POSCustomereditMiddleName").val() ? encodeURIComponent($("#POSCustomereditMiddleName").val()) : '');
			postData+="&company="+($("#POSCustomereditCompany").val() ? encodeURIComponent($("#POSCustomereditCompany").val()) : '');
			postData+="&addr1="+($("#POSCustomereditAddress1").val() ? encodeURIComponent($("#POSCustomereditAddress1").val()) : '');
			postData+="&addr2="+($("#POSCustomereditAddress2").val() ? encodeURIComponent($("#POSCustomereditAddress2").val()) : '');
			postData+="&phone1="+($("#POSCustomereditPhone1").val() ? $("#POSCustomereditPhone1").val() : '');
			postData+="&phone2="+($("#POSCustomereditPhone2").val() ? $("#POSCustomereditPhone2").val() : '');
			postData+="&phone3="+($("#POSCustomereditPhone3").val() ? $("#POSCustomereditPhone3").val() : '');
			postData+="&email="+($("#POSCustomereditEmail").val() ? $("#POSCustomereditEmail").val() : '');
			postData+="&email2="+($("#POSCustomereditEmail2").val() ? $("#POSCustomereditEmail2").val() : '');
			postData+="&email3="+($("#POSCustomereditEmail3").val() ? $("#POSCustomereditEmail3").val() : '');
			postData+="&email4="+($("#POSCustomereditEmail4").val() ? $("#POSCustomereditEmail4").val() : '');
			postData+="&fax="+($("#POSCustomereditFax").val() ? $("#POSCustomereditFax").val() : '');
			postData+="&website="+($("#POSCustomereditWebsite").val() ? $("#POSCustomereditWebsite").val() : '');
			postData+="&custom1="+($("#POSCustomereditCustom1").val() ? encodeURIComponent($("#POSCustomereditCustom1").val()) : '');
			postData+="&custom2="+($("#POSCustomereditCustom2").val() ? encodeURIComponent($("#POSCustomereditCustom2").val()) : '');
			postData+="&custom3="+($("#POSCustomereditCustom3").val() ? encodeURIComponent($("#POSCustomereditCustom3").val()) : '');
			postData+="&custom4="+($("#POSCustomereditCustom4").val() ? encodeURIComponent($("#POSCustomereditCustom4").val()) : '');
			postData+="&custom5="+($("#POSCustomereditCustom5").val() ? encodeURIComponent($("#POSCustomereditCustom5").val()) : '');
			postData+="&custom6="+($("#POSCustomereditCustom6").val() ? encodeURIComponent($("#POSCustomereditCustom6").val()) : '');
			postData+="&custom7="+($("#POSCustomereditCustom7").val() ? encodeURIComponent($("#POSCustomereditCustom7").val()) : '');
			postData+="&customnote="+($("#POSCustomereditNote").val() ? encodeURIComponent($("#POSCustomereditNote").val()) : '');
			postData+="&zipcode="+($("#POSCustomereditZipcode").val() ? $("#POSCustomereditZipcode").val() : '');
			postData+="&city="+($("#POSCustomereditCity").val() ? $("#POSCustomereditCity").val() : '');
			postData+="&state="+($("#POSCustomereditState").val() ? $("#POSCustomereditState").val() : '');
			postData+="&county="+($("#POSCustomereditCounty").val() ? $("#POSCustomereditCounty").val() : '');
			postData+="&country="+($("#POSCustomereditCountry").val() ? $("#POSCustomereditCountry").val() : '');
			postData+="&AccountStatus="+($("#POSCustomereditAccountStatus").val() ? $("#POSCustomereditAccountStatus").val() : '');
			postData+="&CreditLimit="+($("#POSCustomereditCreditLimit").val() ? $("#POSCustomereditCreditLimit").val() : 0);
			postData+="&AccountNumber="+($("#POSCustomereditAccountNo").val() ? $("#POSCustomereditAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomereditPoints").val() ? $("#POSCustomereditPoints").val() : null);
		
		if($("#POSCustomereditAccountExpiration").length > 0){
			postData+="&AccountExpiration="+$("#POSCustomereditAccountExpiration").val();
		}

		if($("#POSCustomereditBirthday").length > 0 ){
			postData+="&birthday="+$("#POSCustomereditBirthday").val();
		}

		var strCountPhone1 = $("#POSCustomereditPhone1").val();
			strCountPhone1 = strCountPhone1.replace(/[- )(]/g,'');
	
		if( (strCountPhone1.length > 0 && strCountPhone1.length < 7) || strCountPhone1.length > 10 || (strCountPhone1.length > 7 && strCountPhone1.length < 10) ){
			var msg = "Invalid Phone number please try again.";
			NumpadAlertClose('invalid_email', msg)
			.then(function(){
				WindowPopupAlert('Alert message');
			})
			return false;
		}
		
		$(".editcustomer").each(function(){
			var required  = $(this).prop("required");
			if(required){
				if($(this).val() == ''){
					$(this).css({border: '1px solid #ff0000'});
					required_count++;
				}else{
					$(this).css({border: '1px solid #ccc'});
				}
			}
		});	

		if(required_count > 0){
			
		}else{
			if(document.getElementById('POSCustomereditEmail')){
				if($("#POSCustomereditEmail").val() != ''){
					if(check_email($("#POSCustomereditEmail").val())){
						posData.EditCustomerProfileSave(postData)
						.success(function(data){
							if(data.success == true){
								editCustomerSelected = data.selectedcustomer;
								$("#EditBtnUpdate").attr("disabled", true);
							}else{
								// var msg = "Possible duplicate customer<br>";
								// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
								// 	msg+="Do you want to update this customer?";
								var msg = "Do you want to update this customer?";
								MessageAlertYesNo('customer_duplicate_update_yes_no', data, msg)
								.then(function(){
									MessageWindowAlertYesNo('Message info');
								})
							}
						}).then(function(){
							$scope.editcustomer = {
								message: ''
							}
							$scope.selectedValue = 25;
							$scope.EditCustomerSaveDisabled = true;
							$scope.EditCustomerDefaultButtons = true;
							$scope.EditCustomerWhenCloseSaveChanges = false;
							$scope.EditCustomerWhenDelete = false;
							$scope.EditCustomerWhenClose = '';
							$('#editTabs').jqxTabs({ selectedItem: 0 });
							$('#tab1').unblock();
							$('#tab2').unblock();
							//$('#edit-customer-form').jqxWindow('close');
							GetSelectedCustomer();
							$scope.editcustomer = {
								message: ''
							}
							//Customer_data_reload();
							Customer_created_reload($scope.customer.id);
						})
					}else{
						var msg = "Please type a valid email address.";
						NumpadAlertClose('invalid_email', msg)
						.then(function(){
							WindowPopupAlert('Alert message');
						})
					}
				}else{
					posData.EditCustomerProfileSave(postData)
					.success(function(data){
						if(data.success == true){
							editCustomerSelected = data.selectedcustomer;
							$("#EditBtnUpdate").attr("disabled", true);
						}else{
							// var msg = "Possible duplicate customer<br>";
							// 	msg+= ($("#POSCustomerFirstName").val() != '' ? 'First name: ' + $("#POSCustomerFirstName").val() : '') + ($("#POSCustomerLastName").val() != '' ? '<br> Last name: ' + $("#POSCustomerLastName").val() : '') + ( $("#POSCustomerPhone1").val() != '' ? '<br> Phone: ' + $("#POSCustomerPhone1").val() : '') + '<br><br>';
							// 	msg+="Do you want to update this customer?";
							var msg = "Do you want to update this customer?";
							MessageAlertYesNo('customer_duplicate_update_yes_no', data, msg)
							.then(function(){
								MessageWindowAlertYesNo('Message info');
							})
						}
					}).then(function(){
						$scope.editcustomer = {
							message: ''
						}
						$scope.selectedValue = 25;
						$scope.EditCustomerSaveDisabled = true;
						$scope.EditCustomerDefaultButtons = true;
						$scope.EditCustomerWhenCloseSaveChanges = false;
						$scope.EditCustomerWhenDelete = false;
						$scope.EditCustomerWhenClose = '';
						$('#editTabs').jqxTabs({ selectedItem: 0 });
						$('#tab1').unblock();
						$('#tab2').unblock();
						//$('#edit-customer-form').jqxWindow('close');
						//GetSelectedCustomer();
						$scope.editcustomer = {
							message: ''
						}
						//Customer_data_reload();
						Customer_created_reload($scope.customer.id);
					})
				}
			}else{
				posData.EditCustomerProfileSave(postData)
				.success(function(data){
					if(data.success == true){
						editCustomerSelected = data.selectedcustomer;
						$("#EditBtnUpdate").attr("disabled", true);
					}
				}).then(function(){
					$scope.editcustomer = {
						message: ''
					}
					$scope.selectedValue = 25;
					$scope.EditCustomerSaveDisabled = true;
					$scope.EditCustomerDefaultButtons = true;
					$scope.EditCustomerWhenCloseSaveChanges = false;
					$scope.EditCustomerWhenDelete = false;
					$scope.EditCustomerWhenClose = '';
					$('#editTabs').jqxTabs({ selectedItem: 0 });
					$('#tab1').unblock();
					$('#tab2').unblock();
					$('#edit-customer-form').jqxWindow('close');
					//GetSelectedCustomer();
					$scope.editcustomer = {
						message: ''
					}
					//Customer_data_reload();
					Customer_created_reload($scope.customer.id);
				})
			}

		}
	})

	$(document).on('submit', '#customer_duplicate_update_yes_no, #customer_duplicate_save', function(e){
		e.preventDefault();
	
		var customerid = $scope.customer.id;
		var postData ="customerid="+customerid;
			postData+="&fname="+ ($("#POSCustomereditFirstName").val() ? encodeURIComponent($("#POSCustomereditFirstName").val()) : '');
			postData+="&lname="+($("#POSCustomereditLastName").val() ? encodeURIComponent($("#POSCustomereditLastName").val()) : ''); 
			postData+="&mname="+($("#POSCustomereditMiddleName").val() ? encodeURIComponent($("#POSCustomereditMiddleName").val()) : '');
			postData+="&company="+($("#POSCustomereditCompany").val() ? encodeURIComponent($("#POSCustomereditCompany").val()) : '');
			postData+="&addr1="+($("#POSCustomereditAddress1").val() ? encodeURIComponent($("#POSCustomereditAddress1").val()) : '');
			postData+="&addr2="+($("#POSCustomereditAddress2").val() ? encodeURIComponent($("#POSCustomereditAddress2").val()) : '');
			postData+="&phone1="+($("#POSCustomereditPhone1").val() ? $("#POSCustomereditPhone1").val() : '');
			postData+="&phone2="+($("#POSCustomereditPhone2").val() ? $("#POSCustomereditPhone2").val() : '');
			postData+="&phone3="+($("#POSCustomereditPhone3").val() ? $("#POSCustomereditPhone3").val() : '');
			postData+="&email="+($("#POSCustomereditEmail").val() ? $("#POSCustomereditEmail").val() : '');
			postData+="&email2="+($("#POSCustomereditEmail2").val() ? $("#POSCustomereditEmail2").val() : '');
			postData+="&email3="+($("#POSCustomereditEmail3").val() ? $("#POSCustomereditEmail3").val() : '');
			postData+="&email4="+($("#POSCustomereditEmail4").val() ? $("#POSCustomereditEmail4").val() : '');
			postData+="&fax="+($("#POSCustomereditFax").val() ? $("#POSCustomereditFax").val() : '');
			postData+="&website="+($("#POSCustomereditWebsite").val() ? $("#POSCustomereditWebsite").val() : '');
			postData+="&custom1="+($("#POSCustomereditCustom1").val() ? encodeURIComponent($("#POSCustomereditCustom1").val()) : '');
			postData+="&custom2="+($("#POSCustomereditCustom2").val() ? encodeURIComponent($("#POSCustomereditCustom2").val()) : '');
			postData+="&custom3="+($("#POSCustomereditCustom3").val() ? encodeURIComponent($("#POSCustomereditCustom3").val()) : '');
			postData+="&custom4="+($("#POSCustomereditCustom4").val() ? encodeURIComponent($("#POSCustomereditCustom4").val()) : '');
			postData+="&custom5="+($("#POSCustomereditCustom5").val() ? encodeURIComponent($("#POSCustomereditCustom5").val()) : '');
			postData+="&custom6="+($("#POSCustomereditCustom6").val() ? encodeURIComponent($("#POSCustomereditCustom6").val()) : '');
			postData+="&custom7="+($("#POSCustomereditCustom7").val() ? encodeURIComponent($("#POSCustomereditCustom7").val()) : '');
			postData+="&customnote="+($("#POSCustomereditNote").val() ? encodeURIComponent($("#POSCustomereditNote").val()) : '');
			postData+="&zipcode="+($("#POSCustomereditZipcode").val() ? $("#POSCustomereditZipcode").val() : '');
			postData+="&city="+($("#POSCustomereditCity").val() ? $("#POSCustomereditCity").val() : '');
			postData+="&state="+($("#POSCustomereditState").val() ? $("#POSCustomereditState").val() : '');
			postData+="&county="+($("#POSCustomereditCounty").val() ? $("#POSCustomereditCounty").val() : '');
			postData+="&country="+($("#POSCustomereditCountry").val() ? $("#POSCustomereditCountry").val() : '');
			postData+="&AccountStatus="+($("#POSCustomereditAccountStatus").val() ? $("#POSCustomereditAccountStatus").val() : '');
			postData+="&CreditLimit="+($("#POSCustomereditCreditLimit").val() ? $("#POSCustomereditCreditLimit").val() : 0);
			postData+="&AccountNumber="+($("#POSCustomereditAccountNo").val() ? $("#POSCustomereditAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomereditPoints").val() ? $("#POSCustomereditPoints").val() : null);
			postData+="&DuplicateSave=1";
			if($("#POSCustomereditAccountExpiration").length > 0){
				postData+="&AccountExpiration="+$("#POSCustomereditAccountExpiration").val();
			}

			if($("#POSCustomereditBirthday").length > 0 ){
				postData+="&birthday="+$("#POSCustomereditBirthday").val();
			}

			posData.EditCustomerProfileSave(postData)
			.success(function(data){
				if(data.success == true){
					Customer_created_reload($scope.customer.id);
					$("#customer_duplicate_message").jqxWindow('close');
					editCustomerSelected = data.selectedcustomer;
					$("#EditBtnUpdate").attr('disabled', true);
					$scope.EditCustomerWhenClose = false;
					$scope.EditCustomerSaveDisabled = false;
					$scope.EditCustomerDefaultButtons = true;
					$scope.EditCustomerWhenCloseSaveChanges = false;
					$scope.EditCustomerWhenDelete = false;
					$("#customer_purchases_print").hide();
					$('#editTabs').jqxTabs({ selectedItem: 0 });
					$('#tab1').unblock();
					$('#tab2').unblock();
					$("#edit-customer-form").jqxWindow('close');
				}
			})
	})	

	$(document).on('click', '#_yes', function(e){
		e.preventDefault();
		var required_count = 0;
		var $this = $("#EditBtnUpdate"); 
		$this.attr({"disabled": true});
		setTimeout(function(){
			$this.attr({"disabled": false});
		},1000);
		var customerid = $scope.customer.id;
		var postData ="customerid="+customerid;
			postData+="&fname="+ ($("#POSCustomereditFirstName").val() ? $("#POSCustomereditFirstName").val() : '');
			postData+="&lname="+($("#POSCustomereditLastName").val() ? $("#POSCustomereditLastName").val() : ''); 
			postData+="&mname="+($("#POSCustomereditMiddleName").val() ? $("#POSCustomereditMiddleName").val() : '');
			postData+="&company="+($("#POSCustomereditCompany").val() ? $("#POSCustomereditCompany").val() : '');
			postData+="&addr1="+($("#POSCustomereditAddress1").val() ? $("#POSCustomereditAddress1").val() : '');
			postData+="&addr2="+($("#POSCustomereditAddress2").val() ? $("#POSCustomereditAddress2").val() : '');
			postData+="&phone1="+($("#POSCustomereditPhone1").val() ? $("#POSCustomereditPhone1").val() : '');
			postData+="&phone2="+($("#POSCustomereditPhone2").val() ? $("#POSCustomereditPhone2").val() : '');
			postData+="&phone3="+($("#POSCustomereditPhone3").val() ? $("#POSCustomereditPhone3").val() : '');
			postData+="&email="+($("#POSCustomereditEmail").val() ? $("#POSCustomereditEmail").val() : '');
			postData+="&email2="+($("#POSCustomereditEmail2").val() ? $("#POSCustomereditEmail2").val() : '');
			postData+="&email3="+($("#POSCustomereditEmail3").val() ? $("#POSCustomereditEmail3").val() : '');
			postData+="&email4="+($("#POSCustomereditEmail4").val() ? $("#POSCustomereditEmail4").val() : '');
			postData+="&fax="+($("#POSCustomereditFax").val() ? $("#POSCustomereditFax").val() : '');
			postData+="&website="+($("#POSCustomereditWebsite").val() ? $("#POSCustomereditWebsite").val() : '');
			postData+="&custom1="+($("#POSCustomereditCustom1").val() ? $("#POSCustomereditCustom1").val() : '');
			postData+="&custom2="+($("#POSCustomereditCustom2").val() ? $("#POSCustomereditCustom2").val() : '');
			postData+="&custom3="+($("#POSCustomereditCustom3").val() ? $("#POSCustomereditCustom3").val() : '');
			postData+="&custom3="+($("#POSCustomereditCustom4").val() ? $("#POSCustomereditCustom4").val() : '');
			postData+="&custom3="+($("#POSCustomereditCustom5").val() ? $("#POSCustomereditCustom5").val() : '');
			postData+="&custom3="+($("#POSCustomereditCustom6").val() ? $("#POSCustomereditCustom6").val() : '');
			postData+="&custom3="+($("#POSCustomereditCustom7").val() ? $("#POSCustomereditCustom7").val() : '');
			postData+="&customnote="+($("#POSCustomereditNote").val() ? $("#POSCustomereditNote").val() : '');
			postData+="&zipcode="+($("#POSCustomereditZipcode").val() ? $("#POSCustomereditZipcode").val() : '');
			postData+="&city="+($("#POSCustomereditCity").val() ? $("#POSCustomereditCity").val() : '');
			postData+="&state="+($("#POSCustomereditState").val() ? $("#POSCustomereditState").val() : '');
			postData+="&county="+($("#POSCustomereditCounty").val() ? $("#POSCustomereditCounty").val() : '');
			postData+="&country="+($("#POSCustomereditCountry").val() ? $("#POSCustomereditCountry").val() : '');
			postData+="&AccountStatus="+($("#POSCustomereditAccountStatus").val() ? $("#POSCustomereditAccountStatus").val() : '');
			postData+="&CreditLimit="+($("#POSCustomereditCreditLimit").val() ? $("#POSCustomereditCreditLimit").val() : 0);
			postData+="&AccountNumber="+($("#POSCustomereditAccountNo").val() ? $("#POSCustomereditAccountNo").val() : '');
			postData+="&Points="+($("#POSCustomereditPoints").val() ? $("#POSCustomereditPoints").val() : null);
			postData+="&birthday="+($("#POSCustomereditBirthday").val() ? $("#POSCustomereditBirthday").val() : null);

		var strCountPhone1 = $("#POSCustomereditPhone1").val();
		strCountPhone1 = strCountPhone1.replace(/[- )(]/g,'');
	
		if( (strCountPhone1.length > 0 && strCountPhone1.length < 7) || strCountPhone1.length > 10 || (strCountPhone1.length > 7 && strCountPhone1.length < 10) ){
			var msg = "Invalid Phone number please try again.";
			NumpadAlertClose('invalid_email', msg)
			.then(function(){
				WindowPopupAlert('Alert message');
			})
			return false;
		}

		$(".editcustomer").each(function(){
			var required  = $(this).prop("required");
			if(required){
				if($(this).val() == ''){
					$(this).css({border: '1px solid #ff0000'});
					required_count++;
				}else{
					$(this).css({border: '1px solid #ccc'});
				}
			}
		});	

		if(required_count > 0){
			
		}else{
			if(document.getElementById('POSCustomereditEmail')){
				if($("#POSCustomereditEmail").val() != ''){
					if(check_email($("#POSCustomereditEmail").val())){
						posData.EditCustomerProfileSave(postData)
						.success(function(data){
							if(data.success == true){
								editCustomerSelected = data.selectedcustomer;

								$scope.editcustomer = {
									message: ''
								}
								$scope.selectedValue = 25;
								$scope.EditCustomerSaveDisabled = true;
								$scope.EditCustomerDefaultButtons = true;
								$scope.EditCustomerWhenCloseSaveChanges = false;
								$scope.EditCustomerWhenDelete = false;
								$scope.EditCustomerWhenClose = '';
								$('#editTabs').jqxTabs({ selectedItem: 0 });
								$('#tab1').unblock();
								$('#tab2').unblock();
								$('#edit-customer-form').jqxWindow('close');
								GetSelectedCustomer();
								$scope.editcustomer = {
									message: ''
								}
								//Customer_data_reload();
								Customer_created_reload($scope.customer.id);
							}else{
								var msg = "Do you want to update this customer?";
								MessageAlertYesNo('customer_duplicate_update_yes_no', data, msg)
								.then(function(){
									MessageWindowAlertYesNo('Message info');
								})

								return false;
							}
						})
					}else{
						var msg = "Please type a valid email address.";
						NumpadAlertClose('invalid_email', msg)
						.then(function(){
							WindowPopupAlert('Alert message');
						})
					}
				}else{
					posData.EditCustomerProfileSave(postData)
					.success(function(data){
						if(data.success == true){
							editCustomerSelected = data.selectedcustomer;

							$scope.editcustomer = {
								message: ''
							}
							$scope.selectedValue = 25;
							$scope.EditCustomerSaveDisabled = true;
							$scope.EditCustomerDefaultButtons = true;
							$scope.EditCustomerWhenCloseSaveChanges = false;
							$scope.EditCustomerWhenDelete = false;
							$scope.EditCustomerWhenClose = '';
							$('#editTabs').jqxTabs({ selectedItem: 0 });
							$('#tab1').unblock();
							$('#tab2').unblock();
							$('#edit-customer-form').jqxWindow('close');
							GetSelectedCustomer();
							$scope.editcustomer = {
								message: ''
							}
							//Customer_data_reload();
							Customer_created_reload($scope.customer.id);
						}else{
							var msg = "Do you want to update this customer?";
							MessageAlertYesNo('customer_duplicate_update_yes_no', data, msg)
							.then(function(){
								MessageWindowAlertYesNo('Message info');
							})
							
							return false;
						}
					})
				}
			}else{
				posData.EditCustomerProfileSave(postData)
				.success(function(data){
					if(data.success == true){
						editCustomerSelected = data.selectedcustomer;

						$scope.editcustomer = {
							message: ''
						}
						$scope.selectedValue = 25;
						$scope.EditCustomerSaveDisabled = true;
						$scope.EditCustomerDefaultButtons = true;
						$scope.EditCustomerWhenCloseSaveChanges = false;
						$scope.EditCustomerWhenDelete = false;
						$scope.EditCustomerWhenClose = '';
						$('#editTabs').jqxTabs({ selectedItem: 0 });
						$('#tab1').unblock();
						$('#tab2').unblock();
						$('#edit-customer-form').jqxWindow('close');
						GetSelectedCustomer();
						$scope.editcustomer = {
							message: ''
						}
						//Customer_data_reload();
						Customer_created_reload($scope.customer.id);
					}else{
						var msg = "Do you want to update this customer?";
						MessageAlertYesNo('customer_duplicate_update_yes_no', data, msg)
						.then(function(){
							MessageWindowAlertYesNo('Message info');
						})

						return false;
					}
				})
			}
		}
	})

	/*
	$scope.editCustomerSave = function(){
		
	}
	*/

	/*
	|----------------------------------------------------------------------------
	| Close Edit Customer form
	|----------------------------------------------------------------------------
	*/
	$scope.editExitCustomer = function(){
		if($scope.EditCustomerWhenClose){
			$scope.EditCustomerDefaultButtons = false;
			$scope.EditCustomerWhenCloseSaveChanges = true;
			$scope.EditCustomerWhenDelete = false;
		}else{
			//$('#editTabs').jqxTabs({ selectedItem: 0 });
			$("#edit-customer-form").jqxWindow("close");
			$("div").remove('#edit-customer-form-container'); 
		}
	}

	$scope.EnabledEditButton = function(){
		$scope.EditCustomerSaveDisabled = false;
		$scope.EditCustomerWhenClose = 1;
	}

	$("#CustomerListWindow").one('click', function(event){ 
		event.preventDefault();
		bindButton();
	})

	var bindButton = function() {
		$("#CustomerListWindow").unbind('click').one("click", function() {
			CallCustomerWindowPopup();
		});
	}
	
	bindButton();

	/*
	$("#CustomerListWindow").on('click', function(event){  
		event.preventDefault();
		CallCustomerWindowPopup();
	  });
	  */

	/*
	$scope.CustomerLink = function(){
		CallCustomerWindowPopup();
	}
	*/

	$scope.CustomerForm = function(){
		$("#CustomerForm").prop("disabled", true);
		CallCustomerWindowPopup();
		setTimeout(function(){
			$("#CustomerForm").prop("disabled", false);
		},1000);
	}

	$scope.editExitCustomerNoApplyChanges = function(){
		$scope.EditCustomerSaveDisabled = true;
		$scope.EditCustomerDefaultButtons = true;
		$scope.EditCustomerWhenCloseSaveChanges = false;
		$scope.EditCustomerWhenDelete = false;
		$scope.EditCustomerWhenClose = '';
		$('#editTabs').jqxTabs({ selectedItem: 0 });
		$('#tab1').unblock();
		$('#tab2').unblock();
		$("#edit-customer-form").jqxWindow("close");
	}

	$("#edit-customer-form").on("close", function(e){
		e.preventDefault();
		$("#edit-customer-form-container").html('');
	});

	/*
	|----------------------------------------------------------------------------|
	| **************** End Customer Add and Edit Function ********************** |
	|----------------------------------------------------------------------------|
	*/
	$("#gc_balance_option").on("close", function(event){
		$("#gc_balance_option_container").html('');
		DisableNumpadEasyButtons(false);
		$(".btnpayment").attr("disabled", false);
	})
	var GiftCardArray = [];  
	var populateGCBalanceOption = function(form_name){
		var def = $.Deferred();
			$("#gc_balance_option").append('<div id="gc_balance_option_container" style="background: #144766;"></div>');
			$("#gc_balance_option_container").html('');
			var postdata ="GiftCardPaymentUnique="+GiftCardArray[0];
			posData.GCOption(postdata)
			.success(function(data){
				GCBalOptionID = data.Default;
				$("#gc_balance_option_container").append(data.html);
			}).then(function(){
				$("#gc_balance_option_container").append(
					'<form id="'+form_name+'">'+	
						'<input type="text" id="gc_balance_option_field" class="hdfield"  style="display:none;"/>'+
						'<div style="float:left; width: 450px;" id="gc_balance_option_fn" align="right"></div>'+
					'</form>'
				);
				def.resolve();
			})	
		return def.promise();
	}

	/*Gift Card Window popup*/
	var WindowPopupGiftCardBalOption = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#gc_balance_option").jqxWindow({
				height: 320,
				width: 480,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#gc_balance_option').jqxWindow('setTitle', header_text);
			$('#gc_balance_option').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();	
	}
	
	var GiftCardBalOption = function(form){
		var def = $.Deferred();
		populateGCBalanceOption(form)
		.then(function(){
			$('#gc_balance_option_fn').hdgiftcard({
				layout: "giftcard_function2",
				input: $("#gc_balance_option_field")
			});
			def.resolve();
		});
		return def.promise();
	}

	$(document).on('click', '.radiogcoption', function(){
		var id = $('input[type=radio][name=group1]:checked').attr('id');
		GCBalOptionID = id;
	});
	
	$(document).on("submit", "#gift_card_payment", function(e){
		e.preventDefault();
		var optionid = $('input[type=radio][name=group1]:checked').attr('id');
		
		DisableNumpadEasyButtons(true);
		var Unique = GiftCardArray[0];
		var amountdue = GiftCardArray[1];
		var typed_payment = GiftCardArray[2];
		var signature = GiftCardArray[10];
		var SignatureAmount = GiftCardArray[11];
		var AcctNoUse = '';
		var Process = false;
		if(optionid == 'Swipe'){
			$("#gc_balance_option").jqxWindow('close');
			NumpadGiftCardPayment("gc_payment_manual")
			.then(function(){
				WindowPopupGiftCardPayment("Gift Card Payment")
				.then(function(){
					$("#card_field").focus();
				})
			})
			Process = false;
		}else{
			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Payment Processing please wait...' }); 
			AcctNoUse = optionid;
			Process = true;
		}

		if(Process){
			$("#gc_balance_option").jqxWindow('close');
			$(".btnpayment").attr({"disabled": false});
			var postdata  = "PaymentUnique="+GiftCardArray[0];
				postdata += "&AmountDue="+GiftCardArray[1];
				postdata += "&AmountEntered="+GiftCardArray[2];
				postdata += "&CustomerUnique="+GlobalCustomer;
				postdata += "&AcctNo="+AcctNoUse;

			posData.GiftCardPaymentSale(postdata)
			.success(function(data){
				setTimeout($.unblockUI, 100);
				if(data.success){
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					if(data.CmdStatus == 'Approved'){
						var msg = '';
						msg+= data.Status+'<br/>';
						msg+= data.msg + '<br/>';
						msg+= data.Authorize +'<br/>';
						msg+= data.Purchase + '</br>';
						msg+= data.Balance;
		
						$scope.payment = 0;
						
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
						}

						load_data2(data);
						
						if($("#TableOrder").val() == 1){
							if($("#PoleDisplay").val() == 2){
								if(ConnectionPoleDisplay){
									tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
								}
							}
						}
					
						var PoleDisplayShow = $("#PoleDisplay").val();
						if(PoleDisplayShow == '1'){
							PoleDisplayPaymentMethod(ReceiptPaymentUnique);	
						} 
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}else if(data.CmdStatus == 'Error'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}

				}else{
					var msg= data.msg;
				}	

				if(amountdue < 0){
					typed_payment = typed_payment * -1;
					amountdue = amountdue * -1;
				}
				if(data.status == 12){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									ordertype2();
								}
							},1000);
						}else{
							ordertype2();
						}
					}else{
						if(amountdue >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){ //e.g 11.00 >= 10.00 = true then print the receipt.
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									ordertype2();
								}
							},1000);
						}else{
							ordertype2();
						}
					}

					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						WindowPopupPaymentAlert(GiftCardArray[3] + ' Payment');
					});

				}else if(data.status == 13){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){
							setTimeout(function(){
								PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
								.done(function(){})
							},1000);
						}
					}else{
						setTimeout(function(){
							PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){})
						},1000);
					}
				}else{
					var msg = data.Status+'<br/>';
						msg+= data.msg;
					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						WindowPopupPaymentAlert(GiftCardArray[3] + ' Payment');
					});
				}	
			})
		}
	})

	$(document).on("submit", "#gc_payment_manual", function(e){
		e.preventDefault();
		var Unique = GiftCardArray[0];
		var amountdue = GiftCardArray[1];
		var typed_payment = GiftCardArray[2];
		var signature = GiftCardArray[10];
		var SignatureAmount = GiftCardArray[11];
		//$('body').block({message: 'Processing please wait...' + ' '});
		$.blockUI({ css: { 
            border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: 'Processing please wait...' });

		$(".btnpayment").attr({"disabled": false});
		var postdata  = "PaymentUnique="+GiftCardArray[0];
			postdata += "&AmountDue="+GiftCardArray[1];
			postdata += "&AmountEntered="+GiftCardArray[2];
			postdata += "&CustomerUnique="+GlobalCustomer;
			postdata += "&AcctNo="+ $("#card_field").val();
		if(amountdue > 0){
			posData.GiftCardPaymentSale(postdata)
			.success(function(data){
				//$('body').unblock();
				setTimeout($.unblockUI, 100); 	
				if(data.success){
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					if(data.CmdStatus == 'Approved'){
						DisableNumpadEasyButtons(false);
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
							msg+= data.Authorize +'<br/>';
							msg+= data.Purchase + '</br>';
							msg+= data.Balance;
							
							$scope.payment = 0;
							
							if(POSPaymentNumpad == 1){
								$("#amount_payment").maskMoney('mask', '0.00');
							}

							load_data2(data);
							DisplayAllPayments();
							var PoleDisplayShow = $("#PoleDisplay").val();
							if(PoleDisplayShow == '1'){
								PoleDisplayPaymentMethod(ReceiptPaymentUnique);	
							} 
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
					}else if (data.CmdStatus == 'Error'){
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
					}
				}else{
					var msg = data.Status+'<br/>';
						msg+= data.msg + '<br/>';
				}	

				NumpadPaymentAlertOk('payment_process', msg)
				.then(function(){
					WindowPopupPaymentAlert(GiftCardArray[3] + ' Payment');
				});

				if(amountdue < 0){
					typed_payment = typed_payment * -1;
					amountdue = amountdue * -1;
				}
				if(data.status == 12){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									/*
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){
										CheckBalanceAfterPayment()
										.then(function(){
											KitchenPrintReceipt("IntegratedZero");
										})
									})
									*/
									ordertype2();
								}
							},1000);
						}else{
							//Still print customer receipt based on the setting
							/*
							PrintCustomerReceipt(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								CheckBalanceAfterPayment()
								.then(function(){
									KitchenPrintReceipt("IntegratedZero");
								})
							})
							*/
							ordertype2();
						}
					}else{
						if(amountdue >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){ //e.g 11.00 >= 10.00 = true then print the receipt.
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									/*
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){
										CheckBalanceAfterPayment()
										.then(function(){
											KitchenPrintReceipt("IntegratedZero");
										})
									})
									*/
									ordertype2();
								}
							},1000);
						}else{
							//Still print customer receipt based on the setting
							/*
							PrintCustomerReceipt(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								CheckBalanceAfterPayment()
								.then(function(){
									KitchenPrintReceipt("IntegratedZero");
								})
							})
							*/
							ordertype2();
						}
					}
				}else if(data.status == 13){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){
							setTimeout(function(){
								PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
								.done(function(){})
							},1000);
						}
					}else{
						setTimeout(function(){
							PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){})
						},1000);
					}
					
				}else{
						
				}	
			})
		}else if(amountdue < 0){
			posData.GiftCardPaymentRefund(postdata)
			.success(function(data){
				//$('body').unblock();
				setTimeout($.unblockUI, 100); 
				if(data.success){
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					if(data.CmdStatus == 'Approved'){
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
							msg+= data.Authorize +'<br/>';
							msg+= data.Purchase + '</br>';
							msg+= data.Balance;
							
							$scope.payment = 0;
							
							if(POSPaymentNumpad == 1){
								$("#amount_payment").maskMoney('mask', '0.00');
							}
							//$("#amount_payment").val(0);
							POSTotal();
							LoadPayments();
							LoadChange();
							CheckReceiptStatus();
							DisplayAllPayments();
							LoadOrderedItemList();
							LoadTax();
							LoadHeaderInfo2();
							posData.CheckBalance()
							.success(function(newdata){ 
								if(newdata.balance == true){
									$scope.BtnApplyPaymentWhen = false;
									$scope.BtnPrintWhen = true;
								}else if(newdata.balance == false){
									$scope.BtnApplyPaymentWhen = true;
									$scope.BtnPrintWhen = false;
								}  
							});
							LoadTotals()
							.then(function(){
								var PoleDisplayShow = $("#PoleDisplay").val();
								if(PoleDisplayShow == '1'){
									PoleDisplayPaymentMethod(ReceiptPaymentUnique);	
								} 
							})
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
					}else if (data.CmdStatus == 'Error'){
						var msg = data.Status+'<br/>';
							msg+= data.msg + '<br/>';
					}
				}else{
					var msg = data.Status+'<br/>';
						msg+= data.msg + '<br/>';
				}	

				NumpadPaymentAlertOk('payment_process', msg)
				.then(function(){
					WindowPopupPaymentAlert(GiftCardArray[3] + ' Payment');
				});

				if(amountdue < 0){
					typed_payment = typed_payment * -1;
					amountdue = amountdue * -1;
				}
				if(data.status == 12){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){
										CheckBalanceAfterPayment()
										.then(function(){
											KitchenPrintReceipt("IntegratedZero");
										})
									})
								}
							},1000);
						}else{
							//Still print customer receipt based on the setting
							PrintCustomerReceipt(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								CheckBalanceAfterPayment()
								.then(function(){
									KitchenPrintReceipt("IntegratedZero");
								})
							})
						}
					}else{
						if(amountdue >= SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
							setTimeout(function(){ //e.g 11.00 >= 10.00 = true then print the receipt.
								if(signature){
									NumpadSignature('signature_ok')
									.then(function(){
										WindowPopupSignature('Signature')
										.then(function(){
											$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
											$("#signature_unique").val(Unique);
											$("#signature_status").val(data.status);
											$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
											$("#signature_amount").val(SignatureAmount);
											$("#signature_typePayment").val(typed_payment);
											$("#signature_amountdue").val( $("#amount_payment").val() );
										})
									})
								}else{
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){
										CheckBalanceAfterPayment()
										.then(function(){
											KitchenPrintReceipt("IntegratedZero");
										})
									})
								}
							},1000);
						}else{
							//Still print customer receipt based on the setting
							PrintCustomerReceipt(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								CheckBalanceAfterPayment()
								.then(function(){
									KitchenPrintReceipt("IntegratedZero");
								})
							})
						}
					}
				}else if(data.status == 13){
					if(typed_payment > 0){
						if(typed_payment >= SignatureAmount){
							setTimeout(function(){
								PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
								.done(function(){})
							},1000);
						}
					}else{
						setTimeout(function(){
							PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){})
						},1000);
					}
					
				}else{
					
				}	
			})
		}	
		$("#dialog-numpad-gift-card-payment").jqxWindow('close');
	})

  	if( $("#POSVirtualKeyboard").val() == 1 ){
		//-->Check No Input
		$(document).on("click", "#CheckNoInput", function(e){
			e.preventDefault();
			NumpadCustom('enter_checkno', 'Enter Check No')
			.then(function(){
				WindowPopupNumpadCustom('Enter Check Information')
				.then(function(){
					$('#number_field').attr("placeholder", "Numbers Only");
					var NumberInput = $('#number_field').numeric();
					var strLength = NumberInput.val($("#CheckNoInput").val()).length * 25;
					NumberInput[0].setSelectionRange(strLength, strLength);
					NumberInput.focus();
				})
			})
		})
		$(document).on("submit", "#enter_checkno", function(e){
			e.preventDefault();
			$("#CheckNoInput").val($('#number_field').val());
			$('#dialog-numpad-custom').jqxWindow('close');
		})

		//-->Check Name Input
		$(document).on("click", "#CheckNameInput", function(e){
			e.preventDefault();
			NumpadKeyboard('enter_checkname', 'Enter Check Name')
			.then(function(){
				WindowPopupKeyboard('Enter Check Information')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#CheckNameInput").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		})
		$(document).on("submit", "#enter_checkname", function(e){
			e.preventDefault();
			$("#CheckNameInput").val($('#search_field').val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
		})

		//-->Bank Name Input
		$(document).on("click", "#BankNameInput", function(e){
			e.preventDefault();
			NumpadKeyboard('enter_bankname', 'Enter Bank Name')
			.then(function(){
				WindowPopupKeyboard('Enter Check Information')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#BankNameInput").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		})
		$(document).on("submit", "#enter_bankname", function(e){
			e.preventDefault();
			$("#BankNameInput").val($('#search_field').val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
		})
		//-->Routing No Input
		$(document).on("click", "#RoutingNoInput", function(e){
			e.preventDefault();
			NumpadCustom('enter_routing', 'Enter Routing No')
			.then(function(){
				WindowPopupNumpadCustom('Enter Check Information')
				.then(function(){
					$('#number_field').attr("placeholder", "9 digits only");
					var NumberInput = $('#number_field').numeric();
					var strLength = NumberInput.val($("#RoutingNoInput").val()).length * 25;
					NumberInput[0].setSelectionRange(strLength, strLength);
					NumberInput.focus();
				})
			})
		})
		$(document).on("submit", "#enter_routing", function(e){
			e.preventDefault();
			var postdata ="RoutRoutingNo="+$("#RoutingNoInput").val();
			posData.CheckAccountRoutingValidation(postdata)
			.success(function(data){
				if(data.validate == false){
					$("#danger-alert-message").text(data.msg);
					$("#danger-alert-message").alert();
					$("#danger-alert-message").fadeTo(2000, 500).slideUp(500, function(){
						$("#danger-alert-message").slideUp(500);
					});
				}
				$("#RoutingNoInput").val($('#number_field').val());
				$('#dialog-numpad-custom').jqxWindow('close');
			})
		})
		//-->Account No Input
		/*
		$(document).on("click", "#AccountNoInput", function(e){
			e.preventDefault();
			var TextField = $(this).attr('placeholder');
			NumpadCustom('enter_accountno', 'Enter '+TextField)
			.then(function(){
				WindowPopupNumpadCustom('Enter Check Information')
				.then(function(){
					$('#number_field').attr("placeholder", "Numbers Only");
					var NumberInput = $('#number_field').numeric();
					var strLength = NumberInput.val($("#AccountNoInput").val()).length * 25;
					NumberInput[0].setSelectionRange(strLength, strLength);
					NumberInput.focus();
				})
			})
		})

		/*
		$(document).on("submit", "#enter_accountno", function(e){
			e.preventDefault();
			$("#AccountNoInput").val( $("#search_field").val() );
			$('#dialog-numpad-custom').jqxWindow('close');
		})
		*/
		
		//-->Comment Input
		$(document).on("click", "#CommentInput", function(e){
			e.preventDefault();
			var TextField = $(this).attr('placeholder');
			NumpadKeyboard('enter_comment', 'Enter '+TextField)
			.then(function(){
				WindowPopupKeyboard('Enter Check Information')
				.then(function(){
					var searchInput = $('#search_field');
					var strLength = searchInput.val($("#CommentInput").val()).length * 25;
					searchInput[0].setSelectionRange(strLength, strLength);
					searchInput.focus();
				})
			})
		})
		$(document).on("submit", "#enter_comment", function(e){
			e.preventDefault();
			$("#CommentInput").val($('#search_field').val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
		})
	}//VirtualKeyboard

	$(document).on("click", "#CheckPaymentCancel", function(e){
		e.preventDefault();
		$('#check_payment_popup').jqxWindow('close');
	})

	var ConfirmPaymentCheck;
	var ConfirPayment
	var ProceedPayment = function(){
		$("#CheckPaymentProceed").prop("disabled", true);
		if(ConfirmPaymentCheck == 1 && $("#amount_payment").val() == 0){
			var PaymentUnique = $("#check-account-paymentunique").val();
			var postdata ="CheckNo=" +$("#CheckNoInput").val();
				postdata+="&CheckName=" +$("#CheckNameInput").val();
				postdata+="&BankName=" +$("#BankNameInput").val();
				postdata+="&RoutingNo=" +$("#RoutingNoInput").val();
				postdata+="&AccountNo=" +$("#AccountNoInput").val();
				postdata+="&Comment=" +$("#CommentInput").val();
				postdata+="&PaymentUnique=" +$("#check-account-paymentunique").val();
				postdata+="&AmountDue=" +$("#check-account-amountdue").val();
				postdata+="&AmountEntered=" +$("#check-account-amountentered").val();
				postdata+="&TypeName=" +$("#check-account-typename").val();

			var postdataEasyPayment = "CheckNo=" +$("#CheckNoInput").val();
				postdataEasyPayment+= "&CheckName=" +$("#CheckNameInput").val();
				postdataEasyPayment+= "&BankName=" +$("#BankNameInput").val();
				postdataEasyPayment+= "&RoutingNo=" +$("#RoutingNoInput").val();
				postdataEasyPayment+= "&AccountNo=" +$("#AccountNoInput").val();
				postdataEasyPayment+= "&Comment=" +$("#CommentInput").val();
				postdataEasyPayment+= "&PaymentUnique=" +$("#check-account-paymentunique").val();
				postdataEasyPayment+= "&AmountDue=" +$("#check-account-amountdue").val();
				postdataEasyPayment+= "&TypeName=" +$("#check-account-typename").val();
			ConfirmPaymentUnique 	= PaymentUnique;
			ConfirmPaymentPostData 	= postdataEasyPayment;
			NumpadConfirmPayment('CheckPayment')
			.then(function(){
				WindowPopupConfirmPayment('Check')
				.then(function(){
					var AmountDueTotal = $("#amountdue_total").val();
					if(AmountDueTotal < 0){
						AmountDueTotal = AmountDueTotal *-1;
					}
					$("#confirm_payment_amount").val(AmountDueTotal);
					$("#confirm_payment_amount").jqxNumberInput('focus');
					var input = $('#confirm_payment_amount input')[0];
					if('selectionStart' in input) {
						input.setSelectionRange(0, 0);
					}else{
						var range = input.createTextRange();
						range.collapse(true);
						range.moveEnd('character', 0);
						range.moveStart('character', 0);
						range.select();
					}
					setTimeout(function(){
						$("#confirm_payment_amount input").select();
					},100)
				})
				$('#check_payment_popup').jqxWindow('close');
			})
		}else{
			var PaymentUnique = $("#check-account-paymentunique").val();
			var postdata ="CheckNo=" +$("#CheckNoInput").val();
				postdata+="&CheckName=" +$("#CheckNameInput").val();
				postdata+="&BankName=" +$("#BankNameInput").val();
				postdata+="&RoutingNo=" +$("#RoutingNoInput").val();
				postdata+="&AccountNo=" +$("#AccountNoInput").val();
				postdata+="&Comment=" +$("#CommentInput").val();
				postdata+="&PaymentUnique=" +$("#check-account-paymentunique").val();
				postdata+="&AmountDue=" +$("#check-account-amountdue").val();
				postdata+="&AmountEntered=" +$("#check-account-amountentered").val();
				postdata+="&TypeName=" +$("#check-account-typename").val();
				
			posData.CheckAccountProceed(postdata)
			.success(function(data){
				if(data.validate){
					var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
					var ReceiptPaymentUnique = data.ReceiptPaymentId;
					if(data.success == true) {
						
						$scope.payment = 0;
						
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
						}
						load_data2(data);
						DisplayAllPayments();
						posData.CheckBalance()
						.success(function (newdata) {
							if(newdata.balance == true){
								$scope.BtnApplyPaymentWhen = false;
								$scope.BtnPrintWhen = true;
							}else if(newdata.balance == false){
								$scope.BtnApplyPaymentWhen = true;
								$scope.BtnPrintWhen = false;
								if($("#TableOrder").val() == 1){
									if($("#PoleDisplay").val() == 2){
										if(ConnectionPoleDisplay){
											tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
										}
									}
								}

								PrinterCheck(PaymentUnique, "", "")
								.then(function(){
									KitchenPrintReceipt('IntegratedZero')
									.then(function(){
										
									})
								})

								ordertype2();
							}
							
							
							if($("#TableOrder").val() == 1){
								if($("#PoleDisplay").val() == 2){
									if(ConnectionPoleDisplay){
										tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
									}
								}
							}
						})
					} else {
						var msg = data.msg;
						NumpadAlertOk('cash_payment', msg)
						.then(function(){
							WindowPopupAlert('Payment Notification')
						});
					}
					$('#check_payment_popup').jqxWindow('close');
				}else{
					$("#danger-alert-message").text(data.msg);
					$("#danger-alert-message").alert();
					$("#danger-alert-message").fadeTo(2000, 500).slideUp(500, function(){
						$("#danger-alert-message").slideUp(500);
					});   
				}
				$("#CheckPaymentProceed").prop("disabled", false);
			})
		}
	}

	$(document).on("keypress", "#CheckNoInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

	$(document).on("keypress", "#CheckNameInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

	$(document).on("keypress", "#BankNameInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

	$(document).on("keypress", "#BankNameInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

	$(document).on("keypress", "#RoutingNoInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

	$(document).on("keypress", "#AccountNoInput", function(event){
		if ( event.which == 13 ) {
			event.preventDefault();
			ProceedPayment();
		}
	})

  	$(document).on("submit", "#ProceedPayment", function(e){
		e.preventDefault();
		ProceedPayment();
	})

  	var SignatureData = null;
  	$(document).on('click', '.signature_accept', function(e){
		e.preventDefault();
		var Unique 						= $("#signature_unique").val();
		var SignatureReceiptPaymentUnique=$("#signature_receipt_payment_unique").val();
		var Status 						= $("#signature_status").val();
		var SignatureAmount				= $("#signature_amount").val();
		var TypedAmount					= $("#signature_typePayment").val();
		var AmountDue					= $("#signature_amountdue").val();

		if(PrintReceiptBySignatureAmount == true){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
			var postdata ="InvoiceNo="+SignatureReceiptPaymentUnique;
				postdata+="&PaymentUnique="+Unique;
			posData.PrintInitializeCheckIntegratedTwo(postdata)
			.success(function(data){
				load_data2(data);
			})
			DisableNumpadEasyButtons(false);
			setTimeout($.unblockUI, 100); 
		}
		var elemPopup = $("#dialog-signature").closest('.jqx-window').attr('id');
		var elemRemove = $("#dialog-signature").closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
		$scope.Signature_type = '';
		$scope.SignatureReceiptPaymentUnique = '';
	})
  
	$(document).on('click', '.signature_clear', function(e){
		e.preventDefault();
		$("#signature_message_view").show();
		$(".signature_clear").hide();
		$(".signature_accept").hide();
		$("#signature").removeAttr("src");
		console.log("clear signature",$("#signature_type").val());
		var SignatureType = ($("#signature_type").val() == null || $("#signature_type").val() == '' ? 1 : $("#signature_type").val());
		setTimeout(function(){
			$("#signature").attr({"src": base_url+"assets/img/hourglass.gif?"+Math.random(), "width":"48", "height":"48"});
		},100);
		var SignatureReceiptHeaderUnique = $("#signature_receipt_header_unique").val();
		var Unique 						= $("#signature_unique").val();
		var SignatureReceiptPaymentUnique = $("#signature_receipt_payment_unique").val();
		var Status 						= $("#signature_status").val();
		var postdata 					= "ReceiptPaymentUnique="+SignatureReceiptPaymentUnique; 

		if(SignatureType == 1){
			posData.ClearSignature(postdata)
			.success(function(data){
				$("#signature_message_view").hide();
				$(".signature_clear").show();
				$(".signature_accept").show();
				$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
			})
		}else{
			conn.send(JSON.stringify(["Signature", SignatureReceiptPaymentUnique, $scope.station_un, SignatureReceiptHeaderUnique]));
			$.ajax({
				url: base_url + 'pos/pointofsale/check-signature',
				type: 'POST',
				dataType: 'json',
				data: {"imageUnique" : $scope.SignatureReceiptPaymentUnique},
				success: function(data){
					if(data.success){
						if( $scope.Signature_type == 2){
							$("#signature_msg_container").html("\n\n"+'<div style="width: 100%; text-align: center;"><button type="button" id="sign_cancel" class="btn btn-warning btn-lg">Cancel</button></div>');
						}
					}
				}
			})
		}
	})
  
	$(document).on('submit', '#cash_drawer', function(e){
		e.preventDefault();
		$('#dialog-numpad-alert').jqxWindow('close');
	})
  
	$(document).on('submit', '#printer_check', function(e){
		e.preventDefault();
		$('#dialog-numpad-alert').jqxWindow('close');
		CheckBalanceAfterPayment()
		.then(function(){
			KitchenPrintReceipt('IntegratedZero');	 
		})
	})
	
	$(document).on('submit', '#no_check', function(e){
		e.preventDefault();
		$('#dialog-numpad-alert').jqxWindow('close');
	})
  
	var TransPaymentSave = function(Unique, TypeName, Integrated){
		var TransPaymentDef = new $.Deferred();
		var postData = "PaymentUnique=" + Unique;
		postData += "&AmountDue=" + $scope.amountdue.Total;
		postData += "&AmountEntered=" + $("#amount_payment").val();
		postData += "&TypeName=" + TypeName;
		posData.TransPayment(postData)
		.success(function (data) {
			if(data.success == true) {

				$scope.payment = 0;

				if(POSPaymentNumpad == 1){
					$("#amount_payment").maskMoney('mask', '0.00');
				}
				//$("#amount_payment").val(0);
				POSTotal();
				LoadPayments();
				LoadChange();
				CheckReceiptStatus();
				DisplayAllPayments();
		
				posData.CheckBalance()
				.success(function (data) {
				if (data.balance == true) {
					$scope.BtnApplyPaymentWhen = false;
					$scope.BtnPrintWhen = true;
					CashDrawerCheck();
				} else if (data.balance == false) {
					$scope.BtnApplyPaymentWhen = true;
					$scope.BtnPrintWhen = false;
					//$('body').block({message: 'Printing receipt please wait....'});
					$.blockUI({ css: { 
						border: '2px solid #fff',
						padding: '15px', 
						backgroundColor: '#210e66', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: 1, 
						color: '#fff',
						fontSize: '20px' 
					}, message: 'Printing receipt please wait....' });
					PrinterCheck(Unique, "", "");
				}
				})
			} else {
				var msg = data.msg;
				NumpadAlertOk('payment_save', msg)
				.then(function(){
					WindowPopupAlert('Payment');
				})
			}
			TransPaymentDef.resolve(); 
		})
		return TransPaymentDef.promise();
	}
  
	$scope.CreditCardProcessCancel = function(){
		$scope.creditcardprocess = {
		message: '' 
		}  
		CreditCardProcessdialog.close();	 
	}

	//Button not active since 02/15/2015 by HD.
	$scope.TransPayment = function(Unique, TypeName, Integrated){
		if(Integrated == 1){
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $scope.amountdue.Total;
			var amountdue = $scope.amountdue.Total;
			var currency = $filter('currency');
			//$scope.price = currency(1234.4239, '�', 0, true);
		if(amountduescreen < 0){
			typed_payment = typed_payment * -1;
		}
		if(typed_payment != 0){
			amountdue = typed_payment;
		}
		$scope.ccpayment  = {
			amount:  currency(amountdue, '', 2, true)
		};
		$scope.paymenttype = {
			id: Unique,
			name: TypeName
		};
		$scope.focusInput = true;
		dialogpaymentcreditcard.setTitle("Authorize");
		dialogpaymentcreditcard.open();
		}else {
		var postData = "PaymentUnique=" + Unique;
		postData += "&AmountDue=" + $scope.amountdue.Total;
		postData += "&AmountEntered=" + $("#amount_payment").val();
		postData += "&TypeName=" + TypeName;
		posData.TransPayment(postData)
			.success(function (data) {
			if (data.success == true) {
				$scope.payment = $("#amount_payment").val();
				//$("#amount_payment").val(0);
				POSTotal();
				LoadPayments();
				LoadChange();
				CheckReceiptStatus();
				DisplayAllPayments();

				posData.CheckBalance()
					.success(function (data) {
					if (data.balance == true) {
						$scope.BtnApplyPaymentWhen = false;
						$scope.BtnPrintWhen = true;
						CashDrawerCheck();
					} else if (data.balance == false) {
						$scope.BtnApplyPaymentWhen = true;
						$scope.BtnPrintWhen = false;
						$.blockUI({ css: { 
							border: '2px solid #fff',
							padding: '15px', 
							backgroundColor: '#210e66', 
							'-webkit-border-radius': '10px', 
							'-moz-border-radius': '10px', 
							opacity: 1, 
							color: '#fff',
							fontSize: '20px' 
						}, message: 'Printing receipt please wait...' });
						PrinterCheck(Unique, "", "");
					}
					})
			} else {
				var msg = data.msg;
				NumpadAlertOk(form_name, msg)
				.then(function(){
					WindowPopupAlert('Payment');
				})
			}
			})
		}
	};

	$scope.Payments = function(){
		posData.DisplayAllPayments()
		.success(function(data){
			// $scope.payment_list_grid = {
			// 	source:  {
			// 		localdata: data,
			// 	}
			// };
			populateDialogPayments()
			.then(function(){
				PaymentDialog()
				.then(function(){
					gridPaymentsList(data)
					.then(function(){
						
					})
				})
			})
			
			// dialogpayments.setTitle("Payments");
			// dialogpayments.open();

		})
	};

	$scope.PaymentsClose = function(){
		$scope.paymentid=0;
		$("#payment_list_grid").jqxDataTable('clear');
		// dialogpayments.close();
		$("#dialogPayments").jqxWindow('close');
	};

	/*
	posData.DisplayAllPayments()
	.success(function(data){
		$scope.allpayments = data;
	});

	*/
	$scope.BatchNo = '';
	$(document).on('rowSelect', '#payment_list_grid', function(event){
		// event args.
		var args = event.args;
		// row data.
		var row = args.row;
		// row index.
		var index = args.index;
		// row's data bound index.
		var boundIndex = args.boundIndex;
		// row key.
		var key = args.key;

		console.log("voided this",row.status, row.voided);

		var ReceiptPaymentUnique = row.unique;
		var status = row.status;
		var trantype = row.trantype;
		var integrated = row.integrated;
		$scope.BatchNo = row.BatchNo;
		$scope.adjust_tip_button = 1;
		var voided = row.voided;

		if ($scope.lastSelected) {
			$scope.lastSelected.selected = '';
		}
		this.selected = 'selected';
		$scope.lastSelected = this;
		$scope.paymentid = ReceiptPaymentUnique;
		$scope.trantype = trantype;
		$scope.list_integrated = integrated;
		$scope.payment_list_status = status;
		if(status == "V" || status == "D" || voided == 'yes'){
			$(".btn_remove_payment").attr('disabled', true);
			$(".btn_add_tip").attr('disabled', true);

			// $scope.BtnDisableWhen = true;
			// $scope.BtnPrintDisableWhen = true;
			console.log("disable = true");
		}else{
			// $scope.BtnPrintDisableWhen = false;
			// $scope.BtnDisableWhen = false;
			$(".btn_remove_payment").attr('disabled', false);
			$(".btn_add_tip").attr('disabled', false);
			
			console.log("disable = false");
		}
	})

  	//-->Set Select Item
 	// $scope.paymentSelected = function(ReceiptPaymentUnique, status, trantype, integrated) {
	// 	if ($scope.lastSelected) {
	// 		$scope.lastSelected.selected = '';
	// 	}
	// 	this.selected = 'selected';
	// 	$scope.lastSelected = this;
	// 	$scope.paymentid = ReceiptPaymentUnique;
	// 	$scope.trantype = trantype;
	// 	$scope.list_integrated = integrated;
	// 	if(status == "V" || status == "D"){
	// 		$scope.BtnDisableWhen = true;
	// 		$scope.BtnPrintDisableWhen = true;
	// 	}else{
	// 		$scope.BtnPrintDisableWhen = false;
	// 		$scope.BtnDisableWhen = false;
	// 	}
  	// };
  
  	$scope.paymentid=0;
  
  	$scope.RemovePayment_Original = function(){
		var rowindex = $("#payment_list_grid").jqxDataTable('getSelection');
		var batchno = rowindex[0]["BatchNo"];
		var PaymentUnique 	= $scope.paymentid; //Receipt Payment table Unique 
		var trantype 		= $scope.trantype;
		var integrated 		= $scope.list_integrated;
		var postData="receiptpaymentunique="+PaymentUnique;
		if($scope.paymentid != 0){
			if(batchno > 0){
				var msg = 'Card has been batched cannot remove';
				NumpadAlertClose ('remove_payment_batched', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				});	
				return false;
			}

			if(trantype == 'EBT'){
				var msg = trantype + " cannot be reversed.";
				NumpadAlertOk('remove_payment_alert', msg)
				.then(function(){
					WindowPopupAlert ('Remove Payment')
				})
			}else if(trantype == 'PrePaid' && integrated == 7){
				var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
				NumpadAlertYesNoPayment('remove_payment_gift_card', msg, PaymentUnique)
				.then(function(){
					WindowPopupAlertYesNo('Remove Payment')
					.then(function(){
						$("#custom_value").val(PaymentUnique);
						$(".alert_yes").focus();
					})
				})
			}else{
				var postdata="ReceiptPaymentUnique="+PaymentUnique;
				posData.CheckStatusPayment(postdata)
				.success(function(data){
					if(data.success == true){
						if(data.removable == true){
							$('#display-payments').block({message: 'Remove payment processing...'});
							if(data.Integrated == 0 || data.Integrated == 6){ //Cash  and Check Payment
								postData+="&Integrated="+data.Integrated;
								posData.VoidPayment(postData)
								.success(function(data){
								$('#display-payments').unblock();	
								if(data.success == true){
									PoleDisplayTotal(); 
									load_data2(data); 
									DisplayAllPayments();
									CheckBalance();
								}
								})
							}else if (data.Integrated == 3){ //Only Gift Card
								var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
								NumpadAlertYesNoPayment('remove_gift_card_payment_internal', msg, PaymentUnique)
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}else if (data.Integrated == 8){
								var msg = '<span style="text-align: center;">Are you sure?</span><br/></br></br>';
								NumpadAlertYesNoPayment('remove_store_credit_payment', msg, PaymentUnique)
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}else{
								var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
								NumpadAlertYesNoPayment('remove_payment', msg, '')
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}
						}else{
							var msg = "View only mode, please edit receipt to remove payment.";
							NumpadAlertOk('remove_payment_view_mode', msg)
							.then(function(){
								WindowPopupAlert('Remove Payment');	
							}) 
						}
					}else{
						var msg = "Sorry, cannot remove selected Payment.";
						NumpadAlertOk('remove_payment_cannot_remove', msg)
						.then(function(){
							WindowPopupAlert ('Remove Payment')	
						})
					}
				})
			}
		}else{
			var msg = "Please select Payment first.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
				WindowPopupAlert ('Remove Payment')	
			})
		}
  	};


  	$(document).on('submit', '#remove_gift_card_payment_internal', function(e){
	 e.preventDefault();
	 	var ReceiptPaymentUnique = $("#custom_value").val();
 	 	var postdata = "receiptpaymentunique="+ReceiptPaymentUnique;
	 		postdata+="&Integrated=3";
		posData.VoidPayment(postdata)
		.success(function(data){
			$('#display-payments').unblock();	
			if(data.success == true){
				PoleDisplayTotal();  
				load_data2(data);
				//POSTotal();
				//LoadPayments();
				//LoadChange();
				DisplayAllPayments();
				CheckBalance();
			}
		}).then(function(){
			var postdata = "ReceiptPaymentUnique="+ReceiptPaymentUnique;
			posData.VoidGiftCardPayment(postdata)
			.success(function(data){
				$("#dialog-numpad-alert").jqxWindow('close');
			})
		}) 
  	})

	$(document).on('submit', '#remove_store_credit_payment', function(e){
		e.preventDefault();
		var ReceiptPaymentUnique = $("#custom_value").val();
 	 	var postdata = "receiptpaymentunique="+ReceiptPaymentUnique;
	 		postdata+="&Integrated=8";
		posData.VoidPayment(postdata)
		.success(function(data){
			$('#display-payments').unblock();	
			if(data.success == true){
				PoleDisplayTotal();  
				load_data2(data);
				DisplayAllPayments();
				CheckBalance();
			}
		}).then(function(){
			var postdata = "ReceiptPaymentUnique="+ReceiptPaymentUnique;
			posData.VoidGiftCardPayment(postdata)
			.success(function(data){
				$("#dialog-numpad-alert").jqxWindow('close');
			})
		}) 
	})

  var PaymentsPaymentUnique;
  $(document).on("submit", "#remove_payment_gift_card", function(e){
	  e.preventDefault();
	  PaymentsPaymentUnique = $("#custom_value").val();
	  GiftCardBalOption("giftcard_void_payment_option")
	  .then(function(){
		  WindowPopupGiftCardBalOption('Gift Card Void Issue Option')
	  })
	  $("#dialog-numpad-alert").jqxWindow("close");
  })


  $(document).on("submit", "#giftcard_void_payment_option", function(e){
	  e.preventDefault();
	  if(GCBalOptionID == 'Swipe'){
			NumpadGiftCardPayment("gc_void_payment_manual")
			.then(function(){
				WindowPopupGiftCardPayment("Gift Card Void Payment")
				.then(function(){
					$("#card_field").focus();
				})
			})
	  }else{
		$("#paymentlist").block({message: 'Processing please wait...'});
		var ReceiptPaymentUnique = PaymentsPaymentUnique;
		var OrigReceiptPaymentUnique = ReceiptPaymentUnique;
		var Paid = 0;
		var postdata ="receiptpaymentunique="+ ReceiptPaymentUnique;
			postdata+="&CustomerUnique="+ GlobalCustomer;
			postdata+="&Integrated=7";
			postdata+="&AcctNo="+GCBalOptionID;	
		posData.VoidPayment(postdata)
		.success(function(data){
			ReceiptPaymentUnique = data.receipt_payment_unique;
			Paid = data.paid;
		}).then(function(){
			if(Paid > 0){ 
				var postdata ="NewReceiptPaymentUnique="+ ReceiptPaymentUnique;
					postdata+="&ReceiptPaymentUnique="+ OrigReceiptPaymentUnique;
					postdata+="&CustomerUnique="+ GlobalCustomer;
				posData.VoidGiftCardPaymentAPI(postdata)
				.success(function(data){
					if(data.CmdStatus == 'Approved'){
						var msg = data.Status+"<br/>";
							msg+= data.msg+"<br/>";
							msg+= data.Authorize+"<br/>";
							msg+= data.Balance;
							
						PoleDisplayTotal();  
						POSTotal();
						LoadPayments();
						LoadChange();
						DisplayAllPayments();
						CheckBalance();
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}else if(data.CmdStatus == 'Error'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}
					NumpadAlertOk('void_payment_msg', msg)
					.then(function(){
						WindowPopupAlert ('Remove Payment Info')	
					})
				}).then(function(){
					$("#paymentlist").unblock();
				})
				$("#dialog-numpad-alert").jqxWindow("close");
			}else if(Paid < 0){
				var postdata ="NewReceiptPaymentUnique="+ ReceiptPaymentUnique;
					postdata+="&ReceiptPaymentUnique="+ OrigReceiptPaymentUnique;
					postdata+="&CustomerUnique="+ GlobalCustomer;
				posData.ReturnVoidGiftCardPaymentAPI(postdata)
				.success(function(data){
					if(data.CmdStatus == 'Approved'){
						var msg = data.Status+"<br/>";
							msg+= data.msg+"<br/>";
							msg+= data.Authorize+"<br/>";
							msg+= data.Balance;
							
						PoleDisplayTotal();  
						POSTotal();
						LoadPayments();
						LoadChange();
						DisplayAllPayments();
						CheckBalance();
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}else if(data.CmdStatus == 'Error'){
						var msg = data.Status+'<br/>';
							msg+= data.msg;
					}
					NumpadAlertOk('void_payment_msg', msg)
					.then(function(){
						WindowPopupAlert ('Remove Payment Info')	
					})
				}).then(function(){
					$("#paymentlist").unblock();
				})
				$("#dialog-numpad-alert").jqxWindow("close");
			}
		})
	  }
	  $("#gc_balance_option").jqxWindow("close");
  })

  $(document).on("submit", "#gc_void_payment_manual", function(e){
	  e.preventDefault();
	  $("#paymentlist").block({message: 'Processing please wait...'});
		var ReceiptPaymentUnique = PaymentsPaymentUnique;
		var OrigReceiptPaymentUnique = ReceiptPaymentUnique;
		var Paid = 0;
		var postdata ="receiptpaymentunique="+ ReceiptPaymentUnique;
			postdata+="&CustomerUnique="+ GlobalCustomer;
			postdata+="&Integrated=7";
			postdata+="&AcctNo="+$("#card_field").val();	
		posData.VoidPayment(postdata)
		.success(function(data){
			ReceiptPaymentUnique = data.receipt_payment_unique;
			Paid = data.paid;
		}).then(function(){
			if(Paid > 0){ 
				var postdata ="NewReceiptPaymentUnique="+ ReceiptPaymentUnique;
					postdata+="&ReceiptPaymentUnique="+ OrigReceiptPaymentUnique;
					postdata+="&CustomerUnique="+ GlobalCustomer;
				posData.VoidGiftCardPaymentAPI(postdata)
				.success(function(data){
					if(data.CmdStatus == 'Approved'){
						var msg = data.Status+"<br/>";
							msg+= data.msg+"<br/>";
							msg+= data.Authorize+"<br/>";
							msg+= data.Balance;
							
						PoleDisplayTotal();  
						POSTotal();
						LoadPayments();
						LoadChange();
						DisplayAllPayments();
						CheckBalance();
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+"<br/>";
							msg+= data.msg;
					}else if(data.CmdStatus == 'Error'){
						var msg = data.Status+"<br/>";
							msg+= data.msg;
					}
					NumpadAlertOk('void_payment_msg', msg)
					.then(function(){
						WindowPopupAlert ('Remove Payment Info')	
					})
				}).then(function(){
					$("#paymentlist").unblock();
				})
				$("#dialog-numpad-alert").jqxWindow("close");
			}else if(Paid < 0){
				var postdata ="NewReceiptPaymentUnique="+ ReceiptPaymentUnique;
					postdata+="&ReceiptPaymentUnique="+ OrigReceiptPaymentUnique;
					postdata+="&CustomerUnique="+ GlobalCustomer;
				posData.ReturnVoidGiftCardPaymentAPI(postdata)
				.success(function(data){
					if(data.CmdStatus == 'Approved'){
						var msg = data.Status+"<br/>";
							msg+= data.msg+"<br/>";
							msg+= data.Authorize+"<br/>";
							msg+= data.Balance;
							
						PoleDisplayTotal();  
						POSTotal();
						LoadPayments();
						LoadChange();
						DisplayAllPayments();
						CheckBalance();
					}else if(data.CmdStatus == 'Declined'){
						var msg = data.Status+"<br/>";
							msg+= data.msg;
					}else if(data.CmdStatus == 'Error'){
						var msg = data.Status+"<br/>";
							msg+= data.msg;
					}
					NumpadAlertOk('void_payment_msg', msg)
					.then(function(){
						WindowPopupAlert ('Remove Payment Info')	
					})
				}).then(function(){
					$("#paymentlist").unblock();
				})
				$("#dialog-numpad-alert").jqxWindow("close");
			}
		})
		$("#dialog-numpad-gift-card-payment").jqxWindow("close");
  })

  $(document).on("click", "#remove_payment_gift_card .alert_no", function(e){
	  e.preventDefault();
	  $("#dialog-numpad-alert").jqxWindow("close");
  })

  $(document).on('click', '#remove_gift_card_payment .alert_okay', function(e){
	 e.preventDefault();
	 	var ReceiptPaymentUnique = $("#custom_value").val();
 	 	var postdata = "receiptpaymentunique="+ReceiptPaymentUnique;
	 		postdata+="&Integrated=3";
		posData.VoidPayment(postdata)
		.success(function(data){
			$('#display-payments').unblock();	
			if(data.success == true){
				PoleDisplayTotal();  
				POSTotal();
				LoadPayments();
				LoadChange();
				DisplayAllPayments();
				CheckBalance();
			}
		}).then(function(){
			var postdata = "ReceiptPaymentUnique="+ReceiptPaymentUnique;
			posData.VoidGiftCardPayment(postdata)
			.success(function(data){
				$("#dialog-numpad-alert").jqxWindow('close');
			})
		}) 
  })
  
 
	$(document).on('submit', '#remove_payment', function(e){
		e.preventDefault();
		$("#dialog-numpad-alert").jqxWindow('close');
		var PaymentUnique = $scope.paymentid; //Receipt Payment table Unique 
		//var postData="receiptpaymentunique="+PaymentUnique;
		if($scope.paymentid != 0){
			var postdata="ReceiptPaymentUnique="+PaymentUnique;
			posData.CheckStatusPayment(postdata)
			.success(function(data){
				if(data.success == true){
					var postdata="receiptpaymentunique="+$scope.paymentid;
						postdata+="&PaymentUnique="+data.payment_unique;
						postdata+="&Integrated="+$scope.list_integrated;
					posData.VoidPayment(postdata)
					.success(function(vpdata){
						if(vpdata.success == true){  
							$('#display-payments').block({message: 'Processing please wait...'});
							var postdata="ReceiptPaymentUnique="+$scope.paymentid;
								postdata+="&NewReceiptPaymentUnique="+vpdata.receipt_payment_unique;
								postdata+="&TranType="+$scope.trantype;	
							posData.VoidCardPayment(postdata)
							.success(function(datacap){
								$('#display-payments').unblock();
								var msg = datacap.CmdStatus+"<br><br>";
									msg+= datacap.TextResponse;
								NumpadAlertOk('payment_voided', msg)
								.then(function(){
									WindowPopupAlert('Voided')	
								}).done(function(){
									if(datacap.signature){
										NumpadSignature('signature_ok')
										.then(function(){
											WindowPopupSignature('Signature')
											.then(function(){
												$("#signature_receipt_payment_unique").val(vpdata.receipt_payment_unique);
												$("#signature_unique").val(vpdata.payment_unique);
												$("#signature_status").val(datacap.status);
												$("#signature").attr({"src": base_url+"assets/img/signature/"+vpdata.receipt_payment_unique+".png?"+Math.random(), "width":"290", "height":"110"});
											})
										})
									}else{
										PrinterCheck(vpdata.payment_unique, vpdata.receipt_payment_unique, datacap.status);
									}
								})
								load_data2(datacap);
								DisplayAllPayments();
								CheckBalance();
								PoleDisplayTotal();
							})
						}
					})
				}
			})
		}
	})

	$(document).on('click', '#remove_payment .alert_no', function(e){
		e.preventDefault();
		$("#dialog-numpad-alert").jqxWindow('close');
	})
	
	$scope.CancelQYN = function(){
		AlertQyesAndno('', false, '', ''); 
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
		$scope.BtnReturnReceipt = false;
	};

	var CompletedSale = function(){
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.DropdownWhen = true;
		$scope.BtnDisableWhen = true;
		$scope.BtnApplyPaymentWhen = true;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnTipDollarWhen = true;
		$scope.BtnTipPercentWhen = true;
		$scope.BtnOnHoldWhen = true;
		$scope.BtnRemoveItemWhen = true;
		$scope.BtnCancelSaleWhen = true;
		$scope.BtnDiscountItemWhen = true;
		$scope.BtnReceiptDiscountWhen = true;
		$scope.BtnPriceChangeWhen = true;
		$scope.BtnReturnWhen = true;
		$scope.BtnQuantityWhen = true;
		$scope.BtnItemTaxWhen = true;
		$scope.BtnReceiptNoteWhen = true;
		$scope.BtnItemNoteWhen = true;
		$scope.BtnItemsWhen = true;
		$scope.BtnAddCustWhen = true;
		$scope.BtnEditWhen = true;
		$scope.TxtSearchWhen = true;
		$scope.BtnSearchWhen = true;
		$scope.RemoveCustomerWhen = false;
		$scope.CustomerFormWhen = true;
		$scope.CustomerLinkWhen = true;
		$scope.KitchenNoteDisabled = true;
		$scope.BtnReturnReceipt = true; 
	};

	var EnableButtonsWhenItemAdded = function(){
		$scope.BtnReceiptNoTaxWhen = false;
		$scope.BtnReceiptTaxWhen = false;
		$scope.DropdownWhen = false;
		$scope.BtnAddCustWhen = false;
		$scope.BtnEditWhen = false;
		$scope.BtnEBTCalulateWhen = false;
		$scope.BtnTipDollarWhen = false;
		$scope.BtnTipPercentWhen = false;
		$scope.BtnReturnReceipt = false;
	};

	var OtherButtons = function(){
		$scope.BtnReceiptNoTaxWhen = true;
		$scope.BtnReceiptTaxWhen = true;
		$scope.DropdownWhen = false;
		$scope.BtnAddCustWhen = false;
		$scope.BtnEditWhen = false;
		$scope.BtnEBTCalulateWhen = true;
		$scope.BtnTipDollarWhen = true;
		$scope.BtnTipPercentWhen = true;
		$scope.BtnReturnReceipt = false;
	};

   //Separate popup printer error to still asking
   //the Kitchen printing receipt even there still a balance due.
   var PrinterButton = function(form_name){
		var msg="Printer error, please check <br/>";
		msg+="1. Printer is turned on. <br/>";
		msg+="2. Check printer paper. <br/>";
		msg+="3. Restart printer.";
	
		NumpadAlertOkPrinterProblem(form_name, msg)
		.then(function(){
			WindowPopupAlert('Printer problem');
		})
   }	
   
   //--> Printer Check Connection
   
	var PrinterCheckRight = function(Unique){
		var def = $.Deferred();
		var postdata ="receipt_header_unique="+Unique;

		posData.PrinterCheckRecall(postdata)
		.success(function(data){
			if(data.success == true){
				if(data.print == true){
					def.resolve();
				}else{
					PrinterButton('kitchen_printer_check');
					$("body").unblock();
				}
			}
		})
		return def.promise();
	};
	
	$(document).on('submit', '#kitchen_printer_check', function(e){
		e.preventDefault();
		$('#dialog-numpad-alert').jqxWindow('close');
		KitchenPrintReceipt('IntegratedZero');	 
	})
   
   $(document).on('submit', '#CheckPrintKitchen', function(e){
		e.preventDefault();
		//$("body").block({message: 'Searching working printer please wait...'});
		$.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
		}, message: 'Searching working printer please wait...' });

		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				setTimeout($.unblockUI, 100); 
				//$("body").unblock();	
			})
		})
		$("#dialog-numpad-alert").jqxWindow("close");
	})

   var PaymentOk = function(Unique, Status, RespId, Digits){
     var amount = $scope.ccpayment.amount;
     var signature_amount = 0;
     var ReceiptPaymentUnique;
     var postdata="cardno="+$scope.creditCard.number;
     postdata+="&cardholder="+$scope.creditCard.holder;
     postdata+="&expirydate="+$scope.creditCard.expirydate;
     postdata+="&scode="+$scope.creditCard.seccode;
     postdata+="&amount="+$scope.ccpayment.amount;
     postdata+="&paymentid="+$scope.paymenttype.id;
     postdata+="&paymentname="+$scope.creditCard.type;
     postdata+="&AmountDue="+ $scope.amountdue.Total;
     postdata+="&rpcUnique="+Unique;
     postdata+="&status="+Status;
     postdata+="&lastdigit="+Digits;
     posData.CardApprovePayment(postdata)
         .success(function(data){
           if(data.success == true){
             signature_amount = data.signature_amount;
             amount = amount.replace(/[{()}]/g, '');

             ReceiptPaymentUnique = data.ReceiptPaymentId;
             $scope.payment = 0;

             POSTotal();
             LoadPayments();
             LoadChange();
             CheckReceiptStatus();
             DisplayAllPayments();
             posData.CheckBalance()
			 .success(function(data){
				if(data.balance == true){
					$scope.BtnApplyPaymentWhen = false;
					$scope.BtnPrintWhen = true;
				}else if(data.balance == false){
					$scope.BtnApplyPaymentWhen = true;
					$scope.BtnPrintWhen = false;
				}
			 });
			   
               if(data.status == 12){
                   $scope.response = {
                       message: "Payment Approved"
                   };
                   dialogpaymentcreditcard.close();

                   if(amount > signature_amount){
					 //$('body').block({message: 'Printing receipt please wait...'});
					 $.blockUI({ css: { 
						border: '2px solid #fff',
						padding: '15px', 
						backgroundColor: '#210e66', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: 1, 
						color: '#fff',
						fontSize: '20px' 
					}, message: 'Printing receipt please wait...' });
                   }

                   if(amount > signature_amount){
                     PrinterCheck($scope.paymenttype.id, ReceiptPaymentUnique, data.status);
                   }
               }else if(data.status == 13){
                   $scope.response = {
                       message: "Payment Declined"
                   }
               }
               $scope.response.id = ReceiptPaymentUnique;
               $scope.ccpayment.status = data.status;
               dialogCardProcessResponse.setTitle("Payment Processed");
               dialogCardProcessResponse.open();
			   
           }else{
			   
             $scope.alert = {
               message:data.msg
             };
             Alertdialog.setTitle("Payment");
             Alertdialog.open();
           }
         })
   };
   
   $scope.Authorize = function(){
     var postdata="cardno="+$scope.creditCard.number;
     postdata+="&cardholder="+$scope.creditCard.holder;
     postdata+="&expirydate="+$scope.creditCard.expirydate;
     postdata+="&scode="+$scope.creditCard.seccode;
     postdata+="&amount="+$scope.ccpayment.amount;
     postdata+="&paymentid="+$scope.paymenttype.id;
     postdata+="&paymentname="+$scope.creditCard.type;
     postdata+="&AmountDue="+ $scope.amountdue.Total;

     var credit_valid = $scope.creditCard.valid;
     var credit_expdate = $scope.creditCard.expirydate;
     var amount_valid = $scope.ccpayment.amount;

     if(credit_valid) {
        if(credit_expdate.length != 5) {
          $scope.alert = {
            message: "Invalid Expiry Date"
          };
          Alertdialog.setTitle("Warning");
          Alertdialog.open();
        }else{
          if(amount_valid == '') {
            $scope.alert = {
              message: "Please enter the Amount"
            };
            Alertdialog.setTitle("Warning");
            Alertdialog.open();
          }else{
            posData.PaymentCardProcess(postdata)
            .success(function (data) {
            if (data.success == true) {
                ConfigStation();
                PaymentOk(data.rpcUnique, data.status, data.rpcUnique, data.lastdigit);
                dialogpaymentcreditcard.close();
                $scope.creditCard = {};
                $scope.ccpayment = {
                  amount: 0
                }
              } else {
                $scope.alert = {
                  message: data.msg
                };
                Alertdialog.setTitle("Warning");
                Alertdialog.open();
              }
            })
          }
        }
     }else{
         $scope.alert = {
             message: "Invalid Credit Card Number"
         };
         Alertdialog.setTitle("Warning");
         Alertdialog.open();
     }
   };

   $scope.AuthorizeCancel = function(){
       $scope.creditCard = {};
       $scope.ccpayment = {
           amount: 0
       };
     dialogpaymentcreditcard.close();
   };

   $scope.ParseCardInfo = function(){
     var CreditCardInfo = $scope.card.ccinfopayment;
     ParseParserObj();
   };

   $scope.CardResponseOk = function(){
       dialogCardProcessResponse.close();
   };

   $scope.CardReponsePrint = function(id, status){
       dialogpaymentcreditcard.close();
       $scope.process = {
         message: 'Printing receipt...'
       };
       AlertProcessdialog.setTitle("Payment");
       AlertProcessdialog.open();
       PrinterCheck($scope.paymenttype.id, id, status);
   };
   
     $scope.PrintPayment = function(){
		$scope.pressprint = 1;
		var id = $scope.paymentid;
		var postdata="id="+id;
		posData.RowPayment(postdata)
		.success(function(data){
			if(data.success == true) {
				$('#display-payments').block({message: 'Printing receipt please wait...'}); 
				PrinterCheck(data.payment_unique, id, data.status)
				.then(function(){
					$('#display-payments').unblock();
				})
			}else{
				var msg = 'Please select Payment first.';
				NumpadAlertOk('adjust_tip', msg)
				.then(function(){
					WindowPopupAlert('Print Payment');
				})
			}
		})
   };

      $scope.RedirectDashboard = function(){
		posData.NewSaleQue()
		.success(function(data){
			if(data.success == true){
			  $scope.QueReceiptHeaderUnique = data.ReceiptHeaderUnique;
			  $scope.newsaleqshowModal = !$scope.newsaleqshowModal;
			}else if(data.success == false){
				posData.EmptyTransaction()
				.success(function(data){
					if(data.success == true){
						PoleDisplayReset();
						$window.location.href = base_url + 'pos/cashier';
					}
				})
			}
		})
      };

	  function isNumberKey(txt, evt) {
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode == 46) {
			//Check if the text already contains the . character
			if (txt.value.indexOf('.') === -1) {
				return true;
			} else {
				return false;
			}
		} else {
			if (charCode > 31
				 && (charCode < 48 || charCode > 57))
				return false;
		}
		return true;
	}


	const POSNumpadKeyCodeArr = {
	   '.' : '110',
		0 : '96',
		1 : '97',
		2 : '98',
		3 : '99',
		4 : '100',
		5 : '101',
		6 : '102',
		7 : '103',
		8 : '104',
		9 : '105'
	};

	$scope.payment_num = (val) => {
		/**
		 * Note: if this function won't work, the library might upgrade to the latest version.
		 * If so, goto jqwidgets library open jqxnumberinput.js file and change the code from the
		 * line  return b._raiseEvent(6, d) then replace to return b._raiseEvent(4, d).
		 */

		$("#amount_payment").jqxNumberInput('focus');
		var e = jQuery.Event("keypress", { keyCode: POSNumpadKeyCodeArr[val] });
		$("#amount_payment input").trigger(e);
	}

	$scope.payment_clear = () => {
		var e = jQuery.Event("keypress", { keyCode: 8 });
		$("#amount_payment input").trigger(e);
	}

	$scope.payment_num_old = function(val){
		var num = $scope.payment;
		if(num.length !== 7){	
			$scope.payment = $scope.payment + '' + val;
			if($("#PoleDisplay").val() == 2){
				if(ConnectionPoleDisplay){
					conn.send(JSON.stringify(["Number",val, $scope.station_un]));
				}
			} 
		}
	};

	$scope.payment_clear_old = function(){
		$scope.payment = $scope.payment - $scope.payment;
		if($("#PoleDisplay").val() == 2){
			if(ConnectionPoleDisplay){
				conn.send(JSON.stringify(["ClearNumber",'', $scope.station_un]));
			}
		}
	}

	$scope.CheckPrint = function(){
		posData.GetCurrentReceiptHeader()
		.success(function(data){
			PrinterRecallCheck(data.ReceiptHeaderUnique);
		})
	}
	
	
	//Table Order
	var populateNumpadTable = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-table").append('<div id="table_order_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#table_order_numpad").html('');
			$("#table_order_numpad").append(''+
			'<form id="'+form_name+'">'+
				'<h4 style="text-align:center;">Enter Table#</h4>'+
				'<input type="text" class="hdfield" id="number_field" maxlength="25" style="color:#000">'+
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
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
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
	
	/*
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
	*/
	
	$(document).on('submit', '#table_order_form', function(e){
		e.preventDefault();
		var tableno = $("#number_field").val();
		var postdata="tableno="+tableno;
		posData.TableAssign(postdata)
		.success(function(data){
			if(data.success == true){
				if(data.taken == false){
					LoadHeaderInfo2()
					.then(function(){
						$("#table_order_numpad").html('');
						$("#dialog-numpad-table").jqxWindow('close');
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
	
	/*
	$(document).on('submit','#change_cashier_form',function(e){
		e.preventDefault();
		var password = $("#number_field").val();
		var hashpasscode = CryptoJS.MD5(password);
		var postdata="passcode="+hashpasscode;
		posData.EnterPassCode(postdata)
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
	})
	*/
	
	$scope.EBTCalculate = function(){
		posData.EBTCalculate()
		.success(function(data){
			if(data.success == true){
					
			}
		}).then(function(){
			LoadOrderedItemList();
		  	LoadTax();
		  	LoadPayments();
		  	LoadChange();
			LoadChange();
			$scope.ReceiptNoTaxHide = true;
			$scope.ReceiptTaxHide = false;
			CheckReceiptStatus();
			DisplayAllPayments();
			LoadTotals()
			.then(function(){
				POSTotal()
				.then(function(){
					PoleDisplayTotal();
				});
			});
		})
	}
	
	var LocationRequest = function(){
		var recall_location="recall_location=pos/pointofsale/payment"
		posData.RecallLocationRequest(recall_location)
		.success(function(data){
			if(data.success == true)
			$window.location = base_url + "pos/pointofsale/recall-sale";
		})
	}
	
	$scope.TwentyPercentDiscount = function(discount){
		var DiscountAmount = discount;
		var postDataReceiptDiscount="optiondiscount="+1;
		postDataReceiptDiscount+="&discountamount="+DiscountAmount;
		posData.ReceiptDiscount(postDataReceiptDiscount)
		.success(function(data){
			if(data.success == true){
				LoadOrderedItemList();
				LoadTax();
				LoadPayments();
				LoadChange();
				LoadChange();
				CheckReceiptStatus();
				DisplayAllPayments();
				LoadTotals()
				.then(function(){
					POSTotal()
					.then(function(){
						PoleDisplayTotal();
					})
				});
			 }else{
				var msg = "Discount must be less than the total amount";
				NumpadAlertClose('discount_receipt_alert', msg)
				.then(function(){
					WindowPopupAlert('Receipt Discount Alert');
				})
			 }
		});
	}
	
	$(document).on('click', '#gift_card_manual_enter_amount-payment', function(e){
		e.preventDefault();
		NumpadPriceGC('payment_gift_card_manual_amount')
		.then(function(){
			WindowPopupPriceGC('Gift Card')
			.then(function(){
				setTimeout(function(){
					$("#gc_enter_amount").jqxNumberInput('focus');
					var input = $('#gc_enter_amount input')[0];
					if('selectionStart' in input) {
						input.setSelectionRange(0, 0);
						$("#gc_enter_amount").select();
					}else{
						var range = input.createTextRange();
						range.collapse(true);
						range.moveEnd('character', 0);
						range.moveStart('character', 0);
						range.select();
					}
					$("#gc_enter_amount input").select();
				},100)
			})
		})
		// NumpadPriceGCPayment('payment_gift_card_manual_amount')
		// .then(function(){
		// 	WindowPopupPriceGCPayment('Gift Card')
		// 	.then(function(){
		// 		$("#number_field").val('0.00');
		// 		$("#number_field").focus();
		// 		setTimeout(function(){
		// 			$("#number_field").select();
		// 		},100);
		// 	})
		// })

	})
	
	$(document).on("submit", "#payment_gift_card_manual_amount", function(e){
		e.preventDefault();
		var manual_amount = $("#gc_enter_amount").val();
		if(manual_amount > 0){
			$("#payment_gift_card_amount").text(parseFloat(manual_amount).toFixed(2));
			$("#amount_payment").val(manual_amount);
			setTimeout(function(){
				$("#payment_gift_card_number").focus();
			},100);
		}else{
			var msg = "Gift Card Amount Must Be Greater Than 0";
			NumpadAlertOk('gift_card_amount_zero', msg)
			.then(function(){
				 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
			})
		}
		$("#dialog-numpad-gift-price").jqxWindow('close');
	})
	
	$(document).on('click', '.manual-giftcard-payment', function(e){
		e.preventDefault();
		NumpadGiftCardPayment('gift_card_manual_card-payment')
		.then(function(){
			WindowPopupGiftCardPayment('Gift Card')
			.then(function(){
				$("#card_field").val('');
				$("#card_field").focus();
				setTimeout(function(){
					$("#card_field").select();
				},100);
			})
		})
	})
	
	$(document).on('submit', '#gift_card_manual_card-payment', function(e){
		e.preventDefault();
		$("#payment_gift_card_number").val('');
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
			$("#payment_gift_card_number").val(convert_card);
			setTimeout(function(){
				$("#payment_gift_card_number").focus();
			},100);
		}else{
			$("#payment_gift_card_number").val(manual_card);
			setTimeout(function(){
				$("#payment_gift_card_number").focus();
			},100);
		}
		
		
		$("#dialog-numpad-gift-card-payment").jqxWindow('close');
	})
	
	var ValidateAmountandBalance = function(cardno, amount){
		var def = $.Deferred();
		var postdata = "GiftCard="+cardno;
			postdata+= "&Amount="+amount;
		
		posData.ValidateAmountBalance(postdata)
		.success(function(data){
			def.resolve(data.success);	
		})
		return def.promise();
	}
	
	var ValidateGiftCardNumber = function(cardno){
		var def = $.Deferred();
		var postdata = "GiftCard="+cardno;
		posData.ValidateGiftCard(postdata)
		.success(function(data){
			def.resolve(data.success);
		})
		return def.promise();
	}

	$(document).on('click', "#apply_gift_card #gcbalprint3", function(e){
		e.preventDefault();
		var GiftCardNo 	= $("#payment_gift_card_number").val();
		var GCBalance 	= $("#akgcbalance3").val();
		var postdata = "GiftCard="+GiftCardNo;
			postdata+= "&GiftCardBalance="+GCBalance; 
		posData.GiftCardPrintBalance(postdata)
		.success(function(data){
			
		})
	})
	
	$(document).on('submit', '#apply_gift_card', function(e){
		e.preventDefault();
		$("#gc_ok").attr("disabled", true);

		var GiftCardLength 		 = parseInt($("#GiftCardLength").val());
		var PaymentUnique 		 = $("#gc_payment_unique").val();
		var GiftCardAmount 		 = parseFloat($("#payment_gift_card_amount").text()).toFixed(2);
		var GiftCard			 = $("#payment_gift_card_number").val();
		var Last4				 = GiftCard.substr(GiftCard.length - 4);	
		var ReceiptPaymentUnique = '';
		var ReceiptHeaderUnique  = '';
		if(GiftCardAmount > 0){	
			if(GiftCard != ''){
				var regex = /^[0-9\s]*$/;
				if( !regex.test(GiftCard) ) {
					$("#payment_gift_card_balance").text('Card can only be numbers.');
					return false;
				}

				if(GiftCardLength == 0){
					GiftCardLength = 4;
				}

				if(GiftCard.length < GiftCardLength){ //Gift Card Number must be greater than 4
					$("#payment_gift_card_balance").text('Card must be at least '+GiftCardLength+' digits.');
					
					setTimeout(function(){
						$("#gc_ok").attr("disabled", false);
					},1000)

					return false;
				}
				
				ValidateGiftCardNumber(GiftCard)
				.then(function(GCresponse){
					if(GCresponse == true){
						ValidateAmountandBalance(GiftCard, GiftCardAmount)
						.then(function(response){
							if(response == true){
								//-->Decline
								var postdata ="&Amount="+GiftCardAmount;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&ReceiptPaymentUnique=null";
									postdata+="&process=2";
								posData.PaymentGiftCard(postdata)
								.success(function(data){
									var msg = "Declined <br/>";
										msg += data.response;
									NumpadAlertOk('gift_card_decline', msg)
									.then(function(){
										 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
									})
								});
								
							}else if(response == false){
								//-->Approved
							  	var postdata="PaymentUnique=" + PaymentUnique;
									postdata+="&AmountDue=" + $scope.amountdue.Total;
									postdata+="&AmountEntered=" + GiftCardAmount;
									postdata+="&TypeName=" + $("#gc_payment_name").val();
									postdata+="&last4="+Last4;
									postdata+="&GiftCardPayment=1";
									postdata+="&Amount="+GiftCardAmount;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&process=1";
								posData.TransPayment(postdata)
								.success(function(data) {
									ReceiptHeaderUnique = data.ReceiptHeaderUnique;
									ReceiptPaymentUnique = data.ReceiptPaymentId;
									if(data.success == true) {
										$scope.payment = 0;
										if(POSPaymentNumpad == 1){
											$("#amount_payment").maskMoney('mask', '0.00');
										}
										load_data2(data);
										DisplayAllPayments();
									}else{
										var msg = data.msg;
										NumpadAlertOk('giftcard_payment', msg)
										.then(function(){
											WindowPopupAlert('Payment Notification')
										});
									}
								
									$("#amount_payment").val('0.00');
									$("#dialog-gift-card-payment").jqxWindow('close');
								}).then(function(){

									// var postdata ="&Amount="+GiftCardAmount;
									// 	postdata+="&GiftCard="+GiftCard;
									// 	postdata+="&ReceiptPaymentUnique="+ReceiptPaymentUnique;
									// 	postdata +="&process=1";
									// posData.PaymentGiftCard(postdata)
									// .success(function(data){
											
									// });

								})
							}
						})	 
				  	}else{
						var postdata ="&Amount="+GiftCardAmount;
							postdata+="&GiftCard="+GiftCard;
							postdata+="&ReceiptPaymentUnique=null";
							postdata+="&process=3";
						posData.PaymentGiftCard(postdata)
						.success(function(data){
							var msg = "Invalid Gift Card Number";
							NumpadAlertOk('gift_card_invalid', msg)
							.then(function(){
								 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>');	
							})

							setTimeout(function(){
								$("#gc_ok").attr("disabled", false);
							},1000)

						});	
					}
				})
			}else{
				var msg = "Gift Card Number is required";
				NumpadAlertOk('gift_card_number_required', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})

				setTimeout(function(){
					$("#gc_ok").attr("disabled", false);
				},1000)
			}
		}else{
			//-->Check Total
			ValidateGiftCardNumber(GiftCard)
			.then(function(GCResponse){
				if(GCResponse == true){
					GiftCardCheckTotal()
					.then(function(total){
						if(total > 0){
							var msg = "Gift Card Amount Must Be Greater Than 0";
							NumpadAlertOk('gift_card_amount_zero', msg)
							.then(function(){
								 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
							})

							setTimeout(function(){
								$("#gc_ok").attr("disabled", false);
							},1000)
						}else if(total < 0){
						  //-->Refund
						  var postdata = "PaymentUnique=" + PaymentUnique;
						  postdata += "&AmountDue=" + $scope.amountdue.Total;
						  postdata += "&AmountEntered=" + GiftCardAmount  * -1;
						  postdata += "&TypeName=" + $("#gc_payment_name").val();
						  postdata += "&last4="+Last4;
						  posData.TransPayment(postdata)
						  .success(function(data) {
							  ReceiptHeaderUnique = data.ReceiptHeaderUnique;
							  ReceiptPaymentUnique = data.ReceiptPaymentId;
							  if(data.success == true) {
									$scope.payment = 0;
									if(POSPaymentNumpad == 1){
										$("#amount_payment").maskMoney("mask", '0.00');
									}
									load_data2(data);
									//PoleDisplayPaymentMethod(ReceiptPaymentUnique);
									//POSTotal();
									//LoadPayments();
									//LoadChange();
									//CheckReceiptStatus();
									DisplayAllPayments();
						
									posData.CheckBalance()
									.success(function (data) {
										if (data.balance == true) {
											$scope.BtnApplyPaymentWhen = false;
											$scope.BtnPrintWhen = true;
										}else if(data.balance == false) {
											$scope.BtnApplyPaymentWhen = true;
											$scope.BtnPrintWhen = false;
											//$('body').block({message: 'Printing receipt please wait...'});
											$.blockUI({ css: { 
												border: '2px solid #fff',
												padding: '15px', 
												backgroundColor: '#210e66', 
												'-webkit-border-radius': '10px', 
												'-moz-border-radius': '10px', 
												opacity: 1, 
												color: '#fff',
												fontSize: '20px' 
											}, message: 'Printing receipt please wait...' });
											PrinterCheck(PaymentUnique, "", "");
										}
									})
							   }else{
								var msg = data.msg;
								NumpadAlertOk('giftcard_payment', msg)
								.then(function(){
									WindowPopupAlert('Payment Notification')
								});
							  }
							  
							  $("#amount_payment").val('0.00');
							  $("#dialog-gift-card-payment").jqxWindow('close');
						   
						   }).then(function(){
								var postdata ="&Amount="+GiftCardAmount * -1;
									postdata+="&GiftCard="+GiftCard;
									postdata+="&ReceiptPaymentUnique="+ReceiptPaymentUnique;
									postdata +="&Total="+total;
								posData.RefundPaymentGiftCard(postdata)
								.success(function(data){
									
								});
						   })
						}
					})
				}else{
					var postdata ="&Amount="+GiftCardAmount;
						postdata+="&GiftCard="+GiftCard;
						postdata+="&ReceiptPaymentUnique=null";
						postdata+="&process=3";
					posData.PaymentGiftCard(postdata)
					.success(function(data){
						var msg = "Invalid Gift Card Number";
						NumpadAlertOk('gift_card_invalid', msg)
						.then(function(){
							 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
						})

						setTimeout(function(){
							$("#gc_ok").attr("disabled", false);
						},1000)
					});	
				}
			})
		}
	})
	
	var GiftCardCheckTotal = function(){
		var def = $.Deferred();
		posData.GiftCardCheckTotal()
		.success(function(data){
			def.resolve(data.Total);
		})
		return def.promise();
	}
		
	$(document).on('click', '#swipe_card', function(e){
		e.preventDefault();
		$("#payment_gift_card_number").val('');
		setTimeout(function(){
			$("#payment_gift_card_number").focus();
		},100);
	})

	/*Check Payment Form */
	var populateCheckPaymentForm = function(html){
		var def = $.Deferred();
		setTimeout(function(){
			$("#check_payment_popup").append('<div id="check_payment_popup_container"></div>');
			$("#check_payment_popup_container").html('');
			$("#check_payment_popup_container").append(html);
			def.resolve();
		},200);
		return def.promise();
	}

	var WindowCheckPaymentForm = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#check_payment_popup").jqxWindow({
				height: 530,
				width: '60%',
				title: 'Payment',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#check_payment_popup').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var CheckPaymentForm = function(html){
		var def = $.Deferred();
		populateCheckPaymentForm(html)
		.then(function(){
			def.resolve();
		},100);
		return def.promise();
	}

	var CustomerSelectById = function(unique){
		var postdata ="CustomerUnique="+unique;
		posData.FindSelectedCustomerById()
		.success(function(data){
			var source = {
				datatype: "json",
				datafields: [
					{ name: 'Unique' },
					{ name: 'name' }
				],
				localdata: data
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
		})
		
		$("#CustomerListName").jqxListBox({
			width: '100%',
			height: 350,
			source: CustomerdataAdapter,
			displayMember: "name",
			valueMember: "Unique",
			renderer: function (index, label, value) {
				var item = CustomerdataAdapter.records[index];
				if (item != null) {
					var label = item.name;
					return label;
				}
				return "";
			}
		})
	}

	/*
	|---------------------------------------------------------------------|
	| Rewards Notification Window
	|---------------------------------------------------------------------|
	*/
	$(document).on('close', '#rewards_notification', function(e){
		e.preventDefault();
		$('#rewards_notification').html('');
	})
	var populateRewardsNotification = function(form_name, html){
		var def = $.Deferred();
		$("#rewards_notification").append('<div id="rewards_container" style="background: #144766; color:#EEE;"></div>');
		$("#rewards_container").html('<label class="reason-label">Customer has earned the following:</label>');
		$("#rewards_container").append('<div id="rewards_container_list" style="overflow: auto; height: 225px; width:100%;"></div>');
		$("#rewards_container_list").append(html);
		$("#rewards_container").append(
			'<div style="position: absolute; bottom: 0; right: 0;">'+
			'<span style="font-size:18px; margin-right:10px;">Do you want to use the reward?</span>'+
			'<button id="reward_yes" class="btn btn-primary btn-lg" style="margin-right: 5px;">Yes</button>'+
			'<button id="reward_cancel" class="btn btn-warning btn-lg">No</button>'+
			'</div>'+
			'<input type="hidden" id="rewardstotal" value="0">'
		)
		setTimeout(function(){
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowRewardsNotification = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#rewards_notification").jqxWindow({
				height: 340,
				minWidth: 600,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }
			});
			$('#rewards_notification').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var RewardsNotification = function(form, html){
		var def = $.Deferred();
		populateRewardsNotification(form, html)
		.then(function(){
			def.resolve();
		})
		return def.promise();
	}

	/*
	|---------------------------------------------------------------------|
	| Check Rewards
	|---------------------------------------------------------------------|
	*/
	var CheckRewardsByCustomerPoints = function(){
		posData.RewardsByCustomerPoints()
		.success(function(data){
			if(data.success){
				if(data.reward > 0){
					RewardsNotification('points_rewards', data.html)
					.then(function(){
						WindowRewardsNotification('Reward Earned');
						$("#rewardstotal").val(data.rewardTotal);
					})
				}
			}
		})
	}
	
	var PaymentView = function(){
		$("#item-category-container").hide();
		$("#payment-view").show();
		$scope.BtnPaymentView = false;
		$scope.BtnItemsCategoryView = true;
		$("#amount_payment").val('0.00');
		if(POSPaymentNumpad == 1){
			var input = $('#amount_payment input')[0];

			$('#amount_payment').focus();
		}else{
			setTimeout(function(){
				var input = $('#amount_payment input')[0];
				if('selectionStart' in input) {
					input.setSelectionRange(0, 0);
				}else{
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', 0);
					range.moveStart('character', 0);
					range.select();
				}
				$('#amount_payment input').focus();
			},100)
		}
	}

	$("#amountdue_total").on('valueChanged', function(event){
		var value = event.args.value;
		var TotalAmountDue = parseFloat($("#amountdue_total").val() * -1);
	
		if(TotalAmountDue >= parseFloat($scope.RefundLimitAmount) && parseFloat($scope.RefundLimitAmount) != 0 ){
			NumpadPasscode('open_payment_view')
			.then(function(){
				WindowPopupPasscode('Payment')
				.then(function(){
					$("#number_field").focus();
				})
			})

			return;
		}
		console.log("changed");
	})
	
	$scope.RefundLimitAmount; 
	$scope.PaymentView = function(){
		var postdata ="FunctionButton=Payment";
		posData.CheckUserManagerCookie(postdata)
		.success(function(data){
			if(data.prompt){
				$scope.FunctionButton = 'Payment';
				NumpadPasscode('open_payment_view')
				.then(function(){
					WindowPopupPasscode('Payment')
					.then(function(){
						$("#number_field").focus();
					})
				})
			}else{
				console.log(data.Limit);
				if(data.Limit != 0 ){
					var AmountDueTotal = $("#amountdue_total").val();
					if(AmountDueTotal < 0){
						var TotalAmountDue = parseFloat($("#amountdue_total").val() * -1);
						$scope.RefundLimitAmount = parseFloat(data.Limit);
	
						if(TotalAmountDue >= parseFloat($scope.RefundLimitAmount) && parseFloat($scope.RefundLimitAmount) != 0 ) {
							NumpadPasscode('open_payment_view')
							.then(function(){
								WindowPopupPasscode('Payment')
								.then(function(){
									$("#number_field").focus();
								})
							})
	
							return;
						}
					}
				}

				PoleDisplayTotal();
				PaymentView();
				CheckRewardsByCustomerPoints();
			}
		})
	}

	$(document).on('select', '#customer_earned_rewards', function(event){
		var index = event.args.index;
	})
	//$("#enableselection").on('select', function (event) {
		
	/*
	|---------------------------------------------------------------------|
	| Print Reward
	|---------------------------------------------------------------------|
	*/
	$(document).on('click','#print_rewards', function(e){
		e.preventDefault();
		var postdata ="RewardsUnique="+RewardsUnique;
		posData.PrintRewardByCustomer(postdata)
		.success(function(data){

		})
	})

	/*
	|---------------------------------------------------------------------|
	| Reward Popup
	|---------------------------------------------------------------------|
	*/
	var popuplateRewardWindow = function(reward){
		var def = $.Deferred();
		$("#rewards_notify").append('<div id="rewards_notify_container" style="background: #144766; color:#EEE;"></div>');
		$("#rewards_notify_container").html('');
		$("#rewards_notify_container").append(
			'<span style="font-size:21px; margin-right:10px;"><b>'+reward.customer+' has earned the following reward(s)</b></span>'+
			'<br>'+
			'<br>'+
			'<ul style="font-size:20px; list-style: none; padding-left:0;">'+reward.reward_info+'</ul>'+
			'<div style="position: absolute; bottom: 0; right: 0;">'+
			'	<button id="reward_notify_print" class="btn btn-warning btn-lg">Print</button>'+
			'	<button id="reward_notify_okay" class="btn btn-primary btn-lg" style="margin-right: 5px;">Okay</button>'+
			'</div>'
		)
		setTimeout(function(){
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowRewardNotify = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#rewards_notify").jqxWindow({
				height: 300,
				minWidth: 530,
				title: 'Information',
				isModal: true,
				theme: 'dark',
				showCloseButton: false,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#rewards_notify').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var RewardsNotify = function(reward){
		var def = $.Deferred();
		popuplateRewardWindow(reward)
		.then(function(){
			def.resolve();
		})
		return def.promise();
	}

	$("#rewards_notify").on('close', function(e){
		e.preventDefault();
		$("#rewards_notify_container").html('');
	})

	/*
	|----------------------------------------------------|
	| Button Okay Reward
	|----------------------------------------------------|
	*/
	$(document).on('click', '#reward_notify_okay', function(e){
		e.preventDefault();
		$("#rewards_notify").jqxWindow('close');
	})
	/*
	|----------------------------------------------------|
	| Button Print Reward
	|----------------------------------------------------|
	*/
	$(document).on('click', '#reward_notify_print', function(e){
		e.preventDefault();
		posData.PrintRewardByOnDisplay()
		.success(function(data){
			if(data.success){

			}else{
				var msg = data.PrinterNotWorking;
				PrinterStatusWindow('no_customer_selected', msg)
				.then(function(){
					WindowPopupPrinterStatus('Printer Status');
				})
			}
		})
	})

	/*
	|----------------------------------------------------|
	| Button Print Promo
	|----------------------------------------------------|
	*/
	$(document).on('click', '#reward_notify_print_promo', function(e){
		e.preventDefault();
		posData.PrintPromoByOnDisplay()
		.success(function(data){
			if(data.success){

			}else{
				var msg = data.PrinterNotWorking;
				PrinterStatusWindow('no_customer_selected', msg)
				.then(function(){
					WindowPopupPrinterStatus('Printer Status');
				})
			}
		})
	})

	/*
	|---------------------------------------------------------------------------------------
	| POS Change Screen Window
	|---------------------------------------------------------------------------------------
	*/
	var populatePosChangeScreen = function(){
		var def = $.Deferred();
		$("#pos_change_screen").append('<div id="pos_change_screen_container" style="background: #144766; color:#EEE; padding:0; margin:0;"></div>')
		$("#pos_change_screen_container").html('');
		posData.PosChangeScreenWindow()
		.success(function(data){
			$("#pos_change_screen_container").append(data.html);
			$('#ChangeDisplay').html('');
			def.resolve();
		})
		return def.promise();
	}

	var WindowPosChangeScreen = function(header_title){
		var def = $.Deferred();
		var ResoWidth 	        = $("#fakeheight2").width();
		var ResoHeight 	        = $("#fakeheight2").height();
		var ComputeHeight		= ResoHeight - 110;
		var POSMain 			= ComputeHeight - 30;
		var UseHeight			= POSMain;
		var ChangeScreenWidth 	= $("#right_panel_width").width();

		if(ChangeScreenWidth <= 1024){
			ChangeScreenWidth = (ChangeScreenWidth - 10);
		}
		setTimeout(function(){
			$("#pos_change_screen").jqxWindow({
				maxHeight: UseHeight,
				height: 500,
				minWidth: '37%',
				width: ChangeScreenWidth,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				zIndex: 100
			});
			$('#pos_change_screen').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	/*
	|----------------------------------------------------------
	| Timer Countdown
	|----------------------------------------------------------
	*/
	var interval = null;
	var PosChangeCounter = function(){
		var POSChangeScreen = $("#POSChangeScreen").val();
		var n=$("#POSChangeScreenSeconds").val();
		var c=n;
		$('#pos_change_timer').text(c);
		interval = setInterval(function(){
			c--;
			if(c>=0){
				$('#pos_change_timer').text(c);
				// console.log("Timer:",c);
			}
			if(c==0){
				$('#pos_change_timer').text(n);
				if(POSChangeScreen == 1){//Default
					
				}else if(POSChangeScreen == 2){ //CountDown Timer 0 Make New Receipt
					$("#dialog-numpad-payment-alert").jqxWindow('close');
					$("#alert-payment-msg-popup").html('');
					$("#pos_change_screen").jqxWindow("close");
					$rootScope.$emit("CallParentMethod");
				}else if(POSChangeScreen == 3){ //CountDown Timer 0 Go back to Cashier page
					$("#dialog-numpad-payment-alert").jqxWindow('close');
					$("#alert-payment-msg-popup").html('');
					$("#pos_change_screen").jqxWindow("close");
					$rootScope.$emit("CallEmptyTranscationFunction");
				}else if(POSChangeScreen == 4){
					$("#dialog-numpad-payment-alert").jqxWindow('close');
					setTimeout(function(){
						$rootScope.$emit("CallFinishTransaction");
						$('#pos_change_screen').jqxWindow('close');
					},100);	
				}
			}
		},1000);
	}

	$(document).on('click', '#pos_change_close', function(e){
		e.preventDefault();
		var POSChangeScreen = $("#POSChangeScreen").val();
		if(POSChangeScreen == 1){//Default
			
		}else if(POSChangeScreen == 2){ //CountDown Timer 0 Make New Receipt
			$rootScope.$emit("CallParentMethod"); //Extension method from app.js file
		}else if(POSChangeScreen == 3){ //CountDown Timer 0 Go back to Cashier page
			setTimeout(function(){
				$rootScope.$emit("CallEmptyTranscationFunction"); //Extension method from app.js file
			},1000);
		}else if(POSChangeScreen == 4){
			setTimeout(function(){
				$rootScope.$emit("CallFinishTransaction");
			},100);	
		}
		setTimeout(function(){
			clearInterval(interval);
		},1000);
		$("#dialog-numpad-payment-alert").jqxWindow('close');
		$("#alert-payment-msg-popup").html('');
		$('#pos_change_screen').jqxWindow('close');
	})

	$(document).on('click', '#pos_change_back', function(e){
		e.preventDefault();

		setTimeout(function(){
			clearInterval(interval);
		},1000);
		
		var postdata ="FunctionButton=EditReceipt";
		posData.CheckUserManagerCookie(postdata)
		.success(function(data){
			if(data.prompt){
				$scope.FunctionButton = 'EditReceipt';
				NumpadPasscode('edit_receipt_percent_passcode')
				.then(function(){
					WindowPopupPasscode('Edit Receipt')
					.then(function(){
						$("#number_field").focus();
					})
				})
			}else{
				posData.ChangeScreenUpdateStatus()
				.success(function(data){
					load_data2(data);
					
					$rootScope.$emit("CallEditReceiptButtonFn");
				})
			}
		})
		$('#pos_change_screen').jqxWindow('close');
	})

	$(document).on('submit', '#edit_receipt_percent_passcode', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
		var CRP = new CardReaderParser(CardRead);
		if(CRP.converted){
			var passcode = CRP.converted;
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+$scope.FunctionButton;
			posData.EnterPassCode(postdata)
			.success(function(data){
				if(data.success == true){
					if(data.login == true){
						posData.ChangeScreenUpdateStatus()
						.success(function(data){
							$rootScope.$emit("CallEditReceiptButtonFn");
							load_data2(data);
						})
					}else{
						$("#dialog-numpad-passcode").jqxWindow('close');
						NumpadAlertOk('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
				}else{
					$("#dialog-numpad-passcode").jqxWindow('close');
					NumpadAlertOk('remove_item_info', data.msg)
					.then(function(){
						WindowPopupAlert('Info');
					})
				}

				$("#dialog-numpad-passcode").jqxWindow('close');
			})
		}
	})

	$(document).on("click", '#pos_change_print', function(e){
		e.preventDefault();
		$rootScope.$emit("CallPrintReceiptFunction");
	})

	$(document).on('click', '#pos_gift_receipt', function(){
		$rootScope.$emit("CallNumpadItemCheckList");
		setTimeout(function(){
			clearInterval(interval);
		},1000);
		$('#pos_change_screen').jqxWindow('close');
	})


	$("#pos_swipe_card_form").on('close', function(e){
		e.preventDefault();
		$("#pos_swipe_card_form_container").html('');
	})

	var populateSwipeCardForm = function(form){
		var def = $.Deferred();
		$("#pos_swipe_card_form").append('<div id="pos_swipe_card_form_container" style="background: #144766; color:#fff;"></div>');
		$("#pos_swipe_card_form_container").html('');
		posData.SwipeCardForm()
		.success(function(data){
			$("#pos_swipe_card_form_container").append($compile(data.html)($scope));
			$("#pos_swipe_card_form_container").append(
				'<form id="'+form+'">'+
					'<input type="text" id="swipecard_number_field" style="display:none; color:#000;"/>'+
					'<input type="text" id="swipecard_number_non_track2" style="display:none; color:#000;"/>'+
					'<input type="text" id="swipecard_account_name" style="display:none; color:#000;"/>'+
					'<div id="swipe_card_function"></div>'+
				'</form>'
			);
			def.resolve();
		})
		return def.promise();
	}

	var WindowSwipeCardForm = function(){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#pos_swipe_card_form").jqxWindow({
				height: 500,
				width: 650,
				title: "Card Entry",
				isModal: true,
				theme: 'darkblue',
				draggable: false,
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				resizable: false,
				position: { x: OrderListWidth, y: 50 },

			});
			$('#pos_swipe_card_form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var SwipeCardFrom = function(form){
		var def = $.Deferred();
		populateSwipeCardForm(form)
		.then(function(){
			$("#swipe_card_function").hdkeyboard({
				layout: 'custom12',
				input: $("#swipecard_number_field")
			})
			def.resolve();
		})
		return def.promise();
	}

	$(document).on('click', "#swipecard_form .button_proceed", function(e){
		e.preventDefault();
		if($("#credit_card_number").val() != ''){
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $("#amountdue_total").val();
			var amountdue = $("#amountdue_total").val();
			var process = true;

			if(amountdue < 0){
				var newAmountDue = amountdue * -1; //For computation use only
				if(typed_payment > newAmountDue){
					var msg = "Payment amount cannot exceed Refund amount.";
					NumpadAlertOk('item_note_alert', msg)
					.then(function(){
						WindowPopupAlert('Refund')
					});
					process = false;
				}else{
					process = true;
				}	 
			}else if(amountdue > 0){
				if(typed_payment > amountdue){
					var msg = "Payment amount cannot exceed Total amount.";
					NumpadAlertOk('item_note_alert', msg)
					.then(function(){
						WindowPopupAlert('Payment')
					});
					process = false;
				}else{
					process = true;
				}
			}
		
			if(typed_payment > 0){
				if(typed_payment >= SwipeCardFormArray[8]){
					PrintReceiptBySignatureAmount = true;
				}else if(amountdue < 0){
					PrintReceiptBySignatureAmount = true;
				}
			}else{
				if(amountdue >= SwipeCardFormArray[8]){
					PrintReceiptBySignatureAmount = true;
				}else if(amountdue < 0){
					PrintReceiptBySignatureAmount = true;
				}
			}
			

			$(".btnpayment").attr({"disabled": false});

			if(process == true){
				var ProcessArray = ['Processing Please wait...'];	
				$.blockUI({ css: { 
					border: '2px solid #fff',
					padding: '15px', 
					backgroundColor: '#210e66', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					opacity: 1, 
					color: '#fff',
					fontSize: '20px' 
				}	, message: 'Processing please wait...' }); 

				var ExpMonth = $("#credit_card_number_month").val();
				var ExpYear  = $("#credit_card_number_year").val();

				var postdata  = "PaymentUnique="+SwipeCardFormArray[0];
					postdata += "&AmountDue="+amountdue;
					postdata += "&AmountEntered="+typed_payment;
					postdata += "&TypeName="+SwipeCardFormArray[1];
					postdata += "&TranType="+SwipeCardFormArray[3];
					postdata += "&InvokeControl="+SwipeCardFormArray[4];
					postdata += "&MerchantID="+SwipeCardFormArray[5];
					postdata += "&Integrated="+SwipeCardFormArray[2];
					postdata += "&SecureDevice="+SwipeCardFormArray[9];
					postdata += "&ComPort="+SwipeCardFormArray[10];
					postdata += "&Signature="+SwipeCardFormArray[11];
					postdata += "&SignatureAmount="+SwipeCardFormArray[8];
					postdata += "&CardType="+SwipeCardFormArray[13];
					postdata += "&PaymentID="+SwipeCardFormArray[14];
					postdata += "&Demand="+SwipeCardFormArray[15];
					postdata += "&SupressAmount="+SwipeCardFormArray[16];
					postdata += "&OrderType="+$("#OrderType").val();
					postdata += "&ExpDate="+ExpMonth+ExpYear;
					postdata += "&Address="+$("#credit_card_number_street").val();
					postdata += "&Zip="+$("#credit_card_number_zipcode").val();
					postdata += "&CVV="+$("#credit_card_number_cvv").val();
					postdata += "&CardNumber="+$("#swipecard_number_field").val();
					postdata += "&CardNumberNonTrack="+$("#swipecard_number_non_track2").val();
					postdata += "&AccountName="+$("#swipecard_account_name").val();
				posData.ProcessCreditCardSwipe(postdata)
				.success(function(data){
					var ResponseArray = [data.TextResponse, data.AmountApproved]; 
					var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
					setTimeout($.unblockUI, 100); 
					if(data.AmountApproved){
						var msg = data.TextResponse+'<br/>';
						msg+= data.AmountApproved;
					}else{
						var msg= data.TextResponse;
					}
					
					NumpadPaymentAlertOk('payment_process', msg)
					.then(function(){
						WindowPopupPaymentAlert(' Payment');
					});
					
					if(data.CmdStatus !== "Error"){
						$scope.payment = 0;
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
						}
						DisableNumpadEasyButtons(false);
						load_data2(data);
						SignatureData = data;
						DisplayAllPayments();
						if(amountdue < 0){
							typed_payment = typed_payment * -1;
							amountdue = amountdue * -1;
						}
						
						if(data.status == 12){
							if(typed_payment > 0){
								//Typed Payment Without Signature Amount and no Signature Capture
								setTimeout($.unblockUI, 100); 
								ordertype2();
								if($("#TableOrder").val() == 1){
									if($("#PoleDisplay").val() == 2){
										if(ConnectionPoleDisplay){
											tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
										}
									}
								}
							}else{
								setTimeout($.unblockUI, 100); 
								ordertype2();
								if($("#TableOrder").val() == 1){
									if($("#PoleDisplay").val() == 2){
										if(ConnectionPoleDisplay){
											tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
										}
									}
								}
							}
						}else if(data.status == 13){
							if(typed_payment > 0){
								if(typed_payment >= SignatureAmount){
									setTimeout(function(){
										PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
										.done(function(){})
									},1000);
								}
							}else{
								setTimeout(function(){
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){})
								},1000);
							}
						}else{
						
						}	
					}else{
						DisableNumpadEasyButtons(false);
					}
					setTimeout(function(){
						$("#ccprocess").focus();
					},100);
					
					$("#pos_swipe_card_form").jqxWindow('close');
				})	
			}	

		}else{
			var msg = "Please swipe or type Card Number";
			NumpadAlertClose ('card_number_required', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});	
		}
	})

	$(document).on('click', '#swipecard_auth .button_cancel', function(e){
		e.preventDefault();
		$("#pos_swipe_card_form").jqxWindow('close');
	})

	$(document).on('click', '#swipecard_auth .button_proceed', function(e){
		e.preventDefault();
		if($("#credit_card_number").val() != ''){
			var typed_payment = $("#amount_payment").val();
			var amountduescreen = $("#amountdue_total").val();
			var amountdue = $("#amountdue_total").val();

			$(".btnpayment").attr({"disabled": false});

			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Processing please wait...' }); 

			var ExpMonth = $("#credit_card_number_month").val();
			var ExpYear  = $("#credit_card_number_year").val();

			if( $("#swipecard_number_field").val() == ''){
				$("#swipecard_number_field").val( $("#credit_card_number").val() );
			}

			if( $("#swipecard_number_non_track2").val() == '' ){
				var originalCardNumber = $("#swipecard_number_field").val();
				// var last4char = originalCardNumber.substr(originalCardNumber.length - 4);
				$("#swipecard_number_non_track2").val( originalCardNumber);
			}

			if( $("#swipecard_account_name").val() == '' ){
				$("#swipecard_account_name").val( $("#credit_card_name").val() );
			}

			var postdata ="PaymentUnique="+SwipeCardFormArray[0];
				postdata+="&CustomerUnique="+CustomerUnique;
				postdata+="&AmountDue="+amountdue;
				postdata+="&AmountEntered="+typed_payment;
				postdata+="&TypeName="+SwipeCardFormArray[1];
				postdata+="&TranType="+SwipeCardFormArray[3];
				postdata+="&InvokeControl="+SwipeCardFormArray[4];
				postdata+="&MerchantID="+SwipeCardFormArray[5];
				postdata+="&Integrated="+SwipeCardFormArray[2];
				postdata+="&PaymentID="+SwipeCardFormArray[14];
				postdata+="&ExpDate="+ExpMonth+ExpYear;
				postdata+="&Address="+$("#credit_card_number_street").val();
				postdata+="&Zip="+$("#credit_card_number_zipcode").val();
				postdata+="&CVV="+$("#credit_card_number_cvv").val();
				postdata+="&CardNumber="+$("#swipecard_number_field").val();
				postdata+="&CardNumberNonTrack="+$("#swipecard_number_non_track2").val();
				postdata+="&AccountName="+$("#swipecard_account_name").val();
				postdata+="&Label="+$("#credit_card_label").val();
			
			$("#pos_swipe_card_form").jqxWindow('close');

			posData.ProcessCreditCardSwipeAuth(postdata)
			.success(function(data){
				setTimeout($.unblockUI, 100); 
				if(data.AmountApproved){
					var msg = data.TextResponse+'<br/>';
					msg+= data.AmountApproved;
				}else{
					var msg= data.TextResponse;
				}
				
				NumpadPaymentAlertOk('payment_process', msg)
				.then(function(){
					WindowPopupPaymentAlert(' Payment');
				});
				
				if(data.CmdStatus !== "Error"){
					$scope.payment = 0;
					if(POSPaymentNumpad == 1){
						$("#amount_payment").maskMoney('mask', '0.00');
					}
					DisableNumpadEasyButtons(false);
					load_data2(data);
					SignatureData = data;
					DisplayAllPayments();
					if(amountdue < 0){
						typed_payment = typed_payment * -1;
						amountdue = amountdue * -1;
					}
					
				}else{
					DisableNumpadEasyButtons(false);
				}
				setTimeout(function(){
					$("#ccprocess").focus();
				},100);
				
				$("#load_card").html('');
				var postdata ="CustomerUnique="+CustomerUnique; 
				posData.CardHistory(postdata)
				.success(function(data){
					$("#load_card").append(data.html);
				})
			})	
		}else{
			var msg = "Please swipe or type Card Number";
			NumpadAlertClose ('card_number_required', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});	
		}
	})
	
	$(document).on('click', '#swipecard_form .button_cancel', function(e){
		e.preventDefault();
		$('#pos_swipe_card_form').jqxWindow('close');
		var $this = $(".btnpayment"); 
		$this.attr({"disabled": false});
	})

	$scope.ParseCardInfo5 = function(){
		var CreditCardInfo = $(".cardinfos2").val();
		$("#credit_card_number").unbind('keyup');
		ParseParserObj5();
	};

	var ParseParserObj5 = function(){
		if($("#credit_card_number").val() != ''){
			var p = new SwipeParserObj( document.getElementById('credit_card_number').value );
			if( p.hasTrack1 ){
				p.account_name;
				p.surname;
				p.firstname;
				p.account;
				p.exp_month + "/" + p.exp_year;
				var convert_card = cc_format(p.account);
				var cardtype = GetCardType(p.account);
				var encryptCard = EncryptCard(p.account);
				$("#credit_card_number").val(encryptCard);
				$("#swipecard_number_field").val(p.track2);
				$("#credit_card_number_month").val(p.exp_month);
				$("#credit_card_number_year").val(p.exp_year);
				$("#swipecard_number_non_track2").val(p.account);
				$("#swipecard_account_name").val(p.account_name);
				$("#credit_card_name").val(p.firstname +' '+p.surname);
			}else if( p.hasTrack2){
				p.account_name;
				p.surname;
				p.firstname;
				p.account;
				p.exp_month + "/" + p.exp_year;
				
				var convert_card = cc_format(p.account);
				var cardtype = GetCardType(p.account);
				var encryptCard = EncryptCard(p.account);
				$("#credit_card_number").val(encryptCard);
				$("#swipecard_number_field").val(p.account);
				$("#credit_card_number_month").val(p.exp_month);
				$("#credit_card_number_year").val(p.exp_year);
				$("#swipecard_number_non_track2").val(p.account);
				$("#swipecard_account_name").val();	
				$("#credit_card_name").val(p.firstname +' '+p.surname);
			}
		}else{
			var msg = "Please swipe or type Card Number";
			NumpadAlertClose ('card_number_required', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});	
		}
	} 

	$(document).on('keyup', '#credit_card_number', function(){
		//var encryptCard = EncryptCard($(this).val());
		//$(this).val(encryptCard);
	})

	var EncryptCard = function(card){
		var mainStr = card,
		vis = mainStr.slice(-4),
		countNum = '';

		for(var i = (mainStr.length)-4; i>0; i--){
			countNum += '*';
		}

		return countNum+vis;
	}
	
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


	$(document).on('click', '#customer_generate_account_number', function(e){
		e.preventDefault();
		var AccountNumberSetup = $("#POSCustomerAccountNoSet").val();
		var AccountNoAddUnique = Number(AccountNumberSetup) + Number(CustomerUniqueId);
		EditDetectChanges( $("#POSCustomerAccountNoSet").val(), AccountNoAddUnique );
		$("#POSCustomereditAccountNo").val(AccountNoAddUnique);
	})

	$(document).on('click', '#customer_print_barcode_labe', function(e){
		e.preventDefault();
		var msg = "Print Barcode Label is not ready yet";
		NumpadAlertClose ('customer_barcode_label_print', msg)
		.then(function(){
			WindowPopupAlert("Info");
		})
	})
	
	$(document).on('submit', '#apply_store_credit', function(e){
		e.preventDefault();
		var PaymentUnique = $("#sc_payment_unique").val();
		var AmountDue = Number.parseFloat( $("#payment_sc_amount").text() ); //Store Credit Balance
		var StoreCreditNumber = $("#payment_sc_number").text();
		var StoreCreditBalance = Number.parseFloat( $("#payment_sc_balance").text() ); //Store Credit Balance
		var TypeName = $("#sc_typename").val();
		var RefAmount = $("#amountdue_total").val();
		var CustomerUnique = $scope.customer.id;
		if(RefAmount > 0){//Redeem
			if(StoreCreditNumber){
				if(StoreCreditBalance >= AmountDue && StoreCreditBalance > 0){ 
					$.blockUI({ css: { 
						border: '2px solid #fff',
						padding: '15px', 
						backgroundColor: '#210e66', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: 1, 
						color: '#fff',
						fontSize: '20px' 
					}, message: 'Payment Processing please wait...' });
	
					var postData ="PaymentUnique=" + PaymentUnique;
						postData+="&AmountDue=" + $("#amountdue_total").val();
						postData+="&AmountEntered=" + AmountDue;
						postData+="&TypeName=" + TypeName;
						postData+="&OrderType="+ $("#OrderType").val();
						postData+="&StoreCreditNumber="+StoreCreditNumber;
						postData+="&CustomerUnique="+CustomerUnique;
						postData+="&Operation=Redeem";
					posData.StoreCreditPayment(postData)
					.success(function(data){
						var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
						var ReceiptPaymentUnique = data.ReceiptPaymentId;
						if(data.success == true){
							$scope.payment = 0;
							if(POSPaymentNumpad == 1){
								$("#amount_payment").maskMoney('mask', '0.00');
							}
							load_data2(data);
							DisableNumpadEasyButtons(false);
							DisplayAllPayments();
						}else{
							if(data.CheckBalance){
								if(data.CheckBalance.balance == true){
									$scope.BtnApplyPaymentWhen = false;
									$(".btnpayment").attr({"disabled": false});
								}else if (data.CheckBalance.balance == false){
									$scope.BtnApplyPaymentWhen = true;
								}
							}
							DisableNumpadEasyButtons(false);
							var msg = data.msg;
							NumpadAlertOk('cash_payment', msg)
							.then(function(){
								WindowPopupAlert('Payment Notification')
							});
						}
						setTimeout($.unblockUI, 100); 
					})
					$("#pos_store_credit").jqxWindow('close');
				}else{
					var msg ="Insufficient balance <br/>";
						msg+="Please use other payment option.";
					NumpadAlertOk('payment_failed', msg)
					.then(function(){
						WindowPopupAlert('Info');
						$(".btnpayment").attr({"disabled": false});
					})
				}
			}else{
				var msg ="Please enter Store Credit Number";
				NumpadAlertOk('payment_failed', msg)
				.then(function(){
					WindowPopupAlert('Info');
					$(".btnpayment").attr({"disabled": false});
				})
			}
		}else if(RefAmount < 0){ //Issued
			if(StoreCreditNumber){
				$.blockUI({ css: { 
					border: '2px solid #fff',
					padding: '15px', 
					backgroundColor: '#210e66', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					opacity: 1, 
					color: '#fff',
					fontSize: '20px' 
				}, message: 'Payment Processing please wait...' });

				var postData ="PaymentUnique=" + PaymentUnique;
					postData+="&AmountDue=" + $("#amountdue_total").val();
					postData+="&AmountEntered="+ AmountDue;
					postData+="&TypeName=" + TypeName;
					postData+="&OrderType="+ $("#OrderType").val();
					postData+="&StoreCreditNumber="+StoreCreditNumber;
					postData+="&CustomerUnique="+CustomerUnique;
					postData+="&Operation=Issued";
				posData.StoreCreditPayment(postData)
				.success(function(data){
					var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
					var ReceiptPaymentUnique = data.ReceiptPaymentId;
					if(data.success == true){
						$scope.payment = 0;
						if(POSPaymentNumpad == 1){
							$("#amount_payment").maskMoney('mask', '0.00');
						}
						load_data2(data);
						DisableNumpadEasyButtons(false);
						DisplayAllPayments();
					}else{
						if(data.CheckBalance){
							if(data.CheckBalance.balance == true){
								$scope.BtnApplyPaymentWhen = false;
								$(".btnpayment").attr({"disabled": false});
							}else if (data.CheckBalance.balance == false){
								$scope.BtnApplyPaymentWhen = true;
							}
						}
						DisableNumpadEasyButtons(false);
						var msg = data.msg;
						NumpadAlertOk('cash_payment', msg)
						.then(function(){
							WindowPopupAlert('Payment Notification')
						});
					}
					setTimeout($.unblockUI, 100); 
				})
				$("#pos_store_credit").jqxWindow('close');
			}else{
				var msg ="Please enter Store Credit Number";
				NumpadAlertOk('payment_failed', msg)
				.then(function(){
					WindowPopupAlert('Info');
					$(".btnpayment").attr({"disabled": false});
				})
			}
		}
	})

	$(document).on('click', '#sc_manual_enter_amount_payment', function(e){
		e.preventDefault();
		NumpadPriceSCPayment('sc_manual_amount')
		.then(function(){
			WindowPopupPriceSCPayment('Store Credit')
			.then(function(){
				$("#open_numpad_price").jqxNumberInput('focus');
				var input = $('#open_numpad_price input')[0];
				if('selectionStart' in input) {
					input.setSelectionRange(0, 0);
				}else{
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', 0);
					range.moveStart('character', 0);
					range.select();
				}
				setTimeout(function(){
					$("#open_numpad_price input").select();
				},100)
			})
		})
	})

	$(document).on('submit', '#sc_manual_amount', function(e){
		e.preventDefault();
		var ManualEntryPrice = $("#open_numpad_price").val();
		$("#payment_sc_amount").text( parseFloat(ManualEntryPrice).toFixed(2) );
		$("#pos_store_credit_numpad").jqxWindow('close');
	})

	$(document).on('click', '#btn_enter-amount-sc', function(e){
		e.preventDefault();

	})

	$(document).on("click", "#scbalprint", function(e){
		e.preventDefault();
		//GiftCardPrintBalance
		var postdata = "CustomerUnique="+ $("#payment_sc_number").text();
		posData.StoreCreditPrintBalance(postdata)
		.success(function(data){
			
		})
	})

	/*
	|-----------------------------------------------------------------------------|
	| Confirm Payment
	|-----------------------------------------------------------------------------|
	*/
	var confirmPaymentTypeName;
	var confirmPaymentUnique;
	$("#confirm_payment_form").on('close', function(e){
		e.preventDefault();
		$("#confirm_payment_form_container").html('');
		$(".btnpayment").attr({"disabled": false});
		DisableNumpadEasyButtons(false);
	})
	
	var populateConfirmPaymentForm = function(formid){
		var def = $.Deferred();
		setTimeout(function(){
			$("#confirm_payment_form").append('<div id="confirm_payment_form_container" style="background: #144766; color:#EEE;"></div>');
			$("#confirm_payment_form_container").html('');
			$("#confirm_payment_form_container").append(
				'<div>'+
					'<form id='+formid+'>'+
						'<div class="confirm_payment_amount_container">'+
							'<div style="width: 15%; float:left; font-size:16px; font-weight: bold; text-align:left;">Amount</div>'+
							'<div id="confirm_payment_amount"></div>'+
						'</div>'+
						'<div class="confirm_payment_button_easy_container">'+
							'<ul>'+
								'<li><button class="btn btn-default" id="confirmPaymentOne">$1</button></li>'+
								'<li><button class="btn btn-default" id="confirmPaymentFive">$5</button></li>'+
								'<li><button class="btn btn-default" id="confirmPaymentTen">$10</button></li>'+
								'<li><button class="btn btn-default" id="confirmPaymentTwenty">$20</button></li>'+
								'<li><button class="btn btn-default" id="confirmPaymentNext">Next $</button></li>'+
								'<li><button class="btn btn-default exactamount" id="confirmPaymentExactAmount">Exact Amount</button></li>'+
							'</ul>'+
						'</div>'+
						'<div class="confirm_payment_button_save_cancel_container">'+
							'<ul style="list-style-type: none;">'+
								'<li><button type="button" class="btn btn-danger" id="confirmPaymentCancel">Cancel</button></li>'+
								'<li><button type="submit" class="btn btn-primary" id="confirmPaymentSave">Save</button></li>'+
							'</ul>'+
						'</div>'+
					'</form>'+
				'</div>'
			);
			$("#confirm_payment_amount").jqxNumberInput({ width: '40%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: 2 });
			$('#confirm_payment_amount').on('change', function (event){
				var value = event.args.value;
				var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
				myNumber = value;
			});
			def.resolve();
		},100);
		return def.promise();
	}

	var ConfirmPaymentHeight = 260;
	var ConfirmPaymentWidth = 600;

	var WindowPopupConfirmPayment = function(title){
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#payment-view").width();
			var ParentHeight = $("#payment-view").height();
			var ComputeHeight = ParentHeight / 2;
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#confirm_payment_form").jqxWindow({
				width: ConfirmPaymentWidth,
				height: ConfirmPaymentHeight,
				title: title,
				isModal: true,
				theme: 'darkblue',
				draggable: false,
				resizable: false,
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 200 },

			});
			$('#confirm_payment_form').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var NumpadConfirmPayment = function(formid){
		var def = $.Deferred();
		populateConfirmPaymentForm(formid)
		.then(function(){
			def.resolve();
		});
		return def.promise();
	}

	$(document).on('click', '#confirmPaymentOne', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		var OneDollar = 1;
		$("#confirm_payment_amount").val(OneDollar);
	})

	$(document).on('click', '#confirmPaymentFive', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		var FiveDollar = 5;
		$("#confirm_payment_amount").val(FiveDollar);
	})

	$(document).on('click', '#confirmPaymentTen', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		var TenDollar = 10;
		$("#confirm_payment_amount").val(TenDollar);
	})

	$(document).on('click', '#confirmPaymentTwenty', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		var TwentyDollar = 20;
		$("#confirm_payment_amount").val(TwentyDollar);
	})

	$(document).on('click', '#confirmPaymentNext', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		var newamount;
		if(AmountDueTotal < 0){
			newamount = parseInt(AmountDueTotal).toFixed(0) * -1;
		}else{
			newamount = parseInt(AmountDueTotal).toFixed(0);
		}
		var checkdecimal = (AmountDueTotal - Math.floor(AmountDueTotal)) != 0;

		if(checkdecimal){
			$("#confirm_payment_amount").val(parseInt(newamount) + 1);
		}else{
			$("#confirm_payment_amount").val(arseInt(newamount));
		}
	})

	$(document).on('click', '#confirmPaymentExactAmount', function(e){
		e.preventDefault();
		var AmountDueTotal = $("#amountdue_total").val();
		$("#confirm_payment_amount").val(AmountDueTotal);
	})

	$(document).on('submit', '#CashPayment', function(e){
		e.preventDefault();

		$.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
		}, message: 'Payment Processing please wait...' });

		var AmountDueTotal = $("#amountdue_total").val();
		var AmountEntered = $("#confirm_payment_amount").val();

		if(AmountEntered < 0){
			AmountEntered = AmountEntered *-1;
		}
		
		var postData = "PaymentUnique=" + confirmPaymentUnique;
			postData+= "&AmountDue=" + AmountDueTotal;
			postData+= "&AmountEntered=" + AmountEntered;
			postData+= "&TypeName=" + confirmPaymentTypeName;
			postData+= "&OrderType="+ $("#OrderType").val();
		posData.TransPayment(postData)
		.success(function(data){
			var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
			var ReceiptPaymentUnique = data.ReceiptPaymentId;
			if(data.success == true){
				$scope.payment = 0;
				if(POSPaymentNumpad == 1){
					$("#amount_payment").maskMoney('mask', '0.00');
				}
				load_data2(data);
				DisableNumpadEasyButtons(false);
				DisplayAllPayments();
			}else{
				if(data.CheckBalance){
					if(data.CheckBalance.balance == true){
						$scope.BtnApplyPaymentWhen = false;
						$(".btnpayment").attr({"disabled": false});
					}else if (data.CheckBalance.balance == false){
						$scope.BtnApplyPaymentWhen = true;
					}
				}
				DisableNumpadEasyButtons(false);
				var msg = data.msg;
				NumpadAlertOk('cash_payment', msg)
				.then(function(){
					WindowPopupAlert('Payment Notification')
				});
			}
			setTimeout($.unblockUI, 100); 
		})
		$("#confirm_payment_form").jqxWindow('close');
	})

	$(document).on('click', '#confirmPaymentCancel', function(e){
		e.preventDefault();
		$("#confirm_payment_form").jqxWindow('close');
	})

	var ConfirmPaymentPostData;
	var ConfirmPaymentUnique;
	$(document).on('submit', '#CheckPayment', function(e){
		e.preventDefault();
		$.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
		}, message: 'Payment Processing please wait...' });
		var postdata = ConfirmPaymentPostData;
			postdata += "&AmountEntered="+$("#confirm_payment_amount").val();
		posData.CheckAccountProceed(postdata)
		.success(function(data){
			if(data.validate){
				var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
				var ReceiptPaymentUnique = data.ReceiptPaymentId;
				if(data.success == true) {
					$scope.payment = 0;
					if(POSPaymentNumpad == 1){
						$("#amount_payment").maskMoney('mask', '0.00');
					}
					load_data2(data);
					DisplayAllPayments();
					posData.CheckBalance()
					.success(function (newdata) {
						if(newdata.balance == true){
							$scope.BtnApplyPaymentWhen = false;
							$scope.BtnPrintWhen = true;
						}else if(newdata.balance == false){
							$scope.BtnApplyPaymentWhen = true;
							$scope.BtnPrintWhen = false;
							if($("#TableOrder").val() == 1){
								if($("#PoleDisplay").val() == 2){
									if(ConnectionPoleDisplay){
										tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
									}
								}
							}
						}  

						/*
						PrinterCheck(ConfirmPaymentUnique, "", "")
						.then(function(){
							KitchenPrintReceipt('IntegratedZero')
							.then(function(){
								
							})
						})
						*/
						ordertype2();

						if($("#TableOrder").val() == 1){
							if($("#PoleDisplay").val() == 2){
								if(ConnectionPoleDisplay){
									tableconn.send(JSON.stringify(["TableClickedAssigned", $("#LastSectionSelected").val() ]));
								}
							}
						}
					})
				} else {
					var msg = data.msg;
					NumpadAlertOk('cash_payment', msg)
					.then(function(){
						WindowPopupAlert('Payment Notification')
					});
				}
				$('#check_payment_popup').jqxWindow('close');
			}else{
				$("#danger-alert-message").text(data.msg);
				$("#danger-alert-message").alert();
				$("#danger-alert-message").fadeTo(2000, 500).slideUp(500, function(){
					$("#danger-alert-message").slideUp(500);
				});   
			}
			$("#CheckPaymentProceed").prop("disabled", false);
			$("#confirm_payment_form").jqxWindow('close');
		})
	
		setTimeout($.unblockUI, 100); 
	})

	$("#edit_credit_card").on('close', function(){
		$("#edit_credit_card_container").remove();
	})

	var EditCreditCardPopuplate = function(data){
		var def = $.Deferred();
		$("#edit_credit_card").append('<div id="edit_credit_card_container" style="background: #144766; color:#EEE;"></div>');
		$("#edit_credit_card_container").html(
			'<div style="margin: 10px;"><b>Last 4 digit:</b> <input type="text" class="form-control" id="ccflastfourdigit" maxlength="4" value="'+data.Card4+'"/></div>'+
			'<div style="margin: 10px;"><b>Address:</b> <input type="text" class="form-control" id="ccfaddress" value="'+data.StreetNumber+'"/></div>'+
			'<div style="margin: 10px;"><b>Zip:</b> <input type="text" class="form-control" id="ccfzip" value="'+data.ZipCode+'"/></div>'+
			'<div style="margin: 10px;"><b>CVV:</b> <input type="text" class="form-control" id="ccfcvv" value="'+data.CVV+'" /></div>'+
			'<div style="margin: 10px; display:none;"><b>EXP:</b> <input type="text" class="form-control" id="ccfexp" value="'+data.EXP+'"/></div>'+
			'<div style="margin: 10px;"><b>Label:</b> <input type="text" class="form-control" id="label" value="'+data.Label+'"/></div>'+
			'<div syle="width: 100%; float:left;" align="right">'+
				'<button class="btn btn-primary btn-lg" id="edit_credit_card_save">Save</button>&nbsp;'+
				'<button class="btn btn-warning btn-lg" id="edit_credit_card_cancel">Cancel</button>'+
			'</div>'
		);
		setTimeout(function(){
			def.resolve();
		},100);
		return def.promise();
	}

	var WindowpopupEditCreditCard = function(){
		$("#edit_credit_card").jqxWindow({
			height: 450,
			width: 380,
			isModal: true,
			theme: 'darkblue',
			title: 'Edit Card',
			showCloseButton: true,
			resizable: false,
			showAnimationDuration: 0,
			closeAnimationDuration: 0
		})
		$("#edit_credit_card").jqxWindow('open');
	}

	$(document).on('click', '#select_customer .edit_card', function(e){
		e.preventDefault()
		var id = $('input[type=radio][name=group_card_history]:checked').attr('id');
		var postdata = "CardOnFileUnique="+id;
		posData.GetCardFileInfo(postdata)
		.success(function(data){
			EditCreditCardPopuplate(data)
			.then(function(){
				WindowpopupEditCreditCard();
			})
		})
	})

	$(document).on('click', '#edit_credit_card_save', function(e){
		e.preventDefault();
		var id = $('input[type=radio][name=group_card_history]:checked').attr('id');
		if(id){
			var postdata ="last4digit="+ $("#ccflastfourdigit").val();
				postdata+="&address="+$("#ccfaddress").val();
				postdata+="&zipcode="+$("#ccfzip").val();
				postdata+="&cvv="+$("#ccfcvv").val();
				postdata+="&exp="+$("#ccfexp").val();
				postdata+="&label="+$("#label").val();
				postdata+="&unique="+id;
			posData.SaveCustomerCardOnFile(postdata)
			.success(function(data){
				$("#load_card").html('');
				var postdata ="CustomerUnique="+CustomerUnique; 
				posData.CardHistory(postdata)
				.success(function(data){
					$("#load_card").append(data.html);
				})
				$("#edit_credit_card").jqxWindow('close');
			})
		}else{
			var msg = 'Please select Customer and Card Number from the option.';
			NumpadAlertClose('weigh_failed', msg)
			.then(function(){
				WindowPopupAlert('Info');
			})
		}
	})

	$(document).on('click', '#edit_credit_card_cancel', function(e){
		e.preventDefault();
		$("#edit_credit_card").jqxWindow('close');	
	})

	$(document).on('click', '#payment_process #paymentCloseButton', function(e){
		e.preventDefault();
		$("#dialog-numpad-payment-alert").jqxWindow('close');
		$("#keyboard").html('');
	})

	$(document).on('click', '#payment_process .paymentReprintButton', function(e){
		e.preventDefault();
		var info = $(".paymentReprintButton").attr("id");
		var postdata ="ReceiptPaymentUnique="+info.split("=")[0];
			postdata+="&PaymentUnique="+info.split("=")[1];
		posData.ReprintCreditCardReceipt(postdata)
		.success(function(data){
			if(data.PrinterError){
				var msg="Printer error, please check <br/>";
					msg+="1. Printer is turned on. <br/>";
					msg+="2. Check printer paper. <br/>";
					msg+="3. Restart printer.";
				NumpadAlertOkPrinterProblem('error_printing', msg)
				.then(function(){
					WindowPopupAlert('Printer problem');
				})
			}
		})
	})

	$("#dialog-numpad-payment-alert").on('close', function(){
		$("#alert-payment-msg-popup").html('');
		
	})

	$(document).on('submit', '#error_printing', function(e){
		$("#dialog-numpad-alert").jqxWindow('close');
	})

	$scope.RemovePayment = function(){
		var rowindex = $("#payment_list_grid").jqxDataTable('getSelection');

		if(rowindex.length > 0){
			RemovePaymentOption()
			.then(function(){
				WindowPopupRemovePaymentOption();
			})
		}else{
			var msg = "Please select Payment first.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
				WindowPopupAlert ('Remove Payment')	
			})
		}

	}


	$("#remove_payment_option").on('close', function(e){
		e.preventDefault();
		$("#remove_payment_option_container").remove();
	})

	var RemovePaymentOption = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#remove_payment_option").append('<div id="remove_payment_option_container" class="window-popup-content"></div>');
			$("#remove_payment_option_container").html('');
			$("#remove_payment_option_container").append(
				'<h3>Remove payment options</h3><br>'+
				'<div style="width: 100%; padding: 10px;">'+
					'<button class="btn btn-danger btn-lg" id="remove_option_void">Void</button>&nbsp;'+
					'<button class="btn btn-warning btn-lg" id="remove_option_return">Return</button>'+
				'</div>'
			);
			def.resolve();
		},100)
		return def.promise();
	}

	var WindowPopupRemovePaymentOption = function(){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() - 50);
			$("#remove_payment_option").jqxWindow({
				height: 245,
				width: 300,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				title: 'Payment remove option',
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 50 }	
			});
			$('#remove_payment_option').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	$(document).on('click', '#remove_option_void', function(e){
		e.preventDefault();
		var rowindex = $("#payment_list_grid").jqxDataTable('getSelection');
		var batchno = rowindex[0]["BatchNo"];
		var PaymentUnique 	= $scope.paymentid; //Receipt Payment table Unique 
		var trantype 		= $scope.trantype;
		var integrated 		= $scope.list_integrated;
		var postData="receiptpaymentunique="+PaymentUnique;
		var CanVoid = rowindex[0]["canvoid"];
		
		console.log(rowindex);

		if($scope.paymentid != 0){
			if(CanVoid == false){
				var msg = 'Card has been batched cannot remove';
				NumpadAlertClose ('remove_payment_batched', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				});	
				return false;
			}


			if(trantype == 'EBT'){
				var msg = trantype + " cannot be reversed.";
				NumpadAlertOk('remove_payment_alert', msg)
				.then(function(){
					WindowPopupAlert ('Remove Payment')
				})
			}else if(trantype == 'PrePaid' && integrated == 7){
				var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
				NumpadAlertYesNoPayment('remove_payment_gift_card', msg, PaymentUnique)
				.then(function(){
					WindowPopupAlertYesNo('Remove Payment')
					.then(function(){
						$("#custom_value").val(PaymentUnique);
						$(".alert_yes").focus();
					})
				})
			}else{
				var postdata="ReceiptPaymentUnique="+PaymentUnique;
				posData.CheckStatusPayment(postdata)
				.success(function(data){
					if(data.success == true){
						if(data.removable == true){
							$('#display-payments').block({message: 'Remove payment processing...'});
							if(data.Integrated == 0 || data.Integrated == 6){ //Cash  and Check Payment
								postData+="&Integrated="+data.Integrated;
								posData.VoidPayment(postData)
								.success(function(data){
								$('#display-payments').unblock();	
								if(data.success == true){
									PoleDisplayTotal(); 
									load_data2(data); 
									DisplayAllPayments();
									CheckBalance();
									$scope.BtnOnHoldWhen = false;
									$scope.BtnDiscountItemWhen = false;
								}
								})
							}else if (data.Integrated == 3){ //Only Gift Card
								var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
								NumpadAlertYesNoPayment('remove_gift_card_payment_internal', msg, PaymentUnique)
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}else if (data.Integrated == 8){
								var msg = '<span style="text-align: center;">Are you sure?</span><br/></br></br>';
								NumpadAlertYesNoPayment('remove_store_credit_payment', msg, PaymentUnique)
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}else{
								var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
								NumpadAlertYesNoPayment('remove_payment', msg, '')
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}
						}else{
							var msg = "View only mode, please edit receipt to remove payment.";
							NumpadAlertOk('remove_payment_view_mode', msg)
							.then(function(){
								WindowPopupAlert('Remove Payment');	
							}) 
						}
					}else{
						var msg = "Sorry, cannot remove selected Payment.";
						NumpadAlertOk('remove_payment_cannot_remove', msg)
						.then(function(){
							WindowPopupAlert ('Remove Payment')	
						})
					}
				})
			}
		}else{
			var msg = "Please select Payment first.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
				WindowPopupAlert ('Remove Payment')	
			})
		}

		$("#remove_payment_option").jqxWindow('close');
	})

	$(document).on('click', '#remove_option_return', function(e){
		e.preventDefault();
		var rowindex = $("#payment_list_grid").jqxDataTable('getSelection');
		if($scope.list_integrated == 0 || $scope.list_integrated == 6){
			var msg = "Cash cannot be reversed.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
				WindowPopupAlert ('Remove Payment')
			})
			return false;
		}
		var batchno = rowindex[0]["BatchNo"];
		var PaymentUnique 	= $scope.paymentid; //Receipt Payment table Unique 
		var trantype 		= $scope.trantype;
		var integrated 		= $scope.list_integrated;
		var postData="receiptpaymentunique="+PaymentUnique;
		if($scope.paymentid != 0){
			if(trantype == 'EBT'){
				var msg = trantype + " cannot be reversed.";
				NumpadAlertOk('remove_payment_alert', msg)
				.then(function(){
					WindowPopupAlert ('Remove Payment')
				})
			}else if(trantype == 'PrePaid' && integrated == 7){
				
			}else{
				var postdata="ReceiptPaymentUnique="+PaymentUnique;
				posData.CheckStatusPayment(postdata)
				.success(function(data){
					if(data.success == true){
						if(data.removable == true){
							$('#display-payments').block({message: 'Remove payment processing...'});
							if(data.Integrated == 0 || data.Integrated == 6){ //Cash  and Check Payment
								postData+="&Integrated="+data.Integrated;
								posData.ReturnByRecordNumber(postData)
								.success(function(data){
									$('#display-payments').unblock();	
									if(data.success == true){
										PoleDisplayTotal(); 
										load_data2(data); 
										DisplayAllPayments();
										CheckBalance();
									}
								})
							}else if (data.Integrated == 3){ //Only Gift Card
								
							}else if (data.Integrated == 8){
								
							}else{
								var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
								NumpadAlertYesNoPayment('remove_payment_by_record_number', msg, '')
								.then(function(){
									WindowPopupAlertYesNo('Remove Payment')
									.then(function(){
										
									})
								})
							}
						}else{
							var msg = "View only mode, please edit receipt to remove payment.";
							NumpadAlertOk('remove_payment_view_mode', msg)
							.then(function(){
								WindowPopupAlert('Remove Payment');	
							}) 
						}
					}else{
						var msg = "Sorry, cannot remove selected Payment.";
						NumpadAlertOk('remove_payment_cannot_remove', msg)
						.then(function(){
							WindowPopupAlert ('Remove Payment')	
						})
					}
				})
			}
		}else{
			var msg = "Please select Payment first.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
				WindowPopupAlert ('Remove Payment')	
			})
		}

		$("#remove_payment_option").jqxWindow('close');
	})

	$(document).on('submit', '#remove_payment_by_record_number', function(e){
		e.preventDefault();
		$("#dialog-numpad-alert").jqxWindow('close');
		var PaymentUnique = $scope.paymentid; //Receipt Payment table Unique 
		//var postData="receiptpaymentunique="+PaymentUnique;
		if($scope.paymentid != 0){
			var postdata="ReceiptPaymentUnique="+PaymentUnique;
			posData.CheckStatusPayment(postdata)
			.success(function(data){
				if(data.success == true){
					var postdata="receiptpaymentunique="+$scope.paymentid;
						postdata+="&PaymentUnique="+data.payment_unique;
						postdata+="&Integrated="+$scope.list_integrated;
					posData.VoidPayment(postdata)
					.success(function(vpdata){
						if(vpdata.success == true){  
							$('#display-payments').block({message: 'Processing please wait...'});
							var postdata="ReceiptPaymentUnique="+$scope.paymentid;
								postdata+="&NewReceiptPaymentUnique="+vpdata.receipt_payment_unique;
								postdata+="&TranType="+$scope.trantype;	
							posData.ReturnByRecordNumber(postdata)
							.success(function(datacap){
								$('#display-payments').unblock();
								var msg = datacap.CmdStatus+"<br><br>";
									msg+= datacap.TextResponse;
								NumpadAlertOk('payment_voided', msg)
								.then(function(){
									WindowPopupAlert('Voided')	
								}).done(function(){
									if(datacap.signature){
										NumpadSignature('signature_ok')
										.then(function(){
											WindowPopupSignature('Signature')
											.then(function(){
												$("#signature_receipt_payment_unique").val(vpdata.receipt_payment_unique);
												$("#signature_unique").val(vpdata.payment_unique);
												$("#signature_status").val(datacap.status);
												$("#signature").attr({"src": base_url+"assets/img/signature/"+vpdata.receipt_payment_unique+".png?"+Math.random(), "width":"290", "height":"110"});
											})
										})
									}else{
										PrinterCheck(vpdata.payment_unique, vpdata.receipt_payment_unique, datacap.status);
									}
								})
								load_data2(datacap);
								DisplayAllPayments();
								CheckBalance();
								PoleDisplayTotal();
							})
						}
					})
				}
			})
		}
	})

	$scope.POSTestPOSTestFunction = function(){
		posData.TestFunction()
		.success(function(data){
			$scope.ordereditemlist = data.ItemList;
		})
	}

	$("#customer_duplicate_message").on('close', function(e){
		e.preventDefault();
		$("#customer_duplicate_message_container").html('');
	})

	var populateMessageAlertYesNo = function(form_name, sourcedata = Array, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#customer_duplicate_message").append('<div id="customer_duplicate_message_container" style="background: #144766; color:#EEE;"></div>');
			$("#customer_duplicate_message_container").html('');
			$("#customer_duplicate_message_container").append(
			'<form id="'+form_name+'">' +	
				'<h4>Possible duplicate customer:</h4>'+
				'<br>'+
				'<div id="duplicate_info"></div>'+
				'<br>'+
				// '<h4>Do you still want to create this customer?</h4>'+
				'<h4>'+msg+'</h4>'+
				'<div class="duplicate_message_fn" style="width: 100%; position: absolute; bottom: 0; text-align: right; padding: 10px;">'+
					'<button id="customer_duplicate_save" class="btn btn-primary btn-lg">Yes</button>&nbsp;&nbsp;<button  class="btn btn-danger btn-lg" id="customer_duplicate_no">No</button>&nbsp;&nbsp;<button class="btn btn-warning btn-lg" id="customer_duplicate_cancel">Cancel</button>'+
				'</div>'+
			'</form>'
			);

			var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'Unique', type: 'int' },
                    { name: 'FirstName', type: 'string' },
                    { name: 'LastName', type: 'string' },
                    { name: 'Phone1', type: 'string' },
                    { name: 'Email', type: 'string' }
				],
				localdata: sourcedata.duplicate_data,
            };
			var dataAdapter = new $.jqx.dataAdapter(source);
			
			$("#duplicate_info").jqxGrid({
				source: dataAdapter,
				width: '100%',
				height: 150,
				columns : [
					{ text: 'First Name', datafield: 'FirstName', width: '25%' },
					{ text: 'Last Name', datafield: 'LastName', width: '25%' },
					{ text: 'Phone', datafield: 'Phone1', width: '25%' },
					{ text: 'Email', datafield: 'Email', width: '25%' }
				]
			});

			def.resolve();
		},100);
		return def.promise();
	}
	var MessageAlertYesNo = function(form, source, msg){
		var def = $.Deferred();
		populateMessageAlertYesNo(form, source, msg)
		.then(function(){
			def.resolve();
		})
		return def.promise();
	}

	var MessageWindowAlertYesNo = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#customer_duplicate_message").jqxWindow({
				height: 365,
				minWidth: 650,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#customer_duplicate_message').jqxWindow('setTitle', header_text);
			$('#customer_duplicate_message').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	/**
	 * 
	 * @param {Numpad Plugin version 2} form 
	 */
	var populateNumpadConfirmPaymentV2 = (form) => {
		var def = $.Deferred();
		var Strbutton = '';
		var KeyPadEasyArr = {
			"5"  : "5",
			"10" : "10",
			"20" : "20",
			"40" : "40",
			"50" : "50",
			"100": "100"
		}

		Object.entries(KeyPadEasyArr).forEach(([key, value]) => {
			Strbutton+='<div><button class="keypad-easy-fn-buttons glossycustom1" ng-click="keypad_easy_function_number('+key+')">'+value+'</button></div>';
		})
		
		
		var num = $scope.amountdue.Total;
		var exactamount;
		var newamount;
		var StrNextPayment = '';
		if(num < 0){
			newamount = (num * -1);
			exactamount = newamount; 
		}else{
			newamount = num;
			exactamount = newamount; 
		}

		var checkdecimal = (num - Math.floor(num)) != 0;

    	if(checkdecimal){
			newamount = parseInt(newamount) + 1;
			newamount = parseFloat(newamount).toFixed(2);
		}else{
			newamount = Math.ceil((newamount + 1)/5)*5;
			newamount = parseFloat(newamount).toFixed(2);
		}

		var nextVal1 = parseFloat(Math.ceil((newamount+1)/5)*5).toFixed(2);
		var nextVal2 = parseFloat(Math.ceil((newamount+1)/10)*10).toFixed(2);
		var nextVal3 = parseFloat(Math.ceil((newamount+1)/50)*50).toFixed(2);

		var KeyPadNextArr = {
			exactamount : exactamount, //Exact Payment
			newamount : newamount, // Next Payment
			nextVal1 : nextVal1,
			nextVal2 : nextVal2,
			nextVal3 : nextVal3,
			'empty' : 'empty'
		};

		var easyPaymentDuplicate = '';
		Object.entries(KeyPadNextArr).forEach(([key, value]) => {

			if(easyPaymentDuplicate != value)
			{
				easyPaymentDuplicate = value;

				if(key !== 'empty'){
					StrNextPayment += '<div><button class="keypad-easy-fn-buttons glossycustom1" ng-click="keypad_next_function_number('+value+')">'+value+'</button></div>';
				}else{
					StrNextPayment += '<div style="height: 80px; width: 95px;">&nbsp;</div>';
				}

			}

		})
		
		if(POSPaymentNumpad == 1){
			$("#confirm_payment_v2").append('<div id="confirm_payment_v2_container"></div>');
			$("#confirm_payment_v2_container").html('');
			$("#confirm_payment_v2_container").append($compile(
				'<div class="keypad-window-container">'+
					'<div class="keypad-left-panel">'+
						'<div class="input-container" style="float:left; width: 64%;">'+
							'<input type="text" id="confirm_payment_currency" class="confirm_payment_input" maxlength="8" />'+
						'</div>'+
						'<div style="float:left; margin: 0px 10px 0px 5px;">'+
							'<button class="glossypurple control-backspace" ng-click="keypad_function_backspace()" title="Back space"> <span class="glyphicon glyphicon-arrow-left"></span> </button>'+
						'</div>'+
						'<div class="keypad-function-container">'+
							'<div class="level-button first">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(1)">1</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(2)">2</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(3)">3</button>'+
							'</div>'+
							'<div class="level-button second">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(4)">4</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(5)">5</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(6)">6</button>'+
							'</div>'+
							'<div class="level-button third">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(7)">7</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(8)">8</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(9)">9</button>'+
							'</div>'+
							'<div class="level-button fourth">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(0)">0</button>'+
								'<button class="keypad-fn-buttons glossyyellow control-remove" ng-click="keypad_function_clearall()" title="Clear"><span class="glyphicon glyphicon-erase"></span></button>'+
								'<button class="keypad-fn-buttons glossyred control-okay" ng-click="keypad_function_cancel()" title="Back"><span class="glyphicon glyphicon-remove-circle"></span></button>'+
							'</div>'+
							'<div class="level-button fourth">'+
								'<button class="keypad-payment-buttons glossygreen control-okay" id="keypad_function_payment" ng-click="keypad_function_okay()" title="Payment"><span class="glyphicon glyphicon-ok"></span></button>'+
								
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="keypad-right-panel">'+
						'<div class="fast-keypad-fn">'+
							StrNextPayment+
						'</div>'+
						'<div class="easy-keypad-fn">'+
							Strbutton+
						'</div>'+
					'</div>'+
				'</div>'
			)($scope));

			$("#confirm_payment_currency").maskMoney({thousands:'', decimal:'.', allowZero:true})
		}else{
			$("#confirm_payment_v2").append('<div id="confirm_payment_v2_container"></div>');
			$("#confirm_payment_v2_container").html('');
			$("#confirm_payment_v2_container").append($compile(
				'<div class="keypad-window-container">'+
					'<div class="keypad-left-panel">'+
						'<div class="input-container" style="float:left; width: 64%;">'+
							'<div id="confirm_payment_currency" class="confirm_payment_input"></div>'+
						'</div>'+
						'<div style="float:left; margin: 0px 10px 0px 5px;">'+
							'<button class="glossypurple control-backspace" ng-click="keypad_function_jqx_backspace()" title="Back space"> <span class="glyphicon glyphicon-arrow-left"></span> </button>'+
						'</div>'+
						'<div class="keypad-function-container">'+
							'<div class="level-button first">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(1)">1</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(2)">2</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(3)">3</button>'+
							'</div>'+
							'<div class="level-button second">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(4)">4</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(5)">5</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(6)">6</button>'+
							'</div>'+
							'<div class="level-button third">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(7)">7</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(8)">8</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(9)">9</button>'+
							'</div>'+
							'<div class="level-button fourth">'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(0)">0</button>'+
								'<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_decimal()">.</button>'+
								'<button class="keypad-fn-buttons glossyyellow control-remove" ng-click="keypad_function_jqx_clearall()" title="Clear"><span class="glyphicon glyphicon-erase"></span></button>'+
							'</div>'+
							'<div class="level-button fourth">'+
								'<button class="keypad-fn-buttons glossyred control-okay" ng-click="keypad_function_cancel()" title="Back"><span class="glyphicon glyphicon-remove-circle"></span></button>'+
								'<button class="keypad-payment-jqx-buttons glossygreen control-okay" id="keypad_function_payment" ng-click="keypad_function_okay()" title="Payment"><span class="glyphicon glyphicon-ok"></span></button>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="keypad-right-panel">'+
						'<div class="fast-keypad-fn">'+
							StrNextPayment+
						'</div>'+
						'<div class="easy-keypad-fn">'+
							Strbutton+
						'</div>'+
					'</div>'+
				'</div>'
			)($scope));

			$("#confirm_payment_currency").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: 2 });
		}


		setTimeout(function(){
			def.resolve();
		},100)

		return def.promise();
	}

	var WindowsNumpadConfirmPaymentV2 = (header_text) => {
		var def = $.Deferred();
		setTimeout(function(){
			var ParentWidth = $("#wrapper").width();
			var ComputeWidth = (ParentWidth / 2);
			var UseWidth = (ComputeWidth);
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#confirm_payment_v2").jqxWindow({
				height: 480,
				minWidth: 580,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0,
				position: { x: OrderListWidth, y: 65 }
			});
			var payment_header_label = $(".keypad-payment-status-label").text();
			var payment_amount_val = $("#amountdue_total").val();
			var UseWindowTitle = payment_header_label+": "+ parseFloat(payment_amount_val).toFixed(2);
			$('#confirm_payment_v2').jqxWindow('setTitle', UseWindowTitle);
			$('#confirm_payment_v2').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	var NumpadConfirmPaymentV2 = (form, label) => {
		populateNumpadConfirmPaymentV2(form)
		.then(function(){
			WindowsNumpadConfirmPaymentV2(label)
			.then(function(){
				if(POSPaymentNumpad == 1){
					$("#confirm_payment_currency").focus();
				}else{
					setTimeout(function(){

						$("#confirm_payment_currency").jqxNumberInput('focus');
						var input = $('#confirm_payment_currency input')[0];
						input.setSelectionRange(0, 0);
					},100)
				}
			})
		})
	}

	$(document).on('submit', '#CashPayment_ready', function(e){
		e.preventDefault();

	})

	const keycodeArr = {
		0 : '48',
		1 : '49',
		2 : '50',
		3 : '51',
		4 : '52',
		5 : '53',
		6 : '54',
		7 : '55',
		8 : '56',
		9 : '57'
	};

	$scope.keypad_function_number = (number) => {
		$("#confirm_payment_currency").focus();
		var e = jQuery.Event("keypress", { keyCode: keycodeArr[number] });
		$("#confirm_payment_currency").trigger(e);		
	} 

	$scope.keypad_function_backspace = () => {
		$("#confirm_payment_currency").focus();
		var e = jQuery.Event("keydown", { keyCode: 8 });
		$("#confirm_payment_currency").trigger(e);		
	}

	$scope.keypad_easy_function_number = (number) => {
		if(POSPaymentNumpad == 1){
			var val = number.toString();
			$("#confirm_payment_currency").maskMoney('mask', val);
			$("#confirm_payment_currency").focus();
		}else{
			$("#confirm_payment_currency").val(number);
			$("#confirm_payment_currency").jqxNumberInput('focus');
		}
	}

	$scope.keypad_next_function_number = (number) => {
		if(POSPaymentNumpad == 1){
			var val = number.toString();
			$("#confirm_payment_currency").maskMoney('mask', val);
			$("#confirm_payment_currency").focus();
		}else{
			$("#confirm_payment_currency").val(number);
			$("#confirm_payment_currency").jqxNumberInput('focus');
		}
	}

	$scope.keypad_function_clearall = () => {
		$("#confirm_payment_currency").maskMoney('mask', '0.00');
		$("#confirm_payment_currency").focus();
	}

	$scope.keypad_function_cancel = () => {
		$("#confirm_payment_v2").jqxWindow('close');	
		DisableNumpadEasyButtons(false);
		$scope.BtnApplyPaymentWhen = false;
		$(".btnpayment").attr({"disabled": false});
	}

	$scope.keypad_function_okay = () => {
		var AmountDueTotal = $("#amountdue_total").val();
		var AmountEntered = $("#confirm_payment_currency").val();
		var curTotal = $("#ReceiptTotalView").text();

		if(AmountEntered == 0 && curTotal > 0 || curTotal < 0){
			var msg = "Please enter amount";
			NumpadAlertClose('config_payment_error', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			});
			return;
		}

		$.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
		}, message: 'Payment Processing please wait...' });

		if(AmountEntered < 0){
			AmountEntered = AmountEntered *-1;
		}
		
		var postData = "PaymentUnique=" + confirmPaymentUnique;
			postData+= "&AmountDue=" + AmountDueTotal;
			postData+= "&AmountEntered=" + AmountEntered;
			postData+= "&TypeName=" + confirmPaymentTypeName;
			postData+= "&OrderType="+ $("#OrderType").val();
		posData.TransPayment(postData)
		.success(function(data){
			var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
			var ReceiptPaymentUnique = data.ReceiptPaymentId;
			if(data.success == true){
				$scope.payment = 0;
				if(POSPaymentNumpad == 1){
					$("#amount_payment").maskMoney('mask', '0.00');
				}
				load_data2(data);
				DisableNumpadEasyButtons(false);
				DisplayAllPayments();
			}else{
				if(data.CheckBalance){
					if(data.CheckBalance.balance == true){
						$scope.BtnApplyPaymentWhen = false;
						$(".btnpayment").attr({"disabled": false});
					}else if (data.CheckBalance.balance == false){
						$scope.BtnApplyPaymentWhen = true;
					}
				}
				DisableNumpadEasyButtons(false);
				var msg = data.msg;
				NumpadAlertOk('cash_payment', msg)
				.then(function(){
					WindowPopupAlert('Payment Notification')
				});
			}
			setTimeout($.unblockUI, 100); 
		})
		$("#confirm_payment_v2").jqxWindow('close');
	}

	//Remove after new payment view design
	// setTimeout(function(){
	// 	$("#PaymentView").trigger('click');

	// 	var paymentviewLength = $("#payment-view").length
	// 	var paymentviewHeight = $("#payment_view").height();
	// 	var paymentviewWidth = $("#payment_view").width();
	// 	var paymentviewVisible = $("#payment_view").is(":visible");
	// 	console.log(paymentviewVisible);
	// },1000)

	setTimeout(function(){
		$("#amountdue_total").maskMoney({thousands:'', decimal:'.', allowZero:true})
		$("#amount_payment").maskMoney({thousands:'', decimal:'.', allowZero:true})
	},100)

	$scope.pos_payment_num = (number) => {
		$("#amount_payment").focus();
		var e = jQuery.Event("keypress", { keyCode: keycodeArr[number] });
		$("#amount_payment").trigger(e);	
	}

	$scope.pos_payment_backspace = () => {
		$("#amount_payment").focus();
		var e = jQuery.Event("keydown", { keyCode: 8 });
		$("#amount_payment").trigger(e);	
	}

	$scope.pos_payment_clear = () => {
		$("#amount_payment").maskMoney('mask', '0.00');
		$("#amount_payment").focus();
	}

	// Confirm Payment using JqxInputNumber
	$scope.keypad_function_jqx_number = (number) => {
		$("#confirm_payment_currency").jqxNumberInput('focus');
		var e = jQuery.Event("keypress", { keyCode: POSNumpadKeyCodeArr[number] });
		$("#confirm_payment_currency input").trigger(e);
	}

	$scope.keypad_function_jqx_decimal = () => {
		$("#confirm_payment_currency").jqxNumberInput('focus');
		var e = jQuery.Event("keypress", { keyCode: '110' });
		$("#confirm_payment_currency input").trigger(e);
	}

	$scope.keypad_function_jqx_backspace = () => {
		$("#confirm_payment_currency").jqxNumberInput('focus');
		var e = jQuery.Event("keypress", { keyCode: 8 });
		$("#confirm_payment_currency input").trigger(e);
	}
	
	$scope.keypad_function_jqx_clearall = () => {
		$("#confirm_payment_currency").jqxNumberInput('clear');
		setTimeout(function(){
			$("#confirm_payment_currency").jqxNumberInput('focus');
			var input = $('#confirm_payment_currency input')[0];
			input.setSelectionRange(0, 0);
		},100)
	}

	$(document).on('keypress', '#confirm_payment_currency', function(e){
		var code = e.keyCode || e.which;
		if (code === 13) {
			$("#keypad_function_payment").trigger('click');
		} 
	})

	try {
		conn.onmessage = function(e){
			$scope.$apply(function(){
				var newData = JSON.parse(e.data);
				if(newData[0] == 'Signed'){
					if(newData[2] == $scope.station_un){
						$("#signature_message_view").hide();
						$(".signature_clear").show();
						$(".signature_accept").show();
						$("#signature").attr({"src": base_url+"assets/img/signature/"+newData[1]+".png?"+Math.random(), "width":"290", "height":"110"});
					}
				}
			})
		}
	}catch(err) {
		console.log(err);
	}

	$(document).on('click', "#sign_cancel", function(){
		$("#signature_message_view").hide();
		$(".signature_clear").show();
		$(".signature_accept").show();
		$("#signature").attr({"src": base_url+"assets/img/signature/"+$scope.SignatureReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
		conn.send(JSON.stringify(["Cancel_Signature", '', $scope.station_un]));
	})
}