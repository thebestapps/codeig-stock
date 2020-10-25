<style type="text/css">
	.subnav{
		background-color: #FFF;		
	}

    .navbar-inverse{
        background: #000;
    }
	
	.navbar{
		background-color: #337ab7;
		border-color: #2e6da4;
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
            <img src="<?php echo base_url('assets/img/company_logo.png')?>">&nbsp;&nbsp;&nbsp;<strong style="font-size:1.3em;">Invoice Report</strong>
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
<div class="wrapper" style="margin: 10px;">
    <nav class="navbar navbar-default" role="navigation">
    	 <div class="col-md-2">
             <div class="form-group">
                <label for="invoice-type" class="control-label">Invoice Type:</label>
                <select id="_selinvoicetype" class="form-control">
                    
                </select>
              </div>
         </div>
         <div class="col-md-2">
         	 <div class="form-group">
                <label for="startinvoice" class="control-label">Start Invoice Unique:</label>
                <input type="number" class="form-control" name="_startinvoiceunique" id="_startinvoiceunique" value="0" placeholder="Enter Invoice Unique">
             </div>
         </div>
         <div class="col-md-2">
             <div class="form-group">
                <label for="endinvoice" class="control-label">End Invoice Unique:</label>
                <input type="number" class="form-control" name="_endinvoiceunique" id="_endinvoiceunique" value="0" placeholder="Enter Invoice Unique">
             </div>
         </div>
         <div class="_handler">
             <div style="float:left;">
                <div class="form-group" style="padding-top:15px;">
                    <input type="button" id="_ok" class="btn btn-lg btn-primary" value="Generate">
                </div>
             </div>
             <div style="float:left; margin-left:20px;">
                <div class="form-group" style="padding-top:15px;">
                    <!--<input type="button" class="btn btn-lg btn-primary" value="Enter Values" data-toggle="modal" data-target="#exampleModal">-->
                    <input type="button" class="btn btn-lg btn-primary" id="_print" value="Print" disabled="disabled">
                </div>
            </div>
        </div>  
    </nav>
</div>
<style type="text/css">
	._buttonhandler{
		padding:5px;
	}
</style>

<!--</div>-->
