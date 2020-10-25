(function() {
	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', '$compile',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile) {

			var GlobalReceiptDetailsUnique = 0;
			var ReceiptHeaderUnique = 0;
			
			$.fn.hasScrollBar = function() {
					return this.get(0).scrollHeight > this.height();
			}
			//-->On Load Ordered Item List
			var LoadOrderedItemList = function(){
					var def = new $.Deferred();
					posData.OrderedItemListSplit()
					.success(function(data){
							$scope.ordereditemlist = data;
							def.resolve();
					});
					return def.promise();
			};

			var scrollTotalDown = function(){
					setTimeout(function() {
					var n = 1000;
							$('#payments').animate({ scrollTop: n }, 50);
					}, 1000); 
			}

			var scrollOrderListDown = function(){
					setTimeout(function() {
							var n = 1000;
							$('.itemlist').animate({ scrollTop: n }, 50);
					}, 100); 
			}

			scrollTotalDown();
			scrollOrderListDown();

			// End Load Ordered Item List
			$("#dialog-numpad-alert").on('close', function(event){
					$("#alert-msg-popup").html('');
			})

			var populateNumpadAlertClose = function(form_name, msg){
					var def = $.Deferred();
					setTimeout(function(){
							$("#dialog-numpad-alert").append('<div id="alert-msg-popup" style="background: #144766; color:#EEE;"></div>');
							$("#alert-msg-popup").html('');
							$("#alert-msg-popup").append(''+
							'<form id="'+form_name+'">'+
									'<input type="text" id="number_field" class="hdfield" value="1" style="display:none;" />'+
									'<h4>'+msg+'</h4>'+
									'<br/>'+
									'<div id="keyboard_alertclose"></div>'+
									'<input type="hidden" id="use_value" />'+
									'<input type="hidden" id="use_value2"/>'+
							'</form>');
							def.resolve();
					},500);
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

			var WindowPopupAlert = function(header_text){
					var def = $.Deferred();
					setTimeout(function(){
							$("#dialog-numpad-alert").jqxWindow({
									height: 245,
									minWidth: 350,
									isModal: true,
									theme: 'darkblue',
									showCloseButton: true,
									resizable: false,
									draggable: false,
									zIndex: 100,
							});
							$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
							$('#dialog-numpad-alert').jqxWindow('open');
							$(".alert_okay").focus();
							def.resolve();	
					},100);
					return def.promise();
			}

			LoadOrderedItemList();
	
			var SelectedItemQty;
			var PrevReceiptDestailsUnique = 0;
			$scope.setSelected = function(ReceiptDestailsUnique, ItemUnique, Unique) {
					if( $(".selected"+ReceiptDestailsUnique).hasClass('selected') ){
							$(".selected"+ReceiptDestailsUnique).removeClass('selected');

							GlobalReceiptDetailsUnique = '';
							PrevReceiptDestailsUnique = '';
							SelectedItemQty = '';

							for(var key in UpdateReceiptDetailsUniqueArr){
									if(UpdateReceiptDetailsUniqueArr[key].parentunique == ReceiptDestailsUnique){
											delete UpdateReceiptDetailsUniqueArr[key];
									}

							}

							for(var key in UpdateReceiptDetailsUniqueArr2){
									if(UpdateReceiptDetailsUniqueArr2[key].parentunique == ReceiptDestailsUnique){
											delete UpdateReceiptDetailsUniqueArr2[key];
									}
							}
							
							console.log(UpdateReceiptDetailsUniqueArr, UpdateReceiptDetailsUniqueArr2);
					}else{

							if(ReceiptHeaderUnique == 0){
									ReceiptHeaderUnique = Unique;
									$("#"+ReceiptDestailsUnique).addClass('selected');
									$(".selected"+ReceiptDestailsUnique).addClass('selected');
							}else{
									if(ReceiptHeaderUnique != Unique){
											$("#"+ReceiptHeaderUnique+' div').parent().find('div').removeClass('selected');
											$("#"+ReceiptDestailsUnique).addClass('selected');
											$(".selected"+ReceiptDestailsUnique).addClass('selected');
											UpdateReceiptDetailsUniqueArr = [];
											UpdateReceiptDetailsUniqueArr2 = [];
									}else{
											$("#"+ReceiptDestailsUnique).addClass('selected');
											$(".selected"+ReceiptDestailsUnique).addClass('selected');
									}
							}

							GlobalReceiptDetailsUnique = ReceiptDestailsUnique;
							ReceiptHeaderUnique = Unique;
							PrevReceiptDestailsUnique = ReceiptDestailsUnique;
							SelectedItemQty = $("#"+ReceiptDestailsUnique).children().find('strong').eq(0).text();
							
							// Item with greater than 1 Quantity
							if(SelectedItemQty > 1){
								var item_name = $("#"+ReceiptDestailsUnique).children().find('strong').eq(1).text();

								NumpadQuantity('collect_itemqty')
								.then(function(){
									WindowPopupQuantity(item_name)
									.then(function(){
										$("#quantity_field").val(SelectedItemQty);
										$("#quantity_field").jqxNumberInput('focus');
										setTimeout(function(){
											var input = $('#quantity_field input')[0];
											if('selectionStart' in input) {
													input.setSelectionRange(0, 0);
											}else{
													var range = input.createTextRange();
													range.collapse(true);
													range.moveEnd('character', 0);
													range.moveStart('character', 0);
													range.select();
											}
											$("#quantity_field input").select();
										},100)
									})
								})
							}else{
								$(".selected").each(function(){
									var SelectedReceiptDetailsUnique = $(this).attr("id");

									//condition here if exist
									var foundKeys = Object.keys(UpdateReceiptDetailsUniqueArr).filter(function(key) {
										return UpdateReceiptDetailsUniqueArr[key].Unique == SelectedReceiptDetailsUnique;
									})

									if(foundKeys.length == 0){
										UpdateReceiptDetailsUniqueArr.push({"Unique" : SelectedReceiptDetailsUnique, "parentunique" : ReceiptDestailsUnique, "Quantity" : 1});
									}

								})
							}
					}
			}

			var ReceiptHeaderUniqueFrom;
			var ReceiptHeaderUniqueTo;
			var UpdateReceiptDetailsUniqueArr = [];
			var UpdateReceiptDetailsUniqueArr2 = [];
			$scope.Panel = function(unique) {
				CountingItemReceipt(unique);
				var selectedItem = $(".selected").length;
				
				if(selectedItem > 0){
					if (ReceiptHeaderUnique != unique) {
						var result = getPrimaryReceipt(unique);
						
						if(result == false){
							return;
						}

						var calculateRes = getSelectedItemPrice(ReceiptHeaderUnique);

						if(calculateRes == false){
							return;
						}

						// return;
						var postdata ="ReceiptHeaderUnique="+unique;
						posData.TableManualCheckReceiptStatus(postdata)
						.success(function(data){
							if(data.result.open == true){
								var msg = data.result.msg;
								NumpadAlertClose('table_manual_msg', msg)
								.then(function(){
										WindowPopupAlert('Info');
								})

								return false;
							}else{
								$.blockUI({ css: { 
									border: '2px solid #fff',
									padding: '15px', 
									backgroundColor: '#210e66', 
									'-webkit-border-radius': '10px', 
									'-moz-border-radius': '10px', 
									opacity: 1, 
									color: '#fff',
									fontSize: '20px' 
								}, message: 'Processing please wait...' });

								UpdateProcess(unique)
								.then(function(){
									ProcessMultipleQty(unique)
									.then(function(){
										var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
										posData.SplitLoadFrom(postdata)
										.then(function(SplitFromData){
											$("#Receipt"+ReceiptHeaderUnique).html('');
											$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));
										})
			
										var postdata = "ReceiptHeaderUnique="+unique;
										posData.SplitLoadTo(postdata)
										.success(function(SplitToData){
											$("#Receipt"+unique).html('');
											$("#Receipt"+unique).append($compile(SplitToData.html)($scope));
										}).then(function(){
											scrollTotalDown();
											scrollOrderListDown();
											ShowHideDropItem();
											ItemMultipleQty = [];
											UpdateReceiptDetailsUniqueArr = [];
											UpdateReceiptDetailsUniqueArr2 = [];
											setTimeout($.unblockUI, 100);
										})
									})
								})
							}
						})
					}
				}
			}

			var UpdateProcess = (unique) => {
					var def = $.Deferred();
					if(UpdateReceiptDetailsUniqueArr.length > 0){
							var postdata="ReceiptHeaderUniqueTo="+unique;
									postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
									postdata+="&AllReceiptDetailsUnique="+JSON.stringify(UpdateReceiptDetailsUniqueArr);
							posData.UpdateReceiptDetailsUnique(postdata)
							.success(function(data){
									if(data.success){
											if(data.moveItem == true){
													if(data.payment == false){
															
															PrevReceiptDestailsUnique = 0;
															GlobalReceiptDetailsUnique = 0;
													}else{
															// var msg = "Receipt cannot be empty when payment applied.";
															// NumpadAlertClose ('split_item', msg)
															// .then(function(){
															// 		WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
															// });

															return false;
													}
											}else{
													// var msg = "Parent Receipt cannot be empty";
													// NumpadAlertClose ('split_item', msg)
													// .then(function(){
													// 		WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
													// });
											}	
									}
									def.resolve();
							})
					}else{
							def.resolve();
					}
					return def.promise();
			}

			var ProcessMultipleQty = (unique) => {
					var def = $.Deferred();
					$.when.apply($, UpdateReceiptDetailsUniqueArr2.map(function(item) {
							var postdata="ReceiptHeaderUnique="+unique;
									postdata+="&ReceiptDetailsUnique="+item.Unique;
									postdata+="&Quantity="+item.Quantity;
									postdata+="&OriginalQuantity="+item.OriginalQuantity;
							posData.SplitAddItem(postdata)
							.success(function(data2){
									if(data2.success){
											if(data2.moveItem){
													PrevReceiptDestailsUnique = 0;
													GlobalReceiptDetailsUnique = 0;
											}else{
													var msg = "Parent Receipt cannot be empty";
													NumpadAlertClose ('split_item', msg)
													.then(function(){
															WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
													});
											}	
									}
							})	
					})).done(function(){
							UpdateReceiptDetailsUniqueArr2 = [];
							def.resolve();
					})
					return def.promise();
			}

			$scope.DropItemArea = function(unique){
				CountingItemReceipt(unique);
				var selectedItem = $(".selected").length;
				
				if(selectedItem > 0){
					if (ReceiptHeaderUnique != unique) {

						var result = getPrimaryReceipt(unique);
						
						if(result == false){
							return;
						}

						var calculateRes = getSelectedItemPrice(ReceiptHeaderUnique);

						if(calculateRes == false){
							return;
						}

						var postdata ="ReceiptHeaderUnique="+unique;
						posData.TableManualCheckReceiptStatus(postdata)
						.success(function(data){
							if(data.result.open == true){
								var msg = data.result.msg;
								NumpadAlertClose('table_manual_msg', msg)
								.then(function(){
										WindowPopupAlert('Info');
								})

								return false;
							}else{
								$.blockUI({ css: { 
									border: '2px solid #fff',
									padding: '15px', 
									backgroundColor: '#210e66', 
									'-webkit-border-radius': '10px', 
									'-moz-border-radius': '10px', 
									opacity: 1, 
									color: '#fff',
									fontSize: '20px' 
								}, message: 'Processing please wait...' });


								UpdateProcess(unique)
								.then(function(){
									ProcessMultipleQty(unique)
									.then(function(){
										var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
										posData.SplitLoadFrom(postdata)
										.then(function(SplitFromData){
											$("#Receipt"+ReceiptHeaderUnique).html('');
											$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));
										})
			
										var postdata = "ReceiptHeaderUnique="+unique;
										posData.SplitLoadTo(postdata)
										.success(function(SplitToData){
											$("#Receipt"+unique).html('');
											$("#Receipt"+unique).append($compile(SplitToData.html)($scope));
										}).then(function(){
											scrollTotalDown();
											scrollOrderListDown();
											ShowHideDropItem();
											ItemMultipleQty = [];
											UpdateReceiptDetailsUniqueArr = [];
											UpdateReceiptDetailsUniqueArr2 = [];
											setTimeout($.unblockUI, 100);
										})
									})
								})
							}
						})
					}
				}
			}

			var SelectedReceiptId;
			$scope.AddReceipt = (unique) => {

				var result = getPrimaryReceipt(unique);
						
				if(result == false){
					return;
				}

				var calculateRes = getSelectedItemPrice(ReceiptHeaderUnique);

				if(calculateRes == false){
					return;
				}

				var postdata = "ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
				posData.QuickAddReceipt(postdata)
				.success(function(data){
					if(data.success){
						$.blockUI({ css: { 
							border: '2px solid #fff',
							padding: '15px', 
							backgroundColor: '#210e66', 
							'-webkit-border-radius': '10px', 
							'-moz-border-radius': '10px', 
							opacity: 1, 
							color: '#fff',
							fontSize: '20px' 
						}, message: 'Processing please wait...' });

						
						UpdateProcess(data.ReceiptHeaderUnique)
						.then(function(){
							ProcessMultipleQty(data.ReceiptHeaderUnique)
							.then(function(){
								$(".Receipt"+unique).attr("id", "Receipt"+data.ReceiptHeaderUnique);
								var elem = $(".Receipt"+unique).attr("ng-click", "setReceiptSelected2("+data.ReceiptHeaderUnique+")");
								$compile(elem)($scope);	

								var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
								posData.SplitLoadFrom(postdata)
								.then(function(SplitFromData){
										console.log(SplitFromData);
										$("#Receipt"+ReceiptHeaderUnique).html('');
										$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));
								})
	
								var postdata = "ReceiptHeaderUnique="+data.ReceiptHeaderUnique;
								posData.SplitLoadTo(postdata)
								.success(function(SplitToData){
									//Set ID for blank receipt.
									$("#Receipt"+data.ReceiptHeaderUnique).html('');
									$("#Receipt"+data.ReceiptHeaderUnique).append($compile(SplitToData.html)($scope));
									getAllReceipts();
									AddNewPanel();
									GlobalReceiptDetailsUnique = 0;
									PrevReceiptDestailsUnique = 0;
								}).then(function(){
									scrollTotalDown();
									scrollOrderListDown();
									ShowHideDropItem();
									ItemMultipleQty = [];
									UpdateReceiptDetailsUniqueArr = [];
									UpdateReceiptDetailsUniqueArr2 = [];
									setTimeout($.unblockUI, 100);
								})
							})
						})
						setTimeout($.unblockUI, 100);
					}
				})
			}


			// AddReceipt Old
			$scope.AddReceipt_old = function(id){
					if(SelectedItemQty > 1){
							SelectedReceiptId = id;
							NumpadQuantity('adjust_quantity')
							.then(function(){
									WindowPopupQuantity()
									.then(function(){
											$("#quantity_field").val(SelectedItemQty);
											$("#quantity_field").jqxNumberInput('focus');
											setTimeout(function(){
													var input = $('#quantity_field input')[0];
													if('selectionStart' in input) {
														input.setSelectionRange(0, 0);
													}else{
														var range = input.createTextRange();
														range.collapse(true);
														range.moveEnd('character', 0);
														range.moveStart('character', 0);
														range.select();
													}
													$("#quantity_field input").select();
											},100)
									})
							})
							return false;
					}

					if(countRes == 1){
							var msg = "Parent Receipt cannot be empty";
							NumpadAlertClose ('split_item', msg)
							.then(function(){
									WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							});
							return false;
					}

					var postdata = "ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
					posData.QuickAddReceipt(postdata)
					.success(function(data){
							if(data.success){
									var postdata="ReceiptHeaderUniqueTo="+data.ReceiptHeaderUnique;
											postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
											postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
									posData.UpdateReceiptDetailsUnique(postdata)
									.success(function(data2){
											if(data2.success){
													if(data2.moveItem){
															var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
															posData.SplitLoadFrom(postdata)
															.success(function(SplitFromData){
																	$("#Receipt"+ReceiptHeaderUnique).html('');
																	$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));	
															})
													}else{
															var msg = "Parent Receipt cannot be empty";
															NumpadAlertClose ('split_item', msg)
															.then(function(){
																	WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
															});
													}	
											}

											//Set ID for blank receipt.
											$(".Receipt"+id).attr("id", "Receipt"+data.ReceiptHeaderUnique);
											var elem = $(".Receipt"+id).attr("ng-click", "setReceiptSelected2("+data.ReceiptHeaderUnique+")");
											$compile(elem)($scope);
											var postdata ="ReceiptHeaderUnique="+data.ReceiptHeaderUnique;
											posData.SplitLoadTo(postdata)
											.success(function(SplitToData){
													$("#Receipt"+data.ReceiptHeaderUnique).html('');
													$("#Receipt"+data.ReceiptHeaderUnique).append($compile(SplitToData.html)($scope));
											})
											PrevReceiptDestailsUnique = 0;
											setTimeout(function(){
													scrollTotalDown();
													scrollOrderListDown();
											},500);

											getAllReceipts();
											GlobalReceiptDetailsUnique = 0;
											AddNewPanel();
									})
							}
					})
			}

			$scope.OpenReceipt = function(unique){
					$(".btntop").attr('disabled', true);
					var def = new $.Deferred();
					setTimeout(function(){
							var postdata ="ReceiptHeaderUnique="+unique;
							posData.TableManualCheckReceiptStatus(postdata)
							.success(function(data){
									if(data.result.open == true){
											var msg = data.result.msg;
											NumpadAlertClose('table_manual_msg', msg)
											.then(function(){
													WindowPopupAlert('Info');
											})
											$(".btntop").attr('disabled', false);
									}else{
											var postdata="receiptunique="+unique;
											posData.SplitOpenReceipt(postdata)
											.success(function(data){
												if(data.success == true){
														$window.location = base_url + "pos/pointofsale";
												}else{
														$(".btntop").attr('disabled', false);
												}
												def.resolve();
											})
									}
							})
					},100);
					return def.promise();
			}

			$("#split_back_to_table").on('click', function(e){
					e.preventDefault();
					$(this).attr('disabled', true);
					posData.SplitCheckDeleteEmptyChecks()
					.success(function(data){
							$window.location = base_url + 'pos/pointofsale/tables/back-to-table-view';
							$(this).attr('disabled', false);
					})	
			})

			$("#close_split_page").on('click', function(e){
					e.preventDefault();
					$(this).attr('disabled', true);
					posData.SplitCheckDeleteEmptyChecks()
					.success(function(data){
							$window.location = base_url + 'pos/pointofsale/tables/close-split-page';
							$(this).attr('disabled', false);
					})
			})

			$(document).on("click", "#split_item .alert_close", function(){
					$("#dialog-numpad-alert").jqxWindow("close");
			})

			$(document).on('click', '#invalid_quantity', function(e){
					e.preventDefault();

					$("#dialog-numpad-alert").jqxWindow("close");

					setTimeout(function(){
							$("#quantity_field input").val(SelectedItemQty);
							$("#quantity_field input").select();
					},100);
			})

			var QuickOnHold = function(){
					var def = new $.Deferred();
					var postdata ="OrderType="+$("#OrderType").val();
					posData.QuickOnHold(postdata)
					.success(function(data){
							def.resolve();
					});
					return def.promise();
			}

			var OnHoldSplitPrintKitchenReceipt = function(){
					var def = $.Deferred();
					QuickOnHold()
					.then(function(){
							def.resolve();
					})
					return def.promise();
			}

			$("#SplitClose").click(function(){
					QuickOnHold()
					.then(function(){
							$window.location = base_url + 'pos/cashier';
					})
			})

			var ReceiptCount = $("#ReceiptCount").val();
			var AddNewPanel = function(){
					var rhu = $("#ReceiptHeaderUnique").val();
					var spu = $("#SplitUnique").val();
					var postdata ="ReceiptHeaderUnique="+rhu;
							postdata+="&SplitUnique="+spu;
					posData.SplitChecksCount(postdata)
					.success(function(data){
							var rescount = data.result;
							if(rescount >= 2){
									var NewReceiptCount = parseInt(ReceiptCount) + 1;
									$("#split_check_container").append($compile(
										'<div class="Receipt'+NewReceiptCount+' new_empty_receipt" style="display:inline-block;">'+
										'	<div class="orderedlist2" ng-click="AddReceipt('+NewReceiptCount+')">'+
										'		<div style="overflow:auto;" class="{{selected}}">'+
										'			<div class="col-md-12 items'+NewReceiptCount+'" style="padding:0; margin:0;">'+
										'				<div class="click-add-item"><br><br>Empty Check<br><br>Move item here</div>'+
										'			</div>'+
										'		</div>'+
										'	</div>'+
										'</div>'
									)($scope));
									ReceiptCount = NewReceiptCount;
									ShowScrollButton();
							}
					})
			}

			/* Function Scroll */
			var fnscroll_stop = false;
			var FunctionScrollWidth = parseInt($('#split_check_container').width());
			var fnscrollleft = FunctionScrollWidth;
			$("#FunctionScrollLeft").click(function(e){
				if (isDoubleClicked($(this))) return;
				fnscrollleft = fnscrollleft - FunctionScrollWidth;
				var scrollcountleft = fnscrollleft - FunctionScrollWidth;
				$("#split_check_container").animate({ scrollLeft: scrollcountleft}, 600);
				if(scrollcountleft == 0){
					fnscrollleft = FunctionScrollWidth;
					fnscroll_stop = false;
					$("#FunctionScrollLeft").attr("disabled", true);
					$("#FunctionScrollRight").attr("disabled", false);
				}else{
					$("#FunctionScrollLeft").attr("disabled", false);
				}
			})

			$("#FunctionScrollRight").click(function(e){
					if (isDoubleClicked($(this))) return;
					$('#split_check_container').animate({ scrollLeft: fnscrollleft}, 600);
					if(fnscroll_stop == false){
						fnscrollleft = fnscrollleft + FunctionScrollWidth;	
						$("#FunctionScrollLeft").attr("disabled", false);
					}else{
						fnscrollleft = fnscrollleft + FunctionScrollWidth;
					}
			})

			$.fn.hasScrollBar = function() {
					return this.get(0).scrollWidth > this.width();
					// return this.get(0).scrollHeight > this.height();
			}

			var ShowScrollButton = function(){
				console.log($("#split_check_container").hasScrollBar());
				if($("#split_check_container").hasScrollBar()){
					$(".functionscrollbutton_container").show();
					$("#FunctionScrollRight").attr("disabled", false);

					console.log("dito me",$("#split_check_container").width());
				}else{
					console.log("dito you",$("#split_check_container").width());

					$("#split_check_container").css({width:'80%'});
					$(".functionscrollbutton_container").hide();
				}
			}

			ShowScrollButton();
				

			$("#split_check_container").bind('scroll', chk_scroll3);
			function chk_scroll3(e){
					var elem = $(e.currentTarget);
					if (elem[0].scrollWidth - elem.scrollLeft() == elem.outerWidth()) {
						fnscroll_stop = true;
						$("#FunctionScrollRight").attr("disabled", true);
						$("#FunctionScrollLeft").attr("disabled", false);
					}else{
						$("#FunctionScrollRight").attr("disabled", false);
					}
			}

			function isDoubleClicked(element) {
					//if already clicked return TRUE to indicate this click is not allowed
					if (element.data("isclicked")) return true;
				
					//mark as clicked for 1 second
					element.data("isclicked", true);
					setTimeout(function () {
							element.removeData("isclicked");
					}, 500);
				
					//return FALSE to indicate this click was allowed
					return false;
			}

			// var ReceiptNumber;
			// $scope.setReceiptSelected2 = function(id){
			// 	$("#split_check_master > div").removeClass('active');
			// 	$("#split_check_container > div").removeClass('active');
			// 	$("#Receipt"+id).addClass('active');
			// 	ReceiptNumber = id;
			// }

			var AllSplitReceipt = [];
			var getAllReceipts = () => {
					posData.SplitCheckReceipts()
					.success(function(data){
							AllSplitReceipt = data.result;
					})
			}

			getAllReceipts();

			$("#print").on(
				'click', function(){
							var PrintReceipt = false;
							$.ajax({
									url: base_url + 'pos/pointofsale/split/check-printer-status',
									method:'get',
									dataType: 'json',
									beforeSend: function(){

									},
									success: function(data){
										if(data.working == true){
												PrintReceipt = true;
										}else{
											var msg = "Receipt Printer is not working";
											NumpadAlertClose ('split_receipt_print', msg)
											.then(function(){
													WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>Alert Message');
											});
										}
									},
									complete: function(){
										if(PrintReceipt){
												for(var i=0; i < AllSplitReceipt.length; i++){
													var postdata ="ReceiptHeaderUnique="+AllSplitReceipt[i].Unique;
													posData.SplitPrintReceipt(postdata)
													.success(function(data){
															if(data.print){

															}
													})
												}
										}
									}
							})
					}
			)

			$(document).on('click', '#split_receipt_print .alert_close', function(e){
					e.preventDefault();
					$("#dialog-numpad-alert").jqxWindow('close');
			})

			$("#clear").on('click', function(){
					$("#clear").attr("disabled", true);
					$(".orderedlist > div").removeClass('selected');
					$("#split_check_master > div").removeClass('active');
					$("#split_check_container > div").removeClass('active');
					ReceiptNumber = null;
					GlobalReceiptDetailsUnique = 0;
					SelectedItemQty = '';
					setTimeout(function(){
							$("#clear").attr("disabled", false);
					},1000);
			})

			$scope.RedirectDashboard = function(){
					$(".ak-logo-button").attr("disabled", true);
					posData.SplitCheckDeleteEmptyChecks()
					.success(function(data){
							posData.EmptyTransaction()
							.success(function(data){
									if(data.success == true){
											$window.location.href = base_url + 'pos/cashier';
											if($("#TableOrder").val() == 1){
													if($("#PoleDisplay").val() == 2){
														
														//tableconn.send(JSON.stringify(["TableClickedAssigned", LastSectionSelected]));
													}
											}
									}
							})
					})
					setTimeout(function(){
							$(".ak-logo-button").attr("disabled", false);
					},1000);
			}

			$scope.SplitReceiptPrint = function(rhu){
					$.blockUI({ css: { 
						border: '2px solid #fff',
						padding: '15px', 
						backgroundColor: '#210e66', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						opacity: 1, 
						color: '#fff',
						fontSize: '20px' 
					}, message: 'Printing receipt...',
						baseZ: 99999, 
					});

					var PrintReceipt = false;
					$.ajax({
							url: base_url + 'pos/pointofsale/split/check-printer-status',
							method:'get',
							dataType: 'json',
							beforeSend: function(){

							},
							success: function(data){
									if(data.working == true){
											PrintReceipt = true;
									}else{
											var msg="Printer error, please check <br/>";
													msg+="1. Printer is turned on. <br/>";
													msg+="2. Check printer paper. <br/>";
													msg+="3. Restart printer.";
											NumpadAlertClose('print_receipt_error', msg)
											.then(function(){
													WindowPopupAlert('Printer problem');
											})
									}
									setTimeout($.unblockUI, 100); 
							},
							complete: function(){
									if(PrintReceipt){
											var postdata ="ReceiptHeaderUnique="+rhu;
											posData.SplitPrintReceipt(postdata)
											.success(function(data){
												if(data.print){

												}else{
													var msg = "Cannot print empty receipt";
													NumpadAlertClose ('split_receipt_print', msg)
													.then(function(){
															WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>Alert Message');
													});
												}
											})
									}
							}
					})
			}

			$scope.SplitReceiptPayment = function(rhu){
					var postdata ="ReceiptHeaderUnique="+rhu;
					posData.TableManualCheckReceiptStatus(postdata)
					.success(function(data){
							if(data.result.open == true){
									var msg = data.result.msg;
									NumpadAlertClose('table_manual_msg', msg)
									.then(function(){
											WindowPopupAlert('Info');
									})
							}else{
									var postdata="receiptunique="+rhu;
											postdata+="&set_payment=1";
									posData.SplitOpenReceipt(postdata)
									.success(function(data){
										if(data.success == true){
													$window.location = base_url + "pos/pointofsale";
										}else{
												var msg = "Cannot pay empty receipt";
												NumpadAlertClose ('split_receipt_print', msg)
												.then(function(){
														WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>Alert Message');
												});
										}
								})
							}
					})
			}

			var populateNumpadQuantity = function(form_name){
					var def = $.Deferred();
					setTimeout(function(){
							$("#dialog-numpad-quantity").append('<div id="quantity_numpad" style="background: #144766; color:#EEE;"></div>');
							$("#quantity_numpad").html('');
							$("#quantity_numpad").append('<h4 style="text-align:center;">Enter New Quantity</h4>');
							$("#quantity_numpad").append(
								'<form id="'+form_name+'">'+
										'<div id="quantity_field" class="hdfield"></div>'+
										'<div id="keyboard_quantity"></div>'+
								'</form>'
							);
							$("#quantity_field").jqxNumberInput({ width: '100%', height: '35px', inputMode: 'simple', spinButtons: false, decimalDigits: $("#DecimalsQuantity").val() });
							$('#quantity_field').on('change', function (event) {
									var value = event.args.value;
									var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
									myNumber = value;
							}); 

							def.resolve();
					},100);
					return def.promise();
			}
			
			var WindowPopupQuantity = function(item_name){
					var def = $.Deferred();
					setTimeout(function(){
						(item_name ? item_name : '');
						$("#dialog-numpad-quantity").jqxWindow({
								title: "Quantity Change | "+item_name,
								isModal: true,
								theme: 'darkblue',
								draggable: false,
								resizable: false,
								showCloseButton: true,
								showAnimationDuration: 0,
								closeAnimationDuration: 0
						});
						$('#dialog-numpad-quantity').jqxWindow('open');
						def.resolve();	
					},100);
					return def.promise();
			}

			var NumpadQuantity = function(form_name = false){
					var def = $.Deferred();
					if(form_name == false){
							form_name = 'quantity_form';
					}
					populateNumpadQuantity(form_name)
					.then(function(){
							$('#keyboard_quantity').numeric_numpad({
								layout: "numeric",
								input: $('#quantity_field')
							});
							def.resolve();
					});
					return def.promise();
			}

			$("#dialog-numpad-quantity").on('close', function(){
					$("#quantity_numpad").remove();
			})

			$(document).on('submit', 
					'#adjust_quantity', function(e){
							e.preventDefault();

							var setMoveQty = $("#quantity_field").val();
							if(setMoveQty > SelectedItemQty){
									var msg = "Enter quantity must not greater than to original";
									NumpadAlertClose ('split_item', msg)
									.then(function(){
										WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
									});
									return false;
							}else if(setMoveQty == SelectedItemQty) {
									var postdata = "ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
									posData.QuickAddReceipt(postdata)
									.success(function(data){
											if(data.success){
													var postdata="ReceiptHeaderUniqueTo="+data.ReceiptHeaderUnique;
															postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
															postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
													posData.UpdateReceiptDetailsUnique(postdata)
													.success(function(data2){
															if(data2.success){
																	if(data2.moveItem){
																			var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
																			posData.SplitLoadFrom(postdata)
																			.success(function(SplitFromData){
																				$("#Receipt"+ReceiptHeaderUnique).html('');
																				$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));	
																			})
																		
																	}else{
																			var msg = "Parent Receipt cannot be empty";
																			NumpadAlertClose ('split_item', msg)
																			.then(function(){
																					WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
																			});
																	}	
															}

															//Set ID for blank receipt.
															$(".Receipt"+SelectedReceiptId).attr("id", "Receipt"+data.ReceiptHeaderUnique);
															var elem = $(".Receipt"+SelectedReceiptId).attr("ng-click", "setReceiptSelected2("+data.ReceiptHeaderUnique+")");
															$compile(elem)($scope);
															var postdata ="ReceiptHeaderUnique="+data.ReceiptHeaderUnique;
															posData.SplitLoadTo(postdata)
															.success(function(SplitToData){
																	$("#Receipt"+data.ReceiptHeaderUnique).html('');
																	$("#Receipt"+data.ReceiptHeaderUnique).append($compile(SplitToData.html)($scope));
															})
															PrevReceiptDestailsUnique = 0;
															setTimeout(function(){
																	scrollTotalDown();
																	scrollOrderListDown();
															},500);

															getAllReceipts();
															GlobalReceiptDetailsUnique = 0;
															AddNewPanel();
													})
											}
											$("#dialog-numpad-quantity").jqxWindow('close');
									})

									return false;
							}

								var postdata = "ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
								posData.QuickAddReceipt(postdata)
								.success(function(data){
										if(data.success){
												var postdata="ReceiptHeaderUnique="+data.ReceiptHeaderUnique;
														postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
														postdata+="&Quantity="+setMoveQty;
														postdata+="&OriginalQuantity="+SelectedItemQty;
												posData.SplitAddItem(postdata)
												.success(function(data2){
														if(data2.success){
																if(data2.moveItem){
																		var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
																		posData.SplitLoadFrom(postdata)
																		.success(function(SplitFromData){
																				$("#Receipt"+ReceiptHeaderUnique).html('');
																				$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));	
																		})
																}else{
																		var msg = "Parent Receipt cannot be empty";
																		NumpadAlertClose ('split_item', msg)
																		.then(function(){
																				WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
																		});
																}	
														}

														//Set ID for blank receipt.
														$(".Receipt"+SelectedReceiptId).attr("id", "Receipt"+data.ReceiptHeaderUnique);
														var elem = $(".Receipt"+SelectedReceiptId).attr("ng-click", "setReceiptSelected2("+data.ReceiptHeaderUnique+")");
														$compile(elem)($scope);
														var postdata ="ReceiptHeaderUnique="+data.ReceiptHeaderUnique;
														posData.SplitLoadTo(postdata)
														.success(function(SplitToData){
																$("#Receipt"+data.ReceiptHeaderUnique).html('');
																$("#Receipt"+data.ReceiptHeaderUnique).append($compile(SplitToData.html)($scope));
														})
														PrevReceiptDestailsUnique = 0;
														setTimeout(function(){
																scrollTotalDown();
																scrollOrderListDown();
														},500);

														getAllReceipts();
														GlobalReceiptDetailsUnique = 0;
														AddNewPanel();
														SelectedItemQty = ''; 
												})
										}
								})
								$("#dialog-numpad-quantity").jqxWindow('close');
						}
				)

				$(document).on('click','#adjust_quantity .exit', function(e){
					e.preventDefault();
					$("#dialog-numpad-quantity").jqxWindow('close');
				})


				var countRes = 0;
				var CountingItemReceipt = (unique) => {
					countRes = $("#orderedlist"+unique+" > div").length;
				}

				var CountItemsInReceipt = (id) => {
					var countItemsInReceipt = 0;
					var ExistClass = [];
					var countSelectedItem = [];
					var SubTotal = 0;
					var Quantity;
					var ItemReceiptDetailsUnique;
					$('div', '#'+id).children('div').each(function () {
						var elemClass = $(this).parent().attr('class');
						if(elemClass !== 'col-md-12 items'){
							var getFirstClass = elemClass.split(' ')[0];
							ItemReceiptDetailsUnique = $(this).parent().attr("id");
							if(countItemsInReceipt != getFirstClass){
								ExistClass.push(getFirstClass);
								countItemsInReceipt = getFirstClass;

								if(elemClass.split(' ')[1]){
									countSelectedItem.push(elemClass.split(' ')[1]);
								}
							}
							var ElemStrong = $(this).parent().children('div').find('strong');
							var Price = parseFloat(ElemStrong.last().text()).toFixed(2);
							SubTotal += parseFloat(Price);
							Quantity = ElemStrong.first().text();
						}
					});
					return [ExistClass, countSelectedItem, SubTotal, ItemReceiptDetailsUnique, Quantity];
				}

				var getPrimaryReceipt = (id) => {
					var newid = 'Receipt'+ReceiptHeaderUnique;
					var result = $("#split_check_master").children('div').attr('id');
					if(result == newid){
						var result2 = CountItemsInReceipt(ReceiptHeaderUnique);
						var SelectedQuantity;
						$.when.apply($, UpdateReceiptDetailsUniqueArr2.map(function(item) {
							if(item.Unique == result2[3]){
								return SelectedQuantity = item.Quantity;
							}
						}))

						$.when.apply($, UpdateReceiptDetailsUniqueArr.map(function(item) {
							if(item.Unique == result2[3]){
								return SelectedQuantity = item.Quantity;
							}
						}))

						if(result2[0].length == result2[1].length && result2[4] == SelectedQuantity){
							var msg = "Parent Receipt cannot be empty";
							NumpadAlertClose ('split_item', msg)
							.then(function(){
								WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							});

							return false;
						}else{
							return result2[2];
						}
					}
				}

				var getSelectedItemPrice = (id) => {
					var result = CountItemsInReceipt(ReceiptHeaderUnique);

					var SelectedQuantity;
					$.when.apply($, UpdateReceiptDetailsUniqueArr2.map(function(item) {
						if(item.Unique == result[3]){
							return SelectedQuantity = item.Quantity;
						}
					}))

					$.when.apply($, UpdateReceiptDetailsUniqueArr.map(function(item) {
						if(item.Unique == result[3]){
							return SelectedQuantity = item.Quantity;
						}
					}))

					if(result[0].length == result[1].length && $("#Paid"+id).length > 0 && result[4] == SelectedQuantity){
						var msg = "Receipt cannot be empty when payment applied.";
						NumpadAlertClose ('split_item', msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						});

						return false;
					}
				}

				var getAmountDue = (id) => {
						return $("#Receipt"+id).last('div').find('strong').last().text();
				}

				$(document).on('submit', '#move_item_adj_qty', function(e){
						e.preventDefault();
						var setMoveQty =  $("#quantity_field").val();
						if(setMoveQty > SelectedItemQty){
								var msg = "Enter quantity must not greater than to original";
								NumpadAlertClose ('split_item', msg)
								.then(function(){
									WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								});
								return false;
						}else if(setMoveQty == SelectedItemQty){

								var postdata="ReceiptHeaderUniqueTo="+ReceiptHeaderUniqueTo;
										postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUniqueFrom;
										postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
								posData.UpdateReceiptDetailsUnique(postdata)
								.success(function(data){
										if(data.success){
												if(data.moveItem == true){
														if(data.payment == false){
																var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUniqueFrom;
																posData.SplitLoadFrom(postdata)
																.success(function(SplitFromData){
																		$("#Receipt"+ReceiptHeaderUniqueFrom).html('');
																		$("#Receipt"+ReceiptHeaderUniqueFrom).append($compile(SplitFromData.html)($scope));	
																})

																var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUniqueTo;
																posData.SplitLoadTo(postdata)
																.success(function(SplitToData){
																		$("#Receipt"+ReceiptHeaderUniqueTo).html('');
																		$("#Receipt"+ReceiptHeaderUniqueTo).append($compile(SplitToData.html)($scope));
																})
																PrevReceiptDestailsUnique = 0;
																GlobalReceiptDetailsUnique = 0;
																setTimeout(function(){
																		scrollTotalDown();
																		scrollOrderListDown();
																},500);

														}else{
																var msg = "Receipt cannot be empty when payment applied.";
																NumpadAlertClose ('split_item', msg)
																.then(function(){
																		WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
																});
														}
												}else{
														var msg = "Parent Receipt cannot be empty";
														NumpadAlertClose ('split_item', msg)
														.then(function(){
																WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
														});
												}	
										}
								})

								$("#dialog-numpad-quantity").jqxWindow('close');
								return false;
						}
					
						var postdata="ReceiptHeaderUnique="+ReceiptHeaderUniqueTo;
								postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
								postdata+="&Quantity="+setMoveQty;
								postdata+="&OriginalQuantity="+SelectedItemQty;
						posData.SplitAddItem(postdata)
						.success(function(data2){
								if(data2.success){
										if(data2.moveItem){
												var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUniqueFrom;
												posData.SplitLoadFrom(postdata)
												.success(function(SplitFromData){
														$("#Receipt"+ReceiptHeaderUniqueFrom).html('');
														$("#Receipt"+ReceiptHeaderUniqueFrom).append($compile(SplitFromData.html)($scope));	
												})

												var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUniqueTo;
												posData.SplitLoadTo(postdata)
												.success(function(SplitToData){
														$("#Receipt"+ReceiptHeaderUniqueTo).html('');
														$("#Receipt"+ReceiptHeaderUniqueTo).append($compile(SplitToData.html)($scope));
												})
												PrevReceiptDestailsUnique = 0;
												GlobalReceiptDetailsUnique = 0;
												setTimeout(function(){
														scrollTotalDown();
														scrollOrderListDown();
												},500);
										}else{
												var msg = "Parent Receipt cannot be empty";
												NumpadAlertClose ('split_item', msg)
												.then(function(){
														WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
												});
										}	
								}

								//Set ID for blank receipt.
								getAllReceipts();
								GlobalReceiptDetailsUnique = 0;
								SelectedItemQty = ''; 
								$("#dialog-numpad-quantity").jqxWindow('close');
						})
				})

				$(document).on('click', '#move_item_adj_qty .exit', function(e){
						e.preventDefault();
						$("#dialog-numpad-quantity").jqxWindow('close');
				})

				$(document).on('click', '#table_manual_msg .alert_close', function(e){
						e.preventDefault();
						$("#dialog-numpad-alert").jqxWindow('close');
				})

				$(document).on('click', '#print_receipt_error .alert_close', function(e){
						e.preventDefault();
						$("#dialog-numpad-alert").jqxWindow('close');
				})

				$.fn.hasVerticalScrollBar = function() {
						return this.get(0) ? parseInt( this.get(0).scrollHeight ) > parseInt( this.innerHeight() ) : false;
				};


				var ShowHideDropItem = () => {
						$(".itemlist").each(function(){
								var id = $(this).attr("id");
								var checkscroll = $("#"+id).hasVerticalScrollBar();
								if(checkscroll){
										$("#drop_item_area"+id).show();
										$("#ScrollButtonByReceipt"+id).show();
										
										var elementItemList = document.getElementById(id);
										var ScrollHeight 		= elementItemList.scrollHeight;
										var ScrollDown 			= ScrollHeight;

										$("#ReceiptScrollDown"+id).attr("disabled", true);
										
										$scope.ScrollUp = (id) => {
												ScrollDown = ScrollDown - ScrollHeight;
												$("#"+id).animate({ scrollTop: ScrollDown}, 300);
												if(ScrollDown == 0){
														ScrollDown = ScrollHeight;
														$("#ReceiptScrollUp"+id).attr("disabled", true);
														$("#ReceiptScrollDown"+id).attr("disabled", false);
												}else{
														$("#ReceiptScrollUp"+id).attr("disabled", false);
												}
										}

										$scope.ScrollDown = (id) => {
												$("#"+id).animate({ scrollTop: ScrollDown}, 600);
												$("#ReceiptScrollUp"+id).attr("disabled", false);
												$("#ReceiptScrollDown"+id).attr("disabled", true);
										} 

								}else{
										$("#drop_item_area"+id).hide();
										$("#ScrollButtonByReceipt"+id).hide();
								}
						})
				}


				
				ShowHideDropItem();
		

				var ItemMultipleQty = [];
				$(document).on('submit', '#collect_itemqty', function(e){
						e.preventDefault();
						var EnteredQty = $("#quantity_field").val();

						if(EnteredQty > SelectedItemQty){
								var msg = "Enter quantity must not greater than to original";
								NumpadAlertClose ('invalid_quantity', msg)
								.then(function(){
										WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>')
										.then(function(){
												setTimeout(function(){
														$("#quantity_field input").val(SelectedItemQty);
														$("#quantity_field input").select();
												},100);
										})
								});
								
								return false;
						}							


						if(EnteredQty != SelectedItemQty){
							// var count = 0;
							// $(".selected").each(function(){
								// var SelectedReceiptDetailsUnique = $(this).attr("id");
								
								//condition here if exist
								// var foundKeys = Object.keys(UpdateReceiptDetailsUniqueArr2).filter(function(key) {
								// 		return UpdateReceiptDetailsUniqueArr2[key].Unique == SelectedReceiptDetailsUnique;
								// })
								
								// if(foundKeys.length == 0){
										UpdateReceiptDetailsUniqueArr2.push({"Unique" : GlobalReceiptDetailsUnique, "Quantity" : EnteredQty, "OriginalQuantity" : SelectedItemQty, "parentunique" : GlobalReceiptDetailsUnique});
								// }

								// console.log(SelectedReceiptDetailsUnique, count);

								// count++;
							// })

							// console.log(UpdateReceiptDetailsUniqueArr2);
							
						}else{
								
							$(".selected").each(function(){
								var SelectedReceiptDetailsUnique = $(this).attr("id");
								
								//condition here if exist
								var foundKeys = Object.keys(UpdateReceiptDetailsUniqueArr).filter(function(key) {
									return UpdateReceiptDetailsUniqueArr[key].Unique == SelectedReceiptDetailsUnique;
								})

								
								if(foundKeys.length == 0){
									UpdateReceiptDetailsUniqueArr.push({"Unique" : SelectedReceiptDetailsUnique, "Quantity" : EnteredQty, "OriginalQuantity" : SelectedItemQty, "parentunique" : GlobalReceiptDetailsUnique});
								}
							})
						}
						
						$("#dialog-numpad-quantity").jqxWindow('close');
				})

				$(document).on('click', '#collect_itemqty .exit', function(e){
						$("#dialog-numpad-quantity").jqxWindow('close');
				})

				

				/**
				 * OLD CODES
				 */

				var UpdateProcess_old = (unique) => {
					var def = $.Deferred();
					$.when.apply($, SingleItemQty.map(function(item) {
							console.log(item.ReceiptDetailsUnique);
							var postdata="ReceiptHeaderUniqueTo="+unique;
									postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
									postdata+="&ReceiptDetailsUnique="+ item.ReceiptDetailsUnique;
							posData.UpdateReceiptDetailsUnique(postdata)
							.success(function(data){
									if(data.success){
											if(data.moveItem == true){
													if(data.payment == false){
															
															PrevReceiptDestailsUnique = 0;
															GlobalReceiptDetailsUnique = 0;
													}else{
															var msg = "Receipt cannot be empty when payment applied.";
															NumpadAlertClose ('split_item', msg)
															.then(function(){
																	WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
															});
													}
											}else{
													var msg = "Parent Receipt cannot be empty";
													NumpadAlertClose ('split_item', msg)
													.then(function(){
															WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
													});
											}	
									}
									console.log("process", unique); 
							})

					})).done(function(){
							console.log("Done");
							def.resolve();
					})
					return def.promise();
			}

				var UpdateProcess_orignal = (unique) => {
					var SelectedItems = [];
					$(".selected").each(function(){
							var RDU = $(this).attr('id');
							if(RDU){
									SelectedItems.push(RDU);
							}
					})

					$.when.apply($, SelectedItems.map(function(RDU) {
							var def = $.Deferred();
							$.blockUI({ css: { 
								border: '2px solid #fff',
								padding: '15px', 
								backgroundColor: '#210e66', 
								'-webkit-border-radius': '10px', 
								'-moz-border-radius': '10px', 
								opacity: 1, 
								color: '#fff',
								fontSize: '20px' 
							}, message: 'Processing please wait...' });

							var postdata="ReceiptHeaderUniqueTo="+unique;
									postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
									postdata+="&ReceiptDetailsUnique="+ RDU;//GlobalReceiptDetailsUnique;
							posData.UpdateReceiptDetailsUnique(postdata)
							.success(function(data){
									if(data.success){
											if(data.moveItem == true){
													if(data.payment == false){
															
															PrevReceiptDestailsUnique = 0;
															GlobalReceiptDetailsUnique = 0;
													}else{
															var msg = "Receipt cannot be empty when payment applied.";
															NumpadAlertClose ('split_item', msg)
															.then(function(){
																	WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
															});
													}
											}else{
													var msg = "Parent Receipt cannot be empty";
													NumpadAlertClose ('split_item', msg)
													.then(function(){
															WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
													});
											}	
									} 
									def.resolve();
							})
							
							return def.promise();
					})).then(function() {
							var postdata = "ReceiptHeaderUnique="+ReceiptHeaderUnique;
							posData.SplitLoadFrom(postdata)
							.success(function(SplitFromData){
									$("#Receipt"+ReceiptHeaderUnique).html('');
									$("#Receipt"+ReceiptHeaderUnique).append($compile(SplitFromData.html)($scope));
							})

							var postdata = "ReceiptHeaderUnique="+unique;
							posData.SplitLoadTo(postdata)
							.success(function(SplitToData){
									$("#Receipt"+unique).html('');
									$("#Receipt"+unique).append($compile(SplitToData.html)($scope));
							}).then(function(){
									scrollTotalDown();
									scrollOrderListDown();
									ShowHideDropItem();
									setTimeout($.unblockUI, 100);
									SelectedItems = [];
									
							})
					});
			}


				$scope.Panel_old = function(unique) {
						CountingItemReceipt(unique);
						var selectedItem = $(".selected").length;
						if(selectedItem > 0){
								if (ReceiptHeaderUnique != unique) {
										if(SelectedItemQty > 1){
												var postdata ="ReceiptHeaderUnique="+unique;
												posData.TableManualCheckReceiptStatus(postdata)
												.success(function(data){
														if(data.result.open == true){
																var msg = data.result.msg;
																NumpadAlertClose('table_manual_msg', msg)
																.then(function(){
																		WindowPopupAlert('Info');
																})
														}else{
																ReceiptHeaderUniqueTo = unique;
																ReceiptHeaderUniqueFrom = ReceiptHeaderUnique;
																SelectedReceiptId = unique;
																NumpadQuantity('move_item_adj_qty')
																.then(function(){
																		WindowPopupQuantity()
																		.then(function(){
																				$("#quantity_field").val(SelectedItemQty);
																				$("#quantity_field").jqxNumberInput('focus');
																				setTimeout(function(){
																						var input = $('#quantity_field input')[0];
																						if('selectionStart' in input) {
																								input.setSelectionRange(0, 0);
																						}else{
																								var range = input.createTextRange();
																								range.collapse(true);
																								range.moveEnd('character', 0);
																								range.moveStart('character', 0);
																								range.select();
																						}
																						$("#quantity_field input").select();
																				},100)
																		})
																})
																return false;
														}
														UpdateProcess(unique);
												})
										}
								}else{
										return false;
								}
						}
				}

			if( $("#split_back_to_table").length > 0 ){
				$(".home_container").css({"width" : '40%'});
				$(".functionscrollbutton_container").css({"width" : '60%'});
			}else{
				$(".home_container").css({"width" : '20%'});
				$(".functionscrollbutton_container").css({"width" : '80%'});
			}
		}])
})()