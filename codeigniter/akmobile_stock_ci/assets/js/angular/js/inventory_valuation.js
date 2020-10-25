(function() {
    //var base_url = "/app/";
    //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {
		
		var location_label = '';
		
		$("#searchButton").jqxButton({ template: "primary" });
		$("#exportButton").jqxButton({ template: "warning" });
		$("#downloadButton").jqxButton({ template: "success"});
		$("#dateInput").jqxDateTimeInput({formatString: 'MM/dd/yyyy', width: 120, height: 25});
		
		$scope.gridSettingPreLoad = true;
		$scope.gridSettingOnSearch = false;
		
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
		
		var sortByKey = function(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		
		var LoadStore = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: api_url+'stores'
			}).success(function(storedata){
				var MainDataSource = storedata;
				var AllLocArray = {Unique: '0', LocationName: 'All Location'};
				MainDataSource.push(AllLocArray);
				$("#comboboxStore").jqxComboBox({source: sortByKey(MainDataSource, "Unique"), placeHolder: "Select Store", displayMember: "LocationName", valueMember: "Unique",  height: 25, width: 120 });
				$('#comboboxStore').on('change', function (event){
						var args = event.args;
						if (args) {
						// index represents the item's index.                          
						var index = args.index;
						var item = args.item;
						// get item's label and value.
						var label = item.label;
						var value = item.value;
						var type = args.type; // keyboard, mouse or null depending on how the item was selected.
						location_label = item.label;
					}
				}); 
				def.resolve();
			}).then(function(){
				$("#comboboxStore").jqxComboBox('selectItem', $("#store").val());
			})
			return def.promise();
		};
		
		var getValue = function(obj, decimal){
			//Seperates the components of the number
			var n= obj.toString().split(".");
			//Comma-fies the first part
			n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			//Combines the two sections
			return n.join(".");
		}
		
		/*GridSettings1*/
		$scope.gridSettings1 = {
			width: '100%',
			height: 550,
			pageable: true,
			pagerButtonsCount: 5,
			pageSize: 12,
			showAggregates: true,
			columnsResize: true,
			sortable: true,
			filterable: true,
			filterMode: 'simple',
			source: {
				dataType: "json",
				dataFields: [
					{ name: 'Unique', type: 'int' },
					{ name: 'Description', type: 'string' },
					{ name: 'Item', type: 'string'},
					{ name: 'Part', type: 'string'},
					{ name: 'Category', type: 'string' },
					{ name: 'SubCategory', type: 'string' },
					{ name: 'Supplier', type: 'string' },
					{ name: 'LocationName', type: 'string'},
					{ name: 'StockLevel', type: 'number'},
					{ name: 'Cost', type: 'number'},
					{ name: 'ExtendedCost', type: 'number'}
				],
				localdata: {}
			},
			columns: [
			  { text: 'Unique', dataField: 'Unique', hidden: true },
			  { text: 'Description', dataField: 'Description', width: '20%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Description</div>';
				}
			  },
			  { text: 'Item', dataField: 'Item', width: '7%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Item</div>';
				}
			  },
			  { text: 'Barcode', dataField: 'Part', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Barcode</div>';
				}
			  },
			  { text: 'Category', dataField: 'Category', width: '7%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Category</div>';
				}	
			  },
			  { text: 'Sub Cat.', dataField: 'SubCategory', width: '8%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Sub Cat.</div>';
				}
			  },
			  { text: 'Supplier', dataField: 'Supplier', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Supplier</div>';
				}
			  },
			  { text: 'Location', dataField: 'LocationName', width: '9%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Location</div>';
				}
			  },
			  { text: 'Stock Level', dataField: 'StockLevel', width: '9%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Stock Level</div>';
				},
			  	cellsRenderer: function (row, column, value, rowData) {
				  return '<span style="margin: 4px;">' + getValue(parseFloat(value).toFixed($("#DecimalsQuantity").val())) + '</span>';
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
					  var Total = parseFloat(0).toFixed($("#DecimalsQuantity").val());
					  if(aggregates.Total){
						Total = getValue(parseFloat(aggregates.Total).toFixed($("#DecimalsQuantity").val()));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				 }
			  },
			  { text: 'Cost', dataField: 'Cost', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Cost</div>';
				}, 
			  	cellsRenderer: function (row, column, value, rowData) {
				  var Cost = parseFloat(value).toFixed($("#DecimalsCost").val());	
				  return '<span style="margin: 4px;">' + getValue(Cost, $("#DecimalsCost").val()) + '</span>';
			    }
			  },
			  { text: 'Ext. Cost', dataField: 'ExtendedCost', width: '10%', align: 'right', cellsAlign: 'right',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;" align="right">Ext. Cost</div>';
				},
			  	cellsRenderer: function (row, column, value, rowData) {
				  return '<span style="margin: 4px;">' + getValue(parseFloat(value).toFixed($("#DecimalsCost").val())) + '</span>';
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
					  var Total = parseFloat(0).toFixed($("#DecimalsCost").val());
					  if(aggregates.Total){
					  	Total = getValue(parseFloat(aggregates.Total).toFixed($("#DecimalsCost").val()));
					  }
					  renderString += Total + "</div>";
					  return renderString;
				 }
			  }
		  ]
		};
		/*End GridSettings1*/
		
		/*GridSettings2*/
			$scope.gridSettings2 = {
				width: '100%',
				height: 550,
				pageable: true,
				pagerButtonsCount: 5,
				pageSize: 12,
				showAggregates: true,
				columnsResize: true,
				sortable: true,
				filterable: true,
				filterMode: 'simple',
				source: {
					dataType: "json",
					dataFields: [
						{ name: 'Unique', type: 'int' },
						{ name: 'Description', type: 'string' },
						{ name: 'Item', type: 'string'},
						{ name: 'Part', type: 'string'},
						{ name: 'Category', type: 'string' },
						{ name: 'SubCategory', type: 'string' },
						{ name: 'Supplier', type: 'string' },
						{ name: 'LocationName', type: 'string'},
						{ name: 'StockLevel', type: 'int'},
						{ name: 'Cost', type: 'number'},
						{ name: 'ExtendedCost', type: 'number'}
					],
					localdata: {}
				},
				columns: [
				  { text: 'Unique', dataField: 'Unique', hidden: true },
				  { text: 'Description', dataField: 'Description', width: '20%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Description</div>';
					}
				  },
				  { text: 'Item', dataField: 'Item', width: '7%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Item</div>';
					}
				  },
				  { text: 'Barcode', dataField: 'Part', width: '10%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Barcode</div>';
					}
				  },
				  { text: 'Category', dataField: 'Category', width: '7%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Category</div>';
					}	
				  },
				  { text: 'Sub Cat.', dataField: 'SubCategory', width: '8%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Sub Cat.</div>';
					}
				  },
				  { text: 'Supplier', dataField: 'Supplier', width: '10%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Supplier</div>';
					}
				  },
				  { text: 'Location', dataField: 'LocationName', width: '9%',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;">Location</div>';
					}
				  },
				  { text: 'Stock Level', dataField: 'StockLevel', width: '9%', align: 'right', cellsAlign: 'right',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;" align="right">Stock Level</div>';
					},
					cellsRenderer: function (row, column, value, rowData) {
					  return '<span style="margin: 4px;">' + getValue(parseFloat(value).toFixed($("#DecimalsQuantity").val())) + '</span>';
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
						  var Total = parseFloat(0).toFixed($("#DecimalsQuantity").val());
						  if(aggregates.Total){
							Total = getValue(parseFloat(aggregates.Total).toFixed($("#DecimalsQuantity").val()));
						  }
						  renderString += Total + "</div>";
						  return renderString;
					 }
				  },
				  { text: 'Cost', dataField: 'Cost', width: '10%', align: 'right', cellsAlign: 'right',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;" align="right">Cost</div>';
					}, 
					cellsRenderer: function (row, column, value, rowData) {
					  var Cost = parseFloat(value).toFixed($("#DecimalsCost").val());	
					  return '<span style="margin: 4px;">' + getValue(Cost, $("#DecimalsCost").val()) + '</span>';
					}
				  },
				  { text: 'Ext. Cost', dataField: 'ExtendedCost', width: '10%', align: 'right', cellsAlign: 'right',
					renderer: function(row, column, value){
						return '<div style="font-weight:bold;" align="right">Ext. Cost</div>';
					},
					cellsRenderer: function (row, column, value, rowData) {
					  return '<span style="margin: 4px;">' + getValue(parseFloat(value).toFixed($("#DecimalsCost").val())) + '</span>';
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
						  var Total = parseFloat(0).toFixed($("#DecimalsCost").val());
						  if(aggregates.Total){
							Total = getValue(parseFloat(aggregates.Total).toFixed($("#DecimalsCost").val()));
						  }
						  renderString += Total + "</div>";
						  return renderString;
					  }
				  }
			  ]
			};
		/*End GridSettings2*/
		
		var Inventory_preload_data = function(){
			var location = $("#store").val();
			var daterange = $("#curdate").val();
			posData.InventoryData(location, daterange)
			.success(function(data){
				$scope.gridSettings1 = {
					source: {
						dataType: "json",
						dataFields: [
							{ name: 'Unique', type: 'int' },
							{ name: 'Description', type: 'string' },
							{ name: 'Item', type: 'string'},
							{ name: 'Part', type: 'string'},
							{ name: 'Category', type: 'string' },
							{ name: 'SubCategory', type: 'string' },
							{ name: 'Supplier', type: 'string' },
							{ name: 'StockLevel', type: 'int'},
							{ name: 'LocationName', type: 'string'},
							{ name: 'Cost', type: 'number'},
							{ name: 'ExtendedCost', type: 'number'}
						],
						localdata: data
					},
				};
			}).then(function(){
				 setTimeout(function(){
					$("#dataTable input.jqx-input-group-addon").focus();
			   },100);	 
			})	
		}
		
		var Inventory_data = function(){
			var location = $("#store").val();
			var daterange = $("#curdate").val();
			posData.InventoryData(location, daterange)
			.success(function(data){
				$scope.gridSettings2 = {
					source: {
						dataType: "json",
						dataFields: [
							{ name: 'Unique', type: 'int' },
							{ name: 'Description', type: 'string' },
							{ name: 'Item', type: 'string'},
							{ name: 'Part', type: 'string'},
							{ name: 'Category', type: 'string' },
							{ name: 'SubCategory', type: 'string' },
							{ name: 'Supplier', type: 'string' },
							{ name: 'StockLevel', type: 'int'},
							{ name: 'LocationName', type: 'string'},
							{ name: 'Cost', type: 'number'},
							{ name: 'ExtendedCost', type: 'number'}
						],
						localdata: data
					},
				};
			}).then(function(){
				 setTimeout(function(){
					$("#dataTable input.jqx-input-group-addon").focus();
			   },100);	 
			})	
		}
		
		
		LoadHeaderInfo()
		.then(function(){
			LoadStore()
			.then(function(){
				Inventory_preload_data();
			})
		})
		
		$("#searchButton").click(function(){
			$scope.gridSettingPreLoad = false;
		    $scope.gridSettingOnSearch = true;
			$("#dataTable2").jqxDataTable('clearFilters');
			$("#store").val($("#comboboxStore").val());
			$("#curdate").val($filter('date')(new Date($("#dateInput").val()), 'yyyy-MM-dd'));
			Inventory_data();
		});
		
		$("#exportButton").click(function(){
			$('body').block({ message: 'Exporting data...' }); 
			var postdata = "location="+$("#comboboxStore").val();
				postdata +="&pickdate="+$filter('date')(new Date($("#dateInput").val()), 'yyyy-MM-dd');
				postdata +="&location_name="+location_label;
			posData.ExportInventory(postdata)
			.success(function(data){
				if(data.success == true){
					$('body').unblock();
					$("#invdownload").val(data.filename);
				}
			}).then(function(){
				alert("Inventory Valuation Exported");
			})
		})
		
		$("#downloadButton").click(function(){
			if($("#invdownload").val() != ''){
				window.location = base_url+"backoffice/inventory/valuation/download";
			}else{
				alert("Please export data first.");
			}
		})
		
	}]);
})();