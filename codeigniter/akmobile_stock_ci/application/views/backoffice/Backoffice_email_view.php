<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="<?php echo base_url() ?>assets/js/angular/jquery-1.12.0.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/blockUI.js"></script>
        <script src="<?php echo base_url() ?>assets/js/bootstrap4/bootstrap.min.js"></script>
        <link rel="stylesheet" href="<?php echo base_url() ?>assets/css/bootstrap4/bootstrap.css"/>
        <link rel="stylesheet" href="<?php echo base_url()?>assets/css/styles.css" type="text/css" />
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <script src="" async defer></script>
        <script type="text/javascript">

            $(function(){
                
                $("#resetBtn").click(function(){
                    $("input[name='To']").val("");
                    $("input[name='Cc']").val("");
                    $("input[name='Bcc']").val("");
                    $("input[name='Subject']").val("");
                    $("input[name='secondFile']").val("");
                    $("textarea[name='message_body']").val("");
                    $("input[name='To']").focus();
                    $("#scroll").html('<div id="output"></div>');
                });

                $("#email_form").on('submit', function(e){
                    e.preventDefault();
                    var $form = $(e.target);
                    var bv = $form.data('bootstrapValidator');
                    var x = document.getElementById("myFile");
                    var form_data = new FormData();
                    var i;
                    for (i = 0; i < x.files.length; i++) {
                        var file_data = x.files[i];
                        form_data.append('file[]', file_data);
                    }
                    form_data.append('post', $form.serialize());

                    $.ajax({
                        url: $form.attr('action'),
                        type: 'post',
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        beforeSend: function(){
                            $('body').block({message: 'Please Wait...'})
                        },
                        success: function(data){
                            $('body').unblock();
                           
                            if(data.status=='Success'){
                                $form.find('#result').html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><label id="msg">'+data.status+':'+data.message+'</label></div>');
                                $("#resetBtn").trigger('click');
                            }else{
                                var content = '<div class="alert alert-danger" ><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
                                
                                $.each(data.message,function(i,j){
                                    content +='<span>'+i+' : '+j+'</span><br/>';
                                });

                                content += '</div>';
                                $form.find('#result').html(content);
                            }
                        }
                    })
                })
            })

            function myFunction() {
                var x 	= document.getElementById("myFile");
                var txt = "";
                if ('files' in x) {
                    if (x.files.length == 0) {
                        txt = "Select one or more files.";
                    } else {
                        for (var i = 0; i < x.files.length; i++) {
                            txt += '<div class="alert alert-primary alert-dismissible fade show" role="alert"><a href="javascript:" class="close"   aria-label="close" onclick="delete_file(this)">&times;</a>';
                            var file = x.files[i];
                            if ('name' in file) {
                                txt += file.name;
                                txt += "<input type='hidden' name='files[]' value='"+ file.name +"'/>";
                            }
                            if ('size' in file) {
                            txt += " size: " + file.size + " bytes <br>";
                            }
                            txt +="</div>";
                        }

                        var x = document.getElementById("myFile");

                        var form_data = new FormData();
                        var i;
                        for (i = 0; i < x.files.length; i++) {
                            var file_data = x.files[i];
                            form_data.append('file[]', file_data);
                        }

                        $.ajax({
                            url			: "<?php echo base_url('reports/mail/upload')?>",
                            dataType	: 'text',
                            cache		: false,
                            contentType	: false,
                            processData	: false,
                            data		: form_data,
                            type		: 'post',
                            beforeSend	: function() {
                                $('body').block({message: 'Please Wait...'})
                            },
                            success	: function(result) {
                                var result = $.parseJSON(result);
                                $('body').unblock();
                                $(".alert-danger, .alert-success").alert('close');
                                if(result.status=='Success'){
                                    $('#output').append(txt);
                                    // $('#result').html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><label id="msg">'+result.status+': '+result.message+'</label></div>');
                                    // window.onbeforeunload = function(e) {
                                    //     return "Sure you want to leave?";
                                    // };

                                } else {
                                    var content = '<div class="alert alert-danger alert-dismissible fade show" ><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';

                                    $.each(result.message,function(i,j){
                                        content +='<span>'+i+': '+j+'</span><br/>';
                                    });
                                    content += '</div>';
                                    $('#result').html(content);
                                }
                            }
                        });
                    }
                }
                document.getElementById("myFile").value='';
                if(document.querySelectorAll('div .alert-info1').length > 3){
                    $("#scroll").addClass("scroll");
                }else{
                    $("#scroll").removeClass("scroll");
                }
            }

            

            function delete_file(obj) {
                if(confirm("Are you sure?")){
                    var value = $(obj).siblings('input').val();
                    var data  = "filename="+value;
                    $.ajax({
                        url			: "<?php echo base_url('reports/mail/delete_file')?>",
                        data		: data,
                        type		: 'post',
                        success		: function(result)
                        {obj.parentNode.parentNode.removeChild(obj.parentNode);
                        }
                    });
                }
            }
        </script>
        
        <div class="main">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <?php
                        $POSDiasble = $this->session->userdata("POSDisable");
                        if($POSDiasble == 1):
                    ?>
                        <a href="<?php echo base_url('backoffice/dashboard')?>"><img src="<?php echo base_url('assets/img/backoffice/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
                    <?php
                        else :
                    ?>
                        <a href="<?php echo base_url('pos/cashier')?>"><img src="<?php echo base_url('assets/img/cashier/company_logo.png')?>"></a>&nbsp;&nbsp;&nbsp;<strong id="tabtitle" style="font-size:1.3em;"></strong>
                    <?php
                        endif;
                    ?>     
                </div>
                <!-- /.navbar-header -->
                <form class="form-inline my-2 my-lg-0">
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url("backoffice/reports")?>" style="outline:0;color:#3C6;">
                                    <span class="icon-back"></span>
                                    Email Report
                                </a>
                            </li>
                            <li class="nav-item"><?php echo '<label class="nav-link" style="color:#fff;">Station: '.$StationName.'</label>'; ?></li>
                            <li class="nav-item"><?php echo '<label class="nav-link" style="color:#fff;">Location: '.$StoreName.'</label>'; ?></li>
                            <li class="dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" style="color: #fff;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Logged: <?=$currentuser?>
                                </a>
                                <ul class="dropdown-menu dropdown-user">
                                    <li>
                                        <span style="color:#00F; margin-left:5px;">Logged: <?php echo $currentuser ?></span>
                                    </li>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="<?php echo base_url("backoffice/logout") ?>">Logout</a>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </form>
            </nav>
            <div style="margin-bottom: 0; background-color: rgba(50, 50, 50, 0.1); height:55px; width:100%; padding-top:3px;">
                <div id="toolbar" class="toolbar-list">
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <a class="nav-link" href="<?=base_url("backoffice/dashboard")?>" style="outline:0; text-decoration:none !important;">
                                <?php 
                                    echo trim('<span class="icon-dashboard"></span>Dashboard');
                                ?>
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" onclick="window.history.back();" href="javascript:" style="outline:0;">
                                <span class="icon-back"></span>
                                Back
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content">
                <form method="post" id="email_form" action="<?php echo base_url('backoffice/email/send')?>" enctype="multipart/form-data">
                    <div class="form-group">
                        <div class="col-sm-5 offset-sm-2">
                            <button type="button" class="btn btn-info" id="resetBtn">Reset</button>
                            <button type="submit" class="btn btn-primary" name="send_mail" value="Send Mail">Send</button>
                        </div>
                    </div>
                    <div id="warning">
                        <?php
                            $mandatory = "no";
                            if(!empty($userdata)):
                                foreach($userdata as $key=>$value):
                                    $required = array("Host","Port","SmtpServer", "UserName","Password","FromEmail","FromName","SMTPSecure");
                                    if(in_array($key,$required) && empty($value)):
                                    ?>
                                        <div class="alert alert-warning">
                                        <strong>Warning!</strong><?=$key?> value is empty!
                                        </div>
                                    <?php
                                        $mandatory = "yes";
                                    endif;
                                endforeach;
                            else:
                                $mandatory = "yes";
                                echo '<div class="alert alert-danger">Email is not currently setup.</div>';
                            endif;
                            if($this->session->userdata("failed_count")>4):
                                $mandatory = "yes";
                            ?>
							<div class="alert alert-danger" >Sorry Maximum Allowed Email Attempts is 5.  Please log out then log back in.</div>
						<?php endif; ?>
                    </div>

                    <div id="result"></div>

                    <div class="form-group row">
                        <label for="inputEmailFrom" class="col-sm-2 col-form-label text-right">From:</label>
                        <div class="col-sm-10">
                            <input type="email" name="Name" readonly class="form-control" id="emailFrom" placeholder="From" value="<?=($userdata)?$userdata->FromName.' | '.$userdata->FromEmail:''?>">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailTo" class="col-sm-2 col-form-label text-right">To:</label>
                        <div class="col-sm-10">
                            <input type="text" name="To" class="form-control" id="emailTo" placeholder="To" value="" autofocus>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailBcc" class="col-sm-2 col-form-label text-right">Bcc:</label>
                        <div class="col-sm-10">
                            <input type="text" name="Bcc" class="form-control" id="emailBcc" placeholder="Bcc">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailCc" class="col-sm-2 col-form-label text-right">Cc:</label>
                        <div class="col-sm-10">
                            <input type="text" name="Cc" class="form-control" id="emailCc" placeholder="Bcc">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailCc" class="col-sm-2 col-form-label text-right">Subject:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="emailSubject" name="Subject" placeholder="Subject">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailMessage" class="col-sm-2 col-form-label text-right">Message:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="message_body"  rows="4" cols="50"  name="message_body" placeholder="Message"></textarea>
                            
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmailMessage" class="col-sm-2 col-form-label text-right">File:</label>
                        <div class="col-sm-10">
                            <input type="file" class="form-control" id="myFile" multiple  onchange="myFunction()" value="" />
                            <br/>
                            <div id="scroll" >
                                <div id="output"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>

<style>
    .main {
        width: 100%;
    }
    #content {
        margin: 0 auto;
        padding-top: 20px;
        width: 60%;
    }

    #myFile {
        border:none;
    }

    .scroll {
        overflow-y: auto;
        height: 150px;
    }

    .icon-dashboard {
		background-image: url('../assets/img/backoffice/dashboard.png');
		background-size: 32px 32px;
		background-repeat: no-repeat;
	}

    .icon-back {
		background-image: url('../assets/img/backoffice/back.png');
		background-size: 32px 32px;
        background-repeat: no-repeat;
	} 
</style>