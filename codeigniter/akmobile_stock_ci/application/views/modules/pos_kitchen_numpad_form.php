<jqx-window jqx-on-close="close()" id="kitchenNumPad" jqx-create="KitchenNumPadFormdialog" jqx-settings="KitchenNumPadFormdialog" style="display:none;">
  <div id="kitchen-numpad-form-container">
      <div style="padding:0; margin:0;">
          <div class="kitchen-numpad-container">
           <?php /*?> <div id="KitchenNumPadTitle"></div><?php */?>
           <form id="DefaultFormID" class="custom-price-change">
            <div class="kitchen-numpad-input">
                <jqx-number-input id="kitchen-numpad-value" jqx-width="265" jqx-height="45" jqx-spin-buttons="false" jqx-input-mode="simple" ng-enter="OpenItemPrice()" jqx-symbol="''" ng-model="NumPad.NumPad"></jqx-number-input>
            </div>
            <div class="kitchen-numpad-buttons">
                <div class="kitchen-numpad-carrier">
                 	<div class="col-md-12">
                        <div class="col-md-3 hdcols">
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 7">77</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 4">4</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 1">1</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 0">0</li>
                        </div>	
                        <div class="col-md-3 hdcols">
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 8">8</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 5">5</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 2">2</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + '.'">.</li>
                        </div>
                        <div class="col-md-3 hdcols">
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 9">9</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 6">6</li>
                            <li class="button-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 3">3</li>
                        </div>
                        <div class="col-md-3 hdcols">
                            <button type="button" class="btn-fn" ng-click="OpenItemPriceCancel()">Cancel</button>
                            <button type="button" class="btn-fn" ng-click="NumPad.NumPad=0">Clear</button>
                            <button type="submit" class="btn-fn" >Enter</button>
                            <!--
                            	ng-click="OpenItemPrice()"
                            -->
                        </div>
                    </div>
                </div>
            </div>
            </form>
          </div>
      </div>
  </div>
</jqx-window>
<style type="text/css">
   /*
   body{
   	  margin:0;
	  padding:0;
   }  
   */
   
   #NumPadTitle{
	  position: absolute;
	  font-size: 2em;
	  font-weight: bolder;
	  text-align: center;
	  color: rgb(255,255,255);
	  width: 100%;
	  top:5px;
   }
   
   #kitchen-numpad-form-container{
	  background: #144766;
   }
  
  .kitchen-numpad-container{
    position: relative;
    height: 100%;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c3d9ff+0,b1c8ef+41,98b0d9+100;Lavender+3D */
    background: #c3d9ff; /* Old browsers */
    /* IE9 SVG, needs conditional override of 'filter' to 'none' */
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2MzZDlmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjQxJSIgc3RvcC1jb2xvcj0iI2IxYzhlZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5OGIwZDkiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
    background: -moz-linear-gradient(top,  #c3d9ff 0%, #b1c8ef 41%, #98b0d9 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c3d9ff), color-stop(41%,#b1c8ef), color-stop(100%,#98b0d9)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #c3d9ff 0%,#b1c8ef 41%,#98b0d9 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #c3d9ff 0%,#b1c8ef 41%,#98b0d9 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #c3d9ff 0%,#b1c8ef 41%,#98b0d9 100%); /* IE10+ */
    background: linear-gradient(to bottom,  #c3d9ff 0%,#b1c8ef 41%,#98b0d9 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c3d9ff', endColorstr='#98b0d9',GradientType=0 ); /* IE6-8 */
  }
  
  
  .kitchen-numpad-input{
    position: absolute;
    text-align: right;
	padding:0;
    top: 45px;
    height: 45px;
    width: 265px;
    left: 23px;
    background: #fff;
	margin:0;
  }
  
  #kitchen-numpad-value{
	 border:none; 
  }
  
  #kitchenNumPad{
    -webkit-border-radius: 15px 15px 15px 15px;
    border-radius: 15px 15px 15px 15px;
    border: 2px solid #449bca;
  }
  
  .kitchen-numpad-carrier{
	width: 86%;
	margin:0 auto;
  }
  
  .kitchen-numpad-buttons{
	position: absolute;
	top: 105px;
	width: 100%;
  }
  
  .level {
	margin-bottom: 6px;
  }
  
  .button-no{
    -moz-user-select: none;
    border: 1px solid #468db3;
    border-radius: 5px;
    box-sizing: border-box;
    color: #f7faf7;
    cursor: pointer;
    display: inline-block;
    font-family: arial,sans-serif;
    font-size: 20px;
    height: 52px;
    line-height: 52px;
    margin: 10px 0 1px 0px;
    overflow: hidden;
    text-align: center;
    width: 52px;
  }
  
  .btn-fn{
	 -moz-user-select: none;
    border: 1px solid #468db3;
    border-radius: 5px;
    box-sizing: border-box;
    color: #f7faf7;
    cursor: pointer;
    display: inline-block;
    font-family: arial,sans-serif;
    font-size: 20px;
    height: 52px;
    line-height: 52px;
    margin: 10px 0 1px 0px;
    overflow: hidden;
    text-align: center;
    width: 72px;
	background: #004a73;
	vertical-align:bottom;
  }
  
  
  .btn-label{
    font-size: 1.5em;
	margin-bottom: 3px;
  }
  
  .hdcols{
	  margin:0;
	  padding:0; 
  }
</style>