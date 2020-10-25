angular.expandAkamaiposController = function($scope, $http, $routeParams, $q, posData, $window, $filter, $compile, $rootScope){
    var TableEnabled = $("#TableOrder").val();
    var LastSectionSelected = 1;
    //var table_synchronize = 'ws://192.168.0.93:8080';
    /*
    |--------------------------------------------------------------------------|
    | Table Connection													   |		
    |--------------------------------------------------------------------------|
    */
    var TableSocketConnection = false;
    if(TableEnabled == 1){
        if($("#PoleDisplay").val() == 2){
            if(ConnectionPoleDisplay){
                var tableconn = new WebSocket(table_synchronize);

                tableconn.onerror=function(event){
                    console.log("Websocket server is not running");
                    TableSocketConnection = false;
                }

                tableconn.onopen = function(e) {
                    TableSocketConnection = true;
                    setTimeout(function(){
                        if(tableconn){
                            tableconn.send(JSON.stringify(["TableClickedAssigned", 2]));
                        }
                    },100)    
                    
                }
            }
        }
    };
    
    /*
    |-------------------------------------------------------------------------------|
    | Table Synchronize
    |-------------------------------------------------------------------------------|
    */
    if(TableEnabled == 1){
        if($("#PoleDisplay").val() == 2){
            if(ConnectionPoleDisplay){
                tableconn.onmessage = function(e){
                    var tableData = JSON.parse(e.data);
                    if(tableData[0] == 'TableClickedAssigned'){
                        var postdata = "SectionUnique="+LastSectionSelected;
                        posData.SelectSectionTable(postdata)
                        .success(function(data){
                            $("#dine-in-tables-panel").html('');
                            $("#dine-in-tables-panel").append(data.html);
                        })
                    }
                }
            }
        }
    }

    /*
    |---------------------------------------------------------------------------|
    | Numpad Alert Ok
    |---------------------------------------------------------------------------|
    */
    var populateNumpadAlertClose = function(form_name, msg){
        var def = $.Deferred();
        $("body").append(
            '<div id="table-numpad-alert" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                '<div id="table-alert-msg-popup" style="background: #144766; color:#EEE;">'+
                    '<form id="'+form_name+'">'+
                        '<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
                        '<h4>'+msg+'</h4>'+
                        '<br/>'+
                        '<div id="keyboard_alertclose"></div>'+
                        '<input type="hidden" id="use_value" />'+
                        '<input type="hidden" id="use_value2"/>'+
                    '</form>'+
                '</div>'+
            '</div>'
        );

        setTimeout(function(){
            $("#table-numpad-alert").jqxWindow({
                height: 245,
                minWidth: 350,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false
            });
            $('#table-numpad-alert').jqxWindow('setTitle', '<span class="glyphicon glyphicon-info-sign"></span>');
            $('#table-numpad-alert').jqxWindow('open');
            
            $("#table-numpad-alert").on("close", function(event){
                $("#table-numpad-alert").jqxWindow('destroy');
                $("#table-numpad-alert").remove();
            })

            def.resolve();	
        },100);

        return def.promise();
    }

    var WindowPopupAlert = function(header_text){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table-numpad-alert").jqxWindow({
                height: 245,
                minWidth: 350,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                draggable: false
            });
            $('#table-numpad-alert').jqxWindow('setTitle', header_text);
            $('#table-numpad-alert').jqxWindow('open');
            $(".alert_okay").focus();
            def.resolve();	
        },100);
        return def.promise();
    }

    var NumpadAlertClose = function(form, msg){
        var def = $.Deferred();
        populateNumpadAlertClose(form, msg)
        .then(function(){
            $('#keyboard_alertclose').hdkeyboard({
                layout: "alert_close",
                input: $('#number_field')
            });
            def.resolve();
        });
        return def.promise();
    }

    var LoadHeaderInfo = function(){
        var def = $.Deferred();
        posData.GetHeaderInfo()
        .success(function(data){
            $("#receiptn").text(data.receipt_number);
            $("#station").text(data.station_name);
            $("#cashin").text(data.cashin);
            $("#store_name").text(data.store_name);
            $scope.station = {
                cunique: data.cashin
            }
            if($("#PoleDisplay").val() == 2){
                if(ConnectionPoleDisplay){
                    conn.send(JSON.stringify(["WelcomeDisplay", $scope.station_unique]));
                }
            }
            if(data.user_name){
                $("#user_name").text(data.user_name);
            }else{
                $("#user_name").text("");
            }
            def.resolve(data);
        })
        return def.promise();
    };

    /*
    |--------------------------------------------------------------------------|
    | Passcode window
    |--------------------------------------------------------------------------|
    var populateNumpadPasscode = function(form_name){
        var def = $.Deferred();
        setTimeout(function(){
            $("#dialog-numpad-passcode").append('<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>');
            $("#passcode_numpad").html('');
            $("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
            $("#passcode_numpad").append(''+
            '<form id="'+form_name+'">'+
                '<input type="password" class="hdfield" id="number_field" autocomplete="off" style="color:#000">'+
                '<div id="keyboard_passcode"></div>'+
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
                resizable: false
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
            $('#keyboard_passcode').hdkeyboard({
                layout: "numbers_only",
                input: $('#number_field')
            });
            setTimeout(function(){
                $("#number_field").focus();
                def.resolve();
            },100);
        });
        return def.promise();
    }
    */

    /*
    |--------------------------------------------------------------------------|
    | Passcode window
    |--------------------------------------------------------------------------|
    */
   var populateNumpadPasscode = function(form_name){
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append(
                '<div id="dialog-numpad-passcode" style="display:none; background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000;">'+
                    '<div id="passcode_numpad" style="background: #144766; color:#EEE;"></div>'+
                '</div>'
            );
            $("#passcode_numpad").html('');
			$("#passcode_numpad").append('<h4 style="text-align:center;">Enter Passcode</h4>');
			$("#passcode_numpad").append(''+
			'<form id="'+form_name+'" autocomplete="off">'+
				'<input type="password" class="hdfield" id="number_field" style="color:#000">'+
				'<div id="keyboard_passcode"></div>'+
			'</form>');
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupPasscode = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth / 2);
            var UseWidth = (ComputeWidth);
            $("#dialog-numpad-passcode").jqxWindow({
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
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
            $('#keyboard_passcode').numeric_numpad({
            layout: "numbers_only",
            input: $('#number_field')
            });
            setTimeout(function(){
                $("#number_field").focus();
                def.resolve();
            },100);
        });
        return def.promise();
    }


    /*
    |--------------------------------------------------------------------------|
    | Call Popup window with Table form										   |
    |--------------------------------------------------------------------------|
    */
    var WindowTableDineIn = function($title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_dine_in").jqxWindow({
                minHeight: '100%',
                minWidth: '100%',
                isModal: true,
                theme: 'darkblue',
                showCloseButton: false,
                resizable: false,
                draggable: false,
                Title: 'Dine in Table',
                showAnimationDuration: 0,
				closeAnimationDuration: 0
            });
            $("#table_dine_in .jqx-window-header").css('display','none');
            $("#table_dine_in").jqxWindow('setTitle', $title);
            $('#table_dine_in').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    /*
    |---------------------------------------------------------------------------|
    | Create Table in a form							 					    |		
    |---------------------------------------------------------------------------|
    */
    
    var PopupWindowDineIn = function(){
        var def = $.Deferred();
        posData.GetTables()
        .success(function(data){
            $("#table_dine_in").append('<div id="table_container" style="padding:0px; margin:0px; overflow:hidden; min-height:100% !important"></div>');
            $("#table_container").html('');
            $("#table_container").append($compile(data.html)($scope));
            posData.GetSectionList()
            .success(function(section){
                var source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'Description' }
                    ],
                    localdata: section
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#dine-in-sections-list").jqxListBox({
                    source: dataAdapter, displayMember: "Description", valueMember: "Unique", width: '100%', height: 350, itemHeight: 40
                })
                
                $('#dine-in-sections-list').on('select', function (event) {
                    var args = event.args;
                    if (args) {
                        $("#dine-in-tables-panel").html('');
                        var index = args.index;
                        var item = args.item;
                        var originalEvent = args.originalEvent;
                        // get item's label and value.
                        var label = item.label;
                        var value = item.value;
                        var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                        LastSectionSelected = value;
                        var postdata = "SectionUnique="+value;
                        posData.SelectSectionTable(postdata)
                        .success(function(data){
                            $("#dine-in-tables-panel").append(data.html);
                        })
                    }
                });
            }).then(function(){
                $("#dine-in-sections-list").jqxListBox('selectItem', data.DefaultSection);
            })

            def.resolve();
        })
        return def.promise();
    }

    /*
    |----------------------------------------------------------------------------
    | Numpad No. of Customer
    |----------------------------------------------------------------------------
    
    var populateNoOfCustomer = function(form){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_no_of_customer").append('<div id="table_no_of_customer_container" style="background: #144766; color:#EEE;"></div>');
            $("#table_no_of_customer_container").html('');
            $("#table_no_of_customer_container").append(
                '<h4 id="no_of_customer_form_msg"></h4>'
            );
            $("#table_no_of_customer_container").append(
                '<form id="'+form+'">'+
                    '<input type="text" id="number_field" class="hdfield" maxlength="'+NumpadPriceInputLimit+'" style="color:#000">'+
                    '<div id="NoOfCustomerkeyboard"></div>'+
                    '<input type="hidden" id="entertableno"/>'+
                '</form>'
            );
            def.resolve();
        }, 100);
        return def.promise();
    }

    var WindowNoOfCustomer = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_no_of_customer").jqxWindow({
                height: 460,
                minWidth: 290,
                title: header_title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
				closeAnimationDuration: 0
            });
            $('#table_no_of_customer').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }
    
    var NumpadNoOfCustomer = function(form_name){
        var def = $.Deferred();
        populateNoOfCustomer(form_name)
        .then(function(){
            $('#NoOfCustomerkeyboard').hdkeyboard({
                layout: "numbers_only",
                input: $('#number_field')
            });
            setTimeout(function(){
                $("#number_field").focus();
                def.resolve();
            },100);
        });
        return def.promise();
    }
    */

    /*
    |-----------------------------------------------------------------------------
    | Table Assigment
    |-----------------------------------------------------------------------------
    */  
    $scope.Tables = function(){
        $(".de_cashier_dinetable").attr({"disabled": true});
        posData.CheckMultipleCashIn()
        .success(function(data){
            if(data.success){
                if(data.MultipleCashedIn){
                    window.CashInProcessFunction = 'CashierDineTable';
                    window.CashedInList(data, '', 'Dine Table');
                }else{
                    window.TableDineInForm(data.StationCashierUnique);
                }
            }else{
                PopupWindowDineIn()
                .then(function(){
                    var postdata ="FunctionButton=Tables";
                    posData.CheckUserManager(postdata)
                    .success(function(data){
                        $scope.TableUserUnique = data.UserUnique;
                        if(data.prompt){
                            $http({
                                method: 'get',
                                url: base_url + 'pos/cashier/tables/logout',
                            }).success(function(data){
                                if(data.success){
                                    console.log("akaitest");
                                    posData.CashOutDisabled()
                                    .success(function(result2){
                                        if(result2.success == true){
                                            LoadHeaderInfo();
                                            $("#table_dine_in").jqxWindow('setTitle', 'Dine in Table');
                                            $("#table_logout").removeClass('table-logout');
                                            $("#table_logout").addClass("table-login").text('Login');                        
                                            WindowTableDineIn("Dine in Table"+ " | "+ $("#Server").val())
                                            .then(function(){
                                                
                                            })
                                        }else{
                                            LoadHeaderInfo();
                                            FunctionButton = '';
                                            var msg = 'Please cash in first';	
                                            NumpadAlertOk('invalid_passcode', msg)
                                            .then(function(){
                                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                            })
                                        }
                                    })
                                }
                            })
                        }else{
                            
                            posData.CashOutDisabled()
                            .success(function(result2){
                                if(result2.success == true){
                                    posData.GetLoggedUserInfo()
                                    .success(function(data){
                                        $("#table_logout").removeClass('table-login');
                                        $("#table_logout").addClass('table-logout').text(data.UserName);
                                        $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                        WindowTableDineIn("Dine in Table"+ " | "+ $("#Server").val())
                                        .then(function(){
                                        
                                        })
                                    })
                                }else{
                                    console.log("aktest4");
                                    LoadHeaderInfo();
                                    FunctionButton = '';
                                    var msg = 'Please cash in first';	
                                    NumpadAlertOk('invalid_passcode', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }
                            })
                        }
                    })
                }) 
                setTimeout(function(){
                    $(".de_cashier_dinetable").attr({"disabled": false});
                },1000) 
            }
            
            $(".de_cashier_dinetable").attr({"disabled": false});
        })
    }

    window.TableDineInForm = (StationCashierUnique) => {
        PopupWindowDineIn()
        .then(function(){
            var postdata ="FunctionButton=Tables";
                postdata+="&StationCashierUnique="+StationCashierUnique;
            posData.CheckUserManager(postdata)
            .success(function(data){
                $scope.TableUserUnique = data.UserUnique;
                if(data.prompt){
                    $http({
                        method: 'get',
                        url: base_url + 'pos/cashier/tables/logout',
                    }).success(function(data){
                        if(data.success){
                            
                            posData.CashOutDisabled(postdata)
                            .success(function(result2){
                                if(result2.success == true){
                                    LoadHeaderInfo();
                                    $("#table_dine_in").jqxWindow('setTitle', 'Dine in Table');
                                    $("#table_logout").removeClass('table-logout');
                                    $("#table_logout").addClass("table-login").text('Login');                        
                                    WindowTableDineIn("Dine in Table"+ " | "+ $("#Server").val())
                                    .then(function(){
                                        
                                    })
                                }else{
                                    LoadHeaderInfo();
                                    FunctionButton = '';
                                    var msg = 'Please cash in first';	
                                    NumpadAlertOk('invalid_passcode', msg)
                                    .then(function(){
                                        WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                    })
                                }
                            })
                        }
                    })
                }else{
                    
                    posData.CashOutDisabled(postdata)
                    .success(function(result2){
                        if(result2.success == true){
                            posData.GetLoggedUserInfo()
                            .success(function(data){
                                $("#table_logout").removeClass('table-login');
                                $("#table_logout").addClass('table-logout').text(data.UserName);
                                $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                WindowTableDineIn("Dine in Table"+ " | "+ $("#Server").val())
                                .then(function(){
                                
                                })
                            })
                        }else{
                            LoadHeaderInfo();
                            FunctionButton = '';
                            var msg = 'Please cash in first';	
                            NumpadAlertOk('invalid_passcode', msg)
                            .then(function(){
                                WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                            })
                        }
                    })
                }
            })
        }) 
        setTimeout(function(){
            $(".de_cashier_dinetable").attr({"disabled": false});
        },1000)
    }

    /*
    |-------------------------------------------------------------------------------|
    | Table Back button
    |-------------------------------------------------------------------------------|
    */
    $(document).on('click', '#table_back_pos_main', function(){
        $('#table_dine_in').jqxWindow('close');
    })
    
    $scope.table_exit_back = function(){
        $('#table_dine_in').jqxWindow('close');
    }
  

    /*
    |------------------------------------------------------------------------------|
    | Table Logout user															   |
    |------------------------------------------------------------------------------|
    */
    $(document).on("click", ".table-logout", function(e){
        e.preventDefault();
        $http({
            method: 'get',
            url: base_url + 'pos/cashier/tables/logout',
        }).success(function(data){
            if(data.success){
                $("#table_dine_in").jqxWindow('setTitle', 'Dine in Table');
                $("#table_logout").removeClass('table-logout');
                $("#table_logout").addClass("table-login").text('Login');
                var postdata ="SectionUnique="+LastSectionSelected;
                $("#dine-in-tables-panel").html('');
                posData.SelectSectionTable(postdata)
                .success(function(data){
                    $("#dine-in-tables-panel").append(data.html);
                })
                LoadHeaderInfo();
                /*
                NumpadPasscode('table_logout_user')
                .then(function(){
                    WindowPopupPasscode('User Passcode')
                    .then(function(){
                        $("#number_field").focus();
                    })
                })
                */
            }
        })
    })

    /*
    |--------------------------------------------------------------------------|
    | When close Dine In window
    |--------------------------------------------------------------------------|
    */
    $("#table_dine_in").on("close", function(e){
        
    })

    /*
    |------------------------------------------------------------------------------|
    | Table login window popup security
    |------------------------------------------------------------------------------|
    */
    $(document).on("click", ".table-login", function(){
        $("#table_logout").attr("disabled", true);
        NumpadPasscode('table_login_user')
        .then(function(){
            WindowPopupPasscode('User Passcode')
            .then(function(){
                setTimeout(function(){
                    $("#number_field").focus();
                },100);
            })
        })
        setTimeout(function(){
            $("#table_logout").attr('disabled', false);
        },1000);
    })

    var SetTableCustomer = function(hashpasscode, StationCashierUnique = null){
        var postdata="passcode="+hashpasscode;
            postdata+="&StationCashierUnique=" + StationCashierUnique;
        $http({
            method:'post',
            url: base_url+'pos/cashier/tables/login',
            data: postdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            if(data.success){
                $("#dialog-numpad-passcode").jqxWindow('close');
                $("#table_logout").removeClass('table-login');
                $("#table_logout").addClass('table-logout').text(data.UserName);
                $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                var postdata ="SectionUnique="+LastSectionSelected;
                $("#dine-in-tables-panel").html('');
                posData.SelectSectionTable(postdata)
                .success(function(data){
                    $("#dine-in-tables-panel").append(data.html);
                })
                LoadHeaderInfo();
            }else{
                var msg = data.msg;
                NumpadAlertClose('table_login_invalid', msg)
                // .then(function(){
                //     WindowPopupAlert('Invalid code');
                // });
            }
        })
    }

    /*
    |------------------------------------------------------------------------------|
    | Table login function 
    |------------------------------------------------------------------------------|
    */
    $(document).on('submit', '#table_login_user', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var security = ['Tables'];
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+JSON.stringify(security);
            posData.CheckUserSecurity(postdata)
            .success(function(data){
                if(data.validuser){
                    if(data.cashin){
                        if(data.countposition > 0){
                            if(data.MultipleCashedIn){
                                window.CashInProcessFunction = 'CashierDineTableLogin';
                                window.CashedInList(data, hashpasscode, 'Dine Table');
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                return false;
                            }

                            $scope.UserUnique = data.UserUnique;
                            var postdata ="user_unique="+data.UserUnique;
                                postdata+="&status=1";
                            posData.TimeClockCheck(postdata)
                            .success(function(timeclockcheck){
                                if(timeclockcheck.status == 0){
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    if($scope.ClockInCheck == 1){
                                        $("#dialog-numpad-passcode").jqxWindow('close');	
                                        var msg = 'Please Clock In first';	
                                        NumpadAlertClose('clock_in_first', msg)
                                        // .then(function(){
                                        //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        // })
                                    }else{
                                        SetTableCustomer(hashpasscode);
                                    }
                                }else{
                                    SetTableCustomer(hashpasscode);
                                }
                            })
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow("close");
                            var msg = "Sorry, you don't have permission";
                            NumpadAlertClose('invalid_cashout_server_code', msg)
                            // .then(function(){
                            //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            // });
                        }
                    }else{
                        console.log("what is this?", data, data.msg);
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        NumpadAlertClose('no_cashin', data.msg)
                        // .then(function(){
                        //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        // });  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    // .then(function(){
                    //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    // });
                }
            })
        }else{
            var msg = 'Passcode cannot be empty';	
            NumpadAlertClose('invalid_passcode', msg)
            // .then(function(){
            //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            // })
        } 
    })

    window.TableDineLoginUser = (data, hashpasscode, StationCashierUnique) => {
        $scope.UserUnique = data.UserUnique;
        var postdata ="user_unique="+data.UserUnique;
            postdata+="&status=1";
        posData.TimeClockCheck(postdata)
        .success(function(timeclockcheck){
            if(timeclockcheck.status == 0){
                $("#dialog-numpad-passcode").jqxWindow('close');
                if($scope.ClockInCheck == 1){
                    $("#dialog-numpad-passcode").jqxWindow('close');	
                    var msg = 'Please Clock In first';	
                    NumpadAlertClose('clock_in_first', msg)
                    // .then(function(){
                    //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                    // })
                }else{
                    SetTableCustomer(hashpasscode, StationCashierUnique);
                }
            }else{
                SetTableCustomer(hashpasscode, StationCashierUnique);
            }
        })
    }

    window.TableDineCustomerLoginUser = (data, hashpasscode, StationCashierUnique = null) => {
        $("#dialog-numpad-passcode").jqxWindow('close');
        $("#table_logout").removeClass('table-login');
        $("#table_logout").addClass('table-logout').text(data.UserName);
        $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
        SetTableCustomer(hashpasscode);
        var TableCustomerNo = $("#TableCustomerNo").val();
        var postdata = "TableUnique="+TableId;
        if(TableCustomerNo == 0){
            posData.SelectTableWithoutCustomerNo(postdata)
            .success(function(data){
                LoadHeaderInfo();
                if($("#PoleDisplay").val() == 2){
                    if(ConnectionPoleDisplay){
                        if(tableconn){
                            tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                        }
                    }
                }
                $window.location = 'pointofsale';
            })
        }else{
            var postdata="passcode="+hashpasscode;
                postdata+="&StationCashierUnique=" + StationCashierUnique;
            $http({
                method:'post',
                url: base_url+'pos/cashier/tables/login',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.success){
                    NumpadTableNoOfCustomer('select_table_with_customer_no')
                    .then(function(){
                        WindowTableNoOfCustomer('Customer Count')
                        .then(function(){
                            setTimeout(function(){
                                $("#table_number_field").val(1);
                                $("#table_number_field").jqxNumberInput('focus');
                                var input = $('#table_number_field input')[0];
                                if('selectionStart' in input) {
                                    input.setSelectionRange(0, 0);
                                }else{
                                    var range = input.createTextRange();
                                    range.collapse(true);
                                    range.moveEnd('character', 0);
                                    range.moveStart('character', 0);
                                    range.select();
                                }
                                $("#table_number_field input").select();
                            },100)
                        })
                    })
                }else{
                    var msg = data.msg;
                    NumpadAlertClose('table_login_invalid', msg)
                }
            })
        }
    }

    /*
    |---------------------------------------------------------------------------|
    | Click Assign Table
    |---------------------------------------------------------------------------|
    */
    var TableId = 0;
    var TableName = '';
    var TableNo;
    var TableDineIn = function(){
        $(document).one('click', '.TableDineIn', function(e){
            var TableDineInSplit = $(this).attr('id');
            var id = TableDineInSplit.split("=")[0];
            var tableno = TableDineInSplit.split("=")[1];
            var tbname = TableDineInSplit.split("=")[2];
            TableName = tbname;
            TableNo = tableno; 
            $http({
                method: 'get',
                url: base_url+'pos/cashier/tables/get-current-user'
            }).success(function(data){
                if(data.success){
                    var TableCustomerNo = $("#TableCustomerNo").val();
                    var postdata = "TableUnique="+id;
                    console.log("ds",TableCustomerNo);
                    if(TableCustomerNo == 0){
                        posData.SelectTableWithoutCustomerNo(postdata)
                        .success(function(data2){
                            if(data2.success){
                                if($("#PoleDisplay").val() == 2){
                                    if(ConnectionPoleDisplay){
                                        if(tableconn){
                                            tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                                        }
                                    }
                                }
                                $window.location.href = 'pointofsale';
                            }
                        })
                    }else{
                        if($("#POSOrderTypeRequired").val() == 2){
                            posData.OrderTypePopupList()
                            .success(function(data){
                                OrderTypeWindowApp('OrderTypePopupApp', data.html)
                                .then(function(){
                                    WindowPopupOrderTypeApp('Order type');
                                })
                            })
                        }else{
                            NumpadTableNoOfCustomer('select_table_with_customer_no')
                            .then(function(){
                                WindowTableNoOfCustomer('Customer Count')
                                .then(function(){
                                    setTimeout(function(){
                                        $("#table_number_field").val(1);
                                        $("#table_number_field").jqxNumberInput('focus');
                                        var input = $('#table_number_field input')[0];
                                        if('selectionStart' in input) {
                                            input.setSelectionRange(0, 0);
                                        }else{
                                            var range = input.createTextRange();
                                            range.collapse(true);
                                            range.moveEnd('character', 0);
                                            range.moveStart('character', 0);
                                            range.select();
                                        }
                                        $("#table_number_field input").select();
                                    },100)
                                })
                            })
                        }
                    }
                    setTimeout(function(){
                        TableDineIn();
                    },1000);
                }else{
                    TableId = id;
                    NumpadPasscode('table_login_user_open_table')
                    .then(function(){
                        WindowPopupPasscode('User Passcode')
                        .then(function(){
                            setTimeout(function(){
                                TableDineIn();
                                $("#number_field").focus();
                            },100);
                        })
                    })
                }
            })
        })
    }
    TableDineIn();

    /*
    |----------------------------------------------------------------------|
    | Click Edit Table
    |----------------------------------------------------------------------|
    */
    var TableReceiptHeaderUnique;
    var TableEditDineIn = function(){
        $(document).one('click', '.TableEditDineIn', function(e){
            var TableEditDineSplit = $(this).attr("id");
            var id = TableEditDineSplit.split("=")[0];
            var tableno = TableEditDineSplit.split("=")[1];
            var rdunique = TableEditDineSplit.split("=")[2];
            TableReceiptHeaderUnique = rdunique;
            $http({
                method: 'get',
                url: base_url+'pos/cashier/tables/get-current-user'
            }).success(function(data){
                if(data.success){
                    var postdata ="ReceiptHeaderUnique="+rdunique;
                        postdata+="&TableUnique="+id;
                    posData.CheckTableEditing(postdata)
                    .success(function(data2){
                        if(data2.OnEdit == false){
                            var postdata="ReceiptHeaderUnique="+rdunique;
                                postdata+="&TableUnique="+id;
                            posData.ClearAll(postdata)
                            .success(function(data3){
                                if(data3.count > 1){
                                    $window.location = base_url + "pos/pointofsale/split-check";
                                }else{
                                    if( $("#TableSplitCheck").val() == 1 ){
                                        $window.location = base_url + "pos/pointofsale/split-check";
                                    }else{
                                        $window.location = base_url + "pos/pointofsale";
                                    }
                                }
                            })
                        }else{
                            var msg = data2.msg;
                            NumpadAlertClose('table_attempt_add_table', msg)
                            // .then(function(){
                            //     WindowPopupAlert('Alert Message');
                            // });
                        }
                    })
                    setTimeout(function(){
                        TableEditDineIn();
                    },1000);
                }else{
                    TableId = id;
                    NumpadPasscode('table_login_user_edit_table')
                    .then(function(){
                        WindowPopupPasscode('User Passcode')
                        .then(function(){
                            setTimeout(function(){
                                TableEditDineIn();
                                $("#number_field").focus();
                            },100);
                        })
                    })
                }
            })
        })
    }
    TableEditDineIn();

    /*
    |----------------------------------------------------------------------|
    | Table Login and edit table old
    |----------------------------------------------------------------------|
    */
    $(document).on("submit", "#table_login_user_edit_table_old", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="passcode="+hashpasscode;
            $http({
                method:'post',
                url: base_url+'pos/cashier/tables/login',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.success){
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    $("#table_logout").removeClass('table-login');
                    $("#table_logout").addClass('table-logout').text(data.UserName);
                    $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                    var postdata = "SectionUnique="+LastSectionSelected;
                    $("#dine-in-tables-panel").html('');
                    posData.SelectSectionTable(postdata)
                    .success(function(data){
                        $("#dine-in-tables-panel").append(data.html);
                    })

                    var postdata ="TableUnique="+TableId;
                        postdata+="&ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                    posData.CheckTableEditing(postdata)
                    .success(function(data2){
                        if(data2.OnEdit == false){
                            var postdata="ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                                postdata+="&TableUnique="+TableId;
                            posData.ClearAll(postdata)
                            .success(function(data3){
                                if(data3.count > 1){
                                    $window.location = base_url + "pos/pointofsale/split-check";
                                }else{
                                    $window.location = base_url + "pos/pointofsale";
                                }
                            })
                        }else{
                            var msg = data2.msg;
                            NumpadAlertClose('table_attempt_add_table', msg)
                            // .then(function(){
                            //     WindowPopupAlert('Alert Message');
                            // });
                        }
                    })
                }else{
                    var msg = data.msg;
                    NumpadAlertClose('table_login_invalid', msg)
                    // .then(function(){
                    //     WindowPopupAlert('Invalid code');
                    // });
                }
            })
        }
    })

    /*
    |----------------------------------------------------------------------|
    | Table Login and edit table
    |----------------------------------------------------------------------|
    */
    $(document).on("submit", "#table_login_user_edit_table", function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var security = ['Tables'];
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+JSON.stringify(security);
                postdata+="&Passcode="+hashpasscode; 
            posData.CheckUserSecurity(postdata)
            .success(function(data){
                if(data.validuser){
                    if(data.cashin){
                        if(data.countposition > 0){
                            var postdata ="user_unique="+data.UserUnique;
                                postdata+="&status=1";
                            posData.TimeClockCheck(postdata)
                            .success(function(timeclockcheck){
                                if(timeclockcheck.status == 0){
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    if($scope.ClockInCheck == 1){
                                        $("#dialog-numpad-passcode").jqxWindow('close');	
                                        var msg = 'Please Clock In first';	
                                        NumpadAlertClose('clock_in_first', msg)
                                        // .then(function(){
                                        //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        // })
                                    }else{
                                        $("#dialog-numpad-passcode").jqxWindow("close");
                                        $("#table_logout").removeClass('table-login');
                                        $("#table_logout").addClass('table-logout').text(data.UserName);
                                        $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                        var postdata = "SectionUnique="+LastSectionSelected;
                                        $("#dine-in-tables-panel").html('');
                                        posData.SelectSectionTable(postdata)
                                        .success(function(data){
                                            $("#dine-in-tables-panel").append(data.html);
                                        })

                                        var postdata ="TableUnique="+TableId;
                                            postdata+="&ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                                        posData.CheckTableEditing(postdata)
                                        .success(function(data2){
                                            if(data2.OnEdit == false){
                                                var postdata="ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                                                    postdata+="&TableUnique="+TableId;
                                                posData.ClearAll(postdata)
                                                .success(function(data3){
                                                    if(data3.count > 1){
                                                        $window.location = base_url + "pos/pointofsale/split-check";
                                                    }else{
                                                        $window.location = base_url + "pos/pointofsale";
                                                    }
                                                })
                                            }else{
                                                var msg = data2.msg;
                                                NumpadAlertClose('table_attempt_add_table', msg)
                                                // .then(function(){
                                                //     WindowPopupAlert('Alert Message');
                                                // });
                                            }
                                        })
                                    }
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow("close");
                                    $("#table_logout").removeClass('table-login');
                                    $("#table_logout").addClass('table-logout').text(data.UserName);
                                    $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                    var postdata = "SectionUnique="+LastSectionSelected;
                                    $("#dine-in-tables-panel").html('');
                                    posData.SelectSectionTable(postdata)
                                    .success(function(data){
                                        $("#dine-in-tables-panel").append(data.html);
                                    })

                                    var postdata ="TableUnique="+TableId;
                                        postdata+="&ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                                    posData.CheckTableEditing(postdata)
                                    .success(function(data2){
                                        if(data2.OnEdit == false){
                                            var postdata="ReceiptHeaderUnique="+TableReceiptHeaderUnique;
                                                postdata+="&TableUnique="+TableId;
                                            posData.ClearAll(postdata)
                                            .success(function(data3){
                                                if(data3.count > 1){
                                                    $window.location = base_url + "pos/pointofsale/split-check";
                                                }else{
                                                    $window.location = base_url + "pos/pointofsale";
                                                }
                                            })
                                        }else{
                                            var msg = data2.msg;
                                            NumpadAlertClose('table_attempt_add_table', msg)
                                            // .then(function(){
                                            //     WindowPopupAlert('Alert Message');
                                            // });
                                        }
                                    })
                                }
                            })
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow("close");
                            var msg = "Sorry, you don't have permission";
                            NumpadAlertClose('invalid_cashout_server_code', msg)
                            // .then(function(){
                            //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            // });
                        }
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        NumpadAlertClose('no_cashin', data.msg)
                        // .then(function(){
                        //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        // });  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    // .then(function(){
                    //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    // });
                }
            })
        }else{
            $("#dialog-numpad-passcode").jqxWindow("close");
            var msg = "Invalid Passcode";
            NumpadAlertClose('invalid_cashout_server_code', msg)
            .then(function(){
                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
            });
        }
    })

    /*
    |----------------------------------------------------------------------------
    | Enter No. of Customer
    |----------------------------------------------------------------------------
    */
    $(document).on('submit', '#select_table_with_customer_no', function(e){
        e.preventDefault();
        var CustomerQuantity = $("#table_number_field").val();
        if(CustomerQuantity > 2999){
            var msg = "Customer Count can be up to 2999.";
            NumpadAlertClose('customer_count_error', msg)
            // .then(function(){
            //     WindowPopupAlert ('Customer Count Info');
            // })
        }else{
            var no_customer = $("#table_number_field").val();
            var postdata ="TableUnique="+ TableNo;
                postdata+="&no_of_customer="+no_customer; 
                postdata+="&OrderTypeNo="+OrderTypeName;
            posData.SelectTableWithCustomerNo(postdata)
            .success(function(data){
                if(data.success){
                    LoadHeaderInfo();
                    if($("#PoleDisplay").val() == 2){
                        if(ConnectionPoleDisplay){
                            if(tableconn){
                                tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                            }
                        }
                    }
                    $("#table_no_of_customer").jqxWindow('close');
                    //$('#table_dine_in').jqxWindow('close');
                    $window.location = 'pointofsale';
                }
            })
        }
    })

    $(document).on('click', '#customer_count_error', function(e){
        e.preventDefault();
        setTimeout(function(){
        $("#table_number_field").jqxNumberInput('focus');
            var input = $('#table_number_field input')[0];
            if('selectionStart' in input) {
                input.setSelectionRange(0, 0);
            }else{
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', 0);
                range.moveStart('character', 0);
                range.select();
            }
            $("#table_number_field input").select();
        },100)
        $("#table-numpad-alert").jqxWindow('close');
    })

    /*
    |----------------------------------------------------------------------|
    | Table Login and open table immediately old
    |----------------------------------------------------------------------|
    */
    $(document).on('submit', '#table_login_user_open_table_old', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="passcode="+hashpasscode;
            $http({
                method:'post',
                url: base_url+'pos/cashier/tables/login',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.success){
                    $scope.UserUnique = data.UserUnique;
                    $("#dialog-numpad-passcode").jqxWindow('close');
                    $("#table_logout").removeClass('table-login');
                    $("#table_logout").addClass('table-logout').text(data.UserName);
                    $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                    LoadHeaderInfo();
                    var TableCustomerNo = $("#TableCustomerNo").val();
                    var postdata = "TableUnique="+TableId;
                    if(TableCustomerNo == 0){
                        posData.SelectTableWithoutCustomerNo(postdata)
                        .success(function(data){
                            LoadHeaderInfo();
                            if($("#PoleDisplay").val() == 2){
                                if(ConnectionPoleDisplay){
                                    if(tableconn){
                                        tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                                    }
                                }
                            }
                            $window.location = 'pointofsale';
                        })
                    }else{
                        NumpadTableNoOfCustomer('select_table_with_customer_no')
                        .then(function(){
                            WindowTableNoOfCustomer('Customer Count')
                            .then(function(){
                                setTimeout(function(){
                                $("#table_number_field").val(1);
                                $("#table_number_field").jqxNumberInput('focus');
                                    var input = $('#table_number_field input')[0];
                                    if('selectionStart' in input) {
                                        input.setSelectionRange(0, 0);
                                    }else{
                                        var range = input.createTextRange();
                                        range.collapse(true);
                                        range.moveEnd('character', 0);
                                        range.moveStart('character', 0);
                                        range.select();
                                    }
                                    $("#table_number_field input").select();
                                },100)
                            })
                        })
                    }
                }else{
                    var msg = data.msg;
                    NumpadAlertClose('table_login_invalid', msg)
                    // .then(function(){
                    //     WindowPopupAlert('Invalid code');
                    // });
                }
            })
        }
    })


    /*
    |----------------------------------------------------------------------|
    | Table Login and open table immediately 							   |
    |----------------------------------------------------------------------|
    */
    $(document).on('submit', '#table_login_user_open_table', function(e){
        e.preventDefault();
        var CardRead = $("#number_field").val();
        var CRP = new CardReaderParser(CardRead);
        if(CRP.converted){
            var security = ['Tables'];
            var passcode = CRP.converted;
            var hashpasscode = CryptoJS.MD5(passcode);
            var postdata ="Passcode="+hashpasscode;
                postdata+="&FunctionButton="+JSON.stringify(security);
            posData.CheckUserSecurity(postdata)
            .success(function(data){
                if(data.validuser){
                    if(data.cashin){
                        if(data.countposition > 0){

                            if(data.MultipleCashedIn){
                                var TableCustomerNo = $("#TableCustomerNo").val();
                                window.CashInProcessFunction = (TableCustomerNo == 0 ? 'CashierDineTableLogin' : 'CashierDineTableCustomerLogin');
                                window.CashedInList(data, hashpasscode, 'Dine Table');
                                $("#dialog-numpad-passcode").jqxWindow('close');
                                return false;
                            }

                            $scope.TableUserUnique = data.UserUnique;
                            var postdata ="user_unique="+data.UserUnique;
                                postdata+="&status=1";
                            posData.TimeClockCheck(postdata)
                            .success(function(timeclockcheck){
                                if(timeclockcheck.status == 0){
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    if($scope.ClockInCheck == 1){
                                        $("#dialog-numpad-passcode").jqxWindow('close');	
                                        var msg = 'Please Clock In first';	
                                        NumpadAlertClose('clock_in_first', msg)
                                        // .then(function(){
                                        //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        // })
                                    }else{
                                        $("#dialog-numpad-passcode").jqxWindow('close');
                                        $("#table_logout").removeClass('table-login');
                                        $("#table_logout").addClass('table-logout').text(data.UserName);
                                        $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                        LoadHeaderInfo();

                                        var TableCustomerNo = $("#TableCustomerNo").val();
                                        var postdata = "TableUnique="+TableId;
                                        if(TableCustomerNo == 0){
                                            posData.SelectTableWithoutCustomerNo(postdata)
                                            .success(function(data){
                                                if($("#PoleDisplay").val() == 2){
                                                    if(ConnectionPoleDisplay){
                                                        if(tableconn){
                                                            tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                                                        }
                                                    }
                                                }
                                                $window.location = 'pointofsale';
                                            })
                                        }else{
                                            SetTableCustomer(hashpasscode);
                                            LoadHeaderInfo();
                                            if($("#POSOrderTypeRequired").val() == 2){
                                                posData.OrderTypePopupList()
                                                .success(function(data){
                                                    OrderTypeWindowApp('OrderTypePopupAppDineTable', data.html)
                                                    .then(function(){
                                                        WindowPopupOrderTypeApp('Order type');
                                                    })
                                                })
                                            }else{
                                                NumpadTableNoOfCustomer('select_table_with_customer_no')
                                                .then(function(){
                                                    WindowTableNoOfCustomer('Customer Count')
                                                    .then(function(){
                                                        setTimeout(function(){
                                                        $("#table_number_field").val(1);
                                                        $("#table_number_field").jqxNumberInput('focus');
                                                            var input = $('#table_number_field input')[0];
                                                            if('selectionStart' in input) {
                                                                input.setSelectionRange(0, 0);
                                                            }else{
                                                                var range = input.createTextRange();
                                                                range.collapse(true);
                                                                range.moveEnd('character', 0);
                                                                range.moveStart('character', 0);
                                                                range.select();
                                                            }
                                                            $("#table_number_field input").select();
                                                        },100)
                                                    })
                                                })
                                            }   
                                        }
                                    }
                                }else{
                                    $("#dialog-numpad-passcode").jqxWindow('close');
                                    $("#table_logout").removeClass('table-login');
                                    $("#table_logout").addClass('table-logout').text(data.UserName);
                                    $("#table_dine_in").jqxWindow('setTitle', data.setTitle);
                                    SetTableCustomer(hashpasscode);
                                    var TableCustomerNo = $("#TableCustomerNo").val();
                                    var postdata = "TableUnique="+TableId;
                                    if(TableCustomerNo == 0){
                                        posData.SelectTableWithoutCustomerNo(postdata)
                                        .success(function(data){
                                            LoadHeaderInfo();
                                            if($("#PoleDisplay").val() == 2){
                                                if(ConnectionPoleDisplay){
                                                    if(tableconn){
                                                        tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
                                                    }
                                                }
                                            }
                                            $window.location = 'pointofsale';
                                        })
                                    }else{
                                        NumpadTableNoOfCustomer('select_table_with_customer_no')
                                        .then(function(){
                                            WindowTableNoOfCustomer('Customer Count')
                                            .then(function(){
                                                setTimeout(function(){
                                                    $("#table_number_field").val(1);
                                                    $("#table_number_field").jqxNumberInput('focus');
                                                    var input = $('#table_number_field input')[0];
                                                    if('selectionStart' in input) {
                                                        input.setSelectionRange(0, 0);
                                                    }else{
                                                        var range = input.createTextRange();
                                                        range.collapse(true);
                                                        range.moveEnd('character', 0);
                                                        range.moveStart('character', 0);
                                                        range.select();
                                                    }
                                                    $("#table_number_field input").select();
                                                },100)
                                            })
                                        })
                                    }
                                }
                            })
                        }else{
                            $("#dialog-numpad-passcode").jqxWindow("close");
                            var msg = "Sorry, you don't have permission";
                            NumpadAlertClose('invalid_cashout_server_code', msg)
                            // .then(function(){
                            //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            // });
                        }
                    }else{
                        $("#dialog-numpad-passcode").jqxWindow("close");
                        NumpadAlertClose('no_cashin', data.msg)
                        // .then(function(){
                        //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        // });  
                    }
                }else{
                    $("#dialog-numpad-passcode").jqxWindow("close");
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    // .then(function(){
                    //     WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    // });
                }
            })

        }else{
            var msg = 'Passcode cannot be empty';	
            NumpadAlertClose('invalid_passcode', msg)
            // .then(function(){
            //     WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
            // })
        } 
    })

    /*
    |-----------------------------------------------------------------------------------------
    | Table Popup automatically when cookie TablePopupTemporary set
    |-----------------------------------------------------------------------------------------
    */
    var TablePopup = function(){
        $http({
            method: 'get',
            url: base_url + 'pos/cashier/tables/check-popup',
        }).success(function(data){
            if(data.Popup){
                PopupWindowDineIn()
                .then(function(){
                    $("#table_dine_in").jqxWindow('setTitle', 'Dine in Table');
                    WindowTableDineIn("Dine in Table"+ " | "+ $("#Server").val());
                    // setTimeout($.unblockUI, 100);
                })
            }else{
                // setTimeout($.unblockUI, 100);
            }
        })
    }
    TablePopup();

    // Create Number of Customer form
    var populateTableNoOfCustomer = function(form){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_no_of_customer").append('<div id="table_no_of_customer_container" style="background: #144766; color:#EEE; overflow:hidden;"></div>');
            $("#table_no_of_customer_container").html('');
            $("#table_no_of_customer_container").append(
                '<h4 id="no_of_customer_form_msg"></h4>'
            );
            $("#table_no_of_customer_container").append(
                '<form id="'+form+'">'+
                    '<div id="table_number_field" class="hdfield"></div>'+
                    '<div id="TableNoOfCustomer"></div>'+
                    '<input type="hidden" id="entertableno"/>'+
                    '<input type="hidden" id="customer_no_userid"/>'+
                    '<input type="hidden" id="customer_no_cashtype"/>'+
                '</form>'
            );
            $("#table_number_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: 0 });
            $('#table_number_field').on('change', function (event) {
                var value = event.args.value;
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                myNumber = value;
            }); 
            def.resolve();
        }, 100);
        return def.promise();
    }
    // Number Customer Form setting
    var WindowTableNoOfCustomer = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_no_of_customer").jqxWindow({
                title: header_title,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
				closeAnimationDuration: 0
            });
            $('#table_no_of_customer').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }
    // Populate Customer Number Form
    var NumpadTableNoOfCustomer = function(form_name){
        var def = $.Deferred();
        populateTableNoOfCustomer(form_name)
        .then(function(){
            $('#TableNoOfCustomer').numeric_numpad({
                layout: "numbers_only",
                input: $('#table_number_field')
            });
            setTimeout(function(){
                $("#table_number_field").focus();
                def.resolve();
            },100);
        });
        return def.promise();
    }

    // Order Type
    var populateOrderTypeApp = function(form_name, types){
		var def = $.Deferred();
		setTimeout(function(){
			$("#ordertype-popup").append('<div id="ordertype-popup-container" style="background: #144766; color:#EEE;"></div>');
			$("#ordertype-popup-container").html('');
			$("#ordertype-popup-container").append(types);
			$("#ordertype-popup-container").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="ordertype_input" class="hdfield" style="color:#000; display:none;">'+
				'<div id="keyboard_order_type"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
		
	var WindowPopupOrderTypeApp = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#ordertype-popup").jqxWindow({
				height: 320,
				width: 300,
				title: header_title,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#ordertype-popup').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
	}
		
	var OrderTypeWindowApp = function(form_name, types){
		var def = $.Deferred();
		populateOrderTypeApp(form_name, types)
		.then(function(){
			$('#keyboard_order_type').hdkeyboard({
			  layout: "alert_yes_ok",
			  input: $('#ordertype_input')
			});
			$('#ordertype_input').focus();
			def.resolve();
		})
		return def.promise();
    }

    var OrderTypeNo;
    var OrderTypeName;
    $(document).on('submit', '#OrderTypePopupAppDineTable', function(e){
        e.preventDefault();
        OrderTypeNo = $('input[type=radio][name=group1]:checked').attr('id');
        OrderTypeName = $("#"+OrderTypeNo).closest('label').text();
        NumpadTableNoOfCustomer('select_table_with_customer_no')
        .then(function(){
            WindowTableNoOfCustomer('Customer Count')
            .then(function(){
                setTimeout(function(){
                    $("#table_number_field").val(1);
                    $("#table_number_field").jqxNumberInput('focus');
                    var input = $('#table_number_field input')[0];
                    if('selectionStart' in input) {
                        input.setSelectionRange(0, 0);
                    }else{
                        var range = input.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', 0);
                        range.moveStart('character', 0);
                        range.select();
                    }
                    $("#table_number_field input").select();
                },100)
            })
        })
        $("#ordertype-popup").jqxWindow('close');
    })

    var populateNumpadAlert = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#alert-msg-popup").append(''+
			'<form id="'+form_name+'">'+
				'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
				'<h4>'+msg+'</h4>'+
				'<br/>'+
				'<div id="keyboard"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}

    var NumpadAlertOk = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlert(form, msg)
		.then(function(){
			$('#keyboard').hdkeyboard({
			  layout: "alert_ok",
			  input: $('#number_field')
			});
			def.resolve();
		});
		return def.promise();
    }
    
    var WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-alert").jqxWindow({
				height: 280,
				minWidth: 400,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
                zIndex: 200
			});
			setTimeout(function(){
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
			},100);
			
			def.resolve();	
		},100);
		return def.promise();
	}
}