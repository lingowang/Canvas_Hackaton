app.controller('SubnmCtrl', ['$scope', '$ngBootbox', '$tm1Ui', '$timeout', function($scope, $ngBootbox, $tm1Ui, $timeout) {
	$scope.lists = {};
	$scope.values = {};
	
	$scope.lists.elements = [];
	
	$scope.refreshElements = function(api){
		api.refreshData();
	};
	
	$scope.getElements = function(api){
		$scope.lists.elements = api.getElements();
	};
	
	$scope.clearElements = function(){
		$scope.lists.elements.length = 0;
	};
	
	$scope.onValueUpdate = function(messageVariable, message){
		$scope.values[messageVariable] = message;
		
		$timeout(function(){
			$scope.values[messageVariable] = '';
		}, 3 * 1000);
	};
	
	$scope.onValueLoad = function(data){
		$scope.onValueUpdate('messageOnSubnmLoad', 'SUBNM has been initialized with: ' + data);
	};
	
	$scope.onValueChange = function(data){
		$scope.onValueUpdate('messageOnSubnmChange', 'SUBNM has been changed to: ' + data);
	};
	
	$scope.onEachValueChange = function(data){
		$scope.onValueUpdate('messageOnSubnmEachChange', 'SUBNM has changed to: ' + data);
	};
	
}]);
