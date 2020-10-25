<script type="text/javascript">
    var conn = new WebSocket('ws://192.168.0.93:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
        console.log(e.data);
        var chat = document.getElementById('chatmessage');

        chat.value = e.data+"\r\n";
    };

    function SendMsg(){
       var msg = document.getElementById('chatbox');
       conn.send(msg.value);
    }
</script>

<div style="float:left; width:50px;">
    <div style="float:left">
        <textarea id="chatmessage" rows="20" cols="30"></textarea>
    </div>
    <div style="float:left">
        <textarea id="chatbox" rows="5" cols="30"></textarea>
    </div>
    <div style="float:left">
        <input type="button" onclick="SendMsg()" value="Send"/>
    </div>
</div>


<?php
    require __DIR__ . '/vendor/autoload.php';