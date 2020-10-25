(function() {
	var GlobalCustomer = null;
	var GlobalCustomerName = null;
	var newCustomerCreated = null;
	var editCustomerSelected = null;

	angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
	.service('svc',function(){})
	.controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter) {
		
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
		
		
		/* Modal
		* Alert Popup
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
		* New Customer
		@param string title
		@param boolean method
		@param array size
		@param array move
		@param string id
		*/
		var WindowPopupNumpad = function(title, method, size, move, id){
			var def = $.Deferred();
			setTimeout(function(){
				//Modal Settings
				$("#"+id).jqxWindow({
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
					$('#'+id).jqxWindow('move', move[0], move[1]);
				
				if(method){
					$('#'+id).jqxWindow('open');
				}else{
					$('#'+id).jqxWindow('close');
				}
				def.resolve();	
			},100);
			return def.promise();
		}
		
		var NumpadPromptAlertClose = function(msg){
			var def = $.Deferred();
			populateAlert('alert_no_customer_selected', msg)
			.then(function(){
				$('#keyboard').jkeyboard({
				  layout: "alert_close",
				  input: $('#number_field')
				});
				def.resolve();
			})
			return def.resolve();
		}
		
		$scope.CustomerEditWhen = true;
		$scope.CustomerOkWhen = true;
		
		$scope.EditCustomerSaveDisabled = true;
		$scope.AddCustomerSaveDisabled = true;
		$scope.EditCustomerDefaultButtons = true;
		$scope.EditCustomerWhenCloseSaveChanges = false;
		$scope.EditCustomerWhenDelete = false;
		$scope.EditCustomerWhenClose = '';
		
		
		$scope.thetabsadd = 'darkblue';
		$scope.tabset = {
			selectedItem:0
		};
		$scope.editthetabs = 'darkblue';
		$scope.edittabset = {
			selectedItem:0
		};
		
		var CustomerGrid = function(){
			$scope.searchCustomergridSettings = {
				width: "100%",
				height: 420,
				altRows: true,
				theme: 'bootstrap',
				pageable: true,
				pagerMode: 'default',
				columnsResize: true,
				filterable: true,
				filterMode: 'simple',
				source:  {
					dataType: "json",
					dataFields: [
						{ name: 'Unique', type: 'int' },
						{ name: 'FirstName', type: 'string' },
						{ name: 'LastName', type: 'string' },
						{ name: 'Company', type: 'string' },
						{ name: 'Address1', type: 'string' },
						{ name: 'Phone1', type: 'string'},
						{ name: 'Phone2', type: 'string'},
						{ name: 'Email', type: 'string'},
					],
					localdata: {}
				},
				columns: [
					{ text: 'Unique', dataField: 'Unique', hidden: true},
					{ text: 'First Name', dataField: 'FirstName', width: '15%' },
					{ text: 'Last Name', dataField: 'LastName', width: '15%' },
					{ text: 'Company', dataField: 'Company', width: '15%' },
					{ text: 'Address', dataField: 'Address', width: '20%' },
					{ text: 'Phone1', dataField: 'Phone1', width: '10%' },
					{ text: 'Phone2', dataField: 'Phone2', width: '10%'},
					{ text: 'Email', dataField: 'Email', width: '15%'}
				]
			}
		}
		
		var Customer_data = function(){
			$http({
				method:'get',
				url: api_url+'customer/list'
			}).success(function(data){
				$scope.searchCustomergridSettings = {
					source: {
						localdata: data.rows
					}
				}
			}).then(function(){
				setTimeout(function(){
					$("#customer-search input.jqx-input").focus();
				}, 100);
			})
		}
	
		/* Load varibles */
		CustomerGrid()
		Customer_data();
		
		var ClearCustomerForm = function(){
			$scope.FirstName = '';
			$scope.FirstName = '';
			$scope.LastName = '';
			$scope.Company = '';
			$scope.Address1 = '';
			$scope.Address2 = '';
			$scope.Phone1 = '';
			$scope.Phone2 = '';
			$scope.Phone3 = '';
			$scope.Email = '';
			$scope.Fax = '';
			$scope.Website = '';
			$scope.Custom1 = '';
			$scope.Custom2 = '';
			$scope.Custom3 = '';
			$scope.CustomerNote = '';
			$("#zipcode").val(''); 
			$("#city").val('');
			$("#state").val(''); 
			$("#island").val(''); 
			$("#country").val(''); 
			$scope.newcustomer = {
				message: ''
			}
		};
		
		//-->Get Selected Customer
		var GetSelectedCustomer = function(){
			var def = new $.Deferred();
			posData.SelectCustomer()
			.success(function(data){
				 var CustomerId = data.CustomerId;
				 if(CustomerId){
					$scope.customer = {
						selected: data.CustomerFirstName + ' ' + data.CustomerLastName,
						id: data.CustomerId
					}
					$scope.RemoveCustomerWhen = true;
					GlobalCustomer = data.CustomerId;
				 }else{
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					$scope.RemoveCustomerWhen = false;
					GlobalCustomer = null;	
				 }
				 def.resolve();
			});
			return def.promise();
		}//End Get Selected Customer
		
		$scope.searchCustomerRowClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			$scope.CustomerOkWhen = false;
			$scope.CustomerEditWhen = false;
		}
		
		$scope.searchCustomerRowDoubleClick = function(event){
			var args = event.args;
			var index = args.index;
			var row = args.row;
			GlobalCustomer = row.Unique;
			GlobalCustomerName = row.FirstName + " " + row.LastName;
			
			posData.InstantNewSale()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;	
				}
			 }).then(function(){
			 	var postData="selcustomervalue="+row.Unique;;
				postData+="&selcustomerlabel="+row.FirstName + " " + row.LastName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer()
					.then(function(){
						$window.location = base_url + "pos/pointofsale";
					})
				})
			 })
		}
		
		$scope.SelectCustomer = function(){
			posData.InstantNewSale()
			.success(function(data){
				if(data.success == true){
					$scope.newsaleid = data.NewSaleId;	
				}
			 }).then(function(){
				var postData="selcustomervalue="+GlobalCustomer;
				postData+="&selcustomerlabel="+GlobalCustomerName;
				posData.TransCustomer(postData)
				.success(function(data){
					GetSelectedCustomer();
					$scope.CustomerOkWhen = true;
					$scope.CustomerEditWhen = true;
					$("#customer-search").jqxDataTable('clearFilters');
					dialogCustomerForm.close();
				})	
			 })
		}
		
		$scope.CustomerFormClose = function(){
			$scope.CustomerOkWhen = true;
			$scope.CustomerEditWhen = true;
			GlobalCustomer = null;
			$("#customer-search").jqxDataTable('clearFilters');
			dialogCustomerForm.close();
		}
		
		$scope.RemoveCustomer = function(){
			$http({
				method: 'post',
				url: base_url+"pos/pointofsale/remove-customer"
			}).success(function(data){
				if(data.success == true){
					$scope.customer = {
						selected: 'Guest',
						id: ''
					}
					GlobalCustomer = null;
					GlobalCustomerName = '';
					$scope.RemoveCustomerWhen = false;
				}else{
					alert("Sorry, we encountered a technical difficulties\nPlease try again later.");
				}
			})
		}

		var CustomerPurchases = function(id){
			var def = $.Deferred();
			var postdata="customerid="+id;
			posData.CustomerPurchases(postdata)
			.success(function(data){
				$scope.purchase_history = {
					source: {
						localdata: data
					}
				}
				def.resolve();
			})
			return def.resolve();
		}
		
		$scope.CustomerLink = function(){
			var result = $scope.customer.id;
			if(!result) {
				$http({
					method:'get',
					url: api_url+'customer/list'
				}).success(function(data){
					$scope.searchCustomergridSettings = {
						source: {
							localdata: data.rows
						}
					}
				}).then(function(){
					dialogCustomerForm.setTitle("Customer");
					dialogCustomerForm.open();
					setTimeout(function(){
						$("#customer-search input.jqx-input").focus();
					}, 100);
				})
			}else{
				$scope.customerid = result;
				CustomerPurchases($scope.customerid)
				.then(function(){
					var postData ="CustomerUnique="+result;
					posData.GetCustomerProfile(postData)
					.success(function(data){
						$scope.editFirstName = data.fname;
						$scope.editLastName = data.lname;
						$scope.editCompany = data.company;
						$scope.editAddress1 = data.addr1;
						$scope.editAddress2 = data.addr2;
						$scope.editPhone1 = data.p1;
						$scope.editPhone2 = data.p2;
						$scope.editPhone3 = data.p3;
						$scope.editFax = data.fax;
						$scope.editEmail = data.email;
						$scope.editWebsite = data.website;
						$scope.editCustom1 = data.cust1;
						$scope.editCustom2 = data.cust2;
						$scope.editCustom3 = data.cust3;
						$scope.editCustomerNote = data.note;
						$scope.editcity = data.city;
						$scope.editstate = data.state;
						$scope.editisland = data.county;
						$scope.editcountry = data.country;
						$scope.editzipcode = data.zip;
						SelZipcode = data.zip;
						SelCity = data.city;
						SelState = data.state;
						SelIsland = data.county;
						SelCountry = data.country;
						editdialog.setTitle("Customer ID: " + $scope.customerid + " | " + data.fname+ " "+data.lname);
					}).then(function(data){
						editdialog.open();
						setTimeout(function(){
							$("#editFirstName").focus();
						})
					});
				})	
			}
		}
		
		$scope.NewCustomer = function(){
			$("#customer-search").jqxDataTable('clearFilters');
			$scope.primary_buttons = true;
			$scope.secondary_buttons = false;
			WindowPopupNumpad('New Customer', true, [900, '95%'], [], 'add-customer');
			setTimeout(function(){
				$("#firstname").focus();
			})
		};
		
		var check_email = function(val){
			if(!val.match(/\S+@\S+\.\S+/)){
				return false;
			}
			if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
				return false;
			}
			return true;
		}
		
		$scope.FirstName = '';
		$scope.LastName = '' ;
		$scope.Company = '';
		$scope.Address1 = '';
		$scope.Address2 = '';
		$scope.Phone1 = '';
		$scope.Phone2 = '' ;
		$scope.Phone3 = '';
		$scope.Email = '';
		$scope.Fax = '';
		$scope.Website = '';
		$scope.Custom1 = '';
		$scope.Custom2 = '';
		$scope.Custom3 = '';
		$scope.CustomerNote = '';
		var selcustomer;
		
		/* Add New Customer */
		$scope.NewCustomerSave = function(){
			var postData="fname="+ $scope.FirstName;
				postData+="&lname="+ $scope.LastName;
				postData+="&company="+ $scope.Company;
				postData+="&address1="+ $scope.Address1;
				postData+="&address2="+ $scope.Address2;
				postData+="&phone1="+ $scope.Phone1;
				postData+="&phone2="+ $scope.Phone2;
				postData+="&phone3="+ $scope.Phone3;
				postData+="&fax="+ $scope.Fax;
				postData+="&email="+ $scope.Email;
				postData+="&website="+ $scope.Website;
				postData+="&custom1="+ $scope.Custom1;
				postData+="&custom2="+ $scope.Custom2;
				postData+="&custom3="+ $scope.Custom3;
				postData+="&customnote="+ $scope.CustomerNote;
				postData+="&zipcode="+ $scope.zipcode;
				postData+="&city="+ $scope.city;
				postData+="&state="+ $scope.state;
				postData+="&island="+ $scope.island;
				postData+="&country="+ $scope.country;
				
			if($scope.FirstName == ""){
				$scope.newcustomer = {
					message: 'First Name is required field.'
				}
			}else{
				if($scope.Email != ''){
					if(check_email($scope.Email)){
						posData.SaveNewCustomer(postData)
						.success(function(data){
							$("#add-customer").jqxWindow('close');
							if(data.success == true){
								newCustomerCreated = data.newcustomerId;
								posData.InstantNewSale()
								.success(function(data){
									if(data.success == true){
										$scope.newsaleid = data.NewSaleId;	
									}
								}).then(function(){														
									var postData="selcustomervalue="+data.newcustomerId;
									postData+="&selcustomerlabel="+data.fname +" "+data.lname;
									posData.TransCustomer(postData)
									.success(function(data){
										GetSelectedCustomer();
										$scope.AddCustomerWhenClose = '';
									})
									Customer_data();
								})
							}
						}).then(function(){
							$('#tab1').unblock();
							$('#tab2').unblock();
							$('#tab3').unblock();
							ClearCustomerForm();
						})
						$scope.newcustomer = {
							message: ''
						}			
					}else{
						$scope.newcustomer = {
							message: 'Please type a valid email address.'
						}
					}
				}else{
					posData.SaveNewCustomer(postData)
					.success(function(data){
						$("#add-customer").jqxWindow('close');
						if(data.success = true){
							newCustomerCreated = data.newcustomerId;
							posData.InstantNewSale()
							.success(function(data){
								if(data.success == true){
									$scope.newsaleid = data.NewSaleId;	
								}
							 }).then(function(){
								var postData="selcustomervalue="+data.newcustomerId;
								postData+="&selcustomerlabel="+data.fname +" "+data.lname;
								posData.TransCustomer(postData)
								.success(function(data){
									GetSelectedCustomer();
								})
							 })
						}
					}).then(function(){
						$('#tab1').unblock();
						$('#tab2').unblock();
						$('#tab3').unblock();
						$scope.AddCustomerWhenClose = '';
						ClearCustomerForm();
						$scope.newcustomer = {
							message: ''
						}
						Customer_data();
					})
				}
			}
		};
		
		/* Exit Add Customer Form */
		$scope.ExitNewCustomer = function(){
			$("#add-customer").jqxWindow('close');
		}
		
		/* Edit Customer */
		$scope.EditCustomer = function(){
			var result = GlobalCustomer;
			if(result == null) {
				var msg = "Please select customer first.";
				NumpadPromptAlertClose(msg)
				.then(function(){
					WindowPopupAlert('Alert', true, [220, 300], []);
				})
			}else{
				$scope.customerid = result;
				CustomerPurchases($scope.customerid)
				.then(function(){
					var postData ="CustomerUnique="+result;
					posData.GetCustomerProfile(postData)
					.success(function(data){
						$scope.editFirstName = data.fname;
						$scope.editLastName = data.lname;
						$scope.editCompany = data.company;
						$scope.editAddress1 = data.addr1;
						$scope.editAddress2 = data.addr2;
						$scope.editPhone1 = data.p1;
						$scope.editPhone2 = data.p2;
						$scope.editPhone3 = data.p3;
						$scope.editFax = data.fax;
						$scope.editEmail = data.email;
						$scope.editWebsite = data.website;
						$scope.editCustom1 = data.cust1;
						$scope.editCustom2 = data.cust2;
						$scope.editCustom3 = data.cust3;
						$scope.editCustomerNote = data.note;
						$scope.editzipcode = data.zip;
						$scope.editcity = data.city;
						$scope.editstate = data.state;
						$scope.editisland = data.county;
						$scope.editcountry = data.country;
					
						setTimeout(function(){
							$("#editFirstName").focus();
							$("#EditBtnUpdate").attr("disabled", true);
							$scope.EditCustomerWhenClose = 0;
							WindowPopupNumpad('Edit Customer' + $scope.customerid + " | " + data.fname+ " " + data.lname, true, [900, '95%'], [], 'edit-customer');
						})
					})
				})
			}
		};
		
	}])
	
})();