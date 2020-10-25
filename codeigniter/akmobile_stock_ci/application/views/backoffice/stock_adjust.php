<!DOCTYPE html>
<html lang="en">
<head>
    <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
    <meta name="msapplication-tap-highlight" content="no" />
    <title id="Description">AkamaiPOS | Stock Adjust</title>
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/styles/jquery.mobile-1.4.3.min.css" />
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/scripts/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/scripts/jquery.mobile-1.4.3.min.js"></script>
    <link type="text/css" rel="Stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.base.css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.windowsphone.css" type="text/css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.blackberry.css" type="text/css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.mobile.css" type="text/css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.android.css" type="text/css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.energyblue.css" type="text/css" />
    <link rel="stylesheet" href="../../assets/backoffice/mobile_app/jqwidgets/styles/jqx.darkblue.css" type="text/css" />
    <style type="text/css">
        .ui-overlay-a, .ui-page-theme-a, .ui-page-theme-a .ui-panel-wrapper {
            background: #fff;
        }

        .ui-input-text, .ui-input-search {
            margin-left: 10px;
        }

        .ui-input-search {
            width: 60%;
        }

        .ui-icon-myicon:after {
            background-image: url("../../assets/backoffice/mobile_app/images/input.png");
        }
        /* Fallback */
        .ui-nosvg .ui-icon-myicon:after {
            background-image: url("../../assets/backoffice/mobile_app/images/input.png");
        }

        .ui-icon-myicon:after {
            background-image: url("../../assets/backoffice/mobile_app/images/input.png");
            /* Make your icon fit */
            background-size: 18px 18px;
        }

        .ui-icon-hidekeyboard:after {
            background-image: url("../../assets/backoffice/mobile_app/images/touch.png");
        }
        /* Fallback */
        .ui-nosvg .ui-icon-hidekeyboard:after {
            background-image: url("../../assets/backoffice/mobile_app/images/touch.png");
        }

        .ui-icon-hidekeyboard:after {
            background-image: url("../../assets/backoffice/mobile_app/images/touch.png");
            /* Make your icon fit */
            background-size: 18px 18px;
        }
        

        @media all and (max-width: 62em) {
            .my-breakpoint .ui-block-a, .my-breakpoint .ui-block-b {
                width: 100%;
                float: none;
            }
        }

        @media all and (min-width: 72em) {
            .my-breakpoint .ui-block-a {
                width: 64.95%;
            }

            .my-breakpoint .ui-block-b {
                width: 34.95%;
            }
        }
    </style>
    <script type="text/javascript">
        var url = '<?php echo base_url() ?>'; // for local computer development
        $(function(){
            var body_height = $("body").height();
            $("#page").css({height : body_height+'px'});
        })
    </script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxinput.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxtextarea.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxtabs.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxcheckbox.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxdatatable.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxchart.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxgrid.pager.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxgrid.selection.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxpanel.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/jqwidgets/jqxwindow.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/include/dashboard.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/include/stock_adjust_details_form.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/include/stock_adjust_details_edit.js"></script>
    <script type="text/javascript" src="../../assets/backoffice/mobile_app/include/stock_adjust_details_search.js"></script>
