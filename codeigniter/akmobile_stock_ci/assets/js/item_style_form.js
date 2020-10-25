/*
|-----------------------------------------------------------|
| ITEM STYLE LOAD DYNAMIC COLUMNS
|-----------------------------------------------------------|
*/
$(function(){
    var BackOfficeItemStyleMatrixStockAdjust = ($("#BackOfficeItemStyleMatrixStockAdjust").length > 0  ? $("#BackOfficeItemStyleMatrixStockAdjust").val() : 0);
    var MatrixItemStyleColumns = [];
    var MatrixItemPrintLabelStyleColumns = [];
    var MatrixItemStyleTypes = [];
    var MatrixColumnGroupName = '';
    var MatrixDataStore = [];
    var MatrixCellSelectedRowIndex;
    var MatrixGridData = [];
    var MatrixInfoChange = [];
    var MatrixGlobalAttribute = [];
    var MatrixNewColumnChange = [];
    var MatrixCustom1arr = [];
    var MatrixClickEdit = false;
    var MatrixClickClone = false;
    var MatrixClickNewItem = false;
    var MatrixClickCloseForm = false;
    var MatrixClickDelete = false;
    var MatrixBarcodeLabelGrid = [];
    var MatrixNewData = [];
    var MatrixColumnData = [];
    var MatrixItemData = [];
    var MatrixAddedColumn = 0;
    var MatrixStyleColumns = function(template){
        var def = $.Deferred();
        var postdata ="Style="+template;
        $.ajax({
            dataType: 'json',
            url: base_url + 'backoffice/item/style/load/column/types',
            data: postdata,
            type: 'POST',
            success: function (data, status, xhr) {
                var count = 0;
                var stringId = 'Custom1';
               
                $.each(data.gridcols, function(index, value){
                    
                    (count > 0 ? stringId = 'Custom2_'+count : stringId);
                    
                    column_added_unique = count;

                    if(value.aggregates == 1){
                        if(value.columngroup){
                            if(value.columntype == 'numberinput'){//Number Input
                                
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield,  width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                                    },
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    } 
                                })

                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield,  width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                                    },
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    } 
                                })
                            }else{
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                            }
                            
                            MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                            if(value.columntype == 'numberinput'){//Number Input
                               MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                                    },
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    }  
                                })

                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                                    },
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    }  
                                })
                            }else{
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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

                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align, aggregates: [{
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
                            }
                        }
                    }else{
                        if(value.columngroup){//Column Group
                            if(value.columntype == 'numberinput'){//Number Input
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align,
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    }
                                });

                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align,
                                columntype: 'numberinput',
                                createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                    editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                }
                            });
                            }else{
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align});
                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', columngroup: value.columngroup, datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, align: value.align});
                            }
                        }else{
                            if(value.columntype == 'numberinput'){//Number Input
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, algin: value.align,
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    }
                                });

                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, algin: value.align,
                                    columntype: 'numberinput',
                                    createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                        editor.jqxNumberInput({ digits: 8, spinMode: 'simple'});
                                    }
                                }); 
                            }else{
                                MatrixItemStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, algin: value.align});
                                MatrixItemPrintLabelStyleColumns.push({ text: '<a class="matrix_grid_attributes" id="'+stringId+'" style="cursor: pointer;">'+value.text+'</a>', datafield: value.datafield, width: value.width, hidden: value.hidden, filtertype: value.filtertype, cellsalign: value.cellsalign, cellsformat: value.cellsformat, algin: value.align}); 
                            }
                        }
                    }
                    MatrixColumnGroupName = value.columngroup;
                    count++;
                })
                var gridType = data.gridtype;
                gridType.push({name: 'Custom2_1', type: 'int'});
                MatrixItemStyleTypes.push(gridType);

                // $("#add_column").text("Add " + data.buttonLabel[1].Custom2);
                // $("#add_row").text("Add " + data.buttonLabel[0].Custom1);

                def.resolve(data.gridData);
            }
        });
        return def.promise();
    }

    // Generate matrix form
    var DefaultTemplate = null;
    var AllFields = [];
    var currentLocation = '';
    var taxList = [];
    var MatrixAttributes = [];
    var MatrixChangeTax = false;
    var MatrixNewForm = true;
    var MatrixBarcodeLabelList = [];
    var MatrixBarcodeLabelDefault = '';
    var MatrixAccountCodeDefault = '';
    var matrix_item_form = () => {
        var def = $.Deferred();
        var content = '';
        $.ajax({
            url: base_url + 'backoffice/itemstyle/generate_form',
            type: 'POST',
            dataType: 'json',
            beforeSend: function(){

            },
            success: function(data){
                var tab_data = data.MatrixTab;
                var Tabcontent = '';
                MatrixAttributes = data.attributes;
                taxList = data.TaxList;
                DefaultTemplate = data.DefaultTemplate;
                console.log("Default from attribute",DefaultTemplate);
                currentLocation = data.currentLocation;
                MatrixBarcodeLabelList = data.BarcodeLabel;
                // Default value
                MatrixBarcodeLabelDefault = data.BarcodeLabelDefault;
                MatrixAccountCodeDefault = data.AccountCodeDefault;

                // Tab preparation
                var tab = '<div id="matrix_item_tab"><ul>';
                $.each(tab_data, function(index, value){
                    // Tab title
                    tab+='<li>'+value.Label+'</li>';
                    // Tab content
                    Tabcontent+='<div id="tab'+value.Tab+'">';
                    // Field(s) and column(s) per tab content

                    // End of Tab content
                    Tabcontent+='</div>';
                })
                // End Tab preparation
                tab+='</ul>';
                // End Tab(s) 
                Tabcontent+='</div>';

                // set column for the specific tab
                // content+='<div style="width:'+value2.ColumnSize+'%; height: 50px; float:left; border: 1px solid #000;"></div>';
                setTimeout(function(){
                    var extra_space = 3;
                    var strli = '';
                    for(var i=0; i < extra_space; i++){
                        strli+='<li class="matrix_function_after_save" style="display:none;">&nbsp;</li>';
                    }

                    $("body").append(
                        '<div id="MatrixItemWindow" style="display:none; box-shadow: 5px 5px 10px #000;">'+
                            '<div id="MatrixItemWindowContainer" style="background: #144766; color:#EEE; padding: 0; margin:0;">'+
                                '<div style="width:100%;">'+
                                    '<form id="matrix_form_validation">'+
                                        '<ul class="matrix_style_button_top">'+
                                            '<li class="matrix_function_after_save" style="display:none;"><button type="button" id="matrix_item_form_delete" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></button></li>'+
                                            strli+
                                            '<li class="matrix_function_after_save" style="display:none;"><button type="button" id="matrix_add_new" class="btn btn-success">Add New</button></li>'+
                                            '<li class="matrix_function_after_save" style="display:none;">&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_item_form_clone" class="btn btn-primary matrix_function_after_save">Clone</button></li>'+
                                            '<li class="matrix_function_after_save" style="display:none;">&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_item_form_print_label" class="btn btn-default matrix_function_after_save">Print Label</button></li>'+
                                            '<li class="matrix_function_after_save" style="display:none;">&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_add_column" class="btn btn-warning">Add Attribute</button></li>'+
                                            '<li>&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_add_row" class="btn btn-info">Add Sizes</button></li>'+
                                            '<li>&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_save_data" class="btn btn-primary" disabled>Save</button></li>'+
                                            '<li>&nbsp;</li>'+
                                            '<li><button type="button" id="matrix_item_form_close" class="btn btn-danger">Close</button></li>'+
                                        '<ul>'+
                                        '<br>'+
                                        tab+
                                        Tabcontent+
                                        '<div id="matrix_grid_attributes"></div>'+
                                    '</form>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    );
        
                    $("#matrix_item_tab").jqxTabs({theme: 'darkblue', width: '100%', height: 350, position: 'top'});

                    var source = {
                        dataType: "json",
                        dataFields: MatrixItemStyleTypes[0],
                        localdata: {}
                    }
                    var MatrixDataAdapter = new $.jqx.dataAdapter(source, {
                        downloadComplete: function (data, status, xhr) { },
                        loadComplete: function (data) { },
                        loadError: function (xhr, status, error) { }
                    });
                            
                    $("#matrix_grid_attributes").jqxGrid({
                        width: "100%",
                        columnsresize: true,
                        theme: 'darkblue',
                        sortable: false,
                        pageable: false,
                        pagesize: 12,
                        scrollbarsize: 25,
                        pagerMode: 'advance',
                        altRows: true,
                        rowsheight: 40,
                        editable: true,
                        selectionmode: 'multiplecellsadvanced',
                        source: MatrixDataAdapter,
                        columns: MatrixItemStyleColumns,
                        columngroups:[
                            { text: MatrixColumnGroupName+' ->', align: 'center', name: MatrixColumnGroupName },
                        ] 
                    })

                    $("#matrix_grid_attributes").on("cellclick", function (event)  {
                        // event arguments.
                        var args = event.args;
                        // row's bound index.
                        var rowBoundIndex = args.rowindex;
                        // row's visible index.
                        var rowVisibleIndex = args.visibleindex;
                        // right click.
                        var rightclick = args.rightclick; 
                        // original event.
                        var ev = args.originalEvent;
                        // column index.
                        var columnindex = args.columnindex;
                        // column data field.
                        var dataField = args.datafield;
                        // cell value
                        var value = args.value;
        
                        MatrixCellSelectedRowIndex = rowBoundIndex;
                    }); 

                    $("#matrix_grid_attributes").on('cellendedit', function (event) {
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
                        
                        if(dataField != 'Custom1'){  //-->Quantity Custom2_1, Custom2_2 etc 
        
                            if(value !== oldvalue){
                                if(value < 0){
                                    var cell = $("#matrix_grid_attributes").jqxGrid('getselectedcell');
                                    var newval = (value * -1);
                                    setTimeout(function(){
                                        $("#matrix_grid_attributes").jqxGrid('setcellvalue', cell.row, cell.datafield, newval);
                                    },100)
                                    $("#matrix_save_data").prop('disabled', false);
                                    
                                }else{
                                    column = $("#matrix_grid_attributes").jqxGrid("getcolumn", dataField).text;
                                    var getColumn = dataField.split("_")[1];
                                    
                                    var regex = /(<([^>]+)>)/ig,
                                    body = column,
                                    column = body.replace(regex, "");
                                    column = column.replace('...', '');
                                
                                    for(var key in MatrixGridData){
                                        if(MatrixGridData[key].Custom2 == column && 
                                        MatrixGridData[key].MatrixRow == rowBoundIndex && 
                                        MatrixGridData[key].MatrixColumn == getColumn && 
                                        MatrixGridData[key].MatrixItem == dataField){
                                            //Delete existing array after changed value
                                            MatrixGridData.splice(key, 1);
                                        }
                                    }
                                    //Add new row if not exist.
                                    MatrixGridData.push({"Custom1" : rowData.Custom1, "Custom2" : column, "MatrixRow" : rowBoundIndex, "MatrixColumn" : getColumn, "MatrixItem" : dataField, "Quantity" : value});
                                    if( $("#matrix_item_Location").length > 0 ){
                                       
                                        if(value != oldvalue){
                                            $("#matrix_item_Location").jqxComboBox({ disabled: true });
                                            $("#matrix_item_Location").addClass("matrix_change");
                                        }
                                    }

                                    if(value != oldvalue){
                                        $("#matrix_save_data").prop('disabled', false);
                                    }
                                }
                            }
        
                        }else{ //-->Custom1 Or Sizes
                            if(value != oldvalue){
                                $("#matrix_item_Location").jqxComboBox({ disabled: true });
                                $("#matrix_item_Location").addClass("matrix_change");
                            }
                            
                            for(var key in MatrixCustom1arr){
                                if(MatrixCustom1arr[key].uid == rowBoundIndex){
                                    MatrixCustom1arr.splice(key, 1);
                                }
                            }
        
                            MatrixCustom1arr.push(rowData);
                            if(value != oldvalue){
                                $("#matrix_save_data").prop('disabled', false);
                            }
                        }	
                    });
                    
                    var ref = '';
                    var curcol = '';
                    var curString = '';
                    var counter = 1;
                    var Tab = ''; 
                    $.each(MatrixAttributes, function(index, value){
                        var t = (value.Tab - 1); 

                        if(Tab != value.Tab){
                            curString = '';
                            curcol = '';
                            if(curcol != value.Column){

                                if(curString != ''){
                                    curString+='</div>';
                                }

                                curString+='<div style="width:'+value.ColumnSize+'%; height: auto; float:left; border:0px solid #000;">';
                                curcol = value.Column;
                            }

                            Tab = value.Tab;
                            
                        }else{
                            
                            if(curcol != value.Column){
                                if(curString != ''){
                                    curString+='</div>';
                                }
                                curString+='<div style="width:'+value.ColumnSize+'%; height: auto; float:left; border:0px solid #000;">';
                                curcol = value.Column;
                            }
                        }

                        (value.Required == 1) ? required = 'required' : required = '';

                        if(value.Control == 'datalist'){
                            curString+='<div style="width: 100%; padding:0 5px 0 0;">'+
                                            '<div style="float:left; width:35%; font-weight: bold; text-align:right; padding: 10px 0 0 0;" class="'+required+'">'+value.Label+':</div>'+
                                            '<div style="float:left; width:55%; padding:5px;">'+
                                                '<div id="matrix_item_'+value.Field+'"></div>'+
                                            '</div>'+
                                        '</div>';

                        }else if(value.Control == 'text'){

                            curString+='<div style="width: 100%; padding:0 5px 0 0;">'+
                                            '<div style="float:left; width:35%; font-weight: bold; text-align:right; padding: 10px 0 0 0;" class="'+required+'">'+value.Label+':</div>'+
                                            '<div style="float:left; width:55%; padding:5px;">'+
                                                '<input type="text" id="matrix_item_'+value.Field+'"/>'+
                                            '</div>'+
                                        '</div>';

                        }else if (value.Control == 'textarea'){

                            curString+='<div style="width: 100%; padding:0 5px 0 0;" class="matrix_function_after_save">'+
                                            '<div style="float:left; width:35%; font-weight: bold; text-align:right; padding: 10px 0 0 0;" class="'+required+'">'+value.Label+':</div>'+
                                            '<div style="float:left; width:55%; padding:5px;">'+
                                                '<textarea id="matrix_item_'+value.Field+'"></textarea>'+
                                            '</div>'+
                                        '</div>';

                        }else if(value.Control == 'numeric'){

                            curString+='<div style="width: 100%; padding:0 5px 0 0;">'+
                                            '<div style="float:left; width:35%; font-weight: bold; text-align:right; padding: 10px 0 0 0;" class="'+required+'">'+value.Label+':</div>'+
                                            '<div style="float:left; width:55%; padding:5px;">'+
                                                '<div id="matrix_item_'+value.Field+'"></div>'+
                                            '</div>'+
                                        '</div>';
                        }else if(value.Control == 'checkbox'){
                            curString+='<div style="width: 100%; padding:0 5px 0 0;">'+
                                            '<div style="float:left; width:35%; font-weight: bold; text-align:right; padding: 10px 0 0 0;" class="'+required+'">'+value.Label+':</div>'+
                                            '<div style="float:left; width:55%; padding:5px;">'+
                                                '<div id="matrix_item_'+value.Field+'"></div>'+
                                            '</div>'+
                                        '</div>';
                        }else if(value.Control == 'grid'){
                            curString+='<div id="matrix_item_'+value.Field+'"></div>';
                        }

                        if(MatrixAttributes.length == counter){
                            curString+='</div>';
                        }

                        counter++;
                        $("#matrix_item_tab").jqxTabs('setContentAt', t, curString);
                    })
                    
                    var ss = [];
                    var taxCustom = [];
                    var validate = [];
                    var fieldsArr = [];
                    AllFields = [];
                    $.each(MatrixAttributes, function(index, value){
                        AllFields.push({"Field" : value.Field, "Control" : value.Control});
                        fieldsArr.push({"Field" : value.Field, "Control" : value.Control});

                        if(value.Control == 'datalist'){
                            var source = {
                                datafields: [
                                    {name: 'Unique'},
                                    {name: 'Value'}
                                ],
                                datatype: 'json',
                                localdata: (value.Field != 'CategoryUnique' ? data[value.Field] : {})
                            }
                        
                            window[value.Field] = new $.jqx.dataAdapter(source);

                            $("#matrix_item_"+value.Field).jqxComboBox({ source: window[value.Field], displayMember: 'Value', valueMember: 'Unique', placeHolder: value.Label});
                            
                            var DefaultValue = value.Field;

                            if(DefaultValue == 'BarcodeLabel'){
                                $("#matrix_item_"+DefaultValue).val(MatrixBarcodeLabelDefault);
                            }else if(DefaultValue == 'AccountCode'){
                                $("#matrix_item_"+DefaultValue).val(MatrixAccountCodeDefault);
                            }

                            if(value.Field == 'Templates'){

                                $("#matrix_item_"+value.Field).on('change', function(event){
                                    var args = event.args;

                                    if(!args) return false;

                                    var index = args.index;
                                
                                    if(index < 0) return false;

                                    var item = event.args.item;

                                    MatrixItemStyleTypes = [];
                                    MatrixItemStyleColumns = [];
                                    var Template = item.label;
                                    MatrixStyleColumns(Template)
                                    .then(function(gridData){
                                        MatrixDataStore = gridData;

                                        var source = {
                                            dataType: "json",
                                            dataFields: MatrixItemStyleTypes[0],
                                            localdata: MatrixDataStore
                                        }

                                        var dataAdapter = new $.jqx.dataAdapter(source); 
                                        
                                        $("#matrix_grid_attributes").jqxGrid({ 
                                            source: dataAdapter,
                                            columns: MatrixItemStyleColumns,
                                            editable: true,
                                            columngroups:[
                                                { text: MatrixColumnGroupName+' ->', align: 'center', name: MatrixColumnGroupName },
                                            ] 
                                        });
                                        $("#matrix_add_column").attr("disabled", false);
                                        $("#matrix_add_row").attr("disabled", false);
                                        $("#matrix_save_data").attr("disabled", false);
                                    })
                                })
                            
                                $("#matrix_item_"+value.Field).val(DefaultTemplate);

                            }else if(value.Field == 'MainCategory'){

                                $("#matrix_item_"+value.Field).on('change', function(event){
                                    var args = event.args;
                                    if(!args) return false;

                                    var index = args.index;
                                
                                    if(index < 0) return false;
                                    var item = event.args.item;
                                
                                    var dropdownvalue = $("#matrix_item_"+value.Field).val();

                                    if(dropdownvalue){
                                        var selecteddropdownIndex = $("#matrix_item_"+value.Field).jqxComboBox('getItemByValue', dropdownvalue).index;
                                        $("#matrix_item_"+value.Field).jqxComboBox({'selectedIndex' : selecteddropdownIndex});
                                        var SubCategorySource = [];
                                        $.each(data.CategoryUnique, function(ind, val){
                                            if(val.CategoryMainUnique == dropdownvalue){
                                                SubCategorySource.push({
                                                    "Unique" : val.Unique,
                                                    "Value" : val.Value
                                                })
                                            }
                                        })

                                        $("#matrix_item_CategoryUnique").jqxComboBox({ source: SubCategorySource});
                                        $("#matrix_save_data").attr("disabled", false);
                                        MatrixInfoChange.push({"Field" : value.Field});
                                    }
                                })

                            }else if(value.Field == 'Location'){

                                $("#matrix_item_"+value.Field).val(data.currentLocation);

                            }else{
                                $("#matrix_item_"+value.Field).on('change', function(event){
                                    var args = event.args;
                                    if(!args) return false;

                                    var index = args.index;
                                
                                    if(index < 0) return false;
                                    var item = event.args.item;

                                    var dropdownvalue = $("#matrix_item_"+value.Field).val();
                                    if(dropdownvalue){
                                        var selecteddropdownIndex = $("#matrix_item_"+value.Field).jqxComboBox('getItemByValue', dropdownvalue).index;
                                        $("#matrix_item_"+value.Field).jqxComboBox({'selectedIndex' : selecteddropdownIndex});
                                        $("#matrix_save_data").attr("disabled", false);
                                        MatrixInfoChange.push({"Field" : value.Field});
                                    }
                                })
                            }

                            if(MatrixClickEdit){
                                if(value.Field == 'Templates'){
                                    $("#matrix_item_"+value.Field).jqxComboBox({ disabled: true });
                                }
                            }

                        }else if(value.Control == 'text'){
                            $("#matrix_item_"+value.Field).jqxInput({placeHolder: "Enter "+value.Label, height: '25px', width: "'"+value.Size+"%'"});
                            $("#matrix_item_"+value.Field).on('keypress change', function(e){
                                $("#matrix_save_data").attr("disabled", false);
                                MatrixInfoChange.push({"Field" : value.Field});
                            })
                        
                        }else if(value.Control == 'textarea'){

                            $("#matrix_item_"+value.Field).jqxTextArea({placeHolder: 'Enter '+value.Label, height: 90, width: value.Size+'%', minLength: 1 });
                            $("#matrix_item_"+value.Field).on('change', function(e){
                                $("#matrix_save_data").attr("disabled", false);
                                MatrixInfoChange.push({"Field" : value.Field});
                            })

                        }else if(value.Control == 'numeric'){
                            $("#matrix_item_"+value.Field).jqxNumberInput({ width: '85px', height: '25px', inputMode: 'simple', spinButtons: false});

                            $("#matrix_item_"+value.Field).on('valueChanged', function(e){
                                $("#matrix_save_data").attr("disabled", false);
                                MatrixInfoChange.push({"Field" : value.Field});
                            })

                        }else if(value.Control == 'checkbox'){

                            $("#matrix_item_"+value.Field).jqxCheckBox({ width: 120, height: 25, checked: true});

                            $("#matrix_item_"+value.Field).on('change', function(event){
                                var checked = event.args.checked;
                                $("#matrix_save_data").attr("disabled", false);
                                MatrixInfoChange.push({"Field" : value.Field});
                            })

                        }else if(value.Control == 'grid'){

                            if(value.Field == 'Tax'){
                                var source = {
                                    datatype: "json",
                                    datafields: [
                                        { name: 'Unique', 		type: 'number' },
                                        { name: 'TaxID', 		type: 'number' },
                                        { name: 'Code', 		type: 'string' },
                                        { name: 'Rate', 		type: 'number' },
                                        { name: 'Description', 	type: 'string' },
                                        { name: 'Basis', 		type: 'string' },
                                        { name: 'Default', 		type: 'string' },
                                    ],
                                    localdata	: taxList
                                };
    
                                var dataAdapter = new $.jqx.dataAdapter(source, {
                                    autoBind: true,
                                    beforeLoadComplete: function (records) {
                                        taxCustom = [];
                                        var gdata = new Array();
                                        for (var i = 0; i < records.length; i++) {
                                            var recorddata = records[i];
                                            recorddata.uid = i;
                                            if(recorddata.Default=='1'){
    
                                                ss.push(recorddata.uid);
                                                taxDefault = recorddata.uid;
                                                recorddata.checked = true;
                                                taxCustom.push(recorddata);
    
                                                $.each(ss, function (index2, value2) {
                                                    $("#matrix_item_"+value.Field).jqxGrid('selectrow', parseInt(value2));
                                                });
                                            }
                                            gdata.push(recorddata);
                                        }
                                        return gdata;
                                    }
                                });
    
                                $("#matrix_item_"+value.Field).jqxGrid({
                                    width	        : '100%',
                                    height	        : '431',
                                    theme			: Gtheme,
                                    scrollbarsize 	: GScrollBarSize,
                                    source			: dataAdapter,
                                    columnsresize	: true,
                                    altrows			: true,
                                    sortable		: true,
                                    pageable		: false,
                                    pagermode		: 'default',
                                    showaggregates	: false,
                                    showstatusbar	: false,
                                    statusbarheight	: 5,
                                    enabletooltips	: true,
                                    showfilterrow	: false,
                                    filterable		: false,
                                    selectionmode	: 'checkbox',
                                    autoshowloadelement: false,
                                    columns	: [
                                        { text: 'ID', dataField: 'Unique', width: '5%', align: 'left',filtertype: 'input', cellsalign: 'left', hidden:false},
                                        { text: 'TaxID', dataField: 'TaxID', width: '10%', align: 'left', filtertype: 'checkedlist', cellsalign: 'left', hidden:false },
                                        { text: 'Code', dataField: 'Code', width: '10%', align: 'left',filtertype: 'input', cellsalign: 'left' },
                                        { text: 'Description', dataField: 'Description', width: '45%', align: 'left',filtertype: 'input',cellsalign: 'left' },
                                        { text: 'Rate', dataField:'Rate', width: '10%', align: 'left',filtertype: 'number', cellsalign: 'left',cellsformat: 'd<?=$DecimalsTax?>' },
                                        { text: 'Basis', dataField: 'Basis', width: '10%', filtertype: 'input',align: 'left',cellsalign: 'left' },
                                        { text: 'Default', dataField: 'Default', width: '15%', filtertype: 'input',align: 'left',cellsalign: 'left', hidden:true  }
                                    ]
                                });
    
                                $("#matrix_item_"+value.Field).on('rowselect', function(event){
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
    
                                    $("#matrix_save_data").prop('disabled', false);
                                    MatrixChangeTax = true;
                                })

                                $("#matrix_item_"+value.Field).on('rowunselect', function(event){
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
   
                                   $("#matrix_save_data").prop('disabled', false);
                                   MatrixChangeTax = true;
                               })
                            }
                        }

                        if(value.Required == 1){
                            if(value.Control == 'numeric'){
                                validate.push(
                                    {
                                        input: '#matrix_item_'+value.Field, 
                                        message : value.Label + ' is required', 
                                        action: 'keyup, valuechanged, blur', 
                                        rule: function (input) {
                                            var numeric = $("#matrix_item_"+value.Field).val();
                                            if (numeric > 0)
                                                return true;
                                            else
                                                return false;
                                        }
                                    }
                                )
                            }else if(value.Control == 'datalist'){
                                validate.push(
                                    {
                                        input: '#matrix_item_'+value.Field, 
                                        message: value.Label+' Required field', 
                                        action:"keyup, valuechanged, blur",
                                        rule: function(input){
                                            var dropdown = $("#matrix_item_"+value.Field).val();
                                            var dropdownIndex = $("#matrix_item_"+value.Field).jqxComboBox('getItemByValue', dropdown);
                                            
                                            if(dropdown == '' || dropdown == null || dropdownIndex == undefined){
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        } 
                                    }
                                )
                            }else{
                                validate.push(
                                    {
                                        input: '#matrix_item_'+value.Field, 
                                        message : value.Label + ' is required', 
                                        action: 'keyup, valuechanged, blur', 
                                        rule: 'required' 
                                    }
                                )
                            }
                        }else{ //not required but validating value
                            if(value.Control == 'datalist'){
                                validate.push(
                                    {
                                        input: '#matrix_item_'+value.Field, 
                                        message: value.Label+' invalid value', 
                                        action:"keyup, valuechanged, blur",
                                        rule: function(input){
                                            var dropdown = $("#matrix_item_"+value.Field).val();
                                            var dropdownIndex = $("#matrix_item_"+value.Field).jqxComboBox('getItemByValue', dropdown);
                                            
                                            if(dropdown != '' && dropdownIndex == undefined){
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        } 
                                    }
                                )
                            }
                        }
                    })

                    var UseHeight = $("#fakeheight").height() - 120;
                    var UseWidth = $("#jqxgrid").width();
        
                    $("#MatrixItemWindow").jqxWindow({
                        width: UseWidth+'%',
                        height: UseHeight+'%',
                        isModal: true,
                        title: 'Item Matrix',
                        theme: 'darkblue',
                        showCloseButton: false,
                        resizable: false,
                        draggable: false,
                        showAnimationDuration: 0,
                        closeAnimationDuration: 0
                    })
            
                    $("#matrix_item_form_close").on('click', function(e){
                        e.preventDefault();
                        if( $("#matrix_save_data").is(":disabled") == false ){
                            MatrixWindowMessage('matrix_save_data_confirmation', 'Question', 'Do you want to save changes?', 'YesNoCancel');
                            MatrixClickCloseForm = true;
                            return false;
                        }
                        $("#MatrixItemWindow").jqxWindow('close');
                    })

                    setTimeout(function(){
                        setTimeout(function(){
                            var tablength = $("#matrix_item_tab").jqxTabs('length');
                            tablength = tablength - 1;                 
                            // for(var i=0; i <= tablength; i++){
                            //     $("#matrix_item_tab").jqxTabs('select', i);
                            // }
                            
                            if( MatrixClickEdit == false){
                                $("#matrix_item_tab").jqxTabs('select', 0);
                            }

                        },100)
                        
                        $("#MatrixItemWindow").jqxWindow('open');
                        
                        // Closing Matrix Window event
                        $("#MatrixItemWindow").on('close', function(){
                            $("#matrix_item_tab").jqxTabs('destroy');
                            $("#MatrixItemWindow").remove();
                            MatrixInfoChange = [];
                            MatrixItemStyleColumns = [];
                            MatrixItemStyleTypes = [];
                            MatrixColumnGroupName = '';
                            MatrixDataStore = [];
                            MatrixCellSelectedRowIndex;
                            MatrixGridData = [];
                            MatrixGlobalAttribute = [];
                            MatrixNewColumnChange = [];
                            MatrixCustom1arr = [];
                            MatrixClickEdit = false;
                            MatrixClickClone = false;
                            MatrixClickNewItem = false;
                            MatrixClickCloseForm = false;
                            MatrixClickDelete = false;
                            MatrixItemPrintLabelStyleColumns = [];
                            MatrixBarcodeLabelGrid = [];
                            MatrixNewData = [];
                            MatrixColumnData = [];
                            MatrixBarcodeLabelColumnData = [];
                            MatrixAddedColumn = 0;
                            $("#showItemStyleForm").removeClass('matrix_item_style_form_clicked');
                            $("#showItemStyleEditForm").removeClass('matrix_item_style_edit_form_clicked');
                        })
                    },100)

                    // Save button
                    $("#matrix_save_data").on('click', function(e){
                        e.preventDefault();
                        $("#matrix_save_data").prop('disabled', true);
                        $('#matrix_form_validation').jqxValidator('validate');
                    })  

                    // Validation
                    $('#matrix_form_validation').jqxValidator({
                        hintType: "label",
                        rules: validate
                    })

                    // Validated error
                    $("#matrix_form_validation").on('validationError', function(){
                        $("#matrix_save_data").prop('disabled', false);
                    })
                    // Validated successful
                    $("#matrix_form_validation").on('validationSuccess', function(event){
                        var rows = $('#matrix_grid_attributes').jqxGrid('getrows');
                        // return;

                        var rowtaxselectedindexs = $("#matrix_item_Tax").jqxGrid('getselectedrowindexes');
                        var rowtaxselected = [];
                        if (rowtaxselectedindexs.length > 0) {
                            for(var i=0; i < rowtaxselectedindexs.length; i++){
                                var selectedRowData = $('#matrix_item_Tax').jqxGrid('getrowdata', rowtaxselectedindexs[i]);
                                rowtaxselected.push(selectedRowData);
                            }
                        }

                        var field = [];
                        var counter = 0;
                        var ColumnCount = 0;
                        var column = '';
                        var myObj = [];
                        var myObj2 = [];
                        var result = [];
                        for (var i = 0; i < rows.length; i++) {
                            var arrKey = Object.keys(rows[i]);
                            
                            for(c = 0; c < arrKey.length; c++){
                                if($("#matrix_grid_attributes").jqxGrid("getcolumn", arrKey[c]) != null){
                                
                                    column = $("#matrix_grid_attributes").jqxGrid("getcolumn", arrKey[c]).text;
                                   
                                    //Sample format before to parse <a class="attribute_title" id="Label" style="cursor: pointer;">Red</a>
                                    var regex = /(<([^>]+)>)/ig,
                                    body = column,
                                    column = body.replace(regex, "");
                                    column = column.replace('...', '');
                                    
                                    //-->Set data by row as JSON format
                                    var jkey = JSON.stringify(rows[i]);
                                    //-->Parse JSON data from JSON format by row
                                    jkey = JSON.parse(jkey);
                                    //-->Set a variable to get actual field name
                                    field = arrKey[c];
                                    //-->Get Column Index
                                    
                                    MatrixNewColumnChange.push({[arrKey[c]] : column});

                                    //-->Create an array pattern
                                    if(c == 0){ //Primary Column or Custom1
                                        myObj = {
                                            [column] : jkey[field]
                                        }
                                    }else{ //Other Column(s) or Custom2_1, Custom2_2 ...
                                        myObj2 = {
                                            ["x_!"+column] : jkey[field]
                                        }
                                        result[counter] = extend(myObj, myObj2);
                                    }
                                    ColumnCount++;
                                }
                            }
                            counter++;
                            ColumnCount = 0;
                        }
                        
                        console.log(result);
                        // return;

                        var postdata ="gridData="+JSON.stringify(result);
                            postdata+="&Tax="+JSON.stringify(rowtaxselected);

                            $.each(fieldsArr, function(index, value){
                                
                                if(value.Field != 'Tax'){
                                    if(value.Control == 'numeric'){
                                        postdata+="&"+value.Field + "=" + ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : 0);

                                        MatrixItemData.push({ [value.Field] : ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : 0) });

                                    }else if(value.Control == 'datalist'){
                                        postdata+="&"+value.Field + "=" + ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : '');

                                        MatrixItemData.push({ [value.Field] : ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : '') });

                                        if(value.Field == 'SupplierUnique'){
                                            MatrixItemData.push({"Supplier" : ( $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem') ? $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem').label : '') });
                                        }

                                        if(value.Field == 'MainCategory'){
                                            MatrixItemData.push({"MainCategoryName" : ( $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem') ? $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem').label : '') });
                                        }

                                        if(value.Field == 'SubCategoryUnique'){
                                            MatrixItemData.push({"SubCategoryName" : ( $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem') ? $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem').label : '') });

                                        }

                                        if(value.Field == 'AccountCode'){
                                            MatrixItemData.push({"LedgerAccount" : ( $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem') ? $("#matrix_item_"+value.Field).jqxComboBox('getSelectedItem').label : '') });
                                        }

                                    }else{
                                        postdata+="&"+value.Field + "=" + ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : '');

                                        MatrixItemData.push({ [value.Field] : ($("#matrix_item_"+value.Field).val() ? $("#matrix_item_"+value.Field).val() : '') });
                                    }
                                }

                            })
                            
                           
                        if( $("#on_item_modification").length == 0){
            
                            $.ajax({
                                url: base_url + 'backoffice/itemstyle/save-data',
                                dataType: 'json',
                                data: postdata,
                                type: 'POST',
                                success: function (data, status, xhr) {
                                    if(data.success){
                                        MatrixWindowMessage('matrix_save_data_message', data.notification, data.message, 'OK');
                                        $("#MatrixItemWindow").jqxWindow({
                                            title: 'Item Matrix ' + data.MatrixUnique + '| Item ID: '+data.ItemUnique + '<input type="hidden" id="on_item_modification" value="'+data.ItemUnique+'"/>'
                                        })
        
                                        $(".matrix_function_after_save").show();
                        
                                        $("#MatrixItemWindow").append(
                                            '<div id="matrix_item_additional_reference">'+
                                                '<input type="hidden" id="matrix_item_ItemUnique" value="'+data.ItemUnique+'" />'+
                                                '<input type="hidden" id="matrix_item_ParentUnique" value="'+data.MatrixParentUnique+'"/>'+
                                                '<input type="hidden" id="matrix_item_DescriptionReference" value="'+data.MatrixItemDescription+'" />'+
                                            '</div>'
                                        );

                                        if($("#matrix_item_Item").val() == ''){
                                            $("#matrix_item_Item").val(data.Item);
                                        }
                                    }else{
                                        MatrixWindowMessage('matrix_save_data_failed', data.notification, data.message, 'Close');
                                    }
                                },
                                complete: function(xhr, textStatus){
                                    if(xhr.responseJSON.success){
                                        MatrixItemData = [];
                                        var Item = xhr.responseJSON.MatrixItemDescription;
                                        
                                        MatrixLoadAttributes(xhr.responseJSON.ItemUnique);
                                        MatrixNewItemSave(Item);
                                        $("#matrix_item_Templates").jqxComboBox({disabled : true});
                                        MatrixInfoChange = [];
                                        MatrixCustom1arr = [];
                                        MatrixNewColumnChange = [];
                                        MatrixClickEdit = true;
                                        MatrixClickClone = false;
                                       
                                        $("#matrix_grid_attributes").jqxGrid({
                                            editable: true,
                                        })

                                        $("#matrix_save_data").attr("disabled", true);
                                    }
                                }
                            })
                        }else{
                            
                            var MatrixParentUnique = $("#matrix_item_ParentUnique").val();

                            postdata+="&ParentUnique="+ MatrixParentUnique;
                            postdata+="&ItemUnique="+$("#matrix_item_ItemUnique").val();
                            postdata+="&gridData="+JSON.stringify(MatrixGridData);
                            postdata+="&MatrixChange="+JSON.stringify(MatrixInfoChange);
                            postdata+="&gridDataCustomLabel="+JSON.stringify(MatrixCustom1arr);
                            postdata+="&ColumnChange="+JSON.stringify(MatrixNewColumnChange);
                            
                            $.ajax({
                                url: base_url + 'backoffice/itemstyle/update-data',
                                dataType: 'json',
                                data: postdata,
                                type: 'POST',
                                beforeSend: function(){

                                },
                                success: function(data){
                                    if(data.success){
                                        MatrixWindowMessage('matrix_save_data_message', data.notification, data.message, 'OK');
                                        $(".matrix_function_after_save").show();
                                        $("#matrix_save_data").attr("disabled", true);
                                        var MatrixItemDescription = data.MatrixItemDescription;
                                        MatrixLoadAttributes(data.ItemUnique);
                                        MatrixGridUpdate(MatrixItemDescription);
                                        if(MatrixBarcodeShowWindow){
                                            MatrixPrintLabel();
                                            MatrixBarcodeShowWindow = false;
                                        }

                                        MatrixInfoChange = [];
                                        MatrixCustom1arr = [];
                                        MatrixNewColumnChange = [];
                                    }else{
                                        MatrixWindowMessage('matrix_save_data_failed', data.notification, data.message, 'Close');
                                    }
                                }
                            })
                        }

                    })

                    $("#matrix_add_column").on('click', function(e){
                        e.preventDefault();
                        addAttribute('matrix_save_attribute');
                    })
                    
                    $("#matrix_add_row").on('click', function(e){
                        e.preventDefault();
                        MatrixAddNewRow();
                    })
                    
                    $("#matrix_item_Description").on('keyup', function(){
                        var val = $(this).val();
                        $("#matrix_item_DescriptionShort").val( val );
                        $("#matrix_item_DescriptionLong").val( val );
                    })

                },100)
            },
            complete: function(){
                def.resolve();
            }
        })
        return def.promise();
    }

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    var matrix_form_edit = (rowdata) => {
        $.each(MatrixAttributes, function(index, value){
            var Field = value.Field;
            Field = Field.replace("_", "");
        
            if(value.Control == 'grid'){
                // grid data here
                var MatrixItemUniqueReference = (typeof rowdata.ItemUnique !== 'undefined' ? rowdata.ItemUnique : rowdata.ID);
                MatrixGetItemTax(MatrixItemUniqueReference)
                .then(function(result){
                    var MatrixTaxSelected = result.Tax; 
                   
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique', 		type: 'number' },
                            { name: 'TaxID', 		type: 'number' },
                            { name: 'Code', 		type: 'string' },
                            { name: 'Rate', 		type: 'number' },
                            { name: 'Description', 	type: 'string' },
                            { name: 'Basis', 		type: 'string' },
                            { name: 'Default', 		type: 'string' },
                        ],
                        localdata	: taxList
                    };
    
                    var dataAdapter = new $.jqx.dataAdapter(source, {
                        beforeLoadComplete: function (records) {
                            // $("#matrix_item_Tax").jqxGrid('clearselection');
                            $.each(records, function(ind, val){
                                for(var i=0; i < MatrixTaxSelected.length; i++){
                                    if(val.Unique == MatrixTaxSelected[i]){
                                        $("#matrix_item_"+value.Field).jqxGrid('selectrow', val.uid);
                                    }
                                }
                            })
                        }
                    });

                    $("#matrix_item_"+value.Field).jqxGrid({
                        source: dataAdapter
                    })

                    // Load attributes data
                    $("#MatrixItemWindow").jqxWindow({
                        title: 'Item Matrix ' + rowdata.ConfigMatrixUnique + '| Item ID: '+ MatrixItemUniqueReference + '<input type="hidden" id="on_item_modification" value="'+MatrixItemUniqueReference+' '+rowdata.Description+'"/>'
                    })
                
                    $("#MatrixItemWindow").append(
                        '<div id="matrix_item_additional_reference">'+
                            '<input type="hidden" id="matrix_item_ItemUnique" value="'+MatrixItemUniqueReference+'" />'+
                            '<input type="hidden" id="matrix_item_ParentUnique" value="'+rowdata.ParentUnique+'"/>'+
                            '<input type="hidden" id="matrix_item_DescriptionReference" value="'+rowdata.Description+'" />'+
                        '</div>'
                    );

                    $(".matrix_function_after_save").show();
                    $("#matrix_save_data").attr("disabled", true);
                    MatrixInfoChange = [];
                    MatrixLoadAttributes(MatrixItemUniqueReference);
                })
            

            }else if(value.Control == 'checkbox'){
                var matrix_checkbox_val = (rowdata.CanDiscount == 1 ? true : false);
                $('#matrix_item_'+value.Field).jqxCheckBox({ checked: matrix_checkbox_val }); 
                
            }else{
                if(value.Field == 'Location'){

                    $("#matrix_item_"+value.Field).on('select', function(event){
                        if(event.args) {
                            var item = args.item;
                            var value = item.value;
                            curLocation = value;
                            var postdata ="ItemUnique="+rowdata.ID;
                                postdata+="&Location="+ value;
                            $.ajax({
                                dataType: 'json',
                                url: base_url + 'backoffice/item/style/template/id',
                                type: 'POST',
                                data: postdata,
                                success: function(data){
                                   
                                    var newdata = data.Attribute;

                                    for(var i=0; i < newdata.length; i++){
                                        $("#matrix_grid_attributes").jqxGrid('setcellvalue', newdata[i].MatrixRow, newdata[i].MatrixItem, newdata[i].Quantity);
                                        $("#matrix_grid_attributes").jqxGrid('setcellvalue', newdata[i].MatrixRow, "Custom1", newdata[i].Custom1);
                                    }
                                }	
                            })
                        }
                    })

                }else if(value.Field == 'Templates'){
                    var matrix_datalist_val = rowdata.ConfigMatrixUnique;
                    $('#matrix_item_'+value.Field).jqxComboBox('val', matrix_datalist_val);
                }else{

                    if(rowdata[capitalize(Field)]){ //Only filled when has a value.
                        $("#matrix_item_"+value.Field).val(rowdata[capitalize(Field)]);
                    
                    }
                }

            }
        })

        $("#matrix_item_tab").jqxTabs('select', 0);
    }

    var column_added_unique = 0;

    var addAttribute = (form) => {
        var def = $.Deferred();
        $('body').append(
            '<div id="matrix_grid_column" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="item_grid_form_column_container">'+
                    '<form id="'+form+'">'+
                        '<p id="matrix_attribute_label_name">Attribute Name: </p>'+
                        '<br>'+
                        '<input id="matrix_attribute_name" type="text" />'+
                        '<br><br>'+
                        '<button type="submit" id="add_attr" class="btn btn-primary">Add</button>&nbsp;'+
                        '<button type="button" id="matrix_close_attribute" class="btn btn-danger">Close</button>'+
                    '</form>'+
                '</div>'+
            '</div>'
        )

        $("#matrix_grid_column").jqxWindow({
            height: 240,
            width: 300,
            title: 'Attribute',
            isModal: true,
            theme: 'darkblue',
            showCloseButton: false,
            resizable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        });
        
        $('#matrix_grid_column').jqxWindow('open');

        $("#matrix_close_attribute").on('click', function(){
            $('#matrix_grid_column').jqxWindow('close');
        })

        $('#matrix_save_attribute').on('submit', function(e){
            e.preventDefault();
            var count = $("#matrix_grid_attributes").jqxGrid('columns').records.length;
            column_added_unique = count;
            MatrixAddedColumn = 1;
            var textname = $("#matrix_attribute_name").val();

            MatrixItemStyleColumns.push({text: '<a class="matrix_grid_attributes" id="Custom2_'+column_added_unique+'">'+textname+'</a>', columngroup: MatrixColumnGroupName, datafield: 'Custom2_'+column_added_unique, width: '8%', cellsalign: 'center', cellsformat: "", align: 'center', columntype: 'numberinput',
                createeditor: function (row, cellvalue, editor, cellText, width, height) {
                    editor.jqxNumberInput({ digits: 8, value: 0, spinButtons: false});
                }
            });

            $("#matrix_grid_attributes").jqxGrid({
                columns: MatrixItemStyleColumns,
                editable: true,
                columngroups:[
                    { text: MatrixColumnGroupName+' ->', align: 'center', name: MatrixColumnGroupName },
                ] 
            })

            $('#matrix_grid_column').jqxWindow('close');
            $("#matrix_save_data").prop('disabled', false);
        })
        
        setTimeout(function(){
            $("#matrix_attribute_name").focus();
            $('#matrix_grid_column').on('close', function(){
                $('#matrix_grid_column').remove();
            })
            def.resolve();
        },100);

        return def.promise();
    }

    var MatrixAddNewRow = () => {
        $('body').append(
            '<div id="matrix_grid_row" style="display:none;">'+
                '<div id="item_grid_form_row_container">'+
                    '<form>'+
                        '<p>Size Name:</p>'+
                        '<br>'+
                        '<input id="matrix_size_name" type="text" />'+
                        '<br><br>'+
                        '<button type="submit" id="matrix_save_size" class="btn btn-primary">Add</button>&nbsp;'+
                        '<button type="button" id="matrix_close_size" class="btn btn-danger">Close</button>'+
                    '</form>'+
                '</div>'+
            '</div>'
        );

        $("#matrix_grid_row").jqxWindow({
            height: 240,
            width: 300,
            title: 'Size',
            isModal: true,
            theme: 'darkblue',
            showCloseButton: false,
            resizable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        });

        $('#matrix_grid_row').jqxWindow('open');

        $("#matrix_save_size").on('click', function(e){
            e.preventDefault();
            var textname = $("#matrix_size_name").val();
            var datarow = generaterow(textname);
            var commit = $("#matrix_grid_attributes").jqxGrid('addrow', null, datarow);
        
            $("#matrix_size_name").val('');
            $("#matrix_save_data").prop("disabled", false);
            $('#matrix_grid_row').jqxWindow('close');
        })

        $("#matrix_close_size").on('click', function(e){
            e.preventDefault();
            $('#matrix_grid_row').jqxWindow('close');
        })

        setTimeout(function(){
            $("#matrix_size_name").focus();
            $("#matrix_grid_row").on('close', function(){
                $("#matrix_grid_row").remove();
            })
        },100)
    }

    function extend(obj, src) {
        Object.keys(src).forEach(function(key) {
            obj[key] = src[key];
        });
        return obj;
    }

    var generaterow = function (i) {
        var row = {};
        row["Custom1"] = i;
        return row;
    }

    $("#showItemStyleForm").on('click', function(){
        if($(".matrix_item_style_form_clicked").length > 0){
            return;
        }

        $(this).addClass('matrix_item_style_form_clicked');
        MatrixClickEdit = false;
        MatrixNewForm = true;
        matrix_item_form()
        .then(function(){
            setTimeout(function(){
                $("#matrix_grid_attributes").jqxGrid({
                    editable: true
                })
            },1000)
        })
    })

    $("#showItemStyleEditForm").on('click', function(){
        if($(".matrix_item_style_edit_form_clicked").length > 0){
            return;
        }

        $(this).addClass('matrix_item_style_edit_form_clicked');

        var data = MatrixOpenEditForm();
        MatrixClickEdit = true;
        if(data != false){
            if(data.ConfigMatrixUnique){
                matrix_item_form() //the form has already created here
                .then(function(){
                    MatrixNewForm = false;
                    setTimeout(function(){ //delay to display of result data
                        matrix_form_edit(data);
                    },1500)
                })
            }else{
                if(data.Module){
                    $(this).removeClass('matrix_item_style_edit_form_clicked');
                    return;
                }

                var msg = data.Description + " is not a matrix item<br>";
                    msg+= "Please select a matrix item."
                MatrixWindowMessage('not_matrix_item', 'Info', msg, 'OK');
            }

        }else{
            var msg = 'Please select Item first';
            MatrixWindowMessage('not_matrix_item', 'Info', msg, 'OK');
        }
    })

    var ColumnID = '';
    $(document).on('click', '.matrix_grid_attributes', function(e){
        e.preventDefault();
        var cell = $('#matrix_grid_attributes').jqxGrid('getcellatposition');
        $('#matrix_grid_attributes').jqxGrid('endcelledit', MatrixCellSelectedRowIndex, cell.column, false);
        var getId = $(this).attr('id');
        var txtString = $(this).text();
        ColumnID = getId;    
        column_added_unique = MatrixCellSelectedRowIndex;

        addAttribute('matrix_edit_attribute')
        .then(function(){
            $("#matrix_attribute_label_name").text("Edit Attribute");
            $("#add_attr").text('Save');
            $("#matrix_attribute_name").val(txtString);
            $("#matrix_attribute_name").focus();
            $("#matrix_attribute_name").select();
        })
    })

    $(document).on('submit', '#matrix_edit_attribute', function(e){
        e.preventDefault();
        var newColumn = $("#matrix_attribute_name").val();

        var newTitle = '<a class="matrix_grid_attributes" id="'+ColumnID+'">'+(newColumn ? newColumn : '...')+'</a>';
        $("#matrix_grid_attributes").jqxGrid('setcolumnproperty', ColumnID, 'text', newTitle);
        $("#matrix_save_data").prop('disabled', false);
        $('#matrix_grid_column').jqxWindow('close');
    })

    var MatrixWindowMessage = (form, strTitle, msg, state) => {
        var def = $.Deferred();
        var stateButton = '';
        if(state == 'OK'){
            stateButton = '<button type="submit" id="matrix_window_message_button1" class="btn btn-primary">Ok</button>';
        }else if(state == 'OKCancel'){
            stateButton = '<button type="submit" id="matrix_window_message_button1" class="btn btn-primary">Ok</button>&nbsp;';
            stateButton+= '<button type="button" id="matrix_window_message_button2" class="btn btn-warning">Camcel</button>';
        }else if(state == 'OKClose'){
            stateButton = '<button type="submit" id="matrix_window_message_button1" class="btn btn-primary">Ok</button>&nbsp;';
            stateButton+= '<button type="button" id="matrix_window_message_button2" class="btn btn-danger">Close</button>&nbsp;';
        }else if(state == 'YesNo'){
            stateButton = '<button type="submit" id="matrix_window_message_button1" class="btn btn-primary">Yes</button>&nbsp;';
            stateButton+= '<button type="button" id="matrix_window_message_button2" class="btn btn-danger">No</button>&nbsp;';
        }else if(state == 'YesNoCancel'){
            stateButton = '<button type="submit" id="matrix_window_message_button1" class="btn btn-primary">Yes</button>&nbsp;';
            stateButton+= '<button type="button" id="matrix_window_message_button2" class="btn btn-danger">No</button>&nbsp;';
            stateButton+= '<button type="button" id="matrix_window_message_button3" class="btn btn-warning">Cancel</button>&nbsp;';
        }else if(state == 'Close'){
            stateButton = '<button type="click" id="matrix_window_message_button2" class="btn btn-danger">Close</button>&nbsp;';
        }else{
            stateButton = '<button type="button" id="matrix_window_message_button2" class="btn btn-danger">Close</button>&nbsp;';
        }

        $('body').append(
            '<div id="matrix_window_message" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="matrix_window_message_container" style="background: #144766; color:#EEE;">'+
                    '<form id="'+form+'">'+
                        '<p style="font-size: 16px;">'+msg+'</p>'+
                        '<div style="position: absolute; bottom: 0; padding: 10px; text-align: right;">'+
                            stateButton+
                        '</div>'+
                    '</form>'+
                '</div>'+
            '</div>'
        );

        $("#matrix_window_message").jqxWindow({
            height: 245,
            minWidth: 350,
            isModal: true,
            theme: 'darkblue',
            title: strTitle,
            showCloseButton: false,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })

        $("#matrix_window_message").jqxWindow('open');

        setTimeout(function(){

            $("#matrix_window_message").on('close', function(e){
                e.preventDefault();
                $("#showItemStyleEditForm").removeClass('matrix_item_style_edit_form_clicked');
                $("#matrix_window_message").remove();
            })

            $("#matrix_window_message_button1").focus();

            def.resolve();
        },100)

        return def.promise();
    }

    $(document).on('submit', '#matrix_save_data_message', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        if(MatrixClickClone){
            MatrixWindowMessage('matrix_clone_item_new', 'Question', 'Are you sure you want to clone ID ' + $("#on_item_modification").val(), 'YesNo');
        }

        if(MatrixClickNewItem){
            CreateNewMatrixItem();
        }

        if(MatrixClickCloseForm){
            $("#MatrixItemWindow").jqxWindow('close');
        }

        if(MatrixClickDelete){
            var matrix_item_DescriptionReferecent = $("#matrix_item_DescriptionReference").val();
            MatrixWindowMessage('matrix_delete_item_confirmation', 'Delete Item', 'Are you sure do you want to delete '+matrix_item_DescriptionReferecent+'?', 'YesNo');
        }
    })


    /**
     * Close with changes functions
     * 1
     */
    $(document).on('submit', '#matrix_save_data_confirmation', function(e){
        e.preventDefault();
        $('#matrix_form_validation').jqxValidator('validate');
        $("#matrix_window_message").jqxWindow('close');
    })
    /**
     * Close with changes functions
     * 2
     */
    $(document).on('click', '#matrix_save_data_confirmation #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        $("#MatrixItemWindow").jqxWindow('close');
    })
    /**
     * Close with changes functions
     * 3
     */
    $(document).on('click', '#matrix_save_data_confirmation #matrix_window_message_button3', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
    })

    /**
     * Delete item with confirmation
     */
    $(document).on('click', '#matrix_item_form_delete', function(e){
        e.preventDefault();
        if( $("#matrix_save_data").is(":disabled") == false ){
            $('#matrix_form_validation').jqxValidator('validate');
            // MatrixWindowMessage('matrix_clone_item_save_changes', 'Question', 'Changes detected, do you want to save your changes first?', 'YesNoCancel');
            // MatrixClickDelete = true;
            // return;
        }

        var matrix_item_DescriptionReferecent = $("#matrix_item_DescriptionReference").val();
        MatrixWindowMessage('matrix_delete_item_confirmation', 'Delete Item', 'Are you sure do you want to delete '+matrix_item_DescriptionReferecent+'?', 'YesNo');
    })

    // Delete Matrix Item Yes
    $(document).on('submit', '#matrix_delete_item_confirmation', function(e){
        e.preventDefault();

        $("#matrix_window_message").jqxWindow('close');

        var matrix_item_ParentUnique = $("#matrix_item_ParentUnique").val();
        var matrix_item_DescriptionReference = $("#matrix_item_DescriptionReference").val();
        var postdata ="ParentUnique="+matrix_item_ParentUnique;
            postdata+="&Description="+matrix_item_DescriptionReference;
        
        $.ajax({
            url: base_url + 'backoffice/itemstyle/delete-item',
            method: 'post',
            dataType: 'json',
            data: postdata,
            beforeSend: function(){

            },
            success: function(data){
                if(data.success){
                    MatrixCallFunctionAfterDelete(MatrixNewData);
                    $("#MatrixItemWindow").jqxWindow('close');
                }else{
                    MatrixWindowMessage('matrix_delete_item_failed', data.notification, data.msg, 'Close');
                }
            }
        })
    })

    // Delete Matrix Item No
    $(document).on('click', '#matrix_delete_item_confirmation #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        MatrixClickDelete = false;
    })
    // Delete matrix item failed
    $(document).on('click', '#matrix_delete_item_failed #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
    })

    // Saving data failed close button
    $(document).on('submit', '#matrix_save_data_failed', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
    })

    $(document).on('click', '#matrix_add_new', function(){
        if( $("#matrix_save_data").is(":disabled") == false ){
            MatrixWindowMessage('matrix_new_confirmation', 'Question', 'Do you want to save changes?', 'YesNoCancel');
            MatrixClickNewItem = true;
            
            setTimeout(function(){
                $(this).prop('disabled', false);
            },1000)
            return false;
        }

        $("#matrix_item_additional_reference").remove();

        CreateNewMatrixItem();
    })

    $(document).on('submit', '#matrix_new_confirmation', function(e){
        e.preventDefault();
        $('#matrix_form_validation').jqxValidator('validate');
        $("#matrix_window_message").jqxWindow('close');
        setTimeout(function(){
            $("#matrix_item_additional_reference").remove();
        },1000)
    })

    $(document).on('click', '#matrix_new_confirmation #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        CreateNewMatrixItem();  
    })

    $(document).on('click', '#matrix_new_confirmation #matrix_window_message_button3', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        MatrixClickNewItem = false;
    })

    var CreateNewMatrixItem = () => {

        $.each(AllFields, function(index, value){

            if(value.Control == 'datalist'){
                $("#matrix_item_"+value.Field).jqxComboBox({disabled : false});
                $("#matrix_item_"+value.Field).jqxComboBox('clearSelection');

                if(value.Field == 'Templates'){
                    setTimeout(function(){
                        $("#matrix_item_"+value.Field).jqxComboBox('val', DefaultTemplate);
                    },100)
                }else if(value.Field == 'Location'){
                    $("#matrix_item_"+value.Field).val(currentLocation);
                }else if(value.Field == 'AccountCode'){
                    $("#matrix_item_"+value.Field).val(MatrixAccountCodeDefault);
                }else if(value.Field == 'BarcodeLabel'){
                    $("#matrix_item_"+value.Field).val(MatrixBarcodeLabelDefault);
                }

            }else if(value.Control == 'checkbox'){
                var checked = $('#matrix_item_'+value.Field).jqxCheckBox('checked');
                if(!checked){
                    $('#matrix_item_'+value.Field).jqxCheckBox({ checked: true }); 
                } 

            }else if(value.Control == 'grid'){
                // if(MatrixChangeTax == true){
                    // $("#matrix_item_"+value.Field).jqxGrid('unselectrow', 2);
                // }
                
                var source = {
                    datatype: "json",
                    localdata	: taxList
                };

                var dataAdapter = new $.jqx.dataAdapter(source, {
                    autoBind: true,
                    beforeLoadComplete: function (records) {
                        console.log(records);
                        var matrix_grid_unselectrow = [];
                        if(MatrixChangeTax == true){
                            for (var i = 0; i < records.length; i++) {
                                $("#matrix_item_"+value.Field).jqxGrid('unselectrow', i);
                            }
                        }

                        $.each(records, function(ind, val){
                            if(val.Default == 1){
                                $("#matrix_item_"+value.Field).jqxGrid('selectrow', val.uid);
                            }
                        })
                        // taxCustom = [];
                        // var gdata = new Array();
                        // for (var i = 0; i < records.length; i++) {
                        //     var recorddata = records[i];
                        //     recorddata.uid = i;
                        //     if(recorddata.Default=='1'){
                        //         ss.push(recorddata.uid);
                        //         taxDefault = recorddata.uid;
                        //         recorddata.checked = true;
                        //         taxCustom.push(recorddata);

                        //         $.each(ss, function (index2, value2) {
                        //             $("#matrix_item_"+value.Field).jqxGrid('selectrow', parseInt(value2));
                        //         });
                        //     }
                        //     gdata.push(recorddata);
                        // }
                        // return gdata;
                    }
                });

                $("#matrix_item_"+value.Field).jqxGrid({
                    source: dataAdapter
                })

            }else {
                if(value.Field != 'Tax'){
                    if(value.Control == 'numeric'){
                        $("#matrix_item_"+value.Field).val(0);
                    }else{
                        $("#matrix_item_"+value.Field).val('');
                    }
                }
            }
        })

        $("#MatrixItemWindow").jqxWindow({title: 'New Matrix Item'});
        $("#matrix_item_tab").jqxTabs('select', 0);
        MatrixInfoChange = [];
        MatrixGridData = [];
        MatrixClickNewItem = false;
        MatrixNewForm = true;
        MatrixItemPrintLabelStyleColumns = [];
        MatrixBarcodeLabelGrid = [];
        MatrixNewData = [];
        MatrixColumnData = [];
        MatrixBarcodeLabelColumnData = [];
        MatrixDataStore = [];
        MatrixItemPrintLabelStyleColumns = [];
        MatrixItemStyleColumns = [];
        $("#matrix_item_additional_reference").remove();
        
        $(".matrix_function_after_save").hide();
    }

    var MatrixGetItemTax = (itemid) => {
        var def = $.Deferred();
		var postdata = "ItemUnique="+itemid;
		$.ajax({
			url: base_url + 'backoffice/itemstyle/item_tax',
			type: 'post',
			dataType: 'json',
			data: postdata,
			beforeSend: function(){

			},
			success: function(data){
				def.resolve(data);
			}
        })
        return def.promise();
    }
    
    // Attribute data processing
    var MatrixLoadAttributes = (ItemUnique) => {
        var postdata ="ItemUnique="+ItemUnique;
            postdata+="&Location="+$("#matrix_item_Location").val();
        $.ajax({
            dataType: 'json',
            url: base_url + 'backoffice/item/style/template/id',
            type: 'POST',
            data: postdata,
            success: function(data){
                var StoreCustom2 = [];
                var TempStorage = [];
                var StoreCustom3 = []; 
                
                $.each(data.Attribute, function(index, value){
                    
                    if (StoreCustom2.indexOf(value.Custom2)==-1) StoreCustom2.push(value.Custom2);
                    
                    if(TempStorage.indexOf(value.MatrixItem) == -1) {
                        TempStorage.push(value.MatrixItem);

                        StoreCustom3.push(
                            {"Custom2" : value.Custom2, "MatrixItem" : value.MatrixItem, "MatrixRow" : value.MatrixRow}
                        );
                    }
                })

                var isEditable = function (row, column) {
                    var value = $('#matrix_grid_attributes').jqxGrid('getcellvalue', row, column);
                   
                    if (BackOfficeItemStyleMatrixStockAdjust == 0 && value >= 0)
                        return false;
                }

                var colcountMatrixGrid = 1;	
                var newArray = [];
                var lookupObject  = {};
                
                var countAttributeColumns = $("#matrix_grid_attributes").jqxGrid('columns').records.length;

                StoreCustom3 = (countAttributeColumns == StoreCustom3.length ? StoreCustom3 : countAttributeColumns = (MatrixAddedColumn == 0 ? StoreCustom3 : countAttributeColumns) );
                
                for(var i=0; i < StoreCustom3.length; i++){

                    if(StoreCustom3[i].Custom2 == '' || StoreCustom3[i].Custom2 == null){
                        StoreCustom3[i].Custom2 = '...';
                    }

                    if(MatrixItemStyleColumns[colcountMatrixGrid] != undefined && MatrixItemStyleColumns[colcountMatrixGrid].datafield == StoreCustom3[i].MatrixItem){
                        delete MatrixItemStyleColumns[colcountMatrixGrid];
                        delete MatrixItemPrintLabelStyleColumns[colcountMatrixGrid];
                    }

                    MatrixItemStyleColumns.push({text: '<a class="matrix_grid_attributes" id="'+StoreCustom3[i].MatrixItem+'">'+StoreCustom3[i].Custom2+'</a>', cellbeginedit: isEditable, columngroup: MatrixColumnGroupName, datafield: StoreCustom3[i].MatrixItem, width: '20%', cellsalign: 'center', align: 'center', columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor, cellText, width, height) {
                            editor.jqxNumberInput({ digits: 8, value: 0});
                        } 
                    });

                    MatrixItemPrintLabelStyleColumns.push({text: '<a class="matrix_grid_attributes" id="'+StoreCustom3[i].MatrixItem+'">'+StoreCustom3[i].Custom2+'</a>', columngroup: MatrixColumnGroupName, datafield: StoreCustom3[i].MatrixItem, width: '20%', cellsalign: 'center', align: 'center', columntype: 'numberinput',
                        createeditor: function (row, cellvalue, editor, cellText, width, height) {
                            editor.jqxNumberInput({ digits: 8, value: 0});
                        } 
                    });

                    colcountMatrixGrid++;
                }

                MatrixGlobalAttribute = StoreCustom3;
            },
            complete: function(xhr, textStatus){
                MatrixBarcodeLabelGrid = xhr.responseJSON.Attribute;
                MatrixBarcodeLabelColumnData = xhr.responseJSON.NewTemplate;
                MatrixNewData = xhr.responseJSON.Attribute;

                MatrixItemStyleColumns = removeDuplicates(MatrixItemStyleColumns, "datafield");
                MatrixItemPrintLabelStyleColumns = removeDuplicates(MatrixItemPrintLabelStyleColumns, "datafield");
            
                MatrixColumnData = xhr.responseJSON.NewTemplate;
                var source = {
                    dataType: "json",
                    dataFields: MatrixItemStyleTypes[0],
                    localdata: MatrixColumnData
                }
                
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#matrix_grid_attributes").jqxGrid({
                    width: "100%",
                    columnsresize: true,
                    theme: 'darkblue',
                    sortable: false,
                    pageable: false,
                    pagesize: 12,
                    scrollbarsize: 25,
                    pagerMode: 'advance',
                    altRows: true,
                    rowsheight: 40,
                    editable: true,
                    selectionmode: 'multiplecellsadvanced',
                    source: dataAdapter,
                    columns: MatrixItemStyleColumns,
                    columngroups:[
                        { text: MatrixColumnGroupName+' ->', align: 'center', name: MatrixColumnGroupName },
                    ] 
                })

                setTimeout(function(){
                    for(var i=0; i < MatrixNewData.length; i++){
                        $("#matrix_grid_attributes").jqxGrid('setcellvalue', MatrixNewData[i].MatrixRow, MatrixNewData[i].MatrixItem, MatrixNewData[i].Quantity);
                        $("#matrix_grid_attributes").jqxGrid('setcellvalue', MatrixNewData[i].MatrixRow, "Custom1", MatrixNewData[i].Custom1);
                    }
                },100)
            }   
        })   
    }

    $(document).on('submit', '#not_matrix_item', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
    })

    $(document).on('click', '#matrix_item_form_clone', function(){
        if( $("#matrix_save_data").is(":disabled") == false ){
            MatrixWindowMessage('matrix_clone_item_save_changes', 'Question', 'Changes detected, do you want to save your changes first?', 'YesNoCancel');
            MatrixClickClone = true;

        }else{
            MatrixWindowMessage('matrix_clone_item_new', 'Question', 'Are you sure you want to clone ID ' + $("#on_item_modification").val(), 'YesNo');
        }
    })

    $(document).on('submit', '#matrix_clone_item_new', function(e){
        e.preventDefault();
        $("#matrix_item_Templates").jqxComboBox('clearSelection');
        $("#matrix_item_Templates").val(DefaultTemplate);
        $("#matrix_item_Description").val('');
        $("#matrix_item_Item").val('');
        $("#matrix_item_SupplierPart").val('');
        $("#matrix_item_DescriptionShort").val('');
        $("#matrix_item_DescriptionLong").val('');
        $("#matrix_item_Item").focus();
        $("#matrix_item_Location").jqxComboBox({disabled : false});
        var MatrixWindowTitle = $('#MatrixItemWindow').jqxWindow('title');
        $('#MatrixItemWindow').jqxWindow('setTitle', 'Cloning matrix item');
        $("#on_item_modification").remove();
        MatrixGridData = [];
        MatrixClickClone = true;
        $("#matrix_window_message").jqxWindow('close');
        $(".matrix_function_after_save").hide();
        $("#matrix_item_additional_reference").remove();
    })

    $(document).on('click', '#matrix_clone_item_new #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        MatrixClickClone = false;
    })

    $(document).on('submit', '#matrix_clone_item_save_changes', function(e){
        e.preventDefault();
        $('#matrix_form_validation').jqxValidator('validate');
        $("#matrix_window_message").jqxWindow('close');
    })

    $(document).on('click', '#matrix_clone_item_save_changes #matrix_window_message_button2', function(e){
        e.preventDefault();
        $("#matrix_window_message").jqxWindow('close');
        if(MatrixClickClone){
            MatrixWindowMessage('matrix_clone_item_new', 'Question', 'Are you sure you want to clone ID ' + $("#on_item_modification").val(), 'YesNo');
        }

        if(MatrixClickNewItem){
            CreateNewMatrixItem();
        }

        if(MatrixClickCloseForm){
            $("#MatrixItemWindow").jqxWindow('close');
        }

        if(MatrixClickDelete){
            var matrix_item_DescriptionReferecent = $("#matrix_item_DescriptionReference").val();
            MatrixWindowMessage('matrix_delete_item_confirmation', 'Delete Item', 'Are you sure do you want to delete '+matrix_item_DescriptionReferecent+'?', 'YesNo');
        }
        
        MatrixWindowMessage('matrix_clone_item_new', 'Question', 'Are you sure you want to clone ID ' + $("#on_item_modification").val(), 'YesNo');
    })

    $(document).on('click', '#matrix_clone_item_save_changes #matrix_window_message_button3', function(e){
        e.preventDefault();
        MatrixClickClone = false;
        MatrixClickNewItem = false;
        MatrixClickCloseForm = false;
        MatrixClickDelete = false;
        $("#matrix_window_message").jqxWindow('close');
    })

    var MatrixPrintLabel = () => {
        var ReferenceMatrixPrintLabel = [];
        $("body").append(
            '<div id="matrix_print_label_form" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
				'<div id="matrix_print_label_form" style="background: #144766; color: #EEE;">'+
					'<div style="width: 100%; padding: 5px; display: flex;">'+
						'<div id="matrix_print_label_type"></div>&nbsp;&nbsp;'+
						'<button id="matrix_quantity_0" class="btn btn-info">Quantity 0</button>&nbsp;&nbsp;'+
						'<button id="matrix_print_label_new" class="btn btn-primary">Print</button>&nbsp;&nbsp;'+
                        '<button id="matrix_cancel_print_label" class="btn btn-danger">Close</button>'+
                        '<input type="hidden" value="0" id="matrixskipNumberofLabels"/>'+
					'</div>'+
					'<div id="matrix_print_label_grid"></div>'+
				'</div>'+
			'</div>'
        );

        var source = {
			datatype: 'json',
			datafield: [
				{name: 'Unique', type: 'int'},
				{name: 'Value', type: 'string'}
			],
			localdata: MatrixBarcodeLabelList
		}

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#matrix_print_label_type").jqxComboBox({placeHolder: 'Select Type', source: dataAdapter, displayMember: 'Value', valueMember: 'Unique', height: '35px', width: '150px'})
        $("#matrix_print_label_type").val(MatrixBarcodeLabelDefault);

        $("#matrix_cancel_print_label").on('click', function(e){
			e.preventDefault();
			$("#matrix_print_label_form").jqxWindow('close');
        })	

        setTimeout(function(){
            $("#matrix_print_label_form").jqxWindow('open');
            $("#matrix_print_label_form").on('close', function(){
                $("#matrix_print_label_type").jqxComboBox('destroy');
                $("#matrix_print_label_grid").jqxGrid('destroy');
                $("#matrix_print_label_form").remove();
            })
        },100)

        $("#matrix_print_label_form").jqxWindow({
			height: 390,
			minWidth: '70%',
			isModal: true,
			theme: 'darkblue',
			title: 'Print Label',
			showCloseButton: false,
			resizable: false,
			draggable: false,
			showAnimationDuration: 0,
			closeAnimationDuration: 0,
		})

        $("#matrix_print_label_new").on('click', function(e){
            e.preventDefault();
			var params = {};
			var Colcount = $("#matrix_print_label_grid").jqxGrid('columns').records.length;
			Colcount = Colcount - 1;
			var datainformations = $('#matrix_print_label_grid').jqxGrid('getdatainformation');
			var rowscounts = datainformations.rowscount;
			var totalItems = (rowscounts * Colcount);
			var countQty = 0;
			
			for(var i=0; i < ReferenceMatrixPrintLabel.length; i++){
				countQty += (ReferenceMatrixPrintLabel[i].Quantity);
			}
			
			if(countQty == 0){
				var msg = 'Please adjust Quantity by column';
				$("#description-message1").html(msg);
				$('#jqxmsg').jqxWindow('open');
				return false;
			}

			params['selectedPrinter']    = 0;
			params['selectedLabelFormat']= $("#matrix_print_label_type").val();
			params['skipNumberofLabels'] = $("#matrixskipNumberofLabels").val();
			params['numberofItems']		 = totalItems;
			params['numberofLabels']	 = 1;
			params['printCropMarks']	 = 1;
			params['gridContent']		 = JSON.stringify(ReferenceMatrixPrintLabel);

			var resdata = [];

			$.ajax({
				url: base_url + 'backoffice/barcode/print-label',
				type: 'POST',
				dataType: 'json',
				data: params,
				beforeSend: function(){

				},
				success: function(data){
					window.location = base_url + 'barcode/download';
				}
			})
        })

        $("#matrix_quantity_0").on('click', function(e){
			e.preventDefault();
			var Colcount = $("#matrix_print_label_grid").jqxGrid('columns').records.length;
			Colcount = Colcount - 1;
			var PrintQty = $("#matrix_print_label_grid").jqxGrid('getrows');

			for(var i = 0; i < ReferenceMatrixPrintLabel.length; i++){
				$("#matrix_print_label_grid").jqxGrid('setcellvalue', ReferenceMatrixPrintLabel[i].Row, ReferenceMatrixPrintLabel[i].Column, 0);
				ReferenceMatrixPrintLabel[i].Quantity = 0; 
			}
		})

        var source = {
            dataType: "json",
            dataFields: MatrixItemStyleTypes[0],
            localdata: MatrixColumnData
        }
        
        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#matrix_print_label_grid").jqxGrid({
			width: '100%',
			height: 300,
			source: dataAdapter,
			columnsresize: true,
			theme: 'darkblue',
			sortable: false,
			pageable: false,
			pagesize: 12,
			pagerMode: 'advance',
			altRows: true,
			rowsheight: 40,
			editable: true,
			selectionmode: 'multiplecellsadvanced',
			columns: MatrixItemStyleColumns
        })  

        $("#matrix_print_label_grid").on('cellendedit', function(event){
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

			for(var i = 0; i < ReferenceMatrixPrintLabel.length; i++){
				if(ReferenceMatrixPrintLabel[i].Column == dataField && ReferenceMatrixPrintLabel[i].Row == rowBoundIndex){
					ReferenceMatrixPrintLabel[i].Quantity = value
				}
			}

		})
       
        setTimeout(function(){
            for(var i=0; i < MatrixNewData.length; i++){
                ReferenceMatrixPrintLabel.push({"Unique" : MatrixNewData[i].Unique, "Quantity" : MatrixNewData[i].Quantity, "Row" : MatrixNewData[i].MatrixRow, "Column" : MatrixNewData[i].MatrixItem});
                $("#matrix_print_label_grid").jqxGrid('setcellvalue', MatrixNewData[i].MatrixRow, MatrixNewData[i].MatrixItem, MatrixNewData[i].Quantity);
                $("#matrix_print_label_grid").jqxGrid('setcellvalue', MatrixNewData[i].MatrixRow, "Custom1", MatrixNewData[i].Custom1);
            }
        },300)

    }

    var MatrixBarcodeShowWindow = false;
    $(document).on('click', "#matrix_item_form_print_label", function(e){
        e.preventDefault();
        if( $("#matrix_save_data").is(":disabled") == false ){
            $('#matrix_form_validation').jqxValidator('validate');
            MatrixBarcodeShowWindow = true;
            return;
        }

        MatrixPrintLabel();
    })


    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }

        return newArray;
    }
})