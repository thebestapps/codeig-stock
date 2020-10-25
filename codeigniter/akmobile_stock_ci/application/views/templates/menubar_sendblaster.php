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
		background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6);
		color: #fff;
	}
</style>
<script type="text/javascript">
	$(document).ready(function(){
		$("#closeme").click(function(){
			window.close();
		})
	})
</script>
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="<?php echo base_url('emailblaster')?>"><img src="<?php echo base_url('assets/img/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<!--
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span style="font-size:12px; font-weight:bold;">Hello</span>
                         <span style="font-weight:bold; font-style:italic;">
                             
                         </span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
			-->
            <!--
			<ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
					<li><a href="#" id="closeme" style="color:#fff;"><strong>Dashboard</strong></a></li>
                </li>
            </ul>
            -->
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
