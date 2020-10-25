/*Global Variable*/
//var base_url = "/app/";
//var api_url =  "http://akamaipos:1337/";

var akamaipos = angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
.controller("akamaiposController",['$scope', '$compile', '$http', '$routeParams', '$q', 'posData', '$window', '$filter', '$timeout', 
function ($scope, $compile, $http, $routeParams, $q, posData, $window, $filter, $timeout) {
		
	var CategoryID = null;
	var CategoryTempDataStorage = [];
	var SubCategoryID = null;
	var SubCategoryTempDataStorage = [];
	
	var addCategoryDialog, editCategoryDialog, deleteCategoryDialog, addSubCategoryDialog, editSubCategoryDialog, deleteSubCategoryDialog;
	
	//Remove after Sub Category Done
	//$('#tabs').jqxTabs({ selectedItem: 1 }); 
	$('#tabs').on('selecting', function (event) {
		var args = event.args;
		if(args.item == 0){
			$("#table").jqxGrid('updatebounddata');
		}else if(args.item == 1){
			$("#table_subcat").jqxGrid('updatebounddata');
		}
	}); 
		
	/* Create New Category Popup */
	$scope.dialogCategoryAdd = {
		created: function(args){
			addCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 350, height: 210,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */
	
	/* Create Edit Category Popup */
	$scope.dialogCategoryEdit = {
		created: function(args){
			editCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 350, height: 210,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */
	
	/* Delete Category Popup */
	$scope.dialogCategoryDelete = {
		created: function(args){
			deleteCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 250, height: 150,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */		
	
	/* Create Sub Category Popup */
	$scope.dialogSubCategoryAdd = {
		created: function(args){
			addSubCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 350, height: 250,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */	
	
	/* Edit Sub Category Popup */
	$scope.dialogSubCategoryEdit = {
		created: function(args){
			editSubCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 350, height: 250,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */
	
	
	/* Delete Sub Category Popup */
	$scope.dialogSubCategoryDelete = {
		created: function(args){
			deleteSubCategoryDialog = args.instance;
		},
		resizable: false,
		theme: 'darkblue',
		width: 250, height: 150,
		autoOpen: false,
		isModal: true,
		showCloseButton: false
	};
	/* End */
	
		
	var LoadHeaderInfo = function(){
		var InfoDef = new $.Deferred();
		posData.GetHeaderInfo()
		.success(function(data){
			$("#receiptn").text(data.receipt_number);
			$("#station").text(data.station_name);
			$("#cashin").text(data.cashin);
			$("#store_name").text(data.store_name);
			if(data.user_name){
				$("#user_name").text(data.user_name);
			}else{
				$("#user_name").text("");
			}
			InfoDef.resolve();
		})
		return InfoDef.promise();
	};
	
	
	var RecallCategory = function(){
		posData.LoadCategory()
		.success(function(data){
			$("#add_sub_category_list").jqxComboBox({ source: data, displayMember: "MainName", valueMember: "Unique", width: '230', height: '30px'});
			$("#edit_sub_category_list").jqxComboBox({ source: data, displayMember: "MainName", valueMember: "Unique", width: '230', height: '30px'});	
		})
	}
	
	var jqxNotifications = function(element, template, content, timeclose, container){
		var notifyDef = new $.Deferred();
		setTimeout(function(){
			$("#"+element+"_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#"+container+"_container", opacity: 0.9, autoClose: true, autoCloseDelay: timeclose, template: template });
			$("#"+element+"_notificationContent").html(content);
			$("#"+element+"_jqxNotification").jqxNotification("open");
			notifyDef.resolve();
		},100);
		return notifyDef.promise();
	}
	
	
	var AddFormElements = function(){
		var AddFormElemDef = new $.Deferred();
		setTimeout(function(){
			$("#add_category_name").on('input',function(){
				$("#add_save").prop("disabled", false);
			});
			
			$("#add_save").click(function(){
				if($("#add_category_name").val() !== ''){
					var postdata="MainName="+$("#add_category_name").val();
						postdata+="&Created="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
						postdata+="&CreatedBy="+$scope.userid;
						postdata+="&status=1";
					posData.AddCategory(postdata)
					.success(function(data){
						jqxNotifications("add_category", "info", "New Category saved", 1000, "add_category");
						RecallCategory();
						setTimeout(function(){
							$('#table').jqxGrid('updatebounddata');
							clear_add_form();
							addCategoryDialog.close();
						},1000)
					})
				}else{
					jqxNotifications("add_category_empty", "error", "Category Name is required", 1000, "add_category");
				}
			});
			
			$("#add_cancel").click(function(){
				var save_is_disabled = $("#add_save").is(":disabled");
				if(save_is_disabled){
					clear_add_form();
					addCategoryDialog.close();
				}else{
					$("#add_primary").hide();
					$("#add_save_message").show();
				}
			})
			
			$("#add_yes").click(function(){
				if($("#add_category_name").val() !== ''){
					var postdata="MainName="+$("#add_category_name").val();
						postdata+="&Created="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
						postdata+="&CreatedBy="+$scope.userid;
						postdata+="&status=1";
					posData.AddCategory(postdata)
					.success(function(data){
						console.log("Logs: "+data);
						jqxNotifications("add_category", "info", "New Category saved", 1000, "add_category");
						RecallCategory();
						setTimeout(function(){
							$('#table').jqxGrid('updatebounddata');
							clear_add_form();
							addCategoryDialog.close();
						},1000)
					})
				}else{
					jqxNotifications("add_category_empty", "error", "Category Name is required", 1000, "add_category");
				}
			})
			
			$("#add_no").click(function(){
				clear_add_form();
				addCategoryDialog.close();
			})
			
			$("#add_message_cancel").click(function(){
				$("#add_primary").show();
				$("#add_save_message").hide();
			})
			
			/*Sub Category*/
			$("#add_sub_category_list").jqxComboBox({placeHolder: "Select Category" });
			$("#add_sub_category_list").on('keydown', function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$("#add_sub_category_list").jqxComboBox('clearSelection');
					setTimeout(function(){
						$("#add_sub_category_list").val(null);
					}, 1000);
				}
			})
				
			$("#add_sub_category_name").on('input',function(){
				$("#add_subcat_save").prop("disabled", false);
			});
			
			$("#add_sub_category_list").on('select', function(){
				$("#add_subcat_save").prop("disabled", false);
			})
			
			$("#add_subcat_save").click(function(){
				var process1 = false;
				if( $("#add_sub_category_name").val() !== ''){
					process1 = true;
				}else{
					jqxNotifications("add_subcat_empty", "error", "Sub Category Name is required", 1000, "add_subcat");
					process1 = false;
				}
				
				var process2 = false;
				if( $("#add_sub_category_list").val() !== '' ){
					process2 = true;
				}else{
					jqxNotifications("add_subcat_empty", "error", "Category Name is required", 1000, "add_subcat");
					process2 = false;
				}
				
				if(process1 == true && process2 == true){
					var postdata="Name="+$("#add_sub_category_name").val();
						postdata+="&CategoryMainUnique="+$("#add_sub_category_list").val();
						postdata+="&Created="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
						postdata+="&CreatedBy="+$scope.userid;
						postdata+="&Status=1";
					posData.AddSubCategory(postdata)
					.success(function(data){
						jqxNotifications("add_subcat", "info", "New Sub Category saved", 1000, "add_subcat");
						setTimeout(function(){
							$('#table_subcat').jqxGrid('updatebounddata');
							clear_add_subcat_form();
							addSubCategoryDialog.close();
						},1000);
					})
				}
			})
			
			$("#add_subcat_cancel").click(function(){
				var add_subcat_btn = $("#add_subcat_save").is(":disabled");
				if(add_subcat_btn){
					clear_add_subcat_form();
					addSubCategoryDialog.close();
				}else{
					$("#add_subcat_primary").hide();
					$("#add_subcat_save_message").show();
				}
			})
			
			$("#add_subcat_message_cancel").click(function(){
				$("#add_subcat_primary").show();
				$("#add_subcat_save_message").hide();
			})
			
			$("#add_subcat_no").click(function(){
				clear_add_subcat_form();
				addSubCategoryDialog.close();
			})
			
			$("#add_subcat_yes").click(function(){
				var process1 = false;
				if( $("#add_sub_category_name").val() !== ''){
					process1 = true;
				}else{
					jqxNotifications("add_subcat", "error", "Sub Category Name is required", 1000, "add_subcat");
					process1 = false;
				}
				
				var process2 = false;
				if( $("#add_sub_category_list").val() !== '' ){
					process2 = true;
				}else{
					jqxNotifications("add_subcat", "error", "Category Name is required", 1000, "add_subcat");
					process2 = false;
				}
				
				if(process1 == true && process2 == true){
					var postdata="Name="+$("#add_sub_category_name").val();
						postdata+="&CategoryMainUnique="+$("#add_sub_category_list").val();
						postdata+="&Created="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
						postdata+="&CreatedBy="+$scope.userid;
						postdata+="&Status=1";
					posData.AddSubCategory(postdata)
					.success(function(data){
						jqxNotifications("add_subcat", "info", "New Sub Category saved", 1000, "add_subcat");
						setTimeout(function(){
							$('#table_subcat').jqxGrid('updatebounddata');
							clear_add_subcat_form();
							addSubCategoryDialog.close();
						},1000);
					})
				}
			})
		
			AddFormElemDef.resolve();
		},100);
		return AddFormElemDef.promise();
	}
	
	var EditFormElements = function(){
		var EditFormElemDef = new $.Deferred();
		setTimeout(function(){
			$("#edit_category_name").on('input',function(){
				$("#edit_save").prop("disabled", false);
			});
			
			$("#edit_save").click(function(){
				if($("#edit_category_name").val() !== ''){
					var postdata="MainName="+$("#edit_category_name").val();
						postdata+="&UpdatedBy="+$scope.userid;
						postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
					posData.UpdateCategory(CategoryID, postdata)
					.success(function(data){
						CategoryTempDataStorage = [];
						CategoryTempDataStorage.push(CategoryID, $("#edit_category_name").val());
						jqxNotifications("edit_category", "info", "Category updated", 1000, "edit_category");
						setTimeout(function(){
							$('#table').jqxGrid('updatebounddata');
							RecallCategory();
							$('#table').jqxGrid('selectrow', -1);
							$("#table").jqxDataTable('unselectRow', 0);
							$("#edit_save").prop("disabled",true);
						},1000)
					})
				}else{
					jqxNotifications("edit_category_empty", "error", "Category Name is required", 1000, "edit_category");
				}
			});
			
			$("#edit_cancel").click(function(){
				var save_is_disabled = $("#edit_save").is(":disabled");
				if(save_is_disabled){
					clear_edit_form();
					editCategoryDialog.close();
				}else{
					$("#edit_primary").hide();
					$("#edit_save_message").show();
				}
			});
			
			$("#edit_yes").click(function(){
				if($("#edit_category_name").val() !== ''){
					var postdata="MainName="+$("#edit_category_name").val();
						postdata+="&UpdatedBy="+$scope.userid;
						postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
					posData.UpdateCategory(CategoryID, postdata)
					.success(function(data){
						CategoryTempDataStorage = [];
						CategoryTempDataStorage.push(CategoryID, $("#edit_category_name").val());
						jqxNotifications("edit_category", "info", "Category updated", 1000, "edit_category");
						setTimeout(function(){
							$('#table').jqxGrid('updatebounddata');
							RecallCategory();
							$('#table').jqxGrid('selectrow', -1);
							$("#table").jqxDataTable('unselectRow', 0);
							$("#edit_save").prop("disabled",true);
							clear_edit_form();
							editCategoryDialog.close();
						},1000)
					})
				}else{
					jqxNotifications("edit_category_empty", "error", "Category Name is required", 1000, "edit_category");
				}
			});
			
			$("#edit_no").click(function(){
				CategoryTempDataStorage.push(CategoryID, $("#edit_category_name").val());
				clear_edit_form();
				editCategoryDialog.close();
			});
			
			$("#edit_message_cancel").click(function(){
				$("#edit_primary").show();
				$("#edit_save_message").hide();
				$("#edit_category_name").focus();
			});
			
			$("#edit_delete").click(function(){
				$("#delete_buttons").show();
				$("#edit_primary").hide();
				$("#edit_save_message").hide();
			});
			
			$("#delete_yes").click(function(){
				var postdata="status=0";
					postdata+="&UpdatedBy="+$scope.userid;
					postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
				posData.UpdateCategory(CategoryID, postdata)
				.success(function(data){
					jqxNotifications("delete_category", "info", "Category deleted", 1000, "edit_category");
					setTimeout(function(){
						$('#table').jqxGrid('updatebounddata');
						RecallCategory();
						$('#table').jqxGrid('selectrow', -1);
						$("#table").jqxDataTable('unselectRow', 0);
						clear_edit_form();
						editCategoryDialog.close();
					},1000);
				})
			});
			
			$("#delete_no").click(function(){
				$("#edit_primary").show();
				$("#edit_save_message").hide();
				$("#delete_buttons").hide();
			})
			
			$("#delete_icon_yes").click(function(){
				var postdata="status=0";
					postdata+="&UpdatedBy="+$scope.userid;
					postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
				posData.UpdateCategory(CategoryID, postdata)
				.success(function(data){
					setTimeout(function(){
						$('#table').jqxGrid('updatebounddata');
						RecallCategory();
						$('#table').jqxGrid('selectrow', -1);
						$("#table").jqxDataTable('unselectRow', 0);
						deleteCategoryDialog.close();
					},500);
				})
			})
			
			$("#delete_icon_no").click(function(){
				deleteCategoryDialog.close();
			})
			
			/*Sub Edit*/
			$("#edit_sub_category_name").on('input', function(){
				$("#edit_subcat_save").prop("disabled", false);
			})
			
			$("#edit_sub_category_list").on('select', function(){
				$("#edit_subcat_save").prop("disabled", false);
			})
			
			$("#edit_sub_category_list").jqxComboBox({placeHolder: "Select Category"});
			$("#edit_sub_category_list").on('keydown', function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$("#edit_sub_category_list").jqxComboBox('clearSelection');
					setTimeout(function(){
						$("#edit_sub_category_list").val(null);
					}, 100);
				}
			})
			
			$("#edit_subcat_save").click(function(){
				if($("#edit_sub_category_name").val() !== ''){
					var postdata="Name="+$("#edit_sub_category_name").val();
						postdata+="&CategoryMainUnique="+$("#edit_sub_category_list").val();
						postdata+="&UpdatedBy="+$scope.userid;
						postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
					posData.UpdateSubCategory(SubCategoryID, postdata)
					.success(function(data){
						SubCategoryTempDataStorage = [];
						SubCategoryTempDataStorage.push(SubCategoryID, $("#edit_sub_category_name").val(), $("edit_sub_category_list").val());
						jqxNotifications("edit_subcat", "info", "Category updated", 1000, "edit_subcat");
						
						LoadSubCategory()
						.then(function(){
							$('#table_subcat').jqxGrid('clearselection');
							setTimeout(function(){
								$("#edit_subcat_save").attr("disabled", "disabled");
							},100);
						})
						
						//$('#table_subcat').jqxGrid('clearselection');
						//$('#table_subcat').jqxGrid('selectrow', -1);
						//$("#table_subcat").jqxDataTable('unselectRow', 0);
						setTimeout(function(){
							$("#edit_subcat_save").attr("disabled", "disabled");
						},100);
					})
				}else{
					jqxNotifications("edit_subcat_empty", "error", "Category Name is required", 1000, "edit_subcat");
				}
			});
			
			$("#edit_subcat_cancel").click(function(){
				var subcat_btn_edit = $("#edit_subcat_save").is(":disabled");
				if(subcat_btn_edit){
					clear_edit_subcat_form();
					editSubCategoryDialog.close();
				}else{
					$("#edit_subcat_primary").hide();
					$("#edit_subcat_save_message").show();
					$("#subcat_delete_buttons").hide();
				}
			});
			
			$("#edit_subcat_message_cancel").click(function(){
				$("#edit_subcat_primary").show();
				$("#edit_subcat_save_message").hide();
				$("#subcat_delete_buttons").hide();
			})
			
			$("#edit_subcat_no").click(function(){
				clear_edit_subcat_form();
				editSubCategoryDialog.close();
			})
			
			$("#edit_subcat_yes").click(function(){
				if($("#edit_sub_category_name").val() !== ''){
					var postdata="Name="+$("#edit_sub_category_name").val();
						postdata+="&CategoryMainUnique="+$("#edit_sub_category_list").val();
						postdata+="&UpdatedBy="+$scope.userid;
						postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
					posData.UpdateSubCategory(SubCategoryID, postdata)
					.success(function(data){
						SubCategoryTempDataStorage = [];
						SubCategoryTempDataStorage.push(SubCategoryID, $("#edit_sub_category_name").val(), $("edit_sub_category_list").val());
						jqxNotifications("edit_subcat", "info", "Category updated", 1000, "edit_subcat");
						setTimeout(function(){
							LoadSubCategory();
							$('#table_subcat').jqxGrid('clearselection');
							$('#table_subcat').jqxGrid('selectrow', -1);
							$("#table_subcat").jqxDataTable('unselectRow', 0);
							$("#edit_subcat_save").prop("disabled",true);
							clear_edit_subcat_form();
							editSubCategoryDialog.close();
						},1000)
					})
				}else{
					jqxNotifications("edit_subcat_empty", "error", "Category Name is required", 1000, "edit_subcat");
				}
			})
			
			$("#edit_subcat_delete").click(function(){
				$("#edit_subcat_primary").hide();
				$("#edit_subcat_save_message").hide();
				$("#subcat_delete_buttons").show();
			})
			
			$("#delete_subcat_no").click(function(){
				$("#edit_subcat_primary").show();
				$("#edit_subcat_save_message").hide();
				$("#subcat_delete_buttons").hide();
			})
			
			$("#delete_subcat_yes").click(function(){
				var postdata="Status=0";
					postdata+="&UpdatedBy="+$scope.userid;
					postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
				posData.UpdateSubCategory(SubCategoryID, postdata)
				.success(function(data){
					jqxNotifications("delete_subcat", "info", "Category deleted", 1000, "edit_subcat");
					setTimeout(function(){
						$('#table_subcat').jqxGrid('updatebounddata');
						$('#table_subcat').jqxGrid('selectrow', -1);
						$("#table_subcat").jqxDataTable('unselectRow', 0);
						clear_edit_subcat_form();
						editSubCategoryDialog.close();
					},1000);
				})
			})
			
			$("#delete_subcat_icon_yes").click(function(){
				var postdata="Status=0";
					postdata+="&UpdatedBy="+$scope.userid;
					postdata+="&Updated="+$filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
				posData.UpdateSubCategory(SubCategoryID, postdata)
				.success(function(data){
					setTimeout(function(){
						$('#table_subcat').jqxGrid('updatebounddata');
						$('#table_subcat').jqxGrid('selectrow', -1);
						$("#table_subcat").jqxDataTable('unselectRow', 0);
						deleteSubCategoryDialog.close();
					},100);
				})
			})
			
			$("#delete_subcat_icon_no").click(function(){
				deleteSubCategoryDialog.close();
			})
			
			EditFormElemDef.resolve();
		},100)
		return EditFormElemDef.promise();
	}
	
	var CategoryPreload = function(){
		var catpreload_def = new $.Deferred();
		setTimeout(function(){
			$("#table").jqxGrid({
				width: "99.9%",
				height: 500,
				editable: false,
				pageable: true,
				pagesize: 20,
				pagermode: 'default',
				sortable: true,
				filterable: true,
				filtermode: 'excel',
				showtoolbar: true,
				altRows: true,
				theme: 'ui-richmond',
				columnsautoresize: true,
				renderToolbar: function(toolBar)
				{
					var toTheme = function (className) {
						if (theme == "") return className;
						return className + " " + className + "-" + theme;
					};
					
					/*Search */
					var me = this;
                    var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search Category: </span>");
                    var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;' />");
					var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%;'></div>");
						
					container.append(span);
                    container.append(input);
                    if (theme != "") {
                        input.addClass('jqx-widget-content-' + theme);
                        input.addClass('jqx-rc-all-' + theme);
                    }
                    var oldVal = "";
                    input.on('keydown', function (event) {
                        if (input.val().length >= 2) {
                            if (me.timer) {
                                clearTimeout(me.timer);
                            }
                            if (oldVal != input.val()) {
                                me.timer = setTimeout(function () {
                                    $("#table").jqxGrid('updatebounddata');
                                }, 1000);
                                oldVal = input.val();
                            }
                        }
                        else {
                            $("#table").jqxGrid('updatebounddata');
                        }
                    });
				
					var buttonTemplate = "<div style='float: left; padding: 3px; margin: 2px;'><div style='margin: 4px; width: 16px; height: 16px;'></div></div>";
					var addButton = $(buttonTemplate);
					var editButton = $(buttonTemplate);
					var deleteButton = $(buttonTemplate);
					container.append(addButton);
					container.append(editButton);
					container.append(deleteButton);
					toolBar.append(container);
					addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
					addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
					addButton.jqxTooltip({ position: 'bottom', content: "Add"});
					editButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
					editButton.find('div:first').addClass(toTheme('jqx-icon-edit'));
					editButton.jqxTooltip({ position: 'bottom', content: "Edit"});
					deleteButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
					deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
					deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
					var updateButtons = function (action) {
						switch (action) {
							case "Select":
								addButton.jqxButton({ disabled: false });
								deleteButton.jqxButton({ disabled: false });
								editButton.jqxButton({ disabled: false });
								break;
							case "Unselect":
								addButton.jqxButton({ disabled: false });
								deleteButton.jqxButton({ disabled: true });
								editButton.jqxButton({ disabled: true });
								break;
							case "Edit":
								addButton.jqxButton({ disabled: true });
								deleteButton.jqxButton({ disabled: true });
								editButton.jqxButton({ disabled: true });
								break;
							case "End Edit":
								addButton.jqxButton({ disabled: false });
								deleteButton.jqxButton({ disabled: false });
								editButton.jqxButton({ disabled: false });
								break;	
						}
					};
					
					$("#table").on('rowselect', function (event) {
						CategoryTempDataStorage = [];
						var args = event.args;
						var rowBoundIndex = args.rowindex;
						var row = args.row;
						if(row){
							CategoryID = row.Unique;
							editCategoryDialog.setTitle("Edit Category | ID: "+row.Unique+" "+row.MainName);
							deleteCategoryDialog.setTitle("Delete Category | ID: "+row.Unique+" "+row.MainName);
							$("#edit_category_name").val(row.MainName);
							$("#edit_delete_message").text("Please confirm delete of Category "+row.Unique+" "+row.MainName+" ?");
							$("#edit_delete_icon_message").text("Please confirm delete of Category "+row.Unique+" "+row.MainName+" ?");
							CategoryTempDataStorage.push(row.Unique, row.MainName);
							updateButtons('Select');
						}else{
							updateButtons('Unselect');
						}
					});
					
					$('#table').on('rowdoubleclick', function (event) {
						var args = event.args;
						var boundIndex = args.rowindex;
						var visibleIndex = args.visibleindex;
						var rightclick = args.rightclick;
						var ev = args.originalEvent;
						SetFocus("edit_category_name", 100);
						if($("#edit_category_name").val() == ''){
							$("#edit_category_name").val(CategoryTempDataStorage[1]);
						}
						editCategoryDialog.open();
					})
					
					$("#table").on('rowUnselect', function (event) {
						updateButtons('Unselect');
					});	
					
					$("#table").on('rowEndEdit', function (event) {
						updateButtons('End Edit');
					});
					
					$("#table").on('rowBeginEdit', function (event) {
						updateButtons('Edit');
					});			 
					
					addButton.click(function(event){
						if (!addButton.jqxButton('disabled')){
							SetFocus("add_category_name", 100);
							addCategoryDialog.setTitle("Add Category");
							addCategoryDialog.open();
						}
					});
					
					editButton.click(function(){
						if (!editButton.jqxButton('disabled')){
							if($("#edit_category_name").val() == ''){
								$("#edit_category_name").val(CategoryTempDataStorage[1]);
							}
							SetFocus("edit_category_name", 100);
							editCategoryDialog.open();
						}
					});
					
					deleteButton.click(function(){
						if (!deleteButton.jqxButton('disabled')){
							deleteCategoryDialog.open();
						}
					});
				},
				source: {
					datatype: "json",
					datafields: [
						{name: 'Unique', type: 'int'},
						{name: 'MainName', type: 'string'},
					],
					localdata: []
				},
				columns: [
					{text: 'ID', datafield: 'Unique'},
					{text: 'Category Name', datafield: 'MainName'}
				]
			})
			
			catpreload_def.resolve();
		}, 100);
		return catpreload_def.promise();	
	}
	
	var LoadCategory = function(){
		var LoadCatDef = new $.Deferred();
		posData.LoadCategory()
		.success(function(data){
			var source = {
				datatype: "json",
				datafields: [
					{name: 'Unique', type: 'int'},
					{name: 'MainName', type: 'string'},
				],
				async: false,
				url: api_url+"category/list",
				data: {
                    featureClass: "P",
                    style: "full",
                    maxRows: 20,
                    username: "jqwidgets"
                }
			}
			var dataAdapter = new $.jqx.dataAdapter(source,
            {
				formatData: function (data) {
					data.MainName_startsWith = $("#searchField").val();
					return data;
				}
            });
			$("#table").jqxGrid({
				source: dataAdapter
			})
			
			$("#add_sub_category_list").jqxComboBox({ source: data, displayMember: "MainName", valueMember: "Unique", width: '230', height: '30px'});
			$("#edit_sub_category_list").jqxComboBox({ source: data, displayMember: "MainName", valueMember: "Unique", width: '230', height: '30px'});
			LoadCatDef.resolve();
		})
		return LoadCatDef.promise();
	}
	
	var SubCategoryPreload = function(){		
		var subcatpreload_def = new $.Deferred();
		setTimeout(function(){
			$("#table_subcat").jqxGrid({
				width: "99.9%",
				height: 500,
				editable: false,
				pageable: true,
				pagesize: 20,
				pagermode: 'default',
				sortable: true,
				filterable: true,
				filtermode: 'excel',
				showtoolbar: true,
				altRows: true,
				theme: 'ui-richmond',
				columnsautoresize: true,
				renderToolbar: function(toolBar)
				{
					var toTheme = function (className) {
						if (theme == "") return className;
						return className + " " + className + "-" + theme;
					};
					
					/*Search */
					var me = this;
                    var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search Category: </span>");
                    var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='subcat_searchField' type='text' style='height: 23px; float: left; width: 223px;' />");
					var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%;'></div>");
						
					container.append(span);
                    container.append(input);
                    if (theme != "") {
                        input.addClass('jqx-widget-content-' + theme);
                        input.addClass('jqx-rc-all-' + theme);
                    }
                    var oldVal = "";
                    input.on('keydown', function (event) {
                        if (input.val().length >= 2) {
                            if (me.timer) {
                                clearTimeout(me.timer);
                            }
                            if (oldVal != input.val()) {
                                me.timer = setTimeout(function () {
                                    $("#table_subcat").jqxGrid('updatebounddata');
                                }, 1000);
                                oldVal = input.val();
                            }
                        }
                        else {
                            $("#table_subcat").jqxGrid('updatebounddata');
                        }
                    });
					
					var buttonTemplate = "<div style='float: left; padding: 3px; margin: 2px;'><div style='margin: 4px; width: 16px; height: 16px;'></div></div>";
					var addButton = $(buttonTemplate);
					var editButton = $(buttonTemplate);
					var deleteButton = $(buttonTemplate);
					container.append(addButton);
					container.append(editButton);
					container.append(deleteButton);
					toolBar.append(container);
					addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
					addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
					addButton.jqxTooltip({ position: 'bottom', content: "Add"});
					editButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
					editButton.find('div:first').addClass(toTheme('jqx-icon-edit'));
					editButton.jqxTooltip({ position: 'bottom', content: "Edit"});
					deleteButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
					deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
					deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
					var updateButtons = function (action) {
						switch (action) {
							case "Select":
								addButton.jqxButton({ disabled: false });
								editButton.jqxButton({ disabled: false });
								deleteButton.jqxButton({ disabled: false });
								break;
						}
					};
					
					$('#table_subcat').on('rowdoubleclick', function (event) {
						var args = event.args;
						var boundIndex = args.rowindex;
						var visibleIndex = args.visibleindex;
						var rightclick = args.rightclick;
						var ev = args.originalEvent;
						SetFocus("add_category_name", 100);
						if($("#edit_sub_category_name").val() == ''){
							$("#edit_sub_category_name").val(CategoryTempDataStorage[1]);
						}
						setTimeout(function(){
							$("#edit_subcat_save").prop("disabled", true);
						},100);
						SetFocus("edit_sub_category_name", 100);
						editSubCategoryDialog.open();
					})			
					
					$("#table_subcat").on('rowselect', function (event) {
						CategoryTempDataStorage = [];
						var args = event.args;
						var rowBoundIndex = args.rowindex;
						var row = args.row;
						editSubCategoryDialog.setTitle("Edit ID: "+row.Unique+" "+row.Name);
						deleteSubCategoryDialog.setTitle("Delete | ID: "+row.Unique+" "+row.Name);
						SubCategoryID = row.Unique;
						$("#edit_sub_category_name").val(row.Name);
						$("#edit_sub_category_list").jqxComboBox('selectItem', row.CatMainUnique);
						$("#edit_subcat_delete_message").text("Please confirm delete of Category "+row.Unique+" "+row.Name+" ?");
						$("#edit_subcat_delete_icon_message").text("Please confirm delete of Category "+row.Unique+" "+row.Name+" ?");
						SubCategoryTempDataStorage.push(row.Unique, row.Name, row.CatMainUnique);
						updateButtons('Select');
					});
					
					addButton.click(function(event){
						if (!addButton.jqxButton('disabled')){
							SetFocus("add_sub_category_name", 100);
							addSubCategoryDialog.setTitle('Add Sub Category');
							addSubCategoryDialog.open();
						}
					});
					editButton.click(function(){
						if (!editButton.jqxButton('disabled')){
							if($("#edit_sub_category_name").val() == ''){
								$("#edit_sub_category_name").val(SubCategoryTempDataStorage[1]);
								$("#edit_sub_category_list").jqxComboBox('selectItem', SubCategoryTempDataStorage[2]);
							}
							setTimeout(function(){
								$("#edit_subcat_save").prop("disabled", true);
							},100);
							SetFocus("edit_sub_category_name", 100);
							editSubCategoryDialog.open();
						}
					});
					deleteButton.click(function(){
						if (!deleteButton.jqxButton('disabled')){
							deleteSubCategoryDialog.open();
						}
					});
				},
				source: {
					datatype: "json",
					datafields: [
						{name: 'Unique', type: 'int'},
						{name: 'Name', type: 'string'},
						{name: 'Category', map: 'CategoryMainUnique>MainName', type: 'string'},
						{name: 'CatMainUnique', map: 'CategoryMainUnique>Unique', type: 'integer'},
					],
					localdata: []
				},
				columns: [
					{text: 'ID', datafield: 'Unique'},
					{text: 'Sub Category', datafield: 'Name'},
					{text: 'Category', datafield: 'Category'}
				]
			})
			
			subcatpreload_def.resolve();
		}, 100);
		return subcatpreload_def.promise();
	}
	
	var LoadSubCategory = function(){
		var LoadSubCatDef = new $.Deferred();
		posData.LoadSubCategory()
		.success(function(data){
			var source = {
				datatype: "json",
				datafields: [
					{name: 'Unique', type: 'int'},
					{name: 'Name', type: 'string'},
					{name: 'Category', map: 'CategoryMainUnique>MainName', type: 'string'},
					{name: 'CatMainUnique', map: 'CategoryMainUnique>Unique', type: 'integer'},
				],
				async: false,
				url: api_url+"sub/category/list",
				data: {
                    featureClass: "P",
                    style: "full",
                    maxRows: 20,
                    username: "jqwidgets"
                }
			}
			var dataAdapter = new $.jqx.dataAdapter(source,
            {
				formatData: function (data) {
					data.MainName_startsWith = $("#subcat_searchField").val();
					return data;
				}
            });
			$("#table_subcat").jqxGrid({
				source: dataAdapter
			})
			LoadSubCatDef.resolve();
		})
		return LoadSubCatDef.promise();
	}
	
	
	/* All Functions with Deferred */
	CategoryPreload()
	.then(function(){	
		SubCategoryPreload()
		.then(function(){
			LoadHeaderInfo()
			.then(function(){
				LoadCategory()
				.then(function(){
					LoadSubCategory()
					.then(function(){
						AddFormElements()
						.then(function(){
							EditFormElements()
							.then(function(){
								
							})
						})
					})
				})	
			})
		})	
	})
	/* End */
	
	var clear_add_form = function(){
		setTimeout(function(){
			$("#add_primary").show();
			$("#add_save_message").hide();
			$("#add_category_name").val('');
			$("#add_save").prop("disabled", true);
			$("#searchField").focus();
	   	},100);	
	}
	
	var clear_edit_form = function(){
		setTimeout(function(){
			$("#edit_primary").show();
			$("#edit_save_message").hide();
			$("#delete_buttons").hide();
			$("#edit_delete_message").text('');
			$("#edit_category_name").val('');
			$("#edit_save").prop("disabled", true);
			$("#searchField").focus();
		},100);
	}
	
	var clear_add_subcat_form = function(){
		setTimeout(function(){
			$("#add_subcat_primary").show();
			$("#add_subcat_save_message").hide();
			$("#add_sub_category_name").val('');
			$("#add_subcat_save").prop("disabled", true);
			$("#add_sub_category_list").jqxComboBox('clearSelection');
		},100);
	}
	
	var clear_edit_subcat_form = function(){
		setTimeout(function(){
			$("#edit_subcat_primary").show();
			$("#edit_subcat_save_message").hide();
			$("#subcat_delete_buttons").hide();
			$("#edit_sub_category_name").val('');
			$("#edit_subcat_save").prop("disabled", true);
			$("#edit_sub_category_list").jqxComboBox('clearSelection');
		},100)
	}
	
	var SetFocus = function(elementID, time){
		setTimeout(function(){
			$.fn.focusTextToEnd = function(){
				this.focus();
				var $thisVal = this.val();
				this.val('').val($thisVal);
				return this;
			}
			$("#"+elementID).focusTextToEnd();	
		},time)
	}
	
	//############################################################### Sub Category ##############################################################################//
	
	
	
}])

akamaipos.directive('addCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/category/add/form'
	}
})
				
akamaipos.directive('editCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/category/edit/form'
	}
})

akamaipos.directive('deleteCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/category/delete/form'
	}
})

akamaipos.directive('addSubCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/sub/category/add/form'
	}
})

akamaipos.directive('editSubCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/sub/category/edit/form'
	}
})

akamaipos.directive('deleteSubCategory', function(){
	return {
		restrict: 'E',
		templateUrl: base_url + 'backoffice/sub/category/delete/form'
	}
})