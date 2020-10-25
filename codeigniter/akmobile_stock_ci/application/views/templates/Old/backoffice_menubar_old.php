<style type="text/css">
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
		margin:0;
		background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6);
		color: #fff;
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
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->

        <div class="navbar-header" style="width:93%;">
        	<div style="float:left;">
            <a href="<?php echo base_url('pos/cashier')?>"><img src="<?php echo base_url('assets/img/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
            </div>
       <?php if(@$currentuser):?>
            <div style="float:right; height:100%; margin-top: 4px;">
            	<strong id="tabtitle" style="line-height:45px; margin-top:10px; font-size:12px;">Location: <?php echo "<label style='color:#3C6;'>".$storename."</lable>";?></strong>
            </div>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span style="font-size:12px; color:#FFF; font-weight:bold;">Hello <i><?php echo $currentuser?></i></span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="<?php echo base_url("backoffice/logout")?>">Logout</a></li>
                    </ul>
                </li>
            </ul>
            <!--
			<ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
					<li><a href="#" id="closeme" style="color:#fff;"><strong>Dashboard</strong></a></li>
                </li>
            </ul>
            -->
        </div><!-- /.navbar-collapse -->
        <div class="container-fluid" style="width:100%; background:#CCC;"><h5 style="color:#666666; font-weight:bolder;"></h5></div>
   	 <?php endif; ?>
    </div><!-- /.container-fluid -->
</nav>
