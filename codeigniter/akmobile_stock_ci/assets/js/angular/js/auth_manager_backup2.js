(function() {
    //var base_url = "/app/";
    //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {
		
		var Alertdialog;
		
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
		
		var PrinterCheck = function(Unique, PaymentUnique, status, RHeaderUnique){
			var postdata="PaymentTypeUnique="+Unique;
				postdata+="&responseid="+PaymentUnique;
				postdata+="&payment_status="+status;
				postdata+="&payments_print=2";
				postdata+="&receipt_header_unique="+RHeaderUnique;
			posData.PrinterCheck(postdata)
			.success(function(data){
			  AlertProcessdialog.close();
			  if(data.success == true){
				if(data.print == true){
				  /* do nothing */
				}else{
				  $("#message").html('');
				  var msg="Printer error, please check <br/>";
					  msg+="1. Printer is turned on. <br/>";
					  msg+="2. Check printer paper. <br/>";
					  msg+="3. Restart printer.";
				  $("#message").append("<h4>"+msg+"</h4>");
				  Alertdialog.setTitle("Printer problem");
				  Alertdialog.open();
				}
			  }
			})
		}
		
		var getValue = function(obj, decimal){
			//Seperates the components of the number
			var n= obj.toString().split(".");
			//Comma-fies the first part
			n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			//Combines the two sections
			return n.join(".");
		}
		
		$scope.approvedGrid = {
			width: '99.9%',
			pageable: true,
			pagerMode: 'Advance',
			columnsResize: true,
			showAggregates: true,
			source: {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'string'},
					{ name: 'Authorize', type: 'string'},
					{ name: 'UserName', type: 'string'},
					{ name: 'TranCode', type: 'string'},
				],
				localdata: {}
			},
			columns: [
			  { text: 'Unique', dataField: 'Unique', hidden: true },
			  { text: 'Date', dataField: 'Date', width: '15%', 
			    cellsRenderer: function (row, column, value, rowData) {
				  return '<span style="margin: 4px;">' + $filter('date')(new Date(value), 'MM/dd/yyyy hh:mm') + '</span>';
			    },
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Date</div>';
				}
			  },
			  { text: 'Reference', dataField: 'Reference', width: '15%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Reference</div>';
				}
			  },
			  { text: 'Receipt', dataField: 'Receipt', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Receipt</div>';
				}
			  },
			  { text: 'PayMethod', dataField: 'CardType', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Pay Method</div>';
				}
			  },
			  { text: 'AuthCode', dataField: 'AuthCode', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">AuthCode</div>';
				}
			  },
			  { text: 'Purchase', dataField: 'Purchase', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Purchase</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				 }
			  },
			  { text: 'Authorize', dataField: 'Authorize', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Authorize</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				  }
			  },
			  { text: 'Cashier', dataField: 'UserName', width: '10%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Cashier</div>';
				}
			  },
			  { text: 'Tran Code', dataField: 'TranCode', width: '10%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Tran Code</div>';
				}
			  }
			]
		};
		
		$scope.declinedGrid = {
			width: '99.9%',
			pageable: true,
			pagerMode: 'Advance',
			columnsResize: true,
			showAggregates: true,
			source: {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'string'},
					{ name: 'Authorize', type: 'string'},
					{ name: 'UserName', type: 'string'},
					{ name: 'TranCode', type: 'string'},
				],
				localdata: {}
			},
			columns: [
			  { text: 'Unique', dataField: 'Unique', hidden: true },
			  { text: 'Date', dataField: 'Date', width: '15%', 
			    cellsRenderer: function (row, column, value, rowData) {
				  return '<span style="margin: 4px;">' + $filter('date')(new Date(value), 'MM/dd/yyyy hh:mm') + '</span>';
			    },
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Date</div>';
				}
			  },
			  { text: 'Reference', dataField: 'Reference', width: '15%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Reference</div>';
				}
			  },
			  { text: 'Receipt', dataField: 'Receipt', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Receipt</div>';
				}
			  },
			  { text: 'PayMethod', dataField: 'CardType', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Pay Method</div>';
				}
			  },
			  { text: 'AuthCode', dataField: 'AuthCode', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">AuthCode</div>';
				}
			  },
			  { text: 'Purchase', dataField: 'Purchase', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Purchase</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				 }
			  },
			  { text: 'Authorize', dataField: 'Authorize', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Authorize</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				  }
			  },
			  { text: 'Cashier', dataField: 'UserName', width: '10%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Cashier</div>';
				}
			  },
			  { text: 'Tran Code', dataField: 'TranCode', width: '10%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Tran Code</div>';
				}
			  }
			]
		};
		
		
		$scope.allchargesGrid = {
			width: '99.9%',
			pageable: true,
			pagerMode: 'Advance',
			columnsResize: true,
			showAggregates: false,
			source: {
				dataType: "json",
				dataFields: [
					{ name: 'unique', type: 'int'},
					{ name: 'Date', type: 'string'},
					{ name: 'Reference', type: 'string'},
					{ name: 'Receipt', type: 'string'},
					{ name: 'CardType', type: 'string'},
					{ name: 'AuthStatus', type: 'string'},
					{ name: 'AuthCode', type: 'string'},
					{ name: 'Purchase', type: 'string'},
					{ name: 'Authorize', type: 'string'},
					{ name: 'UserName', type: 'string'},
					{ name: 'TranCode', type: 'string'},
				],
				localdata: {}
			},
			columns: [
			  { text: 'Unique', dataField: 'Unique', hidden: true },
			  { text: 'Date', dataField: 'Date', width: '15%', 
			    cellsRenderer: function (row, column, value, rowData) {
				  return '<span style="margin: 4px;">' + $filter('date')(new Date(value), 'MM/dd/yyyy hh:mm') + '</span>';
			    },
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Date</div>';
				}
			  },
			  { text: 'Reference', dataField: 'Reference', width: '8%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Reference</div>';
				}
			  },
			  { text: 'Receipt', dataField: 'Receipt', width: '8%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Receipt</div>';
				}
			  },
			  { text: 'PayMethod', dataField: 'CardType', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Pay Method</div>';
				}
			  },
			  { text: 'AuthStatus', dataField: 'AuthStatus', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">AuthStatus</div>';
				}
			  },
			  { text: 'AuthCode', dataField: 'AuthCode', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">AuthCode</div>';
				}
			  },
			  { text: 'Purchase', dataField: 'Purchase', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Purchase</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				 }
			  },
			  { text: 'Authorize', dataField: 'Authorize', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Authorize</div>';
				},
				cellsRenderer: function (row, column, value, rowData) {
				  var renderString = '<span style="margin: 4px;">'
				  var amount = parseFloat(0).toFixed(2);
				  if(value){
					 amount =  getValue(parseFloat(value).toFixed(2));
				  }
				  renderString += amount + '</span>';
				  return renderString;
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
						Total = getValue(parseFloat(aggregates.Total).toFixed(2));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				  }
			  },
			  { text: 'Cashier', dataField: 'UserName', width: '9%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Cashier</div>';
				}
			  },
			  { text: 'Tran Code', dataField: 'TranCode', width: '10%', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Tran Code</div>';
				}
			  }
			]
		};
		
		
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
		
		var Approved = function(){
			var def = new $.Deferred();
			posData.ApprovedPayments()
			.success(function(data){
				$scope.approvedGrid = {
					width: '99.9%',
					pageable: true,
					pagerMode: 'Advance',
					columnsResize: true,
					showAggregates: true,
					source: {
						localdata: data.rows
					}
				}
				def.resolve();
			})
			return def.promise();
		}
		
		var Declined = function(){
			var def = new $.Deferred();
			posData.DeclinedPayments()
			.success(function(data){
				$scope.declinedGrid = {
					width: '99.9%',
					pageable: true,
					pagerMode: 'Advance',
					columnsResize: true,
					showAggregates: true,
					source: {
						localdata: data.rows
					}
				}
				def.resolve();
			})
			return def.promise();
		}
		
		var AllCharges = function(){
			var def = new $.Deferred();
			posData.AllChargesPayments()
			.success(function(data){
				$scope.allchargesGrid = {
					width: '99.9%',
					pageable: true,
					pagerMode: 'Advance',
					columnsResize: true,
					showAggregates: false,
					source: {
						localdata: data.rows
					}
				}
				def.resolve();
			})
			return def.promise();
		}
		
		LoadHeaderInfo()
		.then(function(){
			$("#auth_manager_tabs").jqxTabs({theme:'fresh', width: '100%', height: 500 });
			Approved()
			.then(function(){
				Declined()
				.then(function(){
					AllCharges()
					.then(function(){
						
					})
				})
			})
		})
		
		$("#BatchSummary").click(function(){
			$("body").block({message: 'Batch Summary processing...'});
			posData.BatchSummary()
			.success(function(data){
				var newdata = data.result;
				if(data.success == true){
					$("#message").html('');
					$("#message").append(''+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+newdata.MerchantID+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+newdata.BatchNo+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Net Batch Total: '+getValue(parseFloat(newdata.NetBatchTotal).toFixed(2))+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
					'');
				}else{
					$("#message").html('');
					$("#message").append(''+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
					'');
				}
			}).then(function(){
				$("body").unblock();
				Alertdialog.setTitle('Batch Summary');
				Alertdialog.open();
			})
		})
		
		$("#BatchCharges").click(function(){
			$("body").block({message: 'Batch Summary processing...'});
			posData.BatchClose()
			.success(function(data){
				var newdata = data.result;
				var info = data.info;
				if(data.success == true){
					$("#message").html('');
					$("#message").append(''+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+newdata.MerchantID+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+newdata.BatchNo+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Net Batch Total: '+getValue(parseFloat(newdata.NetBatchTotal).toFixed(2))+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
					'');
				}else if(data.success == false && data.message == true){
					$("#message").html('');
					$("#message").append(''+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Merchant ID: '+info.MerchantID+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Batch No.: '+info.BatchNo+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Net Batch Total: '+getValue(parseFloat(info.NetBatchTotal).toFixed(2))+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Status: '+newdata.CmdStatus+'</span></div>'+
					'<div style="float:left; width:100%;"><span style="font-size:16px;">Response: '+newdata.TextResponse+'</span></div>'+
					'');
				}else{
					$("#message").html('');
					$("#message").append('<div style="float:left; width:100%;"><span style="font-size:16px;">Please select Batch Summary first.</span></div>');
				}
			}).then(function(){
				Approved()
				.then(function(){
					Declined()
					.then(function(){
						AllCharges()
						.then(function(){
							$("body").unblock();
							Alertdialog.setTitle('Batch Charges');
							Alertdialog.open();
						})
					})
				})
			})
		})
		
		$scope.AlertCancel = function(){
			Alertdialog.close();
		}
		
		$scope.ApprovedClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			$("#ReceiptPaymentUnique").val(row.unique);
		}
		
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
		
		$("#ReprintSlip").click(function(){
			$('body').block({message: 'Printing receipt'})
			var ReceiptPaymentCardUnique = $("#ReceiptPaymentUnique").val();
			var postdata = "ReceiptPaymentCardUnique="+ReceiptPaymentCardUnique;
			posData.SearchReceiptPaymentCard(postdata)
			.success(function(data){
				PrinterCheck(data.PaymentUnique, data.ReceiptPaymentUnique, data.status, data.ReceiptHeaderUnique);
			}).then(function(){
				$('body').unblock();
			});
		})
		
		
		
	}]);
})();