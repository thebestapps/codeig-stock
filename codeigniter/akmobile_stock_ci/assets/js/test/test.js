posData.TimeClockPasscode(postdata)
            .success(function(datainfo){
                if(datainfo == ''){
					$("#dialog-numpad-passcode").jqxWindow("close");
					var msg = 'Invalid code';	
					NumpadAlertOk('invalid_passcode', msg)
					.then(function(){
					   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
					})
                }else{
                    var date = new Date();
                    // Find Clock In if already exist then update
                    // if not Create new.
                    postdata='';
                    timeclock_message = '';
                    postdata="user_unique="+datainfo[0].Unique;
                    postdata+="&status="+1;
                    posData.TimeClockCheck(postdata)
                    .success(function(datacheck){
                        if(datacheck == ''){
							/*
                            postdata ="user_unique="+datainfo[0].Unique;
                            postdata+="&user_name="+datainfo[0].UserName;
                            postdata+="&clock_in_date="+ $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss', "-1000");
                            postdata+="&clock_in_time="+ $filter('date')(new Date(), 'HH:mm:ss');
                            postdata+="&status="+1;
                            postdata+="&created_by="+datainfo[0].Unique;
                            postdata+="&clock_in_location="+store_unique_id;
                            postdata+="&clock_date="+ $filter('date')(new Date(), 'yyyy-MM-dd');
                            posData.TimeClockSave(postdata)
                                .success(function(data){
                                    console.log(data);
                                })
                                .error(function(){
                                    alert("Sorry, we encountered a technical difficulties");
                                });
                            $scope.enterclock = {
                                passcode: ''
                            };

                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var ampm = hours >= 12 ? 'PM' : 'AM';
                            $("#dialog-numpad-passcode").jqxWindow('close');	
							var msg = '<div align="center">'+capitalizeFirstLetter(datainfo[0].UserName)+'</div><br/>';
								msg+= '<div align="center">'+$filter('date')(new Date(), 'MM/dd/yyyy') +" "+ $filter('date')(new Date(), 'h:mm ')+ampm+'</div><br>';						msg+= '<div align="center" style="color:#FF0000;">Clock In</div>';							
							NumpadAlertOk('time_clock_out', msg)
							.then(function(){
								 WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span> Time Clock');	
							});
							 
                            var postdata="passcode="+hashpasscode;
                            postdata+="&cashtype=2";
                            posData.EnterPassCode(postdata)
                            .success(function(data){
                                if(data.success == true){
                                    //DialogEnterCashOutCode.close();
                                    $("#dialog-numpad-passcode").jqxWindow("close");
									LoadHeaderInfo();
                                }else{
									$("#dialog-numpad-passcode").jqxWindow("close");
									var msg = 'Invalid code';	
								    NumpadAlertOk('invalid_passcode', msg)
								    .then(function(){
									   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
								    })
                                }
                            })
							*/
							$("#dialog-numpad-passcode").jqxWindow('close');
							if($scope.ClockInCheck == 1){
								$("#dialog-numpad-passcode").jqxWindow('close');	
								var msg = 'Please Clock-In first';	
								NumpadAlertOk('clock_in_first', msg)
								.then(function(){
									WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
								})
							}else{
								LoadHeaderInfo();
                                var postdata="Setting=CashOutBlind";
                                $http({
                                    method: 'POST',
                                    url: base_url + 'pos/load/settings',
                                    data: postdata,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).success(function(data){
                                    if(data.result > 0){
                                        CashCountProcess2(); //Hide some Details
                                    }else{
                                        CashCountProcess(); //Show all Details
                                    }
                                })
							}
							
                        }else{
                            var postdata="passcode="+hashpasscode;
                            postdata+="&cashtype=2";
                            posData.EnterPassCode(postdata)
                            .success(function(data){
                                if(data.success == true){
                                    $("#dialog-numpad-passcode").jqxWindow("close");
                                     LoadHeaderInfo();
                                    var postdata="Setting=CashOutBlind";
                                    $http({
                                        method: 'POST',
                                        url: base_url + 'pos/load/settings',
                                        data: postdata,
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    }).success(function(data){
                                        if(data.result > 0){
                                            CashCountProcess2(); //Hide some Details
                                        }else{
                                            CashCountProcess(); //Show all Details
                                        }
                                    })
                                }else{
									$("#dialog-numpad-passcode").jqxWindow("close");
									var msg = 'Invalid code';	
								    NumpadAlertOk('invalid_passcode', msg)
								    .then(function(){
									   WindowPopupAlert ('<span class="glyphicon glyphicon-info-sign"></span>');	
								    })
                                }
                            })

                        }
                    })
                }
            })
        })