/*------------------------------------------------------------------| 
|  Company: AkamaiPOS                                               |
|  Title: Card Reader Parser                                        |
|  Created: by HD                                     |
|  Email: HD                                       |
|  Created: 06-07-2017                                              |
|------------------------------------------------------------------*/
function CardReaderParser(strParse){
    this.input_trackdata_str = strParse;
    this.converted = null;

    sTrackData = this.input_trackdata_str;
    if ( strParse != '' ){
       //-->Splitter
       var CardSplit = sTrackData.split(';');
       if(CardSplit[0]){
            this.converted = CardSplit[0].replace(/%/g,'').replace(/\?/g,'');
       }else if(CardSplit[1]){
            this.converted = CardSplit[1].replace(/%/g,'').replace(/\?/g,'');
       }else if(CardSplit[2]){
            this.converted = CardSplit[2].replace(/%/g,'').replace(/\?/g,'');
       }else{
            this.converted = strParse;
       } 
    }

    this.dump = function(){
        var s = "";
        s += this.converted;
        return s;
    };
}