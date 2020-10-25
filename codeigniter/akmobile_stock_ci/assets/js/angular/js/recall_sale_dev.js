(function() {
    ShouldChange = false;
    var GlobalItemUnique = {};
    var FunctionNameButton = '';
	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter) {
        var sizemode = 20;
        var enableAggregates = $("#AggregateTotal").val();
        if(enableAggregates == 1){
            enableAggregates = false;
        }else{
            enableAggregates = true;
        }

        $("#primaryButton").jqxButton({ template: "primary", height: '40px', width: '50px'});
        $("#successButton").jqxButton({ template: "success", height: '40px', width: '50px'});
        $("#dangerButton").jqxButton({ template: "danger", height: '45px', width: '50px'});
        // $("#successButtonDisable").jqxButton({ template: "success", height: '30px', width: '50px', disabled: false});

		var ResoWidth 	        = $("#fakeheight").width();
        var ResoHeight 	        = $("#fakeheight").height();
        var ComputeHeight		= ResoHeight - 190;
        var UseHeight			= ComputeHeight;
        var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
        var GridTheme = $("#GridTheme").val();
		var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
        var GridRowHeight = parseInt($("#GridRowHeight").val());

        console.log("GridRowHeight", GridScrollBarSize);
        $scope.CashInWhen = true;
        $(".completed_bar").hide();

        $scope.dateInputFromstring = 'MM/dd/yyyy';
		$scope.dateInputTostring = 'MM/dd/yyyy';

		$scope.dateInputSettingsFrom = {
			width: 105,
			height: 40
		}

		$scope.dateInputSettingsTo = {
			width: 105,
			height: 40
		}

		$scope.date = {
			from: $filter('date')(new Date(), 'MM/dd/yyyy'),
			to: $filter('date')(new Date(), 'MM/dd/yyyy')
        }
        
        myNumber = '';

        var rendererDate = function (row, column, value) {
            return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + $filter('date')(new Date(value), 'MM/dd/yy hh:mm a') + '</span>';
        }

        var populateAlertViewEditCancel = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-alert-view-edit-cancel").append('<div id="view_edit_cancel" style="background: #144766;"></div>');
                $("#view_edit_cancel").html('');
				$("#view_edit_cancel").append(''+
					'<form id="'+form_name+'">'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
        
        /* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlertViewEditCancel = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-alert-view-edit-cancel").jqxWindow({
					height: 120,
					width: 260,
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
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
				$('#keyboard').hdkeyboard({
					layout: "alert_recall_view_edit_cancel",
					input: $('#number_field')
				});
				def.resolve();
			})
			return def.promise();
		}

        
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

        /* @param string header_text */
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
					draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
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

        var WindowPopupPrintAlert = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-alert").jqxWindow({
					height: 245,
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
					$('#dialog-alert').jqxWindow('setTitle', header_text);
					$('#dialog-alert').jqxWindow('open');
					$(".alert_okay").focus();
				},100);
				def.resolve();	
			},100);
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

        $("#dialog-numpad-alert").on('close', function(event){
			$("#alert-msg-popup").html('');
		})

        $("#dialog-alert-view-edit-cancel").on('close', function(event){
            $("#view_edit_cancel").html('');
        })

        $("#dialog-numpad-passcode").on("close", function(event){
            $("#passcode_numpad").html('');
        })

        var PoleDisplayTotal = function(){
		   var def = $.Deferred();
		   posData.PoleDisplayTotal()
		   .success(function(data){
			 def.resolve(); 
		   })
		   return def.promise();	 
	    }


        /*Method LoadStationData*/
        var LoadStationData = function(){
			var def = new $.Deferred();
			$http({
				method: 'GET',
				url: base_url+'pos/pointofsale/station/info'
			}).success(function(data){
				var source = {
					datatype: "json",
					datafields: [
						{ name: 'Unique' },
						{ name: 'LocationName' }
					],
					localdata: data
				};
				var dataAdapter = new $.jqx.dataAdapter(source);
                $("#Station").jqxComboBox({ selectedIndex: 0, source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 40});
                $("#Station").on('select', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        if (item) {
                            //item.value or item.label
                        }
                    }
                });
				def.resolve();
			})
			return def.promise();
		}
        /* End */


        var populateAlertProcess = function(form_name, msg){
			var def = new $.Deferred();
			setTimeout(function(){
				$("#custom_process").html('');
				$("#custom_process").append(''+
					'<form id="'+form_name+'">'+
						'<h4 id="alert-msg">'+msg+'</h4>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}


        var NumpadPromptAlertProcess = function(msg){ 
			var def = $.Deferred();
			populateAlertProcess('recall_print_process_alert_form', msg)
			.then(function(){
				def.resolve();
			});
			return def.resolve();
		}

        /* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlertProcess = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-process").jqxWindow({
					height: size[0],
					width: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.length > 0)
					$('#dialog-process').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-process').jqxWindow('open');
				}else{
					$('#dialog-process').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}

        var populateAlert = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_alert").html('');
				$("#custom_alert").append(''+
                    '<h4 id="alert-msg">'+msg+'</h4>'+
					'<form id="'+form_name+'">'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard_alert"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}

        var NumpadPromptAlertPrinterProblem = function(msg){
			var def = $.Deferred();
			populateAlert('recall_printer_problem_alert_form', msg)
			.then(function(){
				$('#keyboard_alert').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}

        //--> Printer Check Connection
        var PrinterCheck = function(Unique){
            var def = $.Deferred();
            var msg="Printing Receipt <br/>";
                msg+="Please wait...";
            $("body").block({"message":msg});    
            setTimeout(function(){
                var postdata ="receipt_header_unique="+Unique;
                posData.PrinterCheckRecall(postdata)
                .success(function(data){
                    $("#dialog-alert").jqxWindow("close");
                    if(data.success == true){
                        if(data.print == true){
                            /* do nothing */
                            load_data(data);
                            $("#dialog-process").jqxWindow('close');
                            def.resolve();
                        }else{
                            var msg="Printer error, please check <br/>";
                                msg+="1. Printer is turned on. <br/>";
                                msg+="2. Check printer paper. <br/>";
                                msg+="3. Restart printer.";
                            
                            NumpadPromptAlertPrinterProblem(msg)
                            .then(function(){
                                WindowPopupPrintAlert('Printer Problem')
                            });
                        }
                    }else{
                        var msg="Printer error, please check <br/>";
                            msg+="1. Printer is turned on. <br/>";
                            msg+="2. Check printer paper. <br/>";
                            msg+="3. Restart printer.";
                        
                        NumpadPromptAlertPrinterProblem(msg)
                        .then(function(){
                            WindowPopupPrintAlert('Printer Problem')
                        });
                    }
                    $("body").unblock();
                })
            },500)
            return def.promise();
        };

        var load_data = function(data){
            /*
            |--------------------------------------------------------|
            | Receipt PDF
            |--------------------------------------------------------|
            */
            if(data.PDFReceipt){
                console.log(data.PDFReceipt);
                var PathReceiptPDF = base_url + data.PDFReceipt;
                testpdf_receipt(PathReceiptPDF);
            }
        }
    
        function testpdf_receipt(pathToPdf) {
            const frame = document.createElement('iframe')
            frame.src = pathToPdf.trim()
            frame.style = "display:none;";
            const container = document.getElementsByTagName('body') // this will return a NodeList
            container[0].appendChild(frame);
            frame.contentWindow.print();
        }

        $(document).on("click", "#recall_printer_problem_alert_form", function(){
            $('#dialog-alert').jqxWindow('close');
        });

        //--> Printer Check Connection
        var VoidPrinterCheck = function(Unique){
            var def = $.Deferred();
            var msg="Printing Receipt <br/>";
                msg+="Please wait...";
            $("body").block({"message":msg});       
            setTimeout(function(){
                var postdata ="receipt_header_unique="+Unique;
                posData.PrinterCheckRecallVoid(postdata)
                .success(function(data){
                    $("#dialog-alert").jqxWindow("close");
                    if(data.success == true){
                        if(data.print == true){
                            /* do nothing */
                            load_data(data);
                            $("#dialog-process").jqxWindow('close');
                            def.resolve();
                        }else{
                            var msg="Printer error, please check <br/>";
                                msg+="1. Printer is turned on. <br/>";
                                msg+="2. Check printer paper. <br/>";
                                msg+="3. Restart printer.";
                            
                            NumpadPromptAlertPrinterProblem(msg)
                            .then(function(){
                                WindowPopupPrintAlert('Printer Problem')
                            });
                            
                        }
                    }else{
                        var msg="Printer error, please check <br/>";
                            msg+="1. Printer is turned on. <br/>";
                            msg+="2. Check printer paper. <br/>";
                            msg+="3. Restart printer.";
                        
                        NumpadPromptAlertPrinterProblem(msg)
                        .then(function(){
                            WindowPopupPrintAlert('Printer Problem')
                        });
                    }
                    $("body").unblock();
                })
            },500)
            return def.promise();
        };

        /*Method LoadStationCashIn*/
        var LoadStationCashIn = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/station-cashier/info'
			}).success(function(data){
				var source = {
					datatype: "json",
					datafields: [
						{ name: 'station_cashier_unique' },
						{ name: 'CashInNumber' }
					],
					localdata: data
				};
				var dataAdapter = new $.jqx.dataAdapter(source);
                $("#CashIn").jqxComboBox({ selectedIndex: 0, source: dataAdapter, displayMember: "CashInNumber", valueMember: "station_cashier_unique", width: 200, height: 40});
                $("#CashIn").on('select', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        if (item) {
                            //item.value or item.label
                            $("body").block({message: 'Processing please wait...'});
                            recall_by_location = 6;
                            var args = event.args;
                            if (args) {
                                var item = args.item;
                                $scope.StatCashIn = item.value;
                                
                                $("#OnHold").hide();
                                $("#Completed").hide();
                                $("#Cash").hide();
                                $("#CreditCard").hide();
                                $("#GiftCard").hide();
                                $("#CashInGrid").show();
                                $("#EBTGrid").hide();
                                $("#CheckGrid").hide();
                                $("#Voided").hide();

                                currentGridOpen = 'CashInGrid';

                                $scope.CashInWhen = true;
                                $(".completed_bar").show();

                                $scope.RecallSale = {
                                    Selected: 0
                                }

                                $scope.rowReceiptHeader = {
                                    Unique: null
                                }

                                $scope.isOnHoldBold = false;
                                $scope.isCompletedBold = false;
                                $scope.isCashBold = false;
                                $scope.isCreditCardBold = false;

                                var postdata="datefrom=" + $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                                postdata+="&dateto=" + $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                                postdata+="&station=" + $scope.StatStationName;
                                postdata+="&cashin=" + $scope.StatCashIn;
                                postdata+="&status=4";
                                postdata+="&location="+$("#Locations").val();

                                $http({
                                    method: 'post',
                                    url: base_url+'pos/pointofsale/recall-by-cashin-location',
                                    data: postdata,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                }).success(function(data){
                                    var source = {
                                        datatype: "json",
                                        datafields: [
                                            { name: 'Unique', type: 'int' },
                                            { name: 'ReceiptDate', type: 'string' },
                                            { name: 'LocationName', type: 'string' },
                                            { name: 'StationName', type: 'string' },
                                            { name: 'ReceiptNumber', type: 'number' },
                                            { name: 'CustomerName', type: 'string'},
                                            { name: 'TotalSale', type: 'string'},
                                            { name: 'Paid', type: 'string'},
                                            { name: 'Status', type: 'string'},
                                            { name: 'Cashier', type: 'string'},
                                            { name: 'StationCashierUnique', type: 'int'},
                                            { name: 'CashOut', type: 'string'}
                                        ],
                                        localdata: data
                                    };
                                    var dataAdapter = new $.jqx.dataAdapter(source);
                                    $("#CashInGrid").jqxGrid({
                                        width: '100%',
                                        height: UseHeight,
                                        pagesize: ComputeDisplayRow,
                                        scrollbarsize: 25,
                                        source: dataAdapter,
                                        columnsresize: true,
                                        theme: 'darkblue',
                                        pageable: true,
                                        pagermode: 'advanced',
                                        sortable: true,
                                        filtermode: 'excel',
                                        showfilterrow: true,
                                        filterable: true,
                                        showaggregates: enableAggregates,
                                        showstatusbar: true,
                                        statusbarheight: 30,
                                        columns: [
                                            { text: 'Unique', dataField: 'Unique', hidden: true},
                                            { text: 'Date', dataField: 'ReceiptDate', width: '20%', filtertype: 'input', cellsRenderer: rendererDate },
                                            { text: 'Location', dataField: 'LocationName', width: '8%', filtertype: 'checkedlist' },
                                            { text: 'Station No.', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                                            { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
                                            { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                                            { text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', filtertype: 'number', cellsFormat: 'f2',
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
                                            { text: 'Paid', dataField: 'Paid', width: '12%', cellsalign: 'right', filtertype: 'number', cellsFormat: 'f2',
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
                                            { text: 'Status', dataField: 'Status', width: '10%', filtertype: 'input'},
                                            { text: 'Cashier', dataField: 'Cashier', width: '9%', filtertype: 'input'}
                                        ]
                                    })
                                    $('#CashInGrid').jqxGrid('clearselection');
                                    $("body").unblock();
                                })
                            }
                        }
                    }
                });
				def.resolve();
			})
			return def.promise();
		}
        /* End */

        /* Get Header information such like;
	    *  Receipt Number, Station Name, Location Name and Cashier Name.
		*/
		var LoadHeaderInfo = function(){
			var def = new $.Deferred(); 
			posData.GetHeaderInfoCompleted()
			.success(function(data){
				// $("#receiptn").text(data.receipt_number);
				$("#station").text(data.station_name);
				//$("#cashin").text(data.cashin);
				//$("#store_name").text(data.store_name);
				$("#user_name").text(data.user_name);
				$("#tableno").text(data.tableno);
				$scope.StatStationName = data.station_number;
				$scope.StatCashIn = data.cashin;
				$scope.TempStationName = data.recall_original_station;//data.station_number;
				$scope.TempCashIn = data.cashin;
				def.resolve();
			})
			return def.promise();
		};
		/* End */

        /*Method ConfigStation */
        var ConfigStation = function(){
			var def = new $.Deferred();
			posData.ConfigStation()
			.success(function(data){
				$scope.print_receipt = data.print_receipt;
				def.resolve();
			})
			return def.promise();
		};
        /* End */

        /*Load Recall OnHold*/
        var load_recall = function(){
			var def = $.Deferred();
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

			setTimeout(function(){
				def.resolve();
			},100);

			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+ $scope.StatStationName;
                postdata+="&status=5";
                postdata+="&location="+ $("#Station").val();
                
            $http({
                method: 'post',
                data: postdata,
                url: base_url + "pos/pointofsale/load-recall-sale",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var ComputeHeight		= ResoHeight - 180;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#OnHold").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '6%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName',width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', filtertype: 'number', align: 'right', cellsalign: 'right', cellsformat: 'd2',				
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
                        { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Balance', dataField: 'Balance', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                $("body").unblock();
            })
			return def.promise();
		}
        /* End */

        var LoadingBackgroundTemplate = function(status=false, msg=false){
            if(status){
                $.blockUI({ css: { 
                    border: '2px solid #fff',
                    padding: '15px', 
                    backgroundColor: '#210e66', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: 1, 
                    color: '#fff',
                    fontSize: '20px' 
                }, message: msg });
            }else{
                setTimeout($.unblockUI, 100);
            }
        }

        /* Pre Load List */
        //-->Load Station
        LoadHeaderInfo()
	    .done(function(){
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            LoadStationData()
            .done(function(){
                LoadStationCashIn()
                .done(function(){
                    $("#Station").val($scope.LocationID);
                    ConfigStation()
                    .done(function(){
                        posData.GetDefaultTab()
                        .success(function(data){
                           var CompletedFunction = eval(data.Function);
                           CompletedFunction();
                           LoadingBackgroundTemplate(false);
                        })
                    })
                })
            })
        })
        /* End */

        /*OnHold Button*/
        $scope.SelOnHoldOld = function(){
            $("body").block({message: 'Processing please wait...'});
            recall_by_location = 1;
            FunctionNameButton = 'Completed/OnHold/';
            $("#Completed").hide();
            $("#OnHold").show();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'OnHold';

            // $scope.CashInWhen = false;
            $(".completed_bar").hide();

            $scope.RecallSale = {
                Selected: 5
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = true;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = false;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&station="+ $scope.StatStationName;
            postdata+="&status=5";
            postdata+="&location="+ $("#Station").val();

            $http({
                method: 'post',
                data: postdata,
                url: base_url + "pos/pointofsale/load-recall-sale",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#OnHold").jqxGrid({
                    source: dataAdapter
                })
                $('#OnHold').jqxGrid('clearselection');
                $("body").unblock();
            })
        }
        
        $scope.SelOnHold = function(){
            var def = $.Deferred();
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 1;
            FunctionNameButton = 'Completed/OnHold/';
            $("#Completed").hide();
            $("#OnHold").show();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'OnHold';

            console.log(currentGridOpen);

            // $scope.CashInWhen = false;
            $(".completed_bar").hide();

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

			setTimeout(function(){
				def.resolve();
			},100);

			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+ $scope.StatStationName;
                postdata+="&status=5";
                postdata+="&location="+ $("#Station").val();
                
            $http({
                method: 'post',
                data: postdata,
                url: base_url + "pos/pointofsale/load-recall-sale",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var ComputeHeight		= ResoHeight - 180;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                //oh1
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#OnHold").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '6%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName',width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', filtertype: 'number', align: 'right', cellsalign: 'right', cellsformat: 'd2',				
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
                        { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
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
                        { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
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
                        { text: 'Balance', dataField: 'Balance', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#OnHold').jqxGrid('clearselection');
            })
        }

        var ReceiptOpenRestriction = function(){

        }

        /*Completed Button Current*/
        $scope.SelCompleted = function(){
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 2;
            FunctionNameButton = 'Completed/Completed/';
            $("#OnHold").hide();
            $("#Completed").show();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'Completed';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 4
            }

            $scope.GlobalRecall = {
                Type: 4
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = true;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = false;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+$scope.StatStationName;
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();

            $http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-completed/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
                var source ={
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
        
                $("#Completed").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '8%', filtertype: 'checkedlist' },
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Change', dataField: 'Balance', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#Completed').jqxGrid('clearselection');
            }) 
        }

        /*Cash Button */
        $scope.RecallCashType = function(type){
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 3;
            FunctionNameButton = 'Completed/Cash/';

            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").show();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'Cash';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 1
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = true;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = false;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&type="+ type;
                postdata+="&station="+$scope.StatStationName;
                postdata+="&cashin="+ $scope.StatCashIn
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();

                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/recall-by-type',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'number'},
                            { name: 'Tax', type: 'number'},
                            { name: 'TotalSale', type: 'number'},
                            { name: 'Paid', type: 'number'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'},
                            { name: 'StationCashierUnique', type: 'int'},
                            { name: 'CashOut', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#Cash").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
                        source: dataAdapter,
                        columnsresize: true,
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showaggregates: enableAggregates,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        columnsResize: true,
                        rowsheight: GridRowHeight,
                        columns: [
                            { text: 'Unique', dataField: 'Unique', hidden: true},
                            { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                            { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                            { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                            { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Cash', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#Cash').jqxGrid('clearselection');    
            })
        }

        /*Credit Card Button */
        $scope.RecallCCType = function(type){
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 4;
            FunctionNameButton = 'Completed/Credit Card/';

            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").show();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'CreditCard';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 2	
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ type;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#CreditCard").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Credit Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#CreditCard').jqxGrid('clearselection');
            })
            
        }

        /*Gift Card Button */
        $scope.RecallGCType = function(type){
            if(!type){
                type = 6;
            }

            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 5;
            FunctionNameButton = 'Completed/Gift Card/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").show();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'GiftCard';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 6
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isGiftCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ type;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#GiftCard").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Gift Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'input', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#GiftCard').jqxGrid('clearselection');
            })
        }

        /* EBT Card Button*/
        $scope.RecallEBT = function(type){
            
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 7;
            FunctionNameButton = 'Completed/EBT/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").show();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 7
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isGiftCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ 2;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            postdata+="&ebt=ebt";
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#EBTGrid").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: 25,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: 'darkblue',
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: 30,
                    columnsResize: true,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'EBT', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                LoadingBackgroundTemplate(false);
                $('#EBTGrid').jqxGrid('clearselection');
            })
        }

        /*Cash Button */
        $scope.RecallCheck = function(type){
            if(!type){
                type = 6;
            }
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            recall_by_location = 8;
            FunctionNameButton = 'Completed/Check/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").show();
            $("#Voided").hide();

            currentGridOpen = 'CheckGrid';
            
            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 8
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
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
                postdata+="&location="+$("#Station").val();

                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/recall-by-type',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'float'},
                            { name: 'Tax', type: 'float'},
                            { name: 'TotalSale', type: 'float'},
                            { name: 'Paid', type: 'float'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'},
                            { name: 'CheckNo', type: 'string'},
                            { name: 'StationCashierUnique', type: 'int'},
                            { name: 'CashOut', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#CheckGrid").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
                        source: dataAdapter,
                        columnsresize: true,
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showaggregates: enableAggregates,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        columnsResize: true,
                        rowsheight: GridRowHeight,
                        columns: [
                            { text: 'Unique', dataField: 'Unique', hidden: true},
                            { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                            { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                            { text: 'Receipt', dataField: 'ReceiptNumber', width: '9%', filtertype: 'number' },
                            { text: 'SubTotal', dataField: 'SubTotal', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Total', dataField: 'TotalSale', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Check', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'input', cellsFormat: 'd2',
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
                            { text: 'No', dataField: 'CheckNo', width: '8%', filtertype: 'input' },
                        ]
                    })
                LoadingBackgroundTemplate(false);
                $('#CheckGrid').jqxGrid('clearselection');
            })
        }

        $scope.RecallSearch = function(){
            var RecallSaleSelected  = $scope.RecallSale.Selected;
            var RecallSaleType      = $scope.GlobalRecall.Type;
            LoadingBackgroundTemplate(true, "Please wait while loading data...");
            //--> Cash
            $scope.rowReceiptHeader = {
                Unique: null
            }
            if(RecallSaleSelected == 1){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&type="+RecallSaleType;
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn;
                    postdata+="&status=4";
                    postdata+="&location="+$("#Station").val();
                    $http({
                        method: 'post',
                        url: base_url+'pos/pointofsale/recall-by-type',
                        data: postdata,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique', type: 'int' },
                                { name: 'ReceiptDate', type: 'string' },
                                { name: 'LocationName', type: 'string' },
                                { name: 'StationName', type: 'string' },
                                { name: 'ReceiptNumber', type: 'number' },
                                { name: 'CustomerName', type: 'string'},
                                { name: 'SubTotal', type: 'number'},
                                { name: 'Tax', type: 'number'},
                                { name: 'TotalSale', type: 'number'},
                                { name: 'Paid', type: 'number'},
                                { name: 'Status', type: 'string'},
                                { name: 'Cashier', type: 'string'},
                                { name: 'StationCashierUnique', type: 'int'},
                                { name: 'CashOut', type: 'string'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#Cash").jqxGrid({
                            source: dataAdapter,
                        })
                        $('#Cash').jqxGrid('clearselection');
                        $("body").unblock();
                    })
            //--> Credit Card
            }else if(RecallSaleSelected == 2){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&type="+RecallSaleType;
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn
                    postdata+="&status=4";
                    postdata+="&location="+$("#Station").val();
                    $http({
                        method: 'post',
                        url: base_url+'pos/pointofsale/recall-by-type',
                        data: postdata,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique', type: 'int' },
                                { name: 'ReceiptDate', type: 'string' },
                                { name: 'LocationName', type: 'string' },
                                { name: 'StationName', type: 'string' },
                                { name: 'ReceiptNumber', type: 'number' },
                                { name: 'CustomerName', type: 'string'},
                                { name: 'SubTotal', type: 'number'},
                                { name: 'Tax', type: 'number'},
                                { name: 'TotalSale', type: 'number'},
                                { name: 'Paid', type: 'number'},
                                { name: 'Status', type: 'string'},
                                { name: 'Cashier', type: 'string'},
                                { name: 'StationCashierUnique', type: 'int'},
                                { name: 'CashOut', type: 'string'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);

                        $("#CreditCard").jqxGrid({
                            source: dataAdapter,
                        })
                        $('#CreditCard').jqxGrid('clearselection');
                        LoadingBackgroundTemplate(false);
                    })
            //-->Check        
            }else if(RecallSaleSelected == 3){         
                
            //--> Completed
            }else if(RecallSaleSelected == 4){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&status="+RecallSaleSelected;
                    postdata+="&location="+$("#Station").val();
                    $http({
                        method: 'post',
                        data: postdata,
                        url: base_url + "pos/pointofsale/load-recall-completed/data",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        var source ={
                            datatype: "json",
                            datafields: [
                                { name: 'Unique', type: 'int' },
                                { name: 'ReceiptDate', type: 'string' },
                                { name: 'LocationName', type: 'string' },
                                { name: 'StationName', type: 'string' },
                                { name: 'ReceiptNumber', type: 'number' },
                                { name: 'CustomerName', type: 'string'},
                                { name: 'SubTotal', type: 'number'},
                                { name: 'Tax', type: 'number'},
                                { name: 'TotalSale', type: 'number'},
                                { name: 'Paid', type: 'number'},
                                { name: 'Balance', type: 'number'},
                                { name: 'Status', type: 'string'},
                                { name: 'Cashier', type: 'string'},
                                { name: 'StationCashierUnique', type: 'int'},
                                { name: 'CashOut', type: 'string'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                
                        $("#Completed").jqxGrid({
                            source: dataAdapter,
                        })
                        $('#Completed').jqxGrid('clearselection');
                        LoadingBackgroundTemplate(false);
                    })
            //--> OnHold
            }else if(RecallSaleSelected == 5){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&station="+ $scope.StatStationName;
                    postdata+="&status=5";
                    postdata+="&location="+ $("#Station").val();
                    
                    $http({
                        method: 'post',
                        data: postdata,
                        url: base_url + "pos/pointofsale/load-recall-sale",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique', type: 'int' },
                                { name: 'ReceiptDate', type: 'string' },
                                { name: 'LocationName', type: 'string' },
                                { name: 'StationName', type: 'string' },
                                { name: 'ReceiptNumber', type: 'number' },
                                { name: 'CustomerName', type: 'string'},
                                { name: 'SubTotal', type: 'number'},
                                { name: 'Tax', type: 'number'},
                                { name: 'TotalSale', type: 'number'},
                                { name: 'Paid', type: 'number'},
                                { name: 'Balance', type: 'number'},
                                { name: 'Status', type: 'string'},
                                { name: 'Cashier', type: 'string'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);

                        $("#OnHold").jqxGrid({
                            source: dataAdapter
                        })
                        $('#OnHold').jqxGrid('clearselection');
                        LoadingBackgroundTemplate(false);
                    })
            //--> Gift Card
            }else if(RecallSaleSelected == 6){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&type="+ RecallSaleType;
                    postdata+="&station="+ $scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn;
                    postdata+="&status=4";
                    postdata+="&location="+ $("#Station").val();
                    $http({
                        method: 'post',
                        url: base_url+'pos/pointofsale/recall-by-type',
                        data: postdata,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique', type: 'int' },
                                { name: 'ReceiptDate', type: 'string' },
                                { name: 'LocationName', type: 'string' },
                                { name: 'StationName', type: 'string' },
                                { name: 'ReceiptNumber', type: 'number' },
                                { name: 'CustomerName', type: 'string'},
                                { name: 'SubTotal', type: 'number'},
                                { name: 'Tax', type: 'number'},
                                { name: 'TotalSale', type: 'number'},
                                { name: 'Paid', type: 'number'},
                                { name: 'Status', type: 'string'},
                                { name: 'Cashier', type: 'string'},
                                { name: 'StationCashierUnique', type: 'int'},
                                { name: 'CashOut', type: 'string'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);

                        $("#GiftCard").jqxGrid({
                            source: dataAdapter
                        })
                        $('#GiftCard').jqxGrid('clearselection');
                        LoadingBackgroundTemplate(false);
                    })
            //--> EBT
            }else if(RecallSaleSelected == 7){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&type="+ RecallSaleType;
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn;
                    postdata+="&status=4";
                    postdata+="&location="+$("#Station").val();
                    postdata+="&ebt=ebt";
                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/recall-by-type',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'number'},
                            { name: 'Tax', type: 'number'},
                            { name: 'TotalSale', type: 'number'},
                            { name: 'Paid', type: 'number'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'},
                            { name: 'StationCashierUnique', type: 'int'},
                            { name: 'CashOut', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#EBTGrid").jqxGrid({
                        source: dataAdapter
                    })
                    $('#EBTGrid').jqxGrid('clearselection');
                    LoadingBackgroundTemplate(false);
                })
            }else if(RecallSaleSelected == 0){
                LoadingBackgroundTemplate(false);

            }else if(RecallSaleSelected == 8){
                var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                    postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                    postdata+="&type="+ RecallSaleType;
                    postdata+="&station="+$scope.StatStationName;
                    postdata+="&cashin="+ $scope.StatCashIn;
                    postdata+="&status=4";
                    postdata+="&location="+$("#Station").val();
                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/load-recall-voided/data',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'number'},
                            { name: 'Tax', type: 'number'},
                            { name: 'Total', type: 'number'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'},
                            { name: 'StationCashierUnique', type: 'int'},
                            { name: 'CashOut', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#Voided").jqxGrid({
                        source: dataAdapter
                    })
                    $('#Voided').jqxGrid('clearselection');
                    LoadingBackgroundTemplate(false);
                })
            }
        }

        var OpenOnHoldReceipt = function(unique){
            var def = new $.Deferred();
            setTimeout(function(){
                var postdata="receiptunique="+unique;
                    postdata+="&FunctionName=Completed/On Hold/Open Receipt";
                posData.OpenReceipt(postdata)
                .success(function(data){
                    if(data.success == true){
                        if(data.can_open){
                            PoleDisplayTotal()
                            .then(function(){
                                $window.location = base_url + 'pos/pointofsale';
                            })
                        }else{
                            NumpadAlertClose('cannot_open_receipt', data.msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                            })
                        }
                    }else{
                        NumpadPromptAlertViewEditCancel()
                        .then(function(){
                            WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                        })
                    }
                    def.resolve();
                })
            },1000);
            return def.promise();
        }

        $scope.RecallOpen = function(){

            var index = $("#"+currentGridOpen).jqxGrid('getselectedrowindex');
            var row =  $("#"+currentGridOpen).jqxGrid('getrowdata', index);
            StationCashierUniqueCashedOut = row.CashOut;
            
            try {
                $scope.rowReceiptHeader.Unique
                var ReceiptHeaderUnique = true;
                $scope.RowUnique = $scope.rowReceiptHeader.Unique;
            }catch(err) {
                var ReceiptHeaderUnique = false;
            }
            
            if(ReceiptHeaderUnique){
                if(GridReceiptStatus == 5){
                    posData.CashInServerCheckByUserId()
                    .success(function(result){
                        if(result.cashin){
                            // var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
                            // posData.OpenReceipt(postData)
                            // .success(function(data){
                            //     if(data.can_open){
                                    OpenOnHoldReceipt($scope.rowReceiptHeader.Unique)
                                    .then(function(){
                                        // posData.BacktoRequestPage()
                                        // .success(function(data){
                                        //     //$window.location = base_url + data.redirect_to;
                                        // })
                                    })
                                // }else{
                                //     NumpadAlertClose('cannot_open_receipt', data.msg)
                                //     .then(function(){
                                //         WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                                //     })
                                // }
                            // })
                        }else{
                            NumpadAlertClose('cannot_open_receipt', result.msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                            })
                        }
                    })
                }else{
                    var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
                    posData.OpenReceipt(postData)
                    .success(function(data){
                        if(data.success == true){
                            if(data.can_open){
                                OpenOnHoldReceipt($scope.rowReceiptHeader.Unique)
                                .then(function(){
                                    posData.BacktoRequestPage()
                                    .success(function(data){
                                        //$window.location = base_url + data.redirect_to;
                                    })
                                })
                            }else{
                                NumpadAlertClose('cannot_open_receipt', data.msg)
                                .then(function(){
                                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                                })
                            }
                        }else{
                            NumpadPromptAlertViewEditCancel()
                            .then(function(){
                                WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                            })
                        }
                    })
                }
                
            }else{
                var msg="Please select receipt first";
                NumpadAlertOk('error_open', msg)
                .then(function(){
                    WindowPopupAlert('Open Receipt Info')
                })
            }
        };

        $(document).on("click", "#error_open .alert_okay", function(e){
            e.preventDefault();
            $('#dialog-numpad-alert').jqxWindow('close');
        })

        $(document).on("click", "#recall_print_failed .alert_okay", function(e){
             e.preventDefault();
             $("#dialog-numpad-alert").jqxWindow('close');
        })

        $scope.RecallExit = function(){
            posData.BacktoRequestPage()
            .success(function(data){
                $window.location = base_url + data.redirect_to;
            })
        };

        var GridReceiptStatus;
        $("#OnHold").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            currentGridOpen = 'OnHold';
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 5;
        })

        $("#Completed").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#Cash").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#CreditCard").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#GiftCard").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#EBTGrid").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#CashInGrid").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#CheckGrid").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#Voided").on('rowclick', function(event){
            var rowindex = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', rowindex);
            StationCashierUniqueCashedOut = row.CashOut;
            $scope.rowReceiptHeader = {
                Unique: row.Unique
            }
            GridReceiptStatus = 4;
        })

        $("#OnHold").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            posData.CashInServerCheckByUserId()
            .success(function(result){
                if(result.cashin){
                    OpenOnHoldReceipt(row.Unique);
                }else{
                    NumpadAlertClose('cannot_open_receipt', result.msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                    })
                }
            })
        });

        var POSReceiptEditPrevious = $("#POSReceiptEditPrevious").val();
        var StationCashierCashOut;
        var StationCashierUniqueCashedOut;
        $("#Completed").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            $scope.RowUnique = row.Unique;
            StationCashierCashOut = row.StationCashierUnique;
            StationCashierUniqueCashedOut = row.CashOut;
            var postdata ="receiptunique="+row.Unique;
                postdata+="&FunctionName="+FunctionNameButton;
            posData.OpenReceipt(postdata)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        })

        $("#Cash").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            StationCashierCashOut = row.StationCashierUnique;
            StationCashierUniqueCashedOut = row.CashOut;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });


        $("#CreditCard").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            StationCashierCashOut = row.StationCashierUnique;
            StationCashierUniqueCashedOut = row.CashOut;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $("#GiftCard").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            StationCashierCashOut = row.StationCashierUnique;
            StationCashierUniqueCashedOut = row.CashOut;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $("#CashInGrid").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $("#CheckGrid").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            StationCashierCashOut = row.StationCashierUnique;
            StationCashierUniqueCashedOut = row.CashOut;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $("#EBTGrid").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            editRow = index;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $("#Voided").on('rowdoubleclick', function(event){
            var index = event.args.rowindex;
            var datafield = event.args.datafield;
            var row = $(this).jqxGrid('getrowdata', index);
            StationCashierUniqueCashedOut = row.CashOut;
            editRow = index;
            var postData="receiptunique="+row.Unique;
            posData.OpenReceipt(postData)
            .success(function(data){
                if(data.success == true){
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
                }else{
                    NumpadPromptAlertViewEditCancel()
                    .then(function(){
                        WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
                    })
                }
            })
        });

        $(document).on('click', '#recall_view_edit_cancel .button_view', function(e){
            e.preventDefault();
            setTimeout(function(){
                var postdata="ReceiptHeaderUnique="+$scope.rowReceiptHeader.Unique;
                    postdata+="&FunctionName="+FunctionNameButton+"ViewReceipt";
                posData.ViewReceipt(postdata)
                .success(function(data){
                    if(data.success){
                        if(data.can_open){
                            $("#dialog-alert-view-edit-cancel").jqxWindow('close');
                            $window.location = base_url + data.landtopage;
                        }else{
                            NumpadAlertClose('cannot_open_receipt', data.msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                                .then(function(){
                                    $(".alert_close").focus();
                                })
                            }) 
                        }
                    }
                }).then(function(){
                    PoleDisplayReset();
                })
            },1000);
            StationCashierUniqueCashedOut = null;
        })

        //Passcode
		var populateNumpadPasscode = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
				$("#passcode_numpad").html('');
				$("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
				$("#passcode_numpad").append(''+
                '<form id="'+form_name+'">'+
					'<input type="password" class="hdfield" id="passcode_field" autocomplete="off" style="color:#000">'+
					'<div id="keyboard_passcode"></div>'+
                '</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupPasscode = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-passcode").jqxWindow({
                    /*
					height: 450,
                    minWidth: 300,
                    */
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
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
				  input: $('#passcode_field')
				});
				setTimeout(function(){
					$("#passcode_field").focus();
					def.resolve();
				},100);
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

        $(document).on('click', '#recall_view_edit_cancel .button_edit', function(){
            if(POSReceiptEditPrevious == 0){
                if(StationCashierUniqueCashedOut != null){
                    var msg = 'Cannot Edit<br/>Already Cashed Out'; 
                    NumpadAlertClose('cannot_open_receipt', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                    })
                }else{
                    posData.CashInServerCheckByUserId()
                    .success(function(result){
                        if(result.cashin){    
                            var postdata ="FunctionButton=EditReceipt";
                            posData.CheckUserManager(postdata)
                            .success(function(data){
                                if(data.prompt){
                                    $('#dialog-alert-view-edit-cancel').jqxWindow('close');
                                    NumpadPasscode('edit_receipt_passcode')
                                    .then(function(){
                                        WindowPopupPasscode('Edit Receipt Security')
                                        .then(function(){
                                            $("#passcode_field").focus();
                                        })
                                    })
                                }else{
                                    $('#dialog-alert-view-edit-cancel').jqxWindow('close');
                                    ProcessEditReceipt();
                                }
                            })
                        }else{
                            NumpadAlertClose('cannot_open_receipt', result.msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                            })
                        }
                    })
                }
            }else{
                posData.CashInServerCheckByUserId()
                .success(function(result){
                    if(result.cashin){    
                        var postdata ="FunctionButton=EditReceipt";
                        posData.CheckUserManager(postdata)
                        .success(function(data){
                            if(data.prompt){
                                $('#dialog-alert-view-edit-cancel').jqxWindow('close');
                                NumpadPasscode('edit_receipt_passcode')
                                .then(function(){
                                    WindowPopupPasscode('Edit Receipt Security')
                                    .then(function(){
                                        $("#passcode_field").focus();
                                    })
                                })
                            }else{
                                $('#dialog-alert-view-edit-cancel').jqxWindow('close');
                                ProcessEditReceipt();
                            }
                        })
                    }else{
                        NumpadAlertClose('cannot_open_receipt', result.msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                        })
                    }
                })
            }
            $("#dialog-alert-view-edit-cancel").jqxWindow('close');
            StationCashierUniqueCashedOut = null;
        })

        var ProcessEditReceipt = function(){
            setTimeout(function(){
            var postdata ="ReceiptHeaderUnique="+$scope.rowReceiptHeader.Unique;
                postdata+="&FunctionName="+FunctionNameButton+"EditReceipt";
                posData.EditReceipt(postdata)
                .success(function(data){
                    if(data.success){
                        if(data.can_open){
                            $("#dialog-alert-view-edit-cancel").jqxWindow('close');
                            $window.location = base_url + 'pos/pointofsale';
                        }else{
                            NumpadAlertClose('cannot_open_receipt', data.msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                                .then(function(){
                                    $(".alert_close").focus();
                                })
                            }) 
                        }
                    }
                })
            },1000);
        }

        $(document).on("click", "#edit_receipt_passcode .button_edit", function(e){
            e.preventDefault();
            setTimeout(function(){
                posData.CashInServerCheckByUserId()
                .success(function(result){
                    if(result.cashin){    
                        var postdata ="ReceiptHeaderUnique="+$scope.rowReceiptHeader.Unique;
                            postdata+="&FunctionName="+FunctionNameButton+"EditReceipt";
                        posData.EditReceipt(postdata) 
                        .success(function(data){
                            if(data.success){
                                if(data.can_open){
                                    $("#dialog-alert-view-edit-cancel").jqxWindow('close');
                                    $window.location = base_url + data.landtopage;
                                }else{
                                    NumpadAlertClose('cannot_open_receipt', data.msg)
                                    .then(function(){
                                        WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                                        .then(function(){
                                            $(".alert_close").focus();
                                        })
                                    })
                                }
                            }
                        })
                    }else{
                        NumpadAlertClose('cannot_open_receipt', result.msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                        })
                    }
                })
            },1000);
        })

        $(document).on("submit", "#edit_receipt_passcode", function(e){
            e.preventDefault();
            var CardRead = $("#passcode_field").val();
            var CRP = new CardReaderParser(CardRead);
            if(CRP.converted){
                var passcode = CRP.converted;//$("#passcode_field").val();
                var hashpasscode = CryptoJS.MD5(passcode);
                var postdata ="passcode="+hashpasscode;
                    postdata+="&FunctionButton=EditReceipt";
                posData.EnterPassCode(postdata)
                .success(function(data){
                    if(data.success == true){
                        if(data.login == true){
                            ProcessEditReceipt();
                        }else{
                        var msg = data.msg;
                            NumpadAlertClose('edit_receipt_passcode_form', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
                                .then(function(){
                                    $(".alert_close").focus();
                                })
                            }) 
                        }
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        NumpadAlertOk('edit_receipt_passcode_form', data.msg)
                        .then(function(){
                            WindowPopupAlert('Info');
                        })
                    }
                })
                
            }else{
                $("#dialog-numpad-passcode").jqxWindow('close');
                var msg = "Passcode cannot be empty";
                NumpadAlertOk('edit_receipt_passcode_form', msg)
                .then(function(){
                    WindowPopupAlert('Info');
                })
            }
            $('#dialog-numpad-passcode').jqxWindow('close');
        })

        $(document).on("click", "#edit_receipt_passcode .exit", function(e){
            e.preventDefault();
            $('#dialog-numpad-passcode').jqxWindow('close');
        })

		$(document).on('click', '#recall_view_edit_cancel .button_cancel', function(e){
			e.preventDefault();
            $('#dialog-alert-view-edit-cancel').jqxWindow('close');
            StationCashierUniqueCashedOut = null;
		});

        $(document).on("click", ".alert_okay", function(e){
            e.preventDefault();
            $("#dialog-numpad-alert").jqxWindow('close');
        })

        $(document).on("click", ".alert_close", function(e){
            e.preventDefault();
            $("#dialog-numpad-alert").jqxWindow('close');
        })

        $scope.RecallPrint = function(){
            try {
                $scope.rowReceiptHeader.Unique;
                var ReceiptHeaderUnique = true;
            }catch(err) {
                var ReceiptHeaderUnique = false;
            }

            if(ReceiptHeaderUnique){
                var ReceiptHeaderUnique = $scope.rowReceiptHeader.Unique;
                $scope.fn = {
                    val: 6
                };
                if($scope.rowReceiptHeader.Unique !== null){
                    if($(".buttonactive").text() != 'Voided'){
                        PrinterCheck(ReceiptHeaderUnique);
                    }else{
                        VoidPrinterCheck(ReceiptHeaderUnique);
                    }
                    
                }else{
                    var msg="Please select the Receipt that you want to print.";
                    NumpadAlertOk('recall_print_failed', msg)
                    .then(function(){
                        WindowPopupAlert('Alert Info')
                    });
                    $("#dialog-process").jqxWindow('close');
                }
            }else{
                var msg="Please select the Receipt that you want to print.";
                NumpadAlertOk('recall_print_failed', msg)
                .then(function(){
                    WindowPopupAlert('Alert Info')
                });
                $("#dialog-process").jqxWindow('close');
            }
        };

        $scope.SelVoided = function(){
			$("body").block({message: 'Processing data please wait...'});
            recall_by_location = 2;
            FunctionNameButton = 'Completed/Voided/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").show();

            currentGridOpen = 'Voided';
            
            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 8
            }

            $scope.GlobalRecall = {
                Type: 4
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+$scope.StatStationName;
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();
            $http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-voided/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'Total', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
        
                $("#Voided").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '20%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Customer', dataField: 'CustomerName', width: '20%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '10%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
                            aggregates: [{
                                'Total': function (aggregatedValue, currentValue, column, record){
                                    var total = currentValue;
                                    var returnTotal = 0;
                                    returnTotal = aggregatedValue + total;
                                    return returnTotal;
                                }
                            }],
                            aggregatesRenderer: function (aggregates, column, element){
                                    var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
                                    var Total=parseFloat(0).toFixed(2);
                                    if(aggregates.Total){
                                        Total = aggregates.Total;
                                    }
                                    renderString +=  Total + "</div>";
                                    return renderString;
                                }
                            },
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'Total', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                $('#Voided').jqxGrid('clearselection');
                $("body").unblock();
            }) 
		}

        $(document).on('click', '.hdbutton', function() {
            $("div").remove('.cashier-sale-container');
            $('.hdbutton').not(this).removeClass('buttonactive');
            $(this).toggleClass('buttonactive');
        });


        /*
        |--------------------------------------------------------------------
        | Completed Tab
        |--------------------------------------------------------------------
        */
        var SelCompleted = function(){
            recall_by_location = 2;
            FunctionNameButton = 'Completed/Completed/';

            $("#OnHold").hide();
            $("#Completed").show();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'Completed';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 4
            }

            $scope.GlobalRecall = {
                Type: 4
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = true;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = false;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+$scope.StatStationName;
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();

            $http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-completed/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                        { name: 'StationCashierUnique', type: 'int'},
                        { name: 'CashOut', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
        
                $("#Completed").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    pagermode: 'advanced',
                    statusbarheight: GridRowHeight,
                    rowsheight: GridRowHeight,
                    columnsResize: true,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Datea', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '8%', filtertype: 'checkedlist' },
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Change', dataField: 'Balance', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'StationCashierUnique', dataField: 'StationCashierUnique', width: '8%', filtertype: 'input' }
                    ]
                })
                $('#Completed').jqxGrid('clearselection');
            }) 
        }

        /*
        |--------------------------------------------------------------------
        | RecallGCType Tab
        |--------------------------------------------------------------------
        */
        var RecallGCType = function(type){
            
            recall_by_location = 5;
            FunctionNameButton = 'Completed/Gift Card/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").show();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 6
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }
           
            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isGiftCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ type;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#GiftCard").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Gift Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'input', cellsFormat: 'd2',
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
                $('#GiftCard').jqxGrid('clearselection');
            })
        }

        var currentGridOpen;

        /*
        |--------------------------------------------------------------------
        | RecallCashType Tab
        |--------------------------------------------------------------------
        */
        var RecallCashType = function(){
            recall_by_location = 3;
            FunctionNameButton = 'Completed/Cash/';

            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").show();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'Cash';

            console.log(currentGridOpen);

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 1
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = true;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = false;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&type="+ type;
                postdata+="&station="+$scope.StatStationName;
                postdata+="&cashin="+ $scope.StatCashIn
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();

                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/recall-by-type',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'number'},
                            { name: 'Tax', type: 'number'},
                            { name: 'TotalSale', type: 'number'},
                            { name: 'Paid', type: 'number'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#Cash").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
                        source: dataAdapter,
                        columnsresize: true,
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showaggregates: enableAggregates,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        rowsheight: GridRowHeight,
                        columnsResize: true,
                        columns: [
                            { text: 'Unique', dataField: 'Unique', hidden: true},
                            { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                            { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                            { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                            { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Cash', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                $('#Cash').jqxGrid('clearselection');  
            })
        } 

        /*
        |--------------------------------------------------------------------
        | RecallCCType Tab
        |--------------------------------------------------------------------
        */
        var RecallCCType = function(){
            recall_by_location = 4;
            FunctionNameButton = 'Completed/Credit Card/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").show();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'CreditCard';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 2	
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ type;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#CreditCard").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Credit Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                $('#CreditCard').jqxGrid('clearselection');
            })
        }

        /*
        |--------------------------------------------------------------------
        | RecallCheck Tab
        |--------------------------------------------------------------------
        */
        var RecallCheck = function(){
            recall_by_location = 8;
            FunctionNameButton = 'Completed/Check/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").show();
            $("#Voided").hide();

            currentGridOpen = 'CheckGrid';
            
            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 8
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
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
                postdata+="&location="+$("#Station").val();

                $http({
                    method: 'post',
                    url: base_url+'pos/pointofsale/recall-by-type',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', type: 'int' },
                            { name: 'ReceiptDate', type: 'string' },
                            { name: 'LocationName', type: 'string' },
                            { name: 'StationName', type: 'string' },
                            { name: 'ReceiptNumber', type: 'number' },
                            { name: 'CustomerName', type: 'string'},
                            { name: 'SubTotal', type: 'float'},
                            { name: 'Tax', type: 'float'},
                            { name: 'TotalSale', type: 'float'},
                            { name: 'Paid', type: 'float'},
                            { name: 'Status', type: 'string'},
                            { name: 'Cashier', type: 'string'},
                            { name: 'CheckNo', type: 'string'}
                        ],
                        localdata: data
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#CheckGrid").jqxGrid({
                        width: '100%',
                        height: UseHeight,
                        pagesize: ComputeDisplayRow,
                        scrollbarsize: GridScrollBarSize,
                        source: dataAdapter,
                        columnsresize: true,
                        theme: GridTheme,
                        pageable: false,
                        pagermode: 'advanced',
                        sortable: true,
                        filtermode: 'excel',
                        showfilterrow: true,
                        filterable: true,
                        showaggregates: enableAggregates,
                        showstatusbar: true,
                        statusbarheight: GridRowHeight,
                        columnsResize: true,
                        rowsheight: GridRowHeight,
                        columns: [
                            { text: 'Unique', dataField: 'Unique', hidden: true},
                            { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                            { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                            { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                            { text: 'Receipt', dataField: 'ReceiptNumber', width: '9%', filtertype: 'number' },
                            { text: 'SubTotal', dataField: 'SubTotal', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Total', dataField: 'TotalSale', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                            { text: 'Check', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'input', cellsFormat: 'd2',
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
                            { text: 'No', dataField: 'CheckNo', width: '8%', filtertype: 'input' },
                        ]
                    })
                $('#CheckGrid').jqxGrid('clearselection');
            })
        }

        /*
        |--------------------------------------------------------------------
        | RecallEBT Tab
        |--------------------------------------------------------------------
        */
        var RecallEBT = function(){
            recall_by_location = 7;
            FunctionNameButton = 'Completed/EBT/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").show();
            $("#CheckGrid").hide();
            $("#Voided").hide();

            currentGridOpen = 'EBTGrid';

            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 7
            }

            $scope.GlobalRecall = {
                Type: type
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isGiftCardBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
            postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
            postdata+="&type="+ type;
            postdata+="&station="+$scope.StatStationName;
            postdata+="&cashin="+ $scope.StatCashIn;
            postdata+="&status=4";
            postdata+="&location="+$("#Station").val();
            postdata+="&ebt=ebt";
            $http({
                method: 'post',
                url: base_url+'pos/pointofsale/recall-by-type',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'},
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#EBTGrid").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: 25,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: 'darkblue',
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: 30,
                    columnsResize: true,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'EBT', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                $('#EBTGrid').jqxGrid('clearselection');
            })
        }

        /*
        |--------------------------------------------------------------------
        | SelOnHold Tab
        |--------------------------------------------------------------------
        */
        var SelOnHold = function(){
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

			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+ $scope.StatStationName;
                postdata+="&status=5";
                postdata+="&location="+ $("#Station").val();
                
            $http({
                method: 'post',
                data: postdata,
                url: base_url + "pos/pointofsale/load-recall-sale",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
    
                var addfilter = function () {
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = null;
                    var filtercondition = 'greater_than_or_equal';
                    var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter1);
                    // add the filters.
                    $("#OnHold").jqxGrid('addfilter', 'ReceiptNumber', filtergroup);
                    // apply the filters.
                    $("#OnHold").jqxGrid('applyfilters');
                }

                var ComputeHeight		= ResoHeight - 180;
                var UseHeight			= ComputeHeight;
                var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'TotalSale', type: 'number'},
                        { name: 'Paid', type: 'number'},
                        { name: 'Balance', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#OnHold").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    autoshowfiltericon: true,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Cashier', dataField: 'Cashier', width: '6%', filtertype: 'checkedlist'},
                        { text: 'Customer', dataField: 'CustomerName',width: '12%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', filtertype: 'number', align: 'right', cellsalign: 'right', cellsformat: 'd2',				
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
                        { text: 'Tax', dataField: 'Tax', width: '8%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
                        { text: 'Balance', dataField: 'Balance', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
                            
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
            })
        }

        /*
        |--------------------------------------------------------------------
        | SelVoided Tab
        |--------------------------------------------------------------------
        */
        var SelVoided = function(){
            recall_by_location = 2;
            FunctionNameButton = 'Completed/Voided/';
            $("#OnHold").hide();
            $("#Completed").hide();
            $("#Cash").hide();
            $("#CreditCard").hide();
            $("#GiftCard").hide();
            $("#CashInGrid").hide();
            $("#EBTGrid").hide();
            $("#CheckGrid").hide();
            $("#Voided").show();

            currentGridOpen = 'Voided';
            
            $scope.CashInWhen = true;
            $(".completed_bar").show();

            $scope.RecallSale = {
                Selected: 8
            }

            $scope.GlobalRecall = {
                Type: 4
            }

            $scope.rowReceiptHeader = {
                Unique: null
            }

            $scope.isOnHoldBold = false;
            $scope.isCompletedBold = false;
            $scope.isCashBold = false;
            $scope.isCreditCardBold = false;
            $scope.isVoidedBold = true;

            var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
                postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
                postdata+="&station="+$scope.StatStationName;
                postdata+="&status=4";
                postdata+="&location="+$("#Station").val();
            $http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-voided/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique', type: 'int' },
                        { name: 'ReceiptDate', type: 'string' },
                        { name: 'LocationName', type: 'string' },
                        { name: 'StationName', type: 'string' },
                        { name: 'ReceiptNumber', type: 'number' },
                        { name: 'CustomerName', type: 'string'},
                        { name: 'SubTotal', type: 'number'},
                        { name: 'Tax', type: 'number'},
                        { name: 'Total', type: 'number'},
                        { name: 'Status', type: 'string'},
                        { name: 'Cashier', type: 'string'}
                    ],
                    localdata: data
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
        
                $("#Voided").jqxGrid({
                    width: '100%',
                    height: UseHeight,
                    pagesize: ComputeDisplayRow,
                    scrollbarsize: GridScrollBarSize,
                    source: dataAdapter,
                    columnsresize: true,
                    theme: GridTheme,
                    pageable: false,
                    pagermode: 'advanced',
                    sortable: true,
                    filtermode: 'excel',
                    showfilterrow: true,
                    filterable: true,
                    showaggregates: enableAggregates,
                    showstatusbar: true,
                    statusbarheight: GridRowHeight,
                    columnsResize: true,
                    statusbarheight: GridRowHeight,
                    columns: [
                        { text: 'Unique', dataField: 'Unique', hidden: true},
                        { text: 'Date', dataField: 'ReceiptDate', width: '20%', filtertype: 'input', cellsRenderer: rendererDate },
                        { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'checkedlist'},
                        { text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'checkedlist' },
                        { text: 'Customer', dataField: 'CustomerName', width: '20%', filtertype: 'input' },
                        { text: 'Receipt', dataField: 'ReceiptNumber', width: '10%', filtertype: 'number' },
                        { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
                            aggregates: [{
                                'Total': function (aggregatedValue, currentValue, column, record){
                                    var total = currentValue;
                                    var returnTotal = 0;
                                    returnTotal = aggregatedValue + total;
                                    return returnTotal;
                                }
                            }],
                            aggregatesRenderer: function (aggregates, column, element){
                                    var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
                                    var Total=parseFloat(0).toFixed(2);
                                    if(aggregates.Total){
                                        Total = aggregates.Total;
                                    }
                                    renderString +=  Total + "</div>";
                                    return renderString;
                                }
                            },
                        { text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                        { text: 'Total', dataField: 'Total', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
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
                $('#Voided').jqxGrid('clearselection');
            }) 
        }

        var GotoCashierMenu = false;
		$scope.RedirectDashboard = function(){
			$(".ak-logo-button").attr('disabled', true);
			GotoCashierMenu = true;
            posData.EmptyTransaction()
            .success(function(data){
                if(data.success == true){
                    $window.location.href = base_url + 'pos/cashier';
                }
            })
            setTimeout(function(){
                $(".ak-logo-button").attr('disabled', false);
            },1000);
		}

    }])
})();