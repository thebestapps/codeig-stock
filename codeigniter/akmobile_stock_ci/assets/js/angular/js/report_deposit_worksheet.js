(function() {
    angular.module("ReportDepositWorkSheetApp", ['ngRoute','ngSanitize'])
    .service('svc',function(){})
    .controller("ReportDepositWorkSheetController",['$scope', '$http', 'svc', '$q', '$routeParams', '$window', 'DepositWorkSheetData', '$compile', '$rootScope',  function ($scope, $http, svc, $q, $routeParams, $window, DepositWorkSheetData, $compile, $rootScope) {
        $scope.RedirectDashboard = function(){
            $window.location = base_url + 'pos/cashier';
        }

        var Deposit_worksheet_data = [];
        var Credit_card_summary_data = [];

        $(document).ready(function(){
            // $("#SubmitDateRange").trigger('click');
        })

        var CurrentLocation = $("#CurrentLocation").val();
        var CurrentStation  = $("#CurrentStation").val();

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

        var station_souce = {
            datatype: 'json',
            datafields: [
                {name: "Unique"},
                {name: "Name"}
            ],
            localdata: StationList
        }
        var dataAdapterStation = new $.jqx.dataAdapter(station_souce);
        $("#Stations").jqxDropDownList({ source: dataAdapterStation, placeHolder: "Select Station", width: 250, height: 30, displayMember: "Name", valueMember: "Unique", checkboxes: true});
        $("#Stations").jqxDropDownList('checkItem', CurrentStation);
        $("#Stations").jqxDropDownList('checkAll');

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
        

        $("#SubmitDateRange").on('click', function(e){
            // DepositWorkSheetDataGrid();

            DepositWorkSheetDataView();
        })

        var DepositWorkSheetGrid = (data) => {
            var source = {
                datatype: 'json',
                datafields: [
                    {name: 'Payment', type: 'string'},
                    {name: 'Category', type: 'string'},
                    {name: 'Total', type: 'float'}
                ],
                localdata: data
            }

            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#DepositWorkSheet").jqxGrid({
                source: dataAdapter,
                width: '100%',
                autoheight: true,
                theme: 'darkblue',
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                columns: [
                    {text: 'Payment', datafield: 'Payment',  width: '10%'},
                    {text: 'Category', datafield: 'Category',  width: '10%'},
                    {text: 'Total', datafield: 'Total', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%',
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
                ]
            })
        }

        var WindowPopup = function(elemId) {
            var ButtonOkay, ButtonCancel = '';
            if(elemId == 'jqxprint'){
                ButtonOkay = 'PrintEXCEL';
                // ButtonCancel = 'PrintEXCEL';
            }else if(elemId == 'jqxprint1'){
                ButtonOkay = 'EmailEXCEL';
                // ButtonCancel = 'EmailEXCEL';
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

                    // $('#'+ButtonCancel).jqxButton({
                    //     width: '90px',
                    //     height:'48px',
                    //     theme: 'energyblue'
                    // });
                    // $('#PrintPDF').focus();
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
            
            var DateFrom = $("#calendar_From").val();
            var DateTo   = $("#calendar_To").val();
            var Locations= $("#Locations").val();
            var Stations = $("#Stations").val();

            var postdata ="datefrom="+DateFrom;
                postdata+="&dateto="+DateTo;
                postdata+="&locations="+Locations;
                postdata+="&stations="+Stations;

            $.ajax({
                url: base_url + 'backoffice/reports/deposit_worksheet/download-excel',
                type: 'POST',
                datatype: 'json',
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
        })

        var DepositWorkSheetDataGrid = () => {
            var DateFrom = $("#calendar_From").val();
            var DateTo   = $("#calendar_To").val();
            var Locations= $("#Locations").val();
            var Stations = $("#Stations").val();

            var postdata ="datefrom="+DateFrom;
                postdata+="&dateto="+DateTo;
                postdata+="&locations="+Locations;
                postdata+="&stations="+Stations;
            
            DepositWorkSheetData.GridData(postdata)
            .then(function(result){
                DepositWorkSheetGrid(result.data);
            })
        }

        var DepositWorkSheetDataView = () => {
            var DateFrom = $("#calendar_From").val();
            var DateTo   = $("#calendar_To").val();
            var Locations= $("#Locations").val();
            var Stations = $("#Stations").val();

            var postdata ="datefrom="+DateFrom;
                postdata+="&dateto="+DateTo;
                postdata+="&locations="+Locations;
                postdata+="&stations="+Stations;
            
            DepositWorkSheetData.ViewData(postdata)
            .then(function(result){
                var navigationHeight = $("#report_deposit_container").height();
                var toptitleHeight = $("#deposit_worksheet_view_container").height();
                var bodyHeight = $('#fakeheight').height();
                var compute1 = (navigationHeight + toptitleHeight);
                var compute2 = (bodyHeight - compute1);
                var useHeight = (compute2 - 50);
                console.log(compute1, bodyHeight, useHeight);

                $("#deposit_worksheet_list").html(result.deposit_worksheet);
                $("#deposit_worksheet_list").css({'height' : useHeight});

                $("#credit_card_summary").html(result.credit_card_summary);
                Deposit_worksheet_data = result.deposit_worksheet_download;
                Credit_card_summary_data = result.credit_card_summary_download;
            })
        }

        $(document).ready(function(){
            DepositWorkSheetDataView();
        })

    }])
})();
