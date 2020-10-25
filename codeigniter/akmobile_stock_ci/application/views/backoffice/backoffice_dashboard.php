<?php
    plugin_security();
?>
<script type="text/javascript" src="<?php echo base_url()?>assets/js/jqwidgets/jqxtextarea.js"></script>
<script type="text/javascript">
    /* Global Variable */
    var base_url = "<?php echo base_url() ?>";
    var FunctionButton = '';
    var RedirectPage = '';

	$(function(){
		changetabtile();
	});
	function changetabtile(){
		$("#tabtitle").html("Dashboard");
	}

    $(function(){
        $("#dialog-numpad-passcode").on("close", function(event){
            event.preventDefault();
            $("#passcode_numpad").html('');
        })

        $('#alert-msg-popup').on("close", function(event){
            event.preventDefault();
            $('#alert-msg-popup-container').html('');
        })

        var populateNumpadPasscode = function(form_name){
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
                $("#passcode_numpad").html('');
                $("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
                $("#passcode_numpad").append(''+
                '<form id="'+form_name+'" autocomplete="off">'+
                    '<input type="password" class="hdfield" id="passcode_field" style="color:#000;">'+
                    '<div id="keyboard"></div>'+
                '</form>');
                def.resolve();
            },100);
            return def.promise();
        }

        var WindowPopupPasscode = function(header_title){
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-numpad-passcode").jqxWindow({
                    height: 450,
                    minWidth: 300,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
                    resizable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                $('#dialog-numpad-passcode').jqxWindow('setTitle', header_title);
                $('#dialog-numpad-passcode').jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }

        var NumpadPasscode = function(form_name){
            var def = $.Deferred();
            populateNumpadPasscode(form_name)
            .then(function(){
                $('#keyboard').hdkeyboard({
                    layout: "numbers_only",
                    input: $('#passcode_field')
                });
                setTimeout(function(){
                    $("#number_field").focus();
                    def.resolve();
                },100);
            });
            return def.promise();
        }

        var populateNumpadAlert = function(form_name, msg){
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert-msg-popup").append('<div id="alert-msg-popup-container" style="background: #144766; color:#EEE;"></div>')
                $("#alert-msg-popup-container").html('');
                $("#alert-msg-popup-container").append(''+
                '<form id="'+form_name+'">'+
                    '<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
                    '<h4>'+msg+'</h4>'+
                    '<br/>'+
                    '<div id="keyboard_alert"></div>'+
                '</form>');
                def.resolve();
            },100);
            return def.promise();
        }

        var WindowPopupAlert = function(header_text){
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert-msg-popup").jqxWindow({
                    height: 260,
                    minWidth: 350,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
                    resizable: false,
                    draggable: false
                });
                setTimeout(function(){
                    $('#alert-msg-popup').jqxWindow('setTitle', header_text);
                    $('#alert-msg-popup').jqxWindow('open');
                },100);

                def.resolve();
            },100);
            return def.promise();
        }

        var NumpadAlertOk = function(form, msg){
            var def = $.Deferred();
            populateNumpadAlert(form, msg)
            .then(function(){
                $('#keyboard_alert').hdkeyboard({
                    layout: "alert_ok",
                    input: $('#number_field')
                });
                def.resolve();
            });
            return def.promise();
        }

        var CheckUserManager = function(FunctionButton, RedirectPage, Title, FunctionName, Label){
            var postdata ="FunctionButton="+FunctionButton;
                postdata+="&FunctionLabel="+Label;
            $.ajax({
                type: "POST",
                url: base_url+"backoffice/dashboard/check-user-manager",
                data: postdata,
                dataType: "json",
                success: function(data){
                    if(data.prompt){
                        NumpadPasscode("EnterPassCode")
                        .then(function(){
                            WindowPopupPasscode(Title + " | Enter Passcode")
                            .then(function(){
                                $("#passcode_field").focus();
                            })
                        })
                    }else{
                        if(FunctionButton == 'Cashier'){
                            $.ajax({
                                url : base_url + 'backoffice/cache/data',
                                method: 'get',
                                type: 'json',
                                success: function(data){
                                    window.location = base_url + RedirectPage;
                                }
                            })
                        }else{
                            window.location = base_url + RedirectPage;
                        }
                    }
                }
            })
            setTimeout(function(){
                FunctionName();
            },1000)
        }

        //-->Passcode Enter button
        $(document).on("submit", "#EnterPassCode", function(event){
            event.preventDefault();
            var passcode = $("#passcode_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&FunctionButton="+FunctionButton;
            $.ajax({
                type: "POST",
                url: base_url+'backoffice/dashboard/passcode',
                data: postdata,
                dataType: "json",
                beforeSend: function(){

                },
                success: function(data){
                    if(data.success){
                        if(data.login){
                            $('#dialog-numpad-passcode').jqxWindow('close');
                            setTimeout(function(){
                                window.location = base_url+RedirectPage;
                            },500);
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow('close');
                            var msg = data.msg;
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');
                            });
                        }
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow('close');
                        var msg = data.msg;
                        NumpadAlertOk('invalid_passcode', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');
                        });
                    }
                }
            })
        })
        //-->Passcode Exit button
        $(document).on("click", "#EnterPassCode .exit", function(event){
            event.preventDefault();
            $('#dialog-numpad-passcode').jqxWindow('close');
        })

        //-->Alert message Ok button
        $(document).on("click", "#invalid_passcode .alert_okay", function(event){
            event.preventDefault();
            $('#alert-msg-popup').jqxWindow('close');
        })

        //-->Function Buttons
        /* Cashier Button */
            
        <?php
            $route = json_decode($route);
            foreach($route as $item): 
                if($item->Function =='TimeSheet'){
                    $function = 'TimeClock';
                }elseif($item->Function =='MenuV2'){
                    $function = 'Menu';
                }else{
                    $function = $item->Function;
                }
                if($item->Function != 'TimeClockInOut'){?>
                var <?= 'ReloadFunction'.$function ?> = function(){
                    $("#<?= $item->Function ?>").one('click', function(){
                        FunctionButton  = '<?= $function ?>';
                        RedirectPage    = '<?= $item->Route ?>';
                        Title           = '<?= $function ?>';
                        Label           = '<?= $item->Label ?>';   
                        CheckUserManager(FunctionButton, RedirectPage, Title, <?= 'ReloadFunction'.$function ?>, Label);
                    })
                }
                <?= 'ReloadFunction'.$function ?>();
                <?php }
            endforeach; 
        ?>
 
        /**
         * Time Clock Quick Button in Back office
        */
        var TimeClockInOutFunction = function(){
            $("#TimeClockInOut").one('click', function(){
                NumpadPasscode("timeclock_in_out")
                .then(function(){
                    WindowPopupPasscode("Clock In Out | Enter Passcode")
                    .then(function(){
                        $("#passcode_field").focus();
                    })
                })
                setTimeout(function(){
                    TimeClockInOutFunction();
                },1000)
            })
        }

        TimeClockInOutFunction();

        
        /** Check user timeclock function
         * @param UserId as int
         */
        var TimeClockCheck = function(UserId){
            var def = $.Deferred();
            var postdata="UserUnique="+UserId;
                postdata+="&Status=1";
            $.ajax({
                type: 'POST',
                url: base_url + 'backoffice/timeclock-quick/user/check',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }
        /** Save timeclock function
         * @param UserId as int
         * @param UserName as string
         */
        var TimeClockSave = function(UserId, UserName, Comment, Position, Department){
            var def = $.Deferred();
            var postdata ="UserUnique="+UserId;
                postdata+="&UserName="+UserName;
                postdata+="&ClockInComment="+Comment;
                postdata+="&Position="+Position;
                postdata+="&Department="+Department;
            $.ajax({
                type: 'POST',
                url: base_url+'backoffice/timeclock-quick/user/save',
                data: postdata,
                dataType: "json",
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }
        
        /** Update Timeclock function
         * @param postdata string
         */
        var TimeClockUpdate_Original = function(postdata){
            var def = $.Deferred();
            $.ajax({
                type: 'POST',
                url: base_url + 'backoffice/timeclock-quick/user/update',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }

        var TimeClockUpdate = function(postdata){
            var def = $.Deferred();
            $.ajax({
                type: 'POST',
                url: base_url + 'backoffice/timeclock-quick/user/server-update',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }
        
        /** Enter Timeclock user passcode function
         * @param postdata as string
         */
        var TimeClockPasscode_original = function(postdata){
            var def = $.Deferred();
            $.ajax({
                type: 'POST',
                url: base_url+'backoffice/timeclock-quick/user/passcode',
                data: postdata,
                dataType: "json",
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }

        var TimeClockPasscode = (postdata) => {
            var def = $.Deferred();
            $.ajax({
                url: base_url + 'backoffice/timeclock-quick/user/passcode',
                type: 'POST',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status, thrownError);
                }
            })

            return def.promise();
        }
        
        //-->Process TimeClock Original Clock In and Out
        $(document).on('submit', '#timeclock_in_out_original', function(e){
            e.preventDefault();
            var passcode = $("#passcode_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&Function=TimeClock";
            //-->Check the passcode of user
            TimeClockPasscode(postdata)
            .then(function(data){
                if(data.success){
                    //-->Check clock punch In and Out
                    TimeClockCheck(data.info.Unique)
                    .then(function(result){
                        //-->If Status = 0 it will clock In
                        if(result.Status == 0){
                            //-->Save time clock punch In
                            TimeClockSave(data.info.Unique, data.info.UserName)
                            .then(function(result2){
                                if(result.ClockInComment == 1){
                                    //-->Open comment window based on the setting BackOfficeClockInComment = 1
                                    CommentBox('timeclockin_comment', result2.Unique, )
                                    .then(function(){
                                        WindowComment('Time clock Comment')
                                        .then(function(){
                                            globalTimeclockMsgResult ='<div align="center">'+capitalizeFirstLetter(data.info.UserName)+'</div><br/>';
                                            globalTimeclockMsgResult+='<div align="center">'+result2.curDateTime+'</div><br>';
                                            globalTimeclockMsgResult+='<div align="center" style="color:#FF0000;">Clock In</div>';		
                                            $("#text_field").focus();
                                        })
                                    })
                                }else{
                                    //-->Alert message after time clock punch In
                                    var msg ='<div align="center">'+capitalizeFirstLetter(data.info.UserName)+'</div><br/>';
                                        msg+='<div align="center">'+result.curDateTime+'</div><br>';
                                        msg+='<div align="center" style="color:#FF0000;">Clock In</div>';				
                                    NumpadAlertOk('time_clock_in_out', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                                    });
                                }
                            })
                        }else{
                            //-->If Status = 1 then will clock Out
                            if(result.ClockInComment == 1){
                                var postdata ="Unique="+result.data.Unique;
                                    postdata+="&DateIn="+result.data.DateIn;
                                    postdata+="&TimeIn="+result.data.TimeIn;
                                TimeClockUpdate(postdata)
                                .then(function(result3){
                                    globalPrintTimeclockCheck = result.data.Unique;
                                    //-->Open comment window based on the setting BackOfficeClockInComment = 1
                                    CommentBox('timeclockout_comment', result.data.Unique)
                                    .then(function(){
                                        WindowComment('Time clock Comment')
                                        .then(function(){
                                            globalTimeclockMsgResult ='<div align="center">'+capitalizeFirstLetter(data.info.UserName)+'</div><br/>';
                                            globalTimeclockMsgResult+='<div align="center">'+result.curDateTime+'</div><br>';
                                            globalTimeclockMsgResult+='<div align="center" style="color:#FF0000;">Clock Out</div>';		
                                            $("#text_field").focus(); 
                                        })
                                    })
                                })
                            }else{
                                //-->BackOfficeClockInComment = 0
                                var postdata ="Unique="+result.data.Unique;
                                    postdata+="&DateIn="+result.data.DateIn;
                                    postdata+="&TimeIn="+result.data.TimeIn;
                                TimeClockUpdate(postdata)
                                .then(function(result3){
                                    var msg = '<div align="center">'+capitalizeFirstLetter(data.info.UserName)+'</div><br/>';
                                        msg+= '<div align="center">'+result.curDateTime+'</div><br>';
                                        msg+= '<div align="center" style="color:#FF0000;">Clock Out</div>';
                                    NumpadAlertOk('time_clock_out', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                                    });
                                    //-->Print Time clock receipt based on the setting BackOfficeClockOutPrint = 1 
                                    if( result.ClockPrintReceipt == 1 ){
                                        PrinterCheckTimeClock(result.data.Unique);
                                    }
                                })
                            }
                        }
                    })                        
                }else{
                    //-->Invalid passcode
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = data.msg;	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
            $("#dialog-numpad-passcode").jqxWindow('close');
        })

        //-->Process TimeClock New Clock In and Out
        var TimeClockInCount = 0;
        var TimeClockMultipleListView = '';
        $(document).on('submit', '#timeclock_in_out', function(e){
            e.preventDefault();
            var passcode = $("#passcode_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
                postdata+="&Function=TimeClock";
            //-->Check the passcode of user
            TimeClockPasscode(postdata)
            .then(function(data){
                if(data.success){
                    //-->Check clock punch In and Out
                    TimeClockCheck(data.info.Unique)
                    .then(function(result){
                        //-->If Status = 0 it will clock In
                        if(result.Status == 0){
                            //-->Time clock punch In
                            CommentBox('timeclock_save', data.info.Unique, null)
                            .then(function(){
                                var ConfigPositionUnique = (data.info.Position ? data.info.Position : data.info.ConfigPositionUnique);
                                $("#TimeClockUserUnique").text(data.info.Unique);
                                $("#UserDepartment").val(data.info.Department);
                                $("#clockfieldname").text(data.info.UserName);
                                $("#clockfieldposition").val(ConfigPositionUnique);
                                $("#clockfieldinout").jqxDropDownList('val', 'In');
                                $("#clockfieldinout").jqxDropDownList('disabled', true);
                                $("#timeclock_in_out").text('Clock In');
                                WindowComment(data.info.Unique);
                            })
                        }else{
                            //-->If Status = 1 then time clock Out
                            // if(result.Count > 1){
                            //     ShowMultipleTimeClockList(result.html);
                            //     return false;
                            // }

                            TimeClockInCount = result.Count;
                            TimeClockMultipleListView = result.html;

                            CommentBox('timeclock_save', data.info.Unique, result.data.Unique)
                            .then(function(){
                                $("#ClockOutUnique").val(result.data.Unique);
                                $("#TimeClockUserUnique").text(result.data.User);
                                $("#clockfieldname").text(result.data.UserName);
                                $("#clockfieldposition").val(result.data.Position);
                                setTimeout(function(){
                                    $("#clockfieldposition").jqxComboBox({disabled : true});
                                },100)
                                $("#clockfieldinout").jqxDropDownList('val', 'Out');
                                $("#timeclock_in_out").text('Clock Out');
                                
                                $("#clockinout").append('<div style="float:left; font-size: 14px; font-style: italic; font-weight: bold; width: 70%; color: #FF0000; margin: 5px 0 0 5px;" id="timeclock_actual_clockin">Actual Clock In: '+result.actual_clockindate+' '+result.actual_clockintime+'</div>');
                                WindowComment(data.info.Unique);
                            })
                        }
                    })                        
                }else{
                    //-->Invalid passcode
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = data.msg;	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
            $("#dialog-numpad-passcode").jqxWindow('close');
        })


        $(document).on('submit', '#timeclock_save', function(e){
            e.preventDefault();
            var TimeClockStatus = $("#clockfieldinout").val();
            if(TimeClockStatus == 'In'){
                var TimeClockUserUnique = $("#TimeClockUserUnique").text();
                var TimeClockDepartment = $("#UserDepartment").val();
                var TimeClockUserName   = $("#clockfieldname").text();
                var TimeClockComment    = $("#clockfieldnote").val();
                var TimeClockPosition   = $("#clockfieldposition").val();
                TimeClockSave(TimeClockUserUnique, TimeClockUserName, TimeClockComment, TimeClockPosition, TimeClockDepartment)
                .then(function(result){
                    var msg = '<div align="center">'+capitalizeFirstLetter($("#clockfieldname").text())+'</div><br/>';
                        msg+= '<div align="center">'+result.curDateTime+'</div><br>';						
                        msg+= '<div align="center" style="color:#fff;">Clock In</div>';
                    NumpadAlertOk('time_clock_out', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                    });

                    $("#dialog-comment-box").jqxWindow('close');                    
                })
            }else if(TimeClockStatus == 'Out'){

                if(TimeClockInCount > 1){
                    ShowMultipleTimeClockList(TimeClockMultipleListView);
                    return false;
                }                

                var ClockOutUnique = $("#ClockOutUnique").val();
                var postdata ="Unique="+ClockOutUnique;
                    postdata+="&ClockOutComment="+$("#clockfieldnote").val();
                TimeClockUpdate(postdata)
                .then(function(result){
                    var msg = '<div align="center">'+capitalizeFirstLetter($("#clockfieldname").text())+'</div><br/>';
                        msg+= '<div align="center">'+result.curDateTime+'</div><br>';						
                        msg+= '<div align="center" style="color:#fff;">Clock Out</div>';							
                    NumpadAlertOk('time_clock_out', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                    });
                    //-->Print Time clock receipt based on the setting BackOfficeClockOutPrint = 1 
                    if( result.ClockPrintReceipt == 1 ){
                        PrinterCheckTimeClock(ClockOutUnique);
                    }

                    $("#dialog-comment-box").jqxWindow('close'); 
                })
            }
        })

        $(document).on('click', '#timeclock_cancel', function(e){
            e.preventDefault();
            $("#dialog-comment-box").jqxWindow('close');
        })

        $(document).on('click', '#timeclock_window_close', function(e){
            e.preventDefault();
            $("#dialog-comment-box").jqxWindow('close');
        })


        //-->Print Time clock receipt function
        var PrintTimeClockReceipt = function(postdata){
            var def = $.Deferred();
            $.ajax({
                type: 'POST',
                url: base_url + 'backoffice/timeclock-quick/user/print',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                } 
            })
            return def.promise();
        }
        
        //-->Check Printer status before print the receipt.
        var globalPrintTimeclockCheck = '';
        var PrinterCheckTimeClock = function(unique){
            var postdata="unique="+unique;
            PrintTimeClockReceipt(postdata)
            .then(function(result){
                if(result.success == true){
                    if(result.print == true){
                        //Receipt Print
                    }else{
                        var msg="Printer error, please check <br/>";
                        msg+="1. Printer is turned on. <br/>";
                        msg+="2. Check printer paper. <br/>";
                        msg+="3. Restart printer.";
                        NumpadAlertOk('printer_error', msg)
                        .then(function(){
                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                        })
                    }
                }
            })
        };
        //-->Close alert message popup
        $(document).on('click', '#time_clock_in_out', function(){
            $("#alert-msg-popup").jqxWindow('close');
        })
        //-->Cancel enter passcode
        $(document).on('click', '#timeclock_in_out .exit', function(e){
            e.preventDefault();
            $("#dialog-numpad-passcode").jqxWindow('close');
        })
        //-->Dynamically creating a form for Comment Box
        var populateCommentBox_original = function(form_name, unique){
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-comment-box").append('<div id="dialog-comment-box-container" style="background: #144766; color:#EEE;" />');
                $("#dialog-comment-box-container").html('');
                $("#dialog-comment-box-container").append(''+
                    '<form id="'+form_name+'">'+
                        '<textarea class="form-control"  id="text_field" style="color:#000;" rows="5" PlaceHolder="Type your comment here"></textarea>'+
                        '<input type="text" id="search_field" style="color:#000; display:none;">'+
                        '<div id="keyboard_comment_box"></div>'+
                        '<input type="hidden" id="timeclock_unique" value="'+unique+'"/>'+
                    '</form>');
                def.resolve();
            },100);
            return def.promise();
        }

        var populateCommentBox = (form, unique, id) => {
            var timeclock_curtime = "<?php echo date("h:i A")?>";
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-comment-box").append('<div id="dialog-comment-box-container" style="background: #144766; color:#fff; overflow: hidden;" />');
                $("#dialog-comment-box-container").html('');
                $("#dialog-comment-box-container").append(
                    '<form id="'+form+'">'+
                        '<div style="width:20%; height: 220px; float:left; border: 1px solid #333; background: #5372BF;">'+
                            // '<div class="clockformlabel">ID:</div>'+
                            '<div class="clockformlabel">Name:</div>'+
                            '<div class="clockformlabel">Position:</div>'+
                            '<div class="clockformlabel">Date:</div>'+
                            // '<div class="clockformlabel">Time:</div>'+
                            '<div class="clockformlabel">In/Out:</div>'+
                            '<div class="clockformlabel" style="border-bottom: none !important;">Note:</div>'+
                        '</div>'+
                        '<div style="width:80%; height: 220px; float:left; border: 1px solid #333; background: #FAF7F7;">'+
                            // '<div class="clockformfields"><label for="clockfieldid" id="clockfieldid"></label></div>'+
                            '<div class="clockformfields"><label for="clockfieldname" id="clockfieldname"></label></div>'+
                            // '<div class="clockformfields"><label for="clockfieldposition" id="clockfieldposition"></label></div>'+
                            '<div class="clockformfields"> <div id="clockfieldposition"></div> </div>'+
                            '<div class="clockformfields" style="padding: 1px !important;"><div id="clockfielddate"></div></div>'+
                            // '<div class="clockformfields" style="padding: 1px !important;"><div id="clockfieldtime"></div></div>'+
                            '<div class="clockformfields" style="padding: 1px !important;" id="clockinout"><div id="clockfieldinout" style="float:left;"></div></div>'+
                            '<div class="clockformfields" style="padding: 1px !important; border-bottom: none;"><div id="clockfieldnote"></div></div>'+
                        '</div>'+
                        '<div class="clockfunctionbutton">'+
                            '<button type="button" class="btn btn-warning btn-lg" id="timeclock_cancel">Cancel</button>&nbsp;&nbsp;'+
                            '<button class="btn btn-primary btn-lg" id="timeclock_in_out">Clock In</button>'+
                        '</div>'+
                        '<input type="hidden" id="ClockOutUnique" />'+
                        '<input type="hidden" id="TimeClockUserUnique" />'+
                        '<input type="hidden" id="UserDepartment" />'+
                    '</form>'
                );

                $("#clockfielddate").jqxDateTimeInput({formatString: 'MM/dd/yy', width: '150px', height: '25px', disabled: true });
            
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'Name' }
                    ],
                    url: base_url + 'backoffice/timeclock/getpositions/'+unique+"/"+id,
                    // async: false
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#clockfieldposition").jqxComboBox({placeHolder: 'Select position', source: dataAdapter, displayMember: "Name", valueMember: "Unique", width: 150, height: 25});
                // $("#clockfieldtime").jqxDateTimeInput({formatString: 'HH:mm tt', showTimeButton: true, showCalendarButton: false, width: '200px', height: '25px', disabled: true });
                // $("#clockfieldtime").jqxDateTimeInput('setDate', timeclock_curtime);
                var source = [
                    'In','Out'
                ]
                $("#clockfieldinout").jqxDropDownList({selectedIndex: 0, source: source, width: 150, height: 25});
                $("#clockfieldinout").on('change', function (event)
                {     
                    var args = event.args;
                    if (args) {
                        
                        // index represents the item's index.                      
                        var index = args.index;
                        var item = args.item;
                        // get item's label and value.
                        var label = item.label;
                        var value = item.value;
                        var type = args.type; // keyboard, mouse or null depending on how the item was selected.

                        $("#timeclock_in_out").text('Clock ' + value);
                        
                        if(value == 'Out' && $("#timeclock_actual_clockin").length > 0 ){
                            $("#timeclock_actual_clockin").show();
                            $("#clockfieldposition").jqxComboBox({disabled : true});
                        }else{
                            $("#timeclock_actual_clockin").hide();
                            $("#clockfieldposition").jqxComboBox({disabled : false});
                        }
                    } 
                });

                $('#clockfieldnote').jqxTextArea({ placeHolder: 'Enter note', height: 90, width: '99%', minLength: 1 });
                def.resolve();
            },100);
            return def.promise();
        }

        //-->Window comment properties and function to open it.
        var WindowComment = function(employeeId){
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-comment-box").jqxWindow({
                    height: 380,
                    width: 680,
                    title: '<button id="timeclock_window_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;" title="Close"></button>&nbsp;Time Clock In/Out | Employee ID '+employeeId,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: false,
                    resizable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                $('#dialog-comment-box').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
        }
        //-->Form CommentBox function
        var CommentBox = function(form_name, unique, id){
            var def = $.Deferred();
            populateCommentBox(form_name, unique, id)
            .then(function(){
                $('#keyboard_comment_box').hdkeyboard({
                    layout: "custom7",
                    input: $('#search_field')
                });
                setTimeout(function(){
                    $("#text_field").focus();
                    def.resolve();
                },100);
            });
            return def.promise();
        }
        //-->Capitalize first letter
        var capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        //-->Close alert msg popup
        $(document).on('click', '#time_clock_out', function(e){
            e.preventDefault();
            $("#alert-msg-popup").jqxWindow('close');
        })
        //-->Save time clock comment function
        var SaveTimeClockComment = function(postdata){
            var def = $.Deferred(); 
            $.ajax({
                type: 'POST',
                url: base_url + 'backoffice/timeclock-quick/user/comment-save',
                data: postdata,
                dataType: 'json',
                success: function(data){
                    def.resolve(data);
                }
            })
            return def.promise();
        }
        //-->Submit form of Clockin comment thru Ok button
        var globalTimeclockMsgResult = '';
        $(document).on("click", "#timeclockin_comment .timeclock_ok", function(e){
            e.preventDefault();
            var Unique = $("#timeclock_unique").val();
            var postdata ="Unique="+Unique;
                postdata+="&ClockInComment="+$("#text_field").val();
                postdata+="&ClockStatus=1";
            SaveTimeClockComment(postdata)
            .then(function(result){
                $('#dialog-comment-box').jqxWindow('close');
                NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                });
            })
        })
        //-->Submit form of Clockout comment thru Ok button
        $(document).on("click", "#timeclockout_comment .timeclock_ok", function(e){
            e.preventDefault();
            var Unique = $("#timeclock_unique").val();
            var postdata ="Unique="+Unique;
                postdata+="&ClockInComment="+$("#text_field").val();
                postdata+="&ClockStatus=2";
            SaveTimeClockComment(postdata)
            .then(function(data){
                if(data.ClockOutPrint == 1){
                    PrinterCheckTimeClock(globalPrintTimeclockCheck);
                }

                $('#dialog-comment-box').jqxWindow('close');
                NumpadAlertOk('time_clock_out', globalTimeclockMsgResult)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                });
            })
        })

        if( $("#Cashier").length <= 0 ){
            $("#logologo").removeAttr("href");
        }

        var populateTimeClockMultipleList = (strList) => {
            var def = $.Deferred();
            setTimeout(function(){
                $("body").append(
                    '<div id="timeclock_multiple_list" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;">'+
                        '<div id="timeclock_multiple_list_container" style="background: #144766; color:#EEE;">'+
                            '<div id="timeclock_list" style="width:100%; background: #fff; height: 180px; padding: 5px;"></div>'+
                            '<div id="timeclock_list_function" style="position:absolute; bottom: 0; width: 100%; padding: 5px; overflow: auto;">'+
                            '<button type="button" id="timeclock_multiple_list_cancel" class="btn btn-danger btn-lg" style="margin: 5px !important;">Cancel</button>'+
                                '<button type="button" id="timeclock_multiple_list_select" class="btn btn-primary btn-lg" style="margin: 5px !important;">Clock out</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );
                $("#timeclock_list").html('');
                $("#timeclock_list").append(strList);

                def.resolve();
            },100)

            return def.promise();
        }

        var WindowTimeClockMultipleListWindow = () => {
            var def = $.Deferred();
            $("#timeclock_multiple_list").jqxWindow({
                height: 300,
                width: 400,
                isModal: true,
                theme: 'darkblue',
                title: 'Time clock position list',
                showCloseButton: true,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
            })
            setTimeout(function(){
                $("#timeclock_multiple_list").jqxWindow('open');

                $("#timeclock_multiple_list").on('close', function(){
                    $("#timeclock_multiple_list").jqxWindow('destroy');
                    $("#timeclock_multiple_list").remove();
                })

                def.resolve();
            },100);
            return def.promise();
        }

        var ShowMultipleTimeClockList = (strList) => {
            populateTimeClockMultipleList(strList)
            .then(function(){
                WindowTimeClockMultipleListWindow();
            })
        }
 
        $(document).on('click', '#timeclock_multiple_list_select', function(){
            var TimeClockMultipleId = $('input[type=radio][name=group1]:checked').attr('id');

            if(TimeClockMultipleId){

                var ClockOutUnique = $("#ClockOutUnique").val();
                var postdata ="Unique="+TimeClockMultipleId;
                    postdata+="&ClockOutComment="+$("#clockfieldnote").val();
                TimeClockUpdate(postdata)
                .then(function(result){
                    var msg = '<div align="center">'+capitalizeFirstLetter($("#clockfieldname").text())+'</div><br/>';
                        msg+= '<div align="center">'+result.curDateTime+'</div><br>';						
                        msg+= '<div align="center" style="color:#fff;">Clock Out</div>';							
                    NumpadAlertOk('time_clock_out', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
                    });
                    //-->Print Time clock receipt based on the setting BackOfficeClockOutPrint = 1 
                    if( result.ClockPrintReceipt == 1 ){
                        PrinterCheckTimeClock(ClockOutUnique);
                    }

                    $("#timeclock_multiple_list").jqxWindow('close');
                    $("#dialog-comment-box").jqxWindow('close'); 
                })

                return false;
            }else{
                var msg = "Please select position";	
                NumpadAlertOk('timeclockmultiple_select', msg)
                .then(function(){
                    WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                })
            }
        })

        $(document).on('click', "#timeclockmultiple_select", function(){
            $("#alert-msg-popup").jqxWindow('close');
        })

        $(document).on('click', '#timeclock_multiple_list_cancel', function(){
            $("#timeclock_multiple_list").jqxWindow('close');
        })

        $("#email").on('click', function(){
            window.location = base_url + 'backoffice/email';
        })

    })
