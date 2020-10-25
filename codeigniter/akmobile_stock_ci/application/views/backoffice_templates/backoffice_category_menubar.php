<?php
    categoryjs();
?>
<style type="text/css">
    body{
        padding:0;
        margin:0;
    }
    .navbar{
        margin:0;
        padding:0;
        background: none repeat scroll 0 0 rgba(2, 2, 2, 2.6);
        color: #fff;
        border:none;
        border-radius: 0 !important;
    }
</style>
<script type="text/javascript">
	
</script>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="col-md-12 col-md-offset-0">
            <div class="col-md-6">
                <a href="<?php echo base_url('backoffice')?>"><img src="<?php echo base_url('assets/img/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
            </div>
            <div class="col-md-6" style="margin-top: 4px;" align="right">
                <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                    <?php //echo "Station: <label style='color:#3C6;'>".$station."</lable>";?>
                    Station: <span style='color:#3C6;' id="station"></span>
                </strong>
                <?php /*
                <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                    <?php //echo "Receipt Number: ".$NewReceiptNumber ?>
                    Cash In: <span style='color:#3C6;' id="cashin"></span>
                </strong>
                <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                    <?php //echo "Cashier: <label style='color:#3C6;'>".$currentuser."</lable>";?>
                    Cashier: <span style='color:#3C6;' id="user_name"></span>
                </strong>
                */ ?>
                <strong id="tabtitle" style="line-height:45px; margin:10px 10px 0px 0px; font-size:12px;">
                    <?php //echo "Location: <label style='color:#3C6;'>".$storename."</lable>";?>
                    Location: <span style='color:#3C6;' id="store_name"></span>
                </strong>
            </div>
        </div>
    </div><!-- container-fluid -->
</nav>
