(function() {
	var GlobalCustomer = 0;
	var GlobalCustomerName = null;
	var newCustomerCreated = null;
	var editCustomerSelected = null;
	
	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', '$compile',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile) {
		var CustomerId = 0;
		var KeyboardInputLimit = $("#KeyboardPopupCharacterLimit").val();
		$("#dialog-numpad-keyboard").on("close", function(e){
			e.preventDefault();
			$("#custom_item_keyboard").html('');
			$("#customer_search_text").val('');
			setTimeout(function(){
				$("#customer_search_text").focus();
			},300);
		})

		/*Popup Keyboard*/
		var populateNumpadKeyboard = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
				$("#custom_item_keyboard").html('');
				$("#custom_item_keyboard").append(''+
					'<h4 style="text-align:center;">'+msg+'</h4>'+
				'');
				$("#custom_item_keyboard").append(''+
				'<form id="'+form_name+'">'+
					'<input type="text" id="search_field" maxlength="'+KeyboardInputLimit+'" style="color:#000;" />'+
					'<div id="search_keyboard"></div>'+
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
		
		var NumpadKeyboard = function(form_name, msg){
			var def = $.Deferred();
			populateNumpadKeyboard(form_name, msg)
			.then(function(){
				$('#search_keyboard').jkeyboard({
				  layout: "english",
				  input: $('#search_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		/*End Keyboard*/

		$("#customer_search_text").click(function(){
			if($("#POSVirtualKeyboard").val() == 1){
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
			}
		})
		
		$(document).on("submit", "#enter_search_customer", function(e){
			e.preventDefault();
			$("#customer_search_text").val($("#search_field").val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
			$("#customer-search").jqxGrid('showloadelement');
			var search = $("#customer_search_text").val();
			Customer_data(search);
			$("#customer_search_text").val('');
		})
		
		/* Get Header information such like;
	    *  Receipt Number, Station Name, Location Name and Cashier Name.
		*/
		var LoadHeaderInfo = function(){
			var def = new $.Deferred(); 
			posData.GetHeaderInfoCustomer()
			.success(function(data){
				$("#receiptn").text(data.receipt_number);
				$("#station").text(data.station_name);
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
		
		var populateAlert = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_alert").html('');
				$("#custom_alert").append(''+
					'<form id="'+form_name+'">'+
						'<h4 id="alert-msg" style="color: #fff;">'+msg+'</h4>'+
						'<br/>'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		/* Modal
		* Alert Popup
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlert = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-alert").jqxWindow({
					height: size[0],
					width: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				//if(move.length > 0)
					//$('#dialog-alert').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-alert').jqxWindow('open');
				}else{
					$('#dialog-alert').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/* Modal
		* New Customer
		@param string title
		@param boolean method
		@param array size
		@param array move
		@param string id
		*/
		var WindowPopupNumpad = function(title, method, size, move, id){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#"+id).jqxWindow({
					height: '100%',//size[0],
					width: '100%',//size[1],
					//title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				$("#"+id).jqxWindow('setTitle', title);
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				//if(move.lenght > 0)
					//$('#'+id).jqxWindow('move', move[0], move[0]);
				
				if(method){
					$('#'+id).jqxWindow('open');
				}else{
					$('#'+id).jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPromptAlertClose = function(msg){
			var def = $.Deferred();
			populateAlert('alert_no_customer_selected', msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			})
			return def.resolve();
		}
		
		$("#dialog-alert").on('close', function(event){
			$("#custom_alert").html('');
		})
		
		$scope.CustomerEditWhen = true;
		
		$scope.CustomerOkWhen = true;
		
		$scope.EditCustomerSaveDisabled = true;
		
		$scope.AddCustomerSaveDisabled = true;
		
		$scope.EditCustomerDefaultButtons = true;
		
		$scope.EditCustomerWhenCloseSaveChanges = false;
		
		$scope.EditCustomerWhenDelete = false;
		
		$scope.EditCustomerWhenClose = '';
		
		$scope.EnableAddCustomerSaveButton = function(){
			$scope.AddCustomerSaveDisabled = false;
			$scope.AddCustomerWhenClose = 1;
		}
		
		$scope.EnabledEditButton = function(){
			$scope.EditCustomerSaveDisabled = false;
			$scope.EditCustomerWhenClose = 1;
		}
		
		
		$scope.thetabsadd = 'darkblue';
		$scope.tabset = {
			selectedItem:0
		};
		$scope.editthetabs = 'darkblue';
		$scope.edittabset = {
			selectedItem:0
		};
		
		var PurchaseHistory = function(){
			var ResoWidth 	        = $("#fakeheight").width();
			var ResoHeight 	        = $("#fakeheight").height();
			var ComputeHeight		= ResoHeight - 200;
			var UseHeight			= ComputeHeight;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);

			var source = {
                dataType: "json",
                dataFields: [
                    { name: 'Unique', type: 'int'},
					{ name: 'TransDate', type: 'date'},
					{ name: 'CreatedDate', type:'date'},
					{ name: 'ReceiptNumber', type: 'string' },
					{ name: 'Description', type: 'string' },
					{ name: 'Quantity', type: 'int' },
					{ name: 'SellPrice', type: 'number' },
					{ name: 'ExtSell', type: 'number' },
					{ name: 'Tax', type: 'number' },
					{ name: 'Total', type: 'number'},
                ],
                id: 'id',
                url: ''
            };
            var dataAdapter = new $.jqx.dataAdapter(source);

			$("#purchase_history").jqxDataTable({
				height: UseHeight,
				altRows: true,
				theme: 'darkblue',
				pageable: true,
				pagerMode: 'advanced',
				columnsResize: true,
				filterable: true,
				sortable: true,
				filterMode: 'simple',
				showAggregates: true,
				source: dataAdapter,
				columns: [
					{ text: 'ID', dataField: 'Unique', hidden: false,width: '60px'},
					{ text: 'Date', dataField: 'TransDate', width: '150px',cellsformat: 'MM/dd/yy hh:mm tt'},
					{ text: 'Receipt', dataField: 'ReceiptNumber', width: '90px' },
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
					{ text: 'Ext Price', dataField: 'ExtSell', width: '100px', align:'right', cellsalign: 'right',cellsFormat: 'd2',
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
					{ text: 'Tax', dataField: 'Tax', width: '70px', align:'right', cellsalign: 'right',cellsFormat: 'd2',
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
					
					{ text: 'Total', dataField: 'Total', width: '100px', align:'right', cellsalign: 'right', cellsFormat: 'd2',
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
			
			/*
			$scope.purchase_history = {
				//width: "100%",
				height: UseHeight,
				width: '100%',
				altRows: true,
				theme: 'darkblue',
				pageable: true,
				pagerMode: 'advanced',
				columnsResize: true,
				filterable: true,
				sortable: true,
				filterMode: 'simple',
				showAggregates: true,
				source:  {
					dataType: "json",
					dataFields: [
						{ name: 'Unique', type: 'int'},
						{ name: 'TransDate', type: 'date'},
						{ name: 'CreatedDate', type:'date'},
						{ name: 'ReceiptNumber', type: 'string' },
						{ name: 'Description', type: 'string' },
						{ name: 'Quantity', type: 'int' },
						{ name: 'SellPrice', type: 'number' },
						{ name: 'ExtSell', type: 'number' },
						{ name: 'Tax', type: 'number' },
						{ name: 'Total', type: 'number'},
					],
					localdata: {}
				},
				columns: [
					{ text: 'ID', dataField: 'Unique', hidden: false,width: '60px'},
					{ text: 'Date', dataField: 'TransDate', width: '150px',cellsformat: 'MM/dd/yy hh:mm tt'},
					{ text: 'Receipt', dataField: 'ReceiptNumber', width: '90px' },
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
					{ text: 'Ext Price', dataField: 'ExtSell', width: '100px', align:'right', cellsalign: 'right',cellsFormat: 'd2',
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
					{ text: 'Tax', dataField: 'Tax', width: '70px', align:'right', cellsalign: 'right',cellsFormat: 'd2',
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
					
					{ text: 'Total', dataField: 'Total', width: '100px', align:'right', cellsalign: 'right', cellsFormat: 'd2',
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
			*/
		}
		var gridcolumns = [];
		var gridtypes = '';
		var PrepareGrid = function(){
			posData.CustomerGridPrepare()
			.success(function(data){
				$.each(data.gridcols, function(index, value){
					if(value.aggregates == 1){
						gridcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
						gridcolumns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align})
					}
				})
				Customer_grid(data.gridtype);
			})
		}
		var GridRowHeight = 40;
		var Customer_grid = function(types){
			var ResoWidth 	        = $("#fakeheight").width();
			var ResoHeight 	        = $("#fakeheight").height();
			var ComputeHeight		= ResoHeight - 70;
			var CustomerSearch 		= ComputeHeight - 40;
			var UseHeight			= CustomerSearch;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			var def = $.Deferred();
			var source = {
				dataType: "json",
				dataFields: types,
				localdata: {}
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#customer-search").jqxGrid({
				width: "100%",
				height: UseHeight,
				pagesize: ComputeDisplayRow,
				altRows: true,
				theme: 'darkblue',
				pageable: false,
				pagerMode: 'advanced',
				sortable: true,
				columnsResize: true,
				showfilterrow: true,
				filterable: true,
				source: dataAdapter,
				rowsheight: GridRowHeight,
				columns: [
					{ text: 'ID', dataField: 'Unique', width: '5%'},
				]
			});
			$("#customer-search").jqxGrid({ columns: gridcolumns });
		
			setTimeout(function(){
				$("#customer_search_text").focus();
				def.resolve();
			},1000);
			return def.promise();
		}

		var Customer_data = function(search){
			var ResoWidth 	        = $("#fakeheight").width();
			var ResoHeight 	        = $("#fakeheight").height();
			var ComputeHeight		= ResoHeight - 70;
			var CustomerSearch 		= ComputeHeight - 40;
			var UseHeight			= CustomerSearch;
			var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
			var def = $.Deferred();
			var postdata ="Search="+search;
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
					height: UseHeight,
					pagesize: ComputeDisplayRow,
					source: dataAdapter,
					rowsheight: GridRowHeight
				});

			}).then(function(){
				setTimeout(function(){
					$("#customer_search_text").focus();
				},1000);
				def.resolve();
			})
			return def.promise();
		}

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
					$("#customer_search_text").focus();
				},1000);
				def.resolve();
			})
			return def.promise();
		}

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
					$("#customer_search_text").focus();
				},1000);
				def.resolve();
			})
			return def.promise();
		}
		
		$('#customer-search').on('rowclick', function (event) {
		   // event.args.rowindex is a bound index.
			var row = event.args.rowindex;
			var datafield = event.args.datafield;
			var datarow = $("#customer-search").jqxGrid('getrowdata', row);
			
			GlobalCustomer = datarow.Unique;
			GlobalCustomerName = datarow.FirstName + " " + datarow.LastName;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
			$scope.$apply();
		});
		
		$('#customer-search').on('rowdoubleclick', function (event) {
		   // event.args.rowindex is a bound index.
			var row = event.args.rowindex;
			var datafield = event.args.datafield;
			var datarow = $("#customer-search").jqxGrid('getrowdata', row);
			
			GlobalCustomer = datarow.Unique;
			GlobalCustomerName = datarow.FirstName + " " + datarow.LastName;
			
			posData.InstantNewSaleCustomer()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = datarow.NewSaleId;	
				}
			 }).then(function(){
			 	var postData="selcustomervalue="+datarow.Unique;;
				postData+="&selcustomerlabel="+datarow.FirstName + " " + datarow.LastName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer()
					.then(function(){
						$window.location = base_url + "pos/pointofsale";
					})
				})
			});
		});

		var LoadEditCustomer = function(){
			$scope.customerid = GlobalCustomer
			CustomerPurchases(GlobalCustomer)
			.then(function(){
				var postData ="CustomerUnique="+GlobalCustomer;
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
					$scope.editZipcode = data.zip;
					$scope.editCity = data.city;
					$scope.editState = data.state;
					$scope.editCounty = data.county;
					$scope.editcountry = data.country;
					$scope.customer_account_status = data.AccountStatus;
					$scope.customer_credit_limit = data.CreditLimit;
				
					setTimeout(function(){
						$("#editFirstName").focus();
						$("#EditBtnUpdate").attr("disabled", true);
						$scope.EditCustomerWhenClose = 0;
						WindowPopupNumpad('Edit Customer ' + $scope.customerid + " | " + data.fname+ " " + data.lname, true, [900, '100%'], [], 'edit-customer');
					})
				})
			})
		}
		
		/* Load varibles */
		PurchaseHistory()
		LoadHeaderInfo()
		.then(function(){
			PrepareGrid();
			GetSelectedCustomer()
			.then(function(){
				if(GlobalCustomer > 0){
					LoadEditCustomer();
				}
			})
		})
		
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
			$scope.State = '';
			$scope.Zipcode = '';
			$scope.City = '';
			$scope.County = '';
			$scope.Country = '';
			$scope.add_customer_account_status = 'Active';
			$scope.add_customer_credit_limit = '';
			$scope.AccountNo = '';
			$scope.AddCustomerSaveDisabled = true;
			/*
			$scope.newcustomer = {
				message: ''
			}
			*/

		};
		
		//-->Get Selected Customer
		var GetSelectedCustomer = function(){
			var def = new $.Deferred();
			posData.SelectCustomer()
			.success(function(data){
				 var CustomerId = data.CustomerId;
				 if(CustomerId){
					$scope.customer = {
						selected: data.CustomerFirstName + ' ' + data.CustomerLastName,
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
		
		$scope.searchCustomerRowClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
		}
		
		$scope.searchCustomerRowDoubleClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			
			posData.InstantNewSale()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;	
				}
			 }).then(function(){
			 	var postData="selcustomervalue="+row.Unique;;
				postData+="&selcustomerlabel="+row.FirstName + " " + row.LastName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer()
					.then(function(){
						$window.location = base_url + "pos/pointofsale";
					})
				})
			 });
		}
		
		$scope.SelectCustomer = function(){
			var postData="selcustomervalue="+GlobalCustomer;
			postData+="&selcustomerlabel="+GlobalCustomerName;
			posData.TransCustomer(postData)
			.success(function(data){
				GetSelectedCustomer();
				$scope.CustomerOkWhen = true;
				$scope.CustomerEditWhen = true;
				$("#customer-search").jqxDataTable('clearFilters');
				$window.location = base_url + "pos/pointofsale";
			})
		}
		
		$scope.CustomerFormClose = function(){
			$scope.CustomerOkWhen = true;
			$scope.CustomerEditWhen = true;
			GlobalCustomer = null;
			$("#customer-search").jqxDataTable('clearFilters');
			$window.location = base_url + 'pos/pointofsale';
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
				var source = {
                	dataType: "json",
					localdata: data
				};
				var dataAdapter = new $.jqx.dataAdapter(source);

				$("#purchase_history").jqxDataTable({
					source: dataAdapter
				})
				/*
				$scope.purchase_history = {
					source: {
						localdata: data
					}
				}
				*/
				def.resolve();
			})
			return def.resolve();
		}
		
		$scope.NewCustomer = function(){
			$("#customer-search").jqxDataTable('clearFilters');
			$scope.primary_buttons = true;
			$scope.secondary_buttons = false;

			WindowPopupNumpad('New Customer', true, [900, '100%'], [], 'add-customer')
			.then(function(){
				setTimeout(function(){

					//$("#firstname").focus();
					var ResoWidth 			= $("#add-customer").width();
					var ResoHeight 			= $("#add-customer").height();
					var SearchBtn 			= $(".jqx-tabs-header").height();
					var ComputeHeight		= ResoHeight - 60;
					var UseHeight			= ComputeHeight - SearchBtn;
					var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
					
					$('#add-tabs').jqxTabs({height:UseHeight});
					
					$(".addcustomer").each(function(){
						if($(this).attr("autofocus")){
							$(this).focus();
						}
					})

				},100);
			});
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
		
		$scope.FirstName = '';
		$scope.LastName = '' ;
		$scope.Company = '';
		$scope.Address1 = '';
		$scope.Address2 = '';
		$scope.Phone1 = '';
		$scope.Phone2 = '' ;
		$scope.Phone3 = '';
		$scope.Email = '';
		$scope.Fax = '';
		$scope.Website = '';
		$scope.Custom1 = '';
		$scope.Custom2 = '';
		$scope.Custom3 = '';
		$scope.CustomerNote = '';
		$scope.Zipcode = '';
		$scope.City = '';
		$scope.State = '';
		$scope.County = '';
		$scope.Country = '';
		$scope.add_customer_account_status = 'Active';
		$scope.add_customer_credit_limit = '';
		$scope.AccountNo = '';
		var selcustomer;
		
		/* Add New Customer */
		$scope.NewCustomerSave = function(){
			var required_count = 0;
			/*
			var $this = $("#add_save"); 
			$this.attr({"disabled": true});
			setTimeout(function(){
				$this.attr({"disabled": false});
			},100);
			*/
			var postData="fname="+ $scope.FirstName;
				postData+="&lname="+ $scope.LastName;
				postData+="&company="+ $scope.Company;
				postData+="&address1="+ $scope.Address1;
				postData+="&address2="+ $scope.Address2;
				postData+="&phone1="+ $scope.Phone1;
				postData+="&phone2="+ $scope.Phone2;
				postData+="&phone3="+ $scope.Phone3;
				postData+="&fax="+ $scope.Fax;
				postData+="&email="+ $scope.Email;
				postData+="&website="+ $scope.Website;
				postData+="&custom1="+ $scope.Custom1;
				postData+="&custom2="+ $scope.Custom2;
				postData+="&custom3="+ $scope.Custom3;
				postData+="&customnote="+ $scope.CustomerNote;
				postData+="&zipcode="+ $scope.Zipcode;
				postData+="&city="+ $scope.City;
				postData+="&state="+ $scope.State;
				postData+="&county="+ $scope.County;
				postData+="&country="+ $scope.Country;
				postData+="&AccountStatus="+$scope.add_customer_account_status;
				postData+="&CreditLimit="+$scope.add_customer_credit_limit;
				postData+="&AccountNo="+$scope.AccountNo;
			
			$(".addcustomer").each(function(){
				var required  = $(this).prop("required");
				if(required){
					if($(this).val() == ''){
						$(this).css({border: '1px solid #ff0000'});
						required_count++;
					}else{
						$(this).css({border: '1px solid #ccc'});
					}
					/*
					$scope.newcustomer = {
						message: 'First Name is required field.'
					}
					*/
				}
			
			});	

			if(required_count > 0){
				
			}else{
				
				if($scope.Email != ''){
					if(check_email($scope.Email)){
						posData.SaveNewCustomer(postData)
						.success(function(data){
							$("#add-customer").jqxWindow('close');
							if(data.success == true){
								newCustomerCreated = data.newcustomerId;
								Customer_created_reload(newCustomerCreated);
							}
						}).then(function(){
							$('#addtab1').unblock();
							ClearCustomerForm();
						})
						/*
						$scope.newcustomer = {
							message: ''
						}
						*/			
					}else{
						/*
						$scope.newcustomer = {
							message: 'Please type a valid email address.'
						}
						*/
						var msg = "Please type a valid email address.";
						NumpadPromptAlertClose(msg)
						.then(function(){
							WindowPopupAlert('Alert', true, [220, 300], []);
						})
					}
				}else{
					posData.SaveNewCustomer(postData)
					.success(function(data){
						$("#add-customer").jqxWindow('close');
						if(data.success = true){
							newCustomerCreated = data.newcustomerId;
							Customer_created_reload(newCustomerCreated);
							ClearCustomerForm();
						}
					}).then(function(){
						$('#addtab1').unblock();
						$scope.AddCustomerWhenClose = '';
						/*
						$scope.newcustomer = {
							message: ''
						}
						*/
					})
				}
			
			}
		};
		
		$scope.ExitNewCustomerNo = function(){
			$('#addtab1').unblock();
			//$('#addtab2').unblock();
			//$('#addtab3').unblock();
			$scope.AddCustomerWhenClose = '';
			ClearCustomerForm();
			$("#add-customer").jqxWindow('close');
		};
		
		$scope.CancelNewCustomerNo = function(){
			$scope.primary_buttons = true;
			$scope.secondary_buttons = false;
			$('#addtab1').unblock();
			//$('#addtab2').unblock();
			//$('#addtab3').unblock();
			$("#firstname").focus();
		}
		
		
		/* Exit Add Customer Form */
		$scope.ExitNewCustomer = function(){
			var addButtonSave = $("#add_save").attr("disabled");
			if(addButtonSave){
				$("#add-customer").jqxWindow('close');
			}else{
				//$('#addtab1').block({message: null});
				//$('#addtab2').block({message: null});
				//$('#addtab3').block({message: null});
				$scope.primary_buttons = false;
				$scope.secondary_buttons = true;
			}
		}

		$("#customer_account_status").on("change",function(){
			var Selval = $(this).val();
			$("#EditBtnUpdate").attr("disabled", false);
		})

		$('#customer_credit_limit').on('valueChanged', function (event){
			var value = event.args.value;
			var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
			$("#EditBtnUpdate").attr("disabled", false);
		});

		/* Edit Customer */
		$scope.EditCustomer = function(){
			var result = GlobalCustomer;
			if(result == null) {
				var msg = "Please select customer first.";
				NumpadPromptAlertClose(msg)
				.then(function(){
					WindowPopupAlert('Alert', true, [220, 300], []);
				})
			}else{
				$scope.customerid = result;
				CustomerPurchases($scope.customerid)
				.then(function(){
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
						$scope.editZipcode = data.zip;
						$scope.editCity = data.city;
						$scope.editState = data.state;
						$scope.editCounty = data.county;
						$scope.editCountry = data.country;
						$scope.customer_account_status = data.AccountStatus;
						$scope.customer_credit_limit = data.CreditLimit;
						$scope.editAccountNo = data.AccountNumber;
					
						setTimeout(function(){
							$("#editFirstName").focus();
							$("#EditBtnUpdate").attr("disabled", true);
							$scope.EditCustomerWhenClose = 0;
							WindowPopupNumpad('Edit Customer ' + $scope.customerid + " | " + data.fname+ " " + data.lname, true, [900, '100%'], [], 'edit-customer')
							.then(function(){
								setTimeout(function(){
									//$("#editfirstname").focus();

									var ResoWidth 	= $("#add-customer").width();
									var ResoHeight 	= $("#add-customer").height();
									var SearchBtn 	= $(".jqx-tabs-header").height();
									var ComputeHeight		= ResoHeight - 80;
									var UseHeight			= ComputeHeight - SearchBtn;
									var ComputeDisplayRow 	= Math.ceil(ComputeHeight / 30);
									
									$('#editTabs').jqxTabs({height:UseHeight});

									$(".editcustomer").each(function(){
										if($(this).attr("autofocus")){
											$(this).focus();
										}
									})

								},100);
							})
						})
					})
				})
			}
		};
		
		$(document).on('click', '.alert_close', function(){
			$("#dialog-alert").jqxWindow('close');
		})
		
		$scope.editFirstName = '';
		$scope.editLastName = '' ;
		$scope.editCompany = '';
		$scope.editAddress1 = '';
		$scope.editAddress2 = '';
		$scope.editPhone1 = '';
		$scope.editPhone2 = '' ;
		$scope.editPhone3 = '';
		$scope.editEmail = '';
		$scope.editFax = '';
		$scope.editWebsite = '';
		$scope.editCustom1 = '';
		$scope.editCustom2 = '';
		$scope.editCustom3 = '';
		$scope.editCustomerNote = '';
		$scope.editZipcode = '';
		$scope.editCity = '';
		$scope.editState = '';
		$scope.editCounty = '';
		$scope.editCountry = '';
		$scope.customer_credit_limit = null;
		$scope.customer_account_status = 'Active';
		$scope.editAccountNo = '';
		
		/* Edit Save Customer */
		$scope.editCustomerSave = function(){
			var required_count = 0;
			var $this = $("#EditBtnUpdate"); 
			$this.attr({"disabled": true});
			setTimeout(function(){
				$this.attr({"disabled": false});
			},1000);
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
				postData+="&zipcode="+$scope.editZipcode;
				postData+="&city="+$scope.editCity;
				postData+="&state="+$scope.editState;
				postData+="&county="+$scope.editCounty;
				postData+="&country="+$scope.editCountry;
				postData+="&AccountStatus="+$scope.customer_account_status;
				postData+="&CreditLimit="+$scope.customer_credit_limit;
				postData+="&AccountNumber="+$scope.editAccountNo;
			
			
			$(".editcustomer").each(function(){
				var required  = $(this).prop("required");
				if(required){
					if($(this).val() == ''){
						$(this).css({border: '1px solid #ff0000'});
						required_count++;
					}else{
						$(this).css({border: '1px solid #ccc'});
					}
					/*
					$scope.newcustomer = {
						message: 'First Name is required field.'
					}
					*/
				}
			
			});	

			if(required_count > 0){
				
			}else{
				if($scope.editEmail != ''){
					if(check_email($scope.editEmail)){
						posData.EditCustomerProfileSave(postData)
						.success(function(data){
							if(data.success == true){
								editCustomerSelected = data.selectedcustomer;
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
							//$('#tab3').unblock();
							
							$('#edit-customer').jqxWindow('close');
							
							GetSelectedCustomer();
							$scope.editcustomer = {
								message: ''
							}
							//Customer_data();
							Customer_data_reload();
						})
					}else{
						var msg = "Please type a valid email address.";
						NumpadPromptAlertClose(msg)
						.then(function(){
							WindowPopupAlert('Alert', true, [220, 300], []);
						})
						/*
						$scope.editcustomer = {
							message: 'Please type a valid email address.'
						}
						*/
					}
				}else{
					posData.EditCustomerProfileSave(postData)
					.success(function(data){
						//do nothing
					}).then(function(){
						$scope.editcustomer = {
							message: ''
						}
						$scope.EditCustomerSaveDisabled = true;
						$scope.EditCustomerDefaultButtons = true;
						$scope.EditCustomerWhenCloseSaveChanges = false;
						$scope.EditCustomerWhenDelete = false;
						$scope.EditCustomerWhenClose = '';
						$('#editTabs').jqxTabs({ selectedItem: 0 });
						$('#tab1').unblock();
						$('#tab2').unblock();
						//$('#tab3').unblock();
						$('#edit-customer').jqxWindow('close');
						GetSelectedCustomer();
						$scope.editcustomer = {
							message: ''
						}
						//Customer_data();
						Customer_data_reload();
					})
				}
			}

			/*
			if($scope.editFirstName != ''){
				if($scope.editEmail != ''){
					if(check_email($scope.editEmail)){
						posData.EditCustomerProfileSave(postData)
						.success(function(data){
							if(data.success == true){
								editCustomerSelected = data.selectedcustomer;
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
							//$('#tab3').unblock();
							
							$('#edit-customer').jqxWindow('close');
							
							GetSelectedCustomer();
							$scope.editcustomer = {
								message: ''
							}
							//Customer_data();
							Customer_data_reload();
						})
					}else{
						$scope.editcustomer = {
							message: 'Please type a valid email address.'
						}
					}
				}else{
					posData.EditCustomerProfileSave(postData)
					.success(function(data){
						//do nothing
					}).then(function(){
						$scope.editcustomer = {
							message: ''
						}
						$scope.EditCustomerSaveDisabled = true;
						$scope.EditCustomerDefaultButtons = true;
						$scope.EditCustomerWhenCloseSaveChanges = false;
						$scope.EditCustomerWhenDelete = false;
						$scope.EditCustomerWhenClose = '';
						$('#editTabs').jqxTabs({ selectedItem: 0 });
						$('#tab1').unblock();
						$('#tab2').unblock();
						//$('#tab3').unblock();
						$('#edit-customer').jqxWindow('close');
						GetSelectedCustomer();
						$scope.editcustomer = {
							message: ''
						}
						//Customer_data();
						Customer_data_reload();
					})
				}
			}else{
				$scope.editcustomer = {
					message: 'First Name is required field.'
				}
			}
			*/
		};
		
		$scope.editExitCustomer = function(){
			if($scope.EditCustomerWhenClose){
				$scope.EditCustomerDefaultButtons = false;
				$scope.EditCustomerWhenCloseSaveChanges = true;
				$scope.EditCustomerWhenDelete = false;
				//$('#tab1').block({message: null});
				//$('#tab2').block({message: null});
				//$('#tab3').block({message: null});
			}else{
				$('#editTabs').jqxTabs({ selectedItem: 0 }); 
				$("#edit-customer").jqxWindow("close");
			}
		};
		
		$scope.editExitCustomerNoApplyChanges = function(){
			$scope.EditCustomerSaveDisabled = true;
			$scope.EditCustomerDefaultButtons = true;
			$scope.EditCustomerWhenCloseSaveChanges = false;
			$scope.EditCustomerWhenDelete = false;
			$scope.EditCustomerWhenClose = '';
			$('#editTabs').jqxTabs({ selectedItem: 0 });
			$('#tab1').unblock();
			$('#tab2').unblock();
			//$('#tab3').unblock();
			$("#edit-customer").jqxWindow("close");
		}
		
		$scope.EditConfirmSaveCancel = function(){
			$scope.EditCustomerSaveDisabled = false;
			$scope.EditCustomerDefaultButtons = true;
			$scope.EditCustomerWhenCloseSaveChanges = false;
			$scope.EditCustomerWhenDelete = false;
			$('#editTabs').jqxTabs({ selectedItem: 0 });
			$('#tab1').unblock();
			$('#tab2').unblock();
			//$('#tab3').unblock();
		} 
		
		$scope.editDeleteCustomer = function(){
			var customerid = $scope.customerid;
			var postData="customerid="+customerid;
			posData.DeleteCustomer(postData)
			.success(function(data){
				if(data.success == true){
					//Customer_data();
					Customer_data_reload();
					$("#edit-customer").jqxWindow("close");
				}
			})
		};

		$("#customer_search_form").submit(function(){
			var search = $("#customer_search_text").val();
			Customer_data(search);
			$("#customer_search_text").val('');
		})
		
	}])
})();