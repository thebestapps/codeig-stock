(function() {
angular.module("akamaiposApp", ['ngSanitize'])
.controller("akamaiposController",['$scope', '$http', '$q', '$window', '$compile', '$rootScope',  function ($scope, $http, $q, $window, $compile, $rootScope) {
    
    setTimeout(function(){
        var FakeHeight = $("#fakeheight").height();
        var ResoHeight = (FakeHeight - 135);
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
                    width: 320,
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

        var renderText = function (text, value){
            if (value < 55){
                return "<span style='color: #000 !important;'>" + text + "</span>";
            }
            return "<span style='color: #fff;'>" + text + "</span>";
        }
        var values = {}

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
            width: 250, 
            promptText: 'Select Table'
        })

        $(document).on('submit', '#import_data_q', function(e){
            e.preventDefault();

            stepped = 0;
            chunks = 0;
            rows = 0;

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

            $('#ImportFormControlFile').val('');
        })

        $(document).on('click', '#import_data_q .no', function(e){
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

            WindowPopupAlert('Message info')
            .then(function(){
                populateAlertWindow('import_data_q', '')
                .then(function(){
                    $("#alert_window_content").append(
                        '<h4>Would you like to process?</h4>'+
                        '<br>'+
                        '<div style="width: 98%; overflow: hidden; text-align: right; position:absolute; bottom: 0;">'+
                            '<button type="submit" class="btn btn-success btn-lg yes">Yes</button>&nbsp;'+
                            '<button type="button" class="btn btn-danger btn-lg no">No</button>'+
                        '</div>'
                    )
                })
            })
        })

        function buildConfig() {
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

            function getLineEnding(){
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

        function stepFn(results, parserHandle){
            stepped++;
            rows += results.data.length;

            parser = parserHandle;

            if (pauseChecked){
                console.log(results, results.data[0]);
                parserHandle.pause();
                return;
            }

            if (printStepChecked)
                console.log(results, results.data[0]);
        }

        function chunkFn(results, streamer, file){
            if (!results)
                return;
            chunks++;
            rows += results.data.length;

            parser = streamer;

            if (printStepChecked)
                console.log("Chunk data:", results.data.length, results);

            if (pauseChecked){
                console.log("Pausing; " + results.data.length + " rows in chunk; file:", file);
                streamer.pause();
                return;
            }
        }

        function errorFn(error, file){
            console.log("ERROR:", error, file);
        }

        function completeFn(){
            if( $("#progress").prop("checked") ){
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
            }else{
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
                    }, message: 'Processing please wait...'
                });
            }

            $("#alert_window_message").jqxWindow('close');

            end = performance.now();
            if (!$('#stream').prop('checked')
                    && !$('#chunk').prop('checked')
                    && arguments[0]
                    && arguments[0].data)
                rows = arguments[0].data.length;
            
            // console.log(arguments[0].data);
            if( $("#progress").prop("checked")){
                ProcessImportProgress(arguments[0].data);
            }else{
                ProcessImportBatch(arguments[0].data);
            }

            console.log("Finished input (async). Time:", end, arguments);
            console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
        }

        $("#import_file_setting").jqxPopover({offset: {left: 0, top:290}, arrowOffsetValue: -290, width: 230,  position: "right", theme: 'darkblue', title: "Settings", showCloseButton: true, selector: $("#setting") });
        $("#header").addClass('jqx-widget-header-darkblue');

        $(document).on('click', '#edit_file_import_empty_source .okay', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $(document).on('click', '#edit_file_import_table_empty .okay', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $("#alert_window_message").on('close', function(){
            $("#alert_window_message").jqxWindow({height: 260, width: 300,});
            $("#alert_window_message_container").html('');
        })

        // Import result
        var ImportSuccessful = 0;
        var ImportNotCounted = 0;
        var TotalRecords = 0;
        var ProgressCount = 0;
        var ErrorDescription = '';
        var ProcessImportProgress = function(data){
            TotalProcess = data.length;
            ProgressCount = 0;
            if( $("#table_truncate").prop('checked') ){
                var postdata ="TableName="+$("#table_list").val();
                $.ajax({
                    url: base_url + 'backoffice/import-data/truncate-table',
                    method: 'post',
                    dataType: 'json',
                    data: postdata
                })
            }

            // for(var i=0; i < data.length; i++){
            //     var progress = 0;
            //     var postdata ="fileimportdata="+JSON.stringify(data[i]);
            //         postdata+="&tablename="+$("#table_list").val();
            
            //     $.ajax({
            //         url: base_url + 'backoffice/import-data/process-progress',
            //         method: 'post',
            //         dataType: 'json',
            //         data: postdata,
            //         beforeSend: function(){

            //         },
            //         success: function(resdata){
            //             ImportSuccessful++;
            //         },
            //         error: function(request, status, error){
            //             ImportNotCounted++;
            //             ErrorDescription = request.responseText;
            //         },
            //         complete: function(){
            //             ProgressCount++;
            //             progress = ((ProgressCount / TotalProcess) * 100);
            //             $("#label_process").text(i);
            //             $("#jqxProgressBar").jqxProgressBar({animationDuration: 0, value: progress});
            //         }
            //     })
            //     TotalRecords++;
            // }


            $.each(data, function(index, value){
                var progress = 0;
                var postdata ="fileimportdata="+JSON.stringify(value);
                    postdata+="&tablename="+$("#table_list").val();
            
                $.ajax({
                    url: base_url + 'backoffice/import-data/process-progress',
                    method: 'post',
                    dataType: 'json',
                    data: postdata,
                    beforeSend: function(){

                    },
                    success: function(data){
                        ImportSuccessful++;
                    },
                    error: function(request, status, error){
                        ImportNotCounted++;
                        ErrorDescription = request.responseText;
                    },
                    complete: function(){
                        ProgressCount++;
                        progress = ((ProgressCount / TotalProcess) * 100);
                        $("#label_process").text(index);
                        $("#jqxProgressBar").jqxProgressBar({animationDuration: 0, value: progress});
                    }
                })
                TotalRecords++;
            })
        }

        var ProcessImportBatch = function(data){
            var postdata ="fileimportdata="+JSON.stringify(data);
                postdata+="&tablename="+$("#table_list").val();
                postdata+="&table_truncate="+$("#table_truncate").prop('checked');
            
            $.ajax({
                url: base_url + 'backoffice/import-data/process-batch',
                method: 'post',
                dataType: 'json',
                data: postdata,
                async: false,
                beforeSend: function(){

                },
                success: function(data){
                    if(data.success){
                        WindowPopupAlert('Message info')
                        .then(function(){
                            populateAlertWindow('import_data_batch_success', '')
                            .then(function(){
                                $("#alert_window_content").append(
                                    '<h4>Result:</h4>'+
                                    '<br>'+
                                    '<label style="font-size: 18px; font-weight: bold;">Imported rows: <span style="font-size: 16px; ">'+data.result+'</span></label>'+
                                    '<div style="overflow: hidden; text-align: right; position:absolute; bottom:0; width: 98%;">'+
                                        '<button type="button" class="btn btn-danger btn-lg buttonclose">Close</button>'+
                                    '</div>'
                                )
                                setTimeout($.unblockUI, 100);
                            })
                        })
                    }
                },
                error: function(request, status, error){
                    WindowPopupAlert('Message info')
                    .then(function(){
                        populateAlertWindow('import_data_failed', '')
                        .then(function(){
                            $("#alert_window_message").jqxWindow({width: 400, height: 350})
                            $("#alert_window_content").append(
                                '<h4>'+error+'</h4>'+
                                '<br>'+
                                '<div style="height: 190px; background-color: #fff; color: #000; overflow: auto;">'+request.responseText+'</div>'+
                                '<br>'+
                                '<div style="overflow: hidden; text-align: right; position:absolute; bottom:0; width: 98%;">'+
                                    '<button type="button" class="btn btn-danger btn-lg buttonclose">Close</button>'+
                                '</div>'
                            )
                            $("#alert_window_message").jqxWindow({width: 600, height: 380})
                            setTimeout($.unblockUI, 100);
                        })
                    })
                }
            })
        }

        $(document).on('complete', '#jqxProgressBar', function (event) {
            setTimeout($.unblockUI, 100);
            var table_name = $("#table_list").val();
            GridResult(table_name);
            $('form')[0].reset();
            $("#table_list").jqxComboBox('clearSelection');
            WindowPopupAlert('Message info')
            .then(function(){
                populateAlertWindow('import_data_progress', '')
                .then(function(){
                    $("#alert_window_content").append(
                        '<span style="font-size: 18px; font-weight: bold;">Result:</span><br><br>'+
                        '<span style="font-size: 16px">Total Records: '+ TotalRecords +'</span><br>'+
                        '<span style="font-size: 16px">Successful: '+ImportSuccessful+'</span><br>'+
                        '<span style="font-size: 16px;">Error: '+ImportNotCounted+'</span><br>'+
                        '<div style="height: 190px; background-color: #fff; color: #000; overflow: auto;">'+ErrorDescription+'</div>'+
                        '<div style="width: 98%; overflow: hidden; text-align: right; position:absolute; bottom: 0;">'+
                            '<button type="submit" class="btn btn-danger btn-lg buttonclose">Close</button>&nbsp;'+
                        '</div>'
                    )
                    if(ImportNotCounted > 0){
                        $("#alert_window_message").jqxWindow({width: 600, height: 380})
                    }else{
                        $("#alert_window_message").jqxWindow({height: 380, width: 400,});
                    }
                    ImportSuccessful = '';
                    ImportNotCounted = '';
                    TotalRecords     = '';
                    ProgressCount    = '';
                    ErrorDescription = '';
                })
            })
        })

        $(document).on('click', '#import_data_failed .buttonclose', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $(document).on('click', '#import_data_batch_success .buttonclose', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })

        $(document).on('click', '#import_data_progress .buttonclose', function(e){
            e.preventDefault();
            $("#alert_window_message").jqxWindow('close');
        })


        $("#preview_data").on('click', function(){
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
            
            $('#grid_import').jqxGrid('clear');
            
            stepped = 0;
            chunks = 0;
            rows = 0;

            var txt = $('#input').val();
            var localChunkSize = $('#localChunkSize').val();
            var remoteChunkSize = $('#remoteChunkSize').val();
            var files = $('#ImportFormControlFile')[0].files;
            var config = buildConfig2();

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

        function buildConfig2() {
            return {
                delimiter: $('#delimiter').val(),
                newline: getLineEnding2(),
                header: $('#header').prop('checked'),
                dynamicTyping: $('#dynamicTyping').prop('checked'),
                preview: parseInt($('#preview').val() || 0),
                step: $('#stream').prop('checked') ? stepFn : undefined,
                encoding: $('#encoding').val(),
                worker: $('#worker').prop('checked'),
                comments: $('#comments').val(),
                complete: completeFn2,
                error: errorFn,
                download: $('#download').prop('checked'),
                fastMode: $('#fastmode').prop('checked'),
                skipEmptyLines: $('#skipEmptyLines').prop('checked'),
                chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
                beforeFirstChunk: undefined,
            };

            function getLineEnding2(){
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

        function completeFn2(){
            
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
                }, message: 'Processing please wait...'
            });

            end = performance.now();
            if (!$('#stream').prop('checked')
                    && !$('#chunk').prop('checked')
                    && arguments[0]
                    && arguments[0].data)
                rows = arguments[0].data.length;
                fields = arguments[0].meta.fields;
        
            ProcessPreviewData(arguments[0].data, fields);

            console.log("Finished input (async). Time:", end, arguments);
            console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
        }

        var listSource = [];

        $("#jqxlistbox").jqxListBox({ source: listSource, width: 200, height: 200,  checkboxes: true });
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#grid_import").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#grid_import").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#grid_import").jqxGrid('hidecolumn', event.args.value);
            }
            $("#grid_import").jqxGrid('endupdate');

            $('#grid_import').jqxGrid('autoresizecolumns');
        });

        var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
            if (columnfield == 'CardNumber') {
                var newval = value.toString().substr(-4);
                return '<div style="margin: 4px; float: ' + columnproperties.cellsalign + ';">' + newval + '</div>';
            }
            else {
                return '<div style="margin: 4px; float: ' + columnproperties.cellsalign + ';">' + value + '</div>';
            }
        }

        var ProcessPreviewData = function(data, fields){
            // Column List
            listSource = [];
            // Columns
            var colsarray = []; 
            // Field Types
            var newfields = []; 

            var SecureColumn = ['CardNumber'];
            
            var ReplaceColumn = ['CardNumber4'];

            colsarray.push({text: '#', sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: 50,cellsrenderer: function (row, column, value) {
                return "<div style='margin:4px;'>" + (value + 1) + "</div>";
            }});

            for(var i=0; i < fields.length; i++){
                newfields.push({
                    name: fields[i],
                    type: 'string'
                });

                if(SecureColumn.indexOf(fields[i]) >= 0) {
                    
                    if(fields[i] == 'CardNumber'){

                        newfields.push({
                            name: 'CardNumber4',
                            type: 'string'
                        })

                        colsarray.push({
                            text : 'CardNumber4',
                            datafield : fields[i],
                            cellsrenderer : cellsrenderer 
                        });
                        
                        listSource.push({label: 'CardNumber4', value: 'CardNumber4', checked: true});
                    }
                  
                }else{    
                    colsarray.push({
                        text : fields[i],
                        datafield: fields[i]
                    });
                    listSource.push({label: fields[i], value: fields[i], checked: true});
                }
            }
            
            setTimeout(function(){
                $("#jqxlistbox").jqxListBox({ source: listSource});
                Grid(data, newfields, colsarray);
                $('#grid_import').jqxGrid('autoresizecolumns');
            },100);
        
            setTimeout($.unblockUI, 100);
        }

        const FindIndexRes = (element) => {
            return element;
        }

        /**
         * 
         * @param {array} source 
         * @param {array} cols 
         */
        var Grid = function(data, fields, cols){
            var source =  {
                datatype: 'json',
                datafields: fields,
                localdata: data
            }
            
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#grid_import").jqxGrid({
                source: dataAdapter,
                height: useHeight,
                width: "100%",
                columnsresize: true,
                theme: 'darkblue',
                sortable: true,
                pageable: false,
                scrollbarsize: 25,
                pagerMode: 'advance',
                altRows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'checkbox',
                columns: cols,
            })
        }

        $("#column_set_option").jqxPopover({rtl: false, offset: {left: -50, top:0}, arrowOffsetValue: 50, width: 230,  position: "bottom", theme: 'darkblue', title: "Settings", showCloseButton: true, selector: $("#columnSet") });

        var GridResult = function(table_name){
            var postdata ="TableName="+table_name;
            $.ajax({
                url: base_url + 'backoffice/import-data/result',
                method: 'post',
                dataType: 'json',
                data: postdata,
                beforeSend: function(){

                },
                success: function(data){
                    ProcessPreviewData(data.result, data.fields);
                },
                complete: function(){

                },
                error: function(){

                }
            })
        }

        $("#download").on('click', function(e){
            e.preventDefault();
            var rows = $('#grid_import').jqxGrid('getrows');
            for(var i=0; i < rows.length; i++){
                rows[i].CardNumber = rows[i].CardNumber.toString().substr(-4);    
            }
            $("#grid_import").jqxGrid('exportdata', 'xls', 'Data imported', true, rows, true, base_url + 'assets/js/angular/jqwidgets/save-file.php'); 
        })

    }, 100);

}])
})();