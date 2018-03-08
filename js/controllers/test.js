app.controller('TestCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', '$tm1UiTable',
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, $tm1UiTable) {
	
	// Add some fake dbrs to see if it clears 
	$scope.items = [];
	for(var i = 1; i < 10; i++){
		$scope.items.push(i);
	}
	
	$scope.page = {
		accounts: []
	};
	
	$scope.table = $tm1UiTable.create($scope, $scope.page.accounts);

}]);
