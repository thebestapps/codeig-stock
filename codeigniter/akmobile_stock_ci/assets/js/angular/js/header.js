angular.module("akamaiposApp", ['ngRoute', 'ngwidgets', 'ngSanitize'])
.service('svc', function() {})
.controller("akamaiposController",['$scope', '$compile', '$http', 'svc', '$routeParams', '$q', 'posData', '$window',  function ($scope, $compile, $http, svc, $routeParams, $q, posData, $window) {
        var NewSaleQuedialog;

        /* Alert Process Popup*/
        $scope.dialogNewSaleQ = {
            created: function(args){
                NewSaleQuedialog = args.instance;
            },
            resizable: false,
            width: 300, height: 195,
            autoOpen: false,
            theme: 'darkblue',
            isModal: true,
            showCloseButton: false
        };
        /* End */
}])
.directive('newsaleLogoque', function(){
    return {
        restrict: 'E',
        templateUrl: base_url + 'pos/pointofsale/new-sale-logo-que'
    };
});
