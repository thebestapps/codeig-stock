(function() {
  angular.module("akamaiposApp")
  .controller("akamaiposController", function ($scope) {
    var url = "http://192.168.0.110:82/pos/pointofsale/load-customers";
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'Unique' },
            { name: 'Name' }
        ],
        url: url,
        async: false
    };

    var dataAdapter = new ngWidgets.ngx.dataAdapter(source);
    // Create a ngxComboBox
    $scope.comboboxSettings = { selectedIndex: 0, source: dataAdapter, displayMember: "Name", valueMember: "Unique", width: 200, height: 25 };

    // trigger the select event.
    /*
    $scope.selectHandler = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                $scope.log = "Label: " + item.label + ", Value: " + item.value;
            }
        }
    };
    */
  })
});
