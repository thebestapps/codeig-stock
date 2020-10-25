//-->Global Variable
var GlobalItemUnique = {};
var svc = {};
var DiscountVal = {};
var numbers;
var GlobalCustomer = {};
var SelZipcode, SelCity, SelState, SelIsland, SelCountry = "";
var dataAdapter;

//var base_url = "http://192.168.0.110:82/";
//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";

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

  /* Alert Dialog Popup*/
  $scope.dialogAlertSettings =
  {
      created: function(args)
      {
          Alertdialog = args.instance;
      },
      resizable: false,
      theme: 'darkblue',
      width: 300, height: 195,
      autoOpen: false,
      isModal: true
  };
  /* End */

  /* Alert Process Popup*/
  $scope.dialogProcessAlertSettings = {
    created: function(args){
        AlertProcessdialog = args.instance;
    },
    resizable: false,
    width: 300, height: 195,
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
      position: { left:  1, top: 50 },
      autoOpen: false,
      theme: 'darkblue',
	  keyboardCloseKey: 'none',
	  showCloseButton: false,
	  draggable: false
  };
  /* End */


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
    width: "20%", height: 120,
    autoOpen: false,
    theme: 'darkblue',
    isModal: true,
    showCloseButton: false
  };
  /* End */
  
	//HenryPrint
  var PrinterCheck = function(Unique, id, status){
    var postdata ="PaymentTypeUnique="+Unique;
        postdata+="&responseid="+id;
        postdata+="&payment_status="+status;
	if($scope.pressprint > 0){
		postdata+="&payments_print="+$scope.pressprint;
	}else{
		postdata+="&payments_print=null";
	}
    posData.PrinterCheck(postdata)
    .success(function(data){
      AlertProcessdialog.close();
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
    }).then(function(){
		$scope.pressprint = null;
	})
  };

  var CashDrawerCheck = function(){
    $scope.process = {
      message: 'Checking printer connection...'
    };
    AlertProcessdialog.setTitle("Open Cash Drawer");
    AlertProcessdialog.open();
    posData.CashDrawerPrinterCheck()
    .success(function(data){
      AlertProcessdialog.close();
      if(data.success == true){
        if(data.print == true){
          //do nothing;
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
        PasscodeDialog.close();
      }else{
        /*
        var msg="Printer is disabled in settings.";
        $scope.alert = {
          message: msg
        };
        Alertdialog.setTitle("Printer");
        Alertdialog.open();
        */
        PasscodeDialog.close();
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
			/*
            $scope.selectHandlerCashIn = function (event) {
                var args = event.args;
                if (args) {
                    var item = event.args.item;
                    $scope.StatCashIn = item.value

                    $scope.gridSettingsCashWhen = true;
                    $scope.gridSettingsCreditCardWhen = false;
                    $scope.gridSettingsOnHoldWhen = false;
                    $scope.gridSettingsWhen = false;

                    var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn;
                    postdata+="&status=4";
                    $http({
                        method: 'post',
                        url: base_url+'pos/pointofsale/recall-by-cashin',
                        data: postdata,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        $scope.gridSettingsCash = {
                            width: "100%",
                            height: 380,
                            altRows: true,
                            theme: 'darkblue',
                            showAggregates: true,
                            autoRowHeight: false,
                            source:  {
                                dataType: "json",
                                dataFields: [
                                    { name: 'Unique', type: 'int' },
                                    { name: 'DateTime', type: 'string' },
                                    { name: 'LocationName', type: 'string' },
                                    { name: 'StationName', type: 'string' },
                                    { name: 'ReceiptNumber', type: 'string' },
                                    { name: 'CustomerName', type: 'string'},
                                    { name: 'TotalSale', type: 'string'},
                                    { name: 'Paid', type: 'number'},
                                    { name: 'Status', type: 'string'},
                                    { name: 'Cashier', type: 'string'}
                                ],
                                localdata: data
                            },
                            columnsResize: true,
                            ready: function(){
                                $scope.AskQuedialogSettings = {
                                    created: function(args)
                                    {
                                        Quedialog = args.instance;
                                    },
                                    resizable: false,
                                    width: 265, height: 100,
                                    autoOpen: false,
                                    isModal: true
                                };
                            },
                            columns: [
                                { text: 'Unique', dataField: 'Unique', hidden: true},
                                { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                                { text: 'Location', dataField: 'LocationName', width: '8%' },
                                { text: 'Station No.', dataField: 'StationName', width: '10%' },
                                { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                                { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                                { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                                        var Total=parseFloat(0).toFixed(2);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    }
                                },
                                { text: 'Cash', dataField: 'Paid', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                                        var Total=parseFloat(0).toFixed(2);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    }
                                },
                                { text: 'Status', dataField: 'Status', width: '10%'},
                                { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                            ]
                        };
                    })
                }
				
            };
			*/
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
        $scope.StatStationName = data.station_number;
        $scope.StatCashIn = data.cashin;
        $scope.TempStationName = data.station_number;
        $scope.TempCashIn = data.cashin;
		def.resolve();
    })
	return def.promise();
  };
  /* End */

  //-->Back to main
  $scope.BackPOS = function(){
    window.location.href = base_url + 'pos/pointofsale';
  };

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
    	  $('#payments').animate({ scrollTop: n }, 50);
	  }, 100); 
  }
  
  //-->Payments
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
        $scope.BtnPrintWhen = true;
      }else if(data.balance == false){
        $scope.BtnApplyPaymentWhen = true;
        $scope.BtnPrintWhen = false;
      }
	  def.resolve();
    })
	return def.promise();
  };

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
			theme: 'fresh',
			altRows: true,
			rowDetails: true,
			initRowDetails: function (id, row, element, rowinfo) {
				var tabsdiv = null;
				var information = null;
				var Memo = null;
				rowinfo.detailsHeight = 185;
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
					{ name: 'Station', type: 'string'}
				],
				localdata: {},
				//sortcolumn: 'TransactionDate',
				//sortdirection: 'desc'
			},
			columns: [
				  { text: 'Unique', dataField: 'unique', hidden: true},
				  { text: 'Pay', dataField: 'payments', width: 60, align: 'center', cellsalign: 'center'},
				  { text: 'Amount', dataField: 'amount', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Paid', dataField: 'paid', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Change', dataField: 'change', width: 80, align: 'right', cellsalign: 'right', cellsFormat: 'f2'},
				  { text: 'Cashier', dataField: 'cashier', width: 65, align: 'center', cellsalign: 'center'},
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
					if(row.trantype == null){
					  $scope.BtnPrintDisableWhen = true;	
					}else{
					  $scope.BtnPrintDisableWhen = false;	
					}
				}
			})
		}
	}
	

  //##################################################################################//
  //ParseParserObj();
  gridPaymentsList();
  LoadStationCashIn()
  .then(function(){
  	LoadStationData()
	.then(function(){
		LoadHeaderInfo()
		.then(function(){
		   LoadOrderedItemList()
			.then(function(){
			  LoadTotals()
			  .then(function(){
				 LoadTax()
				 .then(function(){
				 	LoadDiscount()
					.then(function(){
					   POSTotal()
					   .then(function(){
						  LoadPayments()
						  .then(function(){
						  	LoadChange()
							.then(function(){
						      PaymentType()
							  .then(function(){
							    ApplyPayement()
								.then(function(){
								   CheckBalance()
								   .then(function(){
								      CheckReceiptStatus()
									  .then(function(){
									    ConfigStation()
										.then(function(){
										  
										})
									  }) 
								   })
								 })
							  })
							})
						  })
					   })
					})
				 })
			  })	
		    })
		 })
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

  $scope.PaymentType = function(Id, Name, Integrate, TranType, InvokeControl, MerchantID){
    /*
	$scope.ApplyPayment = {
        PaymentTypeName: Name,
        Unique: Id,
        Integrated: Integrate
    };
	*/
	//var testvalue = $("#amount_payment").jqxNumberInput('val');
	//alert(testvalue);
	TransPayment(Id, Name, Integrate, TranType, InvokeControl, MerchantID);
  };
  
  var DisplayCreditCardProcess = function(title, method, info, btndisplay){
	 $scope.creditcardprocess = {
		message: info 
	 } 
	 $scope.BtnCreditCardOkWhen = btndisplay;
  	 CreditCardProcessdialog.setTitle(title);
	 if(method){
	 	CreditCardProcessdialog.open();	
	 }else{
		CreditCardProcessdialog.close();		
	 }
  }
  //Henry
  var TransPayment = function(Unique, TypeName, Integrated, TranType, InvokeControl, MerchantID){
	 if(Integrated == 1){
        var typed_payment = $("#amount_payment").jqxNumberInput('val');//$scope.payment;
        var amountduescreen = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
        var amountdue = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
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
	  
	}else if(Integrated == 2){
	  var typed_payment = $("#amount_payment").jqxNumberInput('val');//$scope.payment;
      var amountduescreen = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
      var amountdue = $("#amountdue_total").jqxNumberInput('val');//$scope.amountdue.Total;
      
	  var process = true;
	  if(amountdue < 0){
		 //Refund Amount
		 var newAmountDue = amountdue * -1; //For computation use only
		 if(typed_payment > newAmountDue){
		 	$scope.alert = {
			  message: "Payment amount cannot exceed Refund amount. "
			};
			Alertdialog.setTitle("Refund");
			Alertdialog.open();
			process = false;
		 }else{
		 	process = true;
		 }	 
	  }else if(amountdue > 0){
		  //Standard Sale
	  	 if(typed_payment > amountdue){
		 	$scope.alert = {
			  message: "Payment amount cannot exceed Total amount. "
			};
			Alertdialog.setTitle("Payment");
			Alertdialog.open();
			process = false;
		 }else{
		 	process = true;
		 }
	  }
	 
	 if(process == true){
		  DisplayCreditCardProcess(TypeName+" Payment", true, 'Processing Please wait...', false);	
		  var postdata  = "PaymentUnique=" + Unique;
			  postdata += "&AmountDue=" + amountdue;
			  postdata += "&AmountEntered=" + typed_payment;
			  postdata += "&TypeName=" + TypeName;
			  postdata += "&TranType="+TranType;
			  postdata += "&InvokeControl="+InvokeControl;
			  postdata += "&MerchantID="+MerchantID;
		  posData.ProcessCreditCard(postdata)
		  .success(function(data){
			 DisplayCreditCardProcess(TypeName+" Payment", true, data.TextResponse, true);
			 if(data.CmdStatus !== "Error"){
				$scope.payment = 0;
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
				 $scope.process = {
				   message: 'Printing receipt...'
				 };
				 AlertProcessdialog.setTitle("Payment");
				 AlertProcessdialog.open();
				 if(data.status == 12){
					PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status);
				 }else if(data.status == 13){
					PrinterCheck(Unique, data.ReceiptPaymentUnique, data.status);
				 }else{
					alert(JSON.stringify(data));	
				 }
			 }	
		  })
	  }
    }else{
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
				$scope.process = {
				  message: 'Printing receipt...'
				};
				AlertProcessdialog.setTitle("Payment");
				AlertProcessdialog.open();
				PrinterCheck(Unique, "", "");
			  }
			})
		   } else {
			$scope.alert = {
			  message: data.msg
			};
			Alertdialog.setTitle("Payment");
			Alertdialog.open();
		  }
	 })
    }
  }
  
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
				$scope.process = {
				  message: 'Printing receipt...'
				};
				AlertProcessdialog.setTitle("Payment");
				AlertProcessdialog.open();
				PrinterCheck(Unique, "", "");
			  }
			})
		   } else {
			$scope.alert = {
			  message: data.msg
			};
			Alertdialog.setTitle("Payment");
			Alertdialog.open();
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
                    $scope.process = {
                      message: 'Printing receipt...'
                    };
                    AlertProcessdialog.setTitle("Payment");
                    AlertProcessdialog.open();
                    PrinterCheck(Unique, "", "");
                  }
                })
          } else {
            $scope.alert = {
              message: data.msg
            };
            Alertdialog.setTitle("Payment");
            Alertdialog.open();
          }
        })
    }
  };

  $scope.Payments = function(){
    posData.DisplayAllPayments()
    .success(function(data){
      //$scope.allpayments = data;
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
  
  //HenryD
  $scope.paymentid=0;
  $scope.RemovePayment = function(){
    var PaymentUnique = $scope.paymentid;
    var postData="receiptpaymentunique="+PaymentUnique;
    if($scope.paymentid != 0){
      var postdata="ReceiptPaymentUnique="+PaymentUnique;
      posData.CheckStatusPayment(postdata)
      .success(function(data){
        if(data.success == true){
          if(data.removable == true){
			if(data.payment_unique == 1){ //Only Cash Payment
				posData.VoidPayment(postData)
				.success(function(data){
				  if(data.success == true){
					POSTotal();
					LoadPayments();
					LoadChange();
					DisplayAllPayments();
					CheckBalance();
					//PrinterCheck(Unique, id, status);
				  }
				})
			}else{ //Other payments like Credit, Debit, EBT Card
				var postdata="receiptpaymentunique="+$scope.paymentid;
					postdata+="&PaymentUnique="+data.payment_unique;
					postdata+="&Integrated="+$scope.list_integrated;
				posData.VoidPayment(postData)
				.success(function(vpdata){
				  if(vpdata.success == true){
					DisplayCreditCardProcess('Void', true, 'Processing please wait...', false);
					var postdata="ReceiptPaymentUnique="+$scope.paymentid;
						postdata+="&NewReceiptPaymentUnique="+vpdata.receipt_payment_unique;
						postdata+="&TranType="+$scope.trantype;	
					posData.VoidCardPayment(postdata)
					.success(function(datacap){
						DisplayCreditCardProcess('Voided', true, datacap.TextResponse, true);
						POSTotal();
						LoadPayments();
						LoadChange();
						DisplayAllPayments();
						CheckBalance();
						PrinterCheck(vpdata.payment_unique, vpdata.receipt_payment_unique, datacap.status);	
						console.log(vpdata.payment_unique+", "+vpdata.receipt_payment_unique+", "+datacap.status);
					})
				  }
				})
			}
			//Note: not included yet Check and Gift Card payments.
			//Need to expand this code once it added those payments.
          }else{
            $scope.alert = {
              message: "View only mode, please edit receipt to remove payment."
            };
            Alertdialog.setTitle("Payments");
            Alertdialog.open();
          }
        }else{
          $scope.alert = {
            message: "Sorry, cannot remove selected Payment."
          };
          Alertdialog.setTitle("Payments");
          Alertdialog.open();
        }
      })
    }else{
      $scope.alert = {
        message: "Please select Approve Payment."
      };
      Alertdialog.setTitle("Payments");
      Alertdialog.open();
    }
  };
  
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
      var postData = "ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
      posData.PutOnHold(postData)
      .success(function(data){
          if(data.success == true){
            var url= base_url +"pos/pointofsale";
            window.location = url;
          }
      })
  };

  $scope.ReturnDisplay = function(){
      $scope.newsaleqshowModal = false;
      NewSaleQuedialog.close();
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
    posData.AddReceiptTaxChecker()
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
          var url= base_url +"pos/pointofsale";
          window.location = url;
        }
     })
  };

  $scope.no = function(){
    $scope.showModal = false;
  };


  $scope.recalldialogSettings =
  {
      created: function(args)
      {
          recalldialog = args.instance;
      },
      resizable: false,
      position: { left:  "0.5%", top: 50 },
      width: "100%", height: 900,
      autoOpen: false,
      theme: 'darkblue',
      isModal: true,
      draggable: false,
      keyboardCloseKey: 'none'
  };


    /* Recall On Hold */
    $scope.gridSettingsOnHold = {
        width: "100%",
        height: 380,
        altRows: true,
        theme: 'darkblue',
        pageable: true,
        pagerMode: 'advanced',
        showAggregates: true,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                { name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            localdata: {}
        },
        columnsResize: true,
        ready: function(){

            $scope.AskQuedialogSettings =
            {
                created: function(args)
                {
                    Quedialog = args.instance;
                },
                resizable: false,
                width: 265, height: 100,
                autoOpen: false,
                isModal: true
            };
        },
        columns: [
            { text: 'Unique', dataField: 'Unique', hidden: true},
            { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
            { text: 'Location', dataField: 'LocationName', width: '8%' },
            { text: 'Station No.', dataField: 'StationName', width: '10%' },
            { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
            { text: 'Customer', dataField: 'CustomerName', width: '12%' },
            { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Status', dataField: 'Status', width: '10%'},
            { text: 'Cashier', dataField: 'Cashier', width: '9%'}
        ]
    };


    $scope.gridSettings = {
        width: "100%",
        height: 380,
        altRows: true,
        pageable: true,
        theme: 'darkblue',
        pagerMode: 'advanced',
        showAggregates: true,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                { name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            localdata: {}
        },
        columnsResize: true,
        ready: function(){

            $scope.AskQuedialogSettings =
            {
                created: function(args)
                {
                    Quedialog = args.instance;
                },
                resizable: false,
                width: 265, height: 100,
                autoOpen: false,
                isModal: true
            };
        },
        columns: [
            { text: 'Unique', dataField: 'Unique', hidden: true},
            { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
            { text: 'Location', dataField: 'LocationName', width: '8%' },
            { text: 'Station No.', dataField: 'StationName', width: '10%' },
            { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
            { text: 'Customer', dataField: 'CustomerName', width: '12%' },
            { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Status', dataField: 'Status', width: '10%'},
            { text: 'Cashier', dataField: 'Cashier', width: '9%'}
        ]
    };

    /* Recall Cash Payments */
    $scope.gridSettingsCash = {
        width: "100%",
        height: 380,
        altRows: true,
        theme: 'darkblue',
        showAggregates: true,
        pageable: true,
        pagerMode: 'advanced',
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'number'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            localdata: {}
        },
        columnsResize: true,
        ready: function(){

            $scope.AskQuedialogSettings =
            {
                created: function(args)
                {
                    Quedialog = args.instance;
                },
                resizable: false,
                width: 265, height: 100,
                autoOpen: false,
                isModal: true
            };
        },
        columns: [
            { text: 'Unique', dataField: 'Unique', hidden: true},
            { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
            { text: 'Location', dataField: 'LocationName', width: '8%' },
            { text: 'Station No.', dataField: 'StationName', width: '10%' },
            { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
            { text: 'Customer', dataField: 'CustomerName', width: '12%' },
            { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Paid', dataField: 'Paid', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Status', dataField: 'Status', width: '10%'},
            { text: 'Cashier', dataField: 'Cashier', width: '9%'}
        ]
    };

    /* Recall Credit Card Payments */
    $scope.gridSettingsCreditCard = {
        width: "100%",
        height: 380,
        altRows: true,
        theme: 'darkblue',
        showAggregates: true,
        pageable: true,
        pagerMode: 'advanced',
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'number'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            localdata: {}
        },
        columnsResize: true,
        ready: function(){

            $scope.AskQuedialogSettings =
            {
                created: function(args)
                {
                    Quedialog = args.instance;
                },
                resizable: false,
                width: 265, height: 100,
                autoOpen: false,
                isModal: true
            };
        },
        columns: [
            { text: 'Unique', dataField: 'Unique', hidden: true},
            { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
            { text: 'Location', dataField: 'LocationName', width: '8%' },
            { text: 'Station No.', dataField: 'StationName', width: '10%' },
            { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
            { text: 'Customer', dataField: 'CustomerName', width: '12%' },
            { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Paid', dataField: 'Paid', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                aggregates: [{
                    'Total': function (aggregatedValue, currentValue, column, record) {
                        var total = currentValue;
                        var returnTotal = 0;
                        returnTotal = aggregatedValue + total;
                        return returnTotal;
                    }
                }],
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                    var Total=parseFloat(0).toFixed(2);
                    if(aggregates.Total){
                        Total = aggregates.Total;
                    }
                    renderString +=  Total + "</div>";
                    return renderString;
                }
            },
            { text: 'Status', dataField: 'Status', width: '10%'},
            { text: 'Cashier', dataField: 'Cashier', width: '9%'}
        ]
    };


    $scope.ReCall = function(){
        $scope.date = {
            from: $filter('date')(new Date(), 'MM/dd/yyyy'),
            to: $filter('date')(new Date(), 'MM/dd/yyyy')
        };

        $scope.RecallSale = {
            Selected: 5
        }

        $scope.isOnHoldBold = false;
        $scope.isCompletedBold = false;
        $scope.isCashBold = false;
        $scope.isCreditCardBold = false;

        $scope.StationselectedValue = $scope.TempStationName;
        $scope.CashInselectedValue = $scope.TempCashIn;

        $scope.gridSettingsCashWhen = false;
        $scope.gridSettingsCreditCardWhen = false;
        $scope.gridSettingsOnHoldWhen = true;
        $scope.gridSettingsWhen = false;
        $scope.CashInWhen = false;

        recalldialog.setTitle("Recall Sale");
        recalldialog.open();

        var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
        postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
        postdata+="&station="+ $scope.StatStationName;
        postdata+="&status=5";

        $http({
            method: 'post',
            data: postdata,
            //url: base_url + "pos/pointofsale/load-recall-sale/"+status,
            url: base_url + "pos/pointofsale/load-recall-onhold/data",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.gridSettingsOnHold = {
                width: "100%",
                height: 380,
                altRows: true,
                pageable: true,
                pagerMode: 'advanced',
                showAggregates: true,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'DateTime', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'string' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'TotalSale', type: 'string'},
                        { name: 'Paid', type: 'string'},
                        { name: 'Balance', type: 'string'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                },
                columnsResize: true,
                ready: function(){

                    $scope.AskQuedialogSettings =
                    {
                        created: function(args)
                        {
                            Quedialog = args.instance;
                        },
                        resizable: false,
                        width: 265, height: 100,
                        autoOpen: false,
                        isModal: true
                    };
                },
                columns: [
                    { text: 'Unique', dataField: 'Unique', hidden: true},
                    { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                    { text: 'Location', dataField: 'LocationName', width: '8%' },
                    { text: 'Station No.', dataField: 'StationName', width: '10%' },
                    { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                    { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                    { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Status', dataField: 'Status', width: '10%'},
                    { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                ]
            }
        })
    };

    $scope.RecallCashType = function(type){
        recalldialog.setTitle("Recall Sale | "+"<span class='alert-info'>Cash</span>");
        $scope.gridSettingsCashWhen = true;
        $scope.gridSettingsCreditCardWhen = false;
        $scope.gridSettingsOnHoldWhen = false;
        $scope.gridSettingsWhen = false;
        $scope.CashInWhen = true;

        $scope.RecallSale = {
            Selected: 1
        }

        $scope.isOnHoldBold = false;
        $scope.isCompletedBold = false;
        $scope.isCashBold = true;
        $scope.isCreditCardBold = false;

        var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
        postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
        postdata+="&type="+ type;
        postdata+="&station="+$scope.StatStationName;
        postdata+="&cashin="+ $scope.StatCashIn
        postdata+="&status=4";
        $http({
            method: 'post',
            url: base_url+'pos/pointofsale/recall-by-type',
            data: postdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.gridSettingsCash = {
                width: "100%",
                height: 380,
                altRows: true,
                showAggregates: true,
                autoRowHeight: false,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'DateTime', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'string' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'TotalSale', type: 'string'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                },
                columnsResize: true,
                ready: function(){
                    $scope.AskQuedialogSettings = {
                        created: function(args)
                        {
                            Quedialog = args.instance;
                        },
                        resizable: false,
                        width: 265, height: 100,
                        autoOpen: false,
                        isModal: true
                    };
                },
                columns: [
                    { text: 'Unique', dataField: 'Unique', hidden: true},
                    { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                    { text: 'Location', dataField: 'LocationName', width: '8%' },
                    { text: 'Station No.', dataField: 'StationName', width: '10%' },
                    { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                    { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                    { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Cash', dataField: 'Paid', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    //{ text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2' },
                    { text: 'Status', dataField: 'Status', width: '10%'},
                    { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                ]
            };
        })
    }


    $scope.RecallCCType = function(type){
        recalldialog.setTitle("Recall Sale | "+"<span class='alert-warning'>Credit Card</span>");
        $scope.gridSettingsCashWhen = false;
        $scope.gridSettingsCreditCardWhen = true;
        $scope.gridSettingsOnHoldWhen = false;
        $scope.gridSettingsWhen = false;
        $scope.CashInWhen = true;

        $scope.RecallSale = {
            Selected: 2
        }

        $scope.isOnHoldBold = false;
        $scope.isCompletedBold = false;
        $scope.isCashBold = false;
        $scope.isCreditCardBold = true;

        var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
        postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
        postdata+="&type="+ type;
        postdata+="&station="+$scope.StatStationName;
        postdata+="&cashin="+ $scope.StatCashIn
        postdata+="&status=4";
        $http({
            method: 'post',
            url: base_url+'pos/pointofsale/recall-by-type',
            data: postdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.gridSettingsCreditCard = {
                width: "100%",
                height: 380,
                altRows: true,
                showAggregates: true,
                autoRowHeight: false,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'DateTime', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'string' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'TotalSale', type: 'string'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                },
                columnsResize: true,
                ready: function(){
                    $scope.AskQuedialogSettings = {
                        created: function(args)
                        {
                            Quedialog = args.instance;
                        },
                        resizable: false,
                        width: 265, height: 100,
                        autoOpen: false,
                        isModal: true
                    };
                },
                columns: [
                    { text: 'Unique', dataField: 'Unique', hidden: true},
                    { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                    { text: 'Location', dataField: 'LocationName', width: '8%' },
                    { text: 'Station No.', dataField: 'StationName', width: '10%' },
                    { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                    { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                    { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Cash', dataField: 'Paid', width: '12%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Status', dataField: 'Status', width: '10%'},
                    { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                ]
            };
        })
    }



    $scope.RecallOpen = function(){
        var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = row.Unique;
                }
            })
            .then(function(){
                //-->reload Ordered Item List
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
                LoadHeaderInfo();
                LoadTotals();
                LoadTax();
                POSTotal();
                LoadPayments();
                LoadChange();
                CheckBalance();
                //ReceiptTaxChecker();
                GetSelectedCustomer();
                EnableDisablePayment();
                $scope.comboboxSettings.apply("selectItem", 0);
            })
    };

    /*
    $scope.RecallOpen = function(){
        var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
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
                    LoadHeaderInfo();
                    LoadTotals();
                    LoadTax();
                    LoadDiscount();
                    LoadPayments();
                    LoadChange();
                    ReceiptTaxChecker();
                    GetSelectedCustomer();
                    EnableDisablePayment();
                    CheckReceiptStatus();
                    $scope.comboboxSettings.apply("selectItem", 0);
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = $scope.rowReceiptHeader.Unique;
                }
            })
    };*/

    $scope.RecallExit = function(){
        $scope.StationselectedValue = $scope.TempStationName;
        $scope.CashInselectedValue = $scope.TempCashIn;
        recalldialog.close();
    };

    $scope.Refresh = function(){
        recalldialog.setTitle("Recall Sale | "+"<span class='alert-danger'>On Hold</span>");
        $scope.gridSettingsCashWhen = false;
        $scope.gridSettingsCreditCardWhen = false;
        $scope.gridSettingsOnHoldWhen = true;
        $scope.gridSettingsWhen = false;
        $scope.CashInWhen = false;

        $scope.RecallSale = {
            Selected: 5
        }

        $scope.isOnHoldBold = true;
        $scope.isCompletedBold = false;
        $scope.isCashBold = false;
        $scope.isCreditCardBold = false;

        $scope.gridSettingsOnHold = {
            width: "100%",
            height: 380,
            altRows: true,
            pageable: true,
            pagerMode: 'advanced',
            showAggregates: true,
            source:  {
                dataType: "json",
                dataFields: [
                    { name: 'Unique', type: 'int' },
                    { name: 'DateTime', type: 'string' },
                    { name: 'LocationName', type: 'string' },
                    { name: 'StationName', type: 'string' },
                    { name: 'ReceiptNumber', type: 'string' },
                    { name: 'CustomerName', type: 'string'},
                    { name: 'TotalSale', type: 'string'},
                    { name: 'Paid', type: 'string'},
                    { name: 'Balance', type: 'string'},
                    { name: 'Status', type: 'string'},
                    { name: 'Cashier', type: 'string'}
                ],
                url: base_url + "pos/pointofsale/load-recall-sale/5"
            },
            columnsResize: true,
            ready: function(){

                $scope.AskQuedialogSettings =
                {
                    created: function(args)
                    {
                        Quedialog = args.instance;
                    },
                    resizable: false,
                    width: 265, height: 100,
                    autoOpen: false,
                    isModal: true
                };
            },
            columns: [
                { text: 'Unique', dataField: 'Unique', hidden: true},
                { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                { text: 'Location', dataField: 'LocationName', width: '8%' },
                { text: 'Station No.', dataField: 'StationName', width: '10%' },
                { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString +=  Total + "</div>";
                        return renderString;
                    }
                },
                { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString +=  Total + "</div>";
                        return renderString;
                    }
                },
                { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString +=  Total + "</div>";
                        return renderString;
                    }
                },
                { text: 'Status', dataField: 'Status', width: '10%'},
                { text: 'Cashier', dataField: 'Cashier', width: '9%'}
            ]
        }
    };

    $scope.SelOnHold = function(status){
        recalldialog.setTitle("Recall Sale | "+"<span class='alert-danger'>On Hold</span>");
        $scope.gridSettingsCashWhen = false;
        $scope.gridSettingsCreditCardWhen = false;
        $scope.gridSettingsOnHoldWhen = true;
        $scope.gridSettingsWhen = false;
        $scope.CashInWhen = false;

        $scope.RecallSale = {
            Selected: 5
        }

        $scope.isOnHoldBold = true;
        $scope.isCompletedBold = false;
        $scope.isCashBold = false;
        $scope.isCreditCardBold = false;

        var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
        postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
        postdata+="&station="+ $scope.StatStationName;
        postdata+="&status="+ status;

        $http({
            method: 'post',
            data: postdata,
            //url: base_url + "pos/pointofsale/load-recall-sale/"+status,
            url: base_url + "pos/pointofsale/load-recall-onhold/data",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.gridSettingsOnHold = {
                width: "100%",
                height: 380,
                altRows: true,
                pageable: true,
                pagerMode: 'advanced',
                showAggregates: true,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'DateTime', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'string' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'TotalSale', type: 'string'},
                        { name: 'Paid', type: 'string'},
                        { name: 'Balance', type: 'string'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                },
                columnsResize: true,
                ready: function(){
                    $scope.AskQuedialogSettings =
                    {
                        created: function(args)
                        {
                            Quedialog = args.instance;
                        },
                        resizable: false,
                        width: 265, height: 100,
                        autoOpen: false,
                        isModal: true
                    };
                },
                columns: [
                    { text: 'Unique', dataField: 'Unique', hidden: true},
                    { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                    { text: 'Location', dataField: 'LocationName', width: '8%' },
                    { text: 'Station No.', dataField: 'StationName', width: '10%' },
                    { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                    { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                    { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Status', dataField: 'Status', width: '10%'},
                    { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                ]
            }
        })
    };

    $scope.SelCompleted = function(status){
        recalldialog.setTitle("Recall Sale | "+"<span class='alert-success'>Completed</span>");
        $scope.gridSettingsCashWhen = false;
        $scope.gridSettingsCreditCardWhen = false;
        $scope.gridSettingsOnHoldWhen = false;
        $scope.gridSettingsWhen = true;
        $scope.CashInWhen = true;

        $scope.RecallSale = {
            Selected: 4
        }

        $scope.isOnHoldBold = false;
        $scope.isCompletedBold = true;
        $scope.isCashBold = false;
        $scope.isCreditCardBold = false;

        var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
        postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
        postdata+="&station="+$scope.StatStationName;
        postdata+="&status="+status;

        $http({
            method: 'post',
            data: postdata,
            //url: base_url + "pos/pointofsale/load-recall-sale/"+status,
            url: base_url + "pos/pointofsale/load-recall-completed/data",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.gridSettings = {
                width: "100%",
                height: 380,
                altRows: true,
                pageable: true,
                pagerMode: 'advanced',
                showAggregates: true,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'DateTime', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'string' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'TotalSale', type: 'string'},
                        { name: 'Paid', type: 'string'},
                        { name: 'Balance', type: 'string'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                },
                columnsResize: true,
                ready: function(){

                    $scope.AskQuedialogSettings =
                    {
                        created: function(args)
                        {
                            Quedialog = args.instance;
                        },
                        resizable: false,
                        width: 265, height: 100,
                        autoOpen: false,
                        isModal: true
                    };
                },
                columns: [
                    { text: 'Unique', dataField: 'Unique', hidden: true},
                    { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
                    { text: 'Location', dataField: 'LocationName', width: '8%' },
                    { text: 'Station No.', dataField: 'StationName', width: '10%' },
                    { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
                    { text: 'Customer', dataField: 'CustomerName', width: '12%' },
                    { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        }
                    },
                    { text: 'Status', dataField: 'Status', width: '10%'},
                    { text: 'Cashier', dataField: 'Cashier', width: '9%'}
                ]
            }
        })
    };

    $scope.rowDoubleClick = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        var postData="receiptunique="+row.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = row.Unique;
                }
            })
            .then(function(){
                //-->reload Ordered Item List
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
                LoadHeaderInfo();
                LoadTotals();
                LoadTax();
                POSTotal();
                LoadPayments();
                LoadChange();
                CheckBalance();
                //ReceiptTaxChecker();
                GetSelectedCustomer();
                EnableDisablePayment();
                //$scope.comboboxSettings.apply("selectItem", 0);
            })
    };

    $scope.rowClick = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $scope.rowReceiptHeader = {
            Unique: row.Unique
        }
    };

    $scope.rowDoubleClickOnHold = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        var postData="receiptunique="+row.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = row.Unique;
                }
            })
            .then(function(){
                //-->reload Ordered Item List
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
                LoadHeaderInfo();
                LoadTotals();
                LoadTax();
                POSTotal();
                LoadPayments();
                LoadChange();
                CheckBalance();
                //ReceiptTaxChecker();
                GetSelectedCustomer();
                EnableDisablePayment();
                //$scope.comboboxSettings.apply("selectItem", 0);
            })
    }

    $scope.rowClickOnHold = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $scope.rowReceiptHeader = {
            Unique: row.Unique
        }
    }

    $scope.rowDoubleClickCash = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        var postData="receiptunique="+row.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = row.Unique;
                }
            })
            .then(function(){
                //-->reload Ordered Item List
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
                LoadHeaderInfo();
                LoadTotals();
                LoadTax();
                POSTotal();
                LoadPayments();
                LoadChange();
                CheckBalance();
                //ReceiptTaxChecker();
                GetSelectedCustomer();
                EnableDisablePayment();
                //$scope.comboboxSettings.apply("selectItem", 0);
            })
    }

    $scope.rowClickCash = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $scope.rowReceiptHeader = {
            Unique: row.Unique
        }
    }

    $scope.rowDoubleClickCreditCard = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        var postData="receiptunique="+row.Unique;
        posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
                    recalldialog.close();
                }else{
                    Quedialog.setTitle("Receipt No. "+data.receiptno);
                    Quedialog.open();
                    $scope.RecallCompletedReceiptUnique = row.Unique;
                }
            })
            .then(function(){
                //-->reload Ordered Item List
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
                LoadHeaderInfo();
                LoadTotals();
                LoadTax();
                POSTotal();
                LoadPayments();
                LoadChange();
                CheckBalance();
                //ReceiptTaxChecker();
                GetSelectedCustomer();
                EnableDisablePayment();
                //$scope.comboboxSettings.apply("selectItem", 0);
            })
    }

    $scope.rowClickCreditCard = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $scope.rowReceiptHeader = {
            Unique: row.Unique
        }
    }

    $scope.RecallSearch = function(){
        var RecallSaleSelected = $scope.RecallSale.Selected;
        if(RecallSaleSelected == 1){
            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+RecallSaleSelected;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn
            postdata+="&status=4";
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.gridSettingsCash = {
                    source: {
                        localdata: data
                    }
                }
            })
        }else if(RecallSaleSelected == 2){
            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+RecallSaleSelected;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn
            postdata+="&status=4";
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.gridSettingsCreditCard = {
                    source: {
                        localdata: data
                    }
                }
            })
        }else if(RecallSaleSelected == 4){
            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&station="+$scope.StatStationName;
            postdata+="&status="+RecallSaleSelected;
            $http({
                method: 'post',
                data: postdata,
                url: base_url + "pos/pointofsale/load-recall-completed/data",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.gridSettings = {
                    source: {
                        localdata: data
                    }
                }
            })
        }
    }


  /*
  $scope.gridSettings =
  {
      width: "100%",
      height: 350,
      pageable: true,
      pagerButtonsCount: 10,
      source:  {
          dataType: "json",
          dataFields: [
              { name: 'Unique', type: 'int' },
              { name: 'DateTime', type: 'string' },
              { name: 'LocationName', type: 'string' },
              { name: 'StationName', type: 'string' },
              { name: 'ReceiptNumber', type: 'string' },
              { name: 'CustomerName', type: 'string'},
              { name: 'TotalSale', type: 'string'},
              { name: 'Paid', type: 'string'},
              {	name: 'Balance', type: 'string'},
              { name: 'Status', type: 'string'},
              { name: 'Cashier', type: 'string'}
          ],
          id: 'id',
          url: ""//"http://192.168.0.110:82/pos/pointofsale/load-recall-sale"
      },
      columnsResize: true,
        ready: function(){

            $scope.AskQuedialogSettings =
            {
                created: function(args)
                {
                    Quedialog = args.instance;
                },
                resizable: false,
                width: 265, height: 100,
                autoOpen: false,
                isModal: true
            };
      },
      columns: [
          { text: 'Unique', dataField: 'Unique', hidden: true},
          { text: 'Date/Time', dataField: 'DateTime', width: '20%' },
          { text: 'Location', dataField: 'LocationName', width: '8%' },
          { text: 'Station No.', dataField: 'StationName', width: '10%' },
          { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
          { text: 'Customer', dataField: 'CustomerName', width: '12%' },
          { text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right' },
          { text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right' },
          { text: 'Balance', dataField: 'Balance', width: '8%', cellsalign: 'right' },
          { text: 'Status', dataField: 'Status', width: '10%'},
          { text: 'Cashier', dataField: 'Cashier', width: '9%'}
      ]
  };

  $scope.ReCall = function(){
     recalldialog.setTitle("Recall Sale");
     recalldialog.open();
     $scope.gridSettings =
    {
        width: "100%",
        height: 350,
        pageable: true,
        pagerButtonsCount: 10,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                {	name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            id: 'id',
            url: base_url + "pos/pointofsale/load-recall-sale/5"
        }
      }
  };

  $scope.RecallOpen = function(){
      var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
      posData.OpenReceipt(postData)
          .success(function(data){
              if(data.success == true){
                  recalldialog.close();
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
                  LoadHeaderInfo();
                  LoadTotals();
                  LoadTax();
                  LoadDiscount();
                  LoadPayments();
                  LoadChange();
                  ReceiptTaxChecker();
                  GetSelectedCustomer();
                  EnableDisablePayment();
                  CheckReceiptStatus();
                  $scope.comboboxSettings.apply("selectItem", 0);
              }else{
                  Quedialog.setTitle("Receipt No. "+data.receiptno);
                  Quedialog.open();
                  $scope.RecallCompletedReceiptUnique = $scope.rowReceiptHeader.Unique;
              }
          })
  };

  $scope.RecallExit = function(){
      recalldialog.close();
  };

  $scope.Refresh = function(){
    $scope.gridSettings =
    {
        width: "100%",
        height: 350,
        pageable: true,
        pagerButtonsCount: 10,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                {	name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            id: 'id',
            url: base_url +"pos/pointofsale/load-recall-sale/5"
        }
      }
  };

  $scope.SelOnHold = function(status){
    $scope.gridSettings =
    {
        width: "100%",
        height: 350,
        pageable: true,
        pagerButtonsCount: 10,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                {	name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            id: 'id',
            url: base_url + "pos/pointofsale/load-recall-sale/"+status
        }
      }
  };

  $scope.SelCompleted = function(status){
    $scope.gridSettings =
    {
        width: "100%",
        height: 350,
        pageable: true,
        pagerButtonsCount: 10,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
                { name: 'CustomerName', type: 'string'},
                { name: 'TotalSale', type: 'string'},
                { name: 'Paid', type: 'string'},
                {	name: 'Balance', type: 'string'},
                { name: 'Status', type: 'string'},
                { name: 'Cashier', type: 'string'}
            ],
            id: 'id',
            url: base_url + "pos/pointofsale/load-recall-sale/"+status
        }
      }

  };

  $scope.rowDoubleClick = function(event){
      var args = event.args;
      var index = args.index;
      var row = args.row;
      var postData="receiptunique="+row.Unique;
      posData.OpenReceipt(postData)
      .success(function(data){
          if(data.success == true){
              recalldialog.close();
          }else{
            Quedialog.setTitle("Receipt No. "+data.receiptno);
            Quedialog.open();
            $scope.RecallCompletedReceiptUnique = row.Unique;
          }
      })
      .then(function(){
         //-->reload Ordered Item List
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
         LoadHeaderInfo();
         LoadTotals();
         LoadTax();
         POSTotal();
         LoadPayments();
         LoadChange();
         CheckBalance();
         ReceiptTaxChecker();
         GetSelectedCustomer();
         EnableDisablePayment();
         $scope.comboboxSettings.apply("selectItem", 0);
      })
  };

  $scope.rowClick = function(event){
    var args = event.args;
    var index = args.index;
    var row = args.row;
    $scope.rowReceiptHeader = {
      Unique: row.Unique
    }
  };

  */

  $scope.ViewReceipt = function(){
    var postdata = "ReceiptHeaderUnique="+$scope.RecallCompletedReceiptUnique;
    posData.ViewReceipt(postdata)
    .success(function(data){
      if(data.success == true){
        Quedialog.close();
        recalldialog.close();
      }
    })
    .then(function(){
        //-->reload Ordered Item List
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
        LoadHeaderInfo();
        LoadTotals();
        LoadTax();
        POSTotal();
        LoadPayments();
        LoadChange();
        CheckBalance();
        //ReceiptTaxChecker();
        GetSelectedCustomer();
        EnableDisablePayment();
        //$scope.comboboxSettings.apply("selectItem", 0);
    })//End Then
  };;
    $scope.EditReceipt = function(){
    var postData = "ReceiptHeaderUnique="+$scope.RecallCompletedReceiptUnique;
    posData.EditReceipt(postData)
    .success(function(data){
      if(data.success == true){
        Quedialog.close();
        recalldialog.close();
      }
    })
    .then(function(){
      //-->reload Ordered Item List
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
     LoadHeaderInfo();
     LoadTotals();
     LoadTax();
     POSTotal();
     LoadPayments();
     LoadChange();
     LoadDiscount();
     CheckBalance();
     //ReceiptTaxChecker();
     GetSelectedCustomer();
     EnableDisablePayment();
     CheckReceiptStatus();
     //$scope.comboboxSettings.apply("selectItem", 0);
    })
  };

  var CompletedSale = function(){
    $scope.BtnReceiptNoTaxWhen = true;
    $scope.BtnReceiptTaxWhen = true;
    $scope.DropdownWhen = true;
    $scope.BtnAddCustWhen = true;
    $scope.BtnEditWhen = true;
    $scope.BtnDisableWhen = true;
  };

  var EnableButtonsWhenItemAdded = function(){
    $scope.BtnReceiptNoTaxWhen = false;
    $scope.BtnReceiptTaxWhen = false;
    $scope.DropdownWhen = false;
    $scope.BtnAddCustWhen = false;
    $scope.BtnEditWhen = false;
  };

  var OtherButtons = function(){
    $scope.BtnReceiptNoTaxWhen = true;
    $scope.BtnReceiptTaxWhen = true;
    $scope.DropdownWhen = false;
    $scope.BtnAddCustWhen = false;
    $scope.BtnEditWhen = false;
  };

  $scope.CloseRecallQue = function(){
    Quedialog.close();
  };

  $scope.AlertCancel = function(){
      Alertdialog.close();
  };

  $scope.dialogSettings =
  {
      created: function(args)
      {
          dialog = args.instance;
      },
      resizable: false,
      width: "100%", height: 600,
      autoOpen: false,
      theme: 'darkblue'
  };

  $scope.NewCustomer = function(){
      ClearCustomerForm();
      dialog.setTitle("New Customer");
      dialog.open();
  };

  $scope.ExitNewCustomer = function(){
      dialog.close();
  };

  //-->Sources
  $scope.thetabs = 'darkblue';
  $scope.tabset = {
    selectedItem:0
  };
  $scope.placeHolderzipcode = "Select Zipcode";
  $scope.zipcode = {source: zipcodesDataAdapter, displayMember: "ZipCode", valueMember: "Unique", width: "99%", height: 25};
  $scope.zipselectHandler = function (event) {
    var zipcodeargs = event.args;
    if (zipcodeargs) {
      var postData="geocitiesid="+zipcodeargs.item.value;
      posData.FindCity(postData)
      .success(function(data){
          SelZipcode = zipcodeargs.item.value;
          SelCity = data.City;
          SelState = data.State;
          SelIsland = data.County;
          SelCountry = data.Country;
          $scope.city.apply('selectItem', data.City);
          $scope.state.apply('selectItem', data.State);
          $scope.island.apply('selectItem', data.County);
          $scope.country.apply('selectItem', data.Country);
      })
    }
  };

  $scope.city = {source: citiesDataAdapter, displayMember: "City", valueMember: "Unique", width: "99%", height: 25};
  $scope.placeHoldercity = "Select City";

  $scope.state = {source: statesDataAdapter, displayMember: "State", valueMember: "StateID", width: "99%", height: 25};
  $scope.placeHolderstate = "Select State";

  $scope.island = {source: islandDataAdapter, displayMember: "Island", valueMember: "County", width: "99%", height: 25};
  $scope.placeHolderisland = "Select Island";

  $scope.country = {source: countriesDataAdapter, displayMember: "CountryName", valueMember: "CountryCode", width: "99%", height: 25};
  $scope.placeHoldercountry = "Select Country";

  $scope.FirstName = "";
  $scope.LastName = "" ;
  $scope.Company = "";
  $scope.Address1 = "";
  $scope.Address2 = "";
  $scope.Phone1 = "";
  $scope.Phone2 ="" ;
  $scope.Phone3 = "";
  $scope.Email = "";
  $scope.Fax = "";
  $scope.Website = "";
  $scope.Custom1 = "";
  $scope.Custom2 = "";
  $scope.Custom3 = "";
  $scope.CustomerNote = "";
  var selcustomer;
  $scope.NewCustomerSave = function(){
      var postData="fname="+ this.FirstName;
          postData+="&lname="+ this.LastName;
          postData+="&company="+ this.Company;
          postData+="&address1="+ this.Address1;
          postData+="&address2="+ this.Address2;
          postData+="&phone1="+	this.Phone1;
          postData+="&phone2="+	this.Phone2;
          postData+="&phone3="+ this.Phone3;
          postData+="&fax="+ this.Fax;
          postData+="&email="+ this.Email;
          postData+="&website="+ this.Website;
          postData+="&custom1="+ this.Custom1;
          postData+="&custom2="+ this.Custom2;
          postData+="&custom3="+ this.Custom3;
          postData+="&customnote="+ this.CustomerNote;
          postData+="&zipcode="+ $scope.zipcode.apply('val');//SelZipcode;
          postData+="&city="+ $scope.city.apply('val');//SelCity;
          postData+="&state="+	$scope.state.apply('val');//SelState;
          postData+="&island="+ $scope.island.apply('val');//SelIsland;
          postData+="&country="+ $scope.country.apply('val');//SelCountry;

          if(this.FirstName == "" || this.LastName == ""){
            alert("Fill out all required fields.");
          }else{
            posData.SaveNewCustomer(postData)
            .success(function(data){
              dialog.close();
              if(data.success = true){
                selcustomer = data.newcustomerId;
                //alert("New customer profile created. "+data.newcustomerId);
                $scope.comboboxSettings.source = {};
                var url = base_url + "pos/pointofsale/load-customers";
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
                $scope.comboboxSettings = {source: source, displayMember: "Name", valueMember: "Unique", width: "90%", height: 30};
                $scope.selectedValue = selcustomer;
              }
            });
            ClearCustomerForm();
          }
  };

      var ClearCustomerForm = function(){
        $scope.FirstName = '';
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.Company = '';
        $scope.Address1 = '';
        $scope.Address2 = '';
        $scope.Phone1 = '';
        $scope.Phone2 = '';
        $scope.Phone3 = '';
        $scope.Email = '';
        $scope.Fax = '';
        $scope.Website = '';
        $scope.Custom1 = '';
        $scope.Custom2 = '';
        $scope.Custom3 = '';
        $scope.CustomerNote = '';
        $scope.zipcode.apply('val','');
        $scope.city.apply('val','');
        $scope.state.apply('val','');//SelState;
        $scope.island.apply('val','');//SelIsland;
        $scope.country.apply('val','');//SelCountry;
        $scope.primary_buttons = true;
        $scope.secondary_buttons = false;
      };

