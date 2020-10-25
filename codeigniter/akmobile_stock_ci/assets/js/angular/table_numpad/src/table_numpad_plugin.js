
//var myNumber; enable this variable when on http://192.168.0.93/app/pos/development/plugin/numpad/design

var pluginName = "table_numeric_numpad",
defaults = {
    layout: "virtual_table",
    input: $('#input')
};

var function_keys = {
    backspace: {
        text: '&nbsp;',
    },
    exit: {
        text: 'Cancel',
    },
    return: {
        text: 'Enter'
    },
    backspace_verylong: {
        text: '&nbsp'
    },
    empty_long: {
        text: ''
    },
    empty_short: {
        text: ''
    },
    alert_okay_submit:{
        text: 'Ok'
    },
    price_change_cancel: {
        text: 'Cancel'
    },
    price_change_okay: {
        text: 'Ok'
    },
    payout_cancel: {
        text: 'Cancel'
    },
    payout_okay: {
        text: 'Ok'
    }
}

var layout = 'virtual_table', layout_id=0;

var layouts = {
    selectable: ['virtual_table'],
    virtual_table: [
        ['B','7','8','9'],
        ['D','4','5','6'],
        ['M','1','2','3'],
        ['L','P','0','return'],
    ]
}

function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
}

var InputDecimal;

Plugin.prototype = {
    init: function () {
        layout = this.settings.layout;
        this.createKeyboard(layout);
        this.events();
    },

    createKeyboard: function(layout){
        var keyboard_container = $('<ul/>').addClass('tbnumpad'),
        me = this;

        layouts[layout].forEach(function(line, index){
            var line_container = $('<li/>').addClass('tbline');
            line_container.append(me.createLine(line));
            keyboard_container.append(line_container)
        })
        $(this.element).html('').append(keyboard_container);
    },

    createLine: function(line){
        var line_container = $('<ul/>')

        line.forEach(function(key, index){
            var key_container = $('<li/>').addClass('tbkey').data('command',key)

            if(function_keys[key]) {
                key_container.addClass(key).html(function_keys[key].text)
            }
            else {
                key_container.addClass('letter').html(key)
            }

            line_container.append(key_container);
        })
        return line_container;
    },

    events: function(){
        var letters = $(this.element).find('.letter'),
        backspace_key = $(this.element).find('.backspace'),
        return_key = $(this.element).find('.return'),
        verylongbackspace_key = $(this.element).find('.backspace_verylong'),
        alert_okay_submit_key = $(this.element).find('.alert_okay_submit'),

        me = this, 

        fkeys = Object.keys(function_keys).map(function(k){
            return '.' + k;
        }).join(',');

        letters.on('click', function(){
            if(ShouldChange){ 
                myNumber = '';
            }
            me.type( $(this).text() );
        })

        return_key.on('click', function(){
            me.type("\n");
            me.settings.input.parents('form').submit();
            myNumber = '';
        })

        backspace_key.on('click', function(){
            me.backspace();
            myNumber = '';
        })

        verylongbackspace_key.on('click', function(){
            me.backspace();
            myNumber = '';
        })

        alert_okay_submit_key.on('click', function(){
            me.type("\n");
            me.settings.input.parents('form').submit();
            myNumber = '';
        })
    },

    type: function(key){
        var input = this.settings.input;
        
        if(key == '.'){
            var curAmount       = input.val();
            var SplitDecimal    = curAmount.toString().split('.');
            var WholeNumber     = SplitDecimal[0];
            var DecimalNumber   = SplitDecimal[1];
            
            myNumber = WholeNumber + '' + key;
            input.val(myNumber);
            InputDecimal = 1;
            setTimeout(function(){
                input.jqxNumberInput('focus');
            },100)
        }else if(key == '-'){
            input.val('-' + input.val());
            setTimeout(function(){
                input.jqxNumberInput('focus');
            },100)
            InputDecimal = '';
        }else{
            var selected = getSelectedText();
            if(selected){
                var curAmount       = input.val();
                var SplitDecimal    = curAmount.toString().split('.');
                var WholeNumber     = SplitDecimal[0];
                var DecimalNumber   =  SplitDecimal[1];
                if(DecimalNumber){
                    if(key == WholeNumber){
                        if(InputDecimal == 1){
                            myNumber = WholeNumber + '' + key;

                        }else{
                            input.val('');
                            myNumber = input.val() + '' + key;
                        }
                    }else{
                        input.val('');
                        myNumber = input.val() + '' + key;
                    }
                }else{
                    if(InputDecimal == 1){
                        myNumber = WholeNumber + '.' + key;
                    }else{
                        myNumber = myNumber + '' + key;
                    }
                }
                input.val(myNumber);
                setTimeout(function(){
                    input.jqxNumberInput('focus');
                },100)
            }else{
                if(myNumber){
                    myNumber = myNumber + '' + key;
                    input.val(myNumber);
                    setTimeout(function(){
                        if('selectionStart' in input){
                            
                            input.jqxNumberInput('focus');
                        }
                    },100)
                }else{
                    myNumber = input.val() + '' + key;
                    input.val(myNumber);
                    input.focus();
                    setTimeout(function(){
                        input.jqxNumberInput('focus');
                    },100)
                }
            }
            InputDecimal = '';
        }
    },
    backspace: function(){
        var input = this.settings.input;
        myNumber = '';
        input.jqxNumberInput('clear');
        val = input.val();
        input.val(val.substr('', val.length - 1));  
    },
}

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

$.fn[ pluginName ] = function ( options ) {
    return this.each(function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        }
    });
};