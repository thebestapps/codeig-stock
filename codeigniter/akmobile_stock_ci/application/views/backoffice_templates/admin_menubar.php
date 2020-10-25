<style type="text/css">
	.subnav{
		background-color: #FFF;		
	}
	.top-header{
		float: left;		
	}
</style>
<div class="subnav" style="margin-bottom: 10px;">
	<div class="top-header">
        <img src="<?php echo base_url('assets/img/company_logo.png')?>">
    </div>
   <ul class="nav nav-pills">
      <li <?php if(is_active()): ?>class="active"<?php endif; ?>><a href="<?php echo site_url() ?>main">Main</a></li>
      <li class="dropdown">
         <a class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
         <ul class="dropdown-menu">
               <li><a href="">Item</a></li>
         </ul>
         <li class="dropdown">
         	<a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span></a>
             <ul class="dropdown-menu">
                   <li><a href=""><?php echo ucfirst($username) . "'s Profile"?></a></li>
                   <li class="divider"></li>
                   <li><a href="login/logout">Logout</a></li>
             </ul>
         </li>
      </li> 
   </ul>
</div>