</head>
<body>
    <!-- manual setup width and height style: style="width: 480px; height: 800px;" -->
    <div data-role="page" id="page" style="max-width: 480px; max-height: 800px; overflow: hidden;">
        <!-- Stock Adjust Dashboard -->
        <div id="dashboard" style="display: block;">
            <div  data-role="header" data-theme="b">
                <a id="back_to_home" data-icon="home" class="ui-btn-left">Dashboard</a>
                <h1>Stock Adjust</h1>
                <!-- <a id="back_to_home" data-icon="myicon" class="ui-btn-right">Keyboard</a> -->
                <div style="margin-top:5px;" class="ui-btn-right">
                    <select name="flip-6" id="show_keyboard" data-role="flipswitch" data-mini="true">
                        <option value="off">Off</option>
                        <option value="on">abl</option>
                    </select>
                </div>
            </div>
            <div id="container" class="device-mobile-container"> 
                <div  style="width: 100%; display: flex;">
                    <button style="margin-top: 10px; margin-left: 10px;" id="stock_adjust_addnew">New</button>
                    <button style="margin-top: 10px; margin-left: 10px;" id="stock_adjust_edit">Edit</button>
                    <button style="margin-top: 10px; margin-left: 10px;" id="stock_adjust_delete">Delete</button>
                </div>
                <div style="border: none;" id='tabs'>
                    <ul>
                        <li style="margin-left: 30px;">
                            <div style="height: 20px; margin-top: 5px;">
                                <div style="margin-left: 4px; vertical-align: middle; text-align: center; float: left;">
                                    Pending
                                </div>
                            </div>
                        </li>
                        <li style="margin-left: 30px;">
                            <div style="height: 20px; margin-top: 5px;">
                                <div style="margin-left: 4px; vertical-align: middle; text-align: center; float: left;">
                                    Complete
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="overflow: hidden;">
                        <div class="ui-grid-a my-breakpoint">
                            <div class="ui-block-a" style="padding: 10px; width: 100%;">
                                <div id="stock_adjust_grid_pending"></div>
                            </div>
                        </div>
                    </div>
                    <div style="overflow: hidden;">
                        <div class="ui-grid-a my-breakpoint">
                            <div class="ui-block-a" style="padding: 10px; width: 100%;">
                                <div id="stock_adjust_grid_complete"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add and Edit Stock Adjust -->
        <div id="stock_adjust_details" style="display:none;">
            <div data-role="header" data-theme="b">
                <div data-role="navbar" id="nav_bar_no_id">
                    <ul>
                        <li style="width: 100%"><a>Stock Adjust Details</a></li>
                    </ul>
                </div>
                <div data-role="navbar" id="nav_bar_id" style="display:none;">
                    <ul>
                        <li style="width: 80%;"><a>Stock Adjust Details</a></li>
                        <li style="width: 20%;"><a id="nav_bar_id_value">ID</a></li>
                    </ul>
                </div><!-- /navbar -->
            </div>
            <div class="device-mobile">
                <div id="container" class="device-mobile-container">
                    <div style="width: 100%; display: flex;">
                        <input type="hidden" id="stock_details_unique" />
                        <input type="hidden" id="stock_details_status" />
                        <button style="margin-top: 5px; margin-left: 10px;" id="stock_details_save">Save</button>
                        <button style="margin-top: 5px; margin-left: 10px;" id="stock_details_close">Close</button>
                        <button style="display: none; margin-top: 5px; margin-left: 10px;" id="stock_details_complete">Complete</button>
                        <button style="display:none; margin-top: 5px; margin-left: 10px;" id="stock_details_delete">Delete</button>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 90%; overflow: hidden;">
                            <div style='margin-top: 10px;' id="invoice-field">
                                <!-- <label>Invoice: <input style='margin-top: 2px; margin-left: 10px; width: 98%;' type="text" id="stock_details_invoice" inputmode="none" /></label> -->
                                <input type="text" name="stock_details_invoice" id="stock_details_invoice" placeholder="Invoice" value="">
                            </div>
                        </div>
                       
                        <div style="width: 90%; overflow: hidden;">
                            <input placeholder="Note" type="text" id="stock_details_notes" />
                        </div>

                        <div style="width: 100%; display: flex;">
                            <form id="stock_details_item_submit" style="display: flex; width: 100%;">
                                <input style='margin-top: 2px; margin-left: 10px; width: 80%;' placeholder="Item Search" type="search" id="stock_details_item_search_input"/>
                                <button type="submit" id="stock_details_item_submit_button" style='margin-top: 8px; margin-left: 10px; width: 20px;'>Search</button>
                                <button type="button" id="stock_details_item_delete_button" style='margin-top: 8px; margin-left: 10px; width: 10%;' class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-btn-icon-notext ui-icon-delete">Delete</button>
                           </form>
                        </div>
                    </div>
                    <div id="stock_adjust_details_grid"></div>
                </div>
            </div>
        </div>

        <!-- Stock Adjust Item Search -->
        <div id="stock_details_item_search" style="display: none;">
            <div data-role="header" data-theme="b">
                <h1>Item Search</h1>
            </div>
            <div class="device-mobile">
                <div id="container" class="device-mobile-container">
                    <div style="width: 100%; display: flex;">
                        <form id="stock_adjust_search_item_submit" style="width: 100%; display: flex;">
                            <input type="search" placeholder="Search Item" id="stock_adjust_search_item" inputmode="none" />
                            <button type="submit" id="stock_adjust_search_item_button" style="margin-top: 10px; margin-left: 5px;">Search</button> 
                            <button type="button" id="stock_adjust_add_item_button" style="margin-top: 10px; margin-left: 5px;">Add</button> 
                            <!-- <button type="button" id="item_search_close" style="margin-top: 10px; margin-left: 5px;">Close</button> -->
                            <button style="margin-top: 10px; margin-left: 5px;" class="ui-btn ui-shadow ui-btn-icon-left ui-btn-icon-notext ui-icon-delete" id="item_search_close">Close</button>
                        </form>
                    </div>
                    <div id="stock_adjust_item_search_grid"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
