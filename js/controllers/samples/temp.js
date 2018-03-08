app.controller('TempCtrl', ['$scope', '$rootScope', '$tm1Ui', '$http', function($scope, $rootScope, $tm1Ui, $http) {
	$scope.test = function(){
		/*
		var httpUrl = 'http://power-pc:8899/appbase/api/sessions';
		httpUrl = 'api/sessions';
		
		console.info('UrlPut: ' + httpUrl);
		$http.put(httpUrl).then(function(success){
			console.info('Status: %o, Data: %o', success.status,success.data);
		});		
		*/
		
		var req = 
		{
			method: 'GET',
			url: 'api/sec',
		 	headers: {
		 		'X-CSRF-Token': 'Fetch'
		 	}
		};
		
		$http(req).then(function(success){
			console.info('X-CSRF-Token: %o', success.headers('X-CSRF-Token'));
			
			$scope.token = success.headers('X-CSRF-Token');
		});
	};
	
	$scope.testDBS = function(){
		
		
		var req = 
		{
			method: 'POST',
			url: 'api/dbs/batch',
		 	headers: {
		 		'X-CSRF-Token': $scope.page.xsrf
		 	},
		 	data:[{
		 		instance:'dev',
		 		cube: 'General Ledger',
		 		cubeElements:["Actual", "2011/12", "Mar", "Local", "England", "6", "Employee Benefits", "Amount"],
		 		id: 1111,
		 		value: parseFloat($scope.page.dbs)
		 	}]
		};
		
		$http(req).then(function(success){
			console.info('success: %o', success);
		});
	};
}]);
