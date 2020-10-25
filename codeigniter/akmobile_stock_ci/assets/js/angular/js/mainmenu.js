var base_url = "/app/";
var svc = {};
//var api_url = "http://ak1.akamaipos.com:1337/";
//var api_url =  "http://akamaipos:1337/";
angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize', 'time'])
.service('svc',function(){})
.controller("akamaiposController",['$scope', 'svc', '$compile', '$http', '$routeParams', '$q', 'posData', 'TableData', '$window', '$filter', '$rootScope', function ($scope, svc, $compile, $http, $routeParams, $q, posData, TableData, $window, $filter, $rootScope) {
angular.expandAkamaiposController($scope, $http, $routeParams, $q, TableData, $window, $filter, $compile, posData, $rootScope)
angular.QuickTableAkamaiposController($scope, $http, $routeParams, $q, posData, $window, $filter, $compile, $rootScope)
    /**
    * Remove Attributes when reload page
    */
    window.localStorage.clear();

    var quick_recall_sel_rows_assoc = [];

    var localStorageSpace = function(){
        var allStrings = '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
    };

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
    var GridTheme = $("#GridTheme").val();
    var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
    var CashOutBlind = $("#CashOutBlind").val();

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
            $("body").append(
                '<div id="dialog-numpad-passcode" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                    '<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>'+
                '</div>'
            );
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
    
    $("#dialog-numpad-passcode").on('click', function(e){
        $("#dialog-numpad-passcode input").focus();
    })

    $("#table_manual_passcode").on('click', function(e){
        $("#table_manual_passcode input").focus();
    })

    $("#table_no_of_customer").on('click', function(e){
        $("#table_no_of_customer input").focus();
    })

    $("#qrc_numpad_passcode").on('click', function(e){
        $("#qrc_numpad_passcode input").focus();
    })

    $("#table_manual_keyin").on('click', function(e){
        $("#table_manual_keyin input").focus();
    })

	var WindowPopupPasscode = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth / 2);
            var UseWidth = (ComputeWidth);
			$("#dialog-numpad-passcode").jqxWindow({
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                zIndex: 100
			});
			$('#dialog-numpad-passcode').jqxWindow('setTitle', header_title);
            $('#dialog-numpad-passcode').jqxWindow('open');
            $('#dialog-numpad-passcode').on('close', function(){
                $('#dialog-numpad-passcode').remove();
            })

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
	window.WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").jqxWindow({
				height: 280,
				minWidth: 400,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                zIndex: 200,

			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
                $('#dialog-numpad-alert').jqxWindow('open');
                $('#dialog-numpad-alert').jqxWindow('bringToFront');
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
	
	window.NumpadAlertClose = function(form, msg){
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
				height: 650,
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
        myNumber = '';
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
        myNumber = '';
        // ShouldChange = false;
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
     var CashOutHeight = $("#fakeheight").height();
     $scope.dialogCashCount = {
        created: function(args){
            dialogCashCountForm = args.instance;
        },
        resizable: false,
        width: "100%", 
        height: CashOutHeight,
		autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false,
        showAnimationDuration: 0,
        closeAnimationDuration: 0,
        zIndex: 100
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
        showCloseButton: false,
        showAnimationDuration: 0,
		closeAnimationDuration: 0
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
  	    window.LoadHeaderInfo = function(){
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
                    if(ConnectionPoleDisplay){
                        conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
                    }
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
    
      var OnHoldInfoArr = [];
      window.getOnHoldReceipts = (UserUnique) => {
        OnHoldInfoArr = [];  
        if( $("#CashOutCheckOnHold").val() == 1 ){
            var CashInMethod = $("#CashInMethod").val();
            var postdata ="CashInMethod="+CashInMethod;
                postdata+="&UserUnique="+UserUnique;
            posData.GetAllOnHoldReceiptsInfo(postdata)
            .success(function(data){
                OnHoldInfoArr.push(data);
            })
        }
      }
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
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });
            
            var postdata="unique="+unique;
            posData.PrinterCheckTimeClock(postdata)
            .success(function(result){
                $("#dialog-numpad-alert").jqxWindow('close');
                if(result.success == true){
                    if(result.print == true){
                        
                    }else{

                        var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                        NumpadAlertClose('printer_error', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                    setTimeout($.unblockUI, 100);
                }else{
                    setTimeout($.unblockUI, 100);
                }

                def.resolve();
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
            
            return def.promise();
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
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100)

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
                if(ConnectionPoleDisplay){
                    conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
                }
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
        $("#CashInCashInServer").attr({"disabled": true}); 
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                FunctionButton = 'CashIn';  
                NumpadPasscode('EnterCashInServerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash In | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100)
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
        setTimeout(function(){
            $("#CashInCashInServer").attr({"disabled": false}); 
        },1000); 
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
                        // Auto CashIn
                        if(data2.not_batch_yet){

                            var msg = "Credit Cards Must Be Batched Out First<br><br>"
                            msg+="1. Go to Authorize Manager<br>"
                            msg+="2. Make Sure all Credit Cards Adjusted<br>" 
                            msg+="3. Press Batch Charges Button<br>"
                            msg+="4. Follow Prompts";
                            NumpadAlertClose('cannot_open_receipt', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            });
                            return false;
                        }

                        var AutoCashIn = $("#CashInDenomination").val();
                        if(AutoCashIn == 2){
                            if(data2.cashin == false){
                                var postdata ="Amount=0";
                                    postdata+="&UserId="+CashInServerUserId;      
                                posData.SaveServerCashInAmount(postdata)
                                .success(function(result){
                                    if(result.save){
                                        if(result.CashInPrint){
                                            var postdata ="UserId="+CashInServerUserId;
                                            PrinterCashInServerCheck(postdata);
                                        }else{
                                            LoadHeaderInfo();
                                        }
                                    }
                                    CashInServerUserId = 0;
                                })
                            }else{
                                var CashedInServer = data.info.UserName;
                                var msg = CashedInServer+' is already cashed in.';	
                                NumpadAlertOk('cashed_in_check', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                            }
                        }else{
                            var date = new Date();
                            timeclock_message = '';
                            var postdata ="user_unique="+newuser;
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
                                        var postdata ="UserId="+newuser;
                                        posData.CheckCashDrawerMutipleCashInServer(postdata)
                                        .success(function(result){
                                            if(result.Setting == true){
                                                if(result.CashDrawerSetup == true){
                                                    if( $("#CashDrawerOpen").val() == 1 ){
                                                        OpenCashDrawer();
                                                    }else{
                                                        setTimeout($.unblockUI, 100);
                                                    }
                                                    if( $("#CashInDenomination").val() == 1 ){
                                                        CashInDenomination()
                                                        .then(function(){
                                                            WindowCashInDenomination()
                                                            .then(function(){
                                                                CashInDenominationGrid();
                                                                $("#cashin_denomination_save").attr("disabled", true);
                                                            })
                                                        })
                                                    }else{
                                                        SetCashInServerAmount();
                                                    }
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
                                                if( $("#CashDrawerOpen").val() == 1 ){
                                                    OpenCashDrawer();
                                                }else{
                                                    setTimeout($.unblockUI, 100);
                                                }

                                                if( $("#CashInDenomination").val() == 1 ){
                                                    CashInDenomination()
                                                    .then(function(){
                                                        WindowCashInDenomination()
                                                        .then(function(){
                                                            CashInDenominationGrid();
                                                            $("#cashin_denomination_save").attr("disabled", true);
                                                        })
                                                    })
                                                }else{
                                                    SetCashInServerAmount();
                                                }
                                            }
                                        })
                                    }

                                }else{
                                    // $("#dialog-numpad-passcode").jqxWindow('close');
                                    var postdata ="UserId="+newuser;
                                    posData.CheckCashDrawerMutipleCashInServer(postdata)
                                    .success(function(result){
                                        if(result.Setting == true){
                                            if(result.CashDrawerSetup == true){
                                                if( $("#CashDrawerOpen").val() == 1 ){
                                                    OpenCashDrawer();
                                                }else{
                                                    setTimeout($.unblockUI, 100);
                                                }
                                                if( $("#CashInDenomination").val() == 1 ){
                                                    CashInDenomination()
                                                    .then(function(){
                                                        WindowCashInDenomination()
                                                        .then(function(){
                                                            CashInDenominationGrid();
                                                            $("#cashin_denomination_save").attr("disabled", true);
                                                        })
                                                    })
                                                }else{
                                                    SetCashInServerAmount();
                                                }
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
                                            if( $("#CashDrawerOpen").val() == 1 ){
                                                OpenCashDrawer();
                                            }else{
                                                setTimeout($.unblockUI, 100);
                                            }
                                            if( $("#CashInDenomination").val() == 1 ){
                                                CashInDenomination()
                                                .then(function(){
                                                    WindowCashInDenomination()
                                                    .then(function(){
                                                        CashInDenominationGrid();
                                                        $("#cashin_denomination_save").attr("disabled", true);
                                                    })
                                                })
                                            }else{
                                                SetCashInServerAmount();
                                            }  
                                        }
                                    })
                                }
                            })
                        }
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

    window.OpenCashDrawer = function(){
        var def = $.Deferred();

        var printmsg = "Opening cash drawer"+"<br/>";
        $.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: printmsg,
            baseZ: 99999,
        });
        posData.OpenCashDrawer()
        .success(function(data){
            if(data.result){

            }else{
                var msg="Open Drawer Error. Printer Opens Drawer <br/>";
                    msg+=" Please Check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Replace Printer Paper if Low <br/>";
                    msg+="3. Remove Paper Roll and Place Back <br/>";
                    msg+="4. Turn Printer Off and On.";
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
            setTimeout($.unblockUI, 100);
            def.resolve();
        })

        return def.promise();
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
                if( $("#CashDrawerOpen").val() == 1 ){
                    OpenCashDrawer();
                }else{
                    setTimeout($.unblockUI, 100);
                }
                if( $("#CashInDenomination").val() == 1 ){
                    CashInDenomination()
                    .then(function(){
                        WindowCashInDenomination()
                        .then(function(){
                            CashInDenominationGrid();
                        })
                    })
                }else{
                    SetCashInServerAmount();
                }
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
        $("#CashOutCashOutServer").attr({"disabled": true});
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                NumpadPasscode('EnterCashOutServerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash Out | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
                    })  
                })
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
        setTimeout(function(){
            $("#CashOutCashOutServer").attr({"disabled": false});   
        },1000);
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

    // var populateSeverCashInList = function(form_name, html){
    //     var def = $.Deferred();
    //     setTimeout(function(){
    //         $("#server_cashin").append('<div id="server_cashin_container" style="background: #004a73; overflow: hidden;"></div>');
    //         $("#server_cashin_container").html('');
    //         $("#server_cashin_container").append(html);
    //         $("#server_cashin_container").append(""+
    //             '<form id="'+form_name+'">'+
    //                 '<input type="text" id="text_field" class="hdfield" style="color:#000; display:none;">'+
    //                 '<div id="keyboard_server_cashin"></div>'+
    //             '</form>'
    //         );
    //         def.resolve();
    //     },100);
    //     return def.promise();
    // }
    
    // var WindowServerCashInList = function(header_title){
    //     var def = $.Deferred();
    //     setTimeout(function(){
    //         $("#server_cashin").jqxWindow({
    //             width: '80%', 
    //             height: '50%',
    //             title: header_title,
    //             isModal: true,
    //             theme: 'darkblue',
    //             showCloseButton: true,
    //             resizable: false,
    //             showAnimationDuration: 0,
    //             closeAnimationDuration: 0
    //         });
    //         $('#server_cashin').jqxWindow('open');
    //         def.resolve();	
    //     },100);
    //     return def.promise();
    // }
    
    // var ServerCashInListView = function(form_name, html){
    //     var def = $.Deferred();
    //     populateSeverCashInList(form_name, html)
    //     .then(function(){
    //         $('#keyboard_server_cashin').hdkeyboard({
    //             layout: "item_reason",
    //             input: $('#text_field')
    //         });
    //         setTimeout(function(){
    //             def.resolve();
    //         },100);
    //     });
    //     return def.promise();
    // }

    // var ServerCashInList = function(Unique){
    //     var postdata ="UserUnique="+Unique;
    //     posData.ListCashInServer(postdata)
    //     .success(function(data){
    //         if(data.NoOfUserCashedIn > 0){
    //             ServerCashInListView('server_list_option', data.html)
    //             .then(function(){
    //                 WindowServerCashInList('Cash Out');
    //             })
    //         }else{
    //             var msg = 'Please cash in first';	
    //             NumpadAlertOk('invalid_passcode', msg)
    //             .then(function(){
    //                 WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
    //             })
    //         }
    //     })
    // }

    

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
                postdata+="&FunctionButton="+JSON.stringify(security);
            posData.CheckUserSecurity(postdata)
            .success(function(data){
                if(data.validuser){
                    if(data.not_batch_yet){

                        $("#dialog-numpad-passcode").jqxWindow('close');

                        var msg = "Credit Cards Must Be Batched Out First<br><br>"
                        msg+="1. Go to Authorize Manager<br>"
                        msg+="2. Make Sure all Credit Cards Adjusted<br>" 
                        msg+="3. Press Batch Charges Button<br>"
                        msg+="4. Follow Prompts";
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });

                        return false;
                    }

                    CashOutStationUserUnique = data.UserUnique; //CashOutStation also for CashOutServer
                    getOnHoldReceipts(CashOutStationUserUnique);
                    if(data.cashin){
                        if(data.OpenUserList){
                            LoadHeaderInfo();
                            ServerCashInList(data.UserUnique);
                        }else{
                            if(data.countposition > 0){
                                if(CashOutBlind > 0){
                                    LoadHeaderInfo();
                                    CashCountProcessServerBlind(data.StationCashierUnique);
                                    if( $("#CashDrawerOpen").val() == 1 ){
                                        OpenCashDrawer();
                                    }else{
                                        setTimeout($.unblockUI, 100);
                                    }
                                }else{
                                    LoadHeaderInfo();
                                    CashCountProcessServer(data.StationCashierUnique);
                                    if( $("#CashDrawerOpen").val() == 1 ){
                                        OpenCashDrawer();
                                    }else{
                                        setTimeout($.unblockUI, 100);
                                    }
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
        var CashOutServerList = $('input[type=radio][name=group1]:checked').attr('id');
        var UserUnique  = CashOutServerList.split('=')[0];
        var StationCashierUnique = CashOutServerList.split('=')[1];
        ByStationCashierUnique = StationCashierUnique; 
        if(UserUnique){
            var postdata ="UserUnique="+UserUnique;
                postdata+="&StationCashierUnique="+StationCashierUnique;
            posData.CashOutServerCheckCashIn(postdata)
            .success(function(data){
                if( $("#CashDrawerOpen").val() == 1 ){
                    OpenCashDrawer();
                }else{
                    setTimeout($.unblockUI, 100);
                }
                if(CashOutBlind > 0){
                    LoadHeaderInfo();
                    CashCountProcessServerBlind(data.info.Unique);
                }else{
                    LoadHeaderInfo(data.info.Unique);
                    CashCountProcessServer(data.info.Unique);
                }
            })

            getOnHoldReceipts(UserUnique);

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
                                if(CashOutBlind > 0){
                                    CashCountProcessServerBlind();
                                }else{
                                    CashCountProcessServer();
                                }
                            }
                        }else{
                            LoadHeaderInfo();
                            if(CashOutBlind > 0){
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
                    //setTimeout($.unblockUI, 100); 
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
    window.CashCountProcessServer = function(station_cashier_unique){
        var def = $.Deferred();
        $("#CashOutFormStationServerUnique").val(station_cashier_unique);
        ByStationCashierUnique = station_cashier_unique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
        //Get all payment method with status 1
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
                    console.log("Result Count: ",result.Count);

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
                                postdata+="&PaymentCount="+value.PaymentCount;
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
									
                                    var StaticHeight = $("#fakeheight").height();
                                    var CashCountUpperAHeight = (StaticHeight / 2);  
                                    $(".cash-count-upper-A").css("height",CashCountUpperAHeight);
                                    
                                    $(".cash-count-totals").show();	
                                    var postdata ="station_cashier_unique="+station_cashier_unique;
									$http({
                                        method: 'POST',
                                        data: postdata,
                                        url: base_url+'pos/cashier/cashout-server/cash-count/totals',
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
									}).success(function(result5){
                                        gridCashCountTotals(result5.CashCounted);
                                        //gridCashCountDepositData(result5.CashDeposit);
                                        gridCashCountDeposit2(result5.CashDeposit);
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
                    console.log("0 Result Count: ", result.Count);
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
                        if(DrawerManagerHistoryReconcile){
                            $("#CashOutFinal").hide();
                        }else{
                            $("#CashOutFinal").show();
                        }
						dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
                        dialogCashCountForm.open();
                       
                        var postdata ="station_cashier_unique="+station_cashier_unique;
						$(".cash-count-totals").show();	
						$http({
                            method: 'POST',
                            data: postdata,
                            url: base_url + 'pos/cashier/cashout-server/cash-count/totals',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}).success(function(data){
                            gridCashCountTotals(data.CashCounted);
                            //gridCashCountDepositData(data.CashDeposit);
                            console.log("part2");
                            gridCashCountDeposit2(data.CashDeposit);
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
            def.resolve();    
        })
        return def.promise();
    }

    // Drawer Manager Reconcile history
    var CashCountHistoryProcessServer = (station_cashier_unique) => {
        var def = $.Deferred();
        ByStationCashierUnique = station_cashier_unique;
        var station_unique = $scope.station_unique;
        var payment_menu   = $scope.PaymentMenu;
        //Get all payment method with status 1
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
                    console.log("Result Count: ",result.Count);

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
                                postdata+="&PaymentCount="+value.PaymentCount;
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
                                    
                                    var StaticHeight = $("#fakeheight").height();
                                    var CashCountUpperAHeight = (StaticHeight / 2);  
                                    $(".cash-count-upper-A").css("height",CashCountUpperAHeight);
                                    
                                    $(".cash-count-totals").show();	
                                    var postdata ="station_cashier_unique="+station_cashier_unique;
                                    $http({
                                        method: 'POST',
                                        data: postdata,
                                        url: base_url+'pos/cashier/cashout-server/cash-count/totals-history',
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    }).success(function(result5){
                                        gridCashCountTotals(result5.CashCounted);
                                        //gridCashCountDepositData(result5.CashDeposit);
                                        gridCashCountDeposit2(result5.CashDeposit);
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
                    console.log("0 Result Count: ", result.Count);
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
                        console.log("dd",DrawerManagerHistoryReconcile);
                        if(DrawerManagerHistoryReconcile){
                            $("#CashOutFinal").hide();
                        }else{
                            $("#CashOutFinal").show();
                        }
                        
                        dialogCashCountForm.setTitle("Cash Out | ID: "+station_cashier_unique);
                        dialogCashCountForm.open();
                        
                        var postdata ="station_cashier_unique="+station_cashier_unique;
                        $(".cash-count-totals").show();	
                        $http({
                            method: 'POST',
                            data: postdata,
                            url: base_url + 'pos/cashier/cashout-server/cash-count/totals-history',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function(data){
                            gridCashCountTotals(data.CashCounted);
                            //gridCashCountDepositData(data.CashDeposit);
                            console.log("part2");
                            gridCashCountDeposit2(data.CashDeposit);
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
            def.resolve();    
        })
        return def.promise();
    }


    /*
    |-----------------------------------------------------------------------------------|
    | Cash Count Process Blind by individual server 
    |-----------------------------------------------------------------------------------|
    */
    window.CashCountProcessServerBlind = function(){
        var def = $.Deferred();
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

            def.resolve();
        }) 
        return def.promise();
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
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                            })  
                        })	
                        $scope.cashtype = 2;
                        $scope.$broadcast("focusCashOut");
                    }else{
                        LoadHeaderInfo();
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
        $("#NewSalefunction").attr({"disabled": true});
        posData.CheckCache()
        .success(function(result){
            if($("#CashInMethod").val() == 1 || $("#CashInMethod").val() == 3){
                if(result.store){
                    posData.CashOutDisabled()
                    .success(function(result2){
                        if(result2.success == true){
                            LoadHeaderInfo();
                            NumpadPasscode('EnterPasscode')	
                            .then(function(){
                                WindowPopupPasscode('New Sale | Enter Passcode')
                                .then(function(){
                                    setTimeout(function(){
                                        $("#number_field").focus();
                                    },100)
                                })  
                            })	
                            FunctionButton = 'NewSale';
                        }else{
                            LoadHeaderInfo();
                            FunctionButton = '';
                            var msg = 'Please cash in first';	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                        $scope.$broadcast('NewSale');
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
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
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
        setTimeout(function(){
            $("#NewSalefunction").attr({"disabled": false});
        },1000)
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
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton;
            posData.EnterPassCode(postdata)
            .success(function(result){
                if(result.success == true){
                    if(result.login == true){
                        
                        if(result.MultipleCashedIn){
                            CashInProcessFunction = 'NewSale';
                            CashedInList(result, hashpasscode, 'New Sale');
                            $("#dialog-numpad-passcode").jqxWindow('close');
                            return;
                        }

                        var store_unique_id;
                        var postdata='';

                        if(result.CashOutCashInCheck){
                            var TimeLimit = '';
                            var strHrs = '';
                            var CashInMinutes = parseInt(result.CashOutCashInCheckResult.CashInMinutes);
                            var CashInTimeSetting =  parseInt(result.CashOutCashInCheckResult.CashInTimeSetting);
                            
                            var CashInTimeCalculation = (CashInTimeSetting / 60);
                            TimeLimit = (CashInMinutes > CashInTimeSetting  ? CashInTimeCalculation : 0);
                            strHrs = (TimeLimit > 1 ? "hrs" : "hr");
                            
                            if(TimeLimit > 0){
                                //if less than 60 parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) ;
                                var msg ='You have been cashed in longer than <br>'+CashInTimeCalculation + ' ' + strHrs +'<br><br>';
                                    msg+='Please Cash Out Now';	
                                NumpadAlertOk('cashout_first', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                return;
                            }
                        }


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

    var DetectNewSaleCashInTimeLimit = (result) => {
        var def = $.Deferred();
        var strHrs = '';
        var CashInMinutes = parseInt(result.CashOutCashInCheckResult.CashInMinutes);
        var CashInTimeSetting =  parseInt(result.CashOutCashInCheckResult.CashInTimeSetting);
        
        var CashInTimeCalculation = (CashInTimeSetting / 60);
        var TimeLimit = (CashInMinutes > CashInTimeSetting  ? CashInTimeCalculation : 0);
        strHrs = (TimeLimit > 1 ? "hrs" : "hr");
        
        if(TimeLimit > 0){
            //if less than 60 parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) ;
            var msg ='You have been cashed in longer than <br>'+CashInTimeCalculation + ' ' + strHrs +'<br><br>';
                msg+='Please Cash Out Now';	
            NumpadAlertOk('cashout_first', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            
            def.resolve(false);
        }else{
            def.resolve(true);
        }

        return def.promise();
    }

    var UserCodeValidation = (hashpasscode) => {
        var def = $.Deferred();
        var postdata="code="+hashpasscode;
        posData.TimeClockPasscode(postdata)
        .success(function(datainfo){
            if(datainfo.success == false){
                $("#dialog-numpad-passcode").jqxWindow('close');	
                var msg = 'Invalid code';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
                return;
            }else{
                def.resolve(datainfo);
            }
        })

        return def.promise();
    }

    var NewSaleTimeClockCheck = (datainfo, hashpasscode) => {
        var def = $.Deferred();
        var postdata="user_unique=" + datainfo.data.Unique;
            postdata+="&status=" + 1;
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
                    return;
                }else{
                    //-->Create New Row in receipt header unigue
                    var postdata="passcode="+hashpasscode;
                        postdata+="&cashtype=3";
                        
                    posData.CreateReceipt(postdata)
                    .success(function(create_receipt_result){
                        $window.location.href = 'pointofsale';
                    })
                }
            }else{
                var postdata="passcode="+hashpasscode;
                    postdata+="&cashtype=3";
                posData.CreateReceipt(postdata)
                .success(function(create_receipt_result){
                    $window.location.href = 'pointofsale';    
                })
            }
            def.resolve();
        })

        return def.promise();
    }

    var SetupCashedInID = (postdata) => {
        var def = $.Deferred();
        posData.SetupCashedIn(postdata)
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
                if(ConnectionPoleDisplay){
                    conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
                }
            }

            def.resolve();
        })
        return def.promise();
    }
    
    window.CashInProcessFunction = '';
    window.CashedInList = (data, hashpasscode, module) => {
        $("body").append(
            '<div id="CashedInListForm" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000; overflow: hidden;">'+
                '<div id="CashedInListFormContainer" style="overflow: hidden;">'+
                    '<div>'+
                        '<input type="button" id="CashedInListSelect" value="Select" />&nbsp;&nbsp;&nbsp;'+
                        '<input type="button" id="CashedInListClose" value="Close" />'+
                    '</div>'+
                    '<br>'+
                    '<div id="CashedInListGrid"></div>'+
                '</div>'+
            '</div>'
        )

        $("#CashedInListSelect").jqxButton({width: 120, height: 40, template: 'primary' });
        $("#CashedInListClose").jqxButton({width: 120, height: 40, template: 'danger' });

        var source = {
            datatype: 'json',
            datafields: [
                {name: 'Unique', type: 'int'},
                {name: 'LocationName', type: 'string'},
                {name: 'StationName', type: 'string'},
                {name: 'CashInBy', type: 'string'},
                {name: 'Amount', type: 'float'},
                {name: 'LocationUnique', type: 'int'},
                {name: 'StationUnique', type: 'int'},
                {name: 'CashInMethod', type: 'int'},
                {name: 'UserUnique', type: 'int'},
                {name: 'Created', type: 'date'},
                {name: 'CashIn', type: 'date'},
                {name: 'Method', type: 'string'},
                {name: 'UserCode', type: 'string'}
            ],
            localdata: data.CashedInList
        }

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#CashedInListGrid").jqxGrid({
            width: '100%',
            height: 550,
            source: dataAdapter,
            theme: GridTheme,
            scrollbarsize: GridScrollBarSize,
            statusbarheight: GridRowHeight,
            rowsheight: GridRowHeight,
            altrows: true,
            sortable: true,
            columnsresize: true,
            columns: [
                {text: 'ID', datafield: 'Unique', width: '5%'},
                {text: 'Location', datafield: 'LocationName', width: '15%', hidden: true},
                {text: 'Station', datafield: 'StationName', width: '20%'},
                {text: 'Cashier', datafield: 'CashInBy', width: '16%'},
                {text: 'Cash In', datafield: 'CashIn', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                {text: 'Amount', datafield: 'Amount', width: '11%', align: 'right', cellsalign: 'right', cellsformat: 'd2'},
                {text: 'Method', datafield: 'Method', width: '13%', cellsalign: 'left'},
            ]
        })

        $("#CashedInListGrid").on('rowdoubleclick', function(event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            $("#CashedInListSelect").trigger('click');
        })

        $("#CashedInListSelect").on('click', function(){
            var getrowindex = $("#CashedInListGrid").jqxGrid('getselectedrowindex');
            var getrowbyid = $("#CashedInListGrid").jqxGrid('getrowid', getrowindex);
            var getrowdata = $("#CashedInListGrid").jqxGrid('getrowdatabyid', getrowbyid);
            hashpasscode = (hashpasscode == '' ? getrowdata.UserCode : hashpasscode); 
            
            if(getrowdata){
                var postdata ="StationCashierUnique=" + getrowdata.Unique;
                    postdata+="&UserUnique="+getrowdata.UserUnique;
                    postdata+="&StationUnique="+getrowdata.StationUnique;
                    postdata+="&LocationUnique="+getrowdata.LocationUnique;
                    postdata+="&UserName="+getrowdata.CashInBy;
                    postdata+="&StationName="+getrowdata.StationName;
                    postdata+="&LocationName="+getrowdata.LocationName;
                    postdata+="&CashInMethod="+getrowdata.CashInMethod;
                
                console.log("postdata",postdata);

                posData.GetCashInInfo(postdata)
                .success(function(result){

                    console.log("result",result);

                    DetectNewSaleCashInTimeLimit(result)
                    .then(function(response){
                        if(!response){
                            return false;
                        }

                        if(CashInProcessFunction == 'NewSale'){
                            SetupCashedInID(postdata)
                            .then(function(){
                                UserCodeValidation(hashpasscode)
                                .then(function(datainfo){
                                    NewSaleTimeClockCheck(datainfo, hashpasscode)
                                    .then(function(){
                                        $("#CashedInListForm").jqxWindow('close');
                                    })
                                })
                            })
                        }else if(CashInProcessFunction == 'CashierRecall'){
                            var CheckAttibute = window.localStorage.getItem('RecallAttributes');
                            SetupCashedInID(postdata)
                            .then(function(){
                                if(CheckAttibute == 'load'){
                                    populateRecall()
                                    .then(function(fnvalue){
                                        recall_page_popup()
                                        .then(function(){
                                            SelOnHold();
                                            LoadHeaderInfo();
                                        })
                                    })
                                }else{ 
                                    VisibleColumns()
                                    .then(function(){
                                        populateRecall()
                                        .then(function(fnvalue){
                                            recall_page_popup()
                                            .then(function(){
                                                SelOnHold();
                                                LoadHeaderInfo();
                                                window.localStorage.setItem('RecallAttributes', 'load');
                                            })
                                        })
                                    })
                                } 
                            })
                        }else if(CashInProcessFunction == 'CashierDineTable'){

                            SetupCashedInID(postdata)
                            .then(function(){
                                window.TableDineInForm(getrowdata.Unique);
                            })
                        }else if(CashInProcessFunction == 'CashierDineTableLogin'){
                            window.TableDineLoginUser(data, hashpasscode, getrowdata.Unique);
                        }else if(CashInProcessFunction == 'CashierDineTableCustomerLogin'){
                            window.TableDineCustomerLoginUser(data, hashpasscode, getrowdata.Unique);
                        }

                        $("#CashedInListForm").jqxWindow('close');
                    })


                })
            }else{
                var msg = 'Select Cashed In ID from the list first';	
                NumpadAlertOk('cashedin_selection_failed', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        })

        $("#CashedInListClose").on('click', function(){
            $("#CashedInListForm").jqxWindow('close');
        })

        $("#CashedInListForm").jqxWindow({
            height: 550,
			minWidth: '99%',
            isModal: true,
            title: "Cashed In list | "+ module,
			theme: GridTheme,
			showCloseButton: true,
			resizable: false,
			draggable: false,
			showAnimationDuration: 0,
            closeAnimationDuration: 0,
            modalZIndex: 100,
        })

        $("#CashedInListForm").jqxWindow('open');

        setTimeout(function(){
            $("#CashedInListForm").on('close', function(){
                $("#CashedInListGrid").jqxGrid('destroy');
                $("#CashedInListForm").jqxWindow('destroy');
                $("#CashedInListForm").remove();
            })
        },100)
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

    function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }

    var POSOrderTypeRequired = $("#POSOrderTypeRequired").val();
    var SetNewUser;
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
                    if(result.CashOutCashInCheck){
                        
                        if(result.MultipleCashedIn){
                            CashInProcessFunction = 'NewSale';
                            CashedInList(result, hashpasscode, 'New Sale');
                            $("#dialog-numpad-passcode").jqxWindow('close');
                            return;
                        }

                        var TimeLimit = '';
                        var strHrs = '';
                        var CashInMinutes = parseInt(result.CashOutCashInCheckResult.CashInMinutes);
                        var CashInTimeSetting =  parseInt(result.CashOutCashInCheckResult.CashInTimeSetting);
                        
                        var CashInTimeCalculation = (CashInTimeSetting / 60);
                        TimeLimit = (CashInMinutes > CashInTimeSetting  ? CashInTimeCalculation : 0);
                        strHrs = (TimeLimit > 1 ? "hrs" : "hr");
                        
                           
                        if(TimeLimit > 0){
                            //if less than 60 parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) ;
                            var msg ='You have been cashed in longer than <br>'+CashInTimeCalculation + ' ' + strHrs +'<br><br>';
                                msg+='Please Cash Out Now';	
                            NumpadAlertOk('cashout_first', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                            $("#dialog-numpad-passcode").jqxWindow('close');
                            return;
                        }
                        
                    }

                    $scope.TableUserUnique = result.info.Unique;
                    var newuser = result.info.Unique;
                    SetNewUser = result.info.Unique;
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
                                        if(POSOrderTypeRequired == 2){
                                            posData.OrderTypePopupList()
                                            .success(function(data){
                                                OrderTypeWindowApp('OrderTypePopupApp', data.html)
                                                .then(function(){
                                                    WindowPopupOrderTypeApp('Order type');
                                                })
                                            })
                                        }else{
                                            var TableNumberChange   = $("#TableNumberChange").val();
                                            var TableCustomerNo     = $("#TableCustomerNo").val();
                                            if(TableCustomerNo == 1){
                                                var VirtualTableManualCustomerNo = [newuser, 'cashier_new_sale_customer_no'];
                                                $rootScope.$emit('CallNumpadTableNoOfCustomerCashier', VirtualTableManualCustomerNo);
                                            }else{
                                                var postdata ="UserUnique="+newuser;
                                                posData.CreateReceiptCashInServer(postdata)
                                                .success(function(data){
                                                    $window.location.href = 'pointofsale';
                                                })
                                            }
                                        }
                                    }
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    var TableNumberChange   = $("#TableNumberChange").val();
                                    var TableCustomerNo     = $("#TableCustomerNo").val();
                                    if(TableNumberChange == 2 && TableCustomerNo == 1){
                                        var VirtualTableManualCustomerNo = [newuser, 'cashier_new_sale_customer_no_cashtype'];
                                        $rootScope.$emit('CallNumpadTableNoOfCustomerCashier', VirtualTableManualCustomerNo);
                                    }else{
                                        var postdata ="UserUnique="+newuser;
                                            postdata+="&cashtype=2";
                                        posData.CreateReceiptCashInServer(postdata)
                                        .success(function(create_receipt_result){
                                            $window.location.href = 'pointofsale';
                                        })
                                    }
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
        $("#BackToMainfunction").attr({"disabled":true});
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                FunctionButton = 'BackOffice';  
                NumpadPasscode('OfficeEnterPassCode')	
                .then(function(){
                    WindowPopupPasscode('Back Office | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100)
                    })
                    setTimeout(function(){
                        $("#BackToMainfunction").attr({"disabled":false}); 
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
                                                                        
                                                                        setTimeout(function(){
                                                                            $("#number_field").focus();
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
                                                                   
                                                                    setTimeout(function(){
                                                                        $("#number_field").focus();
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
                                                                    
                                                                    setTimeout(function(){
                                                                        $("#number_field").focus();
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
                                                                
                                                                setTimeout(function(){
                                                                    $("#number_field").focus();
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
                    
                    setTimeout(function(){
                        $("#number_field").focus();
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
                                    /*
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
                                    },100);
                                    */
									$(".cash-count-totals").show();	
									$http({
										method: 'get',
										url: base_url+'pos/cashier/cashout/cash-count/totals'
									}).success(function(result5){
                                        gridCashCountTotals(result5.CashCounted);
                                        //gridCashCountDepositData(result5.CashDeposit);
                                        console.log("part3");
                                        gridCashCountDeposit2(result5.CashDeposit);
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
                        /*
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
                        },100);
                        */
						$(".cash-count-totals").show();	
						$http({
							method: 'get',
							url: base_url + 'pos/cashier/cashout/cash-count/totals'
						}).success(function(data){
                            gridCashCountTotals(data.CashCounted);
                            //gridCashCountDepositData(data.CashDeposit);
                            console.log("part4");
                            gridCashCountDeposit2(data.CashDeposit);
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
                                    /*
									$('#cash-out-keypad-number input').jqxNumberInput('focus');
									$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
									setTimeout(function(){
										$('#cash-out-keypad-number input').select();
                                    },100);
                                    */
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
                        /*
						$('#cash-out-keypad-number input').jqxNumberInput('focus');
						$("#cash-out-keypad-number input").css({'font-size': '1em', 'border':'none'})
						setTimeout(function(){
							$('#cash-out-keypad-number input').select();
                        },100);	
                        */
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
    var CashCountGridHeight = $("#fakeheight").height();
    var newCashCountGridHeight = (CashCountGridHeight / 2);
    $scope.gridCashCount = {
        width: "100%",
        height: newCashCountGridHeight - 25,
        sortable: true,
        altRows: true,
        theme: GridTheme,
        editable: false,
        showAggregates: true,
        columnsResize: true,
        scrollBarSize: GridScrollBarSize,
        source: {
            dataType: "json",
            dataFields: [
                {name: 'unique', type: 'int'},
                {name: 'payment_name',  type: 'string'},
                {name: 'CashOutCount', type: 'int'},
                {name: 'PaymentCount', type: 'int'},
                {name: 'calculated',  type: 'string'},
                {name: 'counted', type: 'string'},
                {name: 'totaldiff', type: 'string'},
                {name: 'PaymentUnique', type: 'int'},
                {name: 'StationCashierUnique', type: 'int'},
                {name: 'PaymentMenu', type: 'int'},
            ],
            localdata: {},
        },
        columns: [
            {text: 'unique', dataField: 'unique', hidden: true},
            {text: 'PaymentUnique', dataField: 'PaymentUnique', hidden:true},
            {text: 'PaymentMenu', dataField: 'PaymentMenu', hidden: true},
            {text: 'StationCashierUnique', dataField: 'StationCashierUnique', hidden: true},
            {text: 'Method', dataField: 'payment_name', width: '35%'},
            {text: '', dataField: 'CashOutCount', width: '5%', cellsAlign: 'center', align: 'center'},
            {text: 'Payments', dataField: 'PaymentCount', width: '15%',  align: 'right', cellsAlign: 'right',aggregates: [{
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
            {text: 'Sales', dataField: 'calculated', width: '15%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
            {text: 'Counted', dataField: 'counted', width: '15%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
            {text: 'Difference', dataField: 'totaldiff', width: '15%', align: 'right', cellsAlign: 'right', cellsFormat: 'F2',
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
                    {name: 'CashOutCount', type: 'int'},
                    {name: 'calculated',  type: 'string'},
                    {name: 'counted', type: 'string'},
                    {name: 'totaldiff', type: 'string'},
                    {name: 'PaymentUnique', type: 'int'},
                    {name: 'StationCashierUnique', type: 'int'},
                    {name: 'PaymentMenu', type: 'int'},
                ],
                localdata: data,
            },
            columns: [
                {text: 'unique', dataField: 'unique', hidden: true},
                {text: 'PaymentUnique', dataField: 'PaymentUnique', hidden: true},
                {text: 'PaymentMenu', dataField: 'PaymentMenu', hidden: true},
                {text: 'StationCashierUnique', dataField: 'StationCashierUnique', hidden:true},
                {text: 'Payment', dataField: 'payment_name', width: '35%'},
                {text: '', dataField: 'CashOutCount', width: '5%', cellsAlign: 'center', align: 'center'},
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
                    {name: 'PaymentUnique', type: 'int'},
                    {name: 'StationCashierUnique', type: 'int'},
                    {name: 'PaymentMenu', type: 'int'},
                ],
                localdata: data,
            },
            columns: [
                {text: 'unique', dataField: 'unique', hidden: true},
                {text: 'PaymentUnique', dataField: 'PaymentUnique', hidden: true},
                {text: 'PaymentMenu', dataField: 'PaymentMenu', hidden: true},
                {text: 'StationCashierUnique', dataFied: 'StationCashierUnique', hidden: true},
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
            showHeader: false,
            theme: GridTheme,
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

    var BankDepositEditRow = 0;
    var gridCashCountDeposit = function(data=Array()){
        console.log("Deposit");
        var cellbeginedit = function (row, datafield, columntype, value) {
            if (row == 0  || row == 2) return false;
            //if (value === null || value === '') return false;
        }
        var cellsrenderer = function (row, column, value, defaultHtml, columnproperties) {
            if (row == 0 || row == 2) {
                var element = $(defaultHtml);
                element.css({'color':'#000', 'font-weight':'bolder'});
                return element[0].outerHTML;
            }
            return defaultHtml;
        }

        var source = {
            datatype: "json",
            updaterow: function (rowid, rowdata, commit) {
                var postdata ="Unique="+rowdata.Unique;
                    postdata+="&Amount="+rowdata.Amount;
                posData.UpdateCashOutBankDeposit(postdata)
                .success(function(data){
                    source.localdata = data.CashDeposit;
                    $('#gridDeposit').jqxGrid('updatebounddata');
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server was successful 
                    // and with parameter false if the synchronization has failed.
                    commit(true);
                })
            },
            datafields: [
                {name: 'Unique', type: 'int'},
                {name: 'Label', type: 'string'},
                {name: 'Amount', type: 'float'}
            ],
            localdata: data,
        }
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#gridDeposit").jqxGrid({
            width: '100%',
            //source: dataAdapter,                
            pageable: false,
            autoheight: true,
            sortable: false,
            altrows: true,
            theme: GridTheme,
            enabletooltips: true,
            editable: true,
            showaggregates: false,
            filterable: true,
            showstatusbar: false,
            showheader: false,
            columns: [
                {text: '', dataField: 'Label', width: '60%'},
                {text: '', dataField: 'Amount', width: '40%', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, align: 'right', cellsAlign: 'right', cellsFormat: 'F2', columntype: 'numberinput',
                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                        editor.jqxNumberInput({ digits: 8});
                    }
                }
            ]
        })
        
        $("#gridDeposit").on('cellclick', function(event){
            var datafield = event.args.datafield;
            var cellvalue = args.value;
            var columnindex = args.columnindex;
            var rowBoundIndex = args.rowindex;
            BankDepositEditRow = rowBoundIndex;
            SelectedField = datafield;
            if(rowBoundIndex == 0 || rowBoundIndex == 2){
                return false;
            }else{
                var POSVirtualKeyboard = $("#POSVirtualKeyboard").val();
                if(POSVirtualKeyboard == 1){
                    NumpadLeave('BankDeposit')
                    .then(function(){
                        WindowNumpadLeave()
                        .then(function(){
                            $("#cashout_leave_entry_field").jqxNumberInput('focus');
                            setTimeout(function(){
                                var input = $('#cashout_leave_entry_field input')[0];
                                if('selectionStart' in input) {
                                    input.setSelectionRange(0, 0);
                                }else{
                                    var range = input.createTextRange();
                                    range.collapse(true);
                                    range.moveEnd('character', 0);
                                    range.moveStart('character', 0);
                                    range.select();
                                }
                                $("#cashout_leave_entry_field input").select();
                            },100);
                        })
                    })
                }
            }
        })
        console.log("Grid Deposit");
    }

    $('#gridDeposit').load(function(){
        gridCashCountDeposit();
    })
    
    var gridCashCountDepositData = function(data){
        var source = {
            datatype: "json",
            localdata: data,
        }
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#gridDeposit").jqxGrid({
            source: dataAdapter
        })
    }

    
    var gridCashCountDeposit2 = function(data=Array()){
        var cellbeginedit = function (row, datafield, columntype, value) {
            if (row == 0  || row == 2) return false;
            //if (value === null || value === '') return false;
        }
        var cellsrenderer = function (row, column, value, defaultHtml, columnproperties) {
            if (row == 0 || row == 2) {
                var element = $(defaultHtml);
                element.css({'color':'#000', 'font-weight':'bolder'});
                return element[0].outerHTML;
            }
            return defaultHtml;
        }

        var source = {
            datatype: "json",
            updaterow: function (rowid, rowdata, commit) {
                
                var postdata ="Unique="+rowdata.Unique;
                    postdata+="&Amount="+rowdata.Amount;
                posData.UpdateCashOutBankDeposit(postdata)
                .success(function(data){
                    source.localdata = data.CashDeposit;
                    $('#gridDeposit').jqxGrid('updatebounddata');
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server was successful 
                    // and with parameter false if the synchronization has failed.
                    commit(true);
                    
                })
            },
            datafields: [
                {name: 'Unique', type: 'int'},
                {name: 'Label', type: 'string'},
                {name: 'Amount', type: 'float'}
            ],
            localdata: data,
        }
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#gridDeposit").jqxGrid({
            width: '100%',
            source: dataAdapter,                
            pageable: false,
            autoheight: true,
            theme: GridTheme,
            sortable: false,
            altrows: true,
            enabletooltips: true,
            editable: true,
            showaggregates: false,
            filterable: true,
            showstatusbar: false,
            showheader: false,
            columns: [
                {text: '', dataField: 'Label', width: '60%'},
                {text: '', dataField: 'Amount', width: '40%', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, align: 'right', cellsAlign: 'right', cellsFormat: 'F2', columntype: 'numberinput',
                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                        editor.jqxNumberInput({ digits: 8});
                    }
                }
            ]
        })
    }

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
                                    if(CashOutBlind > 0){
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
                                        if(CashOutBlind > 0){
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
                $("#TimeClockfunction").attr({"disabled": true});
                FunctionButton = 'TimeClock';
                NumpadPasscode('ClockEnterPassCode')	
                .then(function(){
                WindowPopupPasscode('Clock In and Out')
                .then(function(){
                    setTimeout(function(){
                        $("#number_field").focus();
                    },100);

                    setTimeout(function(){    
                        $("#TimeClockfunction").attr({"disabled": false});
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
    var globalActualTimeClock = '';
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
                            // if not Create a new one.
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
                                        if(saveRes.success == false){
                                            NumpadAlertOk('time_clock_out_failed', saveRes.msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                                            });
                                            return false;
                                        }
                                        globalActualTimeClock = saveRes.ActualTimeClock;
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
                                                            // globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+globalActualTimeClock+'</div><br>';
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
                                                        // globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                        globalTimeclockMsgResult+= '<div align="center">'+globalActualTimeClock+'</div><br>';
                                                        globalTimeclockMsgResult+= '<div align="center" style="color:#FF0000;">Clock In</div>';		
                                                        $("#text_field").focus(); 
                                                    })
                                                })
                                            }
                                        }else{
                                            var msg = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                // msg+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                msg+= '<div align="center">'+globalActualTimeClock+'</div><br>';
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
                                                globalActualTimeClock = result.ActualTimeClock;
                                                globalTimeclockUnique = datacheck.data.Unique;
                                                NumpadKeyboard('vk_timeclockout_comment')
                                                    .then(function(){
                                                    WindowPopupKeyboard('Time clock comment')
                                                    .then(function(){
                                                        $("#keyboard_header").text("Time Clock Comment");
                                                        $("#search_field").focus();
                                                        setTimeout(function(){
                                                            globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                            // globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+globalActualTimeClock+'</div><br>';						
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
                                                globalActualTimeClock = result.ActualTimeClock;
                                                globalPrintTimeclockCheck = datacheck.data.Unique;
                                                CommentBox('timeclockout_comment', datacheck.data.Unique)
                                                .then(function(){
                                                    WindowComment('Time clock Comment')
                                                    .then(function(){
                                                            globalTimeclockMsgResult = '<div align="center">'+capitalizeFirstLetter(restrict.username)+'</div><br/>';
                                                            // globalTimeclockMsgResult+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';
                                                            globalTimeclockMsgResult+= '<div align="center">'+globalActualTimeClock+'</div><br>';						
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
                       setTimeout(function(){
                            $("#number_field").focus();
                       },100)
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
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100)
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
        DrawerManagerHistoryReconcile = false;
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
        //console.log(row.unique);
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
							localdata: result2.CashCounted 
						}
                    }
                    //gridCashCountDepositData(result2.CashDeposit);
                    console.log("part6");
                    gridCashCountDeposit2(result2.CashDeposit);
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
        }
        $scope.AddCountedWhen = false;
    }

    $scope.rowDown = function(){
        $("#datagridCashCount").jqxDataTable('selectionMode', 'singlerow');
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
        var RowCount = rows.length;
        if(CountCount != RowCount){
            CountCount = CountCount + 1;
            if(CountCount > 1){
                DownCount = DownCount + 1;
            }else{
                DownCount = 0;
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
        }else{
            CountCount = RowCount;
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
                        '<button id="FinalCashOut" class="btn btn-info btn-lg" ng-click="FinalCashOutServer()">Cash Out</button>'+
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

    //CheckOnHold
    $scope.FinalCashOutServer = function(){
        $("#FinalCashOut").attr({"disabled": true});
        DownCount = 0;
        CountCount = 0; 
        if( $("#CashOutCheckOnHold").val() == 1 && OnHoldInfoArr[0].length > 0){
            var OnHoldReceiptsUsers = '';
            var OnHoldCount = 0;
            $.each(OnHoldInfoArr[0], function(index, value){
               OnHoldCount =+ parseInt(value.OnHoldCount);
               OnHoldReceiptsUsers = value.UserName;
            })
            var msg = 'Cannot Cash Out ';
            var usetext1 = '';
            var usetext2 = '';
            var usetext3 = '';
            if(OnHoldCount > 1){
                usetext1 = '<br>';
                usetext2 = 'receipts ';
                usetext3 = 'these Receipts ';
            }else{
                usetext1 = '<br>';
                usetext2 = 'receipt ';
                usetext3 = 'this Receipt ';
            }
            msg+= usetext1 + OnHoldCount + ' ' + usetext2 + ' assigned to '+OnHoldReceiptsUsers+'<br>';
            msg+='Please Complete '+usetext3+'or Assign to different user. ';

            NumpadAlertClose('cashout_failed', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });

            setTimeout(function(){
                $("#FinalCashOut").attr('disabled', false);
            },1000)

            return false;
        }

        var emailmsgUnique;
        var UserUnique;
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
        var postdata ="cashtype=2";
            postdata+="&station_cashier_unique=" + $("#CashOutFormStationServerUnique").val();
        posData.SaveAmountCashOutServer(postdata)
		.success(function(result){
            UserUnique = result.UserId;
            dialogCashCountForm.close();
            $("#cashier_cashout_q").jqxWindow("close");
            if(result.CashOutPrint){
                var CashOutPrintReceipt = $("#CashOutPrintReceipt").val();
                var CashOutEmailReceipt = $("#CashOutEmailReceipt").val();
                var CashOutEmailSetting = $("#CashOutEmail").val();
                if(CashOutPrintReceipt == 1){
                    var postdata ="UserId="+UserUnique;
                    PrinterCashOutServerCheck(postdata)
                    .then(function(){
                        if(CashOutEmailReceipt == 1 && CashOutEmailSetting == 1){

                            $.blockUI({ css: { 
                                border: '2px solid #fff',
                                padding: '15px', 
                                backgroundColor: '#210e66', 
                                '-webkit-border-radius': '10px', 
                                '-moz-border-radius': '10px', 
                                opacity: 1, 
                                color: '#fff',
                                fontSize: '20px' 
                            }, message: 'Sending...' });

                            postdata+="&StationCashierUnique="+$("#CashOutFormStationServerUnique").val();
                            posData.CashOutConvertPDF(postdata)
                            .success(function(convert){
                                if(convert.success == false){
                                    // var msg = "Download directory doesn't exist! ";
                                    // NumpadAlertClose('cashout_pdf_failed', msg)
                                    // .then(function(){
                                    //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    // });

                                    LoadHeaderInfo();
                                    posData.CashOutClearCache();
                                    setTimeout($.unblockUI, 100);
                                    return false;
                                }

                                if(convert.SendEmail){
                                    emailmsgUnique = convert.emailmsgUnique;
                                    var postdata ="EmailMessageUnique="+emailmsgUnique;
                                        postdata+="&UserUnique="+UserUnique;
                                    posData.CashOutSendEMail(postdata)
                                    .success(function(send){
                                        posData.UnsetCashDrawerCashOut(postdata)
                                        .success(function(result2){
                                            LoadHeaderInfo();
                                            posData.CashOutClearCache();
                                            setTimeout($.unblockUI, 100);
                                        })
                                    })
                                }else{
                                    posData.UnsetCashDrawerCashOut(postdata)
                                    .success(function(result3){
                                        LoadHeaderInfo();
                                        posData.CashOutClearCache();
                                        setTimeout($.unblockUI, 100);
                                    })
                                }
                            })  
                        }else{
                            posData.UnsetCashDrawerCashOut(postdata)
                            .success(function(result3){
                                LoadHeaderInfo();
                                posData.CashOutClearCache();
                                setTimeout($.unblockUI, 100);
                            })
                        }  
                    })
                }else{
                    if(CashOutEmailReceipt == 1){
                        posData.CashOutConvertPDF(postdata)
                        .success(function(convert){
                            posData.CashOutSendEMail(postdata)
                            .success(function(send){
                                posData.UnsetCashDrawerCashOut(postdata)
                                .success(function(result2){
                                    LoadHeaderInfo();
                                    posData.CashOutClearCache();
                                    setTimeout($.unblockUI, 100); 
                                })
                            })
                        })
                    }else{
                        posData.UnsetCashDrawerCashOut(postdata)
                        .success(function(result2){
                            LoadHeaderInfo();
                            posData.CashOutClearCache();
                            setTimeout($.unblockUI, 100); 
                        })
                    }
                }
            }else{
                posData.UnsetCashDrawerCashOut(postdata)
                .success(function(result2){
                    LoadHeaderInfo();
                    posData.CashOutClearCache();
                    setTimeout($.unblockUI, 100); 
                })
            }
        })

        setTimeout(function(){
            if(DrawerManagerState == true || DrawerManagerCount == true){
                posData.GetManagerDrawerLocationList()
                .success(function(data){
                    $("#DrawerManagerPrint, #DrawerManagerCount, #DrawerManagerReconcile").jqxButton({disabled: true});
                    DrawerManagerGrid(data);
                })
            }
            $("#FinalCashOut").attr('disabled', false);
        },1000)
    }

    $scope.FinalCashOutServer_cannot_print = function(){
        DownCount = 0;
        CountCount = 0;
        var emailmsgUnique;
        var UserUnique;
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
		var postdata ="cashtype=2";
		    //postdata+="&amount="+$("#cash-out-keypad-number input").val();
		posData.SaveAmountCashOutServer(postdata)
		.success(function(result){
			UserUnique = result.UserId;
			dialogCashCountForm.close();
            $("#cashier_cashout_q").jqxWindow("close");
            if(result.CashOutPrint){
                $.blockUI({ css: { 
                    border: '2px solid #fff',
                    padding: '15px', 
                    backgroundColor: '#210e66', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: 1, 
                    color: '#fff',
                    fontSize: '20px' 
                }, message: 'Sending...' });
                
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
                            if(convert.EmailSend){
                                var postdata ="EmailMessageUnique="+emailmsgUnique;
                                    postdata+="&UserUnique="+UserUnique;
                                posData.CashOutSendEMail(postdata)
                                .success(function(send){
                                    //setTimeout($.unblockUI, 100); 
                                })
                            }
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

            posData.CashOutClearCache()
            .success(function(data){

            })
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
		   // postdata+="&amount="+$("#cash-out-keypad-number").val();
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
        $("#AuthManagerfunction").attr('disabled', true);
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                posData.CashOutDisabled()
                .success(function(result2){
                    if(result2.success == true){
                        FunctionButton = 'AuthManager';  
                        NumpadPasscode('AuthEnterPassCode')	
                        .then(function(){
                            WindowPopupPasscode('Auth. Manager | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                                
                                setTimeout(function(){
                                    $("#AuthManagerfunction").attr({"disabled": false});
                                },1000);
                            })  
                        })
                        $scope.$broadcast('BackOffice');
                    }else{
                        LoadHeaderInfo();
                        // Disabled by HD 06/09/2020 related to the git issue 1152
                        // FunctionButton = '';
                        // var msg = 'Please cash in first';	
                        // NumpadAlertOk('invalid_passcode', msg)
                        // .then(function(){
                        //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        // })
                        FunctionButton = 'AuthManager';  
                        NumpadPasscode('AuthEnterPassCode')	
                        .then(function(){
                            WindowPopupPasscode('Auth. Manager | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                                
                                setTimeout(function(){
                                    $("#AuthManagerfunction").attr({"disabled": false});
                                },1000);
                            })  
                        })
                        $scope.$broadcast('BackOffice');
                    }
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
        $("#Payoutfunction").attr({"disabled":true});
        posData.CheckCache()
        .success(function(result){
            if(result.store){ 
                posData.CashOutDisabled()
                .success(function(result2){
                    // if(result2.success == true){                
                        FunctionButton = 'PayOut';
                        NumpadPasscode('EnterPasscodePayOut')	
                        .then(function(){
                            WindowPopupPasscode('Pay Out | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                            });
                            setTimeout(function(){
                                $("#Payoutfunction").attr({"disabled":false});
                            },1000);    
                        });
                    // }else{
                    //     LoadHeaderInfo();
                    //     FunctionButton = '';
                    //     var msg = 'Please cash in first';	
                    //     NumpadAlertOk('invalid_passcode', msg)
                    //     .then(function(){
                    //         WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    //     })
                    //     $("#Payoutfunction").attr({"disabled":false});
                    // }
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

        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px' 
        }, message: 'Printing receipt...',
            baseZ: 99999,
        });

        var PayOutSel   = $('input[type=radio][name=group1]:checked').attr('id');
        var PRUnique    = PayOutSel.split('=')[0];
        var PRType      = PayOutSel.split('=')[1];
        var postdata ="Amount="+$("#payout_number_field").val();
            postdata+="&Note="+$("#payout_note_input").val();
            postdata+="&PRUnique="+PRUnique;
            postdata+="&Type="+PRType;

        posData.PayOut(postdata)
        .success(function(data){
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }
            setTimeout($.unblockUI, 100);
            $("#payout-view").jqxWindow('close');
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
        myNumber = '';

        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px' 
        }, message: 'Printing receipt...',
            baseZ: 99999,
        });

        var PayOutSel   = $('input[type=radio][name=group1]:checked').attr('id');
        var PRUnique    = PayOutSel.split('=')[0];
        var PRType      = PayOutSel.split('=')[1];
        var postdata ="Amount="+$("#payout_number_field").val();
            postdata+="&Note="+$("#payout_note_input").val();
            postdata+="&PRUnique="+PRUnique;
            postdata+="&Type="+PRType;  

        posData.PayOut(postdata)
        .success(function(data){
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }
            setTimeout($.unblockUI, 100);
            $("#payout-view").jqxWindow('close');
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
				
				setTimeout(function(){
                    $("#number_field").focus();
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
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100)
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
            if(result == true){
                NumpadAlertOk('time_clock_out_failed', result.msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                });
                return false;
            }		
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
            $("#dialog-numpad-keyboard").jqxWindow('close');	

            if( $("#ClockOutPrint").val() == 1 ){
                PrinterCheckTimeClock(globalTimeclockUnique)
                .then(function(){
                    NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                    });
                })

                return;
            }
            
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
    $scope.CashierRecall = function(){
        $("#CashierRecallfunction").attr({"disabled":true});
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                posData.CashOutDisabled()
                .success(function(result2){
                    if(result2.success == true){
                        NumpadPasscode('EnterPasscodeRecall')	
                        .then(function(){
                            WindowPopupPasscode('Recall | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                            });
                        });
                        FunctionButton = 'Recall';
                        $scope.$broadcast('Recall');
                        setTimeout(function(){
                            $("#CashierRecallfunction").attr({"disabled":false});
                        },1000);
                    }else{
                        LoadHeaderInfo();
                        // FunctionButton = '';
                        // var msg = 'Please cash in first';	
                        // NumpadAlertOk('invalid_passcode', msg)
                        // .then(function(){
                        //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        // })
                        // $("#CashierRecallfunction").attr({"disabled":false});
                        NumpadPasscode('EnterPasscodeRecall')	
                        .then(function(){
                            WindowPopupPasscode('Recall | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
                            });
                        });
                        FunctionButton = 'Recall';
                        $scope.$broadcast('Recall');
                        setTimeout(function(){
                            $("#CashierRecallfunction").attr({"disabled":false});
                        },1000);
                    }
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

    var ScanDetected = (msg) => {
        var def = $.Deferred();
        $("body").append(
            '<div id="scan_detected" style="background: #144766; color:#EEE; overflow: hidden;">'+
                '<div id="scan_detected_container">'+
                    '<p>'+msg+'</p>'+
                    '<div>'+
                        '<div>'+
                            '<button id="scan_detected_yes" class="btn btn-primary btn-lg">Yes</button>&nbsp;&nbsp;'+
                            '<button id="scan_detected_no" class="btn btn-danger btn-lg">No</button>&nbsp;&nbsp;'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        $("#scan_detected").jqxWindow({
            height: 220,
            width: 260,
            title: 'Scan detected',
            isModal: true,
            theme: 'darkblue',
            showCloseButton: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        $("#scan_detected_yes").on('click', function(e){
            e.preventDefault();
            ScanRecallReceipt()
            .then(function(){

                var getrows = $("#listCashierSale").jqxGrid('getrows');
                if(getrows.length > 0){
                    $('#listCashierSale').jqxGrid({ selectedrowindex: 0});
                    $("#btn-use-req-receipt").trigger('click');
                }else{
                    var ScannedReceiptNumber = $("#ScanReceiptNumber").val();
                    var msg = 'Receipt no. '+ScannedReceiptNumber + ' cannot be found!';
                    NumpadAlertClose('no_receipt_found', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    })
                }
                $("#scan_detected").jqxWindow('close');
            })
        })

        $("#scan_detected_no").on('click', function(e){
            e.preventDefault();
            $("#scan_detected").jqxWindow('close');
        })

        setTimeout(function(){  
            $("#scan_detected").jqxWindow('open');
            $("#scan_detected").on('close', function(){
                $("#scan_detected").remove();
            })

            def.promise();
        },100)


        return def.promise();
    }



    var populateRecall = function(){
        var def = $.Deferred();
        $("body").append(
            '<div id="cashier_recall" style="display:none; ">'+
                '<div id="cashier_recall_container" style="background: #144766; color:#EEE; overflow: hidden;">'+
                    '<input type="text" id="ScanReceiptNumber" style="position: absolute; top:100; width: 0px; height: 0px; top:100px; left: 10px; border: none; background-color: transparent;"/>'+
                '</div>'+
            '</div>'
        );

        posData.LoadPayments()
        .success(function(data){
            $("#cashier_recall_container").append($compile(data.html)($scope));
            document.onkeydown = rebuildKeyPress;
            def.resolve(data.Function);
        })
        return def.promise();
    }

    var CashierRecallFunctionButton;
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
                title: '<button id="cashier_recall_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;"></button>&nbsp;Recall',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
            $('#cashier_recall').jqxWindow('open');
            
            $("#cashier_recall").on("close", function(event){
                // $('#listCashierSale').jqxGrid('removefilter', 'ReceiptNumber', true);
				// $("#listCashierSale").jqxGrid('destroy');
                $("#cashier_recall").remove();
            })

			def.resolve();	
		},100);
		return def.promise();
    }

    var rebuildKeyPress = () => {
		var evtobj = window.event? event : e;
		if (evtobj.keyCode == 66 && evtobj.ctrlKey) {
            var msg = "Scan detected! Do you like to continue?";
            
			$("#ScanReceiptNumber").val('');
            $("#ScanReceiptNumber").focus();
            
            setTimeout(function(){  
                ScanDetected(msg)
                .then(function(){
                    
                })
            },2000)
            
		}
    }

    var ScanRecallReceipt = () => {
        var def = $.Deferred();
        $("#listCashierSale").jqxGrid('clearselection');
		var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        
        var receiptNumberParse = $("#ScanReceiptNumber").val();
		var parseReceiptNumber = receiptNumberParse.split("=")[1];
		$("#ScanReceiptNumber").val(parseReceiptNumber);

        var filtervalue = $("#ScanReceiptNumber").val();
		var filtercondition = 'EQUAL';
        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
		filtergroup.addfilter(filter_or_operator, filter1);
		// add the filters.
		$("#listCashierSale").jqxGrid('addfilter', 'ReceiptNumber', filtergroup);
		// apply the filters.
        $("#listCashierSale").jqxGrid('applyfilters');
    
		setTimeout(function(){
			def.resolve();
		},100)
		return def.promise();
	}	


    $(document).on('click', '#cashier_recall_close', function(e){
        e.preventDefault();
        // $("#messageNotification").jqxNotification("closeAll");
        $("#cashier_recall").jqxWindow('close');
    });

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
        var GridReportLoadCount = 0;
        var def = $.Deferred();

        // DailySalesColumns();
        if(onholdcolumns.length > 0){
            
        }else{
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
        }
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
            def.resolve();
        })
        return def.promise();
    }
    //VisibleColumns();

    setTimeout($.unblockUI, 100);

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
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
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

                    // $("#jqxScrollBar").jqxScrollBar({theme: 'summer', width: 250, height: 18 });

                    setTimeout(function(){
                        $("#listCashierSale").jqxGrid('selectrow', 0);
                    },100);

                    bindData("listCashierSale");
                    
                    $("#listCashierSale").jqxGrid({ columns: onholdcolumns });

                    // $("#messageNotification").jqxNotification("closeAll");

                    //WindowOnHoldSale('On Hold Sale');
                })
            def.resolve();
        })
        return def.promise();
    }

    $("#dialog-alert-view-edit-cancel").on('close', function(e){
        e.preventDefault();
        $("#view_edit_cancel").html('');
    })

    var populateAlertViewEditCancel = function(form_name){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-alert-view-edit-cancel").append('<div id="view_edit_cancel" style="background: #144766;"></div>');
            $("#view_edit_cancel").html('');
            $("#view_edit_cancel").append(''+
                '<form id="'+form_name+'">'+
                    '<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
                    '<div id="open_receipt_view_edit"></div>'+
                '</form>'+
            '');
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupAlertViewEditCancel = function(title, method, size, move){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-alert-view-edit-cancel").jqxWindow({
                height: 120,
                width: 260,
                title: title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#dialog-alert-view-edit-cancel').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    var NumpadPromptAlertViewEditCancel = function(){
        var def = $.Deferred();
        populateAlertViewEditCancel('recall_view_edit_cancel')
        .then(function(){
            $('#open_receipt_view_edit').hdkeyboard({
                layout: "alert_recall_view_edit_cancel",
                input: $('#number_field')
            });
            def.resolve();
        })
        return def.promise();
    }

    var POSReceiptEditPrevious = $("#POSReceiptEditPrevious").val();
    var StationCashierUniqueCashOut;

    $(document).on('rowdoubleclick', '#listCashierSale', function(event){
        var index = event.args.rowindex;
        var datafield = event.args.datafield;
        var row = $(this).jqxGrid('getrowdata', index);
        editRow = index;
        StationCashierUniqueCashOut = row.CashOut;
        var postdata="ReceiptHeaderUnique="+row.Unique;
            postdata+="&SplitUnique="+row.SplitUnique;
            postdata+="&Tab="+Tab;       
        if(TabStatus == 5){
            if($("#CashInMethod").val() == 2){
                posData.CashInServerCheckByUserId()
                .success(function(result){
                    if(result.cashin){
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
                        var msg = result.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }else{
                posData.CashInStationCheckByUserId()
                .success(function(result){
                    if(result.cashin){
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
                        var msg = result.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }
        }else{
            RecallOpenReceipt('recall_open_receipt_q')
            .then(function(){
                WindowPopupRecallOpenReceipt('Open Receipt');
            })
        }
    });

    var SelCompleted = function(){
        CashierRecallFunctionButton = 'SelCompleted';
        Tab = 'LoadCompletedSale';
        TabStatus = 4;
        Attribute = 'CashierRecallCompleted';
        var def   = $.Deferred();
        var onhold_data = [];
        posData.LoadCashierSale()
        .success(function(data){
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
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
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

                    //WindowOnHoldSale('On Hold Sale');

                    // $("#messageNotification").jqxNotification("closeAll");
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
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
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

                    // $("#messageNotification").jqxNotification("closeAll");

                    //WindowOnHoldSale('On Hold Sale');
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
            try{
                if(!row){
                    $(".listitems").html('');
                    $(".CHSlistitemsTotal").html('');
                    return false;
                }
                StationCashierUniqueCashOut = row.CashOut;
            }catch(e){
                console.log(e);
            }
            var datainformations = $("#listCashierSale").jqxGrid("getdatainformation");
            var rowscounts = datainformations.rowscount;
            if(rowscounts >= 0){
                RowReceiptHeaderUnique = row.Unique;
                GlobalReceiptNumber = row.ReceiptNumber;
                var postdata ="ReceiptHeaderUnique="+row.Unique;
                    postdata+="&Status="+TabStatus;
                $("#btn-use-req-receipt").val(row.Unique);
                $("#btn-use-req-receipt").text("Open "+row.ReceiptNumber);
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
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&cashtype=3";
                postdata+="&FunctionButton="+FunctionButton; 
            posData.RestrictionPasscodeRecall(postdata)
            .success(function(restrict){
                if(restrict.success == true){
                    SetNewUser = restrict.userid;
                    if(restrict.login == true){

                        console.log("CashOutCashInCheck",restrict.CashOutCashInCheck, restrict.MultipleCashedIn);

                        if(restrict.MultipleCashedIn){
                            CashInProcessFunction = 'CashierRecall';
                            CashedInList(restrict, hashpasscode, 'Recall');
                            $("#dialog-numpad-passcode").jqxWindow('close');
                            return;
                        }

                        var store_unique_id;
                        var postdata='';
                        if(restrict.CashOutCashInCheck){
                            var TimeLimit = '';
                            var strHrs = '';
                            var CashInMinutes = parseInt(restrict.CashOutCashInCheckResult.CashInMinutes);
                            var CashInTimeSetting =  parseInt(restrict.CashOutCashInCheckResult.CashInTimeSetting);
                            
                            var CashInTimeCalculation = (CashInTimeSetting / 60);
                            TimeLimit = (CashInMinutes > CashInTimeSetting  ? CashInTimeCalculation : 0);
                            strHrs = (TimeLimit > 1 ? "hrs" : "hr");
                            
                            if(TimeLimit > 0){
                                //if less than 60 parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) ;
                                var msg ='You have been cashed in longer than <br>'+CashInTimeCalculation + ' ' + strHrs +'<br><br>';
                                    msg+='Please Cash Out Now';	
                                NumpadAlertOk('cashout_first', msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                return;
                            }
                        }


                        var CheckAttibute = window.localStorage.getItem('RecallAttributes');
                        
                        if(CheckAttibute == 'load'){
                            populateRecall()
                            .then(function(fnvalue){
                                recall_page_popup()
                                .then(function(){
                                    SelOnHold();
                                    LoadHeaderInfo();
                                })
                            })
                        }else{ 
                            VisibleColumns()
                            .then(function(){
                                populateRecall()
                                .then(function(fnvalue){
                                    recall_page_popup()
                                    .then(function(){
                                        SelOnHold();
                                        LoadHeaderInfo();
                                        window.localStorage.setItem('RecallAttributes', 'load');
                                    })
                                })
                            })
                        }
                        console.log("LocalStorageSpace",localStorageSpace());
                        $("#dialog-numpad-passcode").jqxWindow('close');
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
        // $('#cashier_recall').block({message: 'Printing receipt please wait...'})
        posData.RecallPrinterCheck()
        .success(function(result){
            if(result.success == true){
                if(result.print == true){
                    $('#cashier_recall').unblock();
                    def.resolve();
                }else{
                    // $('#cashier_recall').unblock();
                    var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                    setTimeout($.unblockUI, 100);
                }
            }else{
                var msg ="Station printer is disabled!";
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
                setTimeout($.unblockUI, 100);
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
    $(document).on("click", "#btn-print-req-receipt", function(e){
        e.preventDefault();
        var index = $("#listCashierSale").jqxGrid('getselectedrowindex');
        var row =  $("#listCashierSale").jqxGrid('getrowdata', index);
        if(row){

            var printmsg = "Printing receipt"+"<br/>";
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: printmsg, 
                baseZ: 99999,
            });

            if(RowReceiptHeaderUnique > 0){
                RecallPrinterCheck()
                .then(function(){
                    // $("#messageNotification").jqxNotification("closeAll");
                    //var postdata = "ReceiptHeaderUnique="+RowReceiptHeaderUnique;
                    posData.RePrintReceipt2(RowReceiptHeaderUnique)
                    .success(function(data){
                        load_data(data);
                    })
                })
            }else{
                var msg = "Please select receipt number";
                NumpadAlertCloseReport('recall_open_receipt', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Print Receipt');
                });
            }
        }else{
            var msg = 'Please select receipt number';
            NumpadAlertClose('assign_receipt_not_selected', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
        }
        setTimeout($.unblockUI, 100);
    })


    var load_data = function(data){
        /*
		|--------------------------------------------------------|
		| Receipt PDF
		|--------------------------------------------------------|
		*/
		if(data.PDFReceipt){
			var PathReceiptPDF = base_url + data.PDFReceipt;
			pdf_receipt(PathReceiptPDF);
		}
    }

    var pdf_receipt = function(pathToPdf) {
		const frame = document.createElement('iframe')
		frame.src = pathToPdf.trim()
		frame.style = "display:none;";
		const container = document.getElementsByTagName('body') // this will return a NodeList
		container[0].appendChild(frame);
		frame.contentWindow.print();
	}

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
            var useFilterHeight = (ResoHeight / 5);
            $("#cashier_open_receipt").jqxWindow({
                height: useFilterHeight,
                width: '300px',
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
    $(document).on("click", "#recall_filter_req .button_q_cancel", function(){
         $("#cashier_filter_recall").jqxWindow('close');
    })

    //-->Recall filter Ok button
    $(document).on("click", "#btn-req-filter", function(){
        // $("#messageNotification").jqxNotification("closeAll");
        posData.RecallFilter()
        .success(function(data){
            RecallFilter('recall_filter_req', data.html)
            .then(function(){
                WindowPopupRecallFilter('Filter')
                .then(function(){
                    $("#recall_date_from").jqxDateTimeInput({width: '100%', height: 40, formatString: 'MM/dd/yyyy'});
                    $("#recall_date_to").jqxDateTimeInput({width: '100%', height: 40, formatString: 'MM/dd/yyyy'});
                    $("#recall_location").jqxComboBox({ source: RecalldataAdapter, selectedIndex: 0, displayMember: "LocationName", valueMember: "Unique", height: 40, width:'100%'});
                    $("#recall_location").val($("#StoreUnique").val());
                })
            })
        })
    })

    $(document).on("click", "#recall_filter_req .button_proceed", function(e){
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
    

    //-->Open Receipt Button
    $(document).on("click", "#btn-use-req-receipt", function(){
        var index = $("#listCashierSale").jqxGrid('getselectedrowindex');
        var row =  $("#listCashierSale").jqxGrid('getrowdata', index);
        if(row){
            // $("#messageNotification").jqxNotification("closeAll");
            StationCashierUniqueCashOut = row.CashOut;
            var postdata="ReceiptHeaderUnique="+RowReceiptHeaderUnique;
                postdata+="&SplitUnique="+row.SplitUnique;
                postdata+="&Tab="+Tab;          
            if(RowReceiptHeaderUnique > 0){
                if(TabStatus == 5){
                    if($("#CashInMethod").val() == 2){
                        posData.CashInServerCheckByUserId()
                        .success(function(result){
                            if(result.cashin){
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
                                var msg = result.msg;
                                NumpadAlertClose('cannot_open_receipt', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });
                            }
                        })
                    }else{
                        posData.CashInStationCheckByUserId()
                        .success(function(result){
                            if(result.cashin){
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
                                var msg = result.msg;
                                NumpadAlertClose('cannot_open_receipt', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });
                            }
                        })
                    }
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
        }else{
            var msg = 'Please select receipt number';
            NumpadAlertClose('assign_receipt_not_selected', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
        }
    })

    //-->New Sale Button
    $(document).on("click", "#btn-new-req-receipt", function(){
        // $("#messageNotification").jqxNotification("closeAll");
        if($("#CashInMethod").val() == 2){
            posData.CashInServerCheckByUserId()
            .success(function(result){
                if(result.cashin){

                    // if(result.CashOutCashInCheck){
                    //     if(parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) < parseInt(result.CashOutCashInCheckResult.CashInMinutes)){
                    //         var TimeLimit = result.CashOutCashInCheckResult.Interval;
                    //         n = (TimeLimit + "").split(":");
                    //         var Hours = Number(n[0]);
                    //         var Min = Number(n[1]);
                            
                    //         if(Hours > 0){
                    //             if(Hours > 1){
                    //                 TimeLimit = Hours + ' Hours';
                    //             }else{
                    //                 TimeLimit = Hours + ' Hour';
                    //             }
                    //         }else{
                        
                    //             if(Min > 1){
                    //                 TimeLimit = Min + ' Mins';
                    //             }else{
                    //                 TimeLimit = Min + ' Min';
                    //             }
                                
                    //         }
                    
                    //         var msg ='You have been cashed in longer than <br>'+TimeLimit+'<br><br>';
                    //             msg+='Please Cash Out Now';	
                    //         NumpadAlertOk('cashout_first', msg)
                    //         .then(function(){
                    //             WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    //         })
                            
                    //         return;
                    //     }
                    // }

                    if(result.CashOutCashInCheck){
                        var TimeLimit = '';
                        var strHrs = '';
                        var CashInMinutes = parseInt(result.CashOutCashInCheckResult.CashInMinutes);
                        var CashInTimeSetting =  parseInt(result.CashOutCashInCheckResult.CashInTimeSetting);
                        
                        var CashInTimeCalculation = (CashInTimeSetting / 60);
                        TimeLimit = (CashInMinutes > CashInTimeSetting  ? CashInTimeCalculation : 0);
                        strHrs = (TimeLimit > 1 ? "hrs" : "hr");
                        
                        if(TimeLimit > 0){
                            //if less than 60 parseInt(result.CashOutCashInCheckResult.CashInTimeSetting) ;
                            var msg ='You have been cashed in longer than <br>'+CashInTimeCalculation + ' ' + strHrs +'<br><br>';
                                msg+='Please Cash Out Now';	
                            NumpadAlertOk('cashout_first', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })

                            if($("#dialog-numpad-passcode").length > 0){
                                $("#dialog-numpad-passcode").jqxWindow('close');
                            }

                            return;
                        }
                    }

                    if($("#POSOrderTypeRequired").val() == 2){
						$scope.OrderTypeQuickRecall(result.info.UserUnique);
					}else{
                        var TableNumberChange   = $("#TableNumberChange").val();
						var TableCustomerNo     = $("#TableCustomerNo").val();
						if(TableCustomerNo == 1){
							var VirtualTableManualCustomerNo = ['', 'cashier_quick_recall_new_sale_customer_no'];
							$rootScope.$emit('CallNumpadTableNoOfCustomerCashier', VirtualTableManualCustomerNo);
						}else{
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
                        }
                    }
                }else{
                    var msg = result.msg;
                    NumpadAlertClose('cannot_open_receipt', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })

        // By Station
        }else{
            posData.CashInStationCheckByUserId()
            .success(function(result){
                if(result.cashin){
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
                }else{
                    var msg = result.msg;
                    NumpadAlertClose('cannot_open_receipt', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }
    })

    //-->Payment Button
    $(document).on("click", "#btn-proceed-req-sale", function(){
        var index = $("#listCashierSale").jqxGrid('getselectedrowindex');
        var row =  $("#listCashierSale").jqxGrid('getrowdata', index);
        // $("#messageNotification").jqxNotification("closeAll");
        if(row){
            if($("#CashInMethod").val() == 2){
                posData.CashInServerCheckByUserId()
                .success(function(result){
                    if(result.cashin){
                        var postdata ="ReceiptHeaderUnique="+RowReceiptHeaderUnique;
                            postdata+="&SplitUnique="+row.SplitUnique;
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
                        var msg = result.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }else{
                posData.CashInStationCheckByUserId()
                .success(function(result){
                    if(result.cashin){
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
                        var msg = result.msg;
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }
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
       CashierRecallFunctionButton = 'CashierRecallCash'; 
       Attribute = 'CashierRecallCash';
       Type = type;
        SelTabSale(type, Attribute, cashcolumns)
        .then(function(){
            
        })
    }

    //-->Credit Card Tab
    $scope.RecallCCType = function(type){
        CashierRecallFunctionButton = 'CashierRecallCreditCard';
        Attribute = 'CashierRecallCreditCard';
        Type = type;
        SelTabSale(type, Attribute, creditcardcolumns)
        .then(function(){
            
        })
    }

    //-->Gift Card Tab
    $scope.RecallGCType = function(type){
        CashierRecallFunctionButton = 'CashierRecallGiftCard';
        Attribute = 'CashierRecallGiftCard';
        Type = type;
        SelTabSale(type, Attribute, giftcardcolunns)
        .then(function(){
            
        })
    }

    //-->Check Tab 
    $scope.RecallCheck = function(type){
        CashierRecallFunctionButton = 'CashierRecallCheck';
        Attribute = 'CashierRecallCheck';
        Type = type;
        SelTabSale(type, Attribute, checkcolumns)
        .then(function(){
            
        })
    }

    //-->EBT tab 
    $scope.RecallEBT = function(type){
        CashierRecallFunctionButton = 'CashierRecallEBT';
        Attribute = 'CashierRecallEBT';
        Type = type;
        EBT = 1;        
        SelTabSale(type, Attribute, creditcardcolumns)
        .then(function(){
            
        })
    }

    var CashierRecallVoidedLoad = (Type) => {
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
            var dataAdapter = new $.jqx.dataAdapter(source);
            
            $("#listCashierSale").jqxGrid({
                source: dataAdapter,
            });

            setTimeout(function(){
                $("#listCashierSale").jqxGrid('selectrow', 0);
            },1000);

            bindData("listCashierSale");
            
            $("#listCashierSale").jqxGrid({ columns: voidedcolumns });
        })
    }

    //-->Voided tab
    $(document).on("click", ".recall_voided", function(){
        TabStatus = 4;
        CashierRecallFunctionButton = 'CashierRecallVoided';
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
                    postdata+="&Type=8";
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
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    
                    console.log("g1");

                    $("#listCashierSale").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        rowsheight: GridRowHeight,
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
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

                    // $("#messageNotification").jqxNotification("closeAll");
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
        var postdata ="FunctionButton=EditReceipt";
        /*
		posData.CheckUserManagerCookie(postdata)
		.success(function(data){
			if(data.prompt){
				FunctionButton = 'EditReceipt';
				NumpadPasscode('recall_view_receipt_passcode')
				.then(function(){
					WindowPopupPasscode('Edit Receipt')
					.then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
					})
				})
                $("#OnHoldfunction").attr("disabled", false);
                $("#cashier_open_receipt").jqxWindow('close');
			}else{
            */
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

            //}    
        //})
    }) 


    $(document).on('submit', '#recall_view_receipt_passcode', function(e){
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

    $(document).on('click', '#recall_open_receipt_q .button_edit', function(e){
        e.preventDefault();
        if(POSReceiptEditPrevious == 0){
            if(StationCashierUniqueCashOut != null){
                var msg = 'Cannot edit receipt <br/><br/>Already Cashed Out';
                NumpadAlertClose('cannot_open_receipt', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                });
            }else{
                var postdata ="FunctionButton=EditReceipt";
                posData.CheckUserManagerCookie(postdata)
                .success(function(data){
                    if(data.prompt){
                        FunctionButton = 'EditReceipt';
                        NumpadPasscode('recall_edit_receipt_passcode')
                        .then(function(){
                            WindowPopupPasscode('Edit Receipt')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100)
                            })
                        })
                        $("#OnHoldfunction").attr("disabled", false);
                        $("#cashier_open_receipt").jqxWindow('close');
                    }else{
                        if($("#CashInMethod").val() == 2){
                            posData.CashInServerCheckByUserId()
                            .success(function(result){
                                if(result.cashin){
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
                                }else{
                                    var msg = result.msg;
                                    NumpadAlertClose('cannot_open_receipt', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    });
                                }
                            })
                        }else{
                            posData.CashInStationCheckByUserId()
                            .success(function(result){
                                if(result.cashin){
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
                                }else{
                                    var msg = result.msg;
                                    NumpadAlertClose('cannot_open_receipt', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    });
                                }
                            })
                        }
                    }
                }) 
            }
        }else{
            var postdata ="FunctionButton=EditReceipt";
            posData.CheckUserManagerCookie(postdata)
            .success(function(data){
                if(data.prompt){
                    FunctionButton = 'EditReceipt';
                    NumpadPasscode('recall_edit_receipt_passcode')
                    .then(function(){
                        WindowPopupPasscode('Edit Receipt')
                        .then(function(){
                            setTimeout(function(){
                                $("#number_field").focus();
                            },100)
                        })
                    })
                    $("#OnHoldfunction").attr("disabled", false);
                    $("#cashier_open_receipt").jqxWindow('close');
                }else{
                    if($("#CashInMethod").val() == 2){
                        posData.CashInServerCheckByUserId()
                        .success(function(result){
                            if(result.cashin){
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
                            }else{
                                var msg = result.msg;
                                NumpadAlertClose('cannot_open_receipt', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });
                            }
                        })
                    }else{
                        posData.CashInStationCheckByUserId()
                        .success(function(result){
                            if(result.cashin){
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
                            }else{
                                var msg = result.msg;
                                NumpadAlertClose('cannot_open_receipt', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });
                            }
                        })
                    }
                }
            }) 
        }
        $("#cashier_open_receipt").jqxWindow('close');
        StationCashierUniqueCashOut = null;
    })

    $(document).on('submit', '#recall_edit_receipt_passcode', function(e){
        e.preventDefault();
        if($("#CashInMethod").val() == 2){
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
                            posData.CashInServerCheckByUserId()
                            .success(function(result){
                                if(result.cashin){
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
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');	
                                    var msg = result.msg;
                                    NumpadAlertClose('cannot_open_receipt', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    });
                                }
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
                })
            }else{
                $("#dialog-numpad-passcode").jqxWindow("close");
                var msg = 'Passcode cannot be empty';	
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
                
        }else{
            posData.CashInStationCheckByUserId()
            .success(function(result){
                if(result.cashin){
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
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        var msg = 'Passcode cannot be empty';	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }else{
                    var msg = result.msg;
                    NumpadAlertClose('cannot_open_receipt', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }
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
               $("#CashInCashInStation").attr({"disabled": true}); 
                FunctionButton = 'CashIn';  
                NumpadPasscode('EnterCashInStationPasscode')	
                .then(function(){
                    WindowPopupPasscode('Cash In | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                            $("#CashInCashInStation").attr({"disabled": false}); 
                        },100); 
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
        var printmsg = "Retrieving data"+"<br/>";
        $.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: printmsg,
            baseZ: 99999,
        });
        
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
                            if(data2.not_batch_yet){
                                setTimeout($.unblockUI, 100);
                                $("#dialog-numpad-passcode").jqxWindow('close');

                                var msg = "Credit Cards Must Be Batched Out First<br><br>"
                                msg+="1. Go to Authorize Manager<br>"
                                msg+="2. Make Sure all Credit Cards Adjusted<br>" 
                                msg+="3. Press Batch Charges Button<br>"
                                msg+="4. Follow Prompts";
                                NumpadAlertClose('cannot_open_receipt', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                });

                                return false;
                            }
                            var AutoCashIn = $("#CashInDenomination").val();
                            if(AutoCashIn == 2){
                                if(data2.cashin == false){
                                    var postdata ="Amount=0";
                                    posData.SaveAmountCashInStation(postdata)
                                    .success(function(result){
                                        if(result.save){
                                            if(result.CashInPrint){
                                                PrinterCashInStationCheck();
                                            }else{
                                                LoadHeaderInfo(); 
                                            }
                                        }
                                    })
                                }else{
                                    username = data2.info.UserName;
                                    var msg = username + ' already Cashed In';
                                    NumpadAlertOk('cashed_in', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                setTimeout($.unblockUI, 100);
                            }else{
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
                                        setTimeout($.unblockUI, 100);
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
                                                setTimeout($.unblockUI, 100);
                                            }else{
                                                var postdata ="UserUnique="+newuser;
                                                posData.CheckCashDrawerMutipleCashInStation(postdata)
                                                .success(function(result){
                                                    if(result.Setting == true){
                                                        if(result.CashDrawerSetup == true){
                                                            if( $("#CashDrawerOpen").val() == 1 ){
                                                                OpenCashDrawer();
                                                            }else{
                                                                setTimeout($.unblockUI, 100);
                                                            }
                                                            
                                                            if( $("#CashInDenomination").val() == 1 ){
                                                                CashInDenomination()
                                                                .then(function(){
                                                                    WindowCashInDenomination()
                                                                    .then(function(){
                                                                        CashInDenominationGrid();
                                                                        $("#cashin_denomination_save").attr("disabled",true);
                                                                    })
                                                                })
                                                            }else{
                                                                var CashInAmount = 0
                                                                if(data2.amount == 0){
                                                                    CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                                }else{
                                                                    CashInAmount = parseFloat(0).toFixed(2);
                                                                }
                                                                NumpadCashInAmount('SaveAmountCashInStation')
                                                                .then(function(){
                                                                    WindowPopupCashInAmount('Cash In')
                                                                    $("#cashin_amount").jqxNumberInput('focus');
                                                                    setTimeout(function(){
                                                                        $("#cashin_amount").val(CashInAmount);
                                                                        // var input = $('#cashin_amount input')[0];
                                                                        // if('selectionStart' in input){
                                                                        //     input.setSelectionRange(0, 0);
                                                                        // }else{
                                                                        //     var range = input.createTextRange();
                                                                        //     range.collapse(true);
                                                                        //     range.moveEnd('character', 0);
                                                                        //     range.moveStart('character', 0);
                                                                        //     range.select();
                                                                        // }
                                                                        // $("#cashin_amount input").select();
                                                                    },100)
                                                                })
                                                            }
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
                                                        if( $("#CashDrawerOpen").val() == 1 ){
                                                            OpenCashDrawer();
                                                        }else{
                                                            setTimeout($.unblockUI, 100);
                                                        }
                                                        if( $("#CashInDenomination").val() == 1 ){
                                                            console.log("or here");
                                                            CashInDenomination()
                                                            .then(function(){
                                                                WindowCashInDenomination()
                                                                .then(function(){
                                                                    CashInDenominationGrid();
                                                                    $("#cashin_denomination_save").attr("disabled",true);
                                                                })
                                                            })
                                                        }else{
                                                            var CashInAmount = 0
                                                            if(data2.amount == 0){
                                                                CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                            }else{
                                                                CashInAmount = parseFloat(0).toFixed(2);
                                                            }
                                                            NumpadCashInAmount('SaveAmountCashInStation')
                                                            .then(function(){
                                                                WindowPopupCashInAmount('Cash In')
                                                                $("#cashin_amount").val(CashInAmount);
                                                                setTimeout(function(){
                                                                    $("#cashin_amount").jqxNumberInput('focus');
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
                                                                },200)
                                                            })
                                                        }
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
                                                        if( $("#CashDrawerOpen").val() == 1 ){
                                                            OpenCashDrawer();
                                                        }else{
                                                            setTimeout($.unblockUI, 100);
                                                        }

                                                        if( $("#CashInDenomination").val() == 1 ){
                                                            console.log("or here2");
                                                            CashInDenomination()
                                                            .then(function(){
                                                                WindowCashInDenomination()
                                                                .then(function(){
                                                                    CashInDenominationGrid();
                                                                    $("#cashin_denomination_save").attr("disabled",true);
                                                                })
                                                            })
                                                        }else{
                                                            var CashInAmount = 0
                                                            if(data2.amount == 0){
                                                                CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                            }else{
                                                                CashInAmount = parseFloat(0).toFixed(2);
                                                            }
                                                            NumpadCashInAmount('SaveAmountCashInStation')
                                                            .then(function(){
                                                                WindowPopupCashInAmount('Cash In')
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
                                                            })
                                                        }
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
                                                    if( $("#CashDrawerOpen").val() == 1 ){
                                                        OpenCashDrawer();
                                                    }else{
                                                        setTimeout($.unblockUI, 100);
                                                    }

                                                    if( $("#CashInDenomination").val() == 1 ){
                                                        console.log("here3");
                                                        CashInDenomination()
                                                        .then(function(){
                                                            WindowCashInDenomination()
                                                            .then(function(){
                                                                CashInDenominationGrid();
                                                                $("#cashin_denomination_save").attr("disabled",true);
                                                            })
                                                        })
                                                    }else{
                                                        
                                                        var CashInAmount = 0
                                                        if(data2.amount != 0){
                                                            CashInAmount = parseFloat(data2.amount).toFixed(2); 
                                                        }else{
                                                            CashInAmount = parseFloat(0).toFixed(2);
                                                        }

                                                        NumpadCashInAmount('SaveAmountCashInStation')
                                                        .then(function(){
                                                            WindowPopupCashInAmount('Cash In')
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
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            }//Auto Cash In
                        })
                    }else{
                        NumpadAlertOk('not_authorized', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        setTimeout($.unblockUI, 100);
                    }
                }else{
                    NumpadAlertOk('invalid_passcode', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                    $("#dialog-numpad-passcode").jqxWindow('close');
                    setTimeout($.unblockUI, 100);
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100);
        }
    })

    /*
    |--------------------------------------------------------------------------------
    | Save Amount Cash In by Station
    |--------------------------------------------------------------------------------
    */
    $(document).on('submit', '#SaveAmountCashInStation', function(e){
        e.preventDefault();
        var enteredAmount = $("#cashin_amount").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
		}

        var postdata ="Amount="+enteredAmount;
        posData.SaveAmountCashInStation(postdata)
        .success(function(result){
            if(result.save){
                $("#cash_in_enter_amount").jqxWindow('close');
                if(result.CashInPrint){
                    PrinterCashInStationCheck();
                }else{
                   LoadHeaderInfo(); 
                }
            }else{
                $("#cash_in_enter_amount").jqxWindow('close');
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
                if( $("#CashDrawerOpen").val() == 1 ){
                    OpenCashDrawer();
                }else{
                    setTimeout($.unblockUI, 100);
                }

                if( $("#CashInDenomination").val() == 1 ){
                    CashInDenomination()
                    .then(function(){
                        WindowCashInDenomination()
                        .then(function(){
                            CashInDenominationGrid();
                        })
                    })
                }else{
                    SelectCashDrawerCashInStation();
                }
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
            NumpadCashInAmount('SaveAmountCashInStation')
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
                })
            })
            /*
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
            */
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
                $("#CashOutCashOutStation").attr({"disabled": true}); 
                posData.CashInStationCheckCashOut()
                .success(function(data){
                    if(data.cashin == true){
                        NumpadPasscode('EnterCashOutStationPasscode')
                        .then(function(){
                            WindowPopupPasscode('Cash Out | Enter Passcode')
                            .then(function(){
                                setTimeout(function(){
                                    $("#number_field").focus();
                                },100);
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
                        $("#CashOutCashOutStation").attr({"disabled": false}); 
                    },1000);
                })
            }else{
               location.reload(); 
            }
        })
    }

    var ServerCashInByStationList = function(Unique){
        if(DrawerManagerState){
            var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

            var postdata ="UserUnique="+rowdata.UserUnique;
                postdata+="&LocationUnique="+rowdata.LocationUnique;
                postdata+="&StationUnique="+rowdata.StationUnique;
                postdata+="&CashInMethod="+rowdata.CashInMethod;
            posData.DrawerManagerListCashInByStation(postdata)
            .success(function(data){
                ServerCashInListView('server_by_station_list_option', data.html)
                .then(function(){
                    WindowServerCashInList('Cash Out');
                })
            })
            return false;
        }
 
        ServerCashInListView(Unique);
        // var postdata ="UserUnique="+Unique;
        // posData.ListCashInByStation(postdata)
        // .success(function(data){
        //     ServerCashInListView('server_by_station_list_option', data.html)
        //     .then(function(){
        //         WindowServerCashInList('Cash Out');
        //     })
        // })
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
                    if(data.not_batch_yet){
                        $("#dialog-numpad-passcode").jqxWindow('close');

                        var msg = "Credit Cards Must Be Batched Out First<br><br>"
                        msg+="1. Go to Authorize Manager<br>"
                        msg+="2. Make Sure all Credit Cards Adjusted<br>" 
                        msg+="3. Press Batch Charges Button<br>"
                        msg+="4. Follow Prompts";
                        NumpadAlertClose('cannot_open_receipt', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });

                        return false;
                    }

                    ByStationCashierUnique   = data.UserUnique;
                    CashOutStationUserUnique = data.UserUnique;
                    getOnHoldReceipts(data.UserUnique);
                    if(data.OpenUserList){
                        LoadHeaderInfo();
                        ServerCashInByStationList(data.UserUnique);
                    }else{
                        if(data.countposition > 0){
                            if(CashOutBlind > 0){
                                LoadHeaderInfo();
                                if( $("#CashDrawerOpen").val() == 1 ){
                                    OpenCashDrawer();
                                }else{
                                    setTimeout($.unblockUI, 100);
                                }
                                CashCountProcessServerBlind(data.StationCashierUnique);
                            }else{
                                LoadHeaderInfo();
                                if( $("#CashDrawerOpen").val() == 1 ){
                                    OpenCashDrawer();
                                }else{
                                    setTimeout($.unblockUI, 100);
                                }
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

    var ByStationCashierUnique;
    $(document).on('click', '#server_by_station_list_option .button_proceed', function(){
        var OptionList = $('input[type=radio][name=group1]:checked').prop('id');
        if(!OptionList){
            var msg = "Please select from option";
            NumpadAlertClose('invalid_cashout_server_code', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });

            return;
        }
        
        var UserUnique = OptionList.split('=')[0];
		ByStationCashierUnique = OptionList.split('=')[1];
        if(UserUnique){
            var postdata ="UserUnique="+CashOutStationUserUnique;
                postdata+="&StationCashierUnique="+ByStationCashierUnique;
            posData.CashOutStationCheckCashIn(postdata)
            .success(function(data){
                if(CashOutBlind > 0){
                    CashCountProcessServerBlind(data.info.Unique)
                    .then(function(){
                        if( $("#CashDrawerOpen").val() == 1 ){
                            OpenCashDrawer();
                        }else{
                            setTimeout($.unblockUI, 100);
                        }
                    })
                }else{
                    CashCountProcessServer(data.info.Unique)
                    .then(function(){
                        if( $("#CashDrawerOpen").val() == 1 ){
                            OpenCashDrawer();
                        }else{
                            setTimeout($.unblockUI, 100);
                        }
                    })
                }
                
            })
            getOnHoldReceipts(UserUnique);
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
                                if(CashOutBlind > 0){
                                    CashCountProcessServerBlind();
                                }else{
                                    CashCountProcessServer();
                                }
                            }
                        }else{
                            LoadHeaderInfo();
                            if(CashOutBlind > 0){
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

    $scope.FinalCashOutStation_test = function(){
        posData.TestServer()
        .then(function(data){
            console.log(JSON.stringify(data.itemData));
        })
    }

    //-->Cash Out Create PDF file
    var CashOutPDFCreator = function(){
        var def = $.Deferred();
        var postdata ="StationCashierUnique="+ByStationCashierUnique;
        posData.CashOutConvertPDF(postdata)
        .success(function(convert){
            if(convert.success == false){
                // var msg = "Download directory doesn't exist! ";
                // NumpadAlertClose('cashout_pdf_failed', msg)
                // .then(function(){
                //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                // });
                setTimeout($.unblockUI, 100);
            }

            if(convert.SendEmail){
                var emailmsgUnique = convert.emailmsgUnique; 
                var UserUnique = convert.UserUnique;
            }
            def.resolve(emailmsgUnique, UserUnique);
        })
        return def.promise();
    }
   
    //-->Cash Out Unset Cash Drawer
    var CashOutUnsetCashDrawer = function(){
        var def = $.Deferred();
        var postdata ="StationCashierUnique="+ByStationCashierUnique;
        posData.UnsetCashDrawerByStation(postdata)
        .success(function(result2){
            if(convert.EmailSend){
                
            }
        })
    }
    //-->Cash Out Send Email
    var CashOutSendEmail = function(emailmsgUnique, UserUnique){
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
        }, message: 'Sending...' });
        var postdata ="EmailMessageUnique="+emailmsgUnique;
            postdata+="&UserUnique="+UserUnique;
        posData.CashOutSendEMail(postdata)
        .success(function(send){
            setTimeout($.unblockUI, 100);
            def.resolve(); 
        })
        return def.promise();
    }

    //CheckOnHold
    $scope.FinalCashOutStation = function(){
        DownCount = 0;
        CountCount = 0;
        if( $("#CashOutCheckOnHold").val() == 1 && OnHoldInfoArr[0].length > 0){
            var OnHoldReceiptsUsers = '';
            var OnHoldCount = 0;
            var ProcessLength = OnHoldInfoArr.length;
            var ProcessCount = 0;
            $.each(OnHoldInfoArr[0], function(index, value){
                OnHoldCount = (OnHoldCount + value.OnHoldCount);
                if(ProcessLength == ProcessCount){
                    OnHoldReceiptsUsers += value.UserName+'';
                }else{
                    OnHoldReceiptsUsers += value.UserName+', ';
                }
                ProcessCount++;
            })
            var msg = 'Cannot Cash Out ';
            var usetext1 = '';
            var usetext2 = '';
            var usetext3 = '';
            if(OnHoldCount > 1){
                usetext1 = '<br>';
                usetext2 = 'receipts ';
                usetext3 = 'these Receipts ';
            }else{
                usetext1 = '<br>';
                usetext2 = 'receipt ';
                usetext3 = 'this Receipt ';
            }
            msg+= usetext1 + OnHoldCount + ' ' + usetext2 + ' assigned to '+OnHoldReceiptsUsers+'<br>';
            msg+='Please Complete '+usetext3+'or Assign to different user. ';

            NumpadAlertClose('cashout_failed', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });

            return false;
        }
        console.log("s1",DrawerManagerReconcile);
        if(DrawerManagerReconcile){
            var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

            var postdata ="cashtype=2";
            postdata+="&StationCashierUnique="+ByStationCashierUnique;
            postdata+="&LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            posData.DrawerManagerSaveAmountCashOutStation(postdata)
            .success(function(result){
                console.log("s2",result);
                if(result.success == true){
                    //PrinterCheck();
                    $("#DrawerManagerPrint, #DrawerManagerCount, #DrawerManagerReconcile").jqxButton({disabled: true});
                    
                    DrawerManagerGrid(result);
                }
                //-->Close Cash Out Form
                dialogCashCountForm.close();
                $("#cashier_cashout_q").jqxWindow("close");

                if(result.CashOutPrint){
                    var CashOutPrintReceipt = $("#CashOutPrintReceipt").val();
                    var CashOutEmailReceipt = $("#CashOutEmailReceipt").val();
                    var CashOutEmailSetting = $("#CashOutEmail").val();

                    var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
                    var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
                    var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

                    if(CashOutPrintReceipt == 1){
                        PrinterCashOutStationCheck()
                        .then(function(){
                            if(CashOutEmailReceipt == 1 && CashOutEmailSetting == 1){

                                $.blockUI({ css: { 
                                    border: '2px solid #fff',
                                    padding: '15px', 
                                    backgroundColor: '#210e66', 
                                    '-webkit-border-radius': '10px', 
                                    '-moz-border-radius': '10px', 
                                    opacity: 1, 
                                    color: '#fff',
                                    fontSize: '20px' 
                                }, message: 'Sending email...' });
                                CashOutPDFCreator()
                                .then(function(emailmsgUnique, UserUnique){
                                    if(emailmsgUnique > 0){
                                        CashOutSendEmail(emailmsgUnique, UserUnique)
                                        .then(function(){
                                            posData.UnsetCashDrawerCashOut()
                                            .success(function(result3){
                                                LoadHeaderInfo();
                                                console.log("cashout1");
                                                // if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                                                    posData.CashOutClearCache();
                                                // }
                                                setTimeout($.unblockUI, 100); 
                                            })
                                        })
                                    }else{
                                        posData.UnsetCashDrawerCashOut()
                                        .success(function(result3){
                                            LoadHeaderInfo();
                                            console.log("cashout2");
                                            if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                                                posData.CashOutClearCache();
                                            }
                                            setTimeout($.unblockUI, 100); 
                                        })
                                    }
                                })

                            }else{
                                posData.UnsetCashDrawerCashOut()
                                .success(function(result3){
                                    LoadHeaderInfo();
                                    console.log("cashout3");
                                    if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                                        posData.CashOutClearCache();
                                    }
                                })
                            }
                        })
                    }else{
                        if(CashOutEmailReceipt == 1){
                            CashOutPDFCreator()
                            .then(function(emailmsgUnique, UserUnique){
                                CashOutSendEmail(emailmsgUnique, UserUnique)
                                .then(function(){
                                    posData.UnsetCashDrawerCashOut()
                                    .success(function(result3){
                                        LoadHeaderInfo();
                                        console.log("cashout4");
                                        if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                                            posData.CashOutClearCache();
                                        }
                                    })
                                })
                            })
                        }else{
                            posData.UnsetCashDrawerCashOut()
                            .success(function(result3){
                                LoadHeaderInfo();
                                console.log("cashout5");
                                if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                                    posData.CashOutClearCache();
                                }
                            })
                        }
                    }
                }else{
                    posData.UnsetCashDrawerCashOut()
                    .success(function(result3){
                    LoadHeaderInfo();
                    console.log("cashout6");
                    if(DrawerManagerState == false && rowdata.LocationUnique != $("#LocationUnique").val()){
                            posData.CashOutClearCache();
                        }
                    })
                }
            })

            return false;
        }


        var emailmsgUnique;
        var UserUnique;
        
        var rows = $("#datagridCashCount").jqxDataTable('getRows');
		var postdata ="cashtype=2";
		    postdata+="&StationCashierUnique="+ByStationCashierUnique;
		posData.SaveAmountCashOutStation(postdata)
		.success(function(result){
			if(result.success == true){
				//PrinterCheck();
            }
            //-->Close Cash Out Form
			dialogCashCountForm.close();
            $("#cashier_cashout_q").jqxWindow("close");

            if(result.CashOutPrint){
                var CashOutPrintReceipt = $("#CashOutPrintReceipt").val();
                var CashOutEmailReceipt = $("#CashOutEmailReceipt").val();
                var CashOutEmailSetting = $("#CashOutEmail").val();

                if(CashOutPrintReceipt == 1){
                    PrinterCashOutStationCheck()
                    .then(function(){
                        if(CashOutEmailReceipt == 1 && CashOutEmailSetting == 1){

                            $.blockUI({ css: { 
                                border: '2px solid #fff',
                                padding: '15px', 
                                backgroundColor: '#210e66', 
                                '-webkit-border-radius': '10px', 
                                '-moz-border-radius': '10px', 
                                opacity: 1, 
                                color: '#fff',
                                fontSize: '20px' 
                            }, message: 'Sending email...' });
                            CashOutPDFCreator()
                            .then(function(emailmsgUnique, UserUnique){
                                if(emailmsgUnique > 0){
                                    CashOutSendEmail(emailmsgUnique, UserUnique)
                                    .then(function(){
                                        posData.UnsetCashDrawerCashOut()
                                        .success(function(result3){
                                            LoadHeaderInfo();
                                            console.log("Cashout send email");
                                            posData.CashOutClearCache();
                                            setTimeout($.unblockUI, 100); 
                                        })
                                    })
                                }else{
                                    posData.UnsetCashDrawerCashOut()
                                    .success(function(result3){
                                        LoadHeaderInfo();
                                        console.log("unset cash drawer");
                                        posData.CashOutClearCache();
                                        setTimeout($.unblockUI, 100); 
                                    })
                                }
                            })

                        }else{
                            posData.UnsetCashDrawerCashOut()
                            .success(function(result3){
                                LoadHeaderInfo();
                                console.log("unset cash drawer2");
                                posData.CashOutClearCache();
                            })
                        }
                    })
                }else{
                    if(CashOutEmailReceipt == 1){
                        CashOutPDFCreator()
                        .then(function(emailmsgUnique, UserUnique){
                            CashOutSendEmail(emailmsgUnique, UserUnique)
                            .then(function(){
                                posData.UnsetCashDrawerCashOut()
                                .success(function(result3){
                                    LoadHeaderInfo();
                                    console.log("cash out send email and unset cash drawer");
                                    posData.CashOutClearCache();
                                })
                            })
                        })
                    }else{
                        posData.UnsetCashDrawerCashOut()
                        .success(function(result3){
                            LoadHeaderInfo();
                            console.log("unset cash drawer3");
                            posData.CashOutClearCache();
                        })
                    }
                }
            }else{
                posData.UnsetCashDrawerCashOut()
                .success(function(result3){
                   LoadHeaderInfo();
                   console.log("unset cash drawer4");
                   posData.CashOutClearCache();
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
            var postdata ="StationCashierUnique="+ByStationCashierUnique;
            posData.PrinterCashOutStationCheck(postdata)
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
                    height: '50%',
                    width: '100%',
                    title: '<button id="cashier_reports_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;Receipt Report | '+server,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: false,
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
        $("#ReceiptReportfunction").attr({"disabled": true}); 
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                FunctionButton = 'ReceiptReport';  
                NumpadPasscode('EnterReceiptReportPasscode')	
                .then(function(){
                    WindowPopupPasscode('Report Receipt | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);

                        setTimeout(function(){
                            $("#ReceiptReportfunction").attr({"disabled": false}); 
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
                var passcode = CRP.converted;//$("#number_field").val();
                var hashpasscode= CryptoJS.MD5(passcode);
                var postdata ="passcode="+hashpasscode;
                    postdata+="&FunctionButton=ReportsReceipt";
                // posData.ReceiptReportEnterPasscode(postdata)
                // .success(function(data){
                posData.RestrictionPasscode(postdata)
                .success(function(result2) {
                    // if(data.valid){
                    if (result2.success == false) { 
                        var msg = result2.msg;	
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }else{
                        if(result2.success == true && result2.login == true){
                            var UserUnique = result2.userid;//result2.info.Unique;
                            var UserName = result2.username;//result2.UserName;
                            
                            var CheckAttibute = window.localStorage.getItem('attributes');
                            console.log(CheckAttibute);
                            if(CheckAttibute == 'loaded'){
                                ReceiptReportView(UserName);
                                console.log(localStorageSpace());
                                
                            }else{
                                DailySalesColumns()
                                .then(function(){
                                    GiftCardColumns()
                                    .then(function(){
                                        StoreCreditColumns()
                                        .then(function(){
                                            PaymentsColumns()
                                            .then(function(){
                                                EmployeeSalesDetailColumns()
                                                .then(function(){
                                                    EmployeeDailySalesDetailColumns()
                                                    .then(function(){
                                                        DepositDailySalesColumns()
                                                        .then(function(){
                                                            DailyStoreEmployeeSalesColumns()
                                                            .then(function(){
                                                                console.log(localStorageSpace());
                                                                window.localStorage.setItem('attributes', 'loaded');
                                                                ReceiptReportView(UserName);
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        }else{
                            NumpadAlertOk('invalid_passcode', result2.msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
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
        // TipsByServerList();
        NumpadTipByServerReport()
        .then(function(){
            WindowTipByServer();
        })
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
				height: 480,
				minWidth: 450,
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
        var printmsg = "Printing receipt"+"<br/>";
		$.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: printmsg,
            baseZ: 99999,   
        }); 
        
        var postdata="cashtype=2";
            postdata+="&StationCashierUnique="+ByStationCashierUnique;
        posData.PrinterCheck(postdata)
        .success(function(result){
            if(result.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertOk('invalid_passcode', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
            setTimeout($.unblockUI, 100);
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
            theme: GridTheme,
            sortable: true,
            pageable: true,
            pageSize: ComputeDisplayRow,
            scrollbarsize: GridScrollBarSize,
            pagerMode: 'advance',
            altRows: true,
            showfilterrow: true,
            filterable: true,
            rowsheight: GridRowHeight,
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
            }else{
                $('#cashout_history').jqxGrid('clear');
            }
        })

        $scope.cashout_daterange_from_change = false;
        $scope.cashout_daterange_to_change = false;
    })

    var CashOutSearchBeforePrint = function(){
        var def = $.Deferred();
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
            def.resolve();
        })
        
        $scope.cashout_daterange_from_change = false;
        $scope.cashout_daterange_to_change = false;

        return def.promise();
    }
    /*
    |------------------------------------------------------------------
    | Cash Out Row Click
    |------------------------------------------------------------------
    */
    $(document).on("rowclick", "#cashout_history", function(event) {
        var row = event.args.rowindex;
        var datafield = event.args.datafield;
        var datarow = $(this).jqxGrid('getrowdata', row);
        $scope.cashout_daterange_from_change = false;
        scope.cashout_daterange_to_change = false;
    });

    $scope.cashout_daterange_from_change = false;
    $scope.cashout_daterange_to_change = false;
    $(document).on('change', '#cashout_daterange_from', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
        $scope.cashout_daterange_from_change = true;
    })

    $(document).on('change', '#cashout_daterange_to', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
        $scope.cashout_daterange_to_change = true;
    })

    /*
    |------------------------------------------------------------------
    | Cash Out Re Print Button
    |------------------------------------------------------------------
    */
    $(document).on("click", "#cashout_print", function(){
        if($scope.cashout_daterange_from_change == true || $scope.cashout_daterange_from_change == true){
            CashOutSearchBeforePrint()
            .then(function(){
                CashOutPrint();
            })
            return false;
        }

        var index   = $('#cashout_history').jqxGrid('selectedrowindex'); 
        var row = $("#cashout_history").jqxGrid('getrowdata', index);
        if(index >= 0 && row.Unique > 0){
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });

            var postdata ="LocationUnique="+row.LocationUnique;
                postdata+="&StationUnique="+row.StationUnique;
                postdata+="&UserUnique="+row.UserUnique;
                postdata+="&StationCashierUnique="+row.Unique;
                postdata+="&Station="+row.Station;
                postdata+="&PrintReceipt=5";
            posData.CashOutReportPrint(postdata)
            .success(function(data){
                if(data.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('cashout_report_print_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
                setTimeout($.unblockUI, 100); 
            })
        }else{
            var msg = "Please select Cash Out report first.";
            NumpadAlertOk('print_failed', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    })

    var CashOutPrint = function(){
        var index   = $('#cashout_history').jqxGrid('selectedrowindex'); 
        var row = $("#cashout_history").jqxGrid('getrowdata', index);
        
        if(index >= 0 && row.Unique > 0){
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });

            var postdata ="LocationUnique="+row.LocationUnique;
                postdata+="&StationUnique="+row.StationUnique;
                postdata+="&UserUnique="+row.UserUnique;
                postdata+="&StationCashierUnique="+row.Unique;
                postdata+="&Station="+row.Station;
                postdata+="&PrintReceipt=5";
            posData.CashOutReportPrint(postdata)
            .success(function(data){
                if(data.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('cashout_report_print_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
                setTimeout($.unblockUI, 100); 
            })
        }else{
            var msg = "Please select Cash Out report first.";
            NumpadAlertOk('print_failed', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
        }
    }

    /*
    |------------------------------------------------------------------
    | Cash Out Close Window
    |------------------------------------------------------------------
    */
    $(document).on('click', '#cashout_close', function(){
         $('#cash_out_report').jqxWindow('close');
    })

    $("#AkamaiPOSRefresh").click(function(){
        $.ajax({
            url : base_url + 'backoffice/cache/data',
            method: 'get',
            type: 'json',
            success: function(data){
                $window.location.href = '';
            }
        })
        
    })

    /*
    |------------------------------------------------------------------
    | Cash Out Denomination
    |------------------------------------------------------------------
    */
    /*
    $('#denomination').on('close', function(e){
        e.preventDefault();
        $("#denomination_container").remove();
    })
    */
    var populateWindowDenomination = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#denomination")
            /*
            $("#denomination").append('<div id="denomination_container" style="background: #144766; color:#EEE;"></div>');
            $("#denomination_container").html('');
            $('#denomination_container').append(
                '<div style="width:100%; padding-bottom:5px;" align="left">'+
                    '<button class="btn btn-danger btn-lg" id="DenominationClose">Close</button> '+
                '</div>'+
                '<div id="denomination_plugin"></div>'
            );
            */ 
            def.resolve();
        },100);
        return def.promise();
    }
    
    var WindowDenomination = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#denomination").jqxWindow({
                height: 620,
                width: 640,
                title: "Denomination",
                isModal: true,
                theme: 'darkblue',
                resizable: false,
                showCloseButton: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                position: {x: 6, y: 40}
            })
            $("#denomination").jqxWindow('open');
        },100);
        return def.promise();
    }

    var Denomination = function(){
        var def = $.Deferred();
        populateWindowDenomination()
        .then(function(){
            def.resolve();
        })
        return def.promise();
    }

    $(document).on('click', '.denomination', function(){
        var UniqueInfo = $(this).attr("id");
        var DenoStationCashOutUnique = UniqueInfo.split('=')[0];
        var DenoStationCashierUnique = UniqueInfo.split('=')[1];
        var DenoStationPaymentUnique = UniqueInfo.split('=')[2];
        Denomination()
        .then(function(){
            populateDenominationTable(DenoStationCashOutUnique, DenoStationCashierUnique, DenoStationPaymentUnique);
            WindowDenomination()
            .then(function(){
                
            })
        }) 
    })

    $(document).on('click', '#DenominationClose', function(e){
        e.preventDefault();
        $("#denomination").jqxWindow('close');
    })

    var Denomination_Grid = function(){
        var source = {
            datatype: "json",
            datafields: [
                { name: 'Unique', type: 'int'},
                { name: 'StationCashierUnique', type: 'int'},
                { name: 'DenominationIndex', type: 'string'},
                { name: 'DenominationVal', type: 'float'},
                { name: 'Name', type: 'string'},
                { name: 'Quantity', type: 'int'},
                { name: 'Extended', type: 'float'}
            ],
            localdata: {},
        };
        var cellbeginedit = function (row, datafield, columntype, value) {
            if (row == 11 || row == 12 || row == 13 || row == 14 || value === null || value === '') return false;
            //if (value === null || value === '') return false;
        }
        var cellsrenderer = function (row, column, value, defaultHtml, columnproperties) {
            if (row == 11 || row == 12 || row == 13 || row == 14) {
                var element = $(defaultHtml);
                element.css({'color':'#000', 'font-weight':'bolder'});
                return element[0].outerHTML;
            }
            return defaultHtml;
        }
        
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#denomination_plugin").jqxGrid({
            width: '100%',
            source: dataAdapter,
            pageable: false,
            autoheight: true,
            sortable: false,
            theme: GridTheme,
            altrows: true,
            enabletooltips: true,
            editable: true,
            showaggregates: false,
            filterable: true,
            showstatusbar: false,
            selectionmode: 'singlecell',
            columns: [
                { text: 'Unique', datafield: 'Unique', hidden: true },
                { text: 'SCU', datafield: 'StationCashierUnique', hidden: true },
                { text: 'DenominationIndex', datafield: 'DenominationIndex', hidden: true},
                { text: 'DenominationVal', datafield: 'DenominationVal', hidden: true},
                { text: '', datafield: 'Name', editable: false, align: 'left', cellsalign: 'left', width: '35%', cellsrenderer: cellsrenderer},
                { text: 'Quantity', datafield: 'Quantity', width: '30%', align: 'right', cellsalign: 'right', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, columntype: 'numberinput',
                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                        editor.jqxNumberInput({ digits: 8});
                    }
                },
                { text: 'Total', datafield: 'Extended', cellsAlign: 'right', align: 'right', width: '35%', cellsformat: 'd2', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, columntype: 'numberinput',
                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                        editor.jqxNumberInput({ digits: 8});
                    }
                }
            ]
        });
    }

    Denomination_Grid();

    var editrow = -1;
    var DenominationRowData = [];
    var DenominationExtended = 0;
    var DenominationQuantity = 0;
    var DenominationName = '';
    var LastSelectedRow = 0;
    var populateDenominationTable = function(id, scu, cpu){
        var SelectedField = '';
        var postdata ='StationCashierUnique='+scu;
            postdata+='&ConfigPaymentUnique='+cpu;
        posData.DenominationByStationCashierUniqueAndPaymentUnique(postdata)
        .success(function(data){
            var editedRows = new Array();
            var source = {
                datatype: "json",
                updaterow: function (rowid, rowdata, commit) {
                
                    editedRows = [];
                    var process = true;
                    // that function is called after each edit.
                    var rowindex = $("#denomination_plugin").jqxGrid('getrowboundindexbyid', rowid);          
                   // var row = $("#denomination_plugin").jqxGrid('getrowdata', rowid);
                    var NewQuantity = (rowdata.Extended / rowdata.DenominationVal);
                    var NewExtended = parseFloat(rowdata.Quantity * rowdata.DenominationVal).toFixed(2);
                    var VirtualKeyboard = $("#POSVirtualKeyboard").val();
                    //if(VirtualKeyboard == 0){
                        if(SelectedField == 'Extended'){
                            if(rowdata.Name != 'Other'){
                                if(rowdata.Extended >= 0){
                                    var result = parseFloat(rowdata.Extended / rowdata.DenominationVal).toFixed(2);
                                    result = (result - parseInt(result)) * rowdata.DenominationVal;
                                    $('#denomination_plugin').jqxGrid('selectcell', rowid + 1, 'Extended');
                                    if(rowdata.DenominationVal === 100 || rowdata.DenominationVal === 50 || rowdata.DenominationVal === 20 || rowdata.DenominationVal === 10 || rowdata.DenominationVal === 5 || rowdata.DenominationVal === 1){
                                        if(result > 0){
                                            var msg = 'Amount must be greater than or equal to 0 and multiple of '+rowdata.DenominationVal;
                                            NumpadAlertClose('denomination_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                            })
                                            process = false
                                        }
                                    }else{
                                        if(result > 0.00){
                                            var msg = 'Amount must be greater than or equal to 0 and multiple of '+rowdata.DenominationVal;
                                            NumpadAlertClose('denomination_error', msg)
                                            .then(function(){
                                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                            })
                                            process = false
                                        }
                                    }
                                }else{
                                    var msg = 'Amount must be greater than or equal to 0 and multiple of '+rowdata.DenominationVal;
                                    NumpadAlertClose('denomination_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    })
                                    process = false
                                }
                            }else{
                                var selection = $("#datagridCashCount").jqxDataTable('getSelection');
                                var GridData = selection[0]; 
                                var postdata ="counted="+ rowdata.Extended;
                                postdata+="&stccunique="+GridData.unique;
                                postdata+="&PaymentUnique="+GridData.PaymentUnique;
                                postdata+="&StationCashierUnique="+GridData.StationCashierUnique;
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
                        
                                    var postdata ="StationCashierUnique="+GridData.StationCashierUnique;
                                        postdata+="&PaymentMenu="+GridData.PaymentMenu;
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
                                                    localdata: result2.CashCounted 
                                                }
                                            }
                                            gridCashCountDeposit2(result2.CashDeposit);
                                        })
                                        
                                        var postdata ='StationCashierUnique='+GridData.StationCashierUnique;
                                            postdata+='&ConfigPaymentUnique='+GridData.PaymentUnique;
                                        posData.DenominationByStationCashierUniqueAndPaymentUnique(postdata)
                                        .success(function(data2){
                                            source.localdata = data2.Denomination;
                                            $('#denomination_plugin').jqxGrid('updatebounddata');
                        
                                            $('#datagridCashCount').jqxDataTable('selectRow', GridData.uid);
                                        })
                                    })
                                    
                                    $('#manual_counted').jqxWindow('close');
                                })
                                process = false;
                                commit(true);
                            }
                            //$("#denomination_plugin").jqxGrid('setcellvalue', rowid, "Quantity", NewQuantity);
                        }else if(SelectedField == 'Quantity'){
                            if(rowdata.Quantity >= 0){
                                $("#denomination_plugin").jqxGrid('setcellvalue', rowid, "Extended", NewExtended);

                                $('#denomination_plugin').jqxGrid('selectcell', rowid + 1, 'Quantity');
                                process = true;
                            }else{
                                var msg = 'Quantity must be greater than or equal to 0.';
                                NumpadAlertClose('denomination_error', msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                })
                                process = false;
                            }
                        }else{
                            //do nothing
                        }
                    //}
                    
                    editedRows.push({ index: rowindex, data: rowdata });
                    
                    if(process){
                        var postdata ="postdata="+JSON.stringify(editedRows);
                            postdata+="&ConfigPaymentUnique="+cpu;
                            postdata+="&StationCashOutUnique="+id;
                        posData.UpdateDenomination(postdata)
                        .success(function(data1){
                            LastSelectedRow = $('#datagridCashCount').jqxDataTable('getSelection');

                            var postdata ='StationCashierUnique='+rowdata.StationCashierUnique;
                                postdata+='&ConfigPaymentUnique='+cpu;
                            posData.DenominationByStationCashierUniqueAndPaymentUnique(postdata)
                            .success(function(data2){
                                source.localdata = data2.Denomination;
                                $('#denomination_plugin').jqxGrid('updatebounddata');

                                var postdata ="StationCashierUnique="+rowdata.StationCashierUnique;
                                    postdata+="&PaymentMenu="+$scope.PaymentMenu;
                                $http({
                                    method: 'POST',
                                    data: postdata,
                                    url: base_url + "pos/cashier/cash-count/display",
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                }).success(function (data3) {
                                    $scope.gridCashCount = {
                                        source: {
                                            localdata: data3
                                        }
                                    }

                                    $http({
                                        method: 'get',
                                        url: base_url+'pos/cash-count/totals'
                                    }).success(function(result2){
                                        $scope.gridCashOutTotals = {
                                            source: {
                                                localdata: result2.CashCounted
                                            }
                                        }
                                        $('#datagridCashCount').jqxDataTable('selectRow', LastSelectedRow[0].uid);
                                        gridCashCountDeposit2(result2.CashDeposit);
                                    })
                                })
                            })
                        })
                        commit(true);
                    }else{
                        commit(false);
                    }
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    
                },
                datafields: [
                    { name: 'Unique', type: 'int'},
                    { name: 'StationCashierUnique', type: 'int'},
                    { name: 'DenominationIndex', type: 'string'},
                    { name: 'DenominationVal', type: 'float'},
                    { name: 'Name', type: 'string'},
                    { name: 'Quantity', type: 'int'},
                    { name: 'Extended', type: 'float'}
                ],
                localdata: data.Denomination
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#denomination_plugin").jqxGrid({
                source: dataAdapter
            })

            var DenominationRowId = '';
            $("#denomination_plugin").bind('rowselect', function (event) {
                var index = event.args.rowindex;
                var datafield = event.args.datafield;
                var row = $(this).jqxGrid('getrowdata', index);
                editrow = index;
                //console.log("cellclick "+editrow);
                DenominationQuantity = row.Quantity;
                DenominationExtended = row.DenominationVal;
                DenominationName = row.Name;
                DenominationRowData = [];
                DenominationRowId = 'row'+index+'denomination_plugin';
                DenominationRowData = {
                    Unique: row.Unique,
                    StationCashierUnique: row.StationCashierUnique,
                    DenominationIndex: row.DenominationIndex,
                };
            });

            $('#denomination_plugin').on('cellclick', function (event) {
                var datafield = event.args.datafield;
                var cellvalue = args.value;
                var columnindex = args.columnindex;
                var rowBoundIndex = args.rowindex;
                SelectedField = datafield;
                if(rowBoundIndex == 11 || rowBoundIndex == 12 || rowBoundIndex == 13){
                    return false;
                }else{
                    /*
                    var POSVirtualKeyboard = $("#POSVirtualKeyboard").val();
                    if(POSVirtualKeyboard == 1){
                        setTimeout(function(){
                            if(datafield == 'Quantity' && cellvalue != null){
                                NumpadDenominationQty(DenominationName)
                                .then(function(){
                                    WindowNumpadDenominationQty()
                                    .then(function(){
                                        $("#cashout_denomination_qty_field").jqxNumberInput('focus');
                                        setTimeout(function(){
                                            $("#cashout_denomination_qty_field").val(cellvalue);
                                            var input = $('#cashout_denomination_qty_field input')[0];
                                            if('selectionStart' in input) {
                                                input.setSelectionRange(0, 0);
                                            }else{
                                                var range = input.createTextRange();
                                                range.collapse(true);
                                                range.moveEnd('character', 0);
                                                range.moveStart('character', 0);
                                                range.select();
                                            }
                                            $("#cashout_denomination_qty_field input").select();
                                        },100);
                                    })
                                })
                            }else if(datafield == 'Extended' && cellvalue != null){
                                if(DenominationName != 'Other'){
                                    NumpadDenominationAmount(DenominationExtended)
                                    .then(function(){
                                        WindowNumpadDenominationAmount()
                                        .then(function(){
                                            $("#cashout_denomination_amount_field").jqxNumberInput('focus');
                                            setTimeout(function(){
                                                $("#cashout_denomination_amount_field").val(cellvalue);
                                                var input = $('#cashout_denomination_amount_field input')[0];
                                                if('selectionStart' in input) {
                                                    input.setSelectionRange(0, 0);
                                                }else{
                                                    var range = input.createTextRange();
                                                    range.collapse(true);
                                                    range.moveEnd('character', 0);
                                                    range.moveStart('character', 0);
                                                    range.select();
                                                }
                                                $("#cashout_denomination_amount_field input").select();
                                            },100);
                                        })
                                    })
                                }else{
                                    NumpadCounted('denomination_counted')
                                    .then(function(){
                                        WindowNumpadCounted()
                                        .then(function(){
                                            $("#cashout_manual_entry_field").jqxNumberInput('focus');
                                            setTimeout(function(){
                                                $("#cashout_manual_entry_field").val(cellvalue);
                                                var input = $('#cashout_manual_entry_field input')[0];
                                                if('selectionStart' in input) {
                                                    input.setSelectionRange(0, 0);
                                                }else{
                                                    var range = input.createTextRange();
                                                    range.collapse(true);
                                                    range.moveEnd('character', 0);
                                                    range.moveStart('character', 0);
                                                    range.select();
                                                }
                                                $("#cashout_manual_entry_field input").select();
                                            },100);
                                        })
                                    })
                                }
                            }
                        },200);
                    }
                    */
                }
            })

            $("#denomination_plugin").on('cellbeginedit', function (event) {
                var args = event.args;
                $("#cellbegineditevent").text("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            });
            $("#denomination_plugin").on('cellendedit', function (event) {
                var args = event.args;
                $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            });
            
        })
    }

    /*
    |------------------------------------------------------------------
    | Cash Out Counted Manual Entry
    |------------------------------------------------------------------
    */
    $("#manual_counted").on('close', function(e){
        e.preventDefault();
        $("#manual_counted_container").html('');
        myNumber = '';
    })
    var populateNumpadCounted = function(form){
        var def = $.Deferred();
        setTimeout(function(){
            $("#manual_counted").append('<div id="manual_counted_container" style="background: #144766; color:#EEE;"></div>');
            $("#manual_counted_container").html('');
            $("#manual_counted_container").append('<h4 style="text-align:center;">Counted</h4>');
            $("#manual_counted_container").append(
                '<form id="'+form+'">'+
                    '<div id="cashout_manual_entry_field"></div>'+
                    '<div id="cashout_manual_entry_keyboard"></div>'+
                    '<input type="hidden" id="payment_unique" />'+
                '</form>'
            );
            $("#cashout_manual_entry_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val()})
            $('#cashout_manual_entry_field').on('change', function(event){
                var value = event.args.value;
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                myNumber = value;
            }); 
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowNumpadCounted = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#manual_counted").jqxWindow({
				title: "Counted",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#manual_counted').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var NumpadCounted = function(form){
        var def = $.Deferred();
		setTimeout(function(){
            populateNumpadCounted(form)
            .then(function(){
                $('#cashout_manual_entry_keyboard').numeric_numpad({
                    layout: "numeric",
                    input: $('#cashout_manual_entry_field')
                });
                def.resolve();
            })
        },100);
        return def.promise();
    }

    $(document).on('click', '#ManualEntry', function(e){
        e.preventDefault();
        NumpadCounted()
        .then(function(){
            WindowNumpadCounted()
            .then(function(){
                $("#cashout_manual_entry_field").jqxNumberInput('focus');
				setTimeout(function(){
					var input = $('#cashout_manual_entry_field input')[0];
					if('selectionStart' in input) {
						input.setSelectionRange(0, 0);
					}else{
						var range = input.createTextRange();
						range.collapse(true);
						range.moveEnd('character', 0);
						range.moveStart('character', 0);
						range.select();
					}
					$("#cashout_manual_entry_field input").select();
                },100);
                $("#denomination").jqxWindow('close');
            })
        })
    })
    
    $(document).on('submit', '#denomination_counted', function(e){
        e.preventDefault();
        var enteredAmount = $("#cashout_manual_entry_field input").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
        }
        var selection = $("#datagridCashCount").jqxDataTable('getSelection');
        var GridData = selection[0]; 
        var postdata ="counted="+ enteredAmount;
            postdata+="&stccunique="+GridData.unique;
            postdata+="&PaymentUnique="+GridData.PaymentUnique;
            postdata+="&StationCashierUnique="+GridData.StationCashierUnique;
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

            var postdata ="StationCashierUnique="+GridData.StationCashierUnique;
			    postdata+="&PaymentMenu="+GridData.PaymentUnique;
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
							localdata: result2.CashCounted 
						}
                    }
                    //gridCashCountDepositData(result2.CashDeposit);
                    console.log("part9");
                    gridCashCountDeposit2(result2.CashDeposit);
                })
                
                var postdata ='StationCashierUnique='+GridData.StationCashierUnique;
                    postdata+='&ConfigPaymentUnique='+GridData.PaymentUnique;
                posData.DenominationByStationCashierUniqueAndPaymentUnique(postdata)
                .success(function(data2){
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int'},
                            { name: 'StationCashierUnique', type: 'int'},
                            { name: 'DenominationIndex', type: 'string'},
                            { name: 'DenominationVal', type: 'float'},
                            { name: 'Name', type: 'string'},
                            { name: 'Quantity', type: 'int'},
                            { name: 'Extended', type: 'float'}
                        ],
                        localdata: data2.Denomination
                    }
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#denomination_plugin").jqxGrid({
                        source: dataAdapter
                    });

                    $('#datagridCashCount').jqxDataTable('selectRow', GridData.uid);
                })
            })
            
            $('#manual_counted').jqxWindow('close');
        })
    })

    $(document).on('click', '.manual_numpad', function(e){
        e.preventDefault();
        NumpadCounted('cashout_counted')
        .then(function(){
            WindowNumpadCounted()
            .then(function(){
                $("#cashout_manual_entry_field").jqxNumberInput('focus');
				setTimeout(function(){
					var input = $('#cashout_manual_entry_field input')[0];
					if('selectionStart' in input) {
						input.setSelectionRange(0, 0);
					}else{
						var range = input.createTextRange();
						range.collapse(true);
						range.moveEnd('character', 0);
						range.moveStart('character', 0);
						range.select();
					}
					$("#cashout_manual_entry_field input").select();
                },100);
                $("#denomination").jqxWindow('close');
            })
        })
    })

    ShouldChange = false;
    $(document).on('submit', '#cashout_counted', function(e){
        e.preventDefault();
        var enteredAmount = $("#cashout_manual_entry_field input").val();
		if(enteredAmount == ''){
			enteredAmount = 0.00;
        }
        var selection = $("#datagridCashCount").jqxDataTable('getSelection');
        var GridData = selection[0]; 
        var postdata ="counted="+ enteredAmount;
            postdata+="&stccunique="+GridData.unique;
            postdata+="&PaymentUnique="+GridData.PaymentUnique;
            postdata+="&StationCashierUnique="+GridData.StationCashierUnique;
            postdata+="&PaymentMenu="+GridData.PaymentMenu;
        posData.UpdateCashCounted(postdata)
		.success(function (result) {
            var postdata ="StationCashierUnique="+GridData.StationCashierUnique;
			    postdata+="&PaymentMenu="+GridData.PaymentMenu;
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
                    //console.log("here",result2);
					$scope.gridCashOutTotals = {
						source: {
							localdata: result2.CashCounted 
						}
                    }
                    //gridCashCountDepositData(result2.CashDeposit);
                    gridCashCountDeposit2(result2.CashDeposit);

                    if(DrawerManagerReconcile){
                        posData.GetManagerDrawerLocationList()
                        .success(function(data){
                            if( $("#drawer_sessions").length > 0 ){
                                DrawerManagerGrid(data);
                            }
                        })
                    }
                })
                

                $('#datagridCashCount').jqxDataTable('selectRow', GridData.uid);
            })
            $('#manual_counted').jqxWindow('close');
        })
    })

    /*
    |------------------------------------------------------------------
    | Cash Out Denomination Quantity Manual Entry
    |------------------------------------------------------------------
    */
    $('#denomination_qty_numpad').on('close', function(e){
        e.preventDefault();
        $("#denomination_qty_numpad_container").html('');
        myNumber = '';
    })
    var populateDenominationNumpadQty = function(denomination){
        var def = $.Deferred();
        setTimeout(function(){
            $("#denomination_qty_numpad").append('<div id="denomination_qty_numpad_container" style="background: #144766; color:#EEE;"></div>');
            $("#denomination_qty_numpad_container").html('');
            $("#denomination_qty_numpad_container").append('<h4 style="text-align:center;">Enter Number of '+denomination+'</h4>');
            $("#denomination_qty_numpad_container").append(
                '<form id="cashout_denomination_qty">'+
                    '<div id="cashout_denomination_qty_field"></div>'+
                    '<div id="cashout_denomination_qty_keyboard"></div>'+
                    '<input type="hidden" id="denomination_qty_numpad_val" />'+
                '</form>'
            );
            $("#cashout_denomination_qty_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsQuantity").val()})
            $('#cashout_denomination_qty_field').on('change', function(event){
                var value = event.args.value;
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                myNumber = value;
            }); 
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowNumpadDenominationQty = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#denomination_qty_numpad").jqxWindow({
				title: "Total Quantity",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#denomination_qty_numpad').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var NumpadDenominationQty = function(denomination){
        var def = $.Deferred();
		setTimeout(function(){
            populateDenominationNumpadQty(denomination)
            .then(function(){
                $('#cashout_denomination_qty_keyboard').numeric_numpad({
                    layout: "numeric",
                    input: $('#cashout_denomination_qty_field')
                });
                def.resolve();
            })
        },100);
        return def.promise();
    }

    /*
    |------------------------------------------------------------------
    | Cash Out Denomination Amount Manual Entry
    |------------------------------------------------------------------
    */
    $('#denomination_amount_numpad').on('close', function(e){
        e.preventDefault();
        $("#denomination_amount_numpad_container").html('');
        myNumber = '';
    })
    var populateDenominationNumpadAmount = function(denomination){
        var def = $.Deferred();
        setTimeout(function(){
            $("#denomination_amount_numpad").append('<div id="denomination_amount_numpad_container" style="background: #144766; color:#EEE;"></div>');
            $("#denomination_amount_numpad_container").html('');
            $("#denomination_amount_numpad_container").append('<h4 style="text-align:center;">Please enter multiple of '+denomination+'</h4>');
            $("#denomination_amount_numpad_container").append(
                '<form id="cashout_denomination_amount">'+
                    '<div id="cashout_denomination_amount_field"></div>'+
                    '<div id="cashout_denomination_amount_keyboard"></div>'+
                    '<input type="hidden" id="denomination_amount_numpad_val" />'+
                '</form>'
            );
            $("#cashout_denomination_amount_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val()})
            $('#cashout_denomination_amount_field').on('change', function(event){
                var value = event.args.value;
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                myNumber = value;
            }); 
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowNumpadDenominationAmount = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#denomination_amount_numpad").jqxWindow({
				title: "Total Amount",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#denomination_amount_numpad').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var NumpadDenominationAmount = function(denomination){
        var def = $.Deferred();
		setTimeout(function(){
            populateDenominationNumpadAmount(denomination)
            .then(function(){
                $('#cashout_denomination_amount_keyboard').numeric_numpad({
                    layout: "numeric",
                    input: $('#cashout_denomination_amount_field')
                });
                def.resolve();
            })
        },100);
        return def.promise();
    }

    $(document).on('submit', '#cashout_denomination_qty', function(e){
        e.preventDefault();
        var DenominationQtyVal = $("#cashout_denomination_qty_field input").val();
        var DenominationNewExtended = (DenominationQtyVal * DenominationExtended);
        
        if(DenominationQtyVal >= 0){
            $("#denomination_plugin").jqxGrid('setcellvalue', editrow, "Extended", DenominationNewExtended);
        }else{
            var msg = 'Quantity must be greater than or equal to 0.';
            NumpadAlertClose('denomination_error', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
        }
        
        $("#denomination_qty_numpad").jqxWindow('close');
    })

    $(document).on('submit', '#cashout_denomination_amount', function(e){
        e.preventDefault();
        var DenominationAmountVal = $("#cashout_denomination_amount_field input").val();
        var DenominationNewExtended1 = (DenominationAmountVal / DenominationExtended);
        var DenominationNewExtended2 = (DenominationExtended * DenominationNewExtended1);
        var result = parseFloat(DenominationAmountVal / DenominationExtended).toFixed(2);
            result = (result - parseInt(result)) * DenominationExtended;
        
        if(DenominationAmountVal >= 0){    
            if(DenominationExtended === 100 || DenominationExtended === 50 || DenominationExtended === 20 || DenominationExtended === 10 || DenominationExtended === 5 || DenominationExtended === 1){
                if(result > 0){
                    var msg = 'Amount must be greater than or equal to 0 and multiple of '+DenominationExtended;
                    NumpadAlertClose('denomination_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    })   
                }else{
                    $("#denomination_plugin").jqxGrid('setcellvalue', editrow, "Extended", DenominationNewExtended2);
                }
            }else{
                if(result > 0.00){
                    var msg = 'Amount must be greater than or equal to 0 and multiple of '+DenominationExtended;
                    NumpadAlertClose('denomination_error', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    })
                }else{
                    $("#denomination_plugin").jqxGrid('setcellvalue', editrow, "Extended", DenominationNewExtended2);
                }
            }
        }else{
            var msg = 'Amount must be greater than or equal to 0 and multiple of '+DenominationExtended;
            NumpadAlertClose('denomination_error', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
        }
        $("#denomination_amount_numpad").jqxWindow('close');
    })

    //-->Denomination Print Receipt
    $(document).on('click', '#DenominationPrint', function(e){
        e.preventDefault();
        var selection = $("#datagridCashCount").jqxDataTable('getSelection');
        var GridData = selection[0]; 
        var DenomPrintSCU = GridData.StationCashierUnique;
        var postdata ="StationCashierUnique="+DenomPrintSCU;
        posData.DenominationPrintReceipt(postdata);
    })

    
    var LoadMenuListSetting = () => {
        posData.ThemeList()
        .success(function(data){
            $("#menu_load_list").html(
                data.html
            );

            var MenuID = '';
            $.each($("input[type=radio][name=theme_group_radio_button]"), function(index, val){
                MenuDataId = $(this).attr('id');
                MenuID = "MenuSetting"+MenuDataId.split('=')[0];
                $(this).closest("label").attr('id', MenuID); 

                $("#"+MenuID).dblclick(function(){
                    $("#menu_settings").trigger('click');
                })
            })
        })
    }

    /*
    |------------------------------------------------------------------
    | Theme Menu List
    |------------------------------------------------------------------
    */
    var populateThemeMenu = function(){
        var def = $.Deferred();
        $("body").append(
            '<div id="theme_list" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="theme_list_container" style="background: #144766; color:#EEE;">'+
                    '<div id="setting_tabs">'+
                        '<ul>'+
                            '<li>Menu</li>'+
                            '<li>Settings</li>'+
                        '</ul>'+
                        '<div id="tab1">'+
                            '<div style="position: absolute; left:600px; top: 50px;">'+
                                '<a id="menu_settings" class="glyphicon glyphicon-cog" style="font-size: 25px !important; text-decoration:none; cursor: pointer; color: #000;"></a>'+
                            '</div>'+
                            '<div id="menu_load_list"></div>'+
                        '</div>'+
                        '<div id="tab2">'+
                            '<div id="station_setting_list"></div>'+
                        '</div>'+
                    '</div>'+
                    
                    '<form id="theme_select">'+
                        '<input type="hidden" id="theme_field" />'+
                        '<div id="keyboard_theme_selection"></div>'+
                    '</form>'+
                '</div>'+
            '</div>'
        );

        $('#setting_tabs').jqxTabs({ width: '100%', height: 480, position: 'top', theme: 'darkblue'});

        var ThemeSettingHeight = $("#setting_tabs").jqxTabs('height');
        var UseHeight = (ThemeSettingHeight - 50);

        var source = {
            datatype: 'json',
            datafields: [
                {name: 'Unique', type: 'int'},
                {name: 'Setting', type: 'string'},
                {name: 'Value', type: 'string'},
                {name: 'Source', type: 'string'},
                {name: 'FieldType', type: 'string'}
            ],
            localdata: LocationSettings
        }

        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var recordi = dataAdapter.records;
        
        $("#station_setting_list").jqxGrid({
            width: '100%',
            height: UseHeight,
            source: dataAdapter,
            selectionmode: 'singlecell',
            editable: true,
            columnsresize: true,
            altrows: true,
            theme: GridTheme,
            sortable: true,
            scrollbarsize: 25,
            rowsheight: 50,
            columns: [
                {text: 'Unique', datafield: 'Unique', hidden: true},
                {text: 'Setting', datafield: 'Setting', width: '250px', editable: false },
                {text: 'Value', datafield: 'Value', width: '220px', columntype: 'dropdownlist',
                    createeditor: function (row, column, editor) {

                        editor.jqxDropDownList({ source: recordi[row].Source, displayMember: "Value", valueMember: "Unique" });

                        editor.on('change', function(event){
                            var item = event.args.item;
                            var postdata = "setting="+recordi[row].Setting;
                                postdata+= "&value="+item.value;
                                
                            $.ajax({
                                url: base_url + 'pos/cashier/update-settings',
                                type: 'post',
                                dataType: 'json',
                                data: postdata,
                                success: function(data){
                                    
                                }
                            })
                        })
                    }
                }
            ]
        })

        setTimeout(function(){
            def.resolve();
        },100)

        return def.promise();
    }

    var WindowThemeMenu = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#theme_list").jqxWindow({
                width: 650,
                height: 600,
				title: "Station Settings",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 20
            });
            
            $('#theme_list').jqxWindow('open');
            
            $("#theme_list").on('close', function(e){
                e.preventDefault();
                $("#setting_tabs").jqxTabs('destroy');
                $("#theme_list").remove();
            })

			def.resolve();	
		},100);
		return def.promise();
    }

    var NumpadThemeMenu = function(){
        var def = $.Deferred();
		setTimeout(function(){
            populateThemeMenu()
            .then(function(){
                $('#keyboard_theme_selection').hdkeyboard({
                    layout: "custom12",
                    input: $('#theme_field')
                });
                def.resolve();
            })
        },100);
        return def.promise();
    }

    $("#theme_menu").click(function(){
        NumpadPasscode("MenuSecurity")
        .then(function(){
            WindowPopupPasscode('Cashier Settings | Enter Passcode')
            .then(function(){
                setTimeout(function(){
                    $("#number_field").focus();
                },100)
            })  
        })
    })


    $(document).on('click', '#theme_select .button_proceed', function(e){
        e.preventDefault();
        var ThemeInfo = $('input[type=radio][name=theme_group_radio_button]:checked').attr('id');
        var ThemeId = ThemeInfo.split('=')[0];
        var ThemeCashierMenu = ThemeInfo.split('=')[1];
        var PaymentMenu = ThemeInfo.split('=')[14];
        var ThemePOSMenu = ThemeInfo.split('=')[2];
        var postdata ="ThemeId="+ThemeId;
            postdata+="&CashierMenu="+ThemeCashierMenu;
            postdata+="&POSMenu="+ThemePOSMenu;
            postdata+="&PaymentMenu="+PaymentMenu;
        posData.UpdateTheme(postdata)
        .success(function(data){
            if(data.success){
                $('#theme_list').jqxWindow('close');
                $window.location = base_url + 'pos/cashier';
            }
        })
    })

    $(document).on('click', '#theme_select .button_cancel', function(e){
        e.preventDefault();
        $('#theme_list').jqxWindow('close');
        if(setting_changes){
            $window.location = base_url + 'pos/cashier';
        }
    })

    var PopulateMenuSettingPopulate = () => {
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append(
                '<div id="menu_setting" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                    '<div id="menu_setting_container" style="background: #144766; color:#EEE; margin:0; padding:0;">'+
                        '<form id="menu_setting_form" class="form-horizontal" style="padding:5px; overflow:hidden;">'+
                            '<div style="padding: 5px;" id="menu_setting_function">'+
                                '<button type="button" disabled id="menu_setting_save" class="btn btn-primary btn-lg" style="margin:3px;">Save</button>'+
                                '<button type="button" id="menu_setting_cancel" class="btn btn-danger btn-lg" style="margin:3px;">Close</button>'+
                            '</div>'+
                            '<div style="padding: 5px; display:none;" id="menu_setting_ask_action">'+
                                '<button type="button" id="menu_setting_save_yes" class="btn btn-primary btn-lg" style="margin:3px;">Yes</button>'+
                                '<button type="button" id="menu_setting_save_no" class="btn btn-danger btn-lg" style="margin:3px;">No</button>'+
                                '<span style="font-size: 16px;">Would you like to save changes?</span>'+
                            '</div>'+
                            '<br><br>'+
                            '<input type="hidden" id="menu_pos_payment_menu" />'+
                            '<div class="form-group">'+
                                '<label for="text" class="control-label col-xs-3">Menu Name</label>'+
                                '<div class="col-xs-5">'+
                                    '<input id="menu_name" name="text" type="text" class="form-control">'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="text1" class="control-label col-xs-3">Description</label>'+
                                '<div class="col-xs-5">'+
                                    '<input id="menu_description" type="text" class="form-control">'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">POS Menu</label>'+
                                '<div class="col-xs-5">'+
                                    '<div id="menu_pos_menu"></div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Payment Menu</label>'+
                                '<div class="col-xs-5">'+
                                    '<div id="menu_pos_paymentmenu"></div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Grid Theme</label>'+
                                '<div class="col-xs-9">'+
                                    '<div id="menu_grid_theme" style="float:left;"></div>'+
                                    '&nbsp;&nbsp;<button type="button" class="btn btn-primary" id="menu_setting_default">Default</button>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Grid header</label>'+
                                '<div class="col-xs-9">'+
                                    '<div id="menu_grid_header_font_style" style="float:left;"></div>'+
                                    '<div style="float:left; padding: 5px;">Size</div>'+
                                    '<div id="menu_grid_header_font_size" style="float:left;"></div>'+
                                    '<div style="float:left; padding: 5px;">Color</div>'+
                                    '<div style="float: left;" id="dropDownButton1">'+
                                        '<div style="padding: 3px;">'+
                                            '<div id="menu_grid_header_font_color"></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Grid content</label>'+
                                '<div class="col-xs-9">'+
                                    '<div id="menu_grid_font_style" style="float:left;"></div>'+
                                    '<div style="float:left; padding: 5px;">Size</div>'+
                                    '<div id="menu_grid_font_size" style="float:left;"></div>'+
                                    '<div style="float:left; padding: 5px;">Color</div>'+
                                    '<div style="margin: 3px; float: left;" id="dropDownButton2">'+
                                        '<div style="padding: 3px;">'+
                                            '<div id="menu_grid_content_font_color"></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Grid highlight color</label>'+
                                '<div class="col-xs-9">'+
                                    '<div style="float: left;" id="dropDownButton3">'+
                                        '<div style="padding: 3px;">'+
                                            '<div id="menu_grid_highlight_color"></div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div style="float:left; padding: 5px;">Scrollbar Size</div>'+
                                    '<div id="menu_scrollbar_size"></div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="select" class="control-label col-xs-3">Grid hover color</label>'+
                                '<div class="col-xs-9">'+
                                    '<div style="float: left;" id="dropDownButton4">'+
                                        '<div style="padding: 3px;">'+
                                            '<div id="menu_grid_hover_color"></div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div style="float:left; padding: 5px;">Scrollbar Color</div>'+
                                    '<div style="padding: 3px;">'+
                                        '<div style="float: left;" id="dropDownButton5">'+
                                            '<div id="menu_scrollbar_color"></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<input type="hidden" id="MenuId" />'+
                        '</form>'+
                    '</div>'+
                '</div>'
            );

            $("#menu_setting_default").jqxButton({ width: 80, height: 30 });
            
            // POS Menu List
            var POSMenuSource = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'MenuName' }
                ],
                localdata: pos_menu_list
            };

            var POSMenudataAdapter = new $.jqx.dataAdapter(POSMenuSource);
            $("#menu_pos_menu").jqxComboBox({ source: POSMenudataAdapter, displayMember: "MenuName", valueMember: "Unique", width: 200, height: 30,
                renderer: function (index, label, value) {
                    var datarecord = value + ' | ' + label;
                    return datarecord;
                }
            });

            // Payment Menu
            var PaymentMenuSoruce = {
                datatype: "json",
                datafields: [
                    {name: 'Unique'},
                    {name: 'Name'}
                ],
                localdata: PaymentMenuList
            }

            var PaymentMenudataAdapter = new $.jqx.dataAdapter(PaymentMenuSoruce);
            $("#menu_pos_paymentmenu").jqxComboBox({ source: PaymentMenudataAdapter, displayMember: "Name", valueMember: "Unique", width: 200, height: 30,
                renderer: function (index, label, value) {
                    var datarecord = value + ' | ' + label;
                    return datarecord;
                }
            });
            $("#menu_pos_paymentmenu").val(PaymentMenuDefault);
            $("#menu_pos_paymentmenu").on('select', function(){
                $("#menu_setting_save").attr('disabled', false);
            })

            // Grid Theme List
            var GridThemeSource = {
                datatype: "json",
                datafields: [
                    {name: 'theme'},
                    {name: 'label'}
                ],
                localdata: grid_theme_list
            }
            var MenuGridThemeAdapter = new $.jqx.dataAdapter(GridThemeSource);
            $("#menu_grid_theme").jqxComboBox({source: MenuGridThemeAdapter, displayMember: "label", valueMember: "theme", width: 200, height: 30});
            
            // Grid header font size list
            var GridFontSizesource = {
                datatype: "json",
                datafields: [
                    {name: 'size', type: 'string'},
                    {name: 'label', type: 'string'}
                ],
                localdata: grid_font_size_list
            };
            var GridFontdataAdapter = new $.jqx.dataAdapter(GridFontSizesource);
            $("#menu_grid_header_font_size").jqxComboBox({source: GridFontdataAdapter, displayMember: "label", valueMember: "size", width: 50, height: 30});

            // Grid header font style
            var GridFontStylesource = {
                datatype: "json",
                datafields: [
                    {name: 'style', type : 'string'},
                    {name: 'label', type : 'string'}
                ],
                localdata: grid_font_family_list
            }
            var GridFontStyledataAdapter = new $.jqx.dataAdapter(GridFontStylesource);
            $("#menu_grid_header_font_style").jqxComboBox({source: GridFontStyledataAdapter, displayMember: "style", valueMember: "label", width: 150, height: 30});

            // Grid font size list
            var GridFontSizesource = {
                datatype: "json",
                datafields: [
                    {name: 'size', type: 'string'},
                    {name: 'label', type: 'string'}
                ],
                localdata: grid_font_size_list
            };
            var GridFontdataAdapter = new $.jqx.dataAdapter(GridFontSizesource);
            $("#menu_grid_font_size").jqxComboBox({source: GridFontdataAdapter, displayMember: "label", valueMember: "size", width: 50, height: 30});

            // Grid font style
            var GridFontStylesource = {
                datatype: "json",
                datafields: [
                    {name: 'style', type: 'string'},
                    {name: 'label', type: 'string'}
                ],
                localdata: grid_font_family_list
            }
            var GridFontStyledataAdapter = new $.jqx.dataAdapter(GridFontStylesource);
            $("#menu_grid_font_style").jqxComboBox({source: GridFontStyledataAdapter, displayMember: "style", valueMember: "label", width: 150, height: 30});
            $("#menu_grid_font_style").on('select', function(event){
                if (event.args) {
                    var item = event.args.item;
                    if (item) {
                        var valueelement = $("<div></div>");
                        valueelement.text("Value: " + item.value);
                        var labelelement = $("<div></div>");
                        labelelement.text("Label: " + item.label);
                    }
                }
            })

             // Grid scrollbar size source
             var grid_scrollbarsize_source = {
                datatype: "json",
                datafields: [
                    {name: 'size', type: 'string'},
                    {name: 'label', type: 'string'}
                ],
                localdata: grid_scrollbar_size
            };
            var GridScrollbarSizedataAdapter = new $.jqx.dataAdapter(grid_scrollbarsize_source);
            
            $("#menu_scrollbar_size").jqxComboBox({ source: GridScrollbarSizedataAdapter, displayMember: "size", valueMember: "label", width: 50, height: 30});
  
            $("#menu_grid_header_font_color").on('colorchange', function (event) {
                $("#dropDownButton1").jqxDropDownButton('setContent', getTextElementByColor(event.args.color));
                $("#menu_setting_save").prop("disabled", false);
            });

            $("#dropDownButton1").jqxDropDownButton({ width: 150, height: 22});
            $("#dropDownButton1").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: "DC143C" })));

            $("#menu_grid_header_font_color").jqxColorPicker({ color: "DC143C", colorMode: 'hue', width: 220, height: 220});
            
            $("#dropDownButton2").jqxDropDownButton({ width: 150, height: 22});
            $("#dropDownButton2").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));
            
            $("#menu_grid_content_font_color").on('colorchange', function (event) {
                $("#dropDownButton2").jqxDropDownButton('setContent', getTextElementByColor(event.args.color));
                $("#menu_setting_save").prop("disabled", false);
            });
            
            $("#menu_grid_content_font_color").jqxColorPicker({ color: "DC143C", colorMode: 'hue', width: 220, height: 220});

            $("#dropDownButton3").jqxDropDownButton({ width: 150, height: 22});
            $("#dropDownButton3").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));

            $("#menu_grid_highlight_color").on('colorchange', function (event) {
                $("#dropDownButton3").jqxDropDownButton('setContent', getTextElementByColor(event.args.color));
                $("#menu_setting_save").prop("disabled", false);
            });

            $("#menu_grid_highlight_color").jqxColorPicker({ color: "DC143C", colorMode: 'hue', width: 220, height: 220});

            $("#dropDownButton4").jqxDropDownButton({ width: 150, height: 22});
            $("#dropDownButton4").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));

            $("#menu_grid_hover_color").on('colorchange', function (event) {
                $("#dropDownButton4").jqxDropDownButton('setContent', getTextElementByColor(event.args.color));
                $("#menu_setting_save").prop("disabled", false);
            });

            $("#menu_grid_hover_color").jqxColorPicker({ color: "DC143C", colorMode: 'hue', width: 220, height: 220});         

            $("#dropDownButton5").jqxDropDownButton({ width: 150, height: 22});
            $("#dropDownButton5").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));
            
            $("#menu_scrollbar_color").on('colorchange', function (event) {
                $("#dropDownButton5").jqxDropDownButton('setContent', getTextElementByColor(event.args.color));
                $("#menu_setting_save").prop("disabled", false);
            });

            $("#menu_scrollbar_color").jqxColorPicker({ color: "DC143C", colorMode: 'hue', width: 220, height: 220});
            
            $("#menu_name, #menu_description").on('keyup', function(){
                $("#menu_setting_save").prop("disabled", false);
            })

            $("#menu_pos_menu, #menu_grid_theme, #menu_grid_header_font_style, #menu_grid_header_font_style, #menu_grid_font_style, #menu_grid_header_font_size, #menu_grid_font_size, #menu_scrollbar_size").on('change', function(event){
                var args = event.args;
                if (args) {
                    // index represents the item's index.
                    var index = args.index;
                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type;
                    
                    $("#menu_setting_save").prop("disabled", false);
                }
            })
            
            def.resolve();
        },100)
        return def.promise();
    }

    function getTextElementByColor(color) {
        if (color == 'transparent' || color.hex == "") {
            return $("<div style='text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;'>transparent</div>");
        }
        var element = $("<div style='text-shadow: none; position: relative; padding-bottom: 2px; margin-top: 2px;'>#" + color.hex + "</div>");
        var nThreshold = 105;
        var bgDelta = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
        var foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';
        element.css('color', foreColor);
        element.css('background', "#" + color.hex);
        element.addClass('jqx-rc-all');
        return element;
    }

    var WindowMenuSetting = (title) => {
        var def = $.Deferred();
        setTimeout(function(){
            $("#menu_setting").jqxWindow({
                width: 680,
                height: 580,
                title: "Menu settings | "+title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 100
            })
            $("#menu_setting").jqxWindow('open');
            
            $("#menu_setting").on('close', function(){
                $("#menu_setting").jqxWindow('destroy');
                $("#menu_setting").remove();
            })
            
            def.resolve();
        },100)
        return def.promise();
    }

    var MenuSetting = (title) => {
        var def = $.Deferred();
        PopulateMenuSettingPopulate()
        .then(function(){
            WindowMenuSetting(title)
            .then(function(){
                def.resolve();
            })
        })
        return def.promise();
    }

    $(document).on('click', '#menu_settings', function(e){
        e.preventDefault();
        var ThemeInfo = $('input[type=radio][name=theme_group_radio_button]:checked').attr('id');
        var ThemeId = ThemeInfo.split('=')[0];
        var ThemeCashierMenu = ThemeInfo.split('=')[1];
        var ThemePOSMenu = ThemeInfo.split('=')[2];
        var ThemeMenuName = ThemeInfo.split('=')[3];
        var ThemeMenuDescription = ThemeInfo.split('=')[4];
        var ThemeGridTheme = ThemeInfo.split('=')[5];
        var ThemeGridHeaderFontSize = ThemeInfo.split('=')[6];
        var ThemeGridFontSize = ThemeInfo.split('=')[7];
        var ThemeGridHeaderFontColor = ThemeInfo.split('=')[8];
        var ThemeMenuGridFontColor = ThemeInfo.split('=')[9];
        var ThemeHeaderFontStyle = ThemeInfo.split('=')[10];
        var ThemeGridFontStyle = ThemeInfo.split('=')[11];
        var ThemeGridRowHighlightColor = ThemeInfo.split('=')[12];
        var ThemeGridRowHoverColor = ThemeInfo.split('=')[13];
        var ThemePaymentMenu = ThemeInfo.split('=')[14];
        var ThemeGridScrollbarSize = ThemeInfo.split('=')[15];
        var ThemeGridScrollbarColor = ThemeInfo.split('=')[16];
        var title = ThemeId + ' | ' + ThemeMenuName;
        MenuSetting(title)
        .then(function(){
            
            $("#MenuId").val(ThemeId);
            $("#menu_name").val(ThemeMenuName);
            $("#menu_description").val(ThemeMenuDescription);
            $("#menu_pos_menu").val(ThemePOSMenu);
            $("#menu_pos_paymentmenu").val(ThemePaymentMenu);
            $("#menu_grid_theme").val(ThemeGridTheme);
            $("#menu_grid_header_font_style").val(ThemeHeaderFontStyle); 
            $("#menu_grid_font_style").val(ThemeGridFontStyle);
            $("#menu_grid_header_font_size").val(ThemeGridHeaderFontSize.replace('px',''));
            $("#menu_grid_font_size").val(ThemeGridFontSize.replace('px',''));
            $("#menu_grid_header_font_color").jqxColorPicker('setColor', ThemeGridHeaderFontColor);
            $("#menu_grid_content_font_color").jqxColorPicker('setColor', ThemeMenuGridFontColor); 
            $("#menu_grid_highlight_color").jqxColorPicker('setColor', ThemeGridRowHighlightColor);
            $("#menu_grid_hover_color").jqxColorPicker('setColor', ThemeGridRowHoverColor);
            $("#menu_scrollbar_color").jqxColorPicker('setColor', ThemeGridScrollbarColor);
            $("#menu_scrollbar_size").val(ThemeGridScrollbarSize);

            $("#menu_setting_save").prop("disabled", true);
        })
    })

    var setting_changes = false;
    $(document).on('click', '#menu_setting_save', function(e){
        e.preventDefault();
        var GridHeaderFontColor = $("#dropDownButton1").text();//$("#menu_grid_header_font_color").jqxColorPicker('getColor');
        var GridFontColor = $("#dropDownButton2").text();
        var GridRowHighlightColor = $("#dropDownButton3").text();
        var GridRowHoverColor = $("#dropDownButton4").text();
        var GridScrollBarColor = $("#dropDownButton5").text();
        var postdata ="MenuId="+$("#MenuId").val();
            postdata+="&MenuName="+$("#menu_name").val();
            postdata+="&Description="+$("#menu_description").val();
            postdata+="&POSMenu="+$("#menu_pos_menu").val();
            postdata+="&GridTheme="+$("#menu_grid_theme").val();
            postdata+="&GridHeaderFontStyle="+$("#menu_grid_header_font_style").jqxComboBox('val');
            postdata+="&GridFontStyle="+$("#menu_grid_font_style").jqxComboBox('val');
            postdata+="&GridHeaderFontSize="+$("#menu_grid_header_font_size").val();
            postdata+="&GridFontSize="+$("#menu_grid_font_size").val();
            postdata+="&GridHeaderFontColor="+GridHeaderFontColor;
            postdata+="&GridFontColor="+ GridFontColor;
            postdata+="&GridRowHighlightColor="+GridRowHighlightColor;
            postdata+="&GridRowHoverColor="+GridRowHoverColor;
            postdata+="&PaymentMenu="+$("#menu_pos_paymentmenu").val();
            postdata+="&GridScrollBarSize="+$("#menu_scrollbar_size").val();
            postdata+="&GridScrollBarColor="+GridScrollBarColor;
        posData.SaveMenuSettings(postdata)
        .success(function(data){
            $("#menu_setting_save").prop("disabled", true);
            LoadMenuListSetting();
            setting_changes = true;
        })
    })

    $(document).on('click', '#menu_setting_cancel', function(e){
        e.preventDefault();
        // No changes
        if( $("#menu_setting_save").is(":disabled") ){
            $("#menu_setting").jqxWindow('close');
        }
        // With changes
        else{
            $("#menu_setting_function").hide();
            $("#menu_setting_ask_action").show();
        }
    })

    $(document).on('click', '#menu_setting_save_yes', function(e){
        e.preventDefault();
        $("#menu_setting_save").trigger('click');
        LoadMenuListSetting();
        $("#menu_setting").jqxWindow('close');
    })

    $(document).on('click', '#menu_setting_save_no', function(e){
        e.preventDefault();
        $("#menu_setting").jqxWindow('close');
    })

    $(document).on('click', '#menu_setting_default', function(e){
        var menuThemeSelected = $("#menu_grid_theme").val();
        if(menuThemeSelected == 'darkblue'){
            $("#menu_grid_header_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_header_font_size").jqxComboBox('val', '18');
            $("#menu_grid_font_size").jqxComboBox('val', '20');
            $("#dropDownButton1").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: "DC143C" })));
            $("#dropDownButton2").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));  
            $("#menu_grid_header_font_color").jqxColorPicker('setColor', '#DC143C');
            $("#menu_grid_content_font_color").jqxColorPicker('setColor', null);
            $("#menu_grid_highlight_color").jqxColorPicker('setColor', '#004A73');
            $("#menu_grid_hover_color").jqxColorPicker('setColor', '#338CBC');
            $("#menu_scrollbar_color").jqxColorPicker('setColor', '#ccc');
            $("#menu_scrollbar_color").jqxColorPicker('setColor', "#ccc");
            // $("#dropDownButton5").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));
            $("#menu_scrollbar_size").val(35);
        }else if(menuThemeSelected == 'dark'){
            $("#menu_grid_header_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_font_style").jqxComboBox('val', 'Comic Sans MS');
            $("#menu_grid_header_font_size").jqxComboBox('val', '18');
            $("#menu_grid_font_size").jqxComboBox('val', '20');
            $("#dropDownButton1").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: "FFFFFF" })));
            $("#dropDownButton2").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));  
            $("#menu_grid_header_font_color").jqxColorPicker('setColor', '#FFFFFF');
            $("#menu_grid_content_font_color").jqxColorPicker('setColor', null);
            $("#menu_grid_highlight_color").jqxColorPicker('setColor', '#1ca8dd');
            $("#menu_grid_hover_color").jqxColorPicker('setColor', '#ccc');
            $("#menu_scrollbar_color").jqxColorPicker('setColor', '#ccc');
            $("#menu_scrollbar_color").jqxColorPicker('setColor', '#ccc');
            // $("#dropDownButton5").jqxDropDownButton('setContent', getTextElementByColor(new $.jqx.color({ hex: null })));
            $("#menu_scrollbar_size").val(35);
        }
    })

    /*
    |------------------------------------------------------------------
    | Time Clock Report Date Range
    |------------------------------------------------------------------
    */
    $("#time_clock_report").on('close', function(e){
        e.preventDefault();
        $("#time_clock_report_container").html('');
        $scope.cashout_timeclock_daterange_from_change = false;
        $scope.cashout_timeclock_daterange_to_change = false;
    })
    
    var populateTimeClockReport = function(){
        var def = $.Deferred();
        $("#time_clock_report").append('<div id="time_clock_report_container" style="background: #144766; color:#EEE;"></div>');
        $("#time_clock_report_container").html('');
        $("#time_clock_report_container").append(
            '<div style="width:100%;">'+
                '<div style="float:left; margin-right: 5px;">'+
                    '<span>Date From:</span>'+
                    '<div id="cashout_timeclock_daterange_from"></div>'+
                '</div>'+
                '<div style="float:left; margin-right: 5px">'+
                    '<span>Date To:</span>'+
                    '<div id="cashout_timeclock_daterange_to"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<span>Location</span>'+
                    '<div id="cashout_timeclock_location"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-primary btn-lg" id="cashout_timeclock_search"><span class="glyphicon glyphicon-search"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-warning btn-lg" id="cashout_timeclock_print"><span class="glyphicon glyphicon-print"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-danger btn-lg" id="cashout_timeclock_close"><span class="glyphicon glyphicon-remove"></span></button>'+
                '<div>'+
            '</div>'
        );
        $("#time_clock_report_container").append(
            '<div style="float:left; width: 100%;">'+
                '<div id="cashout_timeclock_history"></div>'+
            '</div>'
        )
        CashOutTimeClockReport();
        $("#cashout_timeclock_daterange_from").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
        $("#cashout_timeclock_daterange_to").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
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
            $("#cashout_timeclock_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: '250', height: '40px'});
            $("#cashout_timeclock_location").val(data.curLocation);
            def.resolve();
        })
        return def.promise();
    }

    var WindowTimeClockReport = function(){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth 	        = $("#fakeheight").width();
            var ResoHeight 	        = $("#fakeheight").height();
            var ComputeHeight		= ResoHeight - 50;
            var CustomerSearch 		= ComputeHeight - 40;
            var UseHeight			= CustomerSearch;
            var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
            $("#time_clock_report").jqxWindow({
                height: ResoHeight,
                minWidth: '100%',
                Title: 'Time Clock Report',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            })
            $("#time_clock_report").jqxWindow('open');
            def.resolve();
        },100);
        return def.promise();
    }

    var NumpadTimeClockReport = function(){
		var def = $.Deferred();
		populateTimeClockReport()
		.then(function(){
			def.resolve();
		});
		return def.promise();
    }
    
    $scope.CashOutTimeClock = function(){
        NumpadTimeClockReport()
        .then(function(){
            WindowTimeClockReport()
            .then(function(){
                
            })
        })   
    }

    /*
    |------------------------------------------------------------------
    | Time Clock Report Grid
    |------------------------------------------------------------------
    */
    var CashOutTimeClockReport = function(){
        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 60;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
        $("#cashout_timeclock_history").jqxGrid({
            width: '100%',
            height: UseHeight,
            columnsresize: true,
            theme: GridTheme,
            sortable: true,
            pageable: false,
            pageSize: ComputeDisplayRow,
            scrollbarsize: GridScrollBarSize,
            pagerMode: 'advance',
            altRows: true,
            showfilterrow: true,
            filterable: true,
            selectionmode: 'checkbox',
            showAggregates: true,
            showstatusbar: true,
            rowsheight: GridRowHeight,
            source:  {
                dataType: "json",
                dataFields: [
                    { name: 'ID', type : 'int'},
                    { name: 'UserName', type: 'string'},
                    { name: 'DateIn', type: 'string'},
                    { name: 'TimeIn', type: 'string'},
                    { name: 'DateOut', type: 'string'},
                    { name: 'TimeOut', type: 'string'},
                    { name: 'ClockIn', type: 'string'},
                    { name: 'ClockOut', type: 'string'},
                    { name: 'Duration', type: 'string'},
                    { name: 'Total', type: 'float'},
                    { name: 'ClockInComment', type: 'string'},
                    { name: 'ClockOutComment', type: 'string'}
                ],
                localdata: {}
            },
            columnsResize: true,
            columns: [
                { text: 'ID', dataField: 'ID', width: "5%" },
                { text: 'User', dataField: 'UserName', width: "15%" },
                { text: 'Date In', dataField: 'DateIn', width: "10%", hidden: true },
                { text: 'Time In', dataField: 'TimeIn', width: '7%', hidden: true },
                { text: 'Date Out', dataField: 'DateOut', width: '10%', hidden: true }, 
                { text: 'Time Out', dataField: 'TimeOut', width: '7%', hidden: true }, 
                { text: 'Clock In', dataField: 'ClockIn', width: '20%' },
                { text: 'Clock Out', dataField: 'ClockOut', width: '20%' },
                { text: 'Duration', dataField: 'Duration', width: '12%', align: "right", cellsAlign: "right"},
                { text: 'Total', dataField: 'Total', width: '10%', align: "right", cellsAlign: "right", aggregates: [{
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
                { text: 'In Comment', dataField: 'ClockInComment', width: '25%' },
                { text: 'Out Comment', dataField: 'ClockOutComment', width: '25%' }
            ]
        })
    }  

    $scope.cashout_timeclock_daterange_from_change = false;
    $scope.cashout_timeclock_daterange_to_change = false;

    $(document).on('change', '#cashout_timeclock_daterange_from', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; 
        $scope.cashout_timeclock_daterange_from_change = true;
    })

    $(document).on('change', '#cashout_timeclock_daterange_to', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; 
        $scope.cashout_timeclock_daterange_to_change = true;
    })

    //-->Time Clock Search
    $(document).on('click', "#cashout_timeclock_search", function(e){
        e.preventDefault();
        var daterange_form  = $("#cashout_timeclock_daterange_from").val();
        var daterange_to    = $("#cashout_timeclock_daterange_to").val();
        var selocation      = $("#cashout_timeclock_location").val();
        var postdata ="daterange_from="+daterange_form;
            postdata+="&daterange_to="+daterange_to;
            postdata+="&location="+selocation;
        posData.CashOutTimeClockSearch(postdata)
        .success(function(data){
            var source = {
                dataType: "json",
                localdata: data.timeclock_data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cashout_timeclock_history").jqxGrid({
                source: dataAdapter
            })
        })
        $scope.cashout_timeclock_daterange_from_change = false;
        $scope.cashout_timeclock_daterange_to_change = false;
    })

    var CashOutTimeClockSearchBeforePrint = function(){
        var def = $.Deferred();
        var daterange_form  = $("#cashout_timeclock_daterange_from").val();
        var daterange_to    = $("#cashout_timeclock_daterange_to").val();
        var selocation      = $("#cashout_timeclock_location").val();
        var postdata ="daterange_from="+daterange_form;
            postdata+="&daterange_to="+daterange_to;
            postdata+="&location="+selocation;
        posData.CashOutTimeClockSearch(postdata)
        .success(function(data){
            var source = {
                dataType: "json",
                localdata: data.timeclock_data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cashout_timeclock_history").jqxGrid({
                source: dataAdapter
            })
            def.resolve();
        })
        $scope.cashout_timeclock_daterange_from_change = false;
        $scope.cashout_timeclock_daterange_to_change = false;
        return def.promise();
    }

    //-->Time Clock Print Receipt
    $(document).on('click', '#cashout_timeclock_print', function(e){
        e.preventDefault();
        if($scope.cashout_timeclock_daterange_from_change == true || $scope.cashout_timeclock_daterange_to_change == true){
            CashOutTimeClockSearchBeforePrint()
            .then(function(){
                CashOutTimeClockPrintChange();
            })
            return false;
        }

        //$("#cashout_timeclock_history").jqxGrid('getrowdata', row);
        var selectedRowData = [];
        var getselectedrowindexes = $('#cashout_timeclock_history').jqxGrid('getselectedrowindexes');
        if (getselectedrowindexes.length > 0){
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });


            for(var i=0; i < getselectedrowindexes.length; i++ ){
                selectedRowData.push($('#cashout_timeclock_history').jqxGrid('getrowdata', getselectedrowindexes[i]));
            }
           
            var postdata ="TimeClockData="+JSON.stringify(selectedRowData);
                postdata +="&datefrom="+$("#cashout_timeclock_daterange_from").val();
                postdata+="&dateto="+$("#cashout_timeclock_daterange_to").val();
                postdata+="&location="+$("#cashout_timeclock_location").val();
                postdata+="&PrintReceipt=6";
            posData.TimeclockReportPrint(postdata)
            .success(function(data){
                if(data.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('cashout_report_print_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
                setTimeout($.unblockUI, 100); 
            })
        }else{
            var msg = "Please check the report to print.";
            NumpadAlertOk('print_failed', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100); 
        }
    })

    var CashOutTimeClockPrintChange = function(){
        var selectedRowData = [];
        var getselectedrowindexes = $('#cashout_timeclock_history').jqxGrid('getselectedrowindexes');
        if (getselectedrowindexes.length > 0){
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });

            for(var i=0; i < getselectedrowindexes.length; i++ ){
                selectedRowData.push($('#cashout_timeclock_history').jqxGrid('getrowdata', getselectedrowindexes[i]));
            }
            var postdata ="TimeClockData="+JSON.stringify(selectedRowData);
                postdata +="&datefrom="+$("#cashout_timeclock_daterange_from").val();
                postdata+="&dateto="+$("#cashout_timeclock_daterange_to").val();
                postdata+="&location="+$("#cashout_timeclock_location").val();
                postdata+="&ReceiptPrint=6";
            posData.TimeclockReportPrint(postdata)
            .success(function(data){
                if(data.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('cashout_report_print_error', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
                setTimeout($.unblockUI, 100); 
            })
        }else{
            var msg = "Please check the report to print.";
            NumpadAlertOk('print_failed', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100); 
        }
    }

    //-->Time Clock Close Window
    $(document).on('click', '#cashout_timeclock_close', function(e){
        $("#time_clock_report").jqxWindow('close');
        $scope.cashout_timeclock_daterange_from_change = false;
        $scope.cashout_timeclock_daterange_to_change = false;
    })

    
    $(document).on("rowselect", "#cashout_timeclock_history", function(event){  
        var row = event.args.rowindex;
        var datafield = event.args.datafield;
        var datarow = $(this).jqxGrid('getrowdata', row);
        //TimeClockPrint = [];
        console.log(JSON.stringify(datarow));
    })


    /*
    |------------------------------------------------------------------
    | Bank Deposit
    |------------------------------------------------------------------
    */
    $("#leave").on('close', function(e){
        e.preventDefault();
        $("#leave_container").html('');
    })
    var populateNumpadLeave = function(form){
        var def = $.Deferred();
        setTimeout(function(){
            $("#leave").append('<div id="leave_container" style="background: #144766; color:#EEE;"></div>');
            $("#leave_container").html('');
            $("#leave_container").append('<h4 style="text-align:center;">Leave Amount</h4>');
            $("#leave_container").append(
                '<form id="'+form+'">'+
                    '<div id="cashout_leave_entry_field"></div>'+
                    '<div id="cashout_leave_entry_keyboard"></div>'+
                '</form>'
            );
            $("#cashout_leave_entry_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsPrice").val()})
            $('#cashout_leave_entry_field').on('change', function(event){
                var value = event.args.value;
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                myNumber = value;
            }); 
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowNumpadLeave = function(){
        var def = $.Deferred();
		setTimeout(function(){
			$("#leave").jqxWindow({
				title: "Amount",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#leave').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }

    var NumpadLeave = function(form){
        var def = $.Deferred();
		setTimeout(function(){
            populateNumpadLeave(form)
            .then(function(){
                $('#cashout_leave_entry_keyboard').numeric_numpad({
                    layout: "numeric",
                    input: $('#cashout_leave_entry_field')
                });
                def.resolve();
            })
        },100);
        return def.promise();
    }

    $(document).on('submit', '#BankDeposit', function(e){
        e.preventDefault();
        var enteredAmount = $("#cashout_leave_entry_field input").val();
        if(enteredAmount == ''){
			enteredAmount = 0.00;
        }
        $("#gridDeposit").jqxGrid('setcellvalue', BankDepositEditRow, "Amount", enteredAmount);
        $("#leave").jqxWindow('close');
    })


    var POSPaymentNumpad = $("#POSPaymentNumpad").val();
    console.log("Numpad", POSPaymentNumpad);
    var populateWindowCashInDenomination = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append('<div id="cashin_denomination" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;"></div>');
            var content = '';
            if( POSPaymentNumpad == 2 ){ //POSPaymentNumpad = 1 original setting. 2 Is nothing
                //maskmoney
                content ='<div class="DenominationNumpad">'+
                            '<div class="keypad-function-container">'+
                                '<div class="level-button first">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(1)" tabindex="-1">1</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(2)" tabindex="-1">2</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(3)" tabindex="-1">3</button>'+
                                '</div>'+
                                '<div class="level-button second">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(4)" tabindex="-1">4</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(5)" tabindex="-1">5</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(6)" tabindex="-1">6</button>'+
                                '</div>'+
                                '<div class="level-button third">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(7)" tabindex="-1">7</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(8)" tabindex="-1">8</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(9)" tabindex="-1">9</button>'+
                                '</div>'+
                                '<div class="level-button fourth">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_number(0)" tabindex="-1">0</button>'+
                                    '<button class="keypad-fn-buttons glossyyellow" ng-click="keypad_function_backspace()" title="Back space" tabindex="-1"> <span class="glyphicon glyphicon-arrow-left"></span> </button>'+
                                    '<button class="keypad-fn-buttons glossyred control-remove" ng-click="keypad_function_clearall()" title="Clear" tabindex="-1">Clear</button>'+
                                '</div>'+
                                '<div class="level-button fourth">'+
                                    '<button class="keypad-nextprev-buttons glossypurple" ng-click="keypad_function_previous()" title="Previous" tabindex="-1">Previous</button>'+
                                    '<button class="keypad-nextprev-buttons glossypurple" ng-click="keypad_function_next()" title="Next" tabindex="-1">Next</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
            }else{
                //jqx
                content ='<div class="DenominationNumpad">'+
                            '<div class="keypad-function-container">'+
                                '<div class="level-button first">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(1)" tabindex="-1">1</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(2)" tabindex="-1">2</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(3)" tabindex="-1">3</button>'+
                                '</div>'+
                                '<div class="level-button second">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(4)" tabindex="-1">4</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(5)" tabindex="-1">5</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(6)" tabindex="-1">6</button>'+
                                '</div>'+
                                '<div class="level-button third">'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(7)" tabindex="-1">7</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(8)" tabindex="-1">8</button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(9)" tabindex="-1">9</button>'+
                                '</div>'+
                                '<div class="level-button fourth">'+

                                    '<button class="keypad-fn-buttons glossyred control-remove" ng-click="keypad_function_jqx_clearall()" title="Clear" tabindex="-1"><span class="glyphicon glyphicon-erase"></span></button>'+
                                    '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_number(0)" tabindex="-1">0</button>'+
                                    // '<button class="keypad-fn-buttons glossyblack" ng-click="keypad_function_jqx_decimal()">.</button>'+
                                    '<button class="keypad-fn-buttons glossygreen control-remove" ng-click="keypad_function_jqx_enter()" title="Clear" tabindex="-1">Enter</button>'+
                                '</div>'+
                                '<div class="level-button fourth">'+
                                    '<button class="keypad-nextprev-buttons glossypurple" ng-click="keypad_function_previous()" title="Previous" tabindex="-1">Previous</button>'+
                                    '<button class="keypad-nextprev-buttons glossypurple" ng-click="keypad_function_next()" title="Next" tabindex="-1">Next</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
            }
            console.log("POSPaymentNumpad",POSPaymentNumpad);
            if(POSPaymentNumpad == 1){

                $("#cashin_denomination").append('<div id="cashin_denomination_container" style="background: #144766; color:#EEE; overflow: hidden !important;"></div>');
                $("#cashin_denomination_container").html('');
                $("#cashin_denomination_container").append($compile(
                    '<div id="cash_in_denomination_default" style="padding:5px;">'+
                        '<button class="btn btn-primary btn-lg" id="cashin_denomination_save" tabindex="-1">Save</button>&nbsp;'+
                        '<button class="btn btn-warning btn-lg" id="cashin_denomination_print" tabindex="-1">Print</button>&nbsp;'+
                        '<button class="btn btn-danger btn-lg" id="cashin_denomination_close" tabindex="-1">Close</button>&nbsp;'+
                    '</div>'+
                    '<div id="cash_in_denomination_ask" style="padding:5px; display:none;">'+
                        '<label style="font-size: 16px; margin-right: 5px;">Do you want to save changes?</label>'+
                        '<button class="btn btn-danger btn-lg" id="cashin_denomination_close_ask" tabindex="-1">No</button>&nbsp;'+
                        '<button class="btn btn-primary btn-lg" id="cashin_denomination_save_ask" tabindex="-1">Yes</button>&nbsp;'+
                    '</div>'+
                    '<div style="float:left; width: 45%; margin-right: 10px;">'+
                        '<div class="CashInDenominationContainer">'+
                            //Header
                            '<div class="CashInDenominationHeader">'+
                                '<div class="denomination-header">&nbsp;</div>'+
                                '<div class="denomination-header" align="right">Quantity</div>'+
                                '<div class="denomination-header" align="right">Total</div>'+
                            '</div>'+
                            //Denomination
                            '<div class="CashInDenominationRow">'+
                                // '<div id="testjqxinput" class="tabint-1"></div>'+
                                '<div class="denomination-number denomination-equivalent">100</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-1" id="denomination_amount_hundred"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-11 HundredDollar" id="denomination_total_hundred"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">50</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-2 " id="denomination_amount_fifty"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-12 FiftyDollar" id="denomination_total_fifty"/></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">20</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-3" id="denomination_amount_twenty"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-13 TwentyDollar" id="denomination_total_twenty"/></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">10</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-4" id="denomination_amount_ten"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-14 TenDollar" id="denomination_total_ten"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">5</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-5" id="denomination_amount_five"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-15 FiveDollar" id="denomination_total_five"></div></div>'+
                            '</div>'+
                            // '<div class="CashInDenominationRow">'+
                            //     '<div class="denomination-number denomination-equivalent">2</div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-6" id="denomination_amount_two" tabindex="6"/></div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-18 TwoDollar" id="denomination_total_two" tabindex="18"/></div>'+
                            // '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">1</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-6" id="denomination_amount_one"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-16 OneDollar" id="denomination_total_one"></div></div>'+
                            '</div>'+
                            // '<div class="CashInDenominationRow">'+
                            //     '<div class="denomination-number denomination-equivalent">0.50</div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-8" id="denomination_amount_half" tabindex="8"/></div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-20 HalfDollar" id="denomination_total_half" tabindex="20"/></div>'+
                            // '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.25</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-7" id="denomination_amount_quarter"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-17 Quarter" id="denomination_total_quarter"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.10</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-8" id="denomination_amount_dime"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-18 Dime" id="denomination_total_dime"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.05</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-9" id="denomination_amount_nickel"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-19 Nickel" id="denomination_total_nickel"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.01</div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-quantity tabint-10" id="denomination_amount_peny"></div></div>'+
                                '<div class="denomination-number"><div type="text" class="denomination-input-total tabint-20 Penny" id="denomination_total_peny"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">&nbsp;</div>'+
                                '<div class="denomination-number denomination-equivalent">Other</div>'+
                                '<div class="denomination-number"><div class="denomination-input-other tabint-11 Other" id="denomination_total_other"></div></div>'+
                            '</div>'+
                            '<input type="text" id="extra_input_bound_lasttabindex" class="denomination-lastbound tabint-12" style="width: 0px; height: 0px; background-color:black; position: absolute; border:none; outline-width: 0;">'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">&nbsp;</div>'+
                                '<div class="denomination-number denomination-equivalent">TOTAL</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-total-total" id="denomination_total_total" disabled="disabled" value="0.00" /></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    content
                )($scope));
            }else{
                $("#cashin_denomination").append('<div id="cashin_denomination_container" style="background: #144766; color:#EEE; overflow: hidden !important;"></div>');
                $("#cashin_denomination_container").html('');
                $("#cashin_denomination_container").append($compile(
                    '<div id="cash_in_denomination_default" style="padding:5px;">'+
                        '<button class="btn btn-primary btn-lg" id="cashin_denomination_save" tabindex="-1">Save</button>&nbsp;'+
                        '<button class="btn btn-warning btn-lg" id="cashin_denomination_print" tabindex="-1">Print</button>&nbsp;'+
                        '<button class="btn btn-danger btn-lg" id="cashin_denomination_close" tabindex="-1">Close</button>&nbsp;'+
                    '</div>'+
                    '<div id="cash_in_denomination_ask" style="padding:5px; display:none;">'+
                        '<label style="font-size: 16px; margin-right: 5px;">Do you want to save changes?</label>'+
                        '<button class="btn btn-danger btn-lg" id="cashin_denomination_close_ask" tabindex="-1">No</button>&nbsp;'+
                        '<button class="btn btn-primary btn-lg" id="cashin_denomination_save_ask" tabindex="-1">Yes</button>&nbsp;'+
                    '</div>'+
                    '<div style="float:left; width: 45%; margin-right: 10px;">'+
                        '<div class="CashInDenominationContainer">'+
                            //Header
                            '<div class="CashInDenominationHeader">'+
                                '<div class="denomination-header">&nbsp;</div>'+
                                '<div class="denomination-header" align="right">Quantity</div>'+
                                '<div class="denomination-header" align="right">Total</div>'+
                            '</div>'+
                            //Denomination
                            '<div class="CashInDenominationRow">'+
                                // '<div id="testjqxinput" class="tabint-1"></div>'+
                                '<div class="denomination-number denomination-equivalent">100</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-1" id="denomination_amount_hundred"/></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-11 HundredDollar" id="denomination_total_hundred"/></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">50</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-2 " id="denomination_amount_fifty" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-12 FiftyDollar" id="denomination_total_fifty"/></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">20</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-3" id="denomination_amount_twenty" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-13 TwentyDollar" id="denomination_total_twenty"/></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">10</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-4" id="denomination_amount_ten" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-14 TenDollar" id="denomination_total_ten" /></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">5</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-5" id="denomination_amount_five" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-15 FiveDollar" id="denomination_total_five" /></div>'+
                            '</div>'+
                            // '<div class="CashInDenominationRow">'+
                            //     '<div class="denomination-number denomination-equivalent">2</div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-6" id="denomination_amount_two" tabindex="6"/></div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-18 TwoDollar" id="denomination_total_two" tabindex="18"/></div>'+
                            // '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">1</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-6" id="denomination_amount_one" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-16 OneDollar" id="denomination_total_one" /></div>'+
                            '</div>'+
                            // '<div class="CashInDenominationRow">'+
                            //     '<div class="denomination-number denomination-equivalent">0.50</div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-8" id="denomination_amount_half" tabindex="8"/></div>'+
                            //     '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-20 HalfDollar" id="denomination_total_half" tabindex="20"/></div>'+
                            // '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.25</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-7" id="denomination_amount_quarter" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-17 Quarter" id="denomination_total_quarter" /></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.10</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-8" id="denomination_amount_dime" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-18 Dime" id="denomination_total_dime" /></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.05</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-9" id="denomination_amount_nickel" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-19 Nickel" id="denomination_total_nickel" /></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">0.01</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-quantity tabint-10" id="denomination_amount_peny" /></div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-input-total tabint-20 Penny" id="denomination_total_peny" /></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">&nbsp;</div>'+
                                '<div class="denomination-number denomination-equivalent">Other</div>'+
                                '<div class="denomination-number"><div class="denomination-input-other tabint-11 Other" id="denomination_total_other"></div></div>'+
                            '</div>'+
                            '<div class="CashInDenominationRow">'+
                                '<div class="denomination-number denomination-equivalent">&nbsp;</div>'+
                                '<div class="denomination-number denomination-equivalent">TOTAL</div>'+
                                '<div class="denomination-number"><input type="text" class="denomination-total-total" id="denomination_total_total" disabled="disabled" value="0.00"/></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    content
                )($scope));
            }
            
            $("#denomination_amount_hundred, #denomination_amount_fifty, #denomination_amount_twenty, #denomination_amount_ten, #denomination_amount_five, #denomination_amount_two, #denomination_amount_one, #denomination_amount_half, #denomination_amount_quarter, #denomination_amount_dime, #denomination_amount_nickel, #denomination_amount_peny").jqxNumberInput({ width: '100%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 0 });
           
            if(POSPaymentNumpad == 1){
                //disabled
                // $(".denomination-input-total").maskMoney({thousands : '', decimal : '.', allowZero : true})
                // $(".denomination-input-total").maskMoney('mask', '0.00');

                $(".denomination-input-total").jqxNumberInput({ width: '100%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 2,  disabled: true});
                
                $(".denomination-input-other").jqxNumberInput({ width: '100%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 2 });
            }else{
                $(".denomination-input-total").jqxNumberInput({ width: '100%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 2,  disabled: true});
                $(".denomination-input-other").jqxNumberInput({ width: '100%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 2});
            }

            // $("#testjqxinput").jqxNumberInput({ width: '30%', height: '28px', inputMode: 'simple', spinButtons: false, decimalDigits: 2});

            def.resolve();
        },100)
        return def.promise();
    }

    $(document).on(
        'click',
        '.denomination-input-other',
        function(){
            $(".denomination-input-quantity").removeClass('highligted');
            $(".denomination-input-quantity").removeClass('mask-highligted');
            $(".denomination-input-total").removeClass('highligted');
            $(".denomination-input-total").removeClass('mask-highligted');
            $(".denomination-input-other").removeClass('highligted');
            $(".denomination-input-other").removeClass('mask-highligted');

            console.log("you clicked me other");

            elemId = $(this).attr('id');
            $("#"+elemId).addClass('highligted');
            var gTotal = $("#denomination_total_total").val();
            var other_value = $("#denomination_total_other").val();
            var newgTotal = 0;

            $("#denomination_total_other").on('valueChanged', function(event){
                var value = event.args.value;
                other_value = value;
                newgTotal = parseFloat(gTotal) + parseFloat(other_value);
                // $("#denomination_total_total").val(newgTotal.toFixed(2));
                CashInDenominationGetTotal();
            })

            setTimeout(function(){
                $("#"+elemId).jqxNumberInput('focus');
                var input = $("#"+elemId+' input')[0];
                input.setSelectionRange(0,0);
                $("#"+elemId+' input').select();
            },100)
        }
    )

    var WindowCashInDenomination = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#cashin_denomination").jqxWindow({
                height: 665,
                width: 760,
                title: "Cash In Denomination",
                isModal: true,
                theme: 'darkblue',
                resizable: false,
                showCloseButton: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                draggable: false,
                zIndex: 100
            })
            $("#cashin_denomination").jqxWindow('open');

            $("#cashin_denomination").on('close', function(){
                DenominationChanges = false;
                DrawerManagerCount = false;
                
                $("#cash_in_denomination_default").show();
                $("#cash_in_denomination_ask").hide();
                $("#cashin_denomination").remove();
            })
            
            setTimeout(function(){
                $("#denomination_amount_hundred").trigger('click');
                // $(".denomination-input-quantity").trigger('click');
                tabindex = 1;
                // $("#denomination_amount_hundred").jqxNumberInput('focus');
                // var input = $('#denomination_amount_hundred input')[0];
                // input.setSelectionRange(0, 0);
                // $("#denomination_amount_hundred input").select();
                DenominationChanges = false;
            },500)
            def.resolve();
        },100);
        return def.promise();
    }

    var CashInDenomination = function(){
        var def = $.Deferred();
        populateWindowCashInDenomination()
        .then(function(){
            $("#testjqxinput").val(100);
            def.resolve();
            
        })
        return def.promise();
    }

    var DenominationArray = [];
    var DenominationChanges = false;
    var CashInDenominationGrid = function(){
        //New Cash In version
        posData.CashInDenomination()
        .success(function(data){
            
            $("#cashin_denomination").jqxWindow("setTitle", 'Cash In Denomination '+data.StationCashierUnique);
            var DenominationTotal = 0;
            $.each(data.Denomination, function(index, value){

                if(POSPaymentNumpad == 1){
                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        if(thirdClass == value.DenominationIndex){
                            var ExtTotal = parseFloat(value.Extended).toFixed(2);
                            ExtTotal = ExtTotal.toString();
                            $("#"+id).maskMoney('mask',ExtTotal);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);
                            
                            var MultiplyVal = parseInt(curVal / DenominationVal);

                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })

                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = "Other";
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })

                }else{

                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);

                            var MultiplyVal = parseInt(curVal / DenominationVal);
                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })
                    
                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = 'Other';
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })


                }
            })

            $("#denomination_total_total").val( parseFloat(DenominationTotal).toFixed(2) );
        
        })
        
        return;
        //Old Cash In version

        var SelectedField;
        DenominationArray = [];
        posData.CashInDenomination()
        .success(function(data){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique', type: 'int'},
                    { name: 'StationCashierUnique', type: 'int'},
                    { name: 'DenominationIndex', type: 'string'},
                    { name: 'DenominationVal', type: 'float'},
                    { name: 'Name', type: 'string'},
                    { name: 'Quantity', type: 'int'},
                    { name: 'Extended', type: 'float'}
                ],
                localdata: data.Denomination,
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server was successful 
                    // and with parameter false if the synchronization has failed.
                    var myrowid = rowid;
                    var CashCountTotal = 0;
                    var $this =  $("#CashInDenominationPlugin");
                    var row = $($this).jqxGrid('getrowdata', rowid);
                    var process = false;
                    if(SelectedField == 'Quantity'){
                        if(row.Quantity >= 0){
                            var rowQuantity = row.Quantity;
                            var rowExtended = row.Extended;
                            var rowDenominationVal = row.DenominationVal;
                            var NewExtended = parseFloat(rowQuantity * rowDenominationVal).toFixed(2);
                            $($this).jqxGrid('begincelledit', rowid, "Extended");
                            $("#numbereditorCashInDenominationPluginExtended").val(NewExtended);
                            $($this).jqxGrid('endcelledit', rowid, "Extended", false);
                            $('#CashInDenominationPlugin').jqxGrid('selectcell', rowid + 1, 'Quantity');
                            process = true;
                            DenominationChanges = true;
                        }else{
                            var msg = 'Quantity must be greater than or equal to 0.';
                            NumpadAlertClose('denomination_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            })
                        }
                    }else if(SelectedField == 'Extended'){
                        if(row.Extended >= 0){
                            var result = parseFloat(row.Extended / row.DenominationVal).toFixed(2);
                            result = (result - parseInt(result)) * row.DenominationVal;
                            if(row.DenominationVal === 100 || row.DenominationVal === 50 || row.DenominationVal === 20 || row.DenominationVal === 10 || row.DenominationVal === 5 || row.DenominationVal === 1){
                                if(result > 0){
                                    var msg = 'Amount must be greater than or equal to 0 and multiple of '+row.DenominationVal;
                                    NumpadAlertClose('denomination_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    })
                                }else{
                                    var rowQuantity = row.Quantity;
                                    var rowExtended = row.Extended;
                                    var rowDenominationVal = row.DenominationVal;
                                    var NewQuantity = parseFloat(rowExtended / rowDenominationVal).toFixed(2);
                                    $($this).jqxGrid('begincelledit', rowid, "Quantity");
                                    $("#numbereditorCashInDenominationPluginQuantity").val(NewQuantity);
                                    $($this).jqxGrid('endcelledit', rowid, "Quantity", false);
                                    $('#CashInDenominationPlugin').jqxGrid('selectcell', rowid + 1, 'Extended');
                                    process = true;
                                    DenominationChanges = true;
                                }
                            }else{
                                if(result > 0.00){
                                    var msg = 'Amount must be greater than or equal to 0 and multiple of '+row.DenominationVal;
                                    NumpadAlertClose('denomination_error', msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                                    })
                                }else{
                                    var rowQuantity = row.Quantity;
                                    var rowExtended = row.Extended;
                                    var rowDenominationVal = row.DenominationVal;
                                    var NewQuantity = parseFloat(rowExtended / rowDenominationVal).toFixed(2);
                                    $($this).jqxGrid('begincelledit', rowid, "Quantity");
                                    $("#numbereditorCashInDenominationPluginQuantity").val(NewQuantity);
                                    $($this).jqxGrid('endcelledit', rowid, "Quantity", false);
                                    process = true;
                                    DenominationChanges = true;
                                }
                            }
                        }else{
                            var msg = 'Amount must be greater than or equal to 0 and multiple of '+rowDenominationVal;
                            NumpadAlertClose('denomination_error', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            })
                        }
                    }

                    commit(process);
                }
            };

            var cellbeginedit = function (row, datafield, columntype, value) {
                if (row == 11 ||  value === null || value === '') return false;
                //if (value === null || value === '') return false;
            }

            var cellsrenderer = function (row, column, value, defaultHtml, columnproperties) {
                if (row == 11 || row == 12 || row == 13 || row == 14) {
                    var element = $(defaultHtml);
                    element.css({'color':'#000', 'font-weight':'bolder'});
                    return element[0].outerHTML;
                }
                return defaultHtml;
            }
            

            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#CashInDenominationPlugin").jqxGrid({
                width: '100%',
                source: dataAdapter,                
                autoheight: true,
                theme: GridTheme,
                altrows: true,
                enabletooltips: true,
                editable: true,
                showstatusbar: true,
                showaggregates: true,
                selectionmode: 'singlecell',
                columns: [
                    { text: 'Unique', datafield: 'Unique', hidden: true },
                    { text: 'SCU', datafield: 'StationCashierUnique', hidden: true },
                    { text: 'DenominationIndex', datafield: 'DenominationIndex', hidden: true},
                    { text: 'DenominationVal', datafield: 'DenominationVal', hidden: true},
                    { text: '', datafield: 'Name', editable: false, align: 'left', cellsalign: 'left', width: '35%', cellsrenderer: cellsrenderer},
                    { text: 'Quantity', datafield: 'Quantity', width: '30%', align: 'right', cellsalign: 'right', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor, cellText, width, height) {
                            editor.jqxNumberInput({ digits: 8, spinButtons: false});
                        }
                    },
                    { text: 'Total', datafield: 'Extended', cellsAlign: 'right', align: 'right', width: '35%', cellsformat: 'd2', cellbeginedit: cellbeginedit, cellsrenderer: cellsrenderer, columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor, cellText, width, height) {
                            editor.jqxNumberInput({ digits: 8, spinButtons: false});
                        },
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
            });

            $("#CashInDenominationPlugin").bind('rowclick', function (event) {
                var index = event.args.rowindex;
                var datafield = event.args.datafield;
                var row = $(this).jqxGrid('getrowdata', index);
            })

            $("#CashInDenominationPlugin").bind('cellclick', function (event) {
                var datafield = event.args.datafield;
                var cellvalue = args.value;
                var columnindex = args.columnindex;
                var rowBoundIndex = args.rowindex;
                SelectedField = datafield;
                console.log(SelectedField);
            })

            DenominationArray.push(data.Denomination);

            $("#cashin_denomination").jqxWindow("setTitle", 'Cash In Denomination '+data.StationCashierUnique);
        })
    }


    const JqxNumpadArr = {
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

    const MaskMoneyArr = {
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

    //--> Use jqxnumberinput
    var elemId = '';
    var elemLastVal = '';
    var shift = 0;
    $(document).on('click', '.denomination-input-quantity', function(){
        $(".denomination-input-quantity, .denomination-input-total").removeClass('highligted');
        $(".denomination-input-quantity, .denomination-input-total").removeClass('mask-highligted');
        $(".denomination-input-other").removeClass("highligted");
        
        elemId = $(this).attr('id');
        var secondClass = $("#"+elemId).attr('class').split(' ')[1];
        tabindex = secondClass.split('-')[1];
        elemLastVal = 'total_'+elemId.split("_")[2];
        shift = 1;
        $("#"+elemId).addClass('highligted');

        if(POSPaymentNumpad == 1){
            $("#"+elemId).on('valueChanged', function(event){
                var DenominationVal = $("#"+elemId).parent().parent().text();
                var curVal = $("#"+elemId).val();
        
                var MultiplyVal = parseFloat(curVal * DenominationVal).toFixed(2);
                MultiplyVal = MultiplyVal.toString();
                $("#denomination_"+elemLastVal).maskMoney('mask', MultiplyVal );

                $("#denomination_"+elemLastVal).removeClass('invalid-value');

                CashInDenominationGetTotal();
            })

        }else{
            $("#"+elemId).on('valueChanged', function(event){
                var text = event.args.text;
                
                var DenominationVal = $("#"+elemId).parent().parent().text();
                var curVal = $("#"+elemId).val();
        
                var MultiplyVal = (curVal * DenominationVal);
                $("#denomination_"+elemLastVal).val(MultiplyVal);

                $("#denomination_"+elemLastVal).removeClass('invalid-value');
                
                CashInDenominationGetTotal();
            })
        }

        setTimeout(function(){
            $("#"+elemId).jqxNumberInput('focus');
            var input = $("#"+elemId+' input')[0];
            input.setSelectionRange(0,0);
            $("#"+elemId+' input').select();
        },100)
    })

    // Numpad jqx api
    $scope.keypad_function_jqx_number = (number) => {
        $("#"+elemId).jqxNumberInput('focus');
        
        var e = jQuery.Event("keydown", { keyCode: JqxNumpadArr[number] });

        $("#"+elemId+" input").trigger(e);  
        
        var DenominationVal = $("#"+elemId).parent().parent().text();
        var curVal = $("#"+elemId).val();
    
        if(shift == 1){
            var MultiplyVal = parseFloat(curVal * DenominationVal).toFixed(2);
            $("#denomination_"+elemLastVal).val(MultiplyVal);
        }else{
            var MultiplyVal = (curVal / DenominationVal);
            $("#denomination_"+elemLastVal).val(MultiplyVal);
        }

        $("#cashin_denomination_save").prop("disabled", false);

        CashInDenominationGetTotal();
    }

    // Numpad clear all jqx api
    $scope.keypad_function_jqx_clearall = () => {
        $("#"+elemId).removeClass('invalid-value');
        $("#denomination_"+elemLastVal).removeClass('invalid-value');
        $("#denomination_"+elemLastVal).val(0);

        $("#"+elemId).jqxNumberInput('clear');
        setTimeout(function(){
            $("#"+elemId).jqxNumberInput('focus');
            var input = $('#'+elemId+' input')[0];
            input.setSelectionRange(0, 0);
        },100)

        CashInDenominationGetTotal();
    }

    // Numpad decimal jqx api
    $scope.keypad_function_jqx_decimal = () => {
        $("#"+elemId).jqxNumberInput('focus');
        var e = jQuery.Event("keypress", { keyCode: '110' });
        $("#"+elemId+" input").trigger(e);
    }

    // Use jqx api or mask money api 
    // Disabled function
    $(document).on('click', '.denomination-input-total_disabled', function(e){
        $(".denomination-input-quantity, .denomination-input-total").removeClass('highligted');
        $(".denomination-input-quantity, .denomination-input-total").removeClass('mask-highligted');
        elemId = $(this).attr('id');
        elemLastVal = "amount_"+elemId.split("_")[2];
        var secondClass = $("#"+elemId).attr('class').split(' ')[1];
        tabindex = secondClass.split('-')[1];
        shift = 2;
        
        if(POSPaymentNumpad == 1){

            setTimeout(function(){
                $("#"+elemId).focus();
                var input = $("#"+elemId)[0];
                input.setSelectionRange(0,0);
                $("#"+elemId).select();
            },100)

            $("#"+elemId).addClass('mask-highligted');

            $("#"+elemId).on('keypress', function(e){   
                var code = e.keyCode || e.which;
            
                if(shift == 2){
                    var DenominationVal = $("#"+elemId).parent().parent().text();
                    var curVal = $("#"+elemId).val();
                    
                    var MultiplyVal = parseInt(curVal / DenominationVal);
                    $("#denomination_"+elemLastVal).val(MultiplyVal);

                    var rescal1 = (curVal / DenominationVal); 
                    var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                    if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                        if(rescal2 > 0){
                            $("#"+elemId).addClass('invalid-value');
                        }else{
                            $("#"+elemId).removeClass('invalid-value');
                        }
                    }else{
                        if(rescal2 > 0.00){
                            $("#"+elemId).addClass('invalid-value');
                        }else{
                            $("#"+elemId).removeClass('invalid-value');
                        }
                    }

                    CashInDenominationGetTotal();
                }
            })

            $("#"+elemId).on('keydown', function(e){
                var code = e.keyCode || e.which;
                
                if(code === 8){
                    if(shift == 2){
                        var DenominationVal = $("#"+elemId).parent().parent().text();
                        var curVal = $("#"+elemId).val();
                
                        var MultiplyVal = parseInt(curVal / DenominationVal);
                        $("#denomination_"+elemLastVal).val(MultiplyVal);

                        var rescal1 = (curVal / DenominationVal);
                        var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                        if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }else{
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }

                        CashInDenominationGetTotal();
                    }
                }
            })
        }else{
        
            setTimeout(function(){
                $("#"+elemId).jqxNumberInput('focus');
                var input = $("#"+elemId+' input')[0];
                input.setSelectionRange(0,0);
                $("#"+elemId+' input').select();
            },100)

            $("#"+elemId).addClass('highligted');

            $("#"+elemId).on('valueChanged', function(event){
                var text = event.args.text;

                if(shift == 2){
                    var DenominationVal = $("#"+elemId).parent().parent().text();
                    var curVal = $("#"+elemId).val();
            
                    var MultiplyVal = parseInt(curVal / DenominationVal);
                    $("#denomination_"+elemLastVal).val(MultiplyVal);

                    var rescal1 = (curVal / DenominationVal);
                    var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                    if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                        if(rescal2 > 0){
                            $("#"+elemId).addClass('invalid-value');
                        }else{
                            $("#"+elemId).removeClass('invalid-value');
                        }
                    }else{
                        if(rescal2 > 0){
                            $("#"+elemId).addClass('invalid-value');
                        }else{
                            $("#"+elemId).removeClass('invalid-value');
                        }
                    }
                    
                    CashInDenominationGetTotal();
                }
            })
        }
    })

    var tabindex = 1;
    var tabcount = 12;
    $scope.keypad_function_next = () => {
        
        if(tabindex == 25){
            if(POSPaymentNumpad == 1){
                $("#"+elemId).focus();
            }else{
                $("#"+elemId).jqxNumberInput('focus');
            }
            return false;
        }

        tabindex = Number(tabindex) + 1;

        if(tabindex == 13){
            // shift = 2;
            tabindex = 1;
        }

        if(POSPaymentNumpad == 1){
            if(shift == 1){
                $('.tabint-' + tabindex).jqxNumberInput('focus');
                elemId = $('.tabint-' + tabindex).attr('id');
            }else{
                $('.tabint-' + tabindex).focus();
                elemId = $('.tabint-' + tabindex).attr('id');
            }
        }else{
            $('.tabint-' + tabindex).jqxNumberInput('focus');
            elemId = $('.tabint-' + tabindex).attr('id');
        }

        if(shift == 1){
            $("#"+elemId).trigger('click');
            var input = $('#'+elemId+' input')[0];
            input.setSelectionRange(0, 0);
        }else{
            if(POSPaymentNumpad == 1){
                $("#"+elemId).addClass('mask-highligted');
                $("#"+elemId).trigger('click');
            }else{
                $("#"+elemId).addClass('highligted');
                $("#"+elemId).trigger('click');
                var input = $('#'+elemId+' input')[0];
                input.setSelectionRange(0, 0);
            }
        }
    }

    $scope.keypad_function_previous = () => {

        // if(tabindex == 1){
        //     $("#"+elemId).jqxNumberInput('focus');
        //     var input = $('#'+elemId+' input')[0];
        //     input.setSelectionRange(0, 0);
        //     $("#"+elemId+' input').select();
        //     return false;
        // }

        tabindex = Number(tabindex) - 1;

        if(tabindex == 0){
            tabindex = 12;
        }

        if(POSPaymentNumpad == 1){
            $('.tabint-' + tabindex).focus();
            elemId = $('.tabint-' + tabindex).attr('id');
        }else{
            $('.tabint-' + tabindex).jqxNumberInput('focus');
            elemId = $('.tabint-' + tabindex).attr('id');
        }

        if(shift == 1){
            $("#"+elemId).trigger('click');
            var input = $('#'+elemId+' input')[0];
            input.setSelectionRange(0, 0);
        }else{
            if(POSPaymentNumpad == 1){
                $("#"+elemId).addClass('mask-highligted');
                $("#"+elemId).trigger('click');
            }else{
                $("#"+elemId).addClass('highligted');
                $("#"+elemId).trigger('click');
                var input = $('#'+elemId+' input')[0];
                input.setSelectionRange(0, 0);
            }
        }

        if(tabindex == 13){
            tabindex = 12;
            shift = 1;
        }
    }

    $scope.keypad_function_jqx_enter = () => {
        $("#"+elemId).focus();
        var e = jQuery.Event("keypress", { keyCode: 13 });
        $("#"+elemId+' input').trigger(e);
    }

    // Numpad mask money api
    $scope.keypad_function_number = (number) => {
        if(shift == 1){
            $("#"+elemId).focus();
            var e = jQuery.Event("keypress", { keyCode: JqxNumpadArr[number] });
            $("#"+elemId+' input').trigger(e);

            if(elemId == 'denomination_total_other'){
                
                return;
            }

            var DenominationVal = $("#"+elemId).parent().parent().text();
            var curVal = $("#"+elemId).val();

            var MultiplyVal = parseFloat(curVal * DenominationVal).toFixed(2);
            MultiplyVal = MultiplyVal.toString();
            $("#denomination_"+elemLastVal).maskMoney('mask', MultiplyVal );
        }else{
            $("#"+elemId).focus();
            var e = jQuery.Event("keypress", { keyCode: MaskMoneyArr[number] });
            $("#"+elemId).trigger(e);	

            var DenominationVal = $("#"+elemId).parent().parent().text();
            var curVal = $("#"+elemId).val();
            
            var MultiplyVal = parseInt(curVal / DenominationVal);
            $("#denomination_"+elemLastVal).maskMoney('mask', MultiplyVal );     
        }  
    } 

    // Numpad back space mask money api
    $scope.keypad_function_backspace = () => {
        if(shift == 1){
            $("#"+elemId).focus();
            var e = jQuery.Event("keydown", { keyCode: 8 });
            $("#"+elemId+" input").trigger(e);

            if(elemId == 'denomination_total_other'){
                var curVal = $("#"+elemId).val();
                var curTotal = $("#denomination_total_total").val();
                var cashin_total = parseFloat(curTotal) + parseFloat(curVal);
                // $("#denomination_total_total").maskMoney('mask', cashin_total.toString );

                DenominationChanges = true;

                return;
            }else{
                var DenominationVal = $("#"+elemId).parent().parent().text();
                var curVal = $("#"+elemId).val();

                var MultiplyVal = parseFloat(curVal * DenominationVal).toFixed(2);
                MultiplyVal = MultiplyVal.toString();
                $("#denomination_"+elemLastVal).maskMoney('mask', MultiplyVal );
            }
        }else{

            $("#"+elemId).focus();
            var e = jQuery.Event("keydown", { keyCode: 8 });
            $("#"+elemId).trigger(e);

            var DenominationVal = $("#"+elemId).parent().parent().text();
            var curVal = $("#"+elemId).val();

            var MultiplyVal = parseInt(curVal / DenominationVal);
            $("#denomination_"+elemLastVal).val(MultiplyVal);
        }

        CashInDenominationGetTotal();
    }

    // Numpad clear all mask money api
    $scope.keypad_function_clearall = () => {

        if(shift == 1){
            if(elemId == 'denomination_total_other'){
                $("#denomination_"+elemLastVal).maskMoney('mask','0.00');
                $("#"+elemId).jqxNumberInput('clear');

                DenominationChanges = true;
                return;
            }

            $("#denomination_"+elemLastVal).maskMoney('mask','0.00');
            $("#"+elemId).jqxNumberInput('clear');
            setTimeout(function(){
                $("#"+elemId).jqxNumberInput('focus');
                var input = $('#'+elemId+' input')[0];
                input.setSelectionRange(0, 0);
            },100)

        }else{
            $("#denomination_"+elemLastVal).val(0);
            $("#"+elemId).maskMoney('mask', '0.00');
            $("#"+elemId).focus();
            $("#"+elemId).removeClass('invalid-value');
            $("#denomination_"+elemLastVal).removeClass('invalid-value');
        }
        CashInDenominationGetTotal();
    }

    $(document).on('keyup', '.denomination-input-quantity, .denomination-input-other, .denomination-lastbound', function(e) {
        var code = e.keyCode || e.which;

        if (code === 9) { 

            $(".denomination-input-quantity, .denomination-input-total").removeClass('highligted');
            $(".denomination-input-quantity, .denomination-input-total").removeClass('mask-highligted');
            $(".denomination-input-other").removeClass('highligted');
            $(".denomination-input-other").removeClass('mask-highligted');

            elemId = $(this).attr('id');
            var secondClass = $("#"+elemId).attr('class').split(' ')[1];
            tabindex = secondClass.split('-')[1];
            elemLastVal = 'total_'+elemId.split("_")[2];
            shift = 1;
            $("#"+elemId).addClass('highligted');
            console.log("id",elemId, "tabindex", tabindex);

            if(tabindex == 12){
                $("#denomination_amount_hundred").trigger('click');
            }

            // event like when you change value
            if(POSPaymentNumpad == 1){
                $("#"+elemId).on('valueChanged', function(event){
                    var DenominationVal = $("#"+elemId).parent().parent().text();
                    var curVal = $("#"+elemId).val();
            
                    var MultiplyVal = parseFloat(curVal * DenominationVal).toFixed(2);
                    MultiplyVal = MultiplyVal.toString();
                    $("#denomination_"+elemLastVal).maskMoney('mask', MultiplyVal );

                    $("#denomination_"+elemLastVal).removeClass('invalid-value');

                    CashInDenominationGetTotal();
                })
            }else{
                $("#"+elemId).on('valueChanged', function(event){
                    var text = event.args.text;

                    var DenominationVal = $("#"+elemId).parent().parent().text();
                    var curVal = $("#"+elemId).val();
            
                    var MultiplyVal = (curVal * DenominationVal);
                    $("#denomination_"+elemLastVal).val(MultiplyVal);

                    $("#denomination_"+elemLastVal).removeClass('invalid-value');

                    CashInDenominationGetTotal();
                })
            }
        }

        $("#cashin_denomination_save").prop("disabled", false);
    });

    $(document).on('keypress', '.denomination-input-quantity', function(e) {
        var code = e.keyCode || e.which;
    
        if (code === 13) { 
            
            tabindex = Number(tabindex) + 1;

            if(tabindex == 13){
                tabindex = 1;
            }

            $('.tabint-' + tabindex).jqxNumberInput('focus');
            elemId = $('.tabint-' + tabindex).attr('id');
            $("#"+elemId).trigger('click');
        }
    });

    // Disabled
    $(document).on('keyup', '.denomination-input-total_disabled', function(e) {
        var code = e.keyCode || e.which;
        
        if (code === 9) { 
    
            if(tabindex == 26){
                if(POSPaymentNumpad == 1){
                    $("#"+elemId).focus();
                }else{
                    $("#"+elemId).jqxNumberInput('focus');
                }
                return false;
            }

            tabindex = Number(tabindex) + 1;

            $(".denomination-input-quantity, .denomination-input-total").removeClass('highligted');
            $(".denomination-input-quantity, .denomination-input-total").removeClass('mask-highligted');
            elemId = $(this).attr('id');
            elemLastVal = "amount_"+elemId.split("_")[2];
            shift = 2;

            if(POSPaymentNumpad == 1){

                $("#"+elemId).addClass('mask-highligted');
                
                $("#"+elemId).on('keypress', function(e){
                    if(shift == 2){
                        var DenominationVal = $("#"+elemId).parent().parent().text();
                        var curVal = $("#"+elemId).val();   
                
                        var MultiplyVal = parseInt(curVal / DenominationVal);
                        $("#denomination_"+elemLastVal).val(MultiplyVal);

                        var rescal1 = (curVal / DenominationVal); 
                        var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                        if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }else{
                            if(rescal2 > 0.00){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }
                        
                        CashInDenominationGetTotal();
                    }
                })

                $("#"+elemId).on('keydown', function(e){
                    if(shift == 2){
                        var DenominationVal = $("#"+elemId).parent().parent().text();
                        var curVal = $("#"+elemId).val();
                
                        var MultiplyVal = parseInt(curVal / DenominationVal);
                        $("#denomination_"+elemLastVal).val(MultiplyVal);

                        var rescal1 = (curVal / DenominationVal);
                        var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                        if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }else{
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }
                        
                        CashInDenominationGetTotal();
                    }
                })
            }else{

                $("#"+elemId).addClass('highligted');

                $("#"+elemId).on('valueChanged', function(event){
                    var text = event.args.text;

                    if(shift == 2){
                        var DenominationVal = $("#"+elemId).parent().parent().text();
                        var curVal = $("#"+elemId).val();
                
                        var MultiplyVal = parseInt(curVal / DenominationVal);
                        $("#denomination_"+elemLastVal).val(MultiplyVal);

                        var rescal1 = (curVal / DenominationVal);
                        var rescal2 = (rescal1 - parseInt(rescal1)) * DenominationVal;
                        if(DenominationVal == '100' || DenominationVal == '50' || DenominationVal == '20' || DenominationVal == '10' || DenominationVal == '5' || DenominationVal == '2' || DenominationVal == '1'){
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }else{
                            if(rescal2 > 0){
                                $("#"+elemId).addClass('invalid-value');
                            }else{
                                $("#"+elemId).removeClass('invalid-value');
                            }
                        }

                        CashInDenominationGetTotal()
                    }
                })
            }
        }
    })

    // document.addEventListener("keydown", function(event) {
    //     if(event.which == 9){
    //         var denominationFormOpen = $("#cashin_denomination").length;   
    //         if(denominationFormOpen > 0){
    //             var currentElemHighlighted = $(".highligted").attr("class").split(' ')[1];
    //             var currentElemId = $(".highligted").attr("id");
    //             var curTabIndex = currentElemHighlighted.split('-')[1];
    //             if(curTabIndex < 10){

    //                 curTabIndex = Number(curTabIndex) + 1;

    //                 if(POSPaymentNumpad == 1){
    //                     $(".tabint-" + curTabIndex).focus();
    //                 }else{
    //                     $(".tabint-" + curTabIndex).jqxNumberInput('focus');
    //                 }
    //             }else{
    //                 curTabIndex = 1;

    //                 if(POSPaymentNumpad == 1){
    //                     $(".tabint-" + curTabIndex).focus();
    //                 }else{
    //                     $(".tabint-" + curTabIndex).jqxNumberInput('focus');
    //                 }
    //             }
    //         }
    //     }
    // })

    // Computation for Denomination total
    var CashInDenominationGetTotal = () => {
        var cash_in_total_total = 0;

        $(".denomination-input-total").each(function(){
            var id = $(this).attr('id');
            var totalVal = $("#"+id).val();
            cash_in_total_total += Number(totalVal);
        })

        cash_in_total_total = cash_in_total_total + parseFloat($("#denomination_total_other").val());

        DenominationChanges = true;

        $("#denomination_total_total").val( parseFloat(cash_in_total_total).toFixed(2) );
    }

    $(document).on('click', '#cashin_denomination_close', function(e){
        e.preventDefault();
        console.log("here");
        if(DenominationChanges && $("#cashin_denomination_save").is(":enabled")){
            $("#cash_in_denomination_default").hide();
            $("#cash_in_denomination_ask").show();
        }else{
            $("#cashin_denomination").jqxWindow('close');
            // location.reload();
        }
    })

    $(document).on('click', '#cashin_denomination_close_ask', function(e){
        e.preventDefault();
        $("#cashin_denomination").jqxWindow('close');
    })

    // Drawer Manager Cash In function
    $(document).on('click', '#cashin_denomination_save', function(e){
        e.preventDefault();

        var invalid_count = 0;
        $(".invalid-value").each(function(){
            invalid_count++;
        })

        if(invalid_count > 0){
            var msg ='Please check the error below.<br>';
                msg+='<br>';
                msg+='<div style="height: 100px; width: 100%; overflow: hidden;">';
                msg+='<textarea id="cashin_error_list" rows="6" cols="40" style="color: #000; font-size: 16px;">';
            $(".invalid-value").each(function(){
                var id = $(this).attr('id');
                var denomText = $("#"+id).parent().parent().text();
                msg+="Amount must be greater than or equal to 0 and multiple of "+denomText+"\r\n\r\n";
            })
            msg+='</textarea></div>';

            NumpadAlertClose('denomination_error', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
            return;
        }
        
        $("#cashin_denomination_print").attr('disabled', true);

        $("#cashin_denomination_save").attr("disabled", true);

        var TempData = [];
        $(".denomination-input-total").each(function(){
            var id = $(this).attr("id");
            var demval = $("#"+id).val();
            var DenominationVal = $("#"+id).parent().parent().text(); 
            TempData.push({"Denomination" : DenominationVal.trim(), "Total": demval });
        })

        console.log('ddd',DrawerManagerHistoryCount,
            DrawerManagerCount,
            DrawerManagerState);

        if(DrawerManagerHistoryCount){
            DrawerManagerHistoryDenominationCountSave(TempData);
            return;
        }

        if(DrawerManagerCount){
            DrawerManagerDenominationCountSave(TempData);
            return false;
        }

        if(DrawerManagerState){
            DrawerManager_Denomination_Save(TempData);
            return false;
        }

        console.log("ll",DrawerManagerCashIn);
        if(DrawerManagerCashIn){
            DrawerManagerCashInDenomination(TempData);
            return;
        }

        var postdata ="Denomination="+JSON.stringify(TempData);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
        posData.CashInDenominationSave(postdata)
        .success(function(data){
            LoadHeaderInfo();
            $("#cashin_denomination").jqxWindow("setTitle", "Cash In Denomination "+data.StationCashierUnique);
            setTimeout(function(){
                $("#cashin_denomination_print").attr('disabled', false);
                $("#cashin_denomination_save").attr("disabled",true);

                posData.GetManagerDrawerLocationList()
                .success(function(data){
                    if( $("#drawer_sessions").length > 0 ){
                        DrawerManagerGrid(data);
                    }
                })
            },1000)
            // location.reload();
        })
    }) 

    var DrawerManagerCashInDenomination = (TempData) => {
        var def = $.Deferred();
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

        var postdata ="Denomination="+JSON.stringify(TempData);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&StationCashierUnique="+ (rowdata.StationCashierUnique ? rowdata.StationCashierUnique : ''); 
            postdata+="&StationUnique="+ (rowdata.StationUnique ? rowdata.StationUnique : '');
            postdata+="&LocationUnique="+ (rowdata.LocationUnique ? rowdata.LocationUnique : '');
        posData.DrawerManagerCashInDenomination(postdata)
        .success(function(data){
            $("#cashin_denomination").jqxWindow("setTitle", "Cash In Denomination "+data.StationCashierUnique);
            setTimeout(function(){
                $("#cashin_denomination_print").attr('disabled', false);
                $("#cashin_denomination_save").attr("disabled",true);

                $("#DrawerManagerCount, #DrawerManagerReconcile, #DrawerManagerPrint").jqxButton({disabled: false});

                DenominationChanges = false;

                posData.GetManagerDrawerLocationList()
                .success(function(data){
                    DrawerManagerGrid(data);
                    def.resolve();
                })
            },1000)
        })
        return def.promise();
    }

    var DrawerManagerCashInDenominationPrint = (Denodata) => {

        if(DenominationChanges && $("#cashin_denomination_save").is(":enabled")){
            DrawerManagerCashInDenomination(Denodata)
            .then(function(){
                var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
                var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
                var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
                var postdata ="LocationUnique="+ (rowdata.LocationUnique ? rowdata.LocationUnique : '');
                    postdata+="&StationUnique="+ (rowdata.StationUnique ? rowdata.StationUnique : '');
                    postdata+="&CashInMethod=" + rowdata.CashInMethod;
                    postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
                    postdata+="&Denomination="+JSON.stringify(Denodata);
                    postdata+="&DenominationOther="+ $("#denomination_total_other").val();
                    postdata+="&StationName=" + (rowdata.StationName ? rowdata.StationName : '');
                    postdata+="&UserUnique=" + DrawerManagerUserUnique;
                
                posData.DrawerManagerCashInDenominationPrint(postdata)
                .success(function(data){    
                    if(data.print == false){
                        var msg="Printer error, please check <br/>";
                            msg+="1. Printer is turned on. <br/>";
                            msg+="2. Check printer paper. <br/>";
                            msg+="3. Restart printer.";
                        NumpadAlertClose('daily_sales_no_data', msg)
                        .then(function(){
                            WindowPopupAlert('Printer problem');
                        })
                    }
                    setTimeout($.unblockUI, 100);
                })
            })

            return false;
        }

        
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
        var postdata ="LocationUnique="+ (rowdata.LocationUnique ? rowdata.LocationUnique : '');
            postdata+="&StationUnique="+ (rowdata.StationUnique ? rowdata.StationUnique : '');
            postdata+="&CashInMethod=" + rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&StationName=" + (rowdata.StationName ? rowdata.StationName : '');
            postdata+="&UserUnique=" + DrawerManagerUserUnique;
        
        posData.DrawerManagerCashInDenominationPrint(postdata)
        .success(function(data){    
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }
            $("#cashin_denomination_print").attr('disabled', false);
            setTimeout($.unblockUI, 100);
        })
    }

    $(document).on('click', '#cashin_denomination_save_ask', function(e){
        $("#cashin_denomination_save").trigger('click');

        setTimeout(function(){
            $("#cashin_denomination").jqxWindow('close');
        },1000)
    })

    $(document).on('click', '#cashin_denomination_save_ask_old', function(e){
        e.preventDefault();
        $("#cashin_denomination_save").attr("disabled",true);
        var TempData = [];
        var $this =  $("#CashInDenominationPlugin");
        var row = $($this).jqxGrid('getrows');
        for(i=0; i < row.length; i++){
            var StationCashierUnique = row[i].StationCashierUnique;
            var Denomination = row[i].DenominationIndex;
            var Extended = row[i].Extended;
            TempData.push({"StationCashierUnique" : StationCashierUnique, "Denomination" : Denomination, "Extended" : Extended});
        }
       
        var postdata ="Denomination="+JSON.stringify(TempData);
        posData.CashInDenominationSave(postdata)
        .success(function(data){
            LoadHeaderInfo();
            $("#cashin_denomination").jqxWindow("setTitle", "Cash In Denomination "+data.StationCashierUnique);
            setTimeout(function(){
                $("#cashin_denomination_save").attr("disabled",false);
            },1000)
        })
        $("#cashin_denomination").jqxWindow('close');
    })

    $(document).on('click', '#cashin_denomination_print', function(e){
        e.preventDefault();
        $("#cashin_denomination_print").prop("disabled", true);

        var invalid_count = 0;
        $(".invalid-value").each(function(){
            invalid_count++;
        })

        if(invalid_count > 0){
            var msg ='Please check the error below.<br>';
                msg+='<br>';
                msg+='<div style="height: 100px; width: 100%; overflow: hidden;">';
                msg+='<textarea id="cashin_error_list" rows="6" cols="40" style="color: #000; font-size: 16px;">';
            $(".invalid-value").each(function(){
                var id = $(this).attr('id');
                var denomText = $("#"+id).parent().parent().text();
                msg+="Amount must be greater than or equal to 0 and multiple of "+denomText+"\r\n\r\n";
            })
            msg+='</textarea></div>';

            NumpadAlertClose('denomination_error', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })

            $("#cashin_denomination_print").prop("disabled", false);

            return;
        }

        var printmsg = "Printing receipt"+"<br/>";
        $.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: printmsg,
            baseZ: 99999,
        });

        var TempData = [];
        $(".denomination-input-total").each(function(){
            var id = $(this).attr("id");
            var demval = $("#"+id).val();
            var DenominationVal = $("#"+id).parent().parent().text();
            TempData.push({"Denomination" : DenominationVal, "Total": demval });
        })


        console.log(
            DrawerManagerCount,
            DrawerManagerState,
            DrawerManagerCashIn);

        if(DrawerManagerCount){
            DrawerManager_Denomination_Count_Print(TempData);
            return false;
        }

        if(DrawerManagerState){
            DrawerManager_Denomination_Print(TempData);
            return false;
        }

        if(DrawerManagerCashIn){
            DrawerManagerCashInDenominationPrint(TempData);
            return false;
        }

        if(DrawerManagerHistoryCount){
            DrawerManager_Denomination_Count_Print(TempData);
            return false;
        }

        var postdata ="Denomination="+JSON.stringify(TempData);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
        posData.CashInDenominationPrint(postdata)
        .success(function(data){
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }
            LoadHeaderInfo();
            $("#cashin_denomination").jqxWindow("setTitle", "Cash In Denomination "+data.StationCashierUnique);
            DenominationChanges = false;
            setTimeout($.unblockUI, 100);
            $("#cashin_denomination_print").prop("disabled", false);
            if(DenominationChanges){
                $("#cashin_denomination_save").trigger('click');
            }
        })
    })

    /*
    |--------------------------------------------------------------------
    | Cash Out Employee Sales Report
    |--------------------------------------------------------------------
    */
    $("#cash_out_employee_sales").on('close', function(e){
        e.preventDefault();
        $("#cash_out_employee_sales_container").remove();
    })
    var populateCashOutEmployeeSales = function(form_name, msg){
        var def = $.Deferred();
        $("#cash_out_employee_sales").append('<div id="cash_out_employee_sales_container" style="background: #144766; color:#EEE;"></div>');
        $("#cash_out_employee_sales_container").html('');
        $("#cash_out_employee_sales_container").append(
            '<div style="width:100%;">'+
                '<div style="float:left; margin-right: 5px;">'+
                    '<span>Date From:</span>'+
                    '<div id="cashout_employee_sales_daterange_from"></div>'+
                '</div>'+
                '<div style="float:left; margin-right: 5px">'+
                    '<span>Date To:</span>'+
                    '<div id="cashout_employee_sales_daterange_to"></div>'+
                '</div>'+
                '<div style="float:left; margin-right: 5px">'+
                    '<span>&nbsp;</span>'+
                    '<div id="cashout_employee_sales_option"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-primary btn-lg" id="cashout_employee_sales_search"><span class="glyphicon glyphicon-search"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-warning btn-lg" id="cashout_employee_sales_print"><span class="glyphicon glyphicon-print"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-danger btn-lg" id="cashout_employee_sales_close"><span class="glyphicon glyphicon-remove"></span></button>'+
                '<div>'+
            '</div>'
        );
        $("#cash_out_employee_sales_container").append(
            '<div style="float:left; width: 100%;">'+
                '<div id="cashout_employee_sales_history" style="display:none;"></div>'+
                '<div id="employee_sales_details2"></div>'+
            '</div>'
        );

        EmployeeSalesReportLoadGrid()
        .then(function(){
            //CashOutEmployeeSalesReport();
        })

        var EmployeeSalesOption = [
            {"Unique" : 1, "Name" : "Sales Summary"},
            {"Unique" : 2, "Name" : 'Sales Detail'}
        ];
        var source = {
            datatype: "json",
            datafields: [
                { name: 'Unique' },
                { name: 'Name' }
            ],
            localdata: EmployeeSalesOption,
            async: false
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#cashout_employee_sales_option").jqxComboBox({selectedIndex: 0, source: dataAdapter, displayMember: "Name", valueMember: "Unique", width: 150, height: 40});
        $("#cashout_employee_sales_daterange_from").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
        $("#cashout_employee_sales_daterange_to").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
       
        var Option = $("#cashout_employee_sales_option").jqxComboBox('val');
        setTimeout(function(){
            var daterange_from = $("#cashout_employee_sales_daterange_from").val();
            var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
            var postdata ="datefrom="+daterange_from;
                postdata+="&dateto="+daterange_to;
            posData.EmployeeSalesSummary(postdata)
            .success(function(data){
                var source = {
                    datatype: "json",
                    localdata: data.Employee
                }
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#employee_sales_details2").jqxGrid({
                    source: dataAdapter,
                    width: '100%',
                    autoheight: true,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    pagesize: 100,
                    showfilterrow: true,
                    filterable: true,
                    filterMode: 'advance',
                    showaggregates: true,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columns: EmployeeSalesGridColumns,
                    rowsheight: GridRowHeight,
                })
            })
        },500);

        setTimeout(function(){
            def.resolve();
        },100);
        return def.promise();
    }

    var EmployeeSalesReportLoadGrid = function(){
        var def = $.Deferred();
        var source = {
            dataType: "json",
            dataFields: EmployeeSalesColTypes[0],
            localdata: {}
        }
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#employee_sales_details2").jqxGrid({
            source: dataAdapter,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: 'ui-light',
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            rowsheight: GridRowHeight,
            columns: EmployeeSalesGridColumns,
        })
        setTimeout(function(){
            def.resolve();
        },100)
        return def.promise();
    }

    $(document).on('select', '#cashout_employee_sales_option', function(event){
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var daterange_from = $("#cashout_employee_sales_daterange_from").val();
                var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
                var postdata ="datefrom="+daterange_from;
                    postdata+="&dateto="+daterange_to;
                if(item.value == 1){
                    $("#employee_sales_details2").show();
                    $("#cashout_employee_sales_history").hide();
                    setTimeout(function(){
                        posData.EmployeeSalesSummary(postdata)
                        .success(function(data){
                            var source = {
                                datatype: "json",
                                localdata: data.Employee
                            }
                            var dataAdapter = new $.jqx.dataAdapter(source);
                            $("#employee_sales_details2").jqxGrid({
                                source: dataAdapter
                            })
                        })
                    },100);

                }else if(item.value == 2){
                    CashOutEmployeeSalesReport()
                    .then(function(data){
                        $("#cashout_employee_sales_history").show();
                        $("#employee_sales_details2").hide();
                        setTimeout(function(){
                            posData.CashOutEmployeeSearch(postdata)
                            .success(function(data){
                                if(data.result){
                                    var source = {
                                        dataType: "json",
                                        localdata: data.result
                                    };
                                    var dataAdapter = new $.jqx.dataAdapter(source);
                                    $("#cashout_employee_sales_history").jqxGrid({
                                        source: dataAdapter
                                    })
                                }
                            })
                        },100);
                    });
                }
            }
        }
    })

    var WindowPopupCashOutEmployeeSales = function(header_text){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth 	        = $("#fakeheight").width();
            var ResoHeight 	        = $("#fakeheight").height();
            var ComputeHeight		= ResoHeight - 50;
            var CustomerSearch 		= ComputeHeight - 40;
            var UseHeight			= CustomerSearch;
            var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
            $("#cash_out_employee_sales").jqxWindow({
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
                $('#cash_out_employee_sales').jqxWindow('setTitle', header_text);
                $('#cash_out_employee_sales').jqxWindow('open');
            },100);
            def.resolve();	
        },100);
        return def.promise();
    }

    var NumpadCashOutEmployeeSales = function(form, msg){
		var def = $.Deferred();
		populateCashOutEmployeeSales(form, msg)
		.then(function(){
			def.resolve();
		});
		return def.promise();
	}

    /*
    |------------------------------------------------------------------
    | Cash Out Employee Sales Grid
    |------------------------------------------------------------------
    */ 
    var CashOutEmployeeSalesReport = function(){
        var def = $.Deferred();
        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 60;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
        $("#cashout_employee_sales_history").jqxGrid({
            width: "100%",
            height: UseHeight,
            columnsresize: true,
            theme: GridTheme,
            sortable: true,
            pageSize: ComputeDisplayRow,
            scrollbarsize: 25,
            altRows: true,
            showfilterrow: true,
            filterable: true,
            showstatusbar: true,
            statusbarheight: 30,
            showAggregates: true,
            columns: EmployeeSalesDetailGridColumns,
        })
        return new Promise(function(resolve, reject){
            resolve()
        })
    }

    /*
    function createGrid(data, gridSelector, onRowDoubleClick, isEditable){
        // first lets make the fields
        const dataProps = Object.keys(data[0])
        
        const createGridColumn = (columnName, width=100) => ({
            text: columnName,
            datafield: columnName,
            width
        })
        
        const columns = dataProps.map(val => createGridColumn(val))
        const datafields = dataProps.map(val => createGridField(val))
        
        const source = {
            localdata: [...data],
            datatype: "array",
            datafields
        }
        
        const adapter = new $.jqx.dataAdapter(source, {
            autoBind: true,
            loadComplete: data => data,
            loadError: e => console.error(e)
        })
        
        $(gridSelector).jqxGrid({
            width: '100%',
            source: adapter,
            columns,
            columnsresize: true,
            theme: 'energyblue',
            sortable: true,
            filterable: true,
            editable: Boolean(isEditable)
        })
        
        $(gridSelector).bind('rowclick',
        // TODO: handle selecting a gridRow
        e => onRowDoubleClick(e))
    }
    */

    $scope.CashOutEmployeeSales = function(){
        NumpadCashOutEmployeeSales('employee_sales', 'Employee Sales')
        .then(function(){
            WindowPopupCashOutEmployeeSales('Employee Sales Report');
        })
    }

    $(document).on("click", "#cashout_employee_sales_search", function(e){
        e.preventDefault();
        var Option = $("#cashout_employee_sales_option").jqxComboBox('val');
        var daterange_from = $("#cashout_employee_sales_daterange_from").val();
        var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
        var postdata = "datefrom="+daterange_from;
            postdata+= "&dateto="+daterange_to;
        if(Option == 1){
            setTimeout(function(){
                $('#employee_sales_details2').jqxGrid('clear');
                posData.EmployeeSalesSummary(postdata)
                .success(function(data){
                    var source = {
                        datatype: "json",
                        localdata: data.Employee
                    }
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#employee_sales_details2").jqxGrid({
                        source: dataAdapter
                    })
                })
            },1000);
        }else if(Option == 2){
            $('#cashout_employee_sales_history').jqxGrid('clear');
            setTimeout(function(){
                posData.CashOutEmployeeSearch(postdata)
                .success(function(data){
                    if(data.result){
                        var source = {
                            dataType: "json",
                            localdata: data.result
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#cashout_employee_sales_history").jqxGrid({
                            source: dataAdapter
                        })
                    }
                })
            },1000);
        }
    })

    var CashOutEmployeeSalesSearchBeforePrint = function(){
        var def = $.Deferred();
        var Option = $("#cashout_employee_sales_option").jqxComboBox('val');
        var daterange_from = $("#cashout_employee_sales_daterange_from").val();
        var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
        var postdata = "datefrom="+daterange_from;
            postdata+= "&dateto="+daterange_to;
        if(Option == 1){
            setTimeout(function(){
                $('#employee_sales_details2').jqxGrid('clear');
                posData.EmployeeSalesSummary(postdata)
                .success(function(data){
                    var source = {
                        datatype: "json",
                        localdata: data.Employee
                    }
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#employee_sales_details2").jqxGrid({
                        source: dataAdapter
                    })
                    def.resolve();
                })
            },1000);
        }else if(Option == 2){
            $('#cashout_employee_sales_history').jqxGrid('clear');
            setTimeout(function(){
                posData.CashOutEmployeeSearch(postdata)
                .success(function(data){
                    if(data.result){
                        var source = {
                            dataType: "json",
                            localdata: data.result
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#cashout_employee_sales_history").jqxGrid({
                            source: dataAdapter
                        })
                    }
                    def.resolve();
                })
            },1000);
        }
        $scope.cashout_employee_sales_daterange_from_change = false;
        $scope.cashout_employee_sales_daterange_to_change = false;

        return def.promise();
    }

    $scope.cashout_employee_sales_daterange_from_change = false;
    $scope.cashout_employee_sales_daterange_to_change = false;
    $(document).on('change', '#cashout_employee_sales_daterange_from', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; 
        $scope.cashout_employee_sales_daterange_from_change = true;
    })

    $(document).on('change', '#cashout_employee_sales_daterange_to', function(event){
        var jsDate = event.args.date; 
        var type = event.args.type; 
        $scope.cashout_employee_sales_daterange_to_change = true;
    })

    $(document).on('click', '#cashout_employee_sales_print', function(e){
        e.preventDefault();

        if($scope.cashout_employee_sales_daterange_from_change == true || $scope.cashout_employee_sales_daterange_to_change == true){
            CashOutEmployeeSalesSearchBeforePrint()
            .then(function(){
                CashOutEmployeeSalesPrintChange();
            })
            return false;
        }
        var Option = $("#cashout_employee_sales_option").jqxComboBox('val');
        var daterange_from = $("#cashout_employee_sales_daterange_from").val();
        var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
        var postdata = "datefrom="+daterange_from;
            postdata+= "&dateto="+daterange_to;

        if(Option == 1){
            var employee = $("#employee_sales_details2").jqxGrid('getrows');
                postdata+="&EmployeeSales="+JSON.stringify(employee);
            if(employee.length > 0){
                posData.EmployeeSalesSummaryPrint(postdata)
                .success(function(data){
                    if(data.print){
                        //Print receipt
                    }else{ 
                        var msg = data.msg;
                        NumpadAlertClose('daily_sales_no_data', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }
        }else if(Option == 2){
            posData.CashOutEmployeePrint(postdata)
            .success(function(data){
                if(data.print){
                    //Print receipt
                }else{
                    NumpadAlertClose('employee_sales_print_error', data.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }
        $scope.cashout_employee_sales_daterange_from_change = false;
        $scope.cashout_employee_sales_daterange_to_change = false;
    })

    var CashOutEmployeeSalesPrintChange = function(){
        var Option = $("#cashout_employee_sales_option").jqxComboBox('val');
        var daterange_from = $("#cashout_employee_sales_daterange_from").val();
        var daterange_to   = $("#cashout_employee_sales_daterange_to").val();
        var postdata = "datefrom="+daterange_from;
            postdata+= "&dateto="+daterange_to;

        if(Option == 1){
            var employee = $("#employee_sales_details2").jqxGrid('getrows');
                postdata+="&EmployeeSales="+JSON.stringify(employee);
            if(employee.length > 0){
                posData.EmployeeSalesSummaryPrint(postdata)
                .success(function(data){
                    if(data.print){
                        //Print receipt
                    }else{ 
                        var msg = data.msg;
                        NumpadAlertClose('daily_sales_no_data', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                })
            }
        }else if(Option == 2){
            posData.CashOutEmployeePrint(postdata)
            .success(function(data){
                if(data.print){
                    //Print receipt
                }else{
                    NumpadAlertClose('employee_sales_print_error', data.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
        }
    }

    $(document).on('click', "#cashout_employee_sales_close", function(e){
        e.preventDefault();
        $('#cash_out_employee_sales').jqxWindow('close');
        $scope.cashout_employee_sales_daterange_from_change = false;
        $scope.cashout_employee_sales_daterange_to_change = false;
    })

    /*
	|-----------------------------------------------------------|
	| DAILY SALES SUMMARY
	|-----------------------------------------------------------|
	*/
	var DailySalesGridColumns = [];
	var DailySalesColTypes = [];
	var DailySalesColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesSummary";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    } else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						DailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						DailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			DailySalesColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
	}
    
    /*
	|-----------------------------------------------------------|
	| GIFT CARD SALES
	|-----------------------------------------------------------|
	*/
	var GiftCardGridColumns = [];
	var GiftCardColTypes = [];
	var GiftCardColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesGiftCard";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    }else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						GiftCardGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						GiftCardGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						GiftCardGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						GiftCardGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			GiftCardColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    
    
    /*
	|-----------------------------------------------------------|
	| STORE CREDIT SALES
	|-----------------------------------------------------------|
	*/
	var StoreCreditGridColumns = [];
	var StoreCreditColTypes = [];
	var StoreCreditColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesStoreCredit";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    } else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						StoreCreditGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						StoreCreditGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						StoreCreditGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						StoreCreditGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			StoreCreditColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    
    /*
	|-----------------------------------------------------------|
	| Daily Sales Payments
	|-----------------------------------------------------------|
	*/
	var PaymentsGridColumns = [];
	var PaymentsColTypes = [];
	var PaymentsColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesPayment";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    } else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						PaymentsGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						PaymentsGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						PaymentsGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						PaymentsGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			PaymentsColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    

    /*
    |-----------------------------------------------------------|
    | Employee Sales Summary
    |-----------------------------------------------------------|
    */
    var addCommas = function(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    //-->Employee Sales Report (Sales Details)
    var EmployeeSalesDetailGridColumns = [];
	var EmployeeSalesDetailColTypes = [];
	var EmployeeSalesDetailColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportEmployeeSalesDetail";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999 && value.cellsformat !=null) {
                        return '<span style="margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    }
                    else {
                        return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						EmployeeSalesDetailGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						EmployeeSalesDetailGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						EmployeeSalesDetailGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						EmployeeSalesDetailGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			EmployeeSalesDetailColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    

	var EmployeeSalesGridColumns = [];
	var EmployeeSalesColTypes = [];
	var EmployeeDailySalesDetailColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesEmployeeSummary";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    } else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }

				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						EmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						EmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						EmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						EmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			EmployeeSalesColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    
    /*
	|-----------------------------------------------------------|
	| DAILY SALES SUMMARY
	|-----------------------------------------------------------|
	*/
	var DepositDailySalesGridColumns = [];
	var DepositDailySalesColTypes = [];
	var DepositDailySalesColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailySalesDeposit";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    } else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						DepositDailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DepositDailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						DepositDailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DepositDailySalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			DepositDailySalesColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }

    /*
	|-----------------------------------------------------------|
	| DAILY STORE EMPLOYEE SALES
	|-----------------------------------------------------------|
	*/
	var DailyStoreEmployeeSalesGridColumns = [];
	var DailyStoreEmployeeSalesColTypes = [];
	var DailyStoreEmployeeSalesColumns = function(){
        var def = $.Deferred();
        var postdata ="FormName=ReceiptReportDailyStoreEmployeeSales";
		posData.DynamicTypesColumns(postdata)
		.success(function(data){
			$.each(data.gridcols, function(index, value){
                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                    if (value > 999) {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign+'; color: #000000">' + addCommas(value) + '</span>';
                    }else {
                        return '<span style="font-weight: bold; margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000">' + value + '</span>';
                    }
                }
				if(value.aggregates == 1){
					if(value.columntype == 'numberinput'){//Number Input
						DailyStoreEmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
							},
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DailyStoreEmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
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
					}
				}else{
					if(value.columntype == 'numberinput'){//Number Input
						DailyStoreEmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat,
							columntype: 'numberinput',
							createeditor: function (row, cellvalue, editor, cellText, width, height) {
								editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false});
							} 
						})
					}else{
						DailyStoreEmployeeSalesGridColumns.push({ text: value.text, datafield: value.datafield, cellsrenderer: cellsrenderer, columngroup: value.columngroup, width: value.width, hidden: value.hidden, filtertype: value.filtertype, align: value.align, cellsalign: value.cellsalign, cellsformat: value.cellsformat})
					}
				}
			})
			DailyStoreEmployeeSalesColTypes.push(data.gridtype);
			def.resolve();
		})
		return def.promise();
    }
    

    var DailySalesReport = function(){
        var def = $.Deferred();
        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 70;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
        $("#daily_sales_summary_grid").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            columns: DailySalesGridColumns,
            rowsheight: GridRowHeight,
        })

        $("#gift_card_grid").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            columns: GiftCardGridColumns,
            rowsheight: GridRowHeight,
        })

        $("#store_credit_grid").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            columns: StoreCreditGridColumns,
            rowsheight: GridRowHeight,
        })

        $("#payments_grid").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            columns: PaymentsGridColumns,
            rowsheight: GridRowHeight,
        })

        $("#employee_sales_details").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: GridRowHeight,
            columns: EmployeeSalesGridColumns,
            rowsheight: GridRowHeight,
        })

        $("#daily_sales_deposit").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DepositDailySalesGridColumns,
            rowsheight: GridRowHeight,
        })

        setTimeout(function(){
            def.resolve();
        },100);
        return def.promise();
    }

    var populateDailySalesReport = function(){
        var def = $.Deferred();
        $("body").append(
            '<div id="daily_sales_report" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="daily_sales_report_container" style="background: #144766; color:#EEE;">'+
                    '<div id="DailySalesFunctionButton" style="width:100%; margin-bottom:5px; overflow:hidden;">'+
                        '<div style="float:left; margin-right: 5px;">'+
                            '<span>Date From:</span>'+
                            '<div id="dailysales_daterange_from"></div>'+
                        '</div>'+
                        '<div style="float:left; margin-right: 5px">'+
                            '<span>Date To:</span>'+
                            '<div id="dailysales_daterange_to"></div>'+
                        '</div>'+
                        '<div style="float:left; margin-right: 5px;">'+
                            '<span>Location:</span>'+
                            '<div id="daily_sales_location"></div>'+
                        '</div>'+
                        '<div style="float:left; width: 200px;">'+
                            '<button style="margin: 13px 0 0 5px;" class="btn btn-primary btn-lg" id="dailysales_search"><span class="glyphicon glyphicon-search"></span></button>'+
                            '<button style="margin: 13px 0 0 5px;" class="btn btn-warning btn-lg" id="dailysales_print"><span class="glyphicon glyphicon-print"></span></button>'+
                            '<button style="margin: 13px 0 0 5px;" class="btn btn-danger btn-lg" id="dailysales_close"><span class="glyphicon glyphicon-remove"></span></button>'+
                        '<div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        $("#daily_sales_report_container").append(
            '<div id="DailySalesReportGridContainer" style="height: auto;">'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="daily_sales_summary_grid"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="gift_card_grid"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="store_credit_grid"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="payments_grid"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="employee_sales_details"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="daily_store_employee_sales"></div>'+
                '</div>'+
                '<div style="float:left; width: 100%; margin-bottom:5px;">'+
                    '<div id="daily_sales_deposit"></div>'+
                '</div>'+
            '</div>'
        );

        $("#dailysales_daterange_from").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy hh:mm tt", showTimeButton: true });
        $("#dailysales_daterange_to").jqxDateTimeInput({ width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy hh:mm tt", showTimeButton: true });
        $("#dailysales_daterange_to").jqxDateTimeInput('setDate', new Date(yyyy, mm, dd, 23, 59) );
        
        // DailySalesReport()
        // .then(function(){
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
            $("#daily_sales_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: '250', height: '40px'});
            $("#daily_sales_location").val(data.curLocation);

            DailySalesReportGenerate();
            def.resolve();
        })
        // })
        return def.promise();
    }

    var WindowPopupDailySalesReport = function(){
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth 	        = $("#fakeheight").width();
            var ResoHeight 	        = $("#fakeheight").height();
            var ComputeHeight		= ResoHeight - 50;
            var CustomerSearch 		= ComputeHeight - 40;
            var UseHeight			= CustomerSearch;
            var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
            var DailySalesFnBtn     = $("#DailySalesFunctionButton").height();
            var GridContainer       = (ResoHeight - 120);
            $("#daily_sales_report").jqxWindow({
                Height: ResoHeight,
                minWidth: '100%',
                isModal: true,
                theme: 'darkblue',
                title: 'Daily Sales Report',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            
            setTimeout(function(){
                $('#daily_sales_report').jqxWindow('open');
                $("#DailySalesReportGridContainer").css({height: GridContainer});
                
                $("#daily_sales_report").on('close', function(e){
                    $("#daily_sales_summary_grid, #gift_card_grid, #store_credit_grid, #payments_grid, #employee_sales_details, #daily_store_employee_sales, #daily_sales_deposit").jqxGrid('destroy');
                    $("#dailysales_daterange_from, #dailysales_daterange_to, #dailysales_daterange_to").jqxDateTimeInput('destroy');
                    $("#daily_sales_location").jqxComboBox('destroy');
                    $("#daily_sales_report").remove();
                    $scope.dailysales_daterange_from_change = false;
                    $scope.dailysales_daterange_from_change = false;
                })

            },100);
            def.resolve();	
        },100);
        return def.promise();
    }

    var NumpadDailySalesReport = function(){
		var def = $.Deferred();
		populateDailySalesReport()
		.then(function(){
			def.resolve();
		});
		return def.promise();
    }
    
    $scope.DailySalesSummary = function(){
        NumpadDailySalesReport()
        .then(function(){
            WindowPopupDailySalesReport()
            .then(function(){
                setTimeout(function(){
                    $("#dailysales_search").trigger('click');
                },100)
            })
        })
    }

    $(document).on('click', '#dailysales_search', function(e){
        e.preventDefault();

        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 70;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

        var datefrom = $("#dailysales_daterange_from").val();
        var dateto   = $("#dailysales_daterange_to").val();
        var postdata ="datefrom="+datefrom;
            postdata+="&dateto="+dateto;
        posData.DailySalesReport(postdata)
        .success(function(data){
            ReceiptReportDailySalesSummarySearch(data.DailySales);
            ReceiptReportGiftCardSalesSearch(data.GiftCard);
            ReceiptReportStoreCreditSalesSearch(data.StoreCredit);
            ReceiptReportPaymentsSearch(data.Payments);
            ReceiptReportEmployeeSalesDetailsSearch(data.Employee);
            ReceiptReportDailySalesDepositSearch(data.Deposits);
            ReceiptReportDailyStoreEmployeeSalesSearch(data.StoreEmployee);
        })

        $scope.dailysales_daterange_from_change = false;
        $scope.dailysales_daterange_from_change = false;
    })

    var DailySalesSearchBeforePrint = function(){
        var def = $.Deferred();

        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 70;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

        var datefrom = $("#dailysales_daterange_from").val();
        var dateto   = $("#dailysales_daterange_to").val();
        var postdata ="datefrom="+datefrom;
            postdata+="&dateto="+dateto;
        posData.DailySalesReport(postdata)
        .success(function(data){
            ReceiptReportDailySalesSummarySearch(data.DailySales);
            ReceiptReportGiftCardSalesSearch(data.GiftCard);
            ReceiptReportStoreCreditSalesSearch(data.StoreCredit);
            ReceiptReportPaymentsSearch(data.Payments);
            ReceiptReportEmployeeSalesDetailsSearch(data.Employee);
            ReceiptReportDailySalesDepositSearch(data.Deposits);
            ReceiptReportDailyStoreEmployeeSalesSearch(data.StoreEmployee);
            def.resolve();
        })
        return def.promise();
    }

    $scope.dailysales_daterange_from_change = false;
    $scope.dailysales_daterange_from_change = false;
    $(document).on('change', '#dailysales_daterange_from', function (event) {  
        var jsDate = event.args.date; 
        var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
        $scope.dailysales_daterange_from_change = true;
        console.log("datefrom",type);
    }); 

    $(document).on('change', '#dailysales_daterange_to', function (event) {  
        var jsDate = event.args.date; 
        var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
        $scope.dailysales_daterange_from_change = true;
    }); 

    var daily_sales_report_print_after_search = function(){
        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px' 
        }, message: 'Printing receipt...',
            baseZ: 99999,
        });

        var dailySales      = $("#daily_sales_summary_grid").jqxGrid('getrows');
        var giftcardSales   = $("#gift_card_grid").jqxGrid('getrows');
        var storecreditSales= $("#store_credit_grid").jqxGrid('getrows');
        var payments        = $("#payments_grid").jqxGrid('getrows');
        var employee        = $("#employee_sales_details").jqxGrid('getrows');
        var deposits        = $("#daily_sales_deposit").jqxGrid('getrows');
        var store_emp_sales = $("#daily_store_employee_sales").jqxGrid('getrows');
        var datefrom        = $("#dailysales_daterange_from").val();
        var dateto          = $("#dailysales_daterange_to").val();
        var location        = $("#daily_sales_location").val();

        var postdata ='datefrom='+datefrom;
            postdata+='&dateto='+dateto;
            postdata+="&location="+location;
        if(dailySales.length > 0){
            postdata+="&DailySales="+JSON.stringify(dailySales);
        }

        if(giftcardSales.length > 0){
            postdata+="&GiftCardSales="+JSON.stringify(giftcardSales);
        }

        if(storecreditSales.length > 0){
            postdata+="&StoreCredit="+JSON.stringify(storecreditSales);
        }

        if(payments.length > 0){
            postdata+="&Payments="+JSON.stringify(payments);
        }

        if(employee.length > 0){
            postdata+="&EmployeeSales="+JSON.stringify(employee);
        }

        if(deposits.length > 0){
            postdata+="&Deposits="+JSON.stringify(deposits);
        }

        if(store_emp_sales.length > 0){
            postdata+="&StoreEmployeeSales="+JSON.stringify(store_emp_sales);
        }

        if(dailySales.length > 0 || giftcardSales.length > 0 || storecreditSales.length > 0){
            posData.DailySalesSummaryReportPrint(postdata)
            .success(function(data){
                if(data.print){

                }else{ 
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertClose('daily_sales_no_data', msg)
                    .then(function(){
                        WindowPopupAlert('Printer problem');
                    })
                }
                setTimeout($.unblockUI, 100);
            })
        }else{
            var msg = "Please select date range to print";
            NumpadAlertClose('daily_sales_no_data', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });
        }

        $scope.dailysales_daterange_from_change = false;
        $scope.dailysales_daterange_from_change = false;
    }

    $(document).on('click', '#dailysales_print', function(e){
        e.preventDefault();
        if($scope.dailysales_daterange_from_change == true || $scope.dailysales_daterange_from_change == true){
            DailySalesSearchBeforePrint()
            .then(function(){
                daily_sales_report_print_after_search();
            })
            return false;
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
        }, message: 'Printing receipt...',
            baseZ: 99999,
        });

        var dailySales      = $("#daily_sales_summary_grid").jqxGrid('getrows');
        var giftcardSales   = $("#gift_card_grid").jqxGrid('getrows');
        var storecreditSales= $("#store_credit_grid").jqxGrid('getrows');
        var payments        = $("#payments_grid").jqxGrid('getrows');
        var employee        = $("#employee_sales_details").jqxGrid('getrows');
        var deposits        = $("#daily_sales_deposit").jqxGrid('getrows');
        var store_emp_sales = $("#daily_store_employee_sales").jqxGrid('getrows');
        var datefrom        = $("#dailysales_daterange_from").val();
        var dateto          = $("#dailysales_daterange_to").val();
        var location        = $("#daily_sales_location").val();

        var postdata ='datefrom='+datefrom;
            postdata+='&dateto='+dateto;
            postdata+="&location="+location;
        if(dailySales.length > 0){
            postdata+="&DailySales="+JSON.stringify(dailySales);
        }

        if(giftcardSales.length > 0){
            postdata+="&GiftCardSales="+JSON.stringify(giftcardSales);
        }

        if(storecreditSales.length > 0){
            postdata+="&StoreCredit="+JSON.stringify(storecreditSales);
        }

        if(payments.length > 0){
            postdata+="&Payments="+JSON.stringify(payments);
        }

        if(employee.length > 0){
            postdata+="&EmployeeSales="+JSON.stringify(employee);
        }

        if(deposits.length > 0){
            postdata+="&Deposits="+JSON.stringify(deposits);
        }

        if(store_emp_sales.length > 0){
            postdata+="&StoreEmployeeSales="+JSON.stringify(store_emp_sales);
        }

        if(dailySales.length > 0 || giftcardSales.length > 0 || storecreditSales.length > 0){
            posData.DailySalesSummaryReportPrint(postdata)
            .success(function(data){
                if(data.print){
                    
                }else{ 
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertClose('daily_sales_no_data', msg)
                    .then(function(){
                        WindowPopupAlert('Printer problem');
                    })
                }
                setTimeout($.unblockUI, 100);
            })
        }else{
            var msg = "Please select date range to print";
            NumpadAlertClose('daily_sales_no_data', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });
        }

        $scope.dailysales_daterange_from_change = false;
        $scope.dailysales_daterange_from_change = false;
    })

    $(document).on('click', '#dailysales_close', function(e){
        e.preventDefault();
        $('#daily_sales_report').jqxWindow('close');
    })

    var DailySalesReportGenerate = function(){
        var datefrom = $("#dailysales_daterange_from").val();
        var dateto   = $("#dailysales_daterange_to").val();
        var postdata ="datefrom="+datefrom;
            postdata+="&dateto="+dateto;
        // posData.DailySalesReport(postdata)
        // .success(function(data){
            data = [];
            ReceiptReportDailySalesSummary(data.DailySales);
            ReceiptReportGiftCardSales(data.GiftCard);
            ReceiptReportStoreCreditSales(data.StoreCredit);
            ReceiptReportPayments(data.Payments);
            ReceiptReportEmployeeSalesDetails(data.Employee);
            ReceiptReportDailyStoreEmployeeSales(data.StoreEmployee);
            setTimeout(function(){
                ReceiptReportDailySalesDeposit(data.Deposits);
            },100);
        // })
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
    }, message: 'Loading...' });


    $rootScope.$on("ExtendCheckUserSecurity", function(){
		$scope.extendCheckUserSecurity();
    })
    
    $scope.extendCheckUserSecurity = function(){
        alert("test");
        /*
        posData.CheckUserSecurity(postdata)
        .success(function(data){
            
        })
        */
    }

    $scope.ItemTransfer = function(){
        posData.ItemTransferSetCookie()
        .success(function(data){
            $window.location.href = base_url + 'backoffice/item_transfer/index';
        })
    }

    // Open Table Assigned
	$(document).on('click', '.table_manual_tables_inuse', function(e){
		var ParseId = $(this).attr("id");
		var TableManualNo = ParseId.split('=')[0];
        var TableManualReceiptUnique = ParseId.split('=')[1];
        var CountReceipts = ParseId.split('=')[5];
        
		if(TableManualReceiptUnique > 0){
			posData.CashInServerCheckByUserId()
			.success(function(result){
				if(result.cashin){

					// Check Previous Receipt if there's Item added
					var CountItem 		= $scope.OrderedItemCount;
					var ReceiptStatus 	= $scope.ReceiptStatus;
					var CurrentBalance 	= $scope.ReceiptCurrentBalance;
					// Check Receipt Current Status
					var postdata ="ReceiptHeaderUnique="+TableManualReceiptUnique;
					posData.TableManualCheckReceiptStatus(postdata)
					.success(function(data){

						if(data.result.open == true){
							var msg = data.result.msg;
							NumpadAlertClose('table_manual_msg', msg)
							.then(function(){
								WindowPopupAlert('Info');
							})
						}else{
                            
                            posData.TableManualPreviousReceiptSetStatus()
                            .success(function(data){
                                // Open Table
                                var postdata ="ReceiptHeaderUnique="+TableManualReceiptUnique;
                                posData.TableManualOpenReceipt(postdata)
                                .success(function(table){
                                    if(table.can_open == false){
                                        NumpadAlertClose('cannot_open_receipt', table.msg)
                                        .then(function(){
                                            WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                                        })
                                        return false;
                                    }

                                    // return false;

                                    if( CountReceipts > 1 ){
                                        $window.location = base_url + "pos/pointofsale/split-check";
                                    }else{
                                        if( $("#TableSplitCheck").val() == 1 ){
                                            $window.location = base_url + "pos/pointofsale/split-check";
                                        }else{
                                            $window.location.href = 'pointofsale';
                                        }
                                    }
                                })
                            })
                            $("#table_manual_keyin").jqxWindow('close');
                            return false;
						}
					})
					
					$("#table_manual_keyin").jqxWindow('close');
				}else{
					NumpadAlertClose('cannot_open_receipt', result.msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					})
				}
			})
		}else{
			alert("Sorry, we encountered a technical difficulties\nPlease try again later.");
		}
    })
    
    $scope.TableUserUnique = '';
    $(document).on('submit', '#cashier_new_sale_customer_no', function(e){
        e.preventDefault();
        var postdata ="UserUnique="+ $scope.TableUserUnique;
            postdata+="&CustomerNo="+$("#table_number_field").val();
            postdata+="&OrderTypeNo="+OrderTypeSelected;
         posData.CreateReceiptCashInServer(postdata)
        .success(function(data){
            $window.location.href = 'pointofsale';
        })
    })


    $(document).on('submit', '#cashier_new_sale_customer_no_cashtype', function(e){
        e.preventDefault();
        var CustomerQuantity = $("#table_number_field").val();
        if(CustomerQuantity > 2999){
            var msg = "Customer Count can be up to 2999.";
            NumpadAlertClose('customer_count_error', msg)
            .then(function(){
                WindowPopupAlert ('Customer Count Info');
            })
        }else{
            var postdata ="UserUnique="+ $scope.TableUserUnique;
                // postdata+="&cashtype=2";
                postdata+="&CustomerNo="+$("#table_number_field").val();
                postdata+="&OrderTypeNo="+OrderTypeSelected;
            posData.CreateReceiptCashInServer(postdata)
            .success(function(data){
                $window.location.href = 'pointofsale';
            })
        }
    })

    $rootScope.$on('CallOrderTypeWindow', function(event){
        $scope.OrderTypeWindow();
    })

    $scope.OrderTypeWindow = function(){
        posData.OrderTypePopupList()
	    .success(function(data){
            if(data.OrderType == null || data.OrderType == ''){
                OrderTypeWindowApp('OrderTypeFromTableManual', data.html)
                .then(function(){
                    WindowPopupOrderTypeApp('Order type');
                })
            }
        })
    }

    $rootScope.$on('CallOrderTypeWindowQuickRecallNewSale', function(event, setUser){
        $scope.OrderTypeQuickRecall(setUser);
    })

    $scope.OrderTypeQuickRecall = function(setUser){
        SetNewUser = setUser;
        posData.OrderTypePopupList()
	    .success(function(data){
            if(data.OrderType == null || data.OrderType == ''){
                OrderTypeWindowApp('OrderTypeFromQuickRecallNewSale', data.html)
                .then(function(){
                    WindowPopupOrderTypeApp('Order type');
                })
            }
        })
    }

    var OrderTypeNo;
    var OrderTypeName;
	$(document).on('submit', '#OrderTypeFromQuickRecallNewSale', function(e){
		e.preventDefault();
		OrderTypeNo = $('input[type=radio][name=group1]:checked').attr('id');
		OrderTypeName = $("#"+OrderTypeNo).closest('label').text();
        $scope.OrderTypeName =  $("#"+OrderTypeNo).closest('label').text();
        var TableNumberChange   = $("#TableNumberChange").val();
		var TableCustomerNo     = $("#TableCustomerNo").val();
		if(TableCustomerNo == 1){
			var VirtualTableManualCustomerNo = ['', 'cashier_quick_recall_new_sale_customer_no'];
			$rootScope.$emit('CallNumpadTableNoOfCustomerCashier', VirtualTableManualCustomerNo);
		}else{
			var postdata ="UserUnique="+SetNewUser;
			postdata+="&OrderTypeNo="+OrderTypeName;
			posData.CreateReceiptCashInServer(postdata)
			.success(function(data){
				$window.location.href = 'pointofsale';
			})
		}
		$("#ordertype-popup").jqxWindow('close');
	})
    
    // Order Type
    var populateOrderTypeApp = function(form_name, types){
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
		
	var WindowPopupOrderTypeApp = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#ordertype-popup").jqxWindow({
				height: 320,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#ordertype-popup').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
		
	var OrderTypeWindowApp = function(form_name, types){
		var def = $.Deferred();
		populateOrderTypeApp(form_name, types)
		.then(function(){
			$('#keyboard_order_type').hdkeyboard({
			  layout: "alert_yes_ok",
			  input: $('#ordertype_input')
			});
			$('#ordertype_input').focus();
			def.resolve();
		})
		return def.promise();
    }
    
    var OrderTypeSelected;
    var OrderTypeName;
    $(document).on('submit', '#OrderTypePopupApp', function(e){
        e.preventDefault();
        var OrderTypeNo = $('input[type=radio][name=group1]:checked').attr('id');
        OrderTypeName = $("#"+OrderTypeNo).closest('label').text();
        OrderTypeSelected = OrderTypeName;
        var TableNumberChange   = $("#TableNumberChange").val();
        var TableCustomerNo     = $("#TableCustomerNo").val();
        if(TableNumberChange == 2 && TableCustomerNo == 1){
            var VirtualTableManualCustomerNo = [SetNewUser, 'cashier_new_sale_customer_no'];
            $rootScope.$emit('CallNumpadTableNoOfCustomerCashier', VirtualTableManualCustomerNo);
        }else{
            var postdata ="UserUnique="+SetNewUser;
                postdata+="&OrderTypeNo="+OrderTypeName;
            posData.CreateReceiptCashInServer(postdata)
            .success(function(data){
                $window.location.href = 'pointofsale';
            })
        }
        $("#ordertype-popup").jqxWindow('close');
    })

    $(document).on('click', "#cashier_reports_close", function(e){
        e.preventDefault();
        $("#receipt_report_view").jqxWindow('close');
    })

    var ReceiptReportDailySalesSummary = (data) => {
        var source_daily_sales = {
            datatype: "json",
            datafields: DailySalesColTypes[0],
            localdata: {}
        }
        var dataAdapter1 = new $.jqx.dataAdapter(source_daily_sales);
        $("#daily_sales_summary_grid").jqxGrid({
            source: dataAdapter1,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DailySalesGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportDailySalesSummarySearch = (data) => {
        var source_daily_sales = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter1 = new $.jqx.dataAdapter(source_daily_sales);
        $("#daily_sales_summary_grid").jqxGrid({
            source: dataAdapter1,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DailySalesGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportGiftCardSales = (data) => {
        var source_gift_card = {
            datatype: "json",
            datafields: GiftCardColTypes[0],
            localdata: {}
        }
        var dataAdapter2 = new $.jqx.dataAdapter(source_gift_card);
        $("#gift_card_grid").jqxGrid({
            source: dataAdapter2,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: GiftCardGridColumns,
            rowsheight: GridRowHeight
        })
    } 

    var ReceiptReportGiftCardSalesSearch = (data) => {
        var source_gift_card = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter2 = new $.jqx.dataAdapter(source_gift_card);
        $("#gift_card_grid").jqxGrid({
            source: dataAdapter2,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: GiftCardGridColumns,
            rowsheight: GridRowHeight
        })
    }
    
    var ReceiptReportStoreCreditSales = (data) => {
        var source_store_credit = {
            datatype: "json",
            datafields: StoreCreditColTypes[0],
            localdata: {}
        }
        var dataAdapter3 = new $.jqx.dataAdapter(source_store_credit);
        $("#store_credit_grid").jqxGrid({
            source: dataAdapter3,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: StoreCreditGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportStoreCreditSalesSearch = (data) => {
        var source_store_credit = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter3 = new $.jqx.dataAdapter(source_store_credit);
        $("#store_credit_grid").jqxGrid({
            source: dataAdapter3,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: StoreCreditGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportPayments = (data) =>{
        var source_payments = {
            datatype: "json",
            datafields: PaymentsColTypes[0],
            localdata: {}
        }
        var dataAdapter4 = new $.jqx.dataAdapter(source_payments);
        $("#payments_grid").jqxGrid({
            source: dataAdapter4,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: PaymentsGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportPaymentsSearch = (data) =>{
        var source_payments = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter4 = new $.jqx.dataAdapter(source_payments);
        $("#payments_grid").jqxGrid({
            source: dataAdapter4,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: PaymentsGridColumns,
            rowsheight: GridRowHeight,
        })
    }

    var ReceiptReportEmployeeSalesDetails = (data) => {
        var source_employee_sales = {
            datatype: "json",
            datafields: EmployeeSalesColTypes[0],
            localdata: {}
        }
        var dataAdapter5 = new $.jqx.dataAdapter(source_employee_sales);
        $("#employee_sales_details").jqxGrid({
            source: dataAdapter5,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: EmployeeSalesGridColumns,
            rowsheight: GridRowHeight,
            columngroups: [
				{text: 'EMPLOYEE SALES', align: 'left', name: 'EmployeeSalesLabel'}
			]
        })
    }

    var ReceiptReportEmployeeSalesDetailsSearch = (data) => {
        var source_employee_sales = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter5 = new $.jqx.dataAdapter(source_employee_sales);
        $("#employee_sales_details").jqxGrid({
            source: dataAdapter5,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            rowsheight: GridRowHeight,
            columns: EmployeeSalesGridColumns
        })
    }

    var ReceiptReportDailySalesDeposit = (data) => {
        var source_deposit = {
            datatype: "json",
            datafields: DepositDailySalesColTypes[0],
            localdata: {}
        }
        var dataAdapter6 = new $.jqx.dataAdapter(source_deposit);
        $("#daily_sales_deposit").jqxGrid({
            source: dataAdapter6,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DepositDailySalesGridColumns,
            columngroups: [
				{text: 'BANK DEPOSIT', align: 'left', name: 'Deposit'}
			]
        })
    }

    var ReceiptReportDailySalesDepositSearch = (data) => {
        var source_deposit = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter6 = new $.jqx.dataAdapter(source_deposit);
        $("#daily_sales_deposit").jqxGrid({
            source: dataAdapter6,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DepositDailySalesGridColumns
        })
    }

    var ReceiptReportDailyStoreEmployeeSales = (data) => {
        var source_store_emp_sales = {
            datatype: "json",
            datafields: DailyStoreEmployeeSalesColTypes[0],
            localdata: {}
        }
        var dataAdapter7 = new $.jqx.dataAdapter(source_store_emp_sales);
        $("#daily_store_employee_sales").jqxGrid({
            width: '100%',
            source: dataAdapter7,
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DailyStoreEmployeeSalesGridColumns,
            columngroups: [
				{text: 'STORE SALES', align: 'left', name: 'StoreSales'}
			]
        })
    }

    var ReceiptReportDailyStoreEmployeeSalesSearch = (data) => {
        var source_store_emp_sales = {
            datatype: "json",
            localdata: data
        }
        var dataAdapter7 = new $.jqx.dataAdapter(source_store_emp_sales);
        $("#daily_store_employee_sales").jqxGrid({
            source: dataAdapter7,
            width: '100%',
            autoheight: true,
            columnsresize: true,
            theme: GridTheme,
            pageable: false,
            pagermode: 'advanced',
            pagesize: 100,
            showfilterrow: true,
            filterable: true,
            filterMode: 'advance',
            showaggregates: true,
            showstatusbar: true,
            statusbarheight: 30,
            columns: DailyStoreEmployeeSalesGridColumns,
            columngroups: [
				{text: 'STORE SALES', align: 'left', name: 'StoreSales'}
			]
        })
    }

    $scope.CashierTimeClockSchedule = function(){
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $("#CashierTimeClockSchedulefunction").attr({"disabled":true});
                NumpadPasscode('EnterPasscodeTimeClockSchedule')	
                .then(function(){
                    WindowPopupPasscode('Time Clock Schedule | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
                    });
                });
                FunctionButton = 'TimeClockScheduler';
                setTimeout(function(){
                    $("#CashierTimeClockSchedulefunction").attr({"disabled":false});
                },1000);
            }else{
                location.reload();
            }
        })
    }

    // $(document).on('submit', '#EnterPasscodeTimeClockSchedule', function(e){
    //     e.preventDefault();
    //     var CardRead = $("#number_field").val();
    //         var CRP = new CardReaderParser(CardRead);
    //         if(CRP.converted){
    //             var passcode    = CRP.converted;
    //             var hashpasscode= CryptoJS.MD5(passcode);
    //             var postdata    ="Passcode="+hashpasscode;
    //             posData.ReceiptReportEnterPasscode(postdata)
    //             .success(function(data){
    //                 if(data.valid){
    //                     var UserUnique = data.info.Unique;
    //                     var UserName = data.UserName;
    //                     $window.location.href = base_url + 'backoffice/scheduler';
    //                 }else{
    //                     NumpadAlertOk('invalid_passcode', data.msg)
    //                     .then(function(){
    //                         WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
    //                     })
    //                 }
    //                 $("#dialog-numpad-passcode").jqxWindow('close');
    //             })
    //         }else{
    //             $("#dialog-numpad-passcode").jqxWindow("close");
    //             var msg = 'Passcode cannot be empty';	
    //             NumpadAlertOk('invalid_passcode', msg)
    //             .then(function(){
    //                 WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
    //             })
    //         }
    // })

    $(document).on('submit', '#EnterPasscodeTimeClockSchedule', function(e){
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
                    postdata+="&TimeScheduler=1";
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

                            $window.location.href = base_url + 'backoffice/scheduler';
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


    $("#tip_by_server").on('close', function(e){
        e.preventDefault();
        $("#tip_by_server_container").remove();  
    })

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var populateTipByServer = () => {
        var def = $.Deferred();
        $("#tip_by_server").append('<div id="tip_by_server_container" style="background: #144766; color:#EEE; overflow: hidden;"></div>');
        $("#tip_by_server_container").html(
            '<div style="width:100%;">'+
                '<div style="float:left; margin-right: 5px;">'+
                    '<span>Date From:</span>'+
                    '<div id="tipbyserver_daterange_from"></div>'+
                '</div>'+
                '<div style="float:left; margin-right: 5px">'+
                    '<span>Date To:</span>'+
                    '<div id="tipbyserver_daterange_to"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<span>Location</span>'+
                    '<div id="tipbyserver_location"></div>'+
                '</div>'+
                '<div style="float:left;">'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-primary btn-lg" id="tipbyserver_search"><span class="glyphicon glyphicon-search"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-warning btn-lg" id="tipbyserver_print"><span class="glyphicon glyphicon-print"></span></button>'+
                    '<button style="margin: 13px 0 0 5px;" class="btn btn-danger btn-lg" id="tipbyserver_close"><span class="glyphicon glyphicon-remove"></span></button>'+
                '<div>'+
            '</div>'
        );

        $("#tip_by_server_container").append(
            '<div style="float:left; width: 100%;">'+
                '<div id="tipbyserver_grid"></div>'+
            '</div>'
        )

        $("#tipbyserver_daterange_from").jqxDateTimeInput({width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy hh:mm tt", showTimeButton: true});
        $("#tipbyserver_daterange_to").jqxDateTimeInput({width: 250, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy hh:mm tt", showTimeButton: true});
        $("#tipbyserver_daterange_to").jqxDateTimeInput('setDate', new Date(yyyy, mm, dd, 23, 59));
        
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
            $("#tipbyserver_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: '250', height: '40px'});
            $("#tipbyserver_location").val(data.curLocation);
            
            TipByServerGrid({});
            def.resolve();
        })
        return def.promise();
    }

    var WindowTipByServer = () => {
        var def = $.Deferred();
        setTimeout(function(){
            var ResoWidth 	        = $("#fakeheight").width();
            var ResoHeight 	        = $("#fakeheight").height();
            var ComputeHeight		= ResoHeight - 50;
            var CustomerSearch 		= ComputeHeight - 40;
            var UseHeight			= CustomerSearch;
            var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

            $("#tip_by_server").jqxWindow({
                height: ResoHeight,
                minWidth: '100%',
                Title: 'Tip by Server Report',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                zIndex: 99
            })
            $("#tip_by_server").jqxWindow('open');
            def.resolve();
        },100);
        return def.promise();
    }

    var NumpadTipByServerReport = () => {
        var def = $.Deferred();
        populateTipByServer()
        .then(function(){
            setTimeout(function(){
                $.blockUI({ css: { 
                    border: '2px solid #fff',
                    padding: '15px', 
                    backgroundColor: '#210e66', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: 1, 
                    color: '#fff',
                    fontSize: '20px' 
                },  message: 'Retrieving data...',
                    baseZ: 99999
                });

                var postdata ="datefrom="+ $("#tipbyserver_daterange_from").val();
                    postdata+="&dateto="+$("#tipbyserver_daterange_to").val();
                    postdata+="&location="+$("#tipbyserver_location").val();
                posData.TipByServerSearch(postdata)
                .success(function(data){
                    TipByServerGrid(data);
                    setTimeout($.unblockUI, 100); 
                })
            },100);

            def.resolve();
        })
        return def.promise();
    }

    $(document).on('click', '#tipbyserver_search', function(e){
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
        },  message: 'Retrieving data...',
            baseZ: 99999
        });

        var postdata ="datefrom="+ $("#tipbyserver_daterange_from").val();
            postdata+="&dateto="+$("#tipbyserver_daterange_to").val();
            postdata+="&location="+$("#tipbyserver_location").val();
        posData.TipByServerSearch(postdata)
        .success(function(data){
            setTimeout($.unblockUI, 100); 
            TipByServerGrid(data);
        })
    })

    $(document).on('click', '#tipbyserver_print', function(e){
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
        },  message: 'Printing receipt and retrieving data...', 
            baseZ: 99999
        });

        var StationClosing = $("#station_closing_list").val();
        var postdata ="datefrom="+ $("#tipbyserver_daterange_from").val();
            postdata+="&dateto="+$("#tipbyserver_daterange_to").val();
            postdata+="&location="+$("#tipbyserver_location").val();
            postdata+="&PrintReceipt=1";
        posData.PrintTipByServer(postdata)
        .success(function(data){
            if(data.success){
                if(data.print){
                    setTimeout($.unblockUI, 100); 
                    TipByServerGrid(data);
                }else{
                    setTimeout($.unblockUI, 100); 
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertClose('daily_sales_no_data', msg)
                    .then(function(){
                        WindowPopupAlert('Printer problem');
                    })
                }
            }else{
                setTimeout($.unblockUI, 100); 
                NumpadAlertOk('print_failed', data.msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        })
    })

    $(document).on('click', '#tipbyserver_close', function(e){
        e.preventDefault();
        $("#tip_by_server").jqxWindow('close');
    })

    var TipByServerGrid = (data) => {
        var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 50;
        var CashOutSearch 		= ComputeHeight - 60;
        var UseHeight			= CashOutSearch;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

        var source =  {
            dataType: "json",
            dataFields: [
                { name: 'Closing', type : 'int'},
                { name: 'Unique', type: 'int'},
                { name: 'Server', type: 'string'},
                { name: 'Assign', type: 'string'},
                { name: 'StationCashier', type: 'int'},
                { name: 'Payment', type: 'string'},
                { name: 'Receipt', type: 'string'},
                { name: 'Tender', type: 'number'},
                { name: 'Adjust', type: 'number'},
                { name: 'Total', type: 'number'},
                { name: 'Created', type: 'date'}
            ],
            localdata: data.result
        }

        var dataAdapter =  new $.jqx.dataAdapter(source); 

        var groupsrenderer = function (text, group, expanded, data) {
            var number = dataAdapter.formatNumber(group, data.groupcolumn.cellsformat);
            var text = data.groupcolumn.text + ': ' + number;
            var aggregate = this.getcolumnaggregateddata('price', ['sum'], true, data.subItems);
            return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + ', </span>' + '<span class="' + toThemeProperty('jqx-grid-groups-row-details') + '">' + "Total price" + ' (' + aggregate.sum + ')' + '</span></div>';
        }

        $("#tipbyserver_grid").jqxGrid({
            width: '100%',
            height: UseHeight,
            columnsresize: true,
            source: dataAdapter,
            theme: GridTheme,
            sortable: true,
            pageable: false,
            pageSize: ComputeDisplayRow,
            scrollbarsize: 25,
            pagerMode: 'advance',
            altRows: true,
            // showfilterrow: true,
            // filterable: true,
            selectionmode: 'singlecell',
            groupable: true,
            showaggregates: true,
            showgroupaggregates: true,
            showstatusbar: true,
            statusbarheight: 25,
            columnsResize: true,
            groups: ['Assign'],
            groupsexpandedbydefault: true,
            columns: [
                { text: 'Closing', dataField: 'Closing', width: "5%", hidden: true},
                { text: 'Unique', dataField: 'Unique', width: "5%", hidden: true},
                { text: 'Station Cashier', dataField: 'StationCashier', width: '10%', hidden: true}, 
                { text: 'Server', dataField: 'Server', width: "20%", groupable: true, filtertype: 'checkedlist', hidden: true},
                { text: 'Assign', dataField: 'Assign', width: '20%',  groupable: true, filtertype: 'input'},
                { text: 'Date', dataField: 'Created', width: '20%', groupable: true, filtertype: 'date', cellsformat: 'd'}, 
                { text: 'Receipt', dataField: 'Receipt', width: '10%',  groupable: true, filtertype: 'input'},
                { text: 'Payment', dataField: 'Payment', width: '20%', groupable: true, filtertype: 'input'}, 
                { text: 'Tender', dataField: 'Tender', width: '10%', align: 'right', cellsAlign: 'right',  cellsformat: 'd2', filtertype: 'number',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: right; height: 100%; font-weight: bold;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString +=  Total + "</div>";
                        return renderString;
                    }
                },
                { text: 'Adjust', dataField: 'Adjust', width: '10%', align: "right", cellsAlign: "right", cellsformat: 'd2', filtertype: 'number',
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
                { text: 'Total', dataField: 'Total', width: '10%', align: "right", cellsAlign: "right", cellsformat: 'd2', filtertype: 'number',
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
        })
    }

    $("body").on('keydown', function(e){
        var code = e.keyCode || e.which;
    
        switch(code){
            case 113:
            e.preventDefault();
            $("#CashInCashInStation").trigger('click');
            break;

            case 116:
            e.preventDefault();
            $("#NewSalefunction").trigger('click');
            break;
        }
    })

    $(document).on('click', '#btn-assign-req-sale', function(e){
        var index = $("#listCashierSale").jqxGrid('getselectedrowindex');
        var row =  $("#listCashierSale").jqxGrid('getrowdata', index);
        if(row){
            posData.CashInServerCheckByUserId()
            .success(function(result){
                if(result.cashin){
                    var RecallTabMethod = ( $(".buttonactive").length > 0 ? $(".buttonactive").attr("class").split(' ')[0] : null);
                    if(POSReceiptEditPrevious == 0){
                        if(RecallTabMethod == 'recall_completed' || RecallTabMethod == 'recall_cash' || RecallTabMethod == 'recall_creditcard' || RecallTabMethod == 'recall_giftcard' || RecallTabMethod == 'recall_check' || RecallTabMethod == 'recall_voided'){
                            if(StationCashierUniqueCashOut != null){
                                var msg = "Cannot re-assign receipt<br/><br/>Already Cashed Out";
                                NumpadAlertClose('assign_receipt_not_selected', msg)
                                .then(function(){
                                    WindowPopupAlert('Message');
                                })

                                return false;
                            }else{
                                
                            }
                        }
                    }

                    var selectionmode = $('#listCashierSale').jqxGrid('selectionmode');
                    if(selectionmode == 'singlerow'){
                        // $("#messageNotification").html('');
                        $('#listCashierSale').jqxGrid('clearselection');
                        $("#btn-use-receipt").text('Open');
                        $("#btn-use-receipt").val('');
                        $(".listitems").html('');
                        $(".OHSlistitemsTotal").html('');
                        $("#listCashierSale").jqxGrid('selectionmode', 'multiplerows');
                        // $("#messageNotification").append('<div style="color: #000;">To assign to new User, please select one or more receipts below</br>then press Assign button again.</div>');
                        // $("#messageNotification").jqxNotification("open");

                        var msg = "To assign to new User, please select one or more receipts below</br>then press Assign button again.";
                        NumpadAlertClose('assign_receipt_not_selected', msg)
                        .then(function(){
                            WindowPopupAlert('Message');
                        })


                    }else{
                        var postdata ="FunctionButton=AssignNewUser";
                        posData.CheckUserManagerCookie(postdata)
                        .success(function(data){
                            if(data.prompt){
                                FunctionButton = 'AssignNewUser';
                                NumpadPasscode('assign_req_receipts_enter_passcode')
                                .then(function(){
                                    WindowPopupPasscode('Assign')
                                    .then(function(){
                                        setTimeout(function(){
                                            $("#number_field").focus();
                                        },100)
                                    })
                                })
                                // $("#messageNotification").jqxNotification("closeAll");
                            }else{
                                quick_recall_sel_rows = [];
                                var rowindexes = $("#listCashierSale").jqxGrid('getselectedrowindexes');
                                if(rowindexes.length > 0){
                                    $.each(rowindexes, function(index, value){
                                        var row = $("#listCashierSale").jqxGrid('getrowdata', value);
                                        quick_recall_sel_rows.push(row.Unique);
                                    })
                                    posData.QuickRecallServerCashIn()
                                    .success(function(data){
                                        ServerCashInListView('assign_req_receipts', data.html)
                                        .then(function(){
                                            WindowServerCashInList('Assign Receipt To');
                                        })
                                    })
                                    // $("#messageNotification").jqxNotification("closeAll");
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow("close");
                                    var msg = "Please select one or more receipts to Assign";
                                    NumpadAlertClose('assign_receipt_not_selected', msg)
                                    .then(function(){
                                        WindowPopupAlert('Message');
                                    })
                                }
                            }
                        })
                    }
                }else{
                    var msg = result.msg;
                    NumpadAlertClose('assign_receipt_not_selected', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    })
                }
            })
        }else{
            var msg = 'Please select receipt number';
            NumpadAlertClose('assign_receipt_not_selected', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            })
        }
    })

    $(document).on('submit', '#assign_req_receipts_enter_passcode', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
		var CRP = new CardReaderParser(CardRead);
		if(CRP.converted){
			var password = CRP.converted;//$("#number_field").val();
			var hashpasscode = CryptoJS.MD5(password);
			var postdata="passcode="+hashpasscode;
				postdata+="&FunctionButton=AssignNewUser";
			posData.EnterPassCodeQuickRecallAssign(postdata)
			.success(function(data){
				if(data.success){
					if(data.login){
						$("#dialog-numpad-passcode").jqxWindow('close');
						quick_recall_sel_rows = [];
						var rowindexes = $("#listCashierSale").jqxGrid('getselectedrowindexes');
						if(rowindexes.length > 0){
							$.each(rowindexes, function(index, value){
								var row = $("#listCashierSale").jqxGrid('getrowdata', value);
								quick_recall_sel_rows.push(row.Unique);
							})
							posData.QuickRecallServerCashIn()
							.success(function(data){
								ServerCashInListView('assign_req_receipts', data.html)
								.then(function(){
									WindowServerCashInList('Assign Receipt To');
								})
							})
						}else{
							$("#dialog-numpad-passcode").jqxWindow("close");
							var msg = "Please select one or more receipts to Assign";
							NumpadAlertClose('assign_receipt_not_selected', msg)
							.then(function(){
								WindowPopupAlert('Message');
							})
						}
					}else{
						$("#dialog-numpad-passcode").jqxWindow("close");
						NumpadAlertClose('assign_no_permission', data.msg)
						.then(function(){
							WindowPopupAlert('Message');
						})
					}
					$("#qrc_numpad_passcode").jqxWindow('close');
				}else{
					$("#dialog-numpad-passcode").jqxWindow("close");
					var msg = "Invalid Password";
					NumpadAlertClose('qc_invalid', msg)
					.then(function(){
						WindowPopupAlert('Invalid Passcode');
					})
				}
			})
		}else{
			$("#dialog-numpad-passcode").jqxWindow("close");
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('qc_invalid', msg)
			.then(function(){
				WindowPopupAlert('Invalid');
			})
		}
    })
    
    $(document).on('click', '#assign_req_receipts .button_proceed', function(e){
        e.preventDefault();
        var ServerId = $('input[type=radio][name=group1]:checked').attr('id');
		if(ServerId){
			var rows = JSON.stringify(quick_recall_sel_rows);
			var postdata ="ReceiptHeaderUniques="+rows;
				postdata+="&Server="+ServerId;
			posData.QuickRecallUpdateReceiptsServer(postdata)
			.success(function(data){
				if(data.success){
                    switch(CashierRecallFunctionButton) {
                        case 'SelCompleted':
                            SelCompleted();
                            break;
                        case 'CashierRecallCreditCard':
                            $scope.RecallCCType(5);
                            break;
                        case 'CashierRecallCash' :
                            $scope.RecallCashType(4);
                            break;
                        case 'CashierRecallGiftCard':
                            $scope.RecallGCType(6);
                            break;
                        case 'CashierRecallCheck':
                            $scope.RecallCheck(7);
                            break;
                        case 'CashierRecallVoided' :
                            CashierRecallVoidedLoad(8);
                            break;
                        default:
                            SelOnHold();
                    }
                    
					// posData.LoadOnHoldSale()
					// .success(function(recdata){
					// 	var source = {
					// 		datatype: "json",
					// 		localdata: recdata
					// 	}
					// 	var dataAdapter = new $.jqx.dataAdapter(source);
					// 	$("#listCashierSale").jqxGrid({
					// 		source: dataAdapter
					// 	})
					// })
					$("#listCashierSale").jqxGrid('selectionmode', 'singlerow');
					$('#listCashierSale').jqxGrid('selectrow', 0);
                    $('#server_cashin').jqxWindow('close');
                    
				}
			})
		}else{
			var msg = 'Please select Assign';
			NumpadAlertClose('qrec_error', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			})
		}
    })

    $(document).on('click', '#assign_req_receipts .button_q_cancel', function(){
		$('#server_cashin').jqxWindow('close');
		$("#listCashierSale").jqxGrid('selectionmode', 'singlerow');
        $('#listCashierSale').jqxGrid('selectrow', 0);
    })	
    
    $(document).on('click', '#btn-delete-receipt', function(e){
        var selectionmode = $('#listCashierSale').jqxGrid('selectionmode');
        if(selectionmode == 'singlerow'){
            // $("#messageNotification").html('');
            $('#listCashierSale').jqxGrid('clearselection');
            $("#btn-use-receipt").text('Open');
            $("#btn-use-receipt").val('');
            $(".listitems").html('');
            $(".OHSlistitemsTotal").html('');
            $("#listCashierSale").jqxGrid('selectionmode', 'multiplerows');
            // $("#messageNotification").append('<div style="color: #000;">To delete receipt, please select one or more receipts below</br>then press Delete button again.</div>')
            // $("#messageNotification").jqxNotification("open");

            var msg = "To delete receipt, please select one or more receipts below</br>then press Delete button again.";
            NumpadAlertClose('assign_receipt_not_selected', msg)
            .then(function(){
                WindowPopupAlert('Message');
            })
        }else{
            var rowsindex = $("#listCashierSale").jqxGrid('getselectedrowindexes');
            console.log(rowsindex.length);
            if(rowsindex.length == 0){
                var msg = "Please select one or more receipts to Delete";
                NumpadAlertClose('delete_receipt_not_selected', msg)
                .then(function(){
                    WindowPopupAlert('Message');
                })
                return false;
            }

            var postdata ="FunctionButton=ReceiptDelete";
            posData.CheckUserManagerCookie(postdata)
            .success(function(data){
                if(data.prompt){
                    FunctionButton = 'ReceiptDelete';
                    NumpadPasscode('delete_receipt_enter_passcode')
                    .then(function(){
                        WindowPopupPasscode('Delete receipt user passcode')
                        .then(function(){
                            setTimeout(function(){
                                $("#number_field").focus();
                            },100)
                        })
                    })
                    // $("#messageNotification").jqxNotification("closeAll");
                }else{
                    quick_recall_sel_rows = [];
                    quick_recall_sel_rows_assoc = [];
                    var rowindexes = $("#listCashierSale").jqxGrid('getselectedrowindexes');
                    if(rowindexes.length > 0){
                        $.each(rowindexes, function(index, value){
                            var row = $("#listCashierSale").jqxGrid('getrowdata', value);
                            quick_recall_sel_rows.push(row.Unique);
                            quick_recall_sel_rows_assoc.push({"Receipt" : row.Unique, "Total" : row.TotalSale});
                        })
                        
                        CallDeleteReceiptConfirmation();

                        // $("#messageNotification").jqxNotification("closeAll");
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        var msg = "Please select one or more receipts to Delete";
                        NumpadAlertClose('delete_receipt_not_selected', msg)
                        .then(function(){
                            WindowPopupAlert('Message');
                        })
                        // $("#messageNotification").jqxNotification("closeAll");
                    }
                }
            })
        }
       
    })

    $(document).on('submit', '#delete_receipt_enter_passcode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
		var CRP = new CardReaderParser(CardRead);
		if(CRP.converted){
			var password = CRP.converted;//$("#number_field").val();
			var hashpasscode = CryptoJS.MD5(password);
			var postdata="passcode="+hashpasscode;
				postdata+="&FunctionButton=ReceiptDelete";
			posData.EnterPassCodeDeleteReceipt(postdata)
			.success(function(data){
				if(data.success){
					if(data.login){
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        quick_recall_sel_rows = [];
                        quick_recall_sel_rows_assoc = [];
						var rowindexes = $("#listCashierSale").jqxGrid('getselectedrowindexes');
						if(rowindexes.length > 0){
							$.each(rowindexes, function(index, value){
                                var row = $("#listCashierSale").jqxGrid('getrowdata', value);
                                quick_recall_sel_rows.push(row.Unique);
                                quick_recall_sel_rows_assoc.push({"Receipt" : row.Unique, "Total" : parseFloat(row.Total).toFixed(2)});
							})
                            
                            CallDeleteReceiptConfirmation();

                            // $("#messageNotification").jqxNotification("closeAll");
						}else{
							$("#dialog-numpad-passcode").jqxWindow("close");
							var msg = "Please select one or more receipts to Assign";
							NumpadAlertClose('assign_receipt_not_selected', msg)
							.then(function(){
								WindowPopupAlert('Message');
							})
						}
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        var msg = "Sorry, you don't have permission";
                        NumpadAlertClose('assign_receipt_not_selected', msg)
                        .then(function(){
                            WindowPopupAlert('Message');
                        })
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Passcode cannot be empty";
                    NumpadAlertClose('qc_invalid', msg)
                    .then(function(){
                        WindowPopupAlert('Invalid');
                    })
                }
            })
        }
    })

    var populateDeleteReceiptYesNo = () => {
        var def = $.Deferred();
        var receipt_label = (quick_recall_sel_rows.length > 1 ? 'receipts' : 'receipt');
        var htmlstring = '';
        for(var i=0; i < quick_recall_sel_rows_assoc.length; i++){

            htmlstring +='<div style="width: 100%; padding: 2px; color: #000; font-size: 16px; font-weight: bold;">'+
                            '<div style="width: 70%; float:left;">'+quick_recall_sel_rows_assoc[i].Receipt+'</div>'+
                            '<div style="width: 30%; text-align:right; float:left;">'+quick_recall_sel_rows_assoc[i].Total+'</div>'+
                        '</div>'
        }
       
        setTimeout(function(){
            $("body").append(
                '<div id="delete_receipt_confirmation" style="background: #144766; color:#EEE;">'+
                    '<div id="delete_receipt_confirmation_container" style="background: #144766; color:#EEE;">'+
                        '<div style="margin: 5px 5px 5px 5px;">'+
                            '<span style="font-size: 14px;">Are you sure you want to delete selected '+receipt_label+'?</span>'+
                        '</div>'+
                        '<div style="height: 150px; background-color: #fff;">'+
                            htmlstring+
                        '</div>'+
                        '<div style="position: absolute; bottom: 0; padding: 10px;">'+
                            '<button class="btn btn-danger btn-lg" id="receipt_delete_yes">Yes</button>&nbsp;&nbsp;<button class="btn btn-warning btn-lg" id="receipt_delete_no">No</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            )

            def.resolve();
        },100)

        return def.promise();
    }

    var WindowDeleteReceipt = () => {
        var def = $.Deferred();
        $("#delete_receipt_confirmation").jqxWindow({
            height: 300,
            width: 350,
            title: 'Delete Receipt',
            isModal: true,
            theme: 'darkblue',
            showCloseButton: true,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        setTimeout(function(){
            $("#delete_receipt_confirmation").jqxWindow('open');
            $("#delete_receipt_confirmation").on('close', function(){
                $("#delete_receipt_confirmation").remove();
            })
        },100)

        return def.promise();
    }

    var CallDeleteReceiptConfirmation = () => {
        populateDeleteReceiptYesNo()
        .then(function() {
            WindowDeleteReceipt();
        })
    }

    $(document).on('click', '#receipt_delete_yes', function(e){
        e.preventDefault();
        var postdata ="receipt_selected="+quick_recall_sel_rows;
        posData.DeleteReceiptConfirmed(postdata)
        .success(function(data){
            if(data.success){
                var receipt_label = (quick_recall_sel_rows.length > 1 ? 'Receipts' : 'Receipt');
                var msg = receipt_label + ' deleted!';
                NumpadAlertClose('delete_receipt_confirmation', msg)
                .then(function(){
                    WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');	
                })  
                
                switch(CashierRecallFunctionButton) {
                    case 'SelCompleted':
                        SelCompleted();
                        break;
                    case 'CashierRecallCreditCard':
                        $scope.RecallCCType(5);
                        break;
                    case 'CashierRecallCash' :
                        $scope.RecallCashType(4);
                        break;
                    case 'CashierRecallGiftCard':
                        $scope.RecallGCType(6);
                        break;
                    case 'CashierRecallCheck':
                        $scope.RecallCheck(7);
                        break;
                    case 'CashierRecallVoided' :
                        CashierRecallVoidedLoad(8);
                        break;
                    default:
                        SelOnHold();
                }

                $("#listCashierSale").jqxGrid('selectionmode', 'singlerow');
				$('#listCashierSale').jqxGrid('selectrow', 0);
            }
        })

        $("#delete_receipt_confirmation").jqxWindow('close');
    })

    $(document).on('click', '#receipt_delete_no', function(e){
        e.preventDefault();
        $("#delete_receipt_confirmation").jqxWindow('close');
    })

    $(document).on('click', '#DrawerManagerfunction', function(e){
        e.preventDefault();
        $("#DrawerManagerfunction").prop('disabled', true);
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                FunctionButton = 'DrawerManager';
                NumpadPasscode('EnterDrawerManagerPasscode')	
                .then(function(){
                    WindowPopupPasscode('Drawer Manager | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100); 
                    })  
                }) 
            }
        })


        setTimeout(function(){
            $("#DrawerManagerfunction").prop("disabled", false);
        },1000)
    })  

    var AlertMessageYesNo = (form, msg, strTitle) => {
        $("body").append(
            '<div id="alert_window_message" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="alert_window_message_container" style="background: #144766; color:#EEE;">'+
                    '<form id="'+form+'">'+
                        '<p style="font-size: 16px;">'+msg+'</p>'+
                        '<div style="position: absolute; bottom: 0; padding: 10px; text-align: right;">'+
                            '<input type="submit" id="AlertMessageYes" value="Yes"/>&nbsp;&nbsp;'+
                            '<input type="button" id="AlertMessageNo" value="No"/>&nbsp;'+
                        '</div>'+
                    '</form>'+
                '</div>'+
            '</div>'
        )

        $("#AlertMessageYes").jqxButton({width: 80, height: 40, template: 'primary' });
        $("#AlertMessageNo").jqxButton({width: 80, height: 40, template: 'danger' });

        $("#alert_window_message").jqxWindow({
            height: 245,
            minWidth: 350,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: false,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        $("#alert_window_message").jqxWindow('setTitle', strTitle);

        setTimeout(function(){
            $("#alert_window_message").jqxWindow('open');
            $("#alert_window_message").on('close', function(){
                $("#alert_window_message").remove();
            })
        },100)
    }

    var DrawerManagerEditOptionWindow = (form) => {
        $("body").append(
            '<div id="DrawerManagerEditOptionForm" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="DrawerManagerEditOptionFormContainer" style="background: #144766; color:#EEE;">'+
                    
                    '<div style="padding: 10px;">'+
                        '<input type="button" id="DrawerManagerOptionCount" value="Count" />&nbsp;&nbsp;&nbsp;'+
                        '<input type="button" id="DrawerManagerOptionReconcile" value="Reconcile" />&nbsp;&nbsp;&nbsp;'+
                        '<input type="button" id="DrawerManagerOptionClose" value="Close" />&nbsp;&nbsp;&nbsp;'+
                    '</div>'+
                '</div>'+
            '</div>'
        )

        $("#DrawerManagerOptionCount").jqxButton({width: 100, height: 40, template: 'primary' });
        $("#DrawerManagerOptionReconcile").jqxButton({width: 100, height: 40, template: 'primary' });
        $("#DrawerManagerOptionClose").jqxButton({width: 100, height: 40, template: 'danger' });

        var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);

        $("#DrawerManagerEditOptionForm").jqxWindow({
            height: 150,
            minWidth: 370,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: true,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        $("#DrawerManagerEditOptionForm").jqxWindow('setTitle', 'Edit ID '+rowdata.StationCashierUnique + ' | ' +rowdata.CashInBy);

        setTimeout(function(){
            $("#DrawerManagerEditOptionForm").jqxWindow('open');

            $("#DrawerManagerOptionCount").on('click', function(){
                DrawerManagerCount = false;
                DrawerManagerState = false;
                DrawerManagerCashIn = false;

                $("#DrawerManagerOptionCount").jqxButton({disabled: true});
                CashInDenomination()
                .then(function(){
                    WindowCashInDenomination()
                    .then(function(){
                        DrawerManagerDenominationCount('drawer_sessions_history');
                        DrawerManagerHistoryCount = true;
                    })
                })    
                $("#DrawerManagerEditOptionForm").jqxWindow('close');
            })

            $("#DrawerManagerOptionReconcile").on('click', function(){
                $("#DrawerManagerOptionReconcile").jqxButton({ disabled: true });

                CashDrawerHistoryReconcile();
                DrawerManagerHistoryReconcile = true;
                $("#DrawerManagerEditOptionForm").jqxWindow('close');
            })

            $('#DrawerManagerOptionClose').on('click', function(){
                $("#DrawerManagerEditOptionForm").jqxWindow('close');
            })

            $("#DrawerManagerEditOptionForm").on('close', function(){
                $("#DrawerManagerOptionCount, #DrawerManagerOptionReconcile").jqxButton('destroy');
                $("#DrawerManagerEditOptionForm").jqxWindow('destroy');
                $("#DrawerManagerEditOptionForm").remove();
            })
        },100)
    }
    
    var populateDrawerManager = () => {
        var def = $.Deferred();
        $("body").append(
            '<div id="drawer_manager" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000; overflow: hidden;">'+
                '<div id="drawer_manager_container">'+
                    '<div style="width: 100%; float:left;">'+
                        '<div id="drawer_manager_tab" style="overflow: hidden !important;">'+
                            '<ul>'+
                                '<li>Current</li>'+
                                '<li>History</li>'+
                            '</ul>'+
                            '<div style="overflow: hidden;">'+
                                '<ul class="DrawerManagerButtonList">'+
                                    '<li><input type="button" id="DrawerManagerActivate" value="Cash In"/></li>'+
                                    '<li><input type="button" id="DrawerManagerCount" value="Count"/></li>'+
                                    '<li><input type="button" id="DrawerManagerReconcile" value="Reconcile"/></li>'+
                                    '<li><input type="button" id="DrawerManagerPrint" value="Print" /></li>'+
                                    '<li><input type="button" id="DrawerManagerClose" value="Close" /></li>'+
                                '</ul>'+
                                '<div id="drawer_sessions"></div>'+
                            '</div>'+
                            '<div style="overflow: hidden;">'+
                                '<ul class="DrawerManagerButtonList2">'+
                                    '<li>From: <div id="drawer_manager_session_history_from"></div></li>'+
                                    '<li>To: <div id="drawer_manager_session_history_to"></div></li>'+
                                    '<li style="margin-top: 20px;"><input type="button" id="DrawerManagerSearch" value="Search"/></li>'+
                                    '<li style="margin-top: 20px;"><input type="button" id="DrawerManagerEditOption" value="Edit Cash Out"/> </li>'+
                                    '<li style="margin-top: 20px;"><input type="button" id="DrawerManagerEdit" value="Reverse Cashout"/> </li>'+
                                    '<li style="margin-top: 20px;"><input type="button" id="DrawerManagerPrintHistory" value="Print" /></li>'+
                                    '<li style="margin-top: 20px;"><input type="button" id="DrawerManagerClose2" value="Close" /></li>'+
                                '</ul>'+
                                '<div id="drawer_sessions_history"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        )

        $('#drawer_manager_tab').jqxTabs({ width: '100%', height: 645, theme:GridTheme,  position: 'top'}); 
        $("#drawer_manager_session_history_from, #drawer_manager_session_history_to").jqxDateTimeInput({ width: 150, height: 40,  selectionMode: 'default', theme: 'energyblue', formatString: "MM/dd/yyyy" });
        $("#DrawerManagerSearch").jqxButton({width: 120, height: 40, template: 'primary' });


        $("#DrawerManagerEdit, #DrawerManagerEditOption, #DrawerManagerPrintHistory").jqxButton({width: 120, height: 40, template: 'primary', disabled: true});
        
        $("#DrawerManagerEdit").on('click', function(event){
            $("#DrawerManagerEdit").jqxButton({disabled: true});
            var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);
            
            AlertMessageYesNo(
                'drawer_manager_edit', 
                'Are you sure you want to reverse cashout ID '+ rowdata.StationCashierUnique +'?', 
                'Question'
            );

            setTimeout(function(){
                $("#DrawerManagerEdit").jqxButton({disabled: false});
            },1000)
        })

        $("#DrawerManagerClose2").jqxButton({width: 120, height: 40, template: 'danger' });
        $("#DrawerManagerClose2").on('click', function(event){
            $("#drawer_manager").jqxWindow('close');
        })

        $('#drawer_manager_tab').on('tabclick', function (event) { 
            var clickedItem = event.args.item; 
            GetDrawerManagerHistoryList();
        }); 

        $("#DrawerManagerSearch").on('click', function(){
            $("#DrawerManagerSearch").jqxButton({ disabled: true });
            GetDrawerManagerHistoryList();
            setTimeout(function(){
                $("#DrawerManagerSearch").jqxButton({ disabled: false });
            },1000)
        })

        $("#DrawerManagerActivate").jqxButton({ width: 120, height: 40, template: 'primary', disabled: true });
        $("#DrawerManagerActivate").on('click', function(e){
            DrawerManagerHistoryCount = false;
            DrawerManagerCount = false;
            DrawerManagerState = false;
            DrawerManagerCashIn = true;
            $("#DrawerManagerActivate").jqxButton({ disabled: true });

            var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
            CashInDenomination()
            .then(function(){
                WindowCashInDenomination()
                .then(function(){
                    DrawerManagerDenomintationGrid(rowdata.StationCashierUnique);

                    setTimeout(function(){
                        $("#DrawerManagerActivate").jqxButton({ disabled: false });
                    },1000)
                })
            })
        })

        $("#DrawerManagerPrint").jqxButton({ width: 120, height: 40, template: 'primary', disabled: true });
       
        $("#DrawerManagerPrint").on('click', function(){

            $("#DrawerManagerPrint").jqxButton({disabled: true});

            var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

            var printmsg = "Printing receipt"+"<br/>";
            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: printmsg,
                baseZ: 99999,   
            }); 
            
            var postdata="cashtype=4";
                postdata+="&StationUnique=" + rowdata.StationUnique;
                postdata+="&LocationUnique=" + rowdata.LocationUnique;
                postdata+="&StationCashierUnique=" + rowdata.StationCashierUnique;
            posData.PrinterCheck(postdata)
            .success(function(result){
                if(result.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
                $("#DrawerManagerPrint").jqxButton({disabled: false});
                setTimeout($.unblockUI, 100);
            })
        })

        $("#DrawerManagerPrintHistory").on('click', function(){

            $("#DrawerManagerPrintHistory").jqxButton({disabled: true});

            var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);

            $.blockUI({ css: { 
                border: '2px solid #fff',
                padding: '15px', 
                backgroundColor: '#210e66', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: 1, 
                color: '#fff',
                fontSize: '20px' 
            }, message: 'Printing receipt...',
                baseZ: 99999,
            });

            var postdata="cashtype=4";
                postdata+="&StationUnique=" + rowdata.StationUnique;
                postdata+="&LocationUnique=" + rowdata.LocationUnique;
                postdata+="&StationCashierUnique=" + rowdata.StationCashierUnique;
            posData.PrinterCheck(postdata)
            .success(function(result){
                if(result.print == false){
                    var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }

                $("#DrawerManagerPrintHistory").jqxButton({disabled: false});
                setTimeout($.unblockUI, 100);
            })
        })

        $("#DrawerManagerEditOption").on('click', function(event){
            $("#DrawerManagerEditOption").jqxButton({disabled: true});

            FunctionButton = 'DrawerManagerCashoutEdit';
            NumpadPasscode('EnterDrawerManagerCashOutEditCode')	
            .then(function(){
                WindowPopupPasscode('Edit Cash Out | Enter Passcode')
                .then(function(){
                    setTimeout(function(){
                        $("#number_field").focus();
                    },100); 
                })  
            }) 

            setTimeout(function(){
                $("#DrawerManagerEditOption").jqxButton({disabled: false});
            },1000)
        })

        
        $("#DrawerManagerCount").jqxButton({ width: 120, height: 40, template: 'primary', disabled: true });
        
        DrawerManagerCount = true;
        $("#DrawerManagerCount").on('click', function(){
            DrawerManagerState = false;
            DrawerManagerCount = true;
            DrawerManagerReconcile = false;
            DrawerManagerHistoryCount = false;
            DrawerManagerHistoryReconcile = false;
            DrawerManagerCashIn = false;
            
            $("#DrawerManagerCount").jqxButton({disabled: true});
            CashInDenomination()
            .then(function(){
                WindowCashInDenomination()
                .then(function(){
                    DrawerManagerDenominationCount('drawer_sessions');
                    setTimeout(function(){
                        $("#DrawerManagerCount").jqxButton({disabled: false});
                    },1000)     
                })
            })    
        })

        $("#DrawerManagerReconcile").jqxButton({ width: 120, height: 40, template: 'primary', disabled: true });
        $("#DrawerManagerReconcile").on('click', function(){
            $("#DrawerManagerReconcile").jqxButton({ disabled: true });
            CashDrawerReconcile();

            DrawerManagerState = false;
            DrawerManagerCount = true;
            DrawerManagerReconcile = true;
            DrawerManagerHistoryCount = false;
            DrawerManagerHistoryReconcile = false;
            DrawerManagerCashIn = false;


            setTimeout(function(){
                $("#DrawerManagerReconcile").jqxButton({ disabled: false });
            },1000)

        })

        $("#DrawerManagerClose").jqxButton({width: 120, height: 40, template: 'danger'});
        $("#DrawerManagerClose").on('click', function(){
            $("#drawer_manager").jqxWindow('close');
        })

        posData.GetManagerDrawerLocationList()
        .success(function(data){

            DrawerManagerGrid(data);

            $("#drawer_sessions").on('rowselect', function(event){
                // event arguments.
                var args = event.args;
                // row's bound index.
                var rowBoundIndex = args.rowindex;
                // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
                var rowData = args.row;
                
                $("#DrawerManagerActivate").jqxButton({disabled: false});
                $("#DrawerManagerPrint").jqxButton({disabled: false});
                $("#DrawerManagerCount").jqxButton({disabled: true});
                $("#DrawerManagerReconcile").jqxButton({disabled: true});
                if(rowData.Created){
                    $("#DrawerManagerReconcile").jqxButton({disabled: false});
                    $("#DrawerManagerCount").jqxButton({disabled: false});   
                }
            })

            def.resolve();
        })

        return def.promise();
    }

    $(document).on('submit', '#drawer_manager_edit', function(e){
        e.preventDefault();
        $("#DrawerManagerEdit").jqxButton({disabled: true});
        FunctionButton = 'DrawerManagerCashoutReverse';
        NumpadPasscode('EnterDrawerManagerCashOutReverseCode')	
        .then(function(){
            WindowPopupPasscode('Reverse Cash Out | Enter Passcode')
            .then(function(){
                setTimeout(function(){
                    $("#number_field").focus();
                },100); 
            })  
        }) 
        $("#alert_window_message").jqxWindow('close');

        setTimeout(function(){
            $("#DrawerManagerEdit").jqxButton({disabled: false});
        },1000);
    })

    $(document).on('submit', '#EnterDrawerManagerCashOutReverseCode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var process = false;
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+FunctionButton;
            posData.CheckUserPasscode(postdata)
            .success(function(data){
                if(data.valid_user){
                    DrawerManagerUserUnique = data.userid;
                    CashInStationUserId = data.userid;
                    if(data.can_login){
                        var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
                        var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
                        var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);
                        var postdata ="StationCashierUnique="+rowdata.StationCashierUnique;
                        posData.EditDrawerManagerHistory(postdata)
                        .success(function(data){
                            if(data.success){
                                GetDrawerManagerHistoryList()
                                .then(function(){
                                    posData.GetManagerDrawerLocationList()
                                    .success(function(data){
                                        DrawerManagerGrid(data);
                                    })
                                })
                            }
                            $("#dialog-numpad-passcode").jqxWindow('close');
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        setTimeout($.unblockUI, 100);
                        var msg = "Sorry, you don't have permission";
                        NumpadAlertClose('invalid_cashout_server_code', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                }else{
                    NumpadAlertOk('invalid_passcode', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })

                    $("#dialog-numpad-passcode").jqxWindow('close');
                    setTimeout($.unblockUI, 100);
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100);
        }
    })

    $(document).on('submit', '#EnterDrawerManagerCashOutEditCode', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var process = false;
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+FunctionButton;
            posData.CheckUserPasscode(postdata)
            .success(function(data){
                if(data.valid_user){
                    DrawerManagerUserUnique = data.userid;
                    CashInStationUserId = data.userid;
                    if(data.can_login){
                        var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
                        var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
                        var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);
                        var postdata ="StationCashierUnique="+rowdata.StationCashierUnique;
                        posData.EditDrawerManagerHistory(postdata)
                        .success(function(data){
                            if(data.success){
                                DrawerManagerEditOptionWindow();
                            }
                            $("#dialog-numpad-passcode").jqxWindow('close');
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        setTimeout($.unblockUI, 100);
                        var msg = "Sorry, you don't have permission";
                        NumpadAlertClose('invalid_cashout_server_code', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                }else{
                    NumpadAlertOk('invalid_passcode', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })

                    $("#dialog-numpad-passcode").jqxWindow('close');
                    setTimeout($.unblockUI, 100);
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100);
        }
    })

    var GetDrawerManagerHistoryList = () => {
        var def = $.Deferred();
        var dateFrom = $("#drawer_manager_session_history_from").val();
        var dateTo = $("#drawer_manager_session_history_to").val();
        var postdata ="From="+dateFrom;
            postdata+="&To="+dateTo;
        posData.GetManagerDrawerHistoryList(postdata)
        .success(function(data){
            DrawerManagerHistory(data.GridList);
            def.resolve();
        })

        return def.promise();
    }

    $(document).on('click', '#drawer_manager_edit #AlertMessageNo', function(e){
        e.preventDefault();
        $("#alert_window_message").jqxWindow('close');
    })

    var windowDrawerManager = () => {
        var def = $.Deferred();
        $("#drawer_manager").jqxWindow({
            height: 700,
			minWidth: '99%',
            isModal: true,
            title: "Drawer Manager",
			theme: GridTheme,
			showCloseButton: true,
			resizable: false,
			draggable: false,
			showAnimationDuration: 0,
            closeAnimationDuration: 0,
            modalZIndex: 100,
        })

        setTimeout(function(){
            DrawerManagerState = true;
            $("#drawer_manager").jqxWindow('open');

            $("#drawer_manager").on('close', function(){
                DrawerManagerState = false;
                DrawerManagerCount = false;
                DrawerManagerReconcile = false;
                DrawerManagerHistoryCount = false;
                DrawerManagerHistoryReconcile = false;
                DrawerManagerCashIn = false;
                console.log("close drawer manager", DrawerManagerHistoryReconcile);
                $("#drawer_sessions").jqxGrid('destroy');
                $("#drawer_sessions_history").jqxGrid('destroy');
                $("#DrawerManagerActivate,#DrawerManagerCount, #DrawerManagerReconcile, #DrawerManagerClose, #DrawerManagerSearch, #DrawerManagerEdit, #DrawerManagerClose2").jqxButton('destroy');
                $("#drawer_manager_session_history_from, #drawer_manager_session_history_to").jqxDateTimeInput('destroy');
                $("#drawer_manager_tab").jqxTabs('destroy');
                $("#drawer_manager").remove();
            })
            def.resolve();
        },100)

        return def.promise();
    }

    $(document).on('submit', '#EnterDrawerManagerPasscode', function(e){
        e.preventDefault();

        var printmsg = "Retrieving data"+"<br/>";
        $.blockUI({ css: { 
			border: '2px solid #fff',
			padding: '15px', 
			backgroundColor: '#210e66', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: 1, 
			color: '#fff',
			fontSize: '20px' 
        }, message: printmsg,
            baseZ: 99999,
        });

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
                    DrawerManagerUserUnique = data.userid;
                    CashInStationUserId = data.userid;
                    if(data.can_login){
                        populateDrawerManager()
                        .then(function(){
                            windowDrawerManager()
                            .then(function(){
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                setTimeout($.unblockUI, 100);
                            })
                        })
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        setTimeout($.unblockUI, 100);
                        var msg = "Sorry, you don't have permission";
                        NumpadAlertClose('invalid_cashout_server_code', msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                        
                    }   
                }else{
                    NumpadAlertOk('invalid_passcode', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })

                    $("#dialog-numpad-passcode").jqxWindow('close');
                    setTimeout($.unblockUI, 100);
                }
            }) 
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = 'Passcode cannot be empty';	
            NumpadAlertOk('invalid_passcode', msg)
            .then(function(){
                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            })
            setTimeout($.unblockUI, 100);
        }    
    })

    var DrawerManagerState = false;
    var DrawerManagerCount = false;
    var DrawerManagerReconcile = false;
    var DrawerManagerHistoryCount = false;
    var DrawerManagerHistoryReconcile = false;
    var DrawerManagerCashIn = false;

    var DrawerManagerDenomintationGrid = (SCUnique = 0) => { 
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

        var postdata ="station_server_unique="+SCUnique;
        posData.DrawerManagerGrid(postdata)
        .success(function(data){
            
            var CashInTitle = (data.StationCashierUnique != 'null' ? data.StationCashierUnique : '');

            $("#cashin_denomination").jqxWindow("setTitle", 'Cash In '+CashInTitle + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);

            var DenominationTotal = 0;
            $.each(data.Denomination, function(index, value){

                if(POSPaymentNumpad == 1){
                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        
                        if(thirdClass == value.DenominationIndex){
                            var ExtTotal = parseFloat(value.Extended).toFixed(2);
                            ExtTotal = ExtTotal.toString();
                            $("#"+id).maskMoney('mask',ExtTotal);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);
                            
                            var MultiplyVal = parseInt(curVal / DenominationVal);

                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })

                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = "Other";
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })
                    
                }else{

                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);

                            var MultiplyVal = parseInt(curVal / DenominationVal);
                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })
                    
                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = 'Other';
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })
                }
            })

            $("#denomination_total_total").val( parseFloat(DenominationTotal).toFixed(2) );
        })
    }

    var DrawerManagerHistoryDenominationCountSave = (Denodata) => {
        var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);
        var CashInTitle = rowdata.StationCashierUnique;$("#cashin_denomination").jqxWindow("setTitle", 'Count '+CashInTitle + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);

        var postdata ="LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            postdata+="&CashInMethod="+rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&PaymentMenu="+rowdata.PaymentMenu;
            postdata+="&UserUnique="+rowdata.UserUnique;
        
        posData.DrawerManagerSaveCount(postdata)
        .success(function(data){
            GetDrawerManagerHistoryList();
        })
    }

    var DrawerManager_Denomination_Save = (Denodata) => {
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

        var postdata ="LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            postdata+="&CashInMethod="+rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&PaymentMenu="+rowdata.PaymentMenu;
            postdata+="&UserUnique="+DrawerManagerUserUnique;

        posData.DrawerDenominationSave(postdata)
        .success(function(data){
            LoadHeaderInfo();
            DrawerManagerGrid(data);
            console.log("kvkxs");
            $("#DrawerManagerCount").jqxButton({disabled: false});
            $("#DrawerManagerReconcile").jqxButton({disabled: false});
            if($("#cashin_denomination").length > 0){
                $("#cashin_denomination").jqxWindow("setTitle", 'Cash In Denomination '+data.StationCashierUnique + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);
            }
        })
    }

    var DrawerManagerUserUnique;
    var DrawerManager_Denomination_Print = (Denodata) => {
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
        var postdata ="LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            postdata+="&CashInMethod="+rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&StationName="+rowdata.StationName;
            postdata+="&UserUnique="+DrawerManagerUserUnique;
        
        posData.CashDrawerCashInDenominationPrint(postdata)
        .success(function(data){
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }

            DrawerManagerGrid(data);

            LoadHeaderInfo();
            $("#cashin_denomination").jqxWindow("setTitle", 'Cash In '+data.StationCashierUnique + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);
            setTimeout($.unblockUI, 100);
            $("#cashin_denomination_print").prop("disabled", false);    
            $("#cashin_denomination_save").prop("disabled", true);    
        })
    }

    var DrawerManagerDenominationCount = (gridId) => {
        var rowindex = $("#"+gridId).jqxGrid('getselectedrowindex');
        var rowid = $("#"+gridId).jqxGrid('getrowid', rowindex);
        var rowdata = $("#"+gridId).jqxGrid('getrowdatabyid', rowid);
        var CashInTitle = rowdata.StationCashierUnique;$("#cashin_denomination").jqxWindow("setTitle", 'Count '+CashInTitle + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);
        
        var postdata ="station_server_unique="+rowdata.StationCashierUnique;
        posData.GetStationCashOutDenomination(postdata)
        .success(function(data){
            var DenominationTotal = 0;
            $.each(data.Denomination, function(index, value){

                if(POSPaymentNumpad == 1){
                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        
                        if(thirdClass == value.DenominationIndex){
                            var ExtTotal = parseFloat(value.Extended).toFixed(2);
                            ExtTotal = ExtTotal.toString();
                            $("#"+id).maskMoney('mask',ExtTotal);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);
                            
                            var MultiplyVal = parseInt(curVal / DenominationVal);

                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })

                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = "Other";
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })
                    
                }else{

                    $(".denomination-input-total").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = $("#"+id).attr('class').split(' ')[2];
                        var denomQty = "amount_"+id.split("_")[2];
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);

                            var DenominationVal = value.DenominationVal;
                            var curVal = value.Extended;
                            DenominationTotal += Number(value.Extended);

                            var MultiplyVal = parseInt(curVal / DenominationVal);
                            $("#denomination_"+denomQty).val(MultiplyVal);
                        }
                    })
                    
                    $(".denomination-input-other").each(function(){
                        var id = $(this).attr('id');
                        var thirdClass = 'Other';
                        if(thirdClass == value.DenominationIndex){
                            $("#"+id).val(value.Extended);
                            DenominationTotal += Number(value.Extended);
                        }
                    })
                }
            })

            $("#denomination_total_total").val( parseFloat(DenominationTotal).toFixed(2) );
        })
    }

    var DrawerManagerDenominationCountSave = (Denodata) => {
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
        var CashInTitle = rowdata.StationCashierUnique;$("#cashin_denomination").jqxWindow("setTitle", 'Count '+CashInTitle + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);

        var postdata ="LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            postdata+="&CashInMethod="+rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&PaymentMenu="+rowdata.PaymentMenu;
            postdata+="&UserUnique="+rowdata.UserUnique;
        
        posData.DrawerManagerSaveCount(postdata)
        .success(function(data){
            posData.GetManagerDrawerLocationList()
            .success(function(data){
                DrawerManagerGrid(data);
            })
        })
    }

    var DrawerManagerGrid = (data = []) => {
        var source = {
            datatype: 'json',
            datafields: [
                {name: 'StationCashierUnique', type: 'int'},
                {name: 'LocationName', type: 'string'},
                {name: 'StationName', type: 'string'},
                {name: 'Created', type: 'date'},
                {name: 'CashInBy', type: 'string'},
                {name: 'CashInAmount', type: 'float'},
                {name: 'LocationUnique', type: 'int'},
                {name: 'StationUnique', type: 'int'},
                {name: 'CashInMethod', type: 'int'},
                {name: 'UserUnique', type: 'int'},
                {name: 'PaymentMenu', type: 'int'},
                {name: 'Counted', type: 'float'},
                {name: 'Method', type: 'string'},
                
            ],
            localdata: data.GridList
        }

        var dataAdapter = new $.jqx.dataAdapter(source);
        
        $("#drawer_sessions").jqxGrid({
            width: '100%',
            height: 550,
            source: dataAdapter,
            theme: GridTheme,
            scrollbarsize: GridScrollBarSize,
            statusbarheight: GridRowHeight,
            rowsheight: GridRowHeight,
            altrows: true,
            sortable: true,
            columnsresize: true,
            columns: [
                {text: 'ID', datafield: 'StationCashierUnique', width: '5%'},
                {text: 'Location', datafield: 'LocationName', width: '15%', hidden: true},
                {text: 'Station', datafield: 'StationName', width: '20%'},
                {text: 'Method', datafield: 'Method', width: '17%'},
                {text: 'Started', datafield: 'Created', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                {text: 'Cashier', datafield: 'CashInBy', width: '16%'},
                {text: 'Cash In', datafield: 'CashInAmount', width: '11%', align: 'right', cellsalign: 'right', cellsformat: 'd2'},
                {text: 'Counted', datafield: 'Counted', width: '11%', align: 'right', cellsalign: 'right', cellsformat: 'd2'}
            ]
        })
    }

    var DrawerManagerHistory = (data = []) => {
        var source = {
            datatype: 'json',
            datafields: [
                {name: 'StationCashierUnique', type: 'int'},
                {name: 'LocationName', type: 'string'},
                {name: 'StationName', type: 'string'},
                {name: 'Created', type: 'date'},
                {name: 'CashInBy', type: 'string'},
                {name: 'CashInAmount', type: 'float'},
                {name: 'LocationUnique', type: 'int'},
                {name: 'StationUnique', type: 'int'},
                {name: 'CashInMethod', type: 'int'},
                {name: 'UserUnique', type: 'int'},
                {name: 'PaymentMenu', type: 'int'},
                {name: 'Counted', type: 'float'},
                {name: 'Method', type: 'string'},
                {name: "CashOut", type: 'date'}
            ],
            localdata: data
        }

        var dataAdapter = new $.jqx.dataAdapter(source);
        
        $("#drawer_sessions_history").jqxGrid({
            width: '100%',
            height: 525,
            source: dataAdapter,
            theme: GridTheme,
            scrollbarsize: GridScrollBarSize,
            statusbarheight: GridRowHeight,
            rowsheight: GridRowHeight,
            altrows: true,
            sortable: true,
            columnsresize: true,
            columns: [
                {text: 'ID', datafield: 'StationCashierUnique', width: '5%'},
                {text: 'Location', datafield: 'LocationName', width: '10%', hidden: true},
                {text: 'Station', datafield: 'StationName', width: '10%'},
                {text: 'Method', datafield: 'Method', width: '13%'},
                {text: 'Started', datafield: 'Created', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                {text: 'End', datafield: 'CashOut', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                {text: 'Cashier', datafield: 'CashInBy', width: '13%'},
                {text: 'Cash In', datafield: 'CashInAmount', width: '10%', align: 'right', cellsalign: 'right', cellsformat: 'd2'},
                {text: 'Counted', datafield: 'Counted', width: '9%', align: 'right', cellsalign: 'right', cellsformat: 'd2'}
            ]
        })

        $("#drawer_sessions_history").on('rowselect', function(event){
            // event arguments.
            var args = event.args;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;


            $("#DrawerManagerEdit, #DrawerManagerPrintHistory, #DrawerManagerEditOption").jqxButton({disabled: false});
        })
    }
    
    var CashDrawerReconcile = function(){
        var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);

        var postdata ="UserUnique="+rowdata.UserUnique;
            postdata+="&StationCashierUnique="+rowdata.StationCashierUnique;
        
        CashOutStationUserUnique = rowdata.UserUnique;

        posData.CashOutStationCheckCashIn(postdata)
        .success(function(data){
            if(CashOutBlind > 0){
                CashCountProcessServerBlind(rowdata.StationCashierUnique)
                .then(function(){
                    if( $("#CashDrawerOpen").val() == 1 ){
                        // OpenCashDrawer(); disabled git issue 867 #10
                    }else{
                        setTimeout($.unblockUI, 100);
                    }
                })
            }else{
                CashCountProcessServer(rowdata.StationCashierUnique)
                .then(function(){
                    if( $("#CashDrawerOpen").val() == 1 ){
                        // OpenCashDrawer(); disabled git issue 867 #10
                    }else{
                        setTimeout($.unblockUI, 100);
                    }
                })
            }
            
        })
        getOnHoldReceipts(rowdata.UserUnique);
    }

    var CashDrawerHistoryReconcile = function(){
        var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
        var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
        var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);
       
        var postdata ="UserUnique="+rowdata.UserUnique;
            postdata+="&StationCashierUnique="+rowdata.StationCashierUnique;

        CashOutStationUserUnique = rowdata.UserUnique;

        posData.CashOutStationCheckCashInHistory(postdata)
        .success(function(data){
            if(CashOutBlind > 0){
                
            }else{
                CashCountHistoryProcessServer(rowdata.StationCashierUnique)
                .then(function(){
                    setTimeout($.unblockUI, 100);
                })
            }
            
        })
        getOnHoldReceipts(rowdata.UserUnique);
        // $("#server_cashin").jqxWindow('close');
    }

    var DrawerManager_Denomination_Count_Print = (Denodata) => {
        if(DrawerManagerHistoryCount){
            var rowindex = $("#drawer_sessions_history").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions_history").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions_history").jqxGrid('getrowdatabyid', rowid);    
        }else{
            var rowindex = $("#drawer_sessions").jqxGrid('getselectedrowindex');
            var rowid = $("#drawer_sessions").jqxGrid('getrowid', rowindex);
            var rowdata = $("#drawer_sessions").jqxGrid('getrowdatabyid', rowid);
        }
        
        var postdata ="LocationUnique="+rowdata.LocationUnique;
            postdata+="&StationUnique="+rowdata.StationUnique;
            postdata+="&CashInMethod="+rowdata.CashInMethod;
            postdata+="&StationCashierUnique="+(rowdata.StationCashierUnique != undefined ? rowdata.StationCashierUnique : null);
            postdata+="&Denomination="+JSON.stringify(Denodata);
            postdata+="&DenominationOther="+ $("#denomination_total_other").val();
            postdata+="&StationName="+rowdata.StationName;
            postdata+="&UserUnique="+rowdata.UserUnique;
        console.log("print", postdata);
        posData.CashDrawerCountDenominationPrint(postdata)
        .success(function(data){
            if(data.print == false){
                var msg="Printer error, please check <br/>";
                    msg+="1. Printer is turned on. <br/>";
                    msg+="2. Check printer paper. <br/>";
                    msg+="3. Restart printer.";
                NumpadAlertClose('daily_sales_no_data', msg)
                .then(function(){
                    WindowPopupAlert('Printer problem');
                })
            }

            LoadHeaderInfo();
            $("#cashin_denomination").jqxWindow("setTitle", 'Count '+data.StationCashierUnique + ' | ' + rowdata.LocationName + ' | ' + rowdata.StationName);
            setTimeout($.unblockUI, 100);
            $("#cashin_denomination_print").prop("disabled", false);    
            $("#cashin_denomination_save").prop("disabled", true);    
        })
    }

    $(document).on('submit', '#MenuSecurity', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
            posData.EnterUserPasscode(postdata)
            .success(function(data){
                if(data.success){
                    if(data.Proceed){
                        var postdata ="Position="+data.Position;
                            postdata+="&Module=Cashier";
                            postdata+="&Function=CashierSettings";
                        posData.MenuSecurityCheck(postdata)
                        .success(function(data2){
                            if(data2.success){
                                NumpadThemeMenu()
                                .then(function(){
                                    WindowThemeMenu()
                                    .then(function(){
                                        LoadMenuListSetting();
                                    })
                                })
                            }else{
                                NumpadAlertOk('user_invalid', data2.msg)
                                .then(function(){
                                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                })       
                            }
                        })
                    }else{
                        NumpadAlertOk('user_invalid', data.msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }

                }else{
                    NumpadAlertOk('user_invalid', data.msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }

                $("#dialog-numpad-passcode").jqxWindow('close');
            })
        }
    })


    //------------------------------//
        /* END Controller */
    //-----------------------------//

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