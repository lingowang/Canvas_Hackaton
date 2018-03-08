app.controller('SampelUploadCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$tm1Ui', '$log',
                                          function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $tm1Ui, $log) {
	$scope.values = {};
	$scope.options = {
			preference:{
				messages: []
			}
	};
	
	$scope.updatePreview = function(file){
		// uncomment to see what is being returned
		// console.debug(file); // instance, name, path
		
		$tm1Ui.cellPut(file.path, 'dev', 'System Info', 'Current Date', 'Comment').then(function(data){
			// uncomment to see what is being returned
			// console.debug('data %o', data);
			if(!data.success){
				$log.error(data);
			}
		});
	};
	
	$scope.updateMessages = function(file){
		$timeout(function(){ // this is to ensure that changes will be on the next save operation
			$scope.options.preference.messages.push({file:file, message: $scope.values.comment});			
			$scope.values.comment = '';
		}, 1 * 1000);		
	};
	
	$scope.removeFromList = function(imagePath){
		var updatedMessages = _.remove($scope.options.preference.messages, function(n) {
			return n.file.path != imagePath;
		});
		
		$scope.options.preference.messages = updatedMessages;
	};
}]);
