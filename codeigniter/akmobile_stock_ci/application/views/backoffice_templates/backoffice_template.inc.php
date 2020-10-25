<?php

function plugins(){

	// jquery
    print '<script src="'.base_url().'assets/js/jquery-ui/js/jquery-1.7.2.min.js"></script>';

	print '<script src="'.base_url().'assets/js/jquery.tools.min.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery.fileDownload.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery.floatingmessage.js"></script>';
	print '<script src="'.base_url().'assets/js/timeago.js"></script>';

	print '<script src="'.base_url().'assets/js/Support/jquery.gritter.min.js"></script>';

	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	print '<script src="'.base_url().'assets/js/moment.min.js"></script>';
	print '<script src="'.base_url().'assets/js/script.js"></scritp>';

    //jquery clock
	print '<script src="'.base_url().'assets/js/jqClock.js"></script>';
	print '<script src="'.base_url().'assets/js/jqClock.min.js"></script>';
	//jquery clock css
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqClock.css">';

    // jquery ui
    print '<script src="'.base_url().'assets/js/jquery-ui/js/jquery-ui-1.8.21.custom.min.js"></script>';
    print '<link rel="stylesheet" href="'.base_url().'assets/js/jquery-ui/css/humanity/jquery-ui-1.8.21.custom.css" />';

    // colorbox
    print '<script src="'.base_url().'assets/js/colorbox/colorbox/jquery.colorbox-min.js"></script>';
    print '<link rel="stylesheet" href="'.base_url().'assets/js/colorbox/colorbox/colorbox.css" />';

    // masked input
    print '<script src="'.base_url().'assets/js/jquery.maskedinput-1.3.js"></script>';

    // easy slider
    print '<script src="'.base_url().'assets/js/easySlider1.7.js"></script>';


	// modal form
	/*print '<script src="assets/js/jquery-ui/development-bundle/jquery-1.7.2.js"></script>'; */
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/external/jquery.bgiframe-2.1.2.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.core.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.autocomplete.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.widget.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.mouse.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.button.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.draggable.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.position.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.resizable.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.ui.dialog.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.effects.core.js"></script>'; 
	print '<script src="'.base_url().'assets/js/jquery-ui/development-bundle/ui/jquery.effects.explode.js">/</script>';

	// global functions
 	print '<script src="'.base_url().'assets/js/global_function.js"></script>';

	//calendar
	print '<link rel="stylesheet" href="'.base_url().'asset/js/calendar/jquery-ui.css" />';
	print '<script src="'.base_url().'asset/js/calendar/jquery-ui.js"></script>';
	//print '<link rel="stylesheet" href="/resources/demos/style.css" />';

	//Currency
	print '<script type="text/javascript" src="'.base_url().'assets/js/currency/jquery.formatCurrency.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/currency/jquery.formatCurrency-1.4.0.min.js"></script>';

}


function hdplugins(){
	print '<link rel="stylesheet" href="'.base_url().'assets/css/jasny-bootstrap.min.css">';
  	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery.toastmessage.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-valid-lightbox-v1.1.js"></script>';
	print '<script src="'.base_url().'assets/js/bootstrap-dialog.js"></script>';
	print '<script src="'.base_url().'assets/js/jasny-bootstrap.min.js"></script>';
}


function headerplugins(){
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
}

function pointofsaleplguins(){ 
	/*print '<script src="'.base_url().'assets/js/angular/jquery-1.11.1.min.js"></script>';*/
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>';
    print '<script src="'.base_url().'assets/js/custom.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrapValidator.js"></script>';
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>';
	/*print '<script src="'.base_url().'assets/js/autoNumeric.js"></script>';*/
  	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	print '<link href="'.base_url().'assets/css/normalize.css" rel="stylesheet" type="text/css">';
    print '<link href="'.base_url().'assets/css/global.css" rel="stylesheet" type="text/css">';
    print '<link href="'.base_url().'assets/css/font-awesome.css" rel="stylesheet">';
    /*print '<link href="'.base_url().'assets/css/custom.css" rel="stylesheet">';*/
    print '<link href="'.base_url().'assets/css/bootstrapValidator.min.css" rel="stylesheet">';
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">';
}

function mainscreenjs(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/mainmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/moment.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/mainmenuserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngtimeclock.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/js.cookie.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngCookie.js"></script>';
}

