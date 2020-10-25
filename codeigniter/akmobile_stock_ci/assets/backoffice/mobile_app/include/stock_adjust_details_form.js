$(function(){
    var body_height = $("body").height();
    var StockAdjustChanges = false;
    $("#stock_details_delete, #stock_details_item_delete_button").jqxButton({ template: 'danger', enableHover: false, width: '30%', height: 40 });
    $("#stock_details_save").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40, disabled: true });
    $("#stock_details_close").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40 });
    $("#stock_details_complete").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40 });
    $("#stock_details_item_submit_button").jqxButton({ template: 'primary', enableHover: false, width: '35%', height: 40 });

    var reload_item_stock_details = (data = []) => {
        console.log('first load');
        var source = {
            localdata: data,
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
                { text: 'Qty', dataField: 'Quantity', align: 'right', cellsalign: 'right', width: '10%' }
            ]
        });
    }

    reload_item_stock_details();

    var OldQty = 1;
    $("#stock_adjust_details_grid").on('rowdoubleclick', function(event){
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        // row's visible index.
        var visibleIndex = args.visibleindex;
        // right click.
        var rightclick = args.rightclick;
        // original event.
        var ev = args.originalEvent;

        var rowid = $("#stock_adjust_details_grid").jqxGrid('getrowid', boundIndex);
        var rowdata = $("#stock_adjust_details_grid").jqxGrid('getrowdatabyid', rowid);
        OldQty = rowdata.Quantity;
        StockAdjustQty('StockAdjustChangeQuantity', rowdata.Item, rowdata.Quantity);
    })

    var StockAdjustQty = (form, title, val) => {
        $("body").append(
            '<div id="stock_adjust_quantity" style="display:none;">'+
                '<div id="stock_adjust_quantity_container">'+
                    '<form id="'+form+'">'+
                    '<label for="text-basic">Quantity:</label>'+
                    '<input style="margin-top: 2px; margin-left: 10px; height: 30px; width: 60px;" type="number" id="item_stock_details_quantity" value="'+val+'">&nbsp;'+
                    '<button type="submit" style="margin-top: 2px; margin-left: 10px;" id="StockAdjustQuantityChange">Save</button>'+
                    '</form>'+
                '</div>'+
            '</div>'
        );

        $("#StockAdjustQuantityChange").jqxButton({ template: 'primary', enableHover: false, width: '30%', height: 40 });

        $('#stock_adjust_quantity').jqxWindow({
            theme: theme,
            isModal: true,
            resizable: false,
            width: 200,
            height: 180,
            headerHeight: 30,
            showAnimationDuration: 0,
			closeAnimationDuration: 0,
        });

        $('#stock_adjust_quantity').jqxWindow('open');
        $('#stock_adjust_quantity').jqxWindow('setTitle', 'Item# ' + title);

        setTimeout(function(){
            $("#stock_adjust_quantity").on('close', function(){
                $("#stock_adjust_quantity").remove();
            })

            $("#item_stock_details_quantity").focus();
            $("#item_stock_details_quantity").select();
        },100)
    
        $('#StockAdjustChangeQuantity').on('submit', function(e){
            e.preventDefault();
            var rowindex = $("#stock_adjust_details_grid").jqxGrid('getselectedrowindex');
            var rowid = $("#stock_adjust_details_grid").jqxGrid('getrowid', rowindex);
            var rowdata = $("#stock_adjust_details_grid").jqxGrid('getrowdatabyid', rowid);
            rowdata["Quantity"] = ($("#item_stock_details_quantity").val() == '' ? 0 : $("#item_stock_details_quantity").val());

            if( $("#stock_details_unique").val() > 0  && OldQty != $("#item_stock_details_quantity").val()){
                rowdata["Changed"] = 1;
                $("#stock_adjust_details_grid").jqxGrid('updaterow', rowid, rowdata);
            }else{
                $("#stock_adjust_details_grid").jqxGrid('updaterow', rowid, rowdata);
            }

            $("#stock_adjust_quantity").jqxWindow('close');
            $("#stock_details_save").jqxButton({disabled : false});
        })
    }


    $("#stock_details_close").on('click', function(e){
        $("#stock_details_close").jqxButton({disabled : true});
        var check_save_button = $("#stock_details_save").jqxButton('disabled');
        if(check_save_button == false){
            AlertMessage('Message', 'Do you want to save your changes?', 'stock_adjust_details_save_changes', 5);
            $("#stock_details_close").jqxButton({disabled : false});
            return false;
        }   
        $("#stock_adjust_details_grid").jqxGrid('clear');
        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
        $("#stock_details_delete, #stock_details_complete").hide();
        $("#stock_details_save").jqxButton({disabled: true});
        $("#stock_adjust_details").hide();
        $("#dashboard").show();
        stock_details_close = '';
        $("#stock_details_close").jqxButton({disabled : false});
    })

    $("#stock_details_save").on('click',function(){
        StockAdjustDetailsSave()
        .then(function(data){
            reload_item_stock_details(data);
        })
        $("#stock_details_save").jqxButton({disabled : true});
    })

    var StockAdjustDetailsSave = () => {
        var def = $.Deferred();
        var StockAdjustSave = $("#stock_details_save").jqxButton('disabled');
        if(StockAdjustSave == false){  
            var StockAdjustInvoice = $("#stock_details_invoice").val();
            var StockAdjustNotes = $("#stock_details_notes").val();
            var getrowdata = $("#stock_adjust_details_grid").jqxGrid('getrows');
    
            var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
            var Status = '';
            if(selectedItem == 0){
                stock_adjust_grid_id = 'stock_adjust_grid_pending';
                Status = 1;
            }else if(selectedItem == 1){
                stock_adjust_grid_id = 'stock_adjust_grid_complete';
                Status = 2;
            }
            
            var postdata ="Invoice=" + StockAdjustInvoice;
                postdata+="&Notes=" + StockAdjustNotes;
                postdata+="&grid=" + JSON.stringify(getrowdata);
            
            if(stock_adjust_create == 'new'){
                $.ajax({
                    url: url + 'backoffice/mobile/stock-adjust/details-save',
                    method: 'POST',
                    dataType: 'json',
                    data: postdata,
                    beforeSend: function(){
                        
                    },
                    success: function(data){
                        $('#stock_adjust_grid_pending').jqxGrid({ selectedrowindex: 0}); 
                        $("#stock_details_delete, #stock_details_complete").show();
                        $("#stock_details_save").jqxButton({disabled: true});
                        $("#stock_details_unique").val(data.StockAdjustUnique);
                        $("#stock_details_complete").jqxButton({disabled : false});
                        $("#nav_bar_no_id").hide();
                        $("#nav_bar_id").show();
                        $("#nav_bar_id_value").text("ID: " + data.StockAdjustUnique);
                        AlertMessage('Message', 'New item saved.', 'default', 0);
                        stock_adjust_create = 'edit'
                        def.resolve(data.details);
                    }
                })
            }else{
                console.log("del",DeleteItemDetails);
                var Completed = $("#stock_details_complete").jqxButton('disabled');
                postdata+="&Unique=" + $("#stock_details_unique").val();
                postdata+="&Status=" + Status;
                postdata+="&DeleteItemQty="+JSON.stringify(DeleteItemDetails);
                postdata+="&Completed=" + (Completed ? 2 : 1);
        
                $.ajax({
                    url: url + 'backoffice/mobile/stock-adjust/details-update',
                    method: 'POST',
                    dataType: 'json',
                    data: postdata,
                    beforeSend: function(){
                        
                    },
                    success: function(data){
                        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
                        if(selectedItem == 0){
                            initialize_grid_pending(data)
                            .then(function(){
                                $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                            })
                        }else if(selectedItem == 1){
                            initialize_grid_complete(data)
                            .then(function(){
                                $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                            })
                        }
                        DeleteItemDetails = [];
                        $("#stock_details_save").jqxButton({disabled: true});
                        AlertMessage('Message', 'Item updated', 'default', 0);
                        def.resolve(data.details);
                    }
                })
            }
        }else{
            def.resolve();
        }

        return def.promise();
    }

    $("#stock_details_item_submit").on('submit', function(e){
        e.preventDefault();
        $("#stock_details_item_submit_button").jqxButton({disabled : true});
        var ItemSearch = $("#stock_details_item_search_input").val();
        if(!ItemSearch == ''){
            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/search',
                method: 'POST',
                dataType: 'json',
                data: {"Search" : $("#stock_details_item_search_input").val()},
                beforeSend: function(){
    
                },
                success: function(data){
                   var search_result = data.result;
                   if(search_result.length > 0){
                       $("#stock_details_item_search_input").val('');
                       if(search_result.length > 1){
                            stock_adjust_item_search_grid(data);
                            $("#stock_details_item_search").show();
                            $("#stock_adjust_details").hide();
                            $("#stock_adjust_search_item").focus();
                       }else{
                            search_result[0]["Quantity"] = 1;
                            console.log(search_result);
                            $("#stock_adjust_details_grid").jqxGrid('addrow', null, search_result);
                       }
                   }else{
                        var msg = 'Search not found';
                        AlertMessage('Message', msg, 'default', 0);
                   }
                }
            })
        }else{
            $("#stock_details_item_search").show();
            $("#stock_adjust_details").hide();
        }
        setTimeout(function(){
            $("#stock_details_item_submit_button").jqxButton({disabled : false});
        },1000)
    })

    $("#stock_details_invoice, #stock_details_notes").on('keydown', function(){
        StockAdjustChanges = true;
        $("#stock_details_save").jqxButton({disabled: false});
    })

    $(document).on('click', '#stock_adjust_details_save_changes #stock_adjust_alert_yes2_button', function(e){
        e.preventDefault();
        $("#stock_adjust_alert_yes2_button").jqxButton({disabled : true});
        var StockAdjustInvoice = $("#stock_details_invoice").val();
        var StockAdjustNotes = $("#stock_details_notes").val();
        var getrowdata = $("#stock_adjust_details_grid").jqxGrid('getrows');

        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
        var Status = '';
        if(selectedItem == 0){
            stock_adjust_grid_id = 'stock_adjust_grid_pending';
            Status = 1;
        }else if(selectedItem == 1){
            stock_adjust_grid_id = 'stock_adjust_grid_complete';
            Status = 2;
        }
        
        var postdata ="Invoice=" + StockAdjustInvoice;
            postdata+="&Notes=" + StockAdjustNotes;
            postdata+="&grid=" + JSON.stringify(getrowdata);
        
        if(stock_adjust_create == 'new'){    
            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/details-save',
                method: 'POST',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){
                    
                },
                success: function(data){
                    var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
                    if(selectedItem == 0){
                        initialize_grid_pending(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }else if(selectedItem == 1){
                        initialize_grid_complete(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }
                    $("#stock_details_delete, #stock_details_complete").show();
                    $("#stock_details_save").jqxButton({disabled: true});
                    $("#stock_adjust_alert_message").jqxWindow('close');
                    $("#dashboard").show();
                    $("#stock_adjust_details").hide();
                    $("#stock_details_unique").val(data.StockAdjustUnique);
                    AlertMessage('Message', 'New item saved', 'default', 0);
                    stock_details_close = '';
                }
            })
        }else{
            postdata+="&Unique=" + $("#stock_details_unique").val();
            postdata+="&Status=" + Status;
            postdata+="&DeleteItemQty="+JSON.stringify(DeleteItemDetails);

            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/details-update',
                method: 'POST',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){
                    
                },
                success: function(data){
                    var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
                    if(selectedItem == 0){
                        initialize_grid_pending(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }else if(selectedItem == 1){
                        initialize_grid_complete(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }
                    
                    $("#stock_details_save").jqxButton({disabled: true});
                    $("#stock_adjust_alert_message").jqxWindow('close');
                    $("#dashboard").show();
                    $("#stock_adjust_details").hide();
                    AlertMessage('Message', 'Item updated', 'default', 0);
                    stock_details_close = '';
                    DeleteItemDetails = [];
                }
            })
        }
    })

    $(document).on('click', '#stock_adjust_details_save_changes #stock_adjust_alert_no2_button', function(){
        $("#stock_adjust_alert_no2_button").jqxButton({disabled : true});
        $('#stock_adjust_alert_message').jqxWindow('close');
        $("#dashboard").show();
        $("#stock_adjust_details").hide();
        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
        $("#stock_adjust_details_grid").jqxGrid('clear');
        $("#stock_details_delete, #stock_details_complete").hide();
        $("#stock_details_save").jqxButton({disabled: true});
        stock_details_close = '';
    })

    $(document).on('click', '#stock_adjust_details_save_changes #stock_adjust_alert_cancel2_button', function(){
        $('#stock_adjust_alert_message').jqxWindow('close');
    })

    $("#stock_details_delete").on('click', function(){
        $("#stock_details_delete").jqxButton({disabled : true});
        var msg = 'Are you sure do you want to delete '+$("#stock_details_invoice").val()+'?';
        AlertMessage('Question', msg, 'delete_stock_adjust_item2', 4);
        setTimeout(function(){
            $("#stock_details_delete").jqxButton({disabled : false});
        },1000)
    })

    $(document).on('click', '#delete_stock_adjust_item2 #stock_adjust_alert_yes_button', function(e){
        e.preventDefault();
        var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
        var Status = '';
        if(selectedItem == 0){
            stock_adjust_grid_id = 'stock_adjust_grid_pending';
            Status = 1;
        }else if(selectedItem == 1){
            stock_adjust_grid_id = 'stock_adjust_grid_complete';
            Status = 2;
        }   

        var postdata ="Unique=" + $("#stock_details_unique").val();
            postdata+="&Status=" + Status;
        $.ajax({
            url: url + 'backoffice/mobile/stock-adjust/delete',
            method: 'POST',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){

            },
            success: function(data){
                // $("#"+stock_adjust_grid_id).jqxGrid('clearSelection');
                
                if(selectedItem == 0){
                    initialize_grid_pending(data)
                    .then(function(){
                        $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                    })
                }else if(selectedItem == 1){
                    initialize_grid_complete(data)
                    .then(function(){
                        $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                    })
                }

                $("#stock_adjust_delete").jqxButton({disabled: true});
                $("#stock_adjust_edit").jqxButton({disabled: true});
                $('#stock_adjust_alert_message').jqxWindow('close');
                $("#dashboard").show();
                $("#stock_adjust_details").hide();
                $("#stock_details_invoice").val('');
                $("#stock_details_notes").val('');
                $("#stock_adjust_details_grid").jqxGrid('clear');
                $("#stock_details_delete, #stock_details_complete").hide();
            }
        })
    })

    $(document).on('click', '#delete_stock_adjust_item2 #stock_adjust_alert_no_button', function(e){
        e.preventDefault();
        $("#stock_adjust_delete").jqxButton({disabled: true});
        $("#stock_adjust_edit").jqxButton({disabled: true});
        $('#stock_adjust_alert_message').jqxWindow('close');
        $("#dashboard").show();
        $("#stock_adjust_details").hide();
        $("#stock_details_invoice").val('');
        $("#stock_details_notes").val('');
        $("#stock_adjust_details_grid").jqxGrid('clear');
        $("#stock_details_delete, #stock_details_complete").hide();
    })

    var DeleteItemDetails = [];
    $("#stock_details_item_delete_button").on('click', function(e){
        e.preventDefault();
        $("#stock_details_item_delete_button").jqxButton({disabled : true});
        var rowindex = $("#stock_adjust_details_grid").jqxGrid('getselectedrowindex');
        var rowid = $("#stock_adjust_details_grid").jqxGrid('getrowid', rowindex);
        var rowdata = $("#stock_adjust_details_grid").jqxGrid('getrowdatabyid', rowid);
        if(rowindex >= 0){
            $('#stock_adjust_details_grid').jqxGrid('deleterow', rowid);
            DeleteItemDetails.push(rowdata);
            $("#stock_details_save").jqxButton({disabled : false});
            $("#stock_details_item_delete_button").jqxButton({disabled : false});
        }else{
            var msg = 'Please select item'
            AlertMessage('Message', msg, 'default', 0);
        }

        setTimeout(function(){
            $("#stock_details_item_delete_button").jqxButton({disabled : false});
        },1000)
    })

    $("#stock_details_complete").on('click', function(e){
        e.preventDefault();
        $("#stock_details_complete").jqxButton({disabled : true});
        StockAdjustDetailsSave()
        .then(function(after_save_data){
            var selectedItem = $('#tabs').jqxTabs('selectedItem'); 
            var Status = '';
            if(selectedItem == 0){
                stock_adjust_grid_id = 'stock_adjust_grid_pending';
                Status = 1;
            }else if(selectedItem == 1){
                stock_adjust_grid_id = 'stock_adjust_grid_complete';
                Status = 2;
            }   
    
            var getrowdata = $("#stock_adjust_details_grid").jqxGrid('getrows');
            var StockAdjustUniqueStatus = $("#stock_details_unique").val();
            var postdata ="Unique=" + StockAdjustUniqueStatus;
                postdata+="&Status=" + Status;
                postdata+="&grid=" + JSON.stringify(getrowdata);
            $.ajax({
                url: url + 'backoffice/mobile/stock-adjust/complete-details',
                method: 'POST',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){
    
                },
                success: function(data){
                    if(selectedItem == 0){
                        initialize_grid_pending(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }else if(selectedItem == 1){
                        initialize_grid_complete(data)
                        .then(function(){
                            $('#'+stock_adjust_grid_id).jqxGrid({ selectedrowindex: 0}); 
                        })
                    }
                    $("#stock_adjust_details_grid").jqxGrid('clear');
                    if(after_save_data){
                        reload_item_stock_details(after_save_data);
                    }else{
                        reload_item_stock_details(data.details);
                    }

                    AlertMessage('Message', 'Stock adjust complete!', 'default', 0);
                },
                complete: function(){
                    $("#stock_details_complete").jqxButton({disabled : true});
                }
            })
        })
    })
})

