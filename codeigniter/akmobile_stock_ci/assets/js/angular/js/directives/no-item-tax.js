var GlobalItemUnique = {};
var svc = {};
var DiscountVal = {};
var numbers;
angular.module("akamaiposApp")
.service('svc', function() {})

	
	.directive('itemTax', function(posData){
		return {
			restrict: "E",
			template: '<button type="button"' + 
						'class="btn btn-danger btn-lg fn noitemtax"' + 
						'ng-click="ItemTax()"' + 
						'ng-model="btndisabled"'+
						'ng-hide="ItemTaxHide">'+
						'{{title}}'+
					  '</button>',
			link: function(scope, element, attrs){
				scope.title = "Item Tax";
				 
			}
		}
	})