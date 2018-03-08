app.controller('PerformanceCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$location', function($scope, $rootScope, $log, $tm1Ui, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {
        test : 'dbr',
        queryId: "Employee Forecast",
		year: "2016",
		region: "Total Europe"
    };
    $scope.selections = {
        queryId: $scope.defaults.queryId,
		year: $scope.defaults.year,
		region: $scope.defaults.region
    };
    $scope.lists = {};
    $scope.values = {};

    $scope.options = {
        test : $scope.defaults.test,
        dbr : true,
        mdx : false
    };
    
    $scope.lists = {
		months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        employees: []
	};
	
    $scope.q1=["Jan","Feb","Mar"];
    $scope.q2=["Apr","May","Jun"];
    $scope.q3=["Jul","Aug","Sep"];
    $scope.q4=["Oct","Nov","Dec"];
    
    $scope.employeeDetails={
        id:'',
        name:'',
        region:'',
        dept:''
    };
    
    $scope.employeeToDelete={
        id:'',
        name:''
    };
    
    $scope.filter = function(value){
    	
    	if(value.yearTotal == null){
    		// Data isn't ready so don't display row
    		return false;
    	}
    	
    	if($scope.options.suppressZeros && value.yearTotal == 0){
    		return false;
    	}
    	
    	if($scope.options.filter && $scope.options.filter != ""){
    		if(value["Full Name"].toLowerCase().indexOf($scope.options.filter.toLowerCase()) == -1){
    			return false;
    		}
    	}

    	return true;
    };
    
	$scope.table = $tm1Ui.tableCreate($scope, $scope.lists.employees, {preload: false, filter: $scope.filter, pageSize: 1000});
    
    $scope.employeeDelete = function(id,name){
        $scope.employeeToDelete.id=id;  
        $scope.employeeToDelete.name=name;     
    };
    
    $scope.employeeDetailsShow=function(id,name){
       
        $scope.employeeDetails.id=id;  
        $scope.employeeDetails.name=name;

    };
    
    $scope.employeeMeasure = function(employee){
    	if(employee.salaryYearEntered > 0){
    		return "Base Salary";
		}
		else{
			return "Full Time Base Salary";
		} 
    };

    if($location.search().test){
		$scope.options.test = $location.search().test;
    }
    
    $scope.setTest = function(test){
		$scope.options.test = test;
		if(test != $scope.defaults.test){
			// Set the URL parameter
			$location.search("test", test);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("test", null);
		}
    };
    
    // CREATE TABLE FOR MDX
    $scope.query = function(loading){
		$scope.loading = loading;
		// Create data set
		// based on the MDX statement from the \WEB-INF\resources\mdx_named.json file
		$tm1Ui.cubeExecuteNamedMdx('dev', $scope.selections.queryId, {parameters: {Year:$scope.selections.year, Region:$scope.selections.region}}).then(function(result){
			if(!result.failed){
				$scope.dataset = $tm1Ui.resultsetTransform("dev", "Employee", result, {alias: {Employee: "Full Name", Period: "Short Description"}});
				var options = {preload: false, watch: false};
				if($scope.table){
					options.index = $scope.table.options.index;
					options.pageSize = $scope.table.options.pageSize;
				}
				$scope.tableMDX = $tm1Ui.tableCreate($scope, $scope.dataset.rows, options);
			}
			else {
				$scope.message = result.message;
			}		
			$scope.loading = false;
		});		
	};
	
	$scope.query(true);
    
}]);
