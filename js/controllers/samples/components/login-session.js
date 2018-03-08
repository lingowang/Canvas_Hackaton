app.controller('LoginSessionCtrl', ['$scope', '$ngBootbox', '$log', function($scope, $ngBootbox, $log) {	
	$scope.runThisafterUserhasLoggedIn = function(instance){
		$ngBootbox.alert('Hi <strong>' + instance.userName + '</strong>! You have logged in to the <strong>' + instance.name + '</strong> instance').then(function(){});
	};
}]);
