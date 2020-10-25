$(function(){
    var FakeHeight = $("#fakeheight").height();
    var LineInfo1 = 0;
    var LineInfo2 = 0;
    var LineInfo3 = 0;
    var ItemStockAdjust = 0;
    var StockAdjust = 1;
    var DeleteDetails = [];
    var BarcodeSTX = '';
    var DeletedGridItems = []; 

    $("#RedirectDashboard").on('click', function(){
        var POSDisable = $("#POSDisable").val();
        if(POSDisable == 1){
            window.location = base_url + 'backoffice/dashboard';
        }else{
            window.location = base_url + 'pos/cashier';
        }
    })

    function StockAdjustKeyPress(e) {
        var evtobj = window.event? event : e;
        if(evtobj.keyCode == 66 && evtobj.ctrlKey) {
            $("#SearchValue").focus();
            BarcodeSTX = 'Barcode';
        }
    }

    function ItemSearchKeyPress(e) {
        var evtobj = window.event? event : e;
        if(evtobj.keyCode == 66 && evtobj.ctrlKey) {
            $("#AddNewItemSearchInput").focus();
            BarcodeSTX = 'Barcode';
        }
    }

    // Load image
    var LoadingProcess = (msg) => {
        $.blockUI({ css: { 
            border: '2px solid #fff',
            padding: '15px', 
            backgroundColor: '#210e66', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 1, 
            color: '#fff',
            fontSize: '20px',
        }, message: '<div>'+msg+'</div>' });
    }

    var LoadingProcessEnd = () => {
        setTimeout($.unblockUI, 100); 
    }

    var Grid = (data = []) => {
        var HeaderTopHeight = $(".navbar").height();
        var MenuTopHeight = $(".navbar").height();
        var NewTopHeight = (HeaderTopHeight + MenuTopHeight);
        var UseHeight = (FakeHeight - NewTopHeight - 10);
        var NewTopHeight = (UseHeight);

        var source = {
            datatype: "json",
            datafields: [
                { name: 'Unique', 		type: 'number' },
                { name: 'Location',   	type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'Supplier',   	type: 'string' },
                { name: 'Company', 		type: 'string' },
                { name: 'AdjustDate', 	type: 'date'   },
                { name: 'Type', 		type: 'number' },
                { name: 'QuantityAdjust',type: 'number' },
                { name: 'AdjCost', 		type: 'number' },
                { name: 'Type1', 		type: 'string' },
                { name: 'Status', 		type: 'string' },
                { name: 'StatusID', 	type: 'string' },
                { name: 'Notes', 		type: 'string' },
                { name: 'CreatedBy', 	type: 'string' }
            ],
            localdata: data
        };
        
        var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
        $("#jqxgrid").jqxGrid({
            width           : '100%',
            height          : NewTopHeight,
            showtoolbar     : true,
            scrollbarsize	: GScrollBarSize,
            toolbarheight   : 50,
            theme           : Gtheme,
            columnsresize	: true,
            altrows			: true,
            sortable		: true,
            pageable		: true,
            pagesize		: 20,
            pagermode		: 'default',
            showaggregates	: true,
            showstatusbar	: true,
            statusbarheight	: 40,
            enabletooltips	: true,
            showfilterrow	: true,
            filterable		: true,
            source: dataAdapter,
            ready           : function(){
                if(GAutoResizeColumns != ''){
                    $("#jqxgrid").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                }
            },
            rowsheight      : GRowHeight,
            rendertoolbar: function (statusbar) {
                var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                var PendingBtn = $('<div id="pending_button" style="float: left; margin-left: 5px; padding: 10px; font-size: 16px; cursor: pointer;">Pending&nbsp;<div class="selected" style="position: absolute; top: 0; color:#000;">*</div></div>');
                var CompleteBtn = $("<div id='complete_button' style='float: left; margin-left: 5px; padding: 10px; font-size: 16px; cursor: pointer;'>Complete</div>");
                container.append(PendingBtn);
                container.append(CompleteBtn);
                statusbar.append(container);
                PendingBtn.jqxButton({  width: 100, height: 140, template: 'success' });
                CompleteBtn.jqxButton({  width: 100, height: 140, template: 'danger'});

                // PendingBtn
                PendingBtn.click(function (event) {
                    Load_Pending_Complete(1);
                    StockAdjust = 1;
                    $(".selected").remove();
                    $("#pending_button").append('<div class="selected" style="position: absolute; top: 0; color:#000;">*</div>');
                });

                // CompleteBtn
                CompleteBtn.click(function (event){
                    Load_Pending_Complete(2);
                    StockAdjust = 2;
                    $(".selected").remove();
                    $("#complete_button").append('<div class="selected" style="position: absolute; top: 0; color:#000;">*</div>');
    
                })
            },
            columns: [
                { text: 'ID', dataField: 'Unique', width: '6%', align: 'left',cellsalign: 'left' },
                { text: 'Location', dataField: 'LocationName', width: '10%', filtertype: 'checkedlist',align: 'left',cellsalign: 'left', hidden: true },
                { text: 'Location1', dataField: 'Location', width: '10%', filtertype: 'checkedlist',align: 'left',cellsalign: 'left',hidden:true },
                { text: 'Date', dataField: 'AdjustDate', width: '15%', align: 'left',filtertype: 'date',cellsalign: 'left',cellsformat: 'MM-dd-yyyy' },
                { text: 'Created By', dataField: 'CreatedBy', width: '15%', align: 'left',filtertype: 'checkedlist',cellsalign: 'left' },
                { text: 'Supplier', filtertype: 'input',dataField: 'Company', width: '15%', align: 'left',cellsalign: 'left' },
                { text: 'Supplier1', dataField: 'Supplier', width: '10%', align: 'left',filtertype: 'input',cellsalign: 'left',hidden:true },
                { text: 'ShipMethod', dataField: 'ShipMethod', width: '10%', align: 'left',filtertype: 'number',cellsalign: 'left',hidden:true },
                { text: 'Status', dataField: 'Status', width: '10%', align: 'left',filtertype: 'number',cellsalign: 'left',hidden:true },
                { text: 'Type', dataField: 'Type1', width: '15%', align: 'left',filtertype: 'number',cellsalign: 'left'  },
                { text: 'Adjust', dataField: 'QuantityAdjust', filtertype: 'number',cellsformat: 'd<?=$DecimalsQuantity?>',width: '11%',align: 'right',cellsalign: 'right',
                    aggregates: ['sum'], aggregatesrenderer: function (aggregates, column, element, summaryData) {
                        var renderstring = "<div  style='float: left; width: 100%; height: 100%;'>";
                        $.each(aggregates, function (key, value) {
                            var name = key == 'sum' ? 'Sum' : 'Avg';
                            var color = 'red';
                            if (key == 'sum' && summaryData['sum'] < 650) {
                                color = 'red';
                            }
                            renderstring += '<div style=" position: relative; margin: 6px; text-align: right; overflow: hidden;">' + value + '</div>';
                        });
                        renderstring += "</div>";
                        return renderstring;
                    }
                },
                { text: 'Adjust Cost', dataField: 'AdjCost', filtertype: 'number',cellsformat: 'd<?=$DecimalsCost?>',width: '11%',align: 'right',cellsalign: 'right', hidden: true,
                    aggregates: ['sum'], aggregatesrenderer: function (aggregates, column, element, summaryData) {
                        var renderstring = "<div style='float: left; width: 100%; height: 100%;'>";
                        $.each(aggregates, function (key, value) {
                            var name = key == 'sum' ? 'Sum' : 'Avg';
                            var color = 'red';
                            if (key == 'sum' && summaryData['sum'] < 650) {
                                color = 'red';
                            }
                            renderstring += '<div style=" position: relative; margin: 6px; text-align: right; overflow: hidden;">' + value + '</div>';
                        });
                        renderstring += "</div>";
                        return renderstring;
                    }
                },
                { text: 'Notes', dataField: 'Notes', width: '22%', filtertype: 'input',align: 'left',cellsalign: 'left'},
                { text: 'StatusID', dataField: 'StatusID', width: '23%', filtertype: 'input',align: 'left',cellsalign: 'left',hidden:true},
            ]
        });
    }

    $("#editItemStock").on('click', function(e){
        e.preventDefault();
        var rowIndex = $("#jqxgrid").jqxGrid("getselectedrowindex");
        var rowid = $('#jqxgrid').jqxGrid('getrowid', rowIndex);
        var rowdata = $("#jqxgrid").jqxGrid("getrowdatabyid", rowid);

        var editItemStockAdjust_Unique = rowdata.Unique;
        var editItemStockAdjust_Location = rowdata.Location;
        var editItemStockAdjust_Supplier = rowdata.Supplier;
        var editItemStockAdjust_AdjustDate = rowdata.AdjustDate;
        var editItemStockAdjust_Notes = rowdata.Notes;
        var editItemStockAdjust_StatusID = rowdata.StatusID;
        var LabelItemStockAdjustStatus = (editItemStockAdjust_StatusID == 1 ? 'Pending' : 'Complete');

        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/details',
            type: 'post',
            dataType: 'json',
            data: {"Unique" : editItemStockAdjust_Unique},
            beforeSend: function(){

            },
            success: function(data){
                if(StockAdjust == 1){
                    var WindowTitle = '<div class="edit_stock_adjust_function" style="margin-top:7px;">'+
                                        '<div style="float:left;">'+
                                            '<a id="delete_stock_adjust" title="Delete Stock Adjust" class="glyphicon glyphicon-trash" style="font-size: 35px; text-decoration: none; cursor: pointer; color: #b92c28;"></a>'+
                                        '</div>'+
                                        '<div style="height: 35px; float: left; margin-left: 10px;" id="edit_stock_adjust_label"></div>'+
                                        '<div style="float:left; margin-left: 10px;" id="edit_save_function">'+
                                            '<button class="btn btn-primary" disabled id="update_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_close">Close</button>&nbsp;<button class="btn btn-success complete_button" id="complete_item_stock">Complete</button>&nbsp;&nbsp;<button id="download_stock_adjust" class="btn btn-info donwload_button">Download</button>&nbsp;&nbsp;<button id="email_stock_adjust" class="btn btn-default">Email</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_save_ask_function">'+
                                            'Would you like to save your changes? <button class="btn btn-primary" id="update_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="update_stock_adjust_no">No</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_cancel">Cancel</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_delete_ask_function">'+
                                            'Are you sure you want to delete? <button class="btn btn-primary" id="delete_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="delete_stock_adjust_no">No</button>'+
                                        '</div>'+
                                    '</div>';
                }else{
                    var WindowTitle = '<div class="edit_stock_adjust_function" style="margin-top:7px;">'+
                                        '<div style="float:left;">'+
                                            '<a id="delete_stock_adjust" title="Delete Stock Adjust" class="glyphicon glyphicon-trash" style="font-size: 35px; text-decoration: none; cursor: pointer; color: #b92c28;"></a>'+
                                        '</div>'+
                                        '<div style="height: 35px; float: left; margin-left: 10px;" id="edit_stock_adjust_label"></div>'+
                                        '<div style="float:left; margin-left: 10px;" id="edit_save_function">'+
                                            '<button class="btn btn-primary" disabled id="update_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_close">Close</button>&nbsp;&nbsp;<button id="download_stock_adjust" class="btn btn-info donwload_button">Download</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_save_ask_function">'+
                                            'Would you like to save your changes? <button class="btn btn-primary" id="update_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="update_stock_adjust_no">No</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_cancel">Cancel</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_delete_ask_function">'+
                                            'Are you sure you want to delete? <button class="btn btn-primary" id="delete_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="delete_stock_adjust_no">No</button>'+
                                        '</div>'+
                                    '</div>';
                }


                CallStockAdjustWindow(WindowTitle)
                .then(function(){
                    var DetailsResult = data.details;
                    var LedgerAccountVal = DetailsResult[0].LedgerAccount;
                    $("#Ledger").val(LedgerAccountVal);

                    $('#AdjustDate').val(editItemStockAdjust_AdjustDate);
                    $("#Location").val(editItemStockAdjust_Location);
                    $("#Supplier").val(editItemStockAdjust_Supplier);
                    $("#Notes").val(editItemStockAdjust_Notes);

                    $("#edit_stock_adjust_function").show();
                    $("#edit_stock_adjust_label").append('ID: '+editItemStockAdjust_Unique+' | Status: '+LabelItemStockAdjustStatus+'<br>Edit Stock Adjust <input type="hidden" id="edit_stock_adjust_unique" value="'+editItemStockAdjust_Unique+'"/>');
                    $("#update_stock_adjust_save").prop("disabled", true);
                    ItemStockAdjustGrid(data.details, ItemStockAdjust);
                })
               
            }
        })

    })

    $(document).on('rowdoubleclick', '#jqxgrid', function(event){
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        // row's visible index.
        var visibleIndex = args.visibleindex;
        // right click.
        var rightclick = args.rightclick; 
        // original event.
        var ev = args.originalEvent;

        var rowdata = args.row.bounddata; 
        var editItemStockAdjust_Unique = rowdata.Unique;
        var editItemStockAdjust_Location = rowdata.Location;
        var editItemStockAdjust_Supplier = rowdata.Supplier;
        var editItemStockAdjust_AdjustDate = rowdata.AdjustDate;
        var editItemStockAdjust_Notes = rowdata.Notes;
        var editItemStockAdjust_StatusID = rowdata.StatusID;
        var LabelItemStockAdjustStatus = (editItemStockAdjust_StatusID == 1 ? 'Pending' : 'Complete');
       
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/details',
            type: 'post',
            dataType: 'json',
            data: {"Unique" : editItemStockAdjust_Unique},
            beforeSend: function(){

            },
            success: function(data){
                if(StockAdjust == 1){
                    var WindowTitle = '<div class="edit_stock_adjust_function" style="margin-top:7px;">'+
                                        '<div style="float:left;">'+
                                            '<a id="delete_stock_adjust" title="Delete Stock Adjust" class="glyphicon glyphicon-trash" style="font-size: 35px; text-decoration: none; cursor: pointer; color: #b92c28;"></a>'+
                                        '</div>'+
                                        '<div style="height: 35px; float: left; margin-left: 10px;" id="edit_stock_adjust_label"></div>'+
                                        '<div style="float:left; margin-left: 10px;" id="edit_save_function">'+
                                            '<button class="btn btn-primary" disabled id="update_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_close">Close</button>&nbsp;<button class="btn btn-success complete_button" id="complete_item_stock">Complete</button>&nbsp;&nbsp;<button id="download_stock_adjust" class="btn btn-info donwload_button">Download</button>&nbsp;&nbsp;<button id="email_stock_adjust" class="btn btn-default">Email</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_save_ask_function">'+
                                            'Would you like to save your changes? <button class="btn btn-primary" id="update_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="update_stock_adjust_no">No</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_cancel">Cancel</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_delete_ask_function">'+
                                            'Are you sure you want to delete? <button class="btn btn-primary" id="delete_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="delete_stock_adjust_no">No</button>'+
                                        '</div>'+
                                    '</div>';
                }else{
                    var WindowTitle = '<div class="edit_stock_adjust_function" style="margin-top:7px;">'+
                                        '<div style="float:left;">'+
                                            '<a id="delete_stock_adjust" title="Delete Stock Adjust" class="glyphicon glyphicon-trash" style="font-size: 35px; text-decoration: none; cursor: pointer; color: #b92c28;"></a>'+
                                        '</div>'+
                                        '<div style="height: 35px; float: left; margin-left: 10px;" id="edit_stock_adjust_label"></div>'+
                                        '<div style="float:left; margin-left: 10px;" id="edit_save_function">'+
                                            '<button class="btn btn-primary" disabled id="update_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_close">Close</button>&nbsp;&nbsp;<button id="download_stock_adjust" class="btn btn-info donwload_button">Download</button>&nbsp;&nbsp;<button id="email_stock_adjust" class="btn btn-default">Email</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_save_ask_function">'+
                                            'Would you like to save your changes? <button class="btn btn-primary" id="update_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="update_stock_adjust_no">No</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_cancel">Cancel</button>'+
                                        '</div>'+
                                        '<div style="float:left; margin-left: 10px; display:none;" id="edit_delete_ask_function">'+
                                            'Are you sure you want to delete? <button class="btn btn-primary" id="delete_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="delete_stock_adjust_no">No</button>'+
                                        '</div>'+
                                    '</div>';
                }

                CallStockAdjustWindow(WindowTitle)
                .then(function(){
                    var DetailsResult = data.details;
                    if(DetailsResult.length > 0){
                        var LedgerAccountVal = DetailsResult[0].LedgerAccount;
                        $("#Ledger").val(LedgerAccountVal);
                    }
                    $('#AdjustDate').val(editItemStockAdjust_AdjustDate);
                    $("#Location").val(editItemStockAdjust_Location);
                    $("#Supplier").val(editItemStockAdjust_Supplier);
                    $("#Notes").val(editItemStockAdjust_Notes);

                    $("#edit_stock_adjust_function").show();
                    $("#edit_stock_adjust_label").append('ID: '+editItemStockAdjust_Unique+' | Status: '+LabelItemStockAdjustStatus+'<br>Edit Stock Adjust <input type="hidden" id="edit_stock_adjust_unique" value="'+editItemStockAdjust_Unique+'"/>');
                    $("#update_stock_adjust_save").prop("disabled", true);
                    ItemStockAdjustGrid(data.details, ItemStockAdjust);
                })
               
            }
        })
    })

    var Load_Pending_Complete = (req) => {
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/list',
            type: 'post',
            dataType: 'json',
            data: {'status' : req},
            beforeSend: function(){

            },
            success: function(data){
                Grid(data); 
            }
        })
    }

    Load_Pending_Complete(1);

    // Add and Edit Stock Adjustment window
    var populateAddEditStockAdjustment = () => {
        var def = $.Deferred();

        setTimeout(function(){
            $("body").append(
                '<div id="stock_adjust_window" style="display:none;">'+
                    '<div id="stock_adjust_container">'+
                        '<div class="line_info1">'+
                            '<div class="group-location">'+
                                '<label>Location:</label><span class="required-fields">*</span>'+
                                '<div id="Location"></div>'+
                            '</div>'+
                            '<div class="group-supplier">'+
                                '<label>Supplier:</label>'+
                                '<div id="Supplier"></div>'+
                            '</div>'+
                            '<div class="group-adjust-date">'+
                                '<label>Adjust Date:</label><span class="required-fields">*</span>'+
                                '<div id="AdjustDate"></div>'+
                            '</div>'+
                            '<div class="group-type">'+
                                '<label>Type:</label><span class="required-fields">*</span>'+
                                '<div id="Type"></div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="line_info2">'+
                            '<div class="group-location-details">'+ 
                                '<label>Location Details:</label>'+
                                '<textarea id="LocationDetails"></textarea>'+
                            '</div>'+
                            '<div class="group-supplier-details">'+ 
                                '<label>Supplier Details:</label>'+
                                '<textarea id="SupplierDetails"></textarea>'+
                            '</div>'+
                            '<div class="group-notes">'+ 
                                '<label>Ledger Account:</label>'+
                                '<div id="Ledger"></div>'+
                                '<label>Notes:</label>'+
                                '<textarea id="Notes"></textarea>'+
                            '</div>'+
                        '</div>'+
                        '<div class="line_info3">'+
                            '<form id="SearchItems">'+
                                '<div class="input-group" style="width:260px; float:left;margin-left:2px;">'+
                                    '<input type="text" class="form-control input-md" placeholder="Search" id="SearchValue">'+
                                    '<span class="input-group-btn">'+
                                        '<button class="btn btn-info btn-md" type="submit" style="margin-top: 0px;height: 35px;"><i class="glyphicon glyphicon-search"></i></button>'+
                                    '</span>'+
                                '</div>'+
                            '</form>'+
                            '<div style="float:left; width:700px; margin-left: 5px;">'+
                                '<div class="search-fn" id="ItemSearchType""></div>'+
                                '<div class="search-fn" style="float:left; width: auto;"><button id="DeleteAdjustQty" class="btn btn-danger" disabled>Delete</button></div>&nbsp;&nbsp;'+
                                '<div class="search-fn" style="float:left; width: auto; padding: 10px 0 0 0;">'+
                                    '<div id="jqxGroupItem" style="margin-left: 10px; float: left;">Group item</div>'+
                                '</div>'+
                                '<div class="search-fn" style="padding: 5px;"><span style="display:none;" id="warning_notification_message"></span></div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="line_info4">'+
                            '<div id="ItemStockAdjust"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            )
            
            $("#jqxGroupItem").jqxCheckBox({enableContainerClick: false,  width: 120, height: 25, checked: true});

            $("#LocationDetails").jqxTextArea({ height: 100, width: 200, minLength: 1, disabled: true});
            
            $("#SupplierDetails").jqxTextArea({ height: 100, width: 200, minLength: 1, disabled: true});

            // Stock Search Selection
            var stock_search_selection_Source = {
                datatype: "json",
                datafields: [
                    {name: 'Field'},
                    {name: 'Label'}
                ],
                localdata: StockSearchSelection
            }

            var dataAdapterItemSearchSelection = new $.jqx.dataAdapter(stock_search_selection_Source);
            $("#ItemSearchType").jqxComboBox({source: dataAdapterItemSearchSelection, displayMember: "Label", valueMember: "Field", width: 120, height: 30, dropDownHeight: 100});
            $("#ItemSearchType").on('select', function(event){
                var args = event.args;
                if (args) {
                    // index represents the item's index.                       
                    var index = args.index;
                    if(index < 0) return;

                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type;
                    
                    var placeholderSearchInput = '';
                    if(value == 'Scan'){
                        placeholderSearchInput = 'Scan Barcode';
                    }else if(value == 'Barcode'){
                        placeholderSearchInput = 'Search Barcode';
                    }else{
                        placeholderSearchInput = 'Item, Barcode, Description';
                    }
                    $("#SearchValue").attr("placeholder",placeholderSearchInput);
                }
            })
            $("#ItemSearchType").val(DefaultSearchSelection);

            // Stock Ledger Selection
            var stock_search_selection_Source = {
                datatype: "json",
                datafields: [
                    {name: 'AccountNumber'},
                    {name: 'Description'}
                ],
                localdata: StockLedger
            }
            var dataAdapterStockLedger = new $.jqx.dataAdapter(stock_search_selection_Source);
            $("#Ledger").jqxComboBox({
                source: dataAdapterStockLedger, 
                displayMember: "Description", 
                valueMember: "AccountNumber", 
                width: 300, 
                height: 30, 
                dropDownHeight: 100,
                renderer: function (index, label, value) {
                    var customText = '<div style="width:100%;">'+value+' | '+label+'</div>';
                    return customText;
                }
            });
           
            $("#Ledger").on('select', function(event){
                var args = event.args;
                if (args) {
                    // index represents the item's index.                       
                    var index = args.index;
                    if(index < 0) return;

                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var itemvalue = item.value;
                    var type = args.type;

                    var items = $("#ItemStockAdjust").jqxGrid('getrows');
                    $.each(items, function(index, value){
                        var itemid = $("#ItemStockAdjust").jqxGrid('getrowid', value.uid);
                        var itemdata = $("#ItemStockAdjust").jqxGrid('getrowdatabyid', itemid);
                        itemdata.LedgerAccount = itemvalue;
                        console.log("rowid", itemdata);
                    })
                    
                    $("#update_stock_adjust_save").prop('disabled', false);
                }
            })
            $("#Ledger").val(StockLedgerDefault);


            // Location
            var location_Source = {
                datatype: "json",
                datafields: [
                    {name: 'Unique'},
                    {name: 'Name'}
                ],
                localdata: Location
            }

            var dataAdapterLocation = new $.jqx.dataAdapter(location_Source);

            $("#Location").jqxComboBox({source: dataAdapterLocation, displayMember: "Name", valueMember: "Unique", width: 200, height: 30});
            $("#Location").on('select', function(event){
                var args = event.args;
                if (args >= 0) {
                    // index represents the item's index.                       
                    var index = args.index;
                    if(index < 0) return;

                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type;
                    $("#LocationDetails").val('');
                    $.each(JSON.parse(LocationDetails), function(ind, val){
                        if(value == val.Unique){
                            $("#LocationDetails").val(
                                val.Name+"\n"+
                                val.Address1+"\n"+
                                val.Address2+"\n"+
                                (val.City ? val.City+',' : '') + (val.State ? val.State+', ' : '')+ (val.Zip ? val.Zip : '')+
                                (val.Phone ? + "\n" + val.City : '')
                            );
                        }
                    })
                    $("#new_stock_adjust_save").prop("disabled", false);
                    $("#update_stock_adjust_save").prop("disabled", false);
                }
            })
            $("#Location").val(CurrentLocation);

            // Supplier
            var supplier_Source = {
                datatype: "json",
                datafields: [
                    {name: 'Supplier'},
                    {name: 'Company'}
                ],
                localdata: Supplier
            }

            var dataAdapterSupplier = new $.jqx.dataAdapter(supplier_Source);
            $("#Supplier").jqxComboBox({placeHolder: '- None -', source: dataAdapterSupplier, displayMember: "Company", valueMember: "Supplier", width: 200, height: 30});
            $("#Supplier").on('select', function(event){
                var args = event.args;
                if (args) {
                    // index represents the item's index.                       
                    var index = args.index;
                    if(index < 0) return;

                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type;
                    $("#SupplierDetails").val('');
                    $.each(JSON.parse(SupplierDetails), function(ind, val){
                        if(value == val.Unique){
                            $("#SupplierDetails").val(
                                (val.Company ? val.Company+"\n" : '')+
                                (val.Address1 ? val.Address1+"\n" : '')+
                                (val.Address2 ? val.Address2+"\n" : '')+
                                (val.City ? val.City+', ' : '')+' '+(val.State ? val.State+', ' : '')+' '+(val.Zip ? val.Zip : '')+"\n"+
                                (val.Phone1 ? val.Phone1 : '')
                            );
                        }
                    })
                    $("#SearchValue").val(label);
                    $("#new_stock_adjust_save").prop("disabled", false);
                    $("#update_stock_adjust_save").prop("disabled", false);
                }
            })

            $("#AdjustDate").jqxDateTimeInput({width: 200, height: '30px', theme: "energyblue", formatString: "MM-dd-yyyy hh:mm tt", showTimeButton: true});
            $('#AdjustDate').on('change', function (event) {  
                var jsDate = event.args.date; 
                var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
                $("#new_stock_adjust_save").prop("disabled", false);
                $("#update_stock_adjust_save").prop("disabled", false);
            });
    
            $('#AdjustDate').jqxDateTimeInput('setDate',new Date());

            var Type_Source = {
                datatype: "json",
                datafields: [
                    {name: 'Unique'},
                    {name: 'Type'},
                    {name: 'Quantity'},
                    {name: 'Default'}
                ],
                localdata: Type
            }

            var dataAdapterType = new $.jqx.dataAdapter(Type_Source);
            $("#Type").jqxComboBox({placeHolder: '- None -', source: dataAdapterType, displayMember: "Type", valueMember: "Unique", width: 200, height: 30});
            $("#Type").on('select', function(event){
                var args = event.args;
                if (args) {
                    // index represents the item's index.                       
                    var index = args.index;
                    if(index < 0) return;

                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type;
                }
            })

            $("#Type").val(DefaultType);
            
            $("#Notes").jqxTextArea({ height: 50, width: 300, minLength: 1});
            $('#Notes').on('change keypress', function(event) {

                $("#new_stock_adjust_save").prop("disabled", false);
                $("#update_stock_adjust_save").prop("disabled", false);
            });
            
            $("#SearchItems").on('submit', function(e){
                e.preventDefault();
                var ItemSearchInput = $("#SearchValue").val();
                var SearchSelection = $("#ItemSearchType").val();
                if(SearchSelection == 'Scan' && ItemSearchInput != '' || SearchSelection == 'Barcode' && ItemSearchInput != ''){
                    
                    ScanItemSearch(ItemSearchInput)
                    .then(function(datarow){
                        if(datarow.length == 1){
                            var groupitem = $("#jqxGroupItem").jqxCheckBox('val');
                            var curdata = $("#ItemStockAdjust").jqxGrid('getrows');
                    
                            if(groupitem && curdata.length > 0){
                                GroupItemAdjustGrid(datarow, curdata)
                                .then(function(no_matching_data){
                                    if(no_matching_data.length > 0){
                                        $("#ItemStockAdjust").jqxGrid('addrow', null, no_matching_data, 'last');
                                        var msg = ""+$("#SearchValue").val()+' added!';
                                        WarningNotificationMessage(msg, 'green', false, 2000);
                                    }else{
                                        
                                        var msg = '';
                                        var msgcolor = '';
                                        var StockAdjustType = $("#Type").val();
                                        if(StockAdjustType == 1){
                                            msg = ""+$("#SearchValue").val()+' already added';
                                            msgcolor = '#f0ad4e ';
                                        }else if(StockAdjustType == 2){
                                            msg = ""+$("#SearchValue").val()+' Adjusted';
                                            msgcolor = '#f0ad4e ';
                                        }else if(StockAdjustType == 3){
                                            msg = ""+$("#SearchValue").val()+' Reduced';
                                            msgcolor = '#f0ad4e ';
                                        }
                                        WarningNotificationMessage(msg, msgcolor, false, 2000);
                                    }
                                })
                            }else{
                                $("#ItemStockAdjust").jqxGrid('addrow', null, datarow, 'last');
                                var msg = $("#SearchValue").val()+' added!';
                                WarningNotificationMessage(msg, 'green', false, 2000);
                            }

                            $("#new_stock_adjust_save").prop("disabled", false);
                            $("#update_stock_adjust_save").prop("disabled", false);
                        
                        }else if(datarow.length > 1){

                            populateItemSearch()
                            .then(function(){
                                WindowItemSearch()
                                .then(function(){
                                    ItemSearchGridFilterColumns()
                                    .then(function(Columns){
                                        ItemSearchGrid(datarow, Columns)
                                        .then(function(){
                                            $("#AddNewItemSearchInput").focus();
                                        })
                                    })
                                })
                            })

                        }else{
                            var msg = "Not found "+ $("#SearchValue").val()+'!';
                            WarningNotificationMessage(msg, 'red', true, 2000);
                        }
                        $("#SearchValue").val('');
                    })
                }else{
                    // var firstChar = ItemSearchInput.charAt(0);
                    // var charIsNumber = is_numeric(firstChar);
                    // if(charIsNumber == false){
                        // ItemSearchInput = ItemSearchInput.substring(1);
                    // }
                    CallItemSearchWindow(ItemSearchInput, SearchSelection)
                    .then(function(){
                        $("#SearchValue").val('');
                    })
                }
            })

            $("#DeleteAdjustQty").on('click', function(e){                
                var selectedrowindex = $("#ItemStockAdjust").jqxGrid('getselectedcell');
    
                var stock_adjust_id = $("#ItemStockAdjust").jqxGrid('getrowid', selectedrowindex.rowindex);
                var stock_adjust_data = $('#ItemStockAdjust').jqxGrid('getrowdatabyid', stock_adjust_id);

                $("#ItemStockAdjust").jqxGrid('deleterow', stock_adjust_id);
                if(stock_adjust_data.Unique){
                    DeleteDetails.push({"StockUniqueDetailsUnique" : stock_adjust_data.Unique, "StockLineUnique" :  stock_adjust_data.ItemStockLineUnique});
                    DeletedGridItems.push(stock_adjust_data);
                }

                $("#update_stock_adjust_save").prop("disabled", false);
                $("#DeleteAdjustQty").prop("disabled", true);
            })
        
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowAddEditStockAdjust = (title) => {
        var def = $.Deferred();
        setTimeout(function(){
            $("#stock_adjust_window").jqxWindow({
                minHeight: FakeHeight+'px',
                minWidth: '100%',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 999
            })
            $("#stock_adjust_window").jqxWindow('title', title);
            $("#stock_adjust_window").jqxWindow('open');
            BarcodeSTX = '';
            document.onkeydown = StockAdjustKeyPress;

            $("#stock_adjust_window").on('close', function(e){
                e.preventDefault();
                BarcodeSTX = '';
                document.onkeydown = ItemSearchKeyPress;
                $("#stock_adjust_window").remove();
            })

            def.resolve();
        },100)

        return def.promise();
    }

    var CallStockAdjustWindow = (title) => {
        var def = $.Deferred();
        populateAddEditStockAdjustment()
        .then(function(){
            WindowAddEditStockAdjust(title)
            .then(function(){
                // $("#SearchValue").focus();
                LineInfo1 = $(".line_info1").height();
                LineInfo2 = $(".line_info2").height();
                LineInfo3 = $(".line_info3").height();

                var gridHeight = (FakeHeight - LineInfo1);
                    gridHeight = (gridHeight - LineInfo2);
                    gridHeight = (gridHeight - LineInfo3);
                    gridHeight = (gridHeight - 40);
                    gridHeight = (gridHeight - 45);

                ItemStockAdjust = gridHeight;
                ItemStockAdjustGrid([], gridHeight)
                .then(function(){
                })
                def.resolve();
            })  
        })
        return def.promise();
    }

    $("#newItemStock").on('click', function(){
        var WindowTitle ='<div class="new_stock_adjust_function" style="margin-top:7px;"> Add New Stock Adjustment &nbsp;&nbsp;<button class="btn btn-primary" disabled id="new_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="new_stock_adjust_close">Close</button>&nbsp; </div>';
            WindowTitle+='<div class="new_stock_adjust_function_ask" style="margin-top:7px;"> Add New Stock Adjustment &nbsp;&nbsp; <span style="font-size: 14px;">Would you like to save your changes?</span> <button class="btn btn-primary" id="new_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-warning" id="new_stock_adjust_no">No</button>&nbsp;<button class="btn btn-info" id="new_stock_adjust_cancel">Cancel</button></div>';
        CallStockAdjustWindow(WindowTitle)
        .then(function(){
            
        })
    })

    
    $(document).on('click', '#new_stock_adjust_close', function(e){
        e.preventDefault();
        var SaveButtonEnabled = $("#new_stock_adjust_save").is(":disabled");
        if(SaveButtonEnabled == false){
            $(".new_stock_adjust_function").hide();
            $(".new_stock_adjust_function_ask").show();
        }else{
            $("#stock_adjust_window").jqxWindow('close');
            document.onkeydown = '';
        }
    })

    $(document).on('click', '#new_stock_adjust_no', function(e){
        e.preventDefault();
        DeleteDetails = [];
        $("#stock_adjust_window").jqxWindow('close');
    })

    $(document).on('click', '#new_stock_adjust_cancel', function(e){
        e.preventDefault();
        $(".new_stock_adjust_function").show();
        $(".new_stock_adjust_function_ask").hide();
    })

    var ItemStockAdjustGrid = (data = [], height) => {
        var def = $.Deferred();

        var source = {
            datatype: "json",
            datafields: ItemStockAdjustFields,
            localdata: data
        }
        
        var dataAdapter =new $.jqx.dataAdapter(source);

        $("#ItemStockAdjust").jqxGrid({
            height          : height,
            width			: '99.70%',
            scrollbarsize	: GScrollBarSize,
            theme			: Gtheme,
			source			: dataAdapter,
			editable		: true,
			selectionmode	: 'singlecell',
			columnsresize	: true,
			altrows			: true,
			sortable		: true,
            pageable		: false,
            pagermode		: 'default', //or simple
			showaggregates	: true,
			showstatusbar	: true,
            statusbarheight	: 25,
            rowsheight      : GRowHeight,
            enabletooltips  : true,
            ready           : function(){
                if(GAutoResizeColumns != ''){
                    $("#ItemStockAdjust").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                }
            },
            columns	: ItemStockAdjustColumns
        })

        var ItemStockAdjustIndex = '';
        $("#ItemStockAdjust").on('cellselect', function (event) 
        {
            // event arguments.
            var args = event.args;
            // get the column's text.
            var column = $("#ItemStockAdjust").jqxGrid('getcolumn', event.args.datafield).text;
            // column data field.
            var dataField = event.args.datafield;
            // row's bound index.
            var rowBoundIndex = event.args.rowindex;
            // cell value
            var value = args.value;
            ItemStockAdjustIndex = rowBoundIndex;
        });

        $(document).on('change', "#dropdownlisteditorItemStockAdjustLedgerAccountList", function(event){
            var args = event.args;
            if (args.index >= 0) {
                // index represents the item's index.                      
                var index = args.index;
                var item = args.item;
                // get item's label and value.
                var label = item.label;
                var value = item.value;
                var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                
                var newdata = {};
                var gridSelectedId = $("#ItemStockAdjust").jqxGrid('getrowid', ItemStockAdjustIndex);
                newdata = $("#ItemStockAdjust").jqxGrid('getrowdatabyid', gridSelectedId);
                
                newdata["LedgerAccount"] = value;
                $('#ItemStockAdjust').jqxGrid('updaterow', ItemStockAdjustIndex, newdata);
            }
        })

        $("#ItemStockAdjust").on('bindingcomplete', function(){
            if(GAutoResizeColumns != ''){
                $("#ItemStockAdjust").jqxGrid('autoresizecolumns', GAutoResizeColumns);
            }
        })

        setTimeout(function(){  
            def.resolve();
        },100);

        return def.promise();
    }

    var populateItemSearch = () => {
        var def = $.Deferred();

        setTimeout(function(){

            $("body").append(
                '<div id="item_search" style="display:none;">'+
                    '<div id="item_search_container">'+
                        '<div class="add_new_item_line1">'+
                            '<div style="float:left; margin:0 5px 0 2px;">'+
                                '<button class="btn btn-info" id="AddItemOnGrid" disabled>Add</button>'+
                            '</div>'+
                            '<script type="text/javascript">'+
                                'function KeyPress(e) {'+
                                    'var evtobj = window.event? event : e;'+
                                    'if (evtobj.keyCode == 66 && evtobj.ctrlKey) {'+
                                        '$("#AddNewItemSearchInput").focus()'+
                                    '}'+
                                '}'+
                                'document.onkeydown = KeyPress;'+
                            '</script>'+
                            '<form id="AddNewItemSearchButton">'+
                                '<div class="input-group" style="width:250px; float:left;margin-left:2px;">'+
                                    '<input type="text" class="form-control input-md" placeholder="Search" id="AddNewItemSearchInput">'+
                                    '<span class="input-group-btn">'+
                                        '<button class="btn btn-info btn-md" type="submit" style="margin-top: 0px;height: 35px;"><i class="glyphicon glyphicon-search"></i></button>'+
                                    '</span>'+
                                '</div>'+
                            '</form>'+
                        '</div>'+
                        '<div class="add_new_item_line2">'+
                            '<div id="item_list_grid"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );

            def.resolve();
        },100)

        return def.promise();
    }

    // Events
    $(document).on('submit', "#AddNewItemSearchButton", function(e){
        e.preventDefault();
        var AddNewItemSearchInput = $("#AddNewItemSearchInput").val();
        if(AddNewItemSearchInput != ''){
            // var firstChar = AddNewItemSearchInput.charAt(0);
            // var charIsNumber = is_numeric(firstChar);
            // if(charIsNumber == false){
                // AddNewItemSearchInput = AddNewItemSearchInput.substring(1);
            // }

            SearchItemDb(AddNewItemSearchInput)
            .then(function(data){
                ItemSearchGridFilterColumns()
                .then(function(Columns){
                    // ItemSearchGrid(data.list, Columns)
                    // .then(function(){
                    //     $("#AddNewItemSearchInput").val('');
                    // })
                    reload_search_grid(data.list, Columns)
                    .then(function(){
                        $("#AddNewItemSearchInput").val('');
                    })
                })
                
            })
        }else{
            ItemSearchGridFilterColumns()
            .then(function(Columns){
                // ItemSearchGrid(Items, Columns)
                // .then(function(){
                //     $("#AddNewItemSearchInput").focus();
                // })
                reload_search_grid(Items, Columns)
                .then(function(){
                    $("#AddNewItemSearchInput").val('');
                })
            })
        }
    })

    $(document).on('click', "#AddItemOnGrid", function(e){
        // LoadingProcess('Processing...');
        var StockLocation = "Stock"+$("#Location").val();
        var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');

        var rows = $("#item_list_grid").jqxGrid('getselectedrowindexes');
        var rowsdata = new Array();
        var counter = 1;
        var countrowlength = 0;
        for(var i = 0; i < rows.length; i++){
            var rowid = $("#item_list_grid").jqxGrid('getrowid', rows[i]);
            var data = $('#item_list_grid').jqxGrid('getrowdatabyid', rowid);

            rowsdata.push({
                "Location"          : $("#Location").val(),
                "ID"                : data.ID,
                "Item"              : data.Item,
                "Part"              : data.Part,
                "Description"       : data.Description,
                "Cost"              : data.Cost,
                "CostFreight"       : data.CostFreight,
                "CostExtra"         : data.CostExtra,
                "CostDuty"          : data.CostDuty,
                "Custom1"           : data.Custom1,
                "Custom2"           : data.Custom2,
                "Custom3"           : (data.Custom3 ? data.Custom3 : null),
                "Custom4"           : (data.Custom4 ? data.Custom4 : null),
                "Custom5"           : (data.Custom5 ? data.Custom5 : null),
                "QuantityCurrent"   : parseInt(data[StockLocation]),
                "QuantityAdjust"    : parseInt(TypeDetails.originalItem.Quantity),
                "QuantityNew"       : parseInt(data[StockLocation]) + parseInt(TypeDetails.originalItem.Quantity),
                "CostLanded"        : parseFloat(data.CostLanded).toFixed(2),
                "AdjCost"           : parseFloat(data.CostLanded * TypeDetails.originalItem.Quantity).toFixed(2),
                "SupplierPart"      : data.SupplierPart,
                "Comment"           : '',
                "Flag"              : 1,
                "ItemSerialUnique"  : null,
                "BarCodeAltUnique"  : null,
                "Serial"            : data.Serial,
                "BarCodeAlt"        : data.BarCodeAlt,
                "LedgerAccount"     : $("#Ledger").val()
            })

            // Overwrite ItemSerialUnique value
            if(data.ItemSerialUnique){
                rowsdata[countrowlength]["ItemSerialUnique"] = data.ItemSerialUnique;
            }

            if(data.BarCodeAltUnique){
                rowsdata[countrowlength]["BarCodeAltUnique"] = data.BarCodeAltUnique;
            }
            

            if(counter == rows.length){
                // LoadingProcessEnd();
            }

            countrowlength++;
            counter++;
        }

        var groupitem = $("#jqxGroupItem").jqxCheckBox('val');
        var curdata = $("#ItemStockAdjust").jqxGrid('getrows');
        if(groupitem && curdata.length > 0){
            GroupItemAdjustGrid(rowsdata, curdata)
            .then(function(no_matching_data){
                if(no_matching_data.length > 0){
                    console.log("added here1");
                    $("#ItemStockAdjust").jqxGrid('addrow', null, no_matching_data, 'last');
                    $("#ItemStockAdjust").jqxGrid('scrolloffset', 9999999, 0);
                    var msg = 'Item added';
                    WarningNotificationMessage(msg, 'green', false, 2000);
                }else{
                    var msg = '';
                    var msgcolor = '';
                    var StockAdjustType = $("#Type").val();
                    if(StockAdjustType == 1){
                        msg = "Item already added";
                        msgcolor = '#f0ad4e ';
                    }else if(StockAdjustType == 2){
                        msg = "Item Adjusted";
                        msgcolor = '#f0ad4e ';
                    }else if(StockAdjustType == 3){
                        msg = "Item Reduced";
                        msgcolor = '#f0ad4e ';
                    }
                    WarningNotificationMessage(msg, msgcolor, false, 2000);
                }
            })
        }else{
            console.log("added here2");
            $("#ItemStockAdjust").jqxGrid('addrow', null, rowsdata, 'last');
            $("#ItemStockAdjust").jqxGrid('scrolloffset', 9999999, 0);
            var msg = 'Item added';
            WarningNotificationMessage(msg, 'green', false, 2000);
        }

        $("#new_stock_adjust_save").prop("disabled", false);
        $("#update_stock_adjust_save").prop("disabled", false);
        
        $("#item_search").jqxWindow('close');
    })

    var reload_search_grid = (data, Columns) => {
        var def = $.Deferred();
        var source = {
            datatype: "json",
            datafields: ItemSearchFields,
            localdata: data
        }
        var dataAdapter =new $.jqx.dataAdapter(source, {
            loadComplete: function() {
                def.resolve();
            }
        });
        $("#item_list_grid").jqxGrid({
            source: dataAdapter,
            columns: Columns
        })
        return def.promise();
    }



    var WindowItemSearch = () => {
        var def = $.Deferred();
        setTimeout(function(){
            $("#item_search").jqxWindow({
                minHeight: FakeHeight+'px',
                minWidth: '100%',
                isModal: true,
                theme: 'darkblue',
                title: '<button id="CloseAddNewItem" class="btn btn-primary"><span class="glyphicon glyphicon-remove" style="color: red; font-size: 16px;"></span></button>&nbsp;Add New Item',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 999
            })

            $("#item_search").jqxWindow('open');
            
            BarcodeSTX = '';
            document.onkeydown = ItemSearchKeyPress;

            $("#item_search").on('close', function(event){
                BarcodeSTX = '';
                document.onkeydown = StockAdjustKeyPress;
                $("#item_list_grid").jqxGrid('clearfilters');
                $("#item_search").remove();   
            })

            def.resolve();
        },100)
        return def.promise();
    }

    var CallItemSearchWindow = (search, type) => {
        def = $.Deferred();
        if(search != ''){
            SearchItemDb(search, type)
            .then(function(data){
                if(data.count > 1){
                    populateItemSearch()
                    .then(function(){
                        WindowItemSearch()
                        .then(function(){
                            ItemSearchGridFilterColumns()
                            .then(function(Columns){
                                ItemSearchGrid(data.list, Columns)
                                .then(function(){
                                    $("#AddNewItemSearchInput").focus();
                                })
                            })
                        })
                    })
                }else if(data.count == 1){
                    var data = data.list;
                    var StockLocation = "Stock"+$("#Location").val();
                    var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');
                    
                    var rowsdata = new Array();
                
                    rowsdata.push({
                        "Location"          : $("#Location").val(),
                        "ID"                : data.ID,
                        "Item"              : data.Item,
                        "Part"              : data.Part,
                        "Description"       : data.Description,
                        "Cost"              : data.Cost,
                        "CostFreight"       : data.CostFreight,
                        "CostExtra"         : data.CostExtra,
                        "CostDuty"          : data.CostDuty,
                        "Custom1"           : data.Custom1,
                        "Custom2"           : data.Custom2,
                        "Custom3"           : (data.Custom3 ? data.Custom3 : null),
                        "Custom4"           : (data.Custom4 ? data.Custom4 : null),
                        "Custom5"           : (data.Custom5 ? data.Custom5 : null),
                        "QuantityCurrent"   : parseInt(data[StockLocation]),
                        "QuantityAdjust"    : parseInt(TypeDetails.originalItem.Quantity),
                        "QuantityNew"       : parseInt(data[StockLocation]) + parseInt(TypeDetails.originalItem.Quantity),
                        "CostLanded"        : parseFloat(data.CostLanded).toFixed(2),
                        "AdjCost"           : parseFloat(data.CostLanded * TypeDetails.originalItem.Quantity).toFixed(2),
                        "SupplierPart"      : data.SupplierPart,
                        "Comment"           : '',
                        "Flag"              : 1,
                        "ItemSerialUnique"  : null,
                        "BarCodeAltUnique"  : null,
                        "Serial"            : data.Serial,
                        "BarCodeAlt"        : data.BarCodeAlt,
                        "LedgerAccount"     : $("#Ledger").val()
                    })

                    // Overwrite ItemSerialUnique value
                    if(data.ItemSerialUnique > 0){
                        rowsdata[0]["ItemSerialUnique"] = data.ItemSerialUnique;
                    }

                    if(data.BarCodeAltUnique > 0){
                        rowsdata[0]["BarCodeAltUnique"] = data.BarCodeAltUnique;
                    }

                    var groupitem = $("#jqxGroupItem").jqxCheckBox('val');
                    var curdata = $("#ItemStockAdjust").jqxGrid('getrows');
                    if(groupitem && curdata.length > 0){
                        GroupItemAdjustGrid(rowsdata, curdata)
                        .then(function(no_matching_data){
                            if(no_matching_data.length > 0){
                                $("#ItemStockAdjust").jqxGrid('addrow', null, no_matching_data, 'last');
                                var msg = $("#SearchValue").val()+' added!';
                                WarningNotificationMessage(msg, 'green', false, 2000);
                            }else{
                                var msg = '';
                                var msgcolor = '';
                                var StockAdjustType = $("#Type").val();
                                if(StockAdjustType == 1){
                                    msg = "Item already added";
                                    msgcolor = '#f0ad4e ';
                                }else if(StockAdjustType == 2){
                                    msg = "Item Adjusted";
                                    msgcolor = '#f0ad4e ';
                                }else if(StockAdjustType == 3){
                                    msg = "Item Reduced";
                                    msgcolor = '#f0ad4e ';
                                }
                                WarningNotificationMessage(msg, msgcolor, false, 2000);
                            }
                        })
                    }else{
                        $("#ItemStockAdjust").jqxGrid('addrow', null, rowsdata, 'last');
                        var msg = $("#SearchValue").val()+' added!';
                        WarningNotificationMessage(msg, 'green', false, 2000);
                    }

                    $("#new_stock_adjust_save").prop("disabled", false);
                    $("#update_stock_adjust_save").prop("disabled", false);
                }else{
                    var msg = "Not found "+ $("#SearchValue").val() + '!';
                    WarningNotificationMessage(msg, 'red', true, 2000);
                }

                def.resolve();
            })
        }else{
            populateItemSearch()
            .then(function(){
                WindowItemSearch()
                .then(function(){
                    ItemSearchGridFilterColumns()
                    .then(function(Columns){
                        ItemSearchGrid([], Columns)
                        .then(function(){
                            $("#AddNewItemSearchInput").focus();
                            def.resolve();
                        })
                    })
                })
            })
        }
        return def.promise();
    }

    var SearchItemDb = (search, type='') => {
        type = (BarcodeSTX != '' ? BarcodeSTX : type);
        var def = $.Deferred();
        var postdata ="search_item="+search;
            postdata+="&search_type="+type;
            postdata+="&location="+$("#Location").val();
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/search-item',
            type: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){
                // LoadingProcess("Searching...\nPlease wait");
            },
            success: function(data){
                // LoadingProcessEnd();
                BarcodeSTX = '';
                def.resolve(data);
            }
        })
        return def.promise();
    }


    //Search column to show or hide based on selected location
    var ItemSearchGridFilterColumns = () => {
        var def = $.Deferred();
        var SelectedLocation = "Stock"+$("#Location").val();
        var ColumnCount = ItemSearchColumns.length;
        var ActualCount = 1;
        var NewItemSearchColumns = [];
        $.each(ItemSearchColumns, function(index, value){
            var fieldText = value.text; 
            if(fieldText.trim() == 'Location Qty'){
                if(value.dataField == SelectedLocation){
                    value.hidden = false;
                }else{
                    value.hidden = true;
                }
            }
            
            if(ActualCount == ColumnCount){
                
                def.resolve(NewItemSearchColumns);
            }

            NewItemSearchColumns.push(value);

            ActualCount++;
        })

        return def.promise();
    }

    var ItemSearchGrid = (data = [], Columns = []) => {
        var def = $.Deferred();

        var AddNewItemWindowHeader = $(".jqx-window-header").height();
        var AddNewItemLineInfo1 = $(".add_new_item_line1").height();
        var AddNewItemHeight = (FakeHeight - AddNewItemWindowHeader);
            AddNewItemHeight = (AddNewItemHeight - AddNewItemLineInfo1);
            AddNewItemHeight = (AddNewItemHeight - 42);

        var source = {
            datatype: "json",
            datafields: ItemSearchFields,
            localdata: data
        }
        
        var dataAdapter =new $.jqx.dataAdapter(source);

        $("#item_list_grid").jqxGrid({
            height          : AddNewItemHeight+'px',
            width	        : '99.70%',
            theme			: Gtheme,
            source			: dataAdapter,
            scrollbarsize	: GScrollBarSize,
            columnsresize	: true,
            altrows			: true,
            sortable		: true,
            pageable		: false,
            selectionmode	: 'singlerow',
            pagermode		: 'default', //or simple
            showaggregates	: false,
            showstatusbar	: false,
            statusbarheight	: 5,
            enabletooltips	: true,
            showfilterrow	: true,
            filterable		: true,
            selectionmode	: 'checkbox',
            rowsHeight      : GRowHeight,
            ready: function(){

            },
            columns         : Columns

        });
        
        $("#item_list_grid").jqxGrid('clearselection');

        $("#item_list_grid").on('rowselect', function(event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            const rowindexes = $('#item_list_grid').jqxGrid('getselectedrowindexes');
            let value = '';
            for (let i = 0; i < rowindexes.length; i++) {
                value++;
            }

            if(value > 0){
                $("#AddItemOnGrid").prop("disabled", false);
            }
        })

        $("#item_list_grid").on('rowunselect', function(event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            const rowindexes = $('#item_list_grid').jqxGrid('getselectedrowindexes');
            let value = '';
            for (let i = 0; i < rowindexes.length; i++) {
                value++;
            }

            if(value > 0){
                $("#AddItemOnGrid").prop("disabled", false);
            }else{
                $("#AddItemOnGrid").prop("disabled", true);
            }
        })

        $("#item_list_grid").on('rowdoubleclick', function(event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            $("#item_list_grid").jqxGrid('selectrow', boundIndex);
    
            var StockLocation = "Stock"+$("#Location").val();
            var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');
            
            var rows = $("#item_list_grid").jqxGrid('getselectedrowindexes');
            var rowsdata = new Array();
            var counter = 1;
            var countrowlength = 0;
            for(var i = 0; i < rows.length; i++){
                var rowid = $("#item_list_grid").jqxGrid('getrowid', rows[i]);
                var data = $('#item_list_grid').jqxGrid('getrowdatabyid', rowid);

                var rowsdata = new Array();

                rowsdata.push({
                    "Location"          : $("#Location").val(),
                    "ID"                : data.ID,
                    "Item"              : data.Item,
                    "Part"              : data.Part,
                    "Description"       : data.Description,
                    "Cost"              : data.Cost,
                    "CostFreight"       : data.CostFreight,
                    "CostExtra"         : data.CostExtra,
                    "CostDuty"          : data.CostDuty,
                    "Custom1"           : data.Custom1,
                    "Custom2"           : data.Custom2,
                    "Custom3"           : (data.Custom3 ? data.Custom3 : null),
                    "Custom4"           : (data.Custom4 ? data.Custom4 : null),
                    "Custom5"           : (data.Custom5 ? data.Custom5 : null),
                    "QuantityCurrent"   : parseInt(data[StockLocation]),
                    "QuantityAdjust"    : parseInt(TypeDetails.originalItem.Quantity),
                    "QuantityNew"       : parseInt(data[StockLocation]) + parseInt(TypeDetails.originalItem.Quantity),
                    "CostLanded"        : parseFloat(data.CostLanded).toFixed(2),
                    "AdjCost"           : parseFloat(data.CostLanded * TypeDetails.originalItem.Quantity).toFixed(2),
                    "SupplierPart"      : data.SupplierPart,
                    "Comment"           : '',
                    "Flag"              : 1,
                    "ItemSerialUnique"  : null,
                    "BarCodeAltUnique"  : null,
                    "Serial"            : data.Serial,
                    "BarCodeAlt"        : data.BarCodeAlt,
                    "LedgerAccount"     : $("#Ledger").val()
                })

                // Overwrite ItemSerialUnique value
                if(data.ItemSerialUnique > 0){
                    rowsdata[countrowlength]["ItemSerialUnique"] = data.ItemSerialUnique;
                }

                if(data.BarCodeAltUnique > 0){
                    rowsdata[countrowlength]["BarCodeAltUnique"] = data.BarCodeAltUnique;
                }


                // rowsdata.push(datarow);

                if(counter == rows.length){
                    LoadingProcessEnd();
                }

                countrowlength++;
                counter++;
            }

            var groupitem = $("#jqxGroupItem").jqxCheckBox('val');
            var curdata = $("#ItemStockAdjust").jqxGrid('getrows');
            if(groupitem && curdata.length > 0){
                GroupItemAdjustGrid(rowsdata, curdata)
                .then(function(no_matching_data){
                    if(no_matching_data.length > 0){
                        $("#ItemStockAdjust").jqxGrid('addrow', null, no_matching_data, 'last');
                    }
                })
            }else{
                $("#ItemStockAdjust").jqxGrid('addrow', null, rowsdata, 'last');
            }

            $("#new_stock_adjust_save").prop("disabled", false);
            $("#update_stock_adjust_save").prop("disabled", false);
            
            $("#item_search").jqxWindow('close');
        })

        $(".jqx-checkbox-default").on('click', function(event){
            const rowindexes = $('#item_list_grid').jqxGrid('getselectedrowindexes');
            let value = '';
            for (let i = 0; i < rowindexes.length; i++) {
                value++;
            }

            if(value > 0){
                $("#AddItemOnGrid").prop("disabled", false);
            }else{
                $("#AddItemOnGrid").prop("disabled", true);
            }
        })

        setTimeout(function(){
            def.resolve();
        },100)

        return def.promise();
    }

    $(document).on('click', "#new_stock_adjust_save", function(event){
        getItemStockAdjustGridData()
        .then(function(gridData){
            var postdata ="AdjustDate="+$("#AdjustDate").val();
                postdata+="&Notes="+$("#Notes").val();
                postdata+="&Location="+$("#Location").val();
                postdata+="&Supplier="+$("#Supplier").val();
                postdata+="&Type="+$("#Type").val();
                postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));

            $.ajax({
                url: base_url + 'backoffice/item_stock_adjust_v2/new',
                type: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    $(".new_stock_adjust_function").hide();
                    $(".new_stock_adjust_function_ask").hide();
                    $("#edit_stock_adjust_label").append('ID: '+data.newId+' | Status: Pending<br>Edit Stock Adjust <input type="hidden" id="edit_stock_adjust_unique" value="'+data.newId+'"/>');
                    $(".edit_stock_adjust_function").show();
                    $("#new_stock_adjust_save").prop("disabled", true); 
                    
                    ItemStockAdjustGrid(data.ItemStockAdjustDetails, ItemStockAdjust)
                    .then(function(){
                        var WindowTitle = '<div class="edit_stock_adjust_function" style="margin-top: 7px;">'+
                                            '<div style="float:left;">'+
                                                '<a id="delete_stock_adjust" title="Delete Stock Adjust" class="glyphicon glyphicon-trash" style="font-size: 35px; text-decoration: none; cursor: pointer; color: #b92c28;"></a>'+
                                            '</div>'+
                                            '<div style="height: 35px; float: left; margin-left: 10px;" id="edit_stock_adjust_label"></div>'+
                                            '<div style="float:left; margin-left: 10px;" id="edit_save_function">'+
                                                '<button class="btn btn-primary" disabled id="update_stock_adjust_save">Save</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_close">Close</button>&nbsp;<button class="btn btn-success" id="complete_item_stock">Complete</button>&nbsp;&nbsp;<button id="download_stock_adjust" class="btn btn-info donwload_button">Download</button>'+
                                            '</div>'+
                                            '<div style="float:left; margin-left: 10px; display:none;" id="edit_save_ask_function">'+
                                                'Would you like to save changes? <button class="btn btn-primary" id="update_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="update_stock_adjust_no">No</button>&nbsp;<button class="btn btn-warning" id="update_stock_adjust_cancel">Cancel</button>&nbsp;<button class="btn btn-success" id="complete_item_stock">Complete</button>'+
                                            '</div>'+
                                            '<div style="float:left; margin-left: 10px; display:none;" id="edit_delete_ask_function">'+
                                                'Are you sure you want to delete? <button class="btn btn-primary" id="delete_stock_adjust_yes">Yes</button>&nbsp;<button class="btn btn-danger" id="delete_stock_adjust_no">No</button>&nbsp;<button class="btn btn-success" id="complete_item_stock">Complete</button>'+
                                            '</div>'+
                                            
                                        '</div>';

                        $("#stock_adjust_window").jqxWindow('title', WindowTitle);
                        $("#edit_stock_adjust_label").append('ID: '+data.newId+' | Status: Pending<br>Edit Stock Adjust <input type="hidden" id="edit_stock_adjust_unique" value="'+data.newId+'"/>');
                        $("#update_stock_adjust_save").prop("disabled", true);
                        Load_Pending_Complete(StockAdjust);
                    })    
                }
            })
        })
    })

    $(document).on('click', "#update_stock_adjust_save", function(e){
        e.preventDefault();

        var LocationVal = $("#Location").val();
        if(LocationVal){
            var getLocationValIndex = $("#Location").jqxComboBox('getSelectedIndex');
            if(getLocationValIndex < 0){
                $("#Location").jqxComboBox('clearSelection');
                var msg = "Location is required field";
                WarningNotificationMessage(msg, 'red', true, 2000);
                return;
            }
        }else{
            var msg = "Location is required field";
            WarningNotificationMessage(msg, 'red', true, 2000);
            return;
        }

        var SupplierVal = $("#Supplier").val();
        console.log(SupplierVal);
        if(SupplierVal){
            var getSupplierIndex = $("#Supplier").jqxComboBox('getSelectedIndex');
            if(getSupplierIndex < 0){
                $("#Supplier").jqxComboBox('clearSelection');
            }
        }

        var TypeVal = $("#Type").val();
        if(TypeVal){
            var getTypeIndex = $("#Type").jqxComboBox('getSelectedIndex');
            if(getTypeIndex < 0){
                $("#Type").jqxComboBox('clearSelection');
                var msg = "Type is required field";
                WarningNotificationMessage(msg, 'red', true, 2000);
                return;
            }
        }else{
            var msg = "Type is required field";
            WarningNotificationMessage(msg, 'red', true, 2000);
            return;
        }

        var LedgerVal = $("#Ledger").val();
        if(LedgerVal){
            var getLedgerIndex = $("#Ledger").jqxComboBox('getSelectedIndex');
            if(getLedgerIndex < 0){
                $("#Ledger").jqxComboBox('clearSelection');
            }
        }


        getItemStockAdjustGridData()
        .then(function(gridData){
            var postdata ="AdjustDate="+$("#AdjustDate").val();
                postdata+="&Notes="+$("#Notes").val();
                postdata+="&Location="+$("#Location").val();
                postdata+="&Supplier="+$("#Supplier").val();
                postdata+="&Type="+$("#Type").val();
                postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
                postdata+="&DeletedItemGrid="+encodeURIComponent(JSON.stringify(DeletedGridItems));
                postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
                postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
                postdata+="&StockAdjust="+StockAdjust;
                postdata+="&LedgerAccount="+$("#Ledger").val();

            $.ajax({
                url: base_url + 'backoffice/item_stock_adjust_v2/update',
                type: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    ItemStockAdjustGrid(data.newlist, ItemStockAdjust)
                    .then(function(){
                        $("#update_stock_adjust_save").prop("disabled", true);
                        DeleteDetails = [];
                        Load_Pending_Complete(StockAdjust);
                    })      
                }
            })
        })
    })

    $(document).on('click', '#update_stock_adjust_yes', function(e){
        e.preventDefault();

        var LocationVal = $("#Location").val();
        if(LocationVal){
            var getLocationValIndex = $("#Location").jqxComboBox('getSelectedIndex');
            if(getLocationValIndex < 0){
                $("#Location").jqxComboBox('clearSelection');
                return;
            }
        }

        var SupplierVal = $("Supplier").val();
        if(SupplierVal){
            var getSupplierIndex = $("#Supplier").jqxComboBox('getSelectedIndex');
            if(getSupplierIndex < 0){
                $("#Supplier").jqxComboBox('clearSelection');
            }
        }

        var TypeVal = $("#Type").val();
        if(TypeVal){
            var getTypeIndex = $("#Type").jqxComboBox('getSelectedIndex');
            if(getTypeIndex < 0){
                $("#Type").jqxComboBox('clearSelection');
                return;
            }
        }

        var LedgerVal = $("#Ledger").val();
        if(LedgerVal){
            var getLedgerIndex = $("#Ledger").jqxComboBox('getSelectedIndex');
            if(getLedgerIndex < 0){
                $("#Ledger").jqxComboBox('clearSelection');
            }
        }

        getItemStockAdjustGridData()
        .then(function(gridData){
            var postdata ="AdjustDate="+$("#AdjustDate").val();
                postdata+="&Notes="+$("#Notes").val();
                postdata+="&Location="+$("#Location").val();
                postdata+="&Supplier="+$("#Supplier").val();
                postdata+="&Type="+$("#Type").val();
                postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
                postdata+="&DeletedItemGrid="+encodeURIComponent(JSON.stringify(DeletedGridItems));
                postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
                postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
                postdata+="&StockAdjust="+StockAdjust;
                postdata+="&LedgerAccount="+$("#Ledger").val();

            $.ajax({
                url: base_url + 'backoffice/item_stock_adjust_v2/update',
                type: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    DeleteDetails = [];
                    $("#stock_adjust_window").jqxWindow('close');
                    Load_Pending_Complete(StockAdjust);
                }
            })
        })
    })

    $(document).on('click', '#new_stock_adjust_yes', function(e){
        e.preventDefault();
        getItemStockAdjustGridData()
        .then(function(gridData){
            var postdata ="AdjustDate="+$("#AdjustDate").val();
                postdata+="&Notes="+$("#Notes").val();
                postdata+="&Location="+$("#Location").val();
                postdata+="&Supplier="+$("#Supplier").val();
                postdata+="&Type="+$("#Type").val();
                postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));

            $.ajax({
                url: base_url + 'backoffice/item_stock_adjust_v2/new',
                type: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    $("#stock_adjust_window").jqxWindow('close');
                    Load_Pending_Complete(StockAdjust);     
                }
            })
        })
    })

    $(document).on('click', '#update_stock_adjust_no', function(e){
        e.preventDefault();
        DeleteDetails = [];

        $("#stock_adjust_window").jqxWindow('close');
    })

    $(document).on('click', '#update_stock_adjust_cancel', function(e){
        e.preventDefault();
        $("#edit_save_function").show();
        $("#edit_save_ask_function").hide();
        $("#edit_delete_ask_function").hide();
        $(".complete_button").show();
    })

    var getItemStockAdjustGridData = () => {
        var def = $.Deferred();
        
        var rowcount = 0;
        var currowcount = 1;
        var rowdata = [];
        var rows = $("#ItemStockAdjust").jqxGrid('getrows');
        if(rows.length > 0){
            rowcount = rows.length;
            for(var i=0; i < rows.length; i++){
            
                if(rows[i].Flag == 1){
                    rowdata.push(rows[i]);
                }
                
                if(rowcount == currowcount){
                    def.resolve(rowdata);
                }

                currowcount++;
            }
        }else{
            def.resolve(rowdata);
        }

        return def.promise();
    }

    var is_numeric = (str) => {
        return /^\d+$/.test(str);
    }

    var ScanItemSearch = (Barcode) => {
        var def = $.Deferred();
        var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');
        var StockLocation = "Stock"+$("#Location").val();
        var countrow = 1;
        var countrowlength = 0;
        var actualcount = Items.length;
        var datarow = {}
        var rows = new Array();
        
        ScanItemSearchMisc(Barcode)
        .then(function(result){
            rows = result;
        })
        // console.log(Items);
        var resultarr = [];
        var countres = 0;
        $.each(Items, function(index, value){
            var BarCodeArray = value.BarCodeArray; 
            var BarCodeArrayInclude = (BarCodeArray ? BarCodeArray.includes(Barcode) : false);
            
            if(value.Part == Barcode || value.BarCodeAlt == Barcode || value.Serial == Barcode || "S" + value.Part == Barcode || "S" + value.BarCodeAlt == Barcode || "S" + value.Serial == Barcode || BarCodeArrayInclude != false){
                resultarr.push(BarCodeArray);
                rows.push({
                    "Location"          : $("#Location").val(),
                    "ID"                : value.ID,
                    "Item"              : value.Item,
                    "Part"              : value.Part,
                    "Description"       : value.Description,
                    "Cost"              : value.Cost,
                    "CostFreight"       : value.CostFreight,
                    "CostExtra"         : value.CostExtra,
                    "CostDuty"          : value.CostDuty,
                    "Custom1"           : value.Custom1,
                    "Custom2"           : value.Custom2,
                    "Custom3"           : value.Custom3,
                    "Custom4"           : value.Custom4,
                    "Custom5"           : value.Custom5,
                    "QuantityCurrent"   : parseInt(value[StockLocation]),
                    "QuantityAdjust"    : parseInt(TypeDetails.originalItem.Quantity),
                    "QuantityNew"       : parseInt(value[StockLocation]) + parseInt(TypeDetails.originalItem.Quantity),
                    "CostLanded"        : parseFloat(value.CostLanded).toFixed(2),
                    "AdjCost"           : parseFloat(value.CostLanded * TypeDetails.originalItem.Quantity).toFixed(2),
                    "StockLocation"     : value.StockLocation,
                    "Stock9"            : value.Stock9,
                    "Stock8"            : value.Stock8,
                    "Stock0"            : value.Stock0,
                    "Stock7"            : value.Stock7,
                    "Stock6"            : value.Stock6,
                    "Stock5"            : value.Stock5,
                    "Stock4"            : value.Stock4,
                    "Stock3"            : value.Stock3,
                    "Stock2"            : value.Stock2,
                    "Stock1"            : value.Stock1,
                    "SupplierPart"      : value.SupplierPart,
                    "Comment"           : '',
                    "Flag"              : 1,
                    "ItemSerialUnique"  : null,
                    "BarCodeAltUnique"  : null,
                    "Serial"            : value.Serial,
                    "BarCodeAlt"        : value.BarCodeAlt,
                    "LedgerAccount"     : $("#Ledger").val()
                })

                console.log("dito ba?")

                // Overwrite ItemSerialUnique value
                if(value.ItemSerialUnique > 0){
                    rows[countrowlength]["ItemSerialUnique"] = value.ItemSerialUnique;
                }

                if(value.BarCodeAltUnique > 0){
                    rows[countrowlength]["BarCodeAltUnique"] = value.BarCodeAltUnique;
                }

                countrowlength++;

                countres++;
            }

            if(countrow == actualcount){
                def.resolve(rows);
            }

            countrow++;
        })
        console.log("rescount",countres);
        return def.promise();
    }

    var ScanItemSearchMisc = (Barcode) => {
        var def = $.Deferred();
        var rows = new Array();
        var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');
        var StockLocation = "Stock"+$("#Location").val();
        var countrow = 1;
        var countrowlength = 0;
        var actualcount = Items.length;
        str = Barcode.substring(1);
        $.each(Items, function(index, value){
            if(value.Part == str){
                console.log("misc",value.ItemSerialUnique);

                rows.push({
                    "Location"          : $("#Location").val(),
                    "ID"                : value.ID,
                    "Item"              : value.Item,
                    "Part"              : value.Part,
                    "Description"       : value.Description,
                    "Cost"              : value.Cost,
                    "CostFreight"       : value.CostFreight,
                    "CostExtra"         : value.CostExtra,
                    "CostDuty"          : value.CostDuty,
                    "Custom1"           : value.Custom1,
                    "Custom2"           : value.Custom2,
                    "Custom3"           : value.Custom3,
                    "Custom4"           : value.Custom4,
                    "Custom5"           : value.Custom5,
                    "QuantityCurrent"   : parseInt(value[StockLocation]),
                    "QuantityAdjust"    : parseInt(TypeDetails.originalItem.Quantity),
                    "QuantityNew"       : parseInt(value[StockLocation]) + parseInt(TypeDetails.originalItem.Quantity),
                    "CostLanded"        : parseFloat(value.CostLanded).toFixed(2),
                    "AdjCost"           : parseFloat(value.CostLanded * TypeDetails.originalItem.Quantity).toFixed(2),
                    "StockLocation"     : value.StockLocation,
                    "Stock9"            : value.Stock9,
                    "Stock8"            : value.Stock8,
                    "Stock0"            : value.Stock0,
                    "Stock7"            : value.Stock7,
                    "Stock6"            : value.Stock6,
                    "Stock5"            : value.Stock5,
                    "Stock4"            : value.Stock4,
                    "Stock3"            : value.Stock3,
                    "Stock2"            : value.Stock2,
                    "Stock1"            : value.Stock1,
                    "SupplierPart"      : value.ID,
                    "Comment"           : '',
                    "Flag"              : 1,
                    "ItemSerialUnique"  : null,
                    "BarCodeAltUnique"  : null,
                    "Serial"            : value.Serial,
                    "BarCodeAlt"        : value.BarCodeAlt,
                    "LedgerAccount"     : $("#Ledger").val()
                })

                console.log("or dito kaya?");

                // Overwrite ItemSerialUnique value
                if(value.ItemSerialUnique > 0){
                    rows[countrowlength]["ItemSerialUnique"] = value.ItemSerialUnique;
                }

                if(value.BarCodeAltUnique > 0){
                    rows[countrowlength]["BarCodeAltUnique"] = value.BarCodeAltUnique;
                }

                countrowlength++;
            }

            if(countrow == actualcount){
                def.resolve(rows);
            }

            countrow++;
        })

        return def.promise();
    }

    var WarningNotificationMessage = (msg, color, error = true, delay) => {
        $("#warning_notification_message").show();
        $("#warning_notification_message").text(msg);
        if(!error){
            $("#warning_notification_message").css('color', color);
        }else{
            $("#warning_notification_message").css('color', color);
        }


        setTimeout(function(){
            $("#warning_notification_message").hide();
        },delay)
    }

    $(document).on('click', '#update_stock_adjust_close', function(e){
        e.preventDefault();
        var UpdateStockAdjustButton = $("#update_stock_adjust_save").is(":disabled");
        if(UpdateStockAdjustButton){
            DeleteDetails = [];
            $("#stock_adjust_window").jqxWindow('close');
        }else{
            //ask to save
            $("#edit_save_function").hide();
            $("#edit_save_ask_function").show();
            $(".complete_button").hide();
        }
    })

    $(document).on('click', '#delete_stock_adjust', function(e){
        e.preventDefault();
        $("#edit_delete_ask_function").show();
        $("#edit_save_function").hide();
        $("#edit_save_ask_function").hide();
    })

    $(document).on('click', '#delete_stock_adjust_no', function(e){
        e.preventDefault();
        $("#edit_delete_ask_function").hide();
        $("#edit_save_function").show();
        $("#edit_save_ask_function").hide();
    })

    $(document).on('click', '#delete_stock_adjust_yes', function(e){
        e.preventDefault();
        var gridData = $("#ItemStockAdjust").jqxGrid('getrows')
        var StockAdjustUnique = $("#edit_stock_adjust_unique").val();
        var postdata ="Unique="+StockAdjustUnique;
            postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
            postdata+="&DeletedItemGrid="+encodeURIComponent(JSON.stringify(DeletedGridItems));
            postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/delete',
            type: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){

            },
            success: function(data){
                Load_Pending_Complete(StockAdjust);
                $("#stock_adjust_window").jqxWindow('close');
            }
        })
        
    })

    $(document).on('cellselect', '#ItemStockAdjust', function(event){
        // event arguments.
        var args = event.args;
        // get the column's text.
        var column = $("#ItemStockAdjust").jqxGrid('getcolumn', event.args.datafield).text;
        // column data field.
        var dataField = event.args.datafield;
        // row's bound index.
        var rowBoundIndex = event.args.rowindex;
        // cell value
        var value = args.value;

        var cell = $('#ItemStockAdjust').jqxGrid('getselectedcell');

        if(cell){
            $("#DeleteAdjustQty").prop('disabled', false);
        }
    })

    $(document).on('cellvaluechanged', "#ItemStockAdjust", function (event) {
        // event arguments.
        var args = event.args;
        // column data field.
        var datafield = event.args.datafield;
        // row's bound index.
        var rowBoundIndex = args.rowindex;
        // new cell value.
        var value = args.newvalue;
        // old cell value.
        var oldvalue = args.oldvalue;

        if(value == ''){

        }else{
            
        }
    });

    $(document).on('cellendedit', "#ItemStockAdjust", function (event) {
        // event arguments.
        var args = event.args;
        // column data field.
        var dataField = event.args.datafield;
        // row's bound index.
        var rowBoundIndex = event.args.rowindex;
        // cell value
        var value = args.value;
        // cell old value.
        var oldvalue = args.oldvalue;
        // row's data.
        var rowData = args.row;

        // if(value != ''){
            var rowid = $("#ItemStockAdjust").jqxGrid('getrowid', rowBoundIndex);
            var data = $('#ItemStockAdjust').jqxGrid('getrowdatabyid', rowid);

            if(dataField == 'QuantityAdjust'){
                var NewQty = parseFloat(data.QuantityCurrent) + parseFloat(value);
                var UnitCost = ( parseFloat(data.CostLanded) * parseFloat(value) );
                $("#ItemStockAdjust").jqxGrid('setcellvaluebyid', rowid, "QuantityNew", NewQty);

                $("#ItemStockAdjust").jqxGrid('setcellvaluebyid', rowid, "AdjCost", UnitCost);
            }
            
            if(dataField == 'QuantityNew'){
                var AdjustQty = parseFloat(value) - parseFloat(data.QuantityCurrent);
                var UnitCost = ( parseFloat(data.CostLanded) * parseFloat(data.QuantityAdjust) );
                $("#ItemStockAdjust").jqxGrid('setcellvaluebyid', rowid, "QuantityAdjust", AdjustQty);

                $("#ItemStockAdjust").jqxGrid('setcellvaluebyid', rowid, "AdjCost", UnitCost); 
            }

            data["Flag"] = 1;

            $("#update_stock_adjust_save").prop('disabled', false);
        // }
    });

    $(document).on('cellunselect', "#ItemStockAdjust", function (event){
        // event arguments.
        var args = event.args;
        // get the column's text.
        var column = $("#ItemStockAdjust").jqxGrid('getcolumn', event.args.datafield).text;
        // column data field.
        var dataField = event.args.datafield;
        // row's bound index.
        var rowBoundIndex = event.args.rowindex;
        // cell value
        var value = args.value;

        $("#DeleteAdjustQty").prop('disabled', true);
    });

    $(document).on('click', '#complete_item_stock', function(e){
        e.preventDefault();
        CallCompleteOption();
    })

    var populateCompleteWindow = () => {
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append(
                '<div id="complete_option" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                    '<div id="complete_option_container" style="background: #144766; color:#EEE; padding: 0;">'+
                        '<div style="background-color: #fff; padding:5px; color: #000;">'+
                            '<div class="Reason">'+
                                '<label><input type="radio" id="Yes" name="group1" class="radio2" checked="checked" /><span class="radio4"></span><label class="reason-label">Option 1: Update Stock Adjust Date to Now</label></label>'+
                            '</div>'+
                            '<div class="Reason">'+
                                '<label><input type="radio" id="No" name="group1" class="radio2"  /><span class="radio4"></span><label class="reason-label">Option 2: Keep Stock Adjust Date</label></label>'+
                            '</div>'+
                        '</div>'+
                        '<div style="text-align:center; width: 100%; position: absolute; bottom: 0; padding: 5px;">'+
                            '<button class="btn btn-warning btn-lg" id="complete_cancel">Cancel</button>&nbsp;&nbsp;<button id="complete_okay" class="btn btn-success btn-lg">Okay</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );

            def.resolve();
        },100)

        return def.promise();
    }

    var WindowCompleteOption = () => {
        var def = $.Deferred();
        setTimeout(function(){
            $("#complete_option").jqxWindow({
                height: '200',
                width: '550',
                isModal: true,
                theme: 'darkblue',
                title: '<i style="font-size: 25px;" class="glyphicon glyphicon-info-sign"></i>',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 999
            })

            $("#complete_option").jqxWindow('open');

            $("#complete_option").on('close', function(e){
                $("#complete_option").remove();
            })
            def.resolve();
        },100)

        return def.promise();
    }

    var CallCompleteOption = () => {
        populateCompleteWindow()
        .then(function(){
            WindowCompleteOption();
        })
    }

	$(document).on('click', '.radio2', function(){
        
    });
    
    $(document).on('click', '#complete_cancel', function(e){
        e.preventDefault();
        $("#complete_option").jqxWindow('close');
    })

    $(document).on('click', '#complete_okay', function(e){
        e.preventDefault();

        var rows = $("#ItemStockAdjust").jqxGrid('getrows');
		var id = $('input[type=radio][name=group1]:checked').attr('id');
        var postdata ="AdjustDate="+$("#AdjustDate").val();
            postdata+="&Notes="+$("#Notes").val();
            postdata+="&Location="+$("#Location").val();
            postdata+="&Supplier="+$("#Supplier").val();
            postdata+="&Type="+$("#Type").val();
            postdata+="&Grid="+encodeURIComponent(JSON.stringify(rows));
            postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
            postdata+="&DeletedDetails="+JSON.stringify(DeleteDetails);
            postdata+="&Option="+id;
        
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/complete',
            type: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){
                LoadingProcess('Processing please wait...');
            },
            success: function(data){
                $("#complete_option").jqxWindow('close');
                $("#stock_adjust_window").jqxWindow('close');
            },
            complete: function(){
                DeleteDetails = [];
                Load_Pending_Complete(StockAdjust);
                LoadingProcessEnd();
                reloadItems();
            }
        })
    })

    var reloadItems = () => {
        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/reload-items',
            type: 'get',
            dataType: 'json',
            beforeSend: function(){
                LoadingProcess('Updating data please wait...');
            },
            success: function(data){
                Items = data.items;
            },
            complete: function(){
                LoadingProcessEnd(); 
            }
        })
    }

    $(document).on('click', "#download_stock_adjust", function(e){
        e.preventDefault();
        if( $("#update_stock_adjust_save").is(":disabled") == false){
            $("#update_stock_adjust_save").trigger('click');

            UpdateItemStockInfo();
            return false;
        }

        var gridData = $("#ItemStockAdjust").jqxGrid('getrows');
        var LocationDetails = $("#Location").jqxComboBox('getSelectedItem');
        var SupplierDetails = $("#Supplier").jqxComboBox('getSelectedItem');
        var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');

        var postdata ="AdjustDate="+$("#AdjustDate").val();
            postdata+="&Notes="+$("#Notes").val();
            postdata+="&Location="+$("#Location").val();
            postdata+="&Supplier="+$("#Supplier").val();
            postdata+="&Type="+$("#Type").val();
            postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
            postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
            postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
            postdata+="&StockAdjust="+StockAdjust;
            postdata+="&LocationDetails="+$("#LocationDetails").val();
            postdata+="&SupplierDetails="+$("#SupplierDetails").val();
            postdata+="&LocationName="+ (LocationDetails ? LocationDetails.label : '');
            postdata+="&SupplierName="+ (SupplierDetails ? SupplierDetails.label : '');
            postdata+="&TypeName="+ (TypeDetails ? TypeDetails.label : '');

        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/download',
            type: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){
                LoadingProcess('Please wait while downloading data.');  
            },  
            success: function(data){
                DeleteDetails = [];
                window.location = (base_url + 'backoffice/reports/dailysales/download-report');
            },
            complete: function(){
                LoadingProcessEnd();
            }
        })
    })

    
    $(document).on('click','#email_stock_adjust', function(e){
        e.preventDefault();
        
        if( $("#update_stock_adjust_save").is(":disabled") == false){
            $("#update_stock_adjust_save").trigger('click');
        }

        var gridData = $("#ItemStockAdjust").jqxGrid('getrows');
        var LocationDetails = $("#Location").jqxComboBox('getSelectedItem');
        var SupplierDetails = $("#Supplier").jqxComboBox('getSelectedItem');
        var TypeDetails = $("#Type").jqxComboBox('getSelectedItem');

        var postdata ="AdjustDate="+$("#AdjustDate").val();
            postdata+="&Notes="+$("#Notes").val();
            postdata+="&Location="+$("#Location").val();
            postdata+="&Supplier="+$("#Supplier").val();
            postdata+="&Type="+$("#Type").val();
            postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
            postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
            postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
            postdata+="&StockAdjust="+StockAdjust;
            postdata+="&LocationDetails="+$("#LocationDetails").val();
            postdata+="&SupplierDetails="+$("#SupplierDetails").val();
            postdata+="&LocationName="+ (LocationDetails ? LocationDetails.label : '');
            postdata+="&SupplierName="+ (SupplierDetails ? SupplierDetails.label : '');
            postdata+="&TypeName="+ (TypeDetails ? TypeDetails.label : '');

        $.ajax({
            url: base_url + 'backoffice/item_stock_adjust_v2/email',
            type: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){
                LoadingProcess('Please wait while downloading data.');  
            },  
            success: function(data){
                console.log(data);
                // return;
                window.location = base_url + 'backoffice/reports/email'
            },
            complete: function(){
                LoadingProcessEnd();
            }
        })
        
    })

    var UpdateItemStockInfo = () => {
        getItemStockAdjustGridData()
        .then(function(gridData){
            var postdata ="AdjustDate="+$("#AdjustDate").val();
                postdata+="&Notes="+$("#Notes").val();
                postdata+="&Location="+$("#Location").val();
                postdata+="&Supplier="+$("#Supplier").val();
                postdata+="&Type="+$("#Type").val();
                postdata+="&Grid="+encodeURIComponent(JSON.stringify(gridData));
                postdata+="&Unique="+$("#edit_stock_adjust_unique").val();
                postdata+="&DeleteDetails="+JSON.stringify(DeleteDetails);
                postdata+="&StockAdjust="+StockAdjust;

            $.ajax({
                url: base_url + 'backoffice/item_stock_adjust_v2/update',
                type: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    ItemStockAdjustGrid(data.newlist, ItemStockAdjust)
                    .then(function(){
                        $("#update_stock_adjust_save").prop("disabled", true);
                        $("#download_stock_adjust").trigger('click');
                        DeleteDetails = [];
                        Load_Pending_Complete(StockAdjust);
                    })      
                }
            })
        })
    }

    var populateVirtualKeyboard = (id, inputTitle) => {
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append(
                '<div id="virtual_keyboard" style="display: none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                    '<div id="virtual_keyboard_container" style="background: #144766; color:#EEE; padding: 0;>'+
                        '<form id="'+id+'">'+
                            '<h4 style="text-align:center;">Enter '+inputTitle+'</h4>'+
                            '<textarea rows="4" id="search_field" style="color: #000; width: 100%; font-size: 1.5em;"></textarea>'+
                            '<div id="keyboard_plugin"></div>'+
                        '</form>'+
                    '</div>'+
                '</div>'
            );
   
            def.resolve();
        },100);

        return def.promise();
    }

    var WindowPopupVirtualKeyboard = () => {
        var def = $.Deferred();
        $("#virtual_keyboard").jqxWindow({
            height: '450',
            minWidth: '45%',
            isModal: true,
            theme: 'darkblue',
            title: '<i style="font-size: 25px;" class="glyphicon glyphicon-info-sign"></i>',
            showCloseButton: true,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0,
            modalZIndex: 999
        })
        setTimeout(function(){
            $("#virtual_keyboard").jqxWindow('open');

            $("#virtual_keyboard").on('close', function(){
                $("#virtual_keyboard").remove();
            })

            def.resolve();
        },100)
        
        return def.promise();
    }

    var CallVirtualKeyBoard = (id, label) => {
        populateVirtualKeyboard(id, label)
        .then(function(){
            $("#keyboard_plugin").jkeyboard({
                layout: 'english',
                input: $("#search_field")
            })
            WindowPopupVirtualKeyboard()
            .then(function(){
                $("#search_field").focus();
            })
        })
    }

    var GroupItemAdjustGrid = (searchdata, curdata) => {
        //searchdata consider this is multiple rows.
        var def = $.Deferred();
        var removedata = new Array();
        var countdata = curdata.length;
        var actualcount = 1;
        var rowdata = [];
        var found = 0;
        $.each(searchdata, function(index, value){
            $.each(curdata, function(ind, val){
                if(value.ID == val.ID && value.ItemSerialUnique == val.ItemSerialUnique){
                    var AdjustQuantity = val.QuantityAdjust;
                    val.QuantityAdjust = (value.QuantityAdjust + AdjustQuantity);
                    val.QuantityNew = parseFloat(value.QuantityNew) + parseFloat(AdjustQuantity);
                    val.Flag = 1;
                    $('#ItemStockAdjust').jqxGrid('updaterow', val.uid, val);
                    removedata.push(value);
                    found = 1;
                }
            })

            if(found == 1){
                //do nothing
            }else{
                rowdata.push(value);
            }

            found = 0;

            def.resolve(rowdata);
        })
        
        return def.promise();
    }

    $(document).on('click', "#CloseAddNewItem", function(event){
        $("#item_search").jqxWindow('close');
    })
})