;(function ( $, window, document, undefined ) {

		var pluginName = "hdkeyboard",
			defaults = {
				layout: "numbers_only",
				input: $('#input')
			};
		
		/*Buttons*/
		var function_keys = {
			backspace: {
				text: '&nbsp;',
			},
			backspace_long: {
				text: '&nbsp;',
			},
			backspace_verylong:{
				text: '&nbsp'
			},
			exit: {
				text: 'Cancel',
			},
			return: {
				text: 'Enter'
			},
			clear_weigh: {
				text: 'Clear'
			},
			empty_long: {
				text: ''
			},
			empty_short: {
				text: ''
			},
			empty_supershort: {
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
			},
			print_button: {
				text: 'Print'
			},
			clear_items: {
				text: 'Clear'
			},
			create_form: {
				text: 'New'
			},
			edit_form: {
				text: 'Edit'
			},
			save_form: {
				text: 'Save'
			},
			swipe_card: {
				text: 'Add Card'
			},
			edit_card: {
				text: 'Edit Card'
			},
			authorize_card: {
				text: 'Authorize'
			},
			delete_card: {
				text: 'Delete Card'
			},
			button_yes: {
				text: 'Yes'
			},
			button_no:{
				text: 'No'
			},
			alert_yes_ok:{
				text: 'Ok'
			},
			timeclock_ok: {
				text: 'OK'
			},
			select_me: {
				text: 'Select'
			},
			customer_card_prompt: {
				text: 'Prompt'
			},
			customer_card_swipe: {
				text: 'Swipe'
			},
			report: {
				text: 'Report'
			},
			weight_button: {
				text: 'Weigh'
			},
			skip_button:{
				text: 'Skip'
			}
		}

		var layouts = {
			selectable: ['numbers_only', 'numeric', 'custom1','custom2'],
			customer_card_on_file: [
				['button_cancel', 'customer_card_prompt', 'customer_card_swipe']	
			],
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
			/*
			numeric2: [
				['1','2','3'],
				['4','5','6'],
				['7','8','9'],
				['0','.','-'],
				['backspace_verylong']
			],
			*/
			numeric2: [
				['1','2','3'],
				['4','5','6'],
				['7','8','9'],
				['0','.','backspace']
			],
			custom1:[
				['1','2','3'],
				['4','5','6'],
				['7','8','9'],
				['0','backspace_long'],
			],
			custom2:[
				['1','2','3','backspace'],
				['4','5','6','return'],
				['7','8','9','exit'],
				['0','.','empty_short','empty_long'],
			],
			weigh:[
				['1','2','3','weight_button'],
				['4','5','6','return'],
				['7','8','9','backspace'],
				['0','.','clear_weigh','exit'],
			],
			age_verify:[
				['0','1','2','3','4','backspace'],
				['5','6','7','8','9','return'],
				['/','button_cancel','skip_button','empty_long','empty_short']
			],
			process: [
				['empty_short'],
			],
			alert_yes_no: [
				['empty_short','empty_short','alert_yes','alert_no']
			],
			alert_yes_only: [
				['empty_short','empty_short','empty_short','alert_yes']
			],
			alert_yes_ok: [
				['empty_short','empty_short','empty_short','alert_yes_ok'] 
			],
			alert_ok: [
				['alert_okay']
			],
			alert_close: [
				['alert_close']
			],
			alert_close_report2:[
				['alert_close', 'report']
			],
			alert_close_report:[
				['alert_close']
			],
			alert_process: [
				['okay']
			],
			alert_recall_view_edit_cancel: [
				['button_view', 'button_edit', 'button_cancel']
			],
			item_sub_menu: [
				['clear_items', 'button_q_cancel', 'button_proceed']
			],
			item_reason: [
				['button_q_cancel', 'button_proceed']
			],
			alert_ok_submit: [
				['alert_okay_submit']
			],
			signature_function: [
				['signature_clear', 'signature_accept']
			],
			view_receipt: [
				['alert_close', 'print_button']
			],
			custom3: [
				[/*'create_form', 'edit_form',*/ 'swipe_card', 'edit_card', 'delete_card', 'button_cancel', 'authorize_card']
			],
			custom4: [
				['save_form', 'button_cancel']
			],
			custom5:[
				['empty_short','empty_short','button_yes','button_no']
			],
			custom6: [
				['save_form', 'alert_no']
			],
			custom7: [
				['empty_short','empty_short','empty_short','timeclock_ok']
			],
			custom8: [
				['create_form', 'edit_form', 'select_me', 'button_cancel']
			],
			custom9: [
				['button_cancel', 'enter']
			],
			custom10: [
				['exit', 'alert_okay_submit']
			],
			custom11: [
				['alert_okay', 'button_cancel']
			],
			custom12: [
				['button_cancel', 'button_proceed']
			],
			virtual_table: [
				['B','7','8','9'],
				['D','4','5','6'],
				['M','1','2','3'],
				['L','P','0','return'],
				['empty_short','empty_short','exit','backspace']
			]
		}

		var layout = 'numeric', layout_id=0;
		
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
				
				var keyboard_container = $('<ul/>').addClass('hdnumpad'),
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
				longbackspace_key = $(this.element).find('.backspace_long'),
				verylongbackspace_key = $(this.element).find('.backspace_verylong'),
				return_key = $(this.element).find('.return'),
				yes_key = $(this.element).find('.alert_yes'),
				alert_okay_submit_key = $(this.element).find('.alert_okay_submit'),
				alert_yes_ok_key = $(this.element).find('.alert_yes_ok'),

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
				
				alert_yes_ok_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
				})
				
				/*
				proceed_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
				})
				*/

				backspace_key.on('click', function(){
					me.backspace();
				})

				longbackspace_key.on('click', function(){
					me.backspace();
				})

				verylongbackspace_key.on('click', function(){
					me.backspace();
				})
				
				/*
				$(fkeys).on('click', function(){
					var command = function_keys[$(this).data('command')].command;
					if(!command) return;
					command.call(me)
				})
				*/
			},
			
			type: function(key){
				var input = this.settings.input,
					val = input.val(),
					input_node = input.get(0),
					start = input_node.selectionStart,
					end = input_node.selectionEnd,
					new_string = '';

				var ElemID = $(".hdfield").attr("id");
				var inputLimit = 100;
				if(ElemID == 'quantity_field'){
					inputLimit = QuantityInputLimit; 
				}else if(ElemID == 'number_field'){
					inputLimit = NumpadPriceInputLimit;
				}else if(ElemID == 'card_field'){
					inputLimit = 100;
				}else{
					inputLimit = 1000;
				}

				var textBox = document.getElementById(ElemID);
				var textLength = textBox.value.length;
				if(textLength != inputLimit){
					if(start == end && end == val.length){
						input.val(val+key);
					}else{
						var new_string = this.insertToString(start, end, val, key)
						input.val(new_string);
						start++
						end=start
						input_node.setSelectionRange(start, end);
					}
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
