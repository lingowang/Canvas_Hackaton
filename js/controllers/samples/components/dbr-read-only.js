app.controller('DbrReadonlyCtrl', ['$scope', '$ngBootbox', '$log', '$tm1Ui', function($scope, $ngBootbox, $log, $tm1Ui) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {};
    $scope.lists = {};
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
	 
	 $scope.displayValue = function(value){
	 	$log.info('displayValue()');
	 	$log.info(value);
	 	$ngBootbox.alert('This is the value received after tm1-change has been resolved: <strong>' + value + '</strong>').then(function(){});
	 };
	 
	 $scope.$watch('values.dbr.drill', function(newValue, oldValue){
    	if(newValue){
    		$log.info('drill model received');
        	$log.info(newValue);
    	}    	
	 });
	 
}]);
