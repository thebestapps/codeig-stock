<style type="text/css">
	body{
		padding:0;
		margin:0;
	}
	.form-signin
	{
		max-width: 330px;
		padding: 15px;
		margin: 0 auto;
	}
	.form-signin .form-signin-heading, .form-signin .checkbox
	{
		margin-bottom: 10px;
	}
	.form-signin .checkbox
	{
		font-weight: normal;
	}
	.form-signin .form-control
	{
		position: relative;
		font-size: 16px;
		height: auto;
		padding: 10px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.form-signin .form-control:focus
	{
		z-index: 2;
	}
	.form-signin input[type="text"]
	{
		margin-bottom: -1px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.form-signin input[type="password"]
	{
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.account-wall
	{
		margin-top: 20px;
		padding: 40px 0px 20px 0px;
		background-color: #f7f7f7;
		-moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
		-webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	}

	.login-title{
		color: #555;
		font-size: 18px;
		font-weight: 400;
		display: block;
	}

	.profile-img{
		width: 150px;
		margin: 0 auto 10px;
		display: block;
		/*-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;*/
	}

	.need-help{
		margin-top: 10px;
	}

	.new-account{
		display: block;
		margin-top: 10px;
	}

	#search_field{
		display: block;
		margin: 0 auto;
		padding: 5px 10px;
		font-size: 28px; 
		width: 100%;
	}

	#dialog-numpad-keyboard {
		-webkit-border-radius: 15px 15px 15px 15px;
		border-radius: 15px 15px 15px 15px;
		border: 5px solid #449bca;
		background:#144766;
	}
</style>
<script type="text/javascript">
	//Global variable
	var SiteRoot = "<?php echo base_url(); ?>";
	var Keyboard = 0;
	var KeyboardInputLimit = 30;
	$(function(){
		changetabtile();
		load_stores();

		$("#station").on("change", function(){
			var postdata = "StationUnique="+$(this).val();
			$.ajax({
				url: SiteRoot + 'backoffice/Backoffice/select/station/setting',
				type: 'post',
				data: postdata,
				dataType: 'json',
				success: function(data){
					Keyboard = data.VirtualKeyboard;
					KeyboardInputLimit = data.KeyboardInputLimit;
				}
			})
		})

		$("#username").click(function(){
			if(Keyboard == 1){
				NumpadKeyboardUsername('username_field', 'Type Username', 'text')
				.then(function(){
					WindowPopupKeyboard("Enter Username");
				})
			}
		})

		$("#password").click(function(){
			if(Keyboard == 1){
				NumpadKeyboardPassword('password_field', 'Type Password', 'password')
				.then(function(){
					WindowPopupKeyboard("Enter Password");
				})
			}
		})

		$(document).on("submit", '#username_field', function(e){
			e.preventDefault();
			$("#username").val($("#search_field").val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
			$("#password").focus();
			NumpadKeyboardPassword('password_field', 'Type Password', 'password')
			.then(function(){
				WindowPopupKeyboard("Enter Password");
			})
		})

		$(document).on("submit", "#password_field", function(e){
			e.preventDefault();
			$.blockUI({ css: { 
				border: '2px solid #fff',
				padding: '15px', 
				backgroundColor: '#210e66', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: 1, 
				color: '#fff',
				fontSize: '20px' 
			}, message: 'Please wait...' }); 

			$("#password").val($("#search_field").val());
			$('#dialog-numpad-keyboard').jqxWindow('close');
			$("#password").focus();
			setTimeout(function(){
				setTimeout($.unblockUI, 100);
				$("#loginSubmit").trigger('click');
			},1000)
		})
	})
	
	function changetabtile(){
		$("#tabtitle").html("Login");
	}
	
	function load_stores(){
		$.ajax({
			url: SiteRoot+'backoffice/load_station',
			type: 'post',
			dataType:"json",
			success: function(data){
				$("#station").html("<option value=''>Select Station</option>");
				$.each(data, function(index, value){
					$("#station").append("<option value='"+index+"'>"+value.description+"</option>");
				})
			}
		})
	}

	var populateNumpadKeyboard = function(form_name, field, type){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-keyboard").append('<div id="custom_item_keyboard" style="background: #144766; color:#EEE;"></div>');
			$("#custom_item_keyboard").html('');
			$("#custom_item_keyboard").append(''+
			'<h4 style="text-align:center;">'+field+'</h4>'+
			'');
			$("#custom_item_keyboard").append(''+
			'<form id="'+form_name+'">'+
				'<input type="'+type+'" maxlength="25" id="search_field" style="color:#000">'+
				'<div id="keyboard"></div>'+
			'</form>');
			def.resolve();
		},100);
		return def.promise();
	}
	
	var WindowPopupKeyboard = function(header_title){
		var def = $.Deferred();
		setTimeout(function(){
			$("#dialog-numpad-keyboard").jqxWindow({
				height: 430,
				minWidth: '80%',
				isModal: true,
				theme: 'darkblue',
				showCloseButton: true,
				resizable: false,
			});
			$('#dialog-numpad-keyboard').jqxWindow('setTitle', header_title);
			$('#dialog-numpad-keyboard').jqxWindow('open');
			setTimeout(function(){
				$("#search_field").focus();
			},100);
			def.resolve();	
		},100);
		return def.promise();
	}
	
	var NumpadKeyboardUsername = function(form_name, field, type){
		var def = $.Deferred();
		populateNumpadKeyboard(form_name, field, type)
		.then(function(){
			$('#keyboard').jkeyboard({
				layout: "english",
				input: $('#search_field')
			});
			def.resolve();
		});
		return def.promise();
	}

    var NumpadKeyboardPassword = function(form_name, field, type){
		var def = $.Deferred();
		populateNumpadKeyboard(form_name, field, type)
		.then(function(){
			$('#keyboard').jkeyboard({
				layout: "numeric",
				input: $('#search_field')
			});
			def.resolve();
		});
		return def.promise();
	}

</script>

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <div class="account-wall">
                    <img class="profile-img" src="<?php echo base_url('assets/img/company_logo.png')?>" alt="AkamaiPOS logo">
                    <?php if(@$error): ?>
                        <div class="alert alert-danger" role="alert">
                            <button type="button" class="close" data-dismiss="alert">x</button>
                            <?php echo $error; ?>
                        </div>
                    <?php endif;?>
                    <form class="form-signin" method="post" action="">
                        <!--<select id="store" name="store" class="form-control" required></select>-->
                        <select id="station" name="station" class="form-control" required></select>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Username" required autofocus>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
                        <button class="btn btn-lg btn-primary btn-block" id="loginSubmit" type="submit">Log in</button>
                    </form>
					<?php /*Keyboard plugin*/?>
					<div id="dialog-numpad-keyboard" style="display:none;"></div>
                </div>
            </div>
        </div>
    </div>