// Code goes here

angular.module('akamaiposApp', ['gm.typeaheadDropdown'])
.controller('akamaiposController', ['$scope', function($scope) {
	$scope.options = [
		{
			name:"Mary"
		},
		{
			name:"Jane"
		},
		{
			name:"John"
		},
		{
			name:"Fred"
		}
	];
	
	$scope.options2 = [
		{
			title:"The Fellowship of the Ring"
		},
		{
			title:"The Two Towers"
		},
		{
			title:"The Return of the King"
		},
		{
			title:"The Hobbit"
		}
	];
	
	$scope.selectedOption2 = {
		book:"The Hobbit"
	}
	
	$scope.config = {
		modelLabel:'book',
		optionLabel:'title'
	};
}]);