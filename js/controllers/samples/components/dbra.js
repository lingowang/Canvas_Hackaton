app.controller('DbraCtrl', ['$scope', '$ngBootbox', '$log', '$timeout', function($scope, $ngBootbox, $log, $timeout) {
	
	$scope.values = {};
	
	$scope.updateSessionTimeout = function(api, sessionTimeout){
		if(sessionTimeout != null && sessionTimeout > 0){
			api.setContextTimeout(sessionTimeout);
		}		
	};
	
	$scope.onValueUpdate = function(messageVariable, message){
		$scope.values[messageVariable] = message;
		$timeout(function(){
			$scope.values[messageVariable] = '';
		}, 1000 * 5);
		
	};
	
	$scope.onValueLoad = function(data){
		$scope.onValueUpdate('messageOnValueLoad', 'On calling tm1-on-load, Value is ' + data);
	};
	
	$scope.onValueChange = function(data){
		$scope.onValueUpdate('messageOnValueChange', 'On calling tm1-on-change, Value is ' + data);
	};
	
	$scope.onEachValueChange = function(data){
		$scope.onValueUpdate('messageOnEachValueChange', 'On calling tm1-change, Value is ' + data);
	};
	
	$scope.values.dbraApi = {
			onUpdate: function(status, data){
				if(status && status.success){
					$scope.values.dbraDisplayValue = 'On calling values.dbraApi.onUpdate(), Value is ' + data.value;
					$timeout(function(){
						$scope.values.dbraDisplayValue = '';
					}, 1000 * 5);
				}
				else{
					$ngBootbox.alert('Something went wrong. Unable to save into TM1.').then(function(success){});
				}				
			}
	};
}]);
