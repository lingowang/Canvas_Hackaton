app.controller('ExportInfoCtrl', ['$scope', '$ngBootbox', '$log', function($scope, $ngBootbox, $log) {
	
	$scope.values = {};
	
	$scope.values.exportName = 'exported';
	$scope.values.exportFieldSeparator = ',';
	$scope.values.exportFieldQualifier = '"';
}]);
