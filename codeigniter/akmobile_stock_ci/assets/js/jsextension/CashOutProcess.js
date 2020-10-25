/**
 * JS file extension for the Cash Out process
 * 
 * @param {int} Unique 
 */
var ServerCashInList = function(Unique){
    var GridRowHeight = parseInt($("#GridRowHeight").val());
    var GridTheme = $("#GridTheme").val();
    var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
    var CasOutBlind = $("#CashOutBlind").val();
    var postdata ="UserUnique="+Unique; 
    $.ajax({
        url: base_url + 'pos/cashier/cashout-server/server-cashin-list',
        type: 'POST',
        dataType: 'json',
        data: postdata,
        beforeSend: function(){
            $("body").append(
                '<div id="server_cashin" style="display:none;">'+
                    '<div id="server_cashin_container">'+
                        '<div>'+
                            '<input type="button" id="server_cashin_select" value="Select">&nbsp;&nbsp;'+
                            '<input type="button" id="server_cashin_cancel" value="Cancel">'+
                        '</div>'+
                        '<br>'+
                        '<div id="server_cashin_grid"></div>'+
                    '</div>'+
                '</div>' 
            )
        },
        success: function(data){
           
            $("#server_cashin_select").jqxButton({width: 120, height: 40, template: 'primary' });
            $("#server_cashin_cancel").jqxButton({width: 120, height: 40, template: 'danger' });
            
            $("#server_cashin_cancel").on('click', function(){
                $("#server_cashin").jqxWindow('close');
            })
    
            $("#server_cashin_select").on('click', function(){
                var rowindex =  $("#server_cashin_grid").jqxGrid('getselectedrowindex');
                var rowid =  $("#server_cashin_grid").jqxGrid('getrowid', rowindex);
                var rowdata =  $("#server_cashin_grid").jqxGrid('getrowdatabyid', rowid);
                if(rowdata){
                    ByStationCashierUnique = rowdata.Unique;
                    var UserUnique = rowdata.UserUnique;
                    var postdata ="UserUnique=" + rowdata.UserUnique;
                        postdata+="&StationCashierUnique="+rowdata.Unique;
                    $.ajax({
                        url: base_url + 'pos/cashier/cashout-server/cashin-server-check',
                        type: 'POST',
                        dataType: 'json',
                        data: postdata,
                        beforeSend: function(){

                        },
                        success: function(data){
                            if( $("#CashDrawerOpen").val() == 1 ){
                                OpenCashDrawer();
                            }else{
                                setTimeout($.unblockUI, 100);
                            }
                            if(CashOutBlind > 0){
                                LoadHeaderInfo();
                                CashCountProcessServerBlind(rowdata.Unique);
                            }else{
                                LoadHeaderInfo(rowdata.Unique);
                                CashCountProcessServer(rowdata.Unique);
                            }
                        }
                    })
        
                    getOnHoldReceipts(UserUnique);
        
                    $("#server_cashin").jqxWindow('close');
                }else{
                    var msg = "Please select Cash In ID";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
    
            $("#server_cashin").jqxWindow({
                height: 550,
                minWidth: '99%',
                isModal: true,
                title: "Cash Out",
                theme: GridTheme,
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 100,
            })
    
            $("#server_cashin").jqxWindow('open');
    
            setTimeout(function(){
                $("#server_cashin").on('close', function(){
                    $("#server_cashin_select, #server_cashin_cancel").jqxButton('destroy');
                    $("#server_cashin_grid").jqxGrid('destroy');
                    $("#server_cashin").jqxWindow('destroy');
                    $("#server_cashin").remove();
                })
            },100)
        },
        complete: function(xhr){
            var source = {
                datatype: 'json',
                datafields: [
                    {name: 'Unique', type: 'int'},
                    {name: 'LocationName', type: 'string'},
                    {name: 'StationName', type: 'string'},
                    {name: 'CashInBy', type: 'string'},
                    {name: 'Amount', type: 'float'},
                    {name: 'LocationUnique', type: 'int'},
                    {name: 'StationUnique', type: 'int'},
                    {name: 'CashInMethod', type: 'int'},
                    {name: 'UserUnique', type: 'int'},
                    {name: 'Created', type: 'date'},
                    {name: 'CashIn', type: 'date'},
                    {name: 'Method', type: 'string'}
                ],
                localdata: xhr.responseJSON.result
            }
    
            var dataAdapter = new $.jqx.dataAdapter(source);    
    
            $("#server_cashin_grid").jqxGrid({
                width: '100%',
                height: 550,
                source: dataAdapter,
                theme: GridTheme,
                scrollbarsize: GridScrollBarSize,
                statusbarheight: GridRowHeight,
                rowsheight: GridRowHeight,
                altrows: true,
                sortable: true,
                columnsresize: true,
                columns: [
                    {text: 'ID', datafield: 'Unique', width: '5%'},
                    {text: 'Location', datafield: 'LocationName', width: '15%', hidden: true},
                    {text: 'Station', datafield: 'StationName', width: '20%'},
                    {text: 'Cashier', datafield: 'CashInBy', width: '16%'},
                    {text: 'Cash In', datafield: 'CashIn', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                    {text: 'Amount', datafield: 'Amount', width: '11%', align: 'right', cellsalign: 'right', cellsformat: 'd2'},
                    {text: 'Method', datafield: 'Method', width: '13%', cellsalign: 'left'},
                ]
            })

            $("#server_cashin_grid").on('rowdoubleclick', function(event){
                setTimeout(function(){
                    $("#server_cashin_select").trigger('click');
                },100)
                
            })
        }
    })
}

var ServerCashInListView = (Unique) => {
    var GridRowHeight = parseInt($("#GridRowHeight").val());
    var GridTheme = $("#GridTheme").val();
    var GridScrollBarSize = parseInt($("#GridScrollBarSize").val());
    var CasOutBlind = $("#CashOutBlind").val();
    var postdata ="UserUnique="+Unique; 
    $.ajax({
        url: base_url + 'pos/cashier/cashout-station/server-cashin-list',
        type: 'POST',
        dataType: 'json',
        data: postdata,
        beforeSend: function(){
            $("body").append(
                '<div id="server_cashin" style="display:none;">'+
                    '<div id="server_cashin_container">'+
                        '<div>'+
                            '<input type="button" id="server_cashin_select" value="Select">&nbsp;&nbsp;'+
                            '<input type="button" id="server_cashin_cancel" value="Cancel">'+
                        '</div>'+
                        '<br>'+
                        '<div id="server_cashin_grid"></div>'+
                    '</div>'+
                '</div>' 
            )
        },
        success: function(data){
           
            $("#server_cashin_select").jqxButton({width: 120, height: 40, template: 'primary' });
            $("#server_cashin_cancel").jqxButton({width: 120, height: 40, template: 'danger' });
            
            $("#server_cashin_cancel").on('click', function(){
                $("#server_cashin").jqxWindow('close');
            })
    
            $("#server_cashin_select").on('click', function(){
                var rowindex =  $("#server_cashin_grid").jqxGrid('getselectedrowindex');
                var rowid =  $("#server_cashin_grid").jqxGrid('getrowid', rowindex);
                var rowdata =  $("#server_cashin_grid").jqxGrid('getrowdatabyid', rowid);
                if(rowdata){
                    ByStationCashierUnique = rowdata.Unique;
                    var UserUnique = rowdata.UserUnique;
                    var postdata ="UserUnique="+rowdata.UserUnique;
                        postdata+="&StationCashierUnique="+rowdata.Unique;
                    $.ajax({
                        url: base_url + 'pos/cashier/cashout-station/cashin-check2',
                        type: 'POST',
                        dataType: 'json',
                        data: postdata,
                        beforeSend: function(){

                        },
                        success: function(data){
                            if(CashOutBlind > 0){
                                CashCountProcessServerBlind(rowdata.Unique)
                                .then(function(){
                                    if( $("#CashDrawerOpen").val() == 1 ){
                                        OpenCashDrawer();
                                    }else{
                                        setTimeout($.unblockUI, 100);
                                    }
                                })
                            }else{
                                CashCountProcessServer(rowdata.Unique)
                                .then(function(){
                                    if( $("#CashDrawerOpen").val() == 1 ){
                                        OpenCashDrawer();
                                    }else{
                                        setTimeout($.unblockUI, 100);
                                    }
                                })
                            }
                        }
                    })

                    getOnHoldReceipts(UserUnique);
        
                    $("#server_cashin").jqxWindow('close');
                }else{
                    var msg = "Please select Cash In ID";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
            })
    
            $("#server_cashin").jqxWindow({
                height: 550,
                minWidth: '99%',
                isModal: true,
                title: "Cash Out",
                theme: GridTheme,
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                modalZIndex: 100,
            })
    
            $("#server_cashin").jqxWindow('open');
    
            setTimeout(function(){
                $("#server_cashin").on('close', function(){
                    $("#server_cashin_select, #server_cashin_cancel").jqxButton('destroy');
                    $("#server_cashin_grid").jqxGrid('destroy');
                    $("#server_cashin").jqxWindow('destroy');
                    $("#server_cashin").remove();
                })
            },100)
        },
        complete: function(xhr){
           
            var source = {
                datatype: 'json',
                datafields: [
                    {name: 'Unique', type: 'int'},
                    {name: 'LocationName', type: 'string'},
                    {name: 'StationName', type: 'string'},
                    {name: 'CashInBy', type: 'string'},
                    {name: 'Amount', type: 'float'},
                    {name: 'LocationUnique', type: 'int'},
                    {name: 'StationUnique', type: 'int'},
                    {name: 'CashInMethod', type: 'int'},
                    {name: 'UserUnique', type: 'int'},
                    {name: 'Created', type: 'date'},
                    {name: 'CashIn', type: 'date'},
                    {name: 'Method', type: 'string'}
                ],
                localdata: xhr.responseJSON.result
            }
    
            var dataAdapter = new $.jqx.dataAdapter(source);    
    
            $("#server_cashin_grid").jqxGrid({
                width: '100%',
                height: 550,
                source: dataAdapter,
                theme: GridTheme,
                scrollbarsize: GridScrollBarSize,
                statusbarheight: GridRowHeight,
                rowsheight: GridRowHeight,
                altrows: true,
                sortable: true,
                columnsresize: true,
                columns: [
                    {text: 'ID', datafield: 'Unique', width: '5%'},
                    {text: 'Location', datafield: 'LocationName', width: '15%', hidden: true},
                    {text: 'Station', datafield: 'StationName', width: '20%'},
                    {text: 'Cashier', datafield: 'CashInBy', width: '16%'},
                    {text: 'Cash In', datafield: 'CashIn', width: '20%', cellsformat: 'MM/dd hh:mm tt'},
                    {text: 'Amount', datafield: 'Amount', width: '11%', align: 'right', cellsalign: 'right', cellsformat: 'd2'},
                    {text: 'Method', datafield: 'Method', width: '13%', cellsalign: 'left'},
                ]
            })

            $("#server_cashin_grid").on('rowdoubleclick', function(event){
                setTimeout(function(){
                    $("#server_cashin_select").trigger('click');
                },100)
            })
        }
    })
}