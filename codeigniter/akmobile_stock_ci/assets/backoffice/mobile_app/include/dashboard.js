var theme = 'darkblue';
var stock_adjust_create = '';
$(document).ready(function () {
    var body_height = $("body").height();
    var use_grid_size = body_height - 145;

    // jqxGrid data source
    window.initialize_grid_pending = (data) => {
        var def = $.Deferred();
        var source = {
            localdata: data.result,
            datatype: "json",
            datafields: [
                { name: 'Unique', type: 'int' },
                { name: 'AdjustDate', type: 'date' },
                { name: 'Invoice', type: 'string' },
                { name: 'Notes', type: 'string'},
                { name: 'Status', type: 'string'}
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#stock_adjust_grid_pending").jqxGrid({
            width: '100%',
            height: use_grid_size,
            source: dataAdapter,
            theme: theme,
            columnsheight: 40,
            columnsmenuwidth: 40,
            pagesize: 20,
            pageable: true,
            pagermode: 'simple',
            rowsheight: 40,
            columns: [
                { text: 'Unique', dataField: 'Unique', width: '20%' },
                { text: 'Date', dataField: 'AdjustDate', width: '40%', cellsformat: 'MM-dd-yyyy' },
                { text: 'Invoice', dataField: 'Invoice', width: '40%' }
            ]
        });

        $("#stock_adjust_grid_pending").on('rowselect', function (event){
            // event arguments.
            var args = event.args;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;

            if(rowData){
                $("#stock_adjust_edit").jqxButton({disabled: false });
                $("#stock_adjust_delete").jqxButton({disabled: false });
            }
        })

        setTimeout(function(){
            def.resolve();
        },100)   
        return def.promise();
    }

    $("#stock_adjust_grid_pending").on('rowdoubleclick', function(event){
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        // row's visible index.
        var visibleIndex = args.visibleindex;
        // right click.
        var rightclick = args.rightclick; 
        // original event.
        var ev = args.originalEvent;

        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
       
        var rowid = $("#stock_adjust_grid_pending").jqxGrid('getrowid', boundIndex);
        var rowdata = $("#stock_adjust_grid_pending").jqxGrid('getrowdatabyid', rowid);
        $.ajax({
            url: url + 'backoffice/mobile/stock-adjust/get-item-details',
            method: 'POST',
            dataType: 'json',
            data: {"AdjustUnique" : rowdata.Unique},
            beforeSend: function(){

            },
            success: function(data){
                var source = {
                    localdata: data.result,
                    datatype: "json",
                    datafields: [
                        { name: 'StockAdjustDetailUnique', type: 'int'},
                        { name: 'Unique', type: 'int' },
                        { name: 'ID', type: 'int'},
                        { name: 'AdjustUnique', type: 'int'},
                        { name: 'StockLineUnique', type: 'int'},
                        { name: 'Item', type: 'string' },
                        { name: 'Part', type: 'string' },
                        { name: 'Description', type: 'string' },
                        { name: 'Quantity', type: 'int' }
                    ]
                };
            
                var dataAdapter = new $.jqx.dataAdapter(source);
                var use_grid_details_height = body_height - 245;
                $("#stock_adjust_details_grid").jqxGrid({
                    width: '100%',
                    height: use_grid_details_height,
                    source: dataAdapter,
                    theme: theme,
                    columnsheight: 40,
                    columnsmenuwidth: 40,
                    rowsheight: 34,
                    columns: [
                        { text: 'Item', dataField: 'Item', width: '20%' },
                        { text: 'Barcode', dataField: 'Part', width: '30%' },
                        { text: 'Description', dataField: 'Description', width: '40%' },
                        { text: 'Qty', dataField: 'Quantity', align: 'center', cellsalign: 'center', width: '10%' }
                    ]
                })
            },
            complete: function(){
                $("#stock_details_unique").val(rowdata.Unique);
                $("#stock_details_status").val(rowdata.Status);
                $("#stock_details_invoice").val(rowdata.Invoice);
                $("#stock_details_notes").val(rowdata.Notes);
                $("#stock_adjust_details").show();
                $("#dashboard").hide();
                $("#stock_details_invoice").focus();
                $("#stock_details_delete").show();
                $("#nav_bar_no_id").hide();
                $("#nav_bar_id").show();
                $("#nav_bar_id_value").text("ID: " + rowdata.Unique);
            }
        })
            
        stock_adjust_create = 'edit';
        $("#stock_details_complete").show();
        $("#stock_details_complete").jqxButton({disabled: false});
        
    })

    window.initialize_grid_complete = (data) => {
        var def = $.Deferred();
        var source = {
            localdata: data.result,
            datatype: "json",
            datafields: [
                { name: 'Unique', type: 'int' },
                { name: 'AdjustDate', type: 'date' },
                { name: 'Invoice', type: 'string' },
                { name: 'Notes', type: 'string'}
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#stock_adjust_grid_complete").jqxGrid({
            width: '100%',
            height: use_grid_size,
            source: dataAdapter,
            theme: theme,
            columnsheight: 40,
            pagesize: 20,
            pageable: true,
            pagermode: 'simple',
            columnsmenuwidth: 40,
            rowsheight: 40,
            columns: [
                { text: 'Unique', dataField: 'Unique', width: '20%' },
                { text: 'Date', dataField: 'AdjustDate', width: '40%', cellsformat: 'MM-dd-yyyy' },
                { text: 'Invoice', dataField: 'Invoice', width: '40%' }
            ]
        });

        $("#stock_adjust_grid_complete").on('rowselect', function (event){
            // event arguments.
            var args = event.args;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;

            if(rowData){
                $("#stock_adjust_edit").jqxButton({disabled: false });
                $("#stock_adjust_delete").jqxButton({disabled: false });
            }
        })

        setTimeout(function(){
            def.resolve();
        },100)   
        return def.promise();
    }

    $("#stock_adjust_grid_complete").on('rowdoubleclick', function(event){
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        // row's visible index.
        var visibleIndex = args.visibleindex;
        // right click.
        var rightclick = args.rightclick; 
        // original event.
        var ev = args.originalEvent;

        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
       
        var rowid = $("#stock_adjust_grid_complete").jqxGrid('getrowid', boundIndex);
        var rowdata = $("#stock_adjust_grid_complete").jqxGrid('getrowdatabyid', rowid);
        $.ajax({
            url: url + 'backoffice/mobile/stock-adjust/get-item-details',
            method: 'POST',
            dataType: 'json',
            data: {"AdjustUnique" : rowdata.Unique},
            beforeSend: function(){

            },
            success: function(data){
                var source = {
                    localdata: data.result,
                    datatype: "json",
                    datafields: [
                        { name: 'StockAdjustDetailUnique', type: 'int'},
                        { name: 'Unique', type: 'int' },
                        { name: 'ID', type: 'int'},
                        { name: 'AdjustUnique', type: 'int'},
                        { name: 'StockLineUnique', type: 'int'},
                        { name: 'Item', type: 'string' },
                        { name: 'Part', type: 'string' },
                        { name: 'Description', type: 'string' },
                        { name: 'Quantity', type: 'int' }
                    ]
                };
            
                var dataAdapter = new $.jqx.dataAdapter(source);
                var use_grid_details_height = body_height - 245;
                $("#stock_adjust_details_grid").jqxGrid({
                    width: '100%',
                    height: use_grid_details_height,
                    source: dataAdapter,
                    theme: theme,
                    columnsheight: 40,
                    columnsmenuwidth: 40,
                    rowsheight: 34,
                    columns: [
                        { text: 'Item', dataField: 'Item', width: '20%' },
                        { text: 'Barcode', dataField: 'Part', width: '30%' },
                        { text: 'Description', dataField: 'Description', width: '40%' },
                        { text: 'Qty', dataField: 'Quantity', align: 'center', cellsalign: 'center', width: '10%' }
                    ]
                })
            },
            complete: function(){
                $("#stock_details_unique").val(rowdata.Unique);
                $("#stock_details_status").val(rowdata.Status);
                $("#stock_details_invoice").val(rowdata.Invoice);
                $("#stock_details_notes").val(rowdata.Notes);
                $("#stock_adjust_details").show();
                $("#dashboard").hide();
                $("#stock_details_invoice").focus();
                $("#stock_details_delete").show();
                $("#nav_bar_no_id").hide();
                $("#nav_bar_id").show();
                $("#nav_bar_id_value").text("ID: " + rowdata.Unique);
                stock_adjust_create = 'edit';

                $("#stock_details_complete").show();
                if(rowdata.Status == 1){
                    $("#stock_details_complete").jqxButton({disabled: false});
                }else{
                    $("#stock_details_complete").jqxButton({disabled: true});
                }
            }
        })
        
    })

    var initWidgets = function (tab) {
        switch (tab) {
            case 0:
                stock_adjust_get_list(1)
                .then(function(data){
                    initialize_grid_pending(data);
                })
                break;
        }
    }

    var stock_adjust_get_list = (status) => {
        var def = $.Deferred();
        $.ajax({
            url: url + 'backoffice/mobile/stock-adjust/list',
            method: 'POST',
            dataType: 'json',
            data: {"Status" : status},
            beforeSend: function(){

            },
            success: function(data){
                def.resolve(data)
            }
        })
        return def.promise();
    }
    
    var use_tab_height = body_height - 90;
    $('#tabs').jqxTabs({ theme: theme, position: 'bottom', width: '100%', height: use_tab_height, initTabContent: initWidgets });
    $('#tabs').on('tabclick', function (event) { 
        var clickedItem = event.args.item; 
        if(clickedItem == 0){
            stock_adjust_get_list(1)
            .then(function(data){
                initialize_grid_pending(data);
            })
        }else if(clickedItem == 1){
            stock_adjust_get_list(2)
            .then(function(data){
                initialize_grid_complete(data);
            })
        }
    }); 
    
    $("#stock_adjust_addnew").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40 });
    $("#stock_adjust_edit").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40,  disabled: true });
    $("#stock_adjust_delete").jqxButton({ template: 'danger', enableHover: false, width: '30%', height: 40, disabled: true });

    $("#stock_adjust_addnew").on('click', function(e){
        $("#stock_adjust_addnew").jqxButton({disabled : true});
        $("#stock_adjust_details").show();
        $("#dashboard").hide();
        $("#stock_details_invoice").focus();
        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
        $("#nav_bar_no_id").show();
        $("#nav_bar_id").hide();
        stock_adjust_create = 'new';

        setTimeout(function(){
            $("#stock_adjust_addnew").jqxButton({disabled : false});
        },100)
    })
   
    $("#stock_adjust_edit").on('click', function(e){
        $("#stock_adjust_edit").jqxButton({disabled : true});

        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');

        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
        var stock_adjust_grid_id = '';
        var Status = '';
        if(selectedItem == 0){
            Status = 1;
            stock_adjust_grid_id = 'stock_adjust_grid_pending';
        }else if(selectedItem == 1){
            Status = 2;
            stock_adjust_grid_id = 'stock_adjust_grid_complete';
        }

        var stock_adjust_grid_row_selected = $("#"+stock_adjust_grid_id).jqxGrid('getselectedrowindex');
        if(stock_adjust_grid_row_selected >= 0){
            var rowid = $("#"+stock_adjust_grid_id).jqxGrid('getrowid', stock_adjust_grid_row_selected);
            var rowdata = $("#"+stock_adjust_grid_id).jqxGrid('getrowdatabyid', rowid);
    
            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/get-item-details',
                method: 'POST',
                dataType: 'json',
                data: {"AdjustUnique" : rowdata.Unique},
                beforeSend: function(){
    
                },
                success: function(data){
                    var source = {
                        localdata: data.result,
                        datatype: "json",
                        datafields: [
                            { name: 'StockAdjustDetailUnique', type: 'int'},
                            { name: 'Unique', type: 'int' },
                            { name: 'ID', type: 'int'},
                            { name: 'AdjustUnique', type: 'int'},
                            { name: 'StockLineUnique', type: 'int'},
                            { name: 'Item', type: 'string' },
                            { name: 'Part', type: 'string' },
                            { name: 'Description', type: 'string' },
                            { name: 'Quantity', type: 'int' }
                        ]
                    };
                
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var use_grid_details_height = body_height - 245
                    $("#stock_adjust_details_grid").jqxGrid({
                        width: '100%',
                        height: use_grid_details_height,
                        source: dataAdapter,
                        theme: theme,
                        columnsheight: 40,
                        columnsmenuwidth: 40,
                        rowsheight: 34,
                        columns: [
                            { text: 'Item', dataField: 'Item', width: '20%' },
                            { text: 'Barcode', dataField: 'Part', width: '30%' },
                            { text: 'Description', dataField: 'Description', width: '40%' },
                            { text: 'Qty', dataField: 'Quantity', align: 'center', cellsalign: 'center', width: '10%' }
                        ]
                    })
                },
                complete: function(){
                    $("#stock_details_status").val(rowdata.Status);
                    $("#stock_details_unique").val(rowdata.Unique);
                    $("#stock_details_invoice").val(rowdata.Invoice);
                    $("#stock_details_notes").val(rowdata.Notes);
                    $("#stock_adjust_details").show();
                    $("#dashboard").hide();
                    $("#stock_details_invoice").focus();
                    $("#stock_details_delete").show();
                    $("#nav_bar_no_id").hide();
                    $("#nav_bar_id").show();
                    $("#nav_bar_id_value").text("ID: " + rowdata.Unique);
                    $("#stock_details_complete").show();
                    if(Status == 1){
                        $("#stock_details_complete").jqxButton({disabled : false});
                    }else if(Status == 2){
                        $("#stock_details_complete").jqxButton({disabled : true});
                    }
                }
            })
            stock_adjust_create = 'edit';

            if(rowdata.Status == 1){
                $("#stock_details_complete").show();
                $("#stock_details_complete").jqxButton({disabled: false});
            }else{
                $("#stock_details_complete").hide();
            }
        }else{
            var msg = 'Please select one';
            AlertMessage('Message', msg, 'default', 0);
        }

        setTimeout(function(){
            $("#stock_adjust_edit").jqxButton({disabled : false});
        },1000)
    })

    $("#stock_adjust_delete").on('click', function(){
        $("#stock_adjust_delete").jqxButton({disabled : true});

        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
        var Status = '';
        if(selectedItem == 0){
            stock_adjust_grid_id = 'stock_adjust_grid_pending';
            Status = 1;
        }else if(selectedItem == 1){
            stock_adjust_grid_id = 'stock_adjust_grid_complete';
            Status = 2;
        }
        
        var stock_adjust_grid_row_selected = $("#"+stock_adjust_grid_id).jqxGrid('getselectedrowindex');
        if(stock_adjust_grid_row_selected >= 0){
            var rowid = $("#"+stock_adjust_grid_id).jqxGrid('getrowid', stock_adjust_grid_row_selected);
            var rowdata = $("#"+stock_adjust_grid_id).jqxGrid('getrowdatabyid', rowid);     

            var msg = 'Are you sure do you want to delete '+rowdata.Invoice+'?';
            AlertMessage('Question', msg, 'delete_stock_adjust_item', 4);
        }

        setTimeout(function(){
            $("#stock_adjust_delete").jqxButton({disabled : false});
        },1000)
    })  

    $(document).on('click', '#delete_stock_adjust_item #stock_adjust_alert_no_button', function(e){
        e.preventDefault();
        $("#stock_adjust_alert_no_button").jqxButton({disabled : true});
        $('#stock_adjust_alert_message').jqxWindow('close');
    })

    $(document).on('click', '#delete_stock_adjust_item #stock_adjust_alert_yes_button', function(e){
        e.preventDefault();
        $("#stock_adjust_alert_yes_button").jqxButton({disabled : true});
        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
        var Status = '';
        if(selectedItem == 0){
            stock_adjust_grid_id = 'stock_adjust_grid_pending';
            Status = 1;
        }else if(selectedItem == 1){
            stock_adjust_grid_id = 'stock_adjust_grid_complete';
            Status = 2;
        }
        
        var stock_adjust_grid_row_selected = $("#"+stock_adjust_grid_id).jqxGrid('getselectedrowindex');

        if(stock_adjust_grid_row_selected >= 0){
            var rowid = $("#"+stock_adjust_grid_id).jqxGrid('getrowid', stock_adjust_grid_row_selected);
            var rowdata = $("#"+stock_adjust_grid_id).jqxGrid('getrowdatabyid', rowid);     

            var postdata ="Unique="+rowdata.Unique;
                postdata+="&Status=" + Status;
            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/delete',
                method: 'POST',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    if(selectedItem == 0){
                        initialize_grid_pending(data);
                    }else if(selectedItem == 1){
                        initialize_grid_complete(data);
                    }

                    $("#"+stock_adjust_grid_id).jqxGrid('clearSelection');
                    $("#stock_adjust_delete").jqxButton({disabled: true});
                    $("#stock_adjust_edit").jqxButton({disabled: true});
                    $('#stock_adjust_alert_message').jqxWindow('close');
                }
            })
        }
    })

    window.AlertMessage = (title, msg, form, alert = 0) => {
        if($("#stock_adjust_alert_message").length > 0){
            $("#stock_adjust_alert_message").jqxWindow('close');
        }

        var alert_default = '<button type="button" id="stock_adjust_alert_default_button">Close</button>';
        var alert_close_button = '<button type="button" id="stock_adjust_alert_close_button">Close</button>';
        var alert_okay_button = '<button type="button" id="stock_adjust_alert_okay_button">Okay</button>';
        var alert_okay_cancel = '<button type="button" id="stock_adjust_alert_okay2_button">Okay</button>&nbsp;&nbsp;<button id="stock_adjust_alert_cancel_button">Cancel</button>';
        var alert_yes_no_button = '<button type="button" id="stock_adjust_alert_yes_button">Yes</button>&nbsp;&nbsp;<button id="stock_adjust_alert_no_button">No</button>';
        var alert_yes_no_cancel_button = '<button type="button" id="stock_adjust_alert_yes2_button">Yes</button>&nbsp;&nbsp;<button id="stock_adjust_alert_no2_button">No</button>&nbsp;&nbsp;<button id="stock_adjust_alert_cancel2_button">Cancel</button>';
        var use_alert = '';
        if(alert == 1){ 
            use_alert = alert_close_button;
        }else if(alert == 2){
            use_alert = alert_okay_button;
        }else if(alert == 3){
            use_alert = alert_okay_cancel;
        }else if(alert == 4){
            use_alert = alert_yes_no_button;
        }else if(alert == 5){
            use_alert = alert_yes_no_cancel_button
        }else{
            use_alert = alert_default;
        }

        $("body").append(
            '<div id="stock_adjust_alert_message" style="display:none;">'+
                '<div id="stock_adjust_alert_message_container">'+
                    '<h3>'+msg+'</h3>'+
                    '<div style="position: absolute; bottom: 0; width: 100%; padding: 5px;">'+
                        '<form id="'+form+'">'+
                            use_alert+
                        '</form>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        $("#stock_adjust_alert_default_button, #stock_adjust_alert_close_button, #stock_adjust_alert_okay_button, #stock_adjust_alert_okay2_button, #stock_adjust_alert_yes_button, #stock_adjust_alert_cancel_butto, #stock_adjust_alert_no_button, #stock_adjust_alert_yes2_button, #stock_adjust_alert_no2_button, #stock_adjust_alert_cancel2_button").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40 });

        $('#stock_adjust_alert_message').jqxWindow({
            theme: theme,
            isModal: true,
            resizable: false,
            width: 300,
            height: 180,
            headerHeight: 30,
            showAnimationDuration: 0,
			closeAnimationDuration: 0,
        });

        $('#stock_adjust_alert_message').jqxWindow('open');
        $('#stock_adjust_alert_message').jqxWindow('setTitle', title);

        $("#stock_adjust_alert_default_button").on('click', function(){
            $('#stock_adjust_alert_message').jqxWindow('close');
        })

        setTimeout(function(){
            $('#stock_adjust_alert_message').on('close', function(){
                $('#stock_adjust_alert_message').jqxWindow('destroy');
                $('#stock_adjust_alert_message').remove();
            })
        },100)
    }

    $("#back_to_home").on('click', function(){
        window.location = url + 'pos/dashboard'
    })

    $("#show_keyboard").on('change', function(e){
        var keyboardswitch = $(this).val();
        if(keyboardswitch == 'on'){
            $("#stock_details_invoice, #stock_details_item_search_input, #stock_details_notes").attr('inputmode', 'none');
        }else{
            $("#stock_details_invoice, #stock_details_item_search_input, #stock_details_notes").removeAttr('inputmode');
        }
    })    
});