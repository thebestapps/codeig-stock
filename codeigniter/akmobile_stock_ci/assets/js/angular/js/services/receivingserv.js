//var base_url = "/app/";
//var api_url = "http://ak1.akamaipos.com:1337/"; Commented by HD 01/11/2016
//var api_url =  "http://akamaipos:1337/";
//var base_url = "http://localhost/app/";

angular.module("akamaiposApp")
    .factory("posData", function posDataFactory($http, $q) {
        return {
            SearchItem: function(itemsearch){
                return $http({
                    method: 'get',
                    url: api_url+'find-inventory/'+itemsearch,
                })
            },

            SearchItemCount: function(itemsearch){
                return $http({
                    method: 'get',
                    url: api_url+'inventory-count/'+itemsearch,
                })
            },

            SaveSelectedItem: function(postdata){
                return $http({
                    method: 'post',
                    url: api_url+'purchase/create',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },

            SavePurchaseHeader: function(postdata){
                return $http({
                    method: 'post',
                    url: api_url+'purchase-header/create',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            ReceivePO: function(postdata){
                return $http({
                    method: 'post',
                    url: api_url+'purchase-header/create',
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            UpdatePD: function(unique, postdata){
                return $http({
                    method: 'put',
                    url: api_url+'purchasepd/update/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            UpdatePH: function(unique, postdata){
                var deferred = $q.defer();
                return $http({
                    method: 'put',
                    url: api_url+'purchaseph/update/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data)
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(status)
                });
                return deferred.promise;
            },
            DeletePD: function(unique, postdata){
                return $http({
                    method: 'put',
                    url: api_url+'purchasepd/delete/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            DeletePH: function(unique, postdata){
                return $http({
                    method: 'put',
                    url: api_url+'purchaseph/delete/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },

            DeletePDByUnique: function(unique){
                return $http({
                    method: 'put',
                    url: api_url+'purchasepd/delete-by-unique/'+unique,
                })
            },

            RemoveTrash: function(){
                return $http({
                    method: 'put',
                    url: api_url+'purchaseph/remove-trash'
                })
            },
            DeleteStock: function(unique){
                return $http({
                    method: 'put',
                    url: api_url+'stock-quantity/delete/'+unique
                })
            },
            PurchasePDbyUnique: function(unique, postdata){
                return $http({
                    method: 'put',
                    url: api_url + 'purchasepd/update-by-unique/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            StockQtyUpdate: function(unique, postdata){
                return $http({
                    method: 'put',
                    url: api_url+'stock-quantity/update/'+unique,
                    data: postdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        }

    });