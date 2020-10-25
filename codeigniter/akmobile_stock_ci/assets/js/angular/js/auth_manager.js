(function() {
    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {
		var BatchResultArr = [];

		var GridTheme = $("#GridTheme").val();
		var Alertdialog;
		var AlertdialogFinal;
		var SecureDevicedialog;
		var TabSelected = 0;
		var AuthManual = $("#AuthBatchManual").val();

		var ResoWidth 	        = $("#fakeheight").width();
		var ResoHeight 	        = $("#fakeheight").height();

		var GAutoResizeColumns	= $("#GridAutoResizeColumns").val();
		var GridRowHeight = parseInt($("#GridRowHeight").val());
		var GridTheme = $("#GridTheme").val();
		var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
		/*
		var ComputeHeight		= ResoHeight - 140;
		var UseHeight			= ComputeHeight;
		var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
		*/
		
		$("#datefrom").jqxDateTimeInput({formatString: 'MM/dd/yyyy', width: 110, height: 25 });
		$("#dateto").jqxDateTimeInput({formatString: 'MM/dd/yyyy', width: 110, height: 25 });
		
		$scope.dialogAlertSettings = {
            created: function(args)
            {
                Alertdialog = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 300, height: 195,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: false
        };
		
		$scope.dialogSecureDeviceSettings = {
            created: function(args)
            {
                SecureDevicedialog = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 250, height: 150,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: true
		};
		
		$scope.dialogAlertSettingsFinal = {
            created: function(args)
            {
                AlertdialogFinal = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 300, height: 195,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: false
        };
		
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
		
		var sortByKey = function(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		
		var LocationList = function(){
			var def = $.Deferred();
			posData.LocationList()
			.success(function(data){
				$("#comboboxLocation").jqxComboBox({source: data, placeHolder: "Location", displayMember: "LocationName", valueMember: "Unique",  height: 25, width: 120 });
				def.resolve();
			}).then(function(){
				$("#comboboxLocation").val($("#DefaultLocation").val());
			})
			return def.promise();
		}
		
		var SecureDeviceList = function(){
			var def = $.Deferred();
			posData.SecureDevices()
			.success(function(data){
				var SecureDeviceList = data;
				$("#comboboxSecureDevice").jqxDropDownList({source: SecureDeviceList, placeHolder: "Secure Device", displayMember: "Name", valueMember: "Unique",  height: 25, width: '100%' });
				def.resolve(); 
			})
			return def.promise();
		}
		
		
		var PrinterCheck = function(Unique, PaymentUnique, status, RHeaderUnique, print_option){
			var def = $.Deferred();
			var postdata="PaymentTypeUnique="+Unique;
			postdata+="&responseid="+PaymentUnique;
			postdata+="&payment_status="+status;
			postdata+="&payments_print=2";
			postdata+="&receipt_header_unique="+RHeaderUnique;
			postdata+="&print_option="+print_option;
			posData.PrinterCheck(postdata)
			.success(function(data){
			  	AlertProcessdialog.close();
					if(data.success == true){
							if(data.print == true){
									//do nothing
							}else{
									$("#message").html('');
									var msg="Printer error, please check <br/>";
											msg+="1. Printer is turned on. <br/>";
											msg+="2. Check printer paper. <br/>";
											msg+="3. Restart printer.";
									$("#message").append("<h4>"+msg+"</h4>");
									NumpadAlertOk('error_print', msg)
									.then(function(){
											WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
									})
							}
					}
					setTimeout($.unblockUI, 100);
					def.resolve();
			})
			return def.promise();
		}
		
		var populateNumpadAlert = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#alert-msg-popup").append('<div id="alert-msg-popup-container" style="background: #144766; color: #EEE;"></div>')
				$("#alert-msg-popup-container").html('');
				$("#alert-msg-popup-container").append(''+
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

		/*@param string header_text*/
		/*Popup Alert*/
		var WindowPopupAlert = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#alert-msg-popup").jqxWindow({
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
					$('#alert-msg-popup').jqxWindow('setTitle', header_text);
					$('#alert-msg-popup').jqxWindow('open');
				},100);
				def.resolve();	
			},100);
			return def.promise();
		}

		$(document).on('click', '.alert_okay', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			$('body').unblock();
		})

		$(document).on('click', '.alert_close', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			$('body').unblock();
		})

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

		$(document).on('close', '#dialog-numpad-tip', function(event){
			event.preventDefault();
			$("#numpad_tip").html('');
		})

		/* Dynamic Plugin Commands */
		$(document).on('close', "#dialog-numpad-alert", function(event){
			event.preventDefault();
			$("#alert-msg-popup").html('');
		})

		var getValue = function(obj, decimal){
			//Seperates the components of the number
			var n= obj.toString().split(".");
			//Comma-fies the first part
			n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			//Combines the two sections
			return n.join(".");
		}

		var initrowdetailsApproved = function (index, parentElement, gridElement, row) {
			var tabsdiv = null;
			//alert(JSON.stringify(row));
			tabsdiv = $($(parentElement).children()[0]);
			if (tabsdiv != null) {
				tabsdiv.append(
					$("<ul style='margin-left: 30px;'>"+
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
							"<div>Location: <span>"+row.LocationName+"</span></div>"+
							"<div>Station: <span>"+row.StationName+"</span></div>"+
						"</div>"
					)
				);
			
				infos = tabsdiv.find('.infos');
				other = tabsdiv.find('.other');
				var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
				var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
				$(infos).append(infocontainer);
				$(other).append(othercontainer);
				$(tabsdiv).jqxTabs({ width: "95%", height: 190});
			}
		}			
		
		var renderer = function (row, column, value) {
			return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
		}
		var rendererAmount = function (row, column, value) {
			return '<span style="margin-left: 4px; margin-top: 9px; float: right;">' + parseFloat(value).toFixed(2) + '</span>';
		}
		var rendererDate = function (row, column, value) {
			return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + $filter('date')(new Date(value), 'MM/dd hh:mm a') + '</span>';
		}

		/*
		|----------------------------------------------------------------------|
		| Pre Auth
		|----------------------------------------------------------------------|
		*/
		var PreAuthPopulate = false;
		var gridPreAuth = function(data){
				PreAuthPopulate = true;
				var def = $.Deferred();
				var ComputeHeight		= ResoHeight - 140;
				var UseHeight			= ComputeHeight;
				var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

				var source = {
					dataType: "json",
					dataFields: [
						{ name: 'unique', type: 'int'},
						{ name: 'Date', type: 'string'},
						{ name: 'Reference', type: 'string'},
						{ name: 'Receipt', type: 'string'},
						{ name: 'Card4', type: 'number'},
						{ name: 'TranType', type: 'string'},
						{ name: 'CardType', type: 'string'},
						{ name: 'AuthStatus', type: 'string'},
						{ name: 'AuthCode', type: 'string'},
						{ name: 'Purchase', type: 'float'},
						{ name: 'Gratuity', type: 'float'},
						{ name: 'Authorize', type: 'float'},
						{ name: 'UserName', type: 'string'},
						{ name: 'BatchNo', type: 'string'},
						{ name: 'RecPUnique', type: 'int'},
						{ name: 'CustomerName', type: 'string'},
						{ name: 'ReceiptHeader', type: 'int'},
						{ name: 'status', type: 'int'},
						{ name: 'voided', type: 'string'},
						{ name: 'payment_unique', type: 'int'},
						{ name: 'Label', type: 'string'},
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
						{ name: 'AcqRefData', type: 'string'},
						{ name: 'ProcessData', type: 'string'},
						{ name: 'LocationName', type: 'string'},
						{ name: 'StationName', type: 'string'},
						{ name: 'ReceiptHeaderUnique', type: 'int'},
						{ name: 'CardHolderName', type: 'string'},
						{ name: 'TableName', type: 'string'},
						{ name: 'UserUnique', tupe: 'int'},
					],
					//Commented by HD 12-26-19
					// url: base_url + 'pos/batch/sales/batchtype/pre-auth',
					// data: {'batchtype': 'PreAuth'},
					// type: 'post',
					// sort: function () {
						// $("#preauthGrid").jqxGrid('updatebounddata', 'sort');
					// },
					addrow: function (rowid, rowdata, position, commit) {
						commit(true);
						$("#preauthGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
						$("#preauthGrid").jqxGrid('refreshdata');
						$("#preauthGrid").jqxGrid('refresh');
					},updaterow: function (rowid, rowdata, commit) {
						commit(true);
						$("#preauthGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
						$("#preauthGrid").jqxGrid('refreshdata');
						$("#preauthGrid").jqxGrid('refresh');
					},deleterow: function (rowid, commit) {
						commit(true);
						$("#preauthGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
						$("#preauthGrid").jqxGrid('refreshdata');
						$("#preauthGrid").jqxGrid('refresh');
					},
					localdata: data
				}
				var dataAdapter = new $.jqx.dataAdapter(source);

			$("#preauthGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				altRows: true,
				scrollbarsize: GridScrollBarSize,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: true,
				showstatusbar: true,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsApproved,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%',  cellsAlign: 'left', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '10%', filtertype: 'input', hidden:true, cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					
					{ text: 'Reference', dataField: 'Reference', width: '9%', filtertype: 'input', cellsRenderer: renderer, hidden: true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '8%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Card', dataField: 'Card4', width: '8%', filtertype: 'number', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Card</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '10%', filtertype: 'input', cellsRenderer: renderer, hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '10%', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '8%', filtertype: 'number', align: 'right',  cellsFormat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
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
					},
					{ text: 'Adjust', dataField: 'Gratuity',  width: '8%',  filtertype: 'number', align: 'right', cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
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
					},
					
					{ text: 'Authorize', dataField: 'Authorize', width: '8%', align: 'right', cellsalign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Authorize</div>';
						},
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},

					{ text: 'Label', dataField: 'Label', width: '14%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},

					{ text: 'Cardholder', dataField: 'CardHolderName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Cardholder</div>';
						}
					},

					{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input', cellsRenderer: renderer,  
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
				]
			})

			setTimeout(function(){
				if(GAutoResizeColumns){
					$("#preauthGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
					$("#preauthGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
					$("#preauthGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
					$("#preauthGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
				}
				
				def.resolve();
			},100)
			return def.promise();
		}

		/*
		|-------------------------------------------------------------------------
		| Grid Approved
		|-------------------------------------------------------------------------
		*/
		var ApprovedPopulate = false;
		var gridApproved = function(data){
			ApprovedPopulate = true;
			var def = $.Deferred();
			var ComputeHeight		= ResoHeight - 140;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

			var source = {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'Card4', type: 'number'},
					{ name: 'TranType', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'float'},
					{ name: 'Gratuity', type: 'float'},
					{ name: 'Authorize', type: 'float'},
					{ name: 'UserName', type: 'string'},
					{ name: 'BatchNo', type: 'string'},
					{ name: 'RecPUnique', type: 'int'},
					{ name: 'CustomerName', type: 'string'},
					{ name: 'ReceiptHeaderUnique', type: 'int'},
					{ name: 'status', type: 'int'},
					{ name: 'voided', type: 'string'},
					{ name: 'payment_unique', type: 'int'},
					{ name: 'Label', type: 'string'},
					{ name: 'ResponseOrigin', type: 'string'}, //starts here for Nested row
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
					{ name: 'AcqRefData', type: 'string'},
					{ name: 'ProcessData', type: 'string'},
					{ name: 'LocationName', type: 'string'},
					{ name: 'StationName', type: 'string'},
					{ name: 'CardHolderName', type: 'string'},
					{ name: 'TableName', type: 'string'},
					{ name: 'UserUnique', type: 'int'},
				],
				//Commented by HD 12-26-19
				// url: base_url + 'pos/batch/sales/batchtype',
				// data: {'batchtype' : 'Approved'},
				// type: 'post',
				// sort: function () {
				// 	$("#approvedGrid").jqxGrid('updatebounddata', 'sort');
				// },
				addrow: function (rowid, rowdata, position, commit) {
					commit(true);
					$("#approvedGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#approvedGrid").jqxGrid('refreshdata');
					$("#approvedGrid").jqxGrid('refresh');
				},updaterow: function (rowid, rowdata, commit) {
					commit(true);
					$("#approvedGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#approvedGrid").jqxGrid('refreshdata');
					$("#approvedGrid").jqxGrid('refresh');
				},deleterow: function (rowid, commit) {
					commit(true);
					$("#approvedGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#approvedGrid").jqxGrid('refreshdata');
					$("#approvedGrid").jqxGrid('refresh');
				},
				localdata: data,
				
			}
			var dataAdapter = new $.jqx.dataAdapter(source);

			$("#approvedGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				altRows: true,
				scrollbarsize: GridScrollBarSize,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: true,
				showstatusbar: true,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsApproved,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					//$("#approvedGrid").jqxGrid('showrowdetails', 1);
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%', cellsAlign: 'left', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '10%', filtertype: 'input', hidden:true, cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					
					{ text: 'Reference', dataField: 'Reference', width: '9%', filtertype: 'input', cellsRenderer: renderer, hidden: true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '8%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Card', dataField: 'Card4', width: '8%', filtertype: 'number', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Card</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '10%', filtertype: 'input', cellsRenderer: renderer, hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '10%', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '8%', filtertype: 'number', align: 'right',  cellsFormat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
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
					},
					{ text: 'Adjust', dataField: 'Gratuity',  width: '8%',  filtertype: 'number', align: 'right', cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
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
					},
					{ text: 'Authorize', dataField: 'Authorize', width: '8%', align: 'right', cellsalign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Authorize</div>';
						},
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},
					
					{ text: 'Label', dataField: 'Label', width: '14%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},

					{ text: 'Cardholder', dataField: 'CardHolderName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Cardholder</div>';
						}
					},

					{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
				]
			})

			setTimeout(function(){
				if(GAutoResizeColumns){
					$("#approvedGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
					$("#approvedGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
					$("#approvedGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
					$("#approvedGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
				}
				def.resolve();
			},100)
			return def.promise();
		}

		/*
		|-------------------------------------------------------------------------
		| Grid Declined
		|-------------------------------------------------------------------------
		*/
		var initrowdetailsDeclined = function (index, parentElement, gridElement, row) {
			var tabsdiv = null;
			tabsdiv = $($(parentElement).children()[0]);
			if (tabsdiv != null) {
				tabsdiv.append($("<ul style='margin-left: 30px;'>"+
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
										"<div>Location: <span>"+row.LocationName+"</span></div>"+
										"<div>Station: <span>"+row.StationName+"</span></div>"+
							      "</div>"
							)
						);
			
				infos = tabsdiv.find('.infos');
				other = tabsdiv.find('.other');
				var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
				var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
				$(infos).append(infocontainer);
				$(other).append(othercontainer);
				$(tabsdiv).jqxTabs({ width: "95%", height: 190});
			}
		}

		var DeclinedPopulate = false;
		var gridDeclined = function(data){
			DeclinedPopulate = true;
			var def = $.Deferred();
			var ComputeHeight		= ResoHeight - 140;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			var source = {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'}, 
					{ name: 'Purchase', type: 'float'},
					{ name: 'Authorize', type: 'float'},
					{ name: 'Gratuity', type: 'float'},
					{ name: 'UserName', type: 'string'},
					{ name: 'TextResponse', type: 'string'},
					{ name: 'TranType', type: 'string'},
					{ name: 'BatchNo', type: 'string'},
					{ name: 'RecPUnique', type: 'int'},
					{ name: 'CustomerName', type: 'string'},
					{ name: 'ReceiptHeader', type: 'int'},
					{ name: 'status', type: 'int'},
					{ name: 'voided', type: 'string'},
					{ name: 'payment_unique', type: 'int'},
					{ name: 'Label', type: 'string'},
					{ name: 'ResponseOrigin', type: 'string'}, //starts here for Nested row
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
					{ name: 'AcqRefData', type: 'string'},
					{ name: 'ProcessData', type: 'string'},
					{ name: 'LocationName', type: 'string'},
					{ name: 'StationName', type: 'string'},
					{ name: 'CardHolderName', type: 'string'},
					{ name: 'TableName', type: 'string'}
				],
				//Commented by HD 12-26-19
				// url: base_url + 'pos/batch/sales/batchtype',
				// data: {'batchtype': 'Declined'},
				// type: 'post',
				localdata: data
			}
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#declinedGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				scrollbarsize: GridScrollBarSize,
				altRows: true,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: true,
				showstatusbar: true,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsDeclined,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					//$("#declinedGrid").jqxGrid('showrowdetails', 1);
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '8%', filtertype: 'input', hidden: true, cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%', cellsAlign: 'left', filtertype: 'checkedlist',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					
					{ text: 'Reference', dataField: 'Reference', width: '10%', filtertype: 'input', hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '11%', filtertype: 'input',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '9%', filtertype: 'input', cellsRenderer: renderer, hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '9%', filtertype: 'checkedlist',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '10%', align: 'right', cellsAlign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
						},
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},
					{ text: 'Adjust', dataField: 'Gratuity',  width: '10%',  filtertype: 'number', align: 'right', cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
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
					},
					{ text: 'Authorize', dataField: 'Authorize', width: '10%', align: 'right', cellsAlign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Authorize</div>';
						},
						
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},
					
					{ text: 'Label', dataField: 'Label', width: '14%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},

					{ text: 'Cardholder', dataField: 'CardHolderName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Cardholder</div>';
						}
					},

					{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
				]
			})
			setTimeout(function(){
				if(GAutoResizeColumns){
					$("#declinedGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
					$("#declinedGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
					$("#declinedGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
					$("#declinedGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
				}
				def.resolve();
			},100);
			return def.promise();
		}

		/*
		|------------------------------------------------------------------------
		| Grid Zero Auth
		|------------------------------------------------------------------------
		*/
		var ZeroAuthPopulate = false;
		var gridZeroAuth = function(data){
			ZeroAuthPopulate = true;
			var def = $.Deferred();
			var ComputeHeight		= ResoHeight - 140;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

			var source = {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'Card4', type: 'number'},
					{ name: 'TranType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'float'},
					{ name: 'Gratuity', type: 'float'},
					{ name: 'Authorize', type: 'float'},
					{ name: 'UserName', type: 'string'},
					{ name: 'BatchNo', type: 'string'},
					{ name: 'RecPUnique', type: 'int'},
					{ name: 'CustomerName', type: 'string'},
					{ name: 'ReceiptHeaderUnique', type: 'int'},
					{ name: 'status', type: 'int'},
					{ name: 'voided', type: 'string'},
					{ name: 'payment_unique', type: 'int'},
					{ name: 'Label', type: 'string'},
					{ name: 'ResponseOrigin', type: 'string'}, //starts here for Nested row
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
					{ name: 'AcqRefData', type: 'string'},
					{ name: 'ProcessData', type: 'string'},
					{ name: 'LocationName', type: 'string'},
					{ name: 'StationName', type: 'string'},
					{ name: 'CardHolderName', type: 'string'},
					{ name: 'TableName', type: 'string'},
					{ name: 'UserUnique', type: 'int'}
				],
				// url: base_url + 'pos/batch/sales/batchtype/zero-auth',
				// data: {'batchtype': 'Approved'},
				// type: 'post',
				localdata: data
			}
			var dataAdapter = new $.jqx.dataAdapter(source);

			$("#zeroauthGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				altRows: true,
				scrollbarsize: GridScrollBarSize,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: true,
				showstatusbar: true,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsApproved,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%', cellsAlign: 'left', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '10%', filtertype: 'input', hidden:true, cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					
					{ text: 'Reference', dataField: 'Reference', width: '9%', filtertype: 'input', cellsRenderer: renderer, hidden: true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '8%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Card', dataField: 'Card4', width: '8%', filtertype: 'number', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Card</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '10%', filtertype: 'input', cellsRenderer: renderer, hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '10%', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '8%', filtertype: 'number', align: 'right',  cellsFormat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
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
					},
					{ text: 'Adjust', dataField: 'Gratuity',  width: '8%',  filtertype: 'number', align: 'right', cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
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
					},
					{ text: 'Authorize', dataField: 'Authorize', width: '8%', align: 'right', cellsalign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Authorize</div>';
						},
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},
					
					{ text: 'Label', dataField: 'Label', width: '14%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},

					{ text: 'Cardholder', dataField: 'CardHolderName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Cardholder</div>';
						}
					},

					{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
				]
			})

			setTimeout(function(){
				if(GAutoResizeColumns){
					$("#zeroauthGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
					$("#zeroauthGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
					$("#zeroauthGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
					$("#zeroauthGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
				}
				def.resolve();
			})
			return def.promise();
		}

		
		/*
		|-------------------------------------------------------------------------
		| Grid All Charges
		|-------------------------------------------------------------------------
		*/
		var initrowdetailsAllCharges = function (index, parentElement, gridElement, row) {
			var tabsdiv = null;
			tabsdiv = $($(parentElement).children()[0]);
			if (tabsdiv != null) {
				tabsdiv.append($("<ul style='margin-left: 30px;'>"+
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
										"<div>Location: <span>"+row.LocationName+"</span></div>"+
										"<div>Station: <span>"+row.StationName+"</span></div>"+
							      "</div>"
							)
						);
			
			
				infos = tabsdiv.find('.infos');
				other = tabsdiv.find('.other');
				var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
				var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
				$(infos).append(infocontainer);
				$(other).append(othercontainer);
				$(tabsdiv).jqxTabs({ width: "95%", height: 190});
			}
		}

		/*
		|----------------------------------------------------------------------|
		| All Charges
		|----------------------------------------------------------------------|
		*/
		var AllChargesPopulate = false;
		var gridAllCharges = function(data){
			AllChargesPopulate = true;
			var def = $.Deferred();
			var ComputeHeight		= ResoHeight - 140;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

			var source = {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'Card4', type: 'number'},
					{ name: 'TranType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Gratuity', type: 'float'},
					{ name: 'Purchase', type: 'float'},
					{ name: 'Authorize', type: 'float'},
					{ name: 'UserName', type: 'string'},
					{ name: 'TranCode', type: 'string'},
					{ name: 'TextResponse', type: 'string'},
					{ name: 'CmdStatus', type: 'string'},
					{ name: 'BatchNo', type: 'string'},
					{ name: 'RecPUnique', type: 'int'},
					{ name: 'CustomerName', type: 'string'},
					{ name: 'ReceiptHeaderUnique', type: 'int'},
					{ name: 'status', type: 'int'},
					{ name: 'voided', type: 'string'},
					{ name: 'payment_unique', type: 'int'},
					{ name: 'Label', type: 'string'},
					{ name: 'ResponseOrigin', type: 'string'}, //starts here for Nested row
					{ name: 'DSIXReturnCode', type: 'string'},
					{ name: 'CmdStatus', type: 'string'},
					{ name: 'TextResponse', type: 'string'},
					{ name: 'MerchantID', type: 'string'},
					{ name: 'AcctNo', type: 'string'},
					{ name: 'ExpDate', type: 'string'},
					{ name: 'TranCode', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'CaptureStatus', type: 'string'},
					{ name: 'RefNo', type: 'string'},
					{ name: 'InvoiceNo', type: 'string'},
					{ name: 'Memo', type: 'string'},
					{ name: 'AcqRefData', type: 'string'},
					{ name: 'ProcessData', type: 'string'},
					{ name: 'LocationName', type: 'string'},
					{ name: 'StationName', type: 'string'},
					{ name: 'CardHolderName', type: 'string'},
					{ name: 'TableName', type: 'string'}
				],
				//Commented by HD 12-26-19
				// url: base_url + 'pos/batch/sales',
				// type: 'post',
				// sort: function () {
				// 	$("#allchargesGrid").jqxGrid('updatebounddata', 'sort');
				// },
				addrow: function (rowid, rowdata, position, commit) {
					commit(true);
					$("#allchargesGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#allchargesGrid").jqxGrid('refreshdata');
					$("#allchargesGrid").jqxGrid('refresh');
				},updaterow: function (rowid, rowdata, commit) {
					commit(true);
					$("#allchargesGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#allchargesGrid").jqxGrid('refreshdata');
					$("#allchargesGrid").jqxGrid('refresh');
				},deleterow: function (rowid, commit) {
					commit(true);
					$("#allchargesGrid").jqxGrid('updatebounddata', 'filter'); //cells to filter
					$("#allchargesGrid").jqxGrid('refreshdata');
					$("#allchargesGrid").jqxGrid('refresh');
				},
				localdata: data
			}
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#allchargesGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				scrollbarsize: GridScrollBarSize,
				altRows: true,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: false,
				showstatusbar: false,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsAllCharges,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					//$("#allchargesGrid").jqxGrid('showrowdetails', 1);
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '9%', filtertype: 'input', hidden: true, cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%', cellsAlign: 'left', filtertype: 'checkedlist', 
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					
					{ text: 'Reference', dataField: 'Reference', width: '8%', filtertype: 'input', hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '7%', filtertype: 'input', 
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Card', dataField: 'Card4', width: '8%', filtertype: 'number', 
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Card</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '6%', filtertype: 'input', hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '9%', filtertype: 'checkedlist', 
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'AuthCode', dataField: 'AuthCode', width: '10%', hidden: true, filtertype: 'input', 
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">AuthCode</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '7%', align: 'right', cellsAlign: 'right', filtertype: 'number', cellsformat:'d2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
						},
					},
					{ text: 'Adjust', dataField: 'Gratuity', width: '7%', align: 'right', cellsAlign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
						},
					},
					
					{ text: 'Status', dataField: 'AuthStatus', width: '7%', filtertype: 'checkedlist', align: 'right', cellsAlign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Status</div>';
						}
					},

					{ text: 'Authorize', dataField: 'Authorize', width: '7%', align: 'right', cellsAlign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Auth.</div>';
						},
					},

					{ text: 'Label', dataField: 'Label', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},
					
					{ text: 'Cardholder', dataField: 'CardHolderName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Cardholder</div>';
						}
					},

					{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
					
					
				]
			})
			setTimeout(function(){
				if(GAutoResizeColumns){
					$("#allchargesGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
					$("#allchargesGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
					$("#allchargesGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
					$("#allchargesGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
				}
				def.resolve();
			},100);
			return def.promise();
		}

		/*
		|-------------------------------------------------------------------------
		| Grid Batch
		|-------------------------------------------------------------------------
		*/
		var initrowdetailsBatch = function (index, parentElement, gridElement, row) {
			var tabsdiv = null;
			tabsdiv = $($(parentElement).children()[0]);
			if (tabsdiv != null) {
				tabsdiv.append(
					$("<ul style='margin-left: 30px;'>"+
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
								"<div>Location: <span>"+row.LocationName+"</span></div>"+
								"<div>Station: <span>"+row.StationName+"</span></div>"+
							"</div>"
					)
				);
			
				infos = tabsdiv.find('.infos');
				other = tabsdiv.find('.other');
				var infocontainer = $('<div style="white-space: normal; margin: 5px;"></div>'); 
				var	othercontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
				$(infos).append(infocontainer);
				$(other).append(othercontainer);
				$(tabsdiv).jqxTabs({ width: "95%", height: 190});
			}
		}

		var BatchPopulate = false;
		var gridBatch = function(data){
			BatchPopulate = true;
			var ComputeHeight		= ResoHeight - 200;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			console.log("displaying data",data);
			var source = {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'Card4', type: 'number'},
					{ name: 'TranType', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'float'},
					{ name: 'Gratuity', type: 'float'},
					{ name: 'Authorize', type: 'float'},
					{ name: 'UserName', type: 'string'},
					{ name: 'BatchNo', type: 'string'},
					{ name: 'RecPUnique', type: 'int'},
					{ name: 'CustomerName', type: 'string'},
					{ name: 'ReceiptHeaderUnique', type: 'int'},
					{ name: 'status', type: 'int'},
					{ name: 'voided', type: 'string'},
					{ name: 'payment_unique', type: 'int'},
					{ name: 'Label', type: 'string'},
					{ name: 'ResponseOrigin', type: 'string'}, //starts here for Nested row
					{ name: 'DSIXReturnCode', type: 'string'},
					{ name: 'CmdStatus', type: 'string'},
					{ name: 'TextResponse', type: 'string'},
					{ name: 'MerchantID', type: 'string'},
					{ name: 'AcctNo', type: 'string'},
					{ name: 'ExpDate', type: 'string'},
					{ name: 'TranCode', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'CaptureStatus', type: 'string'},
					{ name: 'RefNo', type: 'string'},
					{ name: 'InvoiceNo', type: 'string'},
					{ name: 'Memo', type: 'string'},
					{ name: 'AcqRefData', type: 'string'},
					{ name: 'ProcessData', type: 'string'},
					{ name: 'LocationName', type: 'string'},
					{ name: 'StationName', type: 'string'},
					{ name: 'CardHolderName', type: 'string'},
					{ name: 'TableName', type: 'string'}
				],
				// url: base_url + 'pos/batch/batchsales/daterange',
				// data: {
				// 	'datefrom' 	: $("#datefrom").val(), 
				// 	'dateto'	 	: $("#dateto").val(),
				// 	'location'	: $("#comboboxLocation").val()
				// },
				// type: 'post',
				localdata: data
			}
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#batchGrid").jqxGrid({
				source: dataAdapter,
				width: '99.9%',
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				scrollbarsize: GridScrollBarSize,
				altRows: true,
				theme: GridTheme,
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				filterMode: 'excel',
				showfilterrow: true,
				filterable: true,
				showaggregates: true,
				showstatusbar: true,
				statusbarheight: GridRowHeight,
				rowdetails: true,
				rowsheight: GridRowHeight,
				initrowdetails: initrowdetailsBatch,
				rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 210, rowdetailshidden: true },
				ready: function () {
					//$("#batchGrid").jqxGrid('showrowdetails', 1);
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true },
					{ text: 'Date', dataField: 'Date', width: '14%', filtertype: 'input', cellsRenderer: rendererDate,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Date</div>';
						}
					},
					{ text: 'Batch No', dataField: 'BatchNo', width: '10%', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Batch No</div>';
						}
					},
					{ text: 'Assign', dataField: 'UserName', width: '10%', cellsAlign: 'left', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="left">Assign</div>';
						}
					},
					{ text: 'Reference', dataField: 'Reference', width: '9%', filtertype: 'input', cellsRenderer: renderer, hidden: true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Reference</div>';
						}
					},
					{ text: 'Receipt', dataField: 'Receipt', width: '8%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Receipt</div>';
						}
					},
					{ text: 'Table', dataField: 'TableName', width: '6%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Table</div>';
						}
					},
					{ text: 'Card', dataField: 'Card4', width: '8%', filtertype: 'number', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Card</div>';
						}
					},
					{ text: 'Type', dataField: 'TranType', width: '10%', filtertype: 'input', cellsRenderer: renderer, hidden:true,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Type</div>';
						}
					},
					{ text: 'Method', dataField: 'CardType', width: '10%', filtertype: 'checkedlist', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Method</div>';
						}
					},
					{ text: 'Purchase', dataField: 'Purchase', width: '8%', filtertype: 'number', align: 'right',  cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Purchase</div>';
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
					},
					{ text: 'Adjust', dataField: 'Gratuity',  width: '8%',  filtertype: 'number', align: 'right', cellsformat: 'd2', cellsalign: 'right',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Adjust</div>';
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
					},
					{ text: 'Authorize', dataField: 'Authorize', width: '8%', align: 'right', cellsalign: 'right', filtertype: 'number', cellsformat: 'd2',
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; " align="right">Authorize</div>';
						},
						aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = currentValue;
								return aggregatedValue + total;
							}
						}],
						aggregatesRenderer: function (aggregates, column, element) {    
							var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
							var Total = parseFloat(0).toFixed(2);
							if(aggregates.Total){
								Total = aggregates.Total;
							}
							renderString += Total + "</div>";
							return renderString;
						}
					},

					{ text: 'Label', dataField: 'Label', width: '10%', filtertype: 'input', cellsRenderer: renderer, hidden: false,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">Label</div>';
						}
					},
					{ text: 'Cardholder', dataField: 'CardHolderName', width: '17%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Cardholder</div>';
						}
					},
					{ text: 'Customer', dataField: 'CustomerName', width: '17%', filtertype: 'input', cellsRenderer: renderer,
						renderer: function(row, column, value){
							return '<div style="font-weight:bold; ">&nbsp;&nbsp;Customer</div>';
						}
					},
					
				]
			})

			if(GAutoResizeColumns){
				$("#batchGrid").jqxGrid('autoresizecolumn', 'UserName', 'column');
				$("#batchGrid").jqxGrid('autoresizecolumn', 'Purchase', 'column');
				$("#batchGrid").jqxGrid('autoresizecolumn', 'Gratuity', 'column');
				$("#batchGrid").jqxGrid('autoresizecolumn', 'Authorize', 'column');
			}
		}
		
		var LoadHeaderInfo = function(){
			var def = new $.Deferred(); 
			posData.GetHeaderInfo()
			.success(function(data){
				$("#station").text(data.station_name);
				$("#location").text(data.store_name);
				$("#user_name").text(data.user_name);
				def.resolve();
			})
			return def.promise();
		};

		var PreAuth = function(){
			var def = new $.Deferred();
			var postdata ="batchtype=PreAuth";
			posData.PaymentsByBatchTypePreAuth(postdata)
			.success(function(data){
				if(PreAuthPopulate == false){
					gridPreAuth(data);
				}else{
					$("#preauthGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", false);
				def.resolve();
			})
			return def.promise();
		}

		$("#preauthGrid").on("bindingcomplete", function (event) {
			setTimeout(function(){
				$("#preauthGrid").jqxGrid('clearfilters');
			},300)
			$('#preauthGrid').jqxGrid('selectrow', 0);
		});
		
		var Approved = function(){
			var def = new $.Deferred();
			var postdata ="batchtype=Approved";
			posData.PaymentsByBatchType(postdata)
			.success(function(data){
				if(ApprovedPopulate == false){
					gridApproved(data);
				}else{
					$("#approvedGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", false);
				def.resolve();
			})
			return def.promise();
		}

		$("#approvedGrid").on("bindingcomplete", function (event) {
			setTimeout(function(){
				$("#approvedGrid").jqxGrid('clearfilters');
			},300)
			$('#approvedGrid').jqxGrid('selectrow', 0);
		});
		
		var Declined = function(){
			var def = new $.Deferred();
			var postdata ="batchtype=Declined"; 
			posData.PaymentsByBatchType(postdata)
			.success(function(data){
				if(DeclinedPopulate == false){
						gridDeclined(data);
				}else{
						$("#declinedGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", true);
				def.resolve();
			})
			return def.promise();
		}

		$("#declinedGrid").on("bindingcomplete", function (event) {
				setTimeout(function(){
						$("#declinedGrid").jqxGrid('clearfilters');
				},300)
				$('#declinedGrid').jqxGrid('selectrow', 0);
		});

		var ZeroAuth = function(){
			var def = new $.Deferred();
			var postdata ="batchtype=Approved"; 
			posData.PaymentsByBatchTypeZeroAuth(postdata)
			.success(function(data){
				if(ZeroAuthPopulate == false){
					gridZeroAuth(data);
				}else{
					$("#zeroauthGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", false);
				def.resolve();
			})
			return def.promise();
		}

		$("#zeroauthGrid").on("bindingcomplete", function (event) {
			setTimeout(function(){
					$("#zeroauthGrid").jqxGrid('clearfilters');
			},300)
			$('#zeroauthGrid').jqxGrid('selectrow', 0);
		});
		
		var AllCharges = function(){
			var def = new $.Deferred();
			posData.AllChargesPayments()
			.success(function(data){
				if(AllChargesPopulate == false){
					gridAllCharges(data);
				}else{
					$("#allchargesGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", false);
				def.resolve();
			});
			return def.promise();
		}

		$("#allchargesGrid").on("bindingcomplete", function (event) {
			setTimeout(function(){
					$("#allchargesGrid").jqxGrid('clearfilters');
			},300)
			$('#allchargesGrid').jqxGrid('selectrow', 0);
		});

		var Batch = function(){
			var def = $.Deferred();
			var datefrom = $filter('date')(new Date($("#datefrom").val()), 'yyyy-MM-dd');
			var dateto = $filter('date')(new Date($("#dateto").val()), 'yyyy-MM-dd');
			var postdata ="datefrom="+datefrom;
				postdata+="&dateto="+dateto;
				postdata+="&location="+$("#comboboxLocation").val();  
			posData.BatchChargesPayments(postdata)
			.success(function(data){
				console.log("process here", data);
				if(BatchPopulate == false){
					gridBatch(data);
				}else{
					$("#batchGrid").jqxGrid('updatebounddata', 'data');
				}
				$("#Assign").prop("disabled", true);
				def.resolve();
			});
			return def.promise();
		}

		$("#batchGrid").on('bindingcomplete', function(e){
				setTimeout(function(){
					$("#batchGrid").jqxGrid('clearfilters');
				},300)
		})
		
		var ApprovedByDateRange = function(){
			var def = new $.Deferred();
			var datefrom = $filter('date')(new Date($("#datefrom").val()), 'yyyy-MM-dd');
			var dateto = $filter('date')(new Date($("#dateto").val()), 'yyyy-MM-dd');
			var postdata ="batchtype=Approved";
				postdata+="&datefrom="+datefrom;
				postdata+="&dateto="+dateto; 
				postdata+="&location="+ $("#comboboxLocation").val();
			posData.BatchTypePaymentsByDateRange(postdata)
			.success(function(data){
				$scope.approvedGrid = {
					source: {
						localdata: data
					}
				}
				def.resolve();
			})
			return def.promise();
		}
		
		var DeclinedByDateRange = function(){
				var def = new $.Deferred();
				var datefrom = $filter('date')(new Date($("#datefrom").val()), 'yyyy-MM-dd');
				var dateto = $filter('date')(new Date($("#dateto").val()), 'yyyy-MM-dd');
				var batchtype= "Declined";
				var postdata ="batchtype=Declined";
					postdata+="&datefrom="+datefrom;
					postdata+="&dateto="+dateto;
					postdata+="&location="+$("#comboboxLocation").val(); 
				posData.BatchTypePaymentsByDateRange(postdata)
				.success(function(data){
					$scope.declinedGrid = {
						source: {
							localdata: data
						}
					}
					def.resolve();
				})
				return def.promise();
		}
		
		var AllChargesByDateRange = function(){
				var def = new $.Deferred();
				var datefrom = $filter('date')(new Date($("#datefrom").val()), 'yyyy-MM-dd');
				var dateto = $filter('date')(new Date($("#dateto").val()), 'yyyy-MM-dd');
				var postdata ="datefrom="+datefrom;
					postdata+="&dateto="+dateto;
					postdata+="&location="+$("#comboboxLocation").val(); 
				posData.AllChargesPaymentsDateRange(postdata)
				.success(function(data){
					$scope.allchargesGrid = {
						source: {
							localdata: data
						}
					}
					def.resolve();
				})
				return def.promise();
		}
		
		//--> Load Data
		LoadHeaderInfo()
		.then(function(){
			$("#auth_manager_tabs").jqxTabs({theme:'ui-summer', width: '100%', height: '100%' });
			LocationList()
			.done(function(){
				SecureDeviceList()
				.done(function(){
					PreAuth()
					.then(function(){
						$("#auth_manager_tabs").show();
					})
				})
			})
		})
		
		$("#BatchSummary").click(function(){
			if(AuthManual != 1){
				SecureDevicedialog.setTitle('Batch Summary | Secure Device');
				SecureDevicedialog.open();
				setTimeout(function(){
					$("#comboboxSecureDevice").jqxDropDownList({selectedIndex: 0 }); 
				},100);
				$("#secure_device_button").html($compile('<button class="btn btn-primary" ng-click="BatchSummary()">Go</button>')($scope));
			}else{
				var msg = 'Batch will close when you Cash Out.';
				NumpadAlertOk('batch_manual', msg)
				.then(function(){
					WindowPopupAlert('Batch Summary Info');
				})
			}
		})
		
		var CheckDeviceConnection = function(postdata, title){
			var def = $.Deferred();
			posData.CheckDeviceConnection(postdata)
			.success(function(data){
				if(data.success == true){
					def.resolve();
				}else{
					$("body").unblock();
					var message = data.message
					if(message == null){
					  	$("#message").text("Credit Card server is not running, please start.");
					}else{
						$("#message").text(message);
					}
					
					Alertdialog.setTitle(title);
					Alertdialog.open();	
				}
			})
			return def.promise();
		}
		
		var BatchProcess;
		var SelectedPaymentUnique;
		$scope.BatchSummary = function(){
			BatchResultArr = [];
			var Status;
			BatchProcess = 'Batch Summary (Not Finalize)';
			SecureDevicedialog.close();
			//$("#wrapper").block({message: 'Batch Summary processing...'});
			$.blockUI({ css: { 
				border: 'none', 
				padding: '15px', 
				backgroundColor: '#000', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: .5, 
				color: '#fff' 
			}, message: 'Batch Summary processing...' }); 
			SelectedPaymentUnique = $("#comboboxSecureDevice").val();
			var postdata = "PaymentUnique="+$("#comboboxSecureDevice").val();
			//CheckDeviceConnection(postdata, "Batch Summary")
			//.then(function(){
				posData.BatchSummary(postdata)
				.success(function(data){
					var newdata = data.result;
					if(!newdata){
						var msg = "Can't connect to credit card listener please check.";
						NumpadAlertOk('batch_manual_error', msg)
						.then(function(){
							WindowPopupAlert('Batch Charges Info');
						})

						setTimeout($.unblockUI, 100);
						return false;
					}

					Status = newdata.CmdStatus;
					BatchResultArr.push(newdata);
					if(data.success == true){
						$("#message").html('');
						$("#message").append(
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+newdata.MerchantID+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+newdata.BatchNo+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Item Count: '+newdata.BatchItemCount+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch Total: '+getValue(parseFloat(newdata.NetBatchTotal).toFixed(2))+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'
						);
					}else{
						$("#message").html('');
						$("#message").append(
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
							'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'
						);
					}

					//$("#wrapper").unblock();
					setTimeout($.unblockUI, 100);
					if(Status == 'Success'){
						$("#buttonPrint").show();
						$("#BatchCharges").show();
					}else{
						$("#buttonPrint").hide();
						$("#BatchCharges").hide();
					}
					Alertdialog.setTitle('Batch Summary');
					Alertdialog.open();
				})

			//})
		}
		
		$("#BatchCharges").click(function(){
			// SecureDevicedialog.setTitle('Batch Charges | Secure Device');
			// SecureDevicedialog.open();
			// setTimeout(function(){
			// 	$("#comboboxSecureDevice").jqxDropDownList({selectedIndex: 0 }); 
			// },100);
			// $("#secure_device_button").html($compile('<button class="btn btn-primary" ng-click="BatchClose()">Go</button>')($scope));
			$scope.BatchClose();
			Alertdialog.close();
		})
		
		$scope.BatchClose = function(){
			BatchResultArr = [];
			var Status;
			BatchProcess = 'Batch Charges (Finalized)';
			SecureDevicedialog.close();
			//$("#wrapper").block({message: 'Batch Close processing...'});
			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Batch Close processing...' });
			var postdata = "PaymentUnique="+SelectedPaymentUnique;
			CheckDeviceConnection(postdata, "Batch Close")
			.then(function(){
				posData.BatchClose(postdata)
				.success(function(data){
					var newdata = data.result;
					Status = newdata.CmdStatus;
					BatchResultArr.push(newdata);
					var info = data.info;
					if(data.success == true){
						$("#message_final").html('');
						$("#message_final").append(''+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+newdata.MerchantID+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+newdata.BatchNo+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Item Count: '+newdata.BatchItemCount+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch Total: '+getValue(parseFloat(newdata.NetBatchTotal).toFixed(2))+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
						'');
					}else if(data.success == false && data.message == true){
						$("#message_final").html('');
						$("#message_final").append(''+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+info.MerchantID+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+info.BatchNo+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Item Count: '+newdata.BatchItemCount+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch Total: '+getValue(parseFloat(newdata.NetBatchTotal).toFixed(2))+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
						'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
						'');
					}else{
						$("#message_final").html('');
						$("#message_final").append('<div style="float:left; width:100%;"><span style="font-size:16px;">Please select Batch Summary first.</span></div>');
					}
				}).then(function(){
					if(TabSelected == 0){
						PreAuth()
					}else if(TabSelected == 1){
						Approved()
					}else if(TabSelected == 2){
						Declined()
					}else if(TabSelected == 3){
						ZeroAuth()
					}else if(TabSelected == 4){
						AllCharges()
					}
					/*
					$('#auth_manager_tabs').jqxTabs('select', 0); 
					Approved()
					.done(function(){
						$("#wrapper").unblock();
						Alertdialog.setTitle('Batch Charges');
						Alertdialog.open();
					})	
					*/
					if(Status == 'Success'){
						$("#buttonPrintFinal").show();
					}else{
						$("#buttonPrintFinal").hide();
					}

					AlertdialogFinal.setTitle('Finalize');
					AlertdialogFinal.open();
					setTimeout($.unblockUI, 100); 
				})
		   })	
		}
		
		$scope.AlertCancel = function(){
			Alertdialog.close();
		}
		
		var ReceiptNumber;
		var TranType;
		var ConfigPaymentUnique;
		var ReceiptHeaderUnique;
		var Total;
		var Purchase;
		var Adjust;
		var Authorize;
		var Cashier;
		var Card;
		var voided = false;
		var approved = false;
		$("#preauthGrid").on('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $("#preauthGrid").jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.RecPUnique);
				$("#AdjustTipButton").attr("disabled", false);
				$("#VoidButton").attr("disabled", false);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				Total = row.Authorize;
				Cashier = row.UserName;
				Purchase = row.Purchase;
				Adjust = row.Gratuity;
				Authorize = row.Authorize;
				Card = row.Card4;
			
				if(row.status == 12 && row.voided != 'yes'){
					//$("#VoidButton").attr("disabled", false);
					voided = false;
				}else{
					voided = true;
					//$("#VoidButton").attr("disabled", true);
				}

				if(row.CmdStatus == 'Approved'){
					//$("#AdjustTipButton").attr("disabled", false);
					approved = true;
				}else{
					approved = false;
					//$("#AdjustTipButton").attr("disabled", true);
				}
			}
		})

		$("#approvedGrid").on('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.RecPUnique);
				$("#AdjustTipButton").attr("disabled", false);
				$("#VoidButton").attr("disabled", false);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				Total = row.Authorize;
				Cashier = row.UserName;
				Purchase = row.Purchase;
				Adjust = row.Gratuity;
				Authorize = row.Authorize;
				Card = row.Card4;
				
				if(row.status == 12 && row.voided != 'yes'){
					//$("#VoidButton").attr("disabled", false);
					voided = false;
				}else{
					voided = true;
					//$("#VoidButton").attr("disabled", true);
				}

				if(row.CmdStatus == 'Approved'){
					//$("#AdjustTipButton").attr("disabled", false);
					approved = true;
				}else{
					approved = false;
					//$("#AdjustTipButton").attr("disabled", true);
				}
			}
		})

		$("#zeroauthGrid").on('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.RecPUnique);
				$("#AdjustTipButton").attr("disabled", false);
				$("#VoidButton").attr("disabled", false);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				Total = row.Authorize;
				Cashier = row.UserName;
				Purchase = row.Purchase;
				Adjust = row.Gratuity;
				Authorize = row.Authorize;
				Card = row.Card4;
			
				if(row.status == 12 && row.voided != 'yes'){
					//$("#VoidButton").attr("disabled", false);
					voided = false;
				}else{
					voided = true;
					//$("#VoidButton").attr("disabled", true);
				}

				if(row.CmdStatus == 'Approved'){
					//$("#AdjustTipButton").attr("disabled", false);
					approved = true;
				}else{
					approved = false;
					//$("#AdjustTipButton").attr("disabled", true);
				}
			}
		})

		
		$("#declinedGrid").on('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.unique);
				$("#AdjustTipButton").attr("disabled", true);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				$("#VoidButton").attr("disabled", true);
			}
		})

		$("#allchargesGrid").on('rowselect', function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.RecPUnique);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				Total = row.Authorize;
				Cashier = row.UserName;
				Purchase = row.Purchase;
				Adjust = row.Gratuity;
				Authorize = row.Authorize;
				Card = row.Card4;
				$("#VoidButton").attr("disabled", false);
				$("#AdjustTipButton").attr("disabled", false);
				
				if(row.CmdStatus == 'Approved'){
					//$("#AdjustTipButton").attr("disabled", false);
					approved = true;
				}else{
					approved = false;
					//$("#AdjustTipButton").attr("disabled", true);
				}

				if(row.status == 12 && row.voided != 'yes'){
					//$("#VoidButton").attr("disabled", false);
					voided = false;
				}else{
					voided = true;
					//$("#VoidButton").attr("disabled", true);
				}
			}
		})

		$("#batchGrid").on("rowselect", function(event){
			var rowindex = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', rowindex);
			if(row){
				$("#ReceiptPaymentUnique").val(row.RecPUnique);
				payment_unique = row.RecPUnique;
				ReceiptHeaderUnique = row.ReceiptHeaderUnique;
				ConfigPaymentUnique = row.payment_unique;
				TranType = row.TranType;
				ReceiptNumber = row.Receipt;
				$("#AdjustTipButton").attr("disabled", true);
				$("#VoidButton").attr("disabled", true);
			}
		})

		var payment_unique = 0;
		$('#preauthGrid').on('rowdoubleclick', function (event) { 
			var index = event.args.rowindex;
			var datafield = event.args.datafield;
			var otherArr = [];
			var row = $(this).jqxGrid('getrowdata', index);
			payment_unique = row.RecPUnique;
			TranType = row.TranType;

			if(row.status == 12 && row.voided != 'yes'){
				//$("#VoidButton").attr("disabled", false);
				voided = false;
			}else{
				voided = true;
				//$("#VoidButton").attr("disabled", true);
			}

			if(row.CmdStatus == 'Approved'){
				//$("#AdjustTipButton").attr("disabled", false);
				approved = true;
			}else{
				approved = false;
				//$("#AdjustTipButton").attr("disabled", true);
			}
			//alert(row.CmdStatus);
			if(approved == true && voided == false){
				if(TranType != 'EBT'){
					var others ="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Assign:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+Cashier+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Receipt #:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+ReceiptNumber+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Card:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+Card+"</div></div>";
						others+="<br/>";
					otherArr.push(Purchase, Adjust, Authorize);	
					NumpadTip('Adjust', others, otherArr)
					.then(function(){
						WindowPopupTip('Adjust')
						.then(function(){
							var TotalWTip = parseFloat(Purchase) + parseFloat(Adjust);
							$("#PreAuthTotal").text(TotalWTip.toFixed(2));
						})
					})
				}else{
					var msg = TranType + ' cannot be adjusted';
					NumpadAlertOk('adjust_tip', msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})	
				}
			}else{
				var msg = 'Cannot Adjust when Voided or Declined';
				NumpadAlertOk('adjust_tip_declined', msg)
				.then(function(){
					WindowPopupAlert('Adjust Amount');
				})
				SaleStatus = false;
			}
		});


		$('#approvedGrid').on('rowdoubleclick', function (event) { 
			var index = event.args.rowindex;
			var datafield = event.args.datafield;
			var otherArr = [];
			var row = $(this).jqxGrid('getrowdata', index);
			payment_unique = row.RecPUnique;
			TranType = row.TranType;

			if(row.status == 12 && row.voided != 'yes'){
				//$("#VoidButton").attr("disabled", false);
				voided = false;
			}else{
				voided = true;
				//$("#VoidButton").attr("disabled", true);
			}

			if(row.CmdStatus == 'Approved'){
				//$("#AdjustTipButton").attr("disabled", false);
				approved = true;
			}else{
				approved = false;
				//$("#AdjustTipButton").attr("disabled", true);
			}
			//alert(row.CmdStatus);
			if(approved == true && voided == false){
				if(TranType != 'EBT'){
					var others ="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Assign:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+Cashier+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Receipt #:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+ReceiptNumber+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Card:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+Card+"</div></div>";
						others+="<br/>";
					otherArr.push(Purchase, Adjust, Authorize);	
					NumpadTip('Adjust', others, otherArr)
					.then(function(){
						WindowPopupTip('Adjust')
						.then(function(){
							var TotalWTip = parseFloat(Purchase) + parseFloat(Adjust);
							$("#PreAuthTotal").text(TotalWTip.toFixed(2));
						})
					})
				}else{
					var msg = TranType + ' cannot be adjusted';
					NumpadAlertOk('adjust_tip', msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})	
				}
			}else{
				var msg = 'Cannot Adjust when Voided or Declined';
				NumpadAlertOk('adjust_tip_declined', msg)
				.then(function(){
					WindowPopupAlert('Adjust Amount');
				})
				SaleStatus = false;
			}
		});

		var SaleStatus = false;
		$('#allchargesGrid').on('rowdoubleclick', function (event) { 
			var index = event.args.rowindex;
			var datafield = event.args.datafield;
			var otherArr = [];
			var row = $(this).jqxGrid('getrowdata', index);
			if(row.status == 12 && row.voided != 'yes'){
				//$("#VoidButton").attr("disabled", false);
				voided = false;
			}else{
				voided = true;
				//$("#VoidButton").attr("disabled", true);
			}

			if(row.CmdStatus == 'Approved'){
				//$("#AdjustTipButton").attr("disabled", false);
				approved = true;
			}else{
				approved = false;
				//$("#AdjustTipButton").attr("disabled", true);
			}
			if(approved == true && voided == false){
				payment_unique = row.RecPUnique;
				var others ="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Assign:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+Cashier+"</div></div>";
					others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Receipt #:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+ReceiptNumber+"</div></div>";
					others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Card:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left' >"+Card+"</div></div>";
					others+="<br/>";
				otherArr.push(Purchase, Adjust, Authorize);
				NumpadTip('Adjust', others, otherArr)
				.then(function(){
					WindowPopupTip('Adjust')
					.then(function(){
						var TotalWTip = parseFloat(Purchase) + parseFloat(Adjust);
						$("#PreAuthTotal").text(TotalWTip.toFixed(2));
					})
				})
			}else{
				var msg = 'Cannot Adjust when Voided or Declined';
				NumpadAlertOk('adjust_tip_declined', msg)
				.then(function(){
					WindowPopupAlert('Adjust Amount');
				})
				SaleStatus = false;
			}
		});

		/*
		$('#allchargesGrid').on("rowclick", function(event){
			var index = event.args.rowindex;
			var datafield = event.args.datafield;
			var row = $(this).jqxGrid('getrowdata', index);
			payment_unique = row.RecPUnique;

			if(row.CmdStatus == 'Approved'){
				$("#AdjustTipButton").attr("disabled", false);
			}else{
				$("#AdjustTipButton").attr("disabled", true);
			}
		})
		*/
		/*
		$("#declinedGrid").on("rowclick", function(event){
			$("#AdjustTipButton").attr("disabled", true);
		})
		*/

		$(document).on('submit', '#AdjustTip', function(e){
			e.preventDefault();
			//alert(payment_unique);
			$("#wrapper").block({message: 'Adjusting Tip please wait...'});
			var tipdollar = $("#number_field").val();
			var postdata="tipamount="+tipdollar;
				postdata+="&receipt_payment_unique="+payment_unique;
			posData.AdjustTips(postdata)
			.success(function(data){
				if(data.success == true){
					if(TabSelected == 0){
						Approved();
						$("#approvedGrid").jqxGrid('updatebounddata');
					}else if(TabSelected == 2){
						AllCharges();
					}else if(TabSelected == 3){
						
					}

					var msg = '';
					if(data.CmdStatus == 'Declined'){
						msg=data.CmdStatus+"<br/>";
						msg+=data.TextResponse;
					}else if(data.CmdStatus == 'Approved'){
						msg=data.CmdStatus+"<br/>";
					}else{
						msg=data.CmdStatus+"<br/>";
						msg+=data.TextResponse;
					}
					
					NumpadAlertOk('adjust_tip', msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})
				}else{
					NumpadAlertOk('adjust_tip', data.msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})
				}
				$("#wrapper").unblock();
			})
			$("#dialog-numpad-tip").jqxWindow('close');
		})

		/*
		$("#AdjustTipButton").click(function(e){
			if(approved == true && voided == false){
				if(TranType != 'EBT'){
					Adjust 		= parseFloat(Adjust).toFixed(2);
					Purchase 	= parseFloat(Purchase).toFixed(2);
					Authorize 	= parseFloat(Authorize).toFixed(2);
					var others ="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Assign:</div><div style='float:left; width:50%;' align='left'>"+Cashier+"</div></div>";
						others+="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Receipt #:</div><div style='float:left; width:50%;' align='left'>"+ReceiptNumber+"</div></div>";
						others+="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Card:</div><div style='float:left; width:50%;' align='left'>"+Card+"</div></div>";
						others+="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Purchase:</div><div style='float:left; width:50%;' align='right'>"+Purchase+"</div></div>"; 
						others+="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Adjust:</div><div style='float:left; width:50%;' align='right'>"+Adjust+"</div></div>"; 
						others+="<div style='width:100%; background:#00304a none repeat scroll 0 0;'><div style='float:left; width:50%;'>Total:</div><div style='float:left; width:50%;' align='right'>"+Authorize+"</div></div>";
						others+="<br/>";
					NumpadTip('AdjustTip', 'Tip Amount', others)
					.then(function(){
						WindowPopupTip('Adjust Amount')
						.then(function(){
							$("#number_field").val('0.00');
							$("#number_field").focus();
							setTimeout(function(){
								$("#number_field").select();
							},100);
						})
					})
				}else{
					var msg = TranType + ' cannot be adjusted';
					NumpadAlertOk('adjust_tip_declined', msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})
				}
			}else{
				var msg = 'Cannot Adjust when Voided or Declined';
				NumpadAlertOk('adjust_tip_declined', msg)
				.then(function(){
					WindowPopupAlert('Adjust Amount');
				})
				SaleStatus = false;
			}
		})
		*/

		/*@param string form_name
		  @param string title
		  @param array string
		*/
		var populateNumpadTip = function(title, others, otherarr){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-tip").append('<div id="numpad_tip" style="background: #144766; color:#EEE;"></div>');
				$("#numpad_tip").html('');
				if(others){
					$("#numpad_tip").append(others);	
					$("#numpad_tip").append('<hr style="color:#fff">');
				}
				$("#numpad_tip").append('<h2 style="text-align:center; color: #43B220;">'+title+'</h2>');
				var postdata ="Purchase="+otherarr[0];
					postdata+="&Tip="+otherarr[1];
					postdata+="&Authorize="+otherarr[2];
				posData.AdjustView(postdata)
				.success(function(data){
					$("#numpad_tip").append(data.html);
				})
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupTip = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-tip").jqxWindow({
					height: 480,
					minWidth: 430,
					title: header_title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false,
					showAnimationDuration: 0,
                	closeAnimationDuration: 0
				});
				$('#dialog-numpad-tip').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadTip = function(title, others, otherarr){
			var def = $.Deferred();
			populateNumpadTip(title, others, otherarr)
			.then(function(){
				def.resolve();
			});
			return def.promise();
		}

		$(document).on('close', "#dialog-numpad-amount", function(e){
			e.preventDefault();
			$("dialog-numpad-amount-container").html('');
		})

		var populateNumpadAmount = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-amount").append('<div id="dialog-numpad-amount-container" style="background: #144766; color:#EEE;"></div>');
				$("#dialog-numpad-amount-container").html('');
				$("#dialog-numpad-amount-container").append(''+
					'<h4 style="text-align:center;">Add Tip</h4>'+
				'');
				$("#dialog-numpad-amount-container").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" class="hdfield" style="color:#000">'+
					'<div id="keyboard_adjust"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var WindowPopupAmount = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-amount").jqxWindow({
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
				$('#dialog-numpad-amount').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadAmount = function(form_name){
			var def = $.Deferred();
			populateNumpadAmount(form_name)
			.then(function(){
				$('#keyboard_adjust').hdkeyboard({
				  layout: "custom2",
				  input: $('#number_field')
				});
				setTimeout(function(){
					$("#number_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}

		$("#AdjustTipButton").click(function(e){
			e.preventDefault();
			var otherArr = [];
			if(approved == true){
				if(TranType != 'EBT'){
					var others ="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Assign:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+Cashier+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Receipt #:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+ReceiptNumber+"</div></div>";
						others+="<div style='width:100%;'><div style='float:left; background:#296285; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px;'>Card:</div><div style='float:left; width:50%; font-size: 2em; padding-top: 5px; padding:bottom: 5px; margin-bottom:5px; background:#296285;' align='left'>"+Card+"</div></div>";
						others+="<br/>";
					otherArr.push(Purchase, Adjust, Authorize);
					NumpadTip('Adjust', others, otherArr)
					.then(function(){
						WindowPopupTip('Adjust')
						.then(function(){
							var PreAuthTotal = parseFloat(Purchase) + parseFloat(Adjust);
							$("#PreAuthTotal").text(PreAuthTotal.toFixed(2))
						})
					})
				}
			}
		})

		$(document).on('click', '#preauth_adjust_cancel', function(){
			$("#dialog-numpad-tip").jqxWindow('close');
		})

		$(document).on('click', '#preauth_add_tip', function(){
			NumpadAmount('PreAuth_Add_Tip')
			.then(function(){
				WindowPopupAmount('Add Tip')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		})

		var numberWithCommas = function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		$(document).on('submit', '#PreAuth_Add_Tip', function(e){
			e.preventDefault();
			if($("#number_field").val() != ''){
				var AmountEntered 	= $("#number_field").val();
			}else{
				var AmountEntered 	= 0;
			}
			var PreAuthPurchase = $("#PreAuthSubTotal").text();
			var PreAuthTip 		= $("#PreAuthTip").text();
			var PreAuthTotal 	= parseFloat(PreAuthPurchase.replace(/,(?=.*\.\d+)/g, '')) + parseFloat(AmountEntered.replace(/,(?=.*\.\d+)/g, ''));

			$("#PreAuthTip").text(numberWithCommas(parseFloat(AmountEntered).toFixed(2)));
			$("#PreAuthTotal").text(numberWithCommas(PreAuthTotal.toFixed(2)));
			$("#preauth_adjusted_tip").val(AmountEntered);
			$("#dialog-numpad-amount").jqxWindow('close');
		})

		$(document).on('click', '#preauth_no_tip', function(){
			var AmountEntered 	= 0;
			var PreAuthPurchase = $("#PreAuthSubTotal").text();
			var PreAuthTip 		= $("#PreAuthTip").text();
			var PreAuthTotal 	= parseFloat(PreAuthPurchase.replace(/,(?=.*\.\d+)/g, '')) + parseFloat(AmountEntered);
			$("#PreAuthTip").text(parseFloat(AmountEntered).toFixed(2));
			$("#PreAuthTotal").text(numberWithCommas(PreAuthTotal.toFixed(2)));
			$("#preauth_adjusted_tip").val(AmountEntered);
			$("#dialog-numpad-amount").jqxWindow('close');
		})

		$(document).on('click', '#preauth_totalwtip', function(){
			NumpadAmount('PreAuth_total_w_Tip')
			.then(function(){
				WindowPopupAmount('Add Tip')
				.then(function(){
					$("#number_field").val('0.00');
					$("#number_field").focus();
					setTimeout(function(){
						$("#number_field").select();
					},100);
				})
			})
		})

		$(document).on('submit', '#PreAuth_total_w_Tip', function(e){
			e.preventDefault();
			if($("#number_field").val() != ''){
				var AmountEntered 	= $("#number_field").val();
			}else{
				var AmountEntered 	= 0;
			}
			var PreAuthSubTotal = $("#PreAuthSubTotal").text();
			if(AmountEntered >= PreAuthSubTotal){
				$("#PreAuthTotal").text(numberWithCommas(parseFloat(AmountEntered).toFixed(2)));
				var TotalTip = parseFloat(PreAuthSubTotal.replace(/,(?=.*\.\d+)/g, '')) - parseFloat(AmountEntered);
				var ConverTotalTip = parseFloat(TotalTip) * -1;
				$("#PreAuthTip").text(numberWithCommas(ConverTotalTip.toFixed(2)));
				$("#preauth_adjusted_tip").val(ConverTotalTip);
			}else{
				//do nothing
			}
			$("#dialog-numpad-amount").jqxWindow('close');
		})

		$(document).on('click', '#preauth_adjust_ok', function(e){
			e.preventDefault();

			var tipdollar = $("#preauth_adjusted_tip").val();

			if(tipdollar != ''){
				$("#wrapper").block({message: 'Adjusting Tip please wait...'});
				var postdata="tipamount="+tipdollar;
					postdata+="&receipt_payment_unique="+payment_unique;
				posData.AdjustTips(postdata)
				.success(function(data){
					if(data.success == true && data.CmdStatus != 'Error'){
						var msg = '';
						if(data.CmdStatus == 'Declined' ){
							msg=data.CmdStatus+"<br/>";
							msg+=data.TextResponse;
						}else if(data.CmdStatus == 'Approved'){
							msg=data.CmdStatus+"<br/>";
						}else{
							msg=data.CmdStatus+"<br/>";
							msg+=data.TextResponse;
						}

						if(TabSelected == 0){
							$("#preauthGrid").jqxGrid('updatebounddata', 'data');
							NumpadAlertOk('adjust_tip', msg)
							.then(function(){
								WindowPopupAlert('Adjust Amount');
							})
								// PreAuth()
								// .then(function(){
								// 		NumpadAlertOk('adjust_tip', msg)
								// 		.then(function(){
								// 			WindowPopupAlert('Adjust Amount');
								// 		})
								// })
						}else if(TabSelected == 1){
							$("#approvedGrid").jqxGrid('updatebounddata', 'data');
							NumpadAlertOk('adjust_tip', msg)
							.then(function(){
								WindowPopupAlert('Adjust Amount');
							})

								// Approved()
								// 	.then(function(){
								// 		NumpadAlertOk('adjust_tip', msg)
								// 		.then(function(){
								// 			WindowPopupAlert('Adjust Amount');
								// 		})
								// })
						}else if(TabSelected == 2){
							
						}else if(TabSelected == 3){
								ZeroAuth()
								.then(function(){
										NumpadAlertOk('adjust_tip', msg)
										.then(function(){
												WindowPopupAlert('Adjust Amount');
										})
								})
						}else if(TabSelected == 4){
								AllCharges()
								.then(function(){
										NumpadAlertOk('adjust_tip', msg)
										.then(function(){
												WindowPopupAlert('Adjust Amount');
										})
								})
						}
					}else{
						var msg =data.CmdStatus+"<br/>";
							msg+=data.TextResponse;
						NumpadAlertOk('adjust_tip', msg)
						.then(function(){
							WindowPopupAlert('Adjust Amount');
						})
					}
					$("#wrapper").unblock();
				})
			}
			$("#dialog-numpad-tip").jqxWindow('close');
		})

		$scope.DeclinedClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			$("#ReceiptPaymentUnique").val(row.unique);
		}
		
		$scope.AllChargesClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			$("#ReceiptPaymentUnique").val(row.unique);
		}
		
		// $("#ReprintSlip").click(function(){
		// 	var SelRow = $("#ReceiptPaymentUnique").val();
		// 	if(SelRow == ''){
		// 		$("#message").text("Please select receipt first");
		// 		Alertdialog.setTitle('Reprint Slip');
		// 		Alertdialog.open();
		// 	}else{
		// 		$('body').block({message: 'Printing receipt'})
		// 		var ReceiptPaymentCardUnique = $("#ReceiptPaymentUnique").val();
		// 		var postdata = "ReceiptPaymentCardUnique="+ReceiptPaymentCardUnique;
		// 		posData.SearchReceiptPaymentCard(postdata)
		// 		.success(function(data){
		// 			PrinterCheck(data.PaymentUnique, data.ReceiptPaymentUnique, data.status, data.ReceiptHeaderUnique);
		// 		}).then(function(){
		// 			$('body').unblock();
		// 		});
		// 	}
		// })
		
		$("#AuthManSearch").click(function(){
			BatchPopulate = false;
			$('body').block({message: 'Loading data please wait...'})
			Batch()
			.then(function(){
				$('body').unblock();
				$("#auth_manager_tabs").jqxTabs('select', 5);
			})
		})

		$('#auth_manager_tabs').on('tabclick', function (event) { 
			var clickedItem = event.args.item;
			$('body').block({message: 'Loading data please wait...'})
			$('#auth_manager_tabs').jqxTabs({ selectionTracker: true });
			if(clickedItem == 0){ //Pre Auth
				PreAuth()
				.done(function(){
					$('body').unblock();
				})
				TabSelected = 0;
				$("#daterange-search").css({"display":"none"});
			}else if(clickedItem == 1){ //Approved
				//ApprovedByDateRange()
				Approved()
				.done(function(){
					$('body').unblock();
				})
				TabSelected = 1;
				$("#daterange-search").css({"display":"none"});
			}else if(clickedItem == 2){ //Declined
				//DeclinedByDateRange()
				Declined()
				.done(function(){
					$('body').unblock();
				})
				TabSelected = 2;
				$("#daterange-search").css({"display":"none"});
			}else if(clickedItem == 3){
				ZeroAuth()
				.then(function(){
					$('body').unblock();
				})
				TabSelected = 3;
				$("#daterange-search").css({"display":"none"});
			}else if(clickedItem == 4){ //All Charges
				//AllChargesByDateRange()
				AllCharges()
				.done(function(){
					$('body').unblock();
				})
				TabSelected = 4;
				$("#daterange-search").css({"display":"none"});
			}else if(clickedItem == 5){
				Batch()
				.done(function(){
					$('body').unblock();
				})
				TabSelected = 5;
				$("#daterange-search").css({"display":"block"});
			}
		}); 
		
		var ApprovedByLocation = function(location){
				var def = new $.Deferred();
				var batchtype= "Approved";
				var postdata ="BatchType="+batchtype;
						postdata+="&Location="+location;
				posData.ApprovedPaymentsByLocation(postdata)
				.success(function(data){
						$scope.approvedGrid = {
							source: {
								localdata: data
							}
						}
						$scope.approvedSubGrid = {
							source: {
								localdata: data
							}
						}
						def.resolve();
				})
				return def.promise();
		}
		
		var DeclinedByLocation = function(location){
				var def = new $.Deferred();
				var batchtype= "Declined";
				var postdata ="BatchType="+batchtype;
						postdata+="&Location="+location;
				posData.DeclinedPaymentsByLocation(postdata)
				.success(function(data){
						$scope.declinedGrid = {
							source: {
								localdata: data
							}
						}
						def.resolve();
				})
				return def.promise();
		}
		
		var AllChargesByLocation = function(location){
			var def = new $.Deferred();
			var postdata ="Location="+location;
			posData.AllChargesPaymentsByLocation(postdata)
			.success(function(data){
				$scope.allchargesGrid = {
					source: {
						localdata: data
					}
				}
				def.resolve();
			})
			return def.promise();
		}
	
		/*
		$("#comboboxLocation").on('change', function(event){
			var args = event.args;
			if(args){           
				var index = args.index;
				var item = args.item;
				var label = item.label;
				var value = item.value;
				var type = args.type;
				
				ApprovedByLocation(value)
				.done(function(){
					DeclinedByLocation(value)
					.done(function(){
						AllChargesByLocation(value);
					})
				})
			}
		})
		*/

		/* Dynamic Plugin Commands */
		$(document).on('click', '.exit', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			temp_open_item = [];
		});

		/*@param string form_name*/
		var populateViewSale = function(form_name, html){
			var def = $.Deferred();
			setTimeout(function(){
				$("#view-sale").append('<div id="receipt-container"></div>');
				$("#receipt-container").html('');
				$("#receipt-container").append(html+
					'<form id="'+form_name+'">'+
						'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
						'<div id="keyboard"></div>'+
					'</form>');
				def.resolve();
			},100);
			return def.promise();
		}

		/*@param string form*/
		var ViewSale = function(form, html){
			var def = $.Deferred();
			populateViewSale(form, html)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "view_receipt",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}

		/*@param string header_text*/
		var WindowViewSale = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#view-sale").jqxWindow({
					height: 800,
					width: '30%',
					isModal: true,
					theme: 'darkblue',
					showCloseButton: true,
					resizable: false,
					draggable: false,
					showAnimationDuration: 0,
                	closeAnimationDuration: 0
				});
				setTimeout(function(){
					$('#view-sale').jqxWindow('setTitle', header_text);
					$('#view-sale').jqxWindow('open');
				},100);
				def.resolve();	
			},100);
			return def.promise();
		}
		

		$("#SaleView").click(function(e){
				e.preventDefault();
				var postdata="ReceiptPaymentUnique="+payment_unique;
				$http({
						method: 'POST',
						data: postdata,
						url: base_url + 'pos/auth-manager/view',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
						ViewSale('view_sale', data.html)
						.then(function(){
								WindowViewSale('Receipt View');
						})
				})
		})


		//--> Printer Check Connection
		var PrinterCheckView = function(Unique){
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

				var def = $.Deferred();
				var postdata ="receipt_header_unique="+Unique;
				posData.PrintCheck(postdata)
				.success(function(data){
						if(data.success == true){
								if(data.print == true){
										def.resolve();
								}else{
									var msg="Printer error, please check <br/>";
											msg+="1. Printer is turned on. <br/>";
											msg+="2. Check printer paper. <br/>";
											msg+="3. Restart printer.";
									NumpadAlertOk('error_print', msg)
									.then(function(){
											WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
									})
								}
							}
							setTimeout($.unblockUI, 100);
				})
				return def.promise();
		};
		//--> End Printer Check Connection

		$(document).on('click', '.print_button', function(e){
			e.preventDefault();
			PrinterCheckView(ReceiptHeaderUnique)
			.then(function(){
					$('#view-sale').jqxWindow('close');
			})
		})


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
					'<div id="signpadbutton"></div>'+
					'<input type="hidden" id="signature_receipt_payment_unique" />'+
					'<input type="hidden" id="signature_unique" />'+
					'<input type="hidden" id="signature_status" />'+
					'<input type="hidden" id="signature_amount" />'+
					'<input type="hidden" id="signature_typePayment" />'+
					'<input type="hidden" id="signature_amountdue" />'+
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

		/*
		var populateNumpadAlertYesNo = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#alert-msg-popup").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
					'<h4>'+msg+'</h4>'+
					'<br/>'+
					'<div id="keyboard_yesno"></div>'+
					'<input type="hidden" id="use_value" />'+
					'<input type="hidden" id="use_value2"/>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		*/

		$(document).on('close','#dialog-numpad-void-q', function(e){
			e.preventDefault();
			$("#dialog-numpad-void-container").html('');
		})
		var populateNumpadVoidYesNo = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-void-q").append('<div id="dialog-numpad-void-container" style="background: #144766; color:#EEE;"></div>');
				$("#dialog-numpad-void-container").html('');
				$("#dialog-numpad-void-container").append(''+
				'<form id="'+form_name+'">'+
					'<h4>'+msg+'</h4>'+
					'<br/>'+
					'<div id="keyboard_yesno"></div>'+
					'<input type="hidden" id="use_value" />'+
					'<input type="hidden" id="use_value2"/>'+
					'<input type="text" id="number_field" class="hdfield" style="display:none;" />'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}

		var NumpadAlertYesNo = function(form, msg, custom){
			var def = $.Deferred();
			populateNumpadVoidYesNo(form, msg, custom)
			.then(function(){
				$('#keyboard_yesno').hdkeyboard({
					layout: "alert_yes_no",
					input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}

		/*Popup Alert Yes or No*/
		var WindowPopupAlertYesNo = function(header_text){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-void-q").jqxWindow({
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
				$('#dialog-numpad-void-q').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-void-q').jqxWindow('open');
				def.resolve();	
			},100);
			return def.promise();
		}

		$("#VoidButton").click(function(e){
			e.preventDefault();
			if(voided == false){
				if(TranType != 'EBT'){
					var msg = 'Removing Payment cannot be reversed without card present.<br/>Receipt#: '+ReceiptNumber+'</br>Total: '+parseFloat(Total).toFixed(2)+'</br></br>Are you sure?';
					NumpadAlertYesNo('void_payment', msg, '')
					.then(function(){
						WindowPopupAlertYesNo('Void Payment')
						.then(function(){
							$(".alert_yes").focus();
						})
					})
				}else{
					var msg = TranType + ' cannot be reversed';
					NumpadAlertOk('adjust_tip_declined', msg)
					.then(function(){
						WindowPopupAlert('Adjust Amount');
					})
				}
			}else{
				var msg = 'Cannot Void when Voided or Declined';
				NumpadAlertOk('adjust_tip_declined', msg)
				.then(function(){
					WindowPopupAlert('Adjust Amount');
				})
				SaleStatus = false;
			}
		})

		$(document).on('submit', '#void_payment', function(e){
			e.preventDefault();
			$("#dialog-numpad-void-q").jqxWindow('close');
			var postdata="ReceiptPaymentUnique="+payment_unique;
				postdata+="&ReceiptHeaderUnique="+ReceiptHeaderUnique;
				postdata+="&PaymentUnique="+ConfigPaymentUnique;
			posData.VoidPayment(postdata)
			.success(function(data){
				if(data.success == true){ 
					//-->Block UI
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

					var postdata="ReceiptPaymentUnique="+payment_unique;
						postdata+="&NewReceiptPaymentUnique="+data.receipt_payment_unique;
						postdata+="&TranType="+TranType;
						postdata+="&ReceiptNumber="+ReceiptNumber;
						postdata+="&ReceiptHeaderUnique="+ReceiptHeaderUnique;	
					posData.VoidCardPayment(postdata)
					.success(function(datacap){
						//-->UnBlock UI
						setTimeout($.unblockUI, 100);

						var msg = datacap.TextResponse;
						NumpadAlertOk('payment_voided', msg)
						.then(function(){
							WindowPopupAlert('Voided')	
						}).done(function(){
							if(datacap.signature){
								NumpadSignature('signature_ok')
								.then(function(){
									WindowPopupSignature('Signature')
									.then(function(){
										$("#signature_receipt_payment_unique").val(data.receipt_payment_unique);
										$("#signature_unique").val(data.payment_unique);
										$("#signature_status").val(datacap.status);
										$("#signature").attr({"src": base_url+"assets/img/signature/"+data.receipt_payment_unique+".png?"+Math.random(), "width":"290", "height":"110"});
									})
								})
							}else if(datacap.CmdStatus == 'Error'){
								$("#VoidButton").attr("disabled", false);	
							}else{
								PrinterCheck(data.payment_unique, data.receipt_payment_unique, datacap.status, ReceiptHeaderUnique)
								.then(function(){
									if(TabSelected == 0){
										// PreAuth();
										$("#preauthGrid").jqxGrid('updatebounddata', 'data');
									}else if(TabSelected == 1){
										// Approved();
										$("#approvedGrid").jqxGrid('updatebounddata', 'data');
									}else if(TabSelected == 4){
										// AllCharges();
										$("#allchargesGrid").jqxGrid('updatebounddata', 'data');
									}
								})
								$("#VoidButton").attr("disabled", true);
							}
						})
					})
				}
			})
		})

		$(document).on('click', '.signature_accept', function(e){
			e.preventDefault();
			var Unique 						= $("#signature_unique").val();
			var SignatureReceiptPaymentUnique = $("#signature_receipt_payment_unique").val();
			var Status 						= $("#signature_status").val();
			var SignatureAmount				= $("#signature_amount").val();
			var TypedAmount					= $("#signature_typePayment").val();
			var AmountDue					= $("#signature_amountdue").val();

			PrinterCheck(Unique, SignatureReceiptPaymentUnique, Status, ReceiptHeaderUnique)
			.then(function(){
					if(TabSelected == 0){
							Approved();
					}else if(TabSelected == 2){
							AllCharges();
					}
			})
			$("#VoidButton").attr("disabled", true);
			var elemPopup = $("#dialog-signature").closest('.jqx-window').attr('id');
			var elemRemove = $("#dialog-signature").closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
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
			var SignatureReceiptPaymentUnique = $("#signature_receipt_payment_unique").val();
			var Status 						= $("#signature_status").val();
			var postdata 					= "ReceiptPaymentUnique="+SignatureReceiptPaymentUnique; 
			posData.ClearSignature(postdata)
			.success(function(data){
				$("#signature_message_view").hide();
				$(".signature_clear").show();
				$(".signature_accept").show();
				$("#signature").attr({"src": base_url+"assets/img/signature/"+data.ReceiptPaymentUnique+".png?"+Math.random(), "width":"290", "height":"110"});
			})
		})

		$scope.RedirectDashboard = function(){
			$window.location.href = base_url + 'pos/cashier';
		}

		$scope.Print = function(){
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
			var postdata ="BatchResult="+JSON.stringify(BatchResultArr);
					postdata+="&BatchProcess="+BatchProcess;
			posData.PrintBatch(postdata)
			.success(function(data){
				if(data.print == false){
						var msg="Printer error, please check <br/>";
								msg+="1. Printer is turned on. <br/>";
								msg+="2. Check printer paper. <br/>";
								msg+="3. Restart printer.";
						NumpadAlertOk('error_print', msg)
						.then(function(){
								WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
						})
				}
				setTimeout($.unblockUI, 100);
			})
		}

		$scope.AlertCancelFinal = function(){
			AlertdialogFinal.close();
		}

		$("#reprint_option").on('close', function(e){
			e.preventDefault();
			$("#reprint_option_container").remove();
		})

		var populateReprintSlip = () => {
			var def = $.Deferred();
			$("#reprint_option").append('<div id="reprint_option_container" style="background: #144766; color:#EEE; overflow: hidden;"></div>');
			$("#reprint_option_container").html('');
			$("#reprint_option_container").append(
				'<div style="width: 100%; overflow: hidden;">'+
					'<button class="btn btn-primary btn-lg print-button" id="print_merchant">MERCHANT ONLY</button>'+
					'<button class="btn btn-info btn-lg print-button" id="print_customer">CUSTOMER ONLY</button>'+
					'<button class="btn btn-success btn-lg print-button" id="print_both">MERCHANT AND CUSTOMER</button>'+
					'<button class="btn btn-danger btn-lg print-button" id="print_close">CLOSE</button>'+
				'</div>'
			);
			setTimeout(function(){
					def.resolve();
			},100);
			return def.promise();
		}

		var WindowReprintSlip = () => {
			var def = $.Deferred();
			$("#reprint_option").jqxWindow({
					height: 260,
					minWidth: 400,
					title: '<button id="print_slip_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;REPRINT SLIP OPTION',
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false,
					resizable: false,
					showAnimationDuration: 0,
					closeAnimationDuration: 0,
					zIndex: 99	
			})

			$("#reprint_option").jqxWindow('open');
			setTimeout(function(){
					def.resolve();
			},100);
			return def.promise();
		}

		$("#ReprintSlip").click(function(){
			var SelRow = $("#ReceiptPaymentUnique").val();
			if(SelRow == ''){
					$("#message").text("Please select receipt first");
					Alertdialog.setTitle('Reprint Slip');
					Alertdialog.open();
			}else{
					populateReprintSlip()
					.then(function(){
						WindowReprintSlip();
					})
			}
		})

		$(document).on('click', '#print_both', function(e){
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
			},  message: 'Printing receipt...',
				baseZ: 99999
			});

			var ReceiptPaymentCardUnique = $("#ReceiptPaymentUnique").val();
			var postdata = "ReceiptPaymentCardUnique="+ReceiptPaymentCardUnique;
			posData.SearchReceiptPaymentCard(postdata)
			.success(function(data){
					PrinterCheck(data.PaymentUnique, data.ReceiptPaymentUnique, data.status, data.ReceiptHeaderUnique);
			})
		})

		$(document).on('click', '#print_merchant', function(e){
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
			},  message: 'Printing receipt...',
					baseZ: 99999
			});
			var ReceiptPaymentCardUnique = $("#ReceiptPaymentUnique").val();
			var postdata ="ReceiptPaymentCardUnique="+ReceiptPaymentCardUnique;
			posData.SearchReceiptPaymentCard(postdata)
			.success(function(data){
					PrinterCheck(data.PaymentUnique, data.ReceiptPaymentUnique, data.status, data.ReceiptHeaderUnique, 1);
			})
		})

		$(document).on('click', '#print_customer', function(e){
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
			},  message: 'Printing receipt...',
					baseZ: 99999
			});
			var ReceiptPaymentCardUnique = $("#ReceiptPaymentUnique").val();
			var postdata ="ReceiptPaymentCardUnique="+ReceiptPaymentCardUnique;
			posData.SearchReceiptPaymentCard(postdata)
			.success(function(data){
					PrinterCheck(data.PaymentUnique, data.ReceiptPaymentUnique, data.status, data.ReceiptHeaderUnique, 2);
			})
		})

		$(document).on('click', '#print_slip_close', function(e){
			e.preventDefault();
			$("#reprint_option").jqxWindow('close');
		})

		$(document).on('click', '#print_close', function(e){
			e.preventDefault();
			$("#reprint_option").jqxWindow('close');
		})

		$("#ClearFilters").on('click', function(e){
			e.preventDefault();
			if(TabSelected == 0){
				$("#preauthGrid").jqxGrid('clearfilters');
			}else if(TabSelected == 1){
				$("#approvedGrid").jqxGrid('clearfilters');
			}else if(TabSelected == 2){
				$("#declinedGrid").jqxGrid('clearfilters');
			}else if(TabSelected == 3){
				$("#zeroauthGrid").jqxGrid('clearfilters');
			}else if(TabSelected == 4){
				$("#allchargesGrid").jqxGrid('clearfilters');
			}else if(TabSelected == 5){
				$("#batchGrid").jqxGrid('clearfilters');
			}
		})

		$("#Refresh").on('click', function(e){
			e.preventDefault();
			window.location.href = base_url + 'pos/pointofsale/auth-manager';
		})

		$("#Assign").on('click', function(e){
			e.preventDefault();
			var selectedItem = $('#auth_manager_tabs').jqxTabs('selectedItem');
			grid = {0 : "preauthGrid", 1 : "approvedGrid", 2 : "declinedGrid", 3 : "zeroauthGrid", 4 : "allchargesGrid", 5 : "batchGrid"};
			var rows = $('#'+grid[selectedItem]).jqxGrid('getrows'); 
			if(rows.length > 0){
				var rowindex = $('#'+grid[selectedItem]).jqxGrid('selectedrowindex'); 
				var rowid = $("#"+grid[selectedItem]).jqxGrid('getrowid', rowindex);
				var rowdata = $('#'+grid[selectedItem]).jqxGrid('getrowdatabyid', rowid);

				var postdata ="FunctionButton=AssignNewUser";
				posData.CheckUserManager(postdata)
				.success(function(data){
					if(data.prompt){
						FunctionButton = 'AssignNewUser';
						NumpadPasscode('assign_receipt_enter_passcode')
						.then(function(){
							WindowPopupPasscode('Assign')
							.then(function(){
								setTimeout(function(){
									$("#number_field").focus();
								},100)
							})
						})
					}else{
						posData.QuickRecallServerCashIn()
						.success(function(data){
							ServerCashInListView('assign_req_receipts', data.html)
							.then(function(){
								WindowServerCashInList('Assign Receipt '+rowdata.Receipt+' from '+rowdata.UserName+' To ');
							})
							$("#dialog-numpad-passcode").jqxWindow('close');
						})
					}
				})
			}else{
				var msg = 'Please select row first';
				NumpadAlertOk('error_assign', msg)
				.then(function(){
					WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
				})
			}
		})

		$(document).on('submit', '#assign_receipt_enter_passcode', function(e){
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
						if(data.can_login){
							var selectedItem = $('#auth_manager_tabs').jqxTabs('selectedItem');
							var rowindex = $('#'+grid[selectedItem]).jqxGrid('selectedrowindex'); 
							var rowid = $("#"+grid[selectedItem]).jqxGrid('getrowid', rowindex);
							var rowdata = $('#'+grid[selectedItem]).jqxGrid('getrowdatabyid', rowid);

							posData.QuickRecallServerCashIn()
							.success(function(data){
								ServerCashInListView('assign_req_receipts', data.html)
								.then(function(){
									WindowServerCashInList('Assign Receipt '+rowdata.Receipt+' '+rowdata.UserName +' To');
								})
								$("#dialog-numpad-passcode").jqxWindow('close');
							})
						}else{
							NumpadAlertOk('not_authorized', data.msg)
							.then(function(){
								WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
							})
							$("#dialog-numpad-passcode").jqxWindow('close');	
						}
					}else{
						NumpadAlertOk('invalid_passcode', data.msg)
						.then(function(){
							WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
						})
						$("#dialog-numpad-passcode").jqxWindow('close');
					}
				})
			}
		})

		$(document).on('click', '#assign_req_receipts .button_proceed', function(e){
			e.preventDefault();
			var ServerId = $('input[type=radio][name=group1]:checked').attr('id');
			var selectedItem = $('#auth_manager_tabs').jqxTabs('selectedItem');
			
			grid = {0 : "preauthGrid", 1 : "approvedGrid", 2 : "declinedGrid", 3 : "zeroauthGrid", 4 : "allchargesGrid", 5 : "batchGrid"};

			if(ServerId){
				if(selectedItem == 2 || selectedItem == 5)
				return;

				var rowindex = $('#'+grid[selectedItem]).jqxGrid('selectedrowindex'); 
				var rowid = $("#"+grid[selectedItem]).jqxGrid('getrowid', rowindex);
				var rowdata = $('#'+grid[selectedItem]).jqxGrid('getrowdatabyid', rowid);
				var postdata ="ReceiptHeaderUnique="+rowdata.ReceiptHeaderUnique;
					postdata+="&UserUnique="+ServerId;
				posData.AuthUpdateReceiptServer(postdata)
				.success(function(data){
					if(data.success){
						switch(selectedItem) {
							case 0:
								PreAuth()
								.done(function(){
									$('body').unblock();
								})
							  	break;
							case 1:
								Approved()
								.done(function(){
									$('body').unblock();
								})
							  	break;
							case 3:
								ZeroAuth()
								.then(function(){
									$('body').unblock();
								})
							  	break;
							case 4:
								AllCharges()
								.done(function(){
									$('body').unblock();
								})
								break;
							default:
							  // code block
						  }

						$("#server_cashin").jqxWindow('close');
					}
				})
			}
		})

		$(document).on('click', '#assign_req_receipts .button_q_cancel', function(e){
			e.preventDefault();
			$("#server_cashin").jqxWindow('close');
		})

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

		var populateSeverCashInList = function(form_name, html){
			var def = $.Deferred();
			setTimeout(function(){
				$("body").append(
					'<div id="server_cashin">'+
						'<div id="server_cashin_container" style="background: #004a73">'+
							html+
							'<form id="'+form_name+'">'+
								'<input type="text" id="text_field" class="hdfield" style="color:#000; display:none;">'+
								'<div id="keyboard_server_cashin"></div>'+
							'</form>'+
						'</div>'+
					'</div>'
				);
				def.resolve();
			},100);
			return def.promise();
		}

		var WindowServerCashInList = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#server_cashin").jqxWindow({
					width: '80%', 
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

				$("#server_cashin").on('close', function(e){	
					e.preventDefault();
					$("#server_cashin").remove();
				})

				def.resolve();	
			},100);
			return def.promise();
		}

		var populateNumpadPasscode = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("body").append(
					'<div id="dialog-numpad-passcode" style="display:none;">'+ 
						'<div id="passcode_numpad" style="background: #144766; color:#EEE;">'+
							'<h4 style="text-align:center;">Enter Passcode</h4>'+
							'<form id="'+form_name+'" autocomplete="off">'+
								'<input type="password" class="hdfield" id="number_field" style="color:#000">'+
								'<div id="keyboard_passcode"></div>'+
							'</form>'+
						'</div>'+
					'</div>'
				);
				
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

		var WindowPopupPasscode = function(header_title){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-passcode").jqxWindow({
					width: 400,
					height: 450,
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

				$("#dialog-numpad-passcode").on('close', function(e){
					e.preventDefault();
					$("#dialog-numpad-passcode").remove();
				})

				def.resolve();	
			},100);
			return def.promise();
		}
		

	}]);
})();