$(function(){
    var body_height = $("body").height();
    
    $("#stock_adjust_search_item_button, #stock_adjust_add_item_button").jqxButton({ template: 'primary', enableHover: false, width: '20%', height: 35 });
    $("#item_search_close").jqxButton({ template: 'danger', enableHover: false, width: '15%', height: 35 });

    $("#item_search_close").on('click', function(e){
        $("#item_search_close").jqxButton({disabled : true});
        $("#stock_details_item_search").css({display : 'none'});
        $("#stock_adjust_details").css({display : 'block'});
        setTimeout(function(){
            $("#item_search_close").jqxButton({disabled : false});
        },1000)
    })

    $("#stock_adjust_add_item_button").on('click', function(e){
        $("#stock_adjust_add_item_button").jqxButton({disabled : true});
        var stock_details_add_row = [];
        var rowindex = $("#stock_adjust_item_search_grid").jqxGrid('getselectedrowindex');
        var rowid = $("#stock_adjust_item_search_grid").jqxGrid('getrowid', rowindex);
        var rowdata = $("#stock_adjust_item_search_grid").jqxGrid('getrowdatabyid', rowid);
        if(rowindex >= 0){
            rowdata["ID"] = rowdata["Unique"];
            rowdata["Quantity"] = 1;
            console.log("ssss",rowdata);
            $("#stock_adjust_details_grid").jqxGrid('addrow', null, rowdata, 'first');
            $("#stock_details_item_search").hide();
            $("#stock_adjust_details").show();
            $("#stock_details_save").jqxButton({disabled : false});
        }else{
            var msg = 'Please select an item';
            AlertMessage('Message', msg, 'default', 0);
        }

        setTimeout(function(){
            $("#stock_adjust_add_item_button").jqxButton({disabled : false});
        },1000)
    })

    window.stock_adjust_item_search_grid = (data = []) => {
        var source = {
            localdata: data.result,
            datatype: "json",
            datafields: [
                { name: 'Unique', type: 'int' },
                { name: 'Item', type: 'string' },
                { name: 'Part', type: 'string' },
                { name: 'Description', type: 'string' }
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        var use_grid_search_height = body_height - 100;
        $("#stock_adjust_item_search_grid").jqxGrid({
            width: '100%',
            height: use_grid_search_height,
            source: dataAdapter,
            theme: theme,
            columnsheight: 40,
            pagesize: 20,
            pageable: true,
            pagermode: 'simple',
            columnsmenuwidth: 40,
            rowsheight: 34,
            columns: [
                // { text: 'Unique', dataField: 'Unique', width: '20%' },
                { text: 'Item', dataField: 'Item', width: '20%' },
                { text: 'Barcode', dataField: 'Part', width: '30%' },
                { text: 'Description', dataField: 'Description', width: '50%' }
            ]
        });
    }
    stock_adjust_item_search_grid();

    $("#stock_adjust_item_search_grid").on('rowdoubleclick', function(event){
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        // row's visible index.
        var visibleIndex = args.visibleindex;
        // right click.
        var rightclick = args.rightclick; 
        // original event.
        var ev = args.originalEvent;

        $("#stock_adjust_add_item_button").trigger('click');
    })

    $("#stock_adjust_search_item_submit").on('submit', function(e){
        e.preventDefault();
        $("#stock_adjust_search_item_button").jqxButton({disabled : true});
        $.ajax({
            url: url + 'backoffice/mobile/stock-adjust/search',
            method: 'POST',
            dataType: 'json',
            data: {"Search" : $("#stock_adjust_search_item").val()},
            beforeSend: function(){

            },
            success: function(data){
               console.log("search", data);
               stock_adjust_item_search_grid(data);
               $("#stock_adjust_search_item").select();
            }
        })

        setTimeout(function(){
            $("#stock_adjust_search_item_button").jqxButton({disabled : false});
        },1000)
    })
})

