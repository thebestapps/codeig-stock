$(function(){
    var AllData = [];
    var ColumnsListData = [];

    var getAllColumns = function(formName){
        var def = $.Deferred();
        var postdata ="Form="+formName;
        $.ajax({
            type: 'POST',
            url: base_url + 'backoffice_inventory/grid/columns',
            dataType: 'json',
            data: postdata,
            success: function(data){
                def.resolve(data);
            }
        })
        return def.promise();
    }

    getAllColumns()
    .then(function(data){
        AllData = data;
        ColumnsListData  = new GridColsField(data);
        CustomerGridDisplay(ColumnsListData);
    })

    $("#call_plugin_columnset").on("click", function(){
        if(ColumnsListData.ColumnChooser[0].length > 0){
            CallColumnChooser('mytest')
            .then(function(){
                WindowPopup();
            })
        }else{
            var msg = "Please select a form first";
            NumpadAlertClose (msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
            });	
        }
    })  

    var WindowPopup = function(){
        WindowPopupForm = $("#Plugin");
        WindowPopupForm.jqxWindow({
            height: 460,
            minWidth: 600,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: true,
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0,
        });
        WindowPopupForm.jqxWindow('setTitle', 'Select columns');
        WindowPopupForm.jqxWindow("open");
    }

    var CallColumnChooser = (form) => {
        var def = $.Deferred();
        setTimeout(function(){
            $("#Plugin").columnset({
                layout  : "akdarkblue",
                src     : ColumnsListData.ColumnChooser,
                limit   : 20,
                theme   : "darkblue",
                setting : true,
                formid  : form
            })
            def.resolve();
        },100);
        return def.promise();
    }

    var CustomerGridDisplay = (data) => {
        var source = {
            datatype: "json",
            datafields: data.Fields,
            localdata: []
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#jqxgrid").jqxGrid({
            width: '100%',
            source: dataAdapter,                
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: true,
            selectionmode: 'multiplecellsadvanced',
            columns: data.Columns
        });
    }

    $(document).on('submit', '#mytest', function(e){
        e.preventDefault();
        let result = []; 
        let resultSave = []; 
        let sortCount = 1;
        if(NewColumnAdded.length > 0){
            var active_columns = $("#colset-selected-list").jqxListBox('getItems'); 
            for(var i=0; i < active_columns.length; i++){
                for(outerkey in AllData){
                    if(AllData[outerkey].Unique == active_columns[i].value){
                        resultSave.push({"Unique" : active_columns[i].value, "Status" : 1, "Sort" : sortCount});
                        result.push(AllData[outerkey]);
                        
                        sortCount++;
                    }
                }
            }

            ColumnsListData  = new GridColsField(result);
            for(var i=0; i < ColumnsListData.Columns.length; i++){
                ColumnsListData.Columns[i].hidden = false;
            }

            $("#jqxgrid").jqxGrid({columns: ColumnsListData.Columns});
            $("#jqxgrid").jqxGrid("render");
        }

        if(RemoveColumn.length > 0){
            var inactive_columns = $("#colset-src-list").jqxListBox('getItems'); 
            let result = [];
            for(var i=0; i < inactive_columns.length; i++){
                for(outerkey in AllData){
                    if(AllData[outerkey].Unique == inactive_columns[i].value){
                        resultSave.push({"Unique" : inactive_columns[i].value, "Status" : 0});
                    }
                }
            }

            reload_grid();
        }

        if(resultSave.length == 0)
        return;

        BackgroundSave(resultSave);
    })

    var reload_grid = function(){
        let result = [];
        var active_columns = $("#colset-selected-list").jqxListBox('getItems'); 
        for(var i=0; i < active_columns.length; i++){
            for(outerkey in AllData){
                if(AllData[outerkey].Unique == active_columns[i].value){
                    result.push(AllData[outerkey]);
                }
            }
        }

        ColumnsListData  = new GridColsField(result);
        for(var i=0; i < ColumnsListData.Columns.length; i++){
            ColumnsListData.Columns[i].hidden = false;
        }

        $("#jqxgrid").jqxGrid({columns: ColumnsListData.Columns});
        $("#jqxgrid").jqxGrid("render");
    }

    $(document).on('click', '#add_all_columns', function(){

        return false;
        let AllCheckedColumns = [];
        var inactive_columns = $("#colset-src-list").jqxListBox('getCheckedItems'); 
        for(var i=0; i < inactive_columns.length; i++){
            if(inactive_columns[i].value != '(Select All)'){
                for(outerkey in AllData){
                    if(AllData[outerkey].Unique == inactive_columns[i].value){
                        AllCheckedColumns.push(AllData[outerkey]);
                    }
                }
            }
        }
        
        ColumnsListData  = new GridColsField(AllCheckedColumns);
        for(var i=0; i < ColumnsListData.Columns.length; i++){
            ColumnsListData.Columns[i].hidden = false;
        }

        $("#jqxgrid").jqxGrid({columns: ColumnsListData.Columns});
        $("#jqxgrid").jqxGrid("render");
    })

    var BackgroundSave = (postdata) => {
        var postdata ="data="+ JSON.stringify(postdata);
        $.ajax({
            url: base_url + 'plugin/attribute/update-data',
            method: 'post',
            datatype: 'json',
            data: postdata,
            success: function(data){
                
            },
            complete: function(){
                NewColumnAdded = [];
                RemoveColumn = [];
            },
            error: function(){

            }
        })
    }

    var source = {
        datatype: "json",
        datafields: [
            { name: "Form" }
        ],
        url: base_url + 'backoffice/config_attribute/forms' 
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#form_list").jqxComboBox({ placeHolder: "Select Item",  source: dataAdapter, displayMember: "Form", valueMember: "Form", height: 30, width: 270})

    // GENERATE BUTTON
    $("#generate_form").on('click', function(){
        var FormName = $("#form_list").val();
        if(FormName){
            getAllColumns(FormName)
            .then(function(data){
                AllData = data;
                ColumnsListData  = new GridColsField(data);
                CustomerGridDisplay(ColumnsListData);
                $("#formSelected").text(FormName);
            })
        }else{
            var msg = "Please select a form first.";
            NumpadAlertClose(msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
            });	
        }
    })

    $('#dialog-numpad-alert').on('close', function(){
        $("#alert-msg-popup").remove();
    })

    var populateNumpadAlertClose = function(msg){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
            $("#alert-msg-popup").html('');
            $("#alert-msg-popup").append(
                '<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
                '<h4>'+msg+'</h4>'+
                '<br/>'+
                '<div style="text-align: right; width: 98%; position: absolute; bottom: 0;"><button id="close_message_window" class="btn btn-warning btn-lg">Close</button></div>'
            );
            def.resolve();
        },500);
        return def.promise();
    }
    var NumpadAlertClose = function(msg){
        var def = $.Deferred();
        populateNumpadAlertClose(msg)
        .then(function(){
            def.resolve();
        });
        return def.promise();
    }

    var WindowPopupAlert = function(header_text){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-numpad-alert").jqxWindow({
                height: 245,
                minWidth: 350,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            $('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
            $('#dialog-numpad-alert').jqxWindow('open');
            $("#close_message_window").focus();
            def.resolve();	
        },100);
        return def.promise();
    }

    $(document).on('click', '#close_message_window', function(){
        $('#dialog-numpad-alert').jqxWindow('close');
    })

    $("#Dashboard").on('click', function(){
        window.location = base_url + 'pos/dashboard';
    })


    // var tagInput1 = new TagsInput({
    //     selector: 'tag-input1',
    //     duplicate : false,
    //     max : 10
    // });

    // tagInput1.addData(['PHP' , 'JavaScript' , 'CSS']);
})