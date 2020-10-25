(function(){
  angular.module("akamaiposApp", ['ngRoute', 'ngwidgets'])
  .controller("akamaiposController",['$scope','$http','posData', function ($scope,$http,posData) {

		$scope.dialogSettings =
		{
			created: function (args) {
				dialog = args.instance;
			},
			resizable: false,
			width: "100%", height: 900,
			autoOpen: false,
			theme: 'darkblue'
		};

		$scope.NewCustomer = function () {
			dialog.setTitle("New Customer");
			dialog.open();
		}

		$scope.ExitNewCustomer = function () {
			dialog.close();
		}

		//-->Sources
		$scope.thetabs = 'darkblue';
		$scope.tabset = {
			selectedItem: 0
		}
		$scope.placeHolderzipcode = "Select Zipcode";
		$scope.zipcode = {
			source: zipcodesDataAdapter,
			displayMember: "ZipCode",
			valueMember: "Unique",
			width: "99%",
			height: 25
		};
		$scope.zipselectHandler = function (event) {
			var zipcodeargs = event.args;
			if (zipcodeargs) {
				var postData = "geocitiesid=" + zipcodeargs.item.value;
				posData.FindCity(postData)
					.success(function (data) {
						SelZipcode = zipcodeargs.item.value;
						SelCity = data.City;
						SelState = data.State;
						SelIsland = data.County;
						SelCountry = data.Country;
						$scope.city.apply('selectItem', data.City);
						$scope.state.apply('selectItem', data.State);
						$scope.island.apply('selectItem', data.County);
						$scope.country.apply('selectItem', data.Country);
					})
			}
		}

		$scope.city = {
			source: citiesDataAdapter,
			displayMember: "City",
			valueMember: "Unique",
			width: "99%",
			height: 25
		};
		$scope.placeHoldercity = "Select City";

		$scope.state = {
			source: statesDataAdapter,
			displayMember: "State",
			valueMember: "StateID",
			width: "99%",
			height: 25
		};
		$scope.placeHolderstate = "Select State";

		$scope.island = {
			source: islandDataAdapter,
			displayMember: "Island",
			valueMember: "County",
			width: "99%",
			height: 25
		};
		$scope.placeHolderisland = "Select Island";

		$scope.country = {
			source: countriesDataAdapter,
			displayMember: "CountryName",
			valueMember: "CountryCode",
			width: "99%",
			height: 25
		};
		$scope.placeHoldercountry = "Select Country";

		$scope.FirstName = "";
		$scope.LastName = "";
		$scope.Company = "";
		$scope.Address1 = "";
		$scope.Address2 = "";
		$scope.Phone1 = "";
		$scope.Phone2 = "";
		$scope.Phone3 = "";
		$scope.Email = "";
		$scope.Fax = "";
		$scope.Website = "";
		$scope.Custom1 = "";
		$scope.Custom2 = "";
		$scope.Custom3 = "";
		$scope.CustomerNote = "";

		$scope.NewCustomerSave = function () {
			var postData = "fname=" + this.FirstName;
			postData += "&lname=" + this.LastName;
			postData += "&company=" + this.Company;
			postData += "&address1=" + this.Address1;
			postData += "&address2=" + this.Address2;
			postData += "&phone1=" + this.Phone1;
			postData += "&phone2=" + this.Phone2;
			postData += "&phone3=" + this.Phone3;
			postData += "&email=" + this.Email;
			postData += "&website=" + this.Website;
			postData += "&custom1=" + this.Custom1;
			postData += "&custom2=" + this.Custom2;
			postData += "&custom3=" + this.Custom3;
			postData += "&customnote=" + this.CustomerNote;
			postData += "&zipcode=" + SelZipcode;
			postData += "&city=" + SelCity;
			postData += "&state=" + SelState;
			postData += "&island=" + SelIsland;
			postData += "&country=" + SelCountry;

			if (this.FirstName == "" || this.LastName == "") {
				alert("Fill out all required fields.");
			} else {
				posData.SaveNewCustomer(postData)
					.success(function (data) {
						if (data.success = true) {
							alert("New customer profile created.");
							dialog.close();
						}
					})
			}

		}
	}
	])
})();
