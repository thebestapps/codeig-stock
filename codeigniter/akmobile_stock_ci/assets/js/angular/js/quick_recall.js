angular.extendAkamaiposController = function($scope, $http, $routeParams, $q, posData, $window, $filter, $compile, $rootScope){
	
	var GridRowHeight = parseInt($("#GridRowHeight").val());
	var GlobalReceiptHeaderUnique;

	var GridTheme = $("#GridTheme").val();

	//Create alert message form dynamic
	var populateNumpadAlertClose = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qrc_alert_message").append('<div id="qrc_alert_message_container" style="background: #144766; color:#EEE; overflow: hidden !important;"></div>');
			$("#qrc_alert_message_container").html('');
			$("#qrc_alert_message_container").append(
				'<div style="width:100%;"><h3 id="alert_message">'+msg+'</h3></div>'+
				'<br><br><br>'+
				'<div style="width:100%; text-align:right; padding: 0; margin:0;">'+
					'<button class="btn btn-warning btn-lg" id="qrc_alert_close">Close</button>'+
				'</div>'
			);
			def.resolve();
		},500);
		return def.promise();
	}
	//Alert message window popup setting
	var WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#qrc_alert_message").jqxWindow({
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
			$('#qrc_alert_message').jqxWindow('setTitle', header_text);
			$('#qrc_alert_message').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Populate Alert message
	var NumpadAlertClose = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertClose(form, msg)
		.then(function(){
			def.resolve();
		});
		return def.promise();
	}

	$(document).on('click', '#qrc_alert_close', function(e){
		e.preventDefault();
		if( $("#cashier_quick_recall_new_sale_customer_no").length > 0 ){
			setTimeout(function(){
			$("#table_number_field").jqxNumberInput('focus');
				var input = $('#table_number_field input')[0];
				if('selectionStart' in input) {
					input.setSelectionRange(0, 0);
				}else{
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', 0);
					range.moveStart('character', 0);
					range.select();
				}
				$("#table_number_field input").select();
			},100)
		}
		$("#qrc_alert_message").jqxWindow('close');
	})

	$("#qrc_numpad_passcode").on('close', function(e){
		e.preventDefault();
		$("#qrc_numpad_passcode_container").remove();
		myNumber = '';
	})

	//Create Numpad password form
	var populateNumpadPasscode = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qrc_numpad_passcode").append('<div id="qrc_numpad_passcode_container" style="background: #144766; color:#EEE;"></div>');
			$("#qrc_numpad_passcode_container").html('');
			$("#qrc_numpad_passcode_container").append('<h4 style="text-align:center;">Enter Passcode</h4>');
			$("#qrc_numpad_passcode_container").append(''+
			'<form id="'+form_name+'">'+
				'<input type="password" class="hdfield" id="number_field" autocomplete="off" style="color:#000">'+
				'<div id="qrc_recall_fn"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	//Numpad password form setting
	var WindowPopupPasscode = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#qrc_numpad_passcode").jqxWindow({
				width: 460,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#qrc_numpad_passcode').jqxWindow('setTitle', header_title);
			$('#qrc_numpad_passcode').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Populate Numpad Passcode form
	var NumpadPasscode = function(form_name){
		var def = $.Deferred();
		populateNumpadPasscode(form_name)
		.then(function(){
			$('#qrc_recall_fn').numeric_numpad({
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

	//Populate a form dynamic.
	var populateOnHoldSale = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#on-hold-sale").append('<div id="on-hold-sale-container"></div>');
			$("#on-hold-sale-container").html('');
			def.resolve();
		},100);
		return def.promise();
	}
	//Window popup setting
	var WindowOnHoldSale = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#on-hold-sale").jqxWindow({
				width: '100%', 
				height: '100%',
				title: '<button id="cashier_quick_recall_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;Quick Recall',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: false,
				resizable: false,
				draggable: false,
				position: { x: 0, y: 0 },
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#on-hold-sale').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Call to populate form
	var OnHoldSaleView = function(form_name, html){
		var def = $.Deferred();
		populateOnHoldSale(form_name, html)
		.then(function(){
			setTimeout(function(){
				def.resolve();
			},100);
		});
		return def.promise();
	}
	//Call the form with window popup.
	var ProceedOnHoldSale = function(){
		var def = $.Deferred();
		OnHoldSaleView()
		.then(function(){
			WindowOnHoldSale()
			.then(function(){
				$("#on-hold-sale-container").css("height", "auto");
				SelOnHold();
				def.resolve();
			})
		})
		return def.promise();
	}
	//Button to call Quick Recall
	$scope.CashierRecallQuick = function(){
		$("#CashierQuickRecallfunction").attr("disabled", true);
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                $("#OnHoldSalefunction").attr({"disabled":true});
                NumpadPasscode('onhold_sale_ordertype_no_label_required_w_ordertype_notset_passcode')
                .then(function(){
                    WindowPopupPasscode('Quick Recall | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
                    });
                });
                FunctionButton = 'Recall';
                $scope.$broadcast('Recall');
                setTimeout(function(){
                    $("#OnHoldSalefunction").attr({"disabled":false});
                },1000);
            }else{
                location.reload();
			}
			setTimeout(function(){
				$("#CashierQuickRecallfunction").attr('disabled', false);
			},1000);
		})
	}
	var OnHoldSaleColumns = function(){
		var def = $.Deferred();
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
			def.resolve();
		})
		return def.promise();
	}

	//Submit credential before Quick Recall open.
	$(document).on('submit', '#onhold_sale_ordertype_no_label_required_w_ordertype_notset_passcode', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
		var CRP = new CardReaderParser(CardRead);
		if(CRP.converted){
			var passcode = CRP.converted;
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+FunctionButton;
			posData.EnterPassCode(postdata)
			.success(function(data){
				if(data.success == true){
					SetNewUser = data.userid;
					if(data.login == true){
						if(onholdcolumns.length > 0){
							ProceedOnHoldSale()
							.then(function(){
								$("#OnHoldSalefunction").attr("disabled", false);
							})
						}else{
							OnHoldSaleColumns()
							.then(function(){
								ProceedOnHoldSale()
								.then(function(){
									$("#OnHoldSalefunction").attr("disabled", false);
								})
							})
						}
					}else{
						$("#qrc_numpad_passcode").jqxWindow('close');
						NumpadAlertClose('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}
					$("#qrc_numpad_passcode").jqxWindow('close');
				}else{
					$("#qrc_numpad_passcode").jqxWindow('close');
					NumpadAlertClose('remove_item_info', data.msg)
					.then(function(){
						WindowPopupAlert('Info');
					})
				}
			})
		}else{
			$("#qrc_numpad_passcode").jqxWindow('close');
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('remove_item_info', msg)
			.then(function(){
				WindowPopupAlert('Info');
			})
		}
	})
	//Load data on the Grid
	var SelOnHold = function(){
		var def = $.Deferred();
		posData.GetOnHoldSale()
		.success(function(data){
			$("#on-hold-sale-container").append($compile(data.html)($scope));
			var ResoWidth 	        = $("#on-hold-sale").width();
			var ResoHeight 	        = $("#on-hold-sale").height();
			var ComputeHeight		= ResoHeight - 90;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			var OHSListItems		= UseHeight - 180;
			var TotalHeight 		= OHSListItems - 230;
			var Payments 			= (TotalHeight / 2);
			$(".listitems").css("height", OHSListItems);
			$(".OHSlistitemsTotal").css({"height":TotalHeight, "display":"block"});
			posData.LoadOnHoldSale()
			.success(function(recdata){
				var source = {
					datatype: "json",
					datafields: [
						{ name: 'Unique', type: 'int' },
						{ name: 'ReceiptNumber', type: 'string' },
						{ name: 'Notes', type: 'string' },
						{ name: 'Cashier', type: 'string' },
						{ name: 'TotalSale', type: 'string' },
						{ name: 'CustomerName', type: 'string'},
						{ name: 'OrderNo', type: 'string'},
						{ name: 'ReceiptDate', type: 'string'},
						{ name: 'TableNo', type: 'string'},
						{ name: 'TableName', type: 'string'},
						{ name: 'SplitUnique', type: 'int'}
					],
					localdata: recdata
				};
				var dataAdapter = new $.jqx.dataAdapter(source);
				var ColumnHideShow = $("#PrintReceiptOrderNo").val();
				if(ColumnHideShow > 0){
					$("#listOnHoldSale").jqxGrid({
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
						scrollbarsize: 25,
						sortable: true,
						filtermode: 'excel',
						showfilterrow: true,
						filterable: true,
						showstatusbar: true,
						statusbarheight: GridRowHeight,
						showaggregates: true,
						columns: [
							{ text: 'Unique', datafield: 'Unique', hidden: true }
						]
					});
				}else{
					$("#listOnHoldSale").jqxGrid({
						width: '100%',
						height: UseHeight,
						source: dataAdapter,
						columnsresize: true,
						altrows: true,
						scrollbarsize: 25,
						rowsheight: GridRowHeight,
						theme: GridTheme,
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
							{ text: 'Unique', datafield: 'Unique', hidden: true }
						]
					});
				}
				
				setTimeout(function(){
					$("#listOnHoldSale").jqxGrid('selectrow', 0);
				},100);
				
				bindData();

				$("#listOnHoldSale").jqxGrid({ columns: onholdcolumns });
				$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');

			}).then(function(){
				scrollTotalDown();
			})
		
			def.resolve();
		})
		return def.promise();
	}

	//Selecting Grid row and Show Receipt Item(s)
	var bindData = function(){
		$("#listOnHoldSale").bind('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			var datainformations = $("#listOnHoldSale").jqxGrid("getdatainformation");
			var rowscounts = datainformations.rowscount;
			
			if(rowscounts > 0){
				var postdata ="ReceiptHeaderUnique="+row.Unique;
				$("#btn-use-receipt").val(row.Unique);
				// $("#btn-use-receipt").text(row.ReceiptNumber);
				GlobalReceiptHeaderUnique = row.Unique;
				posData.GetItemsOnHoldSale(postdata)
				.success(function(data){
					$(".listitems").html('');
					$(".OHSlistitemsTotal").html('');
					$.each(data, function(index, value){
						if(value.Completed || value.Remove == 2){
							if(value.Indent == false){
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
									'</div>'+
								'');
							}else{
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
									'</div>'+
								'');
							}
						}else{
							if(value.Indent == false){
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
										'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
										'</div>'+
									'</div>'+
								'');
							}else{
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
										'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
										'</div>'+
									'</div>'+
								'');
							}
						}
						
					})
				}).then(function(){
					$(".OHSlistitemsTotal").append($compile('<div class="totals">'+
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
												'<div class="col-sm-7" style="margin:0; padding:0;"><strong>'+$("#AdjustTipButtonLabel").val()+'</strong></div>'+
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
									'<div class="qspayments" id="payments">'+
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
					posData.POSQuickSaleTotal(postdata)
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
						scrollTotalDown();
					})
				})
			}else{
				$(".listitems").html('');
				$(".OHSlistitemsTotal").html('');
				GlobalReceiptHeaderUnique = 0;
				GlobalReceiptNumber = '';	
			}
		})
	}
	//Auto Scrolldown when detect scroll show on the Item list
	var scrollOrderListDown = function(){
		setTimeout(function() {
			var n = 1000;
			$('.orderedlist').animate({ scrollTop: n }, 50);
			$('.listitems').animate({ scrollTop: n }, 50);
			$('.tax-container').animate({ scrollTop: n }, 50);
			//$('.OHSlistitemsTotal').animate({ scrollTop: n }, 50);
			$('.qspayments').animate({ scrollTop: n }, 50); 
		}, 100); 
	}
	//Auto Scrolldown when detect scroll show on the Totals.
	var scrollTotalDown = function(){
		setTimeout(function() {
			var n = 1000;
			$('#payments').animate({ scrollTop: n }, 50);
		}, 1000); 
	}

	var QuickRecallItemArray = [];
	
	//Reorder selected Item(s)
	$(document).on('click', '#btn-reorder', function(){
		posData.CashInServerCheckByUserId()
		.success(function(result){
			if(result.cashin){
				var postdata="ReceiptHeaderUnique="+GlobalReceiptHeaderUnique;
				posData.QRCheckReceiptStatus(postdata)
				.success(function(data){
					if(data.success){
						$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
						$("#messageNotification").jqxNotification("closeAll");
						QuickRecallItemArray = [];
						var QuantityNumpadOpen = false;
						$('input[type=checkbox][name=groupqrec]:checked').each(function(){
							var chkqId = $(this).attr('id');
							QuickRecallItemArray.push(chkqId);
							var Quantity = $("#"+chkqId).find("div:first").text();
							if(Quantity > 1){
								QuantityNumpadOpen = true;
							}
						});
						if(QuantityNumpadOpen){
							NumpadQRecQuantity('quick_recall_adjust_qty')
							.then(function(){
								WindowPopupQRecQuantity()
								.then(function(){
									$("#qrec_qty_field").val('');
									
									setTimeout(function(){
										$("#qrec_qty_field").select();
										$("#qrec_qty_field").focus();
									},100);
								})
							})
						}else{
							if(QuickRecallItemArray.length > 0){
								QuickRecallReOrder(0);
							}else{
								var msg = 'Please select item first';
								NumpadAlertClose('cannot_open_receipt', msg)
								.then(function(){
									WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								})
							}
						}
					}else{
						NumpadAlertClose('cannot_open_receipt', data.msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						})
					}
				})
			}else{
				var msg = result.msg;
				NumpadAlertClose('cannot_open_receipt', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				})
			}
		})
	})

	//Create Numpad Quantity form dynamic
	var populateQRNumpadQuantity = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-quantity").append('<div id="quantity_numpad" style="background: #144766; color:#EEE;"></div>');
			$("#quantity_numpad").html('');
			$("#quantity_numpad").append('<h4 style="text-align:center;">Enter New Quantity</h4>');
			$("#quantity_numpad").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="qrec_qty_field" class="hdfield" maxlength="'+QuantityInputLimit+'" style="color:#000;">'+
				'<div id="keyboard_qrec_quantity"></div>'+
			'</form>'+
			'');
			def.resolve();
		},100);
		return def.promise();
	}
	//Window popup setting of Numpad Quantity
	var WindowPopupQRecQuantity = function(){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-quantity").jqxWindow({
				height: 390,
				minWidth: 300,
				title: "Quantity Change",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#dialog-numpad-quantity').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Populate Numpad Quantity form
	var NumpadQRecQuantity = function(form_name){
		var def = $.Deferred();
		populateQRNumpadQuantity(form_name)
		.then(function(){
			$('#keyboard_qrec_quantity').numeric_numpad({
				layout: "numeric",
				input: $('#qrec_qty_field')
			});
			def.resolve();
		});
		return def.promise();
	}
	//Reload re order Item(s)
	var QuickRecallReOrder = function(Quantity){
		var rowindex = $('#listOnHoldSale').jqxGrid('getselectedrowindex');
		var rowid = $('#listOnHoldSale').jqxGrid('getrowid', rowindex);
		var rowdata = $("#listOnHoldSale").jqxGrid('getrowdatabyid', rowid);

		var def = $.Deferred();
		var postdata ="reorder_q_items="+JSON.stringify(QuickRecallItemArray);
			postdata+="&Quantity="+Quantity;
			postdata+="&ReceiptHeaderUnique="+rowdata.Unique;
			postdata+="&SplitUnique="+rowdata.SplitUnique;
		posData.QReOrder(postdata)
		.success(function(data){
			if(data.can_reorder == false){
				NumpadAlertClose('cannot_reorder', data.msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				})
				return false;
			}

			if(data.reorder){
				var postdata ="ReceiptHeaderUnique="+rowdata.Unique;
				
				posData.KitchenPrintReceipt(postdata)
				.success(function(data){
					$("#dialog-numpad-alert").jqxWindow('close');
				})

				posData.GetItemsOnHoldSale(postdata)
				.success(function(data){
					$(".listitems").html('');
					$(".OHSlistitemsTotal").html('');
					$.each(data, function(index, value){
						if(value.Completed || value.Remove == 2){
							if(value.Indent == false){
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										//'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">&nbsp;</div>'+
									'</div>'+
								'');
							}else{
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										//'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">&nbsp;</div>'+
									'</div>'+
								'');
							}
						}else{
							if(value.Indent == false){
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
										'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
										'</div>'+
									'</div>'+
								'');
							}else{
								$(".listitems").append(''+
									'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
										'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
										'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
										'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
										'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
										'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
										'</div>'+
									'</div>'+
								'');
							}
						}
					})
				}).then(function(){
					$(".OHSlistitemsTotal").append($compile('<div class="totals">'+
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
									'<div class="qspayments" id="payments">'+
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
					posData.POSQuickSaleTotal(postdata)
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
						def.resolve();
					}).then(function(){
						scrollOrderListDown();
						scrollTotalDown();
					})
				})
			}
		})
		return def.promise();
	}

	//Remove Item checked from the list
	$(document).on('click', '#btn-qr-remove', function(){
		var rowindex = $('#listOnHoldSale').jqxGrid('getselectedrowindex');
		var rowid = $('#listOnHoldSale').jqxGrid('getrowid', rowindex);
		var rowdata = $("#listOnHoldSale").jqxGrid('getrowdatabyid', rowid);

		$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
		$("#messageNotification").jqxNotification("closeAll");
		
		QuickRecallItemArray = [];
		$('input[type=checkbox][name=groupqrec]:checked').each(function(){
			var chkqId = $(this).attr('id');
			QuickRecallItemArray.push(chkqId);
		})
		
		if(QuickRecallItemArray.length > 0){
			posData.CashInServerCheckByUserId()
			.success(function(result){
				if(result.cashin){
					var postdata="ReceiptHeaderUnique="+rowdata.Unique;
						postdata+="&SplitUnique="+rowdata.SplitUnique;
					posData.QRCheckReceiptStatus(postdata)
					.success(function(data){
						if(data.can_reopen = false){
							NumpadAlertClose('cannot_remove_item', data.msg)
							.then(function(){
								WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							})

							return false;
						}


						if(data.success){
							var postdata ="remove_q_items="+JSON.stringify(QuickRecallItemArray);
							posData.QuickRecallRemoveItemCheck(postdata)
							.success(function(data){
								if(data.RewardDiscount){
									var msg = 'Discount or Reward is not refundable';
									NumpadAlertClose('cannot_remove_item', msg)
									.then(function(){
										WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
									})
								}else{
									if(data.ItemCount > 0){
										var postdata ="FunctionButton=RemoveItem";
										posData.CheckUserManager(postdata)
										.success(function(data){
											if(data.prompt){
												FunctionButton = 'RemoveItem';
												NumpadPasscode('qr_remove_item_passcode')
												.then(function(){
													WindowPopupPasscode('Remove Item')
													.then(function(){
														$("#number_field").focus();
													})
												})
											}else{
												ViewQuickRecallReasonList('quick_recall_remove_item')
												.then(function(){
													WindowPopupQuickRecallReason();
													$("#qrc_numpad_passcode").jqxWindow('close');
												})
											}
										})
									}else{
										posData.QuickRecallRemoveItem(postdata)
										.success(function(data){
											ReloadQuickRecallItemList(GlobalReceiptHeaderUnique);
										})
									}
								}
							})
						}else{
							NumpadAlertClose('cannot_open_receipt', data.msg)
							.then(function(){
								WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							})
						}
					})
				}else{
					var msg = result.msg;
					NumpadAlertClose('cannot_open_receipt', msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					})
				}
			})

		}else{
			var msg = 'Please select item first';
			NumpadAlertClose('cannot_open_receipt', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			})
		}
	})

	//Create Reason list form dynamic
	var populateQuickRecallReasonList = function(form_name){
		var def = $.Deferred();
		posData.QuickRecallLoadReasonList()
		.success(function(data){
			$("#qrc_reason_list").append('<div id="qrc_reason_list_container" style="background: #144766; color:#EEE;"></div>');
			$("#qrc_reason_list_container").html('');
			$("#qrc_reason_list_container").append(data.html);
			$("#qrc_reason_list_container").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="text_field" class="hdfield" style="color:#000; display:none;">'+
				'<div id="qrc_reason_list_fn"></div>'+
			'</form>'+
			'');
			ReasonID = data.checkedItem;
			def.resolve();
		})
		return def.promise();
	}

	//Reason list window popup setting
	var WindowPopupQuickRecallReason = function(){
		var def = $.Deferred();
		setTimeout(function(){
			var OrderListWidth = ($(".orderedlist").width() + 3);
			$("#qrc_reason_list").jqxWindow({
				height: 390,
				minWidth: 300,
				title: "Reason",
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#qrc_reason_list').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}

	//Populate recall reason list
	var ViewQuickRecallReasonList = function(form_name){
		var def = $.Deferred();
		populateQuickRecallReasonList(form_name)
		.then(function(){
			$('#qrc_reason_list_fn').hdkeyboard({
				layout: "item_reason",
				input: $('#quantity_field')
			});
			def.resolve();
		});
		return def.promise();
	}

	//Reload Item list data after remove item(s)
	var ReloadQuickRecallItemList = function(Unique){
		var postdata ="ReceiptHeaderUnique="+Unique;
		posData.GetItemsOnHoldSale(postdata)
		.success(function(data){
			$(".listitems").html('');
			$(".OHSlistitemsTotal").html('');
			$.each(data, function(index, value){
				if(value.Completed || value.Remove == 2){
					if(value.Indent == false){
						$(".listitems").append(''+
							'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
								'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
								'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
								'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
								//'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">&nbsp;</div>'+
							'</div>'+
						'');
					}else{
						$(".listitems").append(''+
							'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
								'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
								'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
								'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
								'<div class="col-sm-4" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
								//'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">&nbsp;</div>'+
							'</div>'+
						'');
					}
				}else{
					if(value.Indent == false){
						$(".listitems").append(''+
							'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
								'<div class="col-sm-2" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
								'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
								'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
								'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
								'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
								'</div>'+
							'</div>'+
						'');
					}else{
						$(".listitems").append(''+
							'<div style="padding: 0; margin: 0;" class="col-sm-12 quick_recall_item" id="'+value.Unique+'">'+
								'<div class="col-sm-1" style="padding: 0; margin: 0;">&nbsp;</div>'+
								'<div class="col-sm-1" style="padding: 0; margin: 0;">'+value.Quantity+'</div>'+
								'<div class="col-sm-6" style="padding: 0; margin: 0; word-wrap: break-word;">'+value.Description+'</div>'+
								'<div class="col-sm-3" align="right" style="padding: 0; margin: 0;">'+value.SellPrice+'</div>'+
								'<div class="col-sm-1" align="right" style="padding: 0; margin: 0;">'+
								'	<label><input type="checkbox" id="'+value.Unique+'" name="groupqrec" class="radio1 qrec '+value.ParentUnique+'" /></label>'+
								'</div>'+
							'</div>'+
						'');
					}
				}
			})
		}).then(function(){
			$(".OHSlistitemsTotal").append($compile('<div class="totals">'+
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
							'<div class="qspayments" id="payments">'+
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
				scrollTotalDown();
			})
		})
	}

	//Submit credential processing
	$(document).on('submit', '#qr_remove_item_passcode', function(e){
		e.preventDefault();
		var CardRead = $("#number_field").val();
		var CRP = new CardReaderParser(CardRead);
		if(CRP.converted){
			var passcode = CRP.converted;
			var hashpasscode = CryptoJS.MD5(passcode);
			var postdata ="passcode="+hashpasscode;
				postdata+="&FunctionButton="+FunctionButton;
			posData.EnterPassCode(postdata)
			.success(function(data){
				if(data.success == true){
					if(data.login == true){
						ViewQuickRecallReasonList('quick_recall_remove_item')
						.then(function(){
							WindowPopupQuickRecallReason();
							$("#qrc_numpad_passcode").jqxWindow('close');
						})
					}else{
						$("#qrc_numpad_passcode").jqxWindow('close');
						NumpadAlertClose('remove_item_info', data.msg)
						.then(function(){
							WindowPopupAlert('Info');
						})
					}	
				}else{
					$("#qrc_numpad_passcode").jqxWindow('close');
					NumpadAlertClose('remove_item_info', data.msg)
					.then(function(){
						WindowPopupAlert('Info');
					})
				}
			})
		}else{
			$("#qrc_numpad_passcode").jqxWindow('close');
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('remove_item_info', msg)
			.then(function(){
				WindowPopupAlert('Info');
			})
		}
	})

	//Close or Cancel Reason List
	$(document).on('click', '#quick_recall_remove_item .button_q_cancel', function(){
		$("#qrc_reason_list").jqxWindow('close');
	})
	//Submit selected Reason
	$(document).on('click', '#quick_recall_remove_item .button_proceed', function(){
		var postdata ="remove_q_items="+JSON.stringify(QuickRecallItemArray);
			postdata+="&ReturnUnique="+ReasonID;
		posData.QuickRecallRemoveItemReason(postdata)
		.success(function(data){
			ReloadQuickRecallItemList(GlobalReceiptHeaderUnique);
			$("#qrc_reason_list").jqxWindow('close');
		})
	})

	$(document).on('click', '#btn-qr-discount', function(){
		$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
		$("#messageNotification").jqxNotification("closeAll");
		QuickRecallItemArray = [];
		$('input[type=checkbox][name=groupqrec]:checked').each(function(){
			var chkqId = $(this).attr('id');
			QuickRecallItemArray.push(chkqId);
		})

		if(QuickRecallItemArray.length > 0){
			posData.CashInServerCheckByUserId()
			.success(function(result){
				if(result.cashin){
					QuickRecallDiscountListView('quick_recall_item_discount')
					.then(function(){
						WindowQuickRecallDiscountList('Item Discount');
					})
				}else{
					var msg = result.msg;
					NumpadAlertClose('qc_discount_error', msg)
					.then(function(){
						WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
					})
				}
			})

		}else{
			var msg = 'Please select item first';
			NumpadAlertClose('qc_discount_error', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			})
		}
	})

	//Crate Discount List form dynamic
	var populateQuickRecallDiscountList = function(form_name){
		var def = $.Deferred();
		$("#qr_discount_list").append('<div id="qr_discount_list_container" style="background: #004a73"></div>');
		$("#qr_discount_list_container").html('');
		posData.QuickLoadDiscountList()
		.success(function(data){
			$("#qr_discount_list_container").append($compile(data.html)($scope));
			$("#qr_discount_list_container").append(
				'<form id="'+form_name+'">'+
					'<input type="text" id="text_field" class="hdfield" style="color:#000; display:none;">'+
					'<div id="qr_discount_form"></div>'+
				'</form>'
			);
			def.resolve();
		})
		return def.promise();
	}
	//Discount List setting
	var WindowQuickRecallDiscountList = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qr_discount_list").jqxWindow({
				width: '50%', 
				height: '60%',
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#qr_discount_list').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Populate Discount list
	var QuickRecallDiscountListView = function(form_name, html){
		var def = $.Deferred();
		populateQuickRecallDiscountList(form_name, html)
		.then(function(){
			$('#qr_discount_form').hdkeyboard({
				layout: "item_reason",
				input: $('#text_field')
			});
			setTimeout(function(){
				def.resolve();
			},100);
		});
		return def.promise();
	}

	//Submit selected Discount process
	$(document).on('click', '#quick_recall_item_discount .button_proceed', function(){
		var DiscSel = $('input[type=radio][name=group1]:checked').attr('id');
			DiscountItemUnique = DiscSel.split('=')[0];
			DiscountItemPrice  = DiscSel.split('=')[1];
			DiscountType	   = DiscSel.split('=')[2];
			DiscountName	   = DiscSel.split('=')[5];
			DiscountUnique	   = DiscSel.split('=')[4];
		if(DiscSel){
			if(DiscountItemPrice){	
				var postdata ="discount_q_arr="+JSON.stringify(QuickRecallItemArray);
					postdata+="&ItemUnique="+DiscountItemUnique;
					postdata+="&SellPrice="+parseFloat(DiscountItemPrice).toFixed(2);
					postdata+="&DiscountType="+DiscountType;
					postdata+="&DiscountName="+DiscountName;
					postdata+="&DiscountUnique="+DiscountUnique;
				posData.QuickRecallDiscountProceed(postdata)
				.success(function(data){
					ReloadQuickRecallItemList(GlobalReceiptHeaderUnique);
					$("#qr_discount_list").jqxWindow('close');
				})
			}else{
				NumpadQRecDiscount('qrec_item_discount_percent_prompt', true)
				.then(function(){
					WindowPopupQRecDiscount('Discount Item Percent')
					.then(function(){
						$("#number_field").jqxNumberInput('focus');
						setTimeout(function(){
							var input = $('#number_field input')[0];
							if('selectionStart' in input) {
								input.setSelectionRange(0, 0);
							}else{
								var range = input.createTextRange();
								range.collapse(true);
								range.moveEnd('character', 0);
								range.moveStart('character', 0);
								range.select();
							}
							$("#number_field input").select();
						},100)
					})
				})
			}
		}else{
			var msg = 'Please choose discount';
			NumpadAlertClose('qc_discount_error', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			})
		}
	})

	// Cancel Discount process
	$(document).on('click', '#quick_recall_item_discount .button_q_cancel', function(){
		$("#qr_discount_list").jqxWindow('close');
	})

	// Create Numpad Discount dynamic form
	var populateNumpadQRecDiscount = function(form_name){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qr_numpad_discount").append('<div id="qr_numpad_discount_container" style="background: #144766; color:#EEE;"></div>');
			$("#qr_numpad_discount_container").html('');
			if(form_name == 'qrec_item_discount_percent_prompt'){
				$("#qr_numpad_discount_container").append('<h4 style="text-align:center;">Enter % Discount</h4>');
			}else if(form_name == 'qrec_item_discount_dollar_prompt'){
				$("#qr_numpad_discount_container").append('<h4 style="text-align:center;">Enter $ Discount</h4>');
			}
			$("#qr_numpad_discount_container").append(
				'<form id="'+form_name+'">'+
					'<div id="number_field" class="hdfield"></div>'+
					'<div id="keyboard_qrec_numpad_disc"></div>'+
				'</form>'
			);
			$("#number_field").jqxNumberInput({ width: '95%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: 2 });
			$('#number_field').on('change', function (event) 
			{
				var value = event.args.value;
				var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
				myNumber = value;
			}); 
			def.resolve();
		},100);
		return def.promise();
	}

	// Numpad Discount setting
	var WindowPopupQRecDiscount = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qr_numpad_discount").jqxWindow({
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#qr_numpad_discount').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
	
	// Populate Numpad Discount
	var NumpadQRecDiscount = function(discount_type, discount_list = false){
		var def = $.Deferred();
		var uselayout = 'numeric';
		if(discount_list){
			uselayout = 'custom2';
		}
		populateNumpadQRecDiscount(discount_type)
		.then(function(){
			$('#keyboard_qrec_numpad_disc').numeric_numpad({
				layout: 'numbers_only',
				input: $('#number_field')
			});
			setTimeout(function(){
				$("#number_field").focus();
				def.resolve();
			},100);
		});
		return def.promise();
	}

	// Submit discount percent.
	$(document).on('submit', '#qrec_item_discount_percent_prompt', function(e){
		e.preventDefault();
		if($("#number_field").val()){
			var DiscSel = $('input[type=radio][name=group1]:checked').attr('id');
				DiscountItemUnique = DiscSel.split('=')[0];
				DiscountItemPrice  = $('#number_field').val();
				DiscountType	   = DiscSel.split('=')[2];
				DiscountName	   = DiscSel.split('=')[5];
				DiscountUnique	   = DiscSel.split('=')[4];

			var postdata ="discount_q_arr="+JSON.stringify(QuickRecallItemArray);
				postdata+="&ItemUnique="+DiscountItemUnique;
				postdata+="&SellPrice="+parseFloat(DiscountItemPrice).toFixed(2);
				postdata+="&DiscountType="+DiscountType;
				postdata+="&DiscountName="+DiscountName;
				postdata+="&DiscountUnique="+DiscountUnique;
			posData.QuickRecallDiscountProceed(postdata)
			.success(function(data){
				ReloadQuickRecallItemList(GlobalReceiptHeaderUnique);
				$("#qr_numpad_discount").jqxWindow('close');
				$("#qr_discount_list").jqxWindow('close');
			})
		}else{
			$("#qr_numpad_discount").jqxWindow('close');
			var msg = "Discount cannot be Negative or Zero value.";
			NumpadAlertClose('qrec_discount_item_percent_alert', msg)
			.then(function(){
				WindowPopupAlert('Discount Item Percent')
			});
		}
	})

	$(document).on("click", "#btn-print-receipt", function(e){
		e.preventDefault();
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
		}, message: printmsg }); 

		$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
		$("#messageNotification").jqxNotification("closeAll");
		if(GlobalReceiptHeaderUnique > 0){
			OnHoldPrinterCheck()
			.then(function(){
				posData.RePrintReceipt2(GlobalReceiptHeaderUnique)
				.success(function(data){
					setTimeout($.unblockUI, 100);
				})
			})
		}else{
			var msg = "Please select receipt number";
			NumpadAlertClose('recall_open_receipt', msg)
			.then(function(){
				WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Print Receipt');
			});
		}
	})

	var OnHoldPrinterCheck = function(){
		var def = $.Deferred();  
		$('#on-hold-sale').block({message: 'Printing receipt please wait...'})
		posData.OnHoldPrinterCheck()
		.success(function(result){
			if(result.success == true){
				if(result.print == true){
					$('#on-hold-sale').unblock();
					def.resolve();
				}else{
					$('#on-hold-sale').unblock();
					var msg="Printer error, please check <br/>";
					msg+="1. Printer is turned on. <br/>";
					msg+="2. Check printer paper. <br/>";
					msg+="3. Restart printer.";
					NumpadAlertClose('invalid_passcode', msg)
					.then(function(){
						WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					})
					setTimeout($.unblockUI, 100);
				}
			}else{
				$('#on-hold-sale').unblock();
			}
		}).catch(function(result){
			if(LogDisplay == 1){
				var msg = result.data+'<br/>'
					msg+= notifyMessage;
				NumpadAlertClose('PrinterCheck_error', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');
				});
			}else{
				var msg = 'Technical issue '+'<br/>'
					msg+= notifyMessage;		
				NumpadAlertClose('printer_check_error', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> PrinterCheck');	
				});
			}
			
		}).finally(function() {
			//console.log("finally finished repos");
		})
		return def.promise();
	};

	$(document).on("click", "#btn-new-receipt", function(){
        if($("#CashInMethod").val() == 2){
            posData.CashInServerCheckByUserId()
            .success(function(result){
                if(result.cashin){
					if($("#POSOrderTypeRequired").val() == 2){
						$rootScope.$emit('CallOrderTypeWindowQuickRecallNewSale', SetNewUser); 
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
									NumpadAlertClose('create_receipt_error', msg)
									.then(function(){
										WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');
									});
								}else{
									var msg = 'Technical issue '+'<br/>'
										msg+= notifyMessage;	
									NumpadAlertClose('create_receipt_error', msg)
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
        }else{
            posData.CashInStationCheckByUserId()
            .success(function(result){
                if(result.cashin){
					var TableNumberChange   = $("#TableNumberChange").val();
					var TableCustomerNo     = $("#TableCustomerNo").val();
					if(TableNumberChange == 2 && TableCustomerNo == 1){
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
								NumpadAlertClose('create_receipt_error', msg)
								.then(function(){
									WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');
								});
							}else{
								var msg = 'Technical issue '+'<br/>'
									msg+= notifyMessage;	
								NumpadAlertClose('create_receipt_error', msg)
								.then(function(){
									WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> CreateReceipt / EnterPasscode');	
								});	
							}
							
						}).finally(function() {
							//console.log("finally finished repos");
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
	
	$(document).on("click", "#btn-proceed-sale", function(){
		var rowindex = $('#listOnHoldSale').jqxGrid('getselectedrowindex');
		var rowid = $('#listOnHoldSale').jqxGrid('getrowid', rowindex);
		var rowdata = $("#listOnHoldSale").jqxGrid('getrowdatabyid', rowid);

        if(rowdata.Unique){
            if($("#CashInMethod").val() == 2){
                posData.CashInServerCheckByUserId()
                .success(function(result){
                    if(result.cashin){
						var postdata ="ReceiptHeaderUnique="+rowdata.Unique;
							postdata+="&SplitUnique="+rowdata.Unique;
                        posData.RecallCashierPayment(postdata)
                        .success(function(data){    
                            if(data.success){
                                if(data.can_open){
                                    $window.location.href = 'pointofsale';
                                }else{
                                    NumpadAlertClose('cannot_open_receipt', data.msg)
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
                        var postdata = "ReceiptHeaderUnique="+GlobalReceiptHeaderUnique;
                        posData.RecallCashierPayment(postdata)
                        .success(function(data){    
                            if(data.success){
                                if(data.can_open){
                                    $window.location.href = 'pointofsale';
                                }else{
                                    NumpadAlertClose('cannot_open_receipt', data.msg)
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
            NumpadAlertClose('recall_open_receipt', msg)
            .then(function(){
                //WindowPopupAlertBig('<span class="glyphicon glyphicon-info-sign"></span> Recall / Payment');
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Payment');
            });
        }
	})


	var populateRecallFilter = function(form, html){
		var def = $.Deferred();
		$("#onhold_filter_recall").append('<div class="onhold_filter_recall_container" style="background: #144766; color:#EEE;"></div>');
		$(".onhold_filter_recall_container").html('');
		setTimeout(function(){
			$(".onhold_filter_recall_container").append(html);
			$(".onhold_filter_recall_container").append(
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
			var ResoWidth       = $("#on-hold-sale").width();
			var ResoHeight      = $("#on-hold-sale").height();
			var useFilterHeight = (ResoHeight / 2);
			$("#onhold_filter_recall").jqxWindow({
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
			$('#onhold_filter_recall').jqxWindow('open');
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


	$(document).on("click", "#btn-use-receipt", function(){
		var rowindex = $('#listOnHoldSale').jqxGrid('getselectedrowindex');
		var rowid = $('#listOnHoldSale').jqxGrid('getrowid', rowindex);
		var row = $("#listOnHoldSale").jqxGrid('getrowdatabyid', rowid);

		var postdata="ReceiptHeaderUnique="+row.Unique;
			postdata+="&SplitUnique="+row.SplitUnique;
        if(row.Unique){
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
            var msg = "Please select receipt number";
            NumpadAlertCloseReport('recall_open_receipt', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span> Recall / Open Receipt');
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
                        var RecallDatefrom  = $("#recall_date_from").val();
                        var RecallDateto    = $("#recall_date_to").val();
                        var RecallLocation  = $("#recall_location").val();
                        var postdata = "DateFrom="+$filter('date')(new Date(RecallDatefrom), 'yyyy-MM-dd');
                            postdata+= "&DateTo="+$filter('date')(new Date(RecallDateto), 'yyyy-MM-dd');
                            postdata+= "&Location="+RecallLocation;
                            postdata+= "&Attribute=CashierRecallOnHold";
                            postdata+= "&Status=5";
                        posData.QRRecallFilterSearch(postdata)
                        .success(function(recdata){
                            var source = {
                                datatype: "json",
                                datafields: recdata.type,
                                localdata: recdata.result
                            };
                            
                            $('#listOnHoldSale').on('bindingcomplete', function (event) {
                                $('#statusrowlistCashierSale').children().css("background-color", "white")
                            });

                            var dataAdapter = new $.jqx.dataAdapter(source);
                            var ColumnHideShow = $("#PrintReceiptOrderNo").val();
                            $("#listOnHoldSale").jqxGrid({
                                source: dataAdapter
                            })

                            setTimeout(function(){
                                $("#listOnHoldSale").jqxGrid('selectrow', 0);
                            },100);
                            
                            bindData("listOnHoldSale");
                        })
                        $("#onhold_filter_recall").jqxWindow('close');
                    })
                })
            })
        })
	})
	
	$(document).on("click", "#recall_filter .button_q_cancel", function(){
		$("#onhold_filter_recall").jqxWindow('close');
	})
	

	var quick_recall_sel_rows = [];
	$(document).on('click', '#btn-assign', function(){
		posData.CashInServerCheckByUserId()
		.success(function(result){
			if(result.cashin){
				var selectionmode = $('#listOnHoldSale').jqxGrid('selectionmode');
				if(selectionmode == 'singlerow'){
					$("#messageNotification").html('');
					$('#listOnHoldSale').jqxGrid('clearselection');
					$("#btn-use-receipt").text('Open');
					$("#btn-use-receipt").val('');
					$(".listitems").html('');
					$(".OHSlistitemsTotal").html('');
					$("#listOnHoldSale").jqxGrid('selectionmode', 'multiplerows');
					$("#messageNotification").append('<div style="color: #000;">To assign to new User, please select one or more receipts below</br>then press Assign button again.</div>')
					$("#messageNotification").jqxNotification("open");
				}else{
					var postdata ="FunctionButton=AssignNewUser";
					posData.CheckUserManager(postdata)
					.success(function(data){
						if(data.prompt){
							FunctionButton = 'AssignNewUser';
							NumpadPasscode('assign_receipts_enter_passcode')
							.then(function(){
								WindowPopupPasscode('Assign')
								.then(function(){
									$("#number_field").focus();
								})
							})
							$("#messageNotification").jqxNotification("closeAll");
						}else{
							quick_recall_sel_rows = [];
							var rowindexes = $("#listOnHoldSale").jqxGrid('getselectedrowindexes');
							if(rowindexes.length > 0){
								$.each(rowindexes, function(index, value){
									var row = $("#listOnHoldSale").jqxGrid('getrowdata', value);
									quick_recall_sel_rows.push(row.Unique);
								})
								posData.QuickRecallServerCashIn()
								.success(function(data){
									ServerCashInListView('assign_receipts', data.html)
									.then(function(){
										WindowServerCashInList('Assign Receipt To');
									})
								})
								$("#messageNotification").jqxNotification("closeAll");
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
	})

	$(document).on('submit', '#assign_receipts_enter_passcode', function(e){
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
						var rowindexes = $("#listOnHoldSale").jqxGrid('getselectedrowindexes');
						if(rowindexes.length > 0){
							$.each(rowindexes, function(index, value){
								var row = $("#listOnHoldSale").jqxGrid('getrowdata', value);
								quick_recall_sel_rows.push(row.Unique);
							})
							posData.QuickRecallServerCashIn()
							.success(function(data){
								ServerCashInListView('assign_receipts', data.html)
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

	var populateSeverCashInList = function(form_name, html){
		var def = $.Deferred();
		setTimeout(function(){
			$("#quick_recall_cashin").append('<div id="quick_recall_cashin_container" style="background: #004a73"></div>');
			$("#quick_recall_cashin_container").html('');
			$("#quick_recall_cashin_container").append(html);
			$("#quick_recall_cashin_container").append(""+
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
			$("#quick_recall_cashin").jqxWindow({
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
			$('#quick_recall_cashin').jqxWindow('open');
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

	$("#messageNotification").jqxNotification({
		width: 150, position: "top-right", opacity: 0.9,
		autoOpen: false, animationOpenDelay: 10, autoClose: false, template: "warning"
	});

	$(document).on('click', '#assign_receipts .button_proceed', function(){
		var ServerId = $('input[type=radio][name=group1]:checked').attr('id');
		if(ServerId){
			var rows = JSON.stringify(quick_recall_sel_rows);
			var postdata ="ReceiptHeaderUniques="+rows;
				postdata+="&Server="+ServerId;
			posData.QuickRecallUpdateReceiptsServer(postdata)
			.success(function(data){
				if(data.success){
					posData.LoadOnHoldSale()
					.success(function(recdata){
						var source = {
							datatype: "json",
							localdata: recdata
						}
						var dataAdapter = new $.jqx.dataAdapter(source);
						$("#listOnHoldSale").jqxGrid({
							source: dataAdapter
						})
					})
					$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
					$('#listOnHoldSale').jqxGrid('selectrow', 0);
					$('#quick_recall_cashin').jqxWindow('close');
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

	$(document).on('click', '#assign_receipts .button_q_cancel', function(){
		$('#quick_recall_cashin').jqxWindow('close');
		$("#listOnHoldSale").jqxGrid('selectionmode', 'singlerow');
		$('#listOnHoldSale').jqxGrid('selectrow', 0);
	})	
	
	$(document).on('submit', '#cashier_quick_recall_new_sale_customer_no', function(e){
		e.preventDefault();
		var CustomerCount  = $("#table_number_field").val();
		if(CustomerCount > 2999){
			var msg = "Customer Count can be up to 2999.";
            NumpadAlertClose('customer_count_error', msg)
            .then(function(){
                WindowPopupAlert ('Customer Count Info');
            })
		}else{
			var postdata ="CustomerNo="+$("#table_number_field").val();
				postdata+="&OrderTypeNo="+$scope.OrderTypeName;
			posData.RecallCustomerNoCreateReceipt(postdata)
			.success(function(data){
				$window.location.href = 'pointofsale';
			})
		}
	})

	
	$(document).on('rowdoubleclick', '#listOnHoldSale', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		posData.CashInServerCheckByUserId()
		.success(function(result){
			if(result.cashin){
				var postdata="ReceiptHeaderUnique="+row.Unique;
					postdata+="&SplitUnique="+row.SplitUnique;
					postdata+="&FunctionName=Quick Recall";
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
				NumpadAlertClose('cannot_open_receipt', data.msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				})
			}
		})	
	})

	$(document).on('click', '#cashier_quick_recall_close', function(e){
		e.preventDefault();
		$("#on-hold-sale").jqxWindow('close');	
	})

	$(document).on('click', '#btn-recall-screen-close', function(e){
		e.preventDefault();
		$("#on-hold-sale").jqxWindow('close');	
	})
}
