
<style type="text/css">
	.subnav{
		background-color: #FFF;
	}

    .navbar-inverse{
        background: #000;
    }

	.navbar.custom-navbar{
		/*
		background-color: #337ab7;
		border-color: #2e6da4;
		*/
		border-radius: 0;
		margin:0;
		background: none repeat scroll 0 0 rgba(2, 2, 2, 2.6);
		color: #fff;
		border:none;

	}

    .custom-navbar{
        margin-bottom: 5px;
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
    
    $(document).on('click', "#aklogo", function(e){
        e.preventDefault();
    
		$.ajax({
			url : base_url + 'backoffice/cache/data',
			method: 'get',
			type: 'json',
			success: function(data){
				window.location = base_url + 'pos/cashier';
			}
		})
	})
    
</script>
<nav class="navbar navbar-default custom-navbar">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        	<div style="float:left;">
            <?php
                $POSDiasble = $this->session->userdata("POSDisable");
                if($POSDiasble == 1):
            ?>
                    <a href="<?php echo base_url('backoffice/dashboard')?>"><img src="<?php echo base_url('assets/img/backoffice/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
            <?php
                else :
            ?>
                    <a id="aklogo" style="cursor: pointer;"><img src="<?php echo base_url('assets/img/cashier/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
            <?php
                endif;
            ?>
            </div>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
	<?php if(@$currentuser):?>
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
			<ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
					<a id="closeme" style="color:#fff;"><strong>Location: <?php echo "<label style='color:#3C6;'>".$storename."</lable>";?></strong></a>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
   	 <?php endif; ?>
    </div><!-- /.container-fluid -->
</nav>
