app.controller('DbrGroupUpdateCtrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {
	$scope.values = {};
	$scope.functions = {};
	
	$scope.functions.refreshAll = function(){
		$tm1Ui.dataRefresh();
	};
	
	$scope.functions.refreshGroup = function(groupName){
		$tm1Ui.dataRefresh(groupName);
	};
}]);
