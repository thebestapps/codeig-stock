class GridColsField {
    constructor(data) {
        
        const CustomerDataFields = [];
        const CustomerGridColumns = [];
        const InactiveList = [];
        const ActiveList = [];

        var Hide = false;
        var Editable = false;
        var actualSize = '';
        var FieldName = '';
        $.each(data, function(index, value){
            if(value.Status == 1){
                Hide = false;
            }else{
                Hide = true;
            }

            if(value.Editable == 1){
                Editable = true;
            }else{
                Editable = false;
            }
        
            actualSize = value.Size+'%';
            
            // --> Aggregates
            if(FieldName !== value.Field){
                FieldName = value.Field;
               
                if(value.Aggregate == 1){
                    if(value.FilterType == 'number'){   //--> Number Input
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable, aggregates: [{
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
                                editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false, decimalDigits: 0});
                            }
                        })
                    }else if(value.FilterType == 'checkbox'){ //--> Checkbox
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable, aggregates: [{
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
                            columntype: 'checkbox'
                        })
                    }else{
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable, aggregates: [{
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
                //--> No aggregates
                }else{
                    if(value.FilterType == 'number'){ //-->Number Input
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable,
                            columntype: 'numberinput',
                            createeditor: function (row, cellvalue, editor, cellText, width, height) {
                                editor.jqxNumberInput({ digits: 8, spinMode: 'simple', spinButtons: false, decimalDigits: 0});
                            }  
                        })
                    }else if(value.FilterType == 'checkbox'){ //-->Checkbox 
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable,
                            columntype: 'checkbox'
                        })
                    }else{
                        CustomerGridColumns.push({ text: value.Label, datafield: value.Field, width: actualSize, hidden: Hide, filtertype: value.FilterType, align: value.Align, cellsalign: value.CellsAlign, cellsformat: value.CellsFormat, editable: Editable })
                    }
                }
                
                if(value.Status == 1){
                    ActiveList.push({ "Unique" : value.Unique, "Label" : value.Label });
                }else{
                    InactiveList.push({ "Unique" : value.Unique, "Label" : value.Label });
                }

                CustomerDataFields.push({ name: value.Field, type: value.Control });
            }
        })

        return {
            Fields  : CustomerDataFields,
            Columns : CustomerGridColumns,
            ColumnChooser  : [ActiveList, InactiveList]
        }
    }
}

// class Bill extends Bob {
//     constructor(name) {
//         return super();
//     }
// }