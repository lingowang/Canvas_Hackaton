app.controller('ElementListCtrl', ['$scope', '$ngBootbox', '$log', '$tm1Ui', function($scope, $ngBootbox, $log, $tm1Ui) {
	
	$scope.values = {};
	$scope.lists = {};
	
	$tm1Ui.dimensionSubsets('dev', 'Account').then(function(subsets){
		$scope.lists.accountSubsets = subsets;
		$scope.values.accountSubset = subsets[0].Name;
	});
	
	$scope.refreshData = function(elementListDirectiveAPI){
		elementListDirectiveAPI.refreshData();
	};
}]);
