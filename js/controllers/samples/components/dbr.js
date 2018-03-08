app.controller('DbrCtrl', ['$scope', '$timeout', '$ngBootbox', '$log',
                                 function($scope, $timeout , $ngBootbox, $log) {    
	$scope.values = {};
	
	$scope.myContextMenus = [
    {            
            display: 'Click Me!',            
            action: function(data){     
            	var message = '';
            	
            	message += '<h3>Processed via Custom Context Menu</h3>';
            	
            	message += 'Instance: <strong>' + data.instance + '</strong><br />';
            	message += 'Cube: <strong>' + data.cube + '</strong><br />';
            	message += 'Elements: <strong>';
            	
            	// extract the elements from the array
            	var elements = '';
            	_.forEach(data.cubeElements, function(element){
            		elements += ', ' + element;
            	});
            	elements = elements.substr(2);
            	
            	message += elements + '</strong><br />';
            	message += 'Value: <strong>' + data.value + '</strong>';
            	
            	$log.info('myContextMenus()');
            	$log.info(data);
            	$ngBootbox.alert(message).then(function(){});      	
            }                
        }
    ];
    
	$scope.onValueUpdate = function(functionCall, messageVariable, message, value){
    	$log.info(functionCall + '()');
    	$log.info(value);
    	
    	$scope.values[messageVariable] = message;
    	$timeout(function(){
    		$scope.values[messageVariable] = '';
    	}, 5 * 1000);
    };
    
    $scope.onValueLoad = function(value){
    	$scope.onValueUpdate('onValueLoad', 'messageOnValueLoad', 'Value received when tm1-on-load is called - ' + value, value);    	
    };
    
    $scope.onValueChange = function(value){
    	$scope.onValueUpdate('onValueChange', 'messageOnValueChange', 'Value received when tm1-on-change is called - ' + value, value);    	
    };
    
    $scope.onEachValueChange = function(value){
    	$scope.onValueUpdate('onEachValueChange', 'messageOnEachValueChange', 'Value received when tm1-change is called - ' + value, value);    	
    };
    
    $scope.$watch('values.dbr.drill', function(newValue, oldValue){
    	if(newValue){
    		$log.info('drill model received');
        	$log.info(newValue);
    	}    	
    });
    
    $scope.values.dbr = {
    		api:{
    			onUpdate:function(status, data){
    				var message = '';
    				message += 'Values received via tm1-api.onUpdate(): ';
    				message += 'status: ' + angular.toJson(status) + ',';
    				message += 'data: ' + angular.toJson(data);
    				
    				$scope.values.dbrApiDisplayValue = message;
    				$timeout(function(){
    		    		$scope.values.dbrApiDisplayValue = '';
    		    	}, 5 * 1000);
    			}
    		}
    };
    
    $scope.applyTimeout = function(api, timeoutInSec){
    	api.setContextTimeout(timeoutInSec);
    };
    
    $scope.validate = function(event){
		console.info(event);
		
		if(!$scope.pass){
			event.cancel($scope.values.dbrCancellationMessage);
		}		
	};
}]);
