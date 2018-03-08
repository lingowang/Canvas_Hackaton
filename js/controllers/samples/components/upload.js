app.controller('UploadCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$log',
                                 function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $log) {
	
	$scope.fileUploaded = undefined;
	$scope.relativeUrlPath = '';
	$scope.getPath = function(file){
		$log.info(file);
		$scope.fileUploaded = file;
		$scope.relativeUrlPath = file.path;
	};	
}]);
