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
	.login-title
	{
		color: #555;
		font-size: 18px;
		font-weight: 400;
		display: block;
	}
	.profile-img
	{
		width: 150px;
		margin: 0 auto 10px;
		display: block;
		/*-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;*/
	}
	.need-help
	{
		margin-top: 10px;
	}
	.new-account
	{
		display: block;
		margin-top: 10px;
	}
</style>
<script type="text/javascript">
	//Global variable
	var SiteRoot = "<?php echo base_url(); ?>";

	$(function(){
		changetabtile();
		load_stores();
	})
	function changetabtile(){
		$("#tabtitle").html("Login");
	}
	
	function load_stores(){
		$.ajax({
			url: SiteRoot+'backoffice/Backoffice/load_station',
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
</script>

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <div class="account-wall">
                    <img class="profile-img" src="<?php echo base_url('assets/img/company_logo.png')?>" alt="">
                    <?php if(@$error): ?>
                        <div class="alert alert-danger" role="alert">
                            <button type="button" class="close" data-dismiss="alert">x</button>
                            <?php echo $error; ?>
                        </div>
                    <?php endif;?>
                    <form class="form-signin" method="post" action="">
                        <!--<select id="store" name="store" class="form-control" required></select>-->
                        <select id="station" name="station" class="form-control" required></select>
                        <input type="text" class="form-control" name="username" placeholder="Username" required autofocus>
                        <input type="password" class="form-control" name="password" placeholder="Password" required>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
