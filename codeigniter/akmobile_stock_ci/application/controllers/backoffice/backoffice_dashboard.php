<?php
plugin_security();
?>
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

        var CheckUserManager = function(FunctionButton, RedirectPage, Title){
            var postdata ="FunctionButton="+FunctionButton;
            $.ajax({
                type: "POST",
                url: base_url+"backoffice/dashboard/check-user-manager",
                data: postdata,
                dataType: "json",
                beforeSend: function(){

                },
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
                        window.location = base_url + RedirectPage;
                    }
                }
            })
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
        $("#POSCashier").click(function(){
            FunctionButton  = 'Cashier';
            RedirectPage    = 'pos/cashier';
            Title           = 'Cashier';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Customer").click(function(){
            FunctionButton  = 'Customer';
            RedirectPage    = 'backoffice/customer/index';
            Title           = 'Customer';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Supplier").click(function(){
            FunctionButton  = 'Supplier';
            RedirectPage    = 'backoffice/suppliers/index';
            Title           = 'Supplier';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Category").click(function(){
            FunctionButton  = 'Category';
            RedirectPage    = 'backoffice/itemcategory/index';
            Title           = 'Category';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Items").click(function(){
            FunctionButton  = 'Items';
            RedirectPage    = 'backoffice/item/index';
						 //-->Original  RedirectPage    = 'dashboard/items';
            Title           = 'Items';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Barcode").click(function(){
            FunctionButton  = 'Barcode';
            RedirectPage    = 'backoffice/barcode/print';
            Title           = 'Barcode';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Count").click(function(){
            FunctionButton  = 'Count';
            RedirectPage    = 'dashboard/items/count';
            Title           = 'Count';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Menu").click(function(){
            FunctionButton  = 'Menu';
            RedirectPage    = 'dashboard/admin/menu';
            Title           = 'Menu';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Purchase").click(function(){
            FunctionButton  = 'Purchase';
            RedirectPage    = 'backoffice/purchase/index';
            Title           = 'Purchase';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Transfer").click(function(){
            FunctionButton  = 'Transfer';
            RedirectPage    = 'backoffice/item_transfer/index';
            Title           = 'Transfer';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#TimeClock").click(function(){
            FunctionButton  = 'TimeClock';
            RedirectPage    = 'backoffice/timeclock/index';
            Title           = 'TimeClock';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })
		
		$("#TimeClockv2").click(function(){
            FunctionButton  = 'TimeClock';
            RedirectPage    = 'backoffice/newtimeclock/index';
            Title           = 'TimeClock';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Reports").click(function(){
            FunctionButton  = 'Reports';
            RedirectPage    = 'backoffice/reports/get';
            Title           = 'Reports';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        $("#Administration").click(function(){
            FunctionButton  = 'Administration';
            RedirectPage    = 'dashboard/admin';
            Title           = 'Administration';
            CheckUserManager(FunctionButton, RedirectPage, Title);
        })

        /**
         * Time Clock Quick Button in Back office
         */
        $("#TimeClockInOut").click(function(){
            NumpadPasscode("timeclock_in_out")
            .then(function(){
                WindowPopupPasscode("Clock In Out | Enter Passcode")
                .then(function(){
                    $("#passcode_field").focus();
                })
            })
        })
        
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
        var TimeClockSave = function(UserId, UserName){
            var def = $.Deferred();
            var postdata ="UserUnique="+UserId;
                postdata+="&UserName="+UserName;
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
        var TimeClockUpdate = function(postdata){
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
        
        /** Enter Timeclock user passcode function
         * @param postdata as string
         */
        var TimeClockPasscode = function(postdata){
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
        
        //-->Process TimeClock New Clock In and Out
        $(document).on('submit', '#timeclock_in_out', function(e){
            e.preventDefault();
            var passcode = $("#passcode_field").val();
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata="passcode="+hashpasscode;
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
                                    CommentBox('timeclockin_comment', result2.Unique)
                                    .then(function(){
                                        WindowComment('Time clock Comment')
                                        .then(function(){
                                            
                                            globalTimeclockMsgResult ='<div align="center">'+capitalizeFirstLetter(data.info.UserName)+'</div><br/>';
                                            globalTimeclockMsgResult+='<div align="center">'+result2.curDateTime+'</div><br>';
                                            globalTimeclockMsgResult+='<div align="center" style="color:#FF0000;">Clock In</div>';		
                                            $("#text_field").focus(); 
                                            // $("#clockfieldinout").jqxDropDownList({ disabled: true }); 
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
                    var msg = 'Invalid code';	
                    NumpadAlertOk('invalid_passcode', msg)
                    .then(function(){
                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    })
                }
            })
            $("#dialog-numpad-passcode").jqxWindow('close');
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
        var populateCommentBox = function(form_name, unique){
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
        //-->Window comment properties and function to open it.
        var WindowComment = function(header_title){
            var def = $.Deferred();
            setTimeout(function(){
                $("#dialog-comment-box").jqxWindow({
                    height: 290,
                    width: 390,
                    title: header_title,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: true,
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
        var CommentBox = function(form_name, unique){
            var def = $.Deferred();
            populateCommentBox(form_name, unique)
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
            SaveTimeClockComment()
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
    })
</script>
<div class="container-fluid">
	<div class="row">
        <div class="col-md-12 col-md-offset-0">
            <div class="panel panel-primary">
                <div class="panel-heading">&nbsp;</div>
                <div class="panel-body">
                    <div class="col-md-12">
                        <div class="icon-handler">
                            <?php
                            $POSDisable = $this->session->userdata("POSDisable");
                            if ($POSDisable == 1) :
                            ?>
                            <?php
                            else :
                            ?>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url("pos/cashier")?>">-->
                                <a id="POSCashier" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/cashier.png">
                                    <span class="mlabel">CASHIER</span>
                                </a>
                            </div>
                            <?php
                            endif;
                            ?>

                            <div class="icon">
                                <!--<a href="<?php //echo base_url("dashboard/admin/customers")?>">-->
                                <a id="Customer" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/customer.png">
                                    <span class="mlabel">CUSTOMER</span>
                                </a>
                            </div>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url()."backoffice/supplier"?>">-->
                                <a id="Supplier" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/supplier.png">
                                    <span class="mlabel">SUPPLIER</span>
                                </a>
                            </div>
                            <div class="icon">
								<!--<a href="<?php //echo base_url("backoffice/itemcategory/index")?>">-->
                                <a id="Category" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/category.png">
                                    <span class="mlabel">CATEGORY</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/item/index")?>">-->
                                <a id="Items" class="DashboardButtons">
                                    <img width="48" src="<?php echo base_url() ?>assets/img/backoffice/report_itemreturns.jpg">
                                    <span class="mlabel">ITEMS</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice_inventory/barcode")?>">-->
                                <a id="Barcode" class="DashboardButtons">
                                    <img width="48" src="<?php echo base_url() ?>assets/img/backoffice/ItemBarcode.png">
                                    <span class="mlabel">BARCODE</span>
                                </a>
                            </div>
							<?php
							/*
							<div class="icon">
                                <!--<a href="<?php //echo base_url("dashboard/items/count")?>">-->
                                <a id="Count" class="DashboardButtons">
                                    <img width="48" src="<?php echo base_url()?>assets/img/backoffice/ItemCount.png">
                                    <span class="mlabel">COUNT</span>
                                </a>
                            </div>
         */
        ?>

                            <?php
                            /*
                            <div class="icon">
                                <a href="<?php echo base_url("backoffice/administration")?>">
                                    <img width="48" alt="" src="<?php echo base_url()?>assets/img/administration.png">
                                    <span class="mlabel">ADMINISTRATION</span>
                                </a>
                            </div>
                             */
                            ?>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/purchase/index")?>">-->
                                <a id="Purchase" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/Purchase.png">
                                    <span class="mlabel">PURCHASE</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/item_transfer/index")?>">-->
                                <a id="Transfer" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/Transfer.png">
                                    <span class="mlabel">TRANSFER</span>
                                </a>
                            </div>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/timeclock/index");?>">-->
                                <a id="TimeClock" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/TimeClock.png">
                                    <span class="mlabel">TIME CLOCK</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/timeclock/index");?>">-->
                                <a id="TimeClockv2" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url()?>assets/img/backoffice/TimeClock.png">
                                    <span class="mlabel">TIME CLOCK v2</span>
                                </a>
                            </div>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/timeclock/index");?>">-->
                                <a id="TimeClockInOut" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url()?>assets/img/backoffice/timeclock_in_out.png">
                                    <span class="mlabel">Clock In Out</span>
                                </a>
                            </div>
                            <div class="icon">
                                <!--<a href="<?php //echo base_url("backoffice/reports/get")?>">-->
                                <a id="Reports" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/reports.png">
                                    <span class="mlabel">REPORTS</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("dashboard/admin/menu")?>">-->
                                <a id="Menu" class="DashboardButtons">
                                    <img alt="" src="<?php echo base_url() ?>assets/img/backoffice/menu.png">
                                    <span class="mlabel">MENU</span>
                                </a>
                            </div>
							<div class="icon">
                                <!--<a href="<?php //echo base_url("dashboard/admin")?>">-->
                                <a id="Administration" class="DashboardButtons">
                                    <img width="48" alt="" src="<?php echo base_url() ?>assets/img/backoffice/administration.png">
                                    <span class="mlabel">ADMINISTRATION</span>
                                </a>
                            </div>
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

</style>
