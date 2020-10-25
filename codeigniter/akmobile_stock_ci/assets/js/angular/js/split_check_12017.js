(function() {
	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', '$compile',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile) {
		
		var GlobalReceiptDetailsUnique = 0;
		var ReceiptHeaderUnique = 0;
		
		//-->On Load Ordered Item List
		var LoadOrderedItemList = function(){
			var def = new $.Deferred();
			posData.OrderedItemList()
			.success(function(data){
				$scope.ordereditemlist = data;
				def.resolve();
			});
			return def.promise();
		};
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
					draggable: false
				});
				$('#dialog-numpad-alert').jqxWindow('setTitle', header_text);
				$('#dialog-numpad-alert').jqxWindow('open');
				$(".alert_okay").focus();
				def.resolve();	
			},100);
			return def.promise();
		}


		LoadOrderedItemList();
		
		$scope.setSelected = function(ReceiptDestailsUnique, ItemUnique, Unique) {
			if ($scope.lastSelected) {
			 	$scope.lastSelected.selected = '';
				$scope.lastSelected.selected2 = '';
				$scope.lastSelected.selected3 = '';
				$scope.lastSelected.selected4 = '';
		    }
			this.selected = 'selected';
		    $scope.lastSelected = this;

			GlobalReceiptDetailsUnique = ReceiptDestailsUnique;
			ReceiptHeaderUnique = Unique;
		}
		
		var PrevReceiptDestailsUnique = 0;
		$scope.setSelected2 = function(ReceiptDestailsUnique, ItemUnique, Unique) {
			$("#"+ReceiptDestailsUnique).addClass('selected2');
			if ($scope.lastSelected) {
				$("#"+PrevReceiptDestailsUnique).removeClass('selected2');
			 	$scope.lastSelected.selected = '';
				$scope.lastSelected.selected2 = '';
				$scope.lastSelected.selected3 = '';
				$scope.lastSelected.selected4 = '';
		    }
			this.selected2 = 'selected2';
		    $scope.lastSelected = this;
			
			GlobalReceiptDetailsUnique = ReceiptDestailsUnique;
			ReceiptHeaderUnique = Unique;
			PrevReceiptDestailsUnique = ReceiptDestailsUnique;
		}

		$scope.setSelected3 = function(ReceiptDestailsUnique, ItemUnique, Unique) {
			$("#"+ReceiptDestailsUnique).addClass('selected3');
			if ($scope.lastSelected) {
				$("#"+PrevReceiptDestailsUnique).removeClass('selected3');
			 	$scope.lastSelected.selected = '';
				$scope.lastSelected.selected2 = '';
				$scope.lastSelected.selected3 = '';
				$scope.lastSelected.selected4 = '';
		    }
			this.selected3 = 'selected3';
		    $scope.lastSelected = this;
			
			GlobalReceiptDetailsUnique = ReceiptDestailsUnique;
			ReceiptHeaderUnique = Unique;
			PrevReceiptDestailsUnique = ReceiptDestailsUnique;
		}

		$scope.setSelected4 = function(ReceiptDestailsUnique, ItemUnique, Unique) {
			$("#"+ReceiptDestailsUnique).addClass('selected4');
			if ($scope.lastSelected) {
				$("#"+PrevReceiptDestailsUnique).removeClass('selected4');
			 	$scope.lastSelected.selected = '';
				$scope.lastSelected.selected2 = '';
				$scope.lastSelected.selected3 = '';
				$scope.lastSelected.selected4 = '';
		    }
			this.selected4 = 'selected4';
		    $scope.lastSelected = this;
			
			GlobalReceiptDetailsUnique = ReceiptDestailsUnique;
			ReceiptHeaderUnique = Unique;
			PrevReceiptDestailsUnique = ReceiptDestailsUnique;
		}
		
		$scope.Panel = function(unique){
			var postdata="ReceiptHeaderUniqueTo="+unique;
				postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
				postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
			posData.UpdateReceiptDetailsUnique(postdata)
			.success(function(data){
				if(data.success){
					if(data.moveItem){
						//$window.location = base_url + "pos/pointofsale/split-check";
						
						$("#Receipt"+ReceiptHeaderUnique).html(data.htmlFrom);
						$("#Receipt"+unique).html(data.htmlTo);
					}else{
						var msg = "Parent Receipt cannot be empty";
						NumpadAlertClose ('split_item', msg)
						.then(function(){
							WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						});
					}	
				}
			})
		}

		$scope.AddReceipt = function(){
			var postdata = "ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
			posData.QuickAddReceipt(postdata)
			.success(function(data){
				if(data.success){
					var postdata="ReceiptHeaderUniqueTo="+data.ReceiptHeaderUnique;
						postdata+="&ReceiptHeaderUniqueFrom="+ReceiptHeaderUnique;
						postdata+="&ReceiptDetailsUnique="+GlobalReceiptDetailsUnique;
					posData.UpdateReceiptDetailsUnique(postdata)
					.success(function(data){
						if(data.success == true){
							$window.location = base_url + "pos/pointofsale/split-check";	
						}
					})
				}
			})
		}

		$scope.OpenReceipt = function(unique){
			var def = new $.Deferred();
            setTimeout(function(){
                var postdata="receiptunique="+unique;
                posData.SplitOpenReceipt(postdata)
                .success(function(data){
                    if(data.success == true){
                        $window.location = base_url + "pos/pointofsale";
                    }else{
                        alert("error");
                    }
                    def.resolve();
                })
            },100);
            return def.promise();
		}


		$(document).on("click", "#split_item .alert_close", function(){
			$("#dialog-numpad-alert").jqxWindow("close");
		})
	}])
})()