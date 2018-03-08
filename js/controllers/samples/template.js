app.controller('TemplateCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
 	$scope.colors = [{color:"#9FD000"}, {color:"#0085B9"}, {color:"#FF9214"}];
 	$scope.selected = {value: 0};

 	$scope.menuDescription = {};
 	$scope.menuDescription['template-dashboard'] = 'HTML template ready to fill in';

 	
}]);
