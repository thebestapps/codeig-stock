function CloseColorbox()
{
    parent.$.fn.colorbox.close();
}

/*
 * jQuery Global Functions
 **/
$.strPad = function(i,l,s) {
    var o = i.toString();
    if (!s) {s = '0';}
    while (o.length < l) {
        o = s + o;
    }
    return o;
};
