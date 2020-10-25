;(function ( $, window, document, undefined ) {
	
	var pluginName = "hdpayment",
			defaults = {
				layout: "payment",
				input: $("#input")
			};
		
		/*Buttons*/
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
			empty_long: {
				text: ''
			},
			empty_short: {
				text: ''
			},
			alert_okay:{
				text: 'Ok'
			},
			alert_close: {
				text: 'Close'
			},
			alert_yes: {
				text: 'Yes'
			},
			alert_no: {
				text: 'No'
			},
			button_view: {
				text: 'View'
			},
			button_edit: {
				text: 'Edit'
			},
			button_cancel: {
				text: 'Cancel'
			},
			button_proceed:{
				text: 'Ok'
			},
			button_q_cancel: {
				text: 'Cancel'
			},
			alert_okay_submit:{
				text: 'Ok'
			},
			giftcard_function: [
				['exit', 'return']
			],
			signature_accept: {
				text: 'Accept'
			},
			signature_clear: {
				text: 'Clear'
			}
		}

		var layouts = {
			selectable: ['numbers_only', 'numeric', 'payment'],
			numbers_only:[
				['1','2','3','backspace'],
				['4','5','6','return'],
				['7','8','9','exit'],
				['0','empty_short','empty_short','empty_long'],
			],
			numeric: [
				['1','2','3','backspace'],
				['4','5','6','return'],
				['7','8','9','exit'],
				['0','.','-','empty_long'],
			],
			payment: [
				['1','2','3'],
				['4','5','6'],
				['7','8','9'],
				['0','.', 'empty_short'],
			],
			process: [
				['empty_short'],
			],
			alert_yes_no: [
				['empty_short','empty_short','alert_yes','alert_no']
			],
			alert_ok: [
				['alert_okay']
			],
			alert_close: [
				['alert_close']
			],
			alert_process: [
				['okay']
			],
			alert_recall_view_edit_cancel: [
				['button_view', 'button_edit', 'button_cancel']
			],
			item_sub_menu: [
				['button_q_cancel', 'button_proceed']
			],
			alert_ok_submit: [
				['alert_okay_submit']
			],
			signature_function: [
				['signature_clear', 'signature_accept']
			]
		}

		var layout = 'payment', layout_id=0;
		
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		Plugin.prototype = {
			init: function () {
				layout = this.settings.layout;
				this.createKeyboard(layout);
				this.events();
			},

			createKeyboard: function(layout){
				shift = false;
				capslock=false;
				
				var keyboard_container = $('<ul/>').addClass('hdpayment'),
					me = this;

				layouts[layout].forEach(function(line, index){
					var line_container = $('<li/>').addClass('hdline');
					line_container.append(me.createLine(line));
					keyboard_container.append(line_container)
				})

				$(this.element).html('').append(keyboard_container);
			},

			createLine: function(line){
				var line_container = $('<ul/>')

				line.forEach(function(key, index){
					var key_container = $('<li/>').addClass('jkey').data('command',key)

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
					yes_key = $(this.element).find('.alert_yes'),
					alert_okay_submit_key = $(this.element).find('.alert_okay_submit'),
					//proceed_key = $(this.element).find('.button_q_ok');

					me = this, 
					fkeys = Object.keys(function_keys).map(function(k){
						return '.' + k;
					}).join(',');

				letters.on('click', function(){
					me.type($(this).text());
				})

				return_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
				})
				
				yes_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
				})
				
				alert_okay_submit_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
				})
				
				backspace_key.on('click', function(){
					me.backspace();
				})
				
			},
			
			type: function(key){
				var input = this.settings.input,
					  val = input.val(),
					  input_node = input.get(0),
					  start = input_node.selectionStart,
				end = input_node.selectionEnd,
				new_string = '';
				
				if(start == end && end == val.length){
					input.val(val+key);
				}else{
					var new_string = this.insertToString(start, end, val, key)
					input.val(new_string);
					start++
					end=start
					input_node.setSelectionRange(start, end);
				}
					
				input.trigger('focus')
				
				if(shift && !capslock) {
					this.toggleShiftOff()
				}

			},
			backspace: function(){
				var input = this.settings.input,
					val = input.val();
  
				input.val(val.substr('0', val.length - 1));  
			},
			toggleShiftOn: function(){
				var letters = $(this.element).find('.letter'),
					shift_key  = $(this.element).find('.shift')


				letters.addClass('uppercase');  
				shift_key.addClass('active')
				shift = true;  
			},

			toggleShiftOff: function(){
				var letters = $(this.element).find('.letter'),
					shift_key  = $(this.element).find('.shift')

				letters.removeClass('uppercase');  
				shift_key.removeClass('active')
				shift = false;  
			},

			toggleLayout: function(){
				layout_id = layout_id || 0;
				var plain_layouts = layouts.selectable
				layout_id++;

				var current_id = layout_id % plain_layouts.length;
				return plain_layouts[current_id]

			},

			insertToString: function (start, end, string, insert_string) {

			  return string.substring(0, start) + insert_string + string.substring(end, string.length);
			}

		};

		$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
		};
	
})( jQuery, window, document );