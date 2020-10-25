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
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
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
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets/jqxloader.js"></script>';
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

function authorization(){
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
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.aggregates.js"></script>';
   	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';
   	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/scripts/demos.js"></script>';
}

function authorization_theme(){
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.dark.css" type="text/css" />';
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

//authorization
function angularjs_auth_manager(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/auth_manager.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/authmanagerserv.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>';
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
	//SignPad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/signpad/js/hdsignpad.js"></script>';
	//CSS for SignPad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/signpad/css/hdsignpad.css">';
}

function specialplugins(){
	 print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">';
	 print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
}

//Cashier header page
function cashier_header(){ 
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>'; //CSS Template
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>'; //Toggle in Discount Item
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">'; //Switch Percent and Dollar Discount
  	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
}

/*POS Main*/
function cashier_main_menubar(){
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	//Functions like New Sale, Payment etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/mainmenu.js"></script>';
	//Service Model
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/mainmenuserv.js"></script>';
	//Moment for API
	print '<script type="text/javascript" src="'.base_url().'assets/js/moment.js"></script>';
	//Route
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Angular time clock directive
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngtimeclock.js"></script>';
	//cookie
	print '<script type="text/javascript" src="'.base_url().'assets/js/js.cookie.js"></script>';
	//Angular cookie directive
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngCookie.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change 
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	//q
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	//Keyboard plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
	//CSS for keyboard plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">'; 
	
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
}

/*POS Body*/
function cashier_main_body(){
	//Separate jqx plugin angular plugins
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets_6.05/jqxangular.js"></script>';
	//Core library
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxcore.js"></script>'; 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxbuttons.js"></script>';
	//Grid like Recall and Payment list
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxdatatable.js"></script>';
	//Tabs
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxtabs.js"></script>';  
	//Required when use jqxcombobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxlistbox.js"></script>'; 
	//Recall Cash In 
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxcombobox.js"></script>'; 
	//Required to combobox and grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxscrollbar.js"></script>';
	//Recall date range
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxdatetimeinput.js"></script>'; 
	//Required when use jqxdatetimeinput
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxcalendar.js"></script>'; 
	//Required when use grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/globalization/globalize.js"></script>';
	//Popup window
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxwindow.js"></script>';
	//Required when use jqxlistbox
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxdropdownlist.js"></script>';
	//Required for grid and combobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxdata.js"></script>';
	//For Tip, adjust tip, Enter Payment
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxnumberinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxinput.js"></script>';
	// Grouping
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqwidgets/jqxgrid.grouping.js"></script>';
	/*was jqxthemes*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets_6.05/styles/jqx.base.css" type="text/css" />'; //CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets_6.05/styles/jqx.darkblue.css" type="text/css" />'; //jqx theme
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets_6.05/styles/jqx.dark.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets_6.05/styles/jqx.black.css" type="text/css" />';
}



//For both Page of POS Main and POS Payment
function pos_header(){ 
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>'; //CSS Template
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>'; //Toggle in Discount Item
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">'; //Switch Percent and Dollar Discount
  	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	print '<script src="'.base_url().'assets/js/autoNumeric.js"></script>'; 
	print '<script src="'.base_url().'assets/js/akreader.js"></script>';
}

/*POS Main*/
function pos_main_menubar(){
	/*was reports template*/
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	print '<script src="'.base_url().'assets/js/jquery.fileDownload.js"></script>';
	/*was basic angularjs*/
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	//Functions like New Sale, Payment etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/app.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/pos-app-payment.js"></script>'; 
	//Model to get data or page
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//Plugin for Manual Credit Card input form
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	//Manual Credit Card input form
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	//For Model routing 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change 
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	
	/*was special plugin*/
	//Keyboard plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
	//CSS for keyboard plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">'; 
	
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
			
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/table_numpad/css/table_numeric_numpad.css"></link>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numeric_numpad/src/numpad_plugin.js"></script>';
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/numeric_numpad/css/numeric_numpad.css"></link>';

	//Gift Card Plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/giftcard/js/gc.js"></script>';
	//CSS for Gift Card plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/giftcard/css/gc.css">';
	//SignPad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/signpad/js/hdsignpad.js"></script>';
	//CSS for SignPad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/signpad/css/hdsignpad.css">';
	//JS JQuery Bank
	print '<script type="text/javascript" src="'.base_url().'assets/js/jquery.bank/lib/jquery.bank.js"></script>';
	
	//Payment plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/payment/js/payment.js"></script>';
	//CSS for Payment plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/payment/css/payment.css">';
	
	print '<link rel="stylesheet" href="'.base_url().'assets/css/pos-app.css">'; 
	print '<link rel="stylesheet" href="'.base_url().'assets/css/pos-app-payment.css">'; 
	print '<link rel="stylesheet" href="'.base_url().'assets/css/pos-numpad.css'.'" />';

	print '<script type="text/javascript" src="'.base_url().'assets/js/jquery.numeric.js"></script>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/tables_manual.js"></script>';

	print '<link href="'.base_url().'assets/css/table_manual.css" rel="stylesheet" type="text/css">';

	print '<script type="text/javascript" src="'.base_url().'assets/js/hdfloating.js"></script>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/maskmoney/dist/jquery.maskMoney.js"></script>';

	print '<link href="'.base_url().'assets/css/keypad-version2.css" rel="stylesheet" type="text/css">';

	print '<link href="'.base_url().'assets/css/hdfloating.css" rel="stylesheet" type="text/css">';
}

function pos_customer_screen_menubar(){
	/*was reports template*/
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	/*was basic angularjs*/
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';

	print '<link rel="stylesheet" href="'.base_url().'assets/css/pos-app-customer-screen.css">'; 
	print '<link rel="stylesheet" href="'.base_url().'assets/css/pos-app-payment-customer-screen.css">'; 
}

/*POS Body*/
function pos_main_body(){
	/*was jqxangularjs*/
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
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.aggregates.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxsplitter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxloader.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmaskedinput.js"></script>';
	//Tabs
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';  
	//Required when use jqxcombobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>'; 
	//Recall Cash In 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>'; 
	//Required to combobox and grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
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
	//Notification
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
	//Expander
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxexpander.js"></script>';
	
	/*was jqxthemes*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />'; //CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; //jqx theme
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.dark.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-redmond.css" type="text/css" />';
}


function pos_payment_menubar(){
	/*was reports_template*/
	/*Bootstrap theme*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
	/*Menubar CSS*/
    print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
	/*Menubar admin style*/
	print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
	/*Font styles*/
	print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
   
	/*was basic angularjs*/
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>'; 
	//Payment JS functions like Payment, Payments etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/payment.js"></script>';
	//Plugin for Manual Credit Card input form
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/magstrife.js"></script>';
	//Manual Credit Card input form
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/angular.payments.js"></script>';
	//Model to get data
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//For Model routing
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ui-bootstrap-tpls-0.13.0.min.js"></script>';
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
	
	//Gift Card Plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/giftcard/js/gc.js"></script>';
	//CSS for Gift Card plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/giftcard/css/gc.css">';
}

function pos_payment_body(){
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
	//CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />'; 
	//jqx theme
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; 
	
	/*Removed*/
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxinput.js"></script>';*/
}


//For both Page of POS Recall header
function pos_pointofsale_recall_header(){ 
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>'; //CSS Template
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>'; //Toggle in Discount Item
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">'; //Switch Percent and Dollar Discount
  	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	print '<script src="'.base_url().'assets/js/akreader.js"></script>';
}

//Recall Menubar
function recall_sale_menubar() {
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	//Functions like New Sale, Payment etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/recall_sale_dev.js"></script>'; 
	//Model to get data or page
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//For Model routing 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change 
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numeric_numpad/src/numpad_plugin.js"></script>';
	
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/numeric_numpad/css/numeric_numpad.css"></link>';

	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">'; 
}


/*POS Body*/
function pos_recall_body(){
	/*was jqxangularjs*/
	//Separate jqx plugin angular plugins
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>'; 
	//jqx plugins CSS
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />'; 
	//Core library
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js"></script>'; 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	//Grid like Recall and Payment list
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatatable.js"></script>';*/
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.aggregates.js"></script>';
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
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.dark.css" type="text/css" />'; //jqx theme
}

function pos_pointofsale_customer_header(){ 
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>'; //CSS Template
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>'; //Toggle in Discount Item
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">'; //Switch Percent and Dollar Discount
	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
}

//Recall Menubar
function pos_pointofsale_customer_menubar() {
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	//Functions like New Sale, Payment etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/pos_pointofsale_customer.js"></script>';
	//Model to get data or page
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//For Model routing 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change 
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	
	//Keyboard plugin
	/*print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';*/
	//CSS for keyboard plugin
	/*print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">';*/ 
	
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">'; 
}


/*POS Body*/
function pos_pointofsale_customer_body(){
	/*was jqxangularjs*/
	//Separate jqx plugin angular plugins
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>'; 
	//jqx plugins CSS
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />'; 
	//Core library
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js"></script>'; 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	//Grid like Recall and Payment list
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	
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

	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxpanel.js"></script>';
	
	/*was jqxthemes*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />'; //CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; //jqx theme
}

function pos_pointofsale_customer_plugins(){
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">'; 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
}


/*POS Split Check*/

function pos_split_check_main_menubar(){
	/*was reports template*/
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
    /*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
    print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	
	/*was basic angularjs*/
	//Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	//Functions like New Sale, Payment etc.
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/split_check.js"></script>'; 
	//Model to get data or page
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/pointofsale.js"></script>';
	//For Model routing 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//Password encryption like Open Drawer, Recall Print, Cahier change 
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	
	/*was special plugin*/
	//Keyboard plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
	//CSS for keyboard plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">'; 

	//Jquery
	//print '<script type="text/javascript" src="'.base_url().'assets/js/jquery-ui-1.12.1/jquery-ui.min.js"></script';
	
	//Numpad plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numpad/js/hdnumpad.js"></script>';
	//CSS for Numpad plugin
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/numpad/css/hdnumpad.css">';
	// Numeric Numpad js
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numeric_numpad/src/numpad_plugin.js"></script>';
	// Numeric Numpad css
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/numeric_numpad/css/numeric_numpad.css"></link>';
}

function split_check_main_body(){
	/*was jqxangularjs*/
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


function plugin_development(){
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
	print '<script src="'.base_url().'assets/js/jquery-ui.js"></script>';
    print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>'; //CSS Template
	print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>'; //Toggle in Discount Item
	print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">'; //Switch Percent and Dollar Discount
	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	  
	/*was reports template*/
	/*Bootstrap*/
	print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';

	/*was jqxangularjs*/
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
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
    print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.aggregates.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxsplitter.js"></script>';
	//Tabs
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';  
	//Required when use jqxcombobox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>'; 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdragdrop.js"></script>';
	//Recall Cash In 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>'; 
	//Required to combobox and grid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
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
	//Notification
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
	//Expander
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxexpander.js"></script>';
	
	/*was jqxthemes*/
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" type="text/css" />'; //CSS Base
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; //jqx theme
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.dark.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-redmond.css" type="text/css" />';
}

function item_count_header(){
	// Jquery version 1.12.0
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
	// Block UI
	print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
	// Bootstrap js
	print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>';
	// Bootstrap css
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/css/bootstrap.min.css"></link>';
	/*Menubar CSS*/
	print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
    /*Menubar Admin style*/
    print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
    /*Font styles*/
	print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	// Item Count Main CSS
	print '<link href="'.base_url().'assets/css/item_count.css" rel="stylesheet" type="text/css">';
}

function item_count_menubar(){
	//	Angular JS
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';  
	//	parsing the HTML 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	// js angular plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/item_count.js"></script>';
	// js services plugin
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/item_count_svc.js"></script>';
	//	For Model routing 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	//	Password encryption using md5
	print '<script type="text/javascript" src="'.base_url().'assets/js/crypto.js"></script>'; 	
	// Angular q
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	// Keyboard virtual keyboard js
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/keyboard/js/jkeyboard.js"></script>';
	// Keyboard virtual keyboard css
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/keyboard/css/jkeyboard.css">'; 
	// Numeric Numpad js
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/numeric_numpad/src/numpad_plugin.js"></script>';
	// Numeric Numpad css
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/numeric_numpad/css/numeric_numpad.css"></link>';
}

function item_count_main_body(){
	// jqwidgets angular version
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxangular.js"></script>'; 
	// jqwidgets base css
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />'; 
	// jqwidgets core library js
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcore.js"></script>'; 
	//Use for jqxbutton and jqxdatable button
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxbuttons.js"></script>';
	// jqx data table
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatatable.js"></script>';
	// jqxgrid
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.js"></script>';
	// jqxgrid sort
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.sort.js"></script>';
	// jqxgrid pager
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.pager.js"></script>';
	// jqxgrid selection
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.selection.js"></script>';
	// jqxcheckbox
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcheckbox.js"></script>';
	// jqxgrid edit
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.edit.js"></script>';
	// jqxmenu
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxmenu.js"></script>';
	// jqxgrid filter
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.filter.js"></script>';
	// jqxgrid column resize
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.columnsresize.js"></script>';
	// jqxgrid aggregates
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxgrid.aggregates.js"></script>';
	// jqx splitter
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxsplitter.js"></script>';
	// Tabs
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtabs.js"></script>';  
	// jqxlistborx
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxlistbox.js"></script>'; 
	// jqxcombobox 
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcombobox.js"></script>'; 
	// jqxscrollbar
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxscrollbar.js"></script>';
	// jqxdatetimeinput
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdatetimeinput.js"></script>'; 
	// jqxcalendar
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxcalendar.js"></script>'; 
	// jqxgrid globalize
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/globalization/globalize.js"></script>';
	// jqxwindow
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxwindow.js"></script>';
	// jqxdropdownlist
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdropdownlist.js"></script>';
	// jqxdata
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxdata.js"></script>';
	// jqxnumberinput
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnumberinput.js"></script>';
	// jqxnotification
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxnotification.js"></script>';
	// jqxexpander
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxexpander.js"></script>';
	// jqxtextarea
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/jqwidgets/jqxtextarea.js"></script>';
	// jqwidget Themes
	// darkblue
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.darkblue.css" type="text/css" />'; 
	// dark
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.dark.css" type="text/css" />';
	// uistart
	print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-start.css" type="text/css" />';
	// redmond
	// print '<link rel="stylesheet" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.ui-redmond.css" type="text/css" />';
}

function recipe_plugins(){
	print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/angular-sanitize.min.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ng-route/angular-route.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/q.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/ngCookie.js"></script>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxcore.js"></script>';
	print '<link rel="stylesheet" type="text/css" href="'.base_url().'assets/js/angular/jqwidgets/styles/jqx.base.css" />'; 
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxdata.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxbuttons.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxscrollbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxmenu.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxcheckbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxlistbox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxdropdownlist.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxcombobox.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.sort.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.pager.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.selection.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.edit.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxdatetimeinput.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxcalendar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxtooltip.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/globalization/globalize.js"></script>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.filter.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.columnsresize.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.aggregates.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxprogressbar.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxgrid.grouping.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxdata.export.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxwindow.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxpanel.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxtabs.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxtextarea.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxinput.js"></script>';

	print '<script type="text/javascript" src="'.base_url().'assets/js/jqwidgets_6.05/jqxnumberinput.js"></script>';

	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.energyblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.arctic.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.classic.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.darkblue.css" type="text/css" />';
	print '<link rel="stylesheet" href="'.base_url().'assets/js/jqwidgets/styles/jqx.dark.css" type="text/css" />';
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

	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/recipe.js"></script>';
	print '<script type="text/javascript" src="'.base_url().'assets/js/angular/js/services/recipeserv.js"></script>';
	print '<link rel="stylesheet" href="'.base_url().'assets/css/itemkit.css" type="text/css" />';

	print '<link rel="stylesheet" href="'.base_url().'assets/css/jquery.SplashScreen.css" type="text/css" media="screen" />';
    print '<script type="text/javascript" src="'.base_url().'assets/js/jquery.SplashScreen.js"></script>';
}
