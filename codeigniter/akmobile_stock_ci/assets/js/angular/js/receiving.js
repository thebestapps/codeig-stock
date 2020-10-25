(function() {
    //var base_url = "/app/";
    //var api_url = "http://ak1.akamaipos.com:1337/"; Commented by HD 01/11/2016
    //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {

        var addnewDialog;
        var inventoryDialog;
        var poItemConfDialog;

        $scope.DeletePOButton = false;
        $scope.CancelPOButton = false;
        $scope.DeleteBox = false;

        $scope.EditCancelPOButton = false;

        var DateInput = function(){
            $scope.Orderdatestring = 'MM/dd/yyyy';
            $scope.OrderdateInputSettings = {
                width: 150,
                height: 30
            };
        };
		
        $scope.order = {
            setdate: $filter('date')(new Date(), 'MM/dd/yyyy'),
        };

        /* Create New Dialog Popup */
        $scope.dialogAddNewSettings =
        {
            created: function(args)
            {
                addnewDialog = args.instance;
            },
            resizable: false,
            theme: 'darkblue',
            width: 300, height: 195,
            autoOpen: false,
            isModal: true,
            showCloseButton: false
        };
        /* End */


        /* Inventory Dialog Popup */
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
            showCloseButton: false
        };
        /* End */

        /* Create New Dialog Popup */
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
            showCloseButton: false
        };
        /* End */

        var inventory_preload = function(){
            $scope.receivingInventorySettings = {
                width: "100%",
                height: 400,
                sortable: true,
                pageable: true,
                pageSize: 20,
                pagerMode: 'advanced',
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
                    localdata: {}
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
        };

        /*
        var inventory_data = function(){
            var filtered_data = [];
            $http({
                method: 'get',
                url: api_url+'load-inventory'
            }).success(function(data) {
                //console.log("inv: " + data.rows[0].WWUnique)
                //iltered_data = JSON.stringify(data.rows);
                //console.log("invdata: " + JSON.stringify(data));
                $scope.receivingInventorySettings = {
                    width: "100%",
                    height: 400,
                    source: {
                        dataType: "json",
                        localdata: data.rows
                    }
                }
            }).then(function(){

            })
        };
        */

        var receiving_data = function () {
            $scope.receivingGridSettings = {
                width: "100%",
                height: 400,
                sortable: true,
                pageable: true,
                pageSize: 20,
                pagerMode: 'advanced',
                altRows: true,
                filterable: true,
                filterMode: 'simple',
                theme: 'fresh',
                source: {
                    dataType: "json",
                    dataFields: [
                        {name: 'unique', type: 'int'},
                        {name: 'po', type: 'string'},
                        {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                        {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                        {name: 'order_date', type: 'date'},
                        {name: 'status', type: 'int'}
                    ],
                    localdata: {}
                },
                columnsResize: true,
                columns: [
                    {text: 'ID', dataField: 'unique', width: '10%'},
                    {text: 'Ref Code', dataField: 'po', width: '20%'},
                    {text: 'Location', dataField: 'store', width: '20%'},
                    {text: 'Supplier', dataField: 'Supplier', width: '20%'},
                    {text: 'Date', dataField: 'order_date', width: '20%', cellsformat: 'd'},
                    {text: 'Status', dataField: 'status', width: "10%", align: "center", cellsalign: "center",
                        cellsRenderer: function (row, columnDataField, value) {
                            var stat = "";
                            if(value == 1){
                                stat = "<span class='alert-info'>On Hold</span>";
                            }else if(value == 2){
                                stat = "<span class='alert-success'>Complete</span>";
                            }
                            return stat;
                        }
                    }
                ]
            };
        };

        var displaydata = function(){
            $http({
                method: 'get',
                url: api_url + "purchaseheader",
            }).success(function (data) {
                $scope.receivingGridSettings = {
                    width: "100%",
                    height: 400,
                    source: {
                        dataType: "json",
                        dataFields: [
                            {name: 'unique', type: 'int'},
                            {name: 'po', type: 'string'},
                            {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                            {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                            {name: 'order_date', type: 'date'},
                            {name: 'status', type: 'int'}
                        ],
                        localdata: data
                    }
                };
            }).then(function(){
				setTimeout(function(){
					$("#receiving input.jqx-input-group-addon").focus();
				},1000);
            })
        };
        $scope.Item = {};

        var PurchaseOrder_preload = function(){
            $scope.receivingAddNewSettings = {
                width: "100%",
                height: 400,
                sortable: true,
                //pageable: true,
                //pageSize: 20,
                //pagerMode: 'advanced',
                altRows: true,
                theme: 'fresh',
                editable: true,
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
                        {name: 'item_cost', type: 'string'},
                        {name: 'ordered_cost', type: 'string'},
                        {name: 'received_cost', type: 'string'},
                        {name: 'status', type: 'int'},
                        {name: 'received_date', type: 'datetime'}
                    ],
                    localdata: {},
                    updateRow: function (rowid, rowdata, commit) {
                        var PDUnique = rowdata.unique;
                        var orderQty = rowdata.order_quantity;
                        var recvQty = rowdata.received_quantity;
                        var itemCost = rowdata.item_cost;
                        var ordered_cost = orderQty * itemCost;
                        var received_cost = recvQty * itemCost;
                        var status = rowdata.status;

                        /*
                         if(recvQty == orderQty){
                         var postdata="order_quantity="+ recvQty;
                         postdata+="&received_quantity="+ recvQty;
                         postdata+="&item_cost="+ itemCost;
                         postdata+="&extended_cost="+extCost;
                         }else if(recvQty < orderQty){
                         var postdata="received_quantity="+ recvQty;
                         postdata+="&order_quantity="+ orderQty;
                         postdata+="&item_cost="+ itemCost;
                         postdata+="&extended_cost="+extCost;
                         }else if(recvQty > orderQty){
                         var postdata="received_quantity="+ recvQty;
                         postdata+="&order_quantity="+ recvQty;
                         postdata+="&item_cost="+ itemCost;
                         postdata+="&extended_cost="+extCost;
                         }
                         */

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
                            reload_purchaseorder(PDUnique);
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
                    {text: 'Item', dataField: 'item_id', width: '8%', editable: false},
                    {text: 'Description', dataField: 'item_description', width: '18%', editable: false},
                    {text: 'Supplier Part', dataField: 'item_supplier_part', width: '14%', editable: false},
                    {text: 'Order', dataField: 'order_quantity', width: '8%', align: 'center', cellsAlign: 'center'},
                    {text: 'Received', dataField: 'received_quantity', width: '8%', align: 'center', cellsAlign: 'center'},
                    {text: 'Cost', dataField: 'item_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign:'right'},
                    {text: 'Ordered $', dataField: 'ordered_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
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
                            renderString += "<strong>Total: </strong>" + Total + "</div>";
                            return renderString;
                        }
                    },
                    {text: 'Received $', dataField: 'received_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
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
                                renderString += "<strong>Total: </strong>" + Total + "</div>";
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
                    {text: 'Receive', dataField: 'received_date', width: '15%', hidden: true}
                ]
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

        var reload_purchaseorder = function(phunique){
            $http({
                method: 'get',
                url: api_url+'purchasedetails-find/'+phunique
            }).success(function(data) {
                $scope.receivingAddNewSettings = {
                    width: "100%",
                    height: 400,
                    sortable: true,
                    //pageable: true,
                    //pageSize: 20,
                    //pagerMode: 'advanced',
                    altRows: true,
                    theme: 'fresh',
                    editable: true,
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
                            {name: 'item_cost', type: 'string'},
                            {name: 'ordered_cost', type: 'string'},
                            {name: 'received_cost', type: 'string'},
                            {name: 'status', type: 'int'},
                            {name: 'received_date', type: 'datetime'}
                        ],
                        localdata: data,
                        updateRow: function (rowid, rowdata, commit) {
                            //$("#receiving-addnew").jqxDataTable('setCellValue', 0, "extended_cost", rowdata.extended_cost * rowdata.order_quantity);
                            // synchronize with the server - send update command
                            var PDUnique = rowdata.unique;
                            var orderQty = rowdata.order_quantity;
                            var recvQty = rowdata.received_quantity;
                            var itemCost = rowdata.item_cost;
                            var ordered_cost = orderQty * itemCost;
                            var received_cost = recvQty * itemCost;
                            var status = rowdata.status;

                            /*
                            if(recvQty == orderQty){
                                var postdata="order_quantity="+ recvQty;
                                postdata+="&received_quantity="+ recvQty;
                                postdata+="&item_cost="+ itemCost;
                                postdata+="&extended_cost="+extCost;
                            }else if(recvQty < orderQty){
                                var postdata="received_quantity="+ recvQty;
                                postdata+="&order_quantity="+ orderQty;
                                postdata+="&item_cost="+ itemCost;
                                postdata+="&extended_cost="+extCost;
                            }else if(recvQty > orderQty){
                                var postdata="received_quantity="+ recvQty;
                                postdata+="&order_quantity="+ recvQty;
                                postdata+="&item_cost="+ itemCost;
                                postdata+="&extended_cost="+extCost;
                            }
                            */

                            var postdata="received_quantity="+ recvQty;
                            postdata+="&order_quantity="+ orderQty;
                            postdata+="&item_cost="+ itemCost;
                            postdata+="&ordered_cost="+ordered_cost;
                            postdata+="&received_cost="+received_cost;

                            posData.PurchasePDbyUnique(PDUnique, postdata)
                            .success(function(data){
                                if(recvQty > 1) {
                                    var postqty = "Quantity=" + recvQty;
                                    postqty += "&unit_cost=" + itemCost;
                                    posData.StockQtyUpdate(PDUnique, postqty);
                                }
                                commit(true);
                                reload_purchaseorder(phunique);
                                //$("#receiving-addnew").jqxDataTable('setCellValue', rowid, "extended_cost", rowdata.extended_cost * rowdata.order_quantity);
                            });
                        },
                        deleteRow: function (rowID, commit) {
                            // synchronize with the server - send delete command
                            // call commit with parameter true if the synchronization with the server is successful
                            // and with parameter false if the synchronization failed.
                            commit(true);
                        },
                    },
                    renderToolbar: function (toolBar) {
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
                        deleteButton.jqxButton({
                            cursor: "pointer",
                            disabled: true,
                            enableDefault: false,
                            height: 25,
                            width: 25
                        });
                        deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
                        deleteButton.jqxTooltip({position: 'bottom', content: "Delete"});
                        var updateButtons = function (action) {
                            switch (action) {
                                case "Select":
                                    deleteButton.jqxButton({disabled: false});
                                    break;
                                case "Unselect":
                                    deleteButton.jqxButton({disabled: true});
                                    break;
                                case "Edit":
                                    deleteButton.jqxButton({disabled: true});
                                    break;
                                case "End Edit":
                                    deleteButton.jqxButton({disabled: false});
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
                        {text: 'Item', dataField: 'item_id', width: '8%', editable: false,},
                        {text: 'Description', dataField: 'item_description', width: '18%', editable: false,},
                        {text: 'Supplier Part', dataField: 'item_supplier_part', width: '14%', editable: false,},
                        {text: 'Order', dataField: 'order_quantity', width: '8%', align: 'center', cellsAlign: 'center'},
                        {text: 'Received', dataField: 'received_quantity', width: '8%', align: 'center', cellsAlign: 'center'},
                        {text: 'Cost', dataField: 'item_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign:'right'},
                        {text: 'Ordered $', dataField: 'ordered_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
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
                                renderString += "<strong>Total: </strong>" + Total + "</div>";
                                return renderString;
                            }
                        },
                        {text: 'Received $', dataField: 'received_cost', width: '12%', cellsformat: 'F2', align: 'right', cellsAlign: 'right', editable: false,
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
                                renderString += "<strong>Total: </strong>" + Total + "</div>";
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
                        {text: 'Receive', dataField: 'received_date', width: '15%', hidden: true}
                    ]
                };
            })
        }

        $scope.receivingRowDoubleClick = function(event){
            $scope.primary_button = true;
            $scope.DeleteBox = false;
            $scope.AskBox = false;
            var args = event.args;
            var index = args.index;
            var row = args.row;
            var phunique = row.unique;
            var stattext = '';
            $scope.purchaseheader = {
                unique: row.unique
            };

            $window.location.href = base_url+'backoffice/receiving/purchase-order/edit/'+phunique;

            /*
            $http({
                method: 'get',
                url: api_url+'purchasedetails-find/'+phunique
            }).success(function(data){
                if(data.length !== 0) {
                    console.log(data[0]['purchase_header_unique'].location_unique);
                    $scope.selectedLocationValue = data[0]['purchase_header_unique'].location_unique;
                    $scope.selectedSupplierValue = data[0]['purchase_header_unique'].supplier_unique;
                    $scope.order = {
                        setdate: $filter('date')(new Date(data[0]['purchase_header_unique'].order_date), 'MM/dd/yyyy')
                    };
                    $scope.RefCode = data[0]['purchase_header_unique'].po;
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
                                {name: 'item_cost', type: 'string'},
                                {name: 'ordered_cost', type: 'string'},
                                {name: 'received_cost', type: 'string'},
                                {name: 'status', type: 'int'},
                                {name: 'received_date', type: 'datetime'}
                            ],
                            localdata: data,
                            updateRow: function (rowid, rowdata, commit) {
                                //$("#receiving-addnew").jqxDataTable('setCellValue', 0, "extended_cost", rowdata.extended_cost * rowdata.order_quantity);
                                // synchronize with the server - send update command
                                var PDUnique = rowdata.unique;
                                var orderQty = rowdata.order_quantity;
                                var recvQty = rowdata.received_quantity;
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
                                    reload_purchaseorder(phunique);
                                });
                            }
                        },
                    };
                }else{
                    $http({
                        method: 'get',
                        url: api_url+'purchaseheader-find/'+phunique
                    }).success(function(data){
                        $scope.selectedLocationValue = data[0].location_unique;
                        $scope.selectedSupplierValue = data[0].supplier_unique;
                        $scope.order = {
                            setdate: $filter('date')(new Date(data[0].order_date), 'MM/dd/yyyy')
                        };
                        $scope.RefCode = data[0].po;
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
                                    {name: 'item_cost', type: 'string'},
                                    {name: 'ordered_cost', type: 'string'},
                                    {name: 'received_cost', type: 'string'},
                                    {name: 'status', type: 'int'},
                                    {name: 'received_date', type: 'datetime'}
                                ],
                                localdata: {}
                            },

                        };
                    })
                }
            })
            $http({
                method: 'get',
                url: api_url+'purchaseheader-find/'+phunique
            }).success(function(data){
                var stat = data[0].status;
                if (stat == 1) {
                    stattext = "<span class='btn-warning'>On Hold</span>";
                    $scope.OnHoldButton = false;
                } else if (stat == 2) {
                    stattext = "<span class='btn-success'>Complete</span>";
                    $scope.OnHoldButton = true;
                }
                addnewDialog.setTitle("Purchase Order | " + phunique + "| " + stattext);
                addnewDialog.open();
            })
             */
        };


        $scope.receivingRowClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;
            $scope.selected = {
                pdunique: row.unique
            };
        };

        var supplier_source_empty = {
            datatype: "json",
            datafields: [
                { name: 'Unique' },
                { name: 'Company'}
            ],
            url: {}
        };
        $scope.comboBoxSupplierSettings = {selectedIndex: 5, source: supplier_source_empty,  displayMember: "Company", valueMember: "Unique", width: 150, height: 30};
        $scope.selectHandlerSupplier = function (event) {
            if (event.args) {
                var item = event.args.item;
                if (item) {
                   $scope.selectedSupplierValue = item.value
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
            }).error(function(){
                alert("Server is not running");
            })
        };

        var Stores = function(){
            $http({
                method: 'get',
                url: api_url+'load-stores'
            }).success(function(data){
                var Stores = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'LocationName'}
                    ],
                    localdata: data,
                    async: false
                };
                $scope.comboBoxLocationSettings = {source: Stores, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 30};
            }).then(function(){

            })

        };

        /*Remove All Location Null in Purchase Header*/
        posData.RemoveTrash()
        .success(function(data){
          console.log(data);
        }).then(function(){
            displaydata();
        });
        /************ Loading Variable **********/
        /**/      DateInput();                 /**/
        /**/      inventory_preload();        /**/
        /**/      //inventory_data();           /**/
        /**/      receiving_data();           /**/
        /**/      PurchaseOrder_preload();    /**/
        /**/      Supplier();                 /**/
        /**/      Stores();                   /**/
        /*                                      */
        /*                                      */
        /*************    END     ***************/


        $scope.HomeScreen = function(){
            var dashboard = base_url + "backoffice/dashboard";
            window.location = dashboard;
        };

        $scope.CreateNew = function(){
            $scope.EditCancelPOButton = false;
            $scope.primary_button = true;
            $scope.DeleteBox = false;
            $scope.AskBox = false;
            $scope.CancelPOButton = true;
            $scope.OnHoldButton = false;
            $scope.DeletePOButton = false;
            $scope.selectedLocationValue = $scope.storeid;
            $scope.selectedSupplierValue = 0;
            $scope.RefCode = "";
            var userid = $scope.userid;
            var postdata="status=0";
                postdata+="&order_date="+$filter('date')(new Date(), 'yyyy-MM-dd');
                postdata+="&created_by="+userid;
            console.log(userid);
            posData.SavePurchaseHeader(postdata)
            .success(function(data){
                /*
                $scope.purchaseheader = {
                    unique: data.unique
                };

                $scope.receivingAddNewSettings = {
                    showToolbar: false,
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
                            {name: 'item_cost', type: 'string'},
                            {name: 'ordered_cost', type: 'string'},
                            {name: 'received_cost', type: 'string'},
                            {name: 'status', type: 'int'},
                            {name: 'received_date', type: 'datetime'}
                        ],
                        localdata: {}
                    }
                };
                addnewDialog.setTitle("Purchase Orders");
                addnewDialog.open();
                */
                $window.location.href = base_url+"backoffice/receiving/purchase-order/add/"+data.unique;
            });
            /*
            addnewDialog.setTitle("Purchase Orders");
            addnewDialog.open();
            */
        };

        $scope.SavePO = function(){
            var ifopen = $scope.dialogAddNewSettings.jqxWindow("isOpen");
            if(ifopen){
                var PHID = $scope.purchaseheader.unique;
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

                    posData.UpdatePH(PHID, postdata)
                    .success(function(pddata){
                        $scope.selectedLocationValue = $scope.storeid;
                        $scope.selectedSupplierValue = 1;
                        $scope.RefCode = "";
                        for (var i = 0; i < rows.length; i++) {
                            var postdata="purchase_details_unique="+rows[i].unique;
                            postdata+="&ItemUnique="+rows[i].item_unique;
                            postdata+="&LocationUnique="+$scope.selectedLocationValue;
                            postdata+="&Type=3";
                            postdata+="&Quantity="+rows[i].order_quantity;
                            postdata+="&CreatedBy="+$scope.selectedLocationValue;
                            postdata+="&unit_cost="+rows[i].item_cost;
                            postdata+="&TransactionDate="+$filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
                            postdata+="&status=1";
                            console.log("Received Qty = "+rows[i].received_quantity);
                            if(rows[i].status == 1 && rows[i].received_quantity > 0){
                                $http({
                                    method: 'post',
                                    url: api_url+'stock-quantity/add',
                                    data: postdata,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                });
                                var postdate="received_date="+$filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
                                postdate+="&status=2";
                                $http({
                                    method: 'put',
                                    url: api_url+'purchasepd/update-by-unique/'+rows[i].unique,
                                    data: postdate,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                });
                            }
                        }
                    }).then(function(){
                        console.log("PHU: "+PHID+" GridCount: "+RowCount+"");
                        setTimeout(function(){
                            $http({
                                method: 'get',
                                url: api_url+'purchasepd/count/complete/status/'+PHID
                            }).success(function(data){
                                var ActualCount = data.rows[0].completed;
                                var postdata="&status=2";
                                console.log("Count: "+ActualCount);
                                if(RowCount == ActualCount){
                                    posData.UpdatePH(PHID, postdata)
                                    .success(function(){
                                        displaydata();
                                        addnewDialog.close();
                                    })
                                }else{
                                    var postdata="&status=1";
                                    posData.UpdatePH(PHID, postdata)
                                    .success(function(){
                                        displaydata();
                                        addnewDialog.close();
                                    })
                                }
                            })
                        }, 500)
                    })
            }

        };

        $scope.CancelPO = function(){
            $scope.ask = {
                message: "Would you like to save your changes?"
            }
            $scope.AskBox = true;
            $scope.primary_button = false;
        };

        $scope.AskYes = function(){
            var ifopen = $scope.dialogAddNewSettings.jqxWindow("isOpen");
            if(ifopen){
                var PHID = $scope.purchaseheader.unique;
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
                                $scope.selectedLocationValue = $scope.storeid;
                                $scope.selectedSupplierValue = 1;
                                $scope.RefCode = "";
                                console.log("Purchase Header: "+pddata);
                                displaydata();
                            });
                    });
            }
            $scope.ask = {
                message: ""
            }
            $scope.AskBox = false;
            addnewDialog.close();
        }

        $scope.AskNo = function(){
            $scope.selectedLocationValue = $scope.storeid;
            $scope.selectedSupplierValue = 1;
            $scope.RefCode = "";
            posData.DeletePD($scope.purchaseheader.unique);
            posData.DeletePH($scope.purchaseheader.unique);
            $scope.ask = {
                message: ""
            }
            $scope.AskBox = false;
            addnewDialog.close();
        }

        $scope.EditCancelPO = function(){
            $scope.selectedLocationValue = $scope.storeid;
            $scope.selectedSupplierValue = 1;
            $scope.RefCode = "";
            addnewDialog.close();
        };

        $scope.DeletePO = function(){
            $scope.primary_button = false;
            $scope.DeleteBox = true;
            $scope.delete = {
                message: "Are you sure you want to delete Purchase Order "+$scope.purchaseheader.unique+"?"
            }
        };

        $scope.DeleteYes = function(){
            var POUnique = $scope.purchaseheader.unique;
            $http({
                method: 'put',
                url: api_url+'purchaseph/delete/'+POUnique
            }).success(function(phdata){
                $http({
                    method: 'put',
                    url: api_url+'purchasepd/delete/'+POUnique
                }).success(function(pddata){
                    var rows = $("#receiving-addnew").jqxDataTable('getRows');
                    for (var i = 0; i < rows.length; i++) {
                        $http({
                            method: 'put',
                            url: api_url+'stock-quantity/delete/'+rows[i].unique
                        })
                    }
                    $scope.selectedLocationValue = $scope.storeid;
                    $scope.selectedSupplierValue = 1;
                    $scope.RefCode = "";
                    $scope.order = {
                        setdate: $filter('date')(new Date(), 'MM/dd/yyyy')
                    };
                    $http({
                        method: 'get',
                        url: api_url+'purchaseheader'
                    }).success(function(data){
                        $scope.receivingGridSettings = {
                            source: {
                                dataType: "json",
                                dataFields: [
                                    {name: 'unique', type: 'int'},
                                    {name: 'po', type: 'string'},
                                    {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                                    {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                                    {name: 'order_date', type: 'date'},
                                    {name: 'status', type: 'int'}
                                ],
                                localdata: data
                            }
                        };
                        $scope.DeleteBox = false;
                        $scope.delete = {
                            message: ""
                        }
                    });
                    addnewDialog.close();
                })
            })
        };

        $scope.DeleteNo = function(){
            $scope.delete = {
                message: ""
            };
            $scope.primary_button = true;
            $scope.DeleteBox = false;
        };


        $scope.PickItem = function(){
            var userid = $scope.userid;
            var purchase_header_unique =  $scope.purchaseheader.unique;
            var InvUnique = $scope.inventory.unique;
            var Description = $scope.inventory.description;
            //var SuppUnique = $scope.inventory.supplierunique;
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
                postdata+="&ordered_cost="+Cost * 1;
                postdata+="&received_cost=0";
                postdata+="&received_quantity=0";
                postdata+="&order_quantity=1";
                postdata+="&status=1";
                postdata+="&created_by="+userid;
                //postdata+="&received_date="+$filter('date')(new Date(), 'yyyy-MM-dd HH:mm');

            posData.SaveSelectedItem(postdata)
            .success(function(data){
                $http({
                    method: 'get',
                    url: api_url+'purchasedetails-find/'+purchase_header_unique
                }).success(function(pddata){
                    reload_purchaseorder(purchase_header_unique);
                });
                inventoryDialog.close();
                console.log(data);
            })
        };

        $scope.CancelInventory = function(){
            inventoryDialog.close();
        };

        $scope.SearchItemButton = function(){
            //$("#receiving-addnew").jqxDataTable('refresh');
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
                                pagerMode: 'advanced',
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
                            var purchase_header_unique =  $scope.purchaseheader.unique;
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
                        pagerMode: 'advanced',
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
                })
            }
        };

        $scope.InventoryRowDoubleClick = function(event){
            var args = event.args;
            var index = args.index;
            var row = args.row;

            var userid = $scope.userid;
            var purchase_header_unique =  $scope.purchaseheader.unique;
            var InvUnique = row.Unique;
            var Description = row.Description;
            //var SuppUnique = $scope.inventory.supplierunique;
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
            postdata+="&ordered_cost="+Cost * 1;
            postdata+="&received_cost=0";
            postdata+="&received_quantity=0";
            postdata+="&order_quantity=1";
            postdata+="&status=1";
            postdata+="&created_by="+userid;
            //postdata+="&received_date="+$filter('date')(new Date(), 'yyyy-MM-dd HH:mm');

            posData.SaveSelectedItem(postdata)
                .success(function(data){
                    $http({
                        method: 'get',
                        url: api_url+'purchasedetails-find/'+purchase_header_unique
                    }).success(function(pddata){
                        reload_purchaseorder(purchase_header_unique);
                    });
                }).then(function(){
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

        $scope.EnterItemSearch = function(){
            //$("#receiving-addnew").jqxDataTable('refresh');
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
                                pagerMode: 'advanced',
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
                            var purchase_header_unique =  $scope.purchaseheader.unique;
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

        /*
        $scope.OnHold = function(){
            var open = $scope.dialogAddNewSettings.jqxWindow("isOpen");
            if(open){
                var PHID = $scope.purchaseheader.unique;
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
                        $scope.selectedLocationValue = $scope.storeid;
                        $scope.selectedSupplierValue = 1;
                        $scope.RefCode = "";
                        $http({
                            method: 'get',
                            url: api_url+'purchaseheader'
                        }).success(function(data){
                            $scope.receivingGridSettings = {
                                source: {
                                    dataType: "json",
                                    dataFields: [
                                        {name: 'unique', type: 'int'},
                                        {name: 'po', type: 'string'},
                                        {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                                        {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                                        {name: 'order_date', type: 'date'},
                                        {name: 'status', type: 'int'}
                                    ],
                                    localdata: data
                                }
                            };
                            addnewDialog.close();
                        })
                    })
                })
            }
        };
        */

        $scope.PurchaseHeaderShowAll = function(){
           $http({
               method: 'get',
               url: api_url+'purchaseheader'
           }).success(function(data){
               $scope.receivingGridSettings = {
                   source: {
                       dataType: "json",
                       dataFields: [
                           {name: 'unique', type: 'int'},
                           {name: 'po', type: 'string'},
                           {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                           {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                           {name: 'order_date', type: 'date'},
                           {name: 'status', type: 'int'}
                       ],
                       localdata: data
                   }
               }
           }).then(function(){
			   setTimeout(function(){
					$("#receiving input.jqx-input-group-addon").focus();
			   },1000);	  
		   })
        };

        $scope.OnHoldStatus = function(){
            $http({
                method: 'get',
                url: api_url+'purchaseheader-status/1'
            }).success(function(data){
                $scope.receivingGridSettings = {
                    source: {
                        dataType: "json",
                        dataFields: [
                            {name: 'unique', type: 'int'},
                            {name: 'po', type: 'string'},
                            {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                            {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                            {name: 'order_date', type: 'date'},
                            {name: 'status', type: 'int'}
                        ],
                        localdata: data
                    }
                }
            }).then(function(){
				setTimeout(function(){
					$("#receiving input.jqx-input-group-addon").focus();
			    },1000);
			})
        };

        $scope.CompleteStatus = function(){
            $http({
                method: 'get',
                url: api_url+'purchaseheader-status/2'
            }).success(function(data){
                $scope.receivingGridSettings = {
                    source: {
                        dataType: "json",
                        dataFields: [
                            {name: 'unique', type: 'int'},
                            {name: 'po', type: 'string'},
                            {name: 'store', map: 'location_unique>LocationName', type: 'string'},
                            {name: 'Supplier', map: 'supplier_unique>Company', type: 'string'},
                            {name: 'order_date', type: 'date'},
                            {name: 'status', type: 'int'}
                        ],
                        localdata: data
                    }
                }
            }).then(function(){
				setTimeout(function(){
					$("#receiving input.jqx-input-group-addon").focus();
			    },1000);
			})
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
       /*
    .directive('addnewPurchase', function(){
        return {
            restrict: 'E',
            templateUrl: base_url + 'backoffice/receiving/add-new'
        };
    })
    */
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
})();
