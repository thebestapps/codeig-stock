<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Location {

	public function __construct()
    {

       // parent::_construct();
        $CI =& get_instance();
       $CI->load->helper('url');
       $CI->load->library('session');
       $CI->load->database();
    }

    function loc_selection($location,$selection,$Id)
    {	  

           $loc= $selection;
            $ch = str_replace(']', '',str_replace('[', '', $location));

           

    
        $text = "var StatusData = [
                { Unique: 0, Name: 'Select All' },
                {$ch},
            ];
            

        var source = {
                        localdata: StatusData,
                        datatype: 'array',
                        datafields: [
                        { name: 'Unique' },
                        { name: 'Name' }
                        ]
                    };

      var dataAdapter = new $.jqx.dataAdapter(source);
                // Create a jqxDropDownList
                $('#Locations').jqxDropDownList({ 
                    checkboxes: true, 
                    source: dataAdapter, 
                    displayMember: 'Name', 
                    valueMember: 'Unique',
                    height: '30px', 
                    width: '150px',
                     theme: theme,
                      });
                 var handleCheckChange = true;
                     
            if({$selection} == false){ 

                    var dataAdapter = new $.jqx.dataAdapter(source,
                        {

                            autoBind            : true,
                            beforeLoadComplete: function (records) {
                                var data = new Array();
                                for (var i = 0; i < records.length; i++)
                                {
                                    var representante = records[i];
                                    representante.Name = representante.Name;
                                    representante.val  = representante.Unique;
                                    representante.uid  = i;
                                    if(representante.Unique=='{$Id}')
                                    {
                                        representante.checked = true;
                                    }

                                    data.push(representante);
                                }
                                //console.log(records);
                                //console.log(data);
                                return data;
                            }
                        });

                        var handleCheckChange = true;
                                $('#Locations').bind('checkChange', function (event) {
                                    if (!handleCheckChange)
                                        return;
                                    if (event.args.label != 'Select All') {
                                        handleCheckChange = false;
                                        $('#Locations').jqxDropDownList('checkIndex', 0);
                                        var checkedItems = $('#Locations').jqxDropDownList('getCheckedItems');
                                        var items = $('#Locations').jqxDropDownList('getItems');
                                        if (checkedItems.length == 1) {
                                            $('#Locations').jqxDropDownList('uncheckIndex', 0);
                                        }
                                        else if (items.length != checkedItems.length) {
                                            $('#Locations').jqxDropDownList('indeterminateIndex', 0);
                                        }
                                        handleCheckChange = true;
                                    }
                                    else {
                                        handleCheckChange = false;
                                        if (event.args.checked) {
                                            $('#Locations').jqxDropDownList('checkAll');
                                        }
                                        else {
                                            $('#Locations').jqxDropDownList('uncheckAll');
                                        }
                                        handleCheckChange = true;
                                    }
                                });

                        $('#Locations').jqxDropDownList(
                        {
                            theme           : 'energy-blue',
                            height          : '30px',
                            width           : '180px',
                            source          : dataAdapter,
                            valueMember     : 'Unique',
                            displayMember   : 'Name',
                            checkboxes      : true,
                        });

                    }
                   

            if({$selection} == true){ 

    
                    var dataAdapter = new $.jqx.dataAdapter(source,
                        {

                            autoBind            : true,
                            beforeLoadComplete: function (records) {
                                var data = new Array();
                                for (var i = 0; i < records.length; i++)
                                {
                                    var representante = records[i];
                                    representante.Name = representante.Name;
                                    representante.val  = representante.Unique;
                                    representante.uid  = i;
                                
                                        representante.checked = true;

                                    data.push(representante);
                                }
                                //console.log(records);
                                //console.log(data);
                                return data;
                            }
                        });

                        var handleCheckChange = true;
                                $('#Locations').bind('checkChange', function (event) {
                                    if (!handleCheckChange)
                                        return;
                                    if (event.args.label != 'Select All') {
                                        handleCheckChange = false;
                                        $('#Locations').jqxDropDownList('checkIndex', 0);
                                        var checkedItems = $('#Locations').jqxDropDownList('getCheckedItems');
                                        var items = $('#Locations').jqxDropDownList('getItems');
                                        if (checkedItems.length == 1) {
                                            $('#Locations').jqxDropDownList('uncheckIndex', 0);
                                        }
                                        else if (items.length != checkedItems.length) {
                                            $('#Locations').jqxDropDownList('indeterminateIndex', 0);
                                        }
                                        handleCheckChange = true;
                                    }
                                    else {
                                        handleCheckChange = false;
                                        if (event.args.checked) {
                                            $('#Locations').jqxDropDownList('checkAll');
                                        }
                                        else {
                                            $('#Locations').jqxDropDownList('uncheckAll');
                                        }
                                        handleCheckChange = true;
                                    }
                                });

                        $('#Locations').jqxDropDownList(
                        {
                            theme           : 'energy-blue',
                            height          : '30px',
                            width           : '180px',
                            source          : dataAdapter,
                            valueMember     : 'Unique',
                            displayMember   : 'Name',
                            checkboxes      : true,
                        });

             } 

                    ";
                        return $text;





    }
}

?>