function timeclockjs(){
	print '<script type="text/javascript" src="http://www.jqwidgets.com/jquery-widgets-documentation/scripts/jquery-1.10.2.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/timeclock.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/timeclockserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngtimeclock.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/js.cookie.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngCookie.js"></script>';
}

function categoryjs(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jquery-1.10.2.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/category.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/categoryserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngtimeclock.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/js.cookie.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngCookie.js"></script>';
}

function angularjstimeclock(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.js"></script> ';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxgridview.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxlistbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdropdownlist.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtooltip.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxwindow.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtabs.js"></script>';
}

function basicangularjs(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-1.1.1.min.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/modal.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/app.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
  	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/directives/no-item-tax.js">';*/
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/directives/dropdown.js">';*/
}

function angularjspayment(){
  	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/payment.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//print '<script type="text/javascript" src="'.base_url().'assets/js/angular/currency-filter.js">';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jquery.mask.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
	/*print '<link rel="stylesheet" href="'.base_url().'assets/css/creditcard.css">';*/
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/directives/dropdown.js">';*/
}

function credit_card(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/creditcardjs-v0.10.12.min.js"></script>';
}

function angularplugins(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.js"></script> ';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.export.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxgridview.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxlistbox.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdropdownlist.js"></script>';

  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtooltip.js"></script>';
 	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxwindow.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxnumberinput.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxinput.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcalendar.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdatetimeinput.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtabs.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxmenu.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcheckbox.js"></script>';
}

function supplierangular(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
}

function brandangular(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
}

function inventoryangular(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
}

function customerangular(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
}

function angularjswidgets(){
/*	print '<script src="'.base_url().'assets/js/jquery-1.10.2.min.js"></script>';*/
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.js"></script> ';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.export.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxgridview.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxlistbox.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdropdownlist.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/scripts/demos.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtooltip.js"></script>';
 	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxwindow.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxnumberinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcalendar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdatetimeinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtabs.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxmenu.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcheckbox.js"></script>';
}


function angularjsposwidgets(){
	/*print '<script src="'.base_url().'assets/js/jquery-1.10.2.min.js"></script>';*/
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.js"></script> ';
	/*print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.export.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxgridview.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxlistbox.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdropdownlist.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/scripts/demos.js"></script>';*/
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtooltip.js"></script>';
 	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxwindow.js"></script>';
  	/*print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxnumberinput.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxinput.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcalendar.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdatetimeinput.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtabs.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxmenu.js"></script>';
  	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcheckbox.js"></script>';*/
}


function angularjs_ngwidgets(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdata.js"></script> ';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxgridview.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxlistbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxdropdownlist.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtooltip.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxwindow.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/ngwidgets/ngxtabs.js"></script>';
}

function angulartheme_android(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.android.css" type="text/css" />';
}
function angulartheme_arctic(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.arctic.css" type="text/css" />';
}
function angulartheme_black(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.black.css" type="text/css" />';
}
function angulartheme_blackberry(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.blackberry.css" type="text/css" />';
}
function angulartheme_bootstrap(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.bootstrap.css" type="text/css" />';
}
function angulartheme_classic(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.classic.css" type="text/css" />';
}
function angulartheme_darkblue(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.darkblue.css" type="text/css" />';
}
function angulartheme_energyblue(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.energyblue.css" type="text/css" />';
}
function angulartheme_fresh(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.fresh.css" type="text/css" />';
}
function angulartheme_glacier(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.glacier.css" type="text/css" />';
}
function angulartheme_highcontrass(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.highcontrass.css" type="text/css" />';
}
function angulartheme_metro(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.metro.css" type="text/css" />';
}
function angulartheme_metrodark(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.metrodark.css" type="text/css" />';
}
function angulartheme_mobile(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.mobile.css" type="text/css" />';
}
function angulartheme_office(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.office.css" type="text/css" />';
}
function angulartheme_orange(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.orange.css" type="text/css" />';
}
function angulartheme_shinyblack(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.shinyblack.css" type="text/css" />';
}
function angulartheme_summer(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.summer.css" type="text/css" />';
}
function angulartheme_web(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.web.css" type="text/css" />';
}
function angulartheme_windowsphone(){
	print '<link rel="stylesheet" href="'.base_url().'assets/ngwidgets/styles/ngx.windowsphone.css" type="text/css" />';
}

