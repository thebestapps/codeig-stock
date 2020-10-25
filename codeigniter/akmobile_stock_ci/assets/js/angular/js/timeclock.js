//below now loaded in view file and uses code igniter global constants
//var base_url = "/app/";
//var api_url = "http://ak1.akamaipos.com:1337/";
//var api_url =  "http://akamaipos:1337/"; //Commented by HD 01/11/2016

angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize', 'time'])
    .controller("akamaiposController",['$scope', '$compile', '$http', '$routeParams', '$q', 'posData', '$window', '$filter', '$timeout', function ($scope, $compile, $http, $routeParams, $q, posData, $window, $filter, $timeout) {
        /* Global Variable */
        /* Get Header information such like;
         *  Receipt Number, Station Name, Location Name and Cashier Name.
        */
       var EditTimeClockdialog;
       var ChangeDetector;
       var DeleteTimeClockdialog;
       var checkedItem;
	   var location_label = '';

       $scope.Primary = true;
	   $scope.Secondary = false;
	   $scope.Tertiary = false;

       $scope.adduser = {
           unique: '',
           name: ''
       };

       $scope.search = {
            user: ''
       };

	   $("a.DonwloadTimeSheet").on("click", function() {
			var $preparingFileModal = $("#preparing-file-modal");
			$preparingFileModal.dialog({ modal: true });
			$.fileDownload($(this).attr('href'), {
				successCallback: function(url) {
					$preparingFileModal.dialog('close');
				},
				failCallback: function(responseHtml, url) {
					$preparingFileModal.dialog('close');
					$("#error-modal").dialog({ modal: true });
				}
			});
			return false; //this is critical to stop the click event which will trigger a normal file download!
		});
	   
	   
        $scope.date = {
            rangefrom: $filter('date')(new Date(), 'MM/dd/yyyy'),
            rangeto: $filter('date')(new Date(), 'MM/dd/yyyy')
        };

        $scope.add_date = {
            in: $filter('date')(new Date(), 'MM/dd/yyyy'),
        };
		
        $scope.edit_date = {
            in: $filter('date')(new Date(), 'MM/dd/yyyy'),
        };

        $scope.add_time = {
            in: $filter('date')(new Date(), 'hh:mm tt'),
            out: $filter('date')(new Date(), 'hh:mm tt')
        };
        $scope.edit_time = {
            in: $filter('date')(new Date(), 'hh:mm tt'),
            out: $filter('date')(new Date(), 'hh:mm tt')
        };


        $scope.datefromstring = 'MM/dd/yyyy';
        $scope.datetostring = 'MM/dd/yyyy';
		
        /* Edit TimeClock Form */
        $scope.dialogEditTimeClockSettings = {
            created: function(args){
                EditTimeClockdialog = args.instance;
            },
            resizable: false,
            width: 360, height: 460,
            autoOpen: false,
            theme: 'darkblue',
            isModal: true,
            showCloseButton: false,
            draggable: false
        };
        /* End */

        /* Add TimeClock Form */
        $scope.dialogAddTimeClockSettings = {
            created: function(args){
                AddTimeClockdialog = args.instance;
            },
            resizable: false,
            width: 360, height: 460,
            autoOpen: false,
            theme: 'darkblue',
            isModal: true,
            showCloseButton: false,
            draggable: false
        };
        /* End */

        /* Delete TimeClock Form */
        $scope.DeleteTimeClockSettings = {
            created: function(args){
                DeleteTimeClockdialog = args.instance;
            },
            resizable: false,
            width: 280, height: 130,
            autoOpen: false,
            theme: 'darkblue',
            isModal: true,
            showCloseButton: false,
            draggable: false
        };
        /* End */

        var LoadHeaderInfo = function(){
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
            })
        };
        /* End */

        var DateInput = function(){
            $scope.FromdateInputSettings = {
                width: 150,
                height: 30
            };
            $scope.TodateInputSettings = {
                width: 150,
                height: 30
            }
        };

        var TimeInput = function(){
            $scope.TimeInSettings = {
                width: 150,
                height: 30
            };
			$scope.EditTimeInSettings = {
                width: 150,
                height: 30
            };
			
            $scope.TimeOutSettings = {
                width: 150,
                height: 30
            }
			$scope.EditTimeOutSettings = {
                width: 150,
                height: 30
            }
        };

        var AllUserSource = {
            datatype: 'json',
            datafields: [
                { name: "Unique"},
                { name: "UserName"}
            ],
            url: ''
        };

        var dataAdapter = new $.jqx.dataAdapter(AllUserSource);
        $scope.AddUserDropDown = { selectedIndex: 0, source: dataAdapter, displayMember: "UserName", valueMember: "Unique", width: 200, height: 25 };

        var Users = function(){
            $http({
                method: 'get',
                url: api_url+'users'
            }).success(function (data, status) {
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'UserName'}
                    ],
                    localdata: data,
                    async: false
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $scope.AddUserDropDown = { source: dataAdapter, displayMember: "UserName", valueMember: "Unique", width: 150, height: 30 };
                $scope.selectHandler = function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        if (item) {
                            $scope.adduser = {
                                unique: item.value,
                                name: item.label
                            }
                        }
                    }
                };
            }).then(function(){
				$("#username").on('select', function(event){
					$("#add_save_timeclock").prop("disabled", false);
				});
				
				$("#username").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#username").jqxComboBox('clearSelection');
					}
				})
				Stores();		
			})
        };

        var source = {
            datatype: "json",
            datafields: [
                { name: 'Unique' },
                { name: 'LocationName'}
            ],
            url: ''
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // Create a ngxComboBox
        $scope.dropDownListInstance = {};
        $scope.checkedItems = "";
        $scope.eventData = "";
        $scope.comboBoxSettings = { source: dataAdapter, displayMember: "Unique", valueMember: "LocationName", width: 150, height: 25 };
        $scope.EditLocationInDropDown = { selectedIndex: 0, source: dataAdapter, displayMember: "Unique", valueMember: "LocationName", width: 150, height: 25 };
        $scope.EditLocationOutDropDown = { selectedIndex: 0, source: dataAdapter, displayMember: "Unique", valueMember: "LocationName", width: 150, height: 25 };
        $scope.AddLocationInDropDown = { selectedIndex: 0, source: dataAdapter, displayMember: "Unique", valueMember: "LocationName", width: 150, height: 25 };
        $scope.AddLocationOutDropDown = { selectedIndex: 0, source: dataAdapter, displayMember: "Unique", valueMember: "LocationName", width: 150, height: 25 };
	
		var sortByKey = function(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}
		
        var Stores = function(){
            $http({
                method: 'get',
                url: api_url+'stores'
            }).success(function (data) {
				var DistributeSource = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'LocationName'}
                    ],
                    localdata: data
                };
				
				$scope.AddLocationInDropDown = { source: DistributeSource, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 25,
                    created: function (args) {
                        var instance = args.instance;
                        $scope.dropDownListInstance = instance;
                    }
                };

                $scope.AddLocationOutDropDown = { source: DistributeSource, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 25,
                    created: function (args) {
                        var instance = args.instance;
                        $scope.dropDownListInstance = instance;
                    }
                };

                // Edit Form Location In
                $scope.EditLocationInDropDown = { source: DistributeSource, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 30,
                    created: function (args) {
                        var instance = args.instance;
                        $scope.dropDownListInstance = instance;
                    }
                };
                // Edit Form Location Out
                $scope.EditLocationOutDropDown = { source: DistributeSource, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 30,
                    created: function (args) {
                        var instance = args.instance;
                        $scope.dropDownListInstance = instance;
                    }
                };
				
				
				$("#username").jqxComboBox({placeHolder: "Select User" });
				$("#add_location_in").jqxComboBox({placeHolder: "Select Location"});
				$("#add_location_out").jqxComboBox({placeHolder: "Select Location"})
				
				$("#add_location_in").jqxComboBox({ height: '30px' });
				$("#add_location_out").jqxComboBox({ height: '30px' });
				
				$("#edit_location_in").jqxComboBox({ height: '30px' });
				$("#edit_location_out").jqxComboBox({ height: '30px' });
				
				$("#edit_in_date").jqxDateTimeInput({
				  showFooter:true,
				  clearString:'Clear'
				});
				
				$("#edit_out_date").jqxDateTimeInput({
				  showFooter:true,
				  clearString:'Clear'
				});
				
				setTimeout(function(){
					var MainDataSource = data;
					var AllLocArray = {Unique: '0', LocationName: 'All Location'};
					MainDataSource.push(AllLocArray);
					var MainSourceLoc = {
						datatype: "json",
						datafields: [
							{ name: 'Unique' },
							{ name: 'LocationName'}
						],
						localdata: sortByKey(MainDataSource, "Unique"),
						async: false
					};
					// Search Location Store
					$scope.comboBoxSettings = {source: MainSourceLoc, displayMember: "LocationName", valueMember: "Unique", width: 150, height: 30};
				},100);	
					
            }).then(function(){
				clear_add_new_form();
				clear_edit_new_form();
				setTimeout(function(){
					$("#location").jqxComboBox({placeHolder: "Select Location"});
					$('#location').on('change', function (event){
							var args = event.args;
							if (args) {
							// index represents the item's index.                          
							var index = args.index;
							var item = args.item;
							// get item's label and value.
							var label = item.label;
							var value = item.value;
							var type = args.type; // keyboard, mouse or null depending on how the item was selected.
							location_label = item.label;
						}
					}); 
					$("#location").jqxComboBox('selectItem', $scope.DefaultLocation);
					TimeClockData()
					.then(function(){
						setTimeout(function(){
							$("#table input.jqx-input-group-addon").focus();
						},100)
					})
				}, 700);
				
				$("#location").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#location").jqxComboBox('clearSelection');
					}
				})	
			})  
        };
		
		//Clear Add Form
        var clear_add_new_form = function(){
			$scope.add_date = {
                in: null,
                out: null
            };

            $scope.add_user = {
                name: ''
            };

			$("#add_time_in").jqxDateTimeInput('setDate', null);
			$("#add_time_out").jqxDateTimeInput('setDate', null);
          
            $scope.add_location = {
                in: null,
                out: null
            }
			$scope.add_Primary = true;
			$scope.add_Secondary = false;
			
			
			setTimeout(function(){
				$("#username").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#username").jqxComboBox('clearSelection');
						$("#add_save_timeclock").prop("disabled", false);
					}
				});
				
				$("#add_location_in").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#add_location_in").jqxComboBox('clearSelection');
						$("#add_save_timeclock").prop("disabled", false);
						$("#add_location_in_clear").text("*");
						$("#add_location_in_clear").css({"cursor":"default"});
					}
				})
				$("#add_location_out").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#add_location_out").jqxComboBox('clearSelection');
						$("#add_save_timeclock").prop("disabled", false);
					}
				})
				
				$("#add_in_date").on('change', function(event){
					var jsDate = event.args.date;
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#add_in_date_clear").text("Clear");
					$("#add_in_date_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				});
				
				$("#add_in_date_clear").click(function(){
					$('#add_in_date').val(null);
					$(this).text("*");
					$(this).css({"cursor":"default"});
				});
				
				$('#add_out_date').on('change', function (event){  
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#add_date_out_clear").text("Clear");
					$("#add_date_out_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				})
				
				$("#add_date_out_clear").click(function(){
					$('#add_out_date').val(null);
					$(this).text("");
					$(this).css({"cursor":"default"});
				})
				
				$("#add_time_in").on('change', function(event){
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#add_time_in_clear").text("Clear");
					$("#add_time_in_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				})
				$("#add_time_in_clear").click(function(){
					$("#add_time_in").val(null);
					$(this).text("*");
					$(this).css({"cursor":"default"});
				})
				
				$("#add_time_out").on('change', function (event){  
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#add_time_out_clear").text("Clear");
					$("#add_time_out_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				})	
				
				$("#add_time_out_clear").click(function(){
					$('#add_time_out').val(null);
					$(this).text("");
					$(this).css({"cursor":"default"});
				});

				$("#add_location_in_clear").click(function(){
					$('#add_location_in').jqxComboBox('clearSelection');
					$("#add_save_timeclock").prop("disabled", false);
					$(this).text("*");
					$(this).css({"cursor":"default"});
				})
				$("#add_location_out_clear").click(function(){
					$('#add_location_out').jqxComboBox('clearSelection');
					$(this).text("");
					$(this).css({"cursor":"default"});
				})
			},100);	
					
			setTimeout(function(){
				$("#add_in_date_clear, #add_time_in_clear, #add_location_in_clear, #add_date_out_clear, #add_time_out_clear, #add_location_out_clear").css({"pointer": "default"});
				
				$("#add_location_in").on('change', function(){
					$("#add_location_in_clear").text("Clear");
					$("#add_location_in_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				});
				
				$("#add_location_out").on('change', function(){
					$("#add_location_out_clear").text("Clear");
					$("#add_location_out_clear").css({"cursor":"pointer"});
					$("#add_save_timeclock").prop("disabled", false);
				});

				$("#username").jqxComboBox('clearSelection');
				$("#add_location_in").jqxComboBox('selectItem', $scope.DefaultLocation);
				$("#add_location_out").jqxComboBox('clearSelection');
				$("#add_in_date_clear").text("*");
				$("#add_time_in_clear").text("*");
				$("#add_date_out_clear").text("");
				$("#add_time_out_clear").text("");
				$("#add_location_out_clear").text("");
				
				$("#add_save_timeclock").prop("disabled", true);
			},100);
        };
		
		//Clear Edit Form
		var clear_edit_new_form = function(){
			var clear_edit_def = new $.Deferred();
			
			setTimeout(function(){
				$scope.edit_date = {
					in: null,
					out: null
				};
				
				$("#edit_time_in").jqxDateTimeInput('setDate', null);
				$("#edit_time_out").jqxDateTimeInput('setDate', null);
			 
				$scope.edit_location = {
					in: null,
					out: null
				}
				
				$scope.Primary = true;
				$scope.Secondary = false;
				$scope.Tertiary = false;
				
				$("#edit_location_in").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#edit_location_in").jqxComboBox('clearSelection');
						$("#edit_update").prop("disabled", false);
						$("#edit_location_in_clear").text("*");
						$("#edit_location_in_clear").css({"cursor":"default"});
					}
				})
				
				$("#edit_location_out").on('keydown', function(event){
					if(event.keyCode == 8 || event.keyCode == 46){
						$("#edit_location_in").jqxComboBox('clearSelection');
						$("#edit_update").prop("disabled", false);
						$("#edit_location_out_clear").text("*");
						$("#edit_location_out_clear").css({"cursor":"default"});
					}
				})
				
				$("#edit_in_date").on('change', function(event){
					var jsDate = event.args.date;
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#edit_in_date_clear").text("Clear");
					$("#edit_in_date_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				});
				
				$("#edit_in_date_clear").click(function(){
					$('#edit_in_date').val(null);
					$(this).text("*");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				});
				
				$('#edit_out_date').on('change', function (event){  
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#edit_date_out_clear").text("Clear");
					$("#edit_date_out_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				})
				
				$("#edit_date_out_clear").click(function(){
					$('#edit_out_date').val(null);
					$(this).text("");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				})
				
				$("#edit_time_in").on('change', function(event){
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#edit_time_in_clear").text("Clear");
					$("#edit_time_in_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				})
				$("#edit_time_in_clear").click(function(){
					$("#edit_time_in").val(null);
					$(this).text("*");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				})
				
				$("#edit_time_out").on('change', function (event){  
					var jsDate = event.args.date; 
					var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
					$("#edit_time_out_clear").text("Clear");
					$("#edit_time_out_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				})	
				
				$("#edit_time_out_clear").click(function(){
					$('#edit_time_out').val(null);
					$(this).text("");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				});

				$("#edit_location_in_clear").click(function(){
					$('#edit_location_in').jqxComboBox('clearSelection');
					$("#edit_update").prop("disabled", false);
					$(this).text("*");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				})
				$("#edit_location_out_clear").click(function(){
					$('#edit_location_out').jqxComboBox('clearSelection');
					$(this).text("");
					$(this).css({"cursor":"default"});
					$("#edit_update").prop("disabled", false);
				})
			
				$("#edit_in_date_clear, #edit_time_in_clear, #edit_location_in_clear, #edit_date_out_clear, #edit_time_out_clear, #edit_location_out_clear").css({"pointer": "default"});
				
				$("#edit_location_in").on('change', function(){
					$("#edit_location_in_clear").text("Clear");
					$("#edit_location_in_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				});
				
				$("#edit_location_out").on('change', function(){
					$("#edit_location_out_clear").text("Clear");
					$("#edit_location_out_clear").css({"cursor":"pointer"});
					$("#edit_update").prop("disabled", false);
				});

				$("#edit_location_in").jqxComboBox('clearSelection');
				$("#edit_location_out").jqxComboBox('clearSelection');
				$("#edit_in_date_clear").text("*");
				$("#edit_time_in_clear").text("*");
				$("#edit_date_out_clear").text("");
				$("#edit_time_out_clear").text("");
				$("#edit_location_out_clear").text("");
				
				$("#edit_update").prop("disabled", true);
				
				$('#table').jqxDataTable({ disabled: false }); 
				
				console.log("Execute Clear Edit Form");	
				
				clear_edit_def.resolve();

			},100);
			
			return clear_edit_def;
		}

        var PreTimeClock = function(){
            $scope.dataTableSettings = {
				width: "100%",
				editable: false,
				pageable: true,
				pagerMode: 'Advanced',
				pageSize: 20,
				sortable: true,
				disabled: false,
				filterable: true,
				filterMode: 'simple',
				showtoolbar: true,
				altRows: true,
				theme: 'ui-richmond',
				renderToolbar: function(toolBar)
				{
					var toTheme = function (className) {
						if (theme == "") return className;
						return className + " " + className + "-" + theme;
					};
					// appends buttons to the status bar.
					var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%;'></div>");
					var buttonTemplate = "<div style='float: left; padding: 3px; margin: 2px;'><div style='margin: 4px; width: 16px; height: 16px;'></div></div>";
					var addButton = $(buttonTemplate);
					var editButton = $(buttonTemplate);
					var deleteButton = $(buttonTemplate);
					var exportButton = $(buttonTemplate);
					var downloadButton = $(buttonTemplate);
					container.append(addButton);
					container.append(editButton);
					container.append(deleteButton);
					container.append(exportButton);
					container.append(downloadButton);
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
					exportButton.jqxButton({ cursor: "pointer", disabled: false, enableDefault: false,  height: 25, width: 25 });
					exportButton.find('div:first').addClass("glyphicon glyphicon-export");
					exportButton.jqxTooltip({ position: 'bottom', content: "Export to Excel"});
					downloadButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
					downloadButton.find('div:first').addClass("glyphicon glyphicon-download-alt");
					downloadButton.jqxTooltip({ position: 'bottom', content: "Download"});
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
					var rowIndex = null;
					$("#table").on('rowSelect', function (event) {
						updateButtons('Select');
					});
					
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
							clear_add_new_form();
							AddTimeClockdialog.setTitle('Time Clock | New');
							AddTimeClockdialog.open();
						}
					});
					editButton.click(function(){
						if (!editButton.jqxButton('disabled')){
							$('#table').jqxDataTable({ disabled:true }); 
							setTimeout(function(){
								EditTimeClockdialog.open();
							},1000);
						}
					});
					deleteButton.click(function(){
						if (!deleteButton.jqxButton('disabled')){
							DeleteTimeClockdialog.open();
						}
					});
					exportButton.click(function(){
						if (!exportButton.jqxButton('disabled')){
							downloadButton.jqxButton({ disabled: true });
							var datefrom = $filter('date')(new Date($scope.date.rangefrom), 'yyyy-MM-dd');
							var dateto = $filter('date')(new Date($scope.date.rangeto), 'yyyy-MM-dd');
							var locIn = $("#location").val();
							var postdata="datefrom="+datefrom;
								postdata+="&dateto="+dateto;
								postdata+="&inlocation="+locIn;
								postdata+="&inlocation_name="+location_label;
							posData.ExportData(postdata)
							.success(function(data){
								console.log("File: "+data.file+" FileName: "+data.filename);
								downloadButton.jqxButton({ disabled: false });
								window.location = base_url+"backoffice/timeclock/download";
							})
						}
					});
					//href="+base_url+"backoffice/timeclock/download"+"
					
					downloadButton.click(function(){
						if (!downloadButton.jqxButton('disabled')){
							window.location = base_url+"backoffice/timeclock/download";
						}
					});
					
				},
				created: function(args)
				{
					dataTable = args.instance;
				},
				source: {
					datatype: "json",
					datafields: [
						{name: 'Unique', type: 'int'},
						{name: 'user_unique', type: 'string'},
						{name: 'user_name', type: 'string'},
						{name: 'clock_in_date', type: 'date'},
						{name: 'clock_in_time', type: 'date'},
						{name: 'clock_out_date', type: 'date'},
						{name: 'clock_out_time', type: 'date'},
						{name: 'clock_in_location_name', map: 'clock_in_location>LocationName', type: 'string'},
						{name: 'clock_out_location_name', map: 'clock_out_location>LocationName', type: 'string'},
						{name: 'clock_datetime', type: 'string'},
						{name: 'clock_in_location', map: 'clock_in_location>Unique', type: 'int'},
						{name: 'clock_out_location', map: 'clock_out_location>Unique', type: 'int'},
						{name: 'elapsed', type: 'string'}
					],
					localdata: '{}'
				},
				columns: [
					{text: 'ID', datafield: 'Unique', width: '5%', hidden: false},
					{text: 'User Unique', datafield: 'user_unique', hidden: true},
					{text: 'User', datafield: 'user_name', width: "12%"},
					{text: 'In Date', datafield: 'clock_in_date', width: "15%", cellsformat: 'd'},
					{text: 'Time In', datafield: 'clock_in_time', width: "10%", cellsformat: 'h:mm tt'},
					{text: 'Location In', datafield: 'clock_in_location_name', width: "9%"},
					{text: 'Date Out', datafield: 'clock_out_date', width: "15%", cellsformat: 'd'},
					{text: 'Time Out', datafield: 'clock_out_time', width: "10%", cellsformat: 'h:mm tt'},
					{text: 'Location Out', datafield: 'clock_out_location_name', width: "14%"},
					{text: 'Location In Unique', datafield: 'clock_in_location', hidden: true},
					{text: 'Location Out Unique', datafield: 'clock_out_location', hidden: true},
					{text: 'Duration', datafield: 'elapsed', width: "10%", cellsformat: 'f2'}
				]
			};
        };

        var TimeClockData = function(){
			var ret = $.Deferred();
            var datefrom = $filter('date')(new Date(), 'yyyy-MM-dd');
            var dateto = $filter('date')(new Date(), 'yyyy-MM-dd');
			var locIn = $("#location").val();
			
			if($("#location").val() == ''){
				$("#location").jqxComboBox("selectItem", $scope.DefaultLocation);
				locIn = $scope.DefaultLocation;
			}
            posData.TimeClockDateRange(datefrom, dateto, locIn)
            .success(function(data){
                $scope.dataTableSettings = {
                    width: "100%",
                    height: 500,
                    created: function(args)
                    {
                        dataTable = args.instance;
                    },
                    source: {
                        datatype: "json",
                        datafields: [
                            {name: 'Unique', type: 'int'},
                            {name: 'user_unique', type: 'string'},
                            {name: 'user_name', type: 'string'},
                            {name: 'clock_in_date', type: 'date'},
                            {name: 'clock_in_time', type: 'date'},
                            {name: 'clock_out_date', type: 'date'},
                            {name: 'clock_out_time', type: 'date'},
                            {name: 'clock_in_location_name', map: 'clock_in_location>LocationName', type: 'string'},
                            {name: 'clock_out_location_name', map: 'clock_out_location>LocationName', type: 'string'},
                            {name: 'clock_datetime', type: 'string'},
                            {name: 'clock_in_location', map: 'clock_in_location>Unique', type: 'int'},
                            {name: 'clock_out_location', map: 'clock_out_location>Unique', type: 'int'},
                            {name: 'elapsed', type: 'string'}
                        ],
                        localdata: data
                    }
                }
				ret.resolve();
            })
			return ret;
        };

//### Load All Functions ###
	PreTimeClock();
    LoadHeaderInfo();
    DateInput();
    TimeInput();
    Users();
    
    
//#####################

    $scope.DateStoreSearch = function(){
        var datefrom = $filter('date')(new Date($scope.date.rangefrom), 'yyyy-MM-dd');
        var dateto = $filter('date')(new Date($scope.date.rangeto), 'yyyy-MM-dd');
		var	locIn = $("#location").val();
		
		if( $("#location").val() == ''){
			$("#location").jqxComboBox('selectItem', $scope.DefaultLocation);
			var locIn = $scope.DefaultLocation;
		}
		
		posData.TimeClockDateRange(datefrom, dateto, locIn)
		.success(function(data){
			$scope.dataTableSettings = {
				width: "100%",
				height: 500,
				created: function(args)
				{
					dataTable = args.instance;
				},
				source: {
					datatype: "json",
					datafields: [
						{name: 'Unique', type: 'int'},
						{name: 'user_unique', type: 'string'},
						{name: 'user_name', type: 'string'},
						{name: 'clock_in_date', type: 'date'},
						{name: 'clock_in_time', type: 'date'},
						{name: 'clock_out_date', type: 'date'},
						{name: 'clock_out_time', type: 'date'},
						{name: 'clock_in_location_name', map: 'clock_in_location>LocationName', type: 'string'},
						{name: 'clock_out_location_name', map: 'clock_out_location>LocationName', type: 'string'},
						{name: 'clock_datetime', type: 'string'},
						{name: 'clock_in_location', map: 'clock_in_location>Unique', type: 'int'},
						{name: 'clock_out_location', map: 'clock_out_location>Unique', type: 'int'},
						{name: 'elapsed', type: 'string'}
					],
					localdata: data
				}
			}
		})
    };
	
	
	var TimeClockRecycle = function(){
		var datefrom = $filter('date')(new Date($scope.date.rangefrom), 'yyyy-MM-dd');
		var dateto = $filter('date')(new Date($scope.date.rangeto), 'yyyy-MM-dd');
		var locIn = $("#location").val();
		
		if($("#location").val() == ''){
			$("#location").jqxComboBox("selectItem", $scope.DefaultLocation);
			locIn = $scope.DefaultLocation;
		}
		posData.TimeClockDateRange(datefrom, dateto, locIn)
		.success(function(data){
			$scope.dataTableSettings = {
				width: "100%",
				height: 500,
				created: function(args)
				{
					dataTable = args.instance;
				},
				source: {
					datatype: "json",
					datafields: [
						{name: 'Unique', type: 'int'},
						{name: 'user_unique', type: 'string'},
						{name: 'user_name', type: 'string'},
						{name: 'clock_in_date', type: 'date'},
						{name: 'clock_in_time', type: 'date'},
						{name: 'clock_out_date', type: 'date'},
						{name: 'clock_out_time', type: 'date'},
						{name: 'clock_in_location_name', map: 'clock_in_location>LocationName', type: 'string'},
						{name: 'clock_out_location_name', map: 'clock_out_location>LocationName', type: 'string'},
						{name: 'clock_datetime', type: 'string'},
						{name: 'clock_in_location', map: 'clock_in_location>Unique', type: 'int'},
						{name: 'clock_out_location', map: 'clock_out_location>Unique', type: 'int'},
						{name: 'elapsed', type: 'string'}
					],
					localdata: data
				}
			}
		})
	};
	
	var Click = function(row){
		var click_def = new $.Deferred();
		setTimeout(function(){
			var date_out = row.clock_out_date;
			var time_out = row.clock_out_time;
			var locout = row.clock_out_location;
			
			$scope.delete = {
				msg: 'Would you like to delete '+row.Unique+" "+row.user_name
			};
			DeleteTimeClockdialog.setTitle("Delete Time Clock | ID: "+row.Unique+" "+row.user_name);
			
			$scope.time_clock = {
				unique: row.Unique
			};
	
			$scope.user = {
				name: row.user_name
			};
	
			if(date_out){
				$scope.edit_date = {
					in: $filter('date')(new Date(row.clock_in_date), 'MM/dd/yyyy'),
					out: $filter('date')(new Date(row.clock_out_date), 'MM/dd/yyyy')
				};
			}else{
				$scope.edit_date = {
					in: $filter('date')(new Date(row.clock_in_date), 'MM/dd/yyyy'),
					out: null
				};
			}
	
			if(time_out) {
				var year_in = $filter('date')(new Date(row.clock_in_date), 'yyyy');
				var month_in = $filter('date')(new Date(row.clock_in_date), 'MM');
				var day_in = $filter('date')(new Date(row.clock_in_date), 'dd');
				var hour_in = $filter('date')(new Date(row.clock_in_time), 'HH');
				var minute_in = $filter('date')(new Date(row.clock_in_time), 'mm');
	
				var year_out = $filter('date')(new Date(row.clock_out_date), 'yyyy');
				var month_out = $filter('date')(new Date(row.clock_out_date), 'MM');
				var day_out = $filter('date')(new Date(row.clock_out_date), 'dd');
				var hour_out = $filter('date')(new Date(row.clock_out_time), 'HH');
				var minute_out = $filter('date')(new Date(row.clock_out_time), 'mm');
	
				$scope.EditTimeInSettings.apply('setDate', new Date(year_in, month_in, day_in, hour_in, minute_in));
				$scope.EditTimeOutSettings.apply('setDate', new Date(year_out, month_out, day_out, hour_out, minute_out));
	
			}else{
	
				var year_in = $filter('date')(new Date(row.clock_in_date), 'yyyy');
				var month_in = $filter('date')(new Date(row.clock_in_date), 'MM');
				var day_in = $filter('date')(new Date(row.clock_in_date), 'dd');
				var hour_in = $filter('date')(new Date(row.clock_in_time), 'HH');
				var minute_in = $filter('date')(new Date(row.clock_in_time), 'mm');
	
				$scope.EditTimeInSettings.apply('setDate', new Date(year_in, month_in, day_in, hour_in, minute_in));
				$scope.EditTimeOutSettings.apply('setDate', '');
			}
	
			if(locout){
				$scope.edit_location = {
					in: row.clock_in_location,
					out: row.clock_out_location
				}
			}else{
				$scope.edit_location = {
					in: row.clock_in_location,
					out: ""
				}
			}
			EditTimeClockdialog.setTitle("Edit Time Clock | ID:"+row.Unique+" "+row.user_name);
			
			ChangeDetector = '';
			
			click_def.resolve();
			
		},1000);
		return click_def;
	}
	
    $scope.rowClick = function(event){
        var args = event.args;
        var index = args.index;
        var row = args.row;
		clear_edit_new_form()
		.then(function(){
			Click(row)
			.then(function(){
				setTimeout(function(){
					$("#edit_update").prop("disabled", true);
					console.log("disable update button");
				},100);
			})
		})
    };
	
	var DoubleClick = function(row){
		var row_dbl_def = new $.Deferred();
		/*
		setTimeout(function(){
			//var date_out = row.clock_out_date;
			//var time_out = row.clock_out_time;
			//var locout = row.clock_out_location;
			
			$scope.time_clock = {
				unique: row.Unique
			};
	
			$scope.user = {
				name: row.user_name
			};
			
			if(row.clock_out_date){
				$("#edit_in_date").val($filter('date')(new Date(row.clock_in_date), 'MM/dd/yyyy'));
				$("#edit_out_date").val($filter('date')(new Date(row.clock_out_date), 'MM/dd/yyyy'));
				
			}else{
				$("#edit_in_date").val($filter('date')(new Date(row.clock_in_date), 'MM/dd/yyyy'));
				$("#edit_out_date").val(null);
			}
	
			if(row.clock_out_time) {
				var year_in = $filter('date')(new Date(row.clock_in_date), 'yyyy');
				var month_in = $filter('date')(new Date(row.clock_in_date), 'MM');
				var day_in = $filter('date')(new Date(row.clock_in_date), 'dd');
				var hour_in = $filter('date')(new Date(row.clock_in_time), 'HH');
				var minute_in = $filter('date')(new Date(row.clock_in_time), 'mm');
	
				var year_out = $filter('date')(new Date(row.clock_out_date), 'yyyy');
				var month_out = $filter('date')(new Date(row.clock_out_date), 'MM');
				var day_out = $filter('date')(new Date(row.clock_out_date), 'dd');
				var hour_out = $filter('date')(new Date(row.clock_out_time), 'HH');
				var minute_out = $filter('date')(new Date(row.clock_out_time), 'mm');
	
				$scope.TimeInSettings.apply('setDate', new Date(year_in, month_in, day_in, hour_in, minute_in));
				$scope.TimeOutSettings.apply('setDate', new Date(year_out, month_out, day_out, hour_out, minute_out));
				
			}else{
	
				var year_in = $filter('date')(new Date(row.clock_in_date), 'yyyy');
				var month_in = $filter('date')(new Date(row.clock_in_date), 'MM');
				var day_in = $filter('date')(new Date(row.clock_in_date), 'dd');
				var hour_in = $filter('date')(new Date(row.clock_in_time), 'HH');
				var minute_in = $filter('date')(new Date(row.clock_in_time), 'mm');
	
				$scope.TimeInSettings.apply('setDate', new Date(year_in, month_in, day_in, hour_in, minute_in));
				$scope.TimeOutSettings.apply('setDate', '');
			}
	
			if(row.clock_out_location){
				$scope.edit_location = {
					in: ""+row.clock_in_location,
					out: ""+row.clock_out_location
				}
			}else{
				$scope.edit_location = {
					in: ""+row.clock_in_location,
					out: ""
				}
			}
			
			//EditTimeClockdialog.setTitle("Time Clock | Edit");
			EditTimeClockdialog.setTitle("Edit Time Clock | ID:"+row.Unique+" "+row.user_name);
			EditTimeClockdialog.open();
	
			ChangeDetector = '';
			console.log("Delay1");
			
			row_dbl_def.resolve();
			
		},500);	
		*/
		EditTimeClockdialog.setTitle("Edit Time Clock | ID:"+row.Unique+" "+row.user_name);
			EditTimeClockdialog.open();
		return row_dbl_def;
	}

	/*
    $scope.rowDoubleClick = function (event) {
        var args = event.args;
        var index = args.index;
        var row = args.row;
		setTimeout(function(){
			EditTimeClockdialog.open();
		},3000);
    };
	*/
	
	$("#table").on('rowDoubleClick', function (event) {
		var args = event.args;
		var index = args.index;
		var row = args.row;
		setTimeout(function(){
			EditTimeClockdialog.open();
		},1000);
	})

    $scope.EditCancel = function(){
		var editSaveButton = $("#edit_update").is(":disabled");
		if(editSaveButton){
			clear_edit_new_form();
        	EditTimeClockdialog.close();
			setTimeout(function(){
				$("#table").jqxDataTable('selectRow', -1);
				$("#table").jqxDataTable('unselectRow', 0);
				$("#table input.jqx-input-group-addon").focus();
			},100)
		}else{
			$scope.edit_time_clock = {
				msg: 'Would you like to save your changes?'
			}
			$scope.Primary = false;
			$scope.Secondary = false;
			$scope.Tertiary = true;
		}
    };

	$scope.EditAskCancel = function(){
		clear_edit_new_form();
		EditTimeClockdialog.close();
		setTimeout(function(){
			$("#table").jqxDataTable('selectRow', -1);
			$("#table").jqxDataTable('unselectRow', 0);
			$("#table input.jqx-input-group-addon").focus();
		},100)
	}

    var ConvertTimeformat = function(format, str) {
        var time = str;
         var hours = Number(time.match(/^(\d+)/)[1]);
         var minutes = Number(time.match(/:(\d+)/)[1]);
         var AMPM = time.match(/\s(.*)$/)[1];
         if (AMPM == "PM" && hours < 12) hours = hours + 12;
         if (AMPM == "AM" && hours == 12) hours = hours - 12;
         var sHours = hours.toString();
         var sMinutes = minutes.toString();
         if (hours < 10) sHours = "0" + sHours;
         if (minutes < 10) sMinutes = "0" + sMinutes;
         var static_sec = "00";
         return sHours + ":" + sMinutes + ":" +static_sec;
    };

    $scope.EditUpdate = function(){
        var Unique = $scope.time_clock.unique;
        var InDate = $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd');
        var TimeIn = $scope.edit_time.in;
        var LocationIn = $scope.edit_location.in;
        var OutDate = $filter('date')(new Date($scope.edit_date.out), 'yyyy-MM-dd');
        var TimeOut =  $scope.edit_time.out;
        var LocationOut = $scope.edit_location.out;
		var postdata='';
		
		var process1 = false;
		if($("#edit_in_date").jqxDateTimeInput('value') == null){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("In Date is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process1 = false;
		}else{
			if($("#edit_time_in").jqxDateTimeInput('value') !== null){
				postdata+='&clock_in_date='+ $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd') +" "+ ConvertTimeformat("24", $scope.edit_time.in);
				postdata+="&clock_date="+ $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd'); 
				process1 = true;
			}
		}
		
		var process2 = false;
		if($("#edit_time_in").jqxDateTimeInput('value') == null){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("Time In is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process2 = false;
		}else{
			postdata+="&clock_in_time="+ConvertTimeformat("24", $scope.edit_time.in);
			process2 = true;
		}
		
		var process3 = false;
		if($("#edit_location_in").val() == ''){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("Location In is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process3 = false;
		}else{
			postdata+="&clock_in_location=" + $("#edit_location_in").val();
			process3 = true;
		}
		
		if(process1 == true && process2 == true && process3 == true){
			$("#edit_update").prop("disabled", true);
			if( $("#edit_time_out").jqxDateTimeInput('value') == null ){
				postdata+="&status=1";
				postdata+="&clock_out_time=null";
			}else{
				postdata+="&clock_out_time=" + ConvertTimeformat("24", $scope.edit_time.out);
				postdata+="&status=2";
			}
		
			if($("#edit_out_date").jqxDateTimeInput('value') !== null){
				postdata+="&clock_out_date="+ $filter('date')(new Date($scope.edit_date.out), 'yyyy-MM-dd') +" "+ $scope.edit_time.out;
			}else{
				postdata+="&clock_out_date=null";
			}
			
			if($("#edit_location_out").val() !== ''){
				postdata+="&clock_out_location=" + $("#edit_location_out").val();
			}else{
				postdata+="&clock_out_location=null"; 
			}
			
			posData.UpdateTimeClock(Unique, postdata)
			.success(function(data){
				$("#edit_save_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "success" });
				$("#edit_save_notificationContent").html("Time Clock saved");
				$("#edit_save_jqxNotification").jqxNotification("open");
			}).then(function(){
				setTimeout(function(){
					TimeClockRecycle();
					//EditTimeClockdialog.close();
				},2000);
			})
		}
    };
	
	
	$scope.EditCloseUpdate = function(){
        var Unique = $scope.time_clock.unique;
        var InDate = $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd');
        var TimeIn = $scope.edit_time.in;
        var LocationIn = $scope.edit_location.in;
        var OutDate = $filter('date')(new Date($scope.edit_date.out), 'yyyy-MM-dd');
        var TimeOut =  $scope.edit_time.out;
        var LocationOut = $scope.edit_location.out;
		var postdata='';
		
		var process1 = false;
		if($("#edit_in_date").jqxDateTimeInput('value') == null){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("In Date is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process1 = false;
		}else{
			if($("#edit_time_in").jqxDateTimeInput('value') !== null){
				postdata+='&clock_in_date='+ $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd') +" "+ ConvertTimeformat("24", $scope.edit_time.in);
				postdata+="&clock_date="+ $filter('date')(new Date($scope.edit_date.in), 'yyyy-MM-dd'); 
				process1 = true;
			}
		}
		
		var process2 = false;
		if($("#edit_time_in").jqxDateTimeInput('value') == null){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("Time In is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process2 = false;
		}else{
			postdata+="&clock_in_time="+ConvertTimeformat("24", $scope.edit_time.in);
			process2 = true;
		}
		
		var process3 = false;
		if($("#edit_location_in").val() == ''){
			$("#edit_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#edit_notificationContent").html("Location In is required field");
			$("#edit_jqxNotification").jqxNotification("open");
			process3 = false;
		}else{
			postdata+="&clock_in_location=" + $("#edit_location_in").val();
			process3 = true;
		}
		
		if(process1 == true && process2 == true && process3 == true){
			if( $("#edit_time_out").jqxDateTimeInput('value') == null ){
				postdata+="&status=1";
				postdata+="&clock_out_time=null";
			}else{
				postdata+="&clock_out_time=" + ConvertTimeformat("24", $scope.edit_time.out);
				postdata+="&status=2";
			}
		
			if($("#edit_out_date").jqxDateTimeInput('value') !== null){
				postdata+="&clock_out_date="+ $filter('date')(new Date($scope.edit_date.out), 'yyyy-MM-dd') +" "+ $scope.edit_time.out;
			}else{
				postdata+="&clock_out_date=null";
			}
			
			if($("#edit_location_out").val() !== ''){
				postdata+="&clock_out_location=" + $("#edit_location_out").val();
			}else{
				postdata+="&clock_out_location=null"; 
			}
			
			posData.UpdateTimeClock(Unique, postdata)
			.success(function(data){
				$("#edit_save_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "success" });
				$("#edit_save_notificationContent").html("Time Clock saved");
				$("#edit_save_jqxNotification").jqxNotification("open");
			}).then(function(){
				setTimeout(function(){
					TimeClockRecycle();
					clear_edit_new_form();
					$("#edit_update").prop("disabled", true);
					$("#table").jqxDataTable('selectRow', -1);
					$("#table").jqxDataTable('unselectRow', 0);
					EditTimeClockdialog.close();
					setTimeout(function(){
						$("#table input.jqx-input-group-addon").focus();
					},100)
				},1000);
				
			})
		}
    };
	

    $scope.EditDelete = function(){
        $scope.Primary = false;
        $scope.time_clock_delete = {
            msg: 'Would you like to delete '+$scope.time_clock.unique+' '+$scope.user.name+"."
        };
        $scope.Secondary = true;
    };

    $scope.EditYesUpdate = function() {
        var Unique = $scope.time_clock.unique;
        var Status = 0;
        var postdata="status="+Status;
        posData.DeleteTimeClock(Unique, postdata)
        .success(function(data){
			 $("#edit_delete_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#edit_container", opacity: 0.9, autoClose: true, template: "info" });
			 $("#edit_delete_notificationContent").html("Time Clock deleted");
			 $("#edit_delete_jqxNotification").jqxNotification("open");
			 
			 setTimeout(function(){
				TimeClockRecycle();
				EditTimeClockdialog.close();
             	clear_add_new_form();
				$("#table").jqxDataTable('selectRow', -1);
				$("#table").jqxDataTable('unselectRow', 0);
				setTimeout(function(){
					$("#table").jqxDataTable("disabled", false);
					$("#table input.jqx-input-group-addon").focus();
				},100)
			 },2000);
        })
    };

    $scope.EditNoUpdate = function(){
        $scope.time_clock_delete = {
            msg: ''
        };
        $scope.Secondary = false;
        $scope.Primary = true;
    };


    $scope.edit_date_in = function(){
        ChangeDetector = 1;
        //console.log(ChangeDetector);
    };
    $scope.edit_time_in = function(){
        ChangeDetector = 2;
        //console.log(ChangeDetector);
    };
    $scope.edit_location_in = function(){
        ChangeDetector = 3;
        //console.log(ChangeDetector);
    };
    $scope.edit_date_out = function(){
        ChangeDetector = 4;
        //console.log(ChangeDetector);
    };


    $scope.AddTimeClock = function(){	
        var Unique = $scope.adduser.unique;
        var UserName = $scope.adduser.name;
		var postdata='';
				
		var process1 = false;
		if($("#username").val() == ''){
			$("#add_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#add_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#add_notificationContent").html("User is required field");
			$("#add_jqxNotification").jqxNotification("open");
			process1 = false;
		}else{
			postdata='user_unique='+Unique;
			postdata+='&user_name='+UserName;
			process1 = true;
		}
		
		var process2 = false;
		if( $("#add_in_date").jqxDateTimeInput('value') == null){
			$("#add_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#add_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#add_notificationContent").html("In Date is required field");
			$("#add_jqxNotification").jqxNotification("open");
			process2 = false;
		}else{
			if($("#add_time_in").jqxDateTimeInput('value') !== null){
				postdata+='&clock_in_date='+ $filter('date')(new Date($scope.add_date.in), 'yyyy-MM-dd') +" "+ ConvertTimeformat("24", $scope.add_time.in);
				postdata+="&clock_date="+ $filter('date')(new Date($scope.add_date.in), 'yyyy-MM-dd'); 
				process2 = true;
			}
		}
		
		var process3 = false;
		if($("#add_time_in").jqxDateTimeInput('value') == null){
			$("#add_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#add_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#add_notificationContent").html("Time In is required field");
			$("#add_jqxNotification").jqxNotification("open");
			process3 = false;
		}else{
			postdata+="&clock_in_time="+ConvertTimeformat("24", $scope.add_time.in);
			process3 = true;
		}
		
		var process4 = false;
		if($("#add_location_in").val() == ''){
			$("#add_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#add_container", opacity: 0.9, autoClose: true, template: "error" });
			$("#add_notificationContent").html("Location In is required field");
			$("#add_jqxNotification").jqxNotification("open");
			process4 = false;
		}else{
			postdata+="&clock_in_location=" + $("#add_location_in").val();
			process4 = true;
		}
		
		if(process1 == true && process2 == true && process3 == true && process4 == true){
			$("#add_save_timeclock").prop('disabled', true);
			if($("#add_location_out").val() !== ''){
				postdata+="&clock_out_location=" + $("#add_location_out").val();
			}
			if($("#add_time_out").jqxDateTimeInput('value') == null){
				postdata+="&status=1";
			}else{
				postdata+="&clock_out_time=" + ConvertTimeformat("24", $scope.add_time.out);
				postdata+="&status=2";
			}
			if($("#add_out_date").jqxDateTimeInput('value') !== null){
				postdata+="&clock_out_date="+ $filter('date')(new Date($scope.add_date.out), 'yyyy-MM-dd') +" "+ $scope.add_time.out;
			}
			
			posData.AddTimeClock(postdata)
			.success(function(data){
				$("#add_save_jqxNotification").jqxNotification({ width: "100%", appendContainer: "#add_container", opacity: 0.9, autoClose: true, template: "success" });
				$("#add_save_notificationContent").html("Time Clock saved");
				$("#add_save_jqxNotification").jqxNotification("open");
			}).then(function(){
				setTimeout(function(){
					TimeClockRecycle();
					AddTimeClockdialog.close();
					setTimeout(function(){
						$("#table input.jqx-input-group-addon").focus();
					},100)
				},2000);
			})
		} 
    };

    var ReloadGrid = function(){
        var datefrom = $filter('date')(new Date($scope.date.rangefrom), 'yyyy-MM-dd');
        var dateto = $filter('date')(new Date($scope.date.rangeto), 'yyyy-MM-dd');
		var locIn = $("#location").val();
        posData.TimeClockDateRange(datefrom, dateto, locIn)
            .success(function(data){
                $scope.dataTableSettings = {
                    width: "100%",
                    height: 500,
                    created: function(args)
                    {
                        dataTable = args.instance;
                    },
                    source: {
                        datatype: "json",
                        datafields: [
                            {name: 'Unique', type: 'int'},
                            {name: 'user_unique', type: 'string'},
                            {name: 'user_name', type: 'string'},
                            {name: 'clock_in_date', type: 'date'},
                            {name: 'clock_in_time', type: 'date'},
                            {name: 'clock_out_date', type: 'date'},
                            {name: 'clock_out_time', type: 'date'},
                            {name: 'clock_in_location_name', map: 'clock_in_location>LocationName', type: 'string'},
                            {name: 'clock_out_location_name', map: 'clock_out_location>LocationName', type: 'string'},
                            {name: 'clock_datetime', type: 'string'},
                            {name: 'clock_in_location', map: 'clock_in_location>Unique', type: 'int'},
                            {name: 'clock_out_location', map: 'clock_out_location>Unique', type: 'int'},
                            {name: 'elapsed', type: 'string'}
                        ],
                        localdata: data
                    }
                }
            })
    };

    $scope.AddCancel = function(){
		var askBeforesave = $("#add_save_timeclock").is(":disabled");
		if(askBeforesave){
			clear_add_new_form();
			AddTimeClockdialog.close();
			setTimeout(function(){
				$("#table input.jqx-input-group-addon").focus();
			},100)
		}else{
			$scope.add_time_clock = {
				msg: 'Would you like to save your changes?'
			}
			$scope.add_Secondary = true;
			$scope.add_Primary = false;
		}
    };
	
	$scope.AddAskCancel = function(){
		clear_add_new_form();
		setTimeout(function(){
			AddTimeClockdialog.close();
		},100);
	}

    $scope.DeleteTimeClock = function(){
        var Unique = $scope.time_clock.unique;
        var Status = 0;
        var postdata="status="+Status;
        posData.DeleteTimeClock(Unique, postdata)
        .success(function(data){
           setTimeout(function(){
				TimeClockRecycle();
				$scope.delete = {
					msg: ''
				}
				$("#table").jqxDataTable('selectRow', -1);
				$("#table").jqxDataTable('unselectRow', 0);
				setTimeout(function(){
					$("#table input.jqx-input-group-addon").focus();
				},100)
				DeleteTimeClockdialog.close();	
			},100);
		})
    };
    $scope.DeleteTimeClockCancel = function(){
        $scope.delete = {
            msg: ''
        };
		$("#table").jqxDataTable('selectRow', -1);
		$("#table").jqxDataTable('unselectRow', 0);
		setTimeout(function(){
			$("#table input.jqx-input-group-addon").focus();
		},100)
        DeleteTimeClockdialog.close();
    };
}])

.directive('addTimeClock', function(){
    return {
        retrict: 'E',
        templateUrl: base_url + 'backoffice/timeclock/add-time-clock'
    };
})

.directive('editTimeClock', function(){
    return {
        retrict: 'E',
        templateUrl: base_url + 'backoffice/timeclock/edit-time-clock'
    };
})

.directive('deleteTimeClock', function(){
    return {
        retrict: 'E',
        templateUrl: base_url + 'backoffice/timeclock/delete-time-clock'
    };
});
