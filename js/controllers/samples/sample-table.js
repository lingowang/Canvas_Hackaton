app.controller('SampleTableCtrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {
	
	$scope.lists = {accounts: []};
	
	$scope.table = $tm1Ui.tableCreate($scope, $scope.lists.accounts);

}]);
