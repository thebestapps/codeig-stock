angular.module("akamaiposApp")
.factory("recipeData", function recipeDataFactory($http, $q){
	return {
        GetListItems: function(){
            return $http({
                method: 'GET',
                url: base_url + 'backoffice/item-kit/items'
            })
        },
        GetListRecipeItems: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'backoffice/item-kit/menu-items',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SaveItemRecipe: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'backoffice/item-kit/save-menu-item',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        RemoveItemRecipe: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'backoffice/item-kit/remove-menu-item',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        UpdateItemChild: function(postdata){
            return $http({
                method: 'POST',
                url: base_url + 'backoffice/item-kit/update-item',
                data: postdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        SupplierList: function(){
            return $http({
                method: 'GET',
                url: base_url + 'backoffice/item-kit/supplier'
            })
        }
    }
})