(function() {
    //var base_url = "/app/";
    //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {
		
		$scope.pre_authorized = {
			width: '99%',
			pageable: true,
			pagerButtonsCount: 5,
			pageSize: 12,
			columnsResize: true,
			source: {
				dataType: "json",
				dataFields: [
					{ name: 'Unique', type: 'int' },
					{ name: 'Reference', type: 'string' },
					{ name: 'Transaction', type: 'string'},
					{ name: 'PayMethod', type: 'string'},
					{ name: 'AuthStatus', type: 'string' },
					{ name: 'AuthCode', type: 'string' },
					{ name: 'Tender', type: 'string' },
					{ name: 'TotalTender', type: 'int'},
					{ name: 'EmployeeName', type: 'string'}
				],
				localdata: {}
			},
			columns: [
			  { text: 'Unique', dataField: 'Unique', hidden: true },
			  { text: 'Reference', dataField: 'Reference', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Reference#</div>';
				}
			  },
			  { text: 'Transaction', dataField: 'Transaction', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Transaction#</div>';
				}
			  },
			  { text: 'PayMethod', dataField: 'PayMethod', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Pay Method</div>';
				}
			  },
			  { text: 'Auth Status', dataField: 'AuthStatus', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Auth Status</div>';
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

			  { text: 'Tender', dataField: 'Tender', width: '10%',

			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Tender</div>';
				}
			  },
			  { text: 'Total Tender', dataField: 'TotalTender', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Total Tender</div>';
				}
			  },
			  { text: 'Employee Name', dataField: 'EmployeeName', width: '10%',
			  	renderer: function(row, column, value){
					return '<div style="font-weight:bold;">Employee Name</div>';
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
			$("#auth_manager_tabs").jqxTabs({theme:'fresh', width: '100%', height: 200 });
		})
		
	}]);
})();