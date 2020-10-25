(function() {
    //var base_url = "/app/";
    //var api_url = "http://ak1.akamaipos.com:1337/"; Commented by HD 01/11/2016
    //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {

        var inventoryDialog;
        var poItemConfDialog;
        var poItemEdit;

        $scope.primary_button = true;
        $scope.AskBox = false;
        $scope.CancelPOButton = true;
        $scope.OnHoldButton = false;
        $scope.RefCode = "";

        $("#barcode_search").focus();

        var DateInput = function(){
            $scope.Orderdatestring = 'MM/dd/yyyy';
            $scope.OrderdateInputSettings = {
                width: 150,
                height: 30
            };
            $scope.ReceiveddateInputSettings = {
                width: 100,
                height: 30
            }
        };
		
		$("#SelectSupplier").jqxComboBox({placeHolder: "Select Suppliers" });
		setTimeout(function(){
			$("#SelectSupplier").on('keydown', function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$("#SelectSupplier").jqxComboBox('clearSelection');
					setTimeout(function(){
						$scope.selectedSupplierValue = null;
					}, 1000);
				}
			})
		}, 1000);
		$("#SelectLocation").jqxComboBox({placeHolder: "Select Location"});
		setTimeout(function(){
			$("#SelectLocation").on('keydown', function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$("#SelectLocation").jqxComboBox('clearSelection');
					setTimeout(function(){
						$scope.selectedLocationValue = null;
					}, 1000);
				}
			})
		}, 1000);
		
	
        $scope.order = {
            setdate: $filter('date')(new Date(), 'MM/dd/yyyy'),
        };

        $scope.received = {
            setdate: $filter('date')(new Date(), 'MM/dd/yyyy'),
        };


        $scope.BackReceiving = function(){
            $scope.ask = {
                message: "Would you like to save your changes?"
            }
            $scope.AskBox = true;
            $scope.primary_button = false;
        }


        $scope.dialogInventorySettings =
        {
            created: function(args)
            {
                inventoryDialog = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 300, height: 195,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: false
        };

        $scope.dialogPOItemConfSettings =
        {
            created: function(args)
            {
                poItemConfDialog = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 200, height: 120,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: false
        };

        $scope.dialogPOpopup = {
            created: function(args)
            {
                poItemEdit = args.instance;
            },
            resizable: false,
            theme: 'energyblue',
            width: 300, height: 220,
            autoOpen: false,
            isModal: true,
            keyboardCloseKey: 'none',
            showCloseButton: false
        };


        var supplier_source_empty = {
            datatype: "json",
            datafields: [
                { name: 'Unique' },
                { name: 'Company'}
            ],
            url: {}
        };

        $scope.comboBoxSupplierSettings = {source: supplier_source_empty,  displayMember: "Company", valueMember: "Unique", width: 150, height: 30};
        $scope.selectHandlerSupplier = function (event) {
            if (event.args) {
                var item = event.args.item;
                if (item) {
                    $scope.selectedSupplierValue = item.value;
                }
            }
        };

        var store_source_empty = {
            datatype: "json",
            datafields: [
                { name: 'Unique' },
                { name: 'Location'}
            ],
            url: {}
        };
        $scope.comboBoxLocationSettings = {source: store_source_empty, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 30};
        $scope.selectHandlerLocation = function (event) {
            if (event.args) {
                var item = event.args.item;
                if (item) {
                    $scope.selectedLocationValue = item.value
                }
            }
        };

        var Supplier = function(){
            $http({
                method: 'get',
                url: api_url+'load-supplier'
            }).success(function(data){
                var Supplier = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'Company'}
                    ],
                    localdata: data,
                    async: false
                };
                $scope.comboBoxSupplierSettings = {source: Supplier, displayMember: "Company", valueMember: "Unique", width: 150, height: 30};
            }).then(function(){
				$scope.selectedSupplierValue = null;
            })
        };

        var Stores = function(){
            $http({
                method: 'get',
                url: api_url+'load-stores'
            }).success(function(data) {
                var Stores = {
                    datatype: "json",
                    datafields: [
                        {name: 'Unique'},
                        {name: 'LocationName'}
                    ],
                    localdata: data,
                    async: false
                };
                $scope.comboBoxLocationSettings = {
                    source: Stores,
                    displayMember: "LocationName",
                    valueMember: "Unique",
                    width: 150,
                    height: 30
                };
            }).then(function(){
                $scope.selectedLocationValue = $scope.storeid;
                load_purchase_order($scope.purchaseheader);
            })
        };

        var inventory_preload = function(){
            $scope.receivingInventorySettings = {
                width: "100%",
                height: 400,
                sortable: true,
                pageable: true,
                pageSize: 20,
                pagerMode: 'default',
                altRows: true,
                filterable: true,
                filterMode: 'simple',
                theme: 'fresh',
                columnsResize: true,
                source:  {
                    dataType: "json",
                    dataFields: [
                        { name: 'Unique', type : 'int' },
                        { name: 'Item', type: 'string'},
                        { name: 'Part', type: 'string' },
                        { name: 'Description', type: 'string'},
                        { name: 'Company', type: 'string'},
                        { name: 'SupplierPart', type: 'string'},
                        { name: 'Cost', type: 'string'},
                        { name: 'Cost_Extra', type: 'string'},
                        { name: 'Cost_Freight', type: 'string'},
                        { name: 'Cost_Duty', type: 'string'},
                    ],
                    localdata: {}
                },
                columns: [
                    { text: 'ID', dataField: 'Unique', width: "10%"},
                    { text: 'Item', dataField: 'Item', width: "15%"},
                    { text: 'Barcode', dataField: 'Part', width: "15%"},
                    { text: 'Description', dataField: 'Description', width: '25%'},
                    { text: 'Supplier', dataField: 'Company', width: '10%'},
                    { text: 'Supplier Part', dataField: 'SupplierPart', width: '10%'},
                    { text: 'Cost', dataField: 'Cost', width: '15%', cellsAlign: 'right', cellsFormat: 'F2'}
                ]
            };
        };

        $scope.Item = {};

        var PurchaseOrder_preload = function(){
            $scope.receivingAddNewSettings = {
                width: "100%",
                height: 400,
                sortable: true,
                altRows: true,
                theme: 'energyblue',
                editable: false,
                showToolbar: true,
                showAggregates: true,
                columnsResize: true,
                source: {
                    dataType: "json",
                    dataFields: [
                        {name: 'unique', type: 'int'},
                        {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                        {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                        {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                        {name: 'item_supplier_part', type: 'string'},
                        {name: 'order_quantity', type: 'int'},
                        {name: 'received_quantity', type: 'int'},
                        {name: 'back_order_quantity', type: 'int'},
                        {name: 'item_cost', type: 'string'},
                        {name: 'ordered_cost', type: 'string'},
                        {name: 'received_cost', type: 'string'},
                        {name: 'status', type: 'int'},
                        {name: 'received_date', type: 'date'}
                    ],
                    localdata: {},
                    updateRow: function (rowid, rowdata, commit) {
                        var PDUnique = rowdata.unique;
                        var orderQty = rowdata.order_quantity;
                        var recvQty = rowdata.received_quantity;
                        var bkorderQty = rowdata.back_order_quantity;
                        var itemCost = rowdata.item_cost;
                        var ordered_cost = orderQty * itemCost;
                        var received_cost = recvQty * itemCost;
                        var status = rowdata.status;

                        var postdata="received_quantity="+ recvQty;
                        postdata+="&order_quantity="+ orderQty;
                        postdata+="&item_cost="+ itemCost;
                        postdata+="&ordered_cost="+ordered_cost;
                        postdata+="&received_cost="+received_cost;

                        posData.PurchasePDbyUnique(PDUnique, postdata)
                            .success(function(data){
                                if(recvQty > 0) {
                                    var postqty ="Quantity="+ recvQty;
                                    postqty +="&unit_cost="+ itemCost;
                                    posData.StockQtyUpdate(PDUnique, postqty);
                                }
                                commit(true);
                                load_purchase_order(PDUnique);
                                //$("#receiving-addnew").jqxDataTable('setCellValue', rowid, "extended_cost", rowdata.extended_cost * rowdata.order_quantity);
                            });
                    },
                    deleteRow: function (rowID, commit) {
                        // synchronize with the server - send delete command
                        // call commit with parameter true if the synchronization with the server is successful
                        // and with parameter false if the synchronization failed.
                        commit(true);
                    }
                },
                renderToolbar: function(toolBar)
                {
                    var toTheme = function (className) {
                        if (theme == "") return className;
                        return className + " " + className + "-" + theme;
                    };
                    // appends buttons to the status bar.
                    var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%;'></div>");
                    var buttonTemplate = "<div style='float: left; padding: 3px; margin: 2px;'><div style='margin: 4px; width: 16px; height: 16px;'></div></div>";
                    var deleteButton = $(buttonTemplate);
                    container.append(deleteButton);
                    toolBar.append(container);
                    deleteButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
                    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
                    deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
                    var updateButtons = function (action) {
                        switch (action) {
                            case "Select":
                                deleteButton.jqxButton({ disabled: false });
                                break;
                            case "Unselect":
                                deleteButton.jqxButton({ disabled: true });
                                break;
                            case "Edit":
                                deleteButton.jqxButton({ disabled: true });
                                break;
                            case "End Edit":
                                deleteButton.jqxButton({ disabled: false });
                                break;
                        }
                    };
                    var rowIndex = null;
                    $("#receiving-addnew").on('rowSelect', function (event) {
                        var args = event.args;
                        rowIndex = args.index;
                        updateButtons('Select');
                    });
                    $("#receiving-addnew").on('rowUnselect', function (event) {
                        updateButtons('Unselect');
                    });
                    deleteButton.click(function () {
                        if (!deleteButton.jqxButton('disabled')) {
                            $scope.POItem = {
                                index: rowIndex
                            };
                            poItemConfDialog.setTitle("Confirmation");
                            poItemConfDialog.open();
                        }
                    });
                },
                columns: [
                    {text: 'Unique', dataField: 'unique', hidden: true},
                    {text: 'Item', dataField: 'item_id', width: '7%', editable: false},
                    {text: 'Description', dataField: 'item_description', width: '18%', editable: false},
                    {text: 'Supplier Part', dataField: 'item_supplier_part', width: '10%', editable: false},
                    {text: 'Order', dataField: 'order_quantity', width: '7%', align: 'center', cellsAlign: 'right', align: 'right',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=0
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Received', dataField: 'received_quantity', width: '7%', align: 'center', cellsAlign: 'right', align: 'right',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=0
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Bk. Order', dataField: 'back_order_quantity', width: '7%', align: 'right', cellsAlign: 'right',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=0;
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Cost', dataField: 'item_cost', width: '9%', cellsformat: 'F2', align: 'right', cellsAlign:'right'},
                    {text: 'Ordered $', dataField: 'ordered_cost', width: '9%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Received $', dataField: 'received_cost', width: '9%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: right;  height: 100%;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Status', dataField: 'status',  width: '8%', hidden: false, editable: false, align: "center", cellsAlign: "center",
                        cellsRenderer: function (row, columnDataField, value) {
                            var stat = "";
                            if(value == 1){
                                stat = "<span class='alert-info'>On Hold</span>";
                            }else if(value == 2){
                                stat = "<span class='alert-success'>Complete</span>";
                            }
                            return stat;
                        }
                    },
                    {text: 'Date', dataField: 'received_date', width: '9%', cellsFormat: 'd'}
                ]
            };
        };

        var load_purchase_order = function(phunique){
            $http({
                method: 'get',
                url: api_url+'purchasedetails-find/'+phunique
            }).success(function(data){
                if(data.length !== 0) {
                    $scope.DeletePOButton = true;
                    $scope.EditCancelPOButton = true;
                    $scope.CancelPOButton = false;
                    $scope.receivingAddNewSettings = {
                        width: '100%',
                        height: '400',
                        showToolbar: true,
                        showAggregates: true,
                        source: {
                            dataType: "json",
                            dataFields: [
                                {name: 'unique', type: 'int'},
                                {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                {name: 'item_supplier_part', type: 'string'},
                                {name: 'order_quantity', type: 'int'},
                                {name: 'received_quantity', type: 'int'},
                                {name: 'back_order_quantity', type: 'int'},
                                {name: 'item_cost', type: 'string'},
                                {name: 'ordered_cost', type: 'string'},
                                {name: 'received_cost', type: 'string'},
                                {name: 'status', type: 'int'},
                                {name: 'received_date', type: 'date'}
                            ],
                            localdata: data,
							/*
                            updateRow: function (rowid, rowdata, commit) {
                                //$("#receiving-addnew").jqxDataTable('setCellValue', 0, "extended_cost", rowdata.extended_cost * rowdata.order_quantity);
                                // synchronize with the server - send update command
                                var PDUnique = rowdata.unique;
                                var orderQty = rowdata.order_quantity;
                                var recvQty = rowdata.received_quantity;
                                var bkorderQty = rowdata.received_quantity;
                                var itemCost = rowdata.item_cost;
                                var ordered_cost = orderQty * itemCost;
                                var received_cost = recvQty * itemCost;

                                var postdata="received_quantity="+ recvQty;
                                postdata+="&order_quantity="+ orderQty;
                                postdata+="&item_cost="+ itemCost;
                                postdata+="&ordered_cost="+ordered_cost;
                                postdata+="&received_cost="+received_cost;

                                posData.PurchasePDbyUnique(PDUnique, postdata)
                                .success(function(data){
                                    if(recvQty > 0) {
                                        var postqty = "Quantity=" + recvQty;
                                        postqty += "&unit_cost=" + itemCost;
                                        posData.StockQtyUpdate(PDUnique, postqty);
                                    }
                                    commit(true);
                                    load_purchase_order(phunique);
                                });
                            }
							*/
                        }
                    };
                }else{
                    $http({
                        method: 'get',
                        url: api_url+'purchaseheader-find/'+phunique
                    }).success(function(data){
                        $scope.DeletePOButton = true;
                        $scope.EditCancelPOButton = true;
                        $scope.CancelPOButton = false;
                        $scope.receivingAddNewSettings = {
                            width: '100%',
                            height: '400',
                            showToolbar: true,
                            showAggregates: true,
                            source: {
                                dataType: "json",
                                dataFields: [
                                    {name: 'unique', type: 'int'},
                                    {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                    {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                    {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                    {name: 'item_supplier_part', type: 'string'},
                                    {name: 'order_quantity', type: 'int'},
                                    {name: 'received_quantity', type: 'int'},
                                    {name: 'back_order_quantity', type: 'int'},
                                    {name: 'item_cost', type: 'string'},
                                    {name: 'ordered_cost', type: 'string'},
                                    {name: 'received_cost', type: 'string'},
                                    {name: 'status', type: 'int'},
                                    {name: 'received_date', type: 'date'}
                                ],
                                localdata: {}
                            },

                        };
                    })
                }
            })
        }

        var clearAddItemOrder = function(){
            $scope.poOrder = {
                value: 0
            }
            $scope.poReceived = {
                value: 0
            }
            $scope.poCost = {
                value: 0
            }
            $scope.received = {
                setdate: $filter('date')(new Date(), 'MM/dd/yyyy'),
            };
        }

        var StockLineQtyExistsCount = function(pdunique){
            var deferred = $q.defer();
            var CountRes = 0;
            $http({
                method: 'get',
                url: api_url+'stock-quantity/count/'+pdunique
            }).success(function(data) {
                CountRes = data.Count;
                deferred.resolve(data.Count);
            });
            return deferred.promise;
        }

        $scope.receivingRowDoubleClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;
            $scope.PurchaseDetails = {
                Unique: row.unique
            }
            $scope.Item = {
                Unique: row.item_unique
            }
            $scope.poOrder = {
                value: row.order_quantity
            }
            $scope.poReceived = {
                value: row.received_quantity
            }
            $scope.poCost = {
                value: row.item_cost
            }
            $('#add-order-input').jqxNumberInput('focus');
            setTimeout(function(){
                $('#add-order-input input').select();
            },100);
            poItemEdit.setTitle("Item Order ID:"+row.item_id);
            poItemEdit.open();
        }

        $scope.ItemOrderClose = function(){
            clearAddItemOrder();
            poItemEdit.close();
        }

        $scope.ItemOrderSave = function(){
            var PHUnique = $scope.purchaseheader;
            var BackOrderCalculate = $scope.poOrder.value  - $scope.poReceived.value;
            if(BackOrderCalculate < 0){
                BackOrderCalculate = 0;
            }
            var postdata="order_quantity="+$scope.poOrder.value;
                postdata+="&received_quantity="+$scope.poReceived.value;
                postdata+="&item_cost="+$scope.poCost.value;
                postdata+="&ordered_cost="+$scope.poOrder.value * $scope.poCost.value;
                postdata+="&received_cost="+$scope.poReceived.value * $scope.poCost.value;
            if($scope.poReceived.value > 0) {
				postdata+="&back_order_quantity="+BackOrderCalculate;
                postdata +="&status=2";
                postdata +="&received_date=" + $filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd HH:mm');
            }else if($scope.poReceived.value < 0){
                postdata+="&status=2";
				postdata +="&received_date=" + $filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd HH:mm');
            }else if($scope.poReceived.value == 0){
                postdata+="&status=1";
				postdata+="&received_date="+null;
            }
            $http({
                method: 'put',
                url: api_url+'purchasepd/update-by-unique/'+$scope.PurchaseDetails.Unique,
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(){
                if($scope.poReceived.value > 0 || $scope.poReceived.value < 0){
                    $http({
                        method: 'get',
                        url: api_url+'stock-quantity/count/'+$scope.PurchaseDetails.Unique
                    }).success(function(data) {
                        var CountRes = data.Count;

                        if(CountRes > 0) {
                            var postdata="LocationUnique="+$scope.selectedLocationValue;
                            postdata+="&Quantity="+$scope.poReceived.value;
                            postdata+="&CreatedBy="+$scope.userid;
                            postdata+="&unit_cost="+$scope.poCost.value;
                            postdata+="&TransactionDate="+$filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd HH:mm');
							postdata+="&trans_date="+$filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd');
                            $http({
                                method: 'put',
                                url: api_url + 'stock-quantity/update/'+$scope.PurchaseDetails.Unique,
                                data: postdata,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then(function () {
                                $http({
                                    method: 'get',
                                    url: api_url + 'purchasedetails-find/' + PHUnique
                                }).success(function (data) {
                                    if (data.length !== 0) {
                                        $scope.receivingAddNewSettings = {
                                            source: {
                                                dataType: "json",
                                                dataFields: [
                                                    {name: 'unique', type: 'int'},
                                                    {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                                    {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                                    {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                                    {name: 'item_supplier_part', type: 'string'},
                                                    {name: 'order_quantity', type: 'int'},
                                                    {name: 'received_quantity', type: 'int'},
                                                    {name: 'back_order_quantity', type: 'int'},
                                                    {name: 'item_cost', type: 'string'},
                                                    {name: 'ordered_cost', type: 'string'},
                                                    {name: 'received_cost', type: 'string'},
                                                    {name: 'status', type: 'int'},
                                                    {name: 'received_date', type: 'date'}
                                                ],
                                                localdata: data
                                            },
                                        }
                                    }
                                })
                                clearAddItemOrder();
                                poItemEdit.close();
                            })
                        }else{
                            var postdata="purchase_details_unique="+$scope.PurchaseDetails.Unique;
                            postdata+="&ItemUnique="+$scope.Item.Unique;
                            postdata+="&LocationUnique="+$scope.selectedLocationValue;
                            postdata+="&Type=3";
                            postdata+="&Quantity="+$scope.poReceived.value;
                            postdata+="&CreatedBy="+$scope.userid;
                            postdata+="&unit_cost="+$scope.poCost.value;
                            postdata+="&TransactionDate="+$filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd HH:mm');
                            postdata+="&status=1";
							postdata+="&trans_date="+$filter('date')(new Date($scope.received.setdate), 'yyyy-MM-dd');
                            $http({
                                method: 'post',
                                url: api_url + 'stock-quantity/add',
                                data: postdata,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then(function () {
                                $http({
                                    method: 'get',
                                    url: api_url + 'purchasedetails-find/' + PHUnique
                                }).success(function (data) {
                                    if (data.length !== 0) {
                                        $scope.receivingAddNewSettings = {
                                            source: {
                                                dataType: "json",
                                                dataFields: [
                                                    {name: 'unique', type: 'int'},
                                                    {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                                    {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                                    {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                                    {name: 'item_supplier_part', type: 'string'},
                                                    {name: 'order_quantity', type: 'int'},
                                                    {name: 'received_quantity', type: 'int'},
                                                    {name: 'back_order_quantity', type: 'int'},
                                                    {name: 'item_cost', type: 'string'},
                                                    {name: 'ordered_cost', type: 'string'},
                                                    {name: 'received_cost', type: 'string'},
                                                    {name: 'status', type: 'int'},
                                                    {name: 'received_date', type: 'date'}
                                                ],
                                                localdata: data
                                            },
                                        }
                                    }
                                })
                                clearAddItemOrder();
                                poItemEdit.close();
                            })
                        }

                    });
                }else{
					$http({
						method: 'put',
						url: api_url+'stock-quantity/delete/'+$scope.PurchaseDetails.Unique
					}).success(function(data){
						
						$http({
							method: 'get',
							url: api_url + 'purchasedetails-find/' + PHUnique
						}).success(function (data) {
							if (data.length !== 0) {
								$scope.receivingAddNewSettings = {
									source: {
										dataType: "json",
										dataFields: [
											{name: 'unique', type: 'int'},
											{name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
											{name: 'item_id', map: 'item_unique>Item', type: 'string'},
											{name: 'item_description', map: 'item_unique>Description', type: 'string'},
											{name: 'item_supplier_part', type: 'string'},
											{name: 'order_quantity', type: 'int'},
											{name: 'received_quantity', type: 'int'},
											{name: 'back_order_quantity', type: 'int'},
											{name: 'item_cost', type: 'string'},
											{name: 'ordered_cost', type: 'string'},
											{name: 'received_cost', type: 'string'},
											{name: 'status', type: 'int'},
											{name: 'received_date', type: 'date'}
										],
										localdata: data
									},
								}
							}
						})
						clearAddItemOrder();
						poItemEdit.close();
					})
				}
            })
        }

        DateInput();
        inventory_preload();
        PurchaseOrder_preload();
        Supplier();
        Stores();

        $scope.SearchItemButton = function(){
            var ItemSearch = $scope.Item.Search;
            if(ItemSearch){
                posData.SearchItemCount(ItemSearch)
                    .success(function(data){
                        if(data.Count > 1){
                            $http({
                                method: 'get',
                                url: api_url+'find-inventory/'+ItemSearch
                            }).success(function(invdata){
                                $scope.receivingInventorySettings = {
                                    width: "100%",
                                    height: 400,
                                    sortable: true,
                                    pageable: true,
                                    pageSize: 20,
                                    pagerMode: 'default',
                                    altRows: true,
                                    filterable: true,
                                    filterMode: 'simple',
                                    theme: 'fresh',
                                    source:  {
                                        dataType: "json",
                                        dataFields: [
                                            { name: 'Unique', type : 'int' },
                                            { name: 'Item', type: 'string'},
                                            { name: 'Part', type: 'string' },
                                            { name: 'Description', type: 'string'},
                                            { name: 'Company', type: 'string'},
                                            { name: 'SupplierPart', type: 'string'},
                                            { name: 'Cost', type: 'string'},
                                            { name: 'Cost_Extra', type: 'string'},
                                            { name: 'Cost_Freight', type: 'string'},
                                            { name: 'Cost_Duty', type: 'string'},
                                        ],
                                        localdata: invdata.rows
                                    },
                                    columnsResize: true,
                                    columns: [
                                        { text: 'ID', dataField: 'Unique', width: "10%"},
                                        { text: 'Item', dataField: 'Item', width: "15%"},
                                        { text: 'Barcode', dataField: 'Part', width: "15%"},
                                        { text: 'Description', dataField: 'Description', width: '25%' },
                                        { text: 'Supplier', dataField: 'Company', width: '10%'},
                                        { text: 'Supplier Part', dataField: 'SupplierPart', width: '10%'},
                                        { text: 'Cost', dataField: 'Cost', width: '15%', cellsAlign: 'right', cellsFormat: 'F2'}
                                    ]
                                };
                            }).then(function(){
                                inventoryDialog.setTitle("Select Inventory");
                                inventoryDialog.open();
                                setTimeout(function(){
                                    $("#receiving-inventory input.jqx-input").focus();
                                }, 500);
                                $scope.Item = {};
                            })
                        }else if(data.Count == 1){
                            $scope.Item = {};
                            $http({
                                method: 'get',
                                url: api_url+'find-inventory/'+ItemSearch
                            }).success(function(invdata){
                                var rowinvdata = invdata.rows;
                                console.log(rowinvdata);

                                var userid = $scope.userid;
                                var purchase_header_unique =  $scope.purchaseheader;
                                var postdata="item_unique="+rowinvdata[0].Unique;
                                postdata+="&purchase_header_unique="+purchase_header_unique;
                                postdata+="&item_supplier_part="+rowinvdata[0].SupplierPart;
                                postdata+="&item_description="+rowinvdata[0].Description;
                                postdata+="&item_cost="+rowinvdata[0].Cost;
                                postdata+="&item_cost_extra="+rowinvdata[0].Cost_Extra;
                                postdata+="&item_cost_freight="+rowinvdata[0].Cost_Freight;
                                postdata+="&item_cost_duty="+rowinvdata[0].Cost_Duty;
                                postdata+="&ordered_cost="+rowinvdata[0].Cost * 1;
                                postdata+="&received_cost=0";
                                postdata+="&received_quantity=0";
                                postdata+="&order_quantity=1";
                                postdata+="&status=1";
                                postdata+="&created_by="+userid;

                                posData.SaveSelectedItem(postdata)
                                    .success(function(data){
                                        $http({
                                            method: 'get',
                                            url: api_url+'purchasedetails-find/'+purchase_header_unique
                                        }).success(function(pddata){
                                            $scope.receivingAddNewSettings = {
                                                source:  {
                                                    dataType: "json",
                                                    dataFields: [
                                                        {name: 'unique', type: 'int'},
                                                        {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                                        {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                                        {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                                        {name: 'item_supplier_part', type: 'string'},
                                                        {name: 'order_quantity', type: 'int'},
                                                        {name: 'received_quantity', type: 'int'},
                                                        {name: 'back_order_quantity', type: 'int'},
                                                        {name: 'item_cost', type: 'string'},
                                                        {name: 'ordered_cost', type: 'string'},
                                                        {name: 'received_cost', type: 'string'},
                                                        {name: 'status', type: 'int'},
                                                        {name: 'received_date', type: 'datetime'}
                                                    ],
                                                    localdata: pddata
                                                },
                                            };
                                        })
                                    })
                            }).error(function(){
                                alert("Server cannot be found.");
                            })
                        }else if(data.Count == 0){
                            $scope.Item = {};
                        }
                    })
            }else{
                $http({
                    method: "get",
                    url: api_url+"load-inventory"
                }).success(function(data){
                    $scope.receivingInventorySettings = {
                        width: "100%",
                        height: 400,
                        sortable: true,
                        pageable: true,
                        pageSize: 20,
                        pagerMode: 'default',
                        altRows: true,
                        filterable: true,
                        filterMode: 'simple',
                        theme: 'fresh',
                        source:  {
                            dataType: "json",
                            dataFields: [
                                { name: 'Unique', type : 'int' },
                                { name: 'Item', type: 'string'},
                                { name: 'Part', type: 'string' },
                                { name: 'Description', type: 'string'},
                                { name: 'Company', type: 'string'},
                                { name: 'SupplierPart', type: 'string'},
                                { name: 'Cost', type: 'string'},
                                { name: 'Cost_Extra', type: 'string'},
                                { name: 'Cost_Freight', type: 'string'},
                                { name: 'Cost_Duty', type: 'string'},
                            ],
                            localdata: data.rows
                        },
                        columnsResize: true,
                        columns: [
                            { text: 'ID', dataField: 'Unique', width: "10%"},
                            { text: 'Item', dataField: 'Item', width: "15%"},
                            { text: 'Barcode', dataField: 'Part', width: "15%"},
                            { text: 'Description', dataField: 'Description', width: '25%' },
                            { text: 'Supplier', dataField: 'Company', width: '10%'},
                            { text: 'Supplier Part', dataField: 'SupplierPart', width: '10%'},
                            { text: 'Cost', dataField: 'Cost', width: '15%', cellsAlign: 'right', cellsFormat: 'F2'}
                        ]
                    };
                }).then(function(){
                    inventoryDialog.setTitle("Select Inventory");
                    inventoryDialog.open();
                    setTimeout(function(){
                        $("#receiving-inventory input.jqx-input").focus();
                    }, 500);
                })
            }
        };

        $scope.InventoryRowDoubleClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;
            var userid = $scope.userid;
            var purchase_header_unique =  $scope.purchaseheader;
            var InvUnique = row.Unique;
            var Description = row.Description;
            var SuppPart = row.SupplierPart;
            var Cost = row.Cost;
            var CostExtra = row.Cost_Extra;
            var CostFreight = row.Cost_Freight;
            var CostDuty = row.Cost_Duty;
            var postdata="item_unique="+InvUnique;
            postdata+="&purchase_header_unique="+purchase_header_unique;
            postdata+="&item_supplier_part="+SuppPart;
            postdata+="&item_description="+Description;
            postdata+="&item_cost="+Cost;
            postdata+="&item_cost_extra="+CostExtra;
            postdata+="&item_cost_freight="+CostFreight;
            postdata+="&item_cost_duty="+CostDuty;
            postdata+="&ordered_cost=0";
            postdata+="&received_cost=0";
            postdata+="&received_quantity=0";
            postdata+="&order_quantity=0";
            postdata+="&back_order_quantity=0";
            postdata+="&status=1";
            postdata+="&created_by="+userid;

            posData.SaveSelectedItem(postdata)
            .success(function(data){
                $http({
                    method: 'get',
                    url: api_url+'purchasedetails-find/'+purchase_header_unique
                }).success(function(pddata){
                    load_purchase_order(purchase_header_unique);
                });
            }).then(function(){
                $("#receiving-inventory").jqxDataTable('clearFilters');
                $("#barcode_search").focus();
                inventoryDialog.close();
            })
        };

        $scope.InventoryRowClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;
            $scope.inventory = {
                unique: row.Unique,
                description: row.Description,
                supplierunique: row.SupplierUnique,
                supplierpart: row.SupplierPart,
                cost: row.Cost,
                costextra: row.Cost_Extra,
                costfreight: row.Cost_Freight,
                costduty: row.Cost_Duty
            };
            console.log(row.Unique);
        };

        $scope.PickItem = function(){
            var userid = $scope.userid;
            var purchase_header_unique = $scope.purchaseheader;
            var InvUnique = $scope.inventory.unique;
            var Description = $scope.inventory.description;
            var SuppPart = $scope.inventory.supplierpart;
            var Cost = $scope.inventory.cost;
            var CostExtra = $scope.inventory.costextra;
            var CostFreight = $scope.inventory.costfreight;
            var CostDuty = $scope.inventory.costduty;
            var postdata="item_unique="+InvUnique;
            postdata+="&purchase_header_unique="+purchase_header_unique;
            postdata+="&item_supplier_part="+SuppPart;
            postdata+="&item_description="+Description;
            postdata+="&item_cost="+Cost;
            postdata+="&item_cost_extra="+CostExtra;
            postdata+="&item_cost_freight="+CostFreight;
            postdata+="&item_cost_duty="+CostDuty;
            postdata+="&ordered_cost=0";
            postdata+="&received_cost=0";
            postdata+="&received_quantity=0";
            postdata+="&order_quantity=0";
            postdata+="&back_order_quantity=0";
            postdata+="&status=1";
            postdata+="&created_by="+userid;

            posData.SaveSelectedItem(postdata)
            .success(function(data){
                $http({
                    method: 'get',
                    url: api_url+'purchasedetails-find/'+purchase_header_unique
                }).success(function(pddata){
                    load_purchase_order(purchase_header_unique);
                });
            }).then(function(){
                $("#receiving-inventory").jqxDataTable('clearFilters');
                $("#barcode_search").focus();
                inventoryDialog.close();
            })
        };

        $scope.CancelInventory = function(){
            $("#receiving-inventory").jqxDataTable('clearFilters');
            $("#barcode_search").focus();
            inventoryDialog.close();
        };


        $scope.EnterItemSearch = function(){
            var ItemSearch = $scope.Item.Search;
            if(ItemSearch){
                posData.SearchItemCount(ItemSearch)
                    .success(function(data){
                        if(data.Count > 1){
                            $http({
                                method: 'get',
                                url: api_url+'find-inventory/'+ItemSearch
                            }).success(function(invdata){
                                $scope.receivingInventorySettings = {
                                    width: "100%",
                                    height: 400,
                                    sortable: true,
                                    pageable: true,
                                    pageSize: 20,
                                    pagerMode: 'default',
                                    altRows: true,
                                    filterable: true,
                                    filterMode: 'simple',
                                    theme: 'fresh',
                                    source:  {
                                        dataType: "json",
                                        dataFields: [
                                            { name: 'Unique', type : 'int' },
                                            { name: 'Item', type: 'string'},
                                            { name: 'Part', type: 'string' },
                                            { name: 'Description', type: 'string'},
                                            { name: 'Company', type: 'string'},
                                            { name: 'SupplierPart', type: 'string'},
                                            { name: 'Cost', type: 'string'},
                                            { name: 'Cost_Extra', type: 'string'},
                                            { name: 'Cost_Freight', type: 'string'},
                                            { name: 'Cost_Duty', type: 'string'},
                                        ],
                                        localdata: invdata.rows
                                    },
                                    columnsResize: true,
                                    columns: [
                                        { text: 'ID', dataField: 'Unique', width: "10%"},
                                        { text: 'Item', dataField: 'Item', width: "15%"},
                                        { text: 'Barcode', dataField: 'Part', width: "15%"},
                                        { text: 'Description', dataField: 'Description', width: '25%' },
                                        { text: 'Supplier', dataField: 'Company', width: '10%'},
                                        { text: 'Supplier Part', dataField: 'SupplierPart', width: '10%'},
                                        { text: 'Cost', dataField: 'Cost', width: '15%', cellsAlign: 'right', cellsFormat: 'F2'}
                                    ]
                                };
                            }).then(function(){
                                inventoryDialog.setTitle("Select Inventory");
                                inventoryDialog.open();
                                setTimeout(function(){
                                    $("#receiving-inventory input.jqx-input").focus();
                                }, 500);
                                $scope.Item = {};
                            })

                        }else if(data.Count == 1){
                            $scope.Item = {};
                            $http({
                                method: 'get',
                                url: api_url+'find-inventory/'+ItemSearch
                            }).success(function(invdata){
                                var rowinvdata = invdata.rows;
                                console.log(rowinvdata);

                                var userid = $scope.userid;
                                var purchase_header_unique =  $scope.purchaseheader;
                                var postdata="item_unique="+rowinvdata[0].Unique;
                                postdata+="&purchase_header_unique="+purchase_header_unique;
                                postdata+="&item_supplier_part="+rowinvdata[0].SupplierPart;
                                postdata+="&item_description="+rowinvdata[0].Description;
                                postdata+="&item_cost="+rowinvdata[0].Cost;
                                postdata+="&item_cost_extra="+rowinvdata[0].Cost_Extra;
                                postdata+="&item_cost_freight="+rowinvdata[0].Cost_Freight;
                                postdata+="&item_cost_duty="+rowinvdata[0].Cost_Duty;
                                postdata+="&ordered_cost=0";
                                postdata+="&received_cost=0";
                                postdata+="&received_quantity=0";
                                postdata+="&order_quantity=0";
                                postdata+="&back_order_quantity=0";
                                postdata+="&status=1";
                                postdata+="&created_by="+userid;

                                posData.SaveSelectedItem(postdata)
                                .success(function(data){
                                    $http({
                                        method: 'get',
                                        url: api_url+'purchasedetails-find/'+purchase_header_unique
                                    }).success(function(pddata){
                                        $scope.receivingAddNewSettings = {
                                            source:  {
                                                dataType: "json",
                                                dataFields: [
                                                    {name: 'unique', type: 'int'},
                                                    {name: 'item_unique', map: 'item_unique>Unique', type: 'int'},
                                                    {name: 'item_id', map: 'item_unique>Item', type: 'string'},
                                                    {name: 'item_description', map: 'item_unique>Description', type: 'string'},
                                                    {name: 'item_supplier_part', type: 'string'},
                                                    {name: 'order_quantity', type: 'int'},
                                                    {name: 'received_quantity', type: 'int'},
                                                    {name: 'back_order_quantity', type: 'int'},
                                                    {name: 'item_cost', type: 'string'},
                                                    {name: 'ordered_cost', type: 'string'},
                                                    {name: 'received_cost', type: 'string'},
                                                    {name: 'status', type: 'int'},
                                                    {name: 'received_date', type: 'datetime'}
                                                ],
                                                localdata: pddata
                                            },
                                        };
                                    })
                                })
                            }).error(function(){
                                alert("Server cannot be found.");
                            })
                        }else if(data.Count == 0){
                            $scope.Item = {};
                        }
                    }).error(function(){
                    alert("Server is not running");
                })
            }
        };

        $scope.OnHold = function(){
            var PHID = $scope.purchaseheader;
            var supplier = $scope.selectedSupplierValue;
            var location = $scope.selectedLocationValue;
            var RefCode = $scope.RefCode;
            var postdata="supplier_unique="+supplier;
            postdata+="&location_unique="+location;
            postdata+="&po="+RefCode;
            postdata+="&order_date="+$filter('date')(new Date($scope.order.setdate), 'yyyy-MM-dd HH:mm');
            postdata+="&status=1";
            var poststatus="status=1";
            posData.UpdatePD(PHID, poststatus)
            .success(function(phdata){
                posData.UpdatePH(PHID, postdata)
                .success(function(pddata){
                    $scope.selectedLocationValue = $scope.storeid; //default
                    $scope.selectedSupplierValue = 16; //default
                    $scope.RefCode = ""; //default
                }).then(function(){
                    $window.location.href = base_url+"backoffice/receiving"
                })
            })
        };

        $scope.SavePO = function(){
            var PHID = $scope.purchaseheader;
            var supplier = "";
            var location = "";
            var RefCode = "";
            supplier = $scope.selectedSupplierValue;
            location = $scope.selectedLocationValue;
            RefCode = $scope.RefCode;
            var postdata="supplier_unique="+supplier;
            postdata+="&location_unique="+location;
            postdata+="&po="+RefCode;
            postdata+="&order_date="+$filter('date')(new Date($scope.order.setdate), 'yyyy-MM-dd HH:mm');
            postdata+="&status=1";
            var rows = $("#receiving-addnew").jqxDataTable('getRows');
            var RowCount = rows.length;
            posData.UpdatePH(PHID, postdata);
			setTimeout(function(){
				$http({
				method: 'get',
				url: api_url+'purchasepd/count/complete/status/'+PHID
				}).success(function(data){
					var ActualCount = data.rows[0].completed;
					var postdata="&status=2";
					console.log("Count: "+ActualCount);
					if(RowCount == ActualCount){
						posData.UpdatePH(PHID, postdata);
					}else{
						var postdata="&status=1";
						posData.UpdatePH(PHID, postdata);
					}
					$window.location.href = base_url+"backoffice/receiving";
				})
			}, 1000)
			
        };

        $scope.CancelPO = function(){
            $scope.ask = {
                message: "Are you sure you want to delete?"
            }
            $scope.AskBox = true;
            $scope.primary_button = false;
        };

        $scope.AskYes = function(){
            var PHID = $scope.purchaseheader;
            var supplier = "";
            var location = "";
            var RefCode = "";
            supplier = $scope.selectedSupplierValue;
            location = $scope.selectedLocationValue;
            RefCode = $scope.RefCode;
            var postdata="supplier_unique="+supplier;
            postdata+="&location_unique="+location;
            postdata+="&po="+RefCode;
            postdata+="&order_date="+$filter('date')(new Date($scope.order.setdate), 'yyyy-MM-dd HH:mm');
            postdata+="&status=1";
            var poststatus="status=1";
            posData.UpdatePD(PHID, poststatus)
            .success(function(phdata){
                posData.UpdatePH(PHID, postdata)
                    .success(function(pddata){
                        $scope.selectedLocationValue = $scope.storeid; //default
                        $scope.selectedSupplierValue = 0; //default
                        $scope.RefCode = ""; //default
                    });
            }).then(function(){
                $window.location.href = base_url+'backoffice/receiving';
            })
        }

        $scope.AskNo = function(){
            //$scope.selectedLocationValue = $scope.storeid; //Default
            //$scope.selectedSupplierValue = 0; //Default
            //$scope.RefCode = ""; //Default
            posData.DeletePD($scope.purchaseheader)
            .success(function(){
                var rows = $("#receiving-addnew").jqxDataTable('getRows');
                for (var i = 0; i < rows.length; i++) {
                    $http({
                        method: 'put',
                        url: api_url+'stock-quantity/delete/'+rows[i].unique
                    })
                }
            }).then(function(){
                posData.DeletePH($scope.purchaseheader)
                    .success(function(){
                        $scope.ask = {
                            message: ""
                        }
                        $scope.AskBox = false;
                        $window.location.href = base_url+"backoffice/receiving";
                    })
            })
        }

        $scope.receivingRowClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;
            $scope.selected = {
                pdunique: row.unique
            };
        };

        $scope.POItemDelYes = function(){
            var rowIndex = $scope.POItem.index;
            $("#receiving-addnew").jqxDataTable('deleteRow', rowIndex);
            var PDUnique = $scope.selected.pdunique;
            posData.DeletePDByUnique(PDUnique);
            posData.DeleteStock(PDUnique);
            poItemConfDialog.close();
        };

        $scope.POItemDelNo = function(){
            poItemConfDialog.close();
        };

        $scope.DeleteCancel = function(){
            $scope.ask = {
                message: ""
            }
            //$scope.AskBox = false;
            //$scope.primary_button = true;
			$window.location.href = base_url+'backoffice/receiving';
        }

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
    .directive('inventoryPurchase', function(){
        return {
            restrict: 'E',
            templateUrl: base_url + 'backoffice/receiving/inventory'
        };
    })
    .directive('podelConfirmation', function(){
        return {
            restrict: 'E',
            templateUrl: base_url+ 'backoffice/receiving/poitemdel'
        }
    })
    .directive('itemPopupInfo', function(){
        return {
            restrict: 'E',
            templateUrl: base_url + 'backoffice/receiving/poiteminfo'
        }
    })
})();
