app.controller('CubesCtrl', ['$scope', '$timeout', '$tm1Ui', function($scope, $timeout, $tm1Ui) {
	$scope.values = {};
	$scope.lists = {};
	
	$scope.lists.instances = [];
	
	// get available instances
	$tm1Ui.applicationInstances().then(function(instances){
		angular.forEach(instances, function(instance){
			$scope.lists.instances.push(instance.name);
		});
		
		$scope.values.instance = $scope.lists.instances[0];
		$scope.getCubes();
	});
	
	$scope.getCubes = function(){
		$tm1Ui.cubes($scope.values.instance).then(function(cubes){
			$scope.cubes = cubes;
		});		
	};
	
	$scope.dimensionNames = function(cube){
		var dims = [];
		_.each(cube.Dimensions, function(dim){
			dims.push(dim.Name);
		});
		return dims.join(", ");
	}
	
}]);