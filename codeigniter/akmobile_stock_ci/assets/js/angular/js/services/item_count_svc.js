angular.module("akamaiposApp")
.factory("posData", function posDataFactory($http, $q){
    return {
        ItemCountData: function(){
            return $http({
				method: 'GET',
				url: base_url + 'dashboard/item/count/data'
			})  
        },
        Location: function(){
            return $http({
				method: 'GET',
				url: base_url + 'dashboard/item/count/location'
			})  
        },
        Category: function(){
            return $http({
				method: 'GET',
				url: base_url + 'dashboard/item/count/category'
			})  
        },
        Supplier: function(){
            return $http({
				method: 'GET',
				url: base_url + 'dashboard/item/count/supplier'
			}) 
        },
        BuildCountList: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/build-count-list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        GetItemList: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/get-item-list',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ItemCountListSave: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/save',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        FinishCount: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/finish-count',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        ZeroNotCounted: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/zero-not-counted',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DeleteCheckedItems: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/delete-items',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        DeleteCount: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/delete-count',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        CompleteChangesSave: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/save-changes',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SelectCategory: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'dashboard/item/count/select-category',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
    }
})