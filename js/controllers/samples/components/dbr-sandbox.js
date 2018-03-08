app.controller('DbrSandboxCtrl', ['$scope', '$rootScope', '$tm1Ui', '$ngBootbox', function($scope, $rootScope, $tm1Ui, $ngBootbox) {
	$scope.values = {};
	$scope.functions = {};
	$scope.lists = {};
	
	$scope.values.sandbox = '';
	$scope.lists.sandboxes = [];
	
	// custom dialog on error
	$scope.showErrorAlert = function(message){
		var options = {
				message: message,
		        title: 'Error',
		        buttons: {	             
		        	success: {
		        		label: 'OK',
		        		className: 'btn-danger',
	        			callback: function() {}
		        	}
		        }
	    };

		$ngBootbox.customDialog(options);
	};
	
	// actions for the buttons
	$scope.refreshSandboxes = function(){
		$scope.values.sandbox = '';
		
		$tm1Ui.sandboxes('dev').then(function(sandboxes){
			$scope.lists.sandboxes = sandboxes;
			console.info('dev sandboxes %o', sandboxes);
		});
	};
	
	$scope.sandboxCreate = function(name){
		$tm1Ui.sandboxCreate('dev', name).then(function(status){			
			if(status.success){
				$scope.values.currentSandbox = '';
				$scope.refreshSandboxes();
				$scope.values.sandbox = name;
			}
			else{
				$scope.showErrorAlert('<strong>' + JSON.stringify(status) + '</strong>');
			}
		});
	};
	
	$scope.sandboxDelete = function(name){
		$ngBootbox.confirm('This will delete sandbox <strong>' + name + '</strong>. Proceed?')
	    .then(function() {
	    	$tm1Ui.sandboxDelete('dev', name).then(function(status){				
				if(status.success){
					$scope.refreshSandboxes();
				}
				else{
					$scope.showErrorAlert('<strong>' + JSON.stringify(status) + '</strong>');
				}
			});
	    }, function() {});
	};
	
	$scope.sandboxPublish = function(name){
		$ngBootbox.confirm('This will commit the changes you have made on your sandbox <strong>' + name + '</strong> into the actual cubes! Proceed?')
	    .then(function() {
	    	$tm1Ui.sandboxPublishChanges('dev', name).then(function(status){
				if(status.success){
					$tm1Ui.dataRefresh();
				}
				else{
					$scope.showErrorAlert('<strong>' + JSON.stringify(status) + '</strong>');
				}
			});
	    }, function() {});
		
		
	};
	
	$scope.sandboxDiscard = function(name){
		$ngBootbox.confirm('This will discard any changes you have made on your sandbox <strong>' + name + '</strong>. Proceed?')
	    .then(function() {
	    	$tm1Ui.sandboxDiscardChanges('dev', name).then(function(status){
				if(status.success){
					$tm1Ui.dataRefresh();
				}
				else{
					$scope.showErrorAlert('<strong>' + JSON.stringify(status) + '</strong>');
				}
			});
	    }, function() {});
	};
	
	$scope.refreshSandboxes();	
}]);