/*#################################################################################*/

/*Edit Customer Profile*/
$scope.editdialogSettings =
{
  created: function(args)
  {
      editdialog = args.instance;
  },
  resizable: false,
  width: "100%", height: "100%",
  autoOpen: false,
  theme: 'darkblue'
};

$scope.EditCustomer = function(){
  var result = GlobalCustomer;
  if(result == null) {
    $scope.alert = {
      message: "Please select customer first"
    };
    Alertdialog.setTitle("Edit Customer");
    Alertdialog.open();
  }else{
    $scope.customerid = result;
    var postData ="CustomerUnique="+result;
    posData.GetCustomerProfile(postData)
        .success(function(data){
          $scope.editFirstName = data.fname;
          $scope.editLastName = data.lname;
          $scope.editCompany = data.company;
          $scope.editAddress1 = data.addr1;
          $scope.editAddress2 = data.addr2;
          $scope.editPhone1 = data.p1;
          $scope.editPhone2 = data.p2;
          $scope.editPhone3 = data.p3;
          $scope.editFax = data.fax;
          $scope.editEmail = data.email;
          $scope.editWebsite = data.website;
          $scope.editCustom1 = data.cust1;
          $scope.editCustom2 = data.cust2;
          $scope.editCustom3 = data.cust3;
          $scope.editCustomerNote = data.note;
          $scope.editcity.apply('selectItem', data.city);
          $scope.editstate.apply('selectItem', data.state);
          $scope.editisland.apply('selectItem', data.county);
          $scope.editcountry.apply('selectItem', data.country);
          $scope.editzipcode.apply('selectItem', data.zip);
          SelZipcode = data.zip;
          SelCity = data.city;
          SelState = data.state;
          SelIsland = data.county;
          SelCountry = data.country;
        })
        .then(function(data){
          editdialog.setTitle("Edit Customer");
          editdialog.open();
        });
    //$scope.editFirstName = "test";
  }
};

