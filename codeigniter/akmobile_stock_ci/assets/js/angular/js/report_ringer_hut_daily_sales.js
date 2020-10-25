(function() {
    angular.module("ReportRingerHutDailySalesApp", ['ngRoute','ngSanitize'])
    .service('svc',function(){})
    .controller("ReportRingerHutDailySalesController",['$scope', '$http', 'svc', '$q', '$routeParams', '$window', 'RingerHutDailySalesData', '$compile', '$rootScope',  function ($scope, $http, svc, $q, $routeParams, $window, RingerHutDailySalesData, $compile, $rootScope) {
        $scope.RedirectDashboard = function(){
            $window.location = base_url + 'pos/cashier';
        }

        // var CurrentLocation = $("#CurrentLocation").val();

        // var location_source = {
        //     datatype: "json",
        //     datafields: [
        //         {name: "Unique"},
        //         {name: "Name"}
        //     ],
        //     localdata: LocationList
        // }

        // var dataAdapter = new $.jqx.dataAdapter(location_source);
        // $("#Locations").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Location", width: 250, height: 30, displayMember: "Name", valueMember: "Unique", checkboxes: true});
        // $("#Locations").jqxDropDownList('checkItem', CurrentLocation);
        
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

        var DailySalesGrid = (data = []) => {
           
            $("#DailySales").jqxGrid('columns', setcolumn);

            var navbar = $(".navbar").height();
            var functionHeader = $(".second-top-header").height();
            var rangeHeader = $(".form-inline").height();
            var fakeheight = $("#fakeheight").height();
            var ItemSalesSummaryHeight = (fakeheight - navbar - rangeHeader);
            ItemSalesSummaryHeight = (ItemSalesSummaryHeight);

            var source = {
                datatype: 'json',
                datafields: [
                    {name: 'Item ID', type: 'int'},
                    {name: 'Item Name', type: 'string'},
                    {name: 'Sales Amount', type: 'float'},
                    {name: 'Percentage', type: 'float'},
                    {name: 'Quantity', type: 'int'}
                ],
                localdata: data.item_sales
            }

            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#DailySales").jqxGrid({
                height: ItemSalesSummaryHeight,
                source: dataAdapter,
                width: '100%',
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 200,
                showaggregates: true,
                columns: [
                    { text: 'Item ID', datafield: 'Item ID', width: '5%' },
                    { text: 'Item Name', datafield: 'Item Name', width: '20%',
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = 
                            "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>GROSS ITEM SALES</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>ORDER SURCHARGES</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>ORDER DISCOUNTS (Less)</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>CASH DISCOUNTS (Less)</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>CREDITS USED (Less)</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TAX 1</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TAX 2</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TOTAL SALES</div>"+
                                "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TOTAL CUSTOMERS</div>"+
                            "</div>";
                            return renderString;
                        } 
                    },
                    { text: 'Sales Amount', datafield: 'Sales Amount', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd2',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            } 
                            var GrossItemSales = Total.replace(/,(?=.*\.\d+)/g, '');
                            var OrderSurcharges = parseInt(0);
                            var OrderDiscounts = parseFloat(data.order_discount.OrderDiscounts).toFixed(2);
                            var CashDiscounts = parseFloat(0).toFixed(2);
                            var CreditUsed = parseFloat(0).toFixed(2); 
                            var Tax1 = parseFloat(data.tax1.Tax1).toFixed(2);
                            var Tax2 = parseFloat(0).toFixed(2);
                            var TotalSales = parseFloat(Number(GrossItemSales) + Number(OrderDiscounts) + Number(Tax1) ).toFixed(2);
                            var TotalCustomer = parseInt(data.total_customer.TOTALCUSTOMERS);
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                                "<div id='SalesAmount' style='margin: 4px; float: center; font-weight: bold;'>"+GrossItemSales+"</div>"+
                                "<div id='OrderSurcharges' style='margin: 4px; float: center; font-weight: bold;'>"+OrderSurcharges+"</div>"+
                                "<div id='OrderDiscounts' style='margin: 4px; float: center; font-weight: bold;'>"+OrderDiscounts+"</div>"+
                                "<div id='CashDiscounts' style='margin: 4px; float: center; font-weight: bold;'>"+CashDiscounts+"</div>"+
                                "<div id='CreditUsed' style='margin: 4px; float: center; font-weight: bold;'>"+CreditUsed+"</div>"+
                                "<div id='Tax1' style='margin: 4px; float: center; font-weight: bold;'>"+Tax1+"</div>"+
                                "<div id='Tax2' style='margin: 4px; float: center; font-weight: bold;'>"+Tax2+"</div>"+
                                "<div id='TotalSales' style='margin: 4px; float: center; font-weight: bold;'>"+TotalSales+"</div>"+
                                "<div id='TotalCustomer' style='margin: 4px; float: center; font-weight: bold;'>"+TotalCustomer+"</div>"+

                            "</div>";
                           
                            return renderString;
                        } 
                    },
                    { text: 'Percentage', datafield: 'Percentage', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd0',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    },
                    { text: 'Quantity', datafield: 'Quantity', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd0',
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>";
                            var Total=parseFloat(0);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString += Total + "</div>";
                            return renderString;
                        } 
                    }
                ]
            })
        }

        function SummPositive( numbers ) {
            var negatives = [];
            var sum = 0;
          
            for(var i = 0; i < numbers.length; i++) {
              if(numbers[i] < 0) {
                negatives.push(numbers[i]);
              }else{
                sum += numbers[i];
              }
            }
          
            console.log(negatives);
          
            return sum;
        }

        /**
         * Get Item sales summary data
         */
        var DailySalesGetData = () => {
            var DateFrom = $("#calendar_From").val();
            var DateTo   = $("#calendar_To").val();

            var postdata ="datefrom="+DateFrom;
                postdata+="&dateto="+DateTo;
            RingerHutDailySalesData.DailySales(postdata)
            .success(function(data){
                DailySalesGrid(data);
            })
        }
        
        var setcolumn = () => {
            columns: [
                { text: 'Item ID', datafield: 'Item ID', width: '5%' },
                { text: 'Item Name', datafield: 'Item Name', width: '20%',
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = 
                        "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>GROSS ITEM SALES</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>ORDER SURCHARGES</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>ORDER DISCOUNTS (Less)</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>CASH DISCOUNTS (Less)</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>CREDITS USED (Less)</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TAX 1</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TAX 2</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TOTAL SALES</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:right;'>TOTAL CUSTOMERS</div>"+
                        "</div>";
                        return renderString;
                    } 
                },
                { text: 'Sales Amount', datafield: 'Sales Amount', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd2',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        } 
                        // var GrossItemSales = parseFloat(Total).toFixed(2);
                        var GrossItemSales = Total.replace(/,(?=.*\.\d+)/g, '');
                        var OrderSurcharges = parseInt(0);
                        var OrderDiscounts = parseFloat(data.order_discount.OrderDiscounts).toFixed(2);
                        var CashDiscounts = parseFloat(0).toFixed(2);
                        var CreditUsed = parseFloat(0).toFixed(2); 
                        var Tax1 = parseFloat(data.tax1.Tax1).toFixed(2);
                        var Tax2 = parseFloat(0).toFixed(2);
                        var TotalSales = parseFloat(Number(GrossItemSales) + Number(OrderDiscounts) + Number(Tax1) ).toFixed(2);
                        var TotalCustomer = parseInt(data.total_customer.TOTALCUSTOMERS);
                        var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                            "<div id='SalesAmount' style='margin: 4px; float: center; font-weight: bold;'>"+GrossItemSales+"</div>"+
                            "<div id='OrderSurcharges' style='margin: 4px; float: center; font-weight: bold;'>"+OrderSurcharges+"</div>"+
                            "<div id='OrderDiscounts' style='margin: 4px; float: center; font-weight: bold;'>"+OrderDiscounts+"</div>"+
                            "<div id='CashDiscounts' style='margin: 4px; float: center; font-weight: bold;'>"+CashDiscounts+"</div>"+
                            "<div id='CreditUsed' style='margin: 4px; float: center; font-weight: bold;'>"+CreditUsed+"</div>"+
                            "<div id='Tax1' style='margin: 4px; float: center; font-weight: bold;'>"+Tax1+"</div>"+
                            "<div id='Tax2' style='margin: 4px; float: center; font-weight: bold;'>"+Tax2+"</div>"+
                            "<div id='TotalSales' style='margin: 4px; float: center; font-weight: bold;'>"+TotalSales+"</div>"+
                            "<div id='TotalCustomer' style='margin: 4px; float: center; font-weight: bold;'>"+TotalCustomer+"</div>"+

                        "</div>";
                       
                        return renderString;
                    } 
                },
                { text: 'Percentage', datafield: 'Percentage', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd0',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString += Total + "</div>";
                        return renderString;
                    } 
                },
                { text: 'Quantity', datafield: 'Quantity', width: '8%', align: 'right', cellsalign: 'right', cellsformat: 'd0',
                    aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString += Total + "</div>";
                        return renderString;
                    } 
                }
            ]

            return columns;
        }

        /**
         * Search button
         */
        $("#SubmitDateRange").on('click', function(){
            DailySalesGetData();
        })

        var WindowPopup = function(elemId) {
            var ButtonOkay, ButtonCancel = '';
            if(elemId == 'jqxprint'){
                // ButtonOkay = 'PrintPDF';
                ButtonCancel = 'PrintEXCEL';
            }else if(elemId == 'jqxprint1'){
                // ButtonOkay = 'EmailPDF';
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
                // okButton	: ButtonOkay,
                cancelButton: ButtonCancel,
                initContent	: function (id) {
                    // $('#'+ButtonOkay).jqxButton({
                    //     width: '90px',
                    //     height:'48px',
                    //     theme: 'energyblue'
                    // });

                    $('#'+ButtonCancel).jqxButton({
                        width: '90px',
                        height:'48px',
                        theme: 'energyblue'
                    });
                    $('#PrintEXCEL').focus();
                }
            });
            $('#'+elemId).jqxWindow('open');
        }

        $(document).on("click", "#PrintIcon", function(event){
            WindowPopup('jqxprint');
			return false;
        });

        $(document).on("click", "#EmailIcon", function(event){
            WindowPopup('jqxprint1');
			return false;
        });

        $("#PrintEXCEL").on('click', function(e){
            var gridItems = $("#DailySales").jqxGrid('getrows');
            for (var i = 0; i < gridItems.length; i++) {
                delete gridItems[i].uid;
            };

            var SalesAmount     = $("#SalesAmount").text();
            var OrderSurcharges = $("#OrderSurcharges").text();
            var OrderDiscounts  = $("#OrderDiscounts").text();
            var CashDiscounts   = $("#CashDiscounts").text();
            var CreditUsed      = $("#CreditUsed").text();
            var Tax1            = $("#Tax1").text();
            var Tax2            = $("#Tax2").text();
            var TotalSales      = $("#TotalSales").text();
            var TotalCustomer   = $("#TotalCustomer").text();

            var postdata ="ItemSales="+JSON.stringify(gridItems);
                postdata+="&SalesAmount="+SalesAmount;
                postdata+="&OrderSurcharges="+OrderSurcharges;
                postdata+="&OrderDiscoutns="+OrderDiscounts;
                postdata+="&CashDiscounts="+CashDiscounts;
                postdata+="&CreditUsed="+CreditUsed;
                postdata+="&Tax1="+Tax1;
                postdata+="&Tax2="+Tax2;
                postdata+="&TotalSales="+TotalSales;
                postdata+="&TotalCustomer="+TotalCustomer;
                postdata+="&EndDate="+$("#calendar_To").val();
            RingerHutDailySalesData.DailySalesDownloadCSV(postdata)
            .success(function(data){ 

                window.location = (base_url + 'backoffice/reports/dailysales/download-report');

                $("#jqxprint").jqxWindow('close');
            }) 
        })

        $("#EmailEXCEL").on('click', function(e){
            var gridItems = $("#DailySales").jqxGrid('getrows');
            for (var i = 0; i < gridItems.length; i++) {
                delete gridItems[i].uid;
            };

            var SalesAmount     = $("#SalesAmount").text();
            var OrderSurcharges = $("#OrderSurcharges").text();
            var OrderDiscounts  = $("#OrderDiscounts").text();
            var CashDiscounts   = $("#CashDiscounts").text();
            var CreditUsed      = $("#CreditUsed").text();
            var Tax1            = $("#Tax1").text();
            var Tax2            = $("#Tax2").text();
            var TotalSales      = $("#TotalSales").text();
            var TotalCustomer   = $("#TotalCustomer").text();
            var EndDate         = $("#calendar_To").val();

            var postdata ="ItemSales="+JSON.stringify(gridItems);
                postdata+="&SalesAmount="+SalesAmount;
                postdata+="&OrderSurcharges="+OrderSurcharges;
                postdata+="&OrderDiscoutns="+OrderDiscounts;
                postdata+="&CashDiscounts="+CashDiscounts;
                postdata+="&CreditUsed="+CreditUsed;
                postdata+="&Tax1="+Tax1;
                postdata+="&Tax2="+Tax2;
                postdata+="&TotalSales="+TotalSales;
                postdata+="&TotalCustomer="+TotalCustomer;
                postdata+="&EndDate="+EndDate;
            RingerHutDailySalesData.DailySalesEmailCSV(postdata)
            .success(function(data){ 

                window.location = (base_url + 'backoffice/reports/email');

                $("#jqxprint").jqxWindow('close');
            }) 
        })

    }])
})();
