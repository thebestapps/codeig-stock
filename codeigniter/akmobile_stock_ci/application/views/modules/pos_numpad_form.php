<jqx-window jqx-on-close="close()" id="keypadform" jqx-create="KeyPadFormdialog" jqx-settings="KeyPadFormdialog" style="display:none;">
  <div id="keypad-form-container">
      <div id="keypad-form-body" style="padding:0; margin:0;">
          <div class="numpad-container">
            <div id="NumPadTitle"></div>
            <div class="numpad-input">
                <jqx-number-input  id="numpad-input" jqx-width="302" jqx-height="45" jqx-spin-buttons="false" jqx-input-mode="simple" ng-enter="NumpadEnter()" jqx-symbol="''" ng-model="NumPad.NumPad"></jqx-number-input>
            </div>
            <div class="numpad-buttons">
                <div class="numpad-carrier">
                 	<div class="col-md-12" style="margin:0; padding:0;">
                        <div class="col-md-3" style="margin:0; padding:0;">
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 7">7</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 4">4</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 1">1</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 0">0</button>
                        </div>	
                        <div class="col-md-3" style="margin:0; padding:0;">
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 8">8</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 5">5</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 2">2</button>
                            <button id="NumPad-Decimal" class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + '.'" style="display:none;">.</button>
                        </div>
                        <div class="col-md-3" style="margin:0; padding:0;">
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 9">9</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 6">6</button>
                            <button class="numpad-button btn-no" ng-click="NumPad.NumPad = NumPad.NumPad + '' + 3">3</button>
                        </div>
                        <div class="col-md-3" style="margin:0; padding:0;">
                            <button class="numpad-button btn-label cancel" id="NumPad-Cancel" ng-click="NumPadCancel()">Cancel</button>
                            <button class="numpad-button btn-label clear" ng-click="NumPad.NumPad=0">Clear</button>
                            <button class="numpad-button-enter btn-label" id="NumPad-Enter" ng-click="NumPadEnter()">Enter</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</jqx-window>
<style type="text/css">
   #NumPadTitle{
	  position: absolute;
	  font-size: 2em;
	  font-weight: bolder;
	  text-align: center;
	  color: rgb(255,255,255);
	  width: 100%;
	  top:5px;
   }
   
   #keypad-form-container{
	  background: #069;
	  background-image: -webkit-linear-gradient(top, #069, #63C);
	  background-image: -moz-linear-gradient(top, #069, #63C);
	  background-image: -ms-linear-gradient(top, #069, #63C);
	  background-image: -o-linear-gradient(top, #069, #63C);
	  background-image: linear-gradient(to bottom, #069, #63C);
	  -webkit-border-radius: 10px;
	  -moz-border-radius: 0;
	  border-radius: 0;
	  font-family: Arial;
	  text-decoration: none;
   }
  
  .numpad-container{
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
  
  
  .numpad-button{
	height: 75px;
	width: 74px;
	border-radius: 6px;
	/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#e4f5fc+0,bfe8f9+50,9fd8ef+51,2ab0ed+100;Blue+Gloss+%235 */
	background: #e4f5fc; /* Old browsers */
	/* IE9 SVG, needs conditional override of 'filter' to 'none' */
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2U0ZjVmYyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2JmZThmOSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUxJSIgc3RvcC1jb2xvcj0iIzlmZDhlZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyYWIwZWQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
	background: -moz-linear-gradient(top,  #e4f5fc 0%, #bfe8f9 50%, #9fd8ef 51%, #2ab0ed 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e4f5fc), color-stop(50%,#bfe8f9), color-stop(51%,#9fd8ef), color-stop(100%,#2ab0ed)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #e4f5fc 0%,#bfe8f9 50%,#9fd8ef 51%,#2ab0ed 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #e4f5fc 0%,#bfe8f9 50%,#9fd8ef 51%,#2ab0ed 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #e4f5fc 0%,#bfe8f9 50%,#9fd8ef 51%,#2ab0ed 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #e4f5fc 0%,#bfe8f9 50%,#9fd8ef 51%,#2ab0ed 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e4f5fc', endColorstr='#2ab0ed',GradientType=0 ); /* IE6-8 */
  }
  
  .cancel{
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f3c5bd+0,e86c57+50,ea2803+51,ff6600+75,c72200+100;Red+Gloss */
    background: #f3c5bd; /* Old browsers */
    /* IE9 SVG, needs conditional override of 'filter' to 'none' */
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YzYzViZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2U4NmM1NyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUxJSIgc3RvcC1jb2xvcj0iI2VhMjgwMyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ijc1JSIgc3RvcC1jb2xvcj0iI2ZmNjYwMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNjNzIyMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
    background: -moz-linear-gradient(top,  #f3c5bd 0%, #e86c57 50%, #ea2803 51%, #ff6600 75%, #c72200 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f3c5bd), color-stop(50%,#e86c57), color-stop(51%,#ea2803), color-stop(75%,#ff6600), color-stop(100%,#c72200)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* IE10+ */
    background: linear-gradient(to bottom,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3c5bd', endColorstr='#c72200',GradientType=0 ); /* IE6-8 */
  }
  
  .clear{
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fceabb+0,fccd4d+50,f8b500+51,fbdf93+100;Orange+3D+%235 */
    background: #fceabb; /* Old browsers */
    /* IE9 SVG, needs conditional override of 'filter' to 'none' */
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZjZWFiYiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2ZjY2Q0ZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUxJSIgc3RvcC1jb2xvcj0iI2Y4YjUwMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmYmRmOTMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
    background: -moz-linear-gradient(top,  #fceabb 0%, #fccd4d 50%, #f8b500 51%, #fbdf93 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fceabb), color-stop(50%,#fccd4d), color-stop(51%,#f8b500), color-stop(100%,#fbdf93)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%); /* IE10+ */
    background: linear-gradient(to bottom,  #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#fbdf93',GradientType=0 ); /* IE6-8 */
  }
  
  .numpad-input{
    position: absolute;
    text-align: right;
	padding:0;
    top: 45px;
    height: 45px;
    width: 86%;
    left: 23px;
    background: #fff;
	margin:0;
  }
  
  #numpad-input{
	 border:none; 
  }
  
  #hdmanid {
	font-size: 1.4em;
  }

  #keypadform{
    -webkit-border-radius: 15px 15px 15px 15px;
    border-radius: 15px 15px 15px 15px;
    border: 5px solid #449bca;
  }
  
  .numpad-carrier{
	width: 86%;
	margin:0 auto;
  }
  
  .numpad-buttons{
	position: absolute;
	top: 105px;
	width: 100%;
  }
  
  .level {
	margin-bottom: 6px;
  }
  
  .btn-no{
    font-size: 1.5em;
	margin-bottom: 3px;
  }
  .btn-label{
    font-size: 1.5em;
	margin-bottom: 3px;
  }
</style>