$scope.editCustomerSave = function(){
var customerid = $scope.customerid;
var postData ="customerid="+customerid;
    postData+="&fname="+$scope.editFirstName;
    postData+="&lname="+$scope.editLastName;
    postData+="&company="+$scope.editCompany;
    postData+="&addr1="+$scope.editAddress1;
    postData+="&addr2="+$scope.editAddress2;
    postData+="&phone1="+$scope.editPhone1;
    postData+="&phone2="+$scope.editPhone2;
    postData+="&phone3="+$scope.editPhone3;
    postData+="&email="+$scope.editEmail;
    postData+="&fax="+$scope.editFax;
    postData+="&website="+$scope.editWebsite;
    postData+="&custom1="+$scope.editCustom1;
    postData+="&custom2="+$scope.editCustom2;
    postData+="&custom3="+$scope.editCustom3;
    postData+="&customnote="+$scope.editCustomerNote;
    postData+="&zipcode="+SelZipcode;
    postData+="&city="+SelCity;
    postData+="&state="+SelState;
    postData+="&county="+SelIsland;
    postData+="&country="+SelCountry;

    if($scope.editFirstName != '' || $scope.editLastName != ''){
        posData.EditCustomerProfileSave(postData)
        .success(function(data){
            if(data.success == true){
              $scope.comboboxSettings.source = {};
                console.log(data.selectedcustomer);
                $scope.selected = undefined;
                $scope.$apply(function(){
                    $scope.selectedValue='';
                });
              var url = base_url + "pos/pointofsale/load-customers";
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
              $scope.comboboxSettings = { source: source, displayMember: "Name", valueMember: "Unique", width: "90%", height: 30 };
              $scope.selectedValue = data.selectedcustomer;
              editdialog.close();
            }
        })
    }else{
        alert("Please filled out all required fields");
    }
};

