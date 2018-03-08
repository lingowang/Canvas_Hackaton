app.controller('DbrImageCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', function($scope, $rootScope, $log, $tm1Ui) {
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

    $scope.functions = {};

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

    $scope.removeImage = function(){
        // uncomment to see what is being returned
        // console.debug(file); // instance, name, path
        
        $tm1Ui.cellPut('', 'dev', 'System Info', 'Current Date', 'Comment').then(function(data){
            // uncomment to see what is being returned
            // console.debug('data %o', data);
            
        });

        //Refresh the page
        $tm1Ui.dataRefresh();
    };

    $scope.functions.refreshGroup = function(groupName){
		$tm1Ui.dataRefresh(groupName);
	};
    
}]);
