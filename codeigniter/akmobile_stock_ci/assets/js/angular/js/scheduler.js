(function() {
    angular.module("BackofficeSchedulerApp", ['ngRoute','ngSanitize'])
    .service('svc',function(){})
    .controller("SchedulerController",['$scope', '$http', 'svc', '$q', '$routeParams', '$window', 'schedulerData', '$compile', '$rootScope',  function ($scope, $http, svc, $q, $routeParams, $window, schedulerData, $compile, $rootScope) {
    angular.SchedulerControllerExtend($scope, $http, svc, $q, $routeParams, $window, schedulerData, $compile, $rootScope)    
        $scope.RedirectDashboard = function(){
            if(TimeScheduler == 1){
                $window.location = base_url + 'pos/cashier';
            }else{
                $window.location = base_url + 'pos/dashboard';
            }
        }

        /**
         * Global variable
         */
        var GetRowNew = []
        var GetRowUpdated = [];

        /**
         * Dynamic Window alert form
         */
        var CreateWindowAlert = function(){
            var def = $.Deferred();
            setTimeout(function(){
                $("#notification_alert").append('<div id="notification_alert_container" style="background: #144766; color:#EEE; padding:0; margin:0; overflow: hidden;"></div>');
                $("#notification_alert_container").html('');
                $("#notification_alert_container").append(        
                    '<h3 id="header_message"></h3>'+
                        '<span id="message" style="font-size: 1.5em;"></span>'+
                    '</div>'+
                    '<br>'+
                    '<div style="width: 100%; position:absolute; text-align: right; bottom:0; padding: 5px;">'+
                        '<button id="notification-alert-close" class="btn btn-danger btn-lg">Close</button>'+
                    '</div>'
                );
                def.resolve();
            },100);
            return def.promise();
        }

        /**
         * Window Form alert settings
         */
        var WindowFormAlert = function(){
            var def = $.Deferred();
            $('#notification_alert').jqxWindow({
                maxHeight: 350, 
                maxWidth: '20%', 
                minHeight: 200, 
                minWidth: '20%', 
                height: 250, 
                width: 450, 
                theme: 'darkblue',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                isModal: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                title: '<button id="notification-alert-close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto; cursor: pointer;" title="Close"></button>&nbsp;Message info',
                initContent: function () {
                    $('#notification_alert').jqxWindow('focus');
                }
            });
            setTimeout(function(){
                $('#notification_alert').jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }

        /**
         * Dynamic window alert question form
         * @param {string} title 
         * @param {string} msg 
         */
        var CreateWindowAlertAsk = function(form, title, msg){
            var def = $.Deferred();
            setTimeout(function(){
                $("#notification_ask").append('<div id="notification_ask_container" class="container-window-popup"></div>');
                $("#notification_ask_container").html('');
                $("#notification_ask_container").append(
                    '<form id="'+form+'">'+
                        '<h3>'+title+'</h3>'+
                        '<span id="message_ask" style="font-size: 1.5em; padding-top: 10px; margin-top: 10px;">'+msg+'</span>'+
                        '<br>'+
                        '<div style="width: 100%; position:absolute; bottom:0; text-align: right; padding: 5px;">'+
                            '<button id="notification-ask-cancel" class="btn btn-warning btn-lg">Cancel</button>&nbsp;'+
                            '<button id="notification-ask-no" class="btn btn-danger btn-lg">No</button>&nbsp;'+
                            '<button type="submit" id="notification-ask-yes" class="btn btn-success btn-lg">Yes</button>'+
                        '</div>'+
                    '</form>'
                    );
                def.resolve();
            },100);
            return def.promise();
        }

        /**
         * Window Form alert settings
         */
        var WindowFormAsk = function(){
            var def = $.Deferred();
            $('#notification_ask').jqxWindow({
                maxHeight: 350, 
                maxWidth: '20%', 
                minHeight: 200, 
                minWidth: '20%', 
                height: 250, 
                width: 450, 
                theme: 'darkblue',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                isModal: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                title: '<button id="notification-ask-close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto; cursor: pointer;" title="Close"></button>&nbsp;Message info',
                initContent: function () {
                    $('#notification_ask').jqxWindow('focus');
                }
            });
            setTimeout(function(){
                $('#notification_ask').jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }
        /**
         * Notification ask event close function
         */
        $("#notification_ask").on('close', function(e){
            e.preventDefault();
            $("#notification_ask_container").remove();
        })

        /**
         * Dynamic create jqxgrid form
         * @param {array} data 
         */
        var CreateGrid = function(data){
            var paycode_source = {
                datatype: 'json',
                datafields: [
                    { name: 'Unique' },
                    { name: 'PayCode' }
                ],
                localdata: PayCodes,
                async: false
            }
            var PayCodeDataAdapter = new $.jqx.dataAdapter(paycode_source);

            var source = {
                datatype: 'json',
                datafields: [
                    { name: 'TimeUnique', type: 'int'},
                    { name: 'DateIn', type: 'date'},
                    { name: 'TimeIn', type: 'string'},
                    { name: 'ClockInComment', type: 'string'},
                    { name: 'DateOut', type: 'date'},
                    { name: 'TimeOut', type: 'string'},
                    { name: 'ClockOutComment', type: 'string'},
                    { name: 'Duration', type: 'string'},
                    { name: 'Total', type: 'string'},
                    { name: 'PayCode', type: 'int'},
                    { name: 'PayCodeVal', type: 'string'},
                    { name: 'Comment', type: 'string'}
                ],
                localdata: data,
                updaterow: function(rowid, rowdata, commit){
                    var $this = $("#gridActualClockInOut");
                    var row = $($this).jqxGrid('getrowdatabyid', rowid);

                    var dateStringFormat = 'MM-dd-yyyy';
                    var timeStringFormat = 'hh:mm tt';
                    var DateIn = '';
                    var TimeIn = '';
                    var DateOut = '';
                    var TimeIn = '';

                    commit(true);

                    if(row.DateIn=="" || row.DateOut=="" || row.TimeIn=="" || row.TimeOut==""  || row.DateIn=="undefined" || row.DateOut=="undefined" || row.TimeIn=="undefined" || row.TimeOut=="undefined") return false;

                    DateIn = $.jqx.formatDate(row.DateIn, dateStringFormat);
                    DateIn = DateIn.split('-');

                    TimeIn = row.TimeIn;

                    (row.TimeIn == null ? row.TimeIn = '' : '');
                    TimeIn = $.jqx.formatDate(row.TimeIn, timeStringFormat);

                    (row.DateOut == null ? row.DateOut = '' : '');
                    DateOut = $.jqx.formatDate(row.DateOut, dateStringFormat);
                    DateOut = DateOut.split('-');
                    TimeOut = row.TimeOut;

                    (row.TimeOut == null ? row.TimeOut = '' : '');
                    TimeOut = $.jqx.formatDate(row.TimeOut, timeStringFormat);

                    TimeIn  = convertTo24Hour(TimeIn.toLowerCase());
                    TimeOut = convertTo24Hour(TimeOut.toLowerCase());
    
                    TimeIn  = TimeIn.split(":");
                    TimeOut = TimeOut.split(":");
    
                    DateOut = new Date(DateOut[2], DateOut[0]-1, DateOut[1], TimeOut[0], TimeOut[1], 00, 00);
                    DateIn  = new Date(DateIn[2], DateIn[0]-1, DateIn[1], TimeIn[0], TimeIn[1], 00, 00);
    
                    var Duration = dateDiff(DateIn,DateOut);
                    var Total    = dateDiffDecimal(DateIn,DateOut);
                    var Hours = Duration.split(':')[0];
                    var Minutes = Duration.split(':')[1];
                    var NewDuration = Hours.padStart(2,'0') +':'+ Minutes.padStart(2,'0');

                    if(Hours < 0){
                        // $($this).jqxGrid('setcellvaluebyid', rowid, "DateOut", '');
                        $($this).jqxGrid('setcellvaluebyid', rowid, "TimeOut", '');

                        CreateWindowAlert()
                        .then(function(){
                            $("#header_message").text("Time Clock");
                            $("#message").text("Date out and Time out must be greater than to Date in and Time in.");
                            WindowFormAlert();
                        })
                        
                        return false;
                    }
                   
                    console.log(NewDuration, Total);

                    if(NewDuration != 'NaN:NaN'){
                        $($this).jqxGrid('setcellvaluebyid', rowid, "Duration", NewDuration);
                        $($this).jqxGrid('setcellvaluebyid', rowid, "Total", parseFloat(Total).toFixed(2));
                    } 
                },
                addrow: function (rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server was successful. 
                    // and with parameter false if the synchronization has failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a Database. Example: commit(true, idInDB) where "idInDB" is the row's ID in the Database.
                    console.log(rowid);
                    commit(true);
                }
            }
    
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#gridActualClockInOut").jqxGrid({
                source: dataAdapter,
                width: '100%',
                editable: true,
                altRows: true,
                theme: 'darkblue',
                columns: [
                    { text: 'Unique', datafield: 'TimeUnique', hidden: true},
                    { text: 'Date In', datafield: 'DateIn', cellsformat: 'MM/dd/yyyy', columntype: 'datetimeinput', width: '10%'},
                    { text: 'Time In', datafield: 'TimeIn', columntype: 'datetimeinput', width: '8%', cellsformat: 'hh:mm tt',
                        createeditor: function (row, value, editor) {
                            editor.jqxDateTimeInput({ 
                                formatString: 'hh:mm tt',
                                showTimeButton: false,
                                showCalendarButton: false 
                            });
                        }
                    },
                    { text: 'Clock In Comment', datafield: 'ClockInComment', editable: false, width: '15%',},
                    { text: 'Date Out', datafield: 'DateOut', cellsformat: 'MM/dd/yyyy', columntype: 'datetimeinput', width: '10%',},
                    { text: 'Time Out', datafield: 'TimeOut', columntype: 'datetimeinput', cellsformat: 'hh:mm tt', width: '8%',
                        createeditor: function (row, value, editor) {
                            editor.jqxDateTimeInput({ 
                                formatString: 'hh:mm tt',
                                showTimeButton: false,
                                showCalendarButton: false
                            });
                        }
                    },
                    { text: 'Clock Out Comment', datafield: 'ClockOutComment', editable: false, width: '15%',},
                    { text: 'Duration', datafield: 'Duration', editable: false, width: '8%',},
                    { text: 'Total', datafield: 'Total', editable: false, width: '8%',},
                    { text: 'Pay Code', datafield: 'PayCodeVal', columntype: 'dropdownlist', width: '7%',
                        initeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            editor.jqxDropDownList({source: PayCodeDataAdapter, displayMember: 'PayCode', valueMember: 'Unique' });
                        }
                    },
                    { text: 'Comment', datafield: 'Comment', editable: true, width: '15%'},
                ]
            })
        }

        var generaterow = function (i) {
            var row = {};
            // row["DateIn"] = i;
            row["PayCodeVal"] = i;
            return row;
        }

        $(document).on('click', '#add_time_clock', function(e){
            var nextid = $("#gridActualClockInOut").jqxGrid('getdatainformation').rowscount;
            var textname = 'REG';
            var datarow = generaterow(textname);
            var commit = $('#gridActualClockInOut').jqxGrid("addrow", null, {}, "first");
            // NewGridRow.push(nextid);
        })

        /**
         * Cell event function
         */
        $(document).on('cellvaluechanged', function(event){
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

            $("#save_time_clock").attr('disabled', false);

            if(value == null){

            }else{

                var rowdata = $("#gridActualClockInOut").jqxGrid('getrowdata', rowBoundIndex);
                var rowid = $('#gridActualClockInOut').jqxGrid('getrowid', rowBoundIndex);
                    
                var detectedField = rowdata[datafield];

                if(datafield == 'DateIn'){
                    // var dateStringFormat = 'MM-dd-yyyy';
                    var dateStringFormat = 'yyyy-MM-dd';
                    detectedField = $.jqx.formatDate(rowdata[datafield],dateStringFormat);

                    var TimeUnique = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'TimeUnique');
                    var TimeClockIn = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'TimeIn');

                    $('#gridActualClockInOut').jqxGrid('hidevalidationpopups');

                    if(TimeClockIn == '' || TimeClockIn == ''){
                        setTimeout(function(){
                            $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowBoundIndex, "TimeIn", "Required");
                        },100);
                    }
                }

                if(datafield == 'DateOut'){
                    // var dateStringFormat = 'MM-dd-yyyy';
                    var dateStringFormat = 'yyyy-MM-dd';
                    detectedField = $.jqx.formatDate(rowdata[datafield],dateStringFormat);

                    var TimeUnique = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'TimeUnique');
                    var TimeClockOut = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'TimeOut');

                    $('#gridActualClockInOut').jqxGrid('hidevalidationpopups');

                    if(TimeClockOut == '' || TimeClockOut == ''){
                        setTimeout(function(){
                            $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowBoundIndex, "TimeOut", "Required");
                        },100);
                    }
                }

                if(datafield == 'TimeIn'){
                    var timeStringFormat = 'HH:mm';
                    detectedField = $.jqx.formatDate(rowdata[datafield],timeStringFormat);

                    $('#gridActualClockInOut').jqxGrid('hidevalidationpopups');

                    var TimeClockDateIn = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'DateIn');
                    if(TimeClockDateIn == '' || TimeClockDateIn == null){
                        setTimeout(function(){
                            $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowBoundIndex, "DateIn", "Required");
                        },100);
                    }
                }

                if(datafield == 'TimeOut'){
                    var timeStringFormat = 'HH:mm';
                    detectedField = $.jqx.formatDate(rowdata[datafield],timeStringFormat);

                    $('#gridActualClockInOut').jqxGrid('hidevalidationpopups');

                    var TimeClockDateOut = $("#gridActualClockInOut").jqxGrid('getcellvaluebyid', rowid, 'DateOut');
                    if(TimeClockDateOut == '' || TimeClockDateOut == null){
                        setTimeout(function(){
                            $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowBoundIndex, "DateOut", "Required");
                        },100);
                    }
                }

                if(datafield == 'PayCodeVal'){
                    datafield = 'PayCodeValue';
                    var DropDownValue = $('#dropdownlisteditorgridActualClockInOutPayCodeVal').jqxDropDownList('val');
                    if(rowdata.TimeUnique){
                        GetRowUpdated.push({"Unique" : rowdata.TimeUnique, "PayCode" : DropDownValue });
                    }else{
                        GetRowNew.push({"RowId" : rowid, "PayCode" : DropDownValue});
                    }
                }

                for(var key in GetRowUpdated){
                    if(GetRowUpdated[key].Unique == rowdata.TimeUnique && Object.keys(GetRowUpdated[key])[1] == datafield){
                        GetRowUpdated.splice(key, 1);
                    }
                }

                for(var key in GetRowNew){
                    if(GetRowNew[key].RowId == rowid && Object.keys(GetRowNew[key])[1] == datafield){
                        GetRowNew.splice(key, 1);
                    }
                }
                
                if(rowdata.TimeUnique){
                    GetRowUpdated.push({"Unique" : rowdata.TimeUnique, [datafield] : detectedField });
                }else{
                    GetRowNew.push({"RowId" : rowid, [datafield] : detectedField});
                }

                console.log("RowUpdated",GetRowUpdated);
                console.log("RowNew",GetRowNew);
            }
        })

        /**
         * Delete Time Clock function
         */
        $(document).on('click', '#delete_time_clock', function(e){
            var rowindex = $('#gridActualClockInOut').jqxGrid('getselectedrowindex');
            var rowid = $('#gridActualClockInOut').jqxGrid('getrowid', rowindex);
            var rowdata = $("#gridActualClockInOut").jqxGrid('getrowdatabyid', rowid);
            if(!rowdata.TimeUnique){
                $("#notification_ask").jqxWindow('close');
                $('#gridActualClockInOut').jqxGrid('deleterow', rowid);
                return false;
            }
            if(rowindex < 0){
                CreateWindowAlert()
                .then(function(){
                    WindowFormAlert()
                    .then(function(){
                        $("#header_message").text('Time Clock not selected');
                        $("#message").text('Please select row to delete.');
                    })
                })
                return false;
            }

            var msg = 'Are you sure you want to delete?';
            var title = 'Delete time clock data';
            CreateWindowAlertAsk('delete_time_clock_confirm', title, msg)
            .then(function(){
                WindowFormAsk()
            })
        })
        
        /**
         * Confirmation agree to delete timeclock data.
         */
        $(document).on('submit', '#delete_time_clock_confirm', function(e){
            e.preventDefault();
            var rowindex = $('#gridActualClockInOut').jqxGrid('getselectedrowindex');
            var rowid = $('#gridActualClockInOut').jqxGrid('getrowid', rowindex);
            var rowdata = $("#gridActualClockInOut").jqxGrid('getrowdatabyid', rowid);
            var postdata ="Unique="+rowdata.TimeUnique;
            $.ajax({
                url: base_url + 'backoffice/scheduler/timeclock-delete',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    $('#gridActualClockInOut').jqxGrid('deleterow', rowid);

                    if(GetRowUpdated.length > 0 || GetRowNew.length > 0){
                        deletechanges = true;
                    }else{
                        location.reload();
                    }
                    $("#notification_ask").jqxWindow('close');
                }                
            })
        })

        /**
         * Confirmation disagree to delete timeclock data.
         */
        $(document).on('click', '#delete_time_clock #notification-ask-no', function(e){
            e.preventDefault();
            $("#notification_ask").jqxWindow('close');
        })

        $(document).on('click', '#delete_time_clock #notification-ask-cancel', function(e){
            e.preventDefault();
            $("#notification_ask").jqxWindow('close');
        })

        /**
         * Dynamic window form Time Clock In and Out
         * @param {array} data 
         */
        var CreateWindowForm = function(data){
            var def = $.Deferred();
            
            var SelectedField = '';
            $("#window").append(
                '<div id="window-container" style="background: #144766; color:#EEE; padding:0; margin:0; overflow: hidden;">'+
                    '<div class="window-menu-function" style="width: 100%; height: 50px; padding: 5px;">'+
                        '<button id="add_time_clock" class="btn btn-info btn-lg" title="Add"><span class="glyphicon glyphicon-plus"></span></button>&nbsp;'+
                        '<button id="delete_time_clock" class="btn btn-danger btn-lg" title="Delete" disabled><span class="glyphicon glyphicon-trash"></span></button>&nbsp;'+
                        '<button id="save_time_clock" class="btn btn-success btn-lg" tile="Save" disabled><span class="glyphicon glyphicon-floppy-disk"></span></button>'+
                    '</div><br>'+
                    '<div id="gridActualClockInOut"></div>'+
                '</div>'
            );

            CreateGrid(data.actualdata);
    
            $("#gridActualClockInOut").on('cellclick', function(event){
                var datafield = event.args.datafield;
                var cellvalue = args.value;
                var columnindex = args.columnindex;
                var rowBoundIndex = args.rowindex;
                SelectedField = datafield;

                $("#delete_time_clock").attr('disabled', false);
            })
    
            setTimeout(function(){
                def.resolve();
            },100)
            return def.promise();
        }
        
        /**
         * Window time clock form settings
         * @param {array} data 
         */
        var WindowForm = function(data){
            var def = $.Deferred();
            $('#window').jqxWindow({
                showCollapseButton: true, 
                maxHeight: 500, 
                maxWidth: '60%', 
                minHeight: 200, 
                minWidth: '60%', 
                height: 500, 
                width: 500, 
                theme: 'darkblue',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                isModal: true,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                title: '<button id="actual_schedule_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto; cursor: pointer;" title="Close"></button>&nbsp;Actual Clock In and Out | '+data.EmployeeName,
                initContent: function () {
                    $('#window').jqxWindow('focus');
                }
            });
            setTimeout(function(){
                $('#window').jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }
        
        /**
         * Multifunctional function to call window popup with data
         */
        $scope.CallActualClockInOut = function(data) {
            CreateWindowForm(data)
            .then(function(){
                WindowForm(data);
            })
        }
        
        /**
         * Clock In and Out window popup close event
         */
        var deletechanges = false;
        $("#window").on('close', function(){
            $("#window-container").remove();
            GetRowUpdated = [];
            GetRowNew = [];
            if(deletechanges){
                location.reload();
            }
        })

        /**
         * Alert message close function
         */
        $(document).on('click', '#notification-alert-close', function(e){
            e.preventDefault();
            $("#notification_alert").jqxWindow('close');
        })

        /**
         * Alert message close on close event
         */
        $("#notification_alert").on('close', function(e){
            e.preventDefault();
            $("#notication_alert_container").remove();
        })

        /**
         * Clock In and Out window close function
         */
        $(document).on('click', '#actual_schedule_close', function(e){
            e.preventDefault();
            if(GetRowNew.length > 0 || GetRowUpdated.length > 0){
                var msg = 'Do you want to save changes?';
                var title = 'Time clock changed!';
                CreateWindowAlertAsk('timeclock_save', title, msg)
                .then(function(){
                    WindowFormAsk()
                })
            }else{
                $("#window").jqxWindow('close');
            }
        })

        $(document).on('submit', '#timeclock_save', function(e){
            e.preventDefault();
            $("#save_time_clock").trigger('click');
            $("#notification_ask").jqxWindow('close');
            $("#window").jqxWindow('close');
        })

        $(document).on('click', '#timeclock_save #notification-ask-cancel', function(e){
            e.preventDefault();
            $("#notification_ask").jqxWindow('close');
        })

        $(document).on('click', '#timeclock_save #notification-ask-no', function(e){
            e.preventDefault();
            GetRowNew = [];
            GetRowUpdated = [];
            $("#notification_ask").jqxWindow('close');
            $("#window").jqxWindow('close');
        })

        var AutoSaveChanges = () => {
            var countmein = 0;
            var getrowTimeClock = $("#gridActualClockInOut").jqxGrid('getrows');
            for(var td=0; td < getrowTimeClock.length; td++){
                var rowTimeClockId = $("#gridActualClockInOut").jqxGrid('getrowid', td);
                var TimeClockDateIn = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'DateIn');
                var TimeClockDateOut = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'DateOut');
                var TimeClockTimeIn = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'TimeIn');
                var TimeClockTimeOut = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'TimeOut');

                console.log(TimeClockDateIn, TimeClockTimeIn);

                if(TimeClockDateIn && TimeClockTimeIn == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "TimeIn", "Required");
                    countmein++;
                    return;
                }

                console.log(TimeClockTimeIn, TimeClockDateIn);

                if(TimeClockTimeIn && TimeClockDateIn == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "DateIn", "Required");
                    countmein++;
                    return;
                }   

                console.log(TimeClockDateOut, TimeClockTimeOut);

                if(TimeClockDateOut && TimeClockTimeOut == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "TimeOut", "Required");
                    countmein++;
                    return;
                }

                console.log(TimeClockTimeOut, TimeClockTimeOut);

                if(TimeClockTimeOut && TimeClockDateOut == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "DateOut", "Required");
                    countmein++;
                    return;
                }
            }


            console.log("count me in ", countmein);
            if(countmein > 0) return;

            var postdata ="UpdateData="+JSON.stringify(GetRowUpdated);
                postdata+="&NewData="+JSON.stringify(GetRowNew);
                postdata+="&UserUnique="+$scope.EmployeeId;
                postdata+="&UserName="+$scope.EmployeeName;
            $.ajax({
                url: base_url + 'backoffice/scheduler/timeclock-save',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    GetRowUpdated = [];
                    GetRowNew = [];
                    console.log("data saved s");
                }
            })
        }

        /**
         * Save New and Update Clock In and Out function 
         */
        $(document).on('click', '#save_time_clock', function(e){
            e.preventDefault();
            console.log(GetRowUpdated);
            console.log(GetRowNew);

            var countmein = 0;
            var getrowTimeClock = $("#gridActualClockInOut").jqxGrid('getrows');
            for(var td=0; td < getrowTimeClock.length; td++){
                var rowTimeClockId = $("#gridActualClockInOut").jqxGrid('getrowid', td);
                var TimeClockDateIn = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'DateIn');
                var TimeClockDateOut = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'DateOut');
                var TimeClockTimeIn = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'TimeIn');
                var TimeClockTimeOut = $("#gridActualClockInOut").jqxGrid('getcelltextbyid', rowTimeClockId, 'TimeOut');

                console.log(TimeClockDateIn, TimeClockTimeIn);

                if(TimeClockDateIn && TimeClockTimeIn == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "TimeIn", "Required");
                    countmein++;
                    return;
                }

                console.log(TimeClockTimeIn, TimeClockDateIn);

                if(TimeClockTimeIn && TimeClockDateIn == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "DateIn", "Required");
                    countmein++;
                    return;
                }   

                console.log(TimeClockDateOut, TimeClockTimeOut);

                if(TimeClockDateOut && TimeClockTimeOut == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "TimeOut", "Required");
                    countmein++;
                    return;
                }

                console.log(TimeClockTimeOut, TimeClockTimeOut);

                if(TimeClockTimeOut && TimeClockDateOut == ''){
                    $("#gridActualClockInOut").jqxGrid('showvalidationpopup', rowTimeClockId, "DateOut", "Required");
                    countmein++;
                    return;
                }
            }


            console.log("count me in ", countmein);
            if(countmein > 0) return;

            var postdata ="UpdateData="+JSON.stringify(GetRowUpdated);
                postdata+="&NewData="+JSON.stringify(GetRowNew);
                postdata+="&UserUnique="+$scope.EmployeeId;
                postdata+="&UserName="+$scope.EmployeeName;
            $.ajax({
                url: base_url + 'backoffice/scheduler/timeclock-save',
                type: 'post',
                dataType: 'json',
                data: postdata,
                success: function(data){
                    GetRowUpdated = [];
                    GetRowNew = [];
                    CreateWindowAlert()
                    .then(function(){
                        $("#notification-alert-close").addClass('time-clock-created');
                        WindowFormAlert()
                        .then(function(){
                            $("#header_message").text('Time Clock');
                            $("#message").text(data.msg);
                        })
                    })
                }
            })
        })

        $(document).on('click', '.time-clock-created', function(e){
            e.preventDefault();
            location.reload();
        })

        function convertToTwoDigit(digit) {
            var digit = (digit > 9 ? "" + digit: "0" + digit);
            return digit;
        }

        function convertTo24Hour(time) {
            var hours = parseInt(time.substr(0, 2));
            if(time.indexOf('am') != -1 && hours == 12) {
                time = time.replace('12', '0');
            }
            if(time.indexOf('pm')  != -1 && hours < 12) {
                time = time.replace(hours, (hours + 12));
            }
            return time.replace(/(am|pm)/, '');
        }

        function dateDiff( date1, date2 ) {
            //Get 1 day in milliseconds
            var one_day	 = 1000*60*60*24;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
            //take out milliseconds
            difference_ms = difference_ms/1000;
            var seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60;
            var minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60;
            var hours = Math.floor(difference_ms % 24);
            var days = Math.floor(difference_ms/24);

            // return (days * 24) + hours + ' hours, ' + minutes + ' minutes';
            return (days * 24) + hours +':'+ minutes;
        }

        function dateDiffDecimal( date1, date2 ) {
            //Get 1 day in milliseconds
            var one_day	 = 1000*60*60*24;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
            //take out milliseconds
            difference_ms = difference_ms/1000;
            var seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60;
            var minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60;
            var hours = Math.floor(difference_ms % 24);
            var days = Math.floor(difference_ms/24);

		    return convertToTwoDigit(((days * 24) + hours))  + '.' + convertToTwoDigit((parseInt((minutes/60)*100)));
	    }


    }])
})();