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
<div ng-controller="akamaiposController as pos">
<?php /*
    <nav class="navbar navbar-default">
    <div class="container-fluid" style="margin:0; padding:0;">
        <!-- Brand and toggle get grouped for better mobile display -->
      	<div class="col-md-12" style="margin:0; padding:0;">
                <div class="col-md-7" style="margin-top: 4px;">
                <a href="<?php echo base_url('pos/cashier')?>"><img src="<?php echo base_url('assets/img/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
                </div>
                <div class="col-md-5" style="margin-top: 4px;" align="right">
                    <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                        <?php //echo "Station: <label style='color:#3C6;'>".$station."</lable>"; ?>
                        Station: <span style='color:#3C6;' id="station"></span>
                    </strong>
                    <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                        <?php //echo "Location: <label style='color:#3C6;'>".$storename."</lable>"; ?>
                        Location: <span style='color:#3C6;' id="store_name"></span>
                    </strong>
                    <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                        <ul class="nav navbar-nav navbar-right" style="margin-top: 0;">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <span style="color:#FFF; font-weight:bold;">Logged: <i style='color:#3C6;'><?php echo $currentuser ?></i></span>
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="<?php echo base_url("backoffice/logout") ?>">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </strong>
                </div>
		</div>
    </div><!-- container-fluid -->
</nav>
*/
?>
