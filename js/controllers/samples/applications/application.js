app.controller('ApplicationCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
 	$scope.colors = [{color:"#9FD000"}, {color:"#0085B9"}, {color:"#FF9214"}];
 	$scope.selected = {value: 0};

 	$scope.menuDescription = {};
 	
 	$scope.menuDescription['application-1'] = 'Salary, Budget and Forecast';
}]);
