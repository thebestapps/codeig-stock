(function() {
    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc',function(){})
    .controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', '$compile', '$rootScope',  function ($scope, $http, svc, $routeParams, $q, posData, $window, $filter, $compile, $rootScope) {

        var inProgress = [], Complete = [], LocationList = [], CategoryList = [], SupplierList =[], EditItemCount  = [], DeleteItemCount;
        var DefaultLocation = $("#LocationUnique").val();
        var ItemCountUnique = '';

        //Create alert message form dynamic
        var populateNumpadAlert = function(msg){
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert_message").append('<div id="alert_message_container" style="background: #144766; color:#EEE;"></div>');
                $("#alert_message_container").html('');
                $("#alert_message_container").append(
                    '<div style="width:100%;"><h3 id="alert_message">'+msg+'</h3></div>'+
                    '<br><br><br>'+
                    '<div style="width:100%; text-align:right; padding: 0; margin:0;" id="alert_message_function"></div>'
                );
                def.resolve();
            },100);
            return def.promise();
        }

        //Alert message window popup setting
        var WindowPopupAlert = function(header_text){
            var def = $.Deferred();
            setTimeout(function(){
                $("#alert_message").jqxWindow({
                    height: 260,
                    minWidth: 360,
                    isModal: true,
                    theme: 'darkblue',
                    showCloseButton: false,
                    resizable: false,
                    draggable: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0	
                });
                $('#alert_message').jqxWindow('setTitle', header_text);
                $('#alert_message').jqxWindow('open');
                def.resolve();	
            },100);
            return def.promise();
        }

        //Populate Alert message
        var NumpadAlert = function(msg){
            var def = $.Deferred();
            populateNumpadAlert(msg)
            .then(function(){
                def.resolve();
            });
            return def.promise();
        }

        // Item Count list
        var ItemCountData = function(){
            var def = $.Deferred();
            posData.ItemCountData()
            .success(function(data){
                inProgress.push(data.inProgress);
                Complete.push(data.Complete);
                def.resolve(data);
            })
            return def.promise();
        }
        // Location list
        var LocationDataList = function(){
            var def = $.Deferred();
            posData.Location()
            .success(function(data){
                LocationList.push(data);
                def.resolve(data);
            })
            return def.promise();
        }
        var CategoryDataList = function(){
            var def = $.Deferred();
            posData.Category()
            .success(function(data){
                CategoryList.push(data)
                def.resolve(data);
            })
            return def.promise();
        }

        var SupplierListData = function(){
            var def = $.Deferred();
            posData.Supplier()
            .success(function(data){
                SupplierList.push(data);
                def.resolve(data);
            })
            return def.promise();
        }

        var validateNumber = (event) => {
            var key = window.event ? event.keyCode : event.which;
            
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if ( key < 48 || key > 57 ) {
                return false;
            } else {
                return true;
            }
        }

        // In Progress
        var InProgressGrid = function(data){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique',   type: 'int'     },
                    { name: 'Location', type: 'string'  },
                    { name: 'LocationUnique', type: 'int'},
                    { name: 'Comment',  type: 'string'  },
                    { name: 'CountDate',type: 'date'    },
                    { name: 'CountDateTime', type: 'datetime'},
                    { name: 'Created',  type: 'datetime'},
                    { name: 'CreatedBy',type: 'string'  },
                    { name: 'Updated',  type: 'datetime'},
                    { name: 'UpdatedBy',type: 'string'  },
                    { name: 'Category' , type: 'int' },
                    { name: 'SubCategory', type: 'int'},
                    { name: 'SupplierUnique', type: 'int'}
                ],
                localdata: data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_inprogress").jqxGrid({
                width: '100%',
                height: '100%',
                source: dataAdapter,
                theme: Gtheme,
                scrollbarsize: GScrollBarSize,
                showfilterrow: true,
                filterable: true,
                filterMode: 'advance',
                pageable: true,
                pagermode: 'advanced',
                altrows: true,
                rowsheight: GRowHeight,
                sortable: true,
                ready : function(){
                    if(GAutoResizeColumns != ''){
                        $("#item_count_inprogress").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                    }
                },
                columns: [
                    { text: 'ID', datafield: 'Unique', width: '5%' },
                    { text: 'Location', datafield: 'Location', width: '10%' },
                    { text: 'Comment', datafield: 'Comment', width: '30%'},
                    { text: 'Count Date', datafield: 'CountDate', cellsformat: 'd', width: '10%'},
                    { text: 'Created', datafield: 'Created', width: '15%'},
                    { text: 'Created By', datafield: 'CreatedBy', width: '10%'},
                    { text: 'Updated', datafield: 'Updated', width: '10%'},
                    { text: 'UpdatedBy', datafield: 'UpdatedBy', width: '10%'}
                ]
            });

            $("#item_count_inprogress").on('bindingcomplete', function(){
                if(GAutoResizeColumns != ''){
                    $("#item_count_inprogress").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                }
            })
        }

        // Complete
        var ItemCountCompleteGrid = function(data){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique',   type: 'int'     },
                    { name: 'Location', type: 'string'  },
                    { name: 'LocationUnique', type: 'int'},
                    { name: 'Comment',  type: 'string'  },
                    { name: 'CountDate',type: 'date'    },
                    { name: 'CountDateTime', type: 'datetime'},
                    { name: 'Created',  type: 'datetime'},
                    { name: 'CreatedBy',type: 'string'  },
                    { name: 'Updated',  type: 'datetime'},
                    { name: 'UpdatedBy',type: 'string'  },
                    { name: 'Category' , type: 'int' },
                    { name: 'SubCategory', type: 'int'},
                    { name: 'SupplierUnique', type: 'int'}
                ],
                localdata: data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_complete").jqxGrid({
                width: '100%',
                height: '100%',
                source: dataAdapter,
                theme			: Gtheme,
                scrollbarsize	: GScrollBarSize,
                rowsheight		: GRowHeight,
                showfilterrow: true,
                filterable: true,
                filterMode: 'advance',
                pageable: true,
                pagermode: 'advanced',
                altrows: true,
                sortable: true,
                ready : function(){
                    if(GAutoResizeColumns != ''){
                        $("#item_count_complete").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                    }
                },
                columns: [
                    { text: 'ID', datafield: 'Unique', width: '5%' },
                    { text: 'Location', datafield: 'Location', width: '10%' },
                    { text: 'Comment', datafield: 'Comment', width: '30%'},
                    { text: 'Count Date', datafield: 'CountDate', cellsformat: 'd', width: '10%'},
                    { text: 'Created', datafield: 'Created', width: '15%'},
                    { text: 'Created By', datafield: 'CreatedBy', width: '10%'},
                    { text: 'Updated', datafield: 'Updated', width: '10%'},
                    { text: 'UpdatedBy', datafield: 'UpdatedBy', width: '10%'}
                ]
            });

            $("#item_count_complete").on('bindingcomplete', function(){
                if(GAutoResizeColumns != ''){
                    $("#item_count_complete").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                }
            })
        }

        var ItemCountListGrid = function(data){
            var WindowHeight = $("#item_count_edit").height();
            var JqxWindowHeight = $(".jqx-window-header").height();
            var buttonfnHeight = $(".btn-function").height();
            var edittabsHeight = $(".jqx-tabs-header").height();
            var enterGap       = 50;
            var CalculateHeight = (WindowHeight - JqxWindowHeight - buttonfnHeight - edittabsHeight - enterGap);
            var GridHeight     = CalculateHeight - 35;

            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique',   type: 'int' },
                    { name: 'CountUnique', type: 'int'},
                    { name: 'ItemUnique', type: 'int'},
                    { name: 'Item',  type: 'string'  },
                    { name: 'Part',type: 'string'    },
                    { name: 'Description',  type: 'string'},
                    { name: 'Supplier',type: 'string'  },
                    { name: 'SupplierPart',  type: 'string'},
                    { name: 'Category',type: 'string'  },
                    { name: 'SubCategory', type: 'string'},
                    { name: 'Cost', type: 'number'},
                    { name: 'CurrentStock', type: 'int'},
                    { name: 'CountStock', type: 'int'},
                    { name: 'Difference', type: 'int'},
                    { name: 'ItemStcokLineUnique', type: 'int'},
                    { name: 'Comment', type: 'string'},
                    { name: 'AdjustedCost', type: 'number'},
                    { name: 'NewCost', type: 'number'},
                    { name: 'CostExtra', type: 'number'},
                    { name: 'CostFreight', type: 'number'},
                    { name: 'CostDuty', type: 'number'},
                    { name: 'Location', type: 'int'},
                    { name: 'LocatioName', type: 'string'},
                    { name: 'Station', type: 'int'},
                    { name: 'btrim', type: 'string'},
                    { name: 'StatusCount', type: 'int'},
                    { name: 'TotalCost', type: 'number'}
                ],
                localdata: data
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_edit_list").jqxGrid({
                width: '100%',
                height: GridHeight,
                source: dataAdapter,
                theme: Gtheme,
                scrollbarsize: GScrollBarSize,
                rowsheight: GRowHeight,
                showfilterrow: true,
                filterable: true,
                filterMode: 'advance',
                editable: true,
                editmode: 'click',
                showaggregates: true,
                showstatusbar: true,
                statusbarheight: 20,
                altrows: true,
                rowsheight: 30,
                sortable: true,
                selectionmode: 'checkbox',
                enablehover: true,
                ready: function(){
                    if(GAutoResizeColumns != ''){
                        $("#item_count_edit_list").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                    }
                },
                columns: [
                    { text: 'Item', datafield: 'Item', width: '10%', filtertype: 'input', editable: false, },
                    { text: 'Barcode', datafield: 'Part', width: '8%', filtertype: 'input', editable: false, },
                    { text: 'Description', datafield: 'Description', width: '20%', filtertype: 'input', editable: false,},
                    { text: 'Supplier', datafield: 'Supplier', cellsformat: 'd', width: '10%', filtertype: 'input', editable: false,},
                    { text: 'Category', datafield: 'Category', width: '10%', filtertype: 'checkedlist', editable: false,},
                    { text: 'Cost', datafield: 'TotalCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', editable: false, filtertype: 'number'},
                    { text: 'Stock', datafield: 'CurrentStock', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: false,
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        } 
                    },
                    { text: 'Count', datafield: 'CountStock', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: true,
                        createeditor: function (row, column, editor) {
                            editor.keypress(validateNumber);
                        },
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                
                                var total = (currentValue) ? currentValue : 0;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";

                            return renderString;
                        } 
                    },
                    { text: 'Difference', datafield: 'Difference', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: false,
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        } 
                    },
                    { text: 'Comment', datafield: 'Comment', editable: true, filtertype: 'input'},
                    { text: 'New Cost', datafield: 'NewCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', filtertype: 'number', editable: false,
                        aggregates: [{
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        } 
                    },
                    { text: 'Adjust Cost', datafield: 'AdjustedCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', filtertype: 'number', editable: false,
                        aggregates: [{ 
                            'Total': function (aggregatedValue, currentValue, column, record) {
                                var total = currentValue;
                                var returnTotal = 0;
                                returnTotal = aggregatedValue + total;
                                return returnTotal;
                            }
                        }],
                        aggregatesRenderer: function (aggregates, column, element) {
                            var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                            var Total=parseFloat(0).toFixed(2);
                            if(aggregates.Total){
                                Total = aggregates.Total;
                            }
                            renderString +=  Total + "</div>";
                            return renderString;
                        } 
                    }
                ]
            });

            $("#item_count_edit_list").on('bindingcomplete', function(){
                if(GAutoResizeColumns != ''){
                    $("#item_count_edit_list").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                }
            })
        }
       
        LocationDataList()
        .then(function(){
            CategoryDataList()
            .then(function(){
                SupplierListData()
                .then(function(){
                    
                })
            })
        })

        var initGrid = function () {
            ItemCountData()
            .then(function(data){
                InProgressGrid(data.inProgress);
            })
        }

        // Tab2
        var initGrid2 = function() {
            ItemCountData()
            .then(function(data){
                ItemCountCompleteGrid(data.Complete);
            })
        }

        // init widgets.
        var initWidgets = function (tab) {
            switch (tab) {
                case 0:
                    initGrid();
                    break;
                case 1:
                    initGrid2();
                    break;
            }
        }

        $('#tabs').jqxTabs({ theme: Gtheme, width: '100%', height: 560,  initTabContent: initWidgets });
        
        var WindowItemCountNew = function(){
            var def = $.Deferred();
            setTimeout(function(){
                $("#item_count").jqxWindow({
                    height: 450,
                    minWidth: '40%',
                    title: "New Item Count",
                    isModal: true,
                    theme: 'darkblue',
                    resizable: false,
                    draggable: false,
                    showCloseButton: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                })
                $("#item_count").jqxWindow('open');
                def.resolve();
            },100);
            return def.promise();
        }

        $scope.openIcount = function(){
             WindowItemCountNew()
             .then(function(){
                setTimeout(function(){
                    $("#item_count_comment").jqxTextArea('focus');
                },100)
            })
        }

        var initNewItemTabs = function(tab){
            switch (tab) {
                case 0:
                    initNewItemTab1();
                    break;
                case 1:
                    initNewItemTab2();
                    break;
            }
        }

        $("#item_count_tabs").on('tabclick', function(event){
            var clickedItem = event.args.item;
            
            if(clickedItem == 0){
                setTimeout(function(){
                    $("#item_count_comment").jqxTextArea('focus');
                },100)
            }
        })

        var initNewItemTab1 = function(){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'LocationName' }
                ],
                localdata: LocationList[0]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", height: 30 });
            $("#item_count_location").val(DefaultLocation);

            $('#item_count_location').on('change', function (event) {
                var args = event.args;
                if (args) {
                    // index represents the item's index.                          
                    var index = args.index;
                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                }
            }); 
        }

        var initNewItemTab2 = function(){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'MainName' }
                ],
                localdata: CategoryList[0]
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_category").jqxComboBox({ source: dataAdapter, displayMember: "MainName", valueMember: "Unique", width: 200, height: 30 });
            $('#item_count_category').on('change', function (event) {
                var args = event.args;
                if (args) {
                    // index represents the item's index.                          
                    var index = args.index;
                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type; // keyboard, mouse or null depending on how the item was selected.

                    var postdata ="CatId="+value;
                    posData.SelectCategory(postdata)
                    .success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique' },
                                { name: 'Name' }
                            ],
                            localdata: data
                        }
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#item_count_sub_category").jqxComboBox({source: dataAdapter});
                    })
                }
            }); 
            $("#item_count_sub_category").jqxComboBox({displayMember: "Name", valueMember: "Unique", width: 200, height: 30 })
            $('#item_count_sub_category').on('change', function (event) {
                var args = event.args;
                if (args) {
                    // index represents the item's index.                          
                    var index = args.index;
                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                }
            }); 

            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'Company' }
                ],
                localdata: SupplierList[0]
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_supplier").jqxComboBox({ source: dataAdapter, displayMember: "Company", valueMember: "Unique", width: 200, height: 30 });
            $('#item_count_supplier').on('change', function (event) {
                var args = event.args;
                if (args) {
                    // index represents the item's index.                          
                    var index = args.index;
                    var item = args.item;
                    // get item's label and value.
                    var label = item.label;
                    var value = item.value;
                    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                }
            }); 
            
            $("#item_count_edit_supplier").jqxComboBox({ source: dataAdapter, displayMember: "Company", valueMember: "Unique", width: 200, height: 30 });
        }

        $(document).on('click', '#btn-close', function(){
            $("#item_count").jqxWindow('close');
            $("#item_count_comment").val('');
            $("#item_count_tabs").jqxTabs('select', 0);
            $("#item_count_location").val(DefaultLocation);
            $("#item_count_category").jqxComboBox('clearSelection'); 
            $("#item_count_sub_category").jqxComboBox('clear'); 
            $("#item_count_supplier").jqxComboBox('clearSelection');
        })

        $("#item_count_tabs").jqxTabs({ theme: 'darkblue', width: '100%', height: 250,  initTabContent: initNewItemTabs });

        var countDate = new Date();
        $("#item_count_countdate").jqxDateTimeInput({ height: '30px', formatString: 'MM/dd/yyyy hh:mm tt' });
        $("#item_count_countdate").jqxDateTimeInput('setDate', countDate);
        $('#item_count_countdate').on('change', function (event) {  
            var jsDate = event.args.date; 
            var type = event.args.type; // keyboard, mouse or null depending on how the date was selected.
        }); 

        $("#item_count_edit_countdate").jqxDateTimeInput({ width: 200, height: '30px', formatString: 'MM/dd/yyyy hh:mm tt' });

        $('#item_count_comment').jqxTextArea({ placeHolder: 'Comment', height: 40, width: 200, minLength: 1 });
        $('#item_count_comment').on('change', function(event) {
            var value = $('#item_count_comment').val();
            var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
        });

        var EditCommentChange = false;
        $('#item_count_edit_comment').jqxTextArea({ placeHolder: 'Comment', height: 40, width: 200, minLength: 1 });
        $('#item_count_edit_comment').on('change', function(event) {
            var value = $('#item_count_edit_comment').val();
            var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
            EditCommentChange = true;
        });

        // Build Item Count
        $("#btn-build-count").on('click', function(e){
            e.preventDefault();
            var LocationUniqueNew= $("#item_count_location").val();
            var CountNewDate     = $("#item_count_countdate").val();
            var CommentNew       = $("#item_count_comment").val(); 
            var Category         = $("#item_count_category").val();
            var SubCategory      = $("#item_count_sub_category").val();
            var Supplier         = $("#item_count_supplier").val();
            var Filters          = {"MainCategory" : Category, "SubCategory" : SubCategory, "SupplierUnique" : Supplier};
            var postdata ="LocationUnique="+LocationUniqueNew;
                postdata+="&CountDate="+CountNewDate;
                postdata+="&Comment="+CommentNew;
                postdata+="&Filters="+JSON.stringify(Filters);
            posData.BuildCountList(postdata)
            .success(function(data){
                if(data.success){
                    ItemCountData()
                    .then(function(data){
                        InProgressGrid(data.inProgress);
                    })
                    $("#item_count").jqxWindow('close');
                    $("#item_count_comment").val('');
                    $("#item_count_tabs").jqxTabs('select', 0);
                    $("#item_count_location").val(DefaultLocation);
                    $("#item_count_category").jqxComboBox('clearSelection'); 
                    $("#item_count_sub_category").jqxComboBox('clear'); 
                    $("#item_count_supplier").jqxComboBox('clearSelection');

                }
            })
        })

        var initEditItemTabs = function(tab){
            switch (tab) {
                case 0:
                    initEditItemTab1();
                    break;
                case 1:
                    initEditItemTab2();
                    break;
                case 2:
                    initEditItemTab3();
                    break;
            }
        }

        var initEditItemTab1 = function(){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'LocationName' }
                ],
                localdata: LocationList[0]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_edit_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", width: 200, height: 30, disabled: true });
        
            $("#item_count_edit_countdate").jqxDateTimeInput({disabled: true});
        }

        var initEditItemTab2 = function(){
            
        }

        var initEditItemTab3 = function(){
            
        }

        var SelectedField = '';
        $("#item_count_edit_list").bind('cellclick', function (event) {
            var datafield = event.args.datafield;
            var cellvalue = args.value;
            var columnindex = args.columnindex;
            var rowBoundIndex = args.rowindex;
            SelectedField = datafield;
        })

        $("#item_count_edit_list").on('cellendedit', function (event) {
            // event arguments.
            var args = event.args;
            // column data field.
            var dataField = event.args.datafield;
            // row's bound index.
            var rowBoundIndex = event.args.rowindex;
            // cell value
            var value = args.value;
            // cell old value.
            var oldvalue = args.oldvalue;
            // row's data.
            var rowdata = args.row;

            if(dataField == 'Comment'){

                if(oldvalue == null && value == ''){
                    
                    return;
                }

                if(oldvalue == value){
                    
                    return;
                }
   
                var ItemGridRowUnique = $("#item_count_edit_list").jqxGrid('getcellvalue', rowBoundIndex, 'Unique');
                
                // If EditItemCount array is not empty [1,2,3]
                if(EditItemCount.length > 0){

                    for(var key in EditItemCount){
                        if(EditItemCount[key].Unique == ItemGridRowUnique){ 
                            EditItemCount[key]["Comment"] = value;
                        }else{

                            var ItemGridRowUnique = $("#item_count_edit_list").jqxGrid('getcellvalue', rowBoundIndex, 'Unique');
                            for(var key in EditItemCount){
                                if(EditItemCount[key].Unique == ItemGridRowUnique){
                                    EditItemCount.splice(key, 1);
                                }
                            }

                            var rowid         = $(this).jqxGrid('getrowid', rowBoundIndex);
                            var NewCount      = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "CountStock");
                            var Difference    = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "Difference");
                            var NewCost       = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "NewCost");
                            var AdjustCost    = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "AdjustedCost");

                            NewCount = (NewCount != '')  ? NewCount : null;
                            // Difference  = (Difference   != '')  ? Difference    : null;
                            // NewCost     = (NewCost      != '')  ? NewCost       : null;
                            // AdjustCost  = (AdjustCost   != '')  ? AdjustCost    : null;

                            EditItemCount.push({
                                "Unique"        : rowdata.Unique, 
                                "CountStock"    : NewCount, 
                                "Difference"    : Difference, 
                                "NewCost"       : NewCost,
                                "AdjustedCost"  : AdjustCost,
                                "Comment"       : value
                            })
                        }
                    }

                }
                // If EditItemCount array is empty []
                else{
                    var rowid = $(this).jqxGrid('getrowid', rowBoundIndex);
                    var NewCount      = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "CountStock");
                    var Difference    = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "Difference");
                    var NewCost       = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "NewCost");
                    var AdjustCost    = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "AdjustedCost");



                    EditItemCount.push({
                        "Unique"        : rowdata.Unique, 
                        "CountStock"    : NewCount, 
                        "Difference"    : Difference, 
                        "NewCost"       : NewCost,
                        "AdjustedCost"  : AdjustCost,
                        "Comment"       : value
                    })
                }

            }else if(dataField == 'CountStock'){

                if(oldvalue == null && value == ''){
                    return;
                }

                if(oldvalue == value){
                    return;
                }

                var ItemGridRowUnique = $("#item_count_edit_list").jqxGrid('getcellvalue', rowBoundIndex, 'Unique');
                for(var key in EditItemCount){
                    if(EditItemCount[key].Unique == ItemGridRowUnique){
                        EditItemCount.splice(key, 1);
                    }
                }

                var rowid = $(this).jqxGrid('getrowid', rowBoundIndex);
                var NewCount    = (value) ? value : null;
                var Cost        = (value) ? rowdata.TotalCost : null;
                var Stock       = (value) ? rowdata.CurrentStock : null;
                var Difference  = (value) ? (NewCount - Stock) : null;
                var NewCost     = (value) ? (Cost * NewCount) : null;
                var AdjustCost  = (value) ? Difference * Cost : null;
                var Comment     = $("#item_count_edit_list").jqxGrid('getcellvalue', rowid, "Comment");
                Comment = (Comment) ? Comment.trim() : null;

                if(value == ''){
                    // Difference 
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "Difference",  null);
                    // New Cost
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "NewCost", null);
                    // Adjusted Cost
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "AdjustedCost", null);
                    // Comment
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "Comment", null);

                    Comment = null;
                }else{
                    // Difference 
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "Difference",  Difference);
                    // New Cost
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "NewCost", NewCost);
                    //  Adjusted Cost
                    $("#item_count_edit_list").jqxGrid('setcellvalue', rowid, "AdjustedCost", AdjustCost);
                }

                // Changes from Item Count List Grid
                EditItemCount.push({
                    "Unique"        : rowdata.Unique, 
                    "CountStock"    : NewCount, 
                    "Difference"    : Difference, 
                    "NewCost"       : NewCost,
                    "AdjustedCost"  : AdjustCost,
                    "Comment"       : Comment
                })
                
            }  
        });

        var WindowItemCountEdit = function(dtitle){
            var def = $.Deferred();
            setTimeout(function(){
                $("#item_count_edit").jqxWindow({
                    minWidth: '99.9%',
                    title: dtitle,
                    isModal: true,
                    theme: 'darkblue',
                    resizable: false,
                    draggable: false,
                    showCloseButton: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                })
                $("#item_count_edit").jqxWindow('open');
            },100);
            return def.promise();
        }

        $("#item_count_inprogress").on('rowdoubleclick', function (event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            var rowdata = $("#item_count_inprogress").jqxGrid('getrowdata', boundIndex);

            ItemCountUnique = rowdata.Unique;

            $("#item_count_edit_tabs").jqxTabs({ theme: 'darkblue', width: '100%', height: 250,  initTabContent: initEditItemTabs });
            
            var countDate = new Date(Date.parse(rowdata.CountDateTime));
            $('#item_count_edit_countdate').jqxDateTimeInput({formatString: 'MM/dd/yyyy hh:mm tt', disabled: true});

            $("#item_count_edit_countdate").jqxDateTimeInput('setDate', countDate);
            
            $("#item_count_edit_comment").val(rowdata.Comment);
            EditCommentChange = false;

            setTimeout(function(){
                $("#item_count_edit_location").val(rowdata.LocationUnique);
            },500);
            WindowItemCountEdit('<span id="btn-deleteItemCount" style="cursor: pointer;" class="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Edit Item Count | ID '+ItemCountUnique + ' | ' +rowdata.Comment);
        })

        $("#btn-edit-close").on('click', function(){
            if(EditItemCount.length > 0 || EditCommentChange == true){
                var msg = "Would you like to save changes?";
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="save_yes" class="btn btn-success btn-lg">Yes</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="save_no" class="btn btn-danger btn-lg">No</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="save_cancel" class="btn btn-warning btn-lg">Cancel</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            }else{

                $("#item_count_edit_tabs").jqxTabs('select', 0);
                $("#item_count_edit_list").jqxGrid('clearSelection');
                $("#item_count_edit").jqxWindow('close');
            }
        })

        $("#btn-save").on('click', function(){
            if(EditItemCount.length > 0 || EditCommentChange == true){
                var convertdata = encodeURIComponent(JSON.stringify(EditItemCount));

                var postdata ="item_count_data="+convertdata;
                    postdata+="&Comment="+$("#item_count_edit_comment").val();
                    postdata+="&CountUnique="+ItemCountUnique;
                posData.ItemCountListSave(postdata)
                .success(function(data){
                    var msg = "New changes saved."; 
                    NumpadAlert(msg)
                    .then(function(){
                        $("#alert_message_function").append(
                            '<button id="alert_message_okay" class="btn btn-danger btn-lg">Close</button>'
                        )
                        WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    })
                    ItemCountData()
                    .then(function(data){
                        InProgressGrid(data.inProgress);
                        ItemCountCompleteGrid(data.Complete);
                    })
                    EditItemCount = [];
                    EditCommentChange = false;
                })
            } 
        })

        $(document).on('click', '#alert_message_okay', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $(document).on('click', '#save_yes', function(e){
            e.preventDefault();
            var postdata ="item_count_data="+JSON.stringify(EditItemCount);
                postdata+="&Comment="+$("#item_count_edit_comment").val();
                postdata+="&CountUnique="+ItemCountUnique;
            posData.ItemCountListSave(postdata)
            .success(function(data){
                $("#alert_message").jqxWindow('close');
                $("#item_count_edit").jqxWindow('close');
                $("#item_count_edit_tabs").jqxTabs('select', 0);
                $("#item_count_edit_list").jqxGrid('clearSelection');

                // ItemCountData();
                ItemCountData()
                .then(function(data){
                    InProgressGrid(data.inProgress);
                    ItemCountCompleteGrid(data.Complete);
                })
                EditItemCount = [];
            }) 
        })

        $(document).on('click', '#save_no', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
            $("#item_count_edit").jqxWindow('close');
            EditItemCount = [];
            EditCommentChange = false;
        })

        $(document).on('click', '#save_cancel', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $("#alert_message").on('close', function(e){
            e.preventDefault();
            $("#alert_message_container").remove();
        })

        // Finish Count
        $("#btn-finish-count").on('click', function(e){
            e.preventDefault();
            var msg = "Are you sure you want to Final Count?";
            NumpadAlert(msg)
            .then(function(){
                $("#alert_message_function").append(
                    '<button id="save_finish_count_yes" class="btn btn-success btn-lg">Yes</button>'+
                    '&nbsp;&nbsp;'+
                    '<button id="save_finish_count_no" class="btn btn-danger btn-lg">No</button>'+
                    '&nbsp;&nbsp;'+
                    '<button id="save_finish_count_cancel" class="btn btn-warning btn-lg">Cancel</button>'
                )
                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
            })
        })

        $(document).on('click', '#finish_count_alert_close', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $(document).on('click', '#save_finish_count_yes', function(e){
            e.preventDefault();
            var rowdata = $("#item_count_edit_list").jqxGrid('getrows');

            if(rowdata.length > 0){
                $("#item_count_edit").block({
                    message: '<h2>Saving data...</h2>', 
                    css: { border: '3px solid #a00' } 
                })

                var newdata = [];
                for(var i=0; i < rowdata.length; i++){
                    if(rowdata[i].CountStock >= 0 && rowdata[i].CountStock != null){
                        newdata.push(rowdata[i]);
                    }
                }
                var convertItems = encodeURIComponent(JSON.stringify(EditItemCount));
                var convertdata = encodeURIComponent(JSON.stringify(newdata));
                var postdata ="ItemCountData="+convertdata;
                    postdata+="&item_count_data="+convertItems;
                    postdata+="&LocationUnique="+$("#item_count_edit_location").val();
                    postdata+="&ItemCountUnique="+ItemCountUnique;
                    postdata+="&Comment="+$("#item_count_edit_comment").val();
                posData.FinishCount(postdata)
                .success(function(data){
                    ItemCountData()
                    .then(function(data){
                        InProgressGrid(data.inProgress);
                        ItemCountCompleteGrid(data.Complete);
                    })

                    $("#item_count_edit").unblock();
                    $("#item_count_edit_tabs").jqxTabs('select', 0);
                    $("#item_count_edit_list").jqxGrid('clearSelection');
                    $("#alert_message").jqxWindow('close');
                    $("#item_count_edit").jqxWindow('close');

                    EditItemCount = [];
                })
                
            }else{
                $("#item_count_edit").unblock();
                var msg ="Cannot Finish Count<br>";
                    msg+="Count list is empty<br>";
                    msg+="Please input or delete count."; 
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="finish_count_alert_close" class="btn btn-success btn-lg">Close</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            }

            /*
            var rowdata = $("#item_count_edit_list").jqxGrid('getrows');
            if(rowdata.length > 0){
                $("#item_count_edit").block({
                    message: '<h2>Processing...</h2>', 
                    css: { border: '3px solid #a00' } 
                })

                var convertdata = encodeURIComponent(JSON.stringify(EditItemCount));
                var postdata ="item_count_data="+convertdata;
                    postdata+="&ItemCountUnique="+ItemCountUnique;
                posData.ItemCountListSave(postdata)
                .success(function(data){
                    ItemCountData();
                    $("#alert_message").jqxWindow('close');
                    EditItemCount = [];
                })
            } 
            */
        })

        $(document).on('click', '#save_finish_count_no', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
            $("#item_count_edit").jqxWindow('close');
            $("#item_count_edit_tabs").jqxTabs('select', 0);
            $("#item_count_edit_list").jqxGrid('clearSelection');
            EditItemCount = [];
        })

        $(document).on('click', '#save_finish_count_cancel', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $("#item_count_edit").on('close', function(){
            $('#item_count_edit_tabs').jqxTabs('select', 0); 
            $('#item_count_edit_list').jqxGrid('clear');
            $(".edit-fn").hide();
        })
        
        $("#btn-close").on('click', function(e){
            e.preventDefault();
            $("#item_count_tabs").jqxTabs('select', 0);
            $("#item_count_category").val('');
            $("#item_count_sub_category").val('');
            $("#item_count_supplier").val('');
            $("#item_count_comment").val('');
            
            $("#item_count_category").jqxGrid('clearSelection');
            $("#item_count_sub_category").jqxComboBox('clear');
        })

        $('#item_count_edit_tabs').on('tabclick', function (event) { 
            var clickedItem = event.args.item;
            
            // Count 
            if(clickedItem == 0){
                $(".edit-fn").hide();
            // Filters
            }else if(clickedItem == 1){
                var selectedItem = $('#item_count_edit_tabs').jqxTabs('selectedItem');
                if(selectedItem != 1){
                    $(".edit-fn").hide();

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique' },
                            { name: 'MainName' }
                        ],
                        localdata: CategoryList[0]
                    }
                    var dataAdapter = new $.jqx.dataAdapter(source);
        
                    $("#item_count_edit_category").jqxComboBox({ source: dataAdapter, displayMember: "MainName", valueMember: "Unique", width: 200, height: 30, disabled: true });
                    
                    $('#item_count_edit_category').on('change', function (event) {
                        var args = event.args;
                        if (args) {
                            // index represents the item's index.                          
                            var index = args.index;
                            var item = args.item;
                            // get item's label and value.
                            var label = item.label;
                            var value = item.value;
                            var type = args.type; // keyboard, mouse or null depending on how the item was selected.
        
                            var postdata ="CatId="+value;
                            posData.SelectCategory(postdata)
                            .success(function(data){
                                var source = {
                                    datatype: "json",
                                    datafields: [
                                        { name: 'Unique' },
                                        { name: 'Name' }
                                    ],
                                    localdata: data
                                }
                                var dataAdapter = new $.jqx.dataAdapter(source);
    
                                $("#item_count_edit_sub_category").jqxComboBox({source: dataAdapter, displayMember: "Name", valueMember: "Unique", width: 200, height: 30, disabled: true });
                            })
                        }
                    }); 
                    
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'Unique' },
                            { name: 'Company' }
                        ],
                        localdata: SupplierList[0]
                    }
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#item_count_edit_supplier").jqxComboBox({ source: dataAdapter, displayMember: "Company", valueMember: "Unique", width: 200, height: 30, disabled: true });
                    
                    var rowindex = $('#item_count_inprogress').jqxGrid('getselectedrowindex');

                    var  rowdata = $("#item_count_inprogress").jqxGrid('getrowdata', rowindex);
                    
                    $("#item_count_edit_category").jqxComboBox('val', rowdata.Category);

                    setTimeout(function(){
                        $("#item_count_edit_sub_category").val(rowdata.SubCategory);
                    },100)

                    $("#item_count_edit_sub_supplier").val(rowdata.SupplierUnique);
                }
            // Count List
            }else if(clickedItem == 2){
                var selectedItem = $('#item_count_edit_tabs').jqxTabs('selectedItem');
               
                if(selectedItem != 2){

                    $("#item_count_edit").block({
                        message: '<h2>Loading data...</h2>', 
                        css: { border: '3px solid #a00' } 
                    })

                    $(".edit-fn").show();

                    var WindowHeight = $("#item_count_edit").height();
                    var JqxWindowHeight = $(".jqx-window-header").height();
                    var buttonfnHeight = $(".btn-function").height();
                    var edittabsHeight = $(".jqx-tabs-header").height();
                    var enterGap       = 50;
                    var CalculateHeight = (WindowHeight - JqxWindowHeight - buttonfnHeight - edittabsHeight - enterGap);
                    var GridHeight     = CalculateHeight - 35;
                    
                    $("#item_count_edit_tabs").jqxTabs({ height: CalculateHeight});
                    
                    // if(EditItemCount.length > 0){
                    //     $("#item_count_edit").unblock();
                    // }else{
                        var postdata ="ItemCountUnique="+ItemCountUnique;
                        posData.GetItemList(postdata)
                        .success(function(data){
                            ItemCountListGrid(data);
                        })
                    // }
                }
            }
        }); 

        $("#item_count_edit_list").on("bindingcomplete", function (event) {
            // your code here.
            $("#item_count_edit").unblock();
        });

        $("#btn-zero-not-counted").on('click', function(){
            $("#item_count_edit").block({
                message: '<h2>Processing...</h2>', 
                css: { border: '3px solid #a00' } 
            })
            var rowdata = $("#item_count_edit_list").jqxGrid('getrows');
            if(rowdata.length > 0){
                var convertdata = encodeURIComponent(JSON.stringify(EditItemCount));
                var postdata ="ItemCountUnique="+ItemCountUnique;
                    postdata+="&item_count_data="+convertdata;
                posData.ZeroNotCounted(postdata)
                .success(function(data){    
                    $("#item_count_edit").unblock();
                    var postdata ="ItemCountUnique="+ItemCountUnique;
                    posData.GetItemList(postdata)
                    .success(function(data){
                        ItemCountListGrid(data);
                    })
                    EditItemCount = [];
                })
            }else{
                $("#item_count_edit").unblock();
                var msg ="Cannot Zero Not Counted<br>";
                    msg+="Count list is empty.";
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="zero_not_counted_close" class="btn btn-success btn-lg">Close</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            } 
        })

        $(document).on('click', '#zero_not_counted_close', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $("#btn-delete-item").on('click', function(e){
            e.preventDefault();
            var selected = $("#item_count_edit_list").jqxGrid('getselectedrowindexes');
            if(selected.length > 0){
                var record = ' '+selected.length + 'record';
                if(selected.length > 1){
                    record = ' '+selected.length + 'records';
                }
                var msg = "Are you sure you want to delete "+record+'?';
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="delete_yes" class="btn btn-success btn-lg">Yes</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="delete_no" class="btn btn-danger btn-lg">No</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="delete_cancel" class="btn btn-warning btn-lg">Cancel</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            }else{
                var msg = "Please select Item Count first.";
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="delete_item_count_close" class="btn btn-success btn-lg">Close</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            }
        })

        $(document).on('click', '#delete_item_count_close', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $(document).on('click', '#delete_yes', function(e){
            e.preventDefault();
            var CheckedItems = [];
            var CheckedItemsId = [];
            var selected = $("#item_count_edit_list").jqxGrid('getselectedrowindexes');
            for(var i=0; i < selected.length; i++){
                var selectedRowData = $('#item_count_edit_list').jqxGrid('getrowdata', selected[i]);
                CheckedItemsId.push(selectedRowData.uid);
                CheckedItems.push(selectedRowData);
            }
            var posdata ="CheckedItems="+JSON.stringify(CheckedItems);
            posData.DeleteCheckedItems(posdata)
            .success(function(data){
                $('#item_count_edit_list').jqxGrid('deleterow', CheckedItemsId);
                $('#item_count_edit_list').jqxGrid('clearselection');
                $("#alert_message").jqxWindow('close');
            })    
        })

        $(document).on('click', '#delete_no', function(e){
            e.preventDefault();
            $('#item_count_edit_list').jqxGrid('clearselection');
            $("#alert_message").jqxWindow('close');
        })

        $(document).on('click', '#delete_cancel', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $(document).on('click', "#btn-deleteItemCount", function(e){
            e.preventDefault();
            var msg = "Are you sure you want to delete ID "+ItemCountUnique+"?";
            NumpadAlert(msg)
            .then(function(){
                $("#alert_message_function").append(
                    '<button id="delete_count_yes" class="btn btn-success btn-lg">Yes</button>'+
                    '&nbsp;&nbsp;'+
                    '<button id="delete_count_no" class="btn btn-danger btn-lg">No</button>'+
                    '&nbsp;&nbsp;'+
                    '<button id="delete_count_cancel" class="btn btn-warning btn-lg">Cancel</button>'
                )
                WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
            })
        })

        $(document).on('click', '#delete_count_yes', function(e){
            e.preventDefault();
            var postdata ="ItemCountUnique="+ItemCountUnique;
            posData.DeleteCount(postdata)
            .success(function(data){
                var rowindex = $('#item_count_inprogress').jqxGrid('getselectedrowindex');
                var rowid = $('#item_count_inprogress').jqxGrid('getrowid', rowindex);
                $('#item_count_inprogress').jqxGrid('deleterow', rowid);
                $("#alert_message").jqxWindow("close");
                $("#item_count_edit").jqxWindow('close');
            })
            EditItemCount = [];
        })

        $(document).on('click', '#delete_count_no', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow("close");
            $("#item_count_edit").jqxWindow('close');
            EditItemCount = [];
        })

        $(document).on('click', '#delete_count_cancel', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow("close");
        })


        // Item Complete
        var WindowItemCountComplete = function(dtitle){
            var def = $.Deferred();
            setTimeout(function(){
                $("#item_count_complete_window").jqxWindow({
                    minWidth: '99.9%',
                    title: dtitle,
                    isModal: true,
                    theme: 'darkblue',
                    resizable: false,
                    draggable: false,
                    showCloseButton: false,
                    showAnimationDuration: 0,
                    closeAnimationDuration: 0
                })
                $("#item_count_complete_window").jqxWindow('open');
            },100);
            return def.promise();
        }

        var initItemCompleteTabs = function(tab){
            switch (tab) {
                case 0:
                    initItemCompleteTab1();
                    break;
                case 1:
                    initItemCompleteTab2();
                    break;
                case 2:
                    initItemCompleteTab3();
                    break;
            }
        }

        var initItemCompleteTab1 = function(){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'LocationName' }
                ],
                localdata: LocationList[0]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_complete_location").jqxComboBox({ source: dataAdapter, displayMember: "LocationName", valueMember: "Unique", height: 30, disabled: true });
        }

        var initItemCompleteTab2 = function(){
            
        }

        var initItemCompleteTab3 = function(){
            
        }

        // Item Complete Process
        $("#item_count_complete").on('rowdoubleclick', function (event){
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            var rowdata = $("#item_count_complete").jqxGrid('getrowdata', boundIndex);

            ItemCountUnique = rowdata.Unique;

            $("#item_count_complete_tabs").jqxTabs({ theme: 'darkblue', width: '100%', height: 250,  initTabContent: initItemCompleteTabs });
            
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'MainName' }
                ],
                localdata: CategoryList[0]
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            // Category
            $("#item_count_complete_category").jqxComboBox({ source: dataAdapter, displayMember: "MainName", valueMember: "Unique", width: 200, height: 30, disabled: true });
            // Sub Category
            $("#item_count_complete_sub_category").jqxComboBox({displayMember: "Name", valueMember: "Unique", width: 200, height: 30, disabled: true });
            // Supplier
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'Company' }
                ],
                localdata: SupplierList[0]
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#item_count_complete_supplier").jqxComboBox({ source: dataAdapter, displayMember: "Company", valueMember: "Unique", width: 200, height: 30, disabled: true });

            $('#item_count_complete_comment').jqxTextArea({ placeHolder: 'Comment', height: 40, width: 200, minLength: 1 });
            $('#item_count_complete_comment').on('change', function(event) {
                var value = $('#item_count_complete_comment').val();
                var type = event.args.type; // keyboard, mouse or null depending on how the value was changed.
                EditCommentChange = true;
            });

            setTimeout(function(){
                $("#item_count_complete_location").val(rowdata.LocationUnique);
                var countDate = new Date(Date.parse(rowdata.CountDateTime));
                $('#item_count_complete_countdate').jqxDateTimeInput({formatString: 'MM/dd/yyyy hh:mm tt', disabled: true});
                $("#item_count_complete_countdate").jqxDateTimeInput('setDate', countDate);
                $("#item_count_complete_comment").val(rowdata.Comment);
                EditCommentChange = false;
            },500);

            WindowItemCountComplete('Complete Item Count | ID '+ItemCountUnique + ' | ' +rowdata.Comment);
        })

        $("#item_count_complete_tabs").on('tabclick', function(event){
            var clickedItem = event.args.item;
            if(clickedItem == 0){
                $(".edit-fn").hide();
            // Filters
            }else if(clickedItem == 1){
                var selectedItem = $('#item_count_complete_tabs').jqxTabs('selectedItem');
                if(selectedItem != 1){
                    $(".edit-fn").hide();
                    
                    var rowindex = $('#item_count_complete').jqxGrid('getselectedrowindex');
                    var rowdata = $("#item_count_complete").jqxGrid('getrowdata', rowindex);
                    $("#item_count_complete_category").val(rowdata.Category);
                    $("#item_count_complete_sub_category").val(rowdata.SubCategory);
                    $("#item_count_complete_sub_supplier").val(rowdata.SupplierUnique);
                    EditCommentChange = false; 
                }
            // Count List
            }else if(clickedItem == 2){
                var selectedItem = $('#item_count_complete_tabs').jqxTabs('selectedItem');
                if(selectedItem != 2){

                    $("#item_count_complete_window").block({
                        message: '<h2>Loading data...</h2>', 
                        css: { border: '3px solid #a00' } 
                    })

                    $(".edit-fn").show();

                    var WindowHeight = $("#item_count_complete_window").height();
                    var JqxWindowHeight = $(".jqx-window-header").height();
                    var buttonfnHeight = $(".btn-function").height();
                    var edittabsHeight = $(".jqx-tabs-header").height();
                    var enterGap       = 50;
                    var CalculateHeight = (WindowHeight - JqxWindowHeight - buttonfnHeight - edittabsHeight - enterGap);
                    var GridHeight     = CalculateHeight - 35;
                    
                    $("#item_count_complete_tabs").jqxTabs({ height: CalculateHeight});
        
                    $("#item_count_complete_window").unblock();
                    
                    var postdata ="ItemCountUnique="+ItemCountUnique;
                    posData.GetItemList(postdata)
                    .success(function(data){
                        var source = {
                            datatype: "json",
                            datafields: [
                                { name: 'Unique',   type: 'int' },
                                { name: 'CountUnique', type: 'int'},
                                { name: 'ItemUnique', type: 'int'},
                                { name: 'Item',  type: 'string'  },
                                { name: 'Part',type: 'string'    },
                                { name: 'Description',  type: 'string'},
                                { name: 'Supplier',type: 'string'  },
                                { name: 'SupplierPart',  type: 'string'},
                                { name: 'Category',type: 'string'  },
                                { name: 'SubCategory', type: 'string'},
                                { name: 'Cost', type: 'number'},
                                { name: 'CurrentStock', type: 'int'},
                                { name: 'CountStock', type: 'int'},
                                { name: 'Difference', type: 'int'},
                                { name: 'ItemStcokLineUnique', type: 'int'},
                                { name: 'Comment', type: 'string'},
                                { name: 'AdjustedCost', type: 'number'},
                                { name: 'NewCost', type: 'number'},
                                { name: 'CostExtra', type: 'number'},
                                { name: 'CostFreight', type: 'number'},
                                { name: 'CostDuty', type: 'number'},
                                { name: 'Location', type: 'int'},
                                { name: 'LocatioName', type: 'string'},
                                { name: 'Station', type: 'int'},
                                { name: 'btrim', type: 'string'},
                                { name: 'StatusCount', type: 'int'},
                                { name: 'TotalCost', type: 'number'}
                            ],
                            localdata: data
                        };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#item_count_complete_list").jqxGrid({
                            width: '100%',
                            height: GridHeight,
                            source: dataAdapter,
                            theme: Gtheme,
                            scrollbarsize: GScrollBarSize,
                            rowsheight: GRowHeight,
                            showfilterrow: true,
                            filterable: true,
                            filterMode: 'advance',
                            editable: false,
                            editmode: 'click',
                            showaggregates: true,
                            showstatusbar: true,
                            statusbarheight: 20,
                            altrows: true,
                            sortable: true,
                            // selectionmode: 'checkbox',
                            enablehover: true,
                            ready : function(){
                                if(GAutoResizeColumns != ''){
                                    $("#item_count_complete_list").jqxGrid('autoresizecolumns', GAutoResizeColumns);
                                }
                            },
                            columns: [
                                { text: 'Item', datafield: 'Item', width: '10%', filtertype: 'input', editable: false, },
                                { text: 'Barcode', datafield: 'Part', width: '8%', filtertype: 'input', editable: false, },
                                { text: 'Description', datafield: 'Description', width: '20%', filtertype: 'input', editable: false,},
                                { text: 'Supplier', datafield: 'Supplier', cellsformat: 'd', width: '10%', filtertype: 'input', editable: false,},
                                { text: 'Category', datafield: 'Category', width: '10%', filtertype: 'checkedlist', editable: false,},
                                { text: 'Cost', datafield: 'TotalCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', editable: false, filtertype: 'number'},
                                { text: 'Stock', datafield: 'CurrentStock', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: false,
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                                        var Total=parseFloat(0);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    } 
                                },
                                { text: 'Count', datafield: 'CountStock', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: true,
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                                        var Total=parseFloat(0);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    } 
                                },
                                { text: 'Difference', datafield: 'Difference', width: '5%', align: 'right', cellsalign: 'right', filtertype: 'number', editable: false,
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                                        var Total=parseFloat(0);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    } 
                                },
                                { text: 'Comment', datafield: 'Comment', editable: true, filtertype: 'input'},
                                { text: 'New Cost', datafield: 'NewCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', filtertype: 'number', editable: false,
                                    aggregates: [{
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                                        var Total=parseFloat(0).toFixed(2);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    } 
                                },
                                { text: 'Adjust Cost', datafield: 'AdjustedCost', width: '5%', align: 'right', cellsalign: 'right', cellsformat: 'd2', filtertype: 'number', editable: false,
                                    aggregates: [{ 
                                        'Total': function (aggregatedValue, currentValue, column, record) {
                                            var total = currentValue;
                                            var returnTotal = 0;
                                            returnTotal = aggregatedValue + total;
                                            return returnTotal;
                                        }
                                    }],
                                    aggregatesRenderer: function (aggregates, column, element) {
                                        var renderString = "<div style='margin: 4px; number: right;  height: 100%; font-weight: bold;'>";
                                        var Total=parseFloat(0).toFixed(2);
                                        if(aggregates.Total){
                                            Total = aggregates.Total;
                                        }
                                        renderString +=  Total + "</div>";
                                        return renderString;
                                    } 
                                }
                            ]
                        });
                    })
                }
            }
        })

        $(document).on('click', '#btn-item-count-complete-close', function(e){
            e.preventDefault();
            if(EditCommentChange == true){
                var msg = "Would you like to save changes?";
                NumpadAlert(msg)
                .then(function(){
                    $("#alert_message_function").append(
                        '<button id="save_complete_yes" class="btn btn-success btn-lg">Yes</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="save_complete_no" class="btn btn-danger btn-lg">No</button>'+
                        '&nbsp;&nbsp;'+
                        '<button id="save_complete_cancel" class="btn btn-warning btn-lg">Cancel</button>'
                    )
                    WindowPopupAlert('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                })
            }else{
                $("#item_count_complete_window").jqxWindow('close');
            }
        })

        $(document).on('click', '#save_complete_yes', function(e){
            e.preventDefault();
            var CompleteComment = $("#item_count_complete_comment").val();
            var postdata ="CountUnique="+ItemCountUnique;
                postdata+="&Comment="+CompleteComment;
            posData.CompleteChangesSave(postdata)
            .success(function(data){
                ItemCountData()
                .then(function(data){
                    ItemCountCompleteGrid(data.Complete);
                })
                $("#alert_message").jqxWindow('close');
                $("#item_count_complete_window").jqxWindow('close');
            })
        })

        $(document).on('click', '#save_complete_no', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
            $("#item_count_complete_comment").val('');
            $("#item_count_complete_window").jqxWindow('close');
        })

        $(document).on('click', '#save_complete_cancel', function(e){
            e.preventDefault();
            $("#alert_message").jqxWindow('close');
        })

        $("#item_count_complete_window").on('close', function(e){
            e.preventDefault();
            $("#item_count_complete_tabs").jqxTabs('select', 0);
            EditCommentChange = false
        })

    }])

})()
