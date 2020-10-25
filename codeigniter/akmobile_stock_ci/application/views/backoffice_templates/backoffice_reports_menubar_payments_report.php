<?php
	reports_template();
	angularjsreports();
	reports_extended_js();
?>

<script type="text/javascript">
    var SiteUrl="<?php echo base_url() ?>";
	var api_url = "<?php echo API_CONSTANT ?>";
	var base_url = "<?php echo BASE_URL_CONSTANT ?>";
</script>

<style type="text/css">
	body{
		padding:0;
		margin:0;
	}
	.subnav{
		background-color: #FFF;
	}

    .navbar-inverse{
        background: #000;
    }

	.navbar{
		/*
		background-color: #337ab7;
		border-color: #2e6da4;
		*/
        border: 0;
		margin:0;
		background: none repeat scroll 0 0 rgba(2, 2, 2, 2.6);
		color: #fff;
		border-radius:0;
	}
</style>
<script type="text/javascript">
	$(window).load(function() {
    	$('.navbar').fadeIn(700);
	});

	$(document).ready(function(){
		$("#closeme").click(function(){
			window.close();
		})
	})
</script>

