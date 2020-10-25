<!-- Styles -->
<link href="<?php echo base_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet">
<script src="<?php echo base_url(); ?>assets/js/jquery-1.12.0.min.js"></script>

<style type="text/css">
/* Reset */
    a {
        color: #337ab7;
        text-decoration: none;
        background-color: transparent;
    }

    img {
        vertical-align: middle;
        border: 0;
    }

    strong {
        font-weight: 700;
        font-size: 1.3em;
    }

    [role=button]{
        cursor: pointer;
    }

/* End Reset */

    .nav{
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }

    .nav>li {
        position: relative;
        display: block;
    }

    .nav>li>a {
        position: relative;
        display: block;
        padding: 10px 15px;
    }

	.subnav{
		background-color: #FFF;
	}

    .navbar-inverse{
        background: #000;
    }

	.navbar{
		border-radius: 0;
		margin:0;
		background: none repeat scroll 0 0 rgba(2, 2, 2, 2.6);
		color: #fff;
		border:none;
        position: relative;
        min-height: 50px;
	}

    .navbar-default .navbar-nav>li>a {
        color: #777;
    }

    .navbar>li>a {
        line-height: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .navbar-nav>li>a {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 20px;
    }

    @media (min-width: 768px){
        .navbar-nav>li>a {
            padding-top: 15px;
            padding-bottom: 15px;
        }
    }

    .navbar-collapse {
        padding-right: 15px;
        padding-left: 15px;
        overflow-x: visible;
        border-top: 1px solid transparent;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
    }

    .collapse {
        display: none;
    }

    .caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }

    .navbar::before, .container-fluid::before, .navbar-header::before, 
    .container-fluid::after, .nav::before, .navbar-collapse::before {
        display: table;
        content: " ";
    }

    .navbar-header::after, .container-fluid::after, .nav::after, .navbar-collapse::after,
    .navbar::after {
        clear: both;
    }

    .container-fluid {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

    .container-fluid > .navbar-header {
        margin-right: -15px;
        margin-left: -15px;
    }

    .navbar-default .navbar-collapse {
        border-color: #e7e7e7;
    }

    .container-fluid > .navbar-collapse {
        margin-right: -15px;
        margin-left: -15px;
    }

    @media (min-width: 768px){
        .navbar-right {
            float: right !important;
            margin-right: -15px;
        }
    }

    @media (min-width: 768px){
        .navbar-right{

        float: left;
        margin: 0;
        }
    }

    @media (min-width: 768px){
        .navbar-right~.navbar-right {
            margin-right: 0;
        }
    }

</style>

<nav class="navbar navbar-default custom-navbar">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        	<div style="float:left;">
                <a href="<?php echo base_url('backoffice/dashboard'); ?>"><img src="<?php echo base_url('assets/img/backoffice/company_logo.png'); ?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
            </div>
        </div>
        
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li id="navLogoutDropdown" class="dropdown">
                    <a onclick="toggleDropdown()" id="dropdownLogoutLink" href="#" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">
                        <span style="font-size:12px; color:#FFF; font-weight:bold;">Hello <i><?php echo $currentuser; ?></i></span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownLogoutLink">
                        <li>
                        
                        <a class="dropdown-item" href="<?php echo base_url("backoffice/logout"); ?>">Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
			<ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
					<a id="closeme" style="color:#fff;"><strong>Location: <?php echo "<label style='color:#3C6;'>" . $storename . "</label>"; ?></strong></a>
	
                </li> 
            </ul>
			
			<ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
					<a id="closeme2" style="color:#fff;"><strong>Station: <?php echo "<label style='color:#3C6;'>" . $station_name . "</label>"; ?></strong></a>
                </li> 
                
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                <a onclick="location.reload()" style="cursor:pointer;color:#fff;">
                    <span class="glyphicon glyphicon-refresh"></span>
                </a>
                </li>
            </ul>
        </div>
    </div><!-- /.container-fluid -->
</nav>
<script>
    function toggleDropdown(){
        const dropdown = document.querySelector('#navLogoutDropdown');
        dropdown.classList.contains('open')
            ? dropdown.classList.remove('open')
            : dropdown.classList.add('open')
    }
    
</script>
