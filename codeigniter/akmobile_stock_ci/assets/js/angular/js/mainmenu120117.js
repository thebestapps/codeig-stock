var base_url = "/app/";
//var api_url = "http://ak1.akamaipos.com:1337/";
//var api_url =  "http://akamaipos:1337/";

angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize', 'time'])
.controller("akamaiposController",['$scope', '$compile', '$http', '$routeParams', '$q', 'posData', 'TableData', '$window', '$filter', function ($scope, $compile, $http, $routeParams, $q, posData, TableData, $window, $filter) {
angular.expandAkamaiposController($scope, $http, $routeParams, $q, TableData, $window, $filter, $compile)
    /* Global Variable */
    var dialogcashin;
    var dialogentercode;
    var Alertdialog;
    var DialogEnterCashInCode;
    var DialogEnterCashOutCode;
    var AlertProcessdialog;
    var exAmount='';
    var clockinoutdialog;
    var diaglogtimeclockmessage;
    var diaglogtimeclockmessageok;
    var dialogofficeentercode;
    var dialogCashCountForm;
    var dialogCashOutMessage;
    var Tabledialog;
    var KeyPadDialog;
    var GridRowHeight = parseInt($("#GridRowHeight").val());

    $scope.CashCount = {
        Amount: 0
    };
    $scope.format = "yyyy-MM-dd h:mm:ss";
	
    var LogDisplay = $("#LogLevelDisplay").val(); 

    var formatDate = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    }
    var d = new Date();

    var notifyMessage = formatDate(d)+'<br/><br/>';
        notifyMessage+= 'Please notify AkamaiPOS (808)843-8000'+'<br/>';
        notifyMessage+= 'support@akamaipos.com';

    var  capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}

    var populateNumpadAlertReport = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#alert-msg-popup").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
				'<h4>'+msg+'</h4>'+
				'<br/>'+
				'<div id="keyboard_report"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	/*Window Alert Properties*/
	
	//Passcode
	var populateNumpadPasscode = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#passcode_numpad").html('');
			$("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
			$("#passcode_numpad").append(''+
			'<form id="'+form_name+'" autocomplete="off">'+
				'<input type="password" class="hdfield" id="number_field" style="color:#000">'+
				'<div id="keyboard_passcode"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupPasscode = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth / 2);
            var UseWidth = (ComputeWidth);
			$("#dialog-numpad-passcode").jqxWindow({
				/*height: 750,
                width: UseWidth,*/
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
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
			$('#keyboard_passcode').numeric_numpad({
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
	
	/*
	@param string header_text
	*/
	/*Popup Alert*/
	var WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").jqxWindow({
				height: 260,
				minWidth: 350,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
	/*Alert Setup*/
	
    /*Alert Big*/
    var WindowPopupAlertBig = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").jqxWindow({
				height: 560,
				width: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
    
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

    var NumpadAlertCloseReport = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertReport(form, msg)
		.then(function(){
			$('#keyboard_report').hdkeyboard({
			    layout: "alert_close_report",
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
	
	//Enter Amount
	var populateNumpadEnterAmount = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-enter-amount").append('<div id="price_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#price_numpad").html('');
			$("#price_numpad").append('<h4 style="text-align:center;">Enter Amount</h4>');
			$("#price_numpad").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000;">'+
				'<div id="keyboard_cashin"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupPriceChange = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-enter-amount").jqxWindow({
				height: 490,
				minWidth: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#dialog-numpad-enter-amount').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadPriceChange = function(form_name){
		var def = $.Deferred();
		populateNumpadEnterAmount(form_name)
		.then(function(){
			$('#keyboard_cashin').hdkeyboard({
			  layout: "numeric",
			  input: $('#number_field')
			});
			//setTimeout(function(){
			//$("#number_field").focus();
				def.resolve();
			//},100);
		});
		return def.promise();
    }


    var populateNumpadCashInEnterAmount = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#cash_in_enter_amount").append('<div id="cash_in_enter_amount_container" style="background: #144766; color:#EEE;"></div>');
			$("#cash_in_enter_amount_container").html('');
			$("#cash_in_enter_amount_container").append('<h4 style="text-align:center;">Enter Amount</h4>');
			$("#cash_in_enter_amount_container").append(''+
			'<form id="'+form_name+'">'+
                //'<input type="text" id="cashin_amount" class="hdfield" style="color:#000;">'+
                '<div id="cashin_amount" class="hdfield"></div>'+
				'<div id="keyboard_cashin"></div>'+
            '</form>');
            $("#cashin_amount").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false,  decimalDigits: $("#DecimalsPrice").val()});
			def.resolve();
		},100);
		return def.promise();
	}

    $("#cash_in_enter_amount").on("close", function(e){
        e.preventDefault();
        $("#cash_in_enter_amount_container").html('');
    })

    var WindowPopupCashInAmount = function(header_title){
        var def = $.Deferred();
		setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth / 2);
            var UseWidth = (ComputeWidth);
			$("#cash_in_enter_amount").jqxWindow({
				height: 750,
                minWidth: 200,
                width: UseWidth,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#cash_in_enter_amount').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }
    
    var NumpadCashInAmount = function(form_name){
        var def = $.Deferred();
		populateNumpadCashInEnterAmount(form_name)
		.then(function(){
			$('#keyboard_cashin').numeric_numpad({
			  layout: "numeric",
			  input: $('#cashin_amount')
			});
			def.resolve();
		});
		return def.promise();
    }

	var WindowPopupTableOrder = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-table").jqxWindow({
				height: '100%',
				width: 600,
				title: "Table Order",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#dialog-numpad-table').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	/* Dynamic Plugin Commands */
	$(document).on('click', '.exit', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
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
	
	$(document).on('click', '.alert_okay', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
	})
	
	$("#dialog-numpad-alert").on('close', function(event){
		$("#alert-msg-popup").html('');
        $("#number_field").focus();
	})
	
	$("#dialog-numpad-passcode").on('close', function(event){
		$("#passcode_numpad").html('');
	})
	
	$("#dialog-numpad-enter-amount").on('close', function(event){
		$("#price_numpad").html('');
	})

    $("#dialog-cash-drawer").on("close", function(event){
        $("#cash-drawer-container").html('');
    })

    $("#dialog-comment-box").on("close", function(event){
        $("#dialog-comment-box-container").html('');
    })

    $("#payout-view").on("close", function(event){
        $("#payout-view-container").html('');
    })
	/* End */
	
		
	/* Alert Dialog Popup*/
	$scope.dialogClockEnterPassCode = {
		created: function(args){
			clockinoutdialog = args.instance;
		},
		resizable: false,
		width: 364, height: 480,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		showCloseButton: false
	};
	/* End */

	  /* Alert Dialog Popup*/
	  $scope.dialogAlertSettings = {
		created: function(args){
			Alertdialog = args.instance;
		},
		resizable: false,
		width: 300, height: 195,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		showCloseButton: false
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
	  
	  var ProcessDialog = function(title, method, info){
		$scope.process = {
			message: info
		};
		AlertProcessdialog.setTitle(title);
		if(method){
			AlertProcessdialog.open();
		}else{
			AlertProcessdialog.close();
		}
	 }
      /* End */

      /* Enter Code dialog */
      $scope.dialogEnterCode = {
		  created: function(args){
			dialogentercode = args.instance;
		  },
		  resizable: false,
		  width: 364, height: 480,
		  autoOpen: false,
		  theme: 'darkblue',
		  isModal: true,
		  showCloseButton: false
      };
      /* End */

      /* Enter Cash In Code dialog */
      $scope.dialogEnterCashInCode = {
		  created: function(args){
			DialogEnterCashInCode = args.instance;
		  },
		  resizable: false,
		  width: 364, height: 480,
		  autoOpen: false,
		  theme: 'darkblue',
		  isModal: true,
		  showCloseButton: false
      };
      /* End */

      /* Enter Cash Out Code dialog */
      $scope.dialogEnterCashOutCode = {
		  created: function(args){
			DialogEnterCashOutCode = args.instance;
		  },
		  resizable: false,
		  width: 364, height: 480,
		  autoOpen: false,
		  theme: 'darkblue',
		  isModal: true,
		  showCloseButton: false
      };
      /* End */

      /* Time Clock Alert Message */
      $scope.dialogTimeClockAlertSettings = {
		created: function(args){
			diaglogtimeclockmessage = args.instance;
		},
		resizable: false,
		width: '40%', height: 210,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		showCloseButton: false
      };
     /* End */

     /* Time Clock Alert Message Ok */
     $scope.dialogTimeClockAlertOkSettings = {
        created: function(args){
            diaglogtimeclockmessageok = args.instance;
        },
        resizable: false,
        width: '40%', height: 210,
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
     };
     /* End */

     /* Enter Code dialog */
     $scope.dialogOfficeEnterCode = {
        created: function(args){
            dialogofficeentercode = args.instance;
        },
        resizable: false,
        width: 364, height: 480,
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
     };
     /* End */

     /* CashCount */
     $scope.dialogCashCount = {
        created: function(args){
            dialogCashCountForm = args.instance;
        },
        resizable: false,
        width: "100%", 
        height: "100%",
		autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
     };
     /* End */

    /* Cash Out */
    $scope.dialogCashOutPrompt = {
        created: function(args){
            dialogCashOutMessage = args.instance;
        },
        resizable: false,
        width: "25%", height: 150,
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
    };
    /* End */
	
	/* Tables */
    $scope.dialogTables = {
        created: function(args){
            Tabledialog = args.instance;
        },
        resizable: false,
        width: 600, 
		height: '100%',
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: true,
		keyboardCloseKey: 'none'
    };
    /* End */
	
	/* Table Change */
	$scope.KeyPadFormdialog = {
		created: function(args){
			KeyPadDialog = args.instance;
		},
		resizable: false,
		width: 364, height: 500,
		autoOpen: false,
		theme: 'darkblue',
		isModal: true,
		showCloseButton: false
	};
	
	var NumPadProperties = function(title, method, decimal){
		$("#numpad-input").jqxNumberInput({decimalDigits: decimal});
		$("#NumPadTitle").text();
		KeyPadDialog.setTitle(title);
		if(method == true) KeyPadDialog.open();
		if(method == false){ 
			KeyPadDialog.close();
			$("#numpad-input").val(0);
		}
	}
	/* End */

      $scope.isgreaterthan = false;
      $scope.isEnteredCode = true;
      $scope.amt = {
        amount: 0
      };
      $scope.cod = {
        pcode: ''
      };
      $scope.cashin = {
        pcode: ''
      };
      $scope.cashout = {
        copcode: ''
      };
      $scope.enterclock = {
        passcode: ''
      };
      $scope.office = {
        pcode: ''
      };
		
	  var ClearDBCache = function(){
		 var def = $.Deferred();
		 posData.ClearDBCache()
		 .success(function(result){
			def.resolve();	
		 }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cleardbcached_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Clear DB Cache');
                });    
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cleardbcached_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Clear DB Cache');	
                });			
            }
            
         }).finally(function() {
            //console.log("finally finished repos");
         })

		 return def.promise(); 
	  }	
     
      /* Get Header information such like;
  	  *  Receipt Number, Station Name, Location Name and Cashier Name.
  	  */
  	    var LoadHeaderInfo = function(){
  			posData.GetHeaderInfo()
  			.success(function(data){
                $("#receiptn").text(data.receipt_number);
                $("#station").text(data.station_name);
                $("#cashin").text(data.cashin);
                $("#store_name").text(data.store_name);
                $scope.station = {
                    cunique: data.cashin
                }
                
                if(data.user_name){
                    $("#user_name").text(data.user_name);
                }else{
                    $("#user_name").text("");
                }

                if($("#PoleDisplay").val() == 2){
                    conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
                }
            }).catch(function(data){
                if(LogDisplay == 1){
                    var msg = data.data+'<br/>';
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('cleardbcached_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Load Header');
                    });  
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('load_header_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Load Header');	
                    });    				
                }  
            }).finally(function() {
                //console.log("finally finished repos");
            })
  		};
		
      ClearDBCache()
	  .then(function(){
        LoadHeaderInfo(); 
	  });
  	  /* End */

      var CashOutDisabled = function(){
            posData.CashOutDisabled()
            .success(function(result){
                if(result.success == true){
                    //$scope.CashOutDisabled = false;
                    //$scope.NewSaleDisabled = false;
                }else{
                    //$scope.CashOutDisabled = true;
                    //$scope.NewSaleDisabled = true;
                }
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashOutDisabled_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled');
                    });  
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                     NumpadAlertCloseReport('CashOutDisabled_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled');	
                    });		
                }
               
            }).finally(function() {
                //console.log("finally finished repos");
            })
      };

      var PrintReceipt = function(){
            var postdata="cashtype="+$scope.cashtype.ctype;
            posData.PrintReceipt(postdata)
            .success(function(result){
                if(result.success == true){
                   
                }
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('print_receipt_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PrintReceipt');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                     NumpadAlertCloseReport('print_receipt_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PrintReceipt');	
                    });    				
                }
            }).finally(function() {
                //console.log("finally finished repos");
            })
      };

      var PrinterCheck = function(){
            var def = $.Deferred();  
            $('body').block({message: 'Printing receipt please wait...'})
            var postdata="cashtype="+$scope.cashtype.ctype;
            posData.PrinterCheck(postdata)
            .success(function(result){
                $("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.success == true){
                    if(result.print == true){
                        $('body').unblock();
                    }else{
                        $('body').unblock();
                        var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    $('body').unblock();
                }
                LoadHeaderInfo();
                def.resolve();
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('PrinterCheck_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;		
                    NumpadAlertCloseReport('printer_check_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                    });
                }
                
            }).finally(function() {
                //console.log("finally finished repos");
            })
            return def.promise();
      };


      var PrinterCheckTimeClock = function(unique){
        var postdata="unique="+unique;
        posData.PrinterCheckTimeClock(postdata)
        .success(function(result){
            if(result.success == true){
                if(result.print == true){

                }else{
                    var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                    NumpadAlertOk('printer_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cleardbcached_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Printer Check Time Clock');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('printerer_check_timeclock_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Printer Check Time Clock');	
                });		
            }
        }).finally(function() {
            //console.log("finally finished repos");
        })
     };

    /*
    |--------------------------------------------------------------------------------|
    | Cashin by individual station
    |--------------------------------------------------------------------------------|
    */ 
    $scope.CashIn = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true}); 
                FunctionButton = 'CashIn';  
                NumpadPasscode('EnterCashInPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash In | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false}); 
                        },1000); 
                    })  
                })
                $scope.cashtype = 1;
                $scope.$broadcast("focusCashIn");
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashIn');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashIn');	
                });	
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    };

    /*
    |-------------------------------------------------------------------------------|
    | Header information 
    |-------------------------------------------------------------------------------|
    */
    var LoadHeaderInfo2 = function(){
        posData.GetHeaderInfo2()
        .success(function(data){
            $("#receiptn").text(data.receipt_number);
            $("#station").text(data.station_name);
            $("#cashin").text(data.cashin);
            $("#store_name").text(data.store_name);
            $scope.station = {
                cunique: data.cashin
            }
            if($("#PoleDisplay").val() == 2){
                conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
            }
            if(data.user_name){
                $("#user_name").text(data.user_name);
            }else{
                $("#user_name").text("");
            }
        }).catch(function(data){
            if(LogDisplay == 1){
                var msg = data.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cleardbcached_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Load Header');
                });  
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('load_header_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Load Header');	
                });    				
            }  
        }).finally(function() {
            //console.log("finally finished repos");
        })
    };

    /*
    |--------------------------------------------------------------------------------|
    | Printer Check Cash In Server
    |--------------------------------------------------------------------------------|
    */
    var PrinterCashInServerCheck = function(postdata){
            var def = $.Deferred();  
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Checking Printer connection...' });
        
            posData.PrinterCashInServerCheck(postdata)
            .success(function(result){
                $("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.success == true){
                    if(result.print == true){
                        setTimeout($.unblockUI, 100); 
                    }else{
                        setTimeout($.unblockUI, 100); 
                        var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    setTimeout($.unblockUI, 100); 
                }
                LoadHeaderInfo();
                def.resolve();
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('PrinterCheck_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;		
                    NumpadAlertCloseReport('printer_check_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                    });
                }
                
            }).finally(function() {
                //console.log("finally finished repos");
            })
            return def.promise();
      };


    /*
    |--------------------------------------------------------------------------------|
    | Cash In by individual server
    |--------------------------------------------------------------------------------|
    */ 
    $scope.CashInServer = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true}); 
                FunctionButton = 'CashIn';  
                NumpadPasscode('EnterCashInServerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash In | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false}); 
                        },1000); 
                    })  
                })
                $scope.cashtype = 1;
                $scope.$broadcast("focusCashIn");
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashIn');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashIn');	
                });	
            } 
        }).finally(function() {
            //console.log("finally finished repos");
        })
    }

    var CashInServerUserId = 0;
    $(document).on('submit', '#EnterCashInServerPasscode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var process = false;
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
            posData.CashInServerEnterPasscode(postdata)
            .success(function(data){
                if(data.valid){
                    //-->Check if user already cash in
                    CashInServerUserId = data.info.Unique;
                    var newuser = data.info.Unique;
                    var postdata ="UserUnique="+data.info.Unique;
                    posData.CashInServerCheckCashIn(postdata)
                    .success(function(data2){
                        var date = new Date();
                        timeclock_message = '';
                        var postdata ="user_unique="+newuser;
                            postdata+="&status="+1;
                        posData.TimeClockCheck(postdata)
                        .success(function(datacheck){
                            if(datacheck.status == 0){
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                if($scope.ClockInCheck == 1){
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = 'Please Clock In first';	
                                    NumpadAlertOk('clock_in_first', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }else{
                                    var postdata ="UserId="+newuser;
                                    posData.CheckCashDrawerMutipleCashInServer(postdata)
                                    .success(function(result){
                                        if(result.Setting == true){
                                            if(result.CashDrawerSetup == true){
                                                OpenCashDrawer();
                                                SetCashInServerAmount();
                                            }else{
                                                var postdata ="UserId="+newuser;
                                                posData.CashDrawerOptionCashInServer(postdata)
                                                .success(function(result2){
                                                    //CashierDrawerView('cash_drawer_setup_by_cashin_station', result2.html)
                                                    CashierDrawerView('cash_drawer_setup_by_cashin_server', result2.html)
                                                    .then(function(){
                                                        WindowPopupCashierDrawer('Cash Drawer');
                                                    })
                                                })
                                            }
                                        }else{
                                            OpenCashDrawer();
                                            SetCashInServerAmount();
                                        }
                                    })
                                }
                            }else{
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                var postdata ="UserId="+newuser;
                                posData.CheckCashDrawerMutipleCashInServer(postdata)
                                .success(function(result){
                                    if(result.Setting == true){
                                        if(result.CashDrawerSetup == true){
                                            OpenCashDrawer();
                                            SetCashInServerAmount();
                                        }else{
                                            
                                            var postdata ="UserId="+newuser;
                                            posData.CashDrawerOptionCashInServer(postdata)
                                            .success(function(result2){
                                                CashierDrawerView('cash_drawer_setup_by_cashin_server', result2.html)
                                                .then(function(){
                                                    WindowPopupCashierDrawer('Cash Drawer');
                                                })
                                            })
                                        }
                                    }else{
                                        OpenCashDrawer();
                                        SetCashInServerAmount();    
                                    }
                                })
                            }
                        })
                    })
                    $("#dialog-numpad-passcode").jqxWindow("close");
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    NumpadAlertClose('invalid_cashin_server_code', data.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    var OpenCashDrawer = function(){
        posData.OpenCashDrawer()
        .success(function(){

        })
    }

    $(document).on('click', '#cash_drawer_setup_by_cashin_server .button_proceed', function(e){
        e.preventDefault();
        var DrawerSelected = $('input[type=radio][name=group1]:checked').attr('id');
        if(DrawerSelected){
            var postdata="CashDrawerOption="+DrawerSelected;
                postdata+="&UserId="+CashInServerUserId;
            posData.SelectedCashDrawerCashIn(postdata)
            .success(function(result){
                $('#dialog-cash-drawer').jqxWindow('close');
                OpenCashDrawer();
                SetCashInServerAmount();
            })
        }else{
            var msg = "Select Cash Drawer first";	
            NumpadAlertOk('no_cashdrawer_selected', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign">Information</span>');	
            })  
        }
    })

    $(document).on('click', '#cash_drawer_setup_by_cashin_server .button_q_cancel', function(e){
        e.preventDefault();
        $("#dialog-cash-drawer").jqxWindow('close');
    })

    var SetCashInServerAmount = function(){
        var CashInAmount = 0;
        $("#cash_in_enter_amount_container").html('');
        posData.GetCashInAmount()
        .success(function(data){
            if(data.CashIn != 0){
                CashInAmount = parseFloat(data.CashIn).toFixed(2);
            }else{
                CashInAmount = parseFloat(0).toFixed(2);
            }
            NumpadCashInAmount('SetServerCashInAmount')
            .then(function(){
                WindowPopupCashInAmount('Cash In')
                .then(function(){
                    $("#cashin_amount").jqxNumberInput('focus');
                    setTimeout(function(){
                        $("#cashin_amount").val(CashInAmount);
                        var input = $('#cashin_amount input')[0];
                        if('selectionStart' in input) {
                            input.setSelectionRange(0, 0);
                        }else{
                            var range = input.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', 0);
                            range.moveStart('character', 0);
                            range.select();
                        }
                        $("#cashin_amount input").select();
                    },100)
                    //$("#cashin_amount").val(CashInAmount);
                    //$("#cashin_amount").focus();
                    //setTimeout(function(){
                    //    $("#cashin_amount").select();
                    //},100);
                })
            })
        })
    }

    /*
    |--------------------------------------------------------------------------------|
    | Save Amount Cash In Server
    |--------------------------------------------------------------------------------|
    */
    $(document).on('submit', '#SetServerCashInAmount', function(e){
        e.preventDefault();
        var enteredAmount = $("#cashin_amount").val();
        
		if(enteredAmount == ''){
			enteredAmount = 0.00;
        }
        
        var postdata ="Amount="+enteredAmount;
            postdata+="&UserId="+CashInServerUserId;      
      	posData.SaveServerCashInAmount(postdata)
      	.success(function(result){
        	if(result.save){
				$("#cash_in_enter_amount").jqxWindow('close');
                if(result.CashInPrint){
                    var postdata ="UserId="+CashInServerUserId;
                	PrinterCashInServerCheck(postdata);
                }else{
                    LoadHeaderInfo();
                }
        	}else{
				$("#cash_in_enter_amount").jqxWindow('close');
            }
            CashInServerUserId = 0;
      	}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span>');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                });		
            }
        }).finally(function() {
            //console.log("finally finished repos");
        })
        
    })
    /*
    |--------------------------------------------------------------------------------|
    | Cash Out by individual server
    |--------------------------------------------------------------------------------|
    */
    $scope.CashOutServer = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true});
                NumpadPasscode('EnterCashOutServerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash Out | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    })  
                })
                $(".newsale").attr({"disabled": false});
            }
        }).catch(function(result1){
            if(LogDisplay == 1){
                var msg = result1.data+'<br/>';
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache');
                });
            }else{
                var msg = 'Technical issue '+'<br/>';
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache');	
                });		
            }
        })
    }

    /*
    |--------------------------------------------------------------------------------|
    | Cash Out by individual server (Old) 5/31/2017
    |--------------------------------------------------------------------------------|
    $scope.CashOutServer = function(){
       posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true});
                NumpadPasscode('EnterCashOutServerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash Out | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    })  
                })
                $(".newsale").attr({"disabled": false});
            }
        }).catch(function(result1){
            if(LogDisplay == 1){
                var msg = result1.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache');	
                });		
            }
        }).finally(function() {
            //console.log("finally finished repos");
        })
    }
    */

    var populateSeverCashInList = function(form_name, html){
        var def = $.Deferred();
        setTimeout(function(){
            $("#server_cashin").append('<div id="server_cashin_container" style="background: #004a73"></div>');
            $("#server_cashin_container").html('');
            $("#server_cashin_container").append(html);
            $("#server_cashin_container").append(""+
            '<form id="'+form_name+'">'+
                '<input type="text" id="text_field" class="hdfield" style="color:#000; display:none;">'+
                '<div id="keyboard_server_cashin"></div>'+
            '</form>'+
            "");
            def.resolve();
        },100);
        return def.promise();
    }
    
    var WindowServerCashInList = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#server_cashin").jqxWindow({
                width: '50%', 
                height: '50%',
                title: header_title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#server_cashin').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }
    
    var ServerCashInListView = function(form_name, html){
        var def = $.Deferred();
        populateSeverCashInList(form_name, html)
        .then(function(){
            $('#keyboard_server_cashin').hdkeyboard({
                layout: "item_reason",
                input: $('#text_field')
            });
            setTimeout(function(){
                def.resolve();
            },100);
        });
        return def.promise();
    }

    var ServerCashInList = function(Unique){
        var postdata ="UserUnique="+Unique;
        posData.ListCashInServer(postdata)
        .success(function(data){
            ServerCashInListView('server_list_option', data.html)
            .then(function(){
                WindowServerCashInList('Cash Out');
            })
        })
    }

    /*
    |--------------------------------------------------------------------------------|
    |Cash Out Server
    |--------------------------------------------------------------------------------|
    */
    $(document).on('submit', '#EnterCashOutServerPasscode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var security        = ['CashOutUser', 'CashOut'];
            var passcode        = CRP.converted;
            var hashpasscode    = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
            var postdata ="FunctionButton="+JSON.stringify(security);
                postdata+="&Passcode="+hashpasscode;
            posData.CheckUserSecurity(postdata)
            .success(function(data){
                if(data.validuser){
                    CashOutStationUserUnique = data.UserUnique; //CashOutStation also for CashOutServer
                    if(data.cashin){
                        if(data.OpenUserList){
                            LoadHeaderInfo();
                            ServerCashInList(data.UserUnique);
                        }else{
                            if(data.countposition > 0){
                                if($scope.CashOutBlind > 0){
                                    LoadHeaderInfo();
                                    CashCountProcessServerBlind(data.StationCashierUnique);
                                    OpenCashDrawer();
                                }else{
                                    LoadHeaderInfo();
                                    CashCountProcessServer(data.StationCashierUnique);
                                    OpenCashDrawer();
                                }
                            }else{
                                var msg = "Sorry, you don't have permission";
                                NumpadAlertClose('invalid_cashout_server_code', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });
                            }
                        }   
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        NumpadAlertClose('no_cashin', data.msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });  
                    }
                    $("#dialog-numpad-passcode").jqxWindow("close");
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }else{
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    /*
    |--------------------------------------------------------------------------------|
    | Cash Out Server Passcode (Old) 5/31/2017
    |--------------------------------------------------------------------------------|
    $(document).on('submit', '#EnterCashOutServerPasscode', function(e){
        e.preventDefault();
        var passcode        = $("#number_field").val();
        var hashpasscode    = CryptoJS.MD5(passcode);
        var postdata        ="Passcode="+hashpasscode;
        posData.CashOutServerEnterPasscode(postdata)
        .success(function(data){
            if(data.valid){
                if(data.cashin){
                    $scope.station.cunique = data.station_cashier_unique;
                    var date = new Date();
                    timeclock_message = '';
                    var postdata="user_unique="+data.info.Unique;
                        postdata+="&status="+1;
                    posData.TimeClockCheck(postdata)
                    .success(function(datacheck){
                        if(datacheck.status == 0){
                            if($scope.ClockInCheck == 1){	
                                var msg = 'Please Clock In first';	
                                NumpadAlertOk('clock_in_first', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                            }else{
                                LoadHeaderInfo();
                                ServerCashInList();
                            }
                        }else{
                            LoadHeaderInfo();
                            ServerCashInList();
                        }
                    })
                }else{
					NumpadAlertOk('invalid_cashin_server_code', data.msg)
					.then(function(){
					   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					})
                }
                $("#dialog-numpad-passcode").jqxWindow("close");
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                NumpadAlertClose('invalid_cashin_server_code', data.msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                });
            }
        })
    })
    */

    $(document).on('click', '#server_list_option .button_proceed', function(){
        var UserUnique = $('input[type=radio][name=group1]:checked').attr('id');
        if(UserUnique){
            var postdata ="UserUnique="+UserUnique;
            posData.CashOutServerCheckCashIn(postdata)
            .success(function(data){
                OpenCashDrawer();
                if($scope.CashOutBlind > 0){
                    LoadHeaderInfo();
                    CashCountProcessServerBlind(data.info.Unique);
                }else{
                    LoadHeaderInfo(data.info.Unique);
                    CashCountProcessServer(data.info.Unique);
                }
            })
            $("#server_cashin").jqxWindow('close');
        }else{
            var msg = "Please select option";
            NumpadAlertClose('invalid_cashout_server_code', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });
        }
    })

    $(document).on('click', '#server_list_option .button_q_cancel', function(){
        $("#server_cashin").jqxWindow('close');
    })

    /*
    |--------------------------------------------------------------------------------|
    | Cash Out Server Passcode
    |--------------------------------------------------------------------------------|
    $(document).on('submit', '#EnterCashOutServerPasscode', function(e){
        e.preventDefault();
        var passcode        = $("#number_field").val();
        var hashpasscode    = CryptoJS.MD5(passcode);
        var postdata        ="Passcode="+hashpasscode;
        posData.CashOutServerEnterPasscode(postdata)
        .success(function(data){
            if(data.valid){
                if(data.cashin){
                    $scope.station.cunique = data.station_cashier_unique;
                    var date = new Date();
                    timeclock_message = '';
                    var postdata="user_unique="+data.info.Unique;
                        postdata+="&status="+1;
                    posData.TimeClockCheck(postdata)
                    .success(function(datacheck){
                        if(datacheck.status == 0){
                            if($scope.ClockInCheck == 1){	
                                var msg = 'Please Clock In first';	
                                NumpadAlertOk('clock_in_first', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                            }else{
                                LoadHeaderInfo();
                                if($scope.CashOutBlind > 0){
                                    CashCountProcessServerBlind();
                                }else{
                                    CashCountProcessServer();
                                }
                            }
                        }else{
                            LoadHeaderInfo();
                            if($scope.CashOutBlind > 0){
                                CashCountProcessServerBlind();
                            }else{
                                CashCountProcessServer();
                            }
                        }
                    })
                }else{
					NumpadAlertOk('invalid_cashin_server_code', data.msg)
					.then(function(){
					   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					})
                }
                $("#dialog-numpad-passcode").jqxWindow("close");
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                NumpadAlertClose('invalid_cashin_server_code', data.msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                });
            }
        })
    })
    */

    /*
    |--------------------------------------------------------------------------------|
    | Printer Check Cash In Server
    |--------------------------------------------------------------------------------|
    */
    var PrinterCashOutServerCheck = function(postdata){
        var def = $.Deferred();  
        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px' 
        }, message: 'Checking Printer connection...' });
    
        posData.PrinterCashOutServerCheck(postdata)
        .success(function(result){
            $("#dialog-numpad-enter-amount").jqxWindow('close');
            if(result.success == true){
                if(result.print == true){
                    setTimeout($.unblockUI, 100); 
                }else{
                    setTimeout($.unblockUI, 100); 
                    var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            }else{
                setTimeout($.unblockUI, 100); 
            }
            LoadHeaderInfo();
            def.resolve();
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PrinterCheck_error', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;		
                NumpadAlertCloseReport('printer_check_error', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                });
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
        return def.promise();
    };

    /*
    |-----------------------------------------------------------------------------------|
    | Cash Count Process by individual server
    |-----------------------------------------------------------------------------------|
    */
    var CashCountProcessServer = function(station_cashier_unique){
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
		ProcessStationCashout(station_cashier_unique, CashOutStationUserUnique)
		.then(function(){
            var postdata ="station_cashier_unique="+station_cashier_unique;
			$http({
				method: 'post',
				url: base_url + 'pos/receipt-payment/count/cashout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
           	    }
			}).success(function(result){
				if(result.Count > 0){
					$scope.rowUpWhen = false;
					$scope.rowDownWhen = false;
					var postdata ="StationCashierUnique="+station_cashier_unique;
					posData.CashCount(postdata) 
					.success(function(result2){
						$.each(result2, function(index, value){
							var payment_name = value.payment_name;
							var postdata ="&calculated="+value.Total;
								postdata+="&In="+value.In;
								postdata+="&Out="+value.Out;
								postdata+="&Total="+value.Total;
                                postdata+="&payment_name="+value.payment_name;
                                postdata+="&StationCashierUnique="+station_cashier_unique;
							$http({
								method: 'POST',
								data: postdata,
								url: base_url + 'pos/cashier/cashout/update/cash-count',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).success(function(result3){
                                var postdata ="station_cashier_unique="+station_cashier_unique;
                                    postdata+="&payment_menu="+payment_menu;
								$http({
									method: 'POST',
                                    data: postdata,
                                    url: base_url + 'pos/cashier/cashout/cash-count/display',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
								}).success(function(result4){
									$scope.gridCashCount = {
										source: {
											localdata: result4
										}
									}

                                    $scope.AddCountedWhen = true;
									dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
									dialogCashCountForm.open();
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
									},100);
									$(".cash-count-totals").show();	
									$http({
										method: 'get',
										url: base_url+'pos/cashier/cashout-server/cash-count/totals'
									}).success(function(result5){
                                        gridCashCountTotals(result5);
									}).catch(function(result5){
                                        if(LogDisplay == 1){
                                            var msg = result5.data+'<br/>';
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');
                                            });
                                        }else{
                                            var msg ='Technical issue '+'<br/>';
                                                msg+= notifyMessage;	
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');	
                                            });	
                                        }
                                    })
                                }).catch(function(result4){
                                    if(LogDisplay == 1){
                                        var msg = result4.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');	
                                        });		
                                    }	
								})
							}).catch(function(result3){
                                if(LogDisplay == 1){
                                    var msg = result3.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');	
                                    });		
                                }
                            })
						})//foreach
					}).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                            });	
                        }
                    })
				}else{
                    var postdata ="station_cashier_unique="+station_cashier_unique;
                        postdata+="&payment_menu="+payment_menu;
					$http({
						method: 'POST',
                        data: postdata,
                        url: base_url + 'pos/cashier/cashout/cash-count/display',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(data){
						$scope.gridCashCount = {
							source: {
								localdata: data
							}
						}
					}).then(function(){
						$scope.AddCountedWhen = true;
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
						dialogCashCountForm.open();
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
						},100);
						$(".cash-count-totals").show();	
						$http({
							method: 'get',
							url: base_url + 'pos/cashier/cashout-server/cash-count/totals'
						}).success(function(data){
                            gridCashCountTotals(data);
						})						
					})
				}
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;	
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                    });	
                }
               
            }).finally(function() {     

            })
		})
    }

    /*
    |-----------------------------------------------------------------------------------|
    | Cash Count Process by individual server
    |-----------------------------------------------------------------------------------|
    
    var CashCountProcessServer = function(){
        var station_cashier_unique = $scope.station.cunique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
		ProcessStationCashout(station_cashier_unique)
		.then(function(){
            var postdata ="station_cashier_unique="+station_cashier_unique;
			$http({
				method: 'post',
				url: base_url + 'pos/receipt-payment/count/cashout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
           	    }
			}).success(function(result){
				if(result.Count > 0){
					$scope.rowUpWhen = false;
					$scope.rowDownWhen = false;
					var postdata ="StationCashierUnique="+station_cashier_unique;
					posData.CashCount(postdata) 
					.success(function(result2){
						$.each(result2, function(index, value){
							var payment_name = value.payment_name;
							var postdata ="&calculated="+value.Total;
								postdata+="&In="+value.In;
								postdata+="&Out="+value.Out;
								postdata+="&Total="+value.Total;
                                postdata+="&payment_name="+value.payment_name;
                                postdata+="&StationCashierUnique="+station_cashier_unique;
							$http({
								method: 'POST',
								data: postdata,
								url: base_url + 'pos/cashier/cashout/update/cash-count',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).success(function(result3){
                                var postdata ="station_cashier_unique="+station_cashier_unique;
                                    postdata+="&payment_menu="+payment_menu;
								$http({
									method: 'POST',
                                    data: postdata,
                                    url: base_url + 'pos/cashier/cashout/cash-count/display',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
								}).success(function(result4){
									$scope.gridCashCount = {
										source: {
											localdata: result4
										}
									}

                                    $scope.AddCountedWhen = true;
									dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
									dialogCashCountForm.open();
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
									},100);
									$(".cash-count-totals").show();	
									$http({
										method: 'get',
										url: base_url+'pos/cashier/cashout-server/cash-count/totals'
									}).success(function(result5){
                                        gridCashCountTotals(result5);
									}).catch(function(result5){
                                        if(LogDisplay == 1){
                                            var msg = result5.data+'<br/>';
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');
                                            });
                                        }else{
                                            var msg ='Technical issue '+'<br/>';
                                                msg+= notifyMessage;	
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');	
                                            });	
                                        }
                                        
                                    }).finally(function() {     

                                    })
                                }).catch(function(result4){
                                    if(LogDisplay == 1){
                                        var msg = result4.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');	
                                        });		
                                    }
                                    
                                }).finally(function() {
									
								})
							}).catch(function(result3){
                                if(LogDisplay == 1){
                                    var msg = result3.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');	
                                    });		
                                }
                            }).finally(function() {     

                            })
						})//foreach
					}).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                            });	
                        }
                        
                    }).finally(function() {     

                    })
				}else{
                    var postdata ="station_cashier_unique="+station_cashier_unique;
                        postdata+="&payment_menu="+payment_menu;
					$http({
						method: 'POST',
                        data: postdata,
                        url: base_url + 'pos/cashier/cashout/cash-count/display',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(data){
						$scope.gridCashCount = {
							source: {
								localdata: data
							}
						}
					}).then(function(){
						$scope.AddCountedWhen = true;
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
						dialogCashCountForm.open();
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
						},100);
						$(".cash-count-totals").show();	
						$http({
							method: 'get',
							url: base_url + 'pos/cashier/cashout-server/cash-count/totals'
						}).success(function(data){
                            gridCashCountTotals(data);
						})						
					})
				}
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;	
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                    });	
                }
               
            }).finally(function() {     

            })
		})
    }
    */
    

    /*
    |-----------------------------------------------------------------------------------|
    | Cash Count Process Blind by individual server 
    |-----------------------------------------------------------------------------------|
    */
    var CashCountProcessServerBlind = function(){
        var station_cashier_unique = $scope.station.cunique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
		ProcessStationCashout(station_cashier_unique, CashOutStationUserUnique)
		.then(function(){
            var postdata ="station_cashier_unique="+station_cashier_unique;
			$http({
				method: 'POST',
				url: base_url + 'pos/receipt-payment/count/cashout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
           	    }
			}).success(function(result){
				if(result.Count > 0){
					$scope.rowUpWhen = false;
					$scope.rowDownWhen = false;
					var postdata = "StationCashierUnique="+station_cashier_unique;
					posData.CashCount(postdata)
					.success(function(result2){
						$.each(result2, function(index, value){
							var payment_name = value.payment_name;
							var postdata="&calculated="+value.Total;
								postdata+="&In="+value.In;
								postdata+="&Out="+value.Out;
								postdata+="&Total="+value.Total;
                                postdata+="&payment_name="+value.payment_name;
                                postdata+="&StationCashierUnique="+station_cashier_unique;
							$http({
								method: 'POST',
								data: postdata,
								url: base_url + 'pos/cashier/cashout/update/cash-count',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).success(function(result3){
                                var postdata ="station_cashier_unique="+station_cashier_unique;
                                    postdata+="&payment_menu="+payment_menu;
								$http({
									method: 'POST',
                                    data: postdata,
                                    url: base_url + 'pos/cashier/cashout/cash-count/display',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(result4){
                                    CashOutHide(result4)
                                    $scope.AddCountedWhen = true;
									dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
									dialogCashCountForm.open();
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
									},100);
                                    $(".cash-count-totals").hide();	
                                }).catch(function(result4){
                                    if(LogDisplay == 1){
                                        var msg = result4.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess2');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;	
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess2');	
                                        });	
                                    }
                                    
                                }).finally(function() {
									
								})
							}).catch(function(result3){
                                if(LogDisplay == 1){
                                    var msg = result3.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;	
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');	
                                    });	
                                }
                                
                            }).finally(function() {     

                            })
						})//foreach
					}).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');	
                            });	
                        }
                        
                    }).finally(function() {     

                    })
				}else{
                    var postdata ="station_cashier_unique="+station_cashier_unique;
                        postdata+="&payment_menu="+payment_menu;
					$http({
						method: 'POST',
                        data: postdata,
						url: base_url + 'pos/cashier/cashout/update/cash-count',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(result){
                        CashOutHide(result);
                        $scope.AddCountedWhen = true;
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
						dialogCashCountForm.open();
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
						},100);	
                        $(".cash-count-totals").hide();
					}).catch(function(result){
                        if(LogDisplay == 1){
                            var msg = result.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('UpdateCashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('UpdateCashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');	
                            });	
                        }
                    }).finally(function() {
										
					})
				}
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>' 
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){ 
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');	
                    });		
                }
                
            }).finally(function() {     

            })
        }) 
    }




    /*
    |--------------------------------------------------------------------------------|
    | Save Amount Cash In
    |--------------------------------------------------------------------------------|
    */
    $(document).on('submit', '#SaveAmountCashIn', function(e){
        e.preventDefault();
        var cashtype = $scope.cashtype.ctype;
      	var enteredAmount = $("#number_field").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
		}
      	var postdata="cashtype="+cashtype;
        postdata+="&amount="+enteredAmount;
      	posData.SaveAmountCashIn(postdata)
      	.success(function(result){
        	if(result.success == true){
				$("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.CashInPrint){
                	PrinterCheck();
                }else{
                    LoadHeaderInfo();
                }
        	}else{
				$("#dialog-numpad-enter-amount").jqxWindow('close');
        	}
      	}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashIn');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashIn');	
                });		
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    })
    
    /*
    |--------------------------------------------------------------------------------|
    | Cash Out
    |--------------------------------------------------------------------------------|
    */ 
    $scope.CashOut = function(){
        posData.CheckCache()
        .success(function(result1){
            if(result1.store){
                $(".newsale").attr({"disabled": true});   
                FunctionButton = 'CashOut';  
                posData.CashOutDisabled()
                .success(function(result2){
                    if(result2.success == true){
                        $scope.cashout = {
                            copcode: ''
                        };
                        NumpadPasscode('EnterCashOutPasscode')	
                        .then(function(){
                            WindowPopupPasscode('Cash Out | Enter Passcode')
                            .then(function(){
                                $("#number_field").focus();
                            })  
                        })	
                        $scope.cashtype = 2;
                        $scope.$broadcast("focusCashOut");
                    }else{
                        var msg = 'Please cash in first';	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }

                    setTimeout(function(){
                        $(".newsale").attr({"disabled": false}); 
                    },1000);

                }).catch(function(result2){
                    if(LogDisplay == 1){
                        var msg = result2.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cash_out_disabled_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cash_out_disabled_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled');	
                        });		
                    }
                }).finally(function() {
                    
                })
            }else{
                location.reload();
            }
        }).catch(function(result1){
            if(LogDisplay == 1){
                var msg = result1.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span>');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                });		
            }
        }).finally(function() {
            //console.log("finally finished repos");
        })
    };
    /* End */

    /* Close popup Cash In Form */
    $scope.CashInCancel = function(){
      dialogcashin.close();
      $scope.amt = {
        amount: 0
      };
    };
    /* End */

    $scope.CashInClear = function(){
      $scope.amt = {
        amount: 0
      }
    };
	
	$(document).on('submit', '#SaveAmount', function(e){
		e.preventDefault();
		var cashtype = $scope.cashtype.ctype;
      	var enteredAmount = $("#number_field").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
		}
      	var postdata="cashtype="+cashtype;
        postdata+="&amount="+enteredAmount;
      	posData.SaveAmountCashIn(postdata)
      	.success(function(result){
        	if(result.success == true){
				$("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.CashInPrint){
                	PrinterCheck();
                }else{
                    LoadHeaderInfo();
                }
        	}else{
				$("#dialog-numpad-enter-amount").jqxWindow('close');
        	}
      	}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>';
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveAmount');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveAmount');	
                });		
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
	})
    /*
    $(document).on('submit', '#SaveAmountCashIn', function(e){
		e.preventDefault();
        var cashtype = $scope.cashtype.ctype;
      	var enteredAmount = $("#number_field").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
		}
      	var postdata="cashtype="+cashtype;
        postdata+="&amount="+enteredAmount;
      	posData.SaveAmountCashIn(postdata)
      	.success(function(result){
        	if(result.success == true){
				$("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.CashInPrint){
                	PrinterCheck();
                }else{
                    LoadHeaderInfo();
                }
        	}else{
				$("#dialog-numpad-enter-amount").jqxWindow('close');
        	}
      	}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashIn');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('save_amount_cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashIn');	
                });		
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    })
    */

    $scope.AcceptAmount = function(){
        $scope.process = {
            message: 'Printing Receipt please wait...'
        };
        AlertProcessdialog.setTitle("Process Amount");
        AlertProcessdialog.open();
        var cashtype = $scope.cashtype.ctype;
        var enteredAmount = $scope.amt.amount;
        var postdata="cashtype="+cashtype;
        postdata+="&amount="+enteredAmount;
        posData.SaveAmount(postdata)
		.success(function(result){
			AlertProcessdialog.close();
			if(result.success == true){
				PrinterCheck();
			}else{
				dialogcashin.close();
			}
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('accept_amount_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> AcceptAmount');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('accept_amount_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> AcceptAmount');	
                });	
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    }

    var FunctionButton = '';
    /* Open popup Enter Code */
    $scope.NewSale = function(){
        posData.CheckCache()
        .success(function(result){
            if($("#CashInMethod").val() == 1 || $("#CashInMethod").val() == 3){
                if(result.store){
                    $(".newsale").attr({"disabled": true});
                    posData.CashOutDisabled()
                    .success(function(result2){
                        if(result2.success == true){
                            NumpadPasscode('EnterPasscode')	
                            .then(function(){
                                WindowPopupPasscode('New Sale | Enter Passcode')
                                .then(function(){
                                    $("#number_field").focus();
                                })  
                            })	
                            FunctionButton = 'NewSale';
                        }else{
                            FunctionButton = '';
                            var msg = 'Please cash in first';	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                        $scope.$broadcast('NewSale');
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false});
                        },1000)
                    }).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('cashout_disabled_newsale_error', msg)
                            .then(function(){
                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashOutNewSale');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('cashout_disabled_newsale_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashOutNewSale');	
                            });		
                        }
                        
                    }).finally(function() {
                        
                    })

                }else{
                    location.reload();
                }
            }else{
                NumpadPasscode('EnterPasscodeCashServer')	
                .then(function(){
                    WindowPopupPasscode('New Sale | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    })  
                })	
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('check_cache_newsale_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCacheNewSale');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('check_cache_newsale_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCacheNewSale');	
                });	
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    };
    /* End */

    /* Cash In Numpad Buttons */
    $scope.EnterPassCodeNo = function(val){
        var passcode = $scope.cod.pcode;
        if(passcode == "Invalid Code"){
            $("#passcode").css({"backgroundColor": "white", "color": "black", "text-align": "right"});
            $("#passcode").attr("type","password");
            $("#passcode").focus();
            $scope.cod = {
                pcode: ''
            };
            $scope.cod = {
                pcode: $scope.cod.pcode + '' + val
            };
            $scope.isEnteredCode = false;
        }else{
            $scope.cod = {
                pcode: $scope.cod.pcode + '' + val
            };
            $scope.isEnteredCode = false;
        }
    };
    /* End */

    /* Enter Passcode Cancel */
    $scope.EnterPasscodeCancel = function(){
        dialogentercode.close();
        $("#passcode").css({"backgroundColor": "white", "color": "black", "text-align": "right"});
        $("#passcode").attr("type","password");
        $("#passcode").focus();
        $scope.cod = {
            pcode: ''
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
        $scope.cod = {
            pcode: ''
        }
    };
    /* End */

	$(document).on('submit','#EnterPasscode',function(e){
	    e.preventDefault();
        var tableNo = $scope.TableNo;	
        var PopupPasscodeId = 1;
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;//$("#number_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton;
            posData.EnterPassCode(postdata)
            .success(function(result){
                if(result.success == true){
                    if(result.login == true){
                        var store_unique_id;
                        var postdata='';

                        posData.getLoggedInformation()
                        .success(function(result2){
                            store_unique_id = result2.storeunique;
                            postdata="code="+hashpasscode;
                            posData.TimeClockPasscode(postdata)
                            .success(function(datainfo){
                                if(datainfo.success == false){
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = 'Invalid code';	
                                    NumpadAlertOk('invalid_passcode', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }else{
                                    var date = new Date();
                                    /* Find Clock In if already exist then update
                                    *  if not Create new.
                                    */
                                    postdata='';
                                    timeclock_message = '';
                                    postdata="user_unique="+datainfo.data.Unique;
                                    postdata+="&status="+1;
                                    posData.TimeClockCheck(postdata)
                                    .success(function(datacheck){
                                        if(datacheck.status == 0){
                                            if($scope.ClockInCheck == 1){
                                                $("#dialog-numpad-passcode").jqxWindow('close');	
                                                var msg = 'Please Clock In first';	
                                                NumpadAlertOk('clock_in_first', msg)
                                                .then(function(){
                                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                                })
                                            }else{
                                                //-->Create New Row in receipt header unigue
                                                var postdata="passcode="+hashpasscode;
                                                    postdata+="&cashtype=3";
                                                posData.CreateReceipt(postdata)
                                                .success(function(create_receipt_result){
                                                    $window.location.href = 'pointofsale';
                                                    //$window.location.href = 'pointofsale/view/new-sale';
                                                }).catch(function(create_receipt_result){
                                                    if(LogDisplay == 1){
                                                        var msg = create_receipt_result.data+'<br/>'
                                                            msg+= notifyMessage;
                                                        NumpadAlertCloseReport('create_receipt_error', msg)
                                                        .then(function(){
                                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');
                                                        });
                                                    }else{
                                                        var msg = 'Technical issue '+'<br/>'
                                                            msg+= notifyMessage;	
                                                        NumpadAlertCloseReport('create_receipt_error', msg)
                                                        .then(function(){
                                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');	
                                                        });	
                                                    }
                                                    
                                                }).finally(function() {
                                                    //console.log("finally finished repos");
                                                })
                                            }
                                            $("#dialog-numpad-passcode").jqxWindow('close');
                                        }else{
                                            //-->Create New Row in receipt header unique
                                            var postdata="passcode="+hashpasscode;
                                                postdata+="&cashtype=3";
                                            posData.CreateReceipt(postdata)
                                            .success(function(create_receipt_result){
                                                $window.location.href = 'pointofsale';
                                                //$window.location.href = 'pointofsale/view/new-sale';    
                                            }).catch(function(create_receipt_result){
                                                if(LogDisplay == 1){
                                                    var msg = create_receipt_result.data+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('create_receipt_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');
                                                    });
                                                }else{
                                                    var msg = 'Technical issue '+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('create_receipt_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');	
                                                    });		
                                                }
                                                
                                            }).finally(function() {
                                                //console.log("finally finished repos");
                                            })
                                        }
                                    }).catch(function(datacheck){
                                        if(LogDisplay == 1){
                                            var msg = datacheck.data+'<br/>'
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('timeclock_check_error', msg)
                                            .then(function(){
                                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeclockCheck / EnterPasscode');
                                            });
                                        }else{
                                            var msg = 'Technical issue '+'<br/>'
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('timeclock_check_error', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeclockCheck / EnterPasscode');	
                                            });		
                                        }
                                        
                                    }).finally(function() {
                                        //console.log("finally finished repos");
                                    })
                                }
                            }).catch(function(datainfo){
                                if(LogDisplay == 1){
                                    var msg = datainfo.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('timeclock_passcode_enterpasscode_error', msg)
                                    .then(function(){
                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeclockPasscode / EnterPasscode');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;	
                                    NumpadAlertCloseReport('timeclock_passcode_enterpasscode_error', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeclockPasscode / EnterPasscode');	
                                    });	
                                }
                                
                            }).finally(function() {
                                //console.log("finally finished repos");
                            })

                        }).catch(function(result2){
                            if(LogDisplay == 1){
                                var msg = result.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('get_logged_information_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> GetLoggedInformation');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('get_logged_information_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> GetLoggedInformation');	
                                });		
                            }
                        }).finally(function(){
                            
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                            var msg = result.msg;	
                            NumpadAlertOk('invalid_passcode', msg) 
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            }); 
                        }    
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })	
                }
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('enter_passcode_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> EnterPasscode');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('enter_passcode_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> EnterPasscode');	
                    });		
                }
                
            }).finally(function() {
                //console.log("finally finished repos");
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
	})

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

    $(document).on("submit", "#EnterPasscodeCashServer", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="Passcode="+hashpasscode;
            posData.EnterPassCodeCashserver(postdata)
            .success(function(result){
                if(result.valid){
                    var newuser = result.info.Unique;
                    posData.CashInServerCheckCashIn(postdata)
                    .success(function(data){
                        if(data.cashin){
                            var date = new Date();
                            timeclock_message = '';
                            var postdata ="user_unique="+newuser;
                                postdata+="&status="+1;
                            posData.TimeClockCheck(postdata)
                            .success(function(datacheck){
                                if(datacheck.status == 0){
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    if($scope.ClockInCheck == 1){
                                        $("#dialog-numpad-passcode").jqxWindow('close');	
                                        var msg = 'Please Clock In first';	
                                        NumpadAlertOk('clock_in_first', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        })
                                    }else{
                                        var postdata ="UserUnique="+newuser;
                                        posData.CreateReceiptCashInServer(postdata)
                                        .success(function(create_receipt_result){
                                            $window.location.href = 'pointofsale';
                                        })
                                    }
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    var postdata ="UserUnique="+newuser;
                                    posData.CreateReceiptCashInServer(postdata)
                                    .success(function(create_receipt_result){
                                        $window.location.href = 'pointofsale';
                                    })
                                }
                            })
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow('close');	
                            var msg = data.msg;	
                            NumpadAlertOk('cashin_first', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                    })
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })	 
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    /* For Deleting */
    $(document).on("submit", "#EnterPasscodeCashServer_disabled", function(e){
        e.preventDefault();
        var passcode = $("#number_field").val();
        var hashpasscode = CryptoJS.MD5(passcode);
        var postdata="Passcode="+hashpasscode;
        posData.EnterPassCodeCashserver(postdata)
        .success(function(result){
            if(result.valid){
                var newuser = result.info.Unique;
                posData.CashInServerCheckCashIn(postdata)
                .success(function(data){
                    if(data.cashin){
                        var date = new Date();
                        timeclock_message = '';
                        var postdata ="user_unique="+newuser;
                            postdata+="&status="+1;
                        posData.TimeClockCheck(postdata)
                        .success(function(datacheck){
                            if(datacheck.status == 0){
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                if($scope.ClockInCheck == 1){
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = 'Please Clock In first';	
                                    NumpadAlertOk('clock_in_first', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }else{
                                    var postdata ="UserUnique="+newuser;
                                    posData.CreateReceiptCashInServer(postdata)
                                    .success(function(create_receipt_result){
                                        $window.location.href = 'pointofsale';
                                    })
                                }
                            }else{
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                var postdata ="UserUnique="+newuser;
                                posData.CreateReceiptCashInServer(postdata)
                                .success(function(create_receipt_result){
                                    $window.location.href = 'pointofsale';
                                })
                            }
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = data.msg;	
                        NumpadAlertOk('cashin_first', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                })
            }else{
                $("#dialog-numpad-passcode").jqxWindow('close');	
                var msg = 'Invalid code';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })	 
            }
        })
    })

    /* Back to main */
    $scope.BacktoMain = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled":true});
                FunctionButton = 'BackOffice';  
                NumpadPasscode('OfficeEnterPassCode')	
                .then(function(){
                    WindowPopupPasscode('Back Office | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    })
                    setTimeout(function(){
                        $(".newsale").attr({"disabled":false}); 
                    },1000);  
                })
                $scope.$broadcast('BackOffice');
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('backtomain_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / BacktoMain');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('backtomain_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / BacktoMain');	
                });		
            }
        }).finally(function(){
            //console.log("finally finished repos");
        })
    };
    /* End */
	
    /* Cash In  Old way */
	$(document).on('submit', '#EnterCashInPasscode', function(e){
        e.preventDefault();
        var PopupPasscodeId = 2;
        $scope.cashtype = {
            ctype: 1
        };
        var passcode = $("#number_field").val();
        var hashpasscode = CryptoJS.MD5(passcode);
        var store_unique_id;
        var postdata='';
        posData.getLoggedInformationCashIn()
        .success(function(result){
            store_unique_id = result.storeunique;
            postdata ="passcode="+hashpasscode;
            postdata+="&FunctionButton="+FunctionButton;
            var matched = false;
            var username = '';
            posData.CheckUserCashierCashIn(postdata)
            .success(function(userdata){
                 if(userdata.success == true){
                    if(userdata.login == true){
                        var newuser = userdata.userid;
                        posData.CashInCheck()
                        .success(function(cashindata){
                            if(cashindata.success == true){
                                var cashin_user_unique = cashindata.userunique;
                                username = cashindata.cashiername;

                                if(newuser == cashin_user_unique){
                                    matched = true;
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = username + ' already Cashed In';	
                                    NumpadAlertOk('cashed_in', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }
                            }else{
                                matched = true;
                            }

                            if(matched == true) {
                                var postdata ="code="+hashpasscode;
                                posData.TimeClockCashInPasscode(postdata)
                                .success(function (datainfo){
                                    if(datainfo.success == false) {
                                         $("#dialog-numpad-passcode").jqxWindow('close');	
										 var msg = 'Invalid code';	
										 NumpadAlertOk('invalid_passcode', msg)
										 .then(function(){
											 WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
										 })
                                     }else{
                                         var date = new Date();
                                         // Find Clock In if already exist then update
                                         // if not Create new.
                                         timeclock_message = '';
                                         var postdata = "user_unique=" + datainfo.data.Unique;
                                             postdata+= "&status="+1;
                                         posData.TimeClockCheck(postdata)
										 .success(function (datacheck) {
											 if(datacheck.status == 0) {
												$("#dialog-numpad-passcode").jqxWindow('close');
												if($scope.ClockInCheck == 1){
													$("#dialog-numpad-passcode").jqxWindow('close');	
													var msg = 'Please Clock In first';	
													NumpadAlertOk('clock_in_first', msg)
													.then(function(){
														WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
													})
												}else{
                                                    posData.CheckCashDrawerMutipleCashIn()
                                                    .success(function(result){
                                                        if(result.Setting == true){
                                                            if(result.CashDrawerSetup == true){
                                                                NumpadPriceChange('SaveAmountCashIn')
                                                                .then(function(){
                                                                    WindowPopupPriceChange('Cash In')
                                                                    .then(function(){
                                                                        $("#number_field").val('0.00');
                                                                        $("#number_field").focus();
                                                                        setTimeout(function(){
                                                                            $("#number_field").select();
                                                                        },100);
                                                                    })
                                                                })
                                                            }else{
                                                                posData.CashDrawerOptionCashIn()
                                                                .success(function(result2){
                                                                    CashierDrawerView('cash_drawer_setup_by_cashin', result2.html)
                                                                    .then(function(){
                                                                        WindowPopupCashierDrawer('Cash Drawer');
                                                                    })
                                                                }).catch(function(result2){
                                                                    if(LogDisplay == 1){
                                                                        var msg = result2.data+'<br/>'
                                                                            msg+= notifyMessage;
                                                                        NumpadAlertCloseReport('CashDrawerOptionCashIn_error', msg)
                                                                        .then(function(){
                                                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionCashIn / EnterCashInPasscode');
                                                                        });
                                                                    }else{
                                                                        var msg = 'Technical issue '+'<br/>'
                                                                            msg+= notifyMessage;
                                                                        NumpadAlertCloseReport('CashDrawerOptionCashIn_error', msg)
                                                                        .then(function(){
                                                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionCashIn / EnterCashInPasscode');	
                                                                        });		
                                                                    }
                                                                }).finally(function() {     

                                                                })
                                                            }
                                                        }else{
                                                            NumpadPriceChange('SaveAmountCashIn')
                                                            .then(function(){
                                                                WindowPopupPriceChange('Cash In')
                                                                .then(function(){
                                                                    $("#number_field").val('0.00');
                                                                    $("#number_field").focus();
                                                                    setTimeout(function(){
                                                                        $("#number_field").select();
                                                                    },100);
                                                                })
                                                            })
                                                        }
                                                    }).catch(function(result){
                                                        if(LogDisplay == 1){
                                                            var msg = result.data+'<br/>'
                                                                msg+= notifyMessage;
                                                            NumpadAlertCloseReport('CheckCashDrawerMutipleCashIn_error', msg)
                                                            .then(function(){
                                                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCashDrawerMutipleCashIn / EnterCashInPasscode');
                                                            });
                                                        }else{
                                                            var msg = 'Technical issue '+'<br/>'
                                                                msg+= notifyMessage;
                                                            NumpadAlertCloseReport('CheckCashDrawerMutipleCashIn_error', msg)
                                                            .then(function(){
                                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCashDrawerMutipleCashIn / EnterCashInPasscode');	
                                                            });		
                                                        }
                                                        
                                                    }).finally(function() {     

                                                    })
												}
													 
											 } else {
                                                $("#dialog-numpad-passcode").jqxWindow('close');
                                                posData.CheckCashDrawerMutipleCashIn()
                                                .success(function(result){
                                                    if(result.Setting == true){
                                                        if(result.CashDrawerSetup == true){
                                                            NumpadPriceChange('SaveAmountCashIn')
                                                            .then(function(){
                                                                WindowPopupPriceChange('Cash In')
                                                                .then(function(){
                                                                    $("#number_field").val('0.00');
                                                                    $("#number_field").focus();
                                                                    setTimeout(function(){
                                                                        $("#number_field").select();
                                                                    },100);
                                                                })
                                                            })
                                                        }else{
                                                            posData.CashDrawerOptionCashIn()
                                                            .success(function(result2){
                                                                CashierDrawerView('cash_drawer_setup_by_cashin', result2.html)
                                                                .then(function(){
                                                                    WindowPopupCashierDrawer('Cash Drawer');
                                                                })
                                                            }).catch(function(result2){
                                                                if(LogDisplay == 1){
                                                                    var msg = result2.data+'<br/>'
                                                                        msg+= notifyMessage;
                                                                    NumpadAlertCloseReport('CashDrawerOptionCashIn_error', msg)
                                                                    .then(function(){
                                                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionCashIn / EnterCashInPasscode');
                                                                    });
                                                                }else{
                                                                    var msg = 'Technical issue '+'<br/>'
                                                                        msg+= notifyMessage;
                                                                    NumpadAlertCloseReport('CashDrawerOptionCashIn_error', msg)
                                                                    .then(function(){
                                                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionCashIn / EnterCashInPasscode');	
                                                                    });		
                                                                }
                                                            }).finally(function() {     

                                                            })
                                                        }
                                                    }else{
                                                        NumpadPriceChange('SaveAmountCashIn')
                                                        .then(function(){
                                                            WindowPopupPriceChange('Cash In')
                                                            .then(function(){
                                                                $("#number_field").val('0.00');
                                                                $("#number_field").focus();
                                                                setTimeout(function(){
                                                                    $("#number_field").select();
                                                                },100);
                                                            })
                                                        })
                                                    }
                                                }) 
											 }
										 }).catch(function(datacheck){
                                            if(LogDisplay == 1){
                                                var msg = datacheck.data+'<br/>'
                                                    msg+= notifyMessage;
                                                NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                                .then(function(){
                                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / EnterCashInPasscode');
                                                });
                                            }else{
                                                var msg = 'Technical issue '+'<br/>'
                                                    msg+= notifyMessage;
                                                NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                                .then(function(){
                                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / EnterCashInPasscode');	
                                                });		
                                            }
                                            
                                        }).finally(function() {     

                                        })
                                     }
                                 }).catch(function(datainfo){
                                    if(LogDisplay == 1){
                                        var msg = datainfo.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('TimeClockCashInPasscode_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCashInPasscode / EnterCashInPasscode');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;	
                                        NumpadAlertCloseReport('TimeClockCashInPasscode_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCashInPasscode / EnterCashInPasscode');	
                                        });	
                                    }
                                    
                                }).finally(function() {     

                                })
                             }
                         }).catch(function(cashindata){
                            if(LogDisplay == 1){
                                var msg = cashindata.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('CashInCheck_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashInCheck / EnterCashInPasscode');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;	
                                NumpadAlertCloseReport('CashInCheck_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashInCheck / EnterCashInPasscode');	
                                });	
                            }
                            
                        }).finally(function() {     

                        })
                     }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = userdata.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                     }     
                 }else{
					  $("#dialog-numpad-passcode").jqxWindow('close');	
					  var msg = 'Invalid code';	
					  NumpadAlertOk('invalid_passcode', msg)
					  .then(function(){
						 WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					  })
                 }
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CheckUserCashierCashIn_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckUserCashierCashIn / EnterCashInPasscode');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CheckUserCashierCashIn_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckUserCashierCashIn / EnterCashInPasscode');	
                    });		
                }
                
            }).finally(function() {     

            })
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getloggedInformationCashIn_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationCashIn / EnterCashInPasscode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getloggedInformationCashIn_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationCashIn / EnterCashInPasscode');	
                });		
            }
        })
	})

    $(document).on('click', "#cash_drawer_setup_by_cashin .button_proceed", function(e){
        e.preventDefault();
        var postdata="CashDrawerOption="+DrawerId;
        posData.SelectedCashDrawerCashIn(postdata)
        .success(function(result){
             $('#dialog-cash-drawer').jqxWindow('close');
             NumpadPriceChange('SaveAmount')
             .then(function(){
                WindowPopupPriceChange('Cash In')
                .then(function(){
                    $("#number_field").val('0.00');
                    $("#number_field").focus();
                    setTimeout(function(){
                        $("#number_field").select();
                    },100);
                })
            })
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SelectedCashDrawerCashIn_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawerCashIn / cash_drawer_setup_by_cashin');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SelectedCashDrawerCashIn_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawerCashIn / cash_drawer_setup_by_cashin');	
                });		
            }
            
        }).finally(function() {     

        })
    })

    $(document).on("click", "#cash_drawer_setup_by_cashin .button_q_cancel", function(e){
        e.preventDefault();
         $('#dialog-cash-drawer').jqxWindow('close');
    })
	
	var ProcessStationCashout = function(station_cunique, userunique){
		var def = $.Deferred();
        var postdata="station_cashier_unique="+station_cunique;
            postdata+="&UserUnique="+userunique;
		posData.InsertConfigPaymentsCashOut(postdata)
		.success(function(result){
			def.resolve();
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('InsertConfigPaymentsCashOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> InsertConfigPaymentsCashOut / ProcessStationCashout');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('InsertConfigPaymentsCashOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> InsertConfigPaymentsCashOut / ProcessStationCashout');	
                });	
            }
            ProcessStationCashout = 0;
        }).finally(function() {     

        })
		return def.promise();
	}

    var CashCountProcess = function(){
        var station_cashier_unique = $scope.station.cunique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
		ProcessStationCashout(station_cashier_unique)
		.then(function(){
            var postdata ="station_cashier_unique="+station_cashier_unique;
			$http({
				method: 'post',
				url: base_url + 'pos/receipt-payment/count/cashout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
           	    }
			}).success(function(result){
				if(result.Count > 0){
					$scope.rowUpWhen = false;
					$scope.rowDownWhen = false;
					var postdata = "StationCashierUnique="+station_cashier_unique;
					posData.CashCount(postdata) 
					.success(function(result2){
						$.each(result2, function(index, value){
							var payment_name = value.payment_name;
							var postdata="&calculated="+value.Total;
								postdata+="&In="+value.In;
								postdata+="&Out="+value.Out;
								postdata+="&Total="+value.Total;
                                postdata+="&payment_name="+value.payment_name;
                                postdata+="&StationCashierUnique="+station_cashier_unique;
							$http({
								method: 'POST',
								data: postdata,
								url: base_url + 'pos/cashier/cashout/update/cash-count',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).success(function(result3){
                                var postdata ="station_cashier_unique="+station_cashier_unique;
                                    postdata+="&payment_menu="+payment_menu;
								$http({
									method: 'POST',
                                    data: postdata,
                                    url: base_url + 'pos/cashier/cashout/cash-count/display',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
								}).success(function(result4){
									$scope.gridCashCount = {
										source: {
											localdata: result4
										}
									}

                                    $scope.AddCountedWhen = true;
									dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
									dialogCashCountForm.open();
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
									},100);
									$(".cash-count-totals").show();	
									$http({
										method: 'get',
										url: base_url+'pos/cashier/cashout/cash-count/totals'
									}).success(function(result5){
                                        gridCashCountTotals(result5);
									}).catch(function(result5){
                                        if(LogDisplay == 1){
                                            var msg = result5.data+'<br/>';
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');
                                            });
                                        }else{
                                            var msg = 'Technical issue '+'<br/>';
                                                msg+= notifyMessage;	
                                            NumpadAlertCloseReport('CashCountTotals_error', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCountTotals / CashCountProcess');	
                                            });	
                                        }
                                        
                                    }).finally(function() {     

                                    })
                                }).catch(function(result4){
                                    if(LogDisplay == 1){
                                        var msg = result4.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess');	
                                        });		
                                    }
                                    
                                }).finally(function() {
									
								})
							}).catch(function(result3){
                                if(LogDisplay == 1){
                                    var msg = result3.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess');	
                                    });		
                                }
                            }).finally(function() {     

                            })
						})//foreach
					}).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                            });	
                        }
                        
                    }).finally(function() {     

                    })
				}else{
                    var postdata ="station_cashier_unique="+station_cashier_unique;
                        postdata+="&payment_menu="+payment_menu;
					$http({
						method: 'POST',
                        data: postdata,
						//url: api_url+"cash-count/display/"+station_cashier_unique+"/"+payment_menu
                        url: base_url + 'pos/cashier/cashout/cash-count/display',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(data){
						$scope.gridCashCount = {
							source: {
								localdata: data
							}
						}
					}).then(function(){
						$scope.AddCountedWhen = true;
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
						dialogCashCountForm.open();
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
						},100);
						$(".cash-count-totals").show();	
						$http({
							method: 'get',
							url: base_url + 'pos/cashier/cashout/cash-count/totals'
						}).success(function(data){
                            gridCashCountTotals(data);
						})						
					})
				}
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;	
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess');	
                    });	
                }
               
            }).finally(function() {     

            })
		})
    }

    var CashCountProcess2 = function(){
        var station_cashier_unique = $scope.station.cunique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
		ProcessStationCashout(station_cashier_unique)
		.then(function(){
            var postdata ="station_cashier_unique="+station_cashier_unique;
			$http({
				method: 'POST',
				url: base_url + 'pos/receipt-payment/count/cashout',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
           	    }
			}).success(function(result){
				if(result.Count > 0){
					$scope.rowUpWhen = false;
					$scope.rowDownWhen = false;
					var postdata = "StationCashierUnique="+station_cashier_unique;
					posData.CashCount(postdata)
					.success(function(result2){
						$.each(result2, function(index, value){
							var payment_name = value.payment_name;
							var postdata="&calculated="+value.Total;
								postdata+="&In="+value.In;
								postdata+="&Out="+value.Out;
								postdata+="&Total="+value.Total;
                                postdata+="&payment_name="+value.payment_name;
                                postdata+="&StationCashierUnique="+station_cashier_unique;
							$http({
								method: 'POST',
								data: postdata,
								url: base_url + 'pos/cashier/cashout/update/cash-count',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).success(function(result3){
                                var postdata ="station_cashier_unique="+station_cashier_unique;
                                    postdata+="&payment_menu="+payment_menu;
								$http({
									method: 'POST',
                                    data: postdata,
                                    url: base_url + 'pos/cashier/cashout/cash-count/display',
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(result4){
                                    CashOutHide(result4)
                                    $scope.AddCountedWhen = true;
									dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
									dialogCashCountForm.open();
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
									},100);
                                    $(".cash-count-totals").hide();	
                                }).catch(function(result4){
                                    if(LogDisplay == 1){
                                        var msg = result4.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess2');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;	
                                        NumpadAlertCloseReport('CashCountDisplay_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCountDisplay / CashCountProcess2');	
                                        });	
                                    }
                                    
                                }).finally(function() {
									
								})
							}).catch(function(result3){
                                if(LogDisplay == 1){
                                    var msg = result3.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;	
                                    NumpadAlertCloseReport('UpdateCashCount_error', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');	
                                    });	
                                }
                                
                            }).finally(function() {     

                            })
						})//foreach
					}).catch(function(result2){
                        if(LogDisplay == 1){
                            var msg = result2.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('CashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');	
                            });	
                        }
                        
                    }).finally(function() {     

                    })
				}else{
                    var postdata ="station_cashier_unique="+station_cashier_unique;
                        postdata+="&payment_menu="+payment_menu;
					$http({
						method: 'POST',
                        data: postdata,
						url: base_url + 'pos/cashier/cashout/update/cash-count',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(result){
                        CashOutHide(result);
                        $scope.AddCountedWhen = true;
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
						dialogCashCountForm.open();
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
						},100);	
                        $(".cash-count-totals").hide();
					}).catch(function(result){
                        if(LogDisplay == 1){
                            var msg = result.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('UpdateCashCount_error', msg)
                            .then(function(){
                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('UpdateCashCount_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCount / CashCountProcess2');	
                            });	
                        }
                    }).finally(function() {
										
					})
				}
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>' 
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('CashCount_error', msg)
                    .then(function(){ 
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashCount / CashCountProcess2');	
                    });		
                }
                
            }).finally(function() {     

            })
		}) 
    }

    /* Cash Count */
    $scope.gridCashCount = {
        width: "100%",
        height: 250,
        sortable: true,
        altRows: true,
        theme: 'fresh',
        editable: false,
        showAggregates: true,
        columnsResize: true,
        source: {
            dataType: "json",
            dataFields: [
                {name: 'unique', type: 'int'},
                {name: 'payment_name',  type: 'string'},
                {name: 'calculated',  type: 'string'},
                {name: 'counted', type: 'string'},
                {name: 'totaldiff', type: 'string'}
            ],
            localdata: {},
        },
        columns: [
            {text: 'unique', dataField: 'unique', hidden: true},
            {text: 'Payment', dataField: 'payment_name', width: '40%'},
            {text: 'Sales', dataField: 'calculated', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
            {text: 'Counted', dataField: 'counted', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
                    renderString += Total + "</div>";
                    return renderString;
                }
            },
            {text: 'Difference', dataField: 'totaldiff', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
    /* End */
	

    var CashOutShow = function(data){
         $scope.gridCashCount = {
            width: "100%",
            height: 250,
            sortable: true,
            altRows: true,
            theme: 'fresh',
            editable: false,
            showAggregates: true,
            columnsResize: true,
            source: {
                dataType: "json",
                dataFields: [
                    {name: 'unique', type: 'int'},
                    {name: 'payment_name',  type: 'string'},
                    {name: 'calculated',  type: 'string'},
                    {name: 'counted', type: 'string'},
                    {name: 'totaldiff', type: 'string'}
                ],
                localdata: data,
            },
            columns: [
                {text: 'unique', dataField: 'unique', hidden: true},
                {text: 'Payment', dataField: 'payment_name', width: '40%'},
                {text: 'Sales', dataField: 'calculated', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
                {text: 'Counted', dataField: 'counted', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
                        renderString += Total + "</div>";
                        return renderString;
                    }
                },
                {text: 'Difference', dataField: 'totaldiff', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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

    var CashOutHide = function(data){
        $scope.gridCashCount = {
            width: "100%",
            height: 250,
            sortable: true,
            altRows: true,
            theme: 'fresh', 
            editable: false,
            showAggregates: true,
            columnsResize: true,
            source: {
                dataType: "json",
                dataFields: [
                    {name: 'unique', type: 'int'},
                    {name: 'payment_name',  type: 'string'},
                    {name: 'counted', type: 'string'},
                ],
                localdata: data,
            },
            columns: [
                {text: 'unique', dataField: 'unique', hidden: true},
                {text: 'Payment', dataField: 'payment_name', width: '80%'},
                {text: 'Counted', dataField: 'counted', width: '20%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
                        renderString += Total + "</div>";
                        return renderString;
                    }
                },
            ]
        }
    }

    var gridCashCountTotals = function(data=Array()){
        $scope.gridCashOutTotals = {
            width: "100%",
            height: 265,
            sortable: true,
            altRows: true,
            theme: 'fresh',
            editable: false,
            columnsResize: true,
            source: {
                dataType: "json",
                dataFields: [
                    {name: 'Label', type: 'string'},
                    {name: 'Totals',  type: 'string'}
                ],
                localdata: data,
            },
            columns: [
                {text: '', dataField: 'Label', width: '60%'},
                {text: 'Totals', dataField: 'Totals', width: '40%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2'}
            ]
        }
    }
    gridCashCountTotals();
	
    /* Old way */
	$(document).on('submit', '#EnterCashOutPasscode', function(e){
		e.preventDefault();
		var PopupPasscodeId = 3;
        $scope.cashtype = {
            ctype: 2
        };
        $scope.amt = {
        amount: 0
        };
        var passcode = $("#number_field").val();
        var hashpasscode = CryptoJS.MD5(passcode);

        var store_unique_id;
        posData.getLoggedInformationCashOut()
        .success(function(result){
            store_unique_id = result.storeunique;
            var postdata ="passcode="+hashpasscode;
               postdata+="&FunctionButton="+FunctionButton;
            $http({
                method: 'POST',
                url: base_url + 'pos/cashier/cashier-restrict/passcode/cashout',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(restrict){
                if(restrict.success == true){
                    if(restrict.login == true){
                        var date = new Date();
                        // Find Clock In if already exist then update
                        // if not Create new.
                        timeclock_message = '';
                        var postdata="user_unique="+restrict.userid;
                            postdata+="&status="+1;
                        posData.TimeClockCheck(postdata)
                        .success(function(datacheck){
                            if(datacheck.status == 0){
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                if($scope.ClockInCheck == 1){
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = 'Please Clock In first';	
                                    NumpadAlertOk('clock_in_first', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }else{
                                    LoadHeaderInfo();
                                    if($scope.CashOutBlind > 0){
                                        CashCountProcess2(); //Hide some Details
                                    }else{
                                        CashCountProcess(); //Show all Details
                                    }
                                }
                            }else{
                                var postdata="passcode="+hashpasscode;
                                    postdata+="&cashtype=2";
                                posData.EnterPassCodeCashOut(postdata)
                                .success(function(result){
                                    if(result.success == true){
                                        $("#dialog-numpad-passcode").jqxWindow("close");
                                        LoadHeaderInfo();
                                        if($scope.CashOutBlind > 0){
                                            CashCountProcess2(); //Hide some Details
                                        }else{
                                            CashCountProcess(); //Show all Details
                                        }
                                    }else{
                                        $("#dialog-numpad-passcode").jqxWindow("close");
                                        var msg = 'Invalid code';	
                                        NumpadAlertOk('invalid_passcode', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        })
                                    }
                                }).catch(function(result){
                                    if(LogDisplay == 1){
                                        var msg = result.data+'<br/>';
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('EnterPassCodeCashOut_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> EnterPassCodeCashOut / EnterCashOutPasscode');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('EnterPassCodeCashOut_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> EnterPassCodeCashOut / EnterCashOutPasscode');	
                                        });		
                                    }
                                    
                                }).finally(function() {
                                
                                })
                            }
                        }).catch(function(datacheck){
                            if(LogDisplay == 1){
                                var msg = datacheck.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / EnterCashOutPasscode');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / EnterCashOutPasscode');	
                                });		
                            }
                            
                        }).finally(function() {

                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        var msg = restrict.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
					var msg = 'Invalid code';	
					NumpadAlertOk('invalid_passcode', msg)
					.then(function(){
					   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					})
                }
            }).catch(function(restrict){
                if(LogDisplay == 1){
                    var msg = restrict.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('passcode_cashout_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PassCodeCashOut / EnterCashOutPasscode');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;	
                    NumpadAlertCloseReport('passcode_cashout_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PassCodeCashOut / EnterCashOutPasscode');	
                    });	
                }
                
            }).finally(function() { 

            }) 
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformationCashOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationCashOut / EnterCashOutPasscode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformationCashOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationCashOut / EnterCashOutPasscode');	
                });		
            }
            
        }).finally(function() { 
           
        })   
	})

    $scope.TimeClock = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true});
                FunctionButton = 'TimeClock';
                NumpadPasscode('ClockEnterPassCode')	
                .then(function(){
                WindowPopupPasscode('Clock In and Out')
                .then(function(){
                    $("#number_field").focus();
                    setTimeout(function(){
                        $(".newsale").attr({"disabled": false});
                    },1000);
                })  
                })
                $scope.$broadcast("focusTimeClock");
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / TimeClock');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / TimeClock');	
                });		
            }
        }).finally(function() { 

        })
    };
	
	var globalTimeclockMsgResult = '';
    var globalTimeclockUnique = '';
    var globalTimeclockpostdata = '';
    var globalPrintTimeclockCheck = '';
	$(document).on('submit', '#ClockEnterPassCode', function(e){
		e.preventDefault();
		var store_unique_id;
        posData.getLoggedInformation()
        .success(function(result){
            store_unique_id = result.storeunique;
            var CardRead = $("#number_field").val();
            var CRP = new CardReaderParser(CardRead);
            if(CRP.converted){
                var passcode = CRP.converted;//$("#number_field").val();
                var hashpasscode = CryptoJS.MD5(passcode);
                var postdata = "passcode="+hashpasscode;
                    postdata+= "&FunctionButton="+FunctionButton;
                posData.RestrictionPasscode(postdata)
                .success(function(restrict){
                    if(restrict.success == true){
                        if(restrict.login == true){
                            var date = new Date();
                            // Find Clock In if already exist then update
                            // if not Create new.
                            timeclock_message = '';
                            var postdata="user_unique="+restrict.userid;
                                postdata+="&status=1";
                            posData.TimeClockCheck(postdata)
                            .success(function(datacheck){
                                if(datacheck.status == 0){
                                    var postdata ="user_unique="+restrict.userid;
                                        postdata+="&user_name="+restrict.username;
                                    posData.TimeClockSave(postdata)
                                    .success(function(saveRes){
                                        globalTimeclockUnique = saveRes.Unique;
                                        var hours = date.getHours();
                                        var minutes = date.getMinutes();
                                        var ampm = hours >= 12 ? 'PM' : 'AM';                    
                                        if(datacheck.ClockInComment == 1){
                                            if(datacheck.VirtualKeyboard == 1){
                                                NumpadKeyboard('vk_timeclockin_comment')
                                                .then(function(){
                                                    WindowPopupKeyboard('Time clock comment')
                                                    .then(function(){
                                                        $("#keyboard_header").text("Time Clock Comment");
                                                        $("#search_field").focus();
                                                        setTimeout(function(){
                                                            globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                            globalTimeclockMsgResult+= '<div align="center" style="color:#FF0000;">Clock In</div>';		
                                                            $("#search_field").select();
                                                        },100);
                                                    });
                                                });
                                            }else{
                                                CommentBox('timeclockin_comment', saveRes.Unique)
                                                .then(function(){
                                                    WindowComment('Time clock Comment')
                                                    .then(function(){
                                                        globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                        globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                        globalTimeclockMsgResult+= '<div align="center" style="color:#FF0000;">Clock In</div>';		
                                                        $("#text_field").focus(); 
                                                    })
                                                })
                                            }
                                        }else{
                                            var msg = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                msg+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                msg+= '<div align="center" style="color:#FF0000;">Clock In</div>';				
                                            NumpadAlertOk('time_clock_out', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                                            });
                                        }
                                    }).catch(function(saveRes){
                                        if(LogDisplay == 1){
                                            var msg = saveRes.data+'<br/>'
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('time_clock_save_error', msg)
                                            .then(function(){
                                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClock');
                                            });
                                        }else{
                                            var msg = 'Technical issue '+'<br/>'
                                                msg+= notifyMessage;
                                            NumpadAlertCloseReport('time_clock_save_error', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClock');	
                                            });			
                                        }
                                    }).finally(function() {
                                        //console.log("finally finished repos");
                                    })

                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                }else{
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'PM' : 'AM';

                                    if(datacheck.ClockInComment == 1){
                                        if(datacheck.VirtualKeyboard == 1){
                                            var postdata ="Unique="+datacheck.data.Unique;
                                                postdata+="&DateIn="+datacheck.data.DateIn;
                                                postdata+="&TimeIn="+datacheck.data.TimeIn;
                                            posData.TimeClockUpdate(postdata)
                                            .success(function(result){
                                                globalTimeclockUnique = datacheck.data.Unique;
                                                NumpadKeyboard('vk_timeclockout_comment')
                                                    .then(function(){
                                                    WindowPopupKeyboard('Time clock comment')
                                                    .then(function(){
                                                        $("#keyboard_header").text("Time Clock Comment");
                                                        $("#search_field").focus();
                                                        setTimeout(function(){
                                                            globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';						
                                                            globalTimeclockMsgResult+= '<div align="center" style="color:#FF0000;">Clock Out</div>';	
                                                            globalTimeclockpostdata ="Unique="+datacheck.data.Unique;
                                                            globalTimeclockpostdata+="&DateIn="+datacheck.data.DateIn;
                                                            globalTimeclockpostdata+="&TimeIn="+datacheck.data.TimeIn;	
                                                            $("#search_field").select();
                                                        },100);
                                                    });
                                                });
                                            }).catch(function(result){
                                                if(LogDisplay == 1){
                                                    var msg = result.data+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');
                                                    });
                                                }else{
                                                    var msg = 'Technical issue '+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');	
                                                    });		
                                                }
                                                
                                            }).finally(function() {    

                                            })
                                        }else{
                                            var postdata ="Unique="+datacheck.data.Unique;
                                                postdata+="&DateIn="+datacheck.data.DateIn;
                                                postdata+="&TimeIn="+datacheck.data.TimeIn;
                                            posData.TimeClockUpdate(postdata)
                                            .success(function(result){
                                                globalPrintTimeclockCheck = datacheck.data.Unique;
                                                CommentBox('timeclockout_comment', datacheck.data.Unique)
                                                .then(function(){
                                                    WindowComment('Time clock Comment')
                                                    .then(function(){
                                                            globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';						
                                                            globalTimeclockMsgResult+= '<div align="center" style="color:#FF0000;">Clock Out</div>';		
                                                            globalTimeclockpostdata ="Unique="+datacheck.data.Unique;
                                                            globalTimeclockpostdata+="&DateIn="+datacheck.data.DateIn;
                                                            globalTimeclockpostdata+="&TimeIn="+datacheck.data.TimeIn;	
                                                        $("#text_field").focus(); 
                                                    })
                                                })
                                            }).catch(function(result){
                                                if(LogDisplay == 1){
                                                    var msg = result.data+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');
                                                    });
                                                }else{
                                                    var msg = 'Technical issue '+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');	
                                                    });		
                                                }
                                                
                                            }).finally(function() {    
                                                
                                            })
                                        }
                                    }else{
                                        var msg = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                            msg+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';						
                                            msg+= '<div align="center" style="color:#FF0000;">Clock Out</div>';							
                                        NumpadAlertOk('time_clock_out', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                                        });

                                        var postdata ="Unique="+datacheck.data.Unique;
                                            postdata+="&DateIn="+datacheck.data.DateIn;
                                            postdata+="&TimeIn="+datacheck.data.TimeIn;
                                        posData.TimeClockUpdate(postdata)
                                        .success(function(result){
                                            console.log("TimeClock Out: "+result);
                                            if( $("#ClockOutPrint").val() == 1 ){
                                                PrinterCheckTimeClock(datacheck.data.Unique);
                                            }
                                        }).catch(function(result){
                                            if(LogDisplay == 1){
                                                var msg = result.data+'<br/>'
                                                    msg+= notifyMessage;
                                                NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                .then(function(){
                                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');
                                                });
                                            }else{
                                                var msg = 'Technical issue '+'<br/>'
                                                    msg+= notifyMessage;
                                                NumpadAlertCloseReport('TimeClockUpdate_error', msg)
                                                .then(function(){
                                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockUpdate / ClockEnterPassCode');	
                                                });		
                                            }
                                            
                                        }).finally(function() {    
                                            
                                        })
                                    }
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                }
                            }).catch(function(datacheck){
                                if(LogDisplay == 1){
                                    var msg = datacheck.data+'<br/>'
                                        msg+= notifyMessage;
                                    NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                    .then(function(){
                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / ClockEnterPassCode');
                                    });
                                }else{
                                    var msg = 'Technical issue '+'<br/>'
                                        msg+= notifyMessage;	
                                    NumpadAlertCloseReport('TimeClockCheck_error', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> TimeClockCheck / ClockEnterPassCode');	
                                    });	
                                }
                                
                            }).finally(function() {    

                            })
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow('close');	
                            var msg = restrict.msg;	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            }) 
                        }
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = 'Invalid code';	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }).catch(function(restrict){
                    if(LogDisplay == 1){
                        var msg = restrict.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('RestrictionPassCode_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPassCode / ClockEnterPassCode');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;	
                        NumpadAlertCloseReport('RestrictionPassCode_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPassCode / ClockEnterPassCode');	
                        });	
                    }
                    
                }).finally(function() {
                
                })
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                var msg = 'Passcode cannot be empty';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformation_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformation / ClockEnterPassCode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformation_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformation / ClockEnterPassCode');	
                });		
            }
            
        }).finally(function() {
            
        })
	})
	
    $(document).on('submit', '#OfficeEnterPassCode', function(e){
		e.preventDefault();
		var store_unique_id;
        posData.getLoggedInformation()
        .success(function(result){
            store_unique_id = result.storeunique;
            var CardRead = $("#number_field").val();
            var CRP = new CardReaderParser(CardRead);
            if(CRP.converted){
                var passcode = CRP.converted;//$("#number_field").val();
                var hashpasscode = CryptoJS.MD5(passcode);
                var postdata ="passcode="+hashpasscode;
                    postdata+="&FunctionButton="+FunctionButton;
                posData.RestrictionPasscode(postdata)
                .success(function(result2) {
                    if (result2.success == false) {
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = result2.msg;	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                    } else {
                        if(result2.success == true && result2.login == true){
                            $window.location.href = 'dashboard';
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow('close');	
                            var msg = result2.msg;	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                    }
                }).catch(function(result2){
                    if(LogDisplay == 1){
                        var msg = result2.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('RestrictionPasscode_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscode / OfficeEnterPassCode');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('RestrictionPasscode_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscode / OfficeEnterPassCode');	
                        });		
                    }
                    
                }).finally(function() {
                
                })
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                var msg = 'Passcode cannot be empty';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformation_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformation / OfficeEnterPassCode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformation_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformation / OfficeEnterPassCode');	
                });		
            }
            
        }).finally(function() {
            
        })
	})

	var column = 0;
	var rows = 0;
	var layout = '';
	
	var PreLoadTables = function(){
		
		posData.GetColumnCount()
		.success(function(cols){
			column = cols.ColCount;
			rows = cols.RowCount;
			layout = cols.TableLayout;
			$("#LoadTables").html('');
			console.log("Start "+1+"-"+1);
			LoadTables(1, 1);	
		})
		
		
		/*
		Tabledialog.setTitle('Tables');
		Tabledialog.open();
		*/
	}
	
	var LoadTables = function(col, row){
		var newcol = layout.replace("colcount", col);
		$("#LoadTables").append(newcol);
		if(col != column){
			console.log("LoadTables "+col+"-"+row);
			LoadButtons(col, row);
		}else{
			//LoadLastCol(col, rows);
			Tabledialog.setTitle('Tables');
			Tabledialog.open();
		}
	}
	
	var LoadButtons = function(col, row){
		if(row == rows){
			$("#"+col).append("</div>");
			newcolumn = col + 1;
			row = 1;
			console.log("LoadButtons end "+newcolumn+"-"+row);
			LoadTables(newcolumn, row);
		}else{
			var postdata="colno="+col;
				postdata+="&row="+row;
            posData.GetConfigTables(postdata)
            .success(function(result){
                console.log("LoadButtons find "+col+"-"+row);
                test(result, col, row);
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('GetConfigTables_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> GetConfigTables / LoadButtons');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('GetConfigTables_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> GetConfigTables / LoadButtons');	
                    });		
                }
                
            }).finally(function() {
            
            })
		}
	}
	
	var test = function(data, col, row){
		conf_tables = data.results;
		if(data.success == true){
			if(conf_tables.Status == 1){
				$("#"+col).append('<button id="'+conf_tables.Unique+'" class="fndesign_table_button tablebutton_active">'+conf_tables.TableName+'</button>');	
			}else if(conf_tables.Status == 2){
				$("#"+col).append('<div class="fndesign_table_button tablebutton_inactive">'+conf_tables.TableName+'<br/>Receipt#<br/>'+conf_tables.ReceiptNumber+'</div>');
			}
		}else{
			$("#"+col).append("<div class='fndesign tablebutton_empty'>"+col+"</div>");
		}
		newrow = row + 1;
		console.log("test "+col+" "+newrow);
		LoadButtons(col, newrow);
	}
	
	var LoadTables_old = function(){
		var def = new $.Deferred();
		
		var Store = [];
		
		posData.GetColumnCount()
		
		.success(function(cols){
			
			$("#LoadTables").html('');
			
			for(var col=1; col <= cols.ColCount; col++){
				var newcol = cols.TableLayout.replace("colcount", col);
				$("#LoadTables").append(newcol);
				
				for(var r=1; r <= cols.RowCount; r++){
					var postdata="colno="+col;
					postdata+="&row="+r;
					posData.GetConfigTables(postdata)
					.success(function(data){
						if(data.success == true){
							conf_tables = data.results;
							if(conf_tables.Status == 1){
								$("#"+col).append('<button id="'+conf_tables.Unique+'" class="fndesign_table_button tablebutton_active">'+conf_tables.TableName+'</button>');	
							}else if(conf_tables.Status == 2){
								$("#"+col).append('<div class="fndesign_table_button tablebutton_inactive">'+conf_tables.TableName+'<br/>Receipt#<br/>'+conf_tables.ReceiptNumber+'</div>');
							}
						}else{
							$("#"+col).append("<div class='fndesign tablebutton_empty'></div>");
						}
					})
				}
				def.resolve();
				$("#"+col).append("</div>");
				
			}
			$("#LoadTables").append("</div>");
			
		});
		
		return def.promise();
	}

	
	var LoadButtons_old = function(cols, col){
		var def = new $.Deferred();
			for(var r=1; r <= cols.RowCount; r++){
				var postdata="colno="+col;
				postdata+="&row="+r;
				posData.GetConfigTables(postdata)
				.success(function(data){
					if(data.success == true){
						conf_tables = data.results;
						if(conf_tables.Status == 1){
							$("#"+col).append('<button id="'+conf_tables.Unique+'" class="fndesign_table_button tablebutton_active">'+conf_tables.TableName+'</button>');	
						}else if(conf_tables.Status == 2){
							$("#"+col).append('<div class="fndesign_table_button tablebutton_inactive">'+conf_tables.TableName+'<br/>Receipt#<br/>'+conf_tables.ReceiptNumber+'</div>');
						}
					}else{
						$("#"+col).append("<div class='fndesign tablebutton_empty'></div>");
					}
				})
				def.resolve();
			}
		return def.promise();
	}
	
	$("#LoadTables").on('click', 'button', function(){
		var TableId = $(this).attr("id");
		$scope.TableNo = TableId;
		posData.CashOutDisabled()
        .success(function(data){
            if(data.success == true){
                dialogentercode.setTitle("New Sale | Table "+TableId+" | Enter Passcode");
                dialogentercode.open();
            }else{
				var msg = "Please cash in first"
				NumpadAlertOk('invalid_passcode', msg)
				.then(function(){
					WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
				})
            }
            $scope.$broadcast('NewSale');
        })
	})
		
	$scope.TableOrderCancel = function(){
		$("#dialog-numpad-table").jqxWindow('close');
	}

	$scope.TableOrder = function(id, type){
		$scope.TableNo = id;
		$scope.TableOrderType = type;
		posData.CashOutDisabled()
        .success(function(data){
            if(data.success == true){
				NumpadPasscode('EnterPasscode')	
			    .then(function(){
				   WindowPopupPasscode('New Sale | Table '+id+' | Enter Passcode')
				   .then(function(){
					 	$("#number_field").focus();
				   })  
			    })	
				
            }else{
				var msg = "Please cash in first"
				NumpadAlertOk('invalid_passcode', msg)
				.then(function(){
					WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
				})
            }
            $scope.$broadcast('NewSale');
        })
	}

	$scope.TableOpen = function(id, unique, type){
		$scope.TableNo = id;
		$scope.ReceiptHeaderUnique = unique;
		$scope.TableOrderType = type;
		posData.CashOutDisabled()
        .success(function(data){
            if(data.success == true){
                //dialogentercode.setTitle("New Sale | Table "+id+" | Enter Passcode");
                //dialogentercode.open();
				NumpadPasscode('EnterPasscode')	
			    .then(function(){
				  	WindowPopupPasscode('New Sale | Table '+id+' | Enter Passcode')
				  	.then(function(){
						$("#number_field").focus();
				  	})  
			    })	
            }else{
				var msg = 'Please cash in first.';
                NumpadAlertOk('printer_error', msg)
				.then(function(){
				   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
				})
            }
            $scope.$broadcast('NewSale');
        })
	}

    $scope.CashOutCancel = function(){
        DownCount = 0;
        CountCount = 0;
        dialogCashCountForm.close();
    }

    $scope.CashCountButtonPosNega = function(){
        $scope.CashCount = {
            Amount: $scope.CashCount.Amount * -1
        }
    }

    /* Cash In Numpad Buttons */
    $scope.CashCountButton = function(val){
        if(exAmount){
            $scope.CashCount = {
                Amount: ''
            };
            exAmount='';
        }
        $scope.CashCount = {
            Amount: $scope.CashCount.Amount + '' + val
        };
    };
    /* End */

    $scope.CashCountKeyPadClear = function(){
        $scope.CashCount = {
            Amount: 0
        }
    }

    var DownCount = 0;
    var CountCount = 0;

    $scope.rowClickCashCount = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $scope.cashcount = {
            rows: row.unique
        };
        $scope.AddCountedWhen = false;
        DownCount = index;
        CountCount = DownCount + 1;
        console.log(row.unique);
    }

    $scope.AddCounted = function(){
        var station_cashier_unique = $scope.station.cunique;
        var counted_typed = $scope.CashCount.Amount;
        var stccunique = $scope.cashcount.rows;
        var postdata ="counted="+ counted_typed;
            postdata+="&stccunique="+stccunique;
        posData.UpdateCashCounted(postdata)
		.success(function (result) {
            if(result.success == true){
                $scope.CashCount = {
                    Amount: 0
                }
                $scope.cashcount = {
                    rows: 0
                }
            }

            var postdata ="StationCashierUnique="+station_cashier_unique;
			    postdata+="&PaymentMenu="+$scope.PaymentMenu;
            $http({
				method: 'POST',
                data: postdata,
				url: base_url + "pos/cashier/cash-count/display",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data) {
				$scope.gridCashCount = {
					source: {
						localdata: data
					}
				}

                $http({
					method: 'get',
					url: base_url+'pos/cash-count/totals'
				}).success(function(result2){
					$scope.gridCashOutTotals = {
						source: {
							localdata: result2 
						}
					}
				}).catch(function(result2){
                    if(LogDisplay == 1){
                        var msg = result2.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cashcountotals_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> cashcounttotals / AddCounted');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cashcountotals_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> cashcounttotals / AddCounted');	
                        });		
                    }
                    
                }).finally(function() {	

                })
			}).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('cashcountdisplay_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> cashcountdisplay / AddCounted');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;		
                    NumpadAlertCloseReport('cashcountdisplay_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> cashcountdisplay / AddCounted');	
                    });
                }
                
            }).finally(function() {
				
			})
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>';
                    msg+= notifyMessage;
                NumpadAlertCloseReport('UpdateCashCounted_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCounted / AddCounted');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('UpdateCashCounted_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UpdateCashCounted / AddCounted');	
                });		
            }
            
        }).finally(function() {
            
        })
        $scope.AddCountedWhen = true;
        DownCount = 0;
        CountCount = 0;
    }


    $scope.rowUp = function(){
        //DownCount = DownCount - 1;
        //CountCount = CountCount - 1;
        $("#datagridCashCount").jqxDataTable('selectionMode', 'singlerow');
        if(DownCount != 0){
            CountCount = CountCount - 1;
            DownCount = DownCount - 1;
            $("#datagridCashCount").jqxDataTable('selectRow', DownCount);
            var selection = $('#datagridCashCount').jqxDataTable('getSelection');
            for (var i = 0; i < selection.length; i++) {
                // get a selected row.
                var rowData = selection[i];
            }
            $scope.cashcount = {
                rows: rowData.unique
            }
            console.log(rowData.unique);
            console.log("CountCount: "+CountCount);
            console.log("DownCount: "+DownCount);
        }else{
            DownCount = 0;
            CountCount = 1;
            $("#datagridCashCount").jqxDataTable('selectRow', DownCount);
            var selection = $('#datagridCashCount').jqxDataTable('getSelection');
            for (var i = 0; i < selection.length; i++) {
                // get a selected row.
                var rowData = selection[i];
            }
            $scope.cashcount = {
                rows: rowData.unique
            }
            console.log("CountCount: "+CountCount);
            console.log("DownCount: "+DownCount);
        }
        $scope.AddCountedWhen = false;
    }


    $scope.rowDown = function(){
        $("#datagridCashCount").jqxDataTable('selectionMode', 'singlerow');
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
        var RowCount = rows.length;
        if(CountCount != RowCount){
            CountCount = CountCount + 1;
            console.log("CountCount: "+CountCount);
            if(CountCount > 1){
                DownCount = DownCount + 1;
                console.log("DownCount: "+DownCount);
            }else{
                DownCount = 0;
                console.log("DownCount: "+DownCount);
            }
            $("#datagridCashCount").jqxDataTable('selectRow', DownCount);
            var selection = $('#datagridCashCount').jqxDataTable('getSelection');
            for (var i = 0; i < selection.length; i++) {
                // get a selected row.
                var rowData = selection[i];
            }
            $scope.cashcount = {
                rows: rowData.unique
            }
            console.log(rowData.unique);
        }else{
            CountCount = RowCount;
            console.log("CountCount: "+CountCount);
            console.log("DownCount: "+DownCount);
        }
        $scope.AddCountedWhen = false;
    }

    /*
    |----------------------------------------------------------------------------|
    | Cash Count Cash Out Button
    |----------------------------------------------------------------------------|
    */
    var populateCashCountCashOut = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#cashier_cashout_q").append('<div id="cashier_cashcount_container"></div>');
            $("#cashier_cashcount_container").html('');
            $("#cashier_cashcount_container").append(
                $compile(
                '<div class="container-fluid">'+
                    '<div style="float: left; margin-bottom: 5px;"><span>Changes cannot be made after Cash Out.</span></div>'+
                    '<br/>'+
                    '<br/>'+
                    '<div style="float: left;">'+
                        '<button class="btn btn-warning btn-lg" ng-click="FinalCashOutServerCancel()">Cancel</button>&nbsp;&nbsp;'+
                        '<button class="btn btn-info btn-lg" ng-click="FinalCashOutServer()">Cash Out</button>'+
                    '</div>'+
                '</div>'
                )
                ($scope)
            );
            def.resolve();
        },100)
        return def.promise();
    }

    var WindowCashCountCashOut = function(title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#cashier_cashout_q").jqxWindow({
                height: 215,
                width: 330,
                title: title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#cashier_cashout_q').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    var CashCountCashOut = function(){
        var def = $.Deferred();
        populateCashCountCashOut()
        .then(function(){
            def.resolve();
        });
        return def.promise();
    }


    /*
    |-------------------------------------------------------------------------
    | Cash Out by Station
    |-------------------------------------------------------------------------
    */
    var populateCashCountCashOutStation = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#cashier_cashout_q").append('<div id="cashier_cashcount_container"></div>');
            $("#cashier_cashcount_container").html('');
            $("#cashier_cashcount_container").append(
                $compile(
                '<div class="container-fluid">'+
                    '<div style="float: left; margin-bottom: 5px;"><span>Changes cannot be made after Cash Out.</span></div>'+
                    '<br/>'+
                    '<br/>'+
                    '<div style="float: left;">'+
                        '<button class="btn btn-warning btn-lg" ng-click="FinalCashOutStationCancel()">Cancel</button>&nbsp;&nbsp;'+
                        '<button class="btn btn-info btn-lg" ng-click="FinalCashOutStation()">Cash Out</button>'+
                    '</div>'+
                '</div>'
                )
                ($scope)
            );
            def.resolve();
        },100)
        return def.promise();
    }

    var WindowCashCountCashOutStation = function(title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#cashier_cashout_q").jqxWindow({
                height: 215,
                width: 330,
                title: title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#cashier_cashout_q').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    var CashCountCashOutStation = function(){
        var def = $.Deferred();
        populateCashCountCashOutStation()
        .then(function(){
            def.resolve();
        });
        return def.promise();
    }

    $scope.CashOutCounted = function(){
        $scope.cashout = {
            message: 'Changes cannot be made after Cash Out.'
        }
        if($("#CashInMethod").val() == 1 ){ 
            dialogCashOutMessage.setTitle("<span class='alert-warning glyphicon glyphicon-exclamation-sign'></span>")
            dialogCashOutMessage.open();
        }else if($("#CashInMethod").val() == 2){
            CashCountCashOut()
            .then(function(){
                WindowCashCountCashOut("<span class='alert-warning glyphicon glyphicon-exclamation-sign'></span>")
            })
        }else if($("#CashInMethod").val() == 3){
            CashCountCashOutStation()
            .then(function(){
                WindowCashCountCashOutStation("<span class='alert-warning glyphicon glyphicon-exclamation-sign'></span>")
            })
        }
    }

    $("#cashier_cashout_q").on("close", function(){
        $("#cashier_cashcount_container").html('');
    })

    $scope.FinalCashOutServer = function(){
        DownCount = 0;
        CountCount = 0;
        var emailmsgUnique;
        var UserUnique;
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
		var postdata ="cashtype=2";
		    postdata+="&amount="+$("#cash-out-keypad-number").val();
		posData.SaveAmountCashOutServer(postdata)
		.success(function(result){
			UserUnique = result.UserId;
			dialogCashCountForm.close();
            $("#cashier_cashout_q").jqxWindow("close");
            if(result.CashOutPrint){
                var postdata ="StationCashierUnique="+result.StationCashierUnique;
                posData.CashOutConvertPDF(postdata)
                .success(function(convert){
                    if(convert.SendEmail){
                        emailmsgUnique = convert.emailmsgUnique; 
                    }
                    var postdata ="UserId="+UserUnique;
                    PrinterCashOutServerCheck(postdata)
                    .then(function(){
                        posData.UnsetCashDrawerCashOut(postdata)
                        .success(function(result2){
                            var postdata ="EmailMessageUnique="+emailmsgUnique;
                                postdata+="&UserUnique="+UserUnique;
                            posData.CashOutSendEMail(postdata)
                            .success(function(send){
                                
                            })
                        }).catch(function(result2){
                            if(LogDisplay == 1){
                                var msg = result2.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');	
                                });		
                            }
                        }).finally(function() {	

                        })
                    })
                })
            }else{
                var postdata ="UserId="+UserUnique;
                PrinterCashOutServerCheck(postdata)
                .then(function(){
                    posData.UnsetCashDrawerCashOut(postdata)
                    .success(function(result3){
                    LoadHeaderInfo();
                    }).catch(function(result3){
                        if(LogDisplay == 1){
                            var msg = result3.data+'<br/>'
                                msg+= notifyMessage;
                            NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                            .then(function(){
                                WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');
                            });
                        }else{
                            var msg = 'Technical issue '+'<br/>'
                                msg+= notifyMessage;	
                            NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');	
                            });	
                        }
                    }).finally(function() {	

                    })
                })
            }
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveAmountCashOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashOut / FinalCashOut');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('SaveAmountCashOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashOut / FinalCashOut');	
                });	
            }
            
        }).finally(function() {	

        })
    }

    $scope.FinalCashOutServerCancel = function(){
        $('#cashier_cashout_q').jqxWindow('close');
    }

    $scope.FinalCashOutCancel = function(){
        dialogCashOutMessage.close();
    }

    $scope.FinalCashOut = function(){
        DownCount = 0;
        CountCount = 0;

        var emailmsgUnique;
        var UserUnique;
        
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
		var postdata ="cashtype=2";
		    postdata+="&amount="+$("#cash-out-keypad-number").val();
		posData.SaveAmountCashOut(postdata)
		.success(function(result){
			if(result.success == true){
				//PrinterCheck();
			}
			dialogCashCountForm.close();
			dialogCashOutMessage.close();
            if(result.CashOutPrint){
                var postdata ="StationCashierUnique="+result.StationCashierUnique;
                posData.CashOutConvertPDF(postdata)
                .success(function(convert){
                    if(convert.SendEmail){
                        emailmsgUnique = convert.emailmsgUnique; 
                        UserUnique = convert.UserUnique;
                    }
                
                    PrinterCheck()
                    .then(function(){
                        posData.UnsetCashDrawerCashOut()
                        .success(function(result2){
                            var postdata ="EmailMessageUnique="+emailmsgUnique;
                                postdata+="&UserUnique="+UserUnique;
                            posData.CashOutSendEMail(postdata)
                            .success(function(send){
                                
                            })
                        }).catch(function(result2){
                            if(LogDisplay == 1){
                                var msg = result2.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');	
                                });		
                            }
                        }).finally(function() {	

                        })
                    })
                })
            }else{
                posData.UnsetCashDrawerCashOut()
                .success(function(result3){
                   LoadHeaderInfo();
                }).catch(function(result3){
                    if(LogDisplay == 1){
                        var msg = result3.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;	
                        NumpadAlertCloseReport('UnsetCashDrawerCashOut_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> UnsetCashDrawerCashOut / FinalCashOut');	
                        });	
                    }
                    
                }).finally(function() {	

                })
            }
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveAmountCashOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashOut / FinalCashOut');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('SaveAmountCashOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveAmountCashOut / FinalCashOut');	
                });	
            }
            
        }).finally(function() {	

        })
    }
	
	$scope.AuthManager = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true});
                FunctionButton = 'AuthManager';  
                NumpadPasscode('AuthEnterPassCode')	
                .then(function(){
                    WindowPopupPasscode('Auth. Manager | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false});
                        },1000);
                    })  
                })
                $scope.$broadcast('BackOffice');
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / AuthManager');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / AuthManager');	
                });		
            }
            
        }).finally(function() {	

        })
	}
	
	$(document).on('submit', '#AuthEnterPassCode', function(e){
		e.preventDefault();
        posData.getLoggedInformationAuthMan()
        .success(function(result){
            store_unique_id = result.storeunique;
            var CardRead = $("#number_field").val();
            var CRP = new CardReaderParser(CardRead);
            if(CRP.converted){
                var passcode = CRP.converted;//$("#number_field").val();
                var hashpasscode = CryptoJS.MD5(passcode);
                var postdata ="passcode="+hashpasscode;
                    postdata+="&FunctionButton="+FunctionButton;
                posData.RestrictionPasscodeAuthMan(postdata)
                .success(function(result2) {
                    if (result2.success == true) {
                        if(result2.login == true){
                            $window.location.href = base_url + 'pos/pointofsale/auth-manager';
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow('close');	
                            var msg = result2.msg;	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                    }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                    }
                }).catch(function(result2){
                    if(LogDisplay == 1){
                        var msg = result2.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('getLoggedInformationAuthMan_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationAuthMan / AuthEnterPassCode');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;	
                        NumpadAlertCloseReport('getLoggedInformationAuthMan_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationAuthMan / AuthEnterPassCode');	
                        });	
                    }
                    
                }).finally(function() {
                
                })
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformationAuthMan_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationAuthMan / AuthEnterPassCode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('getLoggedInformationAuthMan_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> getLoggedInformationAuthMan / AuthEnterPassCode');	
                });		
            }
            
        }).finally(function() {
            
        })
	})
	
	
	/*Popup Keyboard*/
	var populateNumpadKeyboard = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
			$("#custom_item_keyboard").html('');
			$("#custom_item_keyboard").append(''+
				'<h4 style="text-align:center;" id="keyboard_header">Pay Out Reason</h4>'+
				''
			);
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
                showAnimationDuration: 0,
                closeAnimationDuration: 0
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
	$("#dialog-numpad-keyboard").on('close', function(event){
		$("#custom_item_keyboard").html('');
	})
	/*End Keyboard*/

	$scope.PayOut = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled":true});
                FunctionButton = 'PayOut';
                NumpadPasscode('EnterPasscodePayOut')	
                .then(function(){
                    WindowPopupPasscode('Pay Out | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    });
                    setTimeout(function(){
                        $(".newsale").attr({"disabled":false});
                    },1000);    
                });
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / PayOut');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / PayOut');	
                });	
            }
            
        }).finally(function() {
         
        })
	}
	
    var PopulatePayOutView = function(form_name){
        var def = $.Deferred();
        setTimeout(function(){
            var ParentWidth = $("#payout-view-container").width();
            var ComputeWidth = (ParentWidth);
            var UseWidth = (ComputeWidth);
            console.log(UseWidth);
            $("#payout-view").append('<div id="payout-view-container" style="background: #144766; color:#EEE;"></div>');
            $("#payout-view-container").html('');
            $("#payout-view-container").append(
                '<div id="PayoutSelList" style="float:left; width:45%; margin:10px; color: #000;"></div>'+
                '<div id="payout-numpad-container" style="float:left; width:50%;  margin:10px;">'+
                '   <fieldset>'+
                '   <legend style="margin-bottom: 0 !important;">Amount</legend>'+
                '   <form id="'+form_name+'">'+
                '       <div id="payout_number_field" class="hdfield"></div>'+
                '       <div id="payout-numpad"></div>'+
                '   </form>'+
                '   </fieldset>'+
                '</div>'
            );

            $("#payout-numpad-container").append(
                DisplayNumpadPayout()
            );
            
            $("#payout_number_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val() });

            posData.PayoutSelectionList()
            .success(function(data){
                $("#PayoutSelList").append(data.html);
                $("#PayoutSelList").append(
                    '<div id="payout_note" style="float:left; width:100%;">'+
                    '   <br/>'+
                    '   <fieldset>'+
                    '   <legend style="margin-bottom:0 !important;">Note</legend>'+
                    '   <textarea id="payout_note_input" style="color:#000; width: 100%; height: 120px;" row="12"></textarea>'+
                    '   </fieldset>'+
                    '</div>'
                );
            })

            $("#payout-view-container").append(
                '<div id="payout_function_container" style="float:left; width:100%;">'+
                '<form id="'+form_name+'">'+
                    '<input type="text" id="number_field" class="hdfield" style="display:none;">'+
                    '<div id="payout_function"></div>'+
                '</form>'+
                '</div>'
            );
            def.resolve();
        },100);
        return def.promise();
    }

    var PayOutWindowProperties = function(){
        var def = $.Deferred();
        setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth);
            var UseWidth = (ComputeWidth);
            $("#payout-view").jqxWindow({
                /*
                height: 1024,
                width: '100%',
                */
                title: 'PayOut',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#payout-view').jqxWindow('open');
            def.resolve();
        },100);
        return def.promise();
    }

    var DisplayNumpadPayout = function(){
        var def = $.Deferred();
        $('#payout-numpad').numeric_numpad({
            layout: "numeric",
            input: $('#payout_number_field')
        });
        setTimeout(function(){
            def.resolve();
        },100);
        return def.promise();
    }

    var DisplayKeyboardPayout = function(){
        var def = $.Deferred();
        $('#payout-keyboard').jkeyboard({
            layout: "english",
            input: $('#search_field')
        });
        setTimeout(function(){
            def.resolve();
        },100);
        return def.promise();
    }

    var PayOutViewPage = function(form_name){
        var def = $.Deferred();
        PopulatePayOutView(form_name)
        .then(function(){
            $('#payout_function').numeric_numpad({
                layout: "PayOut",
                input: $('#number_field')
            });
            def.resolve();
        });
        return def.promise();
    }

    $(document).on("click", "#payout_note_input", function(){
        if($("#POSVirtualKeyboard").val() == 1 ){
            NumpadKeyboard('pay_out_note')
            .then(function(){
                WindowPopupKeyboard('Pay Out Note')
                .then(function(){
                    $("#keyboard_header").text("Pay Out Note");
                    $("#search_field").focus();
                });
            });   
        }
    })

    $(document).on("click", "#payout_number_field", function(){
        $(this).select();
    })

    $(document).on("submit", "#pay_out_note", function(e){
        e.preventDefault();
        $("#payout_note_input").val($("#search_field").val())
        $("#dialog-numpad-keyboard").jqxWindow("close");
    })
    
    var PayOutUserId = 0;
	$(document).on('submit', "#EnterPasscodePayOut", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var UserId;
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton;
            posData.RestrictionPasscodePayout(postdata)
            .success(function(restrict){
                UserId = restrict.userid;
                PayOutUserId = restrict.userid;
                $("#dialog-numpad-passcode").jqxWindow('close');
                if(restrict.success == true){
                    if(restrict.login == true){
                        posData.CashOutDisabled()
                        .success(function(result){
                            if(result.success == true){
                                var postdata ="UserId="+UserId;
                                posData.CheckCashDrawerMutiplePayOut(postdata)
                                .success(function(result2){
                                    if(result2.Setting){
                                        if(result2.CashDrawerSetup){
                                            PayOutViewPage('payout_reason')
                                            .then(function(){
                                                PayOutWindowProperties()
                                                .then(function(){
                                                    $("#payout_number_field").jqxNumberInput('focus');
													setTimeout(function(){
														var input = $('#payout_number_field input')[0];
														if('selectionStart' in input) {
															input.setSelectionRange(0, 0);
														}else{
															var range = input.createTextRange();
															range.collapse(true);
															range.moveEnd('character', 0);
															range.moveStart('character', 0);
															range.select();
														}
														$("#payout_number_field input").select();
													},100)
                                                })
                                            })
                                        }else{
                                            var postdata ="UserId="+UserId;
                                            posData.CashDrawerOptionPayOut(postdata)
                                            .success(function(result3){
                                                CashierDrawerView('cash_drawer_by_payout', result3.html)
                                                .then(function(){
                                                    WindowPopupCashierDrawer('Cash Drawer');
                                                })
                                            }).catch(function(result3){
                                                if(LogDisplay == 1){
                                                    var msg = result3.data+'<br/>'
                                                        msg+= notifyMessage;
                                                    NumpadAlertCloseReport('CashDrawerOptionPayOut_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionPayOut / EnterPassCodePayout');
                                                    });
                                                }else{
                                                    var msg = 'Technical issue '+'<br/>'
                                                        msg+= notifyMessage;	
                                                    NumpadAlertCloseReport('CashDrawerOptionPayOut_error', msg)
                                                    .then(function(){
                                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionPayOut / EnterPassCodePayout');	
                                                    });	
                                                }
                                                
                                            }).finally(function() {
                                            
                                            })
                                        }
                                    }else{
                                        PayOutViewPage('payout_reason')
                                        .then(function(){
                                            PayOutWindowProperties()
                                            .then(function(){
                                                $("#payout_number_field").jqxNumberInput('focus');
                                                setTimeout(function(){
                                                    var input = $('#payout_number_field input')[0];
                                                    if('selectionStart' in input) {
                                                        input.setSelectionRange(0, 0);
                                                    }else{
                                                        var range = input.createTextRange();
                                                        range.collapse(true);
                                                        range.moveEnd('character', 0);
                                                        range.moveStart('character', 0);
                                                        range.select();
                                                    }
                                                    $("#payout_number_field input").select();
                                                },100)
                                            })
                                        })
                                    }
                                }).catch(function(result2){
                                    if(LogDisplay == 1){
                                        var msg = result2.data+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CheckCashDrawerMutiplePayOut_error', msg)
                                        .then(function(){
                                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCashDrawerMutiplePayOut / EnterPassCodePayout');
                                        });
                                    }else{
                                        var msg = 'Technical issue '+'<br/>'
                                            msg+= notifyMessage;
                                        NumpadAlertCloseReport('CheckCashDrawerMutiplePayOut_error', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCashDrawerMutiplePayOut / EnterPassCodePayout');	
                                        });		
                                    }
                                    
                                }).finally(function() {
                                
                                })
                            }else{
                                var msg = 'Please cash in first';	
                                NumpadAlertOk('invalid_passcode', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                });
                            }
                            $scope.$broadcast('NewSale');
                        }).catch(function(result){
                            if(LogDisplay == 1){
                                var msg = result.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('CashOutDisabled_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled / EnterPassCodePayout');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('CashOutDisabled_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashOutDisabled / EnterPassCodePayout');	
                                });		
                            }
                            
                        }).finally(function() {
                        
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = restrict.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }  
            }).catch(function(restrict){
                if(LogDisplay == 1){
                    var msg = restrict.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodePayout_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodePayout / EnterPassCodePayout');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodePayout_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodePayout / EnterPassCodePayout');	
                    });	
                }
                
            }).finally(function() {
            
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
	})

    $(document).on("submit", "#payout_reason", function(e){
        e.preventDefault();

        var PayOutSel   = $('input[type=radio][name=group1]:checked').attr('id');
        var PRUnique    = PayOutSel.split('=')[0];
        var PRType      = PayOutSel.split('=')[1];
        var postdata ="Amount="+$("#payout_number_field").val();
            postdata+="&Note="+$("#payout_note_input").val();
            postdata+="&PRUnique="+PRUnique;
            postdata+="&Type="+PRType;  

        posData.PayOut(postdata)
        .success(function(data){
            if(data.success){
                $("#payout-view").jqxWindow('close');
            }
        }).catch(function(data){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');	
                });		
            }
            
        }).finally(function() {
        
        })
        $("#payout-view").jqxWindow('close'); 
    })

    $(document).on("click", "#payout_reason .payout_okay", function(e){
        e.preventDefault();

        var PayOutSel   = $('input[type=radio][name=group1]:checked').attr('id');
        var PRUnique    = PayOutSel.split('=')[0];
        var PRType      = PayOutSel.split('=')[1];
        var postdata ="Amount="+$("#payout_number_field").val();
            postdata+="&Note="+$("#payout_note_input").val();
            postdata+="&PRUnique="+PRUnique;
            postdata+="&Type="+PRType;  

        posData.PayOut(postdata)
        .success(function(data){
            if(data.success){
                $("#payout-view").jqxWindow('close');
            }
        }).catch(function(data){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');
                });
            }else{
                var msg ='Technical issue '+'<br/>'
                    msg+=notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');	
                });		
            }
            
        }).finally(function() {
        
        })
        $("#payout-view").jqxWindow('close'); 
    })

    $(document).on("click", "#payout_reason .payout_cancel", function(e){
        e.preventDefault();
        $("#payout-view").jqxWindow('close');
    })

    $(document).on('click', '#cash_drawer_by_payout .button_proceed', function(e){
        e.preventDefault();
        var DrawerSelected = $('input[type=radio][name=group1]:checked').attr('id');
        if(DrawerSelected){
            var postdata="CashDrawerOption="+DrawerSelected;
                postdata+="&UserId="+PayOutUserId;
            posData.SelectedCashDrawerPayOut(postdata)
            .success(function(result){
                $('#dialog-cash-drawer').jqxWindow('close');
                PayOutViewPage('payout_reason')
                .then(function(){
                    PayOutWindowProperties()
                    .then(function(){
                        $("#payout_number_field").jqxNumberInput('focus');
                        setTimeout(function(){
                            var input = $('#payout_number_field input')[0];
                            if('selectionStart' in input) {
                                input.setSelectionRange(0, 0);
                            }else{
                                var range = input.createTextRange();
                                range.collapse(true);
                                range.moveEnd('character', 0);
                                range.moveStart('character', 0);
                                range.select();
                            }
                            $("#payout_number_field input").select();
                        },100)
                        /*
                        $("#payout_number_field").focus();
                        setTimeout(function(){
                            $("#payout_number_field").select();
                        })
                        */
                    })
                })
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('SelectedCashDrawerPayOut_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawerPayOut / cash_drawer_by_payout');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;	
                    NumpadAlertCloseReport('SelectedCashDrawerPayOut_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawerPayOut / cash_drawer_by_payout');	
                    });	
                }
                
            }).finally(function() {
            
            })
        }else{
            var msg = "Select Cash Drawer first";	
            NumpadAlertOk('no_cashdrawer_selected', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign">Information</span>');	
            }) 
        }
    })

    $(document).on('click', '#cash_drawer_by_payout .button_q_cancel', function(e){
        e.preventDefault();
        $('#dialog-cash-drawer').jqxWindow('close');
    })
	
	var temp_payout = [];
	$(document).on('submit', '#pay_out', function(e){
		e.preventDefault();
		temp_payout.push($("#search_field").val());
		$("#dialog-numpad-keyboard").jqxWindow('close');
		$("#custom_item_keyboard").html('');
		NumpadPriceChange('pay_out_amount')
		 .then(function(){
			WindowPopupPriceChange('Amount')
			.then(function(){
				$("#number_field").val('0.00');
				$("#number_field").focus();
				setTimeout(function(){
					$("#number_field").select();
				},100);
			})
		 })
	})
	
	$(document).on('submit', '#pay_out_amount', function(e){
		e.preventDefault();
		temp_payout.push($("#number_field").val());
		var postdata="PayOutDescription="+temp_payout[0];
			postdata+="&PayOutAmount="+temp_payout[1];
		posData.PayOut(postdata)
		.success(function(result){
			if(result.success == true){
				temp_payout = Array();
			}
		}).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PayOut_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PayOut / pay_out_amount');	
                });		
            }
            
        }).finally(function() {
        
        })
		$("#dialog-numpad-enter-amount").jqxWindow('close');
	})


    var populateCashDrawerOption = function(form_name, html){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-cash-drawer").append('<div id="cash-drawer-container" style="background: #144766; color:#EEE;"></div>');
            $("#cash-drawer-container").html('');
            $("#cash-drawer-container").append(''+
            '<h4 style="text-align:center;">CASH DRAWER</h4>');
            $("#cash-drawer-container").append(html);
            $("#cash-drawer-container").append(''+
            '<form id="'+form_name+'">'+
                '<input type="text" id="cash_drawer_field" class="hdfield" style="color:#000; display:none;">'+
                '<div id="keyboard_cashdrawer"></div>'+
            '</form>');
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupCashierDrawer = function(header_text){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-cash-drawer").jqxWindow({
                height: 500,
                width: 480,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#dialog-cash-drawer').jqxWindow('setTitle', header_text);
            $('#dialog-cash-drawer').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }
    
    var CashierDrawerView = function(form, html){
        var def = $.Deferred();
        populateCashDrawerOption(form, html)
        .then(function(){
            $('#keyboard_cashdrawer').hdkeyboard({
                layout: "item_reason",
                input: $("#cash_drawer_field")
            });
            def.resolve();
        });
        return def.promise();
    }
    
    $scope.CashierDrawer = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $("#CashierDrawerfunction").attr("disabled", true);
                FunctionButton = 'CashDrawer';
                NumpadPasscode('EnterPasscodeCashierDrawer')	
                .then(function(){
                    WindowPopupPasscode('Cash Drawer | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    }) 
                    $("#CashierDrawerfunction").attr("disabled", false);
                })
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / CashierDrawer');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('CheckCache_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / CashierDrawer');	
                });	
            }
            
        }).finally(function() {
        
        })
    }

    var UserIdCashDrawer = 0;
    $(document).on("submit", '#EnterPasscodeCashierDrawer', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton; 
            posData.RestrictionPasscodeCashDrawer(postdata)
            .success(function(restrict){
                $("#dialog-numpad-passcode").jqxWindow('close');
                if(restrict.success == true){
                    if(restrict.login == true){
                        UserIdCashDrawer = restrict.userid;
                        var postdata ="UserId="+UserIdCashDrawer;
                        posData.CashDrawerOptionDrawer(postdata)
                        .success(function(result){
                            CashierDrawerView('cash_drawer_selected', result.html)
                            .then(function(){
                                WindowPopupCashierDrawer('Cash Drawer');
                            })
                        }).catch(function(result){
                            if(LogDisplay == 1){
                                var msg = result.data+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('CashDrawerOptionDrawer_error', msg)
                                .then(function(){
                                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionDrawer / EnterPasscodeCashierDrawer');
                                });
                            }else{
                                var msg = 'Technical issue '+'<br/>'
                                    msg+= notifyMessage;
                                NumpadAlertCloseReport('CashDrawerOptionDrawer_error', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashDrawerOptionDrawer / EnterPasscodeCashierDrawer');	
                                });		
                            }
                            
                        }).finally(function() {
                        
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = restrict.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }  
            }).catch(function(restrict){
                if(LogDisplay == 1){
                    var msg = restrict.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeCashDrawer_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeCashDrawer / EnterPasscodeCashierDrawer');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeCashDrawer_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeCashDrawer / EnterPasscodeCashierDrawer');	
                    });	
                }
                
            }).finally(function() {
            
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow('close');	
            var msg = "Passcode cannot be empty";	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            }) 
        }
    })

    var DrawerId;
	$(document).on('click', '.radio2', function(){
		var id = $('input[type=radio][name=group1]:checked').attr('id');
		DrawerId = id;
	});

    $(document).on('click', "#cash_drawer_selected .button_proceed", function(e){
        e.preventDefault();
        var DrawerSelected = $('input[type=radio][name=group1]:checked').attr('id');
        if(DrawerSelected){
            var postdata ="CashDrawerOption="+DrawerSelected;
                postdata+="&UserId="+UserIdCashDrawer;
            posData.SelectedCashDrawer(postdata)
            .success(function(result){
                $('#dialog-cash-drawer').jqxWindow('close');
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('SelectedCashDrawer_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawer / cash_drawer_selected');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('SelectedCashDrawer_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SelectedCashDrawer / cash_drawer_selected');	
                    });		
                }
                
            }).finally(function() {
                
            })
        }else{
            var msg = "Select Cash Drawer first";	
            NumpadAlertOk('no_cashdrawer_selected', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign">Information</span>');	
            })  
        }
    })

    $(document).on("click", "#cash_drawer_selected .button_q_cancel", function(e){
        e.preventDefault();
         $('#dialog-cash-drawer').jqxWindow('close');
    })
    var populateCommentBox = function(form_name, unique){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-comment-box").append('<div id="dialog-comment-box-container" style="background: #144766; color:#EEE;" />');
            $("#dialog-comment-box-container").html('');
            $("#dialog-comment-box-container").append(''+
				'<form id="'+form_name+'">'+
					'<textarea class="form-control"  id="text_field" style="color:#000;" rows="5" PlaceHolder="Type your comment here"></textarea>'+
                    '<input type="text" id="search_field" style="color:#000; display:none;">'+
					'<div id="keyboard_comment_box"></div>'+
                    '<input type="hidden" id="timeclock_unique" value="'+unique+'"/>'+
				'</form>');
            def.resolve();
        },100);
        return def.promise();
    }
	
    var WindowComment = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
			$("#dialog-comment-box").jqxWindow({
				height: 290,
				width: 390,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#dialog-comment-box').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var CommentBox = function(form_name, unique){
        var def = $.Deferred();
		populateCommentBox(form_name, unique)
		.then(function(){
			$('#keyboard_comment_box').hdkeyboard({
			    layout: "custom7",
			    input: $('#search_field')
			});
			setTimeout(function(){
				$("#text_field").focus();
				def.resolve();
			},100);
		});
		return def.promise();
    }

    $(document).on("click", "#timeclockin_comment .timeclock_ok", function(e){
        e.preventDefault();
        var Unique = $("#timeclock_unique").val();
        var postdata ="Unique="+Unique;
            postdata+="&ClockInComment="+$("#text_field").val();
            postdata+="&ClockStatus=1";
        posData.SaveTimeClockComment(postdata)
        .success(function(result){		
            $('#dialog-comment-box').jqxWindow('close');
            NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
            });
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / timeclockin_comment');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / timeclockin_comment');	
                });		
            }
           
        }).finally(function() {
        
        })
    })

    $(document).on("click", "#timeclockout_comment .timeclock_ok", function(e){
        e.preventDefault();
        var Unique = $("#timeclock_unique").val();
        var postdata ="Unique="+Unique;
            postdata+="&ClockInComment="+$("#text_field").val();
            postdata+="&ClockStatus=2";
        posData.SaveTimeClockComment(postdata)
        .success(function(result){
            if( $("#ClockOutPrint").val() == 1 ){
                PrinterCheckTimeClock(globalPrintTimeclockCheck);
            }
            		
            $('#dialog-comment-box').jqxWindow('close');
            NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
            });
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / timeclockout_comment');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / timeclockout_comment');	
                });	
            }
            
        }).finally(function() {
        
        })
    })

    $(document).on("submit", "#vk_timeclockin_comment", function(e){
        e.preventDefault();
        var Unique = $("#timeclock_unique").val();
        var postdata ="Unique="+globalTimeclockUnique;
            postdata+="&ClockInComment="+$("#search_field").val();
            postdata+="&ClockStatus=1";
        posData.SaveTimeClockComment(postdata)
        .success(function(result){
            $("#dialog-numpad-keyboard").jqxWindow('close');		
            NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
            });
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / vk_timeclockin_comment');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / vk_timeclockin_comment');	
                });	
            }
            
        }).finally(function() {
        
        })
    })

    $(document).on("submit", "#vk_timeclockout_comment", function(e){
        e.preventDefault();
        var Unique = $("#timeclock_unique").val();
        var postdata ="Unique="+globalTimeclockUnique;
            postdata+="&ClockInComment="+$("#search_field").val();
            postdata+="&ClockStatus=2";
        posData.SaveTimeClockComment(postdata)
        .success(function(result){
            if( $("#ClockOutPrint").val() == 1 ){
                PrinterCheckTimeClock(globalTimeclockUnique);
            }
            
            $("#dialog-numpad-keyboard").jqxWindow('close');		
            NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
            });
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / vk_timeclockout_comment');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('SaveTimeClockComment_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> SaveTimeClockComment / vk_timeclockout_comment');	
                });		
            }
            
        }).finally(function(){
        
        })
    })

    $("#TestfnButton").click(function(){
        CommentBox('timeclock_comment')
        .then(function(){
            WindowComment('Time clock Comment')
            .then(function(){

            })
        })
    })

    var namedFunction = function(name, fn) {
        return new Function('fn',
            "return function " + name + "(){ return fn.apply(this,arguments)}"
        )(fn)
    }

    var mainfunc = function (func){
        var args = new Array();
        for (var i = 1; i < arguments.length; i++)
            args.push(arguments[i]);

        window[func].apply(this, args);
    }

    //-->Recall Department
    $("#cashier_recall").on("close", function(event){
        //$("#cashier_recall_container").remove();
        $("#cashier_recall_container").html('');
    })

    $scope.CashierRecall = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $("#CashierRecallfunction").attr({"disabled":true});
                posData.CashOutDisabled()
                .success(function(result2){
                    if(result2.success == true){
                        NumpadPasscode('EnterPasscodeRecall')	
                        .then(function(){
                            WindowPopupPasscode('Recall | Enter Passcode')
                            .then(function(){
                                $("#number_field").focus();
                            });
                        });
                        FunctionButton = 'Recall';
                    }else{
                        FunctionButton = '';
                        var msg = 'Please cash in first';
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');
                        })
                    }
                    $scope.$broadcast('Recall');
                    setTimeout(function(){
                        $("#CashierRecallfunction").attr({"disabled":false});
                    },1000);
                }).catch(function(result2){
                    if(LogDisplay == 1){
                        var msg = result2.data+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cashout_disabled_newsale_error', msg)
                        .then(function(){
                            WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashOutNewSale');
                        });
                    }else{
                        var msg = 'Technical issue '+'<br/>'
                            msg+= notifyMessage;
                        NumpadAlertCloseReport('cashout_disabled_newsale_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashOutNewSale');	
                        });		
                    }
                    
                }).finally(function() {
                    
                })  
            }else{
                location.reload();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / Recall');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / Recall');	
                });	
            }
            
        }).finally(function() {
        
        })
    }

    var populateRecall = function(){
        var def = $.Deferred();
        $("#cashier_recall").append('<div id="cashier_recall_container" style="background: #144766; color:#EEE;"></div>');
        $("#cashier_recall_container").html('');
        posData.LoadPayments()
        .success(function(data){
            $("#cashier_recall_container").append($compile(data.html)($scope));
            def.resolve(data.Function);
        })
        return def.promise();
    }

    $(document).on('click', '.hdbutton', function() {
        $("div").remove('.cashier-sale-container');
        $('.hdbutton').not(this).removeClass('buttonactive');
        $(this).toggleClass('buttonactive');
    });

    var recall_page_popup = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#cashier_recall").jqxWindow({
				height: '100%',
				width: '100%',
                title: 'Recall',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#cashier_recall').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var scrollOrderListDown = function(){
        setTimeout(function() {
            var n = 1000;
            $('.orderedlist').animate({ scrollTop: n }, 50);
            $('.listitems').animate({ scrollTop: n }, 50);
            $('.qspayments').animate({ scrollTop: n }, 50);
        }, 100); 
    }

    var scrollTotalDown = function(){
        setTimeout(function() {
            var n = 1000;
            $('#payments').animate({ scrollTop: n }, 50);
        }, 1000); 
    } 

    onholdcolumns    = [];
    completedcolumns = [];
    cashcolumns      = [];
    creditcardcolumns= [];
    giftcardcolunns  = [];
    checkcolumns     = [];
    voidedcolumns    = [];
    var VisibleColumns = function(){
        //--> OnHold Columns 
        posData.GetOnHoldSaleColumns()
        .success(function(onholdcols){
           $.each(onholdcols, function(index, value){
               if(value.aggregates == 1){
                   onholdcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   onholdcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })
        //-->Completed Columns
        posData.GetCompletedSaleColumns()
        .success(function(completedcols){
            $.each(completedcols, function(index, value){
               if(value.aggregates == 1){
                   completedcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   completedcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })

        //-->Cash Columns
        posData.GetCashSaleColumns()
        .success(function(cashcols){
            $.each(cashcols, function(index, value){
               if(value.aggregates == 1){
                   cashcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   cashcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })

        //-->Credit Card Columns
        posData.GetCreditCardSaleColumns()
        .success(function(creditcardcols){
            $.each(creditcardcols, function(index, value){
               if(value.aggregates == 1){
                   creditcardcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   creditcardcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })
        //-->Gift Card Columns 
        posData.GetGiftCardSaleColumns()
        .success(function(giftcardcols){
            $.each(giftcardcols, function(index, value){
               if(value.aggregates == 1){
                   giftcardcolunns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   giftcardcolunns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })

        //-->Check Columns 
        posData.GetCheckSaleColumns()
        .success(function(checkcols){
            $.each(checkcols, function(index, value){
               if(value.aggregates == 1){
                   checkcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   checkcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })

        //-->Voided Columns
        posData.GetVoidedSaleColumns()
        .success(function(voidedcols){
            $.each(voidedcols, function(index, value){
               if(value.aggregates == 1){
                   voidedcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
                    })
               }else{
                   voidedcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
               }
           })
        })
    }
    VisibleColumns();

    var Tab = '';
    var TabStatus;
    var Attribute;
    var Type;
    var EBT;
    var RowReceiptHeaderUnique = 0;

    var SelOnHold = function(){
        Tab = 'load_all_onhold_sale';
        TabStatus = 5;
        Attribute = 'CashierRecallOnHold';
        var def = $.Deferred();
        var onhold_data = [];
        posData.LoadCashierSale()
        .success(function(data){
            //$('.cashier-sale-container').html('');
            $("#cashier_recall_container").append($compile(data.html)($scope));
                var ResoWidth 	        = $("#cashier_recall").width();
                var ResoHeight 	        = $("#cashier_recall").height();
                var ComputeHeight		= ResoHeight - 140;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var Compute1            = (UseHeight / 2);
                var Compute2            = (Compute1 / 2);
                var OHSListItems        = (UseHeight / 2 + Compute2);
                var TotalHeight         = (Compute1 / 2);
                var Payments 			= (TotalHeight + 10);

                $(".listitems").css("height", OHSListItems);
                $(".CHSlistitemsTotal").css({"height":TotalHeight, "display":"block"});
            
                $(".qspayments").css("height", Payments);

                var postdata ="Tab="+Tab;
                    postdata+="&Status="+TabStatus;
                    postdata+="&Attribute="+Attribute;
                posData.LoadSaleByTab(postdata)
                .success(function(data){
                    Tab = 'OnHold';

                    //var url = base_url + "pos/cashier/recall/load-all-onhold-sale";
                    var source = {
                        datatype: "json",
                        datafields: data.type,
                        localdata: data.result
                    }; 

                    $('#listCashierSale').on('bindingcomplete', function (event) {
                        $('#statusrowlistCashierSale').children().css("background-color", "white");
                    });
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var ColumnHideShow = $("#PrintReceiptOrderNo").val(); 

                    $("#listCashierSale").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        rowsheight: GridRowHeight,
                        theme: 'darkblue',
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: 25,
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        showaggregates: true,
                        columns: [
                            { text: 'Unique', datafield: 'Unique', hidden: true },
                        ]
                    });

                    setTimeout(function(){
                        $("#listCashierSale").jqxGrid('selectrow', 0);
                    },100);

                    bindData("listCashierSale");
                    
                    $("#listCashierSale").jqxGrid({ columns: onholdcolumns });

                    WindowOnHoldSale('On Hold Sale');
                })
            def.resolve();
        })
        return def.promise();
    }

    $(document).on('rowdoubleclick', '#listCashierSale', function(event){
        var index = event.args.rowindex;
        var datafield = event.args.datafield;
        var row = $(this).jqxGrid('getrowdata', index);
        editRow = index;
        var postdata="ReceiptHeaderUnique="+RowReceiptHeaderUnique;
            postdata+="&Tab="+Tab;       
        if(TabStatus == 5){
            posData.OpenReceipt(postdata)
            .success(function(data){
                if(data.success){
                    if(data.can_open){
                        $window.location.href = 'pointofsale';
                    }else{
                        var msg = data.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                }
            })
        }else{
            RecallOpenReceipt('recall_open_receipt_q')
            .then(function(){
                WindowPopupRecallOpenReceipt('Open Receipt');
            })
        }
    });

    var SelCompleted = function(){
        Tab = 'LoadCompletedSale';
        TabStatus = 4;
        Attribute = 'CashierRecallCompleted';
        var def   = $.Deferred();
        var onhold_data = [];
        posData.LoadCashierSale()
        .success(function(data){
            //$('.cashier-sale-container').html('');
            $("#cashier_recall_container").append($compile(data.html)($scope));
                var ResoWidth 	        = $("#cashier_recall").width();
                var ResoHeight 	        = $("#cashier_recall").height();
                var ComputeHeight		= ResoHeight - 140;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var Compute1            = (UseHeight / 2);
                var Compute2            = (Compute1 / 2);
                var OHSListItems        = (UseHeight / 2 + Compute2);
                var TotalHeight         = (Compute1 / 2);
                
                $(".listitems").css("height", OHSListItems);
                $(".CHSlistitemsTotal").css({"height":TotalHeight, "display":"block"});
                
                var postdata ="Tab="+Tab;
                    postdata+="&Status="+TabStatus;
                    postdata+="&Attribute="+Attribute;
                posData.LoadSaleByTab(postdata)
                .success(function(data){
                    Tab = 'SaleCompleted';

                    var source = {
                        datatype: "json",
                        datafields: data.type,
                        localdata: data.result
                    };
                    $('#listCashierSale').on('bindingcomplete', function (event) {
                        $('#statusrowlistCashierSale').children().css("background-color", "white")
                    });
                    var dataAdapter     = new $.jqx.dataAdapter(source);
                    
                    $("#listCashierSale").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        rowsheight: GridRowHeight,
                        theme: 'darkblue',
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: 25,
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        showaggregates: true,
                        columns: [
                            { text: 'Unique', datafield: 'Unique', hidden: true },
                        ]
                    });

                    setTimeout(function(){
                        $("#listCashierSale").jqxGrid('selectrow', 0);
                    },1000);

                    bindData("listCashierSale");
                    
                    $("#listCashierSale").jqxGrid({ columns: completedcolumns });

                    WindowOnHoldSale('On Hold Sale');
                })
            def.resolve();
        })
        return def.promise();
    } 

    var SelTabSale = function(Type, Attribute, gridcolumns){
        Tab       = 'load_transaction_by_type';
        TabStatus = 4;
        var def   = $.Deferred();
        var onhold_data = [];
        posData.LoadCashierSale()
        .success(function(data){
            $(".cashier-sale-container").html('');
            $("#cashier_recall_container").append($compile(data.html)($scope));
                var ResoWidth 	        = $("#cashier_recall").width();
                var ResoHeight 	        = $("#cashier_recall").height();
                var ComputeHeight		= ResoHeight - 140;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var Compute1            = (UseHeight / 2);
                var Compute2            = (Compute1 / 2);
                var OHSListItems        = (UseHeight / 2 + Compute2);
                var TotalHeight         = (Compute1 / 2);
                
                $(".listitems").css("height", OHSListItems);
                $(".CHSlistitemsTotal").css({"height":TotalHeight, "display":"block"});
                
                var postdata ="Tab="+Tab;
                    postdata+="&Status="+TabStatus;
                    postdata+="&Attribute="+Attribute;
                    postdata+="&Type="+Type;
                posData.LoadSaleByTab(postdata)
                .success(function(data){
                     Tab = 'load_transaction_by_type2';
                    var source = {
                        datatype: "json",
                        datafields: data.type,
                        localdata: data.result
                    };
                    $('#listCashierSale').on('bindingcomplete', function (event) {
                        $('#statusrowlistCashierSale').children().css("background-color", "white")
                    });
                    var dataAdapter     = new $.jqx.dataAdapter(source);
                    
                    $("#listCashierSale").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        rowsheight: GridRowHeight,
                        theme: 'darkblue',
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: 25,
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        showaggregates: true,
                        columns: [
                            { text: 'Unique', datafield: 'Unique', hidden: true },
                        ]
                    });

                    setTimeout(function(){
                        $("#listCashierSale").jqxGrid('selectrow', 0);
                    },1000);

                    bindData("listCashierSale");
                    
                    $("#listCashierSale").jqxGrid({ columns: gridcolumns });

                    WindowOnHoldSale('On Hold Sale');
                })
            def.resolve();
        })
        return def.promise();
    }

    var GlobalReceiptNumber;
    var bindData = function(elemId){
        $("#"+elemId).bind('rowselect', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            var datainformations = $("#listCashierSale").jqxGrid("getdatainformation");
            var rowscounts = datainformations.rowscount;
            if(rowscounts > 0){
                RowReceiptHeaderUnique = row.Unique;
                GlobalReceiptNumber = row.ReceiptNumber;
                var postdata ="ReceiptHeaderUnique="+row.Unique;
                    postdata+="&Status="+TabStatus;
                $("#btn-use-receipt").val(row.Unique);
                $("#btn-use-receipt").text("Open "+row.ReceiptNumber);
                posData.GetItemsOnHoldSale(postdata)
                .success(function(data){
                    $(".listitems").html('');
                    $(".CHSlistitemsTotal").html('');
                    $.each(data, function(index, value){
                        $(".listitems").append(''+
                            '<div style="padding: 0; margin: 0;" class="col-sm-12">'+
                                '<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
                                '<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
                                '<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
                            '</div>'+
                        '');
                    })
                }).then(function(){
                    $(".CHSlistitemsTotal").append($compile('<div class="totals">'+
                        '<div class="totals">'+
                            '<div ng-repeat="qstotal in qstotals">'+
                                '<div class="col-sm-12 alignlabels" style="margin:0; padding:0;">'+
                                        '<div class="col-sm-5">'+
                                            '<div class="col-sm-12 alignlabels text-right" ng-hide="qsEBTShow" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-6" style="margin:0; padding:0;"><strong>EBT</strong></div>'+
                                                '<div class="col-sm-6 text-right" style="margin:0; padding:0;"><strong>{{qsEBT.EBTtotal | currency:\'\'}}</strong></div>'+
                                            '</div>'+
                                            
                                            '<div class="col-sm-12 alignlabels text-right" ng-hide="qsNonEBTShow" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-6" style="margin:0; padding:0;"><strong>Non-EBT</strong></div>'+
                                                '<div class="col-sm-6 text-right" style="margin:0; padding:0;"><strong>{{qsNonEBT.NonEBTtotal | currency:\'\'}}</strong></div>'+
                                            '</div>'+
                                            
                                            '<div class="col-sm-12 alignlabels text-left" ng-hide="qsTotalDiscountShow" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-6" style="margin:0; padding:0;"><strong>Disc</strong></div>'+
                                                '<div class="col-sm-6 text-right" style="margin:0; padding:0;"><strong>{{qsDiscount.TotalDiscount | currency:\'\'}}</strong></div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-sm-7 text-right" style="padding: 0; margin:0;">'+
                                            '<div class="col-sm-12 alignlabels text-right" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-7 text-right" style="margin:0; padding:0;"><strong>SUB TOTAL</strong></div>'+
                                                '<div class="col-sm-5 text-right" style="margin:0; padding:0;"><strong>{{qstotal.SubTotal | currency: \'\'}}</strong></div>'+
                                            '</div>'+
                                            '<div class="col-sm-12 alignlabels text-right" ng-if="qstotal.Tip != 0" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-7" style="margin:0; padding:0;"><strong>Tip</strong></div>'+
                                                '<div class="col-sm-5" style="margin:0; padding:0;"><strong>{{qstotal.Tip | currency: \'\'}}</strong></div>'+
                                            '</div>'+
                                            '<div class="col-sm-12 alignlabels text-right" ng-repeat="qstax in qsShowTax" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-7" style="margin:0; padding:0;"><strong>{{qstax.Description}}</strong></div>'+
                                                '<div class="col-sm-5" style="margin:0; padding:0;"><strong>{{qstax.TotalTax | currency: \'\'}}</strong></div>'+
                                            '</div>'+
                                            '<div class="col-sm-12 text-right" style="margin:0; padding:0;"><strong>============</strong></div>'+
                                            '<div class="col-sm-12 alignlabels text-right" style="margin:0; padding:0;">'+
                                                '<div class="col-sm-7" style="margin:0; padding:0;"><strong>TOTAL</strong></div>'+
                                                '<div class="col-sm-5" style="margin:0; padding:0;"><strong>{{qstotal.Total | currency: \'\'}}</strong></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="qspayments" id="payments" style="height:40px;">'+
                                        '<div class="col-sm-12" style="margin:0; padding:0;" ng-repeat="qspayments in qsAllPayments">'+
                                            '<div class="col-sm-9" style="margin:0; padding:0;"><strong>{{qspayments.paymentname}} * {{payments.cardno}}</strong></div>'+
                                            '<div class="col-sm-3" style="margin:0; padding:0;"><strong>{{qspayments.amount | currency: \'\'}}</strong></div>'+
                                        '</div>'+
                                        '<div class="col-sm-12" style="margin:0; padding:0;">'+
                                            '<div class="col-sm-9" style="margin:0; padding:0;"><strong>{{qsposchange.changedesc}}</strong></div>'+
                                            '<div class="col-sm-3" style="margin:0; padding:0;"><strong>{{qsposchange.totalchange | currency: \'\'}}</strong></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>')($scope));
                    posData.QuickSaleTotal(postdata)
                    .success(function(data){
                        if(data.DiscountSuccess == true){
                            $scope.qsTotalDiscountShow = false;
                            $scope.qsTotalDiscountHide = true;
                            $scope.qsDiscount = data.Discount;
                        }else{
                            $scope.qsTotalDiscountShow = true;
                            $scope.qsTotalDiscountHide = false;
                        }

                        $scope.qsEBT = data.EBT;
                        $scope.qsNonEBT = data.NonEBT;
                        if(data.EBTSuccess == true){
                            $scope.qsEBTShow = false;
                            $scope.qsNonEBTShow = false;
                        }else{
                            $scope.qsEBTShow = true;
                            $scope.qsNonEBTShow = true;
                        }

                        $scope.qstotals = data.Totals;
                        $scope.qsShowTax  = data.Tax;
                        $scope.qsposchange = data.Change;
                        $scope.qsAllPayments = data.Payments;
                    }).then(function(){
                        scrollOrderListDown();
                    })
                })
            }else{
                $(".listitems").html('');
                $(".CHSlistitemsTotal").html('');
                RowReceiptHeaderUnique = 0;
                GlobalReceiptHeaderUnique = 0;
                GlobalReceiptNumber = '';
            }
        })
    }

    
    //-->Recall Security window
    $(document).on("submit", "#EnterPasscodeRecall", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;//$("#number_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton; 
            posData.RestrictionPasscodeRecall(postdata)
            .success(function(restrict){
                $("#dialog-numpad-passcode").jqxWindow('close');
                if(restrict.success == true){
                    if(restrict.login == true){
                        populateRecall()
                        .then(function(fnvalue){
                            recall_page_popup()
                            .then(function(){
                                SelOnHold();
                            })
                        })
                        
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = restrict.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }  
            }).catch(function(restrict){
                if(LogDisplay == 1){
                    var msg = restrict.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeRecall_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeRecall / EnterPassCodeRecall');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeRecall_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeRecall / EnterPassCodeRecall');	
                    });	
                }
                
            }).finally(function() {
            
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    //-->On Hold Tab
    $(document).on("click", ".recall_onhold", function(){
        Tab = 'OnHold';
        SelOnHold()
        .then(function(){

        })
    })

    //-->Printer Check
    var RecallPrinterCheck = function(){
        var def = $.Deferred();  
        $('#cashier_recall').block({message: 'Printing receipt please wait...'})
        posData.RecallPrinterCheck()
        .success(function(result){
            if(result.success == true){
                if(result.print == true){
                    $('#cashier_recall').unblock();
                    def.resolve();
                }else{
                    $('#cashier_recall').unblock();
                    var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            }else{
                $('#cashier_recall').unblock();
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PrinterCheck_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;		
                NumpadAlertCloseReport('printer_check_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                });
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
        return def.promise();
    };
    
    //-->Print Receipt button
    $(document).on("click", "#btn-print-receipt", function(e){
        e.preventDefault();
            if(RowReceiptHeaderUnique > 0){
            RecallPrinterCheck()
            .then(function(){
                var postdata = "ReceiptHeaderUnique="+RowReceiptHeaderUnique;
                posData.RePrintReceipt(postdata)
                .success(function(data){
                    
                })
            })
        }else{
            var msg = "Please select receipt number";
            NumpadAlertCloseReport('recall_open_receipt', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Print Receipt');
            });
        }
    })

    var Recallurl = base_url + "pos/cashier/recall/location";
    var Recallsource = {
        datatype: "json",
        datafields: [
            { name: 'Unique' },
            { name: 'LocationName' }
        ],
        url: Recallurl,
        async: false
    };
    var RecalldataAdapter = new $.jqx.dataAdapter(Recallsource);

    var populateRecallOpenReceipt = function(form){
        var def = $.Deferred();
        $("#cashier_open_receipt").append('<div class="cashier_open_receipt_container" style="background: #144766; color:#EEE;"></div>');
        $(".cashier_open_receipt_container").html('');
        setTimeout(function(){
            $(".cashier_open_receipt_container").append(
                '<form id="'+form+'">'+
                    '<input type="text" id="recall_open_receipt_field" style="display:none;">'+
                    '<div id="recall_keyboard_open_receipt"></div>'+
                '</form>'
            );  
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupRecallOpenReceipt = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth       = $("#cashier_recall").width();
            var ResoHeight      = $("#cashier_recall").height();
            var useFilterHeight = (ResoHeight / 4);
            $("#cashier_open_receipt").jqxWindow({
                height: useFilterHeight,
                width: '30%',
                title: header_title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#cashier_open_receipt').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    var RecallOpenReceipt = function(form_name){
        var def = $.Deferred();
        populateRecallOpenReceipt(form_name)
        .then(function(){
            $('#recall_keyboard_open_receipt').hdkeyboard({
                layout: "alert_recall_view_edit_cancel",
                input: $('#recall_open_receipt_field')
            });
            def.resolve();
        });
        return def.promise();
    }

    var populateRecallFilter = function(form, html){
        var def = $.Deferred();
        $("#cashier_filter_recall").append('<div class="cashier_filter_recall_container" style="background: #144766; color:#EEE;"></div>');
        $(".cashier_filter_recall_container").html('');
        setTimeout(function(){
            $(".cashier_filter_recall_container").append(html);
            $(".cashier_filter_recall_container").append(
                '<form id="'+form+'">'+
                    '<input type="text" id="recall_number_field" style="display:none;">'+
                    '<div id="recall_keyboard"></div>'+
                '</form>'
            );
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupRecallFilter = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth       = $("#cashier_recall").width();
            var ResoHeight      = $("#cashier_recall").height();
            var useFilterHeight = (ResoHeight / 2);
            $("#cashier_filter_recall").jqxWindow({
                height: useFilterHeight,
                width: '30%',
                title: header_title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#cashier_filter_recall').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }
    
    var RecallFilter = function(form_name, html){
        var def = $.Deferred();
        populateRecallFilter(form_name, html)
        .then(function(){
            $('#recall_keyboard').hdkeyboard({
                layout: "item_reason",
                input: $('#recall_number_field')
            });
            def.resolve();
        });
        return def.promise();
    }

    //-->Recall filter when close the DOM will remove completely
    $("#cashier_filter_recall").on("close", function(event){
         $("div.cashier_filter_recall_container").remove();
    })
    
    //-->Recall filter Cancel button    
    $(document).on("click", "#recall_filter .button_q_cancel", function(){
         $("#cashier_filter_recall").jqxWindow('close');
    })

    //-->Recall filter Ok button
    $(document).on("click", "#btn-filter", function(){
        posData.RecallFilter()
        .success(function(data){
            RecallFilter('recall_filter', data.html)
            .then(function(){
                WindowPopupRecallFilter('Filter')
                .then(function(){
                    $("#recall_date_from").jqxDateTimeInput({width: '100%', height: 40, formatString: 'MM/dd/yyyy'});
                    $("#recall_date_to").jqxDateTimeInput({width: '100%', height: 40, formatString: 'MM/dd/yyyy'});
                    $("#recall_location").jqxComboBox({ source: RecalldataAdapter, selectedIndex: 0, displayMember: "LocationName", valueMember: "Unique", height: 40, width:'100%'});
                    $("#recall_location").val($("#StoreUnique").val());

                    $("#recall_filter").on("click", ".button_proceed", function(e){
                        e.preventDefault();
                        if(Attribute == 'load_transaction_by_type'){
                            Attribute = 'load_transaction_by_type2';
                        }
                        var RecallDatefrom  = $("#recall_date_from").val();
                        var RecallDateto    = $("#recall_date_to").val();
                        var RecallLocation  = $("#recall_location").val();
                        var postdata = "DateFrom="+$filter('date')(new Date(RecallDatefrom), 'yyyy-MM-dd');
                            postdata+= "&DateTo="+$filter('date')(new Date(RecallDateto), 'yyyy-MM-dd');
                            postdata+= "&Location="+RecallLocation;
                            postdata+= "&Tab="+Tab;
                            postdata+= "&Attribute="+Attribute;
                            postdata+= "&Status="+TabStatus;
                            postdata+= "&Type="+Type;
                            postdata+= "&EBT="+EBT;
                        posData.RecallFilterSearch(postdata)
                        .success(function(recdata){
                            var source = {
                                datatype: "json",
                                datafields: recdata.type,
                                localdata: recdata.result
                            };
                            
                            $('#listCashierSale').on('bindingcomplete', function (event) {
                                $('#statusrowlistCashierSale').children().css("background-color", "white")
                            });

                            var dataAdapter = new $.jqx.dataAdapter(source);
                            var ColumnHideShow = $("#PrintReceiptOrderNo").val();
                            $("#listCashierSale").jqxGrid({
                                source: dataAdapter
                            })

                            setTimeout(function(){
                                $("#listCashierSale").jqxGrid('selectrow', 0);
                            },100);
                            
                            bindData("listCashierSale");
                        })
                        $("#cashier_filter_recall").jqxWindow('close');
                    })
                })
            })
        })
    })

    //-->Open Receipt Button
    $(document).on("click", "#btn-use-receipt", function(){
        var postdata="ReceiptHeaderUnique="+RowReceiptHeaderUnique;
            postdata+="&Tab="+Tab;       
        if(RowReceiptHeaderUnique > 0){
            if(TabStatus == 5){
                posData.OpenReceipt(postdata)
                .success(function(data){
                    if(data.success){
                        if(data.can_open){
                            $window.location.href = 'pointofsale';
                        }else{
                            var msg = data.msg;
                            NumpadAlertClose('cannot_open_receipt', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            });
                        }
                    }else{
                        var msg = data.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }else{
                RecallOpenReceipt('recall_open_receipt_q')
                .then(function(){
                    WindowPopupRecallOpenReceipt('Open '+GlobalReceiptNumber)
                })
            }
            
        }else{
            var msg = "Please select receipt number";
            NumpadAlertCloseReport('recall_open_receipt', msg)
            .then(function(){
                //WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Recall / Open Receipt');
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Open Receipt');
            });
        }
    })

    //-->New Sale Button
    $(document).on("click", "#btn-new-receipt", function(){
        posData.RecallCreateReceipt()
        .success(function(create_receipt_result){
            $window.location.href = 'pointofsale';
        }).catch(function(create_receipt_result){
            if(LogDisplay == 1){
                var msg = create_receipt_result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('create_receipt_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('create_receipt_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');	
                });	
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    })

    //-->Payment Button
    $(document).on("click", "#btn-proceed-sale", function(){
        if(RowReceiptHeaderUnique > 0){
            var postdata = "ReceiptHeaderUnique="+RowReceiptHeaderUnique;
            posData.RecallCashierPayment(postdata)
            .success(function(data){    
                if(data.success){
                    if(data.can_open){
                        $window.location.href = 'pointofsale';
                    }else{
                        NumpadAlertCloseReport('cannot_open_receipt', data.msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        }); 
                    }
                }
                
            })
        }else{
            var msg = "Please select receipt number";
            NumpadAlertCloseReport('recall_open_receipt', msg)
            .then(function(){
                //WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Recall / Payment');
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Payment');
            });
        }
    })

    //-->Completed Tab
    $(document).on("click", ".recall_completed", function(){
        SelCompleted()
        .then(function(){

        })
    })

    //-->Cash Tab
    $scope.RecallCashType = function(type){ 
       Attribute = 'CashierRecallCash';
       Type = type;
        SelTabSale(type, Attribute, cashcolumns)
        .then(function(){
            
        })
    }

    //-->Credit Card Tab
    $scope.RecallCCType = function(type){
        Attribute = 'CashierRecallCreditCard';
        Type = type;
        SelTabSale(type, Attribute, creditcardcolumns)
        .then(function(){
            
        })
    }

    //-->Gift Card Tab
    $scope.RecallGCType = function(type){
        Attribute = 'CashierRecallGiftCard';
        Type = type;
        SelTabSale(type, Attribute, giftcardcolunns)
        .then(function(){
            
        })
    }

    //-->Check Tab 
    $scope.RecallCheck = function(type){
        var Attribute = 'CashierRecallCheck';
        Type = type;
        SelTabSale(type, Attribute, checkcolumns)
        .then(function(){
            
        })
    }

    //-->EBT tab 
    $scope.RecallEBT = function(type){
        var Attribute = 'CashierRecallEBT';
        Type = type;
        EBT = 1;        
        SelTabSale(type, Attribute, creditcardcolumns)
        .then(function(){
            
        })
    }

    //-->Voided tab
    $(document).on("click", ".recall_voided", function(){
        TabStatus = 4;
        Attribute = 'CashierRecallVoided';
        var onhold_data = [];
        posData.LoadCashierSale()
        .success(function(data){
            
            $(".cashier-sale-container").html('');
            
            $("#cashier_recall_container").append($compile(data.html)($scope));
                var ResoWidth 	        = $("#cashier_recall").width();
                var ResoHeight 	        = $("#cashier_recall").height();
                var ComputeHeight		= ResoHeight - 140;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var Compute1            = (UseHeight / 2);
                var Compute2            = (Compute1 / 2);
                var OHSListItems        = (UseHeight / 2 + Compute2);
                var TotalHeight         = (Compute1 / 2);
                
                $(".listitems").css("height", OHSListItems);
                $(".CHSlistitemsTotal").css({"height":TotalHeight, "display":"block"});
                
                var postdata ="Tab=load_void_transaction";
                    postdata+="&Status=4";
                    postdata+="&Attribute=CashierRecallVoided";
                    postdata+="&Type="+Type;
                posData.LoadSaleByTab(postdata)
                .success(function(data){
                    Tab = 'load_void_transaction2';
                    var source = {
                        datatype: "json",
                        datafields: data.type,
                        localdata: data.result
                    };
                    $('#listCashierSale').on('bindingcomplete', function (event) {
                        $('#statusrowlistCashierSale').children().css("background-color", "white")
                    });
                    var dataAdapter     = new $.jqx.dataAdapter(source);
                    
                    $("#listCashierSale").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        rowsheight: GridRowHeight,
                        theme: 'darkblue',
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: 25,
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        showaggregates: true,
                        columns: [
                            { text: 'Unique', datafield: 'Unique', hidden: true },
                        ]
                    });

                    setTimeout(function(){
                        $("#listCashierSale").jqxGrid('selectrow', 0);
                    },1000);

                    bindData("listCashierSale");
                    
                    $("#listCashierSale").jqxGrid({ columns: voidedcolumns });
                })
        })
    })

    //-->Recall Open Receipt when close the DOM will remove completely
    $("#cashier_open_receipt").on("close", function(event){
         $("div.cashier_open_receipt_container").remove();
    })


    //-->Recall Open Receipt Cancel
    $(document).on("click", "#recall_open_receipt_q .button_cancel", function(){
        $('#cashier_open_receipt').jqxWindow('close');
    })

    $(document).on("click", "#recall_open_receipt_q .button_view", function(e){
        e.preventDefault();
        var postdata="ReceiptHeaderUnique="+RowReceiptHeaderUnique;
        posData.ViewReceipt(postdata)
        .success(function(data){
            if(data.success == true){
                if(data.can_open){
                    $window.location.href = 'pointofsale';
                }else{
                    NumpadAlertCloseReport('cannot_open_receipt', data.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    }); 
                }
            }
        })
    }) 

    $(document).on('click', '#recall_open_receipt_q .button_edit', function(){
        var postdata = "ReceiptHeaderUnique="+RowReceiptHeaderUnique;
        posData.EditReceipt(postdata)
        .success(function(data){
            if(data.success == true){
                if(data.can_open){
                    $window.location.href = 'pointofsale';
                }else{
                    NumpadAlertCloseReport('cannot_open_receipt', data.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    }); 
                } 
            }
        })
    })

    /*
    |-------------------------------------------------------------------------------|
    | Redirect to Dashboard Reports
    |-------------------------------------------------------------------------------|
    */
    $scope.Reports = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                /*
                $("#Reportfunction").attr({"disabled":true});
                NumpadPasscode('EnterPasscodeReports')	
                .then(function(){
                    WindowPopupPasscode('Reports | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    });
                });
                FunctionButton = 'Reports';
                
                $scope.$broadcast('Reports');
                setTimeout(function(){
                    $("#Reportfunction").attr({"disabled":false});
                },1000);
                */
                $window.location = base_url + 'backoffice/reports/get';
            }else{
                $window.location = base_url + 'backoffice';
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / Reports');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('CheckCache', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CheckCache / Reports');	
                });	
            }
            
        }).finally(function() {
        
        })
    }

    $(document).on("submit", "#EnterPasscodeReports", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;//$("#number_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&FunctionButton="+FunctionButton; 
            posData.RestrictionPasscodeReports(postdata)
            .success(function(restrict){
                $("#dialog-numpad-passcode").jqxWindow('close');
                if(restrict.success == true){
                    if(restrict.login == true){
                        $window.location =  base_url + 'backoffice/reports/get';
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');	
                        var msg = restrict.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }  
            }).catch(function(restrict){
                if(LogDisplay == 1){
                    var msg = restrict.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeReports_error', msg)
                    .then(function(){
                        WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeReports / EnterPassCodeReports');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('RestrictionPasscodeReports_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> RestrictionPasscodeReports / EnterPassCodeReports');	
                    });	
                }
                
            }).finally(function() {
            
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow('close');	
            var msg = "Passcode cannot be empty";	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            }) 
        }
    })


    /*
    |------------------------------------------------------------------------------------------|
    | Cash In by station
    |------------------------------------------------------------------------------------------|  
    */
    $scope.CashInStation = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
               $(".newsale").attr({"disabled": true}); 
                FunctionButton = 'CashIn';  
                NumpadPasscode('EnterCashInStationPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash In | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false}); 
                        },1000); 
                    })  
                }) 
            }
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CashIn');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;	
                NumpadAlertCloseReport('cashin_error', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CashIn');	
                });	
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
    }

    /*
    |-----------------------------------------------------------------------------
    | Cash In by Station
    |-----------------------------------------------------------------------------
    */
    var CashInStationUserId = 0;
    $(document).on('submit', '#EnterCashInStationPasscode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var process = false;
            var passcode = CRP.converted;//$("#number_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+FunctionButton;
            posData.CheckUserPasscode(postdata)
            .success(function(data){
                if(data.valid_user){
                    CashInStationUserId = data.userid;
                    if(data.can_login){
                        var newuser = data.userid;
                        var postdata ="UserUnique="+data.userid;
                        posData.CashInStationCheck(postdata)
                        .success(function(data2){
                            if(data2.cashin){
                                username = data2.info.UserName;
                                if(newuser == data2.info.UserUnique){
                                    process = true;
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    var msg = username + ' already Cashed In';
                                    NumpadAlertOk('cashed_in', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }
                            }else{
                                process = true;
                            }
                                
                            if(process){
                                var date = new Date();
                                timeclock_message = '';
                                var postdata ="user_unique="+newuser;
                                    postdata+="&status="+1;
                                posData.TimeClockCheck(postdata)
                                .success(function(datacheck){
                                    if(datacheck.status == 0) {
                                        $("#dialog-numpad-passcode").jqxWindow('close');
                                        if($scope.ClockInCheck == 1){
                                            $("#dialog-numpad-passcode").jqxWindow('close');	
                                            var msg = 'Please Clock In first';	
                                            NumpadAlertOk('clock_in_first', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                            })
                                        }else{
                                            var postdata ="UserUnique="+newuser;
                                            posData.CheckCashDrawerMutipleCashInStation(postdata)
                                            .success(function(result){
                                                if(result.Setting == true){
                                                    if(result.CashDrawerSetup == true){
                                                        OpenCashDrawer();
                                                        NumpadPriceChange('SaveAmountCashInStation')
                                                        .then(function(){
                                                            WindowPopupPriceChange('Cash In')
                                                            .then(function(){
                                                                $("#number_field").val('0.00');
                                                                $("#number_field").focus();
                                                                setTimeout(function(){
                                                                    $("#number_field").select();
                                                                },100);
                                                            })
                                                        })
                                                    }else{
                                                        var postdata ="UserUnique="+newuser;
                                                        posData.CashDrawerOptionCashInStation(postdata)
                                                        .success(function(result2){
                                                            CashierDrawerView('cash_drawer_setup_by_cashin_station', result2.html)
                                                            .then(function(){
                                                                WindowPopupCashierDrawer('Cash Drawer');
                                                            })
                                                        })
                                                    }
                                                }else{
                                                    OpenCashDrawer();
                                                    NumpadPriceChange('SaveAmountCashInStation')
                                                    .then(function(){
                                                        WindowPopupPriceChange('Cash In')
                                                        .then(function(){
                                                            $("#number_field").val('0.00');
                                                            $("#number_field").focus();
                                                            setTimeout(function(){
                                                                $("#number_field").select();
                                                            },100);
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    }else{
                                        $("#dialog-numpad-passcode").jqxWindow('close');
                                        var postdata ="UserUnique="+newuser;
                                        posData.CheckCashDrawerMutipleCashInStation(postdata)
                                        .success(function(result){
                                            if(result.Setting == true){
                                                if(result.CashDrawerSetup == true){
                                                    OpenCashDrawer();
                                                    var CashInAmount = 0
                                                    if(data2.amount == 0){
                                                        CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                    }else{
                                                        CashInAmount = parseFloat(0).toFixed(2);
                                                    }
                                                    NumpadPriceChange('SaveAmountCashInStation')
                                                    .then(function(){
                                                        WindowPopupPriceChange('Cash In')
                                                        .then(function(){
                                                            $("#number_field").val(CashInAmount);
                                                            $("#number_field").focus();
                                                            setTimeout(function(){
                                                                $("#number_field").select();
                                                            },100);
                                                        })
                                                    })
                                                }else{
                                                    var postdata ="UserUnique="+newuser;
                                                    posData.CashDrawerOptionCashInStation(postdata)
                                                    .success(function(result2){
                                                        CashierDrawerView('cash_drawer_setup_by_cashin_station', result2.html)
                                                        .then(function(){
                                                            WindowPopupCashierDrawer('Cash Drawer');
                                                        })
                                                    })
                                                }
                                            }else{
                                                OpenCashDrawer();
                                                var CashInAmount = 0
                                                if(data2.amount != 0){
                                                    CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                }else{
                                                    CashInAmount = parseFloat(0).toFixed(2);
                                                }
                                                NumpadPriceChange('SaveAmountCashInStation')
                                                .then(function(){
                                                    WindowPopupPriceChange('Cash In')
                                                    .then(function(){
                                                        $("#number_field").val(CashInAmount);
                                                        $("#number_field").focus();
                                                        setTimeout(function(){
                                                            $("#number_field").select();
                                                        },100);
                                                    })
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        NumpadAlertOk('not_authorized', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    NumpadAlertOk('invalid_passcode', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    /*
    |--------------------------------------------------------------------------------
    | Save Amount Cash In by Station
    |--------------------------------------------------------------------------------
    */
    $(document).on('submit', '#SaveAmountCashInStation', function(e){
        e.preventDefault();
        var enteredAmount = $("#number_field").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
		}

        var postdata ="Amount="+enteredAmount;
        posData.SaveAmountCashInStation(postdata)
        .success(function(result){
            if(result.save){
                $("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.CashInPrint){
                    PrinterCashInStationCheck();
                }else{
                   LoadHeaderInfo(); 
                }
            }else{
                $("#dialog-numpad-enter-amount").jqxWindow('close');
            }
        })

    })

    /*
    |--------------------------------------------------------------------------------
    | Printer Check and Print Cash In by Station
    |--------------------------------------------------------------------------------
    */
    var PrinterCashInStationCheck = function(){
        var def = $.Deferred();  
        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px' 
        }, message: 'Checking Printer connection...' });
        posData.PrinterCashInStationCheck()
        .success(function(result){
            $("#dialog-numpad-enter-amount").jqxWindow('close');
            if(result.success == true){
                if(result.print == true){
                    setTimeout($.unblockUI, 100); 
                }else{
                    setTimeout($.unblockUI, 100); 
                    var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            }else{
                setTimeout($.unblockUI, 100); 
            }
            LoadHeaderInfo();
            def.resolve();
        }).catch(function(result){
            if(LogDisplay == 1){
                var msg = result.data+'<br/>'
                    msg+= notifyMessage;
                NumpadAlertCloseReport('PrinterCheck_error', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                });
            }else{
                var msg = 'Technical issue '+'<br/>'
                    msg+= notifyMessage;		
                NumpadAlertCloseReport('printer_check_error', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                });
            }
            
        }).finally(function() {
            //console.log("finally finished repos");
        })
        return def.promise();
    }

    $(document).on('click', "#cash_drawer_setup_by_cashin_station .button_proceed", function(e){
        e.preventDefault();
        var DrawerSelected = $('input[type=radio][name=group1]:checked').attr('id');
        if(DrawerSelected){
            var postdata="CashDrawerOption="+DrawerSelected;
                postdata+="&UserId="+CashInStationUserId;
            posData.SelectedCashDrawerCashIn(postdata)
            .success(function(result){
                $('#dialog-cash-drawer').jqxWindow('close');
                OpenCashDrawer();
                SelectCashDrawerCashInStation();
            })
        }else{
            var msg = "Select Cash Drawer first";	
            NumpadAlertOk('no_cashdrawer_selected', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign">Information</span>');	
            })  
        }
    })

    var SelectCashDrawerCashInStation = function(){
        var CashInAmount = 0;
        posData.GetCashInAmount()
        .success(function(data){
            if(data.CashIn != 0){
                CashInAmount = parseFloat(data.CashIn).toFixed(2);
            }else{
                CashInAmount = parseFloat(0).toFixed(2);
            }
            NumpadPriceChange('SaveAmountCashInStation')
            .then(function(){
                WindowPopupPriceChange('Cash In')
                .then(function(){
                    $("#number_field").val(CashInAmount);
                    $("#number_field").focus();
                    setTimeout(function(){
                        $("#number_field").select();
                    },100);
                })
            })
        })
    }

    $(document).on("click", "#cash_drawer_setup_by_cashin_station .button_q_cancel", function(e){
        e.preventDefault();
         $('#dialog-cash-drawer').jqxWindow('close');
    })

    /*
    |-----------------------------------------------------------------------------------------------|
    | Cash Out by Station
    |-----------------------------------------------------------------------------------------------|
    */
    $scope.CashOutStation = function(){
       posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true}); 
                posData.CashInStationCheckCashOut()
                .success(function(data){
                    if(data.cashin == true){
                        NumpadPasscode('EnterCashOutStationPasscode')
                        .then(function(){
                            WindowPopupPasscode('Cash Out | Enter Passcode')
                            .then(function(){
                                $("#number_field").focus();
                            })
                        })	
                    }else{
                        var msg = 'Please Cash In first';
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                    setTimeout(function(){
                        $(".newsale").attr({"disabled": false}); 
                    },1000);
                })
            }else{
               location.reload(); 
            }
        })
    }

    var ServerCashInByStationList = function(Unique){
        var postdata ="UserUnique="+Unique;
        posData.ListCashInByStation(postdata)
        .success(function(data){
            ServerCashInListView('server_by_station_list_option', data.html)
            .then(function(){
                WindowServerCashInList('Cash Out');
            })
        })
    }

    /*
    |--------------------------------------------------------------------------------|
    | Cash Out Station Passcode
    |--------------------------------------------------------------------------------|
    */
    var CashOutStationUserUnique;
    $(document).on('submit', '#EnterCashOutStationPasscode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var security        = ['CashOutUser', 'CashOut'];
            var passcode        = CRP.converted;
            var hashpasscode    = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
            var postdata ="FunctionButton="+JSON.stringify(security);
                postdata+="&Passcode="+hashpasscode;
            posData.CheckUserSecurityByStation(postdata)
            .success(function(data){
                if(data.validuser){
                    CashOutStationUserUnique = data.UserUnique;
                    if(data.OpenUserList){
                        LoadHeaderInfo();
                        ServerCashInByStationList(data.UserUnique);
                    }else{
                        if(data.countposition > 0){
                            if($scope.CashOutBlind > 0){
                                LoadHeaderInfo();
                                OpenCashDrawer();
                                CashCountProcessServerBlind(data.StationCashierUnique);
                            }else{
                                LoadHeaderInfo();
                                OpenCashDrawer();
                                CashCountProcessServer(data.StationCashierUnique);
                            }
                        }else{
                            var msg = "Sorry, you don't have permission";
                            NumpadAlertClose('invalid_cashout_server_code', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            });
                        }
                    }
                    $("#dialog-numpad-passcode").jqxWindow("close");
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow('close');	
            var msg = 'Invalid code';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })	 
        }
    })

    $(document).on('click', '#server_by_station_list_option .button_proceed', function(){
        var UserUnique = $('input[type=radio][name=group1]:checked').attr('id');
        if(UserUnique){
            //var postdata ="UserUnique="+UserUnique;
            var postdata ="UserUnique="+CashOutStationUserUnique;
            posData.CashOutStationCheckCashIn(postdata)
            .success(function(data){
                OpenCashDrawer();
                if($scope.CashOutBlind > 0){
                    CashCountProcessServerBlind(data.info.Unique);
                }else{
                    CashCountProcessServer(data.info.Unique);
                }
            })
            $("#server_cashin").jqxWindow('close');
        }else{
            var msg = "Please select option";
            NumpadAlertClose('invalid_cashout_server_code', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });
        }
    })

    $(document).on('click', '#server_by_station_list_option .button_q_cancel', function(){
        $("#server_cashin").jqxWindow('close');
    })
    /*
    |-----------------------------------------------------------------------------------------------|
    | Cash Out by Station (Old)
    |-----------------------------------------------------------------------------------------------|
    $scope.CashOutStation = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true}); 
                FunctionButton = 'CashOut';  
                posData.CashInStationCheckCashOut()
                .success(function(result2){
                    if(result2.cashin == true){
                        NumpadPasscode('EnterCashOutStationPasscode')
                        .then(function(){
                            WindowPopupPasscode('Cash Out | Enter Passcode')
                            .then(function(){
                                $("#number_field").focus();
                            })
                        })	
                    }else{
                        var msg = 'Please cash in first';
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                    setTimeout(function(){
                        $(".newsale").attr({"disabled": false}); 
                    },1000);
                })
            }else{
               location.reload(); 
            }
        })
    }
    */

    /*
    |--------------------------------------------------------------------------------|
    | Cash Out Station Passcode
    |--------------------------------------------------------------------------------|
    $(document).on('submit', '#EnterCashOutStationPasscode', function(e){
        e.preventDefault();
        var station_cashier_unique = $scope.station.cunique;
        var passcode = $("#number_field").val();
        var hashpasscode = CryptoJS.MD5(passcode);
        var postdata ="Passcode="+hashpasscode;
            postdata+="&FunctionButton="+FunctionButton;
        posData.CashOutStationPasscode(postdata)
        .success(function(data){
            $("#dialog-numpad-passcode").jqxWindow("close");
            if(data.valid_user){
                if(data.can_login){
                    var date = new Date();
                    timeclock_message = '';
                    var postdata="user_unique="+data.userid;
                        postdata+="&status="+1;
                    posData.TimeClockCheck(postdata)
                    .success(function(datacheck){
                        if(datacheck.status == 0){
                            if($scope.ClockInCheck == 1){	
                                var msg = 'Please Clock In first';	
                                NumpadAlertOk('clock_in_first', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                            }else{
                                LoadHeaderInfo();
                                if($scope.CashOutBlind > 0){
                                    CashCountProcessServerBlind();
                                }else{
                                    CashCountProcessServer();
                                }
                            }
                        }else{
                            LoadHeaderInfo();
                            if($scope.CashOutBlind > 0){
                                CashCountProcessServerBlind();
                            }else{
                                CashCountProcessServer();
                            }
                        }
                    })
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = data.msg;	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                var msg = 'Invalid code';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        })
    })
    */

    $scope.FinalCashOutStation = function(){
        DownCount = 0;
        CountCount = 0;
        var emailmsgUnique;
        var UserUnique;
        
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
		var postdata ="cashtype=2";
		    postdata+="&amount="+$("#cash-out-keypad-number").val();
		posData.SaveAmountCashOutStation(postdata)
		.success(function(result){
			if(result.success == true){
				//PrinterCheck();
			}
			dialogCashCountForm.close();
            $("#cashier_cashout_q").jqxWindow("close");

            if(result.CashOutPrint){
                var postdata ="StationCashierUnique="+result.StationCashierUnique;
                posData.CashOutConvertPDF(postdata)
                .success(function(convert){
                    if(convert.SendEmail){
                        emailmsgUnique = convert.emailmsgUnique; 
                        UserUnique = convert.UserUnique;
                    }
                    
                    PrinterCashOutStationCheck()
                    .then(function(){
                        posData.UnsetCashDrawerByStation()
                        .success(function(result2){
                            var postdata ="EmailMessageUnique="+emailmsgUnique;
                                postdata+="&UserUnique="+UserUnique;
                            posData.CashOutSendEMail(postdata)
                            .success(function(send){
                                
                            })
                        })
                    })
                })
            }else{
                posData.UnsetCashDrawerCashOut()
                .success(function(result3){
                   LoadHeaderInfo();
                })
            }
		})
    }

    $scope.FinalCashOutStationCancel = function(){ 
        $("#cashier_cashout_q").jqxWindow("close");
    }


    /*
    |--------------------------------------------------------------------------------|
    | Printer Check Cash Out Station
    |--------------------------------------------------------------------------------|
    */
    var PrinterCashOutStationCheck = function(){
            var def = $.Deferred();  
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Checking Printer connection...' });
        
            posData.PrinterCashOutStationCheck()
            .success(function(result){
                $("#dialog-numpad-enter-amount").jqxWindow('close');
                if(result.success == true){
                    if(result.print == true){
                        setTimeout($.unblockUI, 100); 
                    }else{
                        setTimeout($.unblockUI, 100); 
                        var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    setTimeout($.unblockUI, 100); 
                }
                LoadHeaderInfo();
                def.resolve();
            }).catch(function(result){
                if(LogDisplay == 1){
                    var msg = result.data+'<br/>'
                        msg+= notifyMessage;
                    NumpadAlertCloseReport('PrinterCheck_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
                    });
                }else{
                    var msg = 'Technical issue '+'<br/>'
                        msg+= notifyMessage;		
                    NumpadAlertCloseReport('printer_check_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
                    });
                }
                
            }).finally(function() {
                //console.log("finally finished repos");
            })
            return def.promise();
      };

      /*
      |----------------------------------------------------------------------------
      | Receipt Report Section
      |----------------------------------------------------------------------------
      */
      /*
      |-->Window Popup
      */
      $(document).on('close', '#receipt_report_view', function(){
          $("receipt_report_view").html('');
      })
      var populateReceiptReport = function(){
            var def = $.Deferred();
            $("#receipt_report_view").append('<div id="receipt_report_view_container" style="background: #144766; color:#EEE;"></div>');
            $("#receipt_report_view_container").html('');
            posData.LoadConfigReportReceipt()
            .success(function(data){
                $("#receipt_report_view_container").append($compile(data.html)($scope));
                def.resolve();
            })
            return def.promise();
      }

      var WindowReceiptReport = function(server){
            var def = $.Deferred();
            setTimeout(function(){
                $("#receipt_report_view").jqxWindow({
                    height: '100%',
                    width: '100%',
                    title: 'Receipt Report | '+server,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
                    resizable: false,
                    draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                $('#receipt_report_view').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
      }

      var ReceiptReportView = function(server){
          populateReceiptReport()
          .then(function(){
              WindowReceiptReport(server);
          })
      }

      $scope.ReceiptReport = function(){
          posData.CheckCache()
          .success(function(result){
            if(result.store){
                $(".newsale").attr({"disabled": true}); 
                FunctionButton = 'ReceiptReport';  
                NumpadPasscode('EnterReceiptReportPasscode')	
                .then(function(){
                    WindowPopupPasscode('Report Receipt | Enter Passcode')
                    .then(function(){
                        $("#number_field").focus();
                        setTimeout(function(){
                            $(".newsale").attr({"disabled": false}); 
                        },1000); 
                    })  
                })
                $scope.cashtype = 1;
                $scope.$broadcast("focusCashIn");
            }else{
                location.reload();
            }
         })
      }

      /*
      |------------------------------------------------------------------------|
      | Receipt Report Button
      |------------------------------------------------------------------------|
      */
      $(document).on("submit", "#EnterReceiptReportPasscode", function(e){
            e.preventDefault();
            var CardRead = $("#number_field").val();
            var CRP = new CardReaderParser(CardRead);
            if(CRP.converted){
                var passcode    = CRP.converted;//$("#number_field").val();
                var hashpasscode= CryptoJS.MD5(passcode);
                var postdata    ="Passcode="+hashpasscode;
                posData.ReceiptReportEnterPasscode(postdata)
                .success(function(data){
                    if(data.valid){
                        var UserUnique = data.info.Unique;
                        var UserName = data.UserName;
                        ReceiptReportView(UserName);
                    }else{
                        NumpadAlertOk('invalid_passcode', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                    $("#dialog-numpad-passcode").jqxWindow('close');
                })
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                var msg = 'Passcode cannot be empty';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
       })
      
      $(document).on('close', '#receipt_report_tips_by_server', function(){
          $("#receipt_report_tips_by_server").html('');
      })

      /*
      |-------------------------------------------------------------------------|
      | Tips By Server Window Popup Preparation
      |-------------------------------------------------------------------------|
      */
      var populateTipsByServer = function(){
            var def = $.Deferred();
            $("#receipt_report_tips_by_server").append('<div id="receipt_report_tips_by_server_container" style="background: #144766; color:#EEE;"></div>');
            $("#receipt_report_tips_by_server_container").html('');
            $("#receipt_report_tips_by_server_container").append(
                '<div style="float:left; overflow:hidden; margin:2px;">'+
                '   <div id="station_closing_list"></div>'+
                '</div>'+
                '<div style="float:left; overflow:hidden; margin:2px;">'+
                '   <button id="TipsByServerPrint" class="btn btn-warning btn-lg">Print</button>'+
                '</div>'
            );
            posData.LoadStationClosing()
            .success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'StartEnd' }
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#station_closing_list").jqxComboBox({ selectedIndex: 0, source: dataAdapter, displayMember: "StartEnd", valueMember: "Unique", width: 380, height: 40});
                $("#station_closing_list").on('select', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        if (item) {
                            var valueelement = $("<div></div>");
                            valueelement.text("Value: " + item.value);
                            var labelelement = $("<div></div>");
                            labelelement.text("Label: " + item.label);
                        }
                    }
                });
                def.resolve();
            })
            return def.promise();
      }

      var WindowTipsByServer = function(){
            var def = $.Deferred();
            setTimeout(function(){
                $("#receipt_report_tips_by_server").jqxWindow({
                    height: 100,
                    width: 500,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
                    resizable: false,
                    draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                $('#receipt_report_tips_by_server').jqxWindow('setTitle', 'Receipt Report List');
                $('#receipt_report_tips_by_server').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
      }

      var TipsByServerList = function(){
          populateTipsByServer()
          .then(function(){
              WindowTipsByServer();
          })
      }

      /*
      |-----------------------------------------------------------------------------|
      | Tips By Server Button
      |-----------------------------------------------------------------------------|
      */
      $scope.TipsByServer = function(){
          TipsByServerList();
      }

      /*
      |-----------------------------------------------------------------------------|
      | Tips By Server Print Receipt Button
      |-----------------------------------------------------------------------------|
      */
      $(document).on('click', '#TipsByServerPrint', function(){
            var StationClosing = $("#station_closing_list").val();
            var postdata ="StationClosingUnique="+StationClosing;
                postdata+="&PrintReceipt=1";
            posData.PrintTipByServer(postdata)
            .success(function(data){
                if(data.success){
                    if(data.print){

                    }else{
                        NumpadAlertOk('print_failed', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    NumpadAlertOk('print_failed', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
      })

      /*
      |-----------------------------------------------------------------------------|
      | Closing Report Window Popup
      |-----------------------------------------------------------------------------|
      */
      var populateClosingReport = function(){
            var def = $.Deferred();
            $("#receipt_closing_report").append('<div id="receipt_closing_report_container" style="background: #144766; color:#EEE;"></div>');
            $("#receipt_closing_report_container").html('');
            $("#receipt_closing_report_container").append(
                '<div style="float:left; overflow:hidden; margin:2px;">'+
                '   <div id="station_closing_list_cp"></div>'+
                '</div>'+
                '<div style="float:left; overflow:hidden; margin:2px;">'+
                '   <button id="ClosingReportPrint" class="btn btn-warning btn-lg">Print</button>'+
                '   <button id="ClosingReportEndOfDay" class="btn btn-danger btn-lg">End of day</button>'+
                '</div>'
            );
            posData.LoadStationClosing()
            .success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'StartEnd' }
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#station_closing_list_cp").jqxComboBox({ selectedIndex: 0, source: dataAdapter, displayMember: "StartEnd", valueMember: "Unique", width: 380, height: 40});
                $("#station_closing_list_cp").on('select', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        if (item) {
                            var valueelement = $("<div></div>");
                            valueelement.text("Value: " + item.value);
                            var labelelement = $("<div></div>");
                            labelelement.text("Label: " + item.label);
                        }
                    }
                });
                def.resolve();
            })
            return def.promise();
      }

      var WindowClosingReport = function(){
            var def = $.Deferred();
            setTimeout(function(){
                $("#receipt_closing_report").jqxWindow({
                    height: 100,
                    width: 630,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
                    resizable: false,
                    draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                $('#receipt_closing_report').jqxWindow('setTitle', 'Receipt Report List');
                $('#receipt_closing_report').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
      }

      var TipsByServerListCP = function(){
          populateClosingReport()
          .then(function(){
              WindowClosingReport();
          })
      }

      /*
      |-----------------------------------------------------------------------------|
      | Closing Report Button
      |-----------------------------------------------------------------------------|
      */
      $scope.ClosingReport = function(){
         TipsByServerListCP();
      }

      $(document).on("click", "#ClosingReportPrint", function(){
            var StationClosing = $("#station_closing_list_cp").val();
            var postdata ="StationClosingUnique="+StationClosing;
                postdata+="&PrintReceipt=4";
            posData.PrintClosingReport(postdata)
            .success(function(data){
                if(data.success){
                    if(data.print){

                    }else{
                        NumpadAlertOk('print_failed', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    NumpadAlertOk('print_failed', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
      })
      
      var populateNumpadAlertWithScroll = function(form_name, msg){
        var def = $.Deferred();
        setTimeout(function(){
            $("#alert-msg-popup").append(''+
            '<form id="'+form_name+'">'+
                '<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
                '<div style="height: 330px">'+
                '<h4>'+msg+'</h4>'+
                '</div>'+
                '<br/>'+
                '<div id="keyboard_scroll"></div>'+
            '</form>');
            def.resolve();
        },100);
        return def.promise();
      }

      var WindowPopupAlertWidthScroll = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").jqxWindow({
				height: 460,
				minWidth: 400,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
    
      var NumpadAlertWithScroll = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertWithScroll(form, msg)
		.then(function(){
			$('#keyboard_scroll').hdkeyboard({
			   layout: "alert_ok",
			   input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
	  }

    $(document).on("click", "#ClosingReportEndOfDay", function(){
        posData.UpdateStationClosing()
        .success(function(data){
            if(data.cashout){
                var msg = "End of day completed";
                NumpadAlertOk('endofday_completed', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                }) 
            }else{
                NumpadAlertWithScroll('cashout_failed', data.servers)
                .then(function(){
                    WindowPopupAlertWidthScroll ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        })
    })
      
    /*
    |--------------------------------------------------------------------
    | End Of Day Completed
    |--------------------------------------------------------------------
    */
    $(document).on('click', '#endofday_completed', function(e){
        e.preventDefault();
        $('#receipt_report_view').jqxWindow('close'); 
        $("#receipt_closing_report").jqxWindow('close');
        $('#dialog-numpad-alert').jqxWindow('close');
    })

    /*
    |---------------------------------------------------------------------
    | Print Cash Out 
    |---------------------------------------------------------------------
    */
    $scope.PrintCashOut = function(){
        posData.PrintCashOut()
        .success(function(){
            
        })
    }

    /*
    |--------------------------------------------------------------------
    | Cash Out Report
    |--------------------------------------------------------------------
    */
    $(document).on('close', "#cash_out_report", function(){
        $('#cash_out_report').html('');
    })

    var populateCashOutReport = function(form_name, msg){
        var def = $.Deferred();
        $("#cash_out_report").append('<div id="cash_out_report_container" style="background: #144766; color:#EEE;"></div>');
        $("#cash_out_report_container").html('');
        $("#cash_out_report_container").append(
            '<div style="width:100%;">'+
                '<div style="float:left; margin-right: 5px;">'+
                    '<span>Date From:</span>'+
                    '<div id="cashout_daterange_from"></div>'+
                '</div>'+
                '<div style="float:left; margin-right: 5px">'+
                    '<span>Date To:</span>'+
                    '<div id="cashout_daterange_to"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<span>Location</span>'+
                    '<div id="cashout_location"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-primary btn-lg" id="cashout_search"><span class="glyphicon glyphicon-search"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-warning btn-lg" id="cashout_print"><span class="glyphicon glyphicon-print"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-danger btn-lg" id="cashout_close"><span class="glyphicon glyphicon-remove"></span></button>'+
                '<div>'+
            '</div>'
        );
        $("#cash_out_report_container").append(
            '<div style="float:left; width: 100%;">'+
                '<div id="cashout_history"></div>'+
            '</div>'
        )
        CashReport();
        $("#cashout_daterange_from").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
        $("#cashout_daterange_to").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
        posData.GetLocation()
        .success(function(data){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'LocationName' }
                ],
                localdata: data.location,
                async: false
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cashout_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: '250', height: '40px'});
            $("#cashout_location").val(data.curLocation);
            def.resolve();
        })
        return def.promise();
    }

    var WindowPopupCashOutReport = function(header_text){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth 	        = $("#fakeheight").width();
            var ResoHeight 	        = $("#fakeheight").height();
            var ComputeHeight		= ResoHeight - 50;
            var CustomerSearch 		= ComputeHeight - 40;
            var UseHeight			= CustomerSearch;
            var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
            $("#cash_out_report").jqxWindow({
                height: ResoHeight,
                minWidth: '100%',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            setTimeout(function(){
                $('#cash_out_report').jqxWindow('setTitle', header_text);
                $('#cash_out_report').jqxWindow('open');
            },100);
            def.resolve();	
        },100);
        return def.promise();
    }

    var NumpadCashOutReport = function(form, msg){
		var def = $.Deferred();
		populateCashOutReport(form, msg)
		.then(function(){
			def.resolve();
		});
		return def.promise();
	}

    /*
    |------------------------------------------------------------------
    | Receipt Report Cash Out
    |------------------------------------------------------------------
    */
     $scope.CashOutReport = function(){
        NumpadCashOutReport()
        .then(function(){
            WindowPopupCashOutReport('Cash Out')
            .then(function(){

            })
        })
     }
    /*
    |------------------------------------------------------------------
    | Cash Out Grid
    |------------------------------------------------------------------
    */ 
    var CashReport = function(){
        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 60;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
        $("#cashout_history").jqxGrid({
            width: "100%",
            height: UseHeight,
            columnsresize: true,
            theme: 'arctic',
            sortable: true,
            pageable: true,
            pageSize: ComputeDisplayRow,
            scrollbarsize: 25,
            pagerMode: 'advance',
            altRows: true,
            showfilterrow: true,
            filterable: true,
            source:  {
                dataType: "json",
                dataFields: [
                    { name: 'Unique', type : 'int'},
                    { name: 'Closing', type: 'int'},
                    { name: 'Location', type: 'string'},
                    { name: 'Station', type: 'string'},
                    { name: 'UserName', type: 'string'},
                    { name: 'CashIn', type: 'string'},
                    { name: 'CashOut', type: 'string'},
                    { name: 'LocationUnique', type: 'int'},
                    { name: 'StationUnique', type: 'int'},
                    { name: 'UserUnique', type: 'int'}
                ],
                localdata: {}
            },
            columnsResize: true,
            columns: [
                { text: 'ID', dataField: 'Unique', width: "7%" },
                { text: 'Closing', dataField: 'Closing', width: "15%", filtertype: 'input'},
                { text: 'Location', dataField: 'Location', width: "15%", filtertype: 'input' },
                { text: 'Station', dataField: 'Station', width: '15%', filtertype: 'input' },
                { text: 'UserName', dataField: 'UserName', width: '15%' }, 
                { text: 'CashIn', dataField: 'CashIn', width: '17%' }, 
                { text: 'CashOut', dataField: 'CashOut', width: '17%'}
            ]
        })
    }
    /*
    |------------------------------------------------------------------
    | Cash Out Search
    |------------------------------------------------------------------
    */
    $(document).on('click', '#cashout_search', function(e){
        e.preventDefault();
        var daterange_from = $("#cashout_daterange_from").val();
        var daterange_to   = $("#cashout_daterange_to").val();
        var selocation = $("#cashout_location").val();
        var postdata ="daterange_from="+daterange_from;
            postdata+="&daterange_to="+daterange_to;
            postdata+="&location="+selocation;
        posData.CashOutSearch(postdata)
        .success(function(data){
            if(data.success){
                var source = {
                    dataType: "json",
                    localdata: data.cashout_data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#cashout_history").jqxGrid({
                    source: dataAdapter
                })
            }
        })
    })
    /*
    |------------------------------------------------------------------
    | Cash Out Row Click
    |------------------------------------------------------------------
    */
    $(document).on("rowclick", "#cashout_history", function(event) {
        var row = event.args.rowindex;
        var datafield = event.args.datafield;
        var datarow = $(this).jqxGrid('getrowdata', row);
        
    });
    /*
    |------------------------------------------------------------------
    | Cash Out Re Print Button
    |------------------------------------------------------------------
    */
    $(document).on("click", "#cashout_print", function(){
        var index   = $('#cashout_history').jqxGrid('selectedrowindex'); 
        var row = $("#cashout_history").jqxGrid('getrowdata', index);

        if(row.Unique > 0){
            var postdata ="LocationUnique="+row.LocationUnique;
                postdata+="&StationUnique="+row.StationUnique;
                postdata+="&UserUnique="+row.UserUnique;
                postdata+="&StationCashierUnique="+row.Unique;
                postdata+="&Station="+row.Station;
            posData.CashOutReportPrint(postdata)
            .success(function(data){
               
            })
        }else{
            var msg = "Please select Cash Out report first.";
            NumpadAlertOk('print_failed', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })
    /*
    |------------------------------------------------------------------
    | Cash Out Close Window
    |------------------------------------------------------------------
    */
    $(document).on('click', '#cashout_close', function(){
         $('#cash_out_report').jqxWindow('close');
    })

    $("#AkamaiPOSRefresh").click(function(){
        $window.location.href = '';
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

.directive('focusOn', function() {
    return function(scope, elem, attr) {
        scope.$on(attr.focusOn, function(e) {
            elem[0].focus();
        });
    };
})

.directive('dialogAlert', function(){
  return {
    retrict: 'E',
    templateUrl: base_url + 'pos/pointofsale/dialog-alert'
  };
})

.directive('cashCount', function(){
    return {
       restrict: 'E',
       templateUrl: base_url + 'pos/cashier/cash-count-form'
    }
})

.directive('cashoutPrompt', function(){
    return {
        restrict: 'E',
        templateUrl: base_url + 'pos/cashier/cash-out-prompt'
    }
})

.directive('numPad', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'pos/module/numpad'
	}
})


.directive('smartFloat', function ($filter) {
    var FLOAT_REGEXP_1 = /^[-+]?\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
    var FLOAT_REGEXP_2 = /^[-+]?\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
    var FLOAT_REGEXP_3 = /^[-+]?\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
    var FLOAT_REGEXP_4 = /^[-+]?\$?\d+(\,\d*)?$/; //Numbers like: 1123,56

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP_1.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', ''));
                } else if (FLOAT_REGEXP_3.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue);
                } else if (FLOAT_REGEXP_4.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                }else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });

            ctrl.$formatters.unshift(
                function (modelValue) {
                    return $filter('number')(parseFloat(modelValue) , 2);
                }
            );
        }
    };
});