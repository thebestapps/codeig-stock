angular.module("akamaiposApp")
.config(function ($httpProvider) {
	$httpProvider.responseInterceptors.push('myHttpInterceptor');
	var spinnerFunction = function (data, headersGetter) {
		// todo start the spinner here
		alert('start spinner');
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
})