//-->Sources
$scope.editthetabs = 'darkblue';
$scope.edittabset = {
selectedItem:0
};

$scope.editzipselectHandler = function (event) {
var zipcodeargs = event.args;
if (zipcodeargs) {
  var postData = "geocitiesid="+zipcodeargs.item.value;
  posData.FindCity(postData)
  .success(function(data){
      SelZipcode = zipcodeargs.item.value;
      SelCity = data.City;
      SelState = data.State;
      SelIsland = data.County;
      SelCountry = data.Country;
      $scope.editcity.apply('selectItem', data.City);
      $scope.editstate.apply('selectItem', data.State);
      $scope.editisland.apply('selectItem', data.County);
      $scope.editcountry.apply('selectItem', data.Country);
  })
}
};

$scope.placeHolderzipcode = "Select Zipcode";
$scope.editzipcode = {source: zipcodesDataAdapter, displayMember: "ZipCode", valueMember: "Unique", width: "99%", height: 25};

$scope.editcity = {source: citiesDataAdapter, displayMember: "City", valueMember: "Unique", width: "99%", height: 25};
$scope.placeHoldercity = "Select City";

$scope.editstate = {source: statesDataAdapter, displayMember: "State", valueMember: "StateID", width: "99%", height: 25};
$scope.placeHolderstate = "Select State";

