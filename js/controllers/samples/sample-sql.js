app.controller('SampleSQLCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

	$scope.options = {
		max: 10
	};

	// Request the data from the MDX Query in \samples\api\samples\sqp.jsp
	// Store the result in $scope.data
	$scope.query = function() {
		$http.get("api/samples/sql.jsp?instance=dev&department=" + $scope.selections.department + "&skip=0&max=" + $scope.options.max).then(function(result){
			$scope.data = result.data;
		});
	};
	
	// Use the watch function
	// Each time the user change the department, the query is refreshed.
	$scope.$watch("selections.department", function(newValue, oldValue){
		if(!_.isEmpty(newValue)){ // this is to refresh only when there is a department
			$scope.query();
		}
	});
	
	
}]);
