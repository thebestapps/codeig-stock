
//var myNumber; enable this variable when on http://192.168.0.93/app/pos/development/plugin/numpad/design

var pluginName = "numeric_numpad",
defaults = {
    layout: "numeric",
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

var layout = 'numeric', layout_id=0;

var layouts = {
    selectable: ['numeric','numeric2'],
    numeric:[
        ['1','2','3','backspace'],
        ['4','5','6','return'],
        ['7','8','9','exit'],
        ['0','.','empty_short', 'empty_long']
    ],
    numbers_only:[
        ['1','2','3','backspace'],
        ['4','5','6','return'],
        ['7','8','9','exit'],
        ['0','empty_short','empty_short','empty_long'],
    ],
    numeric2: [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['0','.','backspace']
    ],
    custom10: [
        ['exit', 'alert_okay_submit']
    ],
    PriceChange: [
        // ['price_change_cancel', 'price_change_okay']
    ],
    PayOut: [
        ['payout_cancel', 'payout_okay']
    ],
    virtual_table: [
        ['B','7','8','9'],
        ['D','4','5','6'],
        ['M','1','2','3'],
        ['L','P','0','return'],
        ['empty_short','empty_short','exit','backspace']
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
        if(layout == 'virtual_table'){
            var keyboard_container = $('<ul/>').addClass('tbnumpad'),

            me = this;

            layouts[layout].forEach(function(line, index){
                var line_container = $('<li/>').addClass('tbline');
                line_container.append(me.createLine(line));
                keyboard_container.append(line_container)
            })
            $(this.element).html('').append(keyboard_container);
        }else{
            var keyboard_container = $('<ul/>').addClass('aknumpad'),

            me = this;

            layouts[layout].forEach(function(line, index){
                var line_container = $('<li/>').addClass('akline');
                line_container.append(me.createLine(line));
                keyboard_container.append(line_container)
            })
            $(this.element).html('').append(keyboard_container);
        }
    },

    createLine: function(line){
        var line_container = $('<ul/>')

        line.forEach(function(key, index){
            var key_container = $('<li/>').addClass('akkey').data('command',key)

            if(function_keys[key]) {
                key_container.addClass(key).html(function_keys[key].text)
            } else {
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
            me.settings.input.parents('form').submit();
            me.type("\n");
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
        if(input[0].id != 'search_field' && input[0].type != 'password'){
            
            input.jqxNumberInput('clear');
            // var myinput = $('#'+input[0].id).find('input');
            // val = myinput.val();
            // input.val(val.substr('0', val.length - 1));
            // input.jqxNumberInput('focus');
        }else{
            val = input.val();
            input.val(val.substr('0', val.length - 1));
            input.focus(); 
        }
        
        // setTimeout(function(){
        //     input.jqxNumberInput('focus');
        // },100) 
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