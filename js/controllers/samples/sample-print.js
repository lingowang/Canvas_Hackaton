app.controller('SamplePrintCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', '$location', function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, $location) {

	// A. layout and default sizes
	$scope.panel = {height:'400px'};

	$scope.varianceTolerance = 0.05;

	// Default values to be used before selections are made
	$scope.defaults = {
		year: '2016',
		month: 'Jan',
		region: 'Total Europe',
		department:'Corporate',
		driver: 'Operating Profit',
		version: 'Budget'
	}
	
	$scope.selections = {
		year: $scope.defaults.year,
		month: $scope.defaults.month,
		region: $scope.defaults.region,
		department: $scope.defaults.department,
		driver: $scope.defaults.driver,
		version: $scope.defaults.version,
		segment: 'region'
	};

	$scope.lists = {
		subset: [
			{description:"Operating Profit"},
			{description:"Gross Margin"},
			{description:"Operating Expenses"},
			{description:"Other Income and Expense"}
		]
	};
	
	// Get the URL query parameters using $location.search()
	// When printing the URL is used for filtering so all selections other than defaults
	// must be added to the url
	if($location.search().region){
		$scope.selections.region = $location.search().region;
	}
	if($location.search().department){
		$scope.selections.department = $location.search().department;
	}
	if($location.search().driver){
		$scope.selections.driver = $location.search().driver;
	}
	if($location.search().month){
		$scope.selections.month = $location.search().month;
	}
	if($location.search().year){
		$scope.selections.year = $location.search().year;
	}
	
	// Below $location.search("region", region) is used to the URL query parameter so it can be used while converting to PDF
	// Each time a selection it is added to the URL which is then passed to the PDF printer
	// See above for how to use the parameters and set them in the page
	$scope.setRegion = function(region){
		$scope.selections.region = region;
		if(region != $scope.defaults.region){
			// Set the URL parameter
			$location.search("region", region);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("region", null);
		}
	};
	$scope.setDepartment = function(department){
		$scope.selections.department = department;
		if(department != $scope.defaults.department){
			// Set the URL parameter
			$location.search("department", department);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("department", null);
		}
	};
	$scope.setDriver = function(driver){
		$scope.selections.driver = driver;
		if(driver != $scope.defaults.driver){
			// Set the URL parameter
			$location.search("driver", driver);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("driver", null);
		}
	};
	$scope.setMonth = function(month){
		$scope.selections.month = month;
		if(month != $scope.defaults.month){
			// Set the URL parameter
			$location.search("month", month);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("month", null);
		}
	};
	$scope.setYear = function(year){
		$scope.selections.year = year;
		if(year != $scope.defaults.year){
			// Set the URL parameter
			$location.search("year", year);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("year", null);
		}
	};
	
	
	// Helper functions
	
	$scope.excludeTotalYear = function(item){
		return item.element != 'Total Year';
	}
	

	$scope.getMonth = function(offset){
		var date = moment([parseInt($scope.selections.year), parseInt($scope.selections.month.substring(1, 3)) - 1, 1]);
		date.add(offset, 'months');
		return date.format("MMM YY");
	}
	
	


}]);