function jqxplugindatetime(){
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.base.css" type="text/css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxdata.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxdatetimeinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcalendar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcheckbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/demos.js"></script>';
}

function jqxplugins(){
	/*jqwidgets*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.base.css" type="text/css" />';
	//-->Themes
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.energyblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.arctic.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.classic.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.darkblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.shinyblack.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.office.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.metro.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.metrodark.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.orange.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.summer.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.black.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.fresh.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.highcontrast.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-darkness.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-lightness.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-le-frog.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-overcast.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-redmond.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-smoothness.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.ui-sunny.css" type="text/css" />';

	//-->Functions

	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxdata.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcheckbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxlistbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxdropdownlist.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.sort.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.pager.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.selection.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.pager.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.sort.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxdatetimeinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxcalendar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgetscripts/generatedata.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxtooltip.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/demos.js"></script>';
}

function jqxcategoryjs(){
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jquery-1.10.2.min.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js")></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdata.js"></script>';
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtooltip.js"></script>';*/
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdropdownlist.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxpanel.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcalendar.js"></script>';
   	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatetimeinput.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxwindow.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/scripts/demos.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/generatedata.js"></script>';
}


function jqxangularjs(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>';
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatatable.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatetimeinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcalendar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/globalization/globalize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxwindow.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdropdownlist.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdata.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtooltip.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnumberinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxpasswordinput.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxpanel.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/scripts/demos.js"></script>';
}

function jqxthemes(){
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.energyblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.fresh.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.black.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.blackberry.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-redmond.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.metrodark.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.mobile.css"></link>';
}

function angularjsreceiving(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/receiving.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/receivingserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
}

function angularjspurchaseorder(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/purchaseorder-edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/receivingserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
}

function angularjspurchaseorderadd(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/purchaseorder-add.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/receivingserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
}

/*
function updated_libraries(){
	print '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
	print '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">';
	print '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>';
	print '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>';
}
*/

function reports_template(){
    print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    print '<link href="'.base_url().'assets/dist/css/timeline.css" rel="stylesheet">';
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    print '<link href="'.base_url().'assets/bower_components/morrisjs/morris.css" rel="stylesheet">';
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
}

function reports_extended_js(){
    print '<script src="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.js"></script>';
    print '<script src="'.base_url().'assets/bower_components/raphael/raphael-min.js"></script>';
    /*
	print '<script src="'.base_url().'assets/bower_components/morrisjs/morris.min.js"></script>';
    print '<script src="'.base_url().'assets/js/morris-data.js"></script>';
	*/
    print '<script src="'.base_url().'assets/dist/js/sb-admin-2.js"></script>';
}


function angularjsreports(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/inventory_valuation.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/reportserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
}

function angularjs_auth_manager(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/auth_manager.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/authmanagerserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
}

function specialplugins(){
	 print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">';
	 print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
}

function backoffice_menubar_body(){
	//Separate jqx plugin angular plugins
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>'; 
	//jqx plugins CSS
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />'; 
	//Core library
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js"></script>'; 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	//Grid like Recall and Payment list
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatatable.js"></script>';
	//Tabs
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';  
	//Required when use jqxcombobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>'; 
	//Recall Cash In 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>'; 
	//Required to combobox and grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	//Recall date range
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatetimeinput.js"></script>'; 
	//Required when use jqxdatetimeinput
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcalendar.js"></script>'; 
	//Required when use grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/globalization/globalize.js"></script>';
	//Popup window
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxwindow.js"></script>';
	//Required when use jqxlistbox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdropdownlist.js"></script>';
	//Required for grid and combobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdata.js"></script>';
	//For Tip, adjust tip, Enter Payment
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnumberinput.js"></script>';
	
	/*was jqxthemes*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />'; //CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; //jqx theme

	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
}


function customer_plugin(){ 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	//Required when use jqxcombobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>'; 
	//Recall Cash In 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>'; 
	//Required to combobox and grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	//Recall date range
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatetimeinput.js"></script>'; 
	//Required when use jqxdatetimeinput
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/globalization/globalize.js"></script>';
	//Required when use jqxlistbox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdropdownlist.js"></script>';
	//Required for grid and combobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdata.js"></script>';
	//For Tip, adjust tip, Enter Payment
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnumberinput.js"></script>';
}

function plugin_security(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
}
