/*! gm.typeaheadDropdown - v1.0.0 - 2015-01-30 */
angular.module("gm.typeaheadDropdown.tpl",[])
.run(["$templateCache",function(a){
	a.put("templates/typeaheadDropdown.tpl.html",
	'<div class=dropdown dropdown><div class=input-group><input class=form-control placeholder="Select or type..." ng-model=model[config.modelLabel] typeahead="op[config.optionLabel] for op in options | filter:$viewValue | limitTo:8" typeahead-editable=false typeahead-on-select="onSelect($item, $model, $label)"> <span class=input-group-btn><button class="btn btn-default dropdown-toggle" dropdown-toggle><span class=caret></span></button></span></div><ul class=dropdown-menu role=menu style=max-height:200px;overflow-y:auto><li ng-repeat="op in options"><a href ng-click=onSelect(op)>{{op[config.optionLabel]}}</a></li></ul></div>')}]),
	angular.module("gm.typeaheadDropdown",["gm.typeaheadDropdown.tpl","ui.bootstrap"])
	.directive("typeaheadDropdown",function(){
		return{
			templateUrl:"templates/typeaheadDropdown.tpl.html",
			scope:{
				model:"=ngModel",
				getOptions:"&options",
				config:"=?"
			},
			replace:!0,
			controller:["$scope",function(a){
				function b(b){
					a.options=b
				}
				a.config=angular.extend({
					modelLabel:"name",
					optionLabel:"name"
				},
				a.config);
				var c=a.getOptions();
					c.success?c.success(b):c.result?c.result.then(b):b(c),a.onSelect=function(b){angular.extend(a.model,b),a.model[a.config.modelLabel]=b[a.config.optionLabel
			]}
	}]}
});
