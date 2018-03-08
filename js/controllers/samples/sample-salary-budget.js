app.controller('SampleSalaryBudgetingCtrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {
    
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
    
	$scope.table = $tm1Ui.tableCreate($scope, $scope.lists.employees, {preload: false, filter: $scope.filter});
    
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
    
}]);
