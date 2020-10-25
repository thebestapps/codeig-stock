/*Recall */
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
	$scope.gridSettingsCashInWhen = false;
	$scope.CashInWhen = false;

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
			columns: [
				{ text: 'Unique', dataField: 'Unique', hidden: true},
				{ text: 'Date/Time', dataField: 'DateTime', width: '20%' },
				{ text: 'Location', dataField: 'LocationName', width: '8%' },
				{ text: 'Station No.', dataField: 'StationName', width: '10%' },
				{ text: 'Receipt', dataField: 'ReceiptNumber', width: '7%' },
				{ text: 'Customer', dataField: 'CustomerName', width: '12%' },
				{ text: 'Total', dataField: 'TotalSale', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
					aggregates: [{
						'Total':
							function (aggregatedValue, currentValue, column, record) {
								var total = parseInt(record['TotalSale']);
								return aggregatedValue + total;
							}
					}],
					aggregatesRenderer: function (aggregates, column, element) {
						var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
						renderString += aggregates.Total + "</div>";
						return renderString;
					}
				},
				{ text: 'Paid', dataField: 'Paid', width: '8%', cellsalign: 'right', cellsFormat: 'f2',
					aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
									var total = parseInt(record['Paid']);
									return aggregatedValue + total;
								 }
					}],
					aggregatesRenderer: function (aggregates, column, element) {
						var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bolder;'>";
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
									var total = parseInt(record['Balance']);
									return aggregatedValue + total;
								 }
					}],
					aggregatesRenderer: function (aggregates, column, element) {
						var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bolder;'>";
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
	recalldialog.setTitle("Recall Sale");
	recalldialog.open();
};