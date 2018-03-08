app.controller('NamedMdxCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', '$tm1Ui', function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, $tm1Ui) {

	$scope.instance = $stateParams.instance;

	$scope.defaults = {
		queryId: "P&L",
		year: "2012",
		region: "England"
	}

	$scope.selections = {
		queryId: $scope.defaults.queryId,
		year: $scope.defaults.year,
		region: $scope.defaults.region
	}
	
	$scope.query = function(loading){
		$scope.loading = loading;
		// Create data set
		// based on the MDX statement from the \WEB-INF\resources\mdx_named.json file
		$tm1Ui.cubeExecuteNamedMdx('dev', $scope.selections.queryId, {parameters: {Year:$scope.selections.year, Region:$scope.selections.region}}).then(function(result){
			if(!result.failed){
				$scope.dataset = $tm1Ui.resultsetTransform("dev", "General Ledger", result, {alias: {Account: "Description", Period: "Short Description", Department: "Description", Version: "Description"}});
				var options = {preload: false, watch: false};
				if($scope.table){
					options.index = $scope.table.options.index;
					options.pageSize = $scope.table.options.pageSize;
				}
				$scope.table = $tm1Ui.tableCreate($scope, $scope.dataset.rows, options);
			}
			else {
				$scope.message = result.message;
			}		
			$scope.loading = false;
		});		
	};
	
	$scope.query(true);
	
	
}]);