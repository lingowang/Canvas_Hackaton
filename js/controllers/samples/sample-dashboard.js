app.controller('SampleDashboardCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', '$location', function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, $location) {

	// A. layout and default sizes
	$scope.panel = {height:'400px'};

	$scope.varianceTolerance = 0.05;

	$scope.defaults = {
		region: 'Total Europe',
		department:'Corporate',
		version: 'Budget',
		driver: 'Net Sales',
		segment: 'region',
		year: '2016',
		month: 'Nov'
	}
	
	$scope.selections = {
			region: $scope.defaults.region,
			department: $scope.defaults.department,
			version: $scope.defaults.version,
			driver: $scope.defaults.driver,
			segment: $scope.defaults.segment,
			year: $scope.defaults.year,
			month: $scope.defaults.month
	};
	
	// Get the URL query parameters using $location.search()
	
	if($location.search().region){
		$scope.selections.region = $location.search().region;
	}
	
	if($location.search().department){
		$scope.selections.department = $location.search().department;
	}
	
	if($location.search().driver){
		$scope.selections.driver = $location.search().driver;
	}

	$scope.excludeTotalYear = function(item){
		return item.element != 'Total Year';
	}

	$scope.getMonth = function(offset){
		var date = moment([parseInt($scope.defaults.year), parseInt($scope.defaults.month.substring(1, 3)) - 1, 1]);
		date.add(offset, 'months');
		return date.format("MMM YY");
	}
	
	
	// Below $location.search("region", region) is used to the URL query parameter so it can be used while converting to PDF
	
	$scope.setRegion = function(region){
		$scope.selections.region = region;
		if(region != $scope.defaults.region){
			$location.search("region", region);
		}
		else {
			$location.search("region", null);
		}
	};
	
	$scope.setDepartment = function(department){
		$scope.selections.department = department;
		if(department != $scope.defaults.department){
			$location.search("department", department);
		}
		else {
			$location.search("department", null);
		}
	};
	
	$scope.setDriver = function(driver){
		$scope.selections.driver = driver;
		if(driver != $scope.defaults.driver){
			$location.search("driver", driver);
		}
		else {
			$location.search("driver", null);
		}
	};

}]);
