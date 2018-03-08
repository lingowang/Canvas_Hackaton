app.controller('SetupCtrl', ['$scope', '$rootScope', '$location', '$tm1Ui',
                             function($scope, $rootScope, $location, $tm1Ui) {
	$scope.values = {
			url: {}
	};
	
	$scope.values.hostUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();
	
	
	$tm1Ui.applicationInstances().then(function(instances){
		if(angular.isArray(instances)){
			if(angular.isDefined(instances[0].baseApp)){
				$scope.values.url.help = $scope.values.hostUrl + instances[0].baseApp + '/#/help';
			}
		}
	});
	
	
	
}]);