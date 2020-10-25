(function() {
    angular.module("akamaiposApp", ['ngRoute', 'ngSanitize'])
    .service('svc',function(){})
    .controller("akamaiposController",['$scope', '$http', 'svc', '$routeParams', '$q', 'recipeData', '$window', '$filter', '$compile', '$rootScope',  function ($scope, $http, svc, $routeParams, $q, recipeData, $window, $filter, $compile, $rootScope) {

        // Splash Screen
        $.SplashScreen({
            id: 'splashscreen',
            desktop: true,
            mobile: true,
            forceLoader: false,
            queryParameter: 'loader',
            progressCount: true,
            progressCountId: 'status',
            progressBar: true,
            progressBarId: 'progress',
            fadeEffect: true,
            timeToFade: 1000, // in milliseconds (eg: 1000 = 1sec)
            timeOut: 1000,   // in milliseconds (eg: 2000 = 2sec)
            label: $("#module_title").val()
        });

        var GlobalParentID = null;

        recipeData.GetListItems()
        .success(function(data){
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'ID', type: 'int' },
                    { name: 'Description', type: 'string' },
                    { name: 'Category', type: 'string'},
                    { name: 'SubCategory', type: 'string'},
                    { name: 'ListPrice', type: 'float'},
                    { name: 'Price1', type: 'float'}
                ],
                localdata: data.items
            };
            
            var dataAdapter = new $.jqx.dataAdapter(source);

            var FakeHeight = $("#fakeheight").height();
            var NavbarHeight = $('.navbar').height();
            var useHeight = (FakeHeight - NavbarHeight) - 40;
            $("#grid_items").jqxGrid({
                width: '100%',
                height: useHeight,
                source: dataAdapter,
                sortable: true,
                altRows: true,
                theme			: Gtheme,
                scrollbarsize	: GScrollBarSize,
                rowsheight		: GRowHeight,
                columnsresize: true,
                showfilterrow: true,
                filterable: true,
                filterMode: 'simple',
                ready : function(){
                    
                },
                columns: [
                    { text: 'ID', datafield: 'ID', width: '10%' },
                    { text: 'Description', datafield: 'Description', width: '50%' },
                    { text: 'Category', datafield: 'Category', width: '20%', filtertype: 'checkedlist' },
                    { text: 'SubCategory', datafield: 'SubCategory', width: '20%', filtertype: 'checkedlist' }
                ]
            });


            $('#grid_items').on('rowselect', function (event) {
                // event arguments.
                var args = event.args;
                // row's bound index.
                var rowBoundIndex = args.rowindex;
                // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
                var rowData = args.row;

                GlobalParentID = rowData.ID;
                var ListPrice = parseFloat(rowData.ListPrice).toFixed(2);
                var SellPrice = parseFloat(rowData.Price1).toFixed(2);

                $("#ParentItemListPrice").text(ListPrice);
                $("#ParentItemSellPrice").text(SellPrice);
                $("#jqx-items").val('');
                $("#jqx-quantity").val('');
                $("#jqx-items").jqxComboBox('clearSelection');

                RecipeGrid(rowData.ID)
                .then(function(){
                    TotalSection();
                })
            });


            var itemsource = {
                datatype: "json",
                datafields: [
                    { name: 'ID' },
                    { name: 'Description' }
                ],
                localdata: data.items
            }

            var dataAdapteritemsource = new $.jqx.dataAdapter(itemsource);

            $("#jqx-items").jqxComboBox({ source: dataAdapteritemsource, placeHolder: "Item Name", displayMember: "Description", valueMember: "ID", width: 160, height: 30}); 
            $("#jqx-quantity").jqxNumberInput({placeHolder: "Quantity", width: '100px', height: '30px', inputMode: 'simple', spinButtons: false, decimalDigits : 4 });
            $("#jqx-input-sellby").jqxInput({ width: 80, height: 30, disabled: true});
        })

        var recipe_total_height = ''; 
        var RecipeGrid = (Unique) => {
            var def = $.Deferred();

            var FakeHeight = $("#fakeheight").height();
            var NavbarHeight = $('.navbar').height();
            var NavbarRecipe = $("#aknav-recipe").height();
            var compute1 = (FakeHeight - NavbarHeight) - NavbarRecipe;
            var compute2 = (compute1 - NavbarHeight);
            var compute3 = (compute2 / 2);
            var compute4 = (compute3 / 2);
            var useHeight = (compute3 + compute4);
            recipe_total_height = compute4;

            var postdata ="ParentUnique="+Unique;
            recipeData.GetListRecipeItems(postdata)
            .success(function(data){
                var recipe = {
                    datatype: "json",
                    datafields: [
                        { name: 'KitUnique', type: 'int' },
                        { name: 'ParentUnique', type: 'int'},
                        { name: 'ParentDescription', type: 'string' },
                        { name: 'ChildUnique', type: 'int'},
                        { name: 'ChildDescription', type: 'string'},
                        { name: 'ChildKitQuantity', type: 'number'},
                        { name: 'OrderUnitCost', type: 'number'},
                        { name: 'SellBy', type: 'string'},
                        { name: 'ChildKitCost', type: 'number'},
                        { name: 'ChildCost', type: 'number'},
                        { name: 'OrderBy', type: 'string'},
                        { name: 'OrderByQty', type: 'number'},
                        { name: 'ChildKitCost', type: 'number'},
                        { name: 'ChildSupplierUnique', type: 'int'}
                    ],
                    localdata: data.item_list
                };
                
                var dataAdapterRecipe = new $.jqx.dataAdapter(recipe);

                $("#grid_item_recipe").jqxGrid({
                    width: '100%',
                    height: useHeight,
                    theme			: Gtheme,
                    scrollbarsize	: GScrollBarSize,
                    rowsheight		: GRowHeight,
                    showstatusbar: true,
                    source: dataAdapterRecipe,
                    ready : function(){
                        
                    },
                    renderstatusbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var editButton = $("<div style='float: left; margin-left: 5px;' id='recipe_grid_edit'>Edit</div>");
                        container.append(editButton);
                        statusbar.append(container);
                        editButton.jqxButton({  width: 60, height: 20, disabled : true });
                        // add new row.
                        editButton.click(function (event) {
                            var disabled = editButton.jqxButton('disabled');
                            if(disabled){
                                return false;
                            }else{
                                var rowindex = $('#grid_item_recipe').jqxGrid('getselectedrowindex');
                                var rowid = $('#grid_item_recipe').jqxGrid('getrowid', rowindex);
                                var data = $('#grid_item_recipe').jqxGrid('getrowdatabyid', rowid);

                                callItemEditForm(data);
                            }
                        });
                    },
                    columns: [
                        { text: 'Description', datafield: 'ChildDescription', width: '35%' },
                        { text: 'SellBy', datafield: 'SellBy', width: '20%' },
                        { text: 'Unit Cost', datafield: 'ChildCost', width: '15%', align: 'right', cellsalign: 'right', cellsformat: 'd2' },
                        { text: 'Quantity', datafield: 'ChildKitQuantity', width: '15%', align: 'right', cellsalign: 'right', cellsformat: 'd4' },
                        { text: 'Cost', datafield: 'ChildKitCost', width: '15%', align: 'right', cellsalign: 'right', cellsformat: 'd4' }
                    ]
                })


                $("#recipe_grid_edit").jqxButton({disabled : true});

                $("#grid_item_recipe").jqxGrid('clearSelection');
                
                $("#grid_item_recipe").on('rowselect', function (event) {
                    // event arguments.
                    var args = event.args;
                    // row's bound index.
                    var rowBoundIndex = args.rowindex;
                    // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
                    var rowData = args.row;

                    //$('#jqx-items').jqxInput('val', {label: rowData.ChildDescription, value: rowData.ChildUnique});
                    $('#jqx-items').val(rowData.ChildUnique);
                    $("#jqx-quantity").val(rowData.ChildKitQuantity);
                    $("#jqx-input-sellby").val(rowData.SellBy);

                    $("#recipe_grid_edit").jqxButton('val', 'Edit '+rowData.ChildDescription);
                    $("#recipe_grid_edit").jqxButton({disabled : false, width: 'auto' });
                })

                def.resolve();
            })

            $("#total_item_kit").css({height : recipe_total_height})

            return def.promise();
        }

        RecipeGrid(GlobalParentID);
        
        
        $("#recipe_item_save").on('click', function(){
            var ChildItem = $("#jqx-items").val();
            var Qty = $("#jqx-quantity").val();

            ChildItem = $("#jqx-items").jqxComboBox('getItemByValue', ChildItem);
           
            if(GlobalParentID != null){
            
                if(!ChildItem){
                    // console.log("Please select item");
                    callNotification('Message', 'Please select item name.');
                    return false;
                }

                if(Qty == 0){
                    // console.log("Please add Quantity");
                    callNotification('Message', 'Please add Quantity.');
                    return false;
                }

                if(Qty < 0){
                    callNotification('Message', 'Quantity cannot be negative.');
                    return false;
                }

                var GIrowindex = $("#grid_items").jqxGrid('getselectedrowindex');
                var GIrowid = $('#grid_items').jqxGrid('getrowid', GIrowindex);
                var GIrowdata = $('#grid_items').jqxGrid('getrowdatabyid', GIrowid);

                var rowindex = $('#grid_item_recipe').jqxGrid('getselectedrowindex');
                var rowid = $('#grid_item_recipe').jqxGrid('getrowid', rowindex);
                var data = $('#grid_item_recipe').jqxGrid('getrowdatabyid', rowid);
                var action = 'new';

                if(rowid != null){
                    action = 'edit';

                    var postdata ="ParentUnique="+GlobalParentID;
                        postdata+="&Quantity="+Qty;
                        postdata+="&ChildUnique="+ChildItem.value;
                        postdata+="&KitUnique="+data.KitUnique;
                        postdata+="&action="+action;

                }else{
                    action = 'new';
                    var postdata ="ParentUnique="+GlobalParentID;
                        postdata+="&Quantity="+Qty;
                        postdata+="&ChildUnique="+ChildItem.value;
                        postdata+="&action="+action;
                }

                recipeData.SaveItemRecipe(postdata)
                .success(function(jdata){
                    if(jdata.status == 'Insert'){
                        RecipeGrid(GlobalParentID)
                        .then(function(){
                            TotalSection();
                            //Toast message
                            callNotification('Message', jdata.msg);
                        })
                    }else if(jdata.status == 'Update'){
                        RecipeGrid(GlobalParentID)
                        .then(function(){
                            TotalSection();
                            //Toast message
                            callNotification('Message', GIrowdata.Description+' successfully updated');
                        })
                    }
                    action = 'new';
                    $("#jqx-items").val('');
                    $("#jqx-quantity").val(0);
                    $("#jqx-items").jqxComboBox('clearSelection');
                })
                
            }else{
                $(".toast").show();
                $(".toast").toast('show');
                callNotification('Message', 'Please select menu item first');
            }
        })

        $("#recipe_item_remove").on('click', function(){
            var rowindex = $('#grid_item_recipe').jqxGrid('getselectedrowindex');
            var rowid = $('#grid_item_recipe').jqxGrid('getrowid', rowindex);
            var data = $('#grid_item_recipe').jqxGrid('getrowdatabyid', rowid);

            if(rowid >= 0){
                 callNotification('Message', 'Are you sure you want to delete '+data.ChildDescription+'?')
                 .then(function(){
                    $(".notification-body").append(
                        '<div style="width: 100%; text-align: right;">'+
                            '<button class="btn btn-danger" id="confirm_item_remove_yes">Yes</button>&nbsp;'+
                            '<button class="btn btn-info" id="confirm_item_remove_no">No</button>'+
                        '</div>'
                    );
                 })
                 
            }else{
                callNotification('Message', 'Please select Item to delete');
            }
        })

        $(document).on('click', '#confirm_item_remove_yes', function(){
            var rowindex = $('#grid_item_recipe').jqxGrid('getselectedrowindex');
            var rowid = $('#grid_item_recipe').jqxGrid('getrowid', rowindex);
            var data = $('#grid_item_recipe').jqxGrid('getrowdatabyid', rowid);

            var postdata ="Unique="+data.KitUnique;
                postdata+="&item_data="+JSON.stringify(data);
            recipeData.RemoveItemRecipe(postdata)
            .success(function(jdata){
                if(jdata.success){
                    RecipeGrid(GlobalParentID)
                    .then(function(){
                        $("#jqx-items").val('');
                        $("#jqx-quantity").val('');
                        TotalSection();
                    })
                    callNotification('Message', 'Item '+ jdata.result.ChildDescription + ' deleted!');
                    $("#notification").jqxWindow('close');
                    console.log("Item "+jdata.result.KitUnique, jdata.result.ChildDescription + ' deleted!');
                }else{
                    console.log("cannot delete");
                }
            })
        })

        $(document).on('click', '#confirm_item_remove_no', function(){
            $("#notification").jqxWindow('close');
        })

        var populateNotification = (msg) => {
            var def = $.Deferred();
            setTimeout(function(){
                $("body").append(
                    '<div id="notification" style="background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000; display: none;">'+
                        '<div role="alert">'+
                            '<div class="toast-header">'+
                                '<strong class="mr-auto">Message</strong>'+
                                '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">'+
                                '<span aria-hidden="true" id="close_notification">&times;</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="toast-body notification-body">'+
                                '<h4>'+msg+'</h4>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );

                def.resolve();
            },100);
            return def.promise();
        }

        var windowNotification = (showtitle) => {
            var def = $.Deferred();
            $("#notification").jqxWindow({
                height: 230,
			    width: 300,
                title: '&nbsp;',
				isModal: true,
				theme: 'darkblue',
				draggable: false,
                resizable: false,
				showCloseButton: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
            })

            setTimeout(function(){
                $("#notification").jqxWindow('open');

                $("#notification").on('close', function(){
                    $(this).jqxWindow('destroy');
                    $(this).remove();
                })

                def.resolve();
            },100);
            return def.promise();
        }

        var callNotification = (title, msg) => {
            var def = $.Deferred();
            populateNotification(msg)
            .then(function(){
                windowNotification(title)
                .then(function(){
                    def.resolve();
                })
            })
            return def.promise();
        }

        $(document).on('click', '#close_notification', function(){
            $("#notification").jqxWindow('close');
        })

        var TotalSection = () => {
            var rows = $('#grid_item_recipe').jqxGrid('getrows');
            var totalUnitCost = 0;
            var totalQuantity = 0;
            for(var i=0; i < rows.length; i++){
                totalUnitCost += rows[i].ChildKitCost;
                totalQuantity += rows[i].ChildKitQuantity;
            }

            var totalCost = parseFloat(totalUnitCost * totalQuantity).toFixed(2);
            $("#TotalCost").text(totalCost);
        }

        var dataAdapterSupplier = [];
        var SupplierListAdapter = () => {
            recipeData.SupplierList()
            .success(function(data){
                var SupplierSource = {
                    datatype: "json",
                    datafields: [
                        { name: 'Unique' },
                        { name: 'Company' }
                    ],
                    localdata: data.supplier
                }

                dataAdapterSupplier = new $.jqx.dataAdapter(SupplierSource);
            })
        }

        SupplierListAdapter();

        var populateChildItemEditForm = (data) => {
            var def = $.Deferred();
            setTimeout(function(){
                $("body").append(
                    '<div id="child_item_edit_form" style="background: #144766; color:#EEE; box-shadow: 5px 5px 10px #000; display: none;">'+
                        '<div id="child_item_edit_form_container">'+
                            '<div role="alert">'+
                                '<div class="toast-header">'+
                                    '<strong class="mr-auto" style="font-weight: bold; font-size: 18px;">Item ' + data.ChildUnique + ' | ' + data.ChildDescription + '</strong></h6>'+
                                    '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">'+
                                        '<span aria-hidden="true" id="close_child_item_form">&times;</span>'+
                                    '</button>'+
                                '</div>'+
                                '<div class="toast-body">'+
                                    '<form id="item_child_update">'+
                                        // Supplier
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Supplier:</label>'+
                                            '<div id="elem_input_supplier"></div>'+
                                        '</div>'+

                                        // Order By
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Order By:</label>'+
                                            '<input id="elem_input_orderby" />'+
                                        '</div>'+
                                        // Order By Cost
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Order By Cost:</label>'+
                                            '<input id="elem_input_orderbycost" />'+
                                        '</div>'+
                                        // Order By Quantity
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Order by Quantity:</label>'+
                                            '<div id="elem_input_orderby_qty"></div>'+
                                        '</div>'+
                                        // Sell By
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Sell By:</label>'+
                                            '<input id="elem_input_sellby" />'+
                                        '</div>'+
                                        // Unit Cost
                                        '<div class="form-group">'+
                                            '<label for="elem_sellby" style="width: 100%;">Unit Cost:</label>'+
                                            '<div id="elem_input_cost"></div>'+
                                        '</div>'+
                                        '<button type="submit" id="item_child_update_button" class="btn btn-primary" disabled>Save</button>&nbsp;'+
                                        '<button type="button" class="btn btn-danger" id="item_child_update_cancel">Close</button>'+
                                        '<input type="hidden" id="item_child_unique" />'+
                                        '<input type="hidden" id="item_child_description" />'+
                                    '</form>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );
                
                $("#elem_input_supplier").jqxComboBox({source: dataAdapterSupplier, placeHolder: "Item Name", displayMember: "Company", valueMember: "Unique", width: 220, height: 30});
                $("#elem_input_orderby").jqxInput({placeHolder: "Order By", height: 30, width: 220 });
                $("#elem_input_orderbycost").jqxNumberInput({placeHolder: "Order By Cost", width: '100px', height: '30px', inputMode: 'simple', spinButtons: false, decimalDigits : 4 });
                $("#elem_input_orderby_qty").jqxNumberInput({placeHolder: "Order By Quantity", width: '100px', height: '30px', inputMode: 'simple', spinButtons: false, decimalDigits : 4 });
                $("#elem_input_sellby").jqxInput({placeHolder: "Sell By", height: 30, width: 220 });
                $("#elem_input_cost").jqxNumberInput({placeHolder: "Unit Cost", width: '100px', height: '30px', inputMode: 'simple', spinButtons: false, decimalDigits : 4 });

                $("#elem_input_orderbycost").val(data.ChildCost * data.OrderByQty);
                $("#elem_input_sellby").val(data.SellBy);
                $("#elem_input_orderby").val(data.OrderBy);
                $("#elem_input_orderby_qty").val(data.OrderByQty);
                $("#elem_input_cost").val(data.ChildCost);
                $("#item_child_unique").val(data.ChildUnique);
                $("#item_child_description").val(data.ChildDescription);
                $("#elem_input_supplier").val(data.ChildSupplierUnique);

                $("#elem_input_supplier").on('change keyup', function(event){
                    $("#item_child_update_button").prop("disabled", false);
                })

                $("#elem_input_orderby").on('change keyup', function(){
                    $("#item_child_update_button").prop("disabled", false);
                })

                $("#elem_input_cost").on('change keyup', function(){
                    var UnitCost = $(this).val();
                    var OrderByQty = $("#elem_input_orderby_qty").val();
                    $("#elem_input_orderbycost").val( UnitCost * OrderByQty );

                    $("#item_child_update_button").prop("disabled", false);
                    
                })

                $("#elem_input_orderbycost").on('change keyup', function(){
                    var OrderByCost = $(this).val();
                    var OrderByQty = $("#elem_input_orderby_qty").val();
                    $("#elem_input_cost").val( OrderByCost / OrderByQty );

                    $("#item_child_update_button").prop("disabled", false);
                    
                })

                $("#elem_input_orderby_qty").on('change keyup',function(){
                    var OrderByQty = $(this).val();
                    var OrderByCost = $("#elem_input_orderbycost").val();
                    var UnitCost = $("#elem_input_cost").val();

                    $("#elem_input_cost").val(OrderByCost / OrderByQty);

                    $("#item_child_update_button").prop("disabled", false);
                    

                })

                $("#elem_input_sellby").on('change keyup', function(){
                    $("#item_child_update_button").prop("disabled", false);
                    
                })

                def.resolve();
            },100)

            return def.promise();
        }

        var windowItemEditForm = () => {
            var def = $.Deferred();
            $("#child_item_edit_form").jqxWindow({
                height: 560,
			    width: 330,
                title: '&nbsp;',
				isModal: true,
				theme: 'darkblue',
				draggable: false,
                resizable: false,
				showCloseButton: false,
				showAnimationDuration: 0,
				closeAnimationDuration: 0
            })

            setTimeout(function(){
                $("#child_item_edit_form").jqxWindow('open');

                $("#child_item_edit_form").on('close', function(){
                    $(this).jqxWindow('destroy');
                    $(this).remove();
                })

                def.resolve();
            },100);

            return def.promise();
        }

        var callItemEditForm = (itemdesc) => {
            populateChildItemEditForm(itemdesc)
            .then(function(){
                windowItemEditForm()
            })
        }

        $(document).on('click', '#close_child_item_form', function(){
            $("#child_item_edit_form").jqxWindow('close');
        })

        $(document).on('submit', '#item_child_update', function(e){
            e.preventDefault();

            var selSupplierVal = $("#elem_input_supplier").val();
            if(selSupplierVal != ''){
                selSupplierVal = $("#elem_input_supplier").jqxComboBox('getItemByValue', selSupplierVal);
                if(!selSupplierVal){
                    callNotification('Message', 'Supplier does not exist!');
                    return false;
                }
            }

            var ItemKitUnique = $("#item_child_unique").val();
            var SellBy = $("#elem_input_sellby").val();
            var OrderBy = $("#elem_input_orderby").val();
            var OrderQty = $("#elem_input_orderby_qty").val();
            var Cost = $("#elem_input_cost").val();
            var Description = $('#item_child_description').val();
            var Supplier = $("#elem_input_supplier").val();

            if(OrderQty > 0){

                var postdata ="Unique="+ItemKitUnique;
                    postdata+="&SellBy="+SellBy;
                    postdata+="&order_by="+OrderBy;
                    postdata+="&order_by_quantity="+OrderQty;
                    postdata+="&Cost="+Cost;
                    postdata+="&SupplierUnique="+Supplier;
                recipeData.UpdateItemChild(postdata)
                .success(function(data){
                    if(data.success){
                        RecipeGrid(GlobalParentID)
                        .then(function(){
                            TotalSection();
                            //Toast message
                            callNotification('Message', Description+' successfully updated!');
                            
                            $("#item_child_update_button").prop('disabled', true);
                        })
                    }
                })
            }else{
                callNotification('Message', 'Order by Quantity cannot be Zero');
            }
        })

        $(document).on('click', '#item_child_update_cancel', function(){
            
            if( $("#item_child_update_button").is(":enabled") == true ){
                callNotification('Message', 'Do you want to save changes?')
                .then(function(){
                    $(".notification-body").append(
                        '<div style="width: 100%; text-align: right;">'+
                            '<button class="btn btn-danger" id="confirm_item_save_yes">Yes</button>&nbsp;'+
                            '<button class="btn btn-info" id="confirm_item_save_no">No</button>'+
                        '</div>'
                    );
                })
            }else{
                $("#child_item_edit_form").jqxWindow('close');
            }
        })

        $(document).on('click', '#confirm_item_save_yes', function(){
            $("#item_child_update_button").trigger('submit');
            $("#notification, #child_item_edit_form").jqxWindow('close');
        })

        $(document).on('click', '#confirm_item_save_no', function(){
            $("#notification, #child_item_edit_form").jqxWindow('close');
        })

        $(document).on('rowdoubleclick', "#grid_item_recipe", function (event) {
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            var rowid = $(this).jqxGrid('getrowid', boundIndex);
            var data = $(this).jqxGrid('getrowdatabyid', rowid);

            callItemEditForm(data);
        })

    }])
})();