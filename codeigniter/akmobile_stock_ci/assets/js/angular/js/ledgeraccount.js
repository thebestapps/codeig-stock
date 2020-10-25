$(function(){

    $("#RedirectDashboard").on('click', function(){
        window.location = base_url+'backoffice/dashboard';
    })

    var Columns = [];
	var FieldTypes = [];
	var RowColumns = function(){
		var def = $.Deferred();
        var counter = 1;
        var totalcount = gridcolrow.gridcols;
        $.each(gridcolrow.gridcols, function(index, value){
            if(value.aggregates == 1){
                Columns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, aggregates: [{
                        'Total': function (aggregatedValue, currentValue, column, record) {
                            var total = currentValue;
                            var returnTotal = 0;
                            returnTotal = aggregatedValue + total;
                            return returnTotal;
                        }
                    }],
                    aggregatesRenderer: function (aggregates, column, element) {
                        var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
                        var Total=parseFloat(0).toFixed(2);
                        if(aggregates.Total){
                            Total = aggregates.Total;
                        }
                        renderString +=  Total + "</div>";
                        return renderString;
                    } 
                })
            }else{
                Columns.push({ text: value.text, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, 
                    cellsrenderer: function(rowindex, rowdatafield, rowvalue, defaultvalue, column, rowdata) {
                        if(rowdatafield == 'StockAdjustment'){
                            if(rowvalue == '1'){
                                return rowdata.StockAdjustment = '<div style="margin: 4px; margin-top:5px; text-align: ' + value.cellsalign + '; color: #ff0000;">YES</div>';
                            }else{
                                return rowdata.StockAdjustment = '<div style="margin: 4px; margin-top:5px; text-align: ' + value.cellsalign + ';">NO</div>';
                            }
                        }
                    } 
                })
            }

            FieldTypes.push(gridcolrow.gridtype);

            if(counter == totalcount.length){
                def.resolve();
            }

            counter++;
        })
		return def.promise();
    }

    var processingTransaction = (action, actionType, postdata = []) => {
        var def = $.Deferred();
        var result = [];
        // Post
        if(actionType == 'post'){
            $.ajax({
                url: base_url+ 'backoffice/ledger_account/'+action,
                type: actionType,
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    def.resolve(data);
                },
                done: function(){

                },
                error: function(){
                    
                }
            })
        // Get
        }else{
            $.ajax({
                url: base_url+ 'backoffice/ledger_account/'+action,
                type: actionType,
                dataType: 'json',
                beforeSend: function(){

                },
                success: function(data){
                    def.resolve(data);
                },
                done: function(){

                },
                error: function(){
                    
                }
            })
        }
        return def.promise();
    }

    var ledgerGrid = (data = []) => {
        var ResoHeight = $("#fakeheight").height();
        var TopHeight = $(".navbar").height() + 100;
        var UseHeight = (ResoHeight - TopHeight);

        var source = {
            datatype: "json",
            datafields: FieldTypes,
            localdata: []
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#grid").jqxGrid({
            source: dataAdapter,
            height: UseHeight,
            width: "100%",
            theme: 'darkblue',
            showtoolbar: false,
            toolbarheight: 50,
            rendertoolbar: function (toolbar) {
                var me = this;
                    var container = $("<div style='margin: 5px;'></div>");
                    toolbar.append(container);
                    // container.append('<input style="margin-left: 5px;" id="addrowbutton" type="button" value="New" />');
                    // container.append('<input style="margin-left: 5px;" id="updaterowbutton" type="button" value="View" />');
                    // $("#addrowbutton").jqxButton({template: 'primary', width: 60, height: 40});
                    // $("#updaterowbutton").jqxButton({template: 'info', width: 60, height: 40});
                    // update row.
                    $("#updaterowbutton").on('click', function () {
                        var rowindex = $('#grid').jqxGrid('getselectedrowindex');
                        var rowid = $('#grid').jqxGrid('getrowid', rowindex);
                        var rowdata = $("#grid").jqxGrid('getrowdatabyid', rowid);

                        if(rowindex >= 0){
                            AccountLedgerForm('edit').then(function(){
                                AccountLedgerFormWindow('View | Account# '+rowdata.AccountNumber).then(function(){
                                    $("#AccountNumber").focus();
                                })
                            })
                        }else{
                            var msg = 'No row selected!';
                            MessageForm(msg)
                            .then(function(){
                                MessageFormWindow('Alert message');
                            })
                            
                        }
                    });
                    // create new row.
                    $("#addrowbutton").on('click', function () {
                        AccountLedgerForm('new').then(function(){
                            AccountLedgerFormWindow("New").then(function(){
                                $("#AccountNumber").focus();
                            })
                        })
                    });
                    // delete row.
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#grid").jqxGrid('getselectedrowindex');
                        
                    });
            },
            columns: Columns
        })

        var source = {
            datatype: "json",
            localdata: data
        };
        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#grid").jqxGrid({
            source: dataAdapter
        })

        $('#grid').on('rowdoubleclick', function (event) { 
            var rowindex = $('#grid').jqxGrid('getselectedrowindex');
            var rowid = $('#grid').jqxGrid('getrowid', rowindex);
            var rowdata = $("#grid").jqxGrid('getrowdatabyid', rowid);

            AccountLedgerForm('edit').then(function(){
                AccountLedgerFormWindow('View | Account# '+rowdata.AccountNumber).then(function(){
                    $("#AccountNumber").focus();
                })
            })
        })
    }
    
    RowColumns().then(function(){
        processingTransaction('get', 'get', [])
        .then(function(data){
            ledgerGrid(data);
        })
    })

    var MessageForm = (message) => {
        var def = $.Deferred();
        $("body").append(
            '<div id="message" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="message_container" style="background: #144766; color:#EEE; overflow: hidden;">'+
                    '<p style="font-size: 1.5em;">'+message+'</p>'+
                    '<div id="default_button_function" class="form-group" style="position: absolute; bottom: 0;">'+
                        '<button type="button" id="form_okay_button">Okay</button>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        $("#form_okay_button").jqxButton({template: 'primary', width: 60, height: 45});

        $("#form_okay_button").on('click', function(){
            $("#message").jqxWindow('close');
        })

        $("#message").on('close', function(){
            $("#form_okay_button").jqxButton('destroy');
            $("#message").jqxWindow('destroy');
            $("#message").remove();
        })
        
        setTimeout(function(){
            $("#form_okay_button").jqxButton('focus');
            def.resolve();
        },100)

        return def.promise();
    }

    var MessageFormWindow = (titleStr = '') => {
        var def = $.Deferred();
        $("#message").jqxWindow({
            height: 200,
            minWidth: 400,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: close,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        setTimeout(function(){
            $("#message").jqxWindow({title : titleStr})
            $("#message").jqxWindow('open');
            def.resolve();
        },100);

        return def.promise();
    }

    var AccountLedgerForm = (action) => {
        var def = $.Deferred();
        var deleteAction = false;
        htmlRenderedElems = '';
        $.each(FormComponent, function(index, value){
            var Required = (value.Required == 1 ? 'required' : '');

            if(value.Field == 'StockAdjustment'){
                htmlRenderedElems+='<div class="form-group row">'+
                                        '<label for="accountNumber" class="col-sm-4 col-form-label">'+value.Label+':</label>'+
                                        '<div class="col-sm-7">'+
                                            '<input type="hidden" id="'+value.Field+'" value="0"/>'+
                                            '<div style="margin-top: 10px; float:left;" id="StockAdjustmentYes"><span style="color:#fff; font-size: 1.2em;">Yes</span></div>'+
                                            '<div style="margin-top: 10px; float:left;" id="StockAdjustmentNo"><span style="color:#fff; font-size: 1.2em;">No</span></div>'+
                                        '</div>'+
                                    '</div>'
            }else{
                htmlRenderedElems+='<div class="form-group row">'+
                                        '<label for="accountNumber" class="col-sm-4 col-form-label">'+value.Label+':</label>'+
                                        '<div class="col-sm-7">'+
                                            '<input type="text" class="form-control" id="'+value.Field+'" '+Required+'>'+
                                        '</div>'+
                                    '</div>'
            }

            
        })

        $("body").append(
            '<div id="add_new_form" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="add_new_form_container" style="background: #144766; color:#EEE; overflow: hidden;">'+
                    '<form id="add_new_save">'+
                        '<div id="default_button_function" class="form-group">'+
                            '<button type="button" id="form_delete_button" style="display:none;">Delete</button>'+
                            '<button type="submit" id="form_save_button" disabled>Save</button>&nbsp;&nbsp;'+
                            '<button type="button" id="form_cancel_button">Close</button>'+
                        '</div>'+

                        '<div id="secondary_button_function" class="form-group" style="display:none;">'+
                            '<label id="labelTitle">Do you want to save changes?</label>&nbsp;&nbsp;'+
                            '<button type="button" id="form_edit_save_button">Yes</button>&nbsp;&nbsp;'+
                            '<button type="button" id="form_edit_cancel_button">No</button>'+
                        '</div>'+

                        '<br>'+
                        htmlRenderedElems+
                    '</form>'+
                '</div>'+
            '</div>'
        )

        // Radio Button functions
        $("#StockAdjustmentYes").jqxRadioButton({ width: 60, height: 80, theme: 'ui-smoothness'});
        $("#StockAdjustmentNo").jqxRadioButton({ width: 60, height: 80, theme: 'ui-smoothness', checked: true});
        
        $('#StockAdjustmentYes').on('change', function (event) {
            var checked = event.args.checked;
            if (checked) {
                $("#StockAdjustment").val(1);
                $("#form_save_button").jqxButton({disabled: false});
            }
        })
        $('#StockAdjustmentNo').on('change', function (event) {
            var checked = event.args.checked;
            if(checked){
                $("#StockAdjustment").val(0);
                $("#form_save_button").jqxButton({disabled: false});
            }
        })

        if(action == 'edit'){
            $("#form_delete_button").show();
            $("#form_delete_button").css({"margin-right" : '10px'});

            var rowindex = $('#grid').jqxGrid('getselectedrowindex');
            var rowid = $('#grid').jqxGrid('getrowid', rowindex);
            var rowdata = $("#grid").jqxGrid('getrowdatabyid', rowid);
            
            $.each(FormComponent, function(index, value){
                if(value.Field == 'StockAdjustment'){
                    if(rowdata.StockAdjustment == 1){
                        $("#StockAdjustmentYes").jqxRadioButton({checked: true});
                        $("#StockAdjustmentNo").jqxRadioButton({checked: false});
                    }else{
                        $("#StockAdjustmentYes").jqxRadioButton({checked: false});
                        $("#StockAdjustmentNo").jqxRadioButton({checked: true});
                    }
                }else{
                    $("#"+value.Field).val(rowdata[value.Field]);
                }
            })
        }
        
        // Button functions
        $("#form_delete_button").jqxButton({template: 'danger', width: 60, height: 45});
        $("#form_save_button").jqxButton({template: 'primary', width: 60, height: 45, disabled: true});
        $("#form_edit_save_button").jqxButton({template: 'primary', width: 60, height: 45});
        $("#form_cancel_button, #form_edit_cancel_button").jqxButton({template: 'info', width: 60, height: 45});

        // Button Cancel event
        $("#form_cancel_button").on('click', function(){
            if($("#form_save_button").is(":disabled") == false){
                $("#default_button_function").hide();
                $("#secondary_button_function").show();
                return false;
            }
            $("#add_new_form").jqxWindow('close');
        })
        // Button Save event
        $("#add_new_save").submit(function(e){
            e.preventDefault();
            var rowdata = {};
            $.each(FormComponent, function(index, value){
                rowdata[value.Field] = $("#"+value.Field).val(); 
            })

            if(action == 'new'){
                if($("#StockAdjustment").length > 0){
                    var rowsdata = $("#grid").jqxGrid('getrows');
                    $.each(rowsdata, function(index, value){
                        if( $("#StockAdjustment").val() == 1 ){
                            value.StockAdjustment = 0;
                            $('#grid').jqxGrid('updaterow', value.uid, value);
                        }
                    })
                }

                $("#grid").jqxGrid("addrow", null, rowdata, "first");
                // Background processing
                delete rowdata["uid"];
                processingTransaction('new', 'post', rowdata)
                .then(function(data){
                    var rowindex = $('#grid').jqxGrid('getselectedrowindex');
                    var rowid = $('#grid').jqxGrid('getrowid', rowindex);
                    rowdata["Unique"] = data.Unique;
                    $('#grid').jqxGrid('updaterow', rowid, rowdata);
                    rowdata = {};
                })

                
                $("#add_new_form").jqxWindow('close');
                $('#grid').jqxGrid('selectrow', 0);
                $("#updaterowbutton").trigger('click');
            }else{
                var rowindex = $('#grid').jqxGrid('getselectedrowindex');
                var rowid = $('#grid').jqxGrid('getrowid', rowindex);
                var row = $("#grid").jqxGrid('getrowdatabyid', rowid);

                rowdata["Unique"] = row.Unique;

                $.each(FormComponent, function(index, value){
                    rowdata[value.Field] = $("#"+value.Field).val(); 
                    if( $("#StockAdjustment").val() == 1 ){
                        var rowsdata = $("#grid").jqxGrid('getrows');
                        $.each(rowsdata, function(index2, value2){
                            value2.StockAdjustment = 0;
                            $('#grid').jqxGrid('updaterow', value2.uid, value2);
                        })
                        
                    }
                })

                $('#grid').jqxGrid('updaterow', rowid, rowdata);

                delete rowdata["uid"];
                delete rowdata["undefined"];
                processingTransaction('update', 'post', rowdata);
                rowdata = {};

                $("#form_save_button").jqxButton({disabled: true});
            }
        })
        // Remove elements from the body of the page
        $("#add_new_form").on('close', function(){
            $("#form_save_button, #form_cancel_button, #form_delete_button, #form_edit_save_button, #form_edit_cancel_button").jqxButton('destroy');
            $("#add_new_form").jqxWindow('destroy');
            $("#add_new_form").remove();
        })

        // Button Delete event
        $("#form_delete_button").on('click', function(){
            var rowindex = $('#grid').jqxGrid('getselectedrowindex');
            var rowid = $('#grid').jqxGrid('getrowid', rowindex);
            var row = $("#grid").jqxGrid('getrowdatabyid', rowid);

            $("#labelTitle").text("Are you sure to delete account# "+row.AccountNumber+"? ");

            $("#default_button_function").hide();
            $("#secondary_button_function").show();
            deleteAction = true;
        })

        // Button Question Yes event
        $("#form_edit_save_button").on('click', function(){
            rowdata = {};
            var rowindex = $('#grid').jqxGrid('getselectedrowindex');
            var rowid = $('#grid').jqxGrid('getrowid', rowindex);
            var row = $("#grid").jqxGrid('getrowdatabyid', rowid);

            if(action == 'new'){
                $("#add_new_save").trigger('submit');
                rowdata = {};
                $("#add_new_form").jqxWindow('close');
                return;
            }else{
                
                if(deleteAction){
                    rowdata["Unique"] = row.Unique;
                    $("#grid").jqxGrid('deleterow', rowid);

                    // Delete process here
                    delete rowdata["uid"];
                    delete rowdata["undefined"];
                    processingTransaction('delete', 'post', rowdata);
                }else{
                    $("#add_new_save").trigger('submit');
                    rowdata = {};
                    $("#add_new_form").jqxWindow('close');
                    return;
                }
                
            }
            rowdata = {};
            $("#add_new_form").jqxWindow('close');
        })

        // Button Question No event
        $("#form_edit_cancel_button").on('click', function(){
            $("#add_new_form").jqxWindow('close');
        })

        $.each(FormComponent, function(index, value){
            $("#"+value.Field).on("change keyup", function(){
                $("#form_save_button").jqxButton({disabled : false});
            })
        })

        setTimeout(function(){
            def.resolve();
        },100)
        return def.promise();
    }

    var AccountLedgerFormWindow = (titleStr) => {
        var def = $.Deferred();
        $("#add_new_form").jqxWindow({
            height: 350,
            minWidth: 500,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: false,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        setTimeout(function(){
            $("#add_new_form").jqxWindow({title: titleStr});
            $("#add_new_form").jqxWindow('open');
            def.resolve();
        },100)

        return def.promise();
    }
    
})