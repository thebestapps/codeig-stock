//-->Global Variable
var GlobalItemUnique = {};
var svc = {};
var DiscountVal = {};
var numbers;
var GlobalCustomer = {};
var SelZipcode, SelCity, SelState, SelIsland, SelCountry = "";
var dataAdapter;

angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize', 'ngPayments'])
.service('svc', function() {})
.controller("akamaiposController",['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$payments', '$filter', '$window', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $payments, $filter, $window) {
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
  
   	/*Light Plugin Create*/
	/*@Alert*/
	/*
	@param string form_name
	@param string msg
	*/
	var populateNumpadAlert = function(form_name, msg, custom){
		var def = $.Deferred();
		setTimeout(function(){
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
			$("#dialog-numpad-alert").jqxWindow({
				height: 245,
				minWidth: 350,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false
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
			$("#dialog-numpad-payment-alert").jqxWindow({
				height: 245,
				minWidth: 350,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false
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
				draggable: false
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
			  //input: $('#number_field')
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
			  //input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	
	/*Alert Setup*/
	/*
	@param string form
	@param string msg
	*/
	var NumpadAlertYesNo = function(form, msg, custom){
		var def = $.Deferred();
		populateNumpadAlert(form, msg, custom)
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
	
	/*Password*/
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
	
	var populateNumpadPrice = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-price").append('<div id="price_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#price_numpad").html('');
			if(form_name == 'TipPercent'){
				$("#price_numpad").append(''+
					'<h4 style="text-align:center;">Enter Tip Percent</h4>'+
				'');
			}else{
				$("#price_numpad").append(''+
					'<h4 style="text-align:center;">Enter Tip Dollar</h4>'+
				'');
			}
			
			$("#price_numpad").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" class="hdfield" id="number_field" maxlength="25" style="color:#000">'+
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
				//title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false
			});
			$("#dialog-numpad-price").jqxWindow('setTitle', header_title);
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
	
	$scope.ParseGiftCardInfo = function(){
		var CreditCardInfo = $(".cardinfos").val();
		ParseParserObjGiftCard();
	}
	
	var GiftCardBalance = function(card){
		var def = $.Deferred();
		var postdata="giftcard="+card;
		posData.GetGiftCardBalance(postdata)
		.success(function(data){
			if(data.success == true){
				$("#gift_card_balance").text("Balance "+data.Balance);
			}else if(data.success == false){
				var msg = "Gift Card Number is not valid";
				NumpadAlertOk('gift_card_invalid', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})
			}
			def.resolve(data.Balance);
		})
		return def.promise();
	}
	
	var ParseParserObjGiftCard = function(){
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
			giftcardvalidate(p.account,"");
			$("#gift_card_balance").text('Processing please wait...');
			GiftCardBalance(convert_card);
		}else{
			var giftcard = document.getElementById('gift_card_number').value;
			$("#gift_card_number").val(giftcard);
			$("#gift_card_balance").text('Processing please wait...');
			GiftCardBalance(giftcard);
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
				ccVerified = $("#gift_card_number").val().valid = $payments.luhnCheck(newValue.replace(/\D/g, ''));
			}
			if(ccVerified && length != upperLength) {
				ccVerified = ("#gift_card_number").val().valid = false;
			}
		}
	};
	
	$(document).on('click', '#gift_card_invalid', function(){
		$("#gift_card_balance").text("Please swipe the Gift Card.");
	})
	
	
	var populateGiftCardForm = function(form_name, Price, PaymentUnique, PaymentName){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-gift-card").append('<div class="main_gc_container" style="background: #144766; color:#EEE;"></div>');
			$(".main_gc_container").html('');
			$(".main_gc_container").append($compile(''+
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
							'<div style="float:left; width:125px; padding:5px;"><button type="button" id="gift_card_manual_enter_amount"  class="btn-enter-amount-gc">Enter Amount</button></div>'+
							'<div style="float:left; width:155px; padding-top:20px;" align="right"><span class="gift_card_amt" id="gift_card_amount">'+parseFloat(Price).toFixed(2)+'</span></div>'+
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
						'<input type="text" class="form-control cardinfos" id="gift_card_number" ng-enter="ParseGiftCardInfo()" ng-model="card.ccinfo">'+
						'<div style="float:left; width:138px; padding:5px;"><button type="button" class="btn-enter-amount-gc manual-giftcard">Manual Enter</button></div>'+
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
						'<div style="float:left; width:320px; padding-top:20px;" align="left"><span class="gift_card_bal" id="gift_card_balance">Please swipe the Gift Card.</span></div>'+
					'</div>'+
				'</div>'+
				'<input type="text" id="gift_card_field" class="hdfield" style="display:none;"/>'+
				'<div style="float:left; width: 450px;" id="functions" align="right"></div>'+
				'<input type="hidden" id="gc_payment_unique" value="'+PaymentUnique+'">'+
				'<input type="hidden" id="gc_payment_name" value="'+PaymentName+'">'+
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
				height: 565,
				width: 460,
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
	
	var GiftCardForm = function(form, Price, PaymentUnique, PaymentName){
		var def = $.Deferred();
		populateGiftCardForm(form, Price, PaymentUnique, PaymentName)
		.then(function(){
			$('#functions').hdgiftcard({
			  layout: "giftcard_function",
			  input: $("gift_card_field")
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
		
		
	var populateSignature = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-signature").append('<div id="signature_form" style="background: #144766; color:#EEE;"></div>');
			$("#signature_form").html('');
			$("#signature_form").append('<h4 style="text-align:center;">Signature</h4>');
			$("#signature_form").append(''+
			'<form id="'+form_name+'">'+
				'<div id="signature_view" align="center" style="background-color: #fff;"><img id="signature" /></div>'+
				'<div id="signature_message_view" style="display:none;"><h1>Please Sign on the device</h1></div>'+
				'<div id="keyboard"></div>'+
				'<input type="hidden" id="signature_receipt_payment_unique" />'+
				'<input type="hidden" id="signature_unique" />'+
				'<input type="hidden" id="signature_status" />'+
				'<input type="hidden" id="signature_amount" />'+
				'<input type="hidden" id="type_payment" />'+
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
				//title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false
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
			$('#keyboard').hdkeyboard({
			  layout: "signature_function"
			});
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
		$('#display-payments').unblock();
		$('body').unblock();
	});
	
	$(document).on('click', '.alert_okay', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemRemove).remove();
		$("#"+elemPopup).jqxWindow('close');
		$('#display-payments').unblock();
		$('body').unblock();
	})
	
	$(document).on('click', '.alert_no', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
		$('#display-payments').unblock();
		$('body').unblock();
	})
	
	$(document).on('click', '.alert_close', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
		$('#display-payments').unblock();
		$('body').unblock();
	})
	
	/*
	$(document).on('click', '.signature_accept', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
		$('body').unblock();
	})
	*/
	
	/*Clear content after the popup will close */
	$("#dialog-numpad-alert").on('close', function(event){
		$("#alert-msg-popup").html('');
	})
	
	$("#dialog-numpad-table").on('close', function(event){
		$("#table_order_numpad").html('');
	})
	
	$("#dialog-numpad-passcode").on('close', function(event){
		$("#passcode_numpad").html('');
	})
	
	$("#dialog-numpad-price").on('close', function(event){
		$("#price_numpad").html('');
	})
	
	$("#dialog-gift-card").on('close', function(event){
		$("#main_gc_container").html('');
	})
	
	$("#dialog-numpad-gift-price").on('close', function(event){
		$("#price_numpad_gc").html('');
	})
	
	$("#dialog-numpad-gift-card").on('close', function(event){
		$("#numpad_gc").html('');
	})
	
	$("#dialog-signature").on('close', function(event){
		$("#signature_form").html('');
	})
  
  
  /* Payment Credit Card Popup */
  $scope.dialogPaymentCard =
  {
    created: function(args)
    {
      dialogpaymentcreditcard = args.instance;
    },
    resizable: false,
    width: '100%', height: 470,
    //position: { left:  1, top: 50 },
    autoOpen: false,
    theme: 'darkblue',
    isModal: true
  };

  /* Payment Credit Card Popup Response*/
  $scope.dialogCardResponse =
  {
      created: function(args)
      {
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
    showCloseButton: false
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
    showCloseButton: false
  };
  /* End */
  

  /* Payment List */
  $scope.dialogPayments =
  {
      created: function(args)
      {
          dialogpayments = args.instance;
      },
      resizable: false,
      width: 560, height: 470,
      position: { left:  0.1, top: 50 },
      autoOpen: false,
      theme: 'darkblue',
	  keyboardCloseKey: 'none',
	  showCloseButton: false,
	  draggable: false,
	  isModal: true
  };
  /* End */

	
  var PrinterProblemDefaultMessage = function(form_name){
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
	if($scope.pressprint > 0){
		postdata+="&payments_print="+$scope.pressprint;
	}else{
		postdata+="&payments_print=null";
	}
    posData.PrinterCheck(postdata)
    .success(function(data){
	  $('body').unblock();
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
  };

  var CashDrawerCheck = function(){
	$('body').block({message: 'Checking printer connection'});  
    
	posData.CashDrawerPrinterCheck()
    .success(function(data){
      $('body').unblock();
      if(data.success == true){
        if(data.print == true){
          //do nothing;
        }else{
		  PrinterProblemDefaultMessage('cash_drawer');  
        }
        //PasscodeDialog.close();
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
  var LoadHeaderInfo = function(){
	  var def = new $.Deferred();
    posData.GetHeaderInfo()
    .success(function(data){
        $("#receiptn").text(data.receipt_number);
        $("#station").text(data.station_name);
        $("#cashin").text(data.cashin);
        $("#store_name").text(data.store_name);
        $("#user_name").text(data.user_name);
		$("#tableno").text(data.tableno);
        $scope.StatStationName = data.station_number;
        $scope.StatCashIn = data.cashin;
        $scope.TempStationName = data.station_number;
        $scope.TempCashIn = data.cashin;
		setTimeout(function(){
			$('#amount_payment').jqxNumberInput('focus'); 
		},100);
		def.resolve();
    })
	return def.promise();
  };
  /* End */

  //-->Back to main
  $scope.BackPOS = function(){
    window.location.href = base_url + 'pos/pointofsale';
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
	
  //--> On Load Ordered Item List
  var LoadOrderedItemList = function(){
	var def = new $.Deferred();  
    posData.OrderedItemList()
    .success(function(data){
      $scope.ordereditemlist = data;
	  def.resolve();
    });
	return def.promise();
  };

  //--> Totals
  var LoadTotals = function(){
	var def = new $.Deferred();
    posData.Totals()
    .success(function(data){
      $scope.totals = data;
	  def.resolve();
    });
	return def.promise();
  };

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
			$scope.EBT = data;
		}else{
			$scope.EBTShow = true;
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
    	  $('.paymentbottomlist').animate({ scrollTop: n }, 50);
		  console.log('scrolldown');
	  }, 100); 
  }
  
  //-->Payments
  var LoadPayments = function(){
	var def = new $.Deferred();  
    posData.POSPayments()
    .success(function(data){
      $scope.AllPayments = data;
    }).then(function(){
		//scrollTotalDown();
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
		  if(balance == "0.00"){
        	CompletedSale();
		  }else{
			EnableButtonsWhenItemAdded(); 
		  }
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
	  $scope.payment_list_grid = {
			source:  {
				localdata: data,
			}
		};
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
  POSTotal()
  .then(function(){
  	CheckBalance();
  })

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
        }else{
          alert(data.msg);
        }
		def.resolve();
      });
	  return def.promise();
  };

  var OpenCashDrawer = function(){
	var def = new $.Deferred();  
    posData.OpenDrawer()
    .success(function(data){
      console.log(data);
	  def.resolve();
    })
	return def.promise();
  };

  //-->Load Customer List
  var LoadCustomerList = function() {
	var def = new $.Deferred();
	
	setTimeout(function(){  
		var url = base_url +"pos/pointofsale/load-customers";
		var source =
		{
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
						NumpadAlertYesNo(formname, msg, '')
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
			$('body').block({message: 'Printing kitchen receipt please wait...'});
			PrinterCheckSetting(formname)
			.done(function(Status){
				if(Status == true){
					posData.GetCurrentReceiptHeader()
					.success(function(jsondata){
						var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
						posData.KitchenPrintReceipt(postdata)
						.success(function(data){
							
						})
					})
					def.resolve();
				}
				$('body').unblock();
			})
		}else{
			def.resolve();
		} 
		return def.promise();
	}
	
	$(document).on("submit",'#OnHoldPrinterStatus',function(e){
		var def = $.Deferred();
		$('#dialog-numpad-alert').jqxWindow('close');
		$('body').block({message: 'Searching working printer working please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OnHold()
				.done(function(){
					$('body').unblock();
				});
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit",'#PutOnHoldPrinterStatus',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$('#dialog-numpad-alert').jqxWindow('close');
		$('body').block({message: 'Printing receipt please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				PutOnHoldReceipt()
				.done(function(){
					$('body').unblock();
				});
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit",'#IntegratedZero',function(e){
		e.preventDefault();
		var def = $.Deferred();
		$('#dialog-numpad-alert').jqxWindow('close');
		$('body').block({message: 'Printing to working printer please wait...'});
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
	
	
	var OnHold = function(){
		var def = new $.Deferred();
		setTimeout(function(){
			 posData.OnHold()
			 .success(function(data){
				if(data.success == true){
					var url= base_url +"pos/pointofsale";
					window.location = url;
				}else{
					var msg="Cannot Put On Hold because Amount Due is 0. <br/>";
						msg+="Please use New Sale instead.";
					$scope.alert = {
						message: msg
					};
					Alertdialog.setTitle("On Hold");
					Alertdialog.open();
				}
				def.resolve();
			 });
		 },1000); 
		 return def.promise();
	}
	
	
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
				PoleDisplayTotal();
				LoadHeaderInfo();
				LoadTotals();
				LoadTax();
				POSTotal();
				LoadPayments();
				LoadChange();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
				def.resolve();
			})
		},1000);
		return def.promise();
	}
	
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
				PoleDisplayReset();
				LoadHeaderInfo();
				LoadTotals();
				LoadTax();
				POSTotal();
				LoadPayments();
				LoadChange();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
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
				PoleDisplayReset();
				LoadHeaderInfo();
				LoadTotals();
				LoadTax();
				POSTotal();
				LoadPayments();
				LoadChange();
				LoadEBT();
				LoadDiscount();
				CheckBalance();
				GetSelectedCustomer();
				EnableDisablePayment();
				CheckReceiptStatus();
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
	
	
	var gridPaymentsList = function(){
		$scope.payment_list_grid = {
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
				if(row.payment_name != 'Cash'){
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
									  "</div>"));
				}else{
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
			source:  {
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
				],
				localdata: {},
			},
			columns: [
				  { text: 'Unique', dataField: 'unique', hidden: true},
				  { text: 'Pay', dataField: 'payments', width: 60, align: 'center', cellsalign: 'center'},
				  { text: 'Tendered', dataField: 'amount', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Applied', dataField: 'paid', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Change', dataField: 'change', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Adjust', dataField: 'TipAmount', width: 65,align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Date', dataField: 'date', width: 100, align: 'center', cellsalign: 'center'},
				  { text: 'Status', dataField: 'status', width: 60, align: 'center', cellsalign: 'center'}
			]
		};
		
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
					if(row.trantype == null){
					  $scope.BtnPrintDisableWhen = true;	
					}else if(row.trantype == 'GC'){
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
					
					if(row.trantype == null || row.trantype == 'GC'){ // trantype from config_payments
					  $scope.BtnPrintDisableWhen = true;	
					}else{
					  $scope.BtnPrintDisableWhen = false;	
					}
				}
			})
		}
	}

 gridPaymentsList();	
 PaymentType()
 .then(function(){
	  LoadOrderedItemList();
	  LoadTax();
	  LoadEBT();
	  LoadDiscount();
	  LoadPayments()
	  .then(function(){
	 	scrollTotalDown();
	  })
	  LoadChange();
	  ReceiptTaxChecker();
	  ApplyPayement();
	  CheckReceiptStatus();
	  ConfigStation();
	  LoadTotals()
	  .then(function(){
		  PoleDisplayTotal();
	  })
 })								
									  
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
    if($scope.payment != ''){
      $scope.payment = 0;
      $scope.payment = Payment;
    }else{
      $scope.payment = Payment;
    }
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
        $scope.payment = parseInt(newamount) + 1;
    }else{
        $scope.payment = parseInt(newamount);
    }
  };
  
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

  $scope.PaymentTypes = function(unique){
		alert(unique);
  }
  
  var CheckBalanceAfterPayment = function(){
	var def = $.Deferred();
	posData.CheckBalance()
	.success(function (data) {
		 if (data.balance == false) {
			 def.resolve();
		 }
	}); 
	return def.promise();
  }

  
  $scope.PaymentType = function(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature){
    /*
	$scope.ApplyPayment = {
        PaymentTypeName: Name,
        Unique: Id,
        Integrated: Integrate
    };
	*/
	//var testvalue = $("#amount_payment").jqxNumberInput('val');
	//alert(testvalue);
	TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature);
  };
  
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
	  posData.PoleDispPayment(postdata);
	  return def.promise();	
  }

  //Henry
  var TransPayment = function(Unique, TypeName, Integrated, TranType, InvokeControl, MerchantID, EBT, Type, SignatureAmount, SecureDevice, ComPort, Signature){
	 if(Integrated == 3){
		var Price = $("#amount_payment").jqxNumberInput('val'); 
		if(Price == 0){
			Price = $("#amountdue_total").jqxNumberInput('val');
		}
	 	GiftCardForm('apply_gift_card', Price, Unique, TypeName)
		.then(function(){
			WindowPopupGiftCardForm('Gift Card')
			.then(function(){
				$("#gift_card_number").focus();
			})
		})
	 }else if(Integrated == 1){
        var typed_payment = $("#amount_payment").jqxNumberInput('val');
        var amountduescreen = $("#amountdue_total").jqxNumberInput('val');
        var amountdue = $("#amountdue_total").jqxNumberInput('val');
        var currency = $filter('currency');
        
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
	  
	}else if(Integrated == 2){
	  	var typed_payment = $("#amount_payment").jqxNumberInput('val');//$scope.payment;
	  	var amountduescreen = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
	 	var amountdue = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
      
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
	 
	 	if(process == true){
		  var ProcessArray = ['Processing Please wait...'];
		  //DisplayCreditCardProcess(TypeName+" Payment", true, ProcessArray, false);	
		  //$('body').block({message: 'Processing please wait...' + ' '});
		  $.blockUI({ message: 'Processing please wait...' }); 
		  
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
		  posData.ProcessCreditCard(postdata)
		  .success(function(data){
			 var ResponseArray = [data.TextResponse, data.AmountApproved]; 
			 var ReceiptPaymentUnique = data.ReceiptPaymentUnique;
			 $('body').unblock();
			 //DisplayCreditCardProcess(TypeName+" Payment", true, ResponseArray, true);
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
			 
			 if(data.CmdStatus !== "Error"){
				$scope.payment = 0;
				 PoleDisplayPaymentMethod(ReceiptPaymentUnique);
				 POSTotal();
				 LoadPayments();
				 LoadChange();
				 CheckReceiptStatus();
				 DisplayAllPayments();
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
				 	 
				 if(data.status == 12){
					if(Type == 2){
						if(typed_payment > 0){
							if(typed_payment > SignatureAmount){ //e.g 9.00 >= 10.00 = false then don't print the receipt.
								setTimeout(function(){
									$('body').block({message: 'Printing receipt please wait...'});
									if(data.signature){
										NumpadSignature('signature_ok')
										.then(function(){
											WindowPopupSignature('Signature')
											.then(function(){
												$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
												$("#signature_unique").val(Unique);
												$("#signature_status").val(data.status);
												$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
												$("#signature_amount").val(SignatureAmount);
												$("#type_payment").val(typed_payment);
											})
										})
									}else{
										PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
										.done(function(){
											$('body').unblock();
											CheckBalanceAfterPayment()
											.then(function(){
												KitchenPrintReceipt("IntegratedZero");
											})
										})
									}
								},1000);
							}
						}else{
							setTimeout(function(){ //e.g 11.00 >= 10.00 = true then print the receipt.
								$('body').block({message: 'Printing receipt please wait...'});
									if(data.signature){
										NumpadSignature('signature_ok')
										.then(function(){
											WindowPopupSignature('Signature')
											.then(function(){
												$("#signature_receipt_payment_unique").val(data.ReceiptPaymentUnique);
												$("#signature_unique").val(Unique);
												$("#signature_status").val(data.status);
												$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
												$("#signature_amount").val(SignatureAmount);
												$("#type_payment").val(typed_payment);
											})
										})
									}else{
										PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
										.done(function(){
											$('body').unblock();
											CheckBalanceAfterPayment()
											.then(function(){
												KitchenPrintReceipt("IntegratedZero");
											})
										})
									}
							},1000);
						}
					}else{
						setTimeout(function(){ //Cash Payment then print the receipt
							$('body').block({message: 'Printing receipt please wait...'});
							PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								$('body').unblock();
								CheckBalanceAfterPayment()
								.then(function(){
									KitchenPrintReceipt("IntegratedZero");
								})
							})
						},1000);
					}
					
				 }else if(data.status == 13){
					if(Type == 2){
						if(typed_payment > 0){
							if(typed_payment > SignatureAmount){
								setTimeout(function(){
									$('body').block({message: 'Printing receipt please wait...'});
									PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
									.done(function(){
										$('body').unblock();
									})
								},1000);
							}
						}else{
							setTimeout(function(){
								$('body').block({message: 'Printing receipt please wait...'});
								PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
								.done(function(){
									$('body').unblock();
								})
							},1000);
						}
					}else{
						setTimeout(function(){
							$('body').block({message: 'Printing receipt please wait...'});
							PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status)
							.done(function(){
								$('body').unblock();
							})
						},1000);
					}
				 }else{
					alert(JSON.stringify(data));	
				 }	
			 }
			 setTimeout(function(){
				$("#ccprocess").focus();
			 },100);
		  })
	  	}
    }else{
	  
	  if(EBT == 1){
		 var EBT_Payment_Total = 0; 
		 var Amount_Entered = 0;
		 var process = false;
		 if($scope.payment == 0){ 
		 	//Check if there is EBT Total
			posData.CalculateEBTPayment()
			.success(function(data){
				if(data.success == true){
					EBT_Payment_Total = data.ebt_total;
				}
			}).then(function(){
				if(EBT_Payment_Total >= $scope.EBT.EBTtotal){
					Amount_Entered = $scope.payment;
					process = true;
				}else{
					var remaining_ebt_total = $scope.EBT.EBTtotal - EBT_Payment_Total;
					Amount_Entered = remaining_ebt_total;
					process = true;
				}
			});		 	
		 }else{
		 	Amount_Entered = $scope.payment;
			process = true;
		 }
	  }else{
		 Amount_Entered = $scope.payment; 
		 process = true;
	  }
	  //--> Cash Payment
	  if(process){
		  var postData = "PaymentUnique=" + Unique;
		  postData += "&AmountDue=" + $scope.amountdue.Total;
		  postData += "&AmountEntered=" + Amount_Entered;
		  postData += "&TypeName=" + TypeName;
		  posData.TransPayment(postData)
		  .success(function(data) {
			  var ReceiptHeaderUnique = data.ReceiptHeaderUnique;
			  var ReceiptPaymentUnique = data.ReceiptPaymentId;
			  if(data.success == true) {
				$scope.payment = 0;
				PoleDisplayPaymentMethod(ReceiptPaymentUnique);
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
					
					$('body').block({message: 'Printing receipt please wait...'});
					
					PrinterCheck(Unique, "", "")
					.then(function(){
						//KitchenPrintReceipt('IntegratedZero');
					})
				  }
				})
			   } else {
				var msg = data.msg;
				NumpadAlertOk('cash_payment', msg)
				.then(function(){
					WindowPopupAlert('Payment Notification')
				});
			  }
		   })
	   }
    }
  }
  
  $(document).on('click', '.signature_accept', function(e){
	 e.preventDefault();
	 var Unique 						= $("#signature_unique").val();
	 var SignatureReceiptPaymentUnique 	= $("#signature_receipt_payment_unique").val();
	 var Status 						= $("#signature_status").val();
	 var SignatureAmount				= $("#signature_amount").val();
	 var TypedAmount					= $("#type_payment").val();
	 console.log(TypedAmount+" > "+SignatureAmount);
	 alert("test test test");
	 if(TypedAmount > SignatureAmount){
		 PrinterCheck(Unique, SignatureReceiptPaymentUnique, Status)
		 .done(function(){
			$('body').unblock();
			CheckBalanceAfterPayment()
			.then(function(){
				KitchenPrintReceipt("IntegratedZero");
			})
			$("#dialog-signature").jqxWindow('close');
		 })
	 }
  })
  
  $(document).on('click', '.signature_clear', function(e){
  	 e.preventDefault();
	 $("#signature_message_view").show();
	 $(".signature_clear").hide();
	 $(".signature_accept").hide();
	 $("#signature").removeAttr("src");
	 setTimeout(function(){
	 	$("#signature").attr({"src": base_url+"assets/img/hourglass.gif?"+Math.random(), "width":"48", "height":"48"});
	 },100);
	 var Unique 						= $("#signature_unique").val();
	 var SignatureReceiptPaymentUnique 	= $("#signature_receipt_payment_unique").val();
	 var Status 						= $("#signature_status").val();
	 var postdata 						= "ReceiptPaymentUnique="+SignatureReceiptPaymentUnique; 
	 posData.ClearSignature(postdata)
	 .success(function(data){
		$("#signature_message_view").hide();
		$(".signature_clear").show();
	 	$(".signature_accept").show();
		$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
	 })
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
      postData += "&AmountEntered=" + $scope.payment;
      postData += "&TypeName=" + TypeName;
      posData.TransPayment(postData)
	  .success(function (data) {
		  if(data.success == true) {
			$scope.payment = 0;
			POSTotal();
			LoadPayments();
			LoadChange();
			CheckReceiptStatus();
			DisplayAllPayments();
	
			posData.CheckBalance()
			.success(function (data) {
			  console.log(data);
			  if (data.balance == true) {
				$scope.BtnApplyPaymentWhen = false;
				$scope.BtnPrintWhen = true;
				CashDrawerCheck();
			  } else if (data.balance == false) {
				$scope.BtnApplyPaymentWhen = true;
				$scope.BtnPrintWhen = false;
				$('body').block({message: 'Printing receipt please wait....'});
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
        var typed_payment = $scope.payment;
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
      postData += "&AmountEntered=" + $scope.payment;
      postData += "&TypeName=" + TypeName;
      posData.TransPayment(postData)
        .success(function (data) {
          if (data.success == true) {
            $scope.payment = 0;
            POSTotal();
            LoadPayments();
            LoadChange();
            CheckReceiptStatus();
            DisplayAllPayments();

            posData.CheckBalance()
                .success(function (data) {
                  console.log(data);
                  if (data.balance == true) {
                    $scope.BtnApplyPaymentWhen = false;
                    $scope.BtnPrintWhen = true;
                    CashDrawerCheck();
                  } else if (data.balance == false) {
                    $scope.BtnApplyPaymentWhen = true;
                    $scope.BtnPrintWhen = false;
					$('body').block({message: 'Printing receipt please wait...'});
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
		$scope.payment_list_grid = {
			source:  {
				localdata: data,
			}
		};
      dialogpayments.setTitle("Payments");
      dialogpayments.open();
    })
  };

  $scope.PaymentsClose = function(){
    $scope.paymentid=0;
	$("#payment_list_grid").jqxDataTable('clear');
    dialogpayments.close();
  };

  posData.DisplayAllPayments()
  .success(function(data){
    $scope.allpayments = data;
  });

  //-->Set Select Item
  $scope.paymentSelected = function(ReceiptPaymentUnique, status, trantype, integrated) {
     if ($scope.lastSelected) {
      $scope.lastSelected.selected = '';
     }
     this.selected = 'selected';
     $scope.lastSelected = this;
     $scope.paymentid = ReceiptPaymentUnique;
	 $scope.trantype = trantype;
	 $scope.list_integrated = integrated;
     if(status == "V" || status == "D"){
       $scope.BtnDisableWhen = true;
       $scope.BtnPrintDisableWhen = true;
     }else{
       $scope.BtnPrintDisableWhen = false;
       $scope.BtnDisableWhen = false;
     }
  };
  
  $scope.paymentid=0;
  
  $scope.RemovePayment = function(){
		var PaymentUnique = $scope.paymentid; //Receipt Payment table Unique 
    	var postData="receiptpaymentunique="+PaymentUnique;
    	if($scope.paymentid != 0){
			var postdata="ReceiptPaymentUnique="+PaymentUnique;
		  	posData.CheckStatusPayment(postdata)
		  	.success(function(data){
				if(data.success == true){
			  		if(data.removable == true){
						$('#display-payments').block({message: 'Remove payment processing...'});
						if(data.Integrated == 0){ //Only Cash Payment
							postData+="&Integrated="+data.Integrated;
							posData.VoidPayment(postData)
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
							})
						}else if (data.Integrated == 3){ //Only Gift Card
							var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
							NumpadAlertYesNo('remove_gift_card_payment', msg, PaymentUnique)
							.then(function(){
								WindowPopupAlertYesNo('Remove Payment')
								.then(function(){
									$(".alert_yes").focus();
								})
							})
						}else{
							var msg = 'Removing Payment cannot be reversed without card present<br/></br>Are you sure?';
							NumpadAlertYesNo('remove_payment', msg, '')
							.then(function(){
								WindowPopupAlertYesNo('Remove Payment')
								.then(function(){
									$(".alert_yes").focus();
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
						  WindowPopupAlert ('Payments')	
					  })
				}
			})
		}else{
			var msg = "Please select Approve Payment.";
			NumpadAlertOk('remove_payment_alert', msg)
			.then(function(){
			  WindowPopupAlert ('Payments')	
			})
		}
  };
  
  $(document).on('submit', '#remove_gift_card_payment', function(e){
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
							$('body').unblock();
							var msg = datacap.TextResponse;
							NumpadAlertOk('payment_voided', msg)
							.then(function(){
								WindowPopupAlert('Voided')	
							}) 
							PoleDisplayTotal();
							POSTotal();
							LoadPayments();
							LoadChange();
							DisplayAllPayments();
							CheckBalance();
							PrinterCheck(vpdata.payment_unique, vpdata.receipt_payment_unique, datacap.status);
						})
					  }
					})
				}
			})
  		}
  })
  
  $scope.CancelQYN = function(){
		AlertQyesAndno('', false, '', ''); 
  }
  
  $scope.toggleModal = function(){
    posData.NewSaleQue()
    .success(function(data){
        if(data.success == true){
          $scope.QueReceiptHeaderUnique = data.ReceiptHeaderUnique;
          $scope.newsaleqshowModal = !$scope.newsaleqshowModal;
        }else if(data.success == false){
          //$scope.showModal = !$scope.showModal;
		  var postDataSaleType="saletype=1";
			posData.NewSale(postDataSaleType)
			.success(function(data){
				if(data.success == true){
				  PoleDisplayReset();
				  var url= base_url +"pos/pointofsale";
				  window.location = url;
				}
			 })
        }
    })
  };

  $scope.CancelReceipt = function(){
      var postData = "ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
      posData.CancelReceipt(postData)
      .success(function(data){
          if(data.success == true){
            var url= base_url +"pos/pointofsale";
            window.location = url;
          }else if (data.success == false){
            $scope.alert = {
                message: "Please void payments first."
            };
            Alertdialog.setTitle("Cancel Sale");
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
  
  //-->On Hold Sale;
	$scope.OnHold = function(){
		KitchenPrintReceipt('OnHoldPrinterStatus')
		.then(function(){
			 OnHold();
		}) 
	};

  $scope.ReturnDisplay = function(){
      $scope.newsaleqshowModal = false;
     //NewSaleQuedialog.close();
  };

  $scope.NoReceiptTax = function(){
    posData.OrderedItemList()
    .success(function(data){
      if(data && data !=""){
        posData.UpdateNoReceiptTax()
        .success(function(data){
          LoadOrderedItemList();
          LoadTotals();
          LoadTax();
          POSTotal();
          LoadPayments();
          LoadChange();
          $scope.ReceiptNoTaxHide = true;
          $scope.ReceiptTaxHide = false;
        })
      }else{
        alert("Add Item that you wish without holding tax.");
      }
    })
  };

  $scope.ReceiptTax = function(){
    posData.ReceiptTax()
    .success(function(data){
      if(data.success == true){
        posData.ReceiptTax()
        .success(function(data){
          if(data.success == true){
            LoadOrderedItemList();
            LoadTotals();
            LoadTax();
            POSTotal();
            LoadPayments();
            LoadChange();
            $scope.ReceiptNoTaxHide = false;
            $scope.ReceiptTaxHide = true;
          }
        })
      }else if(data.success == false){
          alert("Please add Item");
      }
    })
  };

  $scope.yes = function(){
    //-->SaleType = 1
    var postDataSaleType="saletype=1";
    posData.NewSale(postDataSaleType)
    .success(function(data){
        if(data.success == true){
		  PoleDisplayReset();
          var url= base_url +"pos/pointofsale";
          window.location = url;
        }
     })
  };

  $scope.no = function(){
    $scope.showModal = false;
  };

  var CompletedSale = function(){
    $scope.BtnReceiptNoTaxWhen = true;
    $scope.BtnReceiptTaxWhen = true;
    $scope.DropdownWhen = true;
    $scope.BtnAddCustWhen = true;
    $scope.BtnEditWhen = true;
    $scope.BtnDisableWhen = true;
	$scope.BtnApplyPaymentWhen = true;
	$scope.BtnEBTCalulateWhen = true;
	$scope.BtnTipDollarWhen = true;
	$scope.BtnTipPercentWhen = true;
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
	//$scope.BtnApplyPaymentWhen = false; //disabled 6/13/2016 by HD
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
  };

	/*
   $scope.Print = function(){
	 $('body').block({message: 'Printing receipt please wait...'});
     posData.PrinterCheck()
     .success(function(data){
      $('body').unblock();
       if(data.success == true){
         if(data.print == true){
		   if($scope.CheckPrintKitchen == 1){
		   	 KitchenPrintReceipt("CheckPrintKitchen");
		   }
         }else{
           PrinterProblemDefaultMessage('print_receipt');
         }
       }
     })
   };
   */
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
					/* do nothing */
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
   
   $scope.Print = function(){
	   $("body").block({message: 'Printing receipt please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(data){
			PrinterCheckRight(data.ReceiptHeaderUnique)
			.then(function(){
				$("body").unblock();
				if($scope.CheckPrintKitchen == 1){
					KitchenPrintReceipt("CheckPrintKitchen");
				}
			})
		})
	};		
   
   $(document).on('submit', '#CheckPrintKitchen', function(e){
		e.preventDefault();
		$("body").block({message: 'Searching working printer please wait...'});
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
                 console.log(data);
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
					 $('body').block({message: 'Printing receipt please wait...'});
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
   
   //Henry2
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
     var CreditCardInfo = $scope.card.ccinfo;
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
             alert("No data found");
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
	  
	 $scope.payment_num = function(val){
		  var num = $scope.payment;
		  if(num.length !== 7){
		  	$scope.payment = $scope.payment + '' + val;
		  }else{
			  
		  }
	 };

	$scope.CheckPrint = function(){
		posData.GetCurrentReceiptHeader()
		.success(function(data){
			PrinterRecallCheck(data.ReceiptHeaderUnique);
		})
	}
	
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
					PoleDisplayReset();
					LoadTotals();
					POSTotal();
					LoadPayments();
					LoadChange();
					CheckReceiptStatus();
					DisplayAllPayments();
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
					PoleDisplayReset();
					LoadTotals();
					POSTotal();
					LoadPayments();
					LoadChange();
					CheckReceiptStatus();
					DisplayAllPayments();
					
					var msg = data.TextResponse;
					NumpadAlertOk('adjust_tip', msg)
					.then(function(){
						WindowPopupAlert('Adjust Tip');
					})
				}
			})
		}
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
	
	$(document).on('submit', '#table_order_form', function(e){
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
	
	$scope.EBTCalculate = function(){
		posData.EBTCalculate()
		.success(function(data){
			if(data.success == true){
					
			}
		}).then(function(){
			PoleDisplayTotal();
			LoadOrderedItemList();
			LoadTotals();
		  	LoadTax();
		  	POSTotal();
		  	LoadPayments();
		  	LoadChange();
			LoadChange();
			CheckReceiptStatus();
			DisplayAllPayments();
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
	/*
	var LocationRequest = function(){
		var recall_location="recall_location=pos/pointofsale"
		posData.RecallLocationRequest(recall_location)
		.success(function(data){
			if(data.success == true)
			$window.location = base_url + "pos/pointofsale/recall-sale";
		})
	}
	*/
	
	/*
	$scope.ReCall = function(){
		posData.RecallFirstCheck()
		.success(function(firstdata){
			if(firstdata.success == true){
				posData.RecallSecondCheck()
				.success(function(seconddata){
					if(seconddata.success == true){
						KitchenPrintReceipt("RecallOnHoldPrinterStatus")
						.then(function(){
							LocationRequest();
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
	*/
	
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
	
	$(document).on('submit', '#RecallOnHoldPrinterStatus', function(e){
		e.preventDefault();
		var def = $.Deferred();
		$("body").block({message: 'Searching working printer please wait...'});
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				$("body").unblock();
				var recall_location="recall_location=pos/pointofsale/payment"
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
	
	
	$scope.TwentyPercentDiscount = function(discount){
		var DiscountAmount = discount;
		var postDataReceiptDiscount="optiondiscount="+1;
		postDataReceiptDiscount+="&discountamount="+DiscountAmount;
		posData.ReceiptDiscount(postDataReceiptDiscount)
		.success(function(data){
			if(data.success == true){
				PoleDisplayTotal();
				LoadOrderedItemList();
				LoadTotals();
				LoadTax();
				POSTotal();
				LoadPayments();
				LoadChange();
				LoadChange();
				CheckReceiptStatus();
				DisplayAllPayments();
			 }else{
				var msg = "Discount must be less than the total amount";
				NumpadAlertClose('discount_receipt_alert', msg)
				.then(function(){
					WindowPopupAlert('Receipt Discount Alert');
				})
			 }
		});
	}
	
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
		if(manual_amount > 0){
			$("#gift_card_amount").text(parseFloat(manual_amount).toFixed(2));
			$("#amount_payment").val(manual_amount);
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
			setTimeout(function(){
				$("#gift_card_number").focus();
			},100);
		}
		
		
		$("#dialog-numpad-gift-card").jqxWindow('close');
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
	
	$(document).on('click', '.goReturn', function(e){
		e.preventDefault();
		var PaymentUnique 		 = $("#gc_payment_unique").val();
		var GiftCardAmount 		 = $("#gift_card_amount").text();
		var GiftCard			 = $("#gift_card_number").val();
		var Last4				 = GiftCard.substr(GiftCard.length - 4);	
		var ReceiptPaymentUnique = '';
		var ReceiptHeaderUnique  = '';
		if(GiftCardAmount > 0){
			if(GiftCard != ''){
				
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
								
							  var postdata = "PaymentUnique=" + PaymentUnique;
								  postdata += "&AmountDue=" + $scope.amountdue.Total;
								  postdata += "&AmountEntered=" + GiftCardAmount;
								  postdata += "&TypeName=" + $("#gc_payment_name").val();
								  postdata += "&last4="+Last4;
								  posData.TransPayment(postdata)
								  .success(function(data) {
									  ReceiptHeaderUnique = data.ReceiptHeaderUnique;
									  ReceiptPaymentUnique = data.ReceiptPaymentId;
									  if(data.success == true) {
											$scope.payment = 0;
											PoleDisplayPaymentMethod(ReceiptPaymentUnique);
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
												}else if(data.balance == false) {
													$scope.BtnApplyPaymentWhen = true;
													$scope.BtnPrintWhen = false;
													$('body').block({message: 'Printing receipt please wait...'});
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
									  
									  $("#amount_payment").val(0);
									  $("#dialog-gift-card").jqxWindow('close');
								   
								   }).then(function(){
								   
										var postdata ="&Amount="+GiftCardAmount;
											postdata+="&GiftCard="+GiftCard;
											postdata+="&ReceiptPaymentUnique="+ReceiptPaymentUnique;
											postdata +="&process=1";
										posData.PaymentGiftCard(postdata)
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
						});	
					}
				})
			}else{
				var msg = "Gift Card Number is required";
				NumpadAlertOk('gift_card_number_required', msg)
				.then(function(){
					 WindowPopupAlert ('<span class="glyphicon glyphicon-exclamation-sign"></span>')	
				})
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
									PoleDisplayPaymentMethod(ReceiptPaymentUnique);
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
										}else if(data.balance == false) {
											$scope.BtnApplyPaymentWhen = true;
											$scope.BtnPrintWhen = false;
											$('body').block({message: 'Printing receipt please wait...'});
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
							  
							  $("#amount_payment").val(0);
							  $("#dialog-gift-card").jqxWindow('close');
						   
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
		$("#gift_card_number").val('');
		setTimeout(function(){
			$("#gift_card_number").focus();
		},100);
	})
	
}])

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


.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return;
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
          var val = '';
        }
        var clean = val.replace(/[^0-9\.]/g, '');
        var decimalCheck = clean.split('.');

        if(!angular.isUndefined(decimalCheck[1])) {
          decimalCheck[1] = decimalCheck[1].slice(0,2);
          clean =decimalCheck[0] + '.' + decimalCheck[1];
        }

        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
})


.directive('blurToCurrency', function($filter){
    return {
        scope: {
            amount  : '='
        },
        link: function(scope, el, attrs){
            el.val($filter('currency')(scope.amount));

            el.bind('focus', function(){
                el.val(scope.amount);
            });

            el.bind('input', function(){
                scope.amount = el.val();
                scope.$apply();
            });

            el.bind('blur', function(){
                el.val($filter('currency')(scope.amount));
            });
        }
    }
})

.directive('format', ['$filter', function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;

        ctrl.$formatters.unshift(function (a) {
          return $filter(attrs.format)(ctrl.$modelValue)
        });

        elem.bind('blur', function(event) {
          var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
          elem.val($filter(attrs.format)(plainNumber));
        });
      }
    };
  }])


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
});;










