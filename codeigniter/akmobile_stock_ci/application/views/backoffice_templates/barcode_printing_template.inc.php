<?php
function barcodeprinting_css() {
    print ' <link rel="stylesheet" href="' . base_url() . 'assets/js/jqwidgets/styles/jqx.base.css" type="text/css" />';
    print ' <link rel="stylesheet" href="' . base_url() . 'assets/js/jqwidgets/styles/jqx.darkblue.css" type="text/css" />';
    print ' <link rel="stylesheet" href="' . base_url() . 'assets/js/jqwidgets/styles/jqx.energyblue.css" type="text/css" />';
    print ' <link rel="stylesheet" href="' . base_url() . 'assets/js/jqwidgets/styles/jqx.summer.css" type="text/css" />';
}

//used by backoffice/backoffice_barcode_page

function barcodeprintpage_includes() {
    /* print '<script src="'.base_url().'assets/js/angular/jquery-1.11.1.min.js"></script>'; */
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxcore.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxbuttons.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxscrollbar.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxmenu.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxcheckbox.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.selection.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.columnsresize.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxdata.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxdata.export.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.export.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.sort.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/demos.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxlistbox.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.pager.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.filter.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxgrid.edit.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxdropdownlist.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxwindow.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxpanel.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxtabs.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxdatatable.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxinput.js"></script>';
    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgets/jqxformattedinput.js"></script>';
//    print '<script type="text/javascript" src="' . base_url() . 'assets/js/jqwidgetscripts/generatedata.js"></script>';
}

//used by any page which requires barcode printing window
function barcodeprinting_library() {
    // uncomment below line if this function and JQXGrid libraries are not already inclued in view
//    barcodeprintpage_includes();
    print '<script type="text/javascript" src="' . base_url() . 'assets/inventory/barcode/barcode-print.js"></script>';
}
