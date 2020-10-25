;(function ( $, window, document, undefined ) {
	
	var pluginName = "hdgiftcard",
			defaults = {
				layout: "giftcard_function",
				input: $('#input')
			};
		
		/*Buttons*/
		var function_keys = {
			exit: {
				text: 'Cancel',
			},
			return: {
				text: 'Ok'	
			},
			goReturn: {
				text: 'Ok'
			},
			gcCancel: {
				text: 'Cancel'
			}
		}

		var layouts = {
			selectable: ['giftcard_function', 'giftcard_function2'],
			giftcard_function: [
				['exit', 'goReturn']
			],
			giftcard_function2: [
				['exit', 'goReturn']
			],
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
					return_key = $(this.element).find('.return'),
					goReturn_key = $(this.element).find('.goReturn'),
		
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
				
				goReturn_key.on('click', function(){
					me.type("\n");
					me.settings.input.parents('form').submit();
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
