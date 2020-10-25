(function() {
	/*Need to be fix to this page
	1. Remove button border it shows to Google Chrome browser
	2. When click dialog-alert inside the box the form will close
	*/	
	//-->Global Variable
	var GlobalItemUnique = {};

	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter) {

		var GridTheme = $("#GridTheme").val();
		var dialog;
		var Quedialog;
		var Alertdialog;
		var PasscodeDialog;
		var AlertProcessdialog;
		var dialogquestion;
		var sizemode = 0;
		sizemode = window.screen.availHeight;
		/*1=OnHold, 2=Completed, 3=Cash, 4=Credit Card, 5=Gift Card, 6=EBT*/
		var recall_by_location = 1;
		/*
		switch(sizemode) {
			case 768:
				sizemode = 13; 
				break;
			case 1000:
				sizemode = 15; 
				break;	
			case 1080:
				sizemode = 25
				break;
			default:
				sizemode = 10;
		}
		*/
		if(sizemode == 768){
			sizemode = 13;
		}else if(sizemode == 1000){
			sizemode = 15; 
		}else if(sizemode == 1080){
			sizemode = 25
		}else{
			sizemode = 10;
		}

		$scope.EditCustomerSaveDisabled = true;
		$scope.AddCustomerSaveDisabled = true;
		$scope.EditCustomerDefaultButtons = true;
		$scope.EditCustomerWhenCloseSaveChanges = false;
		$scope.EditCustomerWhenDelete = false;
		$scope.EditCustomerWhenClose = '';
		$scope.BtnCheckPrintWhen = true;
		
		/*Global Variables*/
		var populateNumpadPassword = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_numpad").html('');
				$("#custom_numpad").append(''+
				'<form id="'+form_name+'">'+
				'<input type="password" id="number_field" maxlength="25">'+
				'<div id="keyboard"></div>'+
				'</form>');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var populateAlert = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_alert").html('');
				$("#custom_alert").append(''+
					'<form id="'+form_name+'">'+
						'<h4 id="alert-msg">'+msg+'</h4>'+
						'<br/>'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var populateAlertProcess = function(form_name, msg){
			var def = new $.Deferred();
			setTimeout(function(){
				$("#custom_process").html('');
				$("#custom_process").append(''+
					'<form id="'+form_name+'">'+
						'<h4 id="alert-msg">'+msg+'</h4>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var populateAlertYesNo = function(form_name, msg){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_alert-yes-no").html('');
				$("#custom_alert-yes-no").append(''+
					'<form id="'+form_name+'">'+
						'<h4 id="alert-msg">'+msg+'</h4>'+
						'<br/>'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		var populateAlertViewEditCancel = function(form_name){
			var def = $.Deferred();
			setTimeout(function(){
				$("#custom_alert-view-edit-cancel").html('');
				$("#custom_alert-view-edit-cancel").append(''+
					'<form id="'+form_name+'">'+
						'<input type="text" id="number_field" maxlength="25" value="1" style="display:none;">'+
						'<div id="keyboard"></div>'+
					'</form>'+
				'');
				def.resolve();
			},100);
			return def.promise();
		}
		
		/* Dynamic Plugin Commands */
		$(document).on('click', '.button_cancel', function(e){
			e.preventDefault();
			var elemPopup = $(this).closest('.jqx-window').attr('id');
			var elemRemove = $(this).closest('form').attr('id');
			$("#"+elemPopup).jqxWindow('close');
			$("#"+elemRemove).remove();
			console.log(elemRemove);
		});
		
		
		/* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupNumpad = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-numpad").jqxWindow({
					height: size[0],
					minWidth: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.lenght > 0)
					$('#dialog-numpad').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-numpad').jqxWindow('open');
				}else{
					$('#dialog-numpad').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlert = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-alert").jqxWindow({
					height: size[0],
					width: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.length > 0)
					$('#dialog-alert').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-alert').jqxWindow('open');
				}else{
					$('#dialog-alert').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		/* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlertProcess = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-process").jqxWindow({
					height: size[0],
					width: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.length > 0)
					$('#dialog-process').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-process').jqxWindow('open');
				}else{
					$('#dialog-process').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		
		/* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlertYesNo = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-alert-yes-no").jqxWindow({
					height: size[0],
					minWidth: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.length > 0)
					$('#dialog-alert-yes-no').jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#dialog-alert-yes-no').jqxWindow('open');
				}else{
					$('#dialog-alert-yes-no').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		
		/* Modal
		@param string title
		@param boolean method
		@param array size
		*/
		var WindowPopupAlertViewEditCancel = function(title, method, size, move){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#dialog-alert-view-edit-cancel").jqxWindow({
					height: size[0],
					minWidth: size[1],
					title: title,
					isModal: true,
					theme: 'darkblue',
					showCloseButton: false
				});
				//Window Position
				/*
				@param move[0] -> left
				@param move[1] -> top 
				*/
				if(move.length > 0)
					$('#dialog-alert-view-edit-cancel').jqxWindow('move', move[0], move[1]);
				if(method){
					$('#dialog-alert-view-edit-cancel').jqxWindow('open');
				}else{
					$('#dialog-alert-view-edit-cancel').jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		
		var NumpadPromptRecallPrint = function(msg){
			var def = $.Deferred();
			populateNumpadPassword('recallprint_form')
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "numbers_only",
				  input: $('#number_field')
				});
				setTimeout(function(){
					$("#search_field").focus();
					def.resolve();
				},100);
			});
			return def.promise();
		}
		
		var NumpadPromptAlertForgotSelect = function(msg){
			var def = $.Deferred();
			populateAlert('recallprint_alert_form', msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var NumpadPromptAlertPrinterProblem = function(msg){
			var def = $.Deferred();
			populateAlert('recall_printer_problem_alert_form', msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			});
			return def.promise();
		}
		
		var NumpadPromptAlertProcess = function(msg){
			var def = $.Deferred();
			populateAlertProcess('recall_print_process_alert_form', msg)
			.then(function(){
				def.resolve();
			});
			return def.resolve();
		}
		
		var NumpadPromptAlertYesNo = function(msg){
			var def = $.Deferred();
			populateAlertYesNo('kitchen_print_problem_alert_form', msg)
			.then(function(){
				$('#keyboard').hdkeyboard({
				  layout: "alert_yes_no",
				  input: $('#number_field')
				});
				def.resolve();
			})
			return def.resolve();
		}
		
		var NumpadPromptAlertViewEditCancel = function(){
			var def = $.Deferred();
			populateAlertViewEditCancel('recall_view_edit_cancel')
			.then(function(){
				$('#keyboard').hdkeyboard({
					layout: "alert_recall_view_edit_cancel",
					input: $('#number_field')
				});
				def.resolve();
			})
			return def.promise();
		}
		
		/*End Variables*/
		
		var ProcessDialog = function(title, method, info){
			$scope.process = {
				message: info
			};
			AlertProcessdialog.setTitle(title);
			if(method){
				AlertProcessdialog.open();
			}else{
				AlertProcessdialog.close();
			}
		}
		

		$scope.dateInputFromstring = 'MM/dd/yyyy';
		$scope.dateInputTostring = 'MM/dd/yyyy';

		$scope.dateInputSettingsFrom = {
			width: 105,
			height: 30
		}

		$scope.dateInputSettingsTo = {
			width: 105,
			height: 30
		}

		$scope.date = {
			from: $filter('date')(new Date(), 'MM/dd/yyyy'),
			to: $filter('date')(new Date(), 'MM/dd/yyyy')
		}

		$scope.StationselectedValue = '';
		$scope.CashInselectedValue = '';
		$scope.StatStationName = '';
		$scope.StatCashIn = '';

		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = true;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsGiftCardWhen = false;

		$scope.gridSettingsOnHold = {};
		$scope.gridSettings = {};
		$scope.gridSettingsCash = {};
		$scope.gridSettingsCreditCard = {};
		$scope.gridSettingsGiftCard = {};

		$scope.StationcomboBoxSettings = {
			source: '', itemHeight: 25, height: 25, width: 80,
		}
		
		$scope.LocationcomboBoxSettings = {
			source: '', itemHeight: 25, height: 25, width: 80,
		}
		
		$scope.CashIncomboBoxSettings = {
			source: '', itemHeight: 25, height: 25, width: '180px',
		};

		$scope.tabsSettings = {};
		$scope.thetabsadd = 'darkblue';
		$scope.selectedItem = 0;
	
		$scope.RedirectDashboard = function(){
			posData.NewSaleQue()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleqshowModal = !$scope.newsaleqshowModal;
				}else if(data.success == false){
					posData.EmptyTransaction()
					.success(function(data){
						if(data.success == true){
							$window.location.href = 'cashier';
						}
					})
				}
			})
		};
		
		//HD here
		var load_recall = function(){
			var def = $.Deferred();
			$scope.date = {
				from: $filter('date')(new Date(), 'MM/dd/yyyy'),
				to: $filter('date')(new Date(), 'MM/dd/yyyy')
			};

			$scope.RecallSale = {
				Selected: 5
			}

			$scope.isOnHoldBold = false;
			$scope.isCompletedBold = false;
			$scope.isCashBold = false;
			$scope.isCreditCardBold = false;

			$scope.StationselectedValue = $scope.TempStationName;
			$scope.CashInselectedValue = $scope.TempCashIn;
		
			$scope.gridSettingsCashWhen = false;
			$scope.gridSettingsCreditCardWhen = false;
			$scope.gridSettingsOnHoldWhen = true;
			$scope.gridSettingsWhen = false;
			$scope.gridSettingsCashInWhen = false;
			$scope.gridSettingsGiftCardWhen = false;
			$scope.CashInWhen = true;

			setTimeout(function(){
				def.resolve();
			},100);
			
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&station="+ $scope.StatStationName;
			postdata+="&status=5";
			postdata+="&location="+ $("#Locations").val();
			
			var settings="Setting=RecallHideAggregrateTotals"
			$http({
				method: 'POST',
				data: settings,
				url: base_url + "pos/load/settings",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				var ShowAggregatesTotal = false;
				if(data.result > 0){
					ShowAggregatesTotal = false;
				}else{
					ShowAggregatesTotal = true;
				}
				$http({
					method: 'post',
					data: postdata,
					url: base_url + "pos/pointofsale/load-recall-sale",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsOnHold = {
						showaggregates: ShowAggregatesTotal,
						showstatusbar: ShowAggregatesTotal,
						statusbarheight: 30,	
						source:  {
							localdata: data
						}
					}
				})
				$("body").unblock();
			});	
			return def.promise();
		}
		
		var PoleDisplayTotal = function(){
		   var def = $.Deferred();
		   posData.PoleDisplayTotal()
		   .success(function(data){
			 def.resolve(); 
		   })
		   return def.promise();	 
	    }
		
	    var PoleDisplayReset = function(){
			var def = $.Deferred();
			posData.PoleDisplayReset()
			.success(function(data){
				def.resolve();
			})
			return def.promise();
		}
		
		var PoleDisplay = function(unique){
			var def = $.Deferred();
			var postdata="receipt_details_unique="+unique;
			posData.PoleDisplay(postdata)
			.success(function(data){
				def.resolve();
			})
			return def.promise();
		}
		
		var LoadStationCashIn = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/station-cashier/info'
			}).success(function(data){
				var source = {
					datatype: "json",
					datafields: [
						{ name: 'station_cashier_unique' },
						{ name: 'CashInNumber' }
					],
					localdata: data
				};
				$scope.CashIncomboBoxSettings = {
					source: source, displayMember: "CashInNumber", valueMember: "station_cashier_unique", itemHeight: 25, height: 25, width: '205'
				};
				def.resolve();
			})
			return def.promise();
		}
		
		var LoadStationData = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/station/info'
			}).success(function(data){
				var source = {
					datatype: "json",
					datafields: [
						{ name: 'Unique' },
						{ name: 'Name' }
					],
					localdata: data
				};
				$scope.StationcomboBoxSettings = {
					source: source, autoComplete: true, displayMember: "Name", valueMember: "Unique", itemHeight: 25, height: 25, width: 80
				};
				/*
				$scope.selectHandlerStation = function (event) {
					if (event.args) {
						var item = event.args.item;
						if (item) {
							$scope.StatStationName = item.value
							
							var RecallSaleSelected = $scope.RecallSale.Selected;
							
							if(RecallSaleSelected == 1){
								
								var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
								postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
								postdata+="&type="+RecallSaleSelected;
								postdata+="&station="+$scope.StatStationName;
								postdata+="&cashin="+ $scope.StatCashIn;
								postdata+="&status=4";
								postdata+="&location="+$("#Locations").val();
								
								$http({
									method: 'post',
									url: base_url+'pos/pointofsale/recall-by-type',
									data: postdata,
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(data){
									$scope.gridSettingsCash = {
										source: {
											localdata: data
										}
									}
								})
								
							}else if(RecallSaleSelected == 2){
								var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
								postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
								postdata+="&type="+RecallSaleSelected;
								postdata+="&station="+$scope.StatStationName;
								postdata+="&cashin="+ $scope.StatCashIn
								postdata+="&status=4";
								postdata+="&location="+$("#Locations").val();
								$http({
									method: 'post',
									url: base_url+'pos/pointofsale/recall-by-type',
									data: postdata,
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(data){
									$scope.gridSettingsCreditCard = {
										source: {
											localdata: data
										}
									}
								})
							}else if(RecallSaleSelected == 4){
								var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
								postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
								postdata+="&station="+$scope.StatStationName;
								postdata+="&status="+RecallSaleSelected;
								postdata+="&location="+$("#Locations").val();
								$http({
									method: 'post',
									data: postdata,
									url: base_url + "pos/pointofsale/load-recall-completed/data",
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(data){
									$scope.gridSettings = {
										source: {
											localdata: data
										}
									}
								})

							}else if(RecallSaleSelected == 7){
								var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
								postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
								postdata+="&type="+RecallSaleSelected;
								postdata+="&station="+$scope.StatStationName;
								postdata+="&cashin="+ $scope.StatCashIn
								postdata+="&status=4";
								postdata+="&location="+$("#Locations").val();
								postdata+="&ebt=ebt";
								$http({
									method: 'post',
									url: base_url+'pos/pointofsale/recall-by-type',
									data: postdata,
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(data){
									$scope.gridSettingsEBT = {
										source: {
											localdata: data
										}
									}
								})
							}else{
								//-->On Hold
								var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
								postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
								postdata+="&station="+ $scope.StatStationName;
								postdata+="&status=5";
								postdata+="&location="+ $("#Locations").val();
								
								$http({
									method: 'post',
									data: postdata,
									url: base_url + "pos/pointofsale/load-recall-onhold/data",
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).success(function(data){
									$scope.gridSettingsOnHold = {		
										source:  {
											localdata: data
										}
									}
								}).then(function(){
									CashIn();
								})
							}
						}
					}
				};
				*/
				def.resolve();
			})
			return def.promise();
		}
		
		var SelByLocation = function(){
		
			if(recall_by_location == 1){
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&station="+ $scope.StatStationName;
				postdata+="&status=5";
				postdata+="&location="+ $("#Locations").val();
				
				var settings="setting=RecallHideAggregrateTotals"
				$http({
					method: 'post',
					data: settings,
					url: base_url + "pos/load/settings",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(){
					$http({
						method: 'post',
						data: postdata,
						url: base_url + "pos/pointofsale/recall-onhold/bylocation/data",
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(data){
						$scope.gridSettingsOnHold = {	
							showaggregates: false,	
							source:  {
								localdata: data
							}
						}
					})
				})

			}else if(recall_by_location == 2){
				//-->Completed Sale
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&status="+4;
				postdata+="&location="+$("#Locations").val();
		
				$http({
					method: 'post',
					data: postdata,
					url: base_url + "pos/pointofsale/recall-completed/bylocation/data",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettings = {
						source:  {
							localdata: data
						}
					}
				})
				
			}else if(recall_by_location == 3){
				
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&type="+ 1;
				postdata+="&cashin="+ $scope.StatCashIn
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();
				
				$http({
					method: 'post',
					url: base_url+'pos/pointofsale/recall-by-type-location',
					data: postdata,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsCash = {
						source:  {
							localdata: data
						}
					};
				})
			
			}else if(recall_by_location == 4){
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&type="+ 2;
				postdata+="&cashin="+ $scope.StatCashIn;
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();
				$http({
					method: 'post',
					url: base_url+'pos/pointofsale/recall-by-type-location',
					data: postdata,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsCreditCard = {
						source:  {
							localdata: data
						}
					};
				})
			
			}else if (recall_by_location == 5){
				
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&type="+ 3;
				postdata+="&cashin="+ $scope.StatCashIn;
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();
				$http({
					method: 'post',
					url: base_url+'pos/pointofsale/recall-by-type-location',
					data: postdata,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsGiftCard = {
						source:  {
							localdata: data
						}
					};
				})
				
			}else if (recall_by_location == 6){
			
				var postdata="datefrom=" + $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto=" + $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&cashin=" + $scope.StatCashIn;
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();
				$http({
					method: 'post',
					url: base_url+'pos/pointofsale/recall-by-cashin-location',
					data: postdata,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsCashIn = {
						source:  {
							localdata: data
						}
					};
				})
			}else if(recall_by_location == 7){
				var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&type="+ 2;
				postdata+="&cashin="+ $scope.StatCashIn;
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();
				postdata+="&ebt=ebt";

				$http({
					method: 'post',
					url: base_url+'pos/pointofsale/recall-by-type-location',
					data: postdata,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					$scope.gridSettingsEBT = {
						source:  {
							localdata: data
						}
					};
				})
			}

		}
		
		
		
		var LoadLocationData = function(){
			var def = new $.Deferred();
			$http({
				method: 'get',
				url: base_url+'pos/pointofsale/locations'
			}).success(function(data){
				var locationsource = {
					datatype: "json",
					datafields: [
						{ name: 'Unique' },
						{ name: 'LocationName' }
					],
					localdata: data
				};
				$scope.LocationcomboBoxSettings = {
					source: locationsource, autoComplete: true, displayMember: "LocationName", valueMember: "Unique", itemHeight: 25, height: 25, width: 80
				};
				/*
				$scope.selectHandlerLocation = function (event) {
					if (event.args) {
						var item = event.args.item;
						if (item) {
							SelByLocation();
						}
					}
				}
				*/
				def.resolve();
			});
			return def.promise();
		}
		
		
		/* Get Header information such like;
	    *  Receipt Number, Station Name, Location Name and Cashier Name.
		*/
		var LoadHeaderInfo = function(){
			var def = new $.Deferred(); 
			posData.GetHeaderInfo()
			.success(function(data){
				$("#receiptn").text(data.receipt_number);
				$("#station").text(data.station_name);
				//$("#cashin").text(data.cashin);
				//$("#store_name").text(data.store_name);
				$("#user_name").text(data.user_name);
				$("#tableno").text(data.tableno);
				$scope.StatStationName = data.station_number;
				$scope.StatCashIn = data.cashin;
				$scope.TempStationName = data.recall_original_station;//data.station_number;
				$scope.TempCashIn = data.cashin;
				def.resolve();
			})
			return def.promise();
		};
		/* End */
		
		/*
		@ Check if printer setting is enabled
		*/		
		var ConfigStation = function(){
			var def = new $.Deferred();
			posData.ConfigStation()
			.success(function(data){
				$scope.print_receipt = data.print_receipt;
				def.resolve();
			})
			return def.promise();
		};

	//--> Printer Check Connection
	var PrinterCheck = function(Unique){
		console.log(Unique);
		var def = $.Deferred();
		$("#dialog-numpad").jqxWindow('close');
		var msg="Printing Receipt <br/>";
			msg+="Please wait...";
		NumpadPromptAlertProcess(msg)
		.then(function(){
			WindowPopupAlertProcess('Printer status', true, [220, 300], [])
			.then(function(){
				setTimeout(function(){
					var postdata ="receipt_header_unique="+Unique;
					posData.PrinterCheckRecall(postdata)
					.success(function(data){
						$("#dialog-alert").jqxWindow("close");
						if(data.success == true){
							if(data.print == true){
								/* do nothing */
								load_data(data);
								$("#dialog-process").jqxWindow('close');
								def.resolve();
							}else{
								var msg="Printer error, please check <br/>";
								msg+="1. Printer is turned on. <br/>";
								msg+="2. Check printer paper. <br/>";
								msg+="3. Restart printer.";
								
								NumpadPromptAlertPrinterProblem(msg)
								.then(function(){
									WindowPopupAlert('Printer Problem', true, [220, 300], [])
									.then(function(){
										$("#dialog-process").jqxWindow('close');
									})
								});
								
							}
						}
					})
				},500)//TimeOut - Delay	
			})
		});
		return def.promise();
	};


	var load_data = function(data){
		/*
		|--------------------------------------------------------|
		| Receipt PDF
		|--------------------------------------------------------|
		*/
		if(data.PDFReceipt){
			console.log(data.PDFReceipt);
			var PathReceiptPDF = base_url + data.PDFReceipt;
			testpdf_receipt(PathReceiptPDF);
		}
	}

	function testpdf_receipt(pathToPdf) {
		const frame = document.createElement('iframe')
		frame.src = pathToPdf.trim()
		frame.style = "display:none;";
		const container = document.getElementsByTagName('body') // this will return a NodeList
		container[0].appendChild(frame);
		frame.contentWindow.print();
	}
	
	$(document).on('click', '.alert_close', function(){
		$("#dialog-alert").jqxWindow('close');
		$("#custom_alert").html();
	})

	$(document).on('click', '.alert_okay', function(e){
		e.preventDefault();
		var elemPopup = $(this).closest('.jqx-window').attr('id');
		var elemRemove = $(this).closest('form').attr('id');
		$("#"+elemPopup).jqxWindow('close');
		$("#"+elemRemove).remove();
		$('#display-payments').unblock();
		$('body').unblock();
	})
	
	//--> End Printer Check Connection

	var ConfigStation = function(){
		var def = new $.Deferred();
		posData.ConfigStation()
		.success(function(data){
			$scope.print_receipt = data.print_receipt;
			def.resolve();
		})
		return def.promise();
	};

	
	var PrinterCheckSetting = function(formname){
		var def = $.Deferred();
		var Status = false;
		var printers = 0;
		var printerStatus = [];
		posData.PrinterCheckAll()
		.success(function(data){
			if(data.success == true){
				if(data.print == true){
					printers = data.printer;
					var msg="Printer Status<br/>";
					var count = 1;
					var statusName = '';
					$.each(printers, function(index, value){
						if(value[0] == false){
							statusName = "Poor";
						}else if(value[0] == true){
							statusName = "Good";
						}
						printerStatus.push(value[0]);
						msg+=count+". "+value[1]+" "+statusName+"<br/>";
						count++;
					})
					var resPrintStatus = printerStatus.indexOf(false);
					if(resPrintStatus >= 0){
						msg+="<br/>";
						msg+="Do you wish to continue? <br/><br/>";
						//AlertQyesAndno("Printer Status", true, msg, formname);
						NumpadPromptAlertYesNo(msg)
						.then(function(){
							WindowPopupAlertYesNo('Question', true, [260, 320], [])
							.then(function(){
								$("#dialog-process").jqxWindow('close');
							})
						})
					}else{
						Status = true;
					}
				}else{
					Status = false;
				}
			}else{
				Status = false;
			}
			def.resolve(Status);
		})
		return def.promise();
	}
	
	var KitchenPrintReceipt = function(formname){
		var def = $.Deferred();
		var KitchenPrintStatus = $scope.KitchenPrinter;
		if(KitchenPrintStatus){
			//ProcessDialog('Print Order', true, "Checking printer connection...");
			var msg="Checking printer connection...";
			NumpadPromptAlertProcess(msg)
			.then(function(){
				WindowPopupAlertProcess('Print Receipt', true, [200, 300], []);
				
				PrinterCheckSetting(formname)
				.done(function(Status){
					if(Status == true){
						posData.GetCurrentReceiptHeader()
						.success(function(jsondata){
							var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
							posData.KitchenPrintReceipt(postdata)
							.success(function(data){
								
							})
						})
						def.resolve();
					}
				})
				
			})
		}else{
			def.resolve();
		} 
		return def.promise();
	}
	
	$(document).on("submit", "#kitchen_print_problem_alert_form", function(e){
		e.preventDefault();
		$("#dialog-alert-yes-no").jqxWindow('close');
		var msg="Printing receipt <br/>";
			msg+="Please wait...";
			NumpadPromptAlertProcess(msg)
			.then(function(){
				WindowPopupAlertProcess('Print Receipt', true, [200, 300], []);

				posData.GetCurrentReceiptHeader()
				.success(function(jsondata){
					var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
					posData.KitchenPrintReceipt(postdata)
					.success(function(data){
						OpenOnHoldReceipt($scope.rowReceiptHeader.Unique)
						.then(function(){
							$("#dialog-process").jqxWindow('close');
						})
					})
				})
			})	
	})
	
	$(document).on("click", ".alert_no", function(e){
		$("#dialog-alert-yes-no").jqxWindow('close');
	})
	
	
	$(document).on("submit", "#RowOnHold", function(e){
		var def = $.Deferred();
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OpenOnHoldReceipt($scope.rowReceiptHeader.Unique);
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit", "#RecallView", function(e){
		var def = $.Deferred();
		ProcessDialog('Print Order', true, "Printing receipt<br/><br/>Please wait...");
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				OpenViewReceipt($scope.RecallCompletedReceiptUnique);
				ProcessDialog('',false,'');
				AlertQyesAndno("Printer Status", false, '', '');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$(document).on("submit", "#EditReceipt", function(e){
		var def = $.Deferred();
		ProcessDialog('Print Order', true, "Printing receipt<br/><br/>Please wait...");
		posData.GetCurrentReceiptHeader()
		.success(function(jsondata){
			var postdata="ReceiptHeaderUnique="+jsondata.ReceiptHeaderUnique;
			posData.KitchenPrintReceipt(postdata)
			.success(function(data){
				EditViewReceipt($scope.RecallCompletedReceiptUnique);
				ProcessDialog('',false,'');
				AlertQyesAndno("Printer Status", false, '', '');
				def.resolve();
			})
		})
		return def.promise();
	});
	
	$scope.CancelQYN = function(){
		AlertQyesAndno("Printer Status", false, '', "");
	}


	var OpenOnHoldReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
			var postdata="receiptunique="+unique;
			posData.OpenReceipt(postdata)
			.success(function(data){
				if(data.success == true){
					PoleDisplayTotal();
				}else{
					NumpadPromptAlertViewEditCancel()
					.then(function(){
						WindowPopupAlertEditViewCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
					})
				}
				def.resolve();
			})
		},1000);
		return def.promise();
	}
	
	
	$(document).on('click', '.button_view', function(){
		setTimeout(function(){
			var postdata="ReceiptHeaderUnique="+$scope.rowReceiptHeader.Unique;//$scope.RowUnique;
			posData.ViewReceipt(postdata)
			.success(function(data){
				if(data.success == true){
					$("#dialog-alert-view-edit-cancel").jqxWindow('close');
					$window.location = base_url + data.landtopage;
				}
			}).then(function(){
				 PoleDisplayReset();
			})
		},1000);
	})
	
	var OpenViewReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
			var postdata="ReceiptHeaderUnique="+$scope.RowUnique;
			posData.ViewReceipt(postdata)
			.success(function(data){
				if(data.success == true){
					$("#dialog-alert-view-edit-cancel").jqxWindow('close');
				}
			}).then(function(){
				 PoleDisplayReset();
				 def.resolve();
			})
		},1000);
		return def.promise();
	}
	
	$(document).on('click', '.button_edit', function(){
		setTimeout(function(){	
		var postData = "ReceiptHeaderUnique="+$scope.rowReceiptHeader.Unique;//$scope.RowUnique;
			posData.EditReceipt(postData)
			.success(function(data){
				if(data.success == true){
					$("#dialog-alert-view-edit-cancel").jqxWindow('close');
					$window.location = base_url + data.landtopage;
				}
			}).then(function(){
				 PoleDisplayReset();
			})
		},1000);
	})
	
	var EditViewReceipt = function(unique){
		var def = new $.Deferred();
		setTimeout(function(){
		var postData = "ReceiptHeaderUnique="+$scope.RowUnique;
			posData.EditReceipt(postData)
			.success(function(data){
				if(data.success == true){
					$("#dialog-alert-view-edit-cancel").jqxWindow('close');
				}
			}).then(function(){
				 PoleDisplayReset();
				 def.resolve();
			})
		},1000);
		return def.promise();
	}
	
	LoadHeaderInfo()
	.then(function(){
		//LoadStationData()
		//.then(function(){
			LoadLocationData()
			.then(function(){
				LoadStationCashIn()
				.then(function(){
					$("#Locations").val($scope.LocationID);
					ConfigStation()
					.then(function(){
						load_recall()
						.done(function(){
							CashIn();
						})
					})
				})
			})	
		//})
	})

	var rendererDate = function (row, column, value) {
		return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + $filter('date')(new Date(value), 'MM/dd/yy hh:mm a') + '</span>';
	}
														
	/* Cash In */
	$scope.gridSettingsCashIn = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'TotalSale', type: 'string'},
				{ name: 'Paid', type: 'string'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: []
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '20%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Location', dataField: 'LocationName', width: '8%', filtertype: 'input' },
			{ text: 'Station No.', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
			{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
			{ text: 'Total', dataField: 'TotalSale', width: '12%', cellsalign: 'right', filtertype: 'number', cellsFormat: 'f2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Paid', dataField: 'Paid', width: '12%', cellsalign: 'right', filtertype: 'number', cellsFormat: 'f2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Status', dataField: 'Status', width: '10%', filtertype: 'input'},
			{ text: 'Cashier', dataField: 'Cashier', width: '9%', filtertype: 'input'}
		]
	};

	/* Recall On Hold Tab */
	$scope.gridSettingsOnHold = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source: {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Balance', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: []
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Cashier', dataField: 'Cashier', width: '6%', filtertype: 'input'},
			{ text: 'Customer', dataField: 'CustomerName',width: '12%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
			{ text: 'SubTotal', dataField: 'SubTotal', width: '10%', filtertype: 'number', align: 'right', cellsalign: 'right', cellsformat: 'd2',				
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
				
			},
			{ text: 'Tax', dataField: 'Tax', width: '8%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
				
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
				
			},
			{ text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
				
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Paid', dataField: 'Paid', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
				
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
				
			},
			{ text: 'Balance', dataField: 'Balance', width: '10%', align: 'right', filtertype: 'number', cellsalign: 'right', cellsFormat: 'd2',
				
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
				
			}
		]
	};

	/* Recall Completed Tab */
	$scope.gridSettings = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
        source:  {
            dataType: "json",
            dataFields: [
                { name: 'Unique', type: 'int' },
                { name: 'DateTime', type: 'string' },
                { name: 'LocationName', type: 'string' },
                { name: 'StationName', type: 'string' },
                { name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Balance', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
            ],
           localdata: []
        },
        columnsResize: true,
        columns: [
		  { text: 'Unique', dataField: 'Unique', hidden: true},
          { text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
          //{ text: 'Location', dataField: 'LocationName', width: '8%' },
          { text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
		  { text: 'Cashier', dataField: 'Cashier', width: '8%', filtertype: 'input' },
		  { text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
          { text: 'Receipt', dataField: 'ReceiptNumber', width: '7%', filtertype: 'input' },
		  { text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Tax', dataField: 'Tax', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
		  { text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
			  aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
		  },
		  { text: 'Paid', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
			  	aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
		  },
		  { text: 'Change', dataField: 'Balance', width: '8%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
			 	aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
		  }
		  //{ text: 'Status', dataField: 'Status', width: '10%'},
      ]
    };
	

	/* Recall Cash Payments */
	$scope.gridSettingsCash = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: []
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'input' },
			{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
			{ text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Cash', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			}
			//{ text: 'Status', dataField: 'Status', width: '10%'},
		]
	};

	/* Recall Credit Card Payments */
	$scope.gridSettingsCreditCard = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: []
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'input'},
			{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
			{ text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Credit Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			}
			//{ text: 'Status', dataField: 'Status', width: '10%'}
		]
	};


	/* Recall EBT Card Payments */
	$scope.gridSettingsEBT = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: {}
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'input'},
			{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
			{ text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'EBT', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			}
			//{ text: 'Status', dataField: 'Status', width: '10%'}
		]
	};



	/* Recall Gift Card Payments */
	$scope.gridSettingsGiftCard = {
		width: '100%',
		autoheight: true,
		altRows: true,
		theme: 'darkblue',
		pageable: true,
		pageSize: sizemode,
		pagerMode: 'advanced',
		sortable: true,
		filterMode: 'excel',
		showfilterrow: true,
		filterable: true,
		showaggregates: true,
		showstatusbar: true,
		statusbarheight: 30,
		source:  {
			dataType: "json",
			dataFields: [
				{ name: 'Unique', type: 'int' },
				{ name: 'DateTime', type: 'string' },
				{ name: 'LocationName', type: 'string' },
				{ name: 'StationName', type: 'string' },
				{ name: 'ReceiptNumber', type: 'string' },
				{ name: 'CustomerName', type: 'string'},
				{ name: 'SubTotal', type: 'number'},
				{ name: 'Tax', type: 'number'},
				{ name: 'TotalSale', type: 'number'},
				{ name: 'Paid', type: 'number'},
				{ name: 'Status', type: 'string'},
				{ name: 'Cashier', type: 'string'}
			],
			localdata: {}
		},
		columnsResize: true,
		columns: [
			{ text: 'Unique', dataField: 'Unique', hidden: true},
			{ text: 'Date', dataField: 'DateTime', width: '17%', filtertype: 'input', cellsRenderer: rendererDate },
			{ text: 'Station', dataField: 'StationName', width: '10%', filtertype: 'input' },
			{ text: 'Cashier', dataField: 'Cashier', width: '10%', filtertype: 'input'},
			{ text: 'Customer', dataField: 'CustomerName', width: '12%', filtertype: 'input' },
			{ text: 'Receipt', dataField: 'ReceiptNumber', width: '11%', filtertype: 'input' },
			{ text: 'SubTotal', dataField: 'SubTotal', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Tax', dataField: 'Tax', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
						'Total': function (aggregatedValue, currentValue, column, record) {
							var total = currentValue;
							var returnTotal = 0;
							returnTotal = aggregatedValue + total;
							return returnTotal;
						}
					}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Total', dataField: 'TotalSale', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'number', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			},
			{ text: 'Gift Card', dataField: 'Paid', width: '10%', align: 'right',cellsalign: 'right', filtertype: 'input', cellsFormat: 'd2',
				aggregates: [{
					'Total': function (aggregatedValue, currentValue, column, record) {
						var total = currentValue;
						var returnTotal = 0;
						returnTotal = aggregatedValue + total;
						return returnTotal;
					}
				}],
				aggregatesRenderer: function (aggregates, column, element) {
					var renderString = "<div style='margin: 4px; float: right;  height: 100%; font-weight: bold;'>";
					var Total=parseFloat(0).toFixed(2);
					if(aggregates.Total){
						Total = aggregates.Total;
					}
					renderString +=  Total + "</div>";
					return renderString;
				}
			}
		]
	};
	
	//HD here6
	var CashIn = function(){
		$scope.selectHandlerCashIn = function(event) {
			$("body").block({message: 'Processing please wait...'});
			recall_by_location = 6;
			var args = event.args;
			if (args) {
				var item = args.item;
				$scope.StatCashIn = item.value;
				$scope.gridSettingsCashWhen = false;
				$scope.gridSettingsCreditCardWhen = false;
				$scope.gridSettingsOnHoldWhen = false;
				$scope.gridSettingsWhen = false;
				$scope.gridSettingsCashInWhen = true;
				$scope.gridSettingsGiftCardWhen = false;
				$scope.gridSettingsEBTWhen = false;

				$scope.isOnHoldBold = false;
				$scope.isCompletedBold = false;
				$scope.isCashBold = false;
				$scope.isCreditCardBold = false;

				var postdata="datefrom=" + $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
				postdata+="&dateto=" + $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
				postdata+="&station=" + $scope.StatStationName;
				postdata+="&cashin=" + $scope.StatCashIn;
				postdata+="&status=4";
				postdata+="&location="+$("#Locations").val();

				var settings="Setting=RecallHideAggregrateTotals"
				$http({
					method: 'POST',
					data: settings,
					url: base_url + "pos/load/settings",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data){
					var ShowAggregatesTotal = false;
					if(data.result > 0){
						ShowAggregatesTotal = false;
					}else{
						ShowAggregatesTotal = true;
					}

					$http({
						method: 'post',
						url: base_url+'pos/pointofsale/recall-by-cashin-location',
						data: postdata,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(data){
						$scope.gridSettingsCashIn = {
							showaggregates: ShowAggregatesTotal,
							showstatusbar: ShowAggregatesTotal,
							source:  {
								localdata: data
							}
						};
						$("body").unblock();
					})
				})
			}
		};
	}

	//HD here3
	$scope.RecallCashType = function(type){
		$("body").block({message: 'Processing please wait...'});
		recall_by_location = 3;
		$scope.gridSettingsCashWhen = true;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = false;

		$scope.RecallSale = {
			Selected: 1
		}

		$scope.isOnHoldBold = false;
		$scope.isCompletedBold = false;
		$scope.isCashBold = true;
		$scope.isCreditCardBold = false;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&type="+ type;
			postdata+="&station="+$scope.StatStationName;
			postdata+="&cashin="+ $scope.StatCashIn
			postdata+="&status=4";
			postdata+="&location="+$("#Locations").val();


		var settings="Setting=RecallHideAggregrateTotals"
		$http({
			method: 'POST',
			data: settings,
			url: base_url + "pos/load/settings",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var ShowAggregatesTotal = false;
			if(data.result > 0){
				ShowAggregatesTotal = false;
			}else{
				ShowAggregatesTotal = true;
			}

			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsCash = {
					showaggregates: ShowAggregatesTotal,
					showstatusbar: ShowAggregatesTotal,
					source:  {
						localdata: data
					}
				};
				$("body").unblock();
			})

		})		
		//CashIn();
	}

	//HD here4
	$scope.RecallCCType = function(type){
		$("body").block({message: 'Processing please wait...'});
		recall_by_location = 4;
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = true;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = false;
		

		$scope.RecallSale = {
			Selected: 2	
		}

		$scope.isOnHoldBold = false;
		$scope.isCompletedBold = false;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = true;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
		postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
		postdata+="&type="+ type;
		postdata+="&station="+$scope.StatStationName;
		postdata+="&cashin="+ $scope.StatCashIn;
		postdata+="&status=4";
		postdata+="&location="+$("#Locations").val();


		var settings="Setting=RecallHideAggregrateTotals"
		$http({
			method: 'POST',
			data: settings,
			url: base_url + "pos/load/settings",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var ShowAggregatesTotal = false;
			if(data.result > 0){
				ShowAggregatesTotal = false;
			}else{
				ShowAggregatesTotal = true;
			}
		
			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsCreditCard = {
					showaggregates: ShowAggregatesTotal,
					showstatusbar: ShowAggregatesTotal,
					source:  {
						localdata: data
					}
				};
				$("body").unblock();
			})
		})
		//CashIn();
	}

	$scope.RecallEBT = function(type){
		$("body").block({message: 'Processing please wait...'});
		recall_by_location = 7;
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = true;

		$scope.RecallSale = {
			Selected: 7
		}

		$scope.isOnHoldBold = false;
		$scope.isCompletedBold = false;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = false;
		$scope.isGiftCardBold = true;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
		postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
		postdata+="&type="+ type;
		postdata+="&station="+$scope.StatStationName;
		postdata+="&cashin="+ $scope.StatCashIn;
		postdata+="&status=4";
		postdata+="&location="+$("#Locations").val();
		postdata+="&ebt=ebt";
		$http({
			method: 'post',
			url: base_url+'pos/pointofsale/recall-by-type',
			data: postdata,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			$scope.gridSettingsEBT = {
				source:  {
					localdata: data
				}
			};
			$("body").unblock();
		})
		//CashIn();
	}

	alert("test");
	
	//HD here5
	$scope.RecallGCType = function(type){
		$("body").block({message: 'Processing please wait...'});
		recall_by_location = 5;
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = true;
		$scope.gridSettingsEBTWhen = false;

		$scope.RecallSale = {
			Selected: 6
		}

		$scope.isOnHoldBold = false;
		$scope.isCompletedBold = false;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = false;
		$scope.isGiftCardBold = true;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
		postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
		postdata+="&type="+ type;
		postdata+="&station="+$scope.StatStationName;
		postdata+="&cashin="+ $scope.StatCashIn;
		postdata+="&status=4";
		postdata+="&location="+$("#Locations").val();

		var settings="Setting=RecallHideAggregrateTotals"
		$http({
			method: 'POST',
			data: settings,
			url: base_url + "pos/load/settings",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var ShowAggregatesTotal = false;
			if(data.result > 0){
				ShowAggregatesTotal = false;
			}else{
				ShowAggregatesTotal = true;
			}

			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsGiftCard = {
					showaggregates: ShowAggregatesTotal,
					showstatusbar: ShowAggregatesTotal,
					source:  {
						localdata: data
					}
				};
				$("body").unblock();
			})
		})	
		//CashIn();
	}

	$scope.RecallOpen = function(){
		try {
			$scope.rowReceiptHeader.Unique
			var ReceiptHeaderUnique = true;
			$scope.RowUnique = $scope.rowReceiptHeader.Unique;
		}catch(err) {
			var ReceiptHeaderUnique = false;
		}
		
		if(ReceiptHeaderUnique){
			var postData="receiptunique="+$scope.rowReceiptHeader.Unique;
			posData.OpenReceipt(postData)
			.success(function(data){
				if(data.success == true){
					OpenOnHoldReceipt($scope.rowReceiptHeader.Unique)
					.then(function(){
						posData.BacktoRequestPage()
						.success(function(data){
							$window.location = base_url + data.redirect_to;
						})
					})
				}else{
					NumpadPromptAlertViewEditCancel()
					.then(function(){
						WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
					})
				}
			})
		}else{
			var msg="Please select receipt first";
			NumpadPromptAlertForgotSelect(msg)
			.then(function(){
				WindowPopupAlert('Alert', true, [200, 300], [])
				.then(function(){
					setTimeout(function(){
						$("#dialog-numpad").jqxWindow('focus');
					},100);
				})
			});
		}
	};

	$scope.RecallExit = function(){
		posData.BacktoRequestPage()
		.success(function(data){
			$window.location = base_url + data.redirect_to;
		})
	};

	$scope.Refresh = function(){
		$("body").block({message: 'Processing please wait...'});
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = true;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = false;

		$scope.RecallSale = {
			Selected: 5
		}

		$scope.isOnHoldBold = true;
		$scope.isCompletedBold = false;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = false;
		$http({
			method: 'post',
			data: postdata,
			url:  base_url + "pos/pointofsale/load-recall-sale",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			$scope.gridSettingsOnHold = {
				source:  {
					localdata: data
				}
			}
			$("body").unblock();
		})
	};
	

	$scope.SelOnHold = function(status){
		$("body").block({message: 'Processing please wait...'});
		recall_by_location = 1;
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = true;
		$scope.gridSettingsWhen = false;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = false;

		$scope.RecallSale = {
			Selected: 5
		}

		$scope.isOnHoldBold = true;
		$scope.isCompletedBold = false;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = false;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
		postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
		postdata+="&station="+ $scope.StatStationName;
		postdata+="&status="+ status;
		postdata+="&location="+ $("#Locations").val();

		var settings="Setting=RecallHideAggregrateTotals"
		$http({
			method: 'POST',
			data: settings,
			url: base_url + "pos/load/settings",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var ShowAggregatesTotal = false;
			if(data.result > 0){
				ShowAggregatesTotal = false;
			}else{
				ShowAggregatesTotal = true;
			}

			$http({
				method: 'post',
				data: postdata,
				//url: base_url + "pos/pointofsale/load-recall-onhold/data", 9/23/2016
				url: base_url + "pos/pointofsale/load-recall-sale",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsOnHold = {
					showaggregates: ShowAggregatesTotal,
					showstatusbar: ShowAggregatesTotal,
					source:  {
						localdata: data
					}
				}
				$("body").unblock();
			})
		});
	};

	//HD here2
	$scope.SelCompleted = function(status){
		$("body").block({message: 'Processing data please wait...'});
		recall_by_location = 2;
		$scope.gridSettingsCashWhen = false;
		$scope.gridSettingsCreditCardWhen = false;
		$scope.gridSettingsOnHoldWhen = false;
		$scope.gridSettingsWhen = true;
		$scope.gridSettingsCashInWhen = false;
		$scope.CashInWhen = true;
		$scope.gridSettingsGiftCardWhen = false;
		$scope.gridSettingsEBTWhen = false;

		$scope.RecallSale = {
			Selected: 4
		}

		$scope.isOnHoldBold = false;
		$scope.isCompletedBold = true;
		$scope.isCashBold = false;
		$scope.isCreditCardBold = false;

		var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&station="+$scope.StatStationName;
			postdata+="&status="+status;
			postdata+="&location="+$("#Locations").val();

		var settings="Setting=RecallHideAggregrateTotals"
		$http({
			method: 'POST',
			data: settings,
			url: base_url + "pos/load/settings",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			var ShowAggregatesTotal = false;
			if(data.result > 0){
				ShowAggregatesTotal = false;
			}else{
				ShowAggregatesTotal = true;
			}
			
			$http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-completed/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettings = {
					showaggregates: ShowAggregatesTotal,
					showstatusbar: ShowAggregatesTotal,
					source:  {
						localdata: data
					}
				}
				$("body").unblock();
			})
		})
		//CashIn();
	};

	//Completed Sale
	$("#Completed").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})
	
	$("#Completed").on('rowdoubleclick', function(event){
		var index = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', index);
		editRow = index;
		$scope.RowUnique = row.Unique;
		var postData="receiptunique="+row.Unique;
		posData.OpenReceipt(postData)
		.success(function(data){
			if(data.success == true){
				 posData.OrderedItemList()
				 .success(function(data){
					 var RestrictPayment = data.SellPrice;
					 $scope.ordereditemlist = data;
					 if(RestrictPayment){
						 $scope.BtnPaymentWhen = false;
					 }else{
						 $scope.BtnPaymentWhen = true;
					 }
				 });
			}else{
				NumpadPromptAlertViewEditCancel()
				.then(function(){
					WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
				})
			}
		})
	})
	
	$("#OnHold").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})
	
	$("#OnHold").on('rowdoubleclick', function(event){
		var index = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', index);
		editRow = index;
		OpenOnHoldReceipt(row.Unique)
		.then(function(){
			posData.BacktoRequestPage()
			.success(function(data){
				$window.location = base_url + data.redirect_to;
			})
		})
	});
	
	$("#Cash").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})
	
	$("#Cash").on('rowdoubleclick', function(event){
		var index = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', index);
		editRow = index;
		var postData="receiptunique="+row.Unique;
		posData.OpenReceipt(postData)
		.success(function(data){
			if(data.success == true){
				posData.OrderedItemList()
					.success(function(data){
						var RestrictPayment = data.SellPrice;
						$scope.ordereditemlist = data;
						if(RestrictPayment){
							$scope.BtnPaymentWhen = false;
						}else{
							$scope.BtnPaymentWhen = true;
						}
					});
			}else{
				NumpadPromptAlertViewEditCancel()
				.then(function(){
					WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
				})
			}
		})
	});
	
	
	$("#CreditCard").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})
	
	$("#CreditCard").on('rowdoubleclick', function(event){
		var index = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', index);
		editRow = index;
		var postData="receiptunique="+row.Unique;
		posData.OpenReceipt(postData)
		.success(function(data){
			if(data.success == true){
				posData.OrderedItemList()
					.success(function(data){
						var RestrictPayment = data.SellPrice;
						$scope.ordereditemlist = data;
						if(RestrictPayment){
							$scope.BtnPaymentWhen = false;
						}else{
							$scope.BtnPaymentWhen = true;
						}
					});
			}else{
				NumpadPromptAlertViewEditCancel()
				.then(function(){
					WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
				})
			}
		})
	});
	
	$("#GiftCard").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})
	
	$("#CreditCard").on('rowdoubleclick', function(event){
		var index = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', index);
		editRow = index;
		var postData="receiptunique="+row.Unique;
		posData.OpenReceipt(postData)
		.success(function(data){
			if(data.success == true){
				posData.OrderedItemList()
					.success(function(data){
						var RestrictPayment = data.SellPrice;
						$scope.ordereditemlist = data;
						if(RestrictPayment){
							$scope.BtnPaymentWhen = false;
						}else{
							$scope.BtnPaymentWhen = true;
						}
					});
			}else{
				NumpadPromptAlertViewEditCancel()
				.then(function(){
					WindowPopupAlertViewEditCancel('Receipt No. '+data.receiptno, true, [110, 230], []);
				})
			}
		})
	});
	
	$("#CashIn").on('rowclick', function(event){
		var rowindex = event.args.rowindex;
		var datafield = event.args.datafield;
		var row = $(this).jqxGrid('getrowdata', rowindex);
		$scope.rowReceiptHeader = {
			Unique: row.Unique
		}
	})


	$scope.RecallSearch = function(){
		var RecallSaleSelected = $scope.RecallSale.Selected;
		$("body").block({message: 'Processing please wait...'});
		//--> Cash
		if(RecallSaleSelected == 1){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&type="+RecallSaleSelected;
			postdata+="&station="+$scope.StatStationName;
			postdata+="&cashin="+ $scope.StatCashIn;
			postdata+="&status=4";
			postdata+="&location="+$("#Locations").val();
			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsCash = {
					source: {
						localdata: data
					}
				}
				$("body").unblock();
				CashIn();
			})
			
		//--> Credit Card
		}else if(RecallSaleSelected == 2){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&type="+RecallSaleSelected;
			postdata+="&station="+$scope.StatStationName;
			postdata+="&cashin="+ $scope.StatCashIn
			postdata+="&status=4";
			postdata+="&location="+$("#Locations").val();
			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsCreditCard = {
					source: {
						localdata: data
					}
				}
				$("body").unblock();
				CashIn();
			})
		//--> EBT
		}else if(RecallSaleSelected == 4){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&station="+$scope.StatStationName;
			postdata+="&status="+RecallSaleSelected;
			postdata+="&location="+$("#Locations").val();
			$http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-completed/data",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettings = {
					source: {
						localdata: data
					}
				}
				$("body").unblock();
				CashIn();
			})
		//--> OnHold
		}else if(RecallSaleSelected == 5){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&station="+ $scope.StatStationName;
			postdata+="&status=5";
			postdata+="&location="+ $("#Locations").val();
			
			$http({
				method: 'post',
				data: postdata,
				url: base_url + "pos/pointofsale/load-recall-sale",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsOnHold = {		
					source:  {
						localdata: data
					}
				}
				$("body").unblock();
				CashIn();
			})
		//--> Gift Card
		}else if(RecallSaleSelected == 6){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&type=3";
			postdata+="&station="+ $scope.StatStationName;
			postdata+="&cashin="+ $scope.StatCashIn;
			postdata+="&status=4";
			postdata+="&location="+ $("#Locations").val();
			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsGiftCard = {
					source:  {
						localdata: data
					}
				};
				$("body").unblock();
				CashIn();
			})
		//--> EBT
		}else if(RecallSaleSelected == 7){
			var postdata="datefrom="+ $filter('date')(new Date($scope.date.from), 'yyyy-MM-dd');
			postdata+="&dateto="+ $filter('date')(new Date($scope.date.to), 'yyyy-MM-dd');
			postdata+="&type=2";
			postdata+="&station="+$scope.StatStationName;
			postdata+="&cashin="+ $scope.StatCashIn;
			postdata+="&status=4";
			postdata+="&location="+$("#Locations").val();
			postdata+="&ebt=ebt";
			$http({
				method: 'post',
				url: base_url+'pos/pointofsale/recall-by-type',
				data: postdata,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.gridSettingsEBT = {
					source:  {
						localdata: data
					}
				};
				$("body").unblock();
				CashIn();
			})
		}
	}

	$scope.ViewReceipt = function(){
		var RHUnique = $scope.rowReceiptHeader.Unique;
		OpenViewReceipt(RHUnique)
		.then(function(){
			$window.location = base_url + "pos/pointofsale";
		})
	};
	
	$scope.EditReceipt = function(){
		var RHUnique = $scope.RecallCompletedReceiptUnique;
		EditViewReceipt(RHUnique)
		.then(function(){
			$window.location = base_url + "pos/pointofsale";
		})
	};

	$scope.CloseRecallQue = function(){
		Quedialog.close();
	};
	
	$scope.RecallPrint = function(){
		try {
			$scope.rowReceiptHeader.Unique
			var ReceiptHeaderUnique = true;
		}catch(err) {
			var ReceiptHeaderUnique = false;
		}
		
		if(ReceiptHeaderUnique){
			var ReceiptHeaderUnique = $scope.rowReceiptHeader.Unique;
			$scope.fn = {
				val: 6
			};
			PrinterCheck(ReceiptHeaderUnique);
			/*
			var postdata="userid=0";
				postdata+="&position_unique="+6;
			posData.UsersSettings(postdata)
			.success(function (data) {
				var LEFT_POSITION_LEVEL = data.left_position_level;
				var RIGHT_POSITION_LEVEL = data.right_position_level;
	
				if (LEFT_POSITION_LEVEL >= RIGHT_POSITION_LEVEL) {
					PrinterCheck(ReceiptHeaderUnique);
					console.log("No Security Code");
				} else if (LEFT_POSITION_LEVEL <= RIGHT_POSITION_LEVEL) {
					NumpadPromptRecallPrint()
					.then(function(){
						WindowPopupNumpad('Enter Passcode', true, [345, 300], [])
						.then(function(){
							setTimeout(function(){
								$("#number_field").focus();
							},100);
						})						
					});
				}
			})
			*/
		}else{
			var msg="Please select the Receipt that you want to print.";
			NumpadPromptAlertForgotSelect(msg)
			.then(function(){
				WindowPopupAlert('Alert', true, [200, 300], [])
				.then(function(){
					setTimeout(function(){
						$("#dialog-numpad").jqxWindow('focus');
					},100);
				})
			});
		}
		
	};
	
	$(document).on('click', '#recallprint_alert_form', function(){
		$("#dialog-alert").jqxWindow('close');	
	})
	
	$(document).on('click','.exit', function(){
		$("#dialog-numpad").jqxWindow('close');
	})
	
	$(document).on("submit", "#recallprint_form", function(e){
		 e.preventDefault();
		  //var useby = $scope.useby.val;
		  var passcode = $("#number_field").val();
		  var hashpasscode = CryptoJS.MD5(passcode);
		  var postdata="passcode="+hashpasscode;
		  posData.EnterPassCode(postdata)
		  .success(function(data){
			if(data.success == true){
			  $scope.drawer = {
				passcode: ''
			  };
				var ReceiptHeaderUnique = $scope.rowReceiptHeader.Unique;
				postdata+="&position_unique="+$scope.fn.val;
				posData.UsersSettings(postdata)
				.success(function (data) {
					var LEFT_POSITION_LEVEL = data.left_position_level;
					var RIGHT_POSITION_LEVEL = data.right_position_level;
					if (LEFT_POSITION_LEVEL >= RIGHT_POSITION_LEVEL) {
						PrinterCheck(ReceiptHeaderUnique);
						$("#dialog-numpad").jqxWindow('close');	
					} else if (LEFT_POSITION_LEVEL <= RIGHT_POSITION_LEVEL) {
						$("#dialog-numpad").jqxWindow('close');
						var msg="Invalid Password";
						NumpadPromptAlertForgotSelect(msg)
						.then(function(){
							WindowPopupAlert('Alert', true, [200, 300], [])
							.then(function(){
								setTimeout(function(){
									$("#dialog-alert").jqxWindow('focus');
								},100);
							})
						});
					}
				})
			}else{
				$("#dialog-numpad").jqxWindow('close');
			  	var msg="Sorry you enter the wrong code.";
				NumpadPromptAlertForgotSelect(msg)
				.then(function(){
					WindowPopupAlert('Alert', true, [200, 300], [])
					.then(function(){
						setTimeout(function(){
							$("#dialog-alert").jqxWindow('focus');
						},100);
					})
				});
			}
		  })
	})
	
	
	var PutOnHoldReceipt = function(){
		var postData="ReceiptHeaderUnique="+$scope.QueReceiptHeaderUnique;
		posData.PutOnHold(postData)
		.success(function(data){
			if(data.success == true){
				$window.location = base_url + "pos/pointofsale/cashier";
			}
		})
	}
	
	$scope.PutOnHold = function(){
		$scope.newsaleqshowModal = false;
		PutOnHoldReceipt();
	};
	
}])

.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
 })
 
})();
