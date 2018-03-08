app.controller('SampleDataEntryCtrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {


	// Default values to be used before selections are made
	$scope.defaults = {
		year: '2016',
		region: '3',
		department:'6'
	}
	
	$scope.selections = {
		year: $scope.defaults.year,
		region: $scope.defaults.region,
		department: $scope.defaults.department
	};

	$scope.lists = {
		months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
		accounts: []
	};
	
	$scope.table = $tm1Ui.tableCreate($scope, $scope.lists.accounts);
	
}]);
