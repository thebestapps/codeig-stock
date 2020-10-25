(function() {
angular.module("akamaiposApp", ['ngSanitize'])
.controller("akamaiposController",['$scope', '$http', '$q', '$window', '$compile', '$rootScope',  function ($scope, $http, $q, $window, $compile, $rootScope) {
    
    setTimeout(function(){
        var FakeHeight = $("#fakeheight").height();
        var ResoHeight = (FakeHeight - 120);
        var useHeight = (ResoHeight - 35);

        // Alert Window
        var populateAlertWindow = (form, msg) => {
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert_window_message_container").append(
                    '<form id="'+form+'">'+
                        '<h3>'+msg+'</h3>'+
                        '<div id="alert_window_content"></div>'+
                    '</form>'
                );
                def.resolve();
            },100)
            return def.promise();
        }

        var WindowPopupAlert = (Title) =>  {
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert_window_message").jqxWindow({
                    height: 260,
                    width: 400,
                    isModal: true,
                    theme: 'darkblue',
                    title: Title,
                    showCloseButton: false,
                    resizable: false,
                    draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                })
                $("#alert_window_message").jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }

        var GridApproved = () => {
            var postdata ="Status=2";
            $http({
                method: 'post',
                url: base_url + 'backoffice/customer-card/status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'}
                    ],
                    localdata: result
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_approved").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    rowsheight: GridRowHeight,
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '15%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '5%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '9%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '15%'}
                    ]
                })
            })

            $("#edit").hide();
        }

        var GridDeclined = () => {
            var def = $.Deferred();
            var postdata ="Status=3";
            $http({
                method: 'post',
                url: base_url + 'backoffice/customer-card/status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'},
                        {name: 'CustomerUnique', type: 'int'},
                        {name: 'CardNumber', type: 'string'},
                        {name: 'Expiration', type: 'string'},
                        {name: 'CardHolderName', type: 'string'},
                        {name: 'Response', type: 'string'}
                    ],
                    localdata: result
                };

                var renderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                    var newResponse = JSON.parse(value);                    
                    return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #0000ff;">' + newResponse.TextResponse + '</span>';
                }

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_declined").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    // pageSize: 20,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '10%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '3%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '5%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '10%'},
                        { text: 'Response', datafield: 'Response', filtertype: 'input', /*cellsrenderer:renderer,*/ width: '15%' }
                    ]
                })
                $("#customer_card_grid_declined").jqxGrid('clearselection');
                def.resolve();
            })
            $("#edit").show();
            return def.promise();
        }

        var GridPending = () => {
            var def = $.Deferred();
            var postdata ="Status=1";
            $http({
                method: 'post',
                url: base_url + 'backoffice/customer-card/status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'},
                        {name: 'CustomerUnique', type: 'int'},
                        {name: 'CardNumber', type: 'string'},
                        {name: 'Expiration', type: 'string'},
                        {name: 'CardHolderName', type: 'string'}
                    ],
                    localdata: result
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_pending").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    // pageSize: 20,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '15%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '5%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '9%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '15%'}
                    ]
                })
                $("#customer_card_grid_pending").jqxGrid('clearselection');
                def.resolve();
            })

            $("#edit").show();

           return def.promise();
        }

        var RenewGridPending = () => {
            var def = $.Deferred();
            $http({
                method: 'GET',
                url: base_url + 'backoffice/customer-card/renew-pending',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'},
                        {name: 'CustomerUnique', type: 'int'},
                        {name: 'CardNumber', type: 'string'},
                        {name: 'Expiration', type: 'string'},
                        {name: 'CardHolderName', type: 'string'},
                        {name: 'RecordNo', type: 'string'},
                        {name: 'RenewedDate', type: 'date'},
                        {name: 'Frequency', type: 'string'}
                    ],
                    localdata: result
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_renew_pending").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '10%'},
                        { text: 'Renewed Date', datafield: 'RenewedDate', width: '10%', cellsformat: 'MM/dd/yyyy hh:mm tt'},
                        { text: 'Frequency', datafield: 'Frequency', filtertype: 'checkedlist', width: '15%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '5%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '9%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '15%'},
                    ]
                })

                $("#customer_card_grid_renew_pending").jqxGrid('clearselection');

                def.resolve();
            })

            $("#edit").hide();

           return def.promise();
        }


        var RenewGridDeclined = () => {
            var def = $.Deferred();
            var postdata ="Approved=0";
            $http({
                method: 'post',
                url: base_url + 'backoffice/customer-card/renew-status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'},
                        {name: 'CustomerUnique', type: 'int'},
                        {name: 'CardNumber', type: 'string'},
                        {name: 'Expiration', type: 'string'},
                        {name: 'CardHolderName', type: 'string'},
                        {name: 'RecordNo', type: 'string'},
                        {name: 'RenewedDate', type: 'date'},
                        {name: 'Frequency', type: 'string'}
                    ],
                    localdata: result
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_renew_declined").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    // pageSize: 20,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '10%'},
                        { text: 'Renewed Date', datafield: 'RenewedDate', width: '10%', cellsformat: 'MM/dd/yyyy hh:mm tt'},
                        { text: 'Frequency', datafield: 'Frequency', filtertype: 'checkedlist', width: '15%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '5%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '9%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '15%'},
                    ]
                })

                $("#customer_card_grid_renew_declined").jqxGrid('clearselection');

                def.resolve();
            })

            $("#edit").hide();

           return def.promise();
        }

        var RenewGridApproved = () => {
            var def = $.Deferred();
            var postdata ="Approved=1";
            $http({
                method: 'POST',
                url: base_url + 'backoffice/customer-card/renew-status',
                data: postdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(result){
                GridRowHeight = 30;
                var source =  {
                    datatype: 'json',
                    datafields: [
                        {name: 'Unique', type: 'int'},
                        {name: 'Created', type: 'date'},
                        {name: 'Company', type: 'string'},
                        {name: 'FirstName', type: 'string'},
                        {name: 'LastName', type: 'string'},
                        {name: 'Card4', type: 'string'},
                        {name: 'CardType', type: 'string'},
                        {name: 'StreetNumber', type: 'string'},
                        {name: 'ZipCode', type: 'string'},
                        {name: 'CVV', type: 'string'},
                        {name: 'Label', type: 'string'},
                        {name: 'CustomerUnique', type: 'int'},
                        {name: 'CardNumber', type: 'string'},
                        {name: 'Expiration', type: 'string'},
                        {name: 'CardHolderName', type: 'string'},
                        {name: 'RecordNo', type: 'string'},
                        {name: 'RenewedDate', type: 'date'},
                        {name: 'Frequency', type: 'string'}
                    ],
                    localdata: result
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#customer_card_grid_renew_approved").jqxGrid({
                    source: dataAdapter,
                    height: useHeight,
                    width: "100%",
                    columnsresize: true,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    sortable: true,
                    pageable: false,
                    // pageSize: 20,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    showfilterrow: true,
                    filterable: true,
                    columns: [
                        { text: 'ID', datafield: 'Unique', filtertype: 'number', width: '5%'},
                        { text: 'Created', datafield: 'Created', cellsformat: 'MM/dd/yyyy hh:mm tt', width: '10%'},
                        { text: 'Renewed Date', datafield: 'RenewedDate', width: '10%', cellsformat: 'MM/dd/yyyy hh:mm tt'},
                        { text: 'Frequency', datafield: 'Frequency', filtertype: 'checkedlist', width: '15%'},
                        { text: 'Company', datafield: 'Company', filtertype: 'input', width: '10%'},
                        { text: 'First Name', datafield: 'FirstName', filtertype: 'input', width: '10%'},
                        { text: 'Last Name', datafield: 'LastName', filtertype: 'input', width: '10%'},
                        { text: 'Last 4', datafield: 'Card4', filtertype: 'number', width: '5%'},
                        { text: 'Card Type', datafield: 'CardType', filtertype: 'checkedlist', width: '5%'},
                        { text: 'Expiration', datafield: 'Expiration', filtertype: 'input', width: '5%'},
                        { text: 'Street Number', datafield: 'StreetNumber', filtertype: 'input', width: '9%'},
                        { text: 'Zipcode', datafield: 'ZipCode', filtertype: 'number', width: '5%'},
                        { text: 'CVV', datafield: 'CVV', filtertype: 'number', width: '5%'},
                        { text: 'Label', datafield: 'Label', filtertype: 'checkedlist', width: '15%'},
                    ]
                })

                $("#customer_card_grid_renew_approved").jqxGrid('clearselection');

                def.resolve();
            })

            $("#edit").hide();

           return def.promise();
        }


        var initWidgets = function (tab) {
            switch (tab) {
                case 0:
                    GridPending()
                    break;
            }
        }

        $('#tabs').jqxTabs({theme: Gtheme, width: '100%', height: ResoHeight,  initTabContent: initWidgets, selectedItem: 0 });

        $("#tabs").show();

        var renderText = function (text, value){
            if (value < 55){
                return "<span style='color: #000 !important;'>" + text + "</span>";
            }
            return "<span style='color: #fff;'>" + text + "</span>";
        }
        var values = {}
    
        var TotalProcess = 0;
        var resApproved = 0;
        var resDeclined = 0;
        var resPending = 0;
        $("#import").on('click', function(e){
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var attach = '';
            if(SelectedTab == 1){
                attach ='retry'
                GridId = 'declined';        
            }else if(SelectedTab == 0){
                attach ='authorize'
                GridId = 'pending';
            }

            var getSelectedRows = $("#customer_card_grid_"+GridId).jqxGrid('selectedrowindexes');
            if(getSelectedRows.length > 0){
                var labelcard = '';
                if(getSelectedRows.length > 1){
                    labelcard = 'cards';
                }else{
                    labelcard = 'card';
                }
                WindowPopupAlert('Message info')
                .then(function(){
                    populateAlertWindow('edit_import_q', '')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Would you like to '+attach+' the selected '+labelcard+' ?</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="submit" class="btn btn-success btn-lg yes">Yes</button>&nbsp;'+
                                '<button type="button" class="btn btn-danger btn-lg no">No</button>'+
                            '</div>'
                        )
                    })
                })
            }else{
                WindowPopupAlert('Message Info')
                .then(function(){
                    populateAlertWindow('edit_failed', '')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Check row to edit</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="submit" class="btn btn-danger btn-lg">Close</button>'+
                            '</div>'
                        )
                    })
                })
            }
        })

        $(document).on("submit", '#edit_import_q', function(e){
            e.preventDefault();
            resApproved = 0;
            resDeclined = 0;

            $("#alert_window_message").jqxWindow('close');
            
            var SelectedItemsArr = [];
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var GridId = '';
            if(SelectedTab == 1){
                GridId = 'declined';
            }else if(SelectedTab == 0){
                GridId = 'pending';
            }

            var getSelectedRows = $("#customer_card_grid_"+GridId).jqxGrid('selectedrowindexes');

            if(getSelectedRows.length > 0){
                $.blockUI({ 
                    css: { 
                        textAlign: 'center', 
                        width: 'auto',
                        centerX: true,
                        centerY: true,
                        baseZ: 1000,
                        border: 'none',
                        // border: '2px solid #fff',
                        // padding: '15px', 
                        backgroundColor: 'transparent', 
                        // '-webkit-border-radius': '10px', 
                        // '-moz-border-radius': '10px', 
                        opacity: 1, 
                        color: '#fff',
                        fontSize: '20px'
                    }, message: '<span style="color: #fff; font-size: 14px; font-weight: bold;" id="label_process"></span><br><div id="jqxProgressBar3"></div>'
                });
    
                $("#jqxProgressBar3").jqxProgressBar({ animationDuration: 0, showText: true, renderText: renderText, theme: "ui-le-frog", width: 250, height: 20, value: 0 });

                TotalProcess = getSelectedRows.length;
                for(var i=0; i<getSelectedRows.length; i++){
                    var gridData = $("#customer_card_grid_"+GridId).jqxGrid('getrowdata', getSelectedRows[i]);
                    SelectedItemsArr.push(gridData);
                }
                // var newData = encodeURIComponent(JSON.stringify(gridData));
                var ProgressCount = 0;
                if(getSelectedRows.length == SelectedItemsArr.length){
                    
                    $.each(SelectedItemsArr, function(index, value){
                        var progress = 0;
                        var CustomerName = value.FirstName + ' ' + value.LastName;

                        var postdata ="Unique="+value.Unique;
                            postdata+="&CustomerUnique="+value.CustomerUnique;
                            postdata+="&CardNumber="+value.CardNumber;
                            postdata+="&Card4="+value.Card4;
                            postdata+="&Expiration="+value.Expiration;
                            postdata+="&StreetNumber="+value.StreetNumber;
                            postdata+="&ZipCode="+value.ZipCode;
                            postdata+="&CVV="+value.CVV;
                            postdata+="&AccountName="+CustomerName;
                            postdata+="&CardType="+value.CardType;
                            postdata+="&CardHolderName="+value.CardHolderName;
                        $.ajax({
                            url: base_url + 'backoffice/customer-card/auth',
                            method: 'post',
                            dataType: 'json',
                            data: postdata,
                            beforeSend: function(){
                                
                            },
                            success: function(data){
                                if(data.resultProcess == 'Approved'){
                                    resApproved = (resApproved + 1);
                                }else if(data.resultProcess == 'Declined'){
                                    resDeclined = (resDeclined + 1);
                                }
                            },
                            error: function(){
                                alert('We ecountered a technical difficulty\nPlease try again later.');
                            },
                            complete: function(){
                                ProgressCount++;
                                progress = ((ProgressCount / TotalProcess) * 100);
                                $("#label_process").text(value.CardHolderName);
                                $("#jqxProgressBar3").jqxProgressBar({animationDuration: 500, value: progress});
                            }
                        })
                    })
                }
            }else{
                console.log("No selected rows");
            }
        })

        $(document).on('click', '#edit_import_q .no', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $(document).on('complete', '#jqxProgressBar3', function (event) {
            setTimeout($.unblockUI, 100);
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var GridId = '';
            if(SelectedTab == 1){
                GridId = 'declined';
                GridDeclined()
                .then(function(){
                    $('#customer_card_grid_declined').jqxGrid('clearselection');
                    resPending = $("#customer_card_grid_declined").jqxGrid('getrows');
                })
            }else if(SelectedTab == 0){
                GridPending()
                .then(function(){
                    $('#customer_card_grid_pending').jqxGrid('clearselection');
                    resPending = $("#customer_card_grid_pending").jqxGrid('getrows');
                })
            }else if(SelectedTab == 3){
                RenewGridPending()
                .then(function(){
                    resPending = $("#customer_card_grid_renew_pending").jqxGrid('getrows');
                })
            }else if(SelectedTab == 4){
                RenewGridDeclined()
                .then(function(){
                    resPending = $("#customer_card_grid_renew_declined").jqxGrid('getrows');
                })
            }

            var msg = '';
            if(SelectedTab == 0 || SelectedTab == 1){
                msg = 'Import completed!';
            }else if(SelectedTab == 3 || SelectedTab == 4){
                msg = 'Token renew completed!';
            }

            WindowPopupAlert('Result')
            .then(function(){
                populateAlertWindow('process_completed', msg)
                .then(function(){
                    $("#alert_window_content").append(
                        '<span style="font-size: 18px; font-weight: bold;">Result:</span><br><br>'+
                        '<span style="font-size: 16px">Total Processed: '+ (resApproved + resDeclined) +'</span><br>'+
                        '<span style="font-size: 16px">Approved: '+resApproved+'</span><br>'+
                        '<span style="font-size: 16px;">Declined: '+resDeclined+'</span><br>'+
                        '<span style="font-size: 16px;">Pending: '+resPending.length+'</span>'+
                        '<br>'+
                        '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                            '<button type="submit" class="btn btn-primary btn-lg">Close</button>'+
                        '</div>'
                    )
                })
            })
        });

        $("#alert_window_message").on('close', function(){
            $("#alert_window_message_container").html('');
        })

        $(document).on('submit', '#process_completed', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $('#tabs').on('tabclick', function (event) {
            var clickedItem = event.args.item; 
            var SelectedTab = $('#tabs').jqxTabs('selectedItem');
            switch(clickedItem) {
                // Credit Card Approved Status
                case 0:
                    if(SelectedTab != 0){
                        GridPending();
                    }
                break;
                // Credit Card Declined Status
                case 1:
                    if(SelectedTab != 1){
                        GridDeclined();
                    }
                break;
                // Credit Card Pending Status
                case 2:
                    if(SelectedTab != 2){
                        GridApproved()
                    }
                break;
                // Credit Card Renew Pending Status
                case 3:
                    if(SelectedTab != 3){
                        RenewGridPending()
                    }
                break;
                // Credit Card Renew Declined Status
                case 4:
                    if(SelectedTab != 4){
                        RenewGridDeclined();
                    }
                break;
                // Credit Card Renew Approved
                case 5: 
                    if(SelectedTab != 5){
                        RenewGridApproved();
                    }
            }
        });
    
        var WindowCustomerCardForm = function(title){
            var def = $.Deferred();
            setTimeout(function(){
                $("#customer_card_form").jqxWindow({
                    height: 350,
                    width: 650,
                    title: title,
                    isModal: true,
                    theme: 'darkblue',
                    draggable: false,
                    showCloseButton: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0,
                    resizable: false    
                });
                $('#customer_card_form').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
        }
    
        $("#edit").on('click', function(){
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var GridId = '';
            if(SelectedTab == 1){
                GridId = 'declined';
            }else if(SelectedTab == 0){
                GridId = 'pending';
            }

            var rowselected = $("#customer_card_grid_"+GridId).jqxGrid('selectedrowindexes');
            var selectedrowindex = $('#customer_card_grid_'+GridId).jqxGrid('getselectedrowindex');
            var rowdata = $("#customer_card_grid_"+GridId).jqxGrid('getrowdatabyid', selectedrowindex);

            if(rowselected.length > 0 && rowselected.length < 2){
                $("#credit_card_number").val( (rowdata.CardNumber ? rowdata.CardNumber : null)  );
                if(rowdata.Expiration){
                    var CardExp = rowdata.Expiration;
                    var CardExpMonth = CardExp.substring(0, 2);
                    var CardExpYear  = CardExp.substring(2, 4);
                    $("#credit_card_number_month").val(CardExpMonth);
                    $("#credit_card_number_year").val(CardExpYear);
                }

                $("#credit_card_name").val(rowdata.CardHolderName);
                $("#credit_card_label").val(rowdata.Label);
                $("#credit_card_number_street").val(rowdata.StreetNumber);
                $("#credit_card_number_zipcode").val(rowdata.ZipCode);
                $("#credit_card_number_cvv").val(rowdata.CVV);

                var Title = 'Customer Card Info '+rowdata.Company+' '+rowdata.FirstName+' '+rowdata.LastName;
                WindowCustomerCardForm(Title);
            }else if(rowselected.length > 1){
                WindowPopupAlert('Message Info')
                .then(function(){
                    populateAlertWindow('edit_failed', 'Message')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Cannot edit multiple checked rows</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="submit" class="btn btn-danger btn-lg">Close</button>'+
                            '</div>'
                        )
                    })
                })
            }else{
                WindowPopupAlert('Message Info')
                .then(function(){
                    populateAlertWindow('edit_failed', 'Message')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Check row to edit</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="submit" class="btn btn-danger btn-lg">Close</button>'+
                            '</div>'
                        )
                    })
                })
            }
        })

        $("#customer_card_info_update").on('submit', function(e){
            e.preventDefault();
            var tabselected = $('#tabs').jqxTabs('selectedItem'); 
            var gridId = '';
            if(tabselected == 1){
                gridId = 'declined';
            }else if(tabselected == 0){
                gridId = 'pending';
            }
            var rowIndex = $('#customer_card_grid_'+gridId).jqxGrid('selectedrowindex');
            var rowdata = $("#customer_card_grid_"+gridId).jqxGrid('getrowdatabyid', rowIndex);

            var postdata ="&CardNumber="+$("#credit_card_number").val();
                postdata+="&CreditCardMonth="+$("#credit_card_number_month").val();
                postdata+="&CreditCardYear="+$("#credit_card_number_year").val();
                postdata+="&CreditCardName="+$("#credit_card_name").val();
                postdata+="&CreditCardLabel="+$("#credit_card_label").val();
                postdata+="&CreditCardStreet="+$("#credit_card_number_street").val();
                postdata+="&CreditCardZipCode="+$("#credit_card_number_zipcode").val();
                postdata+="&CreditCardCVV="+$("#credit_card_number_cvv").val();
                postdata+="&Unique="+rowdata.Unique;
        
            $.ajax({
                url: base_url + 'backoffice/customer-card/update',
                method: 'post',
                dataType: 'json',
                data: postdata,
                async: false,
                beforeSend: function(){

                },
                success: function(data){

                },
                error: function(){
                    alert('We ecountered a technical difficulty\nPlease try again later.');
                },
                complete: function(data){
                    if(data.success){
                        document.getElementById("customer_card_info_update").reset();
                        if(tabselected == 1){
                            GridDeclined();
                        }else if(tabselected == 0){
                            GridPending();
                        }

                        $("#customer_card_form").jqxWindow('close');
                    }
                }
            })
        })

        $("#customer_card_cancel").on('click', function(e){
            document.getElementById("customer_card_info_update").reset();
            $("#customer_card_form").jqxWindow('close');
        })


        $(document).on('submit', '#edit_failed', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        // Go back to Dashboard
        $("#Dashboard").on('click', function(){
            $window.location.href = base_url + 'pos/dashboard';
        })

        var FileImportWindow = function(){
            $("#import_file").jqxWindow({
                height: 300,
                width: 350,
                isModal: true,
                theme: 'darkblue',
                title: 'File Import',
                showCloseButton: true,
                resizable: false,
                draggable: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            })
            $("#import_file").jqxWindow('open'); 
        }

        // File Import
        $("#file_import").on('click', function(e){
            FileImportWindow();
        })

        $(document).on('click', '#edit_file_import_empty_source .okay', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $(document).on('click', '#edit_file_import_table_empty .okay', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        var stepped = 0, chunks = 0, rows = 0;
        var start, end;
        var parser;
        var pauseChecked = false;
        var printStepChecked = false;
        $("#process_convert").on('click', function(e){
            e.preventDefault();
            stepped = 0;
            chunks = 0;
            rows = 0;

            if( !$("#ImportFormControlFile").val() ){
                WindowPopupAlert('<i class="glyphicon glyphicon-exclamation-sign"></i>&nbsp;Error')
                .then(function(){
                    populateAlertWindow('edit_file_import_empty_source', '')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Please select the file that you want to import.</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="button" class="btn btn-danger btn-lg okay">Okay</button>'+
                            '</div>'
                        )
                    })
                })
                return false;
            }

            if( $("#table_list").val() == '' ||  $("#table_list").val() == null){
                WindowPopupAlert('<i class="glyphicon glyphicon-exclamation-sign"></i>&nbsp;Error')
                .then(function(){
                    populateAlertWindow('edit_file_import_table_empty', '')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Please select the table name.</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right;">'+
                                '<button type="button" class="btn btn-danger btn-lg okay">Okay</button>'+
                            '</div>'
                        )
                    })
                })
                return false;
            }

            var txt = $('#input').val();
            var localChunkSize = $('#localChunkSize').val();
            var remoteChunkSize = $('#remoteChunkSize').val();
            var files = $('#ImportFormControlFile')[0].files;
            var config = buildConfig();

            // NOTE: Chunk size does not get reset if changed and then set back to empty/default value
            if (localChunkSize)
                Papa.LocalChunkSize = localChunkSize;
            if (remoteChunkSize)
                Papa.RemoteChunkSize = remoteChunkSize;

            pauseChecked = $('#step-pause').prop('checked');
            printStepChecked = $('#print-steps').prop('checked');


            if (files.length > 0)
            {
                if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
                {
                    for (var i = 0; i < files.length; i++)
                    {
                        if (files[i].size > 1024 * 1024 * 10)
                        {
                            alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
                            return;
                        }
                    }
                }

                start = performance.now();

                $('#ImportFormControlFile').parse({
                    config: config,
                    complete: function()
                    {
                        console.log("Done with all files.");
                    }
                });
            }
            else
            {
                start = performance.now();
                var results = Papa.parse(txt, config);
                console.log("Synchronous parse results:", results);
            }
        })

        function buildConfig()
        {
            return {
                delimiter: $('#delimiter').val(),
                newline: getLineEnding(),
                header: $('#header').prop('checked'),
                dynamicTyping: $('#dynamicTyping').prop('checked'),
                preview: parseInt($('#preview').val() || 0),
                step: $('#stream').prop('checked') ? stepFn : undefined,
                encoding: $('#encoding').val(),
                worker: $('#worker').prop('checked'),
                comments: $('#comments').val(),
                complete: completeFn,
                error: errorFn,
                download: $('#download').prop('checked'),
                fastMode: $('#fastmode').prop('checked'),
                skipEmptyLines: $('#skipEmptyLines').prop('checked'),
                chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
                beforeFirstChunk: undefined,
            };

            function getLineEnding()
            {
                if ($('#newline-n').is(':checked'))
                    return "\n";
                else if ($('#newline-r').is(':checked'))
                    return "\r";
                else if ($('#newline-rn').is(':checked'))
                    return "\r\n";
                else
                    return "";
            }
        }

        function stepFn(results, parserHandle)
        {
            stepped++;
            rows += results.data.length;

            parser = parserHandle;

            if (pauseChecked)
            {
                console.log(results, results.data[0]);
                parserHandle.pause();
                return;
            }

            if (printStepChecked)
                console.log(results, results.data[0]);
        }

        function chunkFn(results, streamer, file)
        {
            if (!results)
                return;
            chunks++;
            rows += results.data.length;

            parser = streamer;

            if (printStepChecked)
                console.log("Chunk data:", results.data.length, results);

            if (pauseChecked)
            {
                console.log("Pausing; " + results.data.length + " rows in chunk; file:", file);
                streamer.pause();
                return;
            }
        }

        function errorFn(error, file)
        {
            console.log("ERROR:", error, file);
        }

        function completeFn()
        {

            $.blockUI({ 
                css: { 
                    textAlign: 'center', 
                    width: 'auto',
                    centerX: true,
                    centerY: true,
                    baseZ: 1000,
                    border: 'none',
                    // border: '2px solid #fff',
                    // padding: '15px', 
                    backgroundColor: 'transparent', 
                    // '-webkit-border-radius': '10px', 
                    // '-moz-border-radius': '10px', 
                    opacity: 1, 
                    color: '#fff',
                    fontSize: '20px'
                }, message: '<span style="color: #fff; font-size: 14px; font-weight: bold;" id="label_process"></span><br><div id="jqxProgressBar"></div>'
            });

            $("#jqxProgressBar").jqxProgressBar({ animationDuration: 0, showText: true, renderText: renderText, theme: "ui-le-frog", width: 250, height: 20, value: 0 });


            end = performance.now();
            if (!$('#stream').prop('checked')
                    && !$('#chunk').prop('checked')
                    && arguments[0]
                    && arguments[0].data)
                rows = arguments[0].data.length;

            
            console.log(arguments[0].data);
            ProcessImport(arguments[0].data);

            console.log("Finished input (async). Time:", end, arguments);
            console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
        }

        $("#import_file_setting").jqxPopover({offset: {left: 0, top:240}, arrowOffsetValue: -240, width: 230,  position: "left", title: "Settings", showCloseButton: true, selector: $("#setting") });
        $("#header").addClass('jqx-widget-header-darkblue');
        
        var TableListURL = base_url + 'backoffice/import-data/table-list';
        var TableSource = {
            datatype: 'json',
            datafields: [
                { name : 'TableId' },
                { name : 'Name' }
            ],
            url: TableListURL,
            async: false
        }

        var TableListDataAdapter = new $.jqx.dataAdapter(TableSource);

        $("#table_list").jqxComboBox({
            source: TableListDataAdapter, 
            displayMember: "Name", 
            valueMember: "TableId", 
            height: 25, 
            promptText: 'Select Table'
        })


        var ProcessImport = function(data){
            TotalProcess = data.length;
            var ProgressCount = 0;
            $("#import_file").jqxWindow('close');
            $.each(data, function(index, value){
                var postdata ="fileimportdata="+JSON.stringify(value);
                    postdata+="&tablename="+$("#table_list").val();
            
                $.ajax({
                    url: base_url + 'backoffice/import-data/process',
                    method: 'post',
                    dataType: 'json',
                    data: postdata,
                    beforeSend: function(){

                    },
                    success: function(data){

                    },
                    error: function(){
                        // alert('We ecountered a technical difficulty\nPlease try again later.');

                    },
                    complete: function(){
                        ProgressCount++;
                        progress = ((ProgressCount / TotalProcess) * 100);
                        $("#label_process").text(index);
                        $("#jqxProgressBar").jqxProgressBar({animationDuration: 50, value: progress});
                    }
                })
            })
        }

        $(document).on('complete', '#jqxProgressBar', function (event) {
            setTimeout($.unblockUI, 100);
            $('#import_file_form')[0].reset();
            $("#table_list").jqxComboBox('clearSelection');
        })

        $("#download").on('click', function(e){
            e.preventDefault();
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            if(SelectedTab == 0){
                $("#customer_card_grid_pending").jqxGrid('exportdata', 'xls', 'Customer Card Pending', true, null, true, base_url + 'assets/js/jqwidgets_5.6/save-file.php'); 
            }else if(SelectedTab == 1){
                $("#customer_card_grid_declined").jqxGrid('exportdata', 'xls', 'Customer Card Declined', true, null, true, base_url + 'assets/js/jqwidgets_5.6/save-file.php');
            }else if(SelectedTab == 2){
                $("#customer_card_grid_approved").jqxGrid('exportdata', 'xls', 'Customer Card Approved', true, null, true, base_url + 'assets/js/jqwidgets_5.6/save-file.php');
            }
        })
        
        $("#renew_token").on('click', function(e){
            e.preventDefault();
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var GridId = '';
            if(SelectedTab == 3){
                GridId = 'pending';
            }else if(SelectedTab == 4){
                GridId = 'declined';
            }
            
            if(SelectedTab == 3 || SelectedTab == 4){
                var getSelectedRows = $("#customer_card_grid_renew_"+GridId).jqxGrid('selectedrowindexes');
                if(getSelectedRows.length > 0){
                    var labelcard = '';
                    if(getSelectedRows.length > 1){
                        labelcard = 'cards';
                    }else{
                        labelcard = 'card';
                    }
                    WindowPopupAlert('Message info')
                    .then(function(){
                        populateAlertWindow('renew_token_q', '')
                        .then(function(){
                            $("#alert_window_content").append(
                                '<h4>Would you like to renew token of selected '+labelcard+'?</h4>'+
                                '<br>'+
                                '<div style="width: 100%; overflow: hidden; text-align: right; position: absolute; bottom: 0; padding: 0 10px 5px 0;">'+
                                    '<button type="submit" class="btn btn-success btn-lg yes">Yes</button>&nbsp;'+
                                    '<button type="button" class="btn btn-danger btn-lg no">No</button>'+
                                '</div>'
                            )
                        })
                    })
                }else{
                    WindowPopupAlert('Message Info')
                    .then(function(){
                        populateAlertWindow('edit_failed', '')
                        .then(function(){
                            $("#alert_window_content").append(
                                '<h4>Check the row(s) to renew token.</h4>'+
                                '<br>'+
                                '<div style="width: 100%; overflow: hidden; text-align: right; position: absolute; bottom: 0; padding: 0 10px 5px 0;">'+
                                    '<button type="submit" class="btn btn-danger">Close</button>'+
                                '</div>'
                            )
                        })
                    })
                } 
            }else{
                WindowPopupAlert('Message Info')
                .then(function(){
                    populateAlertWindow('edit_failed', '')
                    .then(function(){
                        $("#alert_window_content").append(
                            '<h4>Please select Renew Pending or Renew Declined tab.</h4>'+
                            '<br>'+
                            '<div style="width: 100%; overflow: hidden; text-align: right; position: absolute; bottom: 0; padding: 0 10px 5px 0;">'+
                                '<button type="submit" class="btn btn-danger">Close</button>'+
                            '</div>'
                        )
                    })
                })
            }
        })

        $(document).on('submit', '#renew_token_q', function(e){
            e.preventDefault();
            resApproved = 0;
            resDeclined = 0;
            $("#alert_window_message").jqxWindow('close');

            var SelectedItemsArr = [];
            var SelectedTab = $('#tabs').jqxTabs('selectedItem'); 
            var GridId = '';
            if(SelectedTab == 3){
                GridId = 'pending';
            }else if(SelectedTab == 4){
                GridId = 'declined';
            }

            var getSelectedRows = $("#customer_card_grid_renew_"+GridId).jqxGrid('selectedrowindexes');

            $.blockUI({ 
                css: { 
                    textAlign: 'center', 
                    width: 'auto',
                    baseZ: 1000,
                    border: 'none',
                    backgroundColor: 'transparent', 
                    opacity: 1, 
                    color: '#fff',
                    fontSize: '20px'
                }, message: '<span style="color: #fff; font-size: 14px; font-weight: bold;" id="label_process"></span><br><div id="jqxProgressBar3"></div>'
            });

            $("#jqxProgressBar3").jqxProgressBar({ animationDuration: 0, showText: true, renderText: renderText, theme: "ui-le-frog", width: 250, height: 20, value: 0 });

            TotalProcess = getSelectedRows.length;
            for(var i=0; i<getSelectedRows.length; i++){
                var gridData = $("#customer_card_grid_renew_"+GridId).jqxGrid('getrowdata', getSelectedRows[i]);
                SelectedItemsArr.push(gridData);
            }

            var ProgressCount = 0;
            
            if(getSelectedRows.length == SelectedItemsArr.length){
                $.each(SelectedItemsArr, function(index, value){
                    var progress = 0;
                    
                    var postdata ="Unique="+value.Unique;
                        postdata+="&CustomerUnique="+value.CustomerUnique;
                        postdata+="&RecordNo="+encodeURIComponent(value.RecordNo);
                        postdata+="&Frequency="+value.Frequency;
                    $.ajax({
                        url: base_url + 'backoffice/customer-card/renew-token',
                        method: 'post',
                        dataType: 'json',
                        data: postdata,
                        beforeSend: function(){
                            
                        },
                        success: function(data){
                            if(data.resultProcess == 'Approved'){
                                resApproved = (resApproved + 1);
                            }else if(data.resultProcess == 'Declined'){
                                resDeclined = (resDeclined + 1);
                            }   
                        },
                        error: function(){
                            alert('We ecountered a technical difficulty\nPlease try again later.');
                        },
                        complete: function(){
                            ProgressCount++;
                            progress = ((ProgressCount / TotalProcess) * 100);
                            $("#label_process").text(value.CardHolderName);
                            $("#jqxProgressBar3").val(progress);
                        }
                    })
                })
            }
        })


    }, 100);
}])
})();