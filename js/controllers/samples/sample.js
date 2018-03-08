app.controller('SampleCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
 	$scope.colors = [{color:"#9FD000"}, {color:"#0085B9"}, {color:"#FF9214"}];
 	$scope.selected = {value: 0};
 	
 	$scope.menuDescription = {};
 	
 	$scope.menuDescription['sample-simple'] = 'Simple page with dynamic DBR';
 	$scope.menuDescription['sample-skinning'] = 'Override the default style of tm1-ui components';
 	$scope.menuDescription['sample-table'] = 'Sortable, filtered table with show/hide columns';
 	$scope.menuDescription['sample-dashboard'] = 'Dashboard example with advanced filtering feature';
 	$scope.menuDescription['sample-print'] = 'Printing';
 	$scope.menuDescription['sample-data-entry'] = 'Simple data entry template with search option';
 	$scope.menuDescription['sample-salary-budget'] = 'Advance data entry template with suppress zero and run TI';
 	$scope.menuDescription['sample-navigation-1'] = 'Parameterize navigation between pages';
 	$scope.menuDescription['sample-advance-chart'] = 'Advance visualization with clickable chart';
 	$scope.menuDescription['sample-upload'] = 'How to upload files';
 	$scope.menuDescription['sample-sheetjs'] = 'How to upload Excel files';
 	$scope.menuDescription['sample-cubes'] = 'Show the TM1 instance cube list';
 	$scope.menuDescription['sample-sql'] = 'Access external database from Canvas';
 	$scope.menuDescription['mdx-named'] = 'Build even faster table using MDX';
 	$scope.menuDescription['sample-grid'] = 'MDX Grid with pre-built features';
    
}]);
