angular.QuickTableAkamaiposController = function($scope, $http, $routeParams, $q, posData, $window, $filter, $compile, $rootScope){
    var FunctionButton = [];
    var ManualTableUnique;
    var ManualTableName;

    $rootScope.$on(
        'CallFormTableManualReOpen', function(event, arrdata){
            $scope.FormTableManualReOpen(arrdata);
        }
    )

    $scope.FormTableManualReOpen = function(arrdata){
        FormTableManualReOpen(arrdata)
        .then(function(){
            TableManualReOpen()
            .then(function(){
                $("#table_manual_reopen").jqxWindow({position: {x: arrdata[0], y: 50}});
            })
        })
    }
    
    $("#table_manual_reopen").on('close', function(e){
        e.preventDefault();
        $("#table_manual_reopen_container").remove();
    })
    var FormTableManualReOpen = function(arrdata){
        var ref = $.Deferred();
        setTimeout(function(){
            $("#table_manual_reopen").append('<div id="table_manual_reopen_container" style="background: #144766; color:#EEE; margin:0; padding: 0;"></div>')
            $("#table_manual_reopen_container").html(
                '<h2 style="margin: 0 !important; padding: 0 !important;">'+arrdata[1]+'</h2>'+
                '<br>'+
                '<br>'+
                '<div style="width: 100%; overflow:hidden; text-align:right;">'+
                '<button class="btn btn-danger btn-lg" id="table_manual_reopen_no">Cancel</button>'+
                '&nbsp;'+
                '<button class="btn btn-success btn-lg" id="table_manual_reopen_yes">Open Table</button>'+
                '</div>'+
                '<input type="hidden" id="table_manual_reopen_receipt_header_unique" value="'+arrdata[2]+'"/>'
            );
            def.resolve();
        },100);
        return def.promise();
    }

    var TableManualReOpen = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_manual_reopen").jqxWindow({
                height: 255,
                minWidth: 450,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                title: 'Table Manual Option',
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            })
            $("#table_manual_reopen").jqxWindow('open');
            def.resolve();
        },100)
        return def.promise();
    }

    $rootScope.$on('CallFormTableManualCombine', function(event, arrdata){
        $scope.FormTableManualCombine(arrdata);
    })

    $scope.FormTableManualCombine = function(arrdata){
        FormTableManualCombine(arrdata)
        .then(function(){
            TableManualCombine()
            .then(function(){
                $("#table_manual_combine").jqxWindow({position: {x: arrdata[0], y: 50}});
            })
        })
    }
    $("table_manual_combine").on('close', function(e){
        e.preventDefault();
        $("#table_manual_combine_container").remove();
    })
    var FormTableManualCombine = function(arrdata){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_manual_combine").append('<div id="table_manual_combine_container" style="background: #144766; color:#EEE; margin:0; padding: 0;"></div>');
            $("#table_manual_combine_container").html(
                '<h2 style="padding: 0 !important; margin: 0 !important;">'+arrdata[1]+'</h2>'+
                '<br>'+
                '<br>'+
                '<button class="btn btn-success btn-lg" id="table_manual_combine_yes" style="color: #000 !important; font-weight: bold; line-height: 20px;">Combine<br>Tables</button>'+
                '&nbsp;'+
                '<button class="btn btn-danger btn-lg" id="table_manual_combine_cancel" style="color: #000 !important; font-weight: bold; line-height: 40px;">Cancel</button>'+
                '<input type="hidden" id="reference1" value="'+arrdata[2]+'"/>'
            )
            def.resolve();
        },100)
        return def.promise();
    }
    
    var TableManualCombine = function(){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_manual_combine").jqxWindow({
                height: 255,
                minWidth: 450,
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                title: 'Table Manual Option',
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
            })
            $("#table_manual_combine").jqxWindow('open');
            def.resolve();
        },100)
        return def.promise();
    }

    $rootScope.$on('CallTableManualOption', function(event, arrdata){
        $scope.setTableManualOption(arrdata);
    })

    $scope.setTableManualOption = function(arrdata){
        TableManualOption(arrdata[1]);
        $("#table_manual_option").jqxWindow({position: {x: arrdata[0], y: 50 }});
    }

    // Table Manual Options
    var TableManualOption = function(msg){
        $("#table_manual_option").jqxWindow({
            height: 245,
            minWidth: 450,
            isModal: true,
            theme: 'darkblue',
            showCloseButton: true,
            title: 'Table Manual Option',
            resizable: false,
            draggable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })
        $("#table_manual_msg").text(msg);
        $("#table_manual_option").jqxWindow('open');
    }

    //Create alert message form dynamic
	var populateNumpadAlertClose = function(form_name, msg){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qrc_alert_message").append('<div id="qrc_alert_message_container" style="background: #144766; color:#EEE; margin:0 !important; padding: 0 !important;"></div>');
			$("#qrc_alert_message_container").html('');
			$("#qrc_alert_message_container").append(
				'<div style="width:100%;"><h2 id="alert_message">'+msg+'</h2></div>'+
				'<br><br><br>'+
                '<div style="width:100%; text-align:right; padding: 0; margin:0;">'+
                    '<button class="btn btn-danger btn-lg" id="tbl_alert_close" style="margin:5px;">Close</button>'+
                    '<button class="btn btn-success btn-lg" id="tbl_reopen_receipt" style="display:none;">Open Table</button>'+
				'</div>'
			);
			def.resolve();
		},500);
		return def.promise();
	}
	//Alert message window popup setting
	var WindowPopupAlert = function(header_text){
		var def = $.Deferred();
		setTimeout(function(){
			$("#qrc_alert_message").jqxWindow({
				height: 280,
				minWidth: 450,
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
				draggable: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
			});
			$('#qrc_alert_message').jqxWindow('setTitle', header_text);
            $('#qrc_alert_message').jqxWindow('open');
            $("#qrc_alert_message").jqxWindow('focus');
			def.resolve();	
		},100);
		return def.promise();
	}
	//Populate Alert message
	var NumpadAlertClose = function(form, msg){
		var def = $.Deferred();
		populateNumpadAlertClose(form, msg)
		.then(function(){
			def.resolve();
		});
		return def.promise();
    }

    $rootScope.$on('CallPOSNumpadAlertClose', function(event, msg){
        $scope.NumpadAlertClose(msg);
    })

    $scope.NumpadAlertClose = function(msg){
        NumpadAlertClose('generic_form', msg)
        .then(function(){
            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>')
            .then(function(){
                var OrderListWidth = ($(".orderedlist").width() + 3);
                $("#tbl_reopen_receipt").show();
                $("#qrc_alert_message").jqxWindow({position: {x: OrderListWidth, y: 50 }});
            })	
        })
    }

    $("#table_manual_passcode").on('close', function(e){
		e.preventDefault();
        $("#table_manual_passcode_container").remove();
        myNumber = '';
	})
    
    var populateTableManualNumpadPasscode = function(form_name){
        var def = $.Deferred();
        setTimeout(function(){
            $("#table_manual_passcode").append('<div id="table_manual_passcode_container" style="background: #144766; color:#EEE;"></div>');
            $("#table_manual_passcode_container").html('');
            $("#table_manual_passcode_container").append('<h4 style="text-align:center;">Enter Passcode</h4>');
            $("#table_manual_passcode_container").append(
                '<form id="'+form_name+'" autocomplete="off">'+
                    '<input type="password" class="hdfield" id="number_field" style="color:#000">'+
                    '<div id="table_numpad_passcode_fn"></div>'+
                '</form>'
            );
            def.resolve();
        },100);
        return def.promise();
    }

    var WindowPopupTableManualNumpadPasscode = function(header_title){
        var def = $.Deferred();
        setTimeout(function(){
            var ParentWidth = $(".parent-container").width();
            var ComputeWidth = (ParentWidth / 2);
            var UseWidth = (ComputeWidth);
            $("#table_manual_passcode").jqxWindow({
                isModal: true,
                theme: 'darkblue',
                showCloseButton: true,
                resizable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0,
            });
            $('#table_manual_passcode').jqxWindow('setTitle', header_title);
            $('#table_manual_passcode').jqxWindow('open');
            def.resolve();	
        },100);
        return def.promise();
    }

    var TableManualNumpadPasscode = function(form_name){
        var def = $.Deferred();
        populateTableManualNumpadPasscode(form_name)
        .then(function(){
            $('#table_numpad_passcode_fn').numeric_numpad({
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

    // Create Table Layout Form
    var populateTableLayoutForm = function(form_name){
		var def = $.Deferred();
        $("#table_manual_keyin").append('<div id="table_manual_keyin_container" style="background: #144766; color:#EEE; margin:0; padding:0;"></div>');
        $("#table_manual_keyin_container").html('');
        $("#table_manual_keyin_container").append(
            '<div class="table_manual_title1"><h4 style="text-align:center;" id="keyboard_header">TABLES IN USE</h4></div>'+
            '<div class="table_manual_title2"><h4 style="text-align:center;" id="keyboard_header">ENTER NEW TABLE</h4></div>'
        );
        $("#table_manual_keyin_container").append(
            '<div id="table_inuse"></div>'+
            '<div style="float:left; width:38%;">'+
                '<form class="table_manual_form" id="'+form_name+'">'+
                    '<input type="text" id="search_field" maxlength="20" style="color:#000; text-transform: uppercase">'+
                    '<div id="table_keyboard"></div>'+
                '</form>'+
            '</div>'
        );
        posData.GetTablesInUse()
        .success(function(data){
            $("#table_inuse").append(data.html);
            def.resolve();
        })
		return def.promise();
	}
	// Table Form setting
	var WindowPopupTableLayoutForm = function(header_title){
        var def = $.Deferred();
		setTimeout(function(){
			$("#table_manual_keyin").jqxWindow({
				isModal: true,
				theme: 'darkblue',
                showCloseButton: false,
                title: '<button id="table_manual_recall_close" class="glyphicon glyphicon-remove" style="float:left; background-color: #449bca; width: auto;"></button>&nbsp;'+header_title,
                resizable: false,
                draggable: false,
                showAnimationDuration: 0,
                closeAnimationDuration: 0
			});
			$('#table_manual_keyin').jqxWindow('open');
			def.resolve();	
		},100);
		return def.promise();
    }
    
	// Populate Table Form
	var VirtualTable = function(form_name){
		var def = $.Deferred();
		populateTableLayoutForm(form_name)
		.then(function(){
			$('#table_keyboard').numeric_numpad({
			    layout: "virtual_table",
			    input: $('#search_field')
			});
			def.resolve();
		});
		return def.promise();
    }
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
    // Call Table Manual Key-in
    $scope.QuickTables = function(){
        $("#QuickTablesfunction").attr("disabled",true);
        posData.CheckCache()
        .success(function(result){
            if(result.store){
                TableManualNumpadPasscode('quick_table_passcode')	
                .then(function(){
                    WindowPopupTableManualNumpadPasscode('Quick Table | Enter Passcode')
                    .then(function(){
                        setTimeout(function(){
                            $("#number_field").focus();
                        },100);
                    });
                });
                FunctionButton = ['Tables'];
            }else{
                location.reload();
            }
            setTimeout(function(){
                $("#QuickTablesfunction").attr("disabled",false);
            },1000);
        })
    }

    $(document).on('submit', '#quick_table_passcode', function(e){
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
                myNumber = '';
                if(data.validuser){
                    if(data.cashin){
                        if(data.countposition > 0){
                            if($scope.ClockInCheck == 1){
                                var postdata ="user_unique="+data.UserUnique;
                                    postdata+="&status=1";
                                posData.TimeClockCheck(postdata)
                                .success(function(timeclockcheck){
                                    if(timeclockcheck.status == 0){
                                        var msg = 'Please Clock In first';	
                                        NumpadAlertClose('clock_in_first', msg)
                                        .then(function(){
                                            WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
                                        })
                                    }else{
                                        VirtualTable('table_manual_key_in')
                                        .then(function(){
                                            WindowPopupTableLayoutForm('&nbsp;')
                                            .then(function(){
                                                setTimeout(function(){
                                                    $("#search_field").focus();
                                                },100);
                                            })
                                        })
                                    }
                                })
                            }else{
                                VirtualTable('table_manual_key_in')
                                .then(function(){
                                    WindowPopupTableLayoutForm('&nbsp;')
                                    .then(function(){
                                        setTimeout(function(){
                                            $("#search_field").focus();
                                        },100);
                                    })
                                })
                            }
                        }else{
                            var msg = "Sorry, you don't have permission";
                            NumpadAlertClose('invalid_cashout_server_code', msg)
                            .then(function(){
                                WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                            });
                        }
                    }else{
                        NumpadAlertClose('no_cashin', data.msg)
                        .then(function(){
                            WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                        }); 
                    }
                }else{
                    $("#table_manual_passcode").jqxWindow('close');
                    var msg = "Invalid Passcode";
                    NumpadAlertClose('invalid_cashout_server_code', msg)
                    .then(function(){
                        WindowPopupAlert('<span class="glyphicon glyphicon-info-sign"></span>');
                    });
                }
                $("#table_manual_passcode").jqxWindow('close');
            })

        }else{
			$("#table_manual_passcode").jqxWindow('close');
			var msg = "Passcode cannot be empty";
			NumpadAlertClose('remove_item_info', msg)
			.then(function(){
				WindowPopupAlert('Info');
			})
		}
    })

    var TableManualReceiptHeaderUniqueGlobal = '';
    // Submit Table and matching if its exist.
    $(document).on('submit', '#table_manual_key_in', function(e){
        e.preventDefault();
        //Matching table from the list
        var TableNo = $("#search_field").val().toUpperCase();
        var TableCustomerNo = $("#TableCustomerNo").val();

        if(TableNo == null || TableNo == '') {
            var msg = 'Please select or type Table Number.';
            NumpadAlertClose('search_table_name', msg)
            .then(function(){
                WindowPopupAlert('Info');
            })
            return false;
        }

        var resultObject = search("TableName", TableNo, AllTablesArr[0]);
        if(resultObject){
            var postdata ="TableName="+TableNo;
            posData.TableNumberManualCheck(postdata)
            .success(function(data){
                if(data.success){
                    TableManualReceiptHeaderUniqueGlobal = data.result.ReceiptHeaderUnique;
					var msg = data.msg;
                        msg+='<br><br>Would you like to open?';
                    NumpadAlertClose('search_table_name', msg)
                    .then(function(){
                        WindowPopupAlert('Info')
                        .then(function(){
                            $("#tbl_reopen_receipt").show();
                        })
                    })
                    /*
                    var msg = data.msg;
                    NumpadAlertClose('search_table_name', msg)
                    .then(function(){
                        WindowPopupAlert('Info');
                    })
                    */
                }else{
                    ManualTableUnique = resultObject.TableNo;
                    ManualTableName   = resultObject.TableName;
                    // Table customer count required
                    if(TableCustomerNo == 1){
                        if($("#POSOrderTypeRequired").val() == 2){
                            $rootScope.$emit('CallOrderTypeWindow');
                        }else{
                            NumpadTableNoOfCustomer('table_manual_customer_qty')
                            .then(function(){
                                WindowTableNoOfCustomer('Customer Count')
                                .then(function(){
                                    $("#table_number_field").val(1);
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
                                })
                            })
                        }
                    // Table customer count not required
                    }else{
                        var postdata ="TableUnique="+ManualTableUnique;
                            postdata+="&TableName="+ManualTableName;
                        posData.SelectTableManualWithOutCustomerNo(postdata)
                        .success(function(selTableNoCustomer){
                            if(selTableNoCustomer.success){
                                $window.location = 'pointofsale';
                            }else{
                                var msg = selTableNoCustomer.msg;
                                NumpadAlertClose('search_table_name', msg)
                                .then(function(){
                                    WindowPopupAlert('Info');
                                })
                            }
                        })
                    }
                }
            })
            $("#table_manual_keyin").jqxWindow('close');
        }else{
            var msg = 'Table '+TableNo+' does not exist';
            NumpadAlertClose('search_table_name', msg)
            .then(function(){
                WindowPopupAlert('Info');
            })
        }
    })

    $(document).on('click', '#tbl_reopen_receipt', function(e){
        e.preventDefault();
        var postdata ="ReceiptHeaderUnique="+TableManualReceiptHeaderUniqueGlobal;
        posData.TableManualCheckReceiptStatus(postdata)
        .success(function(data){
            if(data.result.open == true){
                var msg = data.result.msg;
                NumpadAlertClose('table_manual_msg', msg)
                .then(function(){
                    WindowPopupAlert('Info');
                })
            }else{
                posData.TableManualOpenReceipt(postdata)
                .success(function(data){
                    if(  $("#TableSplitCheck").val() == 1 ){
                        $window.location = base_url + "pos/pointofsale/split-check";
                    }else{
                        $window.location.href = 'pointofsale';
                    }
                })
            }
        })
    })

    $(document).on('click', '.akkey', function(){
        $("#search_field").focus();
    })

    var OrderTypeSelected;
    var OrderTypeName;
    $(document).on('submit', '#table_manual_customer_qty', function(e){
        e.preventDefault();
        var CustomerQuantity = $("#table_number_field").val();
        if(CustomerQuantity > 2999){
            var msg = "Customer Count can be up to 2999.";
            NumpadAlertClose('customer_count_error', msg)
            .then(function(){
                WindowPopupAlert ('Customer Count Info');
            })
        }else{
            var OrderTypeNo = $('input[type=radio][name=group1]:checked').attr('id');
            OrderTypeName = $("#"+OrderTypeNo).closest('label').text();
            OrderTypeSelected = OrderTypeName;
            var no_customer = $("#table_number_field").val();
            var postdata ="TableUnique=" + ManualTableUnique;
                postdata+="&no_of_customer=" + no_customer;
                postdata+="&OrderTypeNo="+ OrderTypeSelected;
            posData.SelectTableManualWithCustomerNo(postdata)
            .success(function(data){
                if(data.success){
                    $("#table_no_of_customer").jqxWindow('close');
                    $window.location = 'pointofsale';
                }
            })
        }
    })

    $scope.AllTablesArr = []; 
    var AllTablesArr = [];
    var LoadTables = function(){
        posData.AllTables()
        .success(function(data){
            AllTablesArr.push(data);
            $scope.AllTablesArr.push(data);
        })
    }
    LoadTables();

    function search(key, nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if(key == "TableName"){
                if (myArray[i].TableName === nameKey) {
                    return myArray[i];
                }
            }else if(key == "TableNo"){
                if (myArray[i].TableNo === nameKey) {
                    return myArray[i];
                }
            }
        }
    }

    $(document).on('submit', '#table_manual_key_in_pos', function(e){
        e.preventDefault();
        var TableNo = $("#search_field").val().toUpperCase();
        var TableCustomerNo = $("#TableCustomerNo").val();

        if(TableNo == null || TableNo == ''){
            var msg = 'Please select or type Table Number.';
            NumpadAlertClose('search_table_name', msg)
            .then(function(){
                WindowPopupAlert('Info');
            })
            return false;
        }

        var resultObject = search("TableName", TableNo, AllTablesArr[0]);
        if(resultObject){
            ManualTableUnique = resultObject.TableNo;
            ManualTableName   = resultObject.TableName;

            var postdata ="TableName="+TableNo;
            posData.TableNumberManualCheck(postdata)
            .success(function(data){
                if(data.success){
                    var msg = data.msg;
                    var TableStatus = data.success;
                    var TableManualUnique = data.TableUnique
                    var TableInfo =  search("TableNo", TableManualUnique, AllTablesArr[0]);
                    TableManualOption(msg);
                }else{
                    // Table customer count required
                    if(TableCustomerNo == 1){ 
                        NumpadTableNoOfCustomer('table_manual_customer_qty_pos')
                        .then(function(){
                            WindowTableNoOfCustomer('Customer Count')
                            .then(function(){
                                $("#table_number_field").val(1);
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
                            })
                        })
                    // Table customer count not requiMD5red
                    }else{
                        var postdata ="TableUnique="+ManualTableUnique;
                            postdata+="&TableName="+ManualTableName;
                        posData.SelectTableManualWithOutCustomerNo(postdata)
                        .success(function(selTableNoCustomer){
                            if(selTableNoCustomer.success){
                                // $window.location = 'pointofsale';
                                LoadHeaderInformation();
                            }else{
                                var msg = selTableNoCustomer.msg;
                                NumpadAlertClose('search_table_name', msg)
                                .then(function(){
                                    WindowPopupAlert('Info');
                                })
                            }
                        })
                    }
                }
            })
        }else{
            var msg = 'Table '+TableNo+' does not exist';
            NumpadAlertClose('search_table_name', msg)
            .then(function(){
                WindowPopupAlert('Info');
            })
        }
        $("#table_manual_keyin").jqxWindow('close');
    })

    $rootScope.$on('CallLoadHeaderInformation', function(event){
        $scope.LoadHeaderInformation();
    })
 
    $scope.LoadHeaderInformation = function(){
        LoadHeaderInformation();
    }

    var LoadHeaderInformation = function(){
        posData.LoadHeader()
        .success(function(data){
            if(data.HeaderInfo){
                var resOrderNo = data.HeaderInfo.OrderNo;
                $("#receiptn").text(data.HeaderInfo.receipt_number);
                $("#station").text(data.HeaderInfo.station_name);
                $("#user_name").text(data.HeaderInfo.user_name);
                $("#login_name").text(data.HeaderInfo.login_name);
                $("#tableno").text(data.HeaderInfo.tableno);
                var table_assigned = data.HeaderInfo.tableno;
                if(table_assigned != 'Table'){
                    $("#tableno").addClass('table_assigned');
                }else{
                    $("#tableno").removeClass('table_assigned');
                }
                $("#customer_count").text((data.HeaderInfo.customer_count > 0 ? data.HeaderInfo.customer_count : 1));
                $scope.StatStationName 	= data.HeaderInfo.station_number;
                $scope.StatCashIn 		= data.HeaderInfo.cashin;
                $scope.TempStationName 	= data.HeaderInfo.station_number;
                $scope.TempCashIn 		= data.HeaderInfo.cashin;
                $("#receiptlabel").text(data.HeaderInfo.LabelNote);
                if(resOrderNo !== null){
                    $("#OrderNoDisplayLine").show();
                    $("#OrderNoDisplay").text(data.HeaderInfo.OrderNo);
                }else{
                    $("#OrderNoDisplayLine").hide();
                }
            }
        })
    }

    $(document).on('submit', '#table_manual_customer_qty_pos', function(e){
        e.preventDefault();
        var no_customer = $("#table_number_field").val();
        var postdata ="TableUnique=" + ManualTableUnique;
            postdata+="&no_of_customer=" + no_customer;
        posData.SelectTableManualWithCustomerNo(postdata)
        .success(function(data){
            if(data.success){
                LoadHeaderInformation();
                $("#table_no_of_customer").jqxWindow('close');
            }
        })
    })

    $rootScope.$on("CallVirtualTable", function(event, action){
        $scope.CallVirtualTableWindow(action);
    })
    
    $scope.CallVirtualTableWindow = function(action){
        VirtualTable(action[1])
		.then(function(){
			WindowPopupTableLayoutForm('&nbsp;')
			.then(function(){
                $("#table_manual_keyin").jqxWindow({position: {x: 0, y: 50}})
				$("#search_field").focus();
			})
		})
    }

    $rootScope.$on("CallSearchArr", function(event, key, nameKey, myArray){
        $scope.searchFromArr(key, nameKey, myArray);
    })

    $scope.searchFromArr = function(key, nameKey, myArray){
        search(key, nameKey, myArray);
    }

    $rootScope.$on("CallNumpadTableNoOfCustomer", function(event, form){
        $scope.NumpadTableNoOfCustomer(form);
    })

    $scope.NumpadTableNoOfCustomer = function(form){
        NumpadTableNoOfCustomer(form)
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


    $rootScope.$on("CallNumpadTableNoOfCustomerCashier", function(event, arrdata){
        $scope.NumpadTableNoOfCustomerCashier(arrdata);
    })

    $scope.NumpadTableNoOfCustomerCashier = function(arrdata){
        NumpadTableNoOfCustomer(arrdata[1])
        .then(function(){
            WindowTableNoOfCustomer('Customer Count')
            .then(function(){
                $("#customer_no_userid").val(arrdata[0]);
                $("#table_number_field").val(1);
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
            })
        })
    }

    $(document).on('click', '#tbl_alert_close', function(e){
        e.preventDefault();
        if( $("#table_manual_customer_qty").length > 0 ){
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
        }

        $("#qrc_alert_message").jqxWindow('close');
    })

    var OrderTypeNoFromTableManual;
    $(document).on('submit', '#OrderTypeFromTableManual', function(e){
        e.preventDefault();
        var OrderTypeNo = $('input[type=radio][name=group1]:checked').attr('id');
        OrderTypeNoFromTableManual = OrderTypeNo; 
        NumpadTableNoOfCustomer('table_manual_customer_qty')
        .then(function(){
            WindowTableNoOfCustomer('Customer Count')
            .then(function(){
                $("#table_number_field").val(1);
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
            })
        })
        $("#ordertype-popup").jqxWindow('close');
    })

    // Learning section
    const multiply = (number) => {
        return number * 2;
    }
    const multiply2 = (number) => number * 10;

    const printMyName1 = (name, age) => {
        console.log(name, age);
    }
    const printMyName2 = name => {
        console.log(name);
    }
    const printMyName3  = name => {
        return 
    }
    // console.log(multiply2(2));

    class Human {
        constructor() {
            this.gender = 'male';
        }

        printGender() {
            console.log(this.gender);
        }
    }
    class Person {
        constructor() {
            // super();
            this.name = 'Liza';
            this.gender = 'female';
        }

        printMyName() {
            // console.log(this.name, this.gender);
        }
    }

    const person = new Person();
    person.printMyName();
    // person.printGender();

    const numbers = [1,2,3];
    const myNumbers = [...numbers, 4];
    // console.log(myNumbers);

    $(document).on('click', '#table_manual_recall_close', function(){
        $("#table_manual_keyin").jqxWindow('close');
    })

}