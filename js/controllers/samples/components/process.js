app.controller('ProcessCtrl', ['$scope', '$ngBootbox', '$log', '$tm1Ui', '$timeout', function($scope, $ngBootbox, $log, $tm1Ui, $timeout) {
	
	$scope.values = {};
	
	$scope.onAfterRun = function(success){
		$scope.values.message = success ? 'No errors there!' : 'You might want to do something about it.';
		$ngBootbox.alert($scope.values.message).then(function() {
			$log.debug($scope.values.message);
	    });		
	};
	
	$scope.dimensionCheck = function(dimensionName){
		$tm1Ui.dimensionElements('dev', '}Dimensions').then(function(processes){
			var processExists = false;
			_.forEach(processes, function(process){
				if(!processExists){
					if(process.Name == dimensionName.trim()){
						processExists = true;
					}
				}				
			});
			
			if(processExists){
				$scope.values.message = 'Dimension "' + dimensionName + '" exist.';				
			}
			else{
				$scope.values.message = 'Dimension "' + dimensionName + '" DOES NOT exist.';
			}
			
			$timeout(function(){
				$scope.values.message = '';
			}, 3 * 1000);
		});		
	};
	
	$scope.dimensionDelete = function(dimensionName){
		$tm1Ui.processExecute('dev', 'Bedrock.Dim.Destroy', 'pDimension', dimensionName).then(function(status){
			if(status && status.success){
				$scope.values.message = 'Dimension "' + dimensionName + '" DELETED';
			}
			else{
				$scope.values.message = 'Dimension "' + dimensionName + '" was not able to be deleted.';
			}
			
			$timeout(function(){
				$scope.values.message = '';
			}, 3 * 1000);
		});		
	};
}]);