$scope.editisland = {source: islandDataAdapter, displayMember: "Island", valueMember: "County", width: "99%", height: 25};
$scope.placeHolderisland = "Select Island";

$scope.editcountry = {source: countriesDataAdapter, displayMember: "CountryName", valueMember: "CountryCode", width: "99%", height: 25};
$scope.placeHoldercountry = "Select Country";

$scope.editFirstName = '';
$scope.editLastName = '';
$scope.editCompany = '';
$scope.editAddress1 = '';
$scope.editAddress2 = '';
$scope.editPhone1 = '';
$scope.editPhone2 = '';
$scope.editPhone3 = '';
$scope.editEmail = '';
$scope.editFax = '';
$scope.editWebsite = '';
$scope.editCustom1 = '';
$scope.editCustom2 = '';
$scope.editCustom3 = '';
$scope.editCustomerNote = '';

$scope.editExitCustomer = function(){
  editdialog.close();
};

$scope.editDeleteCustomer = function(){
var customerid = $scope.customerid;
var postData="customerid="+customerid;
posData.DeleteCustomer(postData)
.success(function(data){
    if(data.success == true){
      alert("Customer Deleted");

      $scope.comboboxSettings.source = {};
      var url = base_url + "pos/pointofsale/load-customers";
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
      dataAdapter = new ngWidgets.ngx.dataAdapter(source);
      $scope.comboboxSettings = { source: dataAdapter, displayMember: "Name", valueMember: "Unique", width: "90%", height: 30 };
      $scope.selectHandler = function (event) {
          if (event.args) {
              var item = event.args.item;
              if (item) {
                  GlobalCustomer = item.value;
              }
          }
      };
      editdialog.close();
    }
})};
/*End Edit Customer Profile*/

   $scope.Print = function(){
     //PrintReceipt();
     $scope.process = {
       message: 'Printing receipt...'
     };
     AlertProcessdialog.setTitle("Payment");
     AlertProcessdialog.open();
     posData.PrinterCheck()
     .success(function(data){
       AlertProcessdialog.close();
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
        /*
         var msg="Printer is disabled in settings.";
         $scope.alert = {
           message: msg
         };
         Alertdialog.setTitle("Printer not ready");
         Alertdialog.open();
        */
       }
     })
   };

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
     //postdata+="&paymentname="+$scope.paymenttype.name;
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
                   /*
                   $scope.cardprocess = {
                     message: data.status
                   }
                   */
                 }else if(data.balance == false){
                   $scope.BtnApplyPaymentWhen = true;
                   $scope.BtnPrintWhen = false;
                 }
               });

                //alert(amount +" <> "+ signature_amount);

               if(data.status == 12){
                   $scope.response = {
                       message: "Payment Approved"
                   };
                   dialogpaymentcreditcard.close();

                   if(amount > signature_amount){
                     $scope.process = {
                       message: 'Printing receipt...'
                     };
                     AlertProcessdialog.setTitle("Payment");
                     AlertProcessdialog.open();
                   }

                   if(amount > signature_amount){
                     PrinterCheck($scope.paymenttype.id, ReceiptPaymentUnique, data.status);
                   }
               }else if(data.status == 13){
                   $scope.response = {
                       message: "Payment Declined"
                   }
               }
               $scope.response.id = ReceiptPaymentUnique;//RespId;
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
             $scope.process = {
               message: 'Printing receipt...'
             };
             AlertProcessdialog.setTitle("Payment");
             AlertProcessdialog.open();
            /*
            if(data.payment_unique == 1){
              PrinterCheck(data.payment_unique, "","");
            }else{
              PrinterCheck(data.payment_unique, id, data.status);
            }
            */
             PrinterCheck(data.payment_unique, id, data.status);
           }else{
             alert("No data found");
           }
     })
   };

      $scope.RedirectDashboard = function(){
		   /*
        	posData.NewSaleQue()
            .success(function(data){
              if(data.success == true){
                NewSaleQuedialog.setTitle("What would you like to do with existing sale?");
                NewSaleQuedialog.open();
              }else if(data.success == false){
                posData.EmptyTransaction()
                    .success(function(data){
                      if(data.success == true){
                        $window.location.href = base_url + 'pos/cashier';
                      }
                    })
              }
            })
			*/
			posData.NewSaleQue()
			.success(function(data){
				if(data.success == true){
				  $scope.QueReceiptHeaderUnique = data.ReceiptHeaderUnique;
				  $scope.newsaleqshowModal = !$scope.newsaleqshowModal;
				}else if(data.success == false){
				  $window.location.href = base_url + 'pos/cashier';
				}
			})
      };



      $scope.EnterPassCodeNo = function(val){
        var passcode = $scope.drawer.passcode;
        if(passcode == "Invalid Code"){
          $("#passcode").css({"backgroundColor": "white", "color": "black", "text-align": "right"});
          $("#passcode").attr("type","password");
          $("#passcode").focus();
          $scope.drawer = {
            passcode: ''
          };
          $scope.drawer = {
            passcode: $scope.drawer.passcode + '' + val
          };
          $scope.isEnteredCode = false;
        }else{
          $scope.drawer = {
            passcode: $scope.drawer.passcode + '' + val
          };
          $scope.isEnteredCode = false;
        }
      };

      /* Enter Passcode */
      $scope.EnterPassCode = function(){
        var useby = $scope.useby.val;
        var passcode = $scope.drawer.passcode;
        var hashpasscode = CryptoJS.MD5(passcode);
        var postdata="passcode="+hashpasscode;
        posData.EnterPassCode(postdata)
            .success(function(data){
              if(data.success == true){
                $scope.drawer = {
                  passcode: ''
                };

                if(useby == "cashdrawer"){
                  $scope.process = {
                    message: 'Checking printer connection...'
                  };
                  AlertProcessdialog.setTitle("Open Cash Drawer");
                  AlertProcessdialog.open();
                  posData.CashDrawerPrinterCheck()
                      .success(function(data){
                        AlertProcessdialog.close();
                        if(data.success == true){
                          if(data.print == true){
                            //do nothing;
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
                          PasscodeDialog.close();
                        }else{
                          /*
                           var msg="Printer is disabled on the setting.";
                           $scope.alert = {
                           message: msg
                           };
                           Alertdialog.setTitle("Printer");
                           Alertdialog.open();
                           */
                          PasscodeDialog.close();
                        }
                      })
                }else if(useby == "recall"){
                  var ReceiptHeaderUnique = $scope.rowReceiptHeader.Unique;
                  postdata+="&position_unique="+$scope.fn.val;
                  posData.UsersSettings(postdata)
                      .success(function (data) {
                        var LEFT_POSITION_LEVEL = data.left_position_level;
                        var RIGHT_POSITION_LEVEL = data.right_position_level;
                        if (LEFT_POSITION_LEVEL >= RIGHT_POSITION_LEVEL) {
                          PrinterRecallCheck(ReceiptHeaderUnique);
                          PasscodeDialog.close();
                        } else if (LEFT_POSITION_LEVEL <= RIGHT_POSITION_LEVEL) {
                          $("#passcode").css({"backgroundColor": "red", "color": "black", "text-align": "center"});
                          $("#passcode").attr("type","text");
                          $scope.drawer = {
                            passcode: 'Invalid Code'
                          }
                        }
                      })
                }

              }else{
                $("#passcode").css({"backgroundColor": "red", "color": "black", "text-align": "center"});
                $("#passcode").attr("type","text");
                $scope.drawer = {
                  passcode: 'Invalid Code'
                }
              }
            })
      };
      /* End */

      /* Enter Passcode Cancel */
      $scope.EnterPasscodeCancel = function(){
        PasscodeDialog.close();
        $("#passcode").css({"backgroundColor": "white", "color": "black", "text-align": "right"});
        $("#passcode").attr("type","password");
        $("#passcode").focus();
        $scope.drawer = {
          passcode: ''
        };
        $scope.passcode = {
          message: ''
        };
        $scope.isEnteredCode = true;
      };
      /* End */

      /* Passcode Input Clear */
      $scope.EnterPassCodeClear = function(){
        $scope.isEnteredCode = true;
        $("#passcode").css({"backgroundColor": "white", "color": "black", "text-align": "right"});
        $("#passcode").attr("type","password");
        $("#passcode").focus();
        $scope.drawer = {
          passcode: ''
        }
      };
      /* End */
	  
	  
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

      $scope.dialogEnterPassCode = {
        created: function(args)
        {
          PasscodeDialog = args.instance;
        },
        resizable: false,
        width: 364, height: 500,
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
      };

      $scope.OpenDrawer = function(){
        $scope.useby = {
          val: 'cashdrawer'
        };
        PasscodeDialog.setTitle("Cash Drawer | Enter Passcode");
        PasscodeDialog.open();
      };

    $scope.RecallPrint = function(){
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
              PrinterRecallCheck(ReceiptHeaderUnique);
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

    };


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

/*
.directive('listPayments', function(){
    return {
      restrict: 'E',
      templateUrl: base_url + 'pos/pointofsale/list-payments'
    }
})
*/

/*
.directive('newSale', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/new-sale-view'
  }
})

.directive('newsaleQue', function(){
    return{
      restrict: 'E',
      templateUrl: base_url + 'pos/pointofsale/new-sale-que-page'
    }
})

.directive('recallSale', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/recall-sale'
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
*/

/*
.directive('newCustomer', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/new-customer'
  };
})

.directive('editCustomer', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/edit-customer'
  };
})
*/

/*
.directive('dialogProcess', function(){
  return {
    retrict: 'E',
    templateUrl: base_url + 'pos/alerts/process'
  };
})

.directive('creditCard', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/credit-card-entry'
  };
})

.directive('cardProcess', function(){
    return {
        restrict: 'E',
        templateUrl: base_url + 'pos/alerts/card-process'
    };
})

.directive('passCode', function(){
  return {
    retrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/passcode'
  };
})

.directive('newsaleLogoque', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/new-sale-logo-que'
  };
})

.directive('creditCardProcess', function(){
  return {
    restrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/credit-card-process'
  };
})
*/


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