</script>
<div class="container-fluid">
	<div class="row">
        <div class="col-md-12 col-md-offset-0">
            <div class="panel panel-primary">
                <div class="panel-heading">&nbsp;<span id="email" class="glyphicon glyphicon-envelope" title="Email"></span></div>
                <div class="panel-body">
                    <div class="col-md-12">
                        <div class="icon-handler">

                            <?php
                            $Menu = json_decode($Menu);
                            foreach($Menu as $item): 
                                if($item->Function == 'POSCashier'){
                                    $POSDisable = $this->session->userdata("POSDisable");
                                    if ($POSDisable == 1) :
                            ?>
                                    <?php
                                    else :
                                    ?>
                                    <div class="icon">
                                        <!--<a href="<?php //echo base_url("pos/cashier")?>">-->
                                        <a id="<?= $item->Function ?>" class="DashboardButtons">
                                            <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/<?= $item->Function ?>.png">
                                            <span class="mlabel"><?= $item->Label ?></span>
                                        </a>
                                    </div>

                                    <?php
                                    endif;
                                    ?>

                            <?php }else{ ?>
                               <div class="icon">
                                    <!--<a href="<?php //echo base_url("pos/cashier")?>">-->
                                    <a id="<?= $item->Function ?>" class="DashboardButtons">
                                        <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/<?= $item->Function ?>.png">
                                        <span class="mlabel"><?= $item->Label ?></span>
                                    </a>
                                </div>
                            <?php }?>

                            <?php  endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>
