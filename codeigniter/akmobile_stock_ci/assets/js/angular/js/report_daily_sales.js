(function() {
    angular.module("ReportDailySalesApp", ['ngRoute','ngSanitize'])
    .service('svc',function(){})
    .controller("ReportDailySalesController",['$scope', '$http', 'svc', '$q', '$routeParams', '$window', 'DailySalesData', '$compile', '$rootScope',  function ($scope, $http, svc, $q, $routeParams, $window, schedulerData, $compile, $rootScope) {
        $scope.RedirectDashboard = function(){
            $window.location = base_url + 'pos/cashier';
        }

        var CurrentLocation = $("#CurrentLocation").val();

        var location_source = {
            datatype: "json",
            datafields: [
                {name: "Unique"},
                {name: "Name"}
            ],
            localdata: LocationList
        }

        var dataAdapter = new $.jqx.dataAdapter(location_source);
        $("#Locations").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Location", width: 250, height: 30, displayMember: "Name", valueMember: "Unique", checkboxes: true});
        $("#Locations").jqxDropDownList('checkItem', CurrentLocation);
        
        var StatusData = [
            { ID: 1, Status: 'Today'},
            { ID: 2, Status: 'Yesterday' },
            { ID: 3, Status: 'This Year Week-to-date' },
            { ID: 4, Status: 'Last Week' },
            { ID: 17, Status: 'Current Pay Period'},
            { ID: 18, Status: 'Last Pay Period'},
            { ID: 5, Status: 'Week Before Last' },
            { ID: 6, Status: 'This Year Month-to-date' },
            { ID: 7, Status: 'Last Month' },
            { ID: 8, Status: 'Last 30 Days' },
            { ID: 9, Status: 'Last 60 Days' },
            { ID: 10, Status: 'Last 90 Days' },
            { ID: 11, Status: 'This Year Year-to-date' },
            { ID: 12, Status: 'Last Year Today' },
            { ID: 13, Status: 'Last Year Week-to-date' },
            { ID: 14, Status: 'Last Year Month-to-date' },
            { ID: 15, Status: 'Last Year Year-to-date' },
            { ID: 16, Status: 'All' },
        ];
        var dataAdapter = new $.jqx.dataAdapter(StatusData);
        $("#dateRange").jqxDropDownList({ source: StatusData, placeHolder: "Select Range", width: 250, height: 30, displayMember: "Status", valueMember: "ID"})
        $("#dateRange").val(1); //Default Today
        
        setTimeout(function(){
            $("#SubmitDateRange").trigger('click');
        },100);

        var SalesSummaryGrid = function(data){
            var source = {
                datatype: 'json',
                datafields: [
                    {name: 'Location', type: 'string'},
                    {name: 'NetSales', type: 'float'},
                    {name: 'ServiceCharge', type: 'float'},
                    {name: 'Tax', type: 'float'},
                    {name: 'Revenue', type: 'float'}
                ],
                localdata: data
            }

            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#SalesSummary").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Location', datafield: 'Location', columngroup: 'SalesSummary', width: '10%'},
                    {text: 'Net Sales', datafield: 'NetSales', columngroup: 'SalesSummary', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    {text: 'Service Charge', datafield: 'ServiceCharge', columngroup: 'SalesSummary', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    {text: 'Tax', datafield: 'Tax', columngroup: 'SalesSummary', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    {text: 'Revenue', datafield: 'Revenue', columngroup: 'SalesSummary', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ],
                columngroups: [
                    {text: 'Sales Summary', align: 'left', name: 'SalesSummary'}
                ]
            })

            // $("#SalesSummary").jqxGrid('autoresizecolumns');
        }

        var OrderTypeGrid = function(data){
            var NetSalesData = [];
            var TotalNetSales = 0;
            
            $.when.apply($, data.map(function(value) {
                var NetSales = parseFloat(value.NetSales);
                TotalNetSales += NetSales;
            })).done(function(){
                $.when.apply($, data.map(function(value) {
                    var SalesPercent = (value.NetSales / TotalNetSales * 100);
                    
                    NetSalesData.push({"Location" : value.Location, "OrderType" : value.OrderType, "Guests" : value.Guests, "NetSales" : value.NetSales, "SalesPercent" : parseFloat(SalesPercent) });
                })).done(function(){
                    var source = {
                        datatype: 'json',
                        datafields: [
                            {name: 'Location', type: 'string'},
                            {name: 'OrderType', type: 'string'},
                            {name: 'Guests', type: 'int'},
                            {name: 'SalesPercent', type: 'float'},
                            {name: 'NetSales', type: 'float'},
                        ],
                        localdata: NetSalesData
                    }
                    
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#OrderType").jqxGrid({
                        source: dataAdapter,
                        width: '100%',
                        autoheight: true,
                        theme: 'darkblue',
                        altRows: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        columns: [
                            {text: 'Location', datafield: 'Location', columngroup: 'ordertype', width: '10%'},
                            {text: 'Type', datafield: 'OrderType', columngroup: 'ordertype', width: '10%'},
                            {text: 'Guests', datafield: 'Guests', columngroup: 'ordertype', align: 'center', cellsalign: 'center', width: '10%',  cellsformat: 'd0',
                                aggregates: [{
                                    'Total': function (aggregatedValue, currentValue, column, record) {
                                        var total = currentValue;
                                        var returnTotal = 0;
                                        returnTotal = aggregatedValue + total;
                                        return returnTotal;
                                    }
                                }],
                                aggregatesRenderer: function (aggregates, column, element) {
                                    var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                                    var Total=parseFloat(0).toFixed(2);
                                    if(aggregates.Total){
                                        Total = aggregates.Total;
                                    }
                                    renderString += Total + "</div>";
                                    return renderString;
                                } 
                            },
                            {text: 'Sales %', datafield: 'SalesPercent', columngroup: 'ordertype', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                                aggregates: [{
                                    'Total': function (aggregatedValue, currentValue, column, record) {
                                        var total = currentValue;
                                        var returnTotal = 0;
                                        returnTotal = aggregatedValue + total;
                                        return returnTotal;
                                    }
                                }],
                                aggregatesRenderer: function (aggregates, column, element) {
                                    var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                                    var Total=parseFloat(0).toFixed(2);
                                    if(aggregates.Total){
                                        Total = aggregates.Total;
                                    }
                                    renderString += Total + "</div>";
                                    return renderString;
                                } 
                            },
                            {text: 'Net Sales', datafield: 'NetSales', columngroup: 'ordertype', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                                aggregates: [{
                                    'Total': function (aggregatedValue, currentValue, column, record) {
                                        var total = currentValue;
                                        var returnTotal = 0;
                                        returnTotal = aggregatedValue + total;
                                        return returnTotal;
                                    }
                                }],
                                aggregatesRenderer: function (aggregates, column, element) {
                                    var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                                    var Total=parseFloat(0).toFixed(2);
                                    if(aggregates.Total){
                                        Total = aggregates.Total;
                                    }
                                    renderString += Total + "</div>";
                                    return renderString;
                                } 
                            }
                        ],
                        columngroups: [
                            {text: 'Order Type', align: 'left', name: 'ordertype'}
                        ]
                    })
                })
            })

            // $("#OrderType").jqxGrid('autoresizecolumns');
        }
        
        var CategorySalesGrid = function(data){
            var source = {
                datatype: 'json',
                datafield: [
                    {name: 'Location', type: 'string'},
                    {name: 'Category', type: 'string'},
                    {name: 'Quantity', type: 'int'},
                    {name: 'Sales', type: 'float'}
                ],
                localdata: data
            }

            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#CategorySales").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Location', datafield: 'Location', columngroup: 'categorysales', width: '12.5%'},
                    {text: 'Category', datafield: 'Category', columngroup: 'categorysales', width: '12.5%'},
                    {text: 'Quantity', datafield: 'Quantity', columngroup: 'categorysales', align: 'center', cellsalign: 'center', width: '12.5%',  cellsformat: 'd0', 
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    {text: 'Sales', datafield: 'Sales', columngroup: 'categorysales', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '12.5%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ],
                columngroups: [
                    {text: 'Category Sales', align: 'left', name: 'categorysales'}
                ]
            })

            // $("#CategorySales").jqxGrid('autoresizecolumns');
        }


        var CategorySalesTypeGrid = function(data){
            var source = {
                dataype: 'json',
                datafield: [
                    {name: 'Location', type: 'string'},
                    {name: 'Type', type: 'string'},
                    {name: 'Category', type: 'string'},
                    {name: 'Quantity', type: 'string'},
                    {name: 'Sales', type: 'string'}
                ],
                localdata: data
            }

            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#CategorySalesType").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Location', datafield: 'Location', columngroup: 'categorysalestype', width: '10%'},
                    {text: 'Type', datafield: 'Type', columngroup: 'categorysalestype', width: '10%'},
                    {text: 'Category', datafield: 'Category', columngroup: 'categorysalestype', align: 'left', cellsalign: 'left', width: '10%'},
                    {text: 'Quantity', datafield: 'Quantity', columngroup: 'categorysalestype', align: 'center', cellsalign: 'center', width: '10%',  cellsformat: 'd0', 
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    {text: 'Sales', datafield: 'Sales', columngroup: 'categorysalestype', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ],
                columngroups: [
                    {text: 'Category Sales Type', align: 'left', name: 'categorysalestype'}
                ]
            })

        }

        var PaymentSummaryGrid = function(data){
            var source = {
                datatype: 'json',
                datafield: [
                    {name: 'Location', type: 'string'},
                    {name: 'Payment', type: 'float'},
                    {name: 'Paid', type: 'float'}
                ],
                localdata: data
            }
            
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#PaymentSummary").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Location', datafield: 'Location', columngroup: 'paymentsummary', width: '16.66%'},
                    {text: 'Payment', datafield: 'Payment', columngroup: 'paymentsummary', width: '16.66%'},
                    {text: 'Paid', datafield: 'Paid', columngroup: 'paymentsummary', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '16.66%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ],
                columngroups: [
                    {text: 'Payment Summary', align: 'left', name: 'paymentsummary'}
                ]
            })

            // $("#PaymentSummary").jqxGrid('autoresizecolumns');
        }

        var PaymentCardTypeSummaryGrid = function(data){
            var source = {
                datatype: 'json',
                datafield: [
                    {name: 'Location', type: 'string'},
                    {name: 'Type', type: 'string'},
                    {name: 'Amount', type: 'float'}
                ],
                localdata: data
            }

            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#PaymentCardTypeSummary").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Location', datafield: 'Location', columngroup: 'paymentcardtype', width: '16.66%'},
                    {text: 'Type', datafield: 'Type', columngroup: 'paymentcardtype', width: '16.66%'},
                    {text: 'Amount', datafield: 'Amount', columngroup: 'paymentcardtype', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '16.66%',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ],
                columngroups: [
                    {text: 'Payment Card Types', align: 'left', name: 'paymentcardtype'}
                ]
            })

            // $("#PaymentCardTypeSummary").jqxGrid('autoresizecolumns');
        }

        $("#SubmitDateRange").on('click', function(e){
            e.preventDefault();
            var FakeHeight = $("#fakeheight").height();
            var HeaderTopHeight = $(".navbar").height();
            var MenuTopHeight = $(".navbar").height();
            var NewTopHeight = (HeaderTopHeight + MenuTopHeight);
            var UseHeight = (FakeHeight - NewTopHeight - 60);
                NewTopHeight = (UseHeight);

            $(".grid_container").css('height', NewTopHeight+'px');

            var postdata ="StartDate="+$("#calendar_From").val();
                postdata+="&EndDate="+$("#calendar_To").val();
                postdata+="&Location="+$("#Locations").val();

            $.ajax({
                url: base_url + 'backoffice/reports/dailysales-data',
                dataType: 'json',
                type: 'post',
                data: postdata,
                success: function(data){
                    SalesSummaryGrid(data.SalesSummary);
                    OrderTypeGrid(data.OrderType);
                    CategorySalesGrid(data.CategorySales);
                    CategorySalesTypeGrid(data.CategorySalesType);
                    PaymentSummaryGrid(data.PaymentSummary);
                    PaymentCardTypeSummaryGrid(data.PaymentCardType);
                }
            })
        })

        var WindowPopup = function(elemId) {
            var ButtonOkay, ButtonCancel = '';
            if(elemId == 'jqxprint'){
                ButtonOkay = 'PrintPDF';
                ButtonCancel = 'PrintEXCEL';
            }else if(elemId == 'jqxprint1'){
                ButtonOkay = 'EmailPDF';
                ButtonCancel = 'EmailEXCEL';
            }
    
            $('#'+elemId).jqxWindow({
                width		: 330,
                height		: 170,
                theme		: 'darkblue',
                isModal		: true,
                resizable	: false,
                autoOpen	: false,
                draggable   : false,
                okButton	: ButtonOkay,
                cancelButton: ButtonCancel,
                initContent	: function (id) {
                    $('#'+ButtonOkay).jqxButton({
                        width: '90px',
                        height:'48px',
                        theme: 'energyblue'
                    });

                    $('#'+ButtonCancel).jqxButton({
                        width: '90px',
                        height:'48px',
                        theme: 'energyblue'
                    });
                    $('#PrintPDF').focus();
                }
            });
            $('#'+elemId).jqxWindow('open');
        }

        $(document).on("click", "#PrintIcon", function(event){
            WindowPopup('jqxprint');
			return false;
        });

        $("#PrintEXCEL").on('click', function(e){
            var checkedItems = []; 
            var items = $("#Locations").jqxDropDownList('getCheckedItems'); 
            $.each(items, function (index) {
                checkedItems.push(this.label);
            });
            
            var data = []; 
            var SalesSummary            = $("#SalesSummary").jqxGrid('getrows');
            var OrderType               = $("#OrderType").jqxGrid('getrows');
            var CategorySales           = $("#CategorySales").jqxGrid('getrows');
            var CategorySalesType       = $("#CategorySalesType").jqxGrid('getrows');
            var PaymentSummary          = $("#PaymentSummary").jqxGrid('getrows');
            var PaymentCardTypeSummary  = $("#PaymentCardTypeSummary").jqxGrid('getrows');

            data.push({
                "SalesSummary" : SalesSummary, 
                "OrderType" : OrderType, 
                "CategorySales" : CategorySales, 
                "CategorySalesType":  CategorySalesType, 
                "PaymentSummary": PaymentSummary,
                "PaymentCardTypeSummary" : PaymentCardTypeSummary
            })

            var postdata ="grid_data="+JSON.stringify(data);
                postdata+="&StartDate="+$("#calendar_From").val();
                postdata+="&EndDate="+$("#calendar_To").val();
                postdata+="&Title=Daily Sales Report";
                postdata+="&LocationName="+checkedItems;
                postdata+="&Email=false"
            $.ajax({
                url: base_url + 'backoffice/reports/dailysales/export-excel',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    window.location = (base_url + 'backoffice/reports/dailysales/download-report');
                    $('#jqxprint').jqxWindow('close');
                }
            })
        })

        $("#EmailEXCEL").on('click', function(e){
            var checkedItems = []; 
            var items = $("#Locations").jqxDropDownList('getCheckedItems'); 
            $.each(items, function (index) {
                checkedItems.push(this.label);
            });
            
            var data = []; 
            var SalesSummary            = $("#SalesSummary").jqxGrid('getrows');
            var OrderType               = $("#OrderType").jqxGrid('getrows');
            var CategorySales           = $("#CategorySales").jqxGrid('getrows');
            var CategorySalesType       = $("#CategorySalesType").jqxGrid('getrows');
            var PaymentSummary          = $("#PaymentSummary").jqxGrid('getrows');
            var PaymentCardTypeSummary  = $("#PaymentCardTypeSummary").jqxGrid('getrows');

            data.push({
                "SalesSummary" : SalesSummary, 
                "OrderType" : OrderType, 
                "CategorySales" : CategorySales,
                "CategorySalesType":  CategorySalesType, 
                "PaymentSummary": PaymentSummary,
                "PaymentCardTypeSummary" : PaymentCardTypeSummary
            })

            var postdata ="grid_data="+JSON.stringify(data);
                postdata+="&StartDate="+$("#calendar_From").val();
                postdata+="&EndDate="+$("#calendar_To").val();
                postdata+="&Title=Daily Sales Report";
                postdata+="&LocationName="+checkedItems;
                postdata+="&Email=true";
            $.ajax({
                url: base_url + 'backoffice/reports/dailysales/export-excel',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    window.location = (base_url + 'backoffice/reports/email');
                    $('#jqxprint').jqxWindow('close');
                }
            })
        })
        
        $("#PrintPDF").on('click', function(e){
            var checkedItems = []; 
            var items = $("#Locations").jqxDropDownList('getCheckedItems'); 
            $.each(items, function (index) {
                checkedItems.push(this.label);
            });
            
            var data = []; 
            var SalesSummary            = $("#SalesSummary").jqxGrid('getrows');
            var OrderType               = $("#OrderType").jqxGrid('getrows');
            var CategorySales           = $("#CategorySales").jqxGrid('getrows');
            var CategorySalesType       = $("#CategorySalesType").jqxGrid('getrows');
            var PaymentSummary          = $("#PaymentSummary").jqxGrid('getrows');
            var PaymentCardTypeSummary  = $("#PaymentCardTypeSummary").jqxGrid('getrows');

            data.push({
                "SalesSummary" : SalesSummary, 
                "OrderType" : OrderType, 
                "CategorySales" : CategorySales,
                "CategorySalesType":  CategorySalesType,
                "PaymentSummary": PaymentSummary,
                "PaymentCardTypeSummary" : PaymentCardTypeSummary
            })

            var postdata ="grid_data="+JSON.stringify(data);
                postdata+="&StartDate="+$("#calendar_From").val();
                postdata+="&EndDate="+$("#calendar_To").val();
                postdata+="&Title=Daily Sales Report";
                postdata+="&LocationName="+checkedItems;
                postdata+="&Email=false";
            $.ajax({
                url: base_url + 'backoffice/reports/dailysales/export-pdf',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    window.location = (base_url + 'backoffice/reports/dailysales/download-report');
                    $('#jqxprint').jqxWindow('close');
                }
            })
        })

        $("#EmailPDF").on('click', function(){
            var checkedItems = []; 
            var items = $("#Locations").jqxDropDownList('getCheckedItems'); 
            $.each(items, function (index) {
                checkedItems.push(this.label);
            });
            
            var data = []; 
            var SalesSummary            = $("#SalesSummary").jqxGrid('getrows');
            var OrderType               = $("#OrderType").jqxGrid('getrows');
            var CategorySales           = $("#CategorySales").jqxGrid('getrows');
            var CategorySalesType       = $("#CategorySalesType").jqxGrid('getrows');
            var PaymentSummary          = $("#PaymentSummary").jqxGrid('getrows');
            var PaymentCardTypeSummary  = $("#PaymentCardTypeSummary").jqxGrid('getrows');

            data.push({
                "SalesSummary" : SalesSummary, 
                "OrderType" : OrderType, 
                "CategorySales" : CategorySales, 
                "CategorySalesType": CategorySalesType,
                "PaymentSummary": PaymentSummary,
                "PaymentCardTypeSummary" : PaymentCardTypeSummary
            })

            var postdata ="grid_data="+JSON.stringify(data);
                postdata+="&StartDate="+$("#calendar_From").val();
                postdata+="&EndDate="+$("#calendar_To").val();
                postdata+="&Title=Daily Sales Report";
                postdata+="&LocationName="+checkedItems;
                postdata+="&Email=true";
            $.ajax({
                url: base_url + 'backoffice/reports/dailysales/export-pdf',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    window.location = (base_url + 'backoffice/reports/email');
                    $('#jqxprint1').jqxWindow('close');
                }
            })
        })


        $(document).on("click", "#EmailIcon", function(event){
            WindowPopup('jqxprint1');
			return false;
        });



    }])
})();
