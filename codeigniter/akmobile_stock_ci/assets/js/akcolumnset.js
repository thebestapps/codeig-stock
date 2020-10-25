/**
 * Column Set Plugin
 * Created By HD
 * Company AkamaiPOS
 * Email: HD
 * Date: 08/30/2018
 */

// Global variable 
var NewColumnAdded = [];
var RemoveColumn = [];
var ActiveColumns = [];
var InactiveColumns = [];

var CustomerDataFields = [];
var CustomerGridColumns = [];

;(function ($, window, document, undefined){
    var pluginName = "columnset",
        defaults = {
            layout  : "akdarkblue",
            src     : "source",
            limit   : 20,
            theme   : "darkblue",
            setting : true,
            formid  : 'formid',
            elemId  : 'elemid'
        }

    var layout = 'akdarkblue', layout_id=0;

    var layouts = {
        selectable: ['akdarkblue', 'akblack'],
        akdarkblue: '',
        GridData : [CustomerDataFields, CustomerGridColumns]
    }

    function Plugin (element, options){
        this.element    = element;
        this.settings   = $.extend({}, defaults, options);
        this._defaults  = defaults;
        this._name      = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function(){
            layout = this.settings.layout,
            src    = this.settings.src,
            limit  = this.settings.limit,
            formid = this.settings.formid,
            elemId = this.settings.elemId,
            this.createForm(layout, src, limit, formid, elemId);
            this.events(src, formid, elemId);
        },

        createForm: function(layout, src, limit, formid, elemId){
            ActiveColumns.push(src[0]);
            InactiveColumns.push(src[1]);

            $(this.element).css({
                "margin"    : 0, 
                "padding"   : 0, 
                "width"     : '100%', 
                "height"    : 'auto', 
                "background": '#144766', 
                "color"     : '#EEE'
            });

            $(this.element).html(
                '<div class="colset-container">'+ 
                    '<div class="container-fluid">'+
                        '<div class="row">'+
                            '<div class="columnserparator">'+
                                '<div class="colset-list">'+
                                    '<div class="colset-src-top">'+
                                        '<div style="padding:4px;">'+
                                            'Available Columns&nbsp;<a class="colset-add-col" id="add_all_columns">Add</a>'+
                                        '</div>'+
                                        '<div id="colset-src-list" style="overflow: hidden !important;"></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="colset-list">'+
                                    '<div class="colset-src-top">'+
                                        '<div style="padding:4px;">Active Columns&nbsp;<a class="colset-remove-cols" id="remove_all_columns">Remove</a></div>'+
                                        '<div id="colset-selected-list"><ul id="colset-selected-column"></ul></div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<hr style="color:#144766">'+
                        '<div class="row">'+
                            '<div class="buttoncontainerhandler">'+
                                '<form id="' + formid + '">'+
                                    '<button class="btn btn-warning colset-cancel">Cancel</button>&nbsp;'+
                                    '<button type="submit" class="btn btn-primary colset-save">Set</button>'+
                                '</form>'+	
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
            
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'Label' }
                ],
                localdata: src[1]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#colset-src-list").jqxListBox({filterable: true, filterPlaceHolder: 'Search Column(s)', allowDrop: true, allowDrag: true, source: dataAdapter, displayMember: "Label", valueMember: "Unique", width: '100%', height: 320, checkboxes: true,
                dragStart: function (item) {
                    if (item.label == "(Select All)")

                        return false;
                },
                renderer: function (index, label, value) {
                    // console.log(src[index]);
                    if (label == "(Select All)") {
                        return "<span style='color: gray;'>" + label + "</span>";
                    }
                    return label;
                }
            });

            var updateAddColumnBox = function (datafield) {
                var filterBoxAdapter = new $.jqx.dataAdapter(source, {
                    uniqueDataFields: ['Label'],
                    autoBind: true
                });
                var uniqueRecords = filterBoxAdapter.records;
                uniqueRecords.splice(0, 0, '(Select All)');
                $("#colset-src-list").jqxListBox({ source: uniqueRecords, displayMember: datafield });
            }

            updateAddColumnBox('Label');

            var handleCheckChange = true;
            $("#colset-src-list").on('checkChange', function (event) {
                if (!handleCheckChange)
                    return;
                if (event.args.label != '(Select All)') {
                    handleCheckChange = false;
                    $("#colset-src-list").jqxListBox('checkIndex', 0);
                    var checkedItems = $("#colset-src-list").jqxListBox('getCheckedItems');
                    var items = $("#colset-src-list").jqxListBox('getItems');
                    if (checkedItems.length == 1) {
                        $("#colset-src-list").jqxListBox('uncheckIndex', 0);
                    }
                    else if (items.length != checkedItems.length) {
                        $("#colset-src-list").jqxListBox('indeterminateIndex', 0);
                    }
                    handleCheckChange = true;
                }
                else {
                    handleCheckChange = false;
                    if (event.args.checked) {
                        $("#colset-src-list").jqxListBox('checkAll');
                    }
                    else {
                        $("#colset-src-list").jqxListBox('uncheckAll');
                    }
                    handleCheckChange = true;
                }
            });

            var ColumnChose = [];

            var source = {
                datatype: "json",
                datafields: [
                    { name: 'Unique' },
                    { name: 'Label' }
                ],
                localdata: src[0]
            };
            var dataAdapter2 = new $.jqx.dataAdapter(source);
            $("#colset-selected-list").jqxListBox({filterable: true, filterPlaceHolder: 'Search Column(s)', allowDrop: true, allowDrag: true, source: dataAdapter2, displayMember: "Label", valueMember: "Unique", width: '100%', height: 320, checkboxes: true,
                dragEnd: function (dragItem, dropItem) {
                    if (dragItem.label == "dd")
                        return false;
                },

                renderer: function (index, label, value) {
                    if (label == "dd") {
                        return "<span style='color: red;'>" + label + "</span>";
                    }
                    return label;
                }
            });
        },

        events: function(src, formid, elemId){
            var save            = $(".colset-save"),
                cancel          = $(".colset-cancel"),
                ElementAppend   = $(this.element).attr('id'),
                WindowId        = $("#"+ElementAppend),
                ParentElement   = $("#"+ElementAppend).parents('div').attr("id"),
                RemoveAll       = $("#remove_all_columns"),
                SelectedColumns = $("#colset-selected-list"),
                SourceColumns   = $("#colset-src-list"),
                AddAllColumns   = $("#add_all_columns");
            
            me = $(this),
            save.on('click', function(){
               me.parents('form').submit();
            })
            
            cancel.on('click', function(e){
                e.preventDefault();
                WindowId.jqxWindow('close');
            })

            // --> Drag Start event
            SelectedColumns.on('dragStart', function (event) {
                var args = event.args;
                var label = args.label;
                var value = args.value;
                var originalEvent = args.originalEvent;
            });

            SourceColumns.on('dragStart', function (event) {
                var args = event.args;
                var label = args.label;
                var value = args.value;
                var originalEvent = args.originalEvent;
            });

            //  -->Drag End event
            SourceColumns.on('dragEnd', function (event) {
                var args = event.args;
                var label = args.label;
                var value = args.value;
                var originalEvent = args.originalEvent;
                NewColumnAdded.push(value);
                console.log("Addnew", NewColumnAdded);
            });

            SelectedColumns.on('dragEnd', function (event) {
                var args = event.args;
                var label = args.label;
                var value = args.value;
                var originalEvent = args.originalEvent;
                RemoveColumn.push(value);
                console.log("Remove", RemoveColumn);
            });

            RemoveAll.on('click', function(){
                
            })

            AddAllColumns.on('click', function(){
                
            })
        }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
