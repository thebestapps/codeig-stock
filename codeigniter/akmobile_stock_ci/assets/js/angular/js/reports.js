(function() {
    //var base_url = "/app/";
   //var api_url =  "http://akamaipos:1337/";

    angular.module("akamaiposApp", ['ngRoute', 'jqwidgets', 'ngSanitize'])
    .service('svc', function() {})
    .controller("akamaiposController", ['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window', '$filter', function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window, $filter) {
		
		
	}]);
})();