<?php /* Passcode */ ?>
<div id="dialog-numpad-passcode" style="display:none;"></div>
<?php /* Alert message */ ?>
<div id="alert-msg-popup" style="display:none;"></div>
<?php /*Comment Box*/ ?>
<div id="dialog-comment-box" style="display:none; background: #144766; color: #EEE; box-shadow: 5px 5px 10px #000;"></div>

<style type="text/css">
    #email.glyphicon{
       font-size: 30px;
       cursor: pointer;
    }

	body{
		padding:0;
		margin:0;
	}

    .panel-body {
        background:#F8F8F8;
    }

    div.icon {
        float: left;
        margin-bottom: 15px;
        margin-right: 15px;
        text-align: center;
    }

    div.icon a {
        background-color: #fff;
        background-position: -30px center;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: #565656;
        display: block;
        float: left;
        height: 97px;
        text-decoration: none;
        transition-duration: 0.8s;
        transition-property: background-position, -moz-border-radius-bottomleft, -moz-box-shadow;
        vertical-align: middle;
        width: 108px;
        font-size: smaller;
    }

    div.icon {
        text-align: center;
    }

    .mlabel {
        display: block;
        text-align: center;
		font-weight:bolder;
    }

    a:link {
        color: #025a8d;
        outline: medium none;
        text-decoration: none;
    }

    div.icon img {
        margin: 0 auto;
        padding: 10px 0;
    }

    a, img {
        margin: 0;
        padding: 0;
    }

    .DashboardButtons{
        cursor: pointer;
    }

    /* NumPad CSS */
    #passcode_field{
        display: block;
        margin: 0 auto;
        padding: 5px 10px;
        font-size: 18px;
        width: 100%;
        text-align:right;
        border-radius:5px;
    }

    /*
    *Clock form label
    */
    .clockformlabel {
        width: 100%;
        border-bottom: 1px solid #BDCBEE;
        text-align: right;
        font-size: 16px;
        padding: 10px 0 0 0;
        margin: 5px 0 0 0 0;
    }

    .clockformlabel label {
        margin: 0 10px 0 0 !important;
    }

    .clockformfields{
        width: 100%;
        border-bottom: 1px solid #EEEBEB;
        text-align: left;
        padding: 10px 0 0 0;
        margin: 0px 0 0 0 0;
        font-size: 16px;
        color: #000;
    }

    .clockfunctionbutton{
        position: absolute;
        bottom: 0;
        text-align: right;
        padding: 10px;
        width: 100%;
    }    

    input[type=radio] {
        display: none;
    }

    input[type=radio] + span {
        display: inline-block;
        border: 1px solid #000;
        background-color: #fff; 
        border-radius: 50%;
        margin: 0 0.5em;
    }

    input[type=radio]:checked + span {
        background-color: #F00;
        border: 1px solid #fff;
    }

    .radio4 {
        width: 2em;
        height: 2em;
    }

    .reason-label{
        font-size: 2em;
        color: #004a73;
    }


